// ===== 6. kör: hősök finomítása és az 1. térkép ellenfeleinek támadásai =====
// Szikranyíl: a villám elemű találat általános (sárga, égből jövő) villáma ne jelenjen meg
NOFX.add('bounceArrow');
// ---- Pálcakoppintás: igazi tündérpor – sok apró, csillámló porszem, ami lassan leszáll
A.wandbonk=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;u.pose='cast';const G='130,255,150',x=cx(t),y=midY(t),top=topY(t);sfx('holy');
  const h=handPos(u);for(let i=0;i<3;i++){for(let j=0;j<16;j++)part({x:h.x+rnd(-6,6),y:h.y+rnd(-6,6),vx:rnd(-50,50),vy:rnd(-70,20),drag:2,life:rnd(.5,.9),size:rnd(.8,1.8),rgb:pick([G,'220,255,200','255,255,230'])});await wait(70);}
  // porfelhő száll a célpont fölé
  for(let i=0;i<70;i++){const life=rnd(.45,.6);part({x:h.x+rnd(-8,8),y:h.y+rnd(-8,8),vx:(x+rnd(-60,60)-h.x)/life,vy:(top-80+rnd(-20,20)-h.y)/life,life,size:rnd(.8,1.8),rgb:pick([G,'220,255,200','255,255,230'])});}
  await wait(480);
  effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<14;i++)part({x:x+rnd(-75,75),y:top-85+rnd(-20,20),vx:rnd(-12,12),vy:rnd(40,110),drag:.4,life:rnd(.9,1.4),size:rnd(.7,2),rgb:pick([G,'200,255,190','255,255,230','150,255,170'])});return this.t<.9;},
    draw(){const a=Math.sin(Math.min(1,this.t/.9)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,top-80);ctx.scale(1,.35);glow(0,0,100,G,.25*a);ctx.restore();}});
  await wait(800);sfx('heal');
  const hh=t.h*t.scale;effects.push({t:0,update(dt){this.t+=dt;return this.t<.7;},draw(){const k=this.t/.7,a=k<.2?k/.2:1-(k-.2)/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,hh*.75*(1+k*.2),G,.75*a);glow(x,y,hh*.4,'230,255,220',.5*a);ctx.restore();}});
  for(let i=0;i<40;i++)part({x:x+rnd(-40,40),y:t.y+t.oy-rnd(0,hh),vx:rnd(-20,20),vy:rnd(-110,-40),life:rnd(.5,1),size:rnd(.8,2),rgb:pick([G,'255,255,220'])});
  flash('180,255,180',.2,.12);shake(6);hit(u,t,sk);await wait(500);u.pose='idle';};

// ---- Zúzás: Grog a fejszével csap le (jól látható balta-ív)
function axeChop(x,y,sz){const P={x:x-sz*.55,y:y-sz*.55},R=sz*.85,st={t:0},t0=-2.0,t1=.55;effects.push({update(dt){st.t+=dt;return st.t<.5;},draw(){const k=easeIO(Math.min(1,st.t/.13)),a=st.t<.28?1:Math.max(0,1-(st.t-.28)/.22),th=t0+(t1-t0)*k;
  ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.strokeStyle='rgba(255,240,210,.55)';ctx.lineWidth=sz*.28;ctx.beginPath();ctx.arc(P.x,P.y,R,Math.max(t0,th-1.1),th);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=6;ctx.stroke();ctx.restore();
  ctx.save();ctx.strokeStyle='#5a3a1e';ctx.lineWidth=9;ctx.lineCap='round';ctx.globalAlpha=a;ctx.beginPath();ctx.moveTo(P.x,P.y);ctx.lineTo(P.x+Math.cos(th)*R*.9,P.y+Math.sin(th)*R*.9);ctx.stroke();ctx.restore();
  drawAxe(P.x+Math.cos(th)*R,P.y+Math.sin(th)*R,th+Math.PI/2,sz*.75,a);}});}
{const C0=A.crush;A.crush=async(u,ts,sk)=>{const t=ts[0];const keep=fxSpin;fxSpin=function(key,x,y,o){if(key==='slash'){axeChop(cx(t),midY(t),Math.max(150,bigOf(t)*.7));return true;}return keep.apply(this,arguments);};try{await C0(u,ts,sk);}finally{fxSpin=keep;}};}

