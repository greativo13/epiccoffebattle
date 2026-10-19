
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
  g.fillStyle='#3d2e33';g.fillRect(0,0,N,N);
  // fodrok (dűne-hullámok)
  for(let i=0;i<18;i++){g.strokeStyle=`rgba(${i%2?'128,100,98':'22,14,24'},.6)`;g.lineWidth=rnd(2,6);g.beginPath();const y0=rnd(0,N);
    for(let x=-10;x<=N+10;x+=8)g.lineTo(x,y0+Math.sin(x/N*Math.PI*2*2+i)*8);g.stroke();}
  // szemcsék
  const cols=['92,70,70','120,94,90','150,122,112','58,42,48','34,24,32','178,148,132','170,130,200'];
  for(let i=0;i<14000;i++){const col=cols[(Math.random()*cols.length)|0],a=col==='170,130,200'?.5:rnd(.5,1);g.fillStyle=`rgba(${col},${a})`;
    const s=Math.random()<.85?1:2;g.fillRect(Math.random()*N,Math.random()*N,s,s);}
  R21_SAND={c,pat:null};return R21_SAND;
}
function r21PatMove(p,x,y){try{if(p&&p.setTransform&&typeof DOMMatrix==='function')p.setTransform(new DOMMatrix([1,0,0,1,x,y]));}catch(e){}}
function r21SandPat(){const T0=r21SandTex();if(!T0.pat)T0.pat=ctx.createPattern(T0.c,'repeat');return T0.pat;}

// a jelenet állapota (egyszerre egy futóhomok fut)
let R21QS=null;
// homokszemcsék (saját, gravitációval)
function r21QsGrain(x,y,vx,vy,size){if(!R21QS)return;R21QS.grains.push({x,y,vx,vy,life:rnd(.5,1),max:1,s:size||rnd(2,4.5),c:pick(['92,70,70','130,104,98','58,42,48','178,148,132','140,100,190'])});}

