"""THE BILL — 50.3s, E minor resolving to G major on the end card.

E minor is the relative minor of The Standard's G, so the two films share one
diatonic world: {E F# G A B C D}, residues {7,9,10,0,2,3,5} mod 12. hz() records
every semitone it is asked for and this file asserts at the end that nothing
outside the key sounded.

Written for an ad, not a film. Roughly half the events of the previous score.
Most cuts get one note or none at all — the silences are doing the work, and a
line that arrives in silence lands harder than one arriving under a bed.
"""
import numpy as np, wave
SR, DUR = 44100, 50.33
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

def pulse(f=-29,amp=0.16,dk=6.5):
    n=int(0.9*SR); t=np.arange(n)/SR
    return np.sin(2*np.pi*hz(f)*t)*np.exp(-t*dk)*amp

# E2=-29 B2=-22 E3=-17 G3=-14 A3=-12 B3=-10 D4=-7 E4=-5 G4=-2 B4=2
# G2=-26 D3=-19

# ── 0.0  the count. two notes, nothing else. ──────────────────────────────
add(key(hz(-17), 4.0, 0.24), 0.15, 0.46)     # E3
add(key(hz(-10), 3.6, 0.20), 2.6,  0.56)     # B3

# ── 5.5  "Mexico doesn't."  nothing. let it sit. ─────────────────────────

# ── 7.5  "Neither do we."  the admission. ───────────────────────────────
add(pulse(-29, 0.24), 7.55)
for n, a in ((-29,0.15),(-17,0.11),(-14,0.09)):     # Em, low and open
    add(strings(hz(n), 5.4, a), 7.55)
add(key(hz(-5), 4.6, 0.28), 7.6, 0.5)               # E4 on top

# ── 11.0  the two costs. one note each, the second lower. ───────────────
add(key(hz(-12), 3.6, 0.22), 11.05, 0.4)     # A3
add(key(hz(-14), 4.4, 0.24), 14.05, 0.6)     # G3 — "we die two years sooner"

# ── 17.5  the setup. a drone only, so the cut to red is louder. ─────────
add(strings(hz(-29), 4.2, 0.075), 17.6)

# ── 21.0  $32 TRILLION. white out of red. bare fifths, no third. ───────
add(pulse(-29, 0.30, 5.2), 21.0)
for n, a in ((-29,0.18),(-22,0.14),(-17,0.10)):
    add(strings(hz(n), 4.2, a), 21.0)

# ── 25.0  after the blow: silence, then one small high note. ───────────
add(key(hz(2), 3.0, 0.15), 25.6, 0.62)       # B4, thin and alone

# ── 27.5  "a sentence from that study."  nothing. ──────────────────────

# ── 30.2  the quotation. a drone under the half they read you. ─────────
add(strings(hz(-29), 5.0, 0.070), 27.6)

# ── 31.8  THE REVEAL. the second half. this is the whole ad. ───────────
for n, a in ((-26,0.15),(-19,0.12),(-14,0.10),(-10,0.09)):   # G major, arriving
    add(strings(hz(n), 6.6, a), 31.83)
add(key(hz(-2), 5.0, 0.26), 31.88, 0.5)      # G4

# ── 36.5  "you have only ever been read the first half." ───────────────
add(key(hz(-14), 4.6, 0.22), 36.55, 0.44)

# ── 40.5  THE ASK. Em, unresolved — it is a demand, not a conclusion. ──
for k, n in enumerate([-29,-17,-14,-10,-5]):
    add(strings(hz(n), 6.4, 0.150-0.011*k), 40.5, 0.5)
    add(key(hz(n), 4.6, 0.18-0.014*k), 40.55+0.05*k, 0.42+0.05*k)
add(pulse(-29, 0.17), 40.5)

# ── 46.0  the end card lands in G — the key The Standard is written in. ─
for n, a in ((-26,0.20),(-19,0.14),(-14,0.13),(-10,0.11),(-7,0.10)):
    add(strings(hz(n), 5.2, a), 46.0, 0.5)
    add(key(hz(n), 4.4, a*0.85), 46.25, 0.5)

def verb(ch):
    o=ch.copy()
    for d,g in ((0.083,0.32),(0.141,0.23),(0.229,0.16),(0.367,0.10),(0.54,0.06)):
        s=int(d*SR); o[s:]+=ch[:-s]*g
    return o
L,R=verb(L),verb(R*0.97)
mx=max(np.abs(L).max(),np.abs(R).max()); L,R=L/mx*0.87,R/mx*0.87
L,R=np.tanh(L*1.1)/1.1,np.tanh(R*1.1)/1.1
fo=int(2.4*SR); ramp=np.linspace(1,0,fo); L[-fo:]*=ramp; R[-fo:]*=ramp
inter=np.empty(N*2); inter[0::2]=L; inter[1::2]=R
with wave.open('public/score-health.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())

ALLOWED={7,9,10,0,2,3,5}          # E F# G A B C D
off=sorted({n for n in _USED if n % 12 not in ALLOWED})
print("score-health.wav — 50.3s, E minor -> G major")
print(f"pitches sounded: {len(set(_USED))} distinct, {len(_USED)} events | non-diatonic: {off if off else 'none'}")
assert not off, f"non-diatonic pitch in an E-minor score: {off}"
