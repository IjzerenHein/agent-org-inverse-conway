# Adoption checklist

<!--
Made and maintained by the adopt skill. Background: agent-org-inverse-conway, process v2, section 4 "Bootstrap" and rule T5.
This file is the only record of where adoption stands, and the one home of wall state: the roadmap points at rows 2.1 to 2.7 and does not repeat them. It points to other artefacts and never restates them.
Rows marked "kit addition" are not among the five bootstrap steps of the process; the kit adds them so that the vision and the roadmap are in place before the pilot.
Replace every <...>. Never invent a value: ask, or open a questions ledger entry and point to it.
-->

| Field | Value |
|---|---|
| Process | agent-org-inverse-conway, process v2 |
| Status | in-progress |
| Started | <YYYY-MM-DD> |
| Closed | |
| Harness owner (T5; in the profile: `dials.P4.role_matrix`, role `harness owner`) | <name, role> |
| The owner: holds decision rights over the profile (`approval.approver`), approves it, decides keep or cut | <name, role> |
| Tools: agents, hosting, CI | <as the owner named them> |
| Confidential work expected | <yes or no, in the owner's words> |
| Approval of agent tooling, or limits on what agents read or where inference runs, needed before an agent may read this repository | <no; or who and what, and the date it was given> |
| Profile | <path; filled when 1.3 is `done`> |
| P6 start, from the approved profile | <filled when 1.3 is `done`: a greenfield; b brownfield with tests; c brownfield without> |
| Next action | <one line: what, and who takes it> |

Status is `in-progress`, `adopted` or `stopped`. A stop carries the owner's reason in the log. The profile skill reads this header and plays the answers back; it does not ask them again.

## How to read a row

- State is one of `todo`, `doing`, `blocked`, `done`, `n-a`, `cut`.
- `done` needs evidence: a path, a commit or PR id, a CI run id or a ledger entry. A person's word counts only as a facts ledger entry with `evidence: attestation` and status `attested`, inside its validity dates. The author's claim is not evidence.
- `blocked` points to the questions ledger entry, the pilot item or the person it waits for. It does not stop rows that do not depend on it. `n-a` and `cut` give the reason.

## Step 0. Spike

Time-box, in the owner's words: <...>. Started <YYYY-MM-DD>, ended <YYYY-MM-DD>.

Rows 0.1 to 0.5 run in a disposable repository, or on a throwaway branch that holds no project content: <where>. Nothing from the spike is merged into the project; only the facts entries enter it. Rows 0.6 and 0.7 need the real repository.

Each result is a facts ledger entry with `evidence: reproduction`. An untested row gets a questions ledger entry, and its fallback holds until the test is run.

| # | Test | State | Result | Evidence (facts entry) | If refuted or untested |
|---|---|---|---|---|---|
| 0.1 | The tool's plugin or package format carries agent definitions and workflow scripts | todo | | | Copy them into the project's agent configuration, version-stamped. That is a wall change: add a row in step 2 |
| 0.2 | Skill preload, path-scoped rules and hooks work inside workflow, worktree and cloud agents | todo | | | The spec names its lens files by path and the builder reads them; a CI job rechecks that list, which is a wall change: add a row in step 2. Use a `brief` command only if your kit version ships one |
| 0.3 | Rule files accept extra frontmatter keys such as `objects:` | todo | | | A sidecar index |
| 0.4 | A session opened on a PR head does NOT load that PR's agent configuration | todo | | | Assume it loads: review from a sandboxed base checkout without credentials. Review agents run from a base checkout whatever the result (V5) |
| 0.5 | Private advisory forks run CI (only when confidential work is expected) | todo | | | A private mirror |
| 0.6 | Branch protection is enforced: a direct push, and a merge without the required review or green checks, are both refused. A push to this branch triggers: <...>. Run under the credential that agent runs actually use: <...> | todo | | | No fallback: agent credentials cannot merge. Unenforced protection becomes a row in step 2 for the harness owner. Agent runs under a human credential that can merge or bypass protection are a finding for row 2.6 |
| 0.7 | Headless build: from a clean checkout, one scripted command builds the project and runs its tests with nobody at the keyboard | todo | | | No fallback: it becomes the reproducible build row in step 2 |
| 0.8 | <anything else the plan relies on that nobody has seen work in these tools> | todo | | | <fallback, or a question for the owner> |

