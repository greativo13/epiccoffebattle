
// ===== 10. kör =====
const A_R10=new Map(Object.entries(A));
// ---- valósághű füst-, gőz- és tűztextúrák (CC0: Kenney „Particle Pack” és „Smoke Particles”)
const TXP={sm:[],wp:[],bs:[],fx:[]},TXC={};let TXC_N=0;
if(typeof Image!=='undefined')for(const [g,n] of [['sm',5],['wp',6],['bs',4],['fx',9]])for(let i=0;i<n;i++){const k='tx-'+g+i;if(!IMG_SRC[k])continue;const im=new Image();im.onload=()=>{TXP[g].push(im);};im.src=IMG_SRC[k];}
function txTint(g,i,rgb){const key=g+i+'|'+rgb;let c=TXC[key];if(c)return c;const im=TXP[g][i];if(!im)return null;if(TXC_N>500){for(const k in TXC)delete TXC[k];TXC_N=0;}
  c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');x.drawImage(im,0,0,128,128);x.globalCompositeOperation='source-atop';x.fillStyle=`rgba(${rgb},${g==='bs'?.55:.7})`;x.fillRect(0,0,128,128);TXC_N++;return TXC[key]=c;}
function drawTexPart(p,a,s){let g=p.shape==='smoke'?'sm':p.shape==='fire'?'fx':p.shape==='dsmoke'?'bs':'wp';
  if(g==='fx'&&a<.32&&TXP.bs.length){g='bs';}   // a láng a végén füstté válik
  const L=TXP[g];if(!L.length)return false;if(p.ti==null)p.ti=Math.floor(Math.random()*64);const i=p.ti%L.length;
  const im=g==='fx'?L[i]:txTint(g,i,g==='bs'&&p.shape==='fire'?'70,60,58':p.rgb);if(!im)return false;
  const d=s*(g==='sm'?3.2:g==='fx'?2.6:2.5);ctx.translate(p.x,p.y);ctx.rotate(p.rot*.12);
  ctx.globalAlpha=p.shape==='fire'?(g==='bs'?a/.32*.55:Math.min(1,a*1.5)):g==='sm'?Math.min(.85,a*1.05):Math.min(.9,a*1.3);
  ctx.drawImage(im,-d/2,-d/2,d,d);return true;}

// ---- pontos pont az ellenfél képén (a kép balra néz; fu,fv a kép szélességének/magasságának aránya)
function sprPt(u,fu,fv){const nm=(typeof SPR_ALIAS!=='undefined'&&SPR_ALIAS[u.type])||u.type,b=(u.pose==='attack'||u.pose==='cast')&&ENEMY_SPR[nm+'-attack']||ENEMY_SPR[nm];
  const Hh=u.h*u.scale,Wd=b?b.width*(u.h/b.height)*u.scale:u.w*u.scale;return {x:cx(u)+(fu-.5)*Wd,y:topY(u)+fv*Hh-(u.jump||0)};}
// ugyanez az idézett lénynél (tükrözve, jobbra néz)
function sumPt(def,S0,im,fu,fv){const Hh=(def.h||280)*(S0.s||1),W2=Hh*im.width/im.height;return {x:S0.x+W2/2-fu*W2,y:S0.y-Hh+fv*Hh};}

// ---- hangok: csengő és gong sehol a játékban; a varázslatok lágy, suhogó varázshangot kapnak
SAMPLE_FILES.holy=['hangok/magic1.51d69e88.mp3','hangok/holy3.8893bfc9.mp3'];
SAMPLE_FILES.dark=SAMPLE_FILES.dark.slice(0,2);delete SAMPLE_FILES.gong;
{const shimmer=(v=1)=>{noise('highpass',4500,8000,.55,.06*v);noise('bandpass',1400,3200,.45,.07*v,.04);tone('sine',300,420,.45,.05*v);};
  SFX.holy=()=>{if(!playSample('holy',.8))shimmer();};
  SFX.heal=()=>{if(!playSample('holy',.55,1.08))shimmer(.8);};
  SFX.dust=()=>{if(!playSample('spell',.32,1.45))shimmer(.7);noise('highpass',6500,9000,.6,.035,.05);};
  SFX.shield=()=>{if(!playSample('spell',.7,.8))tone('sine',220,170,.5,.2);noise('lowpass',900,300,.4,.18);};
  SFX.mirror=()=>{if(!playSample('holy',.5,1.25))shimmer();};
  SFX.glass=()=>{if(!playSample('glass',.9)){noise('highpass',7000,2500,.25,.3);noise('bandpass',3000,1500,.15,.2,.03);}};
  SFX.sonic=()=>{tone('sawtooth',900,2400,.35,.09);tone('square',1300,600,.4,.06,.05);noise('bandpass',2500,5000,.4,.15);};
  SFX.wail=()=>{tone('sawtooth',520,260,.9,.08);tone('sine',780,300,.9,.1,.05);noise('bandpass',900,400,.8,.12);};
  SFX.chill=()=>{if(!playSample('ice',.9,.8))noise('highpass',5000,2000,.4,.2);noise('lowpass',1200,200,.6,.15,.05);};
  SFX.bite=()=>{if(!playSample('hit',1,.7))noise('lowpass',900,200,.15,.4);tone('square',140,60,.12,.15);};}

// ---- Fénypajzs: újra a régi megjelenés (minden hős elé pajzs, aztán középen egy nagy marad és az ver vissza).
// Egységes szabály: amíg a nagy pajzs áll, BÁRMELYIK hőst érő támadást visszaveri; annyi támadást bír ki, ahány hős kapta.
{const hS=hit;hit=function(u,t,sk){
  if(t&&t.alive&&t.kind==='hero'&&u&&u.kind==='enemy'&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&!(t.st&&t.st.barrier)&&!(t._blk&&t._blk.u===u&&performance.now()<t._blk.until)){
    const d=S.heroes.find(h=>h!==t&&h.alive&&h.st&&h.st.barrier);if(d){t.st.barrier=d.st.barrier;delete d.st.barrier;}}
  return hS.apply(this,arguments);};}
SK.lightshield.desc='Fénypajzs a csapat elé: felragyog, mindenki elé pajzs kerül, majd középen egy nagy pajzs marad. Amíg áll, bármelyik hőst éri támadás, kivédi és visszaveri a támadóra – annyiszor, ahány hős kapta. A következő kör végéig tart.';

// ---- ellenséges Tükörpajzs (Kristálygólem): ugyanaz, mint az idézése – a következő találatot kivédi és visszaveri
ESK.mirrorguard={name:'Tükörpajzs',tgt:'self',kind:'buff',anim:'mirrorGuard'};
A.mirrorGuard=async(u,ts,sk)=>{u.pose='cast';sfx('shield');flash('170,230,255',.25,.2);const al=S.enemies.filter(e=>e.alive);
  for(const e of al){fxSpin('sunshield',cx(e)-22,midY(e),{size:Math.max(170,e.h*e.scale),life:1,s0:.15,s1:1,out:.4,filter:'hue-rotate(160deg)'});sparks(cx(e)-22,midY(e),['170,230,255','255,255,255'],12,260);addStatus(e,'barrier',2);await wait(110);}
  updateHUD();await wait(500);u.pose='idle';};
NOFX.add('mirrorGuard');
if(EN_DEF.cgolem)EN_DEF.cgolem.skills=[['crystalpunch',3],['shardspray',2],['mirrorguard',1]];
{const deE=drawEntity;drawEntity=function(e){deE(e);if(e.kind==='enemy'&&e.alive&&e.st&&e.st.barrier&&FX_IMG.sunshield){const im=FX_IMG.sunshield,s=Math.max(150,e.h*e.scale*1.05),x=cx(e)-e.w*e.scale*.45,y=midY(e);
  ctx.save();ctx.globalAlpha=.6+.15*Math.sin(T*4);if('filter' in ctx)ctx.filter='hue-rotate(160deg)';ctx.translate(x,y);ctx.scale(.45,1);ctx.drawImage(im,-s/2,-s/2,s,s);ctx.restore();}};}

// ---- kristályszilánk (valódi, áttetsző, csiszolt kristály)
function drawCrystal(x,y,r,s=1,rgb='150,230,255'){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);
  const g=ctx.createLinearGradient(-8,-22,8,22);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.45,`rgba(${rgb},.85)`);g.addColorStop(1,`rgba(${rgb.split(',').map(v=>Math.round(v*.45)).join(',')},.9)`);
  ctx.fillStyle=g;ctx.strokeStyle='rgba(20,60,110,.9)';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(0,-24);ctx.lineTo(7,-10);ctx.lineTo(6,14);ctx.lineTo(0,22);ctx.lineTo(-6,14);ctx.lineTo(-7,-10);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,-24);ctx.lineTo(0,22);ctx.moveTo(-7,-10);ctx.lineTo(0,-6);ctx.lineTo(7,-10);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.moveTo(-5,-9);ctx.lineTo(-1,-18);ctx.lineTo(-2,8);ctx.closePath();ctx.fill();ctx.restore();}
