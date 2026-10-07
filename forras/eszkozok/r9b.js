// ---- valódi hangfelvételek (CC0: „RPG Sound Pack” – artisticdude, „80 CC0 RPG SFX” és „100 CC0 SFX” – rubberduck, OpenGameArt)
const SAMPLE_FILES=__SAMPLES__;
const SAMPLE_BUF={};
function loadSamples(){if(!SND.ctx||SND.samplesLoading)return;SND.samplesLoading=true;
  for(const k in SAMPLE_FILES){SAMPLE_BUF[k]=[];for(const f of SAMPLE_FILES[k])fetch(f).then(r=>r.ok?r.arrayBuffer():Promise.reject()).then(ab=>new Promise((res,rej)=>SND.ctx.decodeAudioData(ab,res,rej))).then(b=>{SAMPLE_BUF[k].push(b);}).catch(()=>{});}}
function playSample(k,vol=1,rate){const L=SAMPLE_BUF[k];if(!SND.ctx||!L||!L.length)return false;const b=L[Math.floor(Math.random()*L.length)],s=SND.ctx.createBufferSource(),g=SND.ctx.createGain();
  s.buffer=b;s.playbackRate.value=rate||(.93+Math.random()*.14);g.gain.value=vol*3.2;s.connect(g);g.connect(SND.sfxGain);s.start();return true;}
{const si=sndInit;sndInit=function(){const r=si.apply(this,arguments);loadSamples();return r;};}
if(typeof addEventListener==='function')for(const ev of ['pointerdown','keydown'])addEventListener(ev,()=>{if(SND.ctx)loadSamples();},{passive:true});
// a hangeffektek a felvételt játsszák (ha betöltődött), egyébként a régi szintetizált hangot; néhány réteges
{const syn={...SFX};
  const use=(name,sample,vol=1,layer)=>{SFX[name]=()=>{const ok=playSample(sample,vol);if(!ok||layer)syn[name]&&(ok?layer():syn[name]());};};
  use('slash','slash',1);use('hit','hit',1);use('rock','rock',1.1);use('fire','fire',.9);use('ice','ice',1);use('dark','dark',.9);use('poison','poison',1);
  use('holy','holy',.8);use('heal','holy',.6,()=>{});use('glass','glass',.9);use('splash','splash',1);use('squish','squish',1);use('boing','boing',.9);use('growl','growl',.9);
  use('needle','ice',.6);use('lava','fire',1,()=>playSample('rock',.7,.7));use('shield','gong',.5);use('buff','spell',.9);
  SFX.boom=()=>{if(!playSample('boom',1.2))syn.rock();};
  SFX.thunder=()=>{syn.thunder();playSample('boom',.5,1.4);};
  SFX.mirror=()=>{if(!playSample('gong',.4,1.6))syn.mirror&&syn.mirror();};
  SFX.levelup=SFX.levelup||(()=>{});}
// ha egy animáció fél másodpercig semmilyen hangot nem ad, az eleméhez illő hang szól
let SFX_N=0;{const s0=sfx;sfx=function(n){SFX_N++;return s0.apply(this,arguments);};}
{const elemSnd=sk=>sk&&({fire:'fire',ice:'ice',thunder:'thunder',holy:'holy',dark:'dark',poison:'poison',nature:'poison',water:'splash',earth:'rock'}[sk.elem]||(['heal','elixir','revive','bless','cleanse','mp'].includes(sk.kind)?'heal':sk.kind==='buff'?'buff':'slash'));
  for(const k of Object.keys(A)){const f=A[k];if(typeof f!=='function')continue;A[k]=function(u,ts,sk){const n0=SFX_N;setTimeout(()=>{if(SFX_N===n0)sfx(elemSnd(sk));},450/(S.speed||1));return f.apply(this,arguments);};}}

// ---- a „Pajzs” állapot (védelem-erősítés) neve „Védelem+” – a Fénypajzzsal nem keverhető
STATUS.defUp=['Védelem+',STATUS.defUp?STATUS.defUp[1]:'#9fd0ff'];
{const ph=SUMMONS.find(x=>x.id==='phoenix');if(ph)ph.desc='Mindenkit feltámaszt, teljesen meggyógyít, és 1 körig erősebb lesz a védelmük.';
 if(LIMITS.fairy&&LIMITS.fairy.desc)LIMITS.fairy.desc=LIMITS.fairy.desc.replace('és pajzsot ad','és erősebb lesz a védelmük');}

