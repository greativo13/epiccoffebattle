
// ===== 11. kör – ellenfelek =====
// ---- szebb karmolás: három ívelt, elvékonyodó, izzó karomnyom (a régi vonalas helyett)
clawMarks=function(x,y,sz,ang,rgb='200,120,255'){const S1={t:0};effects.push({update(dt){S1.t+=dt;if(S1.t<.15)for(let i=0;i<3;i++)part({x:x+rnd(-sz*.3,sz*.3),y:y+rnd(-sz*.3,sz*.3),vx:rnd(-120,120),vy:rnd(-120,80),drag:2,life:.4,size:rnd(2,3.5),rgb:pick([rgb,'255,255,255'])});return S1.t<.7;},
  draw(){const k=Math.min(1,S1.t/.12),a=S1.t<.25?1:Math.max(0,1-(S1.t-.25)/.45);ctx.save();ctx.translate(x,y);ctx.rotate(ang);
    for(let i=-1;i<=1;i++){const L=sz*(.95-Math.abs(i)*.12),ox=i*sz*.17,x0=-L/2,x1=x0+L*k;ctx.save();ctx.translate(ox,0);
      // izzó udvar
      ctx.globalCompositeOperation='lighter';ctx.fillStyle=`rgba(${rgb},${.28*a})`;ctx.beginPath();ctx.moveTo(x0,-L*.5);ctx.quadraticCurveTo(L*.12,0,x1,L*.5-L*(1-k));ctx.quadraticCurveTo(L*.12+8,0,x0+10,-L*.5);ctx.closePath();ctx.fill();
      // a seb: elvékonyodó sötét-világos csík
      ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(x0,-L*.5,x1,L*.5);g.addColorStop(0,`rgba(255,255,255,0)`);g.addColorStop(.25,`rgba(255,255,255,${a})`);g.addColorStop(.6,`rgba(${rgb},${a})`);g.addColorStop(1,`rgba(${rgb},0)`);
      ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x0,-L*.5);ctx.quadraticCurveTo(L*.08,-L*.02,x0+(x1-x0)*1,-L*.5+L*k);ctx.quadraticCurveTo(L*.08+5,0,x0+4,-L*.5);ctx.closePath();ctx.fill();ctx.restore();}
    ctx.restore();}});};

// ---- erősebb becsapódás: ha egy támadó „S._imp”-ben van, minden találata hanghullám-robbanást és szikrát kap
{const hI=hit;hit=function(u,t,sk){const r=hI.apply(this,arguments);if(S._imp&&S._imp.u===u&&t&&t!==u){const c=S._imp.rgb;soundBlast(cx(t),midY(t),c,Math.max(140,t.h*t.scale*.9),420);sparks(cx(t),midY(t),[c,'255,255,255'],18,420);shake(8);}return r;};}
async function withImpact(u,rgb,fn){const prev=S._imp;S._imp={u,rgb};try{return await fn();}finally{S._imp=prev;}}

// ---- Vattacukor-bárány – Édes álom: kerítés jelenik meg, vattacukor-bárányok ugranak át rajta, és a hősök elalszanak
function drawFence(x,gy,w,a){ctx.save();ctx.globalAlpha=a;ctx.lineCap='round';for(let i=0;i<5;i++){const px=x-w/2+i*w/4;ctx.fillStyle='#c89060';ctx.strokeStyle='#5a3418';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px-7,gy);ctx.lineTo(px-7,gy-70);ctx.lineTo(px,gy-82);ctx.lineTo(px+7,gy-70);ctx.lineTo(px+7,gy);ctx.closePath();ctx.fill();ctx.stroke();}
  for(const yy of [gy-25,gy-55]){ctx.fillStyle='#d8a070';ctx.strokeStyle='#5a3418';ctx.beginPath();ctx.rect(x-w/2-12,yy-7,w+24,13);ctx.fill();ctx.stroke();}ctx.restore();}
