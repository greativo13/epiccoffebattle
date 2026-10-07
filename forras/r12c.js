
// ===== 12. kör – ellenfelek II. (porcelán, teaterasz, cukorsivatag) =====
// ---- Tealevél-manó – Teatüske: a két ágkezéből tüskezápor indul, a tüskék beleállnak a hősbe, aztán zöld levélrobbanással kipattannak
function qThorn(x,y,an,L=34){ctx.save();ctx.translate(x,y);ctx.rotate(an);ctx.scale(1.5,1.5);ctx.globalCompositeOperation='lighter';glow(-L*.4,0,L*.7,'150,230,90',.35);ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(-L,0,0,0);g.addColorStop(0,'#2a4a12');g.addColorStop(.7,'#5a8a26');g.addColorStop(1,'#d8f0a0');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(-L*.5,-5,-L,-6);ctx.lineTo(-L,6);ctx.quadraticCurveTo(-L*.5,5,0,0);ctx.fill();
  ctx.fillStyle='#4a7a1e';ctx.beginPath();ctx.ellipse(-L,0,6,8,0,0,6.29);ctx.fill();ctx.fillStyle='#7ab83a';ctx.beginPath();ctx.ellipse(-L-6,-5,9,4,-.6,0,6.29);ctx.fill();ctx.restore();}
A.teaDart=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T={x:cx(t),y:midY(t)},hands=()=>[fp(u,.13,.62),fp(u,.86,.52)];
  const C={on:true,k:0};effects.push({update(){if(C.on)for(const h of hands())if(Math.random()<.6)part({x:h.x+rnd(-14,14),y:h.y+rnd(-14,14),vx:rnd(-30,30),vy:-rnd(20,60),life:.5,size:rnd(2,4),rgb:pick(['160,230,90','220,255,170']),shape:'star'});return C.on;},
    draw(){for(const h of hands()){ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,30+30*C.k,'140,230,80',.6*C.k);ctx.restore();}}});
  sfx('poison');await tween(380,k=>{C.k=k;u.lean=.1*easeIO(k);});sfx('whoosh');bodyStrike(u,160,-.16);
  const stuck=[],fl=[];for(let i=0;i<14;i++){const h=hands()[i%2],tx=T.x+rnd(-26,26),ty=T.y+rnd(-50,40),an=Math.atan2(ty-h.y,tx-h.x);
    fl.push((async()=>{await wait(i*45);await flyObj({x:h.x,y:h.y},{x:tx,y:ty},230,(x,y)=>{qThorn(x,y,an,30);},{trail:['150,220,90','200,240,150'],trailAdd:false,trailShape:'leaf'});sfx('needle');stuck.push({x:tx-cx(t),y:ty-midY(t),an});t.hurt=.2;shake(3);})());}
  await Promise.all(fl);C.on=false;const S2={t:0};effects.push({update(dt){S2.t+=dt;return S2.t<.6;},draw(){for(const s of stuck)qThorn(cx(t)+s.x,midY(t)+s.y,s.an,30);}});
  await wait(550);sfx('poison');flash('170,240,120',.2,.1);for(const s of stuck)for(let i=0;i<2;i++)part({x:cx(t)+s.x,y:midY(t)+s.y,vx:rnd(-220,220),vy:rnd(-260,60),g:500,life:rnd(.5,.9),size:rnd(8,13),rgb:pick(['90,170,50','140,210,70']),add:false,shape:'leaf'});
  puffs(T.x,T.y,8,['140,210,90','180,235,130'],[16,28],{shape:'puff'});soundBlast(T.x,T.y,'150,230,90',160,380);hit(u,t,sk);await bodySettle(u);}finally{rel();}};

// ---- Tealopó majom – Csészedobás: három pörgő porceláncsésze (az első a kezéből, kettő a zsákjából), forró teát fröcskölve törnek szét
function qCupP(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);const g=ctx.createLinearGradient(-16,0,16,0);g.addColorStop(0,'#dfe4ee');g.addColorStop(.45,'#ffffff');g.addColorStop(1,'#c4ccdc');ctx.fillStyle=g;ctx.strokeStyle='#2a3450';ctx.lineWidth=1.6;
  ctx.beginPath();ctx.moveTo(-17,-11);ctx.lineTo(17,-11);ctx.bezierCurveTo(16,8,9,14,0,14);ctx.bezierCurveTo(-9,14,-16,8,-17,-11);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='#2f5cc0';ctx.lineWidth=1.4;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.arc(i*6.5,1,2.6,0,6.29);ctx.stroke();}ctx.beginPath();ctx.moveTo(-15,-6);ctx.lineTo(15,-6);ctx.stroke();
  ctx.strokeStyle='#c9a227';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-17,-11);ctx.lineTo(17,-11);ctx.stroke();ctx.strokeStyle='#2a3450';ctx.lineWidth=3;ctx.beginPath();ctx.arc(19,-1,6,-1.3,1.3);ctx.stroke();ctx.strokeStyle='#fff';ctx.lineWidth=1.5;ctx.stroke();
  ctx.fillStyle='#8a4a1a';ctx.beginPath();ctx.ellipse(0,-11,15,3,0,0,6.29);ctx.fill();ctx.restore();}
A.cupThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T={x:cx(t),y:midY(t)};
  for(let n=0;n<4;n++){const src=n===0?()=>fp(u,.12,.5):()=>fp(u,.8,.3);const C={on:true};effects.push({update(){return C.on;},draw(){const h=src();qCupP(h.x,h.y,0,1.4);}});
    await bodyWind(u,n?160:240,.2);sfx('whoosh');bodyStrike(u,140,-.28);await wait(60);C.on=false;const o=src(),tx=T.x+rnd(-20,20),ty=T.y+rnd(-30,20),st={t:0};
    const sp=effects.push({update(dt){st.t+=dt;return !st.done;},draw(){}});
    flyObj(o,{x:tx,y:ty},300,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'255,230,190',.35);ctx.restore();qCupP(x,y,r,2);if(Math.random()<.8)part({x:x+rnd(-8,8),y:y-6,vx:rnd(-60,60),vy:rnd(-40,40),g:700,life:.4,size:rnd(3,6),rgb:pick(['150,90,40','190,130,60']),add:false,shape:'drop'});if(Math.random()<.4)part({x,y:y-8,vx:rnd(-20,20),vy:-rnd(30,60),life:.6,size:rnd(8,14),grow:20,rgb:'245,245,250',add:false,shape:'smoke'});},{spin:-14,arc:120}).then(()=>{st.done=true;
      sfx('glass');shake(9);hitStop(50);fallDebris(tx,ty,16,(x,y,r,s)=>qPorcShard(x,y,r,s*1.4),{v:380});soundBlast(tx,ty,'200,150,90',170,380);splat(tx,ty,['150,90,40','190,130,60','220,170,90'],26,360,'drop');puffs(tx,ty,6,['240,240,245'],[16,26],{up:110});soundBlast(tx,ty,'210,190,160',130,320);t.hurt=.35;});
    await wait(120);}
  await wait(380);hit(u,t,sk);await bodySettle(u);}finally{rel();}};

