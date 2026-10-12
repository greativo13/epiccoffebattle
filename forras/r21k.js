// ===== 24. kör: a III. rész ellenfeleinek támadásai újra – a teljes tesztlista „gagyi” jelölései szerint =====
// Pontok a rácsos képeken mérve (a kép tört-koordinátái, a figura balra néz):
//   Habverő-manó merőkanál .12,.62 · feje teteje .6,.2 · Csészeharcos merőkanál .08,.17 · Gőzkád-szellem szája .47,.37, kád .6,.68
//   Mozaik-szellem kezei .08,.55 és .9,.75, szeme .27,.21 · Matcha-gólem tála .48,.17 · Kőőr buzogánya .1,.27
const KP=(u,fu,fv)=>sprPt(u,fu,fv);

// ---- Hab: fehér-halványzöld, buborékos matchahab (nem zöld nyálka, nem füst), és ami a hősre kerül, pár másodperc alatt lefolyik és eltűnik
function r21Froth(x,y,r,a=1,rot=0){const im=R17I.froth;ctx.save();ctx.globalAlpha*=a;
  if(im){const w=r*3;ctx.translate(x,y);ctx.rotate(rot);ctx.drawImage(im,-w/2,-w/2*im.height/im.width,w,w*im.height/im.width);ctx.restore();return;}
  const g=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'#ffffff');g.addColorStop(.6,'#f1f8e6');g.addColorStop(1,'#cfe6b4');ctx.fillStyle=g;
  for(const [dx,dy,k] of [[0,0,1],[-.55,.2,.7],[.55,.15,.72],[-.2,-.45,.6],[.3,-.4,.55]]){ctx.beginPath();ctx.arc(x+dx*r,y+dy*r,r*k,0,7);ctx.fill();}
  ctx.strokeStyle='rgba(150,190,120,.55)';ctx.lineWidth=1.2;for(let i=0;i<6;i++){const bx=x+Math.cos(i*2.1)*r*.55,by=y+Math.sin(i*1.7)*r*.45,br=r*(.09+.05*(i%3));ctx.beginPath();ctx.arc(bx,by,br,0,7);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.95)';ctx.beginPath();ctx.arc(bx-br*.35,by-br*.35,br*.3,0,7);ctx.fill();}
  ctx.restore();}
drawFoamBlob=function(x,y,r,a=1){r21Froth(x,y,r*1.1,a,(x*7+y*3)%6.28);};
foamPour=function(x0,y0,targets,n=90,ms=700){const B=[];for(let i=0;i<n;i++){const t=pick(targets);B.push({x:x0,y:y0,tx:cx(t)+rnd(-50,50),ty:midY(t)+rnd(-60,40),r:rnd(10,22),d:rnd(0,ms*.6),k:0,drip:0});}
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;for(const b of B){b.k=Math.max(0,Math.min(1,(E.t-b.d)/(ms*.5)));if(b.k>=1)b.drip+=dt*40;}
      // landolás után lassan lecsúszik és elfogy (nem marad zöld folt a hősön)
      if(E.t>ms+900)E.a=Math.max(0,E.a-dt*1.4);return E.a>0;},
    draw(){for(const b of B){if(!b.k)continue;const x=b.x+(b.tx-b.x)*b.k,y=b.y+(b.ty-b.y)*b.k-Math.sin(b.k*Math.PI)*90+b.drip;drawFoamBlob(x,y,b.r*(.6+.4*b.k),E.a);}}});return E;};
// habpermet-felhő egy pontból (sok kis buborék)
function r21FrothBurst(x,y,n=24,v=320){for(let i=0;i<n;i++){const a=rnd(0,6.28),s=rnd(.3,1)*v;part({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-80,g:500,drag:1.2,life:rnd(.5,.9),size:rnd(5,11),rgb:pick(['255,255,255','240,250,228','214,236,190']),add:false,shape:'dot'});}}

// ---- Habverő-manó – Habzápor: a merőkanalába habot ver, aztán hatalmas habsugarat zúdít a hősre
A.whiskSpray=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';const sc=()=>KP(u,.12,.62);
  // felhúzás: őrült habverés – a feje (a habverő) rázkódik, hab fröcsög
  sfx('whoosh');await tween(520,k=>{u.lean=.08*Math.sin(k*40);const p=sc();if(Math.random()<.7)r21FrothBurst(p.x,p.y-10,2,140);});u.lean=0;
  await bodyWind(u,160,-.12);bodyStrike(u,160,.2);sfx('splash');
  const F=[],S0={on:true};const p0=sc();
  effects.push({update(dt){if(S0.on)for(let i=0;i<7;i++){const p=sc();F.push({x:p.x,y:p.y,vx:(cx(t)-p.x)*rnd(1.6,2.1)+rnd(-50,50),vy:(midY(t)-p.y)*rnd(1.6,2.1)+rnd(-110,40),r:rnd(18,36),life:0,rot:rnd(0,6)});if(Math.random()<.5)r21FrothBurst(p.x,p.y,1,160);}
      for(const f of F){f.life+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=260*dt;}for(let i=F.length-1;i>=0;i--)if(F[i].life>.75)F.splice(i,1);return S0.on||F.length;},
    draw(){for(const f of F)r21Froth(f.x,f.y,f.r*(.6+f.life),Math.min(1,(.75-f.life)*4),f.rot);}});
  await wait(420);const E=foamPour(cx(t)+20,midY(t)-40,[t],46,420);await wait(480);S0.on=false;t.hurt=.5;toss(t,40,320);shake(10);sfx('splash');r21FrothBurst(cx(t),midY(t),30,380);hit(u,t,sk);await wait(450);await bodySettle(u);}finally{rel();u.lean=0;}};