// ---- tárgyak: a fegyverek a bolt elején, a Tűzbomba már az 1-2 után
{for(const id of ['firebomb','knife']){const i=SHOP_ITEMS.findIndex(x=>x[0]===id);if(i>=0){const e=SHOP_ITEMS.splice(i,1)[0];if(id==='firebomb')e[1]='1-2';SHOP_ITEMS.unshift(e);}}}

// ---- Dobótőr: három hatalmas, pörgő tőr egyszerre
function drawDagger(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);
  const g=ctx.createLinearGradient(0,-6,0,6);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#b8c0d0');g.addColorStop(1,'#6a7080');ctx.fillStyle=g;ctx.strokeStyle='#2a2f3a';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(34,0);ctx.lineTo(4,-6);ctx.lineTo(4,6);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#c8a040';ctx.fillRect(0,-10,5,20);ctx.strokeRect(0,-10,5,20);ctx.fillStyle='#5a3a1e';ctx.fillRect(-16,-3.5,16,7);ctx.fillStyle='#c8a040';ctx.beginPath();ctx.arc(-18,0,4,0,6.29);ctx.fill();ctx.restore();}
A.throwKnife=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;u.pose='attack';sfx('slash');const h=handPos(u),T={x:cx(t),y:midY(t)};
  const ks=[-1,0,1].map(i=>({i,tx:T.x+rnd(-12,12),ty:T.y+i*26}));
  await Promise.all(ks.map(k=>wait((k.i+1)*70).then(()=>flyObj({x:h.x,y:h.y},{x:k.tx,y:k.ty},300,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,30,'220,230,255',.5);ctx.restore();drawDagger(x,y,r,1.8);},{spin:28,arc:30+k.i*20,trail:['230,235,255','255,255,255'],trailShape:'streak'})).then(()=>{
    sfx('hit');sparks(k.tx,k.ty,['255,255,255','200,210,230','255,200,120'],14,380);t.hurt=.3;shake(6);stuckArrow&&effects.push({t:0,update(dt){this.t+=dt;return this.t<.7;},draw(){ctx.save();ctx.globalAlpha=1-this.t/.7;drawDagger(k.tx-20,k.ty,Math.PI*.05,1.6);ctx.restore();}});})));
  flash('230,235,255',.25,.12);hitStop(70);hit(u,t,sk);await wait(350);u.pose='idle';};

