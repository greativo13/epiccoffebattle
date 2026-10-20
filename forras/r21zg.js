// ===== 50. kör: tesztlap-csomag (végigjáték a Kerámia-folyosóig) =====

// ---- Kétszer támadó ellenfelek („a Mézdarázs és a Habverő-manó duplán támad”): egyszer lépnek
for(const k of ['bee','whiskimp'])if(EN_DEF[k])EN_DEF[k].acts=1;

// ---- Nagyobb ellenfelek: Kristálygólem, Lekvárdzsinn (minibossz is lesz)
for(const [k,f] of [['cgolem',1.3],['jamdjinn',1.3]])if(EN_DEF[k]){EN_DEF[k].h=Math.round(EN_DEF[k].h*f);EN_DEF[k].w=Math.round(EN_DEF[k].w*f);}
if(EN_DEF.jamdjinn){EN_DEF.jamdjinn.miniboss=true;EN_DEF.jamdjinn.hp=Math.round(EN_DEF.jamdjinn.hp*1.4);EN_DEF.jamdjinn.statusImmune=[...new Set([...(EN_DEF.jamdjinn.statusImmune||[]),'banish'])];}

// ---- Célpontválasztás („az Álomlepke hatszor ugyanazt támadta”): egy ellenfél legfeljebb kétszer egymás után
// támadja ugyanazt a hőst, utána másikat választ (ha van más)
{const at=aiTarget;aiTarget=function(u){let t=at.apply(this,arguments);try{if(u&&u.kind==='enemy'&&t&&t.kind==='hero'&&!(t.st&&t.st.taunt)){
    if(u._r21lt===t&&(u._r21ln||0)>=2){const o=S.heroes.filter(h=>h.alive&&h!==t);if(o.length)t=pick(o);}
    if(u._r21lt===t)u._r21ln=(u._r21ln||0)+1;else{u._r21lt=t;u._r21ln=1;}}}catch(e){}return t;};}

// ---- Ellenfél saját társait gyógyító/erősítő képességei („a Teafa-dryád a hősöket gyógyítja”): a célpont a saját
// csapatából jön – a legsérültebb élő társ (vagy saját maga)
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){try{if(e&&e.kind==='enemy'&&sk&&(sk.tgt==='ally'||sk.tgt==='allies'||(sk.kind==='heal'&&sk.tgt!=='enemies'))){
    const al=S.enemies.filter(x=>x.alive&&!x.d.passive);if(!al.length)return;
    if(sk.tgt==='allies'){say(e,`${e.name}: ${sk.name}!`);showBanner(sk.name);return A[sk.anim](e,al,sk);}
    const t=al.reduce((a,b)=>a.hp/a.maxHp<=b.hp/b.maxHp?a:b);say(e,`${e.name}: ${sk.name}!`);showBanner(sk.name);return A[sk.anim](e,[t],sk);}}catch(err){console.error(err);}
  return ue.apply(this,arguments);};}

// ---- Körrend („két hős támad, két ellenfél támad, megint két hős, megint két ellenfél”): a kör a hősök és az
// ellenfelek között kettesével váltakozik; a kör vége (állapotok, menekülés, körvégi események) változatlan
runBattle=async function(){
  while(!S.over){
    S.round++;
    const hs=S.heroes.slice(),es=S.enemies.slice();let hi=0,ei=0;
    const heroStep=async()=>{let n=0;while(hi<hs.length&&n<2){const h=hs[hi++];if(!h.alive||S.over||!S.heroes.includes(h))continue;h.guard=false;n++;
        if(await skipCheck(h))continue;await heroTurn(h);if(await checkEnd())return true;
        if(h.alive&&h.st.haste){popLabel(h,'EXTRA KÖR!','#fff27a');await wait(450);await heroTurn(h);if(await checkEnd())return true;}}return false;};
    const foeStep=async()=>{let n=0;while(ei<es.length&&n<2){const e=es[ei++];if(!e.alive||S.over||e.d.passive)continue;n++;
        if(await skipCheck(e))continue;const times=actsOf(e);for(let i=0;i<times&&e.alive&&!S.over;i++){await enemyAct(e);if(await checkEnd())return true;}}return false;};
    while(hi<hs.length||ei<es.length){if(await heroStep())return;if(await foeStep())return;}
    for(const e of S.enemies.slice()){if(e.alive&&e.d.flee){e.rounds=(e.rounds||0)+1;if(e.rounds>=e.d.flee)await fleeAnim(e);}}
    if(await checkEnd())return;
    for(const e of S.enemies.slice()){if(e.d.onRoundEnd&&!S.over){await e.d.onRoundEnd(e);if(await checkEnd())return;}}
    await tickStatuses();
    if(await checkEnd())return;
  }
};

