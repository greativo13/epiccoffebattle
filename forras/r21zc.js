
// ===== 43. kör: új támadások (a hősöknél kevés volt az egyedi / mindenkire ható) =====
// Mind festett képekkel: fx7-cauldron, fx7-brewsplash (új), wpn-axe (Grog saját fejszéje), fx7-bamboospear,
// fx7-teawave, fx7-teasplash. A kód csak mozgatja, forgatja, méretezi őket, és port/cseppeket ad hozzá.


// ---- festett részecskék (oa02/oa04: „festett kép kell, ne rajzolt”): a pötty-részecskék helyett kis, forgó, festett képdarabok
const R21PP=[];let R21PPon=false;const R21FILT=new Map();
// festett kép egyszer előszínezve (a szűrő nem képkockánként fut)
function r21Filt(im,f){if(!im||!f)return im;let m=R21FILT.get(im);if(!m){m={};R21FILT.set(im,m);}if(m[f])return m[f];const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');try{g.filter=f;}catch(e){}g.drawImage(im,0,0);m[f]=c;return c;}
function r21PD(im,x,y,o={}){if(!im)return;if(R21PP.length>260)return;R21PP.push({im,x,y,vx:o.vx||0,vy:o.vy||0,g:o.g||0,life:o.life||.8,t:0,s:o.size||20,rot:o.rot!=null?o.rot:rnd(0,6.28),vr:o.vr!=null?o.vr:rnd(-4,4),add:!!o.add,grow:o.grow||0,a:o.a==null?1:o.a,drag:o.drag||0,front:o.front});
  if(!R21PPon){R21PPon=true;R18E({update(dt){for(const p of R21PP){p.t+=dt;p.vy+=p.g*dt;if(p.drag){p.vx*=Math.max(0,1-p.drag*dt);p.vy*=Math.max(0,1-p.drag*dt);}p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;p.s=Math.max(1,p.s+p.grow*dt);}
      for(let i=R21PP.length-1;i>=0;i--)if(R21PP[i].t>=R21PP[i].life)R21PP.splice(i,1);if(!R21PP.length){R21PPon=false;return false;}return true;},
    draw(){for(const p of R21PP){const k=p.t/p.life,a=p.a*(k<.12?k/.12:1-Math.max(0,(k-.55)/.45));if(a<=0)continue;ctx.save();if(p.add)ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=a;ctx.translate(p.x,p.y);ctx.rotate(p.rot);const w=p.s,h=w*p.im.height/p.im.width;ctx.drawImage(p.im,-w/2,-h/2,w,h);ctx.restore();}}});}}

// sebzés gödör/kráter nélkül (A5: földhalom nem kell)
function r21HitNS(u,t,sk){S._r21noSink=true;try{return hit(u,t,sk);}finally{S._r21noSink=false;}}

// ---------- Morgána – Üst-kitörés (mindenkire, méreg) ----------
SK.cauldron={name:'Üst-kitörés',mp:22,cd:1,tgt:'enemies',kind:'mag',pow:1.3,elem:'poison',anim:'cauldronBurst',status:['poison',.6,2],
  desc:'Morgána elé kiemelkedik a boszorkányüst, felforr, és mérgező főzetet zúdít minden ellenségre. 60% eséllyel megmérgezi őket.'};
SHOP_SKILLS.witch.push(['cauldron','3-2',1100]);
A.cauldronBurst=async(u,ts,sk)=>{
  // (oa02) minden látvány festett kép: üst, főzet-csobbanás, a cseppek a csobbanás kis darabjai, a gőz festett felhő lilára színezve
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const CI=R17I.cauldron,SP=R17I.brewsplash,STM=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.7) brightness(.8)'),Hs=u.h*u.scale,ch=Hs*.95;
  const gx=cx(u)+u.w*u.scale*.35+ch*.5,gy=u.y+u.oy+4;
  const C={a:1,rise:0,rot:0,sq:1,jolt:0};
  const mouth=()=>({x:gx,y:gy-ch*C.rise*.86+C.jolt});
  const drop=(x,y,vx,vy,sz)=>r21PD(SP,x,y,{vx,vy,g:900,life:rnd(.6,1),size:sz||rnd(26,54),vr:rnd(-8,8)});
  const steam=(x,y,sz)=>r21PD(STM,x,y,{vx:rnd(-30,30),vy:-rnd(40,110),life:rnd(.9,1.4),size:sz||rnd(90,150),grow:60,vr:rnd(-.6,.6),a:.75});
  R18E({update(){return C.a>0;},draw(){if(!CI||C.rise<=0)return;const w=ch*CI.width/CI.height;
    ctx.save();ctx.globalAlpha=C.a;ctx.beginPath();ctx.rect(gx-w,gy-ch*1.6,w*2,ch*1.6+2);ctx.clip();
    ctx.translate(gx,gy+ch*(1-C.rise)+C.jolt);ctx.rotate(C.rot);ctx.scale(1/C.sq,C.sq);ctx.drawImage(CI,-w/2,-ch,w,ch);ctx.restore();}});
  await dimTo(.45,'14,6,20',260);
  // 1) Morgána int, az üst kiemelkedik a földből (festett porfelhő)
  sfx('dark');sfx('earthm');rumble&&rumble(.6,5);
  const DUST=R17I.teacloud;for(let i=0;i<5;i++)r21PD(DUST,gx+rnd(-ch*.5,ch*.5),gy-rnd(0,20),{vx:rnd(-120,120),vy:-rnd(20,80),life:1,size:rnd(90,150),grow:50,vr:rnd(-.5,.5),a:.8});
  await tween(460,k=>{C.rise=eOutBack(k);});C.rise=1;
  // 2) felforr: bugyog, rázkódik, festett cseppek és lila gőz
  sfx('squish');sfx('poison');let lt=0;
  await tween(760,k=>{C.rot=Math.sin(k*40)*.035*(.4+k);C.sq=1+Math.sin(k*28)*.03*(.5+k);const m=mouth();
    if(k-lt>.06){lt=k;drop(m.x+rnd(-ch*.3,ch*.3),m.y,rnd(-60,60),-rnd(200,380),rnd(20,38));if(Math.random()<.6)steam(m.x+rnd(-ch*.25,ch*.25),m.y-20);if(Math.random()<.3)sfx('squish');}});
  // 3) KITÖR: az üst megugrik, a festett főzet ívben minden ellenségre zúdul
  C.rot=0;sfx('splash');sfx('boom');shake(16);hitStop(80);flash('150,60,210',.25,.12);
  tween(160,k=>{C.jolt=-30*Math.sin(k*Math.PI);C.sq=1-.14*Math.sin(k*Math.PI);});
  {const m=mouth();for(let i=0;i<16;i++)drop(m.x+rnd(-30,30),m.y,rnd(-200,320),-rnd(380,720));for(let i=0;i<4;i++)steam(m.x+rnd(-40,40),m.y-30,rnd(130,200));
   const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.6;},draw(){if(!SP)return;const k=Math.min(1,st.t/.15),a=1-Math.max(0,(st.t-.25)/.35);r17Draw(SP,m.x,m.y,ch*1.6*(.5+.5*k),{rot:-Math.PI/2+.2,a,anchor:'bottom'});}});}
  popLabel(al[0],'ÜST-KITÖRÉS!','#c890ff');
  await Promise.all(al.map((t,i)=>wait(i*90).then(()=>new Promise(res=>{
    const m=mouth(),x0=m.x,y0=m.y,x1=cx(t),y1=midY(t),hgt=Math.max(160,Math.abs(x1-x0)*.36),ms=560+i*30,st={t:0,done:false,lt:0};
    const pos=k=>[x0+(x1-x0)*k,y0+(y1-y0)*k-Math.sin(k*Math.PI)*hgt];
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),[x,y]=pos(k);
        if(k-st.lt>.08){st.lt=k;drop(x+rnd(-14,14),y+rnd(-10,10),rnd(-60,60),rnd(-40,80),rnd(18,32));}
        if(k>=1&&!st.done){st.done=true;res();}return k<1;},
      draw(){if(!SP)return;const k=Math.min(1,st.t/ms),[x,y]=pos(k),[px,py]=pos(Math.max(0,k-.03)),w=200+170*k;
        r17Draw(SP,x,y,w,{rot:Math.atan2(y-py,x-px),fx:true});}});
  }).then(()=>{
    const x=cx(t),y=midY(t),st={t:0},rot=rnd(-.3,.3);sfx('splash');shake(10);
    R18E({update(dt){st.t+=dt;return st.t<.9;},draw(){if(!SP)return;const k=Math.min(1,st.t/.16),a=st.t<.45?1:1-(st.t-.45)/.45;
      r17Draw(SP,x-20,y+10,(t.w*t.scale*1.8+100)*(.5+.5*k),{rot:Math.PI/2+.35+rot,a:Math.max(0,a)*.95});
      r17Draw(SP,x+10,y-10,(t.w*t.scale*1.4+80)*(.5+.5*k),{rot:-Math.PI/2+.4+rot,fx:true,a:Math.max(0,a)*.8});}});
    for(let n=0;n<10;n++)drop(x+rnd(-20,20),y+rnd(-20,20),rnd(-340,340),-rnd(120,460));
    for(let n=0;n<3;n++)steam(x+rnd(-30,30),y+rnd(-20,20),rnd(110,170));
    t.hurt=.4;if(t.alive)r21HitNS(u,t,sk);}))));
  // 4) az üst visszasüllyed a földbe
  await wait(380);sfx('earthm');
  await tween(380,k=>{C.rise=1-k*k;});C.a=0;
  await dimTo(0,null,220);
  }finally{rel();}
};

