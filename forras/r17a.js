// ===== 18. kör: élethű, festett effektképek (Canva) + a 17. kör tesztlapjának javításai =====
// Az fx7-* képek átlátszó hátterű, festett effektek (tussárkány, lángoszlop, viharfelhő, tea-hullám, csillagkép, lótusz, tűzsárkány)
const R17I={};if(typeof Image!=='undefined'&&typeof IMG_SRC==='object')for(const n in IMG_SRC)if(n.startsWith('fx7-')){const im=new Image();im.onload=()=>{R17I[n.slice(4)]=im;};im.src=IMG_SRC[n];}
const R17E=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
// egy kép elhelyezése: középpont (x,y), szélesség w, forgatás, átlátszóság, opcionális fénylő (additív) rajzolás
function r17Draw(im,x,y,w,o={}){if(!im)return false;const h=w*im.height/im.width;ctx.save();ctx.globalAlpha*=o.a==null?1:o.a;if(o.add)ctx.globalCompositeOperation='lighter';ctx.translate(x,y);if(o.rot)ctx.rotate(o.rot);ctx.scale(o.fx?-1:1,o.sy||1);
  const ay=o.anchor==='bottom'?-h:-h/2;ctx.drawImage(im,-w/2,ay,w,h);ctx.restore();return true;}
// kép hajlítása egy útvonal mentén (kígyózó test): a kép bal széle a fej, csíkonként a pálya pontjaira kerül
function r17Snake(im,P,len,thick,a=1,dim){if(!im||P.length<2)return;const N=64,W=im.width,H=im.height,sw=W/N;
  // ívhossz menti mintavétel
  const L=[0];for(let i=1;i<P.length;i++)L.push(L[i-1]+Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y));const tot=L[L.length-1];
  const at=d=>{if(d>=tot)return null;let j=1;while(j<L.length&&L[j]<d)j++;if(j>=L.length)return null;const q=(d-L[j-1])/Math.max(1e-6,L[j]-L[j-1]),A=P[j-1],B=P[j];return {x:A.x+(B.x-A.x)*q,y:A.y+(B.y-A.y)*q,b:A.b,ang:Math.atan2(B.y-A.y,B.x-A.x)};};
  const sl=len/N;for(const pass of [1,0])for(let i=N-1;i>=0;i--){const p=at(i*sl+sl/2);if(!p)continue;if((p.b?1:0)!==pass)continue;ctx.save();ctx.globalAlpha=a*(p.b?(dim||.55):1);ctx.translate(p.x,p.y);ctx.rotate(p.ang);ctx.drawImage(im,i*sw,0,sw+1,H,-sl/2-.6,-thick/2,sl+1.2,thick);ctx.restore();}}

// ---- Espresszó – Lecsapás: egyetlen folyamatos, lendületes ív (nincs megállás), rugalmas becsapódás
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const W0=u.w*u.scale,dx=(cx(t)+W0*.56)-cx(u),dy=(t.y+4)-u.y;
  await tween(240,k=>{const e=easeIO(k);u.sq=1-.16*e;u.lean=.14*e;});sfx('wind');ghosts(u,820);puffs(cx(u),u.y+u.oy,10,['190,170,140','160,140,120'],[22,38],{w:120,up:70});
  let landed=false;await tween(760,k=>{const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;u.ox=dx*e;u.oy=dy*e;const up=Math.sin(Math.min(1,k*1.25)*Math.PI*.9);u.jump=Math.max(0,250*up*(1-Math.pow(k,6)));
    u.sq=1+.14*Math.sin(Math.min(1,k*2)*Math.PI)*(k<.5?1:-.6);u.lean=.14-.36*Math.sin(k*Math.PI*.5)+.4*Math.max(0,(k-.75)/.25);});u.jump=0;
  const x=cx(t),y=midY(t),gy=t.y+t.oy;sfx('rock');sfx('boom');hitStop(150);shake(26);rumble(.6,10);flash('255,220,170',.32,.14);punch(x,y,.06);
  groundCrack(cx(u),gy+4,'200,170,120',260);dustWave(cx(u),gy);puffs(cx(u),gy-6,16,['190,170,140','160,140,120'],[26,46],{w:220,up:100});
  sparks(x,y,['255,230,170','255,255,255','220,180,120'],36,560);soundBlast(x,y,'255,220,160',220,440);toss(t,80,480);t.hurt=.5;hit(u,t,sk);
  await tween(320,k=>{const s=Math.exp(-5*k)*Math.cos(k*14);u.sq=1-.2*s;u.lean=.26*s;});u.sq=1;u.lean=0;
  ghosts(u,480);await tween(520,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*120;u.sq=1+.06*Math.sin(k*Math.PI*2);});u.ox=0;u.oy=0;u.jump=0;u.sq=1;}finally{rel();u.spin=0;u.lean=0;u.sq=1;}};

// ---- Vázagólem – Mázpáncél: a pajzs a hősök felé fordul (térbeli rövidülés), és ha felfog egy támadást, nem sebződik, hanem a pajzs darabokra törik
{const dv=drawVaseWall;drawVaseWall=function(e,a){ctx.save();const x=cx(e)-e.w*e.scale*.7,y=e.y+e.oy-e.h*e.scale*.7;ctx.translate(x,y);ctx.transform(.8,-.1,0,1,0,0);ctx.translate(-x,-y);try{dv(e,a);}finally{ctx.restore();}};}
function r17VaseShatter(e){const S0=r16VaseShield(),Hh=e.h*e.scale*1.45,sc=Hh/S0.H1,x0=cx(e)-e.w*e.scale*.7-S0.W1*sc/2,top=e.y+e.oy-Hh-4;e._vwall=null;
  sfx('glass');sfx('glass');shake(14);hitStop(90);flash('230,240,255',.35,.12);popLabel(e,'A PAJZS ELTÖRT!','#cfe0ff');
  const sh=S0.pieces.map(pc=>({pc,x:x0+pc.cx*sc,y:top+pc.cy*sc,vx:-rnd(80,420),vy:-rnd(120,420),r:0,vr:rnd(-9,9)}));const st={t:0};
  R17E({update(dt){st.t+=dt;for(const s of sh){s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;}return st.t<1.4;},draw(){const a=Math.min(1,(1.4-st.t)*2);for(const s of sh){ctx.save();ctx.globalAlpha=a;ctx.translate(s.x,s.y);ctx.rotate(s.r);ctx.scale(sc,sc);ctx.translate(-s.pc.cx,-s.pc.cy);ctx.beginPath();s.pc.p.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();ctx.drawImage(S0.c,-S0.PAD,-S0.PAD);ctx.restore();}}});
  for(let i=0;i<24;i++)part({x:x0+S0.W1*sc/2+rnd(-60,60),y:top+Hh*.5+rnd(-100,100),vx:rnd(-300,100),vy:rnd(-300,50),g:800,life:rnd(.5,.9),size:rnd(2,4),rgb:pick(['255,255,255','190,210,255']),shape:'star'});
  if(e.st){delete e.st.defUp;}updateHUD();}
{const h17=hit;hit=function(u,t,sk){if(t&&t.type==='vase'&&t._vwall&&(t._vwall.k==null||t._vwall.k>=1)&&u&&u!==t&&S.heroes.includes(u)&&sk&&sk.kind!=='heal'&&sk.kind!=='buff'){r17VaseShatter(t);return;}return h17.apply(this,arguments);};}