// ---- Hősök elhelyezése („a 3. térképtől zsúfoltan állnak – úgy álljanak, mint az előző részekben”): a csapatban
// lévő négy hős mindig a négy klasszikus helyre áll; aki nem a saját helyén van (Jázmin, Kaelen), a kimaradó hős
// helyét kapja – így senki nem áll egymáson
function r21Place(){try{const SL={};for(const t of ['wizard','witch','fairy','orc'])if(HERO_DEF[t])SL[t]=HERO_DEF[t].pos;
  const used=new Set(),rest=[];for(const h of S.heroes){if(SL[h.type]&&!used.has(h.type)){used.add(h.type);h.x=SL[h.type][0];h.y=SL[h.type][1];}else rest.push(h);}
  const free=Object.keys(SL).filter(t=>!used.has(t)).sort((a,b)=>(a==='fairy')-(b==='fairy'));   // a tündér kicsi, lebegő helyét a végére
  for(const h of rest){const t=free.shift();if(!t)break;h.x=SL[t][0];h.y=SL[t][1];}}catch(e){}}
{const sb=startBattle;startBattle=function(){r21Place();return sb.apply(this,arguments);};}

// ---- Közös támadások („hiába vettem meg, nem jelennek meg”): a megvett páros támadás már 60%-os limitnél is
// elérhető (mindkét hősnél), és ha még nem az, a menüben szürkén ott van, kiírva, mi hiányzik. A Négyek ereje is
// mindig látszik, ha megvetted.
const R21_PAIR_MIN=60;
r14Pair=function(h){if(!h||h.limit<R21_PAIR_MIN||(!S.arena&&S._r21pairUsed))return null;for(const p of PAIRS){const other=p.a===h.type?p.b:p.b===h.type?p.a:null;if(!other||!r21Owns('pair:'+p.name))continue;
  const o=S.heroes.find(x=>x.type===other&&x.alive&&x.limit>=R21_PAIR_MIN);if(o)return {p,o};}return null;};
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{if(!h||typeof btnsEl!=='object'||!btnsEl)return r;
    const have=[...btnsEl.querySelectorAll('.bl')].map(x=>x.textContent);
    for(const p of PAIRS){const other=p.a===h.type?p.b:p.b===h.type?p.a:null;if(!other||!r21Owns('pair:'+p.name))continue;const o=S.heroes.find(x=>x.type===other);if(!o)continue;
      if(have.some(t=>t.includes(p.name)))continue;const b=document.createElement('button');b.type='button';b.className='cbtn limit r21wait';b.disabled=true;
      const l=document.createElement('span');l.className='bl';l.textContent='PÁROS: '+p.name;b.appendChild(l);const sb=document.createElement('span');sb.className='bs';
      sb.textContent=S._r21pairUsed&&!S.arena?'ebben a csatában már volt':(!o.alive?o.name+' elesett':`limit: ${h.name} ${Math.floor(h.limit)}% · ${o.name} ${Math.floor(o.limit)}% (kell ${R21_PAIR_MIN}%)`);b.appendChild(sb);btnsEl.appendChild(b);}
    if(r21Owns('combo')&&S.heroes.length===4&&!have.some(t=>/KÖZÖS/.test(t))&&!(typeof comboReady==='function'&&comboReady())){const b=document.createElement('button');b.type='button';b.className='cbtn limit r21wait';b.disabled=true;
      const l=document.createElement('span');l.className='bl';l.textContent='KÖZÖS TÁMADÁS: Négyek ereje';b.appendChild(l);const sb=document.createElement('span');sb.className='bs';sb.textContent='mind a négy hős limitje tele kell legyen';b.appendChild(sb);btnsEl.appendChild(b);}}catch(e){console.error(e);}return r;};}
{const st=document.createElement('style');st.textContent='.cbtn.r21wait{opacity:.55;filter:grayscale(.5);cursor:default}';document.head.appendChild(st);}

