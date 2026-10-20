// ===== 25. kör: Kaelen képességei látványosan, festett képekkel (a régi rajzolt lombcsomó, bot-ököl, apró virágok helyett) =====

// Tövisvihar: festett, tüskés indaforgószél nő ki Kaelen botjából, óriásira hízik, végigsöpör az ellenségeken (tüskék, levelek, felhasított sebek)
A.thornStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,240,.12);sfx('wind');const h=handPos(u),im=R17I.thornstorm;
  const gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length+10,T={x:h.x,y:h.y,s:.15,a:1,t:0,on:true};
  effects.push({update(dt){T.t+=dt;if(T.on&&T.s>.5)for(let i=0;i<3;i++)part({x:T.x+rnd(-90,90)*T.s,y:T.y-rnd(0,320)*T.s,vx:rnd(-260,260),vy:rnd(-200,60),life:rnd(.5,.9),size:rnd(7,13),rgb:pick(['108,191,58','77,154,42','155,216,90']),add:false,shape:'leaf',g:120});return T.a>0;},
    draw(){if(T.a<=0)return;const H=420*T.s;if(im){ctx.save();ctx.globalAlpha=T.a;ctx.translate(T.x,T.y);for(let k=0;k<2;k++){ctx.save();ctx.scale(Math.cos(T.t*9+k*1.6)>0?1:-1,1);ctx.globalAlpha=T.a*(k?.45:1);r17Draw(im,0,0,H*im.width/im.height,{anchor:'bottom'});ctx.restore();}ctx.restore();}
      else{ctx.save();ctx.globalAlpha=T.a;for(let i=0;i<60;i++){const q=i/60,a=q*30+T.t*9,r=(20+q*120)*T.s;pLeaf(T.x+Math.cos(a)*r,T.y-q*H+Math.sin(a)*r*.25,1.4,a,1,'#5ea832');}ctx.restore();}}});
  // kinő a bothegyből és leszáll a földre
  await tween(450,k=>{T.s=.15+.85*eOutBack(k);T.y=h.y+(gy-h.y)*k;});bodyStrike(u,160,-.2);sfx('whoosh');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x0=T.x,x1=cx(xs[xs.length-1])+60,done=new Set();const wnd=setInterval(()=>sfx('wind'),300);
  await tween(1300,k=>{T.x=x0+(x1-x0)*easeIO(k);T.s=1+.08*Math.sin(k*30);for(const t of xs)if(!done.has(t)&&T.x>cx(t)-40){done.add(t);sfx('slash');shake(12);hitStop(60);t.hurt=.5;toss(t,60,420);
      for(let n=0;n<3;n++)clawMarks(cx(t)+rnd(-20,20),midY(t)+rnd(-30,30),Math.max(130,bigOf(t)*.8),rnd(-.9,.9),'120,200,80');
      for(let n=0;n<24;n++)part({x:cx(t),y:midY(t),vx:rnd(-380,380),vy:rnd(-360,80),g:500,life:.8,size:rnd(8,14),rgb:pick(['108,191,58','77,154,42']),add:false,shape:'leaf'});hit(u,t,sk);}});
  clearInterval(wnd);for(const t of xs)if(!done.has(t)&&t.alive)hit(u,t,sk);T.on=false;await tween(450,k=>{T.a=1-k;T.s=1-.5*k;});await bodySettle(u);}finally{rel();}};

// Gombaspóra: nagyobb festett gombák törnek fel, pöfögve sűrű, gomolygó spórafelhőt fújnak (lila-zöld), az ellenségek köhögve eltűnnek benne
{const sp0=A.sporeShrooms;A.sporeShrooms=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const im=R17I.mushroom;if(!im||!al.length)return sp0(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,240,.1);sfx('quake');rumble&&rumble(.8,5);
  const M=al.map(t=>({t,k:0,pf:0,list:[[-80,.85],[0,1.25],[70,.7],[-30,.55],[110,.5]]}));const E={a:1};
  effects.push({update(){return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;for(const m of M){const gx=cx(m.t),gy=m.t.y+m.t.oy+16;for(const [dx,s] of m.list){const sq=1+.12*Math.sin(m.pf*Math.PI);r17Draw(im,gx+dx*1.3,gy,250*s*m.k*sq,{anchor:'bottom',sy:1/sq});}}ctx.restore();}});
  for(const m of M){for(let i=0;i<16;i++)part({x:cx(m.t)+rnd(-90,90),y:m.t.y+m.t.oy,vx:rnd(-200,200),vy:rnd(-340,-120),g:800,life:.8,size:rnd(5,10),rgb:'110,85,55',add:false,shape:'rock'});tween(380,k=>m.k=eOutBack(k));await wait(120);}
  await wait(300);for(let r=0;r<3;r++){sfx('dust');for(const m of M){tween(260,k=>m.pf=Math.sin(k*Math.PI));const gx=cx(m.t),gy=m.t.y+m.t.oy-120;
      for(let i=0;i<30;i++)part({x:gx+rnd(-80,80),y:gy+rnd(-30,30),vx:rnd(-140,140),vy:rnd(-220,-30),life:rnd(1.2,1.9),size:rnd(26,46),grow:40,rgb:pick(['180,110,220','130,190,80','220,190,240','160,90,200']),add:false,shape:'smoke',drag:1.2});m.t.hurt=.3;}await wait(380);}
  for(const m of M){hit(u,m.t,sk);if(m.t.alive&&!(m.t.d&&m.t.d.boss)&&Math.random()<.3)addStatus(m.t,'sleep',1);}
  await wait(600);await tween(500,k=>{for(const m of M)m.k=1-k;E.a=1-k*.5;});E.a=0;await bodySettle(u);}finally{rel();}};}