// ---- Tündérpor: sűrű porfelhő, ami teljesen beteríti a hősöket
{const ha=A.healAll;A.healAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive||t.kind==='hero');const C=['255,240,160','190,255,190','255,200,230','255,255,235'];const st={t:0};
  setTimeout(()=>effects.push({update(dt){st.t+=dt;for(const t of al){const hh=t.h*t.scale,w=t.w*t.scale;for(let i=0;i<9;i++)part({x:cx(t)+rnd(-w*.7,w*.7),y:t.y+t.oy-rnd(0,hh*1.15),vx:rnd(-15,15),vy:rnd(10,45),drag:.4,life:rnd(.6,1.1),size:rnd(.8,2.2),rgb:pick(C)});}return st.t<1.6;},
    draw(){const a=Math.sin(Math.min(1,st.t/1.6)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';for(const t of al)glow(cx(t),midY(t),t.h*t.scale*.7,'255,245,200',.22*a);ctx.restore();}}),1200/(S.speed||1));
  return ha(u,ts,sk);};}

// ---- Tisztítás: minden zöld
{const cf=A.cleanseFx;A.cleanseFx=async(u,ts,sk)=>{const keep={flash,sparks,castPose};const G='120,255,150';
  flash=(rgb,a,l)=>keep.flash(G,a,l);sparks=(x,y,rgbs,n,v)=>keep.sparks(x,y,[G,'200,255,200','230,255,230'],n,v);castPose=(u2,rgb,ms)=>keep.castPose(u2,G,ms);
  const fs=fxSpin;fxSpin=function(key,x,y,o){if(key==='cleansefx')key=tint('cleansefx',G)||key;return fs.call(this,key,x,y,o);};
  try{await cf(u,ts,sk);}finally{flash=keep.flash;sparks=keep.sparks;castPose=keep.castPose;fxSpin=fs;}};}

// ---- Pálcakoppintás: Lili odarepül, és a pálcájával tényleg rákoppint; zöld tündérpor és zöld aura
A.wandbonk=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const G='120,255,140';
  const tx=t.x-((t.w*t.scale)/2+(u.w*u.scale)/2-10),dx=tx-u.x,dy=(t.y-30)-u.y,sp=260;
  u.pose='cast';wandTrail(u,G,10);sfx('dust');await wait(120);ghosts(u,sp);
  await tween(sp,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*50;if(Math.random()<.6)wandTrail(u,G,1);});
  // felemeli a pálcát, és lecsap vele
  u.pose='attack';await tween(130,k=>{u.spin=-.25*k;});const x=cx(t),y=topY(t)+t.h*t.scale*.2;
  await tween(90,k=>{u.spin=-.25+.45*k;});sfx('hit');sfx('dust');shake(7);hitStop(60);flash('210,255,210',.25,.1);
  ring(x,y,G,90,.4);for(let i=0;i<10;i++){const a=i/10*6.283;part({x,y,vx:Math.cos(a)*220,vy:Math.sin(a)*220,drag:2,life:.6,size:6,rgb:pick([G,WAND_GOLD]),shape:'star'});}
  for(let i=0;i<50;i++)part({x:x+rnd(-60,60),y:y-rnd(0,40),vx:rnd(-20,20),vy:rnd(30,110),drag:.4,life:rnd(.8,1.3),size:rnd(.8,2),rgb:pick([G,'200,255,190','255,255,230'])});
  const hh=t.h*t.scale,mx=cx(t),my=midY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8,a=k<.2?k/.2:1-(k-.2)/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,my,hh*.75,G,.7*a);glow(mx,my,hh*.4,'230,255,220',.45*a);ctx.restore();}});
  hit(u,t,sk);await wait(260);u.spin=0;u.pose='idle';ghosts(u,sp*.7);
  await tween(sp,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*30;});u.ox=0;u.oy=0;u.jump=0;};

// ---- Álomcsillagok: valósághű telihold kráterekkel; aki eltalál, biztosan elalszik (a nagy ellenségek nem)
function drawMoon(x,y,R,a=1){ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x,y,R*3.2,'170,180,255',.35);glow(x,y,R*1.6,'230,235,255',.45);ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(x-R*.35,y-R*.35,R*.1,x,y,R);g.addColorStop(0,'#fbfbf4');g.addColorStop(.7,'#dcdcd2');g.addColorStop(1,'#a8a89e');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,R,0,6.29);ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(x,y,R,0,6.29);ctx.clip();
  for(const [dx,dy,r,o] of [[-.3,-.2,.28,.22],[.25,.15,.2,.2],[.1,-.45,.12,.18],[-.15,.4,.16,.2],[.45,-.15,.1,.18],[-.5,.15,.09,.16],[.05,.05,.07,.15]]){ctx.fillStyle=`rgba(120,120,112,${o})`;ctx.beginPath();ctx.arc(x+dx*R,y+dy*R,r*R,0,6.29);ctx.fill();ctx.strokeStyle=`rgba(255,255,250,${o*.8})`;ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x+dx*R+1,y+dy*R+1,r*R,3.6,5.6);ctx.stroke();}
  const sh=ctx.createRadialGradient(x+R*.5,y+R*.4,R*.2,x,y,R*1.1);sh.addColorStop(0,'rgba(40,40,70,0)');sh.addColorStop(1,'rgba(40,40,70,.35)');ctx.fillStyle=sh;ctx.fillRect(x-R,y-R,R*2,R*2);ctx.restore();ctx.restore();}
