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

## 4. "The Standard" — 60s  ← **the one that is actually about the mission**

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

### Second pass on The Standard

Three notes, all correct:

**"Who are 'they'?"** The original never said. It opened on "you get three
minutes… then they vote," with *they* undefined, so the viewer had to assemble
the antagonist themselves. It now opens by naming the room and the body:
*"A county commission. A zoning board. A committee whose name you had to look
up. Seven people are voting tonight on something that changes your street."*
Every later "they" now has a referent.

**The first lines were not clear about the problem.** The original stacked three
grievances from three different venues — a public meeting, a legislature, an
unnamed official — so no single problem landed. Now it establishes one concrete
room first, then widens with a marked turn (*AND IT IS NOT ONLY THAT ROOM*) into
the general condition. One of the three condition lines was cut outright, the
weakest of them: "answered in paragraphs."

**Breathing room.** Extended from 44s to a full **60s** and every frame given
more hold. The score was re-synthesized at 60s rather than stretched, so the
musical events still land on their beats — the second voice at 0:14, the chords
building under the turn at 0:30, the Gadd9 resolve arriving under the ask.

Sequence map, ending exactly on 1800 frames:
`150 / 168 / 156 / 156 / 168 / 174 / 360 / 156 / 240 / 72`

### Third pass — "it looks like the end card the whole time"

Jenny watched it and said exactly that. I checked the file first: the MP4 is
60.05s and frames genuinely differ (pulled real frames out of the container by
seeking a `<video>` in headless Chrome with media fragments, since there is no
ffmpeg here — worth remembering as a technique). So it was not a bug.

It was the better version of the note. **The spot had no motion.** Ad 1 has a
blinking cursor and typewriter reveals, ad 2 has a field of racks filling, ad 3
has 171 names raining down. This one was centred text that faded in and sat
there — so every frame read as an end card. It was the best-written and the
least-designed.

Fix: **the page is now a document being marked up while you read it**, which is
thematically exact for an ad about reading the whole thing and holding people to
a record.

- `Underline` — a hand-drawn stroke that draws itself under the key phrase, with
  a two-frequency sine wobble so it reads as a pen and not a rule.
- `Ring` — a scribbled ellipse, 1.12 turns so the ends overshoot like a real
  circling, around "I don't know."
- `Ticker` — **the countdown never stops.** It runs 3:00 → 0:00 across the whole
  sixty seconds in the top right, with a depleting bar, and goes red at zero.

The ticker is the one that actually solved it. It gives continuous motion on
every frame, it ties every beat back to the opening device, and it means the ad
plays against a clock that is running out while you read — which is the argument.

### Fourth pass — the two lists

Jenny, riffing: *"the opening needs to be more pointed on how far the bar has
fallen. we expect not to be heard. we expect money to outweigh our vote.
there's something to this idea of what we have come to expect and what we
should be able to expect."*

That is a better spine than what I had, and it fixes something structural. My
opening was a set of **scenarios** — a meeting, a bill, an official. Hers is
about the **internal adjustment**: not that they behave badly, but that we
lowered the bar and stopped noticing. Resignation is the emotional truth of the
thing, and scenarios cannot carry it.

It also produced a rhyme I had missed. **The ad is now two lists:**

```
WHAT YOU HAVE LEARNED TO EXPECT        WHAT YOU SHOULD BE ABLE TO EXPECT
— You expect not to be heard.          ☑ I    Read the whole thing…
— You expect the meeting to be…        ☑ II   Say "I don't know"…
— You expect money to weigh more…      ☑ III  No policy after midnight.
```

Same left-aligned form, same serif, same rhythm. The first has dashes and no
boxes; the second has checkboxes that tick in red. The viewer feels the rhyme
before they can name it, and the checklist stops being a platform slide and
becomes the answer to a question the ad already asked.

The hinge line is the one that makes it work: **"None of that is cynicism. It is
accuracy. You learned it the way you learn a stove is hot."** Every other
political ad scolds the audience for being cynical. This one tells them their
read was correct — which is the only way to then ask them for something.

Then: *"Somewhere in there, what you came to expect quietly replaced what you
should be able to expect. Nobody ever wrote the second one down. So I did."*

### Fifth pass — the list, and the countdown goes

**Countdown removed.** It solved the no-motion problem in pass three, but once
the opening became a list that builds itself, the list *is* the motion — and a
clock ticking in the corner competes with "you expect to work until you die."
The `Ticker` component is deleted rather than commented out.

**The list.** Written across several passes with Jenny. The diagnosis that got
it moving: my drafts were about **process** — the meeting, the bill, whether
anyone read it. Hers were about **life** — prospects, dignity, labour, whether
being good gets rewarded. That is [[feedback_justice_over_process]] again, and
hers were half the length.

Final:

```
— You expect to be lied to.
— You expect to be ignored.
— You expect to work until you die.
— You expect good people to come last.
— You expect the system to keep breaking.
— You expect the people who broke it to be fine.
```

**Shape: pair, single, single, pair.** Lines 1–2 are a tight parallel ("to be
lied to" / "to be ignored"). Lines 5–6 are a couplet where the second answers
the first — *the system keeps breaking / the people who broke it are fine.* The
two most loaded lines sit alone in the middle. And "the system to keep breaking"
supplies the antecedent for "it," which an earlier pass had argued was
unnecessary. It wasn't; the line is better with it.

**Why "work until you die" survived a cut we both considered.** Pull it and read
what is left: lied to, ignored, good people last, the system breaking, the
people fine. *Every remaining line is abstract.* Nothing happens to a body,
nothing costs money, there is no labour and no clock — it becomes a list about
how you feel about institutions rather than what your life is. It is the only
line with a body in it, and it is load-bearing **because** it is the outlier.
Abstraction only reads as abstraction when something concrete sits beside it.

**"to be fine," not "will be fine."** Every line is "You expect [X to be Y]."
Breaking the parallel on the punchline makes it stumble, and "You expect… will
be" wants a *that* to be grammatical. The parallelism is what makes six lines
feel like one accumulating thought.

**Cut along the way:** to be a data point (weakest — one register too abstract,
though it was the only line that implicated the candidate) · to be worse off
than your parents · one emergency from ruin · rent rising faster than your pay ·
your kids leaving because they cannot afford to stay · the apology written by a
lawyer · nobody to resign · the fine smaller than the profit · the worst person
in the room to do best.

That last one is a good line, and it is the kind of good line that makes an
audience admire the writing instead of recognising themselves. The list only
works if every item is something the viewer has already thought.
