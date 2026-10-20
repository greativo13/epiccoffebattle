
// ===== 43. kör: új támadások (a hősöknél kevés volt az egyedi / mindenkire ható) =====
// Mind festett képekkel: fx7-cauldron, fx7-brewsplash (új), wpn-axe (Grog saját fejszéje), fx7-bamboospear,
// fx7-teawave, fx7-teasplash. A kód csak mozgatja, forgatja, méretezi őket, és port/cseppeket ad hozzá.


// ---- festett részecskék (oa02/oa04: „festett kép kell, ne rajzolt”): a pötty-részecskék helyett kis, forgó, festett képdarabok
const R21PP=[];let R21PPon=false;const R21FILT=new Map();
// festett kép egyszer előszínezve (a szűrő nem képkockánként fut)
function r21Filt(im,f){if(!im||!f||!im.width)return im;let m=R21FILT.get(im);if(!m){m={};R21FILT.set(im,m);}if(m[f])return m[f];const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');try{g.filter=f;}catch(e){}g.drawImage(im,0,0);m[f]=c;return c;}
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
  // (oa02 2.: „az üst felborul”): Morgána előtt kiemelkedik az üst, felforr, Morgána belerúg – az üst a hősök felé nyitott
  // szájjal felborul, és a festett lila főzethullám (fx7-teawave lilára színezve) végigömlik a talajon az ellenfelekig,
  // ott festett csobbanásként (fx7-brewsplash) feléjük csap, és festett lila tócsa marad alattuk. Minden látvány festett kép.
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const CI=R17I.cauldron,SP=R17I.brewsplash,WV=r21Filt(R17I.teawave,'hue-rotate(245deg) saturate(1.3) brightness(.9)'),STM=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.7) brightness(.8)');
  const Hs=u.h*u.scale,ch=Hs*.9,gx=cx(u)+u.w*u.scale*.35+ch*.5,gy=u.y+u.oy+4;
  const C={a:1,rise:0,rot:0,jolt:0,dx:0};
  const drop=(x,y,vx,vy,sz)=>r21PD(SP,x,y,{vx,vy,g:900,life:rnd(.6,1),size:sz||rnd(26,54),vr:rnd(-8,8)});
  const steam=(x,y,sz)=>r21PD(STM,x,y,{vx:rnd(-30,30),vy:-rnd(40,110),life:rnd(.9,1.4),size:sz||rnd(90,150),grow:60,vr:rnd(-.6,.6),a:.75});
  const lip=()=>{const w=ch*(CI?CI.width/CI.height:1);const px=gx+C.dx+w*.45,py=gy;const ang=C.rot;return {x:px+Math.cos(ang-Math.PI/2)*ch*.86*-Math.sin(0)+Math.sin(ang)*ch*.8,y:py-Math.cos(ang)*ch*.8};};
  R18E({update(){return C.a>0;},draw(){if(!CI||C.rise<=0)return;const w=ch*CI.width/CI.height;
    ctx.save();ctx.globalAlpha=C.a;ctx.beginPath();ctx.rect(gx-w*2,gy-ch*2,w*5,ch*2+2);ctx.clip();
    // a forgáspont az üst jobb alsó sarka (arra borul)
    ctx.translate(gx+C.dx+w*.42,gy+ch*(1-C.rise)+C.jolt);ctx.rotate(C.rot);ctx.drawImage(CI,-w*.92,-ch,w,ch);ctx.restore();}});
  // a talajon végigömlő főzethullám és a tócsák
  const F={k:0,on:true,x0:0,x1:0,y0:gy,y1:gy,h:0,a:1},pools=[];
  R18E({update(){return F.on||pools.some(p=>p.a>0);},draw(){
    for(const p of pools){if(p.a<=0||!SP)continue;const w=p.w*p.k,h=w*SP.height/SP.width*.28;ctx.save();ctx.globalAlpha=p.a;ctx.translate(p.x,p.y);ctx.scale(1,1);ctx.drawImage(SP,-w/2,-h*.5,w,h);ctx.restore();}
    if(!WV||F.k<=0||F.h<=0)return;const x=F.x0+(F.x1-F.x0)*F.k,y=F.y0+(F.y1-F.y0)*F.k,h=F.h,w=h*WV.width/WV.height;
    ctx.save();ctx.globalAlpha=F.a;ctx.translate(x,y+h*.06);ctx.scale(-1,1);ctx.drawImage(WV,-w*.25,-h,w,h);ctx.restore();}});
  await dimTo(.45,'14,6,20',260);
  // 1) kiemelkedik a földből
  sfx('dark');sfx('earthm');rumble&&rumble(.6,5);
  const DU=R17I.teacloud;for(let i=0;i<4;i++)r21PD(DU,gx+rnd(-ch*.4,ch*.4),gy-rnd(0,20),{vx:rnd(-120,120),vy:-rnd(20,80),life:1,size:rnd(90,140),grow:50,vr:rnd(-.5,.5),a:.75});
  await tween(460,k=>{C.rise=eOutBack(k);});C.rise=1;
  // 2) felforr
  sfx('squish');sfx('poison');let lt=0;
  await tween(700,k=>{C.jolt=Math.sin(k*50)*2*(.4+k);const w=ch*CI.width/CI.height;if(k-lt>.07){lt=k;drop(gx+rnd(-w*.25,w*.25),gy-ch*.85,rnd(-60,60),-rnd(200,360),rnd(20,36));if(Math.random()<.6)steam(gx+rnd(-w*.2,w*.2),gy-ch*.95);}});C.jolt=0;
  // 3) Morgána belerúg, az üst felborul az ellenfelek felé
  sfx('punch');sfx('block');shake(10);u.lean=-.08;tween(200,k=>{u.lean=-.08*(1-k);});
  await tween(360,k=>{const e=eOutBack(k);C.rot=1.45*e;C.dx=14*e;});shake(14);hitStop(70);sfx('splash');sfx('boom');
  // 4) a főzethullám végigömlik a talajon
  const minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.4)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.4));
  const w0=ch*CI.width/CI.height;F.x0=gx+w0*.5;F.x1=maxX+60;F.y0=gy;F.y1=Math.max(...al.map(t=>t.y+t.oy))+4;
  popLabel(al[0],'ÜST-KITÖRÉS!','#c890ff');
  const hitd=new Set();let lp=0;
  await tween(Math.max(700,(F.x1-F.x0)*1.1),k=>{const e=k;F.k=e;F.h=Hs*(.5+.55*Math.min(1,k*1.6));const x=F.x0+(F.x1-F.x0)*e,y=F.y0+(F.y1-F.y0)*e;
    if(k-lp>.05){lp=k;pools.push({x:x-40,y:y+2,w:rnd(150,210),k:1,a:.85});drop(x,y-F.h*.6,rnd(-80,160),-rnd(160,380),rnd(22,40));if(Math.random()<.4)steam(x,y-F.h*.4);}
    if(Math.random()<.3)shake(5);
    for(const t of al)if(!hitd.has(t)&&x>=cx(t)-20){hitd.add(t);const tx=cx(t),ty=midY(t),st={t:0};sfx('splash');shake(12);hitStop(50);
      R18E({update(dt){st.t+=dt;return st.t<.8;},draw(){if(!SP)return;const k2=Math.min(1,st.t/.15),a=st.t<.35?1:1-(st.t-.35)/.45;
        r17Draw(SP,tx,t.y+t.oy+10,(t.h*t.scale*1.9+90)*(.5+.5*k2),{rot:-Math.PI/2,a:Math.max(0,a),anchor:'bottom'});}});
      for(let n=0;n<10;n++)drop(tx+rnd(-20,20),ty,rnd(-300,300),-rnd(200,520));steam(tx,ty,160);
      pools.push({x:tx,y:t.y+t.oy+4,w:t.w*t.scale*2+80,k:1,a:.9});
      t.hurt=.5;toss(t,30,300);if(t.alive)r21HitNS(u,t,sk);}});
  for(const t of al)if(!hitd.has(t)&&t.alive)r21HitNS(u,t,sk);
  await tween(300,k=>{F.a=1-k;});F.on=false;
  // 5) az üst visszabillen és visszasüllyed, a tócsák felszívódnak
  await tween(320,k=>{C.rot=1.45*(1-easeIO(k));C.dx=14*(1-k);});sfx('earthm');
  await tween(380,k=>{C.rise=1-k*k;});C.a=0;
  await tween(500,k=>{for(const p of pools)p.a=Math.min(p.a,.9*(1-k));});
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
  // 1) (oa01 2.: „vonja be lávás”) Grog a földbe szúrja a fejszét: a földből festett lávaoszlop (lavafx) tör fel, és bevonja
  //    a pengét – a fejsze izzó, csöpögő lávás lesz (festett csobbanás narancsra színezve = lávacseppek)
  const LV=FX_IMG.lavafx,LD=r21Filt(R17I.brewsplash,'hue-rotate(112deg) saturate(2.2) brightness(1.2)');
  const lavaDrop=(x,y,vx,vy,sz)=>r21PD(LD,x,y,{vx,vy,g:900,life:rnd(.5,.9),size:sz||rnd(20,36),vr:rnd(-6,6)});
  sfx('roar');const glowA={a:0};
  R18E({update(){return glowA.a>0||!glowA.done;},draw(){if(glowA.a<=0)return;const p=KP(u,.55,.13);ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,ah*.7,'255,120,30',.6*glowA.a);ctx.restore();}});
  await bodyWind(u,300,.22);
  {const p=KP(u,.55,.13),gy2=u.y+u.oy,st={t:0};sfx('rock');sfx('fire');shake(12);rumble&&rumble(.8,6);
   if(LV)R18E({update(dt){st.t+=dt;return st.t<.9;},draw(){const k=st.t/.9,rise=Math.min(1,k/.3),a=k<.6?1:1-(k-.6)/.4,top=p.y-30,hh=(gy2-top)*rise,w=hh*LV.width/LV.height*1.1;
     ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(p.x,gy2-hh*.5,hh*.5,'255,100,20',.45);ctx.drawImage(LV,p.x-w/2,gy2-hh,w,hh);ctx.drawImage(LV,p.x-w*.35,gy2-hh,w*.7,hh);ctx.restore();}});
   await tween(520,k=>{glowA.a=k;if(Math.random()<.7)lavaDrop(p.x+rnd(-20,20),p.y+rnd(-10,30),rnd(-120,120),-rnd(80,300));});}
  await wait(80);
  // 2) elengedés: rövid lassítás, a kép fejsze nélküli, a festett fejsze pörögve, lángcsóvát húzva repül
  hitStop(90);flash('255,180,80',.25,.1);glowA.a=0;glowA.done=true;r21NoAxe(true);pose='cast';sfx('whoosh');sfx('fire');bodyStrike(u,160,-.28);shake(8);
  const h0=KP(u,.3,.17),x1=cx(t)-t.w*t.scale*.15,y1=midY(t),A1={x:h0.x,y:h0.y,r:0,a:1,on:true,spin:true,vx:1,vy:0,trail:1},lx={x:h0.x,y:h0.y};
  R18E({update(dt){if(A1.spin)A1.r+=dt*26;A1.vx=A1.x-lx.x;A1.vy=A1.y-lx.y;lx.x=A1.x;lx.y=A1.y;
      if(A1.on&&Math.random()<.6)lavaDrop(A1.x+rnd(-ah*.3,ah*.3),A1.y+rnd(-ah*.3,ah*.3),rnd(-60,60),rnd(-40,80));if(A1.on&&A1.trail>0&&Math.random()<.4)ember(A1.x+rnd(-ah*.25,ah*.25),A1.y+rnd(-ah*.25,ah*.25),rnd(-60,60),rnd(-60,40));return A1.on;},
    draw(){if(!AX||!AX.width)return;
      // festett tűzcsóva a fejsze mögött, a repülés irányába fordítva
      if(MT&&A1.trail>0&&Math.hypot(A1.vx,A1.vy)>1.5){const ang=Math.atan2(A1.vy,A1.vx),L=ah*2.4;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.9*A1.trail;
        ctx.translate(A1.x,A1.y);ctx.rotate(ang-Math.atan2(MT.height*.62,MT.width*.9));const h=L*MT.height/MT.width;ctx.drawImage(MT,-L*.92,-h*.82,L,h);ctx.restore();}
      ctx.save();ctx.globalAlpha=A1.a;ctx.translate(A1.x,A1.y);ctx.rotate(A1.r);const w=ah*AX.width/AX.height;ctx.drawImage(AX,-w/2,-ah*.62,w,ah);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55;ctx.drawImage(r21Filt(AX,'sepia(1) saturate(6) hue-rotate(-18deg) brightness(1.2)'),-w/2,-ah*.62,w,ah);ctx.restore();}});
  const d=Math.hypot(x1-h0.x,y1-h0.y),ms=Math.max(420,d*.8);let wh=0;
  await tween(ms,k=>{const e=k*(.55+.45*k);A1.x=h0.x+(x1-h0.x)*e;A1.y=h0.y+(y1-h0.y)*e-Math.sin(e*Math.PI)*110;if(k-wh>.2){wh=k;sfx('whoosh');}});
  // 3) becsapódás: a fejsze beleáll, hatalmas festett tűzrobbanás, lángcsíkok minden irányba
  A1.spin=false;A1.r=.9;hitStop(160);shake(26);flash('255,170,70',.4,.14);sfx('slash');sfx('punch');sfx('boom');
  {const bs={t:0};R18E({update(dt){bs.t+=dt;return bs.t<.7;},draw(){if(!GB)return;const k=Math.min(1,bs.t/.18),a=bs.t<.3?1:1-(bs.t-.3)/.4;ctx.save();ctx.globalCompositeOperation='lighter';
      r17Draw(GB,x1,y1,(t.h*t.scale*2.4+160)*(.4+.6*k),{a:Math.max(0,a)});r17Draw(GB,x1,y1,(t.h*t.scale*1.4+80)*(.6+.4*k),{rot:.6,a:Math.max(0,a)*.8});ctx.restore();}});}
  if(MT)for(let i=0;i<8;i++){const an=i/8*6.283+rnd(-.2,.2),sp=rnd(380,620);r21PD(MT,x1,y1,{vx:Math.cos(an)*sp,vy:Math.sin(an)*sp,life:.45,size:rnd(140,220),rot:an+Math.PI,vr:0,add:true,drag:2});}
  for(let i=0;i<16;i++)ember(x1,y1,rnd(-420,420),rnd(-460,120));for(let i=0;i<14;i++)lavaDrop(x1,y1,rnd(-380,380),-rnd(120,520),rnd(24,44));
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
          /* (oa05 2.: „haladjon át az ellenfeleken”) nem áll bele: átfúródik és továbbrepül */}
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
  const hx=Math.max(...S.heroes.filter(h=>h.alive).map(h=>cx(h)+h.w*h.scale*.4)),R=Math.max(200,Math.min((maxX-minX)/2+140,mx-hx-30)),cY=gy-30,maxH=Math.max(...al.map(t=>t.h*t.scale));
  await dimTo(.35,'30,18,4',200);await chargeBow(u,380,'255,190,90');u.pose='attack';
  // 1) a nyíl a csoport közepére, a földbe csapódik
  sfx('slash');await bigArrow(bowPos(u),{x:mx,y:cY},{arc:60,size:150,trail:['255,190,90','255,230,160','255,255,255']});
  sfx('splash');shake(12);hitStop(70);flash('255,200,120',.25,.1);
  const SPL={t:0};R18E({update(dt){SPL.t+=dt;return SPL.t<1;},draw(){if(!SP)return;const k=Math.min(1,SPL.t/.2),a=SPL.t<.5?1:1-(SPL.t-.5)/.5;r17Draw(SP,mx,cY+30,(R*1.1)*(.4+.6*k),{anchor:'bottom',a:Math.max(0,a)});}});
  // 2) forró teaörvény: a festett tea-hullám három példányban körbe-körbe forog mindenki körül
  const V={a:0,r:.3,ang:0,on:true},N=5;
  const wavePos=i=>{const an=V.ang+i*Math.PI*2/N;return {an,x:mx+Math.cos(an)*R*V.r,y:cY+Math.sin(an)*R*V.r*.32,front:Math.sin(an)>-.15};};
  const drawWave=(i)=>{if(!WV)return;const p=wavePos(i),w=R*1.5*(.6+.4*V.r)*(1+.12*Math.sin(V.ang*2+i)),h=w*WV.height/WV.width*1.35;
    ctx.save();ctx.globalAlpha=V.a*(p.front?1:.75);ctx.translate(p.x,p.y);ctx.scale(Math.cos(p.an)>0?-1:1,1);ctx.drawImage(WV,-w/2,-h*.92,w,h);ctx.restore();};
  // a hátsó félkör a figurák MÖGÖTT (az első ellenség kirajzolása előtt), az első félkör előttük (effekt-rétegben)
  R18E({update(dt){V.frame=(V.frame||0)+1;if(V.on){for(let n=0;n<3;n++){const an=rnd(0,6.29);part({x:mx+Math.cos(an)*R*V.r,y:cY+Math.sin(an)*R*V.r*.32-rnd(0,40),vx:-Math.sin(an)*160,vy:-rnd(40,160),life:rnd(.4,.8),size:rnd(4,8),rgb:pick(['230,150,50','255,200,110','190,110,30']),add:false,g:300});}
      if(Math.random()<.5)puffs(mx+rnd(-R,R)*V.r,cY-rnd(20,maxH*.6),1,['245,240,232','230,226,220'],[24,40],{w:10,h:10,up:120});
      if(Math.random()<.45&&SP){const an=rnd(0,6.29);r21PD(SP,mx+Math.cos(an)*R*V.r,cY+Math.sin(an)*R*V.r*.32-rnd(20,80),{vx:-Math.sin(an)*260,vy:-rnd(220,480),g:800,life:rnd(.6,.9),size:rnd(40,70),vr:rnd(-6,6)});}
      if(Math.random()<.25&&R17I.teacloud)r21PD(r21Filt(R17I.teacloud,'saturate(.2) brightness(1.3)'),mx+rnd(-R,R)*V.r,cY-rnd(40,maxH),{vx:rnd(-40,40),vy:-rnd(80,180),life:1.2,size:rnd(110,170),grow:70,vr:rnd(-.5,.5),a:.6});}return V.on||V.a>0;},
    draw(){if(V.a>0)for(let i=0;i<N;i++)if(wavePos(i).front)drawWave(i);}});
  {const de=drawEntity;let fr=-1;
   drawEntity=function(e){if(V.a>0&&al.includes(e)&&fr!==V.frame){fr=V.frame;try{for(let i=0;i<N;i++)if(!wavePos(i).front)drawWave(i);}catch(err){}}return de.apply(this,arguments);};
   V.restore=()=>{if(drawEntity!==de){drawEntity=de;}V.a=0;V.on=false;};VV=V;}
  sfx('water');sfx('wind');popLabel(al[0],'TEAÖRVÉNY!','#ffc070');
  let sp=0;
  await tween(1800,k=>{V.a=Math.min(1,k*5);V.r=Math.min(1,.3+k*2);V.ang+=.13+.1*Math.sin(k*Math.PI);
    for(const t of al){t.hurt=.2;t.oy=(t._r21vy0??(t._r21vy0=t.oy))-Math.abs(Math.sin(k*12+cx(t)))*8;}
    if(k-sp>.18){sp=k;sfx('splash');shake(5);}});
  // 3) az örvény összecsap mindenkin: forrázás
  shake(16);hitStop(90);flash('255,210,140',.28,.12);sfx('splash');sfx('steam');
  for(const t of al){t.oy=t._r21vy0??t.oy;delete t._r21vy0;puffs(cx(t),midY(t),10,['245,240,232','232,228,220'],[26,44],{w:50,h:50,up:140});
    sparks(cx(t),midY(t),['255,200,110','255,255,255'],14,360);toss(t,300,820);/* (oa06: a végén magasra feldobja az ellenfelet) */if(t.alive)r21HitNS(u,t,sk);}
  await tween(420,k=>{V.a=1-k;V.r=1+k*.25;V.ang+=.1;});V.on=false;V.a=0;V.restore();
  await wait(150);await dimTo(0,null,200);
  }finally{if(VV)VV.restore();for(const t of al)if(t._r21vy0!=null){t.oy=t._r21vy0;delete t._r21vy0;}rel();}
};