// ---- Forgószél: hat nagy, elmosódó csóvájú fejsze pörög, szikrák és por, halvány tornádó
A.whirl=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('wind');
  const st={on:true,t:0,a:0};effects.push({update(dt){st.t+=dt;st.a=st.on?Math.min(1,st.a+dt*4):st.a-dt*3;if(st.on){for(let i=0;i<2;i++){const a=rnd(0,6.28);part({x:cx(u)+Math.cos(a)*110,y:u.y+u.oy-rnd(0,30),vx:-Math.sin(a)*260,vy:-rnd(40,160),life:.55,size:rnd(5,10),rgb:'190,175,150',add:false,shape:'smoke'});}
      if(Math.random()<.5){const a=st.t*16;part({x:cx(u)+Math.cos(a)*120,y:midY(u)+Math.sin(a)*50,vx:-Math.sin(a)*400,vy:Math.cos(a)*150,drag:3,life:.3,size:rnd(2,3),rgb:pick(['255,240,200','255,255,255']),shape:'streak'});}}return st.on||st.a>0;},
    draw(){const x=cx(u),gy=u.y+u.oy+4,Ht=u.h*u.scale*1.8;ctx.save();ctx.globalAlpha=Math.max(0,st.a);ctx.lineCap='round';
      for(let j=0;j<18;j++){const f=j/17,y=gy-f*Ht,r=40+f*f*140+Math.sin(st.t*6+j)*6,sw=x+Math.sin(st.t*3+f*3)*16*f;for(let k=0;k<2;k++){const a0=st.t*12+j*.7+k*Math.PI;ctx.strokeStyle=`rgba(225,220,205,${.18+.2*(1-f)})`;ctx.lineWidth=2+3*(1-f);ctx.beginPath();ctx.ellipse(sw,y,r,r*.28,0,a0,a0+1.6);ctx.stroke();}}
      ctx.restore();if(!st.on)return;const y=midY(u),R=125;
      // csóva: a fejszék elmosódott nyomai
      ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const an=st.t*15+i*Math.PI/3;ctx.strokeStyle='rgba(230,240,255,.35)';ctx.lineWidth=26;ctx.beginPath();ctx.ellipse(x,y,R,R*.42,0,an-.9,an);ctx.stroke();}ctx.restore();
      const axes=[];for(let i=0;i<6;i++){const an=st.t*15+i*Math.PI/3;axes.push({an,z:Math.sin(an)});}axes.sort((a,b)=>a.z-b.z);
      for(const q of axes){const s=86*(.85+.15*q.z);for(let g=2;g>=1;g--){const an=q.an-g*.12;drawAxe(x+Math.cos(an)*R,y+Math.sin(an)*R*.42,an+Math.PI/2,s,.18*(3-g));}drawAxe(x+Math.cos(q.an)*R,y+Math.sin(q.an)*R*.42,q.an+Math.PI/2,s,1);}}});
  const x0=u.x,y0=u.y;const order=al.slice().sort((a,b)=>cx(a)-cx(b));
  for(const t of order){const dx=t.x-x0-100,dy=t.y-y0;await tween(260,k=>{const e=easeIO(k);u.ox+=((dx)-u.ox)*e;u.oy+=((dy)-u.oy)*e;u.spin=(u.spin||0)+.6;});
    for(let i=0;i<4;i++){sparks(cx(t),midY(t),['255,240,200','255,255,255','190,170,140'],14,480);t.hurt=.2;shake(6);sfx('slash');await wait(80);}hitStop(60);hit(u,t,sk);toss(t,36,300);}
  await tween(320,k=>{u.ox*=1-k;u.oy*=1-k;u.spin=(u.spin||0)+.6;});u.ox=0;u.oy=0;u.spin=0;st.on=false;u.pose='idle';await wait(200);};

