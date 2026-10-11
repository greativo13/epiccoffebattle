// ===== 16. kör: a 14–15. kör tesztlapjának javításai =====

// ---- Espresszó – Farokcsapás: nem nyújtott farok. Odarepül a hős mellé, megfordul, és a teljes testével, a farkával csap oda
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{
  const W0=u.w*u.scale,dx=(cx(t)+W0*.58)-cx(u),dy=(t.y+4)-u.y;sfx('wind');ghosts(u,520);
  await tween(520,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*90;u.sq=1-.06*Math.sin(k*Math.PI);});u.jump=0;u.sq=1;
  puffs(cx(u),u.y+u.oy,6,['190,170,140','160,140,120'],[20,34],{w:90,up:50});shake(6);sfx('rock');
  // megfordul: a farka kerül a hős felé
  sfx('whoosh');await tween(300,k=>{u.spin=Math.PI*easeIO(k);});u.spin=Math.PI;
  // lendületvétel: elhajol a hőstől
  await tween(280,k=>{const e=easeIO(k);u.lean=-.16*e;u.ox=dx+30*e;u.sq=1+.05*e;});
  // csapás: egész testtel a hős felé lendül
  sfx('whoosh');ghosts(u,200);await tween(150,k=>{const e=eOutBack(k);u.lean=-.16+.46*e;u.ox=dx+30-90*e;u.sq=1.05-.12*Math.sin(k*Math.PI);});
  const x=cx(t),y=midY(t);sfx('rock');sfx('boom');hitStop(140);shake(22);flash('255,220,170',.3,.12);punch(x,y,.05);
  sparks(x,y,['255,230,170','255,255,255','220,180,120'],34,560);soundBlast(x,y,'255,220,160',200,420);puffs(x,t.y+t.oy,8,['190,170,140','160,140,120'],[18,30],{w:60,up:70});
  toss(t,70,460);t.hurt=.45;hit(u,t,sk);
  await wait(260);await tween(260,k=>{const e=easeIO(k);u.lean=.3*(1-e);u.ox=dx-60+60*e;u.sq=1;});u.lean=0;
  await tween(300,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;
  ghosts(u,380);await tween(380,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*70;});u.ox=0;u.oy=0;u.jump=0;}finally{rel();u.spin=0;u.lean=0;u.sq=1;}};

// ---- Tealopó majom – Csészedobás: a SAJÁT kezével dobja. Az elülső karja (a csészével) hátralendül és előrecsap; új csésze a kezébe kerül
LIMBS.monkey={order:['arm','cup'],parts:{
  arm:{poly:[[.13,.5],[.2,.5],[.26,.53],[.31,.58],[.355,.645],[.355,.715],[.29,.725],[.23,.67],[.17,.64],[.13,.615]],pivot:[.32,.67]},
  cup:{poly:[[0,.465],[.15,.465],[.165,.505],[.165,.61],[.13,.635],[0,.635]],pivot:[.32,.67]}}};
A.cupThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T0=limbOn(u,'monkey');if(!T0){hit(u,t,sk);return;}
  const arm=T0.arm,cup=T0.cup,P=[arm,cup];arm.blur=true;cup.blur=true;
  for(let n=0;n<4;n++){
    if(n>0){cup.hide=false;cup.a=0;sfx('click');await tween(140,k=>{cup.a=k;});cup.a=1;}
    sfx('whoosh');await tween(n?200:300,k=>{const e=easeIO(k);for(const p of P)p.rot=1.9*e;u.lean=.12*e;u.sq=1+.04*e;});
    await tween(110,k=>{const e=k*k;for(const p of P)p.rot=1.9-2.3*e;u.lean=.12-.3*e;u.sq=1.04-.08*k;});
    const o=limbPt(u,'cup',.09,.55);cup.hide=true;const tx=cx(t)+rnd(-20,20),ty=midY(t)+rnd(-30,20);
    flyObj(o,{x:tx,y:ty},300,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'255,230,190',.35);ctx.restore();qCupP(x,y,r,2);
        if(Math.random()<.8)part({x:x+rnd(-8,8),y:y-6,vx:rnd(-60,60),vy:rnd(-40,40),g:700,life:.4,size:rnd(3,6),rgb:pick(['150,90,40','190,130,60']),add:false,shape:'drop'});
        if(Math.random()<.4)part({x,y:y-8,vx:rnd(-20,20),vy:-rnd(30,60),life:.6,size:rnd(8,14),grow:20,rgb:'245,245,250',add:false,shape:'smoke'});},{spin:-14,arc:110}).then(()=>{
      sfx('glass');shake(9);hitStop(50);fallDebris(tx,ty,16,(x,y,r,s)=>qPorcShard(x,y,r,s*1.4),{v:380});splat(tx,ty,['150,90,40','190,130,60','220,170,90'],26,360,'drop');
      puffs(tx,ty,6,['240,240,245'],[16,26],{up:110});soundBlast(tx,ty,'210,190,160',130,320);t.hurt=.35;});
    await tween(170,k=>{for(const p of P)p.rot=-.4*(1-k);u.lean=-.18*(1-k);u.sq=1;});}
  await wait(300);hit(u,t,sk);cup.hide=false;cup.a=1;arm.blur=false;cup.blur=false;limbOff(u);u.lean=0;u.sq=1;}finally{rel();}};

// ---- Vázagólem – Mázpáncél: csak a pajzs, a váza mintájával (fehér máz, kék virágok, görög kulcs szegély, fekete kontúr), és ELTÖRVE: sötét hajszálrepedések. Nincs sárga háló
let R15_VW=null;function r15VaseShield(){if(R15_VW)return R15_VW;const W1=220,H1=320,c=document.createElement('canvas');c.width=W1;c.height=H1;const g=c.getContext('2d');
  const path=()=>{g.beginPath();g.moveTo(W1/2,8);g.bezierCurveTo(W1*.95,12,W1-6,64,W1-8,126);g.bezierCurveTo(W1-12,222,W1*.72,276,W1/2,H1-8);g.bezierCurveTo(W1*.28,276,12,222,8,126);g.bezierCurveTo(6,64,W1*.05,12,W1/2,8);g.closePath();};
  path();const q=g.createRadialGradient(W1*.36,H1*.3,8,W1/2,H1*.5,H1*.62);q.addColorStop(0,'#ffffff');q.addColorStop(.6,'#eef2fa');q.addColorStop(1,'#c4cee0');g.fillStyle=q;g.fill();
  g.save();path();g.clip();
  const band=(y,h)=>{g.fillStyle='#1d4fb3';g.fillRect(0,y,W1,h);g.strokeStyle='#ffffff';g.lineWidth=2.4;const s=h*.62;for(let x=-4;x<W1;x+=s*1.3){const y0=y+h*.19;g.beginPath();g.moveTo(x,y0+s);g.lineTo(x,y0);g.lineTo(x+s,y0);g.lineTo(x+s,y0+s*.72);g.lineTo(x+s*.3,y0+s*.72);g.lineTo(x+s*.3,y0+s*.3);g.lineTo(x+s*.68,y0+s*.3);g.stroke();}g.fillStyle='#163c8c';g.fillRect(0,y,W1,2);g.fillRect(0,y+h-2,W1,2);};
  band(28,26);band(H1-64,18);
  g.strokeStyle='#2a5cc8';g.lineCap='round';const vine=(x,y,r,dir)=>{g.lineWidth=4;g.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2.4*dir,rr=r*(1-i/48);const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();};
  vine(48,112,26,1);vine(178,204,24,-1);vine(56,236,20,-1);vine(172,98,18,1);g.lineWidth=5;g.beginPath();g.moveTo(26,152);g.bezierCurveTo(70,122,90,192,132,172);g.stroke();
  const flower=(x,y,R,n)=>{for(let i=0;i<n;i++){const a=i/n*6.283+.2;g.save();g.translate(x,y);g.rotate(a);const gg=g.createLinearGradient(0,0,R,0);gg.addColorStop(0,'#173f9a');gg.addColorStop(1,'#4c7fe0');g.fillStyle=gg;g.strokeStyle='#0f2c6e';g.lineWidth=1.4;
      g.beginPath();g.moveTo(R*.18,0);g.quadraticCurveTo(R*.55,-R*.32,R,0);g.quadraticCurveTo(R*.55,R*.32,R*.18,0);g.fill();g.stroke();g.strokeStyle='rgba(180,205,255,.8)';g.lineWidth=1;g.beginPath();g.moveTo(R*.3,0);g.lineTo(R*.82,0);g.stroke();g.restore();}
    g.fillStyle='#ffffff';g.beginPath();g.arc(x,y,R*.26,0,6.29);g.fill();g.strokeStyle='#1d4fb3';g.lineWidth=R*.08;g.stroke();g.fillStyle='#1d4fb3';g.beginPath();g.arc(x,y,R*.1,0,6.29);g.fill();};
  flower(W1/2,H1*.48,64,9);flower(50,188,30,7);flower(174,142,26,7);flower(150,252,22,6);flower(72,84,20,6);
  g.restore();path();g.lineWidth=6;g.strokeStyle='#14141c';g.stroke();
  // repedések a becsapódási pontból (mint a gólem arcán)
  const cx0=W1*.58,cy0=H1*.36,cracks=[];for(let i=0;i<7;i++){const a=i/7*6.283+rnd(-.2,.2);const pts=[[cx0,cy0]];let x=cx0,y=cy0,aa=a;for(let j=0;j<8;j++){aa+=rnd(-.45,.45);const L=rnd(18,32);x+=Math.cos(aa)*L;y+=Math.sin(aa)*L;pts.push([x,y]);}cracks.push(pts);}
  g.save();path();g.clip();g.lineJoin='round';for(const pl of cracks){g.strokeStyle='#1a1a22';g.lineWidth=2.8;g.beginPath();pl.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();
    g.strokeStyle='rgba(255,255,255,.75)';g.lineWidth=1;g.beginPath();pl.forEach(([x,y],i)=>i?g.lineTo(x+1.6,y+1.2):g.moveTo(x+1.6,y+1.2));g.stroke();
    for(let k=2;k<pl.length-1;k+=2){const [x,y]=pl[k];const a=rnd(0,6.28);g.strokeStyle='#1a1a22';g.lineWidth=1.6;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*14,y+Math.sin(a)*14);g.lineTo(x+Math.cos(a+.4)*24,y+Math.sin(a+.4)*24);g.stroke();}}
  g.fillStyle='#aab4c8';g.beginPath();g.moveTo(cx0-9,cy0-7);g.lineTo(cx0+10,cy0-10);g.lineTo(cx0+7,cy0+9);g.lineTo(cx0-8,cy0+7);g.closePath();g.fill();g.strokeStyle='#1a1a22';g.lineWidth=1.5;g.stroke();g.restore();
  // darabok a repedések mentén (az összeálláshoz)
  const ang=pl=>Math.atan2(pl[pl.length-1][1]-cy0,pl[pl.length-1][0]-cx0),ord=cracks.map((p,i)=>i).sort((a,b)=>ang(cracks[a])-ang(cracks[b])),pieces=[];
  for(let i=0;i<ord.length;i++){const A1=cracks[ord[i]],B1=cracks[ord[(i+1)%ord.length]];let a1=ang(A1),a2=ang(B1);if(a2<a1)a2+=6.283;const far=a=>[cx0+Math.cos(a)*600,cy0+Math.sin(a)*600];
    const poly=[...A1,far(a1)];for(let s=1;s<6;s++)poly.push(far(a1+(a2-a1)*s/6));poly.push(far(a2));poly.push(...B1.slice().reverse());pieces.push({poly,mid:(a1+a2)/2});}
  return R15_VW={c,W1,H1,pieces};}
