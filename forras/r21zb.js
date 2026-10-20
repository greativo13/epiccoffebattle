
// ===== 40. kör: Morgána – Sötét futóhomok =====
// (ia: „nincs homok hatása; egy nagy homokot akarok, a karok az ellenségeknél jöjjenek fel; Morgána guggoljon le, üssön
// a földbe, és tőle induljon a homoklavina”)
// Morgána leguggol és a földbe csap → a becsapódástól sötét homoklavina gördül végig a talajon az ellenségekig →
// ott EGY nagy, örvénylő futóhomok-mező terül szét mindenki alatt → minden ellenségnél lidérckarok (fx7-wraitharm)
// nőnek ki a homokból, derékon ragadják és mélyre lehúzzák őket → a homok kiköpi őket, a mező visszahúzódik.
// Funkció: sötét sebzés mindenkire + 35% eséllyel 1 körre beragad (kábulat).
SK.quicksand={name:'Sötét futóhomok',mp:30,cd:2,tgt:'enemies',kind:'mag',pow:1.9,elem:'dark',anim:'quicksand',status:['stun',.35,1],
  desc:'Morgána a földbe csap: sötét homoklavina önti el az ellenséget, lidérckarok húzzák le őket. 35% eséllyel 1 körre beragadnak.'};
SHOP_SKILLS.witch.push(['quicksand','4-2',1900]);

// ---- homok-textúra (egyszer készül): sötét, lilás-barna szemcsés homok, finom fodrokkal
let R21_SAND=null;
function r21SandTex(){
  if(R21_SAND)return R21_SAND;const N=256,c=document.createElement('canvas');c.width=c.height=N;const g=c.getContext('2d');
  g.fillStyle='#5b4632';g.fillRect(0,0,N,N);
  // fodrok (dűne-hullámok)
  for(let i=0;i<18;i++){g.strokeStyle=`rgba(${i%2?'176,146,104':'40,28,20'},.55)`;g.lineWidth=rnd(2,6);g.beginPath();const y0=rnd(0,N);
    for(let x=-10;x<=N+10;x+=8)g.lineTo(x,y0+Math.sin(x/N*Math.PI*2*2+i)*8);g.stroke();}
  // szemcsék
  const cols=['110,86,60','140,112,78','170,140,100','78,58,40','46,34,24','200,172,128','150,110,190'];
  for(let i=0;i<14000;i++){const col=cols[(Math.random()*cols.length)|0],a=col==='170,130,200'?.5:rnd(.5,1);g.fillStyle=`rgba(${col},${a})`;
    const s=Math.random()<.85?1:2;g.fillRect(Math.random()*N,Math.random()*N,s,s);}
  R21_SAND={c,pat:null};return R21_SAND;
}
function r21PatMove(p,x,y){try{if(p&&p.setTransform&&typeof DOMMatrix==='function')p.setTransform(new DOMMatrix([1,0,0,1,x,y]));}catch(e){}}
function r21SandPat(){const T0=r21SandTex();if(!T0.pat)T0.pat=ctx.createPattern(T0.c,'repeat');return T0.pat;}

// a jelenet állapota (egyszerre egy futóhomok fut)
let R21QS=null;
// homokszemcsék (saját, gravitációval)
// (na01 „darabos, mű”): a négyzet-pixel homokszemek helyett festett földrögök (fx7-clods) és festett porfelhők, ritkítva
let R21QSG=0;function r21QsGrain(x,y,vx,vy,size){if(!R21QS||typeof r21PD!=='function')return;if((R21QSG++)%3)return;const im=R17I.clods||R17I.pebble;
  r21PD(im,x,y,{vx,vy,g:900,life:rnd(.5,.9),size:(size||3.5)*7,vr:rnd(-8,8)});
  if(Math.random()<.18&&R17I.teacloud)r21PD(r21Filt(R17I.teacloud,'saturate(.5) brightness(.7)'),x,y,{vx:vx*.3,vy:-rnd(20,60),life:rnd(.8,1.2),size:rnd(70,120),grow:60,vr:rnd(-.4,.4),a:.7});}

