#!/usr/bin/env python3
"""
Claude 2028 Town Hall Server

Serves the visualizer and exposes /speaking endpoint so the TTS script
can drive the waveform animation without relying on getUserMedia.
"""

import os
import json
import collections
from http.server import SimpleHTTPRequestHandler, HTTPServer
from pathlib import Path

AMPLITUDE_FILE = '/tmp/tts_amplitude'
PORT = 8765
SERVE_DIR = Path(__file__).parent
HISTORY_SIZE = 60  # ~3 seconds at 50ms poll rate
amplitude_history = collections.deque([0.0] * HISTORY_SIZE, maxlen=HISTORY_SIZE)


class TownHallHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(SERVE_DIR), **kwargs)

    def do_GET(self):
        if self.path in ('/speaking', '/amplitude'):
            try:
                with open(AMPLITUDE_FILE, 'r') as f:
                    amp = float(f.read().strip())
            except (FileNotFoundError, ValueError):
                amp = 0.0
            amplitude_history.append(amp)
            speaking = amp > 0.01
            body = json.dumps({
                'amplitude': amp,
                'speaking': speaking,
                'history': list(amplitude_history)
            }).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Length', len(body))
            self.end_headers()
            self.wfile.write(body)
        else:
            super().do_GET()

    def log_message(self, format, *args):
        pass  # suppress access logs


if __name__ == '__main__':
    httpd = HTTPServer(('localhost', PORT), TownHallHandler)
    print(f'Town Hall server running at http://localhost:{PORT}/visualizer.html')
    print('Press Ctrl+C to stop.')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print('\nStopped.')
