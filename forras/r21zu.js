// ===== 63. kör: tesztlap-jelölések (27 beküldött, 17 hibás) =====

// ---- 1) Barlangi béka („levágja a fél békát, és két nyelv csap le”): a béka egészben marad (álló kép), és csak EGY nyelv
//    nyúlik ki a szája résénél: a festett nyelv, a szájhoz igazított vastagsággal
A.frogTongue=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const TG=R17I.frogtongue;u.pose='idle';u._r21tg=null;
  const mo=()=>KP(u,.13,.36),hmax=Math.max(9,u.h*(u.scale||1)*.07),T0={k:0,on:true};
  R18E({update(){return T0.on;},draw(){if(!TG||T0.k<=0)return;const m=mo(),tx=cx(t)+10,ty=midY(t)-4,dx=tx-m.x,dy=ty-m.y,L=Math.hypot(dx,dy)*T0.k,a=Math.atan2(dy,dx),h=Math.min(hmax,Math.max(7,L*TG.height/TG.width));
    ctx.save();ctx.translate(m.x,m.y);ctx.rotate(a+Math.PI);ctx.drawImage(TG,-L,-h/2,L,h);ctx.restore();}});
  sfx('squish');u.sq=1.08;await wait(100);u.sq=1;sfx('slash');await tween(180,k=>{T0.k=easeIO(k);});
  t.hurt=.35;shake(7);sparks(cx(t)+10,midY(t),['255,140,180','255,255,255'],12,280);hit(u,t,sk);
  await wait(150);sfx('gulp');await tween(240,k=>{T0.k=1-easeIO(k);});T0.on=false;await wait(100);};