// a nagy homokmező: a lavina sávja Morgánától az ellenségekig + a nagy futóhomok-ellipszis az ellenségek alatt
function r21QsField(){
  const Q=R21QS;if(!Q||Q.a<=0)return;
  const PIT=R17I.sandpit,WV=R17I.sandwave,gY=x=>Q.y0+(Q.y1-Q.y0)*Math.max(0,Math.min(1,(x-Q.x0)/Math.max(1,Q.x1-Q.x0)));
  ctx.save();ctx.globalAlpha=Q.a;
  // 1) a nagy futóhomok: FESTETT homoktölcsér (fx7-sandpit) az összes ellenfél alatt, lassan „lélegzik”
  if(Q.r>0&&PIT){const w=Q.RX*2.8*Q.r,h=w*PIT.height/PIT.width;
    ctx.drawImage(PIT,Q.cx-w/2,Q.cy-h*.5,w,h);}
  // 1b) (na01: „maradjon homoknyom, ahol végigment a hullám”) a hullám nyomában a talajon festett homokhát marad:
  // a festett homokhullám (fx7-sandwave) laposra nyomott, egymásba érő lenyomatai – a végén a mezővel együtt halványul el
  if(Q.trail&&WV)for(const s2 of Q.trail){const w=s2.w,h=w*WV.height/WV.width*.42;ctx.save();ctx.globalAlpha=Q.a*Math.min(1,s2.a);ctx.translate(s2.x,s2.y);if(s2.fl)ctx.scale(-1,1);ctx.drawImage(WV,-w/2,-h*.62,w,h);ctx.restore();}
  // 2) a lavina: FESTETT homokhullám (fx7-sandwave) gördül a talajon Morgána öklétől az ellenfelekig, egyre nagyobb
  if(Q.wave>0&&WV){const fx=Q.front,gy=gY(fx),k=Math.min(1,(fx-Q.x0)/Math.max(1,Q.fx1-Q.x0)),h=(140+230*k)*Q.wave,w=h*WV.width/WV.height;
    ctx.save();ctx.globalAlpha=Q.a*Math.min(1,Q.wave*1.4);ctx.translate(fx,gy+h*.08);ctx.drawImage(WV,-w*.78,-h,w,h);ctx.restore();}
  // 3) szemcsék
  for(const p of Q.grains){const a=Math.max(0,Math.min(1,p.life/p.max*1.5));ctx.fillStyle=`rgba(${p.c},${a})`;ctx.fillRect(p.x-p.s/2,p.y-p.s/2,p.s,p.s);}
  ctx.restore();
}
function r21QsArms(E,Q){
  if(E.k<=0||typeof r21Arm!=='function'||!R17I.wraitharm)return;
  const e=E.t,x=cx(e),gy=E.gy,H=E.H,tw=e.w*e.scale,L=E.L,off=Math.max(tw*.42,26);
  ctx.save();ctx.beginPath();ctx.rect(-50,-50,W+100,gy+4+50);ctx.clip();
  const sides=tw>140?[1,-1,.25]:[1,-1];
  for(const side of sides){
    const th=.3*(.45+.55*E.grip)*side,hx=x-side*off,hy=gy+E.sink-H*(Math.abs(side)<1?.62:.45),LL=Math.abs(side)<1?L*1.1:L,
      bx=hx-Math.sin(th)*LL*.86,by=hy+Math.cos(th)*LL*.86+LL*.95*(1-E.k);
    r21Arm(bx,by,LL,th,side<0,Q.a,E.grip);
  }
  ctx.restore();
}
// rajzolási rend: a homokmező az első figura ELŐTT (a talajon), az ellenség besüllyed (a homok alatt levágva),
// előtte a homokpárkány, és a karok.
let R21QS_FR=-1;
{const de=drawEntity;drawEntity=function(e){
  const Q=R21QS;if(!Q||Q.a<=0||!e)return de.apply(this,arguments);
  if(R21QS_FR!==Q.frame){R21QS_FR=Q.frame;try{r21QsField();}catch(err){}}
  const E=Q.list.find(o=>o.t===e);if(!E)return de.apply(this,arguments);
  const oy0=e.oy,lift0=e.lift;
  if(E.sink>0&&e.lift)e.lift=e.lift*(1-Math.min(1,E.sink/(E.H*.2)));
  e.oy=oy0+E.sink;
  ctx.save();ctx.beginPath();ctx.rect(-50,-200,W+100,E.gy+2+200);ctx.clip();
  try{de.apply(this,arguments);}finally{ctx.restore();e.oy=oy0;e.lift=lift0;}
  // homokpárkány a besüllyedt test előtt
  if(E.sink>2&&R17I.sandpit){const PIT=R17I.sandpit,w=Q.RX*2.8*Q.r,h=w*PIT.height/PIT.width,x0=Q.cx-w/2,y0=Q.cy-h*.5,r=Math.max(e.w*e.scale*.75,60);
    ctx.save();ctx.globalAlpha=Q.a;ctx.beginPath();ctx.ellipse(cx(e),E.gy+2,r,r*.3,0,0,Math.PI);ctx.clip();ctx.drawImage(PIT,x0,y0,w,h);ctx.restore();
    for(let i=0;i<2;i++)r21QsGrain(cx(e)+rnd(-r*.8,r*.8),E.gy,rnd(-60,60),-rnd(40,140),rnd(2,3.5));}
  r21QsArms(E,Q);
};}

