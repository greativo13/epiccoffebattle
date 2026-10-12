// ===== 28. kör: a tesztlap ba-pontjainak javításai + Vad Alakváltás (élethű medve és kígyó) =====

// ---- élő vágta egyetlen festett képből: nyúlás (elrugaszkodás) ↔ összehúzódás (érkezés), fejbólintás, ívelt ugrások
// a kép jobb oldala (fej) néz előre; ph: fázis, run: 0 = áll, 1 = teljes vágta
function r21Gallop(im,x,y,w,ph,run=1,a=1,fx=false){if(!im)return;const c=Math.sin(ph*6.283),s=Math.cos(ph*6.283);
  const sx=1+.09*c*run,sy=1-.07*c*run,rot=(-.07*c+.03*s)*run,lift=Math.max(0,s)*w*.07*run;
  const h=w*im.height/im.width,N=10,sw=im.width/N;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y-lift);if(fx)ctx.scale(-1,1);ctx.rotate(rot);ctx.scale(sx,sy);
  // szeletenként enyhe hullám a gerinc mentén (a test hajlik, nem merev tábla)
  for(let i=0;i<N;i++){const q=i/N,dy=Math.sin(ph*6.283+q*3.2)*h*.025*run;ctx.drawImage(im,i*sw,0,sw+1,im.height,-w/2+q*w,-h+dy,w/N+1,h);}
  ctx.restore();}

// ---- kígyótest egy útvonal mentén (festett, egyenes kígyókép: bal szélén a fej) – spirál a célpont körül
function r21CoilPath(gx,top,bot,R,turns,k,from,sq=0,headLift=0){const P=[],N=90;
  for(let i=0;i<=N;i++){const q=i/N;
    // a végső, rátekert alak: fej fent, a test lefelé csavarodik, a farok a földön kifut a kiindulás felé
    let hx,hy,b=false;if(q<.72){const qq=q/.72,th=qq*turns*6.283+Math.PI*.5,r=R*(1-sq*.18);hx=gx+Math.cos(th)*r;hy=top+(bot-top)*qq+Math.sin(th)*r*.26;b=Math.sin(th)<0;if(q<.03)hy-=headLift;}
    else{const qq=(q-.72)/.28;hx=gx+R+(from.x-gx-R)*qq*.6;hy=bot+Math.sin(qq*9)*4;}
    // a földön kígyózó alak (a kiindulástól a célig)
    const gq=1-q,gxp=from.x+(gx-from.x)*Math.min(1,gq*1.1),gyp=from.y+Math.sin(q*14+k*10)*10;
    const e=Math.max(0,Math.min(1,k*1.7-q*.7)),m=e*e*(3-2*e);P.push({x:gxp+(hx-gxp)*m,y:gyp+(hy-gyp)*m,b:b&&m>.5});}
  return P;}
function r21DrawCoil(im,P,thick,a=1){if(!im||P.length<2)return;let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y);r17Snake(im,P,L,thick,a,.5);}

// ---- Vad Alakváltás: medve (élő vágta, felágaskodás átúsztatva, mancscsapás), teknős (változatlan), kígyó (festett kígyótest
// kígyózva odasiklik, rátekeredik, összeszorít, megmarja)
{const ws0=A.wildshape;A.wildshape=async(u,ts,sk)=>{const t=ts[0];const f=pick(['bear','turtle','snake']);
  if(f==='turtle'||!t||!t.alive){const mr=Math.random;let once=true;Math.random=()=>{if(once){once=false;return .5;}return mr();};try{return await ws0(u,ts,sk);}finally{Math.random=mr;}}
  const rel=keepPose(u);const a0=u.alpha==null?1:u.alpha;try{
  popLabel(u,f==='bear'?'MEDVEFORMA!':'KÍGYÓFORMA!','#9be07a');sfx('roar');kaeLeaves(cx(u),midY(u),70,420);flash('150,230,90',.3,.2);
  if(f==='bear'){const run=R17I.wsbear,rear=R17I.wsbear2||run,W=360,gy=u.y+u.oy+6,B={x:cx(u),ph:0,run:0,R:0,a:0,s:.5,rot:0,on:true};
    R18E({update(dt){B.ph+=dt*2.6*B.run;if(B.run>.3&&Math.random()<.35)part({x:B.x+W*.25,y:gy,vx:rnd(40,160),vy:-rnd(20,90),life:.6,size:rnd(14,24),grow:20,rgb:'160,130,90',add:false,shape:'smoke'});return B.on;},
      draw(){if(B.a<=0)return;ctx.save();ctx.globalAlpha=B.a;if(B.R<1)r21Gallop(run,B.x,gy,W*B.s,B.ph,B.run,1-B.R,false);if(B.R>0&&rear){ctx.save();ctx.globalAlpha*=B.R;ctx.translate(B.x,gy);ctx.rotate(-B.rot);const w=W*B.s*.8,h=w*rear.height/rear.width;ctx.drawImage(rear,-w/2,-h,w,h);ctx.restore();}ctx.restore();}});
    await tween(320,k=>{u.alpha=a0*(1-k);B.a=k;B.s=.5+.5*r21ease.back(k);});sfx('roar');
    const x0=B.x,x1=cx(t)-t.w*t.scale*.5-W*.32;B.run=1;
    await tween(900,k=>{B.x=x0+(x1-x0)*r21ease.io(k);if(Math.random()<.08)shake(3);});
    // felágaskodik (átúszik), hátralendül, lecsap két mancscsapással
    for(let i=0;i<2;i++){sfx('roar');await tween(300,k=>{const e=r21ease.io(k);B.run=1-e;B.R=e;B.rot=.12*e;});
      sfx('whoosh');await tween(160,k=>{B.rot=.12-.3*r21ease.in(k);B.x+=3;});
      shake(18);sfx('hit');t.hurt=.6;toss(t,40+i*30,300);for(let n=0;n<22;n++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,30),vx:rnd(40,380),vy:rnd(-260,60),g:600,life:.7,size:rnd(4,9),rgb:pick(['200,30,30','140,90,50']),add:false,shape:n%3?'drop':'rock'});
      await tween(220,k=>{B.rot=-.18*(1-k);B.R=1-r21ease.io(k);B.run=r21ease.io(k)*.4;});}
    hit(u,t,{...sk,name:'Medvecsapás',pow:1.9});
    // visszavágtat
    B.run=1;const x2=B.x;await tween(700,k=>{B.x=x2+(x0-x2)*r21ease.io(k);});B.run=0;
    kaeLeaves(B.x,gy-150,50,360);await tween(300,k=>{B.a=1-k;u.alpha=a0*k;});B.on=false;}
  else{const im=R17I.snakebody||R17I.wsviper;const from={x:cx(u),y:u.y+u.oy+2},gx=cx(t),top=topY(t)+t.h*t.scale*.18,bot=t.y+t.oy-4,R=t.w*t.scale*.55+22,thick=Math.max(36,t.h*t.scale*.2);
    const C={k:0,sq:0,head:0,a:1,on:true};
    R18E({update(){return C.on;},draw(){if(C.a<=0)return;const P=r21CoilPath(gx,top,bot,R,2.4,C.k,from,C.sq,C.head);r21DrawCoil(im,P,thick,C.a);}});
    await tween(260,k=>{u.alpha=a0*(1-k);});sfx('whoosh');
    // kígyózva odasiklik és rátekeredik (a fej megy elöl)
    await tween(1300,k=>{C.k=k;});
    for(let i=0;i<3;i++){sfx('crunch');await tween(240,k=>{C.sq=Math.sin(k*Math.PI);C.head=18*Math.sin(k*Math.PI);t.hurt=.4;});shake(8);if(i===2){sfx('bite');t.hurt=.6;}}
    hit(u,t,{...sk,name:'Kígyómarás',pow:1.1,status:['poison',1,3]});if(Math.random()<.5)addStatus(t,'stun',1);
    // letekeredik és visszasiklik
    await tween(900,k=>{C.k=1-k;});C.on=false;await tween(260,k=>{u.alpha=a0*k;});}
  }finally{u.alpha=a0;rel();}};}

