# Munkanapló – A Nagy Kávérablás

Ezt a fájlt Claude vezeti, hogy egy új munkamenet ott folytathassa, ahol az előző abbahagyta.

## Fontos tudnivalók a kódról

- A játék forrása a `game.html` (minden kép beágyazva, önmagában is működik). **Mindig ezt szerkeszd, utána futtasd: `python3 kisebb.py`** – ez elkészíti a könnyű `index.html`-t (~1,3 MB, ezt mutatja a GitHub Pages), a képeket pedig a `kepek/` mappába teszi (a fájlnévben tartalom-ujjlenyomat, így frissítéskor csak a változott kép töltődik le újra). Az `index.html`-t kézzel ne szerkeszd.
- A `build.js` egy `src/` mappából rakná össze, de a `src/` nincs a repóban, ezért közvetlenül a `game.html`-t szerkesztjük: az új kód az `/* ================= INDÍTÁS ================= */` sor elé kerül.
- A képek és hangok base64-ként be vannak ágyazva (`IMG_SRC`, `SND_SRC`), ezek a nagyon hosszú sorok.
- A repó gyökerében lévő képfájlokat a játék futás közben is be tudja tölteni (pl. `csapat5.jpg`), ha a GitHub Pages-en fut.
- Tesztmód: főmenü → Teszt, kód: `KAVE`. A térképen megjelenik a Próbaterem.
- A munka a `claude/ecstatic-ride-z7fasx` branchen megy, a felhasználó engedélyével a `main`-re is fel kell tolni (ezt nézi a felhasználó a greativo13.github.io oldalon).

## Kész (2026-10-02)

- Jázmin új limitje: **Ezer Kéz** – ezerkezű Buddha (a `buddha.jpg` képből, Canvával készült), tenyérzápor, óriás tenyér.
- **Százkezű**: aranytenyér-utóképek minden ütésnél.
- **Közös támadás**: Jázminnal sem akad el (saját aranytenyér-lövedéke van); a próbateremben csak négy hős vesz részt.
- **Plakát**: Jázmin rákerül a közös támadás plakátjára; ha a repóban van `csapat5.jpg`, az ötfős Canva-képet mutatja.
- **Próbaterem**: csak négy hős áll a csatatéren, a pihenő hős 💤-vel cserélhető a kiválasztott hős helyére; kilépéskor mindenki visszakapja a képességeit.
- Jázmin alapállás-képéből eltűnt a szomszédos pózból átlógó botdarab.
- Fekvő telefonon a parancspanel felirata nem csúszik a gombokra.
- Automatikus végigpróbálás (minden hős minden képessége, limit, közös támadás, tárgyak, idézések, minden ellenfél minden támadása): hiba és elakadás nélkül lefutott.

## Kész (2026-10-02, második munkamenet)

- **Ötfős plakát**: a `csapat5.jpg` (1776×896) bekerült a repó gyökerébe; a játék betölti.
- **Canva-letöltés**: a hálózat már engedi (`media.canva.com`, `export-download.canva.com`). A `get-assets` csak aláírt kis előnézetet ad, ezt nem lehet nagyobbra átírni. Teljes méretű kép így szerezhető: a képet egy Canva-terv oldalára kell tenni (`edit-design` → `add_page` + `insert_fill`), majd az oldalt `export-design`-nal exportálni. Erre a „A Nagy Kávérablás csapatkép” terv (`DAHW1ZtSXrE`) 2. oldala szolgál. A „Blank white sprite container” terv elérte a 100 oldalas korlátot.

- **Próbaterem elrendezése**: széles képernyőn a jobb sáv `clamp(400px,32vw,620px)` széles, ragadós, és csak a gombdoboz görget (az oldal nem). A hősválasztó gombok helyett a hőskártyára kell kattintani; a pihenő hős a kártyák alatti csíkon (`.bench-card`), két kattintással cserélhető (`ARENA_UI`, `arenaCardClick`, `arenaPlace`). Fekvő telefonon a csík ötödik kis kártya.
- **Térkép**: a piros „?” a titkos pálya (Az Elfeledett Pörkölő, a 3-4 után nyílik); most „Titkos főellenség!” felirat van fölötte.
- **Lili**: három új, varázspálcás képesség – Pálcakoppintás (`wandbonk`, 1-2), Zsugorító pálca (`shrink`, 2-3: Zsugor+Átok+Rozsda, kisebbre rajzolva), Álomcsillagok (`sleepdust`, 4-2). Lilinek eddig 8 gyógyító/védő és csak 4 támadó képessége volt.

- **Jázmin**: három új, bambuszbotos képesség – Bambuszugrás (`bamboovault`, 5-1), Pörgő bot (`staffspin`, 6-2, mindenkit kétszer talál), Botfal (`staffwall`, 7-2: a csapat Pajzs 2 kör, Jázmin Provokál). Saját rajzolt pörgő bot: `drawStaff`, `spinStaff`. (A felhasználó eredetileg Jázminnak kért több képességet, nem Lilinek – Lilié is marad.)

- **Jázmin íjász lett** (a felhasználó választotta ki a tesztlistán): új képlap Canvával (`hero4_monk`: áll, lő, teát tölt, sérül) és egy második (`hero5_monk`: tenyérütés, égbe lövés, meditáció, erőgyűjtés – pózok: `palm`, `sky`, `meditate`, `power`). Canva-segédterv: „A Nagy Kávérablás csapatkép” (`DAHW1ZtSXrE`) 3. és 4. oldala.
  - Alaptámadás: Aranynyíl. Új: Hármas nyíl, Nyílzápor, Lótusznyíl, Mantranyíl, Árnyékszegező nyíl, Pattanó nyíl, Teabomba-nyíl, Belső csend (a Zen helyett, `sureCrit`), Füstölő-nyíl (`incense` állapot, kör végén gyógyít a `tickStatuses`-ban).
  - Maradt: a négy tea (most mind saját látvánnyal: `wakeTea` csengő+gőz, `greenTea` levelek, `blackTea` vörös aura, `manaTea` kék kristálycseppek), Tenyércsapás és Százkezű (íj nélkül, tenyér-pózzal), Ezer Kéz (Jázmin elhalványul, a helyén a Buddha, a végén visszaváltozik).
  - Kikerült: Gőzrúgás, Tájfun, Zen és a három botos képesség; aki megvette, a `fixMonk` visszaadja az árát.
  - Vigyázat: a játékban már volt `drawArrow` (az aktív hős jelzője) – a repülő nyíl rajzolója ezért `drawFlyArrow`.
  - A `csapat5.jpg` plakáton Jázmin még bottal van: ha kell, újra kell rajzolni.

- **Állított telefon**: a csatatér (`.stage`) ragadós a képernyő tetején, a kártyák és gombok alatta görgetnek; újratöltéskor és új képernyőnél felülre ugrik (`history.scrollRestoration='manual'`, `toTop`); támadás közben a gombok helye megmarad (`btnsEl.style.minHeight`), így nem ugrik fel az oldal.

- **Visszajelzés-kör (látványosabb, egyedi képességek)**: Jázmin saját pajzsa (`fx-guard-monk`, Canva, `FX_IMG['guard-monk']`); Lili Égi pajzsa kikerült (a Fénypajzs maradt, ár visszajár); Napkitörés új animáció (`solarFlare`: felkelő nap, napkitörések); Zsugorító pálca: varázskör, csillagspirál, háromlépcsős zsugorodás (`shrinkForce`); Égi áldás: kardok helyett glória-kapu, fénynyaláb, hulló tollak, glóriák; új ötfős plakát (`csapat5.jpg`, Jázmin íjjal) a közös támadásnál lejjebb téve (`TEAM5_IMG.pad`), hogy Lili feje látsszon; a stáblistán is az ötfős kép és Jázmin neve; Jázmin Grog helyén közelebb áll a többiekhez (`monkSlot`).
- Jázmin pajzsa: két keresztbe tett arany nyíl a jáde lótusz-mandalán (a felhasználó kérésére, íj nélkül).

- **Jázmin 2.0** (a felhasználó szinte minden képességére „gagyi”-t írt): három Canva-effektlap (`fx4_jzarrow_jzpalm_jzlotus_jzwheel`, `fx4_jzsplash_jzchains_jzincense_jzrain`, `fx4_jzleaf_jzbell_jzaura_jzcrystal`), ezekkel minden nyilas képesség, a négy tea, a Tenyércsapás, a Százkezű és az Ezer Kéz tenyerei új, nagyobb jelenetet kaptak (`bigArrow`, `goldImpact`, `chargeBow`, `teaScene`). Canva-segédterv 5. oldala: ide kerül be a kép, innen exportálunk.
- **Tesztlista-szabály** (a felhasználó kérte): amit kijavítottam, annak a régi pontját a megjegyzéseivel együtt törlöm; ha újra ki kell próbálni, tiszta új pontként kerül vissza.

- **Gyorsabb betöltés**: `kisebb.py` → könnyű `index.html` + `kepek/`. A `canva-forras/` és a `buddha.jpg` törölve. A zsugorított ellenfél neve, életerő-csíkja és a találatok is a kisebb figurához igazodnak (`shrinkOf` a `topY`/`midY`-ban).

- **Átnézés Zordon, Morgána, Grog képességein**: mind festett effektekkel megy (Szupernóva, Fekete lyuk, Földrengés stb.), csak az Életszívás volt gyenge – most vérvörös örvény (`fx-dark`, színeltolva, `add:true`!) és vastag életfolyam. Figyelem: az `fx-dark` stb. képek fekete hátterűek, `fxSpin`-nél kell az `add:true`, különben fekete négyzet látszik.

- **Idézések**: a felhasználó kérésére visszaállítva a korábbi (ellenfél-)képekre – a `SUM_SPR` saját idézésképek felülírása ki van kommentezve (a titkos főellenség, az Ősgólem saját képe marad).
- **Kristálygólem idézés**: kék kristálytükör-pajzs (`crystal` állapot, `partyCrystal`, kép: `fx-crystalmirror`, Canva) – kivédi a következő találatot és kék kristálylövedékkel visszaveri, mint a Fénypajzs.

- **Állított telefon**: a hőskártyák is ragadósak, közvetlenül a csatatér alatt (`--stageH` CSS-változó, ResizeObserver); állítva a TP sor elmarad. Nyitott ablaknál egyik sem ragad.
- **Közös támadás plakát**: a `csapat5.jpg` kitölti a ferde csíkot (a csík alakjára vágva, jobbra beolvad), nem kisebb dobozként ül benne.

- **Tesztkör 3**: Napkitörés lángoszlopokkal (`fxPillar`, `sunpillar`), Zsugorító pálca sugár nélkül (csillagörvény `pinkvortex`), Égi áldás angyalszárnyakkal (`angelwings`), Mana-tea kék csészével (`manacup`), új Pattanó nyíl (felizzó útvonal + kisülés), Füstölő-nyíl maga elé, sűrű füst a csapat körül, Ezer Kéz tenyereinek csóva és lökéshullám, Életszívás vonal nélkül, Járvány saját animáció (`plagueSwarm`, pestisraj). Képlap: `fx4_sunpillar_angelwings_manacup_pinkvortex`.
- **Betöltés**: a hátterek lustán (`loadBg`, a térkép az adott fejezet hátterait előre kéri), a képek kicsomagolása `img.decode()`-dal a háttérben (globális `Image`-burkoló a `const IMG_SRC` előtt). Időkorlátos sorba állítást kipróbáltam: rossz, mert a figurák későn jelentek meg.