// ---- Habverő-manó – Habverő-pörgés: búgócsigaként pörög a hősig (a feje, a habverő hab-örvényt kavar), négyszer belecsap, és visszapörög
A.whiskSpin=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const x0=u.ox||0,dx=(cx(t)+t.w*t.scale*.55+u.w*u.scale*.35)-cx(u);
  const R={on:true,a:0};effects.push({update(){if(R.on)for(let i=0;i<3;i++){const an=T*20+i*2.1,rr=u.w*u.scale*.55;part({x:cx(u)+Math.cos(an)*rr,y:midY(u)+Math.sin(an)*rr*.35,vx:-Math.sin(an)*260,vy:rnd(-80,10),life:.4,size:rnd(5,10),rgb:pick(['255,255,255','230,246,214']),add:false,shape:'dot'});}return R.on;},draw(){}});
  sfx('whoosh');await tween(420,k=>{u.spin=k*30;u.ox=x0+dx*easeIO(k);u.jump=Math.abs(Math.sin(k*Math.PI*3))*16;});
  for(let i=0;i<4;i++){await tween(110,k=>{u.spin+=1.2;});sfx('hit');shake(6);t.hurt=.25;r21FrothBurst(cx(t),midY(t)+rnd(-30,30),10,300);sparks(cx(t),midY(t),['255,255,255','220,240,200'],8,300);}
  hit(u,t,sk);await tween(420,k=>{u.spin+=.9;u.ox=x0+dx*(1-easeIO(k));u.jump=Math.abs(Math.sin(k*Math.PI*2))*14;});R.on=false;u.spin=0;u.ox=x0;u.jump=0;}finally{rel();}};

// ---- Mochi-nyálka – Mochi-ugrás: egyre nagyobbat pattan (nyúlik-lapul), a harmadiknál magasról rázuhan a hősre, és szétlapítja
A.mochiBounce=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const x0=u.ox||0,dx=(cx(t)+t.w*t.scale*.2)-cx(u),sq=u.sq||1;
  const hops=[[70,.33],[140,.66],[330,1]];let px=0;
  for(const [hgt,f] of hops){await tween(120,k=>{u.sq=sq*(1-.25*Math.sin(k*Math.PI*.5));});sfx('boing');const from=px,to=f;
    await tween(260+hgt*.6,k=>{const e=from+(to-from)*k;u.ox=x0+dx*e;u.jump=Math.sin(k*Math.PI)*hgt;u.sq=sq*(1+.18*Math.sin(k*Math.PI));});px=to;u.jump=0;
    if(f<1){u.sq=sq*.72;sfx('splash');puffs&&puffs(cx(u),u.y+u.oy,6,['240,236,220','220,214,196'],[14,24],{w:60,up:20});await tween(110,k=>u.sq=sq*(.72+.28*k));}}
  // becsapódás: szétlapul a hősön, a hős is összenyomódik
  u.sq=sq*.55;shake(22);hitStop(110);sfx('quake');flash('255,252,240',.35,.12);const s0=t.spin||0;t.spin=Math.acos(.75);t.hurt=.5;
  for(let i=0;i<26;i++)part({x:cx(t)+rnd(-60,60),y:t.y+t.oy-rnd(0,30),vx:rnd(-320,320),vy:rnd(-300,-60),g:800,life:rnd(.5,.8),size:rnd(7,14),rgb:pick(['250,246,232','232,226,208']),add:false,shape:'drop'});
  dustWave&&dustWave(cx(t),t.y+t.oy);hit(u,t,sk);await tween(260,k=>{u.sq=sq*(.55+.45*eOutBack(k));});t.spin=s0;
  await tween(420,k=>{u.ox=x0+dx*(1-easeIO(k));u.jump=Math.sin(k*Math.PI)*90;});u.ox=x0;u.jump=0;u.sq=sq;}finally{rel();}};

// ---- Bambuszkígyó – Tekeredés: a bambuszkígyó vastag, szelvényes teste háromszor körbetekeredik a hősön (elöl-hátul), összeszorít, és a feje beleharap
function r21SnakeBody(P,thick,front){ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
  for(let i=1;i<P.length;i++){const a=P[i-1],b=P[i];if(!!b.f!==front)continue;const w=thick*(.55+.45*Math.min(1,i/8))*(b.f?1:.92);
    ctx.strokeStyle=b.f?'#2f5214':'#22400e';ctx.lineWidth=w+6;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    const g=ctx.createLinearGradient(b.x,b.y-w/2,b.x,b.y+w/2);g.addColorStop(0,b.f?'#c9e27a':'#8fae4c');g.addColorStop(.45,b.f?'#79b03a':'#557f27');g.addColorStop(1,b.f?'#3c6a1a':'#2b4b12');ctx.strokeStyle=g;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
    if(i%4===0){ctx.strokeStyle='rgba(40,60,15,.9)';ctx.lineWidth=3;const nx=-(b.y-a.y),ny=b.x-a.x,L=Math.hypot(nx,ny)||1;ctx.beginPath();ctx.moveTo(b.x+nx/L*w*.5,b.y+ny/L*w*.5);ctx.lineTo(b.x-nx/L*w*.5,b.y-ny/L*w*.5);ctx.stroke();}}
  ctx.restore();}
