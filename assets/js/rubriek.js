// static/js/rubriek.js
/**
 * Avant Local Grading Pipeline (V2.1 - Multi-Submission & Doelstelling Gewichten)
 * Ondersteunt meerdere opdrachten/indieningen per pagina en gewogen succescriteria.
 */
(() => {
  if (window.__avantGradingInitialized) return;
  window.__avantGradingInitialized = true;

  const NIVEAUS = [
    { level: 0, label: 'Niv 0', desc: 'Niet beheerst' },
    { level: 1, label: 'Niv 1', desc: 'In ontwikkeling' },
    { level: 2, label: 'Niv 2', desc: 'Voldoende' },
    { level: 3, label: 'Niv 3', desc: 'Verdiepend' }
  ];

  const state = {
    container: null,
    classGroup: '5CRM',
    assignmentId: '',
    submissions: [], // Array van { id, title, weight, clusters: [...] }
    activeSubIndex: 0,
    students: [], // Array van { hash, enc, name, shortName, isDecrypted }
    cryptoData: null,
    isUnlocked: false,
    // evaluations per submission: { [subId]: { [studentHash]: { criteriaLevels: {}, scores: {} } } }
    submissionEvals: {},
    activeStudentIndex: 0,
    fileHandle: null,
    isDirty: false
  };

  // --- Cryptografische Hulpfuncties (Web Crypto API) ---

  function base64ToUint8(str) {
    const bin = atob(str);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }

  function uint8ToBase64(bytes) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  function bufferToHex(buf) {
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  async function decryptStudents(passphrase) {
    if (!state.cryptoData || !state.cryptoData.metadata) {
      throw new Error('Geen versleutelde metadata gevonden.');
    }
    const meta = state.cryptoData.metadata;
    const salt = base64ToUint8(meta.salt);
    const iterations = meta.iterations || 100000;

    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(passphrase),
      'PBKDF2',
      false,
      ['deriveKey']
    );

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    let successCount = 0;
    for (const student of state.students) {
      if (!student.enc) continue;
      const rawPayload = base64ToUint8(student.enc);
      const iv = rawPayload.subarray(0, 12);
      const data = rawPayload.subarray(12);

      try {
        const decrypted = await window.crypto.subtle.decrypt(
          { name: 'AES-GCM', iv: iv },
          key,
          data
        );
        const name = new TextDecoder().decode(decrypted);
        student.name = name;
        student.shortName = name.split(' ')[0];
        student.isDecrypted = true;
        successCount++;
      } catch (err) {
        throw new Error('Onjuist wachtwoord');
      }
    }

    if (successCount === 0 && state.students.length > 0) {
      throw new Error('Geen leerlinggegevens konden worden ontsleuteld.');
    }

    state.isUnlocked = true;
    updateCryptoUIState();
    refreshStudentViews();
  }

  function relockStudents() {
    sessionStorage.removeItem('avant_grading_passphrase');
    state.isUnlocked = false;
    state.students.forEach((s) => {
      s.name = `Leerling ${s.hash}`;
      s.shortName = s.hash.slice(0, 6);
      s.isDecrypted = false;
    });
    updateCryptoUIState();
    refreshStudentViews();
    updateStatus('Namen zijn vergrendeld en gewist uit het browsergeheugen.', 'info');
  }

  function updateCryptoUIState() {
    const btn = document.getElementById('btn-toggle-crypto');
    const icon = document.getElementById('crypto-lock-icon');
    const text = document.getElementById('crypto-lock-text');
    const unlockedActions = document.getElementById('crypto-unlocked-actions');
    const statusMsg = document.getElementById('crypto-status-msg');

    if (btn) btn.classList.toggle('is-unlocked', state.isUnlocked);
    if (icon) icon.textContent = state.isUnlocked ? '🔓' : '🔐';
    if (text) text.textContent = state.isUnlocked ? 'Namen zichtbaar' : 'Namen ontgrendelen';
    if (unlockedActions) unlockedActions.style.display = state.isUnlocked ? 'block' : 'none';

    if (statusMsg) {
      if (state.isUnlocked) {
        statusMsg.style.display = 'block';
        statusMsg.className = 'crypto-status-msg success';
        statusMsg.textContent = `✅ ${state.students.length} leerlingnamen actief ontsleuteld via AES-256-GCM.`;
      } else {
        statusMsg.style.display = 'none';
      }
    }
  }

  function refreshStudentViews() {
    buildStudentSelector();
    if (state.students.length > 0) {
      selectStudent(state.activeStudentIndex);
    }
    buildCompactSummaryTable();
  }

  function safeParseJson(el) {
    if (!el) return null;
    try {
      let val = JSON.parse(el.textContent.trim());
      if (typeof val === 'string') {
        val = JSON.parse(val);
      }
      return val;
    } catch (err) {
      console.error('Fout bij JSON parsen:', err);
      return null;
    }
  }

  function getActiveSubmission() {
    return state.submissions[state.activeSubIndex] || {
      id: 'default',
      title: 'Standaard',
      weight: 20,
      clusters: []
    };
  }

  function getActiveSubEvals() {
    const sub = getActiveSubmission();
    if (!state.submissionEvals[sub.id]) {
      state.submissionEvals[sub.id] = {};
    }
    return state.submissionEvals[sub.id];
  }

  async function init() {
    state.container = document.getElementById('avant-grading-container');
    if (!state.container) return;

    state.classGroup = state.container.dataset.classGroup || '5CRM';
    state.assignmentId = state.container.dataset.assignmentId || 'opdracht';

    // 1. Submissies parsen
    const subDataEl = document.getElementById('avant-submissions-data');
    state.submissions = safeParseJson(subDataEl) || [];
    if (state.submissions.length === 0) {
      state.submissions = [{
        id: 'default',
        title: state.container.dataset.pageTitle || 'Opdracht',
        weight: 20,
        clusters: []
      }];
    }

    // 2. Bestaande evaluaties inladen
    const savedDataEl = document.getElementById('avant-saved-evaluations-data');
    const savedData = safeParseJson(savedDataEl);
    if (savedData && typeof savedData === 'object') {
      if (savedData.submissions) {
        // Nieuwe multi-submissie structuur
        Object.entries(savedData.submissions).forEach(([subId, subData]) => {
          state.submissionEvals[subId] = subData.evaluations || {};
        });
      } else if (savedData.evaluations) {
        // Oude platte structuur migreren naar eerste submissie
        const firstSubId = state.submissions[0]?.id || 'default';
        state.submissionEvals[firstSubId] = savedData.evaluations;
      }
    }

    // 3. Leerlingen inladen (versleuteld of fallback)
    await loadStudentsList();

    // 4. Setup UI
    setupEventListeners();
    buildSubmissionTabs();
    buildStudentSelector();

    // Selecteer eerste submissie & student
    switchSubmission(0);

    updateCryptoUIState();
    updateStatus('Klaar voor invoer. Duid per succescriterium het niveau aan; clusterpunten worden gewogen en live berekend.', 'info');
  }

  function setupEventListeners() {
    document.getElementById('btn-save-rubriek')?.addEventListener('click', () => handleSaveFile(false));
    document.getElementById('btn-load-rubriek')?.addEventListener('click', handleOpenFile);
    document.getElementById('btn-copy-smartschool')?.addEventListener('click', copyToClipboard);

    // Crypto Lock / Modal Controls
    const cryptoModal = document.getElementById('crypto-modal');
    document.getElementById('btn-toggle-crypto')?.addEventListener('click', () => {
      if (cryptoModal) cryptoModal.style.display = 'flex';
      document.getElementById('crypto-passphrase-input')?.focus();
    });

    const closeModal = () => {
      if (cryptoModal) cryptoModal.style.display = 'none';
      const statusEl = document.getElementById('crypto-status-msg');
      if (statusEl && !state.isUnlocked) statusEl.style.display = 'none';
    };

    document.getElementById('btn-close-crypto-modal')?.addEventListener('click', closeModal);
    document.getElementById('crypto-modal-backdrop')?.addEventListener('click', closeModal);

    const handleUnlockSubmit = async () => {
      const inputEl = document.getElementById('crypto-passphrase-input');
      const rememberCb = document.getElementById('crypto-remember-session');
      const statusMsg = document.getElementById('crypto-status-msg');
      const pass = inputEl?.value?.trim();

      if (!pass) {
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.className = 'crypto-status-msg error';
          statusMsg.textContent = 'Voer een wachtwoord in.';
        }
        return;
      }

      try {
        await decryptStudents(pass);
        if (rememberCb?.checked) {
          sessionStorage.setItem('avant_grading_passphrase', pass);
        }
        updateStatus(`${state.students.length} leerlingnamen succesvol ontsleuteld.`, 'success');
        setTimeout(() => closeModal(), 600);
      } catch (err) {
        if (statusMsg) {
          statusMsg.style.display = 'block';
          statusMsg.className = 'crypto-status-msg error';
          statusMsg.textContent = 'Onjuist wachtwoord. De namen konden niet worden ontsleuteld.';
        }
      }
    };

    document.getElementById('btn-submit-unlock')?.addEventListener('click', handleUnlockSubmit);
    document.getElementById('crypto-passphrase-input')?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleUnlockSubmit();
      }
    });

    document.getElementById('btn-relock')?.addEventListener('click', () => {
      relockStudents();
      closeModal();
    });

    // In-browser encrypter
    document.getElementById('btn-generate-encrypted-dataset')?.addEventListener('click', async () => {
      const rawText = document.getElementById('crypto-raw-names-input')?.value || '';
      const newPass = document.getElementById('crypto-new-passphrase')?.value || 'avant2026';
      const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

      if (lines.length === 0) {
        alert('Plak eerst ten minste één leerlingnaam.');
        return;
      }

      try {
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
          'raw',
          enc.encode(newPass),
          'PBKDF2',
          false,
          ['deriveKey']
        );
        const key = await window.crypto.subtle.deriveKey(
          { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
          keyMaterial,
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt']
        );

        const encryptedList = [];
        for (const name of lines) {
          const cleanName = name.replace(/\s+/g, ' ');
          const hashBuf = await window.crypto.subtle.digest('SHA-256', enc.encode(cleanName));
          const hashHex = bufferToHex(hashBuf).slice(0, 10);

          const iv = window.crypto.getRandomValues(new Uint8Array(12));
          const ciphertextBuf = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            enc.encode(cleanName)
          );

          const combined = new Uint8Array(iv.length + ciphertextBuf.byteLength);
          combined.set(iv, 0);
          combined.set(new Uint8Array(ciphertextBuf), iv.length);

          encryptedList.push({
            hash: hashHex,
            enc: uint8ToBase64(combined)
          });
        }

        const outData = {
          metadata: {
            algorithm: 'AES-256-GCM',
            kdf: 'PBKDF2-SHA256',
            iterations: 100000,
            salt: uint8ToBase64(salt),
            hashAlgorithm: 'SHA-256',
            hashLength: 10,
            updatedAt: new Date().toISOString()
          },
          classes: {
            [state.classGroup]: encryptedList
          }
        };

        const blob = new Blob([JSON.stringify(outData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'leerlingen_enc.json';
        a.click();
        URL.revokeObjectURL(url);
        alert(`Versleuteld bestand gegenereerd met ${encryptedList.length} leerlingen! Download gestart.`);
      } catch (err) {
        alert('Fout bij versleutelen: ' + err.message);
      }
    });

    document.getElementById('btn-prev-student')?.addEventListener('click', () => {
      if (state.activeStudentIndex > 0) {
        selectStudent(state.activeStudentIndex - 1);
      }
    });

    document.getElementById('btn-next-student')?.addEventListener('click', () => {
      if (state.activeStudentIndex < state.students.length - 1) {
        selectStudent(state.activeStudentIndex + 1);
      }
    });

    document.getElementById('student-select')?.addEventListener('change', (e) => {
      selectStudent(parseInt(e.target.value, 10));
    });

    // Toetsenbord sneltoetsen
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft' && state.activeStudentIndex > 0) {
        selectStudent(state.activeStudentIndex - 1);
      } else if (e.key === 'ArrowRight' && state.activeStudentIndex < state.students.length - 1) {
        selectStudent(state.activeStudentIndex + 1);
      }
    });

    window.addEventListener('beforeunload', (e) => {
      if (state.isDirty) {
        e.preventDefault();
        e.returnValue = 'Je hebt niet-opgeslagen punten in het beoordelingssysteem.';
      }
    });
  }

  async function loadStudentsList() {
    // 1. Zoek versleutelde data (Zero-Knowledge)
    const encEl = document.getElementById('avant-encrypted-students-data');
    const encData = safeParseJson(encEl);

    if (encData && encData.classes && encData.classes[state.classGroup]) {
      state.cryptoData = encData;
      const rawList = encData.classes[state.classGroup] || [];
      state.students = rawList.map((item) => ({
        hash: item.hash,
        enc: item.enc,
        name: `Leerling ${item.hash}`,
        shortName: item.hash.slice(0, 6),
        isDecrypted: false
      }));

      // Probeer automatisch te ontsleutelen als sleutel in sessionStorage staat
      const savedPass = sessionStorage.getItem('avant_grading_passphrase');
      if (savedPass) {
        try {
          await decryptStudents(savedPass);
        } catch (e) {
          sessionStorage.removeItem('avant_grading_passphrase');
        }
      }
      return;
    }

    // 2. Fallback naar niet-versleutelde local data indien aanwezig
    const injectedEl = document.getElementById('avant-students-data');
    if (injectedEl) {
      const classes = safeParseJson(injectedEl);
      if (classes && classes[state.classGroup] && classes[state.classGroup].length > 0) {
        state.students = classes[state.classGroup].map(s => ({
          hash: s.hash,
          name: s.name,
          shortName: s.name.split(' ')[0],
          isDecrypted: true
        }));
        state.isUnlocked = true;
        return;
      }
    }
  }

  // --- Submissie Tabs (indieningen) ---

  function buildSubmissionTabs() {
    const panel = document.getElementById('submissions-tab-panel');
    const container = document.getElementById('submissions-tabs');
    if (!panel || !container) return;

    if (state.submissions.length <= 1) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'block';
    container.innerHTML = '';

    state.submissions.forEach((sub, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `btn-sub-tab ${idx === state.activeSubIndex ? 'active' : ''}`;
      btn.dataset.index = idx;
      btn.innerHTML = `
        <span class="sub-tab-title">${escapeHtml(sub.title)}</span>
        <span class="sub-tab-badge">${sub.weight} pt</span>
      `;

      btn.addEventListener('click', () => switchSubmission(idx));
      container.appendChild(btn);
    });
  }

  function switchSubmission(index) {
    if (index < 0 || index >= state.submissions.length) return;
    state.activeSubIndex = index;
    const sub = getActiveSubmission();

    // Update tab knoppen
    document.querySelectorAll('.btn-sub-tab').forEach((b) => {
      b.classList.toggle('active', parseInt(b.dataset.index, 10) === index);
    });

    // Update weight badge
    const badgeWeight = document.getElementById('badge-active-weight');
    if (badgeWeight) {
      badgeWeight.innerHTML = `Gewicht: <strong>${sub.weight} pt</strong> per cluster`;
    }

    // Update Subtitles
    const subTitleEl = document.getElementById('summary-section-subtitle');
    if (subTitleEl) {
      subTitleEl.textContent = `Berekende scores voor "${sub.title}" (${sub.weight} pt per cluster)`;
    }

    // Re-render compact summary table & active student rubric
    buildCompactSummaryTable();
    if (state.students.length > 0) {
      selectStudent(state.activeStudentIndex);
    }
    updateAllChipsStatus();

    updateStatus(`Actieve indiening: "${sub.title}" (max ${sub.weight} pt per cluster).`, 'info');
  }

  // --- Student Selector ---

  function buildStudentSelector() {
    const dropdown = document.getElementById('student-select');
    const chipsStrip = document.getElementById('student-chips-strip');
    if (!dropdown || !chipsStrip) return;

    dropdown.innerHTML = '';
    chipsStrip.innerHTML = '';

    state.students.forEach((student, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${idx + 1}. ${student.name}`;
      dropdown.appendChild(opt);

      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'student-chip';
      chip.dataset.index = idx;
      chip.innerHTML = `
        <span class="chip-index">${idx + 1}</span>
        <span class="chip-name">${escapeHtml(student.name.split(' ')[0])}</span>
        <span class="chip-status-dot" id="dot-${student.hash}"></span>
      `;

      chip.addEventListener('click', () => selectStudent(idx));
      chipsStrip.appendChild(chip);
    });

    updateAllChipsStatus();
  }

  function selectStudent(index) {
    if (index < 0 || index >= state.students.length) return;
    state.activeStudentIndex = index;
    const student = state.students[index];

    const dropdown = document.getElementById('student-select');
    if (dropdown) dropdown.value = index;

    document.querySelectorAll('.student-chip').forEach((chip) => {
      chip.classList.toggle('active', parseInt(chip.dataset.index, 10) === index);
    });

    const prevBtn = document.getElementById('btn-prev-student');
    const nextBtn = document.getElementById('btn-next-student');
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) nextBtn.disabled = index === state.students.length - 1;

    document.getElementById('display-student-name').textContent = student.name;
    document.getElementById('display-student-hash').textContent = student.hash;

    renderStudentRubric(student);
    updateStudentHeaderScore(student.hash);
    highlightSummaryTableRow(student.hash);
  }

  // --- Rubriek Renders & Gewogen Berekening ---

  function renderStudentRubric(student) {
    const container = document.getElementById('clusters-container');
    if (!container) return;

    container.innerHTML = '';
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();
    const studentEval = subEvals[student.hash] || { scores: {}, criteriaLevels: {} };
    const criteriaLevels = studentEval.criteriaLevels || {};

    if (!sub.clusters || sub.clusters.length === 0) {
      container.innerHTML = '<p class="empty-notice">Geen actieve clusters geconfigureerd voor deze indiening.</p>';
      return;
    }

    sub.clusters.forEach((cluster) => {
      const clusterBox = document.createElement('div');
      clusterBox.className = 'rubric-cluster-card';
      clusterBox.id = `cluster-card-${cluster.id}`;

      const clusterScoreInfo = calculateWeightedClusterScore(cluster, criteriaLevels, sub.weight);

      clusterBox.innerHTML = `
        <div class="cluster-card-header">
          <div class="cluster-title-wrap">
            <span class="cluster-tag">${escapeHtml(cluster.id)}</span>
            <h3 class="cluster-name">${escapeHtml(cluster.naam)}</h3>
          </div>
          <div class="cluster-calc-badge" id="calc-badge-${cluster.id}">
            ${formatClusterScoreBadge(clusterScoreInfo, sub.weight)}
          </div>
        </div>
        <div class="criteria-cards-list" id="criteria-list-${cluster.id}"></div>
      `;

      const criteriaList = clusterBox.querySelector('.criteria-cards-list');

      cluster.criteria.forEach((crit) => {
        const currentLevel = criteriaLevels[crit.code];
        const critWeight = crit.gewicht || 1;
        const critCard = document.createElement('div');
        critCard.className = `crit-eval-row ${currentLevel !== undefined ? 'is-graded' : ''}`;
        critCard.id = `crit-row-${student.hash}-${crit.code}`;

        critCard.innerHTML = `
          <div class="crit-desc-col">
            <div class="crit-code-badge-wrap">
              <span class="crit-code-badge">${escapeHtml(crit.code)}</span>
              ${critWeight > 1 ? `<span class="badge-weight-multiplier" title="Telt ${critWeight}x mee in het gemiddelde">${critWeight}× gewicht</span>` : ''}
            </div>
            <div class="crit-text">${escapeHtml(crit.criterium || crit.omschrijving)}</div>
          </div>
          <div class="crit-buttons-col">
            <div class="niveau-pill-group">
              ${NIVEAUS.map((n) => `
                <button type="button" 
                        class="btn-niveau-pill niv-${n.level} ${currentLevel === n.level ? 'active' : ''}" 
                        data-code="${crit.code}" 
                        data-level="${n.level}">
                  <span class="pill-lvl">${n.label}</span>
                  <span class="pill-desc">${n.desc}</span>
                </button>
              `).join('')}
            </div>
          </div>
        `;

        critCard.querySelectorAll('.btn-niveau-pill').forEach((btn) => {
          btn.addEventListener('click', () => {
            const level = parseInt(btn.dataset.level, 10);
            handleCriteriumLevelClick(student.hash, cluster, crit.code, level);
          });
        });

        criteriaList.appendChild(critCard);
      });

      container.appendChild(clusterBox);
    });
  }

  function handleCriteriumLevelClick(studentHash, cluster, critCode, level) {
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();

    if (!subEvals[studentHash]) {
      subEvals[studentHash] = { scores: {}, criteriaLevels: {} };
    }
    if (!subEvals[studentHash].criteriaLevels) {
      subEvals[studentHash].criteriaLevels = {};
    }
    if (!subEvals[studentHash].scores) {
      subEvals[studentHash].scores = {};
    }

    const current = subEvals[studentHash].criteriaLevels[critCode];
    if (current === level) {
      delete subEvals[studentHash].criteriaLevels[critCode];
    } else {
      subEvals[studentHash].criteriaLevels[critCode] = level;
    }

    state.isDirty = true;

    // Gewogen berekening
    const scoreInfo = calculateWeightedClusterScore(cluster, subEvals[studentHash].criteriaLevels, sub.weight);
    if (scoreInfo.isCalculated) {
      subEvals[studentHash].scores[cluster.id] = scoreInfo.score;
    } else {
      delete subEvals[studentHash].scores[cluster.id];
    }

    // Update UI badge
    const badgeEl = document.getElementById(`calc-badge-${cluster.id}`);
    if (badgeEl) {
      badgeEl.innerHTML = formatClusterScoreBadge(scoreInfo, sub.weight);
    }

    // Update Pill Buttons
    const rowEl = document.getElementById(`crit-row-${studentHash}-${critCode}`);
    if (rowEl) {
      const newLvl = subEvals[studentHash].criteriaLevels[critCode];
      rowEl.classList.toggle('is-graded', newLvl !== undefined);
      rowEl.querySelectorAll('.btn-niveau-pill').forEach((btn) => {
        btn.classList.toggle('active', parseInt(btn.dataset.level, 10) === newLvl);
      });
    }

    updateStudentHeaderScore(studentHash);
    updateCompactTableRow(studentHash);
    updateAllChipsStatus();

    updateStatus(`Criterium ${critCode} aangepast. Gewogen clusterpunt voor ${cluster.id} direct berekend.`, 'success');
  }

  function calculateWeightedClusterScore(cluster, criteriaLevels, submissionWeight) {
    const criteria = cluster.criteria || [];
    if (criteria.length === 0) return { isCalculated: false, score: 0, avgLevel: 0, gradedCount: 0, totalCount: 0 };

    let weightedSum = 0;
    let totalWeightOfGraded = 0;
    let gradedCount = 0;

    criteria.forEach((crit) => {
      const lvl = criteriaLevels[crit.code];
      const weight = crit.gewicht || 1;
      if (lvl !== undefined) {
        weightedSum += lvl * weight;
        totalWeightOfGraded += weight;
        gradedCount++;
      }
    });

    if (gradedCount === 0 || totalWeightOfGraded === 0) {
      return { isCalculated: false, score: 0, avgLevel: 0, gradedCount: 0, totalCount: criteria.length };
    }

    const avgLevel = weightedSum / totalWeightOfGraded;
    const score = Math.round(((avgLevel / 3) * submissionWeight) * 10) / 10;

    return {
      isCalculated: true,
      score: score,
      avgLevel: avgLevel,
      gradedCount: gradedCount,
      totalCount: criteria.length,
      weighted: criteria.some((c) => (c.gewicht || 1) > 1)
    };
  }

  function formatClusterScoreBadge(info, submissionWeight) {
    if (!info.isCalculated) {
      return `<span class="score-pending">Nog geen criteria beoordeeld (${info.totalCount} doelen)</span>`;
    }
    return `
      <div class="score-result-badge">
        <span class="score-main"><strong>${info.score.toFixed(1)}</strong> / ${submissionWeight}</span>
        <span class="score-sub">(gem. ${info.avgLevel.toFixed(2)}/3 • ${info.gradedCount}/${info.totalCount} doelen${info.weighted ? ' • gewogen' : ''})</span>
      </div>
    `;
  }

  function updateStudentHeaderScore(studentHash) {
    const scoreEl = document.getElementById('display-student-score');
    if (!scoreEl) return;

    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();
    const scores = subEvals[studentHash]?.scores || {};
    let sum = 0;
    let count = 0;

    sub.clusters.forEach((c) => {
      if (scores[c.id] !== undefined) {
        sum += scores[c.id];
        count++;
      }
    });

    if (count === 0) {
      scoreEl.innerHTML = `<span class="overall-label">Totaal Gemiddelde:</span> <strong class="overall-value">-</strong>`;
      return;
    }

    const avg = sum / count;
    const pct = Math.round((avg / sub.weight) * 100);
    const isPass = pct >= 50;

    scoreEl.innerHTML = `
      <span class="overall-label">Gemiddelde (${count}/${sub.clusters.length} clusters):</span>
      <strong class="overall-value ${isPass ? 'pass' : 'fail'}">${avg.toFixed(1)} / ${sub.weight} (${pct}%)</strong>
    `;
  }

  // --- Compact Summary Table ---

  function buildCompactSummaryTable() {
    const headerRow = document.getElementById('compact-header-row');
    const tbody = document.getElementById('compact-body-rows');
    if (!headerRow || !tbody) return;

    const sub = getActiveSubmission();
    headerRow.innerHTML = '<th class="col-name">Leerling</th>';

    sub.clusters.forEach((c) => {
      const th = document.createElement('th');
      th.className = 'col-cluster-calc';
      th.innerHTML = `<span>${escapeHtml(c.id)}</span><small>/${sub.weight}</small>`;
      th.title = `${c.id} ${c.naam}`;
      headerRow.appendChild(th);
    });

    const thGem = document.createElement('th');
    thGem.className = 'col-gem';
    thGem.textContent = 'Gemiddelde';
    headerRow.appendChild(thGem);

    tbody.innerHTML = '';
    state.students.forEach((student, idx) => {
      const tr = document.createElement('tr');
      tr.id = `summary-row-${student.hash}`;
      tr.dataset.hash = student.hash;
      tr.dataset.index = idx;

      tr.addEventListener('click', () => selectStudent(idx));
      tbody.appendChild(tr);

      updateCompactTableRow(student.hash);
    });
  }

  function updateCompactTableRow(studentHash) {
    const tr = document.getElementById(`summary-row-${studentHash}`);
    if (!tr) return;

    const student = state.students.find((s) => s.hash === studentHash);
    if (!student) return;

    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();
    const scores = subEvals[studentHash]?.scores || {};
    let sum = 0;
    let count = 0;

    let html = `
      <td class="col-name">
        <div class="row-student-wrap">
          <span class="row-student-name">${escapeHtml(student.name)}</span>
          <code class="row-hash">${student.hash}</code>
        </div>
      </td>
    `;

    sub.clusters.forEach((c) => {
      const val = scores[c.id];
      if (val !== undefined) {
        sum += val;
        count++;
        html += `<td class="col-cluster-score-cell has-val">${val.toFixed(1)}</td>`;
      } else {
        html += `<td class="col-cluster-score-cell empty-val">-</td>`;
      }
    });

    if (count > 0) {
      const avg = sum / count;
      const pct = Math.round((avg / sub.weight) * 100);
      const isPass = pct >= 50;
      html += `
        <td class="col-gem">
          <span class="pill-gem ${isPass ? 'pass' : 'fail'}">${avg.toFixed(1)} <small>(${pct}%)</small></span>
        </td>
      `;
    } else {
      html += `<td class="col-gem"><span class="pill-gem empty">-</span></td>`;
    }

    tr.innerHTML = html;
  }

  function highlightSummaryTableRow(studentHash) {
    document.querySelectorAll('#compact-body-rows tr').forEach((tr) => {
      tr.classList.toggle('active-row', tr.dataset.hash === studentHash);
    });
  }

  function updateAllChipsStatus() {
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();

    state.students.forEach((student) => {
      const dot = document.getElementById(`dot-${student.hash}`);
      if (!dot) return;

      const evalData = subEvals[student.hash];
      const scores = evalData?.scores || {};
      const gradedClusters = Object.keys(scores).length;

      dot.className = 'chip-status-dot';
      if (gradedClusters === sub.clusters.length && gradedClusters > 0) {
        dot.classList.add('done');
      } else if (gradedClusters > 0) {
        dot.classList.add('partial');
      } else {
        dot.classList.add('none');
      }
    });
  }

  // --- Opslaan & Bestandsbeheer ---

  async function handleSaveFile(forcePicker = false) {
    try {
      // Bouw complete JSON met alle submissions
      const submissionsData = {};
      state.submissions.forEach((sub) => {
        submissionsData[sub.id] = {
          id: sub.id,
          title: sub.title,
          weight: sub.weight,
          clusters: sub.clusters.map((c) => ({ id: c.id, naam: c.naam })),
          evaluations: state.submissionEvals[sub.id] || {}
        };
      });

      const payload = {
        source: 'Avant Local Grading System',
        version: '2.1.0',
        assignmentId: state.assignmentId,
        classGroup: state.classGroup,
        lastUpdated: new Date().toISOString(),
        submissions: submissionsData
      };

      if (window.showSaveFilePicker) {
        if (!state.fileHandle || forcePicker) {
          state.fileHandle = await window.showSaveFilePicker({
            suggestedName: `rubriek-${state.classGroup.toLowerCase()}-${state.assignmentId}.json`,
            types: [{
              description: 'JSON Bestand',
              accept: { 'application/json': ['.json'] }
            }]
          });
        }
        const writable = await state.fileHandle.createWritable();
        await writable.write(JSON.stringify(payload, null, 2));
        await writable.close();
      } else {
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `rubriek-${state.classGroup.toLowerCase()}-${state.assignmentId}.json`;
        a.click();
      }

      state.isDirty = false;
      updateStatus(`Succesvol opgeslagen om ${new Date().toLocaleTimeString()}!`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Fout bij opslaan:', err);
      updateStatus(`Fout bij opslaan: ${err.message}`, 'error');
    }
  }

  async function handleOpenFile() {
    try {
      if (!window.showOpenFilePicker) {
        alert('File System Access API niet ondersteund. Gebruik Chrome of Edge.');
        return;
      }

      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Bestanden',
          accept: { 'application/json': ['.json'] }
        }],
        multiple: false
      });

      state.fileHandle = handle;
      const file = await handle.getFile();
      const text = await file.text();
      const json = JSON.parse(text);

      if (json.submissions) {
        Object.entries(json.submissions).forEach(([subId, subData]) => {
          state.submissionEvals[subId] = subData.evaluations || {};
        });
      } else if (json.evaluations) {
        const firstSubId = state.submissions[0]?.id || 'default';
        state.submissionEvals[firstSubId] = json.evaluations;
      }

      state.isDirty = false;
      switchSubmission(state.activeSubIndex);
      updateStatus(`Geladen: ${file.name}`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Fout bij openen:', err);
      updateStatus(`Fout bij openen: ${err.message}`, 'error');
    }
  }

  // --- Klembord Export voor Smartschool Tampermonkey ---

  async function copyToClipboard() {
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();
    const exportScores = {};
    let studentCount = 0;
    let scoreCount = 0;

    Object.entries(subEvals).forEach(([hash, evalData]) => {
      const scores = evalData.scores || {};
      const activeScores = {};
      sub.clusters.forEach((cluster) => {
        if (scores[cluster.id] !== undefined && scores[cluster.id] !== '') {
          activeScores[cluster.id] = parseFloat(scores[cluster.id]);
          scoreCount++;
        }
      });

      if (Object.keys(activeScores).length > 0) {
        exportScores[hash] = activeScores;
        studentCount++;
      }
    });

    const exportBundle = {
      source: 'Avant Local Grading',
      version: '2.1.0',
      assignmentId: state.assignmentId,
      submissionId: sub.id,
      submissionTitle: sub.title,
      classGroup: state.classGroup,
      weight: sub.weight,
      activeClusters: sub.clusters.map((c) => ({ id: c.id, naam: c.naam })),
      timestamp: new Date().toISOString(),
      scores: exportScores
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportBundle, null, 2));
      updateStatus(`Klaar voor Smartschool! ${scoreCount} cijfers voor ${studentCount} leerlingen gekopieerd voor "${sub.title}".`, 'success');
    } catch (err) {
      console.error('Klembordfout:', err);
      updateStatus('Kon klembord niet beschrijven. Controleer browsertoestemmingen.', 'error');
    }
  }

  function updateStatus(text, type = 'info') {
    const el = document.getElementById('grading-status-text');
    if (!el) return;
    el.textContent = text;
    el.className = `grading-status-banner status-${type}`;
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  document.addEventListener('DOMContentLoaded', init);
})();
