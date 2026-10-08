// 20. kör – ötödik javítás: a negyedik próba tíz visszajelzése alapján.
// Ez a réteg az r20d után töltődik be; az r19z hangburkolója ezután kerül rá.

// A festett lila oszlop helyett jól olvasható, külön lobogó, fekete-lila lángnyelvek.
// A régi animációk is ezt a függvényt hívják, ezért a korábbi, hibás rajzréteg nem marad fölötte.
function r20FlameColumn(x,gy,w,h,a,t){
  if(a<=0)return;
  ctx.save();ctx.globalAlpha=a;ctx.translate(x,gy);ctx.globalCompositeOperation='source-over';
  const tongues=11;
  for(let i=0;i<tongues;i++){
    const q=i/(tongues-1),bx=(q-.5)*w*.92,phase=t*4.4+i*1.73;
    const fh=h*(.56+.34*(.5+.5*Math.sin(phase*1.13+i))),bw=w*(.075+.045*(.5+.5*Math.sin(phase*.8+i*2)));
    const sway=Math.sin(phase)*w*.095,tip=bx+sway+Math.sin(phase*1.6)*bw*.65;
    const tongue=(scale,offset,colors)=>{
      const b=bw*scale,top=-fh*(1+offset*.08),tx=tip+offset*bw;
      ctx.beginPath();ctx.moveTo(bx-b,2);
      ctx.bezierCurveTo(bx-b*1.25,-fh*.22,bx+sway-b*.92,-fh*.57,tx,-fh);
      ctx.bezierCurveTo(tx+b*.27,-fh*.8,bx+sway+b*.86,-fh*.35,bx+b,2);
      ctx.closePath();const g=ctx.createLinearGradient(0,-fh,0,2);
      colors.forEach((c,j)=>g.addColorStop(j/(colors.length-1),c));ctx.fillStyle=g;ctx.fill();
    };
    tongue(1.45,0,['rgba(9,4,17,.96)','rgba(11,3,22,.98)','rgba(2,1,5,1)']);
    tongue(.88,.1,['rgba(49,10,85,.86)','rgba(105,26,174,.98)','rgba(25,4,48,.96)']);
    tongue(.37,-.08,['rgba(147,65,205,.12)','rgba(208,126,255,.86)','rgba(73,19,121,.2)']);
  }
  ctx.restore();
}