// Harmatkör (gyógyítás): Kaelen botjából festett óriás tealevelek borulnak a csapat fölé, a csúcsukról nagy, csillogó harmatcseppek hullanak a hősökre, mindegyiknél gyógyító fénycsobbanás
A.dewCircle=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,220,.1);sfx('heal');const im=R17I.dewleaves,xs=al.map(cx),x0=Math.min(...xs)-120,x1=Math.max(...xs)+120,top=Math.min(...al.map(topY))-150;
  const L={k:0,a:1,t:0};effects.push({update(dt){L.t+=dt;return L.a>0;},draw(){if(L.k<=0)return;ctx.save();ctx.globalAlpha=L.a;const w=(x1-x0)*1.15;
      if(im)r17Draw(im,(x0+x1)/2,top+Math.sin(L.t*2)*6,w*L.k,{rot:Math.sin(L.t*1.5)*.03});else for(let i=0;i<7;i++)pLeaf(x0+(x1-x0)*i/6,top,6*L.k,Math.PI/2,1,'#5ea832');ctx.restore();}});
  const h=handPos(u);kaeLeaves(h.x,h.y,30,300);await tween(500,k=>L.k=eOutBack(k));
  const Dr=[];for(let i=0;i<70;i++){const t=pick(al);Dr.push({x:cx(t)+rnd(-60,60),y:top+20+rnd(-10,20),ty:midY(t)+rnd(-40,40),t,d:i*25,vy:0,done:false,s:rnd(5,10)});}
  const D={t:0,on:true};effects.push({update(dt){D.t+=dt*1000;for(const d of Dr)if(D.t>d.d&&!d.done){d.vy+=900*dt;d.y+=d.vy*dt;if(d.y>=d.ty){d.done=true;d.t.hurt=0;for(let n=0;n<5;n++)part({x:d.x,y:d.ty,vx:rnd(-90,90),vy:rnd(-140,-20),g:500,life:.5,size:rnd(2,4),rgb:'200,245,255',shape:'dot'});}}return D.on;},
    draw(){ctx.save();for(const d of Dr){if(D.t<d.d||d.done)continue;ctx.globalCompositeOperation='lighter';glow(d.x,d.y,d.s*2.2,'170,230,255',.6);ctx.globalCompositeOperation='source-over';const g=ctx.createRadialGradient(d.x-d.s*.3,d.y-d.s*.3,1,d.x,d.y,d.s);g.addColorStop(0,'#ffffff');g.addColorStop(.5,'#c9f1ff');g.addColorStop(1,'rgba(120,200,240,.8)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(d.x,d.y-d.s*1.7);ctx.quadraticCurveTo(d.x+d.s,d.y-d.s*.2,d.x,d.y+d.s);ctx.quadraticCurveTo(d.x-d.s,d.y-d.s*.2,d.x,d.y-d.s*1.7);ctx.fill();}ctx.restore();}});
  await wait(1100);for(const t of al){sfx('heal');R18E({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),t.h*t.scale*(.4+.5*k),'150,240,190',.6*(1-k));ctx.restore();}});
    for(let n=0;n<12;n++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy-rnd(0,t.h*t.scale),vx:rnd(-20,20),vy:-rnd(40,110),life:1,size:rnd(3,6),rgb:pick(['170,255,200','220,255,230']),shape:'star'});hit(u,t,sk);await wait(70);}
  await wait(500);D.on=false;await tween(450,k=>L.a=1-k);await bodySettle(u);}finally{rel();}};

// Virágzó élet: az elesett társ alatt festett virágkör nyílik ki szirmonként, fényoszlop emeli fel, szirmok szállnak
A.bloomRevive=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,220,.1);sfx('heal');const im=R17I.bloomring,gx=cx(t),gy=t.y+t.oy+8;
  const B={k:0,a:1,t:0};effects.unshift({update(dt){B.t+=dt;if(B.k>.5&&Math.random()<.5)part({x:gx+rnd(-140,140),y:gy-rnd(0,20),vx:rnd(-40,40),vy:-rnd(60,160),life:1.2,size:rnd(6,11),rgb:pick(['255,154,200','255,211,107','255,255,255','201,155,255']),add:false,shape:'leaf',g:-20});return B.a>0;},
    draw(){if(B.k<=0)return;ctx.save();ctx.globalAlpha=B.a;ctx.globalCompositeOperation='lighter';glow(gx,gy-20,200*B.k,'255,200,230',.4);ctx.restore();ctx.save();ctx.globalAlpha=B.a;
      if(im){ctx.translate(gx,gy);ctx.scale(1,.42);ctx.rotate(B.t*.4);r17Draw(im,0,0,380*B.k);}else{for(let i=0;i<14;i++){const a=i/14*6.28;ctx.fillStyle=i%2?'#ff9ac8':'#ffd36b';ctx.beginPath();ctx.ellipse(gx+Math.cos(a)*120*B.k,gy+Math.sin(a)*40*B.k,22*B.k,14*B.k,a,0,7);ctx.fill();}}ctx.restore();}});
  const h=handPos(u);for(let i=0;i<24;i++)setTimeout(()=>part({x:h.x,y:h.y,vx:(gx-h.x)*rnd(1.5,2),vy:(gy-60-h.y)*rnd(1.5,2)-rnd(40,120),life:.6,size:rnd(5,9),rgb:pick(['255,154,200','255,211,107']),add:false,shape:'leaf'}),i*25);
  await tween(900,k=>B.k=easeIO(k));sfx('holy');lightPillar&&lightPillar(gx,gy,130,1.1);flash('255,235,245',.4,.25);await wait(250);hit(u,t,sk);
  await wait(800);await tween(500,k=>B.a=1-k);await bodySettle(u);}finally{rel();}};

// Ősi Tölgy ökle: a festett tölgyököl nagyobb, a föld megreped alatta, és felülről lecsap (nem oldalról)
{const o0=A.oakFist;A.oakFist=async(u,ts,sk)=>{const im=R17I.oakfist,t=ts[0];if(!im||!t)return o0(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,.14);u.pose='attack';await bodyStrike(u,160,-.22);sfx('quake');rumble&&rumble(1,8);
  const bx=cx(t)-t.w*t.scale*.7-40,gy=t.y+t.oy+24,Hh=Math.max(420,t.h*t.scale*2.4),F={k:0,a:1,rot:-.15};groundCrack&&groundCrack(bx,gy-10,'120,90,60',200);
  effects.push({update(){return F.a>0;},draw(){if(F.k<=0)return;ctx.save();ctx.globalAlpha=F.a;r17Draw(im,bx,gy,Hh*im.width/im.height,{anchor:'bottom',sy:F.k,rot:F.rot});ctx.restore();}});
  for(let i=0;i<50;i++)part({x:bx+rnd(-90,90),y:gy,vx:rnd(-240,240),vy:rnd(-520,-180),life:1,size:rnd(7,14),rgb:pick(['120,90,60','90,70,45']),g:800,add:false,shape:'rock'});kaeLeaves(bx,gy-80,40,360,160);
  await tween(520,k=>F.k=eOutBack(k));sfx('growl');await wait(160);await tween(200,k=>F.rot=-.15+.95*k*k);
  shake(34);sfx('boom');sfx('quake');flash('255,240,200',.45,.2);hitStop&&hitStop(140);dustWave&&dustWave(cx(t),t.y+t.oy);kaeLeaves(cx(t),midY(t),60,460);t.hurt=.6;toss(t,40,300);hit(u,t,sk);
  await wait(500);await tween(450,k=>{F.k=1-k;F.rot=.8-.3*k;});F.a=0;await bodySettle(u);}finally{rel();}};}

