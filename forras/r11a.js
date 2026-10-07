
// ===== 11. kör =====
const eOutBack=k=>{const c=1.9;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);};
const eInBack=k=>{const c=1.6;return (c+1)*k*k*k-c*k*k;};
// összenyomás/nyújtás a talppont körül (e.sq: függőleges arány, a szélesség ellentétesen változik)
{const deS=drawEntity;drawEntity=function(e){if(!e||!e.sq||Math.abs(e.sq-1)<.001)return deS.apply(this,arguments);const x=cx(e),gy=e.y+e.oy;ctx.save();ctx.translate(x,gy);ctx.scale(1/Math.sqrt(e.sq),e.sq);ctx.translate(-x,-gy);try{return deS.apply(this,arguments);}finally{ctx.restore();}};}
// egész testes lendület: hátradől (felhúzás), aztán előrevetődik túllendüléssel, majd visszaáll – az ellenfél balra néz, előre = negatív dőlés
async function bodyWind(u,ms=240,amt=.12){const l0=u.lean||0;await tween(ms,k=>{const e=easeIO(k);u.lean=l0+amt*e;u.sq=1+.05*e;});}
async function bodyStrike(u,ms=150,amt=-.2){const l0=u.lean||0;await tween(ms,k=>{const e=eOutBack(k);u.lean=l0+(amt-l0)*e;u.sq=1.05-.11*Math.sin(Math.min(1,k*1.3)*Math.PI);});}
async function bodySettle(u,ms=260){const l0=u.lean||0,s0=u.sq||1;await tween(ms,k=>{const e=easeIO(k);u.lean=l0*(1-e);u.sq=s0+(1-s0)*e;});u.lean=0;u.sq=1;}

// ---- Fénypajzs: amíg áll, MINDEN ellenséges támadást kivéd és visszaver (nem fogy el); a visszaverés látványos aranysugár
function reflectFx(u){if(!u||!u.alive)return;const hs=S.heroes.filter(h=>h.alive);if(!hs.length)return;const sx=Math.max(...hs.map(cx))+105,sy=hs.reduce((s,h)=>s+midY(h),0)/hs.length+10,tx=cx(u),ty=midY(u);
  flash('255,240,180',.35,.15);sfx('mirror');
  const B={t:0};effects.push({update(dt){B.t+=dt;if(B.t>.12&&B.t<.5)for(let i=0;i<4;i++){const q=Math.random();part({x:sx+(tx-sx)*q,y:sy+(ty-sy)*q,vx:rnd(-60,60),vy:rnd(-60,60),life:.35,size:rnd(2,4),rgb:pick(['255,240,170','255,255,255']),shape:'star'});}return B.t<.75;},
    draw(){const k=Math.min(1,B.t/.15),a=B.t<.45?1:1-(B.t-.45)/.3;if(a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
      for(const [w,c] of [[46,`rgba(255,200,80,${.25*a})`],[22,`rgba(255,235,150,${.6*a})`],[7,`rgba(255,255,255,${a})`]]){ctx.strokeStyle=c;ctx.lineWidth=w*(1+.15*Math.sin(B.t*60));ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+(tx-sx)*k,sy+(ty-sy)*k);ctx.stroke();}
      glow(sx,sy,150*a,'255,230,140',.7*a);if(k>=1)glow(tx,ty,140*a,'255,220,120',.8*a);ctx.restore();}});
  setTimeout(()=>{if(!u.alive)return;shake(12);hitStop(60);for(let i=0;i<24;i++){const an=rnd(0,6.28),v=rnd(150,500);part({x:tx,y:ty,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:2,life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['255,230,140','255,255,255','255,200,80']),shape:'star'});}
    soundBlast(tx,ty,'255,220,120',200,450);u.hurt=.4;},180/(S.speed||1));}
{const hR=hit;hit=function(u,t,sk){
  if(t&&t.alive&&t.kind==='hero'&&u&&u.kind==='enemy'&&sk&&(sk.kind==='phys'||sk.kind==='mag')){const src=S.heroes.find(h=>h.alive&&h.st&&h.st.barrier);
    if(src){const keep=src.st.barrier;t.st.barrier=keep;t._blk=null;const r=hR.apply(this,arguments);t._blk=null;for(const h of S.heroes)if(h.alive&&h.st)h.st.barrier=keep;reflectFx(u);updateHUD();return r;}}
  return hR.apply(this,arguments);};}
