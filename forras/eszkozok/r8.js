// ===== 8. kör: a 2. térkép ellenfeleinek saját támadásai, új hangok, Mézkirálynő-figyelmeztetés =====
// ---- új hangok
Object.assign(SFX,{
  needle:()=>{tone('triangle',2400,1800,.05,.18);noise('highpass',9000,6000,.05,.15,.02);},
  glass:()=>{for(let i=0;i<7;i++)tone('triangle',2200+Math.random()*2400,1400,.18,.12,i*.025);noise('highpass',7000,2500,.25,.25);},
  lava:()=>{noise('lowpass',300,90,.9,.6);for(let i=0;i<8;i++)tone('sine',60+Math.random()*60,30,.25,.25,i*.08);noise('bandpass',700,200,.6,.3,.1);},
  dust:()=>{for(let i=0;i<10;i++)tone('sine',2600+Math.random()*2200,0,.22,.06,i*.04);},
  splash:()=>{noise('lowpass',2600,300,.35,.45);noise('bandpass',1200,400,.25,.2,.06);},
  buzz:()=>{tone('sawtooth',210,190,.5,.12);tone('sawtooth',214,200,.5,.12);},
  squish:()=>{tone('sine',260,90,.18,.3);noise('lowpass',800,150,.2,.25);},
  boing:()=>{tone('sine',180,520,.18,.3);tone('sine',520,260,.15,.2,.16);},
  whoosh:()=>{noise('bandpass',600,2400,.25,.3);},
  mirror:()=>{for(const [f,d] of [[1318,0],[1568,.07],[2093,.14]])tone('triangle',f,f*.98,.6,.12,d);noise('highpass',9000,7000,.4,.06);},
  string:()=>{tone('triangle',880,860,.5,.25);tone('sine',1760,1740,.4,.12);},
  growl:()=>{tone('sawtooth',90,70,.6,.3);noise('lowpass',400,120,.5,.3);},
});
// a korábbi animációk saját hangot kapnak
{const wrapS=(name,snd,delay=0)=>{const f=A[name];if(!f)return;A[name]=async function(u,ts,sk){setTimeout(()=>sfx(snd),delay/(S.speed||1));return f.apply(this,arguments);};};
 wrapS('voodooFx','needle',650);wrapS('pactFx','mirror',300);wrapS('magmaErupt','lava',500);wrapS('healAll','dust',400);wrapS('wandbonk','dust',350);
 wrapS('sleepStars','dust',700);wrapS('shellThrow','whoosh',100);wrapS('frogTongue','squish',150);wrapS('throwBomb','whoosh',150);}

// ---- Mézkirálynő: figyelmeztetés a csata elején
{const sb=startBattle;startBattle=async function(){const r=sb.apply(this,arguments);setTimeout(()=>{if(S.enemies.some(e=>e.type==='queenbee'&&e.alive)&&!S.over){showBanner('Tipp: előbb a méheket!',false);
  const q=S.enemies.find(e=>e.type==='queenbee');if(q)popLabel(q,'A MÉHEK GYÓGYÍTJÁK!','#ffe070');}},2600/(S.speed||1));return r;};}

// ---- közös segédek
const foeFrom=u=>({x:cx(u)-u.w*u.scale*.28,y:midY(u)-u.h*u.scale*.12});
function flyObj(from,to,ms,draw,o={}){return new Promise(res=>{const st={t:0};effects.push({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms);
    if(o.trail&&Math.random()<.9){const p=pos(k);part({x:p.x,y:p.y,vx:rnd(-40,40),vy:rnd(-40,40),life:o.trailLife||.35,size:rnd(2,5),rgb:pick(o.trail),add:o.trailAdd!==false,shape:o.trailShape||'dot'});}
    if(k>=1){res();return false;}return true;},draw(){const k=Math.min(1,st.t/ms),p=pos(k);draw(p.x,p.y,(o.spin||0)*st.t/1000+(o.rot||0),k);}});
  function pos(k){const e=o.ease?k*k:k;return {x:from.x+(to.x-from.x)*e,y:from.y+(to.y-from.y)*e-Math.sin(k*Math.PI)*(o.arc||0)};}});}
async function dashTo(u,t,ms=240,gap=10){const tx=t.x+((t.w*t.scale)/2+(u.w*u.scale)/2+gap),dx=tx-u.x,dy=(t.y+2)-u.y;u.pose='attack';ghosts(u,ms);
  await tween(ms,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*24;});return {dx,dy};}
async function dashBack(u,d,ms=260){u.pose='idle';await tween(ms,k=>{const e=easeIO(k);u.ox=d.dx*(1-e);u.oy=d.dy*(1-e);u.jump=Math.sin(k*Math.PI)*14;});u.ox=0;u.oy=0;u.jump=0;}
function rainOn(t,n,draw,o={}){return new Promise(res=>{const items=[];const x=cx(t),top=topY(t),gy=t.y+t.oy;for(let i=0;i<n;i++)items.push({x:x+rnd(-55,55),y:-40-rnd(0,260),vy:rnd(o.v0||380,(o.v0||380)+180),r:rnd(0,6),vr:rnd(-6,6),land:gy-rnd(10,t.h*t.scale*.8),done:false,a:1,s:rnd(.8,1.3)});
  effects.push({update(dt){let alive=false;for(const it of items){if(it.a<=0)continue;alive=true;if(!it.done){it.vy+=700*dt;it.y+=it.vy*dt;it.r+=it.vr*dt;if(it.y>=it.land){it.done=true;o.onLand&&o.onLand(it);t.hurt=.2;}}else it.a-=dt*3;}if(!alive){res();return false;}return true;},
    draw(){for(const it of items)if(it.a>0){ctx.save();ctx.globalAlpha=Math.max(0,it.a);draw(it.x,it.y,it.r,it.s);ctx.restore();}}});});}
function sweepWave(u,ts,draw,ms=1100){const x0=cx(u),x1=-160;const st={t:0};const done=new Set();return new Promise(res=>{effects.push({update(dt){st.t+=dt*1000;const k=Math.min(1,st.t/ms),x=x0+(x1-x0)*k;
    for(const t of ts)if(!done.has(t)&&cx(t)>=x-20&&k>.02&&cx(t)>x-60){}
    if(k>=1){res();return false;}return true;},draw(){const k=Math.min(1,st.t/ms);draw(x0+(x1-x0)*k,k);}});
  const order=ts.slice().sort((a,b)=>cx(b)-cx(a));for(const t of order){const k=(x0-cx(t))/(x0-x1);setTimeout(()=>{done.add(t);},k*ms/(S.speed||1));}});}
const hitAll=(u,ts,sk)=>{for(const t of ts)if(t.alive)hit(u,t,sk);};
function splat(x,y,rgbs,n=18,v=320,shape){for(let i=0;i<n;i++){const a=rnd(0,6.28),s=rnd(.3,1)*v;part({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,g:600,life:rnd(.4,.8),size:rnd(3,7),rgb:pick(rgbs),add:false,shape:shape||'dot'});}}

