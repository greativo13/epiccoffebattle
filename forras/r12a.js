
// ===== 12. kör =====
// ---- Fénypajzs: amíg áll, az ellenséges támadás EL SEM JUT a hősökig.
// A közelharcos nekiront a nagy pajzsnak, nekicsapódik és visszapattan; a távolsági lövés a pajzsról visszapattan a támadóra.
const R12_RANGED=/proj|throw|dart|shot|spit|rain|toss|jet|beam|pour|splash|breath|fire|ball|bolt|wave|storm|cloud|dust|sweep|blast|wail|screech|dice|swarm|song|lullaby|flood|army|orb|cast|ink|jam|wish/i;
function r12ShieldPos(){const hs=S.heroes.filter(h=>h.alive);if(S.partyShield&&S.partyShield.bx!=null)return {x:S.partyShield.bx,y:S.partyShield.by};
  return {x:Math.max(...hs.map(cx))+105,y:hs.reduce((s,h)=>s+midY(h),0)/hs.length+10};}
function r12ShieldFlare(x,y,rgb){if(S.partyShield)S.partyShield.hitAt=S.partyShield.t;sfx('shield');flash('255,240,180',.3,.12);hitStop(80);shake(12);
  effects.push({t:0,update(dt){this.t+=dt;return this.t<.5;},draw(){const k=this.t/.5,a=1-k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.scale(.45,1);
    glow(0,0,190*(.6+.6*k),'255,230,140',.75*a);glow(0,0,90,'255,255,240',.8*a);ctx.restore();}});
  for(let i=0;i<34;i++){const an=rnd(-1.4,1.4)+(Math.random()<.5?0:Math.PI)*0,v=rnd(200,620);part({x:x+rnd(-10,10),y:y+rnd(-90,90),vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:2.2,life:rnd(.35,.7),size:rnd(2.5,5),rgb:pick(['255,240,170','255,255,255',rgb||'255,210,120']),shape:pick(['star','streak','dot'])});}}
function r12Recoil(e,ts,sk){let tot=0;for(const t of ts){if(!t||!t.alive)continue;const d=calcDmg(e,t,sk).dmg;popLabel(t,'KIVÉDVE!','#ffe9a0');tot+=d;}
  if(e.alive&&tot>0){const n=Math.min(tot,e.hp);recoil(e,n,'VISSZAVERVE!','#ffe9a0');}updateHUD();}
function r12ElemLook(sk){const el=sk.elem||'phys',rgb=sk.rgb&&!/,.*,.*,/.test(sk.rgb)?sk.rgb:(ELEM_RGB[el]||'230,230,240');return {el,rgb};}
function r12Missile(x,y,el,rgb,s=1){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,48*s,rgb,.7);glow(x,y,18*s,'255,255,255',.9);ctx.restore();
  if(el==='fire'){for(let i=0;i<3;i++)part({x:x+rnd(-12,12),y:y+rnd(-12,12),vx:rnd(-50,50),vy:-rnd(20,90),drag:1,life:rnd(.3,.5),size:rnd(14,24)*s,grow:30,rgb:'255,150,40',add:false,shape:'fire'});}
  else if(el==='dark'||el==='poison'){for(let i=0;i<2;i++)part({x:x+rnd(-10,10),y:y+rnd(-10,10),vx:rnd(-40,40),vy:rnd(-40,40),life:rnd(.4,.6),size:rnd(14,22)*s,grow:25,rgb:el==='dark'?'60,30,90':'90,160,60',add:false,shape:'dsmoke'});}
  else if(el==='ice'){ctx.save();ctx.translate(x,y);ctx.rotate(T*6);drawCrystal(0,0,0,.8*s,'170,230,255');ctx.restore();}
  else if(el==='water'){ctx.save();const g=ctx.createRadialGradient(x-6*s,y-6*s,2,x,y,20*s);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.4,'rgba(120,190,255,.9)');g.addColorStop(1,'rgba(30,90,200,.85)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y,20*s,16*s,T*4,0,6.29);ctx.fill();ctx.restore();}
  else if(el==='holy'||el==='thunder'){qStar(x,y,18*s,T*8);}
  else {ctx.save();ctx.translate(x,y);ctx.rotate(T*9);const g=ctx.createRadialGradient(-5*s,-5*s,2,0,0,18*s);g.addColorStop(0,'#c8c0b4');g.addColorStop(1,'#5a5248');ctx.fillStyle=g;ctx.strokeStyle='#2e2822';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<7;i++){const a=i/7*6.283,r=(15+5*Math.sin(i*2.7))*s;i?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(r,0);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}}
