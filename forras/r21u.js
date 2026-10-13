// ===== 32. kör: egyensúly (a felhasználó: „a limit és idézés támadások alig hatnak, az ellenfelek erősebbek, mint kellene”) =====
// Mérés (bal.js, Normál nehézség, a hősök a pálya szintjén): a késői pályákon egy alaptámadás a közönséges ellenfél életének
// csak 2–5%-át vitte le (20–40 ütés egy ellenfélre), a LIMIT 7–15%-át, egy idézés 10–20%-át – az ellenfelek élete sokkal
// gyorsabban nőtt, mint a hősök sebzése. Javítás:
// 1. az ellenfelek életereje a szinttel csökkenő szorzót kap (a 4. szintig változatlan, a 74. szinten kb. az ötöde),
//    a főellenségeké valamivel kevésbé (maradjon kemény küzdelem);
// 2. az ellenfelek támadása a 8. szinttől 12%-kal gyengébb;
// 3. a LIMIT 1,6×, az idézés 1,6×, a páros támadás 1,3× erősebb.
const R21HPK=.06,r21HpDiv=(el,boss)=>1+Math.max(0,el-4)*R21HPK*(boss?.82:1);
{const mk=mkEnemy;mkEnemy=function(type,x,y,elvl=1){const e=mk.apply(this,arguments);try{const d=e.d||{},div=r21HpDiv(elvl,d.boss||d.miniboss);
    e.maxHp=Math.max(1,Math.round(e.maxHp/div));e.hp=e.maxHp;if(elvl>=8){e.atk*=.88;e.mag*=.88;}}catch(err){}return e;};}
const r21IsLim=sk=>!!sk&&(sk.isLimit||(typeof LIMITS==='object'&&Object.values(LIMITS).some(l=>l&&l.name===sk.name))||(typeof COMBO==='object'&&COMBO&&COMBO.name===sk.name));
{const h0=hit;hit=function(u,t,sk){try{if(u&&t&&sk&&t.kind==='enemy'&&(sk.kind==='phys'||sk.kind==='mag')&&u.kind==='hero'){let m=1;
      if(u.hp>=999999)m=1.6;                                   // idézés (a summoner() „hőse”)
      else if(r21IsLim(sk))m=1.6;
      else if(sk.pair||(typeof PAIRS==='object'&&PAIRS.some(p=>p.name===sk.name)))m=1.3;
      if(m!==1)sk=Object.assign({},sk,{pow:(sk.pow||1)*m});}}catch(e){}
  return h0.call(this,u,t,sk);};}

// ---- Morgána – Sötétalku (a felhasználó: „megint lángok veszik körbe, ami nem kell” – B7: korábbi tiltás): a megszállás
// alatt egy régi réteg (r19-es drawEntity-burkoló) 4 mp után folyamatosan sötét lángnyelveket szórt köré. Mostantól a
// megszállt Morgána körül soha nincs láng (a vörös szem és a halvány derengés marad).
{const df=darkFlame;darkFlame=function(o){try{if(o&&S&&S.heroes){const w=S.heroes.find(h=>h.type==='witch'&&h.possessed&&h.alive);if(w&&Math.abs(o.x-cx(w))<170&&o.y>topY(w)-60&&o.y<w.y+w.oy+30)return;}}catch(e){}return df.apply(this,arguments);};}

// ---- Tealopó majom (a felhasználó: „8 csészét dob, elég 3”): egy dobássorozat 3 csésze, és körönként csak egyszer dob
// (kétszer lép – a második lépése ilyenkor csészelopás)
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){try{if(e&&e.type==='monkey'&&sk&&sk.anim==='cupThrow'){if(e._cupR===S.round&&ESK.snatch)sk=ESK.snatch;else e._cupR=S.round;}}catch(err){}return ue.call(this,e,sk,target);};}