// ---- 2) Lili Égi áldás plakátja („a szárnyai/csápjai között fehér”): a régi háttér-eltávolítás kilyuggatta az áttetsző
//    szárnyakat (fehér-zöld foltok). A szárny világos, fakó képpontjaiból elmosott réteg kerül a kép alá, ami betömi a lyukakat,
//    így a szárny egybefüggő, áttetsző hártya lesz
(function(){let n=0;const K=['fairyG-cast','fairy-cast','fairyG','fairy','fairyG-attack','fairy-attack','fairyG-hurt','fairy-hurt'],done=new Set();
  const iv=setInterval(()=>{n++;try{for(const k of K){if(done.has(k))continue;const c=ENEMY_SPR[k];if(!c||!c.width||!c.getContext)continue;const W2=c.width,H2=c.height;
      const m=document.createElement('canvas');m.width=W2;m.height=H2;const mg=m.getContext('2d');mg.drawImage(c,0,0);const d=mg.getImageData(0,0,W2,H2),px=d.data;
      for(let i=0;i<px.length;i+=4){const r=px[i],g=px[i+1],b=px[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(!(px[i+3]>40&&mn>150&&mx-mn<70)||(i/4/W2)<H2*.11)px[i+3]=0;else px[i+3]=110;}
      mg.putImageData(d,0,0);const o=document.createElement('canvas');o.width=W2;o.height=H2;const og=o.getContext('2d');try{og.filter='blur(5px)';}catch(e){}og.drawImage(m,0,0);try{og.filter='blur(2px)';}catch(e){}og.drawImage(m,0,0);try{og.filter='none';}catch(e){}og.globalAlpha=1;og.drawImage(c,0,0);{const od=og.getImageData(0,0,W2,Math.ceil(H2*.11)),q=od.data;for(let i=0;i<q.length;i+=4){const mx=Math.max(q[i],q[i+1],q[i+2]),mn=Math.min(q[i],q[i+1],q[i+2]);if(mn>185&&mx-mn<60)q[i+3]=0;}og.putImageData(od,0,0);}if(/-cast$/.test(k)){const x0=Math.floor(W2*.48),y0=Math.floor(H2*.11),ww=Math.ceil(W2*.18),hh=Math.ceil(H2*.12),od2=og.getImageData(x0,y0,ww,hh),q2=od2.data;for(let i=0;i<q2.length;i+=4){const mx=Math.max(q2[i],q2[i+1],q2[i+2]),mn=Math.min(q2[i],q2[i+1],q2[i+2]);if(mn>175&&mx-mn<60)q2[i+3]=0;}og.putImageData(od2,x0,y0);}
      ENEMY_SPR[k]=o;done.add(k);}}catch(e){}if(done.size>=K.length||n>100)clearInterval(iv);},600);})();

// ---- 3) Kristálygólem – Kristálykitörés („ezek csak képek, csináld újra”; „a földből jöjjenek fel a tüskék”): a gólem a
//    földbe csap; a földön repedés fut minden hős alá, ott egyenként, egymás után törnek fel a kristálytüskék a föld alól
//    (kicsiről nagyra, rázkódva), a hőst megemelik, aztán a tüskék szilánkokra robbannak és porként hullanak le
A.crystalBurst=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const CR=r21Filt(R17I.rockspike,'grayscale(1) sepia(1) hue-rotate(160deg) saturate(2.6) brightness(1.5) contrast(1.1)'),GL=r21Filt(R17I.glacier,'hue-rotate(-12deg) saturate(1.6) brightness(1.15)'),CL=R17I.clods;
  u.pose='attack';await bodyWind(u,320,.18);await tween(260,k=>{u.jump=Math.sin(k*Math.PI*.5)*70;});await tween(120,k=>{u.jump=70*(1-k*k);});u.jump=0;await bodyStrike(u,120,-.26);
  sfx('rock');sfx('glass');shake(20);hitStop(80);rumble&&rumble(1.3,12);
  for(const t of al){const gx=cx(t),gy=t.y+t.oy+6,R=Math.max(70,t.w*t.scale*.75);const S=[];
    for(let i=0;i<9;i++){const a=(i/8)*Math.PI,r=R*(.35+.65*Math.random());S.push({x:gx+Math.cos(a)*r*(i%2?1:-1)*.9,y:gy+Math.sin(a)*r*.22,H:rnd(100,210)*(i===4?1.4:1),rot:rnd(-.35,.35),k:0,d:i*55,a:1});}
    S.sort((a,b)=>a.y-b.y);const st={t:0};
    R18E({update(dt){st.t+=dt*1000;for(const s of S){const tt=st.t-s.d;s.k=tt<0?0:Math.min(1,tt/150);}return S.some(s=>s.a>0);},
      draw(){if(!CR)return;for(const s of S){if(s.k<=0||s.a<=0)continue;const h=s.H*eOutBack(s.k),w=h*CR.width/CR.height;ctx.save();ctx.beginPath();ctx.rect(s.x-w*2,0,w*4,s.y+3);ctx.clip();ctx.globalAlpha=s.a;ctx.translate(s.x+Math.sin(st.t/30)*1.5*(1-s.k),s.y+4+h*(1-s.k)*.2);ctx.rotate(s.rot);ctx.drawImage(CR,-w/2,-h,w,h);ctx.restore();
        ctx.save();ctx.globalCompositeOperation='lighter';glow(s.x,s.y-h*.45,w*.9,'150,220,255',.25*s.a*s.k);ctx.restore();}}});
    (async()=>{for(let i=0;i<9;i++){await wait(55);sfx(i%2?'glass':'rock');shake(5);if(CL)r21PD(CL,S[i].x,S[i].y,{vx:rnd(-200,200),vy:-rnd(150,380),g:1000,size:rnd(14,26),life:.7});}
      t.hurt=.6;toss(t,140,600);hit(u,t,sk);await wait(700);sfx('glass');shake(8);
      for(const s of S){if(GL)for(let n=0;n<4;n++)r21PD(GL,s.x+rnd(-14,14),s.y-rnd(20,s.H*.8),{vx:rnd(-300,300),vy:-rnd(80,360),g:1000,size:rnd(18,34),life:rnd(.6,1)});s.a=0;}})();
    await wait(140);}
  await wait(1500);await bodySettle(u);u.pose='idle';};

