---
ledger: pending-acceptance
id: YYYY-MM-DD-slug            # the file name without .md
status: open                   # open | closed. Open until the slice lands. Closed by the project's post-merge script, or where
                               # none exists by the steward in an ordinary change; or in the change that sets the spec `withdrawn`.
                               # No agent closes it on its own reading. Closing moves the checks into the blocking run.
spec: "NNN-slug"
opened: YYYY-MM-DD
checks:                        # one row per check for new behaviour; each fails until the slice lands
  - acceptance-id: "NNN-A1"
    path: ""                   # the check, outside the spec's `touches`
    command: ""                # a copy of that acceptance id's Command line in the spec; the spec is the source
closed-on: ""                  # YYYY-MM-DD; empty while open
closed-by: ""                  # "post-merge script", or the steward's name
closed-pointer: ""             # id of the run in which every listed check passed on the default branch; or the spec's `withdrawn` pointer
---

# Pending acceptance for spec NNN

<!-- One entry per spec: <ledgers>/pending-acceptance/YYYY-MM-DD-slug.md. Delete this comment. Only checks for new behaviour belong here. A check that must stay green, such as a characterisation check or a golden master, is never pending. -->

These checks cover behaviour that does not exist yet. They fail until the slice lands and must pass once it has. While this entry is open the acceptance job runs them without blocking; once it is closed they block. The builder never edits, skips, weakens or regenerates them.

## Pointers

<Appended, newest last: run ids of the pending run, the closing run.>
