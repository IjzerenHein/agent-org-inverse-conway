---
retro: YYYY-MM-DD
window: YYYY-MM-DD to YYYY-MM-DD   # previous retro, or the agreed start date, to today
run-by:                            # name and role of the human who runs this retro
prepared-by:                       # the agent or tool that prepared it
profile:                           # path and commit of the profile that was read, or `none`
defaults-used: []                  # artefact paths taken from the skill's defaults
---

# Retro YYYY-MM-DD

Keep it short. Point to entries by path and do not re-summarise them. A section with nothing to report says `none`. No personal, customer or production data: point to the record in its system of record.

## Decisions

One row per decision. Record an outcome only from a person who holds the role named in the row; the person who runs the retro is not always that person. Until then the outcome stays `open`. Decline is a valid outcome.

| # | Decision | Options | Recommendation | Evidence | Decides (role) | Outcome (accept, decline or defer; name; date) |
|---|---|---|---|---|---|---|
| D1 | | | | | | open |

## Escapes

| Entry | Hop | Tier | P9 | Lag (days) | Occurrence | Promoted to | Decision |
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

- Metric, quoted from the profile:
- Measured value and source:
- Verdict: paid back, not yet, or not measurable (questions entry: `<path>`)

Cut candidates. Nothing in the invariant core, no registered control and nothing that guards a P9 c path or surface is listed. A candidate without both sources is a questions entry, not a row.

| Candidate | Cost in the window (value, source) | What it caught (value, source) | Decision |
|---|---|---|---|
| | | | D? |

## Housekeeping

- Shipped specs moved:
- Pointers to moved specs that live in walls, for the harness owner:
- Specs not yet shipped, with the evidence still missing:
- Expired probes and experiments (entry, expiry, earlier extensions, keep or kill or extended, decision, resulting `build` or `retire` item):
- Imported lens lines ruled on (line, keep or delete, decision):

## Re-profile triggers

| Trigger | Changed since the last retro? | Pointer, or who said so |
|---|---|---|
| Stage | | |
| Team or approvers | | |
| Regulator or legal exposure | | |
| Model | | |

Recommendation: run the profile skill for `<overlay>`, or none needed.

## Ablation

Only after a model upgrade, and only when no ablation entry names this model version yet; otherwise `none`.

- Model version:
- Component:
- Hypothesis:
- Measure (payback metric and escapes):
- Window, and who set it:
- Decides:
- Left out because invariant core, registered control or P9 c:
- Experiments entry, once accepted:

## Flow-back

| Entry | Tier | Second boundary (entry path or attestation) | Action (stays, waiting, or drafted `<path of the draft file>`) |
|---|---|---|---|

## Questions opened

- `<path of each questions ledger entry opened in this retro>`
