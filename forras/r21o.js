// ===== 26. kör: a tesztlap x-pontjainak javításai (gagyi → nagyobb, élethűbb, festett; darabos → sima, átúsztatott mozgás) =====
const r21ease={io:k=>k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,out:k=>1-Math.pow(1-k,3),in:k=>k*k*k,back:k=>{const c=1.7;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);}};

// ---- Bambusz-békakirály – Nyelvcsapás: a kép saját, felcsavart nyelve eltűnik (frogking-cast: nyelv nélküli kép),
// és az igazi, vastag, nedves nyelv a SZÁJ sarkából (rácson mérve .315,.27) lő ki, rácsapódik a hősre, aztán visszaránt
function r21Tongue(P,w0,w1){if(P.length<2)return;const n=P.length;
  for(const [col,add] of [['#5e1129',6],['#d4446d',0]]){for(let i=1;i<n;i++){const k=i/(n-1);ctx.strokeStyle=col;ctx.lineCap='round';ctx.lineWidth=w0+(w1-w0)*k+add;ctx.beginPath();ctx.moveTo(P[i-1].x,P[i-1].y);ctx.lineTo(P[i].x,P[i].y);ctx.stroke();}}
  // középső barázda és fényes, nedves csík
  ctx.strokeStyle='rgba(140,30,60,.55)';ctx.lineWidth=2.2;ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p.x,p.y+1):ctx.moveTo(p.x,p.y+1));ctx.stroke();
  ctx.strokeStyle='rgba(255,205,220,.85)';ctx.lineWidth=3.2;ctx.beginPath();P.forEach((p,i)=>{const k=i/(n-1),o=-(w0+(w1-w0)*k)*.28;i?ctx.lineTo(p.x,p.y+o):ctx.moveTo(p.x,p.y+o);});ctx.stroke();
  const T=P[n-1];ctx.fillStyle='#5e1129';ctx.beginPath();ctx.ellipse(T.x,T.y,w1*.95+3,w1*.8+3,0,0,7);ctx.fill();ctx.fillStyle='#e05a80';ctx.beginPath();ctx.ellipse(T.x,T.y,w1*.95,w1*.8,0,0,7);ctx.fill();
  ctx.fillStyle='rgba(255,225,235,.9)';ctx.beginPath();ctx.ellipse(T.x-w1*.25,T.y-w1*.3,w1*.3,w1*.18,-.4,0,7);ctx.fill();}
// (a Lekvárdzsinn karjának mintájára) a Békakirály SAJÁT képéről kivágott nyelv nyúlik meg: a nyelv egyenes töve („arm”) a száj
// sarkától megnyúlik a hősig, a felcsavart vége („hand”) a végén utazik és rácsap; aztán visszaugrik a helyére
LIMBS.frogking={order:['arm','hand'],parts:{arm:{poly:[[.215,.245],[.33,.255],[.345,.285],[.335,.31],[.215,.305]],pivot:[.335,.28]},
  hand:{poly:[[.09,.07],[.285,.07],[.285,.20],[.255,.245],[.24,.30],[.205,.31],[.17,.24],[.165,.20],[.09,.20]],pivot:[.215,.275]}}};
{const t0=A.tongue;A.tongue=async(u,ts,sk)=>{if(u.type!=='frogking')return t0(u,ts,sk);const t=ts[0];if(!t)return;const K='frogking',T=limbOn(u,K);if(!T)return t0(u,ts,sk);
  try{const im=ENEMY_SPR[K],W=im.width,H=im.height,sh=LIMBS[K].parts.arm.pivot,wr=LIMBS[K].parts.hand.pivot;
  const aim=limbAim(u,K,'arm',wr[0],wr[1],cx(t)+14,midY(t)-6);const arm=T.arm,hand=T.hand;arm.ax=aim.ax;
  const setK=(k,g)=>{arm.rot=aim.rot*k;arm.sx=1+(aim.sx-1)*k;const L0=Math.hypot((wr[0]-sh[0])*W,(wr[1]-sh[1])*H),a=aim.ax+arm.rot,nx=sh[0]*W+Math.cos(a)*L0*arm.sx,ny=sh[1]*H+Math.sin(a)*L0*arm.sx;hand.dx=(nx-wr[0]*W)/W;hand.dy=(ny-wr[1]*H)/H;hand.rot=arm.rot*.6;hand.s=1+.2*k-.12*(g||0);};
  const drip={on:true};effects.push({update(){if(drip.on&&Math.random()<.45){const p=limbPt(u,'arm',.3+rnd(-.15,.3),.5);part({x:p.x,y:p.y,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,5),rgb:'255,190,210',add:false,shape:'drop'});}return drip.on;},draw(){}});
  sfx('gulp');await wait(250);sfx('whoosh');arm.blur=hand.blur=true;
  await tween(260,k=>setK(r21ease.out(k),0));arm.blur=hand.blur=false;sfx('squish');shake(12);t.hurt=.6;toss(t,46,300);hit(u,t,sk);
  for(let i=0;i<14;i++)part({x:cx(t)+rnd(-14,14),y:midY(t)+rnd(-10,10),vx:rnd(-220,220),vy:rnd(-360,-60),g:900,life:rnd(.4,.8),size:rnd(3,6),rgb:'255,200,220',add:false,shape:'drop'});
  await tween(180,k=>setK(1,k));await wait(150);
  arm.blur=hand.blur=true;await tween(300,k=>setK(1-r21ease.in(k),1-k));drip.on=false;}finally{limbOff(u);}};}

// ---- közös: villám – a cikcakk pálya csak ~80 ms-onként változik (nem remeg minden képkockán), fehér mag, kék-sárga izzás
function r21BoltPts(x0,y0,x1,y1,jag=24,n=14){const P=[[x0,y0]],dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;for(let i=1;i<n;i++){const q=i/n,o=rnd(-jag,jag)*Math.sin(q*Math.PI);P.push([x0+dx*q+nx*o,y0+dy*q+ny*o]);}P.push([x1,y1]);return P;}
function r21Zap(P,w=6,rgb='170,200,255',a=1){if(!P||P.length<2)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';ctx.lineCap='round';
  for(const [lw,col,al] of [[w*5,rgb,.12],[w*2.6,rgb,.35],[w*1.2,'235,245,255',.9],[w*.5,'255,255,255',1]]){ctx.strokeStyle=`rgba(${col},${al*a})`;ctx.lineWidth=lw;ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();}
  ctx.restore();}
// elágazó villám: fő ág + 2-3 mellékág
function r21ZapTree(x0,y0,x1,y1,jag=26){const M=r21BoltPts(x0,y0,x1,y1,jag),B=[M];for(let i=0;i<3;i++){const p=M[2+Math.floor(Math.random()*(M.length-5))];const a=Math.atan2(y1-y0,x1-x0)+rnd(-1,1),l=rnd(40,110);B.push(r21BoltPts(p[0],p[1],p[0]+Math.cos(a)*l,p[1]+Math.sin(a)*l,12,6));}return B;}

// ---- Villámdenevér (idézés) – a felhasználó kérésére a régi (nagy, csapkodó) villámdenevér: megjelenik, és villám csap le
// minden ellenségre; ennyi (nincs repkedés, harapás, festett óriásdenevér)
{const tb=SUMMONS.find(x=>x.id==='tbat');if(tb){tb.img=()=>null;tb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const sp=ENEMY_SPR['tbat-attack']||ENEMY_SPR.tbat;await dimTo(.7,'8,8,30',300);
  const B={x:S0.x+60,y:S0.y-190,s:.3,a:0,flap:0,on:true};
  R18E({update(dt){B.flap+=dt*12;return B.on;},draw(){if(!sp||B.a<=0)return;const hh=260*B.s,ww=hh*sp.width/sp.height;ctx.save();ctx.globalAlpha=B.a;ctx.globalCompositeOperation='lighter';glow(B.x,B.y,hh*.8,'190,215,255',.4);ctx.restore();
    ctx.save();ctx.globalAlpha=B.a;ctx.translate(B.x,B.y+Math.sin(B.flap*.5)*6);ctx.scale(-1,1+.16*Math.sin(B.flap));ctx.drawImage(sp,-ww/2,-hh/2,ww,hh);ctx.restore();}});
  // megjelenik: villanás, felnagyobbodik, csapkod
  sfx('sonic');flash('230,240,255',.3,.12);await tween(500,k=>{B.a=Math.min(1,k*2);B.s=.3+1.1*r21ease.back(k);});sfx('screech');await wait(250);
  // Zordon Villámcsapása (viharfelhő, háromszoros óriási villám) – minden ellenségre egyszerre; a varázslói póz nélkül
  {const cp=castPose,sk0=Object.assign({},SK.thunderbolt,{name:'Villámcsapás',tgt:'enemy'});castPose=async()=>{};
   try{await Promise.all(fs.map((t,i)=>wait(i*120).then(()=>A.thunder(P,[t],sk0))));}finally{castPose=cp;}}
  await tween(400,k=>{B.a=1-k;B.y-=2;});B.on=false;await dimTo(0,null,300);};}}

// ---- Habverő-manó – Habzápor: a kifújt habsugár marad (jó volt), de becsapódás után nem marad rajta semmi kör/buborék:
// nincs ráhulló habcsomó és nincs pöttyös habpermet – a sugár habja a hősön gyorsan szétoszlik
A.whiskSpray=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';const sc=()=>KP(u,.12,.62);
  sfx('whoosh');await tween(520,k=>{u.lean=.08*Math.sin(k*40);});u.lean=0;
  await bodyWind(u,160,-.12);bodyStrike(u,160,.2);sfx('splash');
  const F=[],S0={on:true};
  effects.push({update(dt){if(S0.on)for(let i=0;i<7;i++){const p=sc();F.push({x:p.x,y:p.y,vx:(cx(t)-p.x)*rnd(1.6,2.1)+rnd(-50,50),vy:(midY(t)-p.y)*rnd(1.6,2.1)+rnd(-110,40),r:rnd(18,36),life:0,rot:rnd(0,6)});}
      for(const f of F){f.life+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=260*dt;}for(let i=F.length-1;i>=0;i--)if(F[i].life>.75)F.splice(i,1);return S0.on||F.length;},
    draw(){for(const f of F)r21Froth(f.x,f.y,f.r*(.6+f.life),Math.min(1,(.75-f.life)*4),f.rot);}});
  await wait(900);S0.on=false;t.hurt=.5;toss(t,40,320);shake(10);sfx('splash');hit(u,t,sk);await wait(450);await bodySettle(u);}finally{rel();u.lean=0;}};

