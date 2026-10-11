
// ===== 23. kör: a III. rész ellenfeleinek támadásai a tesztlap szerint (valódi tárgyak, a megfelelő testrészből) =====
const SP=(u,fu,fv)=>sprPt(u,fu,fv);
function drawFoamBlob(x,y,r,a=1){ctx.save();ctx.globalAlpha*=a;ctx.fillStyle='#b9e07a';ctx.strokeStyle='rgba(60,100,30,.6)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();ctx.stroke();
  ctx.fillStyle='#e9f7c8';ctx.beginPath();ctx.arc(x-r*.3,y-r*.3,r*.45,0,7);ctx.fill();ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(x-r*.4,y-r*.42,r*.16,0,7);ctx.fill();ctx.restore();}
function foamPour(x0,y0,targets,n=90,ms=700){const B=[];for(let i=0;i<n;i++){const t=pick(targets);B.push({x:x0,y:y0,tx:cx(t)+rnd(-50,50),ty:midY(t)+rnd(-60,40),r:rnd(9,20),d:rnd(0,ms*.6),k:0});}
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;for(const b of B)b.k=Math.max(0,Math.min(1,(E.t-b.d)/(ms*.5)));return E.a>0;},draw(){for(const b of B){if(!b.k)continue;const x=b.x+(b.tx-b.x)*b.k,y=b.y+(b.ty-b.y)*b.k-Math.sin(b.k*Math.PI)*90;drawFoamBlob(x,y,b.r*(.6+.4*b.k),E.a);}}});return E;}
function tileShard(x,y,s,r,c){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle=c;ctx.strokeStyle='#1e3a34';ctx.lineWidth=2;ctx.fillRect(-s/2,-s/2,s,s);ctx.strokeRect(-s/2,-s/2,s,s);ctx.fillStyle='rgba(255,255,255,.45)';ctx.fillRect(-s/2+2,-s/2+2,s*.35,s*.35);ctx.restore();}
const TILE_C=['#2fbf9f','#1f8f7a','#e0b84a','#58d6c0','#2a6f63'];

// Bambuszkígyó – Bambuszostor: a bambuszfarka ível át, és lecsap a hősre
A.snakeTail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await bodyWind(u,220,-.1);sfx('whoosh');const o=SP(u,.85,.92),T={k:0,a:1};
  effects.push({update(){return T.a>0;},draw(){const ex=cx(t),ey=midY(t),k=T.k;const pts=[];for(let i=0;i<=16;i++){const q=i/16*k;pts.push([o.x+(ex-o.x)*q,o.y+(ey-o.y)*q-Math.sin(q/Math.max(k,.01)*Math.PI)*170*k]);}
    ctx.save();ctx.globalAlpha=T.a;for(let i=1;i<pts.length;i++){const [x0,y0]=pts[i-1],[x1,y1]=pts[i],w=26-i*1.1;ctx.strokeStyle='#2d4a12';ctx.lineWidth=w+5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();ctx.strokeStyle=i%2?'#7fb33a':'#a6d65a';ctx.lineWidth=w;ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);ctx.stroke();ctx.fillStyle='#e6f0b0';ctx.beginPath();ctx.arc(x1,y1,w*.35,0,7);ctx.fill();}ctx.restore();}});
  await tween(260,k=>T.k=easeIO(k));shake(14);sfx('slash');flash('200,240,150',.25,.12);kaeLeaves(cx(t),midY(t),18,300);hit(u,t,sk);await wait(200);await tween(250,k=>T.k=1-k);T.a=0;await bodySettle(u);u.pose='idle';};
