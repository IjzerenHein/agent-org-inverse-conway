# Known issues

## Version 0.2

Version 0.2 repairs the 29 findings listed below. The shared formats, role contracts and sentences were written once by a single writer, reviewed by a fresh agent (8 major and 7 minor findings, all applied), and every skill was then rebuilt against them. `shared/CONTRACTS.md` records, per finding, which part changed what.

What has been checked: the sync drift check, strict plugin validation, frontmatter fields, self-containment of every skill, and that every asset a skill names exists.

What has not been checked: a second pass over all parts together, of the kind that found these 29. Until that has run, treat the fit between the parts as repaired but unverified. The kit has also not been used on a real project yet.

## Findings in version 0.1, repaired in 0.2

Each skill and agent definition in version 0.1 was written, reviewed and repaired on its own. A consistency pass then read all of them together and found the problems below, listed as that pass reported them.

## 1. Blocker

**Where:** skills/spec/SKILL.md (step 7, After approval); skills/spec/assets/pending-acceptance-entry-template.md; skills/retro/SKILL.md (Paths, step 8); agents/builder.md; agents/checker.md

**Issue:** Nobody closes a pending-acceptance entry when its slice lands. The spec skill closes it only when the spec is withdrawn or superseded. The builder may not edit it, the checker is read-only, and the retro skill says it only reads that ledger. Retro step 8 counts a spec as shipped only when "no pending-acceptance entry for it is open". As written, a spec with a check for new behaviour can never ship, and nothing moves its checks from the pending run into the blocking run.

**Proposed fix:** Name one writer in all three places. Suggested wording: "the project's post-merge script closes the entry with the run id in which every listed check passed on the default branch; where no such script exists, the steward closes it in an ordinary change". Put this in the spec skill's After approval section and in the template's `status` comment. In retro step 8, list the entries whose checks are green on the default branch and propose the close to the steward, never close it silently. In retro Paths, change `pending-acceptance` from read-only to "proposes closes".

## 2. Major

**Where:** agents/spec-critic.md (Output contract, What to look for); skills/spec/assets/critic-brief.md (Check, Output contract); skills/spec/SKILL.md (steps 11 and 12, Done when)

**Issue:** The spec-critic has two contracts that do not match, and spec step 12 consumes only one of them. The brief returns YAML with `violations` and `batches`; each question has `blocking` and `options`. The agent returns Markdown with `Defects` (blocker, major, minor) and questions with `default` and no `blocking` flag. With the agent, the skill cannot apply "a blocking one stops approval", and its "critic reports no violations" has no counterpart: the agent reports minor defects by design. Batching also differs: the agent batches per section owner, the skill and brief per section owner, value owner and steward. The agent's `default:` field collides with "default if silent", while the skill says silence never answers a question. The check lists differ too. The brief checks `computed-by` and hand-listed `affects`, pending-acceptance registration, lens design-time answers, the `observed` horizon, fits-one-context, no-spec-needed and leftover template comments. The agent checks that `touches` paths exist, `touches` width, lens `source` and `unvalidated` lines, attestation validity and that the kind fits the end state. The agent also ignores section 8, so it can re-ask questions already in the ledger.

**Proposed fix:** Make one contract and ship it twice, byte-identical in its numbered check list and output structure: once as `agents/spec-critic.md`, once as `assets/critic-brief.md`. Use the union of both check lists, numbered. One output: `violations` (check number, severity, field, evidence) and `batches` per owner (section owner for sections 1 to 3, value owner per acceptance id, steward for the rest), each question with `blocking` and `options`. Rename `default` to `options`. Add the rule "do not re-ask an entry listed in section 8". Change the spec skill's Done when to "the critic reports no blocker or major violation". Make step 12 refer to the fields by these names.

## 3. Major

**Where:** skills/spec/assets/spec-template.md (section 4 Acceptance); agents/builder.md (Output contract: `command`); skills/spec/assets/pending-acceptance-entry-template.md

**Issue:** The builder must report, per acceptance id, "the command the spec declares for this id, unchanged". The spec's acceptance block has no command field. Its fields are Covers, Type, Statement, Oracle, Value owner, Value, Check or rubric, Evidence and Horizon. The command exists only in the pending-acceptance entry (`checks[].command`), which the builder is never told to read, and only for checks of new behaviour.

**Proposed fix:** Add a `- Command:` line to the acceptance block in spec-template.md (how to run the check; "n/a" for judged and observed ids). Add it to spec step 6, to the critic's acceptance check and to the spec skill's Done when. Keep `checks[].command` in the pending-acceptance template as a copy of that line. Leave the builder's wording as it is.

## 4. Major

**Where:** skills/spec/SKILL.md (step 13); skills/spec/assets/spec-template.md (header); agents/builder.md (Stop with blocked, first bullet); agents/checker.md (step 3)