- **Tesztkör 4**: állított telefonon „alkalmazás” elrendezés (az oldal nem görget, csak a `.cmd`; nyitott ablaknál a csatatér-doboz kap helyet, a kártyák elbújnak) – a ragadós (sticky) megoldás kidobva. Napkitörés: festett nap (`sunorb`), tűzhullám (`firewave`), naposzlopok, tűzeső. Zsugorító pálca → „Zsugorítás”, zöldes-sárga (`WAND_PINK` most `let`). Ezer Kéz: sugarak helyett dharma-kerék glória, a végén ujjakkal lefelé lecsapó óriás tenyér. Pattanó nyíl: villámlánc. Füstölő: áttetsző füstgomolyok, lótusz a hősök alatt. Járvány új: `plagueRoots` (repedések, `plaguevine`, `miasmaburst`). Képlap: `fx4_sunorb_firewave_plaguevine_miasmaburst`.
- **Betöltés**: `sw.js` service worker (képek a telefon gyorsítótárából, az oldal mindig frissen), a címkép előtöltve (`<link rel=preload>`), `BUILD` változatjelzést a `kisebb.py` állítja be.
- **Tesztkör 5**: Napkitörés lánghullám nélkül. Ezer Kéz: gyors, ökölbe szorított óriás ököl csapódik le, nagy pusztítással (kőtörmelék, villanás, földrengés). Pattanó nyíl → „Szikranyíl” (`sparkarrow` repülő szikranyíl, láncsugarak, nincs fentről érkező villám). Füstölő-nyíl önálló, végleges változat: a földbe fúródott nyíl vége parázslik, procedurális, áttetsző szürkésfehér füstoszlop (`smokeTex`, normál keverés, nem `lighter` – világos háttéren a `lighter` láthatatlan) és alacsony köd a csapat körül. Járvány: a repedésekben buborékos zöld vegyszer folyik (`toxicstream`). Képlap: `fx4_jzfist_smokewisp_toxicstream_sparkarrow`.
- **Próbaterem-csere**: a pihenő hős kártyájának kiválasztása után a csatatéren a figurára kattintva is lehet cserélni (pointerdown a vásznon).
- **Akadozás**: a kivágott/átszínezett figurák IndexedDB-gyorsítótárba kerülnek (`SPR_CACHE`, `kaverablas-figurak`), második indítástól nem kell újraszámolni (7 s → <1 s akadás). Az első látogatás még akadhat.
- **Tesztszkript-tanulság**: `multi.js`-ben az `allies` célzású képességet a hősökre kell lőni (korábban az ellenfelek kapták a buffot).
- **Tesztkör 6**: Betöltés: a hátterek (`im.__bg`) nem várnak a figura-gyorsítótárra, és amíg a kép nincs meg, sima sötét háttér látszik a régi, kódból rajzolt helyett (ez villant fel másodszori indításkor). Napkitörés: aranysárga (nem vörös), a nap oldalt áll, és a sugarak magából a napból csapnak ferdén az ellenségekre (`sunRay`), tűzeső helyett kis napgömbök. Szikranyíl: rajzolt kék villám (`zap`, `zapPath`, `electrocute` – minden képkockán újra kanyarodó, elágazó), jól látható nyíl kék fényben; a sárga `thunder`-kép és a nagy fehér folt kidobva. Füstölő-nyíl: a nyíl a földön füstölőpálcává alakul (bronz tartó, izzó vég), vékony, kígyózó füstszál száll belőle. Járvány: Morgánától az ellenségig ugyanazok a tüskés pestisindák (`plaguevine`) és zöld-lila kitörések (`miasmaburst`) törnek fel sorban, mint az ellenség alatt; a neon repedés és a folyadéksáv kidobva.
- **Figyelem, szerkesztésnél**: a game.html-ben sok függvény többször van definiálva (a későbbi felülírja). Python-cserénél a keresést mindig az utolsó, érvényes változat egyedi jelölőjétől indítsd, különben a köztes kód is törlődik.
- **Tesztkör 7**: Logó (`logo.png`, a játékban `bg-logo` – a `bg-` előtag miatt nem fut át a figurakivágáson; a címképernyő `.ov-title` helyén `.ov-logo`). Ikon: `apple-touch-icon.png` (180, iOS kezdőképernyő) és `icon.png` (512). Állított telefon: a játék a valóban látható magasságot tölti ki (`--appH` a `visualViewport`-ból, `html.apph`), így iPhone-on nem marad üres sáv alul, a térkép is nagyobb. Címkép: `#titlepre` `<img>` a HTML-ben (a `kisebb.py` teszi be a `<!--TITLEPRE-->` helyére), a `setScene` veszi le. Összpontosítás: kék manatea-kör helyett szellő kavarog Zordon körül (`breezeAround`), amíg a Szélvihar el nem szabadul. Füstölő-nyíl: templomi füstölő (`fx-jzcenser`, Canva, előre kivágva, átlátszó webp), lassan leng, a fedeléből száll a füst. Járvány: az indák mérgezőzöldre színezve (`tint`), a barna földrepedés kivéve. Napkitörés: forgó napkorona, kicsapó napkitörés-ívek, töltődéskor beszívódó fény, a célpontokon parázsoszlop, a végén a nap felfúvódik és szétrobban.
- **Javítási kör a két térkép átnézése után** (áttekintő oldal `review` jelölései): betűtípus Baloo 2 (a Lilita Oneban nincs ő/ű – a `@font-face` neve maradt 'Lilita One'); minden erősítés/gyengítés 1 körig (`ONE_ROUND`, `addStatus` burkoló), az Égi áldás újjászületése 3 kör; méreg nem hat a gépekre (`METAL`), a Rozsda-átok igen (`RUST_WEAK`, `rust` elem); `defDown` neve „Védelem−”. Zordon LIMIT-je: Napkitörés (`solarNova`, `drawSun`), Lili régi Napkitörése → Hajnalpír (`dawnGlow`). Istenek: `fx4_zeus_poseidon_hades_mantra` (Égiháború `zeusStorm`, Szökőár, Átok; `godShow`). Új: Gleccser (`glacierFall`), Lidércnyomás (`nightmareGrip`), Éjféli rontás macskadémonnal, Sötét alku szerződéssel, baltás Forgószél (`drawAxe`), Meteorököl (`meteorFist`), Magmakitörés (`magmaErupt`), Óriásnövesztés (`giantgrow`, 2-2 után), Pestis (`plagued`: az ellenfél a társát üti), fegyver-tárgyak (Dobótőr, Tűzbomba, `flatDmg`). Ellenfelek: `elemShield` (Morcus, mandarin, Kamilla álompajzs), `chaosOrb`, `fanBlade`, `inkWave`, `royalSting`, `honeyRain`, `beeSwarm`, `fanHurricane`, `lullaby`, `scaldSteam` (forrázás állapot). Idézések: Oolong, Szerviz, Mézkirálynő, Kamilla, teljes Árny-csapat, `SUMMON_EL` elemcímke. Térkép állítva: görgethető 16:9 kép + arany útvonal a pöttyök között. Csata közben a pihenő hős behívható (`battleSwap`, kártya + menügomb). `fixHoles`: körbezárt fehér foltok eltávolítása. Bolt: kilépés fent, görgetés megmarad.
- **Hősök képességei, 5. kör** (a `review` „a-…” jelölései): Gyógyítás két zöld kézzel; Ítélet fénye villám nélkül (`lightPillar`); Álomcsillagok holdsarlóval és hullócsillagokkal; Pálcakoppintás helyből, zöld tündérpor + aura; Hajnalpír: sugarak félkörben balról jobbra; Lili szárnyai áttetszők (`wingsSheer`), Jázmin képe rojtmentes (`defringe`), LIMIT-plakáton teljes alakban. Nyílzápor 50+ nyíl, forgó kör nélkül; Szikranyíl villám elemű, égi villámok nélkül; Százkezű: kéz-legyező + 15 tenyér; Lótusznyíl fénysugarakkal; Tenyércsapás kör nélkül. Vérszomj/Zúzás vágás nélkül; Forgószél halvány tornádóval; Földrepesztés kőlapokkal; Magmakitörés rajzolt lávával (`lavaCol`). Sötét alku: aranykeretes tükör, démoni én, 1 körös megszállás (`possessed`, `redEyes`); Lidércnyomás szemből (`clawMarks`); Átok: kapu + felemelkedő Hádész (`A.hex.__raw`); Járvány 3 kör; Vudu: tűk (`needleSpot`, `drawNeedle`), 3 kör, körönként egy tű kihúzódik (`voodoo` már nem `ONE_ROUND`). Gleccser keresztező jégtüskékkel (`drawSpike`); Szökőár: Poszeidón idézi; Napkitörés körök nélkül. Próbaterem: támadás után ott marad a menü (`ARENA_LAST`).
- **6. kör**: Szikranyíl `NOFX` (a villám elemű találat általános sárga villáma okozta a „fentről jövő villámot”). Tündérpor: apró porszemek. Tűzbomba: tűzoszlop nélkül. Hajnalpír: lágy, ködös sugarak, nincs éles horizontvonal. Zúzás: látható fejszecsapás (`axeChop`; a régi „slash”-elnyelő burkoló kidobva). Forgószél: 6 fejsze elmosott csóvával. Földrepesztés: hegyes sziklatüskék (`drawRockSpike`). Magma: sűrű lávaszökőkút. Gleccser: dér + csillanás. Napkitörés lassabb. Ellenfelek (1. térkép): `fireflyFlash`, `frogTongue` (a szájból), `shroomFall` (rajzolt gombák), `leafGale` (erezett levelek), `branchSwing` (faág), `thornVolley` (szemből tüskék), `thornVine` (rátekeredő tüskés inda), `sleepCloud` (csak lila felhő), `shellThrow` (a csiga eldobja a házát: `snailParts` szétvágja a képet).
- **7. kör**: Grog új figurái (`orc`, `orc-attack`, `orc-cast`, `orc-hurt`, új önálló `orc-drink` – a `pose4_drink…` lapon az orc negyed átnevezve `xorc`-ra, hogy ne írja felül) és a `team` csapatkép díszes, kétélű, lángoló fejszével (Canva: a régi kép + `wpn-axe` mintaként, `generate-image` → DAHW1ZtSXrE 5. oldal → export). A fejsze külön képként: `wpn-axe` → `FX_IMG.axe`, a `drawAxe` ezt rajzolja. Zúzás: egy mozdulat (`e.lean` dőlés, lángoló ív). `beam` kard helyett lágy fényoszlop; `healAll` (Tündérpor) igazi por; Tűzbomba nagy rajzolt bomba (`drawBomb`). Hajnalpír sugarai félkör után tovább söpörnek az ellenségekig. Magma: kéreges lávató repedésekkel, `wpn-lava` (`FX_IMG.lavafx`) lávaszökőkút-kép. Végigjátszás-teszt: scratchpad `camp.js` (mind a 32 pálya, véletlen képességek).
- **8. kör**: a 2. térkép (5–8. fejezet) 43 ellenfél-támadása saját animációt kapott (`r8` blokk: `flyObj`, `dashTo`/`dashBack`, `rainOn`, `sweepWave`, `reachWeapon` segédek; rajzolt csésze, tányér, szilánk, cukorkocka, tollak, lángok, szívek). Új hangok (`needle`, `glass`, `lava`, `dust`, `splash`, `buzz`, `squish`, `boing`, `whoosh`, `mirror`, `string`, `growl`). Mézkirálynő: „Tipp: előbb a méheket!” a csata elején.
- **9. kör**: Fénypajzs: hősönkénti aranypajzs (a nagy közös pajzs félrevezető volt), egy pajzs a teljes (többütéses) támadást kivédi (`t._blk`). Valódi hangok a `hangok/` mappában (CC0, OpenGameArt: „RPG Sound Pack” – artisticdude, „80 CC0 RPG SFX” és „100 CC0 SFX” – rubberduck), `SAMPLE_FILES`/`playSample`, betöltés az első érintéskor; ha egy animáció 0,45 s-ig nem ad hangot, az eleméhez illő hang szól (`SFX_N`). „Pajzs” állapot → „Védelem+”. Idézések: Ágyú nagy robbanás, Espresszó lángcsóva, Kamilla legyező-széllökés, Gomba-Király csak lila felhő (`mushSpore` NOFX), Oolong vissza az eredeti gőzre, Mézkirálynő rajzolt méhraj, Mókus szél+lökéshullám, Szerviz csészeroham. `csapat5b.jpg` (ötfős csapatkép új fejszével; új név a gyorsítótár miatt). Dobótőr: 3 tőr; Tűzbomba 1-2-től, fegyverek a bolt elején. Tisztítás zöld, Pálcakoppintás valódi koppintás, Álomcsillagok kráteres telihold és biztos altatás (bosszok nem), Forgószél tornádó nélkül.
- **10. kör**: Valósághű füst/gőz/tűz/robbanás textúrák (CC0: Kenney „Particle Pack” és „Smoke Particles”; `tx-sm*`, `tx-wp*`, `tx-bs*`, `tx-fx*` az `IMG_SRC`-ben, a figura-betöltő kihagyja; `drawTexPart`, részecske-alakok: `smoke`, `fire`, `dsmoke`, `puff`). Csengő/gong hang sehol: `holy`/`heal`/`dust`/`shield`/`mirror` varázs-suhogás (`hangok/magic1…`), a „hányás” `weird_*` minták kivéve. Fénypajzs: újra a régi kép (sok kis pajzs → középen egy nagy), egységes szabály: amíg a nagy pajzs áll, bármelyik hőst érő támadást visszaveri, annyiszor, ahány hős kapta. **Bábu-animáció** (`LIMBS`, `limbCanv`, `wrapLimbDraw`, `limbOn/limbOff`, `limbAim`, `limbPt`): a figura saját testrészét kivágjuk a képből és az ízülete körül mozgatjuk (Espresszó farka, Lekvárdzsinn karja+keze, skorpió farka és ollói, Maci karjai, rák csipesze, mézeskalács pálcája, párna, csontváz pajzsa, csészekatona lándzsája, bambuszlándzsa, gólem ökle, Oolong feje, Kamilla legyezője – az idézett Kamilláé is); közben a támadó a többiek előtt rajzolódik (`_front`). Idézések: Espresszó lángcsóva a szájból (`fireBreath`), Oolong gőz a szájból (`steamBreath`), Gomba-Király hatalmas lila füst, valósághű dühös méhraj (`beeSwarmFx`), Villámdenevér sikoly-hanghullám (`screechFx`), Főnix védelem nélkül, Tündérpor fentről hullik, sarló hold. Ellenfelek: ~70 támadás újrarajzolva (r10b/r10c/r10e blokk). Új mechanikák: Bambuszketrec (1 kör), Tombolás (6 árnypéldány), Mézeső (Védelem− + méhgyógyítás), Kívánság (Erő+ és gyógyulás minden társnak), Lidércrobbanás (a lampion felrobban és meghal), Elcsenés (tőrt/bombát lop és visszadob), Ködgyűrű (MP-szívás), Obszidiánfal (ráomló lávás kőfal), Morgás (hősök Védelem−), Árnyéklopás (Árny-Lili), Árny-jégvihar, Porcelánroham, Tükörpajzs a Kristálygólemnek, Morcusnak 3 új támadás.
- **11. kör**: Fénypajzs: amíg a nagy pajzs áll, MINDEN ellenséges támadást visszaver (nem fogy el), látványos aranysugárral (`reflectFx`). Egész testes mozgás: `e.sq` (összenyomás), `bodyWind/bodyStrike/bodySettle`, `eOutBack` túllendülés, a bábu-testrészeknek elmosódó szellemképe (`tr.blur`). Espresszó farka helyben, gumiszerűen nyúlik a hősig; a láng a SZÁJÁBÓL jön (`ESP_MOUTH`). Elcsenés mindig tőrt/bombát lop és visszadob. Új: Édes álom kerítéssel és átugró bárányokkal, Gomba-Király idézés hulló gombákkal, Kamilla furulyája, Tealevél-manó fúvócsöve a szájánál, Szamovár csapja, szebb karomnyomok (`clawMarks` felülírva), `withImpact` erősebb becsapódás. Morcus új támadásai a Próbateremben is (literális `ESK.` hivatkozás kell a `foeSkillIds`-nek). Beégetett effektes támadóképeknél (moly, lampion, hárfa, majom, baba, kocka) `keepPose` + testmozgás.
- **12. kör**: Fénypajzs: amíg áll, a támadás el sem jut a hősökig (`useEnemySkill` burkoló, `r12Block`): a közelharcos nekiront a nagy pajzsnak és visszapattan, a lövés (elemenként rajzolt lövedék, `r12Missile`) a pajzsról arannyá válva visszarepül a támadóra; a sebzést ő kapja (`r12Recoil`), a pajzs nem fogy el. Álomcsillagok: díszítő hullócsillagok balról jobbra, nagy csillagok (`qStar`) csapódnak az ellenségekbe. Idézések: Gomba-Király kalapja nem füstöl, sok valósághű légyölő gomba hullik szerteszét (`qAmanita`); Oolong füstgolyó nélkül; méhraj: előre rajzolt, szőrös, erezett szárnyú méhkockák (`BEE_SPR`), 380 méh (idézés és Zümmögővihar). Ellenfelek: Hideg érintés a kinyújtott kézből, jégbörtön; Kristályököl: három hullámban kitörő kristálytüskék; Obszidiánfal: csipkés, lávarepedéses sziklatömbök (`mkRock`, `drawRock`) dőlnek rá a hősökre; Farokcsapás: közelről, vastag farok, mérsékelt nyújtás; Kockaeső/Káoszkockák: valódi pöttyös dobókockák (`qDie`), pattognak, elemi robbanás; Dupla presszó: a tartály felforr, cseppekből álló sugár (`drawJet`) a két csészéből; Káoszvihar: tarka örvény, elemenként más becsapódás; Árnykarmok (`chaosClaw`): a földből kinövő árnykezek ragadják meg a hőst; Morcus pajzsa elemenként látványos burok (tűzgyűrű, jégkristályok, villámháló, árnyörvény). Teatüske: tüskezápor a két kézből (`qThorn`); Csészedobás: három kék mintás csésze (`qCupP`); Forró öntet: a kiöntőből, cseppes sugár, tócsa, gőzoszlop; Szilánkszórás: a baba maga dobja (nincs eső, `qPorcShard`); Csészekatona: a lándzsa helyén mindenhol ezüstkanál (a képet a betöltés után átrajzoljuk: `r12SpoonPatch`, `r12SpoonPatchA`); Lidércrobbanás vörös-sárga; Mázpáncél: darabokból összeálló, váza-mintás nagy pajzs arany illesztésekkel (`r12VaseShieldCanvas`); Tusátok: a mandarin a legyezőjével tusszörnyeket fest (`qInkBeast`, `inkStroke`), azok rátámadnak a hősökre, a tükörmáz-pajzs körvonala nincs; Kannazúzás: a Szerviz stílusú kanna (`qSzPot`) a hős fölött billeg, lezuhan, gőzrobbanás; Tányérvihar: 30 tányér (`qPlate`) a feje fölött pörög, végigsöpör; a Szerviz nem vált képet; Porcukorfelhő: óriási felhő; Cukormáz-bomba: 120 hulló cukordarab, nincs nyálka; Édes álom: gyapjas bárányok (`qSheep`), szép fakerítés; Kívánság: TÁMADÁS – izzó lekvárosüvegek zuhannak a hősökre (égés), a dzsinn Erő+ 1 körre, nincs lámpás; Hímpor: fehér hintőpor; Holdsugár a holdsarlóból; Altatódal: a hárfa saját húrjai pendülnek (`harpStr`); Teaszertartás: tea-cunami az összes hősre; Altatófurulya: díszes bambuszfurulya a feje fölött (`qDizi`).
- **13. kör** (első térkép könnyű szinten, `r13a.js`): könnyű szint: ellenfelek +30% ÉP/támadás, arany −40%, Dobótőr/Tűzbomba fele, főellenségek ~−38% (`DIFF_HP/DIFF_ATK`, `mkEnemy`/`calcDmg` burkoló). Pénz: „kávébab” → „arany” a felületen. Méregimmunis minden mérgező ellenfél. Bénítás/altatás/fagyasztás: legalább egy ellenfél harcképes marad („ELLENÁLL!”). Életszívás semleges (`elem:'none'`), Földrepesztés föld elem, Pestis → Őrület, Rozsdakirály idézés = erősítés, Espresszó Hamu formában a tűz csak félig hat. Idézések feloldása az első pályánál, ahol az ellenfél szerepel (Kristálygólem 3-1, Démonkirály 4-3, ágyú 2-3). Pályán belül nincs „Győzelem” ablak, csak a pálya végén. Térkép: a sárga szaggatott vonal rejtve. Fénypajzs és Kristálytükör fix helyen, mindkettő megállítja a támadást (Kristálytükör kék stílusban), minden ellenséges `A.*` hívást lefed (főellenség-AI is). Arany ellenfél támadása aranyszínű (`GOLD_ON`, `part`/`effects.push` szűrő). Morcus pajzsa halványabb, Káoszgömb 5 elemi gömb. Tölgy ágcsapás a saját karjával (`LIMBS.oak`), Levélvihar varázskör és zöld folt nélkül. Gomba-Király idézés nem gyógyít. Árny-csapat egységesen a földből emelkedik. Koffein-gólem bal bögréje a kezében (`r13MugPatch`), az idézés az álló képet használja. Morgána üstje az Espresszó-csatában. Közös támadás plakátja a valódi létszámhoz igazodik. Átok: csontok a fekete lyukba → Hádész → lánc és halálfej tőle. Forgószél: középen pörög, egyszerre vág. Földrengés egy nagy földmozgás (`r13Quake`), Földrepesztés ugyanilyen kisebben. Titáncsapás az ellenfelek elé ugrik, teljes testtel lecsap. Napkitörés nagyobb robbanás. Sötét alku → limit tele, a következő limit **Cerberus** (`fx-cerberus`, Canva-generált kép, fekete-lila lángok).
- **14. kör** (`r13b.js` + javítások): térképpöttyök a rajzolt pontozott utakon (`MAP_POS`), Oolong gőze az orrából, méhraj folyamatosan oda-vissza söpör, magasabb Obszidiánfal, Espresszó farka helyből nyúlik, gyorsabb/több kocka, Morcus pajzsán nincs körvonal, Dupla presszó két külön sugár, Koffein-gólem fülénél fogja a bögrét (erősítés kategória), kanál a mozgó karrészhez tartozik, Mázpáncél nagyobb, Tusátok lúdtollal és tintatartóval, Tányérvihar nagy lendülettel, rózsaszín bárányok középen felhővel, Pihepor (biztos altatás), nagyobb Holdsugár, Teaszertartás óriás csészéből, lassabb Hádész, Cerberus fekete-lila lángnyelvek (`darkFlame`), Forgószél kör nélkül, Földrepesztés láva nélkül, Földrengés földhalom nélkül, Titáncsapás nagy ugrással, Espresszó-idézés a szájából, élesebb Árny-csapat, gyorsabb Levélvihar, lassabb tölgy-ágcsapás, látható üst, közös támadás a hősök saját képeivel.
- **15. kör** (`r14a.js`, „Mind mehet”: hibák + ötletek): főellenségek ÉP ×0,8 (Oolong, Méhkirálynő támadása ×0,85 is); saját fázis nélküli főellenség 50% ÉP alatt „feldühödik” (`r14Enrage`: felirat, piros izzás, ×1,25 támadás). Gyenge pont jelzés (`r14Weak`, könnyű szinten mindig, egyébként első eltaláláskor „GYENGE PONT”). Sebességgomb 1×/2×/3× (mentve). 3 mentőhely a címképernyőn (`Storage` burkoló: 2–3. hely `SAVE_KEY-<n>`). Bestiárium (térkép „📖 Bestiárium”, legyőzések számlálva). Napi kihívás (térkép „⭐ Napi kihívás”, dátumból sorsolt, naponta egyszer +500 arany). Páros támadások (`PAIRS`, mindkét hős ≥50% limit, a menüben „PÁROS: …”). Gőzrúgás (`A.steamKick`) és Tájfun (`A.typhoonR`) saját animációt kapott. Fekvő telefon: a csatatér két sort foglal, a hőskártyák jobbra, a bolt két oszlopos.
- **16. kör** (`r15a.js`, a 14–15. kör tesztlapja): Farokcsapás teljes testtel (nincs nyújtott farok); Tealopó majom a saját karjával dob (`LIMBS.monkey`); Mázpáncél: csak a váza-mintás, eltört pajzs (`r15VaseShield`); Tusátok: festett tussárkány; Édes álom, Holdsugár, Teaszertartás (csésze + ívelt tea-hullám) újrarajzolva; Átok lánc nélkül; fekete-lila lángok lángtextúrából (`darkFlame` felülírva, `r15DarkTex`); Földrepesztés kicsi→nagy; Titáncsapás nagy ugrással; tűzlehelet lángcsóvával (`fireBreath`); Koffein-gólem kávészemekkel; Árny-csapat lecsap; Tölgy ága föld nélkül, Levélvihar becsapódással; kisebb, kidolgozott üst (`qCauldron`); közös támadás plakátja hős-panelekkel; térképpöttyök a pontsorokra mérve (képfelismerés: scratchpad `dots.js`); napi kihívás a csapat szintjéhez; páros támadások két saját mozdulattal (`R15_PAIRSEQ`); fekvő elrendezés rés nélkül. Figyelem: minden `effects.push`-nak kell `draw` (különben a render elhasal).
- **17. kör** (`r16a.js`): Ágcsapás hosszabb/gyorsabb; Espresszó „Lecsapás” (ugrás, rázuhanás, forgatás nélkül); az üst-téma kikerült a sztoriból (szövegcsere futáskor: `INTRO`, `ZONES`, `overlay`), `qCauldron` üres, r13b üst-rajz törölve; Mázpáncél hős-stílusú, apró darabokból (`r16VaseShield`); Tusátok toll nélkül, lábas tussárkány; Édes álom nem sebez, rózsaszín alvófelhő (`_pinkSleep`); Teaszertartás új hullám (`r16Wave`); Átok láncai vissza; `darkFlame` kunkorodó lángnyelvek (`r16Tongue`), ritkítva; Földrepesztés sok kis tüske; Espresszó és Árny-csapat idézés erősebb; páros támadások saját jelenetek (`R16P`); napi kihívás erősebb, vegyes, 3 csata; térképen a titkos jel és zónanevek nem takarnak, elforgatáskor igazodik.
- **18. kör** (`r17a.js`): élethű, festett effektképek Canvával (`fx7-*` az `IMG_SRC`-ben, `R17I` tölti be; a figurabetöltő kihagyja). Folyamat: `generate-image` (percenként ~1 kép, kvóta) → a „A Nagy Kávérablás csapatkép” terv (`DAHW1ZtSXrE`) 6. (fekvő) / 7. (álló) oldalán `update_fill` → `export-design` PNG → scratchpad `conv.js` (flood = fehér háttér ki, blackalpha = fekete háttér átlátszó) → `addimg.py`. Kész: tussárkány, lila lángoszlop, viharkoponya, tea-hullám, csillagsárkány. Utána elkészült: tűzsárkány (Sárkánynyíl), lótusz (Lótuszvihar), aranyrobbanás (Tündérököl). Cerberus: harapás fogsorral, izzó föld + lángoszlopok; Átok: Hádész + eredeti lánc-kör + lecsapó koponya; Mázpáncél a hősök felé fordul, találatra eltörik; Espresszó idézés szájpont (.165,.245).
- **Tesztlap**: csak a kipróbálandók (`tesztlap.html` a scratchpadban → ugyanaz az áttekintő artifact). A címek a Próbaterem gombfeliratai, a játék sorrendjében (scratchpad `mktests.js` + `spec.json` generálja a játékból).
- **Stílusszabályok**: a teljes, rendezett szabálylista a `CLAUDE.md`-ben van (246 megjegyzésből). Rövid változat: valódi tárgyak (tüske, gomba, szilánk, kés, kifli) generikus csillag/részecske helyett; a hatás a megfelelő testrészből jön (lehelet a szájból, dobás a kézből), és **a figura saját testrésze mozogjon** (ne egy mellé rajzolt külön darab); kard/vágás csak pengénél, égi villám csak villám elemnél, vékony gyűrű és zöld trutyi nem kell; az elem színe illik az elemhez; „gagyi” = nagyobb, látványosabb, részletesebb, folyamatos mozgás; minden támadásnak saját hangja van, csengő sehol; erősítés/gyengítés 1 kör; magyar helyesírás; teszteket egyesével, nem csoportosítva, a játék pontos neveivel és sorrendjében; ahol egy testrész természetesen nyúlhat (kar, farok, nyelv), ott nyúljon, a figura pedig egész testével mozduljon (nem robotos forgatás); üres „Nem jó” = legyen látványosabb.

