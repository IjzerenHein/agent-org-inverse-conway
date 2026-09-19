# Roadmap: <product area>

<!--
How to fill this in. Delete this comment when done.
- This file holds sequence and intent. It has no status, progress or assignment fields.
- The order of the sections is the sequence. Milestone ids are stable and never reused.
- Intent is quoted from the vision with a pointer, never paraphrased.
- Every assumption and claim points to a ledger entry, a record or evidence. No pointer: write a questions-ledger entry and point to it. The entry holds the standing; do not copy it here.
- Exit criterion types: `checked` (a machine check decides), `judged` (a named person attests, bound to a commit), `observed` (evidence from the running system over a stated window).
- `<record path>` is the project's path for decision and contract records: the profile's artefacts table, or the default the skill names.
- Learning is appended under "Pointers", never re-summarised.
-->

| Field | Value |
|---|---|
| Vision | `<path>` at `<commit>` |
| Profile | `<path>` at `<commit>` |
| Planned on | <YYYY-MM-DD> |
| Near wave | <ids of the detailed milestones>; the rest is rough on purpose |
| Approver | <name and role: owner of the ownership path this file sits in, per the profile. At P3 b or c add the owner of each near milestone's boundary, who approves that block> |
| Status lives in | <tracker named in the profile's systems-of-record table, or "no tracker"> |
| Re-plan when | a milestone closes, an assumption is falsified, or the profile is re-profiled |

## Ordering rationale

<!-- Three to six lines. Which risk puts which milestone first, and which fixed points constrain the order. Pointers, not retellings. -->

- M<a> comes before M<b> because <assumption or unknown> (`<pointer>`)
- Fixed point: <lead time (P12 d) or dated obligation> (`<pointer>`)

## M0: verification and staging

<!-- M0 carries no vision quote and no assumptions table. -->

- Harness owner: <name, from the profile>. Builds and changes the walls through the ordinary human change path (T5). Agents do not edit walls.
- Time-box: <given by the owner>
- Paths agents will touch in the near wave: `<path>`, `<path>`
- Preconditions: <governance onboarding the profile demands (P10, P11) and who owns it, or "none">
- Order inside M0: walls first, then verification rows. Whatever changes agent configuration, CI, capture jobs or release configuration is wall work, wiring a check into CI and building staging included.

### Walls (global, kept small)

<!-- "yes" only with something that shows it: a path, a CI job, a settings export. Unknown counts as "no". -->

| Wall | Exists | Evidence or pointer |
|---|---|---|
| Reproducible build | <yes / no> | |
| Guard keeping a diff inside `touches` | | |
| Read wall (V5) | | |
| Execute wall (V5) | | |
| Acceptance job | | |
| Machine credential without merge rights | | |

### Verification rows to close

<!-- Every P8 row with "check exists: no" on the paths above. Copy where it runs, horizon and cost from the profile. Do not estimate them. The harness owner wires every check into CI. "Built by" is about the check's own code: the harness owner, or an agent item of kind `characterise` or `build` that starts after the walls exist. -->

| Module or lens | Paths | Check to add | Where it runs | Horizon | Cost | Built by |
|---|---|---|---|---|---|---|
| <P8 row> | `<paths>` | <check> | <from profile> | <PR / nightly / soak / post-release> | <from profile> | <harness owner / `characterise` item / `build` item> |

### Release surfaces to stage

<!-- Every surface the profile lists as unstaged that a near milestone ships through (V6). Release configuration is wall work. An agent item may build only product code the staging needs, after the walls exist. -->

| Surface | Staging to add | Built by | Promoter | Rollback time | If it stays unstaged |
|---|---|---|---|---|---|
| <surface> | <what> | <harness owner / agent item for product code> | <from profile> | <from profile> | gates synchronously on every merge: `<pointer to that gate in the profile's gates table>` |

### Decisions needed

| Decision | Record | Decider | Needed before |
|---|---|---|---|
| <choice to make> | `<record path>` or `to write` | <name, role> | <start / exit of M0> |

### Exit criterion

<!-- A starting point: one row per wall, each with its own judge. Agree the rows and their judges with the harness owner (interview batch 3). -->

