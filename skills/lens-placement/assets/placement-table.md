# Lens placement: <short name of the statement>

- Date: YYYY-MM-DD
- Statement, verbatim: "<the words of whoever holds the expertise>"
- Origin: <person and role, record id, escape entry, requirement id, or where it was imported from>
- Reach: <inside the harness only | builders outside the harness must heed it>. Answered by: <name, role>. Reach exceptions: <clause ids and their reach, or none>
- Profile: <path read, or "none">. Strictest values over the paths concerned: P3 <value>, P5 <value>, P8 <value>, P9 <value>, P10 <value>, P12 <value>
- Artefact paths: <from the profile's `artefacts:` table | skill defaults, listed here>

## Placement table

One row per clause and home. A step that yields several homes (step 2: check, hook, memory line) gets one row each. A clause that needs no new home gets one row whose Home is "none, already at <path>", or "none" with the reason.

| Id | Clause (quoted) | Home (step) | File | Owner (tier) | How it loads | How it goes stale | Source |
|---|---|---|---|---|---|---|---|
| C1 | "<clause>" | <home> (step N) | `<path>` | <team or role> (<process, discipline or domain>) | <load guarantee> | <what makes it stale and what catches that> | <source kind, pointer> |

Must not be missed: <clause ids, each with the row that holds its check or named human control>

## Proposed edits

### Lens edits: the owning team's ordinary review

Per file: the path, the team that reviews it, and the exact lines to add, change or delete. Every added line carries its source.

```text
<path>   reviewer: <owning team>
+ <line> (source: <interview | record residue | escape | mandated control | imported, unvalidated>, <pointer>)
- <line to delete>
```

When a lens is added at a scope, also add its line to the lens index in the memory file at that scope: the path and what it covers.

### Wall changes: proposed to the harness owner, never applied by an agent

Walls are agent configuration, CI, capture jobs and whatever defines the shipped artefact. That includes hooks, subagent definitions, workflow scripts, required-reviewer configuration, and build or generator configuration.

| Clause | Wall (kind, and the file or setting) | What it asserts or does | Where and when it runs | Failure message, for a check: the rule, why, how to fix, pointer |
|---|---|---|---|---|

### Records, ledger entries and work items

- Decision record to write: <title and the options>, through the adr skill
- Check or default that needs code: <what it must do>, as a work item through the spec skill
- Ledger entries to add (questions, findings, facts, experiments, obligations): one new file per entry, at <path>. Each holds at least the clause quoted, its origin, the question or claim, who can answer or attest, the status (`open`, or `hypothesis` for a finding) and the date. They are lens edits: written only when asked, under the owning team's ordinary review.

## Open questions

Each is a proposed entry in the questions ledger, one file per entry, written when asked. It closes by human decision, attested fact or evidence id, never by agent opinion.

| Clause | Question | Who can answer | Proposed ledger entry (path) |
|---|---|---|---|

## Prose to delete

Lines that a check now covers, or whose source was withdrawn: <file and line>
