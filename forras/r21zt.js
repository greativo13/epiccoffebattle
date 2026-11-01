// ===== 62. kör: tesztlap-jelölések (41 hibás pontból a tartalmiak) =====

// ---- 1) Csillaghullás, Égiháború („túl lassú”): 1,6× gyorsabban fut le (a sebzés továbbra is a becsapódásokkal jön)
for(const an of ['starfall','zeusStorm']){const f=A[an];if(typeof f!=='function')continue;A[an]=async function(){const s0=S.speed||1;S.speed=s0*1.6;try{return await f.apply(this,arguments);}finally{S.speed=s0;}};}

// ---- 2) Árnyékszegező nyíl („én rúnákat kértem, hogy másszanak fel”): sötét árnyék helyett festett lila rúnajelek
//    másznak fel a célpont testén a talpától a fejéig, és amíg a bénítás tart, rajta maradnak (lassan izzanak, keringenek)
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21pin)return de.apply(this,arguments);const P=e._r21pin;if(!e.alive||!e.st||!e.st.stun){e._r21pin=null;return de.apply(this,arguments);}
  e._r21pin=null;let r;try{r=de.apply(this,arguments);}finally{e._r21pin=P;}
  try{const RU=r21Filt(R17I.inkglyph,'invert(1) sepia(1) hue-rotate(225deg) saturate(5) brightness(.95)');if(!RU)return r;if(!P.r){P.r=[];for(let i=0;i<14;i++)P.r.push({u:rnd(-.38,.38),v:rnd(0,1),s:rnd(18,30),ph:rnd(0,6),d:i*.06});}
    const t=(performance.now()-P.t0)/1000,feet=e.y+e.oy,H2=e.h*e.scale,W2=e.w*e.scale;
    for(const q of P.r){const k=Math.max(0,Math.min(1,(t-q.d)/.8));if(k<=0)continue;const y=feet-H2*q.v*k-4,x=cx(e)+q.u*W2+Math.sin(t*2+q.ph)*3;
      ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,q.s*.9,'170,90,255',.35);ctx.restore();ctx.save();ctx.globalAlpha=.8+.2*Math.sin(t*4+q.ph);ctx.translate(x,y);ctx.rotate(Math.sin(t+q.ph)*.2);ctx.drawImage(RU,-q.s/2,-q.s/2,q.s,q.s);ctx.restore();}}catch(err){}return r;};}
// (a 57. körben bevezetett sötét árnyék-réteg helyett): az árnyék-felkúszó réteg ki – csak a rúnák látszanak
{const sp=A.shadowPin;A.shadowPin=async function(u,ts,sk){const t=ts&&ts[0];const r=await sp.apply(this,arguments);try{if(t&&t._r21pin)t._r21pin={t0:performance.now()};}catch(e){}return r;};}

// ---- 3) Kristálygólem – Kristályököl („jó, hogy megnő, az ökle lehetne nagyobb, csak a rajta lévő tüskék nem kellenek”):
//    a kristálytömb az öklön nincs, helyette maga az ököl nő jóval nagyobbra (kékes fénnyel); a becsapódás szilánkjai maradnak
{const cp=A.crystalPunch;A.crystalPunch=async function(u,ts,sk){const G0=R17I.glacier,lo=limbOn;const blank=document.createElement('canvas');blank.width=blank.height=2;
  limbOn=function(){const T=lo.apply(this,arguments);try{if(T&&T.fist&&!T.fist._r21big){let sv=1;Object.defineProperty(T.fist,'s',{get:()=>sv,set:v=>{sv=1+(v-1)*2.4;},configurable:true});T.fist._r21big=true;}}catch(e){}return T;};
  R17I.glacier=blank;const h0=hit;const t=ts&&ts[0];
  hit=function(a,tt,s){const r=h0.apply(this,arguments);try{if(a===u&&G0){const x=cx(tt),y=midY(tt);for(let i=0;i<16;i++)r21PD(r21Filt(G0,'brightness(1.25) saturate(1.3) hue-rotate(-8deg)'),x+rnd(-30,30),y+rnd(-30,30),{vx:rnd(-380,380),vy:-rnd(120,460),g:1000,size:rnd(24,46),life:rnd(.6,1)});}}catch(e){}return r;};
  try{return await cp.apply(this,arguments);}finally{R17I.glacier=G0;limbOn=lo;hit=h0;}};}