// ---------- Grog – Fejsze-hajítás (egy célpont) ----------
SK.axethrow={name:'Fejsze-hajítás',mp:12,cd:1,tgt:'enemy',kind:'phys',pow:2.4,elem:'phys',anim:'axeThrow',
  desc:'Grog teljes erőből elhajítja lángoló fejszéjét: pörögve becsapódik, aztán visszarepül a kezébe. Nagy sebzés egy ellenségnek.'};
SHOP_SKILLS.orc.push(['axethrow','2-3',650]);
function r21NoAxe(on){if(on){if(!r21NoAxe.s)r21NoAxe.s={a:ENEMY_SPR['orc-cast'],b:ENEMY_SPR['orcG-cast']};if(ENEMY_SPR['orcnoaxe-cast'])ENEMY_SPR['orc-cast']=ENEMY_SPR['orcnoaxe-cast'];if(ENEMY_SPR['orcGnoaxe-cast'])ENEMY_SPR['orcG-cast']=ENEMY_SPR['orcGnoaxe-cast'];}
  else if(r21NoAxe.s){ENEMY_SPR['orc-cast']=r21NoAxe.s.a;ENEMY_SPR['orcG-cast']=r21NoAxe.s.b;r21NoAxe.s=null;}}
let R21AXE=null;function r21AxeImg(){if(!R21AXE&&typeof IMG_SRC==='object'&&IMG_SRC['wpn-axe']){R21AXE=new Image();R21AXE.src=IMG_SRC['wpn-axe'];}return R21AXE;}
try{r21AxeImg();}catch(e){}
A.axeThrow=async(u,ts,sk)=>{
  // (oa01 „gagyi, legyen látványosabb”): nagy, lángoló, festett fejsze festett tűzcsóvával (fx7-meteor), lassított elengedés,
  // becsapódáskor nagy festett tűzrobbanás és szétrepülő festett lángcsíkok, a fejsze beleáll, majd kitépve visszarepül.
  const t=ts&&ts[0];if(!t||!t.alive)return;let pose='attack';const st0={on:true};
  R18E({update(){if(st0.on)u.pose=pose;return st0.on;}});
  const AX=r21AxeImg(),MT=R17I.meteor,GB=r21Filt(R17I.goldburst,'hue-rotate(-28deg) saturate(1.5)'),Hs=u.h*u.scale,ah=Hs*1.0;
  const ember=(x,y,vx,vy)=>r21PD(GB,x,y,{vx,vy,g:300,life:rnd(.35,.6),size:rnd(26,48),add:true,vr:rnd(-6,6)});
  try{
  await dimTo(.3,'40,16,4',200);
  // 1) felhúzás: Grog hátradől, a fejsze lángra kap a feje fölött
  sfx('roar');const glowA={a:0};
  R18E({update(){return glowA.a>0||!glowA.done;},draw(){if(glowA.a<=0||!MT)return;const p=KP(u,.3,.12);ctx.save();ctx.globalCompositeOperation='lighter';
    for(let i=0;i<3;i++)r17Draw(MT,p.x+8,p.y+10,ah*1.2,{rot:-Math.PI/2-.3+i*.3+Math.sin(T*9+i)*.08,a:.55*glowA.a});ctx.restore();}});
  tween(300,k=>{glowA.a=k;});sfx('fire');
  await bodyWind(u,420,.24);
  {const p=KP(u,.3,.12);for(let i=0;i<10;i++)ember(p.x+rnd(-30,30),p.y+rnd(-30,20),rnd(-60,60),-rnd(60,160));}
  await wait(100);
  // 2) elengedés: rövid lassítás, a kép fejsze nélküli, a festett fejsze pörögve, lángcsóvát húzva repül
  hitStop(90);flash('255,180,80',.25,.1);glowA.a=0;glowA.done=true;r21NoAxe(true);pose='cast';sfx('whoosh');sfx('fire');bodyStrike(u,160,-.28);shake(8);
  const h0=KP(u,.3,.17),x1=cx(t)-t.w*t.scale*.15,y1=midY(t),A1={x:h0.x,y:h0.y,r:0,a:1,on:true,spin:true,vx:1,vy:0,trail:1},lx={x:h0.x,y:h0.y};
  R18E({update(dt){if(A1.spin)A1.r+=dt*26;A1.vx=A1.x-lx.x;A1.vy=A1.y-lx.y;lx.x=A1.x;lx.y=A1.y;
      if(A1.on&&A1.trail>0&&Math.random()<.7)ember(A1.x+rnd(-ah*.25,ah*.25),A1.y+rnd(-ah*.25,ah*.25),rnd(-60,60),rnd(-60,40));return A1.on;},
    draw(){if(!AX||!AX.width)return;
      // festett tűzcsóva a fejsze mögött, a repülés irányába fordítva
      if(MT&&A1.trail>0&&Math.hypot(A1.vx,A1.vy)>1.5){const ang=Math.atan2(A1.vy,A1.vx),L=ah*2.4;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.9*A1.trail;
        ctx.translate(A1.x,A1.y);ctx.rotate(ang-Math.atan2(MT.height*.62,MT.width*.9));const h=L*MT.height/MT.width;ctx.drawImage(MT,-L*.92,-h*.82,L,h);ctx.restore();}
      ctx.save();ctx.globalAlpha=A1.a;ctx.translate(A1.x,A1.y);ctx.rotate(A1.r);const w=ah*AX.width/AX.height;ctx.drawImage(AX,-w/2,-ah*.62,w,ah);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25*A1.trail;ctx.drawImage(AX,-w/2,-ah*.62,w,ah);ctx.restore();}});
  const d=Math.hypot(x1-h0.x,y1-h0.y),ms=Math.max(420,d*.8);let wh=0;
  await tween(ms,k=>{const e=k*(.55+.45*k);A1.x=h0.x+(x1-h0.x)*e;A1.y=h0.y+(y1-h0.y)*e-Math.sin(e*Math.PI)*110;if(k-wh>.2){wh=k;sfx('whoosh');}});
  // 3) becsapódás: a fejsze beleáll, hatalmas festett tűzrobbanás, lángcsíkok minden irányba
  A1.spin=false;A1.r=.9;hitStop(160);shake(26);flash('255,170,70',.4,.14);sfx('slash');sfx('punch');sfx('boom');
  {const bs={t:0};R18E({update(dt){bs.t+=dt;return bs.t<.7;},draw(){if(!GB)return;const k=Math.min(1,bs.t/.18),a=bs.t<.3?1:1-(bs.t-.3)/.4;ctx.save();ctx.globalCompositeOperation='lighter';
      r17Draw(GB,x1,y1,(t.h*t.scale*2.4+160)*(.4+.6*k),{a:Math.max(0,a)});r17Draw(GB,x1,y1,(t.h*t.scale*1.4+80)*(.6+.4*k),{rot:.6,a:Math.max(0,a)*.8});ctx.restore();}});}
  if(MT)for(let i=0;i<8;i++){const an=i/8*6.283+rnd(-.2,.2),sp=rnd(380,620);r21PD(MT,x1,y1,{vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,life:.45,size:rnd(140,220),rot:an+Math.PI,vr:0,add:true,drag:2});}
  for(let i=0;i<16;i++)ember(x1,y1,rnd(-420,420),rnd(-460,120));
  t.hurt=.7;{const o0=t.ox||0;tween(320,k=>{t.ox=o0+70*Math.sin(Math.min(1,k*1.6)*Math.PI*.5)*(1-k*.6);t.spin=-.18*Math.sin(k*Math.PI);}).then(()=>{t.ox=o0;t.spin=0;});}
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'FEJSZE!','#ffb060');
  await wait(320);
  // 4) kitépi magát és nagy ívben visszarepül Grog kezébe
  const h1=KP(u,.6,.14),bx=A1.x,by=A1.y;A1.spin=true;A1.trail=.8;sfx('whoosh');sfx('slash');
  await tween(Math.max(420,d*.7),k=>{const e=easeIO(k);A1.x=bx+(h1.x-bx)*e;A1.y=by+(h1.y-by)*e+Math.sin(k*Math.PI)*110;});
  A1.on=false;r21NoAxe(false);pose='attack';sfx('block');shake(10);hitStop(60);
  {const p=KP(u,.6,.14);for(let i=0;i<10;i++)ember(p.x,p.y,rnd(-260,260),rnd(-300,60));}
  await bodySettle(u,240);await dimTo(0,null,200);
  }finally{r21NoAxe(false);st0.on=false;u.pose='idle';}
};

