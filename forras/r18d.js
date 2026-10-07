// ---- Porcelán mandarin – Tusátok (19. kör): nagyobb, gyorsabb ecsetjel; nagyobb tintatartó és tussárkány; a szorításnál tintafolt-robbanás minden hősön
function r18InkBlot(x,y,R){const st={t:0},bl=[...Array(14)].map(()=>({a:rnd(0,6.28),d:rnd(.3,1.1),r:rnd(.12,.3)}));R18E({update(dt){st.t+=dt;return st.t<1.4;},draw(){const k=Math.min(1,st.t/.12),a=st.t<1?1:1-(st.t-1)/.4;ctx.save();ctx.globalAlpha=a*.92;ctx.fillStyle='#0c0a12';
  ctx.beginPath();ctx.arc(x,y,R*.45*k,0,6.29);ctx.fill();for(const b of bl){ctx.beginPath();ctx.arc(x+Math.cos(b.a)*R*b.d*k,y+Math.sin(b.a)*R*b.d*k*.8,R*b.r*k,0,6.29);ctx.fill();ctx.strokeStyle='#0c0a12';ctx.lineWidth=R*b.r*.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(b.a)*R*b.d*k,y+Math.sin(b.a)*R*b.d*k*.8);ctx.stroke();}ctx.restore();}});}
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);const D={on:true};try{sfx('dark');
  const hand=()=>fp(u,.14,.5),potP=()=>({x:cx(u)-u.w*u.scale*.75,y:u.y+u.oy}),P0={a:0};
  R17E({update(){return D.on;},draw(){if(P0.a>0){const p=potP();r17Inkpot(p.x,p.y,2.1,P0.a);ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y-90,60,'120,140,200',.25*P0.a);ctx.restore();}}});
  await tween(300,k=>{P0.a=k;});await dimTo(.42,'30,25,20',260);
  // 1) ír: az ecset (a keze) vonásról vonásra húzza fel a jelet
  const h0=hand(),gx=h0.x-170,gy=Math.max(175,h0.y-150),strokes=[],GS=1.8;const Br={x:h0.x,y:h0.y,on:true};
  R17E({update(){return D.on;},draw(){ctx.save();ctx.lineCap='round';ctx.lineJoin='round';for(const s of strokes){const n=s.pts.length;for(let i=1;i<n;i++){const q=i/n,w=s.w*(.55+.9*Math.sin(Math.min(1,q*1.1)*Math.PI*.9));ctx.strokeStyle=`rgba(10,8,14,${.95*s.a})`;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(s.pts[i-1].x,s.pts[i-1].y);ctx.lineTo(s.pts[i].x,s.pts[i].y);ctx.stroke();}
      // száraz ecsetszálak
      ctx.strokeStyle=`rgba(40,36,50,${.5*s.a})`;ctx.lineWidth=1;for(let b=-2;b<=2;b++){ctx.beginPath();s.pts.forEach((p,i)=>{const yy=p.y+b*s.w*.18;i?ctx.lineTo(p.x,yy):ctx.moveTo(p.x,yy);});ctx.stroke();}}
    if(Br.on){ctx.save();ctx.translate(Br.x,Br.y);ctx.rotate(-.6);ctx.fillStyle='#7a4a1a';ctx.fillRect(-3,0,6,60);ctx.fillStyle='#e8dcc0';ctx.fillRect(-4,-4,8,8);ctx.fillStyle='#120e14';ctx.beginPath();ctx.moveTo(-5,-2);ctx.quadraticCurveTo(0,-26,0,-30);ctx.quadraticCurveTo(0,-26,5,-2);ctx.fill();ctx.restore();}ctx.restore();}});
  const hs=h0;for(const sp of R17_GLYPH){const s={pts:[],w:26,a:1};strokes.push(s);const a0=sp[0];await tween(70,k=>{Br.x=hs.x+(gx+a0[0]*GS-hs.x)*k;Br.y=hs.y+(gy+a0[1]*GS-hs.y)*k;u.lean=.05*k;});sfx('whoosh');
    for(let j=1;j<sp.length;j++){const A0=sp[j-1],B0=sp[j];await tween(120,k=>{const e=easeIO(k),x=gx+(A0[0]+(B0[0]-A0[0])*e)*GS,y=gy+(A0[1]+(B0[1]-A0[1])*e)*GS;Br.x=x;Br.y=y;s.pts.push({x,y});u.lean=.05+.05*Math.sin(k*Math.PI);
      if(Math.random()<.6)part({x,y,vx:rnd(-25,25),vy:rnd(20,80),g:500,life:.7,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});});}}
  Br.on=false;u.lean=0;sfx('dark');sfx('boom');flash('60,20,60',.35,.15);shake(10);
  // a jel felizzik, és beleolvad a tintatartóba
  const gl={a:0};R17E({update(){return gl.a>0||D.on&&strokes.length>0;},draw(){if(gl.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(gx,gy,240,'150,60,200',.4*gl.a);ctx.restore();}}});await tween(320,k=>{gl.a=Math.sin(k*Math.PI);for(const s of strokes)s.w=26+10*Math.sin(k*Math.PI);});const p0=potP();
  await tween(420,k=>{for(const s of strokes){s.a=1-k;for(const p of s.pts){p.x+=(p0.x-p.x)*.12;p.y+=(p0.y-60-p.y)*.12;}}});strokes.length=0;
  // 2) a festett sárkány kiáramlik a tintatartóból (a nyakától nő ki), 3) spirálban felfelé kering a hősök körül, 4) összeszorít, 5) visszacsusszan az üvegcsébe
  const im=R17I.inkdragon,DW=720,{mx}=grp(al),minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5)),gy2=Math.max(...al.map(t=>t.y+t.oy)),top2=Math.min(...al.map(topY));
  const RX=Math.min(210,(maxX-minX)/2+80),RY=56,cxs=Math.max(RX+40,(minX+maxX)/2),G={x:p0.x,y:p0.y-50,s:.05,ang:-1.2,flip:false,a:1,b:false,on:true,wob:0},rib=[];
  // tus-szalag: a sárkány után húzódó, elmosódó tuscsík (ez rajzolja a spirált a hősök körül)
  R17E({update(){if(G.on){rib.unshift({x:G.x,y:G.y,b:G.b,a:1});if(rib.length>70)rib.pop();}for(const r of rib)r.a-=.012;return G.on||rib.some(r=>r.a>0);},
    draw(){ctx.save();ctx.lineCap='round';for(const pass of [1,0])for(let i=1;i<rib.length;i++){const r=rib[i],q=rib[i-1];if((r.b?1:0)!==pass||r.a<=0)continue;const f=1-i/rib.length;ctx.strokeStyle=`rgba(12,10,18,${(r.b?.35:.7)*r.a*f})`;ctx.lineWidth=70*f+6;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(r.x,r.y);ctx.stroke();}ctx.restore();
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
  await tween(1800,k=>{const th=k*turns*Math.PI*2,h=gy2-10-(gy2-top2+10)*k;G.x=cxs+Math.cos(th)*RX;G.y=h+Math.sin(th)*RY;G.b=Math.sin(th)<0;aim();G.s=.82-.08*k;});clearInterval(bz);G.b=false;
  // összeszorít: a szalag-gyűrűk összehúzódnak, a sárkány fölül megfeszül
  sfx('growl');const sq=rib.map(r=>({r,x0:r.x}));await tween(380,k=>{const e=Math.sin(k*Math.PI*.5);for(const q of sq)q.r.x=cxs+(q.x0-cxs)*(1-.3*e);G.s=.74+.14*e;shake(5);});
  flash('20,10,30',.45,.2);for(const t of al){if(!t.alive)continue;t.hurt=.55;sfx('bite');splat(cx(t),midY(t),['12,10,18','30,28,40'],44,520,'drop');r18InkBlot(cx(t),midY(t),Math.max(110,t.h*t.scale*.8));toss(t,50,380);hit(u,t,sk);}hitStop(140);shake(22);
  await wait(320);
  // vissza a tintatartóba
  const s1={x:G.x,y:G.y};await tween(800,k=>{const e=easeIO(k),pt=potP();G.x=s1.x+(pt.x-s1.x)*e;G.y=s1.y+(pt.y-50-s1.y)*e-Math.sin(k*Math.PI)*170;aim();});
  await tween(380,k=>{G.s=.97*(1-k)+.05;G.y=potP().y-50+30*k;G.ang=-1.2;});G.a=0;G.on=false;await wait(250);
  sfx('dark');await tween(260,k=>{P0.a=1-k;});await dimTo(0,null,300);await bodySettle(u);}finally{D.on=false;rel();}};


// ---- Árny-csapat (idézés, 19. kör): éles, fekete árnyalakok lila fénykörvonallal (nem foltos füstfelhők); a hősök árnyékából emelkednek ki, előrelépnek, és mindegyik a saját, nagy támadását csinálja; a végén közös árnyrobbanás festett lángoszlopokkal
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>null;
  sh.run=async(P,S0)=>{await dimTo(.72,'15,5,30',300);const hs=S.heroes.filter(h=>h.alive),fs0=foesAlive();if(!fs0.length)return;const front=Math.max(...hs.map(h=>h.x)),minE=Math.min(...fs0.map(cx));
   const lineX=i=>front+90+(Math.max(0,minE-220-front-90))*(i+.5)/hs.length;
   const shades=hs.map((h,i)=>({h,x:h.x,y:h.y,x1:lineX(i),y1:h.y+(i%2?18:-6),a:0,rise:0,jy:0,rot:0,pose:''}));const st={on:true};
   R18E({update(){if(st.on)for(const q of shades)if(q.a>0&&Math.random()<.25)darkFlame({x:q.x+rnd(-20,20),y:q.y-rnd(0,12),vx:rnd(-10,10),vy:-rnd(30,70),life:.4,size:rnd(10,16)});return st.on;},
     draw(){for(const q of shades){if(q.a<=0)continue;
       // sötét tócsa a lábánál
       ctx.save();ctx.globalAlpha=.8*q.a;ctx.translate(q.x,q.y+4);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,4,0,0,80);g.addColorStop(0,'rgba(8,0,18,.95)');g.addColorStop(.7,'rgba(50,10,90,.5)');g.addColorStop(1,'rgba(60,20,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,80,0,6.29);ctx.fill();ctx.restore();
       const sp=ENEMY_SPR[q.h.type+(q.pose||'')]||ENEMY_SPR[q.h.type];if(!sp)continue;const Hh=q.h.h*(q.h.scale0||q.h.scale)*1.12,w=Hh*sp.width/sp.height,vis=Hh*q.rise;
       ctx.save();ctx.translate(q.x,q.y-q.jy);ctx.rotate(q.rot);ctx.translate(-q.x,-q.y);ctx.beginPath();ctx.rect(q.x-w,q.y-Hh-60,w*2,Hh+60+(q.jy>0?q.jy:0));ctx.clip();
       ctx.globalCompositeOperation='lighter';for(const [ox,oy] of [[-3,0],[3,0],[0,-3],[0,3]]){ctx.globalAlpha=q.a*.55;ctx.drawImage(tintSpr(sp,'rgb(170,90,255)',1),q.x-w/2+ox,q.y-vis+oy,w,Hh);}
       ctx.globalCompositeOperation='source-over';ctx.globalAlpha=q.a;ctx.drawImage(tintSpr(sp,'rgb(14,4,26)',.94),q.x-w/2,q.y-vis,w,Hh);ctx.restore();}}});
   sfx('dark');await tween(300,k=>{for(const q of shades)q.a=k;});await tween(500,k=>{for(const q of shades)q.rise=easeIO(k);});
   sfx('whoosh');await tween(420,k=>{const e=easeIO(k);for(const q of shades){q.x=q.h.x+(q.x1-q.h.x)*e;q.y=q.h.y+(q.y1-q.h.y)*e;q.jy=Math.sin(k*Math.PI)*30;}});
   const hand=q=>{const p=handPos(q.h);return {x:p.x+(q.x-q.h.x),y:p.y+(q.y-q.h.y)};};
   const orb=(q,t,size,ms=420)=>flyObj(hand(q),{x:cx(t),y:midY(t)},ms,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,size*1.7,'160,70,255',.85);ctx.restore();ctx.save();ctx.fillStyle='#0c0216';ctx.beginPath();ctx.arc(x,y,size*.55,0,6.29);ctx.fill();ctx.restore();darkFlame({x,y,vx:rnd(-40,40),vy:rnd(-40,40),life:.35,size:size*.5});},{arc:50});
   const boom=(t,s=1)=>{sfx('boom');sfx('dark');shake(12*s);hitStop(60);flash('120,40,220',.25*s,.1);for(let i=0;i<Math.round(16*s);i++)darkFlame({x:cx(t)+rnd(-40,40)*s,y:midY(t)+rnd(-40,40)*s,vx:rnd(-120,120),vy:-rnd(60,220),life:rnd(.5,.8),size:rnd(18,30)*s});
     const g={t:0};R18E({update(dt){g.t+=dt;return g.t<.5;},draw(){const a=1-g.t/.5;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),(120+120*g.t)*s,'150,60,255',.6*a);ctx.restore();}});};
   const ATT={
     wizard:async(q,t)=>{q.pose='-cast';sfx('fire');await orb(q,t,60);boom(t,1.2);},
     witch:async(q,t)=>{q.pose='-cast';sfx('dark');await Promise.all([0,1,2].map(i=>wait(i*110).then(()=>orb(q,t,30,380))));boom(t,1);},
     fairy:async(q,t)=>{q.pose='-cast';sfx('holy');await Promise.all([0,1,2,3,4,5].map(i=>wait(i*80).then(()=>flyObj({x:cx(t)+rnd(-120,120),y:-40},{x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-20,20)},320,(x,y,r)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.globalCompositeOperation='lighter';glow(0,0,30,'190,140,255',.7);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#1c0830';ctx.strokeStyle='#d9b8ff';ctx.lineWidth=2;ctx.beginPath();for(let j=0;j<10;j++){const rr=j%2?8:20,an=j/10*6.283;ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{spin:8}))));boom(t,.9);},
     orc:async(q,t)=>{q.pose='-attack';const x0=q.x,y0=q.y,tx=cx(t)-t.w*t.scale*.5-40;sfx('whoosh');await tween(320,k=>{const e=easeIO(k);q.x=x0+(tx-x0)*e;q.y=y0+(t.y+t.oy-y0)*e;q.jy=Math.sin(k*Math.PI*.5)*170;q.rot=-.2*k;});
       await tween(130,k=>{q.jy=170*(1-k*k);q.rot=-.2+.5*k;});q.jy=0;sfx('rock');shake(18);const pim=R17I.firepillar,gx=cx(t),gy=t.y+t.oy;const P2={t:0};
       R18E({update(dt){P2.t+=dt;return P2.t<.9;},draw(){if(!pim)return;const a=P2.t<.6?1:1-(P2.t-.6)/.3,w=t.w*t.scale*2.4;ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';ctx.translate(gx,gy+10);ctx.scale(1,Math.min(1,P2.t/.15));ctx.drawImage(pim,-w/2,-w*pim.height/pim.width,w,w*pim.height/pim.width);ctx.restore();}});
       boom(t,1.1);await wait(150);await tween(280,k=>{const e=easeIO(k);q.x=tx+(x0-tx)*e;q.y=t.y+t.oy+(y0-t.y-t.oy)*e;q.rot=.3*(1-k);q.jy=Math.sin(k*Math.PI)*60;});q.rot=0;q.jy=0;},
     monk:async(q,t)=>{q.pose='-attack';await Promise.all([0,1,2,3,4].map(i=>wait(i*90).then(()=>{sfx('whoosh');const a=hand(q),ty=midY(t)+rnd(-30,30);return flyObj(a,{x:cx(t),y:ty},240,(x,y)=>{const an=Math.atan2(ty-a.y,cx(t)-a.x);ctx.save();ctx.translate(x,y);ctx.rotate(an);ctx.globalCompositeOperation='lighter';glow(0,0,30,'170,90,255',.85);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#0c0216';ctx.fillRect(-46,-3,50,6);ctx.beginPath();ctx.moveTo(4,-10);ctx.lineTo(26,0);ctx.lineTo(4,10);ctx.fill();ctx.restore();darkFlame({x:x-24*Math.cos(an),y,vx:-60,vy:0,life:.25,size:10});});})));boom(t,.9);}};
   for(const q of shades){const t=pick(foesAlive());if(!t)break;await (ATT[q.h.type]||ATT.wizard)(q,t);q.pose='';if(!t.alive)continue;t.hurt=.4;toss(t,40,320);hit(q.h,t,{...ATTACKS[q.h.type],name:'Árnycsapás',pow:2.2,anim:'midnight'});await wait(100);}
   // közös árnyrobbanás: az árnyak felemelik a kezüket, az ellenségek alól festett lila lángoszlopok csapnak fel
   const fs=foesAlive();if(fs.length){for(const q of shades)q.pose='-cast';sfx('dark');sfx('boom');await wait(250);const {mx,my}=grp(fs),pim=R17I.firepillar;const B={k:0,on:true};
     R18E({update(){return B.on;},draw(){if(B.k<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,my,380*B.k,'140,60,240',.6*(1-B.k*.6));ctx.restore();
       if(pim)for(const t of fs){const w=t.w*t.scale*2.8;ctx.save();ctx.globalAlpha=Math.min(1,(1-B.k)*2.2);ctx.globalCompositeOperation='lighter';ctx.translate(cx(t),t.y+t.oy+10);ctx.scale(1,Math.min(1,B.k*4));ctx.drawImage(pim,-w/2,-w*pim.height/pim.width,w,w*pim.height/pim.width);ctx.restore();}}});
     for(let i=0;i<5;i++)setTimeout(()=>{for(let j=0;j<8;j++)darkFlame({x:mx+rnd(-220,220),y:my+rnd(-40,80),vx:rnd(-30,30),vy:-rnd(80,200),life:rnd(.5,.8),size:rnd(20,34)});},i*80);
     flash('120,40,200',.55,.22);shake(26);hitStop(140);rumble(1,10);await tween(800,k=>{B.k=k;});B.on=false;for(const t of fs){t.hurt=.55;toss(t,70,420);hit(P,t,{name:'Árnyrobbanás',kind:'mag',pow:1.1,elem:'dark',tgt:'enemies',anim:'midnight'});}}
   await tween(450,k=>{for(const q of shades){q.rise=1-k;q.a=1-k*.5;}});st.on=false;await dimTo(0,null,300);};}}

// a tintatartó: festett kék-fehér porcelán tusos edény (sárkánymintával) a rajzolt helyett
{const ip=r17Inkpot;r17Inkpot=function(x,y,s,a){const im=R17I.inkpot;if(!im)return ip.apply(this,arguments);const w=92*s;ctx.save();ctx.globalAlpha=a;ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(x,y+2,w*.38,9,0,0,6.29);ctx.fill();ctx.drawImage(im,x-w/2,y-w*.88,w,w);ctx.restore();};}
