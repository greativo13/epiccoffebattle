// 20. kör – hetedik javítás: a legutóbbi próba kilenc nyitva maradt jelenete.
// A r20e réteg animációit váltja le; a Cerberushoz és a térképhez nem nyúl.
const R20IE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

// Teaszertartás: Kamilla felhője felülről teát esőztet, a sok csepp egyetlen
// széles, folytonos, kamillás hullámmá gyűlik, amely keresztülgördül a csapaton.
A.teaCeremony=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);
  const left=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5));
  const floor=Math.min(H-24,Math.max(...al.map(t=>t.y+t.oy+12))),mx=(left+right)*.5;
  const cloud={t:0,a:0,front:left-300,pool:0,wave:0,on:true};
  const drops=Array.from({length:66},(_,i)=>({x:mx-190+(i%11)*38+rnd(-10,10),delay:(i%7)*.095+rnd(0,.12),len:rnd(130,285),r:rnd(5,10),phase:rnd(0,6.28)}));
  const done=new Set();let rainSound=null;
  await dimTo(.3,'28,17,9',220);await bodyWind(u,260,.1);sfx('holy');sfx('water');
  R20IE({update(dt){cloud.t+=dt;return cloud.on;},draw(){
    if(cloud.a<=0)return;const t=cloud.t;
    // Nagy, térbeli felhő: sötét teabarna alj, aranyszínű peremfény és örvénylő pára.
    ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(mx,76);ctx.scale(Math.min(1,W/900),1);
    const cg=ctx.createLinearGradient(0,-48,0,63);cg.addColorStop(0,'#f7e8cf');cg.addColorStop(.28,'#c7b19b');cg.addColorStop(.7,'#594237');cg.addColorStop(1,'#211812');
    ctx.fillStyle=cg;ctx.strokeStyle='rgba(255,226,174,.8)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-205,34);ctx.bezierCurveTo(-245,4,-219,-37,-174,-35);ctx.bezierCurveTo(-151,-98,-80,-94,-52,-51);ctx.bezierCurveTo(-15,-122,61,-99,73,-48);ctx.bezierCurveTo(133,-73,198,-44,184,1);ctx.bezierCurveTo(229,22,196,63,143,58);ctx.lineTo(-150,58);ctx.quadraticCurveTo(-203,61,-205,34);ctx.fill();ctx.stroke();
    ctx.globalAlpha*=.32;ctx.strokeStyle='#fff4d7';ctx.lineWidth=9;for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(-94+i*62,4+Math.sin(t*2+i)*5,78,22,0,Math.PI,Math.PI*2);ctx.stroke();}ctx.restore();
    // A cseppek a felhő alól, felülről lefelé esnek; a gyűjtőmedence fokozatosan telik.
    for(const d of drops){const age=t-d.delay;if(age<0||age>1.32)continue;const q=Math.min(1,age/1.06),x=d.x+Math.sin(age*8+d.phase)*13,y=132+q*d.len;
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(45,20,10,.72)';ctx.lineWidth=d.r*1.2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(x,y-d.r*2.5);ctx.lineTo(x+2,y+d.r*1.7);ctx.stroke();ctx.fillStyle='rgba(211,142,67,.96)';ctx.beginPath();ctx.ellipse(x,y,d.r*.76,d.r*1.4,.08,0,6.29);ctx.fill();ctx.restore();}
    if(cloud.pool>0){ctx.save();ctx.globalAlpha=cloud.pool;ctx.globalCompositeOperation='source-over';const g=ctx.createLinearGradient(0,floor-64,0,floor+12);g.addColorStop(0,'rgba(255,225,164,.96)');g.addColorStop(.22,'rgba(196,119,47,.97)');g.addColorStop(1,'rgba(66,32,15,.98)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(left-150,floor+10);ctx.quadraticCurveTo(mx,floor-46,left+cloud.pool*(right-left+200),floor+10);ctx.closePath();ctx.fill();ctx.restore();}
    if(cloud.wave>0){const fx=cloud.front,back=fx-390,a=cloud.wave;ctx.save();ctx.globalAlpha=a;ctx.beginPath();ctx.moveTo(back,floor+14);ctx.bezierCurveTo(back+28,floor-75,fx-188,floor-212,fx-106,floor-194);ctx.bezierCurveTo(fx-55,floor-182,fx-52,floor-96,fx+10,floor-57);ctx.bezierCurveTo(fx+39,floor-39,fx+62,floor-17,fx+58,floor+14);ctx.lineTo(back,floor+14);ctx.closePath();const wg=ctx.createLinearGradient(0,floor-205,0,floor+15);wg.addColorStop(0,'rgba(255,247,216,.98)');wg.addColorStop(.14,'rgba(245,202,130,.98)');wg.addColorStop(.42,'rgba(174,94,35,.98)');wg.addColorStop(1,'rgba(59,28,15,.99)');ctx.fillStyle=wg;ctx.fill();ctx.lineWidth=8;ctx.strokeStyle='rgba(255,235,184,.9)';ctx.stroke();
      ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=0;i<5;i++){ctx.strokeStyle=i%2?'rgba(255,245,214,.55)':'rgba(255,190,91,.52)';ctx.lineWidth=4+i%2*3;ctx.beginPath();ctx.moveTo(back+35,floor-14-i*11);ctx.bezierCurveTo(fx-205,floor-80-i*13,fx-120,floor-142-i*7,fx-40,floor-119-i*8);ctx.stroke();}
      for(let i=0;i<4;i++){const x=back+90+i*111+Math.sin(t*3+i)*14,y=floor-35-(i%2)*20;for(let p=0;p<8;p++){const an=p*Math.PI/4;ctx.fillStyle='rgba(255,247,222,.9)';ctx.beginPath();ctx.ellipse(x+Math.cos(an)*7,y+Math.sin(an)*7,5,2,an,0,6.29);ctx.fill();}ctx.fillStyle='#e7b74f';ctx.beginPath();ctx.arc(x,y,3.5,0,6.29);ctx.fill();}ctx.restore();}
   }});
   await tween(440,k=>{cloud.a=easeIO(k);});
  await tween(1480,k=>{cloud.a=1;cloud.pool=Math.min(1,k*1.2);});sfx('splash');
  await tween(420,k=>{cloud.pool=1;cloud.wave=easeIO(k);});
  const start=left-270,end=right+440;
  await tween(1900,k=>{const e=k*k*(3-2*k);cloud.front=start+(end-start)*e;cloud.wave=1;
    for(const t of al){if(!t.alive||done.has(t)||cloud.front<cx(t)-26)continue;done.add(t);shake(15);hitStop(75);toss(t,75,480);t.hurt=.52;splat(cx(t),midY(t),['119,57,21','204,131,60','255,231,180'],32,440,'drop');hit(u,t,sk);}
  });
  for(const t of al)if(t.alive&&!done.has(t))hit(u,t,sk);
  await tween(460,k=>{cloud.a=1-k;cloud.wave=1-k;cloud.pool=1-k;});cloud.on=false;
  if(rainSound)clearInterval(rainSound);await bodySettle(u);await dimTo(0,null,260);rel();
};

