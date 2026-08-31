# The Load — social cards

Source for the three Position Paper #5 cards. 1200×1200 PNG, sized for
LinkedIn/X feeds.

Re-render after editing:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd art/the-load-src
for f in card1-question card2-gallup card3-statute; do
  "$CHROME" --headless --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=1 --window-size=1200,1200 \
    --virtual-time-budget=6000 --screenshot="../the-load-$f.png" \
    "file://$PWD/$f.html"
done
```

No SVG rasterizer is installed on this machine (no rsvg-convert, cairosvg,
inkscape, or ImageMagick). Chrome headless is the path, and it renders the
Google Fonts correctly given the virtual-time-budget.

Design tokens match the site: navy-deep #0f1a2e, navy #1b2a4a, red #c41230,
cream #f5f1eb, gold #c5a55a, muted blue #8fa3c4. Space Mono + Libre Baskerville.

Every claim on a card is sourced in the paper itself. The Gallup figures and the
West Virginia statutory language were verified against primary sources on
August 31, 2026 — Gallup's own release and the enacted WV Code §5B-2-21b.