// ---- Bambuszkígyó – Tekeredés (élethű): a kígyó saját festett teste (fx7-snakebody) kígyózva odasiklik, a hős köré tekeredik
// (hátul halványan, elöl takarva), háromszor összeszorít, a feje megmarja; nincs csíkos tekercskép
{const sc0=A.snakeCoil;A.snakeCoil=async(u,ts,sk)=>{const im=R17I.snakebody,t=ts[0];if(!im||!t)return sc0(u,ts,sk);const rel=keepPose(u);try{
  const from={x:cx(u)-u.w*u.scale*.2,y:u.y+u.oy},gx=cx(t),top=topY(t)+t.h*t.scale*.15,bot=t.y+t.oy-4,R=t.w*t.scale*.55+22,thick=Math.max(36,t.h*t.scale*.2);
  const C={k:0,sq:0,head:0,a:1,on:true};R18E({update(){return C.on;},draw(){const P=r21CoilPath(gx,top,bot,R,2.4,C.k,from,C.sq,C.head);r21DrawCoil(im,P,thick,C.a);}});
  await tween(220,k=>u.alpha=1-k);sfx('whoosh');await tween(1300,k=>{C.k=k;});
  for(let i=0;i<3;i++){sfx('crunch');await tween(260,k=>{C.sq=Math.sin(k*Math.PI);C.head=20*Math.sin(k*Math.PI);t.hurt=.5;});shake(9);
    for(let j=0;j<6;j++)part({x:gx+rnd(-R,R),y:bot-rnd(10,bot-top),vx:rnd(-120,120),vy:-rnd(40,140),g:500,life:.5,size:rnd(4,7),rgb:pick(['120,170,60','90,130,40']),add:false,shape:'leaf'});}
  sfx('bite');hit(u,t,sk);await wait(200);await tween(900,k=>{C.k=1-k;});C.on=false;await tween(220,k=>u.alpha=k);}finally{u.alpha=1;rel();}};}

// ---- Kaelen – Bambuszcsapás (a felhasználó: „az égből hulljanak le a bambuszdárdák”): Kaelen botot emel, az ég felé zöld
// erő száll, és festett bambuszdárdák zuhognak le gyorsulva az ellenségre és köré, beállnak a földbe, végül bambuszliget tör fel
A.druidSpears=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const im=R17I.bamboospear||FX_IMG.bamboospear;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,.12);
  const h=handPos(u);sfx('wind');kaeLeaves(h.x,h.y,24,240);
  const beam={a:0};R18E({update(){return beam.a>0||!beam.d;},draw(){if(beam.a>0){ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(h.x,h.y,h.x,0);g.addColorStop(0,`rgba(170,250,120,${.6*beam.a})`);g.addColorStop(1,'rgba(170,250,120,0)');ctx.fillStyle=g;ctx.fillRect(h.x-10,0,20,h.y);ctx.restore();}}});
  await tween(320,k=>beam.a=k);beam.d=true;tween(300,k=>beam.a=1-k);
  const tx=cx(t),gy=t.y+t.oy+8,SW=260,D=[],st={a:1,grove:0};
  R18E({update(){return st.a>0;},draw(){if(st.grove>0)r21GroveBurst(tx,gy+4,Math.max(320,t.w*t.scale*2.6),st.grove,st.a);if(!im)return;const sh=SW*im.height/im.width*1.6;
    for(const d of D){if(d.y<-SW)continue;ctx.save();ctx.globalAlpha=st.a;ctx.translate(d.x,d.y);ctx.rotate(Math.PI/2+d.r);if(d.fall){ctx.save();ctx.globalAlpha*=.25;ctx.drawImage(im,-SW/2-40,-sh/2,SW,sh);ctx.restore();}ctx.drawImage(im,-SW*.85,-sh/2,SW,sh);ctx.restore();}}});
  // 9 dárda: kettő-három egyszerre, gyorsulva zuhan, a földbe áll (a középsők az ellenségbe)
  const xs=[0,-70,70,-30,40,-110,110,-10,20];await Promise.all(xs.map((dx,i)=>wait(i*90).then(()=>{const d={x:tx+dx,y:-SW,r:rnd(-.12,.12),fall:true};D.push(d);const yEnd=Math.abs(dx)<50?midY(t)+rnd(-20,30):gy-rnd(0,14);sfx('whoosh');
    return tween(320,k=>{d.y=-SW+(yEnd+SW)*r21ease.in(k);}).then(()=>{d.fall=false;shake(Math.abs(dx)<50?10:5);sfx(Math.abs(dx)<50?'hit':'rock');t.hurt=.4;
      for(let n=0;n<8;n++)part({x:d.x,y:yEnd,vx:rnd(-160,160),vy:-rnd(80,260),g:800,life:.6,size:rnd(5,9),rgb:pick(['120,95,60','150,220,90']),add:false,shape:n%2?'rock':'leaf'});});})));
  st.grove=0;tween(380,k=>st.grove=r21ease.back(k));sfx('quake');shake(16);kaeLeaves(tx,midY(t),60,480);toss(t,100,600);hit(u,t,sk);
  await wait(700);await tween(450,k=>{st.a=1-k;});await bodySettle(u);}finally{rel();}};

