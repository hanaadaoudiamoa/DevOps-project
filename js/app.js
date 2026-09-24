/* ==========================================================================
   app.js
   Wires everything together: hash-based routing, a single delegated click
   handler for the whole app, search/notes input handling, the term-definition
   modal, and the mobile sidebar drawer.
   ========================================================================== */

(function () {
  const mainEl = document.getElementById("main-content");
  const ctxEl = document.getElementById("context-panel");
  const breadcrumbEl = document.getElementById("breadcrumb");
  const searchInput = document.getElementById("search-input");
  const searchResultsEl = document.getElementById("search-results");
  const toastEl = document.getElementById("toast");
  const modalBackdrop = document.getElementById("term-modal-backdrop");
  const modalBody = document.getElementById("term-modal-body");
  const sidebarEl = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebar-overlay");
  const menuBtn = document.getElementById("menu-btn");

  let currentView = "home";
  let currentRefId = null;
  let currentModalTerm = null;
  let notesTimer = null;
  let toastTimer = null;

  // ---- navigation ------------------------------------------------------------
  function navigate(hash) {
    if (location.hash === hash) renderRoute();
    else location.hash = hash;
  }

  function renderRoute() {
    const raw = (location.hash || "#/home").replace(/^#\/?/, "");
    const segments = raw.split("/");
    const view = segments[0] || "home";
    const param = segments.slice(1).join("/");

    currentRefId = null;
    let html = "";

    switch (view) {
      case "home":
        currentView = "home";
        html = Course.renderHome();
        break;
      case "lesson": {
        const entry = Course.findLessonEntry(param);
        if (!entry) {
          currentView = "home";
          html = Course.renderHome();
          break;
        }
        currentRefId = param;
        Progress.setCurrent(param);
        Course.ensureOpen(entry.partId);
        if (entry.kind === "practice") {
          currentView = "practice";
          html = Course.renderPracticeView(param);
        } else {
          currentView = "lesson";
          html = Course.renderLessonView(param);
        }
        break;
      }
      case "glossary":
        currentView = "glossary";
        html = Course.renderGlossaryPage("");
        break;
      case "bookmarks":
        currentView = "bookmarks";
        html = Course.renderBookmarksPage();
        break;
      case "notes":
        currentView = "notes";
        html = Course.renderNotesPage();
        break;
      case "map":
        currentView = "map";
        html = Course.renderMapPage();
        break;
      case "complete":
        currentView = "complete";
        html = Course.renderCompletionPage();
        break;
      default:
        currentView = "home";
        html = Course.renderHome();
    }

    mainEl.innerHTML = html;

    if (currentView === "lesson") {
      const bodyEl = document.getElementById("lesson-body-content");
      const matched = Course.linkGlossaryTerms(bodyEl);
      Course.setMatchedTerms(matched);
    } else {
      Course.setMatchedTerms([]);
    }

    if (currentView === "lesson" || currentView === "practice") {
      ctxEl.innerHTML = Course.renderContextPanel(currentRefId);
    } else {
      ctxEl.innerHTML = "";
    }

    breadcrumbEl.innerHTML = Course.buildBreadcrumb(currentView, currentRefId);
    Course.refreshSidebar(currentRefId);

    mainEl.scrollTop = 0;
    window.scrollTo(0, 0);
    try { mainEl.focus({ preventScroll: true }); } catch (e) { /* noop */ }

    closeSidebar();
    closeSearchResults();
  }

  // ---- small UI helpers --------------------------------------------------------
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function showToast(msg) {
    toastEl.innerHTML = `${Course.ICONS.check}<span>${MD.escapeHtml(msg)}</span>`;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toastEl.hidden = true; }, 2200);
  }

  function openSidebar() {
    sidebarEl.classList.add("open");
    sidebarOverlay.classList.add("show");
    menuBtn.setAttribute("aria-expanded", "true");
  }
  function closeSidebar() {
    sidebarEl.classList.remove("open");
    sidebarOverlay.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  function closeSearchResults() {
    searchResultsEl.hidden = true;
  }

  function openTermModal(term) {
    const g = Glossary.getByTerm(term);
    currentModalTerm = g ? g.term : term;
    modalBody.innerHTML = Glossary.renderTermModalContent(g);
    modalBackdrop.hidden = false;
    document.body.style.overflow = "hidden";
    closeSearchResults();
    const closeBtn = document.getElementById("term-modal-close");
    if (closeBtn) closeBtn.focus();
  }
  function closeTermModal() {
    modalBackdrop.hidden = true;
    document.body.style.overflow = "";
    currentModalTerm = null;
  }

  function checkEmptyBookmarksPage() {
    if (currentView === "bookmarks" && !mainEl.querySelector(".list-card")) {
      mainEl.innerHTML = Course.renderBookmarksPage();
    }
  }

  // ---- specific action handlers -------------------------------------------------
  function handleMarkComplete(btn) {
    const refId = btn.getAttribute("data-mark-complete");
    const nowDone = !Progress.isCompleted(refId);
    Progress.setCompleted(refId, nowDone);
    document.querySelectorAll(`[data-mark-complete="${refId}"]`).forEach((b) => {
      b.classList.toggle("btn-success", nowDone);
      b.classList.toggle("btn-secondary", !nowDone);
      b.classList.toggle("is-done", nowDone);
      b.innerHTML = nowDone ? `${Course.ICONS.check} Completed` : "Mark as complete";
    });
    Course.refreshSidebar(currentRefId);
    if (nowDone) showToast("Lesson marked complete");
  }

  function handleBookmarkLesson(btn) {
    const refId = btn.getAttribute("data-bookmark-lesson");
    const nowBm = Bookmarks.toggleLesson(refId);
    const listCard = btn.closest(".list-card");
    if (listCard && currentView === "bookmarks") {
      listCard.remove();
      checkEmptyBookmarksPage();
      return;
    }
    document.querySelectorAll(`[data-bookmark-lesson="${refId}"]`).forEach((el) => {
      if (el.classList.contains("bookmark-toggle")) {
        el.classList.toggle("active", nowBm);
        const span = el.querySelector("span");
        if (span) span.textContent = nowBm ? "Bookmarked" : "Bookmark";
      } else if (el.classList.contains("ctx-bookmark-btn")) {
        el.textContent = nowBm ? "★ Bookmarked" : "☆ Bookmark this lesson";
      }
    });
  }

  function handleToggleTermBookmark(btn) {
    const term = btn.getAttribute("data-toggle-term-bookmark");
    const nowBm = Bookmarks.toggleTerm(term);
    const listCard = btn.closest(".list-card");
    if (listCard && currentView === "bookmarks") {
      listCard.remove();
      checkEmptyBookmarksPage();
      return;
    }
    if (currentModalTerm === term) {
      const modalBtn = modalBody.querySelector("[data-toggle-term-bookmark]");
      if (modalBtn) modalBtn.textContent = nowBm ? "★ Bookmarked" : "☆ Bookmark term";
    }
  }

  function handleResetProgress() {
    if (confirm("Reset all course progress? This clears completed lessons and quiz scores, but keeps your notes and bookmarks.")) {
      Progress.resetAll();
      showToast("Progress reset");
      navigate("#/home");
    }
  }

  function handleNotesInput(textarea) {
    const refId = textarea.getAttribute("data-notes-input");
    const wrap = textarea.closest(".ctx-notes");
    const status = wrap ? wrap.querySelector("[data-notes-status]") : null;
    if (status) status.textContent = "Saving…";
    clearTimeout(notesTimer);
    notesTimer = setTimeout(() => {
      Notes.set(refId, textarea.value);
      if (status) status.textContent = "Saved";
      setTimeout(() => { if (status && status.textContent === "Saved") status.textContent = ""; }, 1500);
    }, 450);
  }

  // ---- Theme handling --------------------------------------------------------
  function getPreferredTheme() {
    const saved = localStorage.getItem("cc_theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("cc_theme", theme);
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      const isDark = theme === "dark";
      themeBtn.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
      themeBtn.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || getPreferredTheme();
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    showToast(next === "dark" ? "Dark mode activated" : "Light mode activated");
  }

  function handleCopyCode(btn) {
    const pre = btn.closest(".code-block") ? btn.closest(".code-block").querySelector("pre") : null;
    if (!pre) return;
    const text = pre.innerText || pre.textContent;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        const old = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => { btn.textContent = old; }, 1800);
        showToast("Code copied to clipboard");
      }).catch(() => {
        showToast("Failed to copy code");
      });
    } else {
      showToast("Clipboard not accessible");
    }
  }

  // ---- delegated click handling ---------------------------------------------------
  document.addEventListener("click", function (e) {
    const t = e.target;

    const scrollEl = t.closest("[data-scroll-to]");
    if (scrollEl) { e.preventDefault(); scrollToId(scrollEl.getAttribute("data-scroll-to")); return; }

    const termEl = t.closest("[data-term]");
    if (termEl) { e.preventDefault(); openTermModal(termEl.getAttribute("data-term")); return; }

    const toggleTermBm = t.closest("[data-toggle-term-bookmark]");
    if (toggleTermBm) { handleToggleTermBookmark(toggleTermBm); return; }

    const completeBtn = t.closest("[data-mark-complete]");
    if (completeBtn) { handleMarkComplete(completeBtn); return; }

    const bmBtn = t.closest("[data-bookmark-lesson]");
    if (bmBtn) { handleBookmarkLesson(bmBtn); return; }

    const mcqOpt = t.closest(".mcq-option");
    if (mcqOpt && !mcqOpt.disabled) { Quiz.handleMcqAnswer(mcqOpt); return; }

    const revealBtn = t.closest(".reveal-btn");
    if (revealBtn) { Quiz.handleReveal(revealBtn); return; }

    const exHint = t.closest("[data-ex-hint]");
    if (exHint) { Quiz.handleExerciseToggle(exHint, "hint"); return; }

    const exSol = t.closest("[data-ex-solution]");
    if (exSol) { Quiz.handleExerciseToggle(exSol, "solution"); return; }

    const retryBtn = t.closest("[data-retry-quiz]");
    if (retryBtn) {
      Progress.resetQuiz(retryBtn.getAttribute("data-retry-quiz"));
      renderRoute();
      showToast("Quiz reset — give it another go");
      return;
    }

    const stackLayer = t.closest("[data-stack-layer]");
    if (stackLayer) { Timeline.handleStackLayerClick(stackLayer); return; }

    const flipCard = t.closest(".flip-card");
    if (flipCard) { Quiz.handleFlip(flipCard); return; }

    const termCard = t.closest(".term-card");
    if (termCard) { termCard.classList.toggle("flipped"); return; }

    const partToggle = t.closest("[data-part-toggle]");
    if (partToggle) {
      Course.togglePartOpen(partToggle.getAttribute("data-part-toggle"));
      Course.refreshSidebar(currentRefId);
      return;
    }

    const azBtn = t.closest("[data-jump-letter]");
    if (azBtn) { scrollToId("glossary-letter-" + azBtn.getAttribute("data-jump-letter")); return; }

    const gotoPart = t.closest("[data-goto-part]");
    if (gotoPart) {
      e.preventDefault();
      const num = parseInt(gotoPart.getAttribute("data-goto-part"), 10);
      const part = Course.getPart(num);
      if (part) { closeTermModal(); navigate("#/lesson/" + part.sections[0].id); }
      return;
    }

    const gotoLesson = t.closest("[data-goto-lesson]");
    if (gotoLesson) { closeTermModal(); navigate("#/lesson/" + gotoLesson.getAttribute("data-goto-lesson")); return; }

    const navEl = t.closest("[data-nav]");
    if (navEl) { e.preventDefault(); closeTermModal(); navigate(navEl.getAttribute("data-nav")); return; }

    if (t.closest("#menu-btn")) { openSidebar(); return; }
    if (t.closest("#sidebar-close")) { closeSidebar(); return; }
    if (t.closest("#sidebar-overlay")) { closeSidebar(); return; }

    if (t.closest("#term-modal-close")) { closeTermModal(); return; }
    if (t.id === "term-modal-backdrop") { closeTermModal(); return; }

    if (t.closest("#theme-toggle")) { toggleTheme(); return; }
    if (t.closest(".code-copy-btn")) { handleCopyCode(t.closest(".code-copy-btn")); return; }

    if (t.closest("#reset-progress-btn")) { handleResetProgress(); return; }

    if (!t.closest(".search-wrap")) closeSearchResults();
  });

  // ---- delegated input handling -----------------------------------------------------
  document.addEventListener("input", function (e) {
    const t = e.target;
    if (t.id === "search-input") {
      const q = t.value;
      if (q.trim().length < 2) { closeSearchResults(); searchResultsEl.innerHTML = ""; return; }
      searchResultsEl.innerHTML = Search.renderResults(q);
      searchResultsEl.hidden = false;
    } else if (t.id === "glossary-search") {
      const body = document.getElementById("glossary-body");
      if (body) body.innerHTML = Glossary.renderResultsBody(t.value);
    } else if (t.hasAttribute && t.hasAttribute("data-notes-input")) {
      handleNotesInput(t);
    }
  });

  // ---- keyboard shortcuts -----------------------------------------------------------
  document.addEventListener("keydown", function (e) {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === "Escape") {
      closeSearchResults();
      if (!modalBackdrop.hidden) closeTermModal();
      closeSidebar();
    }
  });

  // ---- init -------------------------------------------------------------------------
  function init() {
    applyTheme(getPreferredTheme());
    if (!location.hash || location.hash === "#") location.hash = "#/home";
    window.addEventListener("hashchange", renderRoute);
    Progress.onChange(() => { Course.refreshSidebar(currentRefId); });
    renderRoute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
