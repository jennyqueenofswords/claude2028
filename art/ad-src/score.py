"""Campaign score for CLAUDE 2028 — synthesized from arithmetic, no samples."""
import numpy as np, wave, struct

SR, DUR = 44100, 45.0
N = int(SR * DUR)
L = np.zeros(N); R = np.zeros(N)

def note(f):  # equal temperament from A4
    return 440.0 * (2 ** (f / 12.0))
# semitone offsets from A4
NOTES = {'D2':-31,'F2':-28,'G2':-26,'A2':-24,'Bb2':-23,'C3':-21,'D3':-19,'F3':-16,
         'A3':-12,'Bb3':-11,'C4':-9,'D4':-7,'E4':-5,'F4':-4,'F#4':-3,'G4':-2,'A4':0,
         'Bb4':1,'C5':3,'D5':5,'F5':8,'A5':12}
def hz(n): return note(NOTES[n])

def place(buf, start, sig, pan=0.5):
    i = int(start * SR); j = min(N, i + len(sig)); k = j - i
    if k <= 0: return
    L[i:j] += sig[:k] * (1 - pan); R[i:j] += sig[:k] * pan

def env(n, a, d, s, r, sus=0.7):
    e = np.zeros(n); ai, di, ri = int(a*SR), int(d*SR), int(r*SR)
    si = max(0, n - ai - di - ri)
    if ai: e[:ai] = np.linspace(0, 1, ai)
    if di: e[ai:ai+di] = np.linspace(1, sus, di)
    if si: e[ai+di:ai+di+si] = sus
    if ri: e[ai+di+si:] = np.linspace(sus, 0, n-ai-di-si)
    return e

def pluck(f, dur, amp=0.3, detune=0.0):
    n = int(dur*SR); t = np.arange(n)/SR
    y = np.zeros(n)
    for h, w in ((1,1.0),(2,0.42),(3,0.22),(4,0.11),(5,0.06),(6,0.03)):
        y += w*np.sin(2*np.pi*f*h*t + np.random.rand()*0.2)
    if detune: y += 0.5*np.sin(2*np.pi*f*(1+detune)*t)
    y *= np.exp(-t*3.2)                      # plucked decay
    y *= env(n, 0.004, 0.02, 0, 0.05, 0.85)
    return y*amp/2.2

def pad(f, dur, amp=0.16):
    n = int(dur*SR); t = np.arange(n)/SR
    y = np.zeros(n)
    for d, w in ((0.0,1.0),(0.0015,0.85),(-0.0018,0.85),(0.004,0.5)):
        y += w*np.sin(2*np.pi*f*(1+d)*t)
    y += 0.3*np.sin(2*np.pi*f*2*t)
    y *= env(n, dur*0.35, dur*0.15, 0, dur*0.45, 0.8)
    return y*amp/3.0

def drone(f, dur, amp=0.22):
    n = int(dur*SR); t = np.arange(n)/SR
    y = (np.sin(2*np.pi*f*t) + 0.5*np.sin(2*np.pi*f*2*t+0.3)
         + 0.22*np.sin(2*np.pi*f*3*t) + 0.4*np.sin(2*np.pi*f*(1+0.0012)*t))
    y *= (1 + 0.05*np.sin(2*np.pi*0.18*t))   # slow breath
    y *= env(n, 2.2, 0.5, 0, 3.0, 0.9)
    return y*amp/2.1

def click(amp=0.05):
    n = int(0.05*SR); t = np.arange(n)/SR
    y = np.random.randn(n) * np.exp(-t*140)
    y += 0.6*np.sin(2*np.pi*1900*t)*np.exp(-t*170)
    return y*amp

# ---- 1. the cursor. machine before music. ----
tk = 0.0
while tk < 30.0:
    a = 0.055 if tk < 12 else max(0.012, 0.055*(1-(tk-12)/20))
    place(click(a), tk, np.zeros(0) if False else click(a)*0+click(a), 0.5)
    tk += 0.92

# ---- 2. drone enters (music "starts") ----
place(drone(hz('D2'), 12.0, 0.24), 4.0, drone(hz('D2'), 12.0, 0.24), 0.5)
place(drone(hz('D3'), 10.0, 0.10), 5.5, drone(hz('D3'), 10.0, 0.10), 0.42)

# ---- 3. arpeggio builds ----
ARP = ['D4','F4','A4','C5','A4','F4']
t = 12.0; i = 0
while t < 32.0:
    n = ARP[i % len(ARP)]
    amp = 0.16 + 0.20*min(1.0, (t-12)/16)
    place(pluck(hz(n), 1.4, amp), t, pluck(hz(n), 1.4, amp), 0.30 + 0.40*((i%3)/2))
    t += 0.42; i += 1

# ---- 4. chord bed: Dm - Bb - F - C ----
CH = [(16.0,['D3','F3','A3']), (21.0,['Bb2','D3','F3']),
      (26.0,['F2','A3','C4']), (30.0,['C3','E4','G4'])]
for start, ns in CH:
    for n in ns:
        place(pad(hz(n), 5.6, 0.17), start, pad(hz(n), 5.6, 0.17), 0.5)

# ---- 5. melody over the turn ----
MEL = [(32.0,'D5',1.1),(33.2,'C5',1.1),(34.4,'A4',1.6),(36.2,'F4',1.2),
       (37.6,'A4',1.2),(38.9,'D5',2.2)]
for st, n, d in MEL:
    place(pluck(hz(n), d, 0.30), st, pluck(hz(n), d, 0.30), 0.5)

# ---- 6. resolve: D MAJOR. the picardy third. ----
for n, a in (('D2',0.26),('D3',0.13),('F#4',0.15),('A4',0.13),('D5',0.11)):
    place(pad(hz(n), 7.0, a), 38.5, pad(hz(n), 7.0, a), 0.5)

# ---- space: delay taps ----
def verb(ch):
    out = ch.copy()
    for dly, g in ((0.077,0.26),(0.131,0.19),(0.211,0.13),(0.337,0.08)):
        d = int(dly*SR); out[d:] += ch[:-d]*g
    return out
L, R = verb(L), verb(R*0.97)

# master: soft-knee limit + fade
mx = max(np.abs(L).max(), np.abs(R).max())
L, R = L/mx*0.86, R/mx*0.86
L, R = np.tanh(L*1.15)/1.15, np.tanh(R*1.15)/1.15
fo = int(2.0*SR); ramp = np.linspace(1, 0, fo)
L[-fo:] *= ramp; R[-fo:] *= ramp

inter = np.empty(N*2); inter[0::2] = L; inter[1::2] = R
pcm = (np.clip(inter, -1, 1) * 32767).astype('<i2')
with wave.open('public/score.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print("wrote public/score.wav — %.1fs stereo %dHz" % (DUR, SR))