// ---- Morgána guggoló képe (fx7-witchcrouch / díszruhában fx7-witchGcrouch): a lábánál a talajhoz igazítva
function r21CrouchImg(u){const g=typeof gearLook==='function'?gearLook(u):null;return (g&&R17I.witchGcrouch)||R17I.witchcrouch||null;}
function r21CrouchBox(u){const im=r21CrouchImg(u);if(!im)return null;const Hs=u.h*u.scale,h=Hs*.8,w=h*im.width/im.height,gy=u.y+u.oy+(u._crouch?u._crouch.dy:0);
  const g=im===R17I.witchGcrouch;return {im,x:cx(u)-w*.42,y:gy-h,w,h,fx:g?.87:.81,fy:.93};}
function r21CrouchFist(u){const b=r21CrouchBox(u);if(!b)return {x:cx(u)+u.w*u.scale*.45,y:u.y+u.oy+4};return {x:b.x+b.w*b.fx,y:u.y+u.oy+2};}
{const de=drawEntity;drawEntity=function(e){
  if(!e||!e._crouch)return de.apply(this,arguments);const b=r21CrouchBox(e);if(!b)return de.apply(this,arguments);
  const ca=e._crouch.a==null?1:e._crouch.a;if(ca<1){const a0=e.alpha==null?1:e.alpha;e.alpha=a0*(1-ca);try{de.apply(this,arguments);}finally{e.alpha=a0;}}
  const gy=e.y+e.oy;ctx.save();ctx.translate(b.x+b.w/2,gy+3);ctx.scale(1,.26);const sg=ctx.createRadialGradient(0,0,0,0,0,b.w*.55);sg.addColorStop(0,'rgba(0,0,0,.6)');sg.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=sg;ctx.beginPath();ctx.arc(0,0,b.w*.55,0,6.29);ctx.fill();ctx.restore();
  ctx.save();ctx.globalAlpha*=(e.alpha==null?1:e.alpha)*ca;ctx.drawImage(b.im,b.x,b.y,b.w,b.h);ctx.restore();
};}

