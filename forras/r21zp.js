// ===== 59. kör: látványelemek, 1. rész (teljes tesztlista, 5. csomag) =====

// ---- 1) „Ellenfelek repedése: nem kell”: a nagy ütések után az ellenfél alatt rajzolt kráter-repedés eltűnik
//    (a besüllyedés és a por marad)
r21Crater=function(){};

// ---- 2) Sötét mágus („miért használja az átok képességet?”): az Átok Morgána képessége – a mágus már nem használja
if(EN_DEF.mage)EN_DEF.mage.skills=(EN_DEF.mage.skills||[]).filter(x=>x[0]!=='curse');

// ---- 3) Fehér foltok („az Ezerrészes Szervizben van fehér”): a Szerviz füle és teste közötti rés, valamint a csészekatonák
//    fülének belseje tiszta fehér háttér maradt – átlátszóvá tesszük (a porcelán árnyalt fehérje megmarad).
//    A foltokat gépi kereséssel mértük ki: teljesen sima fehér (≥244) összefüggő foltok, a megadott középponttal.
(function(){const FIX={teaset:[[.9,.47],[.86,.5],[.86,.58]],'cupsoldier-attack':[[.9,.2]],cupsoldier:[[.88,.45]]};const done=new Set();let n=0;
  const run=(k,cs)=>{const im=ENEMY_SPR[k];if(!im||!im.width)return false;const c=im.getContext?im:null;if(!c)return false;const g=c.getContext('2d'),W2=c.width,H2=c.height,d=g.getImageData(0,0,W2,H2),px=d.data,N=W2*H2;
    const wh=i=>px[i*4+3]>200&&Math.min(px[i*4],px[i*4+1],px[i*4+2])>=244,seen=new Uint8Array(N);
    for(let i=0;i<N;i++){if(seen[i]||!wh(i))continue;const st=[i],pts=[];seen[i]=1;while(st.length){const j=st.pop();pts.push(j);const x=j%W2;for(const q of [j-1,j+1,j-W2,j+W2]){if(q<0||q>=N||Math.abs((q%W2)-x)>1)continue;if(!seen[q]&&wh(q)){seen[q]=1;st.push(q);}}}
      if(pts.length<80)continue;let sx=0,sy=0;for(const j of pts){sx+=j%W2;sy+=(j/W2)|0;}const mx=sx/pts.length/W2,my=sy/pts.length/H2;
      if(cs.some(([u,v])=>Math.abs(u-mx)<.025&&Math.abs(v-my)<.025))for(const j of pts)px[j*4+3]=0;}
    g.putImageData(d,0,0);return true;};
  const iv=setInterval(()=>{n++;try{if(typeof ENEMY_SPR==='object')for(const [k,cs] of Object.entries(FIX))if(!done.has(k)&&run(k,cs))done.add(k);}catch(e){}if(done.size>=3||n>80)clearInterval(iv);},300);})();

// ---- 4) Triplapresszó („a kávé a derékból és a könyökből jön”): a pontmérő (sprPt) a nagyított ellenfeleknél a
//    figura tetejét nagyítás nélkül számolta, így minden pont lejjebb csúszott – a „felső csövek” a derékra és a könyökre
//    estek. A Triplapresszónál a helyes magasságot használjuk, és a három kávésugár a három felső csőből jön
//    (bal gőzcső, középső kupola, jobb szelep – rácsos képen mérve).
{const sp0=sprPt;const MAP={'0.3,0.6':[.3,.13],'0.38,0.22':[.49,.07],'0.67,0.23':[.66,.19]};
  sprPt=function(u,fu,fv){if(u&&u.type==='ancient'){const m=MAP[fu+','+fv];if(m){fu=m[0];fv=m[1];}const nm=(typeof SPR_ALIAS!=='undefined'&&SPR_ALIAS[u.type])||u.type,b=(u.pose==='attack'||u.pose==='cast')&&ENEMY_SPR[nm+'-attack']||ENEMY_SPR[nm];
      const sc=u.scale||1,Hh=u.h*sc,Wd=b?b.width*(u.h/b.height)*sc:u.w*sc,top=u.y+u.oy-(u.h+(u.alive?u.lift||0:0))*sc;return {x:cx(u)+(fu-.5)*Wd,y:top+fv*Hh-(u.jump||0)};}
    return sp0.apply(this,arguments);};}