// ---- 4) Kristálygólem – „a Kristályöklök nem jók, mást találj ki”: KRISTÁLYKITÖRÉS – a gólem a földbe csap, és minden
//    hős alól óriás, festett kristálytüske-fürt tör fel (kicsiről nagyra), megemeli a hőst, aztán szétrobban szilánkokra
if(ESK.shardspray){ESK.shardspray.name='Kristálykitörés';ESK.shardspray.anim='crystalBurst';ESK.shardspray.desc='A gólem a földbe csap: minden hős alól óriás kristálytüskék törnek fel, majd szilánkokra robbannak.';}
A.crystalBurst=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const CR=r21Filt(R17I.glacier,'hue-rotate(-12deg) saturate(1.6) brightness(1.15)');u.pose='attack';
  await bodyWind(u,320,.18);await tween(260,k=>{u.jump=Math.sin(k*Math.PI*.5)*60;});await tween(120,k=>{u.jump=60*(1-k*k);});u.jump=0;await bodyStrike(u,120,-.24);
  sfx('rock');sfx('glass');shake(22);hitStop(90);rumble&&rumble(1.2,10);
  const C=al.map(t=>({t,k:0,a:1,w:Math.max(200,t.w*t.scale*1.8)}));
  R18E({update(){return C.some(c=>c.a>0);},draw(){if(!CR)return;for(const c of C){if(c.k<=0||c.a<=0)continue;const gx=cx(c.t),gy=c.t.y+c.t.oy+8,w=c.w*(.5+.6*c.k),h=w*CR.height/CR.width;
    ctx.save();ctx.beginPath();ctx.rect(gx-w,0,w*2,gy+4);ctx.clip();ctx.globalAlpha=c.a;ctx.drawImage(CR,gx-w/2,gy-h*c.k,w,h);ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(gx,gy-h*.4*c.k,w*.5,'150,220,255',.35*c.a*c.k);ctx.restore();}}});
  for(const c of C){(async()=>{sfx('glass');await tween(260,k=>{c.k=eOutBack(k);});c.t.hurt=.6;toss(c.t,120,520);hit(u,c.t,sk);await wait(380);sfx('glass');
      if(CR)for(let i=0;i<12;i++)r21PD(CR,cx(c.t)+rnd(-40,40),c.t.y+c.t.oy-rnd(20,120),{vx:rnd(-380,380),vy:-rnd(140,460),g:1000,size:rnd(24,46),life:rnd(.6,1)});c.a=0;})();await wait(110);}
  await wait(1000);await bodySettle(u);u.pose='idle';};

// ---- 5) Kristálygólem – Tükörpajzs („legyen nagyobb a pajzs és a gólem is”): a gólem 25%-kal nagyobb, a tükörpajzs jóval nagyobb
for(const k of ['cgolem']){const d=EN_DEF[k];if(d){d.h=Math.round(d.h*1.25);d.w=Math.round(d.w*1.25);}}
{const de=drawEntity;drawEntity=function(e){if(!(e&&e.kind==='enemy'&&e.alive&&e.st&&e.st.crystal&&FX_IMG.crystalmirror))return de.apply(this,arguments);
  const c0=e.st.crystal;delete e.st.crystal;let r;try{r=de.apply(this,arguments);}finally{e.st.crystal=c0;}
  try{const im=FX_IMG.crystalmirror,sz=Math.max(260,e.h*e.scale*1.6),x=cx(e)-e.w*e.scale*.5,y=midY(e);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.8+.15*Math.sin(T*4);ctx.translate(x,y);ctx.scale(.75,1);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}catch(err){}return r;};}

// ---- 6) Jégelementál – Jégcsapok („gagyi, legyen látványosabb, élethűbb”): több és nagyobb festett jégcsap, a becsapódásnál
//    a hős lába körül jégtömb nő (festett jégkristály-fürt), kék villanás, dér, aztán a jég szilánkokra robban
{const ic=A.icicles;A.icicles=async function(u,ts,sk){const al=(ts||[]).filter(t=>t&&t.alive),IC=R17I.glacier;const r=await ic.apply(this,arguments);
  try{if(IC&&al.length){sfx('ice');flash('200,235,255',.35,.12);const J=al.map(t=>({t,k:0,a:1}));
    R18E({update(){return J.some(j=>j.a>0);},draw(){for(const j of J){if(j.k<=0||j.a<=0)continue;const t=j.t,w=Math.max(160,t.w*t.scale*1.6)*j.k,h=w*IC.height/IC.width;ctx.save();ctx.globalAlpha=.9*j.a;ctx.drawImage(IC,cx(t)-w/2,t.y+t.oy+10-h,w,h);ctx.restore();}}});
    await tween(260,k=>{for(const j of J)j.k=eOutBack(k);});await wait(420);sfx('glass');shake(10);
    for(const j of J){for(let i=0;i<10;i++)r21PD(IC,cx(j.t)+rnd(-40,40),j.t.y+j.t.oy-rnd(10,80),{vx:rnd(-320,320),vy:-rnd(120,400),g:1000,size:rnd(20,40),life:rnd(.6,.9)});j.a=0;}await wait(200);}}catch(e){}return r;};}

// ---- 7) Triplapresszó („nyíljon ki a hasából az üveg, és onnan menjen a kávé”): a támadás elején a hasán lévő üvegtartály
//    kinyílik (üvegcsillanás, szilánkok, gőz), és mindhárom kávésugár onnan, a has üvegéből lő ki
{const sp0=sprPt;const M2={'0.3,0.13':[.46,.52],'0.49,0.07':[.5,.56],'0.66,0.19':[.54,.52]};
  sprPt=function(u,fu,fv){if(u&&u.type==='ancient'){const m=M2[fu+','+fv];if(m)return sp0.call(this,u,m[0],m[1]);}return sp0.apply(this,arguments);};}
{const kj=A.koffJet;A.koffJet=async function(u,ts,sk){if(!u||u.type!=='ancient')return kj.apply(this,arguments);try{const p=sprPt(u,.5,.54),GL=R17I.glacier;sfx('glass');flash('255,235,200',.2,.06);
    const O={k:0};R18E({update(){O.k+=.04;return O.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,60+40*O.k,'255,200,140',.6*(1-O.k));ctx.restore();}});
    if(GL)for(let i=0;i<8;i++)r21PD(GL,p.x+rnd(-14,14),p.y+rnd(-14,14),{vx:rnd(-220,60),vy:-rnd(60,240),g:900,size:rnd(10,18),life:.6});
    for(let i=0;i<10;i++)part({x:p.x,y:p.y,vx:rnd(-80,20),vy:-rnd(40,120),drag:.6,life:rnd(.6,1),size:rnd(14,24),grow:40,rgb:'245,240,235',add:false,shape:'smoke'});await wait(260);}catch(e){}
  return kj.apply(this,arguments);};}

