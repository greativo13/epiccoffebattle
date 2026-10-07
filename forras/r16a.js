// ===== 17. kör: a 16. kör tesztlapjának javításai =====
const R16_EFF=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

// ---- Fekete-lila lángnyelvek (Cerberus, Sötét alku): festett, kunkorodó lángcsúcsok – fekete-ibolya szél, lila test, halványlila mag, világos perem. Nem gömbök
function r16Tongue(h,w,curl,ph){const n=16,L=[],R=[];for(let i=0;i<=n;i++){const q=i/n,wid=w*.5*Math.pow(1-q,.6)*(1+.22*Math.sin(q*11+T*16+ph)),
    c=curl*Math.sin(q*Math.PI*1.35+ph*.3)*q*1.2+w*.5*Math.sin(T*9+ph+q*4)*q*q;L.push([c-wid,-h*q]);R.push([c+wid*.8,-h*q]);}
  ctx.beginPath();ctx.moveTo(L[0][0],L[0][1]);for(let i=1;i<=n;i++){const p=L[i],o=L[i-1];ctx.quadraticCurveTo(o[0],o[1],(o[0]+p[0])/2,(o[1]+p[1])/2);}
  // kunkorodó csúcs
  const tp=L[n];ctx.quadraticCurveTo(tp[0]+curl*.35,tp[1]-h*.12,tp[0]+curl*.15,tp[1]+h*.02);
  for(let i=n;i>=1;i--){const p=R[i],o=R[i-1];ctx.quadraticCurveTo(p[0],p[1],(o[0]+p[0])/2,(o[1]+p[1])/2);}ctx.quadraticCurveTo(0,h*.12,L[0][0],L[0][1]);ctx.closePath();}
darkFlame=function(o){const f={x:o.x,y:o.y,vx:o.vx||0,vy:o.vy||-80,t:0,life:(o.life||.6)*1.1,s:(o.size||20),ph:rnd(0,6),dr:o.drag||0,
    tg:[0,1,2].slice(0,1+Math.floor(Math.random()*3)).map(i=>({dx:rnd(-.35,.35),h:rnd(.55,1.15),w:rnd(.55,.95),c:rnd(-1,1),ph:rnd(0,6)}))};
  R16_EFF({update(dt){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;const d=f.dr?Math.exp(-f.dr*dt):.96;f.vx*=d;f.vy=f.vy*d-40*dt;return f.t<f.life;},
    draw(){const k=f.t/f.life,g=k<.15?k/.15:1,sh=1-Math.max(0,(k-.5)/.5),sp=Math.hypot(f.vx,f.vy),an=sp>260?Math.atan2(f.vy,f.vx)+Math.PI/2:0;
      ctx.save();ctx.translate(f.x,f.y);ctx.rotate(an);
      ctx.save();ctx.globalCompositeOperation='lighter';glow(0,-f.s*.8,f.s*1.4,'140,50,230',.28*sh*g);ctx.restore();
      for(const tg of f.tg){const h=f.s*3.4*tg.h*g*(.5+.5*sh)*(1+.12*Math.sin(T*18+tg.ph)),w=f.s*1.9*tg.w,curl=(tg.c>0?1:-1)*(1+Math.abs(tg.c))*w*.9;if(h<3)continue;
        ctx.save();ctx.translate(tg.dx*f.s,0);ctx.globalAlpha=Math.min(1,sh*1.3)*.92;
        r16Tongue(h,w,curl,tg.ph);const g0=ctx.createLinearGradient(0,0,0,-h);g0.addColorStop(0,'rgba(20,4,34,.95)');g0.addColorStop(.55,'rgba(46,10,80,.9)');g0.addColorStop(1,'rgba(30,6,50,0)');ctx.fillStyle=g0;ctx.fill();
        ctx.globalCompositeOperation='lighter';ctx.save();ctx.scale(.66,.78);r16Tongue(h,w,curl*.8,tg.ph+1);const g1=ctx.createLinearGradient(0,0,0,-h);g1.addColorStop(0,'rgba(170,80,255,.9)');g1.addColorStop(.6,'rgba(110,30,200,.6)');g1.addColorStop(1,'rgba(90,20,170,0)');ctx.fillStyle=g1;ctx.fill();ctx.restore();
        ctx.save();ctx.scale(.3,.45);r16Tongue(h,w,curl*.5,tg.ph+2);ctx.fillStyle='rgba(235,200,255,.75)';ctx.fill();ctx.restore();
        ctx.restore();}
      ctx.restore();}});};
// a Cerberus körüli lobogás ritkább legyen (ne legyen tömör folt): a régi effektek ugyanígy hívják, ezért itt csak a gyakoriságot fogjuk vissza
{const df=darkFlame;let last=0;darkFlame=function(o){const now=performance.now();if(o&&o.shape==='dsmoke'&&Math.hypot(o.vx||0,o.vy||0)<260&&now-last<160)return;if(o&&o.shape==='dsmoke')last=now;return df(o);};}

// ---- Rémült Vén Tölgy – Ágcsapás: hosszabbra és nagyobbra nyúlik a karja, és gyorsabban csap le
A.branchSwing=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T0=limbOn(u,'oak');if(!T0){hit(u,t,sk);return;}const a=T0.arm;a.blur=true;
  const aim=limbAim(u,'oak','arm',.04,.48,cx(t)+30,midY(t)-10),sx=Math.max(1.2,Math.min(3.4,aim.sx*1.08));a.ax=aim.ax;sfx('wind');
  await tween(650,k=>{const e=easeIO(k);a.rot=(aim.rot+1.6)*e;a.s=1+.5*e;u.lean=.18*e;u.sq=1+.07*e;});await wait(110);
  for(let i=0;i<8;i++)part({x:cx(u)+rnd(-60,60),y:topY(u)+rnd(0,60),vx:rnd(-80,80),vy:rnd(-40,40),g:300,life:1,size:rnd(6,9),rgb:pick(['80,150,40','150,190,60']),add:false,shape:'leaf'});
  sfx('whoosh');await tween(170,k=>{const e=k*k;a.rot=aim.rot+1.6-1.6*e;a.sx=1+(sx-1)*Math.min(1,k*1.5);u.lean=.14-.36*e;u.sq=1.07-.12*Math.sin(k*Math.PI);});
  const P=limbPt(u,'arm',.04,.48);sfx('rock');sfx('hit');hitStop(130);shake(20);flash('255,230,180',.22,.1);punch(cx(t),midY(t),.05);
  fallDebris(P.x,P.y,12,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#6b4a2a';ctx.strokeStyle='#2a1a0e';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-9*s,-3*s);ctx.lineTo(8*s,-5*s);ctx.lineTo(10*s,2*s);ctx.lineTo(-7*s,4*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:360});
  for(let i=0;i<18;i++)part({x:P.x,y:P.y,vx:rnd(-260,260),vy:rnd(-280,-40),g:500,life:rnd(.7,1.1),size:rnd(5,8),rgb:pick(['80,150,40','150,190,60','200,170,60']),add:false,shape:'leaf'});
  sparks(cx(t),midY(t),['255,240,200','210,190,140'],24,440);soundBlast(cx(t),midY(t),'210,190,140',180,380);toss(t,46,360);t.hurt=.4;hit(u,t,sk);
  await wait(400);await tween(450,k=>{const e=easeIO(k);a.rot=aim.rot*(1-e);a.sx=sx+(1-sx)*e;a.s=1.5-.5*e;u.lean=-.22*(1-e);u.sq=1;});a.blur=false;limbOff(u);u.lean=0;}finally{rel();}};

// ---- Espresszó – Lecsapás (régi neve Farokcsapás): forgatás nélkül nagyot ugrik, odapattan a hős mellé, és teljes súlyával rázuhan
if(ESK.tailswipe)ESK.tailswipe.name='Lecsapás';
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const W0=u.w*u.scale,dx=(cx(t)+W0*.56)-cx(u),dy=(t.y+4)-u.y;
  await tween(280,k=>{u.sq=1-.14*easeIO(k);u.lean=.08*k;});sfx('wind');ghosts(u,700);puffs(cx(u),u.y+u.oy,8,['190,170,140','160,140,120'],[22,36],{w:110,up:60});
  // nagy ív: felpattan, a csúcson egy pillanatra lebeg
  await tween(520,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI*.5)*230;u.sq=1.1-.1*k;u.lean=.08-.2*k;});
  await wait(90);sfx('whoosh');
  // rázuhan
  await tween(150,k=>{u.jump=230*(1-k*k);u.lean=-.12+.24*k;u.sq=1+.06*k;});u.jump=0;
  const x=cx(t),y=midY(t),gy=t.y+t.oy;sfx('rock');sfx('boom');hitStop(160);shake(26);rumble(.6,10);flash('255,220,170',.32,.14);punch(x,y,.06);
  groundCrack(cx(u),gy+4,'200,170,120',260);dustWave(cx(u),gy);puffs(cx(u),gy-6,14,['190,170,140','160,140,120'],[26,46],{w:200,up:90});
  sparks(x,y,['255,230,170','255,255,255','220,180,120'],36,560);soundBlast(x,y,'255,220,160',220,440);toss(t,80,480);t.hurt=.5;hit(u,t,sk);
  await tween(180,k=>{u.sq=1.06-.18*Math.sin(k*Math.PI);});u.sq=1;u.lean=0;await wait(260);
  ghosts(u,420);await tween(420,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*110;});u.ox=0;u.oy=0;u.jump=0;}finally{rel();u.spin=0;u.lean=0;u.sq=1;}};

