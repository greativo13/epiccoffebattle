// ===== 61. kör: 3. térkép – új festett ellenfelek és változatosabb csaták (teljes tesztlista, 6. csomag) =====
// „A 3. térképen nagyon kevés ellenfél van, és sokszor ismétlődnek” (a Habverő-manó 14-szer jött, a Kőmozaik Szentélyben
// csak 3 sima típus volt). Négy új, Canvával festett ellenfél (bpanda, komainu, torolamp, whiskspider), saját
// támadásokkal, és a 3. térkép sima csatáiban az ellenfelek egy része minden alkalommal a zóna készletéből cserélődik.

// a képek már átlátszó hátterűek: a betöltő ne vegye háttérnek a fehéret (a panda bundája fehér)
for(const k of ['bpanda','komainu','torolamp','whiskspider'])WHITE_T[k]=999;

Object.assign(EN_DEF,{
  bpanda:{name:'Bambuszpanda-szerzetes',hp:190,atk:17,def:13,mag:8,res:11,xp:290,h:178,w:150,lift:0,elem:{fire:1.4,thunder:1.2,nature:.6},
    skills:[['pandastaff',3],['pandaroll',2]],info:'Bambuszbottal harcol, és golyóvá gömbölyödve végiggurul a hősökön. A tűz és a villám fáj neki.'},
  komainu:{name:'Kőoroszlán-őr',hp:230,atk:18,def:22,mag:6,res:10,xp:300,h:168,w:172,lift:0,elem:{thunder:1.5,water:1.2,earth:.5,phys:.6,poison:0},statusImmune:['poison','sleep'],
    skills:[['lionpounce',3],['lionroar',2]],info:'A szentély kőből faragott őrzője: ráveti magát egy hősre, az üvöltése gyengíti a védelmet. A villám szétrepeszti, a fegyver alig fog rajta.'},
  torolamp:{name:'Kőlámpás-szellem',hp:140,atk:8,def:14,mag:18,res:16,xp:280,h:178,w:122,lift:22,elem:{water:1.6,ice:1.3,fire:0},statusImmune:['burn'],
    skills:[['lampflame',3],['lampbless',1]],info:'Élő kőlámpás: a lámpaablakából lángot lő, és a lángja megerősíti a társait. A víz és a jég kioltja.'},
  whiskspider:{name:'Habverő-pók',hp:165,atk:15,def:12,mag:12,res:12,xp:290,h:142,w:172,lift:0,elem:{fire:1.7,phys:1.1,water:.5},
    skills:[['spiderweb',2],['spiderbite',3]],info:'Habverő-szálakból szőtt pók: habhálóval lefogja a hősöket, aztán belemar. A tűz égeti.'},
});
Object.assign(ESK,{
  pandastaff:{name:'Bambuszbot-forgatás',tgt:'enemy',kind:'phys',pow:1.25,elem:'phys',anim:'pandaStaff'},
  pandaroll:{name:'Pandagurulás',tgt:'enemies',kind:'phys',pow:.8,elem:'phys',anim:'pandaRoll'},
  lionpounce:{name:'Kőoroszlán-ugrás',tgt:'enemy',kind:'phys',pow:1.35,elem:'earth',anim:'lionPounce'},
  lionroar:{name:'Őrzőüvöltés',tgt:'enemies',kind:'mag',pow:.55,elem:'earth',anim:'lionRoar',status:['defDown',.4,1]},
  lampflame:{name:'Lámpásláng',tgt:'enemy',kind:'mag',pow:1.2,elem:'fire',anim:'lampFlame',status:['burn',.3,3]},
  lampbless:{name:'Szentélyláng-áldás',tgt:'self',kind:'buff',pow:0,anim:'lampBless',desc:'A lámpás lángja fellobban: minden társa 1 körig erősebben támad.'},
  spiderweb:{name:'Habháló',tgt:'enemy',kind:'mag',pow:.7,elem:'water',anim:'spiderWeb',status:['stun',.45,1]},
  spiderbite:{name:'Habverő-harapás',tgt:'enemy',kind:'phys',pow:1.3,elem:'phys',anim:'spiderBite'},
});

