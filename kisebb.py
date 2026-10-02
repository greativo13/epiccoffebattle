#!/usr/bin/env python3
"""A game.html-ből elkészíti a könnyű index.html-t (ezt mutatja a GitHub Pages).

A game.html minden képet beágyazva tartalmaz (önmagában is működik, akár letöltve).
Az index.html-ben a képek helyett csak a fájlnevük van, a képek a kepek/ mappába kerülnek.
Így a játék oldala ~16 MB helyett ~1,5 MB, és frissítéskor csak a megváltozott képeket kell újra letölteni.

Használat: minden game.html-módosítás után futtasd:  python3 kisebb.py
"""
import base64, hashlib, json, os, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, 'game.html')
OUT = os.path.join(ROOT, 'index.html')
DIR = os.path.join(ROOT, 'kepek')
EXT = {'image/webp': 'webp', 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/svg+xml': 'svg'}

html = open(SRC, encoding='utf-8').read()
m = re.search(r'^const IMG_SRC=(\{.*\});\s*$', html, re.M)
if not m:
    raise SystemExit('Nem találom a const IMG_SRC={...}; sort a game.html-ben.')
imgs = json.loads(m.group(1))

os.makedirs(DIR, exist_ok=True)
keep, paths = set(), {}
for name, uri in imgs.items():
    head, data = uri.split(',', 1)
    mime = head[5:].split(';')[0]
    raw = base64.b64decode(data)
    # a fájlnévben a tartalom rövid ujjlenyomata: ha a kép változik, új nevet kap, így a böngésző nem a régit mutatja
    fn = '%s.%s.%s' % (re.sub(r'[^A-Za-z0-9_-]', '_', name), hashlib.sha1(raw).hexdigest()[:8], EXT.get(mime, 'bin'))
    fp = os.path.join(DIR, fn)
    if not os.path.exists(fp):
        with open(fp, 'wb') as f:
            f.write(raw)
    keep.add(fn)
    paths[name] = 'kepek/' + fn

# a már nem használt régi képek törlése
for fn in os.listdir(DIR):
    if fn not in keep:
        os.remove(os.path.join(DIR, fn))

# változatjelzés: a feltöltés ideje (ebből látszik a főmenüben, hogy a friss játék töltődött-e be)
import datetime
stamp = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).strftime('%m. %d. %H:%M')
html = re.sub(r'BUILD="[^"]*"', 'BUILD="%s"' % stamp, html)
open(SRC, 'w', encoding='utf-8').write(html)
m = re.search(r'^const IMG_SRC=(\{.*\});\s*$', html, re.M)
light = html[:m.start(1)] + json.dumps(paths, ensure_ascii=False, separators=(',', ':')) + html[m.end(1):]
# a címkép elsőként töltődjön
if 'bg-title' in paths:
    light = light.replace('<head>', '<head>\n<link rel="preload" as="image" href="%s">' % paths['bg-title'], 1) if '<head>' in light else '<link rel="preload" as="image" href="%s">\n' % paths['bg-title'] + light
with open(OUT, 'w', encoding='utf-8') as f:
    f.write(light)
print('index.html: %.1f MB (game.html: %.1f MB), %d kép a kepek/ mappában'
      % (len(light.encode()) / 1e6, len(html.encode()) / 1e6, len(keep)))