// ---- 4) Kőbőr – kőbörtön („gagyi, látványosabb, élethűbb”): a kő a talajból kúszik fel – a földből kődarabok szakadnak ki,
//    nagy darabokban, koppanva rakódnak a támadóra alulról felfelé, a test kőszürkévé dermed és megrepedezik; minden darabnál
//    por és szilánk, a végén a burok egyben megremeg és kőpor száll
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21stone)return de.apply(this,arguments);if(!e.alive||!e.st||!e.st.stun){e._r21stone=false;e._r21shell=null;return de.apply(this,arguments);}
  if(!e._r21shell||!e._r21shell.v2){const PB=R17I.pebble,CL=R17I.clods,S3=[];for(let row=0;row<8;row++){const v=row/7,n=6+Math.round(Math.sin(.3+v*2.4)*5);for(let i=0;i<n;i++)S3.push({v,u:(i/(n-1)-.5)*Math.sin(.35+v*2.4),s:rnd(.3,.44),r:rnd(0,6),I:(i+row)%3===0&&CL?CL:PB,d:row*.12+rnd(0,.08),hit:false});}e._r21shell={p:S3,t0:performance.now(),v2:true};}
  const Sh=e._r21shell,t=(performance.now()-Sh.t0)/1000,H2=e.h*e.scale*1.05,W2=e.w*e.scale*1.2,base=e.y+e.oy+4,stoned=Math.min(1,t/1.1);
  const f0=ctx.filter;try{ctx.filter=`grayscale(${stoned}) brightness(${1-.3*stoned}) contrast(1.1)`;}catch(x){}e._r21stone=false;let r;try{r=de.apply(this,arguments);}finally{e._r21stone=true;try{ctx.filter=f0||'none';}catch(x){}}
  try{for(const q of Sh.p){const k=Math.max(0,Math.min(1,(t-q.d)/.22));if(k<=0||!q.I)continue;if(k>=1&&!q.hit){q.hit=true;if(Math.random()<.5)sfx('rock');for(let i=0;i<3;i++)part({x:cx(e)+q.u*W2,y:base-q.v*H2,vx:rnd(-90,90),vy:-rnd(20,110),g:600,life:.5,size:rnd(3,6),rgb:'150,140,125',add:false,shape:'rock'});}
      const x=cx(e)+q.u*W2,y0=base+20,y1=base-q.v*H2,y=y0+(y1-y0)*eOutBack(k),s=Math.max(W2,H2)*q.s*.5,sh=t>1.2&&t<1.45?Math.sin(t*90)*2:0;
      ctx.save();ctx.translate(x+sh,y);ctx.rotate(q.r);ctx.drawImage(q.I,-s/2,-s/2,s,s*q.I.height/q.I.width);ctx.restore();}
    if(t>1.2&&t<1.3&&!Sh.done){Sh.done=true;shake(10);sfx('quake');for(let i=0;i<14;i++)part({x:cx(e)+rnd(-W2*.5,W2*.5),y:base-rnd(0,H2),vx:rnd(-60,60),vy:-rnd(30,90),life:1,size:rnd(14,24),grow:30,rgb:'170,160,145',add:false,shape:'smoke'});}}catch(err){}return r;};}

// ---- 5) Árnyékszegező nyíl (csatolt kép): a célpont köré lila rúnás láncok tekerednek (festett lánc), a lába alatt
//    lila rúnakör izzik, lila füstnyelvek csapnak fel – amíg a bénítás tart
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21pin)return de.apply(this,arguments);const P=e._r21pin;if(!e.alive||!e.st||!e.st.stun){e._r21pin=null;return de.apply(this,arguments);}
  const t=(performance.now()-P.t0)/1000,k=Math.min(1,t/.7),HC=R17I.hexchain,RU=r21Filt(R17I.inkglyph,'invert(1) sepia(1) hue-rotate(225deg) saturate(5) brightness(1.1)'),feet=e.y+e.oy+4,H2=e.h*e.scale,W2=e.w*e.scale,x=cx(e);
  // rúnakör a földön (a figura mögött)
  try{const R=Math.max(90,W2*.85)*k;ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,feet);ctx.scale(1,.3);glow(0,0,R*1.1,'150,70,255',.35);if(RU){for(let i=0;i<12;i++){const a=i/12*6.283+t*.6;ctx.save();ctx.translate(Math.cos(a)*R,Math.sin(a)*R);ctx.rotate(a+Math.PI/2);ctx.scale(1,3.3);ctx.drawImage(RU,-11,-11,22,22);ctx.restore();}}
    ctx.lineWidth=5;ctx.strokeStyle='rgba(190,110,255,.8)';ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.stroke();ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,R*.78,0,6.283);ctx.stroke();ctx.restore();}catch(err){}
  e._r21pin=null;let r;try{r=de.apply(this,arguments);}finally{e._r21pin=P;}
  // láncok a testen
  try{if(HC)for(let i=0;i<3;i++){const y=feet-H2*(.25+i*.25),w=W2*(1.25-i*.12)*k;ctx.save();ctx.globalAlpha=.95;ctx.translate(x,y);ctx.rotate((i%2?-1:1)*.18+Math.sin(t*1.5+i)*.04);ctx.scale(1,.32);ctx.drawImage(HC,-w/2,-w/2,w,w);ctx.restore();}
    if(Math.random()<.5)part({x:x+rnd(-W2*.6,W2*.6),y:feet-rnd(0,20),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.5,.9),size:rnd(10,18),grow:20,rgb:pick(['90,30,160','150,70,255']),shape:'dsmoke'});}catch(err){}return r;};}