// Cerberus: három külön fej, egyidejű előretörés és valódi nyit-zár harapómozdulat.
// Az átváltozás tüze megszűnik, mielőtt a fejek indulnak; nincs ottmaradó régi oszlop.
A.cerberus=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;
  const rel=keepPose(u),im=FX_IMG.cerberus,h0=u.h*u.scale*1.36;
  let flameOn=true,cerbOn=true,headsOn=false;const C={a:0,s:.24,t:0,open:0},F={a:0};
  await dimTo(.76,'13,2,24',260);sfx('dark');
  R20E({update(dt){C.t+=dt;return cerbOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(cx(u),u.y+u.oy+Math.sin(C.t*4)*2);ctx.scale(-1,1);ctx.rotate(-.025*C.open);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const colW=Math.max(320,u.w*u.scale*4.1),colH=Math.max(380,h0*2.65),baseX=cx(u),baseY=u.y+u.oy+10;
  R20E({update(){return flameOn;},draw(){r20FlameColumn(baseX,baseY,colW,colH,F.a,C.t);}});
  sfx('fire');sfx('wail');rumble(1.5,9);
  await tween(780,k=>{F.a=easeIO(Math.min(1,k*1.25));});
  await tween(360,k=>{u.alpha=1-k;F.a=1-.22*k;});u.alpha=0;
  flash('152,42,225',.48,.16);sfx('roar');
  await tween(620,k=>{C.a=k;C.s=.24+.76*eOutBack(k);F.a=.78*(1-k);});
  await tween(170,k=>{F.a=.22*(1-k);});flameOn=false;
  const targets=al.slice().sort((a,b)=>cx(a)-cx(b));
  const img=R17I.hound,headData=[{x:.18,y:.24},{x:.12,y:.49},{x:.22,y:.72}];
  const bites=headData.map((p,i)=>({x:baseX,y:baseY-h0*.72,tx:cx(targets[i%targets.length]),ty:midY(targets[i%targets.length]),
    sx:baseX+h0*(.62-p.x),sy:baseY-h0*(1-p.y),open:0,scale:.2,flip:1,target:targets[i%targets.length]}));
  const Wd=h0*1.05;
  R20E({update(){return headsOn;},draw(){if(!img)return;for(const b of bites){const ww=Wd*b.scale,hh=ww*img.height/img.width;ctx.save();ctx.globalAlpha=Math.min(1,b.scale*1.7);ctx.translate(b.x,b.y);ctx.scale(b.flip,1+b.open*.23);ctx.rotate(b.flip<0?-.05:.05);ctx.drawImage(img,-ww*.5,-hh*.5,ww,hh);ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,42*b.scale,'143,46,215',.38);ctx.restore();}}});
  headsOn=true;C.open=.25;sfx('growl');
  await tween(510,k=>{const e=k*k*(3-2*k);for(const b of bites){b.scale=.32+.68*e;b.x=b.sx+(b.tx-b.sx)*e;b.y=b.sy+(b.ty-b.sy)*e-Math.sin(k*Math.PI)*75;b.flip=b.tx<b.sx?-1:1;b.open=.05+.95*Math.sin(k*Math.PI);C.open=.35+.65*Math.sin(k*Math.PI);}});
  sfx('bite');flash('188,98,255',.3,.09);shake(18);hitStop(105);rumble(.7,8);
  await tween(145,k=>{for(const b of bites)b.open=.15+.85*Math.sin(k*Math.PI);});
  for(const b of bites){const t=b.target;if(!t.alive)continue;t.hurt=.5;toss(t,64,430);for(let j=0;j<15;j++)part({x:cx(t)+rnd(-35,35),y:midY(t)+rnd(-30,25),vx:rnd(-200,200),vy:rnd(-260,120),life:.42,size:rnd(3,7),rgb:pick(['175,68,235','240,220,255','32,8,54']),shape:'streak'});hit(u,t,sk);}
  await tween(430,k=>{const e=easeIO(k);for(const b of bites){b.x=b.tx+(b.sx-b.tx)*e;b.y=b.ty+(b.sy-b.ty)*e;b.scale=1-.8*e;b.open=1-e;}});headsOn=false;
  await tween(460,k=>{C.a=1-k;C.s=1-.55*k;u.alpha=k;});u.alpha=1;cerbOn=false;u.pose='idle';await bodySettle(u);await dimTo(0,null,330);rel();
};

// Teaszertartás: nagy, mozgó felhőből felülről hulló cseppek gyűlnek össze;
// ez a vízgyűjtemény alakul át egyetlen széles, végigsöprő tea-hullámmá.
A.teaCeremony=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);
  const left=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5));
  const gy=Math.max(...al.map(t=>t.y+t.oy))+8,cx0=(left+right)/2,cloudY=Math.max(98,Math.min(...al.map(topY))-88);
  const cloud={x:cx0,y:cloudY,a:0,s:.35,t:0,rain:0,pool:0,wave:0,front:left-240,on:true};
  const drops=Array.from({length:42},(_,i)=>({x:cx0+rnd(-115,115),y:cloudY+rnd(-35,25),wait:rnd(0,.9),v:rnd(310,620),size:rnd(5,12),phase:rnd(0,6.28),hit:false}));
  const teaw=R17I.teawave,done=new Set();let snd=null;
  R20E({update(dt){cloud.t+=dt;return cloud.on;},draw(){
    if(cloud.a<=0)return;ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(cloud.x,cloud.y);ctx.scale(cloud.s,cloud.s);
    // Kumulusz-felhő: rétegzett, festett peremek, a belsejében teás fény.
    ctx.shadowColor='rgba(35,24,26,.38)';ctx.shadowBlur=18;ctx.fillStyle='#e8e0d3';ctx.strokeStyle='#fff7eb';ctx.lineWidth=8;ctx.beginPath();
    ctx.moveTo(-138,28);ctx.bezierCurveTo(-178,20,-170,-38,-126,-46);ctx.bezierCurveTo(-119,-104,-44,-116,-18,-72);ctx.bezierCurveTo(14,-135,104,-105,100,-53);ctx.bezierCurveTo(166,-48,173,18,130,34);ctx.quadraticCurveTo(0,58,-138,28);ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;
    const cg=ctx.createLinearGradient(0,-110,0,45);cg.addColorStop(0,'rgba(255,255,255,.94)');cg.addColorStop(.72,'rgba(220,207,193,.95)');cg.addColorStop(1,'rgba(170,148,134,.92)');ctx.fillStyle=cg;ctx.fill();
    ctx.globalAlpha*=.34;ctx.strokeStyle='#a98870';ctx.lineWidth=4;for(let i=0;i<5;i++){const x=-95+i*47;ctx.beginPath();ctx.moveTo(x,-28);ctx.bezierCurveTo(x-20,2+Math.sin(cloud.t*3+i)*5,x+18,8,x+4,35);ctx.stroke();}
    ctx.restore();
    // A tea-cseppek a felhő felső pereméről esnek, mind ugyanabba a gyűjtő medencébe.
    if(cloud.rain>0){for(const d of drops){const q=(cloud.t*1.18+d.wait)%1,y=cloudY+24+q*Math.max(60,gy-cloudY-112),x=d.x+Math.sin(cloud.t*5+d.phase)*10;ctx.save();ctx.globalAlpha=cloud.rain*(q<.08?q/.08:1);ctx.fillStyle='#a85c25';ctx.beginPath();ctx.ellipse(x,y,d.size*.62,d.size*1.6,-.18,d.size*0,6.29);ctx.fill();ctx.fillStyle='rgba(255,216,148,.75)';ctx.beginPath();ctx.ellipse(x-d.size*.18,y-d.size*.35,d.size*.16,d.size*.46,-.18,0,6.29);ctx.fill();ctx.restore();}}
    if(cloud.pool>0){const pw=Math.min(W*.42,390)*cloud.pool;ctx.save();ctx.globalAlpha=cloud.pool*.96;ctx.translate(cx0,gy-52);const pg=ctx.createLinearGradient(0,-55,0,24);pg.addColorStop(0,'rgba(255,227,177,.9)');pg.addColorStop(.22,'rgba(213,139,65,.98)');pg.addColorStop(1,'rgba(89,43,19,.98)');ctx.fillStyle=pg;ctx.beginPath();ctx.moveTo(-pw*.55,10);ctx.bezierCurveTo(-pw*.56,-17,-pw*.26,-11,-pw*.16,-33);ctx.bezierCurveTo(-pw*.02,-57,pw*.12,-24,pw*.2,-37);ctx.bezierCurveTo(pw*.28,-52,pw*.5,-28,pw*.53,8);ctx.quadraticCurveTo(0,26,-pw*.55,10);ctx.fill();ctx.restore();}
    if(cloud.wave>0){const ww=W*1.2,hh=teaw?ww*teaw.height/teaw.width:Math.min(H*.62,420),x=cloud.front;
      ctx.save();ctx.globalAlpha=cloud.wave;ctx.translate(x,gy);ctx.scale(1,.96+.04*Math.sin(cloud.t*8));
      if(teaw){ctx.drawImage(teaw,-ww*.26,-hh*.84,ww,hh);}else{const grad=ctx.createLinearGradient(0,-hh,0,0);grad.addColorStop(0,'#f4c677');grad.addColorStop(.4,'#b36a2a');grad.addColorStop(1,'#4e2817');ctx.fillStyle=grad;ctx.beginPath();ctx.moveTo(-ww*.2,0);ctx.quadraticCurveTo(-ww*.13,-hh*1.1,0,-hh*.44);ctx.quadraticCurveTo(ww*.13,-hh*1.25,ww*.25,0);ctx.fill();}
      ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(255,237,190,.84)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(-ww*.25,-hh*.62);ctx.bezierCurveTo(-ww*.1,-hh*.95,ww*.05,-hh*.12,ww*.3,-hh*.63);ctx.stroke();ctx.restore();
    }
  }});
  await dimTo(.24,'48,32,18',220);bodyWind(u,300,.11);sfx('holy');
  await tween(540,k=>{cloud.a=k;cloud.s=.35+.65*eOutBack(k);});
  // A csésze billenése Kamilla mozdulatát indítja, a felhő gyorsan telítődik teával.
  bodyStrike(u,190,-.12);await tween(900,k=>{cloud.rain=easeIO(k);cloud.pool=Math.min(1,k*1.3);});
  sfx('water');sfx('splash');snd=setInterval(()=>sfx('water'),300);
  await tween(470,k=>{cloud.pool=1;cloud.wave=easeIO(k);});
  const goal=right+W*.5,start=left-W*.45;
  await tween(1780,k=>{const e=k*k*(3-2*k);cloud.front=start+(goal-start)*e;cloud.wave=1;
    for(const d of drops)if(!d.hit){const q=(cloud.t*1.18+d.wait)%1;if(q>.94){d.hit=true;for(let j=0;j<3;j++)part({x:d.x+rnd(-24,24),y:gy-34,vx:rnd(-80,80),vy:-rnd(20,95),g:500,life:.45,size:rnd(5,9),rgb:pick(['198,107,41','239,185,105','255,232,190']),add:false,shape:'drop'});}}
    for(const t of al)if(t.alive&&!done.has(t)&&cloud.front>cx(t)-20){done.add(t);shake(13);hitStop(65);toss(t,68,440);t.hurt=.46;splat(cx(t),midY(t),['189,118,50','246,204,133','255,239,196'],26,420,'drop');hit(u,t,sk);}
  });
  if(snd)clearInterval(snd);snd=null;for(const t of al)if(t.alive&&!done.has(t))hit(u,t,sk);
  await tween(480,k=>{cloud.a=1-k;cloud.wave=1-k;});cloud.on=false;await bodySettle(u);await dimTo(0,null,280);rel();
};

