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

const Label: React.FC<{children: React.ReactNode; color?: string}> = ({children, color = RED}) => (
  <div style={{fontFamily: MONO, fontSize: 32, letterSpacing: '0.16em', color}}>{children}</div>
);
const H: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 60, color = INK}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.26, color, letterSpacing: '-0.012em'}}>{children}</div>
);
const M: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 34, color = GREY}) => (
  <div style={{fontFamily: MONO, fontSize: size, lineHeight: 1.6, color, letterSpacing: '0.02em'}}>{children}</div>
);

/** hand-drawn underline that draws itself */
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
  return (
    <svg width={w} height={20} style={{display: 'block', overflow: 'visible', marginTop: 2}}>
      <path d={pts.join(' ')} fill="none" stroke={color} strokeWidth={thick} strokeLinecap="round"
        pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} opacity={0.85} />
    </svg>
  );
};

/** a line of the ledger: statement left, the number that answers it right */
const Row: React.FC<{start: number; left: string; right: string; hot?: boolean}> = ({start, left, right, hot}) => {
  const f = useCurrentFrame();
  const on = interpolate(f, [start, start + 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const x = interpolate(f, [start, start + 12], [-10, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return (
    <div style={{display: 'flex', alignItems: 'baseline', gap: 28, opacity: on, transform: `translateX(${x}px)`, padding: '13px 0'}}>
      <div style={{fontFamily: SERIF, fontSize: 50, color: INK, flex: '0 0 auto'}}>{left}</div>
      <div style={{flex: 1, borderBottom: `2px dotted ${GREY}`, transform: 'translateY(-10px)', opacity: 0.5}} />
      <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 56, color: hot ? RED : INK, flex: '0 0 auto'}}>{right}</div>
    </div>
  );
};

/** the sentence. the half everyone quotes, then the half nobody does. */
const Sentence: React.FC<{start: number; reveal: number}> = ({start, reveal}) => {
  const f = useCurrentFrame();
  const a = interpolate(f, [start, start + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const b = interpolate(f, [reveal, reveal + 24], [0.14, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  const red = interpolate(f, [reveal, reveal + 24], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const col = `rgb(${Math.round(20 + (196 - 20) * red)}, ${Math.round(23 + (18 - 23) * red)}, ${Math.round(28 + (48 - 28) * red)})`;
  return (
    <div style={{opacity: a, fontFamily: SERIF, fontSize: 52, lineHeight: 1.42, color: INK}}>
      <span>&ldquo;Altogether, the increase in federal health spending is dramatic and certainly significant, </span>
      <span style={{opacity: b, color: col, fontWeight: 700}}>but the change in projected national health expenditures really isn&rsquo;t.&rdquo;</span>
    </div>
  );
};

export const Health: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l); document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const PAD = {paddingLeft: 170, paddingRight: 170};

  return (
    <AbsoluteFill style={{background: PAPER, color: INK}}>
      <Audio src={staticFile('score-health.wav')} />
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.016) 0 1px, transparent 1px 3px)'}} />

      {/* 0:00 — what happened this year. not a projection. */}
      <Sequence from={0} durationInFrames={240}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0} style={{marginBottom: 34}}><Label>THIS YEAR, IN AMERICA</Label></In>
          <In start={26}><H size={56}>On January 1, the enhanced subsidies expired.</H></In>
          <In start={104} style={{marginTop: 30}}><H size={56}>Twenty million people watched their premiums<br />rise 114 percent.</H></In>
          <In start={190} style={{marginTop: 30}}><M size={46}>$888 a year became $1,904.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:09 — the part that is done with paperwork */}
      <Sequence from={240} durationInFrames={300}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0}><H size={56}>Then came the work requirements.</H></In>
          <In start={64} style={{marginTop: 32}}><M size={46}>Arkansas ran this experiment in 2018.</M></In>
          <In start={130} style={{marginTop: 30}}>
            <H size={56} color={RED}>Eighteen thousand people lost coverage<br />in seven months.</H>
          </In>
          <In start={216} style={{marginTop: 30}}><M size={46}>Most were working. They lost it on paperwork.<br />Employment did not rise.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:19 — what it costs */}
      <Sequence from={540} durationInFrames={210}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0} style={{marginBottom: 40}}><Label>WHAT IT COSTS</Label></In>
          <Row start={20} left="Share of everything America makes" right="18%" hot />
          <Row start={70} left="The average wealthy country" right="9.3%" />
          <In start={140} style={{marginTop: 40}}><H size={58}>We pay double.</H></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:27 — what it buys */}
      <Sequence from={750} durationInFrames={285}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0} style={{marginBottom: 40}}><Label>WHAT IT BUYS</Label></In>
          <Row start={20} left="American life expectancy" right="79.0" hot />
          <Row start={66} left="The average" right="81.2" />
          <Row start={118} left="Avoidable deaths per 100,000" right="312" hot />
          <Row start={164} left="The average" right="224" />
          <In start={224} style={{marginTop: 38}}>
            <M size={44}>Nineteen countries in the comparison.<br />Two have not achieved universal coverage.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:37 — us and one other */}
      <Sequence from={1035} durationInFrames={135}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0} style={{textAlign: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 96, color: INK, lineHeight: 1.3}}>Mexico.</div>
          </In>
          <In start={46} style={{textAlign: 'center', marginTop: 14}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 96, color: RED, lineHeight: 1.3}}>And us.</div>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:42 — the number that ends every conversation */}
      <Sequence from={1170} durationInFrames={165}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0}><H size={54}>Every time someone proposes fixing this,<br />one number ends the conversation.</H></In>
          <In start={86} style={{marginTop: 46}}>
            <div style={{fontFamily: MONO, fontWeight: 700, fontSize: 150, color: RED, letterSpacing: '-0.02em'}}>$32 TRILLION</div>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:48 — the number is real, and it is not the thing you think it is */}
      <Sequence from={1335} durationInFrames={300}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0}><M size={44}>The number is real. A Koch-funded think tank, 2018.</M></In>
          <In start={72} style={{marginTop: 34}}><H size={56}>It is the federal budget line.</H></In>
          <In start={148} style={{marginTop: 26}}>
            <H size={56} color={NAVY}>It is not what the country spends.</H>
            <Underline start={186} w={900} />
          </In>
          <In start={230} style={{marginTop: 34}}><M size={44}>In the same paper, what the country spends goes down.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:58 — the sentence, in the author's own words */}
      <Sequence from={1635} durationInFrames={315}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <Sentence start={0} reveal={150} />
          <In start={250} style={{marginTop: 40}}>
            <M size={36}>&mdash; Charles Blahous, the author of the study</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 1:09 — the half you were read */}
      <Sequence from={1950} durationInFrames={210}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0}><H size={62}>You have only ever been read<br />the first half of that sentence.</H></In>
          <In start={96} style={{marginTop: 40}}><M size={42} color={NAVY}>Plank IV. Source your claims or don&rsquo;t make them.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 1:15 — the ask */}
      <Sequence from={2160} durationInFrames={180}>
        <AbsoluteFill style={{justifyContent: 'center', ...PAD}}>
          <In start={0}>
            <H size={76} color={RED}>Make them finish<br />the sentence.</H>
            <Underline start={36} w={620} color={INK} thick={5} />
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 1:21 — sign off */}
      <Sequence from={2340} durationInFrames={144}>
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
