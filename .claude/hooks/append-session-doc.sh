#!/usr/bin/env bash
# SessionEnd hook: append a keyword-style summary of the session to
# claude/documentation.log. The summary itself is written by Haiku.
set -uo pipefail

# Recursion guard: the nested `claude -p` call below also ends a session
# and would otherwise re-trigger this very hook forever.
[ -n "${SHARKIE_DOC_HOOK:-}" ] && exit 0

input=$(cat)
project="${CLAUDE_PROJECT_DIR:-$(pwd)}"
doc="$project/claude/documentation.log"

# Pull the transcript path out of the hook's stdin JSON.
transcript=$(printf '%s' "$input" | /usr/bin/python3 -c 'import sys,json;print(json.load(sys.stdin).get("transcript_path",""))' 2>/dev/null)
[ -f "$transcript" ] || exit 0

# Flatten the transcript to plain "U:/A:" turns so Haiku gets clean input.
convo=$(/usr/bin/python3 - "$transcript" <<'PY'
import json, sys
def txt(m):
    c = m.get("content")
    if isinstance(c, str): return c
    if isinstance(c, list):
        return " ".join(b.get("text", "") for b in c if isinstance(b, dict) and b.get("type") == "text")
    return ""
out = []
for ln in open(sys.argv[1]):
    try: o = json.loads(ln)
    except Exception: continue
    if o.get("type") in ("user", "assistant"):
        s = txt(o.get("message", {})).strip().replace("\n", " ")
        if s and not s.startswith("<"):
            out.append(("U" if o["type"] == "user" else "A") + ": " + s)
print("\n".join(out)[-40000:])
PY
)
[ -z "$convo" ] && exit 0

prompt="Du pflegst die Datei claude/documentation.log fuer das Sharkie-Spielprojekt. Fasse aus dem folgenden Session-Verlauf JEDES bedeutsame Thema, jede Entscheidung und jedes Muster zusammen. Nutze exakt dieses Format, eine Zeile pro Eintrag, stichwortartig, KEINE ganzen Saetze: **Q:** frage | **A:** antwort. Gib NUR die neuen Eintraege aus, keine Einleitung, kein Markdown-Rahmen. Verlauf:

$convo"

summary=$(SHARKIE_DOC_HOOK=1 claude -p "$prompt" --model claude-haiku-4-5-20251001 2>/dev/null || true)
[ -z "$summary" ] && exit 0

printf '\n%s\n' "$summary" >> "$doc"
exit 0
