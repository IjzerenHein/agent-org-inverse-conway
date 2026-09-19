# Project-independent process: humans plus coding agents

## 0. Red-team verdicts

- **Accepted and generalised:** findings 1, 2, 4, 5 and 7, plus cutting receipts and starting with one checker.
- **Generalised from project facts:** finding 3 becomes V6 and finding 6 becomes V5. The "missing" items become profile values.
- **Amended:** finding 2's "red on main" would break a green main, so V2 uses an expected-fail manifest instead.
- **Rejected as universal:** cutting module tooling and metrics. Those are dial settings (P1, P2), right for this project only.
- **Optional, under P4:** a non-Claude reviewer. It lies outside the stated environment.

## 1. Invariant core

**Topology**

- **T1.** A model rewrites intent once, into a spec, with the intent owner present. Everything downstream reads the spec and its sources by path. *Why:* handoffs are lossy; a subagent gets files and a brief, never the conversation [D3][A1].
- **T2.** Deterministic scripts orchestrate, and agents never message each other. Artefacts coordinate, with one writer and one source of truth per kind of fact. *Why:* an LLM hub adds loss, drift and a context ceiling; peers amplify errors 17.2x, a validating centre 4.4x [G].
- **T3.** One writer per work item. Fan out only reading, research, review and file-disjoint slices; width is a dial (P1). *Why:* multi-agent loses 39-70% on sequential, coupled work [G][A6][C2].
- **T4.** Cut work along module boundaries and vertical slices, never phases or disciplines. The only role worth separating is the evaluator. *Why:* Conway and Parnas; role chains are a telephone game [A7].
- **T5.** The process does not bootstrap itself; a human builds the harness interactively. *Why:* harness changes are all protected, so the pipeline would queue behind its own gates.

**Artefact chain.** Goal, rough plan, detailed plan and tasks become:
- vision (one page);
- roadmap (milestones with exit criteria);
- decision records, plus a module map when P1 allows;
- specs (one slice each);
- then PR with machine evidence, release, and escape log.

All live in the repo and are approved by merge. A tracker holds status, never intent. Only humans answer the open-questions file; agents prepare options, never facts. A one-sentence diff skips the spec [D1]; a slice too big for one context becomes two.

**Brief contract.** The spec is the brief. Its sections:
- intent quoted with links;
- end state;
- non-goals;
- interfaces;
- `touches` (write scope);
- acceptance ids with human-supplied values, each mapped to a check or evidence file;
- lenses named, never restated;
- allowed sources;
- `gated` flag;
- escalation condition.

The builder's output schema has no success field; "blocked, here is why" is valid. A fresh-context spec-critic batches its questions while the owner is present, which moves the backbrief upstream. *Why:* specification issues cause 41.8% of multi-agent failures [M].

**Verification architecture**

- **V1.** CI is the only authority on done. An agent relaying CI returns only `{runId, conclusion}`; consumers fetch evidence by id.
- **V2.** Whoever writes the code does not define done.
  - Acceptance checks are written at design time from human values and approved with the spec.
  - They are kept outside the builder's `touches` and listed as expected-fail until the slice lands.
  - *Why:* a test written with its code asserts whatever the code does.
- **V3.** A guard computed from the base branch keeps changed paths inside `touches`. The verifier's own files (CI, agent config, process scripts, captured fixtures, lockfile) are protected and get line-level human review.
- **V4.** Reviewer independence is manufactured.
  - The reviewer works in a fresh context with spec, diff and evidence only, never the builder's narrative or craft text.
  - Findings are failing tests or commands on correctness and stated requirements; "none" is valid.
  - Add a stance checker only when an escape names it and it owns evidence [C2][D1][P].
- **V5.** Whatever runs agent-authored code before human review uses fake externals and no production secrets. The fake-by-default transport is the wall; hooks are a second layer.
- **V6.** Merge is not release only for surfaces actually staged (code, schema, access rules, config). Unstaged surfaces gate synchronously.
- **V7.** Outside-world facts carry `source:` plus a verbatim quote check or a named human attestation. A present source is not a true one.

**Human gates.** Human attention is the constraint, so a WIP limit caps open work.
- There are always two gate kinds: design approval (change is cheap) and release (change is irreversible).
- Reversible choices proceed and are logged; irreversible or value-laden ones wait.
- Humans receive decision packets: options, recommendation, evidence, default if silent.
- Packets are machine-assembled from CI evidence and link every changed file, with builder prose labelled unverified.
- Agent credentials cannot merge, release or edit agent configuration.