function shardBurst(x,y,n,rgb,v=320,sc=.8){for(let i=0;i<n;i++){const s={x,y,vx:rnd(-v,v),vy:-rnd(v*.3,v*1.1),r:rnd(0,6),vr:rnd(-12,12),t:0,sc:sc*rnd(.6,1.1)};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<.8;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(.8-s.t)*3);drawCrystal(s.x,s.y,s.r,s.sc,rgb);ctx.restore();}});}}
// Szilánkeső: valódi kristályszilánkok zúdulnak a hősökre és szétpattannak
A.shardspray=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';sfx('ice');
  // a gólem testéből kristályok szakadnak ki és fellövődnek
  for(let i=0;i<14;i++){const s={x:cx(u)+rnd(-30,30),y:topY(u)+rnd(10,50),vx:rnd(-160,60),vy:-rnd(500,800),r:rnd(-.4,.4),t:0};effects.push({update(dt){s.t+=dt;s.x+=s.vx*dt;s.y+=s.vy*dt;return s.t<.6;},draw(){drawCrystal(s.x,s.y,s.r,1.1);}});}
  shake(6);await wait(500);u.pose='attack';
  await Promise.all(al.map(t=>rainOn(t,9,(x,y,r,s)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26,'150,230,255',.35);ctx.restore();drawCrystal(x,y,Math.PI+Math.sin(r)*.25,s*1.4);},{v0:520,onLand:it=>{sfx('glass');shardBurst(it.x,it.y,4,'150,230,255',220,.55);sparks(it.x,it.y,['200,245,255','255,255,255'],5,200);}})));
  for(const t of al){shake(5);hit(u,t,sk);}await wait(250);u.pose='idle';};