// ===== Árny-csapat (a felhasználó választása: „Árnysereg a földből”): a hősök árnyékából fekete-lila árnykezek és árnyharcosok törnek elő, lerántják és összetépik az ellenségeket, a végén visszahúzódnak a hősök lába alá
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>null;sh.desc='A hősök árnyékából árnysereg tör elő: árnykezek rántják le az ellenségeket, árnyharcosok tépik össze őket – erős sötét sebzés mindenkire.';
  sh.run=async(P,S0)=>{const hs=S.heroes.filter(h=>h.alive),fs=foesAlive();if(!fs.length)return;await dimTo(.82,'4,0,10',300);sfx('dark');rumble&&rumble(1,8);
   const arm=R17I.wraitharm,E={t:0,on:true};
   // a hősök árnyéka kiterjed a földön az ellenségekig
   const pool={k:0,a:1};effects.unshift({update(dt){E.t+=dt;return pool.a>0;},draw(){if(pool.k<=0)return;const x0=Math.min(...hs.map(cx))-60,x1=Math.max(...fs.map(cx))+140,gy=Math.max(...fs.map(t=>t.y+t.oy))+6;ctx.save();ctx.globalAlpha=pool.a;
     const xe=x0+(x1-x0)*pool.k,g=ctx.createLinearGradient(x0,0,xe,0);g.addColorStop(0,'rgba(10,0,20,.85)');g.addColorStop(.9,'rgba(40,10,70,.8)');g.addColorStop(1,'rgba(60,20,110,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse((x0+xe)/2,gy,(xe-x0)/2,26,0,0,7);ctx.fill();ctx.restore();}});
   await tween(420,k=>pool.k=easeIO(k));
   // árnyharcosok: minden hős fekete-lila mása kiemelkedik a saját árnyékából és rohan
   // (ma06 3.: „hatásosabb, nagyszabásúbb”) minden hős mellé egy második árnymás is kiemelkedik (kicsit hátrébb), így kétszer annyian rohamoznak
   const war=[...hs.map((h,i)=>({h,x:cx(h),y:h.y+h.oy,rise:0,t:fs[i%fs.length],a:1})),...hs.map((h,i)=>({h,x:cx(h)-50,y:h.y+h.oy-28,rise:0,t:fs[(i+1)%fs.length],a:.85,ghost:true}))];
   const H=[];for(const t of fs)for(let i=0;i<3;i++)H.push({t,dx:(i-1)*t.w*t.scale*.45,k:0,rot:(i-1)*.35,grip:0});
   effects.push({update(){return E.on;},draw(){for(const q of H){if(q.k<=0)continue;const x=cx(q.t)+q.dx,gy=q.t.y+q.t.oy+10,L=Math.max(260,q.t.h*q.t.scale*1.4)*q.k;ctx.save();
       if(arm){ctx.globalAlpha=.95;ctx.translate(x,gy);ctx.rotate(q.rot*(1-q.grip*.6));r17Draw(tintSpr(arm,'rgb(18,4,30)',.65),0,0,L*arm.width/arm.height,{anchor:'bottom'});ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.25;r17Draw(arm,0,0,L*arm.width/arm.height,{anchor:'bottom'});}ctx.restore();}
     for(const w of war){if(w.rise<=0)continue;const sp=ENEMY_SPR[w.h.type+'-attack']||ENEMY_SPR[w.h.type];if(!sp)continue;const hh=w.h.h*w.h.scale*1.3/* (ma06: nagyobb, de nem túl nagy) */,ww=hh*sp.width/sp.height,vis=hh*w.rise;ctx.save();ctx.beginPath();ctx.rect(w.x-ww,w.y-hh-40,ww*2,hh+40);ctx.clip();
       ctx.globalAlpha=w.a;ctx.drawImage(tintSpr(sp,'rgb(6,0,12)',.98),w.x-ww/2,w.y-vis,ww,hh);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=w.a*.08;for(const [ox,oy] of [[-3,0],[3,0],[0,-3]])ctx.drawImage(tintSpr(sp,'rgb(170,90,255)',1),w.x-ww/2+ox,w.y-vis+oy,ww,hh);
       ctx.globalCompositeOperation='source-over';ctx.globalCompositeOperation='lighter';for(const s of [-1,1]){const ex=w.x+s*ww*.07,ey=w.y-vis+hh*.17;glow(ex,ey,14,'255,30,40',.9);ctx.fillStyle='rgba(255,220,220,1)';ctx.beginPath();ctx.arc(ex,ey,2.4,0,7);ctx.fill();}ctx.restore();}}});
   sfx('wail');sfx('growl');await tween(380,k=>{for(const w of war)w.rise=easeIO(k);});
   // árnykezek törnek fel az ellenségek alól és megragadják őket
   // (a felhasználó kérésére nincsenek felnyúló árnykarok)
   // az árnyharcosok rohannak és lecsapnak
   // (ma06 „száguldjanak végig az ellenfeleken”): minden árnyharcos egyetlen rohamban végigszáguld az összes ellenfélen
   // és kifut a kép szélén; ahol áthalad, ott festett sötétlila vágásív (fx7-darkslash) hasít, a saját célpontját meg is sebzi
   const slashAt=(t2,wi)=>{const sl=R17I.darkslash,sx=cx(t2),sy=midY(t2),sz=Math.max(320,t2.h*t2.scale*2.2),rot=(wi%2?.75:-.75),C={k:0,a:1};
     if(sl)R18E({update(){return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.translate(sx,sy);ctx.rotate(rot);const w2=sz,h2=w2*sl.height/sl.width;
       ctx.beginPath();ctx.rect(-w2/2,-h2,w2*C.k,h2*2);ctx.clip();ctx.globalAlpha=C.a;ctx.drawImage(sl,-w2/2,-h2/2,w2,h2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=C.a*.45;ctx.drawImage(sl,-w2/2,-h2/2,w2,h2);ctx.restore();}});
     sfx('slash');tween(100,k=>{C.k=k;}).then(()=>tween(300,k=>{C.a=1-k;}));/* (ma06 4.: lángok nem kellenek) */t2.hurt=.4;shake(10);};
   await Promise.all(war.map((w,wi)=>wait(wi*110).then(async()=>{const x0=w.x,xe=W+260,passed=new Set();sfx('whoosh');if(wi%2===0)sfx('wail');
     await tween(620,k=>{const e=k<.15?k*k/.3:k-.075;w.x=x0+(xe-x0)*Math.min(1,e/.925);
       for(const t2 of fs)if(!passed.has(t2)&&w.x>=cx(t2)){passed.add(t2);/* (50. kör: „a pengék kuszák”) csak a valódi árnyharcos vág, és csak a saját célpontján */if(!w.ghost&&t2===w.t){slashAt(t2,wi);hitStop(40);}
         if(t2===w.t&&!w.ghost){S._r21noSink=true;try{hit(w.h,w.t,{...ATTACKS[w.h.type],name:'Árnycsapás',kind:'mag',pow:2.4,elem:'dark',anim:'summon'});}finally{S._r21noSink=false;}}}});
     w.a=0;})));
   // végső csapás: egy hatalmas festett vágásív hasít végig az összes ellenfélen, fölötte a festett viharkoponya
   {const sl=R17I.darkslash,sk2=R17I.stormskull,x0=Math.min(...fs.map(cx))-80,x1=Math.max(...fs.map(cx))+120,yy=Math.min(...fs.map(midY)),C={k:0,a:1};sfx('slash');sfx('roar');
    R18E({update(){return C.a>0;},draw(){const w2=(x1-x0)*1.6,h2=sl?w2*sl.height/sl.width:0;ctx.save();ctx.globalAlpha=C.a;
      /* (ma06 4.: a viharkoponya-felhő nem kell) */
      if(sl){ctx.translate((x0+x1)/2,yy);ctx.rotate(-.35);ctx.beginPath();ctx.rect(-w2/2,-h2,w2*C.k,h2*2);ctx.clip();ctx.drawImage(sl,-w2/2,-h2/2,w2,h2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=C.a*.5;ctx.drawImage(sl,-w2/2,-h2/2,w2,h2);}ctx.restore();}});
    await tween(160,k=>{C.k=k;});hitStop(120);tween(500,k=>{C.a=1-k;});}
   await wait(200);flash('120,40,200',.45,.2);shake(22);sfx('boom');for(const t of fs){/* (A5: vékony kör nem kell; ma06 4.: láng sem) */toss(t,40,320);}
   // visszahúzódnak a hősök lába alá
   await tween(400,k=>{for(const w of war){w.rise=1-k;w.a=1-k*.5;}pool.k=1-k;});for(const t of fs)if(t.oy0!=null){t.oy=t.oy0;delete t.oy0;}
   E.on=false;pool.a=0;await dimTo(0,null,300);};}}

// ===== Villámdenevér (idézés, újra): egy óriás villámdenevér csap le kitárt szárnyakkal, a szárnyai között villámívek; minden ellenségen elektromos harapás, majd a raj és az égi villámok
{const tb=SUMMONS.find(x=>x.id==='tbat');if(tb)tb.img=()=>null;if(tb)tb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const sp=ENEMY_SPR['tbat-attack']||ENEMY_SPR.tbat;await dimTo(.72,'5,5,25',300);
  const B={x:S0.x+40,y:S0.y-200,s:.4,a:1,flap:0,on:true};sfx('sonic');
  effects.push({update(dt){B.flap+=dt*14;return B.on;},draw(){if(!sp)return;const hh=260*B.s,ww=hh*sp.width/sp.height;ctx.save();ctx.translate(B.x,B.y);ctx.globalCompositeOperation='lighter';glow(0,0,hh*.8,'255,230,90',.45);ctx.restore();
    if(Math.random()<.9)for(let i=0;i<2;i++)r16Bolt(B.x-ww*.45,B.y-hh*.1+rnd(-20,20),B.x+ww*.45,B.y-hh*.1+rnd(-20,20),'255,230,90',5);
    ctx.save();ctx.translate(B.x,B.y);ctx.scale(-1,1+.18*Math.sin(B.flap));ctx.drawImage(sp,-ww/2,-hh/2,ww,hh);ctx.restore();}});
  await tween(450,k=>{B.s=.4+1.4*eOutBack(k);B.y=S0.y-200-40*k;});sfx('sonic');shake(12);flash('255,250,190',.35,.12);
  // hanghullám-sikoly (villódzó, sárga)
  for(const t of fs)soundBlast&&soundBlast(cx(t),midY(t),'255,230,90',240,520);await wait(300);
  for(const t of fs.slice().sort((a,b)=>cx(a)-cx(b))){const x0=B.x,y0=B.y;sfx('whoosh');await tween(240,k=>{B.x=x0+(cx(t)-x0)*easeIO(k);B.y=y0+(midY(t)-60-y0)*easeIO(k);});
    sfx('bite');sfx('thunder');shake(16);hitStop(80);flash('255,252,200',.4,.08);for(let k2=0;k2<3;k2++)fxBeam('thunder',cx(t)+rnd(-60,60),0,cx(t)+rnd(-15,15),t.y+t.oy+10,{w:140,life:.35});
    sparks(cx(t),midY(t),['255,240,140','255,255,255'],30,520);t.hurt=.5;toss(t,50,360);hit(P,t,{name:'Villámharapás',kind:'mag',pow:1.9,elem:'thunder',tgt:'enemies',anim:'chainbolt',status:['stun',.4,1]});await wait(120);}
  await tween(400,k=>{B.y-=12;B.s=1.8-.6*k;B.a=1-k;});B.on=false;await dimTo(0,null,300);};}

// ===== Bambuszcsapás (újra): Kaelen a bothegyből három NAGY, zöld energiával izzó festett bambuszlándzsát lő ki; becsapódáskor beállnak az ellenfélbe, és alóla bambuszszárak törnek fel
A.druidSpears=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,260,.18);sfx('whoosh');const h=handPos(u),tx=cx(t),ty=midY(t),im=FX_IMG.bamboospear;
  // a bothegyen zöld erő gyűlik
  const C={a:0};R18E({update(){return C.a>0||!C.done;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,70*C.a,'150,240,90',.8*C.a);ctx.restore();}});kaeLeaves(h.x,h.y,20,200);await tween(260,k=>C.a=k);
  bodyStrike(u,160,-.26);C.done=true;C.a=0;const st={a:1},stuck=[];
  const fl=[];for(let i=0;i<3;i++){const oy=(i-1)*44;fl.push(new Promise(res=>setTimeout(()=>{sfx('whoosh');fxFly('bamboospear',h.x,h.y+oy*.3,tx-20+i*10,ty+oy,260,{size:480,arc:30+i*10,trail:['150,240,90','220,255,170']}).then(()=>{
      shake(14);hitStop(50);sfx('hit');kaeLeaves(tx,ty+oy,22,320);burst(tx,ty+oy,'200,250,140',22,320);stuck.push({x:tx-40+i*10,y:ty+oy,r:.1*(i-1)});t.hurt=.4;res();});},i*90)));}
  effects.push({update(){return st.a>0;},draw(){if(!im)return;ctx.save();ctx.globalAlpha=st.a;for(const s of stuck){ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.drawImage(im,-240,-240,480,480);ctx.restore();}ctx.restore();}});
  await Promise.all(fl);
  // bambuszszárak törnek fel az ellenfél alól
  const gy=t.y+t.oy+10,B=[];for(let i=0;i<7;i++)B.push({x:tx+(i-3)*26,h:rnd(220,340),k:0,l:rnd(-.15,.15)});sfx('rock');shake(16);
  effects.push({update(){return st.a>0;},draw(){ctx.save();ctx.globalAlpha=st.a;for(const b of B)if(b.k>0)kaeStalk(b.x,gy,b.h*b.k,24,1,b.l);ctx.restore();}});
  for(let i=0;i<24;i++)part({x:tx+rnd(-90,90),y:gy,vx:rnd(-220,220),vy:rnd(-420,-150),g:800,life:.8,size:rnd(6,11),rgb:'120,95,60',add:false,shape:'rock'});
  await tween(260,k=>{for(const b of B)b.k=eOutBack(k);});toss(t,70,440);hit(u,t,sk);await wait(500);await tween(400,k=>{st.a=1-k;for(const b of B)b.k=1-k;});await bodySettle(u);}finally{rel();}};

