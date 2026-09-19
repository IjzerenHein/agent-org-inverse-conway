---
name: spec
description: Writes the spec for one work item under agent-org-inverse-conway process v2. The spec is the brief the builder receives, so it carries kind, section owners and steward, quoted intent, end state, non-goals, interfaces, touches and affects, typed acceptance ids with oracle and value owner, named lenses, pinned sources, irreversibility class and escalation condition. Interviews the owners in small batches, fills the spec template, places acceptance checks outside the builder's scope, runs a fresh-context spec-critic pass and prepares the change for the section owners' approval. Use when a work item is bigger than a one-sentence diff and needs a spec before anyone builds, when a spec must be split, withdrawn or superseded, or when asked to draft or critique a spec or brief.
metadata:
  kit: agent-org-inverse-conway
  process-version: "2"
---

# Spec

Write the spec for one work item. The spec is the brief: the builder starts from this file by path, with the sources it pins and the lenses it names; it never gets this conversation or a summary of it. Intent is turned into a spec once; after approval the spec is appended to, never rewritten.

Background: agent-org-inverse-conway, process v2, section 1 (brief contract, T1, T3, T4, V2).

## Paths

Read the project's `docs/process/profile.yml` first. If it has an `artefacts:` table, use its paths. Otherwise use these defaults and tell the user which you used:

- specs: `docs/specs/NNN-slug.md`; shipped specs: `docs/specs/shipped/`
- decision and contract records: `docs/adr/NNNN-slug.md`
- ledgers, one file per entry: `docs/ledgers/<kind>/YYYY-MM-DD-slug.md` (this skill writes the kinds `questions` and `pending-acceptance`)

Bundled with this skill: `assets/spec-template.md`, `assets/critic-brief.md`, `assets/question-entry-template.md`, `assets/pending-acceptance-entry-template.md`.

## Rules that must hold

1. A diff you can describe in one sentence needs no spec. Say so and stop; without a spec the guard derives gates from the path classes touched.
2. One spec, one work item, one writer. A slice too big for one context becomes two: if a builder cannot hold the spec, its pinned sources, its lenses and the files under `touches` in one context, split it and declare the dependency.
3. Scope sits inside one ownership boundary. Cross-boundary work starts with a human-negotiated contract record (the adr skill); then one spec per boundary, each pinning that record.
4. `touches` must not overlap an open spec's `touches` unless `depends-on` declares it. Open means: in the specs directory, not under shipped, `withdrawn` empty. Specs run in parallel only when their `touches` plus `affects` are disjoint (P1).
5. Whoever writes the code does not define done. Each acceptance value comes from its declared oracle (P7), is given by its value owner and is approved with the spec. Checks and rubrics live outside `touches`. Builder-regenerated goldens are never acceptance.
6. Lenses are named, never restated. Sources are pinned.
7. Never invent an owner's answer, a fact about the outside world or a number. An unknown becomes a questions ledger entry. You prepare options, never facts. Questions close by human decision, attested fact or evidence id, never by agent opinion.
8. The profile, never an agent, classifies reversibility (P9, per path and release surface). Any externally visible effect is irreversible (V6).

## Procedure

Ask one batch at a time and wait for the answers. Put each question to the person who owns that section. An answer relayed for an absent owner counts only as a verbatim quote with a link or path; otherwise record the question for them.

To critique an existing spec that is not yet approved, run steps 11 and 12 only. An approved spec is not rewritten: see After approval.

1. **Check that a spec is needed** (rule 1). Stop as well if done has neither a machine comparison nor a named human judge: the process does not cover that work.
2. **Number it.** Take the next free three-digit number across the specs directory and its shipped folder. Copy `assets/spec-template.md` to `NNN-slug.md`.
3. **Batch 1, the item and its people.**
   - Which kind: `discover`, `characterise`, `probe`, `build` or `retire`? Check that the profile (P6) enables that kind.
   - Who is the steward: the one named person who follows the item to its last done-state and breaks ties?
   - Who owns each section: intent, end state, scope? One person may own several.
   - Does this replace an earlier spec? Then fill `supersedes`, and set `withdrawn` on the old spec in the same change (and close its pending-acceptance entry, see After approval).
