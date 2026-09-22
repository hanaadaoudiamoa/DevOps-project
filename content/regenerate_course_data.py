#!/usr/bin/env python3
"""
Parses course_content.md (a highly-regular Markdown course document) into a
structured JSON tree, then writes it as js/course-data.js for the front-end
app. This is a build-time step -- the Markdown files remain the source of
truth for content; whenever course_content.md changes, re-run this script
(from anywhere) and the site picks up the new content with no UI code changes:

    python3 content/regenerate_course_data.py

It reads content/course_content.md next to this script and writes
../js/course-data.js relative to this script's location.
"""
import re
import json
import sys
import os

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "course_content.md")
OUT_JS = os.path.join(HERE, "..", "js", "course-data.js")

text = open(SRC, encoding="utf-8").read()
# normalize line endings
text = text.replace("\r\n", "\n")

PART_TITLES = {
    1: "Foundations of Cloud Computing",
    2: "Cloud Deployment Models",
    3: "Service Models: IaaS, PaaS, SaaS, and Beyond",
    4: "Architecture, Infrastructure, and Enabling Technologies",
    5: "Risks, Challenges, Security, and Governance",
    6: "Cloud Economics and Workload Management",
    7: "Cloud Management, Storage, Operations, and Applications",
    8: "Providers, Planning the Cloud Journey, and Mobile Cloud Computing",
}

# Core question / builds-on metadata transcribed from course_architecture.md section 2
PART_META = {
    1: {"coreQuestion": "What is cloud computing, and how do I recognize it?", "buildsOn": []},
    2: {"coreQuestion": "Where does the cloud live, and who can use it?", "buildsOn": [1]},
    3: {"coreQuestion": "What is being delivered as a service?", "buildsOn": [1, 2]},
    4: {"coreQuestion": "How is a cloud technically built and run?", "buildsOn": [3]},
    5: {"coreQuestion": "What can go wrong, and how is it managed?", "buildsOn": [3, 4]},
    6: {"coreQuestion": "What does it cost, and how are workloads run efficiently?", "buildsOn": [2, 3]},
    7: {"coreQuestion": "How is a cloud run day-to-day, and what is it used for?", "buildsOn": [4, 5]},
    8: {"coreQuestion": "How does an organization actually adopt the cloud, end-to-end?", "buildsOn": [1, 2, 3, 4, 5, 6, 7]},
}

EXPLANATION_HEADS = ("Simple Explanation", "Technical Explanation", "Example", "Why It Matters")


def strip(s):
    return s.strip("\n ").strip()


# ---------------------------------------------------------------------------
# Top-level split: preamble / Part 1..8 / Appendix A / Course Completion
# ---------------------------------------------------------------------------
part_pattern = re.compile(r"\n# PART (\d+) — (.+?)\n")
matches = list(part_pattern.finditer(text))
assert len(matches) == 8, f"expected 8 parts, found {len(matches)}"

appendix_match = re.search(r"\n# Appendix A — Glossary of Key Terms\n", text)
completion_match = re.search(r"\n# Course Completion\n", text)

preamble = text[: matches[0].start()]
how_it_works_m = re.search(r"## How This Course Works\n\n(.+?)\n\n---", preamble, re.S)
how_it_works = strip(how_it_works_m.group(1)) if how_it_works_m else ""

tagline_m = re.search(r"^# Cloud Computing.*?\n\n\*(.+?)\*", preamble, re.S)
tagline = strip(tagline_m.group(1)) if tagline_m else ""

part_bounds = [m.start() for m in matches] + [appendix_match.start()]

parts_out = []

