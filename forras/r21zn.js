// ===== 57. kör: harcrendszer, képességek, ellenfelek (teljes tesztlista, 3. csomag) =====

// ---- 1) „Hozzá sem ér, de már sebez, utána nem sebez” (Csillaghullás, Égiháború és a többi sok darabos támadás):
//    az r21zf a sebzés 60%-át fix időzítéssel (0,5 mp-től, 0,3 mp-enként) adta, ezért a számok a becsapódás ELŐTT
//    jelentek meg. Mostantól ezek a részletek a valódi becsapódásokhoz (amikor a darab odaér és megrázza a képet)
//    kötődnek; ami a végére marad, az a záró ütés előtt jön. Az összsebzés ugyanannyi.
(function(){const ANIMS=['starfall','arrowRain','blizzard','petals','thornStorm','zeusStorm','avalanche','thornVolley','leafGale','dice','shadowBlizzard','plateStorm','honeyRain','beeSwarm','featherStorm','sandStorm','chaosStorm','leafRain','stoneCloudRain','whiskStorm'];
  for(const an of ANIMS){const w=A[an];if(typeof w!=='function')continue;
    A[an]=async function(u,ts,sk){const q=[],h0=hit,sh0=shake;let busy=false,last=0;const nT=Math.max(1,(ts||[]).filter(t=>t&&t.alive).length);
      const flush=(n)=>{busy=true;try{let k=0;while(q.length&&k<n){const a=q.shift();try{h0.apply(null,a);}catch(e){}k++;}}finally{busy=false;}};
      hit=function(a,t,s){if(busy)return h0.apply(this,arguments);if(s&&s._r21chunk&&a===u){q.push([a,t,s]);return;}if(a===u&&q.length)flush(q.length);return h0.apply(this,arguments);};
      shake=function(){const r=sh0.apply(this,arguments);try{const now=performance.now();if(!busy&&q.length&&now-last>140){last=now;flush(nT);}}catch(e){}return r;};
      try{return await w.apply(this,arguments);}finally{hit=h0;shake=sh0;flush(q.length);}};}})();

// ---- 2) Pár- és limit-támadások erősebbek („alig sebeznek”): páros ×1,5, limit ×1,35, közös támadás ×1,3
for(const p of PAIRS)if(p.pow)p.pow=Math.round(p.pow*1.5*100)/100;
for(const t in LIMITS)if(LIMITS[t]&&LIMITS[t].pow)LIMITS[t].pow=Math.round(LIMITS[t].pow*1.35*100)/100;
if(typeof COMBO==='object'&&COMBO.pow)COMBO.pow=Math.round(COMBO.pow*1.3*100)/100;
if(typeof COMBO_PART==='object')for(const k in COMBO_PART)if(COMBO_PART[k]&&COMBO_PART[k].pow)COMBO_PART[k].pow=Math.round(COMBO_PART[k].pow*1.3*100)/100;

// ---- 3) Lili: életereje eddig 64 volt (Grog 135, Jázmin 105) → 92; és alapból kapja a Virágvihart (mindenkire ható támadás).
//    Aki már megvette a boltban, visszakapja az árát.
HERO_DEF.fairy.hp=92;
if(!HERO_DEF.fairy.skills.includes('petalstorm'))HERO_DEF.fairy.skills.push('petalstorm');
SHOP_SKILLS.fairy=SHOP_SKILLS.fairy.filter(x=>x[0]!=='petalstorm');
if(window.R21_FREE){(R21_FREE.fairy=R21_FREE.fairy||[]).includes('petalstorm')||R21_FREE.fairy.push('petalstorm');}
function r21FairyHp(){try{for(const h of (S.roster||S.heroes||[]))if(h.type==='fairy'){const r=h.maxHp?h.hp/h.maxHp:1;calcStats(h);h.hp=Math.max(h.alive===false?0:1,Math.round(h.maxHp*r));}}catch(e){}}
{const ms=mapScreen;mapScreen=function(){r21FairyHp();return ms.apply(this,arguments);};}
{const sb=startBattle;startBattle=function(){r21FairyHp();return sb.apply(this,arguments);};}

