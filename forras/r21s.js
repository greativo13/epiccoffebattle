// ===== 30. kör: a tesztlap ca-pontjainak javításai =====

// ---- Vad Alakváltás – medve (ca21: „robotos, darabos”): valódi, festett 4 fázisú vágta (fx7-bearrun0..3), a fázisok
// rövid átúsztatással váltják egymást, a test minden ugrásnál kicsit emelkedik; a felágaskodás (wsbear2) változatlan
const R21BR=()=>{const f=[0,1,2,3].map(i=>R17I['bearrun'+i]);return f.every(Boolean)?f:null;};
{const g0=r21Gallop;r21Gallop=function(im,x,y,w,ph,run=1,a=1,fx=false){const F=R21BR();if(!F||!im||im!==R17I.wsbear)return g0.apply(this,arguments);
  const p=(((ph%1)+1)%1)*4,i=Math.floor(p)%4,fr=p-Math.floor(p),A0=F[i],A1=F[(i+1)%4],W=w*1.18,H=W*A0.height/A0.width,lift=Math.max(0,Math.sin(ph*6.283))*w*.05*run,bl=Math.max(0,(fr-.55)/.45);
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y-lift);if(fx)ctx.scale(-1,1);ctx.rotate(-.03*Math.sin(ph*6.283)*run);
  ctx.save();ctx.globalAlpha*=1-bl*.5;ctx.drawImage(A0,-W/2,-H,W,H);ctx.restore();if(bl>0){ctx.save();ctx.globalAlpha*=bl;ctx.drawImage(A1,-W/2,-H,W,H);ctx.restore();}
  ctx.restore();};}

// ---- Kígyótest (ca03 Tekeredés, ca21 kígyóforma): „fejjel lefelé van, akad, befagy”
// – ahol a test balra halad, a szelet tükröződik (a háta mindig felül), – a testen folyamatosan végigfut egy kígyózó hullám,
// így az összeszorítások alatt sem áll meg a kép
function r21Snake2(im,P,thick,a=1,dim=.5){if(!im||P.length<2)return;const N=64,W=im.width,H=im.height,sw=W/N;
  const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y));const tot=L[L.length-1];if(tot<2)return;
  let j=1;const S=[];for(let i=0;i<N;i++){const d=(i+.5)*tot/N;while(j<L.length-1&&L[j]<d)j++;const q=(d-L[j-1])/Math.max(1e-6,L[j]-L[j-1]),A=P[j-1],B=P[j];
    S.push({x:A.x+(B.x-A.x)*q,y:A.y+(B.y-A.y)*q,b:A.b,ang:Math.atan2(B.y-A.y,B.x-A.x)});}
  const sl=tot/N;for(const pass of [1,0])for(let i=N-1;i>=0;i--){const p=S[i];if((p.b?1:0)!==pass)continue;ctx.save();ctx.globalAlpha=a*(p.b?dim:1);ctx.translate(p.x,p.y);ctx.rotate(p.ang);
    if(Math.cos(p.ang)<0)ctx.scale(1,-1);ctx.drawImage(im,i*sw,0,sw+1,H,-sl/2-.6,-thick/2,sl+1.2,thick);ctx.restore();}}
r21DrawCoil=function(im,P,thick,a=1){if(!im||P.length<2)return;const n=P.length;
  const Q=P.map((p,i)=>{if(i===0||i===n-1)return p;const dx=P[i+1].x-P[i-1].x,dy=P[i+1].y-P[i-1].y,l=Math.hypot(dx,dy)||1,w=Math.sin(i*.42-T*11)*thick*.16*Math.min(1,i/6);return {x:p.x-dy/l*w,y:p.y+dx/l*w,b:p.b};});
  r21Snake2(im,Q,thick,a,.5);};