A.sweetDream=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('dust');await dimTo(.45,'40,20,60',300);
  const xs=al.map(cx),mx=Math.max(...xs)+150,gy=al.reduce((q,t)=>q+t.y+t.oy,0)/al.length+20,FW=150,F={a:0};const im=ENEMY_SPR.candysheep||ENEMY_SPR['candysheep-attack'];
  effects.push({update(){return !F.done||F.a>0;},draw(){if(F.a>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-40,160,'255,190,230',.25*F.a);ctx.restore();drawFence(mx,gy,FW,F.a);}}});
  await tween(350,k=>{F.a=k;});
  const sheep=[];for(let i=0;i<5;i++)sheep.push({d:i*.38,k:0,n:i});let count=0;const st={t:0};
  effects.push({update(dt){st.t+=dt;for(const s of sheep)s.k=Math.max(0,Math.min(1,(st.t-s.d)/1.0));return st.t<sheep.length*.38+1.1;},
    draw(){for(const s of sheep){if(s.k<=0||s.k>=1)continue;const x=mx+300-700*s.k,y=gy-Math.max(0,Math.sin(Math.min(1,Math.max(0,(s.k-.3)/.4))*Math.PI))*170-4;
        if(im){const hh=130,w=hh*im.width/im.height;ctx.save();ctx.translate(x,y);ctx.rotate(-.25*Math.sin(Math.min(1,Math.max(0,(s.k-.3)/.4))*Math.PI*2));ctx.drawImage(im,-w/2,-hh,w,hh);ctx.restore();}
        if(s.k>.5&&!s.c){s.c=1;count++;sfx('boing');const n=count;popLabel(pick(al),n+'…','#ffc8ea');}}}});
  await wait(sheep.length*380+900);sfx('holy');for(const t of al){for(let i=0;i<10;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-50,30),vx:rnd(-15,15),vy:-rnd(20,50),life:1.4,size:rnd(18,28),grow:20,rgb:pick(['255,190,225','240,200,255']),add:false,shape:'puff'});t.hurt=.2;}
  hitAll(u,al,sk);F.done=true;await tween(400,k=>{F.a=1-k;});F.a=0;await dimTo(0,null,250);u.pose='idle';};

// ---- Káoszkocka – Kockaeső: a kocka képe nem változik
{const dc=A.dice;A.dice=async(u,ts,sk)=>{const rel=u.type==='ccube'?keepPose(u):null;try{if(rel){await bodyWind(u,200,.1);bodyStrike(u,160,-.1);}await dc(u,ts,sk);}finally{if(rel){await bodySettle(u);rel();}}};}

// ---- Kristálygólem – Kristályököl: a becsapódás helyén kristálytüskék törnek elő a földből
{const cp=A.crystalPunch;A.crystalPunch=async(u,ts,sk)=>{const t=ts[0];if(!t)return cp(u,ts,sk);const x=cx(t),gy=t.y+t.oy;
  // a gólem öklén kristályfény gyűlik
  const C={on:true};effects.push({update(){if(C.on){const h=fp(u,.15,.45);for(let i=0;i<2;i++){const a=rnd(0,6.28),r=rnd(30,60);part({x:h.x+Math.cos(a)*r,y:h.y+Math.sin(a)*r,vx:-Math.cos(a)*r*3,vy:-Math.sin(a)*r*3,life:.3,size:rnd(2,4),rgb:pick(['170,235,255','255,255,255']),shape:'star'});}}return C.on;},draw(){if(!C.on)return;const h=fp(u,.15,.45);ctx.save();ctx.globalCompositeOperation='lighter';glow(h.x,h.y,70,'150,230,255',.55);ctx.restore();}});
  setTimeout(()=>{C.on=false;},500/(S.speed||1));
  let fired=false;const fx=()=>{C.on=false;sfx('glass');sfx('ice');shake(14);flash('200,240,255',.3,.12);
  // három hullámban, egyre nagyobb kristálytüskék törnek ki a földből a hős körül; a hőst felemelik, majd szilánkokra robbannak
  const sp=[];for(let w=0;w<3;w++)for(let i=0;i<7;i++){const q=(i/6-.5);sp.push({x:x+q*(120+w*70)+rnd(-12,12),h:(90+w*55)*(1-Math.abs(q)*.5)*rnd(.85,1.15),a:q*(.5+w*.15)+rnd(-.1,.1),k:0,d:w*.12+Math.abs(q)*.08,rgb:pick(['150,230,255','170,210,255','200,245,255'])});}
  sp.sort((a,b)=>a.h-b.h);toss(t,70,600);
  const st={t:0};effects.push({update(dt){st.t+=dt;for(const s of sp){const k0=s.k;s.k=Math.min(1,Math.max(0,(st.t-s.d)*6));if(k0===0&&s.k>0){sparks(s.x,gy-10,['200,245,255','255,255,255'],5,260);}}if(st.t>1.05&&!st.boom){st.boom=1;sfx('glass');for(const s of sp)shardBurst(s.x,gy-s.h*.5,2,s.rgb,300,.7);}return st.t<1.1;},
    draw(){ctx.save();ctx.globalAlpha=.7;ctx.translate(x,gy);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,10,0,0,230);g.addColorStop(0,'rgba(200,245,255,.8)');g.addColorStop(1,'rgba(120,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,230,0,6.29);ctx.fill();ctx.restore();
      for(const s of sp){if(s.k<=0)continue;ctx.save();ctx.translate(s.x,gy);ctx.rotate(s.a);ctx.globalCompositeOperation='lighter';glow(0,-s.h*s.k*.5,s.h*.45,'150,230,255',.25);ctx.globalCompositeOperation='source-over';drawCrystal(0,-s.h*s.k/2,0,Math.max(.2,s.h*s.k/44),s.rgb);ctx.restore();}}});};
  const h0=hit;hit=function(a,b){const r=h0.apply(this,arguments);if(a===u&&b===t&&!fired){fired=true;fx();}return r;};
  try{await withImpact(u,'150,230,255',()=>cp(u,ts,sk));}finally{hit=h0;}if(!fired){fired=true;fx();}C.on=false;await wait(900);};}