// Espresszó: vissza az r20a eredeti lángfüggvényéhez és a rácson mért ajakponthoz.
fireBreath=r20FireBreath;
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let jaw=0;es.img=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
  es.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const origin=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200},x0=S0.x,s0=S0.s||1,hitSet=new Set();
    sfx('fire');await tween(280,k=>{jaw=easeIO(k);S0.x=x0-19*k;S0.s=s0*(1+.035*k);});
    flash('255,168,69',.32,.1);rumble(.65,7);sfx('growl');await tween(180,k=>{S0.x=x0-19+41*eOutBack(k);});
    const p=origin(),fx={a:0,on:true};R20IE({update(){return fx.on;},draw(){if(!fx.a)return;const q=origin();ctx.save();ctx.globalCompositeOperation='lighter';glow(q.x,q.y,44*fx.a,'255,124,28',.65*fx.a);glow(q.x,q.y,17*fx.a,'255,244,195',.88*fx.a);ctx.restore();}});
    const loop=setInterval(()=>sfx('fire'),260);try{await fireBreath(p,fs,1,{dur:2150,speed:1050,n:40,mouthFront:true,onHit:t=>{if(!t.alive||hitSet.has(t))return;hitSet.add(t);shake(9);hitStop(42);hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}});}finally{clearInterval(loop);}
    for(const t of fs)if(t.alive&&!hitSet.has(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    await tween(250,k=>{jaw=1-.22*k;});sfx('bite');await tween(310,k=>{jaw=.78*(1-k);S0.x=x0+28*(1-k);S0.s=s0*(1.035-.035*k);fx.a=1-k;});jaw=0;fx.on=false;S0.pose='idle';
  };
}}

