# Az Elveszett Ízek Nyomában – teljes összefoglaló (átnézéshez)

> Ez a dokumentum egy másik AI-nak (pl. Gemini) készült, hogy átnézze a játékot: logikai hibák, egyensúly, történet, következetesség, fejlesztési lehetőségek. A számok a játék kódjából, automatikusan kinyerve kerültek ide (2026. október 23-i állapot).

## 0. Mit kérünk az átnézőtől

Kérlek, nézd át az alábbiakat, és listázd külön a **hibákat** (logikai, szöveg, magyar nyelvhelyesség, egyensúly) és a **fejlesztési javaslatokat** (ötletek, hiányzó játékelemek). Konkrétan:
1. **Történet és szövegek:** logikus-e a cselekmény fejezetről fejezetre; vannak-e ellentmondások, nyelvhelyességi hibák, furcsa magyar kifejezések.
2. **Hősök és képességek:** van-e két képesség, ami ugyanazt tudja vagy ugyanúgy néz ki (ez tilos); logikus-e az elem és a hatás (pl. a föld nem láva, a méreg nem hat a gépekre); van-e értelmetlen vagy haszontalan képesség; árak és nyitási sorrend.
3. **Ellenfelek:** logikusak-e a gyengeségek/ellenállások az ellenfél anyagához; ismétlődnek-e túlságosan a támadások; illik-e a főellenség a fejezethez.
4. **Egyensúly:** a 9. fejezetben leírt mérés alapján hol lehet túl nehéz / túl könnyű; a bolt árai, felszerelés, tapasztalat.
5. **Játékélmény:** mi hiányzik egy ilyen körökre osztott RPG-ből (pl. végjáték, gyűjtögetés, visszatérési ok); mi lehet unalmas vagy zavaró.
6. **Technikai kockázatok** a 10. fejezet alapján (egyfájlos játék, rétegzett felülírások, telefonos futás).

A tervező szabályai (ezeket a javaslatoknak is tiszteletben kell tartaniuk): minden látvány **festett kép** (nem kóddal rajzolt forma); a hatás a **megfelelő testrészből** indul (száj, kéz, kiöntő…); a figura **saját teste mozog**; valódi tárgyak a világ stílusában; ami nem kell, az teljesen tűnjön el; az erősítés/gyengítés **1 körig** tart; két képesség ne nézzen ki és ne működjön ugyanúgy; csengő hang sehol; telefonon (iPhone) is működjön.

## 1. Áttekintés

- **Műfaj:** körökre osztott, festett stílusú, mesés fantasy-RPG (Final Fantasy-szerű csatajelenetek), magyar nyelven, gyerek- és családbarát humorral.
- **Platform:** böngésző, főleg iPhone kezdőképernyőről (PWA); GitHub Pages: https://greativo13.github.io/epiccoffebattle/
- **Méret:** 3 rész, 12 fejezet, 48 fő pálya + 2 titkos pálya; 6 hős (csatában 4); 92 hős-képesség + 6 limit + 6 alaptámadás; 11 páros támadás; 23 idézés; 87 ellenféltípus 182 támadással; 9 tárgy.
- **Központi téma:** a kávé, a tea és az ízek. Az ellenfelek többsége étel/ital/konyhai tárgy ihletésű (pl. Espresszó-sárkány, Szamovár-gólem, Lekvárdzsinn, Mochi-király).

## 2. Történet

### Prológus
- **Narrátor:** Mesevölgy, hajnali hat óra. A Királyi Kávéházban szokatlan csend van.
- **Zordon:** Morgána. Miért üres a Kanna?
- **Morgána:** Nem üres. Egyszerűen… nincs. Se kávé, se Kanna. Csak egy cetli.
- **Morgána:** „Hat éve nem aludtam. Most rajtatok a sor. – M.” Valaki nagyon fáradt.
- **Zordon:** És Lili? Ő volt az éjjeliőr. Egy tündér nem hagyja csak úgy ott a posztját.
- **Morgána:** A széke felborítva. Aki egy egész Kannát elvisz, az nagyon fáradt lehet, Zordon.
- **Zordon:** Kávé nélkül a tűzgolyóim legfeljebb langyos golyók. Meg kell találnunk.
- **Morgána:** Nézd, kávébabok! Végig az ösvényen… és tündérpor is. Lili a tolvaj után eredt.
- **Zordon:** A Suttogó Erdőbe. Persze. Ahol a fák visszabeszélnek.
- **Morgána:** Ketten egy egész erdő ellen. Volt már rosszabb hétfőm.

### Fejezetek

| # | Fejezet | Helyszín | Kezdés | Befejezés |
|---|---|---|---|---|
| 1 | I. fejezet: Koffeinmegvonás | Suttogó Erdő | A Suttogó Erdő növényei ettek a kiszórt kávébabokból, és a koffeintől óriásira nőttek, hisztisek és nagyon-nagyon ébrenlévők lettek. Kövessétek a nyomot! | A Vén Tölgy végre elszundít, és elengedi a fogva tartott Lilit, a Kávéház tündér-őrét. A Suttogó Erdő újra csendes. A nyom a Romváros felé vezet… |
| 2 | II. fejezet: Az Álmos Királyság | Romváros | Kávé nélkül az egész királyság örök álomba zuhant, a lakói félig élőholtként botorkálnak. A trónt egy óramű-király foglalta el, aki szerint az alvás nem hatékony, és a Nagy Órát egy leláncolt orkkal húzatja. A boltban már új támadások várnak! | A Rozsdakirály rugói kiengednek, és a Nagy Óra végre megáll. A hősök leverik a láncot Grogról, az ork harcosról, akivel az órát húzatták. A romok között kávébabok nyoma vezet lefelé, a föld mélyébe, ahonnan pörkölt illat száll… |
| 3 | III. fejezet: Forró Lé | Kristály-barlangok | A föld mélyén Morcus egy sárkány tüzével pörköli a lopott kávébabokat. Az út kristálytermeken és egy olvadt folyón át vezet. A kristályok visszhangozzák a hősök minden gondolatát, ami Grog fejében nem tart sokáig. | Espresszó, a sárkány elégedetten elalszik a kávébab-kupacán. A pörkölő mögött egy lépcső vezet felfelé, egy toronyba, amelynek a teteje a felhők fölé nyúlik… |
| 4 | IV. fejezet: A Káosz Tornya | A Káosz Tornya | A torony teteje a felhők fölé nyúlik. Odafent Morcus az ellopott kávé utolsó adagját főzi: ha kiissza, Koffeinistenné válik – ő lesz az egyetlen, aki soha többé nem alszik, miközben az egész világ örök álomba merül, és senki sem szól bele, mit csinál. Odabent semmi sem úgy működik, ahogy kellene: a könyvtár fejjel lefelé áll, a tükrök pedig visszaütnek. | Morcus összeesik, és hat éve először… elalszik. Hat hónapig fel sem ébred. Az Örök Kanna visszakerül a Királyi Kávéházba, Mesevölgy felébred, Grog megkapja a sütijét, Morgána végre kialudja magát, Zordon a reggeli feketéjét. Lili pedig egy ébresztőórát kap a királynőtől. Ami, valljuk be, megalázó. |
| 5 | V. fejezet: Ködös Teateraszok | Ködös Teateraszok | Fél év telt el. Morcus hat hónap után felébredt, és a királynő ítélete szerint jóvátételként gyógyteát árul a Királyi Kávéház mellett – túl jót. A receptjét ellopták, és Mesevölgy most nem ébren van túl sokat, hanem alszik: a péknél megkelt, majd ráaludt a tészta. A nyom keletre vezet, a ködbe burkolt teateraszokhoz, ahonnan kamillaillat száll. | Öreg Oolong gőze eloszlik, és a sárkány ásítva összegömbölyödik a teraszok tetején. A ködből kibontakozik az út a völgybe, ahol minden ház fehér és kék, és ahol egy lélek sem jár az utcán: Porcelánváros. |
| 6 | VI. fejezet: Porcelánváros | Porcelánváros | Porcelánvárosban minden fehér és kék: a házak, a hidak, még a galambok is. A lakók az utcán, a boltban, a hídon állva alszanak. Csak a porcelán nem alszik – a város teáskészletei maguktól terítenek, és nagyon nem szeretik, ha valaki hangosan lép. | Az Ezerrészes Szerviz darabjai csörömpölve szétgurulnak, és a város lassan mocorogni kezd. A kapun túl nem út vezet tovább, hanem fehér, csillogó dűnék: a Cukorsivatag, amin át Kamilla karavánjai a mézet hordják a teájához. |
| 7 | VII. fejezet: Cukorsivatag | Cukorsivatag | A dűnék itt nem homokból vannak, hanem kristálycukorból, és délben megolvad a tetejük. A sivatag közepén egy kaptár áll, akkora, mint egy vár: a méhei a cukordűnék közt nyíló sivatagi virágokból gyűjtik a mézet, amit a Teacsászárnő karavánjai éjjel-nappal hordanak az altató teájához. | A Mézkirálynő raja szétszéled, a kaptárból lassan csorog a méz. A sivatag szélén, ahol a cukor felhővé válik, lépcső indul az ég felé – párnákból rakva. Odafent, a hold alatt, egy palota alszik. |
| 8 | VIII. fejezet: Az Álompalota | Az Álompalota | A felhők fölött örök éjszaka van, és akkora a csend, hogy hallani a saját pislogásodat. Az Álompalotában Kamilla, a Teacsászárnő épp az utolsó kanna teát főzi: ha kész, a gőze belepi az eget, és soha többé senki nem ébred fel. Itt minden puha, minden lassú – és minden el akar altatni. | Kamilla leteszi a csészéjét, és hosszú idő óta először… nevet. Hangosan. A palotában sorra ébrednek az alvók, köztük Jázmin mestere, aki rögtön megjegyzi, hogy hideg a teája. Mesevölgyben a pék végre kiveszi a kenyeret. Morcus és Kamilla közös teaházat nyit, ahol reggel kávét, este kamillát mérnek. Zordon azt mondja, ez a világ legjobb találmánya. VÉGE. |
| 9 | IX. fejezet: Habos Bambuszosok | Habos Bambuszosok | Fél év telt el. Morcus és Kamilla teaháza a legnépszerűbb hely Mesevölgyben – egészen egy reggelig, amikor a kávé, a tea, még Grog sütije is ízetlen. A pult alatt egy bambusz habverő és egy cetli: „Lassan. Figyelmesen. Ízlelve. – Ch.” Lili előrerepült a matcha-völgybe, hogy beszéljen vele. Nem tért vissza. | A Mochi-király szétfolyik, és a bambuszerdő újra susog. Kaelen szerint Chasen a hegy fölötti Kőmozaik Szentélyben meditál – és Lili ott ült mellette, mosolyogva, csendben. |
| 10 | X. fejezet: A Kőmozaik Szentély | Kőmozaik Szentély | A hegy fölött zen-kertek húzódnak, ahol a kavicsok maguktól mozognak, és minden lépésnek súlya van. A túl sok varázslat felriasztja a mozaiksárkányokat – itt figyelmesen kell harcolni. | A Zen-Kavics Sárkány kövei szétgurulnak, és a kert újra csendes. A sziklafalban egy barlang nyílik: a Bambuszhabverők Barlangja, ahonnan matcha-gőz száll. |
| 11 | XI. fejezet: Bambuszhabverők Barlangja | Bambuszhabverők Barlangja | A barlangban kerámiacsészék sorakoznak, és gőzölgő matcha-kádak bugyognak. Valaki itt veri a habot az egész völgynek – ezer és ezer habverővel. A barlang végén gong szól. | A Bambusz-békakirály gongja elhallgat, és a kádak gőze eloszlik. A barlang kijárata felett felhőkbe vesző lépcső: a Matcha Ceremónia-palota. |
| 12 | XII. fejezet: A Matcha Ceremónia-palota | Matcha Ceremónia-palota | A felhők fölött áll a palota, kupolája mint egy hatalmas matcha-csésze. Itt készül a völgy utolsó, legtökéletesebb teája – az, amelyik végleg elveszi a világ ízeit, amíg meg nem tanulja becsülni őket. | Chasen leteszi a habverőt, és hosszú idő óta először belekóstol a saját teájába. Az íze visszatér – és vele minden íz Mesevölgyben. A teaház új pultot kap: reggel kávé, délben matcha, este kamilla. Kaelen a csapattal marad, Grog sütije pedig újra sütiízű. |

A történet három része: **I. rész** (1–4. fejezet, a Nagy Kávérablás, főellenség Morcus, a Káosz Főmágusa), **II. rész** (5–8. fejezet, teaföld, főellenség Kamilla, a Teacsászárnő), **III. rész** (9–12. fejezet, Matcha-föld, főellenség Chasen, a Békemester, aki „megbékíti” Lilit).

### Csatlakozó hősök
- **Lili:** Lili, a Királyi Kávéház tündér-őre kiszabadult a Vén Tölgy fogságából, és veletek tart. Gyógyít, a fénye pedig az élőholtak és a szellemek ellen aranyat ér. A boltban mostantól az ő képességei is megvehetők.
- **Grog:** Grog, az ork harcos, akit a Rozsdakirály a Nagy Óra felhúzására láncolt le, kiszabadult, és nagyon szeretne visszaütni. Rengeteg életereje van, nagyot üt, és a Provokációval magára vonja az ellenség támadásait. Mostantól négyen vagytok: ha mindenkinek megtelik a limitje, jöhet a KÖZÖS TÁMADÁS!
- **Jázmin:** Jázmin, a Ködkolostor teamestere veletek tart. Aranynyilakkal lő, közelről Buddha-tenyérrel üt, a teái pedig gyógyítanak, MP-t töltenek, és felébresztik az elaltatott társakat – a Teacsászárnő ellen ez aranyat ér. Mostantól öten vagytok, de csatába négyen mentek: a térkép „Csapat” gombjával választhatod ki, ki pihen.
- **Kaelen:** Kaelen, a bambuszerdő druidája veletek tart: Chasen az ő erdejét is elnémította. Bambuszbottal üt, mohapárnával gyógyít, élő kéreggel véd, és ha kell, vadállattá változik. A térkép „Csapat” gombjával választhatod ki, ki pihen.

