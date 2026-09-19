# Glossary for the profile interview

Terms that appear in the `Sets` comments and table columns of `assets/profile-template.yml`. The wording follows agent-org-inverse-conway, process v2, and each entry names the section, rule or dial it comes from. "Kit's reading" marks an explanation of a term the process uses without defining; say so when you pass it on. For a term that is not listed here: say that, name the dial's row in section 2, and do not improvise. A paragraph that stands between two HTML comments is a sentence the whole kit shares word for word: pass it on unchanged.

## Work and scope

- **kinds**: every work item declares one: `discover` (findings), `characterise` (checks pinning current behaviour), `probe` (flagged code with a hypothesis and expiry), `build`, `retire` (cutover, removal). Section 1.
- **`touches`, `affects`**: `touches` is the paths and objects a spec declares it changes; `affects` is computed by a script. Section 1, brief contract. Kit's reading of `affects`: what the change can reach without editing it.
- **width**: how many work items run in parallel; parallel only when `touches` plus `affects` are disjoint. P1, rule T3.
- **seam, module map**: work is cut along ownership boundaries and seams (T4). Kit's reading: a seam is a place where the code divides so that work on each side stays separate; the module map records the seams.
- **kernel paths**: P1 names them without a definition. Kit's reading: paths that almost every change touches, where parallel work collides; each gets an owner and a queue.
- **chunk readers**: P1, for oversized units. Kit's reading: readers that each take one part of a unit too large to read at once and append findings to the findings ledger.
- **path class**: used in P2, P3 and the guard without a definition. Kit's reading: a named group of paths that share approvers or gates. The profile lists them in its `path_classes` table, each with its paths, its gates and whether a change there is reversible; P2 `paths_they_may_approve` and P3 `decision_rights` use the names.
- **ownership path, ownership boundary**: work is cut along ownership boundaries, and a spec's scope sits inside one (T4). Kit's reading: an ownership path is a path with a named owner. The profile lists them in its `ownership_paths` table, each with its owner and the boundary it belongs to; a path takes the nearest row above it, and an overlay names one of these paths.

## People and roles

- **section owner**: the named owner of a section of a spec, who approves it. T1.
- **steward**: the one person who follows a work item to its last done-state and breaks ties. T1.
- **spec approver, author of record**: the spec approver is the author of record, named in a commit trailer. P4. Kit's reading: the trailer is `Spec-approved-by: <name> (<sections and acceptance ids>)`, added by the approver or the merge tooling, never by an agent.
- **harness, harness owner**: kit's reading of "harness": the scripts, checks and configuration that run and confine the agents. Its named owner changes it through the ordinary human change path, never through the pipeline it governs (T5), builds the walls (section 4) and reviews them line by line (V3). The profile names that person in `dials.P4.role_matrix`, role `harness owner`.
- **role matrix, two-person rule**: P4. Kit's reading: the matrix says who holds each role and which roles must be held by different people; under the two-person rule (P4 b and c, on walls and publish) two different humans must act.
- **contract record**: the human-negotiated record that cross-boundary work starts with. T4.

## Walls and verification

- **walls**: they sit outside the agent (V5), get the harness owner's line-level review (V3), and agent credentials cannot edit them. What counts as one:

<!-- shared:walls -->
Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.
<!-- /shared:walls -->

- **lenses**: rules, project skills, facts: the expertise an agent loads. They get the owning team's ordinary review. V3, section 3.
- **guard**: a check computed from the base branch that keeps the diff inside `touches`; without a spec it derives gates from the path classes touched. V3, section 1.
- **M0, global M0**: the first verification milestone. Section 4, step 2, and P8. More verification is bought per seam or slice. What the two names cover:

<!-- shared:m0 -->
Global M0 is six items the harness owner builds: reproducible build, guard, read wall, execute wall, acceptance job and a machine credential without merge rights. M0 is global M0 plus the verification that closes the P8 `no` rows, and the staging, on the paths and surfaces the near milestones touch.
<!-- /shared:m0 -->

- **oracle**: where acceptance comes from, per acceptance id: human-stated, legacy system, external standard, reporter's reproduction or human judgement. P7, V2.
- **acceptance id types**: `checked`, `judged`, `observed`. Brief contract, V1. Kit's reading: `checked` is decided by a machine check. The other two:

<!-- shared:judged-attestation -->
A `judged` acceptance id is decided by its value owner's attestation against the rubric: one file from the attestation template, bound to a commit, whose `confirmed` field holds the review URL where the attester approved the file, or `own commit` when the attester committed the scores themselves. `own commit` counts only when the author of the last commit that changed the file is the attester. The attestation is void once a path that attester owns (`ownership_paths[].owner` in the profile) changes after the commit it is bound to; when those paths cannot be established, any change after that commit voids it.
<!-- /shared:judged-attestation -->

