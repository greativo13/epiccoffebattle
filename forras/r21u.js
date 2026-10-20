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
  await tween(500,k=>{orc.alpha=a0*(1-k);Bd.a=k;Bd.s=.2+.8*r21ease.back(k);Bd.rot=-.2*k;});flash('120,40,220',.3,.12);r16Lower(witch);
  // hátralendül, majd egyetlen ívben végigsuhan minden ellenségen
  sfx('dark');await tween(380,k=>{const e=r21ease.out(k);Bd.rot=-.2-.7*e;Bd.x=ox-30*e;Bd.y=oy-40*e;});
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x1=Math.min(W-60,cx(xs[xs.length-1])+120),gy=xs.reduce((s,t)=>s+midY(t),0)/xs.length,done=new Set();sfx('whoosh');sfx('slash');
  await tween(620,k=>{const e=r21ease.io(k);Bd.x=ox-30+(x1-ox+30)*e;Bd.y=oy-40+(gy-oy+40)*e-Math.sin(k*Math.PI)*80;Bd.rot=-.9+1.5*e;
    for(const t of xs)if(!done.has(t)&&Bd.x+BW*.25>cx(t)){done.add(t);sfx('slash');shake(18);hitStop(60);
      for(let n=0;n<5;n++)darkFlame({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-80,80),vy:-rnd(60,180),life:.6,size:rnd(18,30)});
      for(let n=0;n<18;n++)part({x:cx(t),y:midY(t),vx:rnd(-380,380),vy:rnd(-300,200),life:rnd(.4,.8),size:rnd(16,28),grow:18,rgb:pick(['15,0,28','70,20,120']),add:false,shape:'dsmoke'});
      sparks(cx(t),midY(t),['200,120,255','255,240,255'],30,560);toss(t,70,440);t.hurt=.6;hit(orc,t,sk);}});
  flash('140,60,240',.4,.12);shake(14);sfx('boom');await wait(120);
  // (ia02: „Grog földes-lávás képessége nincs benne – a penge álljon bele a földbe, és törjön fel a láva”) a penge a
  // magasba emelkedik, megfordul, és hegyével az ellenségek közé a földbe vágódik; a föld megreped, izzó lávatócsák
  // nyílnak minden ellenség alatt, és sűrű, izzó, kihűlve feketedő láva lövell fel belőlük (nem tűz)
  const mx=xs.reduce((s2,t)=>s2+cx(t),0)/xs.length,fy=Math.max(...xs.map(t=>t.y+t.oy));
  sfx('whoosh');await tween(420,k=>{const e=r21ease.out(k);Bd.x=x1+(mx-x1)*e;Bd.y=gy-(gy-130)*e;Bd.rot=.6+(Math.PI/2+.25-.6)*e;});await wait(120);
  sfx('whoosh');await tween(170,k=>{const e=r21ease.in(k);Bd.y=130+(fy-60-130)*e;});
  sfx('boom');sfx('quake');shake(32);flash('255,120,40',.35,.15);rumble&&rumble(1.5,12);hitStop(90);
  const LV=xs.map(t=>({x:cx(t),y:t.y+t.oy+8,pool:0,cr:null,a:0})),BL=[],SPL=[],LL={on:true};
  R18E({update(dt){for(let q=BL.length-1;q>=0;q--){const b=BL[q];b.age+=dt*.3;b.vy+=1500*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.vy>0&&b.y>=b.gy){SPL.push({x:b.x,y:b.gy,r:b.r*1.6,age:b.age*.6});BL.splice(q,1);}}
      for(let q=SPL.length-1;q>=0;q--){SPL[q].age+=dt*(LL.on?.45:1.2);if(SPL[q].age>1.6)SPL.splice(q,1);}
      for(const v of LV)if(v.pool>.3&&Math.random()<.08)part({x:v.x+rnd(-60,60),y:v.y-rnd(0,10),vx:rnd(-10,10),vy:-rnd(40,90),life:rnd(1,1.6),size:rnd(14,24),rgb:pick(['50,40,40','70,60,55']),add:false,shape:'smoke'});return LL.on||BL.length||SPL.length;},
    draw(){// repedés a penge helyétől minden ellenségig
      if(LL.k>0){ctx.save();ctx.globalAlpha=Math.min(1,LL.k);ctx.lineCap='round';for(const [w,c] of [[8,'rgba(40,12,4,.9)'],[3.5,'rgba(255,150,40,.95)'],[1.4,'rgba(255,240,180,1)']]){ctx.strokeStyle=c;ctx.lineWidth=w;for(const v of LV){ctx.beginPath();ctx.moveTo(LL.px,fy);for(let q=1;q<=6;q++){const e=q/6*LL.k;ctx.lineTo(LL.px+(v.x-LL.px)*e+Math.sin(q*2.3+v.x)*10,fy+(v.y-fy)*e+Math.cos(q*1.7)*4);}ctx.stroke();}}ctx.restore();}
      for(const v of LV){if(v.pool<=0)continue;const R=175*v.pool;ctx.save();ctx.translate(v.x,v.y);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,R*1.6,'255,90,20',.5*v.pool);ctx.globalCompositeOperation='source-over';
        if(!v.cr){v.cr=[];for(let q=0;q<12;q++){const a=q/12*6.283+rnd(-.2,.2),pts=[[0,0]];let r=0,an=a;while(r<1){r+=rnd(.12,.22);an+=rnd(-.35,.35);pts.push([Math.cos(an)*r,Math.sin(an)*r]);}v.cr.push(pts);}}
        const cg=ctx.createRadialGradient(0,0,R*.2,0,0,R);cg.addColorStop(0,'rgba(60,22,12,1)');cg.addColorStop(.75,'rgba(32,16,12,1)');cg.addColorStop(1,'rgba(30,20,16,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
        v.a+=.05;const fl=.75+.25*Math.sin(v.a*3);ctx.lineCap='round';ctx.lineJoin='round';
        for(const [lw,col] of [[R*.09,`rgba(255,90,20,${.55*fl})`],[R*.045,`rgba(255,180,60,${.9*fl})`],[R*.016,`rgba(255,245,190,${fl})`]]){ctx.strokeStyle=col;ctx.lineWidth=lw;for(const pts of v.cr){ctx.beginPath();pts.forEach((pp,q)=>{const x=pp[0]*R*.95,y=pp[1]*R*.95;q?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}}
        const og=ctx.createRadialGradient(0,0,0,0,0,R*.38);og.addColorStop(0,'rgba(255,250,200,1)');og.addColorStop(.5,'rgba(255,170,40,1)');og.addColorStop(1,'rgba(220,60,10,0)');ctx.fillStyle=og;ctx.beginPath();ctx.arc(0,0,R*.38,0,6.29);ctx.fill();ctx.restore();}
      for(const sp of SPL){const [r,g2,b]=lavaCol(sp.age);ctx.fillStyle=`rgba(${r|0},${g2|0},${b|0},${Math.min(1,2.2-sp.age*1.3)})`;ctx.beginPath();ctx.ellipse(sp.x,sp.y,sp.r,sp.r*.32,0,0,6.29);ctx.fill();}
      for(const b of BL){const [r,g2,bb]=lavaCol(b.age);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,b.r*2.4,'255,110,30',.35*Math.max(0,1-b.age));ctx.restore();
        const gr=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,1,b.x,b.y,b.r);gr.addColorStop(0,`rgb(255,${Math.min(255,g2+60)|0},${Math.min(255,bb+30)|0})`);gr.addColorStop(.6,`rgb(${r|0},${g2|0},${bb|0})`);gr.addColorStop(1,`rgb(${(r*.45)|0},${(g2*.3)|0},${(bb*.3)|0})`);ctx.fillStyle=gr;
        const spd=Math.min(1.8,1+Math.abs(b.vy)/900);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);ctx.beginPath();ctx.ellipse(0,0,b.r/Math.sqrt(spd),b.r*spd,0,0,6.29);ctx.fill();ctx.restore();}}});
  LL.k=0;LL.px=Bd.x;await tween(300,k=>LL.k=r21ease.out(k));await tween(450,k=>{for(const v of LV)v.pool=r21ease.io(k);});
  for(const v of LV){sfx('fire');sfx('boom');shake(26);flash('255,140,40',.3,.12);rumble&&rumble(.6,10);for(let q=0;q<26;q++)part({x:v.x+rnd(-40,40),y:v.y-rnd(0,30),vx:rnd(-80,80),vy:-rnd(200,520),life:rnd(.5,.9),size:rnd(40,80),grow:40,rgb:pick(['255,150,50','255,100,30','255,210,110']),shape:'fire'});
    for(let q=0;q<140;q++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.3,.3)*(q<100?.7:1.6),spd=rnd(650,1300);BL.push({x:v.x+rnd(-26,26),y:v.y-8,vx:Math.cos(a)*spd*.6,vy:Math.sin(a)*spd,r:rnd(12,28),age:rnd(.2,.42),gy:v.y+rnd(-6,18)});},q*11);
    const t=xs.find(e=>cx(e)===v.x);if(t&&t.alive){t.hurt=.6;toss(t,110,560);}await wait(220);}
  await wait(900);
  // a penge kihúzódik a földből, visszarepül, és újra Groggá áll össze
  sfx('whoosh');await tween(420,k=>{const e=r21ease.io(k);Bd.x=mx+(ox-mx)*e;Bd.y=fy-60+(oy-fy+60)*e-Math.sin(k*Math.PI)*90;Bd.rot=Math.PI/2+.25-(Math.PI/2+.25)*e;});
  tween(700,k=>{for(const v of LV)v.pool=1-k;LL.k=1-k;}).then(()=>LL.on=false);
  for(let i=0;i<24;i++){const an=rnd(0,6.283);part({x:ox+Math.cos(an)*70,y:oy+Math.sin(an)*90,vx:-Math.cos(an)*120,vy:-Math.sin(an)*120,life:.4,size:rnd(16,28),grow:10,rgb:pick(['15,0,28','70,20,120']),add:false,shape:'dsmoke'});}
  await tween(380,k=>{Bd.a=1-k;Bd.s=1-.6*k;orc.alpha=a0*k;});Bd.on=false;orc.alpha=a0;
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await dimTo(0,null,200);};}