## 3. Pályák

Minden pályán 1–4 csata van egymás után; **a csaták között nem gyógyul a csapat**, csak a pálya végén. A 4. pálya mindig a fejezet főellensége. Az „ajánlott szint” az ellenfelek szintje.

### I. fejezet: Koffeinmegvonás – Suttogó Erdő

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 1-1 | Mohás Tisztás | 1 | Zöld nyálka, Zöld nyálka · Zöld nyálka, Harapós rózsa · Mohacsiga, Szentjánosbogár-raj | A kiszórt kávébabokból a nyálkák is ettek, és most nagyon ugrálósak. Sérülten kettéválnak, a tűz és a jég gyorsabban végez velük. |
| 1-2 | Gombás Barlang | 3 | Gombaember, Mérgező pöfeteg · Barlangi béka, Gombaember · Mérgező pöfeteg, Gombaember, Mérgező pöfeteg | A gombák spórája elaltat, de egy jó ütés felébreszti a hőst. A pöfetegek legyőzéskor kipukkadnak, és mindenkit megmérgeznek. A béka lop! |
| 1-3 | Az Óriás Fa Törzse | 5 | Kéregbogár, Harapós rózsa · Kéregbogár, Gombaember, Harapós rózsa · Gombaember, Gomba-Király, Gombaember | A fa belsejét a Gomba-Király foglalta el. A kéregbogarak páncélját a Rozsda-átok és a tűz töri. A királyt előbb meg kell fosztani az alattvalóitól! |
| 1-4 | A Rémült Vén Tölgy | 7 | Makkocska, Rémült Vén Tölgy, Makkocska | A Vén Tölgy ivott a lopott kávéból, és mindentől retteg. Három fázisa van: gyökérbörtön, gyógyító makkocskák, a végén pedig kétszer támad, de a kérge meggyengül. A tüzet nagyon nem szereti. |

### II. fejezet: Az Álmos Királyság – Romváros

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 2-1 | Omladozó Kapu | 9 | Csontváz őr, Zombi pék · Csontváz őr, Csontváz őr, Zombi pék · Zombi pék, Csontváz őr, Zombi pék | A csontvázak két kör múlva újra összeállnak, hacsak nem fénnyel végzel velük. Lili Fénysugara itt aranyat ér. A zombi pékek a tüzet sem bírják. |
| 2-2 | Csendes Piactér | 11 | Kóbor szellem, Zombi pék · Kóbor szellem, Kóbor szellem, Csontváz őr · Zombi pék, Kóbor szellem, Zombi pék | A szellemeket a fegyver nem fogja, és a legtöbb támadás elől kitérnek. A fény viszont mindig eltalálja őket, és nagyon fáj nekik. |
| 2-3 | Óramű Katedrális | 13 | Óramű katona, Csontváz őr · Rozsdás ágyú, Óramű katona · Óramű katona, Kóbor szellem, Óramű katona · Rozsdás ágyú, Kísértetlovag | Az óramű katonák felhúzzák magukat, és a következő körben óriásit ütnek: olyankor védekezz! Az ágyú minden második körben mindenkire lő. A gépek a villámot nem bírják. |
| 2-4 | A Rozsdakirály | 15 | Óramű katona, II. Csavar, Óramű katona | II. Csavart három páncéllemez védi: amíg megvannak, alig sebződik. Zordon Villámcsapása töri le őket. Minden harmadik körében megkongatja a Nagy Órát, és a leglassabb hős kimarad egy körből. |

### III. fejezet: Forró Lé – Kristály-barlangok

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 3-1 | Kristálytükrök Csarnoka | 17 | Kristálygólem, Jégelementál · Jégelementál, Kristálygólem, Jégelementál · Kristálygólem, Kristálygólem | A kristálygólem minden páratlan körben visszaveri a varázslatokat: olyankor fénylik körülötte a tükörpajzs. Fegyverrel viszont könnyen törik. A jégelementálra a tűz a legjobb. |
| 3-2 | Visszhang-mélység | 19 | Villámdenevér, Villámdenevér · Villámdenevér, Jégelementál, Villámdenevér · Sárkányfióka, Villámdenevér, Kristálygólem | A villámdenevérek sikolya elkábíthatja az egész csapatot, és gyakran kitérnek. A területre ható támadás biztosan eltalálja őket. Megjelennek az első sárkányfiókák is. |
| 3-3 | Olvadt Folyó | 21 | Láva-szalamandra, Sárkányfióka · Láva-szalamandra, Láva-szalamandra, Sárkányfióka · Sárkányfióka, Obszidián lovag | A szalamandrákra a tűz nem hat, és megégetik azt, aki közelről üti őket. Jéggel és távolról érdemes támadni. Az obszidián lovagot a jég és a villám repeszti meg. |
| 3-4 | A Pörkölő Sárkány | 23 | Sárkányfióka, Espresszó, Sárkányfióka | Espresszó két forma között vált: Láva-formában a jég fáj neki, Hamu-formában a tűz és a fény. Ha mély levegőt vesz, a következő körben mindenkit megperzsel: olyankor védekezz! |

### IV. fejezet: A Káosz Tornya – A Káosz Tornya

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 4-1 | Fordított Könyvtár | 25 | Káoszkocka, Álmatlan szem · Káoszkocka, Káoszkocka, Álmatlan szem · Álmatlan szem, Káoszkocka, Álmatlan szem | A káoszkocka gyengesége körönként változik: mindig a színe mutatja, mi sebzi (piros: tűz, kék: jég, sárga: villám, fehér: fény, lila: sötétség). Az álmatlan szem leveszi az erősítéseidet. |
| 4-2 | Tükörterem | 27 | Árny-Grog, Árny-Lili · Árny-Zordon, Árny-Morgána · Árny-Zordon, Árny-Grog, Árny-Lili | A tükrökből a csapat sötét másai lépnek ki, és ugyanazt tudják, amit ti. A fény fáj nekik, a sötétség alig. Árny-Lili gyógyít: őt érdemes először legyőzni. |
| 4-3 | Az Ébrenlét Lépcsője | 28 | Démonfióka, Sötét mágus, Démonfióka · Árnyfenevad, Koffein-gólem · Sötét mágus, Árnyfenevad, Démonfióka · Démonkirály | Négy csata egyhuzamban, közben nem gyógyul a csapat: oszd be az MP-t és a tárgyakat! A Koffein-gólem három körig kétszer lép, aztán egy kört pihen. A lépcső tetején a Démonkirály őrzi a kaput. |
| 4-4 | Morcus, a Káosz Főmágusa | 30 | Morcus | Három fázis. Először körönként más elemi pajzs védi: a tűzpajzsot jég, a jégpajzsot tűz, az árnypajzsot fény, a villámpajzsot fegyver töri át. Aztán megidézi az árnyaitokat, és amíg élnek, sebezhetetlen. Végül üsd ki a kezéből a Kannát! |

### V. fejezet: Ködös Teateraszok – Ködös Teateraszok

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 5-1 | Harmatos Terasz | 32 | Tealevél-manó, Tealevél-manó · Tealevél-manó, Gőzlidérc, Tealevél-manó · Bambuszőr, Gőzlidérc | Új vidék, új ellenfelek. A Gőzlidérc a fegyver elől gyakran kitér, de a jég mindig eltalálja. A Bambuszőr szálkás: aki közelről üti, megsebzi magát. |
| 5-2 | Bambuszliget | 34 | Bambuszőr, Tealevél-manó, Bambuszőr · Tealopó majom, Kannateknős · Tealopó majom, Bambuszőr, Gőzlidérc | A Tealopó majom kétszer lép és tárgyat lop (legyőzve visszaadja). A Kannateknős páncélja kemény: villámmal vagy Rozsda-átokkal érdemes kezdeni. |
| 5-3 | A Néma Teaház | 36 | Kannateknős, Tealevél-manó, Gőzlidérc · Tealopó majom, Tealopó majom, Bambuszőr · Szamovár-gólem, Tealevél-manó | A Szamovár-gólem minden harmadik körében kifut, és az egész csapatot leforrázza. Amikor „FORR!” felirat jelenik meg rajta, jéggel vagy vízzel lehűthető: olyankor elkábul, és többet sebződik. |
| 5-4 | Öreg Oolong, a gőzsárkány | 38 | Gőzlidérc, Öreg Oolong, Gőzlidérc | Öreg Oolongot két körig Gőzfátyol védi: ilyenkor alig sebződik. A jég és a víz azonnal lecsapja a fátylat, és olyankor többet is sebez. Utána két körig védtelen – akkor üsd mindennel! |

### VI. fejezet: Porcelánváros – Porcelánváros

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 6-1 | A Kék Kapu | 40 | Porcelánbaba, Csészekatona · Csészekatona, Cukorfogó rák, Csészekatona · Porcelánbaba, Porcelánbaba, Cukorfogó rák | A Porcelánbaba törékeny: a fegyver és Grog földtámadásai nagyon fájnak neki. A Cukorfogó rák csípése lerontja a védelmedet. |
| 6-2 | Lampionok Utcája | 42 | Lampionlidérc, Csészekatona, Lampionlidérc · Vázagólem, Lampionlidérc · Vázagólem, Porcelánbaba, Cukorfogó rák | A Lampionlidérc lebeg és kitér, de a víz mindig eltalálja. A Vázagólem páncélja kemény, de a fegyver megrepeszti. |
| 6-3 | Az Égetőkemence | 44 | Cukorfogó rák, Lampionlidérc, Porcelánbaba · Vázagólem, Vázagólem · Porcelán mandarin, Porcelánbaba, Porcelánbaba | A Porcelán mandarin tükörmáza minden páratlan körben visszaveri a varázslatot (ilyenkor fénylik). Olyankor fegyverrel üsd – törékeny! |
| 6-4 | Az Ezerrészes Szerviz | 46 | Csészekatona, Az Ezerrészes Szerviz | A Szerviz csészekatonákat terít maga elé, és minden élő csésze után a kör végén visszatölti az életerejét. Előbb a csészéket törd össze, csak utána a kannát! |

### VII. fejezet: Cukorsivatag – Cukorsivatag

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 7-1 | Kristálycukor-dűnék | 48 | Kockacukor-gólem, Mézdarázs · Mézeskalács-bandita, Mézdarázs, Mézdarázs · Kockacukor-gólem, Vattacukor-bárány, Mézeskalács-bandita | A Kockacukor-gólem kemény, de a víz feloldja. A Mézdarázs kétszer lép és mérgez. A Vattacukor-bárány elaltat: Jázmin Ébresztő teája felébreszti a csapatot. |
| 7-2 | A Méhsejt-kanyon | 50 | Mézdarázs, Mézdarázs, Karamellskorpió · Karamellskorpió, Kockacukor-gólem · Mézdarázs, Karamellskorpió, Vattacukor-bárány, Mézdarázs | A Karamellskorpió forró: megéget, a tűz alig sebzi, a jég viszont megdermeszti. |
| 7-3 | Karamellfolyó | 52 | Mézeskalács-bandita, Vattacukor-bárány, Mézeskalács-bandita · Karamellskorpió, Karamellskorpió, Mézdarázs · Lekvárdzsinn, Mézeskalács-bandita | A Lekvárdzsinn minden harmadik körében kíván egyet, és erősebb lesz. Morgána Átka visszafogja a támadását. |
| 7-4 | A Mézkirálynő | 54 | Mézdarázs, Mézkirálynő, Mézdarázs | A Mézkirálynő darazsakat hív, és amíg él darázs, Királyi zselével gyógyítja magát – előbb a rajt intézd el! A tűz megolvasztja a mézét. Fél életerő alatt kétszer lép. |

### VIII. fejezet: Az Álompalota – Az Álompalota

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 8-1 | Párnalépcső | 56 | Párnalovag, Álomlepke · Homokmanó, Álomlepke, Homokmanó · Párnalovag, Homokmanó, Álomlepke | Itt szinte minden ellenfél altat. Jázmin Ébresztő teája felébreszti a csapatot, és egy időre védetté teszi az altatás ellen. A Párnalovagot a fegyver alig sebzi, a tűz annál inkább. |
| 8-2 | A Szuszogók Terme | 57 | Rémálom-árny, Álomlepke · Mackóőr, Homokmanó · Rémálom-árny, Mackóőr, Álomlepke | A Rémálom-árny életet szív: a fény szétoszlatja. A Mackóőr ölelése elkábít. |
| 8-3 | Holdfénykert | 58 | Álomlepke, Párnalovag, Homokmanó · Mackóőr, Rémálom-árny, Rémálom-árny · Altató hárfa, Álomlepke, Álomlepke | Az Altató hárfa dala az egész csapatot elaltathatja. A villám elpattintja a húrjait. |
| 8-4 | Kamilla, a Teacsászárnő | 60 | Kamilla | Három fázis. Először minden kör végén elaltat valakit: tartsd fent Jázmin Ébresztő teáját! Aztán rémálmokat hív, és amíg élnek, Álomfátyol védi. Végül az Örök Álomra készül: amikor erőt gyűjt, szakítsd meg kábítással vagy fagyasztással, vagy védekezz mindenkivel! |