// ---- Kaelen – Ősi Tölgy ökle: EGYENESEN tör fel (a festett ököl ferde volt – kiegyenesítve, függőlegesen emelkedik)
{const of=A.oakFist;A.oakFist=async(u,ts,sk)=>{const im=R17I.oakfist,t=ts[0];if(!im||!t)return of(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,280,.14);sfx('quake');rumble&&rumble(1,8);
  const bx=cx(t),gy=t.y+t.oy+20,Hh=Math.max(420,t.h*t.scale*2.4),Ww=Hh*im.width/im.height,F={k:0,a:1};
  groundCrack&&groundCrack(bx,gy-8,'120,90,60',220);await tween(360,k=>{t.spin=.04*Math.sin(k*60);if(Math.random()<.4)shake(3);});t.spin=0;
  // a kép ökle jobbra fent van: −0,32 rad-dal elforgatva, a tövét a talpponthoz igazítva az ököl pont az ellenség fölé kerül
  R18E({update(){return F.a>0;},draw(){if(F.k<=0)return;ctx.save();ctx.beginPath();ctx.rect(-200,-200,1400,gy+200+4);ctx.clip();ctx.globalAlpha=F.a;ctx.translate(bx,gy+Hh*(1-F.k));ctx.rotate(-.32);ctx.drawImage(im,-Ww*.38,-Hh,Ww,Hh);ctx.restore();}});
  sfx('boom');shake(24);flash('255,240,200',.25,.1);kaeLeaves(bx,gy-60,50,420,160);
  for(let i=0;i<40;i++)part({x:bx+rnd(-80,80),y:gy,vx:rnd(-220,220),vy:rnd(-560,-200),life:1,size:rnd(7,14),rgb:pick(['120,90,60','90,70,45']),g:850,add:false,shape:'rock'});
  t.hurt=.6;toss(t,170,720);hit(u,t,sk);await tween(320,k=>F.k=r21ease.out(k));await wait(650);
  await tween(520,k=>F.k=1-r21ease.in(k));F.a=0;await bodySettle(u);}finally{rel();}};}

// ---- Levéltánc: gyorsabb (rövid felpörgés, 3 gyors hullám), kisebb levelek
{const ld=A.leafDance;A.leafDance=async(u,ts,sk)=>{const lf=R17I.leaf,t=ts[0];if(!lf||!t)return ld(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,140,.1);sfx('wind');
  const ox=cx(u),oy=midY(u),RX=u.w*u.scale*.7+40,N=24,L=[...Array(N)].map((_,i)=>({a:i/N*6.283,y:rnd(-.4,.35),s:rnd(.8,1.1),st:'orb',x:ox,yy:oy,rot:0}));const E={on:true,t:0,R:0};
  R18E({update(dt){E.t+=dt;for(const l of L)if(l.st==='orb'){const a=l.a+E.t*7;l.x=ox+Math.cos(a)*RX*E.R;l.yy=oy+l.y*u.h*u.scale*.7+Math.sin(a)*34*E.R;l.rot=a+1.6;l.front=Math.sin(a)>0;}return E.on;},
    draw(){for(const l of L)if(l.st!=='gone')r17Draw(lf,l.x,l.yy,48*l.s,{rot:l.rot,a:l.st==='orb'&&!l.front?.6:1});}});
  await tween(220,k=>E.R=r21ease.out(k));const tx=cx(t),ty=midY(t),sub=Object.assign({},sk,{pow:sk.pow/3});
  for(let w=0;w<3;w++){const grp=L.filter(l=>l.st==='orb').slice(0,8);sfx('whoosh');
    const fl=grp.map((l,i)=>{l.st='fly';const x0=l.x,y0=l.yy,side=(w%2?1:-1)*rnd(40,100),r0=l.rot;return wait(i*12).then(()=>tween(220,k=>{const e=r21ease.in(k),m=1-e,cxp=(x0+tx)/2,cyp=(y0+ty)/2+side;l.x=m*m*x0+2*m*e*cxp+e*e*(tx+rnd(-6,6));l.yy=m*m*y0+2*m*e*cyp+e*e*ty;l.rot=r0+k*10;})).then(()=>{l.st='gone';});});
    await wait(140);sfx('slash');t.hurt=.4;shake(6);for(let i=0;i<10;i++)part({x:tx+rnd(-25,25),y:ty+rnd(-35,35),vx:rnd(-280,280),vy:rnd(-280,60),g:500,life:rnd(.4,.7),size:rnd(5,8),rgb:pick(['110,190,70','150,220,90']),add:false,shape:'leaf'});hit(u,t,sub);await Promise.all(fl);}
  toss(t,50,360);E.on=false;await bodySettle(u);}finally{rel();}};}

