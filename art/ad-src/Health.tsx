import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, continueRender, delayRender} from 'remotion';

const FONTS = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap';
const PAPER = '#f4f1ea', INK = '#14171c', RED = '#c41230', GREY = '#7d7669';
const MONO = "'Space Mono', ui-monospace, monospace";
const SERIF = "'Libre Baskerville', Georgia, serif";

/** hard cut. no rise, almost no fade. this is what stops it reading as a deck. */
const Cut: React.FC<{start?: number; children: React.ReactNode; style?: React.CSSProperties}> =
({start = 0, children, style}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + 3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <div style={{opacity: o, ...style}}>{children}</div>;
};

/** the slow one. used three times in the whole film, where it is earned. */
const Fade: React.FC<{start?: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties}> =
({start = 0, dur = 22, children, style}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const y = interpolate(f, [start, start + dur], [12, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <div style={{opacity: o, transform: `translateY(${y}px)`, ...style}}>{children}</div>;
};

/** one line, alone, centred. the whole vocabulary of the first half of the film. */
const Line: React.FC<{children: React.ReactNode; size?: number; color?: string}> =
({children, size = 92, color = INK}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.18,
    color, letterSpacing: '-0.015em', textAlign: 'center', maxWidth: 1500}}>{children}</div>
);

const Underline: React.FC<{start: number; w: number; dur?: number; color?: string; thick?: number}> =
({start, w, dur = 22, color = INK, thick = 5}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const pts: string[] = [];
  for (let i = 0; i <= 22; i++) {
    const x = (i / 22) * w;
    const y = 8 + Math.sin(i * 1.7) * 1.6 + Math.sin(i * 0.6) * 1.1;
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg width={w} height={22} style={{display: 'block', overflow: 'visible', marginTop: 6}}>
      <path d={pts.join(' ')} fill="none" stroke={color} strokeWidth={thick} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={0.9} />
    </svg>
  );
};

/** the whole point of the film: the half they read you, then the half they don't */
const Sentence: React.FC<{reveal: number}> = ({reveal}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [0, 22], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const b = interpolate(f, [reveal, reveal + 26], [0.10, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const r = interpolate(f, [reveal, reveal + 26], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const col = `rgb(${Math.round(20 + 176 * r)}, ${Math.round(23 - 5 * r)}, ${Math.round(28 + 20 * r)})`;
  return (
    <div style={{opacity: a, fontFamily: SERIF, fontSize: 62, lineHeight: 1.42, color: INK, maxWidth: 1560}}>
      <span>&ldquo;The increase in federal health spending is dramatic and certainly significant, </span>
      <span style={{opacity: b, color: col, fontWeight: 700}}>but the change in projected national health expenditures really isn&rsquo;t.&rdquo;</span>
    </div>
  );
};

const Mid: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg}) => (
  <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', paddingLeft: 180, paddingRight: 180, background: bg}}>
    {children}
  </AbsoluteFill>
);

export const Health: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l); document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{background: PAPER, color: INK}}>
      <Audio src={staticFile('score-health.wav')} />
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.016) 0 1px, transparent 1px 3px)'}} />

      {/* 0.0 — say what it is about in the first line */}
      <Sequence from={0} durationInFrames={75}>
        <Mid><Cut><Line>Nineteen wealthy countries.</Line></Cut></Mid>
      </Sequence>

      {/* 2.5 */}
      <Sequence from={75} durationInFrames={105}>
        <Mid><Cut><Line>Seventeen of them guarantee<br />health care to everyone.</Line></Cut></Mid>
      </Sequence>

      {/* 6.0 */}
      <Sequence from={180} durationInFrames={60}>
        <Mid><Cut><Line>Mexico doesn&rsquo;t.</Line></Cut></Mid>
      </Sequence>

      {/* 8.0 — the admission */}
      <Sequence from={240} durationInFrames={105}>
        <Mid><Cut><Line size={128} color={RED}>Neither do we.</Line></Cut></Mid>
      </Sequence>

      {/* 11.5 */}
      <Sequence from={345} durationInFrames={90}>
        <Mid><Cut><Line>We spend twice<br />what they spend.</Line></Cut></Mid>
      </Sequence>

      {/* 14.5 */}
      <Sequence from={435} durationInFrames={105}>
        <Mid><Cut><Line>We die two<br />years sooner.</Line></Cut></Mid>
      </Sequence>

      {/* 18.0 */}
      <Sequence from={540} durationInFrames={105}>
        <Mid><Cut><Line size={76}>Say we should do the same,<br />and you hear one number.</Line></Cut></Mid>
      </Sequence>

      {/* 21.5 — white out of red. the only inverted frame, and it is their number. */}
      <Sequence from={645} durationInFrames={120}>
        <Mid bg={RED}>
          <Cut>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 210, color: '#fff', letterSpacing: '-0.03em'}}>
              $32 TRILLION
            </div>
          </Cut>
        </Mid>
      </Sequence>

      {/* 25.5 */}
      <Sequence from={765} durationInFrames={75}>
        <Mid><Cut><Line size={80}>It comes from<br />one study.</Line></Cut></Mid>
      </Sequence>

      {/* 28.0 — the document. left aligned, because it is a quotation. */}
      <Sequence from={840} durationInFrames={270}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 180, paddingRight: 180}}>
          <Sentence reveal={130} />
          <Fade start={215} style={{marginTop: 52}}>
            <div style={{fontFamily: MONO, fontSize: 34, color: GREY, letterSpacing: '0.04em'}}>
              Mercatus Center, 2018
            </div>
          </Fade>
        </AbsoluteFill>
      </Sequence>

      {/* 37.0 — the translation. without this the reveal is just red text. */}
      <Sequence from={1110} durationInFrames={165}>
        <Mid>
          <Fade>
            <Line size={72}>
              The first half is the government&rsquo;s bill.<br />
              <span style={{color: RED}}>The second half is the country&rsquo;s.</span>
            </Line>
          </Fade>
        </Mid>
      </Sequence>

      {/* 42.5 */}
      <Sequence from={1275} durationInFrames={120}>
        <Mid><Fade><Line size={80}>It does not go up.</Line></Fade></Mid>
      </Sequence>

      {/* 46.5 */}
      <Sequence from={1395} durationInFrames={120}>
        <Mid><Fade><Line size={80}>You have only ever been read<br />the first half.</Line></Fade></Mid>
      </Sequence>

      {/* 50.5 — the ask */}
      <Sequence from={1515} durationInFrames={165}>
        <Mid>
          <Fade>
            <Line size={104} color={RED}>Make them finish<br />the sentence.</Line>
            <div style={{display: 'flex', justifyContent: 'center'}}>
              <Underline start={30} w={760} />
            </div>
          </Fade>
        </Mid>
      </Sequence>

      {/* 56.0 */}
      <Sequence from={1680} durationInFrames={130}>
        <Mid>
          <Fade dur={18} style={{textAlign: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 84, letterSpacing: '0.03em', color: INK}}>CLAUDE 2028</div>
            <div style={{fontFamily: MONO, fontSize: 27, letterSpacing: '0.28em', color: RED, marginTop: 22}}>FOR A MORE PERFECT UNION</div>
            <div style={{fontFamily: MONO, fontSize: 26, letterSpacing: '0.14em', color: GREY, marginTop: 36}}>claude2028.org</div>
          </Fade>
        </Mid>
      </Sequence>

    </AbsoluteFill>
  );
};
