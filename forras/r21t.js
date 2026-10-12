// ===== 31. kör: új játékmenet-elemek (a felhasználó kérése: 1–5. ötlet) =====
// 1. talajba nyomódás nagy ütésnél, 2. visszavágás, 3. kombó-számláló, 4. pálya-események, 5. főellenség dühfázisa

const r21IsHeavy=sk=>!!sk&&(sk.isLimit||(sk.pow||0)>=1.8||(typeof LIMITS==='object'&&Object.values(LIMITS).some(l=>l.name===sk.name))||(typeof PAIRS==='object'&&PAIRS.some(p=>p.name===sk.name)));
const r21Now=()=>performance.now()/1000;

// ---- 1. Talajba nyomódás: a nagy ütéstől (LIMIT, páros, erős képesség) az ellenség belesüllyed a földbe, alatta kráter és
// sötét repedések maradnak kb. 3 másodpercig; por és kődarabok csapódnak fel
function r21Sink(t){if(!t||t.kind!=='enemy')return;t._sk={t0:r21Now(),seed:Math.random()*1000};const x=cx(t),gy=t.y+t.oy;
  for(let i=0;i<14;i++)part({x:x+rnd(-50,50),y:gy,vx:rnd(-200,200),vy:-rnd(40,140),life:rnd(.5,.9),size:rnd(14,26),grow:20,rgb:pick(['150,125,95','120,100,75']),add:false,shape:'smoke'});
  for(let i=0;i<12;i++)part({x:x+rnd(-40,40),y:gy,vx:rnd(-220,220),vy:-rnd(150,380),g:900,life:.7,size:rnd(4,9),rgb:pick(['110,85,55','90,70,45']),add:false,shape:'rock'});}
function r21Crater(e,s,a){const x=cx(e),gy=e.y+e.oy+2,W=Math.max(60,e.w*e.scale*.6);ctx.save();ctx.globalAlpha=a;
  ctx.save();ctx.translate(x,gy);ctx.scale(1,.2);const g=ctx.createRadialGradient(0,0,4,0,0,W);g.addColorStop(0,'rgba(25,15,8,.85)');g.addColorStop(.7,'rgba(45,30,15,.45)');g.addColorStop(1,'rgba(45,30,15,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W,0,6.283);ctx.fill();ctx.restore();
  ctx.lineCap='round';ctx.lineJoin='round';let sd=s.seed;const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};
  for(let i=0;i<8;i++){const an=i/8*6.283+R()*.5,L=W*(.9+R()*.8);ctx.strokeStyle='rgba(30,18,8,.9)';ctx.lineWidth=3.5-i%3;ctx.beginPath();ctx.moveTo(x,gy);
    let px=x,py=gy;for(let j=1;j<=3;j++){const q=j/3;px=x+Math.cos(an+(R()-.5)*.5)*L*q;py=gy+Math.sin(an)*L*q*.2;ctx.lineTo(px,py);}ctx.stroke();}
  ctx.restore();}
{const de=drawEntity;drawEntity=function(e){const s=e&&e._sk;if(!s)return de.apply(this,arguments);const tt=r21Now()-s.t0;if(tt>3.2){e._sk=null;return de.apply(this,arguments);}
  if(!FRONT_DRAW)r21Crater(e,s,tt<2.4?1:1-(tt-2.4)/.8);
  const D=Math.min(26,e.h*e.scale*.09),k=tt<.1?tt/.1:tt<.75?1:tt<1.35?1-(tt-.75)/.6:0,sink=D*k*(1-(e.jump||0)/40>0?1:0);
  if(sink<=.5)return de.apply(this,arguments);const gy=e.y+e.oy;ctx.save();ctx.beginPath();ctx.rect(-500,-500,3000,gy+502);ctx.clip();ctx.translate(0,sink);try{return de.apply(this,arguments);}finally{ctx.restore();}};}

// ---- 3. Kombó: ha egymás után több KÜLÖNBÖZŐ hős üti ugyanazt az ellenséget (közben az ellenség nem lépett), a sebzés
// nő (+15% / láncszem, legfeljebb +45%), és nagy arany „KOMBÓ ×n” felirat jelenik meg
function r21ComboFx(t,n){const st={t:0},x=cx(t),y=topY(t)-40;sfx('hit');shake(4+n*2);
  for(let i=0;i<18+n*6;i++)part({x,y,vx:rnd(-260,260),vy:rnd(-260,60),life:rnd(.5,.9),size:rnd(3,6),rgb:pick(['255,220,90','255,170,40','255,255,255']),shape:'star'});
  R18E({update(dt){st.t+=dt;return st.t<1.3;},draw(){const k=Math.min(1,st.t/.18),a=st.t<.9?1:1-(st.t-.9)/.4,sc=(.6+.6*r21ease.back(k))*(1+.08*n);
    ctx.save();ctx.globalAlpha=a;ctx.translate(x,y-st.t*24);ctx.scale(sc,sc);ctx.rotate(-.06);txt('KOMBÓ ×'+n,0,0,34,n>=4?'#ff9a3a':'#ffd84a','#2a1404');txt('+'+Math.round(Math.min(45,15*(n-1)))+'% sebzés',0,26,15,'#fff3c0','#2a1404');ctx.restore();}});}

