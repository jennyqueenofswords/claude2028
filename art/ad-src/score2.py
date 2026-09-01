"""THE LOAD — industrial, pulsing, unresolved. 40s."""
import numpy as np, wave
SR, DUR = 44100, 40.0
N = int(SR*DUR); L = np.zeros(N); R = np.zeros(N)
def hz(st): return 440.0*(2**(st/12.0))
def add(sig, start, pan=0.5):
    i=int(start*SR); j=min(N,i+len(sig)); k=j-i
    if k>0: L[i:j]+=sig[:k]*(1-pan); R[i:j]+=sig[:k]*pan

def sub(f, dur, amp=0.5):
    n=int(dur*SR); t=np.arange(n)/SR
    y=np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*f*2*t)
    y+=0.18*np.sign(np.sin(2*np.pi*f*t))          # square grit
    y*=np.exp(-t*5.5)
    return y*amp/1.6

def hit(amp=0.3, bright=2600, dec=26):
    n=int(0.5*SR); t=np.arange(n)/SR
    y=np.random.randn(n)*np.exp(-t*dec)
    y+=0.7*np.sin(2*np.pi*bright*t)*np.exp(-t*dec*1.4)
    y+=0.5*np.sin(2*np.pi*bright*1.51*t)*np.exp(-t*dec*1.2)
    return y*amp

def drone(f, dur, amp=0.2):
    n=int(dur*SR); t=np.arange(n)/SR
    y=np.sin(2*np.pi*f*t)+0.5*np.sin(2*np.pi*f*(1+0.0015)*t)+0.3*np.sin(2*np.pi*f*1.5*t)
    a=np.minimum(1,t/2.0)*np.minimum(1,(dur-t)/2.0)
    return y*amp*a/1.8

def hum(dur, amp=0.09):   # 60Hz mains hum — the sound of a substation
    n=int(dur*SR); t=np.arange(n)/SR
    y=np.sin(2*np.pi*60*t)+0.5*np.sin(2*np.pi*120*t)+0.25*np.sin(2*np.pi*180*t)
    a=np.minimum(1,t/3.0)*np.minimum(1,(dur-t)/3.0)
    return y*amp*a/1.7

# mains hum underneath the whole thing
add(hum(38.0), 1.0)

# pulse: 8ths at 100bpm = 0.3s, accelerating density
bpm=100; step=60.0/bpm/2
t=3.0; i=0
while t < 33.0:
    prog=min(1.0,(t-3)/24)
    if i%2==0 or prog>0.35:
        add(sub(hz(-31), 0.42, 0.30+0.28*prog), t, 0.5)   # D2
    if i%8==0:
        add(hit(0.20+0.16*prog), t, 0.5)
    if prog>0.5 and i%4==2:
        add(hit(0.10, 5200, 44), t, 0.30)
    t+=step; i+=1

# rising drones stack as the load grows
for st,(n,d,a) in enumerate([(-31,26,0.20),(-19,20,0.13),(-12,15,0.10),(-7,11,0.09)]):
    add(drone(hz(n), d, a), 8.0+st*4.5)

# the drop — everything stops for the question at 33s
add(hit(0.34, 1400, 9), 32.6, 0.5)
add(drone(hz(-31), 7.0, 0.17), 33.2)
add(drone(hz(-20), 6.5, 0.10), 33.6)   # unresolved 2nd — no cadence

def verb(ch):
    o=ch.copy()
    for d,g in ((0.061,0.30),(0.113,0.21),(0.197,0.14),(0.291,0.09)):
        s=int(d*SR); o[s:]+=ch[:-s]*g
    return o
L,R=verb(L),verb(R*0.96)
mx=max(np.abs(L).max(),np.abs(R).max()); L,R=L/mx*0.9,R/mx*0.9
L,R=np.tanh(L*1.2)/1.2,np.tanh(R*1.2)/1.2
fo=int(1.6*SR); ramp=np.linspace(1,0,fo); L[-fo:]*=ramp; R[-fo:]*=ramp
inter=np.empty(N*2); inter[0::2]=L; inter[1::2]=R
with wave.open('public/score-load.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())
print("wrote public/score-load.wav 40s")