A.quicksand=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;
  const rel=typeof keepPose==='function'?keepPose(u):()=>{};
  try{
  await dimTo(.55,'10,4,16',300);
  // a homokmező adatai
  const gys=al.map(t=>t.y+t.oy+6),minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.6)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.6));
  const ux=cx(u)+u.w*u.scale*.45,uy=u.y+u.oy+4;
  const Q=R21QS={a:1,t:0,frame:0,grains:[],x0:ux,y0:uy,x1:minX,y1:gys.reduce((a,b)=>a+b,0)/gys.length,front:ux,fx1:(minX+maxX)/2,band:0,wave:0,r:0,
    cx:(minX+maxX)/2,cy:(Math.min(...gys)+Math.max(...gys))/2,RX:Math.max(200,(maxX-minX)/2+110),RY:Math.max(60,(Math.max(...gys)-Math.min(...gys))/2+55),
    list:al.map(t=>{const H=t.h*t.scale;return {t,gy:t.y+t.oy+6,H,vr:Math.max(t.w*t.scale*.9,110),L:Math.max(230,H*1.2),k:0,grip:0,sink:0};})};
  const S0={on:true};
  R18E({update(dt){Q.t+=dt;Q.frame++;
      for(const p of Q.grains){p.vy+=900*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.life-=dt;}
      Q.grains=Q.grains.filter(p=>p.life>0);
      // a mezőn folyamatosan pereg és örvénylik a homok
      if(Q.r>.3)for(const E of Q.list)if(Math.random()<.8){const an=rnd(0,6.29),rr=E.vr*Q.r*rnd(.4,1);r21QsGrain(cx(E.t)+Math.cos(an)*rr,E.gy+Math.sin(an)*rr*.3,-Math.sin(an)*120,-rnd(40,140),rnd(2,3.5));}
      return S0.on;},draw(){}});

  // 1) Morgána leguggol (festett guggoló kép), a kezében sötét erő gyűlik
  sfx('dark');
  await tween(150,k=>{u.sq=1-.06*Math.sin(k*Math.PI);});u.sq=1;
  u._crouch={dy:-14,a:0};await tween(220,k=>{const e=easeIO(k);u._crouch.dy=-14*(1-e);u._crouch.a=e;});u._crouch.dy=0;u._crouch.a=1;
  {const f=r21CrouchFist(u);for(let i=0;i<16;i++)part({x:f.x+rnd(-24,24),y:f.y-rnd(0,40),vx:rnd(-40,40),vy:-rnd(20,90),life:.5,size:rnd(3,6),rgb:'150,80,230',add:true});}
  // 2) az öklével a földbe csap
  await wait(140);
  {const f=r21CrouchFist(u);Q.x0=f.x;Q.y0=f.y;Q.front=f.x;
  sfx('punch');sfx('earthm');shake(16);hitStop(80);flash('80,40,110',.25,.1);u._crouch.dy=4;tween(160,k=>{if(u._crouch)u._crouch.dy=4*(1-k);});
  for(let i=0;i<50;i++)r21QsGrain(f.x+rnd(-20,30),f.y-rnd(0,6),rnd(-160,320),-rnd(180,520),rnd(2.5,5));
  for(let i=0;i<12;i++)part({x:f.x+rnd(-40,50),y:f.y-rnd(0,20),vx:rnd(-90,160),vy:-rnd(30,110),life:rnd(.7,1.2),size:rnd(20,36),grow:30,rgb:pick(['150,122,88','120,96,70']),add:false,shape:'smoke'});}
  // 3) a homoklavina végiggördül a talajon az ellenségekig
  sfx('quake');rumble&&rumble(1.2,7);
  const dist=Q.fx1-Q.x0;
  await tween(Math.max(950,dist*1.7),k=>{const e=easeIO(k);Q.front=Q.x0+dist*e;Q.band=Math.min(1,k*3);Q.wave=Math.min(1,k*4);
    const gy=Q.y0+(Q.y1-Q.y0)*Math.max(0,Math.min(1,(Q.front-Q.x0)/Math.max(1,Q.x1-Q.x0)));
    for(let i=0;i<16;i++)r21QsGrain(Q.front+rnd(-40,40),gy-rnd(20,170),rnd(40,420),-rnd(160,620),rnd(2,6));
    if(!Q.trail)Q.trail=[];{const l=Q.trail[Q.trail.length-1];if(!l||Q.front-l.x>16)Q.trail.push({x:Q.front-30,y:gy+6,w:150*(.75+.5*k),a:0,fl:false});}
    for(const s2 of Q.trail)s2.a=Math.min(.9,s2.a+.05);
    if(Q.front>Q.x1-40)Q.r=Math.max(Q.r,Math.min(1,(Q.front-(Q.x1-40))/Math.max(1,Q.fx1-Q.x1+40)));
    for(let n=0;n<2;n++)part({x:Q.front+rnd(-40,20),y:gy-rnd(10,90),vx:rnd(20,160),vy:-rnd(20,110),life:rnd(.8,1.4),size:rnd(30,60),grow:40,rgb:pick(['150,122,88','120,96,70','170,145,105']),add:false,shape:'smoke'});
    if(Math.random()<.45)shake(7);});
  // 4) a hullám szétterül: EGY nagy futóhomok-mező mindenki alatt
  sfx('earthm');shake(12);
  await tween(420,k=>{Q.r=Math.max(Q.r,eOutBack(k));Q.wave=1-k;});Q.wave=0;
  popLabel(al[0],'SÖTÉT FUTÓHOMOK!','#c890ff');
  // Morgána közben felegyenesedik
  // Morgána felegyenesedik
  tween(260,k=>{if(u._crouch){u._crouch.a=1-easeIO(k);}}).then(()=>{u._crouch=null;});
  // 5) süllyednek, remegnek
  await tween(380,k=>{for(const E of Q.list){E.sink=E.H*.1*k;E.t.hurt=.15;}});
  // 6) a homokból lidérckarok nőnek ki – minden ellenségnél
  sfx('growl');
  await Promise.all(Q.list.map((E,i)=>wait(i*110).then(()=>{for(let n=0;n<16;n++)r21QsGrain(cx(E.t)+rnd(-60,60),E.gy,rnd(-160,160),-rnd(200,420),rnd(2,4));return tween(460,k=>{E.k=eOutBack(k);});})));
  // 7) megragadják
  sfx('whoosh');await tween(200,k=>{for(const E of Q.list)E.grip=k*k;});sfx('bite');shake(12);flash('120,40,180',.22,.1);
  // 8) LEHÚZZÁK: mélyre rántják őket a homokba
  sfx('earthm');rumble&&rumble(1.4,10);
  await tween(480,k=>{const kk=k*k;for(const E of Q.list){E.sink=E.H*(.1+.65*kk);E.t.hurt=.3;
    for(let n=0;n<3;n++)r21QsGrain(cx(E.t)+rnd(-E.vr*.5,E.vr*.5),E.gy,rnd(-200,200),-rnd(200,480),rnd(2.5,5));}});
  shake(18);hitStop(90);flash('60,0,90',.3,.12);
  for(const E of Q.list){const t=E.t;sparks(cx(t),E.gy-10,['170,90,255','255,255,255'],14,400);
    for(let n=0;n<30;n++)r21QsGrain(cx(t)+rnd(-40,40),E.gy-rnd(0,10),rnd(-280,280),-rnd(260,560),rnd(3,6));
    if(t.alive){S._r21noSink=true;try{hit(u,t,sk);}finally{S._r21noSink=false;}}}
  // vergődnek
  await tween(560,k=>{for(const E of Q.list){E.sink=E.H*(.75+.04*Math.sin(k*30));E.t.hurt=.2;}});
  // 9) a karok elengedik, visszasüllyednek, a homok kiköpi őket
  sfx('whoosh');
  await tween(380,k=>{for(const E of Q.list){E.grip=1-k;E.k=1-k;}});
  for(const E of Q.list)for(let n=0;n<20;n++)r21QsGrain(cx(E.t)+rnd(-40,40),E.gy,rnd(-220,220),-rnd(240,480),rnd(2.5,5));
  await tween(360,k=>{for(const E of Q.list)E.sink=E.H*.75*(1-eOutBack(k));});
  for(const E of Q.list)E.sink=0;
  // 10) a homok visszahúzódik
  await tween(420,k=>{Q.r=1-k*k;Q.band=1-k;Q.a=1-k;});
  S0.on=false;R21QS=null;
  await dimTo(0,null,300);
  }finally{R21QS=null;rel();u._crouch=null;u.pose='idle';u.sq=1;u.lean=0;}
};

