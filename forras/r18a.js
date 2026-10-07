// ===== 19. kör: a 18. kör tesztlapjának (s001–s017) javításai =====
const R18E=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

// ---- Grog – Földrepesztés: a groundCrack nagy sziklaképét (a „nagy kitörést”) NEM hívjuk; saját, élethű repedés + sok kőtüske sorban
function r18Spike(x,gy,h,w,seed,k,dark){if(k<=0)return;const R=n=>{const v=Math.sin(seed*91.7+n*13.3)*43758.5;return v-Math.floor(v);};
  ctx.save();ctx.translate(x,gy);ctx.scale(1,k);const tip=[-w*.08+R(1)*w*.16,-h],L=[-w/2,0],Rr=[w/2,0],mL=[-w*.34+R(2)*4,-h*.42],mR=[w*.3+R(3)*4,-h*.5],mid=[w*.04,0];
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.beginPath();ctx.ellipse(0,2,w*.75,6,0,0,6.29);ctx.fill();
  const sh=dark?.72:1,c=(r,g,b)=>`rgb(${r*sh|0},${g*sh|0},${b*sh|0})`;
  // bal (megvilágított) lap
  let g=ctx.createLinearGradient(L[0],0,tip[0],tip[1]);g.addColorStop(0,c(120,104,88));g.addColorStop(1,c(196,182,160));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(L[0],L[1]);ctx.lineTo(mL[0],mL[1]);ctx.lineTo(tip[0],tip[1]);ctx.lineTo(mid[0],mid[1]);ctx.closePath();ctx.fill();
  // jobb (árnyékos) lap
  g=ctx.createLinearGradient(Rr[0],0,tip[0],tip[1]);g.addColorStop(0,c(58,48,40));g.addColorStop(1,c(112,98,84));ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(mid[0],mid[1]);ctx.lineTo(tip[0],tip[1]);ctx.lineTo(mR[0],mR[1]);ctx.lineTo(Rr[0],Rr[1]);ctx.closePath();ctx.fill();
  // élek, repedések, lepattant kőszilánkok
  ctx.strokeStyle='#241a12';ctx.lineWidth=1.8;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(L[0],L[1]);ctx.lineTo(mL[0],mL[1]);ctx.lineTo(tip[0],tip[1]);ctx.lineTo(mR[0],mR[1]);ctx.lineTo(Rr[0],Rr[1]);ctx.stroke();
  ctx.strokeStyle='rgba(255,250,235,.55)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(tip[0],tip[1]);ctx.lineTo(mid[0]-1,-h*.15);ctx.stroke();
  ctx.strokeStyle='rgba(30,22,14,.7)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-w*.18,-h*.2);ctx.lineTo(-w*.06,-h*.36);ctx.lineTo(-w*.12,-h*.5);ctx.moveTo(w*.14,-h*.12);ctx.lineTo(w*.2,-h*.3);ctx.stroke();
  ctx.fillStyle=c(150,136,118);for(let i=0;i<3;i++){const px=(R(10+i)-.5)*w*1.3,py=-R(20+i)*5;ctx.beginPath();ctx.moveTo(px-4,py);ctx.lineTo(px,py-6-R(i)*4);ctx.lineTo(px+5,py);ctx.closePath();ctx.fill();}
  ctx.restore();}
function r18Crack(x0,x1,gy,k,seed){if(k<=0)return;const R=n=>{const v=Math.sin(seed*31.1+n*7.7)*43758.5;return v-Math.floor(v);};const xe=x0+(x1-x0)*k;
  ctx.save();ctx.lineCap='round';ctx.lineJoin='round';const path=[];for(let i=0;i<=40;i++){const q=i/40,x=x0+(x1-x0)*q;if(x>xe)break;path.push([x,gy+(R(i)-.5)*10]);}
  for(const [w,col] of [[11,'rgba(40,28,18,.45)'],[6,'#1a120c'],[2,'rgba(0,0,0,.9)']]){ctx.strokeStyle=col;ctx.lineWidth=w;ctx.beginPath();path.forEach(([a,b],i)=>i?ctx.lineTo(a,b):ctx.moveTo(a,b));ctx.stroke();}
  ctx.strokeStyle='#1a120c';ctx.lineWidth=2.5;for(let i=4;i<path.length;i+=5){const [a,b]=path[i],d=R(i+50)>.5?1:-1;ctx.beginPath();ctx.moveTo(a,b);ctx.lineTo(a+14+R(i)*14,b+d*(8+R(i+3)*10));ctx.lineTo(a+22+R(i)*20,b+d*(10+R(i+9)*16));ctx.stroke();}
  ctx.restore();}