// ---- Bambuszkígyó – Tekeredés: odakúszik (hullámzó, sima csúszás, nincs ugrás/árnykép), a teste eltűnik és a festett tekercs
// alulról felfelé tekeredik a hős köré (nem látszik két kígyó); fölötte a SAJÁT feje (a képéből kivágva) háromszor rámar,
// a tekercs minden harapásnál összeszorul; végül letekeredik, a kígyó visszakúszik
A.snakeCoil=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);const sp=ENEMY_SPR.bambsnake,cim=R17I.coils;try{u.pose='idle';
  const tx=t.x+(t.w*t.scale)/2+(u.w*u.scale)/2-20,dx=tx-u.x,dy=(t.y+2)-u.y;sfx('whoosh');
  // kúszás: hullámzó dőlés, enyhe fel-le, gyorsul-lassul
  await tween(760,k=>{const e=r21ease.io(k);u.ox=dx*e;u.oy=dy*e;u.lean=.1*Math.sin(k*Math.PI*5);});u.lean=0;
  const gx=cx(t),bot=t.y+t.oy+6,Hh=t.h*t.scale*.7,C={k:0,sq:0,head:0,bite:0,a:1};
  await tween(180,k=>u.alpha=1-k);
  effects.push({update(){return C.a>0;},draw(){if(C.a<=0)return;ctx.save();ctx.globalAlpha*=C.a;
    if(cim){const w=Math.min(t.w*t.scale*1.5+40,Hh*cim.width/cim.height*1.2)*(1-C.sq*.13),h=Hh*(1+C.sq*.05);ctx.save();ctx.beginPath();ctx.rect(gx-w,bot+4-h*C.k,w*2,h*C.k+8);ctx.clip();const N=14,sh=cim.height/N;for(let i=0;i<N;i++){const dx=Math.sin(T*7+i*.9)*5*(1-C.sq)+(i%2?1:-1)*C.sq*4;ctx.drawImage(cim,0,i*sh,cim.width,sh+1,gx-w/2+dx,bot+4-h+i*h/N,w,h/N+1);}ctx.restore();}
    if(sp&&C.head>0){// a kígyó saját feje a tekercs tetején, a hős arca felé mar
      const sx=sp.width*.03,sy=sp.height*.16,sw=sp.width*.38,sh=sp.height*.38,hw=t.w*t.scale*.95,hh=hw*sh/sw,hx=gx+hw*.18-C.bite*hw*.22,hy=bot-Hh*C.k-hh*.15-C.bite*8;
      ctx.globalAlpha*=C.head;ctx.translate(hx,hy);ctx.rotate(-.15*C.bite);ctx.scale(1+C.bite*.12,1+C.bite*.12);ctx.drawImage(sp,sx,sy,sw,sh,-hw/2,-hh/2,hw,hh);}
    ctx.restore();}});
  sfx('whoosh');await tween(650,k=>{C.k=r21ease.out(k);t.spin=.12*Math.sin(k*Math.PI*3);});t.spin=0;
  await tween(220,k=>C.head=k);
  for(let i=0;i<3;i++){sfx('bite');await tween(150,k=>{C.bite=r21ease.out(k);});sfx('crunch');shake(10);t.hurt=.5;for(let j=0;j<8;j++)part({x:gx+rnd(-30,30),y:bot-rnd(20,Hh),vx:rnd(-140,140),vy:-rnd(40,160),g:500,life:.5,size:rnd(4,7),rgb:pick(['120,170,60','90,130,40']),add:false,shape:'leaf'});
    await tween(260,k=>{C.sq=Math.sin(k*Math.PI);C.bite=1-r21ease.io(k);});}
  hit(u,t,sk);await wait(200);
  await tween(200,k=>C.head=1-k);await tween(420,k=>{C.k=1-r21ease.in(k);});C.a=0;
  await tween(200,k=>u.alpha=k);u.alpha=1;sfx('whoosh');await tween(600,k=>{const e=r21ease.io(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.lean=-.1*Math.sin(k*Math.PI*4);});u.ox=u.oy=0;u.lean=0;}
  finally{u.alpha=1;u.lean=0;rel();}};

// (Tusfolt-felülírás visszavonva a felhasználó kérésére: a Tusátok az eredeti maradt.)

// ---- Csészeharcos – Teafröccs: vékony csík helyett vastag, áttetsző borostyán teatömeg repül ívben a merőkanálból (gömbölyödő
// fej, vékonyodó farok, fénycsillanás, cseppek), a hősön festett teafröccs-korona (fx7-teasplash) csap fel, gőz száll
function r21TeaBlob(x,y,r,a=1){ctx.save();ctx.globalAlpha*=a;const g=ctx.createRadialGradient(x-r*.3,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'rgba(255,215,140,.95)');g.addColorStop(.45,'rgba(214,128,34,.9)');g.addColorStop(1,'rgba(130,62,10,.85)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.fillStyle='rgba(255,245,220,.8)';ctx.beginPath();ctx.ellipse(x-r*.35,y-r*.4,r*.28,r*.14,-.5,0,7);ctx.fill();ctx.restore();}
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='attack';const l=()=>KP(u,.08,.17);
  // felhúzás: a merőkanál hátralendül, a tea gőzölög benne
  sfx('splash');await bodyWind(u,380,-.22);
  const S1={on:true,t:0,head:0,tail:0};const a0=l(),b0={x:cx(t),y:midY(t)-6},H=150;
  const at=q=>({x:a0.x+(b0.x-a0.x)*q,y:a0.y+(b0.y-a0.y)*q-Math.sin(q*Math.PI)*H});
  R18E({update(dt){S1.t+=dt;return S1.on;},
    draw(){// folytonos teasugár: a farok (tail) és a fej (head) között sűrűn egymásra fedő, áttetsző teagömbök – elöl vastag, hátul vékony
      if(S1.head<=S1.tail)return;const P=[];for(let q=S1.tail;q<=S1.head+1e-6;q+=.015)P.push(at(q));if(P.length<2)return;const n=P.length;
      // sima, elvékonyodó teasugár: sötét szél, borostyán test, világos fénycsík – nincs remegés
      ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
      for(const [add,col] of [[8,'rgba(110,52,8,.6)'],[0,'rgba(212,128,36,.92)'],[-14,'rgba(246,186,96,.85)']]){for(let i=1;i<n;i++){const f=i/(n-1),w=Math.max(2,6+30*Math.pow(f,1.3)+add);ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(P[i-1].x,P[i-1].y);ctx.lineTo(P[i].x,P[i].y);ctx.stroke();}}
      ctx.strokeStyle='rgba(255,245,220,.8)';ctx.lineWidth=3;ctx.beginPath();P.forEach((p,i)=>{const f=i/(n-1),o=-(6+30*Math.pow(f,1.3))*.28;i?ctx.lineTo(p.x,p.y+o):ctx.moveTo(p.x,p.y+o);});ctx.stroke();ctx.restore();
      const hp=P[n-1];r21TeaBlob(hp.x,hp.y,24,.95);if(Math.random()<.6)part({x:hp.x,y:hp.y,vx:rnd(-80,80),vy:rnd(-160,20),g:900,life:.5,size:rnd(4,8),rgb:pick(['205,125,30','230,155,50']),add:false,shape:'drop'});}});
  bodyStrike(u,240,.26);sfx('whoosh');
  await tween(380,k=>{S1.head=r21ease.out(k);S1.tail=Math.max(0,S1.head-.6);});
  await tween(160,k=>{S1.tail=.4+.6*k;});
  await wait(180);S1.on=false;shake(16);sfx('splash');sfx('steam');t.hurt=.6;toss(t,50,360);
  const im=R17I.teasplash;if(im){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<1.1;},draw(){const k=Math.min(1,st.t/.22),a=st.t<.6?1:1-(st.t-.6)/.5;r17Draw(im,cx(t),t.y+t.oy+6,(t.w*t.scale*2.6+120)*(.4+.6*r21ease.back(k)),{anchor:'bottom',a,sy:.8+.35*k});}});}
  for(let i=0;i<60;i++)part({x:cx(t)+rnd(-24,24),y:midY(t)+rnd(-30,20),vx:rnd(-380,380),vy:rnd(-480,-80),g:1000,life:rnd(.6,1.1),size:rnd(6,14),rgb:pick(['205,125,30','230,155,50','170,95,20','245,190,110']),add:false,shape:'drop'});
  for(let i=0;i<6;i++)r21Steam(cx(t)+rnd(-40,40),midY(t)-20,rnd(-30,30),-rnd(70,140),false);
  hit(u,t,sk);await wait(500);await bodySettle(u);}finally{rel();}};

