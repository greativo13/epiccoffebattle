// ===== 24. kör: Kaelen páros támadásai (mindkét hős a saját testével vesz részt; festett tárgyak) =====
PAIRS.push(
 {a:'druid',b:'orc',name:'Medvelovaglás',elem:'phys',pow:1.9,rgb:'200,150,90',desc:'Kaelen óriás medvévé változik, Grog felpattan a hátára, és végigrohannak az ellenségeken: Grog fejszével vág, a medve tapos.'},
 {a:'druid',b:'monk',name:'Bambuszliget',elem:'nature',pow:1.7,rgb:'150,230,90',desc:'Bambuszerdő tör fel az ellenségek alatt, és felöklendezi őket; Jázmin a levegőben nyilazza le őket.'},
 {a:'druid',b:'wizard',name:'Villámbambusz',elem:'thunder',pow:1.8,rgb:'255,230,90',status:['stun',.35,1],desc:'Kaelen óriás bambuszlándzsákat döf az ellenségek mellé villámhárítónak, Zordon villámai beléjük csapnak, és átvezetik az áramot.'},
 {a:'druid',b:'witch',name:'Átokindák',elem:'dark',pow:1.7,rgb:'160,80,230',status:['curse',.8,1],desc:'Tüskés indák fonódnak az ellenségekre, Morgána fekete-lila lángja végigfut rajtuk, és megátkozza őket.'},
 {a:'druid',b:'fairy',name:'Harmatkör',elem:'nature',pow:1.2,rgb:'150,230,255',heal:.3,desc:'Óriás lótusz nyílik a csapat alatt, Lili tündérpora harmattá válik: a csapat 30%-ot gyógyul, a harmatcseppek pedig jéggolyóként csapódnak az ellenségekbe.'});

// Medvelovaglás
R16P['Medvelovaglás']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,orc=dr===A1?B1:A1,bear=R17I.wsbear,osp=ENEMY_SPR['orc-attack']||ENEMY_SPR.orc;
  kaeLeaves(cx(dr),midY(dr),60,380);sfx('growl');flash('150,230,90',.3,.15);const a0=dr.alpha==null?1:dr.alpha,b0=orc.alpha==null?1:orc.alpha;
  const B={x:cx(dr),y:dr.y+dr.oy+6,s:.4,a:0,rot:0,rider:0,ry:0,on:true};const W0=360;
  effects.push({update(){if(B.on&&B.run&&Math.random()<.8)part({x:B.x-W0*.3+rnd(-40,40),y:B.y,vx:rnd(-220,-80),vy:-rnd(30,120),life:.7,size:rnd(18,32),grow:24,rgb:'170,140,100',add:false,shape:'smoke'});return B.on;},
    draw(){if(B.a<=0)return;ctx.save();ctx.globalAlpha=B.a;const w=W0*B.s;if(!kaeImg('wsbear',B.x,B.y,w,{anchor:'bottom',rot:B.rot})){ctx.font='160px serif';ctx.fillText('🐻',B.x-80,B.y);}
      if(B.rider&&osp){const bh=bear?w*bear.height/bear.width:w*.68,hh=bh*.95,ww=hh*osp.width/osp.height;ctx.save();ctx.translate(B.x-w*.08,B.y-bh*.55+hh*.35+B.ry);ctx.rotate(B.rot);ctx.drawImage(osp,-ww/2,-hh,ww,hh);ctx.restore();}ctx.restore();}});
  await tween(320,k=>{dr.alpha=a0*(1-k);B.a=k;B.s=.4+.6*eOutBack(k);});sfx('roar');shake(10);
  // Grog felugrik a hátára
  const ox=cx(orc),oy=orc.y+orc.oy;await tween(380,k=>{orc.ox=(B.x-ox)*k;orc.jump=Math.sin(k*Math.PI)*120;});orc.alpha=0;orc.ox=0;orc.jump=0;B.rider=1;sfx('hit');shake(6);
  await tween(200,k=>B.ry=10*Math.sin(k*Math.PI));
  // roham
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x0=B.x,x1=Math.max(...xs.map(cx))+200,done=new Set();B.run=true;sfx('roar');
  await tween(1100,k=>{const e=k*k*(3-2*k);B.x=x0+(x1-x0)*e;B.rot=.06*Math.sin(k*40);B.ry=-Math.abs(Math.sin(k*30))*14;if(Math.random()<.2)shake(4);
    for(const t of xs)if(!done.has(t)&&B.x>cx(t)-60){done.add(t);sfx('slash');sfx('hit');shake(20);hitStop(80);flash('255,230,190',.25,.08);
      fxSpin('slash',cx(t),midY(t),{size:bigOf(t)*1.6,life:.3,s0:.6,s1:1.2,rot:-.6,add:true,in:.01,out:.2});for(let i=0;i<22;i++)part({x:cx(t),y:t.y+t.oy,vx:rnd(-300,300),vy:rnd(-420,-120),g:900,life:.8,size:rnd(6,12),rgb:pick(['140,110,80','110,90,60']),add:false,shape:'rock'});
      toss(t,110,520);t.hurt=.6;hit(dr,t,sk);}});
  B.run=false;for(const t of xs)if(!done.has(t)&&t.alive)hit(dr,t,sk);
  // vissza: megfordul és visszaüget
  await tween(700,k=>{B.x=x1+(x0-x1)*easeIO(k);B.rot=.04*Math.sin(k*30);});
  B.rider=0;orc.alpha=b0;await tween(300,k=>{orc.jump=Math.sin(k*Math.PI)*80;});orc.jump=0;
  kaeLeaves(B.x,B.y-120,50,340);await tween(300,k=>{B.a=1-k;dr.alpha=a0*k;});B.on=false;dr.alpha=a0;await dimTo(0,null,300);};

