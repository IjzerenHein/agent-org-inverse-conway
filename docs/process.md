# Process v2: humans plus coding agents

The core is what held in all four stress tests. Whatever needed exceptions became a dial, and a dial at its lowest value adds nothing.

## 1. Invariant core

**Topology**

- **T1. One rewrite per ownership boundary.** A model turns intent into a spec once, and each section's named owner approves it. Downstream reads the spec and its pinned sources by path. Later learning is appended as pointers, never re-summarised. One steward follows the item to its last done-state and breaks ties.
- **T2. Scripts orchestrate, artefacts coordinate.** Agents inside the harness never message each other. Each kind of fact has one writer and one system of record. Text from outside the trust boundary is data, never instruction. No plans or lenses live in private memory.
- **T3. One writer per work item.** Fan out only reading, research, review and scope-disjoint work. A check fails specs whose scopes overlap without a declared dependency.
- **T4. Cut along ownership boundaries and seams, never disciplines.** A spec's scope sits inside one boundary; cross-boundary work starts with a human-negotiated contract record. Stages within a seam hand over checked artefacts, never summaries. Only the evaluator is a separate role.
- **T5.** The harness's named owner changes it through the ordinary human change path, never through the pipeline it governs.
- **T6. Agents mirror the human approval graph.** One stream per boundary. The scarcest approver sets WIP. The retro shortens the longest measured wait first.

**Work-item kinds.** Each item declares a kind that selects its brief template, evidence and gate: `discover` (findings), `characterise` (checks pinning current behaviour), `probe` (flagged code with a hypothesis and expiry), `build`, `retire` (cutover, removal). All keep T3, the guard, the walls and machine evidence. Promoting a probe is a `build` item. Without a spec, the guard derives gates from the path classes touched.

**Artefact chain.** Vision per product area; rolling-wave roadmap whose near milestones may be knowledge; decision and contract records; specs; PRs with machine evidence; releases; ledgers (questions, facts, findings, experiments, obligations, escapes, pending acceptance), one file per entry under the owning path. Questions close by human decision, attested fact or evidence id, never by agent opinion.

**Brief contract.** The spec is the brief: kind, section owners, steward; quoted intent, end state, non-goals; interfaces as stable ids; `touches` (paths and objects) and script-computed `affects`; acceptance ids typed `checked`, `judged` or `observed`, each with oracle, value owner and evidence; named lenses; pinned sources; irreversibility class; escalation condition; `withdrawn`, `supersedes`. The builder's output has no success field. A fresh-context spec-critic batches questions per section owner, with a timeout when asynchronous.

**Verification**

- **V1.** Machine-produced evidence decides every done-state, never the author's claim. A `judged` id needs its owner's attestation, bound to a commit and voided when that owner's paths change. The profile lists done-states and their horizons; a script writes post-merge states.
- **V2.** Whoever writes the code does not define done. Acceptance comes from the declared oracle (P7), approved with the spec and outside the builder's scope. Checks for new behaviour wait in the pending-acceptance ledger until the slice lands. A legacy oracle means golden masters from a protected capture job, green on base and head; re-baselining needs a decision record. When code arrives before a spec, a harness-side agent that cannot see the diff writes the checks. Builder-regenerated goldens are never acceptance.
- **V3.** A base-computed guard keeps the diff inside `touches`. Walls (agent configuration, CI, capture jobs, whatever defines the shipped artefact) get the harness owner's line-level review; lockfiles get policy scans. Lenses (rules, project skills, facts) get the owning team's ordinary review.
- **V4.** Reviewers get a fresh context with spec, diff, evidence and kind-specific inputs, never the builder's narrative. Findings are failing commands, or rubric scores for `judged` ids.
- **V5.** Walls sit outside the agent. Reading: an allowlist of paths, connectors and environments; the rest arrives human-sanitised. Executing: unreviewed code gets fake externals or disposable state and no secret that can release or reach production; preview secrets only when no protected path changed. Review agents run from a base checkout.
- **V6.** Merge equals release for every surface the profile lists as unstaged; those gate synchronously. The profile, never an agent, classifies reversibility; any externally visible effect is irreversible.
- **V7.** No claim without machine-recheckable evidence (verbatim quote, query id, telemetry window, reproduction) or attestation by a named person inside the boundary, with role and validity dates. Unadjudicated observations stay `hypothesis` and never load as rules.