// ---- Főnix: feltámaszt és teljesen gyógyít, védelem-erősítés nélkül
{const ph=SUMMONS.find(x=>x.id==='phoenix');if(ph){ph.desc='Mindenkit feltámaszt és teljesen meggyógyít.';const r0=ph.run;ph.run=async(P,S0)=>{await r0(P,S0);for(const h of S.heroes)if(h.st&&h.st.defUp){delete h.st.defUp;}updateHUD();};}}

// ---- tűzlehelet: valódi lángnyelvek a szájból (idézett Espresszó és az ellenséges Espresszó)
function fireBreath(o,ts,dir,o2={}){const dur=o2.dur||1100,sp=o2.speed||900,cols=o2.smoke?['220,225,240','170,180,200','255,255,255']:null;const st={t:0};
  return new Promise(res=>{effects.push({update(dt){st.t+=dt;if(st.t*1000<dur){const n=o2.n||14;for(let i=0;i<n;i++){const t=pick(ts.length?ts:[{x:o.x+dir*500,ox:0,y:o.y,oy:0,h:0,scale:1}]);
        const tx=cx(t)+rnd(-60,60),ty=(t.h?midY(t):o.y)+rnd(-50,60),an=Math.atan2(ty-o.y,tx-o.x)+rnd(-.12,.12),v=rnd(sp*.75,sp*1.1);
        if(cols)part({x:o.x,y:o.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.1,life:rnd(.55,.85),size:rnd(6,12),grow:70,rgb:pick(cols),add:false,shape:'smoke'});
        else part({x:o.x+rnd(-4,4),y:o.y+rnd(-4,4),vx:Math.cos(an)*v,vy:Math.sin(an)*v-rnd(0,40),drag:1.2,g:-60,life:rnd(.5,.8),size:rnd(7,12),grow:62,rgb:'255,160,40',add:false,shape:'fire'});}
        for(let i=0;i<4;i++){const an=(dir>0?0:Math.PI)+rnd(-.3,.3),v=rnd(500,900);part({x:o.x,y:o.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.5,life:rnd(.2,.4),size:rnd(2,4),rgb:cols?'255,255,255':pick(['255,240,180','255,200,90'])});}}
      if(st.t*1000>=dur+250){res();return false;}return true;},
    draw(){if(st.t*1000>dur)return;const a=Math.min(1,st.t*5);ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,70*a,cols?'220,230,255':'255,170,60',.8*a);glow(o.x,o.y,28*a,'255,250,220',.9*a);ctx.restore();}});
    for(const t of ts){const d=Math.hypot(cx(t)-o.x,midY(t)-o.y);setTimeout(()=>{if(o2.onHit)o2.onHit(t);},(130+d/sp*1000)/(S.speed||1));}});}
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){es.desc='Espresszó kitátja a száját, és hatalmas lángcsóvát lehel minden ellenségre: óriási tűzsebzés és égés.';
  es.run=async(P,S0)=>{const im=ENEMY_SPR['espresso-attack']||ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;const m=im?sumPt(es,S0,im,.15,.38):{x:S0.x+120,y:S0.y-200};
    // lélegzetvétel: parázs gyűlik a szájban
    sfx('fire');for(let i=0;i<24;i++){const a=rnd(0,6.28),r=rnd(40,90);part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.4,vy:-Math.sin(a)*r/.4,life:.4,size:rnd(2,4),rgb:pick(['255,200,90','255,120,40'])});}
    await wait(420);rumble(1.6,10);flash('255,160,60',.35,.25);sfx('fire');const bz=setInterval(()=>sfx('fire'),330);
    await fireBreath(m,fs,1,{dur:1300,speed:950,n:16,onHit:t=>{if(!t.alive)return;shake(8);for(let i=0;i<8;i++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy-rnd(0,t.h*t.scale),vx:rnd(-30,30),vy:-rnd(60,160),life:rnd(.6,1),size:rnd(10,18),grow:30,rgb:'255,150,40',add:false,shape:'fire'});
      hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}});clearInterval(bz);await wait(300);};}}