drawVaseWall=function(e,a){const S0=r15VaseShield(),vw=e._vwall||{},k=vw.k==null?1:vw.k;a=Math.min(1,a/.6);const Hh=e.h*e.scale*1.45,sc=Hh/S0.H1,x=cx(e)-e.w*e.scale*.7,top=e.y+e.oy-Hh-4;
  ctx.save();ctx.globalAlpha=a;ctx.translate(x-S0.W1*sc/2,top);ctx.scale(sc,sc);
  if(k>=1)ctx.drawImage(S0.c,0,0);
  else S0.pieces.forEach((p,i)=>{const d=i/S0.pieces.length*.5,q=Math.max(0,Math.min(1,(k-d)/.5));if(q<=0)return;const e2=eOutBack(q),fx=Math.cos(p.mid)*260*(1-e2),fy=Math.sin(p.mid)*260*(1-e2)-80*(1-e2),rot=(1-e2)*(i%2?1.6:-1.6);
    ctx.save();ctx.translate(S0.W1*.58+fx,S0.H1*.36+fy);ctx.rotate(rot);ctx.translate(-S0.W1*.58,-S0.H1*.36);ctx.beginPath();p.poly.forEach((v,j)=>j?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();ctx.clip();ctx.drawImage(S0.c,0,0);ctx.restore();});
  if(k>=1){const sh=(T*.6)%2;if(sh<1){ctx.globalCompositeOperation='lighter';const sx=-80+sh*(S0.W1+160);const g=ctx.createLinearGradient(sx-40,0,sx+40,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.3)');g.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=g;ctx.fillRect(sx-40,0,80,S0.H1);}}
  ctx.restore();};
A.vaseWall=async(u,ts,sk)=>{const rel=keepPose(u);try{sfx('glass');await bodyWind(u,240,.12);bodyStrike(u,170,-.16);const W0={k:0};u._vwall=W0;
  const ck=setInterval(()=>sfx('glass'),120);await tween(1200,k=>{W0.k=k;});clearInterval(ck);W0.k=1;sfx('shield');shake(12);hitStop(90);
  const x=cx(u)-u.w*u.scale*.7,y=midY(u);for(let i=0;i<18;i++)part({x:x+rnd(-60,60),y:y+rnd(-120,100),vx:rnd(-160,160),vy:rnd(-200,40),g:600,life:rnd(.6,1),size:rnd(4,8),rgb:pick(['245,248,255','90,130,220']),add:false,shape:'rock'});
  soundBlast(x,y,'220,230,255',170,380);hit(u,u,sk);await bodySettle(u);}finally{rel();}};

// ---- Porcelán mandarin – Tusátok: a lúdtollal egy hatalmas TUSSÁRKÁNYT fest a levegőbe (vastag ecsetvonás, száraz ecsetszálak, csöpögő tus), ami életre kel, és sorban lecsap a hősökre
function r15InkBody(pts,w0,a){if(pts.length<2)return;ctx.save();ctx.globalAlpha=a;ctx.lineCap='round';ctx.lineJoin='round';const n=pts.length;
  ctx.strokeStyle='rgba(40,40,55,.22)';for(let i=1;i<n;i++){const f=1-i/n;ctx.lineWidth=w0*1.7*f+5;ctx.beginPath();ctx.moveTo(pts[i-1].x,pts[i-1].y);ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();}
  for(let i=1;i<n;i++){const f=1-i/n;ctx.strokeStyle='rgba(12,10,18,.96)';ctx.lineWidth=w0*f+3;ctx.beginPath();ctx.moveTo(pts[i-1].x,pts[i-1].y);ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();}
  for(let b=-3;b<=3;b++){ctx.strokeStyle=b%2?'rgba(70,68,84,.8)':'rgba(4,4,8,.85)';ctx.lineWidth=1.6;ctx.beginPath();let on=false;for(let i=1;i<n;i++){const f=1-i/n,p=pts[i],q=pts[i-1],an=Math.atan2(p.y-q.y,p.x-q.x)+Math.PI/2,off=b/3*(w0*f*.55+3);const x=p.x+Math.cos(an)*off,y=p.y+Math.sin(an)*off;if(((i*7+b*13)%11)===0||!on){ctx.moveTo(x,y);on=true;}else ctx.lineTo(x,y);}ctx.stroke();}
  ctx.fillStyle='rgba(8,8,12,.95)';for(let i=4;i<n-3;i+=4){const f=1-i/n,p=pts[i],q=pts[i-1],an=Math.atan2(p.y-q.y,p.x-q.x)-Math.PI/2,L=w0*f*.9+5;ctx.beginPath();ctx.moveTo(p.x+Math.cos(an+1.57)*4,p.y+Math.sin(an+1.57)*4);ctx.lineTo(p.x+Math.cos(an)*L,p.y+Math.sin(an)*L);ctx.lineTo(q.x+Math.cos(an-1.57)*4,q.y+Math.sin(an-1.57)*4);ctx.fill();}
  ctx.restore();}
function r15InkHead(x,y,ang,s,jaw,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);if(Math.cos(ang)<0)ctx.scale(1,-1);ctx.scale(s,s);
  ctx.fillStyle='rgba(10,8,16,.97)';ctx.beginPath();ctx.moveTo(-30,-18);ctx.quadraticCurveTo(0,-30,34,-14);ctx.quadraticCurveTo(52,-10,58,-4);ctx.lineTo(30,-2-jaw*4);ctx.lineTo(56,4+jaw*14);ctx.quadraticCurveTo(30,22+jaw*10,0,18);ctx.quadraticCurveTo(-24,16,-34,4);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(10,8,16,.97)';ctx.lineCap='round';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-14,-22);ctx.quadraticCurveTo(-34,-50,-62,-48);ctx.moveTo(-2,-24);ctx.quadraticCurveTo(-16,-58,-40,-66);ctx.stroke();
  ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(40,-8);ctx.bezierCurveTo(70,-30,96,-10,120,-34);ctx.moveTo(40,8);ctx.bezierCurveTo(74,24,92,6,122,28);ctx.stroke();
  ctx.lineWidth=4;for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(-20+i*4,-10+i*6);ctx.quadraticCurveTo(-50-i*6,-4+i*8,-72-i*4,12+i*10);ctx.stroke();}
  ctx.fillStyle='#f4f0e6';for(let i=0;i<4;i++){ctx.beginPath();ctx.moveTo(30+i*7,-2-jaw*4);ctx.lineTo(33+i*7,6);ctx.lineTo(36+i*7,-2-jaw*4);ctx.fill();}
  ctx.globalCompositeOperation='lighter';glow(8,-12,18,'255,40,40',.9);ctx.fillStyle='#ffd0c0';ctx.beginPath();ctx.ellipse(8,-12,5,3,0,0,6.29);ctx.fill();ctx.restore();}
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dark');
  const hand=()=>fp(u,.12,.52),F={ang:-2.2,a:0,on:true};const quill=()=>{const h=hand();return {x:h.x+Math.cos(F.ang)*110,y:h.y+Math.sin(F.ang)*110};};
  effects.push({update(){return F.on;},draw(){if(F.a<=0)return;const h=hand();qInkpot(h.x-40,h.y+40,F.a);qQuill(h.x+Math.cos(F.ang)*60,h.y+Math.sin(F.ang)*60,F.ang+Math.PI/2,F.a);}});
  await tween(250,k=>{F.a=k;u.lean=.1*easeIO(k);});await dimTo(.4,'30,25,20',250);
  const D={pts:[],hx:0,hy:0,ang:Math.PI,jaw:0,a:1,on:true,rec:false,s:1.8,wig:0,t:0,head:0,max:130};
  effects.push({update(dt){D.t+=dt;if(D.rec){const L=D.pts[0];if(!L||Math.hypot(L.x-D.hx,L.y-D.hy)>7){D.pts.unshift({x:D.hx,y:D.hy});if(D.pts.length>D.max)D.pts.pop();}
      if(Math.random()<.5)part({x:D.hx+rnd(-10,10),y:D.hy+rnd(-6,6),vx:rnd(-20,20),vy:rnd(30,90),g:500,life:.7,size:rnd(2,5),rgb:'12,10,18',add:false,shape:'drop'});}return D.on;},
    draw(){if(D.a<=0)return;const w=D.wig;const P=w?D.pts.map((p,i)=>({x:p.x,y:p.y+Math.sin(D.t*9-i*.35)*w*Math.min(1,i/8)})):D.pts;r15InkBody(P,44,D.a);if(D.head>0)r15InkHead(D.hx,D.hy,D.ang,D.s,D.jaw,D.a*D.head);}});
  // festés: a toll hegyéből húzódik a sárkány teste a levegőben
  const {mx}=grp(al),topY0=Math.min(...al.map(topY)),p0=quill(),c1={x:p0.x-80,y:50},c2={x:mx+300,y:30},p3={x:mx+60,y:Math.max(110,topY0-50)};
  const bez=(k,a,b,c,d)=>{const m=1-k;return m*m*m*a+3*m*m*k*b+3*m*k*k*c+k*k*k*d;};D.hx=p0.x;D.hy=p0.y;D.rec=true;
  const qi=setInterval(()=>sfx('whoosh'),380);
  await tween(1500,k=>{const e=easeIO(k),x=bez(e,p0.x,c1.x,c2.x,p3.x),y=bez(e,p0.y,c1.y,c2.y,p3.y);const an=Math.atan2(y-D.hy,x-D.hx);if(isFinite(an)&&(x!==D.hx||y!==D.hy))D.ang=an;D.hx=x;D.hy=y;F.ang=-2.2+Math.sin(k*18)*.6;
    if(Math.random()<.6){const q=quill();part({x:q.x,y:q.y,vx:(x-q.x)*1.4,vy:(y-q.y)*1.4,life:.6,size:rnd(2,4),rgb:'12,10,18',add:false,shape:'drop'});}});
  clearInterval(qi);
  // a fej kirajzolódik, a szeme felizzik: életre kel
  sfx('dark');await tween(300,k=>{D.head=k;D.s=1.8*(.6+.4*eOutBack(k));});sfx('growl');flash('20,10,20',.25,.15);D.wig=12;bodyStrike(u,200,-.14);await wait(200);
  for(const t of al){if(!t.alive)continue;const sx=D.hx,sy=D.hy,tx=cx(t),ty=midY(t);D.jaw=1;sfx('whoosh');
    await tween(320,k=>{const e=k*k,x=sx+(tx-sx)*e,y=sy+(ty-sy)*e-Math.sin(k*Math.PI)*70;D.ang=Math.atan2(y-D.hy,x-D.hx)||D.ang;D.hx=x;D.hy=y;});
    sfx('bite');shake(12);hitStop(70);D.jaw=0;splat(tx,ty,['12,10,18','30,28,40'],34,420,'drop');
    for(let i=0;i<8;i++){const a=rnd(0,6.28),r=rnd(10,40);part({x:tx+Math.cos(a)*r,y:t.y+t.oy-4,vx:0,vy:0,life:1.4,size:rnd(10,22),rgb:'12,10,18',add:false,shape:'dsmoke'});}
    soundBlast(tx,ty,'60,50,80',150,360);t.hurt=.35;hit(u,t,sk);
    const ex=tx-90,ey=ty-160;await tween(260,k=>{const e=easeIO(k),x=tx+(ex-tx)*e,y=ty+(ey-ty)*e;D.ang=Math.atan2(y-D.hy,x-D.hx)||D.ang;D.hx=x;D.hy=y;});}
  // szétfolyik: tusesővé csöpög szét
  sfx('dark');D.rec=false;await tween(600,k=>{D.a=1-k;for(let i=0;i<2;i++){const p=pick(D.pts);if(p)part({x:p.x,y:p.y,vx:rnd(-20,20),vy:rnd(40,140),g:600,life:.8,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});}});D.on=false;
  await tween(200,k=>{F.a=1-k;u.lean=.1*(1-k);});F.on=false;u.lean=0;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- Vattacukor-bárány – Édes álom: csillagos éjszaka, holdsarló, középen kerítés; részletes, rózsaszín vattacukor-bárányok ugranak át egymás után, nagy számlálással
function r15Sheep(x,y,s,ph,jump){ctx.save();ctx.translate(x,y);ctx.scale(s,s);
  ctx.strokeStyle='#3a2a3a';ctx.lineCap='round';ctx.lineWidth=5;for(const [lx,sw] of [[-14,1],[-6,1],[10,-1],[18,-1]]){const s2=jump?sw*.9:Math.sin(ph+lx)*.4;ctx.beginPath();ctx.moveTo(lx,6);ctx.lineTo(lx+s2*10,22);ctx.stroke();ctx.fillStyle='#2a1a2a';ctx.beginPath();ctx.arc(lx+s2*10,23,3,0,6.29);ctx.fill();}
  const pf=[[-20,-6,12],[-8,-14,13],[6,-14,13],[18,-6,12],[22,4,10],[-22,6,10],[-10,6,12],[6,6,12],[0,-4,14],[-14,-20,9],[12,-22,9],[26,-8,7]];
  for(const [px,py,r] of pf){const g=ctx.createRadialGradient(px-r*.35,py-r*.45,r*.15,px,py,r);g.addColorStop(0,'#fff2f9');g.addColorStop(.55,'#ffb8da');g.addColorStop(1,'#ec74ad');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r,0,6.29);ctx.fill();}
  ctx.fillStyle='#4a3448';ctx.beginPath();ctx.ellipse(-31,-6,9,11,-.3,0,6.29);ctx.fill();ctx.beginPath();ctx.ellipse(-36,-15,6,3,-.8,0,6.29);ctx.fill();ctx.beginPath();ctx.ellipse(-23,-16,6,3,.6,0,6.29);ctx.fill();
  ctx.fillStyle='#ffd0e6';ctx.beginPath();ctx.arc(-29,-17,6,0,6.29);ctx.arc(-24,-19,5,0,6.29);ctx.fill();
  ctx.strokeStyle='#fff';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(-34,-7,2.6,.2,2.9);ctx.stroke();ctx.fillStyle='#ff9cc8';ctx.beginPath();ctx.arc(-36,-1,2.2,0,6.29);ctx.fill();
  ctx.restore();}