### IX. fejezet: Habos Bambuszosok – Habos Bambuszosok

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 9-1 | Matcha-patak | 60 | Habverő-manó, Habverő-manó · Habverő-manó, Mochi-nyálka · Mochi-nyálka, Habverő-manó, Mochi-nyálka | Új vidék: a Habverő-manók habot vernek rátok. A habos hősnek a fegyver kevésbé fáj, a tűz és a villám viszont jobban – és le is égeti a habot. |
| 9-2 | Suttogó Bambuszos | 61 | Bambuszkígyó, Habverő-manó · Teafa-dryád, Bambuszkígyó · Bambuszkígyó, Teafa-dryád, Habverő-manó | A Teafa-dryád gyógyítja a társait: őt érdemes először legyőzni. A Bambuszkígyó rátekeredik és elkábít. |
| 9-3 | Mochi-tisztás | 62 | Mochi-nyálka, Mochi-nyálka, Teafa-dryád · Habverő-manó, Mochi-nyálka, Bambuszkígyó · Teafa-dryád, Mochi-nyálka, Mochi-nyálka | A Mochi-nyálkákba beleragad a fegyver: tűzzel és fénnyel könnyebb. A dryádot üsd először. |
| 9-4 | A Mochi-király | 63 | Mochi-nyálka, Mochi-király, Mochi-nyálka | A Mochi-király félig elfogyva kettéválik: két Mochi-nyálka ugrik ki belőle. Tűz és fény fáj neki, a fegyver beleragad. |

### X. fejezet: A Kőmozaik Szentély – Kőmozaik Szentély

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 10-1 | Gereblyézett Kert | 64 | Kőőr, Szerzetes-varjú · Mozaik-szellem, Kőőr · Szerzetes-varjú, Kőőr, Mozaik-szellem | A Kőőrön alig fog a fegyver – villámmal és földdel törd szét. A Mozaik-szellem a fény elől nem tud kitérni. |
| 10-2 | Mozaikfolyosó | 65 | Mozaik-szellem, Mozaik-szellem, Szerzetes-varjú · Kőőr, Mozaik-szellem, Szerzetes-varjú · Szerzetes-varjú, Szerzetes-varjú, Kőőr | A Szerzetes-varjak meditálnak: ilyenkor alig sebződnek, de a villám átüti a nyugalmukat. |
| 10-3 | Meditációs Csarnok | 66 | Szerzetes-varjú, Mozaik-szellem, Szerzetes-varjú · Kőőr, Kőőr, Mozaik-szellem · Mozaik-szellem, Szerzetes-varjú, Kőőr, Szerzetes-varjú | Négy csata pihenő nélkül. Tartogasd a gyógyítást. |
| 10-4 | A Zen-Kavics Sárkány | 67 | Kőőr, Zen-Kavics Sárkány, Kőőr | A sárkány meditál: ilyenkor alig sebződik, de a villám átüti. Jég és természet a gyengéje. |

### XI. fejezet: Bambuszhabverők Barlangja – Bambuszhabverők Barlangja

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 11-1 | Kerámia-folyosó | 68 | Matcha-gólem, Csészeharcos · Csészeharcos, Csészeharcos, Habverő-manó · Matcha-gólem, Habverő-manó, Csészeharcos | A Matcha-gólem kerámiatestét a villám szétrepeszti. A Csészeharcost a fegyver töri. |
| 11-2 | Matcha-kádak | 69 | Gőzkád-szellem, Matcha-gólem · Gőzkád-szellem, Gőzkád-szellem, Csészeharcos · Matcha-gólem, Gőzkád-szellem, Habverő-manó | A Gőzkád-szellem elől a fegyver gyakran kitér, de a jég mindig eltalálja. |
| 11-3 | Gongterem | 70 | Csészeharcos, Matcha-gólem, Gőzkád-szellem · Teaszertartás-mester, Csészeharcos · Matcha-gólem, Teaszertartás-mester, Gőzkád-szellem · Teaszertartás-mester, Matcha-gólem, Csészeharcos | Négy csata pihenő nélkül. A Teaszertartás-mester habot ver a csapatra és MP-t kortyint. |
| 11-4 | A Bambusz-békakirály | 71 | Csészeharcos, Bambusz-békakirály, Gőzkád-szellem | A Békakirály gongütése után egy körig csak alaptámadás lehetséges. Tűz és villám fáj neki. |

### XII. fejezet: A Matcha Ceremónia-palota – Matcha Ceremónia-palota

| Pálya | Név | Ajánlott szint | Csaták (ellenfelek) | Leírás |
|---|---|---|---|---|
| 12-1 | Teaszertartás-udvar | 72 | Teaszertartás-mester, Habverő-manó, Csészeharcos · Teaszertartás-mester, Matcha-gólem · Habverő-manó, Teaszertartás-mester, Gőzkád-szellem | Itt minden ellenfél habosít. Tűz és villám leégeti a habot. |
| 12-2 | A Csend Folyosója | 73 | Szerzetes-varjú, Mozaik-szellem, Teaszertartás-mester · Matcha-gólem, Gőzkád-szellem, Csészeharcos · Teaszertartás-mester, Kőőr, Habverő-manó | Minden eddigi ellenfél egyszerre. Erőforrás-beosztás! |
| 12-3 | Lili szobája | 74 | Lili (megbékítve) | Lilit Chasen megbékítette, ezért ellenetek gyógyít és altat. Nem lehet megölni – ha elfogy az életereje, felébred. |
| 12-4 | Chasen, a Békemester | 75 | Teaszertartás-mester, Chasen, a Békemester, Habverő-manó | Chasen habot ver mindenkire, és fél életerő alatt az Örök Zen-re készül. Jég és villám a gyengéje. |

**Titkos pálya X-1 – Az Elfeledett Pörkölő** (szint 27): A barlang legmélyén, egy befalazott teremben áll a legelső kávéfőző gép, amit valaha építettek. Még mindig be van kapcsolva. Jutalom: 3000 arany, Elixírek és Élet-elixírek. Ellenfél: Triplapresszó, az Ősgólem.

**Titkos pálya X-2 – Az Ősi Habverő-műhely** (szint 77): A Matcha-kádak mögötti lezárt ajtó egy régi műhelybe vezet. A legelső habverő-gólem még mindig dolgozik. Jutalom: 5000 arany, 3 Elixír és 3 Élet-elixír. Ellenfél: Öreg Matcha-gólem.

## 4. Hősök

| Hős | Kaszt | ÉP | MP | Erő | Védelem | Mágia | Ellenállás | Gyorsaság | Alaptámadás | Limit |
|---|---|---|---|---|---|---|---|---|---|---|
| Zordon | Varázsló | 72 | 60 | 7 | 5 | 16 | 10 | 11 | Botütés | Napkitörés |
| Morgána | Boszorkány | 80 | 55 | 8 | 6 | 14 | 12 | 13 | Pálcacsapás | Éjféli rontás |
| Lili | Tündér | 64 | 70 | 6 | 5 | 13 | 14 | 15 | Csillagszikra | Égi áldás |
| Grog | Ork harcos | 135 | 30 | 17 | 12 | 4 | 6 | 7 | Fejszecsapás | Titáncsapás |
| Jázmin | Íjász | 105 | 44 | 15 | 9 | 11 | 10 | 15 | Aranynyíl | Ezer Kéz |
| Kaelen | Druida | 92 | 56 | 12 | 10 | 14 | 12 | 12 | Bambuszcsapás | Bambusz-gólem |

Szintenként +10% minden érték. Felszerelés: fegyver (erő+mágia) és ruha (ÉP+védelem), 3 fokozat, fokonként +15%, ár: 300, 900, 2000 arany. Szintplafon: I. rész 30, II. rész 60, III. rész 90.

### Zordon – Varázsló

- **Limit – Napkitörés** (minden ellenség, tiszta, erő 2.6): Zordon egy valósághű napot idéz az égre: felfúvódik, felrobban, és a robbanás minden ellenséget eltalál. Nem elemi támadás, mindenkire teljes erővel hat.
- **Alaptámadás – Botütés** (fegyver, erő 1.2)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Tűzgolyó | induló | – | mágia | 1 ellenség | tűz | 8 | 0 | 1.6 | Égés 40% eséllyel, 3 kör | Tüzes lövedék egy ellenségre. 40% eséllyel meg is égeti. |
| Összpontosítás | induló | – | MP-töltés | saját maga | – | 0 | 3 | – |  | Zordon összpontosít: 25 MP-t tölt vissza, a következő körében pedig magától hatalmas Szélvihart szabadít minden ellenségre. |
| Vízörvény | induló | – | mágia | 1 ellenség | víz | 8 | 0 | 1.6 |  | Vízörvény ragadja el és pörgeti meg az ellenséget, majd gejzír tör fel alatta. A tüzes lények (sárkány, szalamandra, démon) és a rozsdás gépek gyengéje; a növényeket csak megöntözi. |
| Lángvihar | 1-1 után | 230 | mágia | minden ellenség | tűz | 18 | 2 | 1.1 | Égés 30% eséllyel, 3 kör | Lángoszlop minden ellenség alatt. Az erdő lakói gyengék a tűzre. |
| Jégszilánk | 2-2 után | 470 | mágia | 1 ellenség | jég | 9 | 1 | 1.5 | Fagyás 100% eséllyel, 1 kör | Jégszilánk egy ellenségre, ami egy körre meg is fagyasztja (a főellenségek immunisak). |
| Villámcsapás | 3-3 után | 920 | mágia | 1 ellenség | villám | 12 | 1 | 1.9 | Kábulat 30% eséllyel, 1 kör | Viharfelhőből lecsapó villám. 30% eséllyel elkábít. Páncélt tör. |
| Szökőár | 4-4 után | 1310 | mágia | minden ellenség | víz | 24 | 2 | 1.3 |  | Hatalmas hullám söpör végig minden ellenségen. |
| Láncvillám | 6-1 után | 2250 | mágia | minden ellenség | villám | 26 | 3 | 1 | Kábulat 100% eséllyel, 1 kör | Villámlánc ugrál ellenségről ellenségre, és mindet megbéklyózza: kimaradnak a következő körükből (a főellenségek immunisak). |
| Hóvihar | 7-1 után | 3240 | mágia | minden ellenség | jég | 26 | 2 | 1.35 | Fagyás 25% eséllyel, 1 kör | Jeges vihar minden ellenségre, 25% fagyasztás. |
| Csillaghullás | 8-2 után | 4720 | mágia | minden ellenség | fény | 34 | 3 | 1.9 |  | Csillagok zuhannak az égből minden ellenségre. |
| Szupernóva | 9-3 után | 4820 | mágia | 1 ellenség | tűz | 36 | 2 | 3.3 | Égés 60% eséllyel, 3 kör | Egy csillag robban fel az ellenségen. Hatalmas tűzsebzés egy célpontra. |
| Gleccser | 10-4 után | 6190 | mágia | minden ellenség | jég | 40 | 3 | 2 | Fagyás 35% eséllyel, 1 kör | Jéghegy zúdul minden ellenségre, 35% fagyasztás. |
| Égiháború | 12-1 után | 9040 | mágia | minden ellenség | villám | 46 | 3 | 2.3 | Kábulat 30% eséllyel, 1 kör | Villámok sora csap minden ellenségbe, 30% kábítás. |

### Morgána – Boszorkány

