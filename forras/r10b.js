
// ===== ellenfelek: a visszajelzések szerint újrarajzolt támadások =====
// ---- közös segédek
const fp=(u,fu,fv)=>sprPt(u,fu,fv);
// a póz (és így a kép) változatlan marad a támadás alatt (pl. a kocka és a baba támadóképe másképp néz ki)
function keepPose(u,pose='idle'){const st={on:true};effects.push({update(){if(st.on)u.pose=pose;return st.on;},draw(){}});return ()=>{st.on=false;u.pose='idle';};}
function fallDebris(x,y,n,draw,o={}){for(let i=0;i<n;i++){const s={x:x+rnd(-(o.w||40),o.w||40),y,vx:rnd(-(o.v||260),o.v||260),vy:-rnd((o.v||260)*.4,(o.v||260)*1.2),r:rnd(0,6),vr:rnd(-10,10),t:0,sc:rnd(.7,1.2)*(o.s||1)};
  effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<(o.life||.9);},draw(){ctx.save();ctx.globalAlpha=Math.min(1,((o.life||.9)-s.t)*3);draw(s.x,s.y,s.r,s.sc);ctx.restore();}});}}
function puffs(x,y,n,rgb,sz=[14,26],o={}){for(let i=0;i<n;i++)part({x:x+rnd(-(o.w||40),o.w||40),y:y+rnd(-(o.h||30),o.h||30),vx:rnd(-(o.v||50),o.v||50),vy:-rnd(10,o.up||70),drag:.8,life:rnd(o.l0||.8,o.l1||1.4),size:rnd(sz[0],sz[1]),grow:o.grow||25,rgb:Array.isArray(rgb)?pick(rgb):rgb,add:false,shape:o.shape||'smoke'});}
function fireBurst(x,y,n,sz=[14,26],v=200){for(let i=0;i<n;i++){const a=rnd(0,6.28),s=rnd(.2,1)*v;part({x:x+rnd(-10,10),y:y+rnd(-10,10),vx:Math.cos(a)*s,vy:Math.sin(a)*s-40,drag:1.4,g:-40,life:rnd(.5,.9),size:rnd(sz[0],sz[1]),grow:40,rgb:'255,150,40',add:false,shape:'fire'});}}
function bigBoom(x,y,s=1){fireBurst(x,y,Math.round(26*s),[18*s,34*s],320*s);puffs(x,y-20,Math.round(10*s),['70,64,60','95,88,82'],[24*s,40*s],{w:50*s,up:120,shape:'dsmoke',l0:1,l1:1.7});
  for(let i=0;i<Math.round(24*s);i++){const a=rnd(0,6.28),v=rnd(300,750)*s;part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2,life:rnd(.3,.6),size:rnd(2,4),rgb:pick(['255,230,150','255,180,80']),shape:'streak'});}
  effects.push({t:0,update(dt){this.t+=dt;return this.t<.35;},draw(){const k=this.t/.35;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,(90+160*k)*s,'255,200,110',.9*(1-k));ctx.restore();}});}
