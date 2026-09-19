# Stress tests of process v1

Four agents each applied version 1 to a project unlike the one it came from and tried to break it. Version 2 is the repair. These are thought experiments, not field results.

## Regulated payments platform, 30 engineers in 6 teams

### Verdict

The process does not survive this archetype unchanged, and by its own section 6 it partly admits that. Four of the six exclusions hold here at once: no single intent owner per slice, mandated independence, frequent incidents and hotfixes, and verification that is partly possible only in production or an external certification environment. As written, the claim 'applicable to any software project' is false for a regulated multi-team platform. The exclusions are drawn by industry where they should be dials.

**Walk, with the step where each failure appeared**
1. **Intent.** Intent was rewritten four times by humans before T1 could apply, and four authorities owned parts of it (break 1).
2. **Profile.** Five dials needed per-service values, and nobody could be 'the human' who approves the profile (breaks 11, 12).
3. **Design.** The shared event schema was a kernel path that six teams needed, with no serialiser and no artefact for the cross-team contract (breaks 1, 8).
4. **Spec and acceptance.** The spec-critic's questions went to four different people asynchronously. The values were held by Compliance, in licensed documents agents cannot read. The expected-fail manifest collided and polluted release evidence (breaks 7, 17).
5. **Build.** The data wall was in the wrong place: the agent could read captured fixtures, tickets and logs, even though its code ran against fakes (break 3).
6. **Review.** The launcher was also the approver. A full-diff four-eyes read was mandatory. Silence could not count as consent. The security review had to exist before any escape (breaks 2, 13, 14).
7. **Done.** CI green was one link in a chain that ended with a clean reconciliation at T+1 and an external certification, and the evidence had to outlive CI retention (breaks 4, 5, 6).
8. **Release.** Flags and backfills were release surfaces with no merge, and reversibility could not be left to agent judgement (break 15).
9. **Learning.** The escape data sat in postmortems that agents may not read, and the loop's thresholds were too lax for reportable incidents (break 13).

**What survives.** The topology (artefact coordination, deterministic orchestration, slices along ownership boundaries, a separated evaluator), the brief contract, the `touches` guard, checks over prose, and evidence-based packets all survive. They are arguably more valuable here than in the source project.

**What must be added before the core is invariant**
- An authority model: multi-owner intent, a contract-first split at ownership boundaries, and a separation-of-duties role matrix with agent runs attributed to a human.
- A read-perimeter rule in place of V5's execution-only wall.
- Gates, done-states and systems of record as profile data, not fixed in the core.
- A profile and scaffold that are hierarchical by ownership path, not one per repo.

**Conway's law.** In this archetype the bottleneck is not any agent-to-agent hop. It is the human approval graph, and especially the shared approvers. The process makes the cheap part cheaper and then queues at security, the kernel owner and the change board. The agent organisation should mirror ownership: one stream per owning team, contracts first across boundaries, and a WIP limit set by the scarcest approver.

**Lens hypothesis.** Three tiers hold as a packaging model once two things are added.
- A control tier: an organisation overlay owned by second-line functions, living at the monorepo root rather than in a plugin, whose rules come from a standard rather than from escapes.
- Two missing homes: a named human control for never-break rules that are not fully checkable, and shared platform code for anything that can be made the default.

### What fits unchanged

PROFILE AS INSTANTIATED.
- P1: nominally c (40 deployables), but mixed in practice. The ledger core, shared proto/event schemas, the money library and the migrations directory are tight (a); most services are b.
- P2: c. 'Hours per week' means nothing here; the scarce resource is shared approvers.
- P3: c.
- P4: c for ledger, payment execution and bank connectivity; a or b for internal tooling.
- P5: c.
- P6: b.
- P7: b and c at once, per interface: scheme sandboxes, bank file links, and certified provider connections that need re-certification.
- P8: b for the merchant dashboard, a elsewhere.
- P9: c for the public merchant API. It also needs an unlisted value, 'internal but cross-team', for the 40 services.
- P10: c for code. Feature flags, runtime config, provider-side config and data backfills are release surfaces outside the repo.
- Five of the ten dials cannot take a single value for this repo.

WORK ITEM WALKED. Verification of Payee before SEPA credit transfers, against a regulatory deadline.
- It touches the public payments API, a new payee-verification service talking to an external certified provider, the risk service, the merchant dashboard, audit logging of payee names (personal data), and the shared event schema (kernel).
- Owners: four engineering teams plus Compliance, Security, the data-protection officer and SRE.

WHAT WORKS UNCHANGED.
- T2: artefacts coordinate, deterministic orchestration, agents never message each other. This fits better here than in the source project, because it yields the audit trail the regulator wants.
- T4: cutting along module boundaries and vertical slices, with the evaluator as the only separated role. This matches service ownership.
- The brief contract's fields (`touches`, non-goals, interfaces, acceptance ids mapped to checks, named lenses, allowed sources, escalation condition) and the builder schema without a success field.
- V3's guard keeping a PR inside `touches`. It composes naturally with CODEOWNERS.
- V6, merge is not release, and P9c expand/contract migrations.
- V7's demand for sourced or attested outside-world facts, and 'agents never assert law'.
- Agent credentials that cannot merge, release or edit agent configuration.
- Machine-assembled decision packets with builder prose labelled unverified.
- The spec-critic moving questions upstream.
- Deterministic lens loading via the brief CLI rather than auto-trigger.
- Placement clause 1 (a check beats prose). It is even more correct here, because auditors value mechanical controls.
- P3c's small test-side M0, P5c's requirement-to-acceptance traceability, and kit version pinning with upgrade as a slice.

### Breaks

**FATAL: T1 'A model rewrites intent once, into a spec, with the intent owner present', together with the section 6 exclusion 'No identifiable intent owner per slice. Cross-team negotiation must finish upstream of T1'**

- Why: In the walk, intent passes from regulation to legal memo to compliance requirement to PRD to a cross-team RFC before it reaches a repo. Compliance, Product, the Bank Connectivity tech lead and Risk each own part of it, and none can be 'present' for the whole. The section 6 exclusion pushes this archetype's hardest and most lossy work, agreeing the contract between teams, outside the process. The artefact chain has nothing between roadmap and single-owner spec to hold that contract. This is the longest communication path in the system, and the process is silent on it.
- Fix: Add one artefact level between roadmap and spec: a cross-owner design record. Its only mandatory content is the inter-team contract: API or event schema, contract tests, sequencing, and a named approver per owner. Add a rule that a spec's `touches` must sit inside one ownership boundary; otherwise the work is split contract-first. Reword T1 to 'once per ownership boundary, with that boundary's intent owner', and have the spec front matter list approver roles and their decision rights. Agents prepare options for the record; humans negotiate it.

**FATAL: Human gates and V4 carry no separation-of-duties model. The symptoms are 'second human if P2 allows', human diff depth limited to 'gated lines', 'merge gate may relax', and packets with a 'default if silent'**

- Why: The regulator mandates author != approver != deployer for every production change. The process never says who the author of record of an agent-written change is. If the engineer who approved the spec and launched the builder also approves the PR, that is self-approval through a tool. A same-model reviewer counts for nothing as independence. Sampled or gated-path-only reading, and silence treated as consent, are audit findings. Section 6 concedes that 'the process only prepares evidence', which excludes by industry what should be a dial.
- Fix: Add a dial 'Independence' (a none; b four-eyes; c mandated independent function) that carries a role matrix. The spec approver and agent launcher are the author of record. The merge approver, acceptance-check author and release approver must be different principals wherever the matrix says so. Enforce this with branch protection and commit trailers that bind each agent run to a human principal. At b and c there is no default-if-silent on any controlled gate, a human reads the full diff, and the packet aids review rather than replacing it.

**FATAL: V5 'Whatever runs agent-authored code before human review uses fake externals and no production secrets' and P7c '`captured` fixtures (human-only, checksummed)'**

- Why: V5 draws the wall around code execution and outbound transport. The archetype's constraint is on what the agent can read and where inference runs. Leak paths the wall misses: captured provider fixtures with real names and IBANs committed to a repo the agent reads; staging databases holding masked but real data; log and observability connectors; tracker tickets and postmortems with pasted customer data; and the escape ledger itself. Source code going to an external model provider is a third-party risk matter, and scheduled cloud agents may be forbidden outright. Agent-authored migrations and backfills get verified only on synthetic data whose shape differs from production.
- Fix: Generalise V5 into a read-perimeter rule: the agent's readable world is an allowlist enforced outside the agent (network, identity, connector set, repo paths), and anything outside it reaches agents only through a human-sanitised artefact. Add a dial for data classification and inference location. At the top setting, replace 'captured' fixtures with sanitised captures carrying attested scrubbing, or with schema-generated synthetic data. Add an attested 'production data shape' profile (null rates, legacy formats, volumes) as a facts artefact for migration work.

**MAJOR: V1 'CI is the only authority on done'**

- Why: Done here is a chain: CI green, independent approval, change ticket approved by the change board, canary and deploy verification, provider certification in an external test environment, and a clean first settlement and reconciliation cycle at T+1. Several of these are evidenced outside CI, and some only in production, which agents cannot see. CI run ids are not audit evidence either: default log retention is months and audit retention is years. With thousands of tests and a nonzero flake rate, 'conclusion' is not binary.
- Fix: Reword V1: 'every done-state is decided by a machine-produced evidence record, never by an agent's or author's claim'. The profile lists the done-states (merged, released, verified in production) and the evidence source for each. Evidence is copied to an immutable store with the retention P5 demands. A human owns a flaky-test quarantine policy.

**MAJOR: Artefact chain: 'All live in the repo and are approved by merge. A tracker holds status, never intent.'**

- Why: Compliance, Legal, Finance, the data-protection officer and change-board members hold real approval authority and do not approve by git merge. The change-management system is the auditor's system of record for approval, risk classification and rollback plan. Following the rule as written creates two sources of truth for approvals, which violates T2.
- Fix: Add a 'system of record' binding to the profile that names the owning system for each kind of fact. The repo owns content. The ticket owns approvals and references content by commit hash. Non-git approvals enter the repo only as attestation lines in V7 form, written by a script from the ticket API.

**MAJOR: Human gates: 'There are always two gate kinds' and 'WIP about 2 per reviewer'**

- Why: The gate sequence is mandated from outside: architecture review, security review, four-eyes code review, QA sign-off, change board, deploy approval and post-implementation review. The scarce humans are shared approvers, not per-team reviewers: security, DBA, compliance, and a change board with a weekly cadence and freeze windows. A WIP limit per reviewer does not protect them, so agent throughput piles up in their queues. The real path runs builder, team reviewer, kernel owner in another team, security, change board, release manager.
- Fix: Make gates profile data: an ordered list of {gate, owner role, evidence required, sync or async, cadence or SLA}. Set the WIP limit from the scarcest approver class on the slice's path. Assemble one packet per gate. Keep 'design' and 'release' as the minimum two kinds.

**MAJOR: V2: acceptance checks 'listed as expected-fail until the slice lands'**

- Why: A single manifest is a shared file edited by every spec in a 30-engineer monorepo. It collides, and it is also a protected file, so every edit needs line-level review. Main ships on release trains while slices are open, so release evidence contains known-failing tests, which change management will not accept unexplained. Cross-service acceptance lives in end-to-end suites owned by another team, with hours of latency. The values themselves (name-match thresholds, timeouts) are held by Compliance or scheme specialists, not by the spec's intent owner.
- Fix: Put a per-spec manifest in the spec's own directory and have CI aggregate them. The release-evidence job reports pending acceptance separately and requires the feature to sit behind an off flag. Acceptance ids carry `value-owner: role`, so each value is attested by whoever actually holds it.

**MAJOR: T2 'Deterministic scripts orchestrate', T3 'One writer per work item', P1 'Kernel paths stay serial and gated'**

- Why: These rules hold within one workflow run. Here 30 humans each launch their own runs. Nothing detects that two open specs from different teams claim overlapping `touches` on the shared proto, the money library or the migrations directory. The guard only checks that a PR stays inside its own `touches`. A 'serial' kernel has no serialiser and no owner when six teams need to change it.
- Fix: Add a CI check on spec PRs that fails when `touches` overlaps another open spec without a declared dependency; this is a lock registry computed from open PRs. Give kernel paths a named owning team, a queue and an SLA. Let the merge queue enforce order.

**MAJOR: T5 and bootstrap step 2: 'a human builds the harness interactively', 'The human applies settings and CI changes personally'**

- Why: No individual here may change CI, branch protection or credentials alone. A platform team owns CI, and changes to it fall under change management and separation of duties themselves. Before any wall goes up, the organisation needs a vendor risk assessment, security approval of the agent tooling, a sandbox inside the company network, and an identity model for agent runs. P3c describes M0 as 'guard and acceptance job only', which understates months of work.
- Fix: Reword T5: 'the harness is built and changed by its named owner through the organisation's ordinary human change path, never by the pipeline it governs'. Add an M0 component 'governance onboarding', sized by the legal-exposure and data dials rather than by test maturity.

**MAJOR: V3: 'agent config ... protected and get line-level human review'. It treats walls and lenses as one protected set**

- Why: With teams, protected paths route to a central owner such as DevEx plus Security. If path rules, nested memory files and project skills count as agent config, every domain-lens update by the Risk team queues behind another team. Teams will route around that by keeping knowledge in wikis, and the lens system starves.
- Fix: Split the protected set in two. Walls (settings, permissions, hooks, subagent definitions, workflow scripts, CI) stay centrally owned. Lenses (path rules, nested memory files, project skills, facts) belong to that path's owning team under ordinary review.

**MAJOR: Scaffold singletons: one memory file with lens index, one `profile.yml`, one questions file, one facts file, one `escapes.jsonl`, one one-page vision**

- Why: This assumes repo = project = team = owner. In a 40-service monorepo almost nothing is 'true for every task in this repo'. The lens index outgrows the always-on budget; the 100% versus 53% result was measured on a small index. Single files become collision points with no single owner. Nobody can write the one-page vision, because nobody holds it.
- Fix: Make every per-repo artefact hierarchical by ownership path: a root plus team or service overlays with nearest-wins inheritance. Use one file per question and per fact group, and one ledger per owner. The brief CLI resolves the chain for a given `touches`. Write a vision per product area, and let the root hold only cross-cutting invariants.

