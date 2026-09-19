# M0 and the dials

Load this when sizing M0, or when a dial value in the profile changes the order of milestones. It carries what process v2 (agent-org-inverse-conway, sections 1, 2 and 4) states that bears on a roadmap, and where that goes in the template. A line marked "kit default" is this skill's own reading of how it moves the sequence; the owner may overrule it. Dial values come from the profile. Never set or guess one here.

## M0

<!-- shared:m0 -->
Global M0 is six items the harness owner builds: reproducible build, guard, read wall, execute wall, acceptance job and a machine credential without merge rights. M0 is global M0 plus the verification that closes the P8 `no` rows, and the staging, on the paths and surfaces the near milestones touch.
<!-- /shared:m0 -->

**Global M0 is small.** More verification is bought per seam or slice (P8), not up front for the whole system.

**One home for its state.** The adoption checklist holds the state of global M0: rows 2.1 to 2.6, and row 2.7 at P6 c, each with its draft, who applied it and its evidence. The roadmap points to those rows and copies nothing from them: M0 carries one exit row that cites them. The checklist also holds the time-box for building the walls and the order confirmed at P6 a. Read them there; do not ask again. Only a project with no adoption checklist lists the six items in the roadmap itself, and then name the adopt skill.

<!-- shared:walls -->
Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.
<!-- /shared:walls -->

**Who builds it.** The harness owner (`dials.P4.role_matrix`, role `harness owner`) builds and changes the walls through the ordinary human change path, never through the pipeline they govern (T5). Agent credentials cannot edit walls. Wiring a check into CI is therefore wall work, and so is building staging, because deploy and release configuration are walls. During M0 the guard and the machine credential do not exist yet, so nothing mechanical stops an agent from editing a wall. That is why every M0 row names who builds it and why global M0 comes first.

**Sizing by P8.** P8 has one row per module or lens: check exists (yes, partial, no), where it runs, horizon (PR, nightly, soak, post-release), cost. Take every row whose paths overlap the paths the near milestones touch (interview batch 2) and apply the rule in the procedure's "Size M0" step. Copy where it runs, horizon and cost from the profile. Width and diff reading relax per path, once its verification has landed and the profile row says so, not for the whole repository at once. The profile row changes only through the profile skill, row update: hand it the keys and the evidence pointer for each.

**Staging by V6.** Release surfaces include ones outside the repo: flags, backfills, store listing, registry channel, agent-facing docs. Check those rows of the profile's table too. The profile, never an agent, classifies reversibility; any externally visible effect is irreversible.

**Preconditions.** Governance onboarding belongs to the profile step and comes before the walls. The profile records the owner's answer in `governance_onboarding`; do not ask it again. When `needed` is false, write `n-a`. When it is true, copy `approvers` and `requires` into the Preconditions line, and point to adoption checklist row 1.4 for whether it is complete.

**Time-box.** The owner gives it. Take it from the adoption checklist where one is recorded, and ask only whether it also covers the verification rows and the staging. The payback metric is in the profile (`dials.P2.payback`). Carry no number of your own.

## P6: start and knowledge

- a, greenfield: decision records for irreversible stack choices, then a walking skeleton with its own time-box, given by the owner. It never shares M0's time-box. The bootstrap order puts the skeleton after global M0, so the kit default is M1. Some items of global M0 need something to run on; the adoption checklist records the order the harness owner confirmed for them. Copy that order into the ordering rationale with a pointer. Ask the harness owner only when there is no checklist or it records no order. List each stack record under the decisions needed of the first milestone that depends on it.
- b, brownfield with tests: the P8 rows decide.
- c, brownfield without tests: reproducible build, exports of what runs outside the repo with a blocking drift check, characterisation per seam. The reproducible build is an item of global M0. Whether the exports and their drift check belong with global M0 or with the milestone that first touches the exported system is the harness owner's answer, recorded in adoption checklist row 2.7. Read it there, and ask only when there is no checklist or the row holds no answer. Characterisation is bought per seam, inside the milestone that touches the seam. Do not plan system-wide characterisation in M0.
- Intent discovered, not known: near milestones of kind `discover`. Behaviour not understood: `characterise` comes before `build` in that seam.
- P6 sets which kinds are enabled. Plan no work of a kind the profile has not enabled.

## Other dials that move the sequence

- **P1 coupling.** 0, unformed: width 1 and no module map until seams are observed. Width 1 means milestones run one after another; it limits parallel work, not the length of the near wave. Kit default: do not cut milestones by module yet. Kernel paths get an owner and a queue. Kit default: count that queue when you order near milestones.
- **P3 authority and T4.** A spec's scope sits inside one ownership boundary (`ownership_paths[].boundary`). Work that crosses a boundary starts with a human-negotiated contract record; at P3 c that record comes first. List it under decisions needed. This skill does not draft the contract.
- **P9 blast radius.** The profile gives the value per path and surface, and P9 sets soak. c needs a fix-forward or data-repair runbook and a tombstone before a delete. An exit criterion on c paths uses the horizon the profile's done-states table gives. Where the profile gives no value for a path, the roadmap says `unclassified` and plans it as it would c; it never writes a class of its own, and the missing row is a questions entry for the profile's approver.
- **P12 external interfaces.** d, certified or gatekept: its lead time is a fixed point in the roadmap. The number comes from the owner or an attested fact (V7), never from you. c: fixtures are captured by a human. Kit default: plan that capture ahead of the `build` work that needs them.
- **P13 consumers.** b: a change to a skewed interface is expand, then contract. Kit default: those are two points in the sequence, the second once the old clients are gone. c: obligations ledger. Kit default: the `due` of each open entry, a date or a version, is a fixed point. d: consumer discovery from telemetry. Kit default: that is `discover` work and comes before changing the interface.
- **P15 lines and change stream.** While two implementations coexist, every change carries a twin or a recorded freeze. Kit default: keep the `retire` milestone that ends the coexistence in the roadmap, even if rough.
- **Experiments.** Expiry forces keep or kill, and a kill creates a `retire` item. The retro skill forces that decision; the roadmap only reads it. At every re-plan read each experiments entry's `expiry`, `extensions` (the latest one wins, else `expiry`) and `outcome`, and point to the `retire` item a kill names in `follow-up`.
