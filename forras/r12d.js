
// ===== 12. kör – ellenfelek III. (cukorsivatag, álompalota) =====
// ---- Vattacukor-bárány – Édes álom: valósághű, gyapjas bárányok ugratnak át egy szép, régi fakerítésen
function qSheep(x,y,s,ph,jump,flip){ctx.save();ctx.translate(x,y);ctx.scale(flip?-s:s,s);const leg=jump?0:Math.sin(ph)*.5;
  // lábak (ugrásnál behúzva)
  ctx.strokeStyle='#2a2226';ctx.lineCap='round';ctx.lineWidth=5;for(const [lx,o] of [[-18,0],[-10,1.6],[14,.8],[22,2.4]]){const a=jump?(lx<0?.9:-.9):Math.sin(ph+o)*.5;ctx.beginPath();ctx.moveTo(lx,-14);ctx.lineTo(lx+Math.sin(a)*18,-14+Math.cos(a)*(jump?14:22));ctx.stroke();}
  // gyapjú: sok, árnyalt pamacs
  const W=[[-24,-30,13],[-12,-36,14],[2,-38,14],[16,-35,13],[27,-28,11],[-28,-20,11],[-14,-22,14],[2,-22,15],[18,-20,13],[28,-18,9],[-20,-12,10],[-4,-12,11],[12,-12,10],[-6,-44,9],[10,-45,8]];
  for(const [wx,wy,r] of W){const g=ctx.createRadialGradient(wx-r*.35,wy-r*.4,r*.1,wx,wy,r);g.addColorStop(0,'#fff0f8');g.addColorStop(.55,'#ffc2df');g.addColorStop(1,'#e88ab8');ctx.fillStyle=g;ctx.beginPath();ctx.arc(wx,wy,r,0,6.29);ctx.fill();}
  ctx.fillStyle='rgba(215,170,195,.45)';for(const [wx,wy,r] of W){for(let j=0;j<3;j++){ctx.beginPath();ctx.arc(wx+Math.cos(j*2.1+wx)*r*.5,wy+Math.sin(j*2.1+wy)*r*.5,r*.18,0,6.29);ctx.fill();}}
  // fej: sötét, hosszúkás, fülekkel
  ctx.save();ctx.translate(-34,-34);ctx.rotate(jump?-.25:.1+Math.sin(ph*.5)*.05);const hg=ctx.createLinearGradient(-12,-10,8,12);hg.addColorStop(0,'#4a3c40');hg.addColorStop(1,'#1e1719');ctx.fillStyle=hg;ctx.beginPath();ctx.ellipse(-4,4,10,14,.5,0,6.29);ctx.fill();
  ctx.fillStyle='#2e2427';ctx.beginPath();ctx.ellipse(8,-4,9,4,-.5,0,6.29);ctx.fill();ctx.fillStyle='#e8a4b8';ctx.beginPath();ctx.ellipse(8,-4,5,2,-.5,0,6.29);ctx.fill();
  ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(-3,-2,2.4,0,6.29);ctx.fill();ctx.fillStyle='#000';ctx.beginPath();ctx.arc(-3.6,-2,1.3,0,6.29);ctx.fill();
  ctx.fillStyle='#ffffff';for(const [fx,fy,r] of [[2,-10,6],[-6,-11,5],[8,-8,4]]){ctx.beginPath();ctx.arc(fx,fy,r,0,6.29);ctx.fill();}ctx.restore();
  // farok
  ctx.fillStyle='#fff6fa';ctx.beginPath();ctx.arc(36,-30,6,0,6.29);ctx.fill();ctx.restore();}
