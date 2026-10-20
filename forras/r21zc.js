
// ===== 43. kör: új támadások (a hősöknél kevés volt az egyedi / mindenkire ható) =====
// Mind festett képekkel: fx7-cauldron, fx7-brewsplash (új), wpn-axe (Grog saját fejszéje), fx7-bamboospear,
// fx7-teawave, fx7-teasplash. A kód csak mozgatja, forgatja, méretezi őket, és port/cseppeket ad hozzá.

// sebzés gödör/kráter nélkül (A5: földhalom nem kell)
function r21HitNS(u,t,sk){S._r21noSink=true;try{return hit(u,t,sk);}finally{S._r21noSink=false;}}

// ---------- Morgána – Üst-kitörés (mindenkire, méreg) ----------
SK.cauldron={name:'Üst-kitörés',mp:22,cd:1,tgt:'enemies',kind:'mag',pow:1.3,elem:'poison',anim:'cauldronBurst',status:['poison',.6,2],
  desc:'Morgána elé kiemelkedik a boszorkányüst, felforr, és mérgező főzetet zúdít minden ellenségre. 60% eséllyel megmérgezi őket.'};
SHOP_SKILLS.witch.push(['cauldron','3-2',1100]);
A.cauldronBurst=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const CI=R17I.cauldron,SP=R17I.brewsplash,Hs=u.h*u.scale,ch=Hs*.85;
  // a nagy üst közvetlenül Morgána ELŐTT emelkedik ki a földből (az ő talajvonalán)
  const gx=cx(u)+u.w*u.scale*.35+ch*.5,gy=u.y+u.oy+4;
  const C={a:1,rise:0,rot:0,sq:1,jolt:0};
  const mouth=()=>({x:gx,y:gy-ch*C.rise*.86+C.jolt});
  R18E({update(){return C.a>0;},draw(){if(!CI||C.rise<=0)return;const h=ch*C.rise,w=ch*CI.width/CI.height;
    ctx.save();ctx.globalAlpha=C.a;
    // árnyék a talajon
    ctx.save();ctx.translate(gx,gy);ctx.scale(1,.22);const sg=ctx.createRadialGradient(0,0,0,0,0,w*.6);sg.addColorStop(0,'rgba(0,0,0,.55)');sg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(0,0,w*.6,0,6.29);ctx.fill();ctx.restore();
    // az üst a földből emelkedik: alul levágva, amíg ki nem ér
    ctx.beginPath();ctx.rect(gx-w,gy-ch*1.6,w*2,ch*1.6+2);ctx.clip();
    ctx.translate(gx,gy+ch*(1-C.rise)+C.jolt);ctx.rotate(C.rot);ctx.scale(1/C.sq,C.sq);ctx.drawImage(CI,-w/2,-ch,w,ch);ctx.restore();}});
  await dimTo(.38,'14,6,20',260);
  // 1) Morgána kézmozdulata, a földből kiemelkedik az üst
  sfx('dark');sfx('earthm');rumble&&rumble(.6,5);
  {const h=handPos(u);for(let i=0;i<18;i++)part({x:h.x+rnd(-16,16),y:h.y+rnd(-16,16),vx:rnd(-50,50),vy:-rnd(20,90),life:.6,size:rnd(3,6),rgb:pick(['170,90,240','120,60,200']),add:true});}
  await tween(460,k=>{C.rise=eOutBack(k);if(Math.random()<.6)part({x:gx+rnd(-ch*.5,ch*.5),y:gy-rnd(0,8),vx:rnd(-90,90),vy:-rnd(40,140),life:rnd(.5,.9),size:rnd(14,26),grow:20,rgb:pick(['92,74,58','70,56,44']),add:false,shape:'smoke'});});
  C.rise=1;
  // 2) felforr: bugyog, rázkódik, lila buborékok és gőz
  sfx('squish');sfx('poison');
  await tween(720,k=>{C.rot=Math.sin(k*40)*.035*(.4+k);C.sq=1+Math.sin(k*28)*.03*(.5+k);const m=mouth();
    if(Math.random()<.9)part({x:m.x+rnd(-ch*.32,ch*.32),y:m.y+rnd(-4,6),vx:rnd(-30,30),vy:-rnd(60,190),life:rnd(.4,.8),size:rnd(4,10),rgb:pick(['170,90,240','200,140,255','120,60,200']),add:true,g:-40});
    if(Math.random()<.35)part({x:m.x+rnd(-ch*.3,ch*.3),y:m.y-rnd(0,20),vx:rnd(-20,20),vy:-rnd(40,90),life:rnd(.8,1.3),size:rnd(18,30),grow:26,rgb:pick(['150,110,190','110,80,150']),add:false,shape:'smoke'});
    if(Math.random()<.12)sfx('squish');});
  // 3) KITÖR: az üst megugrik, a festett főzet ívben minden ellenségre zúdul
  C.rot=0;sfx('splash');sfx('boom');shake(14);hitStop(70);flash('150,60,210',.25,.12);
  tween(160,k=>{C.jolt=-26*Math.sin(k*Math.PI);C.sq=1-.12*Math.sin(k*Math.PI);});
  {const m=mouth();for(let i=0;i<40;i++)part({x:m.x+rnd(-30,30),y:m.y,vx:rnd(-160,260),vy:-rnd(260,620),life:rnd(.6,1),size:rnd(5,12),rgb:pick(['170,90,240','200,140,255','110,50,190']),add:false,g:900});}
  popLabel(al[0],'ÜST-KITÖRÉS!','#c890ff');
  await Promise.all(al.map((t,i)=>wait(i*90).then(()=>new Promise(res=>{
    const m=mouth(),x0=m.x,y0=m.y,x1=cx(t),y1=midY(t),hgt=Math.max(140,Math.abs(x1-x0)*.32),ms=520+i*30,st={t:0,done:false};
    const pos=k=>[x0+(x1-x0)*k,y0+(y1-y0)*k-Math.sin(k*Math.PI)*hgt];
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),[x,y]=pos(k);
        for(let n=0;n<2;n++)part({x:x+rnd(-12,12),y:y+rnd(-12,12),vx:rnd(-40,40),vy:rnd(-30,60),life:rnd(.3,.6),size:rnd(4,9),rgb:pick(['170,90,240','200,140,255']),add:false,g:500});
        if(k>=1&&!st.done){st.done=true;res();}return k<1;},
      draw(){if(!SP)return;const k=Math.min(1,st.t/ms),[x,y]=pos(k),[px,py]=pos(Math.max(0,k-.03)),w=170+150*k;
        r17Draw(SP,x,y,w,{rot:Math.atan2(y-py,x-px),fx:true});}});
  }).then(()=>{
    // becsapódás: a festett főzet szétfröccsen az ellenségen
    const x=cx(t),y=midY(t),st={t:0},rot=rnd(-.3,.3);sfx('splash');shake(9);
    R18E({update(dt){st.t+=dt;return st.t<.9;},draw(){if(!SP)return;const k=Math.min(1,st.t/.16),a=st.t<.45?1:1-(st.t-.45)/.45;
      r17Draw(SP,x-20,y+10,(t.w*t.scale*1.6+80)*(.5+.5*k),{rot:Math.PI/2+.35+rot,a:Math.max(0,a)*.95});
      r17Draw(SP,x+10,y-10,(t.w*t.scale*1.2+60)*(.5+.5*k),{rot:-Math.PI/2+.4+rot,fx:true,a:Math.max(0,a)*.8});}});
    for(let n=0;n<34;n++)part({x:x+rnd(-20,20),y:y+rnd(-20,20),vx:rnd(-320,320),vy:-rnd(80,420),life:rnd(.5,.9),size:rnd(4,10),rgb:pick(['170,90,240','200,140,255','110,50,190']),add:false,g:900});
    puffs(x,y,6,['150,110,190','120,80,160'],[22,40],{w:50,h:40,up:90});
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
  const t=ts&&ts[0];if(!t||!t.alive)return;let pose='attack';const st0={on:true};
  R18E({update(){if(st0.on)u.pose=pose;return st0.on;}});
  const AX=r21AxeImg(),Hs=u.h*u.scale,ah=Hs*.62;
  try{
  // 1) hátralendül, a fejsze a feje fölött izzik
  sfx('roar');await bodyWind(u,320,.2);
  {const p=KP(u,.3,.1);for(let i=0;i<14;i++)part({x:p.x+rnd(-30,30),y:p.y+rnd(-20,20),vx:rnd(-40,40),vy:-rnd(30,100),life:.5,size:rnd(3,6),rgb:pick(['255,150,40','255,210,90']),add:true});}
  await wait(120);
  // 2) elhajítja: a kép fejsze nélküli (üres ököl), a festett fejsze pörögve repül
  r21NoAxe(true);pose='cast';sfx('whoosh');bodyStrike(u,160,-.24);
  const h0=KP(u,.3,.17),x1=cx(t),y1=midY(t),A1={x:h0.x,y:h0.y,r:0,a:1,on:true};
  R18E({update(dt){A1.r+=dt*22;if(A1.on)for(let i=0;i<3;i++)part({x:A1.x+rnd(-ah*.3,ah*.3),y:A1.y+rnd(-ah*.3,ah*.3),vx:rnd(-60,60),vy:rnd(-80,20),life:rnd(.25,.45),size:rnd(4,9),rgb:pick(['255,140,30','255,200,80','255,90,20']),add:true,grow:-8});return A1.on;},
    draw(){if(!AX||!AX.width)return;ctx.save();ctx.globalAlpha=A1.a;ctx.translate(A1.x,A1.y);ctx.rotate(A1.r);const w=ah*AX.width/AX.height;ctx.drawImage(AX,-w/2,-ah*.62,w,ah);ctx.restore();}});
  const d=Math.hypot(x1-h0.x,y1-h0.y),ms=Math.max(380,d*.75);let wh=0;
  await tween(ms,k=>{const e=k*k*(.4+.6*k)+k*.0;A1.x=h0.x+(x1-h0.x)*k;A1.y=h0.y+(y1-h0.y)*k-Math.sin(k*Math.PI)*90;if(k-wh>.22){wh=k;sfx('whoosh');}});
  // 3) becsapódás
  hitStop(110);shake(20);flash('255,150,60',.3,.12);sfx('slash');sfx('punch');
  sparks(x1,y1,['255,160,60','255,230,140','255,255,255'],34,560);burst(x1,y1,'255,120,40',24,320);
  puffs(x1,y1+20,6,['120,100,80','90,76,62'],[22,40],{w:40,h:30,up:80});
  t.hurt=.5;{const o0=t.ox||0;tween(260,k=>{t.ox=o0+38*Math.sin(k*Math.PI)*(1-k*.4);}).then(()=>{t.ox=o0;});}
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'FEJSZE!','#ffb060');
  await wait(140);
  // 4) visszarepül Grog kezébe (alsó ívben)
  const h1=KP(u,.6,.14),bx=A1.x,by=A1.y;sfx('whoosh');
  await tween(Math.max(360,d*.62),k=>{const e=easeIO(k);A1.x=bx+(h1.x-bx)*e;A1.y=by+(h1.y-by)*e+Math.sin(k*Math.PI)*70;});
  A1.on=false;r21NoAxe(false);pose='attack';sfx('block');shake(6);
  {const p=KP(u,.6,.14);sparks(p.x,p.y,['255,180,80','255,255,255'],14,300);}
  await bodySettle(u,240);await wait(120);
  }finally{r21NoAxe(false);st0.on=false;u.pose='idle';}
};

