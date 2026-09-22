/* ==========================================================================
   course.js
   Central rendering logic: the flat lesson index, sidebar navigation tree,
   breadcrumbs, lesson & practice page assembly, and the Home / Glossary /
   Bookmarks / Notes / Course Map / Completion pages.
   ========================================================================== */

(function (global) {
  const CD = global.COURSE_DATA;
  const PARTS = CD.parts;
  const esc = MD.escapeHtml;

  const ICONS = {
    check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    circle: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.8"/></svg>',
    current: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="5" fill="currentColor"/></svg>',
    bookmark: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12v16l-6-4-6 4V4Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    bookmarkSm: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12v18l-6-4.2L6 21V3Z"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" stroke="currentColor" stroke-width="1.6"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h14v16H5z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  };

  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // ---- Flat lesson index -----------------------------------------------------
  const LESSON_INDEX = [];
  PARTS.forEach((part) => {
    part.sections.forEach((sec) => {
      LESSON_INDEX.push({
        refId: sec.id, kind: "lesson", partNumber: part.number, partId: part.id,
        partTitle: part.title, number: sec.number, title: sec.title,
      });
    });
    LESSON_INDEX.push({
      refId: `${part.id}-practice`, kind: "practice", partNumber: part.number, partId: part.id,
      partTitle: part.title, number: null, title: "Practice",
    });
  });
  const INDEX_BY_REF = new Map(LESSON_INDEX.map((e, i) => [e.refId, { ...e, pos: i }]));

  function findLessonEntry(refId) { return INDEX_BY_REF.get(refId) || null; }
  function totalLessonCount() { return LESSON_INDEX.length; }
  function getNextRef(refId) {
    const e = INDEX_BY_REF.get(refId);
    if (!e) return null;
    return LESSON_INDEX[e.pos + 1] || null;
  }
  function getPart(number) { return PARTS.find((p) => p.number === number); }
  function findSectionByRef(refId) {
    for (const part of PARTS) {
      const sec = part.sections.find((s) => s.id === refId);
      if (sec) return { part, section: sec };
    }
    return null;
  }
  function getPartByPracticeRef(refId) {
    const partId = refId.replace(/-practice$/, "");
    return PARTS.find((p) => p.id === partId);
  }
  function partLessonRefs(part) {
    return part.sections.map((s) => s.id).concat([`${part.id}-practice`]);
  }
  function isPartDone(part) {
    return partLessonRefs(part).every((r) => global.Progress.isCompleted(r));
  }
  function firstIncompleteRef() {
    const found = LESSON_INDEX.find((e) => !global.Progress.isCompleted(e.refId));
    return found || LESSON_INDEX[0];
  }

  // ---- Sidebar open/close state (in-memory only) -----------------------------
  const openParts = new Set();
  function ensureOpen(partId) { openParts.add(partId); }
  function togglePartOpen(partId) {
    if (openParts.has(partId)) openParts.delete(partId);
    else openParts.add(partId);
  }

  // ---- Sidebar tree -----------------------------------------------------------
  function lessonRow(refId, label, currentRefId, isPractice) {
    const done = global.Progress.isCompleted(refId);
    const current = refId === currentRefId;
    const icon = done ? ICONS.check : current ? ICONS.current : ICONS.circle;
    return `<li><button class="tree-lesson-link ${done ? "done" : ""} ${current ? "current" : ""} ${isPractice ? "practice" : ""}" data-goto-lesson="${refId}">
      <span class="tree-lesson-icon">${icon}</span><span class="tree-lesson-text">${esc(label)}</span>
    </button></li>`;
  }

  function buildSidebarTree(currentRefId) {
    return PARTS.map((part) => {
      const refs = partLessonRefs(part);
      const doneCount = refs.filter((r) => global.Progress.isCompleted(r)).length;
      const total = refs.length;
      const allDone = doneCount === total;
      const statusClass = allDone ? "done" : doneCount > 0 ? "progress" : "todo";
      const isOpen = openParts.has(part.id);
      const lessonsHtml =
        part.sections.map((sec) => lessonRow(sec.id, `${sec.number} ${sec.title}`, currentRefId, false)).join("") +
        lessonRow(`${part.id}-practice`, "Practice: Knowledge Check", currentRefId, true);
      return `
        <div class="tree-part ${isOpen ? "open" : ""}">
          <button class="tree-part-header" data-part-toggle="${part.id}">
            <svg class="chev" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <span class="tree-part-status ${statusClass}">${allDone ? ICONS.check : ""}</span>
            <span class="tree-part-title">Part ${part.number} — ${esc(part.title)}</span>
            <span class="tree-part-frac">${doneCount}/${total}</span>
          </button>
          <ul class="tree-lessons">${lessonsHtml}</ul>
        </div>`;
    }).join("");
  }

  function refreshSidebar(currentRefId) {
    const treeEl = document.getElementById("sidebar-tree");
    if (treeEl) treeEl.innerHTML = buildSidebarTree(currentRefId);
    const { completed, total, pct } = global.Progress.computeOverall(totalLessonCount());
    const fill = document.getElementById("sidebar-progress-fill");
    const pctEl = document.getElementById("sidebar-progress-pct");
    const subEl = document.getElementById("sidebar-progress-sub");
    const bar = document.getElementById("sidebar-progress-bar");
    if (fill) fill.style.width = pct + "%";
    if (pctEl) pctEl.textContent = pct + "%";
    if (subEl) subEl.textContent = `${completed} / ${total} lessons completed`;
    if (bar) bar.setAttribute("aria-valuenow", String(pct));
  }

  // ---- Breadcrumb ---------------------------------------------------------------
  function buildBreadcrumb(view, refId) {
    const home = `<a href="#/home">Cloud Computing</a>`;
    const sep = `<span class="crumb-sep">/</span>`;
    const map = { glossary: "Glossary", bookmarks: "Bookmarks", notes: "My Notes", map: "Course Map", complete: "Course Complete" };
    if (view === "home") return `<span class="crumb-current">Home</span>`;
    if (map[view]) return `${home}${sep}<span class="crumb-current">${map[view]}</span>`;
    if (view === "lesson" || view === "practice") {
      const entry = findLessonEntry(refId);
      if (!entry) return `${home}`;
      const label = entry.kind === "practice" ? "Practice" : `${entry.number} ${entry.title}`;
      return `${home}${sep}<a href="#" data-goto-part="${entry.partNumber}">Part ${entry.partNumber}</a>${sep}<span class="crumb-current">${esc(label)}</span>`;
    }
    return home;
  }

  // ---- Glossary term linking inside rendered lesson HTML ------------------------
  function linkGlossaryTerms(containerEl) {
    if (!containerEl || !global.Glossary) return [];
    const terms = global.Glossary.byLengthDesc;
    const used = new Set();
    const SKIP_TAGS = new Set(["CODE", "PRE", "H4", "H5", "SCRIPT", "STYLE"]);

    const walker = document.createTreeWalker(containerEl, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        let p = node.parentElement;
        while (p && p !== containerEl) {
          if (SKIP_TAGS.has(p.tagName) || p.classList.contains("explain-block-label") || p.classList.contains("term-link")) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentElement;
        }
        return node.nodeValue && node.nodeValue.trim().length >= 3 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });

    const nodes = [];
    let n;
    while ((n = walker.nextNode())) nodes.push(n);

    for (const node of nodes) {
      const text = node.nodeValue;
      for (const g of terms) {
        if (used.has(g.term)) continue;
        let re;
        try { re = new RegExp(`\\b(${escRe(g.term)})\\b`, "i"); } catch (e) { continue; }
        const m = text.match(re);
        if (m) {
          const idx = m.index;
          const before = text.slice(0, idx);
          const matchText = m[0];
          const after = text.slice(idx + matchText.length);
          const span = document.createElement("span");
          span.className = "term-link";
          span.setAttribute("data-term", g.term);
          span.textContent = matchText;
          const parent = node.parentNode;
          parent.insertBefore(document.createTextNode(before), node);
          parent.insertBefore(span, node);
          parent.insertBefore(document.createTextNode(after), node);
          parent.removeChild(node);
          used.add(g.term);
          break;
        }
      }
    }
    return Array.from(used);
  }

  // ---- Lesson (content section) view ---------------------------------------------
  let _lastHeadings = [];
  let _lastMatchedTerms = [];
  let _lastRenderedRef = null;

  function renderLessonView(refId) {
    const found = findSectionByRef(refId);
    if (!found) return `<div class="prose-col"><p>Lesson not found.</p></div>`;
    const { part, section } = found;
    const isFirstOfPart = part.sections[0].id === refId;
    const { html, headings } = MD.renderLessonBody(section.markdown);
    _lastHeadings = headings;
    _lastRenderedRef = refId;

    let widgetHtml = "";
    if (part.number === 3 && section.number === "3.1") widgetHtml = global.Timeline.renderStackWidget();
    if (part.number === 1 && section.number === "1.2") widgetHtml = global.Timeline.renderBeforeAfter();

    const objectivesHtml = isFirstOfPart
      ? `<div class="objectives-card">
          <h4>${ICONS.target}Learning Objectives for Part ${part.number}</h4>
          ${MD.renderList(part.objectives)}
        </div>`
      : "";

    const bookmarked = global.Bookmarks.isLesson(refId);
    const isDone = global.Progress.isCompleted(refId);
    const nextRef = getNextRef(refId);

    return `
      <div class="prose-col view-enter">
        <div class="lesson-kicker"><span class="part-tag">PART ${part.number} · ${esc(part.title).toUpperCase()}</span></div>
        <h1 class="lesson-title">${esc(section.number)} ${esc(section.title)}</h1>
        <div class="lesson-meta-row">
          <span class="badge badge-neutral">Section ${esc(section.number)}</span>
          <span class="badge badge-primary">${esc(part.coreQuestion)}</span>
          <button class="bookmark-toggle ${bookmarked ? "active" : ""}" data-bookmark-lesson="${refId}">${ICONS.bookmark}<span>${bookmarked ? "Bookmarked" : "Bookmark"}</span></button>
        </div>
        ${objectivesHtml}
        <div class="lesson-body" id="lesson-body-content">${html}</div>
        ${widgetHtml}
        <div class="lesson-footer">
          <div class="lesson-footer-actions">
            <button class="btn ${isDone ? "btn-success" : "btn-secondary"} complete-toggle ${isDone ? "is-done" : ""}" data-mark-complete="${refId}">
              ${isDone ? ICONS.check + " Completed" : "Mark as complete"}
            </button>
            ${nextRef
              ? `<button class="btn btn-primary next-lesson-btn" data-goto-lesson="${nextRef.refId}"><span class="nl-label">Next</span><span>${nextRef.kind === "practice" ? "Practice: Knowledge Check" : `${nextRef.number} ${esc(nextRef.title)}`} →</span></button>`
              : ""}
          </div>
        </div>
      </div>`;
  }

  // ---- Practice view ----------------------------------------------------------------
  function renderPracticeView(refId) {
    const part = getPartByPracticeRef(refId);
    if (!part) return `<div class="prose-col"><p>Practice not found.</p></div>`;
    _lastHeadings = [];
    _lastRenderedRef = refId;
    const bookmarked = global.Bookmarks.isLesson(refId);
    const isDone = global.Progress.isCompleted(refId);
    const nextRef = getNextRef(refId);

    return `
      <div class="prose-col view-enter" style="max-width:900px;">
        <div class="lesson-kicker"><span class="part-tag">PART ${part.number} · ${esc(part.title).toUpperCase()}</span></div>
        <h1 class="lesson-title">Practice: Knowledge Check &amp; Exercises</h1>
        <div class="lesson-meta-row">
          <span class="badge badge-info">6 practice components</span>
          <button class="bookmark-toggle ${bookmarked ? "active" : ""}" data-bookmark-lesson="${refId}">${ICONS.bookmark}<span>${bookmarked ? "Bookmarked" : "Bookmark"}</span></button>
        </div>
        ${global.Quiz.renderPractice(part)}
        <div class="lesson-footer">
          <div class="lesson-footer-actions">
            <button class="btn ${isDone ? "btn-success" : "btn-secondary"} complete-toggle ${isDone ? "is-done" : ""}" data-mark-complete="${refId}">
              ${isDone ? ICONS.check + " Completed" : "Mark as complete"}
            </button>
            ${nextRef
              ? `<button class="btn btn-primary next-lesson-btn" data-goto-lesson="${nextRef.refId}"><span class="nl-label">Next</span><span>${nextRef.kind === "practice" ? "Practice: Knowledge Check" : `${nextRef.number} ${esc(nextRef.title)}`} →</span></button>`
              : `<button class="btn btn-primary" data-nav="#/complete">View Course Completion 🎉</button>`}
          </div>
        </div>
      </div>`;
  }

  // ---- Context (right) panel ------------------------------------------------------
  function renderContextPanel(refId) {
    const entry = findLessonEntry(refId);
    if (!entry) return "";
    const noteText = global.Notes.get(refId);
    const bookmarked = global.Bookmarks.isLesson(refId);
    let tocHtml = "";

    if (entry.kind === "lesson" && refId === _lastRenderedRef && _lastHeadings.length) {
      tocHtml += `<div class="ctx-block"><div class="ctx-title">On This Page</div><ul class="ctx-toc">${_lastHeadings.map((h) => `<li><a href="#" data-scroll-to="${h.id}">${esc(h.text)}</a></li>`).join("")}</ul></div>`;
    } else if (entry.kind === "practice") {
      const items = [
        ["quick-questions", "Quick Questions"], ["mcq-section", "Multiple Choice"],
        ["understanding-section", "Understanding"], ["comparison-section", "Comparison"],
        ["scenario-section", "Scenario-Based"], ["exercises-section", "Exercises"],
      ];
      tocHtml += `<div class="ctx-block"><div class="ctx-title">On This Page</div><ul class="ctx-toc">${items.map(([id, label]) => `<li><a href="#" data-scroll-to="${id}">${label}</a></li>`).join("")}</ul></div>`;
    }

    if (entry.kind === "lesson" && _lastMatchedTerms.length) {
      tocHtml += `<div class="ctx-block"><div class="ctx-title">Key Terms</div><div class="ctx-terms">${_lastMatchedTerms.map((t) => `<button class="ctx-term-chip" data-term="${esc(t)}">${esc(t)}</button>`).join("")}</div></div>`;
    }

    return `
      ${tocHtml}
      <div class="ctx-block ctx-notes">
        <div class="ctx-title">My Notes</div>
        <textarea data-notes-input="${refId}" placeholder="Jot down anything worth remembering…">${esc(noteText)}</textarea>
        <div class="ctx-notes-status" data-notes-status></div>
      </div>
      <div class="ctx-block">
        <button class="btn btn-secondary ctx-bookmark-btn" data-bookmark-lesson="${refId}">${bookmarked ? "★ Bookmarked" : "☆ Bookmark this lesson"}</button>
      </div>`;
  }

  function setMatchedTerms(terms) { _lastMatchedTerms = terms || []; }

  // ---- Home dashboard ------------------------------------------------------------
  function renderHome() {
    const total = totalLessonCount();
    const completed = LESSON_INDEX.filter((e) => global.Progress.isCompleted(e.refId)).length;
    const pct = total ? Math.round((completed / total) * 100) : 0;

    let continueEntry = null;
    const currentRef = global.Progress.getCurrent();
    if (currentRef) continueEntry = findLessonEntry(currentRef);
    if (!continueEntry) continueEntry = firstIncompleteRef();

    let quizzesDone = 0;
    PARTS.forEach((p) => {
      const q = global.Progress.getQuizState(p.id);
      if (q.attempted && Object.keys(q.answers).length === p.practice.mcq.length) quizzesDone++;
    });

    const bookmarkedLessons = global.Bookmarks.getLessons()
      .map((refId) => findLessonEntry(refId))
      .filter(Boolean)
      .slice(0, 4);

    return `
      <div class="wide-col view-enter">
        <div class="hero-card">
          <div class="hero-eyebrow">INTERACTIVE COURSE</div>
          <h1>${esc(CD.title)}</h1>
          <p class="lead">${esc(CD.tagline)}</p>
          <div class="hero-actions">
            <button class="btn btn-primary" data-goto-lesson="${continueEntry.refId}">Continue Learning →</button>
            <button class="btn btn-secondary" data-nav="#/map">View Course Map</button>
          </div>
        </div>

        <div class="stat-grid">
          <div class="stat-card"><div class="stat-num">${pct}%</div><div class="stat-label">Course progress</div></div>
          <div class="stat-card"><div class="stat-num">${completed}/${total}</div><div class="stat-label">Lessons completed</div></div>
          <div class="stat-card"><div class="stat-num">${quizzesDone}/${PARTS.length}</div><div class="stat-label">Knowledge checks done</div></div>
          <div class="stat-card"><div class="stat-num">${global.Bookmarks.count()}</div><div class="stat-label">Bookmarks saved</div></div>
        </div>

        <div class="continue-card">
          <div class="continue-icon">${ICONS.book}</div>
          <div class="continue-body">
            <div class="continue-eyebrow">Continue where you left off</div>
            <div class="continue-title">Part ${continueEntry.partNumber} · ${esc(continueEntry.kind === "practice" ? "Practice — Knowledge Check" : `${continueEntry.number} ${continueEntry.title}`)}</div>
          </div>
          <button class="btn btn-primary" data-goto-lesson="${continueEntry.refId}">Continue →</button>
        </div>

        <div class="home-grid">
          <div>
            <div class="section-heading"><h2>Course Journey</h2><a class="see-all" href="#" data-nav="#/map">Full map →</a></div>
            ${global.Timeline.renderJourneyTimeline(continueEntry.partNumber, isPartDone)}
          </div>
          <div>
            <div class="section-heading"><h2>Bookmarks</h2><a class="see-all" href="#" data-nav="#/bookmarks">See all →</a></div>
            ${bookmarkedLessons.length
              ? `<div class="bookmark-mini-list">${bookmarkedLessons.map((l) => `<button class="bookmark-mini" data-goto-lesson="${l.refId}">${ICONS.bookmarkSm}<span>Part ${l.partNumber} · ${esc(l.kind === "practice" ? "Practice" : l.title)}</span></button>`).join("")}</div>`
              : `<p class="ctx-empty">Bookmark a lesson to find it here quickly.</p>`}
          </div>
        </div>
      </div>`;
  }

  // ---- Glossary / Map / Bookmarks / Notes / Completion pages -----------------------
  function renderGlossaryPage(query) {
    return `<div class="wide-col view-enter">
      <h1>Glossary</h1>
      <p style="color:var(--text-muted);margin-top:-12px;">Key terms from across the course, A to Z. Tap a card to flip it.</p>
      ${global.Glossary.renderPage(query)}
    </div>`;
  }

  function renderMapPage() {
    const currentRef = global.Progress.getCurrent();
    const entry = currentRef && findLessonEntry(currentRef);
    const currentPartNumber = entry ? entry.partNumber : 1;
    return `<div class="wide-col view-enter">
      <h1>Course Map</h1>
      <p style="color:var(--text-muted);margin-top:-12px;">How the eight Parts build on each other — from foundations to a full cloud adoption journey.</p>
      ${global.Timeline.renderConceptMap(currentPartNumber, isPartDone)}
    </div>`;
  }

  function emptyState(icon, title, body) {
    return `<div class="empty-state">${icon}<h3>${esc(title)}</h3><p>${esc(body)}</p></div>`;
  }

  function renderBookmarksPage() {
    const lessonRefs = global.Bookmarks.getLessons();
    const termNames = global.Bookmarks.getTerms();
    let html = `<div class="wide-col view-enter"><h1>Bookmarks</h1>`;

    if (!lessonRefs.length && !termNames.length) {
      html += emptyState(ICONS.bookmark, "No bookmarks yet", "Bookmark lessons or glossary terms while studying to find them here.");
      html += `</div>`;
      return html;
    }

    if (lessonRefs.length) {
      html += `<h3 style="margin-bottom:var(--sp-4);">Lessons</h3>`;
      html += lessonRefs
        .map((refId) => {
          const entry = findLessonEntry(refId);
          if (!entry) return "";
          const label = entry.kind === "practice" ? "Practice — Knowledge Check" : `${entry.number} ${entry.title}`;
          return `<div class="list-card" data-goto-lesson="${refId}">
            <div class="list-card-icon">${ICONS.book}</div>
            <div class="list-card-body"><div class="list-card-title">${esc(label)}</div><div class="list-card-sub">Part ${entry.partNumber} · ${esc(entry.partTitle)}</div></div>
            <button class="icon-btn list-card-remove" data-bookmark-lesson="${refId}" aria-label="Remove bookmark">${ICONS.close}</button>
          </div>`;
        })
        .join("");
    }

    if (termNames.length) {
      html += `<h3 style="margin:var(--sp-8) 0 var(--sp-4);">Glossary Terms</h3>`;
      html += termNames
        .map((term) => {
          const g = global.Glossary.getByTerm(term);
          if (!g) return "";
          return `<div class="list-card" data-term="${esc(term)}">
            <div class="list-card-icon">${ICONS.bookmark}</div>
            <div class="list-card-body"><div class="list-card-title">${esc(term)}</div><div class="list-card-sub">${esc(g.definition.slice(0, 100))}</div></div>
            <button class="icon-btn list-card-remove" data-toggle-term-bookmark="${esc(term)}" aria-label="Remove bookmark">${ICONS.close}</button>
          </div>`;
        })
        .join("");
    }

    html += `</div>`;
    return html;
  }

  function renderNotesPage() {
    const all = global.Notes.getAll();
    let html = `<div class="wide-col view-enter"><h1>My Notes</h1>`;
    if (!all.length) {
      html += emptyState(ICONS.note, "No notes yet", "Add notes while studying a lesson using the panel on the right — they'll show up here.");
      html += `</div>`;
      return html;
    }
    html += all
      .map((n) => {
        const entry = findLessonEntry(n.refId);
        if (!entry) return "";
        const label = entry.kind === "practice" ? "Practice — Knowledge Check" : `${entry.number} ${entry.title}`;
        return `<div class="list-card" data-goto-lesson="${n.refId}" style="align-items:flex-start;">
          <div class="list-card-icon">${ICONS.note}</div>
          <div class="list-card-body">
            <div class="list-card-title">${esc(label)}</div>
            <div class="list-card-sub">Part ${entry.partNumber} · ${esc(entry.partTitle)}</div>
            <div class="list-card-note">${esc(n.text)}</div>
          </div>
        </div>`;
      })
      .join("");
    html += `</div>`;
    return html;
  }

  function renderCompletionPage() {
    const completed = LESSON_INDEX.filter((e) => global.Progress.isCompleted(e.refId)).length;
    return `<div class="prose-col view-enter" style="text-align:center;padding-top:var(--sp-10);">
      <div style="font-size:56px;line-height:1;">🎓</div>
      <h1>Course Complete</h1>
      <p style="color:var(--text-muted);">You've completed ${completed} of ${totalLessonCount()} lessons across all eight Parts.</p>
      <div class="lesson-body" style="text-align:left;margin-top:var(--sp-8);">${MD.renderSnippet(CD.completion)}</div>
      <div style="margin-top:var(--sp-8);"><button class="btn btn-primary" data-nav="#/home">Back to Home</button></div>
    </div>`;
  }

  global.Course = {
    LESSON_INDEX,
    ICONS,
    findLessonEntry, totalLessonCount, getNextRef, getPart, findSectionByRef,
    getPartByPracticeRef, partLessonRefs, isPartDone, firstIncompleteRef,
    ensureOpen, togglePartOpen,
    buildSidebarTree, refreshSidebar, buildBreadcrumb,
    linkGlossaryTerms, setMatchedTerms,
    renderLessonView, renderPracticeView, renderContextPanel,
    renderHome, renderGlossaryPage, renderMapPage, renderBookmarksPage, renderNotesPage, renderCompletionPage,
  };
})(window);