// ---- PÁROS: Villámbambusz (a felhasználó leírása szerint): a földből EGYESÉVEL élethű bambuszrudak törnek fel (fx7-bamboopole),
// Zordon fehér villámot üt az elsőbe, a villám rúdról rúdra átugrik és összeköti őket, végül a rudakból az ellenségekbe csap és sokkolja őket
R16P['Villámbambusz']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wiz=dr===A1?B1:A1,im=R17I.bamboopole;await dimTo(.7,'6,8,22',350);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=Math.max(...xs.map(t=>t.y+t.oy))+8;
  // rudak: minden ellenség két oldalán (közös rúd a szomszédok között)
  const px=[];xs.forEach((t,i)=>{const hw=t.w*t.scale*.5+26;if(i===0)px.push(cx(t)-hw-80,cx(t)-hw);px.push(i<xs.length-1?(cx(t)+cx(xs[i+1]))/2:cx(t)+hw);if(i===xs.length-1)px.push(cx(t)+hw+80);});
  const PH=Math.min(420,Math.max(330,Math.max(...xs.map(t=>t.h*t.scale))*1.6)),R=px.map((x,i)=>({x:x+rnd(-6,6),k:0,glow:0,lean:rnd(-.05,.05)}));const E={on:true},links=[],shocks=[];let tick=0;
  const top=r=>({x:r.x+Math.sin(r.lean)*PH*r.k*.92,y:gy-PH*r.k*.92});
  R18E({update(dt){tick-=dt;if(tick<=0){tick=.07;for(const L of links){const a=top(R[L.i]),b=top(R[L.i+1]);L.p=r21BoltPts(a.x,a.y,b.x,b.y,22,14);}for(const S of shocks){const a=top(R[S.r]);S.p=r21ZapTree(a.x,a.y+30,cx(S.t)+rnd(-15,15),midY(S.t)+rnd(-25,25),18);}}
      for(const r of R)r.glow=Math.max(0,r.glow-dt*1.5);return E.on;},
    draw(){for(const r of R){if(r.k<=0)continue;if(im){ctx.save();ctx.translate(r.x,gy);ctx.rotate(r.lean);const h=PH,w=h*im.width/im.height;ctx.beginPath();ctx.rect(-w,-h*r.k-4,w*2,h*r.k+4);ctx.clip();ctx.drawImage(im,-w/2,-h*r.k,w,h);ctx.restore();}
        if(r.glow>0){const q=top(r);ctx.save();ctx.globalCompositeOperation='lighter';glow(q.x,q.y,80*r.glow+20,'210,225,255',.9*r.glow);ctx.restore();}}
      for(const L of links)r21Zap(L.p,4.2,'190,210,255',L.a);for(const S of shocks)for(const q of S.p||[])r21Zap(q,3.4,'190,210,255',S.a);}});
  // 1) Kaelen botot emel, a rudak egyesével feltörnek (földrögök, kis rázkódás, túllendül és visszaáll)
  await r16Raise(dr,'150,230,90');
  for(const r of R){sfx('rock');shake(7);for(let i=0;i<16;i++)part({x:r.x+rnd(-12,12),y:gy,vx:rnd(-170,170),vy:rnd(-340,-90),g:800,life:.8,size:rnd(5,10),rgb:pick(['120,95,60','95,75,45']),add:false,shape:'rock'});
    await tween(300,k=>r.k=r21ease.back(k));await wait(90);}
  r16Lower(dr);await r16Raise(wiz,'210,225,255');
  // 2) fehér villám az égből az első rúdba
  {const a=top(R[0]),Z={t:0,tr:r21ZapTree(a.x+rnd(-30,30),0,a.x,a.y,34)};sfx('thunder');flash('235,240,255',.45,.1);shake(14);R[0].glow=1;
   R18E({update(dt){Z.t+=dt;return Z.t<.35;},draw(){for(const q of Z.tr)r21Zap(q,6,'200,220,255',1-Z.t/.35);}});}
  await wait(160);
  // 3) a villám rúdról rúdra átugrik és összeköti őket
  for(let i=0;i<R.length-1;i++){links.push({i,a:1,p:null},{i,a:.8,p:null});tick=0;sfx('zap');R[i+1].glow=1;shake(6);const q=top(R[i+1]),Z={t:0,tr:r21ZapTree(q.x+rnd(-40,40),0,q.x,q.y,34)};sfx('thunder');R18E({update(dt){Z.t+=dt;return Z.t<.3;},draw(){for(const b of Z.tr)r21Zap(b,5,'200,220,255',1-Z.t/.3);}});await wait(200);}
  // égi villámok zuhognak a rudakba, amíg a sokk tart
  const skyIv=setInterval(()=>{const r=pick(R),q=top(r),Z={t:0,tr:r21ZapTree(q.x+rnd(-50,50),0,q.x,q.y,36)};r.glow=1;sfx('thunder');flash('235,240,255',.2,.06);R18E({update(dt){Z.t+=dt;return Z.t<.28;},draw(){for(const b of Z.tr)r21Zap(b,5.5,'200,220,255',1-Z.t/.28);}});},170);
  // 4) a rudakból az ellenségekbe csap – sokkolja őket (rángatóznak), szikrák
  sfx('thunder');flash('235,240,255',.35,.08);
  xs.forEach((t,i)=>{shocks.push({r:i,t,a:1},{r:i+1,t,a:1},{r:i,t,a:.7},{r:i+1,t,a:.7});});tick=0;
  await tween(1300,k=>{for(const t of xs){t.hurt=.4;t.spin=.06*Math.sin(k*60);}for(const r of R)r.glow=Math.max(r.glow,.6+.4*Math.sin(k*40));if(Math.random()<.25)sfx('zap');if(Math.random()<.3){const t=pick(xs);sparks(cx(t)+rnd(-20,20),midY(t)+rnd(-30,30),['220,230,255','255,255,255'],8,380);}});
  clearInterval(skyIv);for(const t of xs){t.spin=0;sparks(cx(t),midY(t),['220,230,255','255,255,255','170,200,255'],30,520);toss(t,50,380);hit(dr,t,sk);}shake(18);
  r16Lower(wiz);
  // 5) a villámok elhalnak, a rudak visszasüllyednek
  await tween(380,k=>{for(const L of links)L.a=1-k;for(const S of shocks)S.a=1-k;});links.length=0;shocks.length=0;
  await tween(420,k=>{for(const r of R)r.k=1-r21ease.in(k);});E.on=false;await dimTo(0,null,300);};

// ---- festett fekete-lila láng (fx7-darkflame): valódi lángnyelv, lobog (nyúlik-zsugorodik, hajlik), additív izzással
function r21Flame(x,y,h,a=1,ph=0){const im=R17I.darkflame;if(!im)return false;const f=T*7+ph,sy=1+.18*Math.sin(f)+.08*Math.sin(f*2.3),sx=1-.08*Math.sin(f*1.7),w=h*im.width/im.height;
  ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.transform(1,0,Math.sin(f*.9)*.18,1,0,0);ctx.scale(sx,sy);ctx.drawImage(im,-w/2,-h,w,h);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.35;ctx.drawImage(im,-w*.4,-h*.85,w*.8,h*.85);ctx.restore();return true;}
// ---- PÁROS: Átokindák – az elképzelés marad (gyökérketrec, Morgána átoklángja végigfut rajta, összeszorul), csak a láng lett festett, élethű lángnyelv
R16P['Átokindák']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wi=dr===A1?B1:A1;await dimTo(.72,'15,5,30',300);await r16Raise(dr,'150,230,90');sfx('rock');rumble&&rumble(1,8);
  const im=R17I.rootcage,V=al.map(t=>({t,k:0,burn:0,sq:0,F:[...Array(16)].map((_,i)=>({u:rnd(-.45,.45),v:rnd(0,.8),h:rnd(.7,1.2),ph:rnd(0,6)}))}));const E={on:true};
  effects.push({update(){return E.on;},
    draw(){for(const v of V){if(v.k<=0)continue;const w=Math.max(240,v.t.w*v.t.scale*2.3)*(1-v.sq*.12),gy=v.t.y+v.t.oy+20,H=w*(im?im.height/im.width:1)*v.k;ctx.save();if(im){r17Draw(im,cx(v.t),gy,w,{anchor:'bottom',sy:v.k});if(v.burn>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.16*v.burn;r17Draw(tintSpr(im,'rgb(170,70,255)',1),cx(v.t),gy,w,{anchor:'bottom',sy:v.k});}}ctx.restore();
        // festett lila lángfal öleli körbe a ketrecet (két réteg, egymással ellentétesen lobog), és a lángnyelvek felfutnak az indákon
        {const fw=R17I.firewall;if(fw&&v.burn>0){const W2=w*1.15,f=T*6;for(const [ph,al,fl] of [[0,1,1],[2.1,.7,-1]]){const sy=(1+.12*Math.sin(f+ph)+.06*Math.sin(f*2.7+ph))*Math.min(1,v.run/.6+.05),h=W2*fw.height/fw.width*1.25*sy;ctx.save();ctx.globalAlpha=al*Math.min(1,v.burn*1.2);ctx.translate(cx(v.t),gy+6);ctx.scale(fl,1);ctx.transform(1,0,Math.sin(f*.8+ph)*.08,1,0,0);ctx.drawImage(fw,-W2/2,-h,W2,h);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.3;ctx.drawImage(fw,-W2*.4,-h*.8,W2*.8,h*.8);ctx.restore();}}}
        // a lángnyelvek alulról felfelé szaladnak végig az indákon
        if(v.burn>0)for(const f of v.F){if(f.v>v.run)continue;const fx=cx(v.t)+f.u*w,fy=gy-10-f.v*H;if(!r21Flame(fx,fy,(120+110*f.h)*Math.min(1,v.burn*1.4),Math.min(1,v.burn*1.2),f.ph)&&Math.random()<.2)darkFlame({x:fx,y:fy,vx:0,vy:-80,life:.5,size:24});}}}});
  for(const v of V){v.run=0;for(let i=0;i<20;i++)part({x:cx(v.t)+rnd(-90,90),y:v.t.y+v.t.oy,vx:rnd(-220,220),vy:rnd(-400,-120),g:800,life:.8,size:rnd(6,11),rgb:'100,75,50',add:false,shape:'rock'});tween(420,k=>v.k=eOutBack(k));await wait(90);}
  await wait(380);for(const v of V){v.t.hurt=.4;}shake(12);r16Lower(dr);await r16Raise(wi,'160,80,230');sfx('dark');const h=handPos(wi);
  // Morgána kezéből lángcsóva repül minden ketrecbe
  for(const v of V)flyObj(h,{x:cx(v.t),y:midY(v.t)},360,(x,y,r,k)=>{if(!r21Flame(x,y+30,90,1,k*20))darkFlame({x,y,vx:0,vy:-40,life:.3,size:20});},{arc:90});
  await wait(400);sfx('fire');sfx('wail');flash('120,40,200',.4,.18);shake(18);for(const v of V)v.burn=1;
  await tween(420,k=>{for(const v of V)v.run=r21ease.out(k)*.9;});
  for(let i=0;i<3;i++){for(const v of V){tween(160,k=>v.sq=Math.sin(k*Math.PI));v.t.hurt=.4;sparks(cx(v.t),midY(v.t),['190,110,255','40,10,60'],14,360);}sfx('crunch');await wait(240);}
  for(const v of V){toss(v.t,40,320);hit(dr,v.t,sk);}r16Lower(wi);await wait(300);await tween(400,k=>{for(const v of V){v.k=1-k;v.burn=1-k;}});E.on=false;await dimTo(0,null,300);};