// ---------- Grog – Vállroham (egy célpont, kábítás) ----------
SK.shouldercharge={name:'Vállroham',mp:10,cd:1,tgt:'enemy',kind:'phys',pow:1.9,elem:'phys',anim:'shoulderCharge',status:['stun',.4,1],
  desc:'Grog nekiiramodik, és teljes testével vállal az ellenségbe rohan, hátralöki. 40% eséllyel 1 körre elkábítja.'};
SHOP_SKILLS.orc.push(['shouldercharge','4-3',1600]);
A.shoulderCharge=async(u,ts,sk)=>{
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'idle');
  try{
  const tw=t.w*t.scale,uw=u.w*u.scale,dx=(cx(t)-tw*.42-uw*.4)-cx(u),feet=()=>({x:cx(u),y:u.y+u.oy});
  // 1) leszegi a fejét, kaparja a földet
  sfx('growl');await tween(300,k=>{u.lean=.14*easeIO(k);u.sq=1-.07*easeIO(k);});
  for(let i=0;i<3;i++){const f=feet();puffs(f.x-uw*.2,f.y,3,['130,110,86','100,84,66'],[14,24],{w:20,h:6,up:50});shake(3);await wait(90);}
  // 2) roham: előredőlve, porfelhőt húzva, utánkép
  sfx('roar');ghosts(u,420);const o0=u.ox||0;
  await tween(420,k=>{const e=k*k;u.ox=o0+dx*e;u.lean=.14-.44*Math.min(1,k*2);u.sq=1+.04*Math.sin(k*20);u.jump=Math.abs(Math.sin(k*Math.PI*4))*10;
    const f=feet();if(Math.random()<.9)part({x:f.x-uw*.3+rnd(-10,10),y:f.y-rnd(0,10),vx:-rnd(60,200),vy:-rnd(20,80),life:rnd(.5,.9),size:rnd(18,32),grow:28,rgb:pick(['140,118,92','110,94,74']),add:false,shape:'smoke'});
    if(Math.random()<.3)shake(5);});
  u.jump=0;
  // 3) becsapódás vállal: hátralöki
  hitStop(120);shake(22);flash('255,230,180',.3,.12);sfx('punch');sfx('crunch');
  const ix=cx(t)-tw*.35,iy=midY(t);sparks(ix,iy,['255,230,160','255,255,255'],30,520);burst(ix,iy,'255,200,120',20,300);
  puffs(ix,t.y+t.oy,8,['140,118,92','110,94,74'],[24,44],{w:50,h:20,up:90});
  t.hurt=.6;const t0=t.ox||0;
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'VÁLLROHAM!','#ffd27a');
  await tween(260,k=>{const e=eOutBack(k);t.ox=t0+90*e;t.spin=-.12*Math.sin(k*Math.PI);u.ox=o0+dx-30*Math.sin(k*Math.PI);u.lean=-.3+.3*k;});
  // csillagok a fején (kábult)
  for(let i=0;i<8;i++){const a=i/8*6.28;part({x:cx(t)+Math.cos(a)*30,y:topY(t)+Math.sin(a)*8,vx:-Math.sin(a)*60,vy:Math.cos(a)*16,life:.6,size:rnd(4,7),rgb:'255,240,120',add:true});}
  // 4) Grog visszaugrik, az ellenfél visszacsúszik
  sfx('whoosh');
  await Promise.all([tween(380,k=>{const e=easeIO(k);u.ox=o0+(dx-30*0)*(1-e);u.jump=Math.sin(k*Math.PI)*40;u.lean=0;}),tween(420,k=>{t.ox=t0+90*(1-easeIO(k));t.spin=0;})]);
  u.ox=o0;u.jump=0;t.ox=t0;t.spin=0;await bodySettle(u,200);
  }finally{rel();}
};