**Human gates.** The gate list is profile data; design and release are the minimum. Packets are machine-assembled per role: diffs, visual diffs, business-language discrepancy batches, release-level diffs. Decline is a valid outcome. Agent credentials cannot merge, release, publish or edit walls.

**Learning loop.** Each escape gets a ledger line: hop, tier, detection lag, promotion. The second occurrence becomes a check at P9 a and b, the first at c; then the prose is deleted. Product results go to experiment records; expiry forces keep or kill, and a kill creates a `retire` item. Ablate one component per model upgrade, never a registered control or a c surface.

## 2. Project profile

`profile.yml` has overlays per ownership path; a slice takes the strictest value over `touches` and `affects`. Re-profile on stage, team, regulator or model changes. Four tables are profile data:

- **Gates:** owner role, channel, packet form, response time, default if silent.
- **Release surfaces,** including those outside the repo (flags, backfills, store listing, registry channel, agent-facing docs): staged, rollback time, third-party latency, promoter, audience.
- **Done-states:** evidence source, horizon, retention.
- **Systems of record:** kind of fact, owning system, how it enters the repo.

| Dial | Values | What it sets |
|---|---|---|
| **P1 Coupling** | 0 unformed; a tight; b modular; c several deployables. Medium: files, shared state, runtime indirection | Width. Parallel only when `touches` plus `affects` are disjoint; `affects` is mandatory unless the medium is files. 0: width 1, no module map until seams are observed. Kernel paths get an owner and a queue. Oversized units: chunk readers append findings. |
| **P2 People, payback** | Per human: operates agents, reads diffs, evidence they can judge, paths they may approve. Payback metric | Gate owners and packet forms. Non-engineers merge their own reversible path class on green CI when the guard confines the diff. |
| **P3 Authority** | a one owner; b several in a team; c several teams or functions | b: section owners approve in the hosting UI. c: contract record first; decision rights per path class, with quorum and timeouts. |
| **P4 Independence** | a none; b four-eyes; c mandated function | Role matrix; the spec approver is author of record, named in a commit trailer. b, c: no default-if-silent, full diff read, two-person rule on walls and publish. |
| **P5 Trust, inflow** | a closed, plan-driven; b inner-source; c open to strangers and their agents | c: boundary contract, intake with a pre-screen and admission gate, scripted claim and takeover, two-stage CI. |
| **P6 Start, knowledge** | a greenfield; b brownfield with tests; c without. Intent known or discovered; behaviour understood or not; share of the system in the repo | Kinds enabled. a: records for irreversible stack choices, then a time-boxed walking skeleton. c: reproducible build, exports with a blocking drift check, characterisation per seam. |
| **P7 Oracle**, per acceptance id | human-stated; legacy system; external standard; reporter's reproduction; human judgement | Legacy: adjudication defaults to preserving behaviour; a checker scores characterisation. |
| **P8 Verification**, per module or lens | check exists (yes, partial, no); where it runs; horizon (PR, nightly, soak, post-release); cost | M0 closes "no" rows on paths agents will touch. Width and diff reading relax per path. |
| **P9 Blast radius**, per path and surface | a contained; b quick rollback; c irreversible or slow rollback | Diff depth, escape threshold, stance checkers, soak. c: fix-forward or data-repair runbook, tombstone before delete. |
| **P10 Legal, controls** | a none; b privacy, consumer or licence law; c regulated | b: attested facts, a never-violate test per rule, licence checks. c: requirement traceability, mandated controls, evidence retention. |
| **P11 Perimeter** | what agents may read; where inference runs; approved models; cloud agents or not | Read allowlist, masked or synthetic data, disposable or leased databases, pinned model upgraded as a gated slice. |
| **P12 External interfaces**, each, toolchains and devices included | a none; b sandboxed; c constrained; d certified or gatekept | b: contract or matrix tests. c: fake-by-default transport, human-captured fixtures, request budget, blocking health check. d: lead time in the roadmap. |
| **P13 Consumers, skew** | a atomic; b skewed own clients or cross-team; c public; d unknown | b: contract tests per released client, API diff, expand/contract. c: obligations ledger, downstream canary. d: consumer discovery from telemetry. |
| **P14 Design weight** | a none; b functional; c design-led | b: screenshots at target viewports. c: pinned design source with drift check, `judged` ids attested on device. |
| **P15 Lines, scope, change stream** | release lines; paths under the process; hotfix rate; confidential track | Harness authoritative on the default branch; guard keyed on the agent credential; a hotfix ends with a re-entry item; while two implementations coexist, a change carries a twin or a recorded freeze; confidential work uses a private mirror. |