// ===== Kaelen páros támadásai (újra, nagyban, festett képekkel) =====
function r21GroveBurst(x,gy,w,k,a=1){const im=R17I.bamboogrove;if(im){ctx.save();ctx.globalAlpha*=a;r17Draw(im,x,gy+10,w,{anchor:'bottom',sy:Math.max(.01,k)});ctx.restore();}else for(let i=-3;i<=3;i++)kaeStalk(x+i*26,gy,w*1.2*k,24,a,i*.03);}
// Medvelovaglás: óriás medve (kétszer akkora), Grog a hátán; minden ellenségnél a medve felágaskodik és lecsap, Grog fejszéje lecsap; földrengés, repedések
R16P['Medvelovaglás']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,orc=dr===A1?B1:A1,osp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc;await dimTo(.35,'30,20,10',250);
  kaeLeaves(cx(dr),midY(dr),80,460);sfx('growl');flash('150,230,90',.3,.15);const a0=dr.alpha==null?1:dr.alpha,b0=orc.alpha==null?1:orc.alpha;
  const B={x:cx(dr),y:dr.y+dr.oy+8,s:.4,a:0,rot:0,rider:0,ry:0,on:true,key:'wsbear'};const W0=560;
  effects.push({update(){if(B.on&&B.run)for(let i=0;i<3;i++)part({x:B.x-W0*.3+rnd(-60,60),y:B.y,vx:rnd(-300,-80),vy:-rnd(30,160),life:.8,size:rnd(26,44),grow:30,rgb:'170,140,100',add:false,shape:'smoke'});return B.on;},
    draw(){if(B.a<=0)return;ctx.save();ctx.globalAlpha=B.a;const im=R17I[B.key]||R17I.wsbear,w=W0*B.s*(B.key==='wsbear2'?.55:1);if(im)r17Draw(im,B.x,B.y,w,{anchor:'bottom',rot:B.rot});
      if(B.rider&&osp&&B.key==='wsbear'){const bh=im?w*im.height/im.width:w*.68,hh=orc.h*orc.scale*1.1,ww=hh*osp.width/osp.height;ctx.save();ctx.translate(B.x-w*.08,B.y-bh*.62+hh*.3+B.ry);ctx.rotate(B.rot);ctx.drawImage(osp,-ww/2,-hh,ww,hh);ctx.restore();}ctx.restore();}});
  await tween(380,k=>{dr.alpha=a0*(1-k);B.a=k;B.s=.4+.6*eOutBack(k);});sfx('roar');shake(18);rumble&&rumble(1.2,8);
  const ox=cx(orc);await tween(380,k=>{orc.ox=(B.x-ox)*k;orc.jump=Math.sin(k*Math.PI)*160;});orc.alpha=0;orc.ox=0;orc.jump=0;B.rider=1;sfx('hit');shake(8);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b));B.run=true;sfx('roar');
  for(const t of xs){const x0=B.x,tx=cx(t)-W0*.32;await tween(380,k=>{B.x=x0+(tx-x0)*easeIO(k);B.rot=.07*Math.sin(k*30);B.ry=-Math.abs(Math.sin(k*20))*18;if(Math.random()<.3)shake(5);});
    // felágaskodik (Grog lepattan róla és a levegőben lecsap a fejszével), a mancs lecsap
    B.key='wsbear2';sfx('roar');orc.alpha=b0;orc.ox=B.x-ox;orc.jump=0;const oy0=orc.oy;orc.oy=(t.y+t.oy)-(orc.y);orc.pose='attack';
    await tween(240,k=>{orc.jump=200*Math.sin(k*Math.PI*.5);B.rot=-.12*k;});await tween(140,k=>{orc.jump=200*(1-k*k);B.rot=-.12+.3*k;});orc.jump=0;
    shake(30);sfx('quake');sfx('slash');hitStop(120);flash('255,230,190',.35,.12);groundCrack&&groundCrack(cx(t),t.y+t.oy,'140,110,80',220);dustWave&&dustWave(cx(t),t.y+t.oy);
    for(let n=0;n<4;n++)clawMarks(cx(t)+rnd(-25,25),midY(t)+rnd(-30,30),Math.max(180,bigOf(t)*1.1),rnd(-.5,.5),'255,120,80');
    for(let i=0;i<36;i++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy,vx:rnd(-380,380),vy:rnd(-520,-150),g:1000,life:1,size:rnd(7,15),rgb:pick(['140,110,80','110,90,60']),add:false,shape:'rock'});
    toss(t,120,520);t.hurt=.7;hit(dr,t,sk);await wait(220);orc.alpha=0;orc.oy=oy0;orc.pose='idle';B.key='wsbear';B.rot=0;}
  B.run=false;for(const t of xs)if(!t.alive)continue;
  await tween(600,k=>{B.x=B.x+(cx(dr)-B.x)*k*.25;});B.rider=0;orc.ox=0;orc.alpha=b0;await tween(300,k=>{orc.jump=Math.sin(k*Math.PI)*90;});orc.jump=0;
  kaeLeaves(B.x,B.y-150,60,380);await tween(300,k=>{B.a=1-k;dr.alpha=a0*k;});B.on=false;dr.alpha=a0;await dimTo(0,null,300);};

