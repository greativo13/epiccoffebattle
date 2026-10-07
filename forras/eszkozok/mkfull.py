import json
d=json.load(open('full.json'))
EL={'phys':'fizikai','fire':'tűz','ice':'jég','thunder':'villám','dark':'sötét','holy':'szent','poison':'méreg','nature':'természet','water':'víz'}
items=[];n=[0]
def add(area,key,title,how,expect):
    items.append({'id':key,'area':area,'title':title,'how':how,'expect':expect})
A='Indulás és menük'
add(A,'u-title','Címképernyő','Nyisd meg a játékot.','Megjelenik a logó és a háttér, a gombok olvashatók és elférnek a képernyőn.')
add(A,'u-slots','Címképernyő → 1. / 2. / 3. mentőhely','Válts a mentőhelyek között.','A kiválasztott hely kiemelve; mindegyiken látszik, hol tartasz (vagy „(üres)”). Másik helyre váltva a régi mentés megmarad.')
add(A,'u-new','Címképernyő → Könnyű → Új játék','Üres mentőhelyen válaszd a Könnyű szintet, majd Új játék.','Elindul a bevezető történet, utána az első fejezet és a térkép.')
add(A,'u-cont','Címképernyő → Folytatás (… szint)','Zárd be és nyisd meg újra a játékot, majd Folytatás.','Ott folytatódik, ahol abbahagytad: arany, tárgyak, megvett képességek, teljesített pályák megmaradtak.')
add(A,'u-code','Címképernyő → 💾 Mentéskód, majd 🔑 Kód','Kérj mentéskódot, másik mentőhelyen töltsd be a 🔑 Kód gombbal.','A kód betöltése után ugyanott tartasz, ahol a kód készült.')
add(A,'u-music','🎵 Zene és 🔊 Hang','Kapcsold ki-be a címképernyőn és csata közben.','Azonnal elhallgat / megszólal, és újranyitás után is megmarad.')
add(A,'u-speed','▶ 1× sebesség gomb','Csata közben nyomd meg többször.','1× → 2× → 3× → 1× körbe vált; 3×-on minden gyorsabb, de még követhető. A beállítás megmarad.')
add(A,'u-portrait','Álló telefon','Játssz egy csatát állítva.','Minden gomb elfér, semmi nem lóg ki, a hőskártyák és a gombok nem takarják a csatateret.')
add(A,'u-land','Fekvő telefon','Fordítsd el a telefont csata közben, a térképen és a boltban.','A csatatér nagy, a hőskártyák jobbra fent két oszlopban, a gombok alattuk; a bolt két oszlopos.')
A='Térkép, bolt, extrák'
add(A,'m-map1','Térkép (I–IV. fejezet)','Nézd meg a térképet.','A pálya-pöttyök a rajzolt pontozott utakon ülnek, a főellenségeknél ☠, a következő pálya kiemelve.')
add(A,'m-map2','Térkép (V–VIII. fejezet)','A IV. fejezet után.','Itt is a pöttyök az utakon vannak, a két térkép között lehet váltani.')
add(A,'m-diff','Térkép → Könnyű / Normál / Nehéz','Válts nehézséget, majd vissza Könnyűre.','A kiválasztott kiemelve; a következő csatától érvényes.')
add(A,'m-shop-sk','Térkép → Bolt → (hős neve) → ⓘ Mutasd, majd vásárlás','Minden hős fülén nézz meg egy képességet a ⓘ Mutasd gombbal, aztán vedd meg.','A Mutasd lejátssza a képességet; vásárláskor az ár levonódik, és a képesség megjelenik a hős csatamenüjében. Új képességek a megadott pálya után jelennek meg.')
add(A,'m-gear','Térkép → Bolt → (hős neve) → Fejleszt','Fejleszd egy hős fegyverét és ruháját.','Az ár levonódik, a felszerelés szintje és a hős értékei nőnek.')
add(A,'m-shop-it','Térkép → Bolt → Tárgyak','Vegyél tárgyakat.','A darabszám nő, csatában használható. A Nagy gyógyital a 2-1, az Elixír a 3-1 után jelenik meg.')
add(A,'m-best','Térkép → 📖 Bestiárium','Nyisd meg az elején és néhány csata után.','Fejezetenként minden ellenfél; a még le nem győzöttek sötét sziluettek, a legyőzötteknél kép, leírás, gyenge/ellenálló elemek és a legyőzések száma.')
add(A,'m-daily','Térkép → ⭐ Napi kihívás','Játszd végig a mai kihívást.','2 csata, 3–3 ellenféllel a már teljesített fejezetekből. Győzelem után +500 arany, aznap csak egyszer.')
add(A,'m-main','Térkép → Főmenü','Lépj a főmenübe, majd Folytatás.','Visszaér a címképernyőre, a Folytatás ugyanoda hoz vissza.')
add(A,'m-weak','Csata → gyenge pont jelvény','Könnyű szinten nézd az ellenfelek fölött.','„gyenge:” és színes pöttyök a gyenge elemekkel. Gyenge elemmel eltalálva „GYENGE PONT” felirat és nagyobb sebzés.')
add(A,'m-enrage','Főellenség-csata → feldühödés','Vidd egy saját fázis nélküli főellenség (pl. Rozsdakirály, Pörkölő Sárkány) életerejét fél alá.','„… feldühödött!” felirat, piros izzás a főellenségen, ezután erősebben üt.')
add(A,'m-lose','Vereség','Hagyd, hogy a csapat elessen.','Vereség-ablak, a pálya újrapróbálható; a mentés nem vész el.')
add(A,'m-ngp','8-4 után → stáblista → Új játék+','Az utolsó főellenség után.','Stáblista, majd az Új játék+ elindul: a hősök megtartják a szintjüket, felszerelésüket, képességeiket; az ellenfelek erősebbek.')
A='Pályák (Kaland, Könnyű)'
for z in d['zones']:
    for L in z['levels']:
        foes=', '.join(L['foes'])
        exp=f"Párbeszédek olvashatók, a hősök arca/neve jó. {L['nb']} csata. Ellenfelek: {foes}. Győzelem után arany, tapasztalat, a következő pálya megnyílik."
        if L['boss']:exp+=" Főellenség: van saját belépő párbeszéd, a végén fejezetzáró történet."
        add(A,'L'+L['id'],f"{z['chapter'].split(':')[0]} {z['name']} → {L['id']} {L['name']}",'Játszd végig könnyű szinten.',exp)