// ---- Földrepesztés: hegyes, élethű sziklatüskék törnek fel a repedés mentén
function drawRockSpike(x,y,w,h,r,a=1){if(h<=1||a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(r);
  const L=[[-w/2,0],[-w*.38,-h*.45],[-w*.16,-h*.78],[-w*.02,-h],[w*.12,-h*.7],[w*.34,-h*.42],[w/2,0]];
  let g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#8c7a66');g.addColorStop(.45,'#6e5c4a');g.addColorStop(.55,'#4a3c30');g.addColorStop(1,'#2e241c');ctx.fillStyle=g;ctx.strokeStyle='#1e160f';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.moveTo(L[0][0],L[0][1]);for(const p of L)ctx.lineTo(p[0],p[1]);ctx.closePath();ctx.fill();ctx.stroke();
  // világos él és repedések
  ctx.strokeStyle='rgba(225,210,185,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-w*.38,-h*.45);ctx.lineTo(-w*.16,-h*.78);ctx.lineTo(-w*.02,-h);ctx.stroke();
  ctx.strokeStyle='rgba(20,14,10,.6)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-w*.02,-h);ctx.lineTo(w*.02,-h*.55);ctx.lineTo(-w*.08,-h*.2);ctx.moveTo(w*.12,-h*.7);ctx.lineTo(w*.2,-h*.35);ctx.stroke();
  ctx.fillStyle='rgba(60,90,40,.55)';ctx.beginPath();ctx.ellipse(-w*.25,-h*.08,w*.12,h*.05,0,0,6.29);ctx.fill();ctx.restore();}
// ===== Ellenfelek =====
// Szentjánosbogarak – Villanás: a bogarak körberepülik a hőst, felizzanak, és vakító fénnyel robbannak
A.fireflyFlash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await dimTo(.65,'4,6,20',250);sfx('holy');
  const bugs=[];for(let i=0;i<28;i++)bugs.push({a:rnd(0,6.28),r:rnd(50,110),sp:rnd(3,6)*(Math.random()<.5?1:-1),ph:rnd(0,6)});
  const B={k:0,ch:0,on:true,t:0},s={x:cx(u),y:midY(u)},d={x:cx(t),y:midY(t)};
  effects.push({update(dt){B.t+=dt;for(const b of bugs)b.a+=b.sp*dt*(1+B.ch*2);return B.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';const c={x:s.x+(d.x-s.x)*easeIO(B.k),y:s.y+(d.y-s.y)*easeIO(B.k)-Math.sin(B.k*Math.PI)*80};
    for(const b of bugs){const r=b.r*(1-.55*B.ch),x=c.x+Math.cos(b.a)*r,y=c.y+Math.sin(b.a)*r*.6,pu=.6+.4*Math.sin(B.t*10+b.ph);glow(x,y,10+B.ch*14,'210,255,110',.8*pu);ctx.fillStyle='rgba(255,255,220,.95)';ctx.beginPath();ctx.arc(x,y,2.4,0,6.29);ctx.fill();}
    if(B.ch>0)glow(c.x,c.y,60+B.ch*110,'230,255,150',.45*B.ch);ctx.restore();}});
  await wait(500);await tween(650,k=>{B.k=k;});await tween(600,k=>{B.ch=k;});
  B.on=false;flash('245,255,200',.75,.3);shake(12);hitStop(90);sfx('thunder');
  effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const k=this.t/.6,a=1-k;ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<18;i++){const an=i/18*6.283,L=120+k*380;const g=ctx.createLinearGradient(d.x,d.y,d.x+Math.cos(an)*L,d.y+Math.sin(an)*L);g.addColorStop(0,`rgba(255,255,220,${.8*a})`);g.addColorStop(1,'rgba(220,255,140,0)');ctx.fillStyle=g;
    ctx.beginPath();ctx.moveTo(d.x,d.y);ctx.lineTo(d.x+Math.cos(an-.05)*L,d.y+Math.sin(an-.05)*L);ctx.lineTo(d.x+Math.cos(an+.05)*L,d.y+Math.sin(an+.05)*L);ctx.closePath();ctx.fill();}glow(d.x,d.y,160*(1+k),'255,255,210',.8*a);ctx.restore();}});
  sparks(d.x,d.y,['255,255,220','220,255,140'],40,600);hit(u,t,sk);await wait(450);u.pose='idle';await dimTo(0,null,250);};