SK.sleepdust.status=['sleep',1,2];SK.sleepdust.desc='Lili meglengeti a pálcáját: feljön a telihold, és álomcsillagok hullanak minden ellenségre. Akit eltalálnak, biztosan elalszik (a főellenségek és minibosszok nem). Ütésre felébrednek.';
{const as9=addStatus;addStatus=function(t,type,turns){if(type==='sleep'&&S._sleepStars&&t&&t.d&&(t.d.boss||t.d.miniboss)){popLabel(t,'ALVÁS: IMMUNIS','#b8c4d8');return;}return as9.apply(this,arguments);};}
A.sleepStars=async(u,ts,sk)=>{const {al,mx}=grp(ts);if(!al.length)return;S._sleepStars=true;await dimTo(.72,'6,6,36',300);await castPose(u,'190,170,255',360);sfx('holy');
  const M={x:Math.max(330,mx-280),y:95,a:0,t:0};effects.push({update(dt){M.t+=dt;return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;
    for(let i=0;i<70;i++){const sx=(i*137)%W,sy=(i*71)%320;ctx.fillStyle=`rgba(255,255,255,${.7*(.5+.5*Math.sin(M.t*4+i))})`;ctx.fillRect(sx,sy,2,2);}ctx.restore();drawMoon(M.x,M.y-(1-M.a)*40,56,M.a);}});
  await tween(600,k=>{M.a=k;});u.pose='attack';for(let i=0;i<3;i++){wandTrail(u,pick([WAND_GOLD,'190,170,255']),12);await wait(80);}sfx('dust');
  const shots=[];for(const t of al)for(let j=0;j<3;j++)shots.push(wait(j*140+rnd(0,80)).then(()=>fxFly('star',M.x+rnd(-30,30),M.y+rnd(-20,20),cx(t)+rnd(-30,30),midY(t)+rnd(-30,30),380,{size:110,base:Math.PI/4,hx:.21,hy:.21,trail:[WAND_GOLD,'190,170,255','255,255,255']})).then(()=>{sparks(cx(t),midY(t),[WAND_GOLD,'190,170,255','255,255,255'],10,260);}));
  await Promise.all(shots);sfx('heal');
  for(const t of al){const x=cx(t),y=midY(t),r0=Math.max(60,t.w*t.scale*.6);effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<3;i++){const a=this.t*7+i*2.1,r=r0*(1-this.t*.5);part({x:x+Math.cos(a)*r,y:y-40+this.t*90+Math.sin(a)*r*.35,vx:0,vy:20,life:.5,size:rnd(3,6),rgb:pick([WAND_GOLD,'190,170,255','255,255,255']),shape:'star'});}return this.t<1;},
    draw(){const a=Math.sin(Math.min(1,this.t)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,r0*1.3,'150,130,255',.35*a);ctx.restore();}});}
  await wait(800);try{for(const t of al)hit(u,t,sk);}finally{S._sleepStars=false;}
  await wait(700);M.done=true;await tween(400,k=>{M.a=1-k;});M.a=0;u.pose='idle';await dimTo(0,null,250);};