// ---- PÁROS: Árnyroham (ha07: „Grog alakuljon át azzá a pengévé, ami lecsap, és több sötétség”): a kép elsötétül,
// Morgána sötét füstje körbefonja Grogot, Grog füstté oszlik, és a helyén egy óriási festett árnypenge (fx7-shadowblade)
// formálódik; a penge hátralendül, majd egyetlen hatalmas ívben végigsuhan az összes ellenségen (utóképek, sötét
// robbanások), aztán visszarepül, és újra Groggá áll össze. Gyors maradt.
{const P0=R16P['Árnyroham'];R16P['Árnyroham']=async(A1,B1,al,sk,p)=>{const im=R17I.shadowblade;if(!im)return P0(A1,B1,al,sk,p);
  const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1,a0=orc.alpha==null?1:orc.alpha;
  await dimTo(.86,'8,0,16',200);r16Raise(witch,'150,60,240',300);sfx('dark');
  const ox=cx(orc),oy=midY(orc),Bd={x:ox,y:oy,s:.2,a:0,rot:0,on:true,tr:[]},BW=Math.max(380,orc.h*orc.scale*1.9);
  R18E({update(){Bd.tr.push({x:Bd.x,y:Bd.y,rot:Bd.rot,s:Bd.s});if(Bd.tr.length>7)Bd.tr.shift();if(Bd.on&&Bd.a>.3)for(let n=0;n<2;n++)part({x:Bd.x+rnd(-BW*.4,BW*.1),y:Bd.y+rnd(-40,30),vx:rnd(-160,-40),vy:rnd(-40,20),life:rnd(.4,.7),size:rnd(16,30),grow:20,rgb:pick(['20,0,35','60,15,110','10,0,20']),add:false,shape:'dsmoke'});return Bd.on;},
    draw(){if(Bd.a<=0)return;const w=BW*Bd.s,h=w*im.height/im.width;
      Bd.tr.forEach((q,i)=>{if(i===Bd.tr.length-1)return;ctx.save();ctx.globalAlpha=Bd.a*.18*(i+1)/Bd.tr.length;ctx.translate(q.x,q.y);ctx.rotate(q.rot);ctx.drawImage(im,-w*.55,-h*.6,w,h);ctx.restore();});
      ctx.save();ctx.globalCompositeOperation='lighter';glow(Bd.x+w*.2,Bd.y,w*.45,'150,60,255',.35*Bd.a);ctx.restore();
      ctx.save();ctx.globalAlpha=Bd.a;ctx.translate(Bd.x,Bd.y);ctx.rotate(Bd.rot);ctx.drawImage(im,-w*.55,-h*.6,w,h);ctx.restore();}});
  // sötét füst fonja körbe Grogot, Grog szétoszlik, a helyén formálódik a penge
  const h=handPos(witch);for(let i=0;i<40;i++)setTimeout(()=>{const q=Math.random();part({x:h.x+(ox-h.x)*q+rnd(-14,14),y:h.y+(oy-h.y)*q-Math.sin(q*Math.PI)*60,vx:(ox-h.x)*.8,vy:rnd(-30,30),drag:1.5,life:rnd(.4,.7),size:rnd(18,30),grow:24,rgb:pick(['20,0,35','70,20,120']),add:false,shape:'dsmoke'});},i*7);
  await wait(260);sfx('fire');
  for(let i=0;i<36;i++){const an=rnd(0,6.283),r=rnd(20,70);part({x:ox+Math.cos(an)*r,y:oy+Math.sin(an)*r*1.4,vx:-Math.cos(an)*60,vy:-Math.sin(an)*60,life:rnd(.4,.8),size:rnd(20,36),grow:20,rgb:pick(['15,0,28','60,15,110','110,40,180']),add:false,shape:'dsmoke'});}
  await tween(300,k=>{orc.alpha=a0*(1-k);Bd.a=k;Bd.s=.2+.8*r21ease.back(k);Bd.rot=-.2*k;});flash('120,40,220',.3,.12);r16Lower(witch);
  // hátralendül, majd egyetlen ívben végigsuhan minden ellenségen
  sfx('dark');await tween(200,k=>{const e=r21ease.out(k);Bd.rot=-.2-.7*e;Bd.x=ox-30*e;Bd.y=oy-40*e;});
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x1=Math.min(W-60,cx(xs[xs.length-1])+120),gy=xs.reduce((s,t)=>s+midY(t),0)/xs.length,done=new Set();sfx('whoosh');sfx('slash');
  await tween(380,k=>{const e=r21ease.io(k);Bd.x=ox-30+(x1-ox+30)*e;Bd.y=oy-40+(gy-oy+40)*e-Math.sin(k*Math.PI)*80;Bd.rot=-.9+1.5*e;
    for(const t of xs)if(!done.has(t)&&Bd.x+BW*.25>cx(t)){done.add(t);sfx('slash');shake(18);hitStop(60);
      for(let n=0;n<5;n++)darkFlame({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-80,80),vy:-rnd(60,180),life:.6,size:rnd(18,30)});
      for(let n=0;n<18;n++)part({x:cx(t),y:midY(t),vx:rnd(-380,380),vy:rnd(-300,200),life:rnd(.4,.8),size:rnd(16,28),grow:18,rgb:pick(['15,0,28','70,20,120']),add:false,shape:'dsmoke'});
      sparks(cx(t),midY(t),['200,120,255','255,240,255'],30,560);toss(t,70,440);t.hurt=.6;hit(orc,t,sk);}});
  flash('140,60,240',.4,.12);shake(14);sfx('boom');await wait(120);
  // vissza: a penge visszarepül, és újra Groggá áll össze
  await tween(260,k=>{const e=r21ease.io(k);Bd.x=x1+(ox-x1)*e;Bd.y=gy+(oy-gy)*e-Math.sin(k*Math.PI)*60;Bd.rot=.6-.6*e;});
  for(let i=0;i<24;i++){const an=rnd(0,6.283);part({x:ox+Math.cos(an)*70,y:oy+Math.sin(an)*90,vx:-Math.cos(an)*120,vy:-Math.sin(an)*120,life:.4,size:rnd(16,28),grow:10,rgb:pick(['15,0,28','70,20,120']),add:false,shape:'dsmoke'});}
  await tween(220,k=>{Bd.a=1-k;Bd.s=1-.6*k;orc.alpha=a0*k;});Bd.on=false;orc.alpha=a0;
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await dimTo(0,null,200);};}