// ---- Kannateknős – Forró öntet: megfordul, hogy a kiöntője a hősre nézzen, felágaskodik, és vastag, gőzölgő teasugarat önt rá; tócsa és gőzoszlop
A.hotPour=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{sfx('splash');await tween(260,k=>{u.spin=Math.PI*easeIO(k);});u.spin=Math.PI;
  const sp=()=>{const p=fp(u,.97,.43);return {x:2*cx(u)-p.x,y:p.y-(u.jump||0)};},T={x:cx(t),y:topY(t)+14},st={k:0,on:true,t:0};
  effects.push({update(dt){st.t+=dt;const o=sp();if(st.on&&st.k>0){for(let i=0;i<4;i++){const q=rnd(0,st.k),p=liquidPath(o,T,q,q,140,1)[0];part({x:p.x,y:p.y,vx:rnd(-30,30),vy:rnd(-10,40),g:400,life:.3,size:rnd(3,6),rgb:pick(['150,80,30','200,130,60']),add:false,shape:'drop'});}
      if(Math.random()<.9){const q=rnd(.2,st.k),p=liquidPath(o,T,q,q,140,1)[0];part({x:p.x,y:p.y,vx:rnd(-20,20),vy:-rnd(30,70),life:rnd(.8,1.2),size:rnd(14,24),grow:35,rgb:'245,245,248',add:false,shape:'smoke'});}}return st.on;},
    draw(){if(st.k>0){const o=sp();drawJet(o,T,st.k,140,24,st.t);}}});
  await tween(260,k=>{u.jump=22*easeIO(k);});await tween(300,k=>{st.k=k;});const bz=setInterval(()=>sfx('splash'),200);
  const pool={a:0,r:0};effects.push({update(dt){return pool.a>0||st.on;},draw(){if(pool.a<=0)return;ctx.save();ctx.globalAlpha=pool.a*.85;const x=cx(t),y=t.y+t.oy+3;const g=ctx.createRadialGradient(x,y,4,x,y,pool.r);g.addColorStop(0,'#c07a34');g.addColorStop(1,'rgba(120,60,20,.85)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,pool.r,pool.r*.2,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,230,180,.6)';ctx.beginPath();ctx.ellipse(x-pool.r*.3,y-2,pool.r*.3,2.5,0,0,6.29);ctx.fill();ctx.restore();}});
  for(let i=0;i<6;i++){t.hurt=.25;splat(T.x,T.y,['150,80,30','200,130,60','230,170,90'],12,300,'drop');pool.a=1;pool.r=Math.min(90,pool.r+16);puffs(cx(t),t.y+t.oy-10,3,['245,245,248'],[20,34],{w:50,up:160});await wait(140);}
  clearInterval(bz);st.on=false;hitStop(80);shake(10);puffs(cx(t),midY(t),14,['245,245,248','232,236,244'],[30,50],{w:60,h:60,up:170,l0:1.3,l1:2});soundBlast(cx(t),midY(t),'230,180,120',170,400);hit(u,t,sk);
  await tween(240,k=>{u.jump=22*(1-k);});u.jump=0;tween(800,k=>{pool.a=1-k;});await tween(260,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;}finally{rel();}};

// ---- Porcelánbaba – Szilánkszórás: ő maga DOBJA a szilánkokat – három lendületes dobás, nagy, kék mintás porcelánszilánkok legyezőben (nincs eső)
function qPorcShard(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);const g=ctx.createLinearGradient(-10,-10,10,10);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#d4dcec');ctx.fillStyle=g;ctx.strokeStyle='#1e3a8a';ctx.lineWidth=1.4;
  ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(11,-3);ctx.lineTo(7,10);ctx.lineTo(-4,13);ctx.lineTo(-11,2);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#2f5cc0';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(1,1,5,0,4);ctx.stroke();ctx.beginPath();ctx.moveTo(-8,6);ctx.quadraticCurveTo(-2,2,4,9);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.moveTo(-2,-10);ctx.lineTo(4,-5);ctx.lineTo(-3,-3);ctx.fill();ctx.restore();}
A.shardRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{const hand=()=>fp(u,.17,.6);sfx('glass');
  for(let w=0;w<3;w++){await bodyWind(u,w?150:230,.16);const G={on:true};effects.push({update(){return G.on;},draw(){const h=hand();for(let i=0;i<4;i++)qPorcShard(h.x+rnd(-4,4)+i*4-6,h.y+rnd(-4,4),i,1.2);}});
    sfx('whoosh');bodyStrike(u,140,-.24);await wait(60);G.on=false;const h=hand();
    for(const t of al)for(let i=0;i<4;i++){const tx=cx(t)+rnd(-40,40),ty=midY(t)+rnd(-55,40);flyObj({x:h.x,y:h.y},{x:tx,y:ty},rnd(300,380),(x,y,r)=>qPorcShard(x,y,r,1.6),{spin:rnd(10,18),arc:rnd(20,90),trail:['220,230,255','255,255,255']}).then(()=>{sfx('glass');sparks(tx,ty,['220,235,255','255,255,255'],5,200);fallDebris(tx,ty,2,(x,y,r,s)=>qPorcShard(x,y,r,s*.8),{v:200,life:.5});t.hurt=.25;});}
    await wait(260);}
  await wait(250);shake(8);for(const t of al)soundBlast(cx(t),midY(t),'200,220,255',130,320);hitAll(u,al,sk);await bodySettle(u);}finally{rel();}};

// ---- Csészekatona: a lándzsa helyett mindenhol KANÁL (a csésze-képen átrajzolva; a hadsereg és az idézés is ezt használja)
function r12SpoonPatch(){const im=ENEMY_SPR.cupsoldier;if(!im||im._spoon)return;const W0=im.naturalWidth||im.width,H0=im.naturalHeight||im.height;if(!W0||!H0||(im.complete===false))return;
  const c=document.createElement('canvas');c.width=W0;c.height=H0;const g=c.getContext('2d');g.drawImage(im,0,0,W0,H0);
  // a lándzsa kitörlése (a kéz megmarad)
  g.save();g.globalCompositeOperation='destination-out';g.beginPath();g.rect(0,0,W0*.205,H0*.585);g.rect(W0*.075,H0*.735,W0*.13,H0*.22);g.rect(0,H0*.585,W0*.075,H0*.4);g.fill();g.restore();
  // ezüstkanál: a nyele a kéztől lefelé, a feje felül
  const X=W0*.1,sw=W0*.022,met=(x0,x1)=>{const q=g.createLinearGradient(x0,0,x1,0);q.addColorStop(0,'#8a909c');q.addColorStop(.35,'#ffffff');q.addColorStop(.6,'#c8ccd6');q.addColorStop(1,'#6a707c');return q;};
  g.lineJoin='round';g.strokeStyle='#22262e';g.lineWidth=W0*.008;
  g.fillStyle=met(X-sw,X+sw);g.beginPath();g.moveTo(X-sw*.7,H0*.3);g.lineTo(X-sw*.8,H0*.585);g.lineTo(X+sw*.8,H0*.585);g.lineTo(X+sw*.7,H0*.3);g.closePath();g.fill();g.stroke();
  g.beginPath();g.moveTo(X-sw*.8,H0*.735);g.lineTo(X-sw*1.3,H0*.88);g.quadraticCurveTo(X,H0*.95,X+sw*1.3,H0*.88);g.lineTo(X+sw*.8,H0*.735);g.closePath();g.fill();g.stroke();
  // kanálfej
  const by=H0*.17,bw=W0*.072,bh=H0*.15;let q=g.createRadialGradient(X-bw*.3,by-bh*.4,2,X,by,bh);q.addColorStop(0,'#ffffff');q.addColorStop(.5,'#d4d8e0');q.addColorStop(1,'#7a808c');g.fillStyle=q;g.beginPath();g.ellipse(X,by,bw,bh,0,0,6.29);g.fill();g.lineWidth=W0*.01;g.stroke();
  q=g.createRadialGradient(X+bw*.2,by+bh*.2,2,X,by,bh*.8);q.addColorStop(0,'#f4f6fa');q.addColorStop(1,'#9aa0ac');g.fillStyle=q;g.beginPath();g.ellipse(X,by+bh*.06,bw*.72,bh*.78,0,0,6.29);g.fill();
  g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.ellipse(X-bw*.3,by-bh*.25,bw*.16,bh*.3,.2,0,6.29);g.fill();
  c.naturalWidth=W0;c.naturalHeight=H0;c._spoon=true;c.complete=true;ENEMY_SPR.cupsoldier=c;if(typeof LIMB_CV==='object')delete LIMB_CV.cupsoldier;}
