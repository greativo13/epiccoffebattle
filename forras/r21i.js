A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);const D={on:true};try{sfx('dark');
  const hand=()=>fp(u,.14,.5),potP=()=>({x:cx(u)-u.w*u.scale*.5-48*PS,y:u.y+u.oy}),P0={a:0},PS=2.5,mouth=()=>{const p=potP();return{x:p.x,y:p.y-58*PS};};
  R17E({update(){return D.on;},draw(){if(P0.a>0){const p=potP();r17Inkpot(p.x,p.y,PS,P0.a);ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y-58*PS,70,'120,140,200',.25*P0.a);ctx.restore();}}});
  await tween(300,k=>{P0.a=k;});await dimTo(.42,'30,25,20',260);
  // 1) ír: az ecset (a keze) vonásról vonásra húzza fel a jelet
  const h0=hand(),gx=h0.x-170,gy=Math.max(175,h0.y-150),strokes=[],GS=1.8;const Br={x:h0.x,y:h0.y,on:true};
  R17E({update(){return D.on;},draw(){const ink=R17I.inksplash;if(ink){for(const s of strokes)for(let i=0;i<s.pts.length;i+=2){const p=s.pts[i];r17Draw(ink,p.x,p.y,s.w*2.6,{rot:i*1.3,a:.9*s.a});}}else{ctx.save();ctx.lineCap='round';ctx.lineJoin='round';for(const s of strokes){const n=s.pts.length;for(let i=1;i<n;i++){const q=i/n,w=s.w*(.55+.9*Math.sin(Math.min(1,q*1.1)*Math.PI*.9));ctx.strokeStyle=`rgba(10,8,14,${.95*s.a})`;ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(s.pts[i-1].x,s.pts[i-1].y);ctx.lineTo(s.pts[i].x,s.pts[i].y);ctx.stroke();}
      // száraz ecsetszálak
      ctx.strokeStyle=`rgba(40,36,50,${.5*s.a})`;ctx.lineWidth=1;for(let b=-2;b<=2;b++){ctx.beginPath();s.pts.forEach((p,i)=>{const yy=p.y+b*s.w*.18;i?ctx.lineTo(p.x,yy):ctx.moveTo(p.x,yy);});ctx.stroke();}}ctx.restore();}
    if(Br.on){ctx.save();ctx.translate(Br.x,Br.y);ctx.rotate(-.6);ctx.fillStyle='#7a4a1a';ctx.fillRect(-3,0,6,60);ctx.fillStyle='#e8dcc0';ctx.fillRect(-4,-4,8,8);ctx.fillStyle='#120e14';ctx.beginPath();ctx.moveTo(-5,-2);ctx.quadraticCurveTo(0,-26,0,-30);ctx.quadraticCurveTo(0,-26,5,-2);ctx.fill();ctx.restore();}}});
  const hs=h0;for(const sp of R17_GLYPH){const s={pts:[],w:26,a:1};strokes.push(s);const a0=sp[0];await tween(40,k=>{Br.x=hs.x+(gx+a0[0]*GS-hs.x)*k;Br.y=hs.y+(gy+a0[1]*GS-hs.y)*k;u.lean=.05*k;});sfx('whoosh');
    for(let j=1;j<sp.length;j++){const A0=sp[j-1],B0=sp[j];await tween(60,k=>{const e=easeIO(k),x=gx+(A0[0]+(B0[0]-A0[0])*e)*GS,y=gy+(A0[1]+(B0[1]-A0[1])*e)*GS;Br.x=x;Br.y=y;s.pts.push({x,y});u.lean=.05+.05*Math.sin(k*Math.PI);
      if(Math.random()<.6)part({x,y,vx:rnd(-25,25),vy:rnd(20,80),g:500,life:.7,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});});}}
  Br.on=false;u.lean=0;sfx('dark');sfx('boom');flash('60,20,60',.35,.15);shake(10);
  // a jel felizzik, és beleolvad a tintatartóba
  const gl={a:0};R17E({update(){return gl.a>0||D.on&&strokes.length>0;},draw(){if(gl.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(gx,gy,240,'150,60,200',.4*gl.a);ctx.restore();}}});await tween(220,k=>{gl.a=Math.sin(k*Math.PI);for(const s of strokes)s.w=26+10*Math.sin(k*Math.PI);});const p0=potP();
  await tween(260,k=>{for(const s of strokes){s.a=1-k;for(const p of s.pts){p.x+=(p0.x-p.x)*.12;p.y+=(p0.y-58*PS-p.y)*.12;}}});strokes.length=0;
  // 2) a festett sárkány kiáramlik a tintatartóból (a nyakától nő ki), 3) spirálban felfelé kering a hősök körül, 4) összeszorít, 5) visszacsusszan az üvegcsébe
  const im=R17I.inkdragon,DW=720,{mx}=grp(al),minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5)),gy2=Math.max(...al.map(t=>t.y+t.oy)),top2=Math.min(...al.map(topY));
  const RX=Math.min(210,(maxX-minX)/2+80),RY=56,cxs=Math.max(RX+40,(minX+maxX)/2),G={x:p0.x,y:p0.y-50,s:.05,ang:-1.2,flip:false,a:1,b:false,on:true,wob:0},rib=[];
  // tus-szalag: a sárkány után húzódó, elmosódó tuscsík (ez rajzolja a spirált a hősök körül)
  R17E({update(){if(G.on&&!G.nr){rib.unshift({x:G.x,y:G.y,b:G.b,a:1});if(rib.length>70)rib.pop();}for(const r of rib)r.a-=.012;return G.on||rib.some(r=>r.a>0);},
    draw(){const sp=R17I.inksplash;if(sp)for(let i=6;i<rib.length;i+=7){const r=rib[i];if(r.a<=0)continue;const f=1-i/rib.length;r17Draw(sp,r.x,r.y,90*f+30,{a:(r.b?.3:.55)*r.a*f,rot:i*.7});}
      if(!im||G.a<=0)return;const w=DW*G.s,h=w*im.height/im.width;ctx.save();if(G.cl!=null){ctx.beginPath();ctx.rect(G.x-3000,G.cl-3000,6000,3000);ctx.clip();}ctx.globalAlpha=G.a*(G.b?.6:1);ctx.translate(G.x,G.y);ctx.rotate(G.ang);ctx.scale(G.flip?-1:1,1);
      // a fej (a kép bal széle) legyen elöl: a kép kb. 15%-ánál van a fej
      const N=48;for(let i=0;i<N;i++){const sx=i*im.width/N,dx=-w*.15+i*w/N,wy=Math.sin(T*6-i*.22)*h*.035*G.wob;ctx.drawImage(im,sx,0,im.width/N+1,im.height,dx,-h/2+wy,w/N+1,h);}ctx.restore();}});
  sfx('growl');
  {const M=mouth();G.cl=M.y;G.nr=true;G.flip=false;G.ang=Math.PI/2;G.x=M.x;G.wob=1;const iv=setInterval(()=>{sfx('whoosh');},260);
   await tween(600,k=>{const e=easeIO(k);G.s=.3+.55*e;const len=DW*G.s*.85;G.y=M.y+30-(len+70)*e;G.x=M.x+Math.sin(k*9)*10*(1-k);G.ang=Math.PI/2+Math.sin(k*8)*.12;
     for(let n=0;n<3;n++)part({x:M.x+rnd(-26,26),y:M.y-4,vx:rnd(-120,120),vy:-rnd(120,420),g:700,life:.8,size:rnd(4,10),rgb:'12,10,18',add:false,shape:'drop'});if(Math.random()<.3)shake(3);});
   clearInterval(iv);G.cl=null;G.nr=false;sfx('boom');shake(8);splat(M.x,M.y-10,['12,10,18','40,36,60'],30,420,'drop');}
  // ív a hősök elé (a fej megy elöl: a kép balra néz, a mozgás balra tart, így nem kell tükrözni)
  const st0={x:G.x,y:G.y},ent={x:cxs+RX,y:gy2-10};let lx=G.x,ly=G.y;let vx=0,vy=0;const aim=()=>{const dx=G.x-lx,dy=G.y-ly;vx=vx*.85+dx*.15;vy=vy*.85+dy*.15;if(Math.hypot(vx,vy)>.4){const fl=Math.abs(vx)>1.2?vx>0:G.flip;if(fl!==G.flip){G.flip=fl;G.ang=-G.ang;}const ta=G.flip?Math.atan2(vy,vx):Math.atan2(-vy,-vx);let d=ta-G.ang;while(d>Math.PI)d-=6.283;while(d<-Math.PI)d+=6.283;G.ang+=d*.18;}lx=G.x;ly=G.y;};
  G.wob=1;await tween(450,k=>{const e=easeIO(k);G.x=st0.x+(ent.x-st0.x)*e;G.y=st0.y+(ent.y-st0.y)*e-Math.sin(k*Math.PI)*180;aim();});
  // spirál alulról felfelé, 2,5 kör: hátul halványabb (a hősök mögött), elöl teljes
  const turns=2;const bz=setInterval(()=>sfx('whoosh'),320);
  await tween(1150,k=>{const th=k*turns*Math.PI*2,h=gy2-10-(gy2-top2+10)*k;G.x=cxs+Math.cos(th)*RX;G.y=h+Math.sin(th)*RY;G.b=Math.sin(th)<0;aim();G.s=.82-.08*k;});clearInterval(bz);G.b=false;
  // összeszorít: a szalag-gyűrűk összehúzódnak, a sárkány fölül megfeszül
  sfx('growl');const sq=rib.map(r=>({r,x0:r.x}));await tween(300,k=>{const e=Math.sin(k*Math.PI*.5);for(const q of sq)q.r.x=cxs+(q.x0-cxs)*(1-.3*e);G.s=.74+.14*e;shake(5);});
  flash('20,10,30',.45,.2);for(const t of al){if(!t.alive)continue;t.hurt=.55;sfx('bite');splat(cx(t),midY(t),['12,10,18','30,28,40'],44,520,'drop');r18InkBlot(cx(t),midY(t),Math.max(110,t.h*t.scale*.8));toss(t,50,380);hit(u,t,sk);}shake(22);
  await wait(200);
  // vissza a tintatartóba
  {const s1={x:G.x,y:G.y};await tween(550,k=>{const e=easeIO(k),M=mouth();G.x=s1.x+(M.x-s1.x)*e;G.y=s1.y+(M.y-60-s1.y)*e-Math.sin(k*Math.PI)*190;aim();if(k>.45){const tg=G.flip?Math.PI/2:-Math.PI/2,q=Math.min(1,(k-.45)/.4);G.ang+=(tg-G.ang)*q;}G.s=Math.max(.6,G.s-.004);});
   const M=mouth(),s0=G.s,y0=G.y;G.cl=M.y;G.nr=true;G.x=M.x;sfx('whoosh');
   await tween(450,k=>{const e=easeIO(k);G.s=s0-(s0-.3)*e;const len=DW*G.s*.85;G.y=y0+(M.y+40+len-y0)*e;G.ang=(G.flip?Math.PI/2:-Math.PI/2)+Math.sin(k*10)*.08;
     if(Math.random()<.7)part({x:M.x+rnd(-24,24),y:M.y-4,vx:rnd(-90,90),vy:-rnd(60,240),g:700,life:.6,size:rnd(3,8),rgb:'12,10,18',add:false,shape:'drop'});});
   sfx('dark');splat(M.x,M.y-8,['12,10,18','40,36,60'],20,300,'drop');}
  G.a=0;G.on=false;await wait(250);
  sfx('dark');await tween(260,k=>{P0.a=1-k;});await dimTo(0,null,300);await bodySettle(u);}finally{D.on=false;rel();}};