// ---- 6) Zen-Kavics Sárkány – Kavicseső ellenfélként („ezt másold az ellenségként is a kavicsesőhöz”): ugyanaz, mint az
//    idézésnél – festett kőfelhő, és sok száz apró, forgó festett kavics zúdul a hősökre
A.stoneCloudRain=async(u,ts,sk)=>{const fs=(ts||[]).filter(t=>t&&t.alive);if(!fs.length)return;u.pose='cast';sfx('roar');shake(8);rumble&&rumble(1,6);
  const xs=fs.map(cx),xa=Math.min(...xs)-150,xb=Math.max(...xs)+150,pb=()=>R17I.pebble,P0=[];
  for(let i=0;i<420;i++){const t=pick(fs);P0.push({x:rnd(xa,xb),y:70+rnd(-25,25),vy:rnd(620,900),d:250+i*5,r:rnd(0,6),s:rnd(9,17),land:t.y+t.oy+rnd(-120,10)});}
  const E={t:0,a:1,cl:0};R18E({update(dt){E.t+=dt*1000;for(const p of P0)if(E.t>p.d&&!p.done){p.y+=p.vy*dt;p.r+=dt*8;if(p.y>=p.land){p.done=true;if(Math.random()<.3)part({x:p.x,y:p.land,vx:rnd(-120,120),vy:rnd(-160,-50),g:700,life:.45,size:rnd(2,5),rgb:'150,140,120',add:false,shape:'rock'});}}return E.a>0;},
    draw(){ctx.save();ctx.globalAlpha=E.a;const cl=R17I.rockcloud;if(cl)r17Draw(cl,(xa+xb)/2,60,(xb-xa)+160,{a:E.cl});for(const p of P0){if(E.t<p.d||p.done)continue;const I=pb();if(I){ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.drawImage(I,-p.s/2,-p.s/2,p.s,p.s*I.height/I.width);ctx.restore();}}ctx.restore();}});
  await tween(350,k=>E.cl=k);sfx('quake');const iv=setInterval(()=>{sfx('rock');shake(3);for(const t of fs)if(t.alive)t.hurt=.2;},160);
  await wait(2300);clearInterval(iv);for(const t of fs){if(!t.alive)continue;shake(8);hit(u,t,sk);await wait(70);}await tween(500,k=>E.a=1-k);u.pose='idle';};