**Issue:** A spec has no approval marker, yet the builder must stop unless it finds "every section owner's approval where the project records it (in the spec, or on the merged pull request)". The template has no approval or status field. The spec skill says approval happens in the hosting UI and that the approver is named in a commit trailer, which is never given a name. The builder does not mention the trailer at all, and ignores the value owners, who also approve. Every other artefact has a marker: vision `Status`, profile `approval.*`, adr `status` with `decision-pointer`.

**Proposed fix:** Define it once and use the same sentence in spec step 13, the template preamble and the builder. Suggested: "A spec is approved when it is on the default branch and the commit that put it there carries one trailer `Spec-approved-by: <name> (<sections or acceptance ids>)` per section owner and value owner." The builder checks with `git log` on the spec path and stops `blocked` if a named owner has no trailer. The checker's presence-at-base test stays as it is.

## 5. Major

**Where:** agents/builder.md (Input and reading order; blocked block); skills/spec/assets/spec-template.md (`depends-on`, sections 8 and 9); skills/spec/SKILL.md (After approval)

**Issue:** The builder ignores three spec fields. `depends-on` is never checked, though the template says these are specs this one "must follow". Section 8, Open questions, is never checked for an open blocking entry. Section 9, Appended after approval, is never read, although T1 and the spec skill make it the only channel for later learning, and the spec-critic does read it. So the blocked loop has no return path. The builder stops with a question, the spec may not be rewritten, the owner's answer can only arrive as an appended pointer, and the restarted builder does not read it. No skill says who turns the builder's `blocked.question` into a questions entry. Routing also differs: the builder sends questions to a section owner or the steward, while the spec skill and the critic send acceptance questions to the value owner.

**Proposed fix:** Builder reading order, step 1: add `depends-on` (stop `blocked` while a named spec is still open), section 8 (stop on an open blocking entry) and section 9 (read every pointer and the entries it names). In the builder's `blocked`, make `section_owner` "the section owner, the id's value owner for an acceptance question, or the steward". Add this to the spec skill's After approval: "A builder's blocked question becomes a questions ledger entry (blocking: true). Its answer is appended to section 9 as a pointer to the closed entry, and the builder is restarted from the spec path. An answer that changes intent, scope or an acceptance value means withdrawn plus a new spec."

## 6. Major

**Where:** agents/checker.md (steps 3 and 6); skills/spec/assets/spec-template.md (Check or rubric, Evidence); skills/spec/SKILL.md (step 7)

**Issue:** For `judged` ids the checker expects three things the spec chain never produces. First, a rubric "in the spec", where the verdict is `not met` if the spec lacks one; the template puts the rubric at a path outside `touches`, and that path is not among the checker's readable inputs ("the sources it pins"). Second, "the pass mark the rubric states", though neither the spec skill nor the template asks for one. Third, an attestation "bound to a commit". The template only says "an attestation file", and no skill defines its location or fields. The adopt attestation and the adr facts entry carry validity dates and no commit.

**Proposed fix:** Checker steps 3 and 6: read the check or rubric at the path the acceptance id names, as of the base. Spec step 7 and the template comment: a rubric lists its criteria and states a pass mark, both given by the value owner. Add `assets/attestation-template.md` to the spec skill with the fields acceptance id, attester (name, role), commit, date and scores per criterion. Name its default location, for example beside the rubric or in a path given in the Evidence line. Have the checker and roadmap re-plan step 1 refer to those fields.

## 7. Major

**Where:** agents/checker.md (input 7, step 1); skills/adopt/SKILL.md (step 0.6); skills/adopt/assets/adoption-template.md (row 0.4); skills/profile/assets/profile-template.yml

**Issue:** The checker accepts `base-checkout: not required` when "the profile path and line that says so" come with it. V5 makes the base checkout part of the invariant core, and the adopt skill says review agents run from a base checkout "whatever row 0.4 shows". The profile template has no field that could carry such a line. The switch contradicts the core and points at a profile field that does not exist.

**Proposed fix:** Remove input 7 and the "unless not required holds" clause from the checker. The base checkout is always required. Keep only the `execution` switch.

## 8. Major

**Where:** skills/profile/assets/profile-template.yml (overlays, P2, P3); skills/profile/SKILL.md (step 7); readers: skills/roadmap/SKILL.md (Before you start 4, step 11), skills/spec/SKILL.md (step 5), skills/lens-placement/SKILL.md (Inputs), skills/retro/SKILL.md (Paths), agents/spec-critic.md (input 5), agents/checker.md (step 6), skills/adopt/SKILL.md (step 4.3)

**Issue:** Six artefacts read "ownership paths and their owners" from the profile, but the template has no such table. Owners appear only on `overlays`, and the profile skill writes an overlay only where a dial differs, so a project with uniform dials records no ownership paths. The spec skill's fallback (ask the steward) covers only a missing profile. The checker then voids every `judged` attestation on any later commit, because it "cannot establish those paths". Path classes are also read by several artefacts: P2 `paths_they_may_approve`, P3 `decision_rights`, the roadmap's approver rule, and the guard that "derives gates from the path classes touched" for the pilot's no-spec fix. No table maps a class name to globs and gates.

