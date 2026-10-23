// ===== 54. kör: a felhasználó 16 pontos visszajelzése =====

// 1) „Idegesítő, hogy minden kattintásnál megy ez a hang”: a gombnyomásra szóló általános „katt” hang kikapcsolva
//    (a bolti vásárlás érmehangja marad). A játékbeli „katt” hangok (üvegcse, kocka stb.) maradnak.
{let ui=false;addEventListener('click',ev=>{const b=ev.target&&ev.target.closest&&ev.target.closest('button');if(b&&!b.classList.contains('shop-buy')){ui=true;queueMicrotask(()=>{ui=false;});}},true);
 const s0=sfx;sfx=function(n){if(ui&&n==='click')return;return s0.apply(this,arguments);};}

// 2) „Barlangban hullanak a falevelek”: az Óriás Fa törzsében (1-3) és a Tölgy belsejében (1-4) zárt térben lebegő porszemek a falevél helyett
//    (a Tölgy saját leveleit – amikor rázza magát – meghagyjuk).
try{R21WX.trunk='motes';R21WX.oakheart='motes';}catch(e){}

// 3) Körrend: hely szerint (a csata közben beálló hős a kicserélt helyén lép, nem marad ki), és az ellenfelek egyenletesen
//    kerülnek a hőspárok közé (2 ellenfél, 4 hős: hős, hős, ellenfél, hős, hős, ellenfél – nincs 4 hős egymás után a kör határán).
runBattle=async function(){
  while(!S.over){
    S.round++;
    const nh=S.heroes.length,es=S.enemies.filter(e=>!e.d.passive),acted=new Set(),P=Math.max(1,Math.ceil(nh/2));let ei=0;
    const foe=async(e)=>{if(!e.alive||S.over)return false;if(await skipCheck(e))return false;const times=actsOf(e);for(let i=0;i<times&&e.alive&&!S.over;i++){await enemyAct(e);if(await checkEnd())return true;}return false;};
    for(let pi=0;pi<P&&!S.over;pi++){
      for(let s=pi*2;s<Math.min(nh,pi*2+2);s++){const h=S.heroes[s];if(!h||!h.alive||S.over||acted.has(h))continue;acted.add(h);h.guard=false;
        if(await skipCheck(h))continue;await heroTurn(h);if(await checkEnd())return;
        if(h.alive&&h.st.haste){popLabel(h,'EXTRA KÖR!','#fff27a');await wait(450);await heroTurn(h);if(await checkEnd())return;}}
      const q=Math.floor((pi+1)*es.length/P)-Math.floor(pi*es.length/P);
      for(let n=0;n<q&&ei<es.length;n++){if(await foe(es[ei++]))return;}}
    while(ei<es.length&&!S.over){if(await foe(es[ei++]))return;}
    for(const e of S.enemies.slice()){if(e.alive&&e.d.flee){e.rounds=(e.rounds||0)+1;if(e.rounds>=e.d.flee)await fleeAnim(e);}}
    if(await checkEnd())return;
    for(const e of S.enemies.slice()){if(e.d.onRoundEnd&&!S.over){await e.d.onRoundEnd(e);if(await checkEnd())return;}}
    await tickStatuses();
    if(await checkEnd())return;
  }
};

// 4) „Közös támadás nem megvehető / nem jelenik meg”: tesztmódban (Teszt be) a megvett páros/közös támadás nem mentődött,
//    a következő csatánál eltűnt (az arany viszont elment). Mostantól tesztmódban is mentődik (a Próbaterem nem ment amúgy sem).
r21OwnSave=function(){try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;const d=JSON.parse(raw);d.owned=R21_OWN||[];localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}};

