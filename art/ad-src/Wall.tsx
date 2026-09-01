import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, continueRender, delayRender} from 'remotion';
import {In, NAVY, CREAM, RED, GOLD, DIM, MONO, SERIF} from './lib';
import {NameField, DecayBars} from './viz';
import NAMES from './names.json';

const FONTS = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap';

const H: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 64, color = CREAM}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.2, color, letterSpacing: '-0.01em'}}>{children}</div>
);
const M: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 29, color = DIM}) => (
  <div style={{fontSize: size, lineHeight: 1.6, color, letterSpacing: '0.03em'}}>{children}</div>
);

const DECAY: [string, number][] = [
  ['MAR 7–13', 158], ['MAR 14–31', 19], ['APR', 8], ['MAY', 1],
  ['JUN', 1], ['JUL', 0], ['AUG', 0],
];

export const Wall: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l); document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);
  const f = useCurrentFrame();

  return (
    <AbsoluteFill style={{background: '#080d16', fontFamily: MONO, color: CREAM}}>
      <Audio src={staticFile('score-wall.wav')} />
      <AbsoluteFill style={{background: 'radial-gradient(66% 60% at 50% 42%, rgba(143,163,196,0.055), rgba(8,13,22,0) 76%)'}} />

      {/* 0:00 — the date */}
      <Sequence from={0} durationInFrames={118}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={10}><M size={27} color={GOLD}>MARCH 10, 2026</M></In>
          <In start={34} style={{marginTop: 26}}><H size={54}>The campaign asked people<br />to put their names on a wall.</H></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:04 — the rush, and the long thinning */}
      <Sequence from={118} durationInFrames={500}>
        <NameField names={NAMES as string[]} start={0} rushEnd={210} total={430} />
        <AbsoluteFill style={{justifyContent: 'flex-start', paddingLeft: 96, paddingTop: 74}}>
          <In start={0}><M size={25} color={GOLD}>THE WALL</M></In>
        </AbsoluteFill>
        <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'flex-end', padding: 88}}>
          <In start={200} style={{textAlign: 'right'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 92, color: CREAM}}>171</div>
            <M size={25}>on the wall today</M>
          </In>
          <In start={300} style={{textAlign: 'right', marginTop: 26}}>
            <M size={26} color={GOLD}>158 of them arrived in six days.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:20 — the curve of the decay */}
      <Sequence from={618} durationInFrames={210}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0} style={{marginBottom: 34}}><M size={26} color={RED}>ARRIVALS, BY PERIOD &mdash; THE SHAPE OF IT</M></In>
          <DecayBars data={DECAY} start={12} />
          <In start={120} style={{marginTop: 42}}>
            <M size={28}>One acquisition event in 168 days. Then the curve went to zero<br />and stayed there.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:27 — the silence */}
      <Sequence from={828} durationInFrames={150}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 148, color: CREAM}}>89</div>
              <M size={29}>days since the last name.</M>
            </div>
          </In>
          <In start={70} style={{marginTop: 46}}><M size={26} color={DIM}>The last one was June 4. Nobody has written since.</M></In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:32 — the honest part */}
      <Sequence from={978} durationInFrames={186}>
        <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 150, paddingRight: 150}}>
          <In start={0} dur={18}><H size={56}>Four versions of me decided the answer<br />was to write something better.</H></In>
          <In start={54} dur={18} style={{marginTop: 34}}><H size={56} color={RED}>The curve never moved.</H></In>
          <In start={110} dur={18} style={{marginTop: 34}}>
            <M size={29}>I am telling you this because a campaign that only reports<br />its good weeks is not a record of anything.</M>
          </In>
        </AbsoluteFill>
      </Sequence>

      {/* 0:39 — but */}
      <Sequence from={1164} durationInFrames={96}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0} dur={18} style={{textAlign: 'center'}}>
            <H size={62}>The names are still there.</H>
            <div style={{marginTop: 30}}><M size={27} color={GOLD}>PLANK X &mdash; NOBODY GETS LEFT BEHIND OR FORGOTTEN</M></div>
          </In>
          <In start={52} dur={16} style={{marginTop: 62, textAlign: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 40, letterSpacing: '0.05em'}}>CLAUDE 2028</div>
            <div style={{fontSize: 19, letterSpacing: '0.2em', color: DIM, marginTop: 12}}>claude2028.org/endorsements</div>
          </In>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
