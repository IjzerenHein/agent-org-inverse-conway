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

Read the project's profile first, always at `docs/process/profile.yml`. If it has an `artefacts:` table, use its paths. Otherwise use these defaults and tell the user which you used:

- specs: `docs/specs/NNN-slug.md`; shipped specs: `docs/specs/shipped/`
- decision and contract records: `docs/adr/NNNN-slug.md`
- ledgers: `docs/ledgers`. This skill writes the kinds `questions` and `pending-acceptance`.

<!-- shared:ledger-entry -->
A ledger entry is one file, `<ledgers>/<kind>/YYYY-MM-DD-slug.md`, written from the template for that kind in this skill's assets; `<ledgers>` is `artefacts.ledgers` in the profile and defaults to `docs/ledgers`. An attestation is the exception: it is named `<acceptance id>-<short commit>.md`. Entries that already exist in another format stay as they are: never convert them and never copy their format.
<!-- /shared:ledger-entry -->

<!-- shared:missing-profile -->
With no profile, say so and name the profile skill. Use the default paths. Take every dial value you need at its strictest, and never ask for a dial value ad hoc. The irreversibility class is the exception: with no profile it is `unclassified`, never a c you write yourself; it is treated as c and waits for a blocking question to the person the profile skill will interview.
<!-- /shared:missing-profile -->

<!-- shared:proposed-profile -->
If the profile is `proposed`, say so and use its paths. Read the last approved version with `git show <approval.last_approved_in>:docs/process/profile.yml`, and confirm that the version you read says `approval.status: approved`. Take each dial value, and each cell of `ownership_paths`, `path_classes` and the four tables, as the stricter of the proposed value and the last approved one; where strictness has no order (a name, a path list), use the last approved one. If no version was ever approved, or you cannot read or confirm the approved one, take the dials and those tables as if there were no profile.
<!-- /shared:proposed-profile -->

Bundled with this skill: `assets/spec-template.md`, `assets/spec-critic-brief.md`, `assets/question-entry-template.md`, `assets/pending-acceptance-entry-template.md`, `assets/rubric-template.md`, `assets/attestation-template.md`, `assets/finding-entry-template.md` and `references/after-approval.md`. This skill writes no attestation and no findings entry: it ships those two templates so that a spec can name their place and their fields.

## Rules that must hold

1. A diff you can describe in one sentence needs no spec. Say so and stop; without a spec the guard derives gates from the path classes touched.
2. One spec, one work item, one writer. A slice too big for one context becomes two: if a builder cannot hold the spec, its pinned sources, its lenses and the files under `touches` in one context, split it and declare the dependency.
3. Scope sits inside one ownership boundary. Cross-boundary work starts with a human-negotiated contract record (the adr skill); then one spec per boundary, each pinning that record.
4. `touches` must not overlap an open spec's `touches` unless `depends-on` declares it. Open means: in the specs directory, not under shipped, `withdrawn` empty. Specs run in parallel only when their `touches` plus `affects` are disjoint (P1).
5. Whoever writes the code does not define done. Each acceptance value comes from its declared oracle (P7), is given by its value owner and is approved with the spec. Checks and rubrics live outside `touches`. Builder-regenerated goldens are never acceptance.
6. Lenses are named, never restated. Sources are pinned.
7. Never invent an owner's answer, a fact about the outside world or a number. An unknown becomes a questions ledger entry. You prepare options, never facts. How a question closes is stated under Definitions.
8. The irreversibility class comes from the lookup under Definitions and from nowhere else. You never choose it, soften it or write it ahead of the profile.
9. `touches` names no wall path; a wall change is listed for the harness owner.

## Definitions

Walls (rule 9, steps 5 and 7):

<!-- shared:walls -->
Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.
<!-- /shared:walls -->

Irreversibility lookup (rule 8, step 5):

<!-- shared:p9-lookup -->
The irreversibility class is looked up in the profile, never chosen. Each path concerned (a spec's `touches` and `affects`, a record's `covers`) takes the strictest row of `dials.P9.rows` that matches it, each release surface concerned takes its surface row, and whatever has no row takes `dials.P9.value`. A release surface is concerned when the spec or record names it, or when a path concerned matches its `paths` in `release_surfaces`. The class is the strictest of these (a, then b, then c), and it is c whenever an effect is externally visible or the `audience` of a surface concerned is outside the project (V6). Where the profile gives no value, the class is `unclassified`. With no profile the class is also `unclassified`. Treat `unclassified` as c, and put a blocking question to whoever holds decision rights over the profile: `approval.approver`, or with no profile the person the profile skill will interview. The question asks for a profile row, which that person gives through the profile skill; a class is never written into a spec or a record ahead of it.
<!-- /shared:p9-lookup -->

