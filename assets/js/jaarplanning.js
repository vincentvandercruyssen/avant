/**
 * Avant Jaarplanning
 * - Bewerkbare weektabel voor Motion, Web+Story en Beeld (plus optionele referentiekolom Grafische & Uitstappen)
 * - Live woord- en tekenteller per cel (standaard max 20 woorden / 140 tekens)
 * - Live auto-save naar data/jaarplanning-*.json via lokale Save Server (poort 1315)
 * - Overzichtstabel voor kopiëren naar Word/Excel/Smartschool, CSV-download en A4-liggende afdrukmodus
 */
(() => {
  const SAVE_SERVER_URL = `${window.location.protocol}//${window.location.hostname || 'localhost'}:1315`;

  const MONTH_LABELS = {
    sep: 'September',
    okt: 'Oktober',
    nov: 'November',
    dec: 'December',
    jan: 'Januari',
    feb: 'Februari',
    mrt: 'Maart',
    apr: 'April',
    mei: 'Mei',
    jun: 'Juni'
  };

  const state = {
    klas: '5CRM',
    schooljaar: '2026-2027',
    peildatum: '2026-11-26',
    datafile: 'jaarplanning-5crm',
    colleagueLabel: 'Grafische',
    limits: { maxWords: 20, maxChars: 140 },
    columns: {
      motion: 'Motion',
      web: 'Web & story',
      beeld: 'Beeld'
    },
    weeks: [],
    activeView: 'editor', // 'editor' | 'tabel'
    trimester: 'all', // 'all' | '1' | '2' | '3'
    visibleCols: {
      week: true,
      grafische: false,
      motion: true,
      web: true,
      beeld: true,
      uitstappen: false
    },
    markTentative: true,
    isServerConnected: false
  };

  let autoSaveTimer = null;
  let toastTimer = null;
  let hasPendingSave = false;

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

  function getLocalIsoString(date = new Date()) {
    const pad = (n, w = 2) => String(n).padStart(w, '0');
    const offsetMinutes = -date.getTimezoneOffset();
    const sign = offsetMinutes >= 0 ? '+' : '-';
    const absOffset = Math.abs(offsetMinutes);
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
  }

  function countWords(text) {
    const clean = String(text ?? '').trim();
    if (!clean) return 0;
    return clean.split(/\s+/).filter(Boolean).length;
  }

  function getLimitInfo(text) {
    const val = String(text ?? '');
    const words = countWords(val);
    const chars = val.length;
    const maxW = state.limits.maxWords;
    const maxC = state.limits.maxChars;
    let level = 'ok';
    if (words > maxW || chars > maxC) {
      level = 'over';
    } else if (words >= Math.floor(maxW * 0.85) || chars >= Math.floor(maxC * 0.85)) {
      level = 'warn';
    }
    return { words, chars, level };
  }

  function getFilteredWeeks() {
    if (state.trimester === 'all') return state.weeks;
    const t = Number(state.trimester);
    return state.weeks.filter((w) => Number(w.trimester) === t);
  }

  function getActiveColumns() {
    const defs = [
      { key: 'week', label: 'Week / datum', sub: '', editable: false },
      { key: 'grafische', label: state.colleagueLabel, sub: 'Referentie', editable: true },
      { key: 'motion', label: state.columns.motion || 'Motion', sub: 'Vincent', editable: true },
      { key: 'web', label: state.columns.web || 'Web & story', sub: 'Vincent', editable: true },
      { key: 'beeld', label: state.columns.beeld || 'Beeld', sub: 'Vincent', editable: true },
      { key: 'uitstappen', label: 'Uitstappen / momenten', sub: '', editable: true }
    ];
    return defs.filter((d) => state.visibleCols[d.key]);
  }

  function setSaveStatus(status, text) {
    const el = document.getElementById('planning-save-status');
    if (!el) return;
    el.dataset.status = status;
    el.textContent = text;
  }

  function showToast(msg) {
    const el = document.getElementById('planning-feedback-melding');
    if (!el) return;
    el.textContent = msg;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      el.hidden = true;
    }, 3800);
  }

  function updateLimitSummary() {
    const el = document.getElementById('planning-limiet-info');
    if (!el) return;
    let overCount = 0;
    const subjectCols = ['motion', 'web', 'beeld'];
    for (const w of state.weeks) {
      for (const col of subjectCols) {
        if (getLimitInfo(w[col]).level === 'over') overCount++;
      }
    }
    const baseText = `Max ${state.limits.maxWords}w · ${state.limits.maxChars}t per cel`;
    if (overCount > 0) {
      el.textContent = `${baseText} (${overCount} cel${overCount === 1 ? '' : 'len'} over limiet)`;
      el.dataset.over = 'true';
    } else {
      el.textContent = baseText;
      delete el.dataset.over;
    }
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
    return {
      source: 'Avant Jaarplanning',
      version: '1.0.0',
      id: state.datafile,
      classGroup: state.klas,
      schoolYear: state.schooljaar,
      referenceDate: state.peildatum,
      colleagueLabel: state.colleagueLabel,
      limits: state.limits,
      columns: state.columns,
      lastUpdated: getLocalIsoString(),
      weeks: state.weeks
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
      console.error('[Jaarplanning] Fout bij opslaan:', err);
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
    }, 600);
  }

  function autoResizeTextarea(ta) {
    if (!ta || CSS.supports?.('field-sizing', 'content')) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.max(48, ta.scrollHeight)}px`;
  }

  function formatCellHtml(text) {
    const clean = String(text ?? '').trim();
    if (!clean) return '';
    const lines = clean.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 1) {
      return `<span>${escapeHtml(lines[0])}</span>`;
    }
    const [head, ...rest] = lines;
    return `<strong>${escapeHtml(head)}</strong><span>${rest.map(escapeHtml).join('<br>')}</span>`;
  }

  function renderSidebar() {
    const nav = document.getElementById('JaarplanningNav');
    if (!nav) return;

    const topLinks = `
      <ul>
        <li>
          <a href="#editor"${state.activeView === 'editor' ? ' aria-current="page"' : ''} data-nav-view="editor">
            <span>Bewerken</span>
          </a>
        </li>
        <li>
          <a href="#tabel"${state.activeView === 'tabel' ? ' aria-current="page"' : ''} data-nav-view="tabel">
            <span>Overzicht &amp; afdruk</span>
          </a>
        </li>
      </ul>
    `;

    const visibleWeeks = getFilteredWeeks();
    const months = [];
    const seen = new Set();
    for (const w of visibleWeeks) {
      if (w.month && !seen.has(w.month)) {
        seen.add(w.month);
        const count = visibleWeeks.filter((item) => item.month === w.month).length;
        months.push({ code: w.month, firstWeekId: w.id, count });
      }
    }

    const monthLinks = months.map((m) => `
      <li>
        <a href="#week-${m.firstWeekId}" data-jump-week="${m.firstWeekId}">
          <span>${escapeHtml(MONTH_LABELS[m.code] || m.code)}</span>
          <small>${m.count}w</small>
        </a>
      </li>
    `).join('');

    nav.innerHTML = `${topLinks}<ul>${monthLinks}</ul>`;

    nav.querySelectorAll('a[data-nav-view]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        switchView(a.dataset.navView);
      });
    });

    nav.querySelectorAll('a[data-jump-week]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const wid = a.dataset.jumpWeek;
        const prefix = state.activeView === 'editor' ? 'edit-row-' : 'view-row-';
        const row = document.getElementById(`${prefix}${wid}`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderEditor() {
    const container = document.getElementById('editor-container');
    if (!container) return;

    const cols = getActiveColumns();
    const weeks = getFilteredWeeks();

    const headerCells = cols.map((c) => `
      <th data-col="${c.key}">
        ${escapeHtml(c.label)}
        ${c.sub ? `<small>${escapeHtml(c.sub)}</small>` : ''}
      </th>
    `).join('');

    let prevMonth = '';
    const rowsHtml = weeks.map((w) => {
      const isMonthStart = prevMonth !== '' && w.month !== prevMonth;
      prevMonth = w.month;
      const isHoliday = w.kind === 'vakantie';

      const cellsHtml = cols.map((c) => {
        if (c.key === 'week') {
          const statusBtn = !isHoliday ? `
            <button type="button"
                    data-status-toggle="${escapeHtml(w.id)}"
                    data-status="${escapeHtml(w.status || 'vast')}"
                    title="Klik om status tussen Vast en Voorlopig te wisselen">
              ${w.status === 'voorlopig' ? 'Voorlopig' : 'Vast'}
            </button>
          ` : '';
          const kindBadge = w.label ? `<span data-kind-badge>${escapeHtml(w.label)}</span>` : '';
          const themaInput = !isHoliday ? `
            <input type="text"
                   data-thema-input="${escapeHtml(w.id)}"
                   value="${escapeHtml(w.thema || '')}"
                   placeholder="Thema…"
                   aria-label="Thema voor ${escapeHtml(w.dates)}">
          ` : '';

          return `
            <td data-col="week">
              <strong>${escapeHtml(w.dates)}</strong>
              <div data-week-meta>${kindBadge}${statusBtn}</div>
              ${themaInput}
            </td>
          `;
        }

        if (isHoliday && c.key !== 'uitstappen') {
          return `<td data-col="${c.key}"><span>${escapeHtml(w.label || 'Vakantie')}</span></td>`;
        }

        const val = w[c.key] || '';
        const info = getLimitInfo(val);
        const enforceLimit = c.key === 'motion' || c.key === 'web' || c.key === 'beeld';
        const limitAttr = enforceLimit && info.level !== 'ok' ? ` data-limit-state="${info.level}"` : '';

        return `
          <td data-col="${c.key}" data-editable-cell${limitAttr}>
            <textarea data-week-id="${escapeHtml(w.id)}"
                      data-field="${c.key}"
                      aria-label="${escapeHtml(c.label)} — ${escapeHtml(w.dates)}"
                      placeholder="—">${escapeHtml(val)}</textarea>
            <small data-cel-teller>${info.words}w · ${info.chars}t</small>
          </td>
        `;
      }).join('');

      return `
        <tr id="edit-row-${escapeHtml(w.id)}"
            data-week-id="${escapeHtml(w.id)}"
            data-kind="${escapeHtml(w.kind || 'les')}"
            data-status="${escapeHtml(w.status || 'vast')}"
            data-mark-tentative="${state.markTentative}"
            ${isMonthStart ? 'data-month-start="true"' : ''}>
          ${cellsHtml}
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table id="planning-editor-tabel">
        <thead>
          <tr>${headerCells}</tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    // Bind textareas
    container.querySelectorAll('textarea[data-week-id]').forEach((ta) => {
      autoResizeTextarea(ta);
      ta.addEventListener('input', () => {
        const wid = ta.dataset.weekId;
        const field = ta.dataset.field;
        const week = state.weeks.find((item) => item.id === wid);
        if (!week) return;
        week[field] = ta.value;
        autoResizeTextarea(ta);

        const td = ta.closest('td');
        const counter = td?.querySelector('[data-cel-teller]');
        const info = getLimitInfo(ta.value);
        if (counter) counter.textContent = `${info.words}w · ${info.chars}t`;
        const enforceLimit = field === 'motion' || field === 'web' || field === 'beeld';
        if (td) {
          if (enforceLimit && info.level !== 'ok') td.dataset.limitState = info.level;
          else delete td.dataset.limitState;
        }

        updateLimitSummary();
        triggerAutoSave();
      });
      ta.addEventListener('blur', () => {
        renderTable();
        if (hasPendingSave) flushSave(false);
      });
    });

    // Bind thema inputs
    container.querySelectorAll('input[data-thema-input]').forEach((inp) => {
      inp.addEventListener('input', () => {
        const week = state.weeks.find((item) => item.id === inp.dataset.themaInput);
        if (!week) return;
        week.thema = inp.value;
        triggerAutoSave();
      });
      inp.addEventListener('blur', () => {
        renderTable();
        if (hasPendingSave) flushSave(false);
      });
    });

    // Bind status toggles (Vast <-> Voorlopig)
    container.querySelectorAll('button[data-status-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const week = state.weeks.find((item) => item.id === btn.dataset.statusToggle);
        if (!week) return;
        week.status = week.status === 'voorlopig' ? 'vast' : 'voorlopig';
        btn.dataset.status = week.status;
        btn.textContent = week.status === 'voorlopig' ? 'Voorlopig' : 'Vast';
        const tr = btn.closest('tr');
        if (tr) tr.dataset.status = week.status;
        renderTable();
        triggerAutoSave();
      });
    });
  }

  function renderTable() {
    const container = document.getElementById('tabel-container');
    if (!container) return;

    const cols = getActiveColumns();
    const weeks = getFilteredWeeks();

    const headerCells = cols.map((c) => `
      <th data-col="${c.key}">
        ${escapeHtml(c.label)}
        ${c.sub ? `<small>${escapeHtml(c.sub)}</small>` : ''}
      </th>
    `).join('');

    let prevMonth = '';
    const rowsHtml = weeks.map((w) => {
      const isMonthStart = prevMonth !== '' && w.month !== prevMonth;
      prevMonth = w.month;
      const isHoliday = w.kind === 'vakantie';

      const cellsHtml = cols.map((c) => {
        if (c.key === 'week') {
          const badge = w.label ? `<span data-kind-badge>${escapeHtml(w.label)}</span>` : '';
          const thema = w.thema ? `<span data-thema-tag>${escapeHtml(w.thema)}</span>` : '';
          return `
            <td data-col="week">
              <strong>${escapeHtml(w.dates)}</strong>
              ${badge ? `<div data-week-meta>${badge}</div>` : ''}
              ${thema}
            </td>
          `;
        }
        if (isHoliday && c.key !== 'uitstappen') {
          return `<td data-col="${c.key}">${escapeHtml(w.label || 'Vakantie')}</td>`;
        }
        return `<td data-col="${c.key}" data-view-cell>${formatCellHtml(w[c.key]) || '—'}</td>`;
      }).join('');

      return `
        <tr id="view-row-${escapeHtml(w.id)}"
            data-kind="${escapeHtml(w.kind || 'les')}"
            data-status="${escapeHtml(w.status || 'vast')}"
            data-mark-tentative="${state.markTentative}"
            ${isMonthStart ? 'data-month-start="true"' : ''}>
          ${cellsHtml}
        </tr>
      `;
    }).join('');

    container.innerHTML = `
      <table id="planning-overzicht-tabel">
        <thead>
          <tr>${headerCells}</tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  function buildExportTableHtml() {
    const cols = getActiveColumns();
    const weeks = getFilteredWeeks();

    const headStyle = 'border:1px solid #94a3b8;padding:6px 7px;background-color:#dbeafe;font-weight:700;text-align:left;vertical-align:bottom;font-size:11px;';
    const cellStyle = 'border:1px solid #cbd5e1;padding:5px 7px;vertical-align:top;text-align:left;font-size:11px;line-height:1.35;';
    const holidayBg = 'background-color:#f1f5f9;color:#475569;font-style:italic;';
    const examBg = 'background-color:#fef3c7;';

    const headers = cols.map((c) => `<th style="${headStyle}">${escapeHtml(c.label)}</th>`).join('');

    const bodyRows = weeks.map((w) => {
      const rowBg = w.kind === 'vakantie' ? holidayBg : (w.kind === 'examens' ? examBg : '');
      const cells = cols.map((c) => {
        if (c.key === 'week') {
          const extra = w.label ? `<br><span style="font-weight:400;color:#475569;">${escapeHtml(w.label)}</span>` : '';
          return `<td style="${cellStyle}${rowBg}font-weight:700;white-space:nowrap;">${escapeHtml(w.dates)}${extra}</td>`;
        }
        if (w.kind === 'vakantie' && c.key !== 'uitstappen') {
          return `<td style="${cellStyle}${rowBg}">${escapeHtml(w.label || '')}</td>`;
        }
        const raw = String(w[c.key] ?? '').trim();
        if (!raw) return `<td style="${cellStyle}${rowBg}"></td>`;
        const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
        const content = lines.length > 1
          ? `<strong>${escapeHtml(lines[0])}</strong><br>${lines.slice(1).map(escapeHtml).join('<br>')}`
          : escapeHtml(lines[0]);
        return `<td style="${cellStyle}${rowBg}">${content}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');

    return `<table width="100%" style="border-collapse:collapse;width:100%;font-family:Aptos,Calibri,sans-serif;font-size:11px;line-height:1.35;"><thead><tr>${headers}</tr></thead><tbody>${bodyRows}</tbody></table>`;
  }

  function buildExportTsv() {
    const cols = getActiveColumns();
    const weeks = getFilteredWeeks();
    const cleanCell = (txt) => String(txt ?? '').replace(/\t/g, ' ').replace(/\r?\n+/g, ' — ').trim();

    const lines = [cols.map((c) => c.label).join('\t')];
    for (const w of weeks) {
      const row = cols.map((c) => {
        if (c.key === 'week') {
          return w.label ? `${w.dates} (${w.label})` : w.dates;
        }
        if (w.kind === 'vakantie' && c.key !== 'uitstappen') {
          return w.label || '';
        }
        return cleanCell(w[c.key]);
      });
      lines.push(row.join('\t'));
    }
    return lines.join('\n');
  }

  function buildExportCsv() {
    const cols = getActiveColumns();
    const weeks = getFilteredWeeks();
    const esc = (val) => {
      const s = String(val ?? '').replace(/\r?\n+/g, ' — ').trim();
      return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };

    const lines = [cols.map((c) => esc(c.label)).join(';')];
    for (const w of weeks) {
      const row = cols.map((c) => {
        if (c.key === 'week') {
          return w.label ? `${w.dates} (${w.label})` : w.dates;
        }
        if (w.kind === 'vakantie' && c.key !== 'uitstappen') {
          return w.label || '';
        }
        return w[c.key] || '';
      });
      lines.push(row.map(esc).join(';'));
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
      showToast('Tabel gekopieerd. Plak rechtstreeks in Word, Docs, Excel of Smartschool.');
    } catch (err) {
      console.error('[Jaarplanning] Klembordfout:', err);
      try {
        await navigator.clipboard.writeText(tsv);
        showToast('Tabel gekopieerd als tab-gescheiden tekst.');
      } catch {
        showToast('Kon niet kopiëren naar het klembord. Controleer browserrechten.');
      }
    }
  }

  function downloadCsv() {
    const csv = buildExportCsv();
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.datafile}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`CSV gedownload (${state.datafile}.csv).`);
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
    } else {
      renderEditor();
    }
    renderSidebar();
  }

  function renderAll() {
    updateLimitSummary();
    renderSidebar();
    renderEditor();
    renderTable();
  }

  function initControls() {
    document.querySelectorAll('[data-view-tab]').forEach((btn) => {
      btn.addEventListener('click', () => switchView(btn.dataset.viewTab));
    });

    document.querySelectorAll('[data-trimester]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.trimester = btn.dataset.trimester;
        document.querySelectorAll('[data-trimester]').forEach((b) => {
          b.setAttribute('aria-pressed', String(b.dataset.trimester === state.trimester));
        });
        renderAll();
      });
    });

    const colBindings = [
      ['opt-col-week', 'week'],
      ['opt-col-grafische', 'grafische'],
      ['opt-col-motion', 'motion'],
      ['opt-col-web', 'web'],
      ['opt-col-beeld', 'beeld'],
      ['opt-col-uitstappen', 'uitstappen']
    ];
    for (const [id, key] of colBindings) {
      const cb = document.getElementById(id);
      if (!cb) continue;
      cb.checked = Boolean(state.visibleCols[key]);
      cb.addEventListener('change', () => {
        state.visibleCols[key] = cb.checked;
        // Voorkom lege tabel
        if (!Object.values(state.visibleCols).some(Boolean)) {
          state.visibleCols[key] = true;
          cb.checked = true;
          showToast('Minstens één kolom moet zichtbaar blijven.');
          return;
        }
        renderAll();
      });
    }

    const markCb = document.getElementById('opt-mark-tentative');
    if (markCb) {
      markCb.checked = state.markTentative;
      markCb.addEventListener('change', () => {
        state.markTentative = markCb.checked;
        renderAll();
      });
    }

    const limitInfo = document.getElementById('planning-limiet-info');
    if (limitInfo) {
      limitInfo.addEventListener('click', () => {
        if (limitInfo.dataset.over !== 'true') return;
        if (state.activeView !== 'editor') switchView('editor');
        const firstOver = document.querySelector('td[data-limit-state="over"] textarea');
        if (firstOver) {
          firstOver.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstOver.focus();
        }
      });
    }

    document.getElementById('btn-copy-table')?.addEventListener('click', copyTableToClipboard);
    document.getElementById('btn-download-csv')?.addEventListener('click', downloadCsv);
    document.getElementById('btn-print-table')?.addEventListener('click', () => {
      renderTable();
      window.print();
    });

    window.addEventListener('beforeunload', () => {
      if (hasPendingSave) flushSave(true);
    });
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden' && hasPendingSave) flushSave(true);
    });
  }

  function init() {
    const root = document.querySelector('[data-jaarplanning]');
    if (!root) return;

    disableLiveReload();

    state.klas = root.dataset.klas || '5CRM';
    state.schooljaar = root.dataset.schooljaar || '2026-2027';
    state.peildatum = root.dataset.peildatum || '2026-11-26';
    state.datafile = root.dataset.datafile || `jaarplanning-${state.klas.toLowerCase()}`;

    const saved = safeParseJson(document.getElementById('jaarplanning-saved-data')) || {};
    if (saved.colleagueLabel) state.colleagueLabel = saved.colleagueLabel;
    if (saved.limits) {
      state.limits = {
        maxWords: Number(saved.limits.maxWords) || 20,
        maxChars: Number(saved.limits.maxChars) || 140
      };
    }
    if (saved.columns) {
      state.columns = { ...state.columns, ...saved.columns };
    }
    if (Array.isArray(saved.weeks)) {
      state.weeks = saved.weeks;
    }

    const colLabelEl = document.getElementById('opt-col-grafische-label');
    if (colLabelEl) colLabelEl.textContent = state.colleagueLabel;

    initControls();
    renderAll();
    checkServerStatus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
