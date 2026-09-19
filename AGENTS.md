# Working on this repository

This repository is a process kit. `docs/process.md` is the source of truth; the skills, templates and agent definitions are thin carriers of it. Read `docs/process.md` before changing anything else.

## Layout

- `docs/process.md`: the process. `docs/research/` and `docs/history/` are records; do not edit them.
- `skills/<name>/SKILL.md`: one skill per directory, with its templates in `skills/<name>/assets/`.
- `agents/*.md`: Claude Code subagent definitions, flat files. They are generated; see below.
- `shared/`: the one home of everything more than one artefact depends on: `templates/`, `briefs/` (the role contracts), `sentences.md` and `manifest.json`, which lists where each is copied to.
- `scripts/sync-shared.mjs`: copies `shared/` into place. With `--check` it fails when a copy differs.
- `.claude-plugin/`: the plugin manifest and the marketplace manifest. The repository is both.

## Shared content

A skill must be self-contained, yet skills share ledger formats, role contracts and some sentences. So those live once in `shared/` and are copied.

- Never edit a generated file: a skill asset listed in `shared/manifest.json`, anything in `agents/`, or the text between `<!-- shared:KEY -->` and `<!-- /shared:KEY -->` markers. Edit the source in `shared/` and run `node scripts/sync-shared.mjs`.
- A format or contract used by more than one artefact goes into `shared/` before the second artefact uses it.
- To state a shared sentence in a skill, put the marker pair on their own lines; the sync fills the text.

## Rules for skills

- Frontmatter holds only fields from the Agent Skills specification: `name` (equal to the directory name), `description`, and optionally `license`, `compatibility`, `metadata`. No Claude Code extension fields, so the skills stay portable.
- A skill is installed by copying its directory, so it must be self-contained. Never link to a file outside the skill's own directory.
- Refer to a sibling skill by plain name ("the spec skill"), never by slash form. The slash name differs by install route (`/inverse-conway:spec` as a plugin, `/spec` as a copied skill).
- Keep a skill thin: a procedure, a template, and the questions to ask. It never restates a project's decisions or facts.
- A skill reads the consuming project's `docs/process/profile.yml` for artefact paths and dial values, and falls back to its own default path when there is no profile.
- Where a step needs a fresh-context agent, say so and give the fallback for tools that cannot spawn one.

## Rules for agent definitions

- A definition holds a stance, tool permissions and an output contract. It never holds domain knowledge.
- Plugin agents cannot use `hooks`, `mcpServers` or `permissionMode`.

## Rules for the repository

- No project names or project facts. What a project learns stays in that project until a second project needs it.
- A change to `docs/process.md` records what forced it in the change log.
- Before committing, run `node scripts/sync-shared.mjs --check`, then `claude plugin validate <target> --strict` for each of `.`, `.claude-plugin/plugin.json`, `skills` and `agents`. The first checks only the marketplace manifest.
- Keep `CLAUDE.md` out of the repository root: a plugin root may not hold one. `.claude/CLAUDE.md` imports this file.
- Installed copies only receive a change when `version` in `.claude-plugin/plugin.json` changes. Bump it with every change that projects should pick up; a project upgrades the kit as a work item of its own.