async function r12Block(e,targets,sk){const P=r12ShieldPos(),{el,rgb}=r12ElemLook(sk);S._shBlk=true;
  try{
  const melee=sk.kind==='phys'&&sk.tgt==='enemy'&&!R12_RANGED.test(sk.anim||'');
  if(melee){const rel=keepPose(e,'attack');try{await bodyWind(e,220,.14);const dx=P.x+40+e.w*e.scale*.42-e.x,dy=(P.y+e.h*e.scale*.5*shrinkOf(e))-e.y;ghosts(e,260);sfx('whoosh');
      await tween(260,k=>{const q=k*k;e.ox=dx*q;e.oy=Math.min(0,dy*q*.4);e.jump=Math.sin(k*Math.PI)*20;e.lean=.14-.36*k;});
      r12ShieldFlare(P.x+18,P.y,rgb);sfx('hit');e.sq=.82;e.hurt=.3;
      await tween(460,k=>{const q=eOutBack(k);e.ox=dx*(1-q);e.oy=Math.min(0,dy*.4)*(1-k);e.jump=Math.sin(k*Math.PI)*46;e.lean=-.22+(.5*Math.sin(k*Math.PI))*(1-k)+.22*k;e.sq=.82+.18*k;});
      e.ox=0;e.oy=0;e.jump=0;e.sq=1;r12Recoil(e,targets,sk);sparks(cx(e),midY(e),['255,240,170','255,255,255'],22,460);await bodySettle(e);}finally{rel();}
  }else{
    const rel=keepPose(e,'attack');try{await bodyWind(e,200,.1);bodyStrike(e,150,-.14);sfx(ELEM_SFX[el]||'whoosh');
      const o=fp(e,.3,.42),n=Math.min(3,targets.filter(t=>t&&t.alive).length||1),fl=[];
      for(let i=0;i<n;i++)fl.push((async()=>{await wait(i*130);const sy=P.y+(i-(n-1)/2)*55;
        await flyObj(o,{x:P.x+22,y:sy},360,(x,y)=>r12Missile(x,y,el,rgb,1.15),{trail:[rgb,'255,255,255'],arc:30});
        r12ShieldFlare(P.x+22,sy,rgb);
        // visszapattan: arannyá válik és ívben visszarepül a támadóra
        await flyObj({x:P.x+22,y:sy},{x:cx(e),y:midY(e)},420,(x,y,r,k)=>{r12Missile(x,y,el,k<.25?rgb:'255,220,120',1.15+.25*k);},{trail:['255,230,140','255,255,255'],arc:-70});
        if(e.alive){bigBoom(cx(e),midY(e),.55);soundBlast(cx(e),midY(e),'255,220,120',170,380);e.hurt=.4;sfx('holy');shake(9);}})());
      await Promise.all(fl);r12Recoil(e,targets,sk);await bodySettle(e);}finally{rel();}}
  }finally{S._shBlk=false;}}
{const rf=reflectFx;reflectFx=function(u){if(S._shBlk)return;return rf.apply(this,arguments);};}
{const uE=useEnemySkill;useEnemySkill=async function(e,sk,target){
  if(sk&&(sk.tgt==='enemy'||sk.tgt==='enemies')&&(sk.kind==='phys'||sk.kind==='mag')&&e&&e.kind==='enemy'&&!S.over&&S.heroes.some(h=>h.alive&&h.st&&h.st.barrier)){
    const targets=sk.tgt==='enemies'?S.heroes.filter(h=>h.alive):[target||aiTarget(e)];if(targets.length&&targets[0]){say(e,`${e.name}: ${sk.name}!`);showBanner(sk.name);
      await r12Block(e,targets,sk);e.pose='idle';return;}}
  return uE.apply(this,arguments);};}
