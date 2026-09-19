---
ledger: questions
id: YYYY-MM-DD-slug            # the file name without .md
status: open                   # open | closed
raised: YYYY-MM-DD
raised-by: ""                  # the skill or role, and the person or artefact it came from, for example "spec skill, interview with <name>" or "builder, spec 012"
can-answer: ""                 # the named person, system, measurement or experiment that can answer; "not known yet" if nobody knows. Never guess a name.
blocks: ""                     # what waits on the answer: a file and field, a spec section or acceptance id, a milestone, a record; or "nothing"
blocking: false                # true when the thing named in `blocks` cannot be approved, built or checked without the answer
closed-by: ""                  # human decision (name, role) | attested fact | evidence id. Never an agent's opinion.
closed-on: ""                  # YYYY-MM-DD; empty while open
closed-pointer: ""             # path of the record, facts entry or finding, or the evidence id or review URL, that holds the answer
---

# <The question, in one sentence that a person or a piece of evidence can answer>

<!-- One file per question: <ledgers>/questions/YYYY-MM-DD-slug.md. Delete this comment. Agents prepare options, never facts. A question closes by human decision, attested fact or evidence id, never by agent opinion. -->

## Why it matters

<What would otherwise have to be guessed, and what changes with the answer. Quote the person who raised it where you can.>

## Options

- <an option and what it would mean; "none" if there are none. Options are never answers.>

## Working assumption

<The value or reading used until this closes, and why it is the stricter of the plausible ones; "none" when nothing proceeds meanwhile.>

## Answer

<Empty while open. Filled from the decision, attestation or evidence named in `closed-by`, quoted or linked. Then set `status: closed` and fill the three `closed-` fields.>

## Pointers

<Appended later, newest last: findings, records, evidence ids. Never re-summarise.>