**MAJOR: Dial board: one value per dial per project; P9 'a internal' treated as the safe setting**

- Why: P1, P4, P7, P8 and P9 differ per service. Setting the maximum everywhere makes internal tools pay ledger-grade cost, and a single compromise value is wrong everywhere. Internal APIs here are the contracts between teams, so 'internal, no API-diff check' is the wrong default.
- Fix: Allow profile overlays per path, with the effective value for a slice being the strictest over its `touches`. Add a P9 value 'internal, cross-team' that requires consumer-driven contract tests.

**MAJOR: Learning loop 'First occurrence: fix it. Second: a check'; V4 'Add a stance checker only when an escape names it'; bootstrap 'Lenses come only from interviews, record residues and escapes; none speculative'; 'On each model upgrade, drop one component'**

- Why: Controls in regulated payments are mandated in advance by a control framework, not earned by escapes. Waiting for a second money-losing or reportable incident is not acceptable. A component registered as a control cannot be dropped as an experiment, and a model upgrade is itself a toolchain change that needs assessment. 'A human runs the retro' does not say which human, and the existing postmortem process already covers this ground and contains production data.
- Fix: Make the thresholds a function of blast radius and legal exposure; at the top settings the first occurrence yields a check. Allow a third lens source: 'mandated control, traced to a requirement id'. Mark registered controls as non-ablatable without risk sign-off, pin the model version, and treat its upgrade as a gated slice. Bind the ledger to the existing postmortem process through a human-sanitised summary line.

**MAJOR: Section 3 placement procedure, clauses 1 to 10: three homes are missing**

- Why: First, clause 1 needs 'never break AND machine-checkable'. The archetype's largest category is never-break but only partly checkable (no card numbers in logs, threat-model adequacy, regulatory interpretation), and it falls through to prose. Second, there is no clause for encoding expertise in shared code, yet in a 40-service organisation the platform's service template, middleware and client libraries carry most discipline expertise. Third, there is no home in systems outside the repo, such as the deploy policy engine or the change tool. In addition, the procedure has no team or service scope between 'every task in this repo' and 'one module'.
- Fix: Add clause 1b: 'never-break, not fully checkable: a named human control, meaning a required reviewer role on those paths and a checklist item with evidence in the packet, with a stance checker as an aid'. Add a clause before 7: 'can the right thing be made the default in shared code or a scaffold? Then a library or template owned by the platform team, plus a lint against bypassing it'. Add a team or service scope, held in a nested memory file.

**MAJOR: Human gates 'Reversible choices proceed and are logged'; P10's surface list 'code, schema, access rules, config'; release modelled as one promotion**

- Why: Reversibility is judged by the agent at run time. In payments, things that look reversible are not: a posted ledger entry, an emitted event, a webhook delivered to a merchant, a message sent to a bank. Feature flags, runtime config, provider-side config and data backfills are release surfaces outside the repo, so a flag flip is a release with no merge. Release is per service, with canary stages, regions, freeze windows and on-call readiness.
- Fix: Classify reversibility in the profile by path and surface, never by agent judgement; any externally visible effect is irreversible by definition. Have P10 enumerate the non-repo surfaces and require each to have either a repo-backed definition or a synchronous gate. Release evidence includes acknowledgement by the on-call owner and a rollback runbook.

**MAJOR: Implicit assumption that every change flows through the process; 'A one-sentence diff skips the spec'**

- Why: With 30 engineers, adoption is partial and gradual. Most PRs stay human-authored, and on-call hotfixes land outside the process. The day the `touches` guard is switched on in shared CI, it fails other teams' PRs, and a spec-less diff has no `touches` to check against.
- Fix: Add an 'adoption scope' dial: the paths, teams and PR classes under the process. Key the guard on the agent credential or a label. Human-only PRs pass through the existing controls. Spec-less commits on governed paths, emergency changes included, produce a ledger line afterwards.

**MINOR: V7 'source: plus a verbatim quote check or a named human attestation', kept in a single protected facts file**

- Why: Scheme rulebooks and bank specifications are licensed, confidential documents. They may not be committed or sent to a model provider, so the quote check is unavailable. Facts also have effective dates, and two rulebook versions can be live during a migration. The attester differs by domain, and nothing records who may attest what.
- Fix: Give facts three extra fields: `attested-by: role`, `effective-from` and `effective-until`, and a `source-ref` pointing at a document id in a controlled system. Partition facts by domain owner.

**MINOR: Working hypothesis 'PROCESS lenses are identical for every project'; kit CI 'greps for project nouns'; 'Rule of two: nothing leaves a project'**

