---
retro: YYYY-MM-DD
window: YYYY-MM-DD to YYYY-MM-DD   # previous retro, or the agreed start date, to today
run-by:                            # name and role of the human who runs this retro
prepared-by:                       # the agent or tool that prepared it
profile:                           # path and commit of the profile that was read, or `none`; for a `proposed` profile add the last approved commit that was read
defaults-used: []                  # artefact paths taken from the skill's defaults
---

# Retro YYYY-MM-DD

Keep it short. Point to entries by path and do not re-summarise them. A section with nothing to report says `none`. No personal, customer or production data: point to the record in its system of record. In the note, delete the two comment lines around the floor paragraph under Payback.

## Decisions

One row per decision. Record an outcome only from a person who holds the role named in the row; the person who runs the retro is not always that person. Until then the outcome stays `open`. Decline is a valid outcome.

| # | Decision | Options | Recommendation | Evidence | Decides (role) | Outcome (accept, decline or defer; name; date) |
|---|---|---|---|---|---|---|
| D1 | | | | | | open |

## Escapes

| Entry | Hop | Tier | P9 (a, b, c or unclassified) | Lag (days) | Occurrence | Promoted to | Decision |
|---|---|---|---|---|---|---|---|
| `<path>` | | | | | | | D? |

## Prose deleted

| Landed check (path, run id) | Prose removed (path, lines) | Change |
|---|---|---|

## Waits

Hours awaiting each approver, blocked items, fix rounds per item. Ranked by total elapsed hours in the window. The proposal for rank 1 is decision D?.

| Rank | Wait | Measured (hours) | Source (query or command) | Response time in the profile |
|---|---|---|---|---|
| 1 | | | | |

Not ranked, because the source gives no hours (measure, questions entry):

## Payback

All quoted from `dials.P2.payback` in the profile, never reworded. When keep or cut at the end of the adoption pilot is decided here, the adoption checklist points to the decision rows below.

- Metric (`metric`):
- Paid back when (`paid_back_when`):
- Declared by, on (`declared_by`, `declared_on`):
- Measured value and source (`evidence_source`, with the query or command):
- Verdict: paid back, not yet, or not measurable (questions entry: `<path>`)

Cut candidates. Nothing under the floor is listed:

<!-- shared:floor -->
Never propose removing or weakening anything in the invariant core (T1 to T6, V1 to V7, the design and release gates, global M0), a registered control (a lens line with source `mandated control`, or a row of `dials.P10.mandated_controls` in the profile), or a component that guards a path or surface at P9 c. Never propose a default if silent at P4 b or c.
<!-- /shared:floor -->

A candidate without both sources is a questions entry, not a row.

| Candidate | Cost in the window (value, source) | What it caught (value, source) | Decision |
|---|---|---|---|
| | | | D? |

## Housekeeping

- Pending-acceptance entries with every check green on the default branch (entry, run id), close proposed to the steward (decision):
- Shipped specs: the prepared move (change), or reported for the harness owner because a post-merge script should have moved them:
- Pointers to moved specs that live in walls, for the harness owner:
- Specs not yet shipped, with the evidence still missing:
- Expired probes and experiments (entry, spec if any, expiry in force, earlier extensions, keep or kill or extended, decision, resulting `build` or `retire` item, and for an extension the one change that appends it to the entry and to the spec's section 9):
- Imported lens lines ruled on (line, keep or delete, decision):

## Re-profile triggers

| Trigger | Changed since the last retro? | Pointer, or who said so |
|---|---|---|
| Stage | | |
| Team or approvers | | |
| Regulator or legal exposure | | |
| Model | | |

Recommendation: the profile skill, re-profiling, for `<ownership path>`; or the profile skill, row update, for `<keys, each with its pointer>`; or none needed.

## Ablation

Only after a model upgrade, and only when no ablation entry names this model version yet; otherwise `none`.

- Model version:
- Component:
- Hypothesis:
- Measure (payback metric and escapes):
- Window, and who set it:
- Decides:
- Left out because under the floor (see Payback):
- Experiments entry, once accepted:

## Flow-back

| Entry | Tier | Second boundary (entry path or attestation) | Action (stays, waiting, or drafted `<path of the draft file>`) |
|---|---|---|---|

## Questions opened

- `<path of each questions ledger entry opened in this retro>`