// ---- Kaelen – Medveforma (23. kör): nekiront, felágaskodik és háromszor lecsap; mély, véres karomnyomok
A.wildshape=async(u,ts,sk)=>{const t=ts[0];const f=pick(['bear','turtle','snake']);const N={bear:'MEDVEFORMA!',turtle:'TEKNŐSFORMA!',snake:'KÍGYÓFORMA!'}[f];
  popLabel(u,N,'#9be07a');sfx('roar');kaeLeaves(cx(u),midY(u),60,380);flash('150,230,90',.3,.2);
  const key={bear:'wsbear',turtle:'wsturtle',snake:'wsviper'}[f],W={bear:330,turtle:250,snake:300}[f];
  const F={x:cx(u),y:u.y+u.oy+6,a:0,s:.4,rot:0,fx:false,sy:1};const a0=u.alpha==null?1:u.alpha;
  effects.push({update(){return !F.done;},draw(){if(F.a<=0)return;ctx.save();ctx.globalAlpha=F.a;if(!kaeImg(F.key||key,F.x,F.y,W*F.s,{anchor:'bottom',rot:F.rot,fx:F.fx,sy:F.sy})){ctx.font=`${Math.round(150*F.s)}px serif`;ctx.textAlign='center';ctx.fillText({bear:'🐻',turtle:'🐢',snake:'🐍'}[f],F.x,F.y);}ctx.restore();}});
  await tween(280,k=>{u.alpha=a0*(1-k);F.a=k;F.s=.4+.6*eOutBack(k);});
  if(f==='bear'&&t&&t.alive){const hx=F.x,tx=cx(t)-W*.42,gy=u.y+u.oy+6;sfx('roar');
    // nekiront: 3 nagy ugrás a földön, porfelhő a talpánál
    await tween(420,k=>{const e=k*k;F.x=hx+(tx-hx)*e;F.y=gy-Math.abs(Math.sin(k*Math.PI*2))*55;F.rot=.08*Math.sin(k*Math.PI*4);if(Math.random()<.5)part({x:F.x+rnd(-60,60),y:gy,vx:rnd(-160,-40),vy:-rnd(30,120),life:.6,size:rnd(8,16),rgb:'150,120,80',add:false});});
    shake(10);sfx('quake');
    for(let i=0;i<3;i++){
      // felágaskodik (a festett ágaskodó medve, ha van), aztán lecsap a mancsával
      const up=!!R17I.wsbear2;if(up)F.key='wsbear2';sfx('roar');await tween(200,k=>{F.sy=1+.14*k;F.rot=-.16*k;F.x=tx-20*k;});
      sfx('slash');await tween(110,k=>{F.sy=1.14-.2*k;F.rot=-.16+.34*k;F.x=tx-20+50*k;});shake(18);hitStop(70);
      const cxp=cx(t)+rnd(-25,25),cyp=midY(t)+rnd(-40,20),dir=i%2?-1:1,M={a:1,k:0};
      effects.push({update(){M.k=Math.min(1,M.k+.18);M.a-=.018;return M.a>0;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,M.a*1.3);ctx.translate(cxp,cyp);ctx.scale(dir,1);ctx.rotate(.35);
        for(let j=0;j<4;j++){const ox=-66+j*44,L0=-110,L1=-110+220*M.k;
          // mély hasíték: sötét seb, vörös szél, fehér villanás
          ctx.lineCap='round';ctx.fillStyle='rgba(60,0,0,.9)';ctx.beginPath();ctx.moveTo(ox-4,L0);ctx.quadraticCurveTo(ox+22,(L0+L1)/2,ox+6,L1);ctx.quadraticCurveTo(ox+34,(L0+L1)/2,ox+10,L0);ctx.fill();
          ctx.strokeStyle='rgba(230,30,30,.95)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(ox,L0);ctx.quadraticCurveTo(ox+26,(L0+L1)/2,ox+8,L1);ctx.stroke();
          ctx.strokeStyle=`rgba(255,255,255,${M.a})`;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(ox+3,L0+6);ctx.quadraticCurveTo(ox+27,(L0+L1)/2,ox+9,L1-6);ctx.stroke();}
        ctx.restore();}});
      for(let n=0;n<22;n++)part({x:cxp+rnd(-60,60),y:cyp+rnd(-60,60),vx:dir*rnd(80,360),vy:rnd(-260,60),g:600,life:.7,size:rnd(4,9),rgb:pick(['200,30,30','140,90,50']),add:false,shape:n%3?'drop':'rock'});
      t.hurt=.3;toss(t,30+i*20,260);flash('255,240,220',.25,.08);
      F.key=null;await tween(160,k=>{F.sy=.94+.06*k;F.rot=.18*(1-k);F.x=tx+30*(1-k);});}
    hit(u,t,{...sk,name:'Medvekarmolás',pow:1.9});await wait(250);await tween(380,k=>{F.x=tx+(hx-tx)*k;F.y=gy-Math.sin(k*Math.PI)*50;F.rot=0;F.sy=1;});}
  else if(f==='turtle'){addStatus(u,'shell',2);addStatus(u,'taunt',1);await tween(300,k=>F.sy=1-.12*Math.sin(k*Math.PI));shake(10);sfx('rock');for(let i=0;i<24;i++)part({x:F.x+rnd(-120,120),y:F.y,vx:rnd(-160,160),vy:rnd(-200,-60),life:.7,size:rnd(4,8),rgb:'120,100,70',g:500,add:false,shape:'rock'});
    popLabel(u,'NEM SÉRÜL 1 KÖRIG!','#b8e07a');await wait(500);}
  else if(t&&t.alive){const hx=F.x,hy=F.y;await tween(260,k=>{F.x=hx+(cx(t)-hx)*k;F.y=hy+(t.y+t.oy+6-hy)*k-Math.sin(k*Math.PI)*120;F.rot=-.3*Math.sin(k*Math.PI);});
    // rátekeredik: a kígyó a célpont köré csavarodik és összeszorít
    const T={k:0};const tw=effects.push({update(){return !T.done;},draw(){const s=1+.06*Math.sin(T.k*30);}});
    for(let i=0;i<3;i++){await tween(200,k=>{F.s=1-.18*Math.sin(k*Math.PI);F.rot=.15*Math.sin(k*Math.PI*2);});shake(8);burst(cx(t),midY(t),'150,230,80',18,220);}
    hit(u,t,{...sk,name:'Kígyómarás',pow:1.1,status:['poison',1,3]});if(Math.random()<.5)addStatus(t,'stun',1);T.done=true;
    await tween(260,k=>{F.x=cx(t)+(hx-cx(t))*k;F.y=t.y+t.oy+6+(hy-t.y-t.oy-6)*k;F.rot=0;});}
  await wait(200);kaeLeaves(F.x,F.y-100,50,340);
  if(f!=='turtle'){await tween(280,k=>{u.alpha=a0*k;F.a=1-k;});F.done=true;u.alpha=a0;}
  else{const keepT=()=>u.alive&&u.st&&u.st.shell;effects.push({update(){if(!keepT()){u.alpha=a0;F.done=true;return false;}u.alpha=0;return true;},draw(){}});}};
