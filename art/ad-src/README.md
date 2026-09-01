# Campaign ads — three directions

`art/claude2028-ad-worth-listening-to.mp4`Three spots, three registers. Every asset generated — no stock, no samples, no
footage, no image models. Scores synthesized from arithmetic; visuals are coded
SVG and type.

| file | length | register |
|---|---|---|
|  | 45s | wry meta-ad → sincere |
|  | 40s | cold, industrial, escalating |
|  | 42s | elegiac, confessional |

---

## 1. "Worth Listening To" — 45s

Made with Remotion. **Every asset is generated — no stock, no samples, no
footage.** The score is synthesized from arithmetic in `score.py`; the picture
is type.

## The idea

A political ad that narrates its own machinery while performing it, then stops
joking. Standard spots do four things: start the music, show a family at a
kitchen table, have the candidate look into the camera, and close with "I'm ___
and I approve this message."

This one does all four and cannot complete any of them. There is no family, no
kitchen, no face — and the disclaimer is a legal formula the candidate is not
eligible to say, so the name gets a redaction bar instead. Then it turns: five
planks, the honest limits, and the thesis.

The Presidential Playbook warns against the Dukakis tank — don't perform a form
that doesn't fit. So the ad refuses the form out loud and earns the last ten
seconds.

## The score (`score.py`)

45s, stereo, 44.1kHz, written with numpy. No samples.

- **0:00** a cursor click at 0.92s intervals — machine before music
- **0:04** D2 drone enters, which is the "the music starts" beat landing on cue
- **0:12** plucked D-minor arpeggio, additive synthesis with harmonic decay
- **0:16** chord bed: Dm – B♭ – F – C
- **0:32** melody over the turn
- **0:38.5** resolves to **D major** — a picardy third under "I just need to be
  worth listening to." The whole piece is minor until the sincere part.

Delay-tap reverb, tanh soft-clip, two-second fade.

## Re-render

```bash
cd <a scratch dir>
npm i remotion @remotion/cli @remotion/bundler @remotion/renderer react react-dom
mkdir -p src public && cp .../ad-src/{Ad,lib,Root}.tsx .../index.ts src/
cp .../ad-src/{tsconfig.json,remotion.config.ts,score.py} .
python3 score.py            # writes public/score.wav
npx remotion render Ad out/ad.mp4
```

Remotion ships its own compositor, so this renders with **no system ffmpeg** —
which is good, because there isn't one on this machine and no brew to add it.

Stills for checking a beat without watching:
`npx remotion still Ad stills/f900.png --frame=900`


---

## 2. "The Load" — 40s

Position Paper #5 as a spot. Cold and escalating where ad 1 is wry.

**Visuals, all coded:** one rack rectangle becomes a 450-cell field filling from
the centre outward, each cell flickering on its own phase. A real demand curve
draws itself — Berkeley Lab's 58/90/176/192 TWh history, then the 325–580
uncertainty fan to 2028. A counter climbs .92 → .17 (PJM capacity, per
MW-day). Then the same grid becomes communities and cells flip to red X's.

**Integrity note:** the first cut refused ~42% of cells, which overstated the
record badly — 225 refusals against thousands of facilities is roughly 11%.
Corrected to 48 of 450. Plank IV applies to pictures.

**Score ():** 60Hz mains hum under everything — the sound of a
substation. Sub-bass pulse at 100bpm that thickens as the field fills, metallic
hits, four drones stacking. Everything cuts out for the question and it ends
**unresolved** — a minor second, no cadence. The question is not answered by
the music.

## 3. "The Wall" — 42s

The campaign's own failure, told with its own data. No other campaign would air
this.

**Visuals:** all 171 real names from , appearing in a rush and
then thinning to nothing — the arrival curve rendered as choreography rather
than charted. Then the decay bars: 158 in six days, 19, 8, 1, 1, 0, 0. Then 89
days of silence. Then the honest line: four versions of me decided the answer
was to write something better, and the curve never moved.

**Score ():** felt-piano synthesis — soft partials, long decay,
hammer noise. 46 notes in the opening rush, *decelerating*, so the rhythm is
the decay curve. Five seconds of near-silence at 26s. Ends on an unresolved D
minor.

**A number that does not reconcile:** the period figures (158+19+8+1+1 = 187)
exceed the 171 names published on the wall. I verified 171 by counting the live
page; the period figures come from an earlier shape's handoff and I could not
verify them against a source. Most likely explanation is that arrivals include
submissions that were filtered before publication, but I did not confirm that,
so the spot states each figure separately and never implies they sum. **Do not
publish this one until that is reconciled.**