// ---- Levéltánc (a felhasználó kérésére TÁMADÁS lett, mert Kaelennek már van gyógyítása): festett, borotvaéles levelek
// keringenek Kaelen körül, aztán öt hullámban, ívelt pályán átsuhannak egy ellenségen (5 találat), levéltörmelék szóródik
if(SK.mosspillow){Object.assign(SK.mosspillow,{name:'Levéltánc',tgt:'enemy',kind:'mag',pow:1.7,elem:'nature',anim:'leafDance',buff:null,cleanseFoam:false,
  desc:'Borotvaéles levelek keringenek Kaelen körül, aztán öt hullámban átsuhannak egy ellenségen (5 találat).'});delete SK.mosspillow.buff;delete SK.mosspillow.cleanseFoam;}
A.leafDance=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const im=R17I.leaf;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,220,.1);sfx('wind');
  const ox=cx(u),oy=midY(u),RX=u.w*u.scale*.75+40,RY=34,N=30,L=[...Array(N)].map((_,i)=>({a:i/N*6.283,y:rnd(-.5,.45),s:rnd(.75,1.1),sp:rnd(.9,1.2),st:'orb',x:0,yy:0,rot:0,tr:[],w:0}));const E={on:true,t:0,R:0};
  const orbPos=l=>{const a=l.a+E.t*3.2*l.sp;return {x:ox+Math.cos(a)*RX*E.R,y:oy+l.y*u.h*u.scale*.7+Math.sin(a)*RY*E.R,front:Math.sin(a)>0,rot:a+1.6};};
  const drawLeaf=(x,y,s,rot,a)=>{if(im)r17Draw(im,x,y,62*s,{rot,a});else{ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='#5fae3a';ctx.translate(x,y);ctx.rotate(rot);ctx.beginPath();ctx.ellipse(0,0,20*s,8*s,0,0,7);ctx.fill();ctx.restore();}};
  R18E({update(dt){E.t+=dt;for(const l of L){if(l.st==='orb'){const p=orbPos(l);l.x=p.x;l.yy=p.y;l.rot=p.rot;l.front=p.front;}l.tr.unshift({x:l.x,y:l.yy,r:l.rot});if(l.tr.length>4)l.tr.pop();}return E.on;},
    draw(){for(const pass of [0,1])for(const l of L){if(l.st==='gone')continue;if(l.st==='orb'&&(l.front?1:0)!==pass)continue;if(l.st!=='orb'&&pass===0)continue;
      const a=l.st==='orb'?(l.front?1:.55):1;if(l.st==='fly')for(let i=1;i<l.tr.length;i++){const q=l.tr[i];drawLeaf(q.x,q.y,l.s,q.r,.25*(1-i/4));}
      drawLeaf(l.x,l.yy,l.s,l.rot,a);if(l.st==='fly'){ctx.save();ctx.globalCompositeOperation='lighter';glow(l.x,l.yy,26,'150,240,110',.35);ctx.restore();}}}});
  // a levélörvény kibomlik és felgyorsul
  await tween(650,k=>{E.R=r21ease.out(k);});sfx('wind');await wait(250);
  const tx=cx(t),ty=midY(t);const sub=Object.assign({},sk,{pow:sk.pow/5});
  for(let w=0;w<5;w++){const grp=L.filter(l=>l.st==='orb').slice(0,6);sfx('whoosh');
    await Promise.all(grp.map((l,i)=>{l.st='fly';const x0=l.x,y0=l.yy,side=(w%2?1:-1)*rnd(60,140),x2=tx+(tx-x0)*.35,y2=ty+rnd(-40,40);
      return tween(420+i*25,k=>{const e=r21ease.io(k),m=1-e;// ívelt pálya: kezdés → oldalra kanyarodó kontrollpont → a célon túl
        const cxp=(x0+tx)/2,cyp=(y0+ty)/2+side;l.x=m*m*x0+2*m*e*cxp+e*e*x2;l.yy=m*m*y0+2*m*e*cyp+e*e*y2;l.rot+=.5;});}).concat([wait(300).then(()=>{sfx('slash');t.hurt=.4;shake(6);
        for(let i=0;i<10;i++)part({x:tx+rnd(-20,20),y:ty+rnd(-30,30),vx:rnd(-260,260),vy:rnd(-260,60),g:500,life:rnd(.4,.8),size:rnd(4,8),rgb:pick(['110,190,70','150,220,90','80,150,50']),add:false,shape:'leaf'});hit(u,t,sub);})]));
    for(const l of grp)l.st='gone';}
  toss(t,40,320);E.R=1;await tween(300,k=>E.R=1+k*2);E.on=false;await bodySettle(u);}finally{rel();}};

// ---- Kaelen – Bambuszcsapás (lassabb, élethűbb): a bothegyen zöld erő gyűlik, három festett bambuszlándzsa sima ívben,
// a repülés irányába fordulva száll (elmosódó nyommal), egymás után belefúródik; aztán festett bambuszrudak (fx7-bamboopole) törnek fel körülötte
function r21Pole(x,gy,H,k,lean=0,a=1){const im=R17I.bamboopole;if(!im||k<=0)return;const w=H*im.width/im.height;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,gy);ctx.rotate(lean);ctx.beginPath();ctx.rect(-w,-H*k-4,w*2,H*k+4);ctx.clip();ctx.drawImage(im,-w/2,-H*k,w,H);ctx.restore();}
A.druidSpears=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);const im=R17I.bamboospear||FX_IMG.bamboospear;try{u.pose='attack';await bodyWind(u,320,.18);const h=handPos(u),tx=cx(t),ty=midY(t);
  const C={a:0,on:true};R18E({update(){return C.on;},draw(){if(C.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,90*C.a,'150,240,90',.8*C.a);ctx.restore();}}});
  sfx('wind');kaeLeaves(h.x,h.y,24,220);await tween(420,k=>C.a=r21ease.out(k));
  bodyStrike(u,200,-.26);C.a=0;const SP=[],stuck=[],st={a:1};const SW=290;
  R18E({update(){for(const s of SP){s.tr.unshift({x:s.x,y:s.y,r:s.r});if(s.tr.length>6)s.tr.pop();}return st.a>0;},
    draw(){if(!im)return;const sh=SW*im.height/im.width*1.7;
      for(const s of stuck){ctx.save();ctx.globalAlpha=st.a;ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.drawImage(im,-SW*.8,-sh/2,SW,sh);ctx.restore();}
      for(const s of SP){if(s.done)continue;for(let i=1;i<s.tr.length;i++){const q=s.tr[i];ctx.save();ctx.globalAlpha=.18*(1-i/6);ctx.translate(q.x,q.y);ctx.rotate(q.r);ctx.drawImage(im,-SW/2,-sh/2,SW,sh);ctx.restore();}
        ctx.save();ctx.globalCompositeOperation='lighter';glow(s.x,s.y,80,'150,240,90',.6);ctx.restore();ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.drawImage(im,-SW/2,-sh/2,SW,sh);ctx.restore();}if(st.grove>0)r21GroveBurst(cx(t),t.y+t.oy+10,Math.max(320,t.w*t.scale*2.6),st.grove,st.a);}});
  const fl=[];for(let i=0;i<5;i++){const oy=(i-2)*30,s={x:h.x,y:h.y,r:0,tr:[]};SP.push(s);fl.push((async()=>{await wait(i*140);sfx('whoosh');const x0=h.x,y0=h.y,x1=tx-10+i*8,y1=ty+oy,arc=60+i*20;let px=x0,py=y0;
      await tween(480,k=>{const e=r21ease.io(k);s.x=x0+(x1-x0)*e;s.y=y0+(y1-y0)*e-Math.sin(e*Math.PI)*arc;s.r=Math.atan2(s.y-py,s.x-px)||s.r;px=s.x;py=s.y;});
      s.done=true;stuck.push({x:s.x,y:s.y,r:s.r});shake(12);sfx('hit');kaeLeaves(s.x,s.y,22,320);t.hurt=.4;})());}
  await Promise.all(fl);await wait(120);
  // festett bambuszrudak törnek fel az ellenfél körül, és megdobják
  const gy=t.y+t.oy+10,PH=Math.max(260,t.h*t.scale*1.5),B=[...Array(7)].map((_,i)=>({x:tx+(i-3)*30+rnd(-8,8),H:PH*rnd(.75,1.1),k:0,l:(i-3)*.06+rnd(-.04,.04)}));sfx('rock');shake(16);
  R18E({update(){return st.a>0;},draw(){for(const b of B)r21Pole(b.x,gy,b.H,b.k,b.l,st.a);}});
  for(let i=0;i<26;i++)part({x:tx+rnd(-90,90),y:gy,vx:rnd(-220,220),vy:rnd(-420,-150),g:800,life:.8,size:rnd(6,11),rgb:pick(['120,95,60','95,75,45']),add:false,shape:'rock'});
  st.grove=0;tween(380,k=>st.grove=r21ease.back(k));B.forEach((b,i)=>setTimeout(()=>tween(320,k=>b.k=r21ease.back(k)),Math.abs(i-3)*70));kaeLeaves(cx(t),midY(t),70,520);flash('190,255,150',.25,.12);await wait(150);toss(t,110,620);hit(u,t,sk);
  await wait(650);await tween(450,k=>{st.a=1-k;st.grove=Math.min(st.grove,1-k);for(const b of B)b.k=Math.min(b.k,1-r21ease.in(k));});C.on=false;await bodySettle(u);}finally{rel();}};

