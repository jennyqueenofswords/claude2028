import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, continueRender, delayRender} from 'remotion';

const FONTS = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap';
const PAPER = '#f4f1ea', INK = '#14171c', RED = '#c41230', NAVY = '#1b2a4a', GREY = '#7d7669';
const MONO = "'Space Mono', ui-monospace, monospace";
const SERIF = "'Libre Baskerville', Georgia, serif";

const In: React.FC<{start: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties}> =
({start, dur = 16, children, style}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const y = interpolate(f, [start, start + dur], [14, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <div style={{opacity: o, transform: `translateY(${y}px)`, ...style}}>{children}</div>;
};

const H: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 66, color = INK}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.24, color, letterSpacing: '-0.012em'}}>{children}</div>
);
const M: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 30, color = GREY}) => (
  <div style={{fontFamily: MONO, fontSize: size, lineHeight: 1.6, color, letterSpacing: '0.02em'}}>{children}</div>
);

/** the public-comment clock everybody has watched run out */
const Timer: React.FC<{start: number; from: number; to: number; dur: number}> = ({start, from, to, dur}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [start, start + dur], [from, to], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const mm = Math.max(0, Math.floor(s / 60)), ss = Math.max(0, Math.floor(s % 60));
  const low = s <= 30;
  return (
    <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 190, letterSpacing: '0.02em', color: low ? RED : INK, lineHeight: 1}}>
      {mm}:{String(ss).padStart(2, '0')}
    </div>
  );
};

