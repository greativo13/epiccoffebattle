
// ===== 22. kör: III. rész – A Zöld Habok Völgye (Matcha-föld), 9–12. fejezet, Kaelen =====
// Terv: KAMPANY3.md. Chasen indítéka (javítva, mert Kamilláé volt a „túl hangos világ”): a világ elfelejtette megízlelni, amit iszik – ezért elvette az ízeket, amíg újra meg nem tanulják.
const MATCHA='150,210,110',FOAM='225,245,200',MOSAIC='120,170,200',JADE='90,190,140';

// ---- Habosítás: új állapot (a hősökre kerül, 1 kör): −30% fizikai sebzés, ×1,5 tűz és villám; Mohapárna / Tisztítás / tűz- vagy villámtalálat leszedi
STATUS.foam=['Habos','#c8f0a0'];
if(typeof ONE_ROUND!=='undefined')ONE_ROUND.add('foam');
{const h0=hit;hit=function(u,t,sk){try{if(t&&t.st&&t.st.foam&&sk){const el=sk.elem||'phys';
    if(el==='fire'||el==='thunder'){t._foamMul=1.5;delete t.st.foam;popLabel(t,'A HAB ELPÁROLGOTT!','#ffe08a');}else if(el==='phys'||sk.kind==='phys')t._foamMul=.7;}}catch(e){}
  try{return h0.apply(this,arguments);}finally{if(t)t._foamMul=null;}};}
{const cd0=calcDmg;calcDmg=function(u,t,sk){const r=cd0.apply(this,arguments);if(t&&t._foamMul&&typeof r==='number')return Math.round(r*t._foamMul);if(t&&t._foamMul&&r&&typeof r.dmg==='number'){r.dmg=Math.round(r.dmg*t._foamMul);}return r;};}

// ---- Ellenfél-támadások
Object.assign(ESK,{
  whiskfoam:{name:'Habverés',tgt:'enemy',kind:'mag',pow:.9,elem:'water',anim:'eproj',rgb:FOAM,size:12,status:['foam',.8,1]},
  bambooswipe:{name:'Bambuszpálca',tgt:'enemy',kind:'phys',pow:1.15,elem:'phys',anim:'melee'},
  mochibind:{name:'Ragacsos ölelés',tgt:'enemy',kind:'phys',pow:1.0,elem:'phys',anim:'hop',status:['stun',.3,1]},
  mochibounce:{name:'Mochi-ugrás',tgt:'enemy',kind:'phys',pow:1.3,elem:'phys',anim:'hop'},
  vinewhip:{name:'Bambuszostor',tgt:'enemy',kind:'phys',pow:1.2,elem:'nature',anim:'tongue'},
  coilsnap:{name:'Rátekeredés',tgt:'enemy',kind:'phys',pow:1.0,elem:'phys',anim:'nibble',status:['stun',.35,1]},
  leafmend:{name:'Teafalevél-gyógyítás',tgt:'ally',kind:'heal',pow:1.4,anim:'heal'},
  tealeaf:{name:'Levélzápor',tgt:'enemies',kind:'mag',pow:.7,elem:'nature',anim:'erain',rgbs:[MATCHA,'190,230,140'],shape:'leaf'},
  mosaicshot:{name:'Mozaiklövés',tgt:'enemy',kind:'mag',pow:1.15,elem:'earth',anim:'eproj',rgb:MOSAIC,size:10},
  stoneguard:{name:'Kőőrség',tgt:'self',kind:'buff',buff:['defUp',1],anim:'ebuff',rgb:'180,170,150'},
  rebuild:{name:'Összeállás',tgt:'self',kind:'heal',pow:1.2,anim:'heal'},
  mosaicflick:{name:'Mozaikszilánkok',tgt:'enemies',kind:'mag',pow:.65,elem:'earth',anim:'erain',rgbs:[MOSAIC,'230,200,140'],shape:'streak'},
  gravelrain:{name:'Kavicseső',tgt:'enemies',kind:'phys',pow:.75,elem:'earth',anim:'erain',rgbs:['170,160,140','120,110,95'],shape:'rock'},
  meditate:{name:'Meditáció',tgt:'self',kind:'buff',buff:['defUp',1],anim:'ebuff',rgb:'240,230,190'},
  crowpeck:{name:'Csőrcsapás',tgt:'enemy',kind:'phys',pow:1.2,elem:'phys',anim:'nibble'},
  zenroar:{name:'Kőzúgás',tgt:'enemies',kind:'phys',pow:.9,elem:'earth',anim:'esweep',rgb:'190,180,160'},
  cupslam:{name:'Csészecsapás',tgt:'enemy',kind:'phys',pow:1.35,elem:'phys',anim:'smash'},
  hotfoam:{name:'Forró hab',tgt:'enemies',kind:'mag',pow:.7,elem:'water',anim:'steam',status:['foam',.5,1]},
  scaldmist:{name:'Forró gőz',tgt:'enemies',kind:'mag',pow:.7,elem:'fire',anim:'steam',status:['burn',.3,3]},
  steamjet:{name:'Gőzsugár',tgt:'enemy',kind:'mag',pow:1.2,elem:'fire',anim:'eproj',rgb:'235,245,240',size:12},
  cupthrow3:{name:'Csészehajítás',tgt:'enemy',kind:'phys',pow:1.2,elem:'phys',anim:'eproj',rgb:'230,240,220',size:10},
  shardfan:{name:'Szilánklegyező',tgt:'enemies',kind:'phys',pow:.6,elem:'phys',anim:'erain',rgbs:['230,240,220','255,255,255'],shape:'streak'},
  gongstrike:{name:'Gongütés',tgt:'enemies',kind:'mag',pow:.6,elem:'none',anim:'esweep',rgb:'240,200,90',silence:true},
  tonguelash:{name:'Nyelvcsapás',tgt:'enemy',kind:'phys',pow:1.4,elem:'phys',anim:'tongue'},
  bamboojump:{name:'Bambuszugrás',tgt:'enemy',kind:'phys',pow:1.6,elem:'phys',anim:'hop'},
  ceremonyfoam:{name:'Szertartás-hab',tgt:'enemies',kind:'mag',pow:.6,elem:'water',anim:'steam',status:['foam',.6,1]},
  mpsip:{name:'Kortyintás',tgt:'enemy',kind:'mag',pow:.9,elem:'nature',anim:'gaze',mpDrain:12},
  calmword:{name:'Megbékítő szó',tgt:'enemy',kind:'mag',pow:.8,elem:'holy',anim:'esweep',rgb:'255,240,200',status:['sleep',.45,1]},
  lilimend:{name:'Lili gyógyítása',tgt:'ally',kind:'heal',pow:1.8,anim:'heal'},
  whiskstorm:{name:'Habvihar',tgt:'enemies',kind:'mag',pow:1.0,elem:'water',anim:'steam',status:['foam',.7,1]},
  eternalzen:{name:'Örök Zen',tgt:'enemies',kind:'mag',pow:.5,elem:'none',anim:'esweep',rgb:'220,240,200',status:['sleep',.7,1]},
});

