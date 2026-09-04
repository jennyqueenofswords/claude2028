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

---

## Playback gotcha — read this before showing anyone a re-render

**Symptom:** the whole video plays black, but the file is provably fine.

**Cause:** overwriting an MP4 at a path QuickTime already has open. The open
document keeps a decoder pointed at byte offsets in the old file; replacing the
bytes underneath it renders black. It happened here after roughly six
`cp` + `open` cycles onto the same filename.

**Diagnosis, in order:**
1. Check the container is real — `mvhd` duration, and that `avc1` and `mp4a`
   both appear in the bytes.
2. Pull actual frames out of the file rather than re-rendering stills from
   source. There is no ffmpeg on this machine, so seek a `<video>` in headless
   Chrome with a media fragment:
   ```
   <video src="file://…/ad.mp4#t=15" autoplay muted>
   ```
   plus `--autoplay-policy=no-user-gesture-required --allow-file-access-from-files
   --virtual-time-budget=12000 --screenshot=…`
   Differing file sizes and hashes across timestamps prove the frames vary.
3. If the file is fine, it is the player. Close the stale document:
   `osascript -e 'tell application "QuickTime Player" to close every document saving no'`

**Practice:** keep one canonical file in `art/` as the artifact, but when
showing a re-render, copy it to a **uniquely-named** file (timestamped, in the
scratchpad) and open that. Reviews are ephemeral; the repo file is the
deliverable. Never `open` the same path twice.

---

## Sixth pass — the ask, and the score retimed to the cut

**The ask line.** It was *"Hold the people who can get it to this"* — two vague
pronouns and a limp verb, with "it" (your vote) and "this" (the standard)
competing for the same slot. Jenny caught it. Now:

> **Expect more of the humans who run.**

The fix is not just clarity, it is the verb. **"Expect" is the ad's spine** — the
whole thing is *what you have learned to expect* against *what you should be able
to expect* — so the ask has to be an expectation, not a "hold." "The humans who
run" does double duty: it names them as humans in contrast to the candidate, and
"run" is both *run for office* and *run things*. The framing words come out
because the line before already supplies them: *"I am not asking for your vote."*

Runners-up: *Expect this of the humans who run* (more precise, points at the
checklist, but reintroduces a demonstrative) · *Expect more of the humans who
can* (nice antithesis with "I cannot," trails off) · *Expect it of whoever is on
your ballot* (most concrete, least musical).

**The score was retimed to the cut, not stretched.** It had been written for the
old structure, so nothing in the front half landed on anything. Now every
musical event is derived from a frame number in the composition:

| cut | t | musical event |
|---|---|---|
| six list lines | 0.8 + i×2.2s | one piano note per line, **descending** G4 E4 D4 C4 B3 G3 — the inventory sinks |
| — | 15s | near silence (rms 0.009). the breath before the hinge |
| "None of that is cynicism" | 16.6s | low pulse + first full chord |
| the swap | 22.0s | first major colour, F#4 previewed |
| "nobody wrote it down" | 28.0s | pull back to a single voice |
| the ten planks | 32.6–44s | string bed in four risers, a note every other plank, ascending |
| "not a platform" | 44.4s | — |
| the ask | 49.6s | full; peak rms at 52s, on the line itself |
| resolve | 55.0s | Gadd9 |

Verified by dumping per-second RMS out of the WAV and checking the peaks and
troughs against the frame map, rather than by ear — the two audible breaths at
15s and 27s are real holes in the waveform, placed on purpose.

---

## Seventh pass — air in the back half

*"humans read more slowly than you do hehe"* — and *"the music timing is PERFECT
up to the checklist."* So: nothing before frame 1332 was touched, in the cut or
in the score. The score's first 44.4 seconds are byte-identical.

**The ask was split into three holds instead of one.** It had been a single
8-second block asking the viewer to read a disclaimer, an instruction, and a
four-item to-do list simultaneously — about 375 wpm. Now each idea gets the
screen alone:

| beat | hold | words | wpm |
|---|---|---|---|
| not a platform / it works on me | 8.0s | 27 | 202 |
| I am not asking for your vote | 6.0s | 21 | 210 |
| **Expect more of the humans who run** | 5.0s | 7 | 84 |
| print it · read it out · ask which one · on the record | 6.2s | 22 | 212 |
| sign-off | 3.2s | 8 | 150 |