// Bambuszkígyó – Rátekeredés: odakúszik, és bambuszgyűrűkben rátekeredik a hősre
A.snakeCoil=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,260,-20);const C={k:0,a:1,sq:0};const gx=cx(t),top=topY(t)+t.h*t.scale*.15,bot=t.y+t.oy-10,W=t.w*t.scale*.75+20;
  effects.push({update(){return C.a>0;},draw(){ctx.save();ctx.globalAlpha=C.a;const n=5;for(let i=0;i<n*C.k;i++){const y=bot-(bot-top)*i/(n-1),w=W*(1-C.sq*.18);ctx.lineWidth=20;ctx.strokeStyle='#2d4a12';ctx.beginPath();ctx.ellipse(gx,y,w,15,-.12,0,7);ctx.stroke();ctx.lineWidth=14;ctx.strokeStyle=i%2?'#7fb33a':'#a6d65a';ctx.beginPath();ctx.ellipse(gx,y,w,15,-.12,0,7);ctx.stroke();}ctx.restore();}});
  await tween(420,k=>C.k=k);for(let i=0;i<3;i++){await tween(150,k=>C.sq=Math.sin(k*Math.PI));shake(7);sfx('hit');}hit(u,t,sk);await wait(300);await tween(250,k=>C.a=1-k);await dashBack(u,d);u.pose='idle';};

// Mochi – Ragacsos ölelés: megnyúlik, rávetődik, és fehér ragacs borítja be a hőst
A.mochiHug=async(u,ts,sk)=>{const t=ts[0];if(!t)return;await tween(220,k=>u.sq=1-.2*Math.sin(k*Math.PI));const d=await dashTo(u,t,240,-30);const G={k:0,a:1};
  effects.push({update(){return G.a>0;},draw(){ctx.save();ctx.globalAlpha=G.a*.92;const x=cx(t),y=midY(t),rw=t.w*t.scale*.75+20,rh=t.h*t.scale*.55;ctx.fillStyle='#f4efdf';ctx.strokeStyle='#b9b09a';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(x,y,rw*G.k,rh*G.k,0,0,7);ctx.fill();ctx.stroke();
    ctx.fillStyle='#e6dfc8';for(let i=0;i<6;i++){const dx=(i-2.5)*rw*.3;ctx.beginPath();ctx.ellipse(x+dx,y+rh*G.k*.95+G.k*14,6,16*G.k,0,0,7);ctx.fill();}ctx.fillStyle='rgba(150,200,90,.5)';for(let i=0;i<10;i++){ctx.beginPath();ctx.arc(x+Math.cos(i*2.3)*rw*.6,y+Math.sin(i*1.7)*rh*.6,4,0,7);ctx.fill();}ctx.restore();}});
  await tween(260,k=>G.k=eOutBack(k));shake(10);sfx('splash');hit(u,t,sk);await wait(450);await tween(300,k=>G.a=1-k);await dashBack(u,d);u.sq=1;u.pose='idle';};

// Teafa-dryád – Levélzápor: valódi tealevelek hullanak a hősökre (nem csillagok)
A.leafRain=async(u,ts,sk)=>{u.pose='cast';const h=SP(u,.18,.2);kaeLeaves(h.x,h.y,20,200);await wait(300);const L=[];for(const t of ts)for(let i=0;i<26;i++)L.push({x:cx(t)+rnd(-70,70),y:-rnd(20,300),vy:rnd(260,380),r:rnd(0,6),vr:rnd(-5,5),s:rnd(1.4,2.4),c:pick(['#6cbf3a','#4d9a2a','#9bd85a','#3f8a2a']),land:t.y+t.oy-rnd(10,t.h*t.scale*.7),t});
  const E={a:1};effects.push({t:0,update(dt){for(const l of L){if(l.y<l.land){l.y+=l.vy*dt;l.x+=Math.sin(l.y*.03)*1.5;l.r+=l.vr*dt;}}return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;for(const l of L)pLeaf(l.x,l.y,l.s,l.r,1,l.c);ctx.restore();}});
  await wait(900);for(const t of ts){hit(u,t,sk);await wait(70);}await wait(300);await tween(400,k=>E.a=1-k);u.pose='idle';};