// ---- Ellenfelek (a képük kepek/<típus>.webp; amíg nincs, egy hasonló meglévő ellenfél képét kölcsönzik)
Object.assign(EN_DEF,{
  whiskimp:{name:'Habverő-manó',hp:120,atk:13,def:9,mag:14,res:11,xp:230,h:125,w:100,lift:6,elem:{fire:1.6,phys:1.3,nature:.4,water:.6},skills:[['whiskfoam',3],['bambooswipe',2]],acts:()=>2,info:'Kétszer lép, és habot ver a hősökre (Habos: fizikai sebzés −30%, de a tűz és a villám másfélszeresen fáj).'},
  mochi:{name:'Mochi-nyálka',hp:150,atk:14,def:13,mag:8,res:12,xp:240,h:80,w:96,lift:0,elem:{fire:1.6,holy:1.4,phys:.5,poison:0},statusImmune:['poison'],skills:[['mochibind',2],['mochibounce',3]],info:'Ragacsos rizsgombóc: a fegyver beleragad (fizikai sebzés fele). Tűz és fény ellen gyenge. A méreg nem árt neki.'},
  bambsnake:{name:'Bambuszkígyó',hp:170,atk:17,def:11,mag:9,res:10,xp:255,h:110,w:120,lift:0,elem:{fire:1.6,ice:1.2,nature:.4},skills:[['vinewhip',3],['coilsnap',2]],info:'Rátekeredik és elkábít. A tűz fáj neki.'},
  dryad:{name:'Teafa-dryád',hp:185,atk:10,def:10,mag:18,res:16,xp:265,h:195,w:110,lift:0,elem:{fire:1.6,ice:1.3,nature:.3},skills:[['leafmend',2],['tealeaf',3]],info:'Gyógyítja a társait – őt üsd először! Tűz és jég ellen gyenge.'},
  mochiking:{name:'Mochi-király',hp:1900,atk:22,def:17,mag:16,res:16,xp:7000,h:200,w:230,lift:0,scale:1.1,boss:true,speaker:'Mochi-király',statusImmune:MACHINE_IMMUNE,
    elem:{fire:1.5,holy:1.4,phys:.6,poison:0},skills:[['mochibounce',3],['mochibind',2]],
    info:'Félig elfogyva kettéválik (két Mochi-nyálka ugrik ki belőle). A fegyver beleragad; tűz és fény fáj neki.'},
  stoneguard:{name:'Kőőr',hp:220,atk:18,def:20,mag:8,res:10,xp:280,h:130,w:90,lift:0,elem:{thunder:1.5,earth:1.4,phys:.5,poison:0},statusImmune:['poison','sleep'],skills:[['stoneguard',1],['bambooswipe',3]],info:'Kavicsokból áll össze. A villám és a föld szétveri. A fegyver alig fog rajta.'},
  mosaicghost:{name:'Mozaik-szellem',hp:160,atk:8,def:9,mag:19,res:16,xp:270,h:120,w:90,lift:24,elem:{holy:1.7,thunder:1.2,phys:.3},evade:.25,skills:[['mosaicshot',3],['mosaicflick',2]],info:'Színes mozaikdarabkákból álló szellem. A fegyver alig éri, a fény szétszórja.'},
  zencrow:{name:'Szerzetes-varjú',hp:140,atk:15,def:9,mag:12,res:12,xp:260,h:120,w:110,lift:30,elem:{thunder:1.6,ice:1.2},skills:[['crowpeck',3],['meditate',1]],info:'Meditál (védelem nő), de a villám átüti.'},
  zendragon:{name:'Zen-Kavics Sárkány',hp:2100,atk:23,def:20,mag:20,res:17,xp:7600,h:240,w:300,lift:0,scale:1.05,boss:true,speaker:'Zen-Kavics Sárkány',statusImmune:MACHINE_IMMUNE,
    elem:{ice:1.5,nature:1.4,fire:.5,dark:.5,poison:.3},skills:[['gravelrain',3],['zenroar',2],['meditate',1]],
    info:'Kavicsokból épül. Meditáció közben alig sebződik – a villám átüti. Jég és természet ellen gyenge.'},
  matchagolem:{name:'Matcha-gólem',hp:250,atk:20,def:18,mag:12,res:14,xp:300,h:150,w:120,lift:0,elem:{thunder:1.6,phys:1.2,fire:.5,water:.5,poison:0},statusImmune:['poison','sleep'],skills:[['cupslam',3],['hotfoam',2]],info:'Kerámiatest: a villám szétreped. Forró habot fröcsköl a hősökre.'},
  steamwraith:{name:'Gőzkád-szellem',hp:180,atk:8,def:8,mag:20,res:17,xp:285,h:120,w:100,lift:26,elem:{ice:1.7,fire:.3,water:.4,phys:.6},evade:.3,evadeUnless:'ice',skills:[['scaldmist',2],['steamjet',3]],info:'Gőzből van: a fegyver elől kitér, a jég mindig eltalálja.'},
  cupwarrior:{name:'Csészeharcos',hp:200,atk:19,def:15,mag:8,res:10,xp:290,h:110,w:90,lift:0,elem:{phys:1.4,thunder:1.3,water:.5,poison:0},statusImmune:['poison'],skills:[['cupthrow3',3],['shardfan',2]],info:'Kerámiacsészéket hajít. A fegyver és a villám töri.'},
  frogking:{name:'Bambusz-békakirály',hp:2200,atk:24,def:18,mag:19,res:17,xp:8200,h:230,w:230,lift:0,scale:1.05,boss:true,speaker:'Bambusz-békakirály',statusImmune:MACHINE_IMMUNE,
    elem:{fire:1.5,thunder:1.4,water:.4,poison:.2},skills:[['tonguelash',3],['bamboojump',2],['gongstrike',2]],
    info:'Gongütése után egy körig csak alaptámadás lehetséges. Tűz és villám ellen gyenge.'},
  teamaster:{name:'Teaszertartás-mester',hp:260,atk:12,def:13,mag:21,res:19,xp:320,h:150,w:90,lift:0,elem:{ice:1.5,thunder:1.2,nature:.4},skills:[['ceremonyfoam',2],['mpsip',3]],info:'Habot ver a csapatra és MP-t kortyint el.'},
  lilicalm:{name:'Lili (megbékítve)',hp:900,atk:4,def:12,mag:16,res:20,xp:0,gold:0,h:150,w:90,lift:40,elem:{},statusImmune:['poison','curse'],skills:[['lilimend',3],['calmword',2]],noKill:true,
    info:'Nem ellenség: Chasen megbékítette. Nem hal meg – ha az életereje elfogy, felébred.'},
  chasen:{name:'Chasen, a Békemester',hp:2400,atk:24,def:19,mag:25,res:20,xp:12000,h:250,w:120,lift:0,scale:1.15,boss:true,speaker:'Chasen',statusImmune:MACHINE_IMMUNE,
    elem:{ice:1.5,thunder:1.4,nature:.3,poison:0},skills:[['whiskstorm',3],['calmword',2],['mpsip',2]],
    info:'Habot ver mindenkire. Fél életerő alatt az Örök Zen-re készül: elaltatja a csapatot. Jég és villám ellen gyenge.'},
  oldgolem:{name:'Öreg Matcha-gólem',hp:2800,atk:27,def:22,mag:18,res:18,xp:15000,h:250,w:200,lift:0,scale:1.15,boss:true,speaker:'Öreg Matcha-gólem',statusImmune:MACHINE_IMMUNE,
    elem:{thunder:1.6,phys:1.2,fire:.4,water:.4,poison:0},skills:[['cupslam',3],['hotfoam',2],['whiskstorm',2]],
    info:'A legelső habverő-műhely őre. Erősebb Chasennél – a villám a gyengéje.'},
});
// ideiglenes képkölcsön, amíg a saját kép elkészül (ha van saját kép az IMG_SRC-ben, azt használja)
{const BORROW={whiskimp:'teaimp',mochi:'slime',bambsnake:'bamboo',dryad:'teaimp',mochiking:'slime',stoneguard:'cgolem',mosaicghost:'ghost',zencrow:'moth',zendragon:'espresso',matchagolem:'koffgolem',steamwraith:'steamwisp',cupwarrior:'cupsoldier',frogking:'frog',teamaster:'mandarin',lilicalm:'fairy',chasen:'kamilla',oldgolem:'ancient'};
 for(const t in BORROW)if(!(typeof IMG_SRC==='object'&&IMG_SRC[t]))SPR_ALIAS[t]=BORROW[t];}