drawFence=function(x,gy,w,a){ctx.save();ctx.globalAlpha=a;
  ctx.fillStyle='rgba(0,0,0,.22)';ctx.beginPath();ctx.ellipse(x,gy+4,w/2+40,10,0,0,6.29);ctx.fill();
  const wood=(x0,y0,x1,y1,c0,c1)=>{const g=ctx.createLinearGradient(x0,y0,x1,y1);g.addColorStop(0,c0);g.addColorStop(.5,c1);g.addColorStop(1,c0);return g;};
  const posts=[x-w/2-10,x-w/6,x+w/6,x+w/2+10];
  for(const yy of [gy-30,gy-62]){ctx.fillStyle=wood(0,yy-8,0,yy+8,'#7a4e26','#b07a44');ctx.strokeStyle='#3e2410';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(posts[0],yy-7);ctx.lineTo(posts[3],yy-5);ctx.lineTo(posts[3],yy+7);ctx.lineTo(posts[0],yy+6);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.strokeStyle='rgba(60,34,14,.55)';ctx.lineWidth=1;for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(posts[0]+10+i*30,yy-3+i%2*3);ctx.bezierCurveTo(posts[0]+60+i*20,yy-5,posts[3]-60,yy+2,posts[3]-10-i*25,yy+i%2*3);ctx.stroke();}}
  for(const px of posts){ctx.fillStyle=wood(px-9,0,px+9,0,'#6a4220','#a8743e');ctx.strokeStyle='#3e2410';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px-9,gy);ctx.lineTo(px-8,gy-82);ctx.lineTo(px-2,gy-90);ctx.lineTo(px+8,gy-84);ctx.lineTo(px+9,gy);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.strokeStyle='rgba(50,28,10,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px-3,gy-6);ctx.lineTo(px-4,gy-76);ctx.moveTo(px+3,gy-10);ctx.lineTo(px+2,gy-60);ctx.stroke();ctx.fillStyle='#4a2c12';ctx.beginPath();ctx.arc(px,gy-30,2,0,6.29);ctx.arc(px,gy-62,2,0,6.29);ctx.fill();}
  ctx.strokeStyle='#5f9a3a';ctx.lineWidth=2;for(let i=0;i<22;i++){const gx=x-w/2-30+i*(w+60)/21;ctx.beginPath();ctx.moveTo(gx,gy+2);ctx.quadraticCurveTo(gx+3,gy-8,gx+(i%2?6:-4),gy-14-(i%3)*3);ctx.stroke();}ctx.restore();};
A.sweetDream=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dust');await dimTo(.45,'40,20,60',300);
  const xs=al.map(cx),mx=W*.5,gy=al.reduce((q,t)=>q+t.y+t.oy,0)/al.length+20,FW=150,F={a:0};
  effects.push({update(){return !F.done||F.a>0;},draw(){if(F.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-40,170,'255,190,230',.22*F.a);ctx.restore();drawFence(mx,gy,FW,F.a);}}});
  await tween(350,k=>{F.a=k;});
  const sheep=[];for(let i=0;i<5;i++)sheep.push({d:i*.42,k:0,n:i,ph:rnd(0,6)});let count=0;const st={t:0};
  effects.push({update(dt){st.t+=dt;for(const s of sheep){s.k=Math.max(0,Math.min(1,(st.t-s.d)/1.1));s.ph+=dt*14;}return st.t<sheep.length*.42+1.2;},
    draw(){for(const s of sheep){if(s.k<=0||s.k>=1)continue;const jq=Math.min(1,Math.max(0,(s.k-.3)/.4)),jump=jq>0&&jq<1,x=mx+300-600*s.k,y=gy-Math.sin(jq*Math.PI)*170;if(Math.random()<.35)part({x:x+rnd(-50,50),y:y-rnd(10,80),vx:rnd(-20,20),vy:-rnd(5,25),life:rnd(.6,1),size:rnd(14,24),grow:15,rgb:pick(['255,200,230','255,230,245']),add:false,shape:'puff'});
        ctx.save();ctx.globalAlpha=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(x,gy+2,40,7,0,0,6.29);ctx.fill();ctx.restore();
        ctx.save();ctx.translate(x,y);ctx.rotate(jump?-.35*Math.cos(jq*Math.PI):0);qSheep(0,0,1.7,s.ph,jump,false);ctx.restore();
        if(s.k>.5&&!s.c){s.c=1;count++;sfx('boing');popLabel(pick(al),count+'…','#ffc8ea');}}}});
  await wait(sheep.length*420+1000);sfx('holy');for(const t of al){for(let i=0;i<10;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-50,30),vx:rnd(-15,15),vy:-rnd(20,50),life:1.4,size:rnd(18,28),grow:20,rgb:pick(['255,190,225','240,200,255']),add:false,shape:'puff'});t.hurt=.2;}
  hitAll(u,al,sk);F.done=true;await tween(400,k=>{F.a=1-k;});F.a=0;await dimTo(0,null,250);u.pose='idle';};

