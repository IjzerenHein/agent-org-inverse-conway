# Shared sentences

Sentences that must read the same in every skill, template and role brief. One `## <key>` heading per sentence, then the sentence as one paragraph. A file includes one by writing the marker pair `<!-- shared:KEY -->` and `<!-- /shared:KEY -->` on their own lines; the sync script fills the text between them. Change a sentence here, never in a copy. Each sentence is faithful to `docs/process.md`; where it settles something the process leaves open, `CONTRACTS.md` says so.

## walls

Walls are agent configuration (settings, permissions, hooks, agent definitions, workflow scripts), CI, capture jobs and whatever defines the shipped artefact (build, generator, deploy and release configuration), together with the hosting settings (branch protection, required reviewers, code-owner file) and credentials they rest on.

## approved-vision

A vision is approved when it says `Status: approved YYYY-MM-DD`, has no `Drafted with:` line and is on the default branch.

## approved-profile

A profile is approved when `approval.status` is `approved`, `approval.approved_in` names the approver's own commit or pull request, and the file is on the default branch. Anything else is `proposed`, whatever the status field says; an attestation or a yes in conversation is not approval.

## proposed-profile

If the profile is `proposed`, say so and use its paths. Read the last approved version with `git show <approval.last_approved_in>:docs/process/profile.yml`, and confirm that the version you read says `approval.status: approved`. Take each dial value, and each cell of `ownership_paths`, `path_classes` and the four tables, as the stricter of the proposed value and the last approved one; where strictness has no order (a name, a path list), use the last approved one. If no version was ever approved, or you cannot read or confirm the approved one, take the dials and those tables as if there were no profile.

## missing-profile

With no profile, say so and name the profile skill. Use the default paths. Take every dial value you need at its strictest, and never ask for a dial value ad hoc. The irreversibility class is the exception: with no profile it is `unclassified`, never a c you write yourself; it is treated as c and waits for a blocking question to the person the profile skill will interview.

## approved-spec

A spec is approved when it is on the default branch and the commit that put it there carries one trailer `Spec-approved-by: <name> (<sections and acceptance ids>)` for each section owner and each value owner the spec names. The approver or the merge tooling adds the trailer at approval; an agent never writes it. A draft stays off the default branch until then. After approval only the header's `withdrawn` and section 9 change; a later commit that changes anything else leaves the spec unapproved.

## p9-lookup

The irreversibility class is looked up in the profile, never chosen. Each path concerned (a spec's `touches` and `affects`, a record's `covers`) takes the strictest row of `dials.P9.rows` that matches it, each release surface concerned takes its surface row, and whatever has no row takes `dials.P9.value`. A release surface is concerned when the spec or record names it, or when a path concerned matches its `paths` in `release_surfaces`. The class is the strictest of these (a, then b, then c), and it is c whenever an effect is externally visible or the `audience` of a surface concerned is outside the project (V6). Where the profile gives no value, the class is `unclassified`. With no profile the class is also `unclassified`. Treat `unclassified` as c, and put a blocking question to whoever holds decision rights over the profile: `approval.approver`, or with no profile the person the profile skill will interview. The question asks for a profile row, which that person gives through the profile skill; a class is never written into a spec or a record ahead of it.

## lens-source-mark

Every lens line ends with its source as a literal mark: `(source: <kind>[, unvalidated], <pointer>)`. `<kind>` is `interview`, `record residue`, `escape`, `mandated control` or `imported`; `<pointer>` names the origin (person and date, record id, ledger entry path, requirement id, or where the line was imported from). An `imported` line carries `unvalidated` until a retro rules on it, and a `mandated control` line is never ablated.

## observed

An `observed` acceptance id is decided by evidence produced after merge, at a done-state and horizon that the profile's `done_states` table lists. A script writes that evidence, never the builder.

## judged-attestation

A `judged` acceptance id is decided by its value owner's attestation against the rubric: one file from the attestation template, bound to a commit, whose `confirmed` field holds the review URL where the attester approved the file, or `own commit` when the attester committed the scores themselves. `own commit` counts only when the author of the last commit that changed the file is the attester. The attestation is void once a path that attester owns (`ownership_paths[].owner` in the profile) changes after the commit it is bound to; when those paths cannot be established, any change after that commit voids it.

## pending-acceptance-close

A pending-acceptance entry is closed by the project's post-merge script, with the id of the run in which every listed check passed on the default branch; where no such script exists, the steward closes it in an ordinary change. Closing the entry moves its checks from the pending run into the blocking run. When a spec is withdrawn or superseded, its entry is closed in the change that sets `withdrawn`. No agent closes an entry on its own reading: the retro lists the entries whose checks are green on the default branch and proposes the close to the steward.

## shipped-spec

A spec is shipped when machine evidence shows its last done-state (the profile's `done_states` table) and no pending-acceptance entry for it is open. One mover then moves it to the shipped folder (`artefacts.specs_shipped`): the project's post-merge script, or where none exists the retro skill, which prepares the move as an ordinary change. Nobody else moves a spec. A spec named in `depends-on` is closed when it is in the shipped folder, or when it is `withdrawn` and no spec's `supersedes` names it; a superseding spec takes the withdrawn one's place in `depends-on`.

## blocked-question-return

A builder's `blocked` report of kind `question` becomes one questions ledger entry with `blocking: true`, written by the session that started the builder, which also appends a pointer to the entry in the spec's section 9. Both land in a change of their own on the default branch, never on the builder's branch. Once the entry is closed, a fresh builder is started from the spec path, on a branch that contains both, and reads the answer in the entry. An answer that changes intent, scope or an acceptance value is never appended: the spec is `withdrawn` and a new spec supersedes it. A `blocked` report of kind `precondition` carries no question: the session reports its reason to the user and writes nothing.

## pr-spec-line

The first line of the pull request body is `Spec: <spec path>`. The builder writes that line, and the guard reads it to find the spec whose `touches` confine the diff.

## ledger-entry

A ledger entry is one file, `<ledgers>/<kind>/YYYY-MM-DD-slug.md`, written from the template for that kind in this skill's assets; `<ledgers>` is `artefacts.ledgers` in the profile and defaults to `docs/ledgers`. An attestation is the exception: it is named `<acceptance id>-<short commit>.md`. Entries that already exist in another format stay as they are: never convert them and never copy their format.

## questions-close

Questions close by human decision, attested fact or evidence id, never by agent opinion.

## m0

Global M0 is six items the harness owner builds: reproducible build, guard, read wall, execute wall, acceptance job and a machine credential without merge rights. M0 is global M0 plus the verification that closes the P8 `no` rows, and the staging, on the paths and surfaces the near milestones touch.

## floor

Never propose removing or weakening anything in the invariant core (T1 to T6, V1 to V7, the design and release gates, global M0), a registered control (a lens line with source `mandated control`, or a row of `dials.P10.mandated_controls` in the profile), or a component that guards a path or surface at P9 c. Never propose a default if silent at P4 b or c.

## casing

`profile.yml` keys are snake_case. Every other key the kit defines is kebab-case: Markdown frontmatter, ledger entries and the structured output of the four roles.
