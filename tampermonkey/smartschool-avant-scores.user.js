// ==UserScript==
// @name         Avant Smartschool Skore Auto-Grader (Leerling- & Klasbeeld)
// @namespace    https://avant.local/
// @version      2026-10-20-1835
// @description  Vult automatisch rubric-scores (4.1 t/m 4.6) in vanuit Avant in het Smartschool puntenboek (zowel per leerling als voor de hele klas)
// @author       Vincent Vander Cruyssen & Crossmedia Team
// @match        *://*.smartschool.be/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  // --- Hashing & String Helpers ---

  async function computeSha256Ten(rawName) {
    const cleanName = cleanStudentName(rawName);
    const encoder = new TextEncoder();
    const data = encoder.encode(cleanName);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 10);
  }

  function cleanStudentName(raw) {
    return String(raw || '')
      .replace(/^\s*\d+[\.\)\-]\s*/, '') // Verwijder nummering ("1. ", "02) ")
      .replace(/\.{2,}/g, '')            // Verwijder ellipsistekens ("...")
      .replace(/\s+/g, ' ')
      .trim();
  }

  function normalizeName(str) {
    return cleanStudentName(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ij/g, 'y'); // normaliseer ij/y (bv. Kleykens / Kleijkens)
  }

  function matchStudentName(rawSmartschoolName, candidateName) {
    const s1 = normalizeName(rawSmartschoolName);
    const s2 = normalizeName(candidateName);
    if (!s1 || !s2) return false;
    if (s1 === s2) return true;
    if (s2.startsWith(s1) || s1.startsWith(s2)) return true;

    // Check op voornaam en achternaam woorden
    const words1 = s1.split(/\s+/).filter(w => w.length > 2);
    const words2 = s2.split(/\s+/).filter(w => w.length > 2);
    const matches = words1.filter(w => words2.some(w2 => w2.startsWith(w) || w.startsWith(w2)));
    return matches.length >= 2 || (matches.length === 1 && words1.length === 1);
  }

  // --- Document & Iframe Resolution ---

  function getGradebookDoc() {
    if (document.getElementById('gridViewContentTable') || document.querySelector('.content-table')) {
      return document;
    }
    const frameSelectors = [
      '#skore_gb_frame',
      'iframe.skoreContentFrame',
      'iframe[src*="gradebook"]',
      'iframe[src*="Skore"]'
    ];
    for (const sel of frameSelectors) {
      const frame = document.querySelector(sel);
      try {
        if (frame && frame.contentDocument && frame.contentDocument.getElementById('gridViewContentTable')) {
          return frame.contentDocument;
        }
      } catch (e) {}
    }
    const allIframes = Array.from(document.querySelectorAll('iframe'));
    for (const f of allIframes) {
      try {
        if (f.contentDocument && f.contentDocument.getElementById('gridViewContentTable')) {
          return f.contentDocument;
        }
      } catch (e) {}
    }
    return null;
  }

  // --- Edit Mode & Click Helpers ---

  function simulateCellClick(el) {
    if (!el) return;
    const win = el.ownerDocument?.defaultView || window;
    let clientX = 0;
    let clientY = 0;
    try {
      const rect = el.getBoundingClientRect();
      clientX = rect.left + rect.width / 2;
      clientY = rect.top + rect.height / 2;
    } catch (e) {}

    const eventInit = {
      bubbles: true,
      cancelable: true,
      view: win,
      button: 0,
      buttons: 1,
      which: 1,
      clientX,
      clientY,
      screenX: clientX,
      screenY: clientY,
      detail: 1
    };

    try { el.focus?.(); } catch (e) {}
    el.dispatchEvent(new PointerEvent('pointerdown', eventInit));
    el.dispatchEvent(new MouseEvent('mousedown', eventInit));
    el.dispatchEvent(new PointerEvent('pointerup', eventInit));
    el.dispatchEvent(new MouseEvent('mouseup', eventInit));
    el.dispatchEvent(new MouseEvent('click', eventInit));
    try { el.click?.(); } catch (e) {}

    try {
      const $ = win.$ || window.$;
      if ($) {
        const jqEvt = $.Event('click', { which: 1, button: 0, clientX, clientY, target: el });
        $(el).trigger('mousedown').trigger('mouseup').trigger(jqEvt);
      }
    } catch (e) {}
  }

  function findDialogSafe(doc) {
    const docs = [doc, document];
    try {
      if (window.top && window.top.document && !docs.includes(window.top.document)) {
        docs.push(window.top.document);
      }
    } catch (e) {}
    try {
      if (window.parent && window.parent.document && !docs.includes(window.parent.document)) {
        docs.push(window.parent.document);
      }
    } catch (e) {}

    for (const d of docs) {
      if (!d) continue;
      try {
        const el = d.getElementById('smscDialogEvaluationInfoWindow') ||
                   d.querySelector('#smscDialogEvaluationInfoWindow, [id*="EvaluationInfo"]');
        if (el) return el;
      } catch (e) {}
    }
    return null;
  }

  // --- Edit Mode Activator ---

  async function ensureColumnEditMode(doc, xaxis) {
    const checkInput = () => doc.querySelector(
      `#gridViewContentTable td[xaxis="${xaxis}"] input.input-numeric, ` +
      `#gridViewContentTable content-editor[xaxis="${xaxis}"] input`
    );
    if (checkInput()) return true;

    // Tik cel 2.1 (yaxis 3) of een andere datarij aan om de editmodus te activeren
    const yaxes = ['3', '5', '4', '6', '7', '8', '2', '0'];

    for (const y of yaxes) {
      const td = doc.querySelector(`#gridViewContentTable td[xaxis="${xaxis}"][yaxis="${y}"]`);
      if (!td) continue;

      const candidates = [
        td.querySelector('.content-table-cell'),
        td.querySelector('.text, div'),
        td.querySelector('content-editor'),
        td
      ].filter(Boolean);

      for (const target of candidates) {
        simulateCellClick(target);
        await new Promise(r => setTimeout(r, 120));
        if (checkInput()) return true;
      }
    }

    return !!checkInput();
  }

  // --- In-Table Button Injection (in content-table-cell editmode title) ---

  function injectCellButtons(doc) {
    if (!doc) return;
    const titleCells = doc.querySelectorAll('#gridViewContentTable td[yaxis="1"] .content-table-cell, #gridViewContentTable .content-table-cell.title, #gridViewContentTable tr:nth-child(2) td .content-table-cell');

    titleCells.forEach(cell => {
      if (cell.querySelector('.btn-avant-paste-cell')) return;

      const td = cell.closest('td');
      const xaxis = td?.getAttribute('xaxis') || '0';

      const btn = doc.createElement('button');
      btn.type = 'button';
      btn.className = 'btn-avant-paste-cell';
      btn.textContent = '⚡ Plak Avant Scores';
      btn.title = 'Plak 6-cluster scores gekopieerd uit Avant in deze kolom';
      btn.style.cssText = `
        background: #0284c7;
        color: #ffffff;
        border: 1px solid #0369a1;
        border-radius: 4px;
        padding: 3px 8px;
        font-weight: 700;
        font-size: 11px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        height: 23px;
        width: calc(100% - 6px);
        margin: 2px auto;
        box-shadow: 0 1px 3px rgba(0,0,0,0.15);
        font-family: system-ui, -apple-system, sans-serif;
        transition: all 0.15s ease;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        z-index: 10;
      `;

      btn.addEventListener('mouseenter', () => {
        btn.style.background = '#0369a1';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.background = '#0284c7';
      });

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        handlePasteScoresForColumn(doc, xaxis);
      });

      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.appendChild(btn);
    });
  }

  // --- Cleanup Legacy Floating Toolbar Button ---

  function removeFloatingToolbarButton() {
    document.getElementById('btn-avant-paste-scores')?.remove();
    try {
      if (window.top && window.top.document) {
        window.top.document.getElementById('btn-avant-paste-scores')?.remove();
      }
    } catch (e) {}
  }

  // --- Column & Row Mapping ---

  function findProjectColumn(doc, bundle, targetXaxis = null) {
    const topTable = doc.getElementById('gridViewTopTable');
    if (!topTable) return { xaxis: targetXaxis || '0', title: 'Opdracht', max: null, element: null };

    const cells = Array.from(topTable.querySelectorAll('td[xaxis]'));
    if (targetXaxis !== null) {
      const matchTd = cells.find(td => td.getAttribute('xaxis') === String(targetXaxis));
      if (matchTd) {
        const titleEl = matchTd.querySelector('.title, .smsctip, [title]');
        const maxInput = matchTd.querySelector('input.max');
        return {
          xaxis: String(targetXaxis),
          title: (titleEl?.getAttribute('title') || titleEl?.textContent || 'Opdracht').trim(),
          max: maxInput ? parseFloat(maxInput.value) : null,
          element: matchTd
        };
      }
    }

    if (cells.length === 0) return { xaxis: '0', title: 'Opdracht', max: null, element: null };

    const normalizedTarget = (bundle.submissionTitle || '').toLowerCase().trim();

    // Match op titel
    for (const td of cells) {
      const xaxis = td.getAttribute('xaxis');
      const titleEl = td.querySelector('.title, .smsctip, [title]');
      const title = (titleEl?.getAttribute('title') || titleEl?.textContent || td.textContent || '').trim();
      const normTitle = title.toLowerCase();

      if (normTitle && (normTitle === normalizedTarget || normTitle.includes(normalizedTarget) || normalizedTarget.includes(normTitle))) {
        const maxInput = td.querySelector('input.max');
        return {
          xaxis,
          title,
          max: maxInput ? parseFloat(maxInput.value) : null,
          element: td
        };
      }
    }

    // Fallback: eerste kolom
    const td = cells[0];
    const titleEl = td.querySelector('.title, .smsctip, [title]');
    return {
      xaxis: td.getAttribute('xaxis') || '0',
      title: (titleEl?.getAttribute('title') || titleEl?.textContent || 'Opdracht').trim(),
      max: td.querySelector('input.max') ? parseFloat(td.querySelector('input.max').value) : null,
      element: td
    };
  }

  function mapRowsToClusters(doc, targetXaxis) {
    // Standaardhiërarchie in Smartschool rubric-weergave:
    // yaxis 0 = vak (Motion), 1 = sectietitel (VAKGEBONDEN), 2 = vakrubriek (2 2. Motion)
    // yaxis 3 t/m 8 = clusters 4.1 t/m 4.6
    // yaxis 9 = 2.7 Feedback
    const clusterMap = {
      '4.1': { yaxis: '3', name: 'Analyse & workflow' },
      '4.2': { yaxis: '4', name: 'Design & lay-out' },
      '4.3': { yaxis: '5', name: 'Multimediaproductie' },
      '4.4': { yaxis: '6', name: 'Release & presentatie' },
      '4.5': { yaxis: '7', name: 'Kwaliteit & context' },
      '4.6': { yaxis: '8', name: 'Professionele competenties' },
      'feedback': { yaxis: '9', name: 'Feedback' }
    };

    const clusterKeywords = [
      { id: '4.1', keywords: ['analyse', 'workflow'] },
      { id: '4.2', keywords: ['design', 'lay-out', 'layout'] },
      { id: '4.3', keywords: ['multimedia', 'productie'] },
      { id: '4.4', keywords: ['release', 'presentatie'] },
      { id: '4.5', keywords: ['kwaliteit', 'context'] },
      { id: '4.6', keywords: ['professionele', 'competenties'] },
      { id: 'feedback', keywords: ['feedback'] }
    ];

    // Controleer tekstlabels in het linkerpaneel (sla yaxis 0, 1, 2 altijd over!)
    const allTextNodes = Array.from(doc.querySelectorAll(
      '.left-column [yaxis], #gridViewLeftTable [yaxis], .tree-table [yaxis], .categories-table [yaxis], tr[yaxis], td[yaxis]'
    ));
    allTextNodes.forEach(node => {
      const y = node.getAttribute('yaxis');
      const yNum = parseInt(y, 10);
      if (isNaN(yNum) || yNum < 3) return; // Rijen 0, 1 en 2 zijn ALTIJD headers - NOOIT mappen!

      const text = (node.innerText || node.textContent || '').trim().toLowerCase();
      if (!text) return;

      for (const item of clusterKeywords) {
        if (item.keywords.some(k => text.includes(k))) {
          clusterMap[item.id].yaxis = String(y);
          break;
        }
      }
    });

    return clusterMap;
  }

  // --- Student List Discovery ---

  function isElementActive(el) {
    if (!el) return false;
    let curr = el;
    const body = el.ownerDocument?.body || document.body;
    while (curr && curr !== body) {
      if (curr.classList) {
        if (curr.classList.contains('active') ||
            curr.classList.contains('selected') ||
            curr.classList.contains('highlight') ||
            curr.getAttribute('aria-selected') === 'true') {
          return true;
        }
      }
      try {
        const win = curr.ownerDocument?.defaultView || window;
        const bg = win.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            if (b > 130 && b > r + 30) return true;
          }
        }
      } catch (e) {}
      curr = curr.parentElement;
    }
    return false;
  }

  function findActiveStudent(doc, studentList) {
    if (!studentList || studentList.length === 0) return null;
    for (const s of studentList) {
      if (!s.element) continue;
      if (isElementActive(s.element)) {
        return s;
      }
    }
    return null;
  }

  function findStudentList(doc, bundle) {
    const knownStudents = bundle.students || [];

    const candidates = Array.from(doc.querySelectorAll('.pupil, .student, .user, [class*="pupil"], [class*="student"], tr[data-student], li[data-student], div[data-student]'));
    
    let studentElements = [];
    if (candidates.length >= 3) {
      studentElements = candidates;
    } else {
      const allDivsAndSpans = Array.from(doc.querySelectorAll('div, li, span, a, td'));
      studentElements = allDivsAndSpans.filter(el => {
        const text = (el.innerText || el.textContent || '').trim();
        return /^\d{1,2}\.\s+[A-Z]/.test(text) && el.children.length <= 2;
      });
    }

    const matchedList = [];
    const seenNames = new Set();

    studentElements.forEach(el => {
      const rawText = (el.innerText || el.textContent || '').trim();
      const clean = cleanStudentName(rawText);
      if (!clean || clean.length < 3 || seenNames.has(clean)) return;

      let matchedStudent = null;
      for (const ks of knownStudents) {
        if (matchStudentName(clean, ks.name)) {
          matchedStudent = ks;
          break;
        }
      }

      const isActive = isElementActive(el);

      matchedList.push({
        rawText,
        cleanName: clean,
        element: el,
        matchedStudent,
        hash: matchedStudent?.hash || null,
        isActive
      });
      seenNames.add(clean);
    });

    return matchedList;
  }

  // --- Score Value Dispatcher ---

  function applyScoreToInput(doc, input, scoreValue) {
    if (!input) return;

    const formatted = String(scoreValue).replace('.', ',');
    input.focus();
    input.value = formatted;

    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('blur', { bubbles: true }));

    try {
      const $ = doc.defaultView?.$ || window.$;
      if ($) {
        $(input).val(formatted).trigger('input').trigger('change').trigger('blur');
      }
    } catch (e) {}

    input.style.backgroundColor = '#ecfdf5';
    input.style.border = '2px solid #10b981';
    input.style.transition = 'all 0.3s ease';
  }

  // --- Paste Handler per Column ---

  async function handlePasteScoresForColumn(doc, targetXaxis) {
    let clipboardText = '';
    try {
      clipboardText = await navigator.clipboard.readText();
    } catch (e) {
      alert('Kon het klembord niet lezen. Geef de browser toestemming om het klembord te lezen.');
      return;
    }

    let bundle;
    try {
      bundle = JSON.parse(clipboardText);
      if (!bundle.scores || typeof bundle.scores !== 'object') {
        throw new Error('Geen geldige scores gevonden');
      }
    } catch (err) {
      alert('Klembord bevat geen geldige Avant scores payload.\nKlik eerst in Avant op "⚡ Kopieer voor Smartschool".');
      return;
    }

    // 1. Zorg dat de doelkolom actief in edit-mode staat
    const projectCol = findProjectColumn(doc, bundle, targetXaxis);
    await ensureColumnEditMode(doc, projectCol.xaxis);

    // 2. Map rijen naar clusters
    const clusterRows = mapRowsToClusters(doc, projectCol.xaxis);
    const mappedClusterIds = Object.keys(clusterRows).filter(k => k !== 'feedback');

    if (mappedClusterIds.length === 0) {
      alert('Kon de cluster-rijen (4.1 t/m 4.6) niet identificeren in het puntenboek.\nControleer of de evaluatiecriteria zichtbaar zijn.');
      return;
    }

    // 3. Scan leerlingenlijst
    const studentList = findStudentList(doc, bundle);

    for (const item of studentList) {
      if (!item.hash) {
        const directHash = await computeSha256Ten(item.cleanName);
        if (bundle.scores[directHash]) {
          item.hash = directHash;
        } else {
          for (const [h, sData] of Object.entries(bundle.scores)) {
            const ks = bundle.students?.find(s => s.hash === h);
            if (ks && matchStudentName(item.cleanName, ks.name)) {
              item.hash = h;
              break;
            }
          }
        }
      }
    }

    let activeStudent = studentList.find(s => s.isActive) || studentList[0] || null;

    showImportModal({
      doc,
      bundle,
      projectCol,
      clusterRows,
      studentList,
      initialActiveStudent: activeStudent
    });
  }

  // --- Modal Interface ---

  function showImportModal({ doc, bundle, projectCol, clusterRows, studentList, initialActiveStudent }) {
    const existing = document.getElementById('avant-import-modal');
    if (existing) existing.remove();

    let currentStudent = initialActiveStudent;
    const mappedClusterIds = Object.keys(clusterRows).filter(k => k !== 'feedback');

    const modal = document.createElement('div');
    modal.id = 'avant-import-modal';
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000000;
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      width: 480px;
      max-width: 92vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
      font-family: system-ui, -apple-system, sans-serif;
      color: #0f172a;
      border: 1px solid #e2e8f0;
    `;

    function renderContent() {
      const studentScores = currentStudent?.hash ? bundle.scores[currentStudent.hash] : null;
      const previewScores = studentScores ? (studentScores.clusters || studentScores) : null;

      modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <h3 style="margin:0; font-size:18px; color:#0284c7; display:flex; align-items:center; gap:6px;">
            ⚡ Avant Punten Import
          </h3>
          <span style="font-size:12px; background:#e0f2fe; color:#0369a1; padding:3px 10px; border-radius:12px; font-weight:700;">
            ${bundle.classGroup || '5CRM'}
          </span>
        </div>

        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; margin-bottom:14px; font-size:13px;">
          <div><strong>Opdracht:</strong> ${escapeHtml(bundle.submissionTitle || projectCol.title)}</div>
          <div style="color:#64748b; font-size:12px; margin-top:2px;">
            Doelkolom: <strong>${escapeHtml(projectCol.title)}</strong> (xaxis: ${projectCol.xaxis})
          </div>
          <div style="color:#64748b; font-size:12px; margin-top:2px;">
            Gekoppelde criteria: <strong>${mappedClusterIds.join(', ')}</strong>
          </div>
        </div>

        ${currentStudent ? `
          <div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:12px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span style="font-size:13px; font-weight:700; color:#0369a1;">
                👤 Actieve leerling: ${escapeHtml(currentStudent.cleanName)}
              </span>
              <span style="font-size:11px; color:#0284c7; background:#e0f2fe; padding:2px 6px; border-radius:4px;">
                ${currentStudent.hash ? 'Gematcht ✓' : 'Niet gematcht'}
              </span>
            </div>

            ${previewScores ? `
              <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px; margin-top:8px;">
                ${mappedClusterIds.map(cid => {
                  const val = previewScores[cid];
                  return `
                    <div style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; padding:6px; text-align:center;">
                      <div style="font-size:11px; color:#64748b; font-weight:600;">${cid}</div>
                      <div style="font-size:14px; font-weight:700; color:${val !== undefined ? '#0284c7' : '#94a3b8'};">
                        ${val !== undefined ? val : '-'}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
              ${studentScores?._feedback ? `
                <div style="margin-top:8px; padding:6px 10px; background:#ffffff; border:1px solid #bae6fd; border-radius:6px; font-size:11px; color:#334155; line-height:1.4;">
                  <strong style="color:#0284c7;">💬 Feedback:</strong> ${escapeHtml(studentScores._feedback)}
                </div>
              ` : ''}
            ` : `
              <div style="font-size:12px; color:#991b1b; margin-top:4px;">
                Geen berekende scores gevonden in de payload voor deze leerling.
              </div>
            `}
          </div>
        ` : `
          <div style="background:#fef2f2; border:1px solid #fecaca; border-radius:8px; padding:12px; margin-bottom:16px; font-size:13px; color:#991b1b;">
            Geen actieve leerling geselecteerd in Smartschool.
          </div>
        `}

        <div id="avant-progress-container" style="display:none; margin-bottom:16px;">
          <div style="display:flex; justify-content:space-between; font-size:12px; margin-bottom:4px; font-weight:600; color:#0369a1;">
            <span id="avant-progress-label">Bezig met invullen...</span>
            <span id="avant-progress-count">0 / ${studentList.length}</span>
          </div>
          <div style="height:8px; background:#e2e8f0; border-radius:4px; overflow:hidden;">
            <div id="avant-progress-bar" style="height:100%; width:0%; background:#0284c7; transition:width 0.2s ease;"></div>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:8px;">
          <button id="btn-fill-active-student" ${!currentStudent?.hash ? 'disabled' : ''} style="
            background: #0284c7;
            color: #ffffff;
            border: none;
            padding: 10px 14px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 13px;
            cursor: ${currentStudent?.hash ? 'pointer' : 'not-allowed'};
            opacity: ${currentStudent?.hash ? '1' : '0.6'};
            transition: all 0.15s ease;
          ">
            ⚡ Vul huidige leerling in (${escapeHtml(currentStudent?.cleanName || 'Leerling')})
          </button>

          ${studentList.length > 1 ? `
            <button id="btn-fill-all-students" style="
              background: #0f172a;
              color: #ffffff;
              border: none;
              padding: 10px 14px;
              border-radius: 6px;
              font-weight: 700;
              font-size: 13px;
              cursor: pointer;
              transition: all 0.15s ease;
            ">
              🚀 Vul ALLE ${studentList.length} leerlingen automatisch in
            </button>
          ` : ''}

          <div style="display:flex; gap:8px; margin-top:4px;">
            <button id="btn-prev-student" style="flex:1; background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">
              ◀ Vorige
            </button>
            <button id="btn-next-student" style="flex:1; background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">
              Volgende ▶
            </button>
            <button id="btn-close-modal" style="background:#f1f5f9; color:#64748b; border:1px solid #cbd5e1; padding:8px 14px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">
              Sluiten
            </button>
          </div>
        </div>

        <p style="font-size:11px; color:#64748b; margin:14px 0 0 0; text-align:center;">
          💡 Klik na afloop in Smartschool op de officiële <strong>Opslaan</strong> knop om te bewaren.
        </p>
      `;

      // Bevestig event listeners op het modal-element zelf (onafhankelijk van document-timing)
      modal.querySelector('#btn-close-modal')?.addEventListener('click', () => modal.remove());

      modal.querySelector('#btn-fill-active-student')?.addEventListener('click', async () => {
        if (!currentStudent?.hash) return;
        const btn = modal.querySelector('#btn-fill-active-student');
        if (btn) btn.disabled = true;

        await ensureColumnEditMode(doc, projectCol.xaxis);
        const count = await fillScoresForStudent(doc, currentStudent, clusterRows, projectCol.xaxis, bundle);
        
        if (count > 0) {
          flashSuccessButton(modal, 'btn-fill-active-student', `✓ ${count} clusters + feedback ingevuld!`);
        } else {
          flashSuccessButton(modal, 'btn-fill-active-student', `⚠️ 0 ingevuld (tik cel 2.1 aan)`);
        }
        if (btn) btn.disabled = false;
      });

      modal.querySelector('#btn-prev-student')?.addEventListener('click', () => {
        const curIdx = studentList.indexOf(currentStudent);
        const nextIdx = (curIdx > 0) ? curIdx - 1 : studentList.length - 1;
        selectStudent(studentList[nextIdx]);
      });

      modal.querySelector('#btn-next-student')?.addEventListener('click', () => {
        const curIdx = studentList.indexOf(currentStudent);
        const nextIdx = (curIdx < studentList.length - 1) ? curIdx + 1 : 0;
        selectStudent(studentList[nextIdx]);
      });

      modal.querySelector('#btn-fill-all-students')?.addEventListener('click', () => {
        fillAllStudentsAutomatically(doc, modal, studentList, clusterRows, projectCol.xaxis, bundle);
      });
    }

    async function selectStudent(studentObj) {
      if (!studentObj) return;
      currentStudent = studentObj;
      if (studentObj.element) {
        const clickTarget = studentObj.element.closest('a, tr, li, div') || studentObj.element;
        simulateCellClick(clickTarget);
        // Geef Smartschool tijd om de tabel van de leerling via AJAX te laden
        await new Promise(r => setTimeout(r, 450));
        await ensureColumnEditMode(doc, projectCol.xaxis);
      }
      renderContent();
    }

    document.body.appendChild(modal);
    renderContent();

    // Houd continu in de gaten of de actieve leerling in Smartschool verandert (bv. door de leerkracht aangeklikt)
    const activeWatcher = setInterval(() => {
      if (!modal.isConnected) {
        clearInterval(activeWatcher);
        return;
      }
      const active = findActiveStudent(doc, studentList);
      if (active && active.cleanName !== currentStudent?.cleanName) {
        currentStudent = active;
        renderContent();
      }
    }, 400);
  }

  // --- Score Filling Handlers ---

  function clearInput(doc, input, tdCell = null) {
    if (!input && !tdCell) return;

    // Klik eerst op de delete knop (vuilnisbakje) in de cel als die aanwezig is
    const deleteBtn = tdCell?.querySelector('.icon.delete, .icon-delete, [class*="delete"]');
    if (deleteBtn) {
      try {
        deleteBtn.click();
      } catch (e) {}
    }

    if (input) {
      input.focus?.();
      input.value = '';
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      input.dispatchEvent(new Event('blur', { bubbles: true }));

      try {
        const win = doc.defaultView || window;
        const $ = win.$ || window.$;
        if ($) $(input).val('').trigger('input').trigger('change').trigger('blur');
      } catch (e) {}

      input.style.backgroundColor = '';
      input.style.border = '';
    }
  }

  async function fillScoresForStudent(doc, studentObj, clusterRows, targetXaxis, bundle) {
    if (!studentObj?.hash) return 0;
    const studentData = bundle.scores[studentObj.hash];
    if (!studentData) return 0;

    // Activeer editmode indien nodig
    let hasInputs = !!doc.querySelector(`#gridViewContentTable td[xaxis="${targetXaxis}"] input`);
    if (!hasInputs) {
      await ensureColumnEditMode(doc, targetXaxis);
      await new Promise(r => setTimeout(r, 150));
    }

    const scores = studentData.clusters || studentData;
    let filledCount = 0;

    // 1. Wis bovenliggende headers (rij 0 en rij 2) en feedback cijferveld (rij 9)
    // Dit voorkomt dat Smartschool automatisch een score naar onder cascadeert
    ['0', '2'].forEach(y => {
      const td = doc.querySelector(`#gridViewContentTable td[xaxis="${targetXaxis}"][yaxis="${y}"]`);
      const headerInput = td?.querySelector('input.input-numeric, input');
      if (headerInput && headerInput.value !== '') {
        clearInput(doc, headerInput, td);
      }
    });

    // Zorg dat het numerieke cijferveld op de feedbackrij ALTIJD leeg is
    const fbYaxis = clusterRows.feedback?.yaxis || '9';
    const fbTd = doc.querySelector(`#gridViewContentTable td[xaxis="${targetXaxis}"][yaxis="${fbYaxis}"]`);
    const fbNumericInput = fbTd?.querySelector('input.input-numeric, input');
    if (fbNumericInput && fbNumericInput.value !== '') {
      clearInput(doc, fbNumericInput, fbTd);
    }

    // 2. Loop door de 6 clusters (4.1 t/m 4.6):
    // - Vul uitsluitend de actieve clusters in met hun score
    // - Maak niet-beoordeelde clusters leeg
    const clusterIds = ['4.1', '4.2', '4.3', '4.4', '4.5', '4.6'];
    for (const cid of clusterIds) {
      const rowInfo = clusterRows[cid];
      if (!rowInfo) continue;

      const y = rowInfo.yaxis;
      const td = doc.querySelector(`#gridViewContentTable td[xaxis="${targetXaxis}"][yaxis="${y}"]`);
      const input = td?.querySelector('input.input-numeric, input[type="text"], input');

      const scoreVal = scores[cid];
      if (scoreVal !== undefined && scoreVal !== '' && scoreVal !== null) {
        if (input) {
          applyScoreToInput(doc, input, scoreVal);
          filledCount++;
        }
      } else {
        // Cluster niet actief in deze opdracht -> maak cel leeg
        if (input && input.value !== '') {
          clearInput(doc, input, td);
        }
      }
    }

    // 3. Vul tekstuele feedback in via het potloodje (icon edit) in de feedbackrij
    const feedbackText = studentData._feedback || studentData.feedback;
    if (feedbackText && feedbackText.trim().length > 0) {
      await fillFeedbackForStudent(doc, targetXaxis, fbYaxis, feedbackText.trim());
    }

    return filledCount;
  }

  async function fillFeedbackForStudent(doc, targetXaxis, feedbackYaxis, feedbackText) {
    if (!feedbackText || feedbackText.trim().length === 0) return false;

    const feedbackCell = doc.querySelector(
      `#gridViewContentTable td[xaxis="${targetXaxis}"][yaxis="${feedbackYaxis}"]`
    );
    if (!feedbackCell) {
      console.warn(`[Avant] Feedback cel niet gevonden op xaxis=${targetXaxis}, yaxis=${feedbackYaxis}`);
      return false;
    }

    // Zoek specifiek naar het potloodje (div met class icon en edit)
    let editIcon = feedbackCell.querySelector('.editor-grades .icon.edit, .icon.edit, div.icon.edit');
    if (!editIcon) {
      // Als de cel nog in view mode staat, activeer hem door aan te tikken
      simulateCellClick(feedbackCell.querySelector('.content-table-cell') || feedbackCell);
      await new Promise(r => setTimeout(r, 180));
      editIcon = feedbackCell.querySelector('.editor-grades .icon.edit, .icon.edit, div.icon.edit');
    }

    if (!editIcon) {
      console.warn(`[Avant] Potloodje (.icon.edit) niet gevonden in feedback cel`);
      return false;
    }

    // Klik op het potloodje om de modal te openen
    simulateCellClick(editIcon);

    // Wacht tot de modal zichtbaar is (polling tot max 2000ms)
    let dialog = null;
    let textarea = null;
    for (let wait = 0; wait < 20; wait++) {
      dialog = findDialogSafe(doc);
      if (dialog) {
        const uiDialog = dialog.closest('.ui-dialog') || dialog;
        const isVisible = (uiDialog.offsetWidth > 0 && uiDialog.offsetHeight > 0) ||
                          (uiDialog.style.display !== 'none' && window.getComputedStyle(uiDialog).display !== 'none');
        if (isVisible) {
          textarea = dialog.querySelector('textarea.infoTextarea, textarea');
          if (textarea) break;
        }
      }
      await new Promise(r => setTimeout(r, 100));
    }

    if (!dialog || !textarea) {
      console.warn(`[Avant] #smscDialogEvaluationInfoWindow niet verschenen na klik op potloodje`);
      return false;
    }

    // Wacht 250ms zodat Smartschool's eventuele AJAX-ophaling voltooid is en het veld niet overschrijft
    await new Promise(r => setTimeout(r, 250));

    textarea.focus?.();
    textarea.value = feedbackText;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));

    try {
      const dialogWin = dialog.ownerDocument?.defaultView || window;
      const $ = dialogWin.$ || window.$;
      if ($) $(textarea).val(feedbackText).trigger('input').trigger('change');
    } catch (e) {}

    await new Promise(r => setTimeout(r, 150));

    // Klik op de blauwe Opslaan knop
    const saveBtn = dialog.querySelector('button.closeBtn, button[data-i18n="save"], button.smscButton.blue');
    if (saveBtn) {
      simulateCellClick(saveBtn);
      await new Promise(r => setTimeout(r, 250));
    }

    return true;
  }

  async function fillAllStudentsAutomatically(doc, modal, studentList, clusterRows, targetXaxis, bundle) {
    const progressContainer = modal.querySelector('#avant-progress-container');
    const progressBar = modal.querySelector('#avant-progress-bar');
    const progressLabel = modal.querySelector('#avant-progress-label');
    const progressCount = modal.querySelector('#avant-progress-count');
    const fillAllBtn = modal.querySelector('#btn-fill-all-students');

    if (progressContainer) progressContainer.style.display = 'block';
    if (fillAllBtn) fillAllBtn.disabled = true;

    let totalFilled = 0;
    let successStudents = 0;

    for (let i = 0; i < studentList.length; i++) {
      const s = studentList[i];
      if (progressLabel) progressLabel.textContent = `Bezig met ${s.cleanName}...`;
      if (progressCount) progressCount.textContent = `${i + 1} / ${studentList.length}`;
      if (progressBar) progressBar.style.width = `${((i + 1) / studentList.length) * 100}%`;

      if (s.element) {
        const clickTarget = s.element.closest('a, tr, li, div') || s.element;
        simulateCellClick(clickTarget);
        // Geef Smartschool tijd om de tabel van de leerling via AJAX te laden
        await new Promise(r => setTimeout(r, 500));
      }

      // Activeer edit mode voor deze leerling
      await ensureColumnEditMode(doc, targetXaxis);
      await new Promise(r => setTimeout(r, 100));

      const count = await fillScoresForStudent(doc, s, clusterRows, targetXaxis, bundle);
      if (count > 0) {
        totalFilled += count;
        successStudents++;
      }

      await new Promise(r => setTimeout(r, 150));
    }

    if (progressLabel) progressLabel.textContent = `✓ Voltooid! ${successStudents} leerlingen voorzien van scores en feedback.`;
    if (fillAllBtn) {
      fillAllBtn.textContent = `✓ Klaar! (${successStudents} leerlingen)`;
      fillAllBtn.style.background = '#059669';
    }
  }

  function flashSuccessButton(modal, btnId, msg) {
    const btn = modal.querySelector('#' + btnId);
    if (!btn) return;
    const oldText = btn.textContent;
    const oldBg = btn.style.background;
    btn.textContent = msg;
    btn.style.background = msg.includes('⚠️') ? '#d97706' : '#059669';
    setTimeout(() => {
      btn.textContent = oldText;
      btn.style.background = oldBg;
    }, 2500);
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  // Initialisatie & continue observatie
  function init() {
    removeFloatingToolbarButton();
    const doc = getGradebookDoc() || document;
    injectCellButtons(doc);
  }

  init();
  const observer = new MutationObserver(() => init());
  observer.observe(document.body, { childList: true, subtree: true });
})();