// ---- Csészekatona – Teafröccs: hátradől, aztán egész testével előre lendítve önti ki a forró teát; koronás fröccsenés
{const ts0=A.teaSplash;A.teaSplash=async(u,ts,sk)=>{const t=ts[0];await bodyWind(u,240,.18);bodyStrike(u,180,-.24);await withImpact(u,'200,150,90',()=>ts0(u,ts,sk));
  if(t){const x=cx(t),y=midY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const k=this.t/.6;ctx.save();ctx.globalAlpha=1-k;ctx.fillStyle='rgba(170,110,50,.9)';for(let i=0;i<9;i++){const a=-Math.PI+i/8*Math.PI,r=30+70*k;ctx.beginPath();ctx.ellipse(x+Math.cos(a)*r,y+Math.sin(a)*r*.6,6,14*(1-k*.5),a+Math.PI/2,0,6.29);ctx.fill();}ctx.restore();}});}
  await bodySettle(u);};}

// ---- Porcelánbaba – Szilánkszórás: a baba megmozdul: megperdül, felemeli a kezét, és a kezéből szórja a szilánkokat
{const sr=A.shardRain;A.shardRain=async(u,ts,sk)=>{if(u.type!=='doll')return sr(u,ts,sk);const rel=keepPose(u);try{sfx('glass');await tween(380,k=>{u.spin=Math.PI*2*easeIO(k);u.jump=Math.sin(k*Math.PI)*40;});u.spin=0;u.jump=0;await bodyWind(u,180,.12);bodyStrike(u,160,-.16);
  const h=fp(u,.3,.42);for(let i=0;i<18;i++){const s={x:h.x,y:h.y,vx:rnd(-600,-200),vy:rnd(-500,-200),r:0,t:0};effects.push({update(dt){s.t+=dt;s.vy+=700*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=dt*12;return s.t<.5;},draw(){drawShard(s.x,s.y,s.r,1.2);}});}
  await withImpact(u,'200,220,255',()=>sr(u,ts,sk));await bodySettle(u);}finally{rel();}};}

// ---- Kóbor szellem – Hideg érintés: előredől, a SZÁJÁBÓL fagyos lehelet, a hőst jégkristályok és dér borítja
{const gc=A.ghostChill;A.ghostChill=async(u,ts,sk)=>{const t=ts[0];await bodyWind(u,260,.1);bodyStrike(u,200,-.18);
  if(t){const x=cx(t),gy=t.y+t.oy;effects.push({t:0,update(dt){this.t+=dt;if(this.t<1)for(let i=0;i<2;i++)part({x:x+rnd(-90,90),y:rnd(gy-200,gy-40),vx:rnd(-20,20),vy:rnd(30,70),life:1,size:rnd(2,4),rgb:'235,245,255',shape:'star'});return this.t<1.6;},
    draw(){const a=Math.min(1,this.t*3)*Math.min(1,(1.6-this.t)*2);ctx.save();ctx.globalAlpha=a*.7;ctx.translate(x,gy);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,10,0,0,130);g.addColorStop(0,'rgba(220,240,255,.9)');g.addColorStop(1,'rgba(150,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,130,0,6.29);ctx.fill();ctx.restore();}});}
  await gc(u,ts,sk);await bodySettle(u);};}

// ---- Kóbor szellem – Jajveszékelés: a SZÁJÁBÓL induló sikoly
{const W0=A.ghostWail;A.ghostWail=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('wail');await dimTo(.4,'10,20,40',200);const m=fp(u,.37,.5);await bodyWind(u,220,.12);bodyStrike(u,200,-.14);
  for(let i=0;i<4;i++){soundBlast(m.x,m.y,'170,200,255',130+i*20,400);await wait(100);}const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,t)=>s+midY(t),0)/al.length;
  await flyObj(m,{x:mx,y:my},420,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,60,'180,210,255',.7);glow(x,y,22,'255,255,255',.9);ctx.restore();},{trail:['180,210,255','230,240,255']});
  sfx('wail');sfx('boom');flash('210,225,255',.5,.15);shake(20);hitStop(110);soundBlast(mx,my,'180,210,255',460,800);soundBlast(mx,my,'255,255,255',280,520);
  for(const t of al){t.hurt=.4;toss(t,24,260);puffs(cx(t),midY(t),6,['200,220,255','170,190,240'],[14,24]);}hitAll(u,al,sk);await bodySettle(u);await wait(300);await dimTo(0,null,250);u.pose='idle';};}