**Proposed fix:** Add two root tables to profile-template.yml, asked in interview topic 1. First: `ownership_paths: [{ path: , owner: , boundary: , source: , basis: }]`. Overlays then refer to a path from this table. Second: `path_classes: [{ name: , paths: [], gates: [], reversible: , source: , basis: }]`. List both in the profile skill's Done when. Make each reader name the key it uses (`ownership_paths`), and the checker name `ownership_paths[].owner`.

## 9. Major

**Where:** skills/profile/assets/profile-template.yml (P2 `payback_metric`); skills/profile/SKILL.md (P2 row); skills/adopt/SKILL.md (step 1.2); skills/adopt/assets/adoption-template.md (row 1.2, Payback block); skills/retro/SKILL.md (step 7)

**Issue:** Adopt gates step 2 on the profile declaring "the payback metric and what value counts as paid back". Its template also points at who declared it and when. The profile template has one free-text `payback_metric:` field, and the profile interview asks only "What is the payback metric?". The retro gives a verdict of "paid back, not yet" against a threshold no field holds. Adopt sends the owner back to the profile skill, which has nowhere to put the answer.

**Proposed fix:** Split the field in the profile template: `payback: { metric: , paid_back_when: , evidence_source: , declared_by: , declared_on: }`. Add "and what value counts as paid back, measured from what?" to the profile skill's P2 question. Point adopt row 1.2 and retro step 7 at `dials.P2.payback.*`.

## 10. Major

**Where:** skills/adopt/SKILL.md (batch 1, step 1.4); skills/profile/SKILL.md (step 9); skills/roadmap/SKILL.md (batch 3); skills/roadmap/assets/roadmap-template.md (M0 Preconditions); skills/profile/assets/profile-template.yml

**Issue:** Three skills give three rules for governance onboarding, and the profile has no field for it. Adopt decides by rule (P10 b or c, or P11 naming "any limit"); since P11 always holds an allowlist, that is nearly always true. The profile skill says "ask the owner ... do not decide it yourself". The roadmap reads "the governance onboarding the profile demands" from a profile that cannot state it. Adopt also asks the same question before step 0, in batch 1.

**Proposed fix:** Add this to the profile template: `governance_onboarding: { needed: , approvers: [], requires: , source: owner | assumed, basis: }`. The profile skill asks it in step 9 and records the owner's answer. Adopt row 1.4 and roadmap M0 Preconditions read that key, with `n-a` when `needed: false`. Adopt batch 1 keeps only the pre-read stop question and points to the profile for the rest.

## 11. Major

**Where:** skills/roadmap/SKILL.md (Before you start 2); skills/vision/SKILL.md (steps 2, 9, 11); skills/profile/SKILL.md (Rules: approval); skills/adopt/SKILL.md (step 1.3)

**Issue:** "Approved" has conflicting tests. The roadmap accepts a vision or profile that is "on the default branch, merged through the project's review path". A vision with `Status: draft` and a `Drafted with:` line can be on the default branch, and the vision skill says a draft is not a base for the roadmap. A profile with `approval.status: proposed` can also be merged; the profile skill says a reader treats anything without `approved_in` as proposed. Adopt 1.3 accepts an attestation as profile approval and never looks at `approval.status` or `approved_in`, while the profile skill accepts only the approver's own commit or hosting-UI approval. No reader (spec, adr, retro, lens-placement, builder) says what it does with a `proposed` profile, a state every row update puts it in.

**Proposed fix:** Use one test everywhere. A vision is approved when it says `Status: approved YYYY-MM-DD`, has no `Drafted with:` line and is on the default branch. A profile is approved when `approval.status: approved`, `approved_in` is filled and it is on the default branch. Use these sentences in roadmap step 2 and adopt 1.3, and drop the attestation route there. Add one line to every reader: "If the profile is `proposed`, say so. Use its paths. For dial values use the last approved version (`git show <approved_in>:docs/process/profile.yml`), or the stricter of the two values."

## 12. Major

**Where:** skills/adopt/SKILL.md (steps 1 to 4); skills/adopt/assets/adoption-template.md; skills/roadmap/SKILL.md (Before you start); skills/spec/SKILL.md (batch 2 "Serves"); skills/vision/SKILL.md (step 10)

**Issue:** The chain is broken between adopt and the vision and roadmap skills. The README says to start with adopt, but adopt has no row or step for a vision or a roadmap. They appear only as destinations for old plans in step 3, and as something adopt may "offer options from" in step 4. The roadmap still requires an approved vision and profile, and the pilot spec asks which vision section or milestone it serves. Two hand-backs are also lost. The vision skill says the memory import line is "adoption work" when `AGENTS.md` does not exist yet. Adopt step 3 has no procedure step that creates `AGENTS.md`, `CLAUDE.md` and the lens index, and no row for the vision line.