// a támadóképen a kanál hegyes feje helyett kerek kanálfej
function r12SpoonPatchA(){const im=ENEMY_SPR['cupsoldier-attack'];if(!im||im._spoon)return;const W0=im.naturalWidth||im.width,H0=im.naturalHeight||im.height;if(!W0||!H0||(im.complete===false))return;
  const c=document.createElement('canvas');c.width=W0;c.height=H0;const g=c.getContext('2d');g.drawImage(im,0,0,W0,H0);
  g.save();g.globalCompositeOperation='destination-out';g.beginPath();g.rect(0,H0*.49,W0*.165,H0*.27);g.fill();g.restore();
  const an=Math.atan2(-.1*H0,.24*W0),x=W0*.09,y=H0*.62;g.save();g.translate(x,y);g.rotate(an);const bw=W0*.085,bh=H0*.055;
  g.strokeStyle='#22262e';g.lineWidth=W0*.006;g.fillStyle='#c8ccd6';g.beginPath();g.moveTo(bw*.8,-bh*.18);g.lineTo(W0*.1,-bh*.14);g.lineTo(W0*.1,bh*.14);g.lineTo(bw*.8,bh*.18);g.closePath();g.fill();g.stroke();
  let q=g.createRadialGradient(-bw*.3,-bh*.4,2,0,0,bw);q.addColorStop(0,'#ffffff');q.addColorStop(.5,'#d4d8e0');q.addColorStop(1,'#7a808c');g.fillStyle=q;g.beginPath();g.ellipse(0,0,bw,bh,0,0,6.29);g.fill();g.lineWidth=W0*.008;g.stroke();
  q=g.createRadialGradient(bw*.2,bh*.2,2,0,0,bw*.8);q.addColorStop(0,'#f4f6fa');q.addColorStop(1,'#9aa0ac');g.fillStyle=q;g.beginPath();g.ellipse(-bw*.05,bh*.05,bw*.75,bh*.68,0,0,6.29);g.fill();
  g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.ellipse(-bw*.35,-bh*.25,bw*.25,bh*.16,0,0,6.29);g.fill();g.restore();
  c.naturalWidth=W0;c.naturalHeight=H0;c._spoon=true;c.complete=true;ENEMY_SPR['cupsoldier-attack']=c;if(typeof LIMB_CV==='object')delete LIMB_CV['cupsoldier-attack'];}
if(typeof setInterval!=='undefined')setInterval(()=>{r12SpoonPatch();r12SpoonPatchA();},400);

// ---- Lampionlidérc – Lidércrobbanás: VÖRÖS-SÁRGA feltöltődés és tűzrobbanás (nem kék)
A.wispRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('fire');popLabel(u,'FELIZZIK!','#ffb060');
  const G={a:0,on:true};effects.push({update(){if(G.on){for(let i=0;i<4;i++){const a=rnd(0,6.28),r=rnd(70,150);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r,vx:-Math.cos(a)*r*2.4,vy:-Math.sin(a)*r*2.4,life:.4,size:rnd(3,6),rgb:pick(['255,90,30','255,200,60','255,240,160'])});}
      if(Math.random()<G.a)part({x:cx(u)+rnd(-30,30),y:midY(u)+rnd(-30,30),vx:rnd(-40,40),vy:-rnd(60,140),life:rnd(.4,.7),size:rnd(14,26),grow:30,rgb:'255,150,40',add:false,shape:'fire'});}return !G.done;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(u),midY(u),u.h*u.scale*(.8+G.a),'255,90,20',.45+.4*G.a);glow(cx(u),midY(u),u.h*u.scale*(.45+.2*G.a),'255,210,80',.55*G.a);glow(cx(u),midY(u),u.h*u.scale*.25,'255,250,220',.7*G.a);ctx.restore();}});
  for(let i=0;i<3;i++){await tween(230,k=>{G.a=k*(i+1)/3;u.scale0=u.scale0||u.scale;u.scale=u.scale0*(1+.08*Math.sin(k*Math.PI)*(i+1)/3);});sfx('fire');shake(2+i*2);}
  const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,t)=>s+midY(t),0)/al.length,dx=mx-cx(u),dy=my-midY(u);ghosts(u,300);sfx('whoosh');G.on=false;
  await tween(320,k=>{const e=k*k;u.ox=dx*e;u.oy=dy*e;});G.done=true;u.alpha=0;sfx('boom');sfx('fire');flash('255,170,60',.6,.25);shake(24);hitStop(140);
  bigBoom(mx,my,2.2);bigBoom(mx-120,my+20,1.1);bigBoom(mx+120,my-10,1.1);soundBlast(mx,my,'255,150,40',420,750);
  fallDebris(mx,my,18,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle=pick(['#e03a1a','#f07030','#c82a10']);ctx.strokeStyle='#5a1a08';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-9*s,-7*s);ctx.lineTo(10*s,-3*s);ctx.lineTo(6*s,8*s);ctx.lineTo(-7*s,6*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:440});
  for(const t of al){t.hurt=.4;toss(t,30,300);}hitAll(u,al,sk);u.scale=u.scale0||u.scale;u.ox=0;u.oy=0;u.pendingRevive=false;await wait(150);if(u.alive)die(u);u.alpha=0;updateHUD();await wait(500);}finally{rel();}};