ESK.flash.anim='fireflyFlash';

// Béka – Nyelvcsapás: a nyelv a szájából csapódik ki
A.frogTongue=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='idle';const w=u.w*u.scale,h=u.h*u.scale,m={x:cx(u)-w*.3,y:topY(u)+h*.42},tx=cx(t)+12,ty=midY(t),T0={k:0,on:true};
  effects.push({update(){return T0.on;},draw(){const k=T0.k;if(k<=0)return;const ex=m.x+(tx-m.x)*k,ey=m.y+(ty-m.y)*k,qx=(m.x+ex)/2,qy=Math.min(m.y,ey)-50*k;ctx.save();ctx.lineCap='round';
    ctx.strokeStyle='#6a1530';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.quadraticCurveTo(qx,qy,ex,ey);ctx.stroke();ctx.strokeStyle='#f06b95';ctx.lineWidth=13;ctx.stroke();ctx.strokeStyle='rgba(255,190,210,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(m.x,m.y-3);ctx.quadraticCurveTo(qx,qy-4,ex,ey-4);ctx.stroke();
    ctx.fillStyle='#ff6f9c';ctx.strokeStyle='#6a1530';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(ex,ey,16,12,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,220,230,.8)';ctx.beginPath();ctx.ellipse(ex-4,ey-4,5,3,0,0,6.29);ctx.fill();ctx.restore();}});
  u.jump=8;sfx('slash');await tween(190,k=>{T0.k=easeIO(k);});u.jump=0;
  t.hurt=.3;shake(8);sparks(tx,ty,['255,120,170','255,255,255'],14,300);for(let i=0;i<8;i++)part({x:tx,y:ty,vx:rnd(-120,120),vy:rnd(-160,-40),g:500,life:.6,size:rnd(2,4),rgb:'230,255,200',add:false});hit(u,t,sk);
  await wait(180);await tween(220,k=>{T0.k=1-easeIO(k);});T0.on=false;await wait(150);};
ESK.tongue.anim='frogTongue';

// Gombakirály – Gombaeső: igazi gombák hullanak
function drawShroom(x,y,s,r,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);
  ctx.fillStyle='#f3e6c8';ctx.strokeStyle='#3a2416';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-6,0);ctx.quadraticCurveTo(-8,14,-5,18);ctx.lineTo(5,18);ctx.quadraticCurveTo(8,14,6,0);ctx.closePath();ctx.fill();ctx.stroke();
  const g=ctx.createRadialGradient(-5,-8,2,0,-2,20);g.addColorStop(0,'#ff6a5a');g.addColorStop(1,'#a8141c');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-19,2);ctx.quadraticCurveTo(-18,-16,0,-17);ctx.quadraticCurveTo(18,-16,19,2);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff6e6';for(const [dx,dy,rr] of [[-9,-7,3],[3,-11,3.5],[11,-4,2.5],[-2,-3,2]]){ctx.beginPath();ctx.arc(dx,dy,rr,0,6.29);ctx.fill();}ctx.restore();}