4. **Batch 2, intent.**
   - Where are the owner's own words? Quote them verbatim with a link or path; words said in this session carry name and date. Do not paraphrase.
   - Which vision section, roadmap milestone or record does the item serve?
   - What is true when it is done, stated so that someone could observe it?
   - What is explicitly not part of it?
   - Fill the template's line for this kind.
5. **Batch 3, scope.**
   - Which interfaces does the item add, change or rely on? Record stable ids (an exported symbol, an operation id, a schema or table name, an event name), never line numbers or descriptions.
   - Which paths and which objects (things without a path: a table, a flag, a queue, a config key) may the builder write? That is `touches`.
   - `affects` must be computed unless the profile's P1 medium is files: `computed-by` is filled even when the lists come out empty, and only with medium files may it stay empty. If the project has a script that computes it, run it and record the command.
   - If there is no script, list `affects` with the scope owner, record `hand-listed by <name>, <date>` and open a non-blocking question for the harness owner about the missing script, unless one is open already. A spec with a hand-listed `affects` runs in parallel with another only on the steward's word: ask, and record the answer under Scope.
   - Apply rules 2, 3 and 4 now. Ownership boundaries are the profile's ownership paths; with no profile, ask the steward who owns each touched path. Read the header of every open spec for the overlap check.
   - Irreversibility class: the strictest P9 value (a, b or c) the profile gives, in its overlays and its release-surfaces table, over every path and release surface in `touches` and `affects`; c whenever an effect is externally visible (V6). If the profile does not classify a touched path or surface, open a blocking question for whoever holds decision rights over the profile; the answer goes into the profile (the profile skill) and the spec copies it. With no profile at all, say so, suggest the profile skill first and record the class as a blocking question.
6. **Batch 4, acceptance.** For each end-state statement ask how anyone will know it holds. Then, per acceptance id:
   - Type: `checked` (a machine check decides), `judged` (a named person decides against a rubric; the attestation is bound to a commit) or `observed` (evidence produced after merge decides, at a done-state horizon the profile lists; record that horizon).
   - Oracle (P7): human-stated, legacy system, external standard, reporter's reproduction or human judgement.
   - Who is the value owner (for a `judged` id, the person who attests), and what is the value? Ask that person. A missing value is a blocking question, never a guess.
   - Where will the machine evidence appear?
   - A legacy oracle means golden masters from the harness owner's protected capture job, green on base and head; re-baselining needs a decision record. Never produce or refresh goldens yourself.
7. **Place the checks.** From the owners' values, write each `checked` id's check and each `judged` id's rubric at a path outside `touches`.
   - If code for this item already exists and you have seen or written it, you do not write the checks. Hand the spec path and the owners' values, never the diff, to a fresh agent working from a base checkout. If your tool cannot spawn one, stop and ask the steward to have the checks written in a session that has not seen the diff. Doing this pass yourself is not a valid fallback here.
   - Checks for new behaviour fail until the slice lands: register them in one pending-acceptance ledger entry for this spec, from `assets/pending-acceptance-entry-template.md`, and point to it under Acceptance in the spec.
   - Do not edit a wall to wire a check in; that is the harness owner's change. How pending checks stay out of the blocking run is the acceptance job's business: if the project has no such job or convention, ask the harness owner before opening the change. Never skip or disable a check yourself.