<!-- shared:observed -->
An `observed` acceptance id is decided by evidence produced after merge, at a done-state and horizon that the profile's `done_states` table lists. A script writes that evidence, never the builder.
<!-- /shared:observed -->

- **characterisation**: checks pinning current behaviour; with a legacy oracle, golden masters from a protected capture job. Section 1, V2.
- **export, drift check**: a running system outside the repo is exported into it, and a check fails when export and system differ. Section 3, clause 5; P6 c.
- **walking skeleton**: P6 a, time-boxed. Kit's reading: the thinnest end-to-end version of the system that builds, runs and ships.
- **diff depth, full diff read**: P9, P4. Kit's reading: how much of a diff a human reads, from a sample to every line.
- **stance checkers**: P9 names them without a definition. Kit's reading: extra fresh-context reviewers that each check from one stance, for example security or data loss.
- **escape, escape threshold**: an escape is a defect that got past the process; each gets a ledger line. The second occurrence becomes a check at P9 a and b, the first at c. Section 1, learning loop.
- **attested fact**: a claim attested by a named person inside the boundary, with role and validity dates. V7.
- **never-violate test**: P10 b, one per rule. Kit's reading: a check that fails whenever the rule would be broken.
- **mandated control, registered control**: P10 c; the learning loop never ablates a registered control. Kit's reading: a control that a law, a regulator or a mandated function requires. The profile registers each in `dials.P10.mandated_controls`, with its requirement id and who attests it.

## Gates, release and done

- **gate, packet, default if silent**: a gate is a point where a named human role decides (the gates table says in `applies_to` what each gate's approval covers: specs, records, roadmap, vision or release); the packet is the machine-assembled evidence for that role (diffs, visual diffs, business-language discrepancy batches, release-level diffs); decline is a valid outcome. Section 1, human gates. Kit's reading of "default if silent": what happens when the gate owner does not answer within the response time.
- **release surface, staged, promoter**: a route by which a change reaches its audience, inside or outside the repo. Merge equals release for every unstaged surface, and those gate synchronously (V6). Kit's reading: staged means a merged change is held back until a human, the promoter, promotes it. A surface's `paths` are the paths in the repository that ship through it; a surface outside the repo has none.
- **done-state, horizon**: a state an item must reach, decided by machine-produced evidence (V1). The horizon is when that evidence can exist: PR, nightly, soak or post-release (P8).
- **soak**: a horizon the process names without a definition. Kit's reading: a period of real use after release before the evidence is read.
- **system of record**: the one system that owns a kind of fact; each kind has one writer. T2.
- **fix-forward or data-repair runbook; tombstone before delete**: P9 c. Kit's reading: where rollback does not exist, a written procedure to repair by a new release or by repairing data; and before a delete, the object is first renamed or access-logged, with a quick restore, to find users nobody knew of.

## The outside

- **boundary contract**: tool-neutral, in the repo: `AGENTS.md`, `CONTRIBUTING.md`, `verify` and `brief <spec>` as dev dependencies, a PR template CI parses, failure messages carrying the lens text. Section 4; P5 b and c.
- **intake, pre-screen, admission gate, claim and takeover, two-stage CI**: P5 c names them without definitions. Kit's reading: outside contributions pass a machine pre-screen and a human admission gate before review; a script records who has claimed an item and when another may take it over; CI runs untrusted code in a first stage without secrets and reports from a trusted second stage.
- **fake-by-default transport, human-captured fixtures, request budget, blocking health check**: P12 c. Kit's reading: calls to the interface go to a fake unless switched on; fixtures are recorded from the real interface by a human; real requests are capped; a failing check of the real interface blocks.
- **expand/contract**: P13 b. Kit's reading: add the new shape beside the old, move the consumers, then remove the old, as separate steps.
- **obligations ledger**: entries for commitments due later, each with a date- or version-keyed failing check. Section 3, clause 8; P13 c.
- **downstream canary, consumer discovery**: P13 c and d. Kit's reading: run known consumers' own checks against a candidate before release; find unknown consumers from telemetry before changing what they use.
- **masked or synthetic data; disposable or leased databases; pinned model**: P11. Kit's reading: agents see no real personal data; each run gets a throwaway database or takes turns on a shared one; the model version is fixed, and an upgrade is a work item that passes the gates.
- **re-entry item; twin or recorded freeze; private mirror**: P15. Kit's reading: a hotfix made outside the process ends with a work item that brings it back in; while two implementations coexist, a change to one carries the same change to the other or a recorded decision to freeze it; confidential work happens in a private copy of the repository.
- **governance onboarding**: section 4, step 1: "where P10 or P11 demand it". Kit's reading: getting the organisation's approval for the agent tooling before the walls are built. The owner says whether it is needed; the profile records the answer in `governance_onboarding`.