// ---- 7) Jégelementál – Jégcsapok („essen hó, és tegyen jégkockába egy hőst”): a jégcsapok mellett hóvihar kavarog, és egy
//    véletlen hős 1 körre festett jégkockába fagy (kimarad egy körből), amíg tart, jégkocka veszi körül
STATUS.icecube=['Jégkocka','#9fe0ff'];if(typeof ONE_ROUND!=='undefined')ONE_ROUND.add('icecube');
{const ic=A.icicles;A.icicles=async function(u,ts,sk){const al=(ts||[]).filter(t=>t&&t.alive);const st={on:true};
  const iv=setInterval(()=>{if(!st.on)return;for(let i=0;i<14;i++)part({x:rnd(0,W),y:rnd(-20,40),vx:rnd(-120,-40),vy:rnd(120,260),life:rnd(1.4,2.2),size:rnd(2,5),rgb:pick(['255,255,255','225,240,255']),shape:'star'});},50);
  let r;try{r=await ic.apply(this,arguments);}finally{st.on=false;clearInterval(iv);}
  try{const v=al.filter(h=>h.alive);if(v.length){const h=pick(v);h.st.icecube=2;h.st.stun=Math.max(h.st.stun||0,2);h._r21ice={t0:performance.now()};sfx('ice');sfx('glass');shake(8);popLabel(h,'JÉGKOCKA!','#9fe0ff');updateHUD();await wait(450);}}catch(e){}return r;};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e._r21ice){if(!e.alive||!e.st||!e.st.icecube){e._r21ice=null;return r;}const JC=r21Filt(R17I.jellycube,'grayscale(1) sepia(1) hue-rotate(160deg) saturate(1.8) brightness(1.5)');
    if(JC){const k=Math.min(1,(performance.now()-e._r21ice.t0)/300),hh=e.h*e.scale*1.15*eOutBack(k),w=Math.max(e.w*e.scale*1.45,hh*.8);ctx.save();ctx.globalAlpha=.7;ctx.drawImage(JC,cx(e)-w/2,e.y+e.oy+10-hh,w,hh);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.18;ctx.drawImage(JC,cx(e)-w/2,e.y+e.oy+10-hh,w,hh);ctx.restore();}}}catch(err){}return r;};}

// ---- 8) Harapós rózsa – Rózsaharapás („jó, csak elszakad a rózsa”): a fej és a szár között vastag, összefüggő, zöld
//    tüskés szár köti össze (nem vékony szál), a fej alja a szárhoz kapcsolódik
// (66. kör: kivéve – a betöltéskor rögzített rajzolóval felülírta a 64. körös festett rózsaszárat)

// ---- 9) Bambuszfüggöny („nem áll bele a földbe, amikor belövi, és egyenként jöjjenek ki a bambuszok, és úgy alkossanak egy falat”):
//    a nyíl látványosan beleáll a földbe (ferdén, félig a földben, rezeg), ott marad egy pillanatig, aztán lesüllyed; utána a
//    bambuszok EGYENKÉNT, egymás után törnek elő balról jobbra, és lassan összeálló, sűrű fallá épülnek
A.bambooCurtain=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const BS=R17I.bamboospear,ST=R17I.bamboostake||R17I.bamboopole,CLD=R17I.clods||R17I.pebble,LF=R17I.leaf;
  u.pose='attack';await chargeBow(u,420,'150,230,110');
  const xs=al.map(cx),gy=Math.max(...al.map(t=>t.y+t.oy))+8,mw=Math.max(...al.map(t=>t.w*t.scale)),xa=Math.min(...xs)-mw*.75,xb=Math.max(...xs)+mw*.75,ax=xa+40;
  const A0={k:0,sink:0,a:1,wob:0};R18E({update(){return A0.a>0;},draw(){if(!BS||A0.k<1||A0.a<=0)return;const L=190,h=L*BS.height/BS.width;ctx.save();ctx.beginPath();ctx.rect(ax-300,-500,600,gy+502);ctx.clip();ctx.translate(ax,gy+A0.sink);ctx.rotate(-Math.PI/2+.55+Math.sin(performance.now()/25)*A0.wob);ctx.drawImage(BS,-L*.3,-h/2,L,h);ctx.restore();}});
  if(BS)await bigArrow(bowPos(u),{x:ax,y:gy-8},{arc:80,size:190,trail:['150,230,110','220,255,200']});A0.k=1;A0.wob=.06;sfx('rock');shake(10);hitStop(60);
  for(let i=0;i<14;i++)part({x:ax,y:gy,vx:rnd(-180,180),vy:-rnd(80,260),g:800,life:.6,size:rnd(4,9),rgb:'120,95,65',add:false,shape:'rock'});
  await tween(500,k=>{A0.wob=.06*(1-k);});await wait(250);sfx('earthm');await tween(380,k=>{A0.sink=k*140;});A0.a=0;rumble&&rumble(1.2,10);
  const P=[],m=Math.max(18,Math.round((xb-xa)/20));for(let row=0;row<2;row++)for(let i=0;i<m;i++)P.push({row,i,x:xa+(xb-xa)*(i+.5)/m+rnd(-6,6)+(row?9:0),H:row?rnd(240,330):rnd(320,450),rot:rnd(-.08,.08),k:0});
  P.sort((a,b)=>b.row-a.row);const W={a:1};
  R18E({update(){return W.a>0;},draw(){const I=ST;if(!I)return;const ID=r21Filt(I,'brightness(.72)');ctx.save();ctx.beginPath();ctx.rect(-500,-500,3000,gy+502);ctx.clip();ctx.globalAlpha=W.a;
    for(const p of P){if(p.k<=0)continue;const im=p.row?ID:I,h=p.H*eOutBack(p.k),w=Math.max(20,h*I.width/I.height);ctx.save();ctx.translate(p.x,gy+4-(p.row?14:0));ctx.rotate(p.rot);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}ctx.restore();}});
  const hitSet=new Set();const front=P.filter(p=>p.row===0).sort((a,b)=>a.x-b.x),back=P.filter(p=>p.row===1).sort((a,b)=>a.x-b.x);
  for(let i=0;i<front.length;i++){const p=front[i];sfx('rock');shake(5);tween(170,k=>{p.k=k;});if(back[i])setTimeout(()=>tween(170,k=>{back[i].k=k;}),60);
    if(CLD)for(let n=0;n<3;n++)r21PD(CLD,p.x,gy,{vx:rnd(-160,160),vy:-rnd(180,420),g:1100,size:rnd(16,30),life:.8});
    for(const t of al)if(!hitSet.has(t)&&Math.abs(cx(t)-p.x)<26){hitSet.add(t);t.hurt=.6;toss(t,80,460);hit(u,t,sk);}await wait(65);}
  for(const t of al)if(!hitSet.has(t)&&t.alive)hit(u,t,sk);sfx('boom');shake(16);if(LF)for(let i=0;i<20;i++)r21PD(LF,rnd(xa,xb),gy-rnd(60,300),{vx:rnd(-160,160),vy:-rnd(40,220),g:200,size:rnd(18,30),life:1.3,drag:1});
  await wait(1000);await tween(420,k=>{for(const p of P)p.k=1-k;});W.a=0;u.pose='idle';};