// rajzolás: képből (a fehér hátteret a betöltő levágja); amíg nincs kép, színes folt
for(const t of ['whiskimp','mochi','bambsnake','dryad','mochiking','stoneguard','mosaicghost','zencrow','zendragon','matchagolem','steamwraith','cupwarrior','frogking','teamaster','lilicalm','chasen','oldgolem'])
  DRAW[t]=e=>enemySpriteDraw(blobDraw('150,210,110'),(typeof IMG_SRC==='object'&&IMG_SRC[t])?t:(SPR_ALIAS[t]||t))(e);
// Lili (megbékítve) nem hal meg: 0 életerőnél felébred és kilép a csatából
{const d0=die;die=function(t){if(t&&t.type==='lilicalm'&&!t._woke){t._woke=true;t.hp=1;popLabel(t,'LILI FELÉBREDT!','#ffe9a0');t.alive=false;t.alpha=1;tween(600,k=>{t.alpha=1-k;t.jump=k*80;});return;}return d0.apply(this,arguments);};}

// ---- Kaelen, a druida (6. hős) – a 9-2 pálya után csatlakozik
HERO_DEF.druid={name:'Kaelen',cls:'Druida',color:'#7fd36a',hp:92,mp:56,atk:12,def:10,mag:14,res:12,spd:12,h:216,w:84,lift:0,pos:[338,398],hand:[52,-200],skills:['mosspillow','barkskin']};
HERO_TYPES.push('druid');DRAW.druid=e=>drawHeroSprite(e,'druid');JOIN.druid='9-2';
JOIN_TEXT.druid='Kaelen, a bambuszerdő druidája veletek tart: Chasen az ő erdejét is elnémította. Bambuszbottal üt, mohapárnával gyógyít, élő kéreggel véd, és ha kell, vadállattá változik. A térkép „Csapat” gombjával választhatod ki, ki pihen.';
ATTACKS.druid={name:'Bambuszcsapás',kind:'phys',pow:1.15,elem:'nature',anim:'melee',tgt:'enemy',basic:true,pierce:.5};
Object.assign(SK,{
  mosspillow:{name:'Mohapárna',mp:10,cd:0,tgt:'ally',kind:'heal',pow:1.2,anim:'heal',buff:['incense',2],cleanseFoam:true,desc:'Egy társ alatt mohaszőnyeg nő: kicsit gyógyít, és 2 körig minden kör végén tovább gyógyul. Leszedi a Habosítást.'},
  barkskin:{name:'Élő Bambuszkéreg',mp:18,cd:2,tgt:'ally',kind:'buff',buff:['stone',1],anim:'stoneFx',desc:'Egy társ köré bambuszkéreg nő 1 körre: a fizikai és földsebzés jóval kisebb.'},
  wildshape:{name:'Vad Alakváltás',mp:18,cd:2,tgt:'enemy',kind:'phys',pow:1.4,elem:'nature',anim:'wildshape',desc:'Kaelen véletlenszerűen (25–25–25–25%) állattá változik 1 körre: medve (területi csapás), sas (gyors szélvihar), teknős (magára vonja a támadásokat), vipera (méreg + kábítás).'},
  thornroot:{name:'Gyökércsapda',mp:14,cd:1,tgt:'enemies',kind:'mag',pow:.9,elem:'nature',anim:'vines',status:['stun',.25,1],desc:'Gyökerek törnek fel minden ellenség alatt, 25% eséllyel gúzsba kötik őket.'},
});
LIMITS.druid={name:'Bambusz-gólem',tgt:'enemies',kind:'phys',pow:2.5,elem:'nature',anim:'vines',isLimit:true,desc:'A földből óriási bambuszgólem nő ki, végigtapos az ellenségeken, és bambuszfalat emel a csapat elé.'};
SHOP_SKILLS.druid=[['wildshape','9-2',4600],['thornroot','9-3',4800]];
if(typeof GEAR_NAME==='object')GEAR_NAME.druid=['Bambuszbot','Kéregpáncél'];
// Vad Alakváltás: a négy forma
A.wildshape=async(u,ts,sk)=>{const t=ts[0];const f=pick(['bear','eagle','turtle','viper']);const N={bear:'MEDVEFORMA!',eagle:'SASFORMA!',turtle:'TEKNŐSFORMA!',viper:'ÁTOKVIPERA!'}[f];
  popLabel(u,N,'#9be07a');sfx('roar');await bodyWind(u,240,.12);
  if(f==='bear'){for(const e of S.enemies.filter(x=>x.alive)){hit(u,e,{...sk,name:'Medvecsapás',pow:1.1,tgt:'enemies'});}shake(14);}
  else if(f==='eagle'){addStatus(u,'haste',1);if(t&&t.alive)hit(u,t,{...sk,name:'Szélvihar',pow:1.5,pierce:.5});}
  else if(f==='turtle'){addStatus(u,'taunt',1);addStatus(u,'defUp',1);}
  else{if(t&&t.alive){hit(u,t,{...sk,name:'Viperamarás',pow:1.0,status:['poison',1,3]});if(Math.random()<.4)addStatus(t,'stun',1);}}
  await bodySettle(u);};