- **22. kör – III. rész (Matcha-föld) újraépítve** (`forras/r21a.js`, `forras/r21b.js`, `game.html` alap: `part3`, szinthatár 90, `joinedRoster` Lili nélkül, amíg távol van): a `KAMPANY3.md` alapján 4 új fejezet (9–12., 16 pálya, teljes párbeszédek), 17 új ellenfél saját támadásokkal, Habos állapot (tűz/villám ×1,5 és leszedi, fizikai ×0,7), Kaelen a druida (6. hős, a 9-2 után; Moha-párna, Kéregbőr, Vad Alakváltás 25–25–25–25% medve/sas/teknős/vipera, Tüskegyökér, limit: Bambusz-gólem). Lili a 8-4 után elrepül (nincs a csapatban), a 12-3-ban megbékítve ellenfél – nem hal meg, felébred, és visszatér. 3. térképlap (`map3`), „3. térkép ▸ / ◂ 2. térkép” gombok, a 8-4 utáni stáblista után „Jön a harmadik rész!” ablak. Mochi-király fél életerőnél két Mochi-nyálkára válik (ő megmarad); Gongütés: 1 körig némaság (csak alaptámadás, tárgy, védekezés). Titkos X-2 (Ősi Habverő-műhely, 11-2 után, 5000 arany). Hatfős csapat: két pihenő („Kik pihenjenek?”), a beállók a pihenők helyére állnak (`benchList`, `placeParty`). Chasen indítéka: „a világ elfelejtette megízlelni, amit iszik” (a „túl hangos” Kamilláé volt). Az új ellenfelek képei Canvával készülnek; amíg nincs saját kép, `SPR_ALIAS` kölcsönképet használ (magától kikapcsol, ha a kép beágyazva). Hátra: idézések, páros támadások, Csendmérő, Chasen fázisai, Matcha-latte/Arany Matcha-por, saját animációk.
- **21. kör, 2. rész – teljes átnézés** (`forras/r20c.js`): új végigjátszó teszt (scratchpad `playall.js`: mind a 33 pálya, párbeszédek, fejezetvégek, „Ki pihenjen?”) – minden pálya teljesíthető, JS-hiba nincs. Javítva: bolt fekvő telefonon (a lista ~100 → ~200 px, a ✕ gomb a sarokban, alsó Vissza rejtve); térképcím nem duplázódik („A Káosz Tornya · A Káosz Tornya”); pihenő hős párbeszédsora „(a háttérből)” jelöléssel.
- **21. kör – logikai javítások** (`forras/r20b.js`): a méreg nem hat a gépekre (óramű katona, ágyú, Rozsdakirály, Koffein-gólem, Szamovár-gólem, Ősgólem); a Kis nyálka is méregálló; titkos pálya jutalma „arany”; Tollvihar = fegyver, Édes álom = semleges, Lekvárhullám = víz; Porcelánbaba villámra gyenge (nem fényre); Grog boltlistája nyitási sorrendben; a bestiárium jelzi, ha a gyenge pont harc közben változik. `KAMPANY.md` fejlécében: elavult korai terv.
- **Visszaállítás (2026-10-11):** a Codex okt. 7–9. közötti munkája (20–21. kör, `23b7bf7`-ig: animációk, térkép, Matcha-föld 9–12. fejezet, `listak.html`) a felhasználó kérésére kikerült – a fájlok a `bd15417` (az utolsó Claude-állapot) szerint. **Megtartva** a Codexből: Cerberus (`r20h`) és Teaszertartás (`r20l`) → `forras/r20a.js`, a hozzá tartozó `fx7-teacloud` és új `fx7-teawave` kép, valamint az `ins10.py` r20/r21-támogatása (az `r19z.js` marad az utolsó réteg). A Codex munkája a git-történetben megvan (`23b7bf7`), a Kaelen- és térkép3-képforrások a `forras/kepforras/`-ban maradtak.
- **19. kör** (`r18a–d.js`, a 18. kör tesztlapjának s001–s017 pontjai):
  - Földrepesztés: a régi „nagy kitörés” a `groundCrack` sziklaképe volt (`fxImage('rock')`) – az új változat nem hívja; saját repedés + 3 sor kidolgozott kőtüske.
  - Mázpáncél: a fénycsík csak a pajzs alakján belül fut (offscreen vászon, `source-atop`).
  - Espresszó idézés: a saját állkapcsa leesik (`R18_JAW`, `r18EspImg`), izzó torok, fogak; a láng onnan indul.
  - Lecsapás: felugrik az égbe, az árnyéka nő a hősön, becsapódik, kráter.
  - Teaszertartás: festett kamillás csésze (`fx7-teacup`), a hullám a peremből bújik ki.
  - Cerberus: festett lila lángoszlop nyeli el Morgánát; a harapás lidérc-kutyafej (`fx7-hound`).
  - Tusátok: nagyobb jel, festett porcelán tintatartó (`fx7-inkpot`), nagyobb sárkány, tintafolt-robbanás.
  - Árny-csapat: éles fekete árnyalakok lila körvonallal, mindegyik saját nagy támadás, közös lángoszlop-robbanás.
  - Páros támadások: Villámátok (sugarak → felhő → festett villám `fx7-bolt`), Csillagözön (a sárkány maga söpör végig + festett meteorok `fx7-meteor`), Árnyroham (szalagok + söprés `fx7-darkslash`), Lótuszvihar (nyíló lótusz + festett szirmok `fx7-petal`), Sárkánynyíl (nagy, lassú festett tűzsárkány, égő földcsík), Tündérököl (saját odaugrás, aranyrobbanás, fényoszlopok).
  - Térkép: vissza az eredeti pöttyhelyek (fa, torony stb.), íves pontozott ösvény (`.map-trail`).
  - Canva-terv 8. oldala: négyzetes (1008×1008) exportoldal.
