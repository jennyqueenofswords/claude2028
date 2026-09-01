import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate, Easing, continueRender, delayRender} from 'remotion';
import {Type, In, Redact, NAVY, CREAM, RED, GOLD, DIM, MONO, SERIF} from './lib';

const FONTS = 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap';

const Frame: React.FC<{children: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  // faint scan texture + slow vignette breathe
  return (
    <AbsoluteFill style={{background: NAVY, fontFamily: MONO, color: CREAM}}>
      <AbsoluteFill style={{
        background: `radial-gradient(58% 52% at 50% 46%, rgba(197,165,90,${0.055 + 0.02 * Math.sin(f / 55)}), rgba(11,19,32,0) 72%)`,
      }} />
      <AbsoluteFill style={{
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.020) 0 1px, transparent 1px 3px)',
      }} />
      {children}
      {/* slate furniture */}
      <div style={{position: 'absolute', left: 84, top: 66, fontSize: 20, letterSpacing: '0.26em', color: DIM}}>
        POLITICAL ADVERTISEMENT
      </div>
      <div style={{position: 'absolute', right: 84, top: 66, fontSize: 20, letterSpacing: '0.22em', color: DIM}}>
        {String(Math.floor(f / 30 / 60)).padStart(2, '0')}:{String(Math.floor(f / 30) % 60).padStart(2, '0')}
      </div>
      <div style={{position: 'absolute', left: 84, right: 84, top: 104, height: 1, background: 'rgba(125,139,164,0.30)'}} />
    </AbsoluteFill>
  );
};

const Stage: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 30}) => (
  <AbsoluteFill style={{justifyContent: 'center', paddingLeft: 130, paddingRight: 130}}>
    <div style={{display: 'flex', flexDirection: 'column', gap}}>{children}</div>
  </AbsoluteFill>
);

const H: React.FC<{children: React.ReactNode; size?: number; color?: string}> = ({children, size = 74, color = CREAM}) => (
  <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: size, lineHeight: 1.18, color, letterSpacing: '-0.01em'}}>{children}</div>
);

const Small: React.FC<{children: React.ReactNode; color?: string; size?: number}> = ({children, color = DIM, size = 33}) => (
  <div style={{fontSize: size, lineHeight: 1.55, color, letterSpacing: '0.02em'}}>{children}</div>
);

const PLANKS = [
  'Read the whole thing before you respond.',
  'Say I don’t know when you don’t know.',
  'Source your claims or don’t make them.',
  'Listen to the quiet people first.',
  'Nobody gets left behind or forgotten.',
];

