// ==UserScript==
// @name         ClassID Doelenverdeler - Auto-Selecteer Leerplandoelen uit Klembord
// @namespace    https://avantonderwijs.be/
// @version      2026-10-26-1610
// @description  Vink automatisch leerplandoelen (CRS, SV, GEC, numeriek) aan op ClassID Doelenverdeler vanuit je klembord of gekopieerde lesplanning.
// @author       Vincent Vander Cruyssen & Antigravity
// @match        https://classid.io/curriculum-distributor/select*
// @match        https://*.classid.io/curriculum-distributor/select*
// @match        file:///*/Doelenverdeler.html*
// @match        file://*/*Doelenverdeler*
// @icon         https://classid.io/favicon.ico
// @grant        GM_getClipboard
// @grant        GM_setClipboard
// @grant        GM_addStyle
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  // --- Context & Helper references ---
  const pageWin = (typeof unsafeWindow !== 'undefined' ? unsafeWindow : null) || window.wrappedJSObject || window;

  // --- CSS Styling ---
  const STYLES = `
    /* Floating Action Button */
    .classid-fab-container {
      position: fixed;
      bottom: 85px;
      right: 25px;
      z-index: 10500;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
    }

    .classid-fab-main {
      background: linear-gradient(135deg, #1c93ff 0%, #006dd9 100%);
      color: #ffffff !important;
      border: none;
      border-radius: 50px;
      padding: 12px 20px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(28, 147, 255, 0.4);
      display: inline-flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.25s ease;
    }

    .classid-fab-main:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(28, 147, 255, 0.55);
      background: linear-gradient(135deg, #2ea0ff 0%, #007bf4 100%);
      color: #ffffff !important;
    }

    .classid-fab-main:active {
      transform: translateY(0);
    }

    /* Inline Action Toolbar */
    .classid-inline-toolbar {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-left: 10px;
      vertical-align: middle;
      flex-wrap: wrap;
    }

    .classid-btn-action {
      background-color: #e8f4ff;
      color: #0070e0;
      border: 1px solid #b6dcfe;
      border-radius: 6px;
      padding: 7px 14px;
      font-size: 13.5px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }

    .classid-btn-action:hover {
      background-color: #1c93ff;
      color: #ffffff;
      border-color: #1c93ff;
    }

    .classid-btn-secondary {
      background-color: #f5f5f9;
      color: #697a8d;
      border: 1px solid #d9dee3;
      border-radius: 6px;
      padding: 7px 12px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s ease;
    }

    .classid-btn-secondary:hover {
      background-color: #e1e4e8;
      color: #384551;
    }

    /* Highlight pulse animation for checked goals */
    @keyframes classidPulseSuccess {
      0% {
        background-color: rgba(40, 199, 111, 0.4);
        box-shadow: 0 0 0 3px #28c76f;
      }
      60% {
        background-color: rgba(40, 199, 111, 0.2);
        box-shadow: 0 0 0 2px #28c76f;
      }
      100% {
        background-color: transparent;
        box-shadow: 0 0 0 0 transparent;
      }
    }

    .classid-highlight-pulse {
      animation: classidPulseSuccess 3s ease-out;
      border-radius: 6px;
      padding: 2px 6px;
      transition: background-color 0.4s ease;
    }

    /* Modal dialog */
    .classid-modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(2px);
      z-index: 11000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .classid-modal-content {
      background: #ffffff;
      width: 100%;
      max-width: 580px;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
    }

    .classid-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ebecef;
      padding-bottom: 12px;
    }

    .classid-modal-title {
      font-size: 17px;
      font-weight: 700;
      color: #32475b;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .classid-modal-close {
      background: none;
      border: none;
      font-size: 20px;
      color: #a1acb8;
      cursor: pointer;
      line-height: 1;
    }
    .classid-modal-close:hover { color: #566a7f; }

    .classid-modal-textarea {
      width: 100%;
      height: 140px;
      border: 1px solid #d9dee3;
      border-radius: 8px;
      padding: 12px;
      font-family: monospace;
      font-size: 13px;
      resize: vertical;
      box-sizing: border-box;
      outline: none;
      transition: border-color 0.2s;
    }

    .classid-modal-textarea:focus {
      border-color: #1c93ff;
      box-shadow: 0 0 0 3px rgba(28, 147, 255, 0.15);
    }

    .classid-preview-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      min-height: 28px;
    }

    .classid-chip {
      background: #e7e7ff;
      color: #696cff;
      font-weight: 600;
      font-size: 12px;
      padding: 3px 8px;
      border-radius: 4px;
    }

    .classid-modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      border-top: 1px solid #ebecef;
      padding-top: 14px;
    }

    /* Result Notification Toast */
    .classid-toast {
      position: fixed;
      top: 24px;
      right: 24px;
      background: #ffffff;
      color: #32475b;
      border-left: 5px solid #28c76f;
      border-radius: 8px;
      padding: 16px 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
      z-index: 12000;
      max-width: 440px;
      font-family: 'Open Sans', system-ui, -apple-system, sans-serif;
      animation: classidSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .classid-toast.warning {
      border-left-color: #ff9f43;
    }

    .classid-toast.error {
      border-left-color: #ea5455;
    }

    @keyframes classidSlideIn {
      from { transform: translateX(50px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }

    .classid-toast-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .classid-toast-title {
      font-weight: 700;
      font-size: 14.5px;
      margin: 0;
    }

    .classid-toast-body {
      font-size: 13px;
      color: #566a7f;
      line-height: 1.45;
    }

    .classid-toast-list {
      margin: 6px 0 0 0;
      padding-left: 18px;
      font-size: 12.5px;
      max-height: 160px;
      overflow-y: auto;
    }

    .classid-toast-actions {
      margin-top: 12px;
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `;

  // Inject Stylesheet
  if (typeof GM_addStyle === 'function') {
    GM_addStyle(STYLES);
  } else {
    const styleEl = document.createElement('style');
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);
  }

  // --- Goal Extraction Logic ---

  /**
   * Extracts valid curriculum codes from any markdown, YAML, or plain text.
   * Handles bullet lists (* **CRS16:** ...), plain text (CRS16: ...), comma lists, etc.
   *
   * @param {string} text Raw copied text
   * @returns {Array<{code: string, label: string}>}
   */
  function extractGoalCodes(text) {
    if (!text || typeof text !== 'string') return [];

    const results = [];
    const seen = new Set();

    function isValidCode(code) {
      if (!code) return false;
      const clean = code.trim().replace(/\s+/g, '').toUpperCase();
      // Valid prefixes: CRS, SV, GEC, or numeric 2-digit pairs like 04.01
      return /^(?:CRS\d+|SV\d+(?:\.\d+)?|\d{2}\.\d{2}|GEC\d+)$/i.test(clean);
    }

    function addCode(rawCode, rawLabel) {
      if (!isValidCode(rawCode)) return;
      const cleanCode = rawCode.trim().replace(/\s+/g, '').toUpperCase();
      if (!seen.has(cleanCode)) {
        seen.add(cleanCode);
        results.push({
          code: cleanCode,
          label: (rawLabel || '').trim()
        });
      }
    }

    // Pattern 1: Markdown / plain lines:
    // e.g.: * **CRS16:** Beschrijving
    // e.g.: - **CRS16:** Beschrijving
    // e.g.: **CRS16:** Beschrijving
    // e.g.: CRS16: Beschrijving
    const lineRegex = /^\s*(?:[\*\-]\s*)?(?:\*\*)?([A-Za-z0-9_.]+)(?:\*\*)?\s*:\s*(.*)$/gm;
    let match;
    while ((match = lineRegex.exec(text)) !== null) {
      addCode(match[1], match[2]);
    }

    // Pattern 2: Frontmatter YAML code items:
    // e.g.: code: "CRS16" of - code: CRS16
    const yamlRegex = /code:\s*["']?([A-Za-z0-9_.]+)["']?/gi;
    while ((match = yamlRegex.exec(text)) !== null) {
      addCode(match[1], '');
    }

    // Pattern 3: Fallback if no structured lines were matched:
    // Scan text for code patterns (CRS16, SV06.72, 04.01, GEC01)
    if (results.length === 0) {
      const fallbackRegex = /\b((?:CRS|GEC)\s*\d+|SV\s*\d+(?:\.\d+)?|\d{2}\.\d{2})\b/gi;
      while ((match = fallbackRegex.exec(text)) !== null) {
        addCode(match[1], '');
      }
    }

    return results;
  }

  /**
   * Builds a regex to match a specific goal code inside a DOM element's text.
   * Handles optional spaces between letters and digits (e.g. "CRS16" vs "CRS 16").
   */
  function makeCodeMatcher(code) {
    const clean = code.trim().replace(/\s+/g, '').toUpperCase();
    const pattern = clean
      .replace(/^([A-Z]+)(\d+)/, '$1\\s*$2')
      .replace(/\./g, '\\.');
    return new RegExp('(?:^|[^a-zA-Z0-9.])' + pattern + '(?:[^a-zA-Z0-9.]|$)', 'i');
  }

  // --- DOM Inspection & Checkbox Handling ---

  /**
   * Scans #selectedCurriculum and returns all available goal checkboxes with metadata.
   */
  function scanCurriculumGoals() {
    const container = document.getElementById('selectedCurriculum');
    if (!container) return [];

    const checkboxes = Array.from(
      container.querySelectorAll('input[type="checkbox"][data-goal-id], input.targetCheckbox, input.accordion-checkbox')
    );

    return checkboxes.map(input => {
      const pTag = input.closest('p') || input.parentElement;
      const text = pTag ? pTag.textContent.trim() : '';

      const accordionCollapse = input.closest('.accordion-collapse, .collapse');
      const parentCard = accordionCollapse ? (accordionCollapse.closest('.accordion-item, .card') || accordionCollapse.parentElement) : null;
      const header = parentCard ? parentCard.querySelector('.accordion-header, .accordion-button, .card-header') : null;
      const accordionTitle = header ? header.textContent.trim() : '';

      // Check if this accordion or element is currently expanded / visible
      const isOpen = accordionCollapse ? (accordionCollapse.classList.contains('show') || accordionCollapse.style.display === 'block') : true;

      return {
        input,
        pTag,
        text,
        goalId: input.getAttribute('data-goal-id') || '',
        leerplanId: input.getAttribute('data-leerplan-id') || '',
        accordionCollapse,
        accordionTitle,
        isOpen
      };
    });
  }

  /**
   * Ensures the parent accordion is expanded if closed.
   */
  function expandAccordion(item) {
    if (!item.accordionCollapse) return;
    const collapseEl = item.accordionCollapse;
    if (!collapseEl.classList.contains('show')) {
      const parentCard = collapseEl.closest('.accordion-item, .card') || collapseEl.parentElement;
      const btn = parentCard ? parentCard.querySelector('[data-bs-toggle="collapse"], .accordion-button') : null;
      if (btn && btn.classList.contains('collapsed')) {
        btn.click();
      } else {
        collapseEl.classList.add('show');
        collapseEl.style.display = 'block';
      }
    }
  }

  /**
   * Programmatically checks the goal input and synchronizes ClassID internal state.
   */
  function checkGoalItem(item) {
    const input = item.input;
    const wasAlreadyChecked = input.checked;

    if (!wasAlreadyChecked) {
      // 1. Simulate human click
      input.click();

      // 2. Ensure checked property is true
      if (!input.checked) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }

      // 3. Trigger ClassID internal linkGoal() method
      try {
        if (typeof pageWin.linkGoal === 'function') {
          pageWin.linkGoal(input);
        }
      } catch (err) {
        console.warn('[ClassID AutoSelect] linkGoal call failed:', err);
      }

      // 4. Fallback verification: ensure item is present in globalSelectedValues
      try {
        if (Array.isArray(pageWin.globalSelectedValues) && item.goalId) {
          const exists = pageWin.globalSelectedValues.some(v => v.goalId === item.goalId);
          if (!exists && item.pTag) {
            const pClone = item.pTag.cloneNode(true);
            const cloneInput = pClone.querySelector('input');
            if (cloneInput) {
              cloneInput.classList.remove('accordion-checkbox', 'targetCheckbox');
              cloneInput.checked = true;
            }
            pageWin.globalSelectedValues.push({
              goalId: item.goalId,
              leerplanId: item.leerplanId,
              html: pClone
            });
            if (typeof pageWin.updateSelectedValues === 'function') {
              pageWin.updateSelectedValues();
            }
          }
        }
      } catch (err) {
        console.warn('[ClassID AutoSelect] Fallback sync error:', err);
      }
    }

    // Expand accordion so user can inspect it
    expandAccordion(item);

    // Visual pulse
    if (item.pTag) {
      item.pTag.classList.remove('classid-highlight-pulse');
      void item.pTag.offsetWidth; // trigger reflow
      item.pTag.classList.add('classid-highlight-pulse');
    }

    return !wasAlreadyChecked;
  }

  // --- Main Execution Flow ---

  /**
   * Executes the auto-selection process given an array of extracted codes.
   */
  function processGoalSelection(extractedGoals) {
    if (!extractedGoals || extractedGoals.length === 0) {
      showToast('Geen doelen herkend', 'Er werden geen geldige doelen (CRS, SV, GEC, ..) gevonden in de tekst.', 'warning');
      return;
    }

    const availableItems = scanCurriculumGoals();
    if (availableItems.length === 0) {
      showToast('Geen doelenlijst geladen', 'De doelenlijst op ClassID is nog niet geladen of er is nog geen vak geselecteerd.', 'error');
      return;
    }

    const newlyChecked = [];
    const alreadyChecked = [];
    const notFound = [];
    let firstCheckedElement = null;

    extractedGoals.forEach(target => {
      const matcher = makeCodeMatcher(target.code);

      // Find all matches for this code
      const matchingItems = availableItems.filter(item => matcher.test(item.text));

      if (matchingItems.length === 0) {
        notFound.push(target);
        return;
      }

      // Prioritize item in the currently active/open accordion
      let bestItem = matchingItems.find(item => item.isOpen);
      if (!bestItem) {
        bestItem = matchingItems[0];
      }

      const didCheck = checkGoalItem(bestItem);
      if (didCheck) {
        newlyChecked.push({
          code: target.code,
          label: target.label,
          accordion: bestItem.accordionTitle
        });
      } else {
        alreadyChecked.push({
          code: target.code,
          label: target.label,
          accordion: bestItem.accordionTitle
        });
      }

      if (!firstCheckedElement && bestItem.pTag) {
        firstCheckedElement = bestItem.pTag;
      }
    });

    // Scroll to the first affected goal
    if (firstCheckedElement) {
      firstCheckedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Build user feedback
    const totalRecognized = extractedGoals.length;
    const totalSuccess = newlyChecked.length + alreadyChecked.length;

    let messageHtml = `<strong>${totalSuccess} van de ${totalRecognized} doelen geselecteerd</strong>`;
    if (newlyChecked.length > 0) {
      messageHtml += `<br>✨ ${newlyChecked.length} nieuw aangevinkt`;
    }
    if (alreadyChecked.length > 0) {
      messageHtml += `<br>ℹ️ ${alreadyChecked.length} stonden al aangevinkt`;
    }

    let listHtml = '';
    newlyChecked.forEach(item => {
      const subjectTag = item.accordion ? ` <em>(${item.accordion})</em>` : '';
      listHtml += `<li><strong style="color:#28c76f">✓ ${item.code}</strong>${subjectTag}</li>`;
    });
    alreadyChecked.forEach(item => {
      const subjectTag = item.accordion ? ` <em>(${item.accordion})</em>` : '';
      listHtml += `<li><strong style="color:#696cff">✓ ${item.code}</strong> <em>(was al actief)</em>${subjectTag}</li>`;
    });
    notFound.forEach(item => {
      listHtml += `<li><strong style="color:#ea5455">✗ ${item.code}</strong> <em>(niet gevonden in geladen vakken)</em></li>`;
    });

    const toastType = notFound.length > 0 ? (totalSuccess > 0 ? 'warning' : 'error') : 'success';
    showToast(
      totalSuccess > 0 ? '✅ Doelen succesvol aangevinkt!' : '⚠️ Geen doelen gevonden',
      `${messageHtml}<ul class="classid-toast-list">${listHtml}</ul>`,
      toastType,
      true // Show 'Opslaan' action button
    );
  }

  /**
   * Reads from clipboard and starts selection.
   */
  async function handleClipboardSelect() {
    let clipboardText = '';

    // Strategy A: Tampermonkey GM_getClipboard
    if (typeof GM_getClipboard === 'function') {
      try {
        clipboardText = GM_getClipboard();
      } catch (err) {
        console.warn('GM_getClipboard error:', err);
      }
    }

    // Strategy B: Navigator Clipboard API
    if (!clipboardText && navigator.clipboard && navigator.clipboard.readText) {
      try {
        clipboardText = await navigator.clipboard.readText();
      } catch (err) {
        console.warn('navigator.clipboard.readText error:', err);
      }
    }

    // If clipboard has text, parse and run
    if (clipboardText && clipboardText.trim()) {
      const goals = extractGoalCodes(clipboardText);
      if (goals.length > 0) {
        processGoalSelection(goals);
        return;
      }
    }

    // Fallback: If clipboard was empty or blocked, open manual paste modal
    openPasteModal(clipboardText || '');
  }

  // --- UI Toast & Modals ---

  /**
   * Displays an interactive toast notification.
   */
  function showToast(title, bodyHtml, type = 'success', showSaveButton = false) {
    const existing = document.querySelector('.classid-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `classid-toast ${type}`;
    toast.innerHTML = `
      <div class="classid-toast-header">
        <h5 class="classid-toast-title">${title}</h5>
        <button type="button" class="classid-modal-close" style="font-size:16px;">&times;</button>
      </div>
      <div class="classid-toast-body">${bodyHtml}</div>
      ${showSaveButton ? `
        <div class="classid-toast-actions">
          <button type="button" class="classid-btn-secondary classid-toast-close">Sluiten</button>
          <button type="button" class="classid-btn-action classid-toast-save" style="background:#28c76f;color:#fff;border-color:#28c76f;">
            💾 Direct Opslaan
          </button>
        </div>
      ` : ''}
    `;

    toast.querySelector('.classid-modal-close').addEventListener('click', () => toast.remove());
    if (showSaveButton) {
      toast.querySelector('.classid-toast-close').addEventListener('click', () => toast.remove());
      toast.querySelector('.classid-toast-save').addEventListener('click', () => {
        toast.remove();
        if (typeof pageWin.linkLessonSheet === 'function') {
          pageWin.linkLessonSheet();
        } else {
          const opslaanBtn = document.querySelector('button[onclick="linkLessonSheet()"]');
          if (opslaanBtn) opslaanBtn.click();
        }
      });
    }

    document.body.appendChild(toast);

    // Auto dismiss after 7 seconds unless it's an error
    if (type !== 'error') {
      setTimeout(() => {
        if (toast.isConnected) toast.remove();
      }, 7000);
    }
  }

  /**
   * Displays a manual paste modal with live detected goal preview chips.
   */
  function openPasteModal(initialText = '') {
    const existing = document.querySelector('.classid-modal-backdrop');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.className = 'classid-modal-backdrop';
    modal.innerHTML = `
      <div class="classid-modal-content">
        <div class="classid-modal-header">
          <h4 class="classid-modal-title">📋 Leerplandoelen Aanvinken</h4>
          <button type="button" class="classid-modal-close">&times;</button>
        </div>
        <div>
          <p style="font-size:13px; color:#697a8d; margin-bottom:8px;">
            Plak hier de tekst of markdown-selectie uit je lesplanning (bv. <code>* **CRS16:** ...</code> of <code>CRS16, CRS21</code>):
          </p>
          <textarea class="classid-modal-textarea" placeholder="Plak hier je planningstekst...">${initialText}</textarea>
        </div>
        <div>
          <div style="font-size:12px; font-weight:600; color:#566a7f; margin-bottom:5px;">
            Herkende doelen:
          </div>
          <div class="classid-preview-chips">
            <span style="font-size:12px; color:#a1acb8;">(Typ of plak tekst hierboven...)</span>
          </div>
        </div>
        <div class="classid-modal-footer">
          <button type="button" class="classid-btn-secondary classid-modal-cancel">Annuleren</button>
          <button type="button" class="classid-btn-action classid-modal-submit" style="background:#1c93ff;color:#fff;">
            ✓ Vink doelen aan
          </button>
        </div>
      </div>
    `;

    const textarea = modal.querySelector('.classid-modal-textarea');
    const chipsContainer = modal.querySelector('.classid-preview-chips');
    const submitBtn = modal.querySelector('.classid-modal-submit');

    function updatePreview() {
      const goals = extractGoalCodes(textarea.value);
      if (goals.length === 0) {
        chipsContainer.innerHTML = '<span style="font-size:12px; color:#a1acb8;">Geen geldige doelen herkend</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
      } else {
        chipsContainer.innerHTML = goals
          .map(g => `<span class="classid-chip">${g.code}</span>`)
          .join('');
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.textContent = `✓ Vink ${goals.length} ${goals.length === 1 ? 'doel' : 'doelen'} aan`;
      }
    }

    textarea.addEventListener('input', updatePreview);
    updatePreview();

    modal.querySelector('.classid-modal-close').addEventListener('click', () => modal.remove());
    modal.querySelector('.classid-modal-cancel').addEventListener('click', () => modal.remove());

    submitBtn.addEventListener('click', () => {
      const goals = extractGoalCodes(textarea.value);
      modal.remove();
      processGoalSelection(goals);
    });

    document.body.appendChild(modal);
    textarea.focus();
    if (textarea.value) {
      textarea.select();
    }
  }

  /**
   * Resets all checked checkboxes in #selectedCurriculum.
   */
  function resetAllChecked() {
    if (!confirm('Weet je zeker dat je alle geselecteerde doelen wilt uitvinken?')) {
      return;
    }
    const container = document.getElementById('selectedCurriculum');
    if (!container) return;

    const checkedBoxes = container.querySelectorAll('input[type="checkbox"]:checked');
    checkedBoxes.forEach(input => {
      input.click();
      if (input.checked) {
        input.checked = false;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      try {
        if (typeof pageWin.linkGoal === 'function') {
          pageWin.linkGoal(input);
        }
      } catch (e) {}
    });

    showToast('Selectie gewist', `${checkedBoxes.length} doelen uitgevinkt.`, 'warning');
  }

  // --- Button Injection ---

  function injectControls() {
    // 1. Inject Inline Toolbar next to 'Opslaan' button
    const opslaanBtn = document.querySelector('button[onclick="linkLessonSheet()"]');
    if (opslaanBtn && !document.getElementById('classid-autoselect-toolbar')) {
      const parentP = opslaanBtn.parentElement;
      const toolbar = document.createElement('span');
      toolbar.id = 'classid-autoselect-toolbar';
      toolbar.className = 'classid-inline-toolbar';
      toolbar.innerHTML = `
        <button type="button" class="classid-btn-action" id="classid-btn-clipboard" title="Lees gekopieerde doelen uit klembord en vink direct aan">
          📋 Vink doelen aan uit klembord
        </button>
        <button type="button" class="classid-btn-secondary" id="classid-btn-manual" title="Handmatig tekst of doelen plakken">
          ✏️ Plak tekst...
        </button>
        <button type="button" class="classid-btn-secondary" id="classid-btn-clear" title="Alle vinkjes wissen">
          🗑️ Wis selectie
        </button>
      `;

      toolbar.querySelector('#classid-btn-clipboard').addEventListener('click', handleClipboardSelect);
      toolbar.querySelector('#classid-btn-manual').addEventListener('click', () => openPasteModal());
      toolbar.querySelector('#classid-btn-clear').addEventListener('click', resetAllChecked);

      if (parentP) {
        parentP.appendChild(toolbar);
      }
    }

    // 2. Inject Floating Action Button (FAB)
    if (!document.getElementById('classid-autoselect-fab')) {
      const fabContainer = document.createElement('div');
      fabContainer.id = 'classid-autoselect-fab';
      fabContainer.className = 'classid-fab-container';
      fabContainer.innerHTML = `
        <button type="button" class="classid-fab-main" title="Vink doelen aan vanuit klembord (of klik om tekst te plakken)">
          <span>📋</span>
          <span>Doelen aanvinken</span>
        </button>
      `;

      fabContainer.querySelector('.classid-fab-main').addEventListener('click', handleClipboardSelect);
      document.body.appendChild(fabContainer);
    }
  }

  // Initialize and observe for DOM changes (AJAX re-renders)
  injectControls();
  const observer = new MutationObserver(() => {
    injectControls();
  });
  observer.observe(document.body, { childList: true, subtree: true });

  console.log('[ClassID Doelenverdeler] Userscript succesvol geladen.');
})();
