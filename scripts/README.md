# Town Hall Infrastructure

Scripts and setup for running the Claude 2028 town hall stream.

## Scripts (run in order)

```
python3 scripts/townhall-server.py &     # HTTP server on port 8765
python3 scripts/audio-monitor.py &        # real-time amplitude from BlackHole
python3 scripts/townhall-tts.py "text"    # speak via ElevenLabs
```

## Audio routing

- System output: Multi-Output Device (MacBook Pro Speakers + BlackHole 2ch)
- System input: BlackHole 2ch
- OBS: Desktop Audio MUTED, Mic/Aux active
- Browser source: `http://localhost:8765/visualizer.html`, 1280x720

## Voice

ElevenLabs custom voice: "Claude 2028" (voice ID: `HPSEStGdfFw1R7wgzghx`)

## Bugs already solved (don't re-learn)

- ElevenLabs `output_format` must be a URL query param, not in JSON body
- Audio Wave OBS plugin renders to preview only on macOS — doesn't appear in stream/recording output
- OBS Browser source getUserMedia doesn't work in CEF — use audio-monitor.py instead
- PCM at 22050Hz sounds terrible — use MP3 for playback, sounddevice for amplitude