// ---------- Jázmin – Bambuszfüggöny (mindenkire, páncéltörés) ----------
SK.bamboocurtain={name:'Bambuszfüggöny',mp:18,cd:1,tgt:'enemies',kind:'phys',pow:1.1,elem:'phys',anim:'bambooCurtain',status:['defDown',.4,1],
  desc:'Jázmin sorokban kilő egy egész függönynyi bambusznyilat, amelyek átfúrják az összes ellenséget. 40% eséllyel 1 körre gyengítik a védelmüket.'};
SHOP_SKILLS.monk.push(['bamboocurtain','8-2',4400]);
A.bambooCurtain=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'attack');
  try{
  const BS=R17I.bamboospear;await dimTo(.4,'10,24,6',200);
  await chargeBow(u,420,'150,220,90');u.pose='attack';
  const b=bowPos(u),top=Math.min(...al.map(t=>topY(t)))+10,bot=Math.max(...al.map(t=>t.y+t.oy))-14,rows=5,waves=5;
  const hits=new Map(al.map(t=>[t,0]));
  // egy bambusznyíl: egyenesen átrepül mindenkin, a pálya végén kirepül a képből
  const arrow=(y)=>new Promise(res=>{const x0=b.x+20,y0=b.y,x1=W+160,st={t:0},ms=520,len=210;
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),x=x0+(x1-x0)*k,yy=y0+(y-y0)*Math.min(1,k*4);
        if(Math.random()<.7)part({x:x-len*.45,y:yy+rnd(-3,3),vx:-rnd(30,90),vy:rnd(-20,20),life:rnd(.2,.4),size:rnd(2,4),rgb:pick(['150,220,90','220,240,150']),add:true});
        for(const t of al){if(!st['h'+al.indexOf(t)]&&Math.abs(x-cx(t))<20&&yy>topY(t)-6&&yy<t.y+t.oy+4){st['h'+al.indexOf(t)]=1;hits.set(t,hits.get(t)+1);t.hurt=.3;
          for(let n=0;n<6;n++)part({x:cx(t)+rnd(-6,6),y:yy,vx:rnd(40,240),vy:rnd(-120,60),life:rnd(.3,.6),size:rnd(5,9),rgb:pick(['120,200,70','180,230,110']),add:false,shape:'leaf',g:200});
          sparks(cx(t),yy,['200,240,140','255,255,255'],5,200);}}
        if(k>=1){res();return false;}return true;},
      draw(){if(!BS)return;const k=Math.min(1,st.t/ms),x=x0+(x1-x0)*k,yy=y0+(y-y0)*Math.min(1,k*4);r17Draw(BS,x-len*.5,yy,len,{rot:(y-y0)/Math.max(1,x1-x0)*(k<.25?2:0)});}});});
  sfx('slash');flash('200,240,140',.2,.08);popLabel(al[0],'BAMBUSZFÜGGÖNY!','#b8e07a');
  const all=[];
  for(let w=0;w<waves;w++){all.push(wait(w*120).then(()=>{sfx('whoosh');if(w%2===0)sfx('slash');shake(4);
    return Promise.all(Array.from({length:rows},(_,r)=>arrow(top+(bot-top)*(r+(w%2?.5:0))/rows)));}));}
  // a nyílfüggöny közben áthatol rajtuk; a végén mindenki megkapja a sebzést
  await wait(waves*120+260);
  for(const t of al){shake(10);sparks(cx(t),midY(t),['150,220,90','255,255,255'],20,420);if(t.alive){hit(u,t,sk);}}
  await Promise.all(all);await wait(200);await dimTo(0,null,200);
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
    sparks(cx(t),midY(t),['255,200,110','255,255,255'],14,360);if(t.alive)r21HitNS(u,t,sk);}
  await tween(420,k=>{V.a=1-k;V.r=1+k*.25;V.ang+=.1;});V.on=false;V.a=0;V.restore();
  await wait(150);await dimTo(0,null,200);
  }finally{if(VV)VV.restore();for(const t of al)if(t._r21vy0!=null){t.oy=t._r21vy0;delete t._r21vy0;}rel();}
};

