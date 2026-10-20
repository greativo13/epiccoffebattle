# Új támadások, képregény XI–XII, Higgsfield — Distilled

> Dátum: 2026-10-20 15:30
> Részletes: 2026-10-20-1530-tamadasok-kepregeny-higgsfield.detailed.md
> Tömörítési szint: 2
> A teljes körönkénti napló: MUNKANAPLO.md (43–46. kör). A szabályok: CLAUDE.md.

## Döntések
- Új támadások (43. kör, `forras/r21zc.js`): Üst-kitörés, **Telihold átka** (volt Holdfogyatkozás), Fejsze-hajítás, Vállroham, Bambuszfüggöny, Teaörvény-nyíl, Bambuszdöfés, Erdő haragja.
- Telihold átka: egy célpont; telihold a felhők közül, **véletlen társ** farkasemberré válik (fx7-werewolf, egy közös kép), 3 karmolás.
- Üst-kitörés: Morgána belerúg, az üst **felborul**, lila főzethullám a földön.
- Földrepesztés új neve: **Tüskeroham**; Földrengés új neve: **Kőhullám**.
- Tusátok: a fekete tusszalag **kell** (folytonos szalag), a tintatartó-takarás csak ki-/visszabújáskor.
- Minden látvány festett kép (A4): pötty-részecske helyett `r21PD` (festett képdarab-részecske), színezés `r21Filt` (egyszer előszínezve).
- Képregény XI–XII: Higgsfield `nano_banana_2_1` (a `gpt_image_2_5` csak fizetős csomagban), 1,5 kredit/kép, egyszerre 1 kérés.

## Kulcs-eszközök / parancsok
- Építés: `python3 forras/ins10.py && python3 kisebb.py`; szerver: `python3 -m http.server 8765`.
- Hős-képesség 3 ellenféllel, teljes képpel: `N=16 INT=250 NODE_PATH=$(npm root -g) node forras/eszkozok/hsk2.js <skill-id> imp`.
- `?proba=` link képsora: `W0=1800 N=20 node forras/eszkozok/pcap.js <név> <proba> <kimenet>`.
- Festett kép: Canva generate → segédterv DAHW1ZtSXrE (17. négyzet, 18. fekvő, 19. álló oldal) update_fill → commit → export → `node forras/conv.js in out flood 700` → PIL crop → `python3 forras/addimg.py fx7-név=út`.
- Feltöltés: ág `claude/kind-albattani-t0pk1c` + `main` (`git push origin HEAD:main`).
- Tesztlap: artifact 6D1sUCKfqLohVoGNQdc8ek; `review/t-<id>` visszaállítás javítás után (status:'', sent:false, handled:false, note:'', photos:[]).

## Új festett képek
fx7-cauldron, brewsplash, blackmoon, blackmoon2, treearm, windslash, fullmoon, werewolf; tx-cm11_0-2, tx-cm12_0-2.

## Felhasználói visszajelzések (mintázatok)
- „Darabos a mozgás” = telefonon akadozik → kevesebb egyszerre rajzolt darab, sima easing, egy folyamatos mozdulat.
- „Haladjon át az ellenfeleken” = átfúrás, nem beleállás.
- Konkrét új koncepciót ír (farkasember, felboruló üst, földből kitörő bambusz) → azt kell pontosan megcsinálni.

## Folytatás
- A 46. kör 11 pontja (ja05, ma05, ma06, na01, oa01, oa02, oa04–oa08) visszaállítva, a felhasználó még nem próbálta ki.
- Canva- és Higgsfield-kredit gyakran elfogy; a farkasemberből hősönkénti változat nem készült.