// ---- Porcelán mandarin – Tusátok: ecsettel írja fel a „龍” jelet a levegőbe (vonásról vonásra, a keze viszi az ecsetet), a tintatartóból kiáramlik a festett tussárkány,
// spirálban alulról felfelé körbetekeredik a hősökön, összeszorítja őket, majd visszakúszik az üvegcsébe
function r17Inkpot(x,y,s,a){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(0,4,40,8,0,0,6.29);ctx.fill();
  const g=ctx.createRadialGradient(-12,-30,4,0,-22,44);g.addColorStop(0,'#4a5a7a');g.addColorStop(.5,'#1a2236');g.addColorStop(1,'#05070c');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-34,0);ctx.bezierCurveTo(-44,-30,-30,-46,-14,-48);ctx.lineTo(14,-48);ctx.bezierCurveTo(30,-46,44,-30,34,0);ctx.closePath();ctx.fill();
  ctx.strokeStyle='#0a0c12';ctx.lineWidth=3;ctx.stroke();ctx.fillStyle='#c9a24a';ctx.fillRect(-16,-58,32,11);ctx.strokeStyle='#5a4010';ctx.lineWidth=2;ctx.strokeRect(-16,-58,32,11);
  ctx.fillStyle='#05050a';ctx.beginPath();ctx.ellipse(0,-58,14,4,0,0,6.29);ctx.fill();ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-22,-36);ctx.quadraticCurveTo(-28,-18,-20,-6);ctx.stroke();ctx.restore();}
const R17_GLYPH=[[[-40,-60],[40,-62]],[[0,-80],[2,-40]],[[-46,-36],[46,-38]],[[-30,-20],[-34,40]],[[-30,-6],[26,-8],[22,40],[8,30]],[[-30,14],[22,12]],[[-36,40],[30,44]]];
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);const D={on:true};try{sfx('dark');
  const hand=()=>fp(u,.14,.5),potP=()=>({x:cx(u)-u.w*u.scale*.75,y:u.y+u.oy}),P0={a:0};
  R17E({update(){return D.on;},draw(){if(P0.a>0){const p=potP();r17Inkpot(p.x,p.y,1.5,P0.a);}}});
  await tween(300,k=>{P0.a=k;});await dimTo(.42,'30,25,20',260);
  // 1) ír: az ecset (a keze) vonásról vonásra húzza fel a jelet
  const h0=hand(),gx=h0.x-60,gy=h0.y-150,strokes=[];const Br={x:h0.x,y:h0.y,on:true};
  R17E({update(){return D.on;},draw(){ctx.save();ctx.lineCap='round';ctx.lineJoin='round';for(const s of strokes){const n=s.pts.length;for(let i=1;i<n;i++){const q=i/n,w=s.w*(.55+.9*Math.sin(Math.min(1,q*1.1)*Math.PI*.9));ctx.strokeStyle=`rgba(10,8,14,${.95*s.a})`;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(s.pts[i-1].x,s.pts[i-1].y);ctx.lineTo(s.pts[i].x,s.pts[i].y);ctx.stroke();}
      // száraz ecsetszálak
      ctx.strokeStyle=`rgba(40,36,50,${.5*s.a})`;ctx.lineWidth=1;for(let b=-2;b<=2;b++){ctx.beginPath();s.pts.forEach((p,i)=>{const yy=p.y+b*s.w*.18;i?ctx.lineTo(p.x,yy):ctx.moveTo(p.x,yy);});ctx.stroke();}}
    if(Br.on){ctx.save();ctx.translate(Br.x,Br.y);ctx.rotate(-.6);ctx.fillStyle='#7a4a1a';ctx.fillRect(-3,0,6,60);ctx.fillStyle='#e8dcc0';ctx.fillRect(-4,-4,8,8);ctx.fillStyle='#120e14';ctx.beginPath();ctx.moveTo(-5,-2);ctx.quadraticCurveTo(0,-26,0,-30);ctx.quadraticCurveTo(0,-26,5,-2);ctx.fill();ctx.restore();}ctx.restore();}});
  const hs=h0;for(const sp of R17_GLYPH){const s={pts:[],w:14,a:1};strokes.push(s);const a0=sp[0];await tween(140,k=>{Br.x=hs.x+(gx+a0[0]-hs.x)*k;Br.y=hs.y+(gy+a0[1]-hs.y)*k;u.lean=.05*k;});sfx('whoosh');
    for(let j=1;j<sp.length;j++){const A0=sp[j-1],B0=sp[j];await tween(230,k=>{const e=easeIO(k),x=gx+A0[0]+(B0[0]-A0[0])*e,y=gy+A0[1]+(B0[1]-A0[1])*e;Br.x=x;Br.y=y;s.pts.push({x,y});u.lean=.05+.05*Math.sin(k*Math.PI);
      if(Math.random()<.3)part({x,y,vx:rnd(-15,15),vy:rnd(20,60),g:400,life:.6,size:rnd(2,4),rgb:'12,10,18',add:false,shape:'drop'});});}}
  Br.on=false;u.lean=0;sfx('dark');flash('60,20,60',.25,.12);
  // a jel felizzik, és beleolvad a tintatartóba
  await tween(260,k=>{for(const s of strokes)s.w=14+6*Math.sin(k*Math.PI);});const p0=potP();
  await tween(420,k=>{for(const s of strokes){s.a=1-k;for(const p of s.pts){p.x+=(p0.x-p.x)*.12;p.y+=(p0.y-60-p.y)*.12;}}});strokes.length=0;
  // 2) a festett sárkány kiáramlik a tintatartóból (a nyakától nő ki), 3) spirálban felfelé kering a hősök körül, 4) összeszorít, 5) visszacsusszan az üvegcsébe
  const im=R17I.inkdragon,DW=470,{mx}=grp(al),minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5)),gy2=Math.max(...al.map(t=>t.y+t.oy)),top2=Math.min(...al.map(topY));
  const RX=Math.min(170,(maxX-minX)/2+60),RY=44,cxs=Math.max(RX+40,(minX+maxX)/2),G={x:p0.x,y:p0.y-50,s:.05,ang:-1.2,flip:false,a:1,b:false,on:true,wob:0},rib=[];
  // tus-szalag: a sárkány után húzódó, elmosódó tuscsík (ez rajzolja a spirált a hősök körül)
  R17E({update(){if(G.on){rib.unshift({x:G.x,y:G.y,b:G.b,a:1});if(rib.length>70)rib.pop();}for(const r of rib)r.a-=.012;return G.on||rib.some(r=>r.a>0);},
    draw(){ctx.save();ctx.lineCap='round';for(const pass of [1,0])for(let i=1;i<rib.length;i++){const r=rib[i],q=rib[i-1];if((r.b?1:0)!==pass||r.a<=0)continue;const f=1-i/rib.length;ctx.strokeStyle=`rgba(12,10,18,${(r.b?.35:.7)*r.a*f})`;ctx.lineWidth=46*f+4;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(r.x,r.y);ctx.stroke();}ctx.restore();
      if(!im||G.a<=0)return;const w=DW*G.s,h=w*im.height/im.width;ctx.save();ctx.globalAlpha=G.a*(G.b?.6:1);ctx.translate(G.x,G.y);ctx.rotate(G.ang);ctx.scale(G.flip?-1:1,1);
      // a fej (a kép bal széle) legyen elöl: a kép kb. 15%-ánál van a fej
      const N=24;for(let i=0;i<N;i++){const sx=i*im.width/N,dx=-w*.15+i*w/N,wy=Math.sin(T*9-i*.5)*h*.06*G.wob;ctx.drawImage(im,sx,0,im.width/N+1,im.height,dx,-h/2+wy,w/N+1,h);}ctx.restore();}});
  sfx('growl');
  await tween(500,k=>{G.s=.05+.95*easeIO(k);G.y=p0.y-50-70*k;G.ang=-1.2+.6*k;if(Math.random()<.6)part({x:p0.x+rnd(-10,10),y:p0.y-60,vx:rnd(-40,40),vy:-rnd(60,160),life:.6,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});});
  // ív a hősök elé (a fej megy elöl: a kép balra néz, a mozgás balra tart, így nem kell tükrözni)
  const st0={x:G.x,y:G.y},ent={x:cxs+RX,y:gy2-10};let lx=G.x,ly=G.y;const aim=()=>{const dx=G.x-lx,dy=G.y-ly;if(Math.hypot(dx,dy)>.5){G.flip=dx>0;G.ang=G.flip?Math.atan2(dy,dx)*-1*-1:Math.atan2(-dy,-dx);if(G.flip)G.ang=Math.atan2(dy,dx);}lx=G.x;ly=G.y;};
  G.wob=1;await tween(650,k=>{const e=easeIO(k);G.x=st0.x+(ent.x-st0.x)*e;G.y=st0.y+(ent.y-st0.y)*e-Math.sin(k*Math.PI)*180;aim();});
  // spirál alulról felfelé, 2,5 kör: hátul halványabb (a hősök mögött), elöl teljes
  const turns=2.5;const bz=setInterval(()=>sfx('whoosh'),320);
  await tween(1800,k=>{const th=k*turns*Math.PI*2,h=gy2-10-(gy2-top2+10)*k;G.x=cxs+Math.cos(th)*RX;G.y=h+Math.sin(th)*RY;G.b=Math.sin(th)<0;aim();G.s=.62-.08*k;});clearInterval(bz);G.b=false;
  // összeszorít: a szalag-gyűrűk összehúzódnak, a sárkány fölül megfeszül
  sfx('growl');const sq=rib.map(r=>({r,x0:r.x}));await tween(380,k=>{const e=Math.sin(k*Math.PI*.5);for(const q of sq)q.r.x=cxs+(q.x0-cxs)*(1-.3*e);G.s=.54+.1*e;shake(4);});
  for(const t of al){if(!t.alive)continue;t.hurt=.5;sfx('bite');splat(cx(t),midY(t),['12,10,18','30,28,40'],22,360,'drop');soundBlast(cx(t),midY(t),'60,50,80',150,360);hit(u,t,sk);}hitStop(120);shake(16);
  await wait(320);
  // vissza a tintatartóba
  const s1={x:G.x,y:G.y};await tween(800,k=>{const e=easeIO(k),pt=potP();G.x=s1.x+(pt.x-s1.x)*e;G.y=s1.y+(pt.y-50-s1.y)*e-Math.sin(k*Math.PI)*170;aim();});
  await tween(380,k=>{G.s=.97*(1-k)+.05;G.y=potP().y-50+30*k;G.ang=-1.2;});G.a=0;G.on=false;await wait(250);
  sfx('dark');await tween(260,k=>{P0.a=1-k;});await dimTo(0,null,300);await bodySettle(u);}finally{D.on=false;rel();}};