// ---- Forgószél: szél és tornádó nélkül, csak a pörgő lángoló fejszék
A.whirl=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('whoosh');
  const st={on:true,t:0};effects.push({update(dt){st.t+=dt;if(st.on&&Math.random()<.5){const a=st.t*16;part({x:cx(u)+Math.cos(a)*120,y:midY(u)+Math.sin(a)*50,vx:-Math.sin(a)*400,vy:Math.cos(a)*150,drag:3,life:.3,size:rnd(2,3),rgb:pick(['255,200,120','255,255,255']),shape:'streak'});}return st.on;},
    draw(){if(!st.on)return;const x=cx(u),y=midY(u),R=125;
      ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const an=st.t*15+i*Math.PI/3;ctx.strokeStyle='rgba(255,170,80,.28)';ctx.lineWidth=22;ctx.beginPath();ctx.ellipse(x,y,R,R*.42,0,an-.8,an);ctx.stroke();}ctx.restore();
      const axes=[];for(let i=0;i<6;i++){const an=st.t*15+i*Math.PI/3;axes.push({an,z:Math.sin(an)});}axes.sort((a,b)=>a.z-b.z);
      for(const q of axes){const s=104*(.85+.15*q.z);for(let g=2;g>=1;g--){const an=q.an-g*.12;drawAxe(x+Math.cos(an)*R,y+Math.sin(an)*R*.42,an+Math.PI/2,s,.18*(3-g));}drawAxe(x+Math.cos(q.an)*R,y+Math.sin(q.an)*R*.42,q.an+Math.PI/2,s,1);}}});
  const x0=u.x,y0=u.y;const order=al.slice().sort((a,b)=>cx(a)-cx(b));
  for(const t of order){const dx=t.x-x0-100,dy=t.y-y0;await tween(260,k=>{const e=easeIO(k);u.ox+=((dx)-u.ox)*e;u.oy+=((dy)-u.oy)*e;u.spin=(u.spin||0)+.6;});
    for(let i=0;i<4;i++){sparks(cx(t),midY(t),['255,240,200','255,255,255','255,160,60'],14,480);t.hurt=.2;shake(6);sfx('slash');await wait(80);}hitStop(60);hit(u,t,sk);toss(t,36,300);}
  await tween(320,k=>{u.ox*=1-k;u.oy*=1-k;u.spin=(u.spin||0)+.6;});u.ox=0;u.oy=0;u.spin=0;st.on=false;u.pose='idle';await wait(200);};
SK.whirl.desc='Grog pörögni kezd, hat lángoló kétélű fejsze forog körülötte, és végigsöpör minden ellenségen. A tüskés rózsák visszaszúrnak!';

