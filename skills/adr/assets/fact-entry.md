---
kind: fact
id: YYYY-MM-DD-slug            # same as the file name without .md
drafted: YYYY-MM-DD
drafted-for: <path of the decision or contract record that cites this entry>
attested-by: <name, role>      # a named person inside the boundary; never an agent
valid-from: YYYY-MM-DD         # as the person states it; ask, never supply
valid-to: YYYY-MM-DD           # as the person states it; ask, never supply
said-where: <pointer: message id, review URL, or path of the note where they said it>
confirmed:                     # review URL where the named person approved this entry; empty until then
status: draft                  # draft | attested | expired | voided; attested only once `confirmed` is filled
---

## Fact

<One statement, in the person's words where they can be quoted.>

## Limits

<What the person said it does not cover; "none stated" if none.>

## Renewal

<Who renews or voids it and what triggers that, as the person states it; otherwise "ask again at valid-to".>
