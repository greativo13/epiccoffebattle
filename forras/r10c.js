
// =========== 5-8. térkép és a többi kérés ===========
// Tealevél-manó – Levélvágás: hat nagy, éles tealevél pörögve spirálban kering, majd belevág
function qTeaLeaf(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);const g=ctx.createLinearGradient(-20,0,20,0);g.addColorStop(0,'#2f6a1e');g.addColorStop(.5,'#6fbf3f');g.addColorStop(1,'#2f6a1e');ctx.fillStyle=g;ctx.strokeStyle='#173a0c';ctx.lineWidth=1.6;
  ctx.beginPath();ctx.moveTo(-24,0);ctx.quadraticCurveTo(-4,-14,24,0);ctx.quadraticCurveTo(-4,14,-24,0);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='rgba(220,255,190,.8)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(22,0);for(let i=-2;i<=2;i++){ctx.moveTo(i*7,0);ctx.lineTo(i*7+6,-6);ctx.moveTo(i*7,0);ctx.lineTo(i*7+6,6);}ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.7)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-20,-2);ctx.quadraticCurveTo(0,-11,22,-1);ctx.stroke();ctx.restore();}
A.leafCut=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('wind');const o=fp(u,.05,.4),T={x:cx(t),y:midY(t)},L=[];for(let i=0;i<6;i++)L.push({a:i/6*6.283,r:0});const st={t:0,on:true,k:0};
  effects.push({update(dt){st.t+=dt;return st.on;},draw(){for(const l of L){const a=l.a+st.t*9,cx0=o.x+(T.x-o.x)*st.k,cy0=o.y+(T.y-o.y)*st.k,r=(1-st.k)*l.r+10;const x=cx0+Math.cos(a)*r,y=cy0+Math.sin(a)*r*.6;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,16,'160,240,120',.35);ctx.restore();qTeaLeaf(x,y,a*2,1.5);}}});
  await tween(380,k=>{for(const l of L)l.r=70*easeIO(k);});sfx('whoosh');await tween(300,k=>{st.k=k*k;});
  for(let i=0;i<4;i++){sfx('slash');shake(6);t.hurt=.25;for(let j=0;j<6;j++)part({x:T.x+rnd(-30,30),y:T.y+rnd(-30,30),vx:rnd(-200,200),vy:rnd(-200,60),g:300,life:.7,size:rnd(4,7),rgb:pick(['90,170,60','140,210,90']),add:false,shape:'leaf'});
    effects.push({t:0,a:rnd(-.8,.8),update(dt){this.t+=dt;return this.t<.25;},draw(){const k=this.t/.25;ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(200,255,160,${1-k})`;ctx.lineWidth=5*(1-k);ctx.beginPath();ctx.moveTo(T.x-70*Math.cos(this.a),T.y-70*Math.sin(this.a));ctx.lineTo(T.x+70*Math.cos(this.a),T.y+70*Math.sin(this.a));ctx.stroke();ctx.restore();}});await wait(90);}
  hit(u,t,sk);st.on=false;await wait(200);u.pose='idle';};
// Tealevél-manó – Teatüske: fúvócsővel kilőtt mérgezett tüske, ami beleáll a hősbe
A.teaDart=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const o=fp(u,.3,.32),T={x:cx(t),y:midY(t)},an=Math.atan2(T.y-o.y,T.x-o.x);
  const P={on:true};effects.push({update(){return P.on;},draw(){ctx.save();ctx.translate(o.x,o.y);ctx.rotate(an);drawStick(-30,0,30,0,9,['#3a2a10','#9a7a3a','#c8a860']);ctx.restore();}});
  await wait(220);sfx('whoosh');for(let i=0;i<8;i++)part({x:o.x+Math.cos(an)*30,y:o.y+Math.sin(an)*30,vx:Math.cos(an)*rnd(100,200),vy:Math.sin(an)*rnd(100,200)+rnd(-30,30),life:.4,size:rnd(6,10),grow:20,rgb:'230,240,220',add:false,shape:'smoke'});
  await flyObj(o,T,170,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(200,255,170,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-Math.cos(an)*90,y-Math.sin(an)*90);ctx.lineTo(x,y);ctx.stroke();ctx.restore();drawDart(x,y,an,50);});P.on=false;
  sfx('needle');shake(7);hitStop(70);sparks(T.x,T.y,['160,230,100','255,255,255'],12,300);puffs(T.x,T.y,5,['150,220,90','190,240,130'],[10,16]);
  effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.3)part({x:T.x-10,y:T.y,vx:rnd(-10,10),vy:rnd(20,50),life:.5,size:rnd(2,3),rgb:'130,210,70',add:false,shape:'drop'});return this.t<1;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1-this.t)*3);drawDart(T.x-14,T.y,an,46);ctx.restore();}});
  t.hurt=.3;hit(u,t,sk);await wait(300);u.pose='idle';};

// Gőzlidérc / Szamovár – Forrázás: vastag, gőzölgő forróvíz-sugár a szamovár csapjából
A.scaldJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const o=u.type==='samovar'?fp(u,.37,.62):foeFrom(u),T={x:cx(t),y:midY(t)},J={k:0,on:true,t:0};
  const path=q=>({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*60});
  effects.push({update(dt){J.t+=dt;if(J.on){for(let i=0;i<4;i++){const q=rnd(0,J.k),p=path(q);part({x:p.x,y:p.y,vx:rnd(-30,30),vy:-rnd(20,60),drag:.6,life:rnd(.6,1),size:rnd(8,14),grow:30,rgb:'245,248,252',add:false,shape:'smoke'});}for(let i=0;i<3;i++){const p=path(rnd(0,J.k));part({x:p.x,y:p.y,vx:rnd(-50,50),vy:rnd(-30,60),g:500,life:.4,size:rnd(2,4),rgb:pick(['200,235,255','255,255,255']),add:false,shape:'drop'});}}return J.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const [w,c] of [[26,'rgba(150,200,240,.45)'],[15,'rgba(210,238,255,.85)'],[5,'rgba(255,255,255,.95)']]){ctx.strokeStyle=c;ctx.lineWidth=w*(1+.06*Math.sin(J.t*40));ctx.beginPath();for(let i=0;i<=24;i++){const p=path(i/24*J.k);i?ctx.lineTo(p.x,p.y+Math.sin(i+J.t*30)*2):ctx.moveTo(p.x,p.y);}ctx.stroke();}ctx.restore();}});
  await tween(260,k=>{J.k=k;});const bz=setInterval(()=>sfx('splash'),220);for(let i=0;i<3;i++){shake(5);t.hurt=.3;splat(T.x,T.y,['200,235,255','255,255,255'],10,300,'drop');puffs(T.x,T.y,4,['245,245,250','230,235,242'],[16,28],{up:120});await wait(170);}
  clearInterval(bz);hit(u,t,sk);await wait(200);J.on=false;u.pose='idle';};
// Szamovár – Kifutó forrás: a szamovár felforr, és forró víz meg gőz keveréke ömlik a hősökre
A.boilOver=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('splash');const top=fp(u,.55,.08);
  for(let i=0;i<8;i++){shake(3);for(let j=0;j<4;j++)part({x:top.x+rnd(-30,30),y:top.y+rnd(-10,10),vx:rnd(-60,60),vy:-rnd(120,260),g:600,life:.6,size:rnd(3,6),rgb:pick(['200,235,255','255,255,255']),add:false,shape:'drop'});puffs(top.x,top.y,2,['245,245,250'],[14,22],{up:160});await wait(70);}
  sfx('boom');sfx('splash');flash('230,240,255',.3,.12);rumble(.8,8);
  await Promise.all(al.map((t,i)=>wait(i*90).then(()=>new Promise(res=>{const st={t:0};const T={x:cx(t),y:midY(t)};effects.push({update(dt){st.t+=dt;if(st.t<.6){for(let k=0;k<5;k++){const q=Math.random();part({x:top.x+(T.x-top.x)*q,y:top.y+(T.y-top.y)*q-Math.sin(q*Math.PI)*160,vx:rnd(-60,60),vy:rnd(-20,80),g:600,life:.5,size:rnd(3,6),rgb:pick(['150,200,240','200,235,255','255,255,255']),add:false,shape:'drop'});}
        part({x:top.x+(T.x-top.x)*st.t/.6,y:top.y+(T.y-top.y)*st.t/.6-Math.sin(st.t/.6*Math.PI)*160,vx:rnd(-40,40),vy:-rnd(20,60),life:rnd(.8,1.2),size:rnd(14,24),grow:30,rgb:'245,248,252',add:false,shape:'smoke'});}
      if(st.t>.7){res();return false;}return true;},draw(){}});}).then(()=>{sfx('splash');splat(cx(t),midY(t),['150,200,240','200,235,255','255,255,255'],20,320,'drop');puffs(cx(t),midY(t),8,['245,245,250','230,236,244'],[18,30],{up:120});t.hurt=.4;hit(u,t,sk);}))));
  await wait(300);u.pose='idle';};
if(ESK.boilover){ESK.boilover.anim='boilOver';ESK.boilover.elem='water';NOFX.add('boilOver');}

// Kannateknős – Forró öntés: a kanna-páncél csőréből vastag, gőzölgő forró tea ível a hősre
A.hotPour=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const o=fp(u,.93,.24),T={x:cx(t),y:topY(t)+10},st={on:true,t:0};
  const path=q=>({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*170});
  effects.push({update(dt){st.t+=dt;if(st.on){for(let i=0;i<5;i++){const p=path(rnd(0,1));part({x:p.x,y:p.y,vx:rnd(-20,20),vy:rnd(-10,30),life:.25,size:rnd(3,6),rgb:pick(['170,100,40','200,130,60','230,170,90']),add:false,shape:'drop'});}const p=path(rnd(0,1));part({x:p.x,y:p.y,vx:rnd(-20,20),vy:-rnd(20,50),life:rnd(.7,1.1),size:rnd(10,18),grow:25,rgb:'245,245,248',add:false,shape:'smoke'});}return st.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const [w,c] of [[16,'rgba(120,64,22,.85)'],[9,'rgba(190,120,55,.95)'],[3,'rgba(255,220,160,.8)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();for(let i=0;i<=24;i++){const p=path(i/24);i?ctx.lineTo(p.x+Math.sin(i*.8+st.t*25)*1.5,p.y):ctx.moveTo(p.x,p.y);}ctx.stroke();}ctx.restore();}});
  const bz=setInterval(()=>sfx('splash'),240);await wait(700);clearInterval(bz);st.on=false;
  puffs(T.x,T.y+30,12,['245,245,248','230,232,238'],[18,30],{w:40,up:130});splat(cx(t),midY(t),['170,100,40','220,160,80'],24,300,'drop');
  const pool={a:1};effects.push({update(dt){pool.a-=dt*.8;return pool.a>0;},draw(){ctx.save();ctx.globalAlpha=pool.a*.8;ctx.fillStyle='#8a4a1a';ctx.beginPath();ctx.ellipse(cx(t),t.y+t.oy+2,60,12,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,220,160,.5)';ctx.beginPath();ctx.ellipse(cx(t)-15,t.y+t.oy,20,3,0,0,6.29);ctx.fill();ctx.restore();}});
  t.hurt=.35;hit(u,t,sk);await wait(300);u.pose='idle';};

// Tealopó majom – Csészedobás: a kezéből lendíti el, a csészéből kifröccsen a tea, és szilánkokra törik
A.cupThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const h=fp(u,.22,.27),T={x:cx(t),y:midY(t)};u.pose='idle';
  const C={on:true,x:h.x+30,y:h.y+10};effects.push({update(){return C.on;},draw(){drawCup(C.x,C.y,.3,1.4);}});await tween(240,k=>{u.ox=18*easeIO(k);C.x=h.x+18*easeIO(k)+30;});
  u.pose='attack';sfx('whoosh');await tween(80,k=>{u.ox=18*(1-k);});C.on=false;
  await flyObj(h,T,400,(x,y,r)=>drawCup(x,y,r,1.4),{spin:-12,arc:90,trail:['150,90,40','190,130,60'],trailAdd:false,trailShape:'drop'});sfx('glass');shake(7);
  shardBurst?fallDebris(T.x,T.y,12,(x,y,r,s)=>drawShard(x,y,r,s*.9),{v:280}):0;splat(T.x,T.y,['150,90,40','190,130,60'],18,300,'drop');puffs(T.x,T.y,4,['240,240,245'],[12,20]);t.hurt=.3;hit(u,t,sk);await wait(350);u.pose='idle';};

// Bambuszketrec rajzolása után: Öreg Oolong – Sárkányharapás: hatalmas állkapcsok csapódnak össze a hősön
A.dragonBite=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,240,30);u.pose='attack';const x=cx(t)+10,y=midY(t),J={o:.05,on:true,s:1.5};
  effects.push({update(){return J.on;},draw(){qJaw(x,y,J.o,J.s);}});sfx('growl');await tween(220,k=>{J.o=.05+.6*easeIO(k);});
  await tween(90,k=>{J.o=.65*(1-k*k)+.02;});sfx('bite');sfx('hit');shake(14);hitStop(110);flash('255,255,255',.2,.08);sparks(x,y,['255,255,255','200,240,220'],20,380);t.hurt=.4;
  for(let i=0;i<2;i++){await wait(110);shake(6);}hit(u,t,sk);await wait(150);await tween(160,k=>{J.o=.02+.4*k;});J.on=false;await dashBack(u,d);};
if(ESK.dragonbite){ESK.dragonbite.anim='dragonBite';NOFX.add('dragonBite');}
// Öreg Oolong – Ködgyűrű: gomolygó ködkígyó tekeredik a hős köré; elszívja a varázserejét, abból Oolong gyógyul (és elalhat)
ESK.mistcoil.desc='A köd elszívja a hős varázserejét, és Oolong abból gyógyul.';
A.mistCoil=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('wind');const m=fp(u,.27,.38),x=cx(t),y=midY(t),hh=t.h*t.scale;const st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;if(st.on){const k=Math.min(1,st.t/.6);for(let i=0;i<4;i++){const a=st.t*7+i*1.57,r=Math.max(40,t.w*t.scale*.7)*(1.4-k*.5),py=y+hh*.45-((st.t*90+i*40)%hh);const px=m.x+(x+Math.cos(a)*r-m.x)*k;part({x:px,y:m.y+(py-m.y)*k,vx:-Math.sin(a)*40,vy:-10,life:rnd(.7,1.1),size:rnd(14,22),grow:20,rgb:pick(['200,235,225','170,215,205','235,250,245']),add:false,shape:'smoke'});}}return st.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,hh*.7,'170,230,210',.25*Math.min(1,st.t));ctx.restore();}});
  await wait(1100);const take=Math.min(t.mp||0,Math.round((t.maxMp||0)*.3));
  hit(u,t,sk);if(t.alive&&take>0){t.mp-=take;popLabel(t,'-'+take+' MP','#7fc8ff');
    await flyObj({x,y},{x:cx(u),y:midY(u)},500,(px,py)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(px,py,30,'120,200,255',.8);glow(px,py,10,'255,255,255',1);ctx.restore();},{arc:60,trail:['120,200,255','200,240,255']});
    const g=Math.min(u.maxHp-u.hp,Math.round(u.maxHp*.06+take*3));if(g>0){u.hp+=g;popNum(u,g,'heal');}sfx('heal');}updateHUD();st.on=false;await wait(300);u.pose='idle';};
if(ESK.mistcoil){ESK.mistcoil.anim='mistCoil';NOFX.add('mistCoil');}

// Bambusz / Porcelán – Mázpáncél: halvány, a váza mintájával festett vázadarab-fal áll fel előtte
function drawVaseWall(e,a){const x=cx(e)-e.w*e.scale*.75,gy=e.y+e.oy,Hh=e.h*e.scale*.95;ctx.save();ctx.globalAlpha=a;
  for(let r=0;r<5;r++)for(let c=0;c<3;c++){const px=x+(c-1)*30+(r%2)*12,py=gy-12-r*Hh/5,w=34,h=Hh/5-3;ctx.save();ctx.translate(px,py);ctx.rotate(((r*3+c)%3-1)*.06);
    const g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#e8ecf6');g.addColorStop(.5,'#ffffff');g.addColorStop(1,'#c8d0e4');ctx.fillStyle=g;ctx.strokeStyle='#1e3a90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-w/2,-h/2);ctx.lineTo(w/2-4,-h/2+2);ctx.lineTo(w/2,h/2);ctx.lineTo(-w/2+3,h/2-2);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.strokeStyle='#2f5cc0';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(0,0,h*.28,0,6.29);ctx.stroke();for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(Math.cos(i*1.57)*h*.42,Math.sin(i*1.57)*h*.42,4,2,i*1.57,0,6.29);ctx.stroke();}ctx.restore();}ctx.restore();}
A.vaseWall=async(u,ts,sk)=>{u.pose='cast';sfx('glass');const W0={k:0};u._vwall=W0;
  const ps=[];for(let i=0;i<15;i++)ps.push({x:cx(u)+rnd(-30,30),y:u.y+u.oy+rnd(0,10)});
  for(const p of ps)fallDebris(p.x,p.y,1,(x,y,r,s)=>drawShard(x,y,r,s*1.2),{v:200,life:.5});
  await tween(500,k=>{W0.k=k;});sfx('shield');hit(u,u,sk);await wait(300);u.pose='idle';};
{const deV=drawEntity;drawEntity=function(e){deV(e);if(e._vwall&&e.alive){const on=(e.st&&e.st.defUp||e._vwall.k<1)&&!S.over;e._vwall.a=on?Math.min(1,(e._vwall.a||0)+.05):Math.max(0,(e._vwall.a||0)-.05);if(e._vwall.a>0)drawVaseWall(e,.6*e._vwall.a*Math.min(1,e._vwall.k));else if(!on)e._vwall=null;}};}
if(ESK.vaseguard){ESK.vaseguard.anim='vaseWall';NOFX.add('vaseWall');}

// Teáskészlet – Tányérvihar: tucatnyi tányér kering körülötte, majd viharként zúdul a hősökre
A.plateStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('wind');const c0={x:cx(u),y:midY(u)},P=[];for(let i=0;i<18;i++)P.push({a:i/18*6.283,r:rnd(90,140),t:al[i%al.length],k:0,d:i*.04,x:0,y:0,done:false});const st={t:0,on:true,go:false};
  effects.push({update(dt){st.t+=dt;for(const p of P){if(!st.go){p.x=c0.x+Math.cos(p.a+st.t*5)*p.r;p.y=c0.y+Math.sin(p.a+st.t*5)*p.r*.45;}else{p.k=Math.min(1,p.k+dt/(.42));if(p.k>=0&&p.k<1){p.x+=(cx(p.t)-p.x)*p.k*.35;p.y+=(midY(p.t)-p.y)*p.k*.35;}}}return st.on;},
    draw(){for(const p of P)if(!p.done)drawPlate(p.x,p.y,st.t*12+p.a,1.5);}});
  const bz=setInterval(()=>sfx('whoosh'),250);await wait(800);clearInterval(bz);st.go=true;
  for(const p of P){await wait(35);p.k=-.01;}await wait(250);
  for(const p of P){p.done=true;fallDebris(cx(p.t),midY(p.t),3,(x,y,r,s)=>drawShard(x,y,r,s*.9),{v:240,life:.6});}sfx('glass');sfx('glass');shake(12);for(const t of al){t.hurt=.4;sparks(cx(t),midY(t),['245,248,255','90,130,220'],14,360);}
  hitAll(u,al,sk);st.on=false;await wait(250);u.pose='idle';};
// Teáskészlet – Kannazúzás: igazi porcelán teáskanna zuhan a hősre és összetörik
A.potCrush=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const x=cx(t),gy=t.y+t.oy,P={y:-200,a:1,r:.3};
  effects.push({update(){return P.a>0;},draw(){ctx.save();ctx.globalAlpha=P.a;ctx.globalCompositeOperation='lighter';glow(x,P.y,80,'200,220,255',.2);ctx.restore();ctx.save();ctx.globalAlpha=P.a;qTeapot(x,P.y,1.5,P.r);ctx.restore();}});
  await tween(460,k=>{P.y=-200+(gy-70+200)*k*k;P.r=.3-.3*k;});sfx('rock');sfx('glass');shake(18);hitStop(110);flash('240,245,255',.3,.1);
  fallDebris(x,gy-40,22,(px,py,r,s)=>drawShard(px,py,r,s*1.5),{v:380,w:60});splat(x,gy-30,['150,90,40','190,130,60'],24,380,'drop');puffs(x,gy-20,8,['240,240,245','225,228,235'],[18,30],{w:60,up:130});toss(t,30,280);hit(u,t,sk);P.a=0;await wait(300);u.pose='idle';};
// Teáskészlet – Teaözön helyett: Porcelánroham – a csészekatonák serege végigrohan a hősökön (mint az idézésnél)
ESK.teaflood={name:'Porcelánroham',tgt:'enemies',kind:'phys',pow:.85,elem:'phys',anim:'cupArmy'};
A.cupArmy=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const cup=ENEMY_SPR.cupsoldier;const army=[];for(let i=0;i<9;i++)army.push({x:W+120+i*80,y:H*.55+((i%3)-1)*55+20});sfx('slash');
  const st={t:0,on:true};effects.push({update(dt){st.t+=dt;return st.on;},draw(){if(!cup)return;for(const s of army){const hh=140,w=hh*cup.width/cup.height;ctx.save();ctx.translate(s.x,s.y-Math.abs(Math.sin(st.t*12+s.x*.05))*12);ctx.drawImage(cup,-w/2,-hh/2,w,hh);ctx.restore();}}});
  const done=new Set();await tween(1700,k=>{army.forEach((s,i)=>{s.x=W+120+i*80-(W+900)*k;if(Math.random()<.2)part({x:s.x,y:s.y+60,vx:rnd(40,120),vy:-rnd(10,40),life:.6,size:rnd(8,14),rgb:'200,190,170',add:false,shape:'smoke'});});
    for(const t of al)if(!done.has(t)&&army[0].x<cx(t)){done.add(t);sfx('glass');sparks(cx(t),midY(t),['245,248,255','90,130,220'],22,480);shake(8);toss(t,30,300);if(t.alive)hit(u,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);st.on=false;u.pose='idle';};
NOFX.add('cupArmy');

// Porcelán mandarin – Tusátok: óriás ecset fekete tusvonásokat fest a hősök fölé, a tus rájuk csorog és megátkozza őket
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;u.pose='cast';sfx('dark');await dimTo(.35,'20,15,10',200);const xs=al.map(cx),x0=Math.min(...xs)-90,x1=Math.max(...xs)+90,y0=al.reduce((q,t)=>q+midY(t),0)/al.length-40;
  const strokes=[{a:{x:x0,y:y0},b:{x:x1,y:y0+20},w:34},{a:{x:x0+40,y:y0-50},b:{x:x0+90,y:y0+60},w:24},{a:{x:x1-60,y:y0-40},b:{x:x1-120,y:y0+70},w:24},{a:{x:(x0+x1)/2,y:y0-60},b:{x:(x0+x1)/2+10,y:y0+90},w:28}];const st={k:0,on:true};
  effects.push({update(){return st.on;},draw(){ctx.save();strokes.forEach((s,i)=>{const k=Math.max(0,Math.min(1,st.k*strokes.length-i));if(k<=0)return;const n=Math.max(2,Math.round(40*k));let bx=s.a.x,by=s.a.y;
      for(let j=0;j<=n;j++){const q=j/40,x=s.a.x+(s.b.x-s.a.x)*q,y=s.a.y+(s.b.y-s.a.y)*q-Math.sin(q*Math.PI)*14,r=s.w*.5*Math.pow(Math.sin(Math.min(1,q*1.15+.05)*Math.PI),.45)*(1+.12*Math.sin(j*1.3));ctx.fillStyle='rgba(12,8,14,.9)';ctx.beginPath();ctx.ellipse(x,y,r*1.15,r,Math.atan2(s.b.y-s.a.y,s.b.x-s.a.x),0,6.29);ctx.fill();bx=x;by=y;}
      ctx.strokeStyle='rgba(12,8,14,.6)';ctx.lineWidth=1.5;for(let d=-2;d<=2;d++){ctx.beginPath();ctx.moveTo(s.a.x,s.a.y+d*s.w*.18);ctx.lineTo(s.a.x+(bx-s.a.x)*.15,s.a.y+(by-s.a.y)*.15+d*s.w*.22);ctx.stroke();}
      if(k<1){ctx.save();ctx.translate(bx,by);ctx.rotate(-.7);ctx.fillStyle='#6a3a1a';ctx.fillRect(-5,-110,10,86);ctx.fillStyle='#c8a050';ctx.fillRect(-7,-30,14,12);ctx.fillStyle='#111';ctx.beginPath();ctx.moveTo(-10,-20);ctx.quadraticCurveTo(0,18,10,-20);ctx.fill();ctx.restore();}});ctx.restore();}});
  const bz=setInterval(()=>sfx('whoosh'),220);await tween(1100,k=>{st.k=k;if(Math.random()<.5)part({x:rnd(x0,x1),y:y0+rnd(-20,20),vx:rnd(-30,30),vy:rnd(20,60),g:500,life:.8,size:rnd(3,6),rgb:'15,10,20',add:false,shape:'drop'});});clearInterval(bz);
  sfx('squish');for(const t of al){splat(cx(t),topY(t),['15,10,20','40,30,50'],22,240,'drop');puffs(cx(t),midY(t),6,['40,25,55','25,15,35'],[16,26],{shape:'dsmoke'});t.hurt=.35;}hitAll(u,al,sk);
  await wait(350);st.on=false;await dimTo(0,null,250);u.pose='idle';};
// Obszidián lovag – Olvadt kard: izzó, lávát csöpögő penge, tűzív a vágásnál
A.moltenBlade=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';const G={a:0,on:true};
  effects.push({update(){if(G.on&&Math.random()<.8){const b=fp(u,.1,.85);part({x:b.x+rnd(-20,30),y:b.y+rnd(-30,10),vx:rnd(-20,20),vy:rnd(40,120),g:400,life:.6,size:rnd(3,6),rgb:pick(['255,140,40','255,200,80']),add:true,shape:'drop'});}return G.on;},draw(){const b=fp(u,.1,.85);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x+20,b.y-20,80*G.a,'255,120,30',.7);ctx.restore();}});
  sfx('fire');await tween(420,k=>{G.a=k;});const d=await dashTo(u,t,200,10);u.pose='attack';sfx('slash');sfx('fire');
  const x=cx(t),y=midY(t),arc={k:0};effects.push({update(dt){arc.k+=dt/.35;if(arc.k<1)for(let i=0;i<5;i++){const a=-2.4+2.8*arc.k+rnd(-.2,.2),r=rnd(70,100);part({x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,vx:rnd(-40,40),vy:-rnd(20,80),drag:1,life:rnd(.4,.7),size:rnd(10,18),grow:30,rgb:'255,150,40',add:false,shape:'fire'});}return arc.k<1.3;},
    draw(){const k=Math.min(1,arc.k);ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(const [w,c] of [[30,'rgba(255,90,20,.4)'],[14,'rgba(255,180,60,.8)'],[4,'rgba(255,250,220,1)']]){ctx.strokeStyle=c;ctx.lineWidth=w*(1-Math.max(0,arc.k-1)*3);ctx.beginPath();ctx.arc(x,y,90,-2.4,-2.4+2.8*k);ctx.stroke();}ctx.restore();}});
  await wait(200);shake(14);hitStop(90);flash('255,160,60',.3,.1);fireBurst(x,y,16,[14,26],240);sparks(x,y,['255,200,90','255,255,200'],22,460);toss(t,34,300);hit(u,t,sk);G.on=false;await wait(250);await dashBack(u,d);};
if(ESK.moltenblade){ESK.moltenblade.anim='moltenBlade';NOFX.add('moltenBlade');}
// Obszidián lovag – Obszidiánfal: középen kitör egy lávás kőfal, és rászakad a hősökre
ESK.obswall={name:'Obszidiánfal',tgt:'enemies',kind:'phys',pow:.95,elem:'fire',anim:'obsWall',status:['burn',.35,2]};
A.obsWall=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';sfx('rock');rumble(1.4,10);const hx=Math.max(...al.map(cx)),bx=(hx+cx(u))/2,gy=H*.8,HH=Math.max(300,bx-Math.min(...al.map(cx))+60);
  groundCrack(bx,gy,'255,120,30',180);for(let i=0;i<20;i++)part({x:bx+rnd(-40,40),y:gy,vx:rnd(-100,100),vy:-rnd(150,350),g:700,life:.8,size:rnd(3,6),rgb:'60,40,40',add:false,shape:'rock'});
  const Wl={h:0,rot:0,on:true,a:1};
  effects.push({update(){if(Wl.on&&Math.random()<.5){part({x:bx,y:gy-rnd(0,Wl.h*HH),vx:rnd(-30,30),vy:rnd(20,80),g:300,life:.5,size:rnd(3,5),rgb:pick(['255,140,40','255,200,90']),shape:'drop'});}return Wl.on;},
    draw(){ctx.save();ctx.globalAlpha=Wl.a;ctx.translate(bx,gy);ctx.rotate(Wl.rot);const h=Wl.h*HH;const g=ctx.createLinearGradient(-30,0,30,0);g.addColorStop(0,'#1a1418');g.addColorStop(.5,'#3a3038');g.addColorStop(1,'#120e10');ctx.fillStyle=g;ctx.strokeStyle='#050405';ctx.lineWidth=3;
      ctx.beginPath();ctx.moveTo(-46,0);for(let i=0;i<=6;i++)ctx.lineTo(-46+i*(92/6),-h+(i%2?-14:6));ctx.lineTo(46,0);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.strokeStyle='rgba(255,130,30,.95)';ctx.lineWidth=3;ctx.shadowColor='rgba(255,120,30,.9)';ctx.shadowBlur=10;for(let i=0;i<5;i++){ctx.beginPath();let yy=-h*(i+.5)/5;ctx.moveTo(-30,yy);ctx.lineTo(-8,yy+rnd(-2,2)+6);ctx.lineTo(10,yy-6);ctx.lineTo(30,yy+4);ctx.stroke();}ctx.restore();
      ctx.save();ctx.globalAlpha=Wl.a;ctx.globalCompositeOperation='lighter';glow(bx,gy,140,'255,110,30',.35*Wl.a);ctx.restore();}});
  const bz=setInterval(()=>sfx('rock'),180);await tween(520,k=>{Wl.h=easeIO(k);});clearInterval(bz);shake(10);await wait(350);sfx('whoosh');
  // rádől a hősökre: a fal a talpa körül balra billen
  await tween(380,k=>{Wl.rot=-k*k*1.45;});sfx('boom');sfx('rock');shake(24);hitStop(140);flash('255,150,60',.4,.15);Wl.a=.0;
  for(const t of al){fallDebris(cx(t),t.y+t.oy-30,10,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#2a2028';ctx.strokeStyle='#ff8a2a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-9*s,-7*s);ctx.lineTo(8*s,-5*s);ctx.lineTo(10*s,6*s);ctx.lineTo(-7*s,8*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:340});
    fireBurst(cx(t),t.y+t.oy-30,8,[12,22],200);puffs(cx(t),t.y+t.oy-20,8,['70,60,60','100,90,88'],[20,34],{shape:'dsmoke',w:60});groundCrack(cx(t),t.y+t.oy,'255,120,30',100);toss(t,30,300);}
  hitAll(u,al,sk);Wl.on=false;await wait(400);u.pose='idle';};
NOFX.add('obsWall');

// Párnalovag – Párnacsapás: hatalmas párnával a feje fölül lecsap, rengeteg toll repül
A.pillowBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,240,20);u.pose='attack';const x=cx(t),y=midY(t),P={a:-2.2,on:true};
  effects.push({update(){return P.on;},draw(){const px=x+70,py=topY(t)-10;const L=110;qPillow(px+Math.cos(P.a)*L,py+Math.sin(P.a)*L,P.a+Math.PI/2,1.5);}});
  sfx('whoosh');await tween(220,k=>{P.a=-2.2-.4*easeIO(k);});await tween(150,k=>{P.a=-2.6+2.0*k*k;});sfx('hit');sfx('boing');shake(12);hitStop(80);
  for(let i=0;i<40;i++){const f={x:x+rnd(-30,30),y:y+rnd(-40,20),vx:rnd(-260,260),vy:rnd(-320,-40),r:rnd(0,6),t:0,s:rnd(.8,1.4)};effects.push({update(dt){f.t+=dt;f.vy+=150*dt;f.vx*=.96;f.x+=f.vx*dt+Math.sin(f.t*6)*1.5;f.y+=f.vy*dt;f.r+=dt*3;return f.t<1.8;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.8-f.t)*2);drawFeather(f.x,f.y,f.r,f.s);ctx.restore();}});}
  puffs(x,y,6,['255,255,255','235,232,250'],[16,26]);t.hurt=.4;toss(t,30,300);hit(u,t,sk);await wait(200);P.on=false;await dashBack(u,d);};
// Párnalovag – Tollvihar: a párna szétszakad a magasban, és tollörvény kavarog a hősök körül, majd rájuk csap
A.featherStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,top=Math.min(...al.map(topY))-90;sfx('whoosh');
  await flyObj(fp(u,.68,.35),{x:mx,y:top},500,(x,y,r)=>qPillow(x,y,r,1.2),{spin:6,arc:120});sfx('boom');sfx('wind');flash('255,255,255',.3,.1);
  const F=[];for(let i=0;i<120;i++)F.push({a:rnd(0,6.28),r:rnd(20,60),y:top,vy:rnd(-40,40),s:rnd(.7,1.3),sp:rnd(3,5)*(Math.random()<.5?1:-1),rot:rnd(0,6)});const st={t:0,on:true,W:(Math.max(...xs)-Math.min(...xs))/2+120};
  effects.push({update(dt){st.t+=dt;for(const f of F){f.a+=f.sp*dt;f.r=Math.min(st.W,f.r+dt*220);f.y+=(H*.6-f.y)*dt*1.2+f.vy*dt;f.rot+=dt*4;}return st.on;},draw(){for(const f of F)drawFeather(mx+Math.cos(f.a)*f.r,f.y+Math.sin(f.a)*f.r*.3,f.rot,f.s);}});
  const bz=setInterval(()=>sfx('wind'),400);await wait(1100);clearInterval(bz);for(let i=0;i<3;i++){for(const t of al){t.hurt=.3;sparks(cx(t),midY(t),['255,255,255','230,225,250'],6,200);}sfx('hit');shake(5);await wait(150);}
  hitAll(u,al,sk);st.on=false;for(const f of F){const p={x:mx+Math.cos(f.a)*f.r,y:f.y,vx:rnd(-200,200),vy:rnd(-100,60),r:f.rot,t:0};effects.push({update(dt){p.t+=dt;p.vy+=120*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*3;return p.t<1;},draw(){ctx.save();ctx.globalAlpha=1-p.t;drawFeather(p.x,p.y,p.r,1);ctx.restore();}});}await wait(300);u.pose='idle';};

// Méhkirálynő – Mézeső: a ragacsos méz beborítja a hősöket (1 körig sebezhetőbbek: Védelem−), és meggyógyítja a méheket
ESK.honeyrain.status=['defDown',1,1];ESK.honeyrain.desc='Ragacsos méz: a hősök 1 körig sebezhetőbbek, a méhek (nem a királynő) gyógyulnak.';
A.honeyRain=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';sfx('squish');await dimTo(.3,'40,25,0',200);
  // aranyló mézfelhő a magasban
  const xs=al.map(cx),x0=Math.min(...xs)-80,x1=Math.max(...xs)+80;puffs((x0+x1)/2,70,16,['240,180,40','255,210,90'],[30,50],{w:(x1-x0)/2,h:20,v:20,up:5,l0:1.6,l1:2.2});
  for(let i=0;i<90;i++)setTimeout(()=>{const x=rnd(x0,x1);part({x,y:60,vx:rnd(-10,10),vy:rnd(420,560),g:200,life:1.2,size:rnd(3,5),rgb:pick(['255,170,20','235,140,10','255,210,90']),add:false,shape:'drop'});},i*12);
  await wait(800);for(const h of al){honeyCoat(h,1800);splat(cx(h),topY(h),['230,150,20','255,200,70'],12,200,'drop');hit(e,h,sk);}sfx('squish');
  await wait(300);const bees=S.enemies.filter(x=>x.alive&&x!==e);for(const b of bees){const g=Math.min(b.maxHp-b.hp,Math.round(b.maxHp*.15));if(g>0){b.hp+=g;popNum(b,g,'heal');}sparkUp&&sparkUp(b,'255,210,90',10);}updateHUD();sfx('heal');
  await wait(400);await dimTo(0,null,200);e.pose='idle';};
// Méhkirálynő – Királyi fullánk: sárga méreg
A.royalSting=async(e,ts,sk)=>{const t=ts[0];if(!t)return;e.pose='attack';const x0=cx(e)-60,y0=midY(e),x1=cx(t),y1=midY(t);const st={k:0,on:true};
  effects.push({update(){if(st.on&&Math.random()<.8)part({x:x0+(x1-x0)*st.k,y:y0+(y1-y0)*st.k,vx:rnd(-20,20),vy:rnd(20,60),g:300,life:.5,size:rnd(3,5),rgb:pick(['255,230,40','240,210,20']),add:false,shape:'drop'});return st.on;},
    draw(){const x=x0+(x1-x0)*st.k,y=y0+(y1-y0)*st.k,an=Math.atan2(y1-y0,x1-x0);ctx.save();ctx.translate(x,y);ctx.rotate(an);const g=ctx.createLinearGradient(-90,0,30,0);g.addColorStop(0,'rgba(255,220,40,0)');g.addColorStop(.6,'#ffd21a');g.addColorStop(1,'#3a2a08');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(30,0);ctx.lineTo(-90,-12);ctx.lineTo(-90,12);ctx.closePath();ctx.fill();ctx.globalCompositeOperation='lighter';glow(0,0,40,'255,230,60',.6);ctx.restore();}});
  sfx('slash');await tween(260,k=>{st.k=k*k;});st.on=false;sfx('needle');flash('255,235,90',.3,.12);hitStop(100);shake(12);sparks(x1,y1,['255,230,60','255,255,255'],30,600);soundBlast(x1,y1,'255,220,40',140,420);
  for(let i=0;i<18;i++)part({x:x1+rnd(-30,30),y:y1+rnd(-30,30),vx:rnd(-80,80),vy:rnd(-60,40),g:300,life:.9,size:rnd(4,7),rgb:pick(['255,225,30','240,200,10','255,245,120']),add:false,shape:'drop'});
  puffs(x1,y1,8,['240,220,60','220,200,40'],[12,22]);const sx=x1,sy=y1;effects.push({t:0,update(dt){this.t+=dt;return this.t<1.2;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(sx,sy,t.h*t.scale*.6,'255,220,40',.4*(1-this.t/1.2));ctx.restore();}});hit(e,t,sk);await wait(250);e.pose='idle';};

// Rozsdakirály – Fogaskerékhullás: fogaskerekek és csavarok zuhannak az égből egy hősre
ESK.gearthrow.name='Fogaskerékhullás';
A.gearRain=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('thunder');await wait(250);const x=cx(t),gy=t.y+t.oy;
  const items=[];for(let i=0;i<16;i++)items.push({gear:i%3!==2,x:x+rnd(-70,70),y:-40-rnd(0,320),vy:rnd(300,420),r:rnd(0,6),vr:rnd(-8,8),R:rnd(14,30),land:gy-rnd(10,t.h*t.scale*.8),done:false,a:1});
  await new Promise(res=>{effects.push({update(dt){let alive=false;for(const it of items){if(it.a<=0)continue;alive=true;if(!it.done){it.vy+=900*dt;it.y+=it.vy*dt;it.r+=it.vr*dt;if(it.y>=it.land){it.done=true;sfx(Math.random()<.5?'hit':'rock');sparks(it.x,it.y,['255,220,150','200,200,210'],6,220);t.hurt=.25;shake(4);it.vy=-rnd(120,220);it.vx=rnd(-120,120);}}else{it.vy+=900*dt;it.y+=it.vy*dt;it.x+=it.vx*dt;it.a-=dt*1.8;}}if(!alive){res();return false;}return true;},
    draw(){for(const it of items)if(it.a>0){ctx.save();ctx.globalAlpha=Math.max(0,it.a);if(it.gear)qGear(it.x,it.y,it.r,it.R,pick(['#a08a60','#8a7a6a','#b0956a']));else qBolt(it.x,it.y,it.r,1.4);ctx.restore();}}});});
  shake(10);puffs(x,gy-10,6,['150,130,110','120,105,95'],[14,24]);hit(u,t,sk);await wait(200);u.pose='idle';};
if(ESK.gearthrow){ESK.gearthrow.anim='gearRain';NOFX.add('gearRain');}

// Lávaszalamandra – Tűzgolyó (nem láva): a szájából hatalmas tűzgolyó
ESK.lavaspit.name='Tűzgolyó';
A.salFireball=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('fire');const m=fp(u,.1,.62),T={x:cx(t),y:midY(t)};
  const B={r:4};effects.push({update(){if(B.r>0)part({x:m.x+rnd(-B.r,B.r),y:m.y+rnd(-B.r,B.r),vx:rnd(-30,30),vy:-rnd(20,60),life:.4,size:rnd(8,14),grow:20,rgb:'255,150,40',add:false,shape:'fire'});return B.r>0;},draw(){if(B.r>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,B.r*2.2,'255,140,40',.8);glow(m.x,m.y,B.r,'255,245,200',1);ctx.restore();}}});
  await tween(380,k=>{B.r=4+20*k;});B.r=0;sfx('fire');
  await flyObj(m,T,380,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,50,'255,130,30',.7);glow(x,y,22,'255,240,190',1);ctx.restore();for(let i=0;i<3;i++)part({x:x+rnd(-12,12),y:y+rnd(-12,12),vx:rnd(40,120),vy:rnd(-50,10),drag:1,life:rnd(.3,.5),size:rnd(10,18),grow:30,rgb:'255,150,40',add:false,shape:'fire'});},{arc:50});
  sfx('boom');sfx('fire');flash('255,170,80',.3,.12);shake(12);hitStop(80);bigBoom(T.x,T.y,1);t.hurt=.4;hit(u,t,sk);await wait(300);u.pose='idle';};
if(ESK.lavaspit){ESK.lavaspit.anim='salFireball';NOFX.add('salFireball');}

// Homokember – Álomhomok: markolatnyi aranyló álomhomok; csillogó porfelhő örvénylik a hős feje körül
A.sandThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const o=fp(u,.15,.45),T={x:cx(t),y:topY(t)+t.h*t.scale*.25};
  for(let i=0;i<160;i++){const life=rnd(.35,.6);part({x:o.x,y:o.y,vx:(T.x-o.x)/life+rnd(-90,90),vy:(T.y-o.y)/life+rnd(-110,110),life,size:rnd(1,2.6),rgb:pick(['240,210,140','220,190,120','255,240,190','255,255,220'])});}
  for(let i=0;i<10;i++){const life=rnd(.5,.7);part({x:o.x,y:o.y,vx:(T.x-o.x)/life,vy:(T.y-o.y)/life+rnd(-40,40),drag:.3,life,size:rnd(10,16),grow:30,rgb:'230,205,150',add:false,shape:'smoke'});}
  await wait(500);sfx('dust');const st={t:0};effects.push({update(dt){st.t+=dt;for(let i=0;i<4;i++){const a=st.t*8+i*1.57;part({x:T.x+Math.cos(a)*50,y:T.y+Math.sin(a)*18,vx:-Math.sin(a)*60,vy:10,life:.5,size:rnd(1.5,3),rgb:pick(['255,240,190','255,255,230'])});}return st.t<1.1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(T.x,T.y,70,'240,210,140',.3*(1-st.t/1.1));ctx.restore();}});
  puffs(T.x,T.y,8,['230,205,150','215,190,140'],[14,24]);t.hurt=.3;hit(u,t,sk);await wait(500);u.pose='idle';};

// Karamellskorpió – Karamellfullánk: a szelvényes farok magasra íveli a karamellcsepegős fullánkot, és felülről lecsap
A.caramelSting=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const base=fp(u,.62,.45),T={x:cx(t),y:midY(t)},st={k:0,on:true};
  const tailPts=k=>{const pts=[];const tip={x:base.x+(T.x-base.x)*k,y:Math.min(base.y,T.y)-200*Math.sin(Math.min(1,k*1.2)*Math.PI*.8)+(T.y-base.y)*k*k};for(let i=0;i<=10;i++){const q=i/10;pts.push({x:base.x+(tip.x-base.x)*q,y:base.y+(tip.y-base.y)*q-Math.sin(q*Math.PI)*80});}return pts;};
  effects.push({update(){if(st.on&&Math.random()<.5){const p=tailPts(st.k)[10];part({x:p.x,y:p.y,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,5),rgb:'200,120,40',add:false,shape:'drop'});}return st.on;},
    draw(){const pts=tailPts(st.k);ctx.save();for(let i=0;i<pts.length;i++){const r=18-i*1.1;const g=ctx.createRadialGradient(pts[i].x-4,pts[i].y-4,1,pts[i].x,pts[i].y,r);g.addColorStop(0,'#ffd08a');g.addColorStop(1,'#b0601a');ctx.fillStyle=g;ctx.strokeStyle='#4a2008';ctx.lineWidth=2;ctx.beginPath();ctx.arc(pts[i].x,pts[i].y,r,0,6.29);ctx.fill();ctx.stroke();}
      const p=pts[10],q=pts[9],an=Math.atan2(p.y-q.y,p.x-q.x);ctx.translate(p.x,p.y);ctx.rotate(an);ctx.fillStyle='#3a1a08';ctx.beginPath();ctx.moveTo(30,0);ctx.lineTo(-4,-10);ctx.lineTo(-4,10);ctx.closePath();ctx.fill();ctx.fillStyle='#d88a3a';ctx.beginPath();ctx.arc(-6,0,10,0,6.29);ctx.fill();ctx.restore();}});
  sfx('whoosh');await tween(380,k=>{st.k=.6*easeIO(k);});await tween(150,k=>{st.k=.6+.4*k*k;});sfx('needle');shake(10);hitStop(80);sparks(T.x,T.y,['220,140,60','255,255,255'],16,320);
  splat(T.x,T.y,['200,120,40','230,160,70'],16,260,'drop');fireBurst(T.x,T.y,6,[10,18],140);t.hurt=.35;hit(u,t,sk);await wait(200);await tween(260,k=>{st.k=1-k;});st.on=false;u.pose='idle';};
// Karamellskorpió – Ollócsattanás: két óriási karamellolló csattan össze
A.scorpClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,0);u.pose='attack';const x=cx(t),y=midY(t),C={o:.6,on:true};
  const claw=(sg)=>{ctx.save();ctx.rotate(sg*C.o);const g=ctx.createLinearGradient(-70,0,0,0);g.addColorStop(0,'#ffd08a');g.addColorStop(1,'#b0601a');ctx.fillStyle=g;ctx.strokeStyle='#4a2008';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(10,sg*4);ctx.quadraticCurveTo(-30,sg*-40,-80,sg*-8);ctx.lineTo(-60,sg*2);ctx.quadraticCurveTo(-30,sg*-10,10,sg*14);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.fillStyle='#fff3d0';for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(-60+i*14,sg*0);ctx.lineTo(-54+i*14,sg*-8);ctx.lineTo(-48+i*14,sg*0);ctx.fill();}ctx.restore();};
  effects.push({update(){return C.on;},draw(){ctx.save();ctx.translate(x+60,y);claw(-1);claw(1);ctx.restore();}});
  for(let i=0;i<2;i++){await tween(130,k=>{C.o=.6*(1-k*k);});sfx('slash');sfx('hit');shake(10);hitStop(60);sparks(x,y,['255,200,120','255,255,255'],14,340);t.hurt=.3;await tween(130,k=>{C.o=.6*k;});}
  hit(u,t,sk);C.on=false;await dashBack(u,d);};

// Árny-Lili – Árnyéklopás (az értelmetlen „Árny-gyógyítás” helyett): életet szív egy hősből, és azzal a legsebesültebb árnytársát gyógyítja
ESK.shheal={name:'Árnyéklopás',tgt:'enemy',kind:'mag',pow:1,elem:'dark',anim:'shadowSiphon'};
A.shadowSiphon=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('dark');const al=S.enemies.filter(x=>x.alive&&!x.d.passive&&x.type!=='morcus'),ally=al.reduce((a,b)=>a.hp/a.maxHp<b.hp/b.maxHp?a:b,u);
  const T={x:cx(t),y:midY(t)},st={t:0,on:true};effects.push({update(dt){st.t+=dt;return st.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let j=0;j<3;j++){ctx.strokeStyle=`rgba(170,80,255,${.5-j*.12})`;ctx.lineWidth=8-j*2;ctx.beginPath();for(let i=0;i<=20;i++){const q=i/20,x=cx(u)+(T.x-cx(u))*q,y=midY(u)+(T.y-midY(u))*q+Math.sin(q*10+st.t*12+j)*14*Math.sin(q*Math.PI);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}});
  await wait(400);const before=t.hp;hit(u,t,sk);const got=Math.max(Math.round(ally.maxHp*.12),before-t.hp);
  for(let i=0;i<14;i++)setTimeout(()=>part({x:T.x,y:T.y,vx:(cx(ally)-T.x)/.6+rnd(-40,40),vy:(midY(ally)-T.y)/.6+rnd(-40,40),life:.6,size:rnd(3,6),rgb:pick(['200,60,90','170,80,255'])}),i*30);
  await wait(650);st.on=false;const g=Math.min(ally.maxHp-ally.hp,got);if(g>0){ally.hp+=g;popNum(ally,g,'heal');}sparkUp&&sparkUp(ally,'170,80,255',10);sfx('heal');updateHUD();await wait(300);u.pose='idle';};
if(EN_DEF.shfairy)EN_DEF.shfairy.ai=e=>{const hurt=S.enemies.filter(x=>x.alive&&!x.d.passive&&x.hp<x.maxHp*.7&&x.type!=='morcus');if(hurt.length&&Math.random()<.7)return useEnemySkill(e,ESK.shheal,aiTarget(e));return useEnemySkill(e,ESK.shlight,aiTarget(e));};
if(EN_DEF.shfairy)EN_DEF.shfairy.info='Lili sötét mása. Életet szív a hősökből, és azzal gyógyítja a társait: vele érdemes kezdeni!';
// Árny-Zordon – a második tűztámadás helyett Árny-jégvihar
ESK.shinferno={name:'Árny-jégvihar',tgt:'enemies',kind:'mag',pow:ESK.shinferno?ESK.shinferno.pow:.8,elem:'ice',anim:'shadowBlizzard',status:['freeze',.25,1]};
A.shadowBlizzard=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await castPose(u,'120,90,220',420);sfx('ice');await dimTo(.45,'10,10,40',200);const st={t:0};
  effects.push({update(dt){st.t+=dt;if(st.t<1.3)for(let i=0;i<10;i++)part({x:W+20-rnd(0,200),y:rnd(0,H*.8),vx:-rnd(500,800),vy:rnd(100,250),life:1.4,size:rnd(1.5,3.5),rgb:pick(['200,190,255','150,130,240','255,255,255']),shape:'streak'});if(st.t<1.3&&Math.random()<.5)part({x:rnd(W*.2,W),y:rnd(H*.3,H*.8),vx:-rnd(200,400),vy:rnd(-20,40),life:1.2,size:rnd(20,34),grow:20,rgb:pick(['90,70,150','60,50,110']),add:false,shape:'dsmoke'});return st.t<1.4;},draw(){}});
  const bz=setInterval(()=>sfx('ice'),300);await wait(700);clearInterval(bz);for(const t of al){shardBurst(cx(t),midY(t),5,'170,150,255',220,.6);t.hurt=.35;}hitAll(u,al,sk);await wait(600);await dimTo(0,null,250);u.pose='idle';};
NOFX.add('shadowBlizzard');

// Csontváz – Pajzscsapás: a kerek pajzsával nekiront és fejbe kólintja a hőst (nem kardvágás)
A.shieldBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const S1={on:true,k:0};const d0=await dashTo(u,t,220,10);u.pose='idle';
  effects.push({update(){return S1.on;},draw(){const x=cx(u)-u.w*u.scale*.45-28*S1.k,y=midY(u)-10;qShield(x,y,1.25,-.15*S1.k);}});
  await tween(150,k=>{S1.k=-.4*k;u.ox=d0.dx+12*k;});sfx('whoosh');await tween(90,k=>{S1.k=-.4+1.4*k;u.ox=d0.dx+12-26*k;});
  sfx('hit');sfx('rock');shake(14);hitStop(100);flash('255,240,200',.25,.08);const x=cx(t),y=midY(t);soundBlast(x+20,y,'255,230,170',120,350);sparks(x,y,['255,240,200','255,255,255','200,200,210'],18,380);puffs(x,t.y+t.oy,5,['190,170,140'],[12,20]);
  const birds={t:0};effects.push({update(dt){birds.t+=dt;return birds.t<1;},draw(){for(let i=0;i<3;i++){const a=birds.t*6+i*2.1;ctx.save();ctx.globalAlpha=Math.min(1,(1-birds.t)*3);ctx.fillStyle='#ffe070';ctx.beginPath();for(let j=0;j<10;j++){const aa=j*.628,r=j%2?3:8;ctx.lineTo(x+Math.cos(a)*30+Math.cos(aa)*r,topY(t)-6+Math.sin(a)*8+Math.sin(aa)*r);}ctx.fill();ctx.restore();}}});
  toss(t,34,300);hit(u,t,sk);await wait(200);S1.on=false;await dashBack(u,d0);};
if(ESK.shieldbash){ESK.shieldbash.anim='shieldBash';NOFX.add('shieldBash');}

// Álmatlan – Álomlopás (nem ugyanaz, mint a bámulás): a hős álma buborékként kiszáll a fejéből, a szem elnyeli és gyógyul; a hős elalszik
A.dreamSteal=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('dust');const e0=fp(u,.35,.55),B={x:cx(t),y:topY(t)-10,r:0,a:1};
  effects.push({update(){return B.a>0;},draw(){if(B.r<=0)return;ctx.save();ctx.globalAlpha=B.a;const g=ctx.createRadialGradient(B.x-B.r*.3,B.y-B.r*.3,2,B.x,B.y,B.r);g.addColorStop(0,'rgba(255,255,255,.7)');g.addColorStop(.7,'rgba(200,180,255,.35)');g.addColorStop(1,'rgba(160,140,255,.6)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(B.x,B.y,B.r,0,6.29);ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2;ctx.stroke();drawMoon(B.x-B.r*.2,B.y,B.r*.35,B.a);ctx.fillStyle='#fff6c0';for(let i=0;i<4;i++){const a=T*2+i*1.57;ctx.beginPath();ctx.arc(B.x+Math.cos(a)*B.r*.55,B.y+Math.sin(a)*B.r*.45,2.5,0,6.29);ctx.fill();}ctx.restore();}});
  await tween(500,k=>{B.r=40*easeIO(k);B.y=topY(t)-10-40*k;});sfx('mirror');const x0=B.x,y0=B.y;await tween(600,k=>{const e=easeIO(k);B.x=x0+(e0.x-x0)*e;B.y=y0+(e0.y-y0)*e-Math.sin(k*Math.PI)*80;B.r=40*(1-.6*e);});
  B.a=0;sfx('heal');for(let i=0;i<16;i++)part({x:e0.x,y:e0.y,vx:rnd(-120,120),vy:rnd(-120,120),life:.5,size:rnd(2,4),rgb:pick(['200,180,255','255,255,255']),shape:'star'});
  hit(u,t,sk);const g=Math.min(u.maxHp-u.hp,Math.round(u.maxHp*.1));if(g>0){u.hp+=g;popNum(u,g,'heal');}updateHUD();await wait(300);u.pose='idle';};
if(ESK.dreamsteal){ESK.dreamsteal.anim='dreamSteal';ESK.dreamsteal.desc='Ellopja a hős álmát (abból gyógyul), a hős elalszik.';NOFX.add('dreamSteal');}

// Cukorkocka – Porcukorfelhő: a kocka megrázza magát, csillogó porcukor-hóvihar borítja be a hősöket
A.sugarDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dust');for(let i=0;i<6;i++){u.ox=(i%2?-1:1)*8;puffs(cx(u),topY(u)+20,3,['255,255,255','245,245,250'],[14,24],{up:120});await wait(60);}u.ox=0;
  const o={x:cx(u),y:topY(u)+20},st={t:0};sfx('wind');
  effects.push({update(dt){st.t+=dt;if(st.t<1.1)for(const t of al){for(let i=0;i<5;i++){const life=rnd(.6,.9);part({x:o.x+rnd(-20,20),y:o.y+rnd(-20,20),vx:(cx(t)+rnd(-60,60)-o.x)/life,vy:(midY(t)+rnd(-60,50)-o.y)/life,life,size:rnd(1,2.5),rgb:pick(['255,255,255','240,240,255','255,245,250'])});}
      if(Math.random()<.5)part({x:o.x,y:o.y,vx:(cx(t)-o.x)/1+rnd(-40,40),vy:(midY(t)-o.y)/1+rnd(-40,40),drag:.3,life:1.1,size:rnd(14,24),grow:40,rgb:'250,250,255',add:false,shape:'smoke'});if(Math.random()<.4)part({x:cx(t)+rnd(-50,50),y:midY(t)+rnd(-60,40),vx:0,vy:rnd(10,30),life:.5,size:rnd(3,5),rgb:'255,255,255',shape:'star'});}return st.t<1.2;},draw(){}});
  await wait(1100);for(const t of al){const x=cx(t),top=topY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<1.4;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.4-this.t)*2)*.9;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.ellipse(x,top+6,t.w*t.scale*.45,10,0,0,6.29);ctx.fill();for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(x-24+i*12,top+12+(i%2)*6,5,0,6.29);ctx.fill();}ctx.restore();}});t.hurt=.3;}
  hitAll(u,al,sk);await wait(300);u.pose='idle';};

// Teddy – Macióölelés: tényleg átöleli: a két szőrös mancs a hős köré fonódik, és háromszor megszorítja
A.bearHug=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,280,-t.w*t.scale*.45);sfx('growl');const H1={k:0,on:true};
  const arm=(sg)=>{const x=cx(t),y=midY(t),rx=t.w*t.scale*.55,ry=26;ctx.save();ctx.lineCap='round';const a0=sg>0?-.3:Math.PI+.3,a1=sg>0?Math.PI*.55:Math.PI*.45;const a=a0+(a1-a0)*H1.k;ctx.strokeStyle='#4a2a10';ctx.lineWidth=34;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,Math.min(a0,a),Math.max(a0,a));ctx.stroke();ctx.strokeStyle='#a8692e';ctx.lineWidth=27;ctx.stroke();ctx.strokeStyle='rgba(220,160,90,.5)';ctx.lineWidth=8;ctx.stroke();
    const px=x+Math.cos(a)*rx,py=y+Math.sin(a)*ry;ctx.fillStyle='#a8692e';ctx.strokeStyle='#4a2a10';ctx.lineWidth=3;ctx.beginPath();ctx.arc(px,py,18,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='#e8b880';ctx.beginPath();ctx.arc(px,py+3,8,0,6.29);ctx.fill();for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(px-8+i*8,py-9,3.5,0,6.29);ctx.fill();}ctx.restore();};
  effects.push({update(){return H1.on;},draw(){arm(1);arm(-1);}});await tween(260,k=>{H1.k=easeIO(k);});
  const s0=t.scale;for(let i=0;i<3;i++){sfx('squish');shake(7);t.hurt=.3;await tween(150,k=>{t.scale=s0*(1-.08*Math.sin(k*Math.PI));});for(let j=0;j<2;j++)drawHeartBurst(cx(t),topY(t));await wait(80);}t.scale=s0;
  hit(u,t,sk);await tween(200,k=>{H1.k=1-k;});H1.on=false;await dashBack(u,d);};
// Teddy – Morgás: látható hatás – a hősök megrémülnek (1 körig Védelem−), Maci pedig erősebb lesz (Erő+)
ESK.growl={name:'Morgás',tgt:'self',kind:'buff',anim:'teddyGrowl',desc:'Megrémíti a hősöket (1 körig sebezhetőbbek), Maci erősebb lesz.'};
A.teddyGrowl=async(u,ts,sk)=>{u.pose='attack';sfx('growl');const m=fp(u,.4,.35);for(let i=0;i<3;i++){soundBlast(m.x,m.y,'255,180,120',220,500);shake(8);await wait(160);}
  for(const h of S.heroes.filter(x=>x.alive)){addStatus(h,'defDown',1);popLabel(h,'MEGRÉMÜLT!','#ffb080');h.hurt=.3;await wait(80);}addStatus(u,'atkUp',1);popLabel(u,'ERŐ+','#ff8a6a');sfx('buff');
  fxSpin(tint('nova','255,120,80')||'nova',cx(u),midY(u),{size:bigOf(u)*1.5,life:.5,s0:.2,s1:1,add:true,out:.3});updateHUD();await wait(400);u.pose='idle';};
NOFX.add('teddyGrowl');

// Csipesz-rák – Csípés: fényes cukorcsipesszel elkapja, megemeli és megszorítja a hőst
A.clawPinch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,30);u.pose='attack';const C={o:.5,on:true},x=cx(t),y=midY(t);
  effects.push({update(){return C.on;},draw(){qTongs(x+70,y+t.oy*0,C.o,1.3);}});await tween(160,k=>{C.o=.5*(1-k*.8);});sfx('slash');shake(8);hitStop(60);sparks(x,y,['255,255,255','200,210,230'],14,320);
  await tween(240,k=>{t.oy=-30*Math.sin(k*Math.PI);});for(let i=0;i<2;i++){sfx('hit');shake(5);t.hurt=.3;await wait(120);}hit(u,t,sk);await tween(140,k=>{C.o=.1+.5*k;});C.on=false;t.oy=0;await dashBack(u,d);};

// Zombi pék – Rothadt kifli: a feltartott kezéből egy penészes kiflit hajít, ami büdös gázfelhőben csattan
A.rottenBun=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const h=fp(u,.12,.15),T={x:cx(t),y:midY(t)};sfx('whoosh');
  await flyObj(h,T,460,(x,y,r)=>{qCroissant(x,y,r,1.3,true);if(Math.random()<.5)part({x,y,vx:rnd(-20,20),vy:rnd(-20,20),life:.6,size:rnd(8,12),grow:15,rgb:pick(['150,170,80','120,140,60']),add:false,shape:'smoke'});},{spin:-9,arc:120});
  sfx('squish');shake(7);fallDebris(T.x,T.y,8,(x,y,r,s)=>{ctx.fillStyle=pick(['#c8a050','#8a8a30']);ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.beginPath();ctx.ellipse(0,0,6*s,4*s,0,0,6.29);ctx.fill();ctx.restore();},{v:240});
  puffs(T.x,T.y,12,['150,170,80','120,140,60','170,180,100'],[16,28],{up:60,l0:1,l1:1.6});t.hurt=.3;hit(u,t,sk);await wait(350);u.pose='idle';};
if(ESK.rottenbun){ESK.rottenbun.anim='rottenBun';NOFX.add('rottenBun');}

// Vattacukor-bárány – Édes álom: rózsaszín vattacukor-felhők gördülnek a hősökre, cukorkák lebegnek bennük
function qCandy(x,y,r,col){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle=col;ctx.strokeStyle='rgba(80,20,50,.8)';ctx.lineWidth=1.5;ctx.beginPath();ctx.ellipse(0,0,9,7,0,0,6.29);ctx.fill();ctx.stroke();for(const s of [-1,1]){ctx.beginPath();ctx.moveTo(s*8,0);ctx.lineTo(s*16,-6);ctx.lineTo(s*16,6);ctx.closePath();ctx.fill();ctx.stroke();}ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.ellipse(-3,-3,3,1.5,-.5,0,6.29);ctx.fill();ctx.restore();}
A.sweetDream=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dust');const o=fp(u,.3,.4);
  for(const t of al)for(let i=0;i<16;i++)setTimeout(()=>{const life=rnd(.8,1.1);part({x:o.x+rnd(-30,30),y:o.y+rnd(-30,30),vx:(cx(t)+rnd(-60,60)-o.x)/life,vy:(midY(t)+rnd(-60,40)-o.y)/life,drag:.2,life:life+.8,size:rnd(26,40),grow:40,rgb:pick(['255,170,215','255,195,230','235,180,255']),add:false,shape:'puff'});},i*40);
  const C=[];for(const t of al)for(let i=0;i<4;i++)C.push({t,a:rnd(0,6.28),r:rnd(30,60),c:pick(['#ff7ab0','#8ad0ff','#ffd04a','#b98aff']),y:0});
  await wait(700);sfx('holy');const st={t:0};effects.push({update(dt){st.t+=dt;return st.t<1.3;},draw(){const a=Math.sin(Math.min(1,st.t/1.3)*Math.PI);ctx.save();ctx.globalAlpha=a;for(const c of C){c.a+=.04;qCandy(cx(c.t)+Math.cos(c.a)*c.r,midY(c.t)-20+Math.sin(c.a)*c.r*.4,c.a*2,c.c);}ctx.restore();}});
  await wait(800);for(const t of al)t.hurt=.2;hitAll(u,al,sk);await wait(400);u.pose='idle';};

// Hárfa – Altatódal (külön a Kamilla furulyájától): a húrok felragyognak, lágy dallam és hangjegyek szállnak a hősökre
ESK.harplullaby={name:'Altatódal',tgt:'enemies',kind:'mag',pow:ESK.lullaby.pow,elem:ESK.lullaby.elem,anim:'harpLullaby',status:ESK.lullaby.status};
if(EN_DEF.harp&&EN_DEF.harp.skills)EN_DEF.harp.skills=EN_DEF.harp.skills.map(s=>s[0]==='lullaby'?['harplullaby',s[1]]:s);
A.harpLullaby=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;u.pose='attack';sfx('string');await dimTo(.4,'30,10,50',250);const s0=fp(u,.5,.5),st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;return st.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const x=s0.x+20+i*12,w=Math.sin(st.t*30+i)*3*Math.max(0,1-st.t*.5);ctx.strokeStyle='rgba(255,220,250,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,s0.y-90+i*6);ctx.quadraticCurveTo(x+w,s0.y,x,s0.y+90-i*4);ctx.stroke();}glow(s0.x+50,s0.y,110,'255,180,240',.3);ctx.restore();}});
  const notes=[];for(let i=0;i<26;i++)notes.push({h:pick(al),d:i*.07,k:0,dbl:Math.random()<.4,c:pick(['#ffd6ff','#ffe08a','#c8e8ff']),ph:rnd(0,6)});
  effects.push({update(dt){let any=false;for(const n of notes){n.d-=dt;if(n.d>0){any=true;continue;}n.k=Math.min(1,n.k+dt*.75);if(n.k<1)any=true;}return any;},draw(){for(const n of notes){if(n.d>0||n.k>=1)continue;const x=s0.x+(cx(n.h)-s0.x)*n.k,y=s0.y+(midY(n.h)-60-s0.y)*n.k+Math.sin(n.k*10+n.ph)*24;ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);ctx.globalCompositeOperation='lighter';glow(x,y,20,'255,200,250',.4);ctx.restore();ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);qNote(x,y,1.3,n.c,n.dbl);ctx.restore();}}});
  const bz=setInterval(()=>sfx('string'),300);await wait(1700);clearInterval(bz);for(const h of al)puffs(cx(h),midY(h),5,['240,200,255','255,220,245'],[16,26]);hitAll(u,al,sk);st.on=false;await wait(300);await dimTo(0,null,200);u.pose='idle';};
// Hárfa – Húrpattanás: három húr pattan ki villámló ostorként, és áramütés éri a hőst
A.stringSnap=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('string');const o=fp(u,.6,.45),T={x:cx(t),y:midY(t)},S0={k:0,a:1,on:true,t:0};
  effects.push({update(dt){S0.t+=dt;return S0.on;},draw(){ctx.save();ctx.globalAlpha=S0.a;ctx.globalCompositeOperation='lighter';for(let j=0;j<3;j++){ctx.strokeStyle=j===1?'rgba(255,250,200,.95)':'rgba(255,220,120,.8)';ctx.lineWidth=j===1?4:2.5;ctx.beginPath();for(let i=0;i<=30;i++){const q=i/30*S0.k,x=o.x+(T.x-o.x)*q,y=o.y+(j-1)*20*(1-q)+(T.y-o.y)*q+Math.sin(q*26-S0.t*40+j)*16*(1-q*.4);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}glow(o.x+(T.x-o.x)*S0.k,o.y+(T.y-o.y)*S0.k,30,'255,230,140',.8);ctx.restore();}});
  await tween(200,k=>{S0.k=easeIO(k);});sfx('string');sfx('thunder');shake(10);hitStop(70);const hh=t.h*t.scale;
  effects.push({t:0,update(dt){this.t+=dt;return this.t<.5;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,240,140,${1-this.t*2})`;ctx.lineWidth=3;for(let k=0;k<4;k++){ctx.beginPath();let px=T.x+rnd(-30,30),py=T.y-hh*.45;ctx.moveTo(px,py);for(let s=0;s<6;s++){px+=rnd(-16,16);py+=hh*.15;ctx.lineTo(px,py);}ctx.stroke();}ctx.restore();}});
  sparks(T.x,T.y,['255,230,140','255,255,255'],22,400);t.hurt=.35;hit(u,t,sk);await tween(300,k=>{S0.a=1-k;});S0.on=false;u.pose='idle';};