// ---- 8) Harapós rózsa („Indaszorításnál elég, ha a rózsa odanyúl és lecsap – csak nevezd át”; „a tüske alakja legyen
//    háromszögesebb”): RÓZSAHARAPÁS – nincs inda, a rózsa feje a szárán megnyúlva odanyúl és beleharap. A Tüskeköpés
//    tüskéje festett, háromszögletű tüske (a festett kőtüske-kép rózsapirosra-zöldre színezve, a hegye előre mutat)
if(ESK.vine){ESK.vine.name='Rózsaharapás';ESK.vine.desc='A rózsa feje a szárán megnyúlva odanyúl, és beleharap egy hősbe. 35% eséllyel egy körre lefogja.';}
{const tv=A.thornVolley;A.thornVolley=async function(u,ts,sk){if(!u||u.type!=='rose')return tv.apply(this,arguments);const TH=R17I.rosethorn,RS=r21Filt(R17I.rockspike,'sepia(1) saturate(3) hue-rotate(-40deg) brightness(.8)'),r0=r17Draw;
  r17Draw=function(im,x,y,w,o={}){if(im===TH&&RS)return r0.call(this,RS,x,y,w*.75,Object.assign({},o,{sy:1,rot:(o.rot||0)+Math.PI/2}));return r0.apply(this,arguments);};
  try{return await tv.apply(this,arguments);}finally{r17Draw=r0;}};}

// ---- 9) Barlangi béka („másold a Bambusz-békakirály nyelvcsapását”): mint a királynál, a béka SAJÁT festett nyelve nyúlik
//    ki: a nyitott szájú képen a nyelv a szájából indul, megnyúlik a hősig, megcsapja, és visszahúzódik (külön nyelv-kép nincs)
A.frogTongue=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const nm=(SPR_ALIAS&&SPR_ALIAS[u.type])||u.type,AT=ENEMY_SPR[nm+'-attack'];if(!AT){u.pose='attack';await wait(200);hit(u,t,sk);u.pose='idle';return;}
  const TG={k:0,on:true};u._r21tg=TG;u.pose='attack';sfx('squish');
  const rect=()=>{const sc=u.scale||1,Hh=u.h*sc,Wd=AT.width*(Hh/AT.height);return {x:cx(u)-Wd/2,y:u.y+u.oy-(u.h+(u.lift||0))*sc,w:Wd,h:Hh};};
  R18E({update(){return TG.on;},draw(){const R=rect(),rx=R.x+R.w*.34,ry=R.y+R.h*.46+0,tx=cx(t)+10,ty=midY(t),L0=R.w*.3,L=L0+(Math.hypot(tx-rx,ty-ry)-L0)*TG.k,a=Math.atan2(ty-ry,tx-rx);
    const sx=0,sy=AT.height*.415,sw=AT.width*.3,sh=AT.height*.12,hh=R.h*.13;ctx.save();ctx.translate(rx,ry);ctx.rotate(a+Math.PI);ctx.drawImage(AT,sx,sy,sw,sh,-L,-hh/2,L,hh);ctx.restore();}});
  await tween(200,k=>{TG.k=easeIO(k);});sfx('slash');t.hurt=.35;shake(7);sparks(cx(t),midY(t),['255,140,180','255,255,255'],12,280);hit(u,t,sk);
  await wait(140);sfx('gulp');await tween(240,k=>{TG.k=1-easeIO(k);});TG.on=false;u._r21tg=null;u.pose='idle';};
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21tg)return de.apply(this,arguments);const nm=(SPR_ALIAS&&SPR_ALIAS[e.type])||e.type,AT=ENEMY_SPR[nm+'-attack'];if(!AT)return de.apply(this,arguments);
  const sc=e.scale||1,Hh=e.h*sc,Wd=AT.width*(Hh/AT.height),x0=cx(e)-Wd/2;ctx.save();ctx.beginPath();ctx.rect(x0+Wd*.33,-500,3000,3000);ctx.clip();try{return de.apply(this,arguments);}finally{ctx.restore();}};}

