// ---- Páros támadások, 19. kör: nagyobb, élethű, festett képekkel ----
// segéd: egy festett kép rajzolása középpont/alap szerint, opcionális tükrözéssel és nyújtással
function r18Img(im,x,y,w,o={}){if(!im)return;const h=w*im.height/im.width*(o.sy||1);ctx.save();ctx.globalAlpha*=o.a==null?1:o.a;if(o.add)ctx.globalCompositeOperation='lighter';ctx.translate(x,y);if(o.rot)ctx.rotate(o.rot);if(o.fx)ctx.scale(-1,1);
  const ay=o.anchor==='bottom'?-h:o.anchor==='top'?0:-h/2,ax=o.ax==null?-w/2:-w*o.ax;ctx.drawImage(im,ax,ay,w,h);ctx.restore();}
// vastag energiasugár a kézből egy pontig (fej halad előre)
function r18Beam(a,b,k,rgb,w){const x=a.x+(b.x-a.x)*k,y=a.y+(b.y-a.y)*k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
  for(const [ww,al] of [[w*3.2,.16],[w*1.7,.38],[w*.6,.95]]){ctx.strokeStyle=al>.9?'rgba(255,255,255,.95)':`rgba(${rgb},${al})`;ctx.lineWidth=ww;ctx.beginPath();ctx.moveTo(a.x,a.y);
    for(let i=1;i<=10;i++){const q=i/10*k;ctx.lineTo(a.x+(b.x-a.x)*q+Math.sin(q*20+T*30)*w*.25,a.y+(b.y-a.y)*q);}ctx.stroke();}glow(x,y,w*3,rgb,.8);ctx.restore();}

// Villámátok: a két varázsló energiája FELSZÁLL az égbe – csak amikor odaér, akkor gyűlik össze ott a koponyás viharfelhő; utána festett, valódi villámok csapnak le
{const P0=R16P['Villámátok'];R16P['Villámátok']=async(A1,B1,al,sk,p)=>{const cl=R17I.stormskull,bo=R17I.bolt;if(!cl)return P0(A1,B1,al,sk,p);
  await dimTo(.6,'20,10,40',300);await Promise.all([r16Raise(A1,'190,110,255'),r16Raise(B1,'190,110,255')]);const {mx}=grp(al),top={x:mx,y:110};
  const Bm={k:0,on:true};R18E({update(){return Bm.on;},draw(){if(Bm.k<=0)return;for(const h of [A1,B1])r18Beam(handPos(h),top,Bm.k,'190,110,255',12);}});
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
  for(let r=0;r<3;r++){for(const t of al){if(!t.alive)continue;strike(t,r===2);if(r===2){toss(t,60,420);for(let i=0;i<6;i++)darkFlame({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-30,30),vx:rnd(-30,30),vy:-rnd(60,140),life:.6,size:rnd(16,24)});hit(A1,t,sk);}await wait(r===2?160:110);}await wait(120);}
  await wait(300);await tween(500,k=>{Cl.a=1-k;});Cl.on=false;await dimTo(0,null,300);};}