// ---- Matcha-gólem – Forró hab (ca05: „nem törik fel a földből, csak megjelenik”): előbb a föld megreped és remeg a hős
// alatt, gőz szivárog, aztán a festett habgejzír ALULRÓL, a talajból tör ki (a talaj alatt nem látszik), kő- és földdarabok
// repülnek szét, és csak utána húzódik vissza a földbe
{const ff=A.foamFlood;A.foamFlood=async(u,ts,sk)=>{const im=R17I.foamgeyser,al=ts.filter(t=>t.alive);if(u.type!=='matchagolem'||!im||!al.length)return ff(u,ts,sk);const rel=keepPose(u);try{
  u.pose='attack';await bodyWind(u,320,-.12);bodyStrike(u,200,.22);sfx('boom');sfx('quake');shake(18);rumble&&rumble(1,8);
  const G=al.map(t=>({t,k:0,a:1,gy:t.y+t.oy+10,H:Math.max(340,t.h*t.scale*2.3),fr:[],cr:0}));
  R18E({update(dt){for(const g of G){if(g.k>.25&&g.k<1.2&&Math.random()<.6){const top=g.gy-g.H*Math.min(1,g.k);g.fr.push({x:cx(g.t)+rnd(-20,20),y:top+rnd(0,30),vx:rnd(-200,200),vy:-rnd(150,380),r:rnd(14,30),l:0,rot:rnd(0,6)});}
      for(const f of g.fr){f.l+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=700*dt;}g.fr=g.fr.filter(f=>f.l<1.1&&f.y<g.gy);
      if(g.cr>0&&g.k<=0&&Math.random()<.5)r21Steam(cx(g.t)+rnd(-50,50),g.gy-4,rnd(-20,20),-rnd(40,90),false);
      if(g.k>.3&&Math.random()<.3)r21Steam(cx(g.t)+rnd(-40,40),g.gy-g.H*g.k*.7,rnd(-30,30),-rnd(60,120),false);}return G.some(g=>g.a>0||g.fr.length);},
    draw(){for(const g of G){const x=cx(g.t);
      // repedés a talajon (sötét, szétágazó vonalak, belül izzó matcha)
      if(g.cr>0){ctx.save();ctx.globalAlpha=Math.min(1,g.cr)*g.a;ctx.lineCap='round';for(const [c,w] of [['rgba(40,28,15,.9)',7],['rgba(170,240,120,.8)',2.5]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();
        for(let r=0;r<7;r++){const an=r/7*6.283+.4,L=(60+r%3*30)*Math.min(1,g.cr);ctx.moveTo(x,g.gy);ctx.lineTo(x+Math.cos(an)*L*.5+Math.sin(r*3)*8,g.gy+Math.sin(an)*L*.09);ctx.lineTo(x+Math.cos(an)*L,g.gy+Math.sin(an)*L*.16);}ctx.stroke();}ctx.restore();}
      if(g.k>0&&g.a>0){const w=g.H*im.width/im.height,H=g.H,top=g.gy-H*Math.min(1.05,g.k),N=24,sh=im.height/N;ctx.save();ctx.beginPath();ctx.rect(0,0,960,g.gy+4);ctx.clip();ctx.globalAlpha=g.a;
        for(let i=0;i<N;i++){const q=i/N,dx=Math.sin(T*9+q*7)*w*.05*(1-q),sx=1+.08*Math.sin(T*13-q*9);ctx.drawImage(im,0,i*sh,im.width,sh+1,x-w*sx/2+dx,top+q*H,w*sx,H/N+1);}ctx.restore();}
      for(const f of g.fr)r21Froth(f.x,f.y,f.r*(.7+f.l*.4),Math.min(1,(1.1-f.l)*3),f.rot);}}});
  for(const g of G){const t=g.t,x=cx(t);sfx('quake');await tween(320,k=>{g.cr=k;t.spin=.05*Math.sin(k*50);if(Math.random()<.4)part({x:x+rnd(-50,50),y:g.gy,vx:rnd(-40,40),vy:-rnd(30,90),g:600,life:.4,size:rnd(3,6),rgb:'110,85,55',add:false,shape:'rock'});});t.spin=0;
    sfx('splash');sfx('boom');shake(16);rumble&&rumble(.8,6);t.hurt=.6;toss(t,170,720);hit(u,t,sk);
    for(let n=0;n<34;n++)part({x:x+rnd(-40,40),y:g.gy-rnd(0,10),vx:rnd(-340,340),vy:-rnd(200,620),g:950,life:rnd(.6,1.1),size:rnd(6,14),rgb:pick(['110,85,55','90,70,45','140,115,80']),add:false,shape:'rock'});
    for(let n=0;n<10;n++)part({x:x+rnd(-60,60),y:g.gy,vx:rnd(-200,200),vy:-rnd(20,90),life:rnd(.6,1),size:rnd(18,30),grow:30,rgb:'150,125,95',add:false,shape:'smoke'});
    tween(420,k=>g.k=r21ease.back(k));await wait(170);}
  await wait(900);await tween(700,k=>{for(const g of G){g.k=1-r21ease.in(k);g.cr=1-k;}});for(const g of G)g.a=0;await wait(300);await bodySettle(u);}finally{rel();}};}

// ---- Kaelen – Levéltánc (ca14: „folyamatosan menjenek a levelek, ne darabosan”): a levelek nem hullámokban, hanem egyetlen
// folyamatos, kígyózó levélfolyamként áramlanak a botjától az ellenségig; közben a pörgő levélkoszorú is fogy, a találatok
// a folyam közben, megállás nélkül érkeznek
{const ld=A.leafDance;A.leafDance=async(u,ts,sk)=>{const lf=R17I.leaf,t=ts[0];if(!lf||!t)return ld(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,160,.1);sfx('wind');
  const ox=cx(u),oy=midY(u),RX=u.w*u.scale*.7+40,N=42,tx=cx(t),ty=midY(t);
  const L=[...Array(N)].map((_,i)=>({a:i/N*6.283,y:rnd(-.4,.35),s:rnd(.75,1.15),st:'orb',x:ox,yy:oy,rot:0,sw:rnd(-1,1)}));const E={on:true,t:0,R:0};
  R18E({update(dt){E.t+=dt;for(const l of L){if(l.st==='orb'){const a=l.a+E.t*6;l.x=ox+Math.cos(a)*RX*E.R;l.yy=oy+l.y*u.h*u.scale*.7+Math.sin(a)*34*E.R;l.rot=a+1.6;l.front=Math.sin(a)>0;}
      else if(l.st==='fly'){l.k+=dt/.55;if(l.k>=1){l.st='gone';part({x:tx+rnd(-25,25),y:ty+rnd(-35,35),vx:rnd(-260,260),vy:rnd(-240,60),g:500,life:rnd(.4,.7),size:rnd(6,9),rgb:pick(['110,190,70','150,220,90']),add:false,shape:'leaf'});continue;}
        const e=l.k*l.k*(3-2*l.k),x0=l.x0,y0=l.y0;l.x=x0+(tx-x0)*e;l.yy=y0+(ty-y0)*e-Math.sin(e*Math.PI)*70+Math.sin(l.k*12+l.sw*3)*22*(1-e);l.rot+=dt*14;}}return E.on;},
    draw(){for(const l of L)if(l.st!=='gone')r17Draw(lf,l.x,l.yy,40*l.s,{rot:l.rot,a:l.st==='orb'&&!l.front?.6:1});}});
  await tween(240,k=>E.R=r21ease.out(k));const sub=Object.assign({},sk,{pow:sk.pow/3});
  // folyamatos kiáramlás: 42 levél egymás után, 32 ms-onként; három találat a folyam közben
  const wh=setInterval(()=>sfx('whoosh'),260);let hits=0;
  for(let i=0;i<N;i++){const l=L[i];l.st='fly';l.k=0;l.x0=l.x;l.y0=l.yy;await wait(32);
    if(i===14||i===28){sfx('slash');t.hurt=.4;shake(5);hit(u,t,sub);hits++;}}
  await wait(560);clearInterval(wh);sfx('slash');t.hurt=.5;shake(8);hit(u,t,sub);toss(t,60,380);E.on=false;await bodySettle(u);}finally{rel();}};}

