
// ===== 23. kör, 3. rész: festett, élethű tárgyak (Canva) – ha a kép megvan, azt rajzoljuk, különben a régi rajz marad =====
const R3=k=>R17I[k];
{const t0=tileShard;tileShard=function(x,y,s,r,c){const im=R3('tile');if(!im)return t0.apply(this,arguments);ctx.save();ctx.translate(x,y);ctx.rotate(r);const w=s*1.9;ctx.drawImage(im,-w/2,-w/2,w,w);ctx.restore();};}
{const f0=drawFoamBlob;drawFoamBlob=function(x,y,r,a=1){const im=R3('foam');if(!im)return f0.apply(this,arguments);ctx.save();ctx.globalAlpha*=a;const w=r*3.2;ctx.drawImage(im,x-w/2,y-w/2,w,w*im.height/im.width);ctx.restore();};}
{const m0=drawShroom;drawShroom=function(x,y,s,c){const im=R3('mushroom');if(!im)return m0.apply(this,arguments);if(s<=0)return;const w=95*s;ctx.drawImage(im,x-w/2,y-w*im.height/im.width,w,w*im.height/im.width);};}
// gyökérketrec: festett gyökérketrec nő ki a földből az ellenfél köré
{const c0=rootCage;rootCage=function(t,keep){if(!R3('rootcage'))return c0.apply(this,arguments);const gx=cx(t),gy=t.y+t.oy+16,W=Math.max(150,t.w*t.scale*1.7),C={k:0,a:1};
  effects.push({update(){if(!S.enemies.includes(t))C.a=0;if(C.k>=1&&!keep())C.a-=.04;return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.globalAlpha=Math.max(0,C.a);r17Draw(R3('rootcage'),gx,gy,W,{anchor:'bottom',sy:C.k});ctx.restore();}});return C;};}
// Kőőr kőfala: festett, mohás templomfal emelkedik elé, nagy porral
{const s0=A.stoneWall;A.stoneWall=async(u,ts,sk)=>{const im=R3('stonewall');if(!im)return s0(u,ts,sk);u.pose='cast';sfx('quake');shake(16);const gx=cx(u)-u.w*u.scale*.8,gy=u.y+u.oy+20,Wd=Math.max(200,u.w*u.scale*1.25),W={k:0,a:1,ready:false};
  effects.push({update(){if(!S.enemies.includes(u))W.a=0;if(W.ready&&!(u.alive&&u.st&&u.st.stonewall))W.a-=.03;return W.a>0;},draw(){if(W.k<=0)return;ctx.save();ctx.globalAlpha=Math.max(0,W.a);r17Draw(im,gx,gy,Wd,{anchor:'bottom',sy:W.k});ctx.restore();}});
  for(let i=0;i<50;i++)part({x:gx+rnd(-Wd/2,Wd/2),y:gy,vx:rnd(-220,220),vy:rnd(-380,-120),life:rnd(.7,1.1),size:rnd(6,12),rgb:pick(['140,130,110','110,100,85']),g:700,add:false,shape:'rock'});
  puffs&&puffs(gx,gy,14,['170,160,140','140,130,110'],[20,40],{w:Wd*.6,up:110});await tween(520,k=>W.k=eOutBack(k));addStatus(u,'stonewall',2);W.ready=true;popLabel(u,'KŐFAL!','#c9bfae');await wait(400);u.pose='idle';};}
// Kaelen bambuszfala: festett bambuszfal nő a társ elé
{const b0=A.barkCage;A.barkCage=async(u,ts,sk)=>{const im=R3('bamboowall'),t=ts[0];if(!im||!t)return b0(u,ts,sk);u.pose='cast';await bodyWind(u,200,.1);const gx=cx(t)+t.w*t.scale*1.05,gy=t.y+t.oy+22,Wd=Math.max(230,t.w*t.scale*1.8),C={k:0,a:1};
  effects.push({update(){if(S.over||!S.heroes.includes(t))C.a=0;if(C.ready&&!(t.alive&&t.st&&t.st.bamwall))C.a-=.03;return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.globalAlpha=Math.max(0,C.a)*.72;r17Draw(im,gx,gy,Wd,{anchor:'bottom',sy:C.k});ctx.restore();}});
  sfx('quake');shake(10);kaeLeaves(gx,gy-60,30,300,120);for(let i=0;i<30;i++)part({x:gx+rnd(-Wd/2,Wd/2),y:gy,vx:rnd(-200,200),vy:rnd(-340,-120),life:.9,size:rnd(6,10),rgb:'120,90,60',g:700,add:false,shape:'rock'});
  await tween(480,k=>C.k=eOutBack(k));flash('170,230,110',.2,.15);hit(u,t,sk);C.ready=true;popLabel(t,'BAMBUSZFAL!','#b8e07a');await wait(400);await bodySettle(u);u.pose='idle';};}
