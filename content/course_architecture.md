# Cloud Computing Course — Architecture

This document describes **how the course is organized** — what the learner studies, in what order, how each part connects to the others, and how the source material maps onto the course structure. It does not contain lesson content itself; see `course_content.md` for the full teaching material.

---

## 1. Design Principles

The course architecture follows five principles:

1. **Progressive difficulty** — each Part assumes only what previous Parts have already taught. Part 1 assumes no prior cloud knowledge; Part 8 assumes mastery of Parts 1–7.
2. **Concept before mechanism, mechanism before consequence** — within a Part, "what a thing is" is taught before "how it works," which is taught before "what can go wrong with it" or "what it costs."
3. **Every Part is self-contained but cross-referenced** — a learner can jump directly to a Part as a reference, but "Why It Matters" callouts and inline notes point backward and forward so relationships between concepts are never left implicit.
4. **One consistent explanation pattern for hard concepts** — Simple Explanation → Technical Explanation → Example → Why It Matters — used whenever a concept is non-obvious to a beginner (e.g., virtualization, hypervisor types, brokered storage access, reserved capacity).
5. **Practice is mandatory, not optional, per Part** — every Part ends with the same seven practice components (Quick Questions, MCQs, Understanding Questions, Comparison Questions, Scenario Questions, Exercises), reinforcing retention and application before the learner advances.

---

## 2. Course Structure at a Glance

| Part | Title | Core Question Answered | Builds On |
|---|---|---|---|
| 1 | Foundations of Cloud Computing | What is cloud computing, and how do I recognize it? | (none — entry point) |
| 2 | Deployment Models | *Where* does the cloud live, and who can use it? | Part 1 (characteristics) |
| 3 | Service Models (IaaS/PaaS/SaaS + XaaS) | *What* is being delivered as a service? | Part 1 (utility model), Part 2 (deployment choice interacts with service choice) |
| 4 | Architecture, Infrastructure, Enabling Technologies | *How* is a cloud technically built and run? | Part 3 (service models are implemented on this architecture) |
| 5 | Risks, Challenges, Security & Governance | What can go wrong, and how is it managed? | Part 3 (CSA stack model boundary depends on service model), Part 4 (isolation/hypervisor failure risk) |
| 6 | Cloud Economics & Workload Management | What does it cost, and how are workloads run efficiently? | Part 2 (deployment choice drives cost), Part 3 (service model drives cost structure) |
| 7 | Management, Storage, Operations & Applications | How is a cloud run day-to-day, and what is it used for? | Part 4 (storage infrastructure), Part 5 (security-driven management tasks) |
| 8 | Providers, Planning & Cloud Journey, Mobile Cloud Computing | How does an organization actually adopt the cloud, end-to-end? | All previous Parts (synthesis) |

The order is deliberately **concept → mechanism → risk/cost → practice → synthesis**: a learner first understands *what* the cloud is and its major models (Parts 1–3), then *how* it's built (Part 4), then *what could go wrong and what it costs* (Parts 5–6), then *how it's actually run and used* (Part 7), and finally *how an organization puts it all together* (Part 8).

---

## 3. Mapping Source Material to Course Parts

| Course Part | Primary Source File(s) |
|---|---|
| Part 1 — Foundations | `01_cloud_computing_overview.md` |
| Part 2 — Deployment Models | `02_deployment_models.md` |
| Part 3 — Service Models | `03_service_models_iaas_paas_saas.md`, `04_other_as_a_service_models.md` |
| Part 4 — Architecture & Enabling Technologies | `05_architecture_and_infrastructure.md`, `06_enabling_technologies.md` |
| Part 5 — Risks, Security, Governance | `07_risks_and_challenges.md`, `10_security_governance_reliability.md` |
| Part 6 — Economics & Workload Management | `08_cloud_economics.md`, `09_workload_management.md` |
| Part 7 — Management, Storage, Operations & Applications | `11_cloud_management_and_storage.md`, `12_operations_and_applications.md` |
| Part 8 — Providers, Planning, Mobile Cloud Computing | `13_cloud_providers.md`, `14_planning_and_cloud_journey.md`, `15_mobile_cloud_computing.md` |
| Appendix A — Glossary | `00_glossary.md` (condensed and cross-referenced by Part) |

Two source files were **intentionally merged** rather than kept as separate Parts, because they cover the same underlying theme at different levels of depth:

- `07_risks_and_challenges.md` (high-level risk/challenge list) + `10_security_governance_reliability.md` (detailed security/governance mechanisms) → merged into **Part 5**, so the learner sees "what can go wrong" and "how organizations manage that" in one continuous narrative instead of two disconnected lessons.
- `11_cloud_management_and_storage.md` + `12_operations_and_applications.md` → merged into **Part 7**, since day-to-day management, storage, and operations/applications are all "running the cloud in practice" topics best taught together.

---

## 4. Internal Structure of Each Part

Every Part in `course_content.md` follows this fixed internal template:

1. **Learning Objectives** (3–5 bullet points, action-verb phrased: "explain," "describe," "distinguish," "select," etc.)
2. **Numbered sections** (e.g., 3.1, 3.2, …) covering the Part's subtopics in a logical sequence — generally moving from definitions → characteristics → benefits → issues/risks → real-world examples, mirroring how the source material itself is organized within each topic.
3. **Explanation blocks** for non-obvious concepts, using the four-step progression (Simple → Technical → Example → Why It Matters).
4. **Comparison tables** wherever the source material presents parallel structures (e.g., Public vs. Private benefits/disadvantages, Type 1 vs. Type 2 hypervisors, Managed vs. Unmanaged storage).
5. **"Why It Matters" call-outs** that explicitly connect the current concept back to characteristics, risks, or models introduced in earlier Parts.
6. **Practice section**, always containing, in this fixed order:
   - Quick Questions (recall)
   - Multiple Choice Questions (recognition, with answers)
   - Understanding Questions (explain-in-your-own-words, with sample answers)
   - Comparison Questions (contrast two related concepts, with answers)
   - Scenario-Based Questions (apply a concept to a realistic situation, with reasoning)
   - Exercises (difficulty-labeled, with a problem statement, expected task, and a complete solution)