// Árny-csapat: a teljes hőscsapat árnyalakja egyszerre megjelenik és végig látszik.
// Az árnyak a saját hősük támadó mozdulatával rohannak célra, majd visszahúzódnak.
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>sprOf('wizard');sh.run=async(P,S0)=>{
  const hs=S.heroes.filter(h=>h.alive).slice(0,5),targets=foesAlive();if(!hs.length||!targets.length)return;
  const actors=hs.map((h,i)=>({h,i,x:h.x+h.w*h.scale*.7,y:h.y+h.oy,home:h.x+h.w*h.scale*.7,a:0,r:0,hit:new Set()}));let on=true;
  await dimTo(.7,'8,3,20',250);sfx('dark');
  R20IE({update(){return on;},draw(){for(const q of actors){const h=q.h,sp=sprOf(h.type);if(!sp||q.a<=0)continue;const hh=h.h*h.scale*1.08,ww=hh*sp.width/sp.height;ctx.save();ctx.globalAlpha=.93*q.a;ctx.translate(q.x,q.y-q.r);ctx.scale(-1,1);ctx.shadowColor='rgba(166,69,255,.9)';ctx.shadowBlur=26;const silhouette=tintSpr(sp,'rgb(17,6,29)',.98);ctx.drawImage(silhouette||sp,-ww/2,-hh,ww,hh);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.78*q.a;ctx.shadowBlur=0;ctx.strokeStyle='rgba(194,123,255,.85)';ctx.lineWidth=4;ctx.strokeRect(-ww/2,-hh,ww,hh);ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(q.x,q.y-hh*.48,hh*.43,'107,31,175',.26*q.a);ctx.restore();}}
  });
  await tween(480,k=>{for(const q of actors){q.a=easeIO(k);q.r=76*easeIO(k);}});await wait(180);
  for(const q of actors){const t=targets.find(x=>x.alive&&!q.hit.has(x))||targets.find(x=>x.alive);if(!t)continue;const h=q.h,x0=q.x,y0=q.y,tx=cx(t)-Math.sign(cx(t)-x0)*52,ty=t.y+t.oy;
    h.pose='attack';sfx('whoosh');await tween(460,k=>{const e=k*k*(3-2*k);q.x=x0+(tx-x0)*e;q.y=y0+(ty-y0)*e-Math.sin(k*Math.PI)*25;q.r=70*Math.sin(k*Math.PI);});
    const x=cx(t),y=midY(t);fxImage('dark',x,y,{size:bigOf(t)*1.08,life:.42});fxSpin(tint('slash','139,71,210')||'slash',x,y,{size:bigOf(t)*1.18,life:.42,s0:.45,s1:1.1,rot:rnd(-.25,.25),add:true,in:.02,out:.26});shake(10);hitStop(48);t.hurt=.45;toss(t,54,370);q.hit.add(t);
    hit(h,t,{...(ATTACKS[h.type]||{}),name:'Árnycsapás',pow:2.6,anim:'midnight'});await tween(350,k=>{const e=easeIO(k);q.x=tx+(x0-tx)*e;q.y=ty+(y0-ty)*e;q.r=0;});h.pose='idle';
  }
  // A visszahúzódás csak a saját támadásuk után indul; addig a teljes árnycsapat látható.
  sfx('dark');await tween(580,k=>{for(const q of actors){q.a=1-easeIO(k);q.r=76*easeIO(k);}});on=false;await dimTo(0,null,250);
};}}