// ---- 10) Bambuszfüggöny („Jázmin belő a földbe EGY nyilat, az bemegy a földbe és feltör”; korábban: „legyen sűrűbb,
//    élethűbb”): egyetlen nagy bambusznyíl, ami a sor közepén a földbe fúródik és eltűnik; a föld alatt két irányba fut a
//    remegés, és sűrű, kétsoros (hátsó sötétebb, alacsonyabb) bambuszfüggöny robban ki az összes ellenség alól
A.bambooCurtain=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const BS=R17I.bamboospear,ST=R17I.bamboostake||R17I.bamboopole,CLD=R17I.clods||R17I.pebble,LF=R17I.leaf;
  u.pose='attack';await chargeBow(u,420,'150,230,110');
  const xs=al.map(cx),gy=Math.max(...al.map(t=>t.y+t.oy))+8,mw=Math.max(...al.map(t=>t.w*t.scale)),xa=Math.min(...xs)-mw*.75,xb=Math.max(...xs)+mw*.75,mx=(xa+xb)/2;
  const A0={k:0,sink:0,a:1};R18E({update(){return A0.a>0;},draw(){if(!BS||A0.k<1||A0.a<=0)return;const L=180,h=L*BS.height/BS.width;ctx.save();ctx.beginPath();ctx.rect(mx-300,-500,600,gy+500);ctx.clip();ctx.translate(mx,gy-L*.3+A0.sink);ctx.rotate(-Math.PI/2+.45);ctx.drawImage(BS,-L/2,-h/2,L,h);ctx.restore();}});
  if(BS)await bigArrow(bowPos(u),{x:mx,y:gy-10},{arc:90,size:180,trail:['150,230,110','220,255,200']});A0.k=1;sfx('rock');shake(8);for(let i=0;i<10;i++)part({x:mx,y:gy,vx:rnd(-160,160),vy:-rnd(80,240),g:800,life:.6,size:rnd(4,8),rgb:'120,95,65',add:false,shape:'rock'});
  await wait(380);sfx('earthm');await tween(420,k=>{A0.sink=k*130;});A0.a=0;
  // remegés a föld alatt két irányba
  rumble&&rumble(1.4,12);sfx('quake');await tween(420,k=>{const dx=(xb-xa)/2*k;for(const x of [mx-dx,mx+dx])part({x:x+rnd(-20,20),y:gy,vx:rnd(-40,40),vy:-rnd(30,110),life:.7,size:rnd(20,34),grow:26,rgb:'150,125,90',add:false,shape:'smoke'});});
  const P=[],m=Math.max(22,Math.round((xb-xa)/17));for(let row=0;row<2;row++)for(let i=0;i<m;i++)P.push({row,x:xa+(xb-xa)*(i+.5)/m+rnd(-7,7)+(row?8:0),H:row?rnd(240,340):rnd(320,460),rot:rnd(-.1,.1),k:0,d:Math.abs(i-m/2)*9+row*50});
  P.sort((a,b)=>b.row-a.row);
  const W={a:1,t:0};R18E({update(dt){W.t+=dt*1000;for(const p of P){const tt=W.t-p.d;p.k=tt<0?0:Math.min(1,tt/130);}return W.a>0;},draw(){const I=ST;if(!I)return;const ID=r21Filt(I,'brightness(.72)');ctx.save();ctx.beginPath();ctx.rect(-500,-500,3000,gy+502);ctx.clip();ctx.globalAlpha=W.a;
    for(const p of P){if(p.k<=0)continue;const im=p.row?ID:I,h=p.H*eOutBack(p.k),w=Math.max(20,h*I.width/I.height);ctx.save();ctx.translate(p.x,gy+4-(p.row?14:0));ctx.rotate(p.rot);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}ctx.restore();}});
  sfx('boom');sfx('rock');shake(30);hitStop(120);flash('210,255,190',.3,.12);
  if(CLD)for(let i=0;i<34;i++)r21PD(CLD,rnd(xa,xb),gy,{vx:rnd(-280,280),vy:-rnd(260,600),g:1100,size:rnd(20,42),life:rnd(.7,1.1)});
  if(LF)for(let i=0;i<26;i++)r21PD(LF,rnd(xa,xb),gy-rnd(60,300),{vx:rnd(-160,160),vy:-rnd(40,220),g:200,size:rnd(18,30),life:1.3,drag:1});
  for(const t of al){t.hurt=.7;toss(t,100,560);hit(u,t,sk);await wait(60);}
  await wait(1100);await tween(420,k=>{for(const p of P)p.k=1-k;});W.a=0;u.pose='idle';};

