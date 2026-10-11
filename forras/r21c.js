
// ===== 22. kör, 2. rész: Kaelen saját képességei (nem a többi hős animációi) =====
// Festett képek: fx7-moss (mohapárna), fx7-bamboo (bambuszszár), fx7-roots (tüskés gyökér), fx7-bamgolem, fx7-wsbear/wseagle/wsturtle/wsviper
// Ha egy kép még nincs beágyazva, rajzolt levelek/szárak pótolják.
const KAE={leaf:['120,200,80','90,170,60','160,220,100','70,140,50']};
function kaeLeaves(x,y,n=24,spd=260,up=0){for(let i=0;i<n;i++){const a=rnd(0,Math.PI*2),s=rnd(.3,1)*spd;part({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-up,life:rnd(.6,1.1),size:rnd(7,13),rgb:pick(KAE.leaf),add:false,shape:'leaf',drag:2,g:120});}}
function kaeStalk(x,y,h,w,a=1,lean=0){ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(lean);const seg=Math.max(2,Math.round(h/46));
  for(let i=0;i<seg;i++){const y0=-i*h/seg,y1=-(i+1)*h/seg+4;const g=ctx.createLinearGradient(-w/2,0,w/2,0);g.addColorStop(0,'#5f9a2c');g.addColorStop(.45,'#a6d65a');g.addColorStop(1,'#4d7f22');
    ctx.fillStyle=g;ctx.strokeStyle='#2d4a12';ctx.lineWidth=2.5;ctx.beginPath();if(ctx.roundRect)ctx.roundRect(-w/2,y1,w,y0-y1,w*.25);else ctx.rect(-w/2,y1,w,y0-y1);ctx.fill();ctx.stroke();
    ctx.fillStyle='#d8e9a0';ctx.fillRect(-w/2-2,y1-3,w+4,6);ctx.strokeRect(-w/2-2,y1-3,w+4,6);}
  if(typeof drawLeaf==='function'){drawLeaf(w*.4,-h+8,1.6,.6,1,'#7cc040');drawLeaf(-w*.4,-h+20,1.4,-.7,-1,'#5ea832');}
  ctx.restore();}
function kaeImg(key,x,y,w,o){const im=R17I[key];if(im){r17Draw(im,x,y,w,o);return true;}return false;}
function kaeVine(P,k,thick){if(P.length<2)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';const n=Math.max(2,Math.round(P.length*k));
  for(const [lw,col] of [[thick+5,'#2d4a12'],[thick,'#6aa832'],[thick*.4,'#a6d65a']]){ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();ctx.moveTo(P[0].x,P[0].y);for(let i=1;i<n;i++)ctx.lineTo(P[i].x,P[i].y);ctx.stroke();}
  if(typeof drawLeaf==='function')for(let i=4;i<n;i+=5)drawLeaf(P[i].x,P[i].y,1.3,i*.9,i%2?1:-1,i%3?'#7cc040':'#5ea832');ctx.restore();}

// Bambuszcsapás: a bot hegyéből leveles inda csap ki az ellenfélig, ott levélrobbanás
ATTACKS.druid.anim='druidLash';
A.druidLash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await bodyWind(u,200,.14);sfx('whoosh');
  const h=handPos(u),tx=cx(t),ty=midY(t),P=[];for(let i=0;i<=40;i++){const k=i/40;P.push({x:h.x+(tx-h.x)*k,y:h.y+(ty-h.y)*k-Math.sin(k*Math.PI)*120+Math.sin(k*14)*10*(1-k)});}
  const V={k:0,a:1};effects.push({update(){return V.a>0;},draw(){ctx.save();ctx.globalAlpha=V.a;kaeVine(P,V.k,12);ctx.restore();}});
  bodyStrike(u,160,-.22);await tween(240,k=>V.k=eOutBack?Math.min(1,k*1.05):k);
  shake(10);hitStop&&hitStop(60);kaeLeaves(tx,ty,34,320);ring(tx,ty,'150,230,90',90,.4);hit(u,t,sk);
  await wait(160);await tween(260,k=>V.a=1-k);await bodySettle(u);u.pose='idle';};

