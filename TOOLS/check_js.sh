#!/usr/bin/env bash
set -euo pipefail
HTML="${1:?usage: check_js.sh file.html}"
TMP="$(mktemp --suffix=.js)"
python3 - "$HTML" "$TMP" <<'PY2'
import re, sys
from pathlib import Path
html = Path(sys.argv[1]).read_text(encoding="utf-8")
blocks = re.findall(r"<script(?:\s[^>]*)?>(.*?)</script>", html, flags=re.S|re.I)
Path(sys.argv[2]).write_text("\n;\n".join(blocks), encoding="utf-8")
print(f"extracted {len(blocks)} script block(s)")
PY2
node --check "$TMP"
rm -f "$TMP"
echo "node --check: OK"