// ---- Vattacukor-bárány – Édes álom: az alvó körül nem pamacsok, hanem kis rózsaszín bárányok ugrálnak körbe-körbe
{const deS2=drawEntity;drawEntity=function(e){if(!e||!e._pinkSleep||FRONT_DRAW)return deS2.apply(this,arguments);const pk=e._pinkSleep;e._pinkSleep=false;let r;try{r=deS2.apply(this,arguments);}finally{e._pinkSleep=pk;}
    if(!e.alive||!e.st||!e.st.sleep){e._pinkSleep=false;return r;}
    const x=cx(e),gy=e.y+e.oy,yc=topY(e)-10,R=Math.max(60,e.w*e.scale*.75);ctx.save();ctx.globalAlpha=.35;const g=ctx.createRadialGradient(x,yc,4,x,yc,R);g.addColorStop(0,'rgba(255,200,230,.9)');g.addColorStop(1,'rgba(255,200,230,0)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,yc,R*1.1,R*.5,0,0,6.29);ctx.fill();ctx.restore();
    const n=4,list=[];for(let i=0;i<n;i++){const a=T*1.4+i/n*6.283,px=x+Math.cos(a)*R,py=yc+Math.sin(a)*R*.32,hop=Math.abs(Math.sin(T*6+i*1.7))*12;list.push({a,px,py:py-hop,front:Math.sin(a)>0,dir:-Math.sin(a)});}
    list.sort((p,q)=>p.py-q.py);for(const s of list){ctx.save();ctx.globalAlpha=s.front?1:.6;ctx.translate(s.px,s.py);if(s.dir>0)ctx.scale(-1,1);r15Sheep(0,0,.62,T*8,false);ctx.restore();}
    if(Math.random()<.02)popLabel(e,'Zzz','#ffd6ef');return r;};}

// ---- Morgána – Átok: Hádész felemelkedik és megidézi – a célpont körül bezáródik az eredeti lánc-kör, és felülről ráereszkedik, ráharap az óriási kísértetkoponya
A.hex=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;spellsReady();await dimTo(.65,'20,0,30',250);u.pose='cast';await bodyWind(u,220,.08);sfx('dark');
  const px=cx(t)+60,py=t.y+t.oy+10,P={a:0,t:0};
  effects.unshift({update(dt){P.t+=dt;return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.translate(px,py);ctx.scale(1,.3);ctx.globalCompositeOperation='lighter';glow(0,0,190*P.a,'150,60,240',.55*P.a);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<3;i++){ctx.rotate(P.t*(1.5+i));ctx.fillStyle=`rgba(${20+i*20},0,${40+i*30},${.6*P.a})`;ctx.beginPath();ctx.ellipse(0,0,(140-i*35)*P.a,(120-i*30)*P.a,0,0,6.29);ctx.fill();}
    ctx.fillStyle=`rgba(5,0,10,${.95*P.a})`;ctx.beginPath();ctx.arc(0,0,70*P.a,0,6.29);ctx.fill();ctx.restore();}});
  await tween(300,k=>{P.a=k;});rumble(.8,4);
  const h=handPos(u);u.pose='attack';bodyStrike(u,160,.14);await Promise.all([0,1,2,3,4,5].map(i=>wait(i*80).then(()=>flyObj({x:h.x,y:h.y},{x:px+rnd(-30,30),y:py-6},380,(x,y,r,k)=>qBone(x,y,r,1.3*(1-k*.4)),{spin:rnd(8,14),arc:rnd(90,150)})).then(()=>{sfx('click');for(let j=0;j<5;j++)part({x:px+rnd(-20,20),y:py-6,vx:rnd(-40,40),vy:-rnd(60,140),life:.6,size:rnd(3,6),rgb:pick(['170,90,255','90,40,150'])});})));
  sfx('dark');flash('120,40,200',.3,.15);rumble(1.2,7);
  const Hd=Math.max(300,bigOf(t)*1.9),g=godShow('hades',px,py,Hd,99,'170,90,255'),yEnd=midY(t)-50;g.y=py+Hd*.2;
  for(let i=0;i<30;i++)part({x:px+rnd(-90,90),y:py-rnd(0,30),vx:rnd(-20,20),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(14,26),grow:30,rgb:pick(['40,15,60','70,30,100']),add:false,shape:'dsmoke'});
  await tween(1150,k=>{g.y=py+Hd*.2-(py+Hd*.2-yEnd)*easeIO(k);});await wait(300);
  // Hádész keze felizzik: innen jön a varázslat
  const hx=px-Hd*.18,hy=yEnd-Hd*.25;sfx('dark');R17E({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(hx,hy,90*(1-this.t/.6),'190,110,255',.85);ctx.restore();}});
  // az eredeti: lánc-kör zárul az áldozat köré…
  const x=cx(t),y=midY(t),big=Math.max(210,t.h*t.scale*1.7);
  if(!fxHold('chains',x,y+10,{h:big*1.15,life:1.6,pop:true,pulse:.03}))rune(t,'190,90,255');ring(x,t.y+t.oy,'190,90,255',120,.6);sfx('click');
  for(let i=0;i<34;i++){const a=rnd(0,Math.PI*2),r=rnd(110,190),life=rnd(.35,.55);part({x:x+Math.cos(a)*r,y:y+Math.sin(a)*r,vx:-Math.cos(a)*r/life,vy:-Math.sin(a)*r/life,life,size:rnd(2,5),rgb:pick(['190,90,255','120,40,200','255,180,255']),shape:'streak'});}
  await wait(380);
  // …fölé óriási kísértetkoponya ereszkedik és ráharap
  if(FX_IMG.curse){R17E({t:0,update(dt){this.t+=dt;return this.t<1.05;},draw(){const tt=this.t,r=Math.min(1,tt/.3),e=r*r,a=Math.min(1,tt/.1)*Math.min(1,(1.05-tt)/.3),im=FX_IMG.curse,s=(1.5-.5*e)*(1+.04*Math.sin(tt*20));
    ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(x,y-150*(1-e)-10);ctx.scale(s,s);ctx.drawImage(im,-big/2,-big/2,big,big);ctx.restore();}});}
  else fxImage('dark',x,y,{size:big*1.3,life:.8,grow:.4});
  await wait(300);sfx('bite');flash('200,120,255',.35,.2);hitStop(70);shake(10);punch(x,y,.04);hit(u,t,sk);
  for(let i=0;i<26;i++){const a=rnd(0,Math.PI*2),v=rnd(150,420);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.35,.7),size:rnd(2,5),rgb:pick(['190,90,255','90,30,150']),drag:3,shape:pick(['star','dot'])});}
  await wait(500);await tween(700,k=>{g.y=yEnd+(py+Hd*.3-yEnd)*easeIO(k);});g.dead=true;P.done=true;await tween(300,k=>{P.a=1-k;});P.a=0;await bodySettle(u);u.pose='idle';await dimTo(0,null,300);};