// ---------- Kaelen – Bambuszdöfés (egy célpont, páncéltörés) ----------
SK.bamboothrust={name:'Bambuszdöfés',mp:16,cd:1,tgt:'enemy',kind:'phys',pow:2.2,elem:'nature',anim:'bambooThrust',status:['defDown',.5,1],
  desc:'Kaelen előrelendül, és egy hosszú bambuszlándzsát döf át az ellenségen. 50% eséllyel 1 körre gyengíti a védelmét.'};
SHOP_SKILLS.druid.push(['bamboothrust','10-1',5400]);
A.bambooThrust=async(u,ts,sk)=>{
  const t=ts&&ts[0];if(!t||!t.alive)return;const rel=keepPose(u,'cast');
  try{
  const BS=R17I.bamboospear,o0=u.ox||0,tw=t.w*t.scale,dx=Math.max(0,(cx(t)-tw*.5-240)-cx(u));
  const S1={len:0,a:0,on:true};
  // a lándzsa Kaelen kezéből indul, a célpont felé mutat
  const palm=()=>{const p=KP(u,.85,.39),l=u.lean||0;if(!l)return p;const x0=cx(u),y0=u.y+u.oy,dx=p.x-x0,dy=p.y-y0,c=Math.cos(l),sn=Math.sin(l);return {x:x0+dx*c-dy*sn,y:y0+dx*sn+dy*c};};
  const aim=()=>{const h=palm();return {h,ang:Math.atan2(midY(t)-h.y,cx(t)-h.x)};};
  R18E({update(){return S1.on;},draw(){if(!BS||S1.a<=0)return;const {h,ang}=aim(),L=S1.len,hh=L*BS.height/BS.width;
    ctx.save();ctx.globalAlpha=S1.a;ctx.translate(h.x,h.y);ctx.rotate(ang);ctx.drawImage(BS,-L*.22,-hh/2,L,hh);ctx.restore();}});
  // 1) a lándzsa kinő a kezéből, Kaelen hátrahúzza
  sfx('spell');kaeLeaves(palm().x,palm().y,10,140);
  await Promise.all([tween(260,k=>{S1.a=k;S1.len=200+60*k;}),bodyWind(u,300,.2)]);
  // 2) nekilendül és döf: a lándzsa megnyúlik és átszúrja az ellenfelet
  sfx('whoosh');ghosts(u,300);
  await tween(300,k=>{const e=k*k;u.ox=o0+dx*e;u.lean=.2-.45*e;
    const f={x:cx(u),y:u.y+u.oy};if(Math.random()<.6)kaeLeaves(f.x-20,f.y-10,1,80);});
  {const {h}=aim();const need=Math.hypot(cx(t)+tw*.55-h.x,midY(t)-h.y)/.78;
   await tween(130,k=>{S1.len=260+(need-260)*eOutBack(k);});}
  hitStop(120);shake(18);flash('200,240,140',.28,.1);sfx('slash');sfx('crunch');
  {const x=cx(t),y=midY(t);kaeLeaves(x,y,26,320);sparks(x,y,['200,240,150','255,255,255'],26,480);burst(x+tw*.4,y,'160,220,90',18,300);
   for(let n=0;n<14;n++)part({x:x+tw*.45,y:y+rnd(-10,10),vx:rnd(120,380),vy:rnd(-120,80),life:rnd(.3,.6),size:rnd(3,6),rgb:'220,240,160',add:true});}
  t.hurt=.6;{const t0=t.ox||0;tween(240,k=>{t.ox=t0+30*Math.sin(k*Math.PI);}).then(()=>{t.ox=t0;});}
  if(t.alive)r21HitNS(u,t,sk);popLabel(t,'ÁTDÖFVE!','#b8e07a');
  await wait(220);
  // 3) kirántja, visszaugrik
  sfx('whoosh');
  await tween(200,k=>{S1.len=Math.max(240,S1.len*(1-k*.4));});
  await tween(360,k=>{const e=easeIO(k);u.ox=o0+dx*(1-e);u.jump=Math.sin(k*Math.PI)*36;u.lean=-.25*(1-e);S1.a=1-k;});
  u.ox=o0;u.jump=0;S1.on=false;await bodySettle(u,200);
  }finally{rel();}
};