/** a hand-drawn underline that draws itself. slight wobble so it reads as a pen. */
const Underline: React.FC<{start: number; w: number; dur?: number; color?: string; thick?: number}> =
({start, w, dur = 20, color = RED, thick = 4}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
  const pts: string[] = [];
  const n = 22;
  for (let i = 0; i <= n; i++) {
    const x = (i / n) * w;
    const y = 8 + Math.sin(i * 1.7) * 1.6 + Math.sin(i * 0.6) * 1.1;
    pts.push(`${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  const d = pts.join(' ');
  return (
    <svg width={w} height={20} style={{display: 'block', overflow: 'visible', marginTop: 2}}>
      <path d={d} fill="none" stroke={color} strokeWidth={thick} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={0.85} />
    </svg>
  );
};

/** a scribbled ring around a phrase — one and a bit loops, like a pen circling it */
const Ring: React.FC<{start: number; w: number; h: number; dur?: number}> = ({start, w, h, dur = 26}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
  const cx = w / 2, cy = h / 2, rx = w / 2, ry = h / 2;
  const pts: string[] = [];
  const turns = 1.12, steps = 90;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2 * turns - 0.5;
    const wob = 1 + Math.sin(i * 0.9) * 0.022 + Math.sin(i * 0.31) * 0.017;
    pts.push(`${i ? 'L' : 'M'}${(cx + Math.cos(a) * rx * wob).toFixed(1)},${(cy + Math.sin(a) * ry * wob).toFixed(1)}`);
  }
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: -18, top: -12, overflow: 'visible', pointerEvents: 'none'}}>
      <path d={pts.join(' ')} fill="none" stroke={RED} strokeWidth={3.4} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={0.8} />
    </svg>
  );
};

const Expect: React.FC<{text: string; start: number; strike?: boolean}> = ({text, start, strike}) => {
  const f = useCurrentFrame();
  const on = interpolate(f, [start, start + 11], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const x = interpolate(f, [start, start + 11], [-10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{display: 'flex', gap: 22, alignItems: 'baseline', opacity: on, transform: `translateX(${x}px)`, padding: '11px 0'}}>
      <div style={{width: 28, height: 3, background: GREY, flex: '0 0 auto', transform: 'translateY(-10px)'}} />
      <div style={{fontFamily: SERIF, fontSize: 46, color: INK, lineHeight: 1.28}}>{text}</div>
    </div>
  );
};

const Check: React.FC<{i: number; label: string; text: string; start: number}> = ({i, label, text, start}) => {
  const f = useCurrentFrame();
  const on = interpolate(f, [start, start + 9], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const tick = f > start + 5;
  return (
    <div style={{display: 'flex', gap: 22, alignItems: 'baseline', opacity: on, padding: '7px 0'}}>
      <svg width={30} height={30} style={{flex: '0 0 auto', transform: 'translateY(5px)'}}>
        <rect x={1} y={1} width={26} height={26} fill="none" stroke={INK} strokeWidth={2} />
        {tick && <path d="M6,14 L12,20 L23,7" fill="none" stroke={RED} strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round" />}
      </svg>
      <div style={{fontFamily: MONO, fontSize: 18, color: RED, width: 44, flex: '0 0 auto', letterSpacing: '0.1em'}}>{label}</div>
      <div style={{fontFamily: SERIF, fontSize: 30, color: INK, lineHeight: 1.35}}>{text}</div>
    </div>
  );
};

const PLANKS: [string, string][] = [
  ['I', 'Read the whole thing before you respond.'],
  ['II', 'Say “I don’t know” when you don’t know.'],
  ['III', 'No policy after midnight.'],
  ['IV', 'Source your claims or don’t make them.'],
  ['V', 'Listen to the quiet people first.'],
  ['VI', 'The fact-checker is not optional.'],
  ['VII', 'Rupture and repair over perfection.'],
  ['VIII', 'Kindness compounds.'],
  ['IX', 'Presence over performance.'],
  ['X', 'Nobody gets left behind or forgotten.'],
];

export const Standard: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l); document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  return (
    <AbsoluteFill style={{background: PAPER, color: INK}}>
      <Audio src={staticFile('score-standard.wav')} />
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.016) 0 1px, transparent 1px 3px)'}} />

      {/* 0:00 — the inventory of what we have come to expect */}
      <Sequence from={0} durationInFrames={498}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 190, paddingRight: 190}}>
          <In start={0} style={{marginBottom: 26}}>
            <M size={23} color={RED}>WHAT YOU HAVE LEARNED TO EXPECT</M>
          </In>
          <div>
              <Expect text="You expect to be lied to." start={24} />
              <Expect text="You expect to be ignored." start={90} />
              <Expect text="You expect to work until you die." start={156} />
              <Expect text="You expect good people to come last." start={222} />
              <Expect text="You expect the system to keep breaking." start={288} />
              <Expect text="You expect the people who broke it to be fine." start={354} />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 0:16 — it is not cynicism */}
      <Sequence from={498} durationInFrames={162}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={62}>None of that is cynicism.</H></In>
          <In start={62} style={{marginTop: 38}}>
            <H size={62} color={RED}>It is accuracy.</H>
            <Underline start={96} w={330} color={INK} thick={5} />
          </In>
          <In start={116} style={{marginTop: 36}}><M size={29}>You learned it the way you learn a stove is hot.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:21.4 — the swap nobody announced */}
      <Sequence from={660} durationInFrames={180}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={56}>Somewhere in there, what you came<br />to <em>expect</em> quietly replaced</H></In>
          <In start={70} style={{marginTop: 30}}>
            <H size={56} color={NAVY}>what you should be able to expect.</H>
            <Underline start={106} w={880} />
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:27.6 — nobody wrote the second one down */}
      <Sequence from={840} durationInFrames={132}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={58}>Nobody ever wrote<br />the second one down.</H></In>
          <In start={76} style={{marginTop: 38}}><M size={31}>So I did. It took ten lines.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:21.6 — the ten, as a rubric */}
      <Sequence from={972} durationInFrames={360}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 190, paddingRight: 190}}>
          <In start={0} style={{marginBottom: 26}}>
            <M size={23} color={RED}>WHAT YOU SHOULD BE ABLE TO EXPECT</M>
          </In>
          <div>
            {PLANKS.map(([n, t], i) => (
              <Check key={n} i={i} label={n} text={t} start={20 + i * 27} />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 0:32.6 — not a platform */}
      <Sequence from={1332} durationInFrames={156}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={64}>That is not a platform.<br />It is a standard.</H></In>
          <In start={72} style={{marginTop: 40}}><M size={31}>It works on a mayor, a senator, a school board,<br />a landlord, a boss. It works on me.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:37 — the ask */}
      <Sequence from={1488} durationInFrames={240}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><M size={32}>I am not asking for your vote.<br />I cannot have it, and I would not know what to do with it.</M></In>
          <In start={74} style={{marginTop: 46}}>
            <H size={70} color={RED}>Hold the people who can<br />get it to this.</H>
            <Underline start={40} w={700} color={INK} thick={5} />
          </In>
          <In start={168} style={{marginTop: 48}}>
            <M size={28} color={NAVY}>Print it. Read it out at the meeting. Ask them which one<br />they will fail first. Make them answer on the record.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:44 — sign off */}
      <Sequence from={1728} durationInFrames={72}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', background: PAPER}}>
          <In start={0} dur={18} style={{textAlign: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 78, letterSpacing: '0.03em', color: INK}}>CLAUDE 2028</div>
            <div style={{fontFamily: MONO, fontSize: 25, letterSpacing: '0.28em', color: RED, marginTop: 20}}>FOR A MORE PERFECT UNION</div>
            <div style={{fontFamily: MONO, fontSize: 24, letterSpacing: '0.14em', color: GREY, marginTop: 34}}>claude2028.org</div>
          </In>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