for idx, m in enumerate(matches):
    num = int(m.group(1))
    title = m.group(2).strip()
    body = text[m.end(): part_bounds[idx + 1]]

    # --- Learning Objectives ---------------------------------------------
    lo_m = re.search(r"## Learning Objectives\n\n(.+?)\n\n(?=## )", body, re.S)
    objectives = []
    if lo_m:
        obj_block = lo_m.group(1)
        objectives = [strip(l[2:]) for l in obj_block.split("\n") if l.startswith("- ")]

    # --- boundaries: sections live between end of objectives and Practice heading
    practice_m = re.search(r"\n## Part \d+ — Practice\n", body)
    sections_text = body[lo_m.end() if lo_m else 0: practice_m.start()]
    practice_text = body[practice_m.end(): ]
    # trim trailing --- and whitespace
    practice_text = re.sub(r"\n---\s*$", "", practice_text)
    practice_text = strip(practice_text)

    # --- Numbered sections (## N.M Title) ---------------------------------
    sec_pattern = re.compile(r"^## (\d+\.\d+) (.+?)\s*$", re.M)
    sec_matches = list(sec_pattern.finditer(sections_text))
    sections = []
    for si, sm in enumerate(sec_matches):
        s_num = sm.group(1)
        s_title = sm.group(2).strip()
        s_start = sm.end()
        s_end = sec_matches[si + 1].start() if si + 1 < len(sec_matches) else len(sections_text)
        s_body = strip(sections_text[s_start:s_end])
        sections.append({
            "id": f"p{num}-s{s_num.replace('.', '-')}",
            "number": s_num,
            "title": s_title,
            "markdown": s_body,
        })

    # --- Practice block -----------------------------------------------------
    def slice_subsections(ptext):
        heads = ["Quick Questions", "Multiple Choice Questions", "Understanding Questions",
                 "Comparison Questions", "Scenario-Based Questions", "Exercises"]
        pat = re.compile(r"\n### (" + "|".join(re.escape(h) for h in heads) + r")\n")
        ms = list(pat.finditer("\n" + ptext))
        src = "\n" + ptext
        out = {}
        for i, mm in enumerate(ms):
            key = mm.group(1)
            start = mm.end()
            end = ms[i + 1].start() if i + 1 < len(ms) else len(src)
            out[key] = strip(src[start:end])
        return out

    sub = slice_subsections(practice_text)

    # Quick Questions --------------------------------------------------------
    quick_raw = sub.get("Quick Questions", "")
    qq_answers_m = re.search(r"\*\*Answers:\*\*\s*(.*)", quick_raw, re.S)
    qq_questions_block = quick_raw[: qq_answers_m.start()] if qq_answers_m else quick_raw
    questions = re.findall(r"^\d+\.\s+(.+)$", qq_questions_block, re.M)
    answers = []
    if qq_answers_m:
        ans_blob = " ".join(l.strip() for l in qq_answers_m.group(1).split("\n") if l.strip())
        # split on "N. " markers where N is 1,2,3...
        pieces = re.split(r"(?:(?<=^)|(?<=\s))(\d+)\.\s+", " " + ans_blob)
        # pieces alternates [ '', num, text, num, text, ... ]
        nums_texts = []
        i = 1
        while i < len(pieces) - 1:
            nums_texts.append((pieces[i], pieces[i + 1].strip()))
            i += 2
        answers = [t for _, t in sorted(nums_texts, key=lambda x: int(x[0]))]
    quick_questions = {"questions": questions, "answers": answers}

    # Multiple Choice Questions ----------------------------------------------
    mcq_raw = sub.get("Multiple Choice Questions", "")
    q_pat = re.compile(r"\*\*Question (\d+)\*\*\n(.*?)(?=\n\*\*Question \d+\*\*|\Z)", re.S)
    mcqs = []
    for qm in q_pat.finditer(mcq_raw):
        block = qm.group(2)
        ans_m = re.search(r"\*\*Answer:\*\*\s*(.+)", block, re.S)
        head = block[: ans_m.start()] if ans_m else block
        opt_pat = re.compile(r"^([A-D])\.\s+(.+)$", re.M)
        opts = opt_pat.findall(head)
        first_opt = opt_pat.search(head)
        question_text = strip(head[: first_opt.start()] if first_opt else head)
        answer_full = strip(ans_m.group(1)) if ans_m else ""
        am = re.match(r"([A-D])\.\s*(.*)", answer_full, re.S)
        mcqs.append({
            "number": int(qm.group(1)),
            "question": question_text,
            "options": [{"key": k, "text": strip(v)} for k, v in opts],
            "correct": am.group(1) if am else "",
            "explanation": strip(am.group(2)) if am else answer_full,
        })

    # Understanding Questions --------------------------------------------------
    uq_raw = sub.get("Understanding Questions", "")
    uq_pat = re.compile(r"^\d+\.\s+\*\*(.+?)\*\*\s*\n(.*?)(?=\n\d+\.\s+\*\*|\Z)", re.S | re.M)
    understanding = []
    for um in uq_pat.finditer(uq_raw):
        q = strip(um.group(1))
        rest = um.group(2)
        sa_m = re.search(r"\*Sample answer:\*\s*(.*)", rest, re.S)
        answer = strip(sa_m.group(1)) if sa_m else strip(rest)
        understanding.append({"question": q, "answer": answer})

    # Comparison Questions ------------------------------------------------------
    cq_raw = sub.get("Comparison Questions", "")
    cq_pat = re.compile(r"^\*\*(.+?)\*\*\s+—\s+(.+?)\n(.*?)(?=^\*\*.+?\*\*\s+—|\Z)", re.S | re.M)
    comparisons = []
    for cm in cq_pat.finditer(cq_raw):
        c_title = strip(cm.group(1))
        prompt = strip(cm.group(2))
        rest = cm.group(3)
        ans_m = re.search(r"\*Answer:\*\s*(.*)", rest, re.S)
        answer = strip(ans_m.group(1)) if ans_m else strip(rest)
        comparisons.append({"title": c_title, "prompt": prompt, "answer": answer})

    # Scenario-Based Questions ---------------------------------------------------
    sq_raw = sub.get("Scenario-Based Questions", "")
    sq_pat = re.compile(r"^\*\*Scenario:?\*\*\s*(.*?)\n(.*?)(?=^\*\*Scenario:?\*\*|\Z)", re.S | re.M)
    scenarios = []
    for sm2 in sq_pat.finditer(sq_raw):
        scenario_text = strip(sm2.group(1))
        rest = sm2.group(2)
        ans_m = re.search(r"\*Answer:\*\s*(.*)", rest, re.S)
        # scenario text might continue on following lines before *Answer:*
        if ans_m:
            extra = strip(rest[: ans_m.start()])
            if extra:
                scenario_text = strip(scenario_text + "\n" + extra)
            answer = strip(ans_m.group(1))
        else:
            answer = strip(rest)
        scenarios.append({"scenario": scenario_text, "answer": answer})

    # Exercises ----------------------------------------------------------------
    ex_raw = sub.get("Exercises", "")
    ex_pat = re.compile(r"^\*\*Exercise (\d+) — Difficulty:\s*(\w+)\*\*\s*\n(.*?)(?=^\*\*Exercise \d+ — Difficulty:|\Z)", re.S | re.M)
    exercises = []
    for em in ex_pat.finditer(ex_raw):
        enum = int(em.group(1))
        diff = em.group(2)
        rest = em.group(3)
        ps_m = re.search(r"\*Problem statement:\*\s*(.*?)(?=\n\*Expected task:\*)", rest, re.S)
        et_m = re.search(r"\*Expected task:\*\s*(.*?)(?=\n\*Solution)", rest, re.S)
        sol_m = re.search(r"\*Solution(?: \(sample\))?:\*\s*(.*)", rest, re.S)
        exercises.append({
            "number": enum,
            "difficulty": diff,
            "problem": strip(ps_m.group(1)) if ps_m else "",
            "task": strip(et_m.group(1)) if et_m else "",
            "solution": strip(sol_m.group(1)) if sol_m else "",
        })

    parts_out.append({
        "id": f"part-{num}",
        "number": num,
        "title": title,
        "coreQuestion": PART_META[num]["coreQuestion"],
        "buildsOn": PART_META[num]["buildsOn"],
        "objectives": objectives,
        "sections": sections,
        "practice": {
            "quick": quick_questions,
            "mcq": mcqs,
            "understanding": understanding,
            "comparison": comparisons,
            "scenario": scenarios,
            "exercises": exercises,
        },
    })

