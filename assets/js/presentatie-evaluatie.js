/**
 * Avant Presentatie-evaluatie
 * - Ontsleutelt leerlingnamen lokaal uit leerlingen_enc.json (AES-256-GCM)
 * - Bewerkbare drie punten + feedbackbakjes per leerling met live auto-save (poort 1315)
 * - Overzichtstabel voor doorgeven aan collega (kopiëren als HTML+TSV, CSV-download, afdrukken)
 */
(() => {
  const DEFAULT_PASSPHRASE = 'avant2026';
  const SAVE_SERVER_URL = `${window.location.protocol}//${window.location.hostname || 'localhost'}:1315`;

  const state = {
    klas: '5CRM',
    thema: '',
    datum: '',
    datafile: '',
    maxScore: 3,
    criteria: [],
    students: [],
    evaluations: {},
    activeView: 'editor', // 'editor' | 'tabel'
    showAbsent: true,
    showAvg: false,
    firstNameOnly: true,
    isServerConnected: false
  };

  let autoSaveTimer = null;
  let toastTimer = null;
  let hasPendingSave = false;

  // Voorkom dat Hugo LiveReload de pagina ververst tijdens het typen wanneer data/*.json wordt opgeslagen
  function disableLiveReload() {
    const shutDown = () => {
      try {
        if (window.LiveReload && typeof window.LiveReload.shutDown === 'function') {
          window.LiveReload.shutDown();
        }
        document.dispatchEvent(new Event('LiveReloadShutDown'));
      } catch {
        // Negeer als LiveReload niet geladen is
      }
    };
    shutDown();
    document.addEventListener('LiveReloadConnect', shutDown);
  }

  function safeParseJson(el) {
    if (!el) return null;
    let val = (el.textContent || '').trim();
    if (!val) return null;
    let depth = 0;
    while (typeof val === 'string' && depth < 5) {
      depth++;
      try {
        val = JSON.parse(val);
      } catch {
        break;
      }
    }
    return val;
  }

  function escapeHtml(str) {
    return String(str ?? '').replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
  }

  function sanitizeSmartschool(text) {
    return String(text ?? '')
      .replace(/<\/([a-zA-Z0-9_-]+)>/g, '$1')
      .replace(/<([a-zA-Z0-9_-]+)>/g, '$1')
      .replace(/[<>]/g, '')
      .trim();
  }

  function base64ToUint8(str) {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  function getLocalIsoString(date = new Date()) {
    const pad = (n, w = 2) => String(n).padStart(w, '0');
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutes);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
  }

  async function decryptStudents(encData, classGroup) {
    const rawList = encData?.classes?.[classGroup] || [];
    const students = rawList.map((item, idx) => ({
      index: idx,
      hash: item.hash,
      enc: item.enc,
      name: `Leerling ${idx + 1} (${item.hash})`
    }));

    const meta = encData?.metadata;
    if (!meta?.salt || !window.crypto?.subtle) return students;

    try {
      const salt = base64ToUint8(meta.salt);
      const iterations = meta.iterations || 100000;
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        new TextEncoder().encode(DEFAULT_PASSPHRASE),
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
      for (const s of students) {
        if (!s.enc) continue;
        try {
          const bytes = base64ToUint8(s.enc);
          if (bytes.length < 28) continue;
          const plain = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: bytes.slice(0, 12) },
            key,
            bytes.slice(12)
          );
          const name = dec.decode(plain).trim();
          if (name) s.name = name;
        } catch {
          // Behoud fallback
        }
      }
    } catch (err) {
      console.warn('[PresentatieEval] Decryptie overgeslagen:', err);
    }

    return students;
  }

  function getEval(hash) {
    if (!state.evaluations[hash]) {
      state.evaluations[hash] = { absent: false, scores: {}, feedback: '' };
    }
    const ev = state.evaluations[hash];
    if (!ev.scores || typeof ev.scores !== 'object') ev.scores = {};
    if (typeof ev.feedback !== 'string') ev.feedback = '';
    ev.absent = Boolean(ev.absent);
    return ev;
  }

  function getScoreLevel(val) {
    if (val === null || val === undefined || val === '' || Number.isNaN(Number(val))) return '';
    const pct = (Number(val) / state.maxScore) * 100;
    if (pct >= 90) return '3';
    if (pct >= 70) return '2';
    if (pct >= 50) return '1';
    return '0';
  }

  function formatNumNL(n) {
    if (n === null || n === undefined || n === '' || Number.isNaN(Number(n))) return '—';
    const rounded = Math.round(Number(n) * 100) / 100;
    return Number.isInteger(rounded)
      ? String(rounded)
      : String(rounded).replace('.', ',');
  }

  function formatAvgNL(n) {
    if (n === null || n === undefined || Number.isNaN(Number(n))) return '—';
    const rounded = Math.round(Number(n) * 10) / 10;
    return Number.isInteger(rounded)
      ? String(rounded)
      : rounded.toFixed(1).replace('.', ',');
  }

  function calcStudentAvg(ev) {
    if (ev.absent) return null;
    let sum = 0;
    let count = 0;
    for (const c of state.criteria) {
      const v = ev.scores?.[c.code];
      if (v !== undefined && v !== null && v !== '' && !Number.isNaN(Number(v))) {
        sum += Number(v);
        count++;
      }
    }
    return count > 0 ? sum / count : null;
  }

  function displayStudentName(student) {
    if (!state.firstNameOnly) return student.name;
    return student.name.split(' ')[0] || student.name;
  }

  function setSaveStatus(status, text) {
    const el = document.getElementById('presentatie-save-status');
    if (!el) return;
    el.dataset.status = status;
    el.textContent = text;
  }

  function showToast(msg) {
    const el = document.getElementById('presentatie-feedback-melding');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 3500);
  }

  async function checkServerStatus() {
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
        setSaveStatus('saved', 'Lokaal verbonden (data/)');
        return;
      }
    } catch {
      // Offline
    }
    state.isServerConnected = false;
    setSaveStatus('offline', 'Save-server niet actief (wijzigingen blijven in browser)');
  }

  function buildPayload() {
    const cleanEvals = {};
    for (const s of state.students) {
      const ev = getEval(s.hash);
      const cleanScores = {};
      for (const c of state.criteria) {
        const v = ev.scores?.[c.code];
        if (v !== undefined && v !== null && v !== '' && !Number.isNaN(Number(v))) {
          cleanScores[c.code] = Math.round(Number(v) * 100) / 100;
        }
      }
      cleanEvals[s.hash] = {
        absent: Boolean(ev.absent),
        scores: ev.absent ? {} : cleanScores,
        feedback: ev.feedback || ''
      };
    }

    return {
      source: 'Avant Presentatie-evaluatie',
      version: '1.0.0',
      id: state.datafile,
      classGroup: state.klas,
      thema: state.thema,
      date: state.datum,
      maxScore: state.maxScore,
      criteria: state.criteria,
      lastUpdated: getLocalIsoString(),
      evaluations: cleanEvals
    };
  }

  async function flushSave(useKeepalive = false) {
    clearTimeout(autoSaveTimer);
    autoSaveTimer = null;
    if (!hasPendingSave || !state.isServerConnected) return;
    hasPendingSave = false;

    try {
      const payload = buildPayload();
      const filename = state.datafile.endsWith('.json') ? state.datafile : `${state.datafile}.json`;
      const res = await fetch(`${SAVE_SERVER_URL}/api/save-rubriek`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, data: payload }),
        keepalive: useKeepalive
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSaveStatus('saved', `Opgeslagen om ${data.displayTime || new Date().toLocaleTimeString('nl-BE')}`);
    } catch (err) {
      console.error('[PresentatieEval] Fout bij opslaan:', err);
      hasPendingSave = true;
      setSaveStatus('offline', 'Fout bij opslaan naar data/');
    }
  }

  function triggerAutoSave() {
    hasPendingSave = true;
    clearTimeout(autoSaveTimer);
    if (!state.isServerConnected) {
      setSaveStatus('offline', 'Niet opgeslagen op schijf (save-server offline)');
      return;
    }
    setSaveStatus('saving', 'Opslaan…');
    autoSaveTimer = setTimeout(() => {
      flushSave(false);
    }, 700);
  }

  function renderSidebar() {
    const nav = document.getElementById('PresentatieNav');
    if (!nav) return;

    const topLinks = `
      <ul>
        <li>
          <a href="#editor"${state.activeView === 'editor' ? ' aria-current="page"' : ''} data-nav-view="editor">
            <span>Punten &amp; feedback</span>
          </a>
        </li>
        <li>
          <a href="#tabel"${state.activeView === 'tabel' ? ' aria-current="page"' : ''} data-nav-view="tabel">
            <span>Tabel voor Emelie</span>
          </a>
        </li>
      </ul>
    `;

    const studentLinks = state.students.map((s) => {
      const ev = getEval(s.hash);
      const avg = calcStudentAvg(ev);
      const lvl = getScoreLevel(avg);
      const badge = ev.absent
        ? 'Afw.'
        : (avg !== null ? `${formatAvgNL(avg)}/${state.maxScore}` : '—');
      return `
        <li>
          <a href="#kaart-${s.hash}" data-jump-student="${s.hash}" data-absent="${ev.absent}">
            <span>${escapeHtml(s.name)}</span>
            <strong${lvl ? ` data-level="${lvl}"` : ''}>${badge}</strong>
          </a>
        </li>
      `;
    }).join('');

    nav.innerHTML = `${topLinks}<ul>${studentLinks}</ul>`;

    nav.querySelectorAll('a[data-nav-view]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(a.dataset.navView);
      });
    });

    nav.querySelectorAll('a[data-jump-student]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = a.dataset.jumpStudent;
        if (state.activeView !== 'editor') {
          switchView('editor');
        }
        const card = document.getElementById(`kaart-${hash}`);
        if (card) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function autoResizeTextarea(ta) {
    if (!ta || CSS.supports?.('field-sizing', 'content')) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(72, ta.scrollHeight)}px`;
  }

  function renderEditor() {
    const panel = document.getElementById('panel-editor');
    if (!panel) return;

    panel.innerHTML = state.students.map((s, idx) => {
      const ev = getEval(s.hash);
      const avg = calcStudentAvg(ev);
      const cardLevel = getScoreLevel(avg);
      const avgLabel = ev.absent
        ? 'Afwezig'
        : (avg !== null ? `Gem. ${formatAvgNL(avg)} / ${state.maxScore}` : 'Nog niet ingevuld');

      const scoreFields = state.criteria.map((c) => {
        const val = ev.absent ? '' : (ev.scores?.[c.code] ?? '');
        const lvl = getScoreLevel(val);
        const inputId = `score-${s.hash}-${c.code}`;
        return `
          <div data-score-veld>
            <label for="${escapeHtml(inputId)}">
              <strong>${escapeHtml(c.code)} · ${escapeHtml(c.label)}</strong>
              <span>${escapeHtml(c.cluster || '')}</span>
            </label>
            <div>
              <input type="number"
                     id="${escapeHtml(inputId)}"
                     data-student-hash="${escapeHtml(s.hash)}"
                     data-crit-code="${escapeHtml(c.code)}"
                     ${lvl ? `data-level="${lvl}"` : ''}
                     min="0"
                     max="${state.maxScore}"
                     step="0.5"
                     value="${val !== '' ? escapeHtml(val) : ''}"
                     placeholder="—">
              <span>/ ${state.maxScore}</span>
            </div>
          </div>
        `;
      }).join('');

      const fbId = `fb-${s.hash}`;
      return `
        <article id="kaart-${escapeHtml(s.hash)}"
                 data-leerling-kaart
                 data-student-hash="${escapeHtml(s.hash)}"
                 data-absent="${ev.absent}"
                 ${cardLevel ? `data-level="${cardLevel}"` : ''}>
          <header>
            <h2>${escapeHtml(s.name)} <small>#${idx + 1}</small></h2>
            <div>
              <strong data-kaart-gem${cardLevel ? ` data-level="${cardLevel}"` : ''}>${avgLabel}</strong>
              <label>
                <input type="checkbox"
                       data-absent-toggle="${escapeHtml(s.hash)}"
                       ${ev.absent ? 'checked' : ''}>
                <span>Afwezig</span>
              </label>
            </div>
          </header>
          <div data-scores-grid>
            ${scoreFields}
          </div>
          <div data-feedback-veld>
            <label for="${escapeHtml(fbId)}">Feedback</label>
            <textarea id="${escapeHtml(fbId)}"
                      data-feedback-input="${escapeHtml(s.hash)}"
                      placeholder="${ev.absent ? 'Afwezig tijdens presentatie' : 'Schrijf hier je feedback voor deze leerling…'}">${escapeHtml(ev.feedback)}</textarea>
          </div>
        </article>
      `;
    }).join('');

    // Event listeners voor punten
    panel.querySelectorAll('input[data-crit-code]').forEach((input) => {
      input.addEventListener('input', () => {
        const hash = input.dataset.studentHash;
        const code = input.dataset.critCode;
        const ev = getEval(hash);
        const raw = input.value.trim().replace(',', '.');

        if (raw === '') {
          delete ev.scores[code];
          delete input.dataset.level;
        } else {
          const num = parseFloat(raw);
          if (!Number.isNaN(num)) {
            const clamped = Math.max(0, Math.min(state.maxScore, Math.round(num * 100) / 100));
            ev.scores[code] = clamped;
            if (ev.absent) {
              ev.absent = false;
              const cb = panel.querySelector(`input[data-absent-toggle="${hash}"]`);
              if (cb) cb.checked = false;
            }
            const lvl = getScoreLevel(clamped);
            if (lvl) input.dataset.level = lvl;
            else delete input.dataset.level;
          }
        }

        updateCardSummary(hash);
        renderSidebar();
        renderTable();
        triggerAutoSave();
      });
    });

    // Event listeners voor afwezig
    panel.querySelectorAll('input[data-absent-toggle]').forEach((cb) => {
      cb.addEventListener('change', () => {
        const hash = cb.dataset.absentToggle;
        const ev = getEval(hash);
        ev.absent = Boolean(cb.checked);
        const card = document.getElementById(`kaart-${hash}`);
        if (card) {
          card.dataset.absent = String(ev.absent);
          card.querySelectorAll('input[data-crit-code]').forEach((inp) => {
            if (ev.absent) {
              inp.value = '';
              delete inp.dataset.level;
            } else {
              const savedVal = ev.scores?.[inp.dataset.critCode];
              inp.value = savedVal !== undefined ? String(savedVal) : '';
              const lvl = getScoreLevel(savedVal);
              if (lvl) inp.dataset.level = lvl;
              else delete inp.dataset.level;
            }
          });
        }
        updateCardSummary(hash);
        renderSidebar();
        renderTable();
        triggerAutoSave();
      });
    });

    // Event listeners voor feedbackbakjes
    panel.querySelectorAll('textarea[data-feedback-input]').forEach((ta) => {
      autoResizeTextarea(ta);
      ta.addEventListener('input', () => {
        const hash = ta.dataset.feedbackInput;
        const ev = getEval(hash);
        ev.feedback = ta.value;
        autoResizeTextarea(ta);
        if (state.activeView === 'tabel') renderTable();
        triggerAutoSave();
      });
      ta.addEventListener('blur', () => {
        if (hasPendingSave) flushSave(false);
      });
    });
  }

  function updateCardSummary(hash) {
    const card = document.getElementById(`kaart-${hash}`);
    if (!card) return;
    const ev = getEval(hash);
    const avg = calcStudentAvg(ev);
    const lvl = getScoreLevel(avg);

    card.dataset.absent = String(ev.absent);
    if (lvl) card.dataset.level = lvl;
    else delete card.dataset.level;

    const gemEl = card.querySelector('[data-kaart-gem]');
    if (gemEl) {
      gemEl.textContent = ev.absent
        ? 'Afwezig'
        : (avg !== null ? `Gem. ${formatAvgNL(avg)} / ${state.maxScore}` : 'Nog niet ingevuld');
      if (lvl) gemEl.dataset.level = lvl;
      else delete gemEl.dataset.level;
    }
  }

  function getTableRows() {
    return state.students
      .filter((s) => state.showAbsent || !getEval(s.hash).absent)
      .map((s) => {
        const ev = getEval(s.hash);
        return {
          student: s,
          name: displayStudentName(s),
          absent: ev.absent,
          scores: ev.scores || {},
          avg: calcStudentAvg(ev),
          feedback: sanitizeSmartschool(ev.feedback)
        };
      });
  }

  function calcColumnAverages(rows) {
    const sums = {};
    const counts = {};
    for (const c of state.criteria) {
      sums[c.code] = 0;
      counts[c.code] = 0;
    }
    let avgSum = 0;
    let avgCount = 0;

    for (const r of rows) {
      if (r.absent) continue;
      for (const c of state.criteria) {
        const v = r.scores[c.code];
        if (v !== undefined && v !== null && v !== '' && !Number.isNaN(Number(v))) {
          sums[c.code] += Number(v);
          counts[c.code]++;
        }
      }
      if (r.avg !== null) {
        avgSum += r.avg;
        avgCount++;
      }
    }

    const critAvgs = {};
    for (const c of state.criteria) {
      critAvgs[c.code] = counts[c.code] > 0 ? sums[c.code] / counts[c.code] : null;
    }
    return {
      critAvgs,
      overallAvg: avgCount > 0 ? avgSum / avgCount : null,
      presentCount: avgCount
    };
  }

  function renderTable() {
    const container = document.getElementById('tabel-container');
    if (!container) return;

    const rows = getTableRows();
    const { critAvgs, overallAvg } = calcColumnAverages(rows);

    const critHeaders = state.criteria.map((c) => `
      <th data-num>
        ${escapeHtml(c.code)} ${escapeHtml(c.label)}
        <small>${escapeHtml(c.cluster)} (/${state.maxScore})</small>
      </th>
    `).join('');

    const avgHeader = state.showAvg ? `<th data-num>Gem.<small>/${state.maxScore}</small></th>` : '';

    const bodyHtml = rows.map((r) => {
      const scoreCells = state.criteria.map((c) => {
        if (r.absent) return '<td data-num>Afwezig</td>';
        const v = r.scores[c.code];
        const lvl = getScoreLevel(v);
        return `<td data-num${lvl ? ` data-level="${lvl}"` : ''}>${formatNumNL(v)}</td>`;
      }).join('');

      const avgCell = state.showAvg
        ? (r.absent
          ? '<td data-num>—</td>'
          : `<td data-num${getScoreLevel(r.avg) ? ` data-level="${getScoreLevel(r.avg)}"` : ''}>${formatAvgNL(r.avg)}</td>`)
        : '';

      const fbText = r.absent && !r.feedback ? 'Afwezig' : (r.feedback || '—');

      return `
        <tr data-absent="${r.absent}">
          <td data-naam>${escapeHtml(r.name)}</td>
          ${scoreCells}
          ${avgCell}
          <td data-feedback-cel>${escapeHtml(fbText)}</td>
        </tr>
      `;
    }).join('');

    const footScores = state.criteria.map((c) => {
      const avg = critAvgs[c.code];
      const lvl = getScoreLevel(avg);
      return `<td data-num${lvl ? ` data-level="${lvl}"` : ''}>${formatAvgNL(avg)}</td>`;
    }).join('');

    const footAvg = state.showAvg
      ? `<td data-num${getScoreLevel(overallAvg) ? ` data-level="${getScoreLevel(overallAvg)}"` : ''}>${formatAvgNL(overallAvg)}</td>`
      : '';

    container.innerHTML = `
      <table id="emelie-tabel">
        <thead>
          <tr>
            <th>Leerling</th>
            ${critHeaders}
            ${avgHeader}
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          ${bodyHtml}
        </tbody>
        <tfoot>
          <tr>
            <td>Klasgemiddelde</td>
            ${footScores}
            ${footAvg}
            <td></td>
          </tr>
        </tfoot>
      </table>
    `;
  }

  function buildExportTableHtml() {
    const rows = getTableRows();
    const numCols = state.criteria.length + (state.showAvg ? 1 : 0);
    const nameWidth = state.firstNameOnly ? '13%' : (state.showAvg ? '18%' : '19%');
    const scoreWidth = state.showAvg ? '10%' : '11%';
    const avgWidth = '9%';
    const fbWidth = state.firstNameOnly
      ? (state.showAvg ? '48%' : '54%')
      : (state.showAvg ? '43%' : '48%');

    const cellStyle = 'border:1px solid #cbd5e1;padding:6px 7px;vertical-align:top;text-align:left;word-break:break-word;';
    const numStyle = 'border:1px solid #cbd5e1;padding:6px 4px;vertical-align:top;text-align:center;';
    const headStyle = 'border:1px solid #94a3b8;padding:6px 7px;background-color:#f1f5f9;font-weight:700;text-align:left;vertical-align:bottom;';
    const headNumStyle = 'border:1px solid #94a3b8;padding:6px 4px;background-color:#f1f5f9;font-weight:700;text-align:center;vertical-align:bottom;';
    const subStyle = 'font-weight:400;font-size:10px;color:#475569;';

    const headers = [
      `<th width="${nameWidth}" style="${headStyle}width:${nameWidth};">Leerling</th>`,
      ...state.criteria.map((c) => `<th width="${scoreWidth}" style="${headNumStyle}width:${scoreWidth};">${escapeHtml(c.code)}<br><span style="${subStyle}">${escapeHtml(c.label)} (/${state.maxScore})</span></th>`),
      ...(state.showAvg ? [`<th width="${avgWidth}" style="${headNumStyle}width:${avgWidth};">Gem.<br><span style="${subStyle}">/${state.maxScore}</span></th>`] : []),
      `<th width="${fbWidth}" style="${headStyle}width:${fbWidth};">Feedback</th>`
    ].join('');

    const bodyRows = rows.map((r) => {
      if (r.absent) {
        const note = r.feedback ? `Afwezig — ${escapeHtml(r.feedback)}` : 'Afwezig';
        return `<tr>`
          + `<td width="${nameWidth}" style="${cellStyle}width:${nameWidth};font-weight:600;color:#64748b;">${escapeHtml(r.name)}</td>`
          + `<td colspan="${numCols + 1}" style="${cellStyle}color:#64748b;font-style:italic;">${note}</td>`
          + `</tr>`;
      }

      const cells = [
        `<td width="${nameWidth}" style="${cellStyle}width:${nameWidth};font-weight:600;">${escapeHtml(r.name)}</td>`,
        ...state.criteria.map((c) => `<td width="${scoreWidth}" style="${numStyle}width:${scoreWidth};">${formatNumNL(r.scores[c.code])}</td>`),
        ...(state.showAvg ? [`<td width="${avgWidth}" style="${numStyle}width:${avgWidth};font-weight:600;">${formatAvgNL(r.avg)}</td>`] : []),
        `<td width="${fbWidth}" style="${cellStyle}width:${fbWidth};">${escapeHtml(r.feedback)}</td>`
      ].join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `<table width="100%" style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:12px;line-height:1.4;"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  }

  function buildExportTsv() {
    const rows = getTableRows();
    const headerCols = [
      'Leerling',
      ...state.criteria.map((c) => `${c.code} ${c.label} (/${state.maxScore})`),
      ...(state.showAvg ? [`Gemiddelde (/${state.maxScore})`] : []),
      'Feedback'
    ];
    const lines = [headerCols.join('\t')];

    for (const r of rows) {
      const cleanFb = (r.absent && !r.feedback ? 'Afwezig' : r.feedback).replace(/[\t\r\n]+/g, ' ').trim();
      const cols = [
        r.name,
        ...state.criteria.map((c) => (r.absent ? 'Afwezig' : formatNumNL(r.scores[c.code]))),
        ...(state.showAvg ? [r.absent ? 'Afwezig' : formatAvgNL(r.avg)] : []),
        cleanFb
      ];
      lines.push(cols.join('\t'));
    }

    return lines.join('\n');
  }

  function buildExportCsv() {
    const rows = getTableRows();
    const esc = (val) => {
      const s = String(val ?? '').replace(/\r?\n/g, ' ').trim();
      return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const headerCols = [
      'Leerling',
      ...state.criteria.map((c) => `${c.code} ${c.label} (/${state.maxScore})`),
      ...(state.showAvg ? [`Gemiddelde (/${state.maxScore})`] : []),
      'Feedback'
    ];

    const lines = [headerCols.map(esc).join(';')];
    for (const r of rows) {
      const cols = [
        r.name,
        ...state.criteria.map((c) => (r.absent ? 'Afwezig' : formatNumNL(r.scores[c.code]))),
        ...(state.showAvg ? [r.absent ? 'Afwezig' : formatAvgNL(r.avg)] : []),
        r.absent && !r.feedback ? 'Afwezig' : r.feedback
      ];
      lines.push(cols.map(esc).join(';'));
    }

    return '\uFEFF' + lines.join('\r\n');
  }

  async function copyTableToClipboard() {
    const html = buildExportTableHtml();
    const tsv = buildExportTsv();

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const item = new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([tsv], { type: 'text/plain' })
        });
        await navigator.clipboard.write([item]);
      } else {
        await navigator.clipboard.writeText(tsv);
      }
      showToast('Tabel gekopieerd. Je kan ze rechtstreeks plakken in Mail, Word, Smartschool, Excel of Google Sheets.');
    } catch (err) {
      console.error('[PresentatieEval] Klembordfout:', err);
      try {
        await navigator.clipboard.writeText(tsv);
        showToast('Tabel gekopieerd als tekst (tab-gescheiden voor Excel/Sheets).');
      } catch {
        showToast('Kon niet kopiëren naar het klembord. Controleer browserrechten.');
      }
    }
  }

  function downloadCsv() {
    const csv = buildExportCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.datafile || 'presentatie'}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`CSV gedownload (${a.download}).`);
  }

  function switchView(view) {
    state.activeView = view === 'tabel' ? 'tabel' : 'editor';

    const editorPanel = document.getElementById('panel-editor');
    const tabelPanel = document.getElementById('panel-tabel');
    const tabEditor = document.getElementById('tab-editor');
    const tabTabel = document.getElementById('tab-tabel');

    if (editorPanel) editorPanel.hidden = state.activeView !== 'editor';
    if (tabelPanel) tabelPanel.hidden = state.activeView !== 'tabel';
    if (tabEditor) tabEditor.setAttribute('aria-selected', String(state.activeView === 'editor'));
    if (tabTabel) tabTabel.setAttribute('aria-selected', String(state.activeView === 'tabel'));

    if (state.activeView === 'tabel') {
      renderTable();
    }
    renderSidebar();
  }

  async function init() {
    const root = document.querySelector('[data-presentatie-eval]');
    if (!root) return;

    disableLiveReload();
    window.addEventListener('pagehide', () => flushSave(true));

    state.klas = root.dataset.klas || '5CRM';
    state.thema = root.dataset.thema || '';
    state.datum = root.dataset.datum || '';
    state.datafile = root.dataset.datafile || 'presentatie';
    state.maxScore = Number(root.dataset.maxScore) || 3;

    const encData = safeParseJson(document.getElementById('presentatie-encrypted-students'));
    const criteria = safeParseJson(document.getElementById('presentatie-criteria-data'));
    const saved = safeParseJson(document.getElementById('presentatie-saved-data'));

    state.criteria = Array.isArray(criteria) && criteria.length > 0
      ? criteria
      : (Array.isArray(saved?.criteria) ? saved.criteria : []);

    if (saved && saved.evaluations && typeof saved.evaluations === 'object') {
      state.evaluations = JSON.parse(JSON.stringify(saved.evaluations));
    }

    state.students = await decryptStudents(encData, state.klas);

    renderEditor();
    renderTable();
    renderSidebar();
    await checkServerStatus();

    document.querySelectorAll('button[data-view-tab]').forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.dataset.viewTab));
    });

    document.getElementById('btn-copy-table')?.addEventListener('click', copyTableToClipboard);
    document.getElementById('btn-download-csv')?.addEventListener('click', downloadCsv);
    document.getElementById('btn-print-table')?.addEventListener('click', () => {
      renderTable();
      window.print();
    });
    window.addEventListener('beforeprint', renderTable);

    document.getElementById('opt-show-absent')?.addEventListener('change', (e) => {
      state.showAbsent = Boolean(e.target.checked);
      renderTable();
    });

    document.getElementById('opt-show-avg')?.addEventListener('change', (e) => {
      state.showAvg = Boolean(e.target.checked);
      renderTable();
    });

    document.getElementById('opt-first-name')?.addEventListener('change', (e) => {
      state.firstNameOnly = Boolean(e.target.checked);
      renderTable();
    });

    if (window.location.hash === '#tabel') {
      switchView('tabel');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
