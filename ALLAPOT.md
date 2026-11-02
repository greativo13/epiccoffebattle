# Állapot – rövid összefoglaló (2026-11-02, 55–64. kör)

Ezt kell először elolvasni. A részletek a `MUNKANAPLO.md` végén vannak (55–62. kör).

## Hogyan dolgozunk
- Új kód: új rétegfájl a `forras/` mappában (`r21zl.js` … `r21zt.js`, betűrendben a legutolsó nyer) → `python3 forras/ins10.py` → `python3 kisebb.py`.
- Festett képek: `python3 forras/addimg.py név=fájl.webp`. Canva: `generate-image`, majd teljes méretben a „A Nagy Kávérablás csapatkép” terv (DAHW1ZtSXrE) 20. oldalán („ellenfel-munkaoldal”) keresztül exportálva. A 2. oldal a csapatkép, azt ne írd felül. A háttér kivágása: `forras/conv.js … flood`. Ellenfélképnél kell `WHITE_T[k]=999` és egy `DRAW[k]` bejegyzés is.
- Feltöltés: `claude/inspiring-brown-8mie76` + `main` (GitHub Pages).
- Tesztlap: https://claude.ai/artifact/6D1sUCKfqLohVoGNQdc8ek
  - Új pont: `tests/<id>`, `order` legalább 5500 (a lap csak ezeket mutatja).
  - Javítás után a `review/t-<id>` mezői: `status:''`, `sent:false`, `handled:false`, `note:''`, `reply:'mit csináltam'`.
  - A jóváhagyottak `handled:true`.
  - A „Támadások tesztlistája” régi lapot a felhasználó nem kéri.
- Tesztelés: Playwright a /tmp/sp-ben (képsorok), gépi végigjátszás: `camp2.js <fejezet>-`.

## Kész (a teljes hibalista 6 csomagja + a tesztlap-kör)
1. **UI (r21zl):**
   - Stabil gombsor; a PÁROS/KÖZÖS gomb csak akkor jelenik meg, ha használható.
   - Páros feltétel: a két limit együtt eléri a küszöböt (Könnyű 50 / Normál 75 / Nehéz 90%).
   - Közös támadás csak megvéve; „Mutasd” minden képességnél; Bestiárium mentésenként.
2. **Bolt/nehézség (r21zm):**
   - A képességek hősönként eltolva nyílnak, az áru kb. egy pálya bevétele.
   - Normál/Nehéz: −20% arany, +15% ellenfél-ÉP, okosabb ellenséges MI.
   - A felhasználó Normálon játszik.
3. **Harc (r21zn):**
   - Sebzés a becsapódáskor; páros ×1,5, limit ×1,35.
   - Lili: 92 ÉP és Virágvihar.
   - Telihold sorban; Alakváltás előre kiírva, medve 3 karmolás; Békakirály gong-szünet.
   - Pálcakoppintás, Óramű katona Felhúzott csapás.
4. **Bossok/idézések (r21zo):**
   - Chasen és az Öreg Matcha-gólem tükrözve, új képességekkel.
   - Idézőkő (bolti tárgy, idézésenként 1); Kísértetlovag füsthullám; Mézkirálynő tükrözve, méreg nélkül.
   - Zen-sárkány idézés: a régi, apró kavicsos maradt (a felhasználó kérése).
5. **Látványelemek (r21zp, r21zq):** sok animáció átírva; festett kamilla, fuvola, hangjegy.
6. **3. térkép (r21zs):**
   - 4 új festett ellenfél: Bambuszpanda-szerzetes, Kőoroszlán-őr, Kőlámpás-szellem, Habverő-pók.
   - A sima csaták minden indításkor keverednek.
- **Pontosítások (r21zr):** mesterfok-jelvény (3/3 MESTER), Lili szárnya, padlóra állított felállás (lebegés ellen), Jázmin plakátja, rugós Erdő haragja.
- **62. kör (r21zt):** a tesztlap 27 megjegyzéses hibája javítva.
- **63. kör (r21zu):** a következő 17 hiba javítva (béka nyelve, Lili szárnya, Kristálykitörés, kőbörtön, rúnaláncok, ellenséges kavicseső, jégkocka, bambuszfal, tűzcsillag-fejsze, Sárkánynyíl lángjai); 
- **64. kör (r21zv):** 8 hiba; új festett képek: fx7-rosestem, fx7-runechain, fx7-runecircle, fx7-firestar (rózsa nyaka, Árnyékszegező láncok+kör, tűzcsillag-fejsze); kőbörtön a festett fx7-clods darabjaiból (R21_CLODS). Ezek újra kint vannak a tesztlapon.

## Nyitva
- (Kész a 65. körben: Ceremónia-őr, r21zw.js, tesztpont zw01.)
- A felhasználó kipróbálja a tesztlapon a 64. kör javításait, utána a jelöléseit kell javítani.

## Fontos tiltások / kérések (a CLAUDE.md mellett)
- Ne legyen fehér háttérfolt.
- Kód által rajzolt / „nem a játék stílusa” elemek helyett festett kép kell (a felhasználó ezt sokszor jelzi): ha nincs megfelelő, Canvával generálni.
- Tűz ne legyen lila.
- Lili és a repülő ellenfelek lebeghetnek, más nem.
- Árnyékszegező: a lábánál lévő rúnakört kifejezetten kérte (kivétel a „nincs varázskör” szabály alól).
- Ne nyúlj ahhoz, amit nem kért (pl. Zen-sárkány idézés, Tündérököl ökle).