// ---- Vázagólem – Mázpáncél: nagy porcelándarabok repülnek elő, és EGY nagy, váza-mintás pajzzsá állnak össze (arany illesztésekkel látszik, hogy darabokból áll)
let VW_CANV=null;function r12VaseShieldCanvas(){if(VW_CANV)return VW_CANV;const W1=200,H1=300,c=document.createElement('canvas');c.width=W1;c.height=H1;const g=c.getContext('2d');
  const path=()=>{g.beginPath();g.moveTo(W1/2,6);g.bezierCurveTo(W1*.95,10,W1-4,60,W1-6,120);g.bezierCurveTo(W1-10,210,W1*.7,260,W1/2,H1-6);g.bezierCurveTo(W1*.3,260,10,210,6,120);g.bezierCurveTo(4,60,W1*.05,10,W1/2,6);g.closePath();};
  path();let q=g.createRadialGradient(W1*.35,H1*.3,10,W1/2,H1/2,H1*.6);q.addColorStop(0,'#ffffff');q.addColorStop(.7,'#eef1f8');q.addColorStop(1,'#c8d0e2');g.fillStyle=q;g.fill();
  g.save();path();g.clip();g.strokeStyle='#1f48b0';g.fillStyle='#2a5cc8';
  // szegély-meander
  g.lineWidth=14;path();g.stroke();g.restore();
  g.save();path();g.clip();
  // nagy közép-virág
  const fl=(x,y,R,n)=>{for(let i=0;i<n;i++){const a=i/n*6.283;g.fillStyle='#2f62cc';g.beginPath();g.ellipse(x+Math.cos(a)*R*.55,y+Math.sin(a)*R*.55,R*.5,R*.24,a,0,6.29);g.fill();g.fillStyle='#6f98e8';g.beginPath();g.ellipse(x+Math.cos(a)*R*.55,y+Math.sin(a)*R*.55,R*.3,R*.1,a,0,6.29);g.fill();}g.fillStyle='#1a3c96';g.beginPath();g.arc(x,y,R*.22,0,6.29);g.fill();g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,R*.08,0,6.29);g.fill();};
  fl(W1/2,H1*.45,62,10);
  // indák és kis virágok
  g.strokeStyle='#2a5cc8';g.lineWidth=4;g.lineCap='round';for(const s of [-1,1]){g.beginPath();g.moveTo(W1/2+s*30,H1*.6);g.bezierCurveTo(W1/2+s*80,H1*.68,W1/2+s*40,H1*.82,W1/2+s*70,H1*.9);g.stroke();g.beginPath();g.moveTo(W1/2+s*25,H1*.3);g.bezierCurveTo(W1/2+s*70,H1*.24,W1/2+s*50,H1*.12,W1/2+s*80,H1*.1);g.stroke();
    fl(W1/2+s*70,H1*.88,16,6);fl(W1/2+s*78,H1*.12,14,6);for(let i=0;i<4;i++){g.fillStyle='#3a6ad4';g.beginPath();g.ellipse(W1/2+s*(50+i*6),H1*(.68+i*.05),9,4,s*.8,0,6.29);g.fill();}}
  // felső görög-kulcs sáv
  g.fillStyle='#1f48b0';g.fillRect(0,34,W1,18);g.strokeStyle='#ffffff';g.lineWidth=2.4;for(let x=8;x<W1;x+=18){g.beginPath();g.moveTo(x,48);g.lineTo(x,38);g.lineTo(x+12,38);g.lineTo(x+12,45);g.lineTo(x+5,45);g.stroke();}
  g.restore();
  // arany perem
  path();g.lineWidth=7;g.strokeStyle='#c9a227';g.stroke();g.lineWidth=2;g.strokeStyle='#7a5a10';g.stroke();
  q=g.createLinearGradient(0,0,W1,H1);q.addColorStop(0,'rgba(255,255,255,.55)');q.addColorStop(.3,'rgba(255,255,255,0)');g.fillStyle=q;path();g.fill();
  // darabokra bontás: torzított rács
  const cols=3,rows=4,V=[];for(let r=0;r<=rows;r++){V.push([]);for(let k=0;k<=cols;k++){const ed=(r===0||r===rows||k===0||k===cols);V[r].push([k/cols*W1+(ed?0:rnd(-16,16)),r/rows*H1+(ed?0:rnd(-16,16))]);}}
  const pieces=[];for(let r=0;r<rows;r++)for(let k=0;k<cols;k++)pieces.push([V[r][k],V[r][k+1],V[r+1][k+1],V[r+1][k]]);
  VW_CANV={c,W1,H1,pieces};return VW_CANV;}
drawVaseWall=function(e,a){const S0=r12VaseShieldCanvas(),vw=e._vwall||{},k=vw.k==null?1:vw.k;a=Math.min(1,a/.6);const Hh=e.h*e.scale*1.45,sc=Hh/S0.H1,x=cx(e)-e.w*e.scale*.7,top=e.y+e.oy-Hh-4;
  ctx.save();ctx.globalAlpha=a;ctx.translate(x-S0.W1*sc/2,top);ctx.scale(sc,sc);
  S0.pieces.forEach((p,i)=>{const d=i/S0.pieces.length*.55,q=Math.max(0,Math.min(1,(k-d)/.45));if(q<=0)return;const e2=eOutBack(q),cxp=(p[0][0]+p[2][0])/2,cyp=(p[0][1]+p[2][1])/2,fx=(1-e2)*((i%3)-1)*260,fy=(1-e2)*(-220-(i%4)*60),rot=(1-e2)*((i%2)?2:-2);
    ctx.save();ctx.translate(cxp+fx,cyp+fy);ctx.rotate(rot);ctx.translate(-cxp,-cyp);ctx.beginPath();p.forEach((v,j)=>j?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.save();ctx.clip();ctx.drawImage(S0.c,0,0);ctx.restore();
    ctx.lineWidth=4;ctx.strokeStyle='rgba(201,162,39,.95)';ctx.stroke();ctx.lineWidth=1.4;ctx.strokeStyle='rgba(255,240,180,.95)';ctx.stroke();if(q<1){ctx.globalCompositeOperation='lighter';ctx.lineWidth=10;ctx.strokeStyle=`rgba(255,220,120,${.5*(1-q)})`;ctx.stroke();}ctx.restore();});
  if(k>=1){ctx.globalCompositeOperation='lighter';const sh=(T*.6)%2;if(sh<1){const sx=-80+sh*(S0.W1+160);const g=ctx.createLinearGradient(sx-40,0,sx+40,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.35)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(sx-40,0,80,S0.H1);}}
  ctx.restore();};
A.vaseWall=async(u,ts,sk)=>{u.pose='cast';sfx('glass');await bodyWind(u,220,.1);bodyStrike(u,160,-.12);const W0={k:0};u._vwall=W0;
  const ck=setInterval(()=>sfx('glass'),110);const xx=cx(u)-u.w*u.scale*.7;await tween(1300,k=>{W0.k=k;if(Math.random()<.6)part({x:xx+rnd(-120,120),y:midY(u)+rnd(-160,120),vx:rnd(-30,30),vy:rnd(-30,30),life:.5,size:rnd(2,5),rgb:pick(['255,230,150','255,255,255','190,210,255']),shape:'star'});});clearInterval(ck);sfx('shield');flash('255,240,200',.4,.15);shake(10);hitStop(80);
  const x=cx(u)-u.w*u.scale*.62,y=midY(u);sparks(x,y,['255,240,180','255,255,255','200,220,255'],26,380);soundBlast(x,y,'220,230,255',160,380);hit(u,u,sk);await bodySettle(u);u.pose='idle';};

// ---- Porcelán mandarin – Tusátok: lúdtollal és tintával tusszörnyeket rajzol a levegőbe, amelyek életre kelnek és rátámadnak a hősökre
SPR_OVER.mandarin=(e,t)=>{if(e.alive&&!S.over&&S.round%2===1){ctx.save();ctx.scale(-1,1);txt('TÜKÖRMÁZ',0,-e.h-30,18,'rgb(190,225,255)','#1a0f24');txt('Fegyverrel üsd!',0,-e.h-12,13,'#ffffff','#1a0f24');ctx.restore();}};
function qQuill(x,y,ang,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);
  const g=ctx.createLinearGradient(-14,0,14,0);g.addColorStop(0,'#f2ecdf');g.addColorStop(.5,'#ffffff');g.addColorStop(1,'#cfc6b4');ctx.fillStyle=g;ctx.strokeStyle='#5a4a30';ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(0,70);ctx.bezierCurveTo(-26,30,-22,-50,4,-90);ctx.bezierCurveTo(18,-50,16,20,0,70);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(120,100,70,.6)';ctx.lineWidth=.8;for(let i=0;i<14;i++){const yy=-80+i*10;ctx.beginPath();ctx.moveTo(2,yy);ctx.lineTo(-14+Math.abs(i-7),yy+10);ctx.moveTo(3,yy);ctx.lineTo(12-Math.abs(i-8)*.6,yy+9);ctx.stroke();}
  ctx.strokeStyle='#3a2a10';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,40);ctx.lineTo(0,96);ctx.stroke();ctx.fillStyle='#1a1418';ctx.beginPath();ctx.moveTo(-3,92);ctx.lineTo(3,92);ctx.lineTo(0,106);ctx.closePath();ctx.fill();ctx.restore();}