// ---- Lekvárdzsinn – Lekvárhullám („egy véletlen hős kerüljön zselékockába egy körig”): a hullám után egy véletlen
// hőst egy festett lekvár-zselékocka (fx7-jellycube) zár be: 1 körre kimarad (nem támadhat)
STATUS.jelly=['Zselékocka','#ff6a7a'];if(typeof ONE_ROUND!=='undefined')ONE_ROUND.add('jelly');
{const sc=skipCheck;skipCheck=async function(e){if(e&&e.st&&e.st.jelly){popLabel(e,'ZSELÉKOCKÁBAN','#ff6a7a');setPrompt(`${e.name} beleragadt a lekvár-zselébe, kimarad!`);setButtons([]);await wait(800);return true;}return sc.apply(this,arguments);};}
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){const r=await ue.apply(this,arguments);try{if(e&&e.type==='jamdjinn'&&sk&&sk.name==='Lekvárhullám'&&!S.over){const al=S.heroes.filter(h=>h.alive&&!(h.st&&h.st.jelly));if(al.length){const h=pick(al);
      const JC=R17I.jellycube,SP=r21Filt(R17I.brewsplash,'hue-rotate(110deg) saturate(1.6) brightness(1.05)');sfx('squish');sfx('splash');shake(10);
      if(SP)for(let i=0;i<10;i++)r21PD(SP,cx(h)+rnd(-40,40),midY(h)+rnd(-40,40),{vx:rnd(-220,220),vy:-rnd(120,380),g:900,life:.7,size:rnd(26,46),vr:rnd(-7,7)});
      h.st.jelly=2;h._r21jelly={k:0};tween(320,k=>{if(h._r21jelly)h._r21jelly.k=eOutBack(k);});popLabel(h,'ZSELÉKOCKA!','#ff6a7a');updateHUD();await wait(500);}}}catch(err){console.error(err);}return r;};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e._r21jelly){if(!e.alive||!e.st||!e.st.jelly){e._r21jelly=null;return r;}const JC=R17I.jellycube;if(JC){const k=e._r21jelly.k,wob=1+.03*Math.sin(T*7),hh=e.h*e.scale*1.12*k,w=Math.max(e.w*e.scale*1.5,hh*.85)*wob;
    ctx.save();ctx.globalAlpha=.78;ctx.drawImage(JC,cx(e)-w/2,e.y+e.oy+10-hh/wob,w,hh/wob);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.15;ctx.drawImage(JC,cx(e)-w/2,e.y+e.oy+10-hh/wob,w,hh/wob);ctx.restore();}}}catch(err){}return r;};}
if(ESK.jamwave)ESK.jamwave.desc='Ragacsos lekvárhullám az egész csapatra; egy véletlen hős egy körre zselékockába ragad.';

