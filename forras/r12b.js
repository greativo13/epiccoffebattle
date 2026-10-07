
// ===== 12. kör – ellenfelek I. =====
// ---- Kóbor szellem – Hideg érintés: nem hajol előre; a KINYÚJTOTT KEZÉBŐL árad a fagyos köd, a hőst jégkristályok zárják be
A.ghostChill=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('chill');const H0=()=>fp(u,.08,.53),T0={x:cx(t),y:midY(t)},st={t:0,on:true,ch:0};
  effects.push({update(dt){st.t+=dt;const h=H0();if(st.ch<1){for(let i=0;i<2;i++){const a=rnd(0,6.28),r=rnd(30,60);part({x:h.x+Math.cos(a)*r,y:h.y+Math.sin(a)*r,vx:-Math.cos(a)*r*2.5,vy:-Math.sin(a)*r*2.5,life:.4,size:rnd(2,4),rgb:pick(['220,245,255','255,255,255']),shape:'star'});}}
      if(st.on&&st.ch>=1){for(let i=0;i<4;i++){const life=rnd(.45,.65),tx=T0.x+rnd(-40,40),ty=T0.y+rnd(-50,40);part({x:h.x+rnd(-8,8),y:h.y+rnd(-8,8),vx:(tx-h.x)/life,vy:(ty-h.y)/life,drag:.3,life,size:rnd(14,24),grow:40,rgb:pick(['225,240,255','200,225,255','245,250,255']),add:false,shape:'smoke'});}
        for(let i=0;i<3;i++){const life=rnd(.35,.5);part({x:h.x,y:h.y,vx:(T0.x-h.x)/life+rnd(-80,80),vy:(T0.y-h.y)/life+rnd(-80,80),life,size:rnd(3,6),rgb:pick(['200,240,255','255,255,255']),shape:'star'});}}
      return st.on||st.t<.1;},
    draw(){const h=H0(),a=Math.min(1,st.ch*1.5);ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,30+40*a,'170,220,255',.8*a);glow(h.x,h.y,14+10*a,'255,255,255',.9*a);ctx.restore();}});
  await tween(420,k=>{st.ch=k;});st.ch=1;sfx('ice');await wait(650);
  // jégbörtön: kristályok nőnek ki a hős körül, dér a földön
  const x=cx(t),gy=t.y+t.oy,hh=t.h*t.scale,cr=[];for(let i=0;i<11;i++){const q=i/10;cr.push({x:x+(q-.5)*t.w*t.scale*1.5+rnd(-8,8),h:rnd(.5,1)*hh*(1-Math.abs(q-.5)*.8),a:(q-.5)*.9+rnd(-.12,.12),k:0,d:Math.abs(q-.5)*.25});}
  const F={t:0};effects.push({update(dt){F.t+=dt;for(const c of cr)c.k=Math.min(1,Math.max(0,(F.t-c.d)*5));return F.t<1.5;},draw(){const a=Math.min(1,(1.5-F.t)*3);ctx.save();ctx.globalAlpha=a*.75;ctx.translate(x,gy);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,10,0,0,150);g.addColorStop(0,'rgba(235,248,255,.95)');g.addColorStop(1,'rgba(160,210,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,150,0,6.29);ctx.fill();ctx.restore();
      for(const c of cr){if(c.k<=0)continue;ctx.save();ctx.globalAlpha=a;ctx.translate(c.x,gy);ctx.rotate(c.a);drawCrystal(0,-c.h*c.k/2,0,Math.max(.2,c.h*c.k/44),'170,225,255');ctx.restore();}
      ctx.save();ctx.globalCompositeOperation='lighter';glow(x,gy-hh*.5,hh*.8,'180,225,255',.35*a);ctx.restore();}});
  sfx('glass');shake(8);t.hurt=.4;hit(u,t,sk);st.on=false;await wait(1050);sfx('glass');shardBurst(x,gy-hh*.4,14,'170,225,255',360,.7);await wait(250);u.pose='idle';};

// ---- Obszidián lovag – Obszidiánfal: hatalmas, csipkés fekete sziklatömbök törnek ki a földből izzó lávarepedésekkel, aztán rádőlnek a hősökre és sziklákra törnek
function mkRock(w,h,seed){const pts=[],n=9;let r=seed||Math.random()*1000;const R=()=>{r=(r*9301+49297)%233280;return r/233280;};
  for(let i=0;i<n;i++){const q=i/(n-1),sn=Math.sin(q*Math.PI);pts.push([-w/2+w*q+(R()-.5)*w*.08,-h*(.55+.45*Math.pow(sn,.35))*(.86+R()*.2)+(i%2?h*.05:0)]);}
  const crack=[];for(let c=0;c<3;c++){const p=[];let x=(R()-.5)*w*.6,y=-h*(.15+R()*.2);for(let j=0;j<5;j++){p.push([x,y]);x+=(R()-.5)*w*.3;y-=h*(.1+R()*.12);}crack.push(p);}
  const facets=[];for(let f=0;f<4;f++){const x=(R()-.5)*w*.7,y=-h*(.25+R()*.5);facets.push([x,y,(R()-.5)*1.4,w*(.12+R()*.12)]);}return {w,h,pts,crack,facets};}