// ellenséges Espresszó: Duplán pörkölt lehelet ugyanígy, a szájából (hamu-alakban gőzös-hamus lehelet)
A.doublebreath=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';await dimTo(.35,'40,5,0',200);const ash=u.stance==='ash';
  const m=sprPt(u,.15,.38);sfx('fire');for(let i=0;i<20;i++){const a=rnd(0,6.28),r=rnd(40,80);part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.35,vy:-Math.sin(a)*r/.35,life:.35,size:rnd(2,4),rgb:ash?'230,230,240':'255,180,60'});}
  await wait(380);flash(ash?'220,225,240':'255,150,60',.4,.3);hitStop(80);rumble(1.1,12);const bz=setInterval(()=>sfx('fire'),330);
  await fireBreath(sprPt(u,.15,.38),al,-1,{dur:1200,speed:900,n:15,smoke:ash,onHit:t=>{if(!t.alive)return;shake(6);groundCrack(cx(t),t.y+t.oy,ash?'200,215,255':'255,150,40',110);hit(u,t,sk);}});
  clearInterval(bz);u.pose='idle';await dimTo(0,null,250);};
NOFX.add('doublebreath');

// ---- gőz a szájból (idézett Öreg Oolong és az ellenséges Gőzlehelet)
function steamBreath(o,ts,dir,onHit,dur=1300){const st={t:0};sfx('splash');
  return new Promise(res=>{effects.push({update(dt){st.t+=dt;if(st.t*1000<dur){for(let i=0;i<10;i++){const t=pick(ts),tx=cx(t)+rnd(-70,70),ty=midY(t)+rnd(-60,50),an=Math.atan2(ty-o.y,tx-o.x)+rnd(-.15,.15),v=rnd(550,800);
          part({x:o.x+rnd(-5,5),y:o.y+rnd(-5,5),vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.3,g:-40,life:rnd(.8,1.15),size:rnd(7,12),grow:50,rgb:pick(['245,248,252','230,236,244','255,255,255']),add:false,shape:'smoke'});}
        for(let i=0;i<3;i++){const t=pick(ts),an=Math.atan2(midY(t)-o.y,cx(t)-o.x)+rnd(-.2,.2),v=rnd(600,900);part({x:o.x,y:o.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,g:500,life:.6,size:rnd(2,3.5),rgb:pick(['200,230,255','255,255,255']),add:false,shape:'drop'});}}
      if(st.t*1000>=dur+300){res();return false;}return true;},draw(){if(st.t*1000>dur)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,60,'230,240,255',.6);ctx.restore();}});
    for(const t of ts){const d=Math.hypot(cx(t)-o.x,midY(t)-o.y);setTimeout(()=>{if(t.alive){for(let i=0;i<5;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-40,40),vy:-rnd(30,90),life:rnd(.8,1.2),size:rnd(12,20),grow:25,rgb:'245,245,250',add:false,shape:'smoke'});t.hurt=.35;onHit(t);}},(200+d/650*1000)/(S.speed||1));}
    const bz=setInterval(()=>{if(st.t*1000<dur)sfx('splash');else clearInterval(bz);},380);});}
{const ol=SUMMONS.find(x=>x.id==='oolong');if(ol){ol.desc='Az öreg gőzsárkány kitátja a száját, és forró gőzt lehel minden ellenségre: víz sebzés, és megforrázza őket.';
  ol.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.oolong,m=im?sumPt(ol,S0,im,.27,.38):{x:S0.x+100,y:S0.y-200};
    for(let i=0;i<10;i++)part({x:m.x+rnd(-10,10),y:m.y,vx:rnd(-20,40),vy:-rnd(30,80),life:.8,size:rnd(8,14),grow:20,rgb:'245,245,250',add:false,shape:'smoke'});await wait(350);rumble(1,6);
    await steamBreath(m,fs,1,t=>{hit(P,t,{name:'Forró gőz',kind:'mag',pow:2.3,elem:'water',tgt:'enemies'});if(t.alive&&STATUS.scald)addStatus(t,'scald',2);},1400);await wait(200);};}}
A.scaldSteam=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='attack';const m=sprPt(e,.27,.38);
  for(let i=0;i<10;i++)part({x:m.x+rnd(-10,10),y:m.y,vx:rnd(-40,20),vy:-rnd(30,80),life:.8,size:rnd(8,14),grow:20,rgb:'245,245,250',add:false,shape:'smoke'});await wait(350);
  await steamBreath(m,al,-1,h=>{hit(e,h,sk);if(h.alive)addStatus(h,'scald',2);},1300);e.pose='idle';};

