# Szabályok – Az Elveszett Ízek Nyomában

A felhasználó 246 tesztlap-megjegyzéséből kiszűrt, ismétlődő minták. Minden animációs vagy játékmenet-változtatás előtt és után ezeken kell végigmenni.

## A. Amit a felhasználó újra és újra kér

1. **„Gagyi" = kevés, kicsi, lapos.** Ez a leggyakoribb visszajelzés (~90 megjegyzés: gagyi, látványosabb, nagyobb, több).
   - Az első változat legyen bátran nagy, sok elemű és részletes. Ne óvatos, kicsi effekt legyen.
   - Üres „Nem jó" = ugyanez.
2. **A hatás a megfelelő testrészből jön** (száj, orr, kéz, fül, kiöntő, pálca).
   - A pontot a figura képén kell lemérni (rácsos kép, `grid2.js`), nem becsülni.
   - Például: „az orrából jön, nem a szájából", „a kezéből jöjjön", „a fülénél fogja a bögrét".
3. **A figura saját teste mozog**, nem egy mellé rajzolt külön darab.
   - Bábu-testrész (`LIMBS`, `limbOn`), egész testes lendület (`bodyWind/Strike/Settle`).
   - Természetes végtag (kar, farok, nyelv, ág) nyúlhat. Jó minta a Lekvárdzsinn keze.
   - Támadás közben a figura képe nem vált (`keepPose`), és semmi nem látszik kétszer.
4. **Valódi tárgyak, a világ stílusában.**
   - Gomba, szilánk, kanál, tüske, kocka, bárány, kanna: ne csillag vagy általános részecske legyen.
   - Ha a tárgy egy karakterhez tartozik, hasonlítson rá (a kanna a Szerviz mintájával, szem nélkül).
   - **MINDIG festett képekkel dolgozz** (a felhasználó kifejezett kérése): minden tárgy, felület, hullám, tölcsér, póz
     festett kép legyen (Canva `generate-image` → export → `forras/conv.js` flood → `fx7-*`). Kóddal rajzolt ellipszis,
     csík, rúd, kör, sokszög NEM elég („egy kör meg egy rúd, nem élethű”). Kód csak mozgatja, méretezi, vágja a festett képet,
     és szemcséket/port ad hozzá. Új póz is festett kép legyen (pl. guggoló Morgána), ne összenyomott figura.
5. **Ami nem kell, az teljesen tűnjön el** („nem kell" ~27 megjegyzés). Ezek visszatérő zavaró elemek:
   - vékony kör vagy gyűrű, pajzs-körvonal;
   - kard- vagy vágáscsík, ha nincs penge;
   - égi villám, ha nem villám elemű;
   - zöld nyálka vagy folt, varázskör a lábnál;
   - tűzoszlop, füstgolyó a fújás előtt;
   - földhalom, fehér háttérfoltok a képeken.
6. **Az elem és a szín logikus.**
   - A föld nem láva, a láva nem tűz.
   - A szívás és a zsugorítás semleges.
   - A méreg nem hat a gépekre és a mérgező lényekre.
   - Arany ellenfél → arany támadás.
   - Csak akkor hat valami „kevésbé", ha az logikus.
   - Fekete-lila láng = valódi lángnyelv, nem füst.
7. **A tempó olvasható legyen.**
   - Ne legyen se túl gyors (Hádész, levelek), se túl lassú (kockák).
   - A becsapódásnak legyen lendülete: felhúzás, gyorsulás, ütés, rázkódás, hang.
8. **Idézés és ellenséges támadás egyezzen.** „Az idézésnél már leírtam" = ugyanazt a látványt kell használni mindkét helyen (méhraj, láng, gőz).
9. **Minden támadásnak legyen funkciója és hangja.**
   - Erősítés vagy gyengítés 1 körig tart.
   - Csengő hang sehol.
   - Két képesség ne nézzen ki ugyanúgy, és ne tudja ugyanazt.
10. **Nevek és szövegek.**
    - A tesztlapon a játék pontos útvonala és neve szerepeljen, a játék sorrendjében.
    - A szövegek helyes magyarsággal készüljenek (például nincs „hatékonytalan").
    - A sztori legyen logikus (üst, mókus, tölgy gyökerei).
    - A plakát és a csapatkép az aktuális szereplőket mutassa.
11. **Telefonon működjön** (iPhone, kezdőképernyő).
    - Ne legyen üres sáv.
    - A térkép legyen olvasható.
    - A menü ne ugorjon vissza az elejére.

## B. Az én hibáim, amik visszatértek („továbbra is van", „nem is változtattál", „mégis látszik")

1. **A régi réteg megmaradt.** Az új kód mellett egy korábbi felülírás vagy burkoló még kirajzolta a régit (láva, kör, nyálka).
   - Javítás előtt keresd meg az adott animáció összes korábbi definícióját és burkolóját: `grep` a `src.txt`-ben és az `r1*.js` fájlokban.
   - A régi réteget töröld vagy kerüld meg.
2. **A megjegyzésnek csak egy részét csináltam meg.**
   - A megjegyzést tagold pontokra (például: „kevesebb lassúság" + „több kocka" + „ne váltson kép").
   - Mindegyiket külön ellenőrizd lassított képsoron (`vs.sh`, `ws.sh`, `hsk.js`, `sumv.sh`), mielőtt késznek jelölöd.
3. **Rossz helyre mért pont.** A forráspontot a rácsos figurán kell meghatározni, és képen ellenőrizni, hogy tényleg onnan indul-e.
4. **Kicsi első változat.** Ezt lásd az A1-ben: nagyobbat és többet.
5. **Ellenőrzés javítás után:** csak azt kell kipróbálni, amit a javítás érint (pl. az adott animáció képsora, az adott pálya vagy menü), és hogy nincs JS-hiba. A teljes játék ellenőrzése (`foe.js`, `sumall.js`, `all.js`, `shield.js`, `playall.js`) nem kell minden javításnál – csak nagy, sok mindent érintő változás után (pl. új térkép, közös függvény átírása), vagy ha a felhasználó kéri. Feltöltés: `claude/kind-knuth-hiqqiv` + `main`.
6. **Többet változtattam, mint amit kért** („csináld vissza, csak a csontokat kértem”).
   - Csak azt írd át, amit a megjegyzés megnevez. A jelenet többi része maradjon pontosan olyan, amilyen volt.
7. **Elfelejtettem egy korábbi tiltást** (Cerberusnál visszatettem a lángokat, pedig már kérte, hogy ne legyenek).
   - Mielőtt egy animációhoz nyúlsz, olvasd el az elem ÖSSZES korábbi megjegyzését a tesztlapon (`review` gyűjtemény, régi `t-*` kulcsok is) és a `MUNKANAPLO.md`-ben. A korábbi tiltások (nem kell X) örökre érvényesek.
8. **Különálló tárgy a test helyett** (lebegő aranyököl Grog keze helyett).
   - Ha a kérés „a kezére”, „a hátán”, „a szájából”: a tárgy a figura testrészéhez kötve mozog, akkora, mint egy kar/ököl, nem óriás kép a levegőben.

## C. Munkarend

- Ha nem egyértelmű, mit szeretne a felhasználó, kérdezz (AskUserQuestion), és adj ajánlott opciót.
- A felhasználó magyarul ír, a válasz is magyar legyen.
- Nagy csomagokban dolgozz: kevés a kredit.
- A tesztlapon csak a kipróbálandó pontok maradjanak, egyesével, a játék pontos neveivel.
- Részletek a kódról és a körökről: `MUNKANAPLO.md`.