A.shroomFall=async(u,ts,sk)=>{const t=ts[0];if(!t)return;await castPose(u,'230,160,255',420);sfx('holy');
  const x=cx(t),gy=t.y+t.oy,list=[];for(let i=0;i<14;i++)list.push({x:x+rnd(-80,80),y:-40-rnd(0,240),vy:rnd(300,420),vx:0,r:rnd(-.6,.6),vr:rnd(-4,4),s:rnd(1.1,1.9),land:gy-rnd(0,30)-((t.h*t.scale)*rnd(.2,.6)),hit:false,a:1});
  const M={on:true};effects.push({update(dt){let alive=false;for(const m of list){if(m.a<=0)continue;alive=true;if(!m.hit){m.vy+=900*dt;m.y+=m.vy*dt;m.r+=m.vr*dt;if(m.y>=m.land){m.hit=true;m.vy=-rnd(160,260);m.vx=rnd(-120,120);sfx('hit');t.hurt=.2;for(let j=0;j<6;j++)part({x:m.x,y:m.y,vx:rnd(-80,80),vy:rnd(-90,-20),life:.6,size:rnd(8,14),rgb:'200,150,230',add:false,shape:'smoke'});}}
      else{m.vy+=1200*dt;m.y+=m.vy*dt;m.x+=m.vx*dt;m.r+=m.vr*2*dt;m.a-=dt*1.8;}}return alive;},draw(){for(const m of list)if(m.a>0)drawShroom(m.x,m.y,m.s,m.r,m.a);}});
  await wait(1100);hit(u,t,sk);shake(6);await wait(500);u.pose='idle';};
ESK.shroomrain.anim='shroomFall';

// Tölgy – Levélvihar: valódi falevelek (erezettel, forogva) söpörnek végig a csapaton, szélcsíkokkal
function drawLeaf(x,y,s,r,fl,col){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s*fl,s);ctx.fillStyle=col;ctx.strokeStyle='rgba(30,50,10,.8)';ctx.lineWidth=1.2;
  ctx.beginPath();ctx.moveTo(0,-14);ctx.quadraticCurveTo(10,-6,8,4);ctx.quadraticCurveTo(4,12,0,16);ctx.quadraticCurveTo(-4,12,-8,4);ctx.quadraticCurveTo(-10,-6,0,-14);ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(255,255,200,.55)';ctx.beginPath();ctx.moveTo(0,-12);ctx.lineTo(0,18);ctx.moveTo(0,-2);ctx.lineTo(5,-6);ctx.moveTo(0,4);ctx.lineTo(-5,0);ctx.moveTo(0,8);ctx.lineTo(4,5);ctx.stroke();ctx.restore();}
A.leafGale=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await castPose(u,'140,255,120',420);u.pose='attack';sfx('wind');
  const cols=['#4f9a2a','#7bbf3a','#c9b23a','#d9842a','#3f7f22'],L=[];const x0=cx(u)-40;
  for(let i=0;i<90;i++)L.push({x:x0+rnd(-40,60),y:midY(u)+rnd(-120,80),vx:-rnd(380,620),vy:rnd(-60,60),r:rnd(0,6),vr:rnd(-8,8),fp:rnd(0,6),s:rnd(.9,1.6),c:pick(cols),d:rnd(0,.9)});
  const st={t:0};effects.push({update(dt){st.t+=dt;for(const l of L){if(st.t<l.d)continue;l.x+=l.vx*dt;l.y+=l.vy*dt+Math.sin(st.t*6+l.fp)*60*dt;l.r+=l.vr*dt;l.fp+=dt*9;}return st.t<2.4;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(220,255,210,.25)';ctx.lineWidth=2;for(let i=0;i<8;i++){const y=260+i*40+Math.sin(st.t*3+i)*12,x=x0-((st.t*700+i*90)%(x0+200));ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+60,y-14,x+180,y);ctx.stroke();}ctx.restore();
      for(const l of L){if(st.t<l.d||l.x<-40)continue;drawLeaf(l.x,l.y,l.s,l.r,Math.cos(l.fp),l.c);}}});
  for(const t of al.slice().sort((a,b)=>cx(b)-cx(a))){(async()=>{await wait(((x0-cx(t))/520)*1000+300);t.hurt=.3;shake(5);hit(u,t,sk);})();}
  await wait(2200);u.pose='idle';};
ESK.leafstorm.anim='leafGale';