// A villámfelhő kisebb, tömör fekete-lila vihar; minden menetben több vastag,
// elágazó villám csap le, a fehér-lila mag fölött fekete ecsetperemmel.
R16P['Villámátok']=async(A1,B1,al,sk)=>{
  const live=al.filter(t=>t.alive);if(!live.length)return;const {mx}=grp(live),cloud={a:0,t:0,on:true},marked=new Set();
  await dimTo(.66,'5,2,15',230);await Promise.all([r16Raise(A1,'160,75,225'),r16Raise(B1,'160,75,225')]);sfx('thunder');
  R20IE({update(dt){cloud.t+=dt;return cloud.on;},draw(){if(cloud.a<=0)return;const w=Math.min(260,W*.32),y=105;ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(mx,y);ctx.fillStyle='#09060e';ctx.strokeStyle='#301343';ctx.lineWidth=12;ctx.beginPath();ctx.moveTo(-w*.48,14);ctx.bezierCurveTo(-w*.66,-15,-w*.43,-55,-w*.2,-50);ctx.bezierCurveTo(-w*.12,-114,w*.16,-107,w*.2,-58);ctx.bezierCurveTo(w*.55,-78,w*.65,-14,w*.46,18);ctx.quadraticCurveTo(0,48,-w*.48,14);ctx.fill();ctx.stroke();ctx.strokeStyle='rgba(114,48,153,.8)';ctx.lineWidth=5;ctx.stroke();ctx.globalCompositeOperation='lighter';for(let i=0;i<6;i++){const x=-w*.4+i*w*.16+Math.sin(cloud.t*2+i)*8;glow(x,-37,35,'70,25,107',.42);}ctx.restore();}});
  await tween(620,k=>cloud.a=easeIO(k));await wait(120);r16Lower(A1);r16Lower(B1);
  for(let r=0;r<3;r++){const jobs=[];for(const t of live.filter(x=>x.alive)){for(let j=0;j<2;j++){const x=cx(t)+rnd(-54,54),y=midY(t),q={k:0,on:true},seed=r*19+j*7+cx(t);R20IE({update(dt){q.k+=dt/.32;return q.on;},draw(){const k=Math.min(1,q.k),a=k>.66?(1-k)/.34:1;ctx.save();ctx.globalCompositeOperation='lighter';for(const [rgb,width,alpha]of [['8,3,15',30,.98],['72,24,112',19,.98],['186,105,255',7,.95],['241,218,255',2,.95]]){ctx.globalAlpha=Math.max(0,alpha*a);ctx.strokeStyle='rgba('+rgb+','+alpha*a+')';ctx.lineWidth=width;ctx.lineJoin='round';ctx.lineCap='round';ctx.beginPath();ctx.moveTo(mx+(seed%7-3)*18,145);for(let i=1;i<=9;i++){const f=i/9*k,px=mx+(seed%7-3)*18+(x-mx-(seed%7-3)*18)*f+Math.sin(i*4+seed)*22,py=145+(y-145)*f;ctx.lineTo(px,py);if(i===4||i===6){ctx.moveTo(px,py);ctx.lineTo(px+(j?1:-1)*26,py+38);ctx.moveTo(px,py);}}ctx.stroke();}ctx.restore();}});jobs.push(tween(320,k=>{q.k=k;}));}}
    await Promise.all(jobs);sfx('thunder');flash('152,89,220',.2,.06);shake(10);hitStop(38);
    if(r===2)for(const t of live)if(t.alive&&!marked.has(t)){marked.add(t);t.hurt=.45;hit(A1,t,sk);}
    await wait(90);
  }
  await tween(360,k=>cloud.a=1-k);cloud.on=false;await dimTo(0,null,240);
};