function drawRock(R,x,y,s=1,rot=0,glowA=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);const {w,h,pts}=R;
  ctx.beginPath();ctx.moveTo(-w/2,0);for(const p of pts)ctx.lineTo(p[0],p[1]);ctx.lineTo(w/2,0);ctx.closePath();
  const g=ctx.createLinearGradient(-w/2,-h,w/2,0);g.addColorStop(0,'#4a4458');g.addColorStop(.35,'#1e1a26');g.addColorStop(.7,'#0e0c14');g.addColorStop(1,'#2a2232');ctx.fillStyle=g;ctx.fill();ctx.lineWidth=3;ctx.strokeStyle='#08060c';ctx.stroke();
  ctx.save();ctx.clip();ctx.globalAlpha=.55;for(const f of R.facets){ctx.save();ctx.translate(f[0],f[1]);ctx.rotate(f[2]);const fg=ctx.createLinearGradient(-f[3],0,f[3],0);fg.addColorStop(0,'rgba(140,130,170,0)');fg.addColorStop(.5,'rgba(170,160,200,.7)');fg.addColorStop(1,'rgba(140,130,170,0)');ctx.fillStyle=fg;ctx.beginPath();ctx.moveTo(-f[3],0);ctx.lineTo(0,-f[3]*.7);ctx.lineTo(f[3],0);ctx.lineTo(0,f[3]*.4);ctx.closePath();ctx.fill();ctx.restore();}ctx.restore();
  if(glowA>0){ctx.lineCap='round';ctx.lineJoin='round';for(const [lw,c] of [[10,`rgba(255,90,10,${.35*glowA})`],[5,`rgba(255,150,40,${.9*glowA})`],[2,`rgba(255,240,170,${glowA})`]]){ctx.strokeStyle=c;ctx.lineWidth=lw;for(const p of R.crack){ctx.beginPath();p.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();}}}
  ctx.restore();}
A.obsWall=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';await bodyWind(u,260,.14);bodyStrike(u,200,-.2);sfx('rock');rumble(1.6,12);
  const hx=Math.max(...al.map(cx)),bx=hx+150,gy=al.reduce((q,t)=>q+t.y+t.oy,0)/al.length+30,blocks=[];
  for(let i=0;i<5;i++){const w=rnd(170,230),h=rnd(400,520);blocks.push({R:mkRock(w,h,i*77+rnd(0,500)),x:bx+(i-2)*58+rnd(-10,10),k:0,d:i*.07,rot:rnd(-.08,.08),fall:0,s:1,a:1});}
  blocks.sort((a,b)=>b.R.h-a.R.h);const st={t:0,on:true,fallStart:null};
  effects.push({update(dt){st.t+=dt;for(const b of blocks){b.k=Math.min(1,Math.max(0,(st.t-b.d)/.45));if(b.k>0&&b.k<1&&Math.random()<.6)part({x:b.x+rnd(-60,60),y:gy-rnd(0,20),vx:rnd(-120,120),vy:-rnd(40,160),drag:1,life:rnd(.6,1),size:rnd(16,28),grow:30,rgb:pick(['120,100,90','90,80,75']),add:false,shape:'dsmoke'});}
      if(st.fallStart!=null){const f=Math.min(1,(st.t-st.fallStart)/.42);for(const b of blocks)b.fall=f*f;}
      if(Math.random()<.5){const b=pick(blocks);if(b.k>.5)part({x:b.x+rnd(-30,30),y:gy-b.R.h*b.k*rnd(.2,.8),vx:rnd(-30,30),vy:-rnd(20,60),life:.6,size:rnd(2,4),rgb:pick(['255,160,60','255,220,120'])});}return st.on;},
    draw(){for(const b of blocks){if(b.k<=0||b.a<=0)continue;const e=eOutBack(b.k),y=gy+b.R.h*(1-e)*.9;ctx.save();ctx.globalAlpha=b.a;
        // a tömb az alja körül dől a hősök felé (balra)
        ctx.beginPath();ctx.rect(-4000,-4000,9000,gy+4002);ctx.clip();ctx.translate(b.x,gy);ctx.rotate(b.rot-b.fall*1.45);ctx.translate(-b.x,-gy);drawRock(b.R,b.x,y,1,0,.6+.4*Math.sin(st.t*7+b.x));ctx.restore();
        ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,gy-6,90*b.k,'255,120,30',.35*b.k*(1-b.fall));ctx.restore();}}});
  const bz=setInterval(()=>sfx('rock'),180);await wait(700);clearInterval(bz);groundCrack(bx,gy,'255,130,40',260);shake(10);await wait(350);
  sfx('whoosh');st.fallStart=st.t;await wait(430);
  sfx('rock');sfx('boom');shake(24);hitStop(120);flash('255,150,60',.35,.15);
  for(const b of blocks){b.a=0;const px=b.x-b.R.h*.7;fallDebris(px,gy-40,6,(x,y,r,s)=>drawRock(b.R,x,y,.28*s,r,.8),{v:360,w:90,life:1.1,s:1});fireBurst(px,gy-30,8,[16,28],220);puffs(px,gy-20,6,['90,80,75','120,100,90'],[26,42],{w:80,up:120,shape:'dsmoke'});}
  for(const t of al){t.hurt=.45;toss(t,26,300);hit(u,t,sk);}st.on=false;await wait(500);await bodySettle(u);u.pose='idle';};

