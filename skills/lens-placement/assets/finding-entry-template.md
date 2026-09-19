---
ledger: findings
id: YYYY-MM-DD-slug            # the file name without .md
status: hypothesis             # hypothesis | adjudicated. It stays `hypothesis` until a named person rules on it.
found: YYYY-MM-DD
found-by: ""                   # the role or person: researcher, builder (spec id), chunk reader, a named person
origin: ""                     # what asked for it: path of the questions entry, spec, record or placement it bears on; or empty
adjudicated-by: ""             # name and role; empty until then
adjudicated-on: ""             # YYYY-MM-DD
ruling: ""                     # what the adjudicator decided, in one line, with a pointer to where they said it
---

# <One claim, in one sentence>

<!-- One file per finding: <ledgers>/findings/YYYY-MM-DD-slug.md. Delete this comment. A `hypothesis` never loads as a rule and never stands as a fact. A claim without evidence is not recorded. When the entry is made from a builder's `learned` item, the heading is the builder's `claim`, copied unchanged, and its `pointer` is the evidence; never reword either. -->

## Evidence

<!-- At least one item that a machine can recheck (V7). Delete the lines you do not use. -->

- Quote: "<verbatim text>" (`<path>:<line>` at `<commit>`, or <URL> retrieved <YYYY-MM-DD>)
- Query id: <id and the system it ran in>
- Telemetry window: <source, from, to>
- Reproduction: `<command>` at `<commit>` gives <observed output>

## Bears on

<What this supports or contradicts, as pointers: milestone ids, assumptions, specs, records, lens lines.>

## Pointers

<Appended later, newest last. Never re-summarise.>