// ---------- Morgána – Holdfogyatkozás (mindenkire, altatás) ----------
// Festett fekete hold (fx7-blackmoon) emelkedik az ellenség fölé, elsötétül az ég; a korona lüktet, majd a hold
// sötét fénydarabjai (a festett hold kicsinyített másai) rázuhannak minden ellenségre.
SK.eclipse={name:'Holdfogyatkozás',mp:32,cd:2,tgt:'enemies',kind:'mag',pow:1.5,elem:'dark',anim:'eclipseMoon',status:['sleep',.35,1],
  desc:'Morgána fekete holdat idéz az ellenség fölé: sötét fénye mindenkire rázuhan. 35% eséllyel 1 körre elaltatja őket.'};
SHOP_SKILLS.witch.push(['eclipse','6-1',3200]);
A.eclipseMoon=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const MI=R17I.blackmoon,{mx}=grp(al),top=Math.min(...al.map(t=>topY(t))),my=Math.max(110,top-150),R=Math.max(150,Math.min(240,(Math.max(...al.map(t=>cx(t)))-Math.min(...al.map(t=>cx(t))))*.45+110));
  const M={a:0,s:.3,rot:0,y:my-160,pulse:0};
  R18E({update(dt){M.rot+=dt*.25;return M.a>0||M.on!==false;},draw(){if(!MI||M.a<=0)return;
    ctx.save();ctx.globalAlpha=M.a;r17Draw(MI,mx,M.y,R*2*M.s,{rot:M.rot});
    if(M.pulse>0){ctx.globalCompositeOperation='lighter';r17Draw(MI,mx,M.y,R*2*M.s*(1+.12*M.pulse),{rot:-M.rot*1.3,a:.35*M.pulse});}
    ctx.restore();}});
  // 1) Morgána felemeli a kezét, sötét erő gyűlik
  sfx('dark');{const h=handPos(u);for(let i=0;i<20;i++)part({x:h.x+rnd(-18,18),y:h.y+rnd(-18,18),vx:rnd(-40,40),vy:-rnd(40,140),life:.6,size:rnd(3,6),rgb:pick(['170,120,255','220,200,255']),add:true});}
  // 2) elsötétül az ég, a fekete hold felkel az ellenség fölött
  dimTo(.72,'6,2,18',500);sfx('wail');
  await tween(700,k=>{const e=eOutBack(k);M.a=Math.min(1,k*2);M.s=.3+.7*e;M.y=my-160*(1-easeIO(k));});
  popLabel(al[0],'HOLDFOGYATKOZÁS!','#c8b0ff');
  // 3) a korona lüktet, sötét szikrák hullanak
  sfx('spell');
  await tween(650,k=>{M.pulse=Math.abs(Math.sin(k*Math.PI*2));if(Math.random()<.8){const an=rnd(0,6.29);part({x:mx+Math.cos(an)*R*.9,y:M.y+Math.sin(an)*R*.9,vx:Math.cos(an)*60,vy:rnd(30,120),life:rnd(.6,1),size:rnd(3,6),rgb:pick(['170,120,255','230,220,255']),add:true});}
    if(Math.random()<.15)shake(3);});
  // 4) a hold sötét fénye rázuhan mindenkire: a festett hold kicsinyített mása zuhan és szétrobban rajtuk
  sfx('whoosh');flash('40,10,80',.3,.12);
  await Promise.all(al.map((t,i)=>wait(i*110).then(()=>new Promise(res=>{const x0=mx,y0=M.y,x1=cx(t),y1=midY(t),st={t:0},ms=420;
    R18E({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms);if(Math.random()<.9)part({x:x0+(x1-x0)*k+rnd(-10,10),y:y0+(y1-y0)*k*k+rnd(-10,10),vx:rnd(-30,30),vy:-rnd(10,60),life:rnd(.3,.5),size:rnd(3,6),rgb:pick(['170,120,255','230,220,255']),add:true});
        if(k>=1){res();return false;}return true;},
      draw(){if(!MI)return;const k=Math.min(1,st.t/ms);r17Draw(MI,x0+(x1-x0)*k,y0+(y1-y0)*k*k,R*.9*(1-.45*k),{rot:k*4});}});
  }).then(()=>{const x=cx(t),y=midY(t),st={t:0};sfx('dark');shake(10);
    R18E({update(dt){st.t+=dt;return st.t<.6;},draw(){if(!MI)return;const k=st.t/.6;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(MI,x,y,(t.w*t.scale+90)*(.6+.9*k),{rot:k*2,a:(1-k)*.8});ctx.restore();}});
    sparks(x,y,['170,120,255','230,220,255','255,255,255'],22,420);
    for(let n=0;n<6;n++)darkFlame({x:x+rnd(-30,30),y:t.y+t.oy-rnd(0,20),vy:-rnd(80,160),size:rnd(18,30),life:.7});
    t.hurt=.5;if(t.alive)r21HitNS(u,t,sk);}))));
  // 5) a hold lenyugszik, kivilágosodik
  await wait(300);
  await tween(500,k=>{M.a=1-k;M.y=my-120*k*k;M.pulse=0;});M.on=false;M.a=0;
  await dimTo(0,null,300);
  }finally{rel();}
};