- Why: Writing a brief or a decision record here has organisation-mandated content (risk classification, rollback plan, data-protection impact, control mapping, ticket id) and mandated sequencing. That content is owned by second-line functions, not by the kit maintainer. In a monorepo the organisation tier lives at the repo root, not in a plugin. 'Project' is also undefined when 40 services share one repo.
- Fix: Split the process tier into kit-invariant material (schemas, scripts, the brief contract's minimum fields) and an organisation-mandated extension (extra required sections and gates), with composable templates. Define 'project' for flow-back as an ownership boundary, not a repo.

**MINOR: V3: the lockfile listed as 'protected' and given 'line-level human review'**

- Why: Dependency bumps arrive daily across 40 services. Reading lockfile diffs line by line is theatre, and the real supply-chain risk goes unmanaged.
- Fix: Replace it with policy checks (approved registry, vulnerability and provenance scanning) and human review of the manifest change only.

### Missing profile parameters

- Independence and separation of duties: which roles may not coincide (spec approver, agent launcher, acceptance-check author, merge approver, release approver, harness maintainer); how an agent-written change is attributed to a human principal; whether an independent function is mandated.
- Data classification and agent read perimeter: which repo paths, connectors, logs, environments and tickets agents may read; where inference may run (vendor, region, retention terms); whether cloud agents are allowed at all.
- Authority topology: how many intent authorities a slice has, their decision rights, quorum, how disagreement is resolved, and the escalation path.
- External system of record and change-management binding: which system owns approvals, the risk classification scheme, change-board cadence, freeze windows, the emergency change path, and evidence retention period and immutability.
- Profile granularity: dial overlays per ownership path instead of one value per repo, with a composition rule (strictest over `touches`).
- Adoption scope and coexistence: which teams, paths and PR classes are under the process, and how human-only and emergency changes are reconciled afterwards.
- Verification locality and latency: whether the relevant checks can run inside the agent sandbox, CI duration and flake rate, and which acceptance is only evidenced after deploy (canary, T+1 reconciliation, external certification).
- Toolchain governance: approved models, version pinning, vendor risk status, whether harness components are registered controls, and retention of agent session transcripts for audit.
- Shared-approver capacity: queues and SLAs for security, DBA, compliance and the change board, used to set the WIP limit.
- Concurrency of orchestrators: how many humans launch runs at once, which calls for a lock registry over `touches` across open specs.
- Release surfaces outside the repo: feature flags, runtime config, provider-side config and data backfills.
- Operational ownership: the on-call owner per service, SLOs, rollout stages and regions, and who is paged for an agent-authored change.
- External party lead time, set per interface rather than per project: a P7 value for certified interfaces where a change triggers re-certification taking weeks.

### Lens placement cases

| Expertise | Rule gave | Correct | Comment |
|---|---|---|---|
| Card numbers and other cardholder data must never appear in logs or be stored unencrypted; use the tokenisation vault client (PCI DSS). | The rule splits the statement into clauses. 'Never appear in logs' goes to clause 1: a log-scrubbing test and secret scanner as the authority, a hook as second layer, and one memory line. The PCI requirement text goes to clause 2, an attested line in the facts file. 'Use the vault client' goes to clause 3, a decision record whose residue becomes a lint. | no | The rule's answer is right in kind but has a hole. Detecting card data in logs is heuristic, so the clause is never-break but only partly machine-checkable, and clause 1 requires both. The remainder falls through to a skill, which is prose, which is the weakest home for the most serious rule. The real home is a named human control: a required security reviewer on those paths, with evidence in the packet. The procedure has no such clause. The tier table has no owner for it either; this lens belongs to Security and Compliance, not the project intent owner or a skill maintainer. 'Each rule born from an observed failure' is also wrong here: the rule is born from the standard, before any failure. |
| Money is an integer of minor units plus a currency; rounding is half-even per the ledger decision; never floating point. | Clause 1: a Money type plus a lint banning float arithmetic on amounts. Clause 3: a decision record for the rounding policy. Clause 2: a sourced constant table for currency exponents. | yes | This is the clearest success. The discipline tier with a project binding works exactly as the amended model says. One caveat: per-merchant fee rounding agreed in contracts is runtime configuration in production data, which agents may not see, so that fact can only reach them as an attested, sanitised summary. |
| Every state-changing endpoint is idempotent via an idempotency key; ledger postings are exactly-once; consumers tolerate redelivery. | First match is clause 1: tests per endpoint. The craft remainder goes to clause 8, a cross-module skill. Clause 6 is rejected because it is not true for every task in a 40-service repo. | no | The answer is ambiguous. A test covers endpoints that exist, but the expertise is an obligation on all future code. The right home is shared code: platform middleware and a service template that make idempotency the default, plus an architecture lint that every mutating handler is wrapped. 'Make it the default in a library or scaffold' is not among the ten clauses, yet in a multi-team organisation it is the main carrier of discipline expertise. It is also owned by a platform team, an owner the tier table does not list. |
| Scheme and bank rules: instant payment time limits, payee-verification response semantics, chargeback reason codes and deadlines. | Clause 2: a fact about the outside world, held as a sourced constant and contract test, or as an attested line in the protected facts file. If unknown, it becomes an open question. | yes | The kind of home is right, but the packaging breaks. The sources are licensed, confidential documents that cannot be committed or sent to a model, so V7's quote check is unavailable and only attestation remains. Facts carry effective dates, and two rulebook versions are live during a migration. The attester differs per domain, and a single protected facts file shared by six teams is a bottleneck. The model needs partitioned facts with an attester role and validity dates. |
| Change management: every production change has a ticket with risk class and rollback plan, an approver who is not the author, freeze windows at peak periods, and a defined emergency path. | The clauses split between clause 1 (a CI check that a ticket is linked and the approver differs), clause 4 (sequencing in a workflow script) and clause 5 (role permissions in a subagent definition). Tier: process, so it ships in the kit as 'identical for every project'. | no | Both the mechanism and the tier are wrong. The authority is an external system, the change tool and the deploy pipeline's policy engine. Second-line functions and SRE own it. It already exists and was not created by the kit. The procedure has no clause for a home outside the repo. This is also process expertise that is not identical across projects: it is organisation-specific and regulator-mandated, and the kit's own process must be subordinate to it. The process tier needs a kit-invariant part and an organisation-mandated extension. |

### Assumptions smuggled in from the first project

- The core assumes repo = project = team = one intent owner. It shows in phrases such as 'with the intent owner present', 'while the owner is present', 'in the room' and 'the human approves it'.
- One of everything: one vision page, one `profile.yml`, one questions file, one facts file, one `escapes.jsonl`, one expected-fail manifest, one always-on memory file. These are harmless for a solo repo and become collision and ownership problems for six teams.
- 'A human builds the harness' and 'applies settings and CI changes personally' assume a solo admin with full rights over CI, branch protection and credentials.
- 'A tracker holds status, never intent' treats the tracker as a solo developer's to-do list. In an audited organisation the ticket system is the legal record of approval.
- 'All live in the repo and are approved by merge' assumes every stakeholder with authority uses git.
- Captured fixtures treated as ground truth comes from a reverse-engineered API. In payments a capture is toxic data.
- V5 frames the wall as a fake transport. That threat model is 'do not hit the rate-limited API', not 'the agent must not read regulated data or send code to an unapproved processor'.
- Builder width and 'one writer' assume a single human orchestrator with one queue, not 30 engineers launching independent runs against shared paths.
- Release is pictured as one person promoting one staging channel, watched by one human eye. There are no per-service pipelines, canaries, regions, freeze windows or on-call readiness.
- P2 measures humans in 'hours per week', and payback in human-minutes per merged slice. That is side-project accounting, not review-queue time or lead time.
- 'Default if silent' on decision packets and sampled diff reading are acceptable only where nobody audits the gate.
- 'First occurrence: fix it. Second: a check', 'none speculative' lenses, and ablation on model upgrade all assume escapes are cheap and that no component is a registered control.
- M0 is sized only by test maturity. That assumes the tooling itself needs nobody's permission.
- 'Reversible choices proceed and are logged' assumes the agent can judge reversibility. That holds for a display app and fails where an emitted message moves money.
- P9 'internal' as the zero-cost value assumes one team consumes its own API.
- Lockfile line-level review is feasible for one small package manifest, not for 40 services with daily bumps.
- In the lens table, the project intent owner owns domain lenses and a single always-on index lists all of them. Both assume a codebase small enough for one person and one context.

## Three-person startup, mobile app from an empty repository

### Verdict

The process does not apply to this archetype as written, mainly because its own section 6 excludes most of what this team does. One break is fatal, nine are major and four are minor. The delegation-and-walls part of the core survives. No files were read or changed. This is an analysis of the process text only.

**Profile as instantiated**

| Dial | Setting | Problem |
|---|---|---|
| P1 | forced to a | There is no code, so no honest value exists. By deployables (binary, backend, remote config) it is c. |
| P2 | b | Owners are by discipline, not by path. One of three humans can read a diff or operate the agent tool. |
| P3 and P6 | a and a | They collide: characterisation tests on an empty repo. |
| P4 | a now, changes at launch | At launch it becomes 'user-visible with no rollback', a value the dial lacks. |
| P5 | b | Store policy comes on top, and it is not law. |
| P7 | mixed per interface | Purchase and auth sandboxes are b. Push, store review and the device fleet are c. The dial takes one value per project. |
| P8 | c | — |
| P9 | nominally a, effectively b | Released binaries are consumers that cannot be redeployed. |
| P10 | c is reachable | The binary surface has third-party latency and no rollback. |

**Walk-through**

The work item: after five interviews the founder believes forced sign-up kills activation. The team ships deferred-sign-up onboarding with three animated screens, anonymous data merged on later sign-up, and funnel events.

1. **Bootstrap.** The /profile interview has three interviewees and one approver slot. A mobile M0 (signing, macOS runners, a simulator end-to-end driver, fakes for push, purchase and auth) takes two to three weeks. The one engineer reads every diff during peak scaffolding, which is also when the company most needs a build in users' hands. An honest payback criterion, days from hypothesis to user signal, would cut most of it.
2. **Spec.** The founder holds the hypothesis, the designer the prototype, the engineer the interfaces and `touches`. Only the engineer drives the session, so intent arrives by retelling. The spec-critic's 'owner present' means either a three-person meeting per spec or PR comments from two people who do not use git. The design file is a mutable URL, not a path.
3. **Acceptance at design time.** Behaviour checks are writable, but against testIDs that do not exist yet. Feel is not checkable. The 30-to-45 percent activation target maps to nothing before release.
4. **Build.** The builder cannot see or feel a device. Cloud agents cannot build iOS. One Mac's simulators cap parallel width.
5. **Feel loop.** A signed build before code review violates V5. A build after review puts the engineer inside each of 5 to 20 iterations. 'Merge screens two and three' invalidates acceptance tests that sit outside `touches`. It also invalidates goldens, which count as protected. The spec reopens each time.
6. **Review and packet.** The reviewer is fine on merge logic. The packet links changed files, which the founder and designer cannot use.
7. **Release.** TestFlight, then the founder's privacy labels and listing (no artefact exists for these), then store review taking one to three days with possible rejection on a guideline nobody could verify, then phased rollout, then flag ramp. 'The release gate' is five gates with three owners, one of them outside the company.
8. **Learn.** Activation does not move. That is not an escape, so the ledger has no line for it. The founder kills the feature. Nothing withdraws the spec or removes the flag, the tests and the lens lines. Next week's interviews change the requirements again.

**What survives and what fails**

The core holds as a discipline for delegation and for walls: T2, T3, T5, the brief contract, V3, V5 in principle, V7, reversible versus irreversible, credential limits, and check-then-delete-the-prose. It fails as a whole-process claim in three ways.

1. Section 6 excludes four conditions this team lives in on most slices: exploration, judged done, on-device verification, and more than one intent owner. The exclusions are project-level where they should be slice-level.
2. The 'human' in every gate is secretly one person who is owner, operator, code reader and releaser. With three humans, everything routes through the engineer. That gives solo throughput, puts two people outside the graph, and makes the engineer the Conway bottleneck. Otherwise the process has no answer.
3. 'Done' means CI and 'learning' means defects. This team's done includes a designer's judgement on a phone, and its learning is a product result.

**Minimum repair**

- Per-slice modes: probe, product, hardened.
- Acceptance ids typed as checked or judged, with attestations bound to a build.
- Gates defined by path class and evidence type, with per-role packets and WIP limits.
- A per-surface release table replacing P4 and P10.
- An experiment record with expiry and removal slices in the artefact chain.
- A profile that is re-run at stage changes.

With those changes the invariant core is smaller than section 1, and it is plausibly general. Without them, this is a process for maintainers of known products.

### What fits unchanged

These parts work unchanged for this archetype, and several matter more here than on the source project.

**Topology**
- T2 fits every delegated build: scripts orchestrate and artefacts coordinate.
- T3 (one writer per work item) is essential on a greenfield mobile repo. Every early slice collides on the navigation root, the theme, package.json, Podfile, Gradle and the lockfile.
- T4's vertical slices suit mobile: one slice is a screen, its API and its data.
- T5 fits: a human builds the harness interactively.

**Brief contract**
- `touches`, non-goals, escalation condition, named lenses, and a builder output with no success field all work as written.

**Verification**
- V3 (the guard plus protected paths) is more valuable here. Build config, entitlements, Info.plist privacy strings, signing config and native project files are exactly where an agent can do silent damage.
- V4 (fresh-context reviewer) works for logic such as anonymous-to-registered account merge, sync and the API layer.
- V5 is right in principle: fake transport and no production secrets.
- V7 fits very well. Mobile SDKs, store guidelines and OS behaviours are what agents fabricate most, and a `source:` plus quote check is cheap.

**Gates and learning**
- "Reversible proceeds and is logged, irreversible waits" maps cleanly onto flags, OTA and backend versus the binary, store listing and schema.
- "Agent credentials cannot merge, release or edit config" works; add "cannot submit to the store".
- Decision packets with a default if silent suit a busy founder.
- "Second occurrence becomes a check, then delete the prose" works.
- The payback criterion with "cut what has not paid back" is the process's best defence in this archetype. Declared honestly, it would cut most of the harness.
- A decision record with research fan-out is the right tool for the day-one stack choice (native vs cross-platform, BaaS vs own backend, auth, analytics).

**Dials and lens placement**
- P7c machinery (injected transport, captured vs synthetic fixtures, human-only live contact) fits push, in-app purchase and auth.
- Placement clauses 1, 4, 5, 6, 7, 8 and 10 give sensible answers for ordinary engineering craft.

### Breaks

**FATAL: Section 6 'What this process is not for' treats its exclusions as project-level and binary. The relevant ones are: exploration, no mechanical definition of done, verification only on hardware, and no identifiable intent owner per slice.**

- Why: This archetype sits inside four of the six exclusions on most user-facing slices. It stays there for its first 6 to 12 months.
- Intent is discovered by building.
- Feel has no mechanical done.
- Gestures, haptics, keyboard, push and performance verify only on devices.
- Every UI slice has at least two intent owners: what (founder) and how it feels (designer).

'Adopt the process only if the code survives' assumes a moment when prototype becomes product. In a startup the prototype is what the first thousand users run, so there is no such moment. Read literally, the process says 'not for you'. That contradicts the requirement that it apply to any project. Read loosely, the team applies full rigour to code with a half-life of weeks.
- Fix: Turn the exclusions into a per-slice `mode` in the spec header, set at the design gate.
- **`probe`:** a one-paragraph hypothesis, T3, the V3 touches guard, V5, a mandatory flag and an expiry date. No V2 and no V4.
- **`product`:** the current core.
- **`hardened`:** adds the P4c extras.

Promotion from probe to product is itself a slice. Its acceptance is characterisation checks of the behaviour being kept. The invariant core is then what holds in all three modes, which is smaller than section 1.

**MAJOR: V1: 'CI is the only authority on done.'**

- Why: The quality that decides whether this company lives is feel: motion, gesture response, haptics, pacing of onboarding. The designer's judgement on a physical device is the authority on it. Almost every slice has both a mechanical done (the flow works, data merges, events fire) and a judged done, so neither V1 nor section 6's 'use a human-judged core instead' applies cleanly.

The brief contract already allows 'a check or evidence file'. V1 then denies that evidence file any authority. Nothing binds a human judgement to the build it was made on. The designer approves build 41, review findings change the code, and build 43 ships.
- Fix: Type every acceptance id as `checked` or `judged`.
- V1 governs `checked` ids.
- A `judged` id is discharged only by a named owner's attestation file bound to a commit or build id.
- CI verifies that the attestation exists, names the right owner and is fresh. It is invalidated automatically when files in that owner's path class change after the attested commit.

**MAJOR: V2: 'Acceptance checks are written at design time from human values and approved with the spec. They are kept outside the builder's `touches`.' Combined with V3: 'captured fixtures ... are protected and get line-level human review.'**

- Why: On a design-led greenfield app, the UI structure is discovered during the feel loop. 'Merge screens two and three' or 'move sign-up after the first habit is created' is normal. Each such change invalidates end-to-end checks that were approved with the spec and sit outside the builder's write scope. So each of the 5 to 20 design iterations reopens a gated artefact.

Design-time end-to-end tests also need selectors and testIDs for screens that do not exist.

Golden screenshots are worse. They behave like verifier-owned fixtures, yet every legitimate UI slice must change dozens of them. The builder either cannot touch them, which is a deadlock, or every UI slice becomes a gated review of 60 images by the one person who reads code. That person is the wrong judge of them.

The human-supplied value that matters most is the activation target. It cannot map to any pre-release check.
- Fix: - Restrict V2 to behaviour-level checks: flow outcomes, data invariants and the analytics event schema. Write them against stable interface ids declared in the spec's `interfaces` section (routes, testIDs, event names).
- Make presentational goldens a third artefact class. The builder regenerates them, the design owner approves them through a visual diff, and they never count as acceptance.
- Outcome metrics go to an experiment record (see the learning-loop break), not to acceptance.

**MAJOR: T1: 'A model rewrites intent once, into a spec, with the intent owner present.' The brief contract adds: 'A fresh-context spec-critic batches its questions while the owner is present.' P2b: 'asynchronous review.'**

- Why: There are three owners per slice.
- The founder owns the hypothesis and non-goals.
- The designer owns end state and feel.
- The engineer owns interfaces and `touches`.

Only the engineer operates Claude Code. Intent therefore reaches the model as interview notes, then the founder's words, then the engineer's retelling, then the spec. That is two lossy hops before the 'once'. It is the telephone game T1 exists to prevent.

'Owner present' forces either a three-person synchronous session per spec, where the calendar becomes the longest path, or asynchronous PR comments from two people who do not live in git. The second option is what P2b prescribes for teams, and it contradicts the spec-critic rule. There is no tie-breaker when owners disagree. Section 6 then declares that negotiation out of scope, yet for this team it is most of the work.
- Fix: - Give spec sections owners. Split the spec per slice into intent, design and tech files so CODEOWNERS can require each owner's approval.
- Give each owner a surface where they can run the spec interview for their own sections: a cloud session, or a form that opens a PR.
- The spec-critic routes each question to its section's owner and batches per owner.
- One named slice owner breaks ties.
- P2 must record, per human, which sections they own and how they approve.

**MAJOR: Human gates: 'There are always two gate kinds: design approval and release.' P4 and P10 are single scalar dials.**

- Why: A mobile release is a chain with different owners and different reversibility.
1. Merge.
2. Internal build.
3. On-device feel sign-off (designer).
4. External beta.
5. Store submission with metadata, screenshots and privacy labels (founder).
6. Third-party review with 1 to 3 days of latency and possible rejection (nobody in the company).
7. Phased rollout.
8. Flag ramp (founder).

A shipped binary cannot be rolled back, and old versions persist for months. P4 offers 'user-visible, quick rollback' or 'irreversible (data, money, safety)' and has no value for 'user-visible, slow or no rollback'. Blast radius also changes with lifecycle, from ten beta testers to a public launch, but the dial is static. P10c ('all surfaces staged') is reachable yet says nothing about third-party latency or un-rollbackable surfaces. Store metadata and privacy labels are release artefacts with no place in the artefact chain.
- Fix: - Replace the P4 and P10 scalars with a release-surface table. Each surface gets a row: binary, OTA bundle, backend, schema, flags, store listing. Columns are staged or not, time to roll back, third-party latency, promoter, and current audience size.
- Derive the gate per row from the core's existing reversible/irreversible rule. Surfaces that roll back in minutes proceed and log. Binary, store listing and schema wait.
- Add the store as an external gatekeeper, with a rejection ledger that feeds the facts file.
- Re-profile on lifecycle events such as public launch.

**MAJOR: Human gates assume one kind of human. Examples: 'Human diff depth', 'WIP about 2 per reviewer', 'every diff human-read' until M0, 'line-level human review' of protected paths, and packets that 'link every changed file'.**

- Why: This is Conway's law applied to the process itself. Every gate that involves code lands on the engineer: pre-M0 diffs, protected paths, merge, release, and in practice the spec session and each design iteration. The founder and designer have attention to give but no gate they can discharge. Team WIP is therefore 2, the same as solo. The process rebuilds the solo-maintainer topology inside a three-person company and turns two thirds of the team into stakeholders outside the graph.

The longest path runs from user interview to founder to engineer to agent to CI to engineer to designer, then back round that loop N times.
- Fix: - Define gates by path class and evidence type, not by 'a reviewer'.
- **Presentation paths** (tokens, motion constants, layout, copy):
  - owned by the designer or founder;
  - reviewed through visual diff, on-device build or copy diff;
  - mergeable by that owner on green CI;
  - requires the touches guard to confine the diff to that class and the surface to be flag- or OTA-reversible.
- **Behaviour and kernel paths** stay with the engineer.
- Set WIP limits per gate role.
- Build packet templates per role. The designer gets a build id, recordings and visual diffs across the device matrix. The founder gets an experiment readout and a store checklist.
- 'Default if silent' becomes a per-role, per-surface setting.

**MAJOR: P3a plus P6a: 'characterisation tests, fakes, CI, end-to-end smoke before any feature ... Until M0 lands: width 1, every diff human-read', together with 'M0 is a walking skeleton with CI'.**

- Why: - Characterisation tests are meaningless on an empty repo. P3a's definition is brownfield, and the board does not say which dial wins when P3a meets P6a.
- A mobile M0 is expensive. It needs signing, macOS runners, a simulator end-to-end driver, and fakes for push, in-app purchase and auth. That is two to three weeks.
- 'Every diff human-read until M0' applies when agent output is at its peak (scaffolding the whole app), and one engineer reads it all.
- It is also the period when the business most needs a build in front of users.
- 'Verification first' assumes behaviour stable enough for checks to pay back. Here behaviour has a half-life of weeks.
- P3 scales M0 by existing test maturity. It should scale by expected code lifetime and by what verification costs.
- Fix: For P6a, define M0 as a time-boxed walking skeleton of a few days:
- one screen and one API call;
- a build-to-phone pipeline;
- the touches guard;
- fake transport;
- a dev-signing lane.

Further verification is bought per slice, at probe-to-product promotion. Add two dials that feed the payback criterion: product certainty (or code half-life) and verification environment cost.

**MAJOR: P6a: 'architecture records and module map before slice one.' T4: 'Cut work along module boundaries.' P1's values are 'tight; modular; several deployables'.**

- Why: With requirements changing weekly, a module map drawn before slice one is speculation. The boundary lint that P1 demands before any width would harden guesses into structure. That is the opposite of what P6c already concedes for brownfield, where the map comes only after the records that would move the seams.

P1 has no value for 'no code yet'. It also conflates coupling with deployable count. This app is 'c' by deployables (binary, backend, remote config) and 'a' by team and by actual coupling.

The kernel paths P1 tells you to gate do not exist yet, and they will move for months.
- Fix: - P6a: before slice one, write records only for irreversible stack decisions (framework, backend, auth, analytics, flag and OTA mechanism). Decide them with research fan-out.
- The module map waits until seams have been observed over N slices. This is the same rule as P6c.
- Add P1 value `0 unformed`: width 1, no boundary lint, and the kernel list revisited at every retro.

**MAJOR: The artefact chain ends at 'PR with machine evidence, release, and escape log'. The learning loop is 'Each escape gets a ledger line'. Payback is 'human-minutes per merged slice and escapes'. The roadmap is 'milestones with exit criteria'.**

- Why: The process learns about its own defects, not about the product. The archetype's stated priority is speed of learning.
- A feature that ships perfectly and that nobody uses is a result, not an escape. It has no ledger line.
- There is no hypothesis, experiment or readout artefact.
- No rule covers withdrawing an in-flight spec when interviews change the intent. Its expected-fail checks become orphans in the manifest.
- No removal slice exists for killed features, so flags, tests, lens lines and records pinned to dead features pile up.
- Exit-criteria milestones assume stable goals.
- The payback metric comes from a maintainer with two scarce hours a week. A startup would declare days from hypothesis to user signal, plus runway.
- Fix: - Add an `experiments/` record kind holding hypothesis, metric, threshold, flag and expiry.
- A scheduled agent assembles the readout packet from analytics.
- Expiry opens a keep-or-kill decision for the founder. A kill generates a removal slice.
- The spec header gains `withdrawn` and `supersedes` fields. CI fails on expected-fail entries whose spec is withdrawn.
- The profile declares the primary payback metric. The kit hard-codes none.

**MAJOR: V5: 'Whatever runs agent-authored code before human review uses fake externals and no production secrets.'**

- Why: Feel can only be judged on a phone, and on a native stack that needs a signed build. Building an agent-authored branch runs agent-authored code at build time with signing material present: post-install scripts, Podfile hooks, Gradle plugins.

The team has two options and both are bad. The engineer reads every diff before each designer feel check, which puts the engineer inside every design iteration. Or V5 is violated.

The JS-only OTA-to-dev-client route avoids the problem, but it exists only for some stacks. That makes the gate structure stack-dependent, and the board does not capture it.
- Fix: Tier the secrets in V5.
- A development signing identity and an internal preview channel are 'preview secrets'.
- They are usable when the V3 guard shows no protected path changed: build config, dependencies, native project, CI.
- Distribution certificates and store API keys exist only in post-merge, human-triggered jobs.
- Prefer OTA to a dev client where the stack allows it.
- Record preview capability in the profile.

**MINOR: 'All live in the repo and are approved by merge.' 'Everything downstream reads the spec and its sources by path.' T2: 'one writer and one source of truth per kind of fact.'**

- Why: - The design source of truth is a design tool: mutable, addressed by URL, and written by someone who does not use git. The designer will change it after spec approval, weekly.
- Interview evidence lives in documents outside the repo.
- Once tokens are copied into code there are two sources of truth and two writers.
- V7's quote check does not apply to a frame or a prototype.
- Approval by merge excludes two of the three humans unless someone proxies for them. That recreates the lossy hop.
- Fix: - Allow pinned external references in `allowed sources`: a design file version id, plus an exported snapshot committed at spec approval.
- Generate tokens with a sync script (placement clause 4), with a CI drift check against the pinned version (clause 1).
- Accept required review through the hosting UI as 'approval by merge' for owners who do not use git.

**MINOR: P9: 'a internal ... no API-diff check'. The profile pattern is the same as the source project.**

- Why: The backend's only consumer is the company's own app, so the dial reads 'internal'. But every released binary is a consumer that cannot be redeployed and that stays in the field for months. Version skew makes the API effectively versioned and public.

The dial asks who the consumers are. The variable that matters is whether provider and consumers deploy atomically.
- Fix: - Redefine P9 by deployment atomicity: a atomic; b skewed own clients; c third parties.
- For b: contract tests replayed from request fixtures captured per released client version, an API-diff check, expand/contract migrations, and a minimum-supported-version and force-upgrade mechanism as an early roadmap item. This parallels P10a, where decoupling is the first roadmap item.

**MINOR: Bootstrap step 4: 'Pilot three slices of rising size: a no-spec fix, one spec, a decision record with research fan-out.' Step 3: 'Lenses come only from interviews, record residues and escapes; none speculative.' Discipline lenses: 'evals first, about 20 real cases.'**

- Why: - On an empty repo there is nothing to fix. The real order is inverted: stack decision records first, then the skeleton, then the first spec.
- With no escapes and no records, the architecture-setting slices run with no discipline lenses at all. Those slices are the most consequential and the least reversible.
- A three-person startup will not write 20 eval cases for a framework skill. It will install community skills unvalidated.
- That inflow is ungoverned. The rule of two only governs outflow.
- Fix: - Make the pilot order depend on P6. For P6a: stack record, walking skeleton, first spec.
- Allow imported discipline lenses flagged `unvalidated`. Their outside-world claims fall under V7, and their lines graduate or get deleted at retros.

**MINOR: 'A one-sentence diff skips the spec.' T2 and the brief contract model all work as spec, delegated builder, CI, packet.**

- Why: Feel tuning is dozens of tiny human-in-the-loop iterations with hot reload: 'stiffer spring, shorter delay, more overshoot'. It is the dominant activity on UI slices, and it does not fit the delegate-and-wait topology. One CI run on macOS takes 20 to 40 minutes.

The only hatch that fits is the one-sentence-diff rule. What still applies after that rule fires is undefined: `touches`, review, the gate, attestation. Most of this archetype's UI work would flow through an unspecified exception.
- Fix: Define an interactive tuning mode.
- The session is confined to the presentation path class by a session-level touches guard (a hook), with CI recomputing it.
- Behaviour checks must stay green.
- Output squashes to one PR.
- A judged attestation bound to the final commit closes the mode.

### Missing profile parameters

- Product certainty or expected code half-life (explore, validate, scale). It sets the per-slice mode mix and how much verification pays back. It varies over time, so the profile needs re-profile triggers such as a stage change or public launch, not only a model upgrade.
- A per-human capability matrix to replace the single P2 value: who can operate agents, who can read diffs, which evidence types each person can judge, and which path classes each may approve or merge.
- The number of intent owners per slice and a named tie-breaker (slice owner). Section ownership within the spec.
- A release-surface table to replace the P4 and P10 scalars. Per surface it records: staged or not, time to roll back, third-party latency, promoter, and current audience size. There is no current value for 'user-visible with slow or no rollback'.
- External gatekeeper: store review. It needs the policy source, submission lead time, a rejection ledger, and the required release artefacts (listing metadata, screenshots, privacy labels). These artefacts have no place in the artefact chain.
- Deployment atomicity and client version skew: minimum supported version, force-upgrade mechanism, and the version distribution of the fleet in the field.
- Verification modality per acceptance id (mechanical, human-judged, on-device only), plus the expected share of judged ids. P8c covers static pixels only. It does not cover motion, gesture, haptics or pacing.
- The device, OS and settings matrix and its source: analytics device share, dynamic type, dark mode, locale and RTL, accessibility settings. Also physical device availability.
- Verification environment cost: macOS runners, minutes and latency per CI run, simulator and build-cache contention per machine, and the fact that cloud agents cannot build iOS. This caps builder width independently of P1.
- Primary payback metric (learning cycle time, human-minutes, or escapes) and a cash budget for agent and CI spend. Runway is a constraint the board never mentions.
- Sources of truth outside the repo (design tool, research notes, analytics) and how each is pinned or synced.
- P7 set per interface, not per project. In one app the purchase sandbox is b, push is c and analytics is b.
- Preview capability of the chosen stack (JS-only OTA to a dev client, or native-only signed builds). It determines whether the designer's feel loop can run before code review under V5.
- P1 value for 'unformed' (no code yet), and a separation of coupling from deployable count.

### Lens placement cases

| Expertise | Rule gave | Correct | Comment |
|---|---|---|---|
| Motion and feel: 'onboarding transitions must feel physical and snappy: spring-based, about 300 ms, interruptible by gesture, a haptic on completion, respect reduce-motion'. | The rule splits the statement into clauses. - **Clause 1:** lint that durations and springs come only from motion tokens, plus a test that reduce-motion disables them. - **Clause 3:** a decision record for the chosen spring family. - **Clause 8:** a motion skill, split by tier. The discipline tier covers platform motion guidelines, interruptibility and frame budget. The domain tier covers this brand's constants. It is named in the spec and loaded when `touches` hits UI paths. | no | Everything the rule places is correct but peripheral. The core of the expertise is judging whether it feels right on a device, and that matches no clause. It is not checkable, not a fact, not a settled choice, and not craft an agent can load.  The procedure assumes all expertise ends up in an artefact an agent reads or a check a machine runs. It needs a terminal clause: 'a judgement only a named human can make' becomes a judged acceptance id with attestation. The lens carries only rulings that human has already given, as dated examples. |
| Store policy: 'in-app account deletion is mandatory; if any third-party login is offered, Sign in with Apple must be too; permission prompts need purpose strings and cannot gate core use'. | - **Clause 2:** attested lines in the protected facts file, each with `source:` and a verbatim quote. - **Clause 1:** the checkable residue. A test that settings exposes account deletion, a lint that social login packages imply the Apple one, and a check that every requested permission has a purpose string. - Anything still unknown becomes an open question. | yes | The placement is right. V7 is valuable because agents invent store rules with confidence. There are three caveats.  1. **Staleness has no trigger.** The tier table says a discipline lens is 'pinned to tool versions; a major dependency bump reopens it'. Store guidelines change on a calendar, not with any dependency. They need a scheduled re-verification agent. 2. **Tier is ambiguous.** This is true for every iOS app, so it is discipline-tier, but the rule of two keeps it in the project. A one-product startup will never have a second project, so the knowledge never becomes shareable. 3. **The final truth is interpretive.** It is revealed only by submission, so some 'open questions' cannot be answered by any human. See the hypothesis case. |
| Version skew: 'released app versions stay in the field for months; the backend must stay compatible with every version at or above the minimum supported one'. | - **Clause 1:** must never break and is machine-checkable. Contract tests replay request fixtures captured per released client version, with an API-diff check in CI. - **Clause 3:** a decision record for the minimum-version and force-upgrade policy. - **Clause 6:** one memory-file line saying why. | yes | The placement rule gives the right answer, but the dial board contradicts it. P9a ('internal') says no API-diff check. The lens procedure and the profile can therefore disagree, and nothing says which wins.  The fixture vocabulary (`captured` versus `synthetic`) was designed for third-party APIs. Fixtures captured from your own past releases are a new kind. They are keyed by release tag and generated at release time, by script rather than by a human. |
| Product discovery: 'hypothesis: deferring sign-up until after first value lifts day-one activation from 30 to 45 percent; measure with funnel events; kill if no lift in two weeks'. | - Clause 1 does not apply, except to the event schema: typed events and an end-to-end assertion that they fire. - Clause 2 treats it as an unknown fact about the outside world, so it becomes 'an open question', and 'only humans answer the open-questions file'. - Otherwise clause 9 applies. It is true for this slice only, so it goes in the spec's intent section. | no | This is wrong on the archetype's central expertise. No human can answer this question. Only an experiment can.  In the open-questions file it blocks forever, or the founder 'answers' it with an opinion that then reads as a fact. In the spec it vanishes at merge. The threshold, the expiry and the kill rule have no mechanism, and the readout has no home.  The procedure needs a clause between 2 and 3: 'a belief about the world that only an experiment can resolve'. Such a belief becomes an experiment record (hypothesis, metric, threshold, flag, expiry) with a scripted readout and a scheduled keep-or-kill decision. |
| Design system source of truth: 'colours, spacing, type scale and component variants are whatever the design file says; code must match it'. | It is ambiguous between three answers. - **Clause 2:** a fact outside the repo, so a sourced constant or an attested line. - **Clause 1:** a lint forbidding raw colour and spacing literals. - **Clause 7 or 8:** a path rule or skill on how to use the components. | no | Clause 2 misclassifies it. The design file is not the outside world needing human attestation. It is a team-owned artefact with its own single writer, living in another tool and changing weekly.  Attesting tokens by hand creates a second source of truth and a stale one within days. T2 forbids that.  The right home is a generated artefact: a sync script (clause 4) pinned to a design-file version, with a CI drift check (clause 1), the literal-ban lint, and a skill for usage. The procedure lacks a question such as 'is the source of truth a team artefact outside the repo?' before clause 2. |

### Assumptions smuggled in from the first project

- One person holds every role. In the source project the intent owner, agent operator, code reader, merger and releaser are the same human. 'With the intent owner present', 'human diff depth', 'WIP about 2 per reviewer' and 'every diff human-read' all assume a human who can operate the tool and read a diff. With three humans, only one can.
- The release model is a web deploy: one event you control, instant propagation and quick rollback. V6's surface list ('code, schema, access rules, config') is one hosting platform's inventory. It omits binaries, OTA bundles, store listings, third-party review latency, and a client fleet running old versions indefinitely.
- 'All live in the repo and are approved by merge' assumes every stakeholder uses git and that no source of truth lives in another tool. A solo engineer has no designer with a design file and no founder with research notes.
- P8's 'screenshots at target viewports' and 'visual diff against design sources' carry a TV and web notion of design quality: static pixels at a few resolutions. Mobile feel is temporal and tactile. The target is a device, OS and settings matrix, not viewports.
- Brownfield bias appears throughout: 'characterisation tests', 'module map from existing seams', 'kernel paths (shared types, schema, access rules)', 'a no-spec fix' as the first pilot, and lenses born 'only from escapes'. All presuppose an existing codebase with a history. The P6a row was added later and conflicts with P3a.
- Verification is treated as a durable asset. Writing checks first pays back on a maintained product whose behaviour is stable for years. The core has no concept of code meant to be deleted in three weeks, a feature kill, or spec withdrawal.
- The payback metric ('human-minutes per merged slice, zero escapes to live') and the P2 'hours per week' dial encode a maintainer with two scarce hours. A funded team's scarce resources are calendar time to a user signal, runway, and one engineer's review bandwidth.
- The learning loop equals a defect ledger. A solo maintainer of a known product learns mainly from regressions. A product-discovery team learns mainly from results that are not defects.
- CI is assumed cheap, fast, Linux-hosted and runnable by cloud agents ('tireless at verification', 'CI is the only authority on done'). Mobile CI needs macOS, signing, simulators and 20 to 40 minutes per run. Cloud agents cannot build iOS at all.
- 'Tracker holds status, never intent' and 'cross-team negotiation must finish upstream of T1' fit a solo owner whose intent is in their head. In a three-person company, the negotiation between product, design and engineering is the expensive part of the work. The process declares it out of scope.
- Exactly two gate kinds (design approval, release), a single scalar blast radius, and a static profile. All are reasonable for one deploy target with one audience. They cannot express a release chain with several owners or an audience that grows a thousandfold at launch.
- Discipline skills 'validated with about 20 real cases' and the 'rule of two' assume an owner with a portfolio of projects and time to curate a kit. A one-product startup will consume unvalidated community skills and never satisfy the rule of two.

## Open-source library with outside contributors

### Verdict

The core does not hold for this archetype: it is invariant only inside a trust boundary where the process spawns the builder and one person owns intent. Two breaks are fatal: the builder sits outside the harness, and there is no intake stage or admission gate. The verification rules survive as principles, and several get stronger. The topology rules T1, T3 and T4, the two-gate model, P3 as a scalar, and the lens packaging and load guarantees do not survive.

WALK TRACE
The work item:
- Issue #3098 from a stranger: "support AbortSignal in poll(), cancelToken is awkward".
- Two hours later, PR #3120 arrives from another stranger's non-Claude agent. It adds `signal`, deprecates `cancelToken` and costs +412 B gzip on the core entry.
- It also edits the README, adds a polyfill dependency and bumps the CI matrix. Its tests were written with the code, and it has no changeset.
- Rival PR #3124 arrives the next day.

Steps, with the breaks they hit:
1. Intake has no stage. (break 2)
2. The design gate happens after the code exists, and `touches` is self-declared. (break 4)
3. The two maintainers disagree on the deprecation, and nothing defines a decision rule. (break 5)
4. Spec-critic questions go to absent owners, at days per round trip. (break 3)
5. The contributor's agent never sees the brief, skills or rules. (break 1)
6. A rival PR appears, then the first author goes silent. (break 10)
7. The maintainer's review agent, run from the PR head, would load the PR's own config. The PR also edits the manifest and CI. (break 6)
8. CI is green. The API-report diff and size diff make an excellent packet, but CI cannot judge docs quality or naming. (breaks 7 and 16)
9. At merge, the manifest and ledger files conflict. (breaks 4 and 18)
10. Release is a batch, it is irreversible, and `next` has no adopters. (break 8)
11. Removing `cancelToken` in v6 has no home. (break 9)
12. The 4.x line and the next embargoed fix have no track. (breaks 11 and 12)
13. Three weeks later a dependant compiling without the DOM lib reports that the minor broke their build. The escape arrives through the public queue. Its lesson is a discipline lens that outside agents will never load, so it must become a matrix check. (breaks 7, 13, 18 and 1)

ON THE TWO DESIGN CONCERNS
Conway. The organisational boundary here lies between builder and evaluator. The system's real interface is therefore the PR contract. The longest path runs: requester, issue, maintainer, spec, contributor, contributor's agent, PR, maintainer's agent, maintainer, release, dependant. It contains at least three uncontrolled rewrites of intent. The only levers that shorten it are a self-sufficient spec that outside agents read by path, and an admission gate that answers quickly.

Expert lens. The owner's three candidate homes (skills, agent definitions, design output) need a fourth: check failure messages. Placement also needs a prior question about reach. For builders outside the harness, the only context guaranteed to load is CI output and files at conventional repo paths.

THREE-TIER HYPOTHESIS
Keep the tiers, with four amendments:
- Process lenses are identical per profile value, not per project.
- Tier is relative to the observer. A public library's domain lens is its dependants' discipline lens, and must be exported as a release surface.
- Add placement clause 0, about reach.
- Add a clause for deferred obligations.

RECOMMENDED RESTRUCTURE
Divide the core into an inside-the-boundary harness and a tool-neutral boundary contract. Add dials for:
- trust boundary;
- inflow;
- decision rights;
- tool heterogeneity;
- release lines;
- support matrix;
- reversibility.
Make P3 a per-lens vector.

As written, the process fits closed teams of any size better than it fits open contribution. Section 6 should say so until the restructure lands.

Two platform claims above are unverified and marked for the spike: whether an agent session on a PR head loads that PR's config, and whether private advisory forks run CI.

### What fits unchanged

PROFILE AS INSTANTIATED (four of the ten dials have no value that fits).
- P1: b, forced. One package, several entry points, contract machine-checked by an API report. The dial's consequence, builder width, cannot be set here: width is whatever strangers decide to open.
- P2: no fitting value; nearest is b. Two volunteer maintainers at a few irregular hours a week, plus hundreds of outsiders. CODEOWNERS routes everything to the same two people.
- P3: c on behaviour tests. It is a or b on API-surface snapshot, type tests across TS versions and lib settings, doc-example compilation and downstream canary. A scalar cannot express this.
- P4: c. A published version with dependants cannot in practice be withdrawn, and caret ranges plus dependency bots propagate it within hours. The c prescriptions "staged rollout, rollback runbook" are partly void.
- P5: a by the listed values. The real exposure is IP and licence provenance, which has no value.
- P6: b.
- P7: a by the listed values. The real externals are compilers, runtimes, bundlers and peer-dependency ranges, which have no value.
- P8: a for UI. Documentation as a product is not covered.
- P9: c. This is the best-fitting dial and its prescriptions are right.
- P10: c nominally (release PR, `next` dist-tag, versioned docs). Staging without adopters verifies little.

WHAT WORKS UNCHANGED
- V1 as the authority on merge-readiness.
- V3's base-computed guard and line-level review of protected files. The hosting platform already withholds secrets from fork PR runs.
- V4 fits better here than at home. Never showing the reviewer the builder's narrative doubles as an injection defence, and the author is often a different model, so some independence comes free.
- V5 as a principle: no secrets near unreviewed code.
- V7, T2 inside the maintainers' own harness, and T5.
- Decision records.
- The vision page with non-goals. It is more valuable here because it is the citation for every decline.
- The spec's `interfaces` section. For a public API it naturally becomes the d.ts diff plus the proposed docs page.
- The builder schema without a success field.
- Machine-assembled decision packets. An API-report diff plus a size diff is close to an ideal packet.
- Agent credentials that cannot merge, release or edit agent configuration.
- The promotion rule "second occurrence becomes a check, then delete the prose".
- Placement clauses 1 and 2.
- The rule of two.
- V2's independence comes free for bug reports when reporter and fixer are different parties. The reporter's reproduction is an expected-fail acceptance check written by someone other than the builder.

### Breaks

**FATAL: The brief contract, the lens table's 'Load guarantee' row and section 4 packaging (kit plugin, `skills:` preload, path rules, subagent definitions, Workflow scripts). All rest on the unstated assumption that the process spawns the builder.**

- Why: Most diffs here are written by a stranger's agent, often not Claude Code. It has no kit, no user-level skills and no path rules, and it never receives a computed brief. Only two things reach every builder: files at conventional paths in the public repo, and CI output on the PR. By Conway's law the organisational boundary runs between builder and evaluator. So everything the process places on the builder side is unenforceable: the brief, lens preload, the output schema and the escalation condition. The archetype's hard requirement, that any contributor's agent can follow the process without the maintainers' private setup, fails outright.
- Fix: Split the core into two halves. (a) An inside-the-boundary harness for triage, spec, verify, review and release, which may use Claude Code mechanisms. (b) A tool-neutral boundary contract: AGENTS.md and CONTRIBUTING.md; `pnpm verify` and `pnpm brief <spec>` shipped as devDependencies; a PR template whose fields CI parses; and CI failure messages that carry the lens text plus a doc link. Add placement clause 0: 'Must an agent outside your harness heed it? Then a CI check with a teaching failure message, or a tool-neutral repo doc. Never a skill, path rule, definition or hook.'

**FATAL: The artefact chain 'goal, rough plan, detailed plan, tasks'; 'There are always two gate kinds'; 'a WIP limit caps open work'.**

- Why: Work is pushed at the maintainers, not pulled from a roadmap. The first events in the walk have no stage in the chain: issue #3098, unsolicited PR #3120 two hours later, and rival PR #3124 the next day. Accept, decline, duplicate or needs-repro is a third gate kind and the dominant human cost. A WIP limit on inflow the maintainers do not control only produces an unbounded queue and months of silence. That silence becomes the longest communication path in the system.
- Fix: Add an intake stage and an admission gate, switched on by an inflow dial. A machine pre-screen runs before any human minute is spent: template fields, linked accepted issue, green CI, changeset, sign-off. Decline is a first-class packet outcome that cites the vision's non-goals. The queue has a regression fast lane and age-out. The payback metric becomes maintainer-minutes per closed item (declines included) plus time to first response.

**MAJOR: T1: 'A model rewrites intent once, into a spec, with the intent owner present', and the spec-critic that 'batches its questions while the owner is present'.**

- Why: There are two intent owners. The requester owns the need; the maintainers own what the library commits to for years. Neither is present in a session. Round trips take days and requesters often vanish. Intent is rewritten at least three times: need to issue text, issue to spec, and spec to the contributor's own prompt for their agent. The last rewrite is outside any control the process has.
- Fix: T1 becomes 'one rewrite inside the boundary'. The maintainer is the intent owner of record for anything public, and the requester is a quoted source. The spec is self-sufficient and machine-readable. AGENTS.md tells outside agents to work from the spec path, never the thread. Spec-critic questions go out as one batched public comment with a default-if-silent and a stated timeout.

**MAJOR: V2 (acceptance checks written at design time, outside the builder's `touches`, expected-fail manifest) and V3 (`touches` guard), when applied to unsolicited PRs.**

- Why: The PR arrives with code and tests authored together, before any spec exists. A `touches` list would be declared by the builder itself, so the guard checks nothing. Requiring a merged spec plus acceptance checks before every contribution means two maintainer-reviewed PRs per change. It also moves the expensive half of the work onto the two scarcest people. A single expected-fail manifest touched by every PR is a merge-conflict hotspot at this concurrency.
- Fix: Two modes. Solicited: an accepted issue gets a spec and expected-fail checks prepared maintainer-side and approved by a maintainer, then a help-wanted label. Unsolicited: a retroactive V2. A maintainer-side agent that cannot see the diff writes acceptance checks from the issue and docs, and they are run against the PR. The guard derives the required gates from the diff's path classes (API report changed, manifest changed, budget changed) instead of checking a declared scope. Expected-fail entries become one file per spec, as changesets did for changelogs. For bugs, the reporter's reproduction is the acceptance check.

**MAJOR: Gate rules that assume one owner: 'with the intent owner present', 'default if silent', 'A human runs the retro', 'Only humans answer the open-questions file', 'named human attestation', 'The human applies settings and CI changes personally'.**

- Why: In the walk, maintainer A wants `signal` and maintainer B objects to deprecating `cancelToken`. Nothing defines quorum, the tie-break, whose silence triggers the default, or a community comment period. Strangers are humans too, so 'only humans answer' hands authority to anyone. At P4c with thousands of dependants, one maintainer changing CI or release settings alone is the supply-chain weak point. The threats are a compromised account, or a patient contributor who earns commit rights.
- Fix: Put a decision-rights table in the profile, per path class. Either maintainer decides internal changes. Public API additions need both maintainers, or lazy consensus with a stated timeout. Breaking changes, deprecations and new runtime dependencies need both maintainers plus a public comment period. Protected paths and publish get a two-person rule. Answers and attestations count only from named people inside the boundary. Add an explicit trust ladder (contributor, triager, committer) with promotion criteria.

**MAJOR: V5's mechanism ('the fake-by-default transport is the wall'), V3's protected list ('CI, agent config, process scripts, captured fixtures, lockfile') and T2 ('agents never message each other').**

- Why: Fake transports are irrelevant here. The real risk is a maintainer's agent session running with its working directory on the PR head. That session may load the PR's memory file, settings, hooks and skills while maintainer credentials are on the machine. Confirm this in the spike. Issue and PR text written by strangers' agents gets 'quoted with links' into the spec, which every downstream agent reads as authority. That is an injection path. T2 is false across the boundary: PR bodies, review replies and dependency bots are all agent-to-agent messages. The protected list also omits what defines the published artefact: the package manifest (exports, files, sideEffects, scripts, dependencies), build config, API report, size budget and release config.
- Fix: Make protected path classes profile-defined. Maintainer-side agents run from a base-branch checkout, treat the PR diff as data, and sit in a sandbox with no publish or write credentials. Text from outside the boundary is labelled data and confined to a quoted-source block in the spec. CI runs in two stages: an untrusted job produces evidence artefacts, and a trusted job posts a schema-constrained packet without checking out PR code.

**MAJOR: V1: 'CI is the only authority on done'. Also section 6, which excludes work with no mechanical definition of done.**

- Why: For backwards compatibility, done is decided in thousands of downstream builds, weeks after release. In the walk, `signal: AbortSignal` references a DOM global, which breaks consumers compiling without the DOM lib. That is a breaking change shipped in a minor, and a stranger reports it three weeks later. CI is only a proxy for this. Documentation quality and API naming have no mechanical definition of done. Section 6 puts such work out of scope, yet documentation is one of the three dominant lenses.
- Fix: Reword V1 to 'CI is the only authority on merge-ready'. P9c adds a downstream canary (run a fixed set of top dependants' suites against the PR build) and comparative checks against the last released version. Acceptance ids may map to a named-human judgement with a rubric, for docs and API shape. Go docs-first: the proposed docs page and d.ts diff are the spec's end state, and the doc examples are the acceptance tests.

**MAJOR: The gate model 'design approval (change is cheap) and release (change is irreversible)', and P4c's 'staged rollout, rollback runbook'.**

- Why: For a public API, the irreversible commitment is made at the design gate. Once released, the shape must be supported through a deprecation window measured in years. Release is a batch event across many slices, so per-slice packets miss interactions. Two PRs can each be within the size budget and exceed it together, or two additions can use inconsistent names. A package registry has no rollback: the version stays, lockfiles pin it, and the only remedy is fix-forward plus a deprecate notice. A `next` channel with no adopters verifies nothing.
- Fix: Add an irreversibility class to the spec (internal, public-additive, public-breaking). It routes gate depth, independent of deploy staging. Add a release-level packet: cumulative API diff, size diff since last release, canary results, changesets and deprecations added. Replace the rollback runbook with a fix-forward-and-deprecate runbook. Define soak exit criteria by canary set and elapsed time.

**MAJOR: T4 'never phases', together with 'specs (one slice each)' and 'A tracker holds status, never intent'.**

- Why: Deprecation is inherently phased across releases: add and warn now, remove in a major at least a year later. P9c itself prescribes expand/contract, which contradicts the letter of T4. The obligations to remove, write the migration guide and ship a codemod outlive the spec that created them. Under the current rules they have no home.
- Fix: Add a T4 exception. Expand/contract phases are separate slices linked by a deprecation ledger in the repo, one file per deprecation: symbol, since-version, replacement, earliest removal, codemod. Add a version-keyed check that fails when the major reaches the removal version and the symbol is still exported.

**MAJOR: T3: 'One writer per work item', and P1's 'Kernel paths stay serial and gated'.**

- Why: Nothing stops two strangers' agents opening rival PRs for the same issue. Contributors go silent mid-review, leaving a branch the maintainer side may not be able to push to. The kernel (public entry points, manifest) cannot be serialised when the writers are uncoordinated.
- Fix: Add three protocols. Claim: an assignment comment parsed by a script, expiring after N days. Duplicate: the first PR green on the acceptance checks proceeds, and the script closes the other with thanks. Takeover: after a timeout, a superseding PR with co-author credit. Add a merge queue. Conflicts in the generated API report then act as the natural serialiser for kernel changes.

**MAJOR: 'All live in the repo and are approved by merge', and 'A guard computed from the base branch'. Both assume one branch and one live version.**

- Why: A long deprecation policy means a maintained `4.x` line beside main. The harness, memory file, lenses and records on `4.x` are frozen at branch time. A security backport is therefore governed by a stale process. Which branch holds records and escapes is ambiguous.
- Fix: Add a release-lines dial. Harness and process artefacts are authoritative on the default branch only. A backport script cherry-picks, computes the brief from main's harness and runs the target line's own CI. Line-specific facts (supported TS and Node versions) live in a per-line file.

**MAJOR: 'All live in the repo', and section 6 filing 'Incidents and hotfixes' as out of scope with a runbook.**

- Why: For a library with thousands of dependants, privately reported vulnerabilities are a recurring, planned work type, not an exception. A public spec, PR or CI run discloses the flaw before the fix ships. The platform's private advisory forks may not run CI at all; verify in the spike. The fix must also land on every supported line at once.
- Fix: Make a confidential track a profile value. It has private artefacts, a private mirror for CI, two-person review and a coordinated publish across lines. The artefacts and the escape line become public after disclosure.

**MAJOR: P3 as a scalar ('a none; b partial; c strong'), and 'c: guard and acceptance job only'.**

- Why: A library can be strong on unit tests and have none of the checks its dominant lenses need. These are API-surface snapshot, type tests across supported TS versions and lib settings, package-shape lint (exports map, dual format, types resolution), size budget per entry point, doc-example compilation and downstream canary. Verification-first here means comparative checks against the last released version, not characterisation tests. The c setting would skip all of them.
- Fix: P3 becomes a vector: one row per dominant lens, each answering 'mechanical check exists: yes, partial or no'. M0 closes every 'no' on the dominant lenses before agent PRs are accepted on the affected paths.

**MAJOR: Hypothesis clause 'PROCESS lenses are identical for every project', and 'Ships once (kit repo)'.**

- Why: This archetype needs process lenses the first project never will: triage, decline, claim, comment period, backport, release notes, contributor communication and embargo handling. A kit distributed as a private or vendor-specific plugin also violates the archetype's access requirement.
- Fix: Make the kit modular, with modules switched on by dial values. The contributor-facing part is public and either vendored or a devDependency. Restate the claim as 'process lenses are identical per profile value, not per project'.

**MAJOR: Hypothesis clause 'DOMAIN lenses exist only in one project'.**

- Why: The library's domain lens covers correct API use, what is deprecated and the migration paths. To every dependant and their agents, that same content is a discipline lens. Dependants' agents keep generating the old API from stale training data, which lengthens effective deprecation windows. The lens is therefore an exported product surface, versioned and staged like code. It takes the form of agent-readable docs shipped with the package, an index file and codemods. Tier is relative to the observer.
- Fix: Give the tier axis an 'exported' flag. A P9c project's domain lens has a published projection. That projection is a release surface under V6 with its own acceptance checks: its examples compile against the released version.

**MINOR: V4: 'Findings are failing tests or commands on correctness and stated requirements'.**

- Why: Findings about documentation clarity or API naming cannot be expressed as failing tests. Findings also go to a human stranger, who must be able to reproduce them without the harness. How they are delivered affects whether that contributor returns.
- Fix: Allow rubric-scored findings for human-judged acceptance ids. The contributor-facing packet is a script-assembled comment whose failing commands reproduce with the repo's own verify script.

**MINOR: V7's 'named human attestation', and P5's value list.**

- Why: An attestation from an unknown person is worth nothing. Environment claims in issues are outside-world facts from unverified sources. P5 has no value for IP exposure: contributor sign-off, provenance of AI-generated code, the licence of copied code, and adding a runtime dependency.
- Fix: Attestation counts only from named people inside the boundary; outsiders' facts need an executable reproduction. Add a P5 value for IP and licence: a sign-off check in CI, a licence scan, and a gated decision record for any new runtime dependency.

**MINOR: The learning loop: `escapes.jsonl`, 'On each model upgrade, drop one component', and payback in owner-minutes per merged slice.**

- Why: Escapes are detected by strangers weeks later and enter the same intake queue as everything else, so triage latency sets the ledger's latency. Single-file ledgers (escapes, expected-fail manifest, questions) collide under hundreds of concurrent PRs. Ablation is only measurable inside the boundary, because outside builders' models are unknown and mixed. Payback per merged slice ignores declined inflow.
- Fix: A regression label opens a fast lane. Ledgers become one file per entry. Ablation is restricted to maintainer-side components. Payback is measured per closed item.

### Missing profile parameters

- Contribution and trust boundary (closed team; inner-source; open with trusted committers; open to strangers and their agents). It sets who may author specs and acceptance checks, where secrets may run, the claim protocol, the sign-off requirement, and whether the harness must be public and tool-neutral.
- Inflow model (plan-driven; mixed; inflow-driven). It sets whether an intake stage and admission gate exist, the queue discipline, the decline policy and a response-time target.
- Decision rights and quorum per path class, with a tie-break, lazy-consensus timeouts, community comment periods, and a two-person rule for protected paths and publish.
- Agent tool heterogeneity (one harness; mixed vendors). It decides whether lenses may live in skills, path rules, definitions or hooks at all.
- Release lines and support windows (single; main plus LTS; many). It sets backport policy and which branch is authoritative for the harness and records.
- Support matrix as the verification surface: compiler versions, runtime versions, module formats, bundlers, peer-dependency ranges, consumer lib settings. P7 only models network APIs.
- Verification maturity per lens, as a vector: API-surface snapshot, type tests, size budget, package-shape lint, doc-example compilation, downstream canary.
- Non-functional budgets (bundle size per entry point, performance, tree-shakeability). Record who may move a budget. P8's rule 'thresholds sourced or measured, never invented' should apply here too.
- Compatibility contract: the project's semver interpretation, deprecation window length, a deferred-obligation ledger, and when a codemod is required.
- Release reversibility, as distinct from blast radius: whether rollback exists at all, release channels, soak exit criteria and the downstream canary set.
- Documentation weight: versioned docs, docs-first specs, and agent-facing docs as a release surface.
- IP and licence provenance under P5: sign-off, AI-generated code policy, dependency licences, and a gate on new runtime dependencies.
- Confidential work track for embargoed security fixes: private artefacts, private CI, coordinated multi-line publish.
- Builder identity (known and same-model, or unknown and mixed). It affects V4 reviewer design and whether ablation results mean anything.

### Lens placement cases

| Expertise | Rule gave | Correct | Comment |
|---|---|---|---|
| Semver judgement for a typed public API. Removing or narrowing anything exported from a public entry point is major. Widening accepted input is minor. Error message text is not API. Dropping a compiler version is minor. | Clause 1 for the mechanical part: API-report diff versus changeset bump type, checked in CI. Clause 3, a decision record, for the project's interpretation. The non-mechanical residue 're-enters at 1'. | no | The mechanical half is placed well. The judgement half is ambiguous. One example is whether a behaviour change breaks something users rely on. That residue fails clause 1, and the procedure does not say where it goes next. A decision record is history, not something loaded at task time. The remaining candidates are clause 6 (too long for two lines) and clause 8 (a skill strangers' agents never load). It belongs in the reviewer's rubric plus the downstream canary, and the procedure has no clause that says so. |
| Bundle-size craft. Named exports only. No top-level side effects. No classes or enums in the core entry. Dev-only warnings behind an environment guard. Pure annotations. A size budget per entry point. | Clause 1 for the budget (size check in CI). Clause 8, a skill, for the cross-module craft. | no | The budget placement is right. The craft placement is wrong for this archetype. A skill reaches only builders inside the maintainers' harness, and most builders are outside it. The craft must be pushed into lint rules where possible. The rest belongs in the size check's failure message and a tool-neutral contributing doc. The threshold itself is a value-laden choice, so it needs clause 3 and a protected budget file. The procedure does not flag this. |
| Deprecation procedure. A deprecated tag with replacement and since-version. Warn once in development, stripped in production. A migration-guide entry. A codemod when the change is mechanical. Removal no earlier than the next major and twelve months. | Clause 3 for the policy. Clause 1 for the tag lint and the warning-stripped test. Clause 8 for the procedure. Clause 9 (spec) for this slice's removal target. | no | The first three placements are fine. The removal target is a deferred obligation with a future trigger, and no clause covers that. Clause 9 puts it in a spec that is closed when the slice lands, so the obligation is lost. It needs a new clause: 'a commitment that comes due later goes to a ledger entry plus a version-keyed failing check'. |
| Documentation lens. Every public symbol has doc comments with an example. Examples compile. Reference is generated. Guides are updated when a concept changes. Docs are versioned per major. There is a voice and style guide. | Clause 1 for example compilation and doc-comment presence. Clause 7, a path-scoped rule on the docs folder, for the craft. | no | The clause 1 half is correct and valuable. A path-scoped rule is a single-vendor mechanism that outside agents never see. Whether an explanation is clear has no mechanical check at all, so V4's finding format cannot carry it. A better placement has three parts: a prose linter for what can be linted, a tool-neutral docs contributing guide, and a human-judged acceptance id with a rubric. Writing the docs page first as the spec removes most of the problem. |
| Consumer-environment facts. A type referencing a DOM global breaks consumers compiling without the DOM lib. A compiler release changed inference for a pattern. An older runtime lacks an API. | Clause 2, a fact about the world outside the repo. It becomes an executable artefact, such as a type test under a no-DOM config in the version matrix, or else an attested line in a protected facts file. | yes | This is the procedure's best fit for the archetype. The executable form is right and it survives contributor turnover. One caveat: the human-only attested facts file does not scale to facts reported by strangers. For outsiders, require an executable reproduction instead of an attestation. |

### Assumptions smuggled in from the first project

- The process spawns every writer. The brief contract, `touches`, lens preload and the builder output schema all presuppose this.
- One tool vendor. Placement clauses 4, 5, 7 and 8 and the load-guarantee row are Claude Code mechanisms. 'All agents are instances of the same model family' is false across the boundary. V4 is tuned for a same-model blind spot, not for an unknown or adversarial author.
- Work is pulled from a roadmap by the owner and nobody pushes work at you, so a WIP limit is assumed to be sufficient flow control.
- The intent owner is one person who can sit in the session: 'present', 'in the room', 'default if silent', 'A human runs the retro', and payback counted in 'owner-minutes'.
- Everyone who can put text or code in front of an agent is trusted. There is no notion of hostile content. The protected list has the app's shape (captured fixtures, fake transport). It omits the package manifest, exports map, build config, API report and size budget.
- Private state is acceptable: 'user-level skills', Linear 'outside the graph', and per-user auto-memory kept outside the repository. That file holds 'agreed next steps' invisible to a co-maintainer or contributor. With more than one human, any lens or plan outside the repo is a private fork of the process.
- Production is a place the owner controls and can look at: a pilot screen at home, promotion, rollback. For a library, production is other people's builds. Escapes are seen first by strangers, and there is no rollback.
- One branch and one live version. Artefacts are 'in the repo', the guard is 'from the base branch', and no release lines exist.
- Release means deploy. V6 and P10 list the surfaces as 'code, schema, access rules, config'. A library's surfaces are registry channels, shipped types, versioned docs, CDN builds, release notes, codemods and agent-facing docs.
- External interfaces means network APIs with a transport to fake (P7). A library's externals are compilers, runtimes, bundlers and peer dependencies.
- Single-file ledgers (`escapes.jsonl`, the expected-fail manifest, `questions.md`, the facts file) are safe only with one writer at a time. They are conflict hotspots under many concurrent PRs.
- A slice ends at merge or release. Nothing carries an obligation tail measured in years.
- The measurement-before-thresholds rule is filed under design weight (P8) because that was the home project's threshold problem. Size and performance budgets need the same rule.
- Openness is never a parameter. The home project never had to make its process public, and never had to keep part of its work private. This archetype needs both at once.

## Fifteen-year-old monolith with almost no tests

### Verdict

The process breaks on this archetype in three places that matter. Elsewhere it holds well enough that the repairs are additive; its topology can stay.

**The walked work item.** Move the late-payment fee calculation out of a 2,400-line stored procedure into application code behind a seam, with no behaviour change, as the first strangler slice. The nightly batch runs that procedure, and so does a 'recalculate' button on the account page. Meanwhile finance needs a fee cap live on 1 January.

**Step by step:**
- **0. Spike.** The one-hour spike becomes weeks. The monolith builds only on one old machine, and no database can be restored for agents. About a third of production procedures differ from what is in source control.
- **1. Profile.** Three dials have no fitting value:
  - P1: tight plus huge, coupled through the database.
  - P9: unknown consumers reading the database.
  - P10: release owned by a change board.
- **2. Walls.** Global M0 'before any feature' never lands, so the team is pinned at width 1 with every diff human-read. Faking the database removes the thing under test, and real data is personal, which collides with V5. Worktrees also fail as isolation, because all agents share one development database.
- **3. Memory.** 'Lenses only from interviews, records and escapes' yields almost nothing, because nobody knows the behaviour.
- **4. Discovery.** Researchers fan out well under T3, but four things go wrong:
  - Their findings have no artefact home and no verification rule.
  - 'Agents never state facts' forbids the work.
  - Dynamic SQL makes static claims unsound.
  - The questions file fills with questions no human can answer.
- **5. Spec.** There is no single intent owner. 'End state: same as today' is undefined, and interfaces are unknown. `touches` is the kernel, and 'acceptance ids with human-supplied values' cannot be filled.
- **6. Characterisation slice.** This inverts V2 (break 1): the expected-fail manifest has nothing to list, and the builder recording golden files defines its own done.
- **7. Build.** The path guard passes while forty untouched callers change behaviour. The reviewer cannot judge equivalence from the diff alone.
- **8. CI.** CI is green and V1 says done. The real proof is a shadow run through month end.
- **9. Shadow run.**
  - It shows 37 accounts off by 0.01 (rounding).
  - It shows 4 off through a race with another job.
  - Each is a value-laden call for a finance expert reached by email.
  - No gate kind exists for it, the packet is unreadable to that expert, and the path from diff to decision takes days.
- **10. Hotfix mid-soak.** A DBA patches the 1 January cap straight into the production procedure. The golden masters go stale, the repo is wrong, and the new code lacks the change. Section 6 says hotfixes are out of scope, so there is no re-entry.
- **11. Cutover.** Once one batch has run on the new code, rollback is data repair.
- **12. Decommission.** A quarter-end report that called the procedure directly breaks six weeks later. The ledger has no 'discovery' hop to blame, and the rule says wait for a second occurrence.

**Judgement.** The core is a delivery process for slices that meet two conditions: a present human can state the intent, and a PR-time check can decide done. This archetype violates both for most of its first year.

**Five repairs** leave T2, T3, T5, V3, V4, V7 and the packet discipline intact:
- **(a) Slice kinds.** Discover, characterise, cut seam, migrate, cut over and decommission, each with its own brief, evidence and gate, backed by a findings ledger.
- **(b) Oracle-source parameter.** Golden masters are captured by a protected job, and slices use an invariant manifest where there is nothing to expect-fail.
- **(c) Evidence horizons.** A slice carries post-merge states, so done can follow merge by a business cycle.
- **(d) Object-level scope.** Scope (`affects`) and lens routing work on database objects, plus a data wall and a drift check between production and the repo.
- **(e) Gates and human roles from the profile.** The profile lists gate kinds, owners and packet forms. Seam stewards and an adjudication queue cover the human-to-human hops that T2 ignores.

**Lens hypothesis.** The three tiers survive as a packaging rule. They need a further axis, knowledge maturity (hypothesis, observed, characterised, adjudicated), because here most domain expertise does not exist at the start. The process itself has to manufacture it.

**Without these repairs,** a team either reads section 6 and concludes the process is not for them, or follows it faithfully and declares a slice done at green merge that turns out wrong at month end.

### What fits unchanged

Profile as instantiated: P1 a, but see breaks (tight AND very large, coupled through the database, not through files). P2 b (four people, yet the people who know what is correct are business users outside the team). P3 a. P4 c (money and records; the batch mutates state every night). P5 b at least, often c (personal and financial data, audit). P6 c. P7 c in effect (undocumented file drops, database links, reports pulled by other departments). P8 b. P9 has no fitting value (consumers are unknown; others read the database directly). P10 a or worse (release windows and database deployment are owned by a change board and DBAs).

What works unchanged:
- T2 (scripts orchestrate, artefacts coordinate, agents never message each other). It is more valuable here because the knowledge must outlive sessions and people.
- T3's permission to fan out reading and research. Discovery over a huge codebase is exactly where cheap parallel readers pay off.
- T5 (humans build the harness).
- V3's protected verifier set and line-level review of it.
- V4's fresh-context reviewer whose findings are failing tests. A differential test that shows old and new disagree is the ideal finding form.
- V7's source plus verbatim quote check. It generalises cleanly to code archaeology claims (path, line, quoted text, re-checked mechanically).
- P7 c's captured versus synthetic fixture distinction, which is the seed of golden-master handling.
- Decision packets with a default if silent, and 'reversible proceeds, irreversible waits'.
- Agent credentials that cannot merge, release or edit agent config.
- The builder schema with no success field. 'Blocked, here is why' is the common honest outcome in code nobody understands.
- The spec-critic batching its questions.
- Placement clause 1 (a check beats prose, delete the prose when the check lands) and clause 3 (decision record with invariant residue).
- Flow-back with the rule of two.
- P4 c's second human on gated lines, which is feasible with four people.
- P6 c's instinct (characterise before changing) is right. Only its scope and ordering are wrong.
- A discipline lens such as 'legacy modernisation' (seams, branch by abstraction, parallel run) places correctly as a skill and is reusable across projects, which supports the tier hypothesis for packaging.

### Breaks

**FATAL: V2 and the brief contract: 'acceptance ids with human-supplied values', 'written at design time from human values', 'listed as expected-fail until the slice lands'**

- Why: No human has the values. The authors are gone and behaviour is the specification, so the only oracle is the running system, bugs included. For a behaviour-preserving slice the checks must be green before and after, so an expected-fail manifest has nothing to list. For a characterisation slice the deliverable IS a test that asserts whatever the code does, the very thing V2's rationale calls a defect. If the builder records or re-records golden files, the builder defines done, which V2 exists to prevent. The central verification rule cannot be instantiated as written.
- Fix: Add a profile parameter 'oracle source' (human-stated, legacy system as oracle, external standard). For legacy-as-oracle, golden masters are recorded by a protected capture job that runs the base commit (or the production build) on a pinned data snapshot. The builder can never write them. This generalises P7 c's captured fixtures, but captured by machine under a human-approved recipe, because human-only capture will not scale to thousands of cases. Each slice declares its manifest kind: expected-fail (new behaviour) or invariant (green on base and on head). Re-baselining requires a decision record. A characterisation slice is judged by a checker-run mutation or branch-coverage score on the target seam plus a determinism rerun, not by its own assertions.

**FATAL: No path for discovery work: the artefact chain (vision, roadmap, records, specs, PR); section 6 'Exploration ... adopt the process only if the code survives'; 'Only humans answer the open-questions file; agents prepare options, never facts'; 'Lenses come only from interviews, record residues and escapes'**

- Why: Most early work here produces knowledge, not code: which callers, which tables, which jobs, which quirks are load-bearing. The spec template demands an end state and interfaces, which are unknown. Findings have no artefact, no verification rule and no owner. The open-questions file deadlocks, because no human can answer 'what does this procedure do at year end'; the answer comes from an experiment or from production telemetry. The rule that agents never produce facts forbids the work agents are best at (broad reading). Unverified findings will leak into specs as if true, which is fabrication by another route. Read literally, section 6 tells this team the process is not for them for the first year.
- Fix: Add work-item kinds to the core: discover, characterise, cut seam, migrate, cut over, decommission. Each has its own brief template, done-evidence and gate. Add a findings ledger: one file per claim, with an evidence pointer (path and line quote, query id, telemetry window), a status (hypothesis, observed, characterised, adjudicated) and a confidence. Generalise V7 from outside-world facts to claims about the system, with a mechanical re-check of the quote or query. Allow a third answer type in the questions file: answered by experiment, with evidence id. Reword the agent rule to 'agents never assert a fact without machine-recheckable evidence'.

**FATAL: V1 'CI is the only authority on done', combined with section 6's exclusion of 'verification possible only in production'**

- Why: PR CI can run a sampled differential test. Done for a strangler slice, though, is a parallel run in production across real business cycles (at least one month end) with zero unexplained differences. The nightly batch runs for hours and depends on the calendar and on the order of other jobs, so it cannot live in PR CI. Under V1 the slice is done at green merge, weeks before it is verified, on a P4 c money system. Section 6 then declares the archetype's main verification technique out of scope.
- Fix: Restate V1 as 'a machine-run evidence job is the only authority; each slice kind declares its evidence horizons (PR, nightly differential, soak over N cycles including a period end)'. Add slice states after merge (dark, shadowing, cut over, decommissioned) in a state file written only by script. A scheduled agent assembles the shadow diff report into a decision packet, still relayed as {runId, conclusion}. Narrow the section 6 exclusion to cases where no machine comparison is possible even in production.

**MAJOR: P3 a and P6 c: M0 'before any feature', 'Until M0 lands: width 1, every diff human-read'; bootstrap spike 'one hour'; P6 c 'module map only after the records'**

- Why: System-wide characterisation of a fifteen-year monolith never finishes, so M0 never lands. Four people then sit at width 1 indefinitely while mandated business changes keep arriving. M0's list (test runner, fakes, CI) presumes the system can already be built and run headlessly. Here the first months go to making it build off one old machine, restoring a database, and controlling the clock for batch runs. The ordering is also circular: you cannot choose what to characterise without a provisional seam map, yet P6 c puts the map after characterisation.
- Fix: Split M0. The global M0 covers only: builds and runs reproducibly, a disposable database, a controllable clock, the running system under version control, a drift check, and an acceptance job. A verification-first stage then sits inside every seam. Width and diff-reading rules relax per seam as that seam's evidence lands, not globally. A cheap provisional discovery map precedes characterisation. The authoritative module map still follows the decision records.

**MAJOR: 'All live in the repo and are approved by merge'; V3 'guard computed from the base branch'; T2 'one source of truth per kind of fact'**

- Why: Stored procedures, triggers, scheduler definitions, report definitions and configuration rows live in the production database and its tools. They were often never in source control, and DBAs hotfix them in place. The repo is not the system, so the guard, CI and review all inspect a copy that may be wrong. The most dangerous code has two sources of truth.
- Fix: First wall in bootstrap: a scripted export of database objects, job schedules and configuration tables into the repo. Add a scheduled drift check (production versus main) that blocks any slice whose scope includes a drifted object. Put the exports and the drift job in the protected set.

**MAJOR: `touches` as a path write scope, the V3 path guard, P1 'Kernel paths (shared types, schema, access rules) stay serial and gated', and P1 a meaning width 1**

- Why: Coupling runs through tables, procedures, triggers and dynamic SQL, not through files. A diff fully inside `touches` that edits one procedure changes the behaviour of dozens of untouched callers, so the guard gives false assurance. The 'kernel' (the schema) is touched by nearly every slice, so everything becomes serial and gated. P1 also conflates coupling with size. Tight at 2,250 lines makes one builder natural. Tight at a million lines with four humans idles three of them, and they will bypass the process.
- Fix: The spec gains `affects`: readers and callers of the touched database objects, computed by script from the dependency catalogue and production telemetry. Acceptance must cover `affects`, and the guard checks objects as well as paths. Replace the global width rule with: two slices may run in parallel only when their touches-plus-affects sets are disjoint. Split P1 into a coupling medium dial and a size and comprehension dial.

**MAJOR: V5 'fake externals and no production secrets. The fake-by-default transport is the wall', plus reliance on git worktree isolation**

- Why: Half the program is in the database, so faking the database removes the thing under test. Characterisation needs production-shaped data, which is personal and financial (P5) and may not be allowed into a model vendor's context at all. Worktrees isolate files, not a shared development database. Two agents altering procedures in the same instance collide exactly as on a shared file, but invisibly.
- Fix: Add a data wall beside the transport wall: a masked snapshot produced by a protected job, and a disposable database per run (container or snapshot clone). Where that is too expensive, the database instance becomes a leased resource that the workflow script serialises. Add a profile dial for data sensitivity and what agents may read.

**MAJOR: 'There are always two gate kinds: design approval ... and release'; T1 'with the intent owner present'; 'approved by merge'; decision packets that 'link every changed file'**

- Why: There are at least five decision points with different owners: design (tech lead); behaviour adjudication (is this observed difference a bug or a rule), owned by a business expert outside the team and outside GitHub; release to shadow (the team); cutover (business sign-off, change board, DBA executes); and decommission (irreversible). A shadow run throws up dozens of small discrepancies, each value-laden, so under the core each one waits for a human. The packet format (changed files, CI evidence) is unreadable to a finance clerk, who also cannot approve by merge. There is no single intent owner: one person owns the change, another owns correctness, and nobody knows current behaviour.
- Fix: Make the gate list a profile output, not a constant. Each gate names a role, a channel, a packet form and a default if silent. Add an adjudication queue: batched, in business language (account, old value, new value, suspected cause), with default 'preserve legacy behaviour'. A team member records each answer as an attested fact with a quote (V7) and promotes it to a decision record.

**MAJOR: T1 'A model rewrites intent once, into a spec'**

- Why: For a behaviour-preserving slice the intent is 'same as today', and what 'today' means is learned during the work. The spec is necessarily revised as findings arrive, by different people over weeks. That reintroduces the repeated lossy rewriting T1 forbids.
- Fix: Keep the single rewrite for the change intent. The behavioural part of the spec becomes references to ledger findings and golden-master ids rather than prose, so it grows by appending pointers and is never re-summarised. Freeze it at the end of characterisation with a second design gate.

**MAJOR: T4 'never phases or disciplines' and 'a slice too big for one context becomes two'**

- Why: Per seam the work is legitimately staged: discover, characterise, cut seam, migrate, shadow, cut over, decommission. Each stage needs evidence from the previous one, so they cannot collapse into one vertical slice. A 2,400-line procedure with forty callers exceeds one context but cannot be split before it is understood. The slicing rule assumes you can cut before you comprehend.
- Fix: Amend T4: cut by seam, never by discipline. Within a seam, stages are sequential work items whose handoff is a checked artefact (findings, golden masters, shadow report), never a summary. Add a script-driven reading pattern for oversized units: chunk readers each append findings to the ledger, and the synthesiser reads findings, not code.

**MAJOR: Section 6 'Incidents and hotfixes ... use a runbook, then log the escape', and the absence of any rule for two live implementations**

- Why: A production line-of-business system with four maintainers gets hotfixes and mandated changes weekly, often patched straight into the database. During the months a seam spends in shadow, every such change invalidates golden masters. It must also be applied to both old and new paths, or the new one silently diverges. Parking this outside the process means the process's baselines rot continuously.
- Fix: Add a coexistence rule. While a seam is between 'cut' and 'decommissioned', the legacy path is a gated path, and any change to it carries either a twin change or a recorded freeze. The hotfix runbook ends with a mandatory re-entry slice: export the production object, rerun the capture job, adjudicate the differences.

**MAJOR: Lens load guarantee: 'path rules on file contact; the brief CLI intersects `touches` with rule `paths:`'**

- Why: The knowledge that matters is keyed to database objects and business concepts, not to paths. 'Orders has an audit trigger and three replication views' applies to any of two hundred files containing SQL that mentions Orders. No glob expresses that, so the lens does not load where it is needed. Routing by path assumes knowledge is localised by file, which is true of a small, well-factored app.
- Fix: Lens front matter gains `objects:` (tables, procedures, jobs, concepts). The brief CLI resolves lenses against touches and affects at object level, using the dependency catalogue.

**MAJOR: Placement procedure: 'first match wins' with clause 1 first; clause 2 limited to facts 'outside the repo'; clause 4 'Sequencing that must be identical every run'**

- Why: When behaviour is the spec, whether an observed quirk 'must never break' is itself the open question. Clause 1 firing first turns every observed behaviour, bugs included, into a protected invariant without adjudication. Observed-but-unadjudicated behaviour has no clause at all: it is not outside the repo, not yet a choice, and not craft. It will fall through to a path rule and become authoritative prose. Clause 4's wording also matches product batch ordering, so an agent will file job-order knowledge as a workflow script.
- Fix: Add a clause 0: 'An observation about current behaviour that is not yet adjudicated? Findings ledger, labelled hypothesis, never loaded as a rule.' Reword clause 4 to 'sequencing of the agent process itself'. Reword clause 2 to 'a fact not derivable from the repo at head', accepting telemetry evidence over an observation window as well as human attestation.

**MAJOR: V6 surface list '(code, schema, access rules, config)', P10's values, and expand/contract migrations appearing only under P9 c**

- Why: Surfaces here include data backfills, stored procedures, job schedules, report definitions and interface files. Most cannot be staged, because there is one production database. Release is owned by a change board and DBAs with fixed windows, so 'decoupling is the first roadmap item' is not in the team's gift. Expand/contract is needed because old and new code coexist, not because there are many API consumers. After a batch has run on new logic, rollback is data repair, not redeploy, so P4 b's 'quick rollback' category quietly assumes stateless releases.
- Fix: Surfaces become a profile list, each with a staged or unstaged flag. P10 gains a value for externally controlled release (window cadence, lead time), which sets batch size and WIP. Tie expand/contract and a data-repair runbook to a coexistence dial instead of P9.

**MAJOR: P2 b 'CODEOWNERS routes gated paths and questions', and T2 regulating only agent-to-agent communication**

- Why: Nobody owns or understands paths in this codebase, so path ownership is fiction. With four humans the lossy hops are between people. One ran the discovery session, another approves the spec, a third reviews the PR, a fourth talks to the change board, and the business expert is reached by email. The longest path runs from shadow diff to triage agent, team member, business expert, decision record, spec amendment and builder. Most of it lies outside the artefact graph, and by Conway's law it sets the pace. The core has no rule about human-to-human handoffs at all.
- Fix: Ownership by seam, not path. One named seam steward stays with a seam from discovery to decommission and is the present owner at every gate for it. This restores T1's single-owner premise per seam. The seam record names the business expert, the channel and the expected response time. Measure hours awaiting the expert, not only hours awaiting the reviewer.

**MAJOR: P9 values (internal, versioned public, many downstream)**

- Why: Consumers are unknown. Other departments read tables directly, reports call procedures, and file drops feed systems nobody on the team has heard of. The profile interview would pick P9 a ('no API-diff check'). The decommission step would then break a quarter-end report six weeks later.
- Fix: Add a value 'unknown or implicit consumers (shared database, files, reports)'. It requires consumer discovery from production telemetry over a full business cycle before any contract step. It also requires a tombstone stage (object renamed or access-logged, with quick restore) before deletion.

**MINOR: Learning loop 'First occurrence: fix it. Second: a check', and the ledger field 'the hop it slipped through'**

- Why: On a money system an escape may be a wrong posting noticed by a clerk at quarter end, six weeks and twenty slices later. Waiting for a second occurrence is not acceptable at P4 c. Attribution to one slice is hard. The usual culprit hop (discovery missed a consumer, or adjudication guessed wrong) is not in the hop list.
- Fix: Make the promotion threshold a function of P4 (first occurrence at c). Add scheduled reconciliation reports as escape detectors. Add 'discovery' and 'adjudication' hops, plus detection lag, to the ledger line.

**MINOR: WIP 'about 2 per reviewer' and the payback unit 'human-minutes per merged slice'**

- Why: Slices in shadow stay open for weeks waiting for a month end. Counting them stalls the team; not counting them hides open risk. 'Merged slice' is the wrong unit when the early output is knowledge and coverage, not merges.
- Fix: Set WIP limits per state (in build, in soak, awaiting adjudication). Express payback in seams retired, behaviours characterised, unexplained shadow differences, and human-minutes per adjudication.

**MINOR: V4 reviewer input 'spec, diff and evidence only'**

- Why: Equivalence to a legacy procedure cannot be judged from the diff of the new code. The reviewer needs the legacy unit, and a report showing which of its branches the golden masters exercise.
- Fix: Define the reviewer input set per slice kind. For seam and migrate slices, add the legacy unit and the golden-master coverage report. Still never include the builder's narrative.

**MINOR: 'On each model upgrade, drop one component for a few slices', and roadmap 'milestones with exit criteria' stated up front**

- Why: Slices take weeks, so ablation never gathers enough data points. Dropping a component on a cutover slice at P4 c is an experiment on production money. Exit criteria for later milestones are unknowable before discovery, so the roadmap is either fictional or blocks.
- Fix: Run ablations only on discover and characterise kinds. Use a rolling-wave roadmap whose near milestones are knowledge milestones (seam understood: findings adjudicated, mutation score reached) and whose far milestones are named but unspecified.

### Missing profile parameters

- Oracle source: where acceptance values come from (human-stated, legacy system as oracle, external standard). Decides whether V2 uses an expected-fail or an invariant manifest, and who may record golden masters.
- Comprehension state: how much of current behaviour any available human understands (most, some, none). Sets the size of the discovery stage and whether a findings ledger is mandatory.
- Size relative to context and team, split out of P1: total lines, largest single unit, count of database objects. Tight-and-small and tight-and-huge need opposite width rules.
- Coupling medium: imports and files, versus shared database state, versus runtime indirection (dynamic SQL, reflection, the scheduler). Decides whether a path-based `touches` means anything.
- Migration strategy and coexistence: in-place refactor, branch by abstraction, or strangler with parallel run; how long two implementations live; dual-apply or freeze policy.
- Environment reproducibility: can an agent build, run and test the system headlessly; cost of a disposable database; clock control for batch.
- Data sensitivity and agent data access: what production data agents and the model vendor may see; masking requirements.
- System-of-record coverage: how much of the running system is under version control (procedures, jobs, reports, configuration rows), and the drift rate between production and repo.
- Production observability: availability and retention of procedure call counts, page hits and query logs, needed to evidence dead-code and consumer claims.
- Business cycle and verification horizon: nightly, month end, quarter, year end. Sets soak length and when a slice can be called done.
- Release authority and cadence external to the team: change board, DBA-executed deployments, fixed windows, lead times.
- Concurrent change stream: rate of hotfixes and mandated business changes to the same code, and interrupt load on the humans.
- Stakeholders outside the repo: business experts, DBAs, operations. For each: channel, response time, and how their approval or attestation gets recorded.
- Consumer knowledge: a P9 value for unknown or implicit consumers.
- Toolchain reach: how well the model knows the legacy language and platform, Windows-only or IDE-bound builds, on-premises source control, and company policy on cloud agents and hosted CI.
- Gate list as a profile output (kinds, owners, packet form, default if silent) rather than the constant 'two gate kinds'.
- Escape detection lag and detection means (reconciliation reports, user complaints). Sets the learning loop's promotion threshold.

### Lens placement cases

| Expertise | Rule gave | Correct | Comment |
|---|---|---|---|
| Batch job ordering: 'the late-fee job must run after the ledger close job, because it assumes the postings table has been rolled' | Ambiguous. Clause 1 (must never break, machine-checkable) applies only if the schedule is in the repo, and it is not. Clause 2 (a fact outside the repo) fits awkwardly, because the scheduler is part of the system. Clause 4 ('sequencing that must be identical every run ... workflow script') matches textually, so it would put product knowledge into an agent orchestration script. | no | The right home is: export the scheduler definitions into the repo, then a check asserting the dependency order. Until then, an attested fact whose source is the scheduler export. The rule gets there only if clause 4 is reworded to cover the agent process only, and only if 'bring it into the repo first' is an available move. |
| Load-bearing quirk: 'the procedure uses banker's rounding but the page truncates; customer statements depend on the mismatch' | Clause 1 fires first: a characterisation test, authoritative, with one memory line saying why. | no | The mechanism is right and the order is wrong. Whether this must never break is the undecided question. First-match-wins freezes a possible bug as an invariant before the business has adjudicated it. The rule needs a prior clause for unadjudicated observations (ledger, hypothesis status). The choice (clause 3) should precede the check. The test should start as 'pinned, pending adjudication' rather than as a requirement. |
| Tribal business rule from a long-tenured finance user: 'branch 17 accounts are exempt from fees because of a 2014 settlement' | Clause 2: an attested line in the protected facts file with a named human. The residue is a never-violate check (clause 1). The decision to preserve is a record (clause 3). | yes | It works, with two caveats. The attester is outside the repo, so attestation happens by proxy: a team member records the quoted email. When the code disagrees with the human (the code exempts branches 17 and 71), the rule has no conflict procedure between an attested fact and observed behaviour. That needs the adjudication queue. |
| Hidden database coupling: 'the Orders table has an audit trigger and three replication views; never add a column without updating them' | It splits into clause 1 (a schema lint for the never-add-without-updating part) and clause 7 (craft about one module: a path-scoped rule, loaded on file contact). | no | The kinds are right, but the load guarantee fails. The knowledge is keyed to a table that is referenced from hundreds of files via inline SQL. No `paths:` glob captures 'any file whose SQL touches Orders', so the brief CLI's intersection of touches and paths misses it. Lenses need object-level keys and an `affects` computation. |
| Discovery finding by an agent: 'procedure usp_X is dead, it has no callers' | It is not machine-checkable statically (dynamic SQL), so clause 1 fails. Clause 2 applies: production execution is a fact outside the repo, so 'an attested line ... If unknown, an open question', and only humans answer questions. | no | No human can attest this. Only production call statistics over a full business cycle can. The rule deadlocks in the open-questions file, or worse, a human rubber-stamps it. It needs evidence-backed findings with an observation window and a tombstone stage. That is the clause 2 rewording plus the findings ledger. |

### Assumptions smuggled in from the first project

- The repo contains the whole system. 'All live in the repo and are approved by merge' assumes code, schema and config are files in git. Here procedures, schedules, reports and config rows live in production.
- File paths approximate blast radius. `touches`, the V3 guard, 'file-disjoint slices', kernel path lists and path-scoped lens loading all assume coupling is visible in the file tree, and that the kernel is a short enumerable list (a few shared type, reference and access-rule files).
- The intent owner is one person in the room who knows the right values. This shows up as 'with the intent owner present', 'human-supplied values', 'spec gate in the room' and 'the owner's eye at promotion'. With behaviour as spec, nobody knows the values, and the person who can judge correctness is not an engineer and not in GitHub.
- State is small and fakeable. 'Fake externals' plus synthetic fixtures are taken to be enough to exercise the program. That is true of a display app over an API, and false when the database is half the program and the data is the test.
- CI can build and run everything in minutes on a hosted runner, so 'CI is the only authority on done' and done coincides with merge. A four-hour, calendar-dependent batch and a Windows-only legacy build break that.
- A slice lives for days and ends at a PR. The WIP limit, payback in minutes per merged slice, the three-slice pilot and ablation 'for a few slices' all assume this. Strangler slices live for months and pass through post-merge states.
- Bootstrap is small: a one-hour spike and an M0 that finishes before features. That is plausible for 2,250 lines, never for a fifteen-year monolith with ongoing business change.
- Two gates suffice because the same person is product owner, engineer, reviewer and operator. There is no change board, DBA, business sign-off or separate cutover and decommission decision.
- Rollback means redeploying the previous build ('quick rollback'). That is stateless front-end thinking; after a batch run, rollback is data repair.
- Open questions are answerable by a human asking the outside world (a question put to an outside body). Here the unknowns are inside the system and are answered only by experiment or telemetry.
- Exploration and hotfixes can be parked outside the process (section 6) because a two-hour-a-week side project can afford that. For this archetype they are most of the work and a weekly occurrence.
- Escapes are noticed quickly by the owner's own eyes (pilot screen at home) and traced to the last merge. Here they surface weeks later through a clerk and cannot be attributed.
- The tracker is 'outside the graph' and holds status only. In an enterprise, the ticket is the audit trail from business request to change. That is tolerable via quoted links, but traceability is then P5 c work, not optional.
- The stated tool environment (GitHub PRs, hosted CI, cloud agents, plugins) is assumed to be reachable and permitted. Legacy shops may have on-premises source control and licensed database engines. They may have policies against sending source or data to a model vendor. The model also knows the old stack less well.
- Domain lenses are assumed to pre-exist in a head and be extracted by interview. Here most domain knowledge does not exist yet and is manufactured by the process, so lenses need a maturity status, not just a tier.
- The roadmap can state exit criteria up front because the owner already understands the product. Here the early milestones are about knowing, not shipping.