// Kamilla – Legyezőhurrikán: a nagy legyezővel hatalmasat legyint; tealevél- és kamillaszirom-forgószél söpör végig
A.fanHurricane=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';const px=cx(e)-e.w*e.scale*.2,py=midY(e)-40,K={ang:-.6+Math.PI,on:true,hist:[]};
  effects.push({update(){K.hist.unshift(K.ang);K.hist.length=Math.min(5,K.hist.length);return K.on;},draw(){K.hist.slice(1).forEach((a,i)=>drawBigFan(px,py,a,150,.15*(1-i/5)));drawBigFan(px,py,K.ang,150,1);}});
  await tween(300,k=>{K.ang=Math.PI-.6+.6*easeIO(k);});sfx('wind');await tween(200,k=>{K.ang=Math.PI-k*k*2.6;});shake(10);flash('245,250,255',.25,.1);
  const st={t:0,x:px-150};effects.push({update(dt){st.t+=dt;st.x-=1200*dt;for(let i=0;i<10;i++)part({x:st.x+rnd(-60,60),y:rnd(H*.25,H*.88),vx:-rnd(600,1000),vy:rnd(-60,60),life:.45,size:rnd(1.5,3),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
      for(let i=0;i<4;i++){const a=st.t*12+i*1.57;part({x:st.x+Math.cos(a)*60,y:H*.6+Math.sin(a)*120,vx:-rnd(400,700),vy:rnd(-150,50),life:.9,size:rnd(5,8),rgb:pick(['255,250,235','255,230,120','120,180,70']),add:false,shape:'leaf'});}return st.x>-200;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(st.x,H*.58);ctx.scale(1.4,1.2);glow(0,0,200,'230,240,255',.3);ctx.restore();}});
  const done=new Set();await tween(900,k=>{for(const t of al)if(!done.has(t)&&st.x<cx(t)+40){done.add(t);shake(8);sfx('hit');tween(500,q=>{t.ox=-90*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);}).then(()=>{t.ox=0;});hit(e,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(e,t,sk);await tween(250,k=>{K.ang=Math.PI-2.6+2*k;});K.on=false;e.pose='idle';};
// Kamilla – Altatófurulya: kamillaszirmok és lágy, aranyló álomköd úszik a hősökre
A.lullaby=async(e,ts,sk)=>{if(e.type==='harp')return A.harpLullaby(e,ts,sk);const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='attack';sfx('holy');await dimTo(.4,'30,10,50',250);const o=fp(e,.12,.3);
  const notes=[];for(let i=0;i<20;i++)notes.push({h:pick(al),d:i*.08,k:0,dbl:Math.random()<.4,ph:rnd(0,6)});
  effects.push({update(dt){let any=false;for(const n of notes){n.d-=dt;if(n.d>0){any=true;continue;}n.k=Math.min(1,n.k+dt*.7);if(n.k<1)any=true;if(Math.random()<.2&&n.k<1)part({x:o.x+(cx(n.h)-o.x)*n.k,y:o.y+(midY(n.h)-60-o.y)*n.k,vx:rnd(-20,20),vy:rnd(10,40),life:1,size:rnd(4,6),rgb:pick(['255,255,245','255,230,120']),add:false,shape:'leaf'});}return any;},
    draw(){for(const n of notes){if(n.d>0||n.k>=1)continue;const x=o.x+(cx(n.h)-o.x)*n.k,y=o.y+(midY(n.h)-60-o.y)*n.k+Math.sin(n.k*10+n.ph)*22;ctx.save();ctx.globalAlpha=Math.sin(n.k*Math.PI);qNote(x,y,1.2,'#fff4c8',n.dbl);ctx.restore();}}});
  await wait(900);for(const h of al)puffs(cx(h),midY(h),8,['255,240,200','255,225,170'],[18,30],{l0:1.2,l1:1.8});const bz=setInterval(()=>sfx('dust'),400);await wait(700);clearInterval(bz);for(const h of al)hit(e,h,sk);await wait(300);await dimTo(0,null,200);e.pose='idle';};
// Kamilla – Teaszertartás: lebegő teáskanna aranyló teát tölt egy csészébe, a csésze pedig forró sugárban a hősre zúdítja
A.teaCeremony=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('holy');const c0=fp(u,.12,.3),P={x:c0.x-30,y:c0.y-110,a:0},C={x:c0.x-90,y:c0.y+10,fill:0},T={x:cx(t),y:midY(t)};
  effects.push({update(){return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.globalAlpha=P.a;qTeapot(P.x,P.y,.95,-.5*Math.min(1,P.tilt||0));drawCup(C.x,C.y,0,2.2);if(P.tilt>.5){ctx.strokeStyle='rgba(220,170,60,.9)';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(P.x-80,P.y-20);ctx.quadraticCurveTo(C.x,P.y+10,C.x,C.y-10);ctx.stroke();}
    ctx.globalCompositeOperation='lighter';glow(C.x,C.y,40,'255,220,120',.5*C.fill);ctx.restore();}});
  await tween(300,k=>{P.a=k;});await tween(300,k=>{P.tilt=k;});sfx('splash');await tween(500,k=>{C.fill=k;if(Math.random()<.5)part({x:C.x+rnd(-10,10),y:C.y-14,vx:rnd(-10,10),vy:-rnd(20,50),life:.8,size:rnd(8,12),grow:15,rgb:'245,245,250',add:false,shape:'smoke'});});
  P.tilt=0;sfx('whoosh');const st={k:0,on:true};effects.push({update(){if(st.on)for(let i=0;i<4;i++){const q=rnd(0,st.k);part({x:C.x+(T.x-C.x)*q,y:C.y+(T.y-C.y)*q-Math.sin(q*Math.PI)*60,vx:rnd(-30,30),vy:rnd(-30,30),g:300,life:.4,size:rnd(3,5),rgb:pick(['230,190,80','255,230,140']),add:false,shape:'drop'});}return st.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const [w,c] of [[18,'rgba(200,150,40,.6)'],[8,'rgba(255,230,140,.95)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();for(let i=0;i<=20;i++){const q=i/20*st.k;const x=C.x+(T.x-C.x)*q,y=C.y+(T.y-C.y)*q-Math.sin(q*Math.PI)*60;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}});
  await tween(260,k=>{st.k=k;});sfx('splash');shake(8);splat(T.x,T.y,['230,190,80','255,230,140'],22,300,'drop');puffs(T.x,T.y,8,['245,245,250'],[16,26],{up:110});for(let i=0;i<14;i++)part({x:T.x,y:T.y,vx:rnd(-200,200),vy:rnd(-220,40),g:300,life:rnd(.8,1.2),size:rnd(4,7),rgb:pick(['255,250,230','255,230,140']),add:false,shape:'leaf'});
  t.hurt=.35;hit(u,t,sk);await wait(200);st.on=false;P.done=true;await tween(300,k=>{P.a=1-k;});P.a=0;u.pose='idle';};

// Molylepke – Hímpor: csillogó, holdfényes hímporfelhő a szárnyakról; Holdsugár: sarlós hold, ezüst fényoszlop
A.mothDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dust');const o=fp(u,.25,.55);
  for(let w=0;w<3;w++){for(const t of al){for(let i=0;i<30;i++){const life=rnd(.7,1);part({x:o.x+rnd(-20,20),y:o.y+rnd(-30,30),vx:(cx(t)+rnd(-50,50)-o.x)/life,vy:(midY(t)+rnd(-60,40)-o.y)/life,drag:.2,life,size:rnd(1,2.6),rgb:pick(['230,210,140','255,240,190','220,190,255','255,255,255'])});}
    const life=1;part({x:o.x,y:o.y,vx:(cx(t)-o.x)/life,vy:(midY(t)-o.y)/life,drag:.3,life:1.2,size:rnd(16,26),grow:30,rgb:pick(['230,200,255','245,225,190']),add:false,shape:'smoke'});}sfx('whoosh');await wait(220);}
  await wait(600);for(const t of al){effects.push({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const a=1-this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),80,'230,210,160',.5*a);ctx.restore();}});t.hurt=.2;}hitAll(u,al,sk);await wait(300);u.pose='idle';};
A.moonBeam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('mirror');await dimTo(.6,'5,8,30',250);const x=cx(t),gy=t.y+t.oy,M={a:0};
  effects.push({update(){return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;for(let i=0;i<50;i++){const sx=(i*137)%W,sy=(i*71)%300;ctx.fillStyle=`rgba(255,255,255,${.6*(.5+.5*Math.sin(T*4+i))})`;ctx.fillRect(sx,sy,2,2);}ctx.restore();drawMoon(x+30,80,46,M.a);}});
  await tween(400,k=>{M.a=k;});sfx('holy');const B={k:0,on:true};
  effects.push({update(){if(B.on)for(let i=0;i<3;i++)part({x:x+rnd(-40,40),y:rnd(90,gy),vx:rnd(-10,10),vy:rnd(30,80),life:.6,size:rnd(2,3.5),rgb:pick(['220,230,255','255,255,255']),shape:'star'});return B.on;},
    draw(){const w=Math.max(70,t.w*t.scale*.6)*B.k;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-w,0,x+w,0);g.addColorStop(0,'rgba(190,210,255,0)');g.addColorStop(.5,'rgba(230,238,255,.75)');g.addColorStop(1,'rgba(190,210,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x+30-w*.4,80);ctx.lineTo(x+30+w*.4,80);ctx.lineTo(x+w,gy);ctx.lineTo(x-w,gy);ctx.closePath();ctx.fill();ctx.save();ctx.translate(x,gy);ctx.scale(1,.25);glow(0,0,w*1.4,'220,230,255',.6);ctx.restore();ctx.restore();}});
  await tween(350,k=>{B.k=easeIO(k);});await wait(300);shake(8);sparks(x,midY(t),['200,220,255','255,255,255'],22,340);t.hurt=.35;hit(u,t,sk);await wait(400);await tween(250,k=>{B.k=1-k;});B.on=false;M.done=true;await tween(300,k=>{M.a=1-k;});M.a=0;await dimTo(0,null,250);u.pose='idle';};
// Rémálom – Rémkarom: árnykarmok nőnek, háromszor tépnek; Rémálom: vörös szemű árnyak tömege
A.dreadClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,200,0);u.pose='attack';const x=cx(t),y=midY(t);
  for(let i=0;i<3;i++){const a=[-.5,.5,-.15][i];puffs(x+40,y-40,3,['40,20,60','60,30,90'],[14,22],{shape:'dsmoke'});clawMarks(x+rnd(-15,15),y+rnd(-15,15),Math.max(170,bigOf(t)),a,'170,80,255');sfx('slash');shake(9);hitStop(50);t.hurt=.3;
    for(let j=0;j<8;j++)part({x:x+rnd(-40,40),y:y+rnd(-40,40),vx:rnd(-160,160),vy:rnd(-160,60),life:.4,size:rnd(2,4),rgb:pick(['190,110,255','255,255,255'])});await wait(130);}
  flash('120,40,180',.25,.1);hit(u,t,sk);await wait(150);await dashBack(u,d);};
A.nightTerror=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dark');await dimTo(.65,'10,0,20',300);
  const sh=[];for(let i=0;i<10;i++)sh.push({x:W+60+i*70,y:H*.55+rnd(-120,80),s:rnd(.8,1.3),ph:rnd(0,6)});const st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;for(const s of sh){s.x-=520*dt*s.s;if(Math.random()<.3)part({x:s.x+rnd(-30,30),y:s.y+rnd(-20,60),vx:rnd(40,120),vy:-rnd(10,40),life:.8,size:rnd(16,28),grow:20,rgb:pick(['30,10,40','50,20,70']),add:false,shape:'dsmoke'});}return st.on;},
    draw(){for(const s of sh){ctx.save();ctx.globalAlpha=.85;drawFoeCopy(u,s.x,s.y+60,.55,.7*s.s);ctx.globalCompositeOperation='lighter';glow(s.x-10,s.y-10,8,'255,40,60',.9);glow(s.x+12,s.y-10,8,'255,40,60',.9);ctx.restore();}}});
  const done=new Set();await tween(2200,k=>{for(const t of al)if(!done.has(t)&&sh[0].x<cx(t)){done.add(t);sfx('dark');t.hurt=.4;shake(8);hit(u,t,sk);}});for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);st.on=false;await dimTo(0,null,250);u.pose='idle';};