// ---- Kaelen – Tövisvihar (élethűbb): a festett tüskés forgószél valóban FORGÓ tölcsér – szeletenként hullámzik és csavarodik
// (nincs hirtelen tükrözés), körülötte festett levelek és tüskék keringenek elöl-hátul, port és fűszálat szív fel; az elkapott
// ellenséget felkapja és megpörgeti, aztán ledobja (vágáscsík nincs)
function r21Twister(im,x,gy,H,t,a=1){if(!im)return;const W=H*im.width/im.height,N=40,sh=im.height/N;ctx.save();
  for(let i=0;i<N;i++){const q=i/N,yy=gy-H+q*H,off=Math.sin(t*4+q*4)*H*.04*(1-q*.6),c=Math.cos(t*9+q*5),w=W*(.9+.1*Math.abs(c));
    // forgás: a kép és tükörképe szeletenként, fázisban eltolva váltja egymást – a minta körbefut a tölcsér körül
    for(const [fl,al] of [[1,(1+c)/2],[-1,(1-c)/2]]){if(al<.02)continue;ctx.save();ctx.globalAlpha=a*Math.min(1,al*1.25);ctx.translate(x+off,0);ctx.scale(fl,1);ctx.drawImage(im,0,i*sh,im.width,sh+1,-w/2,yy,w,H/N+1);ctx.restore();}}
  ctx.restore();}
A.thornStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,.12);sfx('wind');const h=handPos(u),im=R17I.rosestorm||R17I.thornstorm,lf=R17I.leaf;
  const gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length+10,T={x:h.x,y:h.y,s:.15,a:1,t:0,on:true},O=[...Array(34)].map(()=>({q:rnd(.05,.95),ph:rnd(0,6.28),sp:rnd(4,7),s:rnd(.6,1.1)}));
  R18E({update(dt){T.t+=dt;if(T.on&&T.s>.5&&Math.random()<.7)part({x:T.x+rnd(-70,70),y:gy-rnd(0,10),vx:rnd(-80,80),vy:-rnd(150,320),life:rnd(.5,.9),size:rnd(4,8),rgb:pick(['150,120,80','120,95,60','110,170,60']),add:false,shape:pick(['rock','leaf'])});return T.a>0;},
    draw(){if(T.a<=0)return;const H=480*T.s,base=T.y;
      const orb=front=>{for(const o of O){const an=o.ph+T.t*o.sp,f=Math.sin(an)>0;if(f!==front)continue;const r=(30+o.q*H*.32),yy=base-o.q*H+Math.sin(an)*r*.18;
        if(lf)r17Draw(lf,T.x+Math.cos(an)*r,yy,40*o.s*T.s,{rot:an*2,a:T.a*(front?1:.5)});}};
      orb(false);r21Twister(im,T.x,base+8,H,T.t,T.a);orb(true);}});
  // kinő a bothegyből és leszáll a földre
  await tween(550,k=>{T.s=.15+.85*r21ease.back(k);T.y=h.y+(gy-h.y)*r21ease.io(k);});bodyStrike(u,180,-.2);sfx('whoosh');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x0=T.x,x1=cx(xs[xs.length-1])+70,caught=new Map();const wnd=setInterval(()=>sfx('wind'),300);
  await tween(1700,k=>{T.x=x0+(x1-x0)*r21ease.io(k);T.s=1+.05*Math.sin(k*24);
    for(const t of xs){const d=Math.abs(T.x-cx(t));if(!caught.has(t)&&d<50){caught.set(t,k);sfx('slash');shake(10);t.hurt=.5;
        for(let n=0;n<26;n++)part({x:cx(t),y:midY(t),vx:rnd(-380,380),vy:rnd(-360,80),g:500,life:.8,size:rnd(8,14),rgb:pick(['108,191,58','77,154,42','155,216,90']),add:false,shape:'leaf'});hit(u,t,sk);toss(t,90,650);}
      // a tölcsérben pörög, amíg benne van
      if(caught.has(t)){const q=(k-caught.get(t))*5;t.spin=q<1?q*Math.PI*4:0;}}});
  clearInterval(wnd);for(const t of xs){t.spin=0;if(!caught.has(t)&&t.alive)hit(u,t,sk);}T.on=false;await tween(500,k=>{T.a=1-k;T.s=1+.3*k;});await bodySettle(u);}finally{rel();}};

// ---- Kaelen – Ősi Tölgy ökle (sima mozgás): kinő, hátralendül (felhúzás), aztán gyorsulva, folyamatosan lecsap (elmosódó
// nyommal, nincs képkocka-ugrás és kimerevítés), visszapattan, végül a földbe süllyed (nem lapul össze)
{const o0=A.oakFist;A.oakFist=async(u,ts,sk)=>{const im=R17I.oakfist,t=ts[0];if(!im||!t)return o0(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,300,.14);u.pose='attack';await bodyStrike(u,180,-.22);sfx('quake');rumble&&rumble(1,8);
  const bx=cx(t)-t.w*t.scale*.7-40,gy=t.y+t.oy+24,Hh=Math.max(420,t.h*t.scale*2.4),Ww=Hh*im.width/im.height,F={k:0,a:1,rot:-.15,sink:0,tr:[]};groundCrack&&groundCrack(bx,gy-10,'120,90,60',200);
  const one=(rot,a)=>{ctx.save();ctx.globalAlpha*=a;ctx.translate(bx,gy+F.sink);ctx.rotate(rot);const h=Hh*F.k;ctx.drawImage(im,-Ww/2,-h,Ww,h);ctx.restore();};
  R18E({update(){F.tr.unshift(F.rot);if(F.tr.length>5)F.tr.pop();return F.a>0;},draw(){if(F.k<=0)return;ctx.save();ctx.beginPath();ctx.rect(-2000,-2000,5000,gy+2000+6);ctx.clip();ctx.globalAlpha=F.a;
    if(F.fast)for(let i=F.tr.length-1;i>=1;i--)one(F.tr[i],.16*(1-i/5));one(F.rot,1);ctx.restore();}});
  for(let i=0;i<50;i++)part({x:bx+rnd(-90,90),y:gy,vx:rnd(-240,240),vy:rnd(-520,-180),life:1,size:rnd(7,14),rgb:pick(['120,90,60','90,70,45']),g:800,add:false,shape:'rock'});kaeLeaves(bx,gy-80,40,360,160);
  await tween(560,k=>F.k=r21ease.back(k));sfx('growl');
  await tween(320,k=>F.rot=-.15-.25*r21ease.out(k));await wait(80);
  F.fast=true;sfx('whoosh');await tween(300,k=>F.rot=-.4+1.35*r21ease.in(k));F.fast=false;
  shake(26);sfx('boom');sfx('quake');flash('255,240,200',.35,.15);dustWave&&dustWave(cx(t),t.y+t.oy);kaeLeaves(cx(t),midY(t),60,460);t.hurt=.6;toss(t,40,300);hit(u,t,sk);
  await tween(240,k=>F.rot=.95-.12*Math.sin(k*Math.PI));
  await wait(380);await tween(260,k=>F.rot=.95-.95*r21ease.io(k));await tween(520,k=>{F.sink=Hh*r21ease.in(k);});F.a=0;await bodySettle(u);}finally{rel();}};}

// ---- Kaelen – Virágzó élet (élethűbb): a festett virágkoszorú a földön kinyílik, aztán több koszorú spirálban felfelé
// emelkedik az elesett társ körül (virággubó), festett szirmok örvénylenek; meleg arany-zöld fény (nem vakító fehér),
// a társ a gubóban felemelkedik, feltámad, és puhán visszaereszkedik
A.bloomRevive=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,240,.1);sfx('heal');const im=R17I.bloomring,pt=R17I.petal,gx=cx(t),gy=t.y+t.oy+8,TH=t.h*t.scale;
  const B={k:0,a:1,t:0,rise:0,glow:0},RW=Math.max(260,t.w*t.scale*2.4),P=[...Array(28)].map(()=>({q:rnd(0,1),ph:rnd(0,6.28),sp:rnd(1.5,3),s:rnd(.6,1.1)}));
  const ring=(y,s,a,rot)=>{if(!im)return;ctx.save();ctx.globalAlpha*=a;ctx.translate(gx,y);ctx.scale(1,.34);ctx.rotate(rot);r17Draw(im,0,0,RW*s);ctx.restore();};
  R18E({update(dt){B.t+=dt;return B.a>0;},draw(){if(B.k<=0)return;ctx.save();ctx.globalAlpha=B.a;
    if(B.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(gx,gy-TH*.5,TH*.9,'255,215,140',.35*B.glow);glow(gx,gy-TH*.5,TH*.5,'190,255,170',.3*B.glow);ctx.restore();}
    ring(gy,B.k,1,B.t*.3);
    // spirálban felszálló koszorúk (gubó)
    for(let i=0;i<3;i++){const q=Math.max(0,Math.min(1,B.rise*1.4-i*.2));if(q<=0)continue;ring(gy-q*TH*(.35+i*.25),.75-i*.12,(1-q*.5)*.9,-B.t*(.5+i*.2));}
    // festett szirmok örvénye
    for(const p of P){const an=p.ph+B.t*p.sp,y=gy-((p.q+B.t*.25)%1)*TH*1.2*B.k,r=RW*.32*(1-(gy-y)/(TH*1.6));if(pt)r17Draw(pt,gx+Math.cos(an)*r,y+Math.sin(an)*r*.25,24*p.s,{rot:an,a:Math.sin(an)>0?1:.5});}
    ctx.restore();}});
  const h=handPos(u);for(let i=0;i<30;i++)setTimeout(()=>part({x:h.x,y:h.y,vx:(gx-h.x)*rnd(1.5,2),vy:(gy-60-h.y)*rnd(1.5,2)-rnd(40,120),life:.6,size:rnd(5,9),rgb:pick(['255,154,200','255,211,107','170,230,120']),add:false,shape:'leaf'}),i*22);
  await tween(800,k=>B.k=r21ease.back(k));sfx('holy');await tween(900,k=>{B.rise=r21ease.io(k);B.glow=k;t.oy=-26*r21ease.io(k);});
  hit(u,t,sk);t.alpha=1;sfx('heal');shake(4);await wait(500);
  await tween(450,k=>{t.oy=-26*(1-r21ease.io(k));});t.oy=0;await tween(500,k=>{B.a=1-k;B.glow=1-k;});await bodySettle(u);}finally{rel();}};