// ---- 11) Fejsze-hajítás („eltűnik a fejsze a kezéből, és amit összegyűjt kő, abból lesz a pörgő csillag”; korábban:
//    „ahogy visszajön a bárd, úgy menjen az ellenfél felé is”): Grog fejszéje eltűnik, a köré gyűlt kövek ötágú csillagba
//    állnak, lávásan izzanak és pörögnek; a kőcsillag ugyanazon az íven repül az ellenfélhez, amelyiken visszajön
A.axeThrow=async(u,ts,sk)=>{const t=ts&&ts[0];if(!t||!t.alive)return;const PB=R17I.pebble||R17I.clods,GB=r21Filt(R17I.goldburst,'hue-rotate(-28deg) saturate(1.5)'),CL=R17I.clods;
  const st0={on:true};R18E({update(){if(st0.on)u.pose='cast';return st0.on;}});try{if(typeof r21NoAxe==='function')r21NoAxe(true);}catch(e){}
  try{const hand=()=>handPos(u),gy=u.y+u.oy,N=10,S5=[];for(let i=0;i<N;i++)S5.push({x:cx(u)+rnd(-240,240),y:gy+rnd(-4,8),s:rnd(28,42),r:rnd(0,6)});
  const C={x:0,y:0,k:0,spin:0,glow:0,a:1,fly:false};const lava=g=>r21Filt(PB,'sepia(1) saturate(5) hue-rotate(-15deg) brightness('+(1+g*.6).toFixed(2)+')');
  R18E({update(dt){C.spin+=dt*(2+14*C.glow);return C.a>0;},draw(){const c=C.fly?{x:C.x,y:C.y}:{x:hand().x,y:hand().y-34};const I=C.glow>.05?lava(Math.round(C.glow*4)/4):PB;if(!I)return;
    for(let i=0;i<N;i++){const s=S5[i],ang=C.spin+i*Math.PI/5,rr=(i%2?32:72),tx=c.x+Math.cos(ang)*rr,ty=c.y+Math.sin(ang)*rr,x=s.x+(tx-s.x)*C.k,y=s.y+(ty-s.y)*C.k-Math.sin(C.k*Math.PI)*80;
      ctx.save();ctx.globalAlpha=C.a;ctx.translate(x,y);ctx.rotate(s.r+C.spin);ctx.drawImage(I,-s.s/2,-s.s/2,s.s,s.s*I.height/I.width);ctx.restore();}
    if(C.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(c.x,c.y,130,'255,120,30',.45*C.glow*C.a);ctx.restore();}}});
  sfx('rock');rumble&&rumble(.6,6);await tween(650,k=>{C.k=easeIO(k);});sfx('fire');await tween(420,k=>{C.glow=k;});
  // dobás: ugyanazon az íven oda és vissza
  const h0=hand(),p0={x:h0.x,y:h0.y-34},p2={x:cx(t),y:midY(t)},p1={x:(p0.x+p2.x)/2,y:Math.min(p0.y,p2.y)-170};const Q=(k,a,b,c)=>(1-k)*(1-k)*a+2*(1-k)*k*b+k*k*c;
  await bodyWind(u,200,.14);sfx('whoosh');await bodyStrike(u,120,-.22);C.fly=true;
  await tween(520,k=>{C.x=Q(k,p0.x,p1.x,p2.x);C.y=Q(k,p0.y,p1.y,p2.y);if(Math.random()<.8)part({x:C.x,y:C.y,vx:rnd(-60,60),vy:rnd(-60,60),life:.4,size:rnd(4,8),rgb:pick(['255,160,40','255,90,20'])});});
  sfx('boom');sfx('fire');shake(22);hitStop(110);flash('255,190,110',.35,.1);if(GB){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,p2.x,p2.y,280*(.4+B.k),{a:1-B.k});ctx.restore();}});tween(450,k=>{B.k=k;});}
  if(CL)for(let i=0;i<12;i++)r21PD(CL,p2.x+rnd(-30,30),p2.y+rnd(-20,30),{vx:rnd(-300,300),vy:-rnd(120,420),g:1000,size:rnd(18,32),life:rnd(.6,.9)});
  t.hurt=.6;toss(t,50,360);hit(u,t,sk);await wait(160);
  await tween(520,k=>{const q=1-k;C.x=Q(q,p0.x,p1.x,p2.x);C.y=Q(q,p0.y,p1.y,p2.y);});
  await tween(300,k=>{C.a=1-k;C.glow=1-k;});await bodySettle(u);}finally{st0.on=false;try{if(typeof r21NoAxe==='function')r21NoAxe(false);}catch(e){}u.pose='idle';}};

// ---- 12) Kőhullám („nem nő meg a hullám”): a hullám kicsiről indul, és haladás közben egyre nagyobbra nő (r21zq-ban javítva)

// ---- 13) Sárkánynyíl (páros; „Jázmin fellő az égbe egy lángoló nagy nyilat, és az égből lejön a lángoló sárkány és lecsap”)
R16P['Sárkánynyíl']=async(A1,B1,al,sk,p)=>{const mk=A1.type==='monk'?A1:B1,wz=mk===A1?B1:A1,fs=(al||[]).filter(t=>t&&t.alive),FD=R17I.firedragon,FW=r21Filt(R17I.firewall,'hue-rotate(110deg) saturate(1.4) brightness(1.15)');if(!fs.length)return;
  await dimTo(.5,'25,10,0',260);await chargeBow(mk,420,'255,150,60');const hp=handPos(wz),bp=bowPos(mk);
  for(let i=0;i<30;i++)part({x:hp.x,y:hp.y,vx:(bp.x-hp.x)*rnd(1.5,2.2),vy:(bp.y-hp.y)*rnd(1.5,2.2),life:.45,size:rnd(4,8),rgb:pick(['255,160,40','255,90,20'])});sfx('fire');
  // 1) a lángoló nyíl az égbe száll
  await bigArrow(bp,{x:bp.x+160,y:-120},{arc:10,size:260,ms:520,trail:['255,150,60','255,230,150']});flash('255,200,120',.25,.1);await wait(350);
  // 2) az égből lecsap a lángoló sárkány
  const mx=fs.reduce((s,t)=>s+cx(t),0)/fs.length,my=fs.reduce((s,t)=>s+midY(t),0)/fs.length,D={x:mx-260,y:-220,a:1,rot:.9,s:.7};sfx('roar');
  R18E({update(){if(D.a>0)for(let i=0;i<4;i++)part({x:D.x+rnd(-60,60),y:D.y+rnd(-40,40),vx:rnd(-80,80),vy:-rnd(20,120),life:.5,size:rnd(6,12),rgb:pick(['255,170,50','255,90,20','255,230,150'])});return D.a>0;},
    draw(){if(!FD)return;ctx.save();ctx.globalAlpha=D.a;ctx.globalCompositeOperation='lighter';ctx.translate(D.x,D.y);ctx.rotate(D.rot);const w=520*D.s,h=w*FD.height/FD.width;ctx.drawImage(FD,-w/2,-h/2,w,h);ctx.restore();}});
  await tween(620,k=>{const e=k*k;D.x=mx-260+260*e;D.y=-220+(my+220)*e;D.s=.7+.5*k;});
  sfx('boom');sfx('fire');shake(30);hitStop(130);flash('255,210,140',.5,.18);
  for(const t of fs){t.hurt=.7;toss(t,90,520);hit(wz,t,sk);if(FW){const W3={a:1},x=cx(t),g2=t.y+t.oy+6;R18E({update(){W3.a-=.008;return W3.a>0;},draw(){r17Draw(FW,x,g2,Math.max(160,t.w*t.scale*1.4),{anchor:'bottom',a:Math.min(1,W3.a*1.4),sy:.7});}});}}
  await tween(420,k=>{D.a=1-k;});await wait(500);await dimTo(0,null,300);};