A.snakeCoil=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const d=await dashTo(u,t,260,-30);const gx=cx(t),top=topY(t)+t.h*t.scale*.12,bot=t.y+t.oy-8,RX=t.w*t.scale*.6+24,thick=Math.max(30,t.h*t.scale*.13);
  const C={k:0,sq:0,a:1,bite:0};const N=90;
  const pts=()=>{const P=[];const n=Math.max(2,Math.round(N*C.k));for(let i=0;i<n;i++){const q=i/(N-1),an=q*Math.PI*2*3+Math.PI*.5,y=bot-(bot-top)*q,rx=RX*(1-C.sq*.2);P.push({x:gx+Math.cos(an)*rx,y:y+Math.sin(an)*rx*.22,f:Math.sin(an)>0});}return P;};
  const cim=R17I.coils;effects.unshift({update(){return C.a>0;},draw(){if(C.a<=0||cim)return;ctx.save();ctx.globalAlpha=C.a;r21SnakeBody(pts(),thick,false);ctx.restore();}});
  effects.push({update(){return C.a>0;},draw(){if(C.a<=0)return;ctx.save();ctx.globalAlpha=C.a;const P=pts();if(cim){const Hc=(bot-top)*.62,w=Math.min(RX*2.3,Hc*cim.width/cim.height*1.15)*(1-C.sq*.12);ctx.save();ctx.beginPath();ctx.rect(gx-w,bot+20-Hc*C.k,w*2,Hc*C.k+10);ctx.clip();ctx.drawImage(cim,gx-w/2,bot+20-Hc,w,Hc);ctx.restore();}else r21SnakeBody(P,thick,true);
      const h=P[P.length-1];if(h&&C.k>.98){// fej: a tetején, nyitott szájjal
        const hx=h.x,hy=h.y-thick*.4-C.bite*10;ctx.fillStyle='#5f9a2c';ctx.strokeStyle='#22400e';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(hx,hy,thick*.9,thick*.6,-.3,0,7);ctx.fill();ctx.stroke();
        ctx.fillStyle='#ffe066';ctx.beginPath();ctx.arc(hx-thick*.3,hy-thick*.15,thick*.15,0,7);ctx.fill();ctx.fillStyle='#111';ctx.beginPath();ctx.ellipse(hx-thick*.3,hy-thick*.15,thick*.05,thick*.13,0,0,7);ctx.fill();
        ctx.fillStyle='#7a1a1a';ctx.beginPath();ctx.moveTo(hx-thick*.85,hy+thick*.1);ctx.lineTo(hx-thick*.1,hy+thick*.25+C.bite*thick*.4);ctx.lineTo(hx-thick*.2,hy+thick*.05);ctx.fill();
        ctx.fillStyle='#fff';for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(hx-thick*(.75-i*.2),hy+thick*.12);ctx.lineTo(hx-thick*(.68-i*.2),hy+thick*.3);ctx.lineTo(hx-thick*(.62-i*.2),hy+thick*.12);ctx.fill();}}
      ctx.restore();}});
  sfx('whoosh');await tween(700,k=>C.k=easeIO(k));
  for(let i=0;i<3;i++){sfx('crunch');await tween(170,k=>{C.sq=Math.sin(k*Math.PI);t.spin=Math.acos(1-.2*Math.sin(k*Math.PI));t.hurt=.3;});shake(9);hitStop(50);}
  t.spin=0;sfx('bite');await tween(140,k=>C.bite=k);shake(14);sparks(cx(t),topY(t)+20,['255,255,255','200,40,40'],16,360);hit(u,t,sk);await tween(140,k=>C.bite=1-k);
  await wait(250);await tween(380,k=>{C.k=1-k;C.a=1-k*.3;});C.a=0;await dashBack(u,d);}finally{rel();}};

// ---- Kőőr – Buzogánycsapás: magasra ugrik, a hatalmas kő-habverő buzogánnyal a földbe csap; kráter, két irányba futó festett kőhullám, sziklazápor
A.stoneMace=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const d=await dashTo(u,t,300,10);await bodyWind(u,300,-.24);sfx('whoosh');
  await tween(320,k=>{u.jump=Math.sin(k*Math.PI*.5)*170;});await tween(150,k=>{u.jump=170*(1-k*k);});u.jump=0;await bodyStrike(u,110,.32);
  const gx=cx(t)+10,gy=t.y+t.oy+4;shake(30);sfx('quake');sfx('boom');flash('255,235,200',.5,.18);hitStop(140);rumble&&rumble(1.2,10);
  groundCrack&&groundCrack(gx,gy,'190,170,130',260);
  const wim=R17I.stonewave,Wv={k:0,a:1};effects.push({update(){return Wv.a>0;},draw(){if(!wim)return;ctx.save();ctx.globalAlpha=Wv.a;const s=.5+.6*Wv.k,dx=60+340*Wv.k;
      r17Draw(wim,gx+dx,gy+14,320*s,{anchor:'bottom'});r17Draw(wim,gx-dx,gy+14,320*s,{anchor:'bottom',fx:true});ctx.restore();}});
  tween(700,k=>{Wv.k=easeIO(k);Wv.a=k<.6?1:1-(k-.6)/.4;});
  for(let i=0;i<46;i++)part({x:gx+rnd(-70,70),y:gy,vx:rnd(-380,380),vy:rnd(-620,-200),life:rnd(.7,1.2),size:rnd(7,16),rgb:pick(['150,140,120','115,105,90','175,165,140']),g:1000,add:false,shape:'rock'});
  for(let i=0;i<16;i++)part({x:gx+rnd(-140,140),y:gy-rnd(0,20),vx:rnd(-90,90),vy:-rnd(30,90),life:rnd(.9,1.4),size:rnd(26,46),grow:30,rgb:'190,175,150',add:false,shape:'smoke'});
  t.hurt=.6;toss(t,70,460);hit(u,t,sk);await wait(500);await bodySettle(u);await dashBack(u,d);}finally{rel();}};