// Mohapárna: spórafolyam a bot hegyéből, a társ alatt nagy mohapárna nő ki virágokkal, gyógyít
SK.mosspillow.anim='mossPillow';
A.mossPillow=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('heal');const h=handPos(u),gx=cx(t),gy=t.y+t.oy+6;
  for(let i=0;i<40;i++)setTimeout(()=>part({x:h.x,y:h.y,vx:(gx-h.x)*rnd(1.4,2),vy:(gy-30-h.y)*rnd(1.4,2)-rnd(40,120),life:.55,size:rnd(4,8),rgb:pick(['170,240,120','220,255,160','120,210,90']),drag:.5}),i*12);
  await wait(420);const M={k:0,a:1},W=Math.max(200,t.w*t.scale*2.2);
  effects.push({update(){return M.a>0;},draw(){const s=easeIO?easeIO(M.k):M.k;ctx.save();ctx.globalAlpha=M.a;
    if(!kaeImg('moss',gx,gy+W*.12,W*(.3+.7*s),{anchor:'bottom',sy:s})){ctx.fillStyle='#5f9a2c';ctx.strokeStyle='#2d4a12';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(gx,gy,W*.5*s,W*.16*s,0,Math.PI,0);ctx.fill();ctx.stroke();
      for(let i=0;i<14;i++)drawLeaf(gx-W*.45*s+i*W*.065*s,gy-W*.1*s*Math.sin(i/13*Math.PI),1.5*s,i,i%2?1:-1,i%2?'#7cc040':'#4d8a26');}
    ctx.restore();}});
  await tween(420,k=>M.k=k);for(let i=0;i<10;i++)part({x:gx+rnd(-W*.4,W*.4),y:gy-rnd(0,20),vx:0,vy:rnd(-70,-30),life:rnd(.8,1.3),size:rnd(5,9),rgb:pick(['255,200,230','255,250,200','230,180,255']),shape:'star',add:false});
  hit(u,t,sk);if(t.st&&t.st.foam){delete t.st.foam;popLabel(t,'HAB LEMOSVA','#cfe9a0');}
  await wait(700);await tween(500,k=>M.a=1-k);u.pose='idle';};

// Élő Bambuszkéreg: bambuszszárak törnek fel a társ körül, ráborulnak, és kéreggé állnak össze
SK.barkskin.anim='barkCage';
A.barkCage=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';await bodyWind(u,200,.08);const gx=cx(t),gy=t.y+t.oy+8,H=t.h*t.scale*1.25,N=7,B=[];
  for(let i=0;i<N;i++)B.push({x:gx+(i-(N-1)/2)*t.w*t.scale*.32,k:0,lean:0});const C={a:1};
  effects.push({update(){return C.a>0;},draw(){ctx.save();ctx.globalAlpha=C.a;for(const b of B){if(b.k<=0)continue;const hh=H*(.75+.25*Math.abs(Math.sin(b.x)))*b.k;
     if(!kaeImg('bamboo',b.x,gy,40,{anchor:'bottom',sy:hh/(40*(R17I.bamboo?R17I.bamboo.height/R17I.bamboo.width:1)),rot:b.lean}))kaeStalk(b.x,gy,hh,22,1,b.lean);}ctx.restore();}});
  for(let i=0;i<N;i++){const b=B[i];sfx('hit');shake(4);kaeLeaves(b.x,gy-20,6,160,120);tween(220,k=>b.k=eOutBack?eOutBack(k):k);await wait(70);}
  await wait(200);await tween(320,k=>{for(const b of B)b.lean=(gx-b.x)/(t.w*t.scale)*.55*k;});flash('170,230,110',.25,.2);ring(gx,midY(t),'170,230,110',110,.45);
  hit(u,t,sk);popLabel(t,'BAMBUSZKÉREG!','#b8e07a');await wait(450);await tween(380,k=>C.a=1-k);await bodySettle(u);u.pose='idle';};

