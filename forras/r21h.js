
// ===== 23. kör, 4. rész: a régi hősök tesztlap-megjegyzései =====
ATTACKS.witch.name='Pálcacsapás';
// Égiháború: Zeusz villámai sárgák
let ZAP_PAL=null;
{const zs=zapStroke;zapStroke=function(pts,w,a){if(!ZAP_PAL)return zs.apply(this,arguments);const pass=[[w*3.2,ZAP_PAL[0],.3],[w*1.6,ZAP_PAL[1],.75],[w*.55,'255,255,235',1]];
  for(const [lw,c,al] of pass){ctx.strokeStyle=`rgba(${c},${al*a})`;ctx.lineWidth=lw;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}};}
{const z0=A.zeusStorm;A.zeusStorm=async function(u,ts,sk){ZAP_PAL=['255,170,20','255,220,60'];const gl=glow;glow=function(x,y,r,rgb,a){return gl.call(this,x,y,r,rgb==='120,200,255'?'255,210,80':rgb,a);};try{return await z0.apply(this,arguments);}finally{setTimeout(()=>{ZAP_PAL=null;glow=gl;},800);}};}
// Sötét alku: nincsenek lila lángok Morgána körül
let PACT_T=0,PACT_X=0;{const df=darkFlame;darkFlame=function(o){if(performance.now()<PACT_T&&o&&Math.abs(o.x-PACT_X)<170)return;return df.apply(this,arguments);};}
{const p0=A.pactFx;A.pactFx=async function(u){PACT_X=cx(u);PACT_T=performance.now()+9000;try{return await p0.apply(this,arguments);}finally{PACT_T=performance.now()+4000;}};}
// Napkitörés: a sárga vékony csíkok helyett lánggomolyok
{const s0=A.solarNova;A.solarNova=async function(){const pp=part;part=function(o){if(o&&o.shape==='streak'){o.shape='fire';o.size=(o.size||4)*2.2;}return pp.call(this,o);};try{return await s0.apply(this,arguments);}finally{part=pp;}};}
// Csillaghullás: egyféle, festett aranycsillag zápora (ugyanaz a csillag mindenhol), becsapódáskor csillagszikra
A.starfall=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await dimTo(.6,'5,5,30',300);await castPose(u,'255,240,170',420);sfx('holy');
  const im=()=>R17I.star||FX_IMG.star,S0=[];for(let i=0;i<46;i++){const t=al[i%al.length];S0.push({t,x:cx(t)+rnd(-110,110)-rnd(80,220),y:-80-rnd(0,260),tx:cx(t)+rnd(-90,90),ty:midY(t)+rnd(-70,60),d:i*55,s:rnd(70,130),r:rnd(0,6),hit:false});}
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;for(const p of S0){const k=(E.t-p.d)/520;if(k>=1&&!p.hit){p.hit=true;sparks(p.tx,p.ty,['255,240,170','255,255,255'],10,380);shake(4);}}return E.a>0;},
    draw(){const I=im();if(!I)return;ctx.save();ctx.globalAlpha=E.a;for(const p of S0){const k=(E.t-p.d)/520;if(k<0||k>1.15)continue;const q=Math.min(1,k),x=p.x+(p.tx-p.x)*q,y=p.y+(p.ty-p.y)*q*q;
      ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,p.s*.8,'255,230,140',.5*(k>1?1-(k-1)/.15:1));ctx.restore();ctx.save();ctx.translate(x,y);ctx.rotate(p.r+E.t/260);const s=p.s*(k>1?1-(k-1)/.15:1);ctx.drawImage(I,-s/2,-s/2,s,s);ctx.restore();}ctx.restore();}});
  await wait(46*55+300);for(const t of al){hit(u,t,sk);await wait(80);}await wait(400);E.a=0;u.pose='idle';await dimTo(0,null,300);};