// ---- PÁROS: Bambuszliget (a felhasználó leírása): Jázmin az ellenségek lába elé, a földbe lő izzó nyilakat; minden becsapódásból
// festett bambuszdárdák (rudak) nőnek ki, átszúrják/feldobják az ellenséget; a végén az egész liget visszahúzódik
R16P['Bambuszliget']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,monk=dr===A1?B1:A1,arw=FX_IMG.jzarrow;await dimTo(.3,'10,30,5',250);
  await r16Raise(dr,'150,230,90');r16Lower(dr);const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),P=[],E={a:1};
  R18E({update(){return E.a>0;},draw(){for(const q of P)r21Pole(q.x,q.gy,q.H,q.k,q.l,E.a);}});
  monk.pose='attack';const shots=[];for(const t of xs)for(const dx of [-55,-15,25,60])shots.push({t,dx});
  await Promise.all(shots.map((s,i)=>wait(i*90).then(()=>{const h=handPos(monk),t=s.t,gx=cx(t)+s.dx,gy=t.y+t.oy+6;sfx('whoosh');
    return flyObj(h,{x:gx,y:gy},300,(x,y)=>{const an=Math.atan2(gy-h.y,gx-h.x);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,34,'180,255,140',.7);ctx.restore();if(arw)r17Draw(arw,x,y,140,{rot:an});},{arc:90,trail:['180,255,140','255,255,255']})
      .then(()=>{sfx('rock');shake(6);for(let n=0;n<10;n++)part({x:gx,y:gy,vx:rnd(-180,180),vy:-rnd(100,320),g:800,life:.6,size:rnd(5,9),rgb:pick(['120,95,60','150,220,90']),add:false,shape:'rock'});
        // a becsapódásból bambuszdárdák nőnek ki
        for(let j=0;j<3;j++){const q={x:gx+(j-1)*18,gy,H:Math.max(240,t.h*t.scale*1.5)*rnd(.8,1.15),k:0,l:(j-1)*.12+rnd(-.05,.05)};P.push(q);tween(240,k=>q.k=r21ease.back(k));}
        t.hurt=.5;t.jump=Math.max(t.jump||0,0);tween(260,k=>t.jump=Math.max(t.jump,160*Math.sin(k*Math.PI*.5)));});})));
  monk.pose='idle';sfx('quake');shake(20);kaeLeaves((cx(xs[0])+cx(xs[xs.length-1]))/2,220,90,560);await wait(300);
  await tween(260,k=>{for(const t of xs)t.jump=160*(1-k*k);});for(const t of xs){t.jump=0;toss(t,40,300);hit(dr,t,sk);}shake(24);
  await wait(400);await tween(500,k=>{for(const q of P)q.k=Math.min(q.k,1-r21ease.in(k));});E.a=0;await dimTo(0,null,300);};

// ---- PÁROS: Villámbambusz: mind a négy bambuszrúd tetejéből egyenként, majd együtt óriási villám csap le az ellenségre
{const vb=R16P['Villámbambusz'];R16P['Villámbambusz']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wiz=dr===A1?B1:A1,im=R17I.bamboopole;if(!im)return vb(A1,B1,al,sk,p);await dimTo(.72,'6,8,22',350);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=Math.max(...xs.map(t=>t.y+t.oy))+8,mid=(cx(xs[0])+cx(xs[xs.length-1]))/2,span=Math.max(260,cx(xs[xs.length-1])-cx(xs[0])+220);
  const PH=Math.min(420,Math.max(330,Math.max(...xs.map(t=>t.h*t.scale))*1.6)),R=[0,1,2,3].map(i=>({x:mid-span/2+span*i/3+rnd(-8,8),k:0,glow:0,lean:(i-1.5)*.05}));const E={on:true},Z=[];
  const top=r=>({x:r.x+Math.sin(r.lean)*PH*r.k*.92,y:gy-PH*r.k*.92});
  R18E({update(dt){for(const z of Z){z.t+=dt;if(z.t<z.L*.7&&Math.random()<.5)z.tr=r21ZapTree(z.a.x,z.a.y,z.b.x,z.b.y,z.j);}for(let i=Z.length-1;i>=0;i--)if(Z[i].t>Z[i].L)Z.splice(i,1);for(const r of R)r.glow=Math.max(0,r.glow-dt*1.6);return E.on;},
    draw(){for(const r of R){if(r.k<=0)continue;ctx.save();ctx.translate(r.x,gy);ctx.rotate(r.lean);const h=PH,w=h*im.width/im.height;ctx.beginPath();ctx.rect(-w,-h*r.k-4,w*2,h*r.k+4);ctx.clip();ctx.drawImage(im,-w/2,-h*r.k,w,h);ctx.restore();
      if(r.glow>0){const q=top(r);ctx.save();ctx.globalCompositeOperation='lighter';glow(q.x,q.y,90*r.glow+20,'210,225,255',.9*r.glow);ctx.restore();}}
      for(const z of Z)for(const q of z.tr)r21Zap(q,z.w,'200,220,255',1-z.t/z.L);}});
  const zap=(a,b,w=6,L=.35,j=30)=>{const z={a,b,w,L,j,t:0,tr:r21ZapTree(a.x,a.y,b.x,b.y,j)};Z.push(z);};
  await r16Raise(dr,'150,230,90');
  for(const r of R){sfx('rock');shake(7);for(let i=0;i<14;i++)part({x:r.x+rnd(-12,12),y:gy,vx:rnd(-170,170),vy:rnd(-340,-90),g:800,life:.8,size:rnd(5,10),rgb:'120,95,60',add:false,shape:'rock'});await tween(260,k=>r.k=r21ease.back(k));await wait(60);}
  r16Lower(dr);await r16Raise(wiz,'210,225,255');
  // égi villám minden rúdba, a rudak feltöltődnek
  for(const r of R){const q=top(r);zap({x:q.x+rnd(-40,40),y:0},q,7,.3,36);r.glow=1;sfx('thunder');flash('235,240,255',.3,.06);shake(8);await wait(140);}
  // mind a 4 rúd tetejéből villám csap az ellenségekbe – egyenként, aztán egyszerre, többször
  for(let round=0;round<3;round++){const last=round===2;
    for(const r of R){const t=pick(xs);if(!t||!t.alive&&!last)continue;const q=top(r);zap(q,{x:cx(t)+rnd(-15,15),y:midY(t)+rnd(-25,25)},last?8:6,last?.5:.3,26);r.glow=1;sfx('thunder');t.hurt=.5;t.spin=.1*Math.sin(round*3);sparks(cx(t),midY(t),['220,235,255','255,255,255'],14,420);shake(last?14:8);if(!last)await wait(130);}
    if(last){flash('240,245,255',.5,.12);for(const t of xs)for(const r of R){const q=top(r);zap(q,{x:cx(t),y:midY(t)},7,.6,24);}}
    await wait(last?500:200);}
  for(const t of xs){t.spin=0;toss(t,50,380);hit(dr,t,sk);}r16Lower(wiz);await wait(300);
  await tween(420,k=>{for(const r of R)r.k=1-r21ease.in(k);});E.on=false;await dimTo(0,null,300);};}

