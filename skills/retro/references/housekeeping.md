# Housekeeping: steps 8 and 9 of the retro

Read this in a full retro, when you reach step 8. The paths, the rules and the questions template are those of the skill; this file only holds the detail of the two steps. What you find goes in the Housekeeping section of the retro note, and every proposal becomes a decision row.

## Part A. Step 8: pending acceptance and shipped specs

If the repo does not show whether the project has a post-merge script for these two jobs (closing pending-acceptance entries, moving shipped specs), ask the human.

1. List the open pending-acceptance entries whose `checks[]` are all green on the default branch, each with the id of the run that shows it. Propose each close to the spec's steward as a decision. Never close an entry yourself, and never edit its checks.
2. List the specs that are shipped by the second paragraph below and still sit in the specs folder.
    - Where a post-merge script should have moved them, report them for the harness owner and move nothing.
    - Where no such script exists, prepare the move as an ordinary change, with a history-preserving move.
3. Fix pointers to the old path in one change per owning path; the move goes with its own path's change. A ledger entry that points to the old path gets an appended pointer line, never an edit. Pointers that live in walls are listed for the harness owner.
4. List the other specs with the evidence still missing: the done-state not yet shown, or the pending-acceptance entry still open. Leave withdrawn specs where they are.

<!-- shared:pending-acceptance-close -->
A pending-acceptance entry is closed by the project's post-merge script, with the id of the run in which every listed check passed on the default branch; where no such script exists, the steward closes it in an ordinary change. Closing the entry moves its checks from the pending run into the blocking run. When a spec is withdrawn or superseded, its entry is closed in the change that sets `withdrawn`. No agent closes an entry on its own reading: the retro lists the entries whose checks are green on the default branch and proposes the close to the steward.
<!-- /shared:pending-acceptance-close -->

<!-- shared:shipped-spec -->
A spec is shipped when machine evidence shows its last done-state (the profile's `done_states` table) and no pending-acceptance entry for it is open. One mover then moves it to the shipped folder (`artefacts.specs_shipped`): the project's post-merge script, or where none exists the retro skill, which prepares the move as an ordinary change. Nobody else moves a spec. A spec named in `depends-on` is closed when it is in the shipped folder, or when it is `withdrawn` and no spec's `supersedes` names it; a superseding spec takes the withdrawn one's place in `depends-on`.
<!-- /shared:shipped-spec -->

## Part B. Step 9: expired probes and experiments

1. Read both places: the experiments entries with `status: running`, and the probe specs (the header's `expiry`, and the `expiry-extension` rows in section 9). The expiry in force is the latest extension, else `expiry`, in whichever of the two files you read.
2. List what has an expiry in force of today or earlier. Expiry forces keep or kill, and the deciding human rules: the person or role in the entry's `decides`.
3. A probe spec or an experiment with no entry gets one from `assets/experiment-entry-template.md`, with `type` set to `product` or `ablation` and, for a probe, `spec` filled. Write `unknown` where the human has not said. If an entry and its spec disagree on the expiry in force, show both and ask; never pick one.
4. Keeping a probe means promoting it through a `build` item. A kill creates a `retire` item. For an ablation, keep means the component is restored and kill means it is retired through a `retire` item. Draft either through the spec skill. Record the ruling in `outcome`, the item in `follow-up`, and set `status` to `kept` or `killed`.
5. If the human extends instead, append the extension to the entry's `extensions` (`date`, `new-expiry`, `reason`, `decided-by`).
    - When `spec` is filled, prepare ONE change, of its own on the default branch, that appends the extension to the entry and as an `expiry-extension` row in the spec's section 9, with the same date, new expiry and decider, so that the two files never differ.
    - Never edit the `expiry` in the spec header or in the entry.
    - Show the number of earlier extensions in the note.
    - Never re-date anything yourself.
