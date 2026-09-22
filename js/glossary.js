/* ==========================================================================
   glossary.js
   Indexes the course glossary and renders the interactive glossary page
   (A–Z navigation, search, flip cards) plus reusable term-lookup helpers
   used elsewhere (lesson "Key terms" chips, inline term links, modal).
   ========================================================================== */

(function (global) {
  const raw = (global.COURSE_DATA && global.COURSE_DATA.glossary) || [];

  const all = raw
    .slice()
    .sort((a, b) => a.term.localeCompare(b.term))
    .map((g) => ({ ...g, letter: (g.term.match(/[A-Za-z]/) || ["#"])[0].toUpperCase() }));

  const byTermLower = new Map(all.map((g) => [g.term.toLowerCase(), g]));

  const byLetter = {};
  for (const g of all) {
    byLetter[g.letter] = byLetter[g.letter] || [];
    byLetter[g.letter].push(g);
  }
  const letters = Object.keys(byLetter).sort();

  // longest-term-first so multi-word terms are matched before their substrings
  const byLengthDesc = all.slice().sort((a, b) => b.term.length - a.term.length);

  function getByTerm(term) {
    return byTermLower.get(String(term).toLowerCase());
  }

  function firstPartNumber(partField) {
    const m = String(partField).match(/\d+/);
    return m ? parseInt(m[0], 10) : null;
  }

  function icon() {
    return '<svg viewBox="0 0 24 24" fill="none"><path d="M5 4h11a2 2 0 0 1 2 2v14l-2-1-2 1-2-1-2 1-2-1-2 1V6a2 2 0 0 1-2-2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 8h6M8 11h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';
  }

  function renderTermCard(g) {
    const related = (g.related || [])
      .map((r) => `<span data-term="${MD.escapeHtml(r)}">${MD.escapeHtml(r)}</span>`)
      .join("");
    const bookmarked = global.Bookmarks && global.Bookmarks.isTerm(g.term);
    return `
      <div class="term-card" data-term-card="${MD.escapeHtml(g.term)}">
        <div class="term-card-inner">
          <div class="term-face term-front">
            <div>
              <span class="badge badge-primary">${MD.escapeHtml(g.part)}</span>
            </div>
            <div class="term-name">${MD.escapeHtml(g.term)}</div>
            <div class="term-flip-hint">Tap to reveal definition</div>
          </div>
          <div class="term-face term-back">
            <div class="term-def">${MD.inline(g.definition)}</div>
            ${related ? `<div class="term-related">${related}</div>` : ""}
          </div>
        </div>
      </div>`;
  }

  function renderAZNav(activeLetter) {
    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return (
      '<div class="az-nav">' +
      ALPHA.map((L) => {
        const has = byLetter[L] && byLetter[L].length;
        const cls = ["az-btn"];
        if (!has) cls.push("disabled");
        if (L === activeLetter) cls.push("active");
        return `<button class="${cls.join(" ")}" ${has ? `data-jump-letter="${L}"` : "disabled"}>${L}</button>`;
      }).join("") +
      "</div>"
    );
  }

  function renderPage(query) {
    query = (query || "").trim().toLowerCase();
    return `
      <div class="glossary-toolbar">
        <div class="search-box" style="width:320px;">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" stroke-width="1.7"/><path d="m20 20-3.6-3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          <input type="search" id="glossary-search" placeholder="Filter glossary terms…" value="${MD.escapeHtml(query)}" autocomplete="off">
        </div>
        <span class="badge badge-neutral">${all.length} terms</span>
      </div>
      <div id="glossary-body">${renderResultsBody(query)}</div>`;
  }

  function renderResultsBody(query) {
    query = (query || "").trim().toLowerCase();
    if (query) {
      const results = all.filter(
        (g) => g.term.toLowerCase().includes(query) || g.definition.toLowerCase().includes(query)
      );
      let html = `<p style="color:var(--text-muted);font-size:14px;">${results.length} result${results.length === 1 ? "" : "s"} for “${MD.escapeHtml(query)}”</p>`;
      if (!results.length) {
        html += `<div class="empty-state">${icon()}<h3>No terms found</h3><p>Try a different search term.</p></div>`;
      } else {
        html += `<div class="glossary-grid">${results.map(renderTermCard).join("")}</div>`;
      }
      return html;
    }

    let html = renderAZNav(null);
    for (const L of letters) {
      html += `<section class="glossary-letter-group" id="glossary-letter-${L}">
        <h2 class="glossary-letter-heading">${L}</h2>
        <div class="glossary-grid">${byLetter[L].map(renderTermCard).join("")}</div>
      </section>`;
    }
    return html;
  }

  function renderTermModalContent(g) {
    if (!g) return "<p>Term not found.</p>";
    const related = (g.related || [])
      .map((r) => `<button class="badge badge-neutral" data-term="${MD.escapeHtml(r)}" style="cursor:pointer;border:none;">${MD.escapeHtml(r)}</button>`)
      .join(" ");
    const isBm = global.Bookmarks && global.Bookmarks.isTerm(g.term);
    const partNum = firstPartNumber(g.part);
    return `
      <div class="term-modal-part"><span class="badge badge-primary">${MD.escapeHtml(g.part)}</span></div>
      <h3 id="term-modal-title">${MD.escapeHtml(g.term)}</h3>
      <p style="color:var(--text-secondary);">${MD.inline(g.definition)}</p>
      ${related ? `<div style="margin:var(--sp-4) 0;"><div class="ctx-title" style="margin-bottom:8px;">Related terms</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${related}</div></div>` : ""}
      <div style="display:flex;gap:8px;margin-top:var(--sp-5);">
        ${partNum ? `<button class="btn btn-secondary btn-sm" data-goto-part="${partNum}">Go to Part ${partNum} →</button>` : ""}
        <button class="btn btn-ghost btn-sm" data-toggle-term-bookmark="${MD.escapeHtml(g.term)}">${isBm ? "★ Bookmarked" : "☆ Bookmark term"}</button>
      </div>`;
  }

  global.Glossary = {
    all,
    letters,
    byLetter,
    byLengthDesc,
    getByTerm,
    firstPartNumber,
    renderPage,
    renderResultsBody,
    renderTermCard,
    renderTermModalContent,
  };
})(window);