// ---- Gomba-Király: hatalmas, gomolygó lila spórafüst
{const mk=SUMMONS.find(x=>x.id==='mushking');if(mk)mk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('poison');const cap={x:S0.x,y:S0.y-(mk.h||280)*.8};const P3=['170,100,220','140,80,200','200,140,240','120,60,170'];
  // a kalapjából hatalmas spórafelhő tör ki
  for(let i=0;i<40;i++)part({x:cap.x+rnd(-60,60),y:cap.y+rnd(-30,30),vx:rnd(-120,120),vy:-rnd(40,200),drag:1,life:rnd(1.2,1.8),size:rnd(20,40),grow:40,rgb:pick(P3),add:false,shape:'smoke'});
  await wait(350);sfx('poison');const st={t:0};
  effects.push({update(dt){st.t+=dt;if(st.t<1.3)for(let i=0;i<9;i++){const t=pick(fs),k=Math.random();part({x:cap.x+rnd(-40,40),y:cap.y+rnd(-30,30),vx:(cx(t)+rnd(-80,80)-cap.x)*rnd(.9,1.2),vy:(midY(t)+rnd(-80,40)-cap.y)*rnd(.9,1.2),drag:1.2,life:rnd(1.4,2),size:rnd(18,34),grow:45,rgb:pick(P3),add:false,shape:'smoke'});}
      if(st.t<1.5&&Math.random()<.6)part({x:rnd(cap.x,W),y:rnd(H*.3,H*.8),vx:rnd(-10,10),vy:-rnd(10,30),life:1,size:rnd(1.5,3),rgb:'230,190,255'});return st.t<1.6;},draw(){}});
  await wait(1000);for(const t of fs){for(let i=0;i<18;i++)part({x:cx(t)+rnd(-60,60),y:midY(t)+rnd(-60,40),vx:rnd(-30,30),vy:-rnd(5,30),life:rnd(1.4,2.2),size:rnd(28,52),grow:30,rgb:pick(P3),add:false,shape:'smoke'});
    hit(P,t,{name:'Királyi spóra',kind:'mag',pow:.6,elem:'poison',tgt:'enemies',anim:'mushSpore',status:['sleep',1,2]});await wait(100);}
  await wait(500);healAll(P,.2);sfx('heal');await wait(500);};
 if(mk)mk.desc='Hatalmas lila spórafüst gomolyog az ellenségekre: mindenki elalszik (a főellenségek nem), a csapat 20%-ot gyógyul.';}

// ---- Tündérpor: fentről hullik le az összes por a hősökre (csengő hang nélkül)
A.healAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive||t.kind==='hero');await castPose(u,'255,240,140',380);u.pose='attack';const C=['255,240,160','190,255,190','255,200,230','255,255,235'],h=handPos(u);
  // a pálcából egy csillogó porgömb felszáll az ég felé
  sfx('dust');await flyObj({x:h.x,y:h.y},{x:h.x+40,y:-40},420,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'255,240,180',.8);glow(x,y,14,'255,255,255',1);ctx.restore();},{trail:C});
  await wait(150);sfx('dust');
  const xs=al.map(cx),x0=Math.min(...xs)-90,x1=Math.max(...xs)+90,st={t:0};
  effects.push({update(dt){st.t+=dt;if(st.t<1.4)for(let i=0;i<34;i++){const x=rnd(x0,x1);part({x,y:rnd(-30,10),vx:rnd(-12,12),vy:rnd(260,420),drag:.2,life:rnd(1.3,1.8),size:rnd(.8,2.2),rgb:pick(C)});}
      if(st.t<1.4)for(let i=0;i<3;i++)part({x:rnd(x0,x1),y:-10,vx:rnd(-10,10),vy:rnd(200,300),life:1.8,size:rnd(2.5,4),rgb:pick(C),shape:'star'});return st.t<1.5;},
    draw(){const a=Math.sin(Math.min(1,st.t/1.5)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<=4;i++){const gx=x0+(x1-x0)*i/4;ctx.save();ctx.translate(gx,H*.25);ctx.scale(.55,1.6);glow(0,0,(x1-x0)*.35,'255,245,200',.12*a);ctx.restore();}ctx.restore();}});
  await wait(1100);sfx('heal');
  for(const t of al){const hh=t.h*t.scale,x=cx(t),y=midY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8,a=k<.25?k/.25:1-(k-.25)/.75;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,hh*.7,'200,255,200',.55*a);glow(x,y,hh*.35,'255,255,230',.4*a);ctx.restore();}});
    for(let i=0;i<16;i++)part({x:x+rnd(-40,40),y:t.y+t.oy-rnd(0,8),vx:rnd(-60,60),vy:-rnd(10,40),g:120,life:rnd(.5,.8),size:rnd(.8,2),rgb:pick(C)});hit(u,t,sk);}
  await wait(600);u.pose='idle';};

