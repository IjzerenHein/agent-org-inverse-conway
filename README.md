# agent-org-inverse-conway

A process for running a software project with a few humans and many AI coding agents, from vision to rough plan to detailed plan to delegated tasks.

The name states the idea: shape the organisation to get the architecture you want. Here the organisation is made of agents, so its structure is a design choice. This is one implementation of an agent organisation. Others are possible.

## Background

**Conway's law.** In 1968 Melvin Conway published "How Do Committees Invent?" in *Datamation*, after *Harvard Business Review* had rejected it for lack of proof. Its thesis: "organizations which design systems [...] are constrained to produce designs which are copies of the communication structures of these organizations." The argument is structural. Two parts of a system can only be made to fit if their designers talk, so the system's interfaces end up where the organisation's conversations are. Fred Brooks popularised it as Conway's law in *The Mythical Man-Month* (1975). Later studies support it, notably the "mirroring hypothesis" work of MacCormack, Rusnak and Baldwin (*Research Policy*, 2012), which found that loosely coupled organisations produce more modular software than tightly coupled ones.

**The inverse Conway manoeuvre.** Jonny LeRoy and Matt Simons coined the term in 2010: if structure leaks into design anyway, choose the team structure that yields the architecture you want. *Team Topologies* (Skelton and Pais, 2019) built a practice on it.

**Why it matters more with agents.** A human organisation is given; an agent organisation is written. Who reads what, who may write where and who judges the result are lines in a script and files in a repository. That makes the manoeuvre cheap, and neglecting it means accepting whatever structure the tooling imposes. Agents also change the costs. They share no memory, every handoff between them is a lossy summary, and they are near-identical, so a reviewer shares the author's blind spots. The human approver is the one constraint that does not scale.

**Other ideas the process leans on.**

| Idea | What it became here |
|---|---|
| Brooks's law: adding people to a late project makes it later, because communication paths grow with the square of the participants | few hops, and agents never message each other |
| Parnas on information hiding (1972): decompose by the decisions likely to change | cut work along ownership boundaries, never by discipline |
| Commander's intent, from mission command: pass the purpose, not only the order | every worker reads the owner's intent at the source |
| Theory of constraints (Goldratt): the bottleneck sets the throughput | the scarcest approver sets how much work may be open |
| Jidoka and andon (Toyota): build quality in, stop the line | every escape becomes a check, and "blocked" is a valid result |
| Stigmergy and blackboard systems: coordinate through a shared artefact | files coordinate, not messages |
| Separation of duties, from internal control and auditing | whoever writes the code does not define done |

**Recent evidence on LLM agents** points the same way. Specification and system-design problems are the largest class of failures in multi-agent systems, at roughly 42 to 44 percent (the MAST study, 2025). Independent peer agents amplify errors far more than a validating centre does, and multi-agent setups lose to a single agent on sequential, coupled work (Kim et al., Google and MIT, 2025). Sources and quotes are in `docs/research/`.

## Status

Version 2 of the design, dated 2026-09-19. It has not been used on a real project yet.

The kit (skills and agent definitions) is version 0.2. In version 0.1 its parts were reviewed one by one, and a pass over all of them together found 29 inconsistencies between them. Version 0.2 is the repair: the formats, role contracts and sentences that several parts share were written once, in `shared/`, and every skill was rebuilt against them. The repaired kit passes its mechanical checks but has not yet had a second pass over all parts together; `KNOWN-ISSUES.md` says what that means.

- It was designed for one project first, then generalised, then attacked with four thought experiments (a regulated payments platform, a three-person mobile startup, an open-source library, a fifteen-year-old monolith). Version 2 is the repair.
- Every agent involved in the design was the same model family, so agreement between them is weaker evidence than it looks.
- The first real test is a pilot on the first project. Nothing moves from a project into this repository until a second project needs it.

## The core in seven rules

1. A model rewrites the owner's intent once, into a spec, with the owner present. Everything downstream reads the spec and its sources by path, never another agent's summary.
2. Scripts orchestrate and files coordinate. Agents do not message each other. Each kind of fact has one writer and one home.
3. One writer per work item. Fan out only reading, research, review and work on separate files.
4. Cut work along ownership boundaries in the product, never by discipline. The evaluator is the only separate role.
5. Whoever writes the code does not define done. Machine-produced evidence decides.
6. The agents mirror the human approval graph. The scarcest approver sets how much work may be open.
7. The process does not build itself. A human sets up its checks through the ordinary change path.

## Where expertise lives

An agent is generic, so it needs an expert lens. The rule: the skill asks, the spec answers, the check enforces. Split a piece of expertise into clauses and place each one:

| Clause | Home |
|---|---|
| Must never break, and a machine can check it | a test or CI check |
| A fact about the outside world | a recorded fixture, or a line a named person attests |
| A choice among options | a decision record |
| A role's stance, tools and output format | the agent definition, which never holds domain knowledge |
| Craft about one module | a rule scoped to that module's paths |
| Craft or procedure across modules | a skill |
| True for one slice only | the spec |