A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u,'attack');try{const {gy}=grp(al);
  // felugrik, és a fejszével a földbe csap
  await tween(260,k=>{u.sq=1-.12*easeIO(k);u.lean=-.12*k;});sfx('whoosh');await tween(300,k=>{u.jump=Math.sin(k*Math.PI*.5)*110;u.sq=.88+.2*k;u.lean=-.12+.1*k;});
  await tween(130,k=>{u.jump=110*(1-k*k);u.lean=-.02+.34*k;});u.jump=0;sfx('rock');sfx('boom');shake(18);hitStop(90);rumble(1.6,7);flash('255,235,200',.25,.12);
  const x0=cx(u)+50,x1=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5))+120,y0=u.y+u.oy;dustWave(x0,y0);puffs(x0,y0-6,14,['170,150,120','140,120,100'],[22,40],{w:60,up:90});
  for(let i=0;i<22;i++)part({x:x0+rnd(-20,40),y:y0-rnd(0,10),vx:rnd(-160,260),vy:rnd(-460,-200),g:1000,life:rnd(.6,1),size:rnd(4,9),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});
  // a repedés végigfut, utána sorban tüskék törnek fel – három sorban (hátul sötétebb, kisebb)
  const C={k:0},spikes=[];const n=20;
  for(let row=0;row<3;row++)for(let i=0;i<n;i++){const q=(i+.5)/n,x=x0+(x1-x0)*q+rnd(-10,10),dep=[-14,0,12][row],sc=[.72,1,.88][row];
    spikes.push({x,gy:gy+6+dep,h:rnd(62,118)*sc*(0.8+.4*Math.sin(q*Math.PI)),w:rnd(40,64)*sc,seed:i*7+row*131+rnd(0,1),k:0,d:q*900+row*60+rnd(0,40),t:0,dark:row===0,row});}
  spikes.sort((a,b)=>a.row===b.row?0:(a.row===0?-1:b.row===0?1:a.row-b.row));
  const st={t:0,on:true},hitDone=new Set();
  R18E({update(dt){st.t+=dt*1000;C.k=Math.min(1,st.t/900);for(const s of spikes){if(st.t<s.d)continue;const was=s.k;s.t+=dt;s.k=s.t<.1?eOutBack(s.t/.1):s.t<1.1?1:Math.max(0,1-(s.t-1.1)/.3);
        if(was===0&&s.k>0){if(Math.random()<.35)sfx('rock');for(let j=0;j<3;j++)part({x:s.x+rnd(-10,10),y:s.gy-rnd(0,6),vx:rnd(-90,90),vy:rnd(-320,-140),g:1000,life:rnd(.4,.7),size:rnd(3,7),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});
          if(Math.random()<.5)puffs(s.x,s.gy-6,1,['170,150,120','150,135,115'],[14,22],{w:16,up:50});shake(4);
          if(s.row===1)for(const t of al)if(!hitDone.has(t)&&Math.abs(cx(t)-s.x)<36){hitDone.add(t);hitStop(60);toss(t,70,420);t.hurt=.5;hit(u,t,sk);}}}
      return st.on;},
    draw(){r18Crack(x0,x1,gy+8,C.k,3);for(const s of spikes)r18Spike(s.x,s.gy,s.h,s.w,s.seed,s.k,s.dark);}});
  await wait(900+180+1300);st.on=false;for(const t of al)if(!hitDone.has(t)&&t.alive)hit(u,t,sk);await bodySettle(u);}finally{rel();u.jump=0;u.lean=0;u.sq=1;}};