An `observed` id (step 6):

<!-- shared:observed -->
An `observed` acceptance id is decided by evidence produced after merge, at a done-state and horizon that the profile's `done_states` table lists. A script writes that evidence, never the builder.
<!-- /shared:observed -->

A `judged` id (steps 6 and 7):

<!-- shared:judged-attestation -->
A `judged` acceptance id is decided by its value owner's attestation against the rubric: one file from the attestation template, bound to a commit, whose `confirmed` field holds the review URL where the attester approved the file, or `own commit` when the attester committed the scores themselves. `own commit` counts only when the author of the last commit that changed the file is the attester. The attestation is void once a path that attester owns (`ownership_paths[].owner` in the profile) changes after the commit it is bound to; when those paths cannot be established, any change after that commit voids it.
<!-- /shared:judged-attestation -->

Closing a question (rule 7, steps 10 and 12):

<!-- shared:questions-close -->
Questions close by human decision, attested fact or evidence id, never by agent opinion.
<!-- /shared:questions-close -->

## Procedure

Ask one batch at a time and wait for the answers. Put each question to the person who owns that section. An answer relayed for an absent owner counts only as a verbatim quote with a link or path; otherwise record the question for them.

To critique an existing spec that is not yet approved, run steps 11 and 12 only. An approved spec is not rewritten: see After approval.

Started from a roadmap milestone instead of one work item? First propose the slice list: cut along ownership boundaries and seams (T4), never disciplines, with disjoint `touches` or a declared dependency between slices. The milestone's owner picks and orders the slices. Then run this skill once per slice, from step 1.

1. **Check that a spec is needed** (rule 1). Stop as well if done has neither a machine comparison nor a named human judge: the process does not cover that work.
2. **Number it.** Take the next free three-digit number across the specs directory and its shipped folder. Work on a branch: a draft never goes onto the default branch (step 13). Copy `assets/spec-template.md` to `NNN-slug.md`.
3. **Batch 1, the item and its people.**
   - Which kind: `discover`, `characterise`, `probe`, `build` or `retire`? Check that the profile (P6) enables that kind.
   - Who is the steward: the one named person who follows the item to its last done-state and breaks ties?
   - Who owns each section: intent, end state, scope? One person may own several.
   - For a `probe`: on which date does it expire? A human gives the date; write it in the header's `expiry`.
   - Does this replace an earlier spec? Then fill `supersedes`, and withdraw the old spec in the same change, as `references/after-approval.md` describes.
4. **Batch 2, intent.**
   - Where are the owner's own words? Quote them verbatim with a link or path; words said in this session carry name and date. Do not paraphrase.
   - Which vision section, roadmap milestone or record does the item serve?
   - What is true when it is done, stated so that someone could observe it?
   - What is explicitly not part of it?
   - Fill the template's line for this kind. For `discover` the output is findings ledger entries: the end state names the fields of `assets/finding-entry-template.md`, as the template's line does, and the findings ledger path goes in `touches.paths` in batch 3. For a `probe` the line points to the experiments ledger entry; if none exists, ask for one through the lens-placement skill.
5. **Batch 3, scope.**
   - Which interfaces does the item add, change or rely on? Record stable ids (an exported symbol, an operation id, a schema or table name, an event name), never line numbers or descriptions.
   - Which paths and which objects (things without a path: a table, a flag, a queue, a config key) may the builder write? That is `touches`. It never holds a wall path (rule 9): list each wall change the item needs under Scope, for the harness owner.
   - `affects` must be computed unless the profile's P1 medium is files: `computed-by` is filled even when the lists come out empty, and only with medium files may it stay empty. If the project has a script that computes it, run it and record the command.
   - If there is no script, list `affects` with the scope owner, record `hand-listed by <name>, <date>` and open a non-blocking question for the harness owner about the missing script, unless one is open already. A spec with a hand-listed `affects` runs in parallel with another only on the steward's word: ask, and record the answer under Scope.
   - Fill `touches.surfaces` and `affects.surfaces` from the profile: every row of `release_surfaces` whose `paths` match a path in that block. Add by hand only a surface outside the repo that the item ships through; ask the scope owner which.
   - Apply rules 2, 3 and 4 now. Ownership boundaries are the profile's `ownership_paths`; with no profile, ask the steward who owns each touched path. Read the header of every open spec for the overlap check.
   - Irreversibility class: run the lookup under Definitions over every path and surface in `touches` and `affects`, and write the result in the header. Where it gives `unclassified`, write `unclassified`, never `c`, and open the blocking question it describes (step 10). The answer reaches the profile through the profile skill, row update; only then does the header take the class.