// Bambuszliget: festett bambuszerdő tör fel minden ellenség alatt, magasra dobja őket; Jázmin a levegőben izzó nyílzáporral lövi le őket; a bambusz visszahúzódik
R16P['Bambuszliget']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,monk=dr===A1?B1:A1;await dimTo(.3,'10,30,5',250);await r16Raise(dr,'150,230,90');sfx('quake');rumble&&rumble(1.2,10);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),G=xs.map(t=>({t,k:0,x:cx(t),gy:t.y+t.oy+10}));const E={a:1};
  effects.unshift({update(){return E.a>0;},draw(){for(const g of G)if(g.k>0)r21GroveBurst(g.x,g.gy,Math.max(300,g.t.w*g.t.scale*2.6),g.k,E.a);}});
  for(const g of G){groundCrack&&groundCrack(g.x,g.gy,'120,95,60',200);for(let i=0;i<30;i++)part({x:g.x+rnd(-120,120),y:g.gy,vx:rnd(-260,260),vy:rnd(-520,-180),g:900,life:.9,size:rnd(7,13),rgb:pick(['120,95,60','90,140,60']),add:false,shape:'rock'});}
  shake(22);sfx('rock');await tween(380,k=>{for(const g of G){g.k=eOutBack(k);g.t.jump=Math.sin(Math.min(1,k*1.2)*Math.PI*.5)*230;}});r16Lower(dr);kaeLeaves((G[0].x+G[G.length-1].x)/2,200,80,520);
  monk.pose='attack';for(let r=0;r<4;r++)for(const g of G){const t=g.t,h=handPos(monk);sfx('whoosh');flyObj(h,{x:cx(t)+rnd(-20,20),y:midY(t)-t.jump+rnd(-30,30)},190,(x,y)=>{ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(midY(t)-t.jump-h.y,cx(t)-h.x));ctx.globalCompositeOperation='lighter';glow(0,0,34,'180,255,140',.9);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#5a3a1a';ctx.fillRect(-40,-2,44,4);ctx.fillStyle='#e8f0c0';ctx.beginPath();ctx.moveTo(4,-9);ctx.lineTo(24,0);ctx.lineTo(4,9);ctx.fill();ctx.restore();},{trail:['180,255,140','255,255,255']})
      .then(()=>{sfx('hit');kaeLeaves(cx(t),midY(t)-t.jump,12,260);t.hurt=.3;sparks(cx(t),midY(t)-t.jump,['200,255,160','255,255,255'],10,300);});await wait(60);}
  await wait(250);monk.pose='idle';await tween(240,k=>{for(const g of G)g.t.jump=230*(1-k*k);});for(const g of G){g.t.jump=0;toss(g.t,40,300);hit(dr,g.t,sk);}shake(26);sfx('quake');hitStop(100);
  await wait(300);await tween(500,k=>{for(const g of G)g.k=1-k;E.a=1-k*.3;});E.a=0;await dimTo(0,null,300);};

