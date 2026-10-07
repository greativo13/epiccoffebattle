// ===== 7. kör =====
// ---- fényoszlop (gyógyítás, újraélesztés, fény): kard helyett lágy, ragyogó fénysugár
beam=function(t,rgb,life=.7){const x=cx(t),y=t.y+t.oy;effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.8)part({x:x+rnd(-26,26),y:rnd(y*.2,y),vx:0,vy:rnd(-70,-20),life:.6,size:rnd(1,2.5),rgb});return this.t<life;},
  draw(){const k=this.t/life,a=Math.sin(Math.min(1,k)*Math.PI),w=58*(1-k*.3);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-w,0,x+w,0);g.addColorStop(0,`rgba(${rgb},0)`);g.addColorStop(.5,`rgba(${rgb},${.45*a})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.fillRect(x-w,0,w*2,y+6);
    const g2=ctx.createLinearGradient(x-w*.25,0,x+w*.25,0);g2.addColorStop(0,'rgba(255,255,255,0)');g2.addColorStop(.5,`rgba(255,255,240,${.5*a})`);g2.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g2;ctx.fillRect(x-w*.25,0,w*.5,y+6);
    ctx.translate(x,y);ctx.scale(1,.26);glow(0,0,w*1.8,rgb,.6*a);ctx.restore();}});};

// ---- Tündérpor (csapatgyógyítás): Lili pálcájából csillámló porfelhő szóródik a csapatra, és lassan leszáll rájuk
A.healAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive||t.kind==='hero');await castPose(u,'255,240,140',380);u.pose='attack';sfx('holy');
  const C=['255,240,160','190,255,190','255,200,230','255,255,235'],h=handPos(u);
  for(let i=0;i<4;i++){for(let j=0;j<22;j++)part({x:h.x+rnd(-6,6),y:h.y+rnd(-6,6),vx:rnd(-60,60),vy:rnd(-80,10),drag:2,life:rnd(.5,.9),size:rnd(.7,1.7),rgb:pick(C)});await wait(60);}
  // a por a csapat fölé száll
  const xs=al.map(cx),x0=Math.min(...xs)-60,x1=Math.max(...xs)+60,top=Math.min(...al.map(topY))-70;
  for(let i=0;i<160;i++){const life=rnd(.45,.7),tx=rnd(x0,x1),ty=top+rnd(-25,25);part({x:h.x+rnd(-8,8),y:h.y+rnd(-8,8),vx:(tx-h.x)/life,vy:(ty-h.y)/life,life,size:rnd(.7,1.8),rgb:pick(C)});}
  await wait(520);sfx('heal');
  const st={t:0};effects.push({update(dt){st.t+=dt;for(let i=0;i<22;i++)part({x:rnd(x0,x1),y:top+rnd(-20,20),vx:rnd(-10,10),vy:rnd(30,90),drag:.3,life:rnd(1,1.6),size:rnd(.6,1.9),rgb:pick(C)});return st.t<1.1;},
    draw(){const a=Math.sin(Math.min(1,st.t/1.1)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate((x0+x1)/2,top);ctx.scale(1,.25);glow(0,0,(x1-x0)*.6,'255,240,190',.25*a);ctx.restore();}});
  await wait(900);
  for(const t of al){const hh=t.h*t.scale,x=cx(t),y=midY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8,a=k<.25?k/.25:1-(k-.25)/.75;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,hh*.7,'200,255,200',.55*a);glow(x,y,hh*.35,'255,255,230',.4*a);ctx.restore();}});
    for(let i=0;i<24;i++)part({x:x+rnd(-35,35),y:t.y+t.oy-rnd(0,hh),vx:rnd(-15,15),vy:rnd(-110,-40),life:rnd(.6,1),size:rnd(.8,2),rgb:pick(C)});hit(u,t,sk);}
  await wait(600);u.pose='idle';};

// ---- Tűzbomba: nagy, jól látható bomba sercegő kanóccal
function drawBomb(x,y,r,rot){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalCompositeOperation='lighter';glow(0,0,r*2.2,'255,120,40',.35);ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(-r*.35,-r*.35,r*.1,0,0,r);g.addColorStop(0,'#6a6a7a');g.addColorStop(.5,'#2c2c36');g.addColorStop(1,'#101016');ctx.fillStyle=g;ctx.strokeStyle='#05050a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,r,0,6.29);ctx.fill();ctx.stroke();
  ctx.fillStyle='#4a4a56';ctx.fillRect(-r*.28,-r*1.18,r*.56,r*.3);ctx.strokeRect(-r*.28,-r*1.18,r*.56,r*.3);
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.ellipse(-r*.38,-r*.4,r*.22,r*.13,-.6,0,6.29);ctx.fill();
  ctx.fillStyle='#d13a1a';ctx.font=`bold ${Math.round(r*.8)}px sans-serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🔥',0,r*.12);
  ctx.strokeStyle='#8a6a3a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,-r*1.18);ctx.quadraticCurveTo(r*.3,-r*1.6,r*.55,-r*1.55);ctx.stroke();ctx.restore();}
A.throwBomb=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const mx=al.reduce((q,t)=>q+cx(t),0)/al.length,my=al.reduce((q,t)=>q+midY(t),0)/al.length;const b={x:cx(u)+30,y:midY(u)-40,on:true,r:0};
  effects.push({update(){if(b.on){const fx=b.x+Math.cos(b.r)*34*.55-Math.sin(b.r)*-34*1.55,fy=b.y+Math.sin(b.r)*34*.55+Math.cos(b.r)*-34*1.55;for(let i=0;i<3;i++)part({x:fx,y:fy,vx:rnd(-80,80),vy:rnd(-120,20),life:rnd(.2,.4),size:rnd(1.5,3.5),rgb:pick(['255,230,120','255,160,50','255,255,220'])});}return b.on;},draw(){drawBomb(b.x,b.y,34,b.r);}});
  await wait(200);const x0=b.x,y0=b.y;sfx('wind');await tween(600,q=>{b.x=x0+(mx-x0)*q;b.y=y0+(my-y0)*q-Math.sin(q*Math.PI)*200;b.r=q*5;});b.on=false;
  flash('255,200,120',.5,.18);shake(18);hitStop(100);sfx('fire');sfx('rock');fxSpin(tint('nova','255,140,40')||'nova',mx,my,{size:460,life:.7,s0:.2,s1:1.2,add:true,out:.4});
  for(let i=0;i<60;i++){const a=rnd(0,6.28),v=rnd(250,750);part({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2,life:rnd(.4,.9),size:rnd(4,10),rgb:pick(['255,160,50','255,220,120','255,90,30'])});}
  for(let i=0;i<18;i++)part({x:mx+rnd(-40,40),y:my+rnd(-30,30),vx:rnd(-90,90),vy:rnd(-140,-40),life:rnd(1,1.6),size:rnd(18,34),rgb:pick(['70,60,55','100,90,80']),add:false,shape:'smoke'});
  for(const t of al){sparks(cx(t),midY(t),['255,200,90','255,120,40','255,255,220'],16,480);hit(u,t,sk);}await wait(500);u.pose='idle';};