// ---------- Kaelen – Erdő haragja (mindenkire) ----------
// Az erdő megharagszik: minden ellenség fölé egy hatalmas, festett fakar (fx7-treearm) hajol be fentről, karmos
// águjjakkal lecsap rájuk, aztán visszahúzódik. (Gyökércsapda: gyökerek alulról, foglyul ejt – ez felülről üt, nagyot sebez.)
SK.forestwrath={name:'Erdő haragja',mp:30,cd:2,tgt:'enemies',kind:'mag',pow:1.75,elem:'nature',anim:'forestWrath',
  desc:'Kaelen felébreszti az erdőt: hatalmas faágak csapnak le fentről minden ellenségre. Nagy természet-sebzés mindenkinek.'};
SHOP_SKILLS.druid.push(['forestwrath','11-3',6800]);
A.forestWrath=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const TA=R17I.treearm;
  // a kar képe: a karmok a bal alsó sarokban (~.2/.85), a törzs a jobb felső sarokban (~.9/.12) – a csuklópont a törzs
  const arms=al.map((t,i)=>{const H=t.h*t.scale,w=Math.max(300,H*2.1);return {t,w,k:0,slam:0,a:0,i};});
  const pose=(A0)=>{const t=A0.t,w=A0.w,h=TA?w*TA.height/TA.width:w*.6,
      // a karom végpontja a célpont tetejére kerül lecsapáskor
      clawX=cx(t)-w*.05,clawY=topY(t)+20,
      px=clawX+w*.66,py=clawY-h*.78,          // csukló (a kép törzsvége)
      ang=-.75*(1-A0.slam)-.15*(1-A0.k);
    return {px,py,ang,w,h};};
  const drawArm=(A0)=>{if(!TA||A0.a<=0)return;const p=pose(A0);ctx.save();ctx.globalAlpha=A0.a;ctx.translate(p.px,p.py-(1-A0.k)*p.h*1.4);ctx.rotate(p.ang);
    ctx.drawImage(TA,-p.w*.88,-p.h*.12,p.w,p.h);ctx.restore();};
  R18E({update(){return arms.some(a=>a.a>0)||!arms.done;},draw(){for(const a of arms)drawArm(a);}});
  // 1) Kaelen botja felizzik, az erdő felmordul, levelek kavarognak
  sfx('spell');sfx('growl');await dimTo(.45,'6,20,4',300);
  {const h=handPos(u);kaeLeaves(h.x,h.y,24,220,60);}
  rumble&&rumble(1,5);
  for(let i=0;i<30;i++)part({x:rnd(0,W),y:rnd(-20,60),vx:rnd(-40,40),vy:rnd(60,180),life:rnd(1,1.6),size:rnd(7,12),rgb:pick(KAE.leaf),add:false,shape:'leaf',drag:1,g:60});
  popLabel(al[0],'ERDŐ HARAGJA!','#9ee06a');
  // 2) a fakarok fentről behajolnak (felemelve)
  sfx('wind');
  await Promise.all(arms.map(a=>wait(a.i*90).then(()=>tween(420,k=>{a.k=eOutBack(k);a.a=Math.min(1,k*3);}))));
  await wait(160);
  // 3) LECSAPNAK
  await Promise.all(arms.map(a=>wait(a.i*140).then(async()=>{sfx('whoosh');
    await tween(170,k=>{a.slam=k*k;});
    const t=a.t,x=cx(t),y=midY(t);hitStop(80);shake(18);flash('120,200,80',.18,.08);sfx('crunch');sfx('earthm');
    kaeLeaves(x,y,26,340,80);puffs(x,t.y+t.oy,8,['120,100,76','96,80,60'],[24,44],{w:60,h:16,up:110});
    sparks(x,y,['180,230,120','255,255,255'],18,380);
    t.hurt=.6;{const o0=t.oy;tween(220,k=>{t.oy=o0+14*Math.sin(k*Math.PI);}).then(()=>{t.oy=o0;});}
    if(t.alive)r21HitNS(u,t,sk);
    await wait(260);
    await tween(380,k=>{a.slam=1-k*.6;a.k=1-k*k;a.a=1-k;});})));
  arms.done=true;await dimTo(0,null,250);
  }finally{rel();}
};