- **Limit – Éjféli rontás** (minden ellenség, sötétség, erő 1.9): Sötét robbanások, és minden ellenség átok alá kerül.
- **Alaptámadás – Pálcacsapás** (sötétség, erő 0.8)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Átok | induló | – | mágia | minden ellenség | sötétség | 12 | 2 | 1.4 | Átok 90% eséllyel, 3 kör | Hádész átka minden ellenségre: gyenge sötét sebzés, és 1 körre csökkenti a támadásukat. |
| Életszívás | induló | – | mágia | 1 ellenség | semleges | 10 | 0 | 1.3 |  | Semleges szívás: kiszívja az ellenség életerejét, és a felét Morgána visszagyógyítja. Minden ellenségre egyformán hat. |
| Méregfelhő | 1-1 után | 230 | mágia | minden ellenség | méreg | 16 | 2 | 0.7 | Méreg 80% eséllyel, 4 kör | Mérgező köd minden ellenségre, 4 körig tartó méreggel. |
| Rozsda-átok | 2-1 után | 450 | mágia | 1 ellenség | rozsda | 9 | 2 | 0.7 | Védelem− 100% eséllyel, 3 kör | 1 körre a felére csökkenti az ellenség védelmét. A gépeket és páncélosokat a rozsda sebzi is. |
| Árnyékkarmok | 3-1 után | 780 | mágia | 1 ellenség | sötétség | 12 | 1 | 1.9 |  | Óriási árnyékkarmok tépnek bele egy ellenségbe. |
| Őrület | 4-1 után | 1180 | mágia | 1 ellenség | méreg | 22 | 2 | 0.5 | Őrült 100% eséllyel, 2 kör | Morgána megőrjít egy ellenséget: megzavarodik, és a következő támadásával a saját társát támadja meg (ha egyedül van, magát). |
| Vudu baba | 5-1 után | 1650 | mágia | 1 ellenség | sötétség | 14 | 3 | 1.2 | Vudu 100% eséllyel, 3 kör | Morgána tűket döf a vudu babába: a tűk kirepülnek, és beleállnak az ellenségbe. Sötét sebzés, majd 3 körön át minden kör végén egy tű kihúzódik és sebez (életereje 9%-a). |
| Üst-kitörés | 6-1 után | 2250 | mágia | minden ellenség | sötétség | 22 | 1 | 0.5 |  | Morgána üstjéből lila gőz száll fel, és ráereszkedik az ellenségekre: egy körre apró, gyenge kis lénnyé változnak (a főellenségek kivételével). Kis sötét sebzés. |
| Sötét alku | 7-1 után | 3240 | MP-töltés | saját maga | – | 18% ÉP | 3 | – |  | Életerőt áldoz, cserébe 60 MP-t kap, és a limitje megtelik: a következő limitje Cerberus – Hádész háromfejű kutyájává változik. |
| Fekete lyuk | 8-1 után | 3590 | mágia | 1 ellenség | sötétség | 36 | 3 | 0.6 | Eltűnt 100% eséllyel, 1 kör | Fekete lyuk nyel el egy ellenséget: kis sötét sebzés, és egy körre eltűnik a csatatérről (nem támad, őt sem lehet támadni), a következő körben visszatér. A főellenségeket nem tudja eltüntetni. |
| Sötét futóhomok | 9-1 után | 4720 | mágia | minden ellenség | sötétség | 30 | 2 | 1.9 | Kábulat 35% eséllyel, 1 kör | Morgána a földbe csap: sötét homoklavina önti el az ellenséget, lidérckarok húzzák le őket. 35% eséllyel 1 körre beragadnak. |
| Lidércnyomás | 10-1 után | 6190 | mágia | 1 ellenség | sötétség | 34 | 2 | 4 | Átok 80% eséllyel, 3 kör | Rémálom tépi szét az ellenséget, és megátkozza. |
| Telihold átka | 11-1 után | 7000 | fizikai | 1 ellenség | sötétség | 28 | 2 | 3 | Védelem− 60% eséllyel, 1 kör | Morgána elűzi a felhőket: előbukkan a telihold, és egy társa farkasemberré változik, aki széttépi a kiválasztott ellenséget. Nagy sebzés, 60% eséllyel 1 körre gyengíti a védelmét. |
| Járvány | 12-1 után | 9040 | mágia | minden ellenség | méreg | 38 | 3 | 1.7 | Méreg 100% eséllyel, 3 kör | Átkos indák kúsznak a föld alatt az ellenségekhez, és mérgező kitörés tör fel alóluk: nagy sebzés és biztos méreg 3 körig. A fertőzés egyikről a másikra ugrik. |

### Lili – Tündér

- **Limit – Égi áldás** (az egész csapat, –, erő –): Mindenkit feléleszt, teljesen meggyógyít, visszatölti a varázserejét, leveszi a negatív állapotokat, és erősebb lesz a védelmük.
- **Alaptámadás – Csillagszikra** (fény, erő 0.75)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Gyógyítás | induló | – | gyógyítás | 1 társ | – | 7 | 0 | 2.2 |  | Meggyógyít egy társat. |
| Fénysugár | induló | – | mágia | 1 ellenség | fény | 6 | 0 | 1.35 |  | Szent fény egy ellenségre. A gombák gyengéje! |
| Tüskeinda | induló | – | mágia | 1 ellenség | természet | 8 | 2 | 1.2 | Kábulat 100% eséllyel, 1 kör | Tüskés indák törnek fel a földből és lekötözik az ellenséget: kimarad a következő köréből (a főellenségek nem). Kő és gép ellen erős, növények és tüzes lények ellen gyenge. |
| Tündérpor | induló | – | gyógyítás | az egész csapat | – | 16 | 2 | 1.4 |  | Lili pálcájából csillámló tündérpor hull az egész csapatra, és meggyógyítja őket. |
| Pálcakoppintás | 1-4 után | 410 | mágia | 1 ellenség | fény | 4 | 0 | 1.3 | Kábulat 25% eséllyel, 1 kör | Lili odarepül, és a varázspálcájával fejbe koppintja az ellenséget. Csillagrobbanás, 25% eséllyel el is kábítja. |
| Feltámasztás | 2-4 után | 710 | feltámasztás | elesett társ | – | 20 | 2 | 0.5 |  | Feléleszt egy elesett társat fél életerővel. |
| Gyorsaság | 3-4 után | 1150 | erősítés | 1 társ | – | 10 | 3 | – |  | 1 körig a kiválasztott társ körönként kétszer léphet (szárnyak jelzik, amíg tart). |
| Virágvihar | 4-4 után | 1310 | mágia | minden ellenség | természet | 22 | 2 | 1.25 |  | Szirmok és levelek éles vihara minden ellenségre. |
| Tisztítás | 5-4 után | 2090 | tisztítás | az egész csapat | – | 12 | 2 | – |  | Lili fénye megtisztítja a csapat testét: leveszi az égést, a mérget, az átkot, a fagyást, a forrázást, a gyengített védelmet, és 1 körig ezek ellen véd; egy kicsit gyógyít is. (Altatás és kábulat ellen Jázmin Ébresztő teája jó.) |
| Zsugorítás | 7-1 után | 3240 | mágia | 1 ellenség | tiszta | 14 | 3 | 0.7 |  | Zöldes-sárga csillagörvény: az ellenség 3 körre összezsugorodik, kisebb erővel üt, és a védelme is gyengébb. |
| Fénypajzs | 8-1 után | 3590 | erősítés | az egész csapat | – | 22 | 3 | – |  | Fénypajzs a csapat elé: amíg áll (a következő kör végéig), az ellenséges támadás el sem jut a hősökig – a rohamozó nekicsapódik és visszapattan, a lövés visszapattan a támadóra, és a sebzést ő kapja. |
| Ítélet fénye | 9-1 után | 4720 | mágia | minden ellenség | fény | 30 | 3 | 1.7 |  | Szent fényoszlopok minden ellenségen. |
| Újjászületés | 10-1 után | 6190 | gyógyítás | az egész csapat | – | 38 | 3 | 3 |  | Az elesett társak 60% életerővel feltámadnak, az élők nagy gyógyítást kapnak, és ha a következő két körben elesnének, maguktól feltámadnak. |
| Álomcsillagok | 11-1 után | 7000 | mágia | minden ellenség | fény | 20 | 3 | 0.6 | Alvás 100% eséllyel, 2 kör | Lili meglengeti a pálcáját: feljön a telihold, és álomcsillagok hullanak minden ellenségre. Akit eltalálnak, biztosan elalszik (a főellenségek és minibosszok nem). Ütésre felébrednek. |
| Hajnalpír | 12-1 után | 9040 | mágia | minden ellenség | fény | 42 | 3 | 2.4 |  | Hajnali rózsaszín-arany fényhullám söpör végig az ellenségeken (fény), a csapat pedig 10%-ot gyógyul. |

### Grog – Ork harcos

- **Limit – Titáncsapás** (minden ellenség, föld, erő 2.4): Grog óriásira nő, és egyetlen csapással végigsöpör minden ellenségen. Páncélt tör.
- **Alaptámadás – Fejszecsapás** (fegyver, erő 1)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Zúzás | induló | – | fizikai | 1 ellenség | föld | 6% ÉP | 0 | 1.7 |  | Hatalmas fejszecsapás. Mana helyett Grog életerejének 6%-ába kerül. Páncélt tör. |
| Harci üvöltés | induló | – | erősítés | az egész csapat | – | 10 | 3 | – |  | Az egész csapat ereje nő 1 körig. |
| Forgószél | induló | – | fizikai | minden ellenség | fegyver | 12 | 2 | 0.9 |  | Grog pörögni kezd, hat lángoló kétélű fejsze forog körülötte, és végigsöpör minden ellenségen. A tüskés rózsák visszaszúrnak! |
| Provokáció | induló | – | erősítés | saját maga | – | 6 | 3 | – |  | 1 körig minden ellenség Grogot támadja, ő pedig 30%-kal kevesebbet sebződik. Így védi a gyengébb társakat. |
| Vérszomj | 2-4 után | 710 | fizikai | 1 ellenség | fegyver | 15% ÉP | 1 | 2.7 |  | Életerőt áldoz egy pusztító csapásért. Páncélt tör. |
| Tüskeroham | 3-4 után | 1150 | fizikai | minden ellenség | föld | 18 | 2 | 1.2 |  | Grog a földbe csap: a repedés végigfut az ellenségek alatt, és hegyes sziklák törnek fel. Föld elem. |
| Óriásnövesztés | 4-4 után | 1310 | erősítés | 1 társ | – | 14 | 3 | – |  | Grog óriásira növeszt egy kiválasztott hőst (akár magát): 1 körig 1,5-szer erősebben támad. |
| Fejsze-hajítás | 5-4 után | 2090 | fizikai | 1 ellenség | fegyver | 12 | 1 | 2.4 |  | Grog teljes erőből elhajítja lángoló fejszéjét: pörögve becsapódik, aztán visszarepül a kezébe. Nagy sebzés egy ellenségnek. |
| Kőbőr | 6-4 után | 2790 | erősítés | saját maga | – | 14 | 3 | – |  | Grog bőre kővé válik: 1 körig minden őt érő sebzés a felére csökken (a Pajzzsal és a védekezéssel is összeadódik), és leveszi a negatív állapotokat. Ha közben megtámadják, a kő a támadóra rakódik: kőbörtönbe zárja, és az kimarad egy körből. |
| Magmakitörés | 8-1 után | 3590 | fizikai | minden ellenség | láva | 22% ÉP | 3 | 2.5 | Égés 60% eséllyel, 3 kör | A föld megnyílik, és láva tör fel minden ellenség alatt. |
| Hegyomlás | 9-1 után | 4720 | fizikai | minden ellenség | föld | 30 | 3 | 1.9 |  | Sziklák zúdulnak az égből minden ellenségre. |
| Kőhullám | 10-1 után | 6190 | fizikai | minden ellenség | föld | 20% ÉP | 2 | 2 |  | Grog életerőt áldoz, és a földbe csap: hatalmas kőhullám söpör végig minden ellenségen. |
| Vállroham | 11-1 után | 7000 | fizikai | 1 ellenség | fegyver | 10 | 1 | 1.9 | Kábulat 40% eséllyel, 1 kör | Grog nekiiramodik, és teljes testével vállal az ellenségbe rohan, hátralöki. 40% eséllyel 1 körre elkábítja. |
| Meteorököl | 12-1 után | 9040 | fizikai | 1 ellenség | föld | 18% ÉP | 2 | 4.6 |  | Grog az égből csap le. Hatalmas földsebzés egy célpontra, páncélt tör. |

### Jázmin – Íjász

- **Limit – Ezer Kéz** (minden ellenség, fegyver, erő 2.8): Jázmin mögött felemelkedik az ezerkezű Buddha: aranyló tenyérütések záporoznak minden ellenségre, végül egy óriási tenyér csap le rájuk.
- **Alaptámadás – Aranynyíl** (fegyver, erő 1.1)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Tenyércsapás | induló | – | fizikai | 1 ellenség | fegyver | 5 | 0 | 1.6 | Kábulat 20% eséllyel, 1 kör | Villámgyors tenyérütés, 20% eséllyel elkábít. |
| Ébresztő tea | induló | – | tisztítás | az egész csapat | – | 10 | 3 | – |  | Erős, koffeines tea: az egész csapat felébred, a kábulat és a némaság is elmúlik, és 1 körig éberek – nem lehet őket elaltatni, elkábítani, elnémítani. Testi bajt (méreg, égés, átok) nem vesz le. |
| Hármas nyíl | induló | – | fizikai | 1 ellenség | fegyver | 9 | 1 | 0.5 |  | Három nyíl gyors egymásutánban, mind a kiválasztott ellenségbe. |
| Zöld tea | induló | – | gyógyítás | az egész csapat | – | 16 | 2 | 1.5 |  | Gyógyító tea az egész csapatnak. |
| Százkezű | induló | – | fizikai | 1 ellenség | fegyver | 12 | 1 | 0.95 |  | Három gyors ütés egymás után ugyanarra az ellenségre. |
| Lótusznyíl | induló | – | fizikai | 1 ellenség | fegyver | 14 | 2 | 1.35 |  | A nyíl az ellenfélbe csapódva lótuszvirággá nyílik: a szirmok az egész csapatot gyógyítják egy kicsit. |
| Nyílzápor | induló | – | fizikai | minden ellenség | fegyver | 18 | 2 | 1.05 |  | Jázmin az égbe lő, és fentről nyílesső hull minden ellenfélre. |
| Árnyékszegező nyíl | induló | – | fizikai | 1 ellenség | sötétség | 12 | 3 | 0.9 | Kábulat 85% eséllyel, 2 kör | A nyíl a földhöz szegezi az ellenfél árnyékát: 85% eséllyel 2 körig nem tud lépni (a főellenségek ellen nem mindig hat). |
| Fekete tea | 5-2 után | 1960 | erősítés | az egész csapat | – | 20 | 4 | – |  | Erős fekete tea: az egész csapat támadása nő 1 körig. |
| Teabomba-nyíl | 6-1 után | 2250 | fizikai | 1 ellenség | tűz | 17 | 2 | 1.3 | Égés 60% eséllyel, 3 kör | Forró teával töltött nyíl robban a kiválasztott ellenségen: tűzsebzés. |
| Mana-tea | 7-1 után | 3240 | MP-töltés | az egész csapat | – | 12% ÉP | 4 | – |  | Jázmin életerőt áldoz egy különleges főzetért: mindenki 28 MP-t kap. |
| Szikranyíl | 7-4 után | 3420 | fizikai | minden ellenség | villám | 15 | 2 | 1 |  | Szikrázó villámnyíl ugrál ellenségről ellenségre; a végén a teljes szikralánc felrobban. |
| Mantranyíl | 8-4 után | 4280 | fizikai | 1 ellenség | tiszta | 16 | 2 | 1.6 |  | Arany jelek ragyognak a nyíl mögött: áttöri a páncélt, és leveszi az ellenfél minden erősítését. |
| Füstölő-nyíl | 9-3 után | 4820 | erősítés | az egész csapat | – | 20 | 4 | – |  | A csapat mellé lőtt nyíl füstölőként ég tovább: 1 körig minden kör végén gyógyítja a csapatot. |
| Belső csend | 10-2 után | 7000 | erősítés | saját maga | – | 14 | 4 | – |  | Jázmin lehunyt szemmel céloz: a következő találata biztosan kritikus, és 1 körig kétszer léphet. |
| Bambuszfüggöny | 11-2 után | 9040 | fizikai | minden ellenség | fegyver | 18 | 1 | 1.1 | Kábulat 60% eséllyel, 1 kör | Jázmin sortüzekben kilövi a bambusznyilakat: átfúrják az ellenségeket, a földbe fúródnak, és bambuszfüggönnyé nőnek körülöttük. 60% eséllyel 1 körre foglyul ejti őket. |
| Teaörvény-nyíl | 12-1 után | 9040 | fizikai | minden ellenség | víz | 17 | 1 | 1 | Forrázás 50% eséllyel, 2 kör | A nyíl az ellenség közé csapódik, és forró teaörvénnyé robban, amely mindenkit elsodor. 50% eséllyel 2 körre leforrázza őket. |

