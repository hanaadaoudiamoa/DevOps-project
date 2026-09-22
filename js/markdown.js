/* ==========================================================================
   markdown.js
   A small, purpose-built Markdown -> HTML renderer for this course's content.
   It supports exactly the subset of Markdown used in course_content.md:
   headings (###), paragraphs, **bold**, *italic*, `code`, pipe tables,
   ordered/unordered lists, blockquotes, and horizontal rules.

   It also recognises the course's recurring "Simple Explanation / Technical
   Explanation / Example / Why It Matters" heading pattern and renders those
   as styled callout cards instead of plain headings.
   ========================================================================== */

(function (global) {
  const EXPLANATION_PREFIXES = [
    ["Simple Explanation", "simple"],
    ["Technical Explanation", "technical"],
    ["Example", "example"],
    ["Why It Matters", "whyitmatters"],
  ];

  const ICONS = {
    simple: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.4 10.94c.53.37.9.99.9 1.66V16h5v-.4c0-.67.37-1.29.9-1.66A6 6 0 0 0 12 3Z" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    technical: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" stroke="currentColor" stroke-width="1.6"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    example: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 3v5.4L4.6 16a2 2 0 0 0 1.7 3h11.4a2 2 0 0 0 1.7-3L15 8.4V3M9 3h6" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    whyitmatters: '<svg viewBox="0 0 24 24" fill="none"><path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7-5.4-4.7 7.1-.6L12 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inline(text) {
    let t = escapeHtml(text);
    t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    t = t.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<em>$2</em>");
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    return t;
  }

  function explainType(headingText) {
    for (const [prefix, key] of EXPLANATION_PREFIXES) {
      if (headingText.indexOf(prefix) === 0) return key;
    }
    return null;
  }

  function slugify(text, used) {
    let base = text
      .toLowerCase()
      .replace(/['"]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "section";
    let slug = base;
    let n = 2;
    while (used.has(slug)) {
      slug = `${base}-${n++}`;
    }
    used.add(slug);
    return slug;
  }

  // ---- block-level parse ---------------------------------------------------
  function parseBlocks(md) {
    const lines = (md || "").replace(/\r\n/g, "\n").split("\n");
    const blocks = [];
    let i = 0;

    const isListItem = (l) => /^-\s+/.test(l) || /^\d+\.\s+/.test(l);
    const isTableRow = (l) => l.trim().startsWith("|");
    const isBlockquote = (l) => l.trim().startsWith(">");
    const isHeading = (l) => /^#{1,6}\s+/.test(l);
    const isHr = (l) => /^-{3,}\s*$/.test(l.trim());

    while (i < lines.length) {
      const raw = lines[i];
      const line = raw;
      if (line.trim() === "") { i++; continue; }

      if (isHr(line)) { blocks.push({ type: "hr" }); i++; continue; }

      if (isHeading(line)) {
        const m = line.match(/^(#{1,6})\s+(.*)$/);
        blocks.push({ type: "heading", level: m[1].length, text: m[2].trim() });
        i++;
        continue;
      }

      if (isTableRow(line)) {
        const tlines = [];
        while (i < lines.length && isTableRow(lines[i])) { tlines.push(lines[i]); i++; }
        blocks.push({ type: "table", lines: tlines });
        continue;
      }

      if (isBlockquote(line)) {
        const qlines = [];
        while (i < lines.length && isBlockquote(lines[i])) {
          qlines.push(lines[i].trim().replace(/^>\s?/, ""));
          i++;
        }
        blocks.push({ type: "blockquote", text: qlines.join(" ") });
        continue;
      }

      if (/^-\s+/.test(line.trim())) {
        const items = [];
        while (i < lines.length && /^-\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^-\s+/, ""));
          i++;
        }
        blocks.push({ type: "ul", items });
        continue;
      }

      if (/^\d+\.\s+/.test(line.trim())) {
        const items = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
          i++;
        }
        blocks.push({ type: "ol", items });
        continue;
      }

      // paragraph: gather until blank line or a line that starts a new block type
      const plines = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !isTableRow(lines[i]) &&
        !isBlockquote(lines[i]) &&
        !isHeading(lines[i]) &&
        !isHr(lines[i]) &&
        !isListItem(lines[i].trim())
      ) {
        plines.push(lines[i].trim());
        i++;
      }
      blocks.push({ type: "p", text: plines.join(" ") });
    }

    return blocks;
  }

  function parseTableRow(line) {
    let t = line.trim();
    if (t.startsWith("|")) t = t.slice(1);
    if (t.endsWith("|")) t = t.slice(0, -1);
    return t.split("|").map((c) => c.trim());
  }

  function isDelimiterRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
  }

  function renderTable(block) {
    const rows = block.lines.map(parseTableRow);
    let header = null;
    let bodyRows = rows;
    if (rows.length > 1 && isDelimiterRow(rows[1])) {
      header = rows[0];
      bodyRows = rows.slice(2);
    }
    let html = '<div class="table-wrap"><table>';
    if (header) {
      html += "<thead><tr>" + header.map((c) => `<th>${inline(c)}</th>`).join("") + "</tr></thead>";
    }
    html += "<tbody>";
    for (const r of bodyRows) {
      html += "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>";
    }
    html += "</tbody></table></div>";
    return html;
  }

  // ---- group Simple/Technical/Example/Why-It-Matters runs into callouts ----
  function groupExplainBlocks(blocks) {
    const out = [];
    let i = 0;
    while (i < blocks.length) {
      const b = blocks[i];
      if (b.type === "heading" && b.level === 3) {
        const kind = explainType(b.text);
        if (kind) {
          const children = [];
          i++;
          while (i < blocks.length && !(blocks[i].type === "heading")) {
            children.push(blocks[i]);
            i++;
          }
          out.push({ type: "explain", subtype: kind, label: b.text, children });
          continue;
        }
      }
      out.push(b);
      i++;
    }
    return out;
  }

  function renderSimpleBlock(block) {
    switch (block.type) {
      case "p":
        return `<p>${inline(block.text)}</p>`;
      case "ul":
        return "<ul>" + block.items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>";
      case "ol":
        return "<ol>" + block.items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ol>";
      case "table":
        return renderTable(block);
      case "blockquote":
        return `<blockquote class="callout"><p>${inline(block.text)}</p></blockquote>`;
      case "hr":
        return "<hr>";
      default:
        return "";
    }
  }

  /**
   * Render a full lesson body: groups explanation callouts and collects a
   * table of contents from headings + callout labels.
   */
  function renderLessonBody(md) {
    const rawBlocks = parseBlocks(md);
    const grouped = groupExplainBlocks(rawBlocks);
    const usedIds = new Set();
    const headings = [];
    let html = "";

    for (const block of grouped) {
      if (block.type === "heading") {
        const id = slugify(block.text, usedIds);
        headings.push({ id, text: block.text, kind: "heading" });
        html += `<h4 id="${id}">${inline(block.text)}</h4>`;
      } else if (block.type === "explain") {
        const id = slugify(block.label, usedIds);
        headings.push({ id, text: block.label, kind: block.subtype });
        const icon = ICONS[block.subtype] || "";
        html += `<div class="explain-block explain-${block.subtype}" id="${id}">`;
        html += `<div class="explain-block-label">${icon}<span>${inline(block.label)}</span></div>`;
        html += block.children.map(renderSimpleBlock).join("");
        html += `</div>`;
      } else {
        html += renderSimpleBlock(block);
      }
    }
    return { html, headings };
  }

  /** Render a short markdown snippet (quiz answers, exercise solutions, etc). No headings expected. */
  function renderSnippet(md) {
    const blocks = parseBlocks(md);
    return blocks.map(renderSimpleBlock).join("");
  }

  /** Render a flat bullet list of plain strings (each may contain inline markdown). */
  function renderList(items) {
    return "<ul>" + items.map((it) => `<li>${inline(it)}</li>`).join("") + "</ul>";
  }

  global.MD = { renderLessonBody, renderSnippet, renderList, inline, escapeHtml, slugify };
})(window);
