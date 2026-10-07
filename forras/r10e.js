
// ---- folyadéksugár: hullámzó, cseppes, fényes – nem merev rúd
function drawLiquid(pts,w,cols,t){const n=pts.length;if(n<2)return;const L=[],R=[];
  for(let i=0;i<n;i++){const p=pts[i],a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)],dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy)||1,nx=-dy/d,ny=dx/d,q=i/(n-1),ww=w*.5*(.45+.55*Math.sqrt(q))*(1+.16*Math.sin(q*9-t*22)+.08*Math.sin(q*23+t*31));L.push({x:p.x+nx*ww,y:p.y+ny*ww});R.push({x:p.x-nx*ww,y:p.y-ny*ww});}
  const rib=(f,col)=>{ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<n;i++){const p=pts[i],x=p.x+(L[i].x-p.x)*f,y=p.y+(L[i].y-p.y)*f;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}for(let i=n-1;i>=0;i--){const p=pts[i];ctx.lineTo(p.x+(R[i].x-p.x)*f,p.y+(R[i].y-p.y)*f);}ctx.closePath();ctx.fill();};
  ctx.save();ctx.globalAlpha=.9;rib(1,cols[0]);ctx.globalAlpha=.85;rib(.72,cols[1]);const e=pts[n-1];ctx.globalAlpha=.9;ctx.fillStyle=cols[1];ctx.beginPath();ctx.arc(e.x,e.y,w*.55*(1+.1*Math.sin(t*25)),0,6.29);ctx.fill();
  ctx.globalAlpha=1;ctx.strokeStyle=cols[2];ctx.lineCap='round';ctx.lineWidth=Math.max(1.5,w*.12);ctx.beginPath();for(let i=1;i<n;i++){const p=pts[i],x=p.x+(L[i].x-p.x)*.45,y=p.y+(L[i].y-p.y)*.45;if(Math.sin(i*.8+t*14)>-.3){ctx.lineTo(x,y);}else ctx.moveTo(x,y);}ctx.stroke();ctx.restore();}
function liquidPath(o,T,k0,k1,arc,step=10){const L=Math.hypot(T.x-o.x,T.y-o.y),n=Math.max(4,Math.round(L*(k1-k0)/step)),pts=[];for(let i=0;i<=n;i++){const q=k0+(k1-k0)*i/n;pts.push({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*arc});}return pts;}
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const o=fp(u,.55,.15),T={x:cx(t),y:midY(t)},st={k:0,on:true,t:0};sfx('splash');
  effects.push({update(dt){st.t+=dt;if(st.on)for(let i=0;i<5;i++){const q=rnd(Math.max(0,st.k-.5),Math.min(1,st.k));const x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*120;part({x,y,vx:rnd(-70,70),vy:rnd(-60,40),g:600,life:.45,size:rnd(2,4.5),rgb:pick(['150,90,40','190,130,60','220,170,100']),add:false,shape:'drop'});}
      if(st.on&&Math.random()<.5){const q=rnd(Math.max(0,st.k-.5),Math.min(1,st.k));part({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*120,vx:rnd(-20,20),vy:-rnd(20,50),life:.8,size:rnd(8,14),grow:20,rgb:'245,245,250',add:false,shape:'smoke'});}return st.on;},
    draw(){const k1=Math.min(1,st.k),k0=Math.max(0,st.k-.55);if(k1<=k0)return;drawLiquid(liquidPath(o,T,k0,k1,120),26,['#6a3a14','#b0702e','rgba(255,225,170,.85)'],st.t);}});
  await tween(460,k=>{st.k=k*1.55;});sfx('splash');shake(9);splat(T.x,T.y,['150,90,40','190,130,60','230,180,110'],36,380,'drop');puffs(T.x,T.y,10,['240,240,245','225,228,235'],[16,28],{up:110});t.hurt=.35;toss(t,24,240);hit(u,t,sk);st.on=false;await wait(200);u.pose='idle';};