NOFX.add('hex');

// ---- Cerberus: Morgána helyén nem maradnak lángok; harapás (fogsorok csattannak, nem karmolás); a föld lila-feketén izzani kezd, és lángoszlopok törnek fel; Cerberus visszatér és eltűnik
{const deP2=drawEntity;drawEntity=function(e){if(e&&e.possessed&&(e.alpha!=null&&e.alpha<.3)){const p=e.possessed;e.possessed=false;try{return deP2.apply(this,arguments);}finally{e.possessed=p;}}return deP2.apply(this,arguments);};}
function r17Bite(x,y,sz){const st={t:0};sfx('bite');R17E({update(dt){st.t+=dt;return st.t<.5;},draw(){const k=Math.min(1,st.t/.12),a=st.t<.25?1:1-(st.t-.25)/.25,gap=sz*.5*(1-k);ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);
  for(const s of [-1,1]){ctx.save();ctx.translate(0,s*(gap+4));ctx.fillStyle='rgba(40,0,50,.85)';ctx.beginPath();ctx.ellipse(0,s*10,sz*.62,16,0,0,6.29);ctx.fill();ctx.fillStyle='#f6f0ff';ctx.strokeStyle='#3a1050';ctx.lineWidth=1.5;
    for(let i=0;i<7;i++){const tx=-sz*.5+i*sz/6.2,L=(i===1||i===5)?28:16;ctx.beginPath();ctx.moveTo(tx-6,0);ctx.lineTo(tx,-s*L);ctx.lineTo(tx+6,0);ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}
  ctx.globalCompositeOperation='lighter';glow(0,0,sz*.6*k,'255,80,170',.5*a);ctx.restore();}});}