// ---- Zúzás: egyetlen folyamatos mozdulat – Grog felugrik, a levegőben hátrahajol, majd a földet érve teljes testtel előredől és lecsap, lángoló ívvel
{const de7=drawEntity;drawEntity=function(e){if(!e.lean)return de7(e);const x=cx(e),gy=e.y+e.oy;ctx.save();ctx.translate(x,gy);ctx.rotate(e.lean);ctx.translate(-x,-gy);try{return de7(e);}finally{ctx.restore();}};}
A.crush=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const B=bigOf(t),dx=t.x-u.x-(t.w*t.scale+u.w*u.scale)/2-4,dy=t.y+2-u.y;u.pose='attack';ghosts(u,900);sfx('wind');
  // felugrás – közben hátrahajol
  await tween(380,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI*.5)*200;u.lean=-.22*e;});
  // zuhanás és lecsapás egy mozdulatban
  const arc={a:0,k:0},x=cx(t),gy=t.y+t.oy;effects.push({update(){return arc.a>0||!arc.done;},draw(){if(arc.a<=0)return;const P={x:cx(u)+20,y:topY(u)+40},R=Math.max(140,Math.hypot(x-P.x,gy-30-P.y)),a0=-2.2,a1=a0+(2.6)*arc.k;
    ctx.save();ctx.globalAlpha=arc.a;ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.strokeStyle='rgba(255,140,50,.45)';ctx.lineWidth=R*.3;ctx.beginPath();ctx.arc(P.x,P.y,R*.8,Math.max(a0,a1-1.5),a1);ctx.stroke();ctx.strokeStyle='rgba(255,240,200,.85)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(P.x,P.y,R*.98,Math.max(a0,a1-1.5),a1);ctx.stroke();ctx.restore();}});
  await tween(230,k=>{const e=k*k;u.jump=200*(1-e);u.lean=-.22+.62*easeIO(k);arc.k=easeIO(k);arc.a=1;});u.jump=0;
  fxSpin('quakefx',x,gy-6,{size:B*1.6,life:.9,s0:.4,s1:1,sy:.5,out:.5});fxImage('rock',x,gy+14,{size:B*1.1,life:.7,anchor:'bottom',grow:.4});
  flash('255,230,200',.4,.18);hitStop(110);shake(18);punch(x,midY(t),.06);sfx('rock');sparks(x,gy,['150,140,130','255,220,160','255,160,60'],30,600);toss(t,24,280);hit(u,t,sk);
  for(let i=0;i<14;i++)part({x:x+rnd(-50,50),y:gy,vx:rnd(-160,160),vy:rnd(-300,-120),g:700,life:rnd(.6,1),size:rnd(4,8),rgb:pick(['120,95,70','150,125,95']),add:false,shape:'rock'});
  arc.done=true;tween(300,k=>{arc.a=1-k;}).then(()=>{arc.a=0;});
  await wait(260);await tween(260,k=>{u.lean=.4*(1-easeIO(k));});u.lean=0;
  ghosts(u,300);await tween(320,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*40;});u.ox=0;u.oy=0;u.jump=0;u.pose='idle';await wait(120);};
