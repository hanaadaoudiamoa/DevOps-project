/* ==========================================================================
   quiz.js
   Renders the "Practice" section of a Part (Quick Questions, Multiple
   Choice, Understanding/Comparison/Scenario reveal cards, Exercises) and
   provides the DOM-mutation handlers app.js's delegated listener calls.
   ========================================================================== */

(function (global) {
  const DIFF_MAP = {
    Easy: { stars: 1, badge: "badge-success" },
    Medium: { stars: 3, badge: "badge-warning" },
    Hard: { stars: 5, badge: "badge-danger" },
  };

  function starsHtml(count) {
    let s = "";
    for (let i = 1; i <= 5; i++) {
      s += i <= count
        ? '<svg class="star-on" viewBox="0 0 24 24"><path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7-5.4-4.7 7.1-.6L12 2Z"/></svg>'
        : '<svg class="star-off" viewBox="0 0 24 24"><path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.3 5.8 20.9l1.6-7-5.4-4.7 7.1-.6L12 2Z"/></svg>';
    }
    return s;
  }

  function circleRing(pct) {
    const r = 34, c = 2 * Math.PI * r;
    const offset = c * (1 - pct / 100);
    return `<svg width="78" height="78" viewBox="0 0 78 78">
      <circle cx="39" cy="39" r="${r}" stroke="var(--border)" stroke-width="8" fill="none"/>
      <circle cx="39" cy="39" r="${r}" stroke="var(--primary)" stroke-width="8" fill="none"
        stroke-dasharray="${c.toFixed(1)}" stroke-dashoffset="${offset.toFixed(1)}" stroke-linecap="round"
        style="transition:stroke-dashoffset var(--dur-slow) var(--ease);"/>
    </svg>`;
  }

  function renderScoreSummary(partId, mcqTotal) {
    const q = Progress.getQuizState(partId);
    const answered = Object.keys(q.answers || {}).length;
    const pct = mcqTotal > 0 ? Math.round(((q.correct || 0) / mcqTotal) * 100) : 0;
    return `
      <div class="score-ring">${circleRing(q.attempted ? pct : 0)}<div class="score-ring-num">${q.attempted ? pct + "%" : "—"}</div></div>
      <div class="score-body">
        <strong>Knowledge Check</strong>
        <div>${q.correct || 0} / ${mcqTotal} correct${answered < mcqTotal ? ` · ${mcqTotal - answered} remaining` : ""}</div>
        <div class="progress-track thin" style="margin-top:8px;max-width:240px;"><div class="progress-fill" style="width:${answered ? pct : 0}%"></div></div>
      </div>
      <div class="score-actions"><button class="btn btn-secondary btn-sm" data-retry-quiz="${partId}">Retry quiz</button></div>`;
  }

  function renderQuickQuestions(quick) {
    if (!quick.questions.length) return "";
    const cards = quick.questions
      .map((q, i) => `
        <div class="flip-card" data-flip>
          <div class="flip-card-inner">
            <div class="flip-face flip-front">
              <div class="fc-label">Question ${i + 1}</div>
              <div class="fc-q">${MD.inline(q)}</div>
              <div class="flip-hint">Tap to flip ⟳</div>
            </div>
            <div class="flip-face flip-back">
              <div class="fc-label">Answer</div>
              <div class="fc-a">${MD.inline(quick.answers[i] || "")}</div>
            </div>
          </div>
        </div>`)
      .join("");
    return `
      <div class="practice-section" id="quick-questions">
        <div class="practice-section-head"><span class="step-num">1</span><h3>Quick Questions</h3></div>
        <p style="color:var(--text-muted);font-size:14px;margin-top:-8px;margin-bottom:var(--sp-5);">A fast recall check. Tap a card to flip it and check your answer.</p>
        <div class="quick-grid">${cards}</div>
      </div>`;
  }

  function renderMcqSection(partId, mcqs) {
    if (!mcqs.length) return "";
    const q = Progress.getQuizState(partId);
    const cards = mcqs
      .map((m) => {
        const answered = q.answers && q.answers[m.number] !== undefined;
        const selected = answered ? q.answers[m.number] : null;
        const opts = m.options
          .map((o) => {
            let cls = "mcq-option";
            if (answered) {
              if (o.key === m.correct) cls += " correct";
              else if (o.key === selected) cls += " incorrect";
              else cls += " dim";
            }
            return `<button class="${cls}" data-key="${o.key}" ${answered ? "disabled" : ""}>
              <span class="opt-key">${o.key}</span><span>${MD.inline(o.text)}</span>
            </button>`;
          })
          .join("");
        const isCorrect = answered && selected === m.correct;
        const feedback = answered
          ? `<div class="mcq-feedback show ${isCorrect ? "correct" : "incorrect"}">
               <strong>${isCorrect ? "✓ Correct!" : "Not quite."}</strong>${MD.inline(m.explanation)}
             </div>`
          : `<div class="mcq-feedback"></div>`;
        return `
          <div class="mcq-card" data-mcq data-part="${partId}" data-qnum="${m.number}" data-correct="${m.correct}" data-total="${mcqs.length}">
            <div class="mcq-q">${m.number}. ${MD.inline(m.question)}</div>
            <div class="mcq-options">${opts}</div>
            ${feedback}
          </div>`;
      })
      .join("");
    return `
      <div class="practice-section" id="mcq-section">
        <div class="practice-section-head"><span class="step-num">2</span><h3>Multiple Choice Questions</h3></div>
        ${cards}
      </div>`;
  }

  function renderRevealGroup({ id, step, title, blurb, items }) {
    if (!items.length) return "";
    const cards = items
      .map(
        (it) => `
        <div class="reveal-card" data-reveal>
          <div class="reveal-q">${MD.inline(it.q)}</div>
          ${it.prompt ? `<div class="reveal-prompt">${MD.inline(it.prompt)}</div>` : ""}
          <button class="reveal-btn" type="button">Show answer</button>
          <div class="reveal-answer"><div class="ra-label">Answer</div>${it.answerHtml}</div>
        </div>`
      )
      .join("");
    return `
      <div class="practice-section" id="${id}">
        <div class="practice-section-head"><span class="step-num">${step}</span><h3>${title}</h3></div>
        ${blurb ? `<p style="color:var(--text-muted);font-size:14px;margin-top:-8px;margin-bottom:var(--sp-5);">${blurb}</p>` : ""}
        ${cards}
      </div>`;
  }

  function renderExercises(partId, exercises) {
    if (!exercises.length) return "";
    const cards = exercises
      .map((ex) => {
        const st = Progress.getExerciseState(partId, ex.number);
        const diff = DIFF_MAP[ex.difficulty] || { stars: 3, badge: "badge-neutral" };
        return `
        <div class="exercise-card" data-exercise data-part="${partId}" data-exnum="${ex.number}">
          <div class="exercise-head">
            <div class="exercise-head-left">
              <span class="exercise-label">Exercise ${ex.number}</span>
              <span class="stars" title="Difficulty: ${ex.difficulty}">${starsHtml(diff.stars)}</span>
            </div>
            <span class="badge ${diff.badge}">${ex.difficulty}</span>
          </div>
          <div class="exercise-block-label">Scenario</div>
          <div class="exercise-body-text">${MD.renderSnippet(ex.problem)}</div>
          <div class="exercise-actions">
            <button class="btn btn-secondary btn-sm" data-ex-hint>${st.hint ? "Hide hint" : "💡 Show hint"}</button>
            <button class="btn btn-primary btn-sm" data-ex-solution>${st.solution ? "Hide solution" : "✓ Show solution"}</button>
          </div>
          <div class="exercise-reveal ${st.hint ? "show" : ""}" data-hint-box>
            <div class="exercise-reveal-label">Hint — what's expected</div>
            <div class="exercise-body-text">${MD.renderSnippet(ex.task)}</div>
          </div>
          <div class="exercise-reveal ${st.solution ? "show" : ""}" data-solution-box>
            <div class="exercise-reveal-label">Solution</div>
            <div class="exercise-body-text">${MD.renderSnippet(ex.solution)}</div>
          </div>
        </div>`;
      })
      .join("");
    return `
      <div class="practice-section" id="exercises-section">
        <div class="practice-section-head"><span class="step-num">6</span><h3>Exercises</h3></div>
        ${cards}
      </div>`;
  }

  /** Full HTML for a Part's Practice pseudo-lesson. */
  function renderPractice(part) {
    const p = part.practice;
    const understanding = renderRevealGroup({
      id: "understanding-section",
      step: 3,
      title: "Understanding Questions",
      blurb: "Explain each in your own words before revealing the sample answer.",
      items: p.understanding.map((u) => ({ q: u.question, answerHtml: MD.renderSnippet(u.answer) })),
    });
    const comparison = renderRevealGroup({
      id: "comparison-section",
      step: 4,
      title: "Comparison Questions",
      blurb: "",
      items: p.comparison.map((c) => ({ q: c.title, prompt: c.prompt, answerHtml: MD.renderSnippet(c.answer) })),
    });
    const scenario = renderRevealGroup({
      id: "scenario-section",
      step: 5,
      title: "Scenario-Based Questions",
      blurb: "",
      items: p.scenario.map((s) => ({ q: s.scenario, answerHtml: MD.renderSnippet(s.answer) })),
    });

    return `
      <div class="practice-hero">
        <div class="score-summary" id="score-summary-${part.id}">${renderScoreSummary(part.id, p.mcq.length)}</div>
      </div>
      ${renderQuickQuestions(p.quick)}
      ${renderMcqSection(part.id, p.mcq)}
      ${understanding}
      ${comparison}
      ${scenario}
      ${renderExercises(part.id, p.exercises)}
    `;
  }

  // ---- DOM mutation handlers, called by app.js's delegated listener --------

  function handleFlip(cardEl) {
    cardEl.classList.toggle("flipped");
  }

  function handleReveal(btn) {
    const card = btn.closest(".reveal-card");
    const answer = card.querySelector(".reveal-answer");
    const showing = answer.classList.toggle("show");
    btn.textContent = showing ? "Hide answer" : "Show answer";
  }

  function handleExerciseToggle(btn, field) {
    const card = btn.closest("[data-exercise]");
    const partId = card.getAttribute("data-part");
    const exNum = card.getAttribute("data-exnum");
    const box = card.querySelector(field === "hint" ? "[data-hint-box]" : "[data-solution-box]");
    const showing = box.classList.toggle("show");
    Progress.setExerciseFlag(partId, exNum, field, showing);
    btn.textContent = field === "hint"
      ? (showing ? "Hide hint" : "💡 Show hint")
      : (showing ? "Hide solution" : "✓ Show solution");
  }

  function handleMcqAnswer(optionBtn) {
    const card = optionBtn.closest("[data-mcq]");
    if (!card) return;
    const partId = card.getAttribute("data-part");
    const qnum = card.getAttribute("data-qnum");
    const correct = card.getAttribute("data-correct");
    const total = parseInt(card.getAttribute("data-total"), 10);
    const selected = optionBtn.getAttribute("data-key");

    const already = Progress.getQuizState(partId).answers[qnum] !== undefined;
    if (already) return;

    Progress.answerMcq(partId, qnum, selected, correct, total);

    // update this card's DOM in place
    card.querySelectorAll(".mcq-option").forEach((btn) => {
      btn.disabled = true;
      const k = btn.getAttribute("data-key");
      if (k === correct) btn.classList.add("correct");
      else if (k === selected) btn.classList.add("incorrect");
      else btn.classList.add("dim");
    });
    const isCorrect = selected === correct;
    const fb = card.querySelector(".mcq-feedback");
    const mcqData = findMcqMeta(partId, qnum);
    fb.classList.add("show", isCorrect ? "correct" : "incorrect");
    fb.innerHTML = `<strong>${isCorrect ? "✓ Correct!" : "Not quite."}</strong>${MD.inline(mcqData ? mcqData.explanation : "")}`;

    // refresh score ring
    const summaryEl = document.getElementById(`score-summary-${partId}`);
    if (summaryEl) summaryEl.innerHTML = renderScoreSummary(partId, total);
  }

  function findMcqMeta(partId, qnum) {
    const part = (global.COURSE_DATA.parts || []).find((p) => p.id === partId);
    if (!part) return null;
    return part.practice.mcq.find((m) => String(m.number) === String(qnum));
  }

  global.Quiz = {
    renderPractice,
    renderScoreSummary,
    handleFlip,
    handleReveal,
    handleExerciseToggle,
    handleMcqAnswer,
  };
})(window);
