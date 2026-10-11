// ===== 23. kör: régi hősök, páros támadások és idézések – a tesztlap kérései szerint =====

// ---- Lidércnyomás: karmolás nincs; két óriási lidérckar nő ki a földből az ellenfél két oldalán, és összepréseli
function r21Arm(x,y,L,rot,fx,a,grip){if(R17I.wraitharm){ctx.save();ctx.globalAlpha*=a;r17Draw(R17I.wraitharm,x,y,L*.55,{anchor:'bottom',rot,fx});ctx.restore();return;}
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(fx?-1:1,1);
  const g=ctx.createLinearGradient(0,0,0,-L);g.addColorStop(0,'rgba(20,0,35,0)');g.addColorStop(.25,'rgba(40,8,70,.95)');g.addColorStop(1,'rgba(90,30,150,.98)');
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-L*.13,0);ctx.bezierCurveTo(-L*.16,-L*.4,-L*.05,-L*.6,-L*.09,-L*.82);ctx.lineTo(L*.09,-L*.86);ctx.bezierCurveTo(L*.06,-L*.6,L*.18,-L*.4,L*.13,0);ctx.closePath();ctx.fill();
  // kéz és hosszú, görbe karmok (befelé hajlanak)
  ctx.translate(0,-L*.84);ctx.fillStyle='rgba(70,20,120,.98)';ctx.beginPath();ctx.ellipse(0,0,L*.12,L*.09,0,0,6.29);ctx.fill();
  for(let i=0;i<4;i++){const ox=-L*.09+i*L*.06,c=L*(.16+.04*(i===1||i===2))*(1-.3*grip);ctx.strokeStyle='rgba(30,0,50,1)';ctx.lineWidth=L*.035;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ox,-L*.04);ctx.quadraticCurveTo(ox+c*.6,-c*.9,ox+c,-c*.4);ctx.stroke();
    ctx.strokeStyle='rgba(230,200,255,.9)';ctx.lineWidth=L*.012;ctx.beginPath();ctx.moveTo(ox+c*.7,-c*.75);ctx.quadraticCurveTo(ox+c*.9,-c*.6,ox+c,-c*.4);ctx.stroke();}
  ctx.globalCompositeOperation='lighter';glow(0,0,L*.25,'170,80,255',.35);ctx.restore();}
A.nightmareGrip=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;await dimTo(.8,'10,0,20',300);await castPose(u,'120,40,180',380);sfx('dark');
  const x=cx(t),gy=t.y+t.oy+8,H=t.h*t.scale,L=Math.max(330,H*1.5),hw=t.w*t.scale*.5+L*.18,M={a:0,k:0,grip:0,sq:0},a0=t.spin||0;
  // sötét hasadék a lábánál, füst
  effects.unshift({update(){return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.translate(x,gy);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,10,0,0,hw*1.6);g.addColorStop(0,`rgba(5,0,12,${.95*M.a})`);g.addColorStop(.6,`rgba(60,15,100,${.6*M.a})`);g.addColorStop(1,'rgba(60,15,100,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,hw*1.6,0,6.29);ctx.fill();ctx.restore();}});
  effects.push({update(){if(!M.done&&Math.random()<.5)part({x:x+rnd(-hw*1.3,hw*1.3),y:gy,vx:rnd(-20,20),vy:-rnd(40,120),life:rnd(.7,1.2),size:rnd(16,30),grow:20,rgb:pick(['40,12,70','70,25,110']),add:false,shape:'dsmoke'});return !M.done||M.a>0;},
    draw(){if(M.a<=0)return;const rise=M.k,LL=L*rise,open=(1-M.grip)*.55,sq=M.sq*hw*.35;
      r21Arm(x-hw+sq,gy,LL,open,false,M.a,M.grip);r21Arm(x+hw-sq,gy,LL,-open,true,M.a,M.grip);}});
  sfx('quake');rumble&&rumble(.8,5);await tween(300,k=>{M.a=k;});popLabel(t,'LIDÉRCNYOMÁS!','#c890ff');
  // a karok kinőnek a földből
  sfx('growl');await tween(520,k=>{M.k=eOutBack(k);});await wait(120);
  // összecsapnak: ráfonódnak, majd háromszor összeszorítják
  sfx('whoosh');await tween(220,k=>{M.grip=k*k;});shake(14);sfx('bite');flash('120,40,180',.3,.1);
  for(let i=0;i<3&&t.alive;i++){sfx('crunch');await tween(170,k=>{M.sq=Math.sin(k*Math.PI);t.spin=Math.acos(1-.22*Math.sin(k*Math.PI));t.hurt=.3;});shake(10+i*4);hitStop(60);
    sparks(x,midY(t),['170,90,255','255,255,255'],14,380);for(let n=0;n<10;n++)part({x:x+rnd(-30,30),y:midY(t)+rnd(-40,40),vx:rnd(-200,200),vy:rnd(-220,40),life:.5,size:rnd(4,8),rgb:'120,40,200',add:true});await wait(70);}
  t.spin=a0;hit(u,t,sk);toss(t,30,300);await wait(250);
  await tween(380,k=>{M.grip=1-k;M.k=1-k*.9;M.a=1-k;});M.done=true;M.a=0;u.pose='idle';await dimTo(0,null,300);};

// ---- Páros támadások (23. kör) ----
// Villámátok: a két hős kezéből lila villámok szállnak fel az égbe; kétszer annyi villám csap le
{const P0=R16P['Villámátok'];R16P['Villámátok']=async(A1,B1,al,sk,p)=>{const cl=R17I.stormskull,bo=R17I.bolt;if(!cl)return P0(A1,B1,al,sk,p);
  await dimTo(.6,'20,10,40',300);await Promise.all([r16Raise(A1,'190,110,255'),r16Raise(B1,'190,110,255')]);const {mx}=grp(al),top={x:mx,y:110};
  const Bm={k:0,on:true};R18E({update(){return Bm.on;},draw(){if(Bm.k<=0)return;for(const h of [A1,B1]){const a=handPos(h),x=a.x+(top.x-a.x)*Bm.k,y=a.y+(top.y-a.y)*Bm.k;if(Math.random()<.8)r16Bolt(a.x,a.y,x,y,'190,110,255',9);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,60,'200,130,255',.9);glow(a.x,a.y,50,'200,130,255',.7);ctx.restore();}}});
  sfx('thunder');await tween(650,k=>{Bm.k=easeIO(k);});
  // a sugarak összeérnek: villanás, és ott születik a felhő
  flash('220,170,255',.45,.15);sfx('boom');shake(10);const Cl={a:0,s:.15,on:true,fl:0,rot:0};
  R18E({update(){Cl.fl=Math.max(0,Cl.fl-.07);Cl.rot+=.004;return Cl.on;},draw(){if(Cl.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(top.x,top.y,260*Cl.s,'150,70,255',.45*Cl.a);ctx.restore();
    r17Draw(cl,top.x,top.y,W*.95*Cl.s,{a:Cl.a,rot:Math.sin(Cl.rot*8)*.02});if(Cl.fl>0)r17Draw(cl,top.x,top.y,W*.95*Cl.s,{a:Cl.fl*.9,add:true});}});
  const sp=setInterval(()=>{for(let i=0;i<3;i++){const a=rnd(0,6.28),r=rnd(80,240)*Cl.s;part({x:top.x+Math.cos(a)*r*1.6,y:top.y+Math.sin(a)*r*.5,vx:-Math.cos(a)*r,vy:-Math.sin(a)*r*.3,life:.5,size:rnd(3,6),rgb:pick(['200,120,255','255,255,255']),shape:'star'});}},40);
  rumble(1.2,6);await tween(800,k=>{Cl.a=Math.min(1,k*1.5);Cl.s=.15+.85*eOutBack(k);Bm.k=1-k;});Bm.on=false;clearInterval(sp);r16Lower(A1);r16Lower(B1);sfx('thunder');await wait(150);
  // festett villámok: a felhő aljából a célpont talpáig; háromszor, egyre nagyobb
  const strike=(t,big)=>{const x0=top.x+rnd(-200,200),y0=top.y+40,x1=cx(t)+rnd(-10,10),y1=t.y+t.oy+6,L=Math.hypot(x1-x0,y1-y0),ang=Math.atan2(x0-x1,y1-y0);const st={t:0};
    R18E({update(dt){st.t+=dt;return st.t<.38;},draw(){const a=st.t<.05?st.t/.05:1-(st.t-.05)/.33,fl=.75+.25*Math.sin(st.t*90);if(bo){const w=L*bo.width/bo.height*(big?1.3:1);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a*fl;ctx.translate(x1,y1);ctx.rotate(ang);ctx.drawImage(bo,-w/2,-L,w,L);ctx.globalAlpha=a*.6;ctx.drawImage(bo,-w/2,-L,w,L);ctx.restore();}else r16Bolt(x0,y0,x1,y1,'190,110,255',14);
      ctx.save();ctx.globalCompositeOperation='lighter';glow(x1,y1-10,(big?150:100)*a,'200,130,255',.8*a);ctx.restore();}});
    Cl.fl=1;sfx('thunder');flash('230,190,255',big?.5:.3,.1);shake(big?20:12);hitStop(big?90:50);t.hurt=.4;sparks(cx(t),midY(t),['220,170,255','255,255,255'],big?40:24,big?620:460);
    for(let i=0;i<(big?10:5);i++)part({x:x1+rnd(-30,30),y:y1-rnd(0,10),vx:rnd(-260,260),vy:rnd(-360,-120),g:900,life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['230,190,255','255,255,255']),shape:'streak'});};
  for(let r=0;r<6;r++){for(const t of al){if(!t.alive)continue;strike(t,r===5);if(r%2)strike(t,false);if(r===5){toss(t,60,420);for(let i=0;i<6;i++)darkFlame({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-30,30),vx:rnd(-30,30),vy:-rnd(60,140),life:.6,size:rnd(16,24)});hit(A1,t,sk);}await wait(r===5?160:70);}await wait(70);}
  await wait(300);await tween(500,k=>{Cl.a=1-k;});Cl.on=false;await dimTo(0,null,300);};}
