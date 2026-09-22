# Cloud Computing — Interactive Course

A self-contained, interactive learning platform for the Cloud Computing course:
structured lessons, a visual course journey, an interactive IaaS/PaaS/SaaS
layer explorer, scored knowledge checks, exercises with hints/solutions,
a searchable glossary, notes, and bookmarks — all in plain HTML/CSS/JS.

## Running it

There's nothing to build or install. Open `index.html` directly in a browser,
or serve the folder with any static file server. All progress, notes, and
bookmarks are saved to your browser's `localStorage`, so they persist between
visits on the same device/browser.

## Project structure

```
cloud-computing-course/
├── index.html                 # App shell (sidebar, topbar, content areas, modal)
├── css/
│   ├── style.css              # Design tokens, typography, layout grid
│   ├── components.css         # All component styles (cards, quiz, glossary…)
│   └── responsive.css         # Tablet/mobile breakpoints
├── js/
│   ├── course-data.js         # GENERATED — the parsed course content (see below)
│   ├── markdown.js            # Tiny Markdown → HTML renderer
│   ├── progress.js            # localStorage progress/quiz/exercise tracking
│   ├── notes.js               # Per-lesson notes
│   ├── bookmarks.js           # Lesson & glossary-term bookmarks
│   ├── glossary.js            # Glossary indexing + rendering
│   ├── quiz.js                # Practice section rendering & scoring
│   ├── search.js              # Client-side search index
│   ├── timeline.js            # Course journey, concept map, stack widget
│   ├── course.js              # Sidebar, breadcrumbs, lesson/page rendering
│   └── app.js                 # Routing + all event wiring
├── content/
│   ├── course_content.md              # Source of truth for all lesson text
│   ├── course_architecture.md         # Source of truth for course structure
│   └── regenerate_course_data.py      # Rebuilds js/course-data.js from the .md above
└── assets/
    └── favicon.svg
```

## Updating the course content

`course_content.md` is the source of truth. The site does **not** parse
Markdown in the browser at runtime — instead, `content/regenerate_course_data.py`
parses it once into `js/course-data.js` (a plain JS object literal). This
avoids `file://` CORS restrictions on fetching local files (so the site works
by just double-clicking `index.html`, with no server required) and keeps the
runtime code simple.

To update the content:

1. Edit `content/course_content.md` (keep the existing structure: `# PART N —
   Title`, `## N.M Section Title`, the `## Part N — Practice` block with its
   six fixed subsections, etc. — the parser relies on this consistent shape).
2. Regenerate the data file:
   ```
   python3 content/regenerate_course_data.py
   ```
3. Refresh the site. No other code changes are needed for ordinary content
   edits (new lessons, edited text, new quiz questions, etc.).

If you restructure a Part's heading pattern in a way the parser doesn't
expect, check `content/regenerate_course_data.py` — it's a single script with
one clearly-named function per content block type (Quick Questions, MCQs,
Understanding/Comparison/Scenario questions, Exercises, Glossary).

## Notes on a couple of design choices

- **Exercises show a "Hint" before a "Solution".** The source Markdown
  doesn't include separate hint text, so the *Expected Task* line is used as
  the hint (a nudge toward the approach) and the full *Solution* is the
  second, stronger reveal — both real course content, nothing invented.
- **The Course Map** shows the primary prerequisite chain from
  `course_architecture.md` §5, plus every Part's dependency into Part 8. It's
  a guide, not a lock — every Part is independently accessible, matching the
  architecture doc's "self-contained Parts" design principle.