// ---- Kőőr – Kőhabverő-csapás (a felhasználó kérésére TELJESEN MÁS): a kőhabverőt a földbe döfi, és őrült habverésbe kezd –
// a föld kőörvénnyé kavarodik (festett kavicsok, kőtömbök keringenek), az örvény végigvándorol a hősig, alatta sziklagejzír
// tör ki (festett kőhullám-darabok törnek fel), a hőst magasra dobja, kőzápor hull vissza
A.stoneMace=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);const pb=R17I.pebble,sw=R17I.stonewave,rc=R17I.rockcloud;try{u.pose='attack';
  const gy=u.y+u.oy+6,x0=cx(u)-u.w*u.scale*.5,x1=cx(t),gy1=t.y+t.oy+6,V={x:x0,y:gy,r:30,h:0,a:1,t:0,on:true},R=[...Array(46)].map(()=>({ph:rnd(0,6.28),q:rnd(0,1),s:rnd(.5,1.3),sp:rnd(5,8)})),G=[];
  R18E({update(dt){V.t+=dt;if(V.on&&Math.random()<.15)part({x:V.x+rnd(-V.r,V.r),y:V.y-rnd(0,10),vx:rnd(-90,90),vy:-rnd(60,180),life:rnd(.5,.8),size:rnd(8,14),rgb:pick(['150,140,120','120,110,95']),add:false,shape:'dot',g:-30,drag:1});return V.a>0||G.length;},
    draw(){if(V.a>0){ctx.save();ctx.globalAlpha=V.a;// földörvény: sötét, forgó tölcsérfolt + keringő kövek (hátul halványabb)
        const sv=R17I.stonevortex;if(sv){const w=V.r*2.6,h=w*sv.height/sv.width*(1+V.h/160);for(const [fl,al] of [[1,(1+Math.cos(V.t*8))/2],[-1,(1-Math.cos(V.t*8))/2]]){ctx.save();ctx.globalAlpha*=Math.min(1,al*1.3);ctx.translate(V.x,V.y+h*.12);ctx.scale(fl,1);ctx.drawImage(sv,-w/2,-h,w,h);ctx.restore();}}else{const g=ctx.createRadialGradient(V.x,V.y,4,V.x,V.y,V.r*1.2);g.addColorStop(0,'rgba(60,50,40,.75)');g.addColorStop(1,'rgba(90,75,55,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(V.x,V.y,V.r*1.2,V.r*.36,0,0,7);ctx.fill();}
        for(const pass of [0,1])for(const s of R){const an=s.ph+V.t*s.sp,f=Math.sin(an)>0;if((f?1:0)!==pass)continue;const rr=V.r*(.35+.65*s.q),y=V.y-s.q*V.h+Math.sin(an)*rr*.3;
          if(pb)r17Draw(pb,V.x+Math.cos(an)*rr,y,40*s.s*(1+V.h/250),{rot:an*1.5,a:f?1:.6});else{ctx.fillStyle='#7d7568';ctx.beginPath();ctx.arc(V.x+Math.cos(an)*rr,y,8*s.s,0,7);ctx.fill();}}
        ctx.restore();}
      for(const p of G)if(sw){ctx.save();ctx.translate(p.x,gy1+8);ctx.rotate(p.rot);r17Draw(sw,0,0,p.w,{anchor:'bottom',sy:Math.max(.01,p.k),a:p.a});ctx.restore();}}});
  // 1) a kőhabverőt a földbe döfi és veri: dől-rázkódik, a föld örvénybe kavarodik
  await bodyWind(u,260,.14);sfx('rock');shake(8);
  const iv=setInterval(()=>{sfx(pick(['rock','crunch']));},170);
  await tween(900,k=>{u.lean=.14+.07*Math.sin(k*70);V.r=30+60*r21ease.out(k);V.h=40*k;if(Math.random()<.3)shake(3);});
  // 2) az örvény végigvándorol a hősig, közben nő és tölcsérré emelkedik
  await tween(700,k=>{const e=r21ease.io(k);V.x=x0+(x1-x0)*e;V.y=gy+(gy1-gy)*e;V.r=90+40*e;V.h=40+120*e;u.lean=.12+.05*Math.sin(k*60);});clearInterval(iv);u.lean=0;
  // 3) sziklagejzír: festett kőhullám-darabok törnek fel, a hős magasra repül
  sfx('boom');sfx('quake');shake(26);flash('255,240,210',.3,.12);rumble&&rumble(1.2,10);t.hurt=.6;toss(t,140,820);hit(u,t,sk);
  for(let i=0;i<7;i++){const p={x:x1+(i-3)*50+rnd(-10,10),w:rnd(240,320),rot:(i-2)*.16,k:0,a:1};G.push(p);setTimeout(()=>tween(300,k=>p.k=r21ease.back(k)),Math.abs(i-3)*60);}
  if(pb)for(let i=0;i<18;i++){const r={x:x1+rnd(-40,40),y:gy1-20,vx:rnd(-320,320),vy:-rnd(500,900),rot:0,vr:rnd(-8,8),s:rnd(.8,1.8),t:0};R18E({update(dt){r.t+=dt;r.x+=r.vx*dt;r.y+=r.vy*dt;r.vy+=1300*dt;r.rot+=r.vr*dt;return r.t<1.4&&r.y<gy1+20;},draw(){r17Draw(pb,r.x,r.y,40*r.s,{rot:r.rot});}});}
  for(let i=0;i<26;i++)part({x:x1+rnd(-60,60),y:gy1-rnd(0,40),vx:rnd(-260,260),vy:-rnd(420,820),g:900,life:rnd(1,1.5),size:rnd(10,18),rgb:pick(['130,120,105','100,92,80','150,140,120']),add:false,shape:'rock'});
  if(rc){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<1.2;},draw(){r17Draw(rc,x1,gy1-120-st.t*60,300,{a:Math.min(1,st.t*4)*(1-st.t/1.2)*.5});}});}
  await tween(350,k=>{V.a=1-k;});V.on=false;await wait(700);
  await tween(450,k=>{for(const p of G){p.k=1-r21ease.in(k);p.a=1-k*.5;}});G.length=0;await bodySettle(u);}finally{rel();u.lean=0;}};

// ---- Kaelen LIMIT – Bambusz-gólem (a felhasználó: túl nagy volt, kilógott, és nem látszott a funkciója): kisebb, teljesen
// a képen belül marad; felhúzza magát, és két karral a földbe csap – minden ellenség alatt sorban festett bambuszrudak törnek
// fel és megdobják őket; végül a hősök elé bambuszfal nő (1 kör Védelem+), a gólem visszasüllyed
A.bambooGolem=async(u,ts,sk)=>{const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,.14);sfx('quake');await dimTo(.45,'10,30,5',300);
  const im=R17I.bamgolem,GH=450,G={x:460,y:505,k:0,a:1,rot:0,sink:0};
  R18E({update(){return G.a>0;},draw(){if(!im||G.k<=0)return;const w=GH*im.width/im.height;ctx.save();ctx.beginPath();ctx.rect(0,0,960,G.y+6);ctx.clip();ctx.globalAlpha=G.a;ctx.translate(G.x,G.y+G.sink);ctx.rotate(G.rot);ctx.drawImage(im,-w/2,-GH*G.k,w,GH*G.k);ctx.restore();}});
  for(let i=0;i<50;i++)part({x:G.x+rnd(-150,150),y:G.y,vx:rnd(-200,200),vy:rnd(-420,-150),life:rnd(.7,1.1),size:rnd(7,12),rgb:pick(['120,90,60','90,70,40']),g:700,add:false,shape:'rock'});
  rumble&&rumble(1,10);shake(16);await tween(800,k=>G.k=r21ease.back(k));kaeLeaves(G.x,G.y-250,50,380);sfx('growl');
  // felhúzás és kétkezes csapás a földbe
  // két nagy lépés előre (dübörgés), felhúzás, lecsapás
  for(let st=0;st<2;st++){await tween(280,k=>{G.x+=1.6;G.rot=.05*Math.sin(k*Math.PI)*(st?1:-1);});sfx('quake');shake(12);for(let i=0;i<10;i++)part({x:G.x+rnd(-80,80),y:G.y,vx:rnd(-160,160),vy:-rnd(80,220),g:800,life:.6,size:rnd(6,10),rgb:'110,85,55',add:false,shape:'rock'});}
  await tween(380,k=>G.rot=-.14*r21ease.out(k));sfx('whoosh');await tween(200,k=>G.rot=-.14+.34*r21ease.in(k));
  shake(28);sfx('boom');sfx('quake');flash('200,240,150',.3,.15);groundCrack&&groundCrack(G.x+60,G.y-6,'120,90,60',260);
  for(let i=0;i<30;i++)part({x:G.x+60+rnd(-60,60),y:G.y,vx:rnd(-260,260),vy:rnd(-460,-160),life:.9,size:rnd(7,13),rgb:pick(['120,90,60','90,70,40']),g:800,add:false,shape:'rock'});
  // a csapás végigfut a földön: minden ellenség alatt festett bambuszrudak törnek fel
  const P=[];R18E({update(){return G.a>0||P.length;},draw(){for(const p of P)r21Pole(p.x,p.gy,p.H,p.k,p.l,p.a);}});
  for(const t of ts.filter(e=>e.alive).sort((a,b)=>cx(a)-cx(b))){const gy=t.y+t.oy+8,H=Math.max(240,t.h*t.scale*1.4);
    const gv={k:0};R18E({update(){return G.a>0&&gv.k>0||gv.k===0;},draw(){if(gv.k>0)r21GroveBurst(cx(t),gy,Math.max(330,t.w*t.scale*2.7),gv.k,G.a);}});tween(320,k=>gv.k=r21ease.back(k)).then(()=>wait(700)).then(()=>tween(400,k=>gv.k=Math.max(.001,1-k)));
    for(let i=0;i<7;i++){const p={x:cx(t)+(i-3)*24+rnd(-6,6),gy,H:H*rnd(.8,1.2),k:0,l:(i-3)*.07,a:1};P.push(p);tween(260,k=>p.k=r21ease.back(k));}
    sfx('rock');shake(18);kaeLeaves(cx(t),midY(t),50,440);flash('200,250,150',.2,.1);t.hurt=.6;toss(t,120,640);hit(u,t,sk);await wait(230);}
  await tween(220,k=>G.rot=.18-.18*k);
  // bambuszfal a hősök elé
  const hs=S.heroes.filter(h=>h.alive),wx=Math.max(...hs.map(h=>cx(h)+h.w*h.scale*.5))+30,wy=Math.max(...hs.map(h=>h.y+h.oy))+6,W2=[...Array(6)].map((_,i)=>({x:wx-i*12+rnd(-5,5),gy:wy-i*24,H:rnd(230,280),k:0,l:rnd(-.05,.05),a:1}));
  for(const p of W2){P.push(p);tween(300,k=>p.k=r21ease.back(k));await wait(50);}sfx('rock');hs.forEach(h=>addStatus(h,'defUp',2));popLabel(u,'BAMBUSZFAL!','#b8e07a');await wait(700);
  await tween(600,k=>{G.sink=GH*r21ease.in(k);for(const p of P){p.k=Math.min(p.k,1-k);}});G.a=0;P.length=0;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- Forró hab / Szertartás-hab: egyforma habgombóc-sor helyett festett, gördülő matchahab-HULLÁM (fx7-foamwave):