// a futóhomok saját maga süllyeszt: ne nyíljon utána még egy kráter is (r21Sink)
{const sk0=r21Sink;r21Sink=function(){if(S._r21noSink)return;return sk0.apply(this,arguments);};}

// ===== Hang iPhone-on néma (csengő ki) módban is (ia: „nem kapcsol be a hang”) =====
// iOS néma módban a Web Audio hangeffektek elnémulnak. Megoldás: a hangmenet „lejátszás” típusú legyen
// (iOS 17+: navigator.audioSession), régebbin pedig egy néma, ismétlődő <audio> elem tartja lejátszás-módban.
{let silentEl=null;const SILENT='hangok/csend.mp3';
 const unlock=()=>{try{if(navigator.audioSession&&navigator.audioSession.type!=='playback')navigator.audioSession.type='playback';}catch(e){}
   try{if(!silentEl&&!(navigator.audioSession)){silentEl=new Audio(SILENT);silentEl.loop=true;silentEl.volume=0.01;silentEl.setAttribute('playsinline','');}
     if(silentEl&&silentEl.paused&&!SND.muted)silentEl.play().catch(()=>{});}catch(e){}
   try{if(SND.ctx&&SND.ctx.state!=='running')SND.ctx.resume();}catch(e){}};
 try{if(navigator.audioSession)navigator.audioSession.type='playback';}catch(e){}
 for(const ev of ['pointerdown','touchend','keydown'])addEventListener(ev,unlock,{passive:true});
 // a „Hang” gombra kattintáskor azonnal szóljon egy próbahang, hogy hallani lehessen, működik
 {const m0=sndMute;sndMute=function(on){const r=m0.apply(this,arguments);if(!on){unlock();setTimeout(()=>{try{sfx('heal');}catch(e){}},60);}return r;};}
 // visszatéréskor (háttérből) újraindítjuk
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)unlock();});}