// ---------- Kaelen – Bambuszdöfés (egy célpont, páncéltörés) ----------
SK.bamboothrust={name:'Bambuszdöfés',mp:16,cd:1,tgt:'enemy',kind:'phys',pow:2.2,elem:'nature',anim:'bambooThrust',status:['defDown',.5,1],
  desc:'Kaelen parancsára az ellenség előtt vastag bambuszlándzsa tör ki ferdén a földből, és felnyársalja. 50% eséllyel 1 körre gyengíti a védelmét.'};
SHOP_SKILLS.druid.push(['bamboothrust','10-1',5400]);
A.bambooThrust=async(u,ts,sk)=>{
  // (oa07 2.: „a földből jöjjön ki a bambusz olyan szögben, ahogy most van, csak vastagabban; lökje hátra az ellenfelet,
  // kvázi felnyársalja, aztán visszajöhet, ha életben marad”): Kaelen a földre irányítja a tenyerét; az ellenfél előtt
  // a földből ferdén, vastag festett bambuszlándzsa (fx7-bamboospear) tör ki, átdöfi, hátralöki és megemeli; kitart,
  // aztán a lándzsa visszahúzódik a földbe, az ellenfél (ha él) visszaesik a helyére.
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'cast');
  const t0={ox:t.ox||0,oy:t.oy||0};
  try{
  const BS=R17I.bamboospear,LF=R17I.leaf,DU=r21Filt(R17I.teacloud,'saturate(.45) brightness(.8)'),CL=R17I.clods||R17I.pebble;
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:240,life:rnd(.7,1.2),size:rnd(18,30),vr:rnd(-6,6),drag:1.2});
  const tw=t.w*t.scale,th=t.h*t.scale,gy=t.y+t.oy+6,bx=cx(t)-tw*.75,ang=-.62;   // a kitörés helye az ellenfél előtt, ferdén előre-felfelé
  const L=Math.max(380,Math.hypot(cx(t)+tw*.6-bx,gy-midY(t)+40)*1.25),TH=Math.max(170,th*.85);   // vastag bambusz (a kép csak kb. negyedmagasságú szárat tartalmaz)
  const B={k:0,on:true};
  R18E({update(){return B.on;},draw(){if(!BS||B.k<=0)return;const len=L*B.k;ctx.save();ctx.beginPath();ctx.rect(-50,-200,W+100,gy+4+200);ctx.clip();
    ctx.translate(bx,gy+8);ctx.rotate(ang);ctx.drawImage(BS,len-L,-TH/2,L,TH);ctx.restore();}});
  // 1) Kaelen a föld felé fordítja a tenyerét, zöld erő a talajban
  sfx('spell');{const p=KP(u,.85,.39);for(let i=0;i<8;i++)leaf(p.x,p.y,rnd(-80,120),-rnd(40,140));}
  await bodyWind(u,260,.12);
  sfx('rock');rumble&&rumble(.5,5);let lt=0;
  await tween(320,k=>{if(k-lt>.1){lt=k;r21PD(DU,bx+rnd(-30,30),gy,{vx:rnd(-60,60),vy:-rnd(20,60),life:.8,size:rnd(60,90),grow:40,a:.7});}});
  // 2) KITÖR: a vastag bambusz ferdén kiszakad a földből, átdöfi és megemeli, hátralöki
  sfx('crunch');sfx('slash');shake(20);hitStop(120);flash('200,240,140',.25,.1);bodyStrike(u,140,-.18);
  for(let i=0;i<8;i++)r21PD(CL,bx+rnd(-20,30),gy-rnd(0,10),{vx:rnd(-160,260),vy:-rnd(240,520),g:950,life:rnd(.6,.9),size:rnd(24,40),vr:rnd(-8,8)});
  for(let i=0;i<4;i++)r21PD(DU,bx+rnd(-30,40),gy-rnd(0,20),{vx:rnd(-120,160),vy:-rnd(40,120),life:1,size:rnd(90,140),grow:60,a:.8});
  t.hurt=.8;
  await tween(240,k=>{const e=1-Math.pow(1-k,3);B.k=e;t.ox=t0.ox+80*e;t.oy=t0.oy-70*e;t.spin=-.22*e;});
  {const x=cx(t),y=midY(t);for(let n=0;n<16;n++)leaf(x,y,rnd(-200,380),rnd(-300,100));sparks(x,y,['200,240,150','255,255,255'],22,440);}
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'FELNYÁRSALVA!','#b8e07a');
  // 3) kitart: a nyárson rángatózik
  await tween(900,k=>{t.oy=t0.oy-70-6*Math.sin(k*30)*(1-k);t.hurt=.4;});
  // 4) a bambusz visszahúzódik a földbe, az ellenfél visszaesik a helyére
  sfx('whoosh');
  await tween(380,k=>{const e=easeIO(k);B.k=1-e;t.ox=t0.ox+80*(1-e);t.oy=t0.oy-70*(1-e)*(1-e);t.spin=-.22*(1-e);});
  B.on=false;t.ox=t0.ox;t.oy=t0.oy;t.spin=0;shake(8);r21PD(DU,cx(t),gy,{vx:0,vy:-30,life:.8,size:110,grow:50,a:.7});
  await bodySettle(u,200);
  }finally{B_cleanup:{t.spin=0;}rel();}
};