// Csillagözön: a festett csillagsárkány maga csap le – lecsap az égből, végigszáguld az ellenségeken csillagport szórva, aztán festett meteorzápor zúdul rájuk
{const P0=R16P['Csillagözön'];R16P['Csillagözön']=async(A1,B1,al,sk,p)=>{const im=R17I.constellation,mt=R17I.meteor;if(!im)return P0(A1,B1,al,sk,p);
  const sc=sceneLayer(()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(6,8,34,.88)');g.addColorStop(1,'rgba(30,20,70,.55)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<130;i++){ctx.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(T*3+i)})`;ctx.fillRect((i*173)%W,(i*67)%330,2,2);}});await sc.show(400);
  await Promise.all([r16Raise(A1,'255,240,180'),r16Raise(B1,'255,240,180')]);const {mx,my}=grp(al);sfx('holy');
  const D={x:mx,y:150,w:W*.85,a:0,rot:0,on:true,trail:[]};
  R18E({update(){D.trail.unshift({x:D.x,y:D.y,w:D.w,rot:D.rot});D.trail.length=Math.min(D.trail.length,7);return D.on;},draw(){if(D.a<=0)return;D.trail.slice(1).forEach((q,i)=>r17Draw(im,q.x,q.y,q.w,{a:D.a*.18*(1-i/7),add:true,rot:q.rot}));
    ctx.save();ctx.globalCompositeOperation='lighter';glow(D.x,D.y,D.w*.4,'255,220,150',.25*D.a);ctx.restore();r17Draw(im,D.x,D.y,D.w,{a:D.a*(.9+.1*Math.sin(T*6)),add:true,rot:D.rot});}});
  // csillagok gyúlnak a kezükből, és összekapcsolódnak a sárkány-csillagképpé
  for(let i=0;i<16;i++){const h=i%2?A1:B1,a=handPos(h);flyObj(a,{x:mx+rnd(-300,300),y:rnd(60,240)},360,(x,y)=>{part({x,y,vx:0,vy:0,life:.35,size:3,rgb:'255,240,200',shape:'star'});},{arc:50});await wait(45);}
  await tween(800,k=>{D.a=k;});r16Lower(A1);r16Lower(B1);sfx('roar');await wait(250);
  // a sárkány lecsap: felemelkedik, aztán zuhanórepülésben végigsöpör az ellenségeken
  await tween(380,k=>{D.y=150-50*easeIO(k);D.rot=-.15*k;D.w=W*(.85-.1*k);});const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),hitDone=new Set(),x0=Math.min(...xs.map(cx))-260,x1=W+300;sfx('whoosh');
  await tween(1300,k=>{const e=easeIO(k);D.x=x0+(x1-x0)*e;D.y=100+(my-40-100)*Math.sin(Math.min(1,k*1.6)*Math.PI*.5)-Math.max(0,k-.7)*400;D.rot=.25-.4*k;D.w=W*.6;
    for(let i=0;i<3;i++)part({x:D.x-rnd(0,180),y:D.y+rnd(-50,50),vx:rnd(-80,20),vy:rnd(-30,60),life:rnd(.5,.9),size:rnd(2,5),rgb:pick(['255,240,200','255,210,120','255,255,255']),shape:'star'});
    for(const t of xs)if(!hitDone.has(t)&&D.x>=cx(t)-60){hitDone.add(t);sfx('holy');shake(16);hitStop(70);flash('255,235,180',.4,.12);bigBoom(cx(t),midY(t),.8);toss(t,70,440);t.hurt=.45;sparks(cx(t),midY(t),['255,240,200','255,210,120','255,255,255'],36,560);}});
  D.on=false;
  // festett meteorzápor (balról-fentről átlósan)
  const fall=(t,d)=>new Promise(res=>setTimeout(()=>{const sx=cx(t)-rnd(260,420),sy=-60,tx=cx(t)+rnd(-30,30),ty=midY(t)+rnd(-10,20),ang=Math.atan2(ty-sy,tx-sx);sfx('whoosh');
    flyObj({x:sx,y:sy},{x:tx,y:ty},360,(x,y)=>{if(mt){const w=260;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.rotate(ang-Math.atan2(5.5,10.9));ctx.drawImage(mt,-w*.79,-w*mt.height/mt.width*.77,w,w*mt.height/mt.width);ctx.restore();}
      else{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'255,220,150',.9);glow(x,y,16,'255,255,240',1);ctx.restore();}part({x,y,vx:rnd(-40,40),vy:rnd(-60,0),life:.5,size:rnd(10,16),grow:20,rgb:'255,170,60',add:false,shape:'fire'});},{ease:true})
    .then(()=>{sfx('boom');shake(12);hitStop(40);bigBoom(tx,ty,.75);t.hurt=.35;res();});},d));
  const jobs=[];for(let i=0;i<14;i++){const t=xs[i%xs.length];if(t.alive)jobs.push(fall(t,i*110));}await Promise.all(jobs);
  await wait(300);for(const t of al)if(t.alive)hit(A1,t,sk);await sc.hide(400);};}

// Árnyroham: Morgána sötétséget ad Grogra (fekete-lila szalagok tekerednek rá, ő maga sötét lángba öltözik), aztán Grog egyetlen óriási söpréssel végigvág az ellenségeken
{const P0=R16P['Árnyroham'];R16P['Árnyroham']=async(A1,B1,al,sk,p)=>{const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1,pim=R17I.firepillar,sl=R17I.darkslash;
  await dimTo(.6,'15,5,30',300);await r16Raise(witch,'150,60,240');sfx('dark');
  // szalagok Morgána kezéből Grogra, spirálban rátekerednek
  const Rb={k:0,on:true};R18E({update(){return Rb.on;},draw(){if(Rb.k<=0)return;const a=handPos(witch),gx=cx(orc),top=topY(orc),bot=orc.y+orc.oy,hh=bot-top;ctx.save();ctx.lineCap='round';
    for(let j=0;j<3;j++){ctx.beginPath();const n=50;let hx=0,hy=0;for(let i=0;i<=n;i++){const q=i/n;if(q>Rb.k)break;let x,y;if(q<.5){const s=q/.5;x=a.x+(gx-a.x)*s;y=a.y+(top+hh*.25-a.y)*s-Math.sin(s*Math.PI)*(50+j*30)+Math.sin(s*9+T*6+j)*10;}
        else{const s=(q-.5)/.5,an=s*Math.PI*2.4+j*2.1;x=gx+Math.cos(an)*orc.w*orc.scale*.5;y=top+hh*(.25+.7*s)+Math.sin(an)*14;}i?ctx.lineTo(x,y):ctx.moveTo(x,y);hx=x;hy=y;}
      ctx.strokeStyle='rgba(30,0,55,.42)';ctx.lineWidth=30;ctx.stroke();ctx.strokeStyle='rgba(90,20,160,.5)';ctx.lineWidth=14;ctx.stroke();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(190,120,255,.55)';ctx.lineWidth=3;ctx.stroke();ctx.globalCompositeOperation='source-over';
      if(Rb.k<1&&Math.random()<.15)darkFlame({x:hx,y:hy,vx:rnd(-30,30),vy:-rnd(30,90),life:.35,size:rnd(10,16)});}ctx.restore();}});
  await tween(1000,k=>{Rb.k=easeIO(k);});
  // Grog sötétségbe öltözik: fekete-lila tónus, festett lila lángköpeny
  const Aura={a:0,on:true};orc._r16tint={rgb:'60,10,110',a:0};
  R18E({update(){if(Aura.on&&Aura.a>0&&Math.random()<.3)darkFlame({x:cx(orc)+rnd(-50,50),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale*.5),vx:rnd(-30,30),vy:-rnd(80,160),life:.4,size:rnd(10,18)});return Aura.on;},
    draw(){if(Aura.a<=0)return;if(pim)r17Draw(pim,cx(orc),orc.y+orc.oy+14,orc.w*orc.scale*1.7,{anchor:'bottom',add:true,a:Aura.a*(.38+.14*Math.sin(T*14)),sy:.85});ctx.save();ctx.globalCompositeOperation='lighter';
      for(const s of [-1,1])glow(cx(orc)+s*6+12,topY(orc)+orc.h*orc.scale*.16,10,'255,60,200',Aura.a);ctx.restore();}});
  sfx('fire');flash('120,40,220',.35,.15);await tween(500,k=>{Aura.a=k;orc._r16tint.a=.85*k;Rb.k=1-k*.0;});Rb.on=false;r16Lower(witch);orc._r16tint={rgb:'60,10,110',a:.85};
  // felhúzás, aztán egy hatalmas söprés végig az ellenségeken
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length,done=new Set();orc.pose='attack';
  await tween(320,k=>{orc.sq=1-.14*easeIO(k);orc.lean=-.18*k;});sfx('whoosh');sfx('slash');
  const startX=cx(orc),endX=Math.max(...xs.map(cx))+160;const Sw={on:true,x:startX,a:0};const echoes=[],sp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc;
  R18E({update(){for(const e of echoes)e.a-=.05;while(echoes.length&&echoes[0].a<=0)echoes.shift();return Sw.on||echoes.length>0;},draw(){if(sp){const hh=orc.h*orc.scale,ww=hh*sp.width/sp.height;for(const e of echoes){ctx.save();ctx.globalAlpha=e.a*.55;ctx.drawImage(tintSpr(sp,'rgb(90,30,180)',.9),e.x-ww/2,e.y-hh,ww,hh);ctx.restore();}}
    if(Sw.a>0){const L=Sw.x-startX+200;if(sl){r18Img(sl,(startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,Math.max(300,L),{add:true,a:Sw.a,sy:.9});r18Img(sl,(startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,Math.max(300,L),{a:Sw.a*.5,sy:.9});}
      else{ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(startX,0,Sw.x+80,0);g.addColorStop(0,'rgba(120,40,220,0)');g.addColorStop(1,`rgba(210,140,255,${Sw.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse((startX+Sw.x)/2+40,gy-orc.h*orc.scale*.45,L/2,60,0,0,6.29);ctx.fill();ctx.restore();}}}});
  await tween(620,k=>{const e=k*k*(3-2*k);orc.ox=(endX-startX)*e;orc.oy=(gy-orc.y)*Math.min(1,k*3);orc.lean=-.18+.5*k;Sw.x=cx(orc);Sw.a=Math.min(1,k*3);if(Math.random()<.8)echoes.push({x:cx(orc),y:orc.y+orc.oy,a:1});
    for(const t of xs)if(!done.has(t)&&cx(orc)>cx(t)-40){done.add(t);sfx('slash');shake(18);hitStop(70);for(let i=0;i<10;i++)darkFlame({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-80,80),vy:-rnd(60,180),life:.6,size:rnd(18,30)});
      sparks(cx(t),midY(t),['200,120,255','255,240,255'],30,560);toss(t,70,440);t.hurt=.55;hit(orc,t,sk);}});
  sfx('boom');flash('140,60,240',.4,.15);shake(14);await tween(400,k=>{Sw.a=1-k;Aura.a=1-k;orc._r16tint.a=.85*(1-k);});Sw.on=false;Aura.on=false;orc._r16tint=null;
  // vissza a helyére
  await tween(420,k=>{const e=easeIO(k);orc.ox=(endX-startX)*(1-e);orc.oy=(gy-orc.y)*(1-e);orc.jump=Math.sin(k*Math.PI)*70;orc.lean=.32*(1-e);});orc.ox=0;orc.oy=0;orc.jump=0;orc.lean=0;orc.sq=1;orc.pose='idle';
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);await dimTo(0,null,300);};}