// Csillagözön: csillagpontokból összeálló sárkánykép, majd az aranyra váltó
// festett sárkány egyetlen folytonos, teljes pályás átrepülése. Nincs meteorzápor.
R16P['Csillagözön']=async(A1,B1,al,sk)=>{
  const live=al.filter(t=>t.alive);if(!live.length)return;const im=R17I.constellation,{mx,my}=grp(live),stars=[];
  const nodes=[[-.40,-.12],[-.31,-.29],[-.18,-.20],[-.05,-.07],[.12,-.14],[.25,-.32],[.29,-.12],[.45,-.06],[.31,.04],[.43,.22],[.21,.14],[.07,.31],[-.08,.19],[-.25,.34],[-.31,.16],[-.40,-.12]];
  for(let i=0;i<190;i++)stars.push({x:(i*137.5)%W,y:(i*71)%Math.max(230,H*.63),r:.7+(i%4)*.5,p:i*.81});
  const C={a:0,k:0,on:true},hitSet=new Set();await dimTo(.82,'3,5,25',250);await Promise.all([r16Raise(A1,'255,232,169'),r16Raise(B1,'255,232,169')]);sfx('holy');
  R20IE({update(){return C.on;},draw(){if(!C.a)return;ctx.save();ctx.globalAlpha=C.a;const bg=ctx.createLinearGradient(0,0,0,H);bg.addColorStop(0,'rgba(2,5,24,.98)');bg.addColorStop(1,'rgba(11,13,43,.94)');ctx.fillStyle=bg;ctx.fillRect(0,0,W,H);for(const p of stars){ctx.globalAlpha=C.a*(.5+.5*Math.sin(T*2.8+p.p));ctx.fillStyle='#fff4cb';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,6.29);ctx.fill();}
    const x=mx,y=my-H*.2,s=Math.min(W*.92,H*1.28),pts=nodes.map(([a,b])=>({x:x+a*s,y:y+b*s}));ctx.globalAlpha=C.a;ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle='rgba(236,221,255,.92)';ctx.shadowColor='#e5ceff';ctx.shadowBlur=16;ctx.lineWidth=3;ctx.beginPath();for(let i=0;i<Math.min(pts.length,Math.floor(C.k*(pts.length-1))+1);i++)i?ctx.lineTo(pts[i].x,pts[i].y):ctx.moveTo(pts[i].x,pts[i].y);ctx.stroke();for(let i=0;i<Math.min(pts.length,Math.floor(C.k*pts.length));i++){ctx.fillStyle='#fff8dd';ctx.beginPath();ctx.arc(pts[i].x,pts[i].y,4.5+Math.sin(T*5+i)*1.5,0,6.29);ctx.fill();}ctx.restore();}});
  await tween(500,k=>{C.a=easeIO(k);C.k=0;});await tween(1180,k=>{C.k=easeIO(k);});sfx('roar');
  const D={x:-W*.3,y:my-H*.1,a:0,body:0,on:true,trail:[]};
  R20IE({update(){return D.on||D.trail.length>1;},draw(){if(D.a<=0||!im)return;const path=D.trail.slice(0,170);if(path.length>1){ctx.save();ctx.filter='sepia(1) saturate(4) hue-rotate(-12deg) brightness(1.28)';r17Snake(im,path,W*.95,Math.min(H*.46,285),D.a,.62);ctx.restore();}}});
  await tween(350,k=>{D.a=easeIO(k);D.body=k;C.k=1;});
  await tween(2100,k=>{const e=k*k*(3-2*k);D.x=-W*.34+(W*1.62)*e;D.y=my-H*.16+Math.sin(k*Math.PI*3)*H*.085;D.trail.unshift({x:D.x,y:D.y,b:D.y<my-85});if(D.trail.length>190)D.trail.pop();for(const t of live)if(t.alive&&!hitSet.has(t)&&D.x>cx(t)-64){hitSet.add(t);toss(t,68,440);t.hurt=.5;shake(16);hitStop(58);flash('255,219,129',.3,.08);}}
  );for(const t of live)if(t.alive&&!hitSet.has(t)){hitSet.add(t);toss(t,64,420);}for(const t of live)if(t.alive)hit(A1,t,sk);
  await tween(440,k=>{D.a=1-k;C.a=1-k;});D.on=false;C.on=false;r16Lower(A1);r16Lower(B1);await dimTo(0,null,270);
};