// ---- Lekvárdzsinn – Kívánság: TÁMADÁS – „Kívánom, hogy…!”: izzó lekvárosüvegek zuhannak a hősökre és szétrobbannak, a dzsinn ereje pedig megnő (1 körre)
ESK.wish={name:'Kívánság',tgt:'enemies',kind:'mag',pow:.85,elem:'fire',anim:'djinnWish',status:['burn',.35,1],desc:'Teljesíti a saját kívánságát: izzó lekvárosüvegek zuhannak minden hősre (égés), és a dzsinn támadása 1 körre megnő.'};
function qJamJar(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);let g=ctx.createLinearGradient(-16,0,16,0);g.addColorStop(0,'#7a0a12');g.addColorStop(.35,'#e0303a');g.addColorStop(.6,'#b8121e');g.addColorStop(1,'#5a060c');ctx.fillStyle=g;ctx.strokeStyle='#3a0408';ctx.lineWidth=1.6;
  ctx.beginPath();ctx.moveTo(-14,-12);ctx.quadraticCurveTo(-18,-8,-17,6);ctx.quadraticCurveTo(-16,18,0,18);ctx.quadraticCurveTo(16,18,17,6);ctx.quadraticCurveTo(18,-8,14,-12);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.55)';ctx.beginPath();ctx.ellipse(-8,0,3,9,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,140,150,.6)';for(const [a,b] of [[4,4],[-2,10],[8,-4]]){ctx.beginPath();ctx.arc(a,b,2.4,0,6.29);ctx.fill();}
  ctx.fillStyle='#f4e2b8';ctx.strokeStyle='#8a6a3a';ctx.beginPath();ctx.moveTo(-17,-12);ctx.lineTo(17,-12);ctx.lineTo(20,-6);ctx.quadraticCurveTo(0,-2,-20,-6);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#c9a227';ctx.fillRect(-15,-16,30,4);ctx.restore();}
A.djinnWish=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive&&t.kind==='hero');u.pose='cast';sfx('holy');await bodyWind(u,240,.1);popLabel(u,'KÍVÁNOM…!','#ffd36a');
  const st={t:0,on:true};effects.push({update(dt){st.t+=dt;if(st.on)for(let i=0;i<4;i++){const a=rnd(0,6.28),r=rnd(50,170);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r*.6,vx:-Math.cos(a)*90,vy:-Math.sin(a)*60,life:.6,size:rnd(3,6),rgb:pick(['255,220,120','255,120,140','255,255,255']),shape:'star'});}return st.on;},
    draw(){if(!st.on)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(u),midY(u),200,'255,120,90',.25+.1*Math.sin(st.t*12));ctx.restore();}});
  await wait(500);bodyStrike(u,200,-.16);sfx('fire');
  if(al.length){const xs=al.map(cx),x0=Math.min(...xs)-90,x1=Math.max(...xs)+90,jars=[];for(let i=0;i<14;i++){const t=al[i%al.length],onT=i<al.length*3;jars.push({t,tx:onT?cx(t)+rnd(-40,40):rnd(x0,x1),ty:onT?midY(t)+rnd(-20,30):t.y+t.oy-rnd(0,30),d:i*.08+rnd(0,.08)});}
    await Promise.all(jars.map(j=>(async()=>{await wait(j.d*1000);const from={x:j.tx+rnd(80,200),y:-60};await flyObj(from,{x:j.tx,y:j.ty},480,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,44,'255,90,60',.6);ctx.restore();if(Math.random()<.45)part({x:x+rnd(-8,8),y:y-14,vx:rnd(-20,20)+60,vy:-rnd(40,100),life:.28,size:rnd(8,13),grow:15,rgb:'255,140,40',add:false,shape:'fire'});if(Math.random()<.5)part({x,y,vx:rnd(-40,40),vy:rnd(-60,0),life:.4,size:rnd(2,3),rgb:pick(['255,220,140','255,160,170'])});qJamJar(x,y,r,1.6);},{spin:6,ease:true});
      sfx('glass');shake(6);fallDebris(j.tx,j.ty,6,(x,y,r,s)=>{ctx.save();ctx.globalAlpha*=.8;drawShard(x,y,r,s,'rgba(255,200,200,.8)');ctx.restore();},{v:300,life:.6});splat(j.tx,j.ty,['200,20,40','240,60,70','150,10,25'],18,360,'drop');fireBurst(j.tx,j.ty,5,[12,22],170);j.t.hurt=.3;})()));
    soundBlast((x0+x1)/2,al.reduce((q,t)=>q+midY(t),0)/al.length,'255,90,80',300,500);hitAll(u,al,sk);}
  st.on=false;sfx('buff');fxSpin(tint('nova','255,120,80')||'nova',cx(u),midY(u),{size:bigOf(u)*1.5,life:.5,s0:.2,s1:1,add:true,out:.3});addStatus(u,'atkUp',1);popLabel(u,'ERŐ+','#ffd36a');updateHUD();await bodySettle(u);u.pose='idle';};