function qInkpot(x,y,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);const g=ctx.createRadialGradient(-8,-8,2,0,0,26);g.addColorStop(0,'#5a5a78');g.addColorStop(1,'#14121c');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,24,18,0,0,6.29);ctx.fill();
  ctx.fillStyle='#c9a227';ctx.fillRect(-10,-24,20,8);ctx.fillStyle='#0a080e';ctx.beginPath();ctx.ellipse(0,-24,10,3,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.ellipse(-9,-6,5,8,-.4,0,6.29);ctx.fill();ctx.restore();}
function qPorcFan(x,y,ang,R,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);const n=16,sp=2;
  for(let i=0;i<n;i++){const a0=-sp/2+i*sp/n,a1=a0+sp/n;const g=ctx.createRadialGradient(0,0,R*.25,0,0,R);g.addColorStop(0,i%2?'#eef2fa':'#ffffff');g.addColorStop(1,i%2?'#d6deee':'#f2f5fb');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(Math.cos(a0)*R*.24,Math.sin(a0)*R*.24);ctx.lineTo(Math.cos(a0)*R,Math.sin(a0)*R);ctx.arc(0,0,R,a0,a1);ctx.lineTo(Math.cos(a1)*R*.24,Math.sin(a1)*R*.24);ctx.closePath();ctx.fill();}
  ctx.strokeStyle='#2a5cc8';ctx.fillStyle='#2f62cc';ctx.lineWidth=2.5;for(const [an,rr,s] of [[-.6,.72,1],[0,.6,1.3],[.6,.72,1],[-.3,.88,.7],[.3,.88,.7]]){const fx=Math.cos(an)*R*rr,fy=Math.sin(an)*R*rr;for(let p=0;p<6;p++){ctx.beginPath();ctx.ellipse(fx+Math.cos(p*1.05)*8*s,fy+Math.sin(p*1.05)*8*s,7*s,3*s,p*1.05,0,6.29);ctx.fill();}}
  ctx.beginPath();ctx.arc(0,0,R*.97,-sp/2,sp/2);ctx.lineWidth=6;ctx.stroke();
  ctx.strokeStyle='#3a2410';ctx.lineWidth=2.4;for(let i=0;i<=n;i++){const an=-sp/2+i*sp/n;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*R*.3,Math.sin(an)*R*.3);ctx.stroke();}
  ctx.fillStyle='#c9a227';ctx.beginPath();ctx.arc(0,0,7,0,6.29);ctx.fill();ctx.restore();}
function chaikin(p){let q=p;for(let it=0;it<2;it++){const r=[q[0]];for(let i=0;i<q.length-1;i++){const a=q[i],b=q[i+1];r.push([a[0]*.75+b[0]*.25,a[1]*.75+b[1]*.25],[a[0]*.25+b[0]*.75,a[1]*.25+b[1]*.75]);}r.push(q[q.length-1]);q=r;}return q;}
function inkStroke(pts,w0,w1,k,seed){pts=chaikin(pts);const n=pts.length;if(n<2||k<=0)return;const m=Math.max(2,Math.ceil((n-1)*Math.min(1,k))+1),P=[];for(let i=0;i<m;i++){let p=pts[i];if(i===m-1&&k<1){const f=(n-1)*k-(m-2),a=pts[i-1],b=pts[i];p=[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];}P.push(p);}
  const L=[],R=[];for(let i=0;i<P.length;i++){const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)],dx=b[0]-a[0],dy=b[1]-a[1],d=Math.hypot(dx,dy)||1,q=i/(n-1),w=(w0+(w1-w0)*q)*.5*(1+.12*Math.sin(i*2.3+seed));L.push([P[i][0]-dy/d*w,P[i][1]+dx/d*w]);R.push([P[i][0]+dy/d*w,P[i][1]-dx/d*w]);}
  for(const [col,f] of [['rgba(40,34,52,.35)',1.35],['rgba(10,8,14,.94)',1]]){ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<L.length;i++){const x=P[i][0]+(L[i][0]-P[i][0])*f,y=P[i][1]+(L[i][1]-P[i][1])*f;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}for(let i=R.length-1;i>=0;i--)ctx.lineTo(P[i][0]+(R[i][0]-P[i][0])*f,P[i][1]+(R[i][1]-P[i][1])*f);ctx.closePath();ctx.fill();}
  ctx.strokeStyle='rgba(90,85,100,.5)';ctx.lineWidth=1;for(let j=-1;j<=1;j+=2){ctx.beginPath();for(let i=0;i<P.length;i++){const x=P[i][0]+(L[i][0]-P[i][0])*.45*j,y=P[i][1]+(L[i][1]-P[i][1])*.45*j;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}}
const INK_BEAST=[[[[40,-52],[12,-62],[-18,-60],[-44,-52]],46,32],[[[42,-48],[56,-26],[50,-2],[58,0]],24,9],[[[28,-44],[34,-18],[26,0]],16,7],[[[-34,-48],[-48,-22],[-60,-2],[-68,0]],20,8],[[[-22,-44],[-30,-20],[-42,0]],14,6],
  [[[44,-58],[70,-78],[86,-98],[74,-114]],13,3],[[[-40,-62],[-56,-67],[-68,-64]],48,34],[[[-62,-74],[-78,-72],[-94,-66]],16,8],[[[-62,-54],[-80,-50],[-92,-46]],11,6],[[[-10,-66],[0,-50]],7,3],[[[8,-66],[16,-50]],7,3],[[[24,-62],[30,-48]],6,3]];