// ---- rajzolt kellékek
function drawCup(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle='#f6f1e8';ctx.strokeStyle='#3a3040';ctx.lineWidth=2;
  ctx.beginPath();ctx.moveTo(-16,-10);ctx.lineTo(16,-10);ctx.quadraticCurveTo(14,12,0,13);ctx.quadraticCurveTo(-14,12,-16,-10);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.beginPath();ctx.arc(18,0,6,-1.4,1.4);ctx.stroke();ctx.strokeStyle='#3a7ad0';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-12,-3);ctx.lineTo(12,-3);ctx.stroke();ctx.fillStyle='#8a5a2a';ctx.beginPath();ctx.ellipse(0,-10,15,3,0,0,6.29);ctx.fill();ctx.restore();}
function drawPlate(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.scale(s,s*.45);ctx.rotate(r);ctx.fillStyle='#fbf8f2';ctx.strokeStyle='#3a3040';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,22,0,6.29);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#3a7ad0';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,16,0,6.29);ctx.stroke();ctx.restore();}
function drawShard(x,y,r,s=1,col='#f4f0ea'){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle=col;ctx.strokeStyle='#2a3a6a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,-10);ctx.lineTo(8,4);ctx.lineTo(-2,10);ctx.lineTo(-7,2);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#3a7ad0';ctx.beginPath();ctx.moveTo(-3,-2);ctx.lineTo(4,1);ctx.stroke();ctx.restore();}
function drawSugar(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle='#ffffff';ctx.strokeStyle='#8a8aa0';ctx.lineWidth=1.5;ctx.fillRect(-9,-9,18,18);ctx.strokeRect(-9,-9,18,18);ctx.fillStyle='rgba(200,210,230,.8)';ctx.fillRect(-9,3,18,6);
  ctx.fillStyle='rgba(255,255,255,.9)';for(let i=0;i<4;i++)ctx.fillRect(-6+i*4,-6+(i%2)*4,1.5,1.5);ctx.restore();}
function drawLeafBlade(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);for(let i=0;i<3;i++){ctx.rotate(2.094);ctx.fillStyle=i%2?'#3f8a2a':'#5fb03a';ctx.strokeStyle='#1d3a10';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(10,-6,18,0);ctx.quadraticCurveTo(10,6,0,0);ctx.fill();ctx.stroke();}ctx.restore();}
function drawDart(x,y,r,len=46,col='#c8a050',tip='#3fa040'){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.strokeStyle='#3a2410';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-len,0);ctx.lineTo(0,0);ctx.stroke();ctx.strokeStyle=col;ctx.lineWidth=3;ctx.stroke();
  ctx.fillStyle=tip;ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(-4,-5);ctx.lineTo(-4,5);ctx.closePath();ctx.fill();ctx.fillStyle='#9a3';ctx.beginPath();ctx.moveTo(-len,0);ctx.lineTo(-len-8,-6);ctx.lineTo(-len+6,0);ctx.lineTo(-len-8,6);ctx.closePath();ctx.fill();ctx.restore();}
function drawFeather(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle='#fffdf4';ctx.strokeStyle='#c9b98a';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(0,-16);ctx.quadraticCurveTo(9,-4,2,14);ctx.lineTo(0,18);ctx.lineTo(-2,14);ctx.quadraticCurveTo(-9,-4,0,-16);ctx.fill();ctx.stroke();ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(0,18);ctx.stroke();ctx.restore();}
function drawFlame(x,y,s,t,rgb1='120,200,255',rgb2='230,250,255'){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,26*s,rgb1,.7);for(let i=0;i<3;i++){const h=(26-i*7)*s;ctx.fillStyle=`rgba(${i?rgb2:rgb1},${.85-i*.2})`;ctx.beginPath();ctx.moveTo(x-10*s+i*3*s,y+6*s);ctx.quadraticCurveTo(x-8*s,y-h*.5,x+Math.sin(t*12+i)*4*s,y-h);ctx.quadraticCurveTo(x+8*s,y-h*.5,x+10*s-i*3*s,y+6*s);ctx.closePath();ctx.fill();}ctx.restore();}
function drawHeart(x,y,s,col='#ff6fa8'){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle=col;ctx.strokeStyle='#7a1040';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(0,8);ctx.bezierCurveTo(-14,-2,-8,-14,0,-6);ctx.bezierCurveTo(8,-14,14,-2,0,8);ctx.fill();ctx.stroke();ctx.restore();}
function drawBlob(x,y,r,rgb,hl=true){const g=ctx.createRadialGradient(x-r*.3,y-r*.3,1,x,y,r);g.addColorStop(0,`rgb(${rgb.split(',').map(v=>Math.min(255,+v+70)).join(',')})`);g.addColorStop(1,`rgb(${rgb})`);ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,6.29);ctx.fill();if(hl){ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.ellipse(x-r*.35,y-r*.35,r*.25,r*.15,-.6,0,6.29);ctx.fill();}}
function drawStick(x0,y0,x1,y1,w,cols){ctx.save();ctx.lineCap='round';cols.forEach((c,i)=>{ctx.strokeStyle=c;ctx.lineWidth=w*(1-i*.35);ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();});ctx.restore();}
// hosszú szúrófegyver/ütő, ami a támadótól a célpontig nyúlik
async function reachWeapon(u,t,drawFn,ms=180,hold=120){const o=foeFrom(u),T={x:cx(t),y:midY(t)},S0={k:0,on:true};u.pose='attack';
  effects.push({update(){return S0.on;},draw(){const k=S0.k;drawFn(o.x,o.y,o.x+(T.x-o.x)*k,o.y+(T.y-o.y)*k,k);}});
  await tween(ms,k=>{S0.k=easeIO(k);});await wait(hold);return {back:async()=>{await tween(ms,k=>{S0.k=1-easeIO(k);});S0.on=false;u.pose='idle';},T};}

// ===== 5. fejezet: Teakert / Ködös csúcs =====
// Tealevél-manó – Levélvágás: három pörgő tealevél-shuriken
A.leafCut=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const o=foeFrom(u);
  await Promise.all([0,1,2].map(i=>wait(i*90).then(()=>flyObj(o,{x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-30,30)},300,(x,y,r)=>drawLeafBlade(x,y,r,1.3),{spin:22,arc:30-i*25,trail:['120,200,80','200,255,160']})).then(()=>{sfx('slash');sparks(cx(t),midY(t),['140,220,90','255,255,255'],8,280);t.hurt=.2;})));
  hit(u,t,sk);await wait(200);u.pose='idle';};
// Tealevél-manó – Teatüske: bambusznyíl tealevél-csóvával
A.teaDart=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await wait(150);sfx('needle');const o=foeFrom(u),T={x:cx(t),y:midY(t)},an=Math.atan2(T.y-o.y,T.x-o.x);
  await flyObj(o,T,240,(x,y)=>drawDart(x,y,an,46),{trail:['120,200,80','200,255,160'],trailShape:'leaf',trailAdd:false});sparks(T.x,T.y,['140,220,90','255,255,255'],10,260);hit(u,t,sk);await wait(250);u.pose='idle';};