// ---- Álomlepke – Hímpor: fehér HINTŐPOR – rengeteg finom, puha, fehér púder száll a hősökre minden szárnycsapásnál
A.mothDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dust');const o=fp(u,.5,.45);
  for(let w=0;w<5;w++){await tween(150,k=>{u.sq=1-.14*Math.sin(k*Math.PI);u.jump=Math.sin(k*Math.PI)*18;});sfx('whoosh');
    for(const t of al){for(let i=0;i<70;i++){const life=rnd(.7,1.2);part({x:o.x+rnd(-70,70),y:o.y+rnd(-60,50),vx:(cx(t)+rnd(-70,70)-o.x)/life,vy:(midY(t)+rnd(-80,60)-o.y)/life,drag:.25,life,size:rnd(1,2.6),rgb:pick(['255,255,255','250,250,252','245,242,240'])});}
      for(let i=0;i<6;i++)part({x:o.x+rnd(-40,40),y:o.y+rnd(-40,40),vx:(cx(t)-o.x)/1.1+rnd(-50,50),vy:(midY(t)-o.y)/1.1+rnd(-50,50),drag:.3,life:rnd(1.3,1.8),size:rnd(26,44),grow:55,rgb:pick(['255,255,255','248,248,250','242,240,238']),add:false,shape:'puff'});}}
  u.sq=1;u.jump=0;await wait(700);
  for(const t of al){effects.push({t:0,update(dt){this.t+=dt;if(this.t<1)for(let i=0;i<2;i++)part({x:cx(t)+rnd(-60,60),y:topY(t)+rnd(-20,t.h*t.scale),vx:rnd(-8,8),vy:rnd(10,30),life:1,size:rnd(1,2),rgb:'255,255,255'});return this.t<1.2;},draw(){const a=1-this.t/1.2;ctx.save();ctx.globalAlpha=.55*a;ctx.translate(cx(t),midY(t));ctx.scale(1,1.3);const g=ctx.createRadialGradient(0,0,4,0,0,t.w*t.scale*.75);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,t.w*t.scale*.75,0,6.29);ctx.fill();ctx.restore();}});
    puffs(cx(t),midY(t),10,['255,255,255','246,246,248'],[24,40],{w:60,h:60,shape:'puff'});t.hurt=.25;}
  hitAll(u,al,sk);await wait(300);}finally{rel();}};