SK.lightshield.desc='Fénypajzs a csapat elé: felragyog, mindenki elé pajzs kerül, majd középen egy nagy pajzs marad. Amíg áll (a következő kör végéig), MINDEN ellenséges támadást kivéd, és aranysugárral visszaveri a támadóra.';

// ---- Főnix: semmilyen védelem-erősítés
{const as11=addStatus;addStatus=function(t,type,turns){if(S._phx&&type==='defUp')return;return as11.apply(this,arguments);};
 const ph=SUMMONS.find(x=>x.id==='phoenix');if(ph){const r0=ph.run;ph.run=async(P,S0)=>{S._phx=true;try{await r0(P,S0);}finally{S._phx=false;}};}}

// ---- Espresszó: a lángcsóva a SZÁJÁBÓL jön (nem az orrából), nagyobb lángokkal
const ESP_MOUTH=[.29,.45];
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){es.run=async(P,S0)=>{const im=ENEMY_SPR['espresso-attack']||ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;const m=im?sumPt(es,S0,im,ESP_MOUTH[0],ESP_MOUTH[1]):{x:S0.x+120,y:S0.y-200};
    sfx('fire');for(let i=0;i<30;i++){const a=rnd(0,6.28),r=rnd(50,110);part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.4,vy:-Math.sin(a)*r/.4,life:.4,size:rnd(2,4),rgb:pick(['255,200,90','255,120,40'])});}
    await wait(420);rumble(1.8,12);flash('255,160,60',.4,.25);sfx('fire');const bz=setInterval(()=>sfx('fire'),300);
    await fireBreath(m,fs,1,{dur:1600,speed:1000,n:26,onHit:t=>{if(!t.alive)return;shake(10);for(let i=0;i<14;i++)part({x:cx(t)+rnd(-50,50),y:t.y+t.oy-rnd(0,t.h*t.scale),vx:rnd(-30,30),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(14,24),grow:40,rgb:'255,150,40',add:false,shape:'fire'});
      hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}});clearInterval(bz);await wait(300);};}}
A.doublebreath=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';await dimTo(.35,'40,5,0',200);const ash=u.stance==='ash';const M=()=>sprPt(u,ESP_MOUTH[0],ESP_MOUTH[1]);
  sfx('fire');await bodyWind(u,300,.08);const m=M();for(let i=0;i<24;i++){const a=rnd(0,6.28),r=rnd(40,90);part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.35,vy:-Math.sin(a)*r/.35,life:.35,size:rnd(2,4),rgb:ash?'230,230,240':'255,180,60'});}
  await wait(200);bodyStrike(u,200,-.1);flash(ash?'220,225,240':'255,150,60',.4,.3);hitStop(80);rumble(1.3,12);const bz=setInterval(()=>sfx('fire'),300);
  await fireBreath(M(),al,-1,{dur:1400,speed:950,n:22,smoke:ash,onHit:t=>{if(!t.alive)return;shake(7);groundCrack(cx(t),t.y+t.oy,ash?'200,215,255':'255,150,40',110);hit(u,t,sk);}});
  clearInterval(bz);await bodySettle(u);u.pose='idle';await dimTo(0,null,250);};