// ---- PÁROS: Tündérököl (ha06: „nőjön meg Grog kezén az aranyököl, ahogy kilő, fokozatosan nőjön, egyszerre suhanjon
// végig az ellenfeleken, nagy fény és csillámpor; festett, ne darabos”): Lili csillámport szór Grogra, Grog arannyal
// izzik, felemelt öklén (rácson mérve .245/.245) kicsi festett aranyököl gyúl ki; Grog előrelendül, az ököl kilő, és
// repülés közben folyamatosan nő (a végén akkora, mint az ellenfelek), egyszerre suhan át rajtuk – fénycsóva, csillámpor,
// a végén hatalmas aranyrobbanás a képernyő szélén
{R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{for(let i=0;i<60&&!(R17I.goldpunch||R17I.goldfist);i++)await wait(50);const FI=R17I.goldpunch||R17I.goldfist||R17I.goldburst,gb=R17I.goldburst,fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;await dimTo(.5,'40,30,0',260);
  const SW0={a:ENEMY_SPR['orc-cast'],b:ENEMY_SPR['orcG-cast']};if(ENEMY_SPR['orcnoaxe-cast'])ENEMY_SPR['orc-cast']=ENEMY_SPR['orcnoaxe-cast'];if(ENEMY_SPR['orcGnoaxe-cast'])ENEMY_SPR['orcG-cast']=ENEMY_SPR['orcGnoaxe-cast'];
  const rel=keepPose(orc,'cast'),oa0=orc.alpha==null?1:orc.alpha;try{const fist=()=>({x:cx(orc)+orc.w*orc.scale*.1,y:midY(orc)});
  // Lili csillámpora (rövid), Grog arannyal izzik
  // (ia01) Lili Grog fölé repül, és csillámport szór rá (ez maradt ki); Grog arannyal izzik és MEGNŐ (nem zsugorodik)
  const fx0=fairy.ox||0,fy0=fairy.oy||0,dxF=cx(orc)-cx(fairy),dyF=topY(orc)-40-midY(fairy),s0=orc._ts0=orc.scale;
  sfx('whoosh');await tween(420,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*e;fairy.oy=fy0+dyF*e-Math.sin(k*Math.PI)*50;});fairy.pose='cast';sfx('holy');
  orc._r16tint={rgb:'255,210,90',a:0};
  await tween(1000,k=>{const an=k*Math.PI*2;fairy.ox=fx0+dxF+Math.sin(an)*26;fairy.oy=fy0+dyF+Math.cos(an*2)*6;
    for(let n=0;n<5;n++)part({x:cx(fairy)+rnd(-22,22),y:midY(fairy)+14,vx:rnd(-50,50),vy:rnd(80,220),g:140,life:rnd(.8,1.2),size:rnd(2,6),rgb:pick(['255,230,120','255,255,255','255,200,90']),shape:'star'});
    orc._r16tint.a=.3*k;orc.scale=s0*(1+.22*easeIO(k));});
  await tween(320,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*(1-e);fairy.oy=fy0+dyF*(1-e);});fairy.ox=fx0;fairy.oy=fy0;fairy.pose='idle';
  const F={x:0,y:0,s:.25,a:0,on:true,fly:false,rot:-.15,tr:[]};
  R18E({update(){if(F.on&&F.a>0){const n=F.fly?6:2;for(let i=0;i<n;i++)part({x:F.x+rnd(-30,10)*F.s*2,y:F.y+rnd(-30,30)*F.s*2,vx:F.fly?rnd(-260,-60):rnd(-40,40),vy:rnd(-60,60),life:rnd(.4,.8),size:rnd(2,6),rgb:pick(['255,240,170','255,210,90','255,255,255']),shape:'star'});}
      if(F.fly){F.tr.push({x:F.x,y:F.y,s:F.s});if(F.tr.length>10)F.tr.shift();}return F.on;},
    draw(){if(F.a<=0||!FI)return;if(!F.fly){const q=fist();F.x=q.x;F.y=q.y;}const S2=Math.max(70,orc.h*orc.scale*.32)*F.s,w=S2*1.6,h=w*FI.height/FI.width;
      ctx.save();ctx.globalCompositeOperation='lighter';
      if(F.fly&&F.tr.length>1){const t0=F.tr[0];const g=ctx.createLinearGradient(t0.x,0,F.x,0);g.addColorStop(0,'rgba(255,210,90,0)');g.addColorStop(1,`rgba(255,235,160,${.55*F.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(t0.x,F.y-h*.15);ctx.lineTo(F.x,F.y-h*.45);ctx.lineTo(F.x,F.y+h*.45);ctx.lineTo(t0.x,F.y+h*.15);ctx.closePath();ctx.fill();}
      glow(F.x,F.y,w*.9,'255,210,90',.5*F.a);glow(F.x,F.y,w*.35,'255,250,220',.6*F.a);ctx.restore();
      ctx.save();ctx.globalAlpha=F.a;ctx.translate(F.x,F.y);ctx.rotate(R17I.goldpunch?0:F.rot);ctx.drawImage(FI,R17I.goldpunch?-w*.75:-w/2,-h/2,w,h);ctx.restore();}});
  // az ököl kigyúl a kezén, és nőni kezd
  // az ököl a kezén gyúl ki, és ott, láthatóan, fokozatosan megnő
  // (a felhasználó kérése) az áldás után Grog MAGA változik át az óriási aranyököllé: aranyfény-örvény, a teste elhalványul, a helyén az ököl
  // (ia ma07) fentről fénysugár csap le Grogra, utána fényrobbanás – és abból lesz az aranyököl
  {const bx=cx(orc),by=orc.y+orc.oy,top=-40,Bm={k:0,a:1,w:Math.max(90,orc.w*orc.scale*.9)};
   R18E({update(){return Bm.a>0;},draw(){if(Bm.k<=0)return;const yb=top+(by-top)*Bm.k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Bm.a;
     for(const [ww,al,c] of [[Bm.w*1.6,.25,'255,210,90'],[Bm.w,.55,'255,230,150'],[Bm.w*.35,.95,'255,252,230']]){const g=ctx.createLinearGradient(bx-ww/2,0,bx+ww/2,0);g.addColorStop(0,`rgba(${c},0)`);g.addColorStop(.5,`rgba(${c},${al})`);g.addColorStop(1,`rgba(${c},0)`);ctx.fillStyle=g;ctx.fillRect(bx-ww/2,top,ww,yb-top);}
     glow(bx,yb,Bm.w*.9,'255,240,180',.8*Bm.a);ctx.restore();}});
   sfx('holy');await tween(260,k=>{Bm.k=r21ease.in(k);});
   for(let n=0;n<40;n++)part({x:bx+rnd(-20,20),y:by-rnd(0,orc.h*orc.scale),vx:rnd(-30,30),vy:rnd(-160,-40),life:rnd(.5,1),size:rnd(2,5),rgb:pick(['255,240,170','255,255,255']),shape:'star'});
   await wait(260);
   // fényrobbanás Grogon
   sfx('boom');flash('255,245,200',.75,.22);shake(16);hitStop(80);
   if(gb){const B={k:0};R18E({update(dt){B.k+=dt/.8;return B.k<1;},draw(){r17Draw(gb,bx,midY(orc),Math.max(420,orc.h*orc.scale*2.6)*(.3+.7*eOutBack(Math.min(1,B.k*1.8))),{add:true,a:1-B.k*B.k});}});}
   sparks(bx,midY(orc),['255,240,180','255,210,90','255,255,255'],60,720);
   tween(380,k=>{Bm.a=1-k;});}
  sfx('limit');
  await tween(800,k=>{orc.alpha=oa0*(1-r21ease.io(k));F.a=r21ease.io(k);F.s=.7+.8*r21ease.out(k);if(Math.random()<.5)shake(3);
    for(let n=0;n<4;n++){const an=k*14+n*1.57,R=(1-k)*orc.h*orc.scale*.6+20;part({x:cx(orc)+Math.cos(an)*R,y:midY(orc)+Math.sin(an)*R*.8,vx:-Math.cos(an)*60,vy:-Math.sin(an)*60,life:.5,size:rnd(2,5),rgb:pick(['255,240,170','255,210,90','255,255,255']),shape:'star'});}});
  orc.alpha=0;await wait(150);
  // Grog előrelendül, az ököl kilő és repülés közben folyamatosan nő – egyszerre suhan át az összes ellenfélen
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=xs.reduce((s,t)=>s+midY(t),0)/xs.length,maxH=Math.max(...xs.map(t=>t.h*t.scale)),sEnd=Math.max(1.8,maxH*1.25/(Math.max(70,orc.h*orc.scale*.32)*1.6*FI.height/FI.width)),done=new Set();
  const o0=orc.ox||0;await tween(140,k=>{orc.ox=o0-14*k;orc.lean=-.08*k;});sfx('whoosh');sfx('boom');shake(10);
  const st=fist();F.fly=true;F.x=st.x;F.y=st.y;tween(160,k=>{orc.ox=o0-14+44*r21ease.out(k);orc.lean=-.08+.2*k;});
  await tween(1000,k=>{const e=r21ease.in(k*.6+.4*k*k);F.x=st.x+(W+200-st.x)*e;F.y=st.y+(gy-st.y)*Math.min(1,k*1.8);F.s=1.5+(Math.max(sEnd,2.2)-1.5)*r21ease.out(Math.min(1,k*1.4));F.rot=-.15*(1-k);
    for(const t of xs)if(!done.has(t)&&F.x>cx(t)-40){done.add(t);sfx('holy');sfx('hit');shake(14);hitStop(50);flash('255,240,180',.25,.08);lightPillar(cx(t),t.y+t.oy,170,1);
      sparks(cx(t),midY(t),['255,240,180','255,210,90','255,255,255'],44,700);toss(t,120,560);t.hurt=.6;hit(orc,t,sk);}});
  // hatalmas aranyrobbanás a képernyő szélén + csillámpor-eső
  sfx('boom');flash('255,240,180',.7,.25);shake(26);rumble&&rumble(1.2,10);
  if(gb){const B={k:0};R18E({update(dt){B.k+=dt/1.1;return B.k<1;},draw(){r17Draw(gb,W-120,gy,1100*(.3+.7*eOutBack(Math.min(1,B.k*1.6))),{add:true,a:1-B.k*B.k});}});}
  for(let i=0;i<120;i++)part({x:rnd(0,W),y:rnd(-20,120),vx:rnd(-30,30),vy:rnd(60,200),g:60,life:rnd(1,1.8),size:rnd(2,5),rgb:pick(['255,240,170','255,210,90','255,255,255']),shape:'star'});
  F.on=false;await tween(420,k=>{orc.alpha=oa0*k;orc.ox=o0+30*(1-k);orc.lean=.12*(1-k);orc._r16tint.a=.3*(1-k);orc.scale=s0*(1.22-.22*k);});orc.scale=s0;orc.ox=o0;orc.lean=0;orc._r16tint=null;
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await wait(400);await dimTo(0,null,260);}finally{rel();orc.alpha=oa0;if(orc._ts0){orc.scale=orc._ts0;orc._ts0=0;}ENEMY_SPR['orc-cast']=SW0.a;ENEMY_SPR['orcG-cast']=SW0.b;orc._r16tint=null;}};}

// ---- Kaelen tárgyhasználat (a felhasználó: „még a régi fajta – másold a többi hős megoldását”): saját festett ivó póz
// (druid-drink), így ugyanúgy a kezéből iszik, mint a többi hős (drinkFx)
if(typeof DRINK_K==='object')DRINK_K.druid=1;

// ---- Festett törmelék (ia04: „festett kép kell, ne rajzolt”): a rajzolt sokszög-kövek (shape:'rock') helyett festett
// kő- és földrögök (fx7-clods, 3×3 lap), a zöld rajzolt levélellipszisek helyett a festett levél (fx7-leaf) repül – az egész
// játékban. Saját, könnyű fizikával, a részecskék fölé rajzolva.
const R21DEB=[];let R21DEB_ON=false;
function r21DebTick(){if(R21DEB_ON)return;R21DEB_ON=true;let last=performance.now();
  R18E({update(){const now=performance.now(),dt=Math.min(.05,(now-last)/1000);last=now;for(let i=R21DEB.length-1;i>=0;i--){const p=R21DEB[i];p.life-=dt;if(p.life<=0){R21DEB.splice(i,1);continue;}
      p.vy+=(p.g||0)*dt;if(p.drag){const f=Math.max(0,1-p.drag*dt);p.vx*=f;p.vy*=f;}p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;}if(!R21DEB.length){R21DEB_ON=false;return false;}return true;},
    draw(){for(const p of R21DEB){const a=Math.max(0,Math.min(1,p.life/p.max*2.5));ctx.save();ctx.globalAlpha=a;ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      if(p.k==='clod'){const im=R17I.clods,cw=im.width/3,ch=im.height/3,s=p.size*2.6;ctx.drawImage(im,(p.f%3)*cw,Math.floor(p.f/3)*ch,cw,ch,-s/2,-s/2,s,s);}
      else{const im=R17I.leaf,s=p.size*3.2;ctx.drawImage(im,-s/2,-s/2*im.height/im.width,s,s*im.height/im.width);}ctx.restore();}}});}
{const p0=part;part=function(o){try{if(o&&!o.add){const isRock=o.shape==='rock'&&R17I.clods,isLeaf=o.shape==='leaf'&&R17I.leaf&&o.rgb&&(()=>{const c=String(o.rgb).split(',').map(Number);return c[1]>c[0]&&c[1]>=c[2];})();
      if(isRock||isLeaf){R21DEB.push({k:isRock?'clod':'leaf',x:o.x,y:o.y,vx:o.vx||0,vy:o.vy||0,g:o.g||0,drag:o.drag||0,life:o.life,max:o.life,size:o.size||5,rot:rnd(0,6.283),vr:rnd(-6,6),f:Math.floor(rnd(0,9))});r21DebTick();return;}}}catch(e){}
  return p0.apply(this,arguments);};}

// ---- Földbeszakadás nagy támadás után (a felhasználó: „gagyi, legyen élethűbb”): a rajzolt sötét folt és vonalak helyett
// festett kráter (fx7-crater) szakad be a láb alatt – a becsapódáskor kitágul, a föld megremeg, festett rögök és por
// csapódnak fel; az ellenség belesüllyed, majd kiemelkedik, a kráter lassan elhalványul
{const ok=()=>!!R17I.crater;
  const sk0=r21Sink;r21Sink=function(t){if(!ok())return sk0.apply(this,arguments);if(!t||t.kind!=='enemy')return;t._sk={t0:r21Now(),seed:Math.random()*1000,img:true};const x=cx(t),gy=t.y+t.oy,W2=Math.max(110,t.w*t.scale*1.1);
    shake(10);sfx('rock');
    for(let i=0;i<22;i++)part({x:x+rnd(-W2*.5,W2*.5),y:gy,vx:rnd(-260,260),vy:-rnd(160,460),g:950,life:rnd(.6,1),size:rnd(5,11),rgb:'110,85,55',add:false,shape:'rock'});
    for(let i=0;i<16;i++)part({x:x+rnd(-W2*.5,W2*.5),y:gy-rnd(0,8),vx:rnd(-220,220),vy:-rnd(30,120),life:rnd(.7,1.2),size:rnd(18,32),grow:30,rgb:pick(['150,125,95','125,105,80']),add:false,shape:'smoke'});};
  const cr0=r21Crater;r21Crater=function(e,s,a){if(!ok()||!s.img)return cr0.apply(this,arguments);const im=R17I.crater,tt=r21Now()-s.t0,k=Math.min(1,tt/.18),x=cx(e),gy=e.y+e.oy,W2=Math.max(150,e.w*e.scale*1.5)*(.6+.4*r21ease.out(k)),h=W2*im.height/im.width;
    ctx.save();ctx.globalAlpha=a;ctx.drawImage(im,x-W2/2,gy-h*.62,W2,h);ctx.restore();};}