// 5) „Limit túl hamar megvan, és a hősöket túl könnyen legyőzik”: a sebzés elszenvedéséből jövő limit ×0,6,
//    és az ellenfelek kicsit gyengébbek (Normál erő 1,2→1,1, Nehéz 1,6→1,5).
{const h0=hit;hit=function(u,t,sk){const l0=t&&t.kind==='hero'?t.limit:null;const r=h0.apply(this,arguments);
  try{if(l0!=null&&t.limit>l0&&!(sk&&sk.kind==='limit'))t.limit=l0+(t.limit-l0)*.6;}catch(e){}return r;};}
DIFF_ATK[1]=1.1;DIFF_ATK[2]=1.5;

// 6) Életszívás: többet szív el (erő 1,3→1,7) és többet ad vissza (a fele → háromnegyede).
if(SK.drain){SK.drain.pow=1.7;SK.drain.drain=.75;SK.drain.desc='Semleges szívás: erősen kiszívja az ellenség életerejét, és háromnegyedét Morgána visszagyógyítja. Minden ellenségre egyformán hat.';}

// 7) „Rémült Tölgyet túl könnyű legyőzni”: élet ×1,3, erő ×1,1, és új (plusz) támadása a régi idézés: Gyökérfogás.
if(EN_DEF.oak){EN_DEF.oak.hp=Math.round(EN_DEF.oak.hp*1.3);EN_DEF.oak.atk*=1.1;EN_DEF.oak.mag*=1.1;}

// 8) „II. Csavar túl nehéz”: a páncéllemezeit csak villám törte le, de Zordon Villámcsapása csak a 3-3 után volt megvehető
//    (a 2-4-nél nem volt villám a csapatban) → a Villámcsapás már a 2-3 után megvehető; Morgána Rozsda-átka is letör egy lemezt;
//    páncéllal 20% helyett 35%-ot sebződik.
if(EN_DEF.rustking){EN_DEF.rustking.dmgTaken=e=>e.plates>0?[.35,'PÁNCÉL']:1;EN_DEF.rustking.info='Amíg van páncéllemeze, kevésbé sebződik. A villám és Morgána Rozsda-átka töri le. Gép: a méreg nem árt neki.';}
try{for(const x of SHOP_SKILLS.wizard)if(x[0]==='thunderbolt')x[1]='2-3';}catch(e){}

// 9) Rozsda-átok: a fémből lévő ellenfelek (óramű katona, ágyú, II. Csavar, Koffein-gólem, Szamovár, Ősgólem, cukorfogó, Örök Kanna,
//    Kannateknős) berozsdásodnak: 1 körig mozgásképtelenek, és tényleg rozsdásnak látszanak (rozsdabarna test, hulló rozsdapikkelyek).
//    A kábulatra immunis főellenségnél (II. Csavar) helyette egy páncéllemez esik le.
const R21_METAL=new Set(['clock','cannon','rustking','koffgolem','samovar','ancient','tongs','kanna','potturtle']);
STATUS.rusted=['Berozsdásodott','#c8662a'];
try{if(typeof ONE_ROUND!=='undefined'&&ONE_ROUND.add)ONE_ROUND.add('rusted');}catch(e){}
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{if(sk&&(sk.anim==='rust'||sk.name==='Rozsda-átok')&&t&&t.alive&&R21_METAL.has(t.type)){
    if(t.type==='rustking'&&t.plates>0){t.plates--;popLabel(t,t.plates?`ROZSDÁS LEMEZ LEESETT! (még ${t.plates})`:'A PÁNCÉL LEROZSDÁSODOTT!','#e08a40');shake(8);}
    if(!(t.d.statusImmune||[]).includes('stun')){t.st.rusted=1;t.st.stun=Math.max(t.st.stun||0,1);popLabel(t,'BEROZSDÁSODOTT!','#e08a40');}
    t._r21rustT=2.5;}}catch(e){}return r;};}
{const de=drawEntity;drawEntity=function(e){const rusty=!!(e&&e.alive&&R21_METAL.has(e.type)&&((e.st&&e.st.rusted)||e._r21rustT>0));
  if(!rusty)return de.apply(this,arguments);
  ctx.save();const f0=ctx.filter;try{ctx.filter='sepia(1) saturate(2.4) hue-rotate(-18deg) brightness(.72) contrast(1.15)';}catch(x){}const r=de.apply(this,arguments);try{ctx.filter=f0;}catch(x){}ctx.restore();
  if(Math.random()<.35&&R17I.pebble)r21PD(r21Filt(R17I.pebble,'sepia(1) saturate(2.6) hue-rotate(-20deg) brightness(.75)'),cx(e)+rnd(-.35,.35)*e.w*e.scale,e.y+e.oy-rnd(.2,.9)*e.h*e.scale,{vx:rnd(-20,20),vy:rnd(10,40),g:300,size:rnd(5,10),life:rnd(.7,1.1)});
  return r;};}
{let last=performance.now();R18E({update(){const now=performance.now(),dt=Math.min(.1,(now-last)/1000);last=now;try{for(const e of S.enemies||[])if(e._r21rustT>0&&!(e.st&&(e.st.rusted||e.st.defDown)))e._r21rustT-=dt;}catch(x){}return true;},draw(){}});}
if(SK.rust)SK.rust.desc='Rozsdát szór egy ellenségre: 1 körre a felére csökkenti a védelmét. A fémből lévő ellenfelek (gépek, páncélosok) berozsdásodnak: 1 körig mozdulni sem tudnak, a II. Csavarról egy páncéllemez esik le.';