// Lili a 9. fejezettől a 12-3 pályáig nincs a csapatban (Chasen megbékítette)
function liliAway(){return !!(S.save&&S.save.cleared&&S.save.cleared.includes('8-4')&&!S.save.cleared.includes('12-3'));}
{const sp=syncParty;syncParty=function(){const r=sp.apply(this,arguments);try{if(liliAway()&&S.heroes.some(h=>h.type==='fairy')){const all=joinedRoster(),b=benchOf&&benchOf();
    S.heroes=all.filter(h=>h.type!==b).slice(0,4);if(S.heroes.length<4)S.heroes=all.slice(0,4);for(const h of S.heroes){h.x=h.d.pos[0];h.y=h.d.pos[1];}buildHUD();}}catch(e){console.error(e)}return r;};}

// ---- Fejezetek és pályák
const R22_LV=(id,name,theme,elvl,battles,o={})=>({id,name,theme,elvl,battles,...o});
ZONES.push({id:9,name:'Habos Bambuszosok',chapter:'IX. fejezet: Habos Bambuszosok',
  chIntro:'Fél év telt el. Morcus és Kamilla teaháza a legnépszerűbb hely Mesevölgyben – egészen egy reggelig, amikor a kávé, a tea, még Grog sütije is ízetlen. A pult alatt egy bambusz habverő és egy cetli: „Lassan. Figyelmesen. Ízlelve. – Ch.” Lili előrerepült a matcha-völgybe, hogy beszéljen vele. Nem tért vissza.',
  chEnd:'A Mochi-király szétfolyik, és a bambuszerdő újra susog. Kaelen szerint Chasen a hegy fölötti Kőmozaik Szentélyben meditál – és Lili ott ült mellette, mosolyogva, csendben.',
  levels:[
    R22_LV('9-1','Matcha-patak','bamboo',62,[['whiskimp','whiskimp'],['whiskimp','mochi'],['mochi','whiskimp','mochi']],{intro:'Új vidék: a Habverő-manók habot vernek rátok. A habos hősnek a fegyver kevésbé fáj, a tűz és a villám viszont jobban – és le is égeti a habot.',
      start:[{who:'Zordon',text:'Ízetlen. A legjobb feketém is olyan, mint a langyos víz.'},{who:'Morgána',text:'Lili egy hete repült el. Azt mondta, csak beszélgetni megy.'},{who:'Grog',text:'Grog sütije olyan, mint a papír. Grog dühös.'},{who:'Jázmin',text:'Ez matcha-hab a patakon. Ilyet csak egy mester ver így.'}],
      end:[{who:'Jázmin',text:'A habverők fáradhatatlanok. Valaki nagyon sok teát akar elkészíteni.'}]}),
    R22_LV('9-2','Suttogó Bambuszos','bamboo',64,[['bambsnake','whiskimp'],['dryad','bambsnake'],['bambsnake','dryad','whiskimp']],{intro:'A Teafa-dryád gyógyítja a társait: őt érdemes először legyőzni. A Bambuszkígyó rátekeredik és elkábít.',
      start:[{who:'Morgána',text:'Csend van. Nem a jó fajta.'},{who:'Ismeretlen hang',text:'Ne lépjetek a mohára! Az erdő még alszik… ébren.'}],
      end:[{who:'Kaelen',text:'Kaelen vagyok, ennek az erdőnek a druidája. Chasen az én fáimat is elnémította: nem érzik az esőt, a napot, semmit.'},{who:'Zordon',text:'És a mi kávénkat. Mit akar ez a Chasen?'},{who:'Kaelen',text:'Azt mondja, a világ elfelejtette megízlelni, amit iszik. Mindenki kapkod, hörpint, rohan. Ezért elvette az ízeket – amíg meg nem tanulunk újra figyelni.'},{who:'Jázmin',text:'Ez… nem is teljesen butaság. Csak nagyon rossz módszer.'},{who:'Kaelen',text:'Veletek tartok. A tündéretek ott ül mellette, és mosolyog. Nem tetszik az a mosoly.'}]}),
    R22_LV('9-3','Mochi-tisztás','terrace',66,[['mochi','mochi','dryad'],['whiskimp','mochi','bambsnake'],['dryad','mochi','mochi']],{tag:'elit',intro:'A Mochi-nyálkákba beleragad a fegyver: tűzzel és fénnyel könnyebb. A dryádot üsd először.',
      start:[{who:'Kaelen',text:'Rizsgombócok. Ragacsosak, makacsok és meglepően harapósak.'},{who:'Grog',text:'Grog megeszi. …Grog nem eszi meg. Íztelen.'}],
      end:[{who:'Kaelen',text:'A tisztás túlsó végén a Mochi-király trónol. Ő őrzi a hegyre vezető ösvényt.'}]}),
    R22_LV('9-4','A Mochi-király','bamboo',68,[['mochi','mochiking','mochi']],{boss:true,slots:[[600,340],[770,470],[610,480]],intro:'A Mochi-király félig elfogyva kettéválik: két Mochi-nyálka ugrik ki belőle. Tűz és fény fáj neki, a fegyver beleragad.',
      start:[{who:'Mochi-király',text:'Lassabban! Rágjátok meg minden falatot! Harmincszor!'},{who:'Grog',text:'Grog egyszer rág. Grog gyors.'},{who:'Mochi-király',text:'Ezért nem érzitek az ízeket, barbárok!'}],
      end:[{who:'Mochi-király',text:'…Jó. Jó. Elég volt a rágásból. A Mester fent meditál. Mondjátok meg neki, hogy… a ragacs megbocsát.'}]}),
  ]});