// a nagy homokmező: a lavina sávja Morgánától az ellenségekig + a nagy futóhomok-ellipszis az ellenségek alatt
function r21QsField(){
  const Q=R21QS;if(!Q||Q.a<=0)return;
  const pat=r21SandPat(),gY=x=>Q.y0+(Q.y1-Q.y0)*Math.max(0,Math.min(1,(x-Q.x0)/Math.max(1,Q.x1-Q.x0)));
  ctx.save();ctx.globalAlpha=Q.a;
  // 1) a lavina sávja (a már végiggördült rész vékony homokréteg marad a talajon)
  if(Q.front>Q.x0+4){
    const xe=Math.min(Q.front,Q.fx1);ctx.beginPath();
    for(let x=Q.x0;x<=xe;x+=10){const k=(x-Q.x0)/Math.max(1,Q.fx1-Q.x0),h=(22+34*k)*Q.band;ctx.lineTo(x,gY(x)-h*.55+Math.sin(x*.05+Q.t*3)*2);}
    for(let x=xe;x>=Q.x0;x-=10){const k=(x-Q.x0)/Math.max(1,Q.fx1-Q.x0),h=(22+34*k)*Q.band;ctx.lineTo(x,gY(x)+h*.45);}
    ctx.closePath();r21PatMove(pat,Q.t*120,0);ctx.fillStyle=pat;ctx.fill();r21PatMove(pat,0,0);
    ctx.strokeStyle='rgba(20,10,26,.7)';ctx.lineWidth=2;ctx.stroke();
  }
  // 2) a nagy futóhomok-mező
  if(Q.r>0){
    const R=Q.RX*Q.r,RY=Q.RY*Q.r;
    ctx.save();ctx.beginPath();ctx.ellipse(Q.cx,Q.cy,R,RY,0,0,6.29);ctx.clip();
    ctx.save();ctx.translate(Q.cx,Q.cy);ctx.rotate(Q.t*.15);ctx.fillStyle=pat;ctx.fillRect(-R*1.5,-R*1.5,R*3,R*3);ctx.restore();
    // a szélén világosabb, középen mélyebb, sötétebb (süpped)
    const g=ctx.createRadialGradient(Q.cx,Q.cy,4,Q.cx,Q.cy,R);g.addColorStop(0,'rgba(8,2,14,.55)');g.addColorStop(.7,'rgba(8,2,14,.15)');g.addColorStop(1,'rgba(160,120,130,.18)');
    ctx.save();ctx.translate(Q.cx,Q.cy);ctx.scale(1,RY/R);ctx.translate(-Q.cx,-Q.cy);ctx.fillStyle=g;ctx.fillRect(Q.cx-R,Q.cy-R,R*2,R*2);ctx.restore();
    // minden ellenség alatt örvény: forgó homokspirálok és tölcsér
    for(const E of Q.list){const x=cx(E.t),y=E.gy,r=E.vr*Q.r;
      ctx.save();ctx.translate(x,y);ctx.scale(1,.3);
      const fg=ctx.createRadialGradient(0,0,2,0,0,r);fg.addColorStop(0,'rgba(4,0,8,.92)');fg.addColorStop(.5,'rgba(25,10,32,.55)');fg.addColorStop(1,'rgba(25,10,32,0)');ctx.fillStyle=fg;ctx.beginPath();ctx.arc(0,0,r,0,6.29);ctx.fill();
      ctx.lineCap='round';
      for(let i=0;i<9;i++){const ph=Q.t*(2.2+i*.15)+i*.7,rr=r*(.18+.09*i);ctx.strokeStyle=`rgba(${i%3===0?'150,120,118':i%3===1?'98,74,80':'20,10,24'},.8)`;ctx.lineWidth=Math.max(2,r*.04);
        ctx.beginPath();ctx.arc(0,0,Math.min(rr,r*.95),ph,ph+1.7);ctx.stroke();}
      ctx.restore();}
    ctx.restore();
    // perem: felgyűrt homokpárkány
    ctx.save();ctx.strokeStyle='rgba(130,100,104,.65)';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(Q.cx,Q.cy,R,RY,0,Math.PI*.05,Math.PI*.95);ctx.stroke();
    ctx.strokeStyle='rgba(20,10,26,.6)';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(Q.cx,Q.cy+3,R,RY,0,Math.PI*.05,Math.PI*.95);ctx.stroke();ctx.restore();
  }
  // 3) a lavina eleje: hömpölygő homokhullám
  if(Q.front>Q.x0&&Q.wave>0){
    const fx=Q.front,gy=gY(fx),Hh=(60+70*Math.min(1,(fx-Q.x0)/Math.max(1,Q.fx1-Q.x0)))*Q.wave;
    ctx.save();ctx.beginPath();
    for(let i=0;i<9;i++){const bx=fx-i*Hh*.32,by=gy-Hh*(.55-.05*i)*(1-i/10),br=Hh*(.55-.04*i)+Math.sin(Q.t*14+i)*3;ctx.moveTo(bx+br,by);ctx.arc(bx,by,br,0,6.29);}
    ctx.rect(Q.x0,gy-4,Math.max(0,fx-Q.x0-Hh*.2),12);
    r21PatMove(pat,Q.t*260,-Q.t*40);ctx.fillStyle=pat;ctx.fill();r21PatMove(pat,0,0);
    ctx.strokeStyle='rgba(16,8,20,.55)';ctx.lineWidth=2.5;ctx.stroke();
    ctx.save();ctx.strokeStyle='rgba(200,170,150,.55)';ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<6;i++){const bx=fx-i*Hh*.32,by=gy-Hh*(.55-.05*i)*(1-i/10),br=Hh*(.55-.04*i);ctx.beginPath();ctx.arc(bx,by,br*.92,-2.4,-.5);ctx.stroke();}ctx.restore();
    // a hullám teteje világosabb (fény)
    ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(120,80,150,.12)';ctx.fill();ctx.restore();
  }
  // 4) szemcsék
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
  if(E.sink>2){const pat=r21SandPat(),r=Math.max(e.w*e.scale*.6,50);ctx.save();ctx.globalAlpha=Q.a;ctx.beginPath();ctx.ellipse(cx(e),E.gy+2,r,r*.22,0,0,Math.PI);
    for(let i=0;i<7;i++){const bx=cx(e)-r+i*r/3,by=E.gy-2,br=r*.16+Math.sin(Q.t*9+i)*2;ctx.moveTo(bx+br,by);ctx.arc(bx,by,br,0,6.29);}
    ctx.fillStyle=pat;ctx.fill();ctx.strokeStyle='rgba(16,8,20,.5)';ctx.lineWidth=2;ctx.stroke();ctx.restore();}
  r21QsArms(E,Q);
};}