**Proposed fix:** Add rows to the adoption checklist and steps to the skill. Row 1.5: vision approved (vision skill). It may run before or beside the profile and is needed before 4.x. Row 3.d: `AGENTS.md` with lens index and `CLAUDE.md` created as an ordinary change. Row 3.e: vision import line present. Row 3.f: roadmap approved (roadmap skill), before pilot item 4.2 (brownfield) or 4.1 (greenfield). Mark the vision and roadmap rows as kit additions to the five bootstrap steps.

## 13. Major

**Where:** skills/adopt/SKILL.md (rule 6, step 2, batch 2); skills/adopt/assets/adoption-template.md (step 2 tables, rows 2.7, Payback time-box); skills/roadmap/SKILL.md (step 7, batch 3); skills/roadmap/assets/roadmap-template.md (M0 block); skills/roadmap/references/m0-and-dials.md; skills/profile/references/glossary.md (M0)

**Issue:** Two artefacts track the same walls, and "M0" means different things in them. The adoption checklist holds the six global M0 rows with draft, applied-by and evidence. The roadmap template's M0 block has the same six walls with Exists and Evidence, plus exit rows M0-E1 to E6. That gives two writers for one fact (T2), and breaks adopt's own "never restates" rule. Adopt rule 6 says verification is "never added to M0". The roadmap and the glossary say M0 closes every P8 `no` row on near paths, and the roadmap puts staging in M0 as well. Adopt tracks those P8 rows per pilot item instead. The wall time-box is asked twice (adopt batch 2, roadmap batch 3). At P6 c, adopt makes the exports a fixed row 2.7, while the roadmap reference says to ask the harness owner whether they belong in M0. The P6 a ordering question is likewise asked and recorded in two places.

**Proposed fix:** Give wall state one home: the adoption checklist. In roadmap-template.md the Walls table becomes "see adoption checklist rows 2.1 to 2.7 at `<path>`" when a checklist exists; keep the table only for projects without one. M0-E1 to E6 collapse into one exit row that cites those rows. Roadmap batch 3 reads the time-box and the P6 orderings from the checklist and does not re-ask. Fix the vocabulary once: "global M0" is the six walls; "M0" is global M0 plus the P8 `no` rows and staging on near paths. Adopt rule 6 ends with "never added to global M0". Adopt row 2.7 adopts the roadmap's wording (ask the harness owner) or the reverse; pick one.

## 14. Major

**Where:** skills/adopt/SKILL.md (step 4.5); skills/adopt/assets/adoption-template.md (Keep or cut); skills/retro/SKILL.md (step 7, Rules: floor); skills/retro/assets/retro-note-template.md (Payback)

**Issue:** Keep-or-cut at the end of the pilot lives in two skills, with two records and two different floors. Adopt excludes the six global M0 rows, the design and release gates and `mandated control`. Retro excludes T1 to T6, V1 to V7, the gates, global M0, registered controls and anything guarding a P9 c path or surface. The retro description says to use it "at the end of a ... pilot". Both skills assemble measured against declared, and both record the decision: the adoption checklist table and the retro note's Decisions.

**Proposed fix:** Give it one home. Adopt 4.5 hands over to the retro skill for the measurement, the cut candidates and the decisions; the retro note is the record. The checklist's keep-or-cut table keeps only component, pointer to the retro decision row, and the change (commit, applied by). Use the retro's floor text verbatim in adopt. Keep in adopt only what is specific to it: wanting a floor item gone means status `stopped`.

## 15. Major

**Where:** skills/spec/SKILL.md (step 5, rule 8); skills/spec/assets/critic-brief.md (check 9); skills/spec/assets/spec-template.md (`irreversibility`, `touches`); skills/adr/SKILL.md (step 7, step 8); skills/adr/assets/adr-template.md (`irreversibility`, `covers`); skills/profile/assets/profile-template.yml (P9, overlays comment, release_surfaces)

**Issue:** The irreversibility class is read from the wrong place and written in two vocabularies. The spec skill and the critic brief take P9 from the profile's "overlays and its release-surfaces table". The release-surfaces table has no P9 value. P9 per path and per surface lives in `dials.P9.rows`, with `dials.P9.value` as the rest. The overlays comment also lists P9 twice, as overlayable and as "rows instead of overlays". The spec writes `a | b | c`, with c for any externally visible effect. The adr writes the profile value, or the literal `irreversible (externally visible effect, V6)`, or `unclassified`. The adr's `covers` includes release surfaces, but the spec's `touches` and `affects` hold only paths and objects. "Every release surface in `touches`" therefore cannot be evaluated, and no table maps a surface to the paths that ship through it.