A.sweetDream=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dust');await bodyWind(u,240,.08);
  const sc=sceneLayer(()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(40,20,80,.6)');g.addColorStop(1,'rgba(90,40,110,.35)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<70;i++){const x=(i*157)%W,y=(i*83)%260;ctx.fillStyle=`rgba(255,240,255,${.5+.5*Math.sin(T*3+i)})`;ctx.fillRect(x,y,2,2);}drawMoon(W*.82,86,44,1);});
  await sc.show(400);bodyStrike(u,180,-.1);
  const mx=W*.5,gy=Math.max(...al.map(t=>t.y+t.oy))+10,F={a:0};effects.push({update(){return !F.done;},draw(){if(F.a>0)drawFence(mx,gy,170,F.a);}});await tween(300,k=>{F.a=k;});
  const N=4,sheep=[];for(let i=0;i<N;i++)sheep.push({d:i*.55,k:0,ph:rnd(0,6),c:0});const st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;for(const s of sheep){s.k=Math.max(0,Math.min(1,(st.t-s.d)/1.3));s.ph+=dt*12;}return st.on;},
    draw(){for(const s of sheep){if(s.k<=0||s.k>=1)continue;const x=mx+380-760*s.k,jq=Math.min(1,Math.max(0,(s.k-.32)/.36)),jump=jq>0&&jq<1,y=gy-Math.sin(jq*Math.PI)*210;
      ctx.save();ctx.globalAlpha=.25;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(x,gy+2,48*(1-.4*Math.sin(jq*Math.PI)),8,0,0,6.29);ctx.fill();ctx.restore();
      if(Math.random()<.16)part({x:x+rnd(-50,50),y:y-rnd(0,60),vx:rnd(-30,30),vy:-rnd(5,30),life:rnd(.5,.8),size:rnd(10,18),grow:12,rgb:pick(['255,200,230','255,230,245','240,200,255']),add:false,shape:'puff'});
      ctx.save();ctx.translate(x,y-16);ctx.rotate(jump?-.4*Math.cos(jq*Math.PI):Math.sin(s.ph)*.04);r15Sheep(0,0,2.1,s.ph,jump);ctx.restore();
      if(s.k>.5&&!s.c){s.c=1;sfx('boing');const n=sheep.indexOf(s)+1;effects.push({t:0,update(dt){this.t+=dt;return this.t<1.1;},draw(){const k=this.t/1.1;ctx.save();ctx.globalAlpha=1-k*k;txt(String(n),mx,gy-262-k*40,48+12*Math.sin(Math.min(1,k*4)*Math.PI),'#ffd6ef','#4a1a4a');ctx.restore();}});}}}});
  await wait((N-1)*550+1350);st.on=false;
  const t=al[0];sfx('dust');await flyObj({x:mx,y:gy-200},{x:cx(t),y:topY(t)},520,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'255,180,230',.7);ctx.restore();part({x:x+rnd(-14,14),y:y+rnd(-14,14),vx:rnd(-30,30),vy:rnd(-30,30),life:.6,size:rnd(2,4),rgb:pick(['255,220,245','255,255,255']),shape:'star'});},{arc:80});
  hit(u,t,sk);for(let i=0;i<3;i++)setTimeout(()=>popLabel(t,'Zzz','#ffd6ef'),i*260);
  await wait(500);F.done=true;await sc.hide(400);await bodySettle(u);}finally{rel();}};

// ---- Álomlepke – Holdsugár: telihold kel fel, a lepke felrepül és szárnyaival összegyűjti a holdfényt, és a SAJÁT testéből lövi a sugarat; az égből holdfény-oszlop és sarló alakú szilánkok
function r15FullMoon(x,y,R,a){ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x,y,R*2.6,'190,210,255',.35);glow(x,y,R*1.5,'230,240,255',.5);ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(x-R*.3,y-R*.3,R*.1,x,y,R);g.addColorStop(0,'#ffffff');g.addColorStop(.7,'#e6ecfa');g.addColorStop(1,'#b8c4e0');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,R,0,6.29);ctx.fill();
  ctx.fillStyle='rgba(150,165,200,.45)';for(const [a1,b1,r1] of [[-.3,-.2,.18],[.25,.1,.22],[-.1,.35,.12],[.35,-.35,.1],[-.45,.2,.09]]){ctx.beginPath();ctx.arc(x+a1*R,y+b1*R,r1*R,0,6.29);ctx.fill();}ctx.restore();}
A.moonBeam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{sfx('mirror');await dimTo(.7,'5,8,30',300);
  const x=cx(t),gy=t.y+t.oy,M={a:0,x:Math.min(W-90,cx(u)+40),y:-60,R:70};
  effects.push({update(){return !M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;for(let i=0;i<70;i++){const sx=(i*137)%W,sy=(i*71)%320;ctx.fillStyle=`rgba(255,255,255,${.6*(.5+.5*Math.sin(T*4+i))})`;ctx.fillRect(sx,sy,2,2);}ctx.restore();r15FullMoon(M.x,M.y,M.R,M.a);}});
  await tween(600,k=>{M.a=k;M.y=-60+150*easeIO(k);});
  const y0=u.jump||0,G={on:true,k:0},body=()=>fp(u,.5,.42);sfx('holy');
  effects.push({update(){if(G.on)for(let i=0;i<3;i++){const q=body();part({x:M.x+rnd(-M.R*.6,M.R*.6),y:M.y+rnd(-M.R*.6,M.R*.6),vx:(q.x-M.x)*1.6,vy:(q.y-M.y)*1.6,life:.6,size:rnd(2,4),rgb:pick(['220,230,255','255,255,255']),shape:'star'});}return G.on;},
    draw(){const q=body();ctx.save();ctx.globalCompositeOperation='lighter';glow(q.x,q.y,50+80*G.k,'210,225,255',.6*G.k);glow(q.x,q.y,20+30*G.k,'255,255,255',.8*G.k);ctx.restore();}});
  await tween(800,k=>{u.jump=y0+70*easeIO(k);u.sq=1+.06*Math.sin(k*Math.PI*6);G.k=k;});
  const B={k:0,on:true,w:1},src=()=>fp(u,.42,.45);
  effects.push({update(){return B.on;},draw(){if(B.k<=0)return;const s=src(),ex=s.x+(x-s.x)*B.k,ey=s.y+(midY(t)-s.y)*B.k,an=Math.atan2(ey-s.y,ex-s.x),L=Math.hypot(ex-s.x,ey-s.y);
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(s.x,s.y);ctx.rotate(an);
      for(const [wd,a2] of [[70,.18],[42,.35],[22,.6],[9,.95]]){const w=wd*B.w,g=ctx.createLinearGradient(0,-w,0,w);g.addColorStop(0,'rgba(170,190,255,0)');g.addColorStop(.5,`rgba(235,240,255,${a2})`);g.addColorStop(1,'rgba(170,190,255,0)');ctx.fillStyle=g;ctx.fillRect(0,-w,L,w*2);}
      ctx.fillStyle='rgba(255,255,255,.55)';for(let i=0;i<9;i++){const p=(T*900+i*137)%Math.max(1,L);ctx.fillRect(p,(i%3-1)*12*B.w,60,2);}ctx.restore();
      ctx.save();ctx.globalCompositeOperation='lighter';glow(ex,ey,90*B.w,'220,230,255',.7);ctx.restore();}});
  bodyStrike(u,160,-.1);sfx('holy');await tween(260,k=>{B.k=easeIO(k);});
  const P={a:0};effects.push({update(){return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-90,0,x+90,0);g.addColorStop(0,'rgba(180,200,255,0)');g.addColorStop(.5,`rgba(235,240,255,${.55*P.a})`);g.addColorStop(1,'rgba(180,200,255,0)');ctx.fillStyle=g;ctx.fillRect(x-90,0,180,gy);ctx.translate(x,gy);ctx.scale(1,.25);glow(0,0,170,'230,235,255',.8*P.a);ctx.restore();}});
  await tween(200,k=>{P.a=k;});shake(16);hitStop(100);flash('230,240,255',.5,.16);sfx('boom');
  for(let i=0;i<16;i++){const a=rnd(0,6.28),v=rnd(200,480);effects.push({x,y:midY(t),vx:Math.cos(a)*v,vy:Math.sin(a)*v,r:rnd(0,6.28),t:0,update(dt){this.t+=dt;this.x+=this.vx*dt;this.y+=this.vy*dt;this.vx*=.95;this.vy*=.95;this.r+=dt*8;return this.t<.8;},
    draw(){const k=this.t/.8;ctx.save();ctx.globalAlpha=1-k;ctx.translate(this.x,this.y);ctx.rotate(this.r);ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(235,240,255,.95)';ctx.beginPath();ctx.arc(0,0,13,Math.PI*.3,Math.PI*1.7);ctx.arc(5,0,9.5,Math.PI*1.6,Math.PI*.4,true);ctx.closePath();ctx.fill();ctx.restore();}});}
  soundBlast(x,midY(t),'210,225,255',280,520);sparks(x,midY(t),['220,230,255','255,255,255'],50,560);t.hurt=.4;hit(u,t,sk);
  await wait(350);await tween(300,k=>{B.k=1-k;P.a=1-k;});B.on=false;P.done=true;G.on=false;
  await tween(400,k=>{u.jump=y0+70*(1-easeIO(k));M.a=1-k;});u.jump=y0;u.sq=1;M.done=true;await dimTo(0,null,300);}finally{rel();}};

// ---- Kamilla – Teaszertartás: hatalmas porcelán teáscsésze (aranyperem, kamillaminta) jelenik meg, kiborul; a sugárból valódi, átlátszó, habos tetejű TEA-HULLÁM lesz, ami átgördül a hősökön
function r15TeaCup(x,y,s,rot,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  ctx.strokeStyle='#f2efe8';ctx.lineWidth=12;ctx.beginPath();ctx.arc(70,-20,24,-1.2,1.3);ctx.stroke();ctx.strokeStyle='#c9a24a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(70,-20,30,-1.1,1.2);ctx.stroke();
  const g=ctx.createLinearGradient(-70,0,70,0);g.addColorStop(0,'#d8d6e0');g.addColorStop(.35,'#ffffff');g.addColorStop(1,'#cfcbd6');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-74,-60);ctx.bezierCurveTo(-74,20,-46,52,0,52);ctx.bezierCurveTo(46,52,74,20,74,-60);ctx.closePath();ctx.fill();ctx.strokeStyle='#8a8494';ctx.lineWidth=2;ctx.stroke();
  const fl=(fx,fy,r)=>{ctx.fillStyle='#ffffff';ctx.strokeStyle='#b8b0a0';ctx.lineWidth=1;for(let i=0;i<10;i++){const an=i/10*6.283;ctx.beginPath();ctx.ellipse(fx+Math.cos(an)*r*.7,fy+Math.sin(an)*r*.7,r*.45,r*.18,an,0,6.29);ctx.fill();ctx.stroke();}ctx.fillStyle='#f2c230';ctx.beginPath();ctx.arc(fx,fy,r*.35,0,6.29);ctx.fill();};
  ctx.strokeStyle='#7aa860';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-30,4);ctx.quadraticCurveTo(-10,30,18,16);ctx.moveTo(-30,-10);ctx.quadraticCurveTo(-48,-20,-52,-38);ctx.stroke();
  fl(-30,-10,14);fl(18,4,11);fl(46,-30,9);fl(-52,-38,8);
  ctx.fillStyle='#c98a2a';ctx.beginPath();ctx.ellipse(0,-60,74,14,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(255,210,140,.6)';ctx.beginPath();ctx.ellipse(-12,-62,40,5,0,0,6.29);ctx.fill();
  ctx.strokeStyle='#d8b450';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,-60,74,14,0,0,6.29);ctx.stroke();ctx.strokeStyle='#fff3c0';ctx.lineWidth=1.5;ctx.stroke();
  ctx.strokeStyle='#d8b450';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-60,30);ctx.bezierCurveTo(-30,52,30,52,60,30);ctx.stroke();ctx.restore();}