// ---- Mozaik-szellem: nagyobb figura; Mozaiklövedék – a szeméből (nem csak a kezéből) hatalmas, forgó csempegömb nő, és szétrobban a hősön
if(EN_DEF.mosaicghost){EN_DEF.mosaicghost.h=Math.round(EN_DEF.mosaicghost.h*1.3);EN_DEF.mosaicghost.w=Math.round(EN_DEF.mosaicghost.w*1.3);}
A.mosaicBolt=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';const h=KP(u,.08,.55),T2=[];for(let i=0;i<90;i++)T2.push({a:rnd(0,7),r:rnd(10,80),s:rnd(14,30),c:pick(TILE_C),rot:rnd(0,6),sp:rnd(2,5)});
  const B={x:h.x-30,y:h.y-30,k:0,a:1,ex:0};effects.push({t:0,update(dt){this.t+=dt;return B.a>0;},draw(){ctx.save();ctx.globalAlpha=B.a;ctx.globalCompositeOperation='lighter';glow(B.x,B.y,120*(1-B.ex)+40,'80,230,200',.55);ctx.restore();ctx.save();ctx.globalAlpha=B.a;
      for(const p of T2){const r=p.r*(.4+.6*B.k)+B.ex*p.r*7,an=p.a+this.t*p.sp,x=B.x+Math.cos(an)*r,y=B.y+Math.sin(an)*r*.8;tileShard(x,y,p.s,p.rot+this.t*3,p.c);}ctx.restore();}});
  sfx('glass');await tween(650,k=>{B.k=eOutBack(k);});sfx('whoosh');const sx=B.x,sy=B.y;await tween(420,k=>{B.x=sx+(cx(t)-sx)*k;B.y=sy+(midY(t)-sy)*k-Math.sin(k*Math.PI)*70;});
  shake(18);flash('120,240,210',.4,.15);sfx('glass');sfx('boom');hitStop(80);t.hurt=.5;toss(t,50,360);hit(u,t,sk);await tween(520,k=>{B.ex=k;B.a=1-k*k;});}finally{rel();}};
A.mosaicShards=async(u,ts,sk)=>{const rel=keepPose(u);try{u.pose='cast';const hs=[KP(u,.08,.55),KP(u,.9,.75),KP(u,.27,.21)];await bodyWind(u,260,-.1);sfx('glass');const F=[];
  for(const t of ts)for(let i=0;i<30;i++){const h=pick(hs);F.push({x0:h.x,y0:h.y,x1:cx(t)+rnd(-50,50),y1:midY(t)+rnd(-70,60),d:rnd(0,650),s:rnd(18,36),c:pick(TILE_C),r:rnd(0,6),t})}
  const E={t:0,a:1};const hitT=new Set();effects.push({update(dt){E.t+=dt*1000;for(const f of F){if(!f.done&&E.t-f.d>380){f.done=true;f.t.hurt=.25;if(Math.random()<.35)sfx('glass');if(Math.random()<.2)shake(4);
      // a csempe becsapódáskor szétrobban: villanás, apró csempeszilánkok
      R18E({t:0,update(dt){this.t+=dt;return this.t<.35;},draw(){const k=this.t/.35;ctx.save();ctx.globalCompositeOperation='lighter';glow(f.x1,f.y1,f.s*(1.2+2*k),'120,255,220',.8*(1-k));ctx.restore();}});
      for(let q=0;q<7;q++)part({x:f.x1,y:f.y1,vx:rnd(-320,320),vy:rnd(-340,120),g:700,life:rnd(.4,.7),size:rnd(3,7),rgb:pick(['47,191,159','224,184,74','88,214,192','255,255,255']),add:false,shape:'rock'});}}return E.a>0;},
    draw(){ctx.save();ctx.globalAlpha=E.a;for(const f of F){const k=Math.max(0,Math.min(1,(E.t-f.d)/380));if(!k||f.done)continue;const x=f.x0+(f.x1-f.x0)*k,y=f.y0+(f.y1-f.y0)*k-Math.sin(k*Math.PI)*90;
      if(k<1){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,f.s,'90,230,200',.35);ctx.restore();}tileShard(x,y,f.s*(k<1?1:.8),f.r+E.t/70,f.c);}ctx.restore();}});
  bodyStrike(u,200,.14);await wait(1100);for(const t of ts){shake(9);sparks(cx(t),midY(t),['120,240,210','255,240,160'],20,420);hit(u,t,sk);await wait(70);}await wait(300);await tween(350,k=>E.a=1-k);}finally{rel();}};