// Gyökércsapda: tüskés gyökerek törnek fel minden ellenség alatt, a gúzsba kötötteken rajta maradnak egy ideig
SK.thornroot.anim='thornRoots';
A.thornRoots=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,220,.1);u.pose='attack';await bodyStrike(u,140,-.18);shake(12);sfx('quake');
  for(const t of ts){const gx=cx(t),gy=t.y+t.oy+10,W=Math.max(150,t.w*t.scale*1.6),R={k:0,a:1};
    effects.push({update(){return R.a>0;},draw(){const s=R.k;ctx.save();ctx.globalAlpha=R.a;
      if(!kaeImg('roots',gx,gy+8,W,{anchor:'bottom',sy:s})){for(let j=-2;j<=2;j++){const P=[];for(let i=0;i<=20;i++){const k=i/20;P.push({x:gx+j*W*.18+Math.sin(k*9+j)*14,y:gy-k*t.h*t.scale*.9*s});}
        ctx.save();ctx.strokeStyle='#4a2d14';ctx.lineWidth=12-Math.abs(j)*2;ctx.lineCap='round';ctx.beginPath();P.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.stroke();
        ctx.fillStyle='#2a180a';for(let i=3;i<P.length;i+=3){ctx.beginPath();ctx.moveTo(P[i].x,P[i].y);ctx.lineTo(P[i].x+(i%2?12:-12),P[i].y-6);ctx.lineTo(P[i].x,P[i].y-8);ctx.fill();}ctx.restore();}}
      ctx.restore();}});
    for(let i=0;i<14;i++)part({x:gx+rnd(-W*.4,W*.4),y:gy,vx:rnd(-80,80),vy:rnd(-260,-120),life:rnd(.5,.9),size:rnd(4,8),rgb:pick(['120,90,60','90,70,40','150,120,80']),g:600,add:false,shape:'rock'});
    tween(260,k=>R.k=eOutBack?eOutBack(k):k).then(()=>{hit(u,t,sk);setTimeout(()=>tween(400,k=>R.a=1-k),t.st&&t.st.stun?1100:500);});
    await wait(110);}
  await wait(700);await bodySettle(u);u.pose='idle';};

// Vad Alakváltás: Kaelen helyén a festett állat jelenik meg levélrobbanással, és az állat maga támad
{const WS={bear:['wsbear','MEDVEFORMA!',300],eagle:['wseagle','SASFORMA!',260],turtle:['wsturtle','TEKNŐSFORMA!',260],viper:['wsviper','ÁTOKVIPERA!',280]};
 A.wildshape=async(u,ts,sk)=>{const t=ts[0];const f=pick(['bear','eagle','turtle','viper']),[key,N,W]=WS[f];
  popLabel(u,N,'#9be07a');sfx('roar');kaeLeaves(cx(u),midY(u),46,340);flash('150,230,90',.25,.2);
  const F={x:cx(u),y:u.y+u.oy,a:0,s:.4,fx:false,rot:0},a0=u.alpha==null?1:u.alpha;
  effects.push({update(){return !F.done;},draw(){if(F.a<=0)return;ctx.save();ctx.globalAlpha=F.a;if(!kaeImg(key,F.x,F.y,W*F.s,{anchor:'bottom',rot:F.rot,fx:F.fx})){ctx.font=`${Math.round(160*F.s)}px serif`;ctx.textAlign='center';ctx.fillText({bear:'🐻',eagle:'🦅',turtle:'🐢',viper:'🐍'}[f],F.x,F.y);}ctx.restore();}});
  await tween(260,k=>{u.alpha=a0*(1-k);F.a=k;F.s=.4+.6*eOutBack(k);});
  const enemies=S.enemies.filter(x=>x.alive);
  if(f==='bear'){const hx=F.x,hy=F.y;await tween(380,k=>{F.x=hx+(700-hx)*k;F.y=hy-Math.sin(k*Math.PI)*190;F.rot=.2*k;});shake(22);sfx('quake');flash('255,220,160',.3,.2);
    for(const e of enemies){kaeLeaves(cx(e),midY(e),14,260);hit(u,e,{...sk,name:'Medvecsapás',pow:1.1,tgt:'enemies'});}
    for(let i=0;i<24;i++)part({x:700+rnd(-160,160),y:hy,vx:rnd(-200,200),vy:rnd(-300,-100),life:.8,size:rnd(5,9),rgb:'120,90,60',g:700,add:false,shape:'rock'});
    await wait(250);await tween(360,k=>{F.x=700+(hx-700)*k;F.y=hy-Math.sin(k*Math.PI)*120;F.rot=.2*(1-k);});}
  else if(f==='eagle'&&t&&t.alive){const hx=F.x,hy=F.y;await tween(260,k=>{F.y=hy-200*k;F.x=hx+60*k;});
    await tween(240,k=>{F.x=hx+60+(cx(t)-hx-60)*k;F.y=hy-200+(midY(t)+40-hy+200)*k;F.rot=.5*k;});addStatus(u,'haste',1);hit(u,t,{...sk,name:'Szélvihar',pow:1.5,pierce:.5});
    shake(12);for(let i=0;i<30;i++)part({x:cx(t),y:midY(t),vx:rnd(-300,300),vy:rnd(-250,100),life:.7,size:rnd(6,10),rgb:pick(['230,220,200','180,150,110']),shape:'leaf',add:false,drag:2});
    await tween(320,k=>{F.x=cx(t)+(hx-cx(t))*k;F.y=midY(t)+40+(hy-midY(t)-40)*k;F.rot=.5*(1-k);});}
  else if(f==='turtle'){addStatus(u,'taunt',1);addStatus(u,'defUp',1);await tween(300,k=>F.s=1+.15*Math.sin(k*Math.PI));ring(F.x,F.y-80,'150,230,120',140,.6);shake(8);}
  else if(t&&t.alive){const hx=F.x;await tween(160,k=>F.x=hx-30*k);await tween(180,k=>F.x=hx-30+(cx(t)-hx-60)*k);
    hit(u,t,{...sk,name:'Viperamarás',pow:1.0,status:['poison',1,3]});if(Math.random()<.4)addStatus(t,'stun',1);burst(cx(t),midY(t),'150,230,80',30,260);shake(10);
    await tween(240,k=>F.x=cx(t)-60+(hx-cx(t)+60)*k);}
  await wait(250);kaeLeaves(F.x,F.y-100,40,320);await tween(260,k=>{u.alpha=a0*k;F.a=1-k;});F.done=true;u.alpha=a0;};}

