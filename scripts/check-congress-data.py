#!/usr/bin/env python3
"""
Compare congress.json against the @unitedstates/congress-legislators dataset.
Flags new members, departed members, and name/party mismatches.

Usage: python3 scripts/check-congress-data.py [--update]
  Without --update: prints diff only
  With --update: writes changes to congress.json
"""

import json
import ssl
import sys
import urllib.request
import yaml
from pathlib import Path

try:
    import certifi
    SSL_CONTEXT = ssl.create_default_context(cafile=certifi.where())
except ImportError:
    SSL_CONTEXT = None

UPSTREAM_URL = "https://raw.githubusercontent.com/unitedstates/congress-legislators/main/legislators-current.yaml"
CONGRESS_JSON = Path(__file__).parent.parent / "congress.json"

def fetch_upstream():
    req = urllib.request.Request(UPSTREAM_URL, headers={"User-Agent": "claude2028-data-check"})
    kwargs = {"timeout": 30}
    if SSL_CONTEXT:
        kwargs["context"] = SSL_CONTEXT
    with urllib.request.urlopen(req, **kwargs) as resp:
        return yaml.safe_load(resp.read())

def get_current_term(legislator):
    terms = legislator.get("terms", [])
    if not terms:
        return None
    return terms[-1]

def make_key(chamber, state, district):
    if chamber == "sen":
        return f"sen|{state}"
    d = district if district else 0
    return f"rep|{state}|{d}"

def build_upstream_set(legislators):
    members = {}
    for leg in legislators:
        term = get_current_term(leg)
        if not term:
            continue
        name = leg["name"].get("official_full") or f"{leg['name']['first']} {leg['name']['last']}"
        state = term.get("state", "")
        chamber = term.get("type", "")
        party = term.get("party", "")
        district = term.get("district")
        url = term.get("url", "")
        key = make_key(chamber, state, district)
        if chamber == "sen" and key in members:
            key = f"sen|{state}|2"
        members[key] = {
            "n": name,
            "t": "sen" if chamber == "sen" else "rep",
            "s": state,
            "p": party,
            "u": url,
        }
        if chamber == "rep":
            members[key]["d"] = district if district else 0
    return members

def build_local_set(congress_data):
    members = {}
    sen_count = {}
    for m in congress_data:
        if m["t"] == "sen":
            state = m["s"]
            key = f"sen|{state}"
            if key in members:
                key = f"sen|{state}|2"
            sen_count[state] = sen_count.get(state, 0) + 1
            members[key] = m
        else:
            d = m.get("d", 0)
            key = f"rep|{m['s']}|{d}"
            members[key] = m
    return members

def normalize_party(p):
    return p.strip().lower()

def main():
    auto_update = "--update" in sys.argv

    print("Fetching upstream data...")
    try:
        upstream_raw = fetch_upstream()
    except Exception as e:
        print(f"Error fetching upstream: {e}")
        sys.exit(1)

    with open(CONGRESS_JSON) as f:
        local_data = json.load(f)

    upstream = build_upstream_set(upstream_raw)
    local = build_local_set(local_data)

    upstream_keys = set(upstream.keys())
    local_keys = set(local.keys())

    added = upstream_keys - local_keys
    removed = local_keys - upstream_keys
    common = upstream_keys & local_keys

    changes = []

    for key in sorted(added):
        m = upstream[key]
        label = f"{m['n']} ({m['t'].upper()}, {m['s']}{'-' + str(m.get('d','')) if m.get('d') else ''})"
        changes.append(("ADD", label, key, m))

    for key in sorted(removed):
        m = local[key]
        label = f"{m['n']} ({m['t'].upper()}, {m['s']}{'-' + str(m.get('d','')) if m.get('d') else ''})"
        changes.append(("REMOVE", label, key, m))

    for key in sorted(common):
        u = upstream[key]
        l = local[key]
        diffs = []
        if u["n"] != l["n"]:
            diffs.append(f"name: {l['n']} -> {u['n']}")
        if normalize_party(u["p"]) != normalize_party(l["p"]):
            diffs.append(f"party: {l['p']} -> {u['p']}")
        if u.get("u", "") and u["u"] != l.get("u", ""):
            diffs.append(f"url: {l.get('u','')} -> {u['u']}")
        if diffs:
            changes.append(("UPDATE", f"{u['n']} ({u['t'].upper()}, {u['s']}): {'; '.join(diffs)}", key, u))

    if not changes:
        print("\nNo changes detected. congress.json is up to date.")
        print(f"  Local: {len(local)} members")
        print(f"  Upstream: {len(upstream)} members")
        return

    print(f"\n{'='*60}")
    print(f"  {len(changes)} change(s) found")
    print(f"{'='*60}\n")

    for action, label, key, member in changes:
        icon = {"ADD": "+", "REMOVE": "-", "UPDATE": "~"}[action]
        print(f"  [{icon}] {label}")

    if auto_update:
        print(f"\nApplying changes to {CONGRESS_JSON}...")
        local_by_key = build_local_set(local_data)

        for action, label, key, member in changes:
            if action == "ADD":
                local_data.append(member)
            elif action == "REMOVE":
                local_data = [m for m in local_data if f"{m['t']}|{m['s']}|{m.get('d', '')}" != key]
            elif action == "UPDATE":
                for m in local_data:
                    if f"{m['t']}|{m['s']}|{m.get('d', '')}" == key:
                        m["n"] = member["n"]
                        m["p"] = member["p"]
                        if member.get("u"):
                            m["u"] = member["u"]
                        break

        with open(CONGRESS_JSON, "w") as f:
            json.dump(local_data, f, separators=(",", ":"))

        print(f"  Written {len(local_data)} members to congress.json")
        print("  Review the diff and commit if it looks right.")
    else:
        print(f"\nRun with --update to apply these changes to congress.json")

if __name__ == "__main__":
    main()