// ---- Szerzetes-varjú – Csőrcsapás: felröppen, sötét utóképekkel háromszor lecsap más-más irányból, tollvihar
A.crowDive=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const sp=ENEMY_SPR[u.type+'-attack']||ENEMY_SPR[u.type];const ghosts=[];
  effects.push({update(){for(const g of ghosts)g.a-=.06;while(ghosts.length&&ghosts[0].a<=0)ghosts.shift();return u.alive&&(ghosts.length||G.on);},draw(){if(!sp)return;const hh=u.h*u.scale,ww=hh*sp.width/sp.height;
    for(const g of ghosts){ctx.save();ctx.globalAlpha=g.a*.45;ctx.translate(g.x,g.y);ctx.scale(-1,1);ctx.drawImage(tintSpr(sp,'rgb(20,20,40)',.85),-ww/2,-hh,ww,hh);ctx.restore();}}});
  const G={on:true};const feathers=(x,y,n)=>{for(let j=0;j<n;j++)part({x,y,vx:rnd(-220,220),vy:rnd(-260,-40),life:rnd(.9,1.4),size:rnd(10,16),rgb:pick(['20,20,26','40,40,50','230,120,30']),add:false,shape:'leaf',g:160,drag:.8});};
  sfx('whoosh');feathers(cx(u),midY(u),16);await tween(300,k=>u.jump=k*240);
  const x0=u.x,y0=u.y;const angs=[[1,-1],[-.6,-1],[.2,-1.2]];
  for(let i=0;i<3;i++){const [ax,ay]=angs[i],sx=(cx(t)+ax*220)-x0,sy=(t.y-y0)+ay*40;u.ox=sx;u.oy=sy;u.jump=260;await wait(60);sfx('whoosh');
    await tween(170,k=>{u.ox=sx+((cx(t)+t.w*t.scale*.35-x0)-sx)*k;u.oy=sy+((t.y-y0)-sy)*k;u.jump=260*(1-k)+30;ghosts.push({x:cx(u),y:u.y+u.oy-u.jump,a:.9});});
    await bodyStrike(u,80,.3);shake(10);sfx('hit');hitStop(50);t.hurt=.35;feathers(cx(t),midY(t),12);sparks(cx(t),midY(t),['255,240,200','255,255,255'],10,300);
    if(i<2)await tween(160,k=>{u.jump=30+k*230;});}
  hit(u,t,sk);G.on=false;const ox=u.ox,oy=u.oy;await tween(360,k=>{u.ox=ox*(1-k);u.oy=oy*(1-k);u.jump=30*(1-k)+Math.sin(k*Math.PI)*90;});u.ox=0;u.oy=0;u.jump=0;await bodySettle(u);}finally{rel();}};

// ---- Matcha-gólem – Csészecsapás: a habverő-kezével lecsap, és a tálból valódi zöld matchatea löttyen ki (folyadék + habkorona), nem füst
A.golemSlam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const d=await dashTo(u,t,300,0);await bodyWind(u,280,-.2);await tween(200,k=>u.jump=k*90);await tween(120,k=>u.jump=90*(1-k));u.jump=0;await bodyStrike(u,120,.28);
  shake(24);sfx('quake');sfx('splash');hitStop(100);flash('210,250,170',.3,.12);const b=KP(u,.48,.17);
  // tea löttyen ki a tálból a hősre (íves folyadéksugár)
  for(let i=0;i<70;i++){const q=Math.random();setTimeout(()=>part({x:b.x+rnd(-20,20),y:b.y,vx:(cx(t)-b.x)*rnd(1.2,2.2)+rnd(-60,60),vy:-rnd(250,480),g:1100,life:rnd(.7,1.1),size:rnd(6,13),rgb:pick(['86,140,40','110,170,50','70,115,30']),add:false,shape:'drop'}),q*260);}
  await wait(300);for(let i=0;i<40;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-30,30),vx:rnd(-300,300),vy:rnd(-360,-60),g:900,life:.8,size:rnd(6,12),rgb:pick(['86,140,40','110,170,50']),add:false,shape:'drop'});
  foamPour(cx(t),midY(t)-30,[t],16,300);t.hurt=.5;toss(t,50,380);hit(u,t,sk);await wait(400);await bodySettle(u);await dashBack(u,d);}finally{rel();}};