ZONES.push({id:10,name:'Kőmozaik Szentély',chapter:'X. fejezet: A Kőmozaik Szentély',
  chIntro:'A hegy fölött zen-kertek húzódnak, ahol a kavicsok maguktól mozognak, és minden lépésnek súlya van. A túl sok varázslat felriasztja a mozaiksárkányokat – itt figyelmesen kell harcolni.',
  chEnd:'A Zen-Kavics Sárkány kövei szétgurulnak, és a kert újra csendes. A sziklafalban egy barlang nyílik: a Bambuszhabverők Barlangja, ahonnan matcha-gőz száll.',
  levels:[
    R22_LV('10-1','Gereblyézett Kert','mistpeak',70,[['stoneguard','zencrow'],['mosaicghost','stoneguard'],['zencrow','stoneguard','mosaicghost']],{intro:'A Kőőrön alig fog a fegyver – villámmal és földdel törd szét. A Mozaik-szellem a fény elől nem tud kitérni.',
      start:[{who:'Kaelen',text:'Itt minden kavics a helyén van. Vagy legalábbis oda akar menni.'},{who:'Morgána',text:'Az a kő most rám nézett.'}],
      end:[{who:'Jázmin',text:'Lili lábnyomai. Lassan, egyenletesen, mintha álmában járna.'}]}),
    R22_LV('10-2','Mozaikfolyosó','mistpeak',72,[['mosaicghost','mosaicghost','zencrow'],['stoneguard','mosaicghost','zencrow'],['zencrow','zencrow','stoneguard']],{intro:'A Szerzetes-varjak meditálnak: ilyenkor alig sebződnek, de a villám átüti a nyugalmukat.',
      start:[{who:'Zordon',text:'Ki rakta ki ezt a mozaikot? Ezer éve tart, és egy darab sem hiányzik.'},{who:'Kaelen',text:'Ne lépj rá. Ha egy darab hiányzik, a sárkány felébred.'},{who:'Grog',text:'…Grog már rálépett.'}],
      end:[{who:'Morgána',text:'Hallottátok? Mintha kövek fújtatnának.'}]}),
    R22_LV('10-3','Meditációs Csarnok','teahouse',74,[['zencrow','mosaicghost','zencrow'],['stoneguard','stoneguard','mosaicghost'],['mosaicghost','zencrow','stoneguard','zencrow']],{tag:'elit',intro:'Négy csata pihenő nélkül. Tartogasd a gyógyítást.',
      start:[{who:'Jázmin',text:'Itt tanultam meditálni, kisgyerekként. Akkor még volt íze a csendnek.'},{who:'Kaelen',text:'Most is van. Csak Chasen elzárta.'}],
      end:[{who:'Jázmin',text:'A csarnok mögött a kert szíve. Ott alszik a sárkány – vagy épp nem alszik.'}]}),
    R22_LV('10-4','A Zen-Kavics Sárkány','mistpeak',76,[['stoneguard','zendragon','stoneguard']],{boss:true,slots:[[600,340],[770,470],[610,480]],intro:'A sárkány meditál: ilyenkor alig sebződik, de a villám átüti. Jég és természet a gyengéje.',
      start:[{who:'Zen-Kavics Sárkány',text:'Lépteitek… zajosak. Gondolataitok… kapkodók. Ízleltétek valaha a csendet?'},{who:'Kaelen',text:'Ízleltük. Most a kávénkat szeretnénk.'},{who:'Zen-Kavics Sárkány',text:'Akkor tanuljatok meg várni.'}],
      end:[{who:'Zen-Kavics Sárkány',text:'…Türelmetlenek vagytok. De nem rosszak. A Mester a habverők barlangján túl lakik. A kis tündér… teát tölt neki.'},{who:'Morgána',text:'Lili? Teát tölt? Lili soha nem tölt teát. Lili kiönti.'}]}),
  ]});