// Árnyroham: Morgána sötét kötegei Grog testébe futnak. Grog lendületből
// átrohan a soron; a találatnál széles, szabálytalan fekete-lila vágás nyílik.
R16P['Árnyroham']=async(A1,B1,al,sk)=>{
  const witch=A1.type==='witch'?A1:B1,orc=witch===A1?B1:A1,live=al.filter(t=>t.alive);if(!live.length)return;
  const x0=orc.ox||0,y0=orc.oy||0,home=cx(orc),hand=()=>handPos(witch),aura={k:0,on:true},hitSet=new Set();
  await dimTo(.68,'5,1,16',240);await r16Raise(witch,'119,43,183');sfx('dark');
  R20IE({update(){return aura.on;},draw(){if(!aura.k)return;const p=hand(),cx0=cx(orc),cy=midY(orc);ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<9;i++){const q=i/8,side=(i%2?1:-1);ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.bezierCurveTo(p.x+side*80,cy-170+q*24,cx0-130,cy+130-q*18,cx0+Math.sin(T*4+i)*18,cy);ctx.strokeStyle=i%3?'rgba(22,5,36,.96)':'rgba(112,34,158,.95)';ctx.lineWidth=i%3?17:8;ctx.lineCap='round';ctx.stroke();}ctx.restore();ctx.save();ctx.globalCompositeOperation='lighter';glow(cx0,cy,orc.h*orc.scale*.8,'72,19,112',.5*aura.k);ctx.restore();}});
  await tween(760,k=>{aura.k=easeIO(k);orc._r16tint={rgb:'26,7,43',a:.92*k};});await tween(220,k=>{orc.scale*=1+.001*k;});r16Lower(witch);ghosts(orc,650);sfx('roar');
  const start=home,end=Math.max(...live.map(cx))+220,sw={x:start,a:0,on:true},sl=R17I.darkslash;
  R20IE({update(){return sw.on;},draw(){if(sw.a<=0)return;const y=midY(orc),len=Math.max(140,sw.x-start);ctx.save();ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(8,2,15,.95)';ctx.beginPath();ctx.moveTo(start-20,y+24);ctx.quadraticCurveTo((start+sw.x)*.48,y-75,sw.x,y-17);ctx.lineTo(sw.x+40,y+10);ctx.quadraticCurveTo((start+sw.x)*.54,y+93,start-20,y+24);ctx.fill();ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(124,42,174,.9)';ctx.lineWidth=13;ctx.stroke();if(sl)r17Draw(sl,(start+sw.x)*.5,y,Math.max(300,len+270),{a:sw.a*.72,add:true,sy:.8});ctx.restore();}});
  orc.pose='attack';await tween(1080,k=>{const e=k*k*(3-2*k);orc.ox=x0+(end-start)*e;orc.oy=y0+Math.sin(k*Math.PI*2)*19;orc.jump=Math.sin(k*Math.PI)*32;orc.lean=.34;sw.x=cx(orc);sw.a=Math.min(1,k*3);for(const t of live)if(t.alive&&!hitSet.has(t)&&orc.ox+x0>cx(t)-45){hitSet.add(t);t.hurt=.52;toss(t,72,460);shake(17);hitStop(64);sfx('slash');hit(orc,t,sk);}});
  for(const t of live)if(t.alive&&!hitSet.has(t))hit(orc,t,sk);await tween(420,k=>{orc.ox=x0+(end-start)*(1-easeIO(k));orc.oy=y0*(1-k);orc.jump=0;orc.lean=.34*(1-k);sw.a=1-k;orc._r16tint.a=.92*(1-k);});orc.ox=x0;orc.oy=y0;orc.jump=0;orc.lean=0;orc._r16tint=null;orc.pose='idle';sw.on=false;aura.on=false;await dimTo(0,null,250);
};

// A Sárkánynyíl részletes, felhúzott íjas változata készen áll az r20b rétegben;
// azt tesszük vissza aktívra, mert az r20e visszaesett a korábbi, kisebb jelenetre.
if(typeof R21P==='object'&&R21P['Sárkánynyíl'])R16P['Sárkánynyíl']=R21P['Sárkánynyíl'];

