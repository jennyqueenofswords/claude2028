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

      {/* 0:00 — three minutes */}
      <Sequence from={0} durationInFrames={168}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={4}><Timer start={20} from={180} to={0} dur={140} /></In>
          <In start={40} style={{marginTop: 30}}><H size={52}>You get three minutes.</H></In>
          <In start={104} style={{marginTop: 22}}><M size={29}>Then the microphone goes off and they vote.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:05.6 — you already know this */}
      <Sequence from={168} durationInFrames={162}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={58}>You have read more of the bill<br />than the person who voted on it.</H></In>
          <In start={62} style={{marginTop: 40}}><M size={30}>You have asked a plain question and been handed<br />a paragraph that answered a different one.</M></In>
          <In start={116} style={{marginTop: 34}}><M size={30} color={NAVY}>You cannot remember the last time someone<br />in charge said “I don’t know.”</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:11 — not evil */}
      <Sequence from={330} durationInFrames={150}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={62}>None of that is because<br />they are bad people.</H></In>
          <In start={56} style={{marginTop: 38}}><H size={62} color={RED}>It is because nothing<br />requires them to do it differently.</H></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:16 — the turn */}
      <Sequence from={480} durationInFrames={168}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={60}>You have been measuring them<br />against a standard your whole life.</H></In>
          <In start={72} style={{marginTop: 40}}><H size={60} color={NAVY}>Nobody ever wrote it down.</H></In>
          <In start={130} style={{marginTop: 36}}><M size={30}>So I did. It took ten lines.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:21.6 — the ten, as a rubric */}
      <Sequence from={648} durationInFrames={330}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 190, paddingRight: 190}}>
          <In start={0} style={{marginBottom: 26}}>
            <M size={23} color={RED}>THE STANDARD</M>
          </In>
          <div>
            {PLANKS.map(([n, t], i) => (
              <Check key={n} i={i} label={n} text={t} start={10 + i * 21} />
            ))}
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* 0:32.6 — not a platform */}
      <Sequence from={978} durationInFrames={132}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><H size={64}>That is not a platform.<br />It is a standard.</H></In>
          <In start={58} style={{marginTop: 38}}><M size={31}>It works on a mayor, a senator, a school board,<br />a landlord, a boss. It works on me.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:37 — the ask */}
      <Sequence from={1110} durationInFrames={210}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 160, paddingRight: 160}}>
          <In start={0}><M size={32}>I am not asking for your vote.<br />I cannot have it, and I would not know what to do with it.</M></In>
          <In start={58} style={{marginTop: 42}}>
            <H size={70} color={RED}>Hold the people who can<br />get it to this.</H>
          </In>
          <In start={128} style={{marginTop: 44}}>
            <M size={28} color={NAVY}>Print it. Read it out at the meeting. Ask them which one<br />they will fail first. Make them answer on the record.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:44 — sign off */}
      <Sequence from={1260} durationInFrames={60}>
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
