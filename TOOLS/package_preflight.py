#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import re, hashlib, json, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else '.').resolve()
text_ext={'.md','.txt','.json','.html','.py','.sh','.css','.js'}
issues=[]
arabic=[]
for p in root.rglob('*'):
    if not p.is_file(): continue
    if p.suffix.lower() in text_ext:
        s=p.read_text('utf-8',errors='replace')
        if re.search(r'[\u0600-\u06FF]',s): arabic.append(str(p.relative_to(root)))
        if p.suffix.lower() in {'.html','.css','.js'} and ':has(' in s:
            issues.append({'file':str(p.relative_to(root)),'issue':'implementation file contains :has('})
        if p.suffix.lower() in {'.html','.css','.js'} and 'inset:0' in re.sub(r'\s+','',s):
            issues.append({'file':str(p.relative_to(root)),'issue':'implementation file contains inset:0'})
assets=[]
for p in sorted(root.rglob('*')):
    if p.suffix.lower() in {'.webp','.jpg','.jpeg','.png'}:
        with Image.open(p) as im:
            assets.append({'path':str(p.relative_to(root)),'size':[im.width,im.height],'format':im.format,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
result={'english_only_text':not arabic,'arabic_text_files':arabic,'issues':issues,'assets':assets}
print(json.dumps(result,indent=2))
raise SystemExit(0 if not arabic and not issues else 1)
