# Adoption checklist

<!--
Made and maintained by the adopt skill. Background: agent-org-inverse-conway, process v2, section 4 "Bootstrap" and rule T5.
This file is the only record of where adoption stands. It points to other artefacts and never restates them.
Replace every <...>. Never invent a value: ask, or open a questions ledger entry and point to it.
-->

| Field | Value |
|---|---|
| Process | agent-org-inverse-conway, process v2 |
| Status | in-progress |
| Started | <YYYY-MM-DD> |
| Closed | |
| Harness owner (T5) | <name, role> |
| Decision rights: approves the profile, decides keep or cut | <name, role> |
| Tools: agents, hosting, CI | <as the owner named them> |
| Profile | <path; filled when 1.3 is `done`> |
| P6 start, from the approved profile | <filled when 1.3 is `done`: a greenfield; b brownfield with tests; c brownfield without> |
| Next action | <one line: what, and who takes it> |

Status is `in-progress`, `adopted` or `stopped`. A stop carries the owner's reason in the log.

## How to read a row

- State is one of `todo`, `doing`, `blocked`, `done`, `n-a`, `cut`.
- `done` needs evidence: a path, a commit or PR id, a CI run id, a ledger entry, or an attestation (name, role, validity dates) that the person committed themselves or approved in review. The author's claim is not evidence.
- `blocked` points to the questions ledger entry, the pilot item or the person it waits for. It does not stop rows that do not depend on it. `n-a` and `cut` give the reason.

## Step 0. Spike

Time-box, in the owner's words: <...>. Started <YYYY-MM-DD>, ended <YYYY-MM-DD>.

Rows 0.1 to 0.5 run in a disposable repository, or on a throwaway branch that holds no project content: <where>. Nothing from the spike is merged into the project; only the facts entries enter it. Rows 0.6 and 0.7 need the real repository.

Each result is a facts ledger entry with its reproduction. An untested row gets a questions ledger entry, and its fallback holds until the test is run.

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
| 1.2 | Payback metric, and what value counts as paid back, declared in the profile before any harness is built | todo | <path and field> |
| 1.3 | Profile approved by whoever holds decision rights | todo | <their approving review, their commit, or an attestation they committed or approved in review> |
| 1.4 | Governance onboarding. Applies at P10 b or c, or when P11 names any limit on what agents read, where inference runs, approved models or cloud agents; otherwise `n-a`. Dial values: <...> | todo | |

Payback:

- Metric: <pointer into the profile; do not copy the value>
- What counts as paid back: <pointer into the profile; do not copy the value>
- Declared by <name, role> on <YYYY-MM-DD>
- Time-box for building the walls: <the owner's words, or "none set">

## Step 2. Walls

Built by the harness owner and applied through the ordinary human change path (T5): by the harness owner, or by the people that path names. An agent may prepare a draft and never applies one. Nothing here starts before 1.2, 1.3 and, where it applies, 1.4 are `done`.

- Ordinary human change path here, in the owner's words: <who reviews, who applies>
- Two-person rule on walls (P4 b or c): <yes or no, from the approved profile>
- An agent-drafted wall change is reviewed as a diff from a base checkout, never in an agent session opened on the draft branch.
- P6 a only: rows that need code (2.1, 2.5, the guard's test diff) are `blocked` on pilot item 4.1 or 4.2 and close before 4.3. Order confirmed by <harness owner, date>.

| # | Wall | State | Draft (path or PR, prepared by) | Applied by (name, commit or setting, date) | Evidence |
|---|---|---|---|---|---|
| 2.1 | Reproducible build | todo | | | |
| 2.2 | Guard: computed from the base, keeps the diff inside `touches`; without a spec it derives gates from the path classes touched | todo | | | |
| 2.3 | Read wall: allowlist of paths, connectors and environments (V5) | todo | | | |
| 2.4 | Execute wall: fake externals or disposable state, no secret that can release or reach production (V5) | todo | | | |
| 2.5 | Acceptance job | todo | | | |
| 2.6 | Machine credential without merge rights | todo | | | <the row 0.6 test repeated under this credential: a push and a merge refused> |
| 2.7 | P6 c only: exports of the running system with a blocking drift check | todo | | | |

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
| 3.a | Always-on memory in `AGENTS.md` with the lens index (the list of rule files, project skills and ledgers, with the paths each applies to), beside a `CLAUDE.md` containing `@AGENTS.md` | todo | |
| 3.b | Every lens line added carries a `source` | todo | |
| 3.c | The owner confirms that nothing the agents need is left outside the repository | todo | <attestation (name, role, validity dates), committed by the owner or approved by them in review> |

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

Filled when the pilot is complete. The agent assembles measured against declared; whoever holds decision rights decides. What has not paid back is cut. Candidates are what the dials added. Not candidates: the six global M0 rows, the design and release gates, and anything with source `mandated control`; wanting one of those gone is a decision to stop (status `stopped`, reason in the log). A wall is cut by the harness owner through the ordinary human change path; a lens is cut through ordinary review.

| Harness component (a dial-added wall, an extra gate, a lens, a kit skill) | Measured against the payback metric (pointers) | Decision (keep or cut) | Decided by, date (their commit, approving review or attestation) | Change (commit or PR, applied by) |
|---|---|---|---|---|
| <...> | | | | |

## Log

Append only. One line per session or state change: date, what changed, who or which session.

- <YYYY-MM-DD> <what changed> <who>