// ---- Mézeskalács – Cukormáz-bomba: nagyobb robbanás, a hősökön lecsorgó rózsaszín-fehér máz
{const ib=A.icingRain;A.icingRain=async(u,ts,sk)=>{await bodyWind(u,220,.15);bodyStrike(u,170,-.2);await withImpact(u,'255,200,230',()=>ib(u,ts,sk));
  for(const t of ts.filter(t=>t.alive)){const x=cx(t),top=topY(t),hh=t.h*t.scale,dr=[];for(let i=0;i<7;i++)dr.push({x:rnd(-.4,.4)*t.w*t.scale,l:rnd(.2,.55),c:pick(['#ffffff','#ffc6e0','#c8ecff'])});
    effects.push({t:0,update(dt){this.t+=dt;return this.t<1.6;},draw(){const a=Math.min(1,(1.6-this.t)*2);ctx.save();ctx.globalAlpha=a;for(const d of dr){const L=Math.min(d.l,this.t*.8)*hh;ctx.fillStyle=d.c;ctx.beginPath();ctx.moveTo(x+d.x-6,top+6);ctx.lineTo(x+d.x+6,top+6);ctx.lineTo(x+d.x+4,top+L);ctx.arc(x+d.x,top+L,4,0,Math.PI);ctx.closePath();ctx.fill();}ctx.restore();}});}
  await bodySettle(u);};}

// ---- Sötét hullám (Sötét mágus, Kísértetlovag): a füst magasabbra ér, nincs karmolás
A.darkwave=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await castPose(u,'150,70,255',400);sfx('dark');await dimTo(.45,'15,0,30',200);
  const wave=(x,k)=>{for(let i=0;i<7;i++)part({x:x+rnd(-70,70),y:H-rnd(40,360),vx:rnd(-160,-60),vy:-rnd(30,120),drag:.6,life:rnd(.6,1),size:rnd(20,40),grow:40,rgb:pick(['40,20,60','70,30,100','25,10,40']),add:false,shape:'dsmoke'});
    for(let i=0;i<4;i++)part({x:x+rnd(-60,60),y:H-rnd(60,380),vx:rnd(-120,-40),vy:-rnd(40,140),drag:.5,life:rnd(.3,.6),size:rnd(4,9),rgb:pick(['170,90,255','210,140,255'])});
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,H-200);ctx.scale(1,2.4);glow(0,0,170,'130,50,230',.4);ctx.restore();};
  const p=sweepWave(u,al,wave,1300);for(const t of al){const k=(cx(u)-cx(t))/(cx(u)+160);setTimeout(()=>{if(t.alive){sfx('dark');t.hurt=.4;toss(t,20,240);puffs(cx(t),midY(t),6,['60,30,90','40,20,60'],[18,30],{shape:'dsmoke'});hit(u,t,sk);}},k*1300/(S.speed||1));}
  await p;await dimTo(0,null,250);u.pose='idle';};

// ---- Altató hárfa: a húrok fényesen rezegnek, hullámzó álomköd és sok hangjegy (a támadókép beégetett zenesugara nélkül)
{const hl=A.harpLullaby;A.harpLullaby=async(u,ts,sk)=>{const rel=keepPose(u);try{await bodyWind(u,200,.06);await withImpact(u,'255,190,240',()=>hl(u,ts,sk));
  for(const t of ts.filter(t=>t.alive))puffs(cx(t),midY(t),10,['230,190,255','255,210,240'],[22,36],{shape:'puff',l0:1.2,l1:1.8});await bodySettle(u);}finally{rel();}};}
{const sn=A.stringSnap;A.stringSnap=async(u,ts,sk)=>{const rel=keepPose(u);try{await bodyWind(u,200,.1);bodyStrike(u,160,-.14);await withImpact(u,'255,230,140',()=>sn(u,ts,sk));await bodySettle(u);}finally{rel();}};}

