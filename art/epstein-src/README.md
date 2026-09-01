# Epstein — social cards

Four cards, 1200×1200. **A different design language from the /the-work/the-load
set, on purpose.**

## The brief, and two corrections

The first attempt reused the campaign poster layout — kicker, serif headline,
mono paragraph, italic pull, framed card. That was a house style applied to
material rather than a response to it, and the specific miss was bad: *cards
about redaction containing no redaction.*

So: the card is a document, not a poster about a document. Paper ground,
typewriter throughout, real black bars, no serif, no frame. Campaign
attribution demoted to a file stamp on the bottom rule. Words cut hard — one
idea per card, roughly twenty words of body.

**Then a second correction, which matters more than the first.** Cutting words
went too far. Three of the four cards never said "Epstein" anywhere legible —
the subject survived only in the small grey URL, so a cold scroller saw black
bars about nothing. Fewer words was the right note; cutting the load-bearing
ones was not.

The fix is a case-file masthead on every card: **THE EPSTEIN FILES** set large
above a hard rule, with the specific document named at the right. It reads at
thumbnail size, unifies the set, and is *more* faithful to the document
language than the tighter version was, because real case files carry a caption.
Any card added later gets the masthead too.

## The cards

1. **`epstein-1-six-copies.png`** — six thumbnails of the same DOJ presentation
   with different lines blacked out in each, then a full-width strip labelled
   ALL SIX, OVERLAID with nothing hidden. The argument is the picture: a rule
   gives the same answer twice, and differential redaction defeats itself.
2. **`epstein-2-direction.png`** — the asymmetry. Victims' names released in
   full; powerful figures as black bars. "The errors all ran one way."
3. **`epstein-3-vote.png`** — 427, huge. Releasing the files was never the
   argument.
4. **`epstein-4-fax.png`** — the compliance report as six empty
   `[TIFF OMITTED]` tiles. "They filed it as a fax."

Recommended lead: **1**, then 2, 4, 3.

## Re-render

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd art/epstein-src
for pair in c1-six:1-six-copies c2-direction:2-direction c3-vote:3-vote c4-fax:4-fax; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1200,1200 \
    --virtual-time-budget=6000 --screenshot="../epstein-${pair##*:}.png" \
    "file://$PWD/${pair%%:*}.html"
done
```

## Sourcing

No real or invented victim names appear on any card. Card 2 uses category
labels and bars precisely so that nothing name-shaped is fabricated or
reproduced.

- **427–1** — House Clerk roll call 289, Nov 18 2025. Grand total 427 yea, 1
  nay, 5 not voting; Republicans 216–1, Democrats 211–0. Read
  `<totals-by-vote>` — the first `<yea-total>` in that XML is a *party
  subtotal* (216), not the total.
- **Six copies** — NPR/OPB, Feb 3 2026: the DOJ presentation "appears six times
  with different information blocked out in each version."
- **The asymmetry** — NPR's review: police reports naming victims released with
  no redactions, while records identifying powerful figures alleged to be
  co-conspirators or material witnesses were heavily redacted.
- **`[TIFF OMITTED]`** — verbatim from the Federal Register plain-text
  rendering of notice 2026-17533; the govinfo PDF carries six
  `/CCITTFaxDecode` streams and no text layer for those pages.