function r15TeaWave(x0,gy,Hw,len,t,a){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x0,gy);
  // a hát: a taréjtól hátrafelé ívesen ellaposodik, a végén alacsony hullámzásba fut ki
  const back=[];for(let i=0;i<=16;i++){const q=i/16,h=Hw*(.06+.94*Math.pow(1-q,1.7));back.push([40+(len-40)*q,-h+Math.sin(t*5+q*10)*6*q]);}
  const L=Math.sin(t*9)*5;ctx.beginPath();ctx.moveTo(len+90,26);for(let i=16;i>=0;i--)ctx.lineTo(back[i][0],back[i][1]);
  ctx.bezierCurveTo(20,-Hw*1.1,-30+L,-Hw*1.08,-58+L,-Hw*.8);ctx.bezierCurveTo(-74+L,-Hw*.6,-50,-Hw*.42,-30,-Hw*.56);ctx.bezierCurveTo(-36,-Hw*.36,-22,-Hw*.14,-56,26);ctx.closePath();
  const g=ctx.createLinearGradient(0,-Hw,0,26);g.addColorStop(0,'rgba(246,190,96,.9)');g.addColorStop(.5,'rgba(206,120,36,.9)');g.addColorStop(1,'rgba(128,62,14,.95)');ctx.fillStyle=g;ctx.fill();
  ctx.save();ctx.clip();const fg=ctx.createLinearGradient(len*.5,0,len+30,0);fg.addColorStop(0,'rgba(0,0,0,0)');fg.addColorStop(1,'rgba(90,40,8,.35)');ctx.fillStyle=fg;ctx.fillRect(-80,-Hw*1.2,len+120,Hw*1.3+30);
    ctx.globalCompositeOperation='lighter';for(let i=0;i<8;i++){const y=-Hw*.9+i*Hw*.13;ctx.strokeStyle=`rgba(255,220,150,${.24-.025*i})`;ctx.lineWidth=7-i*.7;ctx.beginPath();ctx.moveTo(-60,y);ctx.bezierCurveTo(len*.25,y-14+Math.sin(t*4+i)*7,len*.55,y+14,len+30,y+Hw*.5);ctx.stroke();}
    // a göndör taréj belsejében sötétebb árnyék
    ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(90,40,8,.35)';ctx.beginPath();ctx.ellipse(-34,-Hw*.62,22,Hw*.12,-.5,0,6.29);ctx.fill();ctx.restore();
  ctx.strokeStyle='rgba(100,45,10,.8)';ctx.lineWidth=3;ctx.stroke();
  // hab: sűrűn a taréjon és a lebukó ajkon
  ctx.fillStyle='rgba(255,248,232,.97)';for(let i=0;i<6;i++){const [x,y]=back[i];ctx.beginPath();ctx.arc(x+Math.sin(t*6+i)*2,y-3,12-i*1.4,0,6.29);ctx.fill();}
  for(let i=0;i<9;i++){const q=i/8,x=34-92*q+L*q,y=-Hw*(1.06-.28*q*q);ctx.beginPath();ctx.arc(x,y,13-5*q+Math.sin(t*8+i)*2,0,6.29);ctx.fill();}
  // úszó kamillavirágok a háton
  for(let i=0;i<4;i++){const [x,y]=back[Math.min(16,Math.round((i+.6)/4*16))];ctx.save();ctx.translate(x,y+8);ctx.fillStyle='#fff';for(let j=0;j<8;j++){const an=j/8*6.283+t;ctx.beginPath();ctx.ellipse(Math.cos(an)*6,Math.sin(an)*3,5,2,an,0,6.29);ctx.fill();}ctx.fillStyle='#f2c230';ctx.beginPath();ctx.arc(0,0,3,0,6.29);ctx.fill();ctx.restore();}
  ctx.restore();}
A.teaCeremony=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{await dimTo(.35,'40,25,10',250);await bodyWind(u,260,.1);sfx('holy');
  const gy=Math.max(...al.map(t=>t.y+t.oy))+6,minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),bx=cx(u)-210,C={x:bx,y:130,s:0,rot:0,a:0};
  effects.push({update(){return !C.done;},draw(){if(C.a>0)r15TeaCup(C.x,C.y,C.s,C.rot,C.a);}});
  for(let i=0;i<24;i++)part({x:C.x+rnd(-90,90),y:C.y+rnd(-60,40),vx:rnd(-30,30),vy:rnd(-30,30),life:.6,size:rnd(2,4),rgb:pick(['255,240,190','255,255,255']),shape:'star'});
  await tween(450,k=>{C.a=k;C.s=1.25*eOutBack(k);});bodyStrike(u,180,-.12);sfx('whoosh');
  await tween(500,k=>{C.rot=-1.25*easeIO(k);C.x=bx-40*k;});
  const lip=()=>{const c=Math.cos(C.rot),s=Math.sin(C.rot),lx=-74*C.s,ly=-60*C.s;return {x:C.x+lx*c-ly*s,y:C.y+lx*s+ly*c};},Sg={on:true,k:0},land={x:lip().x-60,y:gy};
  effects.push({update(){if(Sg.on&&Sg.k>.8){part({x:land.x+rnd(-30,30),y:land.y-rnd(0,10),vx:rnd(-160,160),vy:-rnd(120,320),g:900,life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['230,160,60','255,220,150']),add:false,shape:'drop'});if(Math.random()<.5)part({x:land.x+rnd(-40,40),y:land.y-rnd(10,40),vx:rnd(-20,20),vy:-rnd(30,70),life:rnd(.8,1.2),size:rnd(16,28),grow:30,rgb:'245,240,235',add:false,shape:'smoke'});}return Sg.on||Sg.k>0;},
    draw(){if(Sg.k<=0)return;const p=lip(),ey=p.y+(land.y-p.y)*Math.min(1,Sg.k);ctx.save();ctx.lineCap='round';const g=ctx.createLinearGradient(p.x,p.y,land.x,ey);g.addColorStop(0,'rgba(240,175,70,.95)');g.addColorStop(1,'rgba(170,90,20,.95)');ctx.strokeStyle=g;ctx.lineWidth=34*C.s*Math.min(1,Sg.k);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(p.x-30,p.y+60,land.x+Math.sin(T*20)*3,ey);ctx.stroke();
      ctx.strokeStyle='rgba(255,235,190,.6)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(p.x-6,p.y+6);ctx.quadraticCurveTo(p.x-36,p.y+60,land.x-8,ey);ctx.stroke();ctx.restore();}});
  sfx('water');await tween(300,k=>{Sg.k=k;});
  const Wv={x:land.x+40,Hw:40,len:140,a:1,t:0,on:true},done=new Set();effects.push({update(dt){Wv.t+=dt;return Wv.on;},draw(){r15TeaWave(Wv.x,gy,Wv.Hw,Wv.len,Wv.t,Wv.a);}});
  const bz=setInterval(()=>sfx('water'),300);
  await tween(1500,k=>{Wv.x=land.x+40-(land.x+40-(minX-260))*easeIO(k);Wv.Hw=40+210*Math.min(1,k*2.4);Wv.len=140+260*Math.min(1,k*2);if(k>.35){Sg.on=false;Sg.k=Math.max(0,1-(k-.35)*4);}
    if(Math.random()<.8)part({x:Wv.x-30+rnd(-20,20),y:gy-Wv.Hw*.8+rnd(-20,20),vx:rnd(-260,-60),vy:rnd(-200,-40),g:700,life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['255,240,210','236,170,70']),add:false,shape:'drop'});
    for(const t of al)if(!done.has(t)&&Wv.x<cx(t)+10){done.add(t);shake(12);hitStop(60);toss(t,50,420);t.hurt=.4;soundBlast(cx(t),midY(t),'236,170,70',160,380);hit(u,t,sk);}});
  clearInterval(bz);Sg.k=0;for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  await tween(400,k=>{Wv.a=1-k;});Wv.on=false;await tween(400,k=>{C.rot=-1.25*(1-k);C.a=1-k;});C.done=true;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- Morgána – Átok: Hádész kicsit gyorsabban emelkedik és idéz; a szürke lánc nincs, csak a halálfej
A.hex=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;await dimTo(.65,'20,0,30',250);u.pose='cast';await bodyWind(u,220,.08);sfx('dark');
  const px=cx(t)+60,py=t.y+t.oy+10,P={a:0,t:0};
  effects.unshift({update(dt){P.t+=dt;return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.translate(px,py);ctx.scale(1,.3);ctx.globalCompositeOperation='lighter';glow(0,0,190*P.a,'150,60,240',.55*P.a);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<3;i++){ctx.rotate(P.t*(1.5+i));ctx.fillStyle=`rgba(${20+i*20},0,${40+i*30},${.6*P.a})`;ctx.beginPath();ctx.ellipse(0,0,(140-i*35)*P.a,(120-i*30)*P.a,0,0,6.29);ctx.fill();}
    ctx.fillStyle=`rgba(5,0,10,${.95*P.a})`;ctx.beginPath();ctx.arc(0,0,70*P.a,0,6.29);ctx.fill();ctx.restore();}});
  await tween(300,k=>{P.a=k;});rumble(.8,4);
  const h=handPos(u);u.pose='attack';bodyStrike(u,160,.14);await Promise.all([0,1,2,3,4,5].map(i=>wait(i*80).then(()=>flyObj({x:h.x,y:h.y},{x:px+rnd(-30,30),y:py-6},380,(x,y,r,k)=>qBone(x,y,r,1.3*(1-k*.4)),{spin:rnd(8,14),arc:rnd(90,150)})).then(()=>{sfx('click');for(let j=0;j<5;j++)part({x:px+rnd(-20,20),y:py-6,vx:rnd(-40,40),vy:-rnd(60,140),life:.6,size:rnd(3,6),rgb:pick(['170,90,255','90,40,150'])});})));
  sfx('dark');flash('120,40,200',.3,.15);rumble(1.2,7);
  const Hd=Math.max(300,bigOf(t)*1.9),g=godShow('hades',px,py,Hd,99,'170,90,255'),yEnd=midY(t)-50;g.y=py+Hd*.2;
  for(let i=0;i<30;i++)part({x:px+rnd(-90,90),y:py-rnd(0,30),vx:rnd(-20,20),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(14,26),grow:30,rgb:pick(['40,15,60','70,30,100']),add:false,shape:'dsmoke'});
  await tween(1150,k=>{g.y=py+Hd*.2-(py+Hd*.2-yEnd)*easeIO(k);});await wait(350);
  const hx=px-Hd*.18,hy=yEnd-Hd*.25,x=cx(t),y=midY(t),big=Math.max(210,t.h*t.scale*1.7);sfx('dark');
  effects.push({t:0,update(dt){this.t+=dt;if(this.t<.4)part({x:hx+rnd(-20,20),y:hy+rnd(-20,20),vx:rnd(-40,40),vy:rnd(-40,40),life:.4,size:rnd(3,6),rgb:'190,110,255',shape:'star'});return this.t<.6;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(hx,hy,80*(1-this.t/.6),'190,110,255',.8);ctx.restore();}});
  await wait(250);
  if(FX_IMG.curse){const im=FX_IMG.curse;await flyObj({x:hx,y:hy},{x,y},520,(xx,yy,r,k)=>{ctx.save();ctx.globalAlpha=Math.min(1,k*3);const s=big*(.5+.5*k);ctx.drawImage(im,xx-s/2,yy-s/2,s,s);ctx.restore();},{arc:40,trail:['170,90,255','90,30,150']});}
  else rune(t,'190,90,255');
  flash('200,120,255',.35,.2);hitStop(70);shake(10);punch(x,y,.04);hit(u,t,sk);
  for(let i=0;i<26;i++){const a=rnd(0,Math.PI*2),v=rnd(150,420);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.35,.7),size:rnd(2,5),rgb:pick(['190,90,255','90,30,150']),drag:3,shape:pick(['star','dot'])});}
  await wait(450);await tween(700,k=>{g.y=yEnd+(py+Hd*.3-yEnd)*easeIO(k);});g.dead=true;P.done=true;await tween(300,k=>{P.a=1-k;});P.a=0;await bodySettle(u);u.pose='idle';await dimTo(0,null,300);};