// ---- 14) Tündérököl („maga az ököl jó volt, hozd vissza”): a korábbi, vízszintes festett aranyököl (goldpunch) repül be
{const tf=R16P['Tündérököl'];R16P['Tündérököl']=async function(){const g0=R17I.goldfist;if(R17I.goldpunch)R17I.goldfist=R17I.goldpunch;try{return await tf.apply(this,arguments);}finally{R17I.goldfist=g0;}};}

// ---- 15) Élő Tölgybárd („jó, csak nagyobbak legyenek a feltörő növények”): a gyökér-kompozit magasabb (≈1,6×)
{const tb=R16P['Élő Tölgybárd'];R16P['Élő Tölgybárd']=async function(){const RT=R17I.darkroots;let swap=false;
  try{if(RT&&RT.width){const C=document.createElement('canvas');C.width=RT.width;C.height=Math.round(RT.height*1.6);const g=C.getContext('2d');g.drawImage(RT,0,0,C.width,C.height);R17I.darkroots=C;swap=true;}}catch(e){}
  try{return await tb.apply(this,arguments);}finally{if(swap)R17I.darkroots=RT;}};}

// ---- 16) Grog – Kőbőr (korábbi megjegyzés: „ne a kőbőr legyen az ellenfélen, hanem egy kőburok vegye körül, darabokból”):
//    a kőbörtönbe zárt ellenfelet festett kődarabokból összerakódó burok veszi körül (a darabok repülve rakódnak rá)
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21stone)return de.apply(this,arguments);if(!e.alive||!e.st||!e.st.stun){e._r21stone=false;e._r21shell=null;return de.apply(this,arguments);}
  e._r21stone=false;let r;try{r=de.apply(this,arguments);}finally{e._r21stone=true;}
  try{const PB=R17I.pebble,CL=R17I.clods;if(!PB)return r;if(!e._r21shell){const S3=[];for(let row=0;row<7;row++){const v=row/6,n=8+Math.round(Math.sin(v*Math.PI)*6);for(let i=0;i<n;i++)S3.push({v,u:(i/(n-1)-.5)*Math.sin(.25+v*2.6),s:rnd(.22,.32),r:rnd(0,6),I:Math.random()<.35&&CL?CL:PB,d:rnd(0,.5),ox:rnd(-200,200),oy:rnd(-160,40)});}e._r21shell={p:S3,t0:performance.now()};}
    const Sh=e._r21shell,t=(performance.now()-Sh.t0)/1000,H2=e.h*e.scale*1.05,W2=e.w*e.scale*1.15,base=e.y+e.oy+4;
    for(const q of Sh.p){const k=Math.max(0,Math.min(1,(t-q.d)/.45)),x=cx(e)+q.u*W2+q.ox*(1-k),y=base-q.v*H2+q.oy*(1-k),s=Math.max(W2,H2)*q.s*.55;ctx.save();ctx.globalAlpha=k;ctx.translate(x,y);ctx.rotate(q.r);try{ctx.filter='grayscale(.6) brightness(.85)';}catch(x){}ctx.drawImage(q.I,-s/2,-s/2,s,s*q.I.height/q.I.width);ctx.restore();}}catch(err){}return r;};}

// ---- 17) Grog – Meteorököl (korábbi megjegyzés: „amikor becsapódik, robbanjon fel”): a becsapódásnál nagy robbanás
{const mf=A.meteorFist;A.meteorFist=async function(u,ts,sk){const h0=hit;let done=false;const GB=r21Filt(R17I.goldburst,'hue-rotate(-30deg) saturate(1.6)'),CL=R17I.clods;
  hit=function(a,t,s){if(a===u&&!done&&t){done=true;try{const x=cx(t),y=midY(t);sfx('boom');shake(32);flash('255,200,120',.55,.18);hitStop(140);
      if(GB){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,x,y,Math.max(420,t.h*t.scale*2.6)*(.35+.9*B.k),{a:1-B.k});ctx.restore();}});tween(600,k=>{B.k=k;});}
      if(CL)for(let i=0;i<24;i++)r21PD(CL,x+rnd(-40,40),y+rnd(-30,40),{vx:rnd(-460,460),vy:-rnd(160,560),g:1000,size:rnd(22,44),life:rnd(.7,1.1)});
      for(let i=0;i<20;i++)part({x,y,vx:rnd(-160,160),vy:-rnd(40,200),drag:.6,life:rnd(.7,1.1),size:rnd(18,32),grow:50,rgb:pick(['120,100,80','90,75,60']),add:false,shape:'smoke'});}catch(e){}}
    return h0.apply(this,arguments);};
  try{return await mf.apply(this,arguments);}finally{hit=h0;}};}