A.cerberus=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u._cerb=false;if(!al.length)return;const im=FX_IMG.cerberus;await dimTo(.8,'20,0,25',300);sfx('dark');
  const C={x:cx(u),y:u.y+u.oy,a:0,s:.3,open:0,on:true,t:0},Hh=u.h*u.scale*1.25;
  R17E({update(dt){C.t+=dt;return C.on;},draw(){if(!im||C.a<=0)return;const H2=Hh*C.s,W2=H2*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(C.x,C.y);ctx.scale(-1,1);
      ctx.translate(0,Math.sin(C.t*14)*3*C.open);ctx.rotate(-.06*C.open);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.22+.18*Math.sin(C.t*8);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.restore();
      ctx.save();ctx.globalCompositeOperation='lighter';for(const [fu,fv] of [[.06,.2],[.04,.5],[.2,.45]]){const ex=C.x+(W2/2-fu*W2),ey=C.y-H2+fv*H2;glow(ex,ey,14+10*C.open,'255,60,160',.6*C.a);}ctx.restore();}});
  // átváltozás Morgána helyén (rövid), majd a lángok azonnal elhalnak
  for(let i=0;i<22;i++)darkFlame({x:cx(u)+rnd(-40,40),y:u.y+u.oy-rnd(0,u.h*u.scale),vx:rnd(-50,50),vy:-rnd(80,200),life:rnd(.35,.55),size:rnd(14,24)});
  rumble(1.2,8);await tween(450,k=>{u.alpha=1-k;});u.alpha=0;sfx('wail');flash('150,60,255',.4,.2);await tween(450,k=>{C.a=k;C.s=.3+.7*eOutBack(k);});await wait(200);
  sfx('growl');sfx('wail');shake(12);soundBlast(C.x+90,C.y-Hh*.75,'200,80,255',300,600);await tween(350,k=>{C.open=Math.sin(k*Math.PI);});
  // ráront és megharapja (három fej, három harapás – fogsorok)
  const x0=C.x;for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){if(!t.alive)continue;const tx=cx(t)-Hh*.55,sx=C.x;sfx('whoosh');await tween(260,k=>{C.x=sx+(tx-sx)*easeIO(k);C.y=u.y+u.oy+(t.y+t.oy-u.y-u.oy)*easeIO(k)-Math.sin(k*Math.PI)*50;});
    for(let b=0;b<3;b++){C.open=1;await wait(70);C.open=0;r17Bite(cx(t)+rnd(-14,14),midY(t)-b*20,Math.max(90,t.w*t.scale*.8));shake(9);hitStop(50);t.hurt=.35;for(let i=0;i<6;i++)part({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-30,30),vx:rnd(-150,150),vy:rnd(-150,60),life:.4,size:rnd(3,5),rgb:pick(['255,80,160','255,255,255']),shape:'star'});await wait(150);}}
  // vissza Morgána helyére; közben a föld az ellenségek alatt lila-feketén izzani kezd
  const bx=C.x;const G={a:0,on:true},cols=al.map(t=>({x:cx(t),gy:t.y+t.oy,r:Math.max(70,t.w*t.scale*.75)}));
  R17E({update(){return G.on;},draw(){if(G.a<=0)return;for(const c of cols){ctx.save();ctx.translate(c.x,c.gy);ctx.scale(1,.3);const g=ctx.createRadialGradient(0,0,4,0,0,c.r*1.4);g.addColorStop(0,`rgba(200,110,255,${.9*G.a})`);g.addColorStop(.35,`rgba(110,30,190,${.8*G.a})`);g.addColorStop(.75,`rgba(30,0,40,${.75*G.a})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,c.r*1.4,0,6.29);ctx.fill();
      ctx.strokeStyle=`rgba(230,170,255,${.9*G.a})`;ctx.lineWidth=3;for(let i=0;i<7;i++){const a=i/7*6.283+c.x;ctx.beginPath();ctx.moveTo(0,0);let px=0,py=0;for(let j=1;j<5;j++){px=Math.cos(a+Math.sin(j*3+i)*.3)*c.r*1.2*j/4;py=Math.sin(a+Math.sin(j*3+i)*.3)*c.r*1.2*j/4;ctx.lineTo(px,py);}ctx.stroke();}ctx.restore();}}});
  sfx('rock');rumble(1,6);await Promise.all([tween(420,k=>{C.x=bx+(x0-bx)*easeIO(k);C.y=u.y+u.oy-Math.sin(k*Math.PI)*40;}),tween(700,k=>{G.a=k;})]);C.open=1;sfx('growl');
  // lángoszlopok törnek fel a földből
  const pim=R17I.firepillar;sfx('fire');sfx('boom');flash('170,80,255',.45,.2);shake(20);hitStop(100);
  for(const c of cols){const P2={k:0,t:0};R17E({update(dt){P2.t+=dt;P2.k=Math.min(1,P2.t/.25);if(!pim&&P2.t<1)for(let i=0;i<2;i++)darkFlame({x:c.x+rnd(-c.r*.4,c.r*.4),y:c.gy,vx:rnd(-20,20),vy:-rnd(300,500),life:rnd(.5,.8),size:rnd(18,30)});return P2.t<1.3;},
      draw(){if(!pim)return;const a=P2.t<1?1:1-(P2.t-1)/.3,w=c.r*2.4,sy=P2.k*(1+.05*Math.sin(P2.t*30));ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';ctx.translate(c.x,c.gy+10);ctx.scale(1,sy);ctx.drawImage(pim,-w/2,-w*pim.height/pim.width,w,w*pim.height/pim.width);ctx.restore();}});}
  await wait(250);for(const t of al){if(!t.alive)continue;soundBlast(cx(t),midY(t),'190,80,255',200,450);t.hurt=.5;toss(t,60,380);hit(u,t,sk);}await wait(800);G.on=false;C.open=0;
  // visszaváltozik
  await tween(400,k=>{C.a=1-k;C.s=1-.5*k;u.alpha=k;});u.alpha=1;C.on=false;u.pose='idle';await dimTo(0,null,350);};
NOFX.add('cerberus');

// ---- Grog – Földrepesztés: csak sok apró, kidolgozott kőtüske tör fel egymás után a repedés mentén (nincs nagy kitörés)
function r17Spike(x,gy,h,w,seed,k){if(k<=0)return;ctx.save();ctx.translate(x,gy);ctx.scale(1,k);const R=n=>{const v=Math.sin(seed*91.7+n*13.3)*43758.5;return v-Math.floor(v);};
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.beginPath();ctx.ellipse(0,2,w*.8,5,0,0,6.29);ctx.fill();
  const pts=[[-w/2,0],[-w*.32,-h*.45+R(1)*8],[-w*.12+R(2)*6,-h],[w*.08,-h*.7+R(3)*8],[w*.3,-h*.5],[w/2,0]];
  const g=ctx.createLinearGradient(-w/2,0,w/2,-h);g.addColorStop(0,'#5a4a3c');g.addColorStop(.5,'#8a7a66');g.addColorStop(1,'#bfb09a');ctx.fillStyle=g;ctx.beginPath();pts.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.closePath();ctx.fill();
  ctx.strokeStyle='#2a2018';ctx.lineWidth=1.6;ctx.stroke();ctx.fillStyle='rgba(255,255,255,.22)';ctx.beginPath();ctx.moveTo(pts[1][0],pts[1][1]);ctx.lineTo(pts[2][0],pts[2][1]);ctx.lineTo(pts[2][0]+3,pts[1][1]+4);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(40,30,20,.6)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-w*.1,-h*.2);ctx.lineTo(w*.05,-h*.5);ctx.stroke();ctx.restore();}
A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const {gy}=grp(al);
  await tween(300,k=>{u.jump=Math.sin(k*Math.PI)*80;u.lean=-.1*Math.sin(k*Math.PI);});u.jump=0;u.lean=0;
  sfx('rock');shake(12);hitStop(70);const x0=cx(u)+40,x1=Math.max(...al.map(cx))+90;groundCrack((x0+x1)/2,gy+6,'120,90,60',x1-x0);dustWave(x0,u.y+u.oy);
  const n=34,spikes=[];for(let i=0;i<n;i++){const x=x0+(x1-x0)*(i+.5)/n+rnd(-8,8);spikes.push({x,h:rnd(22,42),w:rnd(14,24),seed:i+rnd(0,1),k:0,d:i*45+rnd(0,20),t:0});}
  const st={t:0,on:true},hitDone=new Set();
  R17E({update(dt){st.t+=dt*1000;for(const s of spikes){if(st.t<s.d)continue;const was=s.k;s.t+=dt;s.k=s.t<.12?eOutBack(s.t/.12):s.t<.9?1:Math.max(0,1-(s.t-.9)/.25);
        if(was===0&&s.k>0){if(Math.random()<.5)sfx('rock');for(let j=0;j<4;j++)part({x:s.x+rnd(-8,8),y:gy+rnd(-2,4),vx:rnd(-80,80),vy:rnd(-260,-120),g:900,life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});
          puffs(s.x,gy-4,1,['170,150,120'],[10,16],{w:14,up:40});shake(3);for(const t of al)if(!hitDone.has(t)&&Math.abs(cx(t)-s.x)<40){hitDone.add(t);toss(t,40,320);t.hurt=.45;hit(u,t,sk);}}}
      return st.on;},draw(){const L=spikes.slice().sort((a,b)=>a.seed-b.seed);for(const s of L)r17Spike(s.x,gy+6,s.h,s.w,s.seed,s.k);}});
  await wait(n*45+1300);st.on=false;for(const t of al)if(!hitDone.has(t)&&t.alive)hit(u,t,sk);u.pose='idle';};

// ---- Espresszó idézés: a láng PONTOSAN a szájából indul (rácson lemérve), és nem marad tűz a földön
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){es.img=()=>ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
  es.run=async(P,S0)=>{const im=ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;const x0=S0.x,s0=S0.s||1,m=()=>im?sumPt(es,S0,im,.165,.245):{x:S0.x+120,y:S0.y-200};
    sfx('fire');const G={a:0,on:true};R17E({update(){if(G.on&&Math.random()<.8){const p=m(),a=rnd(0,6.28),r=rnd(30,80);part({x:p.x+Math.cos(a)*r,y:p.y+Math.sin(a)*r,vx:-Math.cos(a)*r*2.4,vy:-Math.sin(a)*r*2.4,life:.4,size:rnd(2,4),rgb:pick(['255,200,90','255,120,40'])});}return G.on;},draw(){const p=m();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,24+40*G.a,'255,140,40',.7*G.a);glow(p.x,p.y,10+12*G.a,'255,240,200',.9*G.a);ctx.restore();}});
    await tween(520,k=>{const e=easeIO(k);S0.x=x0-30*e;S0.s=s0*(1+.06*e);G.a=k;});rumble(2,12);flash('255,160,60',.45,.25);sfx('fire');sfx('boom');
    tween(180,k=>{S0.x=x0-30+70*eOutBack(k);S0.s=s0*(1.06-.04*k);});const bz=setInterval(()=>sfx('fire'),280);const scorch=[];
    await fireBreath(m(),fs,1,{dur:2000,speed:1100,n:34,onHit:t=>{if(!t.alive)return;shake(10);if(!scorch.includes(t)){scorch.push(t);hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}}});
    clearInterval(bz);G.on=false;for(const t of fs)if(t.alive&&!scorch.includes(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    await tween(300,k=>{S0.x=x0+40*(1-k);S0.s=s0*(1.02-.02*k);});await wait(300);};}}
// a lángcsóva a száj elől induljon: az első lángrészecskék kicsik, és nem nőnek vissza a fej felé
{const fb2=fireBreath;fireBreath=function(o,ts,dir,o2={}){const p0=part;part=function(q){if(q&&q.shape==='fire'&&q.rgb==='255,160,40'&&Math.hypot((q.x||0)-o.x,(q.y||0)-o.y)<8){q.size=Math.min(q.size,8);q.grow=Math.min(q.grow||0,40);}return p0(q);};
  const r=fb2.apply(this,arguments);part=p0;return r;};}

// ---- Árny-csapat idézés: mindegyik árnymás a SAJÁT támadását végzi a helyéről (nincs ugráló íjász): Zordon árnytűzgolyó, Morgána árnygömb, Lili árnycsillagok, Grog ugró fejszecsapás, Jázmin árnynyíl; végül közös árnyrobbanás
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>null;
  sh.run=async(P,S0)=>{await dimTo(.7,'15,5,30',300);const hs=S.heroes.filter(h=>h.alive);const shades=hs.map(h=>({h,x:h.x+70,y:h.y,a:0,rise:0,jy:0,rot:0}));const st={on:true};
   R17E({update(){if(st.on)for(const q of shades)if(q.a>0&&Math.random()<.5)part({x:q.x+rnd(-30,30),y:q.y-rnd(0,q.h.h*q.h.scale),vx:rnd(-10,10),vy:-rnd(30,70),life:rnd(.6,1),size:rnd(12,22),grow:20,rgb:'40,10,70',add:false,shape:'dsmoke'});return st.on;},
     draw(){for(const q of shades){if(q.a<=0)continue;ctx.save();ctx.globalAlpha=.75*q.a;ctx.translate(q.x,q.y+4);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,4,0,0,70);g.addColorStop(0,'rgba(10,0,25,.95)');g.addColorStop(1,'rgba(60,20,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,70,0,6.29);ctx.fill();ctx.restore();
       const sp=ENEMY_SPR[q.h.type+(q.pose||'-attack')]||ENEMY_SPR[q.h.type+'-attack']||ENEMY_SPR[q.h.type];if(!sp)continue;const Hh=q.h.h*(q.h.scale0||q.h.scale)*1.05,w=Hh*sp.width/sp.height,vis=Hh*q.rise;
       ctx.save();ctx.translate(q.x,q.y-q.jy);ctx.rotate(q.rot);ctx.translate(-q.x,-q.y);ctx.beginPath();ctx.rect(q.x-w,q.y-Hh-40,w*2,Hh+40+(q.jy>0?q.jy:0));ctx.clip();
       for(const [ox,oy] of [[-2,0],[2,0],[0,-2],[0,2]]){ctx.globalAlpha=q.a*.6;ctx.drawImage(tintSpr(sp,'rgb(200,140,255)',1),q.x-w/2+ox,q.y-vis+oy,w,Hh);}ctx.globalAlpha=q.a;ctx.drawImage(tintSpr(sp,'rgb(40,15,80)',.7),q.x-w/2,q.y-vis,w,Hh);ctx.restore();}}});
   sfx('dark');await tween(300,k=>{for(const q of shades)q.a=k;});await tween(500,k=>{for(const q of shades)q.rise=easeIO(k);});
   const hand=q=>{const p=handPos(q.h);return {x:p.x+(q.x-q.h.x),y:p.y};};
   const orb=(q,t,rgb,size,draw)=>flyObj(hand(q),{x:cx(t),y:midY(t)},380,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,size*1.6,rgb,.8);ctx.restore();if(draw)draw(x,y,r);else{ctx.save();ctx.fillStyle='#14061f';ctx.beginPath();ctx.arc(x,y,size*.5,0,6.29);ctx.fill();ctx.restore();}darkFlame({x,y,vx:rnd(-30,30),vy:rnd(-30,30),life:.3,size:size*.4});},{arc:40,spin:8});
   const ATT={
     wizard:async(q,t)=>{q.pose='-cast';sfx('fire');await orb(q,t,'170,80,255',34);bigBoom(cx(t),midY(t),.6);},
     witch:async(q,t)=>{q.pose='-cast';sfx('dark');await orb(q,t,'200,60,200',28);soundBlast(cx(t),midY(t),'170,60,220',170,380);},
     fairy:async(q,t)=>{q.pose='-cast';sfx('holy');await Promise.all([0,1,2].map(i=>wait(i*90).then(()=>orb(q,t,'190,140,255',16,(x,y,r)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#2a0e44';ctx.strokeStyle='#d9b8ff';ctx.lineWidth=2;ctx.beginPath();for(let j=0;j<10;j++){const rr=j%2?6:15,an=j/10*6.283;ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}))));},
     orc:async(q,t)=>{q.pose='-attack';const x0=q.x,y0=q.y,tx=cx(t)-t.w*t.scale*.5-50;sfx('whoosh');await tween(300,k=>{const e=easeIO(k);q.x=x0+(tx-x0)*e;q.y=y0+(t.y+t.oy-y0)*e;q.jy=Math.sin(k*Math.PI*.5)*120;q.rot=-.2*k;});
       await tween(130,k=>{q.jy=120*(1-k*k);q.rot=-.2+.5*k;});q.jy=0;sfx('rock');shake(14);groundCrack(cx(t),t.y+t.oy,'150,90,220',160);soundBlast(cx(t),midY(t),'150,80,255',190,400);await wait(120);
       await tween(260,k=>{const e=easeIO(k);q.x=tx+(x0-tx)*e;q.y=t.y+t.oy+(y0-t.y-t.oy)*e;q.rot=.3*(1-k);q.jy=Math.sin(k*Math.PI)*50;});q.rot=0;q.jy=0;},
     monk:async(q,t)=>{q.pose='-attack';sfx('whoosh');const a=hand(q);await flyObj(a,{x:cx(t),y:midY(t)},260,(x,y)=>{const an=Math.atan2(midY(t)-a.y,cx(t)-a.x);ctx.save();ctx.translate(x,y);ctx.rotate(an);ctx.globalCompositeOperation='lighter';glow(0,0,26,'170,90,255',.8);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#14061f';ctx.fillRect(-40,-2.5,44,5);ctx.beginPath();ctx.moveTo(4,-8);ctx.lineTo(22,0);ctx.lineTo(4,8);ctx.fill();ctx.restore();darkFlame({x:x-20*Math.cos(an),y,vx:-60,vy:0,life:.25,size:8});});}};
   for(const q of shades){const t=pick(foesAlive());if(!t)break;await (ATT[q.h.type]||ATT.wizard)(q,t);if(!t.alive)continue;shake(9);hitStop(40);t.hurt=.35;hit(q.h,t,{...ATTACKS[q.h.type],name:'Árnycsapás',pow:2.2,anim:'midnight'});await wait(120);}
   const fs=foesAlive();if(fs.length){const {mx,my}=grp(fs);sfx('dark');sfx('boom');const B={k:0,on:true};
     R17E({update(){return B.on;},draw(){if(B.k<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,my,320*B.k,'140,60,240',.6*(1-B.k*.5));ctx.restore();}});
     for(let i=0;i<4;i++)setTimeout(()=>{for(let j=0;j<7;j++)darkFlame({x:mx+rnd(-200,200),y:my+rnd(-40,80),vx:rnd(-30,30),vy:-rnd(80,180),life:rnd(.5,.8),size:rnd(18,30)});},i*80);
     flash('120,40,200',.5,.2);shake(20);hitStop(120);await tween(600,k=>{B.k=k;});B.on=false;for(const t of fs){t.hurt=.5;toss(t,50,380);hit(P,t,{name:'Árnyrobbanás',kind:'mag',pow:1.1,elem:'dark',tgt:'enemies',anim:'midnight'});}}
   await tween(400,k=>{for(const q of shades){q.rise=1-k;q.a=1-k*.5;}});st.on=false;await dimTo(0,null,300);};}}

// ---- Páros támadások élethű képekkel (ha a kép még nincs betöltve, a korábbi rajzolt változat fut)
{const P0=R16P['Villámátok'];R16P['Villámátok']=async(A1,B1,al,sk,p)=>{const im=R17I.stormskull;if(!im)return P0(A1,B1,al,sk,p);
  await Promise.all([r16Raise(A1,'190,110,255'),r16Raise(B1,'190,110,255')]);const {mx}=grp(al),Cl={a:0,s:.7,on:true,fl:0};sfx('thunder');rumble(1.5,6);
  R17E({update(){Cl.fl=Math.max(0,Cl.fl-.08);return Cl.on;},draw(){if(Cl.a<=0)return;r17Draw(im,mx,120,W*.95*Cl.s,{a:Cl.a});if(Cl.fl>0)r17Draw(im,mx,120,W*.95*Cl.s,{a:Cl.fl*.8,add:true});}});
  const up=setInterval(()=>{for(const h of [A1,B1]){const a=handPos(h);part({x:a.x,y:a.y,vx:(mx-a.x)*1.2,vy:(120-a.y)*1.2,life:.6,size:rnd(3,6),rgb:pick(['200,120,255','255,255,255']),shape:'star'});}},40);
  await tween(900,k=>{Cl.a=k;Cl.s=.7+.3*easeIO(k);});clearInterval(up);sfx('growl');
  for(let r=0;r<3;r++)for(const t of al){if(!t.alive)continue;const sx=mx+rnd(-260,260);R17E({t:0,update(dt){this.t+=dt;return this.t<.25;},draw(){r16Bolt(sx,170,cx(t)+rnd(-15,15),midY(t),'190,110,255',14);r16Bolt(sx,170,cx(t)+rnd(-40,40),t.y+t.oy,'230,170,255',5);}});
    Cl.fl=1;sfx('thunder');flash('210,150,255',.35,.1);shake(12);hitStop(50);t.hurt=.35;sparks(cx(t),midY(t),['220,170,255','255,255,255'],22,480);groundCrack(cx(t),t.y+t.oy,'190,110,255',90);if(r===2){rune(t,'190,90,255');hit(A1,t,sk);}await wait(150);}
  await tween(500,k=>{Cl.a=1-k;});Cl.on=false;r16Lower(A1);r16Lower(B1);};}
{const P0=R16P['Csillagözön'];R16P['Csillagözön']=async(A1,B1,al,sk,p)=>{const im=R17I.constellation;if(!im)return P0(A1,B1,al,sk,p);
  const sc=sceneLayer(()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(6,8,34,.85)');g.addColorStop(1,'rgba(30,20,70,.5)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<110;i++){ctx.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(T*3+i)})`;ctx.fillRect((i*173)%W,(i*67)%320,2,2);}});await sc.show(400);
  await Promise.all([r16Raise(A1,'255,240,180'),r16Raise(B1,'255,240,180')]);const {mx}=grp(al),C={a:0,on:true};sfx('holy');
  R17E({update(){return C.on;},draw(){if(C.a>0)r17Draw(im,mx,150,W*.9,{a:C.a*(.85+.15*Math.sin(T*6)),add:true});}});
  for(let i=0;i<14;i++){const h=i%2?A1:B1,a=handPos(h);flyObj(a,{x:mx+rnd(-300,300),y:rnd(60,240)},360,(x,y)=>{part({x,y,vx:0,vy:0,life:.35,size:3,rgb:'255,240,200',shape:'star'});},{arc:50});await wait(50);}
  await tween(900,k=>{C.a=k;});await wait(300);
  for(let i=0;i<14;i++){const t=al[i%al.length];if(!t.alive)continue;const s={x:mx+rnd(-320,320),y:rnd(60,220)};sfx('whoosh');
    flyObj(s,{x:cx(t)+rnd(-30,30),y:midY(t)},300,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'255,220,150',.9);glow(x,y,16,'255,255,240',1);ctx.restore();for(let j=0;j<2;j++)part({x,y,vx:rnd(-40,40),vy:rnd(-60,0),life:.5,size:rnd(8,14),grow:20,rgb:'255,170,60',add:false,shape:'fire'});},{ease:true}).then(()=>{sfx('boom');shake(8);bigBoom(cx(t),midY(t),.55);t.hurt=.3;});await wait(90);}
  await wait(500);for(const t of al)if(t.alive)hit(A1,t,sk);await tween(400,k=>{C.a=1-k;});C.on=false;r16Lower(A1);r16Lower(B1);await sc.hide(400);};}
{const P0=R16P['Lótuszvihar'];R16P['Lótuszvihar']=async(A1,B1,al,sk,p)=>{const im=R17I.lotus;if(!im)return P0(A1,B1,al,sk,p);
  const monk=A1.type==='monk'?A1:B1,fairy=monk===A1?B1:A1,{mx,gy}=grp(al),L={k:0,on:true,up:0,sp:0};sfx('holy');await r16Raise(fairy,'255,170,210');
  R17E({update(){L.sp+=.04;return L.on;},draw(){if(L.k>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-20,300*L.k,'255,160,210',.35*L.k);ctx.restore();r17Draw(im,mx,gy+10,560*L.k,{anchor:'bottom',sy:.85});}
      if(L.up>0)for(let i=0;i<70;i++){const h=(i/70+L.sp*.3)%1,a=i*2.4+L.sp*6,r=(150+80*h)*L.up,x=mx+Math.cos(a)*r,y=gy-80-h*360*L.up;ctx.save();ctx.translate(x,y);ctx.rotate(a);const g=ctx.createLinearGradient(-14,0,14,0);g.addColorStop(0,'#fff4fa');g.addColorStop(1,'#ff8cc0');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,15,6,0,0,6.29);ctx.fill();ctx.restore();}}});
  await tween(900,k=>{L.k=eOutBack(k);});r16Lower(fairy);sfx('wind');await tween(500,k=>{L.up=k;});
  monk.pose='attack';for(let i=0;i<7;i++){const a=handPos(monk),tx=mx+rnd(-120,120),ty=gy-rnd(100,300);sfx('whoosh');flyObj(a,{x:tx,y:ty},260,(x,y)=>{ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(ty-a.y,tx-a.x));ctx.globalCompositeOperation='lighter';glow(0,0,26,'255,190,220',.8);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#5a3a1a';ctx.fillRect(-30,-2,34,4);ctx.fillStyle='#ffe0a0';ctx.beginPath();ctx.moveTo(4,-7);ctx.lineTo(18,0);ctx.lineTo(4,7);ctx.fill();ctx.restore();}).then(()=>{sfx('boom');for(let j=0;j<16;j++)part({x:tx,y:ty,vx:rnd(-280,280),vy:rnd(-280,200),drag:2,life:rnd(.5,.8),size:rnd(4,8),rgb:pick(['255,182,214','255,240,246','255,220,120']),shape:'star'});});await wait(110);}
  monk.pose='idle';await wait(300);flash('255,200,230',.45,.2);shake(16);for(const t of al){if(!t.alive)continue;toss(t,55,400);t.hurt=.45;hit(monk,t,sk);}
  await tween(600,k=>{L.up=1-k;L.k=1-k;});L.on=false;};}
{const P0=R16P['Sárkánynyíl'];R16P['Sárkánynyíl']=async(A1,B1,al,sk,p)=>{const im=R17I.firedragon;if(!im)return P0(A1,B1,al,sk,p);
  const wiz=A1.type==='wizard'?A1:B1,monk=wiz===A1?B1:A1;await r16Raise(wiz,'255,150,60');
  const ch=setInterval(()=>{const a=handPos(wiz),b=handPos(monk);for(let i=0;i<3;i++){const q=Math.random();part({x:a.x+(b.x-a.x)*q+rnd(-8,8),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*60,vx:(b.x-a.x)*.8,vy:(b.y-a.y)*.8,drag:1.2,life:rnd(.3,.5),size:rnd(8,14),grow:20,rgb:'255,150,40',add:false,shape:'fire'});}},40);
  sfx('fire');await wait(900);clearInterval(ch);r16Lower(wiz);monk.pose='attack';sfx('whoosh');sfx('fire');rumble(1.2,8);
  const o=handPos(monk),xs=al.slice().sort((a,b)=>cx(a)-cx(b)),y=xs.reduce((s,t)=>s+midY(t),0)/xs.length,D={x:o.x,y:o.y,s:.2,on:true},done=new Set(),x1=W+420;
  R17E({update(){if(D.on)for(let i=0;i<3;i++)part({x:D.x-rnd(60,260),y:D.y+rnd(-40,40),vx:rnd(-120,-30),vy:rnd(-60,30),drag:1.4,life:rnd(.35,.6),size:rnd(14,24),grow:36,rgb:'255,160,40',add:false,shape:'fire'});return D.on;},draw(){if(!D.on)return;r17Draw(im,D.x-180*D.s,D.y-20,720*D.s,{add:true,rot:Math.sin(T*8)*.05});r17Draw(im,D.x-180*D.s,D.y-20,720*D.s,{a:.5});}});
  await tween(1150,k=>{const e=k*k*(3-2*k);D.x=o.x+(x1-o.x)*e;D.y=o.y+(y-o.y)*Math.min(1,k*2.5)-Math.sin(k*Math.PI*2)*30;D.s=.2+.8*Math.min(1,k*3);
    for(const t of xs)if(!done.has(t)&&D.x>=cx(t)){done.add(t);shake(14);hitStop(60);bigBoom(cx(t),midY(t),.8);t.hurt=.5;hit(monk,t,sk);}});
  D.on=false;for(const t of xs)if(!done.has(t)&&t.alive)hit(monk,t,sk);monk.pose='idle';};}