// vastag, kitöltött hanghullám-robbanás (nem vékony gyűrű)
function soundBlast(x,y,rgb,R=260,ms=600){const st={t:0};effects.push({update(dt){st.t+=dt*1000;return st.t<ms;},draw(){const k=st.t/ms;ctx.save();ctx.globalCompositeOperation='lighter';
  for(let i=0;i<3;i++){const kk=Math.max(0,k-i*.12);if(kk<=0)continue;const r=R*kk,w=R*.32*(1-kk*.5),g=ctx.createRadialGradient(x,y,Math.max(0,r-w),x,y,r+w*.4);g.addColorStop(0,`rgba(${rgb},0)`);g.addColorStop(.6,`rgba(${rgb},${.45*(1-kk)})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,r+w*.4,(r+w*.4)*.8,0,0,6.29);ctx.fill();}
  glow(x,y,R*.4*(1-k),rgb,.6*(1-k));ctx.restore();}});}
// ellenfél képének másolata (szellemkép, rohamozó példány)
function drawFoeCopy(u,x,y,a,s=1){const nm=(SPR_ALIAS[u.type]||u.type),im=ENEMY_SPR[nm+'-attack']||ENEMY_SPR[nm];if(!im)return;const Hh=u.h*u.scale*s,Wd=im.width*Hh/im.height;ctx.save();ctx.globalAlpha=a;ctx.drawImage(im,x-Wd/2,y-Hh,Wd,Hh);ctx.restore();}

// ---- rajzolt kellékek
function qGear(x,y,r,R,col='#9a8a70'){ctx.save();ctx.translate(x,y);ctx.rotate(r);const n=10;ctx.fillStyle=col;ctx.strokeStyle='#2a2216';ctx.lineWidth=2;ctx.beginPath();
  for(let i=0;i<n*2;i++){const a0=i*Math.PI/n,rr=i%2?R*.78:R;ctx.lineTo(Math.cos(a0-.12)*rr,Math.sin(a0-.12)*rr);ctx.lineTo(Math.cos(a0+.12)*rr,Math.sin(a0+.12)*rr);}ctx.closePath();ctx.fill();ctx.stroke();
  const g=ctx.createRadialGradient(-R*.3,-R*.3,1,0,0,R*.7);g.addColorStop(0,'rgba(255,240,200,.6)');g.addColorStop(1,'rgba(60,40,20,.3)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R*.7,0,6.29);ctx.fill();
  ctx.fillStyle='#3a2a18';ctx.beginPath();ctx.arc(0,0,R*.25,0,6.29);ctx.fill();for(let i=0;i<4;i++){ctx.beginPath();ctx.arc(Math.cos(i*1.57)*R*.48,Math.sin(i*1.57)*R*.48,R*.1,0,6.29);ctx.fill();}ctx.restore();}
function qBolt(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle='#8a8f98';ctx.strokeStyle='#2a2e36';ctx.lineWidth=1.5;ctx.fillRect(-3,-2,22,4);ctx.strokeRect(-3,-2,22,4);ctx.strokeStyle='#5a5e66';for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(i*4,-2);ctx.lineTo(i*4+2,2);ctx.stroke();}
  ctx.fillStyle='#b0b4bc';ctx.strokeStyle='#2a2e36';ctx.beginPath();for(let i=0;i<6;i++)ctx.lineTo(-6+Math.cos(i*1.047)*7,Math.sin(i*1.047)*7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
function qCroissant(x,y,r,s=1,rot=0){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);
  for(let i=-3;i<=3;i++){const k=i/3,cx0=k*26,cy0=-Math.cos(k*1.3)*10+8,w=15-Math.abs(i)*3;const g=ctx.createRadialGradient(cx0-3,cy0-4,1,cx0,cy0,w);g.addColorStop(0,rot?'#c8b860':'#f2c46a');g.addColorStop(1,rot?'#6a6a28':'#a8601e');ctx.fillStyle=g;ctx.strokeStyle='#4a2a0a';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(cx0,cy0,w*.75,w,k*.6,0,6.29);ctx.fill();ctx.stroke();}
  if(rot){ctx.fillStyle='rgba(90,120,40,.7)';for(const [a,b,c] of [[-12,4,5],[10,0,4],[2,10,3],[18,8,3]]){ctx.beginPath();ctx.arc(a,b,c,0,6.29);ctx.fill();}}ctx.restore();}
function qTeapot(x,y,s=1,r=0){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.lineWidth=4;ctx.strokeStyle='#1e2c5a';
  // kifolyó és fül
  ctx.fillStyle='#fbf8f2';ctx.beginPath();ctx.moveTo(-50,5);ctx.quadraticCurveTo(-80,-5,-92,-40);ctx.lineTo(-80,-44);ctx.quadraticCurveTo(-72,-18,-46,-12);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.lineWidth=9;ctx.beginPath();ctx.arc(56,-2,24,-1.4,1.4);ctx.stroke();ctx.lineWidth=5;ctx.strokeStyle='#fbf8f2';ctx.stroke();ctx.lineWidth=4;ctx.strokeStyle='#1e2c5a';
  // test
  const g=ctx.createRadialGradient(-18,-18,6,0,0,62);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#d8dce8');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,60,46,0,0,6.29);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#2f5cc0';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,4,46,30,0,0,6.29);ctx.stroke();
  for(let i=0;i<6;i++){const a=i*1.047;ctx.fillStyle='#2f5cc0';ctx.beginPath();ctx.ellipse(Math.cos(a)*26,4+Math.sin(a)*16,7,3.5,a,0,6.29);ctx.fill();}ctx.fillStyle='#1e3a90';ctx.beginPath();ctx.arc(0,4,6,0,6.29);ctx.fill();
  // fedő
  ctx.fillStyle='#fbf8f2';ctx.strokeStyle='#1e2c5a';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,-42,30,9,0,0,6.29);ctx.fill();ctx.stroke();ctx.beginPath();ctx.ellipse(0,-52,9,9,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='#2f5cc0';ctx.beginPath();ctx.arc(0,-52,4,0,6.29);ctx.fill();ctx.restore();}
function qPillow(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);const g=ctx.createRadialGradient(-14,-12,4,0,0,60);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#cbc6ec');ctx.fillStyle=g;ctx.strokeStyle='#6a63a8';ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(-55,-38);ctx.quadraticCurveTo(0,-26,55,-38);ctx.quadraticCurveTo(44,0,55,38);ctx.quadraticCurveTo(0,26,-55,38);ctx.quadraticCurveTo(-44,0,-55,-38);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(106,99,168,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-30,-10);ctx.quadraticCurveTo(0,0,30,-12);ctx.stroke();ctx.fillStyle='#8a83c8';ctx.beginPath();ctx.arc(0,0,4,0,6.29);ctx.fill();ctx.restore();}
function qShield(x,y,s=1,r=0){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);const g=ctx.createRadialGradient(-10,-10,4,0,0,46);g.addColorStop(0,'#c08a50');g.addColorStop(1,'#6a3e1a');ctx.fillStyle=g;ctx.strokeStyle='#2a1a0a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,44,0,6.29);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#5a3414';ctx.lineWidth=2;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*16,-42);ctx.lineTo(i*16,42);ctx.stroke();}ctx.strokeStyle='#8a8f98';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,42,0,6.29);ctx.stroke();
  const b=ctx.createRadialGradient(-4,-4,1,0,0,13);b.addColorStop(0,'#ffffff');b.addColorStop(1,'#70757e');ctx.fillStyle=b;ctx.beginPath();ctx.arc(0,0,13,0,6.29);ctx.fill();ctx.strokeStyle='#2a2e36';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
function qJaw(x,y,open,s=1,col='#7fc0a8'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(const sg of [-1,1]){ctx.save();ctx.rotate(sg*open);ctx.fillStyle=col;ctx.strokeStyle='#1a3a30';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(40,0);ctx.quadraticCurveTo(10,sg*-46,-80,sg*-14);ctx.lineTo(-80,sg*2);ctx.lineTo(40,sg*2);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#fffdf2';ctx.strokeStyle='#5a5a40';ctx.lineWidth=1.2;for(let i=0;i<7;i++){const tx=-74+i*16;ctx.beginPath();ctx.moveTo(tx,sg*2);ctx.lineTo(tx+6,sg*(2+(i%2?10:15)));ctx.lineTo(tx+12,sg*2);ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}ctx.restore();}
function qLips(x,y,s=1,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);const g=ctx.createLinearGradient(0,-14,0,14);g.addColorStop(0,'#ff5a8a');g.addColorStop(1,'#a8104a');ctx.fillStyle=g;ctx.strokeStyle='#5a0a28';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-26,0);ctx.quadraticCurveTo(-14,-16,-2,-8);ctx.quadraticCurveTo(0,-10,2,-8);ctx.quadraticCurveTo(14,-16,26,0);ctx.quadraticCurveTo(0,22,-26,0);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='#5a0a28';ctx.beginPath();ctx.moveTo(-24,0);ctx.quadraticCurveTo(0,6,24,0);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.ellipse(-10,-7,6,2,-.3,0,6.29);ctx.ellipse(8,7,7,2.2,.1,0,6.29);ctx.fill();ctx.restore();}
function qNote(x,y,s=1,col='#ffe08a',dbl=false){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.strokeStyle='rgba(60,30,10,.8)';ctx.lineWidth=1.5;
  for(const dx of dbl?[0,16]:[0]){ctx.beginPath();ctx.ellipse(dx,12,7,5,-.4,0,6.29);ctx.fill();ctx.stroke();ctx.fillRect(dx+5,-14,3,26);}
  ctx.beginPath();if(dbl){ctx.moveTo(5,-14);ctx.lineTo(24,-10);ctx.lineTo(24,-5);ctx.lineTo(5,-9);}else{ctx.moveTo(8,-14);ctx.quadraticCurveTo(20,-8,16,4);ctx.quadraticCurveTo(16,-4,8,-6);}ctx.closePath();ctx.fill();ctx.restore();}
function qCandyCane(x,y,r,L=120,w=13){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.lineCap='round';const path=()=>{ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-L,0);ctx.arc(-L,-22,22,Math.PI/2,Math.PI*1.5,false);};
  ctx.strokeStyle='#3a0a10';ctx.lineWidth=w+4;path();ctx.stroke();ctx.strokeStyle='#ffffff';ctx.lineWidth=w;path();ctx.stroke();ctx.strokeStyle='#e0203a';ctx.setLineDash([11,11]);ctx.lineWidth=w;path();ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-6,-4);ctx.lineTo(-L,-4);ctx.stroke();ctx.restore();}
function qTongs(x,y,open,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);for(const sg of [-1,1]){ctx.save();ctx.rotate(sg*open);const g=ctx.createLinearGradient(0,-6,0,6);g.addColorStop(0,'#f2f4f8');g.addColorStop(1,'#80868f');ctx.fillStyle=g;ctx.strokeStyle='#2a2e36';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(60,sg*2);ctx.lineTo(-60,sg*6);ctx.lineTo(-62,sg*14);ctx.lineTo(60,sg*8);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.moveTo(-60,sg*6);for(let i=0;i<5;i++){ctx.lineTo(-66-i*4,sg*(6+(i%2?-4:6)));}ctx.lineTo(-84,sg*16);ctx.lineTo(-62,sg*16);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}ctx.restore();}
function qCannonball(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const g=ctx.createRadialGradient(-6,-6,2,0,0,18);g.addColorStop(0,'#8a8f98');g.addColorStop(.5,'#2a2e36');g.addColorStop(1,'#0a0c10');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,17,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,255,255,.45)';ctx.beginPath();ctx.ellipse(-6,-7,5,3,-.6,0,6.29);ctx.fill();ctx.restore();}
function qSpear(x0,y0,x1,y1,w=9){drawStick(x0,y0,x1,y1,w,['#1f4a12','#5fa83a','#9ad46a']);ctx.save();ctx.strokeStyle='#1f4a12';ctx.lineWidth=2.5;const L=Math.hypot(x1-x0,y1-y0);for(let i=1;i<5;i++){const q=i/5;ctx.beginPath();ctx.arc(x0+(x1-x0)*q,y0+(y1-y0)*q,w*.55,0,6.29);ctx.stroke();}
  const an=Math.atan2(y1-y0,x1-x0);ctx.translate(x1,y1);ctx.rotate(an);const g=ctx.createLinearGradient(0,-8,0,8);g.addColorStop(0,'#e8f0d8');g.addColorStop(1,'#7a8a60');ctx.fillStyle=g;ctx.strokeStyle='#1f2a10';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(26,0);ctx.lineTo(-4,-9);ctx.lineTo(-8,0);ctx.lineTo(-4,9);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#c8202a';ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(-20,-8);ctx.lineTo(-16,0);ctx.lineTo(-20,8);ctx.closePath();ctx.fill();ctx.restore();}

// =========== 1-4. térkép ===========
// Bambuszőr – Bambuszdöfés: nekifut és elhajítja a bambuszlándzsát
A.bambooJab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const h=fp(u,.4,.45),T={x:cx(t)+10,y:midY(t)};sfx('whoosh');
  await tween(220,k=>{u.ox=12*k;});u.ox=0;sfx('slash');const an=Math.atan2(T.y-h.y,T.x-h.x);
  await flyObj(h,T,300,(x,y)=>{const dx=Math.cos(an)*95,dy=Math.sin(an)*95;qSpear(x-dx,y-dy+0,x,y);},{arc:40,trail:['200,240,160','255,255,255'],trailShape:'streak'});
  sfx('hit');shake(9);hitStop(70);sparks(T.x,T.y,['200,240,150','255,255,255'],16,380);puffs(T.x,t.y+t.oy,5,'190,170,130',[10,18]);toss(t,28,280);hit(u,t,sk);
  const st={t:0};effects.push({update(dt){st.t+=dt;return st.t<.7;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(.7-st.t)*3);qSpear(T.x-Math.cos(an)*95-20,T.y-Math.sin(an)*95,T.x-20,T.y);ctx.restore();}});await wait(300);u.pose='idle';};
// Bambuszőr – Bambuszketrec: bambuszok nőnek ki alulról egy hős körül, és 1 körre bezárják
ESK.bamboowall={name:'Bambuszketrec',tgt:'enemy',kind:'phys',pow:.6,elem:'nature',anim:'bambooCage',status:['stun',1,1]};
A.bambooCage=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('rock');const x=cx(t),gy=t.y+t.oy,hh=t.h*t.scale+50,R=Math.max(55,t.w*t.scale*.6);
  const poles=[];for(let i=0;i<9;i++){const a=i/9*6.283;poles.push({dx:Math.cos(a)*R,z:Math.sin(a),h:0,d:i*.05});}
  const C={k:0,on:true,a:1};t._cage=C;
  effects.push({update(){return C.on;},draw(){if(t._cage!==C)return;drawCage(false);}});
  function drawCage(front){ctx.save();ctx.globalAlpha=C.a;for(const p of poles){if((p.z>0)!==front)continue;const hk=Math.max(0,Math.min(1,(C.k-p.d)/.6)),H2=hk*hh*(1+.1*Math.sin(p.dx));if(H2<2)continue;const px=x+p.dx,py=gy+p.z*12;
    drawStick(px,py,px,py-H2,14,['#1f4a12','#5fa83a','#9ad46a']);ctx.strokeStyle='#1f4a12';ctx.lineWidth=3;for(let j=1;j*34<H2;j++){ctx.beginPath();ctx.moveTo(px-8,py-j*34);ctx.lineTo(px+8,py-j*34);ctx.stroke();}
    if(hk>=1){ctx.fillStyle='#5fb03a';ctx.beginPath();ctx.ellipse(px+10,py-H2+6,14,5,-.5,0,6.29);ctx.fill();}}
    if(front&&C.k>.8){ctx.strokeStyle='#3f7a22';ctx.lineWidth=8;for(const yy of [.35,.75]){ctx.beginPath();ctx.ellipse(x,gy-hh*yy,R,14,0,0,Math.PI);ctx.stroke();}}ctx.restore();}
  C.drawFront=()=>drawCage(true);
  for(let i=0;i<12;i++)part({x:x+rnd(-R,R),y:gy,vx:rnd(-80,80),vy:-rnd(60,180),g:600,life:.7,size:rnd(3,6),rgb:'120,90,50',add:false,shape:'rock'});
  await tween(700,k=>{C.k=k*1.4;if(Math.random()<.3)sfx('rock');});shake(8);sfx('hit');t.hurt=.3;hit(u,t,sk);await wait(500);u.pose='idle';
  // a ketrec addig marad, amíg a hős kábult (bezárva)
  const watch={};effects.push({update(dt){if(!(t.alive&&t.st&&t.st.stun)||S.over){C.a-=dt*2.5;if(C.a<=0){C.on=false;if(t._cage===C)t._cage=null;return false;}}return true;},draw(){}});};
{const deC=drawEntity;drawEntity=function(e){deC(e);if(e._cage&&e._cage.drawFront)e._cage.drawFront();};}
// Vadállat – Tombolás: felvonyít, és 6 árnypéldánya végigsuhan a hősökön
ESK.frenzy.tgt='enemies';ESK.frenzy.pow=.6;
A.frenzy=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('growl');const m=fp(u,.15,.4);
  for(let i=0;i<3;i++){soundBlast(m.x,m.y,'170,90,255',160,500);await wait(150);}shake(8);await wait(200);
  const copies=[];for(let i=0;i<6;i++)copies.push({x:cx(u)+rnd(-30,30),y:u.y+u.oy+rnd(-60,40),d:i*.14,k:0});const st={t:0},got=new Set();
  effects.push({update(dt){st.t+=dt;for(const c of copies){c.k=Math.max(0,Math.min(1,(st.t-c.d)/.55));}return st.t<1.6;},
    draw(){for(const c of copies){if(c.k<=0||c.k>=1)continue;const x=c.x+(-200-c.x)*c.k;for(let g=3;g>=0;g--)drawFoeCopy(u,x+g*38,c.y,(g?.12:.65)*Math.sin(c.k*Math.PI),.95);
      for(const t of al){const key=al.indexOf(t)+'|'+copies.indexOf(c);if(!got.has(key)&&x<cx(t)+20&&x>cx(t)-40){got.add(key);clawMarks(cx(t)+rnd(-15,15),midY(t)+rnd(-20,20),Math.max(110,bigOf(t)*.6),rnd(-.6,.6),'190,110,255');t.hurt=.25;sfx('slash');}}}}});
  await wait(1250);shake(10);hitAll(u,al,sk);await wait(300);u.pose='idle';};
NOFX.add('frenzy');

// Méhecske – Mézlövet: sűrű, csöpögő mézgömb, ami beborítja a hőst
function honeyCoat(t,ms=1400){const x=cx(t),top=topY(t),hh=t.h*t.scale,w=t.w*t.scale*.55;const st={t:0},dr=[];for(let i=0;i<8;i++)dr.push({x:rnd(-w,w),l:rnd(.3,.9),sp:rnd(.6,1.2)});
  effects.push({update(dt){st.t+=dt;if(Math.random()<.35)part({x:x+rnd(-w,w),y:top+hh*rnd(.2,.8),vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(2,4),rgb:'230,150,20',add:false,shape:'drop'});return st.t*1000<ms;},
    draw(){const a=Math.min(1,st.t*4)*Math.min(1,(ms/1000-st.t)*2);ctx.save();ctx.globalAlpha=.75*a;for(const d of dr){const L=Math.min(d.l,st.t*d.sp)*hh;const g=ctx.createLinearGradient(0,top,0,top+L);g.addColorStop(0,'rgba(240,170,30,.95)');g.addColorStop(1,'rgba(200,120,10,.8)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x+d.x-7,top+4);ctx.lineTo(x+d.x+7,top+4);ctx.lineTo(x+d.x+5,top+L);ctx.arc(x+d.x,top+L,5,0,Math.PI);ctx.closePath();ctx.fill();}
      ctx.fillStyle='rgba(240,170,30,.9)';ctx.beginPath();ctx.ellipse(x,top+6,w+8,14,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,240,180,.6)';ctx.beginPath();ctx.ellipse(x-w*.4,top+2,w*.3,4,-.1,0,6.29);ctx.fill();ctx.restore();}});}
A.honeyShot=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('squish');const o=fp(u,.92,.25),T={x:cx(t),y:topY(t)+t.h*t.scale*.3};
  // a mézpálcáról nagy gömb csepeg, majd kilövi
  const B={r:4};effects.push({update(){return B.r>0;},draw(){if(B.r>0)drawBlob(o.x,o.y+B.r*.3,B.r,'235,160,25');}});await tween(380,k=>{B.r=4+18*k;});B.r=0;sfx('whoosh');
  await flyObj(o,T,420,(x,y,r,k)=>{drawBlob(x,y,20,'235,160,25');ctx.fillStyle='rgba(235,160,25,.9)';ctx.beginPath();ctx.ellipse(x+16,y+3,12,6,.1,0,6.29);ctx.fill();},{arc:110,trail:['240,170,30','255,210,90'],trailAdd:false,trailShape:'drop'});
  sfx('squish');shake(7);splat(T.x,T.y,['230,150,20','255,200,70','200,120,10'],30,320,'drop');honeyCoat(t);t.hurt=.3;hit(u,t,sk);await wait(350);u.pose='idle';};
// Méhecske – Fullánk: hátrál, lendületet vesz, és szellemképekkel becsapódik a fullánkjával
A.beeSting=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('buzz');u.pose='attack';await tween(260,k=>{u.ox=40*easeIO(k);u.oy=-30*easeIO(k);});
  const s0={x:u.ox,y:u.oy},tx=t.x+(t.w*t.scale)/2+20-u.x,ty=t.y-u.y+10;ghosts(u,320);sfx('whoosh');
  await tween(200,k=>{const e=k*k;u.ox=s0.x+(tx-s0.x)*e;u.oy=s0.y+(ty-s0.y)*e;});sfx('needle');shake(9);hitStop(90);flash('255,230,120',.2,.08);
  const T={x:cx(t),y:midY(t)};sparks(T.x,T.y,['255,230,90','255,255,255'],18,380);for(let i=0;i<10;i++)part({x:T.x+rnd(-20,20),y:T.y+rnd(-20,20),vx:rnd(-60,60),vy:rnd(-30,60),g:200,life:.8,size:rnd(3,6),rgb:pick(['150,220,60','190,240,90']),add:false,shape:'drop'});
  puffs(T.x,T.y,4,['170,230,90','140,200,70'],[10,16]);t.hurt=.35;hit(u,t,sk);await wait(160);await tween(320,k=>{const e=easeIO(k);u.ox=tx*(1-e);u.oy=ty*(1-e)+Math.sin(k*Math.PI)*-40;});u.ox=0;u.oy=0;u.pose='idle';};

// Óramű ágyú – lövés: torkolattűz és füst a csőből, igazi vasgolyó füstcsíkkal, hatalmas robbanás
async function cannonFire(u,t,big=1){const m=fp(u,.05,.37),T={x:cx(t),y:midY(t)};u.pose='attack';sfx('boom');flash('255,210,140',.3,.08);shake(10*big);
  fireBurst(m.x,m.y,14,[14,26],260);puffs(m.x-10,m.y,10,['200,195,190','160,155,150'],[18,30],{w:20,h:16,v:80,up:60});
  await tween(70,k=>{u.ox=26*k;});tween(260,k=>{u.ox=26*(1-k);}).then(()=>{u.ox=0;});
  await flyObj(m,T,330,(x,y)=>{qCannonball(x,y,0,1.5*big);},{arc:60,trail:['180,175,170','120,115,110'],trailAdd:false,trailLife:.6});
  sfx('boom');hitStop(80);shake(16*big);flash('255,200,120',.35,.12);bigBoom(T.x,T.y,1.2*big);fallDebris(T.x,t.y+t.oy-10,10,(x,y,r,s)=>{ctx.fillStyle='#5a4a3a';ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillRect(-5*s,-4*s,10*s,8*s);ctx.restore();},{v:320});
  groundCrack(T.x,t.y+t.oy,'255,160,60',110);toss(t,40,340);}
A.cannonball=async(u,ts,sk)=>{const t=ts[0];if(!t)return;await cannonFire(u,t,1);hit(u,t,sk);await wait(300);u.pose='idle';};
A.broadside=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;for(const t of al){if(!t.alive)continue;await cannonFire(u,t,.85);hit(u,t,sk);await wait(120);}await wait(250);u.pose='idle';};
NOFX.add('cannonball');NOFX.add('broadside');

// Káoszkocka – Káoszlövedék: a kocka nem változik meg lövés közben; vastag szivárványos robbanás (gyűrűk nélkül)
A.chaosOrb=async(e,ts,sk)=>{const t=ts[0];if(!t)return;const rel=e.type==='ccube'?keepPose(e):null;if(!rel)e.pose='cast';const cols=['255,120,50','120,210,255','255,230,80','255,245,180','160,90,240'];
  const hp=e.type==='ccube'?{x:cx(e)-e.w*e.scale*.5,y:midY(e)}:handPos(e);const o={x:hp.x,y:hp.y,r:0,t:0,on:true};
  effects.push({update(dt){o.t+=dt;if(o.on&&Math.random()<.9)part({x:o.x+rnd(-o.r,o.r),y:o.y+rnd(-o.r,o.r),vx:rnd(-60,60),vy:rnd(-60,60),life:.4,size:rnd(3,6),rgb:pick(cols)});return o.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';cols.forEach((c,i)=>{const an=o.t*6+i*1.256;glow(o.x+Math.cos(an)*o.r*.5,o.y+Math.sin(an)*o.r*.5,o.r*.7,c,.6);});glow(o.x,o.y,o.r*.5,'255,255,255',.8);ctx.restore();}});
  sfx('dark');await tween(600,k=>{o.r=10+50*k;});const x0=o.x,y0=o.y,x1=cx(t),y1=midY(t);sfx('thunder');
  await tween(380,k=>{o.x=x0+(x1-x0)*k+Math.sin(k*12)*30*(1-k);o.y=y0+(y1-y0)*k+Math.cos(k*12)*30*(1-k);});o.on=false;
  flash('230,200,255',.35,.15);shake(14);hitStop(90);cols.forEach((c,i)=>setTimeout(()=>soundBlast(x1,y1,c,150+i*30,450),i*60));sparks(x1,y1,cols,40,600);hit(e,t,sk);await wait(350);if(rel)rel();else e.pose='idle';};

// Kristálygólem – Kristályököl: az ökle tényleg kristállyá nő, nekirohan, hatalmas becsapódás
A.crystalPunch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('ice');const F={k:0,on:true};
  const cl=[];for(let i=0;i<9;i++)cl.push({a:-Math.PI+rnd(-1.2,1.2),l:rnd(.6,1.3),w:rnd(.6,1)});
  effects.push({update(){return F.on;},draw(){const f=fp(u,.08,.55);ctx.save();ctx.globalCompositeOperation='lighter';glow(f.x,f.y,60*F.k,'150,230,255',.6);ctx.restore();for(const c of cl){const L=F.k*c.l;if(L<=.05)continue;drawCrystal(f.x+Math.cos(c.a)*18*L,f.y+Math.sin(c.a)*18*L,c.a+Math.PI/2,L*1.5*c.w);}}});
  for(let i=0;i<14;i++){const f=fp(u,.08,.55);part({x:f.x+rnd(-50,50),y:f.y+rnd(-50,50),vx:0,vy:0,life:.4,size:rnd(2,4),rgb:'200,245,255',shape:'star'});}
  await tween(450,k=>{F.k=easeIO(k);});sfx('glass');const d=await dashTo(u,t,200,0);u.pose='attack';
  sfx('rock');sfx('glass');shake(20);hitStop(120);flash('200,240,255',.45,.15);const x=cx(t),y=midY(t);soundBlast(x,y,'150,230,255',220,500);shardBurst(x,y,16,'150,230,255',420,.9);
  sparks(x,y,['200,245,255','255,255,255'],26,560);groundCrack(x,t.y+t.oy,'150,230,255',130);toss(t,46,360);hit(u,t,sk);await wait(260);F.on=false;await dashBack(u,d);};
if(ESK.crystalpunch){ESK.crystalpunch.anim='crystalPunch';NOFX.add('crystalPunch');}

// Csészekatona – Kanáldöfés: nekiront, és háromszor nagyot döf a fényes ezüstkanállal
A.spoonStab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const spoon=(x0,y0,x1,y1,k)=>{drawStick(x0,y0,x1,y1,10,['#4a5060','#e8ecf4']);const an=Math.atan2(y1-y0,x1-x0);ctx.save();ctx.translate(x1,y1);ctx.rotate(an);const g=ctx.createLinearGradient(-12,-12,12,12);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#8a90a0');ctx.fillStyle=g;ctx.strokeStyle='#3a4050';ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(10,0,20,13,0,0,6.29);ctx.fill();ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.8)';ctx.beginPath();ctx.ellipse(6,-4,8,3,-.3,0,6.29);ctx.fill();ctx.fillStyle='rgba(150,90,40,.8)';ctx.beginPath();ctx.ellipse(12,2,10,6,0,0,6.29);ctx.fill();ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(x1,y1,30*k,'255,255,255',.5);ctx.restore();};
  sfx('whoosh');const d=await dashTo(u,t,200,60);u.pose='attack';for(let i=0;i<3&&t.alive;i++){const r=await reachWeapon(u,t,spoon,90,50);sfx(i===2?'hit':'slash');shake(i===2?10:5);sparks(r.T.x,r.T.y+rnd(-20,20),['255,255,255','210,220,235'],14,360);splat(r.T.x,r.T.y,['150,90,40','190,130,60'],8,220,'drop');t.hurt=.3;if(i===2){hitStop(80);toss(t,26,260);hit(u,t,sk);}await r.back();}
  await dashBack(u,d);};
// Csészekatona – Teafröccs: a csészéjéből hatalmas, forró teahullám csap ki gőzzel
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const o=fp(u,.55,.15),T={x:cx(t),y:midY(t)},st={k:0,on:true,t:0};sfx('splash');
  effects.push({update(dt){st.t+=dt;if(st.on)for(let i=0;i<6;i++){const q=rnd(0,st.k);const x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*120;part({x,y,vx:rnd(-60,60),vy:rnd(-40,60),g:500,life:.4,size:rnd(2,5),rgb:pick(['150,90,40','190,130,60','220,170,100']),add:false,shape:'drop'});}return st.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const [w,c] of [[34,'rgba(120,70,30,.55)'],[20,'rgba(170,110,50,.85)'],[6,'rgba(240,200,140,.8)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();for(let i=0;i<=24;i++){const q=Math.max(0,st.k-.5)+i/24*Math.min(.5,st.k),x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*120+Math.sin(i+st.t*20)*3;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}});
  await tween(420,k=>{st.k=k*1.5;});sfx('splash');shake(9);splat(T.x,T.y,['150,90,40','190,130,60','230,180,110'],36,380,'drop');puffs(T.x,T.y,10,['240,240,245','225,228,235'],[16,28],{up:110});t.hurt=.35;toss(t,24,240);hit(u,t,sk);await tween(200,k=>{st.k=1.5+k;});st.on=false;u.pose='idle';};

// Porcelánbaba – Szilánkszórás: szívecskék nélkül (a baba támadóképén szívek vannak, ezért itt nem azt mutatjuk)
{const sr=A.shardRain;A.shardRain=async(u,ts,sk)=>{const rel=u.type==='doll'?keepPose(u):null;try{await sr(u,ts,sk);}finally{rel&&rel();}};}
// Porcelánbaba – Porcelán csók: csókot dob; a rúzsos ajkak odarepülnek, a csókjel megreped, és átkot hint
A.dollKiss=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('mirror');const o=fp(u,.25,.38),T={x:cx(t),y:topY(t)+t.h*t.scale*.3};
  for(let i=0;i<10;i++)part({x:o.x,y:o.y,vx:rnd(-80,-20),vy:rnd(-40,40),life:.5,size:rnd(2,4),rgb:'255,150,200'});await wait(200);
  await flyObj(o,T,520,(x,y,r,k)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'255,90,150',.5);ctx.restore();qLips(x,y,1.3+Math.sin(k*18)*.08);},{arc:70,trail:['255,120,170','255,210,230']});
  sfx('glass');shake(7);const M={a:1,cr:0};effects.push({update(dt){M.cr+=dt;M.a-=dt*.7;if(Math.random()<.4)part({x:T.x+rnd(-20,20),y:T.y+rnd(-10,10),vx:rnd(-20,20),vy:-rnd(20,60),life:.8,size:rnd(10,16),rgb:pick(['120,40,140','90,20,110']),add:false,shape:'smoke'});return M.a>0;},
    draw(){qLips(T.x,T.y,1.2,M.a);ctx.save();ctx.globalAlpha=M.a;ctx.strokeStyle='rgba(30,10,30,.9)';ctx.lineWidth=2;const L=Math.min(1,M.cr*3);for(const [a,b] of [[-.6,1],[.4,.8],[2.4,.9],[3.6,.7]]){ctx.beginPath();ctx.moveTo(T.x,T.y);ctx.lineTo(T.x+Math.cos(a)*30*b*L,T.y+Math.sin(a)*22*b*L);ctx.lineTo(T.x+Math.cos(a+.3)*44*b*L,T.y+Math.sin(a+.3)*30*b*L);ctx.stroke();}ctx.restore();}});
  sparks(T.x,T.y,['255,150,200','200,120,255'],14,260);t.hurt=.3;hit(u,t,sk);await wait(400);u.pose='idle';};

// Espresszó – Farokcsapás: vastag, tüskés sárkányfarok nagy ívben lecsap, porhullám és szikrák
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const ash=u.stance==='ash';const base={x:cx(u)+u.w*u.scale*.35,y:u.y+u.oy-u.h*u.scale*.2},T={x:cx(t),y:midY(t)},st={k:0,hist:[]};
  const tailAt=k=>{const pts=[];const ang=-1.9+2.1*k;for(let i=0;i<=14;i++){const q=i/14,L=q*(Math.hypot(T.x-base.x,T.y-base.y)+40);const a=ang+Math.sin(q*2.2)*.35*(1-k*.4);pts.push({x:base.x+Math.cos(Math.PI+a*.9)*L*Math.cos(a*.4),y:base.y-Math.sin(a)*L*.55+q*q*60*k});}return pts;};
  const draw=(pts,al)=>{ctx.save();ctx.globalAlpha=al;ctx.lineCap='round';ctx.lineJoin='round';for(let i=1;i<pts.length;i++){const q=i/pts.length,w=34*(1-q*.75);ctx.strokeStyle=OL;ctx.lineWidth=w+5;ctx.beginPath();ctx.moveTo(pts[i-1].x,pts[i-1].y);ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();ctx.strokeStyle=ash?'#7a7a86':(i%2?'#b22a1e':'#d0402a');ctx.lineWidth=w;ctx.stroke();}
    for(let i=2;i<pts.length-1;i+=2){const p=pts[i],q=pts[i+1],an=Math.atan2(q.y-p.y,q.x-p.x)-Math.PI/2,s=14*(1-i/pts.length*.6);ctx.fillStyle=ash?'#dcdce4':'#ffcf6a';ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x+Math.cos(an+.5)*s*.6,p.y+Math.sin(an+.5)*s*.6);ctx.lineTo(p.x+Math.cos(an)*s*1.6,p.y+Math.sin(an)*s*1.6);ctx.lineTo(p.x+Math.cos(an-.5)*s*.6,p.y+Math.sin(an-.5)*s*.6);ctx.closePath();ctx.fill();ctx.stroke();}
    const e=pts[pts.length-1];ctx.fillStyle=ash?'#9a9aa6':'#8a1a12';ctx.beginPath();ctx.moveTo(e.x-30,e.y);ctx.lineTo(e.x+6,e.y-16);ctx.lineTo(e.x+6,e.y+16);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();};
  const fx={on:true};effects.push({update(){st.hist.unshift(st.k);st.hist.length=Math.min(5,st.hist.length);return fx.on;},draw(){st.hist.slice(1).forEach((k,i)=>draw(tailAt(k),.15*(1-i/5)));draw(tailAt(st.k),1);}});
  sfx('whoosh');await tween(260,k=>{st.k=-.25*easeIO(k);});await tween(200,k=>{st.k=-.25+1.25*k*k;});
  sfx('rock');hitStop(100);shake(16);flash('255,200,140',.25,.1);groundCrack(T.x,t.y+t.oy,'255,180,90',140);dustWave(T.x,t.y+t.oy);puffs(T.x,t.y+t.oy,10,['180,160,130','150,130,110'],[16,30],{w:60,up:90});sparks(T.x,T.y,['255,220,150','255,255,255'],20,460);toss(t,40,340);hit(u,t,sk);
  await wait(200);await tween(260,k=>{st.k=1-k;});fx.on=false;u.pose='idle';await wait(150);};

// Kísértet – Hideg érintés: kék, jeges lehelet; a hős 1 körre lefagy
ESK.chill.elem='ice';ESK.chill.status=['freeze',1,1];ESK.chill.anim='ghostChill';
A.ghostChill=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('chill');const m=fp(u,.4,.25),T={x:cx(t),y:midY(t)};
  await new Promise(res=>{const st={t:0};effects.push({update(dt){st.t+=dt;if(st.t<.8)for(let i=0;i<7;i++){const an=Math.atan2(T.y-m.y,T.x-m.x)+rnd(-.15,.15),v=rnd(500,700);part({x:m.x,y:m.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.4,life:rnd(.6,.9),size:rnd(8,14),grow:40,rgb:pick(['170,215,255','210,235,255','140,190,255']),add:false,shape:'smoke'});
      if(Math.random()<.6)part({x:m.x,y:m.y,vx:Math.cos(an)*v*1.1,vy:Math.sin(an)*v*1.1,drag:1,life:.6,size:rnd(2,4),rgb:'230,245,255',shape:'star'});}if(st.t>1){res();return false;}return true;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,50,'150,200,255',.6);ctx.restore();}});});
  sfx('ice');shake(7);flash('200,230,255',.3,.12);
  // dér kúszik fel a hősön, jégkristályok nőnek rajta
  const hh=t.h*t.scale,x=cx(t),gy=t.y+t.oy;const cr=[];for(let i=0;i<10;i++)cr.push({x:rnd(-.5,.5)*t.w*t.scale,y:-rnd(0,1)*hh,a:rnd(-.8,.8),s:rnd(.5,1)});
  effects.push({t:0,update(dt){this.t+=dt;return this.t<1.4;},draw(){const k=Math.min(1,this.t/.4),a=Math.min(1,(1.4-this.t)*2);ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x,gy-hh*.5,hh*.7,'150,210,255',.45);ctx.restore();
    ctx.save();ctx.globalAlpha=a;for(const c of cr)if(-c.y<hh*k)drawCrystal(x+c.x,gy+c.y,c.a,c.s*.8,'190,230,255');ctx.restore();}});
  t.hurt=.3;hit(u,t,sk);await wait(400);u.pose='idle';};
NOFX.add('ghostChill');
// Kísértet – Jajveszékelés: sikoltás, a hősök fölött hanghullám-robbanás
ESK.wail.anim='ghostWail';
A.ghostWail=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('wail');await dimTo(.4,'10,20,40',200);const m=fp(u,.4,.25);
  for(let i=0;i<3;i++){soundBlast(m.x,m.y,'170,200,255',120,400);await wait(110);}const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,t)=>s+midY(t),0)/al.length;
  await flyObj(m,{x:mx,y:my},420,(x,y,r,k)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,50,'180,210,255',.7);glow(x,y,20,'255,255,255',.9);ctx.restore();},{trail:['180,210,255','230,240,255']});
  sfx('wail');sfx('boom');flash('210,225,255',.45,.15);shake(18);hitStop(100);soundBlast(mx,my,'180,210,255',420,750);soundBlast(mx,my,'255,255,255',260,500);
  for(const t of al){t.hurt=.4;puffs(cx(t),midY(t),5,['200,220,255','170,190,240'],[14,24]);}hitAll(u,al,sk);await wait(500);await dimTo(0,null,250);u.pose='idle';};
NOFX.add('ghostWail');

// Mézeskalács-bandita – Cukorpálca-ütés: óriás, fényes cukorpálca nagy ívben, a kampóval megrántja a hőst
A.caneHook=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,40);u.pose='attack';const x=cx(t),y=midY(t),C={a:-2.6,on:true,hist:[]};
  effects.push({update(){C.hist.unshift(C.a);C.hist.length=Math.min(4,C.hist.length);return C.on;},draw(){const px=x+90,py=y-50;C.hist.slice(1).forEach((a,i)=>{ctx.save();ctx.globalAlpha=.18*(1-i/4);qCandyCane(px,py,a,150,16);ctx.restore();});qCandyCane(px,py,C.a,150,16);}});
  sfx('whoosh');await tween(160,k=>{C.a=-2.6-.3*k;});await tween(160,k=>{C.a=-2.9+2.8*k*k;});sfx('hit');shake(11);hitStop(80);sparks(x,y,['255,80,90','255,255,255'],18,380);
  fallDebris(x,y,8,(px,py,r,s)=>{ctx.fillStyle=pick(['#ffffff','#e0203a']);ctx.save();ctx.translate(px,py);ctx.rotate(r);ctx.fillRect(-5*s,-3*s,10*s,6*s);ctx.restore();},{v:280});
  await tween(220,k=>{t.ox=30*Math.sin(k*Math.PI);});t.ox=0;toss(t,30,280);hit(u,t,sk);await wait(150);C.on=false;await dashBack(u,d);};
// Mézeskalács-bandita – Cukormáz-bomba: habcsók-bomba, ami cukormáz-zuhatagban robban szét
A.icingRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const o=fp(u,.15,.2),xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=Math.min(...al.map(topY))-60;sfx('whoosh');
  await flyObj(o,{x:mx,y:my},520,(x,y,r)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);for(let i=0;i<5;i++){drawBlob(Math.cos(i*1.256)*10,Math.sin(i*1.256)*10,13,i%2?'255,200,225':'255,255,255');}drawBlob(0,0,12,'255,230,240');ctx.fillStyle='#e0203a';ctx.beginPath();ctx.arc(0,-14,5,0,6.29);ctx.fill();ctx.restore();},{spin:8,arc:120,trail:['255,220,235','255,255,255'],trailAdd:false});
  sfx('boom');sfx('squish');flash('255,235,245',.4,.12);shake(12);soundBlast(mx,my,'255,220,240',240,500);
  for(let i=0;i<40;i++){const a=rnd(0,6.28),v=rnd(150,520);part({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120,g:800,life:rnd(.6,1),size:rnd(4,9),rgb:pick(['255,255,255','255,200,225','200,235,255']),add:false});}
  await Promise.all(al.map(t=>rainOn(t,8,(x,y,r,s)=>{drawBlob(x,y,11*s,pick(['255,200,225','255,255,255','200,235,255']));},{v0:420,onLand:it=>{sfx('squish');splat(it.x,it.y,['255,200,225','255,255,255'],6,160);}})));
  for(const t of al){const x=cx(t),top=topY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<1.2;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.2-this.t)*2);ctx.fillStyle='#fff6fb';ctx.beginPath();ctx.moveTo(x-28,top+4);for(let i=0;i<=8;i++)ctx.lineTo(x-28+i*7,top+4+(i%2?16:6));ctx.lineTo(x+28,top);ctx.quadraticCurveTo(x,top-12,x-28,top+4);ctx.fill();ctx.restore();}});}
  hitAll(u,al,sk);await wait(250);u.pose='idle';};

// Majom / Mézeskalács-bandita – Elcsenés: ha van a csapatnál tőr vagy tűzbomba, azt lopja el, és rögtön a hősökre dobja
A.monkeySnatch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('whoosh');const ids=['knife','firebomb'].filter(id=>S.inv&&S.inv[id]>0),id=ids.length?pick(ids):null;
  const d=await dashTo(u,t,220);sfx('hit');t.hurt=.3;sparks(cx(t),midY(t),['255,230,150','255,255,255'],10,260);
  if(id){S.inv[id]--;popLabel(u,'ELLOPTA: '+ITEMS[id].name+'!','#ffd84a');hit(u,t,{...sk,steal:false});}else hit(u,t,sk);
  const bag={on:true};effects.push({update(){return bag.on;},draw(){const x=cx(u)+6,y=topY(u)-14;if(id==='knife')drawDagger(x,y,-Math.PI/2+Math.sin(T*8)*.2,1.4);else if(id==='firebomb')drawBomb(x,y,14,Math.sin(T*6)*.3);else{ctx.save();ctx.fillStyle='#c8a060';ctx.strokeStyle='#4a3010';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,12,0,6.29);ctx.fill();ctx.stroke();ctx.restore();}}});
  sfx('boing');await tween(380,k=>{const e=easeIO(k);u.ox=d.dx*(1-e);u.oy=d.dy*(1-e);u.jump=Math.abs(Math.sin(k*Math.PI*3))*40;});u.ox=0;u.oy=0;u.jump=0;
  if(!id){bag.on=false;u.pose='idle';return;}
  await wait(250);u.pose='attack';bag.on=false;const h=fp(u,.22,.27);updateHUD&&updateHUD();
  if(id==='knife'){const v=pick(S.heroes.filter(x=>x.alive))||t,T={x:cx(v),y:midY(v)};sfx('slash');
    await Promise.all([-1,0,1].map(i=>wait((i+1)*70).then(()=>flyObj(h,{x:T.x+rnd(-10,10),y:T.y+i*24},300,(x,y,r)=>drawDagger(x,y,r,1.6),{spin:-28,arc:30+i*20,trail:['230,235,255'],trailShape:'streak'})).then(()=>{sfx('hit');sparks(T.x,T.y+i*24,['255,255,255','200,210,230'],10,320);v.hurt=.3;shake(5);})));
    hit(u,v,{name:'Lopott tőr',kind:'phys',pow:1.4,elem:'phys',tgt:'enemy'});}
  else{const al=S.heroes.filter(x=>x.alive),xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,x)=>s+midY(x),0)/al.length;sfx('whoosh');
    await flyObj(h,{x:mx,y:my},520,(x,y,r)=>drawBomb(x,y,16,r),{spin:-10,arc:140,trail:['255,180,80','255,240,180']});sfx('boom');flash('255,200,120',.4,.15);shake(16);hitStop(80);bigBoom(mx,my,1.5);
    for(const v of al){toss(v,30,300);hit(u,v,{name:'Lopott tűzbomba',kind:'phys',pow:1.1,elem:'fire',tgt:'enemies',status:['burn',.5,2]});}}
  await wait(300);u.pose='idle';};
if(ESK.snatch)ESK.snatch.desc='Ha a csapatnál van tőr vagy tűzbomba, azt lopja el és visszadobja.';

// Varázsló / Sötét lovag – Sötét hullám: nem vizes; fekete-lila árnyláng és füst söpör végig a földön, karmokkal
A.darkwave=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await castPose(u,'150,70,255',400);sfx('dark');await dimTo(.4,'15,0,30',200);
  const wave=(x,k)=>{for(let i=0;i<5;i++)part({x:x+rnd(-60,60),y:H-rnd(20,200),vx:rnd(-160,-60),vy:-rnd(20,90),drag:.6,life:rnd(.5,.9),size:rnd(16,32),grow:30,rgb:pick(['40,20,60','70,30,100','25,10,40']),add:false,shape:'dsmoke'});
    for(let i=0;i<3;i++)part({x:x+rnd(-50,50),y:H-rnd(30,220),vx:rnd(-120,-40),vy:-rnd(40,120),drag:.5,life:rnd(.3,.6),size:rnd(4,9),rgb:pick(['170,90,255','210,140,255'])});
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,H-120);ctx.scale(1,1.8);glow(0,0,170,'130,50,230',.4);ctx.restore();};
  const p=sweepWave(u,al,wave,1200);for(const t of al){const k=(cx(u)-cx(t))/(cx(u)+160);setTimeout(()=>{if(t.alive){sfx('dark');clawMarks(cx(t),midY(t),Math.max(120,bigOf(t)*.7),rnd(-.5,.5),'170,90,255');t.hurt=.35;hit(u,t,sk);}},k*1200/(S.speed||1));}
  await p;await dimTo(0,null,250);u.pose='idle';};
NOFX.add('darkwave');

// Jégelementál – Jégcsapok: dérfelhőben hatalmas jégcsapok nőnek a hősök fölé, lezuhannak és szétrobbannak
function drawIcicle(x,y,L,a=1){ctx.save();ctx.globalAlpha=a;const g=ctx.createLinearGradient(x-12,0,x+12,0);g.addColorStop(0,'rgba(170,220,255,.95)');g.addColorStop(.4,'rgba(245,252,255,.98)');g.addColorStop(1,'rgba(110,170,230,.95)');ctx.fillStyle=g;ctx.strokeStyle='rgba(30,80,140,.9)';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(x-14,y-L);ctx.lineTo(x+14,y-L);ctx.lineTo(x+6,y-L*.4);ctx.lineTo(x,y);ctx.lineTo(x-5,y-L*.45);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.moveTo(x-8,y-L+4);ctx.lineTo(x-3,y-L+4);ctx.lineTo(x-2,y-L*.3);ctx.closePath();ctx.fill();ctx.restore();}
A.icicles=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await castPose(u,'160,230,255',420);sfx('ice');await dimTo(.3,'0,20,50',200);
  const ic=[];for(const t of al)for(let i=0;i<3;i++)ic.push({t,x:cx(t)+(i-1)*34+rnd(-6,6),L:rnd(90,140),y:-20,top:topY(t)-120-rnd(0,40),st:0,a:1});
  for(const t of al)puffs(cx(t),topY(t)-150,10,['200,230,255','230,245,255'],[20,34],{w:80,h:20,v:20,up:10,l0:1.4,l1:2});
  const fx={on:true};effects.push({update(){return fx.on;},draw(){for(const c of ic)if(c.a>0)drawIcicle(c.x,c.y,c.L*(c.st?1:Math.min(1,(c.y+20)/(c.top+20))),c.a);}});
  await tween(450,k=>{for(const c of ic)c.y=-20+(c.top+20)*easeIO(k);});sfx('ice');for(let i=0;i<20;i++){const c=pick(ic);part({x:c.x,y:c.y-c.L*.5,vx:0,vy:0,life:.4,size:rnd(2,4),rgb:'255,255,255',shape:'star'});}await wait(250);
  await tween(240,k=>{for(const c of ic){c.st=1;c.y=c.top+(c.t.y+c.t.oy-10-c.top)*k*k;}});sfx('glass');sfx('ice');shake(14);hitStop(80);
  for(const c of ic){c.a=0;shardBurst(c.x,c.y,4,'190,230,255',260,.7);}for(const t of al){puffs(cx(t),t.y+t.oy-20,8,['220,240,255','190,220,250'],[16,28],{w:50});groundCrack(cx(t),t.y+t.oy,'170,220,255',100);t.hurt=.4;}
  hitAll(u,al,sk);await wait(400);fx.on=false;await dimTo(0,null,250);u.pose='idle';};
NOFX.add('icicles');

// Lekvárdzsinn – Lekvárhullám: vissza a korábbi (jó) változathoz
ESK.jamwave.anim='esweep';
// Lekvárdzsinn – Ragacsos kéz: óriási, fényes lekvárkéz nyúl ki, megmarkolja és megszorítja a hőst
A.jamHand=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('squish');const o=fp(u,.05,.3),T={x:cx(t),y:midY(t)},S0={k:0,grip:0,on:true,t:0};
  const hand=(x,y,g)=>{ctx.save();ctx.translate(x,y);const R=46*(1+.1*g);const gr=ctx.createRadialGradient(-12,-14,4,0,0,R);gr.addColorStop(0,'#ff7a9a');gr.addColorStop(.6,'#c81e46');gr.addColorStop(1,'#7a0a24');ctx.fillStyle=gr;ctx.strokeStyle='#4a0414';ctx.lineWidth=3;
    for(let i=0;i<4;i++){const a=-1.2+i*.62-g*.5*(i-1.5)/1.5;ctx.save();ctx.rotate(a+Math.PI);ctx.beginPath();ctx.ellipse(R*.9,0,R*.62,R*.2,0,0,6.29);ctx.fill();ctx.stroke();ctx.restore();}
    ctx.beginPath();ctx.ellipse(0,0,R*.75,R*.6,0,0,6.29);ctx.fill();ctx.stroke();ctx.save();ctx.rotate(1.2+g*.8);ctx.beginPath();ctx.ellipse(R*.8,0,R*.5,R*.2,0,0,6.29);ctx.fill();ctx.stroke();ctx.restore();
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.beginPath();ctx.ellipse(-R*.3,-R*.3,R*.25,R*.1,-.6,0,6.29);ctx.fill();ctx.restore();};
  effects.push({update(dt){S0.t+=dt;if(S0.on&&Math.random()<.4){const q=rnd(0,S0.k);part({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,6),rgb:'200,30,70',add:false,shape:'drop'});}return S0.on;},
    draw(){const x=o.x+(T.x-o.x)*S0.k,y=o.y+(T.y-o.y)*S0.k;ctx.save();ctx.lineCap='round';ctx.strokeStyle='#7a0a24';ctx.lineWidth=40;ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.quadraticCurveTo((o.x+x)/2,Math.min(o.y,y)-70,x,y);ctx.stroke();ctx.strokeStyle='#c81e46';ctx.lineWidth=32;ctx.stroke();ctx.strokeStyle='rgba(255,140,170,.6)';ctx.lineWidth=6;ctx.stroke();ctx.restore();hand(x,y,S0.grip);}});
  await tween(320,k=>{S0.k=easeIO(k);});sfx('squish');shake(8);await tween(180,k=>{S0.grip=k;});for(let i=0;i<3;i++){t.hurt=.3;shake(6);sfx('squish');splat(T.x,T.y,['200,30,70','255,120,150'],10,240,'drop');await wait(160);}
  hitStop(70);hit(u,t,sk);await wait(150);await tween(260,k=>{S0.k=1-easeIO(k);S0.grip=1-k;});S0.on=false;u.pose='idle';};
// Lekvárdzsinn – Kívánság: látható hatás – arany lámpás, és minden szövetséges erősebb lesz (Erő+) és gyógyul
ESK.wish={name:'Kívánság',tgt:'self',kind:'buff',anim:'djinnWish'};
A.djinnWish=async(u,ts,sk)=>{u.pose='cast';sfx('holy');const L={x:cx(u),y:topY(u)-60,a:0};
  effects.push({update(){return L.a>0||!L.done;},draw(){if(L.a<=0)return;ctx.save();ctx.globalAlpha=L.a;ctx.globalCompositeOperation='lighter';glow(L.x,L.y,80,'255,220,120',.6);ctx.restore();ctx.save();ctx.globalAlpha=L.a;ctx.translate(L.x,L.y);
    ctx.fillStyle='#e8b830';ctx.strokeStyle='#5a3a08';ctx.lineWidth=2.5;ctx.beginPath();ctx.ellipse(0,0,34,15,0,0,6.29);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(-30,-2);ctx.quadraticCurveTo(-58,-8,-62,-22);ctx.lineTo(-54,-20);ctx.quadraticCurveTo(-46,-8,-28,4);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.arc(36,0,10,-1.4,1.4);ctx.stroke();ctx.beginPath();ctx.ellipse(0,-15,12,6,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.ellipse(-10,-5,12,3,-.2,0,6.29);ctx.fill();ctx.restore();}});
  await tween(300,k=>{L.a=k;});for(let i=0;i<20;i++)part({x:L.x-60,y:L.y-22,vx:rnd(-60,40),vy:-rnd(30,90),life:1,size:rnd(10,18),grow:20,rgb:pick(['255,210,240','230,190,255']),add:false,shape:'smoke'});sfx('dust');await wait(400);
  const al=S.enemies.filter(e=>e.alive);await Promise.all(al.map((e,i)=>wait(i*90).then(()=>flyObj({x:L.x-60,y:L.y-22},{x:cx(e),y:midY(e)},420,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26,'255,220,120',.8);ctx.restore();ctx.fillStyle='#fff2a0';ctx.beginPath();for(let j=0;j<10;j++){const a=j*.628-Math.PI/2,r=j%2?6:15;ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}ctx.fill();},{arc:60,trail:['255,220,120','255,255,200']})).then(()=>{
    sfx('buff');fxSpin(tint('nova','255,120,80')||'nova',cx(e),midY(e),{size:bigOf(e)*1.4,life:.5,s0:.2,s1:1,add:true,out:.3});addStatus(e,'atkUp',1);const g=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*.15));if(g>0){e.hp+=g;popNum(e,g,'heal');}popLabel(e,'KÍVÁNSÁG: ERŐ+','#ffd36a');})));
  updateHUD();L.done=true;await tween(300,k=>{L.a=1-k;});L.a=0;u.pose='idle';};
if(EN_DEF.jamdjinn&&EN_DEF.jamdjinn.skills&&!EN_DEF.jamdjinn.skills.some(s=>s[0]==='wish'))EN_DEF.jamdjinn.skills.push(['wish',1]);

// Koffein-gólem – Dupla presszó: két óriási, habos kávésugár
A.koffJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const os=[fp(u,.06,.4),fp(u,.45,.48)],T={x:cx(t),y:midY(t)},st={k:0,on:true,t:0};
  effects.push({update(dt){st.t+=dt;if(st.on)for(const o of os)for(let i=0;i<5;i++){const q=rnd(0,st.k),x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q;part({x,y,vx:rnd(-80,80),vy:rnd(-80,60),g:500,life:.4,size:rnd(3,7),rgb:pick(['70,40,20','110,65,30','200,150,90']),add:false,shape:'drop'});}return st.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const o of os){const x=o.x+(T.x-o.x)*st.k,y=o.y+(T.y-o.y)*st.k;for(const [w,c] of [[44,'rgba(60,32,14,.8)'],[30,'rgba(110,62,26,.95)'],[12,'rgba(210,160,100,.9)'],[4,'rgba(255,240,210,.8)']]){ctx.strokeStyle=c;ctx.lineWidth=w*(1+.08*Math.sin(st.t*40));ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.lineTo(x,y);ctx.stroke();}
      ctx.fillStyle='rgba(230,200,150,.9)';for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(x+rnd(-14,14),y+rnd(-14,14),rnd(6,12),0,6.29);ctx.fill();}}ctx.restore();}});
  await tween(260,k=>{st.k=k;});const bz=setInterval(()=>sfx('splash'),200);for(let i=0;i<4;i++){shake(7);t.hurt=.3;splat(T.x,T.y,['70,40,20','110,65,30','200,150,90'],12,360,'drop');puffs(T.x,T.y,3,['240,235,230','220,210,200'],[14,24],{up:110});await wait(170);}
  clearInterval(bz);hitStop(80);toss(t,40,320);hit(u,t,sk);await wait(200);st.on=false;u.pose='idle';};
if(ESK.doubleshot){ESK.doubleshot.anim='koffJet';NOFX.add('koffJet');}

// Lampion – Lampionláng: kék lángcsóva tör ki a szájából, és nagy kék tűzgolyóként csapódik be
A.lanternFire=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('fire');const m=fp(u,.5,.62),T={x:cx(t),y:midY(t)};
  const B={r:5};effects.push({update(){if(B.r>0)part({x:m.x+rnd(-B.r,B.r),y:m.y+rnd(-B.r,B.r),vx:rnd(-20,20),vy:-rnd(30,80),life:.4,size:rnd(4,8),rgb:pick(['120,200,255','200,240,255'])});return B.r>0;},draw(){if(B.r>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,B.r*2,'120,200,255',.8);glow(m.x,m.y,B.r,'240,250,255',1);ctx.restore();}}});
  await tween(420,k=>{B.r=5+22*k;});B.r=0;sfx('fire');
  await flyObj(m,T,360,(x,y,r,k)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'90,170,255',.7);glow(x,y,22,'230,245,255',1);ctx.restore();for(let i=0;i<3;i++)part({x:x+rnd(-10,10),y:y+rnd(-10,10),vx:rnd(30,90),vy:rnd(-40,10),life:.35,size:rnd(8,14),grow:20,rgb:pick(['110,190,255','180,225,255']),shape:'smoke',add:true});},{arc:40});
  sfx('fire');flash('170,220,255',.3,.12);shake(10);hitStop(70);soundBlast(T.x,T.y,'120,200,255',170,450);for(let i=0;i<20;i++){const a=rnd(0,6.28),v=rnd(80,300);part({x:T.x,y:T.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,drag:1.4,life:rnd(.4,.8),size:rnd(10,20),grow:30,rgb:pick(['100,180,255','170,220,255','230,245,255']),shape:'smoke',add:true});}
  t.hurt=.35;hit(u,t,sk);await wait(300);u.pose='idle';};
// Lampion – Lidércfény: felragyog, odasuhan a hősökhöz, és végső támadásként felrobban – a lampion végleg megsemmisül
ESK.willolight.name='Lidércrobbanás';ESK.willolight.pow=(ESK.willolight.pow||.8)*1.8;ESK.willolight.desc='Végső támadás: a lampion felrobban, és örökre megsemmisül.';
A.wispRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('fire');popLabel(u,'FELRAGYOG!','#a8dcff');
  const G={a:0};effects.push({update(){return !G.done;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(u),midY(u),u.h*u.scale*(.8+G.a),'120,200,255',.5+.4*G.a);glow(cx(u),midY(u),u.h*u.scale*.4,'240,250,255',.6*G.a);ctx.restore();}});
  for(let i=0;i<3;i++){await tween(220,k=>{G.a=k*(i+1)/3;u.scale0=u.scale0||u.scale;u.scale=u.scale0*(1+.06*Math.sin(k*Math.PI));});sfx('fire');}
  const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,t)=>s+midY(t),0)/al.length,dx=mx-cx(u),dy=my-midY(u);ghosts(u,300);sfx('whoosh');
  await tween(320,k=>{const e=k*k;u.ox=dx*e;u.oy=dy*e;});G.done=true;u.alpha=0;sfx('boom');sfx('fire');flash('190,230,255',.6,.25);shake(22);hitStop(140);
  soundBlast(mx,my,'120,200,255',380,700);for(let i=0;i<60;i++){const a=rnd(0,6.28),v=rnd(100,600);part({x:mx,y:my,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:1.6,life:rnd(.5,1.1),size:rnd(12,26),grow:40,rgb:pick(['100,180,255','170,220,255','230,245,255']),shape:'smoke',add:true});}
  fallDebris(mx,my,14,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle=pick(['#e05a2a','#f08040']);ctx.strokeStyle='#5a1a08';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-8*s,-6*s);ctx.lineTo(9*s,-3*s);ctx.lineTo(5*s,7*s);ctx.lineTo(-6*s,5*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:420});
  for(const t of al){t.hurt=.4;toss(t,30,300);}hitAll(u,al,sk);u.scale=u.scale0||u.scale;u.ox=0;u.oy=0;u.pendingRevive=false;await wait(150);if(u.alive)die(u);u.alpha=0;updateHUD();await wait(500);};
NOFX.add('wispRain');