**Proposed fix:** Use one lookup sentence in the spec skill, the critic brief, adr step 7, the builder and the retro: "the strictest value over `dials.P9.rows` (path rows and surface rows) and any overlay, else `dials.P9.value`; c when the effect is externally visible or a covered surface's `audience` is outside the project (V6)". Remove P9 from one of the two overlay comment lines. Add `surfaces: []` (names from `release_surfaces`) to the spec header's `touches` and `affects`, and add `paths: []` to each release-surfaces row. Make the adr use `a | b | c | unclassified`, with the V6 reason in `irreversibility.source`. Step 8 then reads "not c and not unclassified".

## 16. Major

**Where:** agents/researcher.md (description, Inputs, Output contract); skills/adr/SKILL.md (step 4); skills/adr/assets/research-brief.md; skills/roadmap/SKILL.md (step 4); skills/adopt/SKILL.md (step 4.3)

**Issue:** There are three researcher contracts, and no skill names the kit's researcher definition. The adr fan-out uses `assets/research-brief.md`. Its inputs are the record, an option letter and what may be read. Its output is a Claims table, Costs and limits, What this option closes off and Unknowns, and it forbids recommending. The roadmap fan-out gives "one question entry by path" and expects a bare list of claims. The agent wants a question, allowed sources, "the path of the decision record or findings entry" and, with no profile, the constrained systems. It returns five sections with confidence and `evidenced | hypothesis`, and makes an early return on a missing input. For the roadmap there is no record or findings entry to feed. For the adr without a profile, the brief never supplies the constrained systems. Both calls trip the agent's early return. The spec skill solved the same problem by naming the agent definition and shipping the brief as the fallback; the adr and roadmap skills did not.

**Proposed fix:** Make the five-section output contract (Question, Findings, Options, Open questions for a human, Sources not reached) the one shape. Rewrite adr `research-brief.md` to it; per-option use leaves Options as `none` and puts costs and closes-off under Findings. Ship the same brief in the roadmap skill's assets. Add this to adr step 4 and roadmap step 4: "If your tool has the kit's researcher agent definition, use it; otherwise start a fresh sub-agent with `assets/research-brief.md`". List the four inputs to pass, including the constrained systems. Widen the agent's input 3 to "the artefact your output feeds: a decision record, a findings entry, a questions entry or a roadmap".

## 17. Major

**Where:** skills/profile/assets/question-entry-template.md; skills/vision/assets/question-entry-template.md; skills/roadmap/assets/question-entry-template.md; skills/adr/assets/question-entry.md; skills/spec/assets/question-entry-template.md; inline formats in skills/adopt/SKILL.md, skills/retro/SKILL.md, skills/lens-placement/SKILL.md

**Issue:** The questions ledger has five template schemas and three inline ones.
- Discriminator: `kind: question` (profile, roadmap, adr), `ledger: questions` (spec), none (vision).
- Date: `raised_on`, `asked`, `raised`, `opened`, or a "Raised:" bullet.
- Who can answer: `can_settle`, `owner`, `for`, or a "Who can answer" bullet.
- Closing: `closed_by` with `closed_on`; `closed-by` with `closed-pointer` and `closed-on`; `closed-by` alone; or a body line.
- Status sits in frontmatter everywhere except vision, where it is a body bullet.
- Only spec has `blocking`.
- Profile uses snake_case keys; the rest use kebab-case.
- The file is named `question-entry.md` in adr and `question-entry-template.md` elsewhere.
Readers rely on these fields: roadmap "open entries", the profile re-profile "if it has closed", and spec "no blocking entry open". Only vision and spec say to match an existing ledger's format, so the first skill to run decides the format for some skills and not for others.

**Proposed fix:** Use one schema, shipped byte-identical as `assets/question-entry-template.md` in every skill that writes questions. That means adding the file to adopt, retro and lens-placement, and renaming it in adr. Frontmatter: `ledger: questions`, `id`, `status: open | closed`, `raised`, `raised-by`, `can-answer`, `blocks`, `blocking: true | false`, `closed-by`, `closed-on`, `closed-pointer`. Body: H1 question, Why it matters, Options, Working assumption, Answer, Pointers. Skill-specific needs go into `blocks` (file, field or milestone). Put the "match an existing ledger's format" sentence in every skill or in none.

## 18. Major

**Where:** skills/adr/assets/fact-entry.md; skills/adopt/SKILL.md (Ledger entries this skill writes); skills/lens-placement/references/homes.md (step 5 attested line); agents/researcher.md (Findings evidence); agents/spec-critic.md (Sources and claims)

**Issue:** The facts ledger has three definitions. The adr template covers attestations only, with `valid-from`, `valid-to`, `confirmed` and `status: draft | attested | expired | voided`. Adopt's spike facts are reproductions (command, tool and version, verbatim result, who ran it) and say "valid until". The profile uses `valid_until`, and the escape template says "valid to". The adr template cannot hold adopt's spike entries. The adr says an unconfirmed entry counts as `hypothesis`. The researcher and the spec-critic accept any facts entry with name, role and dates, and never check `status: attested` or `confirmed`. A drafted, unconfirmed attestation can therefore pass as evidence.