// ---- 4) Telihold átka („négyszer egymás után ugyanazt a hőst alakítja át”): a társat eddig sima véletlen választotta.
//    Mostantól sorra járja a társakat: mindig az jön, akit eddig a legkevesebbszer választott, és soha nem ugyanaz kétszer.
{const em=A.eclipseMoon;A.eclipseMoon=async function(u,ts,sk){const mr=Math.random;
  try{const pals=S.heroes.filter(h=>h.alive&&h!==u);if(pals.length>1){const C=u._r21moon||(u._r21moon={});
      let c=pals.filter(h=>h!==u._r21moonLast);if(!c.length)c=pals;const mn=Math.min(...c.map(h=>C[h.type]||0));c=c.filter(h=>(C[h.type]||0)===mn);
      const h=c[Math.floor(mr()*c.length)],idx=pals.indexOf(h);C[h.type]=(C[h.type]||0)+1;u._r21moonLast=h;
      // a Telihold átka első véletlen-húzása a társ kiválasztása (pick(pals)) – ezt az egyet irányítjuk
      Math.random=function(){Math.random=mr;return (idx+.5)/pals.length;};}}catch(e){Math.random=mr;}
  try{return await em.apply(this,arguments);}finally{Math.random=mr;}};}

// ---- 5) Kaelen – Vad Alakváltás („ha teknőssé alakul, minek kérdezi, kit támadjon?”): az alakot a képességmenü előre
//    kisorsolja és kiírja (pl. „következő: Teknős”). Teknősnél nincs célpontválasztás, rögtön beáll a csapat elé.
const R21_WSN={bear:'Medve',turtle:'Teknős',snake:'Kígyó'};
const r21WsNext=h=>h._r21ws||(h._r21ws=pick(['bear','turtle','snake']));
{const sb=setButtons;setButtons=function(list){try{const h=S.pick&&S.pick.h;if(h&&h.type==='druid'&&Array.isArray(list)){const nm=SK.wildshape&&SK.wildshape.name;
      for(const b of list)if(b&&nm&&String(b.label).replace(/^★ /,'')===nm&&!b.disabled){const f=r21WsNext(h);b.sub=(b.sub?b.sub+' · ':'')+'jön: '+R21_WSN[f];b.desc=(b.desc||'')+` Most ${R21_WSN[f].toLowerCase()}formát ölt.`;}}}catch(e){}
  return sb.apply(this,arguments);};}
{const tg=target;target=function(h,sk,back){try{if(sk&&sk.anim==='wildshape'&&h&&h.type==='druid'&&r21WsNext(h)==='turtle'){const f=S.enemies.filter(e=>e.alive);return finish({type:'skill',sk,targets:f.length?[f[0]]:[]});}}catch(e){}return tg.apply(this,arguments);};}
{const pf=perform;perform=async function(h,act){const ws=act&&act.sk&&act.sk.anim==='wildshape'&&h&&h.type==='druid';if(ws){window.R21WS=r21WsNext(h);}
  try{return await pf.apply(this,arguments);}finally{if(ws){window.R21WS=null;h._r21ws=null;}}};}

// ---- 6) Bambusz-békakirály – Gongütés („a képességek gombja inaktív lett… túl sokáig hat”): a király főellenségként
//    kétszer is léphet egy körben, így a némaság gyakorlatilag folyamatos lett. A gong után 3 körig nem kongat újra,
//    és ha még van elnémult hős, nem kongat.
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){try{if(e&&sk&&sk.silence){const silenced=S.heroes.some(h=>h.alive&&h.st&&h.st.silence);
      if(silenced||(e._r21gong!=null&&S.round-e._r21gong<3)){const alt=(e.d.skills||[]).map(x=>x[0]).filter(id=>ESK[id]&&!ESK[id].silence);if(alt.length)return ue.call(this,e,ESK[pick(alt)],target);}
      e._r21gong=S.round;}}catch(err){}return ue.apply(this,arguments);};}