- **Összefoglaló PDF**: `Jatek_osszefoglalo.pdf` (22 oldal: történet, hősök és képességek, páros támadások, idézések, pályák, bestiárium, tárgyak). Újragenerálás: scratchpad `dump.js` → `gamedata.json` → `mkpdf.py` → `topdf.js`.
- **22–23. kör** (`r21a–j.js`, a 3. térkép és Kaelen):
  - 3. térkép (Matcha-föld, 9–12. fejezet), 17 új ellenfél festett képpel, Kaelen (druida, 6. hős), 6 hős / 2 pihenő, titkos X-2, új idézések (Mochi-király, Zen-sárkány, Békakirály, Chasen).
  - Kaelen új, mesehősös képei (`druid`, `-attack`, `-cast`, `-hurt`; forrás `forras/kepforras/p3/kaelen2/`), `HERO_DEF.druid` h:270, kéz a bot drágakövénél.
  - Medveforma: festett ágaskodó medve (`fx7-wsbear2`), háromszori lecsapás véres karomnyomokkal.
  - Tusátok: a sárkány a tintatartó száján nő ki és oda bukik vissza (vágás a száj vonalán).
  - Lidércnyomás: két festett lidérckar (`fx7-wraitharm`) préseli össze az ellenfelet.
  - Páros támadások: Villámátok (lila villámok fel az égbe, kétszer annyi lecsapás), Csillagözön (a sárkány csak megjelenik, festett csillag-meteorok), Sárkánynyíl (gyorsabb), Árnyroham (füstös bevonás, tükrözött vágás), Tündérököl (festett aranyököl `fx7-goldfist`).
  - Idézések: Espresszó lángja a szájból (közös `fireBreath` javítás: a részecskék kicsiként indulnak), folyamatos méhraj (`beeStream`, ellenséges Méhraj is), Árny-csapat vissza az eredetire, lendületes mókus, villámdenevér-raj.
  - Cerberus: fényes fekete-lila lángoszlop, a három fej egyszerre harap. Álomcsillagok: festett csillagok tömege. Gleccser: festett jégtüske-csoport (`fx7-glacier`). Átok: lángnyelves örvény, festett lánc/koponya (`fx7-hexchain`, `fx7-hexskull`).
  - Térképek: az 1–2. térkép festett pöttyös ösvénye képfeldolgozással eltávolítva (scratchpad `mapclean.js`; tiszta források `forras/kepforras/map*-tiszta.webp`).
  - Jázmin LIMIT-plakátja: a maradék fehér folt átlátszó.
- **24. kör** (`r21k.js`, `r21l.js`):
  - A 3. térkép ellenfeleinek új támadásai (a teljes tesztlista „gagyi” jelölései szerint): Habzápor, Habverő-pörgés, Mochi-ugrás, Tekeredés, Buzogánycsapás, Mozaiklövedék/-szilánkok (nagyobb Mozaik-szellem), Csőrcsapás, Csészecsapás, Forró gőz, Gőzsugár, Teafröccs, Gongütés, Habvihar, Megbékítő szó.
  - Hab: fehér, buborékos matchahab (`fx7-froth`, a régi zöld `fx7-foam` helyén is); a `foamPour` habja lefolyik és eltűnik.
  - Hiányzó hangnevek (quake, gong, steam, wind, crunch, zap, screech, roar, twinkle) meglévő hangokra irányítva.
  - Kaelen 5 páros támadása: Medvelovaglás, Bambuszliget, Villámbambusz, Átokindák, Harmatkör.
  - A 3. térkép saját festett csatahátterei: `bg-matchastream`, `bg-zengarden`, `bg-matchacave`, `bg-cloudpalace`.
  - Javítás: a Koffeines mókus csak az 1. fejezetben bukkan fel (eddig a 10–12. fejezetben is).
  - Ellenőrzés: `playall.js` 50 pálya hiba nélkül, `foe.js` 177 támadás, `sumall.js` 23 idézés, `all.js` 85 képesség – hiba nincs.
- **25. kör** (`r21i.js`, `r21j.js`, `r21m.js`, `r21n.js`):
  - Kaelen képességei és páros támadásai festett képekkel (tüskevihar, gombák, harmatlevelek, virággyűrű, tölgyököl, bambuszliget, medve), Levéltánc, Kőőr Buzogánycsapás nagy ugrással.
  - Árny-csapat: árnysereg a földből; Villámdenevér óriás denevér; Zen-sárkány helyben, apró kavicsokkal; Átok: csak a csontok festettek (B6!).
  - `r21n.js`: `index.html?proba=hero:<típus>:<képesség>|pair:<név>|foe:<ellenfél>:<támadás>|summon:<id>` egyenesen a Próbaterembe visz és lejátssza (mentés nélkül).
- **Tesztlap új funkciói:** „⏸ Később” gomb (`later` mező), gyorscímkék a „Nem jó” megjegyzéshez (a korábbi visszajelzések mintájára), fotó csatolása (`assets`, `photos` mező, `/_blob/<id>`), „🎮 Megnézem a játékban” gomb (`tests.link` mező, GitHub Pages `main`).
- **26. kör** (`r21o.js`, a tesztlap x-pontjai alapján):
  - Új festett képek: `fx7-mushroom`, `fx7-thunderbat`, `fx7-bamboopole`, `fx7-inksplash`, `fx7-foamwave`, `fx7-teasplash`, `fx7-darkflame`, `fx7-dewdrop`, `frogking-cast` (a Békakirály nyelv nélküli képe a Nyelvcsapáshoz).
  - Villámdenevér festett óriás denevér, fehér villámok a szárnyak közt; Nyelvcsapás vastag nedves nyelv a szájból; Tekeredés: a kígyó saját feje mar; Habzápor után nem marad habkör; Forró hab festett habhullám; Teafröccs folytonos teasugár + festett fröccs; Tusátok gyorsabb, festett tusfoltok.
  - Kaelen: Bambuszcsapás lassabb, festett rudak; Tövisvihar csavarodó tölcsér; Ősi Tölgy ökle sima csapás; Virágzó élet virággubó; **Levéltánc TÁMADÁS lett** (5 találat); LIMIT Bambusz-gólem kisebb, földbe csap, rudak törnek fel, bambuszfal.
  - Páros: Medvelovaglás (Grog végig a hátán, átúszó képek), Bambuszliget (bambuszerdő), Villámbambusz (rudak egyesével, fehér villám köti össze), Átokindák (festett lila láng), Lótuszharmat (festett cseppek).
  - Kőőr Kőhabverő-csapás teljesen új: kőörvény, sziklagejzír.
  - Közös segédek: `r21ease`, `r21Zap`/`r21ZapTree` (villám), `r21Pole` (bambuszrúd), `r21Flame` (lila láng), `r21TeaBlob`.
  - Tesztlap: Beküldés a Később előtt; a játék-link egy nevesített lapot (`epicgame`) használ.
- **27. kör** (`r21p.js` + `r21o.js` módosítások, a tesztlap aa-pontjai alapján):
  - Villámdenevér: a régi denevér + Zordon Villámcsapása minden ellenségre (felhasználó kérése). Tusátok visszaállítva az eredetire (r21i.js a 26. kör előtti állapot, tusfolt-felülírás törölve).
  - Békakirály Nyelvcsapás: a Lekvárdzsinn karjának mintájára `LIMBS.frogking` – a kép saját nyelve (arm+hand) nyúlik meg a szájból (`limbOn/limbAim`).
  - Ősi Tölgy ökle: csak feltör az ellenség alól. Levéltánc: 3 gyors hullám. Tövisvihar: festett rózsatövis-forgószél (`fx7-rosestorm`), forgás tükörkép-átúsztatással.
  - Matcha-gólem Forró hab: habgejzírek (`fx7-foamgeyser`). Átokindák: festett lila lángfal (`fx7-firewall`). Villámbambusz: több villám. Lótuszharmat: ÚJ funkció, Harmatpajzs (`dew` állapot, 1 kör: az első találat sebzése gyógyulás).
  - **Felszerelés a hősön**: `GEAR_LOOK` – ha fegyver+ruha ≥ 4 szint, a hős díszesebb képre vált (`wizardG*` kész Zordonnak; referencia: a régi 4 póz 2×2 lapon feltöltve Canvába, generate-image szerkesztéssel). A többi hős még hátravan.
