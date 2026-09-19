# Context-carrying mechanisms in Claude Code: facts and sources

### 1. Skills: File Format, Discovery, and Reliability

**File format & frontmatter**: SKILL.md files contain YAML frontmatter with: `description` (required; drives auto-invocation), `disable-model-invocation` (boolean; prevents Claude from invoking), `user-invocable` (boolean; prevents user invocation), `allowed-tools` (pre-approves tools), `arguments` (for substitution), `context: fork` (runs in isolated subagent), `agent` (subagent type), `background` (boolean). https://code.claude.com/docs/en/skills.md

**Locations**: Project (`.claude/skills/<name>/SKILL.md`), User (`~/.claude/skills/<name>/SKILL.md`), Nested (`<subdir>/.claude/skills/<name>/SKILL.md`), Plugin, Enterprise managed. https://code.claude.com/docs/en/skills.md

**Discovery & loading**: Skills load on-demand—Claude sees the `description` in context always, but the skill body enters the context window only when invoked or when Claude deems it relevant. The body costs almost nothing while idle. https://code.claude.com/docs/en/skills.md

**Token cost idle**: Near-zero; only the description frontmatter field is in context by default. https://code.claude.com/docs/en/skills.md

**Triggering reliability**: Claude auto-invokes based on description relevance. To make triggering dependable, (1) name the skill explicitly in the prompt (e.g., `/skill-name`), or (2) set `disable-model-invocation: true` and let only you invoke it. Auto-invocation is probabilistic; explicit mention bypasses that. https://code.claude.com/docs/en/skills.md

**Bundled files**: Skills can include supporting files (reference.md, examples.md, scripts/) and reference them in SKILL.md with markdown links. https://code.claude.com/docs/en/skills.md

### 2. Subagent Definitions (.claude/agents/*.md)

**Frontmatter fields**: `name`, `description`, `tools` (allowlist), `disallowedTools` (denylist), `model`, `permissionMode`, `skills` (preload list), `memory` (user|project|local), `mcpServers`, `hooks`, `maxTurns`, `isolation` (set to `worktree` for isolated git), `omitClaudeMd: true` (to skip project CLAUDE.md), `background` (run unattended). https://code.claude.com/docs/en/sub-agents.md

**Starting context**: Subagents receive the markdown body as their system prompt, project CLAUDE.md (unless `omitClaudeMd: true`), git status snapshot, preloaded skills, and agent roster (for SendMessage). They do NOT receive conversation history. https://code.claude.com/docs/en/sub-agents.md

**CLAUDE.md inheritance**: Yes, received by default; can be omitted with `omitClaudeMd: true`. https://code.claude.com/docs/en/sub-agents.md

**Skills visibility**: Subagents load project and user skills by default. The `skills` frontmatter field preloads specific skills. https://code.claude.com/docs/en/sub-agents.md

**Return values**: Subagents return prose or JSON (when a `schema` is specified). Results are summarized back to the parent. https://code.claude.com/docs/en/sub-agents.md

**Spawning subagents**: Yes, subagents can spawn subagents (nesting depth limit: `CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH`, default 3). https://code.claude.com/docs/en/sub-agents.md

### 3. CLAUDE.md: Hierarchy, Nesting, Imports, Rules

**Hierarchy (load order)**: Managed policy (system-wide) → User (`~/.claude/CLAUDE.md`) → Project (`./CLAUDE.md` or `./.claude/CLAUDE.md`) → Local (`./.CLAUDE.local.md`). Content is concatenated, not overridden; later entries are read last. https://code.claude.com/docs/en/memory.md

**Nested directory loading**: CLAUDE.md files in subdirectories load on-demand (when Claude reads files in those subdirectories) rather than at launch. https://code.claude.com/docs/en/memory.md

**Imports**: `@path/to/file` syntax expands files inline at launch (relative to the CLAUDE.md containing the import; max recursion depth 4). Code spans and fenced blocks prevent import expansion. https://code.claude.com/docs/en/memory.md

**`.claude/rules/`**: Markdown files in `.claude/rules/` load alongside project CLAUDE.md. Rules can include YAML frontmatter with `paths: ["glob/pattern"]` to scope to specific files (load on-demand when Claude opens matching files). https://code.claude.com/docs/en/memory.md

**Size guidance**: Target under 200 lines per CLAUDE.md file; longer files consume more context and reduce adherence. Use path-scoped rules or skills for large content. https://code.claude.com/docs/en/memory.md

### 4. Hooks: Events and Mechanical Gates

**Events**: `SessionStart`, `Setup`, `UserPromptSubmit`, `UserPromptExpansion` (can block), `PreToolUse` (can block), `PermissionRequest`, `PermissionDenied`, `PostToolUse`, `PostToolUseFailure`, `PostToolBatch`, `Notification`, `MessageDisplay`, `SubagentStart`, `SubagentStop`, `TaskCreated`, `TaskCompleted`, `Stop`, `ConfigChange`, `CwdChanged`, `FileChanged`, `TeammateIdle`, `TaskCreated`, `TaskCompleted`. https://code.claude.com/docs/en/hooks-guide.md