// ---- Espresszó – Farokcsapás: a helyén marad, megfordul, és a farka gumiszerűen elnyúlik egészen a hősig
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='idle';sfx('whoosh');await tween(260,k=>{u.spin=Math.PI*easeIO(k);});u.spin=Math.PI;
  const T=limbOn(u,'espresso');if(!T){u.spin=0;return;}const tl=T.tail;tl.blur=true;const aim=limbAim(u,'espresso','tail',.62,.97,cx(t)+10,midY(t)+10);const sx=Math.max(1,Math.min(3.2,aim.sx));tl.ax=aim.ax;
  await tween(280,k=>{const e=easeIO(k);tl.rot=(aim.rot-1.3)*e;tl.sx=1+(sx-1)*.35*e;u.lean=.08*e;});sfx('whoosh');
  await tween(170,k=>{const e=eOutBack(k);tl.rot=aim.rot-1.3+1.3*e;tl.sx=1+(sx-1)*(.35+.65*Math.min(1,k*1.4));u.lean=.08-.16*e;});
  sfx('rock');hitStop(110);shake(18);flash('255,200,140',.25,.1);const P=limbPt(u,'tail',.62,.97);groundCrack(P.x,t.y+t.oy,'255,180,90',140);dustWave(P.x,t.y+t.oy);puffs(P.x,t.y+t.oy,12,['180,160,130','150,130,110'],[16,30],{w:60,up:90});sparks(cx(t),midY(t),['255,220,150','255,255,255'],22,460);toss(t,44,360);hit(u,t,sk);
  await wait(180);await tween(320,k=>{const e=easeIO(k);tl.rot=aim.rot*(1-e);tl.sx=sx+(1-sx)*e;u.lean=-.08*(1-e);});tl.blur=false;limbOff(u);u.lean=0;await tween(240,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;};

// ---- Mézeskalács – Cukorpálca-ütés: az egész teste beleadja: hátradől, felhúzza, túllendülve lecsap
A.caneHook=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='gingerman-attack';const d=await dashTo(u,t,220,30);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const c=T.cane;c.blur=true;
  sfx('whoosh');await tween(260,k=>{const e=easeIO(k);c.rot=.55*e;u.lean=.16*e;u.sq=1+.06*e;u.ox=d.dx+14*e;});
  await tween(170,k=>{const e=eOutBack(k);c.rot=.55-2.25*e;u.lean=.16-.38*e;u.sq=1.06-.12*Math.sin(Math.min(1,k*1.3)*Math.PI);u.ox=d.dx+14-34*k;});
  sfx('hit');shake(12);hitStop(90);sparks(cx(t),midY(t),['255,80,90','255,255,255'],20,400);soundBlast(cx(t),midY(t),'255,200,210',120,350);
  fallDebris(cx(t),midY(t),10,(px,py,r,s)=>{ctx.fillStyle=pick(['#ffffff','#e0203a']);ctx.save();ctx.translate(px,py);ctx.rotate(r);ctx.fillRect(-5*s,-3*s,10*s,6*s);ctx.restore();},{v:300});
  toss(t,30,280);hit(u,t,sk);await tween(320,k=>{const e=easeIO(k);c.rot=-1.7*(1-e);u.lean=-.22*(1-e);u.sq=1;u.ox=d.dx-20*(1-e);});c.blur=false;limbOff(u);u.lean=0;await dashBack(u,d);};