// Mozaik-szellem – Mozaiklövés: a kezében csempékből nagy gömb áll össze, és szétrobban a hősön
A.mosaicBolt=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';const h=SP(u,.08,.5),T=[];for(let i=0;i<34;i++)T.push({a:rnd(0,7),r:rnd(8,46),s:rnd(10,20),c:pick(TILE_C),rot:rnd(0,6)});
  const B={x:h.x,y:h.y,k:0,a:1,ex:0};effects.push({t:0,update(dt){this.t+=dt;return B.a>0;},draw(){ctx.save();ctx.globalAlpha=B.a;glow(B.x,B.y,70,'80,230,200',.5);for(const p of T){const r=p.r*(1-B.k*.6)+B.ex*p.r*4,x=B.x+Math.cos(p.a+this.t*3)*r,y=B.y+Math.sin(p.a+this.t*3)*r;tileShard(x,y,p.s,p.rot+this.t*2,p.c);}ctx.restore();}});
  await tween(420,k=>B.k=k);sfx('whoosh');const sx=B.x,sy=B.y;await tween(360,k=>{B.x=sx+(cx(t)-sx)*k;B.y=sy+(midY(t)-sy)*k-Math.sin(k*Math.PI)*40;});
  shake(12);flash('120,240,210',.3,.15);sfx('glass');hit(u,t,sk);await tween(380,k=>{B.ex=k;B.a=1-k;});u.pose='idle';};
// Mozaik-szellem – Mozaikszilánkok: kitárja a karjait, és pörgő csempék tucatjai repülnek minden hősre
A.mosaicShards=async(u,ts,sk)=>{u.pose='cast';const hs=[SP(u,.08,.5),SP(u,.9,.75)];await wait(250);sfx('glass');const F=[];
  for(const t of ts)for(let i=0;i<14;i++){const h=pick(hs);F.push({x0:h.x,y0:h.y,x1:cx(t)+rnd(-40,40),y1:midY(t)+rnd(-60,50),d:rnd(0,450),s:rnd(14,26),c:pick(TILE_C),r:rnd(0,6)});}
  const E={t:0,a:1};effects.push({update(dt){E.t+=dt*1000;return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;for(const f of F){const k=Math.max(0,Math.min(1,(E.t-f.d)/380));if(!k)continue;tileShard(f.x0+(f.x1-f.x0)*k,f.y0+(f.y1-f.y0)*k-Math.sin(k*Math.PI)*60,f.s,f.r+E.t/90,f.c);}ctx.restore();}});
  await wait(850);for(const t of ts){shake(6);hit(u,t,sk);await wait(60);}await wait(250);await tween(300,k=>E.a=1-k);u.pose='idle';};

// Kőőr – Kőőrség: nagy kőfal emelkedik elé; ami eltalálja, annak a fele visszapattan
STATUS.stonewall=['Kőfal','#c9bfae'];ONE_ROUND.add('stonewall');
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{if(t&&t.st&&t.st.stonewall&&u&&u.kind!==t.kind&&u.alive&&sk&&sk.kind!=='heal'&&typeof r==='number'&&r>0){recoil(u,Math.max(1,Math.round(r*.5)),'VISSZAPATTAN!','#c9bfae');t.hp=Math.min(t.maxHp,t.hp+Math.round(r*.4));}}catch(e){}return r;};}
A.stoneWall=async(u,ts,sk)=>{u.pose='cast';sfx('quake');shake(10);const gx=cx(u)-u.w*u.scale*.75,gy=u.y+u.oy+14,H=u.h*u.scale*1.1,W={k:0,a:1,ready:false};
  effects.push({update(){if(!S.enemies.includes(u))W.a=0;if(W.ready&&!(u.alive&&u.st&&u.st.stonewall))W.a-=.03;return W.a>0;},draw(){ctx.save();ctx.globalAlpha=Math.max(0,W.a);const h=H*W.k;
    for(let r=0;r<6;r++)for(let c=0;c<3;c++){const bw=34,bh=h/6,x=gx-bw*1.5+c*bw+(r%2?bw/2:0)-bw/2,y=gy-(r+1)*bh;ctx.fillStyle=(r+c)%2?'#8f8a7e':'#a7a294';ctx.strokeStyle='#4a463e';ctx.lineWidth=3;ctx.fillRect(x,y,bw,bh);ctx.strokeRect(x,y,bw,bh);ctx.fillStyle='rgba(100,140,60,.6)';if((r*3+c)%4===0)ctx.fillRect(x+4,y+bh-8,bw*.6,5);}ctx.restore();}});
  for(let i=0;i<30;i++)part({x:gx+rnd(-50,50),y:gy,vx:rnd(-160,160),vy:rnd(-320,-120),life:.8,size:rnd(5,9),rgb:'140,130,110',g:700,add:false,shape:'rock'});
  await tween(420,k=>W.k=eOutBack(k));addStatus(u,'stonewall',2);W.ready=true;popLabel(u,'KŐFAL!','#c9bfae');await wait(400);u.pose='idle';};