### Kaelen – Druida

- **Limit – Bambusz-gólem** (minden ellenség, természet, erő 2.5): A földből óriási bambuszgólem nő ki, végigtapos minden ellenségen, és 1 körre bambuszfalat emel a csapat elé (Védelem+).
- **Alaptámadás – Bambuszcsapás** (természet, erő 1.15)

| Képesség | Hol | Ár | Típus | Cél | Elem | MP | Várakozás | Erő | Állapot | Leírás |
|---|---|---|---|---|---|---|---|---|---|---|
| Levéltánc | induló | – | mágia | minden ellenség | természet | 10 | 0 | 1.15 |  | Borotvaéles levelek folyama a bothegyből: körbetekeri az ellenségeket, és mindegyiket többször megvágja. |
| Élő Bambuszkéreg | induló | – | erősítés | 1 társ | – | 18 | 2 | – |  | Bambuszfal nő a társ elé 1 körre: kevesebbet sérül, és a támadás fele visszapattan a támadóra. |
| Vad Alakváltás | induló | – | fizikai | 1 ellenség | természet | 18 | 2 | 1.4 |  | Kaelen véletlenszerűen állattá változik: medve (rárohan és megkarmolja az ellenfelet), teknős (páncéljába húzódik, 1 körig nem sérül), kígyó (rátekeredik és megmérgezi). |
| Gyökércsapda | induló | – | mágia | minden ellenség | természet | 14 | 1 | 0.9 | Kábulat 100% eséllyel, 1 kör | Gyökerek törnek fel, és ketrecet fonnak minden ellenség köré: kimaradnak egy körből (a főellenségek nem). |
| Tövisvihar | induló | – | mágia | minden ellenség | természet | 20 | 1 | 1 |  | Tüskés levelek forgószele söpör végig minden ellenségen. |
| Bambuszdöfés | induló | – | fizikai | 1 ellenség | természet | 16 | 1 | 2.2 | Védelem− 50% eséllyel, 1 kör | Kaelen parancsára az ellenség előtt vastag bambuszlándzsa tör ki ferdén a földből, és felnyársalja. 50% eséllyel 1 körre gyengíti a védelmét. |
| Gombaspóra | induló | – | mágia | minden ellenség | méreg | 22 | 2 | 0.6 | Méreg 80% eséllyel, 3 kör | Óriás gombák nőnek ki az ellenségek alatt, és mérgező spórát fújnak rájuk (3 kör méreg); 30% eséllyel el is alszanak. |
| Harmatkör | induló | – | gyógyítás | az egész csapat | – | 24 | 2 | 1.3 |  | Hatalmas levelekről gyógyító harmat hull az egész csapatra. |
| Ősi Tölgy ökle | induló | – | fizikai | 1 ellenség | természet | 26 | 2 | 2.6 |  | A földből egy ősi tölgy ágakból font ökle tör fel, és lesújt egy ellenségre. Páncélt tör. |
| Erdő haragja | 9-2 után | 5470 | mágia | minden ellenség | természet | 30 | 2 | 1.75 |  | Kaelen felébreszti az erdőt: hatalmas faágak csapnak le fentről minden ellenségre. Nagy természet-sebzés mindenkinek. |
| Virágzó élet | 12-1 után | 9040 | feltámasztás | elesett társ | – | 28 | 3 | 0.6 |  | Virágok nyílnak az elesett társ körül, és 60% életerővel feltámasztják. |

## 5. Páros támadások, közös támadás, idézések

**Páros támadás:** két hős együtt, mindkettőnek 100% limit kell (a gomb 60%-tól szürkén látszik), a teljes limitet viszi, csatánként egyszer, a boltban vehető (1200 arany). **Közös erő** (mind a 4 hős limitje tele): 2500 arany.

| Páros | Hősök | Elem | Erő | Leírás |
|---|---|---|---|---|
| Villámátok | Zordon + Morgána | villám | 1.6 | Zordon villáma és Morgána átka egyszerre: lila villámok csapnak minden ellenségbe, és átok alá kerülnek. |
| Tündérököl | Lili + Grog | fény | 1.7 | Lili aranyfénnyel tölti fel Grogot, aki a földbe csap: fény-lökéshullám minden ellenségre, a csapat kicsit gyógyul. |
| Csillagözön | Zordon + Lili | fény | 1.6 | Zordon és Lili hullócsillagokat hív: minden ellenséget csillagzápor ér. |
| Árnyroham | Morgána + Grog | sötétség | 1.8 | Morgána árnyba burkolja Grogot, aki végigrohan az ellenségeken. |
| Lótuszvihar | Jázmin + Lili | természet | 1.6 | Jázmin nyilai és Lili tündérpora lótuszszirom-viharrá állnak össze. |
| Sárkánynyíl | Jázmin + Zordon | tűz | 1.7 | Zordon tűzzel tölti meg Jázmin nyilát: lángoló sárkánynyíl szántja végig az ellenségeket. |
| Élő Tölgybárd | Kaelen + Grog | fegyver | 2 | Kaelen indái Grog fejszéje köré nőnek, óriási élő tölgybárddá változtatják; Grog felugrik, és a földbe vágja – minden ellenség alatt gyökerek törnek fel. |
| Bambuszliget | Kaelen + Jázmin | természet | 1.7 | Bambuszerdő tör fel az ellenségek alatt, és felöklendezi őket; Jázmin a levegőben nyilazza le őket. |
| Villámbambusz | Kaelen + Zordon | villám | 1.8 | Kaelen óriás bambuszlándzsákat döf az ellenségek mellé villámhárítónak, Zordon villámai beléjük csapnak, és átvezetik az áramot. |
| Lángoló Átokketrec | Kaelen + Morgána | sötétség | 1.7 | Tüskés gyökérketrec nő minden ellenség köré, Morgána fekete-lila átoklángja végigég az indáin, és összeszorul. |
| Lótuszharmat | Kaelen + Lili | természet | 1.2 | Óriás lótusz nyílik a csapat alatt, harmata erőt ad: minden harcoló hős LIMIT-je +60%-kal, MP-je +40%-kal töltődik. |

**Idézések** (legyőzött főellenségek/ellenfelek segítenek; egy csatában egyszer; a sebzésük ×0,6-ra csökkentve, mert túl erősek voltak):

| Idézés | Mikortól | Leírás |
|---|---|---|
| Koffeines mókus | kezdettől | Végigszáguld az ellenségeken, megcsipkedi őket, és a csata végén dupla arany jár. |
| Nyálkakirály | kezdettől | Óriási nyálka zuhan az ellenségekre: méregsebzés mindenkire, és a ragacs 3 körre csökkenti a védelmüket. |
| Gomba-Király | 1-3 | Légyölő gombák zuhannak az égből szerteszét az ellenségekre, és lila spórafelhővé pukkadnak: méregsebzés, és mindenki elalszik (a főellenségek nem). |
| Rémült Vén Tölgy | 1-4 | Gyökerek fogják meg az összes ellenséget (kimaradnak egy körből), a makkok 30%-ot gyógyítanak a csapaton. |
| Kísértetlovag | 2-3 | Lélekvágás a legerősebb ellenségre: hatalmas sötét sebzés és átok. |
| Rozsdakirály | 2-4 | Megkongatja a Nagy Órát: a csapat minden tagja 2 körig kétszer léphet. |
| Óramű ágyúüteg | 2-3 | Sortűz minden ellenségre: nagy fegyveres sebzés, páncélt tör. |
| Villámdenevér | 3-2 | A villámdenevérek bénító sikolya: villódzó hanghullám söpör végig az ellenségeken, villám sebzés, 40% eséllyel kábít. |
| Kristálygólem | 3-1 | Kék kristálytükör-pajzs a csapatra: mindenkinél kivédi a következő találatot, és visszaveri a támadóra. |
| Espresszó, a sárkány | 3-4 | Espresszó kitátja a száját, és hatalmas lángcsóvát lehel minden ellenségre: óriási tűzsebzés és égés. |
| Főnix | 3-4 | Mindenkit feltámaszt és teljesen meggyógyít. |
| Koffein-gólem | 4-3 | Felpörgeti a csapatot: mindenki 3 körig kétszer lép és erősebben támad. |
| Árny-csapat | 4-2 | A hősök árnyékából árnysereg tör elő: árnykezek rántják le az ellenségeket, árnyharcosok tépik össze őket – erős sötét sebzés mindenkire. |
| Démonkirály | 4-3 | Pokoltűz minden ellenségre: nagy tűzsebzés és átok. |
| Morcus | 4-4 | Káosz: véletlen elemű, hatalmas sebzés minden ellenségre. |
| Öreg Oolong | 5-4 | Az öreg gőzsárkány kitátja a száját, és forró gőzt lehel minden ellenségre: víz sebzés, és megforrázza őket. |
| Az Ezerrészes Szerviz | 6-4 | A Szerviz csészekatonái végigrohannak a csatatéren, és minden ellenséget eltaposnak: nagy fegyversebzés. |
| A Mézkirálynő | 7-4 | Hatalmas, dühös méhraj tör ki a Mézkirálynő mögül, és újra meg újra lecsap az ellenségekre: természet sebzés és méreg. |
| Kamilla, a Teacsászárnő | 8-4 | Kamilla meglendíti óriás legyezőjét: hatalmas széllökés söpör végig az ellenségeken, hátralöki és megsebzi őket. |
| Mochi-király | 9-4 | Óriás mochigolyóvá gömbölyödik, végiggurul az ellenségeken, és mindegyiket beragasztja: kimaradnak egy körből (a főellenségek nem). |
| Zen-Kavics Sárkány | 10-4 | Kőfelhőből kavicseső zúdul minden ellenségre: nagy földsebzés, és 1 körre gyengül a védelmük. |
| Bambusz-békakirály | 11-4 | A saját ragadós nyelvével egyenként elkapja és a földhöz csapja az ellenségeket, aztán megkongatja a gongot: a hanghullám leveri a pajzsaikat és erősítéseiket, és 50% eséllyel elkábítja őket. |
| Chasen, a Békemester | 12-4 | Örök Zen: minden ellenség elalszik (a főellenségek nem), a csapat 30%-ot gyógyul, és lemossa a habot. |

## 6. Ellenfelek

Jelölés: **FŐ** = főellenség, **MINI** = minibossz. Gyengeség/ellenállás: szorzó a kapott sebzésre (>1 gyenge, <1 ellenáll, 0 immunis).

### I. fejezet: Koffeinmegvonás

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Zöld nyálka | 60 | 9/12/8/4 | tűz ×1.5, jég ×1.5, fegyver ×0.5, méreg ×0 | Méreg | Rávetődés (1 hős, fegyver, 1.1); Méregköpés (1 hős, méreg, 0.8, Méreg 60% eséllyel, 3 kör) |
| Harapós rózsa | 75 | 11/8/9/8 | tűz ×1.5, méreg ×0 | Méreg | Tüskés inda (1 hős, fegyver, 1.1); Tüskezápor (minden hős, fegyver, 0.55) |
| Mohacsiga | 90 | 8/18/6/6 | tűz ×1.5, villám ×1.5, fegyver ×0.5 | – | Nyálkacsík (1 hős, fegyver, 0.9); Házcsapás (1 hős, fegyver, 1.3) |
| Szentjánosbogár-raj | 48 | 6/4/12/10 | jég ×1.5, méreg ×1.5, fény ×0.5 | – | Villanás (1 hős, fény, 1) |
| Gombaember | 70 | 9/7/11/9 | tűz ×1.5, fény ×1.5, sötétség ×0.5, méreg ×0 | Méreg | Fejelés (1 hős, fegyver, 1); Altató spóra (1 hős, méreg, 0.4, Alvás 70% eséllyel, 2 kör) |
| Mérgező pöfeteg | 50 | 6/5/12/6 | tűz ×1.5, fegyver ×1.3, fény ×1.3, méreg ×0 | Méreg | Pöfögés (1 hős, méreg, 0.6, Méreg 50% eséllyel, 3 kör) |
| Barlangi béka | 85 | 11/9/7/7 | villám ×1.5, jég ×0.5 | – | Nyelvcsapás (1 hős, fegyver, 1); Rávetődés (1 hős, fegyver, 1.1) |
| Kéregbogár | 100 | 12/20/5/8 | tűz ×1.5, jég ×1.3, fegyver ×0.5 | – | Szarvdöfés (1 hős, fegyver, 1.2); Gömbbe gurulás (saját maga, –, –) |
| Gomba-Király **MINI** | 320 | 12/10/15/12 | tűz ×1.5, fény ×1.5, sötétség ×0.5, méreg ×0 | Kábulat, Fagyás, Alvás, Eltűnt, Méreg | Gombaeső (1 hős, méreg, 1); Királyi spóra (minden hős, méreg, 0.5, Alvás 35% eséllyel, 2 kör) |
| Makkocska | 45 | 6/10/6/6 | tűz ×1.5 | – | Rávetődés (1 hős, fegyver, 1.1) |
| Rémült Vén Tölgy **FŐ** | 650 | 16/16/12/10 | tűz ×1.5, fegyver ×0.5, méreg ×0.5 | Kábulat, Fagyás, Alvás, Eltűnt | Ágcsapás (1 hős, fegyver, 1.25); Levélvihar (minden hős, természet, 0.75) |