// Csillagözön: a csillagsárkány csak megjelenik az égen; a lecsapások csillagosabbak (festett csillagok csillagcsóvával, több)
{const P0=R16P['Csillagözön'];R16P['Csillagözön']=async(A1,B1,al,sk,p)=>{const im=R17I.constellation,mt=R17I.meteor;if(!im)return P0(A1,B1,al,sk,p);
  const sc=sceneLayer(()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(6,8,34,.88)');g.addColorStop(1,'rgba(30,20,70,.55)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<130;i++){ctx.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(T*3+i)})`;ctx.fillRect((i*173)%W,(i*67)%330,2,2);}});await sc.show(400);
  await Promise.all([r16Raise(A1,'255,240,180'),r16Raise(B1,'255,240,180')]);const {mx,my}=grp(al);sfx('holy');
  const D={x:mx,y:150,w:W*.85,a:0,rot:0,on:true,trail:[]};
  R18E({update(){D.trail.unshift({x:D.x,y:D.y,w:D.w,rot:D.rot});D.trail.length=Math.min(D.trail.length,7);return D.on;},draw(){if(D.a<=0)return;D.trail.slice(1).forEach((q,i)=>r17Draw(im,q.x,q.y,q.w,{a:D.a*.18*(1-i/7),add:true,rot:q.rot}));
    ctx.save();ctx.globalCompositeOperation='lighter';glow(D.x,D.y,D.w*.4,'255,220,150',.25*D.a);ctx.restore();r17Draw(im,D.x,D.y,D.w,{a:D.a*(.9+.1*Math.sin(T*6)),add:true,rot:D.rot});}});
  // csillagok gyúlnak a kezükből, és összekapcsolódnak a sárkány-csillagképpé
  for(let i=0;i<16;i++){const h=i%2?A1:B1,a=handPos(h);flyObj(a,{x:mx+rnd(-300,300),y:rnd(60,240)},360,(x,y)=>{part({x,y,vx:0,vy:0,life:.35,size:3,rgb:'255,240,200',shape:'star'});},{arc:50});await wait(45);}
  await tween(800,k=>{D.a=k;});r16Lower(A1);r16Lower(B1);sfx('roar');await wait(250);
  // a sárkány csak megjelenik: fenséges, lebeg, felragyog és felordít
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b));sfx('holy');await tween(900,k=>{D.y=150-20*Math.sin(k*Math.PI);D.w=W*(.85+.06*Math.sin(k*Math.PI));});flash('255,240,200',.3,.15);
  // festett csillag-meteorzápor (balról-fentről átlósan)
  const fall=(t,d)=>new Promise(res=>setTimeout(()=>{const sx=cx(t)-rnd(260,420),sy=-60,tx=cx(t)+rnd(-30,30),ty=midY(t)+rnd(-10,20),ang=Math.atan2(ty-sy,tx-sx);sfx('whoosh');
    flyObj({x:sx,y:sy},{x:tx,y:ty},360,(x,y)=>{for(let q=0;q<2;q++)part({x:x+rnd(-14,14),y:y+rnd(-14,14),vx:rnd(-60,20),vy:rnd(-60,10),life:rnd(.4,.8),size:rnd(4,8),rgb:pick(['255,240,200','255,215,120','255,255,255']),shape:'star'});if(R17I.star){const w=150;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,70,'255,220,140',.8);ctx.restore();r17Draw(R17I.star,x,y,w,{rot:T*6});}else if(mt){const w=260;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.rotate(ang-Math.atan2(5.5,10.9));ctx.drawImage(mt,-w*.79,-w*mt.height/mt.width*.77,w,w*mt.height/mt.width);ctx.restore();}
      else{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'255,220,150',.9);glow(x,y,16,'255,255,240',1);ctx.restore();}part({x,y,vx:rnd(-40,40),vy:rnd(-60,0),life:.5,size:rnd(10,16),grow:20,rgb:'255,170,60',add:false,shape:'fire'});},{ease:true})
    .then(()=>{sfx('boom');shake(12);hitStop(40);R18E({t:0,update(dt){this.t+=dt;return this.t<.5;},draw(){const k=this.t/.5;ctx.save();ctx.globalCompositeOperation='lighter';glow(tx,ty,(60+140*k),'255,225,140',.9*(1-k));ctx.restore();if(R17I.star)r17Draw(R17I.star,tx,ty,120+160*k,{a:1-k,rot:k*2,add:true});}});for(let q=0;q<14;q++)part({x:tx,y:ty,vx:rnd(-380,380),vy:rnd(-420,120),drag:1.5,life:rnd(.5,.9),size:rnd(5,10),rgb:pick(['255,240,200','255,215,120']),shape:'star'});sparks(tx,ty,['255,240,200','255,215,120','255,255,255'],26,520);t.hurt=.35;res();});},d));
  const jobs=[];for(let i=0;i<22;i++){const t=xs[i%xs.length];if(t.alive)jobs.push(fall(t,i*85));}await Promise.all(jobs);await tween(400,k=>{D.a=1-k;});D.on=false;
  await wait(300);for(const t of al)if(t.alive)hit(A1,t,sk);await sc.hide(400);};}
// Sárkánynyíl: a tűzsárkány gyorsan suhan végig, nagyobb, és nagyobb robbanásokkal
{const P0=R16P['Sárkánynyíl'];R16P['Sárkánynyíl']=async(A1,B1,al,sk,p)=>{const im=R17I.firedragon;if(!im)return P0(A1,B1,al,sk,p);
  const wiz=A1.type==='wizard'?A1:B1,monk=wiz===A1?B1:A1;await dimTo(.45,'40,15,0',300);await r16Raise(wiz,'255,150,60');
  const ch=setInterval(()=>{const a=handPos(wiz),b=handPos(monk);for(let i=0;i<4;i++){const q=Math.random();part({x:a.x+(b.x-a.x)*q+rnd(-8,8),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*70,vx:(b.x-a.x)*.8,vy:(b.y-a.y)*.8,drag:1.2,life:rnd(.3,.5),size:rnd(10,18),grow:24,rgb:'255,150,40',add:false,shape:'fire'});}},35);
  sfx('fire');monk.pose='attack';const Bw={a:0,on:true};R18E({update(){return Bw.on;},draw(){if(Bw.a<=0)return;const b=handPos(monk);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,90*Bw.a,'255,140,40',.8*Bw.a);glow(b.x,b.y,30*Bw.a,'255,240,200',Bw.a);ctx.restore();}});
  await tween(1000,k=>{Bw.a=k;});clearInterval(ch);r16Lower(wiz);sfx('whoosh');sfx('fire');sfx('roar');rumble(1.6,10);flash('255,170,80',.45,.18);
  const o=handPos(monk);Bw.on=false;const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),y=xs.reduce((s,t)=>s+midY(t),0)/xs.length,D={x:o.x,y:o.y,s:.15,on:true,rot:0},done=new Set(),x1=W+480,burn=[];
  R18E({update(){if(D.on&&Math.random()<.6)part({x:D.x-W*.62*D.s*rnd(.55,.75),y:D.y+rnd(-30,30)*D.s,vx:rnd(-160,-60),vy:rnd(-60,20),drag:1.4,life:rnd(.3,.5),size:rnd(12,20),grow:24,rgb:'255,160,40',add:false,shape:'fire'});return D.on;},
    draw(){if(!D.on)return;const w=W*.8*D.s;ctx.save();ctx.globalCompositeOperation='lighter';glow(D.x,D.y,w*.45,'255,130,30',.4);ctx.restore();r17Draw(im,D.x-w*.25,D.y-10,w,{rot:D.rot});r17Draw(im,D.x-w*.25,D.y-10,w,{add:true,a:.6,rot:D.rot});}});
  // égő földcsík a sárkány útja alatt
  const gy=xs.reduce((s,t)=>s+t.y+t.oy,0)/xs.length,Bn={x0:o.x,x:o.x,a:1,on:true};R18E({update(){if(Bn.on&&Math.random()<.9)part({x:rnd(Bn.x0,Bn.x),y:gy+rnd(-6,8),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.4,.7),size:rnd(14,24),grow:20,rgb:'255,150,40',add:false,shape:'fire'});return Bn.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(Bn.x0,0,Bn.x,0);g.addColorStop(0,'rgba(255,120,30,0)');g.addColorStop(1,`rgba(255,150,40,${.5*Bn.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse((Bn.x0+Bn.x)/2,gy+4,(Bn.x-Bn.x0)/2,16,0,0,6.29);ctx.fill();ctx.restore();}});
  await tween(1300,k=>{const e=k<.1?k/.1*.08:.08+.92*((k-.1)/.9);if(Math.random()<.2)fireBurst(D.x-W*.3*D.s,D.y+rnd(-30,30),2,[14,22],140);D.x=o.x+(x1-o.x)*e;D.y=o.y+(y-o.y)*Math.min(1,k*3)+Math.sin(k*Math.PI*3)*45;D.rot=Math.cos(k*Math.PI*3)*.12;D.s=.15+.85*Math.min(1,k*4);Bn.x=Math.min(W,Math.max(Bn.x,D.x-80));
    for(const t of xs)if(!done.has(t)&&D.x>=cx(t)-40){done.add(t);sfx('fire');sfx('boom');shake(18);hitStop(80);bigBoom(cx(t),midY(t),1.2);fireBurst(cx(t),t.y+t.oy-20,30,[22,38],320);flash('255,150,50',.35,.1);toss(t,70,460);t.hurt=.55;hit(monk,t,sk);}});
  D.on=false;await wait(500);await tween(500,k=>{Bn.a=1-k;});Bn.on=false;for(const t of xs)if(!done.has(t)&&t.alive)hit(monk,t,sk);monk.pose='idle';await dimTo(0,null,300);};}