// ---- Gőzkád-szellem – Forró gőz (mindenkire) és Gőzsugár: a kád felforr, gőzgejzír tör fel, a forró gőzfelhő végiggördül a hősökön (hőségvibrálás, vörös izzás)
function r21Steam(x,y,vx,vy,big){part({x,y,vx,vy,life:rnd(.8,1.3),size:rnd(big?30:18,big?56:34),grow:70,rgb:pick(['250,252,250','232,238,236','255,255,255']),add:false,shape:'smoke',drag:.5});}
A.scaldMist=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{u.pose='attack';const tub=KP(u,.6,.68),m=KP(u,.47,.37);sfx('steam');
  // a kád forr: buborékok, gejzír
  await tween(500,k=>{for(let i=0;i<3;i++)part({x:tub.x+rnd(-80,80),y:tub.y-rnd(0,10),vx:rnd(-20,20),vy:-rnd(120,260),life:.5,size:rnd(4,8),rgb:'200,240,170',add:false,shape:'dot'});if(Math.random()<.8)r21Steam(tub.x+rnd(-60,60),tub.y-20,rnd(-30,30),-rnd(200,380),true);u.lean=.04*Math.sin(k*30);});
  await bodyWind(u,200,-.12);bodyStrike(u,200,.16);sfx('whoosh');const xs=al.map(cx),xmin=Math.min(...xs)-120,gy=al.reduce((s,t)=>s+midY(t),0)/al.length;
  const S0={on:true,x:m.x};const iv=setInterval(()=>{if(!S0.on)return;for(let i=0;i<6;i++)r21Steam(S0.x+rnd(-40,40),gy+rnd(-90,60),rnd(-160,-60),rnd(-40,20),true);},30);
  const R={a:0};effects.push({update(){return S0.on||R.a>0;},draw(){if(R.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';for(const t of al)glow(cx(t),midY(t),t.h*t.scale*.7,'255,90,50',.35*R.a);ctx.restore();}});
  await tween(900,k=>{S0.x=m.x+(xmin-m.x)*easeIO(k);R.a=Math.min(1,k*1.5);for(const t of al)if(S0.x<cx(t)+30&&!t._sc){t._sc=1;t.hurt=.4;shake(8);}});
  for(const t of al){delete t._sc;hit(u,t,sk);await wait(60);}S0.on=false;clearInterval(iv);await tween(400,k=>R.a=1-k);await bodySettle(u);}finally{rel();u.lean=0;}};
A.steamBlast=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,240,-.14);const m=KP(u,.47,.37);sfx('steam');sfx('whoosh');
  const S0={on:true};const iv=setInterval(()=>{if(!S0.on)return;for(let i=0;i<9;i++){const k=rnd(.6,1);r21Steam(m.x,m.y,(cx(t)-m.x)*rnd(1.7,2.3),(midY(t)-m.y)*rnd(1.7,2.3)+rnd(-70,70),false);}},25);
  const R={a:0};effects.push({update(){return S0.on||R.a>0;},draw(){if(R.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),t.h*t.scale*.8,'255,90,50',.4*R.a);glow(m.x,m.y,50,'255,255,255',.6*R.a);ctx.restore();}});
  bodyStrike(u,200,.18);await tween(700,k=>{R.a=k;u.lean=.03*Math.sin(k*40);if(k>.4)t.hurt=.3;});shake(14);flash('255,240,230',.3,.12);t.hurt=.5;toss(t,50,360);hit(u,t,sk);await wait(400);S0.on=false;clearInterval(iv);await tween(400,k=>R.a=1-k);await bodySettle(u);}finally{rel();u.lean=0;}};

// ---- Bambusz-békakirály – Gongütés: vékony ívek helyett vastag, kitöltött, remegő arany hangfal söpör végig, a hősök megtántorodnak
A.gongWave=async(u,ts,sk)=>{const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,240,-.12);const g=KP(u,.6,.6);await bodyStrike(u,120,.18);sfx('gong');shake(18);flash('255,230,150',.35,.18);hitStop(80);
  const W={t:0,a:1};effects.push({update(dt){W.t+=dt;return W.a>0;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const r=(W.t*820-i*170);if(r<=0||r>1250)continue;const a=Math.max(0,1-r/1250)*W.a;
      const gr=ctx.createRadialGradient(g.x,g.y,Math.max(0,r-90),g.x,g.y,r+30);gr.addColorStop(0,'rgba(255,210,100,0)');gr.addColorStop(.7,`rgba(255,220,120,${.55*a})`);gr.addColorStop(.9,`rgba(255,250,210,${.8*a})`);gr.addColorStop(1,'rgba(255,220,120,0)');
      ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(g.x,g.y);ctx.arc(g.x,g.y,r+30,Math.PI*.62,Math.PI*1.38);ctx.closePath();ctx.fill();}ctx.restore();}});
  for(let i=0;i<30;i++)setTimeout(()=>part({x:g.x,y:g.y+rnd(-60,60),vx:-rnd(500,900),vy:rnd(-160,160),life:.9,size:rnd(10,16),rgb:'255,215,110',shape:'note'}),i*22);
  const hitT=new Set();await tween(1100,k=>{const r=k*1.1*820;for(const t of ts)if(!hitT.has(t)&&Math.abs(cx(t)-g.x)<r){hitT.add(t);t.hurt=.4;toss(t,30,260);shake(8);}});
  for(const t of ts){hit(u,t,sk);await wait(60);}W.a=0;}finally{rel();}};

// ---- Csészeharcos – Teafröccs: a merőkanalával teát mer a saját csésze-testéből, és forró teahullámot zúdít a hősre
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,260,-.18);const l=()=>KP(u,.08,.17);sfx('splash');
  bodyStrike(u,200,.22);const S0={on:true};const iv=setInterval(()=>{if(!S0.on)return;const p=l();for(let i=0;i<18;i++)part({x:p.x+rnd(-14,14),y:p.y+rnd(-10,10),vx:(cx(t)-p.x)*rnd(1.3,2)+rnd(-40,40),vy:-rnd(200,460),g:1000,life:rnd(.7,1.1),size:rnd(12,22),rgb:pick(['205,125,30','230,155,50','170,95,20']),add:false,shape:'drop'});
      r21Steam(p.x,p.y,(cx(t)-p.x)*.8,-rnd(60,140),false);},30);
  await wait(560);S0.on=false;clearInterval(iv);shake(12);sfx('splash');t.hurt=.5;for(let i=0;i<44;i++)part({x:cx(t),y:midY(t),vx:rnd(-320,320),vy:rnd(-360,-60),g:900,life:.9,size:rnd(10,18),rgb:pick(['205,125,30','230,155,50']),add:false,shape:'drop'});
  for(let i=0;i<10;i++)r21Steam(cx(t)+rnd(-40,40),midY(t)+rnd(-40,20),rnd(-40,40),-rnd(60,140),false);hit(u,t,sk);await wait(400);await bodySettle(u);}finally{rel();}};