// Villámbambusz: Kaelen óriás festett bambuszt növeszt minden ellenség mellé villámhárítónak, Zordon viharfelhőt hív; festett villámok csapnak a bambuszokba, és vastag áramívek ugranak át az ellenségekbe
R16P['Villámbambusz']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wiz=dr===A1?B1:A1;await dimTo(.78,'5,8,25',350);await r16Raise(dr,'150,230,90');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),R=xs.map(t=>({t,x:cx(t)+t.w*t.scale*.55+30,y:t.y+t.oy+10,k:0,glow:0,H:Math.max(380,t.h*t.scale*2.2)}));const E={on:true};
  effects.push({update(){return E.on;},draw(){for(const r of R){if(r.k<=0)continue;r21GroveBurst(r.x,r.y,r.H*.55,r.k,1);if(r.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(r.x,r.y-r.H*r.k*.9,90*r.glow,'255,240,140',.9*r.glow);ctx.restore();}}}});
  for(const r of R){sfx('rock');shake(10);for(let i=0;i<18;i++)part({x:r.x,y:r.y,vx:rnd(-180,180),vy:rnd(-360,-100),g:800,life:.8,size:rnd(6,11),rgb:'120,95,60',add:false,shape:'rock'});await tween(260,k=>r.k=eOutBack(k));}
  r16Lower(dr);await r16Raise(wiz,'255,230,90');sfx('thunder');rumble&&rumble(1.4,8);
  // viharfelhő sötétedik
  const Cl={a:0};R18E({update(){return E.on;},draw(){if(Cl.a<=0)return;ctx.save();ctx.globalAlpha=Cl.a;const g=ctx.createLinearGradient(0,0,0,170);g.addColorStop(0,'rgba(10,12,30,.95)');g.addColorStop(1,'rgba(30,30,60,0)');ctx.fillStyle=g;ctx.fillRect(0,0,W,170);ctx.restore();}});await tween(400,k=>Cl.a=k);
  const bo=R17I.bolt;for(let round=0;round<4;round++)for(const r of R){sfx('thunder');flash('255,250,200',.4,.08);shake(14);hitStop(40);r.glow=1;const top=r.y-r.H*.95;
    const st={t:0};R18E({update(dt){st.t+=dt;r.glow=Math.max(0,1-st.t/.45);return st.t<.4;},draw(){const a=1-st.t/.4;if(bo){const L=top,w=L*bo.width/bo.height;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a;ctx.drawImage(bo,r.x-w/2,0,w,L);ctx.restore();}else r16Bolt(r.x,0,r.x,top,'255,230,90',14);
      for(let i=0;i<2;i++)r16Bolt(r.x,top+rnd(40,160),cx(r.t)+rnd(-20,20),midY(r.t)+rnd(-30,30),'255,230,90',9);}});
    sparks(cx(r.t),midY(r.t),['255,240,140','255,255,255'],24,520);r.t.hurt=.5;if(round===3){toss(r.t,60,420);hit(dr,r.t,sk);}await wait(round===3?160:80);}
  r16Lower(wiz);await wait(300);await tween(400,k=>{Cl.a=1-k;for(const r of R)r.k=1-k;});E.on=false;await dimTo(0,null,300);};