// ---- 7) „Tüskés ellenség” zavaró név: az elit jelző neve „Visszaszúró” (aki fegyverrel üti, megsérül)
if(typeof R21_ELITE==='object'&&R21_ELITE.tuske){R21_ELITE.tuske.n='Visszaszúró';R21_ELITE.tuske.d='aki közelről üti, maga is megsérül';}

// ---- 8) Koffeines mókus („nem is ellenfél, csak az idézésekben szerepel”): eddig csak 15% eséllyel bukkant fel az
//    1. fejezetben, így sokan sosem találkoztak vele. Az első alkalommal biztosan felbukkan (1-2, második csata).
{const sb=startBattle;startBattle=function(){let force=false;try{const L=S.level;force=!S.arena&&L&&/^1-[23]$/.test(L.id)&&S.battleIdx===1&&S.save&&S.save.seen&&!S.save.seen.includes('r21squirrel');
    if(force)S.save.seen.push('r21squirrel');}catch(e){}
  if(!force)return sb.apply(this,arguments);const mr=Math.random;let n=0;Math.random=function(){n++;Math.random=mr;return 0;};try{return sb.apply(this,arguments);}finally{Math.random=mr;}};}

// ---- 9) Mohacsiga – „Nyálkacsík: nincs is nyálkacsík” (és a zöld nyálkafolt korábban kifejezetten nem kellett):
//    a támadás neve igazodik ahhoz, amit látunk – a csiga nekicsúszik a hősnek
if(ESK.slimetrail){ESK.slimetrail.name='Csúszó roham';ESK.slimetrail.desc='A csiga nekilódul, és teljes testével nekicsúszik egy hősnek.';}

// ---- 10) Lili – Pálcakoppintás („legyen nagyobb csapás”): Lili a célpont fölé repül, a pálcája végén óriás festett
//    aranycsillag nő, nagy lendülettel lesújt vele: a csillag a fejére zuhan, festett aranyrobbanás, a célpont összenyomódik,
//    csillagzápor és por. Vékony kör nincs.
A.wandbonk=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const rel=null;const G='255,220,120',ST=R17I.star||FX_IMG.star,GB=R17I.goldburst;
  try{const tx=cx(t)-t.w*t.scale*.55-u.w*u.scale*.3,ty=topY(t)-60,dx=tx-cx(u),dy=ty-(u.y+u.oy-u.h*u.scale*.6),sp=300;
  u.pose='cast';wandTrail(u,G,12);sfx('dust');await wait(120);ghosts(u,sp);
  await tween(sp,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;if(Math.random()<.7)wandTrail(u,G,1);});
  // felhúzás: hátrahajol, a pálca végén nő a csillag
  const C={s:0,x:0,y:0,a:1,rot:0,on:true,fall:0};
  R18E({update(dt){C.rot+=dt*4;return C.on;},draw(){if(C.s<=0||!ST)return;const h=C.fall?{x:C.x,y:C.y}:handPos(u),S2=230*C.s;ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,S2*.9,G,.55*C.a);ctx.restore();
    ctx.save();ctx.globalAlpha=C.a;ctx.translate(h.x,h.y);ctx.rotate(C.rot);ctx.drawImage(ST,-S2/2,-S2/2,S2,S2);ctx.restore();}});
  u.pose='attack';sfx('holy');await tween(420,k=>{u.spin=-.55*easeIO(k);C.s=eOutBack(k);if(Math.random()<.6){const h=handPos(u);part({x:h.x+rnd(-60,60),y:h.y+rnd(-60,60),vx:rnd(-40,40),vy:rnd(-40,40),life:.5,size:rnd(3,6),rgb:pick([G,'255,255,255']),shape:'star'});}});
  // lesújt: a csillag a fejére zuhan
  const h0=handPos(u),hx=cx(t),hy=topY(t)+t.h*t.scale*.15;C.fall=1;C.x=h0.x;C.y=h0.y;sfx('whoosh');
  await tween(150,k=>{u.spin=-.55+1.05*k;const e=k*k;C.x=h0.x+(hx-h0.x)*e;C.y=h0.y+(hy-h0.y)*e;C.s=1+.35*k;});
  sfx('hit');sfx('boom');shake(20);hitStop(120);flash('255,240,190',.45,.14);
  const B={k:0,a:1};if(GB)R18E({update(){return B.a>0;},draw(){if(B.k<=0)return;const S2=Math.max(380,t.h*t.scale*2.2)*(.5+.7*B.k);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=B.a;ctx.drawImage(GB,hx-S2/2,hy-S2/2+20,S2,S2);ctx.restore();}});
  tween(520,k=>{B.k=eOutBack(Math.min(1,k*1.6));B.a=k<.45?1:1-(k-.45)/.55;});
  const oy0=t.oy||0;tween(380,k=>{t.oy=oy0+Math.sin(k*Math.PI)*14;});t.hurt=.7;toss(t,40,320);
  for(let i=0;i<46;i++){const a=rnd(0,6.283),v=rnd(160,520);part({x:hx,y:hy,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120,g:500,drag:1,life:rnd(.6,1.1),size:rnd(4,9),rgb:pick([G,'255,255,255','255,190,90']),shape:'star'});}
  puffs(hx,t.y+t.oy,10,['230,215,180','200,190,170'],[22,40],{w:t.w*t.scale,up:90});
  C.on=false;hit(u,t,sk);await wait(360);u.spin=0;u.pose='idle';ghosts(u,sp*.7);
  await tween(sp,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);});u.ox=0;u.oy=0;}finally{rel&&rel();}};