// ---- Espresszó – Farokcsapás: közel ugrik, megperdül, magasra emeli a VASTAG farkát, és teljes testtel lecsapja (mérsékelt nyújtás)
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d={dx:0,dy:0};u.pose='idle';sfx('whoosh');
  await tween(240,k=>{u.spin=Math.PI*easeIO(k);u.sq=1-.08*Math.sin(k*Math.PI);});u.spin=Math.PI;u.sq=1;
  const T=limbOn(u,'espresso');if(!T){u.spin=0;await dashBack(u,d);return;}const tl=T.tail;tl.blur=true;
  const aim=limbAim(u,'espresso','tail',.62,.97,cx(t)+10,midY(t)+10);const S1=1.4,sx=Math.max(1,Math.min(4.5,aim.sx/S1));tl.ax=aim.ax;
  const trail=[];const st={on:true};effects.push({update(){if(st.rec){const p=limbPt(u,'tail',.62,.97);trail.push({x:p.x,y:p.y,a:1});}for(const q of trail)q.a-=.08;while(trail.length&&trail[0].a<=0)trail.shift();return st.on||trail.length;},
    draw(){if(trail.length<2)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=1;i<trail.length;i++){const a=trail[i].a;ctx.strokeStyle=`rgba(255,200,140,${.35*a})`;ctx.lineWidth=46*a;ctx.beginPath();ctx.moveTo(trail[i-1].x,trail[i-1].y);ctx.lineTo(trail[i].x,trail[i].y);ctx.stroke();}ctx.restore();}});
  await tween(320,k=>{const e=easeIO(k);tl.rot=(aim.rot-1.7)*e;tl.s=1+(S1-1)*e;u.lean=.12*e;u.jump=10*e;});sfx('whoosh');st.rec=true;
  await tween(170,k=>{const e=eOutBack(k);tl.rot=aim.rot-1.7+1.7*e;tl.sx=1+(sx-1)*Math.min(1,k*1.4);u.lean=.12-.26*e;u.jump=10*(1-k);});st.rec=false;
  sfx('rock');hitStop(120);shake(20);flash('255,200,140',.25,.1);const P=limbPt(u,'tail',.62,.97);groundCrack(P.x,t.y+t.oy,'255,180,90',160);dustWave(P.x,t.y+t.oy);puffs(P.x,t.y+t.oy,14,['180,160,130','150,130,110'],[18,34],{w:70,up:100});
  sparks(cx(t),midY(t),['255,220,150','255,255,255'],26,480);soundBlast(cx(t),midY(t),'255,210,150',180,380);toss(t,50,380);hit(u,t,sk);
  await wait(200);await tween(320,k=>{const e=easeIO(k);tl.rot=aim.rot*(1-e);tl.sx=sx+(1-sx)*e;tl.s=S1+(1-S1)*e;u.lean=-.14*(1-e);});tl.blur=false;limbOff(u);u.lean=0;st.on=false;
  await tween(240,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;};

