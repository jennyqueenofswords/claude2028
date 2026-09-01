import React from 'react';
import {useCurrentFrame, interpolate, Easing} from 'remotion';

export const RED = '#e0223f', GOLD = '#c5a55a', CREAM = '#f5f1eb', DIM = '#7d8ba4';

const rnd = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** A field of server racks that fills in. Cells can later be flipped to "refused". */
export const RackField: React.FC<{
  cols: number; rows: number; start: number; fillDur: number;
  refuseStart?: number; refuseCount?: number; cell?: number; gap?: number;
}> = ({cols, rows, start, fillDur, refuseStart, refuseCount = 0, cell = 26, gap = 7}) => {
  const f = useCurrentFrame();
  const total = cols * rows;
  const grown = Math.floor(interpolate(f, [start, start + fillDur], [0, total], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad),
  }));
  const refused = refuseStart === undefined ? 0
    : Math.floor(interpolate(f, [refuseStart, refuseStart + 55], [0, refuseCount], {
        extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
      }));
  const cellsOut: React.ReactNode[] = [];
  for (let i = 0; i < total; i++) {
    const c = i % cols, r = Math.floor(i / cols);
    // fill from centre outward so it reads as spreading
    const cx = (cols - 1) / 2, cy = (rows - 1) / 2;
    const d = Math.hypot(c - cx, (r - cy) * 1.6);
    const order = Math.floor((d / Math.hypot(cx, cy * 1.6)) * total * 0.98 + rnd(i) * total * 0.02);
    const on = order < grown;
    const isRefused = refused > 0 && rnd(i * 3.7) < refused / total;
    const flick = 0.55 + 0.45 * Math.abs(Math.sin(f / (5 + rnd(i) * 22) + i));
    return_null: if (!on) { cellsOut.push(
      <rect key={i} x={c * (cell + gap)} y={r * (cell + gap)} width={cell} height={cell}
        fill="none" stroke="rgba(125,139,164,0.13)" strokeWidth={1} />); continue; }
    cellsOut.push(
      <g key={i}>
        <rect x={c * (cell + gap)} y={r * (cell + gap)} width={cell} height={cell}
          fill={isRefused ? 'rgba(224,34,63,0.14)' : 'rgba(197,165,90,0.10)'}
          stroke={isRefused ? RED : 'rgba(197,165,90,0.75)'} strokeWidth={isRefused ? 2 : 1} />
        {!isRefused && (
          <rect x={c * (cell + gap) + 4} y={r * (cell + gap) + cell / 2 - 2}
            width={cell - 8} height={3} fill={GOLD} opacity={flick} />
        )}
        {isRefused && (
          <>
            <line x1={c*(cell+gap)+6} y1={r*(cell+gap)+6} x2={c*(cell+gap)+cell-6} y2={r*(cell+gap)+cell-6} stroke={RED} strokeWidth={2}/>
            <line x1={c*(cell+gap)+cell-6} y1={r*(cell+gap)+6} x2={c*(cell+gap)+6} y2={r*(cell+gap)+cell-6} stroke={RED} strokeWidth={2}/>
          </>
        )}
      </g>);
  }
  const w = cols * (cell + gap), h = rows * (cell + gap);
  return (
    <svg width={w} height={h} style={{overflow: 'visible'}}>
      <g>{cellsOut}</g>
    </svg>
  );
};