// ---- saját támadások (a figura saját teste mozog; festett képek: bambusz, kő, láng, hab)
A.pandaStaff=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const WS=r21Filt(R17I.windslash,'hue-rotate(60deg) saturate(1.3) brightness(1.05)'),LF=R17I.leaf;u.pose='attack';
  await bodyWind(u,260,.18);const dx=(cx(t)+t.w*t.scale*.55+u.w*u.scale*.35)-cx(u);ghosts&&ghosts(u,280);await tween(280,k=>{u.ox=dx*easeIO(k);});
  for(let i=0;i<3;i++){sfx('whoosh');await bodyStrike(u,110,i%2?.22:-.22);sfx('hit');shake(8+i*3);t.hurt=.35;
    const x=cx(t),y=midY(t)+rnd(-30,20),rot=(i%2?1:-1)*.8,S2={k:0,a:1};if(WS)R18E({update(){return S2.a>0;},draw(){const s=Math.max(200,t.h*t.scale*1.5)*(.6+.5*S2.k);ctx.save();ctx.globalAlpha=S2.a;ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.rotate(rot);ctx.drawImage(WS,-s/2,-s/2,s,s);ctx.restore();}});tween(260,k=>{S2.k=k;S2.a=1-k;});
    if(LF)for(let n=0;n<6;n++)r21PD(LF,x,y,{vx:rnd(-260,260),vy:-rnd(60,260),g:300,size:rnd(16,26),life:.9,drag:1});await wait(90);}
  toss(t,40,320);hit(u,t,sk);await bodySettle(u);ghosts&&ghosts(u,280);await tween(320,k=>{u.ox=dx*(1-easeIO(k));});u.ox=0;u.pose='idle';};
A.pandaRoll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive).sort((a,b)=>cx(b)-cx(a));if(!al.length)return;u.pose='attack';
  await tween(300,k=>{u.sq=1-.25*k;u.spin=-.6*k;});sfx('whoosh');const x0=cx(u),xEnd=Math.min(...al.map(cx))-160,done=new Set();
  await tween(1100,k=>{const e=easeIO(k);u.ox=(xEnd-x0)*e;u.spin=-.6-e*16;u.jump=Math.abs(Math.sin(e*Math.PI*4))*26;if(Math.random()<.6)puffs(cx(u),u.y+u.oy,1,['170,150,110'],[14,24],{w:40,up:20});
    for(const t of al)if(!done.has(t)&&cx(u)<cx(t)+20){done.add(t);shake(12);sfx('hit');t.hurt=.5;toss(t,60,380);hit(u,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  await tween(420,k=>{u.ox=(xEnd-x0)*(1-k);u.spin=-16.6*(1-k);u.jump=Math.sin(k*Math.PI)*60;});u.ox=0;u.spin=0;u.jump=0;await tween(200,k=>{u.sq=.75+.25*k;});u.sq=1;u.pose='idle';};
A.lionPounce=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const CR=R17I.crater,CD=R17I.clods;u.pose='attack';
  sfx('growl');await tween(360,k=>{u.sq=1-.16*easeIO(k);u.lean=.14*k;});const dx=(cx(t)+t.w*t.scale*.4)-cx(u);sfx('whoosh');ghosts&&ghosts(u,360);
  await tween(380,k=>{u.ox=dx*k;u.jump=Math.sin(k*Math.PI)*170;u.sq=1.08;u.lean=.14-.36*k;});u.jump=0;
  sfx('boom');sfx('rock');shake(22);hitStop(110);const gx=cx(t),gy=t.y+t.oy+6;
  if(CR){const C={a:1};R18E({update(){C.a-=.008;return C.a>0;},draw(){r17Draw(CR,gx,gy+12,Math.max(200,t.w*t.scale*2),{a:Math.min(1,C.a*2),sy:.5});}});}
  if(CD)for(let i=0;i<12;i++)r21PD(CD,gx+rnd(-40,40),gy-6,{vx:rnd(-300,300),vy:-rnd(180,480),g:1100,size:rnd(22,40),life:rnd(.7,1)});
  t.hurt=.7;hit(u,t,sk);await tween(200,k=>{u.sq=.9+.1*k;u.lean=-.22*(1-k);});await wait(160);ghosts&&ghosts(u,300);await tween(380,k=>{u.ox=dx*(1-easeIO(k));u.jump=Math.sin(k*Math.PI)*60;});u.ox=0;u.jump=0;u.sq=1;u.lean=0;u.pose='idle';};
A.lionRoar=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const RC=R17I.rockcloud,PB=R17I.pebble;u.pose='attack';
  await bodyWind(u,320,-.12);sfx('roar');sfx('quake');shake(16);rumble&&rumble(1.2,10);await bodyStrike(u,140,.16);
  const m=sprPt(u,.2,.3),W2={x:m.x,a:1};R18E({update(){return W2.a>0;},draw(){if(!RC)return;for(let i=0;i<4;i++){const x=m.x-(m.x-W2.x)*(i+1)/4;ctx.save();ctx.globalAlpha=W2.a*.6;r17Draw(RC,x,m.y+20,220+i*40,{});ctx.restore();}}});
  const xEnd=Math.min(...al.map(cx))-100;await tween(600,k=>{W2.x=m.x+(xEnd-m.x)*k;if(PB&&Math.random()<.7)r21PD(PB,W2.x+rnd(-40,40),m.y+rnd(-40,40),{vx:-rnd(200,500),vy:rnd(-80,80),size:rnd(14,26),life:.5});});
  for(const t of al){t.hurt=.4;toss(t,20,240);hit(u,t,sk);}await tween(300,k=>{W2.a=1-k;});await bodySettle(u);u.pose='idle';};
A.lampFlame=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const FB=FX_IMG.fireball,FW=r21Filt(R17I.firewall,'hue-rotate(110deg) saturate(1.4) brightness(1.15)'),GB=R17I.goldburst;u.pose='cast';
  const win=()=>sprPt(u,.47,.27);sfx('fire');const G={a:0};R18E({update(){return G.a>0||!G.d;},draw(){const p=win();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,70,'255,150,50',.6*G.a);ctx.restore();}});
  await tween(320,k=>{G.a=k;u.sq=1+.04*Math.sin(k*20);});const p0=win(),T2={x:cx(t),y:midY(t)},F={x:p0.x,y:p0.y,on:true};
  R18E({update(){if(F.on)part({x:F.x+rnd(-8,8),y:F.y+rnd(-8,8),vx:rnd(30,90),vy:rnd(-60,0),life:.35,size:rnd(5,9),rgb:pick(['255,160,40','255,90,20'])});return F.on;},draw(){if(!FB)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.drawImage(FB,F.x-50,F.y-50,100,100);ctx.restore();}});
  sfx('whoosh');await tween(380,k=>{F.x=p0.x+(T2.x-p0.x)*k;F.y=p0.y+(T2.y-p0.y)*k-Math.sin(k*Math.PI)*50;});F.on=false;sfx('fire');shake(12);flash('255,180,90',.25,.08);
  if(GB){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,T2.x,T2.y,220*(.4+B.k),{a:1-B.k});ctx.restore();}});tween(420,k=>{B.k=k;});}
  if(FW){const W3={a:1};R18E({update(){W3.a-=.012;return W3.a>0;},draw(){r17Draw(FW,T2.x,t.y+t.oy+6,Math.max(140,t.w*t.scale*1.3),{anchor:'bottom',a:Math.min(1,W3.a*1.5),sy:.6});}});}
  t.hurt=.5;hit(u,t,sk);await tween(300,k=>{G.a=1-k;});G.d=true;u.sq=1;u.pose='idle';};
