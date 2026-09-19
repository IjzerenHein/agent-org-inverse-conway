# Homes: default file, reviewer, load, staleness

Lookup for filling the placement table. Use the project's `artefacts:` table where it gives a path; the paths below are this skill's defaults. `<scope>` is the directory the clause is true for, or the repository root when it is true everywhere.

Reviewer column: "owning team" means the team that owns the path, under ordinary review (a lens). "Harness owner" means a wall (agent configuration, CI, capture jobs, whatever defines the shipped artefact): propose it, never apply it.

Only the Home column and the load guarantees marked (section 3) are process v2 text. Default file, Reviewed by, How it goes stale and the other load notes are this skill's reading unless they cite a rule id, a dial or a section of process v2; a project may overrule them.

| Step | Home | Default file | Reviewed by | How it loads | How it goes stale |
|---|---|---|---|---|---|
| 1 | Findings entry, status `hypothesis` | `docs/ledgers/findings/YYYY-MM-DD-slug.md` | owning team | Never loads as a rule (V7). A spec may pin it as a source. | Stays `hypothesis` until a human adjudicates it. Then place the adjudicated statement again from step 1. |
| 1 | Pinned test marked pending, at most | with the module's tests | owning team | Runs with the suite without gating | Fails when behaviour changes; replaced on adjudication. |
| 2 | Check (test, type, lint or CI job) | where the project's checks live | harness owner for CI wiring; the check's code is a work item | It does not load, it runs, at its P8 horizon (PR, nightly, soak, post-release). Its failure message carries the lens text. | Fails when the rule is broken. Goes vacuous when the paths or names it keys on move, so re-check its P8 row when they do. Removed only when a decision record withdraws the rule. |
| 2 | Hook, second layer | agent configuration | harness owner | Fires in session, in your harness only. In a tool without hooks there is no second layer; the check still decides. | With its check. |
| 2 | One memory line saying why | `<scope>/AGENTS.md` | owning team | Always on at that scope | Deleted when its check is removed. |
| 3 | Named human control | the hosting platform's required-reviewer configuration for those paths; the role in the profile's gates table | harness owner; the profile's approver for the gates table | Does not depend on loading: the merge waits for that role, and the packet carries the evidence. | When the role holder, the paths, the team or the regulator changes: re-profile (section 2). A mandated control is never ablated (section 3). |
| 4 | Shared library, scaffold or generated artefact, plus bypass lint or drift check | code under the owning path; the lint or drift check with the project's checks | owning team for library code, as a work item; a generator, scaffold or build step that defines the shipped artefact is a wall: harness owner (V3); the lint or drift check as in step 2 | Needs no loading: the builder gets the right thing by using the default. | The bypass lint fails on bypass. The drift check fails when the pinned source and the generated artefact diverge. |
| 5 | Executable artefact (fixture, contract test, sourced constant) | under the owning path | owning team; a capture job is a wall | Runs as a check | Silently, when the outside world changes: give it a capture date and, where P12 is c, a blocking health check. Recapture is done by a human or a protected capture job, never by the builder (V2). |
| 5 | Attested line | `docs/ledgers/facts/YYYY-MM-DD-slug.md`: the claim, the verbatim quote or the attestation, the person, role and validity dates (V7) | the attesting person; owning team | Pinned as a source in the spec | At the end of its validity dates: re-attest or close. |
| 5 | Export of a running system, plus drift check | export under the owning path; drift check with the project's checks | harness owner for the capture job | The export is read like code; the drift check runs | The drift check fails. |
| 5 | Experiment record or dated finding | `docs/ledgers/experiments/YYYY-MM-DD-slug.md` or `docs/ledgers/findings/YYYY-MM-DD-slug.md` | owning team | Pinned as a source in the spec | An experiment's expiry forces keep or kill, and a kill creates a `retire` item (learning loop). A finding carries its date. |
| 5 | Open question | `docs/ledgers/questions/YYYY-MM-DD-slug.md` | the human who can answer | Does not load | Closes by human decision, attested fact or evidence id, never by agent opinion (section 1, artefact chain). |
| 6 | Pointer, plus a check that the link exists | a line in the lens at that scope naming the system and the link; the owning system is listed in the profile's systems-of-record table | owning team; the check as in step 2 | As the lens that holds it | The link check fails. |
| 7 | Decision record | `docs/adr/NNNN-slug.md` | whoever holds decision rights for those paths (P3) | Pinned as a source by the specs that depend on it. Its residue is placed separately, from step 2. | Superseded by a later record; then place the residue again. |
| 8 | Obligations entry, plus a date- or version-keyed failing check | `docs/ledgers/obligations/YYYY-MM-DD-slug.md`; the check with the project's checks | owning team; the check as in step 2 | The check starts failing at the date or version. | Closed when the commitment is met; the check goes with it. |
| 9 | `judged` acceptance id; a lens holding that person's dated rulings | the id in the spec; the rulings in the path-scoped rule or skill for that scope, or under outside reach in the tool-neutral contributing doc | the named person | The spec names the id. The rulings lens loads as in step 13 or 14, or as a repository doc. | The attestation is bound to a commit and voided when that owner's paths change (V1). Rulings are dated; a newer ruling replaces an older one. |
| 10 | Workflow script or CLI | the harness | harness owner | Explicit invocation and scripts (section 3) | Versioned with the harness. One component is ablated per model upgrade, never a registered control or a P9 c surface (learning loop). |
| 11 | Subagent definition | agent configuration, for example `.claude/agents/<name>.md` | harness owner | Loaded when a script or orchestrator starts that role | As step 10. It holds no domain knowledge, so project changes do not stale it. |
| 12 | Memory, two lines at most | `<scope>/AGENTS.md`, with a `CLAUDE.md` beside it containing `@AGENTS.md`; it holds the lens index for that scope, one line per rule or skill file: the path and what it covers | owning team of the scope | Always on for every task in that scope | When its source is withdrawn or a check now covers it, delete the line. An `imported` line stays `unvalidated` until a retro rules on it (section 3). |
| 13 | Path-scoped rule | `.claude/rules/<module>.md` with `paths:`; for tools without path rules, `<module>/AGENTS.md`; object keys through the brief CLI | owning team | The brief CLI intersects `touches` and `affects` with rule keys (section 3). Path rules also load on file contact where the tool supports them. | When the paths or objects it is keyed to move, are renamed or are retired. Prose is deleted once a check covers it (learning loop). |
| 14 | Skill | project: `.claude/skills/<name>/` or `.agents/skills/<name>/`; discipline tier: a shared plugin, user-level skill or platform library, with a project binding | owning team, or that package's maintainer | Named in the spec and preloaded via `skills:` where the tool supports it (section 3). Never auto-trigger. | When the tools or technique it describes change. `imported` lines stay `unvalidated` until a retro rules on them (section 3). |
| 15 | Spec | `docs/specs/NNN-slug.md` | its section owners | It is the brief | Ends with the slice: shipped specs move to `docs/specs/shipped/`; `withdrawn` and `supersedes` mark the rest. |
| 15 | Script-computed brief | not stored | nobody: a script computes it | Computed per run from the spec | Cannot go stale. Never hand-edit it; fix the spec or the lens keys. |

## When the mechanism is missing or unconfirmed

Process v2 lists these as unconfirmed, with these fallbacks:

- `skills:` preload, and path rules and hooks firing inside workflow, worktree or cloud agents. Fallback: the builder runs `brief --json` and reads the listed files; CI recomputes the brief.
- Extra frontmatter keys such as `objects:` in rule files. Fallback: a sidecar index.

This skill's reading, where process v2 is silent:

- No brief CLI in the project, or a tool with no preload and no path rules: the spec lists the lens files by path under its named lenses and the builder reads them. Write the guarantee in the placement table as "named in the spec".
- A project that uses both a path-scoped rule and a nested `AGENTS.md` for one module: keep the text in one and make the other a one-line pointer, so the text has one writer.

Whatever the mechanism, loading never proves heeding. A clause that must not be missed has a check or a named human control, and the lens is only the explanation.