// ---- Kaelen – Tövisvihar (ca10: „gagyi, legyen látványosabb, élethűbb”): nagyobb, kétrétegű festett tövis-forgószél
// (mögötte egy halványabb, ellentétes fázisú második tölcsér a mélységért), a talpánál gomolygó porfelhő és körbefutó
// porgyűrű, sok repülő levél, rózsaszirom és kődarab, az elkapott ellenségeket a tölcsér felemeli és megpörgeti, majd kidobja
{const ts0=A.thornStorm;A.thornStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const im=R17I.rosestorm||R17I.thornstorm,lf=R17I.leaf;if(!al.length||!im)return ts0(u,ts,sk);
  const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,280,.14);sfx('wind');const h=handPos(u);await dimTo(.35,'20,25,10',300);
  const gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length+10,Tw={x:h.x,y:h.y,s:.12,a:1,t:0,on:true},
    O=[...Array(70)].map(()=>({q:rnd(.03,.97),ph:rnd(0,6.28),sp:rnd(4,8),s:rnd(.6,1.2),kind:Math.random()<.7?'leaf':'rock'}));
  R18E({update(dt){Tw.t+=dt;if(Tw.on&&Tw.s>.5){if(Math.random()<.6)part({x:Tw.x+rnd(-80,80),y:gy-rnd(0,10),vx:rnd(-140,140),vy:-rnd(40,120),life:rnd(.5,.8),size:rnd(14,24),grow:22,rgb:pick(['150,125,90','120,100,70','170,150,110']),add:false,shape:'smoke'});
      if(Math.random()<.8)part({x:Tw.x+rnd(-60,60),y:gy-rnd(60,360),vx:rnd(-300,300),vy:rnd(-200,60),g:200,life:rnd(.6,1),size:rnd(5,8),rgb:pick(['200,40,50','230,80,90','170,20,40']),add:false,shape:'leaf'});
      if(Math.random()<.5)part({x:Tw.x+rnd(-70,70),y:gy-rnd(0,10),vx:rnd(-200,200),vy:-rnd(200,420),g:800,life:.7,size:rnd(4,8),rgb:pick(['150,120,80','120,95,60']),add:false,shape:'rock'});}return Tw.a>0;},
    draw(){if(Tw.a<=0)return;const H=540*Tw.s,base=Tw.y;
      // porgyűrű a talpánál
      ctx.save();ctx.globalAlpha=Tw.a*.55*Math.min(1,Tw.s);ctx.translate(Tw.x,base+6);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,10,0,0,220*Tw.s);g.addColorStop(0,'rgba(120,100,70,.7)');g.addColorStop(1,'rgba(120,100,70,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,220*Tw.s,0,6.283);ctx.fill();ctx.restore();
      const orb=front=>{for(const o of O){const an=o.ph+Tw.t*o.sp,f=Math.sin(an)>0;if(f!==front)continue;const r=(36+o.q*H*.36),yy=base-o.q*H+Math.sin(an)*r*.18,xx=Tw.x+Math.cos(an)*r;
        if(o.kind==='leaf'&&lf)r17Draw(lf,xx,yy,44*o.s*Tw.s,{rot:an*2,a:Tw.a*(front?1:.5)});else{ctx.save();ctx.globalAlpha=Tw.a*(front?1:.5);ctx.fillStyle='#6b5536';ctx.translate(xx,yy);ctx.rotate(an*3);ctx.fillRect(-5*o.s,-4*o.s,10*o.s,8*o.s);ctx.restore();}}};
      orb(false);ctx.save();ctx.globalAlpha=.4;ctx.translate(Tw.x,0);ctx.scale(-1.18,1);r21Twister(im,0,base+10,H*1.08,Tw.t+1.3,Tw.a);ctx.restore();
      r21Twister(im,Tw.x,base+8,H,Tw.t,Tw.a);orb(true);}});
  await tween(600,k=>{Tw.s=.12+.88*r21ease.back(k);Tw.y=h.y+(gy-h.y)*r21ease.io(k);});bodyStrike(u,180,-.2);sfx('whoosh');rumble&&rumble(1.6,4);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x0=Tw.x,x1=cx(xs[xs.length-1])+80,caught=new Map();const wnd=setInterval(()=>sfx('wind'),280);
  await tween(2000,k=>{Tw.x=x0+(x1-x0)*r21ease.io(k);Tw.s=1+.05*Math.sin(k*24);if(Math.random()<.15)shake(4);
    for(const t of xs){const d=Math.abs(Tw.x-cx(t));if(!caught.has(t)&&d<60){caught.set(t,k);sfx('slash');shake(12);t.hurt=.6;
        for(let n=0;n<34;n++)part({x:cx(t),y:midY(t),vx:rnd(-420,420),vy:rnd(-380,80),g:500,life:.9,size:rnd(8,14),rgb:pick(['108,191,58','77,154,42','155,216,90','200,40,50']),add:false,shape:'leaf'});hit(u,t,sk);}
      // a tölcsér felkapja, megpörgeti és kidobja
      if(caught.has(t)){const q=(k-caught.get(t))*4.5;if(q<1){t.spin=q*Math.PI*6;t.jump=Math.sin(q*Math.PI)*170;}else{t.spin=0;t.jump=0;}}}});
  clearInterval(wnd);for(const t of xs){t.spin=0;t.jump=0;if(caught.has(t))toss(t,80,500);else if(t.alive)hit(u,t,sk);}Tw.on=false;
  await tween(550,k=>{Tw.a=1-k;Tw.s=1+.35*k;});await dimTo(0,null,300);await bodySettle(u);}finally{for(const t of al){t.spin=0;t.jump=0;}rel();}};}