// Gőzlidérc / Szamovár – Forrázás: forró vízsugár ív, gőzfelhő a találatnál
A.scaldJet=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const o=foeFrom(u),T={x:cx(t),y:midY(t)},J={k:0,on:true};
  effects.push({update(){if(J.on)for(let i=0;i<4;i++){const q=rnd(0,J.k);part({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*70,vx:rnd(-30,30),vy:rnd(-20,40),g:300,life:.3,size:rnd(2,4),rgb:pick(['200,235,255','255,255,255','150,200,240'])});}return J.on;},
    draw(){ctx.save();ctx.lineCap='round';for(const [w,c] of [[14,'rgba(150,200,240,.5)'],[7,'rgba(230,248,255,.9)']]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();for(let i=0;i<=20;i++){const q=i/20*J.k,x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*70;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();}ctx.restore();}});
  await tween(260,k=>{J.k=k;});
  for(let i=0;i<16;i++)part({x:T.x+rnd(-30,30),y:T.y+rnd(-20,20),vx:rnd(-50,50),vy:-rnd(40,120),life:rnd(.8,1.3),size:rnd(14,26),rgb:'235,240,245',add:false,shape:'smoke'});
  splat(T.x,T.y,['200,235,255','255,255,255'],14,260);t.hurt=.3;hit(u,t,sk);await wait(350);J.on=false;u.pose='idle';};
// Bambuszőr – Bambuszdöfés: hosszú bambuszlándzsa háromszor döf
A.bambooJab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const pole=(x0,y0,x1,y1)=>{drawStick(x0,y0,x1,y1,12,['#1f4a12','#5fa83a','#9ad46a']);ctx.save();ctx.strokeStyle='#1f4a12';ctx.lineWidth=3;for(let i=1;i<5;i++){const q=i/5,x=x0+(x1-x0)*q,y=y0+(y1-y0)*q;ctx.beginPath();ctx.arc(x,y,6,0,6.29);ctx.stroke();}
    const an=Math.atan2(y1-y0,x1-x0);ctx.fillStyle='#cfe8a8';ctx.strokeStyle='#1f4a12';ctx.translate(x1,y1);ctx.rotate(an);ctx.beginPath();ctx.moveTo(14,0);ctx.lineTo(-4,-8);ctx.lineTo(-4,8);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();};
  for(let i=0;i<3&&t.alive;i++){const r=await reachWeapon(u,t,pole,110,60);sfx('slash');sparks(r.T.x,r.T.y,['160,220,100','255,255,255'],8,260);t.hurt=.25;shake(4);if(i===2)hit(u,t,sk);await r.back();}};
// Tealopó majom – Elcsenés: odaszalad, kikap egy tárgyat, és visszaugrál
A.monkeySnatch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('whoosh');const d=await dashTo(u,t,220);sfx('hit');t.hurt=.3;sparks(cx(t),midY(t),['255,230,150','255,255,255'],10,260);hit(u,t,sk);
  const bag={on:true};effects.push({update(){return bag.on;},draw(){const x=cx(u)+10,y=topY(u)-10;ctx.save();ctx.fillStyle='#c8a060';ctx.strokeStyle='#4a3010';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,12,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='#4a3010';ctx.fillRect(x-4,y-15,8,5);ctx.restore();}});
  sfx('boing');await tween(380,k=>{const e=easeIO(k);u.ox=d.dx*(1-e);u.oy=d.dy*(1-e);u.jump=Math.abs(Math.sin(k*Math.PI*3))*40;});u.ox=0;u.oy=0;u.jump=0;bag.on=false;u.pose='idle';};
// Tealopó majom – Csészedobás: pörgő teáscsésze, ami szilánkokra törik
A.cupThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await wait(120);sfx('whoosh');const T={x:cx(t),y:midY(t)};
  await flyObj(foeFrom(u),T,380,(x,y,r)=>drawCup(x,y,r,1.4),{spin:12,arc:90,trail:['170,120,60'],trailAdd:false});sfx('glass');
  for(let i=0;i<12;i++){const s={x:T.x,y:T.y,vx:rnd(-260,260),vy:rnd(-300,-60),r:rnd(0,6),vr:rnd(-10,10),t:0};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<.8;},draw(){ctx.save();ctx.globalAlpha=1-s.t/.8;drawShard(s.x,s.y,s.r,.9);ctx.restore();}});}
  splat(T.x,T.y,['150,90,40','190,130,60'],14,280);t.hurt=.3;hit(u,t,sk);await wait(350);u.pose='idle';};
// Kannateknős – Páncélpörgés: behúzódik és pörögve becsapódik
A.shellSpin=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('whoosh');const tx=t.x+((t.w*t.scale)/2+(u.w*u.scale)/2),dx=tx-u.x,dy=(t.y+2)-u.y;u.pose='idle';
  for(let i=0;i<10;i++)part({x:cx(u),y:u.y+u.oy,vx:rnd(40,140),vy:-rnd(20,60),life:.6,size:rnd(8,14),rgb:'170,150,120',add:false,shape:'smoke'});
  await tween(420,k=>{const e=k*k;u.ox=dx*e;u.oy=dy*e;u.spin=k*30;if(Math.random()<.6)part({x:cx(u),y:u.y+u.oy,vx:rnd(40,140),vy:-rnd(20,60),life:.5,size:rnd(6,12),rgb:'170,150,120',add:false,shape:'smoke'});});
  sfx('rock');shake(10);hitStop(70);sparks(cx(t),midY(t),['255,240,200','200,180,140'],16,380);toss(t,30,300);hit(u,t,sk);
  await tween(380,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.spin=30+k*14;});u.ox=0;u.oy=0;u.spin=0;};