// Titáncsapás: megnő, felugrik, és a Zúzáshoz hasonlóan hátrahajolva, nagy fejszeívvel előre csap le
A.titanAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const {mx,gy}=grp(al),s0=u.scale0||u.scale,big=s0*2.1;await dimTo(.66,'24,14,6',240);u.pose='cast';rumble(1.2,6);
  flash('255,200,120',.3,.25);for(let i=0;i<36;i++){const a=rnd(0,Math.PI*2),r=rnd(110,220),life=rnd(.4,.6);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r,vx:-Math.cos(a)*r/life,vy:-Math.sin(a)*r/life,life,size:rnd(3,6),rgb:pick(['255,200,120','150,140,130']),shape:'streak'});}
  await tween(750,k=>{u.scale=s0+(big-s0)*(1-Math.pow(1-k,3));});shake(10);await wait(150);
  const front=Math.min(...al.map(t=>t.x-t.w*t.scale*.5)),dx=front-u.x-u.w*big*.42-30,dy=gy-u.y;u.pose='attack';
  await tween(260,k=>{u.sq=1-.16*easeIO(k);u.lean=.1*k;});
  sfx('whoosh');ghosts(u,500);puffs(cx(u),u.y+u.oy,10,['190,170,140','150,130,110'],[24,40],{w:120,up:60});shake(8);const Sh={a:0,on:true};
  effects.push({update(){return Sh.on;},draw(){if(Sh.a<=0)return;ctx.save();ctx.globalAlpha=.45*Sh.a;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(u.x+dx+u.w*big*.1,gy+4,150*Sh.a+30,26*Sh.a+6,0,0,6.29);ctx.fill();ctx.restore();}});
  await tween(420,k=>{const e=easeIO(k);u.ox=dx*e*.6;u.oy=dy*e;u.jump=720*Math.sin(k*Math.PI/2);u.sq=1.12;u.lean=-.25*k;});
  await tween(380,k=>{Sh.a=k;u.ox=dx*(.6+.4*k);});rumble(.6,3);
  sfx('whoosh');const arc={a:0,k:0},AX=front+20;effects.push({update(){return arc.a>0||!arc.done;},draw(){if(arc.a<=0)return;const P={x:cx(u)+40,y:topY(u)+80},R=Math.max(260,Math.hypot(AX-P.x,gy-40-P.y)),a0=-2.2,a1=a0+2.6*arc.k;ctx.save();ctx.globalAlpha=arc.a;ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.strokeStyle='rgba(255,140,50,.5)';ctx.lineWidth=R*.32;ctx.beginPath();ctx.arc(P.x,P.y,R*.8,Math.max(a0,a1-1.5),a1);ctx.stroke();ctx.strokeStyle='rgba(255,240,200,.9)';ctx.lineWidth=8;ctx.beginPath();ctx.arc(P.x,P.y,R*.98,Math.max(a0,a1-1.5),a1);ctx.stroke();ctx.restore();}});await tween(230,k=>{const e=k*k;u.jump=720*(1-e);u.lean=-.25+.75*easeIO(k);u.sq=1.12-.12*k;arc.k=easeIO(k);arc.a=1;});u.jump=0;Sh.on=false;tween(350,k=>arc.a=1-k).then(()=>arc.done=true);
  flash('255,255,255',.85,.4);hitStop(200);rumble(2.2,28);punch(mx,gy-60,.1);sfx('rock');sfx('boom');
  const hitX=front+20;groundCrack(hitX,gy,'255,200,140',420);dustWave(hitX,gy);soundBlast(hitX,gy-30,'255,220,160',520,700);soundBlast(hitX,gy-30,'255,255,255',300,420);
  sparks(hitX,gy,['150,140,130','255,220,160','110,100,95'],90,900);r13Quake(u,al,true);puffs(hitX,gy-10,16,['190,170,140','150,130,110'],[30,60],{w:260,up:160});
  for(const t of al){toss(t,110,620);t.hurt=.6;hit(u,t,sk);}
  await wait(600);await tween(260,k=>{u.lean=.5*(1-easeIO(k));u.sq=.92+.08*k;});u.lean=0;u.sq=1;ghosts(u,300);await tween(340,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);});u.ox=0;u.oy=0;
  await tween(420,k=>{u.scale=big+(s0-big)*k;});u.scale=s0;u.pose='idle';await wait(300);await dimTo(0,null,300);};
if(typeof ELEM_NAMES==='object'){ELEM_NAMES.earth=ELEM_NAMES.earth||'föld';ELEM_NAMES.nature=ELEM_NAMES.nature||'természet';ELEM_NAMES.water=ELEM_NAMES.water||'víz';ELEM_NAMES.pure=ELEM_NAMES.pure||'tiszta';ELEM_NAMES.none=ELEM_NAMES.none||'semleges';}
// Térkép: a rajzolt pontsor (ösvény) nem kell – csak a pályapontok látszanak
{const st=document.createElement('style');st.textContent='.map-trail{display:none!important}';document.head.appendChild(st);}
if(typeof GUARD_RGB==='object')GUARD_RGB.druid='120,230,110';
// Napkitörés: a nap körüli vékony sárga ívek (protuberanciák) nem kellenek
{const ds=drawSun;drawSun=function(s){if(s&&s.proms)s.proms.length=0;return ds.apply(this,arguments);};}