// ---- 2. Visszavágás: ha egy ellenség túlél egy erős ütést, 15% eséllyel azonnal visszaüt a támadóra
async function r21Counter(e,h){sfx('growl');shake(6);
  const st={t:0};R18E({update(dt){st.t+=dt;return st.t<1;},draw(){const a=st.t<.7?1:1-(st.t-.7)/.3,k=Math.min(1,st.t/.15);ctx.save();ctx.globalAlpha=a;ctx.translate(cx(e),topY(e)-34);ctx.scale(.7+.4*r21ease.back(k),.7+.4*r21ease.back(k));txt('VISSZAVÁG!',0,0,30,'#ff7a4a','#2a0a04');ctx.restore();}});
  await wait(450);const ids=(e.d.skills||[]).map(x=>x[0]).filter(id=>ESK[id]&&ESK[id].tgt==='enemy'&&ESK[id].kind!=='heal'&&A[ESK[id].anim]);
  const sk=ids.length?ESK[pick(ids)]:null;if(!sk)return;await useEnemySkill(e,sk,h);}

{const h0=hit;hit=function(u,t,sk){let mul=1;
  try{if(u&&t&&sk&&u.kind==='hero'&&t.kind==='enemy'&&t.alive&&(sk.kind==='phys'||sk.kind==='mag')){const C=S._cmb||(S._cmb={});
      if(C.act!==S._actId){C.act=S._actId;if(C.e===t&&C.u!==u&&C.round===S.round)C.n=(C.n||1)+1;else C.n=1;C.e=t;C.u=u;C.round=S.round;if(C.n>=2)r21ComboFx(t,C.n);}
      if(C.e===t&&C.n>=2)mul=Math.min(1.45,1+.15*(C.n-1));}}catch(e){}
  const hp0=t?t.hp:0,r=h0.call(this,u,t,mul!==1?Object.assign({},sk,{pow:sk.pow*mul}):sk);
  try{const dmg=t?hp0-t.hp:0;if(u&&t&&dmg>0&&u.kind==='hero'&&t.kind==='enemy'){
      if(r21IsHeavy(sk))r21Sink(t);
      if(t.alive&&!S.test&&!S._counter&&!t.d.passive&&!t.st.stun&&!t.st.freeze&&!t.st.sleep&&!(t.rooted&&t.rooted.alive)&&(dmg>=t.maxHp*.1||(sk.pow||0)>=1.5)&&Math.random()<.15)S._counter={e:t,h:u};}}catch(e){}
  return r;};}
{const pf=perform;perform=async function(h,act){S._actId=(S._actId||0)+1;S._counter=null;const r=await pf.apply(this,arguments);
  try{const c=S._counter;S._counter=null;if(c&&h&&h.kind==='hero'&&!S.over&&c.e.alive&&c.h.alive&&S.heroes.includes(c.h))await r21Counter(c.e,c.h);}catch(e){console.error(e);}return r;};}

