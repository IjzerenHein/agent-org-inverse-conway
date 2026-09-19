# Agent organisation design

## 1. Concepts

**Conway's law / inverse Conway.** *Claim:* a system mirrors the communication structure of its builders, so design the organisation for the architecture you want. *Holds:* more strongly: with no corridor talk, the only channels are those you build, and every handoff becomes an interface. *Breaks:* organisations stop being sticky; topology is redrawn per task for free. *Principle:* choose module boundaries first, then cut agent work along them: one context, one module, one worktree.

**Brooks's law.** *Claim:* adding people adds ramp-up and n(n-1)/2 paths, so late projects get later. *Holds:* ramp-up is worse: every agent always starts from zero; sequential work still does not parallelise; parallel agents collide on shared files. *Breaks:* spawning is free and agents need no peer channels. *Principle:* zero agent-to-agent conversation; parallelise only partitionable work; pay ramp-up once, as a reusable written brief.

**Parnas.** *Claim:* decompose by the decisions likely to change and hide each behind an interface, not by processing step. *Holds:* fully, with a second reason: a module plus its contract must fit one context window. *Breaks:* humans learn informally what sits behind an interface; agents never do, so contracts must be complete and machine-checked. A plan-design-build-test pipeline is itself decomposition by processing step. *Principle:* contracts are types, schemas and contract tests. Archetype: a third-party API client behind an interface with recorded fixtures, so no agent needs the live API.

**Team Topologies.** *Claim:* four team types, three interaction modes, bounded cognitive load, stream-aligned by default. *Holds:* cognitive load is literally the context window; end-to-end ownership of a slice minimises handoffs. *Breaks:* nobody learns, so an enabling team that coaches is meaningless; collaboration mode costs two contexts and a lossy exchange. *Principle:* a stream-aligned agent per vertical slice; platform = the harness (CI, hooks, fixtures, workflow scripts); enabling = skills loaded at spawn; complicated subsystem = a hard protocol module with its own skill.

**Mission command.** *Claim:* give purpose, end state and constraints; leave the how to the subordinate. *Holds:* agents substitute an easier goal exactly when they know the task but not the why. *Breaks:* it presumes trust from shared training and judgement on when to deviate; agents deviate silently. *Principle:* every brief carries intent, end state, constraints, non-goals and required evidence, quoted from the source rather than re-summarised, plus a backbrief (the agent restates its plan) before expensive work.

**Jidoka / andon.** *Claim:* build quality in at each station; anyone may stop the line; fix the root cause. *Holds:* defect cost grows with distance travelled; mechanical checks do not decay. *Breaks:* andon relies on the worker's willingness to pull the cord; agents are biased to report success. *Principle:* machines pull the cord (hooks, CI, schemas); "blocked, here is why" is a legitimate result; every escaped defect becomes a new check, not a better-worded prompt.

**Theory of constraints.** *Claim:* one constraint governs throughput; exploit it and subordinate everything else. *Holds:* fully. *Breaks:* the constraint never moves: it is the owner's attention. Agent capacity is unbounded, so agent efficiency is irrelevant, and unreviewed PRs are inventory that rots. *Principle:* release work at the rate the owner can review; spend agent effort freely to make each item reaching the owner small, pre-verified and decision-shaped.

**Stigmergy / blackboard.** *Claim:* coordinate by modifying a shared environment instead of messaging. *Holds:* ideally: artefacts are the only memory surviving a session. *Breaks:* ants tolerate noise through redundancy; an agent trusts a stale artefact completely, and concurrent writers collide. *Principle:* one source of truth per kind of fact (intent and decisions in the repo, status in the tracker, behaviour in code and tests), one writer at a time; agents read the source, never a summary.

**Separation of duties.** *Claim:* whoever executes must not be the one who checks. *Holds:* an author's self-report is unreliable. *Breaks:* a second instance of the same model is not independent; errors correlate. *Principle:* manufacture independence through different information (the reviewer sees spec and diff, never the author's narrative), a different objective (find the failure), a different mechanism (executed tests, types, screenshots), and the human for the residue.

## 2. Direct answers

