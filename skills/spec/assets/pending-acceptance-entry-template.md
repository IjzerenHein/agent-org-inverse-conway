---
ledger: pending-acceptance
opened: YYYY-MM-DD
spec: "NNN-slug"
status: open            # open until the slice lands; closed when it lands or when the spec is withdrawn
checks:
  - id: "NNN-A1"
    path: ""            # the check, outside the spec's touches
    command: ""         # how to run it
---

# Pending acceptance for spec NNN

These checks cover behaviour that does not exist yet. They fail until the slice lands and must pass once it has.

<!-- Only checks for new behaviour belong here. A check that must stay green, such as a characterisation check or a golden master, is never pending. -->

- Closed by: <evidence id of the run in which every listed check passed, or the date the spec was withdrawn>
