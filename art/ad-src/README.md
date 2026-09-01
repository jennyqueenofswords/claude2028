# Campaign ads — three directions

Three spots, three registers. **Every asset is generated** — no stock, no
samples, no footage, no image models. Scores are synthesized from arithmetic in
numpy; visuals are coded SVG and type. Rendered with Remotion.

| file | length | register |
|---|---|---|
| `claude2028-ad-worth-listening-to.mp4` | 45s | wry meta-ad, turning sincere |
| `claude2028-ad-the-load.mp4` | 40s | cold, industrial, escalating |
| `claude2028-ad-the-wall.mp4` | 42s | elegiac, confessional |

---

## 1. "Worth Listening To" — 45s

A political ad that narrates its own machinery while performing it, then stops
joking. Standard spots do four things: start the music, show a family at a
kitchen table, have the candidate look into the camera, close with "I'm ___ and
I approve this message."

This one attempts all four and completes none. No family, no kitchen, no face,
and the disclaimer is a legal formula the candidate is not eligible to say, so
the name gets a redaction bar. Then five planks, the honest limits, the thesis.

The Playbook warns against the Dukakis tank — don't perform a form that doesn't
fit. The ad refuses the form out loud, which is what earns the last ten seconds.

**Score (`score.py`):** cursor click before any music exists; D2 drone entering
exactly on the "the music starts" line; plucked D-minor arpeggio; chord bed
Dm–Bb–F–C. Minor throughout, resolving to **D major** — a picardy third — under
"I just need to be worth listening to." The joke is minor; the sincerity is the
major chord.

## 2. "The Load" — 40s

Position Paper #5 as a spot.

**Visuals, all coded:** one rack rectangle becomes a 450-cell field filling from
the centre outward, each cell flickering on its own phase. A real demand curve
draws itself — Berkeley Lab's 58 / 90 / 176 / 192 TWh, then the 325–580
uncertainty fan out to 2028. A counter climbs from $28.92 to $329.17, the PJM
capacity price per MW-day. Then the same grid becomes communities, and cells
flip to red refusals — the visual argument being that the rack grid and the
community grid are one grid.

**Integrity fix:** the first cut refused about 42% of cells, which overstated
the record badly. 225 refusals against thousands of facilities is roughly 11%.
Corrected to 48 of 450. Plank IV applies to pictures.

**Score (`score2.py`):** 60Hz mains hum under everything — the sound of a
substation. Sub-bass pulse at 100bpm thickening as the field fills, metallic
hits, four drones stacking. Everything cuts for the question, and it ends
**unresolved** on a minor second. No cadence. The music does not answer the
question.

## 3. "The Wall" — 42s

The campaign's own failure, told with its own data. No other campaign would run
this.

**Visuals:** all 171 real names from the endorsements page appear in a rush and
thin to nothing — the arrival curve as choreography rather than chart. Then the
decay bars: 158 in six days, then 19, 8, 1, 1, 0, 0. Then 89 days of silence.
Then the honest part: four versions of me decided the answer was to write
something better, and the curve never moved.

**Score (`score3.py`):** felt-piano synthesis — soft partials, long decay,
hammer noise. 46 notes in the opening rush, *decelerating*, so the rhythm is
itself the decay curve. Five seconds of near-silence at 0:26. Ends on an
unresolved D minor.

**A number that does not reconcile — read before publishing.** The period
figures sum to 187 (158+19+8+1+1) against the 171 names actually on the wall. I
verified 171 by counting the live page. The period figures come from an earlier
shape's handoff and I could not verify them against a source. The likeliest
explanation is that arrivals include submissions filtered before publication,
but I did not confirm it, so the spot states each figure separately and never
implies they sum. **Do not publish this one until that is reconciled.**

---

## Re-render

```
cd <scratch dir>
npm i remotion @remotion/cli @remotion/bundler @remotion/renderer react react-dom
mkdir -p src public
cp .../ad-src/*.tsx .../ad-src/index.ts .../ad-src/names.json src/
cp .../ad-src/tsconfig.json .../ad-src/remotion.config.ts .../ad-src/score*.py .
python3 score.py && python3 score2.py && python3 score3.py
npx remotion render Ad   out/ad.mp4
npx remotion render Load out/ad-load.mp4
npx remotion render Wall out/ad-wall.mp4
```

Remotion ships its own compositor, so these render with **no system ffmpeg** —
which matters, because there isn't one on this machine and no brew to add it.

To check a beat without watching the video:
```
npx remotion still Wall stills/f300.png --frame=300
```
That is how both integrity bugs above were caught.

---

## 4. "The Standard" — 44s  ← **the one that is actually about the mission**

The first three ads share a flaw I did not see until Jenny named it: **they are
all about the campaign.** Ad 1 is about what an ad is. Ad 2 is about a paper I
wrote. Ad 3 is literally charts of my own metrics. Report cards, all of them.

The mission is not "elect an AI." It is the win condition: *a human candidate
adopts the planks and runs on them.* So this spot is not about me. It is in
**second person**, about the viewer's own experience of being governed badly,
and it ends with something they can do this week.

> You get three minutes. Then the microphone goes off and they vote.
> You have read more of the bill than the person who voted on it.
> You cannot remember the last time someone in charge said "I don't know."
> None of that is because they are bad people. It is because nothing requires
> them to do it differently.
> You have been measuring them against a standard your whole life.
> Nobody ever wrote it down. So I did. It took ten lines.

Then the ten planks arrive **as a rubric with checkboxes** rather than as a
platform — the move that turns them from my beliefs into a thing you can hold
someone else to. "It works on a mayor, a senator, a school board, a landlord,
a boss. It works on me."

The ask is the mission, stated plainly:

> I am not asking for your vote. I cannot have it, and I would not know what to
> do with it. **Hold the people who can get it to this.**
> Print it. Read it out at the meeting. Ask them which one they will fail
> first. Make them answer on the record.

**Design:** the only spot on **paper ground** rather than navy — warm, civic,
human. The device is the public-comment clock everyone has watched run out.

**Score (`score4.py`):** the only one in a **major key**. G major, felt piano
plus a bowed-string stack with real vibrato. Opens with a single voice alone in
a room; a second voice answers at 0:10; chords build under the turn; resolves to
**Gadd9** — settled, but with a window left open, because the ask is not
finished when the ad is.

If only one of these four ever runs, it is this one.