// ---- Kamilla (ellenfél) – Legyezőhurrikán: egész testtel, nagy legyezővel, túllendüléssel
A.fanHurricane=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const K='kamilla-attack';e.pose='cast';const T=limbOn(e,K);const f=T&&T.fan;if(f)f.blur=true;sfx('wind');
  await tween(360,k=>{const q=easeIO(k);if(f){f.rot=.45*q;f.s=1+.8*q;}e.lean=.14*q;e.sq=1+.04*q;});sfx('whoosh');
  await tween(230,k=>{const q=eOutBack(k);if(f)f.rot=.45-2.9*q;e.lean=.14-.36*q;e.sq=1.04-.08*Math.sin(Math.min(1,k*1.3)*Math.PI);});shake(12);flash('245,250,255',.3,.1);const px=cx(e)-e.w*e.scale*.3;
  const st={t:0,x:px-100};effects.push({update(dt){st.t+=dt;st.x-=1200*dt;for(let i=0;i<12;i++)part({x:st.x+rnd(-60,60),y:rnd(H*.2,H*.88),vx:-rnd(600,1000),vy:rnd(-60,60),life:.45,size:rnd(1.5,3),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
      for(let i=0;i<5;i++){const a=st.t*12+i*1.26;part({x:st.x+Math.cos(a)*70,y:H*.6+Math.sin(a)*130,vx:-rnd(400,700),vy:rnd(-150,50),life:.9,size:rnd(5,9),rgb:pick(['255,250,235','255,230,120','120,180,70']),add:false,shape:'leaf'});}
      if(Math.random()<.6)part({x:st.x,y:rnd(H*.55,H*.9),vx:-rnd(300,600),vy:-rnd(10,60),life:.9,size:rnd(16,28),grow:30,rgb:'230,236,245',add:false,shape:'smoke'});return st.x>-200;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(st.x,H*.58);ctx.scale(1.5,1.3);glow(0,0,220,'230,240,255',.32);ctx.restore();}});
  const done=new Set();await tween(900,k=>{for(const t of al)if(!done.has(t)&&st.x<cx(t)+40){done.add(t);shake(9);sfx('hit');tween(520,q=>{t.ox=-110*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);t.spin=-Math.sin(q*Math.PI)*.3;}).then(()=>{t.ox=0;t.spin=0;});hit(e,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(e,t,sk);if(f)await tween(320,k=>{const q=easeIO(k);f.rot=-2.45*(1-q);f.s=1.8-.8*q;e.lean=-.22*(1-q);e.sq=1;});if(f)f.blur=false;limbOff(e);e.lean=0;e.sq=1;e.pose='idle';};
// az idézett Kamilla: nagyobb legyező, egész testes, folyékony lendítés
{const km=SUMMONS.find(x=>x.id==='kamilla');if(km){km.run=async(P,S0)=>{const im=km.img&&km.img(),key=im===ENEMY_SPR['kamilla-attack']?'kamilla-attack':im===ENEMY_SPR.kamilla?'kamilla':null,C=key&&limbCanv(key);if(!C)return;
    const D=LIMBS[key].parts.fan,F={rot:0,s:1,lean:0,on:true,hist:[]};const a0=S0.a;S0.a=0;
    const drawK=(rot,s,lean,al,body)=>{const Hh=(km.h||280)*S0.s,k=Hh/C.H,W2=Hh*C.W/C.H;ctx.save();ctx.globalAlpha=al;ctx.translate(S0.x,S0.y+Math.sin(T*3)*4);ctx.rotate(lean);if(km.flip)ctx.scale(-1,1);ctx.translate(-W2/2,-Hh);ctx.scale(k,k);
      if(body)ctx.drawImage(C.base,0,0);const px=D.pivot[0]*C.W,py=D.pivot[1]*C.H;ctx.translate(px,py);ctx.rotate(rot);ctx.scale(s,s);ctx.translate(-px,-py);ctx.drawImage(C.parts.fan,0,0);ctx.restore();};
    effects.push({update(){F.hist.unshift([F.rot,F.lean]);F.hist.length=Math.min(6,F.hist.length);return F.on;},draw(){if(F.fast)F.hist.slice(1).forEach(([r,l],i)=>drawK(r,F.s,l,.2*(1-i/6),false));drawK(F.rot,F.s,F.lean,1,true);}});
    sfx('wind');await tween(380,k=>{const q=easeIO(k);F.rot=.45*q;F.s=1+1.3*q;F.lean=-.12*q;});F.fast=true;sfx('whoosh');await tween(240,k=>{const q=eOutBack(k);F.rot=.45-2.9*q;F.lean=-.12+.32*q;});F.fast=false;sfx('wind');flash('240,248,255',.35,.15);shake(14);
    const gust={x:S0.x+150,on:true};effects.push({update(dt){gust.x+=1500*dt;for(let i=0;i<14;i++)part({x:gust.x+rnd(-80,60),y:rnd(H*.2,H*.88),vx:rnd(700,1200),vy:rnd(-40,40),life:.45,size:rnd(1.5,3.2),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
        for(let i=0;i<5;i++)part({x:gust.x,y:rnd(H*.35,H*.88),vx:rnd(500,900),vy:rnd(-120,20),life:.9,size:rnd(5,9),rgb:pick(['255,250,235','255,230,120']),add:false,shape:'leaf'});
        if(Math.random()<.8)part({x:gust.x-40,y:rnd(H*.55,H*.9),vx:rnd(300,600),vy:-rnd(10,60),life:.9,size:rnd(16,30),grow:30,rgb:'230,236,245',add:false,shape:'smoke'});return gust.on&&gust.x<W+200;},
      draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(gust.x-80,H*.58);ctx.scale(1.6,1.3);glow(0,0,230,'230,240,255',.35);ctx.restore();}});
    const foes=foesAlive(),done=new Set(),x0=S0.x+150;await tween(900,k=>{const gx=x0+1500*k*.9;for(const t of foes)if(!done.has(t)&&gx>cx(t)-40){done.add(t);shake(10);sfx('hit');sparks(cx(t),midY(t),['255,255,255','230,240,255'],18,440);
        tween(520,q=>{t.ox=130*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);}).then(()=>{t.ox=0;});hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});}});
    for(const t of foes)if(!done.has(t)&&t.alive)hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});gust.on=false;await tween(340,k=>{const q=easeIO(k);F.rot=-2.45*(1-q);F.s=2.3-1.3*q;F.lean=.2*(1-q);});F.on=false;S0.a=a0;};}}