// ---- 5) Barlangi béka („a nyelve nem a szájából jön”): a festett nyelv eddig a távolsággal együtt vastagodott, így
//    messzire nyúlva az egész arcánál vastagabb volt. Most a szája résénél indul, és legfeljebb akkora, mint a szája.
{const f1=A.frogTongue;A.frogTongue=async(u,ts,sk)=>{const TG=R17I.frogtongue,t=ts[0];if(!TG||!t||u.type!=='frog')return f1(u,ts,sk);u.pose='idle';
  const mo=()=>KP(u,.14,.35),tx=cx(t)+10,ty=midY(t)-6,T0={k:0,on:true,glint:false},hmax=Math.max(10,u.h*(u.scale||1)*.075);
  R18E({update(){return T0.on;},draw(){const k=T0.k;if(k<=0)return;const m=mo(),dx=tx-m.x,dy=ty-m.y,L=Math.hypot(dx,dy)*k,a=Math.atan2(dy,dx),h=Math.min(hmax,Math.max(8,L*TG.height/TG.width));
    ctx.save();ctx.translate(m.x,m.y);ctx.rotate(a+Math.PI);ctx.drawImage(TG,-L,-h/2,L,h);ctx.restore();
    if(T0.glint){const ex=m.x+Math.cos(a)*L,ey=m.y+Math.sin(a)*L;ctx.save();ctx.globalCompositeOperation='lighter';glow(ex,ey,22,'255,220,120',.6);ctx.restore();}}});
  sfx('squish');u.sq=1.08;await wait(90);u.sq=1;sfx('slash');await tween(170,k=>{T0.k=easeIO(k);});
  t.hurt=.3;shake(7);sparks(tx,ty,['255,140,180','255,255,255'],12,280);const n0=(u.stolen||[]).length;hit(u,t,sk);T0.glint=(u.stolen||[]).length>n0;
  await wait(160);sfx('gulp');await tween(260,k=>{T0.k=1-easeIO(k);});T0.on=false;if(T0.glint){u.sq=1.12;await wait(120);u.sq=1;}await wait(120);};}

// ---- 6) Csillagözön (páros): sok apró csillag is hull a nagyok között
{const f=R16P['Csillagözön'];if(f)R16P['Csillagözön']=async function(A1,B1,al,sk,p){const st={on:true};const fs=(al||[]).filter(t=>t&&t.alive);
  const xa=fs.length?Math.min(...fs.map(cx))-200:400,xb=fs.length?Math.max(...fs.map(cx))+160:900;
  const iv=setInterval(()=>{if(!st.on)return;for(let i=0;i<9;i++){const x=rnd(xa,xb);part({x,y:rnd(-20,60),vx:rnd(-160,-60),vy:rnd(380,620),life:rnd(.7,1.1),size:rnd(2,4.5),rgb:pick(['255,250,210','255,235,150','255,255,255']),shape:'star'});}},40);
  try{return await f.apply(this,arguments);}finally{st.on=false;clearInterval(iv);}};}

// ---- 7) Tollvihar („legyen több toll”): a párna szétrobbanásakor a forgó tollörvény mellett még ~260 toll kavarog és
//    hull a hősökre
{const fs0=A.featherStorm;A.featherStorm=async function(u,ts,sk){const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return fs0.apply(this,arguments);
  const xs=al.map(cx),xa=Math.min(...xs)-160,xb=Math.max(...xs)+160,top=Math.min(...al.map(topY))-120,F=[],st={t:0,on:true};
  for(let i=0;i<260;i++)F.push({x:rnd(xa,xb),y:top-rnd(0,260),vx:rnd(-60,60),vy:rnd(40,140),r:rnd(0,6),vr:rnd(-4,4),s:rnd(.6,1.3),d:rnd(.55,1.6),ph:rnd(0,6)});
  R18E({update(dt){st.t+=dt;for(const f of F){if(st.t<f.d)continue;f.x+=f.vx*dt+Math.sin(st.t*3+f.ph)*40*dt;f.y+=f.vy*dt;f.r+=f.vr*dt;}return st.t<3.6;},
    draw(){ctx.save();ctx.globalAlpha=st.t>3?Math.max(0,(3.6-st.t)/.6):1;for(const f of F)if(st.t>=f.d&&f.y<H)drawFeather(f.x,f.y,f.r,f.s);ctx.restore();}});
  return fs0.apply(this,arguments);};}