// Tölgy – Ágcsapás: vastag, kérges faág nyúlik ki gallyakkal és levelekkel, és lecsap
A.branchSwing=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const o={x:cx(u)-u.w*u.scale*.3,y:midY(u)-u.h*u.scale*.15},tx=cx(t),ty=midY(t),B={k:0,on:true,sw:0};
  effects.push({update(){return B.on;},draw(){const k=B.k;if(k<=0)return;const ex=o.x+(tx-o.x)*k,ey=o.y+(ty-o.y)*k-B.sw*80*(1-k*.3),qx=(o.x+ex)/2,qy=Math.min(o.y,ey)-90*k;ctx.save();ctx.lineCap='round';
    for(const [lw,col] of [[30,'#2a1a0e'],[24,'#6b4a2a'],[10,'#8a6640']]){ctx.strokeStyle=col;ctx.lineWidth=lw*(1-.0);ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.quadraticCurveTo(qx,qy,ex,ey);ctx.stroke();}
    ctx.strokeStyle='rgba(30,18,8,.6)';ctx.lineWidth=2;for(let i=1;i<8;i++){const q=i/8,px=(1-q)*(1-q)*o.x+2*(1-q)*q*qx+q*q*ex,py=(1-q)*(1-q)*o.y+2*(1-q)*q*qy+q*q*ey;ctx.beginPath();ctx.moveTo(px-6,py-8);ctx.lineTo(px+5,py+6);ctx.stroke();
      if(i%2){ctx.strokeStyle='#5a3c20';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(px+(i%4?-18:16),py-26);ctx.stroke();drawLeaf(px+(i%4?-22:20),py-32,1.1,i,1,i%4?'#4f9a2a':'#7bbf3a');ctx.strokeStyle='rgba(30,18,8,.6)';ctx.lineWidth=2;}}
    drawLeaf(ex-10,ey-14,1.3,.5,1,'#5aa531');drawLeaf(ex+8,ey-6,1.2,-.4,1,'#7bbf3a');ctx.restore();}});
  sfx('wind');await tween(260,k=>{B.k=easeIO(k);B.sw=1-k;});
  sfx('hit');shake(12);hitStop(70);t.hurt=.35;sparks(tx,ty,['200,170,120','255,255,255'],14,360);for(let i=0;i<10;i++)part({x:tx,y:ty,vx:rnd(-200,200),vy:rnd(-220,-40),g:500,life:rnd(.6,1),size:rnd(4,7),rgb:pick(['80,150,40','150,190,60']),add:false,shape:'leaf'});
  toss(t,24,260);hit(u,t,sk);await wait(200);await tween(260,k=>{B.k=1-easeIO(k);});B.on=false;u.pose='idle';};
ESK.oakvine.anim='branchSwing';

// Rózsa – Tüskezápor: a rózsa meglendül, és szemből valódi tüskék repülnek a csapatra
function drawThorn(x,y,ang,len){ctx.save();ctx.translate(x,y);ctx.rotate(ang);const g=ctx.createLinearGradient(-len,0,0,0);g.addColorStop(0,'#2f4a16');g.addColorStop(.6,'#5c3a1e');g.addColorStop(1,'#d8c8a0');ctx.fillStyle=g;ctx.strokeStyle='#1a1008';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-len,-len*.18);ctx.quadraticCurveTo(-len*.85,0,-len,len*.18);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
A.thornVolley=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';
  // meglendül
  await tween(260,k=>{u.ox=Math.sin(k*Math.PI)*24;u.jump=Math.sin(k*Math.PI)*10;});u.ox=0;u.jump=0;sfx('slash');shake(4);
  const thorns=[],o={x:cx(u)-u.w*u.scale*.35,y:midY(u)-u.h*u.scale*.15};
  for(const t of al)for(let i=0;i<9;i++){const tx=cx(t)+rnd(-30,30),ty=midY(t)+rnd(-40,40),sy=o.y+rnd(-50,50);thorns.push({x:o.x,y:sy,sx:o.x,sy,tx,ty,d:i*.06+rnd(0,.05),k:0,t,last:i===8,stuck:0});}
  const st={t:0};effects.push({update(dt){st.t+=dt;let any=false;for(const q of thorns){if(st.t<q.d){any=true;continue;}if(q.k<1){any=true;q.k=Math.min(1,q.k+dt/.32);q.x=q.sx+(q.tx-q.sx)*q.k;q.y=q.sy+(q.ty-q.sy)*q.k-Math.sin(q.k*Math.PI)*20;
        if(q.k>=1){sparks(q.tx,q.ty,['255,120,120','255,255,255'],5,200);q.t.hurt=.2;if(q.last){hit(u,q.t,sk);shake(5);}}}else if(q.stuck<.6){any=true;q.stuck+=dt;}}return any;},
    draw(){for(const q of thorns){if(st.t<q.d)continue;const a=Math.atan2(q.ty-q.sy,q.tx-q.sx);ctx.save();ctx.globalAlpha=q.k<1?1:Math.max(0,1-(q.stuck-.3)/.3);drawThorn(q.x,q.y,a,30);ctx.restore();}}});
  await wait(1300);u.pose='idle';};