- **28. kör** (`r21q.js`, a tesztlap ba-pontjai alapján):
  - Vad Alakváltás: vágtázó medve (`r21Gallop`: nyúlás-összehúzódás, gerinchullám), festett kígyótest (`fx7-snakebody`) útvonal mentén rátekeredik (`r21CoilPath`, `r17Snake`). Tekeredés ugyanezzel.
  - Bambuszcsapás: égből zuhanó dárdák. Tölgyököl egyenesen. Levéltánc gyorsabb. Bambusz-gólem átsétál, lecsap. Medvelovaglás vágtával. Bambuszliget: Jázmin a földbe lő, dárdák nőnek ki. Villámbambusz: 4 rúdból villám.
  - Átokindák → **Lángoló Átokketrec** (a láng a ketrec képével maszkolva). Lótuszharmat: új funkció, LIMIT +60%, MP +40% (a páros költsége utáni pótlással).
  - Habgejzír szeletenként hullámzik + habcsomók; Teafröccs a festett tea-hullám végighajlítva. Tusátok: festett kalligráfia (`fx7-inkglyph`, ecsetkép még nincs, a régi ecset marad), festett tusfoltok. Kőhabverő: festett kőörvény (`fx7-stonevortex`).
  - Az ellenségek fölötti „gyenge:” jelvény kivéve (r14a.js). A felszerelés-kép mind a 6 hősnél kész (`GEAR_LOOK`, `<hős>G*`).
- **29. kör** (`r21r.js`): nagy „GYENGE PONT!” felirat (arany, felrobbanó, rázkódás; a kis címkék helyett), filmszerű főellenség-/minibossz-belépő (szélesvásznú sávok, beúszó név, morgás), időjárás témánként (`R21WX`: eső, levelek, szirmok, köd, gőz, hó, csepegés, hamu, homok, csillagok).

## Tesztlista és áttekintő (egy helyen)

Minden jelölés egy oldalon: https://claude.ai/artifact/6D1sUCKfqLohVoGNQdc8ek (a régi tesztlista, YTZqxtyqwPfqbLjSTzRX6i, már csak egy átirányító pontot tartalmaz).
- Fent „Kipróbálandó javítások”: a `tests` gyűjteményből (title/how/expect/area/order/link – a `link` a `?proba=` formátum) – új tesztpontot ide kell írni (`ArtifactData`).
- Alatta a teljes történet, 32 pálya, 65 ellenfél (a játék adataiból generálva: scratchpad `dump.js` → `story.json` → `mkrev.py`).
- Jelölések a `review` gyűjteményben: `status` ok/bad, `note`, `sent` (beküldve → nála eltűnik), `handled` (Claude feldolgozta), `reply` (Claude válasza a lapon). Tesztpont kulcsa `t-<id>`, pályáé `L<id>`, fejezeté `z<n>`, ellenfélé `e-<típus>`, bevezető `intro`.
- A „Kész” gomb `meta/done`-t ír, és kommentként szól Claude-nak (`comments.sendToClaude`). Javítás után: `handled:true` + `reply`; ha újra ki kell próbálni, új `tests` pont.

Támadás-tesztlista (2026-10-14-én egyszerűsítve, kitűzve): https://claude.ai/artifact/YETTFbipDrw3jJbPXy881Z – a felhasználó kérésére CSAK a hősök (páros támadásokkal) és az ellenfelek támadásai maradtak (277 pont); menük, térkép, pályák, tárgyak, idézések kikerültek. Rövid címek („Zordon → Tűzgolyó”, „Zöld nyálka → Rávetődés”), a sablonmondatok törölve, „🎮 Megnézem” gomb. A jelölések továbbra is a `review2` gyűjteményben (ugyanazok a kulcsok). Forrás: scratchpad `atk.html` (a régi lapból Pythonnal szűrve).
Régi leírás: Teljes tesztlista (könnyű szint, 381 pont, 2026-10-12-én a 26. kör után újragenerálva, kitűzve): https://claude.ai/artifact/YETTFbipDrw3jJbPXy881Z – a pontok a lapba vannak ágyazva (scratchpad `fulldump.js` → `full.json` → `mkfull.py` → `fullitems.json`, az `ITEMS` sor cseréje). Tiszta lappal: a jelölések MOST a `review2` gyűjteményben vannak (`t-<id>`, `title` mezővel), a „Kész” a `meta/done2`-t írja; a régi `review` már nem látszik. Van 🎮 link (`link` mező), gyorscímkék, ⏸ Később; a páros támadások csak a „Közös és páros” részben szerepelnek.

## Tervezett játékfejlesztések (a felhasználó tesztje után, egy csomagban)

A felhasználó kérte: most csak elmentve, majd ha kipróbálta a tesztlapot, egyben készüljön el – látványosan, élethűen (CLAUDE.md A1).
- **Napi kihívás** (`r14a.js`, `r16a.js`, térkép ⭐ gomb) már van – a tesztlapon (x31) ellenőrzi, működik-e; ha nem, javítani.
- **Bestiárium** (📖 gomb) már van – x32; festett képek, leírás, gyengeség legyen benne, ha még hiányzik.
- (kész, 29. kör) **Gyenge pont / kombó-jelzés:** ha a képesség eleme jól hat, nagy „GYENGE PONT!” felirat, rázkódás, hang.
- (kész, 29. kör) **Főellenség-bevezető:** filmszerű belépő a fejezet végi főellenségnél (közelítés, név nagy betűkkel, hang).
- (kész, 27–28. kör) **Felszerelés látszódjon a hősön** (új fegyver/kalap a figurán).
- (kész, 29. kör) **Időjárás a pályákon:** eső, köd, hulló levelek a háttér témája szerint.
- **Tesztlap „🎮 Megnézem a játékban” gomb:** ha a kezdőképernyős appból nem működik (x33), ki kell venni.

## Nyitott ügyek

- Állított telefon: a felhasználó kétszer „Nem jó”-t jelölt megjegyzés nélkül – képernyőképet kértem. (Javítva közben: ragadós csatatér csak nyitott ablak nélkül; a gombhely-megtartás csak csata közben, a térképen nem marad üres rész.)
- Hiányzik a repóból a `src/` mappa és a `MASODIK-RESZ.md` terv – ha a felhasználónál megvan, érdemes feltölteni.
- Ellenőrzés: a próbateremben mind az öt hős mind a 74 képessége hiba nélkül lefut (`perform` minden képességre).

## 30. kör – ca-jelölések javítása, lebegés, Kaelen helye
- Lebegés ellen: erős vetett árnyék + érintkezési folt minden figura alatt (r21r.js drawEntity-burkoló); időjárás: matchacave csöpögés, teaház porszemek.
- Kaelen pont Grog helyére áll, ha Grog pihen (r21r.js placeParty-burkoló).
- r21s.js: medve festett 4 fázisú vágta (fx7-bearrun0..3, visszafelé tükrözve); kígyótest háttal felfelé + folyamatos hullám (Tekeredés, kígyóforma);
  Forró hab a földből tör fel (repedés, gőz, kődarabok); Levéltánc folyamatos levélfolyam; Tövisvihar kétrétegű, porgyűrű, felkapja az ellenséget;
  Bambuszcsapás liget nélkül; Bambuszliget lassabb, a nyilakból hegyes bambuszkarók (r21Stake); Lótuszharmat: szirmokból összeálló lótusznő
  (fx7-lotuswoman) végigszalad az ellenségeken; Bambusz-gólem: festett két póz (fx7-golemstand/golemup), kinő, a földbe csap, bambusztüske-mező;
  Medvelovaglás helyett „Élő Tölgybárd” (Kaelen+Grog, fx7-oakaxe Grog kezében, felugrik, lecsap).
- Teszthez: `window.R21WS='bear'|'snake'|'turtle'` kényszeríti a Vad Alakváltás formáját.

## 31. kör – 5 új játékelem + javítások
- r21t.js: (1) talajba nyomódás nagy ütésnél (kráter, repedés, a figura lesüllyed), (2) visszavágás 15% eséllyel, (3) KOMBÓ ×n (+15%/láncszem, max +45%),
  (4) pálya-események minden 2. kör végén (gőzkitörés, kidőlő bambusz, kőomlás – sosem öl), (5) főellenség dühfázis fél életnél (izzó repedések, Dühkitörés).
- Tündérököl újra: Lili körberepüli Grogot, forgó fénysugarak, arany utóképek, izzó arany repedések, fényoszlopok. Árnyroham gyorsabb (~felére).
- Élő Tölgybárd: Grog fejsze nélküli képe (orcnoaxe-cast / orcGnoaxe-cast), a bárd az öklében. Tusátok: festett ecset (fx7-inkbrush).
- Próbaterem: a páros indításakor a második hős nem szorítja ki az elsőt (Lili eddig kimaradt a Tündérökölből).
- 31. kör folytatás (ea-jelölések): lebegés valódi oka – 8 kép (wizardG*, druid-attack/hurt, druidG-attack/hurt) alján 15–26 px üres sáv; betöltés után leigazítva (r21t.js).
  Kígyó: egyetlen nyomvonal (a test a fej nyomában). Forró hab: Magmakitörés-mintájú matcha-tócsa + festett habszökőkút. Levéltánc: a levelek átmennek az ellenségen.
  Gólem nagyobb, festett bambuszkaró (fx7-bamboostake) mező. Élő Tölgybárd sötétebb: fekete-zöld indák, festett tüskés gyökerek (fx7-darkroots).
  Bambuszliget: 5 nyíl/ellenség, nyilanként 3 karó. Lótuszharmat gyorsabb, több szirom, harmatlevél a bal szélen. Medve nagyobb, simább, festett karomcsapás (fx7-bearclaw).

## Várakozó kérések – KÉSZ a 32. körben
- Morgána – Sötétalku: megint lángok veszik körbe → a lángok teljesen ki (B7: korábbi tiltás!). Előtte: grep az összes Sötétalku-réteg/burkoló után.
- Tealopó majom: 8 csészét dob → elég 3.

## 32. kör – egyensúly + tesztlap-jelölések + hibakeresés
- r21u.js EGYENSÚLY (bal.js mérés, Normál): késői pályákon alaptámadás az ellenfél életének 2–5%-a, LIMIT 7–15%, idézés 10–20% volt.
  Javítás: ellenfél ÉP osztó 1+(szint−4)·0,06 (főellenség ·0,82), támadás −12% a 8. szinttől; LIMIT ×1,6, idézés ×1,6, páros ×1,3.
  Utána: alaptámadás 9–25%, LIMIT 60–100% minden ellenfélre, idézés ~1 ellenfél-élet; ellenfél ütése a hős ÉP-jének 10–30%-a.
- Sötétalku: a megszállt Morgána körül nincs darkFlame (r19-es burkoló szórta). Tealopó majom: 3 csésze, körönként egyszer dob.
- Tündérököl: Grog fejsze nélküli képe, az aranyököl az öklén (KP .245/.245), halványabb sugarak. Árnyroham még gyorsabb.
- Tusátok: egyenes testű festett tussárkány (fx7-inkdragon2) a nyomvonalán hajlik (r21Snake2, merev fej).
- Gólem: kevesebb, vegyes méretű karó; valódi lecsapás (előredől, karok lezúdulnak, utóképek). Bambuszliget: nyilak felülről, gyorsabban.
- Lótuszharmat: nincs sárga oszlop a hősökön, 320 szirom, nagyobb szél, gyorsabb nő. Medve: nincs felágaskodás, kétszer nekiugrik, végig azonos méret.
- Kígyó: a fej merev darab (nem vágódik szét). Hiba: r21q.js-ben elírt zárójel (node --check fogta meg) – minden build előtt node --check.

## 33. kör – ha-jelölések
- Tündérököl: festett, jobbra ütő aranyököl (fx7-goldpunch) Grog öklén gyúl ki, kilő, repülés közben az ellenfél méretéig nő, egyszerre suhan át mindenkin, aranyrobbanás + csillámpor-eső.
- Árnyroham: Grog füstté oszlik, a helyén festett árnypenge (fx7-shadowblade) suhan végig, sötétebb kép, aztán újra Groggá áll össze.
- Tussárkány: fehér folt a fej mellett kivágva, 1,4× nagyobb. Kígyó/sárkány fej: a fej hossza a fejkép arányából, a test textúrája a fej mögött kezdődik (nincs dupla fej, nincs nyújtás).
- Bambusz-gólem: 470 px, a hősök eltűnnek, a gólem a helyükön jelenik meg. Bambuszliget: becsapódási fényrobbanás, nagyobb izzó nyilak, finálé: a karók felizzanak és szétrobbannak.

## 34. kör – ia-jelölések + Kaelen ivás + földbeszakadás
- Kaelen tárgyhasználat: saját festett ivó póz (druid-drink, Canva a druid ref-lappal), DRINK_K.druid=1 → a többi hőshöz hasonlóan a kezéből iszik.
- Földbeszakadás (r21Sink): festett kráter (fx7-crater) a láb alatt, rögök + por. Festett törmelék-réteg: shape:'rock' → fx7-clods (ha betöltött), zöld 'leaf' → fx7-leaf (r21u.js part-burkoló).
- Tündérököl: Lili Grog fölé repül és csillámport szór, Grog megnő (1,22×), az ököl a kezén láthatóan megnő, aztán kilő és tovább nő.
- Árnyroham: lassabb; a sweep után a penge a földbe vágódik, repedés minden ellenségig, lávatócsák + lávakitörés (Magmakitörés-stílus), aztán vissza Groggá.
- Tussárkány/kígyó: r21Snake2 tükrözése hiszterézissel (függőlegesen nem törik szét).