**Proposed fix:** Ship one `assets/fact-entry-template.md`, identical in adopt and adr and referenced by homes.md. It takes `ledger: facts` and `evidence: reproduction | quote | attestation`. It has a reproduction block (`command`, `tool-version`, `result`, `run-by`, `run-on`) and an attestation block (`attested-by`, `role`, `valid-from`, `valid-until`, `said-where`, `confirmed`). Status is `draft | attested | recorded | expired | voided`. Use `valid-until` everywhere. In the researcher and the spec-critic, a facts entry counts only when its status is `attested` or `recorded`; `draft` is `hypothesis`.

## 19. Major

**Where:** skills/profile/SKILL.md (Procedure step 1, Re-profiling); hand-overs from skills/roadmap/SKILL.md (step 7, re-plan 3 and 6), skills/spec/SKILL.md (step 5), skills/adr/SKILL.md (step 2, step 7), skills/retro/SKILL.md (steps 7, 11)

**Issue:** Four skills hand row-level updates to the profile skill: P8 rows and release surfaces after M0 or a milestone bought verification; a P9 classification for an unlisted path; a gates row for decision records; and a missing payback metric. The profile skill has two modes, a fresh start and re-profiling, and re-profiling starts with "ask which trigger fired" among stage, team, regulator and model. None of these hand-overs is such a trigger. The receiver does not expect the input.

**Proposed fix:** Add a third mode, "Row update", to the profile skill. Inputs are the keys to change and the pointer that justifies each: an evidence id, a closed questions entry or the owner's answer. Re-check `observed` values among them. Apply the always-asked rule. Set `approval.status: proposed`. Summarise only what changed. Have the calling skills name "the profile skill, row update".

## 20. Major

**Where:** skills/adr/SKILL.md (steps 10 and 11); skills/adr/assets/adr-template.md (Lenses, specs and walls to change); skills/lens-placement/SKILL.md (description, step 2, fifteen steps); skills/retro/SKILL.md (steps 4 and 5)

**Issue:** Residue and escape placement is done twice, with different rules. The lens-placement description claims "when a decision record leaves residue" and "when an escape or a retro asks for a lens or a check". Neither the adr skill nor the retro skill mentions it. The adr skill places residue itself. It covers only clauses 2 and 3 plus a fixed list of lens homes, and never asks the reach question. At P5 b or c it will therefore put a memory line or a path-scoped rule where lens-placement says those homes do not count. Retro and lens-placement step 8 both apply the promotion ladder. Retro counts earlier entries "with the same cause" and stores `occurrence`; lens-placement recounts "entries on the same clause".

**Proposed fix:** Adr steps 10 and 11: keep extracting and confirming invariants. Then hand each invariant, and each thing that must be known, to the lens-placement skill with the record's path as origin and `source: record residue`. Copy its table rows into the record's "to change" table. Keep the hardcoded home list only as the fallback when that skill is not installed. Retro step 4: a lesson that needs a lens goes to lens-placement with the escape entry's path. Lens-placement step 8 reads `occurrence` and `blast-radius` from the escape entry and does not recount.

## 21. Major

**Where:** skills/retro/SKILL.md (step 9); skills/spec/SKILL.md (After approval); skills/spec/assets/spec-template.md (probe line, header); skills/roadmap/SKILL.md (re-plan 2)

**Issue:** Retro extends a probe's expiry "through the spec skill". The spec skill forbids rewriting an approved spec and has no amend procedure; by its rules a changed expiry means `withdrawn` plus a new spec. The expiry also sits in a body line of the template, not in the header that "scripts read", so the retro must parse prose to find expired probes. The experiments entry uses `kind: product | ablation`, which collides with `kind:` as the ledger discriminator in other templates and with work-item kinds. No template asset exists for experiments or obligations entries, although the roadmap reads their expiry and due dates.

**Proposed fix:** Add `expiry: ""` (probe only) to the spec header. Record an extension as an appended row in section 9 (date, new expiry, who decided), and list this in the spec skill's After approval as an allowed append. Retro step 9 reads the header and the latest appended extension, and proposes the appended row rather than "changing the expiry". Rename the experiments field to `type: product | ablation`. Ship `assets/experiment-entry-template.md` in retro, and an obligations template (with `due:` as a date or version) in lens-placement. Roadmap re-plan says it only reads outcomes; the retro forces keep or kill.

## 22. Major

**Where:** skills/spec/SKILL.md (After approval); agents/builder.md; agents/checker.md (inputs 4, 6); skills/adopt/SKILL.md (step 4.3); skills/retro/SKILL.md (step 2 sources)