// Kannateknős – Forró öntés: a kanna-páncél csőréből forró tea ível a hősre
A.hotPour=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const o={x:cx(u)-u.w*u.scale*.4,y:topY(u)+u.h*u.scale*.35},T={x:cx(t),y:topY(t)+10},st={on:true};
  effects.push({update(){if(st.on)for(let i=0;i<5;i++){const q=rnd(0,1);part({x:o.x+(T.x-o.x)*q,y:o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*110,vx:rnd(-20,20),vy:rnd(-10,30),life:.25,size:rnd(3,6),rgb:pick(['170,100,40','200,130,60','230,170,90'])});}return st.on;},
    draw(){ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgba(170,100,40,.85)';ctx.lineWidth=9;ctx.beginPath();for(let i=0;i<=20;i++){const q=i/20,x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*110;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.restore();}});
  await wait(500);st.on=false;for(let i=0;i<14;i++)part({x:T.x+rnd(-30,30),y:T.y+rnd(-10,40),vx:rnd(-30,30),vy:-rnd(40,110),life:rnd(.8,1.2),size:rnd(14,24),rgb:'235,235,240',add:false,shape:'smoke'});
  splat(cx(t),midY(t),['170,100,40','220,160,80'],16,260);t.hurt=.3;hit(u,t,sk);await wait(300);u.pose='idle';};
// Szamovár-gólem – Vasököl: gőzt fújtatva előrevágja a vasöklét
A.ironFist=async(u,ts,sk)=>{const t=ts[0];if(!t)return;for(let i=0;i<14;i++)part({x:cx(u)+rnd(-30,30),y:topY(u)+rnd(0,20),vx:rnd(-40,40),vy:-rnd(80,180),life:rnd(.6,1),size:rnd(10,20),rgb:'240,240,245',add:false,shape:'smoke'});sfx('splash');
  await wait(250);const d=await dashTo(u,t,200,4);sfx('rock');shake(14);hitStop(90);punch(cx(t),midY(t),.05);
  if(FX_IMG.fist)fxSpin('fist',cx(t)+20,midY(t),{size:Math.max(170,bigOf(t)*.9),life:.4,s0:1.3,s1:.9,in:.02,out:.25,flip:true});
  sparks(cx(t),midY(t),['255,200,120','255,255,255','160,160,170'],22,480);toss(t,26,280);hit(u,t,sk);await wait(200);await dashBack(u,d);};

// ===== 6. fejezet: Porcelánváros =====
A.dollKiss=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('holy');const o=foeFrom(u),T={x:cx(t),y:midY(t)};
  await Promise.all([0,1,2].map(i=>wait(i*120).then(()=>flyObj({x:o.x,y:o.y-20},{x:T.x+rnd(-20,20),y:T.y+rnd(-30,10)},520,(x,y,r,k)=>drawHeart(x,y,1.2+Math.sin(k*20)*.1),{arc:50+i*20,trail:['255,150,200','255,220,240']})).then(()=>{sparks(T.x,T.y,['255,150,200','255,255,255'],8,220);t.hurt=.2;})));
  sfx('glass');for(let i=0;i<8;i++)part({x:T.x+rnd(-30,30),y:T.y+rnd(-30,30),vx:rnd(-60,60),vy:rnd(-60,20),life:.6,size:rnd(3,6),rgb:'255,200,230',shape:'star'});hit(u,t,sk);await wait(250);u.pose='idle';};
A.shardRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('glass');await wait(200);
  await Promise.all(al.map(t=>rainOn(t,10,(x,y,r,s)=>drawShard(x,y,r,s*1.4),{onLand:it=>{sfx('needle');sparks(it.x,it.y,['240,240,255','120,160,230'],4,160);}})));hitAll(u,al,sk);await wait(200);u.pose='idle';};
A.spoonStab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const spoon=(x0,y0,x1,y1)=>{drawStick(x0,y0,x1,y1,8,['#5a6070','#d8dce6']);const an=Math.atan2(y1-y0,x1-x0);ctx.save();ctx.translate(x1,y1);ctx.rotate(an);const g=ctx.createLinearGradient(-10,-10,10,10);g.addColorStop(0,'#ffffff');g.addColorStop(1,'#9aa0b0');ctx.fillStyle=g;ctx.strokeStyle='#4a5060';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(6,0,14,9,0,0,6.29);ctx.fill();ctx.stroke();ctx.restore();};
  const r=await reachWeapon(u,t,spoon,150,80);sfx('hit');sparks(r.T.x,r.T.y,['255,255,255','200,210,230'],12,320);shake(6);t.hurt=.3;hit(u,t,sk);await r.back();};
A.teaSplash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('splash');const T={x:cx(t),y:midY(t)};
  await flyObj(foeFrom(u),T,300,(x,y,r,k)=>{ctx.save();ctx.globalCompositeOperation='source-over';drawBlob(x,y,14+k*6,'150,90,40');ctx.restore();},{arc:70,trail:['150,90,40','190,130,60'],trailAdd:false});
  splat(T.x,T.y,['150,90,40','190,130,60','230,180,110'],26,340);for(let i=0;i<6;i++)part({x:T.x+rnd(-20,20),y:T.y,vx:rnd(-20,20),vy:-rnd(30,80),life:1,size:rnd(12,20),rgb:'235,235,240',add:false,shape:'smoke'});t.hurt=.3;hit(u,t,sk);await wait(300);u.pose='idle';};
A.clawPinch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,0);const x=cx(t),y=midY(t),C={k:0,on:true};
  effects.push({update(){return C.on;},draw(){ctx.save();ctx.translate(x+30,y);for(const s of [-1,1]){ctx.save();ctx.rotate(s*(.5-.45*C.k));ctx.fillStyle='#e0603a';ctx.strokeStyle='#5a1a0a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(-30,s*-26,-58,s*-6);ctx.quadraticCurveTo(-34,s*-8,0,s*6);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}ctx.restore();}});
  await tween(160,k=>{C.k=k;});sfx('slash');shake(8);hitStop(60);sparks(x,y,['255,140,90','255,255,255'],14,320);t.hurt=.3;hit(u,t,sk);await wait(150);await tween(120,k=>{C.k=1-k;});C.on=false;await dashBack(u,d);};
A.sugarToss=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const T={x:cx(t),y:midY(t)};
  await Promise.all([0,1,2,3].map(i=>wait(i*80).then(()=>flyObj(foeFrom(u),{x:T.x+rnd(-25,25),y:T.y+rnd(-30,20)},360,(x,y,r)=>drawSugar(x,y,r,1.3),{spin:10,arc:110,trail:['255,255,255'],trailAdd:false})).then(()=>{sfx('hit');splat(T.x,T.y,['255,255,255','230,235,245'],6,200);t.hurt=.2;})));hit(u,t,sk);await wait(200);u.pose='idle';};
A.lanternFire=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('fire');const o=foeFrom(u),T={x:cx(t),y:midY(t)};
  await Promise.all([0,1,2].map(i=>flyObj(o,T,520+i*60,(x,y,r,k)=>{const a=k*12+i*2.1,rr=30*(1-k);drawFlame(x+Math.cos(a)*rr,y+Math.sin(a)*rr,.9,k*3+i,'120,200,255','230,250,255');},{arc:30})));
  fxSpin(tint('nova','120,200,255')||'nova',T.x,T.y,{size:220,life:.5,s0:.2,s1:1,add:true,out:.3});sparks(T.x,T.y,['120,200,255','230,250,255'],18,340);t.hurt=.3;hit(u,t,sk);await wait(250);u.pose='idle';};
A.wispRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('dark');await dimTo(.5,'0,10,30',200);
  await Promise.all(al.map(t=>{const x=cx(t),y=midY(t),W=[0,1,2].map(i=>({x:x+rnd(-90,90),y:topY(t)-120-rnd(0,60),ph:rnd(0,6)}));const st={t:0};return new Promise(res=>effects.push({update(dt){st.t+=dt;for(const w of W){w.x+=(x-w.x)*dt*2.2;w.y+=(y-w.y)*dt*2.2;}if(st.t>1.1){res();return false;}return true;},draw(){for(const w of W)drawFlame(w.x+Math.sin(st.t*5+w.ph)*8,w.y,.8,st.t*2+w.ph);}}));}));
  for(const t of al){fxSpin(tint('nova','120,200,255')||'nova',cx(t),midY(t),{size:180,life:.4,s0:.2,s1:1,add:true});t.hurt=.3;}hitAll(u,al,sk);await wait(300);await dimTo(0,null,250);u.pose='idle';};