// a tálból kibuggyan, a földről hullámmá nő, hullámzó taréjjal végiggördül a hősökön, gőzölög, a végén szétterül és elpárolog
{const ff0=A.foamFlood;A.foamFlood=async(u,ts,sk)=>{const im=R17I.foamwave,al=ts.filter(t=>t.alive);if(!im||!al.length)return ff0(u,ts,sk);const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,260,-.1);
  const o=u.type==='teamaster'?KP(u,.15,.28):u.type==='chasen'?KP(u,.15,.1):KP(u,.48,.17);sfx('splash');sfx('steam');
  const gy=Math.max(...al.map(t=>t.y+t.oy))+14,xmin=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5))-180,WH=Math.max(260,Math.max(...al.map(t=>t.h*t.scale))*1.25),WW=WH*im.width/im.height;
  const Wv={x:cx(u)-u.w*u.scale*.2,k:0,a:1,t:0},Bub=[...Array(22)].map(()=>({x:o.x+rnd(-26,26),y:o.y,vx:rnd(-120,10),vy:-rnd(80,220),r:rnd(14,26),k:0}));
  R18E({update(dt){Wv.t+=dt;for(const b of Bub){b.k=Math.min(1,b.k+dt*2.5);b.x+=b.vx*dt;b.y+=b.vy*dt;b.vy+=520*dt;if(b.y>gy-8){b.y=gy-8;b.vy=0;b.vx*=.9;}}
      if(Wv.k>.3&&Math.random()<.5)r21Steam(Wv.x+rnd(-WW*.3,WW*.2),gy-WH*Wv.k*.8,rnd(-30,10),-rnd(50,110),false);return Wv.a>0;},
    draw(){ctx.save();ctx.globalAlpha=Wv.a;for(const b of Bub)r21Froth(b.x,b.y,b.r*b.k,Wv.k>.6?1-(Wv.k-.6):1,b.x*.01);
      if(Wv.k>0){const h=WH*Wv.k*(1+.04*Math.sin(Wv.t*9)),w=WW*(.7+.3*Wv.k);ctx.beginPath();ctx.rect(-100,-100,1200,gy+100+4);ctx.clip();ctx.translate(Wv.x,gy+4);ctx.transform(1,0,-.06*Math.sin(Wv.t*6),1,0,0);ctx.drawImage(im,-w*.45,-h,w,h);}
      ctx.restore();}});
  await wait(420);sfx('splash');
  // a hullám feltornyosul a gólem előtt
  await tween(420,k=>Wv.k=r21ease.back(k));sfx('whoosh');
  // végiggördül a hősökön: akit elér, azt meglöki és beborítja
  const x0=Wv.x,hitSet=new Set();const iv=setInterval(()=>sfx(pick(['splash','steam'])),260);
  await tween(1300,k=>{Wv.x=x0+(xmin-x0)*r21ease.io(k);for(const t of al)if(!hitSet.has(t)&&Wv.x-WW*.25<cx(t)){hitSet.add(t);t.hurt=.5;toss(t,40,360);shake(10);hit(u,t,sk);for(let i=0;i<4;i++)r21Steam(cx(t)+rnd(-30,30),midY(t),rnd(-30,30),-rnd(60,120),false);}});
  clearInterval(iv);for(const t of al)if(!hitSet.has(t)&&t.alive)hit(u,t,sk);
  // szétterül és elpárolog
  await tween(600,k=>{Wv.k=1-r21ease.in(k)*.9;Wv.a=1-k;});await bodySettle(u);}finally{rel();}};}

// ---- PÁROS: Medvelovaglás (sima, élethűbb): Grog végig a medve hátán ül (nem ugrál ki-be a figurája), a medve vágtázva
// rázkódik; minden ellenségnél a futó és a felágaskodó medvekép ÁTÚSZIK egymásba (nincs hirtelen képcsere), Grog a hátáról
// felpattan és a medve mancsával együtt lecsap a fejszéjével; repedés, por, kőzápor (karmolás-csíkok és kimerevítés nélkül)
R16P['Medvelovaglás']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,orc=dr===A1?B1:A1,osp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc,run=R17I.wsbear,rear=R17I.wsbear2||run;await dimTo(.35,'30,20,10',250);
  kaeLeaves(cx(dr),midY(dr),80,460);sfx('growl');flash('150,230,90',.3,.15);const a0=dr.alpha==null?1:dr.alpha,b0=orc.alpha==null?1:orc.alpha;
  const B={x:cx(dr),y:dr.y+dr.oy+8,s:.4,a:0,rot:0,R:0,ry:0,on:true,run:false,rider:0,gj:0,gr:0,gx:0,t:0};const W0=560;
  const back=()=>{const w=W0*B.s,bh=run?w*run.height/run.width:w*.68;return {x:B.x-w*.08,y:B.y-bh*.62+B.ry};};
  R18E({update(dt){B.t+=dt;if(B.on&&B.run&&Math.random()<.5)part({x:B.x-W0*.3+rnd(-60,60),y:B.y,vx:rnd(-300,-80),vy:-rnd(30,120),life:.6,size:rnd(20,32),grow:20,rgb:'170,140,100',add:false,shape:'smoke'});return B.on;},
    draw(){if(B.a<=0)return;ctx.save();ctx.globalAlpha=B.a;const w=W0*B.s;
      if(run&&B.R<1)r17Draw(run,B.x,B.y+B.ry*.3,w,{anchor:'bottom',rot:B.rot,a:1-B.R});if(rear&&B.R>0)r17Draw(rear,B.x+w*.05,B.y,w*.8,{anchor:'bottom',rot:B.rot,a:B.R});
      if(B.rider&&osp){const bp=back(),hh=orc.h*orc.scale*1.15,ww=hh*osp.width/osp.height;ctx.save();ctx.translate(bp.x+B.gx,bp.y+hh*.32-B.gj);ctx.rotate(B.rot+B.gr);ctx.drawImage(osp,-ww/2,-hh,ww,hh);ctx.restore();}ctx.restore();}});
  await tween(420,k=>{dr.alpha=a0*(1-k);B.a=k;B.s=.4+.6*r21ease.back(k);});sfx('roar');shake(16);rumble&&rumble(1.2,8);
  // Grog nagy ívben felugrik a medve hátára
  const ox=cx(orc),oy=orc.y+orc.oy,oo=orc.oy;await tween(420,k=>{const bp=back(),e=r21ease.io(k);orc.ox=(bp.x-ox)*e;orc.oy=oo+(bp.y+30-oy)*e;orc.jump=Math.sin(k*Math.PI)*120;});orc.alpha=0;orc.ox=0;orc.oy=oo;orc.jump=0;B.rider=1;sfx('hit');shake(6);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b));B.run=true;sfx('roar');
  for(const t of xs){const x0=B.x,tx=cx(t)-W0*.32;
    await tween(560,k=>{B.x=x0+(tx-x0)*r21ease.io(k);B.rot=.035*Math.sin(B.t*9);B.ry=-Math.abs(Math.sin(B.t*7))*12;});
    // felágaskodás: átúszik a felágaskodó képbe, Grog felpattan, hátralendíti a fejszét
    sfx('roar');await tween(420,k=>{const e=r21ease.io(k);B.R=e;B.rot=-.1*e;B.ry=0;B.gj=90*e;B.gr=-.5*e;B.gx=30*e;});
    // lecsapás: medve és Grog együtt
    sfx('whoosh');await tween(240,k=>{const e=r21ease.in(k);B.R=1-e;B.rot=-.1+.14*e;B.gj=90*(1-e);B.gr=-.5+1.0*e;});
    shake(28);sfx('quake');sfx('hit');flash('255,230,190',.3,.1);groundCrack&&groundCrack(cx(t),t.y+t.oy,'140,110,80',220);dustWave&&dustWave(cx(t),t.y+t.oy);
    for(let i=0;i<36;i++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy,vx:rnd(-380,380),vy:rnd(-520,-150),g:1000,life:1,size:rnd(7,15),rgb:pick(['140,110,80','110,90,60']),add:false,shape:'rock'});
    toss(t,120,520);t.hurt=.7;hit(dr,t,sk);await tween(220,k=>{B.rot=.04*(1-k);B.gr=.5*(1-k);B.gx=30*(1-k);});}
  B.run=false;const x1=B.x;await tween(600,k=>{B.x=x1+(cx(dr)-x1)*r21ease.io(k)*.3;B.ry=-Math.abs(Math.sin(B.t*12))*10;});
  // Grog leugrik és visszaáll a helyére
  B.rider=0;const bp=back();orc.alpha=b0;orc.ox=bp.x-ox;orc.oy=oo+bp.y+30-oy;await tween(420,k=>{const e=r21ease.io(k);orc.ox=(bp.x-ox)*(1-e);orc.oy=oo+(bp.y+30-oy)*(1-e);orc.jump=Math.sin(k*Math.PI)*100;});orc.ox=0;orc.oy=oo;orc.jump=0;
  kaeLeaves(B.x,B.y-150,60,380);await tween(320,k=>{B.a=1-k;dr.alpha=a0*k;});B.on=false;dr.alpha=a0;orc.alpha=b0;await dimTo(0,null,300);};