| Id | True when | Type | Judge | Evidence |
|---|---|---|---|---|
| M0-E1 | the build is reproducible from a clean checkout | checked | <command or CI job> | <done-state and horizon from the profile> |
| M0-E2 | the guard rejects a diff outside `touches` | checked | <CI check> | |
| M0-E3 | the read wall holds: agents read only what the allowlist names | <checked / judged> | <command, or a named person> | |
| M0-E4 | the execute wall holds: unreviewed code reaches no secret that can release or reach production | <checked / judged> | <command, or a named person> | |
| M0-E5 | the acceptance job runs on the base branch | checked | <CI job> | |
| M0-E6 | the machine credential cannot merge | <checked / judged> | <command, settings export, or a named person> | |
| M0-E7 | every verification row above has a check that is green on the base branch, where the profile says it runs | checked | <CI job> | |
| M0-E8 | every surface above is staged, or the profile's gates table names the synchronous gate for it | <checked / judged> | <command, or the promoter by name> | `<profile path>` |
| M0-E9 | the profile's P8 rows and release-surface rows for the paths and surfaces above state what M0 changed, merged through the profile's own approval | judged | <the profile's approver by name> | <merge commit of the profile change> |

### Pointers

<!-- Appended, never rewritten: records, ledger entries, evidence ids. -->

## M1: <name>

<!-- Near milestone: every field filled. Copy this block for each milestone in the near wave. -->

- Intent: "<verbatim quote from the vision>" (`<vision path>`, <heading or line>)
- Produces: <knowledge / code / both>
- Ownership boundary: <boundary from the profile>; owner: <name>
- Risk addressed: <the assumption or unknown that puts this milestone here> (`<pointer>`)
- Paths agents will touch: `<paths>`; strictest P9 value on them, from the profile: <a / b / c>
- Release surfaces it ships through: <surface, staged or unstaged per the profile, or "none">
- Tracker pointer: <link, if the profile names a tracker for status>

### Exit criterion

<!-- A knowledge milestone exits when the named question entries are closed or the named findings are adjudicated; the judge is the owner of those entries. A `characterise` milestone may name the checks that must be green on the base branch instead. -->

| Id | True when | Type | Judge | Evidence |
|---|---|---|---|---|
| M1-E1 | <what is true when this milestone is done> | <checked / judged / observed> | <command, check or evidence source; or a named person and role> | <done-state and horizon from the profile> |

### Assumptions

<!-- The pointer leads to the entry that holds the standing. Do not copy the standing here. -->

| Assumption | Pointer | Tested by |
|---|---|---|
| <what this milestone takes to be true> | `<ledger entry or record>` | <M<k>, or "not yet planned"> |

### Decisions needed

| Decision | Record | Decider | Needed before |
|---|---|---|---|
| <choice, or cross-boundary contract> | `<record path>` or `to write` | <name, role> | <start / exit of M1> |

### Verification to buy first

<!-- P8 rows on this milestone's paths that are `partial`, or `no` and not closed by M0. They come before the `build` items. Wiring a check into CI and building staging stay with the harness owner. When this milestone buys verification or staging, add an exit row like M0-E9: the profile states what changed, merged through the profile's own approval. -->

- <P8 row>: <check to add>, <where it runs>, <horizon>, built by <harness owner / agent item>

### Kinds of work expected, in order

<!-- Kinds and their order only, for example `characterise` before `build` in a seam. Drafted as options and corrected by the owner. No slices: the spec skill cuts those when their turn comes. -->

- `<discover / characterise / probe / build / retire>` in <seam or boundary>

### Pointers

<!-- Appended, never rewritten: specs, records, ledger entries, evidence ids. -->

## M<k>: <name> (rough)

<!-- Far milestone: rough on purpose. Copy this block for each. No exit criterion is invented here. If the owner already states one, record it and mark it `draft`. The milestone gets its full block when it enters the near wave. -->

- Intent: "<verbatim quote from the vision>" (`<vision path>`, <heading or line>)
- Must be learned or decided first: <pointers to question entries, or the milestone that answers them>
- Fixed points: <lead time or dated obligation with pointer, or "none">

### Pointers

<!-- Appended, never rewritten. -->

## Closed

<!-- A close is decided by the evidence the exit criterion named, never by a claim (V1). Git history holds the detail. -->

| Id | Name | Outcome | Date | Evidence or decision pointer |
|---|---|---|---|---|
| <M<n>> | <name> | <met / dropped> | <YYYY-MM-DD> | `<evidence id, attestation commit, or decision record>` |