// ---- PÁROS: Tündérököl (ha06: „nőjön meg Grog kezén az aranyököl, ahogy kilő, fokozatosan nőjön, egyszerre suhanjon
// végig az ellenfeleken, nagy fény és csillámpor; festett, ne darabos”): Lili csillámport szór Grogra, Grog arannyal
// izzik, felemelt öklén (rácson mérve .245/.245) kicsi festett aranyököl gyúl ki; Grog előrelendül, az ököl kilő, és
// repülés közben folyamatosan nő (a végén akkora, mint az ellenfelek), egyszerre suhan át rajtuk – fénycsóva, csillámpor,
// a végén hatalmas aranyrobbanás a képernyő szélén
{R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const FI=R17I.goldpunch||R17I.goldfist,gb=R17I.goldburst,fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;await dimTo(.5,'40,30,0',260);
  const SW0={a:ENEMY_SPR['orc-cast'],b:ENEMY_SPR['orcG-cast']};if(ENEMY_SPR['orcnoaxe-cast'])ENEMY_SPR['orc-cast']=ENEMY_SPR['orcnoaxe-cast'];if(ENEMY_SPR['orcGnoaxe-cast'])ENEMY_SPR['orcG-cast']=ENEMY_SPR['orcGnoaxe-cast'];
  const rel=keepPose(orc,'cast');try{const fist=()=>KP(orc,.245,.245);
  // Lili csillámpora (rövid), Grog arannyal izzik
  fairy.pose='cast';sfx('holy');const fh=handPos(fairy),f0=fist();for(let i=0;i<60;i++)setTimeout(()=>part({x:fh.x,y:fh.y,vx:(f0.x-fh.x)*rnd(1.4,2)+rnd(-40,40),vy:(f0.y-fh.y)*rnd(1.4,2)+rnd(-40,40),life:.5,size:rnd(2,5),rgb:pick(['255,230,120','255,255,255','255,200,90']),shape:'star'}),i*8);
  orc._r16tint={rgb:'255,210,90',a:0};await tween(520,k=>{orc._r16tint.a=.28*k;});fairy.pose='idle';
  const F={x:0,y:0,s:.25,a:0,on:true,fly:false,rot:-.15,tr:[]};
  R18E({update(){if(F.on&&F.a>0){const n=F.fly?6:2;for(let i=0;i<n;i++)part({x:F.x+rnd(-30,10)*F.s*2,y:F.y+rnd(-30,30)*F.s*2,vx:F.fly?rnd(-260,-60):rnd(-40,40),vy:rnd(-60,60),life:rnd(.4,.8),size:rnd(2,6),rgb:pick(['255,240,170','255,210,90','255,255,255']),shape:'star'});}
      if(F.fly){F.tr.push({x:F.x,y:F.y,s:F.s});if(F.tr.length>10)F.tr.shift();}return F.on;},
    draw(){if(F.a<=0||!FI)return;if(!F.fly){const q=fist();F.x=q.x;F.y=q.y;}const S2=Math.max(70,orc.h*orc.scale*.32)*F.s,w=S2*1.6,h=w*FI.height/FI.width;
      ctx.save();ctx.globalCompositeOperation='lighter';
      if(F.fly&&F.tr.length>1){const t0=F.tr[0];const g=ctx.createLinearGradient(t0.x,0,F.x,0);g.addColorStop(0,'rgba(255,210,90,0)');g.addColorStop(1,`rgba(255,235,160,${.55*F.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(t0.x,F.y-h*.15);ctx.lineTo(F.x,F.y-h*.45);ctx.lineTo(F.x,F.y+h*.45);ctx.lineTo(t0.x,F.y+h*.15);ctx.closePath();ctx.fill();}
      glow(F.x,F.y,w*.9,'255,210,90',.5*F.a);glow(F.x,F.y,w*.35,'255,250,220',.6*F.a);ctx.restore();
      ctx.save();ctx.globalAlpha=F.a;ctx.translate(F.x,F.y);ctx.rotate(R17I.goldpunch?0:F.rot);ctx.drawImage(FI,R17I.goldpunch?-w*.75:-w/2,-h/2,w,h);ctx.restore();}});
  // az ököl kigyúl a kezén, és nőni kezd
  sfx('holy');await tween(380,k=>{F.a=k;F.s=.25+.45*r21ease.out(k);});
  // Grog előrelendül, az ököl kilő és repülés közben folyamatosan nő – egyszerre suhan át az összes ellenfélen
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=xs.reduce((s,t)=>s+midY(t),0)/xs.length,maxH=Math.max(...xs.map(t=>t.h*t.scale)),sEnd=Math.max(1.8,maxH*1.25/(Math.max(70,orc.h*orc.scale*.32)*1.6*FI.height/FI.width)),done=new Set();
  const o0=orc.ox||0;await tween(140,k=>{orc.ox=o0-14*k;orc.lean=-.08*k;});sfx('whoosh');sfx('boom');shake(10);
  const st=fist();F.fly=true;F.x=st.x;F.y=st.y;tween(160,k=>{orc.ox=o0-14+44*r21ease.out(k);orc.lean=-.08+.2*k;});
  await tween(700,k=>{const e=r21ease.in(k*.6+.4*k*k);F.x=st.x+(W+200-st.x)*e;F.y=st.y+(gy-st.y)*Math.min(1,k*1.8);F.s=.7+(sEnd-.7)*r21ease.out(Math.min(1,k*1.4));F.rot=-.15*(1-k);
    for(const t of xs)if(!done.has(t)&&F.x>cx(t)-40){done.add(t);sfx('holy');sfx('hit');shake(14);hitStop(50);flash('255,240,180',.25,.08);lightPillar(cx(t),t.y+t.oy,170,1);
      sparks(cx(t),midY(t),['255,240,180','255,210,90','255,255,255'],44,700);toss(t,120,560);t.hurt=.6;hit(orc,t,sk);}});
  // hatalmas aranyrobbanás a képernyő szélén + csillámpor-eső
  sfx('boom');flash('255,240,180',.7,.25);shake(26);rumble&&rumble(1.2,10);
  if(gb){const B={k:0};R18E({update(dt){B.k+=dt/1.1;return B.k<1;},draw(){r17Draw(gb,W-120,gy,1100*(.3+.7*eOutBack(Math.min(1,B.k*1.6))),{add:true,a:1-B.k*B.k});}});}
  for(let i=0;i<120;i++)part({x:rnd(0,W),y:rnd(-20,120),vx:rnd(-30,30),vy:rnd(60,200),g:60,life:rnd(1,1.8),size:rnd(2,5),rgb:pick(['255,240,170','255,210,90','255,255,255']),shape:'star'});
  F.on=false;await tween(320,k=>{orc.ox=o0+30*(1-k);orc.lean=.12*(1-k);orc._r16tint.a=.28*(1-k);});orc.ox=o0;orc.lean=0;orc._r16tint=null;
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await wait(400);await dimTo(0,null,260);}finally{rel();ENEMY_SPR['orc-cast']=SW0.a;ENEMY_SPR['orcG-cast']=SW0.b;orc._r16tint=null;}};}