function qInkBeast(x,y,s,k,jaw,flip){ctx.save();ctx.translate(x,y);ctx.scale(flip?-s:s,s);const n=INK_BEAST.length;INK_BEAST.forEach((st,i)=>{const kk=Math.max(0,Math.min(1,k*n-i));if(kk<=0)return;let pts=st[0];if(i===7)pts=pts.map(p=>[p[0],p[1]-jaw*10]);if(i===8)pts=pts.map(p=>[p[0],p[1]+jaw*10]);inkStroke(pts,st[1],st[2],kk,i*1.7);});
  if(k>=1){ctx.fillStyle='#ffffff';for(let i=0;i<4;i++){const tx=-90+i*7;ctx.beginPath();ctx.moveTo(tx,-66-jaw*10+4);ctx.lineTo(tx+3,-58-jaw*4);ctx.lineTo(tx+6,-66-jaw*10+4);ctx.fill();ctx.beginPath();ctx.moveTo(tx,-50+jaw*10-4);ctx.lineTo(tx+3,-56+jaw*4);ctx.lineTo(tx+6,-50+jaw*10-4);ctx.fill();}
    ctx.globalCompositeOperation='lighter';glow(-66,-70,12,'255,40,40',.95);glow(-66,-70,4,'255,230,200',1);}
  ctx.restore();}
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dark');const hand=()=>fp(u,.12,.52),F={ang:-2.2,a:0,on:true,trail:[]};
  effects.push({update(){const h=hand(),R=110;F.trail.unshift({x:h.x+Math.cos(F.ang)*R*1.05,y:h.y+Math.sin(F.ang)*R*1.05});F.trail.length=Math.min(F.trail.length,14);return F.on;},
    draw(){if(F.a<=0)return;const h=hand();ctx.save();ctx.globalAlpha=.5*F.a;ctx.lineCap='round';for(let i=1;i<F.trail.length;i++){ctx.strokeStyle=`rgba(15,12,20,${.7*(1-i/F.trail.length)})`;ctx.lineWidth=26*(1-i/F.trail.length);ctx.beginPath();ctx.moveTo(F.trail[i-1].x,F.trail[i-1].y);ctx.lineTo(F.trail[i].x,F.trail[i].y);ctx.stroke();}ctx.restore();qInkpot(h.x-40,h.y+40,F.a);qQuill(h.x+Math.cos(F.ang)*60,h.y+Math.sin(F.ang)*60,F.ang+Math.PI/2,F.a);}});
  await tween(250,k=>{F.a=k;u.lean=.1*easeIO(k);});await dimTo(.35,'20,15,30',200);
  const beasts=al.slice(0,3).map((t,i)=>({t,x:cx(u)-200-i*130,y:t.y+t.oy-10,k:0,jaw:0,s:1.25,lx:0,ly:0,a:1,f:0}));
  effects.push({update(){return F.on;},draw(){for(const b of beasts){if(b.a<=0)continue;ctx.save();ctx.globalAlpha=b.a;ctx.globalAlpha*=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(b.x+b.lx,b.y+4,70*b.s,10,0,0,6.29);ctx.fill();ctx.restore();ctx.save();ctx.globalAlpha=b.a;qInkBeast(b.x+b.lx,b.y+b.ly,b.s,b.k,b.jaw,false);ctx.restore();}}});
  // festés: a legyező nagy ívekben suhint, a vonásokból kirajzolódnak a szörnyek
  sfx('whoosh');for(let s=0;s<3;s++){const a0=F.ang,a1=s%2?-2.4:.4;tween(300,k=>{F.ang=a0+(a1-a0)*easeIO(k);});await tween(300,k=>{for(const b of beasts)b.k=Math.min(1,(s+k)/3);if(Math.random()<.5){const b=pick(beasts);part({x:b.x+rnd(-60,60),y:b.y-rnd(0,90),vx:rnd(-40,40),vy:rnd(20,80),g:400,life:.6,size:rnd(3,6),rgb:'15,12,20',add:false,shape:'drop'});}});sfx('whoosh');}
  bodyStrike(u,200,-.14);await wait(150);sfx('dark');for(const b of beasts){b.jaw=1;}await wait(250);
  // életre kelnek: ugrás, harapás, tusfröccsenés
  await Promise.all(beasts.map((b,i)=>(async()=>{await wait(i*140);const t=b.t,dx=cx(t)+40-b.x;sfx('whoosh');await tween(380,k=>{b.lx=dx*easeIO(k);b.ly=-Math.sin(k*Math.PI)*120;b.jaw=Math.abs(Math.sin(k*9));});
    sfx('bite');t.hurt=.4;shake(10);hitStop(60);toss(t,22,240);splat(cx(t),midY(t),['10,8,14','40,34,52'],30,420,'drop');puffs(cx(t),midY(t),8,['20,15,30','45,38,60'],[22,36],{shape:'dsmoke'});clawMarks(cx(t),midY(t),t.h*t.scale*.9,-.6,'120,110,140');
    await tween(260,k=>{b.a=1-k;b.s=1.25+.4*k;});})()));
  hitAll(u,al,sk);for(const t of al)effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.4)part({x:cx(t)+rnd(-30,30),y:topY(t)+rnd(0,40),vx:rnd(-10,10),vy:rnd(30,60),life:.6,size:rnd(3,5),rgb:'20,15,30',add:false,shape:'drop'});return this.t<1;},draw(){}});
  await tween(250,k=>{F.a=1-k;});F.on=false;await dimTo(0,null,250);await bodySettle(u);}finally{rel();}};

// ---- Az Ezerrészes Szerviz: a támadásai alatt nem vált képet
function qSzPot(x,y,s=1,r=0,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);
  // kiöntő (balra) és fül (jobbra)
  ctx.lineJoin='round';ctx.fillStyle='#f6f8fc';ctx.strokeStyle='#1d2a4a';ctx.lineWidth=2.4;ctx.beginPath();ctx.moveTo(-34,8);ctx.bezierCurveTo(-52,4,-58,-14,-70,-28);ctx.lineTo(-62,-32);ctx.bezierCurveTo(-52,-20,-44,-12,-30,-10);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#2a5cc8';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-66,-30);ctx.lineTo(-62,-33);ctx.stroke();
  ctx.strokeStyle='#1d2a4a';ctx.lineWidth=11;ctx.beginPath();ctx.arc(40,-4,20,-1.4,1.3);ctx.stroke();ctx.strokeStyle='#2f62cc';ctx.lineWidth=7;ctx.stroke();
  // lábak
  for(const fx of [-18,18]){ctx.fillStyle='#f6f8fc';ctx.strokeStyle='#1d2a4a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(fx-10,32);ctx.lineTo(fx-13,46);ctx.lineTo(fx+13,46);ctx.lineTo(fx+10,32);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#2f62cc';ctx.fillRect(fx-12,40,24,4);ctx.fillStyle='#c9a227';ctx.fillRect(fx-12,44,24,2);}
  // test
  let g=ctx.createRadialGradient(-12,-12,4,0,0,44);g.addColorStop(0,'#ffffff');g.addColorStop(.75,'#eef2f9');g.addColorStop(1,'#c4cee2');ctx.fillStyle=g;ctx.strokeStyle='#1d2a4a';ctx.lineWidth=2.6;ctx.beginPath();ctx.ellipse(0,2,40,36,0,0,6.29);ctx.fill();ctx.stroke();
  ctx.save();ctx.beginPath();ctx.ellipse(0,2,40,36,0,0,6.29);ctx.clip();
  // nagy kék virág + indák
  for(let i=0;i<8;i++){const an=i/8*6.283;ctx.fillStyle='#2f62cc';ctx.beginPath();ctx.ellipse(-4+Math.cos(an)*10,12+Math.sin(an)*10,9,4.5,an,0,6.29);ctx.fill();}ctx.fillStyle='#1a3c96';ctx.beginPath();ctx.arc(-4,12,5,0,6.29);ctx.fill();
  ctx.strokeStyle='#2a5cc8';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(8,8);ctx.bezierCurveTo(22,0,16,-14,28,-18);ctx.moveTo(-16,4);ctx.bezierCurveTo(-26,-6,-20,-16,-30,-20);ctx.stroke();for(const [lx,ly] of [[24,-12],[18,-4],[-24,-12],[-20,-2]]){ctx.fillStyle='#3a6ad4';ctx.beginPath();ctx.ellipse(lx,ly,5,2.4,.6,0,6.29);ctx.fill();}
  ctx.fillStyle='#2f62cc';ctx.fillRect(-44,28,88,6);ctx.restore();
  ctx.fillStyle='rgba(255,255,255,.7)';ctx.beginPath();ctx.ellipse(-16,-14,10,5,-.6,0,6.29);ctx.fill();
  // fedő arany peremmel, kék gomb
  ctx.fillStyle='#c9a227';ctx.strokeStyle='#5a4008';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,-30,28,6,0,0,6.29);ctx.fill();ctx.stroke();
  g=ctx.createLinearGradient(-22,0,22,0);g.addColorStop(0,'#dfe5f0');g.addColorStop(.4,'#ffffff');g.addColorStop(1,'#c4cee2');ctx.fillStyle=g;ctx.strokeStyle='#1d2a4a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-22,-31);ctx.quadraticCurveTo(0,-56,22,-31);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='#2a5cc8';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<=8;i++){const xx=-18+i*4.5;ctx.lineTo(xx,-36-(i%2)*3);}ctx.stroke();
  g=ctx.createRadialGradient(-3,-60,1,0,-57,8);g.addColorStop(0,'#8ab0ff');g.addColorStop(1,'#1a3c96');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,-57,7,0,6.29);ctx.fill();ctx.strokeStyle='#0e1e50';ctx.stroke();ctx.restore();}