// Limit – Bambusz-gólem: a csapat előtt óriási bambuszgólem nő ki, végigtapos az ellenségeken
LIMITS.druid.anim='bambooGolem';
A.bambooGolem=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,260,.14);sfx('quake');const G={x:470,y:500,k:0,a:1,rot:0,W:420};
  effects.push({update(){return G.a>0;},draw(){ctx.save();ctx.globalAlpha=G.a;if(!kaeImg('bamgolem',G.x,G.y,G.W,{anchor:'bottom',sy:G.k,rot:G.rot})){for(let i=-3;i<=3;i++)kaeStalk(G.x+i*30,G.y,(330-Math.abs(i)*40)*G.k,32,1,i*.05);}ctx.restore();}});
  for(let i=0;i<30;i++)part({x:G.x+rnd(-160,160),y:G.y,vx:rnd(-160,160),vy:rnd(-320,-120),life:rnd(.6,1),size:rnd(6,10),rgb:'120,90,60',g:700,add:false,shape:'rock'});
  shake(16);await tween(700,k=>G.k=eOutBack(k));await wait(200);u.pose='idle';
  for(const t of ts.filter(e=>e.alive)){const x0=G.x;await tween(260,k=>{G.x=x0+(cx(t)-x0)*k;G.rot=.08*Math.sin(k*Math.PI);});
    shake(24);sfx('quake');flash('200,240,150',.3,.18);kaeLeaves(cx(t),midY(t),30,340);ring(cx(t),t.y+t.oy,'160,220,100',140,.5);hit(u,t,sk);await wait(180);}
  addStatus&&S.heroes.forEach(h=>h.alive&&addStatus(h,'defUp',1));popLabel(u,'BAMBUSZFAL!','#b8e07a');
  await tween(500,k=>{G.k=1-k*.3;G.a=1-k;});await bodySettle(u);};
LIMITS.druid.desc='A földből óriási bambuszgólem nő ki, végigtapos minden ellenségen, és 1 körre bambuszfalat emel a csapat elé (Védelem+).';