// ---- 8) Párnalovag – Párnacsapás („nagyon robotos”): a lovag teste lendül (felhúzás hátradőlve, gyorsuló csapás előredőlve,
//    rugalmas visszarugózás), a párna gyorsulva, ívesen mozog, és a becsapódásnál belapul
A.pillowBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='pillowknight-attack';const d=await dashTo(u,t,260,30);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const p=T.pillow;
  sfx('whoosh');await tween(300,k=>{const e=easeIO(k);p.rot=.55*e;p.s=1+.25*e;u.lean=.14*e;u.sq=1+.05*e;});
  await tween(170,k=>{const e=k*k*k;p.rot=.55-3.0*e;u.lean=.14-.36*e;u.sq=1.05-.1*e;});sfx('hit');sfx('boing');shake(14);hitStop(90);const x=cx(t),y=midY(t);
  p.s=1.45;tween(220,k=>{p.s=1.45-.2*eOutBack(k);});
  for(let i=0;i<60;i++){const f={x:x+rnd(-30,30),y:y+rnd(-40,20),vx:rnd(-300,300),vy:rnd(-360,-40),r:rnd(0,6),t:0,s:rnd(.8,1.5)};effects.push({update(dt){f.t+=dt;f.vy+=150*dt;f.vx*=.96;f.x+=f.vx*dt+Math.sin(f.t*6)*1.5;f.y+=f.vy*dt;f.r+=dt*3;return f.t<1.8;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.8-f.t)*2);drawFeather(f.x,f.y,f.r,f.s);ctx.restore();}});}
  puffs(x,y,8,['255,255,255','235,232,250'],[18,30]);t.hurt=.45;toss(t,40,320);hit(u,t,sk);await wait(120);
  await tween(360,k=>{const e=eOutBack(k);p.rot=-2.45*(1-e);p.s=1.25-.25*k;u.lean=-.22*(1-e);u.sq=.95+.05*k;});u.lean=0;u.sq=1;limbOff(u);await dashBack(u,d);};

// ---- 9) Szökőár („dobja fel az ellenfelet”): a hullám magasra dobja az eltalált ellenségeket, pörögve esnek vissza
{const ts0=A.tsunami;A.tsunami=async function(u,ts,sk){const h0=hit;hit=function(a,t,s){const r=h0.apply(this,arguments);try{if(a===u&&t&&t.kind==='enemy'){toss(t,220,900);if(!(t.d&&(t.d.boss||t.d.miniboss))){const s0=t.spin||0;tween(800,k=>{t.spin=s0+Math.sin(k*Math.PI)*1.2;}).then(()=>{t.spin=0;});}}}catch(e){}return r;};
  try{return await ts0.apply(this,arguments);}finally{hit=h0;}};}

// ---- 10) Őrület („legyen vizuális jele annak, akit megszáll”): amíg tart, a figura szédülten imbolyog, zöldes, beteges
//    fény lüktet rajta, és festett zöld csillagok keringenek a feje körül
{const de=drawEntity;drawEntity=function(e){if(!e||!e.alive||!e.st||!e.st.plagued)return de.apply(this,arguments);
  const tt=performance.now()/1000,gx=cx(e),gy=e.y+e.oy,sway=Math.sin(tt*2.6)*.07;let r;
  ctx.save();ctx.translate(gx,gy);ctx.rotate(sway);ctx.translate(-gx,-gy);try{ctx.filter=`hue-rotate(${50+20*Math.sin(tt*3)}deg) saturate(1.4)`;}catch(x){}r=de.apply(this,arguments);try{ctx.filter='none';}catch(x){}ctx.restore();
  try{const ST=r21Filt(R17I.star,'hue-rotate(60deg) saturate(1.6) brightness(1.05)'),hx=gx+Math.sin(sway)*e.h*(e.scale||1),hy=topY(e)+6;
    for(let i=0;i<3;i++){const a=tt*3.2+i*2.094,x=hx+Math.cos(a)*Math.max(26,e.w*(e.scale||1)*.35),y=hy+Math.sin(a)*9,s=16+4*Math.sin(a);if(ST){ctx.save();ctx.globalAlpha=.95;ctx.translate(x,y);ctx.rotate(a*2);ctx.drawImage(ST,-s/2,-s/2,s,s);ctx.restore();}}
    if(Math.random()<.12)part({x:gx+rnd(-.3,.3)*e.w*(e.scale||1),y:topY(e)+rnd(0,30),vx:rnd(-15,15),vy:-rnd(20,50),life:.7,size:rnd(3,6),rgb:pick(['150,230,90','120,200,60']),shape:'star'});}catch(err){}
  return r;};}

