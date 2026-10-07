import json,html,base64,os
d=json.load(open('gamedata.json'))
E=html.escape
EL=d['ELEM_NAMES']; EL.update({'pure':'tiszta','mag':'mágia','wind':'szél','earth':'föld','lava':'láva'})
def el(x): return EL.get(x,x or '–')
def img(path,cls='shot'):
    ext='jpeg' if path.endswith('jpg') else 'png'
    return f'<img class="{cls}" src="data:image/{ext};base64,{base64.b64encode(open(path,"rb").read()).decode()}">'
H=d['HERO_DEF'];SK=d['SK'];LIM=d['LIMITS'];EN=d['EN_DEF'];ESK=d['ESK']
o=[]
o.append(f'''<section class="cover"><h1>Az Elveszett Ízek Nyomában</h1><div class="sub">„A Nagy Kávérablás” · összefoglaló a játékról</div>
{img('/home/user/epiccoffebattle/csapat5.jpg','poster')}
<p class="lead">Körökre osztott, festett stílusú fantasy-RPG a böngészőben (iPhone kezdőképernyőről is). Öt hős, {len(d['ZONES'])} fejezet, {sum(len(z['levels']) for z in d['ZONES'])+1} pálya, {len(EN)} ellenféltípus, {len(SK)} képesség, {len(d['PAIRS'])} páros támadás, {len(d['SUMMONS'])} idézés.</p>
<p class="small">Állapot: 2026. október 7. · Elérhető: greativo13.github.io (main ág)</p></section>''')
# story
o.append('<section><h2>1. A történet</h2><div class="dialog">')
for l in d['INTRO']: o.append(f'<p><b>{E(l["who"])}:</b> {E(l["text"])}</p>')
o.append('</div><h3>Fejezetek</h3><table><tr><th>#</th><th>Fejezet</th><th>Helyszín</th><th>Kezdet</th><th>Vége</th></tr>')
for z in d['ZONES']: o.append(f'<tr><td>{z["id"]}</td><td><b>{E(z["chapter"])}</b></td><td>{E(z["name"])}</td><td>{E(z.get("chIntro",""))}</td><td>{E(z.get("chEnd",""))}</td></tr>')
o.append('</table><h3>Csatlakozó hősök</h3><ul>')
for k,v in d['JOIN_TEXT'].items(): o.append(f'<li><b>{E(H[k]["name"])}</b>: {E(v)}</li>')
o.append('</ul></section>')
# heroes
o.append('<section><h2>2. A hősök</h2><table><tr><th>Hős</th><th>Kaszt</th><th>ÉP</th><th>MP</th><th>Erő</th><th>Véd</th><th>Mágia</th><th>Ellenáll</th><th>Gyors</th><th>Limit</th></tr>')
for k,h in H.items(): o.append(f'<tr><td><b style="color:{h["color"]}">{E(h["name"])}</b></td><td>{E(h["cls"])}</td><td>{h["hp"]}</td><td>{h["mp"]}</td><td>{h["atk"]}</td><td>{h["def"]}</td><td>{h["mag"]}</td><td>{h["res"]}</td><td>{h["spd"]}</td><td>{E(LIM[k]["name"])}</td></tr>')
o.append('</table>')
for k,h in H.items():
    o.append(f'<h3 style="color:{h["color"]}">{E(h["name"])} – {E(h["cls"])}</h3><p class="lim"><b>Limit: {E(LIM[k]["name"])}</b> – {E(LIM[k]["desc"])}</p><table class="sk"><tr><th>Képesség</th><th>Elem</th><th>MP</th><th>Hol nyílik / ár</th><th>Leírás</th></tr>')
    rows=[(s,'induló','') for s in h['skills']]+[(s,f'{lv} után',f'{pr} arany') for s,lv,pr in d['SHOP_SKILLS'].get(k,[])]
    for s,w,p in rows:
        x=SK.get(s); 
        if not x: continue
        o.append(f'<tr><td><b>{E(x["name"])}</b></td><td>{el(x.get("elem"))}</td><td>{x.get("mp",0)}</td><td>{E(w)} {E(p)}</td><td>{E(x.get("desc",""))}</td></tr>')
    o.append('</table>')