// ---- PÁROS: Átokindák → új név: „Lángoló Átokketrec”. A ketrec alakja megmarad: a festett lila lángfal csak a ketrec indáin
// belül ég (a ketrec képe maszkolja), így a ketrec körvonala végig látszik, rajta lobog a láng
{const p=PAIRS.find(x=>x.name==='Átokindák');if(p){const f=R16P['Átokindák'];p.name='Lángoló Átokketrec';p.desc='Tüskés gyökérketrec nő minden ellenség köré, Morgána fekete-lila átoklángja végigég az indáin, és összeszorul.';R16P[p.name]=f;}}
{const CV={};const cageFire=(cage,fw,w,h,t)=>{const k=Math.round(w)+'x'+Math.round(h);let c=CV[k];if(!c){c=CV[k]=document.createElement('canvas');c.width=Math.ceil(w);c.height=Math.ceil(h);}
  const g=c.getContext('2d');g.globalCompositeOperation='source-over';g.clearRect(0,0,c.width,c.height);
  for(const [ph,al] of [[0,1],[2.3,.8]]){const sy=1+.1*Math.sin(t*6+ph),fh=h*1.05*sy;g.globalAlpha=al;g.save();g.translate(w/2,h);g.transform(1,0,Math.sin(t*5+ph)*.08,1,0,0);g.drawImage(fw,-w*.6,-fh,w*1.2,fh);g.restore();}
  g.globalAlpha=1;g.globalCompositeOperation='destination-in';g.drawImage(cage,0,0,w,h);return c;};
 window.r21CageFire=cageFire;}
{const R0=R16P['Lángoló Átokketrec'];R16P['Lángoló Átokketrec']=async(A1,B1,al,sk,p)=>{const im=R17I.rootcage,fw=R17I.firewall;if(!im||!fw)return R0(A1,B1,al,sk,p);
  const dr=A1.type==='druid'?A1:B1,wi=dr===A1?B1:A1;await dimTo(.72,'15,5,30',300);await r16Raise(dr,'150,230,90');sfx('rock');rumble&&rumble(1,8);
  const V=al.map(t=>({t,k:0,burn:0,sq:0}));const E={on:true};
  R18E({update(){return E.on;},draw(){for(const v of V){if(v.k<=0)continue;const w=Math.max(240,v.t.w*v.t.scale*2.3)*(1-v.sq*.12),h=w*im.height/im.width,gy=v.t.y+v.t.oy+20;
    ctx.save();ctx.translate(cx(v.t),gy);ctx.scale(1,v.k);ctx.drawImage(im,-w/2,-h,w,h);
    if(v.burn>0){const c=r21CageFire(im,fw,w,h,T);ctx.globalAlpha=Math.min(1,v.burn*1.2);ctx.drawImage(c,-w/2,-h,w,h);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.45*v.burn;ctx.drawImage(c,-w/2,-h,w,h);}
    ctx.restore();}}});
  for(const v of V){for(let i=0;i<20;i++)part({x:cx(v.t)+rnd(-90,90),y:v.t.y+v.t.oy,vx:rnd(-220,220),vy:rnd(-400,-120),g:800,life:.8,size:rnd(6,11),rgb:'100,75,50',add:false,shape:'rock'});tween(420,k=>v.k=r21ease.back(k));await wait(90);}
  await wait(380);for(const v of V)v.t.hurt=.4;shake(12);r16Lower(dr);await r16Raise(wi,'160,80,230');sfx('dark');const h=handPos(wi);
  await Promise.all(V.map(v=>flyObj(h,{x:cx(v.t),y:midY(v.t)},360,(x,y,r,k)=>{if(!r21Flame(x,y+30,90,1,k*20))darkFlame({x,y,vx:0,vy:-40,life:.3,size:20});},{arc:90})));
  sfx('fire');sfx('wail');flash('120,40,200',.35,.15);shake(16);await tween(500,k=>{for(const v of V)v.burn=r21ease.out(k);});
  for(let i=0;i<3;i++){for(const v of V){tween(170,k=>v.sq=Math.sin(k*Math.PI));v.t.hurt=.4;sparks(cx(v.t),midY(v.t),['190,110,255','40,10,60'],14,360);}sfx('crunch');await wait(260);}
  for(const v of V){toss(v.t,40,320);hit(dr,v.t,sk);}r16Lower(wi);await wait(300);await tween(450,k=>{for(const v of V){v.k=1-k;v.burn=1-k;}});E.on=false;await dimTo(0,null,300);};}