// ---- Gomba-Király idézés: gombák hullanak az égből az ellenségekre, felrobbannak, és lila füst lesz belőlük
{const mk=SUMMONS.find(x=>x.id==='mushking');if(mk){mk.desc='Mérges gombák zuhannak az égből az ellenségekre, és lila spórafüstté robbannak: mindenki elalszik (a főellenségek nem), a csapat 20%-ot gyógyul.';
  mk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('poison');const P3=['170,100,220','140,80,200','200,140,240','120,60,170'];
    for(let i=0;i<20;i++)part({x:S0.x+rnd(-60,60),y:S0.y-(mk.h||280)*.85+rnd(-20,20),vx:rnd(-60,60),vy:-rnd(80,220),life:rnd(.8,1.2),size:rnd(16,28),grow:30,rgb:pick(P3),add:false,shape:'smoke'});await wait(300);
    await Promise.all(fs.map(t=>rainOn(t,7,(x,y,r,s)=>drawShroom(x,y,s*1.9,Math.sin(r)*.3),{v0:420,onLand:it=>{sfx('poison');for(let i=0;i<10;i++)part({x:it.x+rnd(-20,20),y:it.y+rnd(-15,15),vx:rnd(-120,120),vy:-rnd(20,140),drag:1,life:rnd(1.2,1.9),size:rnd(20,36),grow:45,rgb:pick(P3),add:false,shape:'smoke'});
      for(let i=0;i<10;i++){const a=rnd(0,6.28),v=rnd(80,260);part({x:it.x,y:it.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2,life:.6,size:rnd(2,4),rgb:'230,190,255',shape:'star'});}shake(5);}})));
    for(const t of fs){puffs(cx(t),midY(t),16,P3,[28,52],{w:60,h:50,l0:1.5,l1:2.3,grow:30});hit(P,t,{name:'Királyi spóra',kind:'mag',pow:.6,elem:'poison',tgt:'enemies',anim:'mushSpore',status:['sleep',1,2]});await wait(90);}
    await wait(600);healAll(P,.2);sfx('heal');await wait(500);};}}

