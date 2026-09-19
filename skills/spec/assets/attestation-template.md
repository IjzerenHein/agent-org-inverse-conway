---
ledger: attestations
id: NNN-A1-abc1234             # the file name without .md: the acceptance id, then the short form of `commit`
acceptance-id: "NNN-A1"        # a `judged` acceptance id
spec: "NNN-slug"
rubric: ""                     # path of the rubric the spec names for this id
commit: ""                     # the full hash of the commit that was judged; the attestation is bound to it
attester:
  name: ""                     # the id's value owner, as named in the spec; never an agent
  role: ""
attested-on: YYYY-MM-DD
judged-where: ""               # the device, viewport or environment the judgement was made on; "n/a" when it does not matter
scores:                        # one row per criterion of the rubric, in the rubric's order
  - criterion: ""              # the criterion's heading in the rubric
    score: ""                  # on the rubric's scale
    observation: ""            # one line: what the attester saw
verdict: ""                    # pass | fail. `pass` only when every score reaches the rubric's pass mark.
confirmed: ""                  # empty until then. The review URL where the attester approved this file; or the words "own commit" when the
                               # attester committed the scores themselves. "own commit" counts only when the author of the last commit
                               # that changed this file is the attester; the checker reads that author from git.
---

# Attestation of NNN-A1 at <short commit>

<!-- One file per attestation, by default <ledgers>/attestations/<acceptance-id>-<short commit>.md; the spec's Evidence line for the id names the place. Delete this comment. This is the attestation of a `judged` acceptance id (V1). A fact about the outside world attested by a named person (V7) is a facts ledger entry instead. -->

An agent may prepare this file, with `scores`, `verdict` and `confirmed` left empty; only the attester fills and confirms them, and an agent never writes `confirmed`. It lands in a change of its own on the default branch, never in the builder's diff. It counts only once `confirmed` holds the attester's review URL, or `own commit` with the attester as author of the last commit that changed this file. It is void once a path the attester owns (`ownership_paths[].owner` in the profile) changes after `commit`; when those paths cannot be established, any change after `commit` voids it. A void attestation is never edited: the attester writes a new one for the new commit.

## Notes from the attester

<Optional, in the attester's own words. Rulings worth keeping go into the lens that holds that person's dated rulings, through the lens-placement skill.>