// ---- idézések a visszajelzések szerint
{const byId=id=>SUMMONS.find(x=>x.id===id);
 // Óramű ágyúüteg: hatalmas robbanások
 const cn=byId('cannon');if(cn)cn.run=async(P,S0)=>{for(const t of foesAlive()){flash('255,200,120',.25,.08);sfx('boom');await fxFly('boulders',S0.x+80,S0.y-110,cx(t),midY(t),220,{size:80,norot:true,spin:10,trail:['90,90,100','255,200,120']});
     const x=cx(t),y=midY(t);explosion(x,y,'255,160,60',2.2);fxSpin(tint('nova','255,150,50')||'nova',x,y,{size:Math.max(420,bigOf(t)*2.2),life:.7,s0:.2,s1:1.2,add:true,out:.35});sfx('boom');
     for(let i=0;i<40;i++){const a=rnd(0,6.28),v=rnd(250,800);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:1.8,life:rnd(.5,1),size:rnd(4,10),rgb:pick(['255,200,90','255,120,40','255,240,200'])});}
     for(let i=0;i<14;i++)part({x:x+rnd(-50,50),y:y+rnd(-40,40),vx:rnd(-100,100),vy:-rnd(40,140),life:rnd(1,1.6),size:rnd(20,36),rgb:pick(['70,60,55','100,90,80']),add:false,shape:'smoke'});
     flash('255,220,160',.4,.15);shake(18);hitStop(80);toss(t,40,340);hit(P,t,{name:'Sortűz',kind:'phys',pow:2.2,elem:'phys',tgt:'enemies',anim:'summon',plateBreak:true});await wait(160);}await wait(400);};
 // Espresszó: hatalmas lángcsóva
 const es=byId('espresso');if(es)es.run=async(P,S0)=>{rumble(2,10);sfx('fire');const fs=foesAlive(),mx=Math.max(...fs.map(cx));const o={x:S0.x+150,y:S0.y-170},F={on:true,k:0};
   effects.push({update(){if(F.on)for(let i=0;i<14;i++){const q=rnd(0,F.k),tx=o.x+(mx+80-o.x)*q,ty=o.y+(H*.62-o.y)*q;part({x:tx+rnd(-20,20),y:ty+rnd(-30,30)*q,vx:rnd(200,500),vy:rnd(-60,60),life:rnd(.25,.5),size:rnd(14,30)*(.5+q),rgb:pick(['255,90,20','255,160,40','255,220,90','255,250,200']),grow:-10});}return F.on;},
     draw(){ctx.save();ctx.globalCompositeOperation='lighter';const tx=o.x+(mx+80-o.x)*F.k,ty=o.y+(H*.62-o.y)*F.k;const g=ctx.createLinearGradient(o.x,o.y,tx,ty);g.addColorStop(0,'rgba(255,250,210,.9)');g.addColorStop(.5,'rgba(255,170,40,.7)');g.addColorStop(1,'rgba(255,80,20,.3)');
       ctx.strokeStyle=g;ctx.lineCap='round';ctx.lineWidth=90;ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(tx,ty);ctx.stroke();ctx.lineWidth=40;ctx.strokeStyle='rgba(255,250,220,.6)';ctx.stroke();glow(tx,ty,180,'255,120,30',.5);ctx.restore();}});
   await tween(500,k=>{F.k=easeIO(k);});flash('255,160,60',.6,.3);hitStop(100);sfx('fire');
   for(const t of fs){fxHold('firestorm',cx(t),t.y+t.oy+18,{h:Math.max(480,bigOf(t)*2.6),life:1.4,anchor:'bottom',rise:.2,flick:.085});fxSpin(tint('nova','255,140,40')||'nova',cx(t),midY(t),{size:Math.max(380,bigOf(t)*2),life:.7,s0:.2,s1:1.2,add:true});hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}
   await wait(900);F.on=false;await wait(300);};
 // Gomba-Király: csak a lila spórafelhő (a zöld méreg-folt nélkül)
 NOFX.add('mushSpore');const mk=byId('mushking');if(mk)mk.run=async(P,S0)=>{spellsReady();sfx('poison');for(const t of foesAlive()){cloudFx(t,['190,120,230','150,90,200']);
     for(let i=0;i<10;i++)part({x:cx(t)+rnd(-50,50),y:midY(t)+rnd(-40,40),vx:rnd(-20,20),vy:-rnd(10,40),life:rnd(1,1.6),size:rnd(20,34),rgb:pick(['180,120,230','150,90,200']),add:false,shape:'smoke'});
     hit(P,t,{name:'Királyi spóra',kind:'mag',pow:.6,elem:'poison',tgt:'enemies',anim:'mushSpore',status:['sleep',1,2]});await wait(120);}await wait(300);healAll(P,.2);sfx('heal');await wait(500);};
 // Öreg Oolong: vissza az eredeti gőzfüggönyhöz
 const ol=byId('oolong');if(ol)ol.run=async(P,S0)=>{await A.scaldSteam(S0.x!=null?{...P,x:S0.x}:P,foesAlive(),{name:'Forró gőz',kind:'mag',pow:2.3,elem:'water',tgt:'enemies'});};
 // Mézkirálynő: egy nagy méhraj támad
 function drawBee(x,y,s,f){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(230,240,255,.7)';ctx.beginPath();ctx.ellipse(-2,-7,6,4*Math.abs(Math.sin(f)),-.5,0,6.29);ctx.ellipse(3,-7,6,4*Math.abs(Math.cos(f)),.5,0,6.29);ctx.fill();
   ctx.fillStyle='#f2b81a';ctx.strokeStyle='#2a1a05';ctx.lineWidth=1.2;ctx.beginPath();ctx.ellipse(0,0,9,6,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='#2a1a05';ctx.fillRect(-3,-6,2.5,12);ctx.fillRect(2,-6,2.5,12);ctx.beginPath();ctx.moveTo(-9,0);ctx.lineTo(-13,0);ctx.stroke();ctx.restore();}
 const qb=byId('queenbee');if(qb)qb.run=async(P,S0)=>{const foes=foesAlive();sfx('buzz');const bees=[];for(let i=0;i<70;i++)bees.push({x:-60-rnd(0,300),y:rnd(H*.3,H*.75),t:foes[i%foes.length],ph:rnd(0,6),sp:rnd(.8,1.3),r:rnd(30,80)});
   const st={t:0,on:true};effects.push({update(dt){st.t+=dt;for(const b of bees){const tx=cx(b.t)+Math.cos(st.t*6*b.sp+b.ph)*b.r,ty=midY(b.t)+Math.sin(st.t*7*b.sp+b.ph)*b.r*.6;b.x+=(tx-b.x)*Math.min(1,dt*2.5*b.sp);b.y+=(ty-b.y)*Math.min(1,dt*2.5*b.sp);}return st.on;},
     draw(){for(const b of bees)drawBee(b.x,b.y,1.4,st.t*60+b.ph);}});
   const bz=setInterval(()=>sfx('buzz'),450);await wait(1300);
   for(let r=0;r<3;r++){for(const t of foesAlive()){sparks(cx(t),midY(t),['255,210,60','255,255,255'],10,300);t.hurt=.3;}sfx('needle');shake(6);await wait(250);}
   for(const t of foesAlive())hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]});
   await wait(300);for(const b of bees){b.t={x:W+300,ox:0,y:b.y,oy:0,h:0,scale:1,lift:0,e:1};}clearInterval(bz);await wait(900);st.on=false;};
 // Az Ezerrészes Szerviz: a csészekatonák végigszaladnak, és ahogy elhaladnak, megsebeznek
 const tsv=byId('teaset');if(tsv)tsv.run=async(P,S0)=>{const cup=ENEMY_SPR.cupsoldier;const army=[];for(let i=0;i<9;i++)army.push({x:-120-i*80,y:H*.5+((i%3)-1)*55+20});
   const st={t:0,on:true};effects.push({update(dt){st.t+=dt;return st.on;},draw(){if(!cup)return;for(const s of army){const hh=140,w=hh*cup.width/cup.height;ctx.save();ctx.translate(s.x,s.y-Math.abs(Math.sin(st.t*12+s.x*.05))*12);ctx.scale(-1,1);ctx.drawImage(cup,-w/2,-hh/2,w,hh);ctx.restore();}}});
   const foes=foesAlive(),hitDone=new Set();sfx('slash');const total=1700;
   await tween(total,k=>{army.forEach((s,i)=>{s.x=-120-i*80+(W+900)*k;if(Math.random()<.2)part({x:s.x,y:s.y+60,vx:-rnd(40,120),vy:-rnd(10,40),life:.6,size:rnd(8,14),rgb:'200,190,170',add:false,shape:'smoke'});});
     for(const t of foes)if(!hitDone.has(t)&&army[0].x>cx(t)){hitDone.add(t);sfx('glass');sparks(cx(t),midY(t),['245,248,255','90,130,220'],24,500);shake(8);toss(t,30,300);hit(P,t,{name:'Porcelánroham',kind:'phys',pow:2.4,elem:'phys',tgt:'enemies'});}});
   for(const t of foes)if(!hitDone.has(t)&&t.alive)hit(P,t,{name:'Porcelánroham',kind:'phys',pow:2.4,elem:'phys',tgt:'enemies'});st.on=false;await wait(200);};
 tsv&&(tsv.desc='A Szerviz csészekatonái végigrohannak a csatatéren, és minden ellenséget eltaposnak: nagy fegyversebzés.');
 qb&&(qb.desc='Hatalmas méhraj rajzik az ellenségekre, és összecsípi őket: természet sebzés és méreg.');
 ol&&(ol.desc='Az öreg gőzsárkány forró gőzfüggönyt borít az ellenségekre: víz sebzés, és megforrázza őket.');
 mk&&(mk.desc='Lila spórafelhő: minden ellenség elalszik (a főellenségek nem), a csapat 20%-ot gyógyul.');
 // Kamilla: hatalmas széllökés a legyezőjével, ami megsebzi és hátralöki az ellenségeket
 const km=byId('kamilla');if(km){km.desc='Kamilla meglendíti óriás legyezőjét: hatalmas széllökés söpör végig az ellenségeken, hátralöki és megsebzi őket.';SUMMON_EL.kamilla='phys';
  km.run=async(P,S0)=>{const sp=ENEMY_SPR.kamilla,K={x:-200,a:0,sw:0,on:true};
   effects.push({update(){return K.on;},draw(){if(!sp||K.a<=0)return;const hh=340,w=hh*sp.width/sp.height;ctx.save();ctx.globalAlpha=K.a;ctx.translate(K.x,H*.62);ctx.drawImage(sp,-w/2,-hh,w,hh);ctx.restore();
     // legyező
     ctx.save();ctx.globalAlpha=K.a;ctx.translate(K.x+w*.35,H*.62-hh*.55);ctx.rotate(-1.2+K.sw*1.9);for(let i=0;i<9;i++){const an=-.9+i*.225;ctx.fillStyle=i%2?'#fff4d0':'#f2d98a';ctx.strokeStyle='#8a6a20';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*110,Math.sin(an)*110);ctx.lineTo(Math.cos(an+.225)*110,Math.sin(an+.225)*110);ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}});
   await tween(500,k=>{K.a=k;K.x=-200+360*easeIO(k);});await tween(300,k=>{K.sw=k*.3;});sfx('whoosh');await tween(160,k=>{K.sw=.3+.7*k;});sfx('wind');
   // széllökés: szélcsíkok, levelek, por
   const gust={x:K.x+120,on:true};effects.push({update(dt){gust.x+=1400*dt;for(let i=0;i<8;i++)part({x:gust.x+rnd(-60,60),y:rnd(H*.25,H*.85),vx:rnd(600,1000),vy:rnd(-40,40),life:.5,size:rnd(1.5,3),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
     for(let i=0;i<2;i++)part({x:gust.x,y:rnd(H*.4,H*.85),vx:rnd(500,800),vy:rnd(-80,20),life:.8,size:rnd(4,7),rgb:pick(['255,240,200','240,220,150']),add:false,shape:'leaf'});return gust.on&&gust.x<W+200;},
     draw(){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(gust.x-260,0,gust.x+40,0);g.addColorStop(0,'rgba(230,240,255,0)');g.addColorStop(1,'rgba(230,240,255,.35)');ctx.fillStyle=g;ctx.fillRect(gust.x-260,H*.2,300,H*.7);ctx.restore();}});
   const foes=foesAlive(),done=new Set();await tween(900,k=>{const gx=K.x+120+1400*k*.9;for(const t of foes)if(!done.has(t)&&gx>cx(t)-40){done.add(t);shake(10);sparks(cx(t),midY(t),['255,255,255','230,240,255'],16,420);
       tween(500,q=>{t.ox=110*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);}).then(()=>{t.ox=0;});hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});}});
   for(const t of foes)if(!done.has(t)&&t.alive)hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});gust.on=false;await wait(500);await tween(400,k=>{K.a=1-k;});K.on=false;};}
 // Koffeines mókus: nagy széllel és lökéshullámokkal száguld végig
 const sq=byId('squirrel');if(sq)sq.run=async(P,S0)=>{const x0=S0.x;sfx('whoosh');const foes=foesAlive(),done=new Set();
   await tween(520,k=>{S0.x=x0+(1000-x0)*k;const y=S0.y;for(let i=0;i<6;i++)part({x:S0.x-rnd(20,160),y:y-rnd(0,140),vx:-rnd(300,700),vy:rnd(-30,30),life:.35,size:rnd(1.5,3),rgb:pick(['255,255,255','255,230,180']),shape:'streak'});
     for(let i=0;i<2;i++)part({x:S0.x-40,y:y-rnd(0,20),vx:-rnd(80,200),vy:-rnd(20,80),life:.7,size:rnd(14,26),rgb:'200,180,150',add:false,shape:'smoke'});
     for(const t of foes)if(!done.has(t)&&S0.x>cx(t)){done.add(t);sfx('hit');ring(cx(t),t.y+t.oy,'255,240,200',220,.5);ring(cx(t),midY(t),'255,255,255',160,.35);fxSpin(tint('nova','255,230,180')||'nova',cx(t),midY(t),{size:300,life:.4,s0:.2,s1:1.1,add:true});shake(10);toss(t,44,320);
       fxImage('slash',cx(t),midY(t),{size:bigOf(t)*.9,life:.25,rot:rnd(-1,1)});hit(P,t,{name:'Mókus',kind:'phys',pow:.9,elem:'phys',tgt:'enemies',anim:'summon'});t.gold=(t.gold||0)*2;}});
   for(const e of S.enemies)if(!e.alive)e.gold=(e.gold||0)*2;showBanner('Dupla kávébab!',false);S0.x=-80;await tween(380,k=>{S0.x=-80+(x0+80)*k;});await wait(200);};
}