A.koffJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const os=[fp(u,.06,.4),fp(u,.45,.48)],T={x:cx(t),y:midY(t)},st={k:0,on:true,t:0};
  effects.push({update(dt){st.t+=dt;if(st.on)for(const o of os){for(let i=0;i<4;i++){const q=rnd(0,st.k),x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*30;part({x,y,vx:rnd(-90,90),vy:rnd(-90,50),g:600,life:.4,size:rnd(3,6),rgb:pick(['70,40,20','110,65,30','200,150,90']),add:false,shape:'drop'});}
      if(Math.random()<.4)part({x:o.x+(T.x-o.x)*st.k,y:o.y+(T.y-o.y)*st.k,vx:rnd(-30,30),vy:-rnd(30,70),life:.8,size:rnd(10,16),grow:20,rgb:'240,235,230',add:false,shape:'smoke'});}return st.on;},
    draw(){for(const o of os){drawLiquid(liquidPath(o,T,0,st.k,30,9),40,['#3a200c','#7a4618','rgba(240,205,150,.9)'],st.t+(o===os[0]?0:1.3));const x=o.x+(T.x-o.x)*st.k,y=o.y+(T.y-o.y)*st.k;ctx.save();ctx.fillStyle='rgba(225,190,140,.95)';for(let i=0;i<6;i++){ctx.beginPath();ctx.arc(x+Math.sin(st.t*20+i*2)*14,y+Math.cos(st.t*17+i*2.3)*14,8+3*Math.sin(i+st.t*9),0,6.29);ctx.fill();}ctx.restore();}}});
  await tween(260,k=>{st.k=k;});const bz=setInterval(()=>sfx('splash'),200);for(let i=0;i<4;i++){shake(7);t.hurt=.3;splat(T.x,T.y,['70,40,20','110,65,30','200,150,90'],12,360,'drop');puffs(T.x,T.y,3,['240,235,230','220,210,200'],[14,24],{up:110});await wait(170);}
  clearInterval(bz);hitStop(80);toss(t,40,320);hit(u,t,sk);await wait(200);st.on=false;u.pose='idle';};

// ---- Espresszó – Farokcsapás: odarohan, megpördül, és a vastag, tüskés farkával nagy ívben lecsap
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const ash=u.stance==='ash';const d=await dashTo(u,t,220,-10);u.pose='attack';sfx('whoosh');
  await tween(200,k=>{u.spin=Math.PI*easeIO(k);});const B=()=>({x:cx(u)-u.w*u.scale*.32,y:u.y+u.oy-u.h*u.scale*.22}),Tt={x:cx(t),y:midY(t)};const st={a:Math.PI*1.32,hist:[],on:true};
  const geom=a=>{const b=B(),L=Math.max(150,Math.hypot(Tt.x-b.x,Tt.y-b.y)+30),tip={x:b.x+Math.cos(a)*L,y:b.y+Math.sin(a)*L},nx=-Math.sin(a),ny=Math.cos(a),c={x:(b.x+tip.x)/2+nx*L*.22,y:(b.y+tip.y)/2+ny*L*.22},pts=[];
    for(let i=0;i<=16;i++){const q=i/16;pts.push({x:(1-q)*(1-q)*b.x+2*(1-q)*q*c.x+q*q*tip.x,y:(1-q)*(1-q)*b.y+2*(1-q)*q*c.y+q*q*tip.y});}return pts;};
  const drawT=(pts,al)=>{ctx.save();ctx.globalAlpha=al;ctx.lineCap='round';for(let i=1;i<pts.length;i++){const w=44*(1-(i/pts.length)*.78);ctx.strokeStyle=OL;ctx.lineWidth=w+6;ctx.beginPath();ctx.moveTo(pts[i-1].x,pts[i-1].y);ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();}
    for(let i=1;i<pts.length;i++){const w=44*(1-(i/pts.length)*.78);ctx.strokeStyle=ash?'#8a8a96':(i%2?'#c0301e':'#d8442a');ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(pts[i-1].x,pts[i-1].y);ctx.lineTo(pts[i].x,pts[i].y);ctx.stroke();ctx.strokeStyle=ash?'rgba(230,230,240,.5)':'rgba(255,170,110,.55)';ctx.lineWidth=w*.25;ctx.stroke();}
    for(let i=2;i<pts.length-1;i+=2){const p=pts[i],q=pts[i+1],an=Math.atan2(q.y-p.y,q.x-p.x)-Math.PI/2,s=16*(1-i/pts.length*.6);ctx.fillStyle=ash?'#e0e0e8':'#ffcf6a';ctx.strokeStyle=OL;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(p.x+Math.cos(an+.6)*s*.7,p.y+Math.sin(an+.6)*s*.7);ctx.lineTo(p.x+Math.cos(an)*s*1.7,p.y+Math.sin(an)*s*1.7);ctx.lineTo(p.x+Math.cos(an-.6)*s*.7,p.y+Math.sin(an-.6)*s*.7);ctx.closePath();ctx.fill();ctx.stroke();}
    const e=pts[pts.length-1],f=pts[pts.length-2],an=Math.atan2(e.y-f.y,e.x-f.x);ctx.translate(e.x,e.y);ctx.rotate(an);ctx.fillStyle=ash?'#a0a0ac':'#8a1a12';ctx.strokeStyle=OL;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(26,0);ctx.lineTo(-8,-18);ctx.lineTo(-2,0);ctx.lineTo(-8,18);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();};
  effects.push({update(){st.hist.unshift(st.a);st.hist.length=Math.min(6,st.hist.length);return st.on;},draw(){if(st.fast)st.hist.slice(1).forEach((a,i)=>drawT(geom(a),.16*(1-i/6)));drawT(geom(st.a),1);}});
  await tween(160,k=>{st.a=Math.PI*1.32+.12*k;});st.fast=true;sfx('whoosh');const aT=Math.atan2(Tt.y-B().y,Tt.x-B().x);await tween(170,k=>{st.a=Math.PI*1.44+(aT+Math.PI*2*(aT<0?1:0)-Math.PI*1.44)*k*k;});st.fast=false;
  sfx('rock');hitStop(110);shake(18);flash('255,200,140',.25,.1);groundCrack(Tt.x,t.y+t.oy,'255,180,90',140);dustWave(Tt.x,t.y+t.oy);puffs(Tt.x,t.y+t.oy,10,['180,160,130','150,130,110'],[16,30],{w:60,up:90});sparks(Tt.x,Tt.y,['255,220,150','255,255,255'],20,460);toss(t,44,360);hit(u,t,sk);
  await wait(220);st.on=false;await tween(200,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;await dashBack(u,d);};