// ---- hegyes bambuszkaró: a festett bambuszrúd (fx7-bamboopole) levelei levágva, a teteje ferdén hegyesre vágva (világos
// vágásfelülettel); a földből szúr ki (a talaj alatt nem látszik)
function r21Stake(x,gy,H,k,lean=0,a=1){const im=R17I.bamboopole;if(!im||k<=0)return;const w=H*im.width/im.height,sw=w*.2,Hc=H*.8;
  ctx.save();ctx.beginPath();ctx.rect(0,0,960,gy+2);ctx.clip();ctx.globalAlpha*=a;ctx.translate(x,gy+Hc*(1-Math.min(1,k)));ctx.rotate(lean);
  const yc=xx=>-Hc+(sw/2-xx)*2.6;ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(w/2,0);ctx.lineTo(w/2,yc(w/2));ctx.lineTo(-w/2,yc(-w/2));ctx.closePath();ctx.save();ctx.clip();
  ctx.drawImage(im,-w/2,-H,w,H);ctx.restore();
  ctx.strokeStyle='rgba(232,240,190,.95)';ctx.lineWidth=Math.max(2,sw*.22);ctx.beginPath();ctx.moveTo(-sw*.45,yc(-sw*.45));ctx.lineTo(sw*.45,yc(sw*.45));ctx.stroke();ctx.restore();}