// Lótuszvihar: bimbó tör fel az ellenségek alatt és kinyílik (óriás festett lótusz), festett szirmokból forgószél lesz, Jázmin nyilai belelőnek, végül a lótusz szétrobban szirmokra
{const P0=R16P['Lótuszvihar'];R16P['Lótuszvihar']=async(A1,B1,al,sk,p)=>{const im=R17I.lotus,pe=R17I.petal;if(!im)return P0(A1,B1,al,sk,p);
  const monk=A1.type==='monk'?A1:B1,fairy=monk===A1?B1:A1,{mx,gy}=grp(al);sfx('holy');await r16Raise(fairy,'255,170,210');
  const L={open:0,s:0,on:true,up:0,sp:0,burst:0,a:1};const N=110,P=[...Array(N)].map((_,i)=>({h:Math.random(),a:rnd(0,6.28),r:rnd(.75,1.25),rot:rnd(0,6.28),vr:rnd(-4,4),s:rnd(.7,1.3)}));
  const drawPetal=(x,y,rot,s,a)=>{if(pe){r18Img(pe,x,y,58*s,{rot,a});}else{ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);const g=ctx.createLinearGradient(-14*s,0,14*s,0);g.addColorStop(0,'#fff4fa');g.addColorStop(1,'#ff8cc0');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,16*s,7*s,0,0,6.29);ctx.fill();ctx.restore();}};
  R18E({update(dt){L.sp+=dt;for(const q of P){q.rot+=q.vr*dt;}return L.on;},draw(){
    if(L.s>0&&L.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-40,340*L.s,'255,160,210',.4*L.s*L.a);ctx.restore();
      // a lótusz alulról nő ki, és szirmonként nyílik: függőlegesen nyúlik, vízszintesen tárul
      r18Img(im,mx,gy+34,470*L.s*(.55+.45*L.open),{anchor:'bottom',sy:(.5+.5*L.open)*.95,a:L.a*.92});}
    if(L.up>0)for(const q of P){const h=(q.h+L.sp*.35)%1,an=q.a+L.sp*5*(1.2-h),r=(130+120*h)*q.r*L.up+L.burst*600*q.r,x=mx+Math.cos(an)*r,y=gy-60-h*380*L.up+Math.sin(an)*30-L.burst*200*q.h;drawPetal(x,y,q.rot+an,q.s,Math.min(1,L.up*1.5)*(1-L.burst));}}});
  for(let i=0;i<20;i++)part({x:mx+rnd(-80,80),y:gy-rnd(0,10),vx:rnd(-120,120),vy:-rnd(80,240),g:500,life:rnd(.6,1),size:rnd(4,8),rgb:pick(['120,90,60','90,140,70']),add:false,shape:'rock'});sfx('rock');shake(8);
  await tween(500,k=>{L.s=eOutBack(k);});sfx('holy');await tween(700,k=>{L.open=easeIO(k);});r16Lower(fairy);
  // szirom-forgószél
  sfx('wind');const wz=setInterval(()=>sfx('wind'),500);await tween(700,k=>{L.up=k;});
  monk.pose='attack';for(let i=0;i<8;i++){const a=handPos(monk),tx=mx+rnd(-140,140),ty=gy-rnd(100,320);sfx('whoosh');
    flyObj(a,{x:tx,y:ty},240,(x,y)=>{ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(ty-a.y,tx-a.x));ctx.globalCompositeOperation='lighter';glow(0,0,30,'255,190,220',.85);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#5a3a1a';ctx.fillRect(-34,-2,38,4);ctx.fillStyle='#ffe0a0';ctx.beginPath();ctx.moveTo(4,-8);ctx.lineTo(20,0);ctx.lineTo(4,8);ctx.fill();ctx.restore();})
    .then(()=>{sfx('holy');for(let j=0;j<18;j++)part({x:tx,y:ty,vx:rnd(-300,300),vy:rnd(-300,220),drag:2,life:rnd(.5,.8),size:rnd(4,8),rgb:pick(['255,182,214','255,240,246','255,220,120']),shape:'star'});for(const t of al)if(t.alive&&Math.abs(cx(t)-tx)<120){t.hurt=.3;shake(6);}});await wait(120);}
  monk.pose='idle';await wait(250);
  // a lótusz összecsukódik az ellenségeken, aztán szétrobban – a szirmok szétszóródnak
  await tween(260,k=>{L.open=1-.6*k;});flash('255,200,230',.55,.22);shake(22);hitStop(120);sfx('boom');sfx('holy');clearInterval(wz);
  for(const t of al){if(!t.alive)continue;toss(t,70,460);t.hurt=.5;hit(monk,t,sk);}for(let i=0;i<40;i++)part({x:mx+rnd(-100,100),y:gy-rnd(20,200),vx:rnd(-520,520),vy:rnd(-520,200),drag:1.5,life:rnd(.6,1),size:rnd(4,9),rgb:pick(['255,182,214','255,240,246','255,220,120']),shape:'star'});
  await tween(700,k=>{L.burst=k;L.a=1-k;L.open=.4+.6*k;});L.on=false;};}