ZONES.push({id:11,name:'Bambuszhabverők Barlangja',chapter:'XI. fejezet: Bambuszhabverők Barlangja',
  chIntro:'A barlangban kerámiacsészék sorakoznak, és gőzölgő matcha-kádak bugyognak. Valaki itt veri a habot az egész völgynek – ezer és ezer habverővel. A barlang végén gong szól.',
  chEnd:'A Bambusz-békakirály gongja elhallgat, és a kádak gőze eloszlik. A barlang kijárata felett felhőkbe vesző lépcső: a Matcha Ceremónia-palota.',
  levels:[
    R22_LV('11-1','Kerámia-folyosó','teahall',78,[['matchagolem','cupwarrior'],['cupwarrior','cupwarrior','whiskimp'],['matchagolem','whiskimp','cupwarrior']],{intro:'A Matcha-gólem kerámiatestét a villám szétrepeszti. A Csészeharcost a fegyver töri.',
      start:[{who:'Grog',text:'Sok csésze. Grog nem tör. …Grog egy kicsit tör.'},{who:'Kaelen',text:'Ezek nem csészék. Ezek őrök.'}],
      end:[{who:'Zordon',text:'Minden csészében ugyanaz a tea. Íztelen. Gondosan elkészítve, és íztelen.'}]}),
    R22_LV('11-2','Matcha-kádak','teahall',80,[['steamwraith','matchagolem'],['steamwraith','steamwraith','cupwarrior'],['matchagolem','steamwraith','whiskimp']],{intro:'A Gőzkád-szellem elől a fegyver gyakran kitér, de a jég mindig eltalálja.',
      start:[{who:'Jázmin',text:'Forróak. Ezekben főzik a völgy összes teáját.'},{who:'Morgána',text:'Ha beleesik valaki, az ízét is elveszi?'},{who:'Kaelen',text:'Ne próbáld ki.'}],
      end:[{who:'Jázmin',text:'A kádak mögött egy régi, lezárt ajtó. Rajta egy kopott habverő-címer.'}]}),
    R22_LV('11-3','Gongterem','teahall',82,[['cupwarrior','matchagolem','steamwraith'],['teamaster','cupwarrior'],['matchagolem','teamaster','steamwraith'],['teamaster','matchagolem','cupwarrior']],{tag:'elit',intro:'Négy csata pihenő nélkül. A Teaszertartás-mester habot ver a csapatra és MP-t kortyint.',
      start:[{who:'Kaelen',text:'Hallgassátok. Minden gongütés után egy kicsit csendesebb lesz minden.'},{who:'Grog',text:'Grog nem hallja. Grog túl hangos.'},{who:'Zordon',text:'Most az egyszer ez előny.'}],
      end:[{who:'Morgána',text:'A gong mögött valaki brekeg. Nagyon mélyen.'}]}),
    R22_LV('11-4','A Bambusz-békakirály','teahall',84,[['cupwarrior','frogking','steamwraith']],{boss:true,slots:[[600,340],[770,470],[610,480]],intro:'A Békakirály gongütése után egy körig csak alaptámadás lehetséges. Tűz és villám fáj neki.',
      start:[{who:'Bambusz-békakirály',text:'BREKK. Ki zavarja a gong csendjét?'},{who:'Grog',text:'Grog. Grog mindig zavar.'},{who:'Bambusz-békakirály',text:'Akkor a gong majd megtanítja hallgatni.'}],
      end:[{who:'Bambusz-békakirály',text:'BREKK… jó. A gongom a tiétek. Ha megkongatjátok, mindenki egy pillanatra elcsendesedik – és figyel.'},{who:'Kaelen',text:'A palota fent van, a felhők között. Chasen és Lili ott vár.'}]}),
  ]});