A.vaseSlam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,260,0);u.pose='attack';await tween(240,k=>{u.jump=Math.sin(k*Math.PI*.5)*120;});await tween(110,k=>{u.jump=120*(1-k*k);});u.jump=0;
  sfx('rock');sfx('glass');shake(16);hitStop(90);fxSpin('quakefx',cx(t),t.y+t.oy-6,{size:bigOf(t)*1.4,life:.7,s0:.4,s1:1,sy:.5,out:.4});for(let i=0;i<10;i++){const s={x:cx(t)+rnd(-40,40),y:t.y+t.oy-10,vx:rnd(-200,200),vy:-rnd(150,350),r:0,t:0,vr:rnd(-8,8)};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<.8;},draw(){drawShard(s.x,s.y,s.r,1.1);}});}
  for(let i=0;i<10;i++)part({x:cx(t)+rnd(-50,50),y:t.y+t.oy,vx:rnd(-80,80),vy:-rnd(20,80),life:1,size:rnd(14,24),rgb:'220,215,205',add:false,shape:'smoke'});toss(t,30,300);hit(u,t,sk);await wait(250);await dashBack(u,d);};
A.potCrush=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const x=cx(t),gy=t.y+t.oy,P={y:-200,a:1,s:1};
  effects.push({update(){return P.a>0;},draw(){ctx.save();ctx.globalAlpha=P.a;ctx.translate(x,P.y);ctx.scale(P.s,1/P.s);const R=70;ctx.fillStyle='#fbf8f2';ctx.strokeStyle='#2a3a6a';ctx.lineWidth=4;ctx.beginPath();ctx.ellipse(0,0,R,R*.8,0,0,6.29);ctx.fill();ctx.stroke();
    ctx.strokeStyle='#3a7ad0';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,0,R*.7,R*.5,0,0,6.29);ctx.stroke();ctx.fillStyle='#fbf8f2';ctx.strokeStyle='#2a3a6a';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(R*.8,-10);ctx.quadraticCurveTo(R*1.5,-30,R*1.6,-60);ctx.lineTo(R*1.45,-62);ctx.quadraticCurveTo(R*1.3,-25,R*.8,10);ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.ellipse(0,-R*.82,R*.4,R*.12,0,0,6.29);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(0,-R*.95,10,0,6.29);ctx.fill();ctx.stroke();ctx.restore();}});
  await tween(420,k=>{P.y=-200+(gy-60+200)*k*k;});sfx('rock');sfx('glass');shake(18);hitStop(110);P.s=1.15;
  for(let i=0;i<14;i++){const s={x:x+rnd(-50,50),y:gy-30,vx:rnd(-260,260),vy:-rnd(150,380),r:0,t:0,vr:rnd(-8,8)};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<.9;},draw(){drawShard(s.x,s.y,s.r,1.3);}});}
  splat(x,gy-20,['150,90,40','190,130,60'],20,360);toss(t,24,260);hit(u,t,sk);await tween(200,k=>{P.a=1-k;});P.a=0;u.pose='idle';};
A.plateStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('whoosh');const o=foeFrom(u);
  await Promise.all(al.flatMap(t=>[0,1,2].map(i=>wait(i*110+rnd(0,80)).then(()=>flyObj({x:o.x,y:o.y-40+i*20},{x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-30,20)},420,(x,y,r)=>drawPlate(x,y,r,1.6),{spin:20,arc:-40+i*40})).then(()=>{sfx('glass');for(let j=0;j<5;j++){const s={x:cx(t),y:midY(t),vx:rnd(-200,200),vy:-rnd(80,260),r:0,t:0};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=dt*8;return s.t<.6;},draw(){drawShard(s.x,s.y,s.r,.8);}});}t.hurt=.2;}))));
  hitAll(u,al,sk);await wait(200);u.pose='idle';};
A.teaFlood=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('splash');rumble(1,4);
  const wave=(x,k)=>{ctx.save();const H0=200;const g=ctx.createLinearGradient(0,H-H0,0,H);g.addColorStop(0,'rgba(190,130,60,.85)');g.addColorStop(1,'rgba(110,60,20,.95)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x+260,H);for(let i=0;i<=16;i++){const xx=x+260-i*30,yy=H-H0*(1-Math.abs(i-8)/12)+Math.sin(k*20+i)*10;ctx.lineTo(xx,yy);}ctx.lineTo(x-220,H);ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(255,240,220,.8)';ctx.lineWidth=5;ctx.beginPath();for(let i=0;i<=16;i++){const xx=x+260-i*30,yy=H-H0*(1-Math.abs(i-8)/12)+Math.sin(k*20+i)*10;i?ctx.lineTo(xx,yy):ctx.moveTo(xx,yy);}ctx.stroke();ctx.restore();if(Math.random()<.8)part({x:x+rnd(-100,100),y:H-200+rnd(0,40),vx:rnd(-200,0),vy:-rnd(80,240),g:700,life:.6,size:rnd(3,6),rgb:'220,170,100',add:false});};
  const order=al.slice().sort((a,b)=>cx(b)-cx(a));const p=sweepWave(u,al,wave,1200);for(const t of order){const k=(cx(u)-cx(t))/(cx(u)+160);setTimeout(()=>{if(t.alive){toss(t,40,380);hit(u,t,sk);}},k*1200/(S.speed||1));}await p;u.pose='idle';};

// ===== 7. fejezet: Cukorország =====
A.cubeBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,240,0);sfx('rock');shake(14);hitStop(90);
  for(let i=0;i<14;i++){const s={x:cx(t),y:midY(t),vx:rnd(-280,280),vy:-rnd(100,380),r:0,t:0,vr:rnd(-8,8)};effects.push({update(dt){s.t+=dt;s.vy+=900*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;return s.t<.9;},draw(){ctx.save();ctx.globalAlpha=1-s.t/.9;drawSugar(s.x,s.y,s.r,.8);ctx.restore();}});}
  sparks(cx(t),midY(t),['255,255,255','220,230,255'],20,420);toss(t,26,280);hit(u,t,sk);await wait(200);await dashBack(u,d);};
A.sugarDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('dust');const o=foeFrom(u);
  for(const t of al)for(let i=0;i<60;i++){const life=rnd(.6,.9);setTimeout(()=>part({x:o.x+rnd(-10,10),y:o.y+rnd(-10,10),vx:(cx(t)+rnd(-40,40)-o.x)/life,vy:(midY(t)+rnd(-50,40)-o.y)/life,life,size:rnd(1,2.5),rgb:pick(['255,255,255','240,240,255','255,240,250'])}),i*12);}
  await wait(900);for(const t of al){for(let i=0;i<8;i++)part({x:cx(t)+rnd(-40,40),y:midY(t)+rnd(-40,40),vx:rnd(-20,20),vy:rnd(-30,10),life:1.2,size:rnd(16,26),rgb:'245,245,250',add:false,shape:'smoke'});t.hurt=.2;}hitAll(u,al,sk);await wait(300);u.pose='idle';};
