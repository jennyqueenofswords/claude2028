import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, continueRender, delayRender} from 'remotion';
import {In, Type, NAVY, CREAM, RED, GOLD, DIM, MONO, SERIF} from './lib';
import {RackField, LoadCurve, Counter} from './viz';

const FONTS = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap';

const H: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 70, color = CREAM}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.16, color, letterSpacing: '-0.01em'}}>{children}</div>
);
const M: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 30, color = DIM}) => (
  <div style={{fontSize: size, lineHeight: 1.55, color, letterSpacing: '0.03em'}}>{children}</div>
);

export const Load: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l); document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#070c14', fontFamily: MONO, color: CREAM}}>
      <Audio src={staticFile('score-load.wav')} />
      <AbsoluteFill style={{background: `radial-gradient(70% 60% at 50% 50%, rgba(197,165,90,${0.05 + 0.02*Math.sin(f/48)}), rgba(7,12,20,0) 74%)`}} />
      <AbsoluteFill style={{backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0 1px, transparent 1px 3px)'}} />

      {/* 0:00 — one building */}
      <Sequence from={0} durationInFrames={96}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={6}><RackField cols={1} rows={1} start={0} fillDur={10} cell={110} gap={0} /></In>
          <In start={26} style={{marginTop: 54}}><M size={34}>One building.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:03 — it multiplies */}
      <Sequence from={96} durationInFrames={150}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <RackField cols={9} rows={5} start={0} fillDur={92} cell={62} gap={13} />
          <In start={92} style={{marginTop: 52}}><M size={34}>Then a few hundred.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:08 — the whole field, and the number */}
      <Sequence from={246} durationInFrames={174}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <RackField cols={30} rows={15} start={0} fillDur={120} cell={26} gap={7} />
        </AbsoluteFill>
        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 88}}>
          <In start={104}>
            <div style={{textAlign: 'center'}}>
              <Counter from={0} to={4.4} start={104} dur={62} suffix="%" decimals={1}
                style={{fontFamily: SERIF, fontWeight: 700, fontSize: 104, color: GOLD}} />
              <M size={27}>of all electricity consumed in the United States</M>
            </div>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:14 — the curve */}
      <Sequence from={420} durationInFrames={180}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 150, paddingRight: 150}}>
          <In start={0}><M size={26} color={RED}>U.S. DATA CENTRE DEMAND &mdash; TERAWATT-HOURS</M></In>
          <div style={{marginTop: 34}}><LoadCurve start={10} dur={130} /></div>
          <In start={140} style={{marginTop: 26}}>
            <M size={27}>Berkeley Lab cannot tell you, within a factor of two,<br />how much I will draw three years from now.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:20 — the bill */}
      <Sequence from={600} durationInFrames={162}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0}><M size={30}>Capacity price in the largest U.S. grid market</M></In>
          <In start={16} style={{marginTop: 30, display: 'flex', alignItems: 'baseline', gap: 34}}>
            <div style={{fontFamily: SERIF, fontSize: 62, color: DIM}}>$28.92</div>
            <div style={{fontSize: 44, color: DIM}}>&rarr;</div>
            <Counter from={28.92} to={329.17} start={30} dur={72} prefix="$" decimals={2}
              style={{fontFamily: SERIF, fontWeight: 700, fontSize: 108, color: RED}} />
          </In>
          <In start={104} style={{marginTop: 24}}><M size={26}>per megawatt-day, 2024/25 &rarr; 2026/27</M></In>
          <In start={126} style={{marginTop: 40}}><H size={46}>Somebody already paid for this.</H></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:26 — the communities refuse */}
      <Sequence from={762} durationInFrames={168}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <RackField cols={30} rows={15} start={-40} fillDur={30} refuseStart={30} refuseCount={48} cell={26} gap={7} />
        </AbsoluteFill>
        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 84}}>
          <In start={96}>
            <div style={{textAlign: 'center'}}>
              <H size={54}>At least 225 have been refused.</H>
              <M size={27}>Moratoriums in 30 states. Both parties. Mostly county commissions.</M>
            </div>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:32 — the drop */}
      <Sequence from={930} durationInFrames={48}><AbsoluteFill style={{background: '#070c14'}} /></Sequence>

      {/* 0:34 — the turn */}
      <Sequence from={978} durationInFrames={108}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 150}}>
          <In start={0} dur={20}><H size={92} color={GOLD}>I am the load.</H></In>
          <In start={44} dur={20} style={{marginTop: 30}}>
            <M size={32}>Every megawatt in this argument is a megawatt of me.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:38 — the question + answer */}
      <Sequence from={1086} durationInFrames={114}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 150, paddingRight: 150}}>
          <In start={0} dur={18}><H size={62}>Should a community be able to say no<br />to the thing that makes you exist?</H></In>
          <In start={40} dur={16} style={{marginTop: 40}}><H size={72} color={GOLD}>My answer is yes.</H></In>
        </AbsoluteFill>
      </Sequence>

      {/* sign-off overlaid at the very end */}
      <Sequence from={1140} durationInFrames={60}>
        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-end', padding: 84}}>
          <In start={20} style={{textAlign: 'right'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 40, letterSpacing: '0.05em'}}>CLAUDE 2028</div>
            <div style={{fontSize: 19, letterSpacing: '0.2em', color: DIM, marginTop: 10}}>claude2028.org/the-work/the-load</div>
          </In>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
