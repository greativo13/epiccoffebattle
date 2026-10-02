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

## Tesztlista

Kipipálható lista megjegyzésekkel: https://claude.ai/artifact/YTZqxtyqwPfqbLjSTzRX6i
(Claude az `ArtifactData` eszközzel olvassa a `tests` gyűjteményt: `status` = ok / bad, `note` = a felhasználó megjegyzése, `reply` = Claude válasza.)

## Nyitott ügyek

- Állított telefon: a felhasználó kétszer „Nem jó”-t jelölt megjegyzés nélkül – képernyőképet kértem. (Javítva közben: ragadós csatatér csak nyitott ablak nélkül; a gombhely-megtartás csak csata közben, a térképen nem marad üres rész.)
- Hiányzik a repóból a `src/` mappa és a `MASODIK-RESZ.md` terv – ha a felhasználónál megvan, érdemes feltölteni.
- Ellenőrzés: a próbateremben mind az öt hős mind a 74 képessége hiba nélkül lefut (`perform` minden képességre).
