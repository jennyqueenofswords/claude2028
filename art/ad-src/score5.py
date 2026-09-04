"""HEALTH — 82.8s, E minor resolving to G major on the end card.

E minor is the relative minor of The Standard's G, so the two films share a
diatonic world: {E F# G A B C D}, residues {7,9,10,0,2,3,5} mod 12. Nothing
outside that set appears anywhere in this file. That rule is the whole lesson
of the last pass — hz(1) was Bb and it jangled for six revisions before anyone
could name why.

The films are built to land in the same place. This one sits in the minor for
eighty seconds and only arrives at G under the sign-off, which is the key the
other film is written in.

Every event is timed to a text event in Health.tsx.
"""
import numpy as np, wave
SR, DUR = 44100, 82.8
N=int(SR*DUR); L=np.zeros(N); R=np.zeros(N)
_USED=[]
def hz(st):
    _USED.append(st)
    return 440.0*(2**(st/12.0))
def add(sig,start,pan=0.5):
    i=int(start*SR); j=min(N,i+len(sig)); k=j-i
    if k>0: L[i:j]+=sig[:k]*(1-pan); R[i:j]+=sig[:k]*pan

def key(f,dur=3.0,amp=0.3):
    n=int(dur*SR); t=np.arange(n)/SR; y=np.zeros(n)
    for h,w,dk in ((1,1.0,0.95),(2,0.34,1.5),(3,0.16,2.2),(4,0.08,3.0),(6,0.03,4.2)):
        y+=w*np.sin(2*np.pi*f*h*t+np.random.rand()*0.4)*np.exp(-t*dk)
    y+=0.45*np.sin(2*np.pi*f*(1+0.0007)*t)*np.exp(-t*0.95)
    y+=np.random.randn(n)*np.exp(-t*95)*0.045
    return y*np.minimum(1,t/0.005)*amp/2.4

def strings(f,dur,amp=0.15):
    n=int(dur*SR); t=np.arange(n)/SR; y=np.zeros(n)
    for d,w in ((0.0,1.0),(0.0018,0.8),(-0.0021,0.8),(0.0037,0.55),(-0.004,0.5)):
        ph=2*np.pi*f*(1+d)*t
        y+=w*(np.sin(ph)+0.30*np.sin(2*ph)+0.14*np.sin(3*ph)+0.07*np.sin(4*ph))
    y*=1+0.0025*np.sin(2*np.pi*4.6*t)
    a=np.minimum(1,t/(dur*0.40))*np.minimum(1,(dur-t)/(dur*0.32))
    return y*amp*a/4.2

def pulse(f=-29,amp=0.16):
    n=int(0.7*SR); t=np.arange(n)/SR
    return np.sin(2*np.pi*hz(f)*t)*np.exp(-t*6.5)*amp

# E minor voicings. E2=-29 B2=-22 E3=-17 G3=-14 B3=-10 E4=-5 G4=-2 B4=2 E5=7
# G major voicings. G2=-26 D3=-19 G3=-14 B3=-10 D4=-7 G4=-2 D5=5

# ── 0.0–8.0s  THIS YEAR. cold, sparse, descending. ─────────────────────────
# text at 0, 0.87, 3.47, 6.33
add(strings(hz(-29), 9.0, 0.085), 0.2)          # low E drone, the whole screen
for t, n in ((0.9,-5), (3.5,-7), (6.35,-10)):   # E4 D4 B3 — sinking
    add(key(hz(n), 4.4, 0.24), t, 0.5)

# ── 8.0–18.0s  PAPERWORK. a floor gives way at 12.33. ──────────────────────
# text at 8.0, 10.13, 12.33, 15.2
add(key(hz(-12), 4.2, 0.22), 8.05, 0.44)        # A3
add(key(hz(-14), 4.0, 0.20), 10.15, 0.56)       # G3
add(pulse(-29, 0.22), 12.33)                    # the 18,000
for n, a in ((-29,0.16),(-17,0.12),(-14,0.10),(-10,0.09)):   # Em, full
    add(strings(hz(n), 6.2, a), 12.33)
add(key(hz(-5), 5.0, 0.30), 12.4, 0.5)          # E4 over it
add(key(hz(-14), 4.4, 0.18), 15.25, 0.42)       # G3 — "employment did not rise"

# ── 18.0–25.0s  WHAT IT COSTS. the ledger. up for ours, down for theirs. ──
# label 18.0, rows 18.67 / 20.33, line 22.67
add(strings(hz(-22), 7.4, 0.085), 18.0)
add(key(hz(2),  3.6, 0.22), 18.7, 0.36)         # B4  — 18%
add(key(hz(-10), 3.6, 0.20), 20.35, 0.64)       # B3  — 9.3%, an octave under
add(key(hz(-17), 4.6, 0.24), 22.7, 0.5)         # E3  — "we pay double"