// Átokindák: festett tüskés gyökérketrec nő minden ellenség köré, Morgána fekete-lila átoklángja végigszalad rajta; az indák összeszorulnak
R16P['Átokindák']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wi=dr===A1?B1:A1;await dimTo(.72,'15,5,30',300);await r16Raise(dr,'150,230,90');sfx('rock');rumble&&rumble(1,8);
  const im=R17I.rootcage,V=al.map(t=>({t,k:0,burn:0,sq:0}));const E={on:true};
  effects.push({update(){for(const v of V)if(v.burn>0&&Math.random()<.8)darkFlame({x:cx(v.t)+rnd(-60,60),y:v.t.y+v.t.oy-rnd(0,v.t.h*v.t.scale),vx:rnd(-20,20),vy:-rnd(60,150),life:.6,size:rnd(18,30)});return E.on;},
    draw(){for(const v of V){if(v.k<=0)continue;const w=Math.max(240,v.t.w*v.t.scale*2.3)*(1-v.sq*.12);ctx.save();if(im){r17Draw(im,cx(v.t),v.t.y+v.t.oy+20,w,{anchor:'bottom',sy:v.k});if(v.burn>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55*v.burn;r17Draw(tintSpr(im,'rgb(170,70,255)',1),cx(v.t),v.t.y+v.t.oy+20,w,{anchor:'bottom',sy:v.k});}}ctx.restore();}}});
  for(const v of V){for(let i=0;i<20;i++)part({x:cx(v.t)+rnd(-90,90),y:v.t.y+v.t.oy,vx:rnd(-220,220),vy:rnd(-400,-120),g:800,life:.8,size:rnd(6,11),rgb:'100,75,50',add:false,shape:'rock'});tween(420,k=>v.k=eOutBack(k));await wait(90);}
  await wait(380);for(const v of V){v.t.hurt=.4;}shake(12);r16Lower(dr);await r16Raise(wi,'160,80,230');sfx('dark');const h=handPos(wi);
  for(const v of V)flyObj(h,{x:cx(v.t),y:midY(v.t)},360,(x,y)=>{for(let i=0;i<2;i++)darkFlame({x,y,vx:rnd(-20,20),vy:-rnd(20,60),life:.35,size:rnd(18,26)});},{arc:90});
  await wait(400);sfx('fire');sfx('wail');flash('120,40,200',.4,.18);shake(18);for(const v of V)v.burn=1;
  for(let i=0;i<3;i++){for(const v of V){tween(160,k=>v.sq=Math.sin(k*Math.PI));v.t.hurt=.4;sparks(cx(v.t),midY(v.t),['190,110,255','40,10,60'],14,360);}sfx('crunch');await wait(240);}
  for(const v of V){toss(v.t,40,320);hit(dr,v.t,sk);}r16Lower(wi);await wait(300);await tween(400,k=>{for(const v of V){v.k=1-k;v.burn=1-k;}});E.on=false;await dimTo(0,null,300);};

// Lótuszharmat: Kaelen óriás festett lótuszt növeszt a csapat alá, Lili tündérporából festett harmatlevelek borulnak föléjük; nagy harmatcseppek gyógyítanak (30%), a megmaradt harmat jégként csapódik az ellenségekbe
R16P['Lótuszharmat']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,fa=dr===A1?B1:A1;await dimTo(.3,'10,30,40',250);await Promise.all([r16Raise(dr,'150,230,90'),r16Raise(fa,'150,230,255')]);sfx('holy');
  const hs=S.heroes.filter(h=>h.alive),mx=hs.reduce((s,h)=>s+cx(h),0)/hs.length,gy=Math.max(...hs.map(h=>h.y+h.oy))+14,top=Math.min(...hs.map(topY))-140,L={s:0,a:1,lv:0,t:0};
  effects.unshift({update(dt){L.t+=dt;return L.a>0;},draw(){if(L.s<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-30,380*L.s,'170,240,200',.35*L.a);ctx.restore();if(R17I.lotus)r17Draw(R17I.lotus,mx,gy+50,720*L.s,{anchor:'bottom',sy:.55,a:L.a*.95});}});
  effects.push({update(){return L.a>0;},draw(){if(L.lv<=0)return;const im=R17I.dewleaves;if(im)r17Draw(im,Math.max(340,mx),Math.max(90,top)+Math.sin(L.t*2)*6,640*L.lv,{a:L.a});}});
  await tween(700,k=>L.s=eOutBack(k));
  // Lili tündérpora a lótuszra hull, és harmatlevelek nőnek
  const fh=handPos(fa);for(let i=0;i<40;i++)setTimeout(()=>part({x:fh.x,y:fh.y,vx:(mx-fh.x)*rnd(1.2,1.8)+rnd(-60,60),vy:(top-fh.y)*rnd(1,1.6),life:.7,size:rnd(3,6),rgb:pick(['180,240,255','255,255,255','255,230,140']),shape:'star'}),i*15);
  await tween(500,k=>L.lv=eOutBack(k));sfx('heal');
  for(let i=0;i<80;i++)setTimeout(()=>{const h=pick(hs);part({x:cx(h)+rnd(-70,70),y:top+30,vx:0,vy:rnd(300,460),g:400,life:.7,size:rnd(6,11),rgb:pick(['190,240,255','255,255,255']),shape:'drop',add:false});},i*14);
  await wait(900);healAll(dr,.3);for(const h of hs){for(const k of ['poison','burn','curse','foam'])if(h.st&&h.st[k])delete h.st[k];R18E({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(h),midY(h),h.h*h.scale*(.4+.5*k),'150,240,190',.6*(1-k));ctx.restore();}});}sfx('heal');
  r16Lower(fa);await wait(300);
  // a harmat jégszilánkká fagy és az ellenségekbe csapódik
  for(const t of al){for(let i=0;i<6;i++){const s={x:mx+rnd(-140,140),y:top+rnd(0,40)};flyObj(s,{x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-40,30)},280+i*40,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,30,'170,230,255',.9);glow(x,y,10,'255,255,255',1);ctx.restore();},{arc:60,trail:['170,230,255','255,255,255']});}}
  await wait(560);for(const t of al){sfx('ice');sparks(cx(t),midY(t),['180,240,255','255,255,255'],26,460);t.hurt=.4;toss(t,30,260);hit(dr,t,sk);await wait(70);}
  r16Lower(dr);await tween(500,k=>L.a=1-k);await dimTo(0,null,300);};