## 3. Lens model

**Verdict: the three tiers hold, but only as a packaging and ownership rule.** Process ships in kit modules; discipline in shared plugins, user-level skills or platform libraries, always with a project binding; domain in the project repo under the owning path. Amendments:

- Process lenses are identical per profile value, not per project; an organisation overlay adds mandated sections and gates.
- Every lens line carries a `source`: interview, record residue, escape, mandated control (never ablated) or imported (`unvalidated` until a retro rules on it).
- The three candidate homes first considered (skills, agent definitions, design output) gain two: check failure messages and shared code.

**Placement.** Reach first: if builders outside your harness must heed it, only checks with teaching failure messages and tool-neutral repo docs count. Then split into clauses; first match wins:

1. Unadjudicated observation of current behaviour? Findings ledger; at most a pinned test marked pending.
2. Never-break and machine-checkable? A check, a hook as second layer, one memory line saying why.
3. Never-break, only partly checkable? Named human control: a required reviewer role on those paths, evidence in the packet.
4. Can the right thing be the default? Shared library, scaffold, or artefact generated from a pinned source, plus a bypass lint or drift check.
5. Fact not derivable from the repo at head? Executable artefact or attested line; a running system is exported and drift-checked; what only experiment or telemetry can settle becomes an experiment record or a dated finding; otherwise an open question.
6. Authority in a system outside the repo? A pointer, plus a check that the link exists.
7. Choice among options? Decision record; its residue re-enters at 2.
8. Commitment due later? Obligations entry plus a date- or version-keyed failing check.
9. Judgement only a named human can make? `judged` acceptance id; the lens holds that person's dated rulings.
10. Sequencing of the agent process itself? Workflow script or CLI.
11. A role's stance, tools or output contract? Subagent definition; never domain knowledge.
12. True for every task in a scope, in two lines? Memory file at that scope, with its lens index.
13. Craft about one module or object? Path-scoped rule, keyed by `paths:`, and by objects through the brief CLI.
14. Cross-module craft or procedure? Skill.
15. One slice? Spec. One run? Script-computed brief.

**Load guarantee.** Process: explicit invocation and scripts. Discipline: named in the spec, preloaded via `skills:`. Domain: the brief CLI intersects `touches` and `affects` with rule keys. Nothing relies on auto-trigger. Loading never proves heeding, so whatever must not be missed is a check.

## 4. Packaging and bootstrap

**Kit, versioned.** Core module: process skills (`/profile`, `/spec`, `/adr`, `/build`, `/retro`), templates, schemas, four definitions, workflow scripts, `brief`, `guard` and `packet` CLIs, CI templates, a fixture repo. Dials switch on optional modules: intake, boundary contract, legacy capture, experiments, controls, release lines. The per-repo scaffold is laid out by ownership path, nearest wins.