// ---- 11) Rozsda-átok („legyen láthatóbb”): amíg tart, a figura erősen rozsdabarna (rozsdás réteg), sűrűbben hullanak a
//    festett rozsdapelyhek, és alatta rozsdapor gyűlik
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e.alive&&e._r21rust&&e.st&&e.st.defDown){
    ctx.save();ctx.globalAlpha=.42+.08*Math.sin(performance.now()/260);try{ctx.filter='sepia(1) saturate(3.2) hue-rotate(-22deg) brightness(.68) contrast(1.2)';}catch(x){}de.call(this,e);try{ctx.filter='none';}catch(x){}ctx.restore();
    const PB=r21Filt(R17I.pebble,'sepia(1) saturate(2.8) hue-rotate(-22deg) brightness(.72)');if(PB&&Math.random()<.5)r21PD(PB,cx(e)+rnd(-.4,.4)*e.w*(e.scale||1),e.y+e.oy-rnd(.15,.95)*e.h*(e.scale||1),{vx:rnd(-25,25),vy:rnd(10,50),g:320,size:rnd(6,12),life:rnd(.7,1.1)});}}catch(err){}return r;};}

// ---- 12) Kristálygólem – „Szilánkeső: nagyon gagyi, alakítsd át kristályökölre”: Kristályöklök – a gólem felemeli a karját,
//    a földből és a levegőből óriás, kristályból (festett ököl, kristálykékre színezve) álló öklök csapnak le minden hősre,
//    a becsapódásnál kristályszilánkok szóródnak szét
if(ESK.shardspray){ESK.shardspray.name='Kristályöklök';ESK.shardspray.anim='crystalFists';ESK.shardspray.desc='Óriás kristályöklök csapnak le minden hősre, kristályszilánkok szóródnak.';}
A.crystalFists=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const FI=r21Filt(R17I.goldfist||R17I.oakfist,'grayscale(1) sepia(1) hue-rotate(160deg) saturate(2.2) brightness(1.35) contrast(1.1)'),SH=r21Filt(R17I.glacier,'hue-rotate(10deg) brightness(1.1)');
  u.pose='cast';await bodyWind(u,380,.16);sfx('ice');sfx('glass');
  const Fs=al.map((t,i)=>({t,y:-260-i*60,a:1,s:Math.max(170,t.h*t.scale*1.25),rot:rnd(-.25,.25),hit:false}));
  R18E({update(){return Fs.some(f=>f.a>0);},draw(){if(!FI)return;for(const f of Fs){if(f.a<=0)continue;const x=cx(f.t),w=f.s,h=w*FI.height/FI.width;ctx.save();ctx.globalAlpha=f.a;ctx.translate(x,f.y);ctx.rotate(Math.PI+f.rot);ctx.drawImage(FI,-w/2,-h*.85,w,h);ctx.restore();
    ctx.save();ctx.globalCompositeOperation='lighter';glow(x,f.y,w*.45,'170,230,255',.35*f.a);ctx.restore();}}});
  await bodyStrike(u,160,-.2);
  for(const f of Fs){(async()=>{const ty=topY(f.t)+f.t.h*f.t.scale*.3;await tween(240,k=>{f.y=-260+(ty+260)*k*k;});sfx('glass');sfx('hit');shake(14);hitStop(60);flash('210,240,255',.25,.08);
      if(SH)for(let i=0;i<10;i++)r21PD(SH,cx(f.t)+rnd(-30,30),ty+rnd(-20,30),{vx:rnd(-340,340),vy:-rnd(120,420),g:1000,size:rnd(26,48),life:rnd(.6,1)});
      sparks(cx(f.t),ty,['200,240,255','255,255,255','140,200,255'],26,520);f.t.hurt=.55;toss(f.t,40,320);hit(u,f.t,sk);await wait(220);await tween(300,k=>{f.a=1-k;f.y=ty-40*k;});})();await wait(140);}
  await wait(800);await bodySettle(u);u.pose='idle';};

