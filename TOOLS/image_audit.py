#!/usr/bin/env python3
from pathlib import Path
from PIL import Image
import hashlib, json, sys
root=Path(sys.argv[1] if len(sys.argv)>1 else '.')
out=[]
for p in sorted(root.rglob('*')):
    if p.suffix.lower() not in {'.webp','.jpg','.jpeg','.png'}: continue
    try:
        with Image.open(p) as im:
            out.append({'path':str(p),'width':im.width,'height':im.height,'format':im.format,'mode':im.mode,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
    except Exception as e:
        out.append({'path':str(p),'error':str(e)})
print(json.dumps(out,indent=2))
