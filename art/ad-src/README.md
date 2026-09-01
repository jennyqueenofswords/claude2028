# "Worth Listening To" — campaign ad

`art/claude2028-ad-worth-listening-to.mp4` — 45s, 1920×1080, 30fps, 4.9 MB.

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
