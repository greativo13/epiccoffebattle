// ---- Kamilla – Teaszertartás: festett porcelán kamillás csésze; a hullám KONKRÉTAN a csészéből ömlik ki (a perem alól nő ki, lezúdul, és végiggördül a hősökön)
A.teaCeremony=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{await dimTo(.35,'40,25,10',250);await bodyWind(u,260,.1);sfx('holy');
  const cup=R17I.teacup,wav=R17I.teawave,gy=Math.max(...al.map(t=>t.y+t.oy))+6,minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5));
  const CW=250,C={x:cx(u)-150,y:Math.max(150,topY(u)+40),s:0,rot:0,a:0};const ch=cup?CW*cup.height/cup.width:CW*.56;
  // a csésze peremének bal széle (a kép arányaiban mérve), elforgatva
  const lip=()=>{const lx=(.105-.5)*CW*C.s,ly=(.13-.5)*ch*C.s,c=Math.cos(C.rot),s=Math.sin(C.rot);return {x:C.x+lx*c-ly*s,y:C.y+lx*s+ly*c};};
  R18E({update(){return !C.done;},draw(){if(C.a<=0)return;if(cup){ctx.save();ctx.globalAlpha=C.a;ctx.translate(C.x,C.y);ctx.rotate(C.rot);ctx.scale(C.s,C.s);
      ctx.fillStyle='rgba(0,0,0,.18)';ctx.beginPath();ctx.ellipse(0,ch*.48,CW*.4,10,0,0,6.29);ctx.fill();ctx.drawImage(cup,-CW/2,-ch/2,CW,ch);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=C.a*.25*(1+Math.sin(T*5));ctx.drawImage(cup,-CW/2,-ch/2,CW,ch);ctx.restore();}else r15TeaCup(C.x,C.y,C.s*1.2,C.rot,C.a);}});
  for(let i=0;i<36;i++)part({x:C.x+rnd(-120,120),y:C.y+rnd(-70,50),vx:rnd(-30,30),vy:rnd(-40,20),life:rnd(.5,.9),size:rnd(2,4),rgb:pick(['255,240,190','255,255,255']),shape:'star'});
  // kamillavirágok és gőz szállnak fel a csészéből
  const steam=setInterval(()=>{const p=lip();part({x:C.x+rnd(-60,60),y:C.y-ch*.4*C.s,vx:rnd(-10,10),vy:-rnd(30,60),life:rnd(.8,1.2),size:rnd(14,24),grow:24,rgb:'250,248,240',add:false,shape:'smoke'});},90);
  await tween(480,k=>{C.a=k;C.s=eOutBack(k);});bodyStrike(u,180,-.12);sfx('whoosh');
  // megbillen a hősök felé
  await tween(520,k=>{C.rot=-1.05*easeIO(k);C.x=cx(u)-150-40*k;});clearInterval(steam);
  // a hullám kibújik a peremből: kicsiként indul a perem alatt, lezúdul a földre, közben nő
  const p0=lip(),land={x:p0.x-120,y:gy},Wv={x:p0.x,y:p0.y+10,w:60,a:1,on:true,t:0},done=new Set();
  const drawWave=()=>{if(!Wv.on||Wv.a<=0)return;if(wav){const h=Wv.w*wav.height/wav.width;ctx.save();ctx.globalAlpha=Wv.a;ctx.translate(Wv.x,Wv.y);ctx.scale(1,1+.03*Math.sin(Wv.t*7));ctx.drawImage(wav,-Wv.w*.35,-h*.96,Wv.w,h);ctx.restore();}else r16Wave(Wv.x,Wv.y,Wv.w*.4,Wv.w,Wv.t,Wv.a);};
  // a perem és a hullám háta közti teasugár (vastag, aranybarna)
  const St={on:true};R18E({update(dt){Wv.t+=dt;return Wv.on||St.on;},draw(){if(St.on){const p=lip(),bx=Wv.x+Wv.w*.45,by=Wv.y-Wv.w*.2;ctx.save();ctx.lineCap='round';
      for(const [ww,col] of [[34,'rgba(196,112,30,.8)'],[22,'rgba(236,170,70,.85)'],[7,'rgba(255,238,196,.8)']]){ctx.strokeStyle=col;ctx.lineWidth=ww*C.s;ctx.beginPath();ctx.moveTo(p.x,p.y);for(let i=1;i<=12;i++){const q=i/12,x=p.x+(bx-p.x)*q*q+Math.sin(q*9+T*20)*4,y=p.y+(by-p.y)*q;ctx.lineTo(x,y);}ctx.stroke();}ctx.restore();
      if(Math.random()<.6)part({x:p.x+(bx-p.x)*.5+rnd(-10,10),y:(p.y+by)/2,vx:rnd(-80,40),vy:rnd(-40,40),g:600,life:.4,size:rnd(2,5),rgb:pick(['255,240,210','236,170,70']),add:false,shape:'drop'});}drawWave();}});
  sfx('water');sfx('splash');const bz=setInterval(()=>sfx('water'),260);
  await tween(620,k=>{const e=easeIO(k);Wv.x=p0.x+(land.x-p0.x)*e;Wv.y=p0.y+10+(land.y-p0.y-10)*(k*k);Wv.w=60+240*e;
    if(Math.random()<.7)part({x:Wv.x+rnd(-30,30),y:Wv.y-rnd(0,Wv.w*.3),vx:rnd(-160,60),vy:-rnd(60,220),g:800,life:rnd(.4,.7),size:rnd(3,6),rgb:pick(['255,245,225','236,170,70']),add:false,shape:'drop'});});
  shake(10);splat(land.x,gy-10,['230,160,60','255,240,210'],26,420,'drop');puffs(land.x,gy-20,8,['250,248,240'],[22,36],{w:90,up:60});
  // végiggördül a hősökön, közben egyre nagyobb
  await tween(1500,k=>{const e=easeIO(k);Wv.x=land.x-(land.x-(minX-320))*e;Wv.y=gy;Wv.w=300+330*Math.min(1,k*1.8);if(k>.25)St.on=false;
    for(let i=0;i<2;i++)part({x:Wv.x+rnd(-30,30),y:gy-Wv.w*.45*rnd(.6,1),vx:rnd(-320,-60),vy:rnd(-260,-40),g:700,life:rnd(.4,.8),size:rnd(3,7),rgb:pick(['255,245,225','236,170,70']),add:false,shape:'drop'});
    for(const t of al)if(!done.has(t)&&Wv.x<cx(t)+20){done.add(t);shake(14);hitStop(70);toss(t,70,460);t.hurt=.45;splat(cx(t),midY(t),['230,160,60','255,240,210'],24,380,'drop');hit(u,t,sk);}});
  clearInterval(bz);St.on=false;await tween(300,k=>{Wv.a=1-k;});Wv.on=false;for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  await tween(380,k=>{C.rot=-1.05*(1-easeIO(k));C.a=1-k;});C.done=true;await bodySettle(u);await dimTo(0,null,300);}finally{rel();}};
