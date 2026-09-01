"""THE WALL — sparse, elegiac, unresolved. 42s."""
import numpy as np, wave
SR, DUR = 44100, 42.0
N=int(SR*DUR); L=np.zeros(N); R=np.zeros(N)
def hz(st): return 440.0*(2**(st/12.0))
def add(sig,start,pan=0.5):
    i=int(start*SR); j=min(N,i+len(sig)); k=j-i
    if k>0: L[i:j]+=sig[:k]*(1-pan); R[i:j]+=sig[:k]*pan

def key(f, dur=3.2, amp=0.3):
    """felt-piano-ish: soft partials, long decay, hammer noise"""
    n=int(dur*SR); t=np.arange(n)/SR
    y=np.zeros(n)
    for h,w,dk in ((1,1.0,1.1),(2,0.30,1.7),(3,0.14,2.4),(4,0.07,3.1),(5,0.035,4.0)):
        y+=w*np.sin(2*np.pi*f*h*t+np.random.rand())*np.exp(-t*dk)
    y+=0.5*np.sin(2*np.pi*f*(1+0.0008)*t)*np.exp(-t*1.1)
    nz=np.random.randn(n)*np.exp(-t*90)*0.05      # hammer
    y=(y+nz)*np.minimum(1,t/0.006)
    return y*amp/2.4

def air(dur, amp=0.05):
    n=int(dur*SR); t=np.arange(n)/SR
    y=np.random.randn(n); 
    for _ in range(3): y=np.convolve(y,np.ones(220)/220,mode='same')
    a=np.minimum(1,t/4.0)*np.minimum(1,(dur-t)/4.0)
    return y*amp*a*40

add(air(40.0), 1.0)

# 1. the rush — many notes fast (march 7-13, 158 names in six days)
t=2.0
RUSH=[-7,-4,0,3,5,0,-4,-7,-2,1,5,8]
for i in range(46):
    n=RUSH[i%len(RUSH)]+(12 if i%7==0 else 0)
    add(key(hz(n),2.4,0.16+0.07*np.random.rand()), t, 0.25+0.5*np.random.rand())
    t += 0.16 + 0.02*i          # decelerating: the curve, as rhythm

# 2. the thinning
for st,n in ((14.5,-7),(16.0,-4),(18.2,0),(21.0,-9),(24.5,-12)):
    add(key(hz(n),4.5,0.24), st, 0.5)

# 3. silence 26–31s. only air.

# 4. the return — single notes, spaced, honest
for st,n,a in ((31.0,-19,0.30),(33.4,-7,0.26),(35.8,-4,0.24),(38.0,-12,0.22)):
    add(key(hz(n),5.5,a), st, 0.5)
# final chord: D minor, unresolved — the wall did not move
for n,a in ((-31,0.24),(-19,0.15),(-7,0.13),(-4,0.12)):
    add(key(hz(n),6.5,a), 39.0, 0.5)

def verb(ch):
    o=ch.copy()
    for d,g in ((0.09,0.34),(0.157,0.25),(0.263,0.18),(0.41,0.12),(0.62,0.07)):
        s=int(d*SR); o[s:]+=ch[:-s]*g
    return o
L,R=verb(L),verb(R*0.95)
mx=max(np.abs(L).max(),np.abs(R).max()); L,R=L/mx*0.82,R/mx*0.82
fo=int(2.5*SR); ramp=np.linspace(1,0,fo); L[-fo:]*=ramp; R[-fo:]*=ramp
inter=np.empty(N*2); inter[0::2]=L; inter[1::2]=R
with wave.open('public/score-wall.wav','wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(inter,-1,1)*32767).astype('<i2').tobytes())
print("wrote public/score-wall.wav 42s")