// Espresszó: az r10a eredeti lángrészecske-méretei és alakja tér vissza;
// a forrás marad a rácson kimért ajakpontnál (.145,.302).
function r20eFireBreath(o,ts,dir,o2={}){const dur=o2.dur||1100,sp=o2.speed||900,cols=o2.smoke?['220,225,240','170,180,200','255,255,255']:null,st={t:0};
  return new Promise(res=>{effects.push({update(dt){st.t+=dt;if(st.t*1000<dur){const n=o2.n||14;for(let i=0;i<n;i++){
      const t=pick(ts.length?ts:[{x:o.x+dir*500,ox:0,y:o.y,oy:0,h:0,scale:1}]),tx=cx(t)+rnd(-60,60),ty=(t.h?midY(t):o.y)+rnd(-50,60),an=Math.atan2(ty-o.y,tx-o.x)+rnd(-.12,.12),v=rnd(sp*.75,sp*1.1);
      if(cols)part({x:o.x,y:o.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.1,life:rnd(.55,.85),size:rnd(6,12),grow:70,rgb:pick(cols),add:false,shape:'smoke'});
      else part({x:o.x+rnd(-4,4),y:o.y+rnd(-4,4),vx:Math.cos(an)*v,vy:Math.sin(an)*v-rnd(0,40),drag:1.2,g:-60,life:rnd(.5,.8),size:rnd(7,12),grow:62,rgb:'255,160,40',add:false,shape:'fire'});
    }for(let i=0;i<4;i++){const an=(dir>0?0:Math.PI)+rnd(-.3,.3),v=rnd(500,900);part({x:o.x,y:o.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.5,life:rnd(.2,.4),size:rnd(2,4),rgb:cols?'255,255,255':pick(['255,240,180','255,200,90'])});}}
    if(st.t*1000>=dur+250){res();return false;}return true;},draw(){if(st.t*1000>dur)return;const a=Math.min(1,st.t*5);ctx.save();ctx.globalCompositeOperation='lighter';glow(o.x,o.y,70*a,cols?'220,230,255':'255,170,60',.8*a);glow(o.x,o.y,28*a,'255,250,220',.9*a);ctx.restore();}});
    for(const t of ts){const d=Math.hypot(cx(t)-o.x,midY(t)-o.y);setTimeout(()=>{if(o2.onHit)o2.onHit(t);},(130+d/sp*1000)/(S.speed||1));}
  });
}
fireBreath=r20eFireBreath;
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){es.run=async(P,S0)=>{const im=ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;
  const mouth=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200},x0=S0.x,s0=S0.s||1;sfx('fire');
  const m=()=>mouth(),G={a:0,on:true};R20E({update(){return G.on;},draw(){if(!G.a)return;const p=m();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,34+42*G.a,'255,130,35',.72*G.a);glow(p.x,p.y,13+16*G.a,'255,245,210',.95*G.a);ctx.restore();}});
  await tween(520,k=>{const e=easeIO(k);S0.x=x0-32*e;S0.s=s0*(1+.06*e);G.a=k;});rumble(1.8,11);flash('255,160,60',.42,.22);sfx('fire');sfx('boom');await tween(180,k=>{S0.x=x0-32+70*eOutBack(k);});
  const bz=setInterval(()=>sfx('fire'),270),done=new Set();await fireBreath(m(),fs,1,{dur:2100,speed:1050,n:44,onHit:t=>{if(!t.alive||done.has(t))return;done.add(t);shake(10);hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}});clearInterval(bz);
  for(const t of fs)if(t.alive&&!done.has(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
  await tween(340,k=>{S0.x=x0+40*(1-k);S0.s=s0*(1.02-.02*k);G.a=1-k;});G.on=false;await wait(200);
};}}