// ---- Chasen – Habvihar: óriás FEHÉR habtornádó (buborékos matchahab), Megbékítő szó: kalligráfiás „béke” jelek szállnak a hősre, és elalszik
A.whiskStorm=async(u,ts,sk)=>{const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,240,-.14);const w=KP(u,.15,.08);sfx('whoosh');sfx('wind');const T2={x:w.x,y:w.y+80,a:1,t:0,s:.3};
  effects.push({update(dt){T2.t+=dt;if(Math.random()<.8)r21FrothBurst(T2.x+rnd(-60,60),T2.y+120,2,200);return T2.a>0;},draw(){ctx.save();ctx.globalAlpha=T2.a;for(let i=0;i<90;i++){const q=i/90,a=q*Math.PI*12+T2.t*10,r=(26+q*150)*T2.s;r21Froth(T2.x+Math.cos(a)*r,T2.y+150-q*420*T2.s+Math.sin(a)*r*.25,(12+q*14)*T2.s,.95,a);}ctx.restore();}});
  await tween(400,k=>T2.s=.3+.7*eOutBack(k));bodyStrike(u,150,.2);const hit1=new Set(),xmin=Math.min(...ts.map(cx))-160;
  await tween(1200,k=>{T2.x=w.x+(xmin-w.x)*easeIO(k);for(const t of ts)if(!hit1.has(t)&&T2.x<cx(t)+30){hit1.add(t);shake(10);t.hurt=.4;toss(t,60,420);hit(u,t,sk);}});
  for(const t of ts)if(!hit1.has(t)&&t.alive)hit(u,t,sk);await tween(400,k=>T2.a=1-k);await bodySettle(u);}finally{rel();}};
A.calmWord=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';const h=KP(u,.85,.3);sfx('wind');await dimTo(.35,'20,40,20',250);
  const G=['和','静','眠','安'];const L=G.map((c,i)=>({c,x:h.x,y:h.y,d:i*180,k:0}));const E={t:0,a:1};
  effects.push({update(dt){E.t+=dt*1000;for(const l of L)l.k=Math.max(0,Math.min(1,(E.t-l.d)/700));return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;ctx.textAlign='center';ctx.textBaseline='middle';
    for(const l of L){if(!l.k)continue;const x=l.x+(cx(t)-l.x)*easeIO(l.k),y=l.y+(midY(t)-40-l.y)*l.k-Math.sin(l.k*Math.PI)*120;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'190,240,170',.5);ctx.restore();
      ctx.font=`bold ${Math.round(70-20*l.k)}px serif`;ctx.lineWidth=6;ctx.strokeStyle='rgba(20,40,20,.9)';ctx.strokeText(l.c,x,y);ctx.fillStyle='#f4ffe8';ctx.fillText(l.c,x,y);}ctx.restore();}});
  await wait(1300);sfx('heal');for(let i=0;i<14;i++)part({x:cx(t)+rnd(-40,40),y:topY(t)+rnd(-20,20),vx:rnd(-30,30),vy:-rnd(30,80),life:1.2,size:rnd(4,8),rgb:'200,240,190',shape:'star'});
  hit(u,t,sk);await tween(400,k=>E.a=1-k);await dimTo(0,null,300);}finally{rel();}};

{const M={whiskfoam:'whiskSpray',bambooswipe:'whiskSpin',mochibounce:'mochiBounce',scaldmist:'scaldMist',teasplash:'teaSplash',calmword:'calmWord'};for(const k in M)if(ESK[k])ESK[k].anim=M[k];}
if(typeof NOFX!=='undefined')for(const k of ['whiskSpray','whiskSpin','mochiBounce','scaldMist','teaSplash','calmWord','snakeCoil','stoneMace','mosaicBolt','mosaicShards','crowDive','golemSlam','steamBlast','gongWave','whiskStorm'])NOFX.add(k);

// ---- Hiányzó hangnevek (eddig némák voltak): a meglévő hangokra irányítva (csengő hang nincs)
{const AL={quake:'rock',gong:'sonic',steam:'dust',wind:'whoosh',crunch:'squish',zap:'thunder',screech:'sonic',roar:'growl',twinkle:'holy',gulp:'gulp'};for(const k in AL)if(!SFX[k]&&SFX[AL[k]])SFX[k]=SFX[AL[k]];}

// ---- Nyelvcsapás: a nyelv a SZÁJBÓL indul (a Békakirálynál rácson mérve .30,.27; eddig a kis béka fix pontja miatt hátulról jött)
{const t0=A.tongue;A.tongue=async(u,ts,sk)=>{if(u.type!=='frogking')return t0(u,ts,sk);u.pose='cast';await wait(160);await reach(u,ts[0],sk,'#ff7aa8',()=>KP(u,.30,.27));};}