// ---- Vázagólem – Mázpáncél: a végigfutó fénycsík csak a pajzs alakján belül látszik (nem téglalap)
{let SHC=null;drawVaseWall=function(e,a){const S0=r16VaseShield(),vw=e._vwall||{},k=vw.k==null?1:vw.k;a=Math.min(1,a/.6);const Hh=e.h*e.scale*1.45,sc=Hh/S0.H1,x=cx(e)-e.w*e.scale*.7,top=e.y+e.oy-Hh-4;
  ctx.save();ctx.globalAlpha=a;ctx.translate(x-S0.W1*sc/2,top);ctx.scale(sc,sc);
  if(k>=1){if(!SHC){SHC=document.createElement('canvas');SHC.width=S0.c.width;SHC.height=S0.c.height;}const g=SHC.getContext('2d');g.globalCompositeOperation='source-over';g.clearRect(0,0,SHC.width,SHC.height);g.drawImage(S0.c,0,0);
    const shn=(T*.6)%2;if(shn<1){g.globalCompositeOperation='source-atop';const sx=-80+shn*(S0.W1+160)+S0.PAD,gr=g.createLinearGradient(sx-50,0,sx+50,0);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.5,'rgba(255,255,255,.45)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(sx-50,0,100,SHC.height);g.globalCompositeOperation='source-over';}
    ctx.drawImage(SHC,-S0.PAD,-S0.PAD);}
  else for(const pc of S0.pieces){const q=Math.max(0,Math.min(1,(k-pc.d*.55)/.45));if(q<=0)continue;const e2=eOutBack(q),ang=Math.atan2(pc.cy-S0.H1*.5,pc.cx-S0.W1*.5),fx=Math.cos(ang)*300*(1-e2),fy=Math.sin(ang)*300*(1-e2)-120*(1-e2),rot=(1-e2)*(pc.d>.5?2:-2);
    ctx.save();ctx.translate(pc.cx+fx,pc.cy+fy);ctx.rotate(rot);ctx.translate(-pc.cx,-pc.cy);ctx.beginPath();pc.p.forEach(([px,py],i)=>i?ctx.lineTo(px,py):ctx.moveTo(px,py));ctx.closePath();ctx.clip();ctx.drawImage(S0.c,-S0.PAD,-S0.PAD);ctx.restore();}
  ctx.restore();};
 // a hősök felé fordítás (17. kör) újra rá
 const dv=drawVaseWall;drawVaseWall=function(e,a){ctx.save();const x=cx(e)-e.w*e.scale*.7,y=e.y+e.oy-e.h*e.scale*.7;ctx.translate(x,y);ctx.transform(.8,-.1,0,1,0,0);ctx.translate(-x,-y);try{dv(e,a);}finally{ctx.restore();}};}

// ---- Espresszó (idézés): a SAJÁT állkapcsa leesik (a képből kivágott állkapocs az ízületnél elfordul), a torka izzik, és onnan ömlik a láng
// a pontok az espresso képen (balra néző, tükrözetlen) rácson lemérve
const R18_JAW={poly:[[.150,.258],[.20,.264],[.26,.270],[.33,.263],[.39,.250],[.41,.29],[.37,.322],[.30,.338],[.24,.348],[.20,.356],[.165,.335],[.15,.295]],pivot:[.385,.268]};
const R18_JC={};
function r18EspImg(J){const im=ENEMY_SPR.espresso;if(!im)return null;const q=Math.round(Math.max(0,Math.min(1,J))*10);if(q===0)return im;if(R18_JC[q])return R18_JC[q];
  const W0=im.width,H0=im.height,c=document.createElement('canvas');c.width=W0;c.height=H0;const g=c.getContext('2d'),P=R18_JAW,path=(gg)=>{gg.beginPath();P.poly.forEach(([a,b],i)=>i?gg.lineTo(a*W0,b*H0):gg.moveTo(a*W0,b*H0));gg.closePath();};
  const jaw=document.createElement('canvas');jaw.width=W0;jaw.height=H0;const jg=jaw.getContext('2d');path(jg);jg.clip();jg.drawImage(im,0,0);
  g.drawImage(im,0,0);g.save();path(g);g.clip();g.clearRect(0,0,W0,H0);g.drawImage(im,0,-.09*H0);g.restore();
  const rot=-.42*q/10,px=P.pivot[0]*W0,py=P.pivot[1]*H0,rp=(u,v)=>{const dx=u*W0-px,dy=v*H0-py;return [px+dx*Math.cos(rot)-dy*Math.sin(rot),py+dx*Math.sin(rot)+dy*Math.cos(rot)];};
  // a szájüreg: az ajak alja és a leesett állkapocs felső éle közötti rész – sötétvörös torok, belül izzó parázs
  const top=P.poly.slice(0,5).map(([u,v])=>[u*W0,v*H0]),bot=P.poly.slice(0,5).map(([u,v])=>rp(u,v)).reverse();
  g.save();g.beginPath();top.forEach(([a,b],i)=>i?g.lineTo(a,b):g.moveTo(a,b));bot.forEach(([a,b])=>g.lineTo(a,b));g.closePath();
  const gr=g.createRadialGradient(px-W0*.06,py+H0*.02,2,px-W0*.06,py+H0*.02,W0*.2);gr.addColorStop(0,'#fff0b0');gr.addColorStop(.25,'#ff9a30');gr.addColorStop(.6,'#8a1408');gr.addColorStop(1,'#2a0402');g.fillStyle=gr;g.fill();
  g.strokeStyle='#2a0806';g.lineWidth=W0*.004;g.stroke();g.restore();
  // fogak a felső ajkon
  g.fillStyle='#fff6e6';g.strokeStyle='#3a1a10';g.lineWidth=W0*.002;for(let i=0;i<5;i++){const [a,b]=top[Math.min(4,i)],w2=W0*.012;g.beginPath();g.moveTo(a-w2,b-1);g.lineTo(a,b+H0*.022);g.lineTo(a+w2,b-1);g.closePath();g.fill();g.stroke();}
  g.save();g.translate(px,py);g.rotate(rot);g.translate(-px,-py);g.drawImage(jaw,0,0);g.restore();
  // alsó fogak a leesett állkapocs élén, felfelé
  g.fillStyle='#fff6e6';g.strokeStyle='#3a1a10';g.lineWidth=W0*.002;const bt=bot.slice().reverse();for(let i=0;i<4;i++){const [a,b]=bt[i],w2=W0*.011;g.beginPath();g.moveTo(a-w2+W0*.02,b+1);g.lineTo(a+W0*.02,b-H0*.02);g.lineTo(a+w2+W0*.02,b+1);g.closePath();g.fill();g.stroke();}
  return R18_JC[q]=c;}
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let JAW=0;es.img=()=>r18EspImg(JAW)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
  es.run=async(P,S0)=>{const im=ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;const x0=S0.x,s0=S0.s||1,m=()=>im?sumPt(es,S0,im,.175,.29):{x:S0.x+120,y:S0.y-200};
    sfx('growl');const G={a:0,on:true};
    R18E({update(){if(G.on&&Math.random()<.9){const p=m();part({x:p.x+rnd(-6,6),y:p.y+rnd(-4,4),vx:rnd(20,80),vy:rnd(-30,10),life:.35,size:rnd(3,6),rgb:pick(['255,200,90','255,120,40'])});}return G.on;},draw(){if(G.a<=0)return;const p=m();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,30+50*G.a,'255,120,30',.6*G.a);glow(p.x,p.y,12+14*G.a,'255,240,200',.9*G.a);ctx.restore();}});
    // felhúzás: hátradől, kitátja a száját, a torkában parázs gyűlik
    await tween(560,k=>{const e=easeIO(k);S0.x=x0-34*e;S0.s=s0*(1+.06*e);JAW=e;G.a=k;});rumble(2,12);flash('255,160,60',.4,.25);sfx('fire');sfx('boom');
    tween(180,k=>{S0.x=x0-34+80*eOutBack(k);S0.s=s0*(1.06-.04*k);});const bz=setInterval(()=>sfx('fire'),280);const scorch=[];
    await fireBreath(m(),fs,1,{dur:2200,speed:1100,n:40,onHit:t=>{if(!t.alive)return;shake(10);if(!scorch.includes(t)){scorch.push(t);hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}}});
    clearInterval(bz);G.on=false;for(const t of fs)if(t.alive&&!scorch.includes(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    await tween(320,k=>{S0.x=x0+46*(1-k);S0.s=s0*(1.02-.02*k);JAW=1-k;G.a=1-k;});JAW=0;await wait(250);};}}