// ---------- Grog – Vállroham (egy célpont, kábítás) ----------
SK.shouldercharge={name:'Vállroham',mp:10,cd:1,tgt:'enemy',kind:'phys',pow:1.9,elem:'phys',anim:'shoulderCharge',status:['stun',.4,1],
  desc:'Grog nekiiramodik, és teljes testével vállal az ellenségbe rohan, hátralöki. 40% eséllyel 1 körre elkábítja.'};
SHOP_SKILLS.orc.push(['shouldercharge','4-3',1600]);
A.shoulderCharge=async(u,ts,sk)=>{
  // (oa03 „nagy lendülettel rohanjon neki, széllel, vágással”): hátralép, nekifeszül, majd gyorsuló rohamban száguld; előtte
  // festett szélvágás (fx7-windslash) hasítja a levegőt, mögötte festett porfelhő; a becsapódásnál két nagy festett szél-vágás.
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'idle');
  try{
  const WS=R17I.windslash,DU=r21Filt(R17I.teacloud,'saturate(.45) brightness(.85)'),tw=t.w*t.scale,uw=u.w*u.scale,o0=u.ox||0;
  const dx=(cx(t)-tw*.42-uw*.4)-cx(u),feet=()=>({x:cx(u),y:u.y+u.oy});
  const dust=(x,y,vx,sz)=>r21PD(DU,x,y,{vx,vy:-rnd(20,70),life:rnd(.7,1.1),size:sz||rnd(80,130),grow:70,vr:rnd(-.4,.4),a:.85});
  // 1) hátralép, leszegi a fejét, kaparja a földet
  sfx('growl');await tween(320,k=>{const e=easeIO(k);u.ox=o0-60*e;u.lean=.18*e;u.sq=1-.08*e;});
  for(let i=0;i<3;i++){const f=feet();dust(f.x-uw*.25,f.y,-rnd(60,140),rnd(60,90));shake(4);sfx('dust');await wait(110);}
  // 2) roham: gyorsul, a szélvágás előtte, a por mögötte
  sfx('roar');const R={on:true,sp:0};
  R18E({update(){return R.on;},draw(){if(!WS||R.sp<=.05)return;const f=feet(),h=u.h*u.scale,w=h*1.25*(.6+.5*R.sp),hh=w*WS.height/WS.width;
    ctx.save();ctx.globalAlpha=Math.min(1,R.sp*1.3);ctx.translate(f.x+uw*.45,f.y-h*.5);ctx.scale(-1,1);ctx.drawImage(WS,-w*.3,-hh/2,w,hh);
    ctx.globalAlpha*=.6;ctx.translate(w*.25,h*.12);ctx.scale(.8,-.7);ctx.drawImage(WS,-w*.3,-hh/2,w,hh);ctx.restore();}});
  const start=o0-60,dist=dx+60;let lp=0;
  await tween(520,k=>{const e=k*k*k;u.ox=start+dist*e;R.sp=Math.min(1,k*1.6);u.lean=.18-.5*Math.min(1,k*2);u.sq=1+.05*Math.sin(k*22);u.jump=Math.abs(Math.sin(k*Math.PI*5))*12;
    if(k-lp>.07){lp=k;const f=feet();dust(f.x-uw*.35,f.y-rnd(0,12),-rnd(120,320));if(WS&&k>.3)r21PD(WS,f.x-uw*.2,f.y-u.h*u.scale*rnd(.3,.7),{vx:-rnd(200,400),life:.35,size:rnd(160,240),rot:Math.PI+rnd(-.15,.15),vr:0,a:.7});}
    if(Math.random()<.45)shake(6);if(k>.4&&Math.random()<.2)sfx('whoosh');});
  u.jump=0;R.on=false;
  // 3) becsapódás vállal: két nagy festett szél-vágás keresztbe, hátralöki
  hitStop(150);shake(28);flash('255,245,225',.38,.14);sfx('punch');sfx('crunch');sfx('slash');
  const ix=cx(t)-tw*.3,iy=midY(t);
  if(WS)for(const [r,f] of [[-.5,1],[.55,-1]]){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.55;},draw(){const k=Math.min(1,st.t/.12),a=st.t<.2?1:1-(st.t-.2)/.35;const w=(t.h*t.scale*1.9+140)*(.55+.45*k),h=w*WS.height/WS.width;
      ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(ix+20,iy);ctx.rotate(r);ctx.scale(-f,1);ctx.drawImage(WS,-w/2,-h/2,w,h);ctx.restore();}});}
  for(let i=0;i<5;i++)dust(ix+rnd(-30,30),t.y+t.oy-rnd(0,20),rnd(-200,260),rnd(90,150));
  const GB=r21Filt(R17I.goldburst,'saturate(.2) brightness(1.3)');{const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.4;},draw(){if(!GB)return;const k=st.t/.4;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,ix,iy,(tw+160)*(.6+.8*k),{a:1-k});ctx.restore();}});}
  t.hurt=.7;const t0=t.ox||0;
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'VÁLLROHAM!','#ffd27a');
  await tween(320,k=>{const e=eOutBack(k);t.ox=t0+150*e;t.spin=-.2*Math.sin(k*Math.PI);u.ox=start+dist-40*Math.sin(k*Math.PI);u.lean=-.32+.32*k;});
  // 4) Grog visszaugrik, az ellenfél visszacsúszik
  sfx('whoosh');
  await Promise.all([tween(420,k=>{const e=easeIO(k);u.ox=(start+dist)+(o0-(start+dist))*e;u.jump=Math.sin(k*Math.PI)*50;u.lean=0;}),tween(460,k=>{t.ox=t0+150*(1-easeIO(k));t.spin=0;})]);
  u.ox=o0;u.jump=0;t.ox=t0;t.spin=0;await bodySettle(u,200);
  }finally{rel();}
};