// ---- PÁROS: Bambuszliget (ca17: „túl gyors, a nyilakból legyenek a bambuszkarók, hegyes legyen a vége”): Jázmin lassabban,
// egyenként lő; minden nyílvessző a földbe fúródik, és ABBÓL a pontból hegyes bambuszkaró szúr ki (a nyílvessző eltűnik
// a karóban), a karók megemelik az ellenséget; a végén lassan visszahúzódnak
R16P['Bambuszliget']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,monk=dr===A1?B1:A1,arw=FX_IMG.jzarrow;await dimTo(.3,'10,30,5',300);
  await r16Raise(dr,'150,230,90');r16Lower(dr);const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),P=[],AR=[],E={a:1};
  R18E({update(){return E.a>0;},draw(){for(const r of AR)if(r.a>0&&arw)r17Draw(arw,r.x,r.y,140,{rot:r.an,a:r.a*E.a});for(const q of P)r21Stake(q.x,q.gy,q.H,q.k,q.l,E.a);}});
  monk.pose='attack';const shots=[];for(const t of xs)for(const dx of [-50,0,50])shots.push({t,dx});
  await Promise.all(shots.map((s,i)=>wait(i*260).then(()=>{const h=handPos(monk),t=s.t,gx=cx(t)+s.dx,gy=t.y+t.oy+6;sfx('whoosh');
    return flyObj(h,{x:gx,y:gy},460,(x,y)=>{const an=Math.atan2(gy-h.y,gx-h.x);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,34,'180,255,140',.7);ctx.restore();if(arw)r17Draw(arw,x,y,140,{rot:an});},{arc:90,trail:['180,255,140','255,255,255']})
      .then(async()=>{const an=Math.atan2(gy-h.y,gx-h.x),ar={x:gx-Math.cos(an)*30,y:gy-Math.sin(an)*30,an,a:1};AR.push(ar);sfx('rock');shake(5);
        for(let n=0;n<8;n++)part({x:gx,y:gy,vx:rnd(-160,160),vy:-rnd(80,260),g:800,life:.6,size:rnd(4,8),rgb:pick(['120,95,60','150,220,90']),add:false,shape:'rock'});
        // a nyíl izzik, a föld megremeg, majd a nyíl helyéből kiszúr a hegyes karó
        await tween(260,k=>{ar.glow=k;if(Math.random()<.3)part({x:gx,y:gy,vx:rnd(-30,30),vy:-rnd(40,90),life:.4,size:rnd(3,5),rgb:'180,255,140',shape:'star'});});
        const q={x:gx,gy,H:Math.max(260,t.h*t.scale*1.6)*rnd(.85,1.1),k:0,l:s.dx*.0022+rnd(-.04,.04)};P.push(q);sfx('quake');shake(9);ar.a=0;
        await tween(380,k=>q.k=r21ease.back(k));t.hurt=.5;tween(420,k=>t.jump=Math.max(t.jump||0,150*Math.sin(k*Math.PI*.5)));});})));
  monk.pose='idle';sfx('quake');shake(20);kaeLeaves((cx(xs[0])+cx(xs[xs.length-1]))/2,220,80,520);await wait(600);
  await tween(380,k=>{for(const t of xs)t.jump=150*(1-k*k);});for(const t of xs){t.jump=0;toss(t,40,300);hit(dr,t,sk);}shake(24);
  await wait(700);await tween(800,k=>{for(const q of P)q.k=Math.min(q.k,1-r21ease.in(k));});E.a=0;await dimTo(0,null,300);};

// ---- PÁROS: Lótuszharmat (ca20): a lehulló harmatcseppek után a lótuszszirmok összeállnak egy szirmokból álló női alakká
// (festett fx7-lotuswoman), aki nagy széllel végigszalad az ellenségeken (meglöki, meghajlítja őket) és szirmokat hullajt;
// a funkció (LIMIT +60%, MP +40%) változatlan
{const L0=R16P['Lótuszharmat'];R16P['Lótuszharmat']=async(A1,B1,al,sk,p)=>{const lw=R17I.lotuswoman;if(!lw)return L0(A1,B1,al,sk,p);
  // az eredeti jelenet a „LÓTUSZÉBREDÉS!” előtt megáll: a popLabel-t elkapjuk, és ott lefut a lótusznő
  const pl=popLabel;let run=null;popLabel=function(e,txt){if(txt==='LÓTUSZÉBREDÉS!'&&!run){run=r21LotusRun(lw,al);popLabel=pl;}return pl.apply(this,arguments);};
  try{await L0(A1,B1,al,sk,p);}finally{popLabel=pl;}if(run)await run;};}