// 10) Elit és arany ellenfelek: a hatásuk eddig nem látszott → festett jel a fejük fölött, és felirat minden alkalommal, amikor hat.
{const ICON={pancel:'stonewall',tuske:'rockspike',gyogy:'dewdrop',robban:'firebomb'};
 const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e.alive&&(e._elite||e.golden)){const t=performance.now()/1000,x=cx(e),y=e.y+e.oy-e.h*e.scale-80+Math.sin(t*3)*3;
   if(e._elite){const im=R17I[ICON[e._elite]];if(im)r17Draw(im,x-22,y,e._elite==='tuske'?30:46,{a:.98});ctx.save();ctx.font='bold 16px Nunito,sans-serif';ctx.textAlign='left';ctx.fillStyle='#ffd84a';ctx.strokeStyle='#2a1a00';ctx.lineWidth=3;const s=R21_ELITE[e._elite].n;ctx.strokeText(s,x+6,y+6);ctx.fillText(s,x+6,y+6);ctx.restore();}
   else if(e.golden&&R17I.star){r17Draw(R17I.star,x-22,y,42,{a:.98,rot:Math.sin(t*2)*.2});ctx.save();ctx.font='bold 16px Nunito,sans-serif';ctx.fillStyle='#ffd84a';ctx.strokeStyle='#2a1a00';ctx.lineWidth=3;ctx.strokeText('3× arany',x+4,y+6);ctx.fillText('3× arany',x+4,y+6);ctx.restore();}}}catch(x){}return r;};}
{const h0=hit;hit=function(u,t,sk){const hp0=t?t.hp:0;const r=h0.apply(this,arguments);try{if(t&&t._elite==='pancel'&&hp0>t.hp&&u&&u.kind==='hero')popLabel(t,'PÁNCÉL: −35%','#c9d6e8');}catch(e){}return r;};}
{const ts=tickStatuses;tickStatuses=async function(){const before=(S.enemies||[]).map(e=>[e,e.hp]);const r=await ts.apply(this,arguments);try{for(const [e,h] of before)if(e.alive&&e._elite==='gyogy'&&e.hp>h)popLabel(e,'ELIT: GYÓGYUL!','#9be04e');}catch(x){}return r;};}
{const d0=die;die=function(t){const g=t&&t.alive&&t.golden;const r=d0.apply(this,arguments);try{if(g){popLabel(t,'ARANY: 3× ARANY!','#ffd84a');sfx('coin');}}catch(x){}return r;};}