// Sárkánynyíl: Zordon lángot ad Jázmin nyilára; a kilőtt nyílból a festett tűzsárkány bomlik ki, nagyban, lassan kígyózva végigrepül, minden ellenséget lángba borít, mögötte ég a föld
{const P0=R16P['Sárkánynyíl'];R16P['Sárkánynyíl']=async(A1,B1,al,sk,p)=>{const im=R17I.firedragon;if(!im)return P0(A1,B1,al,sk,p);
  const wiz=A1.type==='wizard'?A1:B1,monk=wiz===A1?B1:A1;await dimTo(.45,'40,15,0',300);await r16Raise(wiz,'255,150,60');
  const ch=setInterval(()=>{const a=handPos(wiz),b=handPos(monk);for(let i=0;i<4;i++){const q=Math.random();part({x:a.x+(b.x-a.x)*q+rnd(-8,8),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*70,vx:(b.x-a.x)*.8,vy:(b.y-a.y)*.8,drag:1.2,life:rnd(.3,.5),size:rnd(10,18),grow:24,rgb:'255,150,40',add:false,shape:'fire'});}},35);
  sfx('fire');monk.pose='attack';const Bw={a:0,on:true};R18E({update(){return Bw.on;},draw(){if(Bw.a<=0)return;const b=handPos(monk);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,90*Bw.a,'255,140,40',.8*Bw.a);glow(b.x,b.y,30*Bw.a,'255,240,200',Bw.a);ctx.restore();}});
  await tween(1000,k=>{Bw.a=k;});clearInterval(ch);r16Lower(wiz);sfx('whoosh');sfx('fire');sfx('roar');rumble(1.6,10);flash('255,170,80',.45,.18);
  const o=handPos(monk);Bw.on=false;const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),y=xs.reduce((s,t)=>s+midY(t),0)/xs.length,D={x:o.x,y:o.y,s:.15,on:true,rot:0},done=new Set(),x1=W+480,burn=[];
  R18E({update(){if(D.on&&Math.random()<.6)part({x:D.x-W*.62*D.s*rnd(.55,.75),y:D.y+rnd(-30,30)*D.s,vx:rnd(-160,-60),vy:rnd(-60,20),drag:1.4,life:rnd(.3,.5),size:rnd(12,20),grow:24,rgb:'255,160,40',add:false,shape:'fire'});return D.on;},
    draw(){if(!D.on)return;const w=W*.62*D.s;ctx.save();ctx.globalCompositeOperation='lighter';glow(D.x,D.y,w*.45,'255,130,30',.4);ctx.restore();r17Draw(im,D.x-w*.25,D.y-10,w,{rot:D.rot});r17Draw(im,D.x-w*.25,D.y-10,w,{add:true,a:.6,rot:D.rot});}});
  // égő földcsík a sárkány útja alatt
  const gy=xs.reduce((s,t)=>s+t.y+t.oy,0)/xs.length,Bn={x0:o.x,x:o.x,a:1,on:true};R18E({update(){if(Bn.on&&Math.random()<.9)part({x:rnd(Bn.x0,Bn.x),y:gy+rnd(-6,8),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.4,.7),size:rnd(14,24),grow:20,rgb:'255,150,40',add:false,shape:'fire'});return Bn.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(Bn.x0,0,Bn.x,0);g.addColorStop(0,'rgba(255,120,30,0)');g.addColorStop(1,`rgba(255,150,40,${.5*Bn.a})`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse((Bn.x0+Bn.x)/2,gy+4,(Bn.x-Bn.x0)/2,16,0,0,6.29);ctx.fill();ctx.restore();}});
  await tween(2400,k=>{const e=k<.15?k/.15*.1:.1+.9*((k-.15)/.85);D.x=o.x+(x1-o.x)*e;D.y=o.y+(y-o.y)*Math.min(1,k*3)+Math.sin(k*Math.PI*3)*45;D.rot=Math.cos(k*Math.PI*3)*.12;D.s=.15+.85*Math.min(1,k*4);Bn.x=Math.min(W,Math.max(Bn.x,D.x-80));
    for(const t of xs)if(!done.has(t)&&D.x>=cx(t)-40){done.add(t);sfx('fire');sfx('boom');shake(18);hitStop(80);bigBoom(cx(t),midY(t),.9);fireBurst(cx(t),t.y+t.oy-20,18,[18,30],220);toss(t,70,460);t.hurt=.55;hit(monk,t,sk);}});
  D.on=false;await wait(500);await tween(500,k=>{Bn.a=1-k;});Bn.on=false;for(const t of xs)if(!done.has(t)&&t.alive)hit(monk,t,sk);monk.pose='idle';await dimTo(0,null,300);};}