// Idézés: a megidézett lény foroghat is (S0.rot) – a Mochi-király gurulásához
summonShow=async function(def,P){
  await dimTo(.72,'10,6,30',250);showBanner('Idézés: '+def.name,true);sfx('limit');
  const S0={a:0,s:.3,x:def.x||330,y:def.y||470,dead:false,rot:0},im=def.img&&def.img();
  fxSpin(tint('nova','200,160,255')||'nova',S0.x,S0.y-(def.h||280)*.5,{size:460,life:.6,s0:.2,s1:1,add:true});sparks(S0.x,S0.y-120,['200,160,255','255,255,255'],30,420);
  effects.push({t:0,update(dt){this.t+=dt;return !S0.dead;},draw(){if(!im)return;const H=(def.h||280)*S0.s,W2=H*im.width/im.height;
    ctx.save();ctx.globalAlpha=Math.max(0,S0.a);if(def.filter&&'filter' in ctx)ctx.filter=def.filter;ctx.translate(S0.x,S0.y+Math.sin(this.t*3)*4);if(S0.rot){ctx.translate(0,-H/2);ctx.rotate(S0.rot);ctx.translate(0,H/2);}if(def.flip)ctx.scale(-1,1);ctx.drawImage(im,-W2/2,-H,W2,H);ctx.restore();}});
  await tween(360,k=>{const e=1+2.2*Math.pow(k-1,3)+1.2*Math.pow(k-1,2);S0.a=Math.min(1,k*2);S0.s=.3+.7*e;});await wait(280);
  try{await def.run(P,S0);}catch(err){console.error(err);}
  await tween(300,k=>{S0.a=1-k;});S0.dead=true;await dimTo(0,null,250);};
// Mochi-király idézés: óriás mochigolyóként végiggurul az ellenségeken, mindegyiket beragasztja (kimaradnak egy körből)
{const mk=SUMMONS.find(s=>s.id==='mochiking');if(mk){mk.desc='Óriás mochigolyóvá gömbölyödik, végiggurul az ellenségeken, és mindegyiket beragasztja: kimaradnak egy körből (a főellenségek nem).';
  mk.run=async(P,S0)=>{const fs=foesAlive().sort((a,b)=>cx(a)-cx(b));if(!fs.length)return;const x0=S0.x,gy=Math.max(...fs.map(t=>t.y+t.oy))+10;sfx('whoosh');
    await tween(300,k=>{S0.y=470+(gy-470)*k;S0.rot=-k*1.2;});const done=new Set();const xEnd=Math.max(...fs.map(cx))+260;
    await tween(1300,k=>{const e=easeIO(k);S0.x=x0+(xEnd-x0)*e;S0.rot=-1.2+e*14;S0.y=gy-Math.abs(Math.sin(e*Math.PI*4))*40;
      for(let i=0;i<2;i++)part({x:S0.x-40,y:gy,vx:rnd(-160,-40),vy:rnd(-120,-20),g:500,life:.6,size:rnd(6,11),rgb:pick(['245,240,225','200,230,150']),add:false,shape:'drop'});
      for(const t of fs)if(!done.has(t)&&S0.x>cx(t)-20){done.add(t);shake(14);sfx('splash');burst(cx(t),midY(t),'245,240,225',30,320);toss&&toss(t,30,300);
        hit(P,t,{name:'Mochi-gurulás',kind:'phys',pow:2.2,elem:'phys',tgt:'enemies',status:['stun',1,1]});
        if(R17I.mochigoo){const G={a:1};const tt=t;effects.push({update(){G.a-=.008;return G.a>0&&tt.alive;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,G.a*1.4);r17Draw(R17I.mochigoo,cx(tt),tt.y+tt.oy+20,tt.w*tt.scale*1.6+40,{anchor:'bottom'});ctx.restore();}});}}});
    S0.x=-120;S0.rot=0;await tween(400,k=>{S0.x=-120+(x0+120)*k;});};}}