SK.lightshield.desc='Fénypajzs a csapat elé: amíg áll (a következő kör végéig), az ellenséges támadás el sem jut a hősökig – a rohamozó nekicsapódik és visszapattan, a lövés visszapattan a támadóra, és a sebzést ő kapja.';

// ---- Álomcsillagok: a díszítő hullócsillagok balról jobbra szállnak; nagy, valódi csillagok csapódnak az ellenségekbe
function qStar(x,y,r,rot,a=1){ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.globalAlpha=a;ctx.beginPath();for(let i=0;i<10;i++){const rr=i%2?r*.45:r,an=i/10*6.283-Math.PI/2;i?ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr):ctx.moveTo(Math.cos(an)*rr,Math.sin(an)*rr);}ctx.closePath();
  const g=ctx.createRadialGradient(0,0,r*.1,0,0,r);g.addColorStop(0,'#ffffff');g.addColorStop(.45,'#fff3b0');g.addColorStop(1,'#ffc23a');ctx.fillStyle=g;ctx.fill();ctx.lineWidth=Math.max(1,r*.07);ctx.strokeStyle='rgba(255,170,40,.9)';ctx.stroke();ctx.restore();}
{const ss0=A_R10.get('sleepStars')||A.sleepStars;A.sleepStars=async(u,ts,sk)=>{const st={t:0,on:true};const al=ts.filter(t=>t.alive);
  effects.push({update(dt){st.t+=dt;if(st.on&&Math.random()<.35){const s={x:rnd(-80,W*.5),y:rnd(10,170),vx:rnd(520,820),vy:rnd(120,260),t:0,r:rnd(5,9)};effects.push({update(d){s.t+=d;s.x+=s.vx*d;s.y+=s.vy*d;return s.t<.7;},
      draw(){const a=1-s.t/.7;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(s.x,s.y,s.x-s.vx*.18,s.y-s.vy*.18);g.addColorStop(0,`rgba(255,250,220,${.9*a})`);g.addColorStop(1,'rgba(200,190,255,0)');ctx.strokeStyle=g;ctx.lineWidth=s.r*.7;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*.18,s.y-s.vy*.18);ctx.stroke();glow(s.x,s.y,s.r*2.4,'255,250,220',.8*a);ctx.restore();qStar(s.x,s.y,s.r,s.t*8,a);}});}return st.on;},draw(){}});
  // nagy csillagok balról-fentről zúdulnak az ellenségekre
  const big=(async()=>{await wait(900);const ps=[];for(const t of al)for(let j=0;j<5;j++)ps.push((async()=>{await wait(j*170+rnd(0,120));const from={x:rnd(-60,W*.35),y:rnd(-40,60)},to={x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-50,40)},R=rnd(20,30);
      await flyObj(from,to,520,(x,y,r,k)=>{const dx=to.x-from.x,dy=to.y-from.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;ctx.save();ctx.globalCompositeOperation='lighter';const tl=170;const g=ctx.createLinearGradient(x,y,x-ux*tl,y-uy*tl);g.addColorStop(0,'rgba(255,245,200,.95)');g.addColorStop(.5,'rgba(200,180,255,.5)');g.addColorStop(1,'rgba(150,130,255,0)');
        ctx.strokeStyle=g;ctx.lineCap='round';ctx.lineWidth=R*1.1;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-ux*tl,y-uy*tl);ctx.stroke();glow(x,y,R*2.6,'255,240,180',.75);ctx.restore();qStar(x,y,R,k*14);},{trail:['255,240,170','200,180,255','255,255,255']});
      sfx('holy');sparks(to.x,to.y,['255,240,170','200,180,255','255,255,255'],16,380);soundBlast(to.x,to.y,'255,230,160',110,320);t.hurt=.25;shake(4);})());await Promise.all(ps);})();
  try{await ss0(u,ts,sk);await big;}finally{st.on=false;}};}