// ---- Levéltánc („mindenkire hasson”): minden ellenségre hat – a levélörvény a kiválasztott ellenfél körül forog, és
// minden vágása a többi ellenfélen is átsuhan (festett levelek csapódnak beléjük)
if(SK.mosspillow){Object.assign(SK.mosspillow,{tgt:'enemies',pow:1.15});SK.mosspillow.desc='Borotvaéles levelek folyama a bothegyből: körbetekeri az ellenségeket, és mindegyiket többször megvágja.';}
{const ld=A.leafDance;A.leafDance=async function(u,ts,sk){const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;if(al.length===1||!sk||sk.kind==='heal')return ld.call(this,u,al,sk);
  const t0=al.reduce((a,b)=>Math.abs(cx(a)-(cx(al[0])+cx(al[al.length-1]))/2)<Math.abs(cx(b)-(cx(al[0])+cx(al[al.length-1]))/2)?a:b),others=al.filter(t=>t!==t0),h0=hit,LF=R17I.leaf;
  hit=function(a,t,s){const r=h0.apply(this,arguments);try{if(a===u&&t===t0)for(const o of others){if(!o.alive)continue;o.hurt=.35;if(LF)for(let n=0;n<6;n++)r21PD(LF,cx(o)+rnd(-30,30),midY(o)+rnd(-40,40),{vx:rnd(-260,260),vy:rnd(-260,60),g:200,life:.7,size:rnd(22,36),vr:rnd(-8,8),drag:1});h0.call(this,a,o,s);}}catch(e){}return r;};
  try{return await ld.call(this,u,[t0],sk);}finally{hit=h0;}};}

// ---- Kőőr – Kőfal („a rétege nem jó, nem alkalmazkodik”): a festett kőfal az ellenfél SAJÁT rétegében, közvetlenül
// a figura után rajzolódik (aki előtte áll, az elé kerül), és követi a figura helyét és méretét
A.stoneWall=async(u,ts,sk)=>{const im=typeof R3==='function'?R3('stonewall'):null;u.pose='cast';sfx('quake');shake(16);
  const W={k:0,a:1,ready:false};u._r21wall=W;
  const pos=()=>{const Wd=Math.max(200,u.w*u.scale*1.3),gx=cx(u)-u.w*u.scale*.8,gy=u.y+u.oy+20;return {Wd,gx,gy};};
  {const p=pos();for(let i=0;i<40;i++)part({x:p.gx+rnd(-p.Wd/2,p.Wd/2),y:p.gy,vx:rnd(-220,220),vy:rnd(-380,-120),life:rnd(.7,1.1),size:rnd(6,12),rgb:pick(['140,130,110','110,100,85']),g:700,add:false,shape:'rock'});
   puffs&&puffs(p.gx,p.gy,12,['170,160,140','140,130,110'],[20,40],{w:p.Wd*.6,up:110});}
  await tween(520,k=>W.k=eOutBack(k));addStatus(u,'stonewall',2);W.ready=true;popLabel(u,'KŐFAL!','#c9bfae');await wait(400);u.pose='idle';};
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{const W=e&&e._r21wall;if(W){if(!S.enemies.includes(e))e._r21wall=null;else{if(W.ready&&!(e.alive&&e.st&&e.st.stonewall))W.a-=.03;if(W.a<=0){e._r21wall=null;return r;}
    const im=typeof R3==='function'?R3('stonewall'):null;if(im&&W.k>0){const Wd=Math.max(200,e.w*e.scale*1.3),gx=cx(e)-e.w*e.scale*.8,gy=e.y+e.oy+20;ctx.save();ctx.globalAlpha=Math.max(0,W.a);r17Draw(im,gx,gy,Wd,{anchor:'bottom',sy:W.k});ctx.restore();}}}}catch(err){}return r;};}

// ---- Bambuszkígyó („csak farokcsapást csinál”): a Rátekeredés ugyanolyan gyakori, mint a farokcsapás
if(EN_DEF.bambsnake)EN_DEF.bambsnake.skills=[['vinewhip',1],['coilsnap',1]];

