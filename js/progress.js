/* ==========================================================================
   progress.js
   Persistent progress tracking (localStorage). Tracks completed lessons,
   quiz answers/scores per Part, exercise hint/solution reveal state, and
   the learner's current position so "Continue Learning" works.
   ========================================================================== */

(function (global) {
  // ---- tiny shared localStorage helper (also used by notes.js / bookmarks.js) ----
  const Store = {
    get(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        if (raw == null) return fallback;
        return JSON.parse(raw);
      } catch (e) {
        console.warn("Store.get failed for", key, e);
        return fallback;
      }
    },
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn("Store.set failed for", key, e);
        return false;
      }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (e) { /* noop */ }
    },
  };

  const KEY = "ccc_progress_v1";

  function defaultState() {
    return {
      completed: {},     // { [lessonRefId]: true }
      quiz: {},          // { [partId]: { answers: {qnum:key}, correct, total, attempted } }
      exercises: {},     // { [partId]: { [exNum]: { hint:bool, solution:bool } } }
      currentRef: null,
      updatedAt: Date.now(),
    };
  }

  let state = Store.get(KEY, null) || defaultState();
  // guard against older/partial shapes
  state.completed = state.completed || {};
  state.quiz = state.quiz || {};
  state.exercises = state.exercises || {};

  const listeners = [];
  function emit() {
    for (const fn of listeners) {
      try { fn(state); } catch (e) { console.error(e); }
    }
  }
  function persist() {
    state.updatedAt = Date.now();
    Store.set(KEY, state);
    emit();
  }

  const Progress = {
    onChange(fn) { listeners.push(fn); },

    // ---- lesson completion -------------------------------------------------
    isCompleted(refId) { return !!state.completed[refId]; },
    setCompleted(refId, val) {
      if (val) state.completed[refId] = true;
      else delete state.completed[refId];
      persist();
    },
    toggleCompleted(refId) {
      this.setCompleted(refId, !this.isCompleted(refId));
    },
    completedCount() { return Object.keys(state.completed).length; },

    // ---- current position ---------------------------------------------------
    setCurrent(refId) {
      state.currentRef = refId;
      persist();
    },
    getCurrent() { return state.currentRef; },

    // ---- quiz (multiple choice) ---------------------------------------------
    getQuizState(partId) {
      return state.quiz[partId] || { answers: {}, results: {}, correct: 0, total: 0, attempted: false };
    },
    answerMcq(partId, qnum, selectedKey, correctKey, totalQuestions) {
      const q = state.quiz[partId] || { answers: {}, results: {}, correct: 0, total: 0, attempted: false };
      if (q.answers[qnum] !== undefined) return q;
      q.answers[qnum] = selectedKey;
      q.results[qnum] = selectedKey === correctKey;
      q.attempted = true;
      q.total = totalQuestions;
      q.correct = Object.values(q.results).filter(Boolean).length;
      state.quiz[partId] = q;
      persist();
      return q;
    },
    resetQuiz(partId) {
      delete state.quiz[partId];
      persist();
    },

    // ---- exercises -----------------------------------------------------------
    getExerciseState(partId, exNum) {
      return (state.exercises[partId] && state.exercises[partId][exNum]) || { hint: false, solution: false };
    },
    setExerciseFlag(partId, exNum, field, val) {
      state.exercises[partId] = state.exercises[partId] || {};
      state.exercises[partId][exNum] = state.exercises[partId][exNum] || { hint: false, solution: false };
      state.exercises[partId][exNum][field] = val;
      persist();
    },

    // ---- aggregate -------------------------------------------------------------
    computeOverall(totalLessonCount) {
      const completed = this.completedCount();
      const pct = totalLessonCount > 0 ? Math.round((completed / totalLessonCount) * 100) : 0;
      return { completed, total: totalLessonCount, pct };
    },

    resetAll() {
      state = defaultState();
      Store.set(KEY, state);
      emit();
    },
  };

  global.Store = Store;
  global.Progress = Progress;
})(window);
