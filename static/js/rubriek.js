// ============================================================================
// SOURCE FILE: assets/js/rubriek.js
// DO NOT EDIT static/js/rubriek.js directly!
// Any changes here are automatically mirrored to static/js/rubriek.js
// by scripts/dev.js (npm run dev) on startup and on file save.
//
// BRONBESTAND: assets/js/rubriek.js
// Bewerk static/js/rubriek.js NIET rechtstreeks!
// Wijzigingen hier worden via scripts/dev.js automatisch gespiegeld naar static/.
// ============================================================================
/**
 * Avant Local Grading Pipeline (V2.2 - Zero-Knowledge Privacy & Direct Local Storage)
 * 
 * - Privacy: Geen echte namen in code of weergave. Leerlingen worden cryptografisch
 *   weergegeven via SHA-256 hashes en klasvolgorde (bijv. Leerling 1 · 8ab009875a).
 * - Directe lokale opslag: Wijzigingen in criteria of punten worden direct en automatisch
 *   opgeslagen in /avant/data/ via de lokale Save Server (http://127.0.0.1:1315).
 * - Smartschool integratie: 1-klik kopieerfunctie voor de Tampermonkey Auto-Grader.
 */
(() => {
  if (window.__avantGradingInitialized) return;
  window.__avantGradingInitialized = true;

  const NIVEAUS = [
    { level: 0, label: '0-5', desc: 'Niet beheerst' },
    { level: 1, label: '5-7', desc: 'In ontwikkeling' },
    { level: 2, label: '7-9', desc: 'Voldoende' },
    { level: 3, label: '9-10', desc: 'Verdiepend' }
  ];

  const SAVE_SERVER_URL = `${window.location.protocol}//${window.location.hostname || 'localhost'}:1315`;

  const state = {
    container: null,
    classGroup: '5CRM',
    assignmentId: '',
    submissions: [], // Array van { id, title, weight, clusters: [...] }
    activeSubIndex: 0,
    students: [], // Array van { id, hash, name, displayLabel, shortName }
    submissionEvals: {},
    activeStudentIndex: 0,
    fileHandle: null,
    isDirty: false,
    isServerConnected: false,
    leerplandoelen: {}
  };

  let autoSaveTimer = null;

  function safeParseJson(el) {
    if (!el) return null;
    try {
      let val = el.textContent || el.innerText || '';
      val = val.trim();
      if (!val) return null;
      let depth = 0;
      while (typeof val === 'string' && depth < 5) {
        depth++;
        try {
          const parsed = JSON.parse(val);
          val = parsed;
        } catch (e) {
          break;
        }
      }
      return val;
    } catch (err) {
      console.error('Fout bij JSON parsen:', err);
      return null;
    }
  }

  function getLocalIsoString(date = new Date()) {
    const pad = (n, width = 2) => String(n).padStart(width, '0');
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const ms = pad(date.getMilliseconds(), 3);

    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutes);
    const offsetHours = pad(Math.floor(absOffset / 60));
    const offsetMins = pad(absOffset % 60);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${ms}${sign}${offsetHours}:${offsetMins}`;
  }

  function getRubriekFilename() {
    let id = state.assignmentId || 'opdracht';
    if (id.startsWith('rubriek-')) {
      return `${id}.json`;
    }
    return `rubriek-${id}.json`;
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

  function buildPayload() {
    const submissionsData = {};
    state.submissions.forEach((sub) => {
      const criteriaWeights = {};
      sub.clusters.forEach((cluster) => {
        (cluster.criteria || []).forEach((crit) => {
          if (crit.gewicht) {
            criteriaWeights[crit.code] = crit.gewicht;
          }
        });
      });

      submissionsData[sub.id] = {
        id: sub.id,
        title: sub.title,
        weight: sub.weight,
        criteriaWeights,
        clusters: sub.clusters.map((c) => ({
          id: c.id,
          naam: c.naam,
          criteria: (c.criteria || []).map((crit) => ({
            code: crit.code,
            gewicht: crit.gewicht || 1
          }))
        })),
        evaluations: state.submissionEvals[sub.id] || {}
      };
    });

    return {
      source: 'Avant Local Grading System',
      version: '2.2.0',
      assignmentId: state.assignmentId,
      classGroup: state.classGroup,
      lastUpdated: getLocalIsoString(),
      submissions: submissionsData
    };
  }

  // --- Lokale Save Server Integratie (http://127.0.0.1:1315) ---

  async function checkServerStatus() {
    const badge = document.getElementById('save-server-status');
    const textEl = document.getElementById('save-server-text');

    try {
      const res = await fetch(`${SAVE_SERVER_URL}/api/status`, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout ? AbortSignal.timeout(1200) : undefined
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (data && data.ok) {
        state.isServerConnected = true;
        if (badge) {
          badge.className = 'badge-status-server';
          badge.title = `Direct verbonden met lokale opslag in ${data.dataDir}`;
        }
        if (textEl) {
          textEl.textContent = 'Lokaal verbonden (data/)';
        }
        return true;
      }
    } catch (e) {
      state.isServerConnected = false;
      if (badge) {
        badge.className = 'badge-status-server disconnected';
        badge.title = 'Lokale saveserver niet actief. Wijzigingen worden via browser opgeslagen.';
      }
      if (textEl) {
        textEl.textContent = 'Handmatig opslaan';
      }
      return false;
    }
  }

  async function saveToLocalServer(payload, filename) {
    const badge = document.getElementById('save-server-status');
    const textEl = document.getElementById('save-server-text');

    if (badge) badge.classList.add('saving');
    if (textEl) textEl.textContent = 'Opslaan in data/...';

    try {
      const res = await fetch(`${SAVE_SERVER_URL}/api/save-rubriek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename,
          filePath: state.filePath,
          data: payload
        })
      });

      if (!res.ok) throw new Error(`Serverfout HTTP ${res.status}`);
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || 'Kon niet wegschrijven');

      state.isDirty = false;
      state.isServerConnected = true;

      if (badge) {
        badge.className = 'badge-status-server';
        badge.classList.remove('saving');
      }
      if (textEl) {
        textEl.textContent = `Opgeslagen (${result.displayTime || new Date().toLocaleTimeString()})`;
      }

      updateStatus(`Wijzigingen direct opgeslagen in ${result.path} om ${result.displayTime || new Date().toLocaleTimeString()}!`, 'success');
      return true;
    } catch (err) {
      console.warn('[SaveServer] Fout bij lokaal opslaan:', err);
      if (badge) badge.className = 'badge-status-server disconnected';
      if (textEl) textEl.textContent = 'Opslaan mislukt';
      throw err;
    }
  }

  function triggerAutoSave() {
    state.isDirty = true;
    if (!state.isServerConnected) return;

    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    autoSaveTimer = setTimeout(async () => {
      try {
        const payload = buildPayload();
        const filename = getRubriekFilename();
        await saveToLocalServer(payload, filename);
      } catch (err) {
        console.warn('[AutoSave] Automatisch opslaan mislukt:', err);
      }
    }, 800);
  }

  // --- Handmatig Opslaan & Bestand openen ---

  async function handleSaveFile(forcePicker = false) {
    try {
      const payload = buildPayload();
      const filename = getRubriekFilename();

      // 1. Probeer eerst direct via de lokale server
      if (state.isServerConnected && !forcePicker) {
        await saveToLocalServer(payload, filename);
        return;
      }

      // 2. Fallback: File System Access API
      if (window.showSaveFilePicker) {
        if (!state.fileHandle || forcePicker) {
          state.fileHandle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [{
              description: 'JSON Bestand',
              accept: { 'application/json': ['.json'] }
            }]
          });
        }
        const writable = await state.fileHandle.createWritable();
        await writable.write(JSON.stringify(payload, null, 2) + '\n');
        await writable.close();
        state.isDirty = false;
        updateStatus(`Succesvol opgeslagen in ${filename} om ${new Date().toLocaleTimeString()}!`, 'success');
        return;
      }

      // 3. Fallback: Browser download
      const blob = new Blob([JSON.stringify(payload, null, 2) + '\n'], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      a.click();
      state.isDirty = false;
      updateStatus(`Bestand gedownload als ${filename}. Plaats in data/-map.`, 'info');
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Fout bij opslaan:', err);
      updateStatus(`Fout bij opslaan: ${err.message}`, 'error');
    }
  }

  async function handleOpenFile() {
    try {
      if (!window.showOpenFilePicker) {
        alert('File System Access API niet ondersteund in deze browser. Gebruik Chrome of Edge om bestanden direct te openen.');
        return;
      }

      const [handle] = await window.showOpenFilePicker({
        types: [{
          description: 'JSON Bestanden',
          accept: { 'application/json': ['.json'] }
        }],
        multiple: false
      });

      const file = await handle.getFile();
      const content = await file.text();
      const loadedData = JSON.parse(content);

      if (loadedData.submissions) {
        Object.entries(loadedData.submissions).forEach(([subId, subData]) => {
          state.submissionEvals[subId] = subData.evaluations || {};
        });
      } else if (loadedData.evaluations) {
        const firstSubId = state.submissions[0]?.id || 'default';
        state.submissionEvals[firstSubId] = loadedData.evaluations;
      }

      state.fileHandle = handle;
      state.isDirty = false;

      // Herteken actieve student & overzicht
      const activeStudent = state.students[state.activeStudentIndex];
      if (activeStudent) {
        renderStudentRubric(activeStudent);
        updateStudentHeaderScore(activeStudent.hash);
      }
      buildCompactSummaryTable();
      updateAllChipsStatus();

      updateStatus(`Bestand "${file.name}" succesvol ingeladen!`, 'success');
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Fout bij inladen:', err);
      updateStatus(`Fout bij inladen: ${err.message}`, 'error');
    }
  }

  // --- Initialisatie & Leerlingenlijst ---

  async function init() {
    state.container = document.getElementById('avant-grading-container');
    if (!state.container) return;

    state.classGroup = state.container.dataset.classGroup || '5CRM';
    state.assignmentId = state.container.dataset.assignmentId || 'opdracht';
    state.filePath = state.container.dataset.filePath || '';

    // 1. Submissies & leerplandoelen parsen
    const subDataEl = document.getElementById('avant-submissions-data');
    state.submissions = safeParseJson(subDataEl) || [];
    const lpDataEl = document.getElementById('avant-leerplandoelen-data');
    state.leerplandoelen = safeParseJson(lpDataEl) || {};
    if (state.submissions.length === 0) {
      state.submissions = [{
        id: 'default',
        title: state.container.dataset.pageTitle || 'Opdracht',
        weight: 20,
        clusters: []
      }];
    }

    // 2. Bestaande evaluaties & gewichten inladen uit data/rubriek-*.json
    const savedDataEl = document.getElementById('avant-saved-evaluations-data');
    const savedData = safeParseJson(savedDataEl);
    if (savedData && typeof savedData === 'object') {
      if (savedData.submissions) {
        Object.entries(savedData.submissions).forEach(([subId, subData]) => {
          state.submissionEvals[subId] = subData.evaluations || {};

          // Gewichten herstellen indien aangepast in data
          const targetSub = state.submissions.find((s) => s.id === subId);
          if (targetSub) {
            if (typeof subData.weight === 'number' && subData.weight > 0) {
              targetSub.weight = subData.weight;
            }
            if (subData.criteriaWeights && typeof subData.criteriaWeights === 'object') {
              targetSub.clusters.forEach((cluster) => {
                (cluster.criteria || []).forEach((crit) => {
                  if (typeof subData.criteriaWeights[crit.code] === 'number') {
                    crit.gewicht = subData.criteriaWeights[crit.code];
                  }
                });
              });
            } else if (Array.isArray(subData.clusters)) {
              subData.clusters.forEach((sc) => {
                if (Array.isArray(sc.criteria)) {
                  sc.criteria.forEach((scrit) => {
                    const cMatch = targetSub.clusters.find((c) => c.id === sc.id);
                    if (cMatch) {
                      const critMatch = (cMatch.criteria || []).find((cr) => cr.code === scrit.code);
                      if (critMatch && typeof scrit.gewicht === 'number') {
                        critMatch.gewicht = scrit.gewicht;
                      }
                    }
                  });
                }
              });
            }
          }
        });
      } else if (savedData.evaluations) {
        const firstSubId = state.submissions[0]?.id || 'default';
        state.submissionEvals[firstSubId] = savedData.evaluations;
        if (typeof savedData.weight === 'number' && savedData.weight > 0) {
          state.submissions[0].weight = savedData.weight;
        }
      }
    }

    // Criteria binnen elk cluster altijd numeriek op code sorteren
    state.submissions.forEach((sub) => {
      (sub.clusters || []).forEach((cluster) => {
        if (Array.isArray(cluster.criteria)) {
          cluster.criteria.sort((a, b) =>
            (a.code || '').localeCompare(b.code || '', undefined, { numeric: true, sensitivity: 'base' })
          );
        }
      });
    });

    // 3. Leerlingen inladen & automatisch ontsleutelen in geheugen
    loadStudentsList();
    await autoDecryptStudents();

    // 4. Setup UI
    setupEventListeners();
    buildSubmissionTabs();
    buildStudentSelector();

    // 5. Bepaal initiële submissie & student uit URL (bv. #oplevering/8ab009875a of #8ab009875a)
    const { subIndex, studentIndex } = parseUrlHash(window.location.hash);
    if (subIndex !== -1) {
      state.activeSubIndex = subIndex;
    }
    if (studentIndex !== -1) {
      state.activeStudentIndex = studentIndex;
    }

    // 6. Activeer gekozen submissie en student
    switchSubmission(state.activeSubIndex, false);
    selectStudent(state.activeStudentIndex, true);

    // 7. Controleer lokale Save Server
    await checkServerStatus();

    updateStatus('Klaar voor invoer. Duid per succescriterium het niveau aan; clusterpunten worden gewogen en live berekend.', 'info');
  }

  const DEFAULT_KEY_PASSPHRASE = 'avant2026';

  function base64ToUint8(str) {
    const bin = atob(str);
    const len = bin.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = bin.charCodeAt(i);
    }
    return bytes;
  }

  async function autoDecryptStudents() {
    if (!state.cryptoData || !state.cryptoData.metadata) return;
    try {
      const meta = state.cryptoData.metadata;
      if (!meta.salt) return;
      const salt = base64ToUint8(meta.salt);
      const iterations = meta.iterations || 100000;

      const enc = new TextEncoder();
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(DEFAULT_KEY_PASSPHRASE),
        'PBKDF2',
        false,
        ['deriveKey']
      );

      const key = await window.crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      );

      const dec = new TextDecoder();
      for (const s of state.students) {
        if (!s.enc) continue;
        try {
          const rawBytes = base64ToUint8(s.enc);
          if (rawBytes.length < 28) continue;
          const iv = rawBytes.slice(0, 12);
          const ciphertextWithTag = rawBytes.slice(12);

          const decryptedBuffer = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv },
            key,
            ciphertextWithTag
          );
          const realName = dec.decode(decryptedBuffer).trim();
          if (realName) {
            s.name = realName;
            s.displayLabel = realName;
            const firstName = realName.split(' ')[0];
            s.shortName = `${s.id} · ${firstName}`;
          }
        } catch (e) {
          // Bij decryptiefout blijft de geanonimiseerde fallback-naam behouden
        }
      }
    } catch (err) {
      console.warn('[Crypto] Automatische decryptie overgeslagen:', err);
    }
  }

  function loadStudentsList() {
    // Zoek gehashte data in site.Data (leerlingen_enc)
    const encEl = document.getElementById('avant-encrypted-students-data');
    const encData = safeParseJson(encEl);

    let rawList = [];
    if (encData && encData.classes && encData.classes[state.classGroup]) {
      state.cryptoData = encData;
      rawList = encData.classes[state.classGroup];
    } else {
      const injectedEl = document.getElementById('avant-students-data');
      const fallbackData = safeParseJson(injectedEl);
      if (fallbackData && fallbackData[state.classGroup]) {
        rawList = fallbackData[state.classGroup];
      }
    }

    state.students = rawList.map((item, index) => {
      const studentNumber = index + 1;
      const hash = item.hash || (typeof item === 'string' ? item : `student_${studentNumber}`);
      return {
        id: studentNumber,
        hash: hash,
        enc: item.enc || '',
        name: `Leerling ${studentNumber}`,
        displayLabel: `Leerling ${studentNumber}`,
        shortName: `${studentNumber} · ${hash.slice(0, 6)}`
      };
    });
  }

  function setupEventListeners() {
    document.getElementById('btn-copy-smartschool')?.addEventListener('click', copyToClipboard);

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

    const inputSubWeight = document.getElementById('input-sub-weight');
    if (inputSubWeight) {
      inputSubWeight.addEventListener('change', () => {
        const sub = getActiveSubmission();
        const val = parseInt(inputSubWeight.value, 10);
        if (!isNaN(val) && val >= 1 && val <= 500) {
          sub.weight = val;
          const activeTabBadge = document.querySelector(`.submission-tab-btn[data-index="${state.activeSubIndex}"] .tab-badge`);
          if (activeTabBadge) {
            activeTabBadge.textContent = `${sub.weight} pt`;
          }
          recalculateAllScoresForActiveSubmission();
        } else {
          inputSubWeight.value = sub.weight;
        }
      });
    }

    // Toetsenbordnavigatie (Pijltje links/rechts tussen leerlingen)
    window.addEventListener('keydown', (e) => {
      if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowLeft' && state.activeStudentIndex > 0) {
        e.preventDefault();
        selectStudent(state.activeStudentIndex - 1);
      } else if (e.key === 'ArrowRight' && state.activeStudentIndex < state.students.length - 1) {
        e.preventDefault();
        selectStudent(state.activeStudentIndex + 1);
      }
    });

    window.addEventListener('hashchange', () => {
      const { subIndex, studentIndex } = parseUrlHash(window.location.hash);
      let subChanged = false;

      if (subIndex !== -1 && subIndex !== state.activeSubIndex) {
        switchSubmission(subIndex, false);
        subChanged = true;
      }
      if (studentIndex !== -1 && studentIndex !== state.activeStudentIndex) {
        selectStudent(studentIndex, false);
      } else if (subChanged && state.students[state.activeStudentIndex]) {
        const cur = state.students[state.activeStudentIndex];
        renderStudentRubric(cur);
        updateStudentHeaderScore(cur.hash);
      }
    });

    window.addEventListener('beforeunload', (e) => {
      if (state.isDirty && !state.isServerConnected) {
        e.preventDefault();
        e.returnValue = 'Je hebt niet-opgeslagen punten in het beoordelingssysteem.';
      }
    });
  }

  // --- Submissies (Tabs) ---

  function buildSubmissionTabs() {
    const tabsContainer = document.getElementById('submissions-tabs');
    const panel = document.getElementById('submissions-tab-panel');
    if (!tabsContainer || !panel) return;

    if (state.submissions.length <= 1) {
      panel.style.display = 'none';
      return;
    }

    panel.style.display = 'block';
    tabsContainer.innerHTML = '';

    state.submissions.forEach((sub, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `submission-tab-btn ${idx === state.activeSubIndex ? 'active' : ''}`;
      btn.dataset.index = idx;
      btn.innerHTML = `
        <span class="tab-title">${escapeHtml(sub.title)}</span>
        <span class="tab-badge">${sub.weight} pt</span>
      `;
      btn.addEventListener('click', () => switchSubmission(idx));
      tabsContainer.appendChild(btn);
    });
  }

  function switchSubmission(index, updateUrlHash = true) {
    if (index < 0 || index >= state.submissions.length) return;
    state.activeSubIndex = index;
    const sub = getActiveSubmission();

    document.querySelectorAll('.submission-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', parseInt(btn.dataset.index, 10) === index);
    });

    const inputSubWeight = document.getElementById('input-sub-weight');
    if (inputSubWeight) {
      inputSubWeight.value = sub.weight;
    } else {
      const weightBadge = document.getElementById('badge-active-weight');
      if (weightBadge) {
        weightBadge.innerHTML = `Gewicht: <strong>${sub.weight} pt</strong>`;
      }
    }

    // Herteken studentweergave & matrix
    const currentStudent = state.students[state.activeStudentIndex];
    if (currentStudent) {
      renderStudentRubric(currentStudent);
      updateStudentHeaderScore(currentStudent.hash);
    }
    buildCompactSummaryTable();
    updateAllChipsStatus();
    if (currentStudent) {
      highlightSummaryTableRow(currentStudent.hash);
    }

    if (updateUrlHash) {
      updateUrl();
    }
  }

  // --- Student Selector & Chips Strip ---

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
      chip.title = student.name;
      chip.innerHTML = `
        <span class="chip-index">${idx + 1}</span>
        <span class="chip-name">${escapeHtml(student.displayLabel.split(' ')[0])}</span>
        <span class="chip-status-dot" id="dot-${student.hash}"></span>
      `;

      chip.addEventListener('click', () => selectStudent(idx));
      chipsStrip.appendChild(chip);
    });

    updateAllChipsStatus();
  }

  function slugify(text) {
    return (text || '')
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function getSubmissionSlug(sub) {
    if (!sub) return '';
    if (sub.id && sub.id !== 'default' && !sub.id.startsWith('indiening-')) {
      return sub.id;
    }
    return slugify(sub.title) || sub.id || 'tab';
  }

  function updateUrl() {
    const student = state.students[state.activeStudentIndex];
    const sub = getActiveSubmission();
    const hasMultipleSubs = state.submissions && state.submissions.length > 1;

    const parts = [];
    if (hasMultipleSubs && sub) {
      const tabSlug = getSubmissionSlug(sub);
      if (tabSlug) parts.push(tabSlug);
    }
    if (student && student.hash) {
      parts.push(student.hash);
    }

    if (parts.length === 0) return;
    const newHash = `#${parts.join('&')}`;

    if (window.location.hash !== newHash) {
      if (window.history && window.history.replaceState) {
        const currentUrl = window.location.pathname + window.location.search + newHash;
        window.history.replaceState(null, '', currentUrl);
      } else {
        window.location.hash = newHash;
      }
    }
  }

  function findSubmissionIndexFromQuery(query) {
    if (!query || !state.submissions || state.submissions.length === 0) return -1;
    const clean = query.toString().toLowerCase().trim();
    const cleanSlug = slugify(clean);

    // 1. Exacte match op sub.id
    let idx = state.submissions.findIndex((s) => (s.id || '').toLowerCase() === clean);
    if (idx !== -1) return idx;

    // 2. Match op slugify(sub.id)
    idx = state.submissions.findIndex((s) => slugify(s.id) === cleanSlug);
    if (idx !== -1) return idx;

    // 3. Match op slugify(sub.title)
    idx = state.submissions.findIndex((s) => slugify(s.title) === cleanSlug);
    if (idx !== -1) return idx;

    // 4. Match op genormaliseerde tekst
    const norm = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanNorm = norm(clean);
    if (cleanNorm) {
      idx = state.submissions.findIndex((s) => norm(s.title) === cleanNorm || norm(s.id) === cleanNorm);
      if (idx !== -1) return idx;

      idx = state.submissions.findIndex((s) => norm(s.title).includes(cleanNorm) || cleanNorm.includes(norm(s.id)));
      if (idx !== -1) return idx;
    }

    // 5. Index match (#tab-1, #tab-2, etc.)
    const tabNumMatch = clean.match(/^tab[-_]?(\d+)$/);
    if (tabNumMatch) {
      const n = parseInt(tabNumMatch[1], 10) - 1;
      if (n >= 0 && n < state.submissions.length) return n;
    }

    return -1;
  }

  function findStudentIndexFromQuery(query) {
    if (!query || !state.students || state.students.length === 0) return -1;
    let clean = '';
    try {
      clean = decodeURIComponent(query).replace(/^#/, '').trim().toLowerCase();
    } catch (e) {
      clean = query.toString().replace(/^#/, '').trim().toLowerCase();
    }
    if (!clean) return -1;

    // 1. Exacte match op student.hash (bv. 8ab009875a)
    let idx = state.students.findIndex((s) => s.hash && s.hash.toLowerCase() === clean);
    if (idx !== -1) return idx;

    // 2. Prefix match op student.hash (minstens 4 tekens)
    if (clean.length >= 4) {
      idx = state.students.findIndex((s) => s.hash && s.hash.toLowerCase().startsWith(clean));
      if (idx !== -1) return idx;
    }

    // 3. Match op naam (exact, voornaam of genormaliseerd)
    const norm = (str) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanNorm = norm(clean);
    if (cleanNorm) {
      idx = state.students.findIndex((s) => norm(s.name) === cleanNorm || norm(s.displayLabel) === cleanNorm);
      if (idx !== -1) return idx;

      idx = state.students.findIndex((s) => {
        const firstName = norm((s.displayLabel || s.name || '').split(' ')[0]);
        return firstName === cleanNorm;
      });
      if (idx !== -1) return idx;

      idx = state.students.findIndex((s) => norm(s.name).includes(cleanNorm) || norm(s.displayLabel).includes(cleanNorm));
      if (idx !== -1) return idx;
    }

    // 4. Match op expliciet studentnummer (bv. student-3)
    const numMatch = clean.match(/^student[-_]?(\d+)$/);
    if (numMatch) {
      const num = parseInt(numMatch[1], 10);
      if (num >= 1 && num <= state.students.length) {
        return num - 1;
      }
    }

    return -1;
  }

  function parseUrlHash(rawHash) {
    if (!rawHash && !window.location.search) return { subIndex: -1, studentIndex: -1 };
    let clean = '';
    if (rawHash) {
      try {
        clean = decodeURIComponent(rawHash).replace(/^#/, '').trim();
      } catch (e) {
        clean = rawHash.replace(/^#/, '').trim();
      }
    }

    let foundSubIdx = -1;
    let foundStudentIdx = -1;

    if (clean) {
      const parts = clean.split(/[&/:]+/).map((p) => p.trim()).filter(Boolean);
      if (parts.length >= 2) {
        foundSubIdx = findSubmissionIndexFromQuery(parts[0]);
        foundStudentIdx = findStudentIndexFromQuery(parts[1]);

        if (foundSubIdx === -1 && foundStudentIdx === -1) {
          foundStudentIdx = findStudentIndexFromQuery(parts[0]);
          foundSubIdx = findSubmissionIndexFromQuery(parts[1]);
        }
      } else if (parts.length === 1) {
        foundStudentIdx = findStudentIndexFromQuery(parts[0]);
        if (foundStudentIdx === -1) {
          foundSubIdx = findSubmissionIndexFromQuery(parts[0]);
        }
      }
    }

    if (foundSubIdx === -1 && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') || params.get('sub') || params.get('indiening');
      if (tabParam) {
        foundSubIdx = findSubmissionIndexFromQuery(tabParam);
      }
    }

    return { subIndex: foundSubIdx, studentIndex: foundStudentIdx };
  }

  function findStudentIndexFromHash(rawHash) {
    return parseUrlHash(rawHash).studentIndex;
  }

  function selectStudent(index, updateHash = true) {
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

    renderStudentRubric(student);
    updateStudentHeaderScore(student.hash);
    highlightSummaryTableRow(student.hash);

    if (updateHash && student && student.hash) {
      updateUrl();
    }
  }

  // --- Rubriek Renders & Gewogen Berekening ---

  function renderStudentRubric(student) {
    const container = document.getElementById('clusters-container');
    if (!container) return;

    let feedbackBox = document.getElementById('rubric-feedback-card');
    if (!feedbackBox) {
      feedbackBox = document.createElement('div');
      feedbackBox.id = 'rubric-feedback-card';
      feedbackBox.className = 'rubric-feedback-card';
      container.parentNode.insertBefore(feedbackBox, container);
    }

    container.innerHTML = '';
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();
    const studentEval = subEvals[student.hash] || { scores: {}, criteriaLevels: {} };
    const criteriaLevels = studentEval.criteriaLevels || {};

    if (!sub.clusters || sub.clusters.length === 0) {
      container.innerHTML = '<p class="empty-notice">Geen actieve clusters geconfigureerd voor deze indiening.</p>';
      feedbackBox.innerHTML = '';
      return;
    }

    // Feedbacksectie voor de actieve leerling (boven clusters-container)
    feedbackBox.innerHTML = `
      <div class="feedback-header">
        <label for="student-feedback-input" class="feedback-label">
          💬 Feedback & Opmerkingen voor <strong>${escapeHtml(student.displayLabel)}</strong>:
        </label>
      </div>
      <textarea id="student-feedback-input" 
                class="student-feedback-textarea" 
                rows="4" 
                placeholder="Typ gerichte individuele feedback voor deze leerling...">${escapeHtml(studentEval.feedback || '')}</textarea>
    `;

    const textarea = feedbackBox.querySelector('textarea');
    const autoResize = () => {
      textarea.style.height = 'auto';
      const borderOffset = textarea.offsetHeight - textarea.clientHeight;
      textarea.style.height = `${textarea.scrollHeight + borderOffset}px`;
    };

    textarea.addEventListener('input', () => {
      if (!CSS.supports?.('field-sizing', 'content')) {
        autoResize();
      }
      if (!subEvals[student.hash]) {
        subEvals[student.hash] = { scores: {}, criteriaLevels: {} };
      }
      subEvals[student.hash].feedback = textarea.value;
      triggerAutoSave();
    });

    if (!CSS.supports?.('field-sizing', 'content')) {
      requestAnimationFrame(autoResize);
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

        const doel = (state.leerplandoelen && state.leerplandoelen[crit.code]) || {};
        const omschrijving = crit.omschrijving || doel.omschrijving || '';
        const dimensie = crit.dimensie || doel.dimensie || '';
        const officialGoalText = omschrijving ? `${omschrijving}${dimensie ? ` (${dimensie})` : ''}` : '';
        const showOfficialGoal = officialGoalText && (crit.criterium ? true : officialGoalText !== (crit.criterium || crit.omschrijving));

        critCard.innerHTML = `
          <div class="crit-code-badge-wrap">
            <span class="crit-code-badge">${escapeHtml(crit.code)}</span>
            <button type="button" 
                    class="badge-weight-multiplier ${critWeight > 1 ? 'is-weighted' : 'is-default'}" 
                    data-code="${crit.code}" 
                    title="Gewicht: ${critWeight}× (klik om te wisselen naar ${(critWeight % 4) + 1}×, of rechtsklik voor getal)">
              ${critWeight > 1 ? `${critWeight}× gewicht` : '1× gewicht'}
            </button>
          </div>
          <div class="crit-text">${escapeHtml(crit.criterium || crit.omschrijving)}</div>
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
          ${showOfficialGoal ? `<div class="crit-official-doel">${escapeHtml(officialGoalText)}</div>` : ''}
        `;

        const weightBtn = critCard.querySelector('.badge-weight-multiplier');
        if (weightBtn) {
          weightBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            let currentW = crit.gewicht || 1;
            let nextW = (currentW % 4) + 1; // 1 -> 2 -> 3 -> 4 -> 1
            setCriterionWeight(crit.code, nextW);
          });
          weightBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const input = prompt(`Voer gewichtsfactor in voor succescriterium ${crit.code}:`, crit.gewicht || 1);
            if (input !== null) {
              const val = parseInt(input, 10);
              if (!isNaN(val) && val >= 1 && val <= 50) {
                setCriterionWeight(crit.code, val);
              }
            }
          });
        }

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

    // Automatisch direct opslaan in /data/
    triggerAutoSave();
  }

  function setCriterionWeight(critCode, newWeight) {
    const sub = getActiveSubmission();
    sub.clusters.forEach((c) => {
      (c.criteria || []).forEach((cr) => {
        if (cr.code === critCode) {
          cr.gewicht = newWeight;
        }
      });
    });

    // Update weight buttons in DOM for this criterion
    document.querySelectorAll(`.badge-weight-multiplier[data-code="${critCode}"]`).forEach((btn) => {
      btn.textContent = newWeight > 1 ? `${newWeight}× gewicht` : '1× gewicht';
      btn.classList.toggle('is-weighted', newWeight > 1);
      btn.classList.toggle('is-default', newWeight === 1);
      btn.title = `Gewicht: ${newWeight}× (klik om te wisselen naar ${(newWeight % 4) + 1}×, of rechtsklik voor getal)`;
    });

    recalculateAllScoresForActiveSubmission();
  }

  function recalculateAllScoresForActiveSubmission() {
    const sub = getActiveSubmission();
    const subEvals = getActiveSubEvals();

    // 1. Herbereken scores voor alle studenten die beoordeeld zijn
    Object.keys(subEvals).forEach((studentHash) => {
      const evalData = subEvals[studentHash];
      if (!evalData || !evalData.criteriaLevels) return;

      sub.clusters.forEach((cluster) => {
        const scoreInfo = calculateWeightedClusterScore(cluster, evalData.criteriaLevels, sub.weight);
        if (scoreInfo.isCalculated) {
          evalData.scores[cluster.id] = scoreInfo.score;
        } else {
          delete evalData.scores[cluster.id];
        }
      });
      updateCompactTableRow(studentHash);
    });

    // 2. Update cluster score badges voor de actieve leerling
    const currentStudent = state.students[state.activeStudentIndex];
    if (currentStudent) {
      const evalData = subEvals[currentStudent.hash] || {};
      const criteriaLevels = evalData.criteriaLevels || {};
      sub.clusters.forEach((cluster) => {
        const scoreInfo = calculateWeightedClusterScore(cluster, criteriaLevels, sub.weight);
        const badgeEl = document.getElementById(`calc-badge-${cluster.id}`);
        if (badgeEl) {
          badgeEl.innerHTML = formatClusterScoreBadge(scoreInfo, sub.weight);
        }
      });
      updateStudentHeaderScore(currentStudent.hash);
    }

    // 3. Update overzichtstabel en studentenkaartjes
    buildCompactSummaryTable();
    updateAllChipsStatus();

    // 4. Automatisch opslaan naar data/
    triggerAutoSave();
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

  function getScoreColorLevel(score, maxWeight) {
    if (!maxWeight || maxWeight <= 0) return 0;
    const pct = (score / maxWeight) * 100;
    if (pct >= 90) return 3; // Blauw (90% - 100%)
    if (pct >= 70) return 2; // Groen (70% - 90%)
    if (pct >= 50) return 1; // Geel (50% - 70%)
    return 0;                // Rood (0% - 50%)
  }

  function formatClusterScoreBadge(info, submissionWeight) {
    if (!info.isCalculated) {
      return `<span class="score-pending">Nog geen criteria beoordeeld (${info.totalCount} doelen)</span>`;
    }
    const colorLevel = getScoreColorLevel(info.score, submissionWeight);
    return `
      <div class="score-result-badge" data-level="${colorLevel}">
        <span class="score-sub">(${info.gradedCount}/${info.totalCount} doelen${info.weighted ? ' • gewogen' : ''} • <span class="score-pts">${info.score.toFixed(1)}/${submissionWeight}</span>)</span>
        <span class="score-main">${info.avgLevel.toFixed(2)}/3</span>
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
    const colorLevel = getScoreColorLevel(avg, sub.weight);

    scoreEl.innerHTML = `
      <span class="overall-label">Gemiddelde (${count}/${sub.clusters.length} clusters):</span>
      <strong class="overall-value ${isPass ? 'pass' : 'fail'}" data-level="${colorLevel}">${avg.toFixed(1)} / ${sub.weight} (${pct}%)</strong>
    `;
  }

  // --- Overzichtstabel (Compact, Geen Horizontale Scroll) ---

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
          <span class="row-student-name">${escapeHtml(student.displayLabel)}</span>
          <code class="row-student-hash">${escapeHtml(student.hash)}</code>
        </div>
      </td>
    `;

    sub.clusters.forEach((c) => {
      const score = scores[c.id];
      if (score !== undefined) {
        sum += score;
        count++;
        const colorLevel = getScoreColorLevel(score, sub.weight);
        html += `<td class="col-score val-set" data-level="${colorLevel}"><strong>${score.toFixed(1)}</strong></td>`;
      } else {
        html += `<td class="col-score val-empty">-</td>`;
      }
    });

    if (count > 0) {
      const avg = sum / count;
      const pct = Math.round((avg / sub.weight) * 100);
      const isPass = pct >= 50;
      const avgColorLevel = getScoreColorLevel(avg, sub.weight);
      html += `<td class="col-gem"><span class="gem-badge ${isPass ? 'pass' : 'fail'}" data-level="${avgColorLevel}">${avg.toFixed(1)} <small>(${pct}%)</small></span></td>`;
    } else {
      html += `<td class="col-gem"><span class="gem-badge empty">-</span></td>`;
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

      const scores = subEvals[student.hash]?.scores || {};
      let gradedClusters = 0;
      sub.clusters.forEach((c) => {
        if (scores[c.id] !== undefined) gradedClusters++;
      });

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

  // --- Smartschool Export (Tampermonkey Auto-Grader) ---

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
        exportScores[hash] = {
          ...activeScores,
          _feedback: evalData.feedback || ''
        };
        studentCount++;
      }
    });

    const exportBundle = {
      source: 'Avant Local Grading',
      version: '2.2.0',
      assignmentId: state.assignmentId,
      submissionId: sub.id,
      submissionTitle: sub.title,
      classGroup: state.classGroup,
      weight: sub.weight,
      activeClusters: sub.clusters.map((c) => ({ id: c.id, naam: c.naam })),
      students: (state.students || []).map((s) => ({ hash: s.hash, name: s.name })),
      timestamp: getLocalIsoString(),
      scores: exportScores
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(exportBundle, null, 2));
      updateStatus(`⚡ Klaar voor Smartschool! ${scoreCount} cijfers voor ${studentCount} leerlingen gekopieerd voor "${sub.title}".`, 'success');
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