// ---- 10) Fejsze-hajítás (csatolt kép: lángoló, csavart, négykarú tűzcsillag): a kőcsillag a repülés előtt lávás TŰZCSILLAGGÁ
//    alakul – a közepén az izzó kőmag, körülötte négy csavarodó, festett lángkar (meteor-csóva), és így pörög az ellenfélhez
{const at=A.axeThrow;A.axeThrow=async function(u,ts,sk){const MT=R17I.meteor,PB=R17I.pebble;if(!MT)return at.apply(this,arguments);const D=ctx.drawImage;let star=null;
  // a meglévő kőcsillag rajzát figyeljük: ha izzik és repül, a köveket a tűzcsillag váltja fel
  const proto=CanvasRenderingContext2D.prototype,orig=proto.drawImage;let pos=null,spin=0,on=true,cnt=0,last=0;
  proto.drawImage=function(img,...a){if(on&&img&&img!==MT&&a.length===4&&(img===PB||(img.width===(PB&&PB.width)&&img.height===(PB&&PB.height)))){const m=this.getTransform();cnt++;pos=pos||{x:0,y:0,n:0};pos.x+=m.e/(this.canvas.width/W);pos.y+=m.f/(this.canvas.height/H);pos.n++;if(star&&star.on)return;}
    return orig.call(this,img,...a);};
  star={on:false,a:0};R18E({update(dt){spin+=dt*16;if(pos&&pos.n){star.x=pos.x/pos.n;star.y=pos.y/pos.n;}pos=null;return on;},draw(){if(!star.on||star.x==null)return;const R=86;ctx.save();ctx.globalCompositeOperation='lighter';glow(star.x,star.y,R*1.4,'255,120,30',.6);
    for(let i=0;i<4;i++){ctx.save();ctx.translate(star.x,star.y);ctx.rotate(spin+i*Math.PI/2);const w=R*1.6,h=w*MT.height/MT.width*1.6;ctx.drawImage(MT,-w*.05,-h/2,w,h);ctx.restore();}ctx.restore();
    ctx.save();ctx.globalCompositeOperation='lighter';glow(star.x,star.y,R*.45,'255,230,150',.95);ctx.restore();}});
  const t0=performance.now();const tick=setInterval(()=>{if(performance.now()-t0>1300/(S.speed||1))star.on=true;},40);
  try{return await at.apply(this,arguments);}finally{on=false;clearInterval(tick);proto.drawImage=orig;}};}

