# M0 and the dials

Load this when sizing M0, or when a dial value in the profile changes the order of milestones. It carries what process v2 (agent-org-inverse-conway, sections 1, 2 and 4) states that bears on a roadmap, and where that goes in the template. A line marked "kit default" is this skill's own reading of how it moves the sequence; the owner may overrule it. Dial values come from the profile. Never set or guess one here.

## M0

**Global M0 is small.** Reproducible build, guard, both walls (reading and executing, V5), acceptance job, machine credential without merge rights. More verification is bought per seam or slice (P8), not up front for the whole system.

**Who builds it.** Walls are agent configuration, CI, capture jobs and whatever defines the shipped artefact. The harness's named owner builds and changes them through the ordinary human change path, never through the pipeline they govern (T5). Agent credentials cannot edit walls. Wiring a check into CI is therefore wall work. Kit default: deploy and release configuration counts as "whatever defines the shipped artefact", so building staging is wall work too. During M0 the guard and the machine credential do not exist yet, so nothing mechanical stops an agent from editing a wall. That is why every M0 row names who builds it and why the walls come first.

**Sizing by P8.** P8 has one row per module or lens: check exists (yes, partial, no), where it runs, horizon (PR, nightly, soak, post-release), cost. Take every row whose paths overlap the paths the near milestones touch (interview batch 2) and apply the rule in the procedure's "Size M0" step. Copy where it runs, horizon and cost from the profile. Width and diff reading relax per path, once its verification has landed and the profile row says so, not for the whole repository at once.

**Staging by V6.** Release surfaces include ones outside the repo: flags, backfills, store listing, registry channel, agent-facing docs. Check those rows of the profile's table too. The profile, never an agent, classifies reversibility; any externally visible effect is irreversible.

**Preconditions.** Governance onboarding that P10 or P11 demand belongs to the profile step and comes before the walls. If it is not complete, list it as a precondition of M0 with its owner.

**Time-box.** The owner gives it. The payback metric is in the profile (P2). Carry no number of your own.

## P6: start and knowledge

- a, greenfield: decision records for irreversible stack choices, then a walking skeleton with its own time-box, given by the owner. It never shares M0's time-box. The bootstrap order puts the skeleton after the walls, so the kit default is M1. Ask the owner whether it has to precede the walls because they need something to run on, and record the answer in the ordering rationale. List each stack record under the decisions needed of the first milestone that depends on it.
- b, brownfield with tests: the P8 rows decide.
- c, brownfield without tests: reproducible build, exports of what runs outside the repo with a blocking drift check, characterisation per seam. The reproducible build is an M0 wall. Ask the harness owner whether the exports and their drift check belong in M0 or in the milestone that first touches the exported system. Characterisation is bought per seam, inside the milestone that touches the seam. Do not plan system-wide characterisation in M0.
- Intent discovered, not known: near milestones of kind `discover`. Behaviour not understood: `characterise` comes before `build` in that seam.
- P6 sets which kinds are enabled. Plan no work of a kind the profile has not enabled.

## Other dials that move the sequence

- **P1 coupling.** 0, unformed: width 1 and no module map until seams are observed. Width 1 means milestones run one after another; it limits parallel work, not the length of the near wave. Kit default: do not cut milestones by module yet. Kernel paths get an owner and a queue. Kit default: count that queue when you order near milestones.
- **P3 authority and T4.** A spec's scope sits inside one ownership boundary. Work that crosses a boundary starts with a human-negotiated contract record; at P3 c that record comes first. List it under decisions needed. This skill does not draft the contract.
- **P9 blast radius.** The profile gives the value per path and surface, and P9 sets soak. c needs a fix-forward or data-repair runbook and a tombstone before a delete. An exit criterion on c paths uses the horizon the profile's done-states table gives.
- **P12 external interfaces.** d, certified or gatekept: its lead time is a fixed point in the roadmap. The number comes from the owner or an attested fact (V7), never from you. c: fixtures are captured by a human. Kit default: plan that capture ahead of the `build` work that needs them.
- **P13 consumers.** b: a change to a skewed interface is expand, then contract. Kit default: those are two points in the sequence, the second once the old clients are gone. c: obligations ledger. Kit default: its dated entries are fixed points. d: consumer discovery from telemetry. Kit default: that is `discover` work and comes before changing the interface.
- **P15 lines and change stream.** While two implementations coexist, every change carries a twin or a recorded freeze. Kit default: keep the `retire` milestone that ends the coexistence in the roadmap, even if rough.
- **Experiments.** Expiry forces keep or kill, and a kill creates a `retire` item. Read the experiments ledger for expiries at every re-plan.