o.append('</section>')
# pairs & summons
o.append('<section><h2>3. Páros támadások</h2><table><tr><th>Név</th><th>Hősök</th><th>Elem</th><th>Erő</th><th>Leírás</th></tr>')
for p in d['PAIRS']: o.append(f'<tr><td><b>{E(p["name"])}</b></td><td>{E(H[p["a"]]["name"])} + {E(H[p["b"]]["name"])}</td><td>{el(p.get("elem"))}</td><td>×{p["pow"]}</td><td>{E(p["desc"])}</td></tr>')
o.append('</table><div class="row">'+img('pa_Lótuszvihar.jpg','strip')+img('pa_Csillagözön.jpg','strip')+'</div>')
o.append('<h2>4. Idézések</h2><p>Csatánként egy segítő hívható; a legyőzött főellenségek is idézhetők lesznek.</p><table><tr><th>Idézés</th><th>Megszerzés</th><th>Hatás</th></tr>')
for s in d['SUMMONS']: o.append(f'<tr><td><b>{E(s["name"])}</b></td><td>{E(s["req"]+" legyőzése" if s.get("req") else "kezdettől")}</td><td>{E(s["desc"])}</td></tr>')
o.append('</table></section>')
# levels
o.append('<section><h2>5. A térkép és a pályák</h2>'+img('map_L1.png')+'<p>Minden fejezet négy pályából áll, a negyedik a főellenség. A pályán belül a csaták között nem gyógyul a csapat, csak a végén. Két térképlap van (1–4. és 5–8. fejezet).</p>')
for z in d['ZONES']+[{'chapter':'Titkos pálya','name':'','levels':[d['SECRET']]}]:
    o.append(f'<h3>{E(z["chapter"])}{" · "+E(z["name"]) if z["name"] else ""}</h3><table><tr><th>Pálya</th><th>Név</th><th>Szint</th><th>Csaták (ellenfelek)</th><th>Leírás</th></tr>')
    for l in z['levels']:
        bt=' | '.join(', '.join(EN[e]['name'] if e in EN else e for e in b) for b in l['battles'])
        o.append(f'<tr><td>{E(l["id"])}{" 👑" if l.get("boss") else ""}</td><td><b>{E(l["name"])}</b></td><td>{l.get("elvl","")}</td><td>{E(bt)}</td><td>{E(l.get("intro",""))}</td></tr>')
    o.append('</table>')
o.append('</section>')
# enemies
o.append(f'<section><h2>6. Bestiárium ({len(EN)} ellenfél)</h2><table class="en"><tr><th>Ellenfél</th><th>ÉP</th><th>Gyenge pont</th><th>Ellenáll / immunis</th><th>Támadások</th><th>Tudnivaló</th></tr>')
for k,e in EN.items():
    w=', '.join(el(a) for a,v in e.get('elem',{}).items() if v>1); r=', '.join(el(a)+(' (immunis)' if v==0 else '') for a,v in e.get('elem',{}).items() if v<1)
    at=', '.join(ESK[s]['name'] for s,_ in e.get('skills',[]) if s in ESK)
    o.append(f'<tr><td><b>{E(e["name"])}</b>{" 👑" if e.get("boss") else ""}</td><td>{e["hp"]}</td><td>{E(w)}</td><td>{E(r)}</td><td>{E(at)}</td><td>{E(e.get("info",""))}</td></tr>')
o.append('</table></section>')
# items, statuses, misc
o.append('<section><h2>7. Tárgyak és bolt</h2><table><tr><th>Tárgy</th><th>Ár</th><th>Mikortól</th><th>Hatás</th></tr>')
for k,req,pr in d['SHOP_ITEMS']:
    it=d['ITEMS'].get(k,{}); o.append(f'<tr><td><b>{E(it.get("name",k))}</b></td><td>{pr}</td><td>{E(req or "kezdettől")}</td><td>{E(it.get("desc",""))}</td></tr>')