NOFX.add('teaCeremony');

// ---- Morgána – Cerberus (Éjféli rontás → limit): festett lila lángoszlop nyeli el Morgánát (nem apró lángok);
// a harapás: Cerberus a helyén marad, a fejéből egy óriási, lidércszerű kutyafej csap le, és összezárja az állkapcsát a célponton
function r18Hound(x0,y0,x1,y1,W1){const im=R17I.hound;const H={x:x0,y:y0,w:W1*.35,a:0,sy:1,on:true};
  R18E({update(){return H.on;},draw(){if(H.a<=0||!im)return;ctx.save();ctx.globalAlpha=H.a;ctx.translate(H.x,H.y);ctx.scale(-1,H.sy);const h=H.w*im.height/im.width;
    ctx.drawImage(im,-H.w*.22,-h*.55,H.w,h);ctx.drawImage(im,-H.w*.22,-h*.55,H.w,h);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=H.a*.6;ctx.drawImage(im,-H.w*.22,-h*.55,H.w,h);ctx.restore();
    ctx.save();ctx.globalCompositeOperation='lighter';glow(H.x-H.w*.25,H.y,H.w*.45,'170,70,255',.3*H.a);ctx.restore();}});
  return (async()=>{sfx('growl');await tween(240,k=>{const e=easeIO(k);H.a=Math.min(1,k*2);H.x=x0+(x1-x0)*e;H.y=y0+(y1-y0)*e-Math.sin(k*Math.PI)*60;H.w=W1*(.35+.65*e);
      if(Math.random()<.45)darkFlame({x:H.x-H.w*rnd(.4,.7),y:H.y+rnd(-40,40),vx:-rnd(60,160),vy:-rnd(20,80),life:.35,size:rnd(14,22)});});
    // az állkapocs összecsattan (függőleges összenyomás), villanás
    sfx('bite');await tween(90,k=>{H.sy=1-.38*k;});flash('170,60,255',.35,.1);shake(16);hitStop(70);
    for(let i=0;i<14;i++)part({x:x1+rnd(-40,40),y:y1+rnd(-40,40),vx:rnd(-260,260),vy:rnd(-260,120),life:rnd(.3,.5),size:rnd(3,6),rgb:pick(['200,90,255','255,255,255','140,40,220']),shape:'streak'});
    await tween(120,k=>{H.sy=.62+.38*k;});await tween(200,k=>{H.a=1-k;H.x=x1+20*k;});H.on=false;})();}
