
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
// Csillaghullás: sokkal több csillag zuhan
{const c0=A.starfall;A.starfall=async function(u,ts,sk){const al=ts.filter(t=>t.alive);for(let i=0;i<40;i++)setTimeout(()=>{const t=pick(al)||ts[0];if(!t)return;const x=cx(t)+rnd(-120,120);fxFly('star',x+rnd(-160,-60),-60,x,midY(t)+rnd(-60,60),rnd(420,620),{size:rnd(60,110),trail:['255,240,170','255,255,255'],spin:6,add:true});},i*45);return c0.apply(this,arguments);};}

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