o.append('</table><h2>8. Elemek és állapotok</h2><p><b>Elemek:</b> '+', '.join(E(v) for v in d['ELEM_NAMES'].values())+'. A gyenge pont eltalálása „GYENGE PONT!” feliratot ad és nagyobbat sebez; a méreg nem hat a gépekre és a mérgező lényekre.</p>')
o.append('<p><b>Állapotok:</b> '+', '.join(f'<span class="tag" style="border-color:{c}">{E(n)}</span>' for n,c in d['STATUS'].values())+'. Az erősítések és gyengítések 1 körig tartanak.</p>')
o.append(f'<p><b>Nehézség:</b> {", ".join(d["DIFF_NAME"])}.</p>')
o.append('''<h2>9. Kezelés és extrák</h2><ul>
<li><b>Csata:</b> körökre osztott; minden hősnek ÉP, MP és Limit-csík van. A Limit megtelve különleges, nagy támadást ad. A közös (páros) támadáshoz két hős kell.</li>
<li><b>Csapat:</b> egyszerre négy hős harcol, az ötödik pihen, és a Csapat menüben cserélhető.</li>
<li><b>Bolt:</b> kávébabért (aranyért) képességek és tárgyak; az új képességek a pályák teljesítésével nyílnak.</li>
<li><b>Bestiárium:</b> a legyőzött ellenfelek adatai, gyenge pontjai.</li>
<li><b>Tesztmód:</b> Főmenü → Teszt, kód: <code>KAVE</code>. Ekkor a térképen megjelenik a <b>Próbaterem</b>, ahol minden képesség, limit, páros támadás, idézés és ellenfél-támadás kipróbálható.</li>
<li><b>Telefon:</b> iPhone-on a kezdőképernyőre tehető; állítva a csatatér felül ragad, a gombok alatta görgetnek.</li>
<li><b>Látvány:</b> festett hátterek és figurák, nagy, festett (Canva) effektképek: tűzsárkány, lótusz, tintasárkány, viharkoponya, csillagkép, tűzoszlopok, teahullám.</li></ul>
<h2 style="page-break-before:always">10. Hogyan készül</h2><ul>
<li>Forrás: <code>game.html</code> (minden kép beágyazva) → <code>kisebb.py</code> → könnyű <code>index.html</code> + <code>kepek/</code>.</li>
<li>Minden kör után négy automatikus teszt fut (ellenfelek, idézések, képességek, pajzsok); csak hibátlan eredménnyel kerül fel.</li>
<li>A visszajelzéseket a tesztlapon kéred; a szabályokat (látványos, valódi tárgyak, megfelelő testrészből induló hatás stb.) a <code>CLAUDE.md</code> rögzíti, a részleteket a <code>MUNKANAPLO.md</code>.</li></ul></section>''')
css='''@page{size:A4;margin:14mm 12mm}body{font-family:"Nunito","DejaVu Sans",sans-serif;color:#2a2238;font-size:9.5pt;line-height:1.38}
h1{font-size:30pt;color:#7a3e12;text-align:center;margin:10mm 0 2mm}h2{color:#6b2fa0;border-bottom:2px solid #e2b04a;padding-bottom:2px;margin-top:8mm;font-size:16pt}h3{margin:5mm 0 2mm;font-size:12pt}
.sub{text-align:center;font-size:13pt;color:#8a6a3a;margin-bottom:6mm}.poster{width:100%;border-radius:8px;box-shadow:0 3px 12px #0004}.lead{font-size:12pt;text-align:center;margin:6mm 8mm}.small{text-align:center;color:#888}
section{page-break-before:always}section.cover{page-break-before:avoid}table{border-collapse:collapse;width:100%;margin:2mm 0;page-break-inside:auto}tr{page-break-inside:avoid}
th{background:#3b2a55;color:#fff;text-align:left;padding:3px 5px;font-size:8.5pt}td{border-bottom:1px solid #e4dcef;padding:3px 5px;vertical-align:top}tr:nth-child(even) td{background:#faf7fd}
.shot{width:100%;border-radius:6px;margin:2mm 0}.strip{width:100%;margin:1mm 0}.dialog{background:#fbf4e6;border-left:4px solid #e2b04a;padding:3mm 5mm}.dialog p{margin:1mm 0}
.lim{background:#fff3d6;padding:2mm 4mm;border-radius:5px}.tag{border:2px solid;border-radius:10px;padding:0 5px;margin:1px;display:inline-block;font-size:8.5pt}table.en td{font-size:8.3pt}code{background:#eee;padding:0 3px}'''
open('osszefoglalo.html','w').write(f'<!doctype html><html lang="hu"><head><meta charset="utf-8"><title>Játék összefoglaló</title><link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;800&display=swap" rel="stylesheet"><style>{css}</style></head><body>{"".join(o)}</body></html>')