ESK.thornrain.anim='thornVolley';

// Rózsa – Tüskés inda: tüskés inda tör fel a hős alól, rátekeredik és megszorítja
A.thornVine=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const x=cx(t),gy=t.y+t.oy+4,hh=t.h*t.scale,V={g:0,a:1,on:true};rumble(.5,4);sfx('rock');
  for(let i=0;i<10;i++)part({x:x+rnd(-40,40),y:gy,vx:rnd(-80,80),vy:-rnd(60,180),g:500,life:.7,size:rnd(3,6),rgb:'110,85,60',add:false,shape:'rock'});
  effects.push({update(){return V.on;},draw(){if(V.g<=0)return;ctx.save();ctx.globalAlpha=V.a;ctx.lineCap='round';const N=40,pts=[];for(let i=0;i<=N*V.g;i++){const f=i/N,an=f*Math.PI*4.2,r=Math.max(18,t.w*t.scale*.42)*(1-f*.25);pts.push({x:x+Math.cos(an)*r,y:gy-f*hh*1.05+Math.sin(an)*r*.25,z:Math.sin(an)});}
    for(const pass of [0,1]){for(let i=1;i<pts.length;i++){const p=pts[i],q=pts[i-1];if((p.z>0)!==(pass===1))continue;ctx.strokeStyle='#1d3a0e';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.strokeStyle=pass?'#4f9a2a':'#2f6a1a';ctx.lineWidth=8;ctx.stroke();
        if(i%3===0){ctx.fillStyle='#d8c8a0';ctx.strokeStyle='#3a2410';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(p.x,p.y-4);ctx.lineTo(p.x+7,p.y-12);ctx.lineTo(p.x+3,p.y-2);ctx.closePath();ctx.fill();ctx.stroke();}}}
    ctx.restore();}});
  await tween(450,k=>{V.g=easeIO(k);});
  // megszorítja
  for(let i=0;i<2;i++){shake(6);t.hurt=.3;sfx('hit');sparks(x,midY(t),['255,120,120','200,255,150'],10,260);await wait(160);}
  hit(u,t,sk);await wait(350);await tween(300,k=>{V.a=1-k;});V.on=false;u.pose='idle';};
ESK.vine.anim='thornVine';

// Gomba – Altató spóra: csak egy sűrű lila felhő, ami elaltatja
A.sleepCloud=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('poison');const s={x:cx(u)-30,y:midY(u)-10},d={x:cx(t),y:midY(t)},C={k:0,a:0,on:true,t:0};
  const puffs=[];for(let i=0;i<22;i++)puffs.push({dx:rnd(-70,70),dy:rnd(-45,45),r:rnd(30,58),ph:rnd(0,6)});
  effects.push({update(dt){C.t+=dt;return C.on;},draw(){if(C.a<=0)return;const x=s.x+(d.x-s.x)*easeIO(C.k),y=s.y+(d.y-s.y)*easeIO(C.k)-Math.sin(C.k*Math.PI)*50;ctx.save();
    for(const p of puffs){const px=x+p.dx*(.6+.4*C.k)+Math.sin(C.t*2+p.ph)*8,py=y+p.dy*(.6+.4*C.k)+Math.cos(C.t*2+p.ph)*6,r=p.r*(.5+.5*Math.min(1,C.k*2));const g=ctx.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,`rgba(185,120,235,${.55*C.a})`);g.addColorStop(.6,`rgba(150,90,210,${.35*C.a})`);g.addColorStop(1,'rgba(130,70,190,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r,0,6.29);ctx.fill();}
    ctx.restore();}});
  await tween(250,k=>{C.a=k;});await tween(700,k=>{C.k=k;});
  hit(u,t,sk);for(let i=0;i<3;i++)part({x:d.x+10+i*14,y:topY(t)-10,vx:20,vy:-50-i*10,life:1.2,size:7,rgb:'230,200,255',shape:'star'});
  await wait(900);await tween(500,k=>{C.a=1-k;});C.on=false;u.pose='idle';};