A.beeSting=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('buzz');const s0={x:cx(u),y:midY(u)},T={x:cx(t),y:midY(t)},keep={ox:u.ox,oy:u.oy};
  await tween(380,k=>{const x=s0.x+(T.x+30-s0.x)*k,y=s0.y+(T.y-s0.y)*k+Math.sin(k*Math.PI*6)*30;u.ox=x-s0.x;u.oy=y-s0.y;});sfx('needle');shake(6);sparks(T.x,T.y,['255,220,80','255,255,255'],12,300);t.hurt=.3;hit(u,t,sk);
  await tween(300,k=>{u.ox=(T.x+30-s0.x)*(1-k);u.oy=(T.y-s0.y)*(1-k)+Math.sin(k*Math.PI*4)*20;});u.ox=keep.ox;u.oy=keep.oy;};
A.honeyShot=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('squish');const T={x:cx(t),y:midY(t)};
  await flyObj(foeFrom(u),T,380,(x,y,r,k)=>{drawBlob(x,y,15,'230,160,30');ctx.fillStyle='rgba(230,160,30,.9)';ctx.beginPath();ctx.ellipse(x+12,y+4,8,5,0,0,6.29);ctx.fill();},{arc:80,trail:['240,180,40','255,210,90'],trailAdd:false});
  sfx('squish');splat(T.x,T.y,['230,160,30','255,200,70'],20,260);const drip={t:0};effects.push({update(dt){drip.t+=dt;if(Math.random()<.4)part({x:T.x+rnd(-30,30),y:T.y+rnd(-10,30),vx:0,vy:rnd(40,90),life:.6,size:rnd(2,4),rgb:'230,160,30',add:false,shape:'drop'});return drip.t<1;},draw(){}});t.hurt=.3;hit(u,t,sk);await wait(300);u.pose='idle';};
A.caneHook=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,20);const x=cx(t),y=midY(t),C={a:-2.2,on:true};
  effects.push({update(){return C.on;},draw(){const px=x+70,py=y-30,L=110;ctx.save();ctx.translate(px,py);ctx.rotate(C.a);ctx.lineCap='round';ctx.lineWidth=12;ctx.strokeStyle='#ffffff';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-L,0);ctx.arc(-L,-18,18,Math.PI/2,Math.PI*1.5,false);ctx.stroke();
    ctx.strokeStyle='#e0263a';ctx.lineWidth=12;ctx.setLineDash([10,10]);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(-L,0);ctx.arc(-L,-18,18,Math.PI/2,Math.PI*1.5,false);ctx.stroke();ctx.restore();}});
  sfx('whoosh');await tween(200,k=>{C.a=-2.2+2.0*easeIO(k);});sfx('hit');shake(8);sparks(x,y,['255,80,90','255,255,255'],14,320);t.hurt=.3;hit(u,t,sk);await wait(150);C.on=false;await dashBack(u,d);};
A.icingRain=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('squish');
  await Promise.all(al.map(t=>rainOn(t,9,(x,y,r,s)=>{drawBlob(x,y,10*s,pick(['255,190,220','255,255,255','190,230,255']));},{v0:300,onLand:it=>{sfx('squish');splat(it.x,it.y,['255,190,220','255,255,255'],5,150);}})));hitAll(u,al,sk);await wait(200);u.pose='idle';};
A.fluffRam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('boing');const d=await dashTo(u,t,300,-10);sfx('hit');shake(10);hitStop(60);
  for(let i=0;i<20;i++)part({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-30,30),vx:rnd(-200,200),vy:rnd(-200,60),drag:2,life:rnd(.8,1.3),size:rnd(10,18),rgb:pick(['255,190,225','230,200,255','255,255,255']),add:false,shape:'smoke'});toss(t,36,320);hit(u,t,sk);await wait(150);await dashBack(u,d);};
A.sweetDream=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('dust');
  for(const t of al){const x=cx(t),y=midY(t);effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.5)part({x:x+rnd(-60,60),y:y+rnd(-50,40),vx:rnd(-15,15),vy:-rnd(20,50),life:1,size:rnd(4,7),rgb:pick(['255,190,225','230,200,255']),shape:'star'});return this.t<1.4;},
    draw(){const a=Math.sin(Math.min(1,this.t/1.4)*Math.PI);ctx.save();ctx.globalAlpha=a*.8;for(let i=0;i<6;i++){const px=x+Math.cos(i*1.05+this.t)*50,py=y-20+Math.sin(i*1.05+this.t)*25;const g=ctx.createRadialGradient(px,py,0,px,py,40);g.addColorStop(0,'rgba(255,200,235,.7)');g.addColorStop(1,'rgba(230,200,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(px,py,40,0,6.29);ctx.fill();}
      for(let i=0;i<3;i++)drawHeart(x+Math.cos(this.t*2+i*2.1)*40,y-50+Math.sin(this.t*2+i*2.1)*14,.7);ctx.restore();}});}
  await wait(1000);hitAll(u,al,sk);await wait(400);u.pose='idle';};
A.scorpClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,0);const x=cx(t),y=midY(t);
  for(let i=0;i<2;i++){clawMarks(x+rnd(-10,10),y+rnd(-10,10),Math.max(130,bigOf(t)*.8),i?.5:-.5,'255,170,80');sfx('slash');shake(6);t.hurt=.25;await wait(140);}hit(u,t,sk);await wait(120);await dashBack(u,d);};
A.caramelSting=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const o={x:cx(u),y:topY(u)},T={x:cx(t),y:midY(t)},S0={k:0,on:true};
  effects.push({update(){if(S0.on&&Math.random()<.6)part({x:o.x+(T.x-o.x)*S0.k,y:o.y+(T.y-o.y)*S0.k-Math.sin(S0.k*Math.PI)*120,vx:0,vy:rnd(40,90),life:.6,size:rnd(2,4),rgb:'200,120,40',add:false,shape:'drop'});return S0.on;},
    draw(){ctx.save();ctx.lineCap='round';ctx.strokeStyle='#8a4a1a';ctx.lineWidth=12;ctx.beginPath();for(let i=0;i<=16;i++){const q=i/16*S0.k,x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q-Math.sin(q*Math.PI)*120;i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();ctx.strokeStyle='#d88a3a';ctx.lineWidth=6;ctx.stroke();
      const x=o.x+(T.x-o.x)*S0.k,y=o.y+(T.y-o.y)*S0.k-Math.sin(S0.k*Math.PI)*120;ctx.fillStyle='#3a1a08';ctx.beginPath();ctx.moveTo(x-14,y);ctx.lineTo(x+4,y-8);ctx.lineTo(x+4,y+8);ctx.closePath();ctx.fill();ctx.restore();}});
  await tween(260,k=>{S0.k=easeIO(k);});sfx('needle');shake(8);hitStop(60);sparks(T.x,T.y,['220,140,60','255,255,255'],14,300);t.hurt=.3;hit(u,t,sk);await wait(150);await tween(220,k=>{S0.k=1-k;});S0.on=false;u.pose='idle';};
