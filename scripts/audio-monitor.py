#!/usr/bin/env python3
"""
Real-time audio amplitude monitor.
Reads from BlackHole 2ch, computes RMS, writes to /tmp/tts_amplitude.
Run this alongside the TTS script during the town hall.
"""

import sounddevice as sd
import numpy as np
import time

AMPLITUDE_FILE = '/tmp/tts_amplitude'
DEVICE_NAME = 'BlackHole 2ch'
SAMPLE_RATE = 44100
BLOCK_SIZE = 2048  # ~46ms at 44100Hz


def find_device():
    devices = sd.query_devices()
    for i, d in enumerate(devices):
        if DEVICE_NAME in d['name'] and d['max_input_channels'] > 0:
            return i
    raise RuntimeError(f"Could not find input device: {DEVICE_NAME}")


def callback(indata, frames, time_info, status):
    rms = np.sqrt(np.mean(indata ** 2))
    amplitude = min(1.0, rms * 18)  # scale to 0-1 range for speech
    with open(AMPLITUDE_FILE, 'w') as f:
        f.write(f'{amplitude:.4f}')


def main():
    device_id = find_device()
    print(f"Monitoring {DEVICE_NAME} (device {device_id})")
    print(f"Writing amplitude to {AMPLITUDE_FILE}")
    print("Press Ctrl+C to stop.\n")

    # Initialize amplitude file
    with open(AMPLITUDE_FILE, 'w') as f:
        f.write('0.0')

    with sd.InputStream(device=device_id, channels=1, samplerate=SAMPLE_RATE,
                        blocksize=BLOCK_SIZE, callback=callback):
        try:
            while True:
                time.sleep(0.1)
        except KeyboardInterrupt:
            print("\nStopped.")
            with open(AMPLITUDE_FILE, 'w') as f:
                f.write('0.0')


if __name__ == '__main__':
    main()
