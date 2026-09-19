# Practitioner evidence: multi-agent orchestration with LLM coding agents

**Method.** All sources fetched live on 2026-09-19; none reconstructed from memory. Quotes pass through WebFetch's extraction model, so treat them as near-verbatim. [P]: abstract only. The old Anthropic Claude Code best-practices URL redirects to [D1].

**Sources.**
[A1] https://www.anthropic.com/engineering/multi-agent-research-system
[A2] https://www.anthropic.com/engineering/building-effective-agents
[A3] https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
[A4] https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
[A5] https://www.anthropic.com/engineering/harness-design-long-running-apps
[A6] https://www.anthropic.com/engineering/building-c-compiler
[A7] https://claude.com/blog/building-multi-agent-systems-when-and-how-to-use-them
[A8] https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
[A9] https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices
[D1] https://code.claude.com/docs/en/best-practices
[D2] https://code.claude.com/docs/en/features-overview
[D3] https://code.claude.com/docs/en/sub-agents
[C1] https://cognition.com/blog/dont-build-multi-agents (June 2025)
[C2] https://cognition.com/blog/multi-agents-working (April 2026)
[M] https://arxiv.org/abs/2503.13657 (MAST)
[G] https://arxiv.org/abs/2512.08296
[Cu] https://cursor.com/blog/scaling-agents
[V] https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals
[F] https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
[SK] https://github.com/github/spec-kit/blob/main/spec-driven.md
[K] https://kiro.dev/docs/specs/
[H] https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/ace-fca.md
[W] https://simonwillison.net/2025/Oct/5/parallel-coding-agents/
[P] https://arxiv.org/abs/2404.13076

## 1. Topologies and task fit (measured)
- Orchestrator-worker beat a single agent by 90.2% on Anthropic's internal research eval, for "breadth-first queries". The same post excludes domains where "all agents share the same context or involve many dependencies" and notes "most coding tasks involve fewer truly parallelizable tasks than research" [A1].
- Controlled study, 260 configurations: centralized multi-agent +80.9% on decomposable tasks; every multi-agent variant -39% to -70% on sequential planning; negative returns once the single-agent baseline exceeds 45%; tool-heavy tasks suffer most [G].
- Error amplification versus a single agent: independent peers 17.2x, decentralized 7.8x, hybrid 5.1x, centralized 4.4x [G]. A validating hub beats peers.
- Cursor: flat peers with locks collapsed ("twenty agents" gave "the effective throughput of two or three"); without hierarchy agents "avoided difficult tasks". Planners, workers and a judge worked; an integrator role "created more bottlenecks than it solved" and was removed [Cu].
- Carlini's compiler: 16 peer agents, lock files plus git, 2,000 sessions, $20,000, 100k lines. It worked while tasks were independent; on one monolithic task every agent fixed the same bug and overwrote the others, until a GCC oracle split the work per file [A6].
- Opinion, shared across vendors: split by context boundary, not role. A feature/test/review chain is a "telephone game" [A7]; subagents are for "context control", not role-play [H].

## 2. Costs
- Agents use about 4x chat tokens, multi-agent about 15x [A1]; 3 to 10x versus a single agent on equivalent tasks [A7]; overhead 58% (independent) to 515% (hybrid) [G].
- Planner/generator/evaluator harness: $200 and 6 hours versus $9 and 20 minutes solo; only the harness output worked [A5].
- Multi-agent loses on sequential or coupled work, on tasks one agent already does well, on tool-heavy tasks [G][A1], and on small fixes pushed through heavy spec process [F]. "Add complexity only when it demonstrably improves outcomes" [A2].