A.jamWave=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('squish');rumble(.8,4);
  const wave=(x,k)=>{ctx.save();const H0=170,g=ctx.createLinearGradient(0,H-H0,0,H);g.addColorStop(0,'rgba(200,30,70,.9)');g.addColorStop(1,'rgba(110,10,40,.95)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x+240,H);for(let i=0;i<=14;i++){const xx=x+240-i*32,yy=H-H0*(1-Math.abs(i-7)/10)+Math.sin(k*14+i)*8;ctx.lineTo(xx,yy);}ctx.lineTo(x-210,H);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(255,180,200,.6)';for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(x+200-i*50,H-H0*.6+Math.sin(i)*20,6,0,6.29);ctx.fill();}ctx.restore();if(Math.random()<.7)part({x:x+rnd(-80,80),y:H-180,vx:rnd(-200,0),vy:-rnd(60,200),g:700,life:.6,size:rnd(3,6),rgb:'200,30,70',add:false});};
  const p=sweepWave(u,al,wave,1200);for(const t of al){const k=(cx(u)-cx(t))/(cx(u)+160);setTimeout(()=>{if(t.alive){sfx('squish');toss(t,30,320);hit(u,t,sk);}},k*1200/(S.speed||1));}await p;u.pose='idle';};
A.jamHand=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('squish');const o=foeFrom(u),T={x:cx(t),y:midY(t)},S0={k:0,on:true};
  effects.push({update(){return S0.on;},draw(){const x=o.x+(T.x-o.x)*S0.k,y=o.y+(T.y-o.y)*S0.k;ctx.save();ctx.lineCap='round';ctx.strokeStyle='rgba(200,30,70,.95)';ctx.lineWidth=26;ctx.beginPath();ctx.moveTo(o.x,o.y);ctx.quadraticCurveTo((o.x+x)/2,Math.min(o.y,y)-50,x,y);ctx.stroke();
    ctx.fillStyle='#c81e46';for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(x-18,y-24+i*14,14,7,-.3,0,6.29);ctx.fill();}drawBlob(x,y,26,'200,30,70');ctx.restore();}});
  await tween(220,k=>{S0.k=easeIO(k);});sfx('squish');shake(10);hitStop(70);splat(T.x,T.y,['200,30,70','255,120,150'],22,320);t.hurt=.35;hit(u,t,sk);await wait(200);await tween(200,k=>{S0.k=1-k;});S0.on=false;u.pose='idle';};

// ===== 8. fejezet: Álomvilág =====
A.pillowBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,240,10);sfx('whoosh');await wait(80);sfx('hit');shake(8);hitStop(60);
  for(let i=0;i<16;i++){const f={x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-20,20),vx:rnd(-160,160),vy:rnd(-220,-40),r:rnd(0,6),t:0};effects.push({update(dt){f.t+=dt;f.vy+=120*dt;f.vx*=.97;f.x+=f.vx*dt+Math.sin(f.t*6)*1.5;f.y+=f.vy*dt;f.r+=dt*3;return f.t<1.6;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.6-f.t)*2);drawFeather(f.x,f.y,f.r,1);ctx.restore();}});}
  toss(t,28,300);hit(u,t,sk);await wait(150);await dashBack(u,d);};
A.featherStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('wind');
  await Promise.all(al.map(t=>rainOn(t,10,(x,y,r,s)=>drawFeather(x+Math.sin(y*.05)*10,y,r*.4,s*1.3),{v0:200,onLand:it=>{sparks(it.x,it.y,['255,255,255'],3,120);}})));hitAll(u,al,sk);await wait(200);u.pose='idle';};
A.mothDust=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('dust');const o={x:cx(u),y:midY(u)};
  for(const t of al){const T={x:cx(t),y:midY(t)};for(let i=0;i<50;i++)setTimeout(()=>{const k0=rnd(0,1);part({x:o.x,y:o.y,vx:(T.x-o.x)/.9+Math.cos(i)*80,vy:(T.y-o.y)/.9+Math.sin(i)*80,drag:.2,life:.9,size:rnd(1,2.5),rgb:pick(['230,210,140','255,240,190','200,180,255'])});},i*14);}
  await wait(1000);for(const t of al){effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const a=1-this.t/.6;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(t),midY(t),70,'230,210,140',.6*a);ctx.restore();}});t.hurt=.2;}hitAll(u,al,sk);await wait(300);u.pose='idle';};
A.moonBeam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('mirror');await dimTo(.55,'5,8,30',200);const x=cx(t),gy=t.y+t.oy;
  const M={a:0};effects.push({update(){return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;ctx.globalCompositeOperation='lighter';glow(x,70,90,'200,220,255',.6);ctx.globalCompositeOperation='source-over';ctx.fillStyle='#f4f6ff';ctx.beginPath();ctx.arc(x,70,38,0,6.29);ctx.fill();ctx.fillStyle='rgba(180,190,220,.6)';ctx.beginPath();ctx.arc(x-10,62,8,0,6.29);ctx.arc(x+12,80,6,0,6.29);ctx.fill();ctx.restore();}});
  await tween(350,k=>{M.a=k;});lightPillar(x,gy,Math.max(60,t.w*t.scale*.5),.9);sfx('holy');await wait(300);sparks(x,midY(t),['200,220,255','255,255,255'],18,320);t.hurt=.3;hit(u,t,sk);await wait(400);M.done=true;await tween(300,k=>{M.a=1-k;});M.a=0;await dimTo(0,null,250);u.pose='idle';};
A.sandThrow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('whoosh');const o=foeFrom(u),T={x:cx(t),y:midY(t)};
  for(let i=0;i<70;i++){const life=rnd(.35,.55),a=rnd(-.3,.3);part({x:o.x,y:o.y,vx:(T.x-o.x)/life+rnd(-60,60),vy:(T.y-o.y)/life+rnd(-80,80),life,size:rnd(1.2,3),rgb:pick(['230,200,140','210,180,120','250,230,180']),add:false});}
  await wait(450);for(let i=0;i<8;i++)part({x:T.x+rnd(-30,30),y:T.y+rnd(-20,20),vx:rnd(-40,40),vy:rnd(-20,20),life:1,size:rnd(12,20),rgb:'225,200,150',add:false,shape:'smoke'});t.hurt=.3;hit(u,t,sk);await wait(300);u.pose='idle';};
A.sandStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('wind');await dimTo(.3,'80,60,20',200);const st={t:0};
  effects.push({update(dt){st.t+=dt;for(let i=0;i<10;i++)part({x:W+20,y:rnd(150,H),vx:-rnd(500,900),vy:rnd(-40,40),life:1.4,size:rnd(1.2,3),rgb:pick(['230,200,140','210,180,120']),add:false});if(Math.random()<.5)part({x:W,y:rnd(250,H),vx:-rnd(300,500),vy:0,life:1.6,size:rnd(20,34),rgb:'215,190,140',add:false,shape:'smoke'});return st.t<1.5;},
    draw(){ctx.save();ctx.fillStyle=`rgba(210,180,120,${.25*Math.sin(Math.min(1,st.t/1.5)*Math.PI)})`;ctx.fillRect(0,0,W,H);ctx.restore();}});
  await wait(700);for(const t of al)t.hurt=.3;hitAll(u,al,sk);await wait(800);await dimTo(0,null,250);u.pose='idle';};
