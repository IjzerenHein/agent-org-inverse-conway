# Lens placement: <short name of the statement>

<!-- Instructions to whoever fills this in: delete every HTML comment from the output, the `shared:` marker lines included. The text between the markers stays. -->

- Date: YYYY-MM-DD
- Statement, verbatim: "<the words of whoever holds the expertise>"
- Origin: <person and role, record id, escape entry, requirement id, or where it was imported from>
- Reach: <inside the harness only | builders outside the harness must heed it>. Answered by: <name, role>. Reach exceptions: <clause ids and their reach, or none>
- Profile (`docs/process/profile.yml`): <approved | proposed, read against the last approved version at <commit>, or "no approved version readable" | none>. Strictest values over the paths concerned: P3 <value>, P5 <value>, P8 <value>, P10 <value>, P12 <value>
- Escape, only when the source is one: `occurrence` <n> and `blast-radius` <a, b or c>, read from <escapes entry path>; <confirmed | still a proposal>
- Artefact paths: <from the profile's `artefacts:` table | skill defaults, listed here>

## Placement table

One row per clause and home. A step that yields several homes (step 2: check, hook, memory line) gets one row each. A clause that needs no new home gets one row whose Home is "none, already at <path>", or "none" with the reason.

| Id | Clause (quoted) | Home (step) | File | Owner (tier) | How it loads | How it goes stale | Source |
|---|---|---|---|---|---|---|---|
| C1 | "<clause>" | <home> (step N) | `<path>` | <team or role> (<process, discipline or domain>) | <load guarantee> | <what makes it stale and what catches that> | <kind and pointer of the source mark> |

Must not be missed: <clause ids, each with the row that holds its check or named human control>

## Proposed edits

### Lens edits: the owning team's ordinary review

Per file: the path, the team that reviews it, and the exact lines to add, change or delete.

<!-- shared:lens-source-mark -->
Every lens line ends with its source as a literal mark: `(source: <kind>[, unvalidated], <pointer>)`. `<kind>` is `interview`, `record residue`, `escape`, `mandated control` or `imported`; `<pointer>` names the origin (person and date, record id, ledger entry path, requirement id, or where the line was imported from). An `imported` line carries `unvalidated` until a retro rules on it, and a `mandated control` line is never ablated.
<!-- /shared:lens-source-mark -->

```text
<path>   reviewer: <owning team>
+ <line, ending with its source mark>
- <line to delete>
```

When a lens is added at a scope, also add its line to the lens index in the memory file at that scope: the path and what it covers.

### Wall changes: proposed to the harness owner, never applied by an agent

<!-- shared:walls -->
Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.
<!-- /shared:walls -->

| Clause | Wall (kind, and the file or setting) | What it asserts or does | Where and when it runs | Failure message, for a check: the rule, why, how to fix, pointer |
|---|---|---|---|---|

### Records, ledger entries and work items

- Decision record to write: <title and the options>, through the adr skill
- Check or default that needs code: <what it must do>, as a work item through the spec skill
- Ledger entries to add (questions, findings, facts, experiments, obligations): per entry, its path and the entry itself, filled from this skill's template for that kind (`assets/question-entry-template.md`, and likewise `finding-`, `fact-`, `experiment-` and `obligation-entry-template.md`). They are lens edits: written only when asked, under the owning team's ordinary review.

## Open questions

Each is a proposed entry in the questions ledger, from `assets/question-entry-template.md`, one file per entry, written when asked.

<!-- shared:questions-close -->
Questions close by human decision, attested fact or evidence id, never by agent opinion.
<!-- /shared:questions-close -->

| Clause | Question | Who can answer | Proposed ledger entry (path) |
|---|---|---|---|

## Prose to delete

Lines that a check now covers, or whose source was withdrawn: <file and line>