// ---- Lekvárdzsinn – Kívánság: nagyobb lámpás, kívánság-csillagvihar, mindenkin arany aura
{const dw=A.djinnWish;A.djinnWish=async(u,ts,sk)=>{await bodyWind(u,220,.08);const st={t:0,on:true};effects.push({update(dt){st.t+=dt;if(st.on)for(let i=0;i<3;i++){const a=rnd(0,6.28),r=rnd(40,160);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r*.6,vx:-Math.cos(a)*60,vy:-Math.sin(a)*40,life:.7,size:rnd(3,6),rgb:pick(['255,220,120','255,180,220','255,255,255']),shape:'star'});}return st.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(u),midY(u),180,'255,210,140',.25);ctx.restore();}});
  try{await dw(u,ts,sk);}finally{st.on=false;}for(const e of S.enemies.filter(e=>e.alive)){effects.push({t:0,update(dt){this.t+=dt;return this.t<1;},draw(){const a=Math.sin(Math.min(1,this.t)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.8,'255,200,90',.45*a);ctx.restore();}});}await bodySettle(u);};}

// ---- Kamilla – Altatófurulya: tényleg furulyázik (fuvola a szájánál), abból szállnak a hangjegyek
{const lb=A.lullaby;A.lullaby=async(e,ts,sk)=>{if(e.type!=='kamilla')return lb(e,ts,sk);const fl={on:true};
  effects.push({update(){return fl.on;},draw(){const m=fp(e,.47,.21),x1=m.x-110,y1=m.y+38;ctx.save();ctx.lineCap='round';ctx.strokeStyle='#5a3a12';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(m.x+8,m.y-2);ctx.lineTo(x1,y1);ctx.stroke();ctx.strokeStyle='#d8b06a';ctx.lineWidth=8;ctx.stroke();
    ctx.fillStyle='#3a2208';for(let i=1;i<6;i++){const q=i/7;ctx.beginPath();ctx.arc(m.x+8+(x1-m.x-8)*q,m.y-2+(y1-m.y+2)*q-2,1.8,0,6.29);ctx.fill();}ctx.strokeStyle='#8a5a1a';ctx.lineWidth=2;for(const q of [.12,.9]){ctx.beginPath();const px=m.x+8+(x1-m.x-8)*q,py=m.y-2+(y1-m.y+2)*q;ctx.arc(px,py,5,0,6.29);ctx.stroke();}
    ctx.globalCompositeOperation='lighter';glow(x1,y1,24,'255,230,160',.5+.3*Math.sin(T*8));ctx.restore();}});
  try{await lb(e,ts,sk);}finally{fl.on=false;}};}

// ---- Kamilla – Teaszertartás és Koffein-gólem – Dupla presszó: egész testes mozdulat, nagyobb hatás
{const tc=A.teaCeremony;A.teaCeremony=async(u,ts,sk)=>{await bodyWind(u,220,.08);await withImpact(u,'255,220,140',()=>tc(u,ts,sk));await bodySettle(u);};}
A.koffJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');await bodyWind(u,260,.12);bodyStrike(u,200,-.16);const os=[fp(u,.12,.38),fp(u,.55,.55)],T={x:cx(t),y:midY(t)},st={k:0,on:true,t:0};
  effects.push({update(dt){st.t+=dt;if(st.on)for(const o of os){for(let i=0;i<6;i++){const q=rnd(0,st.k),x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*30;part({x,y,vx:rnd(-110,110),vy:rnd(-110,60),g:600,life:.45,size:rnd(3,7),rgb:pick(['70,40,20','110,65,30','200,150,90']),add:false,shape:'drop'});}
      if(Math.random()<.6)part({x:o.x+(T.x-o.x)*st.k,y:o.y+(T.y-o.y)*st.k,vx:rnd(-40,40),vy:-rnd(30,80),life:1,size:rnd(14,22),grow:25,rgb:'240,235,230',add:false,shape:'smoke'});}return st.on;},
    draw(){os.forEach((o,i)=>{drawLiquid(liquidPath(o,T,0,st.k,30,9),i?44:64,['#3a200c','#7a4618','rgba(240,205,150,.9)'],st.t+i*1.3);const x=o.x+(T.x-o.x)*st.k,y=o.y+(T.y-o.y)*st.k;ctx.save();ctx.fillStyle='rgba(225,190,140,.95)';for(let j=0;j<8;j++){ctx.beginPath();ctx.arc(x+Math.sin(st.t*20+j*2)*20,y+Math.cos(st.t*17+j*2.3)*20,10+4*Math.sin(j+st.t*9),0,6.29);ctx.fill();}ctx.restore();});}});
  await tween(260,k=>{st.k=k;});const bz=setInterval(()=>sfx('splash'),180);for(let i=0;i<5;i++){shake(8);t.hurt=.3;splat(T.x,T.y,['70,40,20','110,65,30','200,150,90'],16,400,'drop');puffs(T.x,T.y,4,['240,235,230','220,210,200'],[16,28],{up:120});await wait(160);}
  clearInterval(bz);hitStop(90);soundBlast(T.x,T.y,'200,150,90',200,450);toss(t,46,340);hit(u,t,sk);await wait(200);st.on=false;await bodySettle(u);u.pose='idle';};