### II. fejezet: Az Álmos Királyság

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Csontváz őr | 80 | 12/10/5/6 | fény ×1.5, fegyver ×1.3, méreg ×0.3, sötétség ×0.5 | – | Kardvágás (1 hős, fegyver, 1.1); Pajzscsapás (1 hős, fegyver, 0.8, Kábulat 30% eséllyel, 1 kör) |
| Zombi pék | 95 | 11/7/9/7 | tűz ×1.5, fény ×1.5, méreg ×0 | Méreg | Sodrófa (1 hős, fegyver, 1.2); Rothadt kifli (1 hős, méreg, 0.9, Méreg 70% eséllyel, 3 kör) |
| Kóbor szellem | 60 | 5/4/13/12 | fegyver ×0, fény ×1.8, sötétség ×0.5 | – | Hideg érintés (1 hős, jég, 1, Fagyás 100% eséllyel, 1 kör); Jajveszékelés (minden hős, sötétség, 0.5, Átok 30% eséllyel, 3 kör) |
| Óramű katona | 100 | 14/16/5/8 | villám ×1.6, fegyver ×0.6, méreg ×0 | Méreg | Alabárdszúrás (1 hős, fegyver, 1.1); Felhúzott csapás (1 hős, fegyver, 2.5) |
| Rozsdás ágyú | 110 | 15/14/5/6 | villám ×1.5, jég ×1.5, tűz ×0.5, méreg ×0 | Méreg | Ágyúlövés (1 hős, fegyver, 1.2); Sortűz (minden hős, fegyver, 0.85) |
| Kísértetlovag | 190 | 16/12/12/12 | fény ×1.6, sötétség ×0.4, méreg ×0.3, fegyver ×0.7 | – | Lélekvágás (1 hős, sötétség, 1.3); Sötét hullám (minden hős, sötétség, 0.7) |
| II. Csavar **FŐ** | 600 | 14.45/14/12.75/12 | villám ×1.5, méreg ×0, sötétség ×0.5 | Kábulat, Fagyás, Alvás, Eltűnt, Méreg | Fogaskerékhullás (1 hős, fegyver, 1.25); Forró gőz (minden hős, tűz, 0.8, Égés 30% eséllyel, 3 kör) |

### III. fejezet: Forró Lé

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Kristálygólem | 130 | 14/10/10/22 | fegyver ×1.4, tűz ×1.3, jég ×0.6, villám ×0.6, fény ×0.6, sötétség ×0.6, méreg ×0.3 | Méreg | Kristályököl (1 hős, fegyver, 1.2); Szilánkeső (minden hős, fegyver, 0.6); Tükörpajzs (saját maga, –, –) |
| Jégelementál | 90 | 8/8/15/12 | tűz ×1.6, jég ×0, fegyver ×0.8 | – | Fagyos érintés (1 hős, jég, 1, Fagyás 35% eséllyel, 1 kör); Jégcsapok (minden hős, jég, 0.6) |
| Villámdenevér | 70 | 10/6/13/9 | jég ×1.4, fegyver ×1.3, villám ×0.3 | – | Szikraharapás (1 hős, villám, 1); Bénító sikoly (minden hős, villám, 0.4, Kábulat 25% eséllyel, 1 kör) |
| Sárkányfióka | 120 | 13/11/14/11 | jég ×1.5, tűz ×0.4 | – | Karomcsapás (1 hős, fegyver, 1.1); Tűzlehelet (minden hős, tűz, 0.8, Égés 30% eséllyel, 3 kör) |
| Láva-szalamandra | 110 | 14/10/12/10 | jég ×1.6, tűz ×0 | – | Lángharapás (1 hős, tűz, 1.2, Égés 40% eséllyel, 3 kör); Tűzgolyó (1 hős, tűz, 1.1, Égés 30% eséllyel, 3 kör) |
| Obszidián lovag | 220 | 18/18/8/10 | jég ×1.4, villám ×1.4, tűz ×0.4, fegyver ×0.6 | Méreg | Olvadt kard (1 hős, tűz, 1.4, Égés 50% eséllyel, 3 kör); Obszidiánfal (minden hős, tűz, 0.95, Égés 35% eséllyel, 2 kör) |
| Espresszó **FŐ** | 950 | 19/14/18/14 | – | Kábulat, Fagyás, Alvás, Eltűnt | Lecsapás (1 hős, fegyver, 1.3); Duplán pörkölt lehelet (minden hős, tűz, 1.7, Égés 50% eséllyel, 3 kör) |

### IV. fejezet: A Káosz Tornya

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Káoszkocka | 115 | 8/12/15/14 | – | – | Káoszlövedék (1 hős, sötétség, 1.2); Kockaeső (minden hős, sötétség, 0.6) |
| Álmatlan szem | 95 | 6/7/15/12 | fény ×1.6, sötétség ×0.3 | – | Karikás bámulás (1 hős, sötétség, 1.1); Álomlopás (1 hős, sötétség, 0.7, Alvás 50% eséllyel, 2 kör) |
| Árny-Grog | 289 | 21/14/5/8 | fény ×1.6, sötétség ×0.3, méreg ×0.6 | – | Árny-zúzás (1 hős, fegyver, 1.5); Árny-földrepesztés (minden hős, fegyver, 0.7) |
| Árny-Lili | 153 | 7/7/17/17 | fény ×1.6, sötétség ×0.3, méreg ×0.6 | – | Hamis fény (1 hős, sötétség, 1.1); Árnyéklopás (1 hős, sötétség, 1) |
| Árny-Zordon | 179 | 8/7/20/13 | fény ×1.6, sötétség ×0.3, méreg ×0.6 | – | Árnytűz (1 hős, tűz, 1.3, Égés 40% eséllyel, 3 kör); Árnyvillám (1 hős, villám, 1.4); Árny-jégvihar (minden hős, jég, 0.7, Fagyás 25% eséllyel, 1 kör) |
| Árny-Morgána | 187 | 9/8/18/14 | fény ×1.6, sötétség ×0.3, méreg ×0.6 | – | Árny-életszívás (1 hős, sötétség, 1.1); Rontás (1 hős, sötétség, 0.5, Átok 80% eséllyel, 3 kör) |
| Démonfióka | 70 | 10/6/10/6 | fény ×1.5, tűz ×0.5 | – | Karmolás (1 hős, fegyver, 1); Tűzköpés (1 hős, tűz, 1.1, Égés 30% eséllyel, 3 kör) |
| Sötét mágus | 92 | 6/5/15/14 | sötétség ×0.3, fény ×1.5, fegyver ×1.3 | – | Árnyékgolyó (1 hős, sötétség, 1.2); Rontás (1 hős, sötétség, 0.5, Átok 80% eséllyel, 3 kör); Sötét hullám (minden hős, sötétség, 0.7) |
| Árnyfenevad | 175 | 15/10/6/8 | tűz ×1.4, fény ×1.4, sötétség ×0.4 | – | Harapás (1 hős, fegyver, 1.3); Tombolás (minden hős, fegyver, 0.6) |
| Koffein-gólem | 300 | 17/15/13/10 | jég ×1.5, villám ×1.5, méreg ×0, tűz ×0.6 | Méreg | Bögreököl (1 hős, fegyver, 1.2); Forró gőz (minden hős, tűz, 0.8, Égés 30% eséllyel, 3 kör); Dupla presszó (1 hős, tűz, 1.3, Égés 40% eséllyel, 3 kör) |
| Démonkirály **FŐ** | 820 | 20/14/18/14 | fény ×1.6, tűz ×0.5, sötétség ×0.5 | Kábulat, Fagyás, Alvás, Eltűnt | Pokoli csapás (1 hős, fegyver, 1.6); Pokoltűz (minden hős, tűz, 0.9, Égés 40% eséllyel, 3 kör); Démoni üvöltés (minden hős, sötétség, 0.35, Átok 70% eséllyel, 3 kör) |
| Morcus **FŐ** | 1250 | 15/13/19/15 | – | Kábulat, Fagyás, Alvás, Eltűnt | Káoszlövedék (1 hős, sötétség, 1.2); Káoszkockák (minden hős, sötétség, 0.7); Káoszvihar (minden hős, sötétség, 0.85); Árnykarmok (1 hős, sötétség, 1.3) |

### V. fejezet: Ködös Teateraszok

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Tealevél-manó | 95 | 13/8/13/10 | tűz ×1.6, jég ×1.3, természet ×0.3, víz ×0.5, méreg ×0.5 | – | Levélvágás (1 hős, természet, 1.05); Teatüske (1 hős, természet, 1.1) |
| Gőzlidérc | 80 | 6/5/16/13 | jég ×1.7, villám ×1.3, tűz ×0.3, fegyver ×0.5, víz ×0.6 | – | Forrázás (1 hős, tűz, 1.15, Égés 35% eséllyel, 3 kör); Gőzfelhő (minden hős, tűz, 0.6, Égés 25% eséllyel, 3 kör) |
| Bambuszőr | 130 | 16/14/5/8 | tűz ×1.6, fegyver ×0.7, természet ×0.4, villám ×1.2 | – | Bambuszdöfés (1 hős, fegyver, 1.25); Bambuszketrec (1 hős, természet, 0.6, Kábulat 100% eséllyel, 1 kör) |
| Tealopó majom | 105 | 15/8/6/8 | tűz ×1.3, sötétség ×1.3, fegyver ×1.2 | – | Elcsenés (1 hős, fegyver, 0.9); Csészedobás (1 hős, fegyver, 1.15) |
| Kannateknős | 150 | 14/22/10/9 | villám ×1.6, jég ×1.2, fegyver ×0.5, tűz ×0.6, föld ×0.6 | – | Kannapörgés (1 hős, fegyver, 1.3); Forró öntet (1 hős, víz, 1, Égés 30% eséllyel, 3 kör) |
| Szamovár-gólem | 340 | 18/17/15/11 | jég ×1.6, villám ×1.5, víz ×1.3, tűz ×0.3, méreg ×0 | Alvás, Méreg | Vasököl (1 hős, fegyver, 1.4); Forrázás (1 hős, tűz, 1.15, Égés 35% eséllyel, 3 kör); Kifutó forrás (minden hős, víz, 0.85, Égés 40% eséllyel, 3 kör) |
| Öreg Oolong **FŐ** | 1350 | 19/14/19/15 | jég ×1.5, villám ×1.2, tűz ×0.4, természet ×0.6, méreg ×0.5 | Kábulat, Fagyás, Alvás, Eltűnt | Sárkányharapás (1 hős, fegyver, 1.45); Gőzlehelet (minden hős, víz, 0.9, Égés 30% eséllyel, 3 kör); Ködgyűrű (1 hős, víz, 1, Alvás 45% eséllyel, 2 kör) |

### VI. fejezet: Porcelánváros

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Porcelánbaba | 100 | 9/9/16/14 | fegyver ×1.5, föld ×1.5, sötétség ×0.4, méreg ×0.3, villám ×1.5 | – | Porcelán csók (1 hős, sötétség, 0.9, Átok 50% eséllyel, 3 kör); Szilánkszórás (minden hős, fegyver, 0.6) |
| Csészekatona | 110 | 16/13/8/9 | fegyver ×1.3, villám ×1.3, víz ×0.5, tűz ×0.7 | Méreg | Kanáldöfés (1 hős, fegyver, 1.2); Teafröccs (1 hős, víz, 1.05) |
| Cukorfogó rák | 125 | 17/16/5/7 | villám ×1.6, tűz ×1.2, fegyver ×0.6, víz ×0.5 | – | Csípés (1 hős, fegyver, 1.3, Védelem− 40% eséllyel, 3 kör); Cukordobás (1 hős, fegyver, 1) |
| Lampionlidérc | 90 | 6/6/17/13 | víz ×1.7, jég ×1.4, tűz ×0.2, fény ×1.3, sötétség ×0.5 | – | Lampionláng (1 hős, tűz, 1.2, Égés 40% eséllyel, 3 kör); Lidércrobbanás (minden hős, sötétség, 1.17) |
| Vázagólem | 190 | 18/18/6/8 | fegyver ×1.4, föld ×1.4, villám ×0.6, tűz ×0.6, víz ×0.6, méreg ×0.2 | Méreg | Vázacsapás (1 hős, föld, 1.45); Mázpáncél (saját maga, –, –) |
| Porcelán mandarin | 360 | 17/15/18/16 | fegyver ×1.4, föld ×1.4, sötétség ×0.5, méreg ×0.3 | Alvás | Legyezőpenge (1 hős, fegyver, 1.3); Tusátok (minden hős, sötétség, 0.6, Átok 50% eséllyel, 3 kör) |
| Az Ezerrészes Szerviz **FŐ** | 1500 | 20/16/18/15 | fegyver ×1.2, föld ×1.3, villám ×1.2, víz ×0.5, tűz ×0.6, méreg ×0.3 | Kábulat, Fagyás, Alvás, Eltűnt, Méreg | Kannazúzás (1 hős, fegyver, 1.55); Tányérvihar (minden hős, fegyver, 0.8); Porcelánroham (minden hős, fegyver, 0.85) |