ZONES.push({id:12,name:'Matcha Ceremónia-palota',chapter:'XII. fejezet: A Matcha Ceremónia-palota',
  chIntro:'A felhők fölött áll a palota, kupolája mint egy hatalmas matcha-csésze. Itt készül a völgy utolsó, legtökéletesebb teája – az, amelyik végleg elveszi a világ ízeit, amíg meg nem tanulja becsülni őket.',
  chEnd:'Chasen leteszi a habverőt, és hosszú idő óta először belekóstol a saját teájába. Az íze visszatér – és vele minden íz Mesevölgyben. A teaház új pultot kap: reggel kávé, délben matcha, este kamilla. Kaelen a csapattal marad, Grog sütije pedig újra sütiízű.',
  levels:[
    R22_LV('12-1','Teaszertartás-udvar','teahouse',86,[['teamaster','whiskimp','cupwarrior'],['teamaster','matchagolem'],['whiskimp','teamaster','steamwraith']],{intro:'Itt minden ellenfél habosít. Tűz és villám leégeti a habot.',
      start:[{who:'Jázmin',text:'Ez a világ legszebb teaszertartás-udvara. És a legcsendesebb.'},{who:'Morgána',text:'Senki nem beszél. Senki nem nevet. Mindenki csak… ízlel. Semmit.'}],
      end:[{who:'Kaelen',text:'Lili szobája a folyosó végén. Halkan.'}]}),
    R22_LV('12-2','A Csend Folyosója','teahouse',88,[['zencrow','mosaicghost','teamaster'],['matchagolem','steamwraith','cupwarrior'],['teamaster','stoneguard','whiskimp']],{tag:'elit',intro:'Minden eddigi ellenfél egyszerre. Erőforrás-beosztás!',
      start:[{who:'Zordon',text:'Ha ezt túléljük, iszom egy kávét. Ízeset.'},{who:'Grog',text:'Grog kettőt.'}],
      end:[{who:'Morgána',text:'Lili hangját hallom. Énekel. Altatódalt.'}]}),
    R22_LV('12-3','Lili szobája','teahouse',89,[['lilicalm']],{intro:'Lilit Chasen megbékítette, ezért ellenetek gyógyít és altat. Nem lehet megölni – ha elfogy az életereje, felébred.',
      start:[{who:'Lili',text:'Sssh. Ne kapkodjatok. Igyatok egy teát. Lassan.'},{who:'Morgána',text:'Lili. Te utálod a teát.'},{who:'Lili',text:'…Utálom? Nem emlékszem, milyen íze van bárminek.'},{who:'Zordon',text:'Akkor majd emlékeztetünk.'}],
      end:[{who:'Lili',text:'…Au. Mi történt? Miért van rajtam ennyi hab?'},{who:'Grog',text:'Lili visszajött! Grog boldog!'},{who:'Lili',text:'Chasen nem gonosz. Csak szomorú, hogy senki nem figyel. De nem veheti el mindenki ízét. Gyertek.'}]}),
    R22_LV('12-4','Chasen, a Békemester','teahouse',90,[['teamaster','chasen','whiskimp']],{boss:true,slots:[[600,340],[770,470],[610,480]],intro:'Chasen habot ver mindenkire, és fél életerő alatt az Örök Zen-re készül. Jég és villám a gyengéje.',
      start:[{who:'Chasen',text:'Megérkeztetek. Kapkodva, hangosan, kifulladva. Ahogy mindenki.'},{who:'Kaelen',text:'Elvetted az erdőm hangját.'},{who:'Chasen',text:'Csak egy időre. Amíg újra meg nem tanuljátok, milyen egy korty, ha figyelsz rá.'},{who:'Lili',text:'Nem lehet erővel megtanítani valakit figyelni, Chasen.'},{who:'Chasen',text:'Akkor győzzetek meg. Lassan.'}],
      end:[{who:'Chasen',text:'…Ez a tea. Ennek… íze van.'},{who:'Jázmin',text:'Mert most figyeltél rá. Nem mert elvetted másoktól.'},{who:'Chasen',text:'Gyertek el a teaházatokba. Megmutatom, hogyan kell habot verni. Lassan.'},{who:'Grog',text:'Grog süti. Sütiízű. Grog sír.'}]}),
  ]});