async function r21LotusRun(lw,al){const foes=S.enemies.filter(t=>t.alive),H=320,W=H*lw.width/lw.height,gy=foes.length?Math.max(...foes.map(t=>t.y+t.oy))+6:460;
  const F={x:300,a:0,g:0,t:0,on:true},PET=[...Array(60)].map(()=>({x:rnd(0,960),y:rnd(40,520),tx:300+rnd(-W*.3,W*.3),ty:gy-rnd(20,H-20)}));
  R18E({update(dt){F.t+=dt;if(F.a>.5&&F.run){for(let i=0;i<3;i++)part({x:F.x-W*.3+rnd(-30,30),y:gy-rnd(40,H*.8),vx:rnd(-260,-60),vy:rnd(-40,80),g:60,life:rnd(.8,1.4),size:rnd(6,10),rgb:pick(['255,170,200','255,210,225','250,140,180']),add:false,shape:'leaf',drag:1});
        if(Math.random()<.6)part({x:F.x+rnd(-80,200),y:gy-rnd(20,H),vx:rnd(500,800),vy:rnd(-20,20),life:.4,size:rnd(2,3),rgb:'255,255,255',shape:'streak'});}return F.on;},
    draw(){// szirmok gyűlnek össze
      if(F.g<1)for(const p of PET){const e=F.g*F.g*(3-2*F.g),x=p.x+(p.tx-p.x)*e,y=p.y+(p.ty-p.y)*e;ctx.save();ctx.globalAlpha=(1-F.a)*.95;ctx.fillStyle='#ffb3cf';ctx.translate(x,y);ctx.rotate(F.t*4+p.x);ctx.beginPath();ctx.ellipse(0,0,8,4,0,0,6.283);ctx.fill();ctx.restore();}
      if(F.a>0){const bob=Math.abs(Math.sin(F.t*9))*10*(F.run?1:0);ctx.save();ctx.globalAlpha=F.a;ctx.translate(F.x,gy-bob);ctx.rotate(F.run?.06:0);ctx.drawImage(lw,-W/2,-H,W,H);ctx.restore();}}});
  sfx('holy');await tween(800,k=>{F.g=k;});await tween(350,k=>{F.a=k;});sfx('wind');F.run=true;const wnd=setInterval(()=>sfx('wind'),300),hit0=new Set();
  const x0=F.x,x1=1080;await tween(1500,k=>{F.x=x0+(x1-x0)*r21ease.io(k);for(const t of foes)if(!hit0.has(t)&&Math.abs(F.x-cx(t))<70){hit0.add(t);t.hurt=.3;toss(t,30,320);t.spin=.25;setTimeout(()=>t.spin=0,400);shake(6);
      for(let n=0;n<16;n++)part({x:cx(t),y:midY(t),vx:rnd(100,420),vy:rnd(-200,60),g:200,life:rnd(.7,1.1),size:rnd(6,10),rgb:pick(['255,170,200','255,210,225']),add:false,shape:'leaf'});}});
  clearInterval(wnd);F.on=false;}