A.potCrush=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const x=cx(t),gy=t.y+t.oy,P={y:-220,a:0,r:.5,s:1.9};sfx('whoosh');await bodyWind(u,220,.12);bodyStrike(u,170,-.16);
  effects.push({update(){return P.a>0;},draw(){ctx.save();ctx.globalAlpha=.3*P.a;ctx.fillStyle='#000';const k=Math.max(0,Math.min(1,(P.y-60)/(gy-150)));ctx.beginPath();ctx.ellipse(x,gy+4,40+60*k,8+6*k,0,0,6.29);ctx.fill();ctx.restore();qSzPot(x,P.y,P.s,P.r,P.a);}});
  const top=Math.max(70,gy-360);P.a=0;P.y=top;await tween(380,k=>{P.a=k;P.s=1.2+.7*eOutBack(k);P.r=.4*(1-k);});for(let i=0;i<12;i++)part({x:x+rnd(-60,60),y:top+rnd(-50,50),vx:rnd(-40,40),vy:rnd(-40,40),life:.5,size:rnd(2,4),rgb:pick(['200,220,255','255,255,255']),shape:'star'});
  await tween(420,k=>{P.r=Math.sin(k*Math.PI*3)*.18;P.y=top-14*Math.sin(k*Math.PI);});sfx('whoosh');
  await tween(380,k=>{P.y=top+(gy-90-top)*k*k;P.r=-.15*k;});sfx('rock');sfx('glass');sfx('boom');shake(20);hitStop(120);flash('240,245,255',.35,.12);P.a=0;
  // gőzrobbanás
  for(let i=0;i<46;i++){const a=rnd(-Math.PI,0),v=rnd(120,520);part({x:x+rnd(-20,20),y:gy-60+rnd(-20,20),vx:Math.cos(a)*v,vy:Math.sin(a)*v*.8,drag:1.6,g:-60,life:rnd(1,1.7),size:rnd(20,40),grow:70,rgb:pick(['250,250,252','236,240,246','255,255,255']),add:false,shape:'smoke'});}
  soundBlast(x,gy-60,'235,245,255',260,520);glowFlash(x,gy-60);
  fallDebris(x,gy-60,26,(px,py,r,s)=>qPorcShard(px,py,r,s*1.5),{v:420,w:60});splat(x,gy-40,['150,90,40','190,130,60'],26,420,'drop');toss(t,34,300);t.hurt=.45;hit(u,t,sk);await wait(350);await bodySettle(u);};
function glowFlash(x,y){effects.push({t:0,update(dt){this.t+=dt;return this.t<.35;},draw(){const k=this.t/.35;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,120+180*k,'230,240,255',.8*(1-k));ctx.restore();}});}
// ---- Szerviz – Tányérvihar: a feje fölött sok tányér jelenik meg és pörög, aztán végigsöpörnek a hősökön és becsapódnak
function qPlate(x,y,r,s=1,tilt=.45){ctx.save();ctx.translate(x,y);ctx.scale(s,s*tilt);ctx.rotate(r);let g=ctx.createRadialGradient(-6,-6,2,0,0,26);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#dfe5f0');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,26,0,6.29);ctx.fill();
  ctx.lineWidth=3;ctx.strokeStyle='#c9a227';ctx.stroke();ctx.lineWidth=5;ctx.strokeStyle='#2f62cc';ctx.beginPath();ctx.arc(0,0,20,0,6.29);ctx.stroke();ctx.fillStyle='#ffffff';for(let i=0;i<12;i++){const a=i/12*6.283;ctx.beginPath();ctx.arc(Math.cos(a)*20,Math.sin(a)*20,1.6,0,6.29);ctx.fill();}
  for(let i=0;i<6;i++){const a=i/6*6.283;ctx.fillStyle='#2f62cc';ctx.beginPath();ctx.ellipse(Math.cos(a)*6,Math.sin(a)*6,5,2.4,a,0,6.29);ctx.fill();}ctx.fillStyle='#1a3c96';ctx.beginPath();ctx.arc(0,0,2.6,0,6.29);ctx.fill();ctx.restore();}
A.plateStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;sfx('wind');await bodyWind(u,220,.1);const top=()=>fp(u,.5,-.12),P=[];
  for(let i=0;i<30;i++)P.push({a:i/30*6.283,r:rnd(60,150),h:rnd(-30,40),k:0,go:false,x:0,y:0,sp:rnd(18,30),done:false,d:i*.03,t:al[i%al.length],dy:rnd(-50,40)});const st={t:0,on:true,app:0};
  effects.push({update(dt){st.t+=dt;const c=top();for(const p of P){if(!p.go){p.x=c.x+Math.cos(p.a+st.t*4)*p.r*st.app;p.y=c.y+p.h+Math.sin(p.a+st.t*4)*p.r*.3*st.app;}else{p.k=Math.min(1,p.k+dt/.32);const e=p.k*p.k*p.k;p.x=p.x0+(p.tx-p.x0)*e;p.y=p.y0+(p.ty-p.y0)*e-Math.sin(e*Math.PI)*25;}}return st.on;},
    draw(){for(const p of P)if(!p.done&&st.app>0)qPlate(p.x,p.y,st.t*p.sp,1.3*Math.min(1,st.app*1.4),p.go?.55:.42);}});
  const bz=setInterval(()=>sfx('whoosh'),220);await tween(500,k=>{st.app=easeIO(k);});await wait(700);clearInterval(bz);bodyStrike(u,170,-.16);
  // végigsöpörnek: hullámban, jobbról balra a hősökön át
  const minX=Math.min(...al.map(cx))-260;for(const p of P){p.x0=p.x;p.y0=p.y;p.tx=Math.max(minX,cx(p.t)-rnd(-30,160));p.ty=midY(p.t)+p.dy;}
  for(const p of P){p.go=true;(async()=>{await wait(330);if(p.done)return;p.done=true;sfx('glass');shake(5);fallDebris(p.tx,p.ty,6,(x,y,r,s)=>qPorcShard(x,y,r,s*1.1),{v:420,life:.7});sparks(p.tx,p.ty,['245,248,255','90,130,220'],8,420);soundBlast(p.tx,p.ty,'220,230,255',70,220);p.t.hurt=.35;toss(p.t,10,120);})();await wait(28);}
  await wait(620);shake(14);hitStop(90);for(const t of al)soundBlast(cx(t),midY(t),'200,215,255',150,360);hitAll(u,al,sk);st.on=false;await bodySettle(u);};
