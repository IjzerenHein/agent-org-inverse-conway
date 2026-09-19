---
ledger: experiments
id: YYYY-MM-DD-slug            # the file name without .md
status: running                # running | kept | killed
type: product                  # product (a product result, a probe) | ablation (one harness component removed after a model upgrade)
subject: ""                    # the feature, flag or harness component under test
spec: ""                       # id of the probe spec, when this belongs to one; otherwise empty
hypothesis: ""                 # what is expected, in the owner's words
measure: ""                    # what is measured and the evidence source; for an ablation, the payback metric and escapes
model-version: ""              # ablation only
decides: ""                    # the named person or role who rules keep or kill
started: YYYY-MM-DD
expiry: YYYY-MM-DD             # set by a human; expiry forces keep or kill. With `spec` filled it equals the spec header's `expiry`.
extensions: []                 # appended, never edited: { date: , new-expiry: , reason: , decided-by: }
                               # Every reader takes the latest of `extensions`, else `expiry`.
outcome:
  decision: ""                 # keep | kill; empty while running
  decided-by: ""               # name, role
  decided-on: ""               # YYYY-MM-DD
  pointer: ""                  # the retro decision row or review URL where it was decided
follow-up: ""                  # keep of a probe: the `build` item that promotes it. kill: the `retire` item. ablation: keep restores the component, kill retires it.
---

# <The experiment, in a few words>

<!-- One file per experiment: <ledgers>/experiments/YYYY-MM-DD-slug.md. Delete this comment. Write `unknown` where the human has not said, never an estimate. Never re-date anything yourself: an extension is a human decision, appended to `extensions`. When `spec` is filled, the retro skill prepares one change that appends the extension here and as an `expiry-extension` row in that spec's section 9, so the two never differ. An ablation never removes a registered control or anything that guards a P9 c path or surface. After the human has confirmed the entry, change only `status`, `extensions`, `outcome` and `follow-up`, and append under Pointers. -->

## Result

<Empty while running. At expiry: the measured value with its source (query id, telemetry window, run id), next to the hypothesis. Point, do not retell.>

## Pointers

<Appended, newest last: evidence ids, the retro notes that looked at it, the follow-up item.>
