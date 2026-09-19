# After approval

What happens to a spec once it is approved, and the little this skill still does. What counts as approved is stated in `SKILL.md`, after step 13.

## What may change

Only two places change in an approved spec: the header's `withdrawn` and section 9. Everything else stays as approved. When intent, scope or an acceptance value must change, withdraw the spec and write a new one (below).

Section 9 takes three kinds of row. Each row is a pointer, never a summary, and each lands in a change of its own on the default branch, never on a builder's branch: otherwise the guard sees a path outside `touches` and the checker reports the spec as changed in the diff.

| Kind | What the row points to | Who appends it |
|---|---|---|
| `question` | the questions ledger entry made from a builder's blocked question | the session that started the builder |
| `learning` | a finding, an escape, a record or an evidence id | this skill, the build skill or the retro skill, as an ordinary change |
| `expiry-extension` | probe only: the date, the new expiry and who decided | the retro skill |

### A builder's blocked question

<!-- shared:blocked-question-return -->
A builder's `blocked` report of kind `question` becomes one questions ledger entry with `blocking: true`, written by the session that started the builder, which also appends a pointer to the entry in the spec's section 9. Both land in a change of their own on the default branch, never on the builder's branch. Once the entry is closed, a fresh builder is started from the spec path, on a branch that contains both, and reads the answer in the entry. An answer that changes intent, scope or an acceptance value is never appended: the spec is `withdrawn` and a new spec supersedes it. A `blocked` report of kind `precondition` carries no question: the session reports its reason to the user and writes nothing.
<!-- /shared:blocked-question-return -->

The build skill does this when it started the builder. When a builder was started without it and you are asked to file its question, write the entry from `assets/question-entry-template.md`: `raised-by` names the builder and the spec id, `can-answer` is the `owner` of the builder's report, and `blocks` is the spec section or acceptance id it names.

### A probe's expiry

The header's `expiry` is never edited. An extension is an `expiry-extension` row, decided by a human. The retro skill prepares it in one change that appends the row here and, where an experiments ledger entry names this spec, the same extension to that entry's `extensions`. Every reader takes the latest extension, else the header's `expiry`. Asked to extend a probe, hand over to the retro skill.

## Withdrawing or superseding

When intent, scope or an acceptance value changes, prepare one change that:

1. sets `withdrawn` on the old spec: the date and a pointer to the reason (the closed questions entry, the record, or the owner's words with name and date);
2. closes the old spec's pending-acceptance entry, if one is open: `status: closed`, `closed-on`, `closed-by` with the steward's name, and `closed-pointer` equal to the spec's `withdrawn` pointer. This is the one case in which this skill closes such an entry.

Then write the new spec with this skill from step 1, with `supersedes` set to the old id. The new spec is approved like any other.

## Pending acceptance

<!-- shared:pending-acceptance-close -->
A pending-acceptance entry is closed by the project's post-merge script, with the id of the run in which every listed check passed on the default branch; where no such script exists, the steward closes it in an ordinary change. Closing the entry moves its checks from the pending run into the blocking run. When a spec is withdrawn or superseded, its entry is closed in the change that sets `withdrawn`. No agent closes an entry on its own reading: the retro lists the entries whose checks are green on the default branch and proposes the close to the steward.
<!-- /shared:pending-acceptance-close -->

## Building

This session does not build the item. The build skill carries the approved spec on: one builder, started in a fresh context from the spec's path and nothing else, then machine evidence, the checker and the gate the profile names. If the build skill is not installed, tell the user that the builder takes the spec path as its only input.

## Shipped specs

<!-- shared:shipped-spec -->
A spec is shipped when machine evidence shows its last done-state (the profile's `done_states` table) and no pending-acceptance entry for it is open. One mover then moves it to the shipped folder (`artefacts.specs_shipped`): the project's post-merge script, or where none exists the retro skill, which prepares the move as an ordinary change. Nobody else moves a spec. A spec named in `depends-on` is closed when it is in the shipped folder, or when it is `withdrawn` and no spec's `supersedes` names it; a superseding spec takes the withdrawn one's place in `depends-on`.
<!-- /shared:shipped-spec -->

This skill never moves a spec. If a spec whose done-states are all met still sits in the specs directory, tell the steward and name the retro skill.