// 11) Rózsa Tüskés inda: a kódból rajzolt inda helyett FESTETT tüskés rózsainda-spirál tör fel a hős alól, rátekeredik, megszorítja.
A.thornVine=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const im=R17I.rosestorm,x=cx(t),gy=t.y+t.oy+6,hh=t.h*t.scale*1.25,V={g:0,a:1,on:true};rumble(.5,4);sfx('rock');
  for(let i=0;i<10;i++)part({x:x+rnd(-40,40),y:gy,vx:rnd(-80,80),vy:-rnd(60,180),g:500,life:.7,size:rnd(3,6),rgb:'110,85,60',add:false,shape:'rock'});
  R18E({update(){return V.on;},front:true,draw(){if(!im||V.g<=0)return;const w=hh*im.width/im.height*.9,h=hh;ctx.save();ctx.globalAlpha=V.a;ctx.beginPath();ctx.rect(x-w,gy-h*V.g,w*2,h*V.g+4);ctx.clip();ctx.drawImage(im,x-w/2,gy-h,w,h);ctx.restore();}});
  await tween(480,k=>{V.g=easeIO(k);});
  for(let i=0;i<2;i++){shake(6);t.hurt=.3;sfx('hit');sparks(x,midY(t),['255,120,120','200,255,150'],10,260);await wait(170);}
  hit(u,t,sk);await wait(350);await tween(300,k=>{V.a=1-k;});V.on=false;u.pose='idle';};
// Rózsa Tüskezápor: a rózsa meglendül, és szemből festett rózsatüskék repülnek (a kép a 54. körben készült; amíg nincs, a régi rajz marad)
{const tv0=A.thornVolley;A.thornVolley=async(u,ts,sk)=>{const TH=R17I.rosethorn;if(!TH)return tv0(u,ts,sk);const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';
  await tween(260,k=>{u.ox=Math.sin(k*Math.PI)*24;u.jump=Math.sin(k*Math.PI)*10;});u.ox=0;u.jump=0;sfx('slash');shake(4);
  const o={x:cx(u)-u.w*u.scale*.35,y:midY(u)-u.h*u.scale*.15},thorns=[];
  for(const t of al)for(let i=0;i<9;i++){const tx=cx(t)+rnd(-30,30),ty=midY(t)+rnd(-40,40),sy=o.y+rnd(-50,50);thorns.push({x:o.x,y:sy,sx:o.x,sy,tx,ty,d:i*.06+rnd(0,.05),k:0,t,last:i===8,stuck:0});}
  const st={t:0};R18E({update(dt){st.t+=dt;let any=false;for(const q of thorns){if(st.t<q.d){any=true;continue;}if(q.k<1){any=true;q.k=Math.min(1,q.k+dt/.32);q.x=q.sx+(q.tx-q.sx)*q.k;q.y=q.sy+(q.ty-q.sy)*q.k-Math.sin(q.k*Math.PI)*20;
        if(q.k>=1){sparks(q.tx,q.ty,['255,120,120','255,255,255'],5,200);q.t.hurt=.2;if(q.last){hit(u,q.t,sk);shake(5);}}}else if(q.stuck<.6){any=true;q.stuck+=dt;}}return any;},
    draw(){for(const q of thorns){if(st.t<q.d)continue;const a=Math.atan2(q.ty-q.sy,q.tx-q.sx);r17Draw(TH,q.x,q.y,46,{rot:a,a:q.k<1?1:Math.max(0,1-(q.stuck-.3)/.3)});}}});
  await wait(1300);u.pose='idle';};}