// ---------- Jázmin – Bambuszfüggöny (mindenkire, páncéltörés) ----------
SK.bamboocurtain={name:'Bambuszfüggöny',mp:18,cd:1,tgt:'enemies',kind:'phys',pow:1.1,elem:'phys',anim:'bambooCurtain',status:['defDown',.4,1],
  desc:'Jázmin sorokban kilő egy egész függönynyi bambusznyilat, amelyek átfúrják az összes ellenséget. 40% eséllyel 1 körre gyengítik a védelmüket.'};
SHOP_SKILLS.monk.push(['bamboocurtain','8-2',4400]);
A.bambooCurtain=async(u,ts,sk)=>{
  // (oa05 „élethűbb, festett, nagyobb”): nagy festett bambusznyilak (fx7-bamboospear) sortüzekben, enyhe ívvel és rezgéssel;
  // minden sortűzből egy-egy nyíl beleáll az ellenségbe és ott marad, a becsapódásnál festett levelek (fx7-leaf) szóródnak.
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'attack');
  try{
  const BS=R17I.bamboospear,LF=R17I.leaf;await dimTo(.4,'10,24,6',200);
  await chargeBow(u,420,'150,220,90');u.pose='attack';
  const b=bowPos(u),top=Math.min(...al.map(t=>topY(t)))+20,bot=Math.max(...al.map(t=>t.y+t.oy))-20,rows=3,waves=4,len=Math.max(300,u.h*u.scale*1.25);
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:260,life:rnd(.7,1.2),size:rnd(18,30),vr:rnd(-7,7),drag:1});
  const stuck=[];const SK2={on:true};
  // a beállt nyilak (hátul kilógó szárral)
  R18E({update(){return SK2.on;},draw(){if(!BS)return;for(const q of stuck){ctx.save();ctx.globalAlpha=q.a;ctx.translate(cx(q.t)+q.dx,q.t.y+q.t.oy+q.dy);ctx.rotate(q.r+Math.sin(T*30)*q.w);
    const h=len*BS.height/BS.width;ctx.drawImage(BS,-len*.82,-h/2,len,h);ctx.restore();q.w*=.93;}}});
  const arrow=(y,w,r)=>new Promise(res=>{const x0=b.x+10,y0=b.y,x1=W+len,st={t:0,hit:new Set()},ms=560,arc=rnd(20,50),lodge=al[(w+r)%al.length];
    const pos=k=>{const x=x0+(x1-x0)*k,yy=y0+(y-y0)*Math.min(1,k*3)-Math.sin(Math.min(1,k*3)*Math.PI)*arc*(1-k);return [x,yy];};
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),[x,yy]=pos(k);
        for(const t of al){if(st.hit.has(t)||Math.abs(x-cx(t))>24||yy<topY(t)-10||yy>t.y+t.oy+6)continue;st.hit.add(t);t.hurt=.35;sfx('hit');shake(5);
          for(let n=0;n<5;n++)leaf(cx(t),yy,rnd(60,300),rnd(-200,40));
          if(t===lodge&&!st.done){st.done=true;stuck.push({t,dx:rnd(-8,8),dy:yy-(t.y+t.oy),r:rnd(-.12,.12),a:1,w:.12});res();return false;}}
        if(k>=1){res();return false;}return true;},
      draw(){if(!BS||st.done)return;const k=Math.min(1,st.t/ms),[x,yy]=pos(k),[px,py]=pos(Math.max(0,k-.02)),h=len*BS.height/BS.width;
        ctx.save();ctx.translate(x,yy);ctx.rotate(Math.atan2(yy-py,x-px)+Math.sin(st.t*.06)*.03);ctx.drawImage(BS,-len*.82,-h/2,len,h);ctx.restore();}});});
  sfx('slash');flash('200,240,140',.2,.08);popLabel(al[0],'BAMBUSZFÜGGÖNY!','#b8e07a');
  const all=[];
  for(let w=0;w<waves;w++){all.push(wait(w*230).then(()=>{sfx('whoosh');sfx('slash');shake(5);u.lean=-.06;tween(160,k=>{u.lean=-.06*(1-k);});
    return Promise.all(Array.from({length:rows},(_,r)=>wait(r*40).then(()=>arrow(top+(bot-top)*((r+.5+(w%2?.25:-.25))/rows),w,r))));}));}
  await Promise.all(all);
  for(const t of al){shake(10);for(let n=0;n<8;n++)leaf(cx(t),midY(t),rnd(-260,260),rnd(-320,-60));if(t.alive){hit(u,t,sk);}}
  await wait(500);await tween(300,k=>{for(const q of stuck)q.a=1-k;});SK2.on=false;await dimTo(0,null,200);
  }finally{rel();}
};