**Mechanical gates (blocking behavior)**:
- `PreToolUse` can block a tool call: exit code 2 prevents execution, passes feedback to Claude.
- `UserPromptExpansion` can block command expansion: exit code 2 prevents the command from reaching Claude.
- `TaskCompleted` / `TaskCreated` / `TeammateIdle` can block with exit code 2 (agent teams only).
https://code.claude.com/docs/en/hooks-guide.md

**SubagentStop hook**: Yes, fires when a subagent finishes. No built-in blocking, but you can act on the event. https://code.claude.com/docs/en/hooks-guide.md

### 5. Multi-Agent Features & Communication Channels

| Feature | Status | Communication | Best For |
|---------|--------|---------------|----------|
| **Agent teams** | Experimental (opt-in `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) | Shared task list + direct peer messaging via `SendMessage` tool | Complex work needing inter-agent negotiation; parallel exploration |
| **Subagents** | Built-in | Return results to parent; named subagents can `SendMessage` each other | Focused delegation within one session |
| **Background subagents** | Via `background: true` in definition | Results arrive asynchronously; parent continues | Long-running tasks that don't block |
| **Worktrees** | Built-in (isolation: `worktree`) | Each session is independent; manual coordination via cross-session messaging | Parallel work on same repo without conflicts |
| **Headless mode** | `claude -p` | Streaming JSON output; no interactive prompts | CI/CD and scripted automation |
| **Scheduled/cloud agents** | Built-in (`/schedule`, `/loop`) | Cloud-hosted; asynchronous invocation | Recurring tasks, daily jobs |
| **Workflows** | Dynamic orchestration (`/deep-research`, custom scripts) | `agent()`, `pipeline()`, `parallel()` primitives; shared script variables | Dozens of agents in coordinated phases; repeatable orchestration |
| **Cross-session messaging** | `SendMessage` / `ListAgents` tools | Per-session socket (local) or through Anthropic (remote); plain text only | Coordination between independent sessions you manage |

Sources: https://code.claude.com/docs/en/agent-teams.md, https://code.claude.com/docs/en/sub-agents.md, https://code.claude.com/docs/en/workflows.md, https://code.claude.com/docs/en/cross-session-messaging.md

### 6. Choosing Between Mechanisms: Official Guidance

**Official comparison tables exist for**:
- **Subagents vs. Agent teams**: Subagents for quick, focused tasks returning to main context. Agent teams for peer collaboration. https://code.claude.com/docs/en/agent-teams.md
- **Subagents vs. Skills vs. Agent teams vs. Workflows**: Who holds the plan. Skills are instructions Claude follows; subagents are workers Claude spawns; agent teams are peers Claude coordinates; workflows are scripts the runtime executes. https://code.claude.com/docs/en/workflows.md

**Not formally documented**: A clear decision tree for "use skill vs. CLAUDE.md vs. subagent" is not explicitly provided. Inference: skills for reusable task instructions, CLAUDE.md for persistent rules, subagents for parallel work. UNCONFIRMED.

---

## Summary Table

| Mechanism | Loaded When | Who Sees It | Best For | Failure Mode |
|-----------|-------------|-----------|----------|--------------|
| **Skill body** | On-demand (invocation or relevance) | Claude in current session only | Reusable task instructions, optional reference | Auto-invocation unreliable; explicit `/skill-name` invocation dependable |
| **CLAUDE.md** | Session start (hierarchical merge) | Every session in the repo | Persistent coding standards, architecture | Drift; conflicting rules; context pressure on large files |
| **Subagent definition** | Session start (descriptions only); full context when spawned | The subagent and parent | Parallel or isolated task execution | Context isolation; no conversation history; limited return surface |
| **.claude/rules/** | Session start (no paths); on-demand (path-scoped) | Claude when matching files open | File-type-specific guidance | Glob patterns can be complex; loadable only when files are read |
| **Agent team** | Spawn time (experimental, opt-in) | Peer sessions; shared task list | Negotiated work, parallel exploration, cross-checking | Coordination overhead; higher token cost; experimental limitations |
| **Workflow orchestration** | Explicit invocation | Runtime script; agents spawned by script | Many agents in phases; repeatable patterns | Complex debugging; no mid-run user input; large token spend |
| **Cross-session messaging** | When sent | Receiving session's Claude | Status handoffs; warnings to peer sessions | Messages can be held/refused; no reply on cross-machine one-way; plain text only |
| **Hooks** | Event time (deterministic) | System (not Claude) | Enforced rules; blocked file edits; auto-approval | Cannot adapt to context; no judgment call; can be slow |