// ---- PÁROS: Lótuszharmat – ÚJ FUNKCIÓ (nem gyógyít): „Lótuszébredés”. A lótusz harmata erőt ad: minden harcoló hős LIMIT-je
// +60%-kal, MP-je +40%-kal töltődik (a csíkok láthatóan telnek), a hősökön arany-zöld energia árad – így a következő körben
// jöhet a LIMIT vagy egy újabb páros támadás
{const p=PAIRS.find(x=>x.name==='Lótuszharmat');if(p){p.desc='Óriás lótusz nyílik a csapat alatt, harmata erőt ad: minden harcoló hős LIMIT-je +60%-kal, MP-je +40%-kal töltődik.';p.tgt='allies';}}
R16P['Lótuszharmat']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,fa=dr===A1?B1:A1,dd=R17I.dewdrop;await dimTo(.3,'10,30,40',250);await Promise.all([r16Raise(dr,'150,230,90'),r16Raise(fa,'150,230,255')]);sfx('holy');
  const hs=S.heroes.filter(h=>h.alive),mx=hs.reduce((s,h)=>s+cx(h),0)/hs.length,gy=Math.max(...hs.map(h=>h.y+h.oy))+14,top=Math.max(90,Math.min(...hs.map(topY))-120),L={s:0,a:1,lv:0,t:0,en:0},D=[];
  R18E({update(dt){L.t+=dt;for(const d of D){if(d.st!=='fall')continue;d.vy+=900*dt;d.y+=d.vy*dt;if(d.y>=d.ty){d.st='gone';for(let i=0;i<5;i++)part({x:d.x+rnd(-10,10),y:d.ty,vx:rnd(-120,120),vy:-rnd(80,200),g:700,life:.4,size:rnd(3,5),rgb:'220,250,200',add:false,shape:'drop'});}}
      if(L.en>0)for(const h of hs)if(Math.random()<.5)part({x:cx(h)+rnd(-30,30),y:h.y+h.oy-rnd(0,20),vx:rnd(-20,20),vy:-rnd(120,260),life:rnd(.6,1),size:rnd(3,6),rgb:pick(['255,230,120','180,255,150','255,255,255']),shape:'star'});return L.a>0;},
    draw(){if(L.s>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-30,380*L.s,'200,240,150',.3*L.a);ctx.restore();if(R17I.lotus){ctx.save();ctx.translate(mx,gy+50);ctx.rotate(.025*Math.sin(L.t*1.5));r17Draw(R17I.lotus,0,0,540*L.s,{anchor:'bottom',sy:.42*(.6+.4*L.s),a:L.a*.85});ctx.restore();}}
      if(L.lv>0&&R17I.dewleaves)r17Draw(R17I.dewleaves,Math.max(300,mx),top-30+Math.sin(L.t*2)*6,520*L.lv,{a:L.a});
      for(const d of D)if(d.st!=='gone'&&dd)r17Draw(dd,d.x,d.y,30*d.s,{a:L.a});
      if(L.en>0)for(const h of hs){ctx.save();ctx.globalCompositeOperation='lighter';const r=h.h*h.scale*.6;const g=ctx.createLinearGradient(0,h.y+h.oy,0,h.y+h.oy-r*2);g.addColorStop(0,`rgba(255,220,110,${.45*L.en})`);g.addColorStop(1,'rgba(160,255,140,0)');ctx.fillStyle=g;ctx.fillRect(cx(h)-r*.6,h.y+h.oy-r*2,r*1.2,r*2);ctx.restore();}}});
  await tween(900,k=>L.s=r21ease.back(k));
  const fh=handPos(fa);for(let i=0;i<40;i++)setTimeout(()=>part({x:fh.x,y:fh.y,vx:(mx-fh.x)*rnd(1.2,1.8)+rnd(-60,60),vy:(top-fh.y)*rnd(1,1.6),life:.7,size:rnd(3,6),rgb:pick(['180,240,255','255,255,255','255,230,140']),shape:'star'}),i*15);
  await tween(600,k=>L.lv=r21ease.back(k));sfx('heal');
  for(let i=0;i<36;i++){const h=pick(hs),d={x:cx(h)+rnd(-60,60),y:top+rnd(10,50),vy:0,ty:midY(h)+rnd(-20,30),s:rnd(.8,1.3),st:'fall'};setTimeout(()=>D.push(d),i*40);}
  await wait(1400);sfx('levelup');popLabel(dr,'LÓTUSZÉBREDÉS!','#ffe9a0');
  const st=hs.map(h=>({h,l0:h.limit||0,m0:h.mp||0}));
  await tween(900,k=>{L.en=Math.sin(k*Math.PI)*.9+.1;for(const s of st){s.h.limit=Math.min(100,s.l0+60*k);s.h.mp=Math.min(s.h.maxMp,Math.round(s.m0+s.h.maxMp*.4*k));}updateHUD&&updateHUD();});
  for(const s of st){popLabel(s.h,'LIMIT +60%','#ffe070');popNum(s.h,Math.round(s.h.maxMp*.4),'mp');}
  await wait(500);r16Lower(fa);r16Lower(dr);await tween(500,k=>{L.a=1-k;L.en=0;});await dimTo(0,null,300);};
// a páros költsége (−50% LIMIT) a támadás UTÁN vonódik le, ezért a két részt vevő hősnél a +60%-ot utólag kell hozzáadni
{const pQ=perform;perform=async function(h,act){const r=await pQ.apply(this,arguments);try{if(act&&act.sk&&act.sk.pair&&act.sk.pair.name==='Lótuszharmat'){for(const x of [h,act.sk.partner])if(x&&x.alive)x.limit=Math.min(100,(x.limit||0)+60);updateHUD&&updateHUD();}}catch(e){}return r;};}

// ---- Kaelen LIMIT – Bambusz-gólem (a felhasználó: „nem is változtattál semmit”): most TELJESEN más: a gólem kinő, és
// dübörgő léptekkel (minden lépésnél himbálózik, por száll, a kép remeg) átsétál az ellenségekhez, két karját a magasba
// emeli, és teljes testtel lecsap – lökéshullám, minden ellenség alatt bambuszliget; aztán bambuszfal a hősök elé, és elsüllyed
A.bambooGolem=async(u,ts,sk)=>{const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,.14);sfx('quake');await dimTo(.45,'10,30,5',300);
  const im=R17I.bamgolem,GH=470,G={x:420,y:505,k:0,a:1,rot:0,sink:0,sy:1,lift:0};const al=ts.filter(e=>e.alive);
  R18E({update(){return G.a>0;},draw(){if(!im||G.k<=0)return;const w=GH*im.width/im.height;ctx.save();ctx.beginPath();ctx.rect(0,0,960,G.y+6);ctx.clip();ctx.globalAlpha=G.a;ctx.translate(G.x,G.y+G.sink-G.lift);ctx.rotate(G.rot);ctx.scale(1,G.sy);ctx.drawImage(im,-w/2,-GH*G.k,w,GH*G.k);ctx.restore();}});
  for(let i=0;i<50;i++)part({x:G.x+rnd(-150,150),y:G.y,vx:rnd(-200,200),vy:rnd(-420,-150),life:rnd(.7,1.1),size:rnd(7,12),rgb:pick(['120,90,60','90,70,40']),g:700,add:false,shape:'rock'});
  rumble&&rumble(1,10);shake(16);await tween(800,k=>G.k=r21ease.back(k));kaeLeaves(G.x,G.y-260,50,380);sfx('growl');u.pose='idle';
  // dübörgő léptek az ellenségek felé
  const tx=Math.max(G.x,Math.min(...al.map(e=>cx(e)))-170),steps=3,x0=G.x;
  for(let s=0;s<steps;s++){const xa=x0+(tx-x0)*s/steps,xb=x0+(tx-x0)*(s+1)/steps,dir=s%2?1:-1;
    await tween(380,k=>{G.x=xa+(xb-xa)*r21ease.io(k);G.rot=.06*dir*Math.sin(k*Math.PI);G.lift=18*Math.sin(k*Math.PI);});
    sfx('quake');shake(14);G.sy=.96;tween(160,k=>G.sy=.96+.04*k);for(let i=0;i<16;i++)part({x:G.x+rnd(-90,90),y:G.y,vx:rnd(-200,200),vy:-rnd(60,220),g:800,life:.6,size:rnd(14,26),grow:20,rgb:'150,125,90',add:false,shape:'smoke'});}
  // két kar a magasba (hátradől, megnyúlik), aztán teljes testtel lecsap
  sfx('roar');await tween(420,k=>{const e=r21ease.out(k);G.rot=-.16*e;G.sy=1+.08*e;G.lift=30*e;});
  sfx('whoosh');await tween(180,k=>{const e=r21ease.in(k);G.rot=-.16+.42*e;G.sy=1.08-.14*e;G.lift=30*(1-e);});
  shake(34);sfx('boom');sfx('quake');flash('210,250,160',.35,.15);rumble&&rumble(1.2,12);groundCrack&&groundCrack(G.x+120,G.y-6,'120,90,60',360);dustWave&&dustWave(G.x+140,G.y);
  const P=[];R18E({update(){return G.a>0||P.length;},draw(){for(const p of P){if(p.grove&&p.k>0)r21GroveBurst(p.x,p.gy,p.w,p.k,G.a);}}});
  for(const t of al){const p={grove:true,x:cx(t),gy:t.y+t.oy+8,w:Math.max(340,t.w*t.scale*2.8),k:0};P.push(p);tween(340,k=>p.k=r21ease.back(k));kaeLeaves(cx(t),midY(t),50,460);t.hurt=.6;toss(t,150,700);hit(u,t,sk);await wait(90);}
  await tween(300,k=>{G.rot=.26*(1-k);G.sy=.94+.06*k;});
  const hs=S.heroes.filter(h=>h.alive);hs.forEach(h=>addStatus(h,'defUp',2));popLabel(u,'BAMBUSZFAL!','#b8e07a');await wait(700);
  await tween(650,k=>{G.sink=GH*r21ease.in(k);for(const p of P)p.k=Math.min(p.k,1-k);});G.a=0;P.length=0;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- PÁROS: Medvelovaglás (a felhasználó: „nem is javítottál semmit”, a medve „robotos”): a medve ÉLŐ VÁGTÁBAN fut
