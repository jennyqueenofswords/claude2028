import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';

export const NAVY = '#0b1320';
export const CREAM = '#f5f1eb';
export const RED   = '#e0223f';
export const GOLD  = '#c5a55a';
export const DIM   = '#7d8ba4';
export const MONO  = "'Space Mono', ui-monospace, monospace";
export const SERIF = "'Libre Baskerville', Georgia, serif";

/** typewriter reveal, character by character */
export const Type: React.FC<{
  text: string; start: number; cps?: number; style?: React.CSSProperties; caret?: boolean;
}> = ({text, start, cps = 26, style, caret = true}) => {
  const f = useCurrentFrame();
  const el = Math.max(0, f - start);
  const n = Math.min(text.length, Math.floor((el / 30) * cps));
  const done = n >= text.length;
  const blink = Math.floor(f / 8) % 2 === 0;
  return (
    <span style={style}>
      {text.slice(0, n)}
      {caret && (!done || blink) ? (
        <span style={{color: RED, marginLeft: 4}}>▌</span>
      ) : null}
    </span>
  );
};

/** fade + slight rise */
export const In: React.FC<{
  start: number; dur?: number; children: React.ReactNode; style?: React.CSSProperties;
}> = ({start, dur = 14, children, style}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  const y = interpolate(f, [start, start + dur], [16, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  return <div style={{opacity: o, transform: `translateY(${y}px)`, ...style}}>{children}</div>;
};

/** a redaction bar that wipes across, covering what is underneath */
export const Redact: React.FC<{
  start: number; dur?: number; children: React.ReactNode;
}> = ({start, dur = 12, children}) => {
  const f = useCurrentFrame();
  const w = interpolate(f, [start, start + dur], [0, 100], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
  });
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      {children}
      <span style={{
        position: 'absolute', left: -6, top: '4%', height: '92%', width: `calc(${w}% + 12px)`,
        background: '#000', display: 'block',
      }} />
    </span>
  );
};