// ---- Lampionlidérc – Lampionláng: a lampion SZÁJÁBÓL nagy, narancssárga tűzgolyó (a figura képe nem vált)
A.lanternFire=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{sfx('fire');await bodyWind(u,200,.1);const m=fp(u,.52,.62),T={x:cx(t),y:midY(t)};
  const B={r:5};effects.push({update(){if(B.r>0)part({x:m.x+rnd(-B.r,B.r),y:m.y+rnd(-B.r,B.r),vx:rnd(-30,30),vy:-rnd(20,70),life:.4,size:rnd(8,14),grow:20,rgb:'255,150,40',add:false,shape:'fire'});return B.r>0;},draw(){if(B.r>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,B.r*2.3,'255,140,40',.85);glow(m.x,m.y,B.r,'255,245,200',1);ctx.restore();}}});
  await tween(420,k=>{B.r=5+26*k;});B.r=0;sfx('fire');bodyStrike(u,170,-.16);
  await flyObj(m,T,380,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,58,'255,130,30',.75);glow(x,y,26,'255,240,190',1);ctx.restore();for(let i=0;i<4;i++)part({x:x+rnd(-14,14),y:y+rnd(-14,14),vx:rnd(40,140),vy:rnd(-60,10),drag:1,life:rnd(.3,.55),size:rnd(12,20),grow:30,rgb:'255,150,40',add:false,shape:'fire'});},{arc:50});
  sfx('boom');sfx('fire');flash('255,170,80',.35,.12);shake(14);hitStop(90);bigBoom(T.x,T.y,1.2);t.hurt=.4;hit(u,t,sk);await bodySettle(u);}finally{rel();}};

// ---- Lampionlidérc – Lidércrobbanás: nagyobb felragyogás és robbanás
{const wr=A.wispRain;A.wispRain=async(u,ts,sk)=>{const st={t:0,on:true};effects.push({update(dt){st.t+=dt;if(st.on)for(let i=0;i<4;i++){const a=rnd(0,6.28),r=rnd(60,140);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r,vx:-Math.cos(a)*r*2,vy:-Math.sin(a)*r*2,life:.4,size:rnd(3,6),rgb:pick(['120,200,255','255,255,255'])});}return st.on;},draw(){}});
  const rel=keepPose(u);try{setTimeout(()=>{st.on=false;},700/(S.speed||1));await wr(u,ts,sk);}finally{st.on=false;rel();}};}

// ---- Porcelán mandarin – Tusátok: egész testtel fest, tusfröccs és tuskör a hősök alatt
{const ik=A.inkWave;A.inkWave=async(u,ts,sk)=>{await bodyWind(u,240,.12);bodyStrike(u,220,-.14);const al=ts.filter(t=>t.alive);
  for(const t of al){const x=cx(t),gy=t.y+t.oy;effects.push({t:0,update(dt){this.t+=dt;return this.t<2.4;},draw(){const k=Math.min(1,this.t/.4),a=Math.min(1,(2.4-this.t)*1.5);ctx.save();ctx.globalAlpha=a*.85;ctx.translate(x,gy+2);ctx.scale(1,.28);ctx.fillStyle='#0c080e';ctx.beginPath();for(let i=0;i<=24;i++){const an=i/24*6.283,r=(70+14*Math.sin(i*2.3))*k;i?ctx.lineTo(Math.cos(an)*r,Math.sin(an)*r):ctx.moveTo(r,0);}ctx.closePath();ctx.fill();ctx.restore();}});}
  await withImpact(u,'80,60,100',()=>ik(u,ts,sk));await bodySettle(u);};}