// titkos pálya (11-2 után nyílik)
const SECRET3={id:'X-2',name:'Az Ősi Habverő-műhely',tag:'titkos',theme:'teahall',elvl:92,secret:true,battles:[['oldgolem']],
  intro:'A Matcha-kádak mögötti lezárt ajtó egy régi műhelybe vezet. A legelső habverő-gólem még mindig dolgozik. Jutalom: 5000 arany, Elixírek és Arany Matcha-por.'};
if(typeof ZONE_MUSIC==='object')ZONE_MUSIC.push('tea','tea','porc','dream');

// ---- 3. térkép: pályapontok a map3 képen (rácson lemérve), lapozás
{const P3=[[[13,85],[9,62],[29,74],[18,66]],[[22,43],[33,38],[46,41],[37,26]],[[58,58],[69,55],[82,63],[79,46]],[[72,31],[80,28],[89,22],[83,12]]];
 for(let i=0;i<4;i++)MAP_POS[8+i]=P3[i];
 const Z3=[[22,93],[42,18],[70,74],[66,6]];for(let i=0;i<4;i++)MAP_ZONE_POS[8+i]=Z3[i];}
{const ms=mapScreen;mapScreen=function(zi){const r=ms.apply(this,arguments);try{const page=Math.floor((S.mapZone||0)/4);const v=document.querySelector('.map-view');
   if(page===2&&v&&IMG_SRC.map3)v.style.backgroundImage='url('+IMG_SRC.map3+')';
   const bset=document.querySelector('.map-bar .ov-btns');if(bset){const nav=[...bset.querySelectorAll('button')].find(b=>/térkép/.test(b.textContent));
     const mk=(label,fn)=>{const b=btn('ov-btn sec',label,fn);return b;};
     if(page===2&&nav){nav.replaceWith(mk('◂ 2. térkép',()=>mapScreen(7)));}
     else if(page===1&&zoneUnlocked(8)){const b3=mk('3. térkép ▸',()=>mapScreen(Math.max(8,Math.min(ZONES.length-1,S.lastZone3||8))));if(nav)nav.after(b3);else bset.prepend(b3);}
     if(page===2)S.lastZone3=S.mapZone;}}catch(e){console.error(e)}return r;};}
// a 8-4 után, a térképre érve egyszer: a III. rész kezdete
{const ms2=mapScreen;mapScreen=function(zi){if(S.save&&S.save.cleared&&S.save.cleared.includes('8-4')&&ngp().credits2&&!S.save.seen.includes('p3')&&!S.arena){S.save.seen.push('p3');saveGame();
   overlay([['p','ov-sub','Az Elveszett Ízek Nyomában'],['h1','ov-title','Jön a harmadik rész!'],['p','ov-text','Fél év múlva egy reggel minden íztelen lesz Mesevölgyben – a kávé, a tea, még Grog sütije is. Lili elrepül a matcha-völgybe beszélni a tettessel… és nem tér vissza.'],
     ['div','ov-list',['A harmadik rész: a Békemester – négy új vidék, új társ (Kaelen, a druida)','A szinthatár 60-ról 90-re nő','A térképen a „3. térkép ▸” gombbal jutsz az új vidékekre']]],
     [{label:'Irány a harmadik rész!',on:()=>mapScreen(8)},{label:'Vissza a második térképre',sec:true,on:()=>mapScreen(7)}]);return;}
  return ms2.apply(this,arguments);};}