// ---------- Jázmin – Teaörvény-nyíl (mindenkire, forrázás) ----------
SK.teavortex={name:'Teaörvény-nyíl',mp:17,cd:1,tgt:'enemies',kind:'phys',pow:1.0,elem:'water',anim:'teaVortexArrow',status:['scald',.5,2],
  desc:'A nyíl az ellenség közé csapódik, és forró teaörvénnyé robban, amely mindenkit elsodor. 50% eséllyel 2 körre leforrázza őket.'};
SHOP_SKILLS.monk.push(['teavortex','8-3',4600]);
A.teaVortexArrow=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'attack');let VV=null;
  try{
  const WV=R17I.teawave,SP=R17I.teasplash,{mx,gy}=grp(al),minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.6)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.6));
  const hx=Math.max(...S.heroes.filter(h=>h.alive).map(h=>cx(h)+h.w*h.scale*.4)),R=Math.max(130,Math.min((maxX-minX)/2+70,mx-hx-60)),cY=gy-30,maxH=Math.max(...al.map(t=>t.h*t.scale));
  await dimTo(.35,'30,18,4',200);await chargeBow(u,380,'255,190,90');u.pose='attack';
  // 1) a nyíl a csoport közepére, a földbe csapódik
  sfx('slash');await bigArrow(bowPos(u),{x:mx,y:cY},{arc:60,size:150,trail:['255,190,90','255,230,160','255,255,255']});
  sfx('splash');shake(12);hitStop(70);flash('255,200,120',.25,.1);
  const SPL={t:0};R18E({update(dt){SPL.t+=dt;return SPL.t<1;},draw(){if(!SP)return;const k=Math.min(1,SPL.t/.2),a=SPL.t<.5?1:1-(SPL.t-.5)/.5;r17Draw(SP,mx,cY+30,(R*1.1)*(.4+.6*k),{anchor:'bottom',a:Math.max(0,a)});}});
  // 2) forró teaörvény: a festett tea-hullám három példányban körbe-körbe forog mindenki körül
  const V={a:0,r:.3,ang:0,on:true},N=3;
  const wavePos=i=>{const an=V.ang+i*Math.PI*2/N;return {an,x:mx+Math.cos(an)*R*V.r,y:cY+Math.sin(an)*R*V.r*.32,front:Math.sin(an)>-.15};};
  const drawWave=(i)=>{if(!WV)return;const p=wavePos(i),w=R*1.15*(.6+.4*V.r),h=w*WV.height/WV.width;
    ctx.save();ctx.globalAlpha=V.a*(p.front?1:.75);ctx.translate(p.x,p.y);ctx.scale(Math.cos(p.an)>0?-1:1,1);ctx.drawImage(WV,-w/2,-h*.92,w,h);ctx.restore();};
  // a hátsó félkör a figurák MÖGÖTT (az első ellenség kirajzolása előtt), az első félkör előttük (effekt-rétegben)
  R18E({update(dt){V.frame=(V.frame||0)+1;if(V.on){for(let n=0;n<3;n++){const an=rnd(0,6.29);part({x:mx+Math.cos(an)*R*V.r,y:cY+Math.sin(an)*R*V.r*.32-rnd(0,40),vx:-Math.sin(an)*160,vy:-rnd(40,160),life:rnd(.4,.8),size:rnd(4,8),rgb:pick(['230,150,50','255,200,110','190,110,30']),add:false,g:300});}
      if(Math.random()<.5)puffs(mx+rnd(-R,R)*V.r,cY-rnd(20,maxH*.6),1,['245,240,232','230,226,220'],[24,40],{w:10,h:10,up:120});}return V.on||V.a>0;},
    draw(){if(V.a>0)for(let i=0;i<N;i++)if(wavePos(i).front)drawWave(i);}});
  {const de=drawEntity;let fr=-1;
   drawEntity=function(e){if(V.a>0&&al.includes(e)&&fr!==V.frame){fr=V.frame;try{for(let i=0;i<N;i++)if(!wavePos(i).front)drawWave(i);}catch(err){}}return de.apply(this,arguments);};
   V.restore=()=>{if(drawEntity!==de){drawEntity=de;}V.a=0;V.on=false;};VV=V;}
  sfx('water');sfx('wind');popLabel(al[0],'TEAÖRVÉNY!','#ffc070');
  let sp=0;
  await tween(1500,k=>{V.a=Math.min(1,k*5);V.r=Math.min(1,.3+k*2);V.ang+=.13+.1*Math.sin(k*Math.PI);
    for(const t of al){t.hurt=.2;t.oy=(t._r21vy0??(t._r21vy0=t.oy))-Math.abs(Math.sin(k*12+cx(t)))*8;}
    if(k-sp>.18){sp=k;sfx('splash');shake(5);}});
  // 3) az örvény összecsap mindenkin: forrázás
  shake(16);hitStop(90);flash('255,210,140',.28,.12);sfx('splash');sfx('steam');
  for(const t of al){t.oy=t._r21vy0??t.oy;delete t._r21vy0;puffs(cx(t),midY(t),10,['245,240,232','232,228,220'],[26,44],{w:50,h:50,up:140});
    sparks(cx(t),midY(t),['255,200,110','255,255,255'],14,360);toss(t,150,640);/* (oa06: a végén feldobja az ellenfelet) */if(t.alive)r21HitNS(u,t,sk);}
  await tween(420,k=>{V.a=1-k;V.r=1+k*.25;V.ang+=.1;});V.on=false;V.a=0;V.restore();
  await wait(150);await dimTo(0,null,200);
  }finally{if(VV)VV.restore();for(const t of al)if(t._r21vy0!=null){t.oy=t._r21vy0;delete t._r21vy0;}rel();}
};