The full procedure has fifteen clauses and is in `docs/process.md`, section 3.

## Use it

The repository is a Claude Code plugin, a Claude Code marketplace holding that one plugin, and a plain skills folder that other tools can install from. The files are the same in all three cases.

### Claude Code, and Conductor running Claude Code

```
/plugin marketplace add IjzerenHein/agent-org-inverse-conway
/plugin install inverse-conway@agent-org
```

The `owner/repo` form clones over SSH; set `CLAUDE_CODE_PLUGIN_PREFER_HTTPS=1` to clone over HTTPS. Installed copies receive a change only when the plugin's `version` changes; pull it with `/plugin marketplace update agent-org`.

Skills are then invoked with the plugin prefix, for example `/inverse-conway:profile`. The agent definitions appear as `inverse-conway:builder` and so on in `/agents`.

To make a project point at the kit, add this to the project's `.claude/settings.json`. Each person still runs the install command once.

```json
{
  "extraKnownMarketplaces": {
    "agent-org": { "source": { "source": "github", "repo": "IjzerenHein/agent-org-inverse-conway" } }
  },
  "enabledPlugins": { "inverse-conway@agent-org": true }
}
```

Conductor runs your installed Claude Code and its documentation confirms that plugin commands work. Plugin agents and hooks inside Conductor are unconfirmed: check with `/agents`, and if they are missing copy `agents/*.md` into the project's `.claude/agents/`.

### T3 Code, Codex, Cursor and other tools

Install the skills into the project with the cross-tool installer, run inside the consuming project:

```
npx skills add IjzerenHein/agent-org-inverse-conway
```

It copies or links each skill into `.claude/skills/` for Claude Code and `.agents/skills/` for the others. Installed this way a skill is invoked without a prefix, for example `/profile`. T3 Code's skill picker reads the project's `.claude/skills/`, so this is the route that makes the skills appear there. The agent definitions are Claude Code only; in other tools the skills give the fallback for each step that wants a fresh-context agent.

### Working on the kit itself

```
claude --plugin-dir /path/to/agent-org-inverse-conway
```

Run `/reload-plugins` after an edit. `AGENTS.md` holds the rules for changing the kit, including the validation commands to run before a commit.

### The skills

Start with `adopt`, which keeps a checklist of where the project stands.

| Skill | Produces |
|---|---|
| `adopt` | `docs/process/adoption.md`: the bootstrap checklist and its state |
| `profile` | `docs/process/profile.yml`: the fifteen dials, the four tables and the artefact paths |
| `vision` | `docs/vision.md`: one page, in the owner's words |
| `roadmap` | `docs/roadmap.md`: rolling-wave milestones with exit criteria |
| `adr` | `docs/adr/NNNN-slug.md`: a decision or contract record, with its residue check |
| `spec` | `docs/specs/NNN-slug.md`: the spec, which is also the builder's brief |
| `lens-placement` | a placement table for a piece of expertise, and the edits it implies |
| `build` | nothing of its own: the manual hand-over from an approved spec to the builder, the machine evidence, the checker and the human gate |
| `retro` | escape entries and a retro note with decisions for the human |

Agent definitions: `spec-critic`, `builder`, `checker`, `researcher`. They hold a stance, tool permissions and an output contract, and no domain knowledge.

Not built yet: automated orchestration of a build, the `brief`, `guard` and `packet` scripts, and CI templates. The `build` skill is a manual procedure and says so. They wait for the pilot to show what they need to be.

## Contents

- `.claude-plugin/`, `skills/`, `agents/`: the kit.
- `shared/`: the one home of the templates, role contracts and sentences that several skills use, with `shared/CONTRACTS.md` as the index. `scripts/sync-shared.mjs` copies them into the skills and generates `agents/`; with `--check` it fails when a copy has drifted.
- `KNOWN-ISSUES.md`: the state of the kit's consistency, and the findings that version 0.2 repaired.
- `AGENTS.md`: rules for working on this repository. `.claude/CLAUDE.md` imports it.
- `docs/process.md`: the process, version 2. Core rules, the project profile (fifteen dials), the lens model, packaging and bootstrap, what the process is not for, the change log and the open questions.
- `docs/research/`: the three research reports the design rests on, as the research agents returned them: published evidence on multi-agent systems, organisation theory applied to agents, and how Claude Code's context mechanisms behave. They were written with the first project as context; its details have been replaced with generic wording and one editor's note was added; nothing else was changed.
- `docs/history/process-v1.md`: version 1, before the stress tests.
- `docs/history/stress-tests.md`: the four stress tests in full, with every break, fix and lens-placement case. The first project's details have been replaced here too.

A project's own profile and findings stay in that project's repository.