A.lampBless=async(u,ts,sk)=>{const GB=R17I.goldburst;u.pose='cast';sfx('holy');const allies=S.enemies.filter(e=>e.alive);
  const p=sprPt(u,.47,.27);for(let i=0;i<30;i++)part({x:p.x,y:p.y,vx:rnd(-120,120),vy:-rnd(40,200),life:rnd(.6,1),size:rnd(3,6),rgb:pick(['255,200,90','255,240,180']),shape:'star'});
  for(const e of allies){if(GB){const B={k:0},x=cx(e),y=midY(e);R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,x,y,e.h*e.scale*(.6+.6*B.k),{a:.7*(1-B.k)});ctx.restore();}});tween(600,k=>{B.k=k;});}
    e.st.atkUp=Math.max(e.st.atkUp||0,2);popLabel(e,'ERŐSEBB!','#ffcf6a');}
  await wait(700);u.pose='idle';};
A.spiderWeb=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const FO=R17I.foam,FR=R17I.froth;u.pose='attack';await bodyWind(u,260,.12);sfx('squish');
  const m=sprPt(u,.35,.55),T2={x:cx(t),y:midY(t)},W={k:0,on:true,wrap:0};
  R18E({update(){return W.on;},draw(){const x=m.x+(T2.x-m.x)*W.k,y=m.y+(T2.y-m.y)*W.k;ctx.save();ctx.strokeStyle='rgba(235,250,220,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.lineTo(x,y);ctx.stroke();ctx.restore();
    if(FR&&W.k<1)r17Draw(FR,x,y,60,{});if(FO&&W.wrap>0){ctx.save();ctx.globalAlpha=.85;r17Draw(FO,T2.x,T2.y,t.w*t.scale*1.5*W.wrap,{sy:1.3});ctx.restore();}}});
  await bodyStrike(u,120,-.12);await tween(260,k=>{W.k=k;});sfx('splash');shake(8);await tween(300,k=>{W.wrap=eOutBack(k);});t.hurt=.4;hit(u,t,sk);
  await wait(500);await tween(300,k=>{W.wrap=1-k;});W.on=false;await bodySettle(u);u.pose='idle';};
