// ===== 48. kör: tesztlap (oa01, oa02, oa04, oa05) – újragondolt támadások, mind festett képekkel =====

// ---------- Grog – Fejsze-hajítás (oa01 3.) ----------
// „Magától legyen láva hatású, de át is alakulhat egy forgó, csillagszerű körré, és úgy csapjon le” (csatolt kép: pörgő,
// karos tűzkorong). Nincs földből feltörő lávaoszlop: Grog felemeli a fejszét, és az magától izzik át lávává (izzás,
// csöpögő láva, parázs). Elhajítja; pörgés közben a fejsze négykarú, forgó lávacsillaggá alakul (festett tűzcsóvák
// karokként, közepén az izzó fejsze), felszáll a célpont fölé, és onnan lecsap rá. Utána visszaalakul, és visszarepül.
A.axeThrow=async(u,ts,sk)=>{
  const t=ts&&ts[0];if(!t||!t.alive)return;let pose='attack';const st0={on:true};
  R18E({update(){if(st0.on)u.pose=pose;return st0.on;}});
  const AX=r21AxeImg(),MT=R17I.meteor,GB=r21Filt(R17I.goldburst,'hue-rotate(-28deg) saturate(1.5)'),Hs=u.h*u.scale,ah=Hs*1.0;
  const LAX=AX&&AX.width?r21Filt(AX,'sepia(1) saturate(6) hue-rotate(-18deg) brightness(1.25)'):null;
  const LD=r21Filt(R17I.brewsplash,'hue-rotate(112deg) saturate(2.2) brightness(1.2)');
  const ember=(x,y,vx,vy)=>r21PD(GB,x,y,{vx,vy,g:300,life:rnd(.35,.6),size:rnd(26,48),add:true,vr:rnd(-6,6)});
  const lavaDrop=(x,y,vx,vy,sz)=>r21PD(LD,x,y,{vx,vy,g:900,life:rnd(.5,.9),size:sz||rnd(20,36),vr:rnd(-6,6)});
  try{
  await dimTo(.35,'40,14,4',220);
  // 1) Grog felemeli a fejszét, ami magától izzik át lávává
  sfx('roar');const glowA={a:0,done:false};
  R18E({update(){return glowA.a>0||!glowA.done;},draw(){if(glowA.a<=0)return;const p=KP(u,.55,.13);ctx.save();ctx.globalCompositeOperation='lighter';
    glow(p.x,p.y,ah*(.55+.15*Math.sin(T*18)),'255,110,20',.7*glowA.a);glow(p.x,p.y,ah*.25,'255,220,140',.6*glowA.a);ctx.restore();}});
  bodyWind(u,420,.2);sfx('fire');
  await tween(700,k=>{glowA.a=k;const p=KP(u,.55,.13);if(Math.random()<.55)lavaDrop(p.x+rnd(-ah*.2,ah*.2),p.y+rnd(-10,ah*.2),rnd(-60,60),rnd(-40,40),rnd(16,28));
    if(Math.random()<.4)ember(p.x+rnd(-ah*.25,ah*.25),p.y+rnd(-ah*.2,ah*.1),rnd(-50,50),-rnd(60,180));if(Math.random()<.25)shake(3);});
  // 2) elhajítja: a kép fejsze nélküli, a fejsze pörögve száll, és forgó lávacsillaggá alakul
  hitStop(80);flash('255,170,70',.25,.1);glowA.a=0;glowA.done=true;r21NoAxe(true);pose='cast';sfx('whoosh');sfx('fire');bodyStrike(u,170,-.28);shake(10);
  const h0=KP(u,.3,.17),hx=cx(t),hy=Math.max(90,Math.min(topY(t)-90,midY(t)-170)),A1={x:h0.x,y:h0.y,r:0,m:0,s:1,on:true,spin:14};
  const drawStar=(x,y,R,rot,a)=>{if(!MT)return;const th=Math.atan2(MT.height*.62,MT.width*.9),L=R*1.15,h=L*MT.height/MT.width;
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;glow(x,y,R*1.1,'255,90,10',.6);
    for(let j=0;j<2;j++)for(let i=0;i<4;i++){const an=rot+i*Math.PI/2+j*.45,rr=R*(j?.32:.58);ctx.save();ctx.translate(x+Math.cos(an)*rr,y+Math.sin(an)*rr);
      ctx.rotate(an+Math.PI/2-th);ctx.globalAlpha=a*(j?.7:1);ctx.drawImage(MT,-L*.92,-h*.82,L*(j?.75:1),h*(j?.75:1));ctx.restore();}
    if(GB)r17Draw(GB,x,y,R*1.3,{a:a*.9,rot:-rot,add:true});ctx.restore();};
  R18E({update(dt){A1.r+=dt*A1.spin;if(A1.on){if(Math.random()<.5)lavaDrop(A1.x+rnd(-ah*.3,ah*.3),A1.y+rnd(-ah*.3,ah*.3),rnd(-90,90),rnd(-30,90));if(Math.random()<.5)ember(A1.x+rnd(-ah*.3,ah*.3),A1.y+rnd(-ah*.3,ah*.3),rnd(-80,80),rnd(-80,40));}return A1.on;},
    draw(){const R=ah*.36*A1.s;
      if(A1.m>0)drawStar(A1.x,A1.y,R*(.5+.5*A1.m),A1.r,A1.m);
      if(LAX){const w=ah*.9*(1+.2*(A1.s-1))*(1-.45*A1.m),h2=w*AX.height/AX.width;ctx.save();ctx.translate(A1.x,A1.y);ctx.rotate(A1.r);ctx.globalAlpha=1-.25*A1.m;ctx.drawImage(LAX,-w/2,-h2*.62,w,h2);
        ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5;ctx.drawImage(LAX,-w/2,-h2*.62,w,h2);ctx.restore();}}});
  // repülés felfelé ívben a célpont fölé, közben átalakul
  const d=Math.hypot(hx-h0.x,hy-h0.y);let wh=0;
  await tween(Math.max(520,d*.85),k=>{const e=easeIO(k);A1.x=h0.x+(hx-h0.x)*e;A1.y=h0.y+(hy-h0.y)*e-Math.sin(k*Math.PI)*80;A1.m=Math.min(1,k*1.6);A1.spin=14+22*k;A1.s=1+.5*k;if(k-wh>.18){wh=k;sfx('whoosh');}});
  // fönt egy pillanatra felpörög és megnő (felhúzás)
  sfx('fire');popLabel(t,'LÁVACSILLAG!','#ffb060');
  await tween(320,k=>{A1.s=1.5+.3*easeIO(k);A1.spin=36+14*k;A1.y=hy-26*Math.sin(k*Math.PI*.5);if(Math.random()<.4)shake(4);});
  // 3) LECSAP a célpontra
  const sy=A1.y,ty=midY(t);sfx('whoosh');
  await tween(150,k=>{const e=k*k;A1.y=sy+(ty-sy)*e;});
  hitStop(170);shake(30);flash('255,170,70',.45,.15);sfx('slash');sfx('boom');sfx('fire');
  {const bs={t:0};R18E({update(dt){bs.t+=dt;return bs.t<.75;},draw(){if(!GB)return;const k=Math.min(1,bs.t/.18),a=bs.t<.3?1:1-(bs.t-.3)/.45;ctx.save();ctx.globalCompositeOperation='lighter';
      r17Draw(GB,hx,ty,(t.h*t.scale*2.6+180)*(.4+.6*k),{a:Math.max(0,a)});r17Draw(GB,hx,ty,(t.h*t.scale*1.5+90)*(.6+.4*k),{rot:.6,a:Math.max(0,a)*.8});ctx.restore();}});}
  if(MT)for(let i=0;i<10;i++){const an=i/10*6.283+rnd(-.2,.2),sp=rnd(400,660);r21PD(MT,hx,ty,{vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,life:.45,size:rnd(150,230),rot:an+Math.PI,vr:0,add:true,drag:2});}
  for(let i=0;i<14;i++)ember(hx,ty,rnd(-420,420),rnd(-460,120));for(let i=0;i<14;i++)lavaDrop(hx,t.y+t.oy-rnd(0,40),rnd(-380,380),-rnd(120,520),rnd(24,44));
  t.hurt=.8;{const o0=t.oy||0;tween(300,k=>{t.oy=o0+18*Math.sin(Math.min(1,k*1.4)*Math.PI);t.spin=.12*Math.sin(k*Math.PI);}).then(()=>{t.oy=o0;t.spin=0;});}
  if(t.alive)r21HitNS(u,t,sk);
  // a csillag a célponton még pörög egy kicsit, aztán visszaalakul fejszévé
  await tween(380,k=>{A1.y=ty-20*k;A1.spin=40-20*k;A1.m=1-easeIO(k);A1.s=1.8-.8*k;});
  // 4) visszarepül Grog kezébe
  const h1=KP(u,.6,.14),bx=A1.x,by=A1.y;sfx('whoosh');
  await tween(Math.max(420,d*.65),k=>{const e=easeIO(k);A1.x=bx+(h1.x-bx)*e;A1.y=by+(h1.y-by)*e-Math.sin(k*Math.PI)*120;A1.spin=26;});
  A1.on=false;r21NoAxe(false);pose='attack';sfx('block');shake(10);hitStop(60);
  {const p=KP(u,.6,.14);for(let i=0;i<10;i++)ember(p.x,p.y,rnd(-260,260),rnd(-300,60));}
  await bodySettle(u,240);await dimTo(0,null,220);
  }finally{r21NoAxe(false);st0.on=false;u.pose='idle';}
};