NOFX.add('hex');

// ---- Fekete-lila lángok: valódi lángtextúrából (a tűz fényessége szerint: a mag lila, a széle fekete) – Cerberus, Sötét alku
const R15_DF=[];function r15DarkTex(i){if(R15_DF[i])return R15_DF[i];const im=TXP.fx[i];if(!im)return null;const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.drawImage(im,0,0,128,128);
  try{const d=g.getImageData(0,0,128,128),p=d.data;for(let j=0;j<p.length;j+=4){const L=(p[j]*.5+p[j+1]*.35+p[j+2]*.15)/255,k=Math.min(1,Math.max(0,(L-.22)/.78));p[j]=Math.round(16+175*k*k);p[j+1]=Math.round(85*k*k*k);p[j+2]=Math.round(30+225*k);}g.putImageData(d,0,0);}catch(e){}
  return R15_DF[i]=c;}
{const df0=darkFlame;darkFlame=function(o){const L=TXP.fx.length;if(!L)return df0(o);const f={x:o.x,y:o.y,vx:o.vx||0,vy:o.vy||-80,t:0,life:(o.life||.6)*1.1,s:o.size||20,i:Math.floor(Math.random()*L),r:rnd(-.25,.25),fl:Math.random()<.5};
  effects.push({update(dt){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=.96;f.vy-=50*dt;return f.t<f.life;},draw(){const tex=r15DarkTex(f.i);if(!tex)return;const k=f.t/f.life,sz=f.s*2.8*(.6+.7*k),a=k<.12?k/.12:Math.max(0,1-(k-.12)/.88);
    ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.r+Math.sin(T*10+f.i)*.08);if(f.fl)ctx.scale(-1,1);ctx.globalAlpha=Math.min(1,a*1.2);ctx.drawImage(tex,-sz/2,-sz*.7,sz,sz);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=a*.35;ctx.drawImage(tex,-sz/2,-sz*.7,sz,sz);ctx.restore();}});};}
// Sötét alku után, amíg Morgána megszállott: fekete-lila lángnyelvek lobognak körülötte
{const deP=drawEntity;drawEntity=function(e){const r=deP.apply(this,arguments);if(e&&e.possessed&&e.alive&&!FRONT_DRAW&&Math.random()<.32){const hh=e.h*e.scale;darkFlame({x:cx(e)+rnd(-hh*.22,hh*.22),y:e.y+e.oy-rnd(0,hh*.55),vx:rnd(-12,12),vy:-rnd(50,110),life:rnd(.45,.75),size:rnd(10,18)});}return r;};}

// ---- Grog – Földrepesztés: föld (nem láva). Előbb a kicsi: a repedés mentén apró kövek pattannak fel, UTÁNA a nagy kitörés
if(SK.earthsplit)SK.earthsplit.elem='earth';
A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const {gy}=grp(al);
  await tween(300,k=>{u.jump=Math.sin(k*Math.PI)*80;u.lean=-.1*Math.sin(k*Math.PI);});u.jump=0;u.lean=0;
  sfx('rock');shake(12);hitStop(70);const x0=cx(u)+40,x1=Math.max(...al.map(cx))+60;groundCrack((x0+x1)/2,gy+6,'120,90,60',x1-x0);dustWave(x0,u.y+u.oy);
  for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){await wait(120);sfx('rock');for(let i=0;i<10;i++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy+rnd(-4,6),vx:rnd(-90,90),vy:rnd(-360,-160),g:900,life:rnd(.5,.8),size:rnd(4,8),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});puffs(cx(t),t.y+t.oy-4,2,['170,150,120'],[12,18],{w:24,up:40});toss(t,14,220);t.hurt=.25;shake(5);}
  await wait(380);flash('255,230,180',.35,.18);hitStop(110);sfx('boom');r13Quake(u,al,true);for(const t of al){toss(t,80,560);t.hurt=.5;hit(u,t,sk);}
  await wait(1100);u.pose='idle';};

// ---- Grog – Titáncsapás: óriásira nő, leguggol, HATALMASAT ugrik (kirepül a képből), az árnyéka nő, és a fejszéjével zuhan le az ellenségekre
A.titanAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const {mx,gy}=grp(al),s0=u.scale0||u.scale,big=s0*2.1;await dimTo(.66,'24,14,6',240);u.pose='cast';rumble(1.2,6);
  flash('255,200,120',.3,.25);for(let i=0;i<36;i++){const a=rnd(0,Math.PI*2),r=rnd(110,220),life=rnd(.4,.6);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r,vx:-Math.cos(a)*r/life,vy:-Math.sin(a)*r/life,life,size:rnd(3,6),rgb:pick(['255,200,120','150,140,130']),shape:'streak'});}
  await tween(750,k=>{u.scale=s0+(big-s0)*(1-Math.pow(1-k,3));});shake(10);await wait(150);
  const front=Math.min(...al.map(t=>t.x-t.w*t.scale*.5)),dx=front-u.x-u.w*big*.42-30,dy=gy-u.y;u.pose='attack';
  await tween(260,k=>{u.sq=1-.16*easeIO(k);u.lean=.1*k;});
  sfx('whoosh');ghosts(u,500);puffs(cx(u),u.y+u.oy,10,['190,170,140','150,130,110'],[24,40],{w:120,up:60});shake(8);const Sh={a:0,on:true};
  effects.push({update(){return Sh.on;},draw(){if(Sh.a<=0)return;ctx.save();ctx.globalAlpha=.45*Sh.a;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(u.x+dx+u.w*big*.1,gy+4,150*Sh.a+30,26*Sh.a+6,0,0,6.29);ctx.fill();ctx.restore();}});
  await tween(420,k=>{const e=easeIO(k);u.ox=dx*e*.6;u.oy=dy*e;u.jump=720*Math.sin(k*Math.PI/2);u.sq=1.12;u.lean=.25*k;});
  await tween(380,k=>{Sh.a=k;u.ox=dx*(.6+.4*k);});rumble(.6,3);
  sfx('whoosh');await tween(230,k=>{const e=k*k;u.jump=720*(1-e);u.lean=.25-.75*e;u.sq=1.12-.12*k;});u.jump=0;Sh.on=false;
  flash('255,255,255',.85,.4);hitStop(200);rumble(2.2,28);punch(mx,gy-60,.1);sfx('rock');sfx('boom');
  const hitX=front+20;groundCrack(hitX,gy,'255,200,140',420);dustWave(hitX,gy);soundBlast(hitX,gy-30,'255,220,160',520,700);soundBlast(hitX,gy-30,'255,255,255',300,420);
  sparks(hitX,gy,['150,140,130','255,220,160','110,100,95'],90,900);r13Quake(u,al,true);puffs(hitX,gy-10,16,['190,170,140','150,130,110'],[30,60],{w:260,up:160});
  for(const t of al){toss(t,110,620);t.hurt=.6;hit(u,t,sk);}
  await wait(600);await tween(260,k=>{u.lean=-.5*(1-easeIO(k));u.sq=.92+.08*k;});u.lean=0;u.sq=1;ghosts(u,300);await tween(340,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);});u.ox=0;u.oy=0;
  await tween(420,k=>{u.scale=big+(s0-big)*k;});u.scale=s0;u.pose='idle';await wait(300);await dimTo(0,null,300);};