// Kőőr – Kőhabverő-csapás: odarohan, magasra emeli a kőhabverőt, és lesújt – a föld megreped, kövek repülnek
A.stoneMace=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,260,0);await bodyWind(u,260,-.2);u.jump=30;await bodyStrike(u,130,.28);u.jump=0;
  shake(24);sfx('quake');flash('255,230,190',.35,.15);hitStop(100);groundCrack&&groundCrack(cx(t),t.y+t.oy,'200,180,140',190);
  for(let i=0;i<34;i++)part({x:cx(t)+rnd(-60,60),y:t.y+t.oy,vx:rnd(-260,260),vy:rnd(-420,-150),life:rnd(.6,1),size:rnd(6,12),rgb:pick(['140,130,110','110,100,85']),g:800,add:false,shape:'rock'});hit(u,t,sk);
  await wait(350);await bodySettle(u);await dashBack(u,d);u.pose='idle';};

// Szerzetes-varjú – Csőrcsapás: felrepül, lecsap, és háromszor belecsíp a csőrével; tollak repülnek
A.crowDive=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('whoosh');for(let i=0;i<12;i++)part({x:cx(u)+rnd(-40,40),y:midY(u),vx:rnd(-80,80),vy:rnd(-160,-40),life:.9,size:rnd(8,13),rgb:'25,25,30',add:false,shape:'leaf',g:120});
  await tween(260,k=>u.jump=k*170);const tx=cx(t)+t.w*t.scale*.5+20-u.x,ty=t.y-u.y;await tween(220,k=>{u.ox=tx*k;u.oy=ty*k;u.jump=170*(1-k)+40;});
  for(let i=0;i<3;i++){await bodyStrike(u,90,.25);shake(7);sfx('hit');const b=SP(u,.2,.18);burst(b.x,b.y,'255,240,200',10,220);for(let j=0;j<6;j++)part({x:cx(t),y:midY(t),vx:rnd(-160,160),vy:rnd(-200,-40),life:.9,size:rnd(8,12),rgb:'25,25,30',add:false,shape:'leaf',g:200});await bodySettle(u,90);}
  hit(u,t,sk);await tween(320,k=>{u.ox=tx*(1-k);u.oy=ty*(1-k);u.jump=40*(1-k)+Math.sin(k*Math.PI)*60;});u.ox=0;u.oy=0;u.jump=0;u.pose='idle';};
// Meditáció (varjú, sárkány): felemelkedik, nagy arany lótusz nyílik alatta, imafüzér-gyöngyök keringenek körülötte
A.zenMeditate=async(u,ts,sk)=>{u.pose='cast';sfx('buff');const L={k:0,a:1,t:0};const gx=cx(u),gy=u.y+u.oy+10,R=Math.max(90,u.w*u.scale*.8);
  effects.push({update(dt){L.t+=dt;return L.a>0;},draw(){ctx.save();ctx.globalAlpha=L.a;glow(gx,gy-u.h*u.scale*.5,R*1.6,'255,220,120',.35*L.k);
    for(let i=0;i<12;i++){const a=i/12*Math.PI*2+L.t*.3;ctx.save();ctx.translate(gx+Math.cos(a)*R*.5*L.k,gy+Math.sin(a)*R*.15*L.k);ctx.rotate(a+Math.PI/2);ctx.scale(L.k,L.k);ctx.fillStyle=i%2?'#ffd6e8':'#ffc0d8';ctx.strokeStyle='#b05a80';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(0,-22,14,30,0,0,7);ctx.fill();ctx.stroke();ctx.restore();}
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2+L.t*1.6,x=gx+Math.cos(a)*R*1.05,y=gy-u.h*u.scale*.5+Math.sin(a)*R*.4;ctx.fillStyle='#7a4a20';ctx.strokeStyle='#3a2410';ctx.lineWidth=2;ctx.beginPath();ctx.arc(x,y,7*L.k,0,7);ctx.fill();ctx.stroke();}ctx.restore();}});
  await tween(500,k=>{L.k=eOutBack(k);u.jump=k*40;});hit(u,u,sk);for(let i=0;i<20;i++)part({x:gx+rnd(-R,R),y:gy,vx:0,vy:rnd(-140,-60),life:1.2,size:rnd(4,7),rgb:'255,220,140',shape:'star'});
  await wait(700);await tween(400,k=>{L.a=1-k;u.jump=40*(1-k);});u.jump=0;u.pose='idle';};