// ---------- Morgána – Üst-kitörés (oa02 4.: „mű és erőltetett, nézd át a kommenteket és szabályokat”) ----------
// Valódi tárgy, valódi fizika, Morgána saját teste mozog (A3, A4, A7): lila füstben megjelenik a boszorkányüst, és
// súlyosan a földre huppan Morgána elé; hevesen forr. Morgána nekilendül (hátrahúzódik, előrevágódik) és belerúg:
// az üst a súlyától gyorsulva az ellenfelek felé dől, az oldalára zuhan, visszapattan. A nyílásából vastag sugárban
// ömlik ki a lila főzet, ami FOLYADÉKKÉNT terül szét és folyik végig a talajon (festett csobbanás-darabok, nem egy
// csúszó hullám-kép) az ellenfelekig; ott felcsap rájuk, mérgező lila buborékok és gőz gomolyog. A tócsa elpárolog.
A.cauldronBurst=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const CI=R17I.cauldron,SP=R17I.brewsplash,STM=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.7) brightness(.8)'),BUB=r21Filt(R17I.froth,'hue-rotate(205deg) saturate(1.6) brightness(.85)');
  if(!CI)return;
  const Hs=u.h*u.scale,ch=Hs*.82,cw=ch*CI.width/CI.height,gx=cx(u)+u.w*u.scale*.45+cw*.55,gy=u.y+u.oy+4;
  const C={a:1,y:-ch*2.2,rot:0,jolt:0,sq:1,vis:false};
  const PIV={x:gx+cw*.42,y:gy};   // az üst jobb alsó sarka: erre borul
  const mouth=()=>{const lx=-cw*.42,ly=-ch*.88,c=Math.cos(C.rot),s=Math.sin(C.rot);return {x:PIV.x+c*lx-s*ly,y:PIV.y+C.y*0+s*lx+c*ly};};
  const drop=(x,y,vx,vy,sz)=>r21PD(SP,x,y,{vx,vy,g:950,life:rnd(.55,.9),size:sz||rnd(26,50),vr:rnd(-8,8)});
  const steam=(x,y,sz)=>r21PD(STM,x,y,{vx:rnd(-30,30),vy:-rnd(40,110),life:rnd(.9,1.4),size:sz||rnd(90,150),grow:60,vr:rnd(-.5,.5),a:.7});
  R18E({update(){return C.a>0;},draw(){if(!C.vis)return;ctx.save();ctx.globalAlpha=C.a;
    // árnyék a talajon
    ctx.save();ctx.translate(gx,gy+2);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,0,0,0,cw*.6);g.addColorStop(0,`rgba(0,0,0,${.55*Math.max(0,1+C.y/(ch*2.2))})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,cw*.6,0,6.29);ctx.fill();ctx.restore();
    ctx.translate(PIV.x,PIV.y+C.y+C.jolt);ctx.rotate(C.rot);ctx.scale(1/C.sq,C.sq);ctx.drawImage(CI,-cw*.92,-ch,cw,ch);ctx.restore();}});
  // a talajon folyó főzet: lapos, festett csobbanás-darabok, amelyek csúsznak, lassulnak, szétterülnek
  const FL=[],FO={on:true};
  R18E({update(dt){for(const b of FL){b.x+=b.vx*dt;b.vx*=Math.max(0,1-b.fr*dt);b.w=Math.min(b.wm,b.w+b.gw*dt);b.r+=b.vr*dt;if(b.fade)b.a=Math.max(0,b.a-dt*.9);}return FO.on||FL.some(b=>b.a>0);},
    draw(){if(!SP)return;for(const b of FL){if(b.a<=0)continue;const w=b.w,h=w*SP.height/SP.width*.3;ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.scale(b.fl?-1:1,1);ctx.rotate(b.r);ctx.drawImage(SP,-w/2,-h/2,w,h);ctx.restore();}}});
  await dimTo(.45,'14,6,20',260);
  // 1) lila füst, az üst a levegőből súlyosan a földre huppan
  sfx('dark');for(let i=0;i<5;i++)steam(gx+rnd(-cw*.5,cw*.5),gy-ch*rnd(.2,1),rnd(110,160));
  await wait(160);C.vis=true;
  await tween(300,k=>{C.y=-ch*2.2*(1-k*k);});C.y=0;
  sfx('rock');sfx('earthm');shake(14);hitStop(60);
  {const DU=R17I.teacloud;for(let i=0;i<5;i++)r21PD(DU,gx+rnd(-cw*.5,cw*.5),gy-rnd(0,14),{vx:(Math.random()<.5?-1:1)*rnd(80,200),vy:-rnd(10,50),life:1,size:rnd(90,140),grow:60,vr:rnd(-.4,.4),a:.7});}
  await tween(220,k=>{C.sq=1-.1*Math.sin(k*Math.PI);});C.sq=1;
  // 2) hevesen forr: rázkódik, kifröccsen, lila gőz
  sfx('squish');sfx('poison');let lt=0;
  await tween(650,k=>{C.jolt=Math.sin(k*55)*2.2*(.4+k);if(k-lt>.07){lt=k;const m=mouth();drop(m.x+rnd(-cw*.25,cw*.25),m.y,rnd(-70,70),-rnd(220,380),rnd(20,36));if(Math.random()<.5)steam(m.x+rnd(-cw*.2,cw*.2),m.y-10);}});C.jolt=0;
  // 3) Morgána nekilendül és belerúg (saját teste: hátrahúzódik, előrevágódik)
  const o0=u.ox||0;sfx('whoosh');
  await tween(220,k=>{const e=easeIO(k);u.ox=o0-26*e;u.lean=.1*e;});
  await tween(110,k=>{const e=k*k;u.ox=o0-26+56*e;u.lean=.1-.24*e;});
  sfx('punch');sfx('block');shake(12);hitStop(80);
  tween(260,k=>{const e=easeIO(k);u.ox=o0+30*(1-e);u.lean=-.14*(1-e);}).then(()=>{u.ox=o0;u.lean=0;});
  // az üst a súlyától gyorsulva eldől az ellenfelek felé, az oldalára zuhan és visszapattan
  await tween(380,k=>{C.rot=1.62*k*k;});
  sfx('rock');sfx('splash');shake(18);hitStop(70);
  await tween(200,k=>{C.rot=1.62-.14*Math.sin(k*Math.PI);});C.rot=1.62;
  // 4) a főzet kiömlik és végigfolyik a talajon
  const minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5)),gEn=Math.max(...al.map(t=>t.y+t.oy))+4;
  popLabel(al[0],'ÜST-KITÖRÉS!','#c890ff');sfx('water');
  const hitd=new Set();let front=mouth().x,lp=0;const x0=front,xEnd=maxX+90,ms=Math.max(900,(xEnd-x0)*1.05);
  await tween(ms,k=>{const m=mouth();
    // vastag sugár a nyílásból
    if(Math.random()<.85)drop(m.x+rnd(-8,8),m.y+rnd(-ch*.12,ch*.12),rnd(180,420),-rnd(0,140),rnd(34,60));
    front=x0+(xEnd-x0)*(1-Math.pow(1-k,1.6));const gyF=gy+(gEn-gy)*Math.max(0,Math.min(1,(front-x0)/Math.max(1,minX-x0)));
    if(k-lp>.035){lp=k;FL.push({x:front-rnd(10,50),y:gyF+rnd(-4,6),vx:rnd(140,320),fr:2.6,w:rnd(90,140),wm:rnd(200,300),gw:rnd(200,320),r:rnd(-.08,.08),vr:0,a:.95,fl:Math.random()<.5});
      FL.push({x:m.x+rnd(0,40),y:gy+rnd(-2,6),vx:rnd(60,200),fr:2,w:rnd(80,120),wm:rnd(160,240),gw:200,r:0,vr:0,a:.9,fl:Math.random()<.5});
      if(Math.random()<.5)drop(front,gyF-6,rnd(40,220),-rnd(120,300),rnd(22,38));if(BUB&&Math.random()<.4)r21PD(BUB,front-rnd(0,80),gyF-rnd(4,14),{vx:rnd(-20,20),vy:-rnd(5,25),life:rnd(.6,1),size:rnd(30,55),vr:0,a:.9});}
    if(Math.random()<.25)shake(4);
    for(const t of al)if(!hitd.has(t)&&front>=cx(t)-t.w*t.scale*.3){hitd.add(t);const tx=cx(t),st={t:0};sfx('splash');shake(12);hitStop(50);
      R18E({update(dt){st.t+=dt;return st.t<.85;},draw(){if(!SP)return;const k2=Math.min(1,st.t/.16),a=st.t<.35?1:1-(st.t-.35)/.5;
        r17Draw(SP,tx,t.y+t.oy+12,(t.h*t.scale*1.9+100)*(.45+.55*k2),{rot:-Math.PI/2,a:Math.max(0,a),anchor:'bottom'});}});
      for(let n=0;n<10;n++)drop(tx+rnd(-20,20),midY(t),rnd(-300,300),-rnd(220,540));steam(tx,midY(t),170);steam(tx,topY(t),140);
      if(BUB)for(let n=0;n<6;n++)r21PD(BUB,tx+rnd(-t.w*t.scale*.5,t.w*t.scale*.5),t.y+t.oy-rnd(0,t.h*t.scale*.5),{vx:rnd(-30,30),vy:-rnd(20,60),life:rnd(.8,1.3),size:rnd(36,70),vr:0,a:.9});
      FL.push({x:tx,y:t.y+t.oy+4,vx:0,fr:0,w:t.w*t.scale,wm:t.w*t.scale*2.2+80,gw:500,r:0,vr:0,a:.95,fl:false});
      t.hurt=.6;toss(t,34,320);if(t.alive)r21HitNS(u,t,sk);}});
  for(const t of al)if(!hitd.has(t)&&t.alive)r21HitNS(u,t,sk);
  // 5) mérgező gőz száll fel a tócsából, a tócsa elpárolog, az üst lila füstben eltűnik
  sfx('steam');for(const b of FL)if(Math.random()<.35)steam(b.x,b.y-10,rnd(80,130));
  await wait(450);for(const b of FL)b.fade=true;
  for(let i=0;i<4;i++)steam(gx+rnd(-cw*.5,cw*.5),gy-ch*rnd(.1,.6),rnd(110,160));
  await tween(420,k=>{C.a=1-k;});FO.on=false;
  await wait(300);await dimTo(0,null,240);
  }finally{rel();}
};

// ---------- Morgána – Telihold átka (oa04 3.: „nem mozog a farkas normálisan, darabos, élethűbb, látványosabb”) ----------
// A farkasember teste folyamatosan, rugalmasan mozog: lélegzik, a lépéseknél/ugrásnál összenyomódik és megnyúlik,
// a dőlése mindig simán követi a mozdulatot (nincs ugrásszerű váltás, nincs hirtelen tükrözés). Látványosabb: a holdfény
// festett oszlopként izzásként és hulló festett ezüstszikrákként esik a társra, a holdfényben nő ki a farkasember, a holdra vonyít.
// Támadás: guggolás → hosszú ugrás → érkezés csúszva → két karmolás felhúzással → harmadik: felugrik és lecsap, nagy
// keresztbe vágás; aztán hátraugrik (szemben marad), és a holdfényben visszaváltozik. Kevés, nagy füst-darab (telefonon is sima).
A.eclipseMoon=async(u,ts,sk)=>{
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'cast');
  const pals=S.heroes.filter(h=>h.alive&&h!==u),ally=pals.length?pick(pals):u;const a0=ally.alpha==null?1:ally.alpha;
  try{
  const MO=R17I.fullmoon,CL=r21Filt(R17I.teacloud,'grayscale(.7) brightness(.35) hue-rotate(200deg)'),WF=R17I['werewolf_'+ally.type]||R17I.werewolf,
    SL=r21Filt(R17I.darkslash,'hue-rotate(110deg) saturate(1.6) brightness(1.15)'),SM=r21Filt(R17I.teacloud,'grayscale(1) brightness(.25)'),
    SPK=r21Filt(R17I.goldburst,'grayscale(1) brightness(1.4)'),BEAM=1;
  const mx=W*.5,my=110,MR=Math.min(170,W*.14);
  const M={a:0,s:.85,y:my+30,pulse:0},CLS=[];for(let i=0;i<5;i++)CLS.push({x:mx+(i-2)*MR*.55,y:my+rnd(-30,40),s:MR*rnd(1.3,1.9),dx:(i<2?-1:i>2?1:(Math.random()<.5?-1:1))*rnd(.9,1.4),a:0});
  const SKY={on:true};
  R18E({update(){return SKY.on;},draw(){if(MO&&M.a>0){ctx.save();ctx.globalAlpha=M.a;ctx.globalCompositeOperation='lighter';glow(mx,M.y,MR*(1.9+.5*M.pulse),'190,215,255',(.35+.3*M.pulse)*M.a);ctx.restore();r17Draw(MO,mx,M.y,MR*2*M.s,{a:M.a});}
    for(const c of CLS){if(c.a<=0||!CL)continue;r17Draw(CL,c.x,c.y,c.s,{a:c.a});}}});
  // holdfény-oszlop a társon
  const BM={a:0,x:cx(ally),gy:ally.y+ally.oy};
  R18E({update(){return SKY.on;},draw(){if(!BEAM||BM.a<=0)return;const h=BM.gy-20,w=Math.max(260,h*BEAM.width/BEAM.height*1.6);ctx.save();ctx.globalCompositeOperation='lighter';
    // (A5: égi villám nem kell) lágy holdfény-izzás a társon, festett ezüstszikrák hullanak rá
    glow(BM.x,BM.gy-ally.h*ally.scale*.55,ally.h*ally.scale*1.1,'200,220,255',.55*BM.a);ctx.restore();
    if(SPK&&BM.a>.3&&Math.random()<.22)r21PD(SPK,BM.x+rnd(-ally.w*ally.scale*.7,ally.w*ally.scale*.7),BM.gy-ally.h*ally.scale*rnd(1,1.6),{vx:rnd(-15,15),vy:rnd(60,140),life:rnd(.6,1),size:rnd(12,22),add:true,vr:rnd(-3,3),a:.7});}});
  // 1) éjszaka: sötétség, felhők a hold előtt
  sfx('dark');dimTo(.82,'6,8,24',500);
  await tween(500,k=>{for(const c of CLS)c.a=k*.95;M.a=k*.35;});
  // 2) Morgána int, a felhők szétúsznak, a telihold kiragyog
  sfx('wind');{const h=handPos(u);for(let i=0;i<3;i++)r21PD(SM,h.x,h.y,{vx:rnd(-60,60),vy:-rnd(40,100),life:.8,size:rnd(50,80),grow:40,a:.6});}
  await tween(800,k=>{const e=easeIO(k);for(const c of CLS){c.x+=c.dx*6*(.3+k);c.a=.95*(1-e*.85);}M.a=.35+.65*e;M.s=.85+.15*e;M.y=my+30-30*e;});
  flash('200,220,255',.3,.2);sfx('holy');popLabel(ally,'TELIHOLD ÁTKA!','#cfe0ff');
  // 3) holdfény zuhan a társra, aki átváltozik: a holdfényben nő ki a farkasember
  const P={x:cx(ally),y:ally.y+ally.oy,h:ally.h*ally.scale*1.45,a:0,g:.7,lean:0,sx:1,sy:1,tl:0,tsx:1,tsy:1,breath:1,on:true};
  // simítás: a test mindig rugalmasan követi a célértéket (nincs ugrásszerű váltás)
  R18E({update(dt){const f=Math.min(1,dt*16);P.lean+=(P.tl-P.lean)*f;P.sx+=(P.tsx-P.sx)*f;P.sy+=(P.tsy-P.sy)*f;return P.on;},
    draw(){if(!WF||P.a<=0)return;const br=1+.025*Math.sin(T*6.5)*P.breath,hh=P.h*P.g*P.sy*br,w=P.h*P.g*P.sx*WF.width/WF.height;ctx.save();ctx.globalAlpha=P.a;ctx.translate(P.x,P.y);
      ctx.save();ctx.scale(1,.24);const g=ctx.createRadialGradient(0,0,0,0,0,w*.5);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,w*.5,0,6.29);ctx.fill();ctx.restore();
      ctx.rotate(P.lean);ctx.drawImage(WF,-w*.45,-hh,w,hh);ctx.restore();}});
  sfx('holy');await tween(380,k=>{BM.a=easeIO(k);});
  sfx('growl');let ls=0;
  await tween(650,k=>{ally.ox=Math.sin(k*70)*4*k;ally.sq=1+.05*Math.sin(k*30)*k;if(k-ls>.16){ls=k;r21PD(SM,cx(ally)+rnd(-40,40),ally.y+ally.oy-rnd(20,ally.h*ally.scale*.8),{vx:rnd(-50,50),vy:-rnd(30,90),life:rnd(.8,1.1),size:rnd(110,150),grow:60,vr:rnd(-.5,.5),a:.8});}});
  ally.ox=0;ally.sq=1;shake(14);flash('200,220,255',.3,.12);
  for(let i=0;i<4;i++)r21PD(SM,P.x+rnd(-50,50),P.y-rnd(20,P.h*.7),{vx:rnd(-160,160),vy:-rnd(40,140),life:rnd(.9,1.2),size:rnd(140,190),grow:70,vr:rnd(-.5,.5),a:.85});
  P.tsy=.8;P.tsx=1.1;
  await tween(380,k=>{const e=eOutBack(k);ally.alpha=a0*(1-Math.min(1,k*1.6));P.a=Math.min(1,k*2);P.g=.7+.3*e;});P.tsy=1;P.tsx=1;
  // vonyítás a holdra: hátradől, kidülleszti a mellkasát, a hold felragyog
  sfx('roar');sfx('wail');shake(18);P.tl=-.2;P.tsy=1.08;P.tsx=.95;
  await tween(520,k=>{M.pulse=Math.sin(k*Math.PI);BM.a=1-.4*k;});P.tl=0;P.tsy=1;P.tsx=1;M.pulse=0;
  // 4) guggolás (felhúzás) → hosszú ugrás → érkezés csúszva
  P.tsy=.8;P.tsx=1.12;P.tl=.08;await wait(200);
  const x0=P.x,y0=P.y,tx=cx(t)-t.w*t.scale*.55,ty=t.y+t.oy;sfx('whoosh');P.tsy=1.12;P.tsx=.92;P.tl=.32;P.breath=0;
  await tween(460,k=>{const e=easeIO(k);P.x=x0+(tx-20-x0)*e;P.y=y0+(ty-y0)*e-Math.sin(k*Math.PI)*190;if(k>.6)P.tl=.32-.4*(k-.6);});
  P.tsy=.8;P.tsx=1.14;P.tl=.12;shake(12);sfx('dust');
  {const DU=R17I.teacloud;for(let i=0;i<3;i++)r21PD(DU,P.x+rnd(-30,30),P.y-rnd(0,10),{vx:rnd(-160,40),vy:-rnd(10,40),life:.8,size:rnd(80,120),grow:50,a:.6});}
  await tween(150,k=>{P.x=tx-20+20*easeIO(k);});P.tsy=1;P.tsx=1;
  // 5) karmolások: két gyors (felhúzással), a harmadik felugrós lecsapás
  const slash=(rot,mir,big)=>{const sx=cx(t),sy=midY(t),sz=Math.max(320,t.h*t.scale*2)*(big?1.45:1),C={k:0,a:1};
    if(SL)R18E({update(){return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.translate(sx,sy);ctx.rotate(rot);if(mir)ctx.scale(-1,1);const w2=sz,h2=w2*SL.height/SL.width;
      ctx.beginPath();ctx.rect(-w2/2,-h2,w2*C.k,h2*2);ctx.clip();ctx.globalAlpha=C.a;for(const o of [-.13,0,.13])ctx.drawImage(SL,-w2/2,-h2/2+h2*o,w2,h2);ctx.restore();}});
    tween(80,k=>{C.k=k;}).then(()=>tween(340,k=>{C.a=1-k;}));};
  const knock=(px,ms)=>{const o0=t.ox||0;tween(ms,k=>{t.ox=o0+px*Math.sin(k*Math.PI);}).then(()=>{t.ox=o0;});};
  for(let i=0;i<2;i++){
    P.tl=-.16;P.tsy=1.04;await tween(130,k=>{P.x=tx-26*easeIO(k);});
    sfx('slash');sfx('bite');P.tl=.3;P.tsx=1.08;P.tsy=.94;
    await tween(85,k=>{P.x=tx-26+60*k*k;});
    slash(i?.85:-.95,i===1,false);hitStop(70);shake(14);t.hurt=.5;knock(24,170);
    await wait(150);P.tsx=1;P.tsy=1;}
  // a harmadik: felugrik és teljes súllyal lecsap
  P.tl=-.25;P.tsy=.82;P.tsx=1.1;await wait(150);
  sfx('roar');P.tsy=1.1;P.tsx=.94;const bx=P.x,by=P.y;
  await tween(240,k=>{const e=easeIO(k);P.y=by-120*e;P.x=bx-10*e;P.tl=-.25+.1*k;});
  sfx('whoosh');P.tl=.45;
  await tween(110,k=>{const e=k*k;P.y=by-120+120*e;P.x=bx-10+50*e;});
  slash(-.6,false,true);slash(.65,true,true);sfx('slash');sfx('crunch');hitStop(140);shake(26);flash('255,90,90',.3,.12);
  P.tsy=.8;P.tsx=1.15;t.hurt=.8;knock(60,300);if(t.alive)r21HitNS(u,t,sk);
  {const DU=R17I.teacloud;for(let i=0;i<4;i++)r21PD(DU,cx(t)+rnd(-60,40),t.y+t.oy-rnd(0,10),{vx:rnd(-160,160),vy:-rnd(10,50),life:.9,size:rnd(90,140),grow:50,a:.6});}
  await wait(300);P.tsy=1;P.tsx=1;P.tl=0;
  // 6) hátraugrik a helyére (szemben marad), és a holdfényben visszaváltozik
  const rx=P.x,ry=P.y;P.tsy=.85;await wait(120);sfx('whoosh');P.tsy=1.08;P.tl=-.2;
  await tween(460,k=>{const e=easeIO(k);P.x=rx+(x0-rx)*e;P.y=ry+(y0-ry)*e-Math.sin(k*Math.PI)*150;});
  P.tsy=.86;P.tl=0;shake(8);sfx('dust');await wait(140);P.tsy=1;P.breath=1;
  sfx('holy');await tween(300,k=>{BM.a=Math.max(BM.a,easeIO(k));});
  for(let i=0;i<3;i++)r21PD(SM,P.x+rnd(-40,40),P.y-rnd(20,P.h*.7),{vx:rnd(-120,120),vy:-rnd(40,120),life:1,size:rnd(130,170),grow:60,a:.8});
  sfx('dark');await tween(380,k=>{P.a=1-k;P.g=1-.3*k;ally.alpha=a0*k;});P.on=false;
  await tween(500,k=>{M.a=1-k;BM.a=1-k;for(const c of CLS)c.a=0;});SKY.on=false;
  await dimTo(0,null,300);
  }finally{ally.alpha=a0;ally.ox=0;ally.sq=1;rel();}
};

// ---------- Jázmin – Bambuszfüggöny (oa05 3.: „nincs funkciója; gagyi, látványosabb, élethűbb”) ----------
// Funkció: FOGSÁG. Jázmin sortüzekben lövi ki a festett bambusznyilakat; átfúrják az ellenfeleket, és körülöttük a
// földbe fúródnak. A becsapódott nyilakból festett bambuszszárak (fx7-bamboostake) nőnek ki levelekkel, és sűrű
// bambuszfüggönyként zárják körbe az ellenfeleket: összeszorul, sebez, és 60% eséllyel 1 körre foglyul ejti őket
// (nem tudnak támadni). Más, mint a Bambuszliget/Bambuszfal: nem fal tör fel, hanem a kilőtt nyilak gyökereznek meg.
SK.bamboocurtain.status=['stun',.6,1];
SK.bamboocurtain.desc='Jázmin sortüzekben kilövi a bambusznyilakat: átfúrják az ellenségeket, a földbe fúródnak, és bambuszfüggönnyé nőnek körülöttük. 60% eséllyel 1 körre foglyul ejti őket.';
A.bambooCurtain=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'attack');
  try{
  const BS=R17I.bamboospear,ST=R17I.bamboostake,LF=R17I.leaf,CLD=R17I.clods||R17I.pebble,DU=r21Filt(R17I.teacloud,'saturate(.45) brightness(.85)');
  await dimTo(.4,'10,24,6',200);
  await chargeBow(u,420,'150,220,90');u.pose='attack';
  const b=bowPos(u),len=Math.max(300,u.h*u.scale*1.2);
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:260,life:rnd(.7,1.2),size:rnd(18,30),vr:rnd(-7,7),drag:1});
  // a függöny cölöphelyei minden ellenfél körül (elöl-hátul, váltakozva)
  const posts=[];for(const t of al){const tw=t.w*t.scale,gy=t.y+t.oy+4;for(const f of [-.85,-.5,-.15,.2,.55,.9])posts.push({t,x:cx(t)+tw*f,gy,g:0,stuck:null});}
  posts.sort(()=>Math.random()-.5);
  // beállt nyilak és a belőlük kinövő bambuszszárak
  const SKE={on:true},stuck=[];
  R18E({update(dt){for(const q of stuck)q.w*=Math.max(0,1-dt*6);return SKE.on;},draw(){for(const q of stuck){ctx.save();ctx.globalAlpha=q.a;ctx.beginPath();ctx.rect(-50,-400,W+100,q.gy+400);ctx.clip();
      if(BS&&q.arrow>0){ctx.save();ctx.globalAlpha*=q.arrow;ctx.translate(q.x,q.gy+8);ctx.rotate(q.r+Math.sin(T*40)*q.w);const h=len*BS.height/BS.width;ctx.drawImage(BS,-len*.82,-h/2,len,h);ctx.restore();}
      if(ST&&q.g>0){const hh=q.H*q.g,w=hh*ST.width/ST.height*1.25;ctx.save();ctx.translate(q.x,q.gy+6+q.sink);ctx.rotate(q.tilt*(1-q.squeeze));ctx.drawImage(ST,-w/2,-hh,w,hh);ctx.restore();}
      ctx.restore();}}});
  const arrow=(P)=>new Promise(res=>{const t=P.t,x0=b.x+10,y0=b.y,x1=P.x,y1=P.gy,mxp=(x0+x1)/2,myp=Math.min(y0,midY(t))-rnd(30,90),st={t:0,hit:false},ms=rnd(380,460);
    const pos=k=>[(1-k)*(1-k)*x0+2*(1-k)*k*mxp+k*k*x1,(1-k)*(1-k)*y0+2*(1-k)*k*myp+k*k*y1];
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),[x,y]=pos(k);
        if(!st.hit&&Math.abs(x-cx(t))<t.w*t.scale*.35&&y>topY(t)&&y<t.y+t.oy){st.hit=true;t.hurt=.35;sfx('hit');for(let n=0;n<3;n++)leaf(x,y,rnd(60,260),rnd(-200,40));}
        if(k>=1){const [px,py]=pos(.97);const q={x:x1,gy:y1,r:Math.atan2(y1-py,x1-px),w:.12,a:1,arrow:1,g:0,H:Math.max(200,t.h*t.scale*1.25)*rnd(.85,1.1),tilt:rnd(-.12,.12),squeeze:0,sink:0,t};stuck.push(q);P.q=q;
          sfx('rock');shake(4);for(let n=0;n<3;n++)r21PD(CLD,x1,y1-4,{vx:rnd(-160,160),vy:-rnd(160,380),g:950,life:rnd(.5,.8),size:rnd(18,30),vr:rnd(-8,8)});
          r21PD(DU,x1,y1,{vx:rnd(-40,40),vy:-rnd(10,40),life:.7,size:rnd(60,90),grow:40,a:.6});res();return false;}return true;},
      draw(){if(!BS)return;const k=Math.min(1,st.t/ms),[x,y]=pos(k),[px,py]=pos(Math.max(0,k-.03)),h=len*BS.height/BS.width;
        ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(y-py,x-px));ctx.drawImage(BS,-len*.82,-h/2,len,h);ctx.restore();}});});
  sfx('slash');flash('200,240,140',.2,.08);popLabel(al[0],'BAMBUSZFÜGGÖNY!','#b8e07a');
  // sortüzek: minden sortűz után Jázmin teste visszarúg (nem egy merev kép)
  const per=Math.ceil(posts.length/4),all=[];
  for(let w=0;w<4;w++){const grp=posts.slice(w*per,(w+1)*per);if(!grp.length)break;
    all.push(wait(w*240).then(()=>{sfx('whoosh');sfx('slash');shake(5);const o=u.ox||0;tween(180,k=>{u.lean=-.08*Math.sin(k*Math.PI);u.ox=o-10*Math.sin(k*Math.PI);}).then(()=>{u.lean=0;u.ox=o;});
      return Promise.all(grp.map((P,i)=>wait(i*45).then(()=>arrow(P))));}));}
  await Promise.all(all);await wait(160);
  // a nyilakból bambuszszárak nőnek ki, levelek pattannak – sűrű függöny minden ellenfél körül
  sfx('rock');sfx('wind');rumble&&rumble(.8,6);
  await tween(420,k=>{const e=eOutBack(k);for(const q of stuck){q.g=e;q.arrow=1-Math.min(1,k*2.5);}if(Math.random()<.5){const q=pick(stuck);leaf(q.x,q.gy-q.H*q.g*rnd(.3,1),rnd(-160,160),-rnd(60,220));}});
  for(const q of stuck)for(let n=0;n<2;n++)leaf(q.x,q.gy-q.H*rnd(.5,1),rnd(-140,140),-rnd(40,180));
  // összeszorul: a szárak rázárnak az ellenfelekre → sebzés + fogság
  sfx('crunch');sfx('hit');shake(18);hitStop(110);flash('190,240,140',.22,.1);
  await tween(200,k=>{for(const q of stuck)q.squeeze=k;});
  for(const t of al){t.hurt=.7;sparks(cx(t),midY(t),['200,240,150','255,255,255'],16,380);if(t.alive)hit(u,t,sk);}
  popLabel(al[0],'FOGSÁGBAN!','#b8e07a');
  await tween(700,k=>{for(const q of stuck)q.tilt=.03*Math.sin(k*28+q.x);for(const t of al)t.hurt=.25;});
  // a függöny visszahúzódik a földbe
  sfx('whoosh');
  await tween(380,k=>{const e=easeIO(k);for(const q of stuck){q.g=1-e;q.a=1-Math.max(0,(k-.6)/.4);}if(Math.random()<.4){const q=pick(stuck);leaf(q.x,q.gy-10,rnd(-120,120),-rnd(40,140));}});
  SKE.on=false;await dimTo(0,null,200);
  }finally{rel();}
};