// ---------- Morgána – Holdfogyatkozás (mindenkire, altatás) ----------
// Festett fekete hold (fx7-blackmoon) emelkedik az ellenség fölé, elsötétül az ég; a korona lüktet, majd a hold
// sötét fénydarabjai (a festett hold kicsinyített másai) rázuhannak minden ellenségre.
SK.eclipse={name:'Telihold átka',mp:28,cd:2,tgt:'enemy',kind:'phys',pow:3.0,elem:'dark',anim:'eclipseMoon',status:['defDown',.6,1],
  desc:'Morgána elűzi a felhőket: előbukkan a telihold, és egy társa farkasemberré változik, aki széttépi a kiválasztott ellenséget. Nagy sebzés, 60% eséllyel 1 körre gyengíti a védelmét.'};
SHOP_SKILLS.witch.push(['eclipse','6-1',3200]);
A.eclipseMoon=async(u,ts,sk)=>{
  // (oa04 2.: „a felhők közül megjelenik a telihold, egy hős társa farkasemberré változik, és karmolással megtámad egy ellenfelet;
  // festett és látványos”): festett felhők (fx7-teacloud, sötétre színezve) úsznak szét, mögülük előtűnik a festett telihold
  // (fx7-fullmoon); egy véletlen társ sötét füstben a festett farkasemberré (fx7-werewolf) alakul, üvölt, nagy ugrással rátámad
  // a célpontra és háromszor belekarmol (festett karomvágás: fx7-darkslash ezüst-vörösre színezve), aztán visszaugrik és visszaváltozik.
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'cast');
  const pals=S.heroes.filter(h=>h.alive&&h!==u),ally=pals.length?pick(pals):u;const a0=ally.alpha==null?1:ally.alpha;
  try{
  const MO=R17I.fullmoon,CL=r21Filt(R17I.teacloud,'grayscale(.7) brightness(.35) hue-rotate(200deg)'),WF=R17I['werewolf_'+ally.type]||R17I.werewolf,SL=r21Filt(R17I.darkslash,'hue-rotate(110deg) saturate(1.6) brightness(1.15)'),SM=r21Filt(R17I.teacloud,'grayscale(1) brightness(.25)');
  const mx=W*.5,my=110,MR=Math.min(170,W*.14);
  const M={a:0,s:.85,y:my+30},CLS=[];for(let i=0;i<5;i++)CLS.push({x:mx+(i-2)*MR*.55,y:my+rnd(-30,40),s:MR*rnd(1.3,1.9),dx:(i<2?-1:i>2?1:(Math.random()<.5?-1:1))*rnd(.9,1.4),a:0});
  const SKY={on:true};
  R18E({update(){return SKY.on;},draw(){if(MO&&M.a>0){ctx.save();ctx.globalAlpha=M.a;ctx.globalCompositeOperation='lighter';glow(mx,M.y,MR*1.9,'190,215,255',.35*M.a);ctx.restore();r17Draw(MO,mx,M.y,MR*2*M.s,{a:M.a});}
    if(CL)for(const c of CLS){if(c.a<=0)continue;r17Draw(CL,c.x,c.y,c.s,{a:c.a});}}});
  // 1) éjszaka: sötétség, felhők gyűlnek a hold elé
  sfx('dark');dimTo(.82,'6,8,24',500);
  await tween(500,k=>{for(const c of CLS)c.a=k*.95;M.a=k*.35;});
  // 2) Morgána int, a felhők szétúsznak, a telihold kiragyog
  sfx('wind');{const h=handPos(u);for(let i=0;i<4;i++)r21PD(SM,h.x,h.y,{vx:rnd(-60,60),vy:-rnd(40,100),life:.8,size:rnd(50,80),grow:40,a:.6});}
  await tween(800,k=>{const e=easeIO(k);for(const c of CLS){c.x+=c.dx*6*(0.3+k);c.a=.95*(1-e*.85);}M.a=.35+.65*e;M.s=.85+.15*e;M.y=my+30-30*e;});
  flash('200,220,255',.3,.2);sfx('holy');popLabel(ally,'TELIHOLD ÁTKA!','#cfe0ff');
  // 3) a társ átváltozik: remeg, sötét füst gomolyog, a festett farkasember lép elő
  const W0={a:0,x:cx(ally),y:ally.y+ally.oy,h:ally.h*ally.scale*1.45,fl:false,lean:0,on:true};
  R18E({update(){return W0.on;},draw(){if(!WF||W0.a<=0)return;const w=W0.h*WF.width/WF.height;ctx.save();ctx.globalAlpha=W0.a;ctx.translate(W0.x,W0.y);ctx.rotate(W0.lean);if(W0.fl)ctx.scale(-1,1);
    ctx.save();ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,0,0,0,w*.5);g.addColorStop(0,'rgba(0,0,0,.5)');g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,w*.5,0,6.29);ctx.fill();ctx.restore();
    ctx.drawImage(WF,-w*.45,-W0.h,w,W0.h);ctx.restore();}});
  sfx('growl');let ls=0;
  await tween(700,k=>{ally.ox=Math.sin(k*70)*4*k;if(k-ls>.08){ls=k;r21PD(SM,cx(ally)+rnd(-40,40),ally.y+ally.oy-rnd(20,ally.h*ally.scale*.8),{vx:rnd(-50,50),vy:-rnd(30,90),life:rnd(.8,1.2),size:rnd(80,130),grow:60,vr:rnd(-.5,.5),a:.85});}});
  ally.ox=0;shake(12);flash('180,200,255',.25,.12);
  for(let i=0;i<8;i++)r21PD(SM,W0.x+rnd(-50,50),W0.y-rnd(20,W0.h*.8),{vx:rnd(-160,160),vy:-rnd(40,140),life:rnd(.9,1.3),size:rnd(110,170),grow:70,vr:rnd(-.5,.5),a:.9});
  await tween(260,k=>{ally.alpha=a0*(1-k);W0.a=k;});
  sfx('roar');sfx('wail');shake(16);await tween(320,k=>{W0.lean=-.12*Math.sin(k*Math.PI);});
  // 4) nagy ugrás a célpontra
  const x0=W0.x,y0=W0.y,tx=cx(t)-t.w*t.scale*.55,ty=t.y+t.oy;sfx('whoosh');
  await tween(420,k=>{const e=easeIO(k);W0.x=x0+(tx-x0)*e;W0.y=y0+(ty-y0)*e-Math.sin(k*Math.PI)*170;W0.lean=.25*Math.sin(k*Math.PI);});W0.lean=0;shake(10);
  // 5) három karmolás
  for(let i=0;i<3;i++){sfx('slash');sfx('bite');W0.lean=i%2?.18:-.14;
    const sx=cx(t),sy=midY(t),sz=Math.max(300,t.h*t.scale*2),rot=[-.95,.85,-.5][i]+rnd(-.1,.1),C={k:0,a:1};
    if(SL)R18E({update(){return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.translate(sx,sy);ctx.rotate(rot);if(i===1)ctx.scale(-1,1);const w2=sz,h2=w2*SL.height/SL.width;
      ctx.beginPath();ctx.rect(-w2/2,-h2,w2*C.k,h2*2);ctx.clip();ctx.globalAlpha=C.a;ctx.drawImage(SL,-w2/2,-h2/2,w2,h2);for(const o of [-.12,.12]){ctx.drawImage(SL,-w2/2,-h2/2+h2*o,w2,h2);}ctx.restore();}});
    tween(90,k=>{C.k=k;}).then(()=>tween(320,k=>{C.a=1-k;}));hitStop(70);shake(14);t.hurt=.5;{const o0=t.ox||0;tween(160,k=>{t.ox=o0+22*Math.sin(k*Math.PI);}).then(()=>{t.ox=o0;});}
    if(i===2&&t.alive)r21HitNS(u,t,sk);await wait(230);}
  W0.lean=0;
  // 6) visszaugrik a helyére és visszaváltozik
  const bx=W0.x,by=W0.y;W0.fl=true;sfx('whoosh');
  await tween(420,k=>{const e=easeIO(k);W0.x=bx+(x0-bx)*e;W0.y=by+(y0-by)*e-Math.sin(k*Math.PI)*150;});W0.fl=false;
  for(let i=0;i<6;i++)r21PD(SM,W0.x+rnd(-40,40),W0.y-rnd(20,W0.h*.8),{vx:rnd(-120,120),vy:-rnd(40,120),life:1,size:rnd(100,150),grow:60,a:.85});
  sfx('dark');await tween(320,k=>{W0.a=1-k;ally.alpha=a0*k;});W0.on=false;
  await tween(500,k=>{M.a=1-k;for(const c of CLS)c.a=0;});SKY.on=false;
  await dimTo(0,null,300);
  }finally{ally.alpha=a0;ally.ox=0;rel();}
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
  sfx('spell');sfx('growl');await dimTo(.45,'6,20,4',200);rumble&&rumble(.8,5);
  {const p=palm();for(let i=0;i<14;i++)leaf(p.x,p.y,rnd(-160,200),-rnd(40,220));}
  sfx('rock');await tween(300,k=>{const e=easeIO(k);A0.a=Math.min(1,k*3);A0.k=e;A0.ang=aimAng-1.2-.45*e;u.lean=.16*e;});
  popLabel(al[0],'ERDŐ HARAGJA!','#9ee06a');
  // 2) magasra emeli (Kaelen hátradől), remeg a feszültségtől
  sfx('wind');await tween(220,k=>{A0.wob=.015*k;});
  for(let i=0;i<10;i++)leaf(P0.x+rnd(0,Wf*.5),P0.y-rnd(60,200),rnd(-120,120),rnd(-60,60));
  // 3) VILLÁMGYORS LECSAPÁS az összes ellenfélre
  sfx('whoosh');A0.wob=0;await tween(120,k=>{const e=k*k;A0.ang=aimAng-1.65+(1.65+.08)*e;u.lean=.16-.36*e;});
  hitStop(140);shake(26);flash('255,235,190',.25,.1);sfx('crunch');sfx('earthm');sfx('hit');
  for(const t of al){const x=cx(t),y=midY(t);for(let n=0;n<10;n++)leaf(x,y,rnd(-300,300),rnd(-340,-40));for(let n=0;n<8;n++)bark(x,y,rnd(-280,280),rnd(-420,-120));
    sparks(x,y,['255,240,200','210,190,140'],18,420);t.hurt=.7;toss(t,60,380);if(t.alive)r21HitNS(u,t,sk);}
  await tween(140,k=>{A0.ang=aimAng+.08-.08*easeIO(k);});
  await wait(220);
  // 4) visszahúzódik a tenyerébe
  sfx('whoosh');await tween(340,k=>{const e=easeIO(k);A0.k=1-e;A0.a=1-Math.max(0,(k-.4)/.6);A0.ang=aimAng-.5*e;u.lean=-.2*(1-e);});
  A0.done=true;A0.a=0;u.lean=0;await dimTo(0,null,250);
  }finally{rel();}
};
