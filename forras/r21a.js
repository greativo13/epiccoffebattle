// 21. kör – Matcha-föld: a 3. térkép játszható fejezetei és Kaelen.
// A korábbi fejezetek adatait és térképrétegeit nem írja át.
{
  const R21_MAP_POS = [
    [[18,79],[32,68],[27,48],[43,35]],
    [[47,76],[57,63],[50,44],[65,30]],
    [[68,77],[77,64],[71,45],[84,32]],
    [[84,76],[73,59],[87,48],[91,25]]
  ];
  for(let i=0;i<R21_MAP_POS.length;i++)MAP_POS[8+i]=R21_MAP_POS[i];
  const R21_ZONE_POS = [[25,56],[54,55],[76,56],[86,19]];
  const mkLevel=(id,name,theme,elvl,battles,extra={})=>({id,name,theme,elvl,battles,...extra});
  const mkZone=(id,name,chapter,chIntro,chEnd,levels)=>({id,name,chapter,chIntro,chEnd,levels});

  const r21Foes={
    whisk_imp:{name:'Habverő-manó',hp:125,atk:49,def:34,mag:46,res:38,exp:84,gold:45,elem:'nature',weak:['fire'],resist:['water'],skills:['whiskfoam','bambooswipe']},
    mochi_slime:{name:'Mochi-nyálka',hp:155,atk:44,def:48,mag:30,res:44,exp:96,gold:48,elem:'water',weak:['fire','holy'],resist:['phys','poison'],skills:['mochibind','mochibounce']},
    bamboo_serpent:{name:'Bambuszkígyó',hp:175,atk:56,def:40,mag:38,res:39,exp:110,gold:55,elem:'nature',weak:['fire'],resist:['nature'],skills:['vinewhip','coilsnap']},
    tea_dryad:{name:'Teafa-dryád',hp:190,atk:42,def:43,mag:58,res:53,exp:122,gold:61,elem:'nature',weak:['fire','ice'],resist:['nature'],skills:['leafmend','tealeaf']},
    mochi_king:{name:'Mochi-király',hp:1900,atk:88,def:73,mag:62,res:70,exp:1400,gold:700,elem:'water',weak:['fire','holy'],resist:['phys','poison'],boss:true,skills:['mochibind','mochibounce']},
    mosaic_guard:{name:'Mozaikőr',hp:230,atk:63,def:66,mag:48,res:57,exp:140,gold:68,elem:'earth',weak:['thunder','water'],resist:['phys'],skills:['mosaicshot','stoneguard']},
    zen_crow:{name:'Zen-varjú',hp:180,atk:52,def:41,mag:65,res:57,exp:130,gold:64,elem:'wind',weak:['thunder'],resist:['wind'],skills:['gravelrain','meditate']},
    zen_dragon:{name:'Zen-Kavics Sárkány',hp:2100,atk:94,def:82,mag:74,res:76,exp:1650,gold:820,elem:'earth',weak:['ice','nature'],resist:['fire','dark'],boss:true,skills:['gravelrain','meditate','mosaicshot']},
    matcha_golem:{name:'Matcha-gólem',hp:255,atk:68,def:72,mag:56,res:64,exp:160,gold:76,elem:'earth',weak:['thunder','phys'],resist:['fire','water','poison'],skills:['cupslam','whiskfoam']},
    steam_wraith:{name:'Gőzkád-szellem',hp:195,atk:50,def:48,mag:70,res:59,exp:145,gold:70,elem:'water',weak:['ice'],resist:['fire','water'],skills:['scaldingmist','steamjet']},
    cup_soldier:{name:'Csészeharcos',hp:215,atk:72,def:60,mag:38,res:45,exp:150,gold:74,elem:'phys',weak:['phys'],resist:['water'],skills:['cupthrow','shardfan']},
    frog_king:{name:'Bambusz-békakirály',hp:2200,atk:98,def:79,mag:68,res:74,exp:1800,gold:900,elem:'nature',weak:['fire','thunder'],resist:['water','poison'],boss:true,skills:['gongstrike','tonguelash','bamboojump']},
    tea_master:{name:'Teaszertartás-mester',hp:285,atk:61,def:58,mag:78,res:71,exp:190,gold:92,elem:'water',weak:['ice'],resist:['nature'],skills:['whiskfoam','mpdrain']},
    lili_calm:{name:'Lili – megbékítve',hp:1400,atk:82,def:65,mag:76,res:78,exp:0,gold:0,elem:'holy',weak:[],resist:['holy'],boss:true,skills:['fairybind','dawnflash']},
    chasen:{name:'Chasen, a Békemester',hp:2400,atk:105,def:93,mag:100,res:92,exp:2400,gold:1500,elem:'nature',weak:['ice','thunder'],resist:['nature','poison'],boss:true,skills:['whiskfoam','gongstrike','quietstorm']},
    mochi_split:{name:'Mochi-ikertestvér',hp:1,atk:77,def:52,mag:42,res:50,exp:0,gold:0,elem:'water',weak:['fire','holy'],resist:['phys','poison'],skills:['mochibounce']},
    ancient_matcha:{name:'Öreg Matcha-gólem',hp:2800,atk:126,def:104,mag:88,res:91,exp:3000,gold:2000,elem:'earth',weak:['thunder','phys'],resist:['fire','water','poison'],boss:true,skills:['cupslam','whiskfoam','gravelrain']}
  };
  for(const [id,data] of Object.entries(r21Foes))if(!EN_DEF[id]){
    const elem={};for(const e of data.weak||[])elem[e]=1.65;for(const e of data.resist||[])elem[e]=.45;
    EN_DEF[id]={...data,w:data.w||(data.boss?150:82),h:data.h||(data.boss?164:96),lift:data.lift||0,scale:data.scale||1,elem};
  }
  if(typeof DRAW==='object'){
    const fallback={whisk_imp:'imp',mochi_slime:'slime',bamboo_serpent:'snail',tea_dryad:'rose',mochi_king:'mushking',mosaic_guard:'mushking',zen_crow:'fireflies',zen_dragon:'mushking',matcha_golem:'mushking',steam_wraith:'ghost',cup_soldier:'imp',frog_king:'frog',tea_master:'wizard',lili_calm:'fairy',chasen:'wizard',mochi_split:'slimelet',ancient_matcha:'mushking'};
    for(const [id,base] of Object.entries(fallback))if(!DRAW[id])DRAW[id]=DRAW[base]||DRAW.slime;
  }

  const r21Skills={
    whiskfoam:{name:'Habosítás',kind:'mag',tgt:'enemies',pow:.42,elem:'water',anim:'teaCeremony',status:['foam',1,.78],desc:'Sűrű matchahabbal vonja be a hősöket.'},
    bambooswipe:{name:'Bambuszcsapás',kind:'phys',tgt:'enemy',pow:1.08,elem:'nature',anim:'branchSwing'},
    mochibind:{name:'Mochikötés',kind:'mag',tgt:'enemy',pow:.5,elem:'water',anim:'jamHand',status:['stun',.28,1]},
    mochibounce:{name:'Ragacsos huppanás',kind:'phys',tgt:'enemies',pow:.66,elem:'phys',anim:'esweep'},
    vinewhip:{name:'Indaostor',kind:'phys',tgt:'enemy',pow:1.16,elem:'nature',anim:'thornVine'},
    coilsnap:{name:'Rátekeredés',kind:'phys',tgt:'enemy',pow:.65,elem:'nature',anim:'thornVine',status:['stun',.35,1]},
    leafmend:{name:'Tealevél-gyógyítás',kind:'heal',tgt:'allies',pow:.28,elem:'nature',anim:'healAll'},
    tealeaf:{name:'Tealevél-zápor',kind:'mag',tgt:'enemies',pow:.68,elem:'nature',anim:'leafGale'},
    mosaicshot:{name:'Mozaikdarab',kind:'mag',tgt:'enemy',pow:1.13,elem:'earth',anim:'rock'},
    stoneguard:{name:'Meditáció',kind:'buff',tgt:'self',buff:['defUp',1],anim:'mirrorGuard'},
    gravelrain:{name:'Kavicshullás',kind:'mag',tgt:'enemies',pow:.8,elem:'earth',anim:'rock'},
    meditate:{name:'Kavicspáncél',kind:'buff',tgt:'self',buff:['defUp',1],anim:'mirrorGuard'},
    cupslam:{name:'Kerámiacsapás',kind:'phys',tgt:'enemy',pow:1.2,elem:'phys',anim:'vaseSlam'},
    scaldingmist:{name:'Forró gőz',kind:'mag',tgt:'enemies',pow:.75,elem:'fire',anim:'scaldSteam',status:['burn',.3,1]},
    steamjet:{name:'Gőzsugár',kind:'mag',tgt:'enemy',pow:1.1,elem:'fire',anim:'steamBreath'},
    cupthrow:{name:'Csészedobás',kind:'phys',tgt:'enemy',pow:1.08,elem:'phys',anim:'cupThrow'},
    shardfan:{name:'Csészeszilánkok',kind:'phys',tgt:'enemies',pow:.7,elem:'phys',anim:'porcShard'},
    gongstrike:{name:'Gongütés',kind:'mag',tgt:'enemies',pow:.58,elem:'wind',anim:'screechFx',status:['mute',1,1]},
    tonguelash:{name:'Nyelvcsapás',kind:'phys',tgt:'enemy',pow:1.24,elem:'phys',anim:'frogTongue'},
    bamboojump:{name:'Bambuszugrás',kind:'phys',tgt:'enemies',pow:.78,elem:'nature',anim:'branchSwing'},
    mpdrain:{name:'Kortyolás',kind:'mag',tgt:'enemy',pow:.64,elem:'water',anim:'mpDrain',mpDrain:14},
    fairybind:{name:'Békítő fény',kind:'mag',tgt:'enemies',pow:.65,elem:'holy',anim:'lightPillar',status:['sleep',.2,1]},
    dawnflash:{name:'Hajnali fény',kind:'mag',tgt:'enemy',pow:1.15,elem:'holy',anim:'lightPillar'},
    quietstorm:{name:'Örök Zen',kind:'mag',tgt:'enemies',pow:.7,elem:'nature',anim:'fanHurricane',status:['sleep',.8,1]}
  };
  for(const [id,data] of Object.entries(r21Skills))if(!ESK[id])ESK[id]=data;
  if(typeof A==='object'&&!A.lightPillar)A.lightPillar=async(u,ts,sk)=>{
    for(const t of ts.filter(x=>x.alive)){
      sfx('holy');lightPillar(cx(t),t.y+t.oy,Math.max(100,t.w*t.scale),.82);
      await wait(180);hit(u,t,sk);
    }
  };

  const lvl=(id,name,theme,elvl,groups,boss=false)=>mkLevel(id,name,theme,elvl,groups,{boss});
  const chapters=[
    mkZone(9,'Habos Bambuszosok','IX. fejezet: Habos Bambuszosok',
      'A közös teaház italai elvesztették az ízüket. A habosító bambusznyom Matcha-földre vezet; Lili előrement, hogy békét kössön, de Chasen csendvarázsa fogva tartja.',
      'A Mochi-király kettéválik, de a ragacsos ikrek legyőzése után Kaelen csatlakozik a csapathoz. A Suttogó Bambuszos útja a Kőmozaik Szentélybe vezet.',[
        lvl('9-1','Matcha-patak','matcha',62,[['whisk_imp','whisk_imp'],['mochi_slime','whisk_imp'],['bamboo_serpent','tea_dryad']]),
        lvl('9-2','Suttogó Bambuszos','bamboo',64,[['whisk_imp','bamboo_serpent'],['tea_dryad','mochi_slime'],['bamboo_serpent','whisk_imp']]),
        lvl('9-3','Mochi-tisztás','mochi',66,[['mochi_slime','mochi_slime'],['bamboo_serpent','mochi_slime'],['tea_dryad','mochi_slime']]),
        lvl('9-4','Mochi-király','mochi',68,[['mochi_king']],true)
      ]),
    mkZone(10,'Kőmozaik Szentély','X. fejezet: A Kőmozaik Szentély',
      'A zen-kert kövei maguktól mozdulnak. A hősök csendmérője három varázslatnál betelik, és felébreszti a mozaiksárkányt.',
      'A Zen-Kavics Sárkány páncélja villámmal törhető át. A gong hangja a Bambuszhabverők Barlangja felől felel.',[
        lvl('10-1','Gereblyézett Kert','zenGarden',70,[['mosaic_guard','zen_crow'],['zen_crow','mosaic_guard'],['mosaic_guard','mosaic_guard']]),
        lvl('10-2','Mozaikfolyosó','mosaicHall',72,[['mosaic_guard','zen_crow'],['zen_crow','mosaic_guard'],['mosaic_guard','zen_crow']]),
        lvl('10-3','Meditációs Csarnok','zenHall',74,[['zen_crow','mosaic_guard'],['mosaic_guard','zen_crow'],['zen_crow','zen_crow'],['mosaic_guard','zen_crow']]),
        lvl('10-4','Zen-Kavics Sárkány','zenHall',76,[['zen_dragon']],true)
      ]),
    mkZone(11,'Bambuszhabverők Barlangja','XI. fejezet: Bambuszhabverők Barlangja',
      'A csészék és gőzkádak között minden csata új szabályt tanít: a szelepet egyetlen akcióval el lehet zárni, a gong pedig egy körre csak alaptámadást hagy.',
      'A Bambusz-békakirály kapuja megnyílik. A gong elhallgat, a Chasen-palota felé vezető út szabaddá válik.',[
        lvl('11-1','Kerámia-folyosó','ceramic',78,[['matcha_golem','cup_soldier'],['steam_wraith','matcha_golem'],['cup_soldier','matcha_golem']]),
        lvl('11-2','Matcha-kádak','steamBath',80,[['steam_wraith','cup_soldier'],['matcha_golem','steam_wraith'],['cup_soldier','matcha_golem']]),
        lvl('11-3','Gongterem','gongHall',82,[['cup_soldier','matcha_golem'],['steam_wraith','cup_soldier'],['matcha_golem','steam_wraith'],['cup_soldier','matcha_golem']]),
        lvl('11-4','Bambusz-békakirály','gongHall',84,[['frog_king']],true)
      ]),
    mkZone(12,'Matcha Ceremónia-palota','XII. fejezet: Matcha Ceremónia-palota',
      'A hab, a gong és a csendmérő visszatér; a palota folyosóin most csak ezekre kell figyelni.',
      'A közös teaszertartás visszaadja az ízeket. Chasen megérti, hogy a béke nem némaság: segít helyreállítani Matcha-földet, majd csatlakozik Morcus és Kamilla teaházához.',[
        lvl('12-1','Teaszertartás-udvar','teaPalace',86,[['tea_master','matcha_golem'],['whisk_imp','tea_master'],['tea_master','cup_soldier']]),
        lvl('12-2','A Csend Folyosója','silentHall',88,[['tea_master','mosaic_guard'],['matcha_golem','tea_master'],['tea_master','frog_king']]),
        lvl('12-3','Lili szobája','liliRoom',89,[['lili_calm']],true),
        lvl('12-4','Chasen, a Békemester','teaThrone',90,[['chasen']],true)
      ]),
  ];
  const R21_X2=lvl('X-2','Az Ősi Habverő-műhely','ancientWorkshop',92,[['ancient_matcha']],true);
  chapters[3].levels.push(R21_X2);
  const known=new Set(ZONES.map(z=>z.id));for(const z of chapters)if(!known.has(z.id))ZONES.push(z);

  // Kaelen a 9-2 teljesítése után válik választhatóvá; Lili nem része a 9–12. fejezet történeti partijának.
  const r21Hero={name:'Kaelen',cls:'Druida',color:'#75b85f',hp:118,mp:74,atk:82,def:77,mag:72,res:74,skills:['bamboostrike','mossbed','livingbark','wildshape'],icon:'🌿'};
  if(typeof HERO_DEF==='object'&&!HERO_DEF.druid)HERO_DEF.druid=r21Hero;
  if(typeof JOIN==='object')JOIN.druid='9-2';
  if(typeof JOIN_TEXT==='object')JOIN_TEXT.druid='Kaelen, a Matcha-földet őrző druida csatlakozott a csapathoz.';
  if(typeof SHOP_SKILLS==='object')SHOP_SKILLS.druid=[['mossbed','9-2',520],['livingbark','9-2',620],['wildshape','9-3',780]];
  if(typeof SK==='object')Object.assign(SK,{
    bamboostrike:{name:'Bambuszcsapás',tgt:'enemy',kind:'phys',pow:1.22,elem:'nature',anim:'branchSwing',desc:'Kaelen csomós bambuszbotja páncéltörő ütést mér.'},
    mossbed:{name:'Mohapárna',tgt:'ally',kind:'heal',pow:.42,elem:'nature',mp:10,anim:'healAll',desc:'Kis gyógyítás, két kör regeneráció; leszedi a Habosítást.'},
    livingbark:{name:'Élő Bambuszkéreg',tgt:'ally',kind:'buff',pow:0,elem:'nature',mp:18,anim:'vaseWall',status:['bark',1,1],desc:'Egy körig csökkenti a fizikai és földsebzést, a fizikai ütés egy részét visszaszúrja.'},
    wildshape:{name:'Vad Alakváltás',tgt:'enemy',kind:'mag',pow:1.4,elem:'nature',mp:18,anim:'wildshape',desc:'Véletlenül medve, sas, teknős vagy átokvipera alakját ölti.'}
  });

  // Főellenség-idézések. A legyőzésük után megjelennek a meglévő idézésboltban.
  if(Array.isArray(SUMMONS)){
    const add=(id,name,elem,pow,anim)=>{if(!SUMMONS.some(s=>s.id===id))SUMMONS.push({id,name,elem,pow,anim,tgt:'enemies',img:()=>ENEMY_SPR[id]||ENEMY_SPR.mushking,run:async(P,S0)=>{const ts=foesAlive();for(const t of ts){await wait(110);hit(P,t,{name,kind:'mag',pow,elem,anim});}}});};
    add('mochiKing','Mochi-király','water',1.5,'esweep');add('zenDragon','Zen-Kavics Sárkány','earth',1.45,'rock');add('frogKing','Bambusz-békakirály','wind',1.25,'screechFx');add('chasen','Chasen','nature',1.35,'teaCeremony');
  }

  // Habosítás: fizikai ütésből kevesebb sebzés; a legelső tűz/villám találat 1,5×-ös és leégeti.
  if(typeof STATUS==='object'){
    STATUS.foam={name:'Habosítás',color:'#9bd67a',icon:'◉'};
    STATUS.bark={name:'Bambuszkéreg',color:'#79a95a',icon:'♧'};
  }
  if(typeof hit==='function'){
    const hit0=hit;hit=function(attacker,target,skill,...rest){
      let work=skill;
      if(target&&target.st&&skill){const elem=skill.elem||'',copy={...skill};let changed=false;
        if(target.st.foam&&(elem==='fire'||elem==='thunder'||elem==='lightning')){copy.pow=(copy.pow||1)*1.5;target.st.foam=0;changed=true;}
        else if(target.st.foam&&(skill.kind==='phys'||elem==='phys')){copy.pow=(copy.pow||1)*.7;changed=true;}
        if(target.st.bark&&(skill.kind==='phys'||elem==='earth')){copy.pow=(copy.pow||1)*.6;changed=true;}
        if(changed)work=copy;
      }
      const result=hit0.call(this,attacker,target,work,...rest);
      if(skill&&skill.status&&skill.status[0]==='foam'&&target&&target.st)target.st.foam=1;
      if(attacker&&attacker.type==='druid'&&skill&&skill.name==='Mohapárna'&&target&&target.st){target.st.foam=0;target.st.regen=2;}
      if(target&&target.type==='mochi_king'&&!target._r21Split&&target.hp>0&&target.hp<=target.maxHp*.5)r21SplitMochi(target);
      if(target&&target.type==='fairy'&&S.level&&S.level.id==='12-3'&&target.hp<=0){target.hp=1;target.alive=true;target._r21Awake=true;S.r21LiliAwake=true;showBanner('Lili felébredt. A harc véget ér.',true);}
      return result;
    };
  }
  function r21SplitMochi(target){target._r21Split=true;const p1=SLOTS[2][0],p2=SLOTS[2][1],left=Math.max(2,target.hp),a=mkEnemy('mochi_split',p1[0],p1[1],target.lvl||68),b=mkEnemy('mochi_split',p2[0],p2[1],target.lvl||68);for(const e of [a,b]){e.name='Mochi-iker';e.hp=e.maxHp=Math.ceil(left/2);e.boss=true;e._r21SplitChild=true;}target.hp=0;target.alive=false;S.enemies.push(a,b);showBanner('A Mochi-király kettévált!',true);sfx('squish');shake(15);}

  if(typeof A==='object')A.wildshape=async(u,ts,sk)=>{
    const forms=[['🐻','Medve'],['🦅','Sas'],['🐢','Teknős'],['🐍','Átokvipera']],form=forms[Math.floor(Math.random()*forms.length)],old=u._r21Form;
    const fx={t:0,on:true};effects.push({update(dt){fx.t+=dt;return fx.on||fx.t<.45;},draw(){if(!fx.on&&fx.t>.45)return;ctx.save();const x=cx(u),y=midY(u),s=u.h*u.scale*.72;ctx.globalAlpha=Math.min(1,fx.t*3)*Math.max(0,1-fx.t/1.15);ctx.fillStyle='rgba(64,120,51,.38)';ctx.beginPath();ctx.ellipse(x,y,s*.62,s*.52,0,0,Math.PI*2);ctx.fill();ctx.font=`${Math.round(s*.8)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(form[0],x,y);ctx.restore();}});
    sfx('nature');await tween(560,k=>{u.sq=1-.12*Math.sin(k*Math.PI);u.lean=Math.sin(k*Math.PI)*.12;});u._r21Form=form[1];showBanner(form[0]+' '+form[1]+'!',true);sfx('whoosh');
    if(form[1]==='Medve'){for(const t of S.enemies.filter(e=>e.alive)){hit(u,t,{...sk,name:'Medvemancs',pow:(sk.pow||1)*.8,elem:'nature'});shake(8);}}
    else if(form[1]==='Sas'){for(const t of ts)if(t.alive)hit(u,t,{...sk,name:'Sasroham',elem:'wind',pow:(sk.pow||1)*1.25});u._r21Evade=1;}
    else if(form[1]==='Teknős'){u.st=u.st||{};u.st.bark=1;u.st.provoke=1;for(const t of ts)if(t.alive)hit(u,t,{...sk,name:'Páncélcsattanás',pow:(sk.pow||1)*.35});}
    else for(const t of ts)if(t.alive)hit(u,t,{...sk,name:'Átokvipera-harapás',elem:'poison',status:['poison',.9,3],pow:(sk.pow||1)*.95});
    await tween(420,k=>{u.sq=1+.07*Math.sin(k*Math.PI);u.lean=.12*(1-k);});u._r21Form=old||null;u._r21Evade=0;
  };

  // Kaelen minden állapota ugyanabból a festett sprite-ból indul; a pózokhoz külön assetkulcsot kap.
  if(typeof ENEMY_SPR==='object')for(const k of ['druid','druid-attack','druid-cast','druid-hurt'])if(IMG_SRC[k]&&!ENEMY_SPR[k]){const im=new Image();im.src=IMG_SRC[k];ENEMY_SPR[k]=im;if(typeof HERO_SPR==='object')HERO_SPR[k]=im;}

  // MapScreen 3. lap – a r20o elrendezése érintetlen; itt csak a Matcha-oldalt festjük be.
  const mapPrev=mapScreen;
  const r21MapPaint=zi=>{
    const bar=document.querySelector('.map-bar'),host=bar&&(bar.querySelector('.ov-btns')||bar);
    if(host&&!host.querySelector('.r21-map-button')){const b=btn('ov-btn sec r21-map-button','3. térkép ▸',()=>{S.mapZone=8;mapScreen(8);});b.setAttribute('aria-label','3. térkép – Matcha-föld');host.appendChild(b);}
    const view=ov&&ov.querySelector('.map-view');if(!view)return;
    const page=Math.floor((Number(zi)||Number(S.mapZone)||0)/4);if(page!==2)return;
    if(IMG_SRC.map3)view.style.backgroundImage=`url("${IMG_SRC.map3}")`;
    view.style.backgroundSize='100% 100%';view.style.backgroundPosition='center';view.style.backgroundRepeat='no-repeat';
    const rows=ZONES.flatMap((z,zoneIndex)=>z.levels.map((level,levelIndex)=>({z,zoneIndex,levelIndex,level})));
    const nodes=[...view.querySelectorAll('.mnode')];
    nodes.forEach((node,i)=>{let row=rows.find(q=>node.title&&node.title.includes(q.level.id));if(!row)row=rows[8*4+i]||rows[32+i];if(!row||row.zoneIndex<8||row.zoneIndex>11)return;
      if(row.level.id==='X-2'){
        const seen=(S.save&&S.save.cleared||[]).includes('11-2');node.style.display=seen?'grid':'none';
        if(seen){node.style.setProperty('left','13%','important');node.style.setProperty('top','24%','important');node.disabled=!(S.save.cleared||[]).includes('12-4');node.textContent=node.disabled?'🔒':'X-2';node.title='X-2 – Az Ősi Habverő-műhely';}
        if(!node.__r21Bound){node.__r21Bound=true;node.addEventListener('click',ev=>{if(!(S.save&&S.save.cleared||[]).includes('12-4')){ev.stopImmediatePropagation();ev.preventDefault();showBanner('A műhely Chasen legyőzése után nyílik meg.');return;}ev.stopImmediatePropagation();ev.preventDefault();startLevel(R21_X2);},true);}
        return;
      }
      const p=R21_MAP_POS[row.zoneIndex-8][row.levelIndex];if(!p)return;node.style.setProperty('left',p[0]+'%','important');node.style.setProperty('top',p[1]+'%','important');
      node.style.setProperty('width',node.classList.contains('boss')?'clamp(25px,4vw,38px)':'clamp(22px,3.7vw,34px)','important');node.style.setProperty('height',node.style.width,'important');
      node.setAttribute('aria-label',row.level.id+' – '+row.level.name);if(!node.title)node.title=row.level.id+' – '+row.level.name;
    });
    [...view.querySelectorAll('.map-zone')].forEach((node,i)=>{const p=R21_ZONE_POS[i];if(p){node.style.setProperty('left',p[0]+'%','important');node.style.setProperty('top',p[1]+'%','important');}});
    // Egy vékony, kézzel írt tintavonal köti össze a négy tájegységet és a 16 pályapontot.
    view.querySelectorAll('.map-trail').forEach(e=>e.remove());
    const ns=nodes.filter(n=>{const a=n.getAttribute('aria-label')||n.title||'';return /^(9|10|11|12)-/.test(a);});
    if(ns.length>1){const pts=ns.map(n=>[parseFloat(n.style.left),parseFloat(n.style.top)]).filter(p=>p.every(Number.isFinite));if(pts.length>1){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','map-trail');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible';let d=`M${pts[0][0]},${pts[0][1]}`;for(let i=1;i<pts.length;i++)d+=` L${pts[i][0]},${pts[i][1]}`;for(const [w,c,dash] of [[4,'rgba(47,38,20,.72)',''],[1.7,'rgba(204,172,92,.9)','2 4']]){const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',d);p.setAttribute('fill','none');p.setAttribute('stroke',c);p.setAttribute('stroke-width',w);p.setAttribute('stroke-linecap','round');p.setAttribute('stroke-dasharray',dash);svg.appendChild(p);}view.insertBefore(svg,view.firstChild);}}
  };
  mapScreen=function(zi){const out=mapPrev.apply(this,arguments);const run=()=>r21MapPaint(zi);if(out&&typeof out.then==='function')return out.then(v=>{run();setTimeout(run,380);return v;});run();setTimeout(run,380);return out;};

  // A 9–12. fejezetben Lili nem kerül a történeti csapatba. Kaelen 9-2 után választható.
  if(typeof startLevel==='function'){
    const start0=startLevel;startLevel=function(level,...rest){
      if(level&&/^([9]|1[0-2])-/.test(level.id||'')){
        const roster=S.roster||[];const unlocked=(S.save&&S.save.cleared||[]).includes('9-2');
        const active=(S.heroes||[]).filter(h=>h.type!=='fairy').slice(0,4);
        const core=unlocked?['wizard','witch','orc','monk','druid']:['wizard','witch','orc','monk'];
        for(const type of core){if(active.length>=4)break;if(active.some(h=>h.type===type))continue;const h=roster.find(q=>q.type===type)||(type==='druid'&&typeof mkHero==='function'?mkHero(type):null);if(h)active.push(h);}
        if(active.length===4)S.heroes=active;
      }
      if(level&&level.id==='X-2'&&!(S.save&&(S.save.cleared||[]).includes('12-4'))){showBanner('A műhely Chasen legyőzése után nyílik meg.');return;}
      const out=start0.call(this,level,...rest);
      if(level&&(level.id==='9-2'||level.id==='12-3')){let tries=0;const watch=setInterval(()=>{tries++;try{if(S.save&&(S.save.cleared||[]).includes(level.id)){if(level.id==='9-2'){S.roster=S.roster||[];if(!S.roster.some(x=>x.type==='druid'))S.roster.push(mkHero('druid'));}else S.r21LiliAwake=true;clearInterval(watch);}}catch(e){}if(tries>3600)clearInterval(watch);},1000);}
      return out;
    };
  }
}