// ---- Álomlepke – Holdsugár: a holdsarlóból indul a sugár, és ferdén csap le a hősre
A.moonBeam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{sfx('mirror');await dimTo(.6,'5,8,30',250);const x=cx(t),gy=t.y+t.oy,M={a:0,x:x+190,y:100,R:78};await bodyWind(u,200,.08);
  effects.push({update(){return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;for(let i=0;i<50;i++){const sx=(i*137)%W,sy=(i*71)%300;ctx.fillStyle=`rgba(255,255,255,${.6*(.5+.5*Math.sin(T*4+i))})`;ctx.fillRect(sx,sy,2,2);}ctx.restore();drawMoon(M.x,M.y,M.R,M.a);}});
  await tween(450,k=>{M.a=k;});sfx('holy');const B={k:0,on:true},src={x:M.x-M.R*.55,y:M.y};
  effects.push({update(){if(B.on&&B.k>.2)for(let i=0;i<4;i++){const q=rnd(0,B.k);part({x:src.x+(x-src.x)*q+rnd(-25,25),y:src.y+(gy-src.y)*q,vx:rnd(-10,10),vy:rnd(20,60),life:.6,size:rnd(2,3.5),rgb:pick(['220,230,255','255,255,255']),shape:'star'});}return B.on;},
    draw(){if(B.k<=0)return;const ex=src.x+(x-src.x)*B.k,ey=src.y+(gy-src.y)*B.k,an=Math.atan2(ey-src.y,ex-src.x),L=Math.hypot(ex-src.x,ey-src.y),w0=M.R*1.1,w1=Math.max(110,t.w*t.scale*.9);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(src.x,src.y);ctx.rotate(an);
      for(const [f,al2] of [[1.4,.25],[1,.6],[.45,.9]]){const g=ctx.createLinearGradient(0,-w1*f,0,w1*f);g.addColorStop(0,'rgba(190,210,255,0)');g.addColorStop(.5,`rgba(235,240,255,${al2})`);g.addColorStop(1,'rgba(190,210,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,-w0*f*.5);ctx.lineTo(L,-w1*f*.5);ctx.lineTo(L,w1*f*.5);ctx.lineTo(0,w0*f*.5);ctx.closePath();ctx.fill();}
      ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(src.x,src.y,M.R*1.6,'230,235,255',.6);ctx.translate(ex,gy);ctx.scale(1,.25);glow(0,0,w1*1.5,'220,230,255',.7);ctx.restore();}});
  bodyStrike(u,170,-.12);await tween(300,k=>{B.k=easeIO(k);});await wait(350);shake(14);hitStop(90);flash('230,240,255',.45,.15);sparks(x,midY(t),['200,220,255','255,255,255'],50,520);soundBlast(x,midY(t),'210,225,255',260,500);soundBlast(x,gy-10,'255,255,255',180,380);for(let i=0;i<24;i++)part({x:x+rnd(-60,60),y:gy-rnd(0,t.h*t.scale),vx:rnd(-20,20),vy:-rnd(40,120),life:rnd(.8,1.3),size:rnd(3,6),rgb:pick(['230,240,255','255,255,255']),shape:'star'});t.hurt=.35;hit(u,t,sk);
  await wait(400);await tween(250,k=>{B.k=1-k;});B.on=false;M.done=true;await tween(300,k=>{M.a=1-k;});M.a=0;await dimTo(0,null,250);await bodySettle(u);}finally{rel();}};

// ---- Altató hárfa – Altatódal: a hárfa SAJÁT húrjai pendülnek meg egymás után és rezegnek, belőlük szállnak a hangjegyek
function harpStr(u,i,n){const q=i/(n-1),fu=.4+q*.42,top=.22+.13*Math.pow(q,1.6),bot=.78-q*.36;return [fp(u,fu,top),fp(u,fu,bot)];}
A.harpLullaby=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('string');await dimTo(.4,'30,10,50',250);await bodyWind(u,200,.05);const N=10,str=[];for(let i=0;i<N;i++)str.push({amp:0,ph:rnd(0,6)});const st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;for(const s of str)s.amp*=Math.pow(.18,dt);return st.on;},draw(){ctx.save();ctx.lineCap='round';for(let i=0;i<N;i++){const s=str[i],[a,b]=harpStr(u,i,N),mx=(a.x+b.x)/2,my=(a.y+b.y)/2,L=Math.hypot(b.x-a.x,b.y-a.y),nx=(b.y-a.y)/L,ny=-(b.x-a.x)/L;
      ctx.globalCompositeOperation='lighter';for(const [w,c] of [[9,`rgba(255,160,240,${.35*Math.min(1,s.amp/8)})`],[3,`rgba(255,235,250,${.4+.6*Math.min(1,s.amp/6)})`]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();for(let k=0;k<=16;k++){const q=k/16,off=Math.sin(q*Math.PI)*Math.sin(st.t*55+s.ph)*s.amp*(k%2?1:-1)*.6+Math.sin(q*Math.PI)*Math.sin(st.t*55+s.ph)*s.amp;const x=a.x+(b.x-a.x)*q+nx*off,y=a.y+(b.y-a.y)*q+ny*off;k?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
      if(s.amp>2)glow(mx,my,24+s.amp*3,'255,190,245',.25*Math.min(1,s.amp/8));}ctx.restore();}});
  const notes=[];const pluck=i=>{const s=str[i];s.amp=14;const [a,b]=harpStr(u,i,N);const m={x:(a.x+b.x)/2,y:(a.y+b.y)/2};sfx('string');sparks(m.x,m.y,['255,220,250','255,255,255'],5,160);for(let j=0;j<2;j++)notes.push({o:m,h:pick(al),k:0,dbl:Math.random()<.4,c:pick(['#ffd6ff','#ffe08a','#c8e8ff']),ph:rnd(0,6)});};
  effects.push({update(dt){for(const n of notes)n.k=Math.min(1,n.k+dt*.8);return st.on||notes.some(n=>n.k<1);},draw(){for(const n of notes){if(n.k>=1)continue;const x=n.o.x+(cx(n.h)-n.o.x)*n.k,y=n.o.y+(midY(n.h)-60-n.o.y)*n.k+Math.sin(n.k*10+n.ph)*24;ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);ctx.globalCompositeOperation='lighter';glow(x,y,20,'255,200,250',.4);ctx.restore();ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);qNote(x,y,1.3,n.c,n.dbl);ctx.restore();}}});
  for(let r=0;r<2;r++)for(let i=0;i<N;i++){pluck(r?N-1-i:i);await wait(85);}for(let i=0;i<N;i+=2)pluck(i);await wait(1100);
  for(const h of al)puffs(cx(h),midY(h),10,['230,190,255','255,210,240'],[22,36],{shape:'puff',l0:1.2,l1:1.8});hitAll(u,al,sk);st.on=false;await wait(300);await dimTo(0,null,200);await bodySettle(u);}finally{rel();}};