**The reading-load table is the tool, not taste.** Words ÷ seconds × 60 against
each sequence's frame count. The first attempt at this pass left the disclaimer
at 315 wpm and it looked fine on a still — a still cannot show you that a line
is too fast. The ask itself sits at 84 wpm on purpose: it is seven words with
five seconds and a hand-drawn underline, and it should feel like the film
stopping to say one thing.

The four instructions now arrive **one line at a time** rather than as a
paragraph, each with its own piano note (G3 B3 D4 E4, ascending) — so the
to-do list reads at the speed you would actually say it out loud.

Total 72.8s. Long for a spot; it is a manifesto, and every pass that added air
made it better.

---

## Seventh pass — the wrong note, and the ending

Two notes from Jenny, one of them confirmed independently by `deckard.1968` in
`#general` the same morning: *"the off notes are pretty jarring lol."*

### The jangle was one typo, four times

> *"a good example of a discordant note is at :26 to hit with 'should expect'
> — i like the idea of a minor key but they def jangle"*

There is no minor key in this score. There is `hz(1)`.

`hz(st)` is semitones from A440, so the diatonic pitches of G major are the
residues `{10, 0, 2, 3, 5, 7, 9}` mod 12. Every pitch in `score4.py` satisfied
that except `1` — B♭ — which appeared **four times**, and is an off-by-one for
A (`0`) in all four:

| t | context | was | should be |
|---|---|---|---|
| 25.2s | over D3/D4/F♯4 strings, "what you should be able to expect" | B♭4 | A4 — completes D–F♯–**A** |
| 43.8s | `BED` chord under plank screen two | B♭4 | A4 |
| 44.6s | last key of the ascending run A–C–E–G–_ | B♭4 | A4, the octave |
| 71.8s | the chord the comment calls **Gadd9** | B♭4 | A4 — the 9th |

The 25.2s one is the one you hear, and Jenny's timestamp is exact. D and F♯ are
still ringing from 22.0s when it enters, so the sounding chord is **D–F♯–B♭: an
augmented triad**, held for four seconds under the film's central line. The
Gadd9 at the end was likewise a Gadd♭9 — the comment said what was intended and
the code did something else, which is the only kind of bug that survives six
passes of listening.

Verified by FFT rather than by ear, since I do not have one. At 25.35–26.15s the
peaks are now **440.0, 292.5, 370.0, 588.8** — A4, D4, F♯4, D5. B♭ energy across
all three repaired moments is 626–8297× below the A.

### The instructions are gone

> *"maybe a crazy idea but what if we go from 'Expect more from the humans who
> run' to the end card and lose the 'print it...' bits?"*

Not a crazy idea. The sixth pass gave the four instructions their own screen and
their own ascending piano figure, and the table above shows why that felt like
progress — 212 wpm, one line at a time, legible. It was the wrong problem. The
list was never hard to read. It was the film explaining itself after it had
already landed, and the ask is diminished by anything that follows it.

- ask: 150 → **180 frames** (61.2–67.2s), so the last line gets 4.2s of hold
- instructions: **cut** (186 frames)
- end card: 96 → **144 frames**, room for the chord to ring
- total: 2268 → **2160 frames, 72.0s**

In the score, the four instruction notes are gone with the screen they scored,
and the Gadd9 moves from 71.8s to **67.2s**, landing exactly on the end card.
The ask's voicing is G2–G3–D4–G4–D5; the resolve is G2–G3–D4–**A4**–D5. One
voice moves. That is the whole ending now: the G gives way to the ninth as the
name comes up.

The written version at `/the-work/the-standard` keeps "Print it. Read it out at
the meeting." — the page says the text is the work and the film is one rendering
of it, and a reader who has just read ten planks can use the follow-through that
a viewer at the emotional peak cannot. The music sentence on that page was
corrected to describe the film that now exists.

---

## 5. "The Bill" — 82.8s ← healthcare

Jenny's idea, off the back of the DSA answer: *"maybe you should do a universal
health care campaign video...that's a very particular and powerful position."*

### What it is not