NOFX.add('tail');

// ---- Lekvárdzsinn – Ragacsos kéz: jól látható, ujjas lekvárkéz, ami tényleg rámarkol
A.jamHand=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('squish');const o=fp(u,.05,.3),T={x:cx(t)+10,y:midY(t)},S0={k:0,grip:0,on:true,t:0};
  const hand=(x,y,g,dir)=>{ctx.save();ctx.translate(x,y);ctx.rotate(dir);ctx.lineCap='round';const R=1.25;
    const finger=(by,sp,len,w)=>{const a1=sp*(1-g),x1=Math.cos(a1)*len*R*.55,y1=by+Math.sin(a1)*len*R*.55,a2=a1+g*1.9*(by<0?1:-1)*-1,x2=x1+Math.cos(a2)*len*R*.5,y2=y1+Math.sin(a2)*len*R*.5;
      for(const [c,ww] of [['#4a0414',w+6],['#c81e46',w],['rgba(255,150,175,.55)',w*.3]]){ctx.strokeStyle=c;ctx.lineWidth=ww;ctx.beginPath();ctx.moveTo(10,by);ctx.lineTo(x1+10,y1);ctx.lineTo(x2+10,y2);ctx.stroke();}};
    finger(-18,-.45,62,17);finger(-6,-.15,70,18);finger(6,.15,68,18);finger(18,.45,58,16);
    const gr=ctx.createRadialGradient(-10,-10,4,0,0,46);gr.addColorStop(0,'#ff7a9a');gr.addColorStop(.6,'#c81e46');gr.addColorStop(1,'#7a0a24');ctx.fillStyle=gr;ctx.strokeStyle='#4a0414';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(-4,0,36,32,0,0,6.29);ctx.fill();ctx.stroke();
    // hüvelykujj
    const ta=-1.35+g*1.1;for(const [c,ww] of [['#4a0414',24],['#c81e46',18]]){ctx.strokeStyle=c;ctx.lineWidth=ww;ctx.beginPath();ctx.moveTo(0,-24);ctx.lineTo(Math.cos(ta)*44,-24+Math.sin(ta)*44*.6);ctx.stroke();}
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.beginPath();ctx.ellipse(-14,-14,12,5,-.6,0,6.29);ctx.fill();ctx.restore();};
  effects.push({update(dt){S0.t+=dt;if(S0.on&&Math.random()<.5){const q=rnd(0,S0.k);part({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*60,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,6),rgb:'200,30,70',add:false,shape:'drop'});}return S0.on;},
    draw(){const pts=liquidPath(o,{x:o.x+(T.x-o.x)*S0.k,y:o.y+(T.y-o.y)*S0.k},0,1,60*S0.k,12);drawLiquid(pts,34,['#6a0820','#c81e46','rgba(255,160,185,.7)'],S0.t*.3);const e=pts[pts.length-1],f=pts[pts.length-2]||o;hand(e.x,e.y,S0.grip,Math.atan2(e.y-f.y,e.x-f.x));}});
  await tween(340,k=>{S0.k=easeIO(k);});sfx('squish');shake(8);await tween(200,k=>{S0.grip=k;});for(let i=0;i<3;i++){t.hurt=.3;shake(6);sfx('squish');splat(T.x,T.y,['200,30,70','255,120,150'],10,240,'drop');await wait(160);}
  hitStop(70);hit(u,t,sk);await wait(150);await tween(160,k=>{S0.grip=1-k;});await tween(260,k=>{S0.k=1-easeIO(k);});S0.on=false;u.pose='idle';};

// ---- Porcelán mandarin: a kör elején kiírja, mikor véd a tükörmáz és mikor nem
{const deM=drawEntity;drawEntity=function(e){deM(e);if(e.type==='mandarin'&&e.alive&&!S.over&&S.round&&e._mr!==S.round){e._mr=S.round;
  if(S.round%2===1){popLabel(e,'TÜKÖRMÁZ: VARÁZSLAT VISSZAVERVE!','#bfe4ff');setTimeout(()=>popLabel(e,'MOST FEGYVERREL ÜSD!','#ffe08a'),700);}else popLabel(e,'A TÜKÖRMÁZ ELTŰNT – VARÁZSOLJ!','#ffd0a0');}};}