**Issue:** No artefact carries the hop from approved spec to builder, checker and the release gate. The spec skill ends with "the builder starts in a fresh context", and adopt 4.3 runs pilot items "through the spec skill". Nothing tells a user to start the builder with the spec path only, then the checker with base, head, evidence ids, kind-specific inputs, profile path and `execution`. Tools other than Claude Code have no carrier for the builder or the checker. The spec-critic has `critic-brief.md` as its fallback; these two roles have none. Nowhere are "kind-specific inputs" defined per kind. The checker has no procedure for `characterise`, `discover` or `probe` items. Nobody picks up the builder's `learned` pointers. The PR-to-spec link the guard needs is also unstated: the builder only names its branch after the spec.

**Proposed fix:** Add a thin `build` skill (process v2 names one), or at minimum a Hand-over section in the spec skill. It covers the order builder, machine evidence, checker, gate packet, and what to pass to each, as paths and ids only. It ships `assets/builder-brief.md` and `assets/checker-brief.md`, identical in contract to the agent definitions, as the fallback for tools without them. It has a table of kind-specific inputs per kind. It says that `learned` pointers become findings entries (status `hypothesis`) written by the orchestrating session. It sets the rule that the PR body's first line is `Spec: <spec path>`; the builder writes that line, and adopt row 2.2 says the guard reads it.

## 23. Minor

**Where:** skills/profile/assets/profile-template.yml (`artefacts:`, overlays, gates, P10); skills/retro/SKILL.md (Paths, Rules: floor); skills/adr/SKILL.md (Set up 2); skills/vision/SKILL.md (step 2)

**Issue:** Other artefacts read smaller profile keys that the template lacks.
- The retro reads artefact key `retros`, which is absent from the `artefacts:` table and from the shared conventions.
- The retro puts an entry "in the ledger of the path that owns it" per overlay, but overlays carry no ledger path, and every other skill writes to the single `ledgers` root.
- The adr looks for "the gates table row the profile names for decision records", but gate rows have no field saying what they cover.
- The retro's floor includes "a control the profile lists", but P10 has only `rules_in_force`.
- `vision` and `roadmap` are single paths, although there is one vision per product area.

**Proposed fix:** Add these to the profile template. `artefacts.retros: docs/process/retros`. `applies_to: []` on gate rows (specs, records, roadmap, vision, release). `mandated_controls: []` under P10 (`{ control: , requirement_id: , attested_by: }`). A comment that per-area vision and roadmap paths are listed as extra `artefacts` rows. Drop the retro's per-overlay ledger sentence; the escape entry's `owning-path` field already carries that. Alternatively, give overlay rows an optional `ledgers:` and make every skill resolve nearest-wins.

## 24. Minor

**Where:** skills/adopt/SKILL.md (step 1.1, batch 1); skills/profile/SKILL.md (steps 2, 3, 5)

**Issue:** Adopt hands the profile skill "the paths of the spike's facts entries". The profile skill has no such input and never reads them, although row 0.6 (branch protection) and row 0.7 (headless build) are direct evidence for P4 and P6. The profile skill also asks again for what adopt batch 1 already recorded in the checklist header: harness owner, decision rights, confidential work and the read perimeter.

**Proposed fix:** Profile step 3: "If an adoption checklist exists, read its header and the facts entries its spike rows point to. A facts entry with a reproduction counts as `observed`, with the entry's path in `reason`. Play the header answers back for confirmation instead of re-asking."

## 25. Minor

**Where:** skills/roadmap/SKILL.md (step 6 last bullet, batch 1); skills/roadmap/assets/roadmap-template.md (Kinds of work comment); skills/spec/SKILL.md (rule 2, step 1); skills/spec/SKILL.md (After approval, moving specs); skills/retro/SKILL.md (step 8)

**Issue:** These are small hand-over mismatches. The roadmap says "the spec skill cuts [slices] when their turn comes". The spec skill handles one work item and only splits an oversized one, so nobody turns a milestone into a slice list. The spec skill says the steward or a post-merge script moves shipped specs and "do not move it yourself"; the retro skill moves them itself. The roadmap's fixed points name only P12 d lead times and dated obligations, not the vision's hard constraints and outcome dates.

**Proposed fix:** Spec skill: add an entry step, "started from a milestone: propose the slice list along seams (T4) with disjoint `touches`, the owner picks, then one run of this skill per slice". Or reword the roadmap to "the owner and steward cut slices; each goes to the spec skill". Name one mover for shipped specs in both skills: the retro prepares the move as an ordinary change, or the project's post-merge script does it. Roadmap batch 1: offer the vision's hard constraints and outcome dates as candidate fixed points.

## 26. Minor

**Where:** skills/adopt/SKILL.md (rule 1); skills/roadmap/SKILL.md (step 7); skills/roadmap/references/m0-and-dials.md; skills/lens-placement/SKILL.md (step 11); skills/retro/SKILL.md (Rules); agents/builder.md; agents/checker.md; agents/spec-critic.md (Scope)