A.quicksand=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;
  const rel=typeof keepPose==='function'?keepPose(u):()=>{};
  try{
  await dimTo(.45,'8,0,18',300);
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

  // 1) Morgána leguggol (előredől), a kezében sötét erő gyűlik
  u.pose='attack';sfx('dark');
  await tween(380,k=>{const e=easeIO(k);u.sq=1-.26*e;u.lean=.12*e;});
  {const hp=handPos(u);for(let i=0;i<14;i++)part({x:hp.x+rnd(-30,30),y:hp.y+rnd(-30,30),vx:rnd(-40,40),vy:rnd(-40,40),life:.5,size:rnd(3,6),rgb:'150,80,230',add:true});}
  await wait(120);
  // 2) a földbe csap
  u.pose='attack';await tween(120,k=>{u.sq=.74-.06*k;u.lean=.12+.1*k;});
  sfx('punch');sfx('earthm');shake(16);hitStop(80);flash('80,40,110',.3,.1);
  for(let i=0;i<40;i++)r21QsGrain(ux+rnd(-20,30),uy-rnd(0,6),rnd(-160,320),-rnd(180,520),rnd(2.5,5));
  for(let i=0;i<40;i++)r21QsGrain(ux+rnd(-40,40),uy-rnd(0,4),rnd(-120,260),-rnd(60,200),rnd(2,4));
  // 3) a homoklavina végiggördül a talajon az ellenségekig
  sfx('quake');rumble&&rumble(1.2,7);
  const dist=Q.fx1-Q.x0;
  await tween(Math.max(650,dist*1.25),k=>{const e=easeIO(k);Q.front=Q.x0+dist*e;Q.band=Math.min(1,k*3);Q.wave=Math.min(1,k*4);
    const gy=Q.y0+(Q.y1-Q.y0)*Math.max(0,Math.min(1,(Q.front-Q.x0)/Math.max(1,Q.x1-Q.x0)));
    for(let i=0;i<9;i++)r21QsGrain(Q.front+rnd(-30,30),gy-rnd(20,110),rnd(40,340),-rnd(120,460),rnd(2,5.5));
    if(Q.front>Q.x1-40)Q.r=Math.max(Q.r,Math.min(1,(Q.front-(Q.x1-40))/Math.max(1,Q.fx1-Q.x1+40)));
    if(Math.random()<.25)shake(4);});
  // 4) a hullám szétterül: EGY nagy futóhomok-mező mindenki alatt
  sfx('earthm');shake(12);
  await tween(420,k=>{Q.r=Math.max(Q.r,eOutBack(k));Q.wave=1-k;});Q.wave=0;
  popLabel(al[0],'SÖTÉT FUTÓHOMOK!','#c890ff');
  // Morgána közben felegyenesedik
  tween(360,k=>{const e=easeIO(k);u.sq=.68+.32*e;u.lean=.22*(1-e);});
  // 5) süllyednek, remegnek
  await tween(380,k=>{for(const E of Q.list){E.sink=E.H*.1*k;E.t.hurt=.15;}});
  // 6) a homokból lidérckarok nőnek ki – minden ellenségnél
  sfx('growl');
  await Promise.all(Q.list.map((E,i)=>wait(i*110).then(()=>{for(let n=0;n<16;n++)r21QsGrain(cx(E.t)+rnd(-60,60),E.gy,rnd(-160,160),-rnd(200,420),rnd(2,4));return tween(460,k=>{E.k=eOutBack(k);});})));
  // 7) megragadják
  sfx('whoosh');await tween(200,k=>{for(const E of Q.list)E.grip=k*k;});sfx('bite');shake(12);flash('120,40,180',.22,.1);
  // 8) LEHÚZZÁK: mélyre rántják őket a homokba
  sfx('earthm');rumble&&rumble(1.4,10);
  await tween(480,k=>{const kk=k*k;for(const E of Q.list){E.sink=E.H*(.1+.5*kk);E.t.hurt=.3;
    for(let n=0;n<3;n++)r21QsGrain(cx(E.t)+rnd(-E.vr*.5,E.vr*.5),E.gy,rnd(-200,200),-rnd(200,480),rnd(2.5,5));}});
  shake(18);hitStop(90);flash('60,0,90',.3,.12);
  for(const E of Q.list){const t=E.t;sparks(cx(t),E.gy-10,['170,90,255','255,255,255'],14,400);
    for(let n=0;n<30;n++)r21QsGrain(cx(t)+rnd(-40,40),E.gy-rnd(0,10),rnd(-280,280),-rnd(260,560),rnd(3,6));
    if(t.alive){S._r21noSink=true;try{hit(u,t,sk);}finally{S._r21noSink=false;}}}
  // vergődnek
  await tween(560,k=>{for(const E of Q.list){E.sink=E.H*(.6+.04*Math.sin(k*30));E.t.hurt=.2;}});
  // 9) a karok elengedik, visszasüllyednek, a homok kiköpi őket
  sfx('whoosh');
  await tween(380,k=>{for(const E of Q.list){E.grip=1-k;E.k=1-k;}});
  for(const E of Q.list)for(let n=0;n<20;n++)r21QsGrain(cx(E.t)+rnd(-40,40),E.gy,rnd(-220,220),-rnd(240,480),rnd(2.5,5));
  await tween(360,k=>{for(const E of Q.list)E.sink=E.H*.6*(1-eOutBack(k));});
  for(const E of Q.list)E.sink=0;
  // 10) a homok visszahúzódik
  await tween(420,k=>{Q.r=1-k*k;Q.band=1-k;Q.a=1-k;});
  S0.on=false;R21QS=null;
  await dimTo(0,null,300);
  }finally{R21QS=null;rel();u.pose='idle';u.sq=1;u.lean=0;}
};

// a futóhomok saját maga süllyeszt: ne nyíljon utána még egy kráter is (r21Sink)
{const sk0=r21Sink;r21Sink=function(){if(S._r21noSink)return;return sk0.apply(this,arguments);};}
