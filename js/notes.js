/* ==========================================================================
   notes.js
   Personal notes attached to lessons, persisted in localStorage.
   ========================================================================== */

(function (global) {
  const KEY = "ccc_notes_v1";
  const Store = global.Store;

  let notes = Store.get(KEY, {}); // { [lessonRefId]: { text, updatedAt } }

  function persist() {
    Store.set(KEY, notes);
  }

  const Notes = {
    get(refId) {
      const n = notes[refId];
      return n ? n.text : "";
    },
    set(refId, text) {
      if (text && text.trim() !== "") {
        notes[refId] = { text, updatedAt: Date.now() };
      } else {
        delete notes[refId];
      }
      persist();
    },
    has(refId) {
      return !!(notes[refId] && notes[refId].text);
    },
    count() {
      return Object.keys(notes).length;
    },
    getAll() {
      return Object.keys(notes)
        .map((refId) => ({ refId, text: notes[refId].text, updatedAt: notes[refId].updatedAt }))
        .sort((a, b) => b.updatedAt - a.updatedAt);
    },
  };

  global.Notes = Notes;
})(window);