## 35. kör – a teljes tesztlista várakozó jelölései (r21v.js, kész)
- Közös: `handPos` most követi a test dőlését (`lean`, a talppont körüli forgatás) – eddig felhúzáskor a varázsfény a bot/kéz mellett villant (game.html, `handPos0` + `handPos`). all.js 85 képesség, foe.js 177 támadás: hiba nincs.
- Bambusz-gólem: a `fx7-golemstand` kép alján lévő szürkésfehér talajfolt kivágva.
- Bambuszcsapás: a zöld fénysugár a bothegyből indul (és követi).
- Levéltánc: 160 festett levél folyamatos, kígyózó folyamban a bothegyből, forgó levélgubó az ellenfél körül (3D pörgés, utókép, szélcsíkok), 4 vágás, szétrobban.
- Tövisvihar: új `r21Twister` – a festett rózsatövis-tölcsér soronként gördülő, tükrözve ismétlődő mintával forog a saját körvonalán belül, henger-árnyékolással (nincs villódzó szeletcsere); 150 keringő levél/szirom lassabb szögsebességgel, utóképpel.
- Élő Bambuszkéreg: a fal a társ rajzolási rétegében (drawEntity-burkoló), kisebb, nem takarja az előtte állókat; a társ a sebzés 30%-át kapja, a támadó a teljes sebzés 80%-át (min. 10% ÉP) kapja vissza, a fal megremeg, lándzsák repülnek vissza (r21d.js gyógyító visszatöltés kivéve).
- Hegyomlás: teljesen új – Grog földbe csap, porfelhők futnak az ellenségekig, kőpor-felhő, 3 hullám festett rög (fx7-clods), festett kőlavina (fx7-stonewave), óriás szikla mindenkire, kráter, talajba nyomódás. Nincs vékony repedésvonal, nincs láva.
- Lidércnyomás: a kar az ellenfélhez méretezve (min. 240 px), a földből ferdén nő ki (talajvonalnál levágva), a tenyér az ellenfél derekánál szorít.
- Átok: a repülő csontok sötétre színezve, lila izzás, lila lángnyelv (fx7-darkflame), lila szikrák és sötét füst.
- Dobótőr: festett tőr (`fx7-dagger`, Canva), 5 tőr legyezőben, utókép, beleáll és remeg, a végén megcsillan.
- Tűzbomba: festett vasbomba (`fx7-firebomb`, Canva), sercegő kanóc, pattanás, nagy robbanás textúrákkal, égő törmelék, porhullám, lángok az ellenségeken, égésfolt.
- Canva: a segédterv 6. oldala (`DAHW1ZtSXrE`) szolgált exportoldalként; a fényes penge-élt a kivágás kilyukasztja → maszk-zárás (scratchpad python).

## 36. kör – a felhasználó által kért fejlesztések (r21w.js)
- Fekvő telefon: a `.tools` gombsor (sebesség/zene/hang) a csatatér alá kerül (fixed, a csatatér szélességében), így nincs üres sáv.
- Ellenfél-szándék: a `weighted` burkolva – az ellenfél következő támadását előre kisorsoljuk (`e._intent`), buborék a feje fölött (⚔ ÜT, 💥 MINDENKIRE, elem-ikon, ✚ GYÓGYÍT, 🛡 ERŐSÍT); az `enemyAct` ezt használja. Ha egy saját AI nem a `weighted`-et hívja, a típus bekerül az `R21_NOINT`-ba (nincs buborék).
- Mesterfok: hősképesség 3. használata után ★ (+30% erő, arany aura, nagyobb/több részecske, erősebb rázkódás, arany becsapódás). Számláló a gombon (★n/3). Mentés: a mentés JSON `mast` mezője (`r21MastPatch`, mentőhelyenként; Próbateremben nem ment).
- Időjárás hat a harcra (`R21WXM`): eső/csöpögés víz+villám erősebb, tűz gyengébb; hó jég+; hamu tűz+; homok föld+; levél/szirom természet+; csillagos éj sötét+; köd: 12% mellé. Bal fent kiírás a csata elején.
- Védelmek: startBattle csata-sorszám túlfutás (r21v), A.melee célpont nélkül (r21w). camp.js: mind a 48 pálya, hiba nincs.

## 37. kör – a felhasználó barlangig gyűjtött megjegyzései (r21x.js + javítások)
- Bolt fekvő telefonon: teljes képernyős, két oszlop, a kártyák/parancsok rejtve (`html.r21shopL`), a ✕ kilépés és a gombsor látszik.
- Felszerelés-kép (`GEAR_LOOK_MIN`): 4 → 12 (fegyver+ruha szint összege), így csak sok fejlesztés után vált díszes képre.
- Közös támadások: bolt „Közös támadások” fül; páros 1200, közös erő 2500 arany (mentés JSON `owned` mező). Páros: mindkét hős limitje 100%, teljes limitet visz, csatánként egyszer. Próbateremben minden elérhető.
- Mesterfok fejezetenként (`R21_MAST[zóna][hős][képesség]`, régi formátum eldobva).
- Elemek: Kristálygólem tűz 1.3 (▲); Espresszó hamu formában jég 1 (nem ✖); saját elem GYÓGYÍT (`R21_ABS`: sárkányfióka/Espresszó lávaformában tűz, szalamandra tűz+láva, jégelementál jég, villámdenevér villám, lampion tűz) – a gombon ✚ jel.
- Fénypajzs + Kristálytükör: a kristály már nincs 46 px-lel eltolva, egymásba illeszkednek (r13a.js).
- Földrepesztés: festett kőtüskék (`fx7-rockspike`, Canva, 7. oldal), kráteres repedés, porfelhők.
- Dührepedés (főellenség fél életnél): elágazó, elvékonyodó, izzó magmás hasadékok parázzsal (r21t.js `r21RageDraw`, a régi vonalak törölve).

## 38. kör – izgalmasabb harc (r21y.js)
- Mérés (bal2.js): az ellenfelek 1–3 ütéstől estek, egy ütésük a hős ÉP-jének 5–10%-a volt → nem volt tét.
- Ellenséges sebzés ×1,5 minden szinten (`R21_EATK`, Próbateremben nem).
- Töltött támadás: 2. körtől 16% (főellenség 30%) eséllyel ERŐT GYŰJT (vörös izzás, remegés, ⚠ NAGY ÜTÉS buborék), következő körben a legerősebb támadása pow×2. Megszakad: gyengeség-elem, LIMIT/páros, vagy ≥20% ÉP sebzés.
- Elit ellenfél: csatánként max. 1, 18% esély, nem főellenség-pályán; ÉP ×1,5, dupla arany/XP; tulajdonság: Páncélos (−35% sebzés), Tüskés (fegyveres ütés 20%-a vissza), Gyógyuló (8%/kör), Robbanó (halálakor 10% minden hősre).
- Csatakihívás bal fent (🎯): 3 kör alatt / ne essen el senki / 2 gyenge pont / tárgy nélkül; siker: +40+szint·6 arany.