// ---- Mochi-király – Királyi hasraesés („nem alakult át golyóvá, suhanjon végig”): a saját teste összegömbölyödik
// (a figura képe kör alakúra gyúrva, forogva), felpattan, és golyóként végiggurul-suhan az összes hősön
// (mindegyiket elüti), a sor végén visszapattan és visszaalakul
A.royalFlop=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const sp=ENEMY_SPR.mochiking;u.pose='attack';
  const B={on:true,k:0,rot:0,x:cx(u),y:midY(u),R:u.h*u.scale*.42};u._r21ball=B;
  try{sfx('squish');
    // 1) összegömbölyödik
    await tween(380,k=>{B.k=easeIO(k);B.rot=-.6*k;u.sq=1-.1*Math.sin(k*Math.PI);});u.sq=1;
    // 2) felpattan
    sfx('boing');const gy=u.y+u.oy;await tween(260,k=>{B.y=gy-B.R-Math.sin(k*Math.PI)*120;B.rot-=.2;});
    // 3) végigsuhan a hősökön balra
    const order=al.slice().sort((a,b)=>cx(b)-cx(a)),x0=B.x,xe=Math.min(...al.map(cx))-180,hitd=new Set();sfx('whoosh');
    await tween(Math.max(700,(x0-xe)*1.1),k=>{const e=k*k*(3-2*k);B.x=x0+(xe-x0)*e;B.y=gy-B.R-Math.abs(Math.sin(k*Math.PI*3))*40;B.rot-=.35;
      if(Math.random()<.5)r21PD&&R17I.teacloud&&r21PD(r21Filt(R17I.teacloud,'saturate(.3) brightness(1.2)'),B.x+rnd(-20,20),gy-rnd(0,20),{vx:rnd(40,140),vy:-rnd(10,40),life:.7,size:rnd(60,90),grow:40,a:.6});
      for(const t of order)if(!hitd.has(t)&&B.x<=cx(t)+20){hitd.add(t);sfx('hit');sfx('squish');shake(14);hitStop(60);t.hurt=.6;toss(t,70,420);hit(u,t,sk);}});
    for(const t of order)if(!hitd.has(t)&&t.alive)hit(u,t,sk);
    // 4) visszapattan a helyére
    sfx('boing');const bx=B.x;await tween(620,k=>{const e=easeIO(k);B.x=bx+(x0-bx)*e;B.y=gy-B.R-Math.sin(k*Math.PI)*170;B.rot+=.25;});
    // 5) visszaalakul
    sfx('squish');shake(10);await tween(320,k=>{B.k=1-easeIO(k);B.y=midY(u)+(gy-B.R-midY(u))*(1-k);});
  }finally{u._r21ball=null;u.pose='idle';u.sq=1;}};
{const de=drawEntity;drawEntity=function(e){const B=e&&e._r21ball;if(!B||B.k<=0||!ENEMY_SPR.mochiking)return de.apply(this,arguments);
  const sp=ENEMY_SPR.mochiking,k=B.k;if(k<1){const a0=e.alpha==null?1:e.alpha;e.alpha=a0*(1-k);try{de.apply(this,arguments);}finally{e.alpha=a0;}}
  try{const R=B.R;ctx.save();ctx.globalAlpha*=k;ctx.translate(B.x,B.y);
    ctx.save();ctx.translate(0,e.y+e.oy-B.y+2);ctx.scale(1,.22);ctx.fillStyle='rgba(0,0,0,.35)';ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();ctx.restore();
    ctx.rotate(B.rot);ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.clip();const s=Math.max(2*R/sp.width,2*R/sp.height)*1.05;ctx.scale(-1,1);ctx.drawImage(sp,-sp.width*s/2,-sp.height*s*.55,sp.width*s,sp.height*s);ctx.restore();}catch(err){}};}

// ---- Mézkirálynő – Zümmögővihar („nyissa szét a palástját, és onnan jöjjön a méhraj”): a saját lila palástja
// (bábu-testrész) szétnyílik, és a raj a palást belsejéből tör elő
if(typeof LIMBS==='object'){LIMBS.queenbee={parts:{cape:{poly:[[.65,.47],[.74,.5],[.86,.66],[.96,.88],[.86,.93],[.73,.91],[.67,.82],[.66,.62]],pivot:[.66,.49]}}};if(DRAW.queenbee&&typeof wrapLimbDraw==='function')wrapLimbDraw('queenbee');}
{const bs=A.beeSwarm;A.beeSwarm=async function(e,ts,sk){if(!e||e.type!=='queenbee'||typeof limbOn!=='function')return bs.apply(this,arguments);const al=(ts||[]).filter(h=>h.alive);if(!al.length)return;
  const T2=limbOn(e,'queenbee'),c=T2&&T2.cape;e.pose='idle';sfx('whoosh');
  try{if(c)await tween(420,k=>{const q=easeIO(k);c.rot=-.85*q;c.dx=.04*q;c.s=1+.08*q;});
    e.pose='idle';const src=typeof limbPt==='function'?limbPt(e,'cape',.78,.72):{x:cx(e)-40,y:midY(e)};
    {const GB=r21Filt(R17I.goldburst,'saturate(1.2)');if(GB){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.6;},draw(){const k=st.t/.6;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,src.x,src.y,e.h*e.scale*(.4+.6*k),{a:1-k});ctx.restore();}});}}
    await beeStream(src,al,-1,2.6,h=>hit(e,h,sk));
    if(c)await tween(360,k=>{const q=1-easeIO(k);c.rot=-.85*q;c.dx=.04*q;c.s=1+.08*q;});
  }finally{limbOff(e);e.pose='idle';}};}