// ---- PÁROS: Bambuszliget (látványosabb): egész bambuszerdő tör fel hullámokban az ellenségek alatt (sok festett bambuszrúd,
// különböző magasság és dőlés), a rudak hegyén az ellenségek magasba repülnek; Jázmin festett, izzó nyilakkal (jzarrow) lövi
// őket a levegőben; levélrobbanás, aztán a liget visszahúzódik
R16P['Bambuszliget']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,monk=dr===A1?B1:A1,arw=FX_IMG.jzarrow;await dimTo(.3,'10,30,5',250);await r16Raise(dr,'150,230,90');sfx('quake');rumble&&rumble(1.2,10);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),gy=Math.max(...xs.map(t=>t.y+t.oy))+10,x0=cx(xs[0])-150,x1=cx(xs[xs.length-1])+150,E={a:1},P=[];
  for(let i=0;i<26;i++){const x=x0+(x1-x0)*i/25+rnd(-12,12);P.push({x,gy:gy-rnd(0,26),H:rnd(250,400),k:0,l:rnd(-.12,.12),a:1,d:Math.abs(x-(x0+x1)/2)});}P.sort((a,b)=>a.gy-b.gy);
  E.g=0;R18E({update(){if(E.g>.5&&Math.random()<.6&&R17I.leaf){const lf={x:rnd(x0,x1),y:-20,vx:rnd(-40,40),vy:rnd(90,160),r:rnd(0,6),s:rnd(.7,1.2),t:0};R18E({update(dt){lf.t+=dt;lf.x+=lf.vx*dt+Math.sin(lf.t*3)*1.2;lf.y+=lf.vy*dt;lf.r+=dt*2;return lf.t<3&&E.a>0;},draw(){r17Draw(R17I.leaf,lf.x,lf.y,46*lf.s,{rot:lf.r,a:E.a});}});}return E.a>0;},draw(){if(E.g>0)for(const t of xs)r21GroveBurst(cx(t),gy+6,Math.max(340,t.w*t.scale*2.8),E.g,E.a*.95);for(const q of P)r21Pole(q.x,q.gy,q.H,q.k,q.l,E.a);}});
  tween(500,k=>E.g=r21ease.back(k));
  // hullámokban tör fel (középről kifelé), föld, kő, levél
  for(const q of P){setTimeout(()=>{tween(300,k=>q.k=r21ease.back(k));if(Math.random()<.4)for(let i=0;i<6;i++)part({x:q.x,y:q.gy,vx:rnd(-200,200),vy:rnd(-420,-160),g:900,life:.8,size:rnd(6,11),rgb:pick(['120,95,60','90,140,60']),add:false,shape:'rock'});},q.d*1.4);}
  for(const t of xs)groundCrack&&groundCrack(cx(t),gy,'120,95,60',200);shake(22);sfx('rock');
  await tween(520,k=>{for(const t of xs)t.jump=r21ease.out(Math.min(1,k*1.3))*240;});r16Lower(dr);kaeLeaves((x0+x1)/2,180,90,560);
  // Jázmin izzó nyílzápora a levegőben lógó ellenségekre
  monk.pose='attack';for(let r=0;r<3;r++)for(const t of xs){const h=handPos(monk);sfx('whoosh');const ty=()=>midY(t)-t.jump;
    flyObj(h,{x:cx(t)+rnd(-20,20),y:ty()+rnd(-30,30)},230,(x,y)=>{const an=Math.atan2(ty()-h.y,cx(t)-h.x);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'180,255,140',.8);ctx.restore();
        if(arw)r17Draw(arw,x,y,170,{rot:an});else{ctx.save();ctx.translate(x,y);ctx.rotate(an);ctx.fillStyle='#e8f0c0';ctx.fillRect(-40,-2,44,4);ctx.restore();}},{trail:['180,255,140','255,255,255']})
      .then(()=>{sfx('hit');kaeLeaves(cx(t),ty(),18,320);t.hurt=.3;shake(5);sparks(cx(t),ty(),['200,255,160','255,255,255'],16,380);const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.3;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),ty(),90*(.5+st.t*2),'180,255,140',.7*(1-st.t/.3));ctx.restore();}});});await wait(70);}
  await wait(300);monk.pose='idle';await tween(260,k=>{for(const t of xs)t.jump=240*(1-k*k);});for(const t of xs){t.jump=0;toss(t,40,300);hit(dr,t,sk);}shake(26);sfx('quake');
  await wait(300);await tween(500,k=>{E.g=Math.min(E.g,1-k);for(const q of P)q.k=Math.min(q.k,1-r21ease.in(k));});E.a=0;await dimTo(0,null,300);};

// ---- PÁROS: Lótuszharmat (festett, sima): a festett lótusz lassan kinyílik a csapat alatt (ringatózik), a harmatlevelek
// fölöttük lebegnek; a levelek hegyéről FESTETT harmatcseppek (fx7-dewdrop) gördülnek le és hullanak a hősökre (csobbanás,
// gyógyító fény); a megmaradt cseppek jéggé fagynak és forogva az ellenségekbe csapódnak
R16P['Lótuszharmat']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,fa=dr===A1?B1:A1,dd=R17I.dewdrop;await dimTo(.3,'10,30,40',250);await Promise.all([r16Raise(dr,'150,230,90'),r16Raise(fa,'150,230,255')]);sfx('holy');
  const hs=S.heroes.filter(h=>h.alive),mx=hs.reduce((s,h)=>s+cx(h),0)/hs.length,gy=Math.max(...hs.map(h=>h.y+h.oy))+14,top=Math.max(90,Math.min(...hs.map(topY))-120),L={s:0,a:1,lv:0,t:0},D=[];
  const drop=(x,y,s,rot,ice,a)=>{if(dd){if(ice){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26*s,'170,230,255',.6*a);ctx.restore();}r17Draw(ice?tintSpr(dd,'rgb(200,235,255)',.55):dd,x,y,30*s,{rot,a});}else{ctx.save();ctx.globalAlpha*=a;ctx.fillStyle=ice?'#dff4ff':'#bfe8ff';ctx.beginPath();ctx.arc(x,y,7*s,0,7);ctx.fill();ctx.restore();}};
  R18E({update(dt){L.t+=dt;for(const d of D){if(d.st==='fall'){d.vy+=900*dt;d.y+=d.vy*dt;if(d.y>=d.ty){d.st='gone';const h=d.h;for(let i=0;i<5;i++)part({x:cx(h)+rnd(-20,20),y:d.ty,vx:rnd(-120,120),vy:-rnd(80,200),g:700,life:.4,size:rnd(3,5),rgb:'200,240,255',add:false,shape:'drop'});}}}return L.a>0;},
    draw(){if(L.s>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-30,380*L.s,'170,240,200',.3*L.a);ctx.restore();if(R17I.lotus){ctx.save();ctx.translate(mx,gy+50);ctx.rotate(.025*Math.sin(L.t*1.5));r17Draw(R17I.lotus,0,0,540*L.s,{anchor:'bottom',sy:.42*(.6+.4*L.s),a:L.a*.85});ctx.restore();}}
      if(L.lv>0&&R17I.dewleaves)r17Draw(R17I.dewleaves,Math.max(300,mx),top-30+Math.sin(L.t*2)*6,520*L.lv,{a:L.a});
      for(const d of D)if(d.st!=='gone')drop(d.x,d.y,d.s,d.rot,d.ice,L.a);}});
  await tween(900,k=>L.s=r21ease.back(k));
  // Lili tündérpora a lótuszra hull, és harmatlevelek nőnek
  const fh=handPos(fa);for(let i=0;i<40;i++)setTimeout(()=>part({x:fh.x,y:fh.y,vx:(mx-fh.x)*rnd(1.2,1.8)+rnd(-60,60),vy:(top-fh.y)*rnd(1,1.6),life:.7,size:rnd(3,6),rgb:pick(['180,240,255','255,255,255','255,230,140']),shape:'star'}),i*15);
  await tween(600,k=>L.lv=r21ease.back(k));sfx('heal');
  // festett harmatcseppek hullanak a hősökre
  for(let i=0;i<36;i++){const h=pick(hs),d={x:cx(h)+rnd(-60,60),y:top+rnd(10,50),vy:0,ty:midY(h)+rnd(-20,30),s:rnd(.8,1.3),rot:0,st:'fall',h};setTimeout(()=>D.push(d),i*40);}
  await wait(1700);healAll(dr,.3);for(const h of hs){for(const k of ['poison','burn','curse','foam'])if(h.st&&h.st[k])delete h.st[k];R18E({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const k=this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(h),midY(h),h.h*h.scale*(.4+.5*k),'150,240,190',.6*(1-k));ctx.restore();}});}sfx('heal');
  r16Lower(fa);await wait(250);
  // a megmaradt harmat jéggé fagy, és forogva az ellenségekbe csapódik
  sfx('ice');const ice=[];for(const t of al)for(let i=0;i<6;i++){const d={x:mx+rnd(-160,160),y:top+rnd(0,40),s:rnd(1.2,1.7),rot:0,ice:true,st:'hang'};D.push(d);ice.push({d,t});}
  await wait(250);await Promise.all(ice.map(({d,t},i)=>{const x0=d.x,y0=d.y,x1=cx(t)+rnd(-30,30),y1=midY(t)+rnd(-40,30);return wait(i*30).then(()=>tween(380,k=>{const e=r21ease.in(k);d.x=x0+(x1-x0)*e;d.y=y0+(y1-y0)*e-Math.sin(k*Math.PI)*60;d.rot+=.4;})).then(()=>{d.st='gone';});}));
  for(const t of al){sfx('ice');sparks(cx(t),midY(t),['180,240,255','255,255,255'],26,460);t.hurt=.4;toss(t,30,260);hit(dr,t,sk);await wait(70);}
  r16Lower(dr);await tween(500,k=>L.a=1-k);await dimTo(0,null,300);};