// ---- Tűzlehelet (Espresszó idézés ÉS az ellenséges Espresszó): a szájból folyamatos, lobogó lángcsóva indul (fehér mag, sárga, narancs, vörös szél), a lángtextúrák ebben repülnek
{const fb0=fireBreath;fireBreath=function(o,ts,dir,o2={}){if(!o2.smoke){const dur=o2.dur||1100,st={t:0},al=ts.filter(t=>t.alive);
    const T0=al.length?{x:al.reduce((s,t)=>s+cx(t),0)/al.length,y:al.reduce((s,t)=>s+midY(t),0)/al.length}:{x:o.x+dir*500,y:o.y};
    effects.push({update(dt){st.t+=dt;return st.t*1000<dur+220;},draw(){const tm=st.t*1000,grow=Math.min(1,tm/220),fade=tm>dur?Math.max(0,1-(tm-dur)/220):1;if(fade<=0)return;const L=Math.hypot(T0.x-o.x,T0.y-o.y)*1.12*grow,an=Math.atan2(T0.y-o.y,T0.x-o.x);
      ctx.save();ctx.translate(o.x,o.y);ctx.rotate(an);ctx.globalCompositeOperation='lighter';
      for(const [wf,col,a0] of [[1,'255,70,15',.3],[.68,'255,140,35',.42],[.4,'255,210,110',.55],[.17,'255,255,225',.8]]){const n=16;ctx.beginPath();ctx.moveTo(0,-5*wf);
        for(let i=1;i<=n;i++){const q=i/n,w=(10+q*120)*wf+Math.sin(T*26+q*11+wf*5)*9*wf*q;ctx.lineTo(L*q,-w);}for(let i=n;i>=1;i--){const q=i/n,w=(10+q*120)*wf+Math.sin(T*23+q*9+wf*3)*9*wf*q;ctx.lineTo(L*q,w);}ctx.closePath();
        const g=ctx.createLinearGradient(0,0,L,0);g.addColorStop(0,`rgba(${col},${a0*fade})`);g.addColorStop(.75,`rgba(${col},${a0*.8*fade})`);g.addColorStop(1,`rgba(${col},0)`);ctx.fillStyle=g;ctx.fill();}
      ctx.restore();}});}
  return fb0.apply(this,arguments);};}

// ---- Koffein-gólem idézés: erősítés. A két kezében tartott bögréből gőz száll, koccint (egész testtel ugrik), és kávészemek + kávéillat-szalagok repülnek minden hőshöz; a hősök koffeintől megremegnek. Nincs tűz
{const kg=SUMMONS.find(x=>x.id==='koffgolem');if(kg){kg.run=async(P,S0)=>{const im=kg.img&&kg.img(),hs=S.heroes.filter(h=>h.alive);if(!hs.length)return;
  const mug=(fu,fv)=>im?sumPt(kg,S0,im,fu,fv):{x:S0.x,y:S0.y-200},y0=S0.y,s0=S0.s||1,MUGS=[[.1,.5],[.86,.52]],St={on:true};
  effects.push({update(){if(St.on)for(const [fu,fv] of MUGS){const m=mug(fu,fv);if(Math.random()<.6)part({x:m.x+rnd(-12,12),y:m.y-10,vx:rnd(-15,15),vy:-rnd(40,90),life:rnd(.8,1.3),size:rnd(14,24),grow:28,rgb:'245,240,232',add:false,shape:'smoke'});}return St.on;},draw(){}});
  sfx('buff');await tween(420,k=>{S0.s=s0*(1+.05*Math.sin(k*Math.PI));S0.y=y0-36*Math.sin(k*Math.PI);});rumble(.8,6);sfx('rock');sfx('glass');
  const fl=[];for(const h of hs){for(const [fu,fv] of MUGS){const m=mug(fu,fv);fl.push(flyObj({x:m.x,y:m.y-14},{x:cx(h),y:midY(h)},560,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26,'255,190,90',.6);ctx.restore();
      if(Math.random()<.9)part({x:x+rnd(-6,6),y:y+rnd(-6,6),vx:rnd(-30,30),vy:rnd(-30,30),life:.5,size:rnd(4,7),rgb:pick(['120,70,30','170,110,50','255,210,120']),add:false,shape:'drop'});
      ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#5a3418';ctx.beginPath();ctx.ellipse(0,0,8,11,0,0,6.29);ctx.fill();ctx.strokeStyle='#2a1408';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,-9);ctx.quadraticCurveTo(-3,0,0,9);ctx.stroke();ctx.restore();},{arc:120,spin:10}));}await wait(90);}
  await Promise.all(fl);
  for(const h of hs){sfx('heal');soundBlast(cx(h),midY(h),'255,190,90',120,360);for(let i=0;i<16;i++)part({x:cx(h)+rnd(-30,30),y:h.y+h.oy-rnd(0,h.h*h.scale),vx:rnd(-30,30),vy:-rnd(60,160),life:rnd(.6,1),size:rnd(3,6),rgb:pick(['255,200,110','160,100,40','255,240,190'])});
    const x0=h.ox||0;tween(500,k=>{h.ox=x0+Math.sin(k*60)*4*(1-k);}).then(()=>{h.ox=x0;});
    addStatus(h,'haste',3);addStatus(h,'atkUp',3);auraOn(h,'wings',{slot:'hasteFx',k:.9,alpha:.6,dy:-h.h*h.scale*.12,pulse:.05,while:()=>h.alive&&h.st.haste&&!S.over});}
  updateHUD();await wait(700);St.on=false;S0.s=s0;S0.y=y0;};}}

// ---- Árny-csapat idézés: nem karmolnak – minden árnymás felugrik, és a saját fegyverével LECSAP (előredől), lila árny-becsapódás
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>null;
  sh.run=async(P,S0)=>{const hs=S.heroes.filter(h=>h.alive);const shades=hs.map(h=>({h,x:h.x+60,y:h.y,a:0,rise:0,rot:0,jy:0}));const st={on:true};
   effects.push({update(){return st.on;},draw(){for(const q of shades){if(q.a<=0)continue;ctx.save();ctx.globalAlpha=.75*q.a;ctx.translate(q.x,q.y+4);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,4,0,0,70);g.addColorStop(0,'rgba(10,0,25,.95)');g.addColorStop(1,'rgba(60,20,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,70,0,6.29);ctx.fill();ctx.restore();
       const sp=ENEMY_SPR[q.h.type+'-attack']||ENEMY_SPR[q.h.type];if(!sp)continue;const Hh=q.h.h*(q.h.scale0||q.h.scale)*1.05,w=Hh*sp.width/sp.height,vis=Hh*q.rise;
       ctx.save();ctx.translate(q.x,q.y-q.jy);ctx.rotate(q.rot);ctx.translate(-q.x,-q.y);ctx.beginPath();ctx.rect(q.x-w,q.y-Hh-40,w*2,Hh+40+(q.jy>0?q.jy:0));ctx.clip();const ts2=tintSpr(sp,'rgb(55,25,110)',.62);
       for(const [ox,oy] of [[-2,0],[2,0],[0,-2],[0,2]]){ctx.globalAlpha=q.a*.6;ctx.drawImage(tintSpr(sp,'rgb(200,140,255)',1),q.x-w/2+ox,q.y-vis+oy,w,Hh);}ctx.globalAlpha=q.a;ctx.drawImage(ts2,q.x-w/2,q.y-vis,w,Hh);ctx.restore();}}});
   sfx('dark');await tween(300,k=>{for(const q of shades)q.a=k;});await tween(500,k=>{for(const q of shades)q.rise=easeIO(k);});
   for(const q of shades){const t=pick(foesAlive());if(!t)break;const x0=q.x,y0=q.y,tx=cx(t)-t.w*t.scale*.5-40;sfx('whoosh');
     await tween(240,k=>{const e=easeIO(k);q.x=x0+(tx-x0)*e;q.y=y0+(t.y+t.oy-y0)*e;q.jy=Math.sin(k*Math.PI)*50;});
     await tween(160,k=>{q.rot=-.22*easeIO(k);q.jy=60*easeIO(k);});sfx('whoosh');
     await tween(110,k=>{const e=k*k;q.rot=-.22+.6*e;q.jy=60*(1-e);});q.jy=0;
     const hx=cx(t),hy=midY(t);sfx('dark');sfx('rock');shake(12);hitStop(60);soundBlast(hx,hy,'170,100,255',170,380);sparks(hx,hy,['200,150,255','255,255,255','120,60,200'],30,480);
     for(let i=0;i<6;i++)part({x:hx+rnd(-40,40),y:t.y+t.oy-rnd(0,10),vx:rnd(-60,60),vy:-rnd(20,60),life:rnd(.6,1),size:rnd(16,26),grow:24,rgb:'40,10,70',add:false,shape:'dsmoke'});
     t.hurt=.4;hit(q.h,t,{...ATTACKS[q.h.type],name:'Árnycsapás',pow:2.6,anim:'midnight'});await wait(140);
     await tween(160,k=>{q.rot=.38*(1-k);});q.rot=0;await tween(220,k=>{const e=easeIO(k);q.x=tx+(x0-tx)*e;q.y=t.y+t.oy+(y0-t.y-t.oy)*e;q.jy=Math.sin(k*Math.PI)*40;});q.jy=0;}
   await tween(400,k=>{for(const q of shades){q.rise=1-k;q.a=1-k*.5;}});st.on=false;};}}

// ---- Rémült Vén Tölgy – Ágcsapás: a saját ágával csap le, de a föld NEM jön fel (nincs repedés, por, földhalom) – csak kéreg- és levéldarabok
A.branchSwing=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T0=limbOn(u,'oak');if(!T0){hit(u,t,sk);return;}const a=T0.arm;a.blur=true;
  const aim=limbAim(u,'oak','arm',.04,.48,cx(t)+30,midY(t)-10),sx=Math.max(1,Math.min(2.4,aim.sx));a.ax=aim.ax;sfx('wind');
  await tween(750,k=>{const e=easeIO(k);a.rot=(aim.rot+1.5)*e;a.s=1+.3*e;u.lean=.16*e;u.sq=1+.06*e;});await wait(150);
  for(let i=0;i<6;i++)part({x:cx(u)+rnd(-60,60),y:topY(u)+rnd(0,60),vx:rnd(-80,80),vy:rnd(-40,40),g:300,life:1,size:rnd(6,9),rgb:pick(['80,150,40','150,190,60']),add:false,shape:'leaf'});
  sfx('whoosh');await tween(260,k=>{const e=eOutBack(k);a.rot=aim.rot+1.5-1.5*e;a.sx=1+(sx-1)*Math.min(1,k*1.4);u.lean=.12-.3*e;u.sq=1.06-.1*Math.sin(k*Math.PI);});
  const P=limbPt(u,'arm',.04,.48);sfx('rock');sfx('hit');hitStop(120);shake(18);flash('255,230,180',.2,.1);punch(cx(t),midY(t),.04);
  fallDebris(P.x,P.y,10,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#6b4a2a';ctx.strokeStyle='#2a1a0e';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-9*s,-3*s);ctx.lineTo(8*s,-5*s);ctx.lineTo(10*s,2*s);ctx.lineTo(-7*s,4*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:340});
  for(let i=0;i<16;i++)part({x:P.x,y:P.y,vx:rnd(-240,240),vy:rnd(-260,-40),g:500,life:rnd(.7,1.1),size:rnd(5,8),rgb:pick(['80,150,40','150,190,60','200,170,60']),add:false,shape:'leaf'});
  sparks(cx(t),midY(t),['255,240,200','210,190,140'],22,420);soundBlast(cx(t),midY(t),'210,190,140',170,380);toss(t,40,340);t.hurt=.4;hit(u,t,sk);
  await wait(450);await tween(500,k=>{const e=easeIO(k);a.rot=aim.rot*(1-e);a.sx=sx+(1-sx)*e;a.s=1.3-.3*e;u.lean=-.18*(1-e);u.sq=1;});a.blur=false;limbOff(u);u.lean=0;}finally{rel();}};