// 12) Tölgy Gyökérbörtöne: a gyökér-lény eddig kódból rajzolt indákból állt → FESTETT tüskés gyökérketrec nő ki a földből a hős köré.
{const de=drawEntity;drawEntity=function(e){if(!e||e.type!=='root'||!R17I.rootcage||!e.holds)return de.apply(this,arguments);if(!e.alive)return;
  const t=e.holds,im=R17I.rootcage,g=e.grow==null?1:e.grow,h=t.h*t.scale*1.15,w=h*im.width/im.height,x=cx(t),gy=t.y+t.oy+8;
  ctx.save();ctx.globalAlpha*=e.alpha==null?1:e.alpha;ctx.beginPath();ctx.rect(x-w,gy-h*g-4,w*2,h*g+8);ctx.clip();ctx.drawImage(im,x-w/2,gy-h,w,h);ctx.restore();};}

// 13) Tölgy idézés: a saját nagy ágkezével csap le (mint ellenfélként az Ágcsapásnál) sorban minden ellenfélre.
//     Az eddigi idézés (gyökerek + gyógyító makkok) a Tölgy ellenséges plusz támadása lett: Gyökérfogás.
{const oa=SUMMONS.find(s=>s.id==='oak');if(oa&&typeof LIMBS==='object'&&LIMBS.oak){
  oa.desc='A Vén Tölgy kinyújtja hatalmas ágkezét, és sorban lecsap vele minden ellenfélre (nagy természet-sebzés, a gyengébbeket fel is dobja).';
  const LIVE={c:null,pad:0,k:0,tx:0,ty:0};
  const build=()=>{const im=ENEMY_SPR.oak;if(!im)return null;const C=limbCanv('oak');if(!C)return null;const pad=Math.round(im.width*2.5);if(!LIVE.c){LIVE.c=document.createElement('canvas');LIVE.c.width=im.width+pad*2;LIVE.c.height=im.height;LIVE.pad=pad;}return C;};
  const paint=(C)=>{const g=LIVE.c.getContext('2d'),im=ENEMY_SPR.oak,W=im.width,H=im.height,pad=LIVE.pad;g.clearRect(0,0,LIVE.c.width,H);g.save();g.translate(pad,0);g.drawImage(C.base,0,0);
    const pv=LIMBS.oak.parts.arm.pivot,P0={x:pv[0]*W,y:pv[1]*H},tip={x:.02*W,y:.48*H};
    const a0=Math.atan2(tip.y-P0.y,tip.x-P0.x),L0=Math.hypot(tip.x-P0.x,tip.y-P0.y),T={x:P0.x+(LIVE.tx-P0.x)*LIVE.k,y:P0.y+(LIVE.ty-P0.y)*LIVE.k},a1=LIVE.k>0?Math.atan2(T.y-P0.y,T.x-P0.x):a0,L1=Math.max(L0,Math.hypot(T.x-P0.x,T.y-P0.y));
    g.save();g.translate(P0.x,P0.y);g.rotate(a1);g.scale(L1/L0,1);g.rotate(-a0);g.translate(-P0.x,-P0.y);g.drawImage(C.parts.arm,0,0);g.restore();g.restore();};
  oa.img=()=>{const C=build();if(!C)return sprOf('oak')();paint(C);return LIVE.c;};
  oa.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const C=build(),im=ENEMY_SPR.oak;if(!C||!im)return;
    const Hs=()=>(oa.h||360)*(S0.s||1),sc=()=>Hs()/im.height,toImg=(X,Y)=>{const s=sc(),W2=LIVE.c.width*s;return {x:(W2/2-(X-S0.x))/s-LIVE.pad,y:(Y-S0.y+Hs())/s};};
    const anim={on:true};R18E({update(){if(anim.on)paint(C);return anim.on;},draw(){}});
    try{for(const t of fs){if(!t.alive)continue;const p=toImg(cx(t)+20,midY(t)-20);LIVE.tx=p.x;LIVE.ty=p.y;sfx('wind');
        await tween(420,k=>{LIVE.k=easeIO(k)*.35;});sfx('whoosh');await tween(170,k=>{LIVE.k=.35+.65*k*k;});
        sfx('rock');sfx('hit');hitStop(110);shake(18);flash('255,230,180',.2,.1);
        for(let i=0;i<14;i++)part({x:cx(t),y:midY(t),vx:rnd(-240,240),vy:rnd(-260,-40),g:500,life:rnd(.6,1),size:rnd(5,8),rgb:pick(['80,150,40','150,190,60','200,170,60']),add:false,shape:'leaf'});
        sparks(cx(t),midY(t),['255,240,200','210,190,140'],20,400);if(!(t.d.boss||t.d.miniboss))toss(t,40,320);t.hurt=.4;
        hit(P,t,{name:'Ágcsapás',kind:'phys',pow:2.2,elem:'nature',tgt:'enemy'});await tween(220,k=>{LIVE.k=1-k;});LIVE.k=0;await wait(80);}}
    finally{anim.on=false;LIVE.k=0;}};}}