// ---- Álomcsillagok: sarló alakú hold
drawMoon=function(x,y,R,a=1){ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x-R*.6,y,R*2.6,'170,180,255',.22);ctx.globalCompositeOperation='source-over';
  const c=drawMoon.cv||(drawMoon.cv=document.createElement('canvas'));const Z=Math.ceil(R*2+8);c.width=c.height=Z;const g=c.getContext('2d'),m=Z/2;
  const gr=g.createRadialGradient(m-R*.45,m-R*.3,R*.1,m,m,R);gr.addColorStop(0,'#fffbe8');gr.addColorStop(.7,'#f0e6c0');gr.addColorStop(1,'#c8b88a');g.fillStyle=gr;g.beginPath();g.arc(m,m,R,0,6.29);g.fill();
  for(const [dx,dy,r] of [[-.55,-.2,.12],[-.4,.35,.1],[-.7,.15,.07],[-.3,-.55,.08]]){g.fillStyle='rgba(150,130,90,.25)';g.beginPath();g.arc(m+dx*R,m+dy*R,r*R,0,6.29);g.fill();}
  g.globalCompositeOperation='destination-out';g.beginPath();g.arc(m+R*.48,m-R*.18,R*.9,0,6.29);g.fill();
  ctx.drawImage(c,x-m,y-m);ctx.restore();};