// Árnyroham: Grog fekete-lila lángokba burkolózik, lila utóképek húzódnak utána, és minden ellenségen hatalmas árnyvágás
{const P0=R16P['Árnyroham'];R16P['Árnyroham']=async(A1,B1,al,sk,p)=>{const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1;await r16Raise(witch,'150,60,240');sfx('dark');
  const pim=R17I.firepillar,Aura={on:true,a:0};R17E({update(){return Aura.on;},draw(){if(Aura.a<=0)return;if(pim){r17Draw(pim,cx(orc),orc.y+orc.oy+10,orc.w*orc.scale*2.4,{anchor:'bottom',add:true,a:Aura.a*(.75+.25*Math.sin(T*12))});}}});
  const fl=setInterval(()=>{const a=handPos(witch);part({x:a.x,y:a.y,vx:(cx(orc)-a.x)*2,vy:(midY(orc)-a.y)*2,life:.4,size:rnd(3,6),rgb:'170,90,255'});if(!pim)darkFlame({x:cx(orc)+rnd(-40,40),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale*.8),vx:0,vy:-rnd(60,140),life:.6,size:rnd(14,22)});},50);
  await tween(700,k=>{Aura.a=k;});orc._r16tint={rgb:'120,40,220',a:.8};r16Lower(witch);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),endX=W+200-orc.x,done=new Set(),gy=al.reduce((s,t)=>s+t.y,0)/al.length;orc.pose='attack';sfx('whoosh');
  const echoes=[];const sp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc;R17E({update(){for(const e of echoes)e.a-=.04;while(echoes.length&&echoes[0].a<=0)echoes.shift();return echoes.length>0||!orc._r17done;},draw(){if(!sp)return;const hh=orc.h*orc.scale,ww=hh*sp.width/sp.height;for(const e of echoes){ctx.save();ctx.globalAlpha=e.a*.6;ctx.drawImage(tintSpr(sp,'rgb(150,70,255)',.85),e.x-ww/2,e.y-hh,ww,hh);ctx.restore();}}});
  orc._r17done=false;await tween(700,k=>{orc.ox=endX*k*k;orc.oy=(gy-orc.y)*Math.min(1,k*3);if(Math.random()<.7)echoes.push({x:cx(orc),y:orc.y+orc.oy,a:1});
    for(const t of xs)if(!done.has(t)&&cx(orc)>cx(t)){done.add(t);sfx('slash');shake(14);hitStop(60);const x=cx(t),y=midY(t);R17E({t:0,update(dt){this.t+=dt;return this.t<.45;},draw(){const k=Math.min(1,this.t/.1),a=1-Math.max(0,(this.t-.15)/.3);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.rotate(-.6);ctx.strokeStyle=`rgba(200,120,255,${a})`;ctx.lineCap='round';ctx.lineWidth=24*a;ctx.beginPath();ctx.moveTo(-170*k,0);ctx.lineTo(170*k,0);ctx.stroke();ctx.strokeStyle=`rgba(255,240,255,${a})`;ctx.lineWidth=6*a;ctx.stroke();ctx.restore();}});toss(t,55,400);t.hurt=.5;hit(orc,t,sk);}});
  clearInterval(fl);Aura.on=false;orc._r16tint=null;orc.alpha=0;orc.ox=-orc.x-200;await wait(200);orc.alpha=1;await tween(400,k=>{orc.ox=(-orc.x-200)*(1-easeIO(k));orc.oy=(gy-orc.y)*(1-k);});orc.ox=0;orc.oy=0;orc.pose='idle';orc._r17done=true;
  for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);};}