// a régi idézés-támadás → a Tölgy ellenséges plusz képessége
ESK.rootgrab={name:'Gyökérfogás',tgt:'enemies',kind:'mag',pow:.55,elem:'nature',anim:'rootGrab',desc:'Gyökerek fogják meg a csapatot (40% eséllyel kimaradnak egy körből), a lehulló makkok a Tölgyet gyógyítják.'};
A.rootGrab=async(u,ts,sk)=>{u.pose='cast';rumble(1.2,8);sfx('rock');const al=ts.filter(t=>t.alive);
  for(const t of al){const im=R17I.rootcage,x=cx(t),gy=t.y+t.oy+8,h=t.h*t.scale*1.1,V={g:0,a:1,on:true};
    if(im)R18E({update(){return V.on;},draw(){const w=h*im.width/im.height;ctx.save();ctx.globalAlpha=V.a;ctx.beginPath();ctx.rect(x-w,gy-h*V.g-4,w*2,h*V.g+8);ctx.clip();ctx.drawImage(im,x-w/2,gy-h,w,h);ctx.restore();}});
    tween(300,k=>{V.g=easeIO(k);}).then(()=>wait(700)).then(()=>tween(300,k=>{V.a=1-k;})).then(()=>{V.on=false;});
    hit(u,t,{...sk,status:Math.random()<.4?['stun',1,1]:null});await wait(140);}
  await wait(500);const g=Math.round(u.maxHp*.08);if(u.alive&&u.hp<u.maxHp){u.hp=Math.min(u.maxHp,u.hp+g);popNum(u,g,'heal');popLabel(u,'MAKKOK: GYÓGYUL','#9be04e');sfx('heal');}
  await wait(400);u.pose='idle';};
if(EN_DEF.oak&&Array.isArray(EN_DEF.oak.skills)&&!EN_DEF.oak.skills.find(s=>s[0]==='rootgrab'))EN_DEF.oak.skills.push(['rootgrab',2]);

// 14) Gombakirály: az ellenséges Gombaeső és az idézése eltért egymástól (kétféle, kódból rajzolt gomba) →
//     mindkettő ugyanaz: FESTETT lila pöttyös gombák zuhannak, és festett lila spórafelhővé pukkadnak (zöld folt nélkül).
const r21ShroomRain=async(targets,onLand)=>{const im=R17I.mushroom,SP=r21Filt(R17I.teacloud,'grayscale(1) sepia(1) hue-rotate(230deg) saturate(2.4) brightness(.95)');if(!im)return;
  const list=[];for(const t of targets)for(let i=0;i<5;i++)list.push({t,x:cx(t)+rnd(-70,70),y0:-60-rnd(0,200),gy:t.y+t.oy-t.h*t.scale*rnd(.15,.55),d:i*.12+rnd(0,.1),s:rnd(95,135),r:rnd(-.5,.5),k:0,land:false,a:1});
  const st={t:0};R18E({update(dt){st.t+=dt;let any=false;for(const m of list){if(st.t<m.d){any=true;continue;}if(!m.land){any=true;m.k=Math.min(1,m.k+dt/.5);if(m.k>=1){m.land=true;sfx('poison');shake(3);m.t.hurt=.2;
        if(SP)for(let j=0;j<2;j++)r21PD(SP,m.x+rnd(-20,20),m.gy+rnd(-10,10),{size:rnd(70,110),grow:60,life:rnd(1,1.5),vx:rnd(-30,30),vy:-rnd(10,40),a:.85,vr:rnd(-.5,.5)});onLand&&onLand(m);}}else if(m.a>0){any=true;m.a-=dt*2.4;}}return any;},
    draw(){for(const m of list){if(st.t<m.d||m.a<=0)continue;const y=m.y0+(m.gy-m.y0)*m.k*m.k,sq=m.land?1+.3*(1-m.a):1;r17Draw(im,m.x,y,m.s*sq,{a:Math.max(0,m.a),rot:m.land?0:m.r*(1-m.k),sy:1/sq});}}});
  await wait(900);};