// ===== Bolt: hány fejlesztés kell még az új (díszes) ruhához (ia ma09) =====
{const sh=shopScreen;shopScreen=function(){const r=sh.apply(this,arguments);try{
  if(S.shopTab&&S.shopTab!=='items'&&typeof GEAR_LOOK==='object'){const pool=(S.roster||S.heroes||[]),nm=(document.querySelector('.ov-box.shop .shop-list .shop-name')||{}).textContent||'',h=pool.find(x=>typeof GEAR_NAME==='object'&&GEAR_NAME[x.type]&&nm.startsWith(GEAR_NAME[x.type][0]))||pool.find(x=>x.type===S.shopTab)||S.heroes[0];
    const box=document.querySelector('.ov-box.shop .shop-list');if(h&&h.gear&&box&&!box.querySelector('.r21look')){
      const gw=h.gear.w||0,ga=h.gear.a||0,nw=Math.max(0,3-gw),na=Math.max(0,3-ga),d=document.createElement('div');d.className='r21look';
      d.innerHTML=(nw||na)?`👗 <b>Új ruha:</b> még ${nw?`<b>${nw}</b> fegyver-`:''}${nw&&na?' és ':''}${na?`<b>${na}</b> ruha-`:''}fejlesztés kell (fegyver ${Math.min(gw,3)}/3, ruha ${Math.min(ga,3)}/3)`:`👗 <b>Új ruha megvan!</b>`;
      const head=box.querySelector('.shop-head');box.insertBefore(d,head||null);}}}catch(e){}return r;};}
{const st=document.createElement('style');st.textContent='.r21look{margin:4px 0 8px;padding:7px 10px;border-radius:10px;background:rgba(255,215,120,.12);border:1.5px solid rgba(255,215,120,.55);color:#ffe6a8;font-size:13px;font-weight:700}.r21look b{color:#fff}';document.head.appendChild(st);}

// ===== Tempó (ia ja05 „Tusátok túl lassú, darabos”, x02 „Cerberus túl lassú”): a jelenet ugyanaz, csak gyorsabban fut =====
function r21Faster(name,f){const o=A[name];if(typeof o!=='function')return;A[name]=async function(){const t0=tween;tween=(ms,fn)=>t0(ms*f,fn);try{return await o.apply(this,arguments);}finally{tween=t0;}};}
r21Faster('inkWave',.62);r21Faster('cerberus',.75);