## Step 1. Profile and payback metric

| # | Item | State | Evidence |
|---|---|---|---|
| 1.1 | Profile and its four tables (gates, release surfaces, done-states, systems of record), written with the profile skill | todo | <path> |
| 1.2 | Payback declared in the profile before any harness is built: all five fields of `dials.P2.payback` are filled | todo | <profile path and the commit that filled them> |
| 1.3 | Profile approved by the owner, in the profile itself and on the default branch | todo | <`approval.approved_in`, and the commit that put the file on the default branch> |
| 1.4 | Governance onboarding, read from `governance_onboarding` in the approved profile: `n-a` when `needed` is false; otherwise every person in `approvers` has approved what `requires` states | todo | <for `n-a`: the key; otherwise each approver's review, commit or attested facts entry> |
| 1.5 | Kit addition. Vision approved, written with the vision skill. It may run before or beside 1.1 to 1.4 and does not gate step 2; it is needed before 3.f and the pilot | todo | <path, and the commit that put the approved page on the default branch> |

Payback. The profile is the system of record: point, do not copy.

- Metric: `dials.P2.payback.metric` in <profile path>
- What counts as paid back: `dials.P2.payback.paid_back_when`
- Measured from: `dials.P2.payback.evidence_source`
- Declared by, and on: `dials.P2.payback.declared_by`, `dials.P2.payback.declared_on`
- Time-box for building the walls: <the owner's words, or "none set">. The roadmap skill reads it here.

## Step 2. Walls

Built by the harness owner and applied through the ordinary human change path (T5): by the harness owner, or by the people that path names. An agent may prepare a draft and never applies one. Nothing here starts before 1.2, 1.3 and, where it applies, 1.4 are `done`.