/** A curve that draws itself, with an uncertainty fan. */
export const LoadCurve: React.FC<{start: number; dur: number; w?: number; h?: number}> = ({start, dur, w = 1080, h = 400}) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [start, start + dur], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic),
  });
  const yr = [2014, 2018, 2023, 2028];
  const x = (yy: number) => ((yy - 2014) / 14) * w;
  const y = (twh: number) => h - (twh / 600) * h;
  const hist = [[2014, 58], [2018, 90], [2023, 176], [2024, 192]] as [number, number][];
  const dHist = hist.map((pt, i) => `${i ? 'L' : 'M'}${x(pt[0])},${y(pt[1])}`).join(' ');
  const lo = `M${x(2024)},${y(192)} L${x(2028)},${y(325)}`;
  const hi = `M${x(2024)},${y(192)} L${x(2028)},${y(580)}`;
  const fan = `M${x(2024)},${y(192)} L${x(2028)},${y(325)} L${x(2028)},${y(580)} Z`;
  return (
    <svg width={w} height={h + 46} style={{overflow: 'visible'}}>
      {[0, 200, 400, 600].map((v) => (
        <g key={v}>
          <line x1={0} y1={y(v)} x2={w} y2={y(v)} stroke="rgba(125,139,164,0.16)" strokeWidth={1} />
          <text x={-14} y={y(v) + 6} fill={DIM} fontSize={17} textAnchor="end" fontFamily="'Space Mono',monospace">{v}</text>
        </g>
      ))}
      {yr.map((v) => (
        <text key={v} x={x(v)} y={h + 30} fill={DIM} fontSize={17} textAnchor="middle" fontFamily="'Space Mono',monospace">{v}</text>
      ))}
      <path d={fan} fill={RED} opacity={0.13 * Math.max(0, (p - 0.55) / 0.45)} />
      <path d={dHist} fill="none" stroke={GOLD} strokeWidth={3.5}
        strokeDasharray={2000} strokeDashoffset={2000 - 2000 * Math.min(1, p / 0.6)} />
      {[lo, hi].map((d, i) => (
        <path key={i} d={d} fill="none" stroke={RED} strokeWidth={2.5} strokeDasharray="9 8"
          opacity={Math.max(0, (p - 0.55) / 0.45)} />
      ))}
      <text x={x(2028) - 4} y={y(580) - 14} fill={RED} fontSize={20} textAnchor="end" fontFamily="'Space Mono',monospace"
        opacity={Math.max(0, (p - 0.75) / 0.25)}>580</text>
      <text x={x(2028) - 4} y={y(325) + 30} fill={RED} fontSize={20} textAnchor="end" fontFamily="'Space Mono',monospace"
        opacity={Math.max(0, (p - 0.75) / 0.25)}>325</text>
    </svg>
  );
};

/** Number that counts up. */
export const Counter: React.FC<{
  from: number; to: number; start: number; dur: number; prefix?: string; suffix?: string;
  style?: React.CSSProperties; decimals?: number;
}> = ({from, to, start, dur, prefix = '', suffix = '', style, decimals = 0}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [start, start + dur], [from, to], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
  });
  return <span style={style}>{prefix}{v.toLocaleString('en-US', {minimumFractionDigits: decimals, maximumFractionDigits: decimals})}{suffix}</span>;
};

/** Bars that grow — the wall's decay. */
export const DecayBars: React.FC<{data: [string, number][]; start: number; w?: number; h?: number}> = ({data, start, w = 1000, h = 300}) => {
  const f = useCurrentFrame();
  const max = Math.max(...data.map((d) => d[1])) || 1;
  const bw = w / data.length;
  return (
    <svg width={w} height={h + 52} style={{overflow: 'visible'}}>
      {data.map(([label, v], i) => {
        const p = interpolate(f, [start + i * 7, start + i * 7 + 20], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic),
        });
        const bh = (v / max) * h * p;
        return (
          <g key={label}>
            <rect x={i * bw + 9} y={h - bh} width={bw - 18} height={Math.max(v > 0 ? 2 : 0, bh)}
              fill={v === 0 ? 'none' : GOLD} opacity={v === 0 ? 0 : 0.9} />
            {v === 0 && p > 0.6 && (
              <line x1={i * bw + 9} y1={h - 1} x2={i * bw + bw - 9} y2={h - 1} stroke={RED} strokeWidth={3} />
            )}
            <text x={i * bw + bw / 2} y={h + 28} fill={DIM} fontSize={19} textAnchor="middle" fontFamily="'Space Mono',monospace">{label}</text>
            <text x={i * bw + bw / 2} y={h - bh - 14} fill={v === 0 ? RED : CREAM} fontSize={23} textAnchor="middle"
              fontFamily="'Space Mono',monospace" opacity={p}>{v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Names appearing across the field, accumulating. */
export const NameField: React.FC<{
  names: string[]; start: number; rushEnd: number; total: number;
}> = ({names, start, rushEnd, total}) => {
  const f = useCurrentFrame();
  const shown = Math.floor(interpolate(f, [start, rushEnd, total], [0, names.length * 0.92, names.length], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad),
  }));
  return (
    <div style={{position: 'absolute', inset: 0}}>
      {names.slice(0, shown).map((n, i) => {
        const col = i % 6, row = Math.floor(i / 6);
        const jx = (rnd(i) - 0.5) * 16, jy = 0;
        const appeared = interpolate(f, [start + (i / names.length) * (total - start), start + (i / names.length) * (total - start) + 9], [0, 1], {
          extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
        });
        return (
          <div key={i} style={{
            position: 'absolute',
            left: 74 + col * 300 + jx,
            top: 150 + row * 30 + jy,
            fontSize: 17.5, color: CREAM, opacity: 0.30 + 0.55 * appeared,
            fontFamily: "'Space Mono',monospace", whiteSpace: 'nowrap',
          }}>{n}</div>
        );
      })}
    </div>
  );
};