// ---- 13) Jégelementál – Jégcsapok („jók, csak élethűbb effektek kellenek”): a hősök fölött festett jégkristály-csapok
//    nőnek ki dérfelhőből, megremegnek, lezuhannak, a becsapódásnál festett jégszilánkokra törnek, dér gomolyog a hős lábánál,
//    és a hős egy pillanatra jégkékre dermed
A.icicles=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const IC=R17I.glacier,FR=r21Filt(R17I.teacloud,'brightness(1.3) saturate(.3) hue-rotate(170deg)');
  await castPose(u,'160,230,255',380);sfx('ice');await dimTo(.3,'0,20,50',200);
  const ic=[];for(const t of al)for(let i=0;i<3;i++)ic.push({t,x:cx(t)+(i-1)*40+rnd(-8,8),w:rnd(46,64),y:topY(t)-150-rnd(0,40),k:0,st:0,a:1,jit:0});
  const fx={on:true,cl:0};R18E({update(){return fx.on;},draw(){if(FR&&fx.cl>0)for(const t of al){ctx.save();ctx.globalAlpha=.6*fx.cl;r17Draw(FR,cx(t),topY(t)-170,220,{});ctx.restore();}
    if(IC)for(const c of ic){if(c.a<=0||c.k<=0)continue;const h=c.w*IC.height/IC.width*1.8*c.k;ctx.save();ctx.globalAlpha=c.a;ctx.translate(c.x+c.jit,c.y);ctx.rotate(Math.PI);ctx.drawImage(IC,-c.w/2,-h,c.w,h);ctx.restore();}}});
  await tween(350,k=>{fx.cl=k;});await tween(380,k=>{for(const c of ic)c.k=eOutBack(k);});sfx('ice');
  await tween(300,k=>{for(const c of ic)c.jit=Math.sin(k*60)*2.5;});
  await tween(230,k=>{for(const c of ic){c.st=1;c.y=c.y+(c.t.y+c.t.oy-60-c.y)*k*k;}});sfx('glass');sfx('ice');shake(16);hitStop(90);
  for(const c of ic){c.a=0;if(IC)for(let i=0;i<5;i++)r21PD(IC,c.x+rnd(-14,14),c.t.y+c.t.oy-50,{vx:rnd(-260,260),vy:-rnd(140,360),g:1000,size:rnd(16,30),life:rnd(.6,.9)});}
  for(const t of al){if(FR)for(let i=0;i<3;i++)r21PD(FR,cx(t)+rnd(-40,40),t.y+t.oy-10,{vx:rnd(-50,50),vy:-rnd(10,30),size:rnd(110,160),grow:50,life:1.2,a:.7});t.hurt=.5;
    t._r21frz={t0:performance.now()};}
  for(const t of al)hit(u,t,sk);fx.cl=0;await wait(500);fx.on=false;await dimTo(0,null,250);u.pose='idle';};
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21frz)return de.apply(this,arguments);const k=(performance.now()-e._r21frz.t0)/900;if(k>=1){e._r21frz=null;return de.apply(this,arguments);}
  const r=de.apply(this,arguments);ctx.save();ctx.globalAlpha=.55*(1-k);try{ctx.filter='grayscale(1) sepia(1) hue-rotate(165deg) saturate(2.5) brightness(1.35)';}catch(x){}de.call(this,e);try{ctx.filter='none';}catch(x){}ctx.restore();return r;};}

// ---- 14) Villámdenevér – Szikraharapás („a villámcsapás így nem jó; repüljön oda, harapjon bele, és rázza meg az áram”):
//    nincs égi villám. A denevér odarepül a hőshöz, belemar, és a harapásból festett villámok cikáznak végig a hős testén,
//    aki remegve rázkódik; aztán a denevér visszarepül
if(ESK.zapbite){ESK.zapbite.anim='batBite';ESK.zapbite.desc='A denevér odarepül, belemar egy hősbe, és a harapásból áram rázza meg.';}
A.batBite=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const BO=R17I.bolt;u.pose='attack';
  const dx=(cx(t)+t.w*t.scale*.35)-cx(u),dy=(topY(t)+t.h*t.scale*.25)-midY(u);sfx('whoosh');ghosts&&ghosts(u,320);
  await tween(320,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e-Math.sin(k*Math.PI)*50;});
  sfx('hit');sfx('zap');u.sq=.85;hitStop(70);const Z={on:true};const ox0=t.ox||0;
  R18E({update(){return Z.on;},draw(){if(!BO)return;for(let i=0;i<4;i++){const x=cx(t)+rnd(-.35,.35)*t.w*t.scale,y=midY(t)+rnd(-.4,.4)*t.h*t.scale,s=rnd(50,90);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=rnd(.6,1);ctx.translate(x,y);ctx.rotate(rnd(0,6.28));ctx.drawImage(BO,-s/2,-s/2,s,s*BO.height/BO.width);ctx.restore();}
    ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),t.h*t.scale*.6,'200,230,255',.35);ctx.restore();}});
  await tween(650,k=>{t.ox=ox0+Math.sin(k*90)*5;if(Math.random()<.35){flash('230,240,255',.15,.04);sfx('zap');}});t.ox=ox0;Z.on=false;u.sq=1;t.hurt=.5;hit(u,t,sk);
  await wait(150);await tween(340,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e)-Math.sin(k*Math.PI)*40;});u.ox=0;u.oy=0;u.pose='idle';};