// Zen-Kavics Sárkány – Kavicseső: kőből álló felhő gyűlik a hősök fölé, abból zuhannak a kavicsok
A.stoneCloudRain=async(u,ts,sk)=>{u.pose='cast';sfx('quake');const xs=ts.map(cx),x0=Math.min(...xs)-110,x1=Math.max(...xs)+110,C={a:0};
  const blobs=[];for(let i=0;i<14;i++)blobs.push({x:x0+(x1-x0)*i/13+rnd(-20,20),y:60+rnd(-20,25),r:rnd(40,70)});
  effects.push({update(){return C.a>0||!C.done;},draw(){if(C.a<=0)return;ctx.save();ctx.globalAlpha=C.a;for(const b of blobs){ctx.fillStyle='#6f6a60';ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,7);ctx.fill();}
    for(const b of blobs){ctx.fillStyle='#9a958a';ctx.beginPath();ctx.arc(b.x-b.r*.2,b.y-b.r*.25,b.r*.6,0,7);ctx.fill();ctx.strokeStyle='#4a463e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(b.x-b.r*.5,b.y);ctx.lineTo(b.x,b.y+b.r*.3);ctx.lineTo(b.x+b.r*.4,b.y-b.r*.1);ctx.stroke();}ctx.restore();}});
  await tween(450,k=>C.a=k);for(let i=0;i<160;i++)setTimeout(()=>part({x:rnd(x0+30,x1-30),y:100,vx:rnd(-30,30),vy:rnd(520,760),g:500,life:1.1,size:rnd(8,16),rgb:pick(['170,160,140','120,110,95','200,195,180']),add:false,shape:'rock'}),i*7);
  await wait(800);for(const t of ts){shake(8);hit(u,t,sk);await wait(80);}C.done=true;await wait(300);await tween(400,k=>C.a=1-k);u.pose='idle';};
// Zen-Kavics Sárkány – Kőzúgás: gereblyézett kőhullám hömpölyög a szájától a hősökön át
A.stoneWave=async(u,ts,sk)=>{u.pose='attack';await bodyWind(u,220,-.12);sfx('quake');const m=SP(u,.12,.3),W={x:m.x,a:1};
  effects.push({update(){return W.a>0;},draw(){ctx.save();ctx.globalAlpha=W.a;for(let i=0;i<9;i++){const x=W.x+i*16,h=190-i*12;ctx.fillStyle=i%2?'#a49e90':'#8a8478';ctx.strokeStyle='#4a463e';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x-30,520);ctx.quadraticCurveTo(x,520-h,x+40,520-h*.7);ctx.quadraticCurveTo(x+20,520-h*.3,x+30,520);ctx.closePath();ctx.fill();ctx.stroke();}ctx.restore();}});
  bodyStrike(u,150,.2);const hit1=new Set();await tween(900,k=>{W.x=m.x-(m.x+60)*k;for(let i=0;i<3;i++)part({x:W.x+rnd(0,120),y:rnd(330,500),vx:rnd(-160,-40),vy:rnd(-260,-80),g:600,life:.7,size:rnd(5,10),rgb:pick(['170,160,140','120,110,95']),add:false,shape:'rock'});
    for(const t of ts)if(!hit1.has(t)&&W.x<cx(t)){hit1.add(t);shake(10);hit(u,t,sk);}});
  await tween(300,k=>W.a=1-k);await bodySettle(u);u.pose='idle';};

// Matcha-gólem – Csészecsapás: odadübörög, és a habverő-öklével lesújt; matcha fröccsen
A.golemSlam=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,300,0);await bodyWind(u,260,-.18);await bodyStrike(u,140,.26);shake(22);sfx('quake');hitStop(90);flash('190,240,120',.3,.15);
  for(let i=0;i<40;i++)part({x:cx(t),y:midY(t),vx:rnd(-300,300),vy:rnd(-360,-60),g:700,life:.9,size:rnd(6,12),rgb:pick(['150,210,80','190,240,120','110,170,60']),add:false,shape:'drop'});
  foamPour(cx(t),midY(t)-20,[t],18,300);hit(u,t,sk);await wait(350);await bodySettle(u);await dashBack(u,d);u.pose='idle';};
