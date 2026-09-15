#!/usr/bin/env python3
from pathlib import Path
import re, json, sys
p=Path(sys.argv[1])
s=p.read_text('utf-8')
compact=re.sub(r'\s+','',s)
rules={
 'no_css_has': ':has(' not in s,
 'no_inset_zero': 'inset:0' not in compact,
 'no_video': '<video' not in s.lower(),
}
print(json.dumps({'file':str(p),'bytes':p.stat().st_size,'canvas_elements':len(re.findall(r'<canvas\\b',s,re.I)),'raf_mentions':s.count('requestAnimationFrame'),'setInterval_mentions':s.count('setInterval'),'rules':rules},indent=2))
raise SystemExit(0 if all(rules.values()) else 1)