// ---------- Kaelen – Bambuszdöfés (egy célpont, páncéltörés) ----------
SK.bamboothrust={name:'Bambuszdöfés',mp:16,cd:1,tgt:'enemy',kind:'phys',pow:2.2,elem:'nature',anim:'bambooThrust',status:['defDown',.5,1],
  desc:'Kaelen előrelendül, és egy hosszú bambuszlándzsát döf át az ellenségen. 50% eséllyel 1 körre gyengíti a védelmét.'};
SHOP_SKILLS.druid.push(['bamboothrust','10-1',5400]);
A.bambooThrust=async(u,ts,sk)=>{
  // (oa07 „darabos a mozgás”): egyetlen folyamatos mozdulat – lágy felhúzás, egy simán gyorsuló-lassuló kitörés, amely közben
  // a lándzsa is egyenletesen nyúlik; nincs utánkép, nincs hirtelen méretugrás. Festett levelek (fx7-leaf).
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'cast');
  try{
  const BS=R17I.bamboospear,LF=R17I.leaf,o0=u.ox||0,tw=t.w*t.scale,dx=Math.max(0,(cx(t)-tw*.5-240)-cx(u));
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:240,life:rnd(.7,1.2),size:rnd(18,30),vr:rnd(-6,6),drag:1.2});
  const S1={len:0,a:0,on:true};
  const palm=()=>{const p=KP(u,.85,.39),l=u.lean||0;if(!l)return p;const x0=cx(u),y0=u.y+u.oy,ddx=p.x-x0,dy=p.y-y0,c=Math.cos(l),sn=Math.sin(l);return {x:x0+ddx*c-dy*sn,y:y0+ddx*sn+dy*c};};
  const aim=()=>{const h=palm();return {h,ang:Math.atan2(midY(t)-h.y,cx(t)-h.x)};};
  R18E({update(){return S1.on;},draw(){if(!BS||S1.a<=0)return;const {h,ang}=aim(),L=S1.len,hh=Math.max(14,L*BS.height/BS.width);
    ctx.save();ctx.globalAlpha=S1.a;ctx.translate(h.x,h.y);ctx.rotate(ang);ctx.drawImage(BS,-L*.22,-hh/2,L,hh);ctx.restore();}});
  // 1) a lándzsa kinő a tenyeréből, Kaelen lágyan hátrahúzódik
  sfx('spell');{const p=palm();for(let i=0;i<8;i++)leaf(p.x,p.y,rnd(-80,80),-rnd(40,140));}
  await tween(420,k=>{const e=easeIO(k);S1.a=Math.min(1,k*2);S1.len=120+160*e;u.lean=.18*e;u.ox=o0-24*e;});
  // 2) egy folyamatos kitörés: előrelendül, és közben a lándzsa átnyúlik az ellenfélen
  sfx('whoosh');const need0=()=>{const {h}=aim();return Math.hypot(cx(t)+tw*.55-h.x,midY(t)-h.y)/.78;};
  let lp=0;await tween(380,k=>{const e=1-Math.pow(1-k,3);u.ox=o0-24+(dx+24)*e;u.lean=.18-.42*e;S1.len=280+(need0()-280)*Math.max(0,(e-.35)/.65);
    if(k-lp>.12){lp=k;leaf(cx(u)-20,u.y+u.oy-10,-rnd(60,160),-rnd(20,90));}});
  hitStop(110);shake(18);flash('200,240,140',.25,.1);sfx('slash');sfx('crunch');
  {const x=cx(t),y=midY(t);for(let n=0;n<16;n++)leaf(x+tw*.3,y,rnd(60,420),rnd(-300,120));const GB=r21Filt(R17I.goldburst,'hue-rotate(60deg) saturate(.8)');
   const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.45;},draw(){if(!GB)return;const k=st.t/.45;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,x+tw*.3,y,(tw+120)*(.5+.8*k),{a:1-k});ctx.restore();}});}
  t.hurt=.6;{const t0=t.ox||0;tween(300,k=>{t.ox=t0+34*Math.sin(k*Math.PI);}).then(()=>{t.ox=t0;});}
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'ÁTDÖFVE!','#b8e07a');
  await wait(260);
  // 3) egyetlen lágy mozdulattal kihúzza és visszalép
  sfx('whoosh');const L0=S1.len;
  await tween(520,k=>{const e=easeIO(k);u.ox=o0+dx*(1-e);u.lean=-.24*(1-e);S1.len=L0+(160-L0)*e;S1.a=1-Math.max(0,(k-.5)/.5);});
  u.ox=o0;u.lean=0;S1.on=false;await bodySettle(u,180);
  }finally{rel();}
};