- Ordinary human change path here, in the owner's words: <who reviews, who applies>
- Two-person rule on walls (P4 b or c): <yes or no, from the approved profile>
- An agent-drafted wall change is reviewed as a diff from a base checkout, never in an agent session opened on the draft branch.
- P6 a only: rows that need code (2.1, 2.5, the guard's test diff) are `blocked` on pilot item 4.1 or 4.2 and close before 4.3. Order confirmed by <harness owner, date>. The roadmap skill reads it here.

Rows 2.1 to 2.6 are global M0, the six items the harness owner builds. Row 2.7 exists only at P6 c.

| # | Item | State | Draft (path or PR, prepared by) | Applied by (name, commit or setting, date) | Evidence |
|---|---|---|---|---|---|
| 2.1 | Reproducible build | todo | | | |
| 2.2 | Guard: computed from the base, it keeps the diff inside the `touches` of the spec that the first line of the pull request body names (`Spec: <spec path>`); without a spec it derives gates from the rows of the profile's `path_classes` table that match the paths touched | todo | | | |
| 2.3 | Read wall: allowlist of paths, connectors and environments (V5) | todo | | | |
| 2.4 | Execute wall: fake externals or disposable state, no secret that can release or reach production (V5) | todo | | | |
| 2.5 | Acceptance job | todo | | | |
| 2.6 | Machine credential without merge rights | todo | | | <the row 0.6 test repeated under this credential: a push and a merge refused> |
| 2.7 | P6 c only, otherwise `n-a`: exports of the running system with a blocking drift check. The harness owner says whether they belong here with the walls or with the milestone that first touches the exported system: <answer, name, date>. If with the milestone, the row is `n-a` and points to that milestone in the roadmap | todo | | | |

Global M0 ends here. More verification is bought per seam or slice (P8) and is recorded with the pilot item that needed it.

Further wall rows: created by a spike fallback, or moved here from the deferred table by the harness owner.

| # | Wall | State | Draft (path or PR, prepared by) | Applied by (name, commit or setting, date) | Evidence |
|---|---|---|---|---|---|
| 2.8 | <wall; name the spike row, or the dial and the pilot item that needs it> | todo | | | |

### Walls deferred until a slice needs them

A wall that a dial in the approved profile implies and that no pilot item needs yet. The harness owner, never an agent, moves a row into work, and only when a pilot item touches the path or surface.

| Wall | Dial and value that imply it | Pilot item or slice that needs it | Moved into work by (harness owner, date, new row #) |
|---|---|---|---|
| <...> | | | |

## Step 3. Memory into the repository

Sources outside the repository, as the owner listed them. The agent does not read them: the owner, or the person who holds a source, hands over the content, sanitised (V5). No secret, credential or personal data enters the repository; if one turns up, record only that it exists and tell the harness owner.

| # | Source (tool memory, user-level configuration, notes, chat history, a person) | Handed over by | What it holds | Went to (paths) | State | Evidence |
|---|---|---|---|---|---|---|
| 3.1 | <...> | | | | todo | |

| # | Item | State | Evidence |
|---|---|---|---|
| 3.a | Every source listed above shows where its content went | todo | <the rows above> |
| 3.b | Every lens line added ends with its source mark, `(source: <kind>[, unvalidated], <pointer>)`; what came from a source above is `imported` | todo | |
| 3.c | The owner confirms that nothing the agents need is left outside the repository | todo | <facts entry with `evidence: attestation`, status `attested`> |
| 3.d | Always-on memory in `AGENTS.md` (or the path in `artefacts.memory`) with the lens index (the list of rule files, project skills and ledgers, with the paths each applies to), beside a `CLAUDE.md` containing `@AGENTS.md`; made as an ordinary change, before the first placement | todo | <commit or PR> |
| 3.e | Kit addition. The memory file carries the line that imports or points at the approved vision (proposed by the vision skill; needs 1.5 and 3.d) | todo | <commit or PR> |
| 3.f | Kit addition. Roadmap approved, written with the roadmap skill (needs 1.3 and 1.5). `done` before pilot item 4.2 (brownfield) or 4.1 (greenfield) | todo | <path, and the approving review or commit at the gate that covers the roadmap> |

## Step 4. Pilot

The order follows P6. Delete the list that does not apply.

- Brownfield (P6 b, c): 4.1 a no-spec fix; 4.2 one spec; 4.3 a record with research fan-out.
- Greenfield (P6 a): 4.1 records for the irreversible stack choices; 4.2 a time-boxed walking skeleton, time-box in the owner's words: <...>; 4.3 the first spec.

| # | Pilot item | Artefacts (record, spec, PR) | State | P8 "no" rows on touched paths closed first (evidence) | Payback measurement | Evidence source | Escapes (entries written through the retro skill) |
|---|---|---|---|---|---|---|---|
| 4.1 | <...> | | todo | | | | |
| 4.2 | <...> | | todo | | | | |
| 4.3 | <...> | | todo | | | | |

## Keep or cut

Filled when the pilot is complete. The retro skill measures against the payback metric, proposes the candidates and records the owner's decisions in its retro note; this table only points there and records the change. Retro note: <path>. If the owner wants something gone that the retro's floor protects, that is a decision to stop (status `stopped`, reason in the log). A wall is cut by the harness owner through the ordinary human change path; a lens is cut through ordinary review.

| Harness component (a dial-added wall, an extra gate, a lens, a kit skill) | Decision row in the retro note (pointer) | Change (commit or PR, applied by) |
|---|---|---|
| <...> | | |

## Log

Append only. One line per session or state change: date, what changed, who or which session.

- <YYYY-MM-DD> <what changed> <who>