// Tündérököl: arany lökéshullám helyett a generált aranyrobbanás-kép, ha van
{const P0=R16P['Tündérököl'];R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const im=R17I.goldburst;if(!im)return P0(A1,B1,al,sk,p);const bo=bigBoom,sb=soundBlast;
  let shown=false;const h0=hit;hit=function(u,t,k){if(!shown&&u&&u.type==='orc'){shown=true;const {mx,gy}=grp(al);const B={k:0};R17E({update(dt){B.k+=dt/.9;return B.k<1;},draw(){r17Draw(im,mx,gy-60,900*(.4+.6*eOutBack(Math.min(1,B.k*1.5))),{add:true,a:1-B.k*B.k});}});}return h0.apply(this,arguments);};
  try{await P0(A1,B1,al,sk,p);}finally{hit=h0;}};}

// ---- Teaszertartás: ha van festett tea-hullám kép, az gördül át a hősökön a rajzolt helyett
{const rw=r16Wave;r16Wave=function(x0,gy,Hw,len,t,a){const im=R17I.teawave;if(!im)return rw.apply(this,arguments);if(a<=0)return;const w=Math.max(260,len*1.25),h=w*im.height/im.width,sc=Math.max(.4,Hw/(h*.85));
  ctx.save();ctx.globalAlpha=a;ctx.translate(x0+w*sc*.35,gy+18);ctx.scale(sc,sc*(1+.03*Math.sin(t*6)));ctx.drawImage(im,-w*.45,-h,w,h);ctx.restore();};}