// ---- Espresszó – Lecsapás: felugrik az égbe (kirepül a képből), az árnyéka a hősön nő, aztán teljes súllyal becsapódik
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const W0=u.w*u.scale,dx=(cx(t)+W0*.5)-cx(u),dy=(t.y+4)-u.y,gy0=u.y+u.oy;
  // guggolás
  await tween(320,k=>{const e=easeIO(k);u.sq=1-.2*e;u.lean=.1*e;});sfx('wind');sfx('whoosh');
  dustWave(cx(u),gy0);puffs(cx(u),gy0-6,16,['190,170,140','160,140,120'],[26,46],{w:140,up:90});shake(10);
  for(let i=0;i<16;i++)part({x:cx(u)+rnd(-60,60),y:gy0-rnd(0,8),vx:rnd(-200,200),vy:rnd(-380,-160),g:1000,life:rnd(.5,.9),size:rnd(4,8),rgb:pick(['150,140,130','110,100,95']),add:false,shape:'rock'});
  // elrugaszkodás – fel az égbe, ki a képből
  await tween(460,k=>{const e=k*k;u.jump=e*900;u.sq=1+.3*Math.min(1,k*3)*(1-k*.5);u.lean=-.15*k;});
  u.alpha=0;u.ox=dx;u.oy=dy;await wait(220);
  // árnyék nő a célpont alatt, süvítés
  const Sh={a:0,on:true},sx=cx(t),sgy=t.y+t.oy+4;R18E({update(){return Sh.on;},draw(){if(Sh.a<=0)return;ctx.save();ctx.globalAlpha=.55*Sh.a;ctx.fillStyle='#000';ctx.beginPath();ctx.ellipse(sx,sgy,40+150*Sh.a,8+26*Sh.a,0,0,6.29);ctx.fill();ctx.restore();}});
  sfx('whoosh');await tween(520,k=>{Sh.a=k;});rumble(.5,4);
  // lezuhan
  u.alpha=1;u.jump=900;u.sq=1.25;u.lean=.2;await tween(240,k=>{const e=k*k;u.jump=900*(1-e);u.sq=1.25-.1*k;
    if(Math.random()<.9)part({x:cx(u)+rnd(-60,60),y:u.y+u.oy-u.jump-rnd(0,u.h*u.scale),vx:rnd(-20,20),vy:-rnd(200,400),life:.25,size:rnd(2,4),rgb:'255,240,220',shape:'streak'});});u.jump=0;Sh.on=false;
  // becsapódás
  const x=cx(t),y=midY(t),gy=t.y+t.oy;sfx('rock');sfx('boom');sfx('boom');hitStop(180);shake(32);rumble(1.2,14);flash('255,230,190',.5,.18);punch(x,y,.09);
  r18Crater(x,gy);dustWave(x,gy);dustWave(x,gy,1);dustWave(x,gy,-1);puffs(x,gy-10,26,['190,170,140','160,140,120','130,115,100'],[30,60],{w:260,up:160});
  for(let i=0;i<40;i++)part({x:x+rnd(-80,80),y:gy-rnd(0,10),vx:rnd(-420,420),vy:rnd(-620,-200),g:1100,life:rnd(.7,1.2),size:rnd(5,12),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});
  toss(t,110,520);t.hurt=.6;hit(u,t,sk);
  await tween(380,k=>{const s=Math.exp(-5*k)*Math.cos(k*14);u.sq=1-.28*s;u.lean=.22*s;});u.sq=1;u.lean=0;await wait(200);
  // visszaugrik a helyére
  await tween(520,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*140;u.sq=1+.06*Math.sin(k*Math.PI*2);});u.ox=0;u.oy=0;u.jump=0;u.sq=1;}finally{rel();u.alpha=1;u.spin=0;u.lean=0;u.sq=1;}};
// kráter a becsapódás helyén (lassan elhalványul)
function r18Crater(x,gy){const c={t:0};R18E({update(dt){c.t+=dt;return c.t<2.4;},draw(){const a=c.t<2?1:1-(c.t-2)/.4;ctx.save();ctx.globalAlpha=a*.85;ctx.translate(x,gy+4);ctx.scale(1,.24);
  const g=ctx.createRadialGradient(0,0,10,0,0,150);g.addColorStop(0,'rgba(30,20,12,.9)');g.addColorStop(.6,'rgba(70,52,36,.6)');g.addColorStop(1,'rgba(90,70,50,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,150,0,6.29);ctx.fill();
  ctx.strokeStyle='rgba(25,16,10,.8)';ctx.lineWidth=5;for(let i=0;i<9;i++){const an=i/9*6.283+.3;ctx.beginPath();ctx.moveTo(Math.cos(an)*60,Math.sin(an)*60);ctx.lineTo(Math.cos(an+.1)*120,Math.sin(an+.1)*120);ctx.lineTo(Math.cos(an-.05)*170,Math.sin(an-.05)*170);ctx.stroke();}ctx.restore();}});}