// ---- Öreg Oolong idézés: sokkal nagyobb gőzfelhő
{const ol=SUMMONS.find(x=>x.id==='oolong');if(ol){ol.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.oolong,m=im?sumPt(ol,S0,im,.27,.38):{x:S0.x+100,y:S0.y-200};
    for(let i=0;i<16;i++)part({x:m.x+rnd(-10,10),y:m.y,vx:rnd(-20,40),vy:-rnd(30,80),life:.9,size:rnd(10,18),grow:25,rgb:'245,245,250',add:false,shape:'smoke'});await wait(350);rumble(1.4,8);
    const st={t:0};effects.push({update(dt){st.t+=dt;if(st.t<1.8)for(let i=0;i<10;i++){const t=pick(fs),tx=cx(t)+rnd(-90,90),ty=midY(t)+rnd(-90,70),an=Math.atan2(ty-m.y,tx-m.x)+rnd(-.12,.12),v=rnd(600,850);
        part({x:m.x+rnd(-6,6),y:m.y+rnd(-6,6),vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.2,g:-40,life:rnd(1,1.5),size:rnd(14,22),grow:80,rgb:pick(['245,248,252','232,238,246','255,255,255']),add:false,shape:'smoke'});}return st.t<2;},
      draw(){if(st.t>1.8)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(m.x,m.y,90,'230,240,255',.7);ctx.restore();}});
    const bz=setInterval(()=>sfx('splash'),350);await wait(700);for(const t of fs){puffs(cx(t),midY(t),14,['245,245,250','232,236,244'],[26,44],{w:60,h:60,up:120,l0:1.2,l1:1.9});t.hurt=.4;hit(P,t,{name:'Forró gőz',kind:'mag',pow:2.3,elem:'water',tgt:'enemies'});if(t.alive&&STATUS.scald)addStatus(t,'scald',2);}
    await wait(1100);clearInterval(bz);};}}

// ---- Mézkirálynő idézés és Zümmögővihar: még nagyobb raj
{const qb=SUMMONS.find(x=>x.id==='queenbee');if(qb)qb.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;await beeSwarmFx({x:S0.x+40,y:S0.y-(qb.h||280)*.6},fs,t=>hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]}),230,5);};}
A.beeSwarm=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;e.pose='cast';await beeSwarmFx({x:cx(e)-40,y:midY(e)},al,h=>hit(e,h,sk),200,5);e.pose='idle';};