// Bambuszliget
R16P['Bambuszliget']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,monk=dr===A1?B1:A1;await r16Raise(dr,'150,230,90');sfx('rock');rumble&&rumble(1,8);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),F=[];for(const t of xs)for(let i=0;i<7;i++)F.push({x:cx(t)+(i-3)*30+rnd(-8,8),y:t.y+t.oy+10,h:rnd(260,420),w:rnd(16,24),lean:rnd(-.12,.12),d:i*40+rnd(0,60),k:0});
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;for(const f of F)f.k=Math.max(0,Math.min(1,(E.t-f.d)/260));return E.a>0;},draw(){for(const f of F)if(f.k>0){kaeStalk(f.x,f.y,f.h*eOutBack(f.k),f.w,E.a,f.lean);}}});
  for(const t of xs){for(let i=0;i<20;i++)part({x:cx(t)+rnd(-100,100),y:t.y+t.oy,vx:rnd(-200,200),vy:rnd(-420,-150),g:900,life:.8,size:rnd(6,11),rgb:pick(['120,95,60','90,140,60']),add:false,shape:'rock'});}
  await wait(250);shake(18);sfx('quake');const lift=new Map();
  // a bambusz feldobja őket
  await tween(420,k=>{for(const t of xs){t.jump=Math.sin(k*Math.PI*.5)*170;}});r16Lower(dr);
  // Jázmin a levegőben nyilazza őket
  monk.pose='attack';for(let r=0;r<2;r++)for(const t of xs){const h=handPos(monk);sfx('whoosh');flyObj(h,{x:cx(t),y:midY(t)-t.jump},200,(x,y)=>{ctx.save();ctx.translate(x,y);ctx.rotate(Math.atan2(midY(t)-t.jump-h.y,cx(t)-h.x));ctx.globalCompositeOperation='lighter';glow(0,0,26,'180,255,140',.8);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#5a3a1a';ctx.fillRect(-34,-2,38,4);ctx.fillStyle='#e8f0c0';ctx.beginPath();ctx.moveTo(4,-8);ctx.lineTo(20,0);ctx.lineTo(4,8);ctx.fill();ctx.restore();})
      .then(()=>{sfx('hit');kaeLeaves(cx(t),midY(t)-t.jump,10,240);t.hurt=.3;});await wait(110);}
  await wait(250);monk.pose='idle';await tween(260,k=>{for(const t of xs)t.jump=170*(1-k*k);});for(const t of xs){t.jump=0;shake(12);hit(dr,t,sk);}sfx('quake');
  await wait(300);await tween(500,k=>E.a=1-k);await dimTo(0,null,300);};

// Villámbambusz
R16P['Villámbambusz']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wiz=dr===A1?B1:A1;await dimTo(.6,'10,10,30',250);await r16Raise(dr,'150,230,90');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),R=xs.map(t=>({t,x:cx(t)+t.w*t.scale*.5+20,y:t.y+t.oy+10,k:0,glow:0}));
  effects.push({update(){return !R.done;},draw(){for(const r of R){if(r.k<=0)continue;kaeStalk(r.x,r.y,330*eOutBack(r.k),24,1,.04);if(r.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(r.x,r.y-330,70*r.glow,'255,240,140',.9*r.glow);ctx.restore();}}}});
  for(const r of R){sfx('rock');shake(8);for(let i=0;i<14;i++)part({x:r.x,y:r.y,vx:rnd(-160,160),vy:rnd(-300,-80),g:800,life:.7,size:rnd(5,10),rgb:'120,95,60',add:false,shape:'rock'});await tween(220,k=>r.k=k);}
  r16Lower(dr);await r16Raise(wiz,'255,230,90');sfx('thunder');
  for(let round=0;round<3;round++)for(const r of R){const x0=r.x+rnd(-60,60),bo=R17I.bolt;sfx('thunder');flash('255,250,200',.35,.08);shake(12);r.glow=1;
    const st={t:0};R18E({update(dt){st.t+=dt;r.glow=Math.max(0,1-st.t/.4);return st.t<.35;},draw(){const L=r.y-330;if(bo){const w=L*bo.width/bo.height*.9;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=1-st.t/.35;ctx.drawImage(bo,r.x-w/2,0,w,L);ctx.restore();}else r16Bolt(x0,0,r.x,r.y-330,'255,230,90',12);
      // az áram a bambuszon át az ellenségbe
      if(Math.random()<.8)r16Bolt(r.x,r.y-200,cx(r.t),midY(r.t),'255,230,90',7);}});
    sparks(cx(r.t),midY(r.t),['255,240,140','255,255,255'],20,460);r.t.hurt=.4;if(round===2){toss(r.t,50,360);hit(dr,r.t,sk);}await wait(round===2?160:90);}
  r16Lower(wiz);await wait(300);R.done=true;await dimTo(0,null,300);};