// Tündérököl: Lili aranyfénnyel tölti meg Grogot (nő, ragyog), Grog magasra ugrik és ököllel a földbe csap: festett aranyrobbanás, a földön végiggördülő fényhullám, minden ellenség alól fényoszlop tör fel
{R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const im=R17I.goldburst,fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;await dimTo(.45,'40,30,0',300);
  const fx0=fairy.ox||0,fy0=fairy.oy||0,dxF=cx(orc)-cx(fairy),dyF=topY(orc)-30-midY(fairy);
  await tween(420,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*e;fairy.oy=fy0+dyF*e;});fairy.pose='cast';sfx('holy');
  const dust=setInterval(()=>{for(let i=0;i<6;i++)part({x:cx(fairy)+rnd(-24,24),y:midY(fairy)+10,vx:rnd(-50,50),vy:rnd(60,180),g:120,life:rnd(.8,1.2),size:rnd(2,5),rgb:pick(['255,230,120','255,255,255']),shape:'star'});},35);
  const Au={a:0,on:true};R18E({update(){return Au.on;},draw(){if(Au.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(orc),midY(orc),orc.h*orc.scale*.9,'255,210,90',.45*Au.a);if(im)r17Draw(im,cx(orc),midY(orc),orc.h*orc.scale*2.2,{add:true,a:.35*Au.a*(.8+.2*Math.sin(T*10))});ctx.restore();}});
  orc._r16tint={rgb:'255,210,90',a:0};const s0=orc.scale;await tween(800,k=>{orc._r16tint.a=.6*k;orc.scale=s0*(1+.3*easeIO(k));Au.a=k;});clearInterval(dust);
  await tween(320,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*(1-e);fairy.oy=fy0+dyF*(1-e);});fairy.ox=fx0;fairy.oy=fy0;fairy.pose='idle';
  const t0=al.slice().sort((a,b)=>cx(a)-cx(b))[0],ox0=orc.ox||0,oy0=orc.oy||0,dX=(cx(t0)-t0.w*t0.scale*.5-orc.w*orc.scale*.5-30)-cx(orc),dY=(t0.y+t0.oy)-(orc.y+orc.oy);orc.pose='attack';sfx('whoosh');
  await tween(320,k=>{const e=easeIO(k);orc.ox=ox0+dX*e;orc.oy=oy0+dY*e;orc.jump=Math.sin(k*Math.PI)*30;});orc.jump=0;
  await tween(360,k=>{orc.jump=140*Math.sin(k*Math.PI*.5);orc.lean=.2*k;});await wait(80);await tween(150,k=>{orc.jump=140*(1-k*k);orc.lean=.2-.55*k;});orc.jump=0;
  const ix=cx(orc)+orc.w*orc.scale*.45,{gy}=grp(al);sfx('boom');sfx('boom');sfx('holy');flash('255,240,180',.7,.28);shake(28);rumble(1.2,12);hitStop(160);punch(ix,gy,.1);
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
