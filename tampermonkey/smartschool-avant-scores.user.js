// ==UserScript==
// @name         Avant Smartschool Skore Auto-Grader (6 Clusters)
// @namespace    https://avant.local/
// @version      2.0.0
// @description  Vult automatisch cluster-scores (4.1 t/m 4.6) in vanuit Avant rubriek.json in het Smartschool puntenboek
// @author       Vincent Vander Cruyssen & Crossmedia Team
// @match        *://*.smartschool.be/skore/*
// @match        *://*.smartschool.be/evaluations/*
// @match        *://*.smartschool.be/*
// @grant        GM_setClipboard
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  // Hashing helper: berekent SHA-256 (eerste 10 hex karakters) via de Web Crypto API
  async function computeSha256Ten(rawName) {
    const cleanName = rawName.trim().replace(/\s+/g, ' ');
    const encoder = new TextEncoder();
    const data = encoder.encode(cleanName);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hex.substring(0, 10);
  }

  // Reverse name helper (voor het geval Smartschool "Achternaam Voornaam" toont)
  function reverseNameOrder(name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length <= 1) return name;
    // Neem laatste woord naar voor
    return [parts[parts.length - 1], ...parts.slice(0, parts.length - 1)].join(' ');
  }

  function injectToolbarButton() {
    if (document.getElementById('btn-avant-paste-scores')) return;

    const button = document.createElement('button');
    button.id = 'btn-avant-paste-scores';
    button.type = 'button';
    button.textContent = '⚡ Plak Avant Scores';
    button.title = 'Plak 6-cluster scores gekopieerd uit Avant';
    button.style.cssText = `
      position: fixed;
      top: 14px;
      right: 140px;
      z-index: 999999;
      background: #0284c7;
      color: #ffffff;
      border: 2px solid #ffffff;
      border-radius: 6px;
      padding: 8px 14px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.25);
      transition: all 0.15s ease-in-out;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    button.addEventListener('mouseenter', () => {
      button.style.background = '#0369a1';
      button.style.transform = 'translateY(-1px)';
    });
    button.addEventListener('mouseleave', () => {
      button.style.background = '#0284c7';
      button.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', handlePasteScores);
    document.body.appendChild(button);
  }

  async function handlePasteScores() {
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
      alert('Klembord bevat geen geldige Avant scores payload. Klik eerst in Avant op "⚡ Kopieer voor Smartschool".');
      return;
    }

    // 1. Detecteer cluster kolomkoppen in Smartschool (4.1 t/m 4.6)
    const columnMap = {};
    const headerCells = Array.from(document.querySelectorAll('th, .column-header, [role="columnheader"], .grid-header-cell'));

    headerCells.forEach((cell, index) => {
      const text = (cell.innerText || cell.textContent || '').trim();
      const match = text.match(/(4\.[1-6])/);
      if (match) {
        const clusterId = match[1];
        columnMap[clusterId] = {
          index: index,
          element: cell,
          title: text
        };
      }
    });

    const detectedClusters = Object.keys(columnMap);
    if (detectedClusters.length === 0) {
      alert('Kon de cluster-kolommen (4.1 t/m 4.6) niet vinden in de huidige Smartschool-tabel.\nControleer of de evaluatiekolommen zichtbaar zijn en beginnen met "4.1", "4.2", etc.');
      return;
    }

    // 2. Doorzoek leerlingrijen
    const rows = Array.from(document.querySelectorAll('tr, .student-row, [role="row"], .grid-row'));
    let matchedStudentsCount = 0;
    let updatedInputsCount = 0;
    const unmatchedStudents = [];
    const matchedLog = [];

    for (const row of rows) {
      // Zoek naamcel
      const nameCell = row.querySelector('.student-name, .user-name, td:first-child, [data-student-name]');
      if (!nameCell) continue;

      const rawName = (nameCell.innerText || nameCell.textContent || '').trim();
      if (!rawName || rawName.length < 3) continue;

      // Bereken hash voor en eventueel achteruit
      let hash = await computeSha256Ten(rawName);
      if (!bundle.scores[hash]) {
        const revName = reverseNameOrder(rawName);
        const revHash = await computeSha256Ten(revName);
        if (bundle.scores[revHash]) {
          hash = revHash;
        }
      }

      if (bundle.scores[hash]) {
        const studentScores = bundle.scores[hash];
        let hasUpdatedForStudent = false;

        // Vul kolommen in
        for (const [clusterId, score] of Object.entries(studentScores)) {
          if (columnMap[clusterId]) {
            const colIndex = columnMap[clusterId].index;
            const cells = Array.from(row.querySelectorAll('td, [role="gridcell"], .grid-cell'));

            // Zoek de juiste cel
            const targetCell = cells[colIndex] || cells[colIndex - 1];
            if (targetCell) {
              const input = targetCell.querySelector('input[type="text"], input[type="number"], .score-input, input:not([type="checkbox"])');
              if (input) {
                input.value = score;

                // Cruciale React/Vue state update triggers
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.dispatchEvent(new Event('blur', { bubbles: true }));

                input.style.backgroundColor = '#ecfdf5';
                input.style.border = '2px solid #10b981';
                input.style.transition = 'all 0.3s ease';

                updatedInputsCount++;
                hasUpdatedForStudent = true;
              }
            }
          }
        }

        if (hasUpdatedForStudent) {
          matchedStudentsCount++;
          matchedLog.push(`${rawName} (${hash})`);
        }
      } else {
        if (row.querySelector('input')) {
          unmatchedStudents.push(rawName);
        }
      }
    }

    // Toon overzicht
    showSummaryModal({
      bundle,
      detectedClusters,
      matchedStudentsCount,
      updatedInputsCount,
      unmatchedStudents
    });
  }

  function showSummaryModal({ bundle, detectedClusters, matchedStudentsCount, updatedInputsCount, unmatchedStudents }) {
    const existing = document.getElementById('avant-summary-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'avant-summary-modal';
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000000;
      background: #ffffff;
      border-radius: 10px;
      padding: 24px;
      width: 460px;
      max-width: 90vw;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.35);
      font-family: system-ui, -apple-system, sans-serif;
      color: #0f172a;
    `;

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <h3 style="margin:0; font-size:18px; color:#0284c7;">⚡ Avant Punten Import Resultaat</h3>
        <span style="font-size:12px; background:#e0f2fe; color:#0369a1; padding:3px 8px; border-radius:4px; font-weight:700;">
          ${bundle.classGroup || '5CRM'}
        </span>
      </div>
      
      <p style="margin:0 0 8px 0; font-size:14px;"><strong>Opdracht:</strong> ${escapeHtml(bundle.assignmentId || 'Opdracht')}</p>
      <p style="margin:0 0 8px 0; font-size:14px;"><strong>Herkende kolommen:</strong> ${detectedClusters.join(', ')}</p>
      <p style="margin:0 0 16px 0; font-size:14px;">
        <strong>Resultaat:</strong> <span style="color:#059669; font-weight:700;">${updatedInputsCount}</span> scores ingevuld voor <strong>${matchedStudentsCount}</strong> leerlingen.
      </p>

      ${unmatchedStudents.length > 0 ? `
        <div style="background:#fff1f2; border:1px solid #fecdd3; border-radius:6px; padding:10px; margin-bottom:16px;">
          <strong style="color:#991b1b; font-size:12px;">Niet gematcht in payload (${unmatchedStudents.length}):</strong>
          <ul style="margin:4px 0 0 0; padding-left:18px; font-size:12px; color:#991b1b; max-height:80px; overflow-y:auto;">
            ${unmatchedStudents.map(n => `<li>${escapeHtml(n)}</li>`).join('')}
          </ul>
        </div>
      ` : `
        <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:6px; padding:10px; margin-bottom:16px; color:#065f46; font-size:13px; font-weight:500;">
          ✓ Alle leerlingen in deze tabel zijn succesvol gesynchroniseerd!
        </div>
      `}

      <p style="font-size:12px; color:#64748b; margin:0 0 16px 0;">
        💡 Klik in Smartschool op de officiële <strong>Opslaan</strong> knop om de wijzigingen definitief te bewaren.
      </p>

      <button id="btn-close-summary-modal" style="
        width: 100%;
        background: #0f172a;
        color: #ffffff;
        border: none;
        padding: 10px;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        font-size: 14px;
      ">Sluiten</button>
    `;

    document.body.appendChild(modal);
    document.getElementById('btn-close-summary-modal')?.addEventListener('click', () => modal.remove());
  }

  function escapeHtml(str) {
    return String(str || '').replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[m]));
  }

  injectToolbarButton();
  const observer = new MutationObserver(() => injectToolbarButton());
  observer.observe(document.body, { childList: true, subtree: true });
})();
