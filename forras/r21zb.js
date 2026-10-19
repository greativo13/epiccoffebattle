
// ===== 40. kör: Morgána – Sötét futóhomok =====
// Minden ellenség alatt sötét, örvénylő futóhomok nyílik; a homokból lidérckarok (festett fx7-wraitharm) nyúlnak fel,
// megragadják az ellenfelet a derekánál, és mélyen lehúzzák a homokba. Utána kiköpi őket.
// Funkció: sötét sebzés mindenkire + 35% eséllyel 1 körre beragad (kimarad a köre).
SK.quicksand={name:'Sötét futóhomok',mp:30,cd:2,tgt:'enemies',kind:'mag',pow:1.9,elem:'dark',anim:'quicksand',status:['stun',.35,1],
  desc:'Sötét futóhomok nyílik minden ellenség alatt: lidérckarok lehúzzák őket. 35% eséllyel 1 körre beragadnak.'};
SHOP_SKILLS.witch.push(['quicksand','4-2',1900]);

// a futóhomok-állapot az ellenfélen: { a: átlátszóság, r: tócsa mérete, sink: süllyedés px, k: karok kinövése, grip: szorítás, sp: örvény }
function r21QsPool(e,Q,front){
  const x=cx(e),gy=Q.gy,R=Q.R*Q.r;if(R<2)return;
  ctx.save();ctx.translate(x,gy);ctx.scale(1,.3);
  if(!front){
    const g=ctx.createRadialGradient(0,0,4,0,0,R);
    g.addColorStop(0,`rgba(4,0,10,${.98*Q.a})`);g.addColorStop(.45,`rgba(22,6,38,${.95*Q.a})`);g.addColorStop(.8,`rgba(70,26,110,${.75*Q.a})`);g.addColorStop(1,'rgba(70,26,110,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
    // örvénylő homokcsíkok (spirál)
    ctx.lineCap='round';
    for(let i=0;i<7;i++){const ph=Q.sp+i*0.9,rr=R*(.25+.1*i);ctx.strokeStyle=`rgba(${i%2?'150,95,200':'95,55,140'},${.55*Q.a})`;ctx.lineWidth=Math.max(2,R*.035);
      ctx.beginPath();ctx.arc(0,0,Math.min(rr,R*.95),ph,ph+1.5+.2*i);ctx.stroke();}
    // csillogó homokszemek
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(190,120,255,${.55*Q.a})`;ctx.lineWidth=Math.max(4,R*.05);ctx.beginPath();ctx.arc(0,0,R*.82,0,6.29);ctx.stroke();ctx.restore();
    for(let i=0;i<30;i++){const an=Q.sp*(1.4+i*.05)+i*2.4,rr=R*((i*37%100)/100)*.9;ctx.fillStyle=`rgba(210,170,255,${.6*Q.a})`;ctx.beginPath();ctx.arc(Math.cos(an)*rr,Math.sin(an)*rr,3.2,0,6.29);ctx.fill();}
  }else{
    // a tócsa elülső pereme: a besüllyedt test alját eltakarja
    ctx.beginPath();ctx.ellipse(0,0,R,R,0,0,Math.PI);ctx.lineTo(-R,0);ctx.closePath();
    const g2=ctx.createLinearGradient(0,0,0,R);g2.addColorStop(0,`rgba(30,8,50,${.9*Q.a})`);g2.addColorStop(1,'rgba(30,8,50,0)');ctx.fillStyle=g2;ctx.fill();
    ctx.strokeStyle=`rgba(160,100,220,${.5*Q.a})`;ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,0,R*.97,R*.97,0,0,Math.PI);ctx.stroke();
  }
  ctx.restore();
}
function r21QsArms(e,Q){
  if(Q.k<=0||typeof r21Arm!=='function')return;
  const x=cx(e),gy=Q.gy,H=Q.H,tw=e.w*e.scale,L=Q.L,off=Math.max(tw*.42,26);
  ctx.save();ctx.beginPath();ctx.rect(-50,-50,W+100,gy+4+50);ctx.clip();
  const sides=tw>140?[1,-1,.25]:[1,-1];
  for(const side of sides){
    const th=.3*(.45+.55*Q.grip)*side,hx=x-side*off,hy=gy+Q.sink-H*(Math.abs(side)<1?.62:.45),
      bx=hx-Math.sin(th)*L*.86,by=hy+Math.cos(th)*L*.86+L*.95*(1-Q.k);
    r21Arm(bx,by,Math.abs(side)<1?L*1.1:L,th,side<0,Q.a,Q.grip);
  }
  ctx.restore();
}
{const de=drawEntity;drawEntity=function(e){
  const Q=e&&e._qs;if(!Q||Q.a<=0)return de.apply(this,arguments);
  r21QsPool(e,Q,false);
  const oy0=e.oy,lift0=e.lift;
  // a repülőket is lehúzza a homokba
  if(Q.sink>0&&e.lift)e.lift=e.lift*(1-Math.min(1,Q.sink/(Q.H*.2)));
  e.oy=oy0+Q.sink;
  ctx.save();ctx.beginPath();ctx.rect(-50,-200,W+100,Q.gy+2+200);ctx.clip();
  try{de.apply(this,arguments);}finally{ctx.restore();e.oy=oy0;e.lift=lift0;}
  r21QsPool(e,Q,true);
  r21QsArms(e,Q);
};}

A.quicksand=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;
  await dimTo(.55,'8,0,18',320);await castPose(u,'120,40,180',420);sfx('dark');
  const Qs=al.map(t=>{const H=t.h*t.scale;return {t,Q:t._qs={a:0,r:0,sink:0,k:0,grip:0,sp:0,gy:t.y+t.oy+6,H,R:Math.max(t.w*t.scale*1.05,130),L:Math.max(230,H*1.2)}};});
  const S0={on:true};
  // örvény forgása és homokpor
  R18E({update(){for(const {t,Q} of Qs){Q.sp+=.06;if(Q.a>.3&&Math.random()<.55){const an=rnd(0,6.29),rr=Q.R*Q.r*rnd(.3,1);
      part({x:cx(t)+Math.cos(an)*rr,y:Q.gy+Math.sin(an)*rr*.3,vx:-Math.sin(an)*90,vy:-rnd(20,80),life:rnd(.5,1),size:rnd(2,4),rgb:pick(['150,95,200','90,50,130','210,170,255']),add:false});}}return S0.on;},draw(){}});
  // 1) a futóhomok kinyílik minden ellenség alatt
  sfx('quake');rumble&&rumble(1,6);
  await tween(520,k=>{for(const {Q} of Qs){Q.a=Math.min(1,k*1.6);Q.r=eOutBack(k);}});
  popLabel(al[0],'SÖTÉT FUTÓHOMOK!','#c890ff');
  // 2) már süllyednek is egy kicsit, remegnek
  await tween(380,k=>{for(const {t,Q} of Qs){Q.sink=Q.H*.1*k;t.hurt=.15;}});
  // 3) a homokból lidérckarok nőnek ki (egymás után)
  sfx('growl');
  await Promise.all(Qs.map(({Q},i)=>wait(i*110).then(()=>tween(460,k=>{Q.k=eOutBack(k);}))));
  // 4) megragadják
  sfx('whoosh');await tween(200,k=>{for(const {Q} of Qs)Q.grip=k*k;});sfx('bite');shake(12);flash('120,40,180',.25,.1);
  // 5) LEHÚZZÁK: mélyre rántják őket a homokba
  sfx('earthm');rumble&&rumble(1.4,10);
  await tween(480,k=>{const kk=k*k;for(const {t,Q} of Qs){Q.sink=Q.H*(.1+.5*kk);t.hurt=.3;
    if(Math.random()<.7)part({x:cx(t)+rnd(-Q.R*.6,Q.R*.6),y:Q.gy,vx:rnd(-160,160),vy:-rnd(160,380),life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['60,25,95','120,70,170','25,8,40']),add:false});}});
  shake(18);hitStop(90);flash('60,0,90',.35,.12);
  for(const {t,Q} of Qs){sparks(cx(t),Q.gy-10,['170,90,255','255,255,255'],16,420);
    for(let n=0;n<14;n++)part({x:cx(t)+rnd(-40,40),y:Q.gy,vx:rnd(-260,260),vy:-rnd(200,460),life:rnd(.5,.9),size:rnd(4,9),rgb:pick(['40,12,70','90,35,140','150,90,210']),add:false});
    if(t.alive){S._r21noSink=true;try{hit(u,t,sk);}finally{S._r21noSink=false;}}}
  await tween(560,k=>{for(const {t,Q} of Qs){Q.sink=Q.H*(.6+.04*Math.sin(k*30));t.hurt=.2;}});
  // 6) a karok elengedik és visszasüllyednek, a homok kiköpi az ellenfeleket
  sfx('whoosh');
  await tween(380,k=>{for(const {Q} of Qs){Q.grip=1-k;Q.k=1-k;}});
  await tween(360,k=>{for(const {Q} of Qs){Q.sink=Q.H*.6*(1-eOutBack(k));Q.a=1-k*.6;}});
  for(const {Q} of Qs)Q.sink=0;
  await tween(260,k=>{for(const {Q} of Qs){Q.r=1-k;Q.a=.4*(1-k);}});
  S0.on=false;for(const {t} of Qs)delete t._qs;
  u.pose='idle';await dimTo(0,null,320);
};

// a futóhomok saját maga süllyeszt: ne nyíljon utána még egy kráter is (r21Sink)
{const sk0=r21Sink;r21Sink=function(){if(S._r21noSink)return;return sk0.apply(this,arguments);};}