**Learning loop.**
- Each escape gets a ledger line: the hop it slipped through, its tier (section 3), and what it was promoted to.
- First occurrence: fix it. Second: a check or a recorded reason. When the check lands, delete the prose.
- A human runs the retro.
- Declare a payback criterion before building the harness.
- On each model upgrade, drop one component for a few slices and keep it out if the numbers hold [A5].

## 2. Project profile (the dial board)

| Dial | Values | What it sets |
|---|---|---|
| **P1 Coupling** | a tight; b modular, machine-checked contracts; c several deployables | Builder width: a 1; b one per file-disjoint module, capped by WIP; c one stream per deployable. Width above 1 needs a module map and boundary lint first. Kernel paths (shared types, schema, access rules) stay serial and gated. |
| **P2 Humans and hours** | a solo; b small team with owners; c several teams; plus hours per week | Intent owner per artefact; WIP about 2 per reviewer; hours set the harness time-box and payback criterion. a: design gate synchronous, in session. b, c: asynchronous review, CODEOWNERS routes gated paths and questions, tracker holds status, hours-awaiting-human measured. |
| **P3 Verification maturity** | a none; b partial; c strong | Size of verification-first milestone M0. a: characterisation tests, fakes, CI, end-to-end smoke before any feature. b: cover kernel and first slice's module. c: guard and acceptance job only. Until M0 lands: width 1, every diff human-read. |
| **P4 Blast radius** | a contained; b user-visible, quick rollback; c irreversible (data, money, safety, whole fleet) | Human diff depth: a sampled; b gated paths; c every gated line, second human if P2 allows. Release: a auto-merge to staging after N clean slices; b human promotes; c staged rollout, rollback runbook, stance checkers, optionally a different-model reviewer. |
| **P5 Legal exposure** | a none; b privacy or consumer law; c regulated | b: attested facts file, a never-violate test per rule, decision record per affected choice. c: requirement-to-acceptance traceability, compliance stance with evidence, named sign-off. Agents never assert law. |
| **P6 Starting point** | a greenfield; b brownfield with tests; c brownfield without | a: architecture records and module map before slice one; M0 is a walking skeleton with CI. b: module map from existing seams. c: characterisation tests first; module map only after the records that would move the seams. |
| **P7 External interfaces** | a none; b documented, sandboxed; c constrained (rate-limited, unofficial, paid, production-only) | b: contract tests against the sandbox. c: injected transport, fake by default; `captured` fixtures (human-only, checksummed) versus `synthetic`; request-budget test; live contact human-only; a red health check blocks builds on that module. |
| **P8 Design weight** | a none; b functional UI; c design-led | b: screenshots at target viewports, human eye at release. c: visual diff against design sources, design owner at the design gate. Thresholds are sourced or measured, never invented. |
| **P9 API consumers** | a internal; b versioned public; c many downstream | b: contract tests, API-diff check. c: breaking changes gated with a decision record, expand/contract migrations, deprecation lens. |
| **P10 Release decoupling** | a merge = release; b code staged only; c all surfaces staged | a: merge gate synchronous; decoupling is the first roadmap item. b: unstaged surfaces stay synchronous (V6). c: merge gate may relax per P4. |

## 3. Lens model

**Verdict: keep the three tiers, for a narrower job.** Tier predicts packaging and ownership, not mechanism. The red team's six cases show one piece of expertise splitting into clauses with different homes. So the model has two axes: tier (where it ships) and clause form (what holds it).

Two amendments:
- A discipline lens is incomplete without a project binding. The skill asks the expert's questions; the project's rules, records and facts hold the answers.
- Process lenses are mostly templates, schemas and scripts, not prose.

Teams add an organisation tier, packaged as an org plugin.

**Placement procedure.** Split the statement into clauses. Per clause, first match wins:

1. Must it never break, and is it machine-checkable?
   - Test, type, lint or CI check, which is the authority.
   - A hook as the in-session second layer.
   - One memory-file line saying why.
2. Is it a fact about the world outside the repo?
   - An executable artefact (fixture, contract test, sourced constant), or an attested line in a protected facts file.
   - If unknown, an open question.
3. A choice among options? Decision record; its invariant residue re-enters at 1.
4. Sequencing that must be identical every run (order, fan-out, retries, refusals)? Workflow script or CLI.
5. A role's stance, tool permissions or output contract? Subagent definition; never domain knowledge.
6. True for every task in this repo, in two lines? Always-on memory file, which also holds the lens index.
7. Craft about one module? Path-scoped rule.
8. Cross-module craft or a procedure? Skill.
9. True for this slice only? Spec.
10. True for this run only? Task brief: computed by script from the spec; pointers and round data only.