## 3. Failure modes and countermeasures that worked
- MAST (1,600+ traces, 7 frameworks): specification issues 41.8%, inter-agent misalignment 36.9%, verification 21.3%. Largest modes: step repetition 17.1%, reasoning-action mismatch 14.0%, not asking for clarification 11.7%. On ChatDev, better role specification gave +9.4%, multi-level verification +15.6%. Failures "came from system design", not only model limits [M]. *[Editor's note, added at publication: "1,600+ traces" is from version 3 of the paper and the percentages are from version 2. Version 3 gives 44.2%, 32.3% and 23.5%, and names the first category "system design issues".]*
- One-shotting and premature "done": a JSON feature list with `passes` flags (JSON gets rewritten less than Markdown), a progress file, git, and a session-start ritual ending in an end-to-end smoke test [A4].
- Self-grading leniency ("confidently praising the work"): a separate, sceptically tuned evaluator with Playwright, few-shot calibration, and a sprint contract agreed before coding [A5].
- Verifier "early victory" after minimal testing: mandate the full suite [A7]. Reviewers asked for gaps always find some, causing over-engineering: restrict findings to correctness and stated requirements [D1].
- Prompted rules fail "under pressure, in a long session"; hooks enforce [D2]. A bloated CLAUDE.md gets ignored [D1].
- "The task verifier [must be] nearly perfect, otherwise Claude will solve the wrong problem" [A6].
- Drift: "periodic fresh starts" [Cu]; resets with a handoff artefact beat compaction [A5].

## 4. Handoffs, intent and briefs
- A brief needs "an objective, an output format, guidance on the tools and sources to use, and clear task boundaries"; vague briefs produced duplicated work [A1].
- Subagents should write persistent artefacts rather than relay through the lead [A1]; returns are 1,000 to 2,000 token distillates [A3].
- A Claude Code subagent gets CLAUDE.md, git status, preloaded skills and the delegation prompt, never the conversation [D3]. Intent that is not in a file or the brief is lost.
- Specs should be self-contained: files and interfaces, out-of-scope, an end-to-end verification step; execute in a fresh session [D1].
- A bad plan line becomes "hundreds of bad lines" of code, so review research and plans [H]. Human review is the bottleneck; code from your own spec is "a lot less effort to review" [W].
- Unsolved: a child cannot "surface a discovery that should change its siblings' work" [C2].

## 5. Verification and review
- Cognition's reviewer finds about 2 bugs per PR, 58% severe, and works best when coder and reviewer "do not share any context" [C2]; Claude Code docs agree: diff and criteria only [D1].
- Evals: start with about 20 real cases and one rubric-prompt judge; human testers still caught what automation missed [A1].
- LLM judges favour their own generations [P], which argues for mechanical checks and human sampling beside same-model review. "If you can't verify it, don't ship it" [D1].

## 6. The expert lens
- Skills load only when the model matches the description [A8][D2]. Vercel's eval: the skill was never invoked in 56% of cases; pass rate 53% (equal to baseline), 79% with explicit instructions, 100% with an 8KB always-on AGENTS.md index [V].
- A subagent's `skills:` field injects full skill content at launch, removing that decision point [D3]. Write skills evals-first [A9].
- Spec tools: spec-kit (constitution, `[NEEDS CLARIFICATION]` markers, checklists) [SK]; Kiro (requirements, design, tasks) [K]. Hands-on critique (opinion): one process for every task size, Markdown review burden, agents still ignore instructions [F].

## 7. Disagreements and what reconciles them
- Anthropic [A1] versus Cognition [C1]: [A1] excludes coupled coding; [C2] accepts multi-agent "when writes stay single-threaded and the additional agents contribute intelligence rather than actions". Both: parallelise reading and reasoning, serialise writes and decisions. [C1]'s claim that Claude Code never parallelises is outdated [D1].
- "Share full traces" [C1] versus clean-context reviewers [C2][D1]: builders need full intent; checkers need independence.
- No role splits [A7] versus planner/generator/evaluator [A5][Cu]: a role earns its place only when it buys independence (evaluation) or context isolation.
- Spec-driven advocates [SK] versus [F]: scale process to task size; "If you could describe the diff in one sentence, skip the plan" [D1].

## Design implications for a solo owner
1. One writer per work item. Parallelise only reading, research, review, and file-disjoint tasks in worktrees [G][C2][A6].
2. Hub and spoke, at most two hops from intent to implementer; every worker reads the original intent document, never a summary of a summary [A1][A7].
3. Agents communicate through durable artefacts (repo files, tracker issues), with progress in structured pass/fail state [A1][A4].
4. Split by module or file ownership, not role chains. The one role worth separating is the evaluator [A7][A5].
5. Fixed brief template: objective and why, output format, boundaries, files and interfaces, allowed sources, verification command, escalation condition [A1][D1][M].
6. Spend the owner's hours on vision, specs, plans and sampled evidence, not line-by-line code [H][W].
7. Build verification before features: tests, a committed render check, CI, Stop hooks. Verifier quality caps output quality [A6][D1].
8. Review in a fresh context with spec plus diff only, correctness-only findings, a full-suite mandate; add mechanical checks and human sampling against correlated errors [C2][D1][P].
9. Lens placement: always-true facts in CLAUDE.md; must-never-fail rules in hooks and CI; reusable domain expertise (a third-party protocol, database access rules, display legibility) in skills preloaded via `skills:` or named in the brief, never left to auto-trigger, each written from an observed failure with evals; task-specific decisions in the spec or decision record [D2][D3][V][A9].
10. Scale process to task size and treat the harness as provisional: its components encode assumptions about model weakness that go stale, so re-test on each model upgrade [F][D1][A5].