// ---- Tealopó majom – Csészedobás: a csészét a kezéből hajítja (a támadókép beégetett csészéje nélkül), egész testtel
A.cupThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T={x:cx(t),y:midY(t)};const C={on:true};
  effects.push({update(){return C.on;},draw(){const h=fp(u,.25,.4);drawCup(h.x+18,h.y-8,.3,1.5);}});await bodyWind(u,260,.2);sfx('whoosh');bodyStrike(u,150,-.26);await wait(70);C.on=false;
  await flyObj(fp(u,.2,.35),T,400,(x,y,r)=>drawCup(x,y,r,1.5),{spin:-12,arc:100,trail:['150,90,40','190,130,60'],trailAdd:false,trailShape:'drop'});sfx('glass');shake(9);
  fallDebris(T.x,T.y,14,(x,y,r,s)=>drawShard(x,y,r,s),{v:300});splat(T.x,T.y,['150,90,40','190,130,60'],22,320,'drop');puffs(T.x,T.y,5,['240,240,245'],[12,20]);soundBlast(T.x,T.y,'200,220,255',120,350);t.hurt=.35;hit(u,t,sk);await bodySettle(u);}finally{rel();}};

// ---- Álomlepke – Hímpor: szárnycsapásokkal (a figura lebeg és csapkod), hatalmas csillogó hímporfelhők
A.mothDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dust');const o=fp(u,.45,.45);
  for(let w=0;w<4;w++){await tween(150,k=>{u.sq=1-.12*Math.sin(k*Math.PI);u.jump=Math.sin(k*Math.PI)*16;});sfx('whoosh');
    for(const t of al){for(let i=0;i<40;i++){const life=rnd(.7,1.1);part({x:o.x+rnd(-60,60),y:o.y+rnd(-60,40),vx:(cx(t)+rnd(-60,60)-o.x)/life,vy:(midY(t)+rnd(-70,50)-o.y)/life,drag:.2,life,size:rnd(1.2,3),rgb:pick(['230,210,140','255,240,190','220,190,255','255,255,255'])});}
      for(let i=0;i<3;i++)part({x:o.x+rnd(-30,30),y:o.y+rnd(-30,30),vx:(cx(t)-o.x)/1.1+rnd(-40,40),vy:(midY(t)-o.y)/1.1+rnd(-40,40),drag:.3,life:1.3,size:rnd(20,32),grow:40,rgb:pick(['230,200,255','245,225,190']),add:false,shape:'puff'});}}
  u.sq=1;u.jump=0;await wait(700);for(const t of al){effects.push({t:0,update(dt){this.t+=dt;return this.t<.8;},draw(){const a=1-this.t/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),100,'230,210,160',.55*a);ctx.restore();}});puffs(cx(t),midY(t),6,['230,200,255','245,225,190'],[20,30],{shape:'puff'});t.hurt=.25;}
  hitAll(u,al,sk);await wait(300);}finally{rel();}};

// ---- a többi „legyen látványosabb”: egész testes mozdulat + erősebb becsapódás
for(const [name,rgb,pose] of [['moonBeam','200,220,255'],['dreadClaw','170,80,255'],['nightTerror','255,60,90'],['obsWall','255,130,40'],['hotPour','200,140,70'],['scaldJet','220,240,255'],['plateStorm','200,215,255'],['potCrush','200,215,255'],['chaosStorm','200,140,255'],['chaosOrb','200,140,255'],['vaseWall','150,190,255']]){
  const f=A[name];if(!f)continue;A[name]=async(u,ts,sk)=>{await bodyWind(u,220,.1);bodyStrike(u,170,-.14);await withImpact(u,rgb,()=>f(u,ts,sk));await bodySettle(u);};}