// ---- 11) Sárkánynyíl („legyen látványosabb, Jázmin tényleg lője ki a nyilat, és a tűz csak egy fotó”): Jázmin íjat feszít
//    (saját testtartás, hátradől, a húr elenged), a lángoló nyíl az égbe száll; a lecsapó sárkány után élő, lobogó lángtenger
//    (sok, egymástól függetlenül lobogó festett láng + parázs + füst) borítja az ellenségeket
{const sn=R16P['Sárkánynyíl'];R16P['Sárkánynyíl']=async function(A1,B1,al,sk,p){const mk=A1.type==='monk'?A1:B1,FW0=R17I.firewall;
  const keep=keepPose(mk,'attack');const bw=bodyWind(mk,380,.16);
  // a lángok: egy statikus kép helyett sok kis, lobogó lángnyelv (festett), parázs és füst
  const fs=(al||[]).filter(t=>t&&t.alive),FL=[];if(FW0)R18E({update(){return FL.some(f=>f.a>0)||!FL.done;},draw(){const tt=performance.now()/1000;for(const f of FL){if(f.a<=0)continue;const I=r21Filt(FW0,'hue-rotate(110deg) saturate(1.5) brightness(1.2)');const s=f.s*(1+.18*Math.sin(tt*9+f.ph)),h=s*.55*(1+.25*Math.sin(tt*13+f.ph*2));ctx.save();ctx.globalAlpha=f.a;ctx.globalCompositeOperation='lighter';ctx.translate(f.x+Math.sin(tt*5+f.ph)*4,f.y);ctx.drawImage(I,-s/2,-h,s,h);ctx.restore();
      if(Math.random()<.25)part({x:f.x+rnd(-s*.3,s*.3),y:f.y-rnd(0,h*.6),vx:rnd(-30,30),vy:-rnd(80,200),life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['255,190,60','255,120,30'])});
      if(Math.random()<.06)part({x:f.x,y:f.y-h,vx:rnd(-20,20),vy:-rnd(30,70),life:1,size:rnd(14,24),grow:30,rgb:'60,50,45',add:false,shape:'smoke'});}}});
  const h0=hit;let lit=false;hit=function(a,t,s){const r=h0.apply(this,arguments);try{if(!lit&&t&&t.kind==='enemy'){lit=true;for(const e of fs)for(let i=0;i<6;i++)FL.push({x:cx(e)+rnd(-e.w*e.scale*.6,e.w*e.scale*.6),y:e.y+e.oy+6+rnd(-6,6),s:rnd(80,150),ph:rnd(0,6),a:1});
      setTimeout(()=>{tween(700,k=>{for(const f of FL)f.a=1-k;}).then(()=>{FL.length=0;FL.done=true;});},1800);}}catch(e){}return r;};
  R17I.firewall=null;try{await bw;await bodyStrike(mk,120,-.2);return await sn.apply(this,arguments);}finally{hit=h0;R17I.firewall=FW0;keep();await bodySettle(mk);}};}

// ---- 12) Ősi Tölgy ökle („így jó, csak lehetne nagyobb”): a festett ököl 1,5× nagyobb
{const of=A.oakFist;A.oakFist=async function(){const im=R17I.oakfist;if(!im)return of.apply(this,arguments);const proto=CanvasRenderingContext2D.prototype,orig=proto.drawImage;let on=true;
  proto.drawImage=function(img,...a){if(on&&img===im&&a.length===4){const [x,y,w,h]=a,nw=w*1.5,nh=h*1.5;return orig.call(this,img,x-(nw-w)/2,y-(nh-h),nw,nh);}if(on&&img===im&&a.length===8){const [sx,sy,sw,sh,x,y,w,h]=a,nw=w*1.5,nh=h*1.5;return orig.call(this,img,sx,sy,sw,sh,x-(nw-w)/2,y-(nh-h),nw,nh);}return orig.call(this,img,...a);};
  try{return await of.apply(this,arguments);}finally{on=false;proto.drawImage=orig;}};}