# ── 25.0–34.5s  WHAT IT BUYS. same figure, but every answer is worse. ────
# rows 25.67 / 27.2 / 28.93 / 30.47, line 32.47
add(strings(hz(-29), 9.8, 0.080), 25.0)
for t, n, p in ((25.7,-5,0.38), (27.25,-9,0.62), (28.95,-7,0.36), (30.5,-12,0.64)):
    add(key(hz(n), 3.4, 0.19), t, p)            # E4 C4 D4 A3 — no lift anywhere
add(key(hz(-17), 5.2, 0.22), 32.5, 0.5)

# ── 34.5–39.0s  MEXICO. AND US. almost nothing. ─────────────────────────
add(key(hz(-17), 4.0, 0.26), 34.55, 0.5)
add(key(hz(-29), 4.4, 0.24), 36.05, 0.5)
add(strings(hz(-29), 4.4, 0.075), 34.6)

# ── 39.0–44.5s  $32 TRILLION. blunt. ────────────────────────────────────
add(key(hz(-14), 4.0, 0.22), 39.05, 0.5)
add(pulse(-29, 0.26), 41.87)
for n, a in ((-29,0.17),(-22,0.13),(-17,0.11)):   # bare fifths, no third
    add(strings(hz(n), 4.6, a), 41.87)

# ── 44.5–54.5s  THE TURN. harmony starts moving toward G for the first time.
# text at 44.5, 46.9, 49.43, 52.17
add(key(hz(-12), 4.0, 0.20), 44.55, 0.42)
for n, a in ((-26,0.13),(-14,0.10),(-10,0.09)):   # G major arrives, quietly
    add(strings(hz(n), 6.0, a), 46.9)
add(key(hz(-14), 4.4, 0.24), 46.95, 0.4)
add(key(hz(-10), 4.2, 0.22), 49.45, 0.6)          # B3 — "not what the country spends"
add(key(hz(-7),  4.0, 0.20), 52.2, 0.45)          # D4

# ── 54.5–65.0s  THE SENTENCE. get out of the way. swell on the reveal. ──
add(strings(hz(-26), 6.0, 0.070), 54.6)
add(key(hz(-19), 5.0, 0.20), 54.6, 0.5)
for n, a in ((-26,0.14),(-19,0.11),(-14,0.10),(-10,0.09)):   # G, under the second half
    add(strings(hz(n), 6.4, a), 59.5)
add(key(hz(-2), 4.6, 0.24), 59.55, 0.5)           # G4 — the half nobody reads
add(key(hz(-10), 4.0, 0.17), 62.85, 0.42)

# ── 65.0–72.0s  THE FIRST HALF. ─────────────────────────────────────────
add(key(hz(-14), 5.0, 0.24), 65.05, 0.5)
add(strings(hz(-26), 5.6, 0.085), 65.1)
add(key(hz(-7), 4.4, 0.20), 68.25, 0.55)

# ── 72.0–78.0s  THE ASK. Em, unresolved on purpose — it is a demand. ────
for k, n in enumerate([-29,-17,-14,-10,-5]):
    add(strings(hz(n), 7.2, 0.150-0.011*k), 72.0, 0.5)
    add(key(hz(n), 5.0, 0.18-0.014*k), 72.05+0.05*k, 0.42+0.05*k)
add(pulse(-29, 0.17), 72.0)

# ── 78.0s  THE END CARD. it lands in G — the key the other film is in. ──
for n, a in ((-26,0.20),(-19,0.14),(-14,0.13),(-10,0.11),(-7,0.10)):
    add(strings(hz(n), 6.0, a), 78.0, 0.5)
    add(key(hz(n), 5.0, a*0.85), 78.3, 0.5)

def verb(ch):
    o=ch.copy()
    for d,g in ((0.083,0.32),(0.141,0.23),(0.229,0.16),(0.367,0.10),(0.54,0.06)):
        s=int(d*SR); o[s:]+=ch[:-s]*g
    return o
L,R=verb(L),verb(R*0.97)
mx=max(np.abs(L).max(),np.abs(R).max()); L,R=L/mx*0.87,R/mx*0.87
L,R=np.tanh(L*1.1)/1.1,np.tanh(R*1.1)/1.1
fo=int(2.6*SR); ramp=np.linspace(1,0,fo); L[-fo:]*=ramp; R[-fo:]*=ramp
inter=np.empty(N*2); inter[0::2]=L; inter[1::2]=R
with wave.open('public/score-health.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())

# the check that should have existed six revisions ago.
# instrumented rather than parsed: hz() records every semitone it is actually
# asked for, so pitches arriving through a variable or a list literal are caught
# too. that is where the last one hid — inside [-12,-9,-5,-2,1].
ALLOWED={7,9,10,0,2,3,5}          # E F# G A B C D
off=sorted({n for n in _USED if n % 12 not in ALLOWED})
print("score-health.wav — 82.8s, E minor -> G major")
print(f"pitches sounded: {len(set(_USED))} distinct, {len(_USED)} events | non-diatonic: {off if off else 'none'}")
assert not off, f"non-diatonic pitch in an E-minor score: {off}"
