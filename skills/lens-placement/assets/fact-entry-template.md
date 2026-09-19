---
ledger: facts
id: YYYY-MM-DD-slug            # the file name without .md
status: draft                  # draft | recorded | attested | expired | voided
                               # draft: written, not yet backed; it counts as `hypothesis`
                               # recorded: a reproduction or quote whose verbatim result is in this entry
                               # attested: an attestation whose `confirmed` field is filled by the rule given at that field
                               # expired: past `valid-until`; voided: withdrawn by the attester or refuted
evidence: reproduction         # reproduction | quote | attestation. Fill that block and delete the other two.
written: YYYY-MM-DD
written-by: ""                 # the skill or person that wrote this entry
written-for: ""                # path of the record, spec, checklist row or lens line that cites it
reproduction:
  command: ""                  # the command or steps, so that someone else can rerun them
  tool-version: ""             # tool and version, and the commit where it matters
  result: ""                   # the verbatim output, or the path of the recorded output
  run-by: ""                   # who ran it
  run-on: ""                   # YYYY-MM-DD
quote:
  source: ""                   # URL, or path with version or commit
  retrieved: ""                # YYYY-MM-DD
  text: ""                     # verbatim; never paraphrase inside a quote
attestation:
  attested-by: ""              # a named person inside the boundary; never an agent
  role: ""
  valid-from: ""               # YYYY-MM-DD, as the person states it; ask, never supply
  valid-until: ""              # YYYY-MM-DD, as the person states it; ask, never supply
  said-where: ""               # pointer: message id, review URL, or path of the note where they said it
  confirmed: ""                # empty until then. The review URL where the person approved this entry; or the words "own commit" when
                               # the person committed the entry themselves. "own commit" counts only when the author of the last commit
                               # that changed this file is that person; a reader without git takes it as recorded and lists it as
                               # unverified. An agent never fills this field.
---

# <The fact, as one statement, in the person's or the source's words where they can be quoted>

<!-- One file per fact: <ledgers>/facts/YYYY-MM-DD-slug.md. Delete this comment. A fact counts as evidence only with status `recorded` or `attested`, and an attested one only between its validity dates; anything else is a `hypothesis`. You never attest for anyone. This entry is for a fact about the outside world or the current system (V7); the attestation of a `judged` acceptance id uses the attestation template instead. -->

## Limits

<What the evidence or the person says it does not cover; "none stated" if none.>

## Renewal

<Attestation only, otherwise delete: who renews or voids it and what triggers that, as the person states it; otherwise "ask again at valid-until".>

## Pointers

<Appended later, newest last: reruns, renewals, entries that supersede this one.>
