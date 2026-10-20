# Új támadások, képregény XI–XII, Higgsfield — Detailed

> Dátum: 2026-10-20 15:30
> Kivonat: 2026-10-20-1530-tamadasok-kepregeny-higgsfield.distilled.md

## Hibakeresés / javítási menet
- hsk.js: rossz ellenfélnév (`goblin`) → `imp`; hsk2.js: `process` a böngészőben nincs → SLOTS-ellenőrzés.
- Tusszalag: kerek szakaszvégek „gyöngyszerűek” → négyszögekből álló szalag; a blur drága telefonon → kivéve.
- Tusátok „kocka”: az evenodd clip a tintatartó fölött a sárkány darabját vágta → csak ki-/visszabújáskor (`G.pc`).
- Magmakitörés kőtüskéi: `groundCrack` felül van írva `fxImage('rock')`-kal → Magmakitörésből kivéve.
- Árny-csapat záró vékony kör: `soundBlast` → sötét lángokra cserélve (A5).
- Lávaoszlop (lavafx) fekete téglalapja → 'lighter' keverés.
- `r21Filt` üres vásznat cache-elt még be nem töltött képre → `!im.width` esetén nem cache-el.
- A Canva fekvő oldalra tett álló kép levágódott → új álló oldal (19.).
- Narancs láva a lila főzetből: hue-rotate(112deg) (150deg zöldet adott).

## Elvetett megoldások
- Holdfogyatkozás fekete holddal/lángoszlopokkal → a felhasználó telihold + farkasember koncepciót kért.
- Üst-kitörés ívben repülő főzettel → felboruló üst.
- Bambuszdöfés lándzsa a tenyérből → a földből kitörő vastag bambusz.
- Árny-csapat óriási harcosok → kisebbek, végigszáguldanak, a második sor csak látvány.