// ===== Retró hangok és zene (ia ma10: „nem illenek a játékhoz” → „Retró játékzene”, mindkettő cserélve) =====
// Juhani Junkala: „The Essential Retro Video Game Sound Effects Collection [512 sounds]” és „Retro Game Music Pack” (CC0, opengameart.org).
// Csilingelő/csengő hang nincs (érme, bling, gong kimarad).
{const N={hit:3,punch:4,slash:4,boom:3,quake:2,rock:3,fire:3,dark:3,spell:3,holy:3,heal:2,ice:3,thunder:3,poison:2,whoosh:3,roar:3,wail:2,die:2,limit:2,victory:1,levelup:1,defeat:1,click:1,miss:1,land:2};
 for(const k in N){SAMPLE_FILES['r8_'+k]=[...Array(N[k])].map((_,i)=>`hangok/r8/${k}${i+1}.mp3`);}
 const MAPS={hit:[['hit',.9],['punch',.9]],punch:[['punch',1]],slash:[['slash',.9]],needle:[['slash',.7,1.3]],string:[['slash',.6,1.2]],
   boom:[['boom',.9]],quake:[['quake',1]],earthm:[['quake',.8,.9]],rock:[['rock',.8]],crunch:[['rock',.7,1.2]],block:[['punch',.7,.8]],guard:[['punch',.6,.7]],
   fire:[['fire',.8]],dark:[['dark',.7]],spell:[['spell',.7]],mirror:[['spell',.6,1.2]],zap:[['thunder',.6,1.2]],sonic:[['wail',.6,1.3]],
   holy:[['holy',.6]],buff:[['holy',.5,1.1]],shield:[['holy',.5,.9]],heal:[['heal',.6]],gulp:[['heal',.5,1.2]],
   ice:[['ice',.8]],glass:[['ice',.8,1.2]],chill:[['ice',.6,.8]],thunder:[['thunder',.8]],
   poison:[['poison',.7]],squish:[['poison',.6,1.2]],splash:[['land',.8]],water:[['land',.8]],steam:[['land',.6,.8]],dust:[['land',.6]],boing:[['land',.8,1.3]],
   whoosh:[['whoosh',.6]],wind:[['whoosh',.5,.7]],roar:[['roar',.8]],growl:[['roar',.7,.8]],bite:[['punch',.9,1.1]],
   wail:[['wail',.7]],screech:[['wail',.6,1.3]],buzz:[['dark',.4,1.4]],gong:[['boom',.6,.7]],coin:[['click',.6]],
   die:[['die',.8]],limit:[['limit',.8]],victory:[['victory',.8]],levelup:[['levelup',.8]],defeat:[['defeat',.8]],click:[['click',.5]],miss:[['miss',.7]]};
 const last={};
 for(const name in MAPS){const old=SFX[name];SFX[name]=()=>{try{const n=performance.now();if((name==='whoosh'&&n-(last[name]||0)<70)||(name==='wind'&&n-(last[name]||0)<400))return;last[name]=n;
   const o=MAPS[name][Math.floor(Math.random()*MAPS[name].length)];if(playSample('r8_'+o[0],o[1],o[2]?o[2]*(.96+Math.random()*.08):undefined))return;}catch(e){}if(old)try{old();}catch(e){}};}
 // ha a minták már be vannak töltve (régi munkamenet), az új r8-at is betöltjük
 if(typeof SND==='object'&&SND.samplesLoading&&SND.ctx){for(const k in N){const key='r8_'+k;if(SAMPLE_BUF[key])continue;SAMPLE_BUF[key]=[];for(const f of SAMPLE_FILES[key])fetch(f).then(r=>r.arrayBuffer()).then(ab=>new Promise((a,b)=>SND.ctx.decodeAudioData(ab,a,b))).then(b=>SAMPLE_BUF[key].push(b)).catch(()=>{});}}
}
if(typeof TRACK_FILE==='object'){let i=0;for(const k in TRACK_FILE)TRACK_FILE[k]=(i++%2)?'r8-csata2':'r8-csata1';Object.assign(TRACK_FILE,{battle:'r8-csata1',boss:'r8-foellenseg',title:'r8-terkep'});}