# ---------------------------------------------------------------------------
# Glossary (Appendix A)
# ---------------------------------------------------------------------------
appendix_text = text[appendix_match.end(): completion_match.start()]
row_pat = re.compile(r"^\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*$", re.M)
glossary = []
for row in row_pat.finditer(appendix_text):
    term_field, part_field, def_field = row.groups()
    if term_field.strip() in ("Term", "---") or set(term_field.strip()) <= {"-"}:
        continue
    terms = [t.strip() for t in term_field.split(",")]
    def_field = def_field.strip()
    # A few rows share one definition across several terms. Where the
    # definition is itself semicolon-separated in the same order as the
    # terms, give each term its own specific clause instead of the whole row.
    def_parts = [d.strip().rstrip(".") + "." for d in def_field.split(";")]
    per_term_def = def_parts if len(def_parts) == len(terms) else None
    for i, t in enumerate(terms):
        # "Public, Private, Community, Hybrid Cloud" -> normalize bare
        # adjectives to their full "___ Cloud" form for readability.
        if term_field.strip() == "Public, Private, Community, Hybrid Cloud" and t != "Hybrid Cloud":
            t = f"{t} Cloud"
        glossary.append({
            "term": t,
            "group": term_field.strip(),
            "part": part_field.strip(),
            "definition": per_term_def[i] if per_term_def else def_field,
            "related": [x for x in terms if x != t],
        })

# ---------------------------------------------------------------------------
# Course completion text
# ---------------------------------------------------------------------------
completion_text = strip(text[completion_match.end():])

data = {
    "title": "Cloud Computing",
    "tagline": tagline,
    "howItWorks": how_it_works,
    "parts": parts_out,
    "glossary": glossary,
    "completion": completion_text,
}

js_value = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
js_out = (
    "// Auto-generated from content/course_content.md by content/regenerate_course_data.py\n"
    "// Do not hand-edit -- regenerate this file after changing the course Markdown.\n"
    "window.COURSE_DATA = " + js_value + ";\n"
)
with open(OUT_JS, "w", encoding="utf-8") as f:
    f.write(js_out)

print("Wrote", os.path.abspath(OUT_JS))
print("Parts:", len(parts_out))
for p in parts_out:
    prac = p["practice"]
    print(f"  Part {p['number']}: {len(p['sections'])} sections, "
          f"{len(prac['mcq'])} mcq, {len(prac['understanding'])} understanding, "
          f"{len(prac['comparison'])} comparison, {len(prac['scenario'])} scenario, "
          f"{len(prac['exercises'])} exercises, quick_q={len(prac['quick']['questions'])} "
          f"quick_a={len(prac['quick']['answers'])}")
print("Glossary terms:", len(glossary))