// ---- 18) Grog – Titáncsapás (korábbi megjegyzés: „több és nagyobb, változatos méretű tüske kell”): két sorban, 12 + 7 festett
//    kőtüske, erősen eltérő magassággal
r13Quake=function(u,al,big){const sp=R17I.rockspike;rumble(big?2.6:1.6,big?18:11);
  for(const t of al){const x=cx(t),gy=t.y+t.oy+4,R=Math.max(90,t.w*t.scale*.95),S2=[];
    for(const [ring,N,hmin,hmax] of [[1,big?12:7,90,240],[1.45,big?7:4,60,150]]){for(let i=0;i<N;i++){const a=.1*Math.PI+i/(N-1)*.8*Math.PI;S2.push({x:x+Math.cos(a)*R*ring,y:gy+Math.sin(a)*R*.35*ring,H:rnd(hmin,hmax)*(big?1:.7),rot:Math.cos(a)*.4+rnd(-.1,.1),fl:Math.random()<.5,k:0,d:i*30+(ring>1?120:0)});}}
    S2.sort((a,b)=>a.y-b.y);const st={t:0};
    if(sp)R18E({update(dt){st.t+=dt*1000;for(const s of S2){const tt=(st.t-s.d)/1000;s.k=tt<0?0:tt<.14?r21ease.back(tt/.14):tt<1.5?1:Math.max(0,1-(tt-1.5)/.4);}return st.t<2300;},
      draw(){for(const s of S2){if(s.k<=0)continue;const w=s.H*sp.width/sp.height;ctx.save();ctx.beginPath();ctx.rect(0,0,W,s.y+4);ctx.clip();ctx.translate(s.x,s.y+4+s.H*(1-s.k)*.9);ctx.rotate(s.rot);if(s.fl)ctx.scale(-1,1);ctx.drawImage(sp,-w/2,-s.H,w,s.H);ctx.restore();}}});
    r21Dust(x,gy,10,260,[30,56]);for(let n=0;n<18;n++)part({x:x+rnd(-R*.6,R*.6),y:gy,vx:rnd(-280,280),vy:-rnd(200,480),g:950,life:rnd(.6,1),size:rnd(6,12),rgb:'120,95,65',add:false,shape:'rock'});}};

// ---- 19) Morgána – Üstborítás (korábbi megjegyzés: „a kis ellenfelek ne zsugorodjanak össze”): az átváltozott lény
//    legalább a 75%-ára marad az eredeti ellenfél magasságának
{const de=drawEntity;drawEntity=function(e){if(!e||!e._poly||!e.st||!e.st.poly||!e.alive)return de.apply(this,arguments);const k=e._poly,P=EN_DEF[k];if(!P)return de.apply(this,arguments);
  const minH=e.h*(e.scale||1)*.75;if(P.h>=minH)return de.apply(this,arguments);const f=minH/P.h,keep=EN_DEF[k];EN_DEF[k]=Object.assign({},P,{h:Math.round(P.h*f),w:Math.round(P.w*f)});try{return de.apply(this,arguments);}finally{EN_DEF[k]=keep;}};}

// ---- 20) Új ellenfelek (zs01):
//    – Pandagurulás („nem is gurul”): a panda saját képe gömbölyödve, valóban forogva gurul végig a hősökön
//    – Lámpásláng („csak egy kép”): sortűz – három lángcsóva a lámpaablakból, folyamatos lángsugár, a hősön felcsapó festett lángok
//    – Szentélyláng-áldás („nem látványos”): a lámpás lángja hatalmasra lobban, lánggömbök szállnak minden társához, akiken
//      izzó tűzgyűrű és felszálló parázs jelzi az erősítést
A.pandaRoll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive).sort((a,b)=>cx(b)-cx(a));if(!al.length)return;const IM=ENEMY_SPR.bpanda;u.pose='attack';
  const a0=u.alpha==null?1:u.alpha,B={x:cx(u),y:u.y+u.oy,rot:0,s:1,on:true,sq:1};
  R18E({update(){return B.on;},draw(){if(!IM)return;const h=u.h*u.scale*.72*B.s,w=h*IM.width/IM.height;ctx.save();ctx.translate(B.x,B.y-h/2);ctx.rotate(B.rot);ctx.scale(1,B.sq);ctx.drawImage(IM,-w/2,-h/2,w,h);ctx.restore();}});
  await tween(280,k=>{u.alpha=a0*(1-k);B.s=1-.15*k;B.rot=-k*1.2;});sfx('whoosh');const x0=B.x,xEnd=Math.min(...al.map(cx))-180,done=new Set();
  await tween(1100,k=>{const e=easeIO(k);B.x=x0+(xEnd-x0)*e;B.rot=-1.2-e*18;B.y=u.y+u.oy-Math.abs(Math.sin(e*Math.PI*4))*26;if(Math.random()<.6)puffs(B.x,u.y+u.oy,1,['170,150,110'],[14,24],{w:40,up:20});
    for(const t of al)if(!done.has(t)&&B.x<cx(t)+20){done.add(t);shake(12);sfx('hit');t.hurt=.5;toss(t,60,380);hit(u,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  await tween(480,k=>{B.x=xEnd+(x0-xEnd)*k;B.rot=-19.2-k*6;B.y=u.y+u.oy-Math.sin(k*Math.PI)*70;});await tween(260,k=>{u.alpha=a0*k;B.s=.85+.15*k;});B.on=false;u.alpha=a0;u.pose='idle';};
A.lampFlame=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const FB=FX_IMG.fireball,FW=r21Filt(R17I.firewall,'hue-rotate(110deg) saturate(1.4) brightness(1.15)'),GB=R17I.goldburst;u.pose='cast';
  const win=()=>sprPt(u,.47,.27);sfx('fire');const G={a:0,d:false};R18E({update(){if(G.a>.3){const p=win();for(let i=0;i<3;i++)part({x:p.x+rnd(-10,10),y:p.y+rnd(-10,10),vx:rnd(-40,40),vy:-rnd(20,80),life:.4,size:rnd(5,10),rgb:pick(['255,180,60','255,110,30'])});}return G.a>0||!G.d;},draw(){const p=win();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,90,'255,150,50',.7*G.a);ctx.restore();}});
  await tween(380,k=>{G.a=k;u.sq=1+.05*Math.sin(k*24);});const T2={x:cx(t),y:midY(t)};
  for(let n=0;n<3;n++){const p0=win(),F={x:p0.x,y:p0.y,on:true};const ty=T2.y+rnd(-30,20);
    R18E({update(){if(F.on)for(let i=0;i<3;i++)part({x:F.x+rnd(-10,10),y:F.y+rnd(-10,10),vx:rnd(30,120),vy:rnd(-60,10),life:.35,size:rnd(6,11),rgb:pick(['255,170,50','255,90,20'])});return F.on;},draw(){if(!FB)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.drawImage(FB,F.x-60,F.y-60,120,120);ctx.restore();}});
    sfx('whoosh');tween(340,k=>{F.x=p0.x+(T2.x-p0.x)*k;F.y=p0.y+(ty-p0.y)*k-Math.sin(k*Math.PI)*(40+n*20);}).then(()=>{F.on=false;sfx('fire');shake(9);t.hurt=.35;
      if(GB){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,T2.x,ty,200*(.4+B.k),{a:1-B.k});ctx.restore();}});tween(380,k=>{B.k=k;});}});await wait(170);}
  await wait(250);if(FW){const W3={a:1};R18E({update(){W3.a-=.009;return W3.a>0;},draw(){r17Draw(FW,T2.x,t.y+t.oy+6,Math.max(170,t.w*t.scale*1.5),{anchor:'bottom',a:Math.min(1,W3.a*1.5),sy:.8+.1*Math.sin(performance.now()/90)});}});}
  flash('255,180,90',.25,.08);hit(u,t,sk);await tween(300,k=>{G.a=1-k;});G.d=true;u.sq=1;u.pose='idle';};
