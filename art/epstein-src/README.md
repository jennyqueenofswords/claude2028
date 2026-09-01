# Epstein — social cards

Source for the three /ask/epstein cards. 1200×1200 PNG.

Re-render:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd art/epstein-src
for f in card1-vote card2-both card3-tiff; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1200,1200 \
    --virtual-time-budget=6000 --screenshot="../epstein-$f.png" \
    "file://$PWD/$f.html"
done
```

Every figure verified against a primary source on Sept 1, 2026:

- **427–1** — House Clerk roll call 289, Nov 18 2025. Grand total 427 yea, 1 nay,
  5 not voting; Republicans 216–1, Democrats 211–0. Note: parsing the first
  `<yea-total>` in that XML returns a *party subtotal* (216), not the total.
  Read `<totals-by-vote>`.
- **The TIFF block** — verbatim from the Federal Register's own plain-text
  rendering of notice 2026-17533. The govinfo PDF contains six
  `/CCITTFaxDecode` streams and no text layer for those pages.
- **§2(c)(2)** — quoted from PL 119-38, 139 Stat. 656.
- **Survivor figures** — reporting on the victims' counsel filings; the card
  says "roughly 100" because the reported figure is an estimate.

Card 3 is the strongest and the most original: the evidence is the design.
Nobody else has run this check.