// Morcus – több támadás: Kockaeső, Káoszvihar, Árnykarmok
ESK.chaosdice={name:'Káoszkockák',tgt:'enemies',kind:'mag',pow:.7,elem:'dark',anim:'dice'};
ESK.chaosstorm={name:'Káoszvihar',tgt:'enemies',kind:'mag',pow:.85,elem:'dark',anim:'chaosStorm'};
ESK.chaosclaw={name:'Árnykarmok',tgt:'enemy',kind:'phys',pow:1.3,elem:'dark',anim:'dreadClaw'};
A.chaosStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';sfx('dark');await dimTo(.5,'20,0,30',250);const cols=[['fire','255,120,50'],['ice','120,210,255'],['thunder','255,230,80'],['holy','255,245,180'],['dark','160,90,240']];
  for(const t of al){const [el,rgb]=pick(cols);const x=cx(t),y=midY(t);sfx(el==='holy'?'mirror':el==='dark'?'dark':el);await flyObj(handPos(u),{x,y},360,(px,py)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(px,py,40,rgb,.8);glow(px,py,14,'255,255,255',1);ctx.restore();},{arc:80,trail:[rgb,'255,255,255']});
    soundBlast(x,y,rgb,200,500);sparks(x,y,[rgb,'255,255,255'],24,480);shake(10);t.hurt=.4;hit(u,t,{...sk,elem:el});await wait(80);}
  await wait(300);await dimTo(0,null,250);u.pose='idle';};
if(EN_DEF.morcus&&EN_DEF.morcus.ai){const ai0=EN_DEF.morcus.ai;EN_DEF.morcus.ai=async e=>{const r=e.hp/e.maxHp,trans=(e.phase===1&&r<=.6)||(e.phase===2&&r<=.3&&!shadowsAlive());
  if(!trans&&Math.random()<.4){e.turn=(e.turn||0)+1;const id=weighted(e.phase===1?[['chaosdice',2],['chaosstorm',1],['chaosclaw',1]]:[['chaosdice',1],['chaosstorm',2],['chaosclaw',2]]);return useEnemySkill(e,ESK[id],aiTarget(e));}return ai0(e);};}
