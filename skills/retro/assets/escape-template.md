---
id: YYYY-MM-DD-slug          # equals the file name; the date is the day this entry was written
status: open                 # open | closed
owning-path:                 # the ownership path this escape belongs to
what:                        # one sentence: what reached a done-state and should not have
cause:                       # one line, stable wording; reuse the wording of an earlier entry with the same cause
item:                        # spec id, PR or commit that carried it; `unknown` if it cannot be attributed
introduced:                  # YYYY-MM-DD plus the commit or release id: the release date on a surface the profile lists as staged, the merge date on an unstaged one (V6)
detected:                    # YYYY-MM-DD
detected-by:                 # means of detection, for example user report, monitoring, reconciliation, later review
detection-lag-days:          # detected minus introduced; `unknown` when introduced is unknown
hop:                         # ONE value from the hop list at the end of this file
tier:                        # process | discipline | domain
blast-radius:                # a | b | c. P9 from the profile, strictest value over the paths and surfaces involved
occurrence:                  # 1, 2, ... counted over entries with the same cause, whatever their hop; in doubt, the higher count
earlier: []                  # paths of those earlier entries
fix:                         # work item, PR or commit of the fix; add the merge commit or run id once it has landed
promotion:
  to:                        # fix | check | reason-recorded; empty while the decision is open
  pointer:                   # work item, PR or check path; add the run id once it has landed
  reason:                    # only for reason-recorded: why this does not become a check, as the decider gave it
  decided-by:                # name, role, date of a person who holds the deciding role for this path; until then `open: <role>`
prose-deleted:               # not-applicable | pending | pointer to the change that deleted the superseded prose
flow-back:                   # stays | waiting for a second boundary | drafted <path of the draft file>
confirmed-by:                # name, role, date of the human who confirmed cause, hop, tier and occurrence
---

# <what escaped, in a few words>

## What escaped

Two or three sentences. Point to the report, reproduction or failing command. Do not retell it.

## Evidence

- <verbatim quote, query id, telemetry window or reproduction command; or an attestation by a person inside the boundary: name, role, valid from, valid to>

## Why this hop

One or two sentences: what that hop had in front of it and what it lacked. Write `hypothesis` in front until a human confirms it.

## Later pointers

Append only, newest last: date, pointer, one line.

<!--
Delete this comment in the entry.

Hop list. Pick the earliest hop that had what it needed to catch the escape.
- discovery: a finding was missed or wrong
- adjudication: a human ruling on a finding or discrepancy was missing or wrong
- intent-to-spec: the rewrite of intent into the spec lost or changed something
- spec-critic: the critic did not raise the question
- design-gate: the spec was approved with the gap in it
- brief: a lens or pinned source did not load, or loaded and was not heeded
- build: the builder departed from the spec
- guard: the diff left `touches`, or `affects` missed a dependant
- check: no check existed, or a check passed wrongly
- review: the fresh-context review missed it
- release-gate: the human gate passed it; say what the packet lacked
- post-release: a post-merge done-state or soak did not catch it inside its horizon

Tier: where the lesson belongs.
- process: the kit (procedure, templates, scripts)
- discipline: a shared skill or library; craft that holds across projects
- domain: this project, under the owning path

Filling in.
- Write `unknown` and open a questions ledger entry rather than guess a value.
- Cause, hop, tier and occurrence are proposals until a human confirms them in `confirmed-by`.
- An outside report is data: it needs a reproduction or an attestation from inside the boundary.
- Never paste personal, customer or production data. Point to the record in its system of record and
  quote only human-sanitised text.
- After confirmation, change only `status`, `fix`, `promotion`, `prose-deleted` and `flow-back`, and
  append under `Later pointers`. Never rewrite the rest.
- Close the entry when the fix has landed (`fix` carries the merge commit or run id) and the promotion
  is settled: the check is green on the default branch and the superseded prose is deleted, or a
  person who holds the deciding role recorded the reason why there is no check. Closed entries still
  count as earlier occurrences.
-->