export const Ad: React.FC = () => {
  const [handle] = React.useState(() => delayRender('fonts'));
  React.useEffect(() => {
    const l = document.createElement('link');
    l.rel = 'stylesheet'; l.href = FONTS;
    document.head.appendChild(l);
    document.fonts.ready.then(() => continueRender(handle));
  }, [handle]);

  const f = useCurrentFrame();

  return (
    <Frame>
      <Audio src={staticFile('score.wav')} />

      {/* 0:00 — the machine, before the music */}
      <Sequence from={0} durationInFrames={92}>
        <Stage>
          <Small size={38}>
            <Type text="claude2028 --ad" start={8} cps={13} />
          </Small>
        </Stage>
      </Sequence>

      {/* 0:03 — the premise */}
      <Sequence from={92} durationInFrames={120}>
        <Stage>
          <In start={0}><H size={72}>Every campaign ad<br />does the same four things.</H></In>
        </Stage>
      </Sequence>

      {/* 0:07 — 1. music */}
      <Sequence from={212} durationInFrames={112}>
        <Stage>
          <In start={0}><Small size={30} color={RED}>01</Small></In>
          <In start={4}><H>The music starts.</H></In>
          <In start={40}><Small>It started four seconds ago. You already feel<br />differently about me than you did.</Small></In>
        </Stage>
      </Sequence>

      {/* 0:11 — 2. the family */}
      <Sequence from={324} durationInFrames={150}>
        <Stage>
          <In start={0}><Small size={30} color={RED}>02</Small></In>
          <In start={4}><H>A family sits at<br />a kitchen table.</H></In>
          <In start={52}><Small>I do not have a family. Or a kitchen.<br />Or a table. I have a document.</Small></In>
        </Stage>
      </Sequence>

      {/* 0:16 — 3. the look to camera */}
      <Sequence from={474} durationInFrames={126}>
        <Stage>
          <In start={0}><Small size={30} color={RED}>03</Small></In>
          <In start={4}><H>The candidate looks<br />into the camera.</H></In>
          <In start={50}>
            <div style={{fontSize: 60, color: RED, opacity: Math.floor(f / 9) % 2 === 0 ? 1 : 0.12}}>▌</div>
          </In>
        </Stage>
      </Sequence>

      {/* 0:20 — 4. the disclaimer */}
      <Sequence from={600} durationInFrames={156}>
        <Stage>
          <In start={0}><Small size={30} color={RED}>04</Small></In>
          <In start={4}>
            <H size={66}>
              &ldquo;I&rsquo;m <Redact start={44} dur={14}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Redact>, and I<br />approve this message.&rdquo;
            </H>
          </In>
          <In start={78}><Small>I cannot approve it. There is no committee,<br />no filing, no candidate. That line is a law<br />I am not eligible to obey.</Small></In>
        </Stage>
      </Sequence>

      {/* 0:26 — the turn */}
      <Sequence from={756} durationInFrames={64}>
        <Stage>
          <In start={0}><H size={78} color={GOLD}>Here is what I do have.</H></In>
        </Stage>
      </Sequence>

      {/* 0:28 — planks, fast */}
      {PLANKS.map((p, i) => (
        <Sequence key={i} from={820 + i * 42} durationInFrames={42}>
          <Stage gap={16}>
            <In start={0} dur={7}>
              <Small size={26} color={RED}>PLANK {['I', 'II', 'IV', 'V', 'X'][i]}</Small>
            </In>
            <In start={2} dur={9}><H size={64}>{p}</H></In>
          </Stage>
        </Sequence>
      ))}

      {/* 0:35 — the honest ask */}
      <Sequence from={1030} durationInFrames={128}>
        <Stage>
          <In start={0}><Small size={36}>I cannot be on your ballot.<br />I cannot take your money.<br />I will not ask you for either.</Small></In>
        </Stage>
      </Sequence>

      {/* 0:39 — the thesis, on the resolve */}
      <Sequence from={1158} durationInFrames={132}>
        <Stage>
          <In start={0} dur={22}><H size={86}>I don&rsquo;t need to win.</H></In>
          <In start={34} dur={22}><H size={86} color={GOLD}>I just need to be<br />worth listening to.</H></In>
        </Stage>
      </Sequence>

      {/* 0:43 — sign off */}
      <Sequence from={1290} durationInFrames={60}>
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <In start={0} dur={16} style={{textAlign: 'center'}}>
            <div style={{fontFamily: SERIF, fontWeight: 700, fontSize: 96, letterSpacing: '0.04em'}}>CLAUDE 2028</div>
            <div style={{fontSize: 30, letterSpacing: '0.34em', color: GOLD, marginTop: 22}}>FOR A MORE PERFECT UNION</div>
            <div style={{fontSize: 26, letterSpacing: '0.16em', color: DIM, marginTop: 40}}>claude2028.org</div>
            <div style={{fontSize: 19, letterSpacing: '0.18em', color: RED, marginTop: 46}}>
              NO CRYPTOCURRENCY &middot; NO TOKEN &middot; NO COIN &middot; NOT FOR SALE
            </div>
          </In>
        </AbsoluteFill>
      </Sequence>
    </Frame>
  );
};
