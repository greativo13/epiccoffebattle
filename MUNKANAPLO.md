# Munkanapló – A Nagy Kávérablás

Ezt a fájlt Claude vezeti, hogy egy új munkamenet ott folytathassa, ahol az előző abbahagyta.

## Fontos tudnivalók a kódról

- A játék egyetlen fájl: `game.html` (és ugyanaz `index.html` néven, ezt mutatja a GitHub Pages). A kettőt mindig együtt kell módosítani.
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

## Tesztlista

Kipipálható lista megjegyzésekkel: https://claude.ai/artifact/YTZqxtyqwPfqbLjSTzRX6i
(Claude az `ArtifactData` eszközzel olvassa a `tests` gyűjteményt: `status` = ok / bad, `note` = a felhasználó megjegyzése, `reply` = Claude válasza.)

## Nyitott ügyek

- **Ötfős plakát**: a Canva-kép kész (https://www.canva.com/M/MAHW1djYBZg, media id `MAHW1djYBZg`), de még fel kell tölteni a repó gyökerébe `csapat5.jpg` néven.
- **Canva-letöltés**: a `media.canva.com` tiltva volt a hálózati beállításban, ezért Claude nem tudta letölteni a Canva-képeket. Ha az új környezetben engedélyezve van, Claude maga is letöltheti őket (a `get-assets` eszköz thumbnail URL-je helyett teljes méretet kell kérni).
- Jázmin „eltűnése” a próbateremből: nem sikerült előidézni; valószínű ok, hogy a 💤-os csere a kiválasztott hős helyére történik (ha Jázmin a kiválasztott, ő megy pihenni). A felhasználó visszajelzésére vár.
- Jázmin többi képessége: a felhasználó szerint „nem jók”; a limit és a Százkezű már új. A többit a tesztlista megjegyzései alapján kell átdolgozni.
- A `canva-forras/` mappa csak a Canvának kellett forrásképnek; ha nem kell, törölhető.
- Hiányzik a repóból a `src/` mappa és a `MASODIK-RESZ.md` terv – ha a felhasználónál megvan, érdemes feltölteni.