### VII. fejezet: Cukorsivatag

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Kockacukor-gólem | 170 | 19/19/6/8 | víz ×1.8, tűz ×1.3, fegyver ×0.6, jég ×0.5, méreg ×0.3 | Méreg | Kockacsapás (1 hős, föld, 1.3); Porcukorfelhő (minden hős, fegyver, 0.55, Védelem− 40% eséllyel, 3 kör) |
| Mézdarázs | 95 | 15/7/10/8 | tűz ×1.5, jég ×1.5, természet ×0.6, méreg ×0 | Méreg | Fullánk (1 hős, méreg, 0.95, Méreg 50% eséllyel, 3 kör); Mézlövet (1 hős, természet, 1, Kábulat 25% eséllyel, 1 kör) |
| Mézeskalács-bandita | 130 | 18/11/9/9 | víz ×1.5, tűz ×1.3, fegyver ×1.2, méreg ×0.5 | – | Cukorpálca-ütés (1 hős, fegyver, 1.25); Cukormáz-bomba (minden hős, jég, 0.7); Elcsenés (1 hős, fegyver, 0.9) |
| Vattacukor-bárány | 120 | 11/8/15/15 | tűz ×1.7, víz ×1.5, fegyver ×0.6, fény ×0.6 | – | Pihe-roham (1 hős, fegyver, 1.1); Édes álom (1 hős, semleges, 0.5, Alvás 60% eséllyel, 2 kör) |
| Karamellskorpió | 145 | 18/15/9/8 | jég ×1.6, víz ×1.4, tűz ×0.3, fegyver ×0.7 | – | Ollócsattanás (1 hős, fegyver, 1.3); Karamellfullánk (1 hős, tűz, 1.1, Égés 50% eséllyel, 3 kör) |
| Lekvárdzsinn **MINI** | 532 | 18/13/20/16 | jég ×1.5, fény ×1.3, tűz ×0.6, méreg ×0, fegyver ×0.7 | Alvás, Méreg, Eltűnt | Lekvárhullám (minden hős, víz, 0.85, Védelem− 50% eséllyel, 3 kör); Ragacsos kéz (1 hős, fegyver, 1.35, Kábulat 30% eséllyel, 1 kör); Kívánság (minden hős, tűz, 0.85, Égés 35% eséllyel, 1 kör) |
| Mézkirálynő **FŐ** | 1650 | 21/14/19/15 | tűz ×1.5, jég ×1.3, természet ×0.5, méreg ×0, fegyver ×0.9 | Kábulat, Fagyás, Alvás, Eltűnt, Méreg | Királyi fullánk (1 hős, méreg, 1.5, Méreg 70% eséllyel, 3 kör); Mézeső (minden hős, természet, 0.8, Védelem− 100% eséllyel, 1 kör); Zümmögővihar (minden hős, fegyver, 0.75) |

### VIII. fejezet: Az Álompalota

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Párnalovag | 180 | 19/20/8/12 | tűz ×1.6, villám ×1.2, fegyver ×0.5, fény ×0.6, sötétség ×1.2 | – | Párnacsapás (1 hős, fegyver, 1.25, Alvás 25% eséllyel, 2 kör); Tollvihar (minden hős, fegyver, 0.65) |
| Álomlepke | 105 | 8/7/18/15 | tűz ×1.6, fény ×1.4, sötétség ×0.4, természet ×0.6 | – | Pihepor (1 hős, sötétség, 0.8, Alvás 100% eséllyel, 2 kör); Holdsugár (1 hős, fény, 1.25) |
| Homokmanó | 125 | 12/10/17/13 | víz ×1.7, jég ×1.3, föld ×0.3, villám ×0.7 | – | Álomhomok (1 hős, föld, 0.7, Alvás 65% eséllyel, 2 kör); Homokvihar (minden hős, föld, 0.7, Alvás 25% eséllyel, 2 kör) |
| Rémálom-árny | 150 | 18/9/16/12 | fény ×1.8, tűz ×1.2, sötétség ×0.2, fegyver ×0.7, méreg ×0.5 | – | Rémkarom (1 hős, sötétség, 1.35); Rémálom (minden hős, sötétség, 0.75, Átok 40% eséllyel, 3 kör) |
| Mackóőr | 260 | 21/16/6/10 | tűz ×1.6, sötétség ×1.3, fegyver ×0.7, fény ×0.7 | – | Macióölelés (1 hős, fegyver, 1.5, Kábulat 30% eséllyel, 1 kör); Morgás (saját maga, –, –) |
| Altató hárfa | 400 | 12/14/21/18 | villám ×1.6, fegyver ×1.3, fény ×0.4, sötétség ×0.6, méreg ×0.3 | Alvás, Átok | Húrpattanás (1 hős, villám, 1.3); Altatódal (minden hős, sötétség, 0.4, Alvás 45% eséllyel, 1 kör) |
| Kamilla **FŐ** | 1750 | 20/15/22/17 | – | Kábulat, Fagyás, Alvás, Eltűnt | Teaszertartás (minden hős, víz, 0.95); Legyezőhurrikán (minden hős, szél, 1.1); Altatófurulya (minden hős, sötétség, 0.4, Alvás 45% eséllyel, 1 kör) |

### IX. fejezet: Habos Bambuszosok

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Habverő-manó | 108 | 12/9/13/11 | tűz ×1.6, fegyver ×1.3, természet ×0.4, víz ×0.6 | – | Habzápor (1 hős, víz, 0.9, Habos 80% eséllyel, 1 kör); Habverő-pörgés (1 hős, fegyver, 1.15) |
| Mochi-nyálka | 135 | 13/13/7/12 | tűz ×1.6, fény ×1.4, fegyver ×0.5, méreg ×0 | Méreg | Ragacsos ölelés (1 hős, fegyver, 1, Kábulat 30% eséllyel, 1 kör); Mochi-ugrás (1 hős, fegyver, 1.3) |
| Bambuszkígyó | 153 | 15/11/8/10 | tűz ×1.6, jég ×1.2, természet ×0.4 | – | Bambuszostor (1 hős, természet, 1.2); Rátekeredés (1 hős, fegyver, 1, Kábulat 35% eséllyel, 1 kör) |
| Teafa-dryád | 167 | 9/10/16/16 | tűz ×1.6, jég ×1.3, természet ×0.3 | – | Társgyógyító levél (1 társa, –, 1.4); Levélzápor (minden hős, természet, 0.7) |
| Mochi-király **FŐ** | 1615 | 19/17/14/16 | tűz ×1.5, fény ×1.4, fegyver ×0.6, méreg ×0 | Kábulat, Fagyás, Alvás | Királyi hasraesés (minden hős, fegyver, 1); Matchafelhő (minden hős, semleges, 0.55, Habos 60% eséllyel, 1 kör); Ragacsos ölelés (1 hős, fegyver, 1, Kábulat 30% eséllyel, 1 kör) |

### X. fejezet: A Kőmozaik Szentély

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Kőőr | 198 | 16/20/7/10 | villám ×1.5, föld ×1.4, fegyver ×0.5, méreg ×0 | Méreg, Alvás | Kőőrség (saját maga, –, –); Kőhabverő-csapás (1 hős, föld, 1.3) |
| Szerzetes-varjú | 126 | 14/9/11/12 | villám ×1.6, jég ×1.2 | – | Csőrcsapás (1 hős, fegyver, 1.2); Meditáció (saját maga, –, –) |
| Mozaik-szellem | 144 | 7/9/17/16 | fény ×1.7, villám ×1.2, fegyver ×0.3 | – | Mozaiklövés (1 hős, föld, 1.15); Mozaikszilánkok (minden hős, föld, 0.65) |
| Zen-Kavics Sárkány **FŐ** | 1785 | 20/20/17/17 | jég ×1.5, természet ×1.4, tűz ×0.5, sötétség ×0.5, méreg ×0.3 | Kábulat, Fagyás, Alvás | Kavicseső (minden hős, föld, 0.75); Kőzúgás (minden hős, föld, 0.9); Meditáció (saját maga, –, –) |

### XI. fejezet: Bambuszhabverők Barlangja

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Matcha-gólem | 225 | 18/18/11/14 | villám ×1.6, fegyver ×1.2, tűz ×0.5, víz ×0.5, méreg ×0 | Méreg, Alvás | Csészecsapás (1 hős, fegyver, 1.35); Forró hab (minden hős, víz, 0.7, Habos 50% eséllyel, 1 kör) |
| Csészeharcos | 180 | 17/15/7/10 | fegyver ×1.4, villám ×1.3, víz ×0.5, méreg ×0 | Méreg | Kanáldöfés (1 hős, fegyver, 1.2); Teafröccs (1 hős, víz, 1.05) |
| Gőzkád-szellem | 162 | 7/8/18/17 | jég ×1.7, tűz ×0.3, víz ×0.4, fegyver ×0.6 | – | Forró gőz (minden hős, tűz, 0.7, Égés 30% eséllyel, 3 kör); Gőzsugár (1 hős, tűz, 1.2) |
| Teaszertartás-mester | 234 | 11/13/19/19 | jég ×1.5, villám ×1.2, természet ×0.4 | – | Szertartás-hab (minden hős, víz, 0.6, Habos 60% eséllyel, 1 kör); Kortyintás (1 hős, természet, 0.9) |
| Bambusz-békakirály **FŐ** | 1870 | 20/18/16/17 | tűz ×1.5, villám ×1.4, víz ×0.4, méreg ×0.2 | Kábulat, Fagyás, Alvás | Nyelvcsapás (1 hős, fegyver, 1.4); Bambuszugrás (1 hős, fegyver, 1.6); Gongütés (minden hős, semleges, 0.6) |

### XII. fejezet: A Matcha Ceremónia-palota

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások (cél, elem, erő, állapot) |
|---|---|---|---|---|---|
| Lili (megbékítve) | 810 | 4/12/14/20 | – | Méreg, Átok | Tündérfény (1 hős, fény, 1.2); Megbékítő szó (1 hős, fény, 0.8, Alvás 45% eséllyel, 1 kör); Lili gyógyítja magát (1 társa, –, 1.8) |
| Chasen, a Békemester **FŐ** | 2040 | 20/19/21/20 | jég ×1.5, villám ×1.4, természet ×0.3, méreg ×0 | Kábulat, Fagyás, Alvás | Habvihar (minden hős, víz, 1, Habos 70% eséllyel, 1 kör); Megbékítő szó (1 hős, fény, 0.8, Alvás 45% eséllyel, 1 kör); Kortyintás (1 hős, természet, 0.9) |

### Egyéb (titkos pálya, idézett kísérők, különleges)

| Ellenfél | Alap ÉP | Erő/Véd/Mágia/Ell. | Gyengeség / ellenállás | Állapot-immunitás | Támadások |
|---|---|---|---|---|---|
| Kis nyálka | 30 | 7/8/6/4 | tűz ×1.5, jég ×1.5, fegyver ×0.5, méreg ×0 | Méreg | Rávetődés (1 hős, fegyver, 1.1) |
| Koffeines mókus | 60 | 12/8/5/8 | fegyver ×1.5 | – | Rágcsálás (1 hős, fegyver, 0.9) |
| Gyökér | 40 | 0/6/0/6 | tűz ×1.5, fegyver ×1.5 | Eltűnt |  |
| Az Örök Kanna | 260 | 0/12/0/12 | méreg ×0 | Égés, Méreg, Átok, Védelem−, Alvás, Fagyás, Kábulat, Eltűnt |  |
| Triplapresszó, az Ősgólem **FŐ** | 1500 | 21/17/17/13 | jég ×1.5, villám ×1.5, méreg ×0, tűz ×0.6 | Kábulat, Fagyás, Alvás, Méreg | Bögreököl (1 hős, fegyver, 1.2); Forró gőz (minden hős, tűz, 0.8, Égés 30% eséllyel, 3 kör); Dupla presszó (1 hős, tűz, 1.3, Égés 40% eséllyel, 3 kör) |
| Öreg Matcha-gólem **FŐ** | 2380 | 23/22/15/18 | villám ×1.6, fegyver ×1.2, tűz ×0.4, víz ×0.4, méreg ×0 | Kábulat, Fagyás, Alvás | Csészecsapás (1 hős, fegyver, 1.35); Forró hab (minden hős, víz, 0.7, Habos 50% eséllyel, 1 kör); Habvihar (minden hős, víz, 1, Habos 70% eséllyel, 1 kör) |

## 7. Harcrendszer és szabályok