// ---- 11) Óramű katona – Felhúzott csapás („földet használ, és túlságosan hasonlít egy másik támadáshoz”): eddig Grog
//    Zúzás-animációja futott (fejsze, földrepedés). Mostantól saját mozdulat: a felhúzott rugó kienged – a katona egyre
//    gyorsabban pörög, mint egy búgócsiga, festett acél-vágásívek forognak körülötte, odapörög a hőshöz, és két keresztbe
//    vágással lesújt az alabárdjával. Fémszikrák, nincs földrepedés, nincs kör.
A.clockSlam=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const WS=r21Filt?r21Filt(R17I.windslash,'grayscale(1) brightness(1.25) contrast(1.2)'):R17I.windslash;
  const dx=(cx(t)+t.w*t.scale*.5+u.w*u.scale*.4)-cx(u),M='220,225,235';
  const R={a:0,rot:0,on:true};
  R18E({update(dt){R.rot+=dt*14*R.a;return R.on;},draw(){if(R.a<=0||!WS)return;const x=cx(u),y=midY(u),S2=Math.min(240,u.h*u.scale*1.1);
    for(let i=0;i<3;i++){ctx.save();ctx.globalAlpha=.6*R.a;ctx.translate(x,y);ctx.rotate(R.rot+i*2.094);ctx.scale(1,.42);ctx.drawImage(WS,-S2/2,-S2/2,S2,S2);ctx.restore();}}});
  sfx('click');await tween(520,k=>{R.a=k;u.lean=.12*Math.sin(k*Math.PI*6);if(Math.random()<.5)sparks(cx(u)+rnd(-40,40),midY(u)+rnd(-60,60),[M,'255,230,160'],3,260);});
  sfx('whoosh');ghosts(u,420);await tween(420,k=>{u.ox=dx*easeIO(k);if(Math.random()<.4)puffs(cx(u),u.y+u.oy,1,['200,200,205'],[14,24],{w:40,up:30});});
  const X={k:0,a:1,n:0};R18E({update(){return X.a>0;},draw(){if(!WS)return;const x=cx(t),y=midY(t),S2=Math.min(300,Math.max(220,t.h*t.scale*1.8));
    for(let i=0;i<X.n;i++){ctx.save();ctx.globalAlpha=X.a;ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.rotate(i?.85:-.85);const s=S2*(i===X.n-1?X.k:1);ctx.drawImage(WS,-s/2,-s/2,s,s);ctx.restore();}}});
  for(let i=0;i<2;i++){X.n=i+1;X.k=0;sfx('slash');await tween(110,k=>{X.k=k;u.lean=(i?-1:1)*.25*k;});shake(16+i*8);hitStop(90);flash('235,240,255',.3,.1);
    sparks(cx(t),midY(t),[M,'255,255,255','255,210,120'],40,620);t.hurt=.5;toss(t,30+i*30,300);await wait(140);}
  hit(u,t,sk);R.on=false;await tween(300,k=>{X.a=1-k;R.a=1-k;});
  ghosts(u,300);await tween(380,k=>{u.ox=dx*(1-easeIO(k));u.lean=0;});u.ox=0;};