// (r21Gallop: nyúlás-összehúzódás, gerinchullám, ugrás), Grog a hátán együtt rugózik vele, minden ellenségnél nagy ugrás
// és lecsapás; a medve felágaskodása átúszik
R16P['Medvelovaglás']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,orc=dr===A1?B1:A1,osp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc,run=R17I.wsbear,rear=R17I.wsbear2||run;await dimTo(.35,'30,20,10',250);
  kaeLeaves(cx(dr),midY(dr),80,460);sfx('growl');flash('150,230,90',.3,.15);const a0=dr.alpha==null?1:dr.alpha,b0=orc.alpha==null?1:orc.alpha;const W0=560,gy=dr.y+dr.oy+8;
  const B={x:cx(dr),ph:0,run:0,R:0,a:0,s:.4,rot:0,hop:0,rider:0,gj:0,gr:0,on:true};
  const back=()=>{const w=W0*B.s,c=Math.sin(B.ph*6.283),lift=Math.max(0,Math.cos(B.ph*6.283))*w*.07*B.run;return {x:B.x-w*.06,y:gy-lift-B.hop-w*.42+(-.07*c*B.run)*w*.1};};
  R18E({update(dt){B.ph+=dt*2.4*B.run;if(B.run>.3&&Math.random()<.35)part({x:B.x-W0*.3,y:gy,vx:rnd(-200,-60),vy:-rnd(20,90),life:.6,size:rnd(16,28),grow:20,rgb:'160,130,90',add:false,shape:'smoke'});return B.on;},
    draw(){if(B.a<=0)return;ctx.save();ctx.globalAlpha=B.a;const w=W0*B.s;
      if(B.R<1)r21Gallop(run,B.x,gy-B.hop,w,B.ph,B.run,1-B.R,false);if(B.R>0&&rear){ctx.save();ctx.globalAlpha*=B.R;ctx.translate(B.x+w*.05,gy-B.hop);ctx.rotate(B.rot);const ww=w*.8,hh=ww*rear.height/rear.width;ctx.drawImage(rear,-ww/2,-hh,ww,hh);ctx.restore();}
      if(B.rider&&osp){const bp=back(),hh=orc.h*orc.scale*1.1,ww=hh*osp.width/osp.height;ctx.save();ctx.translate(bp.x,bp.y+hh*.35-B.gj);ctx.rotate(B.gr+(B.R>0?-.2*B.R:0));ctx.drawImage(osp,-ww/2,-hh,ww,hh);ctx.restore();}ctx.restore();}});
  await tween(420,k=>{dr.alpha=a0*(1-k);B.a=k;B.s=.4+.6*r21ease.back(k);});sfx('roar');shake(14);
  const ox=cx(orc),oy=orc.y+orc.oy,oo=orc.oy;await tween(420,k=>{const bp=back(),e=r21ease.io(k);orc.ox=(bp.x-ox)*e;orc.oy=oo+(bp.y+40-oy)*e;orc.jump=Math.sin(k*Math.PI)*120;});orc.alpha=0;orc.ox=0;orc.oy=oo;orc.jump=0;B.rider=1;sfx('hit');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b));B.run=1;sfx('roar');
  for(const t of xs){const x0=B.x,tx=cx(t)-W0*.36;
    await tween(700,k=>{B.x=x0+(tx-x0)*r21ease.io(k);if(Math.random()<.06)shake(3);});
    // nagy ugrás az ellenségre, felágaskodás (átúszik), Grog felpattan és lecsap
    sfx('roar');await tween(320,k=>{const e=r21ease.io(k);B.hop=60*Math.sin(k*Math.PI);B.R=e;B.run=1-e;B.rot=-.08*e;B.gj=70*e;B.gr=-.4*e;});
    sfx('whoosh');await tween(170,k=>{const e=r21ease.in(k);B.rot=-.08+.16*e;B.gj=70*(1-e);B.gr=-.4+.9*e;});
    shake(26);sfx('quake');sfx('hit');flash('255,230,190',.25,.08);groundCrack&&groundCrack(cx(t),t.y+t.oy,'140,110,80',220);dustWave&&dustWave(cx(t),t.y+t.oy);
    for(let i=0;i<30;i++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy,vx:rnd(-380,380),vy:rnd(-520,-150),g:1000,life:1,size:rnd(7,14),rgb:pick(['140,110,80','110,90,60']),add:false,shape:'rock'});
    toss(t,120,520);t.hurt=.7;hit(dr,t,sk);await tween(300,k=>{const e=r21ease.io(k);B.R=1-e;B.run=e;B.rot=.08*(1-e);B.gr=.5*(1-e);});}
  const x1=B.x;await tween(800,k=>{B.x=x1+(cx(dr)-x1)*r21ease.io(k);});B.run=0;
  B.rider=0;const bp=back();orc.alpha=b0;await tween(420,k=>{const e=r21ease.io(k);orc.ox=(bp.x-ox)*(1-e);orc.oy=oo+(bp.y+40-oy)*(1-e);orc.jump=Math.sin(k*Math.PI)*100;});orc.ox=0;orc.oy=oo;orc.jump=0;
  kaeLeaves(B.x,gy-150,60,380);await tween(320,k=>{B.a=1-k;dr.alpha=a0*k;});B.on=false;dr.alpha=a0;orc.alpha=b0;await dimTo(0,null,300);};