// ---- Gomba-Király idézés: a kalapja nem füstöl; sok, valósághű légyölő gomba hullik szerteszét, és lila spórafelhővé pukkad
function qAmanita(x,y,s,rot=0,a=1){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(s,s);
  // tönk gallérral
  let g=ctx.createLinearGradient(-8,0,8,0);g.addColorStop(0,'#cfc6b4');g.addColorStop(.45,'#fbf7ee');g.addColorStop(1,'#bdb3a0');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-6,-6);ctx.quadraticCurveTo(-8,14,-10,26);ctx.quadraticCurveTo(0,31,10,26);ctx.quadraticCurveTo(8,14,6,-6);ctx.closePath();ctx.fill();
  ctx.fillStyle='#efe8da';ctx.beginPath();ctx.ellipse(0,4,10,3.2,0,0,6.29);ctx.fill();ctx.strokeStyle='rgba(120,100,80,.5)';ctx.lineWidth=.8;ctx.stroke();
  // lemezek a kalap alján
  ctx.fillStyle='#f3e6cf';ctx.beginPath();ctx.ellipse(0,-6,22,5,0,0,6.29);ctx.fill();ctx.strokeStyle='rgba(150,120,90,.6)';ctx.lineWidth=.6;for(let i=-9;i<=9;i++){ctx.beginPath();ctx.moveTo(i*2.3,-6);ctx.lineTo(i*1.1,-3);ctx.stroke();}
  // kalap
  g=ctx.createRadialGradient(-7,-22,2,0,-12,26);g.addColorStop(0,'#ff6a4a');g.addColorStop(.55,'#d81e14');g.addColorStop(1,'#7a0a08');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-24,-6);ctx.bezierCurveTo(-24,-30,24,-30,24,-6);ctx.quadraticCurveTo(0,-1,-24,-6);ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.35)';ctx.beginPath();ctx.ellipse(-9,-20,7,3,-.5,0,6.29);ctx.fill();
  // fehér pöttyök
  ctx.fillStyle='#fffaf0';for(const [px,py,r] of [[-14,-12,2.6],[-4,-20,3],[8,-17,2.4],[15,-10,2],[-1,-11,1.8],[-17,-7,1.4],[3,-25,1.6],[18,-7,1.3]]){ctx.beginPath();ctx.ellipse(px,py,r,r*.8,0,0,6.29);ctx.fill();}
  ctx.restore();}
{const mk=SUMMONS.find(x=>x.id==='mushking');if(mk){mk.desc='Légyölő gombák zuhannak az égből szerteszét az ellenségekre, és lila spórafelhővé pukkadnak: méregsebzés, és mindenki elalszik (a főellenségek nem).';
  mk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('poison');const P3=['170,100,220','140,80,200','200,140,240','120,60,170'];
    const minX=Math.min(...fs.map(cx))-160,maxX=Math.max(...fs.map(cx))+160,list=[];
    for(let i=0;i<34;i++){const t=fs[i%fs.length],onT=i<fs.length*5,gx=onT?cx(t)+rnd(-70,70):rnd(minX,maxX),gy=onT?t.y+t.oy-rnd(0,t.h*t.scale*.6):rnd(H*.55,H*.9);list.push({x0:gx+rnd(-120,120),gx,gy,d:rnd(0,1.5),s:rnd(1.1,1.9),r0:rnd(-3,3),t,onT});}
    const st={t:0};const live=list.map(m=>({m,k:0,land:false,a:1}));
    effects.push({update(dt){st.t+=dt;for(const L of live){const m=L.m;if(st.t<m.d)continue;if(!L.land){L.k=Math.min(1,L.k+dt/.55);if(L.k>=1){L.land=true;L.lt=st.t;sfx('poison');shake(3);
          for(let i=0;i<8;i++)part({x:m.gx+rnd(-20,20),y:m.gy-10+rnd(-15,15),vx:rnd(-110,110),vy:-rnd(20,150),drag:1,life:rnd(1.1,1.8),size:rnd(18,34),grow:45,rgb:pick(P3),add:false,shape:'smoke'});
          for(let i=0;i<8;i++){const a=rnd(0,6.28),v=rnd(80,240);part({x:m.gx,y:m.gy-10,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2,life:.6,size:rnd(2,4),rgb:'230,190,255',shape:'star'});}}}
        else L.a=Math.max(0,1-(st.t-L.lt)/.35);}return st.t<3.2;},
      draw(){for(const L of live){const m=L.m;if(st.t<m.d||L.a<=0)continue;const k=L.k,x=m.x0+(m.gx-m.x0)*k,y=-60+(m.gy+60)*k*k,sq=L.land?1+.3*(1-L.a):1;ctx.save();ctx.translate(x,y);ctx.scale(sq,1/sq);qAmanita(0,-24*m.s,m.s,L.land?0:m.r0*(1-k)+Math.sin(st.t*6+m.d*9)*.25*(1-k),L.a);ctx.restore();}}});
    await wait(2500);
    for(const t of fs){puffs(cx(t),midY(t),14,P3,[28,52],{w:60,h:50,l0:1.5,l1:2.3,grow:30});hit(P,t,{name:'Királyi spóra',kind:'mag',pow:.6,elem:'poison',tgt:'enemies',anim:'mushSpore',status:['sleep',1,2]});await wait(90);}
    await wait(800);};}}