// ---- Kamilla – Álompajzs („nem tetszik, találj ki mást”): a buborék helyett ÁLOMFÁTYOL – a rémálmokból festett
// sötét álomköd-szalagok (fx7-teacloud lilás-sötétre színezve) áramlanak Kamillába, és lassan forgó álomköd-gubó
// takarja; amíg él rémálom, nem sebezhető. Ha mind elesett, a fátyol szétszakad.
{const ko=SPR_OVER.kamilla;SPR_OVER.kamilla=(e,t)=>{const shielded=e.alive&&!S.over&&e.phase===2&&S.enemies.some(x=>x.type==='nightmare'&&x.alive);
  if(shielded){const p=e.phase;e.phase=-2;try{if(ko)ko(e,t);}finally{e.phase=p;}}else if(ko)ko(e,t);};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e.type==='kamilla'&&e.alive&&!S.over&&e.phase===2){const nm=S.enemies.filter(x=>x.type==='nightmare'&&x.alive);
    const CL=r21Filt(R17I.teacloud,'grayscale(.6) brightness(.55) sepia(.4) hue-rotate(230deg) saturate(2.2)');if(!CL)return r;const x=cx(e),y=midY(e),R=e.h*e.scale*.5;
    if(nm.length){e._r21veil=1;ctx.save();ctx.globalAlpha=.55;for(let i=0;i<7;i++){const an=T*.6+i/7*6.283;r17Draw(CL,x+Math.cos(an)*R*.55,y+Math.sin(an*1.2)*R*.7,R*1.1,{rot:an});}ctx.restore();
      for(const n of nm)if(Math.random()<.35)r21PD(CL,cx(n)+rnd(-20,20),midY(n)+rnd(-20,20),{vx:(x-cx(n))*1.4,vy:(y-midY(n))*1.4,life:.7,size:rnd(60,90),grow:20,vr:rnd(-1,1),a:.7});
      ctx.save();txt('ÁLOMFÁTYOL',x,topY(e)-62,18,'#e6c8ff','#1a0f24');txt('a rémálmok táplálják',x,topY(e)-44,12,'#ffffff','#1a0f24');ctx.restore();}
    else if(e._r21veil){e._r21veil=0;sfx('wind');for(let i=0;i<10;i++)r21PD(CL,x+rnd(-R*.5,R*.5),y+rnd(-R*.6,R*.6),{vx:rnd(-260,260),vy:rnd(-220,120),life:.9,size:rnd(80,130),grow:60,vr:rnd(-1.5,1.5),a:.8});popLabel(e,'A FÁTYOL SZÉTSZAKADT!','#e6c8ff');}}}catch(err){}return r;};}
if(EN_DEF.kamilla&&EN_DEF.kamilla.info)EN_DEF.kamilla.info=EN_DEF.kamilla.info.replace(/Álompajzs védi( \(ezt a buborék mutatja\))?/,'Álomfátyol védi (a rémálmok táplálják)');
{const L=ZONES.flatMap(z=>z.levels).find(l=>l.id==='8-4');if(L&&L.intro)L.intro=L.intro.replace('Álompajzs védi','Álomfátyol védi');}