### Csata menete
- Körökre osztott: **2 hős / 2 ellenfél váltakozva** lép (nem gyorsaság szerinti teljes sorrend). Csatában 4 hős van, a többi pihen (a térkép „Csapat” gombjával cserélhető). Az ellenséges MI legfeljebb kétszer egymás után támadja ugyanazt a hőst.
- **Parancsok:** alaptámadás, képességek (MP-be kerülnek, egyeseknek várakozási ideje van), limit, páros/közös támadás, idézés, tárgyak, védekezés.
- **Sebzésképlet:** `sebzés = (erő vagy mágia) × képesség-erő × 2,2 × 50 / (50 + 2 × védelem vagy ellenállás)`, majd elem-szorzó, 10% kritikus (×1,5, csak fizikai), védekezés ×0,5, ±10% véletlen.
- **Ellenséges ütés a hősre:** ×1,5 (38. kör, hogy legyen tét) × 0,75 (52. kör); **egy ütés legfeljebb a hős max. életerejének 40%-át** viheti el (mindenkire ható: 30%), minibossz 55%/40%, főellenség 65%/50% – így nincs egy csapásos kiütés teli életerőről.
- **Elemek:** tűz, jég, villám, fény, sötétség, méreg, víz, természet, föld, rozsda, fegyver (fizikai), tiszta, semleges. Gyengeség = nagyobb sebzés + „GYENGE PONT!” felirat; egyes ellenfeleket a saját elemük **gyógyít**.
- **Állapotok (33):** égés, méreg, átok, erő+, védelem+, védelem−, alvás, fagyás, gyorsítás, provokáció, kábulat, visszaverés, összpontosítás, gát, vudu, védővarázs, eltűnés (Fekete lyuk), kőbőr, újjászületés, zsugorítás, füstölő, kristálypajzs, járvány, óriásnövesztés, forrázás, hab, némítás, bambuszfal, páncél, kőfal, harmat, átváltoztatás, zselékocka. Szabály: erősítés/gyengítés 1 körig tart; a méreg nem hat a gépekre és a mérgező lényekre.
- **Limit:** sebzés kapásakor/okozásakor töltődik (a 49. körben felére lassítva); 100%-nál a hős limitje használható.
- **Mesterfok:** egy képesség 3. használata után (fejezetenként) ★ – +30% erő, látványosabb animáció.
- **Kombó:** egymás utáni találatok ×n, +15%/láncszem, max +45% (csak 4 hőstől).
- **Visszavágás:** 15% eséllyel a megütött hős visszaüt.
- **Töltött támadás:** a 2. körtől az ellenfél 16% (főellenség 30%) eséllyel erőt gyűjt (vörös izzás, ⚠ NAGY ÜTÉS), a következő körben dupla erővel üt; megszakítható gyengeség-elemmel, limittel vagy nagy sebzéssel.
- **Elit ellenfél:** csatánként legfeljebb 1 (18%, nem főellenség-pályán): ÉP ×1,5, dupla arany/XP, tulajdonság: Páncélos / Tüskés / Gyógyuló / Robbanó.
- **Csatakihívás** (bal fent 🎯): pl. 3 kör alatt, senki ne essen el, 2 gyenge pont, tárgy nélkül → plusz arany.
- **Időjárás** a pálya témája szerint (eső, hó, hamu, homok, levél, csillagos éj, köd) – hat az elemekre (pl. esőben víz+villám erősebb, tűz gyengébb; ködben 12% mellé).
- **Pálya-események** minden 2. kör végén (gőzkitörés, kidőlő bambusz, kőomlás) – bárkit eltalálhat, de sosem öl.
- **Dühfázis:** a főellenség fél életnél feldühödik (izzó repedések a figurán, ×1,25 erő). Egyes főellenségeknek saját fázisai vannak (pl. Vén Tölgy 3 fázis, Morcus, Kamilla 2. fázis).
- **Fénypajzs/Kristálypajzs:** 1 körig minden ellenséges támadást visszaver/kivéd.
- **Életerőbe kerülő képességek** (Zúzás, Vérszomj, Kőhullám, Meteorököl, Magmakitörés, Sötét alku, Mana-tea): az ár sosem öl meg (legfeljebb 1 ÉP-ig von le), és a gomb szürke („Kevés ÉP”), ha a használat után a hősnek a max. életereje 20%-ánál kevesebb maradna (53. kör).
- **Állapot-levétel szétválasztva (53. kör):** Lili *Tisztítás*a a test bajait veszi le (égés, méreg, átok, védelem−, fagyás, forrázás, őrület, zselékocka) és 1 körig ellenük véd; Jázmin *Ébresztő tea*ja az elme bajait (alvás, kábulat, némaság), és 1 körig „Éber” (nem lehet elaltatni/elkábítani/elnémítani). A habot Kaelen veszi le.

### Nehézségi szintek (az 52. kör után)
| Szint | Ellenfél élete | Ellenfél ereje | Egyéb |
|---|---|---|---|
| Könnyű | ×0,81 | ×0,88 | kevesebb arany (−40%), a gyenge pont mindig jelezve |
| Normál | ×1,35 | ×1,2 | 2–3. térképen (szint ≥31) +10%; főellenség ÉP ×1,45 |
| Nehéz | ×1,8 | ×1,6 | főellenség ÉP ×1,3; 4+ csatás pályán a 3. csatától ×0,85 |

Normálon és Nehézen: főellenség ereje ×1,1, minibossz ÉP ×1,15; 3. térkép (szint ≥60, Normál/Nehéz) ÉP ×1,35, erő ×1,25. Az ellenfelek szintenként erősödnek (30. szint fölött lassabban).

### Tapasztalat és szint
- Minden hős ugyanannyi tapasztalatot kap (a pálya ellenfeleinek összege). Szükséges XP: `30 × szint^1,5 + 20`.
- **Igazítás a csapat szintjéhez (52. kör):** cél = pálya szintje +1; a cél fölött szintenként −33%, alatta +33% (max ×1,5); 3 szinttel a cél fölött nincs XP; egy győzelem legfeljebb pálya+3-ig emel; a szintplafonon nem gyűlik XP.
- Később csatlakozó hős a csapat szintjén érkezik.

### Bolt, felszerelés, tárgyak
- Képességek hősönként a csatlakozástól a 12-1-ig egyenletesen nyílnak; az ár a pálya bevételének ~42%-a (lásd 4. fejezet táblázatai). A később csatlakozó hős néhány képességet alapból kap.
- Felszerelés: fegyver + ruha, 3 fokozat (300/900/2000), a figurán is látszik a fejlesztés.
- Tárgyak (bolt): Dobótőr 50, Tűzbomba 130 (1-2 után), Gyógyital 40 (80 ÉP), Éter 60 (MP), Főnixtoll 120 (feltámaszt), Nagy gyógyital 150 (a csapat 60%-a, 2-1 után), Limit-ital 220 (2-1), Élet-elixír 450 (2-4), Elixír 500 (az egész csapat limitje tele, 3-1). Minden pálya végén +1 Gyógyital.
- Arany: ellenfelekből, csatakihívásból, napi kihívásból (+500), titkos pályák kincséből (3000 / 5000).

### Egyéb játékelemek
- **Térkép:** 3 térképlap (I–III. rész), pontozott utak, pályapöttyök; titkos pályák (X-1 Az Elfeledett Pörkölő a 4-4 után, X-2 Az Ősi Habverő-műhely).
- **Képregény:** prológus + 12 fejezet, fejezetenként 3 festett panel szövegbuborékokkal.
- **Párbeszédek** minden pálya elején/végén, főellenség-bevezető (közelítés, nagy név), fejezetvégi szöveg, stáblista a 8-4 és a 12-4 után („második rész vége”, „vége”).
- **Napi kihívás** (⭐): a dátumból sorsolt ellenfél-csapat, naponta egyszer +500 arany.
- **Bestiárium** (📖): legyőzött ellenfelek, legyőzések száma, gyengeségek.
- **Új játék+** a végén; **3 mentőhely**; sebesség 1×/2×/3×; zene/hang ki-be; nehézség a beállításokban.
- **Próbaterem** (tesztmód, kód: KAVE): bármely hős bármely képessége, bármely ellenfél támadása, idézések kipróbálása. A tesztlap „Megnézem a játékban” gombja ide visz (`index.html?proba=hero:witch:eclipse` stb.).
- **Telefon:** álló és fekvő elrendezés, kezdőképernyős app (iPhone), éles képek (devicePixelRatio max 3).

## 8. Grafika és hang
- Minden figura és effekt **festett kép** (Canva AI-képgenerálás, kisebb részben Higgsfield), fehér háttérből kivágva, webp-ben a játékba ágyazva (431 kép). Figuránként több póz (alap, támadás, varázslás, sérülés, felszerelt változat).
- Animáció: a figurák képe mozog/torzul (bábu-testrészek: kar, farok, nyelv nyúlik), festett effektképek repülnek, részecskék, fényvillanások, rázkódás, lassítás a becsapódásnál.
- Hang: CC0 hangeffektek és zenék (térkép, csata, főellenség, győzelem), lásd `hang/FORRASOK.md`.

## 9. Egyensúly-mérés (52. kör, automatikus végigjáték)
Gépi játékos új játékot kezd, valódi XP-t és aranyat kap, mindig a legolcsóbb elérhető dolgot veszi meg a boltban, okosan harcol (gyógyít <40%-nál, feltámaszt, limitet használ, a legnagyobb várható sebzést választja), **gyógyitalt nem használ, nem gyűjtöget vissza**, pályánként legfeljebb 3 próbát tesz.

| Változat | Eredmény |
|---|---|
| Javítás előtt | a hősök szintje elszaladt (7-1: +8 szint, a 9-1 előtt egyszerre 60→78, a 10-1-től 90-es hős 64-es pályán); a 3. térkép minden csatája 1 kör volt; Normálon semmi kihívás |
| Végső, Normál | minden pálya megnyerhető; főellenségeknél a csapat életerejének 12–48%-a marad; a 4-3 (Démonkirály) az egyik futásban 3 próbára sem ment; a hősszint végig pálya+2 körül |
| Végső, Nehéz | 2-4 (Rozsdakirály) és 4-4 (Morcus) 3 próbára sem ment; 1-3, 3-1, 3-4 a 2–3. próbára; a vége (3. térkép) kiegyensúlyozott |

A tervező szándéka: legyen kihívás, nem baj, ha valamit nem nyer meg elsőre (vissza lehet menni aranyat gyűjteni, képességet venni).

## 10. Technikai felépítés
- **Egyetlen HTML-fájl** (`game.html`, ~35 MB, minden kép és hang base64-ben); a GitHub Pages a könnyített `index.html` + `kepek/` mappát mutatja (a `kisebb.py` készíti). Vanilla JavaScript, Canvas 2D, nincs keretrendszer.
- **Build-ellenőrzés (53. kör):** a `game.html`-ben a beillesztett blokk pontosan a 62 rétegfájl összefűzése, a jelölők egyszer szerepelnek, nincs dupla vagy elárvult réteg; az `r19z.js` (általános hangréteg) szándékosan utolsó, más réteg definícióját nem írja felül. Legtöbbször felülírt animációk: farokcsapás (9 réteg), Levéltánc, Tusátok (8), Teafröccs, Teaszertartás, Habáradat (7).
- **Rétegzett felülírások:** az alapkód fölé körönként új fájlok kerülnek (`forras/r10a.js … r21zi.js`), amelyek függvényeket burkolnak vagy cserélnek (pl. `calcDmg`, `victory`, `mkEnemy`, `A.<animáció>`). A későbbi réteg felülírja a korábbit. Kockázat: régi rétegek „átütnek”, ha egy új javítás nem a legutolsó definíciót írja felül.
- **Mentés:** localStorage (3 hely), JSON (hősök, arany, tárgyak, teljesített pályák, mesterfok, megvett közös támadások).
- **Tesztelés:** Playwright-szkriptek (`forras/eszkozok/`): minden képesség/limit (`all.js`), minden ellenséges támadás (`foe.js`), idézések (`sumall.js`), minden pálya automatikus végigjátszása (`camp.js`), képsorok lassított rögzítése, valósághű egyensúly-végigjáték (`bal.js`), képi önellenőrzés (fehér foltok, hiányzó képek, NaN koordináták, végállapot).
- **Tesztlap:** külön oldal, ahol a tervező pontonként jelöli (Jó / Nem jó + megjegyzés + kép), ebből készülnek a javítási körök (eddig 52 kör, ~250 megjegyzés).

## 11. Ismert nyitott ügyek
- A tesztlapon ~100 kipróbálatlan pont gyűlt össze (főleg animációk, a 49–51. kör javításai).
- **Ellenőrizve (53. kör, iPhone 13 méret, álló és fekvő):** térkép, Bestiárium (számlálás, 81 ellenfél), Napi kihívás (indul, +500 arany naponta egyszer), bolt, csatamenü – vízszintes kilógás nincs, JS-hiba nincs. Talált és javított hiba: fekvő telefonon a Bestiáriumból nem lehetett kilépni (most „✕ Vissza a térképre” felül). Fekvőben a csatamenü alsó gombjai (Védekezés, Idézés) és a térkép-panel alja görgetéssel érhető el.
- A Mochi szája fehér (lehet szándékos, lehet háttérmaradék).
- A 3. térkép sima pályái Normálon még viszonylag könnyűek (a csapat 60–80%-a megmarad).
- A `game.html` mérete (~35 MB) – a telefonos betöltéshez a könnyített `index.html` kell.

## 12. A fejlesztő eddigi ötletei (véleményezésre)
- **Végjáték:** főellenség-roham (mind egymás után), végtelen torony, erősebb Új játék+.
- **IV. rész:** új világ, új hős, új ellenfelek (a III. rész mintájára).
- **Gyűjtögetés:** teljesítmények, kitűzők, „minden ellenfél legyőzve” jutalom.
- **Bemutató:** videós előzetes, plakát.