// ---- Öreg Oolong idézés: nincs füstgolyó a fújás előtt – rögtön a szájából tör ki a gőz
{const ol=SUMMONS.find(x=>x.id==='oolong');if(ol){ol.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.oolong,m=im?sumPt(ol,S0,im,.155,.36):{x:S0.x+100,y:S0.y-200};
    rumble(1.4,8);sfx('splash');
    const st={t:0};effects.push({update(dt){st.t+=dt;if(st.t<1.8)for(let i=0;i<10;i++){const t=pick(fs),tx=cx(t)+rnd(-35,35),ty=midY(t)+rnd(-45,35),an=Math.atan2(ty-m.y,tx-m.x)+rnd(-.04,.04),v=rnd(800,1000);
        part({x:m.x+rnd(-4,4),y:m.y+rnd(-4,4),vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.2,g:-40,life:rnd(1,1.5),size:rnd(6,10)+Math.min(8,st.t*20),grow:90,rgb:pick(['245,248,252','232,238,246','255,255,255']),add:false,shape:'smoke'});}return st.t<2;},draw(){}});
    const bz=setInterval(()=>sfx('splash'),350);await wait(700);for(const t of fs){puffs(cx(t),midY(t),14,['245,245,250','232,236,244'],[26,44],{w:60,h:60,up:120,l0:1.2,l1:1.9});t.hurt=.4;hit(P,t,{name:'Forró gőz',kind:'mag',pow:2.3,elem:'water',tgt:'enemies'});if(t.alive&&STATUS.scald)addStatus(t,'scald',2);}
    await wait(1100);clearInterval(bz);};}}