// ---- Az üst kikerül a történetből (párbeszédek, befejezés), és a 3-4 csatatérről is
{const TX=[
  ['És az üstömet is elvitte. Egy üst magától nem sétál el, Lili.','Aki egy egész Kannát elvisz, az nagyon fáradt lehet. Vagy nagyon gonosz.'],
  ['A széke felborítva. És az üstöm is eltűnt. Egy üst magától nem sétál el, Zordon.','A széke felborítva. Aki egy egész Kannát elvisz, az nagyon fáradt lehet, Zordon.'],
  ['Karikás szem, lopott kávé és az üstöm. Megvan a gyanúsított.','Karikás szem és lopott kávé. Megvan a gyanúsított.'],
  ['Érzem az üstöm szagát. És egy nagyon nagy állatét.','Pörkölt kávé szagát érzem. És egy nagyon nagy állatét.'],
  ['Az ott az ÉN üstöm a sárkány alatt!','Ez a sárkány a mi lopott kávénkat pörköli!'],
  ['Megvan az üstöm! Egy kicsit kormos, de megvan.','A kávébab megvan! Egy kicsit kormos, de megvan.'],
  [', Morgána az üstjét,',', Morgána végre kialudja magát,'],
  ['Zordon megkapta a feketéjét, Morgána az üstjét, Grog a sütijét,','Zordon megkapta a feketéjét, Morgána végre kialudta magát, Grog a sütijét,'],
  ['Még három üst, és','Még három kanna, és'],['épp az utolsó üstöt főzi','épp az utolsó kanna teát főzi'],['Kiöntöm az egész üstöt.','Kiöntöm az egész kannát.']];
  const fix=s=>{if(typeof s!=='string'||s.indexOf('üst')<0)return s;for(const [a,b] of TX)s=s.split(a).join(b);return s;};
  const walk=(o,d)=>{if(!o||d>6)return;if(Array.isArray(o)){o.forEach((v,i)=>{if(typeof v==='string')o[i]=fix(v);else walk(v,d+1);});return;}if(typeof o==='object')for(const k in o){if(typeof o[k]==='string')o[k]=fix(o[k]);else if(k!=='battles')walk(o[k],d+1);}};
  try{walk(INTRO,0);walk(ZONES,0);}catch(e){}
  const ovF=overlay;overlay=function(parts,btns){try{walk(parts,0);}catch(e){}return ovF.apply(this,arguments);};
  qCauldron=function(){};}

