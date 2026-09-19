---
kind: finding
found: <YYYY-MM-DD>
found-by: <agent role, or person>
question: <path to the questions entry this bears on, or empty>
status: hypothesis      # hypothesis | adjudicated. Stays hypothesis until a named person rules on it.
adjudicated-by:         # name and role
adjudicated-on:
ruling:                 # what the adjudicator decided, in one line
---

<!-- One file per finding: docs/ledgers/findings/YYYY-MM-DD-slug.md, or the path from the profile's artefacts table. A hypothesis never loads as a rule and never stands as a fact. Delete this comment. -->

## Claim

<One claim, one sentence.>

## Evidence

<!-- At least one item that a machine can recheck (V7). A claim without evidence is not recorded. Delete the lines you do not use. -->

- Quote: "<verbatim text>" (`<path>:<line>` at `<commit>`, or <URL> retrieved <YYYY-MM-DD>)
- Query id: <id and the system it ran in>
- Telemetry window: <source, from, to>
- Reproduction: `<command>` gives <observed output>

## Bears on

<What this supports or contradicts: milestone ids, assumptions, specs or records.>