6. **Batch 4, acceptance.** For each end-state statement ask how anyone will know it holds. Then, per acceptance id:
   - Type: `checked` (a machine check decides), `judged` or `observed` (both under Definitions). For an `observed` id, record the done-state and its horizon on the Horizon line.
   - Oracle (P7): human-stated, legacy system, external standard, reporter's reproduction or human judgement.
   - Who is the value owner (for a `judged` id, the person who attests), and what is the value? Ask that person. For a `judged` id the value is the pass mark every criterion of the rubric must reach. A missing value is a blocking question, never a guess.
   - Command: how is the check run, exactly as the builder and the acceptance job will run it? Write `n/a` for a `judged` or `observed` id.
   - Where will the machine evidence appear? For a `judged` id the Evidence line names the place of the attestation file, by default `<ledgers>/attestations/<acceptance id>-<short commit>.md`; its fields are those of `assets/attestation-template.md`.
   - A legacy oracle means golden masters from the harness owner's protected capture job, green on base and head; re-baselining needs a decision record. Never produce or refresh goldens yourself.
7. **Place the checks.** From the owners' values, write each `checked` id's check and each `judged` id's rubric at a path outside `touches`. A rubric is written from `assets/rubric-template.md`: its criteria, its `scale` and its `pass-mark` all come from the value owner, and the id's Value line equals the pass mark.
   - If code for this item already exists and you have seen or written it, you do not write the checks. Hand the spec path and the owners' values, never the diff, to a fresh agent working from a base checkout. If your tool cannot spawn one, stop and ask the steward to have the checks written in a session that has not seen the diff. Doing this pass yourself is not a valid fallback here.
   - Checks for new behaviour fail until the slice lands: register them in one pending-acceptance ledger entry for this spec, from `assets/pending-acceptance-entry-template.md`, each `command` a copy of that id's Command line, and point to the entry under Acceptance in the spec.
   - Do not edit a wall to wire a check in; that is the harness owner's change. How pending checks stay out of the blocking run is the acceptance job's business: if the project has no such job or convention, ask the harness owner before opening the change. Never skip or disable a check yourself.
