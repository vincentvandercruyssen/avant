/**
 * Avant Thema-overzicht (presentatieleidraad per leerling)
 * Leest versleutelde leerlingnamen (AES-256-GCM) en gebundelde rubriekdata.
 */
(() => {
  const DEFAULT_PASSPHRASE = 'avant2026';
  const CLUSTERS = [
    { id: '4.1', name: '4.1 Analyse & workflow' },
    { id: '4.2', name: '4.2 Design & lay-out' },
    { id: '4.3', name: '4.3 Multimediaproductie' },
    { id: '4.4', name: '4.4 Release & presentatie' },
    { id: '4.5', name: '4.5 Kwaliteit & context' },
    { id: '4.6', name: '4.6 Professionele competenties' }
  ];

  const state = {
    klas: '5CRM',
    thema: '',
    students: [],
    assignments: [],
    activeView: 'student', // 'student' | 'klas'
    activeStudentIndex: 0,
    onlyFinal: false
  };

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

  function base64ToUint8(str) {
    const bin = atob(str);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
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
          // Behoud fallback-label bij decryptiefout
        }
      }
    } catch (err) {
      console.warn('[ThemaOverzicht] Decryptie overgeslagen:', err);
    }

    return students;
  }

  function isFinalSubmission(sub) {
    const id = String(sub.id || '').toLowerCase();
    const title = String(sub.title || '').toLowerCase();
    if (id.includes('onderzoek') || id.includes('voorbereiding')) return false;
    if (title.includes('onderzoek') || title.includes('voorbereiding')) return false;
    return true;
  }

  function shortSubLabel(sub) {
    const id = String(sub.id || '').toLowerCase();
    if (id === 'oplevering') return 'Oplevering';
    if (id === 'onderzoek') return 'Onderzoek';
    if (id === 'voorbereiding') return 'Voorbereiding';
    return sub.title || sub.id;
  }

  function shortColSubLabel(sub) {
    const id = String(sub.id || '').toLowerCase();
    if (id === 'oplevering') return 'Opl.';
    if (id === 'onderzoek') return 'Ond.';
    if (id === 'voorbereiding') return 'Voorb.';
    return sub.title || sub.id;
  }

  function getScoreLevel(pct) {
    if (pct === null || Number.isNaN(pct)) return '';
    if (pct >= 90) return '3';
    if (pct >= 70) return '2';
    if (pct >= 50) return '1';
    return '0';
  }

  function formatNum(n) {
    if (n === null || n === undefined || Number.isNaN(n)) return '—';
    const rounded = Math.round(n * 10) / 10;
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1).replace('.', ',');
  }

  function getVisibleSubmissions(assignment) {
    const subs = assignment.submissions || [];
    return state.onlyFinal ? subs.filter(isFinalSubmission) : subs;
  }

  function getAllVisiblePairs() {
    const pairs = [];
    for (const a of state.assignments) {
      for (const sub of getVisibleSubmissions(a)) {
        pairs.push({ assignment: a, sub });
      }
    }
    return pairs;
  }

  function calcSubmissionStats(sub, hash) {
    const ev = sub.evaluations?.[hash];
    const scores = ev?.scores || {};
    const weight = Number(sub.weight) || 0;
    const activeClusterIds = (sub.clusters || []).map((c) => c.id);

    let sum = 0;
    let count = 0;
    for (const cid of activeClusterIds) {
      if (scores[cid] !== undefined && scores[cid] !== null) {
        sum += Number(scores[cid]);
        count++;
      }
    }

    if (count === 0 || weight <= 0) {
      return { avg: null, pct: null, level: '', scores, feedback: ev?.feedback || '', activeClusterIds };
    }

    const avg = sum / count;
    const pct = Math.round((avg / weight) * 100);
    return {
      avg,
      pct,
      level: getScoreLevel(pct),
      scores,
      feedback: ev?.feedback || '',
      activeClusterIds
    };
  }

  function calcStudentTotals(hash) {
    const clusterTotals = {};
    for (const c of CLUSTERS) {
      clusterTotals[c.id] = { earned: 0, max: 0 };
    }

    let totalEarned = 0;
    let totalMax = 0;

    for (const { sub } of getAllVisiblePairs()) {
      const weight = Number(sub.weight) || 0;
      const ev = sub.evaluations?.[hash];
      const scores = ev?.scores || {};
      for (const c of sub.clusters || []) {
        if (scores[c.id] !== undefined && scores[c.id] !== null && weight > 0) {
          const val = Number(scores[c.id]);
          if (clusterTotals[c.id]) {
            clusterTotals[c.id].earned += val;
            clusterTotals[c.id].max += weight;
          }
          totalEarned += val;
          totalMax += weight;
        }
      }
    }

    const overallPct = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : null;
    const clusterPcts = {};
    for (const c of CLUSTERS) {
      const t = clusterTotals[c.id];
      clusterPcts[c.id] = t.max > 0 ? Math.round((t.earned / t.max) * 100) : null;
    }

    return {
      overallPct,
      overallLevel: getScoreLevel(overallPct),
      clusterPcts
    };
  }

  function calcClassAveragePct() {
    let sum = 0;
    let count = 0;
    for (const s of state.students) {
      const t = calcStudentTotals(s.hash);
      if (t.overallPct !== null) {
        sum += t.overallPct;
        count++;
      }
    }
    return count > 0 ? Math.round(sum / count) : null;
  }

  function renderSidebar() {
    const nav = document.getElementById('ThemaNav');
    if (!nav) return;

    const classAvg = calcClassAveragePct();
    const classLevel = getScoreLevel(classAvg);

    const klasItem = `
      <ul>
        <li>
          <a href="#klas"${state.activeView === 'klas' ? ' aria-current="page"' : ''} data-view="klas">
            <span>Klasoverzicht</span>
            <strong${classLevel ? ` data-level="${classLevel}"` : ''}>${classAvg !== null ? `${classAvg}%` : '—'}</strong>
          </a>
        </li>
      </ul>
    `;

    const studentItems = state.students.map((s, idx) => {
      const t = calcStudentTotals(s.hash);
      const isActive = state.activeView === 'student' && state.activeStudentIndex === idx;
      return `
        <li>
          <a href="#${s.hash}"${isActive ? ' aria-current="page"' : ''} data-student-index="${idx}">
            <span>${escapeHtml(s.name)}</span>
            <strong${t.overallLevel ? ` data-level="${t.overallLevel}"` : ''}>${t.overallPct !== null ? `${t.overallPct}%` : '—'}</strong>
          </a>
        </li>
      `;
    }).join('');

    nav.innerHTML = `${klasItem}<ul>${studentItems}</ul>`;

    nav.querySelectorAll('a[data-view="klas"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openKlasView(true);
      });
    });

    nav.querySelectorAll('a[data-student-index]').forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        openStudentView(Number(a.dataset.studentIndex), true);
      });
    });
  }

  function renderStudentSelect() {
    const sel = document.getElementById('overzicht-student-select');
    if (!sel) return;

    const opts = [
      `<option value="klas"${state.activeView === 'klas' ? ' selected' : ''}>Klasoverzicht</option>`,
      ...state.students.map((s, idx) => {
        const selected = state.activeView === 'student' && state.activeStudentIndex === idx ? ' selected' : '';
        return `<option value="${idx}"${selected}>${escapeHtml(s.name)}</option>`;
      })
    ];
    sel.innerHTML = opts.join('');
  }

  function updateHeaderControls() {
    const heading = document.getElementById('overzicht-heading');
    const totalEl = document.getElementById('overzicht-total');
    const prevBtn = document.getElementById('overzicht-prev');
    const nextBtn = document.getElementById('overzicht-next');

    if (state.activeView === 'klas') {
      const avg = calcClassAveragePct();
      const lvl = getScoreLevel(avg);
      if (heading) heading.textContent = `Klasoverzicht · ${state.klas} ${state.thema}`;
      if (totalEl) {
        totalEl.hidden = avg === null;
        totalEl.textContent = avg !== null ? `Gem. ${avg}%` : '';
        if (lvl) totalEl.dataset.level = lvl;
        else delete totalEl.dataset.level;
      }
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = state.students.length === 0;
    } else {
      const student = state.students[state.activeStudentIndex];
      const totals = student ? calcStudentTotals(student.hash) : null;
      if (heading) heading.textContent = student ? student.name : `${state.klas} · ${state.thema}`;
      if (totalEl) {
        if (totals && totals.overallPct !== null) {
          totalEl.hidden = false;
          totalEl.textContent = `${totals.overallPct}%`;
          totalEl.dataset.level = totals.overallLevel;
        } else {
          totalEl.hidden = true;
        }
      }
      if (prevBtn) prevBtn.disabled = state.activeStudentIndex <= 0;
      if (nextBtn) nextBtn.disabled = state.activeStudentIndex >= state.students.length - 1;
    }
  }

  function renderStudentView() {
    const container = document.getElementById('overzicht-content');
    const student = state.students[state.activeStudentIndex];
    if (!container || !student) return;

    const pairs = getAllVisiblePairs();
    const totals = calcStudentTotals(student.hash);

    // 1. Compacte puntentabel
    const clusterHeaders = CLUSTERS.map((c) => `<th title="${escapeHtml(c.name)}">${c.id}</th>`).join('');
    const rowsHtml = pairs.map(({ assignment, sub }) => {
      const st = calcSubmissionStats(sub, student.hash);
      const isFinal = isFinalSubmission(sub);
      const anchorId = `fb-${assignment.slug}-${sub.id}`;

      const clusterCells = CLUSTERS.map((c) => {
        if (!st.activeClusterIds.includes(c.id)) {
          return '<td data-empty>—</td>';
        }
        const val = st.scores[c.id];
        if (val === undefined || val === null) {
          return '<td data-empty>—</td>';
        }
        const cellPct = sub.weight > 0 ? Math.round((Number(val) / Number(sub.weight)) * 100) : null;
        const lvl = getScoreLevel(cellPct);
        return `<td${lvl ? ` data-level="${lvl}"` : ''}>${formatNum(Number(val))}</td>`;
      }).join('');

      return `
        <tr data-kind="${isFinal ? 'oplevering' : 'proces'}" data-clickable data-target="${anchorId}">
          <td><strong>${escapeHtml(assignment.title)}</strong><small>${escapeHtml(shortSubLabel(sub))}</small></td>
          <td>/${sub.weight}</td>
          ${clusterCells}
          <td>${formatNum(st.avg)}</td>
          <td${st.level ? ` data-level="${st.level}"` : ''}>${st.pct !== null ? `${st.pct}%` : '—'}</td>
        </tr>
      `;
    }).join('');

    const footClusterCells = CLUSTERS.map((c) => {
      const pct = totals.clusterPcts[c.id];
      if (pct === null) return '<td data-empty>—</td>';
      return `<td data-level="${getScoreLevel(pct)}">${pct}%</td>`;
    }).join('');

    const tableHtml = `
      <div data-scroll-table>
        <table>
          <thead>
            <tr>
              <th>Opdracht</th>
              <th>Max</th>
              ${clusterHeaders}
              <th>Gem.</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
          <tfoot>
            <tr>
              <td>Totaal ${state.onlyFinal ? '(opleveringen)' : '(gewogen)'}</td>
              <td></td>
              ${footClusterCells}
              <td></td>
              <td${totals.overallLevel ? ` data-level="${totals.overallLevel}"` : ''}>${totals.overallPct !== null ? `${totals.overallPct}%` : '—'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    // 2. Feedback per opdracht
    const feedbackSections = state.assignments.map((assignment) => {
      const subs = getVisibleSubmissions(assignment);
      if (subs.length === 0) return '';

      const subBlocks = subs.map((sub) => {
        const st = calcSubmissionStats(sub, student.hash);
        const isFinal = isFinalSubmission(sub);
        const anchorId = `fb-${assignment.slug}-${sub.id}`;
        const rubriekHref = assignment.puntenverdelingUrl
          ? `${assignment.puntenverdelingUrl}#${encodeURIComponent(sub.id)}/${encodeURIComponent(student.hash)}`
          : '';
        const deadlineStr = sub.deadline ? `<small>${escapeHtml(sub.deadline)}</small>` : '';
        const scoreText = st.avg !== null
          ? `<strong data-level="${st.level}">${formatNum(st.avg)} / ${sub.weight} · ${st.pct}%</strong>`
          : '<strong>—</strong>';
        const rubriekLink = rubriekHref
          ? `<a href="${rubriekHref}" target="_blank" rel="noopener">Rubriek ↗</a>`
          : '';
        const fbHtml = st.feedback.trim()
          ? `<p>${escapeHtml(st.feedback.trim())}</p>`
          : '<p><em>Geen feedback ingevuld.</em></p>';

        return `
          <article id="${anchorId}" data-indiening data-kind="${isFinal ? 'oplevering' : 'proces'}"${st.level ? ` data-level="${st.level}"` : ''}>
            <div>
              <h3>${escapeHtml(shortSubLabel(sub))}${deadlineStr}</h3>
              <span>${scoreText}${rubriekLink}</span>
            </div>
            ${fbHtml}
          </article>
        `;
      }).join('');

      return `
        <section data-opdracht>
          <h2>${escapeHtml(assignment.title)} <small>${escapeHtml(assignment.vakLabel)}</small></h2>
          ${subBlocks}
        </section>
      `;
    }).join('');

    container.innerHTML = tableHtml + feedbackSections;

    container.querySelectorAll('tr[data-target]').forEach((row) => {
      row.addEventListener('click', () => {
        const target = document.getElementById(row.dataset.target);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderKlasView() {
    const container = document.getElementById('overzicht-content');
    if (!container) return;

    const pairs = getAllVisiblePairs();

    const headers = pairs.map(({ assignment, sub }) => {
      const subLbl = state.onlyFinal ? '' : `<small>${escapeHtml(shortColSubLabel(sub))}</small>`;
      return `<th title="${escapeHtml(`${assignment.title} — ${sub.title}`)}">${escapeHtml(assignment.title)}${subLbl}</th>`;
    }).join('');

    const colSums = pairs.map(() => ({ sum: 0, count: 0 }));

    const rows = state.students.map((s, idx) => {
      const totals = calcStudentTotals(s.hash);
      const cells = pairs.map(({ sub }, colIdx) => {
        const st = calcSubmissionStats(sub, s.hash);
        if (st.pct === null) return '<td data-empty>—</td>';
        colSums[colIdx].sum += st.pct;
        colSums[colIdx].count++;
        return `<td data-level="${st.level}" title="${formatNum(st.avg)} / ${sub.weight}">${st.pct}%</td>`;
      }).join('');

      return `
        <tr data-clickable data-student-index="${idx}">
          <td>${escapeHtml(s.name)}</td>
          ${cells}
          <td${totals.overallLevel ? ` data-level="${totals.overallLevel}"` : ''}>${totals.overallPct !== null ? `${totals.overallPct}%` : '—'}</td>
        </tr>
      `;
    }).join('');

    const avgCells = colSums.map((c) => {
      if (c.count === 0) return '<td data-empty>—</td>';
      const pct = Math.round(c.sum / c.count);
      return `<td data-level="${getScoreLevel(pct)}">${pct}%</td>`;
    }).join('');

    const classAvg = calcClassAveragePct();
    const classLvl = getScoreLevel(classAvg);

    container.innerHTML = `
      <div data-scroll-table>
        <table data-klas-tabel>
          <thead>
            <tr>
              <th>Leerling</th>
              ${headers}
              <th>Totaal</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
          <tfoot>
            <tr>
              <td>Klasgemiddelde</td>
              ${avgCells}
              <td${classLvl ? ` data-level="${classLvl}"` : ''}>${classAvg !== null ? `${classAvg}%` : '—'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    `;

    container.querySelectorAll('tr[data-student-index]').forEach((row) => {
      row.addEventListener('click', () => {
        openStudentView(Number(row.dataset.studentIndex), true);
      });
    });
  }

  function renderAll() {
    renderSidebar();
    renderStudentSelect();
    updateHeaderControls();
    if (state.activeView === 'klas') {
      renderKlasView();
    } else {
      renderStudentView();
    }
  }

  function openStudentView(index, pushHash = false) {
    if (index < 0 || index >= state.students.length) return;
    state.activeView = 'student';
    state.activeStudentIndex = index;
    if (pushHash) {
      history.replaceState(null, '', `#${state.students[index].hash}`);
    }
    renderAll();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openKlasView(pushHash = false) {
    state.activeView = 'klas';
    if (pushHash) {
      history.replaceState(null, '', '#klas');
    }
    renderAll();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function applyHashRoute() {
    const raw = (window.location.hash || '').replace(/^#/, '').trim();
    if (raw === 'klas') {
      state.activeView = 'klas';
      return;
    }
    if (raw) {
      const idx = state.students.findIndex((s) => s.hash === raw);
      if (idx !== -1) {
        state.activeView = 'student';
        state.activeStudentIndex = idx;
        return;
      }
    }
    state.activeView = 'student';
    state.activeStudentIndex = 0;
  }

  async function init() {
    const root = document.querySelector('[data-thema-overzicht]');
    if (!root) return;

    state.klas = root.dataset.klas || '5CRM';
    state.thema = root.dataset.thema || '';

    const encData = safeParseJson(document.getElementById('thema-encrypted-students'));
    const assignments = safeParseJson(document.getElementById('thema-assignments-data'));

    state.assignments = Array.isArray(assignments) ? assignments : [];
    state.students = await decryptStudents(encData, state.klas);

    applyHashRoute();
    renderAll();

    document.getElementById('overzicht-only-final')?.addEventListener('change', (e) => {
      state.onlyFinal = Boolean(e.target.checked);
      renderAll();
    });

    document.getElementById('overzicht-prev')?.addEventListener('click', () => {
      if (state.activeView === 'student' && state.activeStudentIndex > 0) {
        openStudentView(state.activeStudentIndex - 1, true);
      }
    });

    document.getElementById('overzicht-next')?.addEventListener('click', () => {
      if (state.activeView === 'klas' && state.students.length > 0) {
        openStudentView(0, true);
      } else if (state.activeView === 'student' && state.activeStudentIndex < state.students.length - 1) {
        openStudentView(state.activeStudentIndex + 1, true);
      }
    });

    document.getElementById('overzicht-student-select')?.addEventListener('change', (e) => {
      if (e.target.value === 'klas') {
        openKlasView(true);
      } else {
        openStudentView(Number(e.target.value), true);
      }
    });

    document.getElementById('overzicht-print')?.addEventListener('click', () => {
      window.print();
    });

    window.addEventListener('keydown', (e) => {
      if (['input', 'textarea', 'select'].includes(document.activeElement?.tagName?.toLowerCase())) return;
      if (e.key === 'ArrowLeft' && state.activeView === 'student' && state.activeStudentIndex > 0) {
        e.preventDefault();
        openStudentView(state.activeStudentIndex - 1, true);
      } else if (e.key === 'ArrowRight') {
        if (state.activeView === 'klas' && state.students.length > 0) {
          e.preventDefault();
          openStudentView(0, true);
        } else if (state.activeView === 'student' && state.activeStudentIndex < state.students.length - 1) {
          e.preventDefault();
          openStudentView(state.activeStudentIndex + 1, true);
        }
      }
    });

    window.addEventListener('hashchange', () => {
      applyHashRoute();
      renderAll();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