**Issue:** "Walls" is enumerated differently in each artefact. Adopt adds hosting settings and credentials. The roadmap adds deploy and release configuration, as a kit default. Lens-placement adds hooks, subagent definitions, workflow scripts, required-reviewer configuration and build or generator configuration. The builder, checker and retro use the bare four. A code-owner file or deploy configuration is a wall under three artefacts and not obviously one under the builder's list. Neither the spec skill nor the critic checks that `touches` contains no wall path, so the mismatch surfaces only when the builder blocks.

**Proposed fix:** Use one sentence verbatim everywhere: "Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on." Add a critic check and a spec rule: `touches` names no wall path; a wall change is listed for the harness owner.

## 27. Minor

**Where:** skills/lens-placement/assets/placement-table.md; skills/adr/assets/adr-template.md; skills/adopt/SKILL.md (step 3.4); skills/retro/SKILL.md (step 10); agents/spec-critic.md (Lenses); skills/spec/assets/spec-template.md (Horizon); skills/roadmap/assets/roadmap-template.md; skills/profile/references/glossary.md

**Issue:** Literal formats and definitions drift.
- The lens `source` mark is `(source: imported, unvalidated, <pointer>)` in lens-placement and `source: record residue NNNN` in adr. Adopt gives no format, while the retro and the spec-critic must find these marks by search.
- The spec template's Horizon placeholder says "<done-state from the profile>" where the skill, the checker and the roadmap mean a done-state and its horizon.
- `observed` is defined three ways: "after merge" (spec), "after release" (glossary) and "from the running system over a stated window" (roadmap).
- Frontmatter casing differs: snake_case in profile.yml, in the profile's question template and in the builder output; kebab-case everywhere else.
- The escape hop is `review`, while the role is called checker.
- Adopt uses "the owner" without saying which person it means, beside the harness owner and the holder of decision rights.
- Asset file names vary: `-template.md` against bare `-entry.md`.

**Proposed fix:** Fix one literal lens mark, `(source: <kind>[, unvalidated], <pointer>)`, and use it in the five artefacts. Horizon placeholder: "<done-state and its horizon, from the profile's done_states table>". Give one `observed` sentence, the spec's, in the glossary and the roadmap template. State that profile.yml is snake_case and every Markdown frontmatter is kebab-case, and convert the profile's question template and the builder output. Rename hop `review` to `checker`. Adopt defines "the owner" in its first paragraph. Name every asset `<thing>-template.md`.

## 28. Minor

**Where:** agents/spec-critic.md (inputs 2, 4, 5); agents/builder.md (reading order 2, 3); agents/checker.md (input 5); agents/researcher.md (Inputs); skills/profile/SKILL.md (Output); skills without a profile: roadmap, spec, adr, retro, lens-placement, vision

**Issue:** The agent definitions do not follow the profile's artefact table. The profile path is "fixed" in the profile skill and template, but three definitions accept "another path" from the caller. The spec-critic and the builder hardcode `.claude/rules/`, `.claude/skills/`, `.agents/skills/` and `shipped/`, although `artefacts.path_rules`, `project_skills` and `specs_shipped` may override them; the builder reads the profile only after it has looked for lenses. Behaviour without a profile also differs by artefact with no stated reason. The roadmap stops. The spec continues with a blocking question. The adr drafts only. The retro asks the human for dial values. Lens-placement and vision continue on defaults. The builder assumes strictest. The researcher returns early.

**Proposed fix:** In each definition, read `docs/process/profile.yml` first, take lens and spec paths from its `artefacts:` table and fall back to the defaults. Drop "unless the caller gives another path". Add one shared sentence on the missing-profile case to every skill. For example: "With no profile, say so and name the profile skill. Use default paths. Take every dial at its strictest value; never ask for a dial value ad hoc." Keep the roadmap's hard stop as the stated exception.

## 29. Minor

**Where:** skills/spec/SKILL.md (step 8, kind discover); skills/spec/assets/spec-template.md (discover line); skills/roadmap/assets/finding-entry-template.md; agents/spec-critic.md (Sources and claims); skills/spec/assets/critic-brief.md

**Issue:** A `discover` item's output is "findings ledger entries", but only the roadmap skill ships a findings template. A builder working from a discover spec has no format to follow. The spec skill does not tell the author to put the findings ledger path in `touches` or to pin a template. Neither critic checks that a pinned decision or contract record is `accepted` and not superseded, so a spec can be approved on a `proposed` record.

**Proposed fix:** Ship the same `finding-entry-template.md` in the spec skill's assets. For kind `discover`, the spec puts the findings ledger path in `touches.paths` and names the template's fields in the end state. Add a critic check: every pinned record has `status: accepted` and an empty `superseded-by`.