8. **Batch 5, lenses and sources.**
   - Which discipline lenses does the builder need? Name them. Domain lenses load by path from `touches` and `affects`; list them as well if the project has no script that computes the brief.
   - Open each named lens and find the questions it asks at design time. Put each question to the owner of the section it bears on; when unclear, to the steward. Record the answers in that lens's slot. Point at the question; do not copy the lens.
   - Which documents does the spec rely on beyond the code at head (records, standards, designs, exports, a reporter's reproduction)? Pin each: a repo path with its commit, or an external document with version or retrieval date and the quote relied on. The read perimeter is the profile's, not this list.
   - A mutable URL is not pinned until a person has put a copy in the repo; do not fetch it yourself unless the profile's read allowlist (P11) covers it.
9. **Escalation.** Ask the steward on what condition the builder must stop and come back. The builder's output has no success field; "blocked, here is why" is a valid outcome.
10. **Record unknowns.** One questions ledger entry per unknown, from `assets/question-entry-template.md`, with a pointer in the spec. If a ledger already has entries, follow their shape.
11. **Spec-critic pass, fresh context.** Delete the HTML template comments first; the header's `#` comments stay. Give the critic paths only: the spec, the profile, the specs directory. Never give it this conversation or a summary of it. If your tool has a spec-critic agent definition (the kit ships one for Claude Code), use it. Otherwise start a fresh sub-agent with `assets/critic-brief.md` as its instructions. If your tool cannot spawn a sub-agent, do this pass yourself as a clearly separate step, rereading only the named inputs.
12. **Get the critic's questions answered by humans.** The critic returns rule violations and questions batched per owner: sections 1 to 3 go to their section owner, an acceptance id to its value owner, everything else (lenses, sources, escalation) to the steward.
    - Fix the violations. A fix that needs a decision is a question.
    - Owner in the session: ask the batch now. Owner elsewhere: draft one message per owner, for a person to send through the design gate's channel in the profile, with that gate's response time as the timeout. With no profile, ask the steward for both.
    - Silence never answers a question. When the timeout expires the question goes to the steward, who decides it if it is theirs to decide, reassigns it or leaves it open as a questions ledger entry. The gate's default-if-silent (there is none at P4 b or c) governs only the approval in step 13, and never while a blocking question is open.
    - Write each answer into the spec field it belongs to. Rerun the critic when a fix or an answer changed `touches`, `affects` or an acceptance id.
    - A question still open becomes a questions ledger entry. A blocking one stops approval.
13. **Approval.** Open one change on the project's normal merge path holding the spec, the checks and rubrics, the pending-acceptance entry and any questions entries. Each section owner approves their section and each value owner their values (P3 b: in the hosting UI; P3 c: by the profile's decision rights). P4: the spec approver is author of record, named in a commit trailer; the approver or the merge tooling adds that trailer at approval, and you never write it in advance. Decline is a valid outcome. You never approve or merge.

## After approval

- The spec is not rewritten. Later learning is appended to its last section as pointers, never re-summarised.
- When intent changes, set `withdrawn` (date and a pointer to the reason), close the spec's pending-acceptance entry in the same change, and write a new spec with `supersedes`.
- This session does not build the item. The builder starts in a fresh context from the spec's path.
- This skill does not move specs. The steward or the project's post-merge script moves a spec to the shipped folder once its last done-state is reached. If a spec whose done-states are all met still sits in the specs directory, ask the steward; do not move it yourself.

## Done when

- The spec is at the resolved path. Every field is filled or points to a questions ledger entry, except `depends-on`, `supersedes`, `withdrawn` and the list fields, which may be empty. No HTML template comment remains.
- Rules 1 to 8 hold and the critic reports no violations.
- Every acceptance id has a type, an oracle, a value owner, a value, a check or rubric outside `touches`, an evidence location and, when `observed`, a horizon.
- Checks for new behaviour are registered in the pending-acceptance ledger, and the spec points to the entry.
- Every critic question has a human answer or a ledger entry, and no blocking question is open.
- The change is open on the normal merge path, waiting for the section owners and value owners, and the user knows which default paths were used.
- Or, when a blocking question stays open: you stopped before step 13 and reported "spec drafted, blocked on <ledger entries>". That is a valid outcome.