A.spiderBite=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;u.pose='attack';const dx=(cx(t)+t.w*t.scale*.5+u.w*u.scale*.3)-cx(u);
  await tween(240,k=>{u.sq=1-.12*k;});sfx('whoosh');ghosts&&ghosts(u,260);await tween(260,k=>{u.ox=dx*easeIO(k);u.jump=Math.sin(k*Math.PI)*90;u.sq=1.06;});u.jump=0;
  for(let i=0;i<2;i++){sfx('crunch');shake(10);hitStop(60);t.hurt=.4;sparks(cx(t),midY(t),['200,240,150','255,255,255'],14,300);await tween(120,k=>{u.lean=-.15*Math.sin(k*Math.PI);});}
  hit(u,t,sk);await wait(150);ghosts&&ghosts(u,260);await tween(320,k=>{u.ox=dx*(1-easeIO(k));});u.ox=0;u.sq=1;u.pose='idle';};

// ---- a 3. térkép pályáiba beépítve (a leggyakoribb ellenfelek egy része helyett)
(function(){const Z=ZONES;const rep=(zi,from,to,every)=>{let n=0;if(!Z[zi])return;for(const L of Z[zi].levels)for(const b of L.battles){if(L.boss||b.some(t=>EN_DEF[t]&&(EN_DEF[t].boss||EN_DEF[t].miniboss)))continue;for(let i=0;i<b.length;i++)if(b[i]===from){if(n%every===0)b[i]=to;n++;}}};
  const zi=name=>Z.findIndex(z=>z.name===name);
  const z9=zi('Habos Bambuszosok'),z10=zi('Kőmozaik Szentély'),z11=zi('Bambuszhabverők Barlangja'),z12=zi('Matcha Ceremónia-palota');
  rep(z9,'whiskimp','bpanda',2);rep(z9,'mochi','bpanda',3);
  rep(z10,'mosaicghost','torolamp',2);rep(z10,'stoneguard','komainu',2);
  rep(z11,'whiskimp','whiskspider',2);rep(z11,'cupwarrior','whiskspider',3);
  rep(z12,'whiskimp','bpanda',2);rep(z12,'stoneguard','komainu',1);rep(z12,'mosaicghost','torolamp',1);
  window.R21_POOL3={};for(const i of [z9,z10,z11,z12]){if(i<0)continue;const s=new Set();for(const L of Z[i].levels)for(const b of L.battles)for(const t of b)if(EN_DEF[t]&&!EN_DEF[t].boss&&!EN_DEF[t].miniboss&&t!=='lilicalm')s.add(t);R21_POOL3[i]=[...s];}})();

// ---- változatos csaták: a 3. térkép sima csatáiban minden ellenfél 35% eséllyel a zóna készletének egy másik tagjára
//      cserélődik (egy csatán belül nem lesz három egyforma), így ugyanaz a pálya sem ugyanúgy néz ki minden alkalommal
{const sb=startBattle;startBattle=function(){const L=S.level;let orig=null;try{if(L&&!S.arena&&window.R21_POOL3){const zi=ZONES.findIndex(z=>z.levels.includes(L));const pool=R21_POOL3[zi];const b=L.battles&&L.battles[S.battleIdx];
      if(pool&&pool.length>2&&b&&!b.some(t=>EN_DEF[t]&&(EN_DEF[t].boss||EN_DEF[t].miniboss))){orig=b.slice();const nb=b.map(t=>Math.random()<.35?pick(pool.filter(x=>x!==t)):t);
        for(const t of nb){if(nb.filter(x=>x===t).length>=3){const i=nb.lastIndexOf(t);nb[i]=pick(pool.filter(x=>x!==t));}}L.battles[S.battleIdx]=nb;}}}catch(e){orig=null;}
  try{return sb.apply(this,arguments);}finally{if(orig&&L)L.battles[S.battleIdx]=orig;}};}
// rajzolás: a festett képből (mint a többi 3. térképes ellenfélnél)
for(const t of ['bpanda','komainu','torolamp','whiskspider'])DRAW[t]=e=>enemySpriteDraw(blobDraw('150,210,110'),t)(e);