A.lampBless=async(u,ts,sk)=>{const GB=R17I.goldburst,FW=r21Filt(R17I.firewall,'hue-rotate(80deg) saturate(1.2) brightness(1.3)');u.pose='cast';sfx('holy');sfx('fire');const allies=S.enemies.filter(e=>e.alive);
  const p=sprPt(u,.47,.27),L={k:0};R18E({update(){return L.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,80+260*Math.sin(L.k*Math.PI),'255,190,80',.75*Math.sin(L.k*Math.PI));if(GB)r17Draw(GB,p.x,p.y,320*Math.sin(L.k*Math.PI),{a:.8});ctx.restore();}});
  tween(900,k=>{L.k=k;});await wait(320);
  for(const e of allies){const o={x:p.x,y:p.y,on:true},tx=cx(e),ty=midY(e);R18E({update(){if(o.on)for(let i=0;i<3;i++)part({x:o.x+rnd(-8,8),y:o.y+rnd(-8,8),vx:rnd(-40,40),vy:rnd(-40,40),life:.35,size:rnd(5,9),rgb:pick(['255,200,90','255,140,40'])});return o.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,34,'255,190,80',.9);ctx.restore();}});
    tween(420,k=>{o.x=p.x+(tx-p.x)*k;o.y=p.y+(ty-p.y)*k-Math.sin(k*Math.PI)*90;}).then(()=>{o.on=false;sfx('fire');const R2={a:1};
      R18E({update(){R2.a-=.006;if(Math.random()<.5)part({x:cx(e)+rnd(-.4,.4)*e.w*e.scale,y:e.y+e.oy-rnd(0,e.h*e.scale),vx:rnd(-15,15),vy:-rnd(40,110),life:.7,size:rnd(3,6),rgb:pick(['255,190,80','255,130,40'])});return R2.a>0&&e.alive;},
        draw(){if(FW)r17Draw(FW,cx(e),e.y+e.oy+8,Math.max(150,e.w*e.scale*1.4),{anchor:'bottom',a:.75*R2.a,sy:.55});}});
      e.st.atkUp=Math.max(e.st.atkUp||0,2);popLabel(e,'ERŐSEBB!','#ffcf6a');});await wait(140);}
  await wait(900);u.pose='idle';};

// ---- 21) Chasen – Zen-csend („fejjel lefelé legyen a lótusz, és a szirmok hulljanak le”)
{const zc=A.chZen;A.chZen=async function(u,ts,sk){const LO=R17I.lotus,PE=R17I.petal;let flip=null;
  if(LO&&LO.width){flip=document.createElement('canvas');flip.width=LO.width;flip.height=LO.height;const g=flip.getContext('2d');g.translate(0,LO.height);g.scale(1,-1);g.drawImage(LO,0,0);R17I.lotus=flip;}
  const al=(ts||[]).filter(t=>t&&t.alive),xs=al.map(cx),xa=xs.length?Math.min(...xs)-200:300,xb=xs.length?Math.max(...xs)+200:700,st={on:true};
  const iv=setInterval(()=>{if(!st.on||!PE)return;for(let i=0;i<4;i++)r21PD(PE,rnd(xa,xb),rnd(60,150),{vx:rnd(-40,40),vy:rnd(60,140),g:40,size:rnd(18,30),life:rnd(1.4,2),vr:rnd(-3,3),drag:.3});},60);
  try{return await zc.apply(this,arguments);}finally{st.on=false;clearInterval(iv);if(flip)R17I.lotus=LO;}};}

// ---- 22) Lili fejlesztett ruhás képei („Lili képénél fehér”): az alátett szárny meleg, áttetsző aranyszín (r21zr-ben javítva)