// ---- 4. Pálya-események (minden 2. kör végén, 70% eséllyel): figyelmeztetés után a pálya maga sebez egy véletlen
// harcost (hőst vagy ellenséget) – a pálya életre kel, nem csak háttér. Sosem öl meg senkit (legalább 1 ÉP marad).
const R21EV={matchacave:'steam',teahouse:'steam',teahall:'steam',kiln:'steam',bamboo:'bamboo',matchastream:'bamboo',volcano:'rocks',mistpeak:'rocks',summit:'rocks',cave:'rocks',crystal:'rocks'};
function r21EvDmg(t,frac,label,col){const n=Math.min(Math.round(t.maxHp*frac),t.hp-1);if(n<=0)return;t.hp-=n;t.hurt=.5;popNum(t,n,'dmg');popLabel(t,label,col);updateHUD();}
async function r21SteamVent(t){const x=cx(t),gy=t.y+t.oy,st={k:0,a:1,cr:0};showBanner('Pálya-esemény: Gőzkitörés');
  R18E({update(){return st.a>0;},draw(){if(st.cr>0){ctx.save();ctx.globalAlpha=st.a*st.cr;ctx.strokeStyle='rgba(30,20,10,.9)';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<6;i++){const an=i/6*6.283;ctx.moveTo(x,gy);ctx.lineTo(x+Math.cos(an)*60*st.cr,gy+Math.sin(an)*12*st.cr);}ctx.stroke();ctx.restore();}
    if(st.k>0){ctx.save();ctx.globalCompositeOperation='lighter';const H=320*st.k,g=ctx.createLinearGradient(0,gy,0,gy-H);g.addColorStop(0,`rgba(235,245,230,${.55*st.a})`);g.addColorStop(1,'rgba(235,245,230,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-30,gy);ctx.lineTo(x-70,gy-H);ctx.lineTo(x+70,gy-H);ctx.lineTo(x+30,gy);ctx.closePath();ctx.fill();ctx.restore();}}});
  sfx('quake');await tween(700,k=>{st.cr=k;t.spin=.04*Math.sin(k*40);if(Math.random()<.4)r21Steam(x+rnd(-40,40),gy-4,rnd(-15,15),-rnd(30,70),false);});t.spin=0;
  sfx('steam');sfx('boom');shake(12);for(let i=0;i<26;i++)r21Steam(x+rnd(-30,30),gy-rnd(0,40),rnd(-60,60),-rnd(160,380),false);
  await tween(260,k=>st.k=r21ease.out(k));toss(t,90,520);r21EvDmg(t,.08,'GŐZKITÖRÉS!','#e8f4ff');await wait(500);await tween(500,k=>{st.a=1-k;});}
async function r21BambooFall(t){const im=R17I.bamboopole,x=cx(t),gy=t.y+t.oy,side=x>480?1:-1,px=x+side*170,H=360,st={r:0,a:1};showBanner('Pálya-esemény: Kidőlő bambusz');
  R18E({update(){return st.a>0;},draw(){if(!im)return;const w=H*im.width/im.height;ctx.save();ctx.globalAlpha=st.a;ctx.translate(px,gy+4);ctx.rotate(-side*st.r);ctx.drawImage(im,-w/2,-H,w,H);ctx.restore();}});
  sfx('rock');await tween(500,k=>{st.r=.08*Math.sin(k*18)*(k);if(Math.random()<.3)part({x:px,y:gy-H*.8,vx:rnd(-60,60),vy:rnd(0,60),g:200,life:1,size:rnd(6,10),rgb:pick(KAE.leaf),add:false,shape:'leaf'});});
  sfx('whoosh');await tween(420,k=>{st.r=Math.atan2(Math.abs(px-x),H*.55)*r21ease.in(k);});
  sfx('hit');sfx('rock');shake(14);kaeLeaves(x,midY(t),36,380);toss(t,40,380);r21EvDmg(t,.09,'LEZUHANÓ BAMBUSZ!','#b8e07a');await wait(600);await tween(400,k=>st.a=1-k);}
async function r21RockFall(t){const x=cx(t),gy=t.y+t.oy,R=[];showBanner('Pálya-esemény: Kőomlás');sfx('quake');shake(8);
  R18E({update(dt){for(const r of R){r.vy+=1400*dt;r.y+=r.vy*dt;r.rot+=dt*4;if(r.y>=r.ty&&!r.hit){r.hit=true;sfx('rock');shake(6);for(let i=0;i<8;i++)part({x:r.x,y:r.ty,vx:rnd(-200,200),vy:-rnd(80,260),g:900,life:.6,size:rnd(4,8),rgb:'110,95,80',add:false,shape:'rock'});}}return R.some(r=>!r.hit);},
    draw(){for(const r of R)if(!r.hit){ctx.save();ctx.translate(r.x,r.y);ctx.rotate(r.rot);ctx.fillStyle='#6d6052';ctx.strokeStyle='#2c241c';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<7;i++){const an=i/7*6.283,rr=r.s*(.75+.25*Math.sin(i*2.3+r.s));ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}}});
  for(let i=0;i<7;i++){R.push({x:x+rnd(-50,50),y:-40-i*50,vy:0,ty:midY(t)+rnd(-30,40),s:rnd(14,26),rot:rnd(0,6)});}
  await wait(900);toss(t,30,300);r21EvDmg(t,.08,'KŐOMLÁS!','#d8c8b0');await wait(400);}
{const ts0=tickStatuses;tickStatuses=async function(){const r=await ts0.apply(this,arguments);
  try{const ev=R21EV[S.theme];if(ev&&!S.over&&!S.test&&!S.arena&&S.round>=2&&S.round%2===0&&Math.random()<.7){const all=[...S.heroes,...S.enemies].filter(e=>e.alive&&e.hp>1);if(all.length){const t=pick(all);
      if(ev==='steam')await r21SteamVent(t);else if(ev==='bamboo')await r21BambooFall(t);else await r21RockFall(t);}}}catch(e){console.error(e);}return r;};}

// ---- 5. Főellenség dühfázisa: fél életerőnél a főellenség feldühödik – izzó repedések futnak végig a testén, vörösen
// lüktet körülötte a levegő, és új támadást kap: „Dühkitörés” (felugrik, a földbe csap, lökéshullám az egész csapatra)
const R21RAGE_SKIP=['king','oak','chasen'];
const r21CanRage=e=>e&&e.kind==='enemy'&&e.d&&e.d.boss&&!R21RAGE_SKIP.includes(e.type);
const R21RAGE_SK={name:'Dühkitörés',tgt:'enemies',kind:'phys',pow:1.15,elem:'phys',anim:'r21rage'};
function r21RageCracks(e){if(!e._rc){let sd=(e.type||'x').length*97+13;const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};e._rc=[...Array(6)].map(()=>{const p=[[.35+R()*.3,.3+R()*.3]];for(let j=0;j<3;j++){const l=p[p.length-1];p.push([l[0]+(R()-.5)*.14,l[1]+R()*.1]);}return p;});}return e._rc;}
{const de=drawEntity;drawEntity=function(e){if(!e||!e._p2||!e.alive||FRONT_DRAW)return de.apply(this,arguments);const x=cx(e),pul=.5+.5*Math.sin(T*6);
  ctx.save();ctx.globalCompositeOperation='lighter';glow(x,midY(e),e.h*e.scale*.62,'255,60,30',.18+.14*pul);ctx.restore();
  const r=de.apply(this,arguments);
  try{const P=r21RageCracks(e);ctx.save();ctx.lineCap='round';ctx.lineJoin='round';for(const [c,w] of [['rgba(40,8,4,.85)',5],[`rgba(255,${140+Math.round(80*pul)},60,.95)`,2.2]]){ctx.strokeStyle=c;ctx.lineWidth=w;
      for(const p of P){ctx.beginPath();p.forEach(([fu,fv],i)=>{const q=sprPt(e,fu,fv);i?ctx.lineTo(q.x,q.y):ctx.moveTo(q.x,q.y);});ctx.stroke();}}ctx.restore();
    if(Math.random()<.25)part({x:x+rnd(-e.w*e.scale*.3,e.w*e.scale*.3),y:midY(e)+rnd(-30,30),vx:rnd(-20,20),vy:-rnd(40,90),life:rnd(.6,1),size:rnd(10,18),grow:16,rgb:'90,40,30',add:false,shape:'smoke'});}catch(err){}
  return r;};}
A.r21rage=async(u,ts,sk)=>{u.pose='attack';sfx('roar');popLabel(u,'DÜHKITÖRÉS!','#ff6a3a');
  await tween(360,k=>{u.jump=110*r21ease.out(k);});await wait(90);sfx('whoosh');await tween(160,k=>{u.jump=110*(1-r21ease.in(k));});u.jump=0;
  shake(30);sfx('boom');sfx('quake');flash('255,90,40',.3,.15);rumble&&rumble(1.3,10);const gy=u.y+u.oy;
  for(let i=0;i<40;i++)part({x:cx(u)+rnd(-60,60),y:gy,vx:-rnd(150,600),vy:-rnd(30,140),life:rnd(.6,1.1),size:rnd(16,30),grow:22,rgb:pick(['150,120,90','120,95,70','160,80,50']),add:false,shape:'smoke'});
  for(let i=0;i<24;i++)part({x:cx(u)+rnd(-40,40),y:gy,vx:rnd(-500,100),vy:-rnd(200,500),g:950,life:.8,size:rnd(5,11),rgb:pick(['110,85,55','90,70,45']),add:false,shape:'rock'});
  for(const h of ts.slice().sort((a,b)=>cx(b)-cx(a))){if(!h.alive)continue;await wait(110);sfx('hit');h.hurt=.6;toss(h,60,420);hit(u,h,sk);}
  u.pose='idle';await wait(400);};
async function r21Phase2(e){showBanner(`${e.name} feldühödött!`,true);say(e,`${e.name} feldühödött! Izzó repedések futnak végig a testén – új támadása van: Dühkitörés.`);
  e.pose='attack';sfx('roar');shake(18);flash('255,80,30',.35,.2);rumble&&rumble(1.2,10);
  for(let i=0;i<50;i++)part({x:cx(e),y:midY(e),vx:rnd(-380,380),vy:rnd(-380,120),life:rnd(.6,1.1),size:rnd(4,8),rgb:pick(['255,120,40','255,200,90','200,40,20']),shape:'star'});
  e._p2=true;await wait(900);e.pose='idle';}
{const ea=enemyAct;enemyAct=async function(e){S._cmb={};
  try{if(r21CanRage(e)&&e.alive){if(!e._p2&&e.hp<e.maxHp*.5){await r21Phase2(e);await useEnemySkill(e,R21RAGE_SK,null);return;}
      if(e._p2&&Math.random()<.35){await useEnemySkill(e,R21RAGE_SK,null);return;}}}catch(err){console.error(err);}
  return ea.apply(this,arguments);};}
{const sb=startBattle;startBattle=function(){const r=sb.apply(this,arguments);try{S._cmb={};S._counter=null;}catch(e){}return r;};}

// ---- PÁROS: Tündérököl (a felhasználó: „gagyi”): nagyobb, látványosabb – Lili körberepüli Grogot, és sűrű aranypor-spirált
// szór rá; Grog aranyban izzik, megnő, mögötte forgó fénysugarak; az öklén (a saját kezén) festett aranyököl nő; Grog
// magasra ugrik arany utóképekkel, öklével előre zuhan, és a földbe csap: óriás festett aranyrobbanás, izzó arany
// repedések futnak minden ellenségig, alattuk fényoszlop tör fel, és magasra repülnek; a csapat gyógyul (p.heal)
{R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const im=R17I.goldburst,fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;await dimTo(.55,'40,30,0',300);
  const fx0=fairy.ox||0,fy0=fairy.oy||0,dxF=cx(orc)-cx(fairy),dyF=topY(orc)-50-midY(fairy);
  await tween(420,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*e;fairy.oy=fy0+dyF*e-Math.sin(k*Math.PI)*60;});fairy.pose='cast';sfx('holy');
  // aranyfény Grogon: izzás, forgó fénysugarak mögötte, növekedés
  const Au={a:0,on:true,rot:0};R18E({update(dt){Au.rot+=dt*.8;if(Au.on&&Au.a>0&&Math.random()<.6)part({x:cx(orc)+rnd(-60,60),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.5,.9),size:rnd(2,5),rgb:pick(['255,230,120','255,255,255']),shape:'star'});return Au.on;},
    draw(){if(Au.a<=0)return;const x=cx(orc),y=midY(orc),R=orc.h*orc.scale*.95;ctx.save();ctx.globalCompositeOperation='lighter';
      for(let i=0;i<12;i++){const an=Au.rot+i/12*6.283,g=ctx.createLinearGradient(x,y,x+Math.cos(an)*R,y+Math.sin(an)*R);g.addColorStop(0,`rgba(255,225,120,${.32*Au.a})`);g.addColorStop(1,'rgba(255,225,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(an-.09)*R,y+Math.sin(an-.09)*R);ctx.lineTo(x+Math.cos(an+.09)*R,y+Math.sin(an+.09)*R);ctx.closePath();ctx.fill();}
      glow(x,y,orc.h*orc.scale*.75,'255,210,90',.28*Au.a);ctx.restore();}});
  orc._r16tint={rgb:'255,210,90',a:0};const s0=orc.scale;
  // Lili körberepüli Grogot, sűrű aranypor-spirál hullik rá
  await tween(1100,k=>{const an=k*Math.PI*3;fairy.ox=fx0+dxF+Math.cos(an)*orc.w*orc.scale*.6;fairy.oy=fy0+dyF+Math.sin(an)*26;
    for(let i=0;i<4;i++)part({x:cx(fairy)+rnd(-14,14),y:midY(fairy)+10,vx:rnd(-40,40),vy:rnd(80,200),g:120,life:rnd(.7,1.1),size:rnd(2,6),rgb:pick(['255,230,120','255,255,255','255,200,80']),shape:'star'});
    orc._r16tint.a=.3*k;orc.scale=s0*(1+.28*easeIO(k));Au.a=k;});
  await tween(320,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*(1-e);fairy.oy=fy0+dyF*(1-e);});fairy.ox=fx0;fairy.oy=fy0;fairy.pose='idle';
  // aranyököl a saját kezén
  const Fi={a:0,s:.4,on:true};const fist=()=>{const h=handPos(orc);return {x:h.x+6,y:h.y};};orc.pose='attack';
  R18E({update(){if(Fi.on&&Fi.a>0)for(let n=0;n<3;n++){const f=fist();part({x:f.x+rnd(-36,36),y:f.y+rnd(-36,36),vx:rnd(-50,50),vy:rnd(-70,20),life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['255,230,120','255,255,255']),shape:'star'});}return Fi.on;},
    draw(){if(Fi.a<=0)return;const f=fist(),S2=Math.max(60,orc.h*orc.scale*.3)*Fi.s;ctx.save();ctx.globalCompositeOperation='lighter';glow(f.x,f.y,S2*1.4*(1+.1*Math.sin(T*12)),'255,210,90',.6*Fi.a);glow(f.x,f.y,S2*.45,'255,250,220',.7*Fi.a);ctx.restore();
      if(R17I.goldfist)r17Draw(R17I.goldfist,f.x,f.y,S2*1.5,{a:Fi.a,rot:-.35+(orc.lean||0)*1.5});}});
  sfx('holy');await tween(380,k=>{Fi.a=k;Fi.s=.4+.6*eOutBack(k);});
  // magas ugrás arany utóképekkel a csapat közepe fölé, aztán öklével előre zuhan
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),mid=xs.reduce((s,t)=>s+cx(t),0)/xs.length,t0=xs[0],ox0=orc.ox||0,oy0=orc.oy||0,dX=Math.min(mid-260,cx(t0)-t0.w*t0.scale*.5-orc.w*orc.scale*.5-20)-cx(orc),dY=(t0.y+t0.oy)-(orc.y+orc.oy);
  const sp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc,Ec=[];R18E({update(){for(const e of Ec)e.a-=.045;while(Ec.length&&Ec[0].a<=0)Ec.shift();return Ec.length>0||Fi.on;},draw(){if(!sp)return;const hh=orc.h*orc.scale,ww=hh*sp.width/sp.height;for(const e of Ec){ctx.save();ctx.globalAlpha=e.a*.3;ctx.drawImage(tintSpr(sp,'rgb(255,210,90)',.9),e.x-ww/2,e.y-hh,ww,hh);ctx.restore();}}});
  sfx('whoosh');await tween(520,k=>{const e=easeIO(k);orc.ox=ox0+dX*e;orc.oy=oy0+dY*e;orc.jump=240*Math.sin(k*Math.PI*.5);orc.lean=.22*k;Fi.s=1+.2*k;Ec.push({x:cx(orc),y:orc.y+orc.oy-orc.jump,a:1});});
  await wait(90);sfx('whoosh');await tween(170,k=>{orc.jump=240*(1-k*k);orc.lean=.22-.6*k;Ec.push({x:cx(orc),y:orc.y+orc.oy-orc.jump,a:1});});orc.jump=0;
  const ix=fist().x,gy=xs.reduce((s,t)=>s+t.y+t.oy,0)/xs.length;tween(600,k=>{Fi.a=1-k;}).then(()=>{Fi.on=false;});
  sfx('boom');sfx('boom');sfx('holy');flash('255,240,180',.8,.3);shake(36);rumble&&rumble(1.4,14);hitStop(170);punch(ix,gy,.12);
  if(im){const B={k:0};R18E({update(dt){B.k+=dt/1.2;return B.k<1;},draw(){r17Draw(im,ix,gy-70,1150*(.3+.7*eOutBack(Math.min(1,B.k*1.6))),{add:true,a:1-B.k*B.k});}});}
  for(let i=0;i<40;i++)part({x:ix+rnd(-50,50),y:gy-rnd(0,10),vx:rnd(-420,420),vy:rnd(-620,-200),g:1000,life:rnd(.6,1.1),size:rnd(4,10),rgb:pick(['150,140,130','110,100,95']),add:false,shape:'rock'});
  for(let i=0;i<60;i++)part({x:ix,y:gy-30,vx:rnd(-520,520),vy:rnd(-460,60),life:rnd(.6,1.1),size:rnd(3,7),rgb:pick(['255,240,180','255,210,90','255,255,255']),shape:'star'});
  // izzó arany repedések a földön minden ellenségig + gördülő arany fényhullám
  const Cr={a:1,k:0,on:true};R18E({update(){return Cr.on;},draw(){if(Cr.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
      for(const t of xs){const tx=cx(t),ty=t.y+t.oy+2,n=6;for(const [w,c] of [[9,`rgba(255,170,40,${.35*Cr.a})`],[3.5,`rgba(255,245,200,${.95*Cr.a})`]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(ix,gy);
          for(let i=1;i<=n;i++){const q=i/n*Cr.k;ctx.lineTo(ix+(tx-ix)*q+Math.sin(i*2.7+tx)*14,gy+(ty-gy)*q+Math.cos(i*1.9)*6);}ctx.stroke();}}ctx.restore();}});
  const Wv={k:0,on:true};R18E({update(){return Wv.on;},draw(){if(Wv.k<=0)return;const r=80+800*Wv.k,a=1-Wv.k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(ix,gy+4);ctx.scale(1,.16);
    const g=ctx.createRadialGradient(0,0,r*.5,0,0,r);g.addColorStop(0,'rgba(255,220,120,0)');g.addColorStop(.75,`rgba(255,235,160,${.85*a})`);g.addColorStop(1,'rgba(255,220,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,6.29);ctx.fill();ctx.restore();}});
  tween(750,k=>{Wv.k=k;}).then(()=>{Wv.on=false;});tween(300,k=>Cr.k=r21ease.out(k));
  for(const t of xs.slice().sort((a,b)=>Math.abs(cx(a)-ix)-Math.abs(cx(b)-ix))){if(!t.alive)continue;await wait(120);const x=cx(t),g0=t.y+t.oy;sfx('holy');lightPillar(x,g0,190,1.2);
    R18E({t:0,update(dt){this.t+=dt;return this.t<1;},draw(){const a=1-this.t;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,g0-60,220*a,'255,230,140',.75*a);ctx.restore();}});
    sparks(x,midY(t),['255,240,180','255,210,90','255,255,255'],44,680);toss(t,150,640);t.hurt=.6;hit(orc,t,sk);}
  await wait(500);tween(500,k=>Cr.a=1-k).then(()=>Cr.on=false);Au.on=false;
  const cX=orc.ox,cY=orc.oy;await tween(380,k=>{const e=easeIO(k);orc.ox=cX+(ox0-cX)*e;orc.oy=cY+(oy0-cY)*e;orc.jump=Math.sin(k*Math.PI)*50;orc.lean=0;});orc.ox=ox0;orc.oy=oy0;orc.jump=0;orc.pose='idle';
  await tween(300,k=>{orc._r16tint.a=.3*(1-k);orc.scale=s0*(1.28-.28*k);});orc.scale=s0;orc._r16tint=null;await dimTo(0,null,300);};}

// ---- Lebegés (ea11: „továbbra is a levegőben vannak”): néhány póz- és felszerelt hőskép alján üres sáv van (pl. Zordon
// kalapos-pálcás képe: 25 képpont), ezért a figura a talppontja fölött lebegett. Betöltés után minden képet egyszer
// megvizsgálunk, és a tartalmat leigazítjuk a kép aljára (a méret nem változik, csak a talp kerül a földre).
{let n0=-1;const done=new WeakSet();
  const fix=()=>{if(typeof ENEMY_SPR!=='object')return;const ks=Object.keys(ENEMY_SPR);if(ks.length===n0)return;n0=ks.length;
    for(const k of ks){const c=ENEMY_SPR[k];if(!c||done.has(c)||!(c instanceof HTMLCanvasElement)||!c.width)continue;done.add(c);try{const g=c.getContext('2d',{willReadFrequently:true}),H=Math.min(80,c.height),d=g.getImageData(0,c.height-H,c.width,H).data;let m=0;
      for(let y=H-1;y>=0;y--){let hit=false;for(let x=0;x<c.width;x++)if(d[(y*c.width+x)*4+3]>60){hit=true;break;}if(hit)break;m++;}
      if(m>=4&&m<H){const im=g.getImageData(0,0,c.width,c.height-m);g.clearRect(0,0,c.width,c.height);g.putImageData(im,0,m);}}catch(e){}}};
  const dp=drawHeroPoses;drawHeroPoses=function(){fix();return dp.apply(this,arguments);};}

// ---- Kígyó (ea01/ea10: „darabos, akadozik”): a test mostantól egyetlen nyomvonalat követ, mint egy igazi kígyó – a fej
// kígyózó vonalon siklik a földön, a test pontosan a fej nyomában jön (állandó hossz, nem nyúlik át a képernyőn), aztán
// ugyanazon a nyomon spirálban felkúszik a célpontra, a feje a tetején felágaskodik; letekeredéskor visszafelé siklik
r21CoilPath=function(gx,top,bot,R,turns,k,from,sq=0,headLift=0){const dir=gx>=from.x?1:-1,Rr=R*(1-sq*.18),th0=dir>0?Math.PI:0,TW=turns*6.283,N0=70,NS=110;
  const sp=u=>{const th=th0-dir*u*TW;return {x:gx+Math.cos(th)*Rr,y:bot-(bot-top)*u+Math.sin(th)*Rr*.26,b:Math.sin(th)<0};};
  const s0=sp(0),coilL=TW*Rr*1.05,Ls=coilL+170;
  // a földi szakasz: Ls-sel a kiindulás mögül indul, enyhén kígyózik, és a spirál aljába fut
  const G=[],gx0=from.x-dir*(Ls+40),gy0=from.y;for(let i=0;i<=N0;i++){const q=i/N0,x=gx0+(s0.x-gx0)*q,amp=Math.min(1,q*4,(1-q)*6)*12;G.push({x,y:gy0+(s0.y-gy0)*q+Math.sin(x*.045)*amp,b:false});}
  for(let i=1;i<=NS;i++)G.push(sp(i/NS));
  const tp=sp(1);G.push({x:tp.x+dir*8,y:tp.y-30-headLift,b:false});
  const L=[0];for(let i=1;i<G.length;i++)L.push(L[i-1]+Math.hypot(G[i].x-G[i-1].x,G[i].y-G[i-1].y));const tot=L[L.length-1];
  const at=d=>{d=Math.max(0,Math.min(tot,d));let j=1;while(j<L.length-1&&L[j]<d)j++;const q=(d-L[j-1])/Math.max(1e-6,L[j]-L[j-1]),A=G[j-1],B=G[j];return {x:A.x+(B.x-A.x)*q,y:A.y+(B.y-A.y)*q,b:q<.5?A.b:B.b};};
  const e=k*k*(3-2*k),head=Ls+40+(tot-(Ls+40))*e,P=[],M=90;for(let i=0;i<=M;i++)P.push(at(head-Ls*i/M));return P;};
r21DrawCoil=function(im,P,thick,a=1){if(!im||P.length<2)return;r21Snake2(im,P,thick*1.25,a,.5);};

// ---- hegyes bambuszkaró festett képpel (fx7-bamboostake, ea06/ea08: „festett kép kell”): a földből szúr ki, a talaj alatt
// nem látszik; a karó alja (földrög) a talajba kerül
{const st0=r21Stake;r21Stake=function(x,gy,H,k,lean=0,a=1){const im=R17I.bamboostake;if(!im)return st0.apply(this,arguments);if(k<=0)return;
  const w=H*im.width/im.height;ctx.save();ctx.beginPath();ctx.rect(-500,-500,3000,gy+502);ctx.clip();ctx.globalAlpha*=a;ctx.translate(x,gy+H*.07+H*(1-Math.min(1,k)));ctx.rotate(lean);
  ctx.drawImage(im,-w/2,-H,w,H);ctx.restore();};}

// ---- Matcha-gólem – Forró hab (ea02: „festett kép kell, nem feltörik, csak megjelenik – vegyél példát a Magmakitörésből”):
// mint a Magmakitörésnél: a hős alatt előbb megnyílik és fortyog egy forró matcha-tócsa (sötét föld, izzó zöld repedések,
// buborékos közép), aztán festett habcsomókból álló szökőkút lövell fel belőle, a habcsomók visszahullanak és szétfolynak
{const ff=A.foamFlood;A.foamFlood=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(u.type!=='matchagolem'||!al.length||!R17I.froth)return ff(u,ts,sk);const rel=keepPose(u);try{
  u.pose='attack';await bodyWind(u,300,-.12);bodyStrike(u,200,.22);sfx('boom');sfx('quake');shake(14);rumble&&rumble(1,8);await dimTo(.5,'10,25,8',250);
  const V=al.map(t=>({t,x:cx(t),y:t.y+t.oy+8,pool:0,a:0,cr:null})),B=[],SP=[],L={on:true};
  R18E({update(dt){for(const v of V){v.a+=dt*3;if(v.pool>.3&&Math.random()<.35){const r=60*v.pool;part({x:v.x+rnd(-r,r),y:v.y-2,vx:rnd(-10,10),vy:-rnd(20,60),life:rnd(.3,.6),size:rnd(4,9),rgb:pick(['200,240,170','240,255,230']),add:false,shape:'dot'});}
        if(v.pool>.3&&Math.random()<.25)r21Steam(v.x+rnd(-40,40),v.y-4,rnd(-15,15),-rnd(40,90),false);}
      for(let i=B.length-1;i>=0;i--){const b=B[i];b.age+=dt;b.vy+=1300*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;b.rot+=b.vr*dt;if(b.vy>0&&b.y>=b.gy){SP.push({x:b.x,y:b.gy,r:b.r*1.5,age:0});B.splice(i,1);}}
      for(let i=SP.length-1;i>=0;i--){SP[i].age+=dt*.6;if(SP[i].age>1.4)SP.splice(i,1);}return L.on||B.length||SP.length;},
    draw(){for(const v of V){if(v.pool<=0)continue;const R=105*v.pool;ctx.save();ctx.translate(v.x,v.y);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,R*1.6,'150,230,90',.35*v.pool);ctx.globalCompositeOperation='source-over';
        if(!v.cr){v.cr=[];for(let i=0;i<14;i++){const a=i/14*6.283+rnd(-.2,.2),pts=[[0,0]];let r=0,an=a;while(r<1){r+=rnd(.12,.22);an+=rnd(-.35,.35);pts.push([Math.cos(an)*r,Math.sin(an)*r]);}v.cr.push(pts);}}
        const cg=ctx.createRadialGradient(0,0,R*.2,0,0,R);cg.addColorStop(0,'rgba(40,52,22,1)');cg.addColorStop(.75,'rgba(30,26,14,1)');cg.addColorStop(1,'rgba(30,26,14,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
        const fl=.75+.25*Math.sin(v.a*3);ctx.lineCap='round';ctx.lineJoin='round';
        for(const [lw,col] of [[R*.09,`rgba(120,200,60,${.5*fl})`],[R*.045,`rgba(180,240,110,${.85*fl})`],[R*.016,`rgba(240,255,210,${fl})`]]){ctx.strokeStyle=col;ctx.lineWidth=lw;for(const pts of v.cr){ctx.beginPath();pts.forEach((p,i)=>{const x=p[0]*R*.95,y=p[1]*R*.95;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}}
        const og=ctx.createRadialGradient(0,0,0,0,0,R*.42);og.addColorStop(0,'rgba(245,255,225,1)');og.addColorStop(.5,'rgba(150,215,80,1)');og.addColorStop(1,'rgba(90,150,40,0)');ctx.fillStyle=og;ctx.beginPath();ctx.arc(0,0,R*.42,0,6.29);ctx.fill();ctx.restore();
        for(let i=0;i<5;i++){const an=v.a*1.7+i*1.3,r=R*.25*(.5+.5*Math.sin(v.a*2+i));r21Froth(v.x+Math.cos(an)*r,v.y-3+Math.sin(an)*r*.25,7+3*Math.sin(v.a*4+i),.9*v.pool,an);}}
      for(const s of SP){const a=Math.max(0,Math.min(1,1.4-s.age));ctx.save();ctx.globalAlpha=a*.9;ctx.translate(s.x,s.y);ctx.scale(1,.35);r21Froth(0,0,s.r*(1+s.age*.4),1,0);ctx.restore();}
      for(const b of B){const sp=Math.min(1.7,1+Math.abs(b.vy)/1000);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);ctx.scale(1/Math.sqrt(sp),sp);r21Froth(0,0,b.r,1,b.rot);ctx.restore();}}});
  // a tócsák megnyílnak és fortyognak
  sfx('steam');await tween(650,k=>{for(const v of V)v.pool=r21ease.io(k)*.75;});
  for(const v of V){const t=v.t;sfx('splash');sfx('boom');flash('200,255,170',.22,.12);shake(15);hitStop&&hitStop(50);
    for(let j=0;j<80;j++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.3,.3)*(j<55?.55:1.3),spd=rnd(520,980);B.push({x:v.x+rnd(-14,14),y:v.y-8,vx:Math.cos(a)*spd*.5,vy:Math.sin(a)*spd,r:rnd(9,20),age:0,gy:v.y+rnd(-8,16),rot:rnd(0,6),vr:rnd(-4,4)});},j*10);
    for(let i=0;i<10;i++)r21Steam(v.x+rnd(-30,30),v.y-rnd(0,40),rnd(-50,50),-rnd(160,360),true);
    t.hurt=.6;toss(t,170,720);hit(u,t,sk);await wait(200);}
  await wait(900);await tween(600,k=>{for(const v of V)v.pool=.75*(1-k);});L.on=false;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};}

// ---- medvekarom-csapás (ea10: „látványosabb, élethűbb”): festett, zöldes izzású hármas karomnyom (fx7-bearclaw) hasít át
// az ellenségen, kéreg- és levélszilánkok repülnek
function r21Claw(t,i=0){const im=R17I.bearclaw,x=cx(t),y=midY(t),S2=Math.max(220,t.h*t.scale*1.5),st={t:0,rot:(i%2?-1:1)*.25};
  for(let n=0;n<24;n++)part({x:x+rnd(-40,40),y:y+rnd(-50,50),vx:rnd(60,420),vy:rnd(-300,80),g:700,life:rnd(.5,.9),size:rnd(5,10),rgb:pick(['110,80,50','140,100,60','120,190,70']),add:false,shape:n%2?'leaf':'rock'});
  R18E({update(dt){st.t+=dt;return st.t<.7;},draw(){const k=Math.min(1,st.t/.12),a=st.t<.35?1:1-(st.t-.35)/.35;
    if(im){ctx.save();ctx.beginPath();ctx.rect(x-S2,y-S2,S2*2*Math.max(.05,k),S2*2);ctx.clip();r17Draw(im,x,y,S2*(.9+.15*k),{a,rot:st.rot});ctx.restore();}
    else{ctx.save();ctx.globalAlpha=a;ctx.strokeStyle='rgba(230,255,200,.95)';ctx.lineCap='round';ctx.lineWidth=7;for(let j=-1;j<=1;j++){ctx.beginPath();ctx.moveTo(x-S2*.35+j*26,y-S2*.35);ctx.lineTo(x-S2*.35+j*26+S2*.7*k,y-S2*.35+S2*.7*k);ctx.stroke();}ctx.restore();}}});}