// Árnyroham: Morgána lilás-fekete füstje bevonja Grogot; az árnyvágás vízszintesen tükrözve
{const P0=R16P['Árnyroham'];R16P['Árnyroham']=async(A1,B1,al,sk,p)=>{const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1,pim=R17I.firepillar,sl=R17I.darkslash;
  await dimTo(.6,'15,5,30',300);await r16Raise(witch,'150,60,240');sfx('dark');
  // lilás-fekete füstfolyam Morgána kezéből Grogra: körülöleli és bevonja
  const Rb={k:0,on:true};R18E({update(){if(Rb.on&&Rb.k<1)for(let n=0;n<5;n++){const h=handPos(witch),q=Math.random()*Rb.k,gx=cx(orc),gyy=midY(orc),x=h.x+(gx-h.x)*q,y=h.y+(gyy-h.y)*q-Math.sin(q*Math.PI)*70;
      part({x:x+rnd(-12,12),y:y+rnd(-12,12),vx:(gx-h.x)*.9+rnd(-30,30),vy:(gyy-h.y)*.9+rnd(-30,30),drag:1.6,life:rnd(.5,.8),size:rnd(18,30),grow:26,rgb:pick(['30,5,50','70,20,120','110,40,170']),add:false,shape:'dsmoke'});}
    if(Rb.on&&Rb.k>.4)for(let n=0;n<4;n++){const an=rnd(0,6.28),r=orc.w*orc.scale*rnd(.3,.6);part({x:cx(orc)+Math.cos(an)*r,y:midY(orc)+rnd(-orc.h*orc.scale*.45,orc.h*orc.scale*.4),vx:-Math.cos(an)*30,vy:-rnd(20,60),life:rnd(.5,.9),size:rnd(20,34),grow:20,rgb:pick(['25,0,45','80,25,140']),add:false,shape:'dsmoke'});}
    return Rb.on;},draw(){}});
  await tween(1000,k=>{Rb.k=easeIO(k);});
  // Grog sötétségbe öltözik: fekete-lila tónus, festett lila lángköpeny
  const Aura={a:0,on:true};orc._r16tint={rgb:'60,10,110',a:0};
  R18E({update(){if(Aura.on&&Aura.a>0&&Math.random()<.5)part({x:cx(orc)+rnd(-50,50),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale*.9),vx:rnd(-20,20),vy:-rnd(40,100),life:rnd(.5,.8),size:rnd(18,30),grow:22,rgb:pick(['25,0,45','80,25,140']),add:false,shape:'dsmoke'});if(Aura.on&&Aura.a>0&&Math.random()<.3)darkFlame({x:cx(orc)+rnd(-50,50),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale*.5),vx:rnd(-30,30),vy:-rnd(80,160),life:.4,size:rnd(10,18)});return Aura.on;},
    draw(){if(Aura.a<=0)return;if(pim)r17Draw(pim,cx(orc),orc.y+orc.oy+14,orc.w*orc.scale*1.7,{anchor:'bottom',add:true,a:Aura.a*(.38+.14*Math.sin(T*14)),sy:.85});ctx.save();ctx.globalCompositeOperation='lighter';
      for(const s of [-1,1])glow(cx(orc)+s*6+12,topY(orc)+orc.h*orc.scale*.16,10,'255,60,200',Aura.a);ctx.restore();}});
  sfx('fire');flash('120,40,220',.35,.15);await tween(500,k=>{Aura.a=k;orc._r16tint.a=.85*k;Rb.k=1-k*.0;});Rb.on=false;r16Lower(witch);orc._r16tint={rgb:'60,10,110',a:.85};
  // felhúzás, aztán egy hatalmas söprés végig az ellenségeken
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length,done=new Set();orc.pose='attack';
  await tween(320,k=>{orc.sq=1-.14*easeIO(k);orc.lean=-.18*k;});sfx('whoosh');sfx('slash');
  const startX=cx(orc),endX=Math.max(...xs.map(cx))+160;const Sw={on:true,x:startX,a:0};const echoes=[],sp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc;
  R18E({update(){for(const e of echoes)e.a-=.05;while(echoes.length&&echoes[0].a<=0)echoes.shift();return Sw.on||echoes.length>0;},draw(){if(sp){const hh=orc.h*orc.scale,ww=hh*sp.width/sp.height;for(const e of echoes){ctx.save();ctx.globalAlpha=e.a*.55;ctx.drawImage(tintSpr(sp,'rgb(90,30,180)',.9),e.x-ww/2,e.y-hh,ww,hh);ctx.restore();}}
    if(Sw.a>0){const L=Sw.x-startX+200;if(sl){r18Img(sl,(startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,Math.max(300,L),{add:true,a:Sw.a,sy:.9,fx:true});r18Img(sl,(startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,Math.max(300,L),{a:Sw.a*.5,sy:.9,fx:true});}
      else{ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(startX,0,Sw.x+80,0);g.addColorStop(0,'rgba(120,40,220,0)');g.addColorStop(1,`rgba(210,140,255,${Sw.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse((startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,L/2,60,0,0,6.29);ctx.fill();ctx.restore();}}}});
  await tween(620,k=>{const e=k*k*(3-2*k);orc.ox=(endX-startX)*e;orc.oy=(gy-orc.y)*Math.min(1,k*3);orc.lean=-.18+.5*k;Sw.x=cx(orc);Sw.a=Math.min(1,k*3);if(Math.random()<.8)echoes.push({x:cx(orc),y:orc.y+orc.oy,a:1});
    for(const t of xs)if(!done.has(t)&&cx(orc)>cx(t)-40){done.add(t);sfx('slash');shake(18);hitStop(70);for(let i=0;i<10;i++)darkFlame({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-80,80),vy:-rnd(60,180),life:.6,size:rnd(18,30)});
      sparks(cx(t),midY(t),['200,120,255','255,240,255'],30,560);toss(t,70,440);t.hurt=.55;hit(orc,t,sk);}});
  sfx('boom');flash('140,60,240',.4,.15);shake(14);await tween(400,k=>{Sw.a=1-k;Aura.a=1-k;orc._r16tint.a=.85*(1-k);});Sw.on=false;Aura.on=false;orc._r16tint=null;
  // vissza a helyére
  await tween(420,k=>{const e=easeIO(k);orc.ox=(endX-startX)*(1-e);orc.oy=(gy-orc.y)*(1-e);orc.jump=Math.sin(k*Math.PI)*70;orc.lean=.32*(1-e);});orc.ox=0;orc.oy=0;orc.jump=0;orc.lean=0;orc.sq=1;orc.pose='idle';
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await dimTo(0,null,300);};}
// Tündérököl: Grog öklén ragyogó aranyököl nő, azzal csap le
{R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const im=R17I.goldburst,fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;await dimTo(.45,'40,30,0',300);
  const fx0=fairy.ox||0,fy0=fairy.oy||0,dxF=cx(orc)-cx(fairy),dyF=topY(orc)-30-midY(fairy);
  await tween(420,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*e;fairy.oy=fy0+dyF*e;});fairy.pose='cast';sfx('holy');
  const dust=setInterval(()=>{for(let i=0;i<6;i++)part({x:cx(fairy)+rnd(-24,24),y:midY(fairy)+10,vx:rnd(-50,50),vy:rnd(60,180),g:120,life:rnd(.8,1.2),size:rnd(2,5),rgb:pick(['255,230,120','255,255,255']),shape:'star'});},35);
  const Au={a:0,on:true};R18E({update(){return Au.on;},draw(){if(Au.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(orc),midY(orc),orc.h*orc.scale*.9,'255,210,90',.45*Au.a);if(im)r17Draw(im,cx(orc),midY(orc),orc.h*orc.scale*2.2,{add:true,a:.35*Au.a*(.8+.2*Math.sin(T*10))});ctx.restore();}});
  orc._r16tint={rgb:'255,210,90',a:0};const s0=orc.scale;await tween(800,k=>{orc._r16tint.a=.6*k;orc.scale=s0*(1+.3*easeIO(k));Au.a=k;});clearInterval(dust);
  await tween(320,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*(1-e);fairy.oy=fy0+dyF*(1-e);});fairy.ox=fx0;fairy.oy=fy0;fairy.pose='idle';
  const t0=al.slice().sort((a,b)=>cx(a)-cx(b))[0],ox0=orc.ox||0,oy0=orc.oy||0,dX=(cx(t0)-t0.w*t0.scale*.5-orc.w*orc.scale*.5-30)-cx(orc),dY=(t0.y+t0.oy)-(orc.y+orc.oy);orc.pose='attack';sfx('whoosh');
  await tween(320,k=>{const e=easeIO(k);orc.ox=ox0+dX*e;orc.oy=oy0+dY*e;orc.jump=Math.sin(k*Math.PI)*30;});orc.jump=0;
  const Fi={a:0,on:true,y:0,s:1};const fist=()=>{const h=handPos(orc);return {x:h.x+20,y:h.y-Fi.y};};
  R18E({update(){if(Fi.on&&Fi.a>0)for(let n=0;n<2;n++){const f=fist();part({x:f.x+rnd(-40,40),y:f.y+rnd(-40,40),vx:rnd(-40,40),vy:rnd(-60,20),life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['255,230,120','255,255,255']),shape:'star'});}return Fi.on;},
    draw(){if(Fi.a<=0)return;const f=fist(),S2=150*Fi.s;ctx.save();ctx.globalCompositeOperation='lighter';glow(f.x,f.y,S2*1.3,'255,210,90',.75*Fi.a);glow(f.x,f.y,S2*.5,'255,250,220',.8*Fi.a);ctx.restore();
      if(R17I.goldfist)r17Draw(R17I.goldfist,f.x,f.y,S2*1.4,{a:Fi.a,rot:-.2});else{ctx.save();ctx.globalAlpha=Fi.a;ctx.translate(f.x,f.y);const g=ctx.createRadialGradient(-S2*.2,-S2*.25,4,0,0,S2*.6);g.addColorStop(0,'#fff6c8');g.addColorStop(.5,'#ffcc33');g.addColorStop(1,'#b07800');ctx.fillStyle=g;ctx.strokeStyle='#7a4a00';ctx.lineWidth=5;
        ctx.beginPath();ctx.roundRect(-S2*.45,-S2*.42,S2*.9,S2*.84,S2*.22);ctx.fill();ctx.stroke();for(let i=0;i<4;i++){ctx.beginPath();ctx.roundRect(-S2*.45+i*S2*.225,-S2*.62,S2*.21,S2*.34,S2*.09);ctx.fill();ctx.stroke();}
        ctx.beginPath();ctx.roundRect(-S2*.62,-S2*.1,S2*.3,S2*.5,S2*.12);ctx.fill();ctx.stroke();ctx.restore();}}});
  sfx('holy');await tween(380,k=>{Fi.a=k;Fi.s=.4+.6*eOutBack(k);});
  await tween(360,k=>{orc.jump=140*Math.sin(k*Math.PI*.5);orc.lean=.2*k;Fi.y=80*k;Fi.s=1+.4*k;});await wait(80);await tween(150,k=>{orc.jump=140*(1-k*k);orc.lean=.2-.55*k;Fi.y=80-160*k;});orc.jump=0;
  const ix=fist().x,{gy}=grp(al);tween(500,k=>{Fi.a=1-k;}).then(()=>{Fi.on=false;});sfx('boom');sfx('boom');sfx('holy');flash('255,240,180',.7,.28);shake(28);rumble(1.2,12);hitStop(160);punch(ix,gy,.1);
  if(im){const B={k:0};R18E({update(dt){B.k+=dt/1.1;return B.k<1;},draw(){r17Draw(im,ix,gy-60,900*(.3+.7*eOutBack(Math.min(1,B.k*1.6))),{add:true,a:1-B.k*B.k});}});}
  for(let i=0;i<30;i++)part({x:ix+rnd(-40,40),y:gy-rnd(0,10),vx:rnd(-380,380),vy:rnd(-560,-180),g:1000,life:rnd(.6,1),size:rnd(4,9),rgb:pick(['150,140,130','110,100,95']),add:false,shape:'rock'});dustWave(ix,gy);
  // a földön gördülő, vastag aranyfény-hullám (kitöltött, nem vékony gyűrű)
  const Wv={k:0,on:true};R18E({update(){return Wv.on;},draw(){if(Wv.k<=0)return;const r=60+700*Wv.k,a=1-Wv.k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(ix,gy+4);ctx.scale(1,.16);
    const g=ctx.createRadialGradient(0,0,r*.55,0,0,r);g.addColorStop(0,'rgba(255,220,120,0)');g.addColorStop(.75,`rgba(255,235,160,${.8*a})`);g.addColorStop(1,'rgba(255,220,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,6.29);ctx.fill();ctx.restore();}});
  tween(700,k=>{Wv.k=k;}).then(()=>{Wv.on=false;});
  for(const t of al.slice().sort((a,b)=>Math.abs(cx(a)-ix)-Math.abs(cx(b)-ix))){if(!t.alive)continue;await wait(110);const x=cx(t),g0=t.y+t.oy;sfx('holy');lightPillar(x,g0,130,.9);
    R18E({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const a=1-this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,g0-40,160*a,'255,230,140',.7*a);ctx.restore();}});
    sparks(x,midY(t),['255,240,180','255,210,90','255,255,255'],34,600);toss(t,90,520);t.hurt=.5;hit(orc,t,sk);}
  await wait(500);Au.on=false;for(const h of S.heroes)if(h.alive)for(let i=0;i<8;i++)part({x:cx(h)+rnd(-30,30),y:topY(h)-rnd(0,40),vx:rnd(-10,10),vy:rnd(40,100),life:1,size:rnd(2,4),rgb:'140,255,170',shape:'star'});
  const cX=orc.ox,cY=orc.oy;await tween(380,k=>{const e=easeIO(k);orc.ox=cX+(ox0-cX)*e;orc.oy=cY+(oy0-cY)*e;orc.jump=Math.sin(k*Math.PI)*50;});orc.ox=ox0;orc.oy=oy0;orc.jump=0;orc.pose='idle';await tween(300,k=>{orc._r16tint.a=.6*(1-k);orc.scale=s0*(1.3-.3*k);});orc.scale=s0;orc._r16tint=null;await dimTo(0,null,300);};}

// ---- Árny-csapat: a felhasználó kérésére vissza a legelső, eredeti változatra (sötétített varázsló-árny, minden hős árnycsapása)
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=sprOf('wizard');sh.h=260;sh.filter='brightness(.3) saturate(2) hue-rotate(230deg)';sh.desc='A hősök árnymásai is lecsapnak: minden élő hős egy erős ütést mér egy ellenségre.';
  sh.run=async(P,S0)=>{for(const h of S.heroes){if(!h.alive)continue;const t=pick(foesAlive());if(!t)break;fxSpin(tint('slash','150,90,255')||'slash',cx(t),midY(t),{size:bigOf(t)*1.2,life:.3,s0:.6,s1:1.1,rot:rnd(-1,1),add:true,in:.01,out:.2});fxImage('dark',cx(t),midY(t),{size:bigOf(t),life:.45});shake(9);hitStop(40);
    hit(h,t,{...ATTACKS[h.type],name:'Árnycsapás',pow:2.6,anim:'midnight'});await wait(260);}await wait(350);};}}

// ---- Tűzlehelet (Espresszó idézés és ellenséges támadás): a láng a SZÁJBÓL indul vékonyan, és csak menet közben hízik meg (eddig a pöttyök már a szájnál óriásiak voltak, és hátrafelé a fejre lógtak)
{const fb3=fireBreath;fireBreath=function(o,ts,dir,o2={}){const n0=effects.length;const r=fb3.apply(this,arguments);
  for(let i=n0;i<effects.length;i++){const e=effects[i];if(!e||!e.update||e.__fb)continue;e.__fb=1;const u0=e.update;e.update=function(dt){const p0=part;
    part=function(q){if(q&&(q.shape==='fire'||q.shape==='smoke')&&Math.hypot((q.x||0)-o.x,(q.y||0)-o.y)<10){q.x+=dir*14;q.size=Math.min(q.size,5);q.grow=Math.min(q.grow||0,48);q.life=(q.life||.6)*1.1;}return p0(q);};
    try{return u0.call(this,dt);}finally{part=p0;}};}
  return r;};}

// ---- Méhraj (Mézkirálynő idézés és ellenséges támadás): a méhek FOLYAMATOSAN áramlanak a királynőtől, hullámzó sorokban ÁTREPÜLNEK az ellenségeken (csípés, szikra), és kirepülnek a képből – sok száz méh
function beeStream(src,ts,dir,dur,onHit){const bees=[],st={on:true,t:0},hitN=new Map();const tgt=()=>pick(ts.filter(t=>t.alive).length?ts.filter(t=>t.alive):ts);
  effects.push({update(dt){st.t+=dt;if(st.t<dur)for(let i=0;i<7;i++){const t=tgt(),ty=midY(t)+rnd(-.45,.45)*t.h*t.scale,sp=rnd(520,900);
        bees.push({x:src.x+rnd(-40,40),y:src.y+rnd(-50,50),t,ty,tx:cx(t)+dir*rnd(-20,40),sp,ph:rnd(0,6.28),amp:rnd(14,46),s:rnd(1.4,2.4),k:0,stung:false,life:0});}
      for(const b of bees){b.life+=dt;const dx=b.tx-b.x,dy=b.ty-b.y;// a célpont felé, aztán tovább, át rajta
        if(!b.stung){const d=Math.hypot(dx,dy)||1;b.vx=dx/d*b.sp;b.vy=dy/d*b.sp;if(d<30){b.stung=true;const t=b.t;if(t.alive){t.hurt=.25;hitN.set(t,(hitN.get(t)||0)+1);if(Math.random()<.25){sfx('needle');part({x:b.x,y:b.y,vx:rnd(-80,80),vy:rnd(-80,30),life:.3,size:rnd(2,4),rgb:pick(['255,220,60','255,255,200'])});}if(Math.random()<.05)shake(3);}}}
        b.x+=b.vx*dt;b.y+=b.vy*dt+Math.sin(b.life*14+b.ph)*b.amp*dt*6;}
      for(let i=bees.length-1;i>=0;i--){const b=bees[i];if(b.x<-60||b.x>W+60||b.y<-60||b.y>H+60)bees.splice(i,1);}
      return st.on||bees.length>0;},
    draw(){for(const b of bees)drawRealBee(b.x,b.y,b.s,st.t*70+b.ph,b.vx<0);}});
  return (async()=>{const bz=setInterval(()=>sfx('buzz'),200);sfx('buzz');await wait(dur*1000);st.on=false;await wait(500);clearInterval(bz);for(const t of ts)if(t.alive)onHit(t);await wait(300);})();}
{const qb=SUMMONS.find(x=>x.id==='queenbee');if(qb)qb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;await beeStream({x:S0.x+40,y:S0.y-(qb.h||280)*.6},fs,1,3,t=>hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]}));};}
A.beeSwarm=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';await beeStream({x:cx(e)-40,y:midY(e)},al,-1,2.6,h=>hit(e,h,sk));e.pose='idle';};

// ---- Koffeines mókus (idézés): nagy lendület – leguggol, kilő, szélörvény és porfelhő húzódik utána, minden ellenségnél porrobbanás-lökéshullám (nem vékony gyűrű), az ellenségek magasra repülnek
{const sq=SUMMONS.find(x=>x.id==='squirrel');if(sq)sq.run=async(P,S0)=>{const x0=S0.x,s0=S0.s||1,foes=foesAlive(),done=new Set(),gy=S0.y;
  // felhúzás: leguggol, a farka megfeszül, por kavarog a lábánál
  sfx('wind');await tween(380,k=>{S0.s=s0*(1-.12*Math.sin(k*Math.PI*.5));S0.rot=-.12*k;if(Math.random()<.6)part({x:S0.x+rnd(-40,20),y:gy-rnd(0,10),vx:rnd(-160,-40),vy:-rnd(20,90),life:.6,size:rnd(14,26),grow:20,rgb:'200,180,150',add:false,shape:'smoke'});});
  sfx('whoosh');sfx('wind');shake(8);puffs&&puffs(S0.x,gy-6,14,['200,180,150','170,150,120'],[24,44],{w:120,up:70});
  const WL=[];const wind=setInterval(()=>sfx('wind'),300);
  // szélcsíkok: hosszú, íves fehér széllökések a mókus nyomában
  R18E({update(){for(const w of WL)w.a-=.03;while(WL.length&&WL[0].a<=0)WL.shift();return S0.run||WL.length>0;},draw(){ctx.save();ctx.lineCap='round';for(const w of WL){ctx.strokeStyle=`rgba(255,255,255,${.55*w.a})`;ctx.lineWidth=w.w;ctx.beginPath();ctx.moveTo(w.x,w.y);ctx.quadraticCurveTo(w.x-w.L*.5,w.y-w.c,w.x-w.L,w.y);ctx.stroke();}ctx.restore();}});
  S0.run=true;
  await tween(700,k=>{const e=k*k*(3-2*k);S0.x=x0+(W+200-x0)*e;S0.rot=.08*Math.sin(k*40);S0.s=s0*1.08;
    for(let i=0;i<3;i++)WL.push({x:S0.x-rnd(20,80),y:gy-rnd(10,170),L:rnd(160,340),c:rnd(-30,30),w:rnd(3,7),a:1});
    for(let i=0;i<4;i++)part({x:S0.x-rnd(20,120),y:gy-rnd(0,30),vx:-rnd(120,320),vy:-rnd(30,140),life:rnd(.6,1),size:rnd(18,34),grow:30,rgb:pick(['200,180,150','180,160,130']),add:false,shape:'smoke'});
    for(const t of foes)if(!done.has(t)&&S0.x>cx(t)-30){done.add(t);sfx('boom');sfx('hit');shake(16);hitStop(60);flash('255,245,220',.25,.08);
      for(let i=0;i<26;i++){const a=rnd(0,6.28),v=rnd(200,520);part({x:cx(t),y:t.y+t.oy-10,vx:Math.cos(a)*v,vy:Math.sin(a)*v*.45-80,drag:2,life:rnd(.5,.9),size:rnd(16,30),grow:30,rgb:pick(['210,190,160','180,160,130']),add:false,shape:'smoke'});}
      for(let i=0;i<10;i++)part({x:cx(t),y:t.y+t.oy-6,vx:rnd(-320,320),vy:-rnd(200,500),g:1000,life:rnd(.5,.9),size:rnd(4,8),rgb:'130,110,90',add:false,shape:'rock'});
      toss(t,120,520);t.hurt=.5;fxImage('slash',cx(t),midY(t),{size:bigOf(t)*.9,life:.25,rot:rnd(-1,1)});hit(P,t,{name:'Mókus',kind:'phys',pow:.9,elem:'phys',tgt:'enemies',anim:'summon'});t.gold=(t.gold||0)*2;}});
  clearInterval(wind);S0.run=false;S0.rot=0;S0.s=s0;
  for(const e of S.enemies)if(!e.alive)e.gold=(e.gold||0)*2;showBanner('Dupla arany!',false);S0.x=-80;await tween(380,k=>{S0.x=-80+(x0+80)*k;});await wait(200);};}

// ---- Villámdenevér (idézés): egész raj villámdenevér rajzik ki, sárga villámívek ugrálnak köztük; körbefonják az ellenségeket, aztán egyszerre lecsapnak, és az égből villámok sújtanak
{const tb=SUMMONS.find(x=>x.id==='tbat');if(tb)tb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const sp=ENEMY_SPR.tbat||ENEMY_SPR['tbat-attack'];const src={x:S0.x+40,y:S0.y-(tb.h||220)*.55};
  await dimTo(.5,'10,10,30',250);sfx('screech');const B=[...Array(22)].map((_,i)=>({x:src.x+rnd(-30,30),y:src.y+rnd(-30,30),t:fs[i%fs.length],ph:rnd(0,6.28),r:rnd(60,140),s:rnd(.28,.42),dive:0})),st={t:0,on:true,ph:0};
  R18E({update(dt){st.t+=dt;for(const b of B){const t=b.t,tx=st.ph===1?cx(t)+rnd(-10,10):cx(t)+Math.cos(st.t*3+b.ph)*b.r,ty=st.ph===1?midY(t):midY(t)-40+Math.sin(st.t*4+b.ph)*b.r*.5,g=Math.min(1,dt*(st.ph===1?12:3));b.vx=(tx-b.x);b.x+=(tx-b.x)*g;b.y+=(ty-b.y)*g;}return st.on;},
    draw(){if(Math.random()<.6){const a=pick(B),b=pick(B);if(Math.hypot(a.x-b.x,a.y-b.y)<260)r16Bolt(a.x,a.y,b.x,b.y,'255,230,90',4);}
      for(const b of B){const h=(sp?sp.height:100)*b.s,w=sp?h*sp.width/sp.height:60;ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,40,'255,230,100',.35);ctx.restore();
        if(sp){ctx.save();ctx.translate(b.x,b.y);ctx.scale(b.vx<0?-1:1,1+.15*Math.sin(st.t*30+b.ph));ctx.drawImage(sp,-w/2,-h/2,w,h);ctx.restore();}}}});
  const bz=setInterval(()=>{sfx('zap');},220);await wait(1300);
  // egyszerre lecsapnak
  st.ph=1;sfx('screech');await wait(220);clearInterval(bz);
  for(const t of fs){if(!t.alive)continue;const x=cx(t),y1=t.y+t.oy+10;for(let k=0;k<3;k++)fxBeam('thunder',x+rnd(-60,60),0,x+rnd(-15,15),y1,{w:150,life:.35});
    sfx('thunder');flash('255,252,200',.45,.1);shake(14);hitStop(60);sparks(x,midY(t),['255,245,150','255,255,255'],30,520);t.hurt=.5;toss(t,50,360);
    hit(P,t,{name:'Villámraj',kind:'mag',pow:1.9,elem:'thunder',tgt:'enemies',anim:'chainbolt',status:['stun',.4,1]});await wait(160);}
  await wait(350);st.on=false;await dimTo(0,null,300);};}

// ---- Cerberus (Sötét alku után az Éjféli rontás): igazi, nagy fekete-lila lángoszlop (festett láng lilára színezve + lángnyelvek), és a három fej EGYSZERRE harap, egymás alatt, olvasható tempóban
r20hFlameColumn=function(x,feet,w,h,a,t,fold=0){if(a<=0)return;const im=R17I.firepillar;const W2=w*1.25*(1-.5*fold),H2=h*1.05;
  ctx.save();ctx.globalCompositeOperation='lighter';glow(x,feet-H2*.35,W2*.8,'150,50,240',.45*a);ctx.restore();
  if(im){const Hh=H2,Ww=W2;for(const L of [{f:'brightness(.12) saturate(.6)',a:.85,s:1.12,op:'source-over'},{f:'saturate(1.7) brightness(1.15)',a:.95,s:1,op:'lighter'},{f:'saturate(1.3) brightness(1.7)',a:.5,s:.6,op:'lighter'}]){
      ctx.save();ctx.globalAlpha=a*L.a;ctx.filter=L.f;ctx.globalCompositeOperation=L.op;const bands=18,bh=Hh/bands;
      for(let i=0;i<bands;i++){const q=1-i/(bands-1),sway=Math.sin(t*8-q*5)*Ww*.07*q,ww=Ww*L.s*(.9+.1*Math.sin(t*5+q*4));ctx.drawImage(im,0,i*im.height/bands,im.width,im.height/bands+1,x+sway-ww/2,feet-Hh+i*bh,ww,bh+1.2);}
      ctx.restore();}}
  if(Math.random()<.9*a)for(let n=0;n<2;n++)darkFlame({x:x+rnd(-W2*.35,W2*.35),y:feet-rnd(0,H2*.3),vx:rnd(-30,30),vy:-rnd(160,320),life:rnd(.5,.8),size:rnd(26,44)});};
A.cerberus=async(u,ts,sk)=>{
  const targets=ts.filter(t=>t.alive).slice().sort((a,b)=>cx(a)-cx(b));if(!targets.length)return;
  u._cerb=false;
  const rel=keepPose(u),im=FX_IMG.cerberus,headImg=R17I.hound,h0=u.h*u.scale*1.42,baseX=cx(u),baseY=u.y+u.oy+8;
  const left=Math.min(...targets.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...targets.map(t=>cx(t)+t.w*t.scale*.5));
  const dir=(left+right)*.5<baseX?-1:1,centerY=targets.reduce((s,t)=>s+midY(t),0)/targets.length;
  let bodyOn=true,flameOn=true,headsOn=false,finalOn=false;
  const C={a:0,s:.18,t:0,lunge:0},F={a:0,fold:0},End={a:0,t:0};
  await dimTo(.8,'9,1,18',240);sfx('dark');
  R20HE({update(dt){C.t+=dt;return bodyOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(baseX+dir*C.lunge,baseY+Math.sin(C.t*9)*2);ctx.scale(-dir,1);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const fw=Math.max(320,u.w*u.scale*3.45),fh=Math.max(430,h0*2.65);
  R20HE({update(){return flameOn;},draw(){r20hFlameColumn(baseX,baseY,fw,fh,F.a,C.t,F.fold);}});
  sfx('fire');sfx('wail');rumble(1.2,9);
  await tween(420,k=>{F.a=easeIO(k);});
  await tween(360,k=>{F.a=1;u.alpha=1-.88*easeIO(k);});u.alpha=0;
  await tween(190,k=>{F.fold=eOutBack(k);});
  flash('170,86,246',.62,.16);sfx('roar');shake(14);
  await tween(620,k=>{C.a=easeIO(k);C.s=.16+.84*eOutBack(k);C.lunge=dir*24*k;F.a=1-.88*easeIO(k);F.fold=1-.5*k;});
  await tween(150,k=>{F.a=.12*(1-k);});flameOn=false;

  const Wd=Math.max(h0*1.68,270),headData=[[.18,.24],[.12,.49],[.22,.72]];
  const bites=headData.map(([px,py],i)=>({img:headImg,x:baseX+dir*h0*(.62-px),y:baseY-h0*(1-py),sx:baseX+dir*h0*(.62-px),sy:centerY+(i-1)*Math.max(58,h0*.2),w:Wd,a:0,open:0,scale:.7,stretch:1,angle:0,active:false,exiting:false,fade:0,smoke:[],smokeClock:0}));
  const damaged=new Set();
  const hitFoe=(t,i)=>{
    if(!t.alive)return;
    const first=!damaged.has(t);damaged.add(t);t.hurt=.5;toss(t,58,400);sfx('bite');shake(9);hitStop(38);
    for(let j=0;j<15;j++)part({x:cx(t)+rnd(-38,38),y:midY(t)+rnd(-28,28),vx:rnd(-240,240),vy:rnd(-270,100),life:.5,size:rnd(3,7),rgb:pick(['175,57,231','241,210,255','15,2,24']),shape:'streak'});
    if(first)hit(u,t,sk);
  };
  const remember=b=>{
    b.smokeClock+=1/60;
    while(b.smokeClock>=.085){
      b.smokeClock-=.085;
      // Egymásba olvadó, különálló gömbök: széles, térbeli füstpamacs,
      // nem a fej mozgásával párhuzamos, vékony csík.
      const x=b.x-dir*b.w*(.28+rnd(0,.12)),y=b.y+b.w*rnd(-.08,.18);
      for(let n=0;n<3;n++)b.smoke.unshift({x:x+dir*b.w*rnd(-.13,.13),y:y+b.w*rnd(-.14,.14),vx:-dir*b.w*rnd(.12,.3),vy:-b.w*rnd(.08,.24),r:b.w*(.11+rnd(0,.07)),t:0,life:.72+rnd(0,.34),seed:rnd(0,Math.PI*2)});
    }
    b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,72);
  };
  R20HE({update(dt){
    for(const b of bites){if(!b.active)continue;if(b.exiting){b.fade+=dt;b.a=Math.max(0,1-b.fade/.22);if(b.fade>=.22)b.active=false;}
      for(const p of b.smoke){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy-=b.w*.07*dt;}b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,72);
    }
    return headsOn||bites.some(b=>b.active);
  },draw(){
    for(const b of bites){if(!b.active||b.a<=0||!b.img)continue;const hh=b.w*b.img.height/b.img.width;
      // Többrétegű, gomolygó füstfelhők a fej mögött; a mozgó, elnyúló
      // középpontok és az eltérő méretű lobok szétbontják a csíkhatást.
      for(let i=b.smoke.length-1;i>=0;i--){const p=b.smoke[i],q=p.t/p.life,fade=(1-q)*.78,r=p.r*(.82+q*.76);ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=fade;
        for(let l=0;l<2;l++){const rr=r*(1-l*.18),angle=p.seed+l*2.1+q*5,ox=Math.sin(angle)*rr*.34,oy=Math.cos(angle*1.37)*rr*.27;
          const g=ctx.createRadialGradient(p.x+ox-rr*.18,p.y+oy-rr*.14,rr*.025,p.x+ox,p.y+oy,rr);g.addColorStop(0,'rgba(4,2,9,.98)');g.addColorStop(.48,'rgba(12,5,20,.9)');g.addColorStop(.76,'rgba(48,14,69,.58)');g.addColorStop(1,'rgba(22,5,34,0)');
          const points=[];for(let j=0;j<9;j++){const a=angle+j*Math.PI*2/9,bulge=.78+.17*Math.sin(p.seed+j*2.31+l)+.08*Math.cos(p.seed*1.7+j*1.43);points.push([p.x+ox+Math.cos(a)*rr*bulge,p.y+oy+Math.sin(a)*rr*bulge*.76]);}
          ctx.fillStyle=g;ctx.beginPath();for(let j=0;j<points.length;j++){const cur=points[j],next=points[(j+1)%points.length],mx=(cur[0]+next[0])*.5,my=(cur[1]+next[1])*.5;if(j===0)ctx.moveTo(mx,my);ctx.quadraticCurveTo(cur[0],cur[1],mx,my);}ctx.closePath();ctx.fill();}
        ctx.restore();
      }
      ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.rotate(b.angle);ctx.scale(-dir*b.stretch,(1+b.open*.12)/b.stretch);
      // A forráskép hátsó, hosszú lila ecsetcsóvája csíknak látszott.
      // A fejet változatlan pixelméretben tartjuk, a mögötte maradó részt a
      // külön animált, fekete-lila gomolyfüst veszi át.
      const cropX=Math.min(60,Math.max(0,b.img.width-1)),cropW=Math.min(b.img.width-cropX,390),cropH=b.img.height;
      ctx.drawImage(b.img,cropX,0,cropW,cropH,-b.w*b.scale*.255,-hh*b.scale*.5,b.w*b.scale*(cropW/b.img.width),hh*b.scale);ctx.restore();
    }
  }});

  const launchHead=async(b,i)=>{
    if(i)await wait(i*60); // a fejek külön pillanatban indulnak, de a füstös kifutásuk átfedhet
    b.active=true;b.exiting=false;b.fade=0;b.smoke=[];b.smokeClock=0;b.x=b.sx;b.y=b.sy;b.a=0;b.scale=.72;b.stretch=1;b.open=.72;
    const headHalf=b.w*.5,start=dir>0?left-headHalf*.5:right+headHalf*.5,finish=dir>0?right+headHalf*.85:left-headHalf*.85;
    sfx('growl');rumble(.3,6);
    await tween(125,k=>{const e=1-Math.pow(1-k,3);b.a=e;b.x=b.sx+(start-b.sx)*e;b.y=b.sy-Math.sin(k*Math.PI)*32;b.scale=.72+.28*e;b.stretch=1+.22*Math.sin(k*Math.PI);b.angle=dir*.035*Math.sin(k*Math.PI);remember(b);});
    flash('171,73,242',.2,.055);sfx('whoosh');
    await tween(640,k=>{
      const e=1-Math.pow(1-k,4),oldX=b.x;b.x=start+(finish-start)*e;b.y=b.sy-Math.sin(k*Math.PI)*28+Math.sin(k*12)*5;
      b.open=.68+.32*Math.sin(k*Math.PI*3);b.scale=1+.06*Math.sin(k*Math.PI);b.stretch=1.13+.23*Math.sin(k*Math.PI);b.angle=dir*(.025+.055*Math.sin(k*Math.PI*2));remember(b);
      for(const t of targets){if(!t.alive)continue;const crossed=dir>0?oldX<cx(t)&&b.x>=cx(t):oldX>cx(t)&&b.x<=cx(t);if(crossed&&Math.abs(b.y-midY(t))<Math.max(78,t.h*t.scale*.86))hitFoe(t,i);}
      C.lunge=dir*Math.sin(k*Math.PI)*33;
    });
    for(const t of targets)if(t.alive)hitFoe(t,i);
    // Nem kell megvárni a fej eltűnését: a következő már indul, ez pedig füstté foszlik.
    b.exiting=true;b.fade=0;b.stretch=1.16;b.angle=dir*.08;
    await wait(120);
  };
  headsOn=true;await Promise.all(bites.map((b,i)=>launchHead(b,i)));
  while(bites.some(b=>b.active))await wait(35);
  headsOn=false;C.lunge=0;
  R20HE({update(dt){End.t+=dt;return finalOn;},draw(){if(End.a<=0)return;r20hFlameColumn(baseX,baseY,fw,fh,End.a,End.t,.25);}});
  finalOn=true;sfx('fire');sfx('wail');sfx('boom');rumble(1.1,8);flash('156,47,230',.4,.16);
  await tween(420,k=>{End.a=eOutBack(k);});
  await tween(390,k=>{const e=easeIO(k);C.a=1-e;C.s=1-.5*e;u.alpha=e;});
  u.alpha=1;bodyOn=false;await bodySettle(u);await tween(520,k=>{End.a=1-easeIO(k);});finalOn=false;await dimTo(0,null,300);rel();
};

// ---- Álomcsillagok: a meglévő éjszaka/holdsarló mellé sok nagy, festett csillag hull csillagcsóvával az ellenségekre, becsapódáskor csillagpor és nagy, lebegő „Zzz”
{const ss0=A.sleepStars;A.sleepStars=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const run=ss0(u,ts,sk);
  if(al.length){await wait(500);const jobs=[];for(let i=0;i<26;i++){const t=al[i%al.length];jobs.push(wait(i*70).then(()=>{const sx=cx(t)-rnd(200,420),sy=-40,tx=cx(t)+rnd(-50,50),ty=midY(t)+rnd(-60,30);if(i%3===0)sfx('whoosh');
      return flyObj({x:sx,y:sy},{x:tx,y:ty},rnd(380,520),(x,y)=>{for(let q=0;q<2;q++)part({x:x+rnd(-10,10),y:y+rnd(-10,10),vx:rnd(-50,10),vy:rnd(-50,0),life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['230,230,255','255,240,200','200,200,255']),shape:'star'});
        ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'200,200,255',.6);ctx.restore();if(R17I.star)r17Draw(R17I.star,x,y,rnd(70,90),{rot:T*5+i});},{ease:true})
      .then(()=>{t.hurt=.2;for(let q=0;q<10;q++)part({x:tx,y:ty,vx:rnd(-220,220),vy:rnd(-220,80),drag:2,life:rnd(.5,.9),size:rnd(4,8),rgb:pick(['230,230,255','255,240,200']),shape:'star'});});}));}
    for(const t of al){const z={t:0};effects.push({update(dt){z.t+=dt;return z.t<2.2;},draw(){const a=Math.min(1,z.t*3)*Math.min(1,(2.2-z.t)*2);ctx.save();ctx.globalAlpha=a;ctx.font='bold 34px serif';ctx.fillStyle='#e8e4ff';ctx.strokeStyle='#3a2a70';ctx.lineWidth=4;
      for(let k=0;k<3;k++){const q=(z.t*.5+k*.33)%1;const x=cx(t)+20+q*60+Math.sin(q*8)*10,y=topY(t)-q*90;ctx.font=`bold ${22+k*10}px serif`;ctx.strokeText('Z',x,y);ctx.fillText('Z',x,y);}ctx.restore();}});}
    await Promise.all(jobs);}
  await run;};}