// ---------- Morgána – Holdfogyatkozás (mindenkire, altatás) ----------
// Festett fekete hold (fx7-blackmoon) emelkedik az ellenség fölé, elsötétül az ég; a korona lüktet, majd a hold
// sötét fénydarabjai (a festett hold kicsinyített másai) rázuhannak minden ellenségre.
SK.eclipse={name:'Holdfogyatkozás',mp:32,cd:2,tgt:'enemies',kind:'mag',pow:1.6,elem:'dark',anim:'eclipseMoon',status:['sleep',.7,1],
  desc:'Morgána vérvörös fekete holdat idéz: sötét lángoszlopai mindenkire lesújtanak. 70% eséllyel 1 körre elaltatja az ellenfeleket (alvás közben nem támadnak).'};
SHOP_SKILLS.witch.push(['eclipse','6-1',3200]);
A.eclipseMoon=async(u,ts,sk)=>{
  // (oa04 „festett kép kell; sötétebb, félelmetesebb; nincs funkciója”): szinte fekete ég, festett vérvörös fekete hold
  // (fx7-blackmoon2) karmos koronával, a holdból festett sötét lángoszlopok (fx7-firepillar) csapnak le minden ellenfélre,
  // fölöttük festett viharkoponya (fx7-stormskull) villan, alattuk festett sötét lángok (fx7-darkflame) csapnak fel.
  // Funkció: sötét sebzés mindenkire + 70% eséllyel 1 körre elalszanak (kiírja: ALVÁS).
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const MI=R17I.blackmoon2||R17I.blackmoon,PL=R17I.firepillar,SKL=R17I.stormskull,DF=R17I.darkflame,{mx}=grp(al),top=Math.min(...al.map(t=>topY(t)));
  const my=Math.max(120,top-170),R=Math.max(180,Math.min(290,(Math.max(...al.map(t=>cx(t)))-Math.min(...al.map(t=>cx(t))))*.5+140));
  const flame=(x,y,sz)=>r21PD(DF,x,y,{vx:rnd(-30,30),vy:-rnd(60,140),life:rnd(.7,1.1),size:sz||rnd(60,100),rot:rnd(-.15,.15),vr:rnd(-.5,.5),grow:20});
  const M={a:0,s:.3,rot:0,y:my-200,pulse:0,on:true};
  R18E({update(dt){M.rot+=dt*.18;return M.on||M.a>0;},draw(){if(!MI||M.a<=0)return;
    ctx.save();ctx.globalAlpha=M.a;r17Draw(MI,mx,M.y,R*2*M.s,{rot:M.rot});
    ctx.globalCompositeOperation='lighter';r17Draw(MI,mx,M.y,R*2*M.s*(1.04+.1*M.pulse),{rot:-M.rot*1.4,a:.25+.35*M.pulse});ctx.restore();}});
  // 1) Morgána felemeli a kezét, sötét lángok a tenyerében
  sfx('dark');{const h=handPos(u);for(let i=0;i<5;i++)flame(h.x+rnd(-14,14),h.y+rnd(-10,10),rnd(40,70));}
  // 2) szinte teljes sötétség, a hold vérvörös koronával felkel
  dimTo(.9,'12,0,6',600);sfx('wail');rumble&&rumble(1.4,6);
  await tween(900,k=>{const e=eOutBack(k);M.a=Math.min(1,k*1.6);M.s=.3+.7*e;M.y=my-200*(1-easeIO(k));});
  popLabel(al[0],'HOLDFOGYATKOZÁS!','#ff6a7a');
  // 3) a korona lüktet, a földből sötét lángok csapnak fel az ellenfelek alatt
  sfx('growl');let lt=0;
  await tween(800,k=>{M.pulse=Math.abs(Math.sin(k*Math.PI*3));if(k-lt>.09){lt=k;for(const t of al)flame(cx(t)+rnd(-t.w*t.scale*.5,t.w*t.scale*.5),t.y+t.oy+4,rnd(60,110));}if(Math.random()<.2)shake(4);});
  // 4) a holdból lángoszlopok csapnak le mindenkire, fölöttük a viharkoponya villan
  sfx('boom');flash('120,0,30',.35,.14);
  await Promise.all(al.map((t,i)=>wait(i*130).then(async()=>{const x=cx(t),gy=t.y+t.oy+6,st={t:0};sfx('dark');shake(14);hitStop(70);
    R18E({update(dt){st.t+=dt;return st.t<.85;},draw(){const k=st.t,a=k<.12?k/.12:Math.max(0,1-(k-.35)/.5);ctx.save();
      if(PL){const H=gy-M.y,w=Math.max(160,t.w*t.scale*1.5);ctx.globalAlpha=a;ctx.drawImage(PL,x-w/2,M.y,w,H+20);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a*.5;ctx.drawImage(PL,x-w*.35,M.y,w*.7,H+20);}
      ctx.restore();
      if(SKL){ctx.save();const sk2=Math.min(1,k/.2);ctx.globalAlpha=Math.max(0,a);r17Draw(SKL,x,topY(t)-30,(t.w*t.scale+180)*(.7+.3*sk2));ctx.restore();}}});
    for(let n=0;n<6;n++)flame(x+rnd(-40,40),gy-rnd(0,30),rnd(70,120));
    t.hurt=.6;if(t.alive)r21HitNS(u,t,sk);})));
  // 5) a hold lenyugszik, kivilágosodik
  await wait(450);
  await tween(600,k=>{M.a=1-k;M.y=my-140*k*k;M.pulse=0;});M.on=false;M.a=0;
  await dimTo(0,null,350);
  }finally{rel();}
};