**Boundary contract (P5 b, c).** Tool-neutral, in the repo: `AGENTS.md`, `CONTRIBUTING.md`, `verify` and `brief <spec>` as dev dependencies, a PR template CI parses, failure messages carrying the lens text.

**UNCONFIRMED, with fallbacks**

- Plugins carrying definitions and workflow scripts. Fallback: `/profile` copies them into `.claude/`, version-stamped.
- `skills:` preload through Workflow `agentType`; path rules and hooks firing inside workflow, worktree or cloud agents. Fallback: the builder runs `brief --json` and reads the listed files; CI recomputes the brief.
- Extra frontmatter keys (`objects:`) in rule files. Fallback: a sidecar index.
- Whether a session on a PR head loads that PR's agent configuration. Assume yes: review from a sandboxed base checkout without credentials.
- Whether private advisory forks run CI. Fallback: a private mirror.

**Bootstrap**

0. Time-boxed spike: test each UNCONFIRMED item, branch-protection enforcement and a headless build.
1. `/profile` interview: profile, tables and payback metric, approved by whoever holds decision rights. Governance onboarding where P10 or P11 demand it.
2. Walls, built by the harness owner. Global M0 is small: reproducible build, guard, both walls, acceptance job, machine credential without merge rights. More verification is bought per seam or slice (P8).
3. Memory into the repo.
4. Pilot in P6 order. Brownfield: a no-spec fix, one spec, a record with research fan-out. Greenfield: stack records, walking skeleton, first spec. Cut what has not paid back.

**Flow-back.** Escapes carry a tier: domain stays, discipline becomes a skill PR with a neutral eval case, process a gated kit PR. Nothing leaves an ownership boundary until a second needs it.

## 5. What this process is not for

- Throwaway spikes nobody will run. Code that users run is a `probe`.
- Work with neither a machine comparison nor a named human judge for done.
- The live firefight of an incident: use a runbook, then the mandatory re-entry item.
- Being the mandated independent function: the process supplies evidence and four-eyes, not the assessor.

## 6. Change log

- **All four:** T1 per ownership boundary; V1 evidence per done-state, `judged` ids, horizons; V5 read perimeter; gates, surfaces, done-states and systems of record as profile tables, replacing scalars P4, P10; escape threshold by blast radius.
- **Legacy, OSS, mobile:** V2 by oracle; kinds replace the exploration exclusion; findings, experiment and obligations ledgers.
- **Regulated, legacy, mobile:** T5 reworded, walls split from lenses, small global M0.
- **Regulated, OSS:** overlays, one file per ledger entry, scope-overlap check, decision rights.
- **Regulated:** independence, perimeter, mandated controls, human-control clause.
- **OSS:** boundary contract, intake, reach question.
- **Legacy:** `affects`, object keys, drift check, coexistence, hotfix re-entry.
- **Mobile:** "unformed" coupling, consumers by skew, preview secrets, generated-artefact clause.
- **Every lens case marked wrong:** placement clauses 1, 3, 4, 6, 8 and 9 new; 5 and 10 reworded.

**Rejected**

- *Script auto-closes the rival PR (OSS).* Value-laden: the script drafts, a human sends.
- *Trust ladder (OSS).* Community governance, not process.
- *New lens tiers or axes for controls, exported lenses and maturity (regulated, OSS, legacy).* Restated as a `source` field, a release surface and a findings status.
- *Interactive tuning mode (mobile).* It is a `build` item run in session under a hook-enforced scope guard, closed by a `judged` attestation.

## 7. Open questions for the owner

1. **How much of the kit to build now?** The optional modules come from thought experiments, not projects. Recommendation: build the core module and the first project's dial values; the rest stays design until a second project asks.
2. **Payback and M0 time-box.** Recommendation: about ten hours, then three pilot slices judged against 30 owner-minutes per merged slice and zero escapes.

Questions that concern only the first project are kept in that project's repository, with its profile.