// Átokindák
R16P['Átokindák']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,wi=dr===A1?B1:A1;await dimTo(.6,'15,5,30',250);await r16Raise(dr,'150,230,90');sfx('rock');
  const V=al.map(t=>{const gx=cx(t),top=topY(t)+20,bot=t.y+t.oy,rx=t.w*t.scale*.55+18,P=[];for(let i=0;i<60;i++){const q=i/59,an=q*Math.PI*2*2.5;P.push({x:gx+Math.cos(an)*rx,y:bot-(bot-top)*q+Math.sin(an)*12});}return {t,P,k:0,burn:0};});
  effects.push({update(){for(const v of V)if(v.burn>0&&Math.random()<.6){const q=pick(v.P);darkFlame({x:q.x,y:q.y,vx:rnd(-20,20),vy:-rnd(60,140),life:.5,size:rnd(16,26)});}return !V.done;},draw(){for(const v of V)if(v.k>0)kaeVine(v.P,v.k,12);}});
  await tween(700,k=>{for(const v of V)v.k=easeIO(k);});for(const v of V){v.t.hurt=.3;shake(6);}r16Lower(dr);
  await r16Raise(wi,'160,80,230');sfx('dark');const h=handPos(wi);
  for(const v of V){flyObj(h,{x:cx(v.t),y:midY(v.t)},320,(x,y)=>darkFlame({x,y,vx:rnd(-20,20),vy:-rnd(20,60),life:.35,size:rnd(18,26)}),{arc:80});}
  await wait(360);sfx('fire');for(const v of V){v.burn=1;}flash('120,40,200',.35,.15);shake(14);
  for(let i=0;i<3;i++){for(const v of V){v.t.hurt=.3;sparks(cx(v.t),midY(v.t),['190,110,255','40,10,60'],12,320);}await wait(220);}
  for(const v of V){toss(v.t,40,320);hit(dr,v.t,sk);}r16Lower(wi);await wait(300);V.done=true;await dimTo(0,null,300);};

// Harmatkör
R16P['Harmatkör']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,fa=dr===A1?B1:A1;await Promise.all([r16Raise(dr,'150,230,90'),r16Raise(fa,'150,230,255')]);sfx('holy');
  const hs=S.heroes.filter(h=>h.alive),mx=hs.reduce((s,h)=>s+cx(h),0)/hs.length,gy=Math.max(...hs.map(h=>h.y+h.oy))+10,L={s:0,a:1};
  effects.unshift({update(){return L.a>0;},draw(){if(L.s<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-30,320*L.s,'170,240,200',.35*L.a);ctx.restore();if(R17I.lotus)r17Draw(R17I.lotus,mx,gy+40,560*L.s,{anchor:'bottom',sy:.55,a:L.a*.9});}});
  await tween(600,k=>L.s=eOutBack(k));
  // harmat hull a csapatra
  for(let i=0;i<60;i++)setTimeout(()=>{const h=pick(hs);part({x:cx(h)+rnd(-60,60),y:topY(h)-rnd(80,200),vx:0,vy:rnd(160,280),life:.8,size:rnd(4,8),rgb:pick(['180,240,255','255,255,255']),shape:'drop'});},i*18);
  await wait(800);healAll(dr,.3);for(const h of hs)for(const k of ['poison','burn','curse','foam'])if(h.st&&h.st[k])delete h.st[k];sfx('heal');
  // a harmatcseppek jéggolyóként az ellenségekbe
  r16Lower(fa);for(const t of al){for(let i=0;i<5;i++){const s={x:mx+rnd(-80,80),y:gy-rnd(150,250)};flyObj(s,{x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-40,30)},300+i*40,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,24,'170,230,255',.9);glow(x,y,8,'255,255,255',1);ctx.restore();},{arc:90});}}
  await wait(500);for(const t of al){sfx('ice');sparks(cx(t),midY(t),['180,240,255','255,255,255'],20,400);t.hurt=.4;hit(dr,t,sk);await wait(70);}
  r16Lower(dr);await tween(500,k=>L.a=1-k);};

// ---- A 3. térkép saját csatahátterei (festett): 9. fejezet matcha-patakos bambuszerdő, 10. zen-kert, 11. matchakádas barlang, 12. felhőpalota
{const TH={9:'matchastream',10:'zengarden',11:'matchacave',12:'cloudpalace'};for(const z of ZONES)for(const l of z.levels){const ch=parseInt(l.id,10);if(TH[ch])l.theme=TH[ch];}}