A.dreadClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,200,0);for(let i=0;i<3;i++){clawMarks(cx(t)+rnd(-15,15),midY(t)+rnd(-15,15),Math.max(150,bigOf(t)*.9),[-.5,.5,-.2][i],'150,60,230');sfx('slash');shake(7);t.hurt=.25;await wait(120);}
  hit(u,t,sk);await wait(120);await dashBack(u,d);};
A.nightTerror=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u.pose='attack';sfx('dark');await dimTo(.6,'10,0,20',250);
  const wave=(x,k)=>{ctx.save();const g=ctx.createLinearGradient(x-200,0,x+200,0);g.addColorStop(0,'rgba(20,0,40,0)');g.addColorStop(.5,'rgba(30,0,60,.85)');g.addColorStop(1,'rgba(20,0,40,0)');ctx.fillStyle=g;ctx.fillRect(x-200,200,400,H-200);
    for(let i=0;i<6;i++){const ex=x+Math.sin(i*1.7)*120,ey=280+i*40+Math.cos(k*10+i)*10;ctx.globalCompositeOperation='lighter';glow(ex,ey,10,'255,40,80',.9);glow(ex+16,ey,10,'255,40,80',.9);ctx.globalCompositeOperation='source-over';}ctx.restore();};
  const p=sweepWave(u,al,wave,1300);for(const t of al){const k=(cx(u)-cx(t))/(cx(u)+160);setTimeout(()=>{if(t.alive){sfx('dark');t.hurt=.4;hit(u,t,sk);}},k*1300/(S.speed||1));}await p;await dimTo(0,null,250);u.pose='idle';};
A.bearHug=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,280,-30);sfx('growl');for(let i=0;i<3;i++){t.hurt=.3;shake(5);for(let j=0;j<3;j++)drawHeartBurst(cx(t),topY(t));await wait(180);}
  hit(u,t,sk);await wait(150);await dashBack(u,d);};
function drawHeartBurst(x,y){const h={x:x+rnd(-30,30),y,vy:-rnd(40,80),t:0};effects.push({update(dt){h.t+=dt;h.y+=h.vy*dt;return h.t<.8;},draw(){ctx.save();ctx.globalAlpha=1-h.t/.8;drawHeart(h.x,h.y,.8,'#ff5a7a');ctx.restore();}});}
A.stringSnap=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('string');const o=foeFrom(u),T={x:cx(t),y:midY(t)},S0={k:0,a:1,on:true,t:0};
  effects.push({update(dt){S0.t+=dt;return S0.on;},draw(){ctx.save();ctx.globalAlpha=S0.a;ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,230,140,.95)';ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<=30;i++){const q=i/30*S0.k,x=o.x+(T.x-o.x)*q,y=o.y+(T.y-o.y)*q+Math.sin(q*30-S0.t*40)*14*(1-q*.3);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.stroke();glow(o.x+(T.x-o.x)*S0.k,o.y+(T.y-o.y)*S0.k,24,'255,230,140',.8);ctx.restore();}});
  await tween(220,k=>{S0.k=easeIO(k);});sfx('string');shake(8);sparks(T.x,T.y,['255,230,140','255,255,255'],16,340);t.hurt=.3;hit(u,t,sk);await tween(300,k=>{S0.a=1-k;});S0.on=false;u.pose='idle';};
A.teaCeremony=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('holy');const o=foeFrom(u),T={x:cx(t),y:midY(t)};
  const petals=[];for(let i=0;i<14;i++)petals.push({a:i/14*6.283,r:rnd(30,60)});const C={k:0,on:true,t:0};
  effects.push({update(dt){C.t+=dt;return C.on;},draw(){const x=o.x+(T.x-o.x)*C.k,y=o.y+(T.y-o.y)*C.k-Math.sin(C.k*Math.PI)*80;drawCup(x,y,Math.sin(C.t*4)*.2,1.6);for(const p of petals){const a=p.a+C.t*3,px=x+Math.cos(a)*p.r,py=y+Math.sin(a)*p.r*.5;ctx.save();ctx.translate(px,py);ctx.rotate(a);ctx.fillStyle='#fffbe8';ctx.strokeStyle='#d8c070';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(0,0,8,3.5,0,0,6.29);ctx.fill();ctx.stroke();ctx.restore();}
    ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,'255,230,140',.4);ctx.restore();}});
  await wait(300);await tween(700,k=>{C.k=easeIO(k);});C.on=false;sfx('splash');for(let i=0;i<20;i++)part({x:T.x,y:T.y,vx:rnd(-200,200),vy:rnd(-220,40),g:300,life:rnd(.8,1.2),size:rnd(4,7),rgb:pick(['255,250,230','255,230,140']),add:false,shape:'leaf'});
  splat(T.x,T.y,['230,190,80','255,230,140'],14,240);t.hurt=.3;hit(u,t,sk);await wait(350);u.pose='idle';};

// ---- hozzárendelés
{const M={leafcut:'leafCut',teadart:'teaDart',scald:'scaldJet',bamboojab:'bambooJab',cupthrow:'cupThrow',shellspin:'shellSpin',hotpour:'hotPour',ironfist:'ironFist',
  dollkiss:'dollKiss',crackshard:'shardRain',spoonstab:'spoonStab',teasplash:'teaSplash',pinch:'clawPinch',sugartoss:'sugarToss',lanternfire:'lanternFire',willolight:'wispRain',vaseslam:'vaseSlam',potcrush:'potCrush',platestorm:'plateStorm',teaflood:'teaFlood',
  cubebash:'cubeBash',sugardust:'sugarDust',sting:'beeSting',honeyshot:'honeyShot',candycane:'caneHook',icingbomb:'icingRain',fluffram:'fluffRam',sweetdream:'sweetDream',clawsnap:'scorpClaw',caramelsting:'caramelSting',jamwave:'jamWave',stickyhand:'jamHand',
  pillowbash:'pillowBash',featherstorm:'featherStorm',dustwing:'mothDust',moonbeam:'moonBeam',sandthrow:'sandThrow',sandstorm:'sandStorm',dreadclaw:'dreadClaw',nightterror:'nightTerror',bearhug:'bearHug',stringsnap:'stringSnap',teaceremony:'teaCeremony'};
 for(const k in M)if(ESK[k]&&A[M[k]]){ESK[k].anim=M[k];NOFX.add(M[k]);}
 // a majom nem nyelvvel lop: a saját Elcsenés-animációja (a mézeskalács-bandita ugyanígy)
 if(ESK.snatch)ESK.snatch.anim='monkeySnatch';NOFX.add('monkeySnatch');}