// Lótuszvihar: kisebb virág; sok, valódi nyíl ugyanazon a forgó gyűrűn fut,
// mint a szirmok. Nincs láng, a mozgás végig egyenletes és közös ritmusú.
R16P['Lótuszvihar']=async(A1,B1,al,sk)=>{
  const monk=A1.type==='monk'?A1:B1,fairy=monk===A1?B1:A1,live=al.filter(t=>t.alive);if(!live.length)return;
  const {mx,gy}=grp(live),im=R17I.lotus,pet=R17I.petal,L={a:0,open:0,spin:0,petals:0,on:true},N=28,shots=Array.from({length:N},(_,i)=>({a:i*Math.PI*2/N,r:104+(i%4)*11}));
  await dimTo(.34,'27,10,29',220);await Promise.all([r16Raise(monk,'255,218,168'),r16Raise(fairy,'245,149,204')]);sfx('holy');
  R20IE({update(dt){L.spin+=dt*2.15;return L.on;},draw(){if(L.a<=0)return;const baseY=gy+25;
    if(im)r17Draw(im,mx,baseY,210*L.a,{anchor:'bottom',sy:.45+.55*L.open,a:L.a});
    for(let i=0;i<N;i++){const ang=i*Math.PI*2/N+L.spin*(.74+(i%3)*.025),r=116+(i%4)*10,x=mx+Math.cos(ang)*r*L.a,y=gy-120+Math.sin(ang)*r*.56*L.a;
      ctx.save();ctx.translate(x,y);ctx.rotate(ang+.32);if(pet)r17Draw(pet,0,0,42,{a:L.a});else{ctx.fillStyle='#df78aa';ctx.beginPath();ctx.ellipse(0,0,19,7,0,0,6.29);ctx.fill();}ctx.restore();
      const ar=shots[i],aa=ar.a+L.spin*(.74+(i%3)*.025),ax=mx+Math.cos(aa)*ar.r*L.a,ay=gy-120+Math.sin(aa)*ar.r*.56*L.a;ctx.save();ctx.translate(ax,ay);ctx.rotate(aa+Math.PI/2);ctx.strokeStyle='#56351e';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-24,0);ctx.lineTo(19,0);ctx.stroke();ctx.strokeStyle='#e4c58b';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(17,0);ctx.stroke();ctx.fillStyle='#fff0c5';ctx.beginPath();ctx.moveTo(25,0);ctx.lineTo(12,-6);ctx.lineTo(16,0);ctx.lineTo(12,6);ctx.closePath();ctx.fill();ctx.restore();
    }
  }});
  await tween(460,k=>{L.a=eOutBack(k);});await tween(620,k=>{L.open=easeIO(k);});r16Lower(fairy);await tween(1340,k=>{L.spin=3.4*k;L.petals=k;});sfx('wind');monk.pose='shoot';
  const done=new Set();for(let i=0;i<N;i++){const t=live[i%live.length];if(!t.alive)continue;const ar=shots[i],a=ar.a+L.spin,x=mx+Math.cos(a)*ar.r,y=gy-120+Math.sin(a)*ar.r*.56;sfx('whoosh');await flyObj({x,y},{x:cx(t)+rnd(-36,36),y:midY(t)},270,(xx,yy,r)=>{ctx.save();ctx.translate(xx,yy);ctx.rotate(r);ctx.strokeStyle='#5b3a23';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-25,0);ctx.lineTo(18,0);ctx.stroke();ctx.fillStyle='#fff0c2';ctx.beginPath();ctx.moveTo(27,0);ctx.lineTo(13,-7);ctx.lineTo(17,0);ctx.lineTo(13,7);ctx.fill();ctx.restore();});if(!done.has(t)){done.add(t);bigBoom(cx(t),midY(t),.52);toss(t,56,390);hit(monk,t,sk);}await wait(24);}
  monk.pose='idle';await tween(500,k=>{L.a=1-k;});L.on=false;await dimTo(0,null,240);
};