// ---- Csészeharcos – Teafröccs (újra): VALÓDI, borostyánszínű teasugár ível a merőkanálból a hősre (folyadék, fénycsíkkal), csobbanás, cseppek; gőz csak egy leheletnyi
function r21LiquidArc(a,b,k,h,w,col){const pts=[];const n=26;for(let i=0;i<=n;i++){const q=i/n*k;pts.push({x:a.x+(b.x-a.x)*q,y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*h+Math.sin(q*18+T*30)*2});}
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';for(const [lw,c] of [[w+6,'rgba(90,50,10,.55)'],[w,col],[w*.35,'rgba(255,230,170,.85)']]){ctx.strokeStyle=c;ctx.lineWidth=lw;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();}ctx.restore();}
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,280,-.2);const l=()=>KP(u,.08,.17);sfx('splash');
  // a kanálban felcsillan a forró tea
  const L={k:0,a:1};effects.push({update(){return L.a>0;},draw(){if(L.k<=0)return;ctx.save();ctx.globalAlpha=L.a;const a=l(),b={x:cx(t),y:midY(t)-10};r21LiquidArc(a,b,L.k,130,22,'rgba(200,120,30,.95)');ctx.restore();}});
  bodyStrike(u,220,.24);sfx('whoosh');await tween(330,k=>{L.k=easeIO(k);const a=l();if(Math.random()<.7)part({x:a.x,y:a.y,vx:(cx(t)-a.x)*rnd(1,1.6),vy:-rnd(200,380),g:1000,life:rnd(.5,.8),size:rnd(5,9),rgb:pick(['205,125,30','230,155,50']),add:false,shape:'drop'});});
  shake(14);sfx('splash');hitStop(60);t.hurt=.5;toss(t,40,320);
  for(let i=0;i<46;i++)part({x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-30,20),vx:rnd(-340,340),vy:rnd(-420,-60),g:1000,life:rnd(.6,1),size:rnd(6,13),rgb:pick(['205,125,30','230,155,50','170,95,20']),add:false,shape:'drop'});
  for(let i=0;i<4;i++)r21Steam(cx(t)+rnd(-30,30),midY(t)-20,rnd(-30,30),-rnd(60,120),false);
  hit(u,t,sk);await tween(350,k=>L.a=1-k);await bodySettle(u);}finally{rel();}};

// ---- Matcha-gólem / Teaszertartás-mester – Forró hab, Szertartás-hab (újra): a tálból kibuggyanó, sűrű habfal gördül végig a földön a hősökig, rájuk borul, buborékok pattannak, aztán lefolyik és eltűnik
A.foamFlood=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,220,-.1);
  const o=u.type==='teamaster'?KP(u,.15,.28):u.type==='chasen'?KP(u,.15,.1):KP(u,.48,.17);sfx('splash');
  // kibuggyan a tálból
  const Bub=[];for(let i=0;i<26;i++)Bub.push({x:o.x+rnd(-30,30),y:o.y,vy:-rnd(60,180),vx:rnd(-90,20),r:rnd(16,30),k:0});
  const gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length,xmin=Math.min(...al.map(cx))-110,W2={x:o.x,h:0,a:1,cov:0};
  effects.push({update(dt){for(const b of Bub){b.k=Math.min(1,b.k+dt*2);b.x+=b.vx*dt;b.y+=b.vy*dt;b.vy+=420*dt;if(b.y>gy){b.y=gy;b.vy=0;b.vx*=.9;}}
      if(W2.h>0&&Math.random()<.8)for(let i=0;i<3;i++)part({x:W2.x+rnd(-20,40),y:gy-rnd(0,W2.h),vx:rnd(-160,-40),vy:-rnd(40,160),g:500,life:.6,size:rnd(4,9),rgb:pick(['255,255,255','236,248,222']),add:false,shape:'dot'});return W2.a>0;},
    draw(){ctx.save();ctx.globalAlpha=W2.a;for(const b of Bub)r21Froth(b.x,b.y,b.r*b.k,1,b.x*.01);
      // a habfal: egymásra torlódó habgombócok a hullámfronttól a gólemig
      if(W2.h>0){const x1=Math.max(W2.x,0);for(let x=o.x;x>=x1;x-=34){const q=(o.x-x)/Math.max(1,o.x-x1),hh=W2.h*(.45+.55*q);for(let yy=0;yy<hh;yy+=30)r21Froth(x+Math.sin(x*.05+yy)*8,gy-yy-14,26+q*12,1,x*.02+yy);}}
      // a hősökön ülő hab
      if(W2.cov>0)for(const t of al)for(let i=0;i<9;i++){const a=i/9*6.28;r21Froth(cx(t)+Math.cos(a)*t.w*t.scale*.32,midY(t)+Math.sin(a)*t.h*t.scale*.3+W2.cov*0,24,W2.cov,a);}
      ctx.restore();}});
  await wait(350);sfx('splash');sfx('whoosh');bodyStrike(u,200,.16);const hitT=new Set();
  await tween(900,k=>{W2.x=o.x+(xmin-o.x)*easeIO(k);W2.h=130*Math.min(1,k*2.2);for(const t of al)if(!hitT.has(t)&&W2.x<cx(t)+30){hitT.add(t);t.hurt=.4;shake(8);sfx('splash');}});
  W2.cov=1;for(const t of al){hit(u,t,sk);await wait(60);}
  await tween(500,k=>{W2.h=130*(1-k);});await wait(400);await tween(500,k=>{W2.cov=1-k;W2.a=1-k*.3;});W2.a=0;await bodySettle(u);}finally{rel();}};