ESK.spore.anim='sleepCloud';

// Csiga – Házcsapás: a csiga eldobja a házát, ami pörögve a hősnek csapódik, aztán visszagurul
const SNAIL_PARTS={};function snailParts(){const sp=ENEMY_SPR.snail;if(!sp)return null;if(SNAIL_PARTS.sp===sp)return SNAIL_PARTS;try{const w=sp.width,h=sp.height,b=document.createElement('canvas'),s=document.createElement('canvas');b.width=s.width=w;b.height=s.height=h;
  const gb=b.getContext('2d'),gs=s.getContext('2d');gb.drawImage(sp,0,0);gs.drawImage(sp,0,0);const db=gb.getImageData(0,0,w,h),ds=gs.getImageData(0,0,w,h),pb=db.data,ps=ds.data;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;if(pb[i+3]===0)continue;const r=pb[i],g=pb[i+1],bb=pb[i+2],inShell=x>w*.36&&y<h*.8,body=g>140&&r>110&&bb<150&&g>=r-12&&(r+g)>290;
    if(inShell&&!body){pb[i+3]=0;}else ps[i+3]=0;}
  gb.putImageData(db,0,0);gs.putImageData(ds,0,0);Object.assign(SNAIL_PARTS,{sp,body:b,shell:s});return SNAIL_PARTS;}catch(e){return null;}}
A.shellThrow=async(u,ts,sk)=>{const t=ts[0];const P=snailParts();if(!t||!P||u.type!=='snail')return lunge(u,t,sk);u.pose='idle';
  const w=u.w*u.scale,h=u.h*u.scale,keep=ENEMY_SPR.snail,ka=ENEMY_SPR['snail-attack'];ENEMY_SPR.snail=P.body;if(ka)ENEMY_SPR['snail-attack']=P.body;
  // a ház a figura helyéről indul (a kép jobb felső része)
  const sx=cx(u)+w*.18,sy=topY(u)+h*.38,S0={x:sx,y:sy,r:0,on:true},sz=Math.max(w,h);
  effects.push({update(){return S0.on;},draw(){ctx.save();ctx.translate(S0.x,S0.y);ctx.rotate(S0.r);ctx.drawImage(P.shell,-sz/2-(w*.18)*(sz/w)*0,-sz/2,sz*(P.shell.width/P.shell.height)>sz?sz:sz*(P.shell.width/P.shell.height),sz);ctx.restore();}});
  try{u.jump=10;await wait(120);u.jump=0;sfx('wind');const tx=cx(t),ty=midY(t);
    await tween(420,k=>{S0.x=sx+(tx-sx)*k;S0.y=sy+(ty-sy)*k-Math.sin(k*Math.PI)*120;S0.r=-k*9;});
    sfx('rock');shake(12);hitStop(80);t.hurt=.4;sparks(tx,ty,['200,170,120','255,255,255'],18,420);toss(t,26,260);hit(u,t,sk);
    await tween(500,k=>{S0.x=tx+(sx-tx)*k;S0.y=ty+(sy-ty)*k-Math.sin(k*Math.PI)*60;S0.r=-9+k*-6;});S0.r=0;}
  finally{S0.on=false;ENEMY_SPR.snail=keep;if(ka)ENEMY_SPR['snail-attack']=ka;}};
ESK.shellbash.anim='shellThrow';