## 39. kör – képernyőképes megjegyzések (r21z.js, r21za.js + forrásjavítások)
- Titkos pályák (X-1, X-2, X-3) a térkép végén nyílnak (`secretOpen` → `cleared('4-4')`, X-1 a 3. zónába sorolva); felszerelés-kép a plakáton, kártyán, cut-in-ben (gearLook); felső tájékoztató HTML-ben (`.r21hud`, éles); szándék-buborék kikapcsolva (`r21IntentOf` → null).
- Fénypajzs / Kristálypajzs: csak 1 kör (addStatus n=1). Cerberus fejei lassabbak (r21j). Bolt: „még X arany kell”. Tealopó majom: 1 lépés. Közös támadás csak megvéve (S.test kivétel törölve). Lánc lejjebb (stickFx bottom). Öreg Oolong pálya: kevesebb kör, a földön.
- Földrengés (A.quake): gördülő kőhullám + lávás hasadék + lávakitörés, Grog alatt semmi. Titáncsapás: tüskék körben (r13Quake felülírva). Árnyroham: nagyobb magma. Magmakitörés a 3-3-tól. Dührepedés a figurába sütve (r21CrackSprite), együtt mozog. Árny-csapat: karok, karmok nélkül, mindenki lecsap. Tündérököl: Grog arany öklé válik. Espresszó szája tűzfújáskor nyílik.
- Új CC0 hangok (hangok/*.mp3) és zenék (csata2, foellenseg2, terkep2) – lásd hang/FORRASOK.md.
- Bal felső felirat (kihívás, időjárás): a `.stage` `position:relative` lett, így iPhone-on állóban sem csúszik az állapotsor alá.
- Képregény (r21za.js): prológus + 12 fejezet, fejezetenként 3 panel szövegdobozzal és buborékkal, koppintásra jelenik meg (fekvőben egymás mellett, állóban egyesével). Prológus + I–VI. fejezet: Canva festett képsor (`tx-cm<n>_<0-2>`, a segédterv 10–16. oldaláról exportálva, a fehér réseknél vágva); VII–XII.: a pálya festett háttere + ellenfél/főellenség figurája (`r21ComicCompose`). A `talk(INTRO)` és a `chapterIntro` ezt mutatja. Próba: `index.html?proba=comic:intro` vagy `comic:<zóna 0–11>`.

## 40. kör – képregény folytatás + Morgána: Sötét futóhomok (r21za.js, r21zb.js)
- Képregény: a VII–X. fejezet is festett Canva-képsort kapott (`tx-cm7..10_<0-2>`, `R21_COMIC[6..9].img`). A XI–XII. fejezetnél elfogyott a kredit: ott továbbra is a pálya háttere + figura (`r21ComicCompose`).
- Új képesség: Morgána – Sötét futóhomok (`SK.quicksand`, bolt: 4-2-től, 1900 arany; 30 MP, 2 kör várakozás, sötét, minden ellenségre, 35% kábulat 1 körre).
  Animáció (`A.quicksand`): minden ellenség alatt örvénylő sötét futóhomok (spirál homokcsíkok, csillogó szemek, lila perem), a homokból festett lidérckarok (fx7-wraitharm) nőnek ki (nagy ellenfélnél 3), megragadják a derekát, és mélyre (a test 60%-áig) lehúzzák – a test a homok alatt levágva (drawEntity-burkoló, `e._qs`), vergődés, sötét homokfröccs, sebzés; utána a karok visszasüllyednek, a homok kiköpi őket. A nehéz támadás utáni kráter (`r21Sink`) itt ki van kapcsolva (`S._r21noSink`).
- Sötét futóhomok átdolgozva (ia: „nincs homok hatása; egy nagy homok; a karok az ellenségeknél; Morgána guggoljon le, üssön a földbe, tőle induljon a homoklavina”): Morgána leguggol (sq .74, enyhe előredőlés) és a földbe csap → szemcsés homoklavina gördül a talajon az ellenségekig (hömpölygő hullámfront, taréj, repülő homokszemek gravitációval) → EGY nagy, fodros futóhomok-mező (procedurális homok-textúra `r21SandTex`, mintaként forogva) minden ellenség alatt, örvénytölcsérekkel → karok minden ellenségnél, lehúzás, homokpárkány a besüllyedt test előtt → kiköpi őket, a mező visszahúzódik. A mező az első figura előtt rajzolódik (drawEntity-burkoló, képkockánként egyszer).
- Sötét futóhomok 2. átdolgozás (ia: „ez nem leguggolás, összenyomódik; nem élethű a homok”): festett guggoló Morgána (`fx7-witchcrouch`, díszruhában `fx7-witchGcrouch`, Canva, az eredeti figurából, ököl a földön) – a `_crouch` alatt ez rajzolódik a figura helyett; az öklétől indul a lavina. Természetes sötét homokszín (barna-okker szemcsék, fodrok), homokszínű porfelhők a csapásnál és a hullámfrontnál. Minden vékony kör/körvonal kivéve (hullámtaréj, perem, örvény-ívek, párkány): az örvény szemcse-spirál + árnyék-tölcsér.
- Tesztlap függő megjegyzései (t-ka04–07, t-ja05, t-la01): Bambuszcsapás – kerek zöld villanás a bot zöld kövénél (a felfelé csík helyett, r21q). Levéltánc – a levélfolyam nem ível fel, egyenesen áramlik (r21v). Élő Bambuszkéreg – nagyobb fal (1,8× szélesség, a társ magassága). Tövisvihar – gyorsabb (felpörgés 420 ms, végigsöprés 1250 ms). Tusátok – a sárkány farka a tintatartó előtt nem látszik (kivágás az edény szélességében), kisebb ív a hősökhöz (r21i). Fekvő telefon gombsor: a hely a képernyő aljához mérve (`innerHeight`), nem a .game dobozhoz (r21w).

## 41. kör – tesztlap (ma05–ma10, na01) + „mindig festett kép” szabály (CLAUDE.md A4)
- Hang (ma10 „nem kapcsol be”): a minták betöltődnek; az ok az iPhone néma kapcsolója (Web Audio néma módban hallgat). Javítás (r21zb): `navigator.audioSession.type='playback'` (iOS 17+), régebbin néma, ismétlődő <audio> (`hangok/csend.mp3`) tartja lejátszás-módban; minden érintésre `ctx.resume()`; a Hang gomb bekapcsolásakor próbahang.
- Földrengés (SK.titan, anim quake) és Titáncsapás (LIMIT, r13Quake): láva teljesen ki (lávakitörés → por + rögök; a rajzolt repedésvonal is ki). Árnyroham lávája marad.
- Árny-csapat (ma06): minden lecsapásnál festett sötétlila vágásív (fx7-darkslash) fentről lefelé + szikrák.
- Tündérököl (ma07): az áldás után fentről fénysugár csap le Grogra, majd fényrobbanás (fx7-goldburst), és abból lesz az aranyököl.
- Bolt (ma09): a felszerelés alatt „👗 Új ruha: még N fejlesztés kell (x/12)” – a látható felszerelés nevéből azonosított hősre.
- Sötét futóhomok (na01 „egy kör meg egy rúd”): festett homokhullám (fx7-sandwave) gördül Morgána öklétől, festett homoktölcsér (fx7-sandpit) nyílik az ellenfelek alatt; a rajzolt sáv/ellipszis/spirál kivéve; a besüllyedt test előtt a festett tölcsér alsó része.

## 42. kör – tesztlap (ja05, ma05–ma10, na01, x02)
- Új ruha (ma09): fegyver ≥3 ÉS ruha ≥3 fejlesztés (`gearLook`, r21p); a bolt kiírja, melyikből hány kell még.
- Földrepesztés: lávakitörés ki (r21x). Földrengés: nagyobb kőhullám (Wd ≥520), Grogtól távolabb indul (nem „fejeli le”).
- Tündérököl: a nagy aranyrobbanás minden ellenfélen, a fénysugár helyén (nem a képernyő szélén).
- Árny-csapat: sötétebb kép, majdnem fekete árnyharcosok halvány lila peremmel, vörösen izzó szemek, egyszerre (130 ms eltolással) és gyorsabban csapnak le, nagyobb vágásív + sötét lángok.
- Tempó: `r21Faster(név, szorzó)` – a jelenet változatlan, a tween/wait idők rövidebbek: Tusátok (inkWave) ×0,62, Cerberus ×0,75.
- Futóhomok: guggolás áttűnéssel (`_crouch.a`), a hullám/tölcsér remegő méretezése ki.
- Hang: retró 8 bites CC0 hangeffektek (`r8_*` minták, minden SFX-név leképezve; csengő nincs) és chiptune zene minden helyen (TRACK_FILE). Források: hang/FORRASOK.md.

## 43. kör – új támadások (kevés volt az egyedi / mindenkire ható) (r21zc.js)
- Új festett képek (Canva): `fx7-cauldron` (boszorkányüst, lila főzettel – a zöld lilára színezve), `fx7-brewsplash` (lila főzet-csobbanás), `fx7-blackmoon` (fekete hold lila koronával), `fx7-treearm` (karmos fakar). Grog fejszéje a saját `wpn-axe` képe.
- Morgána – Üst-kitörés (`SK.cauldron`, 3-2, 1100 arany; mindenkire, méreg 60%/2 kör): az üst Morgána előtt a földből emelkedik, felforr, kitör, a festett főzet ívben minden ellenfélre zúdul és rajtuk szétfröccsen.
- Morgána – Holdfogyatkozás (`SK.eclipse`, 6-1, 3200; mindenkire, altatás 35%/1 kör): sötét ég, festett fekete hold kel az ellenfelek fölött, a korona lüktet, a hold kicsinyített másai rájuk zuhannak.
- Grog – Fejsze-hajítás (`SK.axethrow`, 2-3, 650; egy célpont, pow 2,4): a fejsze a rácson mért helyéről (.3/.17) pörögve repül, Grog közben fejsze nélküli képpel (`orcnoaxe-cast`, `r21NoAxe`), a fejsze visszatér a kezébe.
- Grog – Vállroham (`SK.shouldercharge`, 4-3, 1600; egy célpont, kábítás 40%/1 kör): kaparás, roham porfelhővel, vállütés, hátralökés.
- Jázmin – Bambuszfüggöny (`SK.bamboocurtain`, 8-2, 4400; mindenkire, védelemgyengítés 40%/1 kör): 5 hullám × 5 sor festett bambusznyíl (`fx7-bamboospear`) vízszintesen átfúr mindenkit.
- Jázmin – Teaörvény-nyíl (`SK.teavortex`, 8-3, 4600; mindenkire, forrázás 50%/2 kör): nyíl a csoport közepére → teafröccs-korona → 3 festett tea-hullám (`fx7-teawave`) körbe forog (hátsó fele a figurák mögött, drawEntity-burkoló), a sugár a hősökig nem ér el.
- Kaelen – Bambuszdöfés (`SK.bamboothrust`, 10-1, 5400; egy célpont, védelemgyengítés 50%/1 kör): `cast` póz, a lándzsa a nyitott tenyérből (rács: .85/.39) nő ki, előreugrás, átdöfés.
- Kaelen – Erdő haragja (`SK.forestwrath`, 11-3, 6800; mindenkire, pow 1,75): minden ellenfél fölé festett fakar hajol be fentről és lecsap.
- Minden új támadás sebzése kráter nélkül (`r21HitNS` → `S._r21noSink`). Próbafelvétel: `forras/eszkozok/hsk2.js` (teljes kép, 3 ellenfél).
- Tesztlap: oa01–oa08.
- Képregény XI–XII. fejezet: festett képsor Higgsfielddel (`nano_banana_2_1`, 2:3, a hősök és főellenségek figurája referenciaként), `tx-cm11_<0-2>`, `tx-cm12_<0-2>`, `R21_COMIC[10/11].img`. Így mind a 12 fejezet + prológus festett. (A `gpt_image_2_5` az ingyenes csomagban nem megy; a nano_banana képenként 1,5 kredit, egyszerre csak egy kérés fut.) Tesztlap: oa09–oa10.

## 44. kör – tesztlap (ja05, ma05, ma06, na01, x02) (r21zd.js + kisebb módosítások)
- Tusátok (ja05 „a fekete festéknyom darabos”): a tusszalag egybefüggő, illeszkedő négyszögekből álló, elvékonyodó és halványuló, enyhén elmosott ecsetnyom (`r21InkRibbon`, r21i).
- Földrepesztés (ma05 „Grogot nyársalja fel”): a tüskesor Grog teste előtt indul (r21x).
- Földrengés → **Kőhullám** (név), magasabb (×1,55) és szélesebb hullám (r21z, r21zd).
- Magmakitörés (ma05 „nagyobb sugár”): kb. kétszer akkora tócsa és repedés, szélesebb és magasabb lávaoszlop; a lávafoltok csak a kitörések körül maradnak, a hősökre nem (r21zd, a game.html-beli eredeti átvéve és felülírva).
- Árny-csapat (ma06 „nagyobb”): 1,7× nagyobb árnyharcosok, nagyobb ugrás, 1,5× nagyobb vágásív; kráter nélkül (r21m).
- Sötét futóhomok (na01 „gagyi, látványosabb, maradjon homoknyom”): nagyobb, lassabban gördülő festett hullám, több homok és por, a nyomában festett homokhát marad (fx7-sandwave lapított lenyomatai) (r21zb).
- Cerberus (x02 „túl lassú”): további ×0,74 tempó.
- Új próbaeszköz: `forras/eszkozok/pcap.js` (a `?proba=` link képsora).

## 45. kör – tesztlap (ja05, ma05, ma06, na01, oa01–oa08)
- Új festett képek (Canva): `fx7-blackmoon2` (vérvörös, karmos koronájú fekete hold), `fx7-windslash` (szélvágás).
- Közös: `r21PD` – festett képdarab-részecskék (forgó, gravitációs), `r21Filt` – festett kép egyszer előszínezve. A pötty-részecskék helyett ezek (A4).
- Tusátok (ja05): a sárkány utáni fekete tusszalag teljesen kikerült, csak a festett sárkány marad.
- Magmakitörés (ma05): a kőtüske-kép (groundCrack → fxImage 'rock') kikerült.
- Árny-csapat (ma06 „túl nagy, száguldjanak végig”): 1,3× méret; minden árnyharcos egy rohamban végigszáguld az összes ellenfélen, mindegyiknél festett vágásív; a záró vékony kör helyett sötét lángok.
- Futóhomok (na01 „darabos, mű”): a pixel-homokszemek helyett festett földrögök és porfelhő, sűrű és folytonos homoknyom, nagyobb tölcsér, mélyebb lehúzás, sötétebb ég.
- Fejsze-hajítás (oa01): nagyobb fejsze, festett lángcsóva (fx7-meteor), lassított elengedés, festett tűzrobbanás és lángcsíkok, a fejsze beleáll.
- Üst-kitörés (oa02): cseppek = a festett főzet kis darabjai, gőz = festett felhő lilára színezve.
- Vállroham (oa03): hátralépés, gyorsuló roham festett szélvágással és porfelhővel, becsapódáskor két keresztbe vágó festett szélív, nagy hátralökés.
- Holdfogyatkozás (oa04): szinte fekete ég, új vérvörös hold, a holdból festett sötét lángoszlopok minden ellenfélre, fölöttük viharkoponya, alattuk festett sötét lángok; funkció: 70% alvás 1 körre.
- Bambuszfüggöny (oa05): nagyobb festett bambusznyilak sortüzekben, ívvel; egy-egy beleáll és rezeg; festett levelek.
- Teaörvény-nyíl (oa06): a végén feldobja az ellenfeleket.
- Bambuszdöfés (oa07): egy folyamatos mozdulat (lágy felhúzás, sima kitörés, utánkép nélkül), festett levelek.
- Erdő haragja (oa08): a festett fakar Kaelen tenyeréből nő ki, magasra emeli, és a Rémült Vén Tölgyhöz hasonlóan villámgyorsan lecsap minden ellenfélre, majd visszahúzódik.

## 46. kör – tesztlap (ja05, ma05, ma06, na01, oa01, oa02, oa04–oa08)
- Új festett képek (Canva): `fx7-fullmoon` (telihold felhőkkel), `fx7-werewolf` (farkasember).
- Tusátok (ja05 2.): a tusszalag vissza (folytonos négyszög-szalag, elmosás nélkül); a tintatartó-takarás (evenodd clip, „kocka”) csak ki- és visszabújáskor él (`G.pc`).
- Földrepesztés új neve: **Tüskeroham** (r21zd).
- Árny-csapat (ma06 „nagyszabásúbb”): kétszer annyi árnyharcos (a második sor csak látvány), sötét láng-csóva rohanás közben, a végén hatalmas festett vágásív az összes ellenfélen át + viharkoponya.
- Futóhomok (na01 „darabos”): kevesebb részecske/lenyomat képkockánként (folyamatosabb telefonon).
- Fejsze-hajítás (oa01 „vonja be lávás”): a földből festett lávaoszlop (lavafx, lighter) tör fel a fejszéig, a fejsze izzó lávás lesz (narancsra színezett másolat), repülés közben lávacseppek (fx7-brewsplash narancsra színezve).
- Üst-kitörés (oa02 „az üst felborul”): Morgána belerúg, az üst felborul, a festett lila főzethullám (fx7-teawave lilára) végigömlik a talajon, az ellenfeleknél felcsap (fx7-brewsplash), festett lila tócsák maradnak.
- Holdfogyatkozás → **Telihold átka** (oa04 új koncepció): sötét felhők, a felhők közül előbukkan a telihold; egy véletlen társ sötét füstben farkasemberré (fx7-werewolf) válik, nagy ugrással rátámad a célpontra, háromszor karmol (fx7-darkslash ezüst-vörösre), visszaugrik, visszaváltozik. Egy célpont, pow 3,0, 60% védelemgyengítés.
- Bambuszfüggöny (oa05): a nyilak átfúródnak, nem állnak bele.
- Teaörvény-nyíl (oa06): 5 nagyobb, magasabb tea-hullám, festett tea-cseppek és gőz, toss 300.
- Bambuszdöfés (oa07 új): az ellenfél előtt ferdén vastag festett bambusz tör ki a földből, felnyársalja és hátralöki, kitart, majd visszahúzódik; az ellenfél (ha él) visszaesik.
- Erdő haragja (oa08 „darabos, lassú”): gyorsabb (kinövés+emelés egy mozdulatban 300 ms, lecsapás 120 ms), simább.

## 47. kör – hősönkénti farkasember (Telihold átka)
- Új festett képek (Canva): `fx7-werewolf_wizard` (Zordon: ezüstszürke bunda, szakáll, tépett kék talár, kék süveg), `fx7-werewolf_druid` (Kaelen: barna bunda, sörény, tépett mohazöld levélköpeny, indák).
- Telihold átka (r21zc): a farkasember képe az átváltozó társtól függ (`R17I['werewolf_'+ally.type]`); Lili, Grog és Jázmin változata még nincs (elfogyott a Canva-kredit, a Higgsfieldben 1 kredit maradt) – náluk a közös `fx7-werewolf` marad.
- Próbaeszköz: `forras/eszkozok/hskw.js <skill> <ellenfél> <társ-típus>` – a hsk2 másolata, ahol a véletlen társ helyett a megadott hős változik át.

## 48. kör – tesztlap (ma06, na01, oa01, oa02, oa04, oa05) (r21ze.js + r21m, r21zb)
- Jó: ja05 Tusátok („TÖKÉLETES”), ma05 Tüskeroham, oa06 Teaörvény-nyíl, oa07 Bambuszdöfés, oa08 Erdő haragja.
- Árny-csapat (ma06 „nem kellenek a lángok, a felhő se, csak a lila pengék”): a rohanás közbeni sötét lángcsóva, a vágásoknál és a végén a sötét lángok, valamint a viharkoponya kikerült (r21m). A tiltás örökre érvényes.
- Sötét futóhomok (na01 „az eleje nem tetszik, se a csík, se a hullám, főleg hogy a hősök mögött megy el”): a talajcsík (homokhát-lenyomatok) és a gördülő homokhullám helyett a homok a föld alatt fut; Morgána öklétől az ellenségekig egymás után festett homokgejzírek (fx7-foamgeyser homokszínre festve) törnek ki földröggel és porral, mind a hősök előtt (r21zb).
- Fejsze-hajítás (oa01 „magától legyen lávás, alakuljon forgó csillagszerű körré, és úgy csapjon le”, csatolt kép): nincs földből jövő lávaoszlop – a felemelt fejsze magától izzik át lávává (izzás, csöpögés, parázs); hajítás után pörögve négykarú lávacsillaggá alakul (festett tűzcsóvák karokként, közepén az izzó fejsze), a célpont fölé száll, felpörög, és lecsap; utána visszaalakul és visszarepül (r21ze).
- Üst-kitörés (oa02 „mű és erőltetett”): újragondolva valódi fizikával – lila füstben megjelenik az üst, súlyosan a földre huppan (por, rugózás), hevesen forr; Morgána nekilendül és belerúg (saját teste: hátra-előre); az üst gyorsulva eldől, az oldalára zuhan, visszapattan; a nyílásból vastag sugárban ömlik a főzet, ami folyadékként szétterül és végigfolyik a talajon (festett csobbanás-darabok csúsznak és lassulnak, nem csúszó hullám-kép); az ellenfeleknél felcsap, lila mérgező buborékok (fx7-froth lilára) és gőz; a tócsa elpárolog, az üst füstben eltűnik.
- Telihold átka (oa04 „nem mozog normálisan, darabos, élethűbb, látványosabb”): a farkasember teste rugalmasan, simítva mozog (lélegzés, összenyomódás/megnyúlás, dőlés követése, nincs hirtelen tükrözés); holdfény-izzás és hulló festett ezüstszikrák a társon; a holdfényben nő ki; vonyít a holdra (a hold felragyog); guggolás → hosszú ugrás → csúszó érkezés → két karmolás felhúzással → felugrós lecsapás nagy keresztbe vágással → hátraugrás szemben → visszaváltozás. Kevesebb füst (telefonon simább). Az átszínezett lángoszlop kikerült, mert villámnak hatott (A5).
- Bambuszfüggöny (oa05 „nincs funkciója, gagyi, élethűbb”): új funkció – FOGSÁG (60% kábulat 1 körre a korábbi 40% védelemgyengítés helyett). A sortüzek nyilai átfúrják az ellenfeleket és körülöttük a földbe fúródnak; belőlük festett bambuszszárak (fx7-bamboostake) nőnek levelekkel, sűrű függönyként rázárnak az ellenfelekre („FOGSÁGBAN!”), aztán visszahúzódnak.

## 49. kör – nagy tesztcsomag (végigjáték Cukorsivatagig, normál szint) (r21zf.js + game.html alap + r21x)
- Felület: időjárás- és kihívás-jelvény a csatatér ALJÁN, egymás mellett, átlátszatlanul, minden réteg fölött; a sárga sáv (`showBanner`) szélessége a szöveghez igazodik, szükség esetén kisebb betű.
- Barlangi béka – Nyelvcsapás: a nyelv a rácson mért szájzugból (`KP(u,.12,.33)`) indul, képkockánként követve.
- Limit: lassabban töltődik (kapott sebzés ×55 a ×110 helyett, akciónként +2, találatonként +1, védekezés +2, idézés +2).
- Átok: minden ellenségre hat, EGY nagy jelenet (Hádész, egy lánckör a csoport körül, egy koponya), a vékony gyűrű nélkül.
- Normál szint: `DIFF_ATK[1]=1.0`, `DIFF_HP[1]=1.1`. II. Csavar: ÉP ×0,75, támadás ×0,85.
- Többcsatás pálya: a csaták között nem támad fel magától a hős, csak a pálya végén.
- Kóbor szellem – Hideg érintés: festett jeges pára (fx7-teacloud jégkékre), festett jégbörtön (fx7-glacier), festett szilánkok.
- Égi áldás: MP-t is ad, és leveszi a negatív állapotokat.
- Bolt: a közös/páros támadások vásárlása eddig minden sima mentéskor elveszett (újra megvehető volt) – a `saveGame` burkoló megőrzi az `owned` listát; dupla koppintás elleni zár; a Négyek ereje csak 4 hősnél vehető. Felszerelés: `GEAR_MAX=3` (a 3/3 az új ruha, utána nincs több), ár 300/900/2000, +15%/fokozat.
- Bolt-elosztás (`SHOP_SKILLS` futáskor újraosztva): minden hős támadásai a csatlakozásától a 12-1-ig egyenletesen nyílnak, az ár a pálya simított bevételének ~42%-a. A később csatlakozó hős annyi támadást kap alapból (`HERO_DEF.skills`), amennyi a lista arányában addigra járna (Lili 1, Grog 2, Jázmin 6, Kaelen 7); ha valamelyiket már megvette, az árát visszakapja (`r21FreeFix`).
- Kristálygólem: a Tükörpajzs ugyanaz, mint az idézés (`crystal` állapot, fx-crystalmirror), az ellenfélen a hősök köréig kitart, és tényleg visszaver; a vékony hatszög-körvonal (`SPR_OVER.cgolem`) kikerült. Kristályököl: a saját ökle kristállyá nő (festett fx7-glacier), nagy becsapódás, festett szilánkok és kristálytüskék, repedés nélkül. Szilánkeső: festett szilánkok hullámokban, minden becsapódás sebez.
- Kőbőr: a kőpáncél kép tükrözve; kőbörtön: ha Grogot Kőbőrrel megütik, a kő a támadóra rakódik (szürke, kőpáncél rajta, kábulat 1 kör), Grogról lekerül.
- Obszidián lovag, Kísértetlovag: 1,3× nagyobb.
- Repedések: a főellenség dühfázisában nincs izzó repedés a testén (`r21RageDraw` üres), a krátert repedésvonal nélkül.
- Sötét alku → Cerberus csak az adott csatában és amíg Morgána él (halálkor és új csatánál `_cerb` és a limit nullázva).
- Folyamatos sebzés: a sok apró elemből álló támadások (Csillaghullás, Nyílzápor, Hóvihar, Virágvihar, Tövisvihar, Égiháború, Hegyomlás, az ellenfelek esői/viharai) a sebzés 60%-át 4 részletben adják becsapódás közben.
- Rozsda-átok: rozsdabarna aura és festett rozsdapelyhek, amíg a védelemgyengítés tart.
- Fekete lyuk: akit nem nyelhet el, annál „TÚL ERŐS – NEM NYELI EL” (nem „Eltűnt: immunis”).
- Nagy gyógyital: mindenkinek az ÉP 60%-a (`sk.pct`).
- Morcus: amíg a 2. és 3. fázis nem jött el, nem eshet 60%, illetve 30% alá, és nem halhat meg (lefelé kerekítve, különben a 3. fázis nem indul – ezt a kampányteszt fogta meg).
- Meteorököl: becsapódáskor nincs sziklatüske-kép és gyűrű. Titáncsapás: a festett kőtüskék csak az ellenfél előtti félkörben (`r13Quake`), a nagy sziklakép sincs.
- Jázmin limit-plakátja: a meditáló kép (`monk-meditate`).
- Átöltözés: ha egy hős fegyvere és ruhája 3/3, a következő pálya első csatája előtt látványosan átöltözik (fény, pörgés, festett csillagok, villanás, „ÚJ RUHA!”), hősönként egyszer (`localStorage r21dressed`).
- Üst-kitörés (3. koncepció): az üst megjelenik, lila gőz száll fel, felhőként az ellenfelek fölé úszik és rájuk ereszkedik; a nagy (nem fő) ellenfelek egy körre véletlen kis ellenféllé változnak (`poly` állapot, a rajz és az akció is: csak apró ütés), aztán visszaváltoznak; kis sötét sebzés.
- Ellenőrzés: all.js (94 hősképesség), foe.js (177 ellenfél-támadás), camp.js (mind a 48 pálya) – hiba nélkül. Új eszköz: `forras/eszkozok/acap.js` (adott ellenfelekkel, közvetlen kóddal indított animáció képsora).
- Tesztlap: pa01–pa30 (+ ma06, na01, oa01, oa02, oa04, oa05 frissítve; a jónak jelölt pontok törölve).

## 50. kör – tesztlap (végigjáték a Kerámia-folyosóig) (r21zg.js + r21m, r21zb)
- Körrend: 2 hős → 2 ellenfél → 2 hős → 2 ellenfél váltakozva (`runBattle` újraírva; a körvégi rész változatlan).
- Mézdarázs, Habverő-manó: körönként egyszer lép. Kristálygólem, Lekvárdzsinn 1,3× nagyobb; a Lekvárdzsinn minibossz (ÉP ×1,4).
- Lekvárhullám: utána egy véletlen hős festett lekvár-zselékockába (új Canva-kép: `fx7-jellycube`) ragad, 1 kör kimarad (`jelly` állapot).
- Célpont: egy ellenfél legfeljebb kétszer egymás után támadja ugyanazt a hőst (`aiTarget` burkoló) – Álomlepke.
- Ellenfél gyógyító/erősítő képessége a saját társára hat (Teafa-dryád eddig a hősöket gyógyította) – `useEnemySkill` burkoló.
- Átokhomok (Sötét futóhomok): minden festett homok fekete-lilára színezve (`R21QS_F`).
- Közös támadások: a megvett páros támadás 60%-os limitnél már használható; ha még nem, szürkén ott van a menüben, kiírva a hiányzó limitet; a Négyek ereje is látszik.
- Mézkirálynő – Zümmögővihar: a saját lila palástja (bábu-testrész, `LIMBS.queenbee.cape`) szétnyílik, a raj onnan tör elő.
- Kamilla 2. fázis: buborék helyett Álomfátyol (forgó, festett lila álomköd-gubó, a rémálmokból ködszalagok áramlanak bele; szétszakad, ha elestek).
- 8-4 után „A második rész vége” → 3. térkép; a végső köszönő stáblista és az Új játék+ a 12-4 után (`credits3`, Kaelen is a hősök között).
- 3. térkép: a négy hős mindig a négy klasszikus helyen áll (`r21Place`, Jázmin/Kaelen a kimaradó hős helyén) – eddig Jázmin és Kaelen egymáson állt.
- Kaelen csatlakozásakor képregény (`R21_COMIC.druid`, 3 kocka: festett bambusz-háttér + Kaelen festett figurái).
- Árny-csapat: csak a valódi árnyharcosok vágnak, mindegyik csak a saját célpontján, váltakozó irányban (rendezettebb).
- Levéltánc: minden ellenfélre hat (a fő célpont körüli örvény minden vágása a többieket is eltalálja).
- Kőőr – Kőfal: az ellenfél saját rétegében rajzolódik, követi a helyét és méretét.
- Bambuszkígyó: a Rátekeredés ugyanolyan gyakori, mint a farokcsapás. Mochi-király – Királyi hasraesés: a saját teste gömbbé gyúródik, golyóként végiggurul a hősökön, visszapattan.
- Ellenőrzés: all.js, foe.js, camp.js (mind a 48 pálya) – hiba nélkül. Tesztlap: qa01–qa19.
- Canva: a zselékocka után ismét elfogyott a kredit (Lili/Grog/Jázmin farkasember továbbra sincs).

## 51. kör – tesztlap a teljes végigjáték után (r21zh.js + game.html, r12b, r21i, r21q)
- „Felül homályos”: a vászon felbontása legfeljebb 2× volt (iPhone 3×) – most `Math.min(3,devicePixelRatio)`, így éles.
- Habverő-manó: a Habverő-pörgés négy külön becsapódása helyett egy nagy csapás (ez látszott „dupla támadásnak”).
- Kaelen teknősformája kisebb (175), és a hősök mögé rajzolódik.
- Csészeharcos Teafröccs: több festett csobbanás és festett cseppek egyetlen kép helyett.
- Közös támadások: a vásárlás és a menü a szimulációban működik (bolt → `owned` megmarad, a csatamenüben ott a gomb); a Négyek ereje csak 4 hőstől.
- Mézkirálynő: új Canva-kép (`fx7-queencape`: szétnyitott palást, belül lép, méhek) – a támadásnál és az idézésnél is ebbe a pózba tűnik át, a raj onnan jön.
- Fehér foltok ki: Gőzkád-szellem (a kar és a test közti tiszta fehér), Chasen, farkasember (`fixwh.py`).
- Bambusz-békakirály idézés: a király saját festett nyelve nyúlik (LIMBS.frogking a nyújtott vásznon), festett arany hanghullámok (fx7-windslash), funkció: leveri a pajzsokat/erősítéseket + 50% kábulat.
- Idézések sebzése ×0,6.
- Árny-csapat: Vállroham-mintára (hátralépés, gyorsuló roham sötét szélvágással, vállütés két keresztívvel, hátralökés).
- Lili (megbékítve): tükrözött hőskép (a hősök felé néz), új támadás Tündérfény, gyakrabban támad.
- Öreg Matcha-gólem: saját új Canva-kép (mohos kő-kerámia gólem matchás tállal) – eddig a titkos Triplapresszó képét kölcsönözte.
- Ősi Tölgy ökle a célponthoz méretezve (kisebb). Triplapresszó: a kávé a csőrből és a felső csövekből jön.
- Nem készült el (Canva-kredit): Chasen egységes stílusú újrafestése, Lili/Grog/Jázmin farkasembere.
- Chasen: új, egységes stílusú festett kép (Canva), fehér foltok nélkül, a hősök felé néz.
- Grog saját farkasembere (fx7-werewolf_orc, Canva). Lili és Jázmin változata még hiányzik (kredit).
- Lili és Jázmin saját farkasembere (fx7-werewolf_fairy: rókaszőr, tündérszárny, csápok, levélruha; fx7-werewolf_monk: gesztenyebarna bunda, konty aranytűkkel, türkiz köntös, tegez) – Higgsfield z_image, flood + fehérfolt- és árnyékkivétel. Mostantól minden társnak saját farkasa van a Telihold átkában.
- Tesztlap „🎮 Megnézem a játékban” javítva: 38 tesztpont `link` mezőjében a teljes cím állt (https://…?proba=…), a lap pedig még egyszer elé tette a játék címét, így a játék kettőzött, értelmetlen kódot kapott. FONTOS: a `tests/<id>.link` mezőbe CSAK a próbakód kerüljön (pl. `hero:witch:eclipse`, `foe:frog:tongue`, `summon:frogking`, `comic:6`), teljes cím soha.

## 52. kör – a kis ellenfelek egy csapással kiütötték a hősöket (r21zi.js)
- Mérés (szimuláció, Normál szint, a hősök várható szintjén): a kis ellenfelek egy ütése Lilinek/Zordonnak 50–70%, több pályán 90–118% volt; kritikussal (×1,5) egy csapás.
- Javítás: `calcDmg` burkoló – az ellenfél hősre mért ütése ×0,75, és egy ütés felső határa a hős max. életerejéhez mérve: sima 40% (mindenkire ható 30%), minibossz 55%/40%, főellenség (`d.boss`) 65%/50%. Utána: kis ellenfél max. 40%.
- Ellenőrzés: camp.js mind a 48 pálya győzelem, hiba nélkül. Tesztlap: sa01.