// ---- Káoszkocka – Kockaeső / Morcus – Káoszkockák: sok valódi, pöttyös dobókocka zúdul le, pattog, aztán elemi robbanásban szétrobban
const DIE_PIPS={1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
function qDie(x,y,s,rot,face,col){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);const c=FACE[col]||FACE.dark;
  // oldallapok (térhatás)
  ctx.fillStyle=shadeHex(c[0],-.45);ctx.beginPath();ctx.moveTo(14,-14);ctx.lineTo(20,-20);ctx.lineTo(20,8);ctx.lineTo(14,14);ctx.closePath();ctx.fill();
  ctx.fillStyle=shadeHex(c[0],.25);ctx.beginPath();ctx.moveTo(-14,-14);ctx.lineTo(-8,-20);ctx.lineTo(20,-20);ctx.lineTo(14,-14);ctx.closePath();ctx.fill();
  const g=ctx.createLinearGradient(-14,-14,14,14);g.addColorStop(0,shadeHex(c[0],.35));g.addColorStop(1,shadeHex(c[0],-.2));ctx.fillStyle=g;ctx.beginPath();ctx.roundRect?ctx.roundRect(-14,-14,28,28,5):ctx.rect(-14,-14,28,28);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.55)';ctx.lineWidth=1.4;ctx.stroke();
  ctx.fillStyle='#fff';for(const [a,b] of DIE_PIPS[face]||DIE_PIPS[5]){ctx.beginPath();ctx.arc(a*7.5,b*7.5,2.9,0,6.29);ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.ellipse(-6,-8,7,3,-.5,0,6.29);ctx.fill();ctx.restore();}