// ---------- Kaelen – Erdő haragja (mindenkire) ----------
// Az erdő megharagszik: minden ellenség fölé egy hatalmas, festett fakar (fx7-treearm) hajol be fentről, karmos
// águjjakkal lecsap rájuk, aztán visszahúzódik. (Gyökércsapda: gyökerek alulról, foglyul ejt – ez felülről üt, nagyot sebez.)
SK.forestwrath={name:'Erdő haragja',mp:30,cd:2,tgt:'enemies',kind:'mag',pow:1.75,elem:'nature',anim:'forestWrath',
  desc:'Kaelen felébreszti az erdőt: hatalmas faágak csapnak le fentről minden ellenségre. Nagy természet-sebzés mindenkinek.'};
SHOP_SKILLS.druid.push(['forestwrath','11-3',6800]);
A.forestWrath=async(u,ts,sk)=>{
  // (oa08 „Kaelen kezéből legyen a fakéz, és csapjon le, mint a Rémült Vén Tölgy”): Kaelen nyitott tenyeréből egy hatalmas
  // festett fakar (fx7-treearm) nő ki az ellenfelek felé, lassan magasra emelkedik (hátradől közben), aztán egy villámgyors
  // mozdulattal rácsap az összes ellenfélre – megáll a kép, rázkódik, kéreg- és levéldarabok repülnek. Utána visszahúzódik.
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const TA=R17I.treearm,LF=R17I.leaf,PB=R17I.pebble;
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:260,life:rnd(.8,1.3),size:rnd(18,32),vr:rnd(-7,7),drag:1});
  const bark=(x,y,vx,vy)=>r21PD(PB,x,y,{vx,vy,g:900,life:rnd(.6,1),size:rnd(14,26),vr:rnd(-9,9)});
  const palm=()=>{const p=KP(u,.85,.39),l=u.lean||0;if(!l)return p;const x0=cx(u),y0=u.y+u.oy,dx=p.x-x0,dy=p.y-y0,c=Math.cos(l),sn=Math.sin(l);return {x:x0+dx*c-dy*sn,y:y0+dx*sn+dy*c};};
  // a kép (tükrözve): a törzs a bal felső sarokban – ez a tenyérhez illeszkedik –, a karmok a jobb alsóban
  const iw=TA?TA.width:626,ih=TA?TA.height:504,CL={x:.75,y:.73*ih/iw};const base=Math.atan2(CL.y,CL.x);
  const tgt={x:(Math.min(...al.map(cx))+Math.max(...al.map(cx)))/2,y:Math.min(...al.map(t=>midY(t)))};
  const P0=palm(),dist=Math.hypot(tgt.x-P0.x,tgt.y-P0.y),Wf=dist/Math.hypot(CL.x,CL.y)*1.02,aimAng=Math.atan2(tgt.y-P0.y,tgt.x-P0.x)-base;
  const A0={k:0,a:0,ang:aimAng-1.2,wob:0};
  R18E({update(){return A0.a>0||!A0.done;},draw(){if(!TA||A0.a<=0)return;const p=palm(),w=Wf*(.25+.75*A0.k),h=w*ih/iw;
    ctx.save();ctx.globalAlpha=A0.a;ctx.translate(p.x,p.y);ctx.rotate(A0.ang+Math.sin(T*14)*A0.wob);ctx.scale(-1,1);ctx.drawImage(TA,-w*.9,-h*.12,w,h);ctx.restore();}});
  // 1) Kaelen kinyújtja a kezét, az erdő felmordul, a tenyeréből kinő a fakar
  sfx('spell');sfx('growl');await dimTo(.45,'6,20,4',300);rumble&&rumble(1,5);
  {const p=palm();for(let i=0;i<14;i++)leaf(p.x,p.y,rnd(-160,200),-rnd(40,220));}
  sfx('rock');await tween(560,k=>{const e=easeIO(k);A0.a=Math.min(1,k*3);A0.k=e;A0.ang=aimAng-1.2;});
  popLabel(al[0],'ERDŐ HARAGJA!','#9ee06a');
  // 2) magasra emeli (Kaelen hátradől), remeg a feszültségtől
  sfx('wind');await tween(620,k=>{const e=easeIO(k);A0.ang=aimAng-1.2-.45*e;u.lean=.16*e;A0.wob=.02*e;});
  for(let i=0;i<10;i++)leaf(P0.x+rnd(0,Wf*.5),P0.y-rnd(60,200),rnd(-120,120),rnd(-60,60));
  await wait(120);
  // 3) VILLÁMGYORS LECSAPÁS az összes ellenfélre
  sfx('whoosh');A0.wob=0;await tween(170,k=>{const e=k*k;A0.ang=aimAng-1.65+(1.65+.08)*e;u.lean=.16-.36*e;});
  hitStop(140);shake(26);flash('255,235,190',.25,.1);sfx('crunch');sfx('earthm');sfx('hit');
  for(const t of al){const x=cx(t),y=midY(t);for(let n=0;n<10;n++)leaf(x,y,rnd(-300,300),rnd(-340,-40));for(let n=0;n<8;n++)bark(x,y,rnd(-280,280),rnd(-420,-120));
    sparks(x,y,['255,240,200','210,190,140'],18,420);t.hurt=.7;toss(t,60,380);if(t.alive)r21HitNS(u,t,sk);}
  await tween(160,k=>{A0.ang=aimAng+.08-.08*k;});
  await wait(380);
  // 4) visszahúzódik a tenyerébe
  sfx('whoosh');await tween(520,k=>{const e=easeIO(k);A0.k=1-e;A0.a=1-Math.max(0,(k-.4)/.6);A0.ang=aimAng-.5*e;u.lean=-.2*(1-e);});
  A0.done=true;A0.a=0;u.lean=0;await dimTo(0,null,250);
  }finally{rel();}
};