// ---- Térkép: a pályapöttyök díszes, kidolgozott pecsétek (arany keret, mélység, fény), a főellenségé koponyás viaszpecsét
{const st=document.createElement('style');st.textContent=`
.mnode{background:radial-gradient(circle at 35% 28%,#fff6dc 0,#f1d9a0 30%,#c99a4a 72%,#8a5e22 100%)!important;border:3px solid #6b4612!important;
  box-shadow:0 0 0 2px #f6dfa0,0 0 0 4px #5a3a0e,0 5px 9px rgba(30,15,0,.55),inset 0 -4px 6px rgba(90,50,10,.45),inset 0 3px 4px rgba(255,255,255,.6)!important;color:#3a2208!important;text-shadow:0 1px 0 #fff3cc;font-weight:400}
.mnode.done{background:radial-gradient(circle at 35% 28%,#e6ffd8 0,#9de08a 32%,#3f9a46 74%,#1f5a26 100%)!important;color:#fff!important;text-shadow:0 1px 2px #0b3a12}
.mnode.boss{background:radial-gradient(circle at 35% 28%,#ffd0c0 0,#e0603e 38%,#a0261a 76%,#5a0c08 100%)!important;color:#fff3e0!important;border-color:#4a0a06!important;text-shadow:0 1px 2px #3a0400}
.mnode.boss.done{background:radial-gradient(circle at 35% 28%,#e6ffd8 0,#9de08a 32%,#3f9a46 74%,#1f5a26 100%)!important}
.mnode:disabled{background:radial-gradient(circle at 35% 28%,#d8d0c0 0,#a89e8a 60%,#6a604e 100%)!important;opacity:.85!important}
.mnode.next{box-shadow:0 0 0 2px #fff3c0,0 0 0 4px #5a3a0e,0 0 18px 6px rgba(255,220,120,.85),0 5px 9px rgba(30,15,0,.55)!important}`;document.head.appendChild(st);}