function shadeHex(h,k){const n=parseInt(h.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(k>0?v+(255-v)*k:v*(1+k))));return `rgb(${f(r)},${f(g)},${f(b)})`;}
A.dice=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const boss=u.type==='morcus',rel=u.type==='ccube'?keepPose(u):null;
  try{if(rel){await bodyWind(u,200,.1);bodyStrike(u,160,-.1);}else await castPose(u,'190,100,255',380);u.pose=rel?'idle':'attack';sfx('dark');
  const minX=Math.min(...al.map(cx))-120,maxX=Math.max(...al.map(cx))+120,dice=[],sc=boss?1.9:1.45;
  for(const t of al)for(let j=0;j<(boss?10:9);j++)dice.push({t,gx:cx(t)+rnd(-60,60),gy:t.y+t.oy-rnd(0,30)});
  for(let j=0;j<(boss?24:18);j++)dice.push({t:null,gx:rnd(minX,maxX),gy:rnd(H*.6,H*.9)});
  dice.forEach(d=>{d.d=rnd(0,.7);d.x0=d.gx+rnd(-160,40);d.col=pick(CUBE_FACES);d.face=1+Math.floor(rnd(0,6));d.r=rnd(0,6);d.s=sc*rnd(.85,1.2);d.k=0;d.b=0;d.done=false;});
  const st={t:0};effects.push({update(dt){st.t+=dt;for(const d of dice){if(st.t<d.d||d.done)continue;if(d.k<1){d.k=Math.min(1,d.k+dt/.3);d.r+=dt*14;if(Math.random()<.3)d.face=1+Math.floor(rnd(0,6));if(d.k>=1){sfx('click');shake(2);d.bt=st.t;}}
        else{const q=(st.t-d.bt);d.b=Math.abs(Math.sin(q*9))*40*Math.max(0,1-q*2.2);d.r+=dt*6*Math.max(0,1-q*2);if(q>.55){d.done=true;const rgb=FACE[d.col][1];soundBlast(d.gx,d.gy-20,rgb,boss?120:90,320);sparks(d.gx,d.gy-20,[rgb,'255,255,255'],12,360);
          if(d.col==='fire')fireBurst(d.gx,d.gy-20,6,[12,22],180);else if(d.col==='dark')puffs(d.gx,d.gy-20,4,['60,30,90','40,20,60'],[16,26],{shape:'dsmoke'});else if(d.col==='ice')shardBurst(d.gx,d.gy-20,3,'170,225,255',200,.5);}}}return st.t<3;},
    draw(){for(const d of dice){if(st.t<d.d||d.done)continue;const k=d.k,x=d.x0+(d.gx-d.x0)*k,y=-60+(d.gy-20+60)*k*k-d.b;const rgb=FACE[d.col][1];ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,30*d.s,rgb,.45);ctx.restore();
        if(k<1){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(${rgb},.35)`;ctx.lineWidth=14*d.s;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-(d.gx-d.x0)*.12,y-90);ctx.stroke();ctx.restore();}
        qDie(x,y,d.s,d.r,d.face,d.col);}}});
  const bz=setInterval(()=>sfx('click'),90);await wait(1100);clearInterval(bz);for(const t of al){t.hurt=.4;hit(u,t,sk);await wait(60);}await wait(700);}
  finally{if(rel){await bodySettle(u);rel();}u.pose='idle';}};

// folyadéksugár cseppekből: lüktető, szakadozó, áttetsző, csillanó – nem merev rúd
function drawJet(o,T,k,arc,w,t){const L=Math.hypot(T.x-o.x,T.y-o.y),n=Math.max(8,Math.round(L*k/7));ctx.save();
  for(const [f,col] of [[1,'rgba(70,36,12,.55)'],[.62,'rgba(160,96,40,.75)']]){ctx.fillStyle=col;for(let i=0;i<=n;i++){const q=i/n*k,pul=.65+.35*Math.sin(q*40-t*30),gap=Math.sin(q*13-t*21)>.82?0:1;if(!gap)continue;const x=o.x+(T.x-o.x)*q+Math.sin(q*30+t*17)*3,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*arc+Math.cos(q*27+t*19)*3,r=w*.5*f*pul*(.55+.45*Math.min(1,q*4));ctx.beginPath();ctx.arc(x,y,r,0,6.29);ctx.fill();}}
  ctx.fillStyle='rgba(255,236,200,.85)';for(let i=0;i<=n;i+=2){const q=i/n*k;if(Math.sin(q*17-t*25)<.3)continue;const x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*arc-w*.18;ctx.beginPath();ctx.ellipse(x,y,w*.16,w*.07,Math.atan2(T.y-o.y,T.x-o.x),0,6.29);ctx.fill();}
  ctx.restore();}
// ---- Koffein-gólem – Dupla presszó: a tartálya felforr, a kéményéből gőz tör ki, és a KÉT CSÉSZÉJÉBŐL egyszerre lövi a forró eszpresszót
A.koffJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{sfx('splash');const T={x:cx(t),y:midY(t)},cups=()=>[fp(u,.135,.51),fp(u,.87,.58)],chim=()=>fp(u,.6,.08),tank=()=>fp(u,.48,.42),st={k:0,on:true,t:0,boil:0};
  effects.push({update(dt){st.t+=dt;const c=chim();if(st.boil>0&&Math.random()<st.boil)part({x:c.x+rnd(-6,6),y:c.y,vx:rnd(-20,30),vy:-rnd(80,180),drag:.6,life:rnd(.8,1.3),size:rnd(14,24),grow:45,rgb:pick(['245,245,250','230,230,236']),add:false,shape:'smoke'});
      if(st.on&&st.k>0)for(const o of cups()){for(let i=0;i<5;i++){const q=rnd(0,st.k),x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*60;part({x,y,vx:rnd(-110,110),vy:rnd(-110,60),g:600,life:.45,size:rnd(3,7),rgb:pick(['70,40,20','110,65,30','200,150,90']),add:false,shape:'drop'});}
        if(Math.random()<.7)part({x:o.x+(T.x-o.x)*st.k*rnd(.3,1),y:o.y+(T.y-o.y)*st.k-30,vx:rnd(-30,30),vy:-rnd(40,90),life:1,size:rnd(14,24),grow:30,rgb:'240,235,230',add:false,shape:'smoke'});}return st.on||st.boil>0;},
    draw(){const tk=tank();if(st.boil>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(tk.x,tk.y,70,'255,140,60',.35*st.boil+.15*Math.sin(st.t*20));ctx.restore();for(let i=0;i<5;i++){ctx.fillStyle='rgba(255,220,170,.8)';ctx.beginPath();ctx.arc(tk.x+Math.sin(st.t*7+i*2)*30,tk.y+20-((st.t*80+i*17)%50),3,0,6.29);ctx.fill();}}
      if(st.k>0)cups().forEach((o,i)=>{const T2={x:T.x,y:T.y+(i?24:-24)};drawJet(o,T2,st.k,i?110:30,30,st.t+i*1.7);ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,28,'255,190,120',.5);ctx.restore();});}});
  await tween(500,k=>{st.boil=k;u.lean=.14*easeIO(k);u.sq=1+.05*k;});sfx('splash');shake(4);bodyStrike(u,200,-.16);
  await tween(260,k=>{st.k=k;});const bz=setInterval(()=>sfx('splash'),170);
  for(let i=0;i<6;i++){shake(8);t.hurt=.3;splat(T.x,T.y,['70,40,20','110,65,30','200,150,90'],18,420,'drop');puffs(T.x,T.y,5,['240,235,230','220,210,200'],[18,30],{up:130});await wait(150);}
  clearInterval(bz);hitStop(100);flash('255,200,140',.25,.12);soundBlast(T.x,T.y,'200,150,90',230,480);puffs(T.x,T.y-10,16,['245,240,236','230,224,218'],[30,52],{w:70,h:50,up:160,l0:1.2,l1:1.9});toss(t,46,340);hit(u,t,sk);
  await wait(200);st.on=false;st.boil=0;await bodySettle(u);}finally{rel();}};

// ---- Morcus – Káoszvihar: a feje fölött tarka káoszörvény kavarog, majd minden hősre más elem csap le (tűzmeteor, jégtüske, villám, fénysugár, árnyrobbanás)
A.chaosStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';sfx('dark');await dimTo(.55,'20,0,30',250);
  const cols=[['fire','255,120,50'],['ice','120,210,255'],['thunder','255,230,80'],['holy','255,245,180'],['dark','160,90,240']];
  const xs=al.map(cx),V={x:(Math.min(...xs)+Math.max(...xs))/2,y:H*.17,r:0,t:0,on:true};
  effects.push({update(dt){V.t+=dt;if(V.on)for(let i=0;i<5;i++){const [el,rgb]=pick(cols),a=rnd(0,6.28),r=rnd(.2,1)*V.r;part({x:V.x+Math.cos(a)*r,y:V.y+Math.sin(a)*r*.35,vx:-Math.sin(a)*r*3,vy:Math.cos(a)*r*1,drag:1,life:.5,size:rnd(3,7),rgb:pick([rgb,'255,255,255']),shape:pick(['streak','star','dot'])});}
      if(V.on&&Math.random()<.5)part({x:V.x+rnd(-V.r,V.r),y:V.y+rnd(-20,20),vx:rnd(-80,80),vy:rnd(-20,20),life:.9,size:rnd(26,44),grow:30,rgb:pick(['60,30,90','90,40,120']),add:false,shape:'dsmoke'});return V.on||V.r>0;},
    draw(){if(V.r<=0)return;ctx.save();ctx.translate(V.x,V.y);ctx.scale(1,.38);ctx.globalCompositeOperation='lighter';for(let i=0;i<5;i++){const [el,rgb]=cols[i];ctx.rotate(V.t*(2+i*.4));const g=ctx.createRadialGradient(V.r*.4,0,4,V.r*.4,0,V.r*.7);g.addColorStop(0,`rgba(${rgb},.55)`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(V.r*.4,0,V.r*.7,0,6.29);ctx.fill();}
      glow(0,0,V.r*.5,'255,255,255',.35);ctx.restore();}});
  await tween(650,k=>{V.r=260*easeIO(k);});rumble(1.2,8);await wait(250);
  for(const t of al){const [el,rgb]=pick(cols),x=cx(t),y=midY(t),gy=t.y+t.oy;sfx(el==='holy'?'mirror':el==='dark'?'dark':el);
    if(el==='thunder'){for(let i=0;i<3;i++){zapStroke(zapPath(V.x+rnd(-80,80),V.y+30,x+rnd(-20,20),y,22),4,1);await wait(50);}}
    else if(el==='fire'){await flyObj({x:V.x+rnd(-60,60),y:V.y+20},{x,y},320,(px,py)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(px,py,60,'255,120,40',.8);glow(px,py,22,'255,240,200',1);ctx.restore();for(let i=0;i<3;i++)part({x:px+rnd(-14,14),y:py+rnd(-14,14),vx:rnd(-40,40),vy:-rnd(60,140),life:.45,size:rnd(14,24),grow:30,rgb:'255,150,40',add:false,shape:'fire'});});bigBoom(x,y,1);}
    else if(el==='ice'){await flyObj({x:V.x,y:V.y+20},{x,y:y-20},280,(px,py)=>{ctx.save();ctx.translate(px,py);ctx.rotate(Math.atan2(y-V.y,x-V.x)+Math.PI/2+Math.PI);drawCrystal(0,0,0,2.4,'150,220,255');ctx.restore();});shardBurst(x,y,12,'150,220,255',340,.7);}
    else if(el==='holy'){effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const a=Math.sin(this.t/.6*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-40,0,x+40,0);g.addColorStop(0,'rgba(255,245,180,0)');g.addColorStop(.5,`rgba(255,250,220,${.9*a})`);g.addColorStop(1,'rgba(255,245,180,0)');ctx.fillStyle=g;ctx.fillRect(x-45,V.y,90,gy-V.y);glow(x,gy-20,120,'255,240,170',.6*a);ctx.restore();}});await wait(250);}
    else{for(let i=0;i<14;i++)part({x:x+rnd(-30,30),y:y+rnd(-30,30),vx:rnd(-200,200),vy:rnd(-200,120),drag:1.5,life:rnd(.6,1),size:rnd(22,38),grow:35,rgb:pick(['50,20,80','80,40,120','30,10,50']),add:false,shape:'dsmoke'});await wait(150);}
    soundBlast(x,y,rgb,220,500);sparks(x,y,[rgb,'255,255,255'],26,500);shake(12);hitStop(70);t.hurt=.4;toss(t,24,260);hit(u,t,{...sk,elem:el});await wait(120);}
  V.on=false;await tween(300,k=>{V.r=260*(1-k);});V.r=0;await dimTo(0,null,250);u.pose='idle';};

// ---- Morcus – Árnykarmok: a hős alól óriási árnykezek nőnek ki a földből, megragadják, és háromszor átkaszabolják
function qShadowHand(x,y,s,k,open,flip){ctx.save();ctx.translate(x,y);ctx.scale(flip?-s:s,s);const L=105*k;if(L<2){ctx.restore();return;}
  const dark='rgba(28,8,44,.97)',mid='#3c145c';
  // alkar
  let g=ctx.createLinearGradient(0,0,0,-L);g.addColorStop(0,'rgba(20,6,30,0)');g.addColorStop(.3,dark);g.addColorStop(1,mid);ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-24,0);ctx.bezierCurveTo(-28,-L*.45,-16,-L*.75,-22,-L);ctx.lineTo(22,-L);ctx.bezierCurveTo(18,-L*.7,28,-L*.4,24,0);ctx.closePath();ctx.fill();
  if(k<.6){ctx.restore();return;}
  // tenyér
  ctx.translate(0,-L);ctx.fillStyle=mid;ctx.beginPath();ctx.moveTo(-24,4);ctx.quadraticCurveTo(-34,-20,-28,-40);ctx.lineTo(30,-44);ctx.quadraticCurveTo(36,-20,24,4);ctx.closePath();ctx.fill();
  // ujjak: ízekre bontva, a fogásnál behajlanak; a végükön hosszú, világos karom
  const fing=[[-24,-40,54,-.32],[-8,-44,64,-.1],[8,-45,62,.1],[24,-42,52,.3]];ctx.lineCap='round';ctx.lineJoin='round';
  for(const [fx,fy,len,sp] of fing){let px=fx,py=fy,an=-Math.PI/2+sp*(.4+open),seg=len/3,pts=[[px,py]];for(let j=0;j<3;j++){an+=(1-open)*.75;px+=Math.cos(an)*seg;py+=Math.sin(an)*seg;pts.push([px,py]);}
    for(const [w,c] of [[15,dark],[11,mid]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();pts.forEach((q,i)=>i?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]));ctx.stroke();}
    ctx.save();ctx.translate(px,py);ctx.rotate(an);const tg=ctx.createLinearGradient(0,0,26,0);tg.addColorStop(0,'#5a2a7a');tg.addColorStop(1,'#f4e8ff');ctx.fillStyle=tg;ctx.beginPath();ctx.moveTo(-2,-6);ctx.quadraticCurveTo(16,-6,28,4);ctx.quadraticCurveTo(14,2,-2,6);ctx.closePath();ctx.fill();ctx.restore();}
  // hüvelykujj
  ctx.strokeStyle=mid;ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(-26,-14);ctx.lineTo(-44,-30+(1-open)*16);ctx.lineTo(-46,-48+(1-open)*30);ctx.stroke();
  // lila izzás a peremén
  ctx.globalCompositeOperation='lighter';glow(0,-24,60,'170,80,255',.35);ctx.restore();}
if(ESK.chaosclaw)ESK.chaosclaw.anim='chaosClaw';
A.chaosClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('dark');await dimTo(.5,'15,0,25',220);const x=cx(t),gy=t.y+t.oy,hh=t.h*t.scale;
  const P={k:0,open:1,a:1,on:true,t:0};effects.push({update(dt){P.t+=dt;if(P.on&&Math.random()<.8)part({x:x+rnd(-90,90),y:gy-rnd(0,30),vx:rnd(-40,40),vy:-rnd(40,120),life:rnd(.7,1.1),size:rnd(20,36),grow:30,rgb:pick(['40,15,60','70,30,100']),add:false,shape:'dsmoke'});return P.on;},
    draw(){ctx.save();ctx.globalAlpha=.8*P.a;ctx.translate(x,gy+4);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,10,0,0,170);g.addColorStop(0,'rgba(10,0,20,.95)');g.addColorStop(.7,'rgba(70,20,110,.6)');g.addColorStop(1,'rgba(70,20,110,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,170,0,6.29);ctx.fill();ctx.restore();
      ctx.save();ctx.globalAlpha=P.a;qShadowHand(x-58,gy+6,hh/230,P.k,P.open,false);qShadowHand(x+58,gy+6,hh/230,P.k,P.open,true);ctx.restore();}});
  rumble(.8,6);await tween(380,k=>{P.k=eOutBack(k);});sfx('dark');await tween(160,k=>{P.open=1-.8*k;});t.hurt=.3;shake(8);sfx('bite');
  for(let i=0;i<3;i++){sfx('slash');clawMarks(x+rnd(-20,20),midY(t)+rnd(-20,20),hh*1.1,[-.7,.7,0][i],'190,110,255');shake(10);hitStop(60);t.hurt=.35;await wait(170);}
  soundBlast(x,midY(t),'170,90,255',200,420);hit(u,t,sk);await tween(260,k=>{P.open=.2+.8*k;});await tween(300,k=>{P.k=1-k;P.a=1-k;});P.on=false;await dimTo(0,null,250);u.pose='idle';};

// ---- Morcus pajzsa (1. fázis): jól látható, elemenként látványos burok (tűzgyűrű, jégpáncél, villámháló, árnyörvény)
SPR_OVER.morcus=(e,t)=>{if(!e.alive||S.over)return;let kind=null,rgb,label,sub;
  if(e.phase===1&&e.shield){kind=e.shield;rgb=(FACE[e.shield]||FACE.dark)[1];label=SHIELD_NAME[e.shield].toUpperCase();sub='Ez töri: '+(ELEM_NAMES[SHIELD_WEAK[e.shield]]||SHIELD_WEAK[e.shield]);}
  else if(e.phase===2&&S.enemies.some(x=>x.d.shadow&&x.alive)){kind='dark';rgb='160,90,240';label='ÁRNYPAJZS';sub='Előbb az árnyakat!';}
  if(!kind)return;const rx=e.h*.46,ry=e.h*.62,cy=-e.h*.5;
  ctx.save();ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(0,cy,rx*.3,0,cy,rx*1.05);g.addColorStop(0,`rgba(${rgb},.04)`);g.addColorStop(.75,`rgba(${rgb},.28)`);g.addColorStop(.95,`rgba(${rgb},.75)`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,cy,rx*1.05,ry*1.05,0,0,6.29);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.ellipse(-rx*.35,cy-ry*.45,rx*.25,ry*.12,-.6,0,6.29);ctx.fill();
  if(kind==='ice'){ctx.strokeStyle='rgba(220,248,255,.55)';ctx.lineWidth=2;for(let i=0;i<14;i++){const a=i/14*6.283,x0=Math.cos(a)*rx*.95,y0=cy+Math.sin(a)*ry*.95;ctx.beginPath();for(let k=0;k<6;k++){const b=k/6*6.283;ctx.lineTo(x0+Math.cos(b)*rx*.16,y0+Math.sin(b)*rx*.16);}ctx.closePath();ctx.stroke();}ctx.restore();
    for(let i=0;i<9;i++){const q=(i/8-.5)*2;drawCrystal(q*rx*.95,-6-Math.abs(Math.sin(i))*6,q*.5,1.1+.5*Math.cos(q*1.5),'170,230,255');}ctx.save();ctx.globalCompositeOperation='lighter';}
  else if(kind==='fire'){for(let i=0;i<16;i++){const a=i/16*6.283+t*1.5,x=Math.cos(a)*rx,y=cy+Math.sin(a)*ry,f=.7+.3*Math.sin(t*12+i*3);glow(x,y,26*f,'255,110,20',.6);glow(x,y-10*f,14*f,'255,220,120',.7);}}
  else if(kind==='thunder'){for(let i=0;i<4;i++){const a1=rnd(0,6.28),a2=a1+rnd(.6,1.6);zapStroke(zapPath(Math.cos(a1)*rx,cy+Math.sin(a1)*ry,Math.cos(a2)*rx,cy+Math.sin(a2)*ry,18),2.4,.95);}glow(0,cy,rx*.5,'255,240,120',.12+.08*Math.sin(t*30));}
  else{for(let i=0;i<12;i++){const a=i/12*6.283-t*1.8,x=Math.cos(a)*rx,y=cy+Math.sin(a)*ry;glow(x,y,30,'120,50,200',.45);glow(x,y,10,'230,190,255',.6);}}
  ctx.restore();
  // valódi részecskék a pajzs körül (képernyő-koordinátában)
  if(Math.random()<.6){const a=rnd(0,6.28),X=cx(e)+Math.cos(a)*rx,Y=e.y+e.oy+cy*e.scale+Math.sin(a)*ry*e.scale;
    if(kind==='fire')part({x:X,y:Y,vx:rnd(-20,20),vy:-rnd(40,110),life:rnd(.4,.7),size:rnd(12,22),grow:25,rgb:'255,150,40',add:false,shape:'fire'});
    else if(kind==='dark')part({x:X,y:Y,vx:-Math.sin(a)*60,vy:Math.cos(a)*60,life:rnd(.6,1),size:rnd(16,26),grow:25,rgb:pick(['50,20,80','80,40,120']),add:false,shape:'dsmoke'});
    else if(kind==='ice')part({x:X,y:Y,vx:rnd(-20,20),vy:rnd(10,40),life:.8,size:rnd(2,4),rgb:'230,250,255',shape:'star'});
    else part({x:X,y:Y,vx:rnd(-90,90),vy:rnd(-90,90),drag:2,life:.3,size:rnd(2,3),rgb:'255,250,180',shape:'streak'});}
  ctx.save();ctx.scale(-1,1);txt(label,0,cy-ry-52,20,`rgb(${rgb})`,'#1a0f24');txt(sub,0,cy-ry-34,14,'#ffffff','#1a0f24');ctx.restore();};