// Mochi ragacsos ölelése: festett, csöpögő mochi-ragacs borítja be a hőst
{const m0=A.mochiHug;A.mochiHug=async(u,ts,sk)=>{const im=R3('mochigoo'),t=ts[0];if(!im||!t)return m0(u,ts,sk);await tween(220,k=>u.sq=1-.22*Math.sin(k*Math.PI));const d=await dashTo(u,t,240,-30);const G={k:0,a:1},Wd=t.w*t.scale*1.9+60;
  effects.push({update(){return G.a>0;},draw(){if(G.k<=0)return;ctx.save();ctx.globalAlpha=G.a;r17Draw(im,cx(t),t.y+t.oy+20,Wd*(.5+.5*G.k),{anchor:'bottom',sy:G.k});ctx.restore();}});
  await tween(280,k=>G.k=eOutBack(k));shake(12);sfx('splash');hit(u,t,sk);await wait(650);await tween(350,k=>G.a=1-k);await dashBack(u,d);u.sq=1;u.pose='idle';};}
// Zen-sárkány: festett kőfelhő, festett kavicsok zuhannak belőle
{const r0=A.stoneCloudRain;A.stoneCloudRain=async(u,ts,sk)=>{const cl=R3('rockcloud');if(!cl)return r0(u,ts,sk);u.pose='cast';sfx('quake');const xs=ts.map(cx),x0=Math.min(...xs)-140,x1=Math.max(...xs)+140,C={a:0,y:-120};
  effects.push({update(){return C.a>0||!C.done;},draw(){if(C.a<=0)return;ctx.save();ctx.globalAlpha=C.a;r17Draw(cl,(x0+x1)/2,C.y,(x1-x0)+120);ctx.restore();}});
  await tween(500,k=>{C.a=k;C.y=-120+200*easeIO(k);});const pb=R3('pebble'),P=[];for(let i=0;i<70;i++)P.push({x:rnd(x0+40,x1-40),y:120+rnd(-30,20),vy:rnd(520,760),d:i*12,r:rnd(0,6),s:rnd(30,60),land:rnd(380,500)});
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;for(const p of P)if(E.t>p.d&&p.y<p.land){p.y+=p.vy*dt;p.r+=dt*6;if(p.y>=p.land){shake(2);for(let j=0;j<3;j++)part({x:p.x,y:p.land,vx:rnd(-120,120),vy:rnd(-160,-60),g:600,life:.5,size:rnd(3,6),rgb:'150,140,120',add:false,shape:'rock'});}}return E.a>0;},
    draw(){ctx.save();ctx.globalAlpha=E.a;for(const p of P){if(E.t<p.d)continue;if(pb){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.drawImage(pb,-p.s/2,-p.s/2,p.s,p.s*pb.height/pb.width);ctx.restore();}else{ctx.fillStyle='#8a8478';ctx.beginPath();ctx.arc(p.x,p.y,p.s/3,0,7);ctx.fill();}}ctx.restore();}});
  await wait(900);for(const t of ts){shake(9);hit(u,t,sk);await wait(80);}C.done=true;await wait(400);await tween(450,k=>{C.a=1-k;E.a=1-k;});u.pose='idle';};}
// Zen-sárkány: festett, gereblyézett kőhullám hömpölyög végig a szájától
{const w0=A.stoneWave;A.stoneWave=async(u,ts,sk)=>{const im=R3('stonewave');if(!im)return w0(u,ts,sk);u.pose='attack';await bodyWind(u,240,-.14);sfx('quake');const m=SP(u,.12,.3),W={x:m.x,a:1,s:.4};
  effects.push({update(){return W.a>0;},draw(){ctx.save();ctx.globalAlpha=W.a;r17Draw(im,W.x,530,360*W.s,{anchor:'bottom',fx:true});ctx.restore();}});
  bodyStrike(u,150,.2);const done=new Set();await tween(1000,k=>{W.x=m.x-(m.x+80)*k;W.s=.5+.5*Math.min(1,k*3);for(let i=0;i<3;i++)part({x:W.x+rnd(0,140),y:rnd(330,500),vx:rnd(-180,-40),vy:rnd(-280,-80),g:600,life:.7,size:rnd(5,10),rgb:pick(['170,160,140','120,110,95']),add:false,shape:'rock'});
    for(const t of ts)if(!done.has(t)&&W.x<cx(t)){done.add(t);shake(12);hit(u,t,sk);}});await tween(300,k=>W.a=1-k);await bodySettle(u);u.pose='idle';};}