// ---- Medvelovaglás helyett (ca16: „nem kell, találj ki mást”): PÁROS Kaelen + Grog – Élő Tölgybárd. Kaelen indái és
// tölgyfája Grog fejszéje köré nőnek, a fejsze óriási, élő, leveles tölgybárddá válik GROG KEZÉBEN; Grog felugrik, és egy
// hatalmas lecsapással a földbe vágja: gyökerek törnek fel minden ellenség alatt
{const p=PAIRS.find(x=>x.name==='Medvelovaglás');if(p){p.name='Élő Tölgybárd';p.pow=2;p.desc='Kaelen indái Grog fejszéje köré nőnek, óriási élő tölgybárddá változtatják; Grog felugrik, és a földbe vágja – minden ellenség alatt gyökerek törnek fel.';}}
R16P['Élő Tölgybárd']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,orc=dr===A1?B1:A1,ax=R17I.oakaxe;
  if(!ax&&R16P['Medvelovaglás'])return R16P['Medvelovaglás'](A1,B1,al,sk,p);
  await dimTo(.4,'20,25,10',280);const rel=keepPose(orc,'cast'),SW0={a:ENEMY_SPR['orc-cast'],b:ENEMY_SPR['orcG-cast']};
  // Grog saját fejszéje eltűnik (fejsze nélküli kép), az élő tölgybárd az ő üres, felemelt öklében van
  if(ENEMY_SPR['orcnoaxe-cast'])ENEMY_SPR['orc-cast']=ENEMY_SPR['orcnoaxe-cast'];if(ENEMY_SPR['orcGnoaxe-cast'])ENEMY_SPR['orcG-cast']=ENEMY_SPR['orcGnoaxe-cast'];const FIST=()=>KP(orc,.245,.245);try{await r16Raise(dr,'150,230,90');
    const X={k:0,rot:-.2,a:1,on:true},AXH=()=>orc.h*orc.scale*(.5+.55*X.k);
    // a bárd Grog kezében: a nyél alja a markában, a forgatás pontja a kéz
    R18E({update(){return X.on;},draw(){if(X.a<=0)return;const hp=FIST(),h=AXH(),w=h*ax.width/ax.height;ctx.save();ctx.globalAlpha=X.a;ctx.translate(hp.x,hp.y);ctx.rotate(X.rot);ctx.drawImage(ax,-w*.4,-h*.9,w,h);ctx.restore();}});
    // indák kúsznak Kaelentől Grog kezéig, a bárd megnő
    const hp0=handPos(dr),ho=FIST();sfx('rock');for(let i=0;i<40;i++)setTimeout(()=>part({x:hp0.x,y:hp0.y,vx:(ho.x-hp0.x)*rnd(1.6,2.2),vy:(ho.y-hp0.y)*rnd(1.6,2.2)-rnd(0,80),life:.5,size:rnd(7,11),rgb:pick(KAE.leaf),add:false,shape:'leaf'}),i*18);
    await tween(900,k=>{X.k=r21ease.back(k);if(Math.random()<.4)part({x:ho.x+rnd(-30,30),y:ho.y-rnd(0,AXH()),vx:rnd(-60,60),vy:-rnd(20,80),life:.6,size:rnd(6,10),rgb:pick(KAE.leaf),add:false,shape:'leaf'});});
    sfx('growl');r16Lower(dr);
    // felugrik, hátralendíti, és teljes erővel lecsap
    const foes=al.filter(t=>t.alive),mx=foes.reduce((s,t)=>s+cx(t),0)/Math.max(1,foes.length),x0=orc.x,dx=Math.max(0,mx-cx(orc)-220);
    sfx('whoosh');await tween(520,k=>{const e=r21ease.out(k);orc.x=x0+dx*r21ease.io(k);orc.jump=200*Math.sin(k*Math.PI*.6);X.rot=-.2-1.2*e;});
    sfx('whoosh');await tween(200,k=>{const e=r21ease.in(k);X.rot=-1.4+3.5*e;orc.jump=200*Math.sin(Math.PI*.6)*(1-e);});
    shake(34);sfx('boom');sfx('quake');flash('210,250,160',.3,.15);rumble&&rumble(1.3,12);
    // gyökerek és föld törnek fel minden ellenség alatt (repedés, kő, levél)
    for(const t of foes){const gx=cx(t),g2=t.y+t.oy+4;t.hurt=.7;toss(t,160,720);hit(orc,t,sk);kaeLeaves(gx,g2-30,26,380,120);
      for(let n=0;n<24;n++)part({x:gx+rnd(-50,50),y:g2,vx:rnd(-260,260),vy:-rnd(220,520),g:900,life:.8,size:rnd(6,13),rgb:pick(['110,85,55','90,70,45']),add:false,shape:'rock'});await wait(90);}
    await wait(700);await tween(400,k=>{X.a=1-k;});X.on=false;
    await tween(420,k=>{orc.x=x0+dx*(1-r21ease.io(k));});orc.x=x0;orc.jump=0;await dimTo(0,null,300);}finally{orc.jump=0;ENEMY_SPR['orc-cast']=SW0.a;ENEMY_SPR['orcG-cast']=SW0.b;rel();}};

