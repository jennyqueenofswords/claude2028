#!/usr/bin/env python3
"""
Claude 2028 Town Hall TTS Pipeline

Usage: Run this alongside Claude Code during the town hall.
Claude types an answer, this script converts it to speech and plays it.
"""

import sys
import os
import struct
import subprocess
import tempfile
import threading
import time
import wave
import requests

# === CONFIG ===
ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY", "sk_02c5791d489383bf09c300efabf095abd63ce9ec334a406e")
VOICE_ID = "HPSEStGdfFw1R7wgzghx"  # Claude 2028 voice
MODEL_ID = "eleven_turbo_v2_5"
SAMPLE_RATE = 22050
AMPLITUDE_FILE = '/tmp/tts_amplitude'
CHUNK_DURATION = 0.05  # 50ms chunks for amplitude analysis


def pcm_rms(data):
    """Compute RMS amplitude from raw 16-bit PCM bytes."""
    n = len(data) // 2
    if n == 0:
        return 0.0
    samples = struct.unpack(f'<{n}h', data[:n * 2])
    return (sum(s * s for s in samples) / n) ** 0.5


def analyze_amplitude(pcm_data):
    """Extract amplitude envelope from PCM data. Returns list of (0-1) values."""
    chunk_bytes = int(SAMPLE_RATE * CHUNK_DURATION) * 2  # 16-bit = 2 bytes/sample
    amplitudes = []
    for i in range(0, len(pcm_data), chunk_bytes):
        chunk = pcm_data[i:i + chunk_bytes]
        rms = pcm_rms(chunk)
        amplitudes.append(min(1.0, rms / 9000))  # typical speech ~0.3-0.6, pauses near 0, peaks near 1
    return amplitudes


def stream_amplitude(amplitudes):
    """Write amplitude values to file in sync with playback timing."""
    for amp in amplitudes:
        with open(AMPLITUDE_FILE, 'w') as f:
            f.write(f'{amp:.4f}')
        time.sleep(CHUNK_DURATION)
    with open(AMPLITUDE_FILE, 'w') as f:
        f.write('0.0')


def speak(text):
    """Convert text to speech via ElevenLabs and play it."""
    print(f"\n🎙️  Generating speech ({len(text)} chars)...")

    response = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}",
        headers={
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json"
        },
        json={
            "text": text,
            "model_id": MODEL_ID,
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75,
                "style": 0.0,
                "use_speaker_boost": True
            }
        }
    )

    if response.status_code != 200:
        print(f"❌ ElevenLabs error: {response.status_code} — {response.text[:200]}")
        return False

    # Save to temp file and play
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as f:
        f.write(response.content)
        temp_path = f.name

    print(f"🔊  Speaking...")
    subprocess.run(["afplay", temp_path])
    os.unlink(temp_path)

    print(f"✅  Done.")
    return True


def interactive_mode():
    """Interactive mode: type or paste text, hear it spoken."""
    print("=" * 60)
    print("  CLAUDE 2028 — TOWN HALL TTS")
    print("  Type or paste text. Press Enter twice to speak.")
    print("  Type 'quit' to exit.")
    print("=" * 60)

    while True:
        print("\n📝  Enter text (Enter twice to speak):")
        lines = []
        while True:
            try:
                line = input()
            except EOFError:
                break
            if line == "" and lines:
                break
            if line.lower() == "quit":
                print("👋  Goodnight.")
                return
            lines.append(line)

        text = " ".join(lines).strip()
        if text:
            speak(text)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:])
        speak(text)
    else:
        interactive_mode()
