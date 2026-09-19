---
name: build
description: Carries one approved spec by hand from approval to the human gate under agent-org-inverse-conway process v2. Confirms the approval, starts one builder with the spec path only, turns a builder's blocked question into a questions ledger entry and its learned pointers into findings entries with status hypothesis, waits for machine evidence, starts a fresh checker from a base checkout with paths, refs and ids only, prepares the attestation file for each judged acceptance id, and hands the checker's report and the evidence ids to the gate the profile names. Writes no code and no spec, and never approves or merges. It is a manual procedure, because the kit does not yet ship the brief, guard and packet scripts. Use when a spec is approved and its work item should be built, when a blocked builder's question has closed, when an attestation has landed and the checker must run again, or when asked how to hand a spec to the builder and the checker.
metadata:
  kit: agent-org-inverse-conway
  process-version: "2"
---

# Build

Carry one approved spec to the human gate, in this order: builder, machine evidence, checker, gate packet. You orchestrate. You write no code, no spec and no check, you judge nothing, and you never approve or merge. Every hand-over is a path, a ref or an id, never a summary (T1, T2, V4).

This is a manual hand-over that a session follows step by step. The kit does not yet ship the `brief`, `guard` and `packet` scripts, workflow scripts or CI templates. Where the project has its own, use them. Where it has none, nothing here replaces them: without a guard, only the checker's scope check and the human diff read hold the diff inside `touches`, and you assemble the packet by hand. Say so to the user; never report a step as automated or guarded when it was not.

## Paths

Read `docs/process/profile.yml` first; that path is fixed. Take `specs`, `specs_shipped` and `ledgers` from its `artefacts:` table; the defaults are `docs/specs`, `docs/specs/shipped` and `docs/ledgers`. This skill writes the ledger kinds `questions`, `findings` and `attestations`.

Bundled with this skill: `assets/builder-brief.md`, `assets/checker-brief.md`, `assets/question-entry-template.md`, `assets/finding-entry-template.md`, `assets/attestation-template.md`.

<!-- shared:ledger-entry -->
A ledger entry is one file, `<ledgers>/<kind>/YYYY-MM-DD-slug.md`, written from the template for that kind in this skill's assets; `<ledgers>` is `artefacts.ledgers` in the profile and defaults to `docs/ledgers`. An attestation is the exception: it is named `<acceptance id>-<short commit>.md`. Entries that already exist in another format stay as they are: never convert them and never copy their format.
<!-- /shared:ledger-entry -->

<!-- shared:missing-profile -->
With no profile, say so and name the profile skill. Use the default paths. Take every dial value you need at its strictest, and never ask for a dial value ad hoc. The irreversibility class is the exception: with no profile it is `unclassified`, never a c you write yourself; it is treated as c and waits for a blocking question to the person the profile skill will interview.
<!-- /shared:missing-profile -->

<!-- shared:proposed-profile -->
If the profile is `proposed`, say so and use its paths. Read the last approved version with `git show <approval.last_approved_in>:docs/process/profile.yml`, and confirm that the version you read says `approval.status: approved`. Take each dial value, and each cell of `ownership_paths`, `path_classes` and the four tables, as the stricter of the proposed value and the last approved one; where strictness has no order (a name, a path list), use the last approved one. If no version was ever approved, or you cannot read or confirm the approved one, take the dials and those tables as if there were no profile.
<!-- /shared:proposed-profile -->

## Rules that must hold

1. One builder per work item (T3). Start none while another writer has a branch or an open pull request for the same spec.
2. The builder gets the spec path and nothing else. The checker gets the five inputs of step 6 and nothing from the builder: not its report, not the pull request description, no commit message, no craft lens (V4). Copy the two roles' reports; never reword or summarise them.
3. What you write around a builder (a questions entry with its section 9 row, findings entries, a prepared attestation) lands in a change of its own on the default branch, through the project's normal merge path, and never on the builder's branch: there the checker reports it as a scope violation. A person merges it; you never do.
4. Never edit the spec above section 9, a check, a rubric, a golden or a wall. Never fill an attestation's `scores`, `verdict` or `confirmed`. Never close a questions or pending-acceptance entry, and never move a spec.
5. For each role: if your tool has the kit's `builder` or `checker` agent definition, use it; otherwise start a fresh sub-agent with `assets/builder-brief.md` or `assets/checker-brief.md` as its instructions. If your tool cannot start a sub-agent, ask the user to open a new session with that brief as its instructions and the inputs listed here. This session never acts as the builder or the checker itself: it has seen what neither may see.