skip={'Társ kiütése','Ellenfelek és támadásaik','Következő ellenfél','Előző ellenfél','Állapotok törlése','Kilépés','Idézések','Négyek ereje','Védekezés'}
itemnames=list(dict.fromkeys([i['name'] for i in d['items']]+['Limit-ital','Élet-elixír','Dobótőr','Tűzbomba']))
for h in d['heroes']:
    A='Hősök – '+h['name']+' ('+h['cls']+')'
    for b in h['btns']:
        l=b.get('label')
        if not l or l in skip or b.get('sub') in ('hős','tárgy') or l in itemnames or l.startswith(('💤','▶')):continue
        sub=b.get('sub','')
        e=(b.get('desc') or '')
        if sub=='alaptámadás':e='Alaptámadás. '+e
        if sub=='LIMIT':e='LIMIT. '+e
        e=(e+' A hatás a hős megfelelő testrészéből indul, saját hangja van, látszik a sebzés/gyógyulás száma.').strip()
        add(A,f"h-{h['type']}-{l}",f"Próbaterem → {h['name']} → {l}",'Válaszd, és nézd végig.',e)
A='Közös és páros támadások'
add(A,'c-four','Próbaterem → bármelyik hős → Négyek ereje','Válaszd, és nézd végig.','A harcoló hősök egyszerre csapnak le minden ellenségre; mindenki limitje elfogy.')
add(A,'c-def','Próbaterem → bármelyik hős → Védekezés','Válaszd, majd: Ellenfelek és támadásaik → bármelyik támadás.','A hős elé pajzs kerül, kevesebbet sérül.')
hn={h['type']:h['name'] for h in d['heroes']}
for p in d['pairs']:
    add(A,'p-'+p['name'],f"Próbaterem → {hn[p['a']]} → PÁROS: {p['name']}",f"Válaszd, és nézd végig (ha {hn[p['b']]} pihen, magától beáll). Kalandban akkor jelenik meg, ha mindkét hős limitje legalább félig tele.",p['desc']+' Mindkét hős látványosan részt vesz benne; kalandban mindkettejük limitjéből 50% fogy.')
A='Tárgyak'
for nm in itemnames:
    ds=next((i['desc'] for i in d['items'] if i['name']==nm),'')
    add(A,'i-'+nm,f"Próbaterem → bármelyik hős → {nm}",'Használd (sebesült / elesett társon, ellenségen, ahol kell).',(ds+' A hős valóban használja (iszik / dob), a hatás száma látszik.').strip())
A='Idézések'
for s in d['sums']:
    add(A,'s-'+s['id'],f"Próbaterem → Idézések → {s['name']}",'Válaszd, és nézd végig.',(s['desc']+' Belépő bevágás, saját hang, a hatás látszik.').strip())
for z in d['foes']:
    A='Ellenfelek – '+z['zone']
    for f in z['foes']:
        tg=' (főellenség)' if f['boss'] else (' (részfőnök)' if f['mini'] else '')
        for i,(nm,ds,el,tgt) in enumerate(f['sk']):
            e=('Minden hősre' if tgt=='enemies' else ('Önmagára' if tgt=='self' else 'Egy hősre'))+(f", {EL[el]} elemű" if el in EL else '')+'. '
            e+=(ds+' ' if ds else '')+('Maga az ellenfél mozdul, a hatás (pajzs, gyógyulás, erősödés) rajta látszik, saját hangja van.' if tgt=='self' else 'Maga az ellenfél mozdul (a megfelelő testrésze), valódi tárgy/hatás repül, saját hangja van, a hős sérül vagy állapotot kap.')
            if i==0:e='A figura jól néz ki, nem csúszik el. '+e
            add(A,f"e-{f['t']}-{i}",f"Próbaterem → Ellenfelek és támadásaik → {z['zone']} → {f['name']}{tg} → {nm}",'Válaszd, és nézd végig.',e)
for i,it in enumerate(items):it['order']=i+1
json.dump(items,open('fullitems.json','w'),ensure_ascii=False)
from collections import Counter
print(len(items));print(Counter(i['area'] for i in items))