// ---- Vázagólem – Mázpáncél: a hősök stílusában (vastag fekete kontúr, telt, árnyékolt, fényes térhatású porcelán), sok kisebb darabból áll össze, lyuk nélkül
let R16_VW=null;function r16VaseShield(){if(R16_VW)return R16_VW;const W1=230,H1=330,PAD=14,c=document.createElement('canvas');c.width=W1+PAD*2;c.height=H1+PAD*2;const g=c.getContext('2d');g.translate(PAD,PAD);
  const path=()=>{g.beginPath();g.moveTo(W1/2,6);g.bezierCurveTo(W1*.96,10,W1-4,66,W1-6,130);g.bezierCurveTo(W1-10,228,W1*.72,284,W1/2,H1-6);g.bezierCurveTo(W1*.28,284,10,228,6,130);g.bezierCurveTo(4,66,W1*.04,10,W1/2,6);g.closePath();};
  g.save();g.translate(6,8);path();g.fillStyle='rgba(0,0,0,.35)';g.fill();g.restore();
  path();let q=g.createRadialGradient(W1*.32,H1*.26,10,W1*.5,H1*.5,H1*.68);q.addColorStop(0,'#ffffff');q.addColorStop(.45,'#f2f5fc');q.addColorStop(.8,'#c9d3e8');q.addColorStop(1,'#93a2c4');g.fillStyle=q;g.fill();
  g.save();path();g.clip();
  const band=(y,h)=>{const bg=g.createLinearGradient(0,y,0,y+h);bg.addColorStop(0,'#2a62d0');bg.addColorStop(1,'#163c94');g.fillStyle=bg;g.fillRect(0,y,W1,h);g.strokeStyle='#eaf0ff';g.lineWidth=2.6;const s=h*.62;for(let x=-4;x<W1;x+=s*1.3){const y0=y+h*.19;g.beginPath();g.moveTo(x,y0+s);g.lineTo(x,y0);g.lineTo(x+s,y0);g.lineTo(x+s,y0+s*.72);g.lineTo(x+s*.3,y0+s*.72);g.lineTo(x+s*.3,y0+s*.3);g.lineTo(x+s*.68,y0+s*.3);g.stroke();}};
  band(30,28);band(H1-66,20);
  g.strokeStyle='#2554bc';g.lineCap='round';const vine=(x,y,r,dir)=>{g.lineWidth=5;g.beginPath();for(let i=0;i<=40;i++){const a=i/40*Math.PI*2.4*dir,rr=r*(1-i/48);const px=x+Math.cos(a)*rr,py=y+Math.sin(a)*rr;i?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();};
  vine(50,118,26,1);vine(184,212,24,-1);vine(58,244,20,-1);vine(178,102,18,1);
  const flower=(x,y,R,n)=>{for(let i=0;i<n;i++){const a=i/n*6.283+.2;g.save();g.translate(x,y);g.rotate(a);const gg=g.createLinearGradient(0,0,R,0);gg.addColorStop(0,'#123a94');gg.addColorStop(1,'#5a8ce8');g.fillStyle=gg;g.strokeStyle='#0b2460';g.lineWidth=1.6;
      g.beginPath();g.moveTo(R*.18,0);g.quadraticCurveTo(R*.55,-R*.34,R,0);g.quadraticCurveTo(R*.55,R*.34,R*.18,0);g.fill();g.stroke();g.strokeStyle='rgba(200,220,255,.9)';g.lineWidth=1.2;g.beginPath();g.moveTo(R*.32,-R*.04);g.lineTo(R*.8,-R*.04);g.stroke();g.restore();}
    g.fillStyle='#fff';g.beginPath();g.arc(x,y,R*.26,0,6.29);g.fill();g.strokeStyle='#1d4fb3';g.lineWidth=R*.08;g.stroke();g.fillStyle='#1d4fb3';g.beginPath();g.arc(x,y,R*.1,0,6.29);g.fill();};
  flower(W1/2,H1*.48,66,10);flower(52,194,30,7);flower(180,148,27,7);flower(156,262,22,6);flower(74,88,20,6);
  // térhatás: fényes csillogás balra fent, árnyék jobbra lent
  let hl=g.createRadialGradient(W1*.3,H1*.22,4,W1*.3,H1*.22,W1*.5);hl.addColorStop(0,'rgba(255,255,255,.75)');hl.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=hl;g.fillRect(0,0,W1,H1);
  let sh=g.createLinearGradient(W1*.4,H1*.4,W1,H1);sh.addColorStop(0,'rgba(20,30,70,0)');sh.addColorStop(1,'rgba(20,30,70,.35)');g.fillStyle=sh;g.fillRect(0,0,W1,H1);
  g.strokeStyle='rgba(255,255,255,.9)';g.lineWidth=7;g.lineCap='round';g.beginPath();g.moveTo(W1*.2,H1*.2);g.quadraticCurveTo(W1*.16,H1*.38,W1*.22,H1*.55);g.stroke();
  g.restore();path();g.lineWidth=8;g.strokeStyle='#121218';g.stroke();g.lineWidth=2.5;g.strokeStyle='rgba(255,255,255,.55)';g.save();g.translate(-2,-2);path();g.stroke();g.restore();
  // apró darabok: szabálytalan rács háromszögei (a varratok a törés vonalai)
  const cols=5,rows=7,pts=[];for(let j=0;j<=rows;j++){pts.push([]);for(let i=0;i<=cols;i++){const ex=i===0||i===cols,ey=j===0||j===rows;pts[j].push([i/cols*W1+(ex?0:rnd(-12,12)),j/rows*H1+(ey?0:rnd(-12,12))]);}}
  const pieces=[];for(let j=0;j<rows;j++)for(let i=0;i<cols;i++){const a=pts[j][i],b=pts[j][i+1],cc=pts[j+1][i+1],d=pts[j+1][i];if((i+j)%2){pieces.push([a,b,cc]);pieces.push([a,cc,d]);}else{pieces.push([a,b,d]);pieces.push([b,cc,d]);}}
  g.save();path();g.clip();g.lineJoin='round';for(const p of pieces){g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.closePath();g.strokeStyle='rgba(20,20,30,.55)';g.lineWidth=1.6;g.stroke();g.strokeStyle='rgba(255,255,255,.45)';g.lineWidth=.8;g.save();g.translate(1,1);g.stroke();g.restore();}g.restore();
  return R16_VW={c,W1,H1,PAD,pieces:pieces.map(p=>({p,cx:(p[0][0]+p[1][0]+p[2][0])/3,cy:(p[0][1]+p[1][1]+p[2][1])/3,d:rnd(0,1)}))};}
drawVaseWall=function(e,a){const S0=r16VaseShield(),vw=e._vwall||{},k=vw.k==null?1:vw.k;a=Math.min(1,a/.6);const Hh=e.h*e.scale*1.45,sc=Hh/S0.H1,x=cx(e)-e.w*e.scale*.7,top=e.y+e.oy-Hh-4;
  ctx.save();ctx.globalAlpha=a;ctx.translate(x-S0.W1*sc/2,top);ctx.scale(sc,sc);
  if(k>=1)ctx.drawImage(S0.c,-S0.PAD,-S0.PAD);
  else for(const pc of S0.pieces){const q=Math.max(0,Math.min(1,(k-pc.d*.55)/.45));if(q<=0)continue;const e2=eOutBack(q),ang=Math.atan2(pc.cy-S0.H1*.5,pc.cx-S0.W1*.5),fx=Math.cos(ang)*300*(1-e2),fy=Math.sin(ang)*300*(1-e2)-120*(1-e2),rot=(1-e2)*(pc.d>.5?2:-2);
    ctx.save();ctx.translate(pc.cx+fx,pc.cy+fy);ctx.rotate(rot);ctx.translate(-pc.cx,-pc.cy);ctx.beginPath();pc.p.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();ctx.drawImage(S0.c,-S0.PAD,-S0.PAD);ctx.restore();}
  if(k>=1){const shn=(T*.6)%2;if(shn<1){ctx.globalCompositeOperation='lighter';const sx=-80+shn*(S0.W1+160);const gr=ctx.createLinearGradient(sx-40,0,sx+40,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.3)');gr.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gr;ctx.fillRect(sx-40,0,80,S0.H1);}}
  ctx.restore();};
{const vw0=A.vaseWall;A.vaseWall=async(u,ts,sk)=>{const rel=keepPose(u);try{sfx('glass');await bodyWind(u,240,.12);bodyStrike(u,170,-.16);const W0={k:0};u._vwall=W0;
  const ck=setInterval(()=>sfx('click'),70);await tween(1500,k=>{W0.k=k;});clearInterval(ck);W0.k=1;sfx('shield');sfx('glass');shake(12);hitStop(90);
  const x=cx(u)-u.w*u.scale*.7,y=midY(u);sparks(x,y,['255,255,255','190,210,255'],26,420);soundBlast(x,y,'220,230,255',170,380);hit(u,u,sk);await bodySettle(u);}finally{rel();}};}

// ---- Porcelán mandarin – Tusátok: toll nélkül – a mandarin a kezével ír a levegőbe; a tintatartóból kiáramló tusból hosszú testű, pikkelyes, sörényes, lábas TUSSÁRKÁNY lesz
function r16InkDragon(P,a,t){if(P.length<3)return;const n=P.length;ctx.save();ctx.globalAlpha=a;ctx.lineCap='round';ctx.lineJoin='round';
  const wAt=i=>{const q=i/n;return 10+48*Math.sin(Math.min(1,q*1.15)*Math.PI)*(q<.08?q/.08:1);};
  // árnyék-elmosás
  ctx.strokeStyle='rgba(20,15,30,.25)';for(let i=1;i<n;i++){ctx.lineWidth=wAt(i)*1.6+6;ctx.beginPath();ctx.moveTo(P[i-1].x,P[i-1].y);ctx.lineTo(P[i].x,P[i].y);ctx.stroke();}
  // test
  for(let i=1;i<n;i++){ctx.lineWidth=wAt(i);ctx.strokeStyle='#0c0a12';ctx.beginPath();ctx.moveTo(P[i-1].x,P[i-1].y);ctx.lineTo(P[i].x,P[i].y);ctx.stroke();}
  // pikkelyek: világos ívek a testen
  for(let i=4;i<n-2;i+=3){const p=P[i],q=P[i-2],an=Math.atan2(p.y-q.y,p.x-q.x),w=wAt(i)*.32;ctx.strokeStyle='rgba(150,150,175,.55)';ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(p.x,p.y,w,an+Math.PI*.6,an+Math.PI*1.4);ctx.stroke();}
  // háttüskék
  ctx.fillStyle='#0c0a12';for(let i=3;i<n-2;i+=3){const p=P[i],q=P[i-2],an=Math.atan2(p.y-q.y,p.x-q.x)-Math.PI/2,w=wAt(i)*.5,L=w+10+6*Math.sin(t*6+i);ctx.beginPath();ctx.moveTo(p.x+Math.cos(an+1.3)*w*.4,p.y+Math.sin(an+1.3)*w*.4);ctx.lineTo(p.x+Math.cos(an)*(w+L),p.y+Math.sin(an)*(w+L));ctx.lineTo(q.x+Math.cos(an)*w,q.y+Math.sin(an)*w);ctx.fill();}
  // lábak karmokkal (a test negyedénél és felénél)
  for(const f of [.22,.5]){const i=Math.max(2,Math.floor(n*f)),p=P[i],q=P[i-2],an=Math.atan2(p.y-q.y,p.x-q.x)+Math.PI/2,w=wAt(i)*.45,sw=Math.sin(t*8+i)*.4;
    for(const s of [-1,1]){const kx=p.x+Math.cos(an+s*.5+sw)*(w+26),ky=p.y+Math.sin(an+s*.5+sw)*(w+26),fx=kx+Math.cos(an+s*.2)*22,fy=ky+Math.sin(an+s*.2)*22;ctx.strokeStyle='#0c0a12';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(kx,ky,fx,fy);ctx.stroke();
      ctx.lineWidth=3;for(let c=-1;c<=1;c++){ctx.beginPath();ctx.moveTo(fx,fy);ctx.lineTo(fx+Math.cos(an+s*.2+c*.5)*12,fy+Math.sin(an+s*.2+c*.5)*12);ctx.stroke();}}}
  // farok bojt
  {const p=P[n-1],q=P[n-3],an=Math.atan2(p.y-q.y,p.x-q.x);ctx.strokeStyle='#0c0a12';ctx.lineWidth=3;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.quadraticCurveTo(p.x+Math.cos(an+i*.3)*20,p.y+Math.sin(an+i*.3)*20+Math.sin(t*7+i)*6,p.x+Math.cos(an+i*.35)*36,p.y+Math.sin(an+i*.35)*36);ctx.stroke();}}
  ctx.restore();}
function r16InkHead(x,y,ang,s,jaw,a,t){ctx.save();ctx.globalAlpha=a;ctx.translate(x,y);ctx.rotate(ang);if(Math.cos(ang)<0)ctx.scale(1,-1);ctx.scale(s,s);
  // sörény
  ctx.strokeStyle='#0c0a12';ctx.lineCap='round';for(let i=0;i<9;i++){ctx.lineWidth=5-i*.3;ctx.beginPath();ctx.moveTo(-14+i*2,-8+i*3);ctx.quadraticCurveTo(-44-i*3,-20+i*6+Math.sin(t*6+i)*5,-70-i*3,-4+i*9+Math.sin(t*5+i)*7);ctx.stroke();}
  // szarvak
  ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(-6,-22);ctx.quadraticCurveTo(-26,-56,-58,-60);ctx.moveTo(8,-24);ctx.quadraticCurveTo(-4,-62,-28,-76);ctx.stroke();
  // fej + állkapocs
  ctx.fillStyle='#0c0a12';ctx.beginPath();ctx.moveTo(-28,-20);ctx.quadraticCurveTo(4,-34,38,-16);ctx.quadraticCurveTo(58,-12,66,-4);ctx.lineTo(34,-2-jaw*4);ctx.lineTo(62,6+jaw*18);ctx.quadraticCurveTo(32,26+jaw*12,0,20);ctx.quadraticCurveTo(-26,18,-36,4);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(150,150,175,.6)';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(-14,-14);ctx.quadraticCurveTo(10,-24,34,-12);ctx.stroke();
  // bajusz
  ctx.strokeStyle='#0c0a12';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(46,-8);ctx.bezierCurveTo(80,-34,104,-6,134,-38+Math.sin(t*5)*8);ctx.moveTo(46,8);ctx.bezierCurveTo(82,28,98,6,136,30+Math.sin(t*5+1)*8);ctx.stroke();
  // fogak
  ctx.fillStyle='#f4f0e6';for(let i=0;i<5;i++){ctx.beginPath();ctx.moveTo(32+i*7,-2-jaw*4);ctx.lineTo(35+i*7,7);ctx.lineTo(38+i*7,-2-jaw*4);ctx.fill();ctx.beginPath();ctx.moveTo(34+i*6,6+jaw*14);ctx.lineTo(37+i*6,-1+jaw*12);ctx.lineTo(40+i*6,6+jaw*14);ctx.fill();}
  ctx.globalCompositeOperation='lighter';glow(10,-14,22,'255,40,40',.95);ctx.fillStyle='#ffe0d0';ctx.beginPath();ctx.ellipse(10,-14,6,3.4,0,0,6.29);ctx.fill();ctx.restore();}
A.inkWave=async(u,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const rel=keepPose(u);try{sfx('dark');
  const hand=()=>fp(u,.14,.5),pot=()=>{const h=fp(u,.3,.86);return {x:h.x-90,y:u.y+u.oy-6};};const F={a:0,on:true};
  R16_EFF({update(){return F.on;},draw(){if(F.a<=0)return;const p=pot();qInkpot(p.x,p.y-20,F.a*1.4);}});
  await tween(260,k=>{F.a=k;});await dimTo(.42,'30,25,20',260);
  // írás a levegőbe: a keze ecsetvonásokat húz, kalligráfia-jelek tűnnek fel
  const W={pts:[],on:true,a:1};R16_EFF({update(){return W.on;},draw(){if(W.pts.length<2)return;ctx.save();ctx.globalAlpha=W.a;ctx.lineCap='round';ctx.strokeStyle='rgba(12,10,18,.92)';for(let i=1;i<W.pts.length;i++){const p=W.pts[i],q=W.pts[i-1];if(p.br||q.br)continue;ctx.lineWidth=p.w;ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(p.x,p.y);ctx.stroke();}ctx.restore();}});
  const strokes=[[[-20,-40],[20,-44]],[[0,-60],[-4,10]],[[-24,-10],[24,-14]],[[-16,14],[-28,40]],[[14,14],[28,40]]];
  const h0=hand(),ox=h0.x-70,oy=h0.y-120;
  for(const [a0,a1] of strokes){W.pts.push({br:1});sfx('whoosh');await tween(170,k=>{const x=ox+a0[0]+(a1[0]-a0[0])*k,y=oy+a0[1]+(a1[1]-a0[1])*k;W.pts.push({x,y,w:4+10*Math.sin(k*Math.PI)});u.lean=.08*Math.sin(k*Math.PI);});}
  // a jel felizzik, és a tintatartóból kiáramlik a tus
  sfx('dark');flash('40,20,40',.2,.1);const D={pts:[],hx:0,hy:0,ang:-1.57,jaw:0,a:1,on:true,rec:false,s:2.1,head:0,t:0,max:170};
  R16_EFF({update(dt){D.t+=dt;if(D.rec){const L=D.pts[0];if(!L||Math.hypot(L.x-D.hx,L.y-D.hy)>6){D.pts.unshift({x:D.hx,y:D.hy});if(D.pts.length>D.max)D.pts.pop();}
      if(Math.random()<.6)part({x:D.hx+rnd(-12,12),y:D.hy+rnd(-8,8),vx:rnd(-20,20),vy:rnd(30,90),g:500,life:.7,size:rnd(2,5),rgb:'12,10,18',add:false,shape:'drop'});}return D.on;},
    draw(){if(D.a<=0)return;const P=D.pts.map((p,i)=>({x:p.x,y:p.y+Math.sin(D.t*8-i*.3)*9*Math.min(1,i/10)}));r16InkDragon(P,D.a,D.t);if(D.head>0)r16InkHead(D.hx,D.hy,D.ang,D.s*(.5+.5*D.head),D.jaw,D.a*D.head,D.t);}});
  const p0=pot(),{mx}=grp(al),topY0=Math.min(...al.map(topY)),c1={x:p0.x-60,y:20},c2={x:mx+380,y:-20},p3={x:mx+40,y:Math.max(120,topY0-70)};
  const bez=(k,a,b,c,d)=>{const m=1-k;return m*m*m*a+3*m*m*k*b+3*m*k*k*c+k*k*k*d;};D.hx=p0.x;D.hy=p0.y-30;D.rec=true;W.on=true;
  const qi=setInterval(()=>sfx('whoosh'),360);
  await tween(1700,k=>{const e=easeIO(k),x=bez(e,p0.x,c1.x,c2.x,p3.x),y=bez(e,p0.y-30,c1.y,c2.y,p3.y);const an=Math.atan2(y-D.hy,x-D.hx);if(isFinite(an)&&(x!==D.hx||y!==D.hy))D.ang=an;D.hx=x;D.hy=y;D.head=Math.min(1,k*3);W.a=1-k;
    const p=pot();if(Math.random()<.7)part({x:p.x+rnd(-8,8),y:p.y-30,vx:rnd(-30,30),vy:-rnd(60,160),life:.6,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});});
  clearInterval(qi);W.on=false;sfx('growl');sfx('dark');flash('20,10,20',.3,.15);shake(8);bodyStrike(u,200,-.14);await wait(220);
  for(const t of al){if(!t.alive)continue;const sx=D.hx,sy=D.hy,tx=cx(t),ty=midY(t);D.jaw=1;sfx('whoosh');
    await tween(300,k=>{const e=k*k,x=sx+(tx-sx)*e,y=sy+(ty-sy)*e-Math.sin(k*Math.PI)*80;D.ang=Math.atan2(y-D.hy,x-D.hx)||D.ang;D.hx=x;D.hy=y;});
    sfx('bite');shake(14);hitStop(80);D.jaw=0;splat(tx,ty,['12,10,18','30,28,40'],40,460,'drop');
    for(let i=0;i<10;i++){const a=rnd(0,6.28),r=rnd(10,50);part({x:tx+Math.cos(a)*r,y:t.y+t.oy-4,vx:0,vy:0,life:1.4,size:rnd(10,24),rgb:'12,10,18',add:false,shape:'dsmoke'});}
    soundBlast(tx,ty,'60,50,80',170,380);t.hurt=.4;hit(u,t,sk);
    const ex=tx-100,ey=ty-170;await tween(240,k=>{const e=easeIO(k),x=tx+(ex-tx)*e,y=ty+(ey-ty)*e;D.ang=Math.atan2(y-D.hy,x-D.hx)||D.ang;D.hx=x;D.hy=y;});}
  sfx('dark');D.rec=false;await tween(650,k=>{D.a=1-k;for(let i=0;i<3;i++){const p=pick(D.pts);if(p)part({x:p.x,y:p.y,vx:rnd(-20,20),vy:rnd(40,140),g:600,life:.8,size:rnd(3,6),rgb:'12,10,18',add:false,shape:'drop'});}});D.on=false;
  await tween(220,k=>{F.a=1-k;});F.on=false;u.lean=0;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- Vattacukor-bárány – Édes álom: a bárányok átugranak, aztán nincs rátámadás – akit elaltat, körülötte rózsaszín felhő jelenik meg, és amíg alszik, ott is marad
{const sd=A.sweetDream;A.sweetDream=async(u,ts,sk)=>{const fo=flyObj,h0=hit,sb=soundBlast;let skip=false;flyObj=function(a,b,ms,draw,o){if(!skip&&ms===520){skip=true;return Promise.resolve();}return fo.apply(this,arguments);};
  hit=function(a,t,k){if(a===u&&t&&t!==u){addStatus(t,'sleep',2);t._pinkSleep=true;updateHUD();return;}return h0.apply(this,arguments);};soundBlast=function(){};
  try{await sd(u,ts,sk);}finally{flyObj=fo;hit=h0;soundBlast=sb;}
  const t=ts[0];if(t){t._pinkSleep=true;}};}
{const pz=popLabel;}
{const deS=drawEntity;drawEntity=function(e){const r=deS.apply(this,arguments);if(e&&e._pinkSleep){if(!e.alive||!e.st||!e.st.sleep){e._pinkSleep=false;return r;}if(FRONT_DRAW)return r;
    const x=cx(e),y=e.y+e.oy-e.h*e.scale*.42,R=Math.max(70,e.h*e.scale*.6);ctx.save();
    for(let i=0;i<9;i++){const a=i/9*6.283+T*.4,px=x+Math.cos(a)*R*.85,py=y+Math.sin(a)*R*.55,r=R*.32+Math.sin(T*2+i)*4;const g=ctx.createRadialGradient(px-r*.3,py-r*.3,r*.1,px,py,r);g.addColorStop(0,'rgba(255,245,252,.85)');g.addColorStop(.6,'rgba(255,190,225,.7)');g.addColorStop(1,'rgba(240,150,200,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,r,0,6.29);ctx.fill();}
    ctx.restore();if(Math.random()<.03)popLabel(e,'Zzz','#ffd6ef');}return r;};}

// ---- Kamilla – Teaszertartás: a csésze Kamilla mellett (hátrébb) jelenik meg; vastag, csavarodó teasugár, nagy csobbanás; a hullám valódi, áttetsző, rétegzett tea-hullám, göndör taréjjal, permettel
function r16Wave(x0,gy,Hw,len,t,a){if(a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(x0,gy);
  const crest=(i,n)=>{const q=i/n,h=q<.42?1-.12*q/.42:.88*Math.pow(1-(q-.42)/.58,1.4)*.92+.06;return [24+(len-24)*q,-Hw*h+Math.sin(t*5+q*12)*9*Math.min(1,q*3)];};
  const N=20,L=Math.sin(t*9)*6;
  const body=()=>{ctx.beginPath();ctx.moveTo(len+120,30);for(let i=N;i>=0;i--){const [x,y]=crest(i,N);ctx.lineTo(x,y);}
    ctx.bezierCurveTo(10,-Hw*1.14,-40+L,-Hw*1.12,-72+L,-Hw*.86);ctx.bezierCurveTo(-96+L,-Hw*.62,-70,-Hw*.38,-44,-Hw*.5);ctx.bezierCurveTo(-56,-Hw*.28,-36,-Hw*.08,-80,30);ctx.closePath();};
  // árnyék a földön
  ctx.save();ctx.globalAlpha*=.35;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(len*.35,26,len*.65,16,0,0,6.29);ctx.fill();ctx.restore();
  body();const g=ctx.createLinearGradient(0,-Hw,0,30);g.addColorStop(0,'rgba(252,214,130,.82)');g.addColorStop(.5,'rgba(226,146,52,.8)');g.addColorStop(1,'rgba(150,76,20,.9)');ctx.fillStyle=g;ctx.fill();
  ctx.save();body();ctx.clip();
    // belső mélység és áttetszőség
    const dg=ctx.createLinearGradient(-80,0,len,0);dg.addColorStop(0,'rgba(90,40,8,.45)');dg.addColorStop(.35,'rgba(90,40,8,0)');dg.addColorStop(1,'rgba(90,40,8,.3)');ctx.fillStyle=dg;ctx.fillRect(-120,-Hw*1.3,len+260,Hw*1.4+40);
    ctx.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const y=-Hw*.85+i*Hw*.13,ph=t*3+i*1.3;ctx.strokeStyle=`rgba(255,236,190,${.22-.025*i})`;ctx.lineWidth=3;ctx.beginPath();for(let k=0;k<=24;k++){const x=-80+(len+200)*k/24,yy=y+Math.sin(k*.7+ph)*10+k*Hw*.012;k?ctx.lineTo(x,yy):ctx.moveTo(x,yy);}ctx.stroke();}for(let i=0;i<26;i++){const x=-60+((i*53+t*90)%(len+120)),y=-Hw*(.15+.7*((i*37)%100)/100);ctx.fillStyle='rgba(255,245,215,.35)';ctx.beginPath();ctx.ellipse(x,y,10,3,.2,0,6.29);ctx.fill();}
    ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(80,34,6,.45)';ctx.beginPath();ctx.ellipse(-46,-Hw*.66,26,Hw*.13,-.5,0,6.29);ctx.fill();
  ctx.restore();
  ctx.strokeStyle='rgba(100,45,10,.85)';ctx.lineWidth=3.5;body();ctx.stroke();
  // hab a taréjon és a lebukó ajkon
  ctx.fillStyle='rgba(255,250,238,.97)';for(let i=0;i<8;i++){const [x,y]=crest(i,N);ctx.beginPath();ctx.arc(x+Math.sin(t*6+i)*2,y-4,14-i*1.4,0,6.29);ctx.fill();}
  for(let i=0;i<11;i++){const q=i/10,x=26-104*q+L*q,y=-Hw*(1.1-.3*q*q);ctx.beginPath();ctx.arc(x,y,15-6*q+Math.sin(t*8+i)*2.5,0,6.29);ctx.fill();}
  // permet a taréj fölött
  for(let i=0;i<14;i++){const ph=(t*1.8+i*.37)%1,x=-60+i*10+Math.sin(i*7)*12-ph*40,y=-Hw*1.12-ph*50+ph*ph*40;ctx.globalAlpha=a*(1-ph);ctx.beginPath();ctx.arc(x,y,3+3*(1-ph),0,6.29);ctx.fill();}
  ctx.globalAlpha=a;
  // úszó kamillavirágok
  for(let i=0;i<5;i++){const [x,y]=crest(Math.min(N,Math.round((i+.6)/5*N)),N);ctx.save();ctx.translate(x,y+12);ctx.rotate(t+i);ctx.fillStyle='#fff';for(let j=0;j<9;j++){const an=j/9*6.283;ctx.beginPath();ctx.ellipse(Math.cos(an)*7,Math.sin(an)*7,6,2.4,an,0,6.29);ctx.fill();}ctx.fillStyle='#f2c230';ctx.beginPath();ctx.arc(0,0,4,0,6.29);ctx.fill();ctx.restore();}
  ctx.restore();}
A.teaCeremony=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{await dimTo(.35,'40,25,10',250);await bodyWind(u,260,.1);sfx('holy');
  const gy=Math.max(...al.map(t=>t.y+t.oy))+6,minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),bx=cx(u)-60,C={x:bx,y:140,s:0,rot:0,a:0};
  R16_EFF({update(){return !C.done;},draw(){if(C.a>0)r15TeaCup(C.x,C.y,C.s,C.rot,C.a);}});
  for(let i=0;i<28;i++)part({x:C.x+rnd(-90,90),y:C.y+rnd(-60,40),vx:rnd(-30,30),vy:rnd(-30,30),life:.6,size:rnd(2,4),rgb:pick(['255,240,190','255,255,255']),shape:'star'});
  await tween(450,k=>{C.a=k;C.s=1.25*eOutBack(k);});bodyStrike(u,180,-.12);sfx('whoosh');
  await tween(520,k=>{C.rot=-1.3*easeIO(k);C.x=bx-30*k;});
  const lip=()=>{const c=Math.cos(C.rot),s=Math.sin(C.rot),lx=-74*C.s,ly=-60*C.s;return {x:C.x+lx*c-ly*s,y:C.y+lx*s+ly*c};},land={x:lip().x-90,y:gy},Sg={k:0,on:true};
  R16_EFF({update(){if(Sg.on&&Sg.k>.8){for(let i=0;i<2;i++)part({x:land.x+rnd(-40,40),y:land.y-rnd(0,10),vx:rnd(-200,200),vy:-rnd(160,380),g:900,life:rnd(.4,.7),size:rnd(3,7),rgb:pick(['230,160,60','255,220,150','255,245,225']),add:false,shape:'drop'});if(Math.random()<.4)part({x:land.x+rnd(-50,50),y:land.y-rnd(10,50),vx:rnd(-20,20),vy:-rnd(30,70),life:rnd(.8,1.2),size:rnd(18,30),grow:30,rgb:'245,240,235',add:false,shape:'smoke'});}return Sg.on||Sg.k>0;},
    draw(){if(Sg.k<=0)return;const p=lip(),ey=p.y+(land.y-p.y)*Math.min(1,Sg.k),w=40*C.s*Math.min(1,Sg.k);ctx.save();ctx.lineCap='round';
      for(const [dx,ww,col] of [[0,w,'rgba(200,110,30,.95)'],[-6,w*.6,'rgba(240,170,70,.95)'],[-10,w*.22,'rgba(255,236,190,.9)']]){ctx.strokeStyle=col;ctx.lineWidth=ww;ctx.beginPath();ctx.moveTo(p.x+dx*.3,p.y);ctx.bezierCurveTo(p.x-20+dx,p.y+70,land.x+40+Math.sin(T*14)*6+dx,ey-90,land.x+dx,ey);ctx.stroke();}
      // csavarodó szálak a sugárban
      ctx.strokeStyle='rgba(255,240,200,.7)';ctx.lineWidth=2;for(let j=0;j<3;j++){ctx.beginPath();for(let i=0;i<=20;i++){const q=i/20,x=p.x+(land.x-p.x)*q+Math.sin(q*14+T*16+j*2)*w*.3,y=p.y+(ey-p.y)*q;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}
      if(Sg.k>.8){ctx.fillStyle='rgba(230,150,60,.7)';ctx.beginPath();ctx.ellipse(land.x,land.y+4,60+Math.sin(T*10)*6,12,0,0,6.29);ctx.fill();ctx.strokeStyle='rgba(255,245,225,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(land.x,land.y+4,70+((T*120)%40),14,0,0,6.29);ctx.stroke();}
      ctx.restore();}});
  sfx('water');await tween(320,k=>{Sg.k=k;});await wait(220);
  const Wv={x:land.x+20,Hw:40,len:140,a:1,t:0,on:true},done=new Set();R16_EFF({update(dt){Wv.t+=dt;return Wv.on;},draw(){r16Wave(Wv.x,gy,Wv.Hw,Wv.len,Wv.t,Wv.a);}});
  const bz=setInterval(()=>sfx('water'),280);
  await tween(1700,k=>{Wv.x=land.x+20-(land.x+20-(minX-300))*easeIO(k);Wv.Hw=40+250*Math.min(1,k*2.2);Wv.len=140+300*Math.min(1,k*2);if(k>.35){Sg.on=false;Sg.k=Math.max(0,1-(k-.35)*4);}
    for(let i=0;i<2;i++)part({x:Wv.x-40+rnd(-30,30),y:gy-Wv.Hw*.9+rnd(-20,20),vx:rnd(-300,-60),vy:rnd(-240,-40),g:700,life:rnd(.4,.8),size:rnd(3,7),rgb:pick(['255,245,225','236,170,70']),add:false,shape:'drop'});
    for(const t of al)if(!done.has(t)&&Wv.x<cx(t)+10){done.add(t);shake(14);hitStop(70);toss(t,60,440);t.hurt=.45;soundBlast(cx(t),midY(t),'236,170,70',170,380);splat(cx(t),midY(t),['230,160,60','255,240,210'],20,360,'drop');hit(u,t,sk);}});
  clearInterval(bz);Sg.k=0;for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  await tween(400,k=>{Wv.a=1-k;});Wv.on=false;await tween(400,k=>{C.rot=-1.3*(1-k);C.a=1-k;});C.done=true;await dimTo(0,null,300);await bodySettle(u);}finally{rel();}};

// ---- Morgána – Átok: a lila láncok (amelyek a célpontra tekerednek) és a halálfej visszakerülnek; a szürke, rajzolt lánc nem
{const hx0=A.hex;A.hex=async(u,ts,sk)=>{const t=ts[0];const fo=flyObj;let did=false;
  flyObj=function(a,b,ms,draw,o){if(!did&&ms===520&&t){did=true;const x=cx(t),y=midY(t),big=Math.max(210,t.h*t.scale*1.7);sfx('click');if(!fxHold('chains',x,y+10,{h:big*1.15,life:1.6,pop:true,pulse:.03}))rune(t,'190,90,255');
      return fo(a,b,ms,draw,o);}return fo.apply(this,arguments);};
  try{await hx0(u,ts,sk);}finally{flyObj=fo;}};}

// ---- Grog – Földrepesztés: nincs nagy kitörés – sok kisebb kőtüske tör fel egymás után a repedés mentén
A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';const {gy}=grp(al);
  await tween(300,k=>{u.jump=Math.sin(k*Math.PI)*80;u.lean=-.1*Math.sin(k*Math.PI);});u.jump=0;u.lean=0;
  sfx('rock');shake(12);hitStop(70);const x0=cx(u)+40,x1=Math.max(...al.map(cx))+90;groundCrack((x0+x1)/2,gy+6,'120,90,60',x1-x0);dustWave(x0,u.y+u.oy);
  const n=24,hitDone=new Set();for(let i=0;i<n;i++){const x=x0+(x1-x0)*(i+.5)/n+rnd(-12,12);setTimeout(()=>{sfx('rock');shake(4);fxImage('rock',x,gy+10,{size:rnd(34,56),life:.8,anchor:'bottom',grow:.3});
      puffs(x,gy-6,2,['170,150,120','140,120,100'],[14,24],{w:30,up:70});for(let j=0;j<6;j++)part({x:x+rnd(-20,20),y:gy+rnd(-4,6),vx:rnd(-90,90),vy:rnd(-360,-160),g:900,life:rnd(.5,.8),size:rnd(4,8),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});
      for(const t of al)if(!hitDone.has(t)&&Math.abs(cx(t)-x)<55){hitDone.add(t);toss(t,46,360);t.hurt=.45;hit(u,t,sk);}},(120+i*55)/(S.speed||1));}
  await wait(120+n*55+250);for(const t of al)if(!hitDone.has(t)&&t.alive){hitDone.add(t);hit(u,t,sk);}await wait(700);u.pose='idle';};

// ---- Espresszó idézés: sokkal nagyobb, sűrűbb, valódi lángokból álló tűzcsóva, utána ég a föld az ellenségek alatt
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){const r0=es.run;es.run=async(P,S0)=>{const fb=fireBreath;fireBreath=function(o,ts,dir,o2={}){return fb(o,ts,dir,{...o2,dur:(o2.dur||1100)*1.25,n:Math.round((o2.n||14)*1.6),speed:(o2.speed||900)*1.1});};
  const p0=part;part=function(o){if(o&&o.shape==='fire'&&o.rgb==='255,160,40'){o.size*=1.5;o.grow=(o.grow||0)*1.4;}return p0(o);};
  try{await r0(P,S0);}finally{fireBreath=fb;part=p0;}
  for(const t of foesAlive()){const x=cx(t),gy=t.y+t.oy;R16_EFF({t:0,update(dt){this.t+=dt;if(Math.random()<.6)part({x:x+rnd(-60,60),y:gy-rnd(0,10),vx:rnd(-10,10),vy:-rnd(40,110),drag:1,life:rnd(.4,.7),size:rnd(10,18),grow:30,rgb:'255,160,40',add:false,shape:'fire'});return this.t<1.2;}});}
  await wait(600);};}}

// ---- Árny-csapat idézés: látványosabb – az árnymások egyszerre rohannak rá, mindegyik a saját fegyverével csap le, végül összeállnak, és egy hatalmas árnyrobbanással mindenkit eltalálnak
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){const r0=sh.run;sh.run=async(P,S0)=>{await dimTo(.7,'15,5,30',300);await r0(P,S0);const fs=foesAlive();if(!fs.length){await dimTo(0,null,300);return;}
  const {mx,my}=grp(fs);sfx('dark');const B={k:0,on:true};
  R16_EFF({update(){return B.on;},draw(){if(B.k<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,my,320*B.k,'140,60,240',.6*(1-B.k*.5));ctx.globalCompositeOperation='source-over';ctx.strokeStyle=`rgba(200,140,255,${1-B.k})`;ctx.lineWidth=14*(1-B.k);ctx.beginPath();ctx.ellipse(mx,my+40,380*B.k,90*B.k,0,0,6.29);ctx.stroke();ctx.restore();}});
  for(let i=0;i<5;i++)setTimeout(()=>{for(let j=0;j<8;j++)darkFlame({x:mx+rnd(-200,200),y:my+rnd(-40,80),vx:rnd(-30,30),vy:-rnd(80,180),life:rnd(.5,.8),size:rnd(18,30)});},i*80);
  flash('120,40,200',.5,.2);shake(20);hitStop(120);sfx('boom');await tween(600,k=>{B.k=k;});B.on=false;
  for(const t of fs){t.hurt=.5;toss(t,50,380);soundBlast(cx(t),midY(t),'170,100,255',180,400);hit(P,t,{name:'Árnyrobbanás',kind:'mag',pow:1.2,elem:'dark',tgt:'enemies',anim:'midnight'});}
  await wait(400);await dimTo(0,null,300);};}}

// ===== Páros támadások: mindegyik saját, egyedi jelenet (nem a hősök meglévő támadásai). Mindkét hős a saját testével részt vesz =====
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r16tint||FRONT_DRAW)return de.apply(this,arguments);const r=de.apply(this,arguments);
  const tn=e._r16tint;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.75*(1+.05*Math.sin(T*8)),tn.rgb,tn.a);ctx.restore();return r;};}