// ---- Villámdenevér: Bénító sikoly – vastag, villódzó hanghullám-csóva a szájakból; az idézésnél is ez
function screechFx(o,ts,dir,onHit){sfx('sonic');const st={t:0},bands=[];for(let i=0;i<9;i++)bands.push({d:-i*.1});
  return new Promise(res=>{effects.push({update(dt){st.t+=dt;for(const b of bands)b.d+=dt;if(st.t>1.3){res();return false;}return true;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';for(const b of bands){if(b.d<0||b.d>.9)continue;const k=b.d/.9,r=60+k*820,a=Math.sin(k*Math.PI)*.85,sp=.5-k*.22;
        ctx.lineCap='round';for(const [w,c] of [[30,`rgba(255,220,90,${a*.35})`],[14,`rgba(255,240,150,${a*.7})`],[4,`rgba(255,255,255,${a})`]]){ctx.strokeStyle=c;ctx.lineWidth=w*(1-k*.4);ctx.beginPath();
          for(let j=0;j<=24;j++){const an=(dir>0?0:Math.PI)+(-sp+2*sp*j/24),rr=r+Math.sin(j*.7+st.t*30)*5*(1-k);const x=o.x+Math.cos(an)*rr,y=o.y+Math.sin(an)*rr*.9;j?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}}
      ctx.restore();}});
    for(const t of ts){const d=Math.abs(cx(t)-o.x);setTimeout(()=>{if(!t.alive)return;sfx('thunder');t.hurt=.4;shake(6);const x=cx(t),y=midY(t),hh=t.h*t.scale;
        // a célpontot átjárja az elektromosság (nem égi villám)
        effects.push({t:0,update(dt){this.t+=dt;return this.t<.5;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,240,140,${1-this.t*2})`;ctx.lineWidth=3;for(let k=0;k<4;k++){ctx.beginPath();let px=x+rnd(-40,40),py=y-hh*.5;ctx.moveTo(px,py);for(let s=0;s<6;s++){px+=rnd(-18,18);py+=hh/6;ctx.lineTo(px,py);}ctx.stroke();}glow(x,y,hh*.6,'255,230,120',.4*(1-this.t*2));ctx.restore();}});
        sparks(x,y,['255,245,150','255,255,255'],14,360);onHit(t);},(150+d/900*1000*.9)/(S.speed||1));}});}
A.screech=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';shake(6);const m={x:cx(u)-u.w*u.scale*.15,y:midY(u)-u.h*u.scale*.1};
  await screechFx(m,al,-1,t=>hit(u,t,sk));await wait(250);u.pose='idle';};
NOFX.add('screech');
{const tb=SUMMONS.find(x=>x.id==='tbat');if(tb){tb.desc='A villámdenevérek bénító sikolya: villódzó hanghullám söpör végig az ellenségeken, villám sebzés, 40% eséllyel kábít.';
  tb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;await screechFx({x:S0.x+40,y:S0.y-(tb.h||220)*.55},fs,1,t=>hit(P,t,{name:'Bénító sikoly',kind:'mag',pow:1.9,elem:'thunder',tgt:'enemies',anim:'chainbolt',status:['stun',.4,1]}));await wait(300);};}}

// ---- Kamilla: nagy, díszes legyező, hatalmas lendítés szellemképekkel, aztán a széllökés
function drawBigFan(x,y,ang,R,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);const n=14,sp=1.9;
  for(let i=0;i<n;i++){const a0=-sp/2+i*sp/n,a1=a0+sp/n;const g=ctx.createRadialGradient(0,0,R*.25,0,0,R);g.addColorStop(0,i%2?'#f7e7b8':'#fff3d6');g.addColorStop(1,i%2?'#e9c96c':'#f6dd94');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(Math.cos(a0)*R*.22,Math.sin(a0)*R*.22);ctx.lineTo(Math.cos(a0)*R,Math.sin(a0)*R);ctx.arc(0,0,R,a0,a1);ctx.lineTo(Math.cos(a1)*R*.22,Math.sin(a1)*R*.22);ctx.closePath();ctx.fill();}
  // festett kamillavirágok a papíron
  for(const [an,rr] of [[-.55,.7],[0,.62],[.5,.74],[-.2,.85],[.25,.45]]){const fx=Math.cos(an)*R*rr,fy=Math.sin(an)*R*rr;for(let p=0;p<8;p++){ctx.fillStyle='#ffffff';ctx.beginPath();ctx.ellipse(fx+Math.cos(p*.785)*7,fy+Math.sin(p*.785)*7,6,2.6,p*.785,0,6.29);ctx.fill();}ctx.fillStyle='#f2b51a';ctx.beginPath();ctx.arc(fx,fy,4.5,0,6.29);ctx.fill();}
  ctx.strokeStyle='#7a4a1a';ctx.lineWidth=3;for(let i=0;i<=n;i++){const an=-sp/2+i*sp/n;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*R,Math.sin(an)*R);ctx.stroke();}
  ctx.strokeStyle='#b8862a';ctx.lineWidth=5;ctx.beginPath();ctx.arc(0,0,R,-sp/2,sp/2);ctx.stroke();ctx.lineWidth=2;ctx.strokeStyle='#7a4a1a';ctx.beginPath();ctx.arc(0,0,R*.96,-sp/2,sp/2);ctx.stroke();
  ctx.fillStyle='#c8102e';ctx.beginPath();ctx.arc(0,0,8,0,6.29);ctx.fill();ctx.strokeStyle='#5a0a14';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
{const km=SUMMONS.find(x=>x.id==='kamilla');if(km)km.run=async(P,S0)=>{const K={a:0,ang:-2.4,hist:[],on:true},px=S0.x+60,py=S0.y-(km.h||280)*.62,R=200;
  effects.push({update(){K.hist.unshift(K.ang);K.hist.length=Math.min(K.hist.length,6);return K.on;},draw(){if(K.a<=0)return;
    if(K.fast){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=60;ctx.lineCap='round';ctx.beginPath();ctx.arc(px,py,R*.85,K.hist[K.hist.length-1]-.4,K.ang+.4);ctx.stroke();ctx.restore();
      K.hist.slice(1).forEach((an,i)=>drawBigFan(px,py,an,R,.18*(1-i/6)*K.a));}
    drawBigFan(px,py,K.ang,R,K.a);}});
  await tween(300,k=>{K.a=k;});sfx('whoosh');await tween(380,k=>{K.ang=-2.4-.5*easeIO(k);});K.fast=true;sfx('wind');await tween(220,k=>{K.ang=-2.9+2.9*k*k;});K.fast=false;flash('240,248,255',.3,.15);shake(12);
  const gust={x:px+R,on:true};effects.push({update(dt){gust.x+=1500*dt;for(let i=0;i<12;i++)part({x:gust.x+rnd(-80,60),y:rnd(H*.2,H*.88),vx:rnd(700,1200),vy:rnd(-40,40),life:.45,size:rnd(1.5,3.2),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
      for(let i=0;i<4;i++)part({x:gust.x,y:rnd(H*.35,H*.88),vx:rnd(500,900),vy:rnd(-120,20),life:.9,size:rnd(5,8),rgb:pick(['255,250,235','255,230,120']),add:false,shape:'leaf'});
      if(Math.random()<.7)part({x:gust.x-40,y:rnd(H*.6,H*.9),vx:rnd(300,600),vy:-rnd(10,60),life:.9,size:rnd(14,26),grow:30,rgb:'230,236,245',add:false,shape:'smoke'});return gust.on&&gust.x<W+200;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(gust.x-80,H*.58);ctx.scale(1.5,1.1);glow(0,0,220,'230,240,255',.35);ctx.restore();}});
  const foes=foesAlive(),done=new Set();await tween(900,k=>{const gx=px+R+1500*k*.9;for(const t of foes)if(!done.has(t)&&gx>cx(t)-40){done.add(t);shake(10);sfx('hit');sparks(cx(t),midY(t),['255,255,255','230,240,255'],18,440);
      tween(520,q=>{t.ox=130*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);t.spin=Math.sin(q*Math.PI)*.25;}).then(()=>{t.ox=0;t.spin=0;});hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});}});
  for(const t of foes)if(!done.has(t)&&t.alive)hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});gust.on=false;await tween(300,k=>{K.ang=-K.ang*0+(0-1.2*k);});await tween(300,k=>{K.a=1-k;});K.on=false;};}

// ---- méhraj: valósághű, szőrös méhek sűrű, agresszív raja; rohamokban csapnak le (idézés és ellenséges Zümmögővihar)
function drawRealBee(x,y,s,f,flip){ctx.save();ctx.translate(x,y);ctx.scale(flip?-s:s,s);
  ctx.fillStyle='rgba(225,238,255,.55)';ctx.strokeStyle='rgba(120,140,170,.6)';ctx.lineWidth=.6;const w=Math.abs(Math.sin(f));
  ctx.beginPath();ctx.ellipse(-1,-6*w,7,3.2,-.35,0,6.29);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(3,-5*w,5.5,2.6,-.1,0,6.29);ctx.fill();ctx.stroke();
  const g=ctx.createRadialGradient(-2,-2,1,0,0,9);g.addColorStop(0,'#ffe27a');g.addColorStop(1,'#d08a00');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(-3,0,8,5.6,0,0,6.29);ctx.fill();
  ctx.fillStyle='#24160a';for(const sx of [-6,-2,2])ctx.fillRect(sx-1,-5,2.2,10);ctx.beginPath();ctx.moveTo(-11,0);ctx.lineTo(-15,0);ctx.lineTo(-11,1.6);ctx.fill();
  ctx.fillStyle='#3a2410';ctx.beginPath();ctx.arc(6,0,4.4,0,6.29);ctx.fill();ctx.fillStyle='#1a0e04';ctx.beginPath();ctx.arc(8,-1.6,1.8,0,6.29);ctx.fill();
  ctx.strokeStyle='#1a0e04';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(8,-3);ctx.quadraticCurveTo(11,-8,13,-7);ctx.stroke();ctx.restore();}
function beeSwarmFx(src,ts,onHit,n=110,stings=4){const bees=[];for(let i=0;i<n;i++)bees.push({x:src.x+rnd(-50,50),y:src.y+rnd(-50,50),vx:0,vy:0,t:ts[i%ts.length],ph:rnd(0,6),sp:rnd(.7,1.4),r:rnd(40,150),s:rnd(1.5,2.3),dive:0,oy:rnd(-.5,.5)});
  const st={t:0,on:true,phase:0};effects.push({update(dt){st.t+=dt;for(const b of bees){let tx,ty;if(st.phase===2){tx=src.x+Math.cos(b.ph)*60;ty=src.y+Math.sin(b.ph)*40;}else{const t=b.t;const dive=b.dive>0;tx=cx(t)+(dive?rnd(-20,20):Math.cos(st.t*2.4*b.sp+b.ph)*b.r);ty=midY(t)+b.oy*t.h*t.scale*.5+(dive?rnd(-30,30):Math.sin(st.t*3.1*b.sp+b.ph)*b.r*.6);}
        b.dive=Math.max(0,b.dive-dt);const g=Math.min(1,dt*(b.dive>0?14:(st.t<.9?2.2:7))),nx=b.x+(tx-b.x)*g+rnd(-2,2),ny=b.y+(ty-b.y)*g+rnd(-2,2);b.vx=(nx-b.x)/Math.max(dt,.001);b.vy=(ny-b.y)/Math.max(dt,.001);b.x=nx;b.y=ny;}return st.on;},
    draw(){ctx.save();for(const b of bees){ctx.globalAlpha=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(b.x,(b.t&&b.t.y?b.t.y+b.t.oy:H*.8)+4,5*b.s,1.6*b.s,0,0,6.29);ctx.fill();}ctx.restore();
      for(const b of bees)drawRealBee(b.x,b.y,b.s,st.t*70+b.ph,b.vx<0);}});
  return (async()=>{const bz=setInterval(()=>sfx('buzz'),260);sfx('buzz');await wait(900);
    for(let r=0;r<stings;r++){for(const b of bees)if(Math.random()<.45)b.dive=.25;await wait(120);for(const t of ts)if(t.alive){t.hurt=.3;shake(5);sfx('needle');for(let i=0;i<6;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-50,40),vx:rnd(-80,80),vy:rnd(-80,30),life:.35,size:rnd(2,4),rgb:pick(['255,220,60','255,255,200'])});}await wait(220);}
    for(const t of ts)if(t.alive)onHit(t);await wait(250);st.phase=2;clearInterval(bz);await wait(700);st.on=false;})();}
{const qb=SUMMONS.find(x=>x.id==='queenbee');if(qb){qb.desc='Hatalmas, dühös méhraj tör ki a Mézkirálynő mögül, és újra meg újra lecsap az ellenségekre: természet sebzés és méreg.';
  qb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;await beeSwarmFx({x:S0.x+40,y:S0.y-(qb.h||280)*.6},fs,t=>hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]}),130,4);};}}
A.beeSwarm=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';await beeSwarmFx({x:cx(e)-40,y:midY(e)},al,h=>hit(e,h,sk),110,4);e.pose='idle';};
