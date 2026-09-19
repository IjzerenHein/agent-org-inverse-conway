---
id: "NNNN"
title: <short noun phrase naming the decision>
type: decision                # decision | contract
status: proposed              # proposed | accepted | declined | withdrawn | superseded
drafted: YYYY-MM-DD
owner: <name, role>           # holds decision rights for `covers` under the profile; contract record: a list, one named owner per side
owner-source: <profile keys that give the owner decision rights>
quorum: <as the profile sets it (P3 c); otherwise "none">
approvers: []                 # P3 b, c or P4 b, c: one {name, role, decided-on, pointer} per required approver; pointer is the review URL
decided-by:                   # name; filled at the decision, never before; empty when a default if silent applied (see Decision)
decided-on:                   # YYYY-MM-DD
decision-pointer:             # review URL or message id; "in session" only at P3 a and P4 a, until the record is in review
supersedes:                   # NNNN
superseded-by:                # NNNN; filled when a later accepted record replaces this one
irreversibility:
  class: <a | b | c | unclassified>   # looked up in the profile, never chosen; unclassified is treated as c
  source: <the profile keys the lookup used; where V6 made it c, also the owner's quoted answer or the release surface's audience entry; for unclassified, the path of the blocking questions entry>
covers:                       # what the decision covers; the irreversibility lookup reads all three
  paths: []                   # globs
  objects: []                 # tables, queues, flags and other objects outside the file tree
  surfaces: []                # names from the profile's release_surfaces: those the owner named and those whose paths match a covered path
---

# NNNN: <title>

## Decision to make

<One question.>

Why now: <what forces the decision>

Owner's intent, quoted (empty until the owner has spoken):

> <the owner's words, verbatim> (<name>, YYYY-MM-DD)

Requester's words, quoted (only when the requester is not the owner; otherwise delete):

> <the requester's words, verbatim> (<name, role>, YYYY-MM-DD)

## Constraints and non-goals

- <fixed before the options were gathered; "none" if none>

## Options

| | A: <name> | B: <name> | C: change nothing |
|---|---|---|---|
| What it is | | | |
| Cost | | | |
| Closes off | | | |
| Paths and surfaces touched | | | |
| Rests on claims | C1, C3 | | |
| Rests on hypotheses | | | |

## Evidence

Kinds: quote, query, telemetry, reproduction, finding, attestation, hypothesis.

| Id | Claim (outside world or current system) | Kind | Evidence |
|---|---|---|---|
| C1 | <one claim> | quote | <URL>, retrieved YYYY-MM-DD: "<verbatim quote>" |
| C2 | <one claim> | reproduction | `<command>` at <commit>: <observed output> |
| C3 | <one claim> | attestation | <facts ledger path>; counts only while the entry is `attested` and inside its validity dates, and a `draft` entry is listed as hypothesis |
| C4 | <one claim> | finding | <findings ledger path>; an unadjudicated finding is listed as hypothesis |
| C5 | <one claim> | hypothesis | not backed; see <questions ledger path> |

## Open questions

| Questions ledger entry | Can answer | Blocking |
|---|---|---|
| <path> | <the entry's `can-answer`> | true / false |

## Recommendation (agent's draft)

<The option, and the reasoning by claim id. Say plainly which parts rest on hypotheses.>

## Response time and default if silent

<From the profile's gates table: gate, response time, default. Or: "none: this waits for the owner's decision". Always "none" at P4 b or c; with no profile or no gate row for decision records; when the class is c or unclassified; when a covered surface is listed as unstaged; while a blocking question is open.>

## Decision

<Filled only after the owner decides. The owner's words, quoted, and the option chosen, "declined" or "withdrawn". If a default applied: the gate row, a recheckable delivery pointer (review URL or message id), the date the packet was delivered and the date the response time ran out.>

## Residue

| Invariant, one testable sentence | Enforced by | Where it runs | State | Confirmed by (name, date, pointer) |
|---|---|---|---|---|
| <what must never break> | <check id, and hook id if there is a second layer; or the reviewer role, for a named human control> | <PR, nightly, soak, post-release; or the paths the reviewer role covers and the evidence in that reviewer's packet> | landed / pending: <spec id> | <owner> |

<Or "none", with the reason.>

## Lenses, specs and walls to change

<Lens rows are copied from the lens-placement skill's placement table, run with this record's path as the origin. Delete this note, and the marker lines with the sentence between them, once the table is filled.>

<!-- shared:lens-source-mark -->
Every lens line ends with its source as a literal mark: `(source: <kind>[, unvalidated], <pointer>)`. `<kind>` is `interview`, `record residue`, `escape`, `mandated control` or `imported`; `<pointer>` names the origin (person and date, record id, ledger entry path, requirement id, or where the line was imported from). An `imported` line carries `unvalidated` until a retro rules on it, and a `mandated control` line is never ablated.
<!-- /shared:lens-source-mark -->

| Path | Change, in one line | Owner | Kind |
|---|---|---|---|
| <the memory file nearest the covered paths> | <the one memory line saying why, ending `(source: record residue, NNNN)`> | | lens |
| <a path-scoped rule, a nested memory file, or a project skill directory> | <the line, ending `(source: record residue, NNNN)`> | | lens |
| <spec path; or "new build item", "new retire item"> | | | spec |
| <CI configuration, hook or required-reviewer rule> | <wiring for <check id>; listed only, never edited by an agent> | harness owner (T5) | wall |

## Contract terms

<Contract records only; delete this section from a decision record. Only terms the owners of every side have stated. The contract's invariants go in the Residue table.>

- Boundaries and owners: <boundary A: name, role>; <boundary B: name, role>; <one entry per side>
- Interfaces, as stable ids: <id: what crosses the boundary>
- Each side provides: <A provides ...>; <B provides ...>
- How the contract changes: <as the owners state it; the kit's default proposal is a superseding record every side's owner approves>
- Open terms: <not yet agreed; "none" before the record goes for approval>

## Superseded residue

<Only when `supersedes` is set; otherwise delete this section.>

| Old invariant | Stays, changes or retired | Follow-up |
|---|---|---|
| | | |

## Appended pointers

<Later learning, as dated pointers to evidence, escapes, questions or records. Never re-summarise.>