if(ESK.bigslam){ESK.bigslam.anim='clockSlam';ESK.bigslam.desc='A felhúzott rugó kienged: a katona pörögve odarohan, és két keresztbe vágással lesújt az alabárdjával.';}
// a felhúzásnál nincs vékony kör: a rugó csikorog, a katona megfeszül, fémszikrák pattannak
if(EN_DEF.clock){EN_DEF.clock.ai=async e=>{
  if(e.charged){e.charged=false;return useEnemySkill(e,ESK.bigslam,aiTarget(e));}
  if(Math.random()<.45){e.charged=true;say(e,`${e.name} felhúzza magát. Védekezz!`);showBanner('Felhúzás');e.pose='cast';popLabel(e,'FELHÚZVA!','#ff8a5a');sfx('click');
    for(let i=0;i<8;i++){sparks(cx(e)+rnd(-30,30),midY(e)+rnd(-50,30),['220,225,235','255,220,150'],4,240);e.lean=(i%2?-1:1)*.05;await wait(100);}e.lean=0;e.pose='idle';return;}
  return useEnemySkill(e,ESK.halberd,aiTarget(e));};}

// ---- 12) Jázmin – Árnyékszegező nyíl („a lila effekt másszon fel a testen, és maradjon rajta, amíg a hatás tart”):
//    becsapódás után sötétlila árnyék kúszik fel a célpont testén a talpától a fejéig, és amíg a bénítás tart, rajta marad
//    (lassan hullámzik, lila szemcsék szállnak fel róla)
{const sp=A.shadowPin;A.shadowPin=async function(u,ts,sk){const t=ts&&ts[0];const r=await sp.apply(this,arguments);try{if(t&&t.alive&&t.st&&t.st.stun)t._r21pin={t0:performance.now()};}catch(e){}return r;};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e._r21pin){if(!e.alive||!e.st||!e.st.stun){e._r21pin=null;return r;}
    const k=Math.min(1,(performance.now()-e._r21pin.t0)/900),feet=e.y+e.oy+6,top=topY(e)-4,h=(feet-top)*k,wob=Math.sin(performance.now()/300)*6;
    ctx.save();ctx.beginPath();ctx.rect(cx(e)-e.w*e.scale,feet-h-wob,e.w*e.scale*2,h+wob+10);ctx.clip();ctx.globalAlpha=.68;
    try{ctx.filter='brightness(.38) sepia(1) hue-rotate(230deg) saturate(5)';}catch(x){}de.call(this,e);try{ctx.filter='none';}catch(x){}ctx.restore();
    if(Math.random()<.4)part({x:cx(e)+rnd(-.4,.4)*e.w*e.scale,y:feet-rnd(0,h),vx:rnd(-10,10),vy:-rnd(20,60),life:.8,size:rnd(3,6),rgb:pick(['160,110,240','90,40,160'])});}}catch(err){}return r;};}