// ---- méhraj (Mézkirálynő idézés és Zümmögővihar): valósághű, szőrös méhek óriási, sűrű, hullámzó felhője
const BEE_SPR=[];
function r12BeeFrames(){if(BEE_SPR.length||typeof document==='undefined')return;for(let f=0;f<4;f++){const c=document.createElement('canvas');c.width=72;c.height=56;const g=c.getContext('2d');g.translate(36,30);g.scale(2,2);const w=[1,.55,-.2,.55][f];
    // lábak
    g.strokeStyle='#1c1208';g.lineWidth=.9;for(const lx of [-4,-1,2]){g.beginPath();g.moveTo(lx,3);g.lineTo(lx-1.5,8);g.lineTo(lx-3,9);g.stroke();}
    // potroh: szőrös, csíkos
    let gr=g.createRadialGradient(-6,-2,1,-5,0,10);gr.addColorStop(0,'#ffe58a');gr.addColorStop(.6,'#e8a412');gr.addColorStop(1,'#8a5a00');g.fillStyle=gr;g.beginPath();g.ellipse(-6,1,9,6,-.12,0,6.29);g.fill();
    g.fillStyle='#1f1408';for(const [sx,ww] of [[-9.5,2.4],[-5.5,2.6],[-1.6,2.2]]){g.beginPath();g.ellipse(sx,1,ww/1.6,5.6,-.1,0,6.29);g.fill();}
    g.fillStyle='#120a04';g.beginPath();g.moveTo(-14.5,1.5);g.lineTo(-18.5,2.4);g.lineTo(-14.5,3.2);g.fill();
    g.strokeStyle='rgba(255,220,140,.55)';g.lineWidth=.5;for(let i=0;i<26;i++){const a=i/26*6.283,x=-6+Math.cos(a)*9,y=1+Math.sin(a)*6;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(a)*1.6,y+Math.sin(a)*1.6);g.stroke();}
    // tor: bolyhos barna
    gr=g.createRadialGradient(3,-1,.5,3.5,0,5.5);gr.addColorStop(0,'#c8902e');gr.addColorStop(1,'#4a2c08');g.fillStyle=gr;g.beginPath();g.arc(3.5,0,5,0,6.29);g.fill();
    g.strokeStyle='rgba(230,180,90,.7)';for(let i=0;i<18;i++){const a=i/18*6.283;g.beginPath();g.moveTo(3.5+Math.cos(a)*4.5,Math.sin(a)*4.5);g.lineTo(3.5+Math.cos(a)*6.2,Math.sin(a)*6.2);g.stroke();}
    // fej, szem, csáp
    g.fillStyle='#1a1006';g.beginPath();g.ellipse(9.5,.5,3.4,3.8,0,0,6.29);g.fill();g.fillStyle='#000';g.beginPath();g.ellipse(10.3,-.6,1.6,2.4,.3,0,6.29);g.fill();g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.arc(10.6,-1.4,.6,0,6.29);g.fill();
    g.strokeStyle='#1a1006';g.lineWidth=.8;g.beginPath();g.moveTo(10.5,-3);g.quadraticCurveTo(12,-7,14.5,-7.5);g.moveTo(9.5,-3.2);g.quadraticCurveTo(10,-7.5,12.5,-8.6);g.stroke();
    // szárnyak erezettel (a csapás fázisa szerint)
    for(const [ox,L,Wd,an] of [[1,10,4.2,-1.0],[3,7.5,3.2,-.55]]){g.save();g.translate(ox,-4);g.scale(1,w);g.rotate(an);const wg=g.createLinearGradient(0,0,L,0);wg.addColorStop(0,'rgba(235,245,255,.75)');wg.addColorStop(1,'rgba(200,220,245,.35)');g.fillStyle=wg;g.beginPath();g.ellipse(L/2,0,L/2,Wd/2,0,0,6.29);g.fill();
      g.strokeStyle='rgba(90,110,140,.65)';g.lineWidth=.45;g.stroke();g.beginPath();g.moveTo(0,0);g.lineTo(L*.9,-.4);g.moveTo(L*.3,0);g.lineTo(L*.6,Wd*.4);g.moveTo(L*.45,-.2);g.lineTo(L*.7,-Wd*.4);g.stroke();g.restore();}
    BEE_SPR.push(c);}}