<!-- shared:walls -->
Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.
<!-- /shared:walls -->

<!-- shared:casing -->
`profile.yml` keys are snake_case. Every other key the kit defines is kebab-case: Markdown frontmatter, ledger entries and the structured output of the four roles.
<!-- /shared:casing -->

## Procedure

1. **Confirm the spec is approved**, by the first rule under Rules the steps rely on. Run `git log <default branch> -- <spec path>` and read the trailers of the commit that added the file and of the merge commit that brought it in. If a named owner has no trailer, a later commit changed anything other than `withdrawn` or section 9, or `withdrawn` is filled, stop and name the spec skill. The builder repeats this check and adds its own (dependencies, open blocking questions, a probe's expiry).
2. **Start one builder** (rules 1 and 5) and pass it the spec path only. Its checkout must hold the default branch's current version of the spec and of every entry section 9 points to. First run: start it on the current head of the default branch; it makes its own work branch. Restart: first merge the default branch into the work branch, and change nothing else there.
3. **Read the builder's report.** It has no success field. When a pull request exists, confirm its body's first line is the `Spec:` line; if it is not, tell the user and do not rewrite the builder's pull request. With `blocked`, do step 4 and then read `blocked.kind`:
   - `precondition`: report `reason` to the user and stop. Write no questions entry and no section 9 row.
   - `question`: write one questions entry from `assets/question-entry-template.md`. The heading is the builder's `question`, unchanged; `raised-by` is `builder, spec <id>`; `can-answer` is `owner` with `role`; `blocks` is the spec path and `section`; `blocking: true`; `reason` goes under Why it matters. Append a `question` row pointing to the entry to the spec's section 9. Both go in one change (rule 3). Tell the user who must answer, and stop. A `role` of `profile approver` goes to `approval.approver`, and the answer arrives as a profile row through the profile skill, row update. The entry closes as its template says, never by you. When it has closed, start again at step 1.
4. **File what the builder learned**, blocked or not. Each `learned` item becomes one findings entry from `assets/finding-entry-template.md`: `status: hypothesis`, `found-by: builder (<spec id>)`, `origin` the spec path, the builder's `claim` copied unchanged as the heading, its `pointer` under Evidence and its `lacks` under Bears on. Never reword them (T1), and never adjudicate one (V7). They go in one change of their own (rule 3).
5. **Wait for machine evidence** on the pull request's head commit: the project's CI runs, the acceptance job, the guard if there is one, captures. Collect run ids and paths. Evidence is what those jobs wrote. A command you ran in this session is not evidence, and neither is a file the diff adds or changes. If an acceptance id's command has no run on the head, tell the user: wiring it in is the harness owner's change to a wall, never yours.
6. **Start the checker** (rule 5), fresh, in a checkout whose `HEAD` is the base and never the head (for example `git worktree add <dir> <base>`). Pass exactly:
   1. the spec path;
   2. base and head, as full hashes: the merge base of the head with the default branch, and the pull request's head commit;
   3. the evidence ids and paths from step 5;
   4. the kind-specific inputs from the table below, by path or id. Find each through the spec. If one is missing, ask the steward; never substitute for it;
   5. `execution`: `sandboxed` only when the harness owner, or the execute wall's row in the adoption checklist, says the checker runs in a disposable sandbox with fake externals and no secret; otherwise `evidence only`. Never guess it.
7. **Judged ids.** When the report's `overall` is `incomplete`, prepare one file per id at `awaiting attestation`, from `assets/attestation-template.md`, at the place the spec's Evidence line names. Fill `id`, `acceptance-id`, `spec`, `rubric`, `attester` (the checker's `attester`) and `commit` (the head the checker read). Leave everything else to the attester; rule 4 holds. Open it as a change of its own (rule 3), tell the user who must attest, and stop. Once the attester has confirmed the file and it has landed, start a fresh checker as in step 6, adding the attestation's path and the ref where it landed to input 3.
8. **Hand over to the gate.** Only a report whose `overall` is not `incomplete` goes there: no id may still be at `awaiting attestation` (V1). The gates are those that `path_classes[].gates` names for every class matching a changed path, and the gate whose `applies_to` holds `release` when a surface in `touches` or `affects` has `staged: false` (V6). With no profile, ask the steward who holds the release gate. The packet is: the spec path, the pull request with base and head, the checker's report whole and unchanged, the evidence ids, the attestation paths, and where each part of the gate's `packet_form` is found. Add no verdict of your own: `not refuted` is not an approval. Post it on the gate's `channel` if you can write there, else give it to the user to send. A `not accepted` report goes the same way, marked as such, and the gate owner or the steward decides what follows. You never pass the checker's findings to a builder: its only input is the spec path.

| Kind | Kind-specific inputs for the checker (input 4) |
|---|---|
| `discover` | the questions entries the item answers |
| `characterise` | the run ids of the new checks on the base and on the head; the capture job's run id for any golden |
| `probe` | the flag's definition; the experiments ledger entry |
| `build` | the pending-acceptance entry; the probe's spec when the item promotes one |
| `retire` | the unit that is cut over or removed; the evidence that nothing still uses it; at P9 c (the spec's `irreversibility`, `unclassified` included), the tombstone |

## Rules the steps rely on

<!-- shared:approved-spec -->
A spec is approved when it is on the default branch and the commit that put it there carries one trailer `Spec-approved-by: <name> (<sections and acceptance ids>)` for each section owner and each value owner the spec names. The approver or the merge tooling adds the trailer at approval; an agent never writes it. A draft stays off the default branch until then. After approval only the header's `withdrawn` and section 9 change; a later commit that changes anything else leaves the spec unapproved.
<!-- /shared:approved-spec -->

<!-- shared:pr-spec-line -->
The first line of the pull request body is `Spec: <spec path>`. The builder writes that line, and the guard reads it to find the spec whose `touches` confine the diff.
<!-- /shared:pr-spec-line -->

<!-- shared:blocked-question-return -->
A builder's `blocked` report of kind `question` becomes one questions ledger entry with `blocking: true`, written by the session that started the builder, which also appends a pointer to the entry in the spec's section 9. Both land in a change of their own on the default branch, never on the builder's branch. Once the entry is closed, a fresh builder is started from the spec path, on a branch that contains both, and reads the answer in the entry. An answer that changes intent, scope or an acceptance value is never appended: the spec is `withdrawn` and a new spec supersedes it. A `blocked` report of kind `precondition` carries no question: the session reports its reason to the user and writes nothing.
<!-- /shared:blocked-question-return -->

<!-- shared:judged-attestation -->
A `judged` acceptance id is decided by its value owner's attestation against the rubric: one file from the attestation template, bound to a commit, whose `confirmed` field holds the review URL where the attester approved the file, or `own commit` when the attester committed the scores themselves. `own commit` counts only when the author of the last commit that changed the file is the attester. The attestation is void once a path that attester owns (`ownership_paths[].owner` in the profile) changes after the commit it is bound to; when those paths cannot be established, any change after that commit voids it.
<!-- /shared:judged-attestation -->

## After the gate

This skill ends at the gate. Withdrawing or superseding a spec is the spec skill's work. What happens after the merge is not yours either:

<!-- shared:pending-acceptance-close -->
A pending-acceptance entry is closed by the project's post-merge script, with the id of the run in which every listed check passed on the default branch; where no such script exists, the steward closes it in an ordinary change. Closing the entry moves its checks from the pending run into the blocking run. When a spec is withdrawn or superseded, its entry is closed in the change that sets `withdrawn`. No agent closes an entry on its own reading: the retro lists the entries whose checks are green on the default branch and proposes the close to the steward.
<!-- /shared:pending-acceptance-close -->

<!-- shared:shipped-spec -->
A spec is shipped when machine evidence shows its last done-state (the profile's `done_states` table) and no pending-acceptance entry for it is open. One mover then moves it to the shipped folder (`artefacts.specs_shipped`): the project's post-merge script, or where none exists the retro skill, which prepares the move as an ordinary change. Nobody else moves a spec. A spec named in `depends-on` is closed when it is in the shipped folder, or when it is `withdrawn` and no spec's `supersedes` names it; a superseding spec takes the withdrawn one's place in `depends-on`.
<!-- /shared:shipped-spec -->

## Done when

- The gate has a packet holding a checker report whose `overall` is `not refuted` or `not accepted`, and the user knows which steps ran by hand, without a guard or a packet script.
- Or you stopped at a named point, which is a valid outcome: the spec is not approved; the builder is blocked on a precondition; a blocking questions entry is open and its change is waiting to be merged; an attestation is waiting for its value owner.
- Every `learned` item is a findings entry with `status: hypothesis`, and nothing you wrote is on the builder's branch.