// ---- Rémült Vén Tölgy – Levélvihar: a korona körül összegyűlnek a levelek, aztán egy éles széllökéssel CSAPÓDNAK a hősökbe: minden hősnél erős becsapódás (megáll a kép, rázkódik, a hős hátralökődik, levelek robbannak szét)
A.leafGale=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('wind');await bodyWind(u,300,.14);
  const cols=['#4f9a2a','#7bbf3a','#c9b23a','#d9842a','#3f7f22'],L=[],cx0=cx(u),cy0=topY(u)+u.h*u.scale*.25;
  for(let i=0;i<110;i++){const a=rnd(0,6.28),r=rnd(40,150);L.push({a,r,x:cx0+Math.cos(a)*r,y:cy0+Math.sin(a)*r*.5,rr:rnd(0,6),vr:rnd(-8,8),fp:rnd(0,6),s:rnd(.9,1.6),c:pick(cols),go:false,vx:0,vy:0,tx:0,ty:0,d:rnd(0,.25)});}
  const st={t:0,phase:0};effects.push({update(dt){st.t+=dt;for(const l of L){if(!l.go){l.a+=dt*3.2;l.x=cx0+Math.cos(l.a)*l.r;l.y=cy0+Math.sin(l.a)*l.r*.5;}else{l.x+=l.vx*dt;l.y+=l.vy*dt;}l.rr+=l.vr*dt;l.fp+=dt*9;}return st.phase<2;},
    draw(){if(st.phase===1){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(220,255,210,.3)';ctx.lineWidth=3;for(let i=0;i<10;i++){const y=cy0-60+i*30+Math.sin(st.t*5+i)*10,x=cx0-((st.t*1400+i*120)%(cx0+200));ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+80,y-16,x+220,y);ctx.stroke();}ctx.restore();}
      for(const l of L)if(l.x>-40)drawLeaf(l.x,l.y,l.s,l.rr,Math.cos(l.fp),l.c);}});
  await wait(450);bodyStrike(u,170,-.24);sfx('whoosh');st.phase=1;
  const order=al.slice().sort((a,b)=>cx(b)-cx(a));L.forEach((l,i)=>{const t=order[i%order.length];setTimeout(()=>{l.go=true;const tx=cx(t)+rnd(-30,30),ty=midY(t)+rnd(-50,40),d=Math.hypot(tx-l.x,ty-l.y),v=rnd(1000,1300);l.vx=(tx-l.x)/d*v;l.vy=(ty-l.y)/d*v;},l.d*1000/(S.speed||1));});
  for(const t of order){(async()=>{await wait((cx0-cx(t))/1150*1000+260);if(!t.alive)return;sfx('whoosh');sfx('hit');hitStop(70);shake(12);toss(t,34,320);t.hurt=.4;
      for(let i=0;i<22;i++)part({x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-30,30),vx:rnd(-320,320),vy:rnd(-300,80),g:500,life:rnd(.6,1),size:rnd(6,9),rgb:pick(['80,150,40','150,190,60','200,170,60','217,132,42']),add:false,shape:'leaf'});
      soundBlast(cx(t),midY(t),'170,220,120',150,360);hit(u,t,sk);})();}
  await wait(1300);st.phase=2;await bodySettle(u);}finally{rel();}};
NOFX.add('leafGale');NOFX.add('branchSwing');

// ---- Espresszó csata: Morgána üstje kisebb, és rendesen kidolgozva (öntöttvas, szegecsek, holdsarló-jel, fortyogó kávé, gőz, alatta valódi tűz)
qCauldron=function(x,y){ctx.save();ctx.translate(x,y);
  ctx.fillStyle='#4a2c16';ctx.save();ctx.rotate(.25);ctx.fillRect(-34,-6,60,10);ctx.restore();ctx.save();ctx.rotate(-.25);ctx.fillRect(-26,-12,60,10);ctx.restore();
  if(TXP.fx.length){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<3;i++){const im=TXP.fx[(Math.floor(T*12)+i*3)%TXP.fx.length],sz=58+8*Math.sin(T*9+i);ctx.globalAlpha=.85;ctx.drawImage(im,-24+i*20-sz/2,-sz*.85,sz,sz);}ctx.restore();}
  ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-14,60,'255,140,40',.45+.1*Math.sin(T*7));ctx.restore();
  ctx.fillStyle='#17131b';for(const lx of [-40,0,40]){const o=lx<0?-3:lx>0?3:0;ctx.beginPath();ctx.moveTo(lx-7,-30);ctx.lineTo(lx+7,-30);ctx.lineTo(lx+o+4,0);ctx.lineTo(lx+o-4,0);ctx.closePath();ctx.fill();}
  const g=ctx.createRadialGradient(-20,-70,6,0,-56,66);g.addColorStop(0,'#6b6474');g.addColorStop(.45,'#33293a');g.addColorStop(1,'#0e0a12');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-58,-86);ctx.bezierCurveTo(-72,-40,-46,-18,0,-18);ctx.bezierCurveTo(46,-18,72,-40,58,-86);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,170,90,.35)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-52,-40);ctx.bezierCurveTo(-36,-24,36,-24,52,-40);ctx.stroke();
  ctx.fillStyle='#8a8094';for(let i=0;i<7;i++){ctx.beginPath();ctx.arc(-48+i*16,-77,2.6,0,6.29);ctx.fill();}
  ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-52,24,'190,110,255',.5+.2*Math.sin(T*4));ctx.restore();
  ctx.fillStyle='#c79bff';ctx.beginPath();ctx.arc(0,-52,11,Math.PI*.3,Math.PI*1.7);ctx.arc(4,-52,8.5,Math.PI*1.6,Math.PI*.4,true);ctx.closePath();ctx.fill();
  ctx.fillStyle='#4a4352';ctx.beginPath();ctx.ellipse(0,-86,62,12,0,0,6.29);ctx.fill();ctx.strokeStyle='#8a8094';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#3a1f0e';ctx.beginPath();ctx.ellipse(0,-87,53,8,0,0,6.29);ctx.fill();ctx.fillStyle='rgba(200,140,80,.5)';ctx.beginPath();ctx.ellipse(-14,-88,24,3,0,0,6.29);ctx.fill();
  for(let i=0;i<5;i++){const ph=(T*1.6+i*.37)%1,bx=-36+i*18+Math.sin(i*5)*6,r=3+5*ph;ctx.strokeStyle=`rgba(220,170,110,${1-ph})`;ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(bx,-88-ph*4,r,0,6.29);ctx.stroke();}
  ctx.strokeStyle='#5a5262';ctx.lineWidth=4;ctx.beginPath();ctx.arc(-64,-70,8,1.3,4.8);ctx.stroke();ctx.beginPath();ctx.arc(64,-70,8,-1.6,1.8);ctx.stroke();
  ctx.restore();if(Math.random()<.25)part({x:x+rnd(-30,30),y:y-92,vx:rnd(-10,10),vy:-rnd(30,60),life:rnd(1,1.6),size:rnd(14,22),grow:24,rgb:'235,230,225',add:false,shape:'smoke'});};

// ---- Közös támadás plakátja: minden hős a saját színű, ferde panelján, teljes alakban (nem levágva, nem duplán), sorban becsúsznak; fénysugarak, nagy cím
{const dcB=drawCutin;drawCutin=function(){const c=S.cutin;if(!c||!c.all)return dcB();const k=c.age/c.life;if(k>=1){S.cutin=null;return;}
  const seen=new Set(),party=(S.comboParty||S.heroes).filter(h=>h&&!seen.has(h.type)&&seen.add(h.type)),n=party.length;c.name=n>=5?'Ötök ereje':n===4?'Négyek ereje':n===3?'Hármak ereje':'Közös erő';
  const inK=Math.min(1,c.age/.25),outK=c.age>c.life-.25?Math.min(1,(c.age-(c.life-.25))/.25):0,bh=290,y0=H/2-bh/2-10;
  ctx.save();ctx.globalAlpha=1-outK;ctx.fillStyle=`rgba(10,5,20,${.6*inK})`;ctx.fillRect(0,0,W,H);
  ctx.save();ctx.translate(W/2,H/2);ctx.rotate(c.age*.4);ctx.globalCompositeOperation='lighter';for(let i=0;i<16;i++){ctx.rotate(Math.PI*2/16);ctx.fillStyle=`rgba(255,220,140,${.07*inK})`;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(W,-70);ctx.lineTo(W,70);ctx.closePath();ctx.fill();}ctx.restore();
  const pw=Math.min(200,(W-90)/n),x0=(W-pw*n)/2,sl=24;
  party.forEach((h,i)=>{const d=Math.max(0,Math.min(1,(c.age-i*.07)/.3)),e=eOutBack(d);if(d<=0)return;const px=x0+i*pw;ctx.save();ctx.translate(0,(1-e)*(i%2?-300:300));
    ctx.beginPath();ctx.moveTo(px+sl,y0);ctx.lineTo(px+pw+sl-6,y0);ctx.lineTo(px+pw-sl-6,y0+bh);ctx.lineTo(px-sl,y0+bh);ctx.closePath();
    const g=ctx.createLinearGradient(0,y0,0,y0+bh);g.addColorStop(0,h.d.color);g.addColorStop(.6,'#3a2350');g.addColorStop(1,'#140b22');ctx.fillStyle=g;ctx.fill();
    ctx.save();ctx.clip();ctx.globalCompositeOperation='lighter';glow(px+pw/2,y0+bh*.45,pw*.7,'255,240,200',.25);ctx.globalCompositeOperation='source-over';
    const sp=ENEMY_SPR[h.type]||ENEMY_SPR[h.type+'-attack'];if(sp){const hh=bh*(h.type==='fairy'?.72:.92),ww=hh*sp.width/sp.height,dx=px+pw/2-ww/2+Math.sin(c.age*3+i)*3;ctx.drawImage(sp,dx,y0+bh-hh-6+(1-e)*30,ww,hh);}
    const sh=(c.age*1.6+i*.15)%2-.4;if(sh>-.2&&sh<1.2){const sx=px+pw*sh;const sg=ctx.createLinearGradient(sx-30,0,sx+30,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.28)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.fillRect(sx-30,y0,60,bh);}
    ctx.restore();ctx.beginPath();ctx.moveTo(px+sl,y0);ctx.lineTo(px+pw+sl-6,y0);ctx.lineTo(px+pw-sl-6,y0+bh);ctx.lineTo(px-sl,y0+bh);ctx.closePath();ctx.lineWidth=5;ctx.strokeStyle='#fff3c8';ctx.stroke();ctx.lineWidth=2;ctx.strokeStyle=h.d.color;ctx.stroke();
    txt(h.name,px+pw/2,y0+bh+20,17,'#ffffff','#1a0f24');ctx.restore();});
  const ts=1+.2*Math.max(0,1-c.age/.3);txt('KÖZÖS TÁMADÁS!',W/2,y0-26,24*ts,'#ffc94a','#2a1206');txt(c.name,W/2,y0+bh+56,44*ts,'#ffffff','#2a1206');
  ctx.restore();};}

// ---- Térkép: minden pálya-pötty (a főellenségeké is) a rajzolt pontsorokon ül, egyenletes közökkel (a térkép pontjait képfelismeréssel mértem)
{const P1=[[[22.5,90.5],[30.0,92.9],[37.6,94.9],[44.7,89.9]],[[45.4,74.8],[39.2,60.2],[42.6,49.4],[53.6,49.4]],[[52.5,82.1],[69.5,83.8],[75.5,80.4],[77.8,71.4]],[[72.7,64.7],[77.9,58.3],[82.0,49.6],[84.4,39.4]]],
  P2=[[[24.1,87.5],[28.0,82.0],[31.3,75.6],[35.8,72.0]],[[37.3,63.7],[39.8,56.4],[44.4,52.8],[49.4,52.2]],[[53.9,48.6],[58.2,44.0],[63.2,44.2],[68.1,45.9]],[[73.0,43.9],[77.2,39.1],[80.7,32.7],[85.1,28.8]]];
  for(let i=0;i<4;i++){MAP_POS[i]=P1[i];if(MAP_POS.length>4+i)MAP_POS[4+i]=P2[i];}}