Example: "use auth X because Y, never expose Z" yields a record (3) and a check (1).

| | Process | Discipline | Domain |
|---|---|---|---|
| Packaged (owner) | kit plugin: user-invoked skills, templates, schemas, definitions, scripts (kit maintainer) | shared plugins or user-level skills, one per discipline (skill maintainer: you, vendor, community) | project repo: rules, project skills, records, facts, fixtures (project intent owner) |
| Validated | end-to-end run in a kit fixture repo; escapes tagged `process` | evals first, about 20 real cases, each rule born from an observed failure [A9] | truth lives in executable artefacts; every line carries an escape id or `source:` |
| Staleness | versioned; ablation on model upgrade | pinned to tool versions; a major dependency bump reopens it | health checks block builds; "update lens X" joins acceptance when `touches` overlaps it; prose deleted when its check lands |
| Load guarantee | explicit invocation (`disable-model-invocation: true`) and scripts | named in the spec, listed in the always-on index, preloaded via `skills:` | path rules on file contact; the brief CLI intersects `touches` with rule `paths:` and lists the files |

Loading never proves heeding, so whatever must not be missed is a check (clause 1). The rest gets deterministic loading, never auto-trigger: an always-on index scored 100% against 53% for auto-triggered skills [V].

## 4. Packaging and bootstrap

**Ships once (kit repo, versioned):**
- process skills `/profile`, `/spec`, `/adr`, `/build`, `/retro`;
- templates and schemas;
- four definitions (builder, checker, spec-critic, researcher);
- workflow scripts;
- `brief`, `guard` and `packet` CLIs;
- CI templates;
- a fixture repo for smoke runs.

**Scaffolded per repo:**
- memory file with vision import and lens index;
- `docs/` (vision, roadmap, questions, facts, records, specs, `profile.yml`, `escapes.jsonl`);
- path rules;
- project skills;
- fakes and fixtures;
- CI workflows;
- deny settings.

**Confirmed:** skills ship in plugins; definitions and rules live in the repo.

**UNCONFIRMED, with fallbacks:**
- Plugins carrying definitions and workflow scripts. Fallback: `/profile` copies them into `.claude/`, version-stamped.
- `skills:` preload through Workflow `agentType`, and path rules or hooks firing inside workflow, worktree or cloud agents. Fallback: the builder runs `brief --json` and reads the listed lens files; the CI guard recomputes the brief from base; the walls are the fake transport and CI.

**Bootstrap**

0. Spike, one hour: turn each UNCONFIRMED item into a recorded test, and check whether branch protection is actually enforced.
1. The `/profile` interview produces `profile.yml`, which sets the dials; the human approves it.
2. Walls, interactively (T5): M0 per P3, fakes per P7, staging per P10, a machine credential without merge rights. The human applies settings and CI changes personally; no agent message authorises them.
3. Memory into the repo: memory file, vision interview, questions, facts. Lenses come only from interviews, record residues and escapes; none speculative.
4. Pilot three slices of rising size: a no-spec fix, one spec, a decision record with research fan-out. Compare human-minutes per merged slice and escapes with the payback criterion; cut what has not paid back.

**Flow-back.** Every escape line carries a tier.
- Domain stays in the project.
- Discipline becomes a PR on the skill with a project-neutral eval case.
- Process becomes a kit PR phrased as a rule about a hop, not a product; kit CI greps for project nouns.
- Rule of two: nothing leaves a project until a second project needs it.
- Kit PRs are gated, because the kit is the longest-lived lossy hop.
- Repos pin a kit version; upgrading is a slice.


## 5. Profile of the first project

Kept in that project's own repository.

## 6. What this process is not for

- **Exploration and throwaway prototypes.** Intent is discovered by building; adopt the process only if the code survives.
- **No mechanical definition of done** (model quality, game feel, brand taste): V1 fails; use an eval-centred or human-judged core.
- **Incidents and hotfixes.** Gates are too slow; use a runbook, then log the escape.
- **Mandated independent assurance** (medical, avionics, payment certification): same-model review and a solo gate fail independence rules; the process only prepares evidence.
- **Verification possible only in production or on hardware.** The human loop dominates.
- **No identifiable intent owner per slice.** Cross-team negotiation must finish upstream of T1.