// ---- Álomcsillagok: valódi, vékony holdsarló, hullócsillagok
drawMoon=function(x,y,R,a=1){ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x-R*.55,y,R*2.8,'190,200,255',.28);ctx.globalCompositeOperation='source-over';
  const c=drawMoon.cv||(drawMoon.cv=document.createElement('canvas'));const Z=Math.ceil(R*2+8);c.width=c.height=Z;const g=c.getContext('2d'),m=Z/2;
  const gr=g.createRadialGradient(m-R*.6,m,R*.1,m,m,R);gr.addColorStop(0,'#fffdf0');gr.addColorStop(.8,'#f6edc8');gr.addColorStop(1,'#d8c890');g.fillStyle=gr;g.beginPath();g.arc(m,m,R,0,6.29);g.fill();
  g.globalCompositeOperation='destination-out';g.beginPath();g.arc(m+R*.42,m-R*.12,R*.86,0,6.29);g.fill();
  ctx.drawImage(c,x-m,y-m);ctx.restore();};
{const ss=A.sleepStars;A.sleepStars=async(u,ts,sk)=>{const st={t:0,on:true};
  effects.push({update(dt){st.t+=dt;if(st.on&&Math.random()<.25){const x0=rnd(W*.3,W),y0=rnd(10,160);const s={x:x0,y:y0,vx:-rnd(500,800),vy:rnd(150,300),t:0};effects.push({update(d){s.t+=d;s.x+=s.vx*d;s.y+=s.vy*d;return s.t<.6;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(230,230,255,${.8*(1-s.t/.6)})`;ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*.12,s.y-s.vy*.12);ctx.stroke();glow(s.x,s.y,10,'255,255,255',.9);ctx.restore();}});}return st.on;},draw(){}});
  try{await ss(u,ts,sk);}finally{st.on=false;}};}

// ---- Morcus: az új támadások a Próbateremben is látszanak (ESK.chaosdice, ESK.chaosstorm, ESK.chaosclaw)
if(EN_DEF.morcus&&EN_DEF.morcus.ai){const ai1=EN_DEF.morcus.ai;EN_DEF.morcus.ai=async e=>{const r=e.hp/e.maxHp,trans=(e.phase===1&&r<=.6)||(e.phase===2&&r<=.3&&!shadowsAlive());
  if(!trans&&Math.random()<.4){e.turn=(e.turn||0)+1;const pk=Math.random();const sk=e.phase===1?(pk<.5?ESK.chaosdice:pk<.75?ESK.chaosstorm:ESK.chaosclaw):(pk<.25?ESK.chaosdice:pk<.6?ESK.chaosstorm:ESK.chaosclaw);return useEnemySkill(e,sk,aiTarget(e));}return ai1(e);};}

// ---- Elcsenés (Majom és Mézeskalács): MINDIG tőrt vagy tűzbombát lop (ha a csapatnál van, onnan), és rögtön visszadobja
A.monkeySnatch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const have=['knife','firebomb'].filter(id=>S.inv&&S.inv[id]>0),id=pick(have.length?have:['knife','firebomb']);
  sfx('whoosh');const d=await dashTo(u,t,220);sfx('hit');t.hurt=.3;sparks(cx(t),midY(t),['255,230,150','255,255,255'],10,260);
  if(S.inv&&S.inv[id]>0){S.inv[id]--;updateHUD();}popLabel(t,'ELLOPTÁK: '+ITEMS[id].name+'!','#ffd84a');hit(u,t,{...sk,steal:false,pow:(sk.pow||1)*.5});
  // a tárgy látványosan átkerül a tolvaj kezébe
  const H0={x:cx(t),y:midY(t)};await flyObj(H0,{x:cx(u),y:topY(u)},260,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,30,'255,220,120',.6);ctx.restore();id==='knife'?drawDagger(x,y,r,1.6):drawBomb(x,y,15,r);},{spin:10,arc:60});
  const bag={on:true};effects.push({update(){return bag.on;},draw(){const x=cx(u)+6,y=topY(u)-14;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26,'255,220,120',.5);ctx.restore();if(id==='knife')drawDagger(x,y,-Math.PI/2+Math.sin(T*8)*.2,1.6);else drawBomb(x,y,15,Math.sin(T*6)*.3);}});
  popLabel(u,'ELLOPTA: '+ITEMS[id].name+'!','#ffd84a');sfx('boing');await tween(380,k=>{const e=easeIO(k);u.ox=d.dx*(1-e);u.oy=d.dy*(1-e);u.jump=Math.abs(Math.sin(k*Math.PI*3))*40;});u.ox=0;u.oy=0;u.jump=0;
  await bodyWind(u,220,.14);bag.on=false;u.pose='attack';bodyStrike(u,150,-.18);const h=fp(u,.22,.27);
  if(id==='knife'){const v=pick(S.heroes.filter(x=>x.alive))||t,T2={x:cx(v),y:midY(v)};sfx('slash');
    await Promise.all([-1,0,1].map(i=>wait((i+1)*70).then(()=>flyObj(h,{x:T2.x+rnd(-10,10),y:T2.y+i*24},300,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26,'220,230,255',.5);ctx.restore();drawDagger(x,y,r,1.7);},{spin:-28,arc:30+i*20,trail:['230,235,255'],trailShape:'streak'})).then(()=>{sfx('hit');sparks(T2.x,T2.y+i*24,['255,255,255','200,210,230'],12,340);v.hurt=.3;shake(6);})));
    hit(u,v,{name:'Lopott tőr',kind:'phys',pow:1.4,elem:'phys',tgt:'enemy'});}
  else{const al=S.heroes.filter(x=>x.alive),xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,my=al.reduce((s,x)=>s+midY(x),0)/al.length;sfx('whoosh');
    await flyObj(h,{x:mx,y:my},520,(x,y,r)=>drawBomb(x,y,18,r),{spin:-10,arc:150,trail:['255,180,80','255,240,180']});sfx('boom');flash('255,200,120',.4,.15);shake(18);hitStop(90);bigBoom(mx,my,1.7);
    for(const v of al){toss(v,30,300);hit(u,v,{name:'Lopott tűzbomba',kind:'phys',pow:1.1,elem:'fire',tgt:'enemies',status:['burn',.5,2]});}}
  await bodySettle(u);u.pose='idle';};
ESK.snatch.desc='Mindig elcsen egy tőrt vagy tűzbombát (ha a csapatnál van, onnan), és rögtön visszadobja.';