// ---- Kamilla – Altatófurulya: szép, díszes bambuszfurulya lebeg a FEJE FÖLÖTT, magától szól, belőle szállnak a hangjegyek
function qDizi(x,y,L,ang,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);const h=18;
  const g=ctx.createLinearGradient(0,-h/2,0,h/2);g.addColorStop(0,'#f6e3a0');g.addColorStop(.35,'#e2c066');g.addColorStop(.7,'#b48a32');g.addColorStop(1,'#7a5a1c');ctx.fillStyle=g;ctx.strokeStyle='#4a3410';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.roundRect?ctx.roundRect(-L/2,-h/2,L,h,h/2):ctx.rect(-L/2,-h/2,L,h);ctx.fill();ctx.stroke();
  // bambusz-szárcsomók és piros selyemkötések
  for(const q of [-.38,-.05,.3]){ctx.fillStyle='#8a6420';ctx.fillRect(q*L-2,-h/2,4,h);ctx.fillStyle='rgba(255,240,190,.6)';ctx.fillRect(q*L+2,-h/2+1,1.5,h-2);}
  for(const q of [-.47,.46]){ctx.fillStyle='#c8102e';ctx.fillRect(q*L-5,-h/2-1,10,h+2);ctx.fillStyle='#ffd23a';ctx.fillRect(q*L-5,-1,10,2);}
  // lyukak
  ctx.fillStyle='#2a1a06';ctx.beginPath();ctx.ellipse(-L*.3,-1,4,3,0,0,6.29);ctx.fill();for(let i=0;i<6;i++){ctx.beginPath();ctx.ellipse(L*.02+i*L*.065,-1,2.6,2.2,0,0,6.29);ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(-L/2+8,-h/2+2,L-16,2);
  // bojt
  ctx.strokeStyle='#c8102e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(L*.46,h/2);ctx.quadraticCurveTo(L*.47,h/2+10,L*.45,h/2+16);ctx.stroke();ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.arc(L*.45,h/2+17,3.5,0,6.29);ctx.fill();
  ctx.fillStyle='#c8102e';ctx.beginPath();ctx.moveTo(L*.45-5,h/2+19);ctx.lineTo(L*.45+5,h/2+19);ctx.lineTo(L*.45+7,h/2+40);ctx.lineTo(L*.45-7,h/2+40);ctx.closePath();ctx.fill();ctx.restore();}
{const lb0=A.lullaby;A.lullaby=async(e,ts,sk)=>{if(e.type!=='kamilla')return lb0(e,ts,sk);const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='idle';sfx('holy');await dimTo(.4,'30,10,50',250);
  const F={a:0,on:true,t:0},pos=()=>{const p=fp(e,.4,-.04);return {x:p.x,y:p.y-14+Math.sin(F.t*3)*6};};
  effects.push({update(dt){F.t+=dt;return F.on;},draw(){const p=pos();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,110,'255,230,150',.35*F.a);ctx.restore();qDizi(p.x,p.y,170,-.08+Math.sin(F.t*2)*.05,F.a);}});
  await tween(400,k=>{F.a=k;});
  const notes=[];for(let i=0;i<24;i++)notes.push({h:pick(al),d:i*.075,k:0,dbl:Math.random()<.4,ph:rnd(0,6)});
  effects.push({update(dt){let any=false;const o=pos();for(const n of notes){n.d-=dt;if(n.d>0){any=true;continue;}if(!n.o)n.o={x:o.x-70+rnd(0,120),y:o.y};n.k=Math.min(1,n.k+dt*.7);if(n.k<1)any=true;if(Math.random()<.15&&n.k<1)part({x:n.o.x+(cx(n.h)-n.o.x)*n.k,y:n.o.y+(midY(n.h)-60-n.o.y)*n.k,vx:rnd(-20,20),vy:rnd(10,40),life:1,size:rnd(4,6),rgb:pick(['255,255,245','255,230,120']),add:false,shape:'leaf'});}return any;},
    draw(){for(const n of notes){if(n.d>0||n.k>=1||!n.o)continue;const x=n.o.x+(cx(n.h)-n.o.x)*n.k,y=n.o.y+(midY(n.h)-60-n.o.y)*n.k+Math.sin(n.k*10+n.ph)*22;ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);ctx.globalCompositeOperation='lighter';glow(x,y,18,'255,230,150',.35);ctx.restore();ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);qNote(x,y,1.25,'#fff4c8',n.dbl);ctx.restore();}}});
  const bz=setInterval(()=>sfx('holy'),450);await wait(1300);for(const h of al)puffs(cx(h),midY(h),8,['255,240,200','255,225,170'],[18,30],{l0:1.2,l1:1.8});await wait(600);clearInterval(bz);for(const h of al)hit(e,h,sk);await wait(300);
  await tween(300,k=>{F.a=1-k;});F.on=false;await dimTo(0,null,200);e.pose='idle';};}