// ===== Levéltánc (újra): festett tealevelek spirálban KERINGENEK a társ körül (elöl-hátul, felfelé szállva), zöld fénypászma húzódik utánuk, végül egyszerre a társba simulnak, gyógyító villanás
A.leafDance=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,200,.1);sfx('wind');const h=handPos(u),gx=cx(t),bot=t.y+t.oy,top=topY(t),RX=t.w*t.scale*.55+40;
  const L=[];for(let i=0;i<26;i++)L.push({ph:i/26*6.283*3,off:i/26,s:rnd(.75,1.1),k:0});const st={t:0,col:0,a:1,on:true};
  const pos=l=>{const q=(l.off+st.t*.45)%1,an=l.ph+st.t*5,r=RX*(1-st.col*.85);return{x:gx+Math.cos(an)*r,y:bot-12-(bot-top)*q*(1-st.col*.5)-st.col*(bot-top)*.25,f:Math.sin(an)>0,an};};
  const draw=front=>()=>{if(st.a<=0)return;ctx.save();ctx.globalAlpha=st.a;for(const l of L){if(l.k<=0)continue;const p=pos(l);if(p.f!==front)continue;
      if(front){ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,14,'170,255,140',.35);ctx.restore();}
      const lx=l.k<1?h.x+(p.x-h.x)*l.k:p.x,ly=l.k<1?h.y+(p.y-h.y)*l.k:p.y;pLeaf(lx,ly,l.s*(front?1:.85),p.an+1.2,1,'#6cbf3a');}ctx.restore();};
  effects.unshift({update(dt){st.t+=dt;if(st.on&&Math.random()<.5)part({x:gx+rnd(-RX,RX),y:bot-rnd(0,bot-top),vx:0,vy:-rnd(20,60),life:.8,size:rnd(2,4),rgb:'190,255,150',shape:'star'});return st.a>0;},draw:draw(false)});
  effects.push({update(){return st.a>0;},draw:draw(true)});
  // a levelek a bothegyből röppennek ki, egymás után
  for(const l of L)tween(500,k=>l.k=easeIO(k));await wait(1400);
  // összesimulnak a társba
  sfx('heal');await tween(450,k=>st.col=easeIO(k));st.on=false;flash('190,255,160',.25,.15);
  R18E({t:0,update(dt){this.t+=dt;return this.t<.9;},draw(){const k=this.t/.9;ctx.save();ctx.globalCompositeOperation='lighter';glow(gx,midY(t),t.h*t.scale*(.4+.6*k),'150,240,120',.7*(1-k));ctx.restore();}});
  for(let n=0;n<16;n++)part({x:gx+rnd(-40,40),y:bot-rnd(0,bot-top),vx:rnd(-20,20),vy:-rnd(40,110),life:1,size:rnd(3,6),rgb:pick(['170,255,140','230,255,210']),shape:'star'});
  hit(u,t,sk);if(t.st&&t.st.foam){delete t.st.foam;popLabel(t,'HAB LEMOSVA','#cfe9a0');}st.a=0;await bodySettle(u);}finally{rel();}};

// ===== Kőőr – Buzogánycsapás (még nagyobb): magasra ugrik, a földbe csap, a becsapódás körül festett kőhullám-gyűrű tör fel mindkét oldalon, kőoszlopok lövellnek fel, a hős a levegőbe repül
{const sm0=A.stoneMace;A.stoneMace=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const d=await dashTo(u,t,300,10);await bodyWind(u,320,-.26);sfx('whoosh');
  await tween(380,k=>{u.jump=Math.sin(k*Math.PI*.5)*260;u.lean=-.15*k;});await tween(160,k=>{u.jump=260*(1-k*k);u.lean=-.15+.45*k;});u.jump=0;
  const gx=cx(t)+10,gy=t.y+t.oy+6,wim=R17I.stonewave;shake(36);sfx('quake');sfx('boom');sfx('rock');flash('255,235,200',.55,.2);hitStop(160);rumble&&rumble(1.5,12);
  groundCrack&&groundCrack(gx,gy,'190,170,130',320);dustWave&&dustWave(gx,gy);
  const Wv={k:0,a:1};effects.unshift({update(){return Wv.a>0;},draw(){if(!wim)return;ctx.save();ctx.globalAlpha=Wv.a;for(const [dx,s,fx] of [[-1,1,true],[1,1,false],[-.5,.75,true],[.5,.75,false]]){const k2=Wv.k;r17Draw(wim,gx+dx*(40+260*k2),gy+16,380*s*(.4+.6*k2),{anchor:'bottom',fx,sy:Math.sin(Math.min(1,k2*1.4)*Math.PI*.9)+.1});}ctx.restore();}});
  tween(800,k=>{Wv.k=easeIO(k);Wv.a=k<.65?1:1-(k-.65)/.35;});
  for(let i=0;i<70;i++)part({x:gx+rnd(-90,90),y:gy,vx:rnd(-460,460),vy:rnd(-760,-220),life:rnd(.8,1.4),size:rnd(8,20),rgb:pick(['150,140,120','115,105,90','175,165,140']),g:1000,add:false,shape:'rock'});
  for(let i=0;i<24;i++)part({x:gx+rnd(-200,200),y:gy-rnd(0,30),vx:rnd(-120,120),vy:-rnd(30,110),life:rnd(1,1.6),size:rnd(34,60),grow:40,rgb:'190,175,150',add:false,shape:'smoke'});
  t.hurt=.7;toss(t,140,560);hit(u,t,sk);await wait(650);u.lean=0;await bodySettle(u);await dashBack(u,d);}finally{rel();u.lean=0;}};}