// Matcha-gólem / Teaszertartás – Forró hab, Szertartás-hab: valódi zöld matchahab buggyan ki a tálból, és beborítja a hősöket
A.foamFlood=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,200,-.08);const o=u.type==='teamaster'?SP(u,.15,.28):u.type==='chasen'?SP(u,.15,.1):SP(u,.48,.1);sfx('splash');
  for(let i=0;i<20;i++)part({x:o.x+rnd(-20,20),y:o.y,vx:rnd(-40,40),vy:rnd(-160,-60),life:.6,size:rnd(6,10),rgb:'235,250,220',shape:'smoke',add:false});
  const E=foamPour(o.x,o.y,ts,110,800);await wait(900);for(const t of ts){hit(u,t,sk);await wait(70);}await wait(500);await tween(400,k=>E.a=1-k);await bodySettle(u);u.pose='idle';};
// Gőzkád-szellem – Gőzsugár: a szájából vastag forró gőzsugár csap ki a hősre
A.steamBlast=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await bodyWind(u,220,-.12);const m=SP(u,.5,.25);sfx('steam');
  const S0={on:true};const iv=setInterval(()=>{if(!S0.on)return;for(let i=0;i<10;i++){const k=rnd(0,1);part({x:m.x,y:m.y,vx:(cx(t)-m.x)*rnd(1.6,2.2),vy:(midY(t)-m.y)*rnd(1.6,2.2)+rnd(-60,60),life:rnd(.5,.8),size:rnd(14,26),grow:60,rgb:pick(['245,250,248','225,235,232','255,255,255']),add:false,shape:'smoke',drag:.6});}},30);
  await wait(650);shake(12);flash('255,255,255',.3,.15);hit(u,t,sk);await wait(350);S0.on=false;clearInterval(iv);await bodySettle(u);u.pose='idle';};

// Bambusz-békakirály – Bambuszugrás: magasra ugrik a trónjáról, és rázuhan a hősre
A.frogJump=async(u,ts,sk)=>{const t=ts[0];if(!t)return;sfx('whoosh');const x0=u.x,tx=cx(t)+t.w*t.scale*.3+u.w*u.scale*.3;
  await tween(500,k=>{u.ox=(tx-x0)*k;u.jump=Math.sin(k*Math.PI*.55)*360;});await tween(160,k=>u.jump=u.jump*(1-k));shake(26);sfx('quake');hitStop(100);flash('220,255,180',.3,.15);ring(cx(t),t.y+t.oy,'190,230,140',200,.5);
  for(let i=0;i<30;i++)part({x:cx(t)+rnd(-80,80),y:t.y+t.oy,vx:rnd(-260,260),vy:rnd(-320,-100),g:700,life:.8,size:rnd(6,10),rgb:'120,90,60',add:false,shape:'rock'});hit(u,t,sk);
  await wait(300);await tween(420,k=>{u.ox=(tx-x0)*(1-k);u.jump=Math.sin(k*Math.PI)*120;});u.ox=0;u.jump=0;u.pose='idle';};