// Árny-csapat: minden élő hős árnyalakja belép, a teljes csapat egyszerre látható,
// saját célpontjára csap le, majd a támadás után együtt húzódnak vissza.
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.run=async(P,S0)=>{
  const team=S.heroes.filter(h=>h.alive).slice(0,5),foes=foesAlive();if(!team.length||!foes.length)return;
  await dimTo(.72,'9,4,20',260);sfx('dark');const actors=team.map((h,i)=>({h,i,x:-140-i*64,y:h.y+h.oy,tx:100+i*92,alpha:0,pose:0,target:foes[i%foes.length]}));let on=true;
  R20E({update(){return on;},draw(){if(!on)return;for(const a of actors){const spr=sprOf(a.h.type);if(!spr)continue;const hh=a.h.h*a.h.scale,ww=hh*spr.width/spr.height;ctx.save();ctx.globalAlpha=a.alpha*.9;ctx.translate(a.x,a.y);const dark=tintSpr(spr,'rgb(20,8,35)',.94);ctx.drawImage(dark||spr,-ww/2,-hh,ww,hh);ctx.globalCompositeOperation='lighter';glow(0,-hh*.52,hh*.5,'105,40,170',.34*a.alpha);ctx.restore();}}});
  await tween(520,k=>{for(const a of actors){const e=easeIO(k);a.x=-140-a.i*64+(a.tx+140+a.i*64)*e;a.alpha=e;}});
  await tween(360,k=>{for(const a of actors)a.pose=easeIO(k);});sfx('whoosh');
  for(const a of actors){const t=a.target;if(!t.alive)continue;const x=cx(t),y=midY(t);fxSpin(tint('slash','155,90,245')||'slash',x,y,{size:bigOf(t)*1.35,life:.5,s0:.35,s1:1.2,rot:rnd(-.35,.35),add:true,in:.02,out:.32});fxImage('dark',x,y,{size:bigOf(t)*1.2,life:.5});shake(10);hitStop(48);hit(P,t,{...(ATTACKS[team[a.i].type]||{}),name:'Árnycsapás',pow:2.6,anim:'midnight'});}
  await wait(180);sfx('dark');await tween(520,k=>{const e=easeIO(k);for(const a of actors){a.x=a.tx+(W+200-a.tx)*e;a.alpha=1-e;}});on=false;await dimTo(0,null,260);
};}}

