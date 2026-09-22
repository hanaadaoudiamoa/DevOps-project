/* ==========================================================================
   bookmarks.js
   Bookmarking for lessons and glossary terms, persisted in localStorage.
   ========================================================================== */

(function (global) {
  const KEY = "ccc_bookmarks_v1";
  const Store = global.Store;

  let data = Store.get(KEY, { lessons: {}, glossary: {} });
  data.lessons = data.lessons || {};
  data.glossary = data.glossary || {};

  function persist() {
    Store.set(KEY, data);
  }

  const Bookmarks = {
    isLesson(refId) { return !!data.lessons[refId]; },
    toggleLesson(refId) {
      if (data.lessons[refId]) delete data.lessons[refId];
      else data.lessons[refId] = Date.now();
      persist();
      return this.isLesson(refId);
    },
    isTerm(term) { return !!data.glossary[term]; },
    toggleTerm(term) {
      if (data.glossary[term]) delete data.glossary[term];
      else data.glossary[term] = Date.now();
      persist();
      return this.isTerm(term);
    },
    getLessons() {
      return Object.keys(data.lessons).sort((a, b) => data.lessons[b] - data.lessons[a]);
    },
    getTerms() {
      return Object.keys(data.glossary).sort((a, b) => data.glossary[b] - data.glossary[a]);
    },
    count() {
      return Object.keys(data.lessons).length + Object.keys(data.glossary).length;
    },
  };

  global.Bookmarks = Bookmarks;
})(window);
