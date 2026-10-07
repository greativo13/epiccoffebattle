# Útmutató más AI-hoz (pl. ChatGPT) – Az Elveszett Ízek Nyomában

Ezt add oda az AI-nak először, a `CLAUDE.md` (szabályok) és a `MUNKANAPLO.md` (eddigi munka) mellé.

## Mi hol van

| Fájl / mappa | Mi ez |
|---|---|
| `game.html` (~22 MB) | **A teljes játék egy fájlban**, minden kép base64-ként beágyazva (`IMG_SRC`, `SND_SRC` – ezek a nagyon hosszú sorok). Ezt **ne** másold be egészben egy chatbe: túl nagy. |
| `index.html` + `kepek/` | A könnyített változat, ezt mutatja a GitHub Pages (greativo13.github.io). **Kézzel ne szerkeszd**, a `kisebb.py` készíti. |
| `forras/r10a.js … r19z.js` | **A javítások forráskódja körönként** (ez a lényeg!). Ezek kerülnek be sorrendben a `game.html`-be, az `/* ================= INDÍTÁS ================= */` sor elé. A későbbi fájl felülírja a korábbit (pl. `A.earthsplit` több helyen is van – mindig az utolsó számít). |
| `forras/ins10.py` | Beilleszti a `forras/r1*.js` fájlokat a `game.html`-be (a régi beillesztett részt kicseréli). |
| `forras/addimg.py` | Új kép beágyazása: `python3 forras/addimg.py fx7-nev=kep.webp` |
| `forras/conv.js` | Kép átalakítása webp-re, háttér eltüntetése (`flood` = fehér háttér ki, `blackalpha` = fekete háttér átlátszó). Node + playwright kell hozzá. |
| `kisebb.py` | `game.html` → `index.html` + `kepek/` |
| `forras/eszkozok/` | Teszt- és képrögzítő szkriptek (playwright): pl. `foe.js`, `sumall.js`, `all.js`, `shield.js` (a 4 kötelező ellenőrzés), `hsk.js`, `vsw.sh`, `sumv.sh`, `parena3.js` (képsorok). Helyi szerver kell: `python3 -m http.server 8765` a repó gyökerében. |
| `forras/kepforras/` | A Canvával generált festett effektképek eredetiben (png) és webp-ben. |
| `listak/` | **Listák**: `tesztlap_jelolesek.md/.json` (minden megjegyzésed és a válaszok), `tesztlap_kiprobalando.md/.json` (a most kipróbálandó pontok), `full.json` (a teljes, 307 pontos tesztlista), `gamedata.json` (hősök, képességek, ellenfelek, pályák adatai), `story.json` (történet). |
| `CLAUDE.md` | A felhasználó szabályai (látványos, valódi tárgyak, a megfelelő testrészből induljon a hatás, ami nem kell, az tűnjön el stb.) |
| `MUNKANAPLO.md` | Minden eddigi kör leírása |
| `KAMPANY.md` | A történet és a pályák terve |
| `Jatek_osszefoglalo.pdf` | Összefoglaló a játékról |

## Hogyan kell módosítani

1. Új javítást egy **új** fájlba írj: `forras/r19a.js` (betűrendben a `r19z.js` elé kerül, ami az utolsó).
   Egy támadás felülírása: `A.<anim neve>=async(u,ts,sk)=>{...}` – az anim nevét az `ESK` (ellenfél) vagy `SK` (hős) táblában találod.
2. `python3 forras/ins10.py` → `python3 kisebb.py`
3. Böngészőben kipróbálni: Főmenü → Teszt → kód: `KAVE` → térkép → Próbaterem.
4. Feltölteni a `main` ágra (ezt látja a telefon).

## ChatGPT-vel a gyakorlatban

- **Legjobb:** ChatGPT **Codex** (vagy más kódoló ügynök), ami közvetlenül a GitHub-repóból dolgozik – annak elég ez a fájl + `CLAUDE.md`.
- **Sima chatben:** csak a módosítandó részt másold be (pl. egy `forras/r18c.js`-ből a Tündérököl blokkját), és kérd, hogy új `forras/r19a.js`-be írja a felülírást. A `game.html`-t sose másold be egészben.
- A hasznos segédfüggvények (pl. `tween`, `part`, `glow`, `shake`, `flash`, `hit`, `fp`, `handPos`, `r17Draw`) a `game.html`-ben és a `forras` fájlokban vannak – ha az AI nem ismeri, keresse meg őket (`function tween` stb.).