// ---- Matcha-gólem – Habgejzír (élethűbb, sima): a gejzír szeletenként hullámzik és gomolyog (nem merev kép), robbanásszerűen
// kilő, a tetején festett habcsomók (r21Froth) fröccsennek szét és hullanak vissza a hősre, gőz száll; folyamatos, nem szaggatott
{const ff=A.foamFlood;A.foamFlood=async(u,ts,sk)=>{const im=R17I.foamgeyser,al=ts.filter(t=>t.alive);if(u.type!=='matchagolem'||!im||!al.length)return ff(u,ts,sk);const rel=keepPose(u);try{
  u.pose='attack';await bodyWind(u,320,-.12);bodyStrike(u,200,.22);sfx('boom');sfx('quake');shake(18);rumble&&rumble(1,8);
  const G=al.map(t=>({t,k:0,a:1,gy:t.y+t.oy+10,H:Math.max(320,t.h*t.scale*2.2),fr:[]}));
  R18E({update(dt){for(const g of G){if(g.k>.4&&Math.random()<.6){const top=g.gy-g.H*g.k;g.fr.push({x:cx(g.t)+rnd(-20,20),y:top+rnd(0,30),vx:rnd(-200,200),vy:-rnd(150,380),r:rnd(14,30),l:0,rot:rnd(0,6)});}
      for(const f of g.fr){f.l+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=700*dt;}g.fr=g.fr.filter(f=>f.l<1.1&&f.y<g.gy);if(g.k>.3&&Math.random()<.3)r21Steam(cx(g.t)+rnd(-40,40),g.gy-g.H*g.k*.7,rnd(-30,30),-rnd(60,120),false);}return G.some(g=>g.a>0||g.fr.length);},
    draw(){for(const g of G){if(g.k>0&&g.a>0){const w=g.H*im.width/im.height,h=g.H*g.k,N=24,sh=im.height/N;ctx.save();ctx.globalAlpha=g.a;
        for(let i=0;i<N;i++){const q=i/N,dx=Math.sin(T*9+q*7)*w*.05*(1-q),sx=1+.08*Math.sin(T*13-q*9);ctx.drawImage(im,0,i*sh,im.width,sh+1,cx(g.t)-w*sx/2+dx,g.gy-h+q*h,w*sx,h/N+1);}ctx.restore();}
      for(const f of g.fr)r21Froth(f.x,f.y,f.r*(.7+f.l*.4),Math.min(1,(1.1-f.l)*3),f.rot);}}});
  for(const g of G){const t=g.t;sfx('steam');await tween(220,k=>{t.spin=.05*Math.sin(k*50);});t.spin=0;
    sfx('splash');sfx('boom');shake(14);t.hurt=.6;toss(t,150,700);hit(u,t,sk);tween(380,k=>g.k=r21ease.back(k));await wait(160);}
  await wait(900);await tween(700,k=>{for(const g of G){g.k=1-r21ease.in(k)*.95;g.a=1-k*.7;}});for(const g of G)g.a=0;await wait(400);await bodySettle(u);}finally{rel();}};}

// ---- Csészeharcos – Teafröccs (élethűbb, sima): a festett tea-hullám képe (fx7-teawave) hajlik végig az íven, mint egy valódi
// teasugár (r17Snake), a merőkanál nagy lendülettel hátra-előre lendül, a hősön festett fröccs-korona és gőz
{const ts0=A.teaSplash;A.teaSplash=async(u,ts,sk)=>{const im=R17I.teawave,t=ts[0];if(!im||!t)return ts0(u,ts,sk);const rel=keepPose(u);try{u.pose='attack';const l=()=>KP(u,.08,.17);
  sfx('splash');await bodyWind(u,420,-.25);
  const S1={head:0,tail:0,on:true};const a0=l(),b0={x:cx(t),y:midY(t)-6},Hh=150;const at=q=>({x:a0.x+(b0.x-a0.x)*q,y:a0.y+(b0.y-a0.y)*q-Math.sin(q*Math.PI)*Hh});
  R18E({update(){return S1.on;},draw(){if(S1.head<=S1.tail)return;const P=[];for(let q=S1.head;q>=S1.tail-1e-6;q-=.02)P.push(at(q));if(P.length<2)return;let L=0;for(let i=1;i<P.length;i++)L+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y);
    r17Snake(im,P,L,46,.95);const hp=P[0];if(Math.random()<.7)part({x:hp.x,y:hp.y,vx:rnd(-80,80),vy:rnd(-160,20),g:900,life:.5,size:rnd(4,8),rgb:pick(['205,125,30','230,155,50']),add:false,shape:'drop'});}});
  bodyStrike(u,260,.3);sfx('whoosh');await tween(380,k=>{S1.head=r21ease.out(k);S1.tail=Math.max(0,S1.head-.7);});await tween(200,k=>{S1.tail=.3+.7*k;});S1.on=false;
  shake(16);sfx('splash');sfx('steam');t.hurt=.6;toss(t,50,360);
  const sp=R17I.teasplash;if(sp){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<1.1;},draw(){const k=Math.min(1,st.t/.22),a=st.t<.6?1:1-(st.t-.6)/.5;r17Draw(sp,cx(t),t.y+t.oy+6,(t.w*t.scale*2.6+120)*(.4+.6*r21ease.back(k)),{anchor:'bottom',a,sy:.8+.35*k});}});}
  for(let i=0;i<50;i++)part({x:cx(t)+rnd(-24,24),y:midY(t)+rnd(-30,20),vx:rnd(-380,380),vy:rnd(-480,-80),g:1000,life:rnd(.6,1.1),size:rnd(6,13),rgb:pick(['205,125,30','230,155,50','170,95,20']),add:false,shape:'drop'});
  for(let i=0;i<6;i++)r21Steam(cx(t)+rnd(-40,40),midY(t)-20,rnd(-30,30),-rnd(70,140),false);
  hit(u,t,sk);await wait(500);await bodySettle(u);}finally{rel();}};}