// Meditáció: festett lótusz nyílik alatta
{const z0=A.zenMeditate;A.zenMeditate=async(u,ts,sk)=>{const im=R3('lotus');if(!im)return z0(u,ts,sk);u.pose='cast';sfx('buff');const gx=cx(u),gy=u.y+u.oy+20,L={k:0,a:1,t:0},W=Math.max(220,u.w*u.scale*1.6);
  effects.push({update(dt){L.t+=dt;return L.a>0;},draw(){ctx.save();ctx.globalAlpha=L.a;glow(gx,gy-u.h*u.scale*.5,W,'255,220,120',.35*L.k);r17Draw(im,gx,gy,W*L.k,{anchor:'bottom'});ctx.restore();}});
  await tween(550,k=>{L.k=eOutBack(k);u.jump=k*50;});hit(u,u,sk);for(let i=0;i<30;i++)part({x:gx+rnd(-W/2,W/2),y:gy-30,vx:0,vy:rnd(-160,-60),life:1.3,size:rnd(5,8),rgb:'255,220,140',shape:'star'});
  await wait(800);await tween(450,k=>{L.a=1-k;u.jump=50*(1-k);});u.jump=0;u.pose='idle';};}
// Ősi Tölgy ökle: festett, ágakból font tölgyököl tör fel és lesújt
{const o0=A.oakFist;A.oakFist=async(u,ts,sk)=>{const im=R3('oakfist'),t=ts[0];if(!im||!t)return o0(u,ts,sk);u.pose='cast';await bodyWind(u,240,.14);u.pose='attack';await bodyStrike(u,150,-.2);sfx('quake');shake(12);
  const gx=cx(t),gy=t.y+t.oy+20,F={k:0,a:1,rot:-.5};effects.push({update(){return F.a>0;},draw(){if(F.k<=0)return;ctx.save();ctx.globalAlpha=F.a;r17Draw(im,gx-150,gy,300,{anchor:'bottom',sy:F.k,rot:F.rot});ctx.restore();}});
  for(let i=0;i<40;i++)part({x:gx-150+rnd(-70,70),y:gy,vx:rnd(-180,180),vy:rnd(-420,-150),life:.9,size:rnd(6,11),rgb:'120,90,60',g:700,add:false,shape:'rock'});
  await tween(450,k=>F.k=eOutBack(k));await wait(120);await tween(170,k=>F.rot=-.5+1.0*k*k);shake(32);flash('255,240,200',.4,.2);hitStop&&hitStop(120);kaeLeaves(gx,midY(t),50,420);hit(u,t,sk);
  await wait(500);await tween(400,k=>{F.k=1-k;});F.a=0;u.pose='idle';};}
// Bambuszkígyó rátekeredése: festett kígyótest-gyűrűk a hősön
{const c0=A.snakeCoil;A.snakeCoil=async(u,ts,sk)=>{const im=R3('coils'),t=ts[0];if(!im||!t)return c0(u,ts,sk);const d=await dashTo(u,t,260,-20);const C={k:0,a:1,sq:0},Wd=t.w*t.scale*2+40;
  effects.push({update(){return C.a>0;},draw(){if(C.k<=0)return;ctx.save();ctx.globalAlpha=C.a;r17Draw(im,cx(t),t.y+t.oy+10,Wd*(1-C.sq*.12),{anchor:'bottom',sy:C.k});ctx.restore();}});
  await tween(420,k=>C.k=k);for(let i=0;i<3;i++){await tween(160,k=>C.sq=Math.sin(k*Math.PI));shake(9);sfx('hit');}hit(u,t,sk);await wait(350);await tween(250,k=>C.a=1-k);await dashBack(u,d);u.pose='idle';};}
// festett bambuszlándzsa (ha megvan) a rajzolt helyett
{const iv=setInterval(()=>{if(R3('bamboospear')){const im=R3('bamboospear'),c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');const w=250,h=w*im.height/im.width;g.drawImage(im,3,128-h/2,w,h);FX_IMG.bamboospear=c;clearInterval(iv);}},500);setTimeout(()=>clearInterval(iv),30000);}
// Szerzetes-varjú: festett tollak
{const d0=A.crowDive;A.crowDive=async(u,ts,sk)=>{const im=R3('feather');if(!im)return d0(u,ts,sk);const F=[];const E={a:1};effects.push({update(dt){for(const f of F){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy+=120*dt;f.r+=f.vr*dt;}return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;for(const f of F){ctx.save();ctx.translate(f.x,f.y);ctx.rotate(f.r);ctx.drawImage(im,-f.s/2,-f.s/2,f.s,f.s*im.height/im.width);ctx.restore();}ctx.restore();}});
  const add=(x,y,n)=>{for(let i=0;i<n;i++)F.push({x,y,vx:rnd(-180,180),vy:rnd(-220,-40),r:rnd(0,6),vr:rnd(-5,5),s:rnd(26,44)});};add(cx(u),midY(u),10);
  const t=ts[0];const p=d0(u,ts,sk);setTimeout(()=>add(cx(t),midY(t),12),650);setTimeout(()=>add(cx(t),midY(t),12),850);await p;setTimeout(()=>tween(400,k=>E.a=1-k),300);};}
