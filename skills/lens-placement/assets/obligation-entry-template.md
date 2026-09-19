---
ledger: obligations
id: YYYY-MM-DD-slug            # the file name without .md
status: open                   # open | closed
commitment: ""                 # one sentence: what was promised
owed-to: ""                    # the consumer, partner, regulator or team it was promised to
owner: ""                      # the named person who answers for it
due: ""                        # a date (YYYY-MM-DD) or a version; given by a human, never estimated
made-where: ""                 # pointer to where the commitment was made: record, contract, announcement, message id
check: ""                      # id or path of the date- or version-keyed failing check; `pending: <spec id>` until it has landed
closed-on: ""                  # YYYY-MM-DD; empty while open
closed-pointer: ""             # the evidence id that shows it was met, or the decision record that released it
---

# <The commitment, in a few words>

<!-- One file per commitment due later: <ledgers>/obligations/YYYY-MM-DD-slug.md. Delete this comment. The entry comes with a check that starts failing at the date or version in `due`; wiring that check into CI is the harness owner's change. The roadmap reads `due` as a fixed point. -->

## What meeting it takes

<Pointers to the milestone, spec or record that will meet it; "not yet planned" if none.>

## Pointers

<Appended later, newest last.>