This fixed template means a learner (or a platform importing this content) can always predict where to find objectives, core teaching, and assessment within any given Part.

---

## 5. Concept Dependency Map

The diagram below (in text form) shows which concepts *must* be understood before others can make sense — useful for sequencing an online course's unlocking logic or prerequisite gating.

```
Part 1: Core Characteristics (on-demand, pooling, elasticity, measured, broad access)
   │
   ├──> Part 2: Deployment Models (public/private/community/hybrid; continuum)
   │        │
   │        └──> Part 6: Economics (deployment choice drives cost strategy)
   │
   ├──> Part 3: Service Models (IaaS/PaaS/SaaS; IDaaS/NaaS)
   │        │
   │        ├──> Part 4: Architecture & Enabling Tech (how each service model is technically delivered)
   │        │        │
   │        │        └──> Part 5: Risks/Security (CSA stack model depends on service model layer;
   │        │                                      isolation/hypervisor risk depends on virtualization)
   │        │
   │        └──> Part 6: Economics & Workload Mgmt (service model drives cost/workload structure)
   │
   ├──> Part 7: Management, Storage, Operations, Applications
   │        (depends on Part 4's storage/infrastructure concepts and Part 5's security-driven tasks)
   │
   └──> Part 8: Providers, Planning, Mobile Cloud Computing
            (synthesizes ALL previous parts into an end-to-end adoption process;
             Mobile Cloud Computing specifically re-applies Part 1's value proposition,
             Part 4's virtualization/VM migration, and Part 5's security concerns to mobile devices)
```

**Key dependency notes:**

- A learner cannot meaningfully understand the **CSA Stack Model** (Part 5) without first understanding the **IaaS/PaaS/SaaS stack** (Part 3), since the security-responsibility boundary is defined *in terms of* that stack.
- A learner cannot meaningfully understand **Isolation Failure** as a risk (Part 5) without first understanding the **hypervisor and virtualization** (Part 4).
- A learner cannot meaningfully understand **Reserved Capacity** or **workload cost trade-offs** (Part 6) without first understanding **service and deployment models** (Parts 2–3), since the economic value of each option is defined relative to those models.
- **Part 8 is a deliberate capstone**: none of its planning phases, starting points, or business/implementation considerations can be usefully applied without the vocabulary and models from every earlier Part.

---

## 6. Assessment Strategy Across the Course

| Practice Component | Purpose | Cognitive Level (approx.) |
|---|---|---|
| Quick Questions | Immediate recall check right after core teaching | Remember |
| Multiple Choice Questions | Recognition among plausible distractors; catches subtle misunderstandings (e.g., risk vs. characteristic) | Remember / Understand |
| Understanding Questions | Forces the learner to reconstruct an explanation in their own words, revealing whether the underlying model — not just the vocabulary — was learned | Understand |
| Comparison Questions | Tests whether the learner can correctly distinguish two related-but-different concepts (a common source of confusion in this domain, e.g., IaaS vs. PaaS, scalability vs. elasticity) | Analyze |
| Scenario-Based Questions | Tests transfer: can the learner apply a concept to a *new*, realistic situation not verbatim in the material? | Apply / Analyze |
| Exercises | The highest-stakes component: requires producing a complete artifact (a recommendation, a justification memo, a classification with reasoning) and includes a full worked solution for self-correction | Apply / Evaluate / Create |

Difficulty labels on Exercises (Easy / Medium / Hard) increase within a Part and, on average, across Parts — Part 1's exercises are Easy/Medium, while Part 6 and Part 8 include Hard exercises requiring the learner to combine multiple concepts (e.g., cost categories *and* workload types; MCC architecture types *and* real-world classification).

---

## 7. Suggested Pacing for an Online Course Build

| Session | Part(s) Covered | Rationale |
|---|---|---|
| 1 | Part 1 | Establishes vocabulary and the five characteristics used everywhere else. |
| 2 | Part 2 | Short, self-contained, builds directly on Part 1. |
| 3 | Part 3 | Longest conceptual Part (three full service models + two XaaS examples); may be split into two sessions (IaaS/PaaS/SaaS, then IDaaS/NaaS) if the platform prefers shorter modules. |
| 4 | Part 4 | Technical deep-dive; benefits from being taught close to Part 3 since it explains *how* those service models are actually delivered. |
| 5 | Part 5 | Should immediately follow Part 4, since several risks (isolation failure) and the CSA Stack Model depend on Part 3/4 concepts. |
| 6 | Part 6 | Economics naturally follows risk/security, since real-world adoption decisions weigh cost against the risks just covered. |
| 7 | Part 7 | Practical, applied; lower cognitive load than Parts 4–6, useful as a "lighter" session after the denser risk/economics material. |
| 8 | Part 8 | Capstone; should be scheduled last, ideally with a larger integrative exercise (see Part 8's Hard exercises) as a course-ending project. |

This pacing is a **suggestion for a course-builder**, not a rigid requirement — because every Part is self-contained (per Section 1's Design Principles), a platform could also expose all eight Parts as independently searchable reference modules rather than a strictly linear sequence, while still using this document's dependency map (Section 5) to power "recommended prerequisite" links.