// ---- Kaelen LIMIT – Bambusz-gólem (ca15 + a felhasználó: „a gólem megjelenik, egyszerre belecsap a földbe, és bambusztüskék
// álljanak ki a földből, rengeteg, mint egy mező”): festett gólem (fx7-golemstand / fx7-golemup) kinő a földből, rögtön
// a magasba emeli két karját (átúszik a két festett póz), és teljes testtel a földbe csap; a becsapódástól hullámban
// hegyes bambusztüskék mezeje szúr ki a földből egészen a képernyő széléig; minden ellenség megsebződik és felrepül;
// a funkció változatlan (sebzés + bambuszfal: a csapat védelme 2 körig nő)
{const bg0=A.bambooGolem;A.bambooGolem=async(u,ts,sk)=>{const s0=R17I.golemstand,s1=R17I.golemup;if(!s0||!s1)return bg0(u,ts,sk);const rel=keepPose(u);try{
  u.pose='cast';await bodyWind(u,240,.14);sfx('quake');await dimTo(.45,'10,30,5',300);const al=ts.filter(e=>e.alive);
  const GH=320,G={x:Math.max(cx(u)+150,330),y:Math.max(...S.heroes.filter(h=>h.alive).map(h=>h.y+h.oy))+6,k:0,a:1,up:0,rot:0,sq:1,sink:0};
  const F=[],E={a:1};
  R18E({update(){return G.a>0||E.a>0;},draw(){
    // tüskemező (a hátsó sorok előbb, hogy a közelebbiek takarják őket)
    for(const q of F)if(q.k>0)r21Stake(q.x,q.gy,q.H,q.k,q.l,E.a);
    if(G.k<=0||G.a<=0)return;const dr=(im,al2)=>{if(al2<=0)return;const h=GH*im.height/s0.height,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=G.a*al2;ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();};
    ctx.save();ctx.beginPath();ctx.rect(0,0,960,G.y+4);ctx.clip();ctx.translate(G.x,G.y+GH*(1-Math.min(1,G.k))+G.sink);ctx.rotate(G.rot);ctx.scale(1/G.sq,G.sq);
    if(G.up<1)dr(s0,1);dr(s1,G.up);ctx.restore();}});
  // kinő a földből
  rumble&&rumble(1,10);shake(14);
  for(let i=0;i<46;i++)part({x:G.x+rnd(-140,140),y:G.y,vx:rnd(-220,220),vy:rnd(-460,-160),life:rnd(.7,1.1),size:rnd(7,13),rgb:pick(['120,90,60','90,70,40']),g:800,add:false,shape:'rock'});
  await tween(650,k=>G.k=r21ease.out(k));sfx('growl');u.pose='idle';kaeLeaves(G.x,G.y-GH*.8,40,360);
  // azonnal felemeli a karját (a festett pózok átúsznak), hátradől
  sfx('roar');await tween(380,k=>{const e=r21ease.io(k);G.up=e;G.rot=-.07*e;G.sq=1+.05*e;});
  // teljes testtel a földbe csap
  sfx('whoosh');await tween(170,k=>{const e=r21ease.in(k);G.rot=-.07+.2*e;G.sq=1.05-.13*e;});
  shake(36);sfx('boom');sfx('quake');flash('210,250,160',.35,.15);rumble&&rumble(1.4,14);
  for(let i=0;i<30;i++)part({x:G.x+rnd(40,200),y:G.y,vx:rnd(-300,300),vy:rnd(-520,-180),life:rnd(.6,1),size:rnd(8,15),rgb:pick(['120,90,60','90,70,40']),g:900,add:false,shape:'rock'});
  // bambusztüske-mező: a becsapódástól hullámban terjed jobbra, több sorban (mélység szerint)
  const x0=G.x+90,rows=[-40,-24,-8,8,22],hitT=new Set();
  for(const dy of rows)for(let x=x0+rnd(0,30);x<990;x+=rnd(15,24)){const d=x-x0;F.push({x,gy:G.y+dy-30+(dy+34)*.4,H:rnd(120,240)*(1+dy/150),k:0,l:rnd(-.18,.18),d});}
  for(const t of al){const gy=t.y+t.oy+6;for(let j=0;j<5;j++){const x=cx(t)+(j-2)*22;F.push({x,gy,H:Math.max(240,t.h*t.scale*1.5)*rnd(.85,1.1),k:0,l:(j-2)*.09,d:x-x0});}}
  F.sort((a,b)=>a.gy-b.gy);const v=1200;// px/s
  const T0=performance.now();await new Promise(res=>{const tick=()=>{const tm=(performance.now()-T0)/1000;let left=0;
    for(const q of F){const st=q.d/v;if(tm>=st){const k=Math.min(1,(tm-st)/.22);q.k=k<1?r21ease.back(k):1;}else left++;}
    for(const t of al)if(!hitT.has(t)&&tm>=(cx(t)-x0)/v){hitT.add(t);sfx('rock');shake(12);t.hurt=.7;tween(380,k=>t.jump=Math.max(t.jump||0,170*Math.sin(k*Math.PI*.5)));
      for(let n=0;n<16;n++)part({x:cx(t),y:t.y+t.oy,vx:rnd(-240,240),vy:-rnd(160,420),g:900,life:.7,size:rnd(5,10),rgb:pick(['120,95,60','150,220,90']),add:false,shape:n%2?'rock':'leaf'});}
    if(left>0||tm<(990-x0)/v+.3)requestAnimationFrame(tick);else res();};tick();});
  sfx('quake');tween(380,k=>{G.rot=.13*(1-r21ease.io(k));G.sq=.92+.08*k;});await wait(450);
  await tween(320,k=>{for(const t of al)t.jump=170*(1-k*k);});for(const t of al){t.jump=0;toss(t,60,420);hit(u,t,sk);}shake(20);
  const hs=S.heroes.filter(h=>h.alive);hs.forEach(h=>addStatus(h,'defUp',2));popLabel(u,'BAMBUSZFAL!','#b8e07a');await wait(650);
  await tween(700,k=>{const e=r21ease.in(k);for(const q of F)q.k=Math.min(q.k,1-e);G.sink=GH*e;});G.a=0;E.a=0;F.length=0;await dimTo(0,null,300);await bodySettle(u);}finally{for(const t of ts)t.jump=0;rel();}};}
