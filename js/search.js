/* ==========================================================================
   search.js
   Builds a flat, in-memory search index over lesson content, practice
   questions, and the glossary, and renders the top-bar search dropdown.
   ========================================================================== */

(function (global) {
  function stripMd(md) {
    return String(md || "")
      .replace(/[#>*`_]/g, "")
      .replace(/\|/g, " ")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const INDEX = [];
  (global.COURSE_DATA.parts || []).forEach((part) => {
    part.sections.forEach((sec) => {
      INDEX.push({
        refId: sec.id,
        partNumber: part.number,
        title: `${sec.number} ${sec.title}`,
        text: stripMd(sec.markdown),
        kind: "lesson",
      });
    });

    const p = part.practice;
    const bits = [];
    p.quick.questions.forEach((q) => bits.push(q));
    p.mcq.forEach((m) => { bits.push(m.question); m.options.forEach((o) => bits.push(o.text)); });
    p.understanding.forEach((u) => bits.push(u.question));
    p.comparison.forEach((c) => bits.push(c.title + " " + c.prompt));
    p.scenario.forEach((s) => bits.push(s.scenario));
    p.exercises.forEach((e) => bits.push(e.problem + " " + e.task));
    INDEX.push({
      refId: `${part.id}-practice`,
      partNumber: part.number,
      title: "Practice — Knowledge Check & Exercises",
      text: stripMd(bits.join(" ")),
      kind: "practice",
    });
  });

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(escapedText, rawQuery) {
    const q = escapeRe(rawQuery);
    if (!q) return escapedText;
    try {
      return escapedText.replace(new RegExp(`(${q})`, "ig"), "<mark>$1</mark>");
    } catch (e) {
      return escapedText;
    }
  }

  function search(query) {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { lessons: [], glossary: [] };

    const lessonResults = [];
    for (const item of INDEX) {
      const titleIdx = item.title.toLowerCase().indexOf(q);
      const textIdx = item.text.toLowerCase().indexOf(q);
      if (titleIdx === -1 && textIdx === -1) continue;
      let snippet = "";
      if (textIdx !== -1) {
        const start = Math.max(0, textIdx - 40);
        snippet = (start > 0 ? "…" : "") + item.text.slice(start, textIdx + q.length + 70) + "…";
      }
      const score = (titleIdx !== -1 ? 1000 - titleIdx : 0) + (textIdx !== -1 ? 100 - Math.min(textIdx, 90) : 0);
      lessonResults.push({ ...item, score, snippet });
    }
    lessonResults.sort((a, b) => b.score - a.score);

    const glossaryResults = global.Glossary.all
      .filter((g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q))
      .slice(0, 5);

    return { lessons: lessonResults.slice(0, 7), glossary: glossaryResults, query: q };
  }

  function renderResults(query) {
    const q = query.trim();
    if (q.length < 2) return "";
    const { lessons, glossary } = search(q);
    if (!lessons.length && !glossary.length) {
      return `<div class="search-empty">No results for “${MD.escapeHtml(q)}”</div>`;
    }
    let html = "";
    if (lessons.length) {
      html += `<div class="search-result-group-label">Lessons</div>`;
      html += lessons
        .map(
          (l) => `
        <button class="search-result-item" data-goto-lesson="${l.refId}">
          <div class="sr-title">Part ${l.partNumber} · ${highlight(MD.escapeHtml(l.title), q)}</div>
          ${l.snippet ? `<div class="sr-context">${highlight(MD.escapeHtml(l.snippet), q)}</div>` : ""}
        </button>`
        )
        .join("");
    }
    if (glossary.length) {
      html += `<div class="search-result-group-label">Glossary</div>`;
      html += glossary
        .map(
          (g) => `
        <button class="search-result-item" data-term="${MD.escapeHtml(g.term)}">
          <div class="sr-title">${highlight(MD.escapeHtml(g.term), q)}</div>
          <div class="sr-context">${highlight(MD.escapeHtml(g.definition.slice(0, 100)), q)}</div>
        </button>`
        )
        .join("");
    }
    return html;
  }

  global.Search = { search, renderResults };
})(window);