// Tündérököl: az aranypor Lili kezétől Grog öklére száll; a kesztyű a kézhez
// tapad, és Grog teljes testtel lendül bele az egyetlen nagy ütésbe.
R16P['Tündérököl']=async(A1,B1,al,sk)=>{
  const fairy=A1.type==='fairy'?A1:B1,orc=fairy===A1?B1:A1,live=al.filter(t=>t.alive);if(!live.length)return;
  const s0=orc.scale,x0=orc.ox||0,y0=orc.oy||0,src=()=>handPos(fairy),dst=()=>handPos(orc),dust=[],G={a:0,on:true};
  await dimTo(.38,'39,25,0',230);await r16Raise(fairy,'255,219,113');sfx('holy');
  R20IE({update(dt){for(const p of dust){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy-=18*dt;}for(let i=dust.length-1;i>=0;i--)if(dust[i].t>dust[i].life)dust.splice(i,1);return G.on;},draw(){const b=dst();ctx.save();ctx.globalCompositeOperation='lighter';for(const p of dust){const a=Math.max(0,1-p.t/p.life);ctx.globalAlpha=a;ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,p.r*(.7+p.t),0,6.29);ctx.fill();}ctx.restore();if(G.a<=0)return;
    const x=b.x+22,y=b.y-7,s=orc.scale,sc=G.a*s;ctx.save();ctx.translate(x,y);ctx.rotate(-.34+orc.lean*.25);ctx.scale(sc,sc);ctx.globalAlpha=G.a;ctx.globalCompositeOperation='lighter';glow(0,0,80,'255,194,42',.55);ctx.globalCompositeOperation='source-over';const gold=ctx.createLinearGradient(-35,-40,38,45);gold.addColorStop(0,'#fff5c5');gold.addColorStop(.28,'#ffd85b');gold.addColorStop(.62,'#e5a321');gold.addColorStop(1,'#8c4d0e');ctx.fillStyle=gold;ctx.strokeStyle='#fff1b1';ctx.lineWidth=3;
    // Ököl, négy külön bütyök, hüvelykujj és látható mandzsetta.
    ctx.beginPath();ctx.moveTo(-35,15);ctx.lineTo(-30,-18);ctx.quadraticCurveTo(-29,-29,-20,-26);ctx.lineTo(-18,-40);ctx.quadraticCurveTo(-14,-47,-8,-39);ctx.lineTo(-5,-48);ctx.quadraticCurveTo(2,-53,6,-43);ctx.lineTo(10,-49);ctx.quadraticCurveTo(18,-52,20,-39);ctx.lineTo(27,-41);ctx.quadraticCurveTo(37,-38,33,-22);ctx.lineTo(28,10);ctx.quadraticCurveTo(18,31,-10,30);ctx.lineTo(-35,15);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#a96714';ctx.fillRect(-31,15,48,13);ctx.strokeRect(-31,15,48,13);ctx.restore();
  }});
  const charge=760;await tween(charge,k=>{const a=src(),b=dst();G.a=easeIO(k);orc.scale=s0*(1+.1*k);for(let i=0;i<5;i++){const q=(k*2+i/5)%1;dust.push({x:a.x+(b.x-a.x)*q+rnd(-7,7),y:a.y+(b.y-a.y)*q-Math.sin(q*Math.PI)*48,vx:rnd(-13,13),vy:-rnd(5,45),t:0,life:.45,r:rnd(2,5),c:i%2?'#fff2a8':'#ffcf45'});}});r16Lower(fairy);sfx('roar');orc.pose='attack';
  const t0=live.slice().sort((a,b)=>Math.abs(cx(a)-cx(orc))-Math.abs(cx(b)-cx(orc)))[0],dx=t0?cx(t0)-cx(orc):0,dy=t0?midY(t0)-midY(orc):0;
  await tween(300,k=>{orc.ox=x0+dx*.16*easeIO(k);orc.oy=y0+dy*.08*k;orc.lean=-.16*k;});sfx('whoosh');ghosts(orc,520);
  await tween(360,k=>{orc.ox=x0+dx*.2+dx*.16*k;orc.jump=38*Math.sin(k*Math.PI);orc.lean=-.16+.62*k;G.a=1+.12*Math.sin(k*Math.PI);});
  await tween(145,k=>{orc.ox=x0+dx*.36*(1-k);orc.jump=38*(1-k);orc.lean=.46-.8*k;});orc.jump=0;sfx('boom');shake(22);hitStop(120);flash('255,226,133',.72,.18);const b=dst();bigBoom(b.x,b.y,.9);
  for(const t of live)if(t.alive){t.hurt=.52;toss(t,78,470);for(let i=0;i<22;i++)part({x:cx(t)+rnd(-45,45),y:midY(t)+rnd(-38,38),vx:rnd(-300,300),vy:rnd(-340,100),g:380,life:.58,size:rnd(3,8),rgb:pick(['255,194,35','255,238,157','183,111,17']),shape:'star'});hit(orc,t,sk);}
  await tween(420,k=>{G.a=1-k;orc.ox=x0*(1-k);orc.oy=y0*(1-k);orc.jump=0;orc.lean=.46*(1-k);orc.scale=s0*(1+.1*(1-k));});G.on=false;orc.ox=x0;orc.oy=y0;orc.jump=0;orc.lean=0;orc.scale=s0;orc.pose='idle';await dimTo(0,null,250);
};

// Meglévő képlapokból, rajzolt villámokból és saját testmozgásból áll az új réteg;
// a tűzsárkány és a lótusz sem kap lángot a kért mozgáson kívül.