A.shroomFall=async(u,ts,sk)=>{const t=ts[0];if(!t)return;await castPose(u,'230,160,255',420);sfx('holy');await r21ShroomRain([t]);hit(u,t,sk);shake(6);await wait(500);u.pose='idle';};
{const mk=SUMMONS.find(x=>x.id==='mushking');if(mk){const run0=mk.run;mk.desc='Ugyanazok a lila pöttyös gombák zuhannak az ellenségekre, mint amikor a Gomba-Király ellenfélként támad, és lila spórafelhővé pukkadnak: méregsebzés, és mindenki elalszik (a főellenségek nem).';
  mk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('poison');await r21ShroomRain(fs);await wait(200);
    for(const t of fs){if(!t.alive)continue;hit(P,t,{name:'Gombaeső',kind:'mag',pow:1.1,elem:'poison',tgt:'enemies',status:['poison',1,3]});if(t.alive&&!(t.d.boss||t.d.miniboss))addStatus(t,'sleep',2);}
    await wait(500);};}}

// 15) Barlangi béka nyelve hasonlított a Bambusz-békakirályéra → saját FESTETT, ragacsos rózsaszín nyelv a szájából;
//     a béka lop: a nyelv hegye elkapja a tárgyat, és visszahúzza a szájába (a Békakirály a karjával csap és gongot üt – az más).
{const f0=A.frogTongue;A.frogTongue=async(u,ts,sk)=>{const TG=R17I.frogtongue,t=ts[0];if(!TG||!t)return f0(u,ts,sk);u.pose='idle';
  const mo=()=>KP(u,.12,.33),tx=cx(t)+10,ty=midY(t)-6,T0={k:0,on:true,glint:false};
  R18E({update(){return T0.on;},draw(){const k=T0.k;if(k<=0)return;const m=mo(),dx=tx-m.x,dy=ty-m.y,L=Math.hypot(dx,dy)*k,a=Math.atan2(dy,dx),h=Math.max(16,L*TG.height/TG.width*1.1);
    ctx.save();ctx.translate(m.x,m.y);ctx.rotate(a+Math.PI);ctx.drawImage(TG,-L,-h/2,L,h);ctx.restore();
    if(T0.glint){const ex=m.x+Math.cos(a)*L,ey=m.y+Math.sin(a)*L;ctx.save();ctx.globalCompositeOperation='lighter';glow(ex,ey,22,'255,220,120',.6);ctx.restore();}}});
  sfx('squish');u.jump=8;sfx('slash');await tween(170,k=>{T0.k=easeIO(k);});u.jump=0;
  t.hurt=.3;shake(7);sparks(tx,ty,['255,140,180','255,255,255'],12,280);const n0=(u.stolen||[]).length;hit(u,t,sk);T0.glint=(u.stolen||[]).length>n0;
  await wait(160);sfx('gulp');await tween(260,k=>{T0.k=1-easeIO(k);});T0.on=false;if(T0.glint){u.sq=1.12;await wait(120);u.sq=1;}await wait(120);};}