**A. Communication paths.** A path is the route intent travels from the owner's head to the tokens that change the product, plus the route evidence travels back. Length = hops x loss per hop + waiting. One human round trip (hours) outweighs any number of agent hops (minutes). Measure per task: intent rewrites before the implementer; time waiting for the owner; questions reaching the owner; rework from misread intent. Shorten by passing references instead of summaries, removing manager agents, putting schemas on the remaining hops, batching decisions at design time, and using "proceed unless vetoed" for reversible choices.

**B. Topology to architecture.**
- *Deep hierarchy:* layered code with pass-through wrappers, one abstraction per management level, intent diluted.
- *Hub-and-spoke LLM orchestrator:* a god module with thin satellites; consistent, but the hub's context caps system size.
- *Flat pool over shared artefacts:* architecture mirrors the artefact structure: modular if the contracts are, otherwise duplicated helpers and drifting conventions.
- *Specialists by discipline:* horizontal layers; every feature crosses every seam, and bugs live in the seams.
- *Stream-aligned per slice:* vertical feature slices over a thin shared kernel; the risk is divergence unless a platform enforces conventions.

Target: stream-aligned agents on a platform, coordinating through artefacts, orchestrated by a deterministic script.

**C. Where expertise lives.**
- *People:* model plus agent definition. Least leverage: same model everywhere, personas add little.
- *Handbook:* CLAUDE.md. Always loaded, so short and universal.
- *Checklists, SOPs:* skills. Reusable craft: how we do X here.
- *Templates:* brief, spec and ADR templates; output schemas. The shape of a good handoff.
- *The design:* specs, ADRs, types, contracts. Decisions for this task.
- *Tooling:* hooks, CI, lint, tests, fixtures. Expertise that cannot be ignored.

Placement rule, in order: what can be checked mechanically is tooling; craft that stays true across tasks (database access rules, etiquette towards a rate-limited third-party API, legibility of a display at five metres) is a skill; a decision true only for this task is design output. A skill says how to look; a brief says what was decided; never mix them. Agent definitions hold no expertise: they bind the right skills, tools and output schema to a role. The brief names its skills; the workflow script enforces loading.

**D. The human.** The owner sets intent, decides what is irreversible or value-laden, samples quality, and improves the system. The owner does not relay messages, answer clarifications serially, or read every diff line. Gate at two points only: design approval, where change is cheap, and production deploy, which the owner verifies in person. Everything reaching the owner is a decision packet: options, recommendation, evidence, default if silent. Classify by reversibility: reversible choices proceed and are logged; data model, security rules, auth, money, contact with customers or outside bodies, and anything touching a live third-party API wait for the owner.

## 3. Ten design principles

1. **Cut agent work along the module boundaries you want, not along phases or disciplines.** Conway binds agents harder than humans, and phase pipelines create the seams Parnas warned against.
2. **Agents never talk to each other; they read and write artefacts.** Artefacts are the only memory surviving a session, and the n-squared paths vanish.
3. **Pass intent by reference, never by summary.** Each rewrite is a lossy hop, so the implementer reads the owner's own words and the approved spec.
4. **Orchestrate with deterministic scripts, not manager agents.** A script adds no loss, drift or context ceiling; an LLM hub adds all three.
5. **One stream-aligned agent carries a slice from spec to PR in its own worktree.** Fewest handoffs, bounded context, no file collisions.
6. **Every brief states intent, end state, constraints, non-goals and the evidence that proves done.** Intent prevents easier-goal substitution; evidence prevents unverified success claims.
7. **Place expertise at the most mechanical level that can hold it: tooling, then skill, then brief.** Prose decays and may never load; checks do neither.
8. **Agent definitions bind skills, tools and schemas; they hold no knowledge.** That turns skill loading from a hope into a guarantee.
9. **Manufacture reviewer independence through different information, objective and mechanism.** Same-model reviewers share blind spots, so a second opinion alone proves little.
10. **Subordinate everything to the owner's attention: two gates, decision packets, a WIP limit, and every defect the owner finds becomes a permanent check.** The owner is the fixed constraint, so only work on the system compounds.