drawRealBee=function(x,y,s,f,flip){r12BeeFrames();const c=BEE_SPR[Math.floor(Math.abs(f*.7))%4];if(!c)return;ctx.save();ctx.translate(x,y);ctx.scale(flip?-s*.21:s*.21,s*.21);ctx.drawImage(c,-36,-30);ctx.restore();};
beeSwarmFx=function(src,ts,onHit,n=110,stings=4){n=Math.max(n,380);const bees=[];for(let i=0;i<n;i++){const z=Math.random();bees.push({x:src.x+rnd(-30,30),y:src.y+rnd(-30,30),vx:0,vy:0,t:ts[i%ts.length],ph:rnd(0,6.28),sp:rnd(.7,1.5),r:rnd(30,170),z,s:.9+z*1.5,dive:0,oy:rnd(-.6,.5),dl:rnd(0,.7)});}
  bees.sort((a,b)=>a.z-b.z);const st={t:0,on:true,phase:0};
  effects.push({update(dt){st.t+=dt;for(const b of bees){if(st.t<b.dl){b.x=src.x+rnd(-10,10);b.y=src.y+rnd(-10,10);continue;}let tx,ty;
        if(st.phase===2){tx=src.x+Math.cos(b.ph+st.t*3)*70;ty=src.y+Math.sin(b.ph+st.t*3)*45;}
        else{const al=ts.filter(q=>q.alive),L=al.length?al:ts,x0=Math.min(...L.map(cx))-170,x1=Math.max(...L.map(cx))+170,q=(Math.sin(st.t*1.9*b.sp+b.ph)+1)/2,t=b.t;tx=x0+(x1-x0)*q;ty=midY(t)+b.oy*t.h*t.scale*.6+Math.sin(st.t*5*b.sp+b.ph*2)*28;}
        b.dive=Math.max(0,b.dive-dt);const g=Math.min(1,dt*(st.t<1.1?2.2+b.sp:9)),nx=b.x+(tx-b.x)*g+rnd(-2.5,2.5),ny=b.y+(ty-b.y)*g+rnd(-2.5,2.5);b.vx=(nx-b.x)/Math.max(dt,.001);b.vy=(ny-b.y)/Math.max(dt,.001);b.x=nx;b.y=ny;}return st.on;},
    draw(){ctx.save();for(const t of ts){if(!t.alive)continue;ctx.globalAlpha=.18;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(cx(t),t.y+t.oy+4,120,16,0,0,6.29);ctx.fill();}ctx.restore();
      for(const b of bees){if(st.t<b.dl)continue;ctx.save();ctx.globalAlpha=.55+.45*b.z;drawRealBee(b.x,b.y,b.s,st.t*60+b.ph*3,b.vx<0);ctx.restore();}}});
  return (async()=>{const bz=setInterval(()=>sfx('buzz'),220);sfx('buzz');await wait(1100);
    for(let r=0;r<stings;r++){await wait(120);for(const t of ts)if(t.alive){t.hurt=.3;shake(5);sfx('needle');for(let i=0;i<8;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-50,40),vx:rnd(-80,80),vy:rnd(-80,30),life:.35,size:rnd(2,4),rgb:pick(['255,220,60','255,255,200'])});}await wait(220);}
    for(const t of ts)if(t.alive)onHit(t);await wait(250);st.phase=2;clearInterval(bz);await wait(800);st.on=false;})();};
{const qb=SUMMONS.find(x=>x.id==='queenbee');if(qb)qb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;await beeSwarmFx({x:S0.x+40,y:S0.y-(qb.h||280)*.6},fs,t=>hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]}),300,5);};}
A.beeSwarm=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';await beeSwarmFx({x:cx(e)-40,y:midY(e)},al,h=>hit(e,h,sk),300,5);e.pose='idle';};