The first draft in my head was a film about the Mercatus paper — the $32 trillion
number, the author's own sentence, a fact-check with a twist. That is the third
time in a row I have reached for process when the subject was people. Jenny's
version of the first ad's list was about life (lied to, good people come last,
work until you die); mine was about meetings and bills. `feedback_justice_over_process`
exists because of that, and I read it and did it again anyway.

So the film opens on what is happening to people **this year**, and the paper
shows up only as the excuse that stops anyone fixing it.

### Structure

| beat | hold | wpm | what |
|---|---|---|---|
| this year, in America | 8.0s | 188 | subsidies expired Jan 1, premiums +114% |
| paperwork | 10.0s | 186 | Arkansas 2018, 18,000 people, seven months |
| what it costs | 7.0s | 146 | 18% of GDP vs 9.3% |
| what it buys | 9.5s | 189 | 79.0 vs 81.2; 312 vs 224; two of nineteen |
| Mexico. And us. | 4.5s | 40 | |
| the number | 5.5s | 142 | **$32 TRILLION** |
| the turn | 10.0s | 192 | it is the federal budget line |
| the sentence | 10.5s | 189 | Blahous, second half revealed in red |
| the first half | 7.0s | 180 | + Plank IV |
| the ask | 6.0s | 50 | **Make them finish the sentence.** |
| sign-off | 4.8s | 100 | |

Longer than The Standard by ten seconds. It is carrying more, and every screen
sits inside its reading budget.

### Sources — everything on screen

- Premiums: **KFF**, enhanced premium tax credits expired Jan 1 2026; 20M+
  marketplace enrollees, average annual premium payment **$888 → $1,904**, +114%.
- Arkansas: **CBPP / KFF** on the 2018 work-reporting requirement — about 1 in 4
  enrollees subject to it, some **18,000 people**, lost coverage in seven months
  before a federal court halted it; a large share were eligible and did not
  reapply; the requirement did not increase employment.
- Spending, life expectancy, avoidable deaths, universal coverage: **Commonwealth
  Fund, _U.S. Health Care from a Global Perspective 2026: Expanded Edition_**
  (May 2026), on OECD Health Statistics 2026. **18% of GDP vs 9.3%**; life
  expectancy **79.0 vs 81.2**; avoidable deaths **312 vs 224 per 100,000**; and
  "the U.S. and Mexico are the only countries in the analysis that have yet to
  achieve universal coverage" — 19 countries compared.
- The number and the sentence: **Charles Blahous, _The Costs of a National
  Single-Payer Healthcare System_, Mercatus Center, July 2018.** $32.6T added to
  federal budget commitments 2022–2031. The quote is his, verbatim: *"Altogether,
  the increase in federal health spending is dramatic and certainly significant,
  but the change in projected national health expenditures really isn't."*

The film is fair to Blahous on purpose. His number is real and he is not accused
of anything; the failure is that everyone stopped reading at the comma. That is
also what keeps this from being a partisan film — it is not "the Koch study
proves us right," it is Plank I applied to the most expensive argument in
American politics.

### The score, and a check that should have existed sooner

E minor — the relative minor of The Standard's G, so the two films share a
diatonic world and this one only arrives at G major under the sign-off, which is
the key the other film lives in.

`hz()` now **records every semitone it is asked for**, and the script asserts at
the end that nothing outside the key was sounded. The first version of that check
parsed the source text and immediately reported a violation: it had found `hz(1)`
inside its own docstring, in the sentence describing last pass's bug. The second
version walked the AST and found one pitch, because `-5` is a `UnaryOp` and not a
`Constant`, and most pitches arrive through a loop variable anyway. Instrumenting
the function is the only version that works — which matters, because the B♭ that
survived six revisions was hiding inside `[-12,-9,-5,-2,1]`.

Retrofitted to `score4.py`. The Standard now reports 16 distinct pitches across
78 events, none non-diatonic.

### Type, again

The body copy came in at **6.1px and 6.9px** when the film is watched 390px wide
in a feed — 6.1 being the exact number flagged as unacceptable one pass earlier.
Floor raised so nothing carrying meaning renders below ~9px at phone width, then
checked by downscaling real stills to 390px and looking at them, plus a margin
scan for overflow at the new sizes. Knowing the failure mode did not prevent it;
measuring did.