A.cerberus=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u._cerb=false;if(!al.length)return;const im=FX_IMG.cerberus,pim=R17I.firepillar;await dimTo(.8,'20,0,25',300);sfx('dark');
  const C={x:cx(u),y:u.y+u.oy,a:0,s:.3,open:0,on:true,t:0,lunge:0},Hh=u.h*u.scale*1.25;
  R18E({update(dt){C.t+=dt;return C.on;},draw(){if(!im||C.a<=0)return;const H2=Hh*C.s,W2=H2*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(C.x+C.lunge*40,C.y);ctx.scale(-1,1);
      ctx.translate(0,Math.sin(C.t*14)*3*C.open);ctx.rotate(-.06*C.open-.05*C.lunge);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.22+.18*Math.sin(C.t*8);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.restore();
      ctx.save();ctx.globalCompositeOperation='lighter';for(const [fu,fv] of [[.06,.2],[.04,.5],[.2,.45]]){const ex=C.x+C.lunge*40+(W2/2-fu*W2),ey=C.y-H2+fv*H2;glow(ex,ey,14+10*C.open,'255,60,160',.6*C.a);}ctx.restore();}});
  // átváltozás: hatalmas festett lila lángoszlop csap fel Morgána körül, ő eltűnik benne
  const F={k:0,a:0,on:true},fx=cx(u),fy=u.y+u.oy+12,fw=u.w*u.scale*3.6;
  R18E({update(){if(F.on&&F.a>0&&Math.random()<.9)darkFlame({x:fx+rnd(-fw*.3,fw*.3),y:fy-rnd(0,40),vx:rnd(-40,40),vy:-rnd(160,320),life:rnd(.4,.7),size:rnd(20,34)});return F.on;},
    draw(){if(F.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(fx,fy-Hh*.5,fw*.8,'150,50,255',.45*F.a);ctx.restore();
      if(pim){for(const [dx,ww,ph] of [[-.22,.8,0],[.22,.8,2],[0,1.05,4]]){const sy=F.k*(1+.06*Math.sin(C.t*18+ph));ctx.save();ctx.globalAlpha=F.a;ctx.globalCompositeOperation='lighter';ctx.translate(fx+dx*fw*.5,fy);ctx.scale(1,sy);const w=fw*ww,h=w*pim.height/pim.width;ctx.drawImage(pim,-w/2,-h,w,h);ctx.restore();}}}});
  sfx('fire');sfx('wail');rumble(1.4,10);await tween(420,k=>{F.k=eOutBack(k);F.a=k;});await tween(380,k=>{u.alpha=1-k;});u.alpha=0;flash('150,60,255',.45,.2);
  await tween(450,k=>{C.a=k;C.s=.3+.7*eOutBack(k);F.a=1-k*.8;});await tween(300,k=>{F.a=.2*(1-k);});F.on=false;
  sfx('growl');sfx('wail');shake(12);await tween(350,k=>{C.open=Math.sin(k*Math.PI);});
  // harapások: a három fej felől egy-egy lidérc-kutyafej csap le (Cerberus helyben előrevetődik)
  const H2=Hh,W2=H2*(im?im.width/im.height:1.4),heads=[[.06,.2],[.04,.5],[.2,.45]].map(([fu,fv])=>()=>({x:C.x+C.lunge*40+(W2/2-fu*W2),y:C.y-H2+fv*H2}));let hi=0;
  for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){for(let b=0;b<2;b++){if(!t.alive)break;const h0=heads[hi++%3]();C.open=1;tween(200,k=>{C.lunge=Math.sin(k*Math.PI);});
      await r18Hound(h0.x,h0.y,cx(t)-20,midY(t)-10,Math.max(330,t.w*t.scale*2.2));t.hurt=.45;toss(t,40,300);for(let i=0;i<4;i++)darkFlame({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-20,30),vx:rnd(-40,40),vy:-rnd(60,140),life:.5,size:rnd(16,24)});C.open=0;await wait(80);}}
  // a föld lila-feketén izzik, lángoszlopok törnek fel (17. kör szerint)
  const G={a:0,on:true},cols=al.map(t=>({x:cx(t),gy:t.y+t.oy,r:Math.max(70,t.w*t.scale*.75)}));
  R18E({update(){return G.on;},draw(){if(G.a<=0)return;for(const c of cols){ctx.save();ctx.translate(c.x,c.gy);ctx.scale(1,.3);const g=ctx.createRadialGradient(0,0,4,0,0,c.r*1.4);g.addColorStop(0,`rgba(200,110,255,${.9*G.a})`);g.addColorStop(.35,`rgba(110,30,190,${.8*G.a})`);g.addColorStop(.75,`rgba(30,0,40,${.75*G.a})`);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,c.r*1.4,0,6.29);ctx.fill();ctx.restore();}}});
  sfx('rock');rumble(1,6);await tween(600,k=>{G.a=k;});C.open=1;sfx('growl');sfx('fire');sfx('boom');flash('170,80,255',.45,.2);shake(20);hitStop(100);
  for(const c of cols){const P2={k:0,t:0};R18E({update(dt){P2.t+=dt;P2.k=Math.min(1,P2.t/.25);if(P2.t<1&&Math.random()<.8)darkFlame({x:c.x+rnd(-c.r*.5,c.r*.5),y:c.gy,vx:rnd(-20,20),vy:-rnd(300,500),life:rnd(.5,.8),size:rnd(18,30)});return P2.t<1.3;},
      draw(){if(!pim)return;const a=P2.t<1?1:1-(P2.t-1)/.3,w=c.r*2.6,sy=P2.k*(1+.05*Math.sin(P2.t*30));ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';ctx.translate(c.x,c.gy+10);ctx.scale(1,sy);ctx.drawImage(pim,-w/2,-w*pim.height/pim.width,w,w*pim.height/pim.width);ctx.restore();}});}
  await wait(250);for(const t of al){if(!t.alive)continue;t.hurt=.5;toss(t,60,380);hit(u,t,sk);}await wait(800);G.on=false;C.open=0;
  await tween(400,k=>{C.a=1-k;C.s=1-.5*k;u.alpha=k;});u.alpha=1;C.on=false;u.pose='idle';await dimTo(0,null,350);};
NOFX.add('cerberus');

// ---- Térkép: vissza az eredeti, tájhoz kötött pöttyhelyek (a fán, a romokban, a vulkánon, a toronyban); az egyenes arany vonal helyett íves, tintás pontsor-ösvény
{const P1=[[[18,80],[31,81],[41,68],[25,63]],[[27,42],[23,30],[44,36],[35,21]],[[52,78],[58,71],[74,71],[66,47]],[[77,51],[84,43],[91,37],[85,17]]],
  P2=[[[23,82],[30,71],[14,70],[19,57]],[[36,55],[41,43],[29,36],[38,22]],[[52,50],[58,70],[67,80],[75,62]],[[69,40],[77,31],[88,33],[84,15]]];
 for(let i=0;i<4;i++){MAP_POS[i]=P1[i];if(MAP_POS.length>4+i)MAP_POS[4+i]=P2[i];}}
{const st=document.createElement('style');st.textContent='.map-route{display:none!important}.map-trail{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:visible}';document.head.appendChild(st);
 const m18=mapScreen;mapScreen=function(zi){const r=m18.apply(this,arguments);try{const v=ov.querySelector('.map-view');if(v&&!v.querySelector('.map-trail')){const ns=[...v.querySelectorAll('.mnode')].filter(n=>n.style.left&&n.style.top);
  if(ns.length>1){const P=ns.map(n=>[parseFloat(n.style.left),parseFloat(n.style.top)]),NS='http://www.w3.org/2000/svg',sv=document.createElementNS(NS,'svg');sv.setAttribute('class','map-trail');sv.setAttribute('viewBox','0 0 100 100');sv.setAttribute('preserveAspectRatio','none');
   // Catmull–Rom görbe a pöttyökön át (íves ösvény, nem egyenes vonal)
   let d=`M${P[0][0]},${P[0][1]}`;for(let i=0;i<P.length-1;i++){const p0=P[Math.max(0,i-1)],p1=P[i],p2=P[i+1],p3=P[Math.min(P.length-1,i+2)];const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];d+=` C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${p2[0]},${p2[1]}`;}
   for(const [w,c,da] of [['9px','rgba(255,240,200,.35)',''],['5px','rgba(70,38,10,.85)','0.1 11']]){const pa=document.createElementNS(NS,'path');pa.setAttribute('d',d);pa.setAttribute('fill','none');pa.setAttribute('stroke',c);pa.setAttribute('vector-effect','non-scaling-stroke');pa.style.strokeWidth=w;pa.setAttribute('stroke-linecap','round');if(da)pa.setAttribute('stroke-dasharray',da);sv.appendChild(pa);}
   v.insertBefore(sv,v.firstChild);}}}catch(e){console.error(e);}return r;};}