// ---- Napi kihívás: a csapat szintjéhez igazítva (nem üt egy csapásra). Csak olyan fejezetek ellenfelei, amelyekhez a csapat elég erős; első csata 2 ellenféllel
r14DailyLevel=function(){const d=new Date();let s=d.getFullYear()*1000+d.getMonth()*40+d.getDate();const R=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const cl=ZONES.flatMap(z=>z.levels).filter(l=>cleared(l.id)),lv=cl.length?cl[cl.length-1]:ZONES[0].levels[0];
  const hs=(S.roster&&S.roster.length?S.roster:S.heroes)||[],avg=hs.length?hs.reduce((a,h)=>a+(h.lvl||1),0)/hs.length:1;
  const zi=Math.max(0,ZONES.indexOf(zoneOf(lv)));let zs=foesByZone().slice(0,zi+1).filter(([z])=>(z.levels[0].elvl||1)<=avg+2);if(!zs.length)zs=foesByZone().slice(0,1);
  const pool=zs.flatMap(([z,ts])=>ts).filter(t=>!EN_DEF[t].boss&&!EN_DEF[t].miniboss&&!EN_DEF[t].passive&&!['squirrel','mushking','acorn','root','kanna'].includes(t)),pickT=()=>pool[Math.floor(R()*pool.length)]||'slime';
  return {id:'napi',daily:true,name:'Napi kihívás',theme:lv.theme,elvl:Math.max(1,Math.min(lv.elvl+1,Math.round(avg))),intro:'Minden nap más ellenfelek várnak. Az első győzelemért ma 500 arany jár!',battles:[[pickT(),pickT()],[pickT(),pickT(),pickT()]]};};

// ---- Páros támadások: mindkét hős a SAJÁT látványos mozdulatát csinálja (előbb az előkészítő, aztán a fő csapás), a kettőt energiaszalag köti össze
{const h0=hit;hit=function(u,t,sk){if(S._r15mute&&u===S._r15mute){if(t&&t!==u)t.hurt=.3;return;}return h0.apply(this,arguments);};}
const R15A={
  // Morgána árnyba burkolja Grogot: fekete-lila lángok lobognak rajta
  shadowCloak:async(u,ts,sk)=>{const g=S.heroes.find(h=>h.type==='orc')||u;await castPose(u,'150,70,230',380);sfx('dark');const st={t:0};
    await new Promise(res=>{effects.push({update(dt){st.t+=dt;if(st.t<.9){for(let i=0;i<2;i++)darkFlame({x:cx(g)+rnd(-40,40),y:g.y+g.oy-rnd(0,g.h*g.scale*.8),vx:rnd(-20,20),vy:-rnd(60,140),life:rnd(.5,.8),size:rnd(14,24)});const a={x:cx(u),y:midY(u)};part({x:a.x,y:a.y,vx:(cx(g)-a.x)*2,vy:(midY(g)-a.y)*2,life:.5,size:rnd(3,6),rgb:pick(['150,70,230','60,10,90'])});}if(st.t>1){res();return false;}return true;},draw(){}});});
    g._r15dark=true;},
  // Zordon tűzzel tölti meg Jázmin íját
  fireCharge:async(u,ts,sk)=>{const m=S.heroes.find(h=>h.type==='monk')||u;await castPose(u,'255,150,60',380);sfx('fire');const st={t:0};
    await new Promise(res=>{effects.push({update(dt){st.t+=dt;if(st.t<1){const a=handPos(u),b=handPos(m);for(let i=0;i<3;i++){const q=Math.random();part({x:a.x+(b.x-a.x)*q+rnd(-8,8),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*50+rnd(-8,8),vx:(b.x-a.x)*.8,vy:(b.y-a.y)*.8,drag:1.2,life:rnd(.3,.5),size:rnd(8,14),grow:20,rgb:'255,150,40',add:false,shape:'fire'});}}if(st.t>1.1){res();return false;}return true;},
      draw(){const b=handPos(m);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,30+40*Math.min(1,st.t),'255,150,50',.7);ctx.restore();}});});},
  // Jázmin lángoló sárkánynyila: végigszántja az összes ellenséget
  dragonArrow:async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('whoosh');await wait(200);const o=handPos(u),xs=al.slice().sort((a,b)=>cx(a)-cx(b)),y=xs.reduce((s,t)=>s+midY(t),0)/xs.length,x1=W+120;
    const A0={x:o.x,y:o.y,on:true,hit:new Set()};sfx('fire');
    effects.push({update(dt){if(A0.on){for(let i=0;i<5;i++)part({x:A0.x-rnd(0,30),y:A0.y+rnd(-14,14),vx:-rnd(100,300),vy:rnd(-60,60),drag:1.4,life:rnd(.35,.6),size:rnd(14,26),grow:40,rgb:'255,150,40',add:false,shape:'fire'});for(const t of xs)if(!A0.hit.has(t)&&A0.x>=cx(t)){A0.hit.add(t);shake(10);hitStop(50);bigBoom(cx(t),midY(t),.6);t.hurt=.4;hit(u,t,sk);}}return A0.on;},
      draw(){if(!A0.on)return;ctx.save();ctx.translate(A0.x,A0.y);ctx.rotate(Math.atan2(y-o.y,x1-o.x)*.3);ctx.globalCompositeOperation='lighter';glow(0,0,70,'255,140,40',.8);glow(14,0,30,'255,250,220',.95);ctx.globalCompositeOperation='source-over';
        ctx.fillStyle='#3a2210';ctx.fillRect(-80,-3,90,6);ctx.fillStyle='#ffd27a';ctx.beginPath();ctx.moveTo(10,-10);ctx.lineTo(40,0);ctx.lineTo(10,10);ctx.closePath();ctx.fill();
        // sárkányfej a nyíl hegye körül (lángból)
        ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(255,170,60,.55)';ctx.beginPath();ctx.moveTo(56,0);ctx.quadraticCurveTo(30,-34,-10,-26);ctx.lineTo(-30,-46);ctx.lineTo(-20,-20);ctx.quadraticCurveTo(-40,0,-20,20);ctx.quadraticCurveTo(30,30,56,0);ctx.fill();ctx.restore();}});
    await tween(900,k=>{const e=k*k*(3-2*k);A0.x=o.x+(x1-o.x)*e;A0.y=o.y+(y-o.y)*Math.min(1,k*2.5)-Math.sin(k*Math.PI)*30;});A0.on=false;for(const t of xs)if(!A0.hit.has(t)&&t.alive)hit(u,t,sk);u.pose='idle';}};
const R15_PAIRSEQ={'Villámátok':[['witch','midnight','LIMITS.witch'],['wizard','zeusStorm']],'Tündérököl':[['fairy','dawnGlow','sunburst'],['orc','quake']],'Csillagözön':[['fairy','judgement','judgement'],['wizard','starfall']],
  'Árnyroham':[['witch','shadowCloak'],['orc','whirl']],'Lótuszvihar':[['monk','arrowRain','arrowrain'],['fairy','petals']],'Sárkánynyíl':[['wizard','fireCharge'],['monk','dragonArrow']]};
{const pa0=A.pairAtk;A.pairAtk=async(u,ts,sk)=>{const p=sk&&sk.pair,o=sk&&sk.partner,al=ts.filter(t=>t.alive);const seq=p&&R15_PAIRSEQ[p.name];if(!seq||!al.length)return pa0(u,ts,sk);
  const who=ty=>u.type===ty?u:(o&&o.type===ty)?o:(S.heroes.find(h=>h.type===ty)||u),A1=who(seq[0][0]),B1=who(seq[1][0]),rgb=p.rgb||'255,230,160';
  await dimTo(.55,'10,5,25',250);showBanner('Páros támadás: '+p.name,true);sfx('holy');
  const Ln={k:0,on:true};effects.push({update(){return Ln.on;},draw(){if(Ln.k<=0)return;const a={x:cx(A1),y:midY(A1)},b={x:cx(B1),y:midY(B1)},mx2=(a.x+b.x)/2,my2=Math.min(a.y,b.y)-70;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
    for(const [w,a2] of [[24,.25],[11,.5],[4,.9]]){ctx.strokeStyle=`rgba(${rgb},${a2*Ln.k})`;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.quadraticCurveTo(mx2+Math.sin(T*9)*14,my2,b.x,b.y);ctx.stroke();}glow(a.x,a.y,70*Ln.k,rgb,.6);glow(b.x,b.y,70*Ln.k,rgb,.6);ctx.restore();}});
  await tween(400,k=>{Ln.k=k;});await wait(200);
  const skOf=s=>!s?sk:s==='LIMITS.witch'?LIMITS.witch:(SK[s]||sk),run=name=>R15A[name]||A[name];
  const s1=skOf(seq[0][2]);S._r15mute=A1;try{const f=run(seq[0][1]);if(f)await f(A1,s1&&s1.tgt==='enemy'?[al[0]]:al,s1);}catch(e){console.error(e);}finally{S._r15mute=null;}
  Ln.k=.7;const live=al.filter(t=>t.alive);
  if(live.length){const darkOn=B1._r15dark;let iv=null;if(darkOn)iv=setInterval(()=>{for(let i=0;i<2;i++)darkFlame({x:cx(B1)+rnd(-40,40),y:B1.y+B1.oy-rnd(0,B1.h*B1.scale*.8),vx:rnd(-20,20),vy:-rnd(60,140),life:rnd(.4,.7),size:rnd(14,24)});},60);
    try{const f=run(seq[1][1]);if(f)await f(B1,live,sk);}catch(e){console.error(e);}finally{if(iv)clearInterval(iv);B1._r15dark=false;}}
  Ln.on=false;flash(rgb,.35,.2);shake(10);
  if(p.heal){for(const h of S.heroes)if(h.alive){const v=Math.round(h.maxHp*p.heal);h.hp=Math.min(h.maxHp,h.hp+v);popLabel(h,'+'+v,'#7dff9a');}updateHUD();}
  await dimTo(0,null,300);};}

// ---- Fekvő telefon: a csatatér kitölti a magasságot (nincs fölötte sáv), jobbra fent a hőskártyák, alattuk közvetlenül a parancspanel (nincs üres rés); a nyitóképernyő belefér; kisebb térképpöttyök
{const st=document.createElement('style');st.textContent=`@media (orientation:landscape) and (max-height:520px){
  .game{height:calc(100vh - 14px)!important;min-height:0!important;grid-template-rows:auto minmax(0,1fr)!important;align-content:stretch!important;align-items:stretch!important;row-gap:6px!important}
  @supports (height:100dvh){.game{height:calc(100dvh - 14px)!important}}
  .stage{align-self:center!important;position:relative!important;min-height:0!important}
  .stage>.overlay{position:absolute!important;inset:0!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch}
  .ov-logo{max-height:46vh!important;width:auto!important}
  .party{align-self:start!important}
  .cmd{align-self:stretch!important;max-height:none!important;min-height:0!important;overflow-y:auto!important}
  .mnode{width:26px!important;height:26px!important;font-size:13px!important}.mnode.boss{width:32px!important;height:32px!important}}`;document.head.appendChild(st);}