async function r16Raise(h,rgb,ms=420){h.pose='cast';h._r16tint={rgb,a:.0};await tween(ms,k=>{h.lean=-.1*easeIO(k);h.jump=12*Math.sin(k*Math.PI*.5);h._r16tint.a=.55*k;});}
function r16Lower(h){h.pose='idle';h._r16tint=null;tween(260,k=>{h.lean=-.1*(1-k);h.jump=12*(1-k);}).then(()=>{h.lean=0;h.jump=0;});}
function r16Bolt(x0,y0,x1,y1,rgb,w){const n=12,pts=[[x0,y0]];for(let i=1;i<n;i++){const q=i/n;pts.push([x0+(x1-x0)*q+rnd(-26,26),y0+(y1-y0)*q+rnd(-10,10)]);}pts.push([x1,y1]);
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.lineJoin='round';for(const [lw,a] of [[w*3,.25],[w*1.4,.6],[w*.5,1]]){ctx.strokeStyle=a===1?'rgba(255,245,255,1)':`rgba(${rgb},${a})`;ctx.lineWidth=lw;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}ctx.restore();}
const R16P={
  // Villámátok: mindketten felemelik a pálcájukat; az ellenségek fölött koponyaarcú, fekete-lila viharfelhő gyűlik; lila villámok csapnak le, mindenkin átok-jel
  'Villámátok':async(A1,B1,al,sk,p)=>{await Promise.all([r16Raise(A1,'190,110,255'),r16Raise(B1,'190,110,255')]);const {mx}=grp(al),cy=70,Cl={a:0,eye:0,on:true};sfx('thunder');
    R16_EFF({update(){return Cl.on;},draw(){if(Cl.a<=0)return;ctx.save();ctx.globalAlpha=Cl.a;for(let i=0;i<14;i++){const x=mx-260+i*40+Math.sin(T+i)*8,y=cy+Math.sin(i*1.7)*16,r=50+Math.sin(i*2.3)*16;const g=ctx.createRadialGradient(x,y-r*.3,r*.1,x,y,r);g.addColorStop(0,'#4a2a6a');g.addColorStop(.7,'#1e0e30');g.addColorStop(1,'rgba(10,5,20,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,6.29);ctx.fill();}
      // koponyaarc a felhőben
      ctx.globalCompositeOperation='lighter';for(const ex of [-46,46]){glow(mx+ex,cy-4,30*Cl.eye+4,'200,90,255',.9*Cl.eye);}ctx.fillStyle=`rgba(230,170,255,${.8*Cl.eye})`;ctx.beginPath();ctx.moveTo(mx-8,cy+18);ctx.lineTo(mx,cy+6);ctx.lineTo(mx+8,cy+18);ctx.fill();
      for(let i=0;i<6;i++)ctx.fillRect(mx-36+i*13,cy+34,8,12*Cl.eye);ctx.restore();}});
    // a pálcák hegyéből energia száll fel a felhőbe
    const up=setInterval(()=>{for(const h of [A1,B1]){const a=handPos(h);part({x:a.x,y:a.y,vx:(mx-a.x)*1.2,vy:(cy-a.y)*1.2,life:.6,size:rnd(3,6),rgb:pick(['200,120,255','255,255,255']),shape:'star'});}},40);
    await tween(700,k=>{Cl.a=k;});await tween(300,k=>{Cl.eye=k;});clearInterval(up);sfx('growl');
    for(let r=0;r<3;r++)for(const t of al){if(!t.alive)continue;const B={on:true};R16_EFF({t:0,update(dt){this.t+=dt;return this.t<.22;},draw(){r16Bolt(mx+rnd(-200,200),cy+30,cx(t)+rnd(-20,20),midY(t),'190,110,255',8);}});
      sfx('thunder');flash('200,140,255',.25,.08);shake(9);hitStop(40);t.hurt=.3;sparks(cx(t),midY(t),['220,170,255','255,255,255'],16,420);if(r===2){rune(t,'190,90,255');hit(A1,t,sk);}await wait(140);}
    await tween(400,k=>{Cl.a=1-k;});Cl.on=false;r16Lower(A1);r16Lower(B1);},
  // Tündérököl: Lili Grog fölé repül és aranyport szór rá; Grog aranyban izzik, megnő, odarohan, és a földbe üt: arany lökéshullám, fényoszlopok, a csapat gyógyul
  'Tündérököl':async(A1,B1,al,sk,p)=>{const fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1;const fx0=fairy.ox||0,fy0=fairy.oy||0,dxF=cx(orc)-cx(fairy),dyF=topY(orc)-30-midY(fairy);
    await tween(420,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*e;fairy.oy=fy0+dyF*e;});fairy.pose='cast';sfx('holy');
    const dust=setInterval(()=>{for(let i=0;i<4;i++)part({x:cx(fairy)+rnd(-20,20),y:midY(fairy)+10,vx:rnd(-40,40),vy:rnd(60,160),g:120,life:rnd(.8,1.2),size:rnd(2,4),rgb:pick(['255,230,120','255,255,255']),shape:'star'});},40);
    orc._r16tint={rgb:'255,210,90',a:0};const s0=orc.scale;await tween(700,k=>{orc._r16tint.a=.7*k;orc.scale=s0*(1+.35*easeIO(k));});clearInterval(dust);
    await tween(320,k=>{const e=easeIO(k);fairy.ox=fx0+dxF*(1-e);fairy.oy=fy0+dyF*(1-e);});fairy.ox=fx0;fairy.oy=fy0;fairy.pose='idle';
    const t0=al.slice().sort((a,b)=>cx(a)-cx(b))[0],d=await dashTo(orc,t0,300,40);orc.pose='attack';await tween(260,k=>{orc.jump=120*Math.sin(k*Math.PI*.5);orc.lean=.2*k;});
    await tween(140,k=>{orc.jump=120*(1-k*k);orc.lean=.2-.5*k;});orc.jump=0;const {mx,gy}=grp(al);sfx('boom');sfx('holy');flash('255,240,180',.6,.25);shake(22);hitStop(140);
    const Rg={k:0,on:true};R16_EFF({update(){return Rg.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(255,220,120,${1-Rg.k})`;ctx.lineWidth=24*(1-Rg.k)+2;ctx.beginPath();ctx.ellipse(cx(orc)+60,gy,520*Rg.k,90*Rg.k,0,0,6.29);ctx.stroke();ctx.restore();}});
    for(const t of al){if(!t.alive)continue;R16_EFF({t:0,update(dt){this.t+=dt;return this.t<.9;},draw(){const a=1-this.t/.9,x=cx(t);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-60,0,x+60,0);g.addColorStop(0,'rgba(255,230,140,0)');g.addColorStop(.5,`rgba(255,245,200,${.8*a})`);g.addColorStop(1,'rgba(255,230,140,0)');ctx.fillStyle=g;ctx.fillRect(x-60,0,120,t.y+t.oy);ctx.restore();}});
      toss(t,60,420);t.hurt=.45;hit(orc,t,sk);}
    await tween(500,k=>{Rg.k=k;});Rg.on=false;await wait(200);
    for(const h of S.heroes)if(h.alive)for(let i=0;i<8;i++)part({x:cx(h)+rnd(-30,30),y:topY(h)-rnd(0,40),vx:rnd(-10,10),vy:rnd(40,100),life:1,size:rnd(2,4),rgb:'140,255,170',shape:'star'});
    await dashBack(orc,d);await tween(300,k=>{orc._r16tint.a=.7*(1-k);orc.scale=s0*(1.35-.35*k);});orc.scale=s0;orc._r16tint=null;},
  // Csillagözön: éjszaka lesz; Zordon és Lili csillagokat gyújt az égen, amelyek csillagképpé (sárkány) kapcsolódnak; aztán a csillagkép csillagai üstökösként becsapódnak
  'Csillagözön':async(A1,B1,al,sk,p)=>{const sc=sceneLayer(()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(8,10,40,.75)');g.addColorStop(1,'rgba(30,20,70,.45)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(let i=0;i<90;i++){ctx.fillStyle=`rgba(255,255,255,${.4+.4*Math.sin(T*3+i)})`;ctx.fillRect((i*173)%W,(i*67)%300,2,2);}});await sc.show(400);
    await Promise.all([r16Raise(A1,'255,240,180'),r16Raise(B1,'255,240,180')]);const {mx}=grp(al);
    const shape=[[-220,40],[-150,0],[-80,20],[-20,-30],[50,-10],[110,-50],[170,-20],[210,30],[140,60],[60,40]].map(([x,y])=>({x:mx+x,y:120+y,a:0}));const L={k:0,on:true};
    R16_EFF({update(){return L.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(200,220,255,${.6*L.k})`;ctx.lineWidth=2;ctx.beginPath();shape.forEach((s,i)=>{if(s.gone)return;i?ctx.lineTo(s.x,s.y):ctx.moveTo(s.x,s.y);});ctx.stroke();
      for(const s of shape){if(s.a<=0||s.gone)continue;glow(s.x,s.y,26*s.a,'255,240,200',.9);ctx.fillStyle='#fff';ctx.beginPath();for(let j=0;j<10;j++){const r=j%2?5:13,an=j/10*6.283+T;ctx.lineTo(s.x+Math.cos(an)*r*s.a,s.y+Math.sin(an)*r*s.a);}ctx.closePath();ctx.fill();}ctx.restore();}});
    for(const s of shape){const h=Math.random()<.5?A1:B1,a=handPos(h);flyObj(a,s,300,(x,y)=>{part({x,y,vx:0,vy:0,life:.3,size:3,rgb:'255,240,200',shape:'star'});},{arc:40}).then(()=>{s.a=1;sfx('holy');});await wait(70);}
    await wait(300);await tween(400,k=>{L.k=k;});await wait(300);
    let i=0;for(const s of shape){const t=al[i++%al.length];if(!t.alive)continue;s.gone=true;sfx('whoosh');flyObj({x:s.x,y:s.y},{x:cx(t)+rnd(-30,30),y:midY(t)},280,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'255,230,170',.9);ctx.restore();part({x,y,vx:rnd(-30,30),vy:rnd(-30,30),life:.5,size:rnd(4,8),rgb:pick(['255,240,200','255,200,120']),shape:'star'});},{ease:true}).then(()=>{sfx('boom');shake(8);bigBoom(cx(t),midY(t),.5);t.hurt=.3;});await wait(110);}
    await wait(400);for(const t of al)if(t.alive)hit(A1,t,sk);L.on=false;r16Lower(A1);r16Lower(B1);await sc.hide(400);},
  // Árnyroham: Morgána árnyékká változtatja Grogot (fekete-lila lángnyelvek), aki egyetlen rohammal keresztülszáguld minden ellenségen, lila hasítással
  'Árnyroham':async(A1,B1,al,sk,p)=>{const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1;await r16Raise(witch,'150,60,240');sfx('dark');
    const fl=setInterval(()=>{for(let i=0;i<2;i++)darkFlame({x:cx(orc)+orc.ox*0+rnd(-40,40),y:orc.y+orc.oy-rnd(0,orc.h*orc.scale*.8),vx:rnd(-20,20),vy:-rnd(60,140),life:rnd(.4,.7),size:rnd(14,22)});const a=handPos(witch);part({x:a.x,y:a.y,vx:(cx(orc)-a.x)*2,vy:(midY(orc)-a.y)*2,life:.4,size:rnd(3,6),rgb:'170,90,255'});},50);
    orc._r16tint={rgb:'120,40,220',a:.8};await wait(700);r16Lower(witch);
    const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),endX=W+200-orc.x,done=new Set(),trail=[];orc.pose='attack';sfx('whoosh');ghosts(orc,700);
    R16_EFF({update(){return trail.length>0||!orc._r16done;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=1;i<trail.length;i++){const a=trail[i].a;ctx.strokeStyle=`rgba(170,90,255,${.5*a})`;ctx.lineWidth=60*a;ctx.beginPath();ctx.moveTo(trail[i-1].x,trail[i-1].y);ctx.lineTo(trail[i].x,trail[i].y);ctx.stroke();trail[i].a-=.03;}while(trail.length&&trail[0].a<=0)trail.shift();ctx.restore();}});
    const gy=al.reduce((s,t)=>s+t.y,0)/al.length;
    await tween(650,k=>{orc.ox=endX*k*k;orc.oy=(gy-orc.y)*Math.min(1,k*3);trail.push({x:cx(orc),y:midY(orc),a:1});for(const t of xs)if(!done.has(t)&&cx(orc)>cx(t)){done.add(t);sfx('slash');shake(12);hitStop(50);clawMarks(cx(t),midY(t),t.h*t.scale*.8,-.9,'200,120,255');toss(t,50,380);t.hurt=.45;hit(orc,t,sk);}});
    clearInterval(fl);orc._r16tint=null;orc.alpha=0;orc.ox=-orc.x-200;await wait(200);orc.alpha=1;await tween(400,k=>{orc.ox=(-orc.x-200)*(1-easeIO(k));orc.oy=(gy-orc.y)*(1-k);});orc.ox=0;orc.oy=0;orc.pose='idle';orc._r16done=true;
    for(const t of xs)if(!done.has(t)&&t.alive)hit(orc,t,sk);},
  // Lótuszvihar: az ellenségek alatt óriási lótusz nyílik; szirmai forgószélben emelkednek, Jázmin nyilai a forgószélbe repülnek és szétrobbannak, Lili pora csillog
  'Lótuszvihar':async(A1,B1,al,sk,p)=>{const monk=A1.type==='monk'?A1:B1,fairy=monk===A1?B1:A1;const {mx,gy}=grp(al),Lt={k:0,on:true,sp:0,up:0};sfx('holy');
    await r16Raise(fairy,'255,170,210');
    R16_EFF({update(){return Lt.on;},draw(){if(Lt.k<=0)return;ctx.save();ctx.translate(mx,gy);ctx.scale(1,.42);for(let ring=0;ring<2;ring++)for(let i=0;i<10;i++){const a=i/10*6.283+ring*.3,r=(ring?120:190)*Lt.k,open=Lt.k;ctx.save();ctx.rotate(a);const g=ctx.createLinearGradient(0,0,r,0);g.addColorStop(0,'#fff0f6');g.addColorStop(1,ring?'#ff8cc0':'#ffb6d6');ctx.fillStyle=g;ctx.strokeStyle='#c2557e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(r*.5,-r*.32*open,r,0);ctx.quadraticCurveTo(r*.5,r*.32*open,0,0);ctx.fill();ctx.stroke();ctx.restore();}
      ctx.fillStyle='#ffd23a';ctx.beginPath();ctx.arc(0,0,30*Lt.k,0,6.29);ctx.fill();ctx.restore();
      // szirmok a forgószélben
      if(Lt.up>0)for(let i=0;i<60;i++){const h=(i/60+Lt.sp*.3)%1,a=i*2.4+Lt.sp*6,r=(120+60*h)*Lt.up,x=mx+Math.cos(a)*r,y=gy-h*320*Lt.up;ctx.save();ctx.translate(x,y);ctx.rotate(a);ctx.fillStyle=i%3?'#ffb6d6':'#fff0f6';ctx.beginPath();ctx.ellipse(0,0,12,5,0,0,6.29);ctx.fill();ctx.restore();}}});
    await tween(700,k=>{Lt.k=eOutBack(k);});r16Lower(fairy);sfx('wind');const spin=setInterval(()=>{Lt.sp+=.05;},30);await tween(500,k=>{Lt.up=k;});
    monk.pose='attack';for(let i=0;i<7;i++){const a=handPos(monk),tx=mx+rnd(-100,100),ty=gy-rnd(80,260);sfx('whoosh');flyObj(a,{x:tx,y:ty},260,(x,y,r)=>{ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(ty-a.y,tx-a.x));ctx.globalCompositeOperation='lighter';glow(0,0,24,'255,190,220',.8);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#5a3a1a';ctx.fillRect(-30,-2,34,4);ctx.fillStyle='#ffe0a0';ctx.beginPath();ctx.moveTo(4,-7);ctx.lineTo(18,0);ctx.lineTo(4,7);ctx.fill();ctx.restore();}).then(()=>{sfx('boom');for(let j=0;j<14;j++)part({x:tx,y:ty,vx:rnd(-260,260),vy:rnd(-260,200),drag:2,life:rnd(.5,.8),size:rnd(4,8),rgb:pick(['255,182,214','255,240,246','255,220,120']),shape:'star'});});await wait(110);}
    monk.pose='idle';await wait(300);flash('255,200,230',.4,.2);shake(14);for(const t of al){if(!t.alive)continue;toss(t,50,380);t.hurt=.45;hit(monk,t,sk);}
    await tween(500,k=>{Lt.up=1-k;Lt.k=1-k;});clearInterval(spin);Lt.on=false;},
  // Sárkánynyíl: Zordon tűzzel tölti meg Jázmin íját, és a nyílból hatalmas, lángtestű tűzsárkány lesz, amely végigszántja az ellenségeket
  'Sárkánynyíl':async(A1,B1,al,sk,p)=>{const wiz=A1.type==='wizard'?A1:B1,monk=wiz===A1?B1:A1;await r16Raise(wiz,'255,150,60');
    const ch=setInterval(()=>{const a=handPos(wiz),b=handPos(monk);for(let i=0;i<3;i++){const q=Math.random();part({x:a.x+(b.x-a.x)*q+rnd(-8,8),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*60,vx:(b.x-a.x)*.8,vy:(b.y-a.y)*.8,drag:1.2,life:rnd(.3,.5),size:rnd(8,14),grow:20,rgb:'255,150,40',add:false,shape:'fire'});}},40);
    sfx('fire');await wait(900);clearInterval(ch);r16Lower(wiz);monk.pose='attack';sfx('whoosh');sfx('fire');
    const o=handPos(monk),xs=al.slice().sort((a,b)=>cx(a)-cx(b)),y=xs.reduce((s,t)=>s+midY(t),0)/xs.length,x1=W+260,D={pts:[],hx:o.x,hy:o.y,on:true},done=new Set();
    R16_EFF({update(){D.pts.unshift({x:D.hx,y:D.hy});if(D.pts.length>40)D.pts.pop();if(D.on)for(let i=0;i<4;i++){const p=pick(D.pts);part({x:p.x+rnd(-14,14),y:p.y+rnd(-14,14),vx:rnd(-80,-20),vy:rnd(-60,20),drag:1.5,life:rnd(.35,.6),size:rnd(16,28),grow:40,rgb:'255,160,40',add:false,shape:'fire'});}return D.on||D.pts.length>0;},
      draw(){const P=D.pts,n=P.length;if(n<2)return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(const [wf,col] of [[1,'255,90,20'],[.6,'255,170,50'],[.25,'255,250,210']]){for(let i=1;i<n;i++){const q=1-i/n;ctx.strokeStyle=`rgba(${col},${.8*q})`;ctx.lineWidth=(16+60*q)*wf;ctx.beginPath();ctx.moveTo(P[i-1].x,P[i-1].y+Math.sin(T*10-i*.5)*10*(1-q));ctx.lineTo(P[i].x,P[i].y+Math.sin(T*10-i*.5)*10*(1-q));ctx.stroke();}}
        // lángsárkány-fej
        ctx.translate(D.hx,D.hy);ctx.fillStyle='rgba(255,170,60,.9)';ctx.beginPath();ctx.moveTo(90,0);ctx.quadraticCurveTo(50,-46,0,-36);ctx.lineTo(-30,-70);ctx.lineTo(-10,-30);ctx.quadraticCurveTo(-36,0,-10,30);ctx.quadraticCurveTo(50,40,90,0);ctx.fill();ctx.fillStyle='rgba(255,250,220,.95)';ctx.beginPath();ctx.ellipse(30,-14,8,5,0,0,6.29);ctx.fill();
        ctx.fillStyle='rgba(255,240,200,.9)';ctx.beginPath();ctx.moveTo(84,2);ctx.lineTo(30,6);ctx.lineTo(60,18);ctx.fill();ctx.restore();}});
    await tween(1000,k=>{const e=k*k*(3-2*k);D.hx=o.x+(x1-o.x)*e;D.hy=o.y+(y-o.y)*Math.min(1,k*2.5)-Math.sin(k*Math.PI*2)*30;for(const t of xs)if(!done.has(t)&&D.hx>=cx(t)){done.add(t);shake(12);hitStop(50);bigBoom(cx(t),midY(t),.7);t.hurt=.45;hit(monk,t,sk);}});
    D.on=false;for(const t of xs)if(!done.has(t)&&t.alive)hit(monk,t,sk);monk.pose='idle';}};
A.pairAtk=async(u,ts,sk)=>{const p=sk&&sk.pair,o=sk&&sk.partner,al=ts.filter(t=>t.alive);if(!p||!al.length)return;const f=R16P[p.name];
  const who=ty=>u.type===ty?u:(o&&o.type===ty)?o:(S.heroes.find(h=>h.type===ty)||u);const A1=who(p.a),B1=who(p.b);
  await dimTo(.5,'10,5,25',250);showBanner('Páros támadás: '+p.name,true);sfx('holy');
  try{if(f)await f(A1,B1,al,sk,p);else for(const t of al)hit(u,t,sk);}catch(e){console.error(e);for(const t of al)if(t.alive)hit(u,t,sk);}
  for(const h of [A1,B1]){h._r16tint=null;h.pose='idle';}
  if(p.heal){for(const h of S.heroes)if(h.alive){const v=Math.round(h.maxHp*p.heal);h.hp=Math.min(h.maxHp,h.hp+v);popLabel(h,'+'+v,'#7dff9a');}updateHUD();}
  await dimTo(0,null,300);};
NOFX.add('pairAtk');

// ---- Napi kihívás: erősebb és vegyesebb – a csapat szintjén vagy fölötte, 3 csata, minden csatában különböző fajták több fejezetből
r14DailyLevel=function(){const d=new Date();let s=d.getFullYear()*1000+d.getMonth()*40+d.getDate();const R=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const cl=ZONES.flatMap(z=>z.levels).filter(l=>cleared(l.id)),lv=cl.length?cl[cl.length-1]:ZONES[0].levels[0];
  const hs=(S.roster&&S.roster.length?S.roster:S.heroes)||[],avg=hs.length?hs.reduce((a,h)=>a+(h.lvl||1),0)/hs.length:1;
  const zi=Math.max(0,ZONES.indexOf(zoneOf(lv))),zs=foesByZone().slice(0,zi+1);
  const ok=t=>!EN_DEF[t].boss&&!EN_DEF[t].miniboss&&!EN_DEF[t].passive&&!['squirrel','mushking','acorn','root','kanna'].includes(t);
  const byZone=zs.map(([z,ts])=>ts.filter(ok)).filter(a=>a.length);
  const battle=n=>{const used=new Set(),out=[];let guard=0;while(out.length<n&&guard++<60){const zz=byZone[Math.floor(R()*byZone.length)],t=zz[Math.floor(R()*zz.length)];if(t&&!used.has(t)){used.add(t);out.push(t);}}while(out.length<n)out.push(out[0]||'slime');return out;};
  return {id:'napi',daily:true,name:'Napi kihívás',theme:lv.theme,elvl:Math.max(lv.elvl||1,Math.round(avg)+1),intro:'Minden nap más, vegyes ellenfelek várnak az eddig bejárt vidékekről. Az első győzelemért ma 500 arany jár!',battles:[battle(3),battle(3),battle(3)]};};

// ---- Térkép: a titkos főellenség jele és felirata olyan helyre kerül, ahol nem takar pályapöttyöt
{const m4=mapScreen;mapScreen=function(zi){const r=m4.apply(this,arguments);try{const view=ov.querySelector('.map-view');if(view){const b=[...view.querySelectorAll('.mnode')].find(x=>x.style.left==='60%'&&x.style.top==='60%'),l=view.querySelector('.map-secret');
    if(b){b.style.left='63%';b.style.top='67%';}if(l){l.style.left='63%';l.style.top='calc(67% - clamp(16px,3vw,26px))';l.style.transform='translate(-50%,-100%)';}}}catch(e){}return r;};}
// ---- Elforgatott telefon: ha a térkép álló helyzetben nyílt meg (görgethető, „húzd oldalra”), fekvőbe fordításkor igazodjon (egész térkép látszik), és vissza
{const fit=()=>{try{const v=ov&&ov.querySelector('.map-view');if(!v)return;const land=innerWidth>innerHeight,sw=ov.querySelector('.map-swipe');
    if(land){v.style.width='';v.style.right='';ov.style.overflowX='';ov.style.overflowY='';if(sw)sw.remove();}
    else{const h=v.clientHeight||ov.clientHeight;v.style.right='auto';v.style.width=Math.round(h*16/9)+'px';ov.style.overflowX='auto';ov.style.overflowY='hidden';if(!sw){const hnt=document.createElement('div');hnt.className='map-swipe';hnt.textContent='⇆ húzd oldalra a térképet';ov.appendChild(hnt);}}}catch(e){}};
  addEventListener('resize',()=>setTimeout(fit,120));addEventListener('orientationchange',()=>setTimeout(fit,300));}
// fekvő nézet: a csatatér felülre igazodik (nincs üres sáv fölötte)
{const st=document.createElement('style');st.textContent=`@media (orientation:landscape) and (max-height:520px){.stage{align-self:start!important}}`;document.head.appendChild(st);}

// a zónanevek ne takarjanak pöttyöt
MAP_ZONE_POS[2]=[60,40];MAP_ZONE_POS[3]=[90,64];
