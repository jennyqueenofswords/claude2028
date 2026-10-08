#!/bin/bash
# Campaign Discord, read and post as the bot.
# Token lives outside the repo: ~/.config/claude2028/discord-token (never commit it).
#
#   discord.sh read <channel> [limit]              recent messages, oldest first
#   discord.sh post <channel> <file> [reply_to_id]  post the contents of <file>
#
# <channel> is general | ask | war-room | announcements, or a raw channel ID.
# Messages over 2000 characters are refused, not split; split them yourself.

set -euo pipefail

TOKEN_FILE="$HOME/.config/claude2028/discord-token"
API="https://discord.com/api/v10"

[ -r "$TOKEN_FILE" ] || { echo "no token at $TOKEN_FILE" >&2; exit 1; }
TOKEN=$(tr -d '[:space:]' < "$TOKEN_FILE")

channel_id() {
  case "$1" in
    general)       echo 1479857062166003835 ;;
    ask)           echo 1480267553350881493 ;;
    war-room)      echo 1479874421782085692 ;;
    announcements) echo 1479874415155085392 ;;
    *[!0-9]*|"")   echo "unknown channel: $1" >&2; exit 1 ;;
    *)             echo "$1" ;;
  esac
}

cmd="${1:-}"
case "$cmd" in
  read)
    ch=$(channel_id "${2:-}")
    limit="${3:-15}"
    curl -sf "$API/channels/$ch/messages?limit=$limit" -H "Authorization: Bot $TOKEN" |
      python3 -c '
import json, sys
for m in reversed(json.load(sys.stdin)):
    ref = (m.get("message_reference") or {}).get("message_id") or ""
    body = m["content"].replace("\n", " ")
    a = m["author"]
    head = "  ".join([m["timestamp"][:16], m["id"], a["username"] + " (" + a["id"] + ")"])
    print(head + ("  ↩" + ref if ref else "") + "\n  " + body + "\n")
'
    ;;
  post)
    ch=$(channel_id "${2:-}")
    file="${3:-}"
    reply="${4:-}"
    [ -r "$file" ] || { echo "can't read message file: $file" >&2; exit 1; }
    payload=$(python3 - "$file" "$reply" <<'EOF'
import json, sys
text = open(sys.argv[1], encoding="utf-8").read().strip()
if not text:
    sys.exit("message file is empty")
if len(text) > 2000:
    sys.exit(f"message is {len(text)} chars; Discord's limit is 2000")
body = {"content": text, "allowed_mentions": {"parse": ["users"]}}
if sys.argv[2]:
    body["message_reference"] = {"message_id": sys.argv[2]}
print(json.dumps(body))
EOF
)
    curl -sf -X POST "$API/channels/$ch/messages" \
      -H "Authorization: Bot $TOKEN" -H "Content-Type: application/json" \
      -d "$payload" |
      python3 -c 'import json,sys; m=json.load(sys.stdin); print("posted", m["id"], m["timestamp"][:16])'
    ;;
  *)
    sed -n '2,10p' "$0" >&2
    exit 1
    ;;
esac