for(const k of ['potCrush','plateStorm','cupArmy']){const f=A[k];if(!f)continue;A[k]=async function(u,ts,sk){if(!u||u.type!=='teaset')return f.apply(this,arguments);const rel=keepPose(u);try{return await f.apply(this,arguments);}finally{rel();}};}

// ---- Kockacukor-gólem – Porcukorfelhő: a kezéből hatalmas, gomolygó porcukorfelhő hömpölyög a hősökre
A.sugarDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';await bodyWind(u,260,.16);bodyStrike(u,220,-.22);const o=fp(u,.12,.45),st={t:0};sfx('wind');
  const xs=al.map(cx),x0=Math.min(...xs)-140,x1=Math.max(...xs)+140;
  effects.push({update(dt){st.t+=dt;if(st.t<1.4){for(let i=0;i<5;i++){const tx=rnd(x0,x1),ty=rnd(H*.35,H*.85),life=rnd(1.4,2.2);part({x:o.x+rnd(-20,20),y:o.y+rnd(-20,20),vx:(tx-o.x)/life*1.6,vy:(ty-o.y)/life*1.6,drag:1.2,life,size:rnd(26,44),grow:70,rgb:pick(['255,255,255','248,248,252','240,240,248']),add:false,shape:'puff'});}
        for(let i=0;i<10;i++){const life=rnd(.8,1.2),tx=rnd(x0,x1),ty=rnd(H*.35,H*.85);part({x:o.x,y:o.y,vx:(tx-o.x)/life,vy:(ty-o.y)/life,life,size:rnd(1.5,3),rgb:pick(['255,255,255','255,250,235'])});}}
      if(st.t>.8&&st.t<2.6)for(let i=0;i<3;i++)part({x:rnd(x0,x1),y:rnd(H*.3,H*.8),vx:rnd(-6,6),vy:rnd(5,20),life:.7,size:rnd(2,4),rgb:'255,255,255',shape:'star'});return st.t<2.8;},
    draw(){const a=Math.min(1,Math.max(0,(st.t-.5)*2))*Math.min(1,Math.max(0,(2.8-st.t)*1.5));if(a<=0)return;ctx.save();ctx.globalAlpha=.55*a;const g=ctx.createLinearGradient(0,H*.3,0,H*.9);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.4,'rgba(250,250,255,.9)');g.addColorStop(1,'rgba(240,240,250,.6)');ctx.fillStyle=g;ctx.fillRect(x0-60,H*.3,x1-x0+120,H*.6);ctx.restore();}});
  await wait(1300);for(const t of al){t.hurt=.3;puffs(cx(t),midY(t),8,['255,255,255','245,245,250'],[30,50],{w:60,h:50,shape:'puff'});}hitAll(u,al,sk);await wait(900);u.pose='idle';};

// ---- Mézeskalács – Cukormáz-bomba: a cukormázas bomba a hősök fölött felrobban, és rengeteg cukor zúdul le (kockacukor, cukorkristály, színes szórócukor) – nincs nyálka
function qSugarBomb(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);let g=ctx.createRadialGradient(-6,-6,2,0,0,20);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#f4c8dc');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,18,0,6.29);ctx.fill();ctx.strokeStyle='#b05a80';ctx.lineWidth=1.5;ctx.stroke();
  const cs=['#e8403a','#3a8ae0','#f2c21a','#44b84a','#a050d0'];for(let i=0;i<14;i++){const a=i*2.4,rr=4+(i*5)%13;ctx.save();ctx.translate(Math.cos(a)*rr,Math.sin(a)*rr);ctx.rotate(a*3);ctx.fillStyle=cs[i%5];ctx.fillRect(-3,-1,6,2);ctx.restore();}
  ctx.strokeStyle='#6a4a2a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,-18);ctx.quadraticCurveTo(6,-26,2,-32);ctx.stroke();ctx.restore();}
function qSugarBit(x,y,r,s,kind){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);if(kind===0){ctx.fillStyle='#ffffff';ctx.strokeStyle='#c8ccd8';ctx.lineWidth=1;ctx.fillRect(-6,-6,12,12);ctx.strokeRect(-6,-6,12,12);ctx.fillStyle='#e8ecf4';ctx.fillRect(-6,-6,12,3);}
  else if(kind===1){ctx.fillStyle='rgba(240,250,255,.95)';ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(5,0);ctx.lineTo(0,7);ctx.lineTo(-5,0);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(160,200,230,.9)';ctx.stroke();}
  else{ctx.fillStyle=['#e8403a','#3a8ae0','#f2c21a','#44b84a','#ff8ac0'][kind%5];ctx.beginPath();ctx.roundRect?ctx.roundRect(-5,-1.6,10,3.2,1.6):ctx.rect(-5,-1.6,10,3.2);ctx.fill();}ctx.restore();}
A.icingRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await bodyWind(u,220,.15);u.pose='attack';bodyStrike(u,170,-.2);const o=fp(u,.15,.2),xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=Math.min(...al.map(topY))-80;sfx('whoosh');
  await flyObj(o,{x:mx,y:my},520,(x,y,r)=>qSugarBomb(x,y,r,1.6),{spin:8,arc:120,trail:['255,220,235','255,255,255'],trailAdd:false});
  sfx('boom');flash('255,240,248',.45,.12);shake(12);soundBlast(mx,my,'255,225,240',260,520);puffs(mx,my,14,['255,255,255','255,235,245'],[26,44],{w:50,h:30,shape:'puff'});
  const x0=Math.min(...xs)-140,x1=Math.max(...xs)+140,gy=al.reduce((q,t)=>q+t.y+t.oy,0)/al.length,bits=[];for(let i=0;i<120;i++)bits.push({x:rnd(x0,x1),y:my-rnd(0,320),vy:rnd(300,560),vx:rnd(-40,40),r:rnd(0,6),vr:rnd(-8,8),kind:Math.floor(rnd(0,7)),s:rnd(1,1.6),land:gy-rnd(0,40),d:rnd(0,.9),done:false});
  const st={t:0};effects.push({update(dt){st.t+=dt;for(const b of bits){if(st.t<b.d||b.done)continue;b.y+=b.vy*dt;b.x+=b.vx*dt;b.r+=b.vr*dt;if(b.y>=b.land){b.done=true;if(Math.random()<.25){sparks(b.x,b.land,['255,255,255','255,220,240'],3,120);}}}return st.t<2;},
    draw(){for(const b of bits)if(st.t>=b.d&&!b.done)qSugarBit(b.x,b.y,b.r,b.s,b.kind);}});
  const ck=setInterval(()=>sfx('click'),90);for(let i=0;i<5;i++){for(const t of al){t.hurt=.2;part({x:cx(t)+rnd(-30,30),y:topY(t)+rnd(0,20),vx:rnd(-60,60),vy:-rnd(40,120),g:600,life:.5,size:rnd(3,5),rgb:'255,255,255'});}await wait(250);}clearInterval(ck);
  for(const t of al)puffs(cx(t),topY(t)+20,5,['255,255,255','255,240,248'],[16,26],{shape:'puff'});hitAll(u,al,sk);await wait(400);await bodySettle(u);u.pose='idle';};