// Hat páros támadás: mindegyiknek saját, nagy és folyamatos képi akciója van.
const R20E_PAIR={};
R20E_PAIR['Villámátok']=async(A1,B1,al,sk)=>{
  const {mx}=grp(al),top=105,cloud={a:0,t:0,on:true},done=new Set();await dimTo(.65,'8,3,20',240);await r16Raise(A1,'120,55,195');await r16Raise(B1,'170,105,235');sfx('thunder');
  R20E({update(dt){cloud.t+=dt;return cloud.on;},draw(){if(!cloud.a)return;const cw=Math.min(350,W*.48),ch=125;ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(mx,top);ctx.fillStyle='#100b17';ctx.strokeStyle='#492363';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(-cw*.48,20);ctx.bezierCurveTo(-cw*.62,-22,-cw*.38,-58,-cw*.18,-52);ctx.bezierCurveTo(-cw*.1,-112,cw*.13,-107,cw*.2,-61);ctx.bezierCurveTo(cw*.52,-79,cw*.6,-12,cw*.46,22);ctx.quadraticCurveTo(0,55,-cw*.48,20);ctx.fill();ctx.stroke();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(168,90,229,.88)';ctx.lineWidth=4;ctx.stroke();ctx.restore();}});
  await tween(550,k=>cloud.a=easeIO(k));await wait(120);r16Lower(A1);r16Lower(B1);
  for(let round=0;round<3;round++){
    const live=al.filter(t=>t.alive);for(const t of live){const a={x:mx+rnd(-150,150),y:top+62},b={x:cx(t),y:t.y+t.oy+8},Q={k:0,on:true},seed=round*11+cx(t);
      R20E({update(dt){Q.k+=dt/.28;return Q.on;},draw(){const q=Math.min(1,Q.k),fade=q>.6?1-(q-.6)/.4:1;ctx.save();ctx.globalCompositeOperation='lighter';for(const [rgb,w,alpha]of[['18,4,29',24,.98],['93,34,151',14,.98],['207,141,255',4,.9]]){ctx.strokeStyle=`rgba(${rgb},${alpha*fade})`;ctx.lineWidth=w;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(a.x,a.y);for(let i=1;i<=8;i++){const f=i/8*q,x=a.x+(b.x-a.x)*f+(i===8?0:(i%2?1:-1)*Math.min(40,Math.abs(b.x-a.x)*.07)),y=a.y+(b.y-a.y)*f;ctx.lineTo(x,y);}ctx.stroke();}ctx.restore();}});
      await tween(300,k=>{Q.k=k;});Q.on=false;sfx('thunder');shake(12);hitStop(58);flash('195,135,255',.25,.08);if(round===2&&!done.has(t)){done.add(t);t.hurt=.4;hit(A1,t,sk);}
    }}
  await tween(360,k=>cloud.a=1-k);cloud.on=false;await dimTo(0,null,250);
};

R20E_PAIR['Csillagözön']=async(A1,B1,al,sk)=>{
  const im=R17I.constellation,{mx,my}=grp(al),sky={a:0,on:true},points=[],hitSet=new Set();await dimTo(.82,'4,7,31',260);await r16Raise(A1,'240,220,160');await r16Raise(B1,'240,220,160');sfx('holy');
  for(let i=0;i<155;i++)points.push({x:(i*137.5)%W,y:(i*71)%Math.max(210,H*.48),r:1+(i%4)*.5,p:i*.7});
  const poly=[[-.46,.2],[-.3,.08],[-.16,.17],[-.04,.03],[.08,.12],[.19,.07],[.3,.14],[.43,.06],[.35,.2],[.2,.18],[.1,.34],[-.08,.31],[-.23,.45],[-.35,.38],[-.46,.2]];
  R20E({update(){return sky.on;},draw(){if(!sky.a)return;ctx.save();ctx.globalAlpha=sky.a;const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(2,5,29,.94)');g.addColorStop(1,'rgba(14,17,54,.8)');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);for(const p of points){ctx.globalAlpha=sky.a*(.45+.45*(.5+.5*Math.sin(T*3+p.p)));ctx.fillStyle='#fff5c8';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.29);ctx.fill();}
    const x=mx,y=my-H*.14,s=Math.min(W*.9,H*1.35),coords=poly.map(([a,b])=>[x+a*s,y+b*s]);ctx.globalAlpha=sky.a*.95;ctx.strokeStyle='#fff0b0';ctx.lineWidth=3;ctx.shadowColor='#ffe38b';ctx.shadowBlur=18;ctx.beginPath();coords.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.stroke();for(const [px,py]of coords){ctx.fillStyle='#fff8ce';ctx.beginPath();ctx.arc(px,py,4+2*Math.sin(T*4+px),0,6.29);ctx.fill();}ctx.restore();}});
  await tween(760,k=>sky.a=easeIO(k));await wait(200);sfx('roar');const D={x:-W*.3,y:my-H*.12,a:0,on:true,h:[]};
  R20E({update(){return D.on||D.h.length>1;},draw(){if(!im||D.a<=0)return;const p=D.h.slice(0,150);if(p.length>1)r17Snake(im,p,W*.9,Math.min(H*.45,280),D.a,.56);}});
  await tween(1900,k=>{const e=k*k*(3-2*k);D.x=-W*.34+(W*1.5)*e;D.y=my-H*.13+Math.sin(k*Math.PI*3)*H*.09;D.a=Math.min(1,k*3);D.h.unshift({x:D.x,y:D.y,b:D.y<my-80});if(D.h.length>180)D.h.pop();for(const t of al)if(t.alive&&!hitSet.has(t)&&D.x>cx(t)-80){hitSet.add(t);toss(t,65,420);shake(15);hitStop(65);}}
  );D.on=false;for(const t of al)if(t.alive&&!hitSet.has(t)){hitSet.add(t);toss(t,65,420);}
  for(const t of al)if(t.alive)hit(A1,t,sk);await tween(450,k=>{D.a=1-k;sky.a=1-k;});sky.on=false;r16Lower(A1);r16Lower(B1);await dimTo(0,null,280);
};

R20E_PAIR['Árnyroham']=async(A1,B1,al,sk)=>{
  const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1,sl=R17I.darkslash,x0=orc.ox||0,y0=orc.oy||0,done=new Set();await dimTo(.67,'8,2,20',250);await r16Raise(witch,'120,48,190');sfx('dark');
  const aura={k:0,on:true,x:cx(orc)};R20E({update(){return aura.on;},draw(){if(!aura.k)return;const hand=handPos(witch),cxg=cx(orc),y=midY(orc);ctx.save();ctx.globalCompositeOperation='lighter';for(let j=0;j<6;j++){ctx.beginPath();ctx.moveTo(hand.x,hand.y);ctx.bezierCurveTo(hand.x+60,y-120+j*28,cxg-100,y+100-j*18,cxg+Math.sin(T*5+j)*18,y);ctx.strokeStyle=j%2?'rgba(29,6,49,.94)':'rgba(112,36,176,.9)';ctx.lineWidth=j%2?22:8;ctx.stroke();}ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(cxg,y,orc.h*orc.scale*.78,'107,35,168',.44*aura.k);ctx.restore();}});
  await tween(740,k=>{aura.k=easeIO(k);});await tween(420,k=>{orc._r16tint={rgb:'48,8,94',a:.82*k};});r16Lower(witch);ghosts(orc,800);sfx('whoosh');sfx('slash');
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),start=cx(orc),end=Math.max(...xs.map(cx))+140,sw={x:start,a:0,on:true};
  R20E({update(){return sw.on;},draw(){if(!sw.a)return;ctx.save();ctx.globalCompositeOperation='lighter';if(sl)r17Draw(sl,(start+sw.x)/2,midY(orc),Math.max(420,sw.x-start+240),{a:sw.a,add:true,sy:.9});else r20Arc({x:start,y:midY(orc)},{x:sw.x,y:midY(orc)},1,'155,65,230',38);ctx.restore();}});
  orc.pose='attack';await tween(820,k=>{const e=k*k*(3-2*k);orc.ox=x0+(end-start)*e;orc.oy=y0+(xs.reduce((s,t)=>s+t.y+t.oy,0)/xs.length-orc.y)*Math.min(1,k*3);orc.lean=-.22+.52*k;sw.x=cx(orc);sw.a=Math.min(1,k*3);for(const t of xs)if(t.alive&&!done.has(t)&&cx(orc)>cx(t)-35){done.add(t);toss(t,72,460);t.hurt=.55;hit(orc,t,sk);shake(16);hitStop(70);}});
  for(const t of xs)if(t.alive&&!done.has(t))hit(orc,t,sk);await tween(440,k=>{orc.ox=(end-start)*(1-k)+x0*k;orc.oy=y0*k;orc.lean=.3*(1-k);sw.a=1-k;orc._r16tint.a=.82*(1-k);});orc.ox=x0;orc.oy=y0;orc.lean=0;orc._r16tint=null;orc.pose='idle';sw.on=false;aura.on=false;await dimTo(0,null,260);
};

R20E_PAIR['Sárkánynyíl']=async(A1,B1,al,sk)=>{
  const im=R17I.firedragon,wiz=A1.type==='wizard'?A1:B1,arch=wiz===A1?B1:A1,from=handPos(arch),xs=al.slice().sort((a,b)=>cx(a)-cx(b)),my=xs.reduce((s,t)=>s+midY(t),0)/xs.length,hitSet=new Set();
  await dimTo(.42,'35,12,0',240);await r16Raise(wiz,'255,150,40');await r16Raise(arch,'255,190,80');sfx('fire');
  const shaft={a:0,x:from.x,y:from.y,on:true};R20E({update(){return shaft.on;},draw(){if(!shaft.a)return;ctx.save();ctx.globalAlpha=shaft.a;ctx.translate(shaft.x,shaft.y);ctx.rotate(.08);ctx.strokeStyle='#613914';ctx.lineWidth=11;ctx.beginPath();ctx.moveTo(-100,0);ctx.lineTo(110,0);ctx.stroke();ctx.fillStyle='#ffe7a2';ctx.beginPath();ctx.moveTo(118,0);ctx.lineTo(84,-18);ctx.lineTo(90,0);ctx.lineTo(84,18);ctx.closePath();ctx.fill();ctx.restore();}});
  for(let i=0;i<32;i++)part({x:from.x+rnd(-90,90),y:from.y+rnd(-70,70),vx:rnd(-50,50),vy:-rnd(30,160),life:rnd(.35,.65),size:rnd(5,12),grow:14,rgb:pick(['255,120,25','255,208,90','255,242,196']),add:false,shape:'fire'});
  await tween(650,k=>shaft.a=k);await tween(500,k=>{shaft.x=from.x+120*k;shaft.y=from.y-30*k;});sfx('roar');r16Lower(wiz);const D={x:shaft.x,y:shaft.y,a:1,on:true,h:[]};
  R20E({update(){return D.on||D.h.length>1;},draw(){if(!im||!D.a)return;const p=D.h.slice(0,170);if(p.length>1)r17Snake(im,p,W*.92,Math.min(H*.38,260),D.a,.62);const dx=D.x,dy=D.y;ctx.save();ctx.translate(dx,dy);ctx.rotate(-.035);ctx.strokeStyle='#5b3518';ctx.lineWidth=8;ctx.beginPath();ctx.moveTo(-85,0);ctx.lineTo(90,0);ctx.stroke();ctx.fillStyle='#ffd37d';ctx.beginPath();ctx.moveTo(112,0);ctx.lineTo(82,-15);ctx.lineTo(87,0);ctx.lineTo(82,15);ctx.closePath();ctx.fill();ctx.restore();}});
  await tween(2400,k=>{const e=k*k*(3-2*k);D.x=from.x+(W+360-from.x)*e;D.y=from.y+(my-from.y)*Math.min(1,k*2)+Math.sin(k*Math.PI*3.4)*58;D.h.unshift({x:D.x,y:D.y,b:D.y<my-130});if(D.h.length>180)D.h.pop();if(Math.random()<.8)part({x:D.x-rnd(80,210),y:D.y+rnd(-35,35),vx:rnd(-140,-40),vy:-rnd(40,120),life:.5,size:rnd(10,22),grow:18,rgb:'255,125,30',add:false,shape:'fire'});for(const t of xs)if(t.alive&&!hitSet.has(t)&&D.x>cx(t)-65){hitSet.add(t);bigBoom(cx(t),midY(t),.8);toss(t,72,450);t.hurt=.5;hit(arch,t,sk);shake(16);hitStop(70);}});
  D.on=false;shaft.on=false;for(const t of xs)if(t.alive&&!hitSet.has(t))hit(arch,t,sk);await tween(420,k=>D.a=1-k);r16Lower(arch);await dimTo(0,null,260);
};

R20E_PAIR['Lótuszvihar']=async(A1,B1,al,sk)=>{
  const im=R17I.lotus,pet=R17I.petal,monk=A1.type==='monk'?A1:B1,fairy=monk===A1?B1:A1,{mx,gy}=grp(al),L={a:0,open:0,spin:0,on:true};
  const petals=Array.from({length:34},(_,i)=>({angle:i*Math.PI*2/34,r:145+(i%4)*18,phase:i*.37})),arrows=Array.from({length:34},(_,i)=>({angle:i*Math.PI*2/34+.11,r:112+(i%4)*18,phase:i*.37}));
  await dimTo(.36,'35,16,31',230);await r16Raise(fairy,'245,150,210');await r16Raise(monk,'255,220,185');sfx('holy');
  R20E({update(dt){L.spin+=dt*2.25;return L.on;},draw(){if(L.a<=0)return;if(im)r17Draw(im,mx,gy+26,300*L.a,{anchor:'bottom',sy:.52+.48*L.open,a:L.a});
    for(const p of petals){const ang=p.angle+L.spin*(.66+p.phase*.012),x=mx+Math.cos(ang)*p.r*L.a,y=gy-155+Math.sin(ang)*p.r*.58*L.a;ctx.save();ctx.translate(x,y);ctx.rotate(ang+.25);if(pet)r17Draw(pet,0,0,46,{a:L.a,rot:ang});else{ctx.fillStyle='#f6acd1';ctx.beginPath();ctx.ellipse(0,0,20,8,0,0,6.29);ctx.fill();}ctx.restore();}
    for(const q of arrows){const ang=q.angle+L.spin*(.66+q.phase*.012),x=mx+Math.cos(ang)*q.r*L.a,y=gy-155+Math.sin(ang)*q.r*.58*L.a;ctx.save();ctx.translate(x,y);ctx.rotate(ang+Math.PI/2);ctx.strokeStyle='#75471b';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-21,0);ctx.lineTo(18,0);ctx.stroke();ctx.fillStyle='#f2d498';ctx.beginPath();ctx.moveTo(24,0);ctx.lineTo(12,-5);ctx.lineTo(15,0);ctx.lineTo(12,5);ctx.closePath();ctx.fill();ctx.restore();}
  }});
  await tween(480,k=>{L.a=eOutBack(k);});await tween(540,k=>L.open=easeIO(k));r16Lower(fairy);await tween(1250,k=>{L.spin=2.2*k;});sfx('wind');
  for(const t of al)if(t.alive){shake(7);hitStop(32);}
  sfx('boom');flash('255,210,235',.5,.16);for(const t of al)if(t.alive){t.hurt=.48;toss(t,60,420);hit(monk,t,sk);}
  await tween(550,k=>{L.a=1-k;});L.on=false;await dimTo(0,null,260);
};

R20E_PAIR['Tündérököl']=async(A1,B1,al,sk)=>{
  const fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1,im=R17I.goldburst,gl={a:0,x:0,y:0,on:true},start=handPos(orc),s0=orc.scale;
  await dimTo(.4,'44,30,0',230);await r16Raise(fairy,'255,220,120');sfx('holy');
  // Tényleges aranypor-átadás Lili kezétől Grog kezéig.
  await tween(620,k=>{const end=handPos(orc);for(let i=0;i<26;i++){const q=(i/26+k*1.8)%1,x=handPos(fairy).x+(end.x-handPos(fairy).x)*q,y=handPos(fairy).y+(end.y-handPos(fairy).y)*q-Math.sin(q*Math.PI)*65;part({x,y,vx:rnd(-12,12),vy:-rnd(20,85),life:.38,size:rnd(3,7),rgb:pick(['255,220,80','255,245,180','255,255,255']),shape:'star'});}orc._r16tint={rgb:'255,205,54',a:.72*k};orc.scale=s0*(1+.12*k);});r16Lower(fairy);
  const G={a:0,on:true};R20E({update(){const p=handPos(orc);gl.x=p.x;gl.y=p.y;return G.on;},draw(){if(!G.a)return;const x=gl.x,y=gl.y,s=orc.scale;ctx.save();ctx.translate(x,y);ctx.rotate(-.3+orc.lean*.2);ctx.scale(s,s);ctx.globalAlpha=G.a;ctx.shadowColor='#ffdd62';ctx.shadowBlur=24;const gr=ctx.createLinearGradient(-30,-48,38,40);gr.addColorStop(0,'#fff5bc');gr.addColorStop(.32,'#ffdb62');gr.addColorStop(.7,'#d58b16');gr.addColorStop(1,'#794211');ctx.fillStyle=gr;ctx.strokeStyle='#fff1aa';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-30,16);ctx.quadraticCurveTo(-38,-9,-19,-29);ctx.lineTo(2,-43);ctx.quadraticCurveTo(17,-48,21,-31);ctx.lineTo(37,-13);ctx.quadraticCurveTo(48,4,34,22);ctx.lineTo(10,43);ctx.quadraticCurveTo(-16,47,-30,16);ctx.closePath();ctx.fill();ctx.stroke();for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(-13+i*12,-23,7,14,-.4,0,6.29);ctx.fillStyle=i%2?'#ffed9a':'#c78213';ctx.fill();ctx.stroke();}ctx.beginPath();ctx.ellipse(0,8,28,19,-.3,0,6.29);ctx.fillStyle='#efb734';ctx.fill();ctx.stroke();for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-18+i*12,2);ctx.lineTo(-10+i*12,22);ctx.strokeStyle='rgba(255,245,187,.9)';ctx.lineWidth=3;ctx.stroke();}ctx.restore();}});
  await tween(520,k=>{G.a=easeIO(k);});orc.pose='attack';const t0=al.filter(t=>t.alive).sort((a,b)=>Math.abs(cx(a)-cx(orc))-Math.abs(cx(b)-cx(orc)))[0];if(t0){const dx=cx(t0)-cx(orc),dy=midY(t0)-midY(orc);await tween(360,k=>{orc.ox=dx*.38*k;orc.oy=dy*.3*k;orc.lean=.18*k;});sfx('whoosh');await tween(390,k=>{orc.jump=92*Math.sin(k*Math.PI*.5);orc.lean=.18+.42*k;});await tween(155,k=>{orc.jump=92*(1-k*k);orc.lean=.6-.9*k;});orc.jump=0;
    sfx('boom');flash('255,235,156',.7,.2);shake(24);hitStop(140);const p=handPos(orc);if(im)r17Draw(im,p.x,p.y,650,{add:true,a:.94});
    for(const t of al)if(t.alive){for(let j=0;j<32;j++)part({x:cx(t)+rnd(-48,48),y:midY(t)+rnd(-38,38),vx:rnd(-360,360),vy:rnd(-390,130),g:420,life:rnd(.45,.8),size:rnd(4,9),rgb:pick(['255,205,54','255,241,170','173,111,23']),shape:'star'});toss(t,82,500);t.hurt=.48;hit(orc,t,sk);}}
  await tween(430,k=>{G.a=1-k;orc.ox*=1-k;orc.oy*=1-k;orc.jump=0;orc.lean*=1-k;orc.scale=s0*(1+.12*(1-k));if(orc._r16tint)orc._r16tint.a=.72*(1-k);});G.on=false;orc.ox=0;orc.oy=0;orc.jump=0;orc.lean=0;orc.scale=s0;orc._r16tint=null;orc.pose='idle';await dimTo(0,null,260);
};

for(const n of Object.keys(R20E_PAIR))R16P[n]=R20E_PAIR[n];