// Gongütés: a kalapáccsal megüti a gongot – vastag arany hanghullámok és hangjegyek söpörnek végig
A.gongWave=async(u,ts,sk)=>{u.pose='attack';await bodyWind(u,220,-.12);const g=SP(u,.75,.5);await bodyStrike(u,120,.18);sfx('gong');shake(16);flash('255,230,150',.3,.18);
  const W={t:0,a:1};effects.push({update(dt){W.t+=dt;return W.a>0;},draw(){ctx.save();for(let i=0;i<5;i++){const r=(W.t*700-i*120);if(r<=0||r>1100)continue;ctx.globalAlpha=Math.max(0,1-r/1100)*W.a;ctx.strokeStyle='rgba(255,215,110,.8)';ctx.lineWidth=26-i*3;ctx.beginPath();ctx.arc(g.x,g.y,r,Math.PI*.65,Math.PI*1.35);ctx.stroke();}ctx.restore();}});
  for(let i=0;i<24;i++)setTimeout(()=>{const x=g.x-rnd(50,600),y=g.y+rnd(-150,120);ctx&&part({x:g.x,y:g.y,vx:(x-g.x)*1.6,vy:(y-g.y)*1.6,life:.9,size:rnd(10,16),rgb:'255,215,110',shape:'star'});},i*25);
  await wait(700);for(const t of ts){hit(u,t,sk);await wait(60);}await wait(400);W.a=0;u.pose='idle';};

// Teaszertartás-mester / Chasen – Kortyintás: a tálból kortyol, és a hős MP-je zöld fényként átszáll hozzá
A.teaSip=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';const b=u.type==='chasen'?SP(u,.85,.3):SP(u,.15,.28);sfx('gulp');
  for(let i=0;i<40;i++)setTimeout(()=>part({x:cx(t)+rnd(-20,20),y:midY(t)+rnd(-30,30),vx:(b.x-cx(t))*rnd(1.4,1.8),vy:(b.y-midY(t))*rnd(1.4,1.8)-rnd(30,90),life:.6,size:rnd(5,9),rgb:pick(['120,220,255','150,240,160']),drag:.4}),i*14);
  await wait(650);hit(u,t,sk);for(let i=0;i<14;i++)part({x:b.x,y:b.y,vx:rnd(-40,40),vy:rnd(-110,-40),life:.8,size:rnd(10,16),grow:20,rgb:'235,250,230',add:false,shape:'smoke'});await wait(400);u.pose='idle';};
// Chasen – Habvihar: az óriás habverője megpörög, és habtornádó söpör végig a hősökön
A.whiskStorm=async(u,ts,sk)=>{u.pose='attack';await bodyWind(u,240,-.14);const w=SP(u,.15,.08);sfx('whoosh');const T={x:w.x,y:w.y+80,a:1,t:0};
  effects.push({update(dt){T.t+=dt;return T.a>0;},draw(){ctx.save();ctx.globalAlpha=T.a;for(let i=0;i<60;i++){const q=i/60,a=q*Math.PI*10+T.t*9,r=20+q*110;drawFoamBlob(T.x+Math.cos(a)*r,T.y+120-q*320+Math.sin(a)*r*.25,10+q*10,.95);}ctx.restore();}});
  bodyStrike(u,150,.2);const hit1=new Set();await tween(1000,k=>{T.x=w.x-(w.x-120)*k;for(const t of ts)if(!hit1.has(t)&&T.x<cx(t)+20){hit1.add(t);shake(9);hit(u,t,sk);}});
  await tween(350,k=>T.a=1-k);await bodySettle(u);u.pose='idle';};

// a megjegyzésekhez tartozó képesség → animáció
const AN3={vinewhip:'snakeTail',coilsnap:'snakeCoil',mochibind:'mochiHug',tealeaf:'leafRain',mosaicshot:'mosaicBolt',mosaicflick:'mosaicShards',stoneguard:'stoneWall',stonemace:'stoneMace',
  crowpeck:'crowDive',meditate:'zenMeditate',gravelrain:'stoneCloudRain',zenroar:'stoneWave',cupslam:'golemSlam',hotfoam:'foamFlood',ceremonyfoam:'foamFlood',steamjet:'steamBlast',
  bamboojump:'frogJump',gongstrike:'gongWave',mpsip:'teaSip',whiskstorm:'whiskStorm'};
for(const k in AN3)if(ESK[k])ESK[k].anim=AN3[k];
if(ESK.stoneguard){ESK.stoneguard.desc='Nagy kőfal emelkedik elé: kevesebbet sérül, és a támadás fele visszapattan.';}
if(ESK.meditate){ESK.meditate.kind='buff';}