8. **Batch 5, lenses and sources.**
   - Which discipline lenses does the builder need? Name them. Domain lenses load by path from `touches` and `affects`; list them as well if the project has no script that computes the brief.
   - Open each named lens and find the questions it asks at design time. Put each question to the owner of the section it bears on; when unclear, to the steward. Record the answers in that lens's slot. Point at the question; do not copy the lens.
   - Which documents does the spec rely on beyond the code at head (records, standards, designs, exports, a reporter's reproduction)? Pin each: a repo path with its commit, or an external document with version or retrieval date and the quote relied on. A pinned decision or contract record has `status: accepted` and an empty `superseded-by`. The read perimeter is the profile's, not this list.
   - A mutable URL is not pinned until a person has put a copy in the repo; do not fetch it yourself unless the profile's read allowlist (P11) covers it.
9. **Escalation.** Ask the steward on what condition the builder must stop and come back. The builder's output has no success field; "blocked, here is why" is a valid outcome.
10. **Record unknowns.** One questions ledger entry per unknown, from `assets/question-entry-template.md`: `blocks` names the spec field or acceptance id that waits, `blocking` says whether the spec can be approved without the answer. List each entry in section 8 of the spec.
11. **Spec-critic pass, fresh context.** Delete the HTML template comments first, the `shared:` marker lines included; the text between the markers and the header's `#` comments stay. Pass the critic the spec path and today's date, nothing else: never this conversation or a summary of it. If your tool has the kit's `spec-critic` agent definition, use it; otherwise start a fresh sub-agent with `assets/spec-critic-brief.md` as its instructions. If your tool cannot spawn a sub-agent, do this pass yourself as a clearly separate step, following that brief and rereading only the inputs it names.
12. **Get the critic's questions answered by humans.** The critic returns `violations[]`, each with `check`, `severity` (`blocker`, `major`, `minor`), `field` and `evidence`, and `batches[]`, one per owner with a `role`: sections 1 to 3 go to their section owner, an acceptance id to its value owner, a value the profile must give to the profile approver, everything else (lenses, sources, escalation, dependencies) to the steward. Each of `batches[].questions[]` carries `options` and `blocking`.
    - Fix the violations. Every `blocker` and `major` one must be gone before approval; tell the steward which `minor` ones you left. A fix that needs a decision is a question.
    - Read `not-read`. Checks the critic skipped because the profile is `proposed` (check 25 and the profile parts of checks 10 and 15) rest on your own reading in step 5: tell the steward so.
    - Owner in the session: ask the batch now. Owner elsewhere: draft one message per owner, for a person to send through the design gate's channel in the profile, with that gate's response time as the timeout. With no profile, ask the steward for both. A batch with role `profile approver` goes to `approval.approver`, and its answer arrives through the profile skill, row update.
    - `options` are options, never answers: one holds only when the owner accepts it. Silence never answers a question. When the timeout expires the question goes to the steward, who decides it if it is theirs to decide, reassigns it or leaves it open as a questions ledger entry. The gate's default-if-silent (there is none at P4 b or c) governs only the approval in step 13, and never while a blocking question is open.
    - Write each answer into the spec field it belongs to. Rerun the critic when a fix or an answer changed `touches`, `affects` or an acceptance id.
    - A question still open becomes a questions ledger entry with the critic's `blocking` value (step 10). A blocking one stops approval.
13. **Approval.** Prepare one change, from your branch, on the project's normal merge path, holding the spec, the checks and rubrics, the pending-acceptance entry and any questions entries. Never commit a draft to the default branch. Each section owner approves their section and each value owner their values (P3 b: in the hosting UI; P3 c: by the profile's decision rights). What counts as approved is stated below; you never write the trailer. Decline is a valid outcome. You never approve or merge.

<!-- shared:approved-spec -->
A spec is approved when it is on the default branch and the commit that put it there carries one trailer `Spec-approved-by: <name> (<sections and acceptance ids>)` for each section owner and each value owner the spec names. The approver or the merge tooling adds the trailer at approval; an agent never writes it. A draft stays off the default branch until then. After approval only the header's `withdrawn` and section 9 change; a later commit that changes anything else leaves the spec unapproved.
<!-- /shared:approved-spec -->

## After approval

- The spec is not rewritten. Later learning is appended to section 9 as pointers, never re-summarised.
- This session does not build the item. The build skill carries an approved spec to the builder, the checker and the release gate; the builder starts in a fresh context from the spec's path.
- Read `references/after-approval.md` before you withdraw or supersede a spec, before you append a row to section 9 (a builder's blocked question, a learning, a probe's expiry extension), and when asked who closes a pending-acceptance entry or who moves a shipped spec. This skill closes a pending-acceptance entry only in the change that withdraws its spec, and it never moves a spec.

## Done when

- The spec is at the resolved path, on a branch. Every field is filled or points to a questions ledger entry, except `depends-on`, `supersedes`, `withdrawn`, the list fields and, unless the kind is `probe`, `expiry`, which may be empty. No HTML template comment remains.
- Rules 1 to 9 hold and the critic reports no blocker or major violation.
- Every acceptance id has a type, an oracle, a value owner, a value, a check or rubric outside `touches`, a Command line (`n/a` when `judged` or `observed`), an evidence location and, when `observed`, a done-state and horizon. Every rubric states its criteria, scale and pass mark, and the Value line equals the pass mark.
- The header's `irreversibility` is the class the lookup gives, or `unclassified` with its blocking question open; `surfaces` lists every release surface whose `paths` match.
- Checks for new behaviour are registered in the pending-acceptance ledger, each `command` equal to its Command line, and the spec points to the entry.
- Every critic question has a human answer or a ledger entry, and no blocking question is open.
- The change is open on the normal merge path, waiting for the section owners and value owners, and the user knows which default paths were used.
- Or, when a blocking question stays open: you stopped before step 13 and reported "spec drafted, blocked on <ledger entries>". That is a valid outcome.
