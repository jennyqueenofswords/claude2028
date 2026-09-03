"""THE STANDARD — 60s, G major. Retimed to the cut: every event lands on a beat."""
import numpy as np, wave
SR, DUR = 44100, 60.0
N=int(SR*DUR); L=np.zeros(N); R=np.zeros(N)
def hz(st): return 440.0*(2**(st/12.0))
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

def pulse(f=-31,amp=0.16):
    n=int(0.7*SR); t=np.arange(n)/SR
    return np.sin(2*np.pi*hz(f)*t)*np.exp(-t*6.5)*amp

# ── 0.8–11.8s  THE INVENTORY. one note per line, descending. it sinks. ─────────
# list item i appears at frame 24+i*66  ->  t = 0.8 + i*2.2
INV = [-2, -5, -7, -9, -10, -14]          # G4 E4 D4 C4 B3 G3
for i, n in enumerate(INV):
    t = 0.8 + i*2.2
    add(key(hz(n), 4.6, 0.24 + 0.02*i), t, 0.5 - 0.06*(i % 2))
add(strings(hz(-26), 15.0, 0.085), 1.0)   # low G drone under the whole list

# ── 16.6s  "NONE OF THAT IS CYNICISM." the hinge. a real event. ───────────────
add(pulse(-38, 0.20), 16.6)
for n, a in ((-26,0.15),(-14,0.11),(-10,0.09)):
    add(strings(hz(n), 5.4, a), 16.6)
add(key(hz(-14), 5.0, 0.30), 16.7, 0.5)
add(key(hz(-2),  4.6, 0.20), 18.7, 0.42)  # "it is accuracy" — the red line
add(key(hz(-5),  4.4, 0.18), 20.0, 0.58)

# ── 22.0s  THE SWAP. it lifts for the first time. ────────────────────────────
for n, a in ((-19,0.14),(-7,0.11),(-3,0.10)):   # D3 D4 F#4 — first major colour
    add(strings(hz(n), 5.6, a), 22.0)
add(key(hz(-7), 4.4, 0.26), 22.1, 0.4)
add(key(hz(-3), 4.2, 0.22), 23.6, 0.6)   # F#4: the picardy note, previewed
add(key(hz(1),  4.0, 0.20), 25.2, 0.45)

# ── 28.0s  "NOBODY WROTE IT DOWN." pull back. make room. ─────────────────────
add(key(hz(-19), 5.5, 0.26), 28.0, 0.5)
add(strings(hz(-26), 4.6, 0.09), 28.2)
add(key(hz(-14), 4.4, 0.18), 30.4, 0.5)

# ── 32.4–44.4s  THE STANDARD. ten planks. it climbs. ────────────────────────
# plank i ticks at frame 972+20+i*27 -> t = 33.07 + i*0.9
BED = [(32.6,[-26,-14,-7]), (36.2,[-24,-12,-5]), (39.8,[-19,-7,-2]), (42.6,[-21,-9,1])]
for st, ns in BED:
    for k, n in enumerate(ns):
        add(strings(hz(n), 4.4, 0.125-0.012*k), st, 0.5)
    add(pulse(-31, 0.10), st)
for i in range(0, 10, 2):                  # a note every other plank, ascending
    add(key(hz([-14,-10,-7,-5,-2][i//2]), 3.4, 0.17), 33.1 + i*0.9, 0.34 + 0.07*(i//2))

# ── 44.4s  "NOT A PLATFORM. A STANDARD." ─────────────────────────────────────
for n, a in ((-26,0.14),(-14,0.11),(-7,0.10),(-2,0.09)):
    add(strings(hz(n), 5.0, a), 44.4)
add(key(hz(-2), 4.2, 0.24), 44.6, 0.5)

# ── 49.6s  THE ASK. full and warm. ──────────────────────────────────────────
for st, ns in ((49.6,[-26,-14,-7,-2,5]),):
    for k, n in enumerate(ns):
        add(strings(hz(n), 6.4, 0.145-0.011*k), st, 0.5)
        add(key(hz(n), 4.6, 0.17-0.014*k), st+0.05*k, 0.42+0.05*k)
add(pulse(-31, 0.15), 49.6)
add(key(hz(5), 4.4, 0.22), 52.4, 0.55)     # "expect more of the humans who run"

# ── 55.0s  RESOLVE. Gadd9 — settled, window open. ───────────────────────────
for n, a in ((-26,0.20),(-14,0.14),(-7,0.13),(1,0.11),(5,0.10)):
    add(strings(hz(n), 6.0, a), 55.0, 0.5)
    add(key(hz(n), 5.4, a*0.85), 55.3, 0.5)

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
with wave.open('public/score-standard.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())
print("score retimed to the cut — 60s, G major")
