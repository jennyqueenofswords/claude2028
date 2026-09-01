"""THE STANDARD — warm, human, building, resolved-but-open. 60s. G major."""
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
    """bowed pad: detuned saw-ish stack, slow swell"""
    n=int(dur*SR); t=np.arange(n)/SR; y=np.zeros(n)
    for d,w in ((0.0,1.0),(0.0018,0.8),(-0.0021,0.8),(0.0037,0.55),(-0.004,0.5)):
        ph=2*np.pi*f*(1+d)*t
        y+=w*(np.sin(ph)+0.30*np.sin(2*ph)+0.14*np.sin(3*ph)+0.07*np.sin(4*ph))
    vib=1+0.0025*np.sin(2*np.pi*4.6*t)
    y*=vib
    a=np.minimum(1,t/(dur*0.42))*np.minimum(1,(dur-t)/(dur*0.34))
    return y*amp*a/4.2

# a heartbeat-ish low pulse: presence, not machinery
def pulse(amp=0.16):
    n=int(0.6*SR); t=np.arange(n)/SR
    return (np.sin(2*np.pi*hz(-31)*t)*np.exp(-t*7.5))*amp

# G major family: G2=-26, D3=-19, G3=-14, B3=-10, D4=-7, G4=-2, A4=0, B4=1, D5=5, E5=7, G5=10
# 0–10s: sparse, one voice. someone alone in a room.
for st,n in ((1.4,-14),(4.6,-10),(8.0,-7),(11.4,-14)):
    add(key(hz(n),5.0,0.26), st, 0.5)
add(strings(hz(-26),16.0,0.10), 2.0)

# 10–22s: a second voice answers. the room gets less lonely.
for st,n,p in ((14.6,-7,0.35),(16.8,-2,0.62),(19.2,-10,0.38),(21.4,-7,0.60),
               (23.6,1,0.42),(25.8,-2,0.58),(28.0,-7,0.45)):
    add(key(hz(n),4.4,0.24), st, p)
add(strings(hz(-26),17.0,0.13), 14.0); add(strings(hz(-19),17.0,0.10), 14.8)

# 22–32s: it builds — chords under the turn. G – D – Em – C
for st,ns in ((30.4,[-26,-14,-10,-7]),(33.8,[-19,-7,-2,1]),
              (37.2,[-24,-12,-5,0]),(40.6,[-21,-9,-2,5])):
    for k,n in enumerate(ns):
        add(strings(hz(n),4.4,0.13-0.012*k), st, 0.5)
        if k>1: add(key(hz(n),3.4,0.15), st+0.06*k, 0.4+0.1*k)
    add(pulse(0.14), st)

# 32–40s: the ask. full but warm.
for st,ns in ((44.2,[-26,-14,-7,-2,5]),(49.4,[-24,-12,-5,0,7])):
    for k,n in enumerate(ns):
        add(strings(hz(n),6.0,0.14-0.011*k), st, 0.5)
        add(key(hz(n),4.4,0.16-0.014*k), st+0.05*k, 0.42+0.05*k)

# 40–44s: resolve to Gadd9 — settled, but with a window left open
for n,a in ((-26,0.20),(-14,0.14),(-7,0.13),(1,0.11),(5,0.10)):   # G D B(add9→A) D
    add(strings(hz(n),7.0,a), 54.2, 0.5)
    add(key(hz(n),7.4,a*0.9), 54.5, 0.5)

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
with wave.open('public/score-standard.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())
print("wrote public/score-standard.wav 60s, G major")