// ---- Kockacukor-gólem – Porcukorfelhő: a KEZÉBŐL szórja, és nem fagyaszt (fegyver elem)
if(ESK.sugardust){ESK.sugardust.elem='phys';}
{const sd=A.sugarDust;A.sugarDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';await bodyWind(u,240,.14);bodyStrike(u,200,-.2);const o=fp(u,.12,.45),st={t:0};sfx('wind');
  effects.push({update(dt){st.t+=dt;if(st.t<1.1)for(const t of al){for(let i=0;i<6;i++){const life=rnd(.6,.9);part({x:o.x+rnd(-20,20),y:o.y+rnd(-20,20),vx:(cx(t)+rnd(-60,60)-o.x)/life,vy:(midY(t)+rnd(-60,50)-o.y)/life,life,size:rnd(1,2.5),rgb:pick(['255,255,255','245,245,250','255,248,240'])});}
      if(Math.random()<.6)part({x:o.x,y:o.y,vx:(cx(t)-o.x)/1+rnd(-40,40),vy:(midY(t)-o.y)/1+rnd(-40,40),drag:.3,life:1.1,size:rnd(16,26),grow:45,rgb:'250,250,252',add:false,shape:'puff'});}return st.t<1.2;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,60*Math.max(0,1-st.t),'255,255,255',.6);ctx.restore();}});
  await wait(1100);for(const t of al){const x=cx(t),top=topY(t);effects.push({t:0,update(dt){this.t+=dt;return this.t<1.4;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.4-this.t)*2)*.9;ctx.fillStyle='#ffffff';ctx.beginPath();ctx.ellipse(x,top+6,t.w*t.scale*.45,10,0,0,6.29);ctx.fill();for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(x-24+i*12,top+12+(i%2)*6,5,0,6.29);ctx.fill();}ctx.restore();}});t.hurt=.3;}
  hitAll(u,al,sk);await bodySettle(u);u.pose='idle';};}

// ---- Tealevél-manó – Teatüske: a fúvócsövet a SZÁJÁHOZ emeli, és abból fújja ki a tüskét
A.teaDart=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T={x:cx(t),y:midY(t)};const M=()=>fp(u,.53,.42);let an=Math.atan2(T.y-M().y,T.x-M().x);const P={on:true,k:0};
  effects.push({update(){return P.on;},draw(){const m=M();an=Math.atan2(T.y-m.y,T.x-m.x);ctx.save();ctx.translate(m.x,m.y);ctx.rotate(an);const L=80*P.k;drawStick(0,0,L,0,10,['#3a2a10','#9a7a3a','#c8a860']);ctx.fillStyle='#5a3a12';ctx.fillRect(L-6,-7,8,14);ctx.restore();}});
  await tween(220,k=>{P.k=easeIO(k);});await bodyWind(u,200,.08);sfx('whoosh');u.sq=.92;const m=M(),o={x:m.x+Math.cos(an)*82,y:m.y+Math.sin(an)*82};
  for(let i=0;i<10;i++)part({x:o.x,y:o.y,vx:Math.cos(an)*rnd(100,220),vy:Math.sin(an)*rnd(100,220)+rnd(-30,30),life:.45,size:rnd(6,10),grow:20,rgb:'230,240,220',add:false,shape:'smoke'});bodyStrike(u,140,-.1);
  await flyObj(o,T,170,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(200,255,170,.6)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-Math.cos(an)*90,y-Math.sin(an)*90);ctx.lineTo(x,y);ctx.stroke();ctx.restore();drawDart(x,y,an,50);});
  sfx('needle');shake(7);hitStop(70);sparks(T.x,T.y,['160,230,100','255,255,255'],14,320);puffs(T.x,T.y,5,['150,220,90','190,240,130'],[10,16]);
  effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.3)part({x:T.x-10,y:T.y,vx:rnd(-10,10),vy:rnd(20,50),life:.5,size:rnd(2,3),rgb:'130,210,70',add:false,shape:'drop'});return this.t<1;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1-this.t)*3);drawDart(T.x-14,T.y,an,46);ctx.restore();}});
  t.hurt=.3;hit(u,t,sk);await tween(200,k=>{P.k=1-k;});P.on=false;await bodySettle(u);}finally{rel();}};

// ---- Vázagólem – Mázpáncél: a vázadarabok berepülnek, és tömör, mintás porcelánfallá állnak össze, ami csillan
{const vw=A.vaseWall;A.vaseWall=async(u,ts,sk)=>{const x0=cx(u)-u.w*u.scale*.75,gy=u.y+u.oy;sfx('glass');
  for(let i=0;i<16;i++){const tx=x0+rnd(-40,40),ty=gy-rnd(10,u.h*u.scale*.9);const s={x:tx+rnd(-200,200),y:ty-rnd(150,300)};await wait(25);flyObj(s,{x:tx,y:ty},300,(x,y,r)=>drawShard(x,y,r,1.6,'#f4f6ff'),{spin:8}).then(()=>{sparks(tx,ty,['200,220,255','255,255,255'],3,120);});}
  await wait(300);sfx('shield');await vw(u,ts,sk);
  effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const k=this.t/.6,y=gy-u.h*u.scale*k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle=`rgba(255,255,255,${.5*(1-k)})`;ctx.fillRect(x0-60,y-6,120,12);ctx.restore();}});};}