// ---- Kamilla után ne „zárja le a játékot” („megköszöni, pedig van 3. térkép is”): a 8-4 után „A második rész vége”
// jön, egyenesen a 3. térképre visz; a „Köszönjük, hogy játszottál!” és az Új játék+ csak a 12-4 (Chasen) után
{const cs=creditsScreen;creditsScreen=function(){
  if(cleared('8-4')&&!cleared('12-4')){const n=ngp();n.credits2=true;ngpSet(n);try{if(S.save&&S.save.seen&&!S.save.seen.includes('p3')){S.save.seen.push('p3');saveGame();}}catch(e){}
    S.over=true;S.enemies=[];setPrompt('A második rész vége');setButtons([]);
    overlay([['p','ov-sub','Az Elveszett Ízek Nyomában'],['h1','ov-title','A második rész vége'],
      ['p','ov-text','Kamilla elengedte az álmot, és Mesevölgy felébredt. De fél év múlva egy reggel minden íztelen lesz – a kávé, a tea, még Grog sütije is…'],
      ['div','ov-list',['A harmadik rész: a Békemester – négy új vidék, új társ (Kaelen, a druida)','A szinthatár 60-ról 90-re nő','A térképen a „3. térkép ▸” gombbal jutsz az új vidékekre']]],
      [{label:'Irány a harmadik rész!',on:()=>mapScreen(8)},{label:'Vissza a második térképre',sec:true,on:()=>mapScreen(7)}]);
    if(typeof confetti==='function')confetti(true);return;}
  const r=cs.apply(this,arguments);
  try{if(cleared('12-4')){const n=ngp();n.credits3=true;ngpSet(n);for(const el of ov.querySelectorAll('.ov-list > *'))if(/^Hősök:/.test(el.textContent))el.textContent='Hősök: Zordon, Morgána, Lili, Grog, Jázmin, Kaelen';}}catch(e){}
  return r;};}
{const ms=mapScreen;mapScreen=function(zi){try{if(!S.arena&&cleared('12-4')&&!ngp().credits3)return creditsScreen();}catch(e){}return ms.apply(this,arguments);};}

// ---- Kaelen csatlakozása („nem volt képregény”): mielőtt a „Kaelen csatlakozott” ablak megjelenik, három festett
// képregény-kocka (a bambuszerdő festett háttere + Kaelen festett figurái) meséli el, hogyan áll a csapat mellé
R21_COMIC.druid={num:'Új társ',title:'Kaelen, a bambuszerdő druidája',custom:true,p:[
  {c:'A Suttogó Bambuszosban a bambuszok nem susognak többé. Egy alak áll a néma szárak között.',w:'Kaelen',t:'Chasen az én erdőmet is elnémította. Egy fűszál sem rezdül.'},
  {c:'A druida a botjára támaszkodik; a bothegyen zöld fény gyúl.',w:'Kaelen',t:'Ha a Békemesterhez mentek, az erdő velem együtt megy veletek.'},
  {c:'Kaelen int, és a bambuszerdő egy pillanatra újra megmozdul.',w:'Zordon',t:'Egy druida, aki üt is? Isten hozott a csapatban!'}]};
{const cp=r21ComicPanels;r21ComicPanels=function(key){const D=R21_COMIC[key];if(D&&D.custom&&key==='druid'){
    const mk=(th,spr,h)=>{const f=()=>r21ComicCompose(th,ENEMY_SPR[spr]||ENEMY_SPR.druid,h);f.theme=th;return f;};
    return [mk('bamboo','druid',520),mk('bamboo','druid-cast',560),mk('terrace','druid-attack',560)];}return cp.apply(this,arguments);};}
{const ms=mapScreen;mapScreen=function(zi){try{if(!S.arena&&S.joinMsg&&S.joinMsg[0]==='druid'&&S.save&&S.save.seen&&!S.save.seen.includes('cmdruid')){S.save.seen.push('cmdruid');saveGame();
      hideOverlay&&hideOverlay();if(r21Comic('druid',()=>mapScreen(zi)))return;}}catch(e){console.error(e);}return ms.apply(this,arguments);};}