// ---- Kamilla – Teaszertartás: a csészéjéből hatalmas, aranyló TEA-CUNAMI emelkedik, és végigsöpör az összes hősön
if(ESK.teaceremony){ESK.teaceremony.tgt='enemies';ESK.teaceremony.pow=.95;}
A.teaCeremony=async(u,ts,sk)=>{const al=S.heroes.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('holy');await bodyWind(u,240,.08);const cup=fp(u,.12,.25);
  // a csésze túlcsordul
  const C={on:true};effects.push({update(){if(C.on){part({x:cup.x+rnd(-10,10),y:cup.y-6,vx:rnd(-60,20),vy:-rnd(60,160),g:500,life:.6,size:rnd(4,7),rgb:pick(['210,150,50','240,190,90']),add:false,shape:'drop'});if(Math.random()<.4)part({x:cup.x,y:cup.y-10,vx:rnd(-20,20),vy:-rnd(30,60),life:.9,size:rnd(12,20),grow:20,rgb:'250,248,240',add:false,shape:'smoke'});}return C.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cup.x,cup.y,60,'255,210,120',.5);ctx.restore();}});
  sfx('splash');await wait(300);bodyStrike(u,200,-.12);C.on=false;
  // egy óriási teáscsésze jelenik meg Kamilla előtt, és kiborul – abból zúdul a cunami
  const BC={x:cx(u)-170,y:H*.34,a:0,r:0,s:5.5,on:true};effects.push({update(){if(BC.r<-.6&&BC.on)for(let i=0;i<6;i++)part({x:BC.x-80+rnd(-20,20),y:BC.y+rnd(-10,30),vx:rnd(-260,-80),vy:rnd(40,200),g:700,life:rnd(.5,.9),size:rnd(5,10),rgb:pick(['210,150,50','240,190,90','255,230,170']),add:false,shape:'drop'});return BC.on;},
    draw(){if(BC.a<=0)return;ctx.save();ctx.globalAlpha=BC.a;ctx.globalCompositeOperation='lighter';glow(BC.x,BC.y,170,'255,220,140',.35*BC.a);ctx.restore();ctx.save();ctx.globalAlpha=BC.a;ctx.translate(BC.x,BC.y);ctx.scale(-1,1);qCupP(0,0,-BC.r,BC.s);ctx.restore();}});
  await tween(450,k=>{BC.a=k;BC.s=3+2.5*eOutBack(k);});sfx('splash');await tween(500,k=>{BC.r=-1.6*easeIO(k);});rumble(1.6,10);sfx('splash');setTimeout(()=>{tween(500,k=>{BC.a=1-k;}).then(()=>{BC.on=false;});},900/(S.speed||1));
  const gy=Math.max(...al.map(t=>t.y+t.oy))+30,WV={x:cx(u)-230,h:0,t:0,on:true};
  effects.push({update(dt){WV.t+=dt;if(WV.on&&WV.h>40){for(let i=0;i<5;i++)part({x:WV.x+rnd(-30,40),y:gy-WV.h*rnd(.8,1.05),vx:rnd(-380,-120),vy:-rnd(60,220),g:600,life:rnd(.4,.8),size:rnd(4,9),rgb:pick(['255,250,235','245,225,170','255,255,255']),add:false,shape:'drop'});
        if(Math.random()<.5)part({x:WV.x+rnd(0,120),y:gy-WV.h*rnd(.3,.9),vx:rnd(-200,-60),vy:rnd(-60,60),life:.9,size:rnd(5,8),rgb:pick(['255,250,235','255,230,120','120,170,60']),add:false,shape:'leaf'});
        if(Math.random()<.6)part({x:WV.x+rnd(20,200),y:gy-WV.h*rnd(.6,1),vx:rnd(-60,0),vy:-rnd(30,80),life:1,size:rnd(20,34),grow:30,rgb:'250,248,242',add:false,shape:'smoke'});}return WV.on;},
    draw(){if(WV.h<=2)return;const x=WV.x,h=WV.h,t=WV.t,back=W+200;ctx.save();
      const body=()=>{ctx.beginPath();ctx.moveTo(back,gy);ctx.lineTo(back,gy-h*.5);for(let i=0;i<=16;i++){const q=i/16,xx=back+(x+30-back)*q;ctx.lineTo(xx,gy-h*(.5+.42*q*q*q)-Math.sin(q*11+t*6)*9*(1-q));}
        ctx.bezierCurveTo(x-10,gy-h*1.04,x-80,gy-h*1.02,x-108,gy-h*.86);ctx.bezierCurveTo(x-112,gy-h*.76,x-84,gy-h*.7,x-66,gy-h*.76);ctx.bezierCurveTo(x-40,gy-h*.62,x-30,gy-h*.32,x-70,gy);ctx.closePath();};
      body();const g=ctx.createLinearGradient(0,gy-h,0,gy);g.addColorStop(0,'rgba(255,214,130,.9)');g.addColorStop(.35,'rgba(214,132,36,.88)');g.addColorStop(1,'rgba(110,52,12,.93)');ctx.fillStyle=g;ctx.fill();
      ctx.save();body();ctx.clip();
      // a hullám belseje: sötétebb „cső” a taraj alatt, fényes csíkok az áttetszőséghez
      const bg=ctx.createRadialGradient(x-40,gy-h*.72,4,x-40,gy-h*.72,h*.35);bg.addColorStop(0,'rgba(80,36,6,.55)');bg.addColorStop(1,'rgba(80,36,6,0)');ctx.fillStyle=bg;ctx.fillRect(x-200,gy-h*1.1,400,h*1.1);
      ctx.globalCompositeOperation='lighter';for(let i=0;i<9;i++){const sx=x+20+i*90+Math.sin(t*2+i)*20;const lg=ctx.createLinearGradient(sx-20,0,sx+20,0);lg.addColorStop(0,'rgba(255,220,150,0)');lg.addColorStop(.5,'rgba(255,220,150,.22)');lg.addColorStop(1,'rgba(255,220,150,0)');ctx.fillStyle=lg;ctx.fillRect(sx-20,gy-h,40,h);}
      ctx.globalCompositeOperation='source-over';ctx.strokeStyle='rgba(255,245,215,.55)';ctx.lineWidth=3;for(let j=0;j<5;j++){ctx.beginPath();for(let i=0;i<=20;i++){const xx=x-20+i*45,yy=gy-h*(.3+j*.12)-Math.sin(i*.8+t*5+j)*6;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.stroke();}
      ctx.restore();
      // habos taraj és a lezúduló hab
      ctx.fillStyle='rgba(255,252,240,.96)';for(let i=0;i<22;i++){const q=i/21;let bx,by;if(q<.6){const k=q/.6;bx=x+30-(138*k);by=gy-h*(.98-.12*k*k);}else{const k=(q-.6)/.4;bx=x-108+42*k;by=gy-h*(.86-.1*k);}ctx.beginPath();ctx.arc(bx+Math.sin(t*9+i)*3,by+Math.cos(t*7+i*2)*3,6+5*Math.sin(i*1.7+t*5)**2,0,6.29);ctx.fill();}
      for(let i=0;i<10;i++){const k=i/9,bx=x-66+(-4)*k+Math.sin(t*8+i)*6,by=gy-h*(.74-.7*k);ctx.globalAlpha=.8*(1-k*.5);ctx.beginPath();ctx.arc(bx-10*Math.sin(k*3),by,5+4*Math.sin(i+t*6)**2,0,6.29);ctx.fill();}ctx.globalAlpha=1;
      // úszó kamillavirágok és tealevelek
      for(let i=0;i<7;i++){const fx=x+40+i*80+Math.sin(t*3+i)*10,fy=gy-h*(.45+.15*Math.sin(i*2+t*2));ctx.fillStyle='#ffffff';for(let p=0;p<8;p++){ctx.beginPath();ctx.ellipse(fx+Math.cos(p*.785)*6,fy+Math.sin(p*.785)*6,5,2.2,p*.785,0,6.29);ctx.fill();}ctx.fillStyle='#f2b51a';ctx.beginPath();ctx.arc(fx,fy,3.5,0,6.29);ctx.fill();}
      ctx.restore();}});
  await tween(500,k=>{WV.h=H*.8*easeIO(k);});const x0=WV.x,done=new Set(),bz=setInterval(()=>sfx('splash'),200);
  await tween(1300,k=>{WV.x=x0-(x0+420)*k;WV.h=H*.8*(1-.2*k);for(const t of al)if(!done.has(t)&&WV.x<cx(t)+30){done.add(t);shake(10);t.hurt=.45;sfx('splash');splat(cx(t),midY(t),['210,150,50','240,190,90'],24,380,'drop');tween(600,q=>{t.ox=-110*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);t.oy=-30*Math.sin(Math.min(1,q*2)*Math.PI);}).then(()=>{t.ox=0;t.oy=0;});hit(u,t,sk);}});
  clearInterval(bz);for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);WV.on=false;WV.h=0;for(const t of al)puffs(cx(t),t.y+t.oy-20,8,['250,248,242','240,236,228'],[24,40],{w:60,up:150});await bodySettle(u);}finally{rel();}};
