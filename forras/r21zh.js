// ===== 51. kör: tesztlap (a teljes végigjáték után) =====

// ---- Habverő-manó – Habverő-pörgés („duplán támad”): a négy külön becsapódás helyett EGY nagy pörgő csapás
{const ws=A.whiskSpin;A.whiskSpin=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const x0=u.ox||0,dx=(cx(t)+t.w*t.scale*.55+u.w*u.scale*.35)-cx(u);
  sfx('whoosh');await tween(460,k=>{u.spin=k*30;u.ox=x0+dx*easeIO(k);u.jump=Math.abs(Math.sin(k*Math.PI*2))*14;});
  sfx('hit');sfx('slash');shake(14);hitStop(90);t.hurt=.5;if(typeof r21FrothBurst==='function'){r21FrothBurst(cx(t),midY(t),26,420);}toss(t,40,320);hit(u,t,sk);
  await tween(420,k=>{u.spin+=.9;u.ox=x0+dx*(1-easeIO(k));u.jump=Math.abs(Math.sin(k*Math.PI))*14;});u.spin=0;u.ox=x0;u.jump=0;}finally{rel();}};}

// ---- Csészeharcos – Teafröccs („a fröccsenés egy kép”): a becsapódáskor nem egyetlen kép, hanem több festett
// tea-csobbanás egymás után, különböző irányba, és festett tea-cseppek repülnek szét
{const tsp=A.teaSplash;A.teaSplash=async function(u,ts,sk){const t=ts&&ts[0];const sp0=R17I.teasplash;let fired=false;
  const boom=()=>{try{const SP=sp0,x=cx(t),gy=t.y+t.oy+6,base=t.w*t.scale*1.6+80;
      for(let i=0;i<4;i++){const st={t:-i*.09},rot=[-.35,.3,-.1,.45][i],dx=[-30,34,0,-50][i],sz=base*[1,.8,1.15,.7][i];
        if(SP)R18E({update(dt){st.t+=dt;return st.t<1;},draw(){if(st.t<0)return;const k=Math.min(1,st.t/.2),a=st.t<.5?1:1-(st.t-.5)/.5;r17Draw(SP,x+dx,gy,sz*(.4+.6*r21ease.back(k)),{anchor:'bottom',a:Math.max(0,a),rot,sy:.75+.35*k});}});}
      if(SP)for(let i=0;i<14;i++)r21PD(SP,x+rnd(-20,20),midY(t)+rnd(-20,20),{vx:rnd(-380,380),vy:-rnd(160,520),g:1000,life:rnd(.55,.9),size:rnd(24,46),vr:rnd(-8,8)});}catch(e){}};
  const W={on:true};if(t)R18E({update(){if(!fired&&t.hurt>=.2){fired=true;boom();}return W.on&&!fired;},draw(){}});
  R17I.teasplash=null;try{return await tsp.apply(this,arguments);}finally{R17I.teasplash=sp0;W.on=false;}};}

// ---- Idézések („túl erősek”): az idézett lény sebzése 40%-kal kisebb
{const ss=summonShow;summonShow=async function(){S._r21sum=true;try{return await ss.apply(this,arguments);}finally{S._r21sum=false;}};}
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{if(S._r21sum&&t&&t.kind==='enemy'&&r&&typeof r.dmg==='number'&&r.dmg>0)r.dmg=Math.max(1,Math.round(r.dmg*.6));}catch(e){}return r;};}

// ---- Mézkirálynő – Zümmögővihar („a palást nyitását fesd újra Canvában, és az idézéshez is másold”): festett póz
// (fx7-queencape: szétnyitott palást, belül lép, méhekkel) – a királynő áttűnik ebbe a pózba, a raj a palást belsejéből
// tör elő, aztán visszaáll. Az idézésnél ugyanez a póz és ugyanez a raj.
function r21QueenPose(getRect,on){const IM=R17I.queencape;const P={a:0,on:true};
  R18E({update(){return P.on;},draw(){if(!IM||P.a<=0)return;const r=getRect();const h=r.h*1.05,w=h*IM.width/IM.height;ctx.save();ctx.globalAlpha=P.a;ctx.drawImage(IM,r.x-w/2,r.y-h,w,h);ctx.restore();}});return P;}
{const bs=A.beeSwarm;A.beeSwarm=async function(e,ts,sk){if(!e||e.type!=='queenbee'||!R17I.queencape)return bs.apply(this,arguments);const al=(ts||[]).filter(h=>h.alive);if(!al.length)return;
  const a0=e.alpha==null?1:e.alpha,rect=()=>({x:cx(e),y:e.y+e.oy-(e.lift?e.lift*e.scale:0)+10,h:e.h*e.scale*1.15}),P=r21QueenPose(rect);
  try{sfx('whoosh');await tween(300,k=>{P.a=k;e.alpha=a0*(1-k);});sfx('buzz');shake(8);
    const r=rect(),src={x:r.x,y:r.y-r.h*.45};const GB=R17I.goldburst;if(GB){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.6;},draw(){const k=st.t/.6;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,src.x,src.y,r.h*(.5+.7*k),{a:1-k});ctx.restore();}});}
    await beeStream(src,al,-1,2.6,h=>hit(e,h,sk));
    await tween(300,k=>{P.a=1-k;e.alpha=a0*k;});}finally{P.on=false;e.alpha=a0;e.pose='idle';}};}
{const qb=SUMMONS.find(x=>x.id==='queenbee');if(qb){const r0=qb.run;qb.run=async(P,S0)=>{if(!R17I.queencape)return r0(P,S0);const fs=foesAlive();if(!fs.length)return;
  const H=()=>(qb.h||280)*(S0.s||1),a0=S0.a,PP=r21QueenPose(()=>({x:S0.x,y:S0.y+6,h:H()*1.05}));
  try{sfx('whoosh');await tween(300,k=>{PP.a=k;S0.a=a0*(1-k);});sfx('buzz');shake(8);const src={x:S0.x,y:S0.y-H()*.45};
    await beeStream(src,fs,1,3,t=>hit(P,t,{name:'Méhraj',kind:'phys',pow:2.2,elem:'nature',tgt:'enemies',status:['poison',.7,3]}));
    await tween(300,k=>{PP.a=1-k;S0.a=a0*k;});}finally{PP.on=false;S0.a=a0;}};}}

// ---- Bambusz-békakirály idézés („másolja az eredeti nyelvnyújtását; a hanghullám legyen élethűbb, és legyen funkciója”):
// a király SAJÁT festett nyelve (ugyanaz a testrész, mint ellenfélként: LIMBS.frogking arm+hand) nyúlik ki egyenként
// az ellenfelekre; a gong hanghulláma festett, aranyló szélhullámokként (fx7-windslash aranyra színezve) söpör végig,
// és FUNKCIÓJA: leveri az ellenfelek pajzsait/erősítéseit (Pajzs, Erő+, Kristálytükör, Kőfal, Fénypajzs), és 50%-kal kábít.
{const fk=SUMMONS.find(s=>s.id==='frogking');if(fk&&typeof LIMBS==='object'&&LIMBS.frogking){
  fk.desc='A saját ragadós nyelvével egyenként elkapja és a földhöz csapja az ellenségeket, aztán megkongatja a gongot: a hanghullám leveri a pajzsaikat és erősítéseiket, és 50% eséllyel elkábítja őket.';
  const LIVE={c:null,pad:0,k:0,tx:0,ty:0,on:false};
  const build=()=>{const im=ENEMY_SPR.frogking;if(!im)return null;const C=limbCanv('frogking');if(!C)return null;const pad=Math.round(im.width*3);if(!LIVE.c){LIVE.c=document.createElement('canvas');LIVE.c.width=im.width+pad*2;LIVE.c.height=im.height;LIVE.pad=pad;}return C;};
  const paint=(C)=>{const g=LIVE.c.getContext('2d'),im=ENEMY_SPR.frogking,W=im.width,H=im.height,pad=LIVE.pad;g.clearRect(0,0,LIVE.c.width,H);g.save();g.translate(pad,0);g.drawImage(C.base,0,0);
    const sh=LIMBS.frogking.parts.arm.pivot,wr=LIMBS.frogking.parts.hand.pivot,P0={x:sh[0]*W,y:sh[1]*H},W0={x:wr[0]*W,y:wr[1]*H};
    const T={x:P0.x+(LIVE.tx-P0.x)*LIVE.k,y:P0.y+(LIVE.ty-P0.y)*LIVE.k},a0=Math.atan2(W0.y-P0.y,W0.x-P0.x),a1=Math.atan2(T.y-P0.y,T.x-P0.x),L0=Math.hypot(W0.x-P0.x,W0.y-P0.y),L1=Math.max(L0,Math.hypot(T.x-P0.x,T.y-P0.y));
    g.save();g.translate(P0.x,P0.y);g.rotate(a1);g.scale(L1/L0,1);g.rotate(-a0);g.translate(-P0.x,-P0.y);g.drawImage(C.parts.arm,0,0);g.restore();
    const E={x:P0.x+Math.cos(a1)*L1,y:P0.y+Math.sin(a1)*L1};g.save();g.translate(E.x-W0.x,E.y-W0.y);g.translate(W0.x,W0.y);g.rotate((a1-a0)*.6);g.translate(-W0.x,-W0.y);g.drawImage(C.parts.hand,0,0);g.restore();g.restore();};
  fk.img=()=>{const C=build();if(!C)return sprOf('frogking')();paint(C);return LIVE.c;};
  fk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const C=build();const im=ENEMY_SPR.frogking;if(!C||!im)return;
    const Hs=()=>(fk.h||300)*(S0.s||1),sc=()=>Hs()/im.height,toImg=(X,Y)=>{const s=sc(),W2=LIVE.c.width*s;return {x:(W2/2-(X-S0.x))/s-LIVE.pad,y:(Y-S0.y+Hs())/s};};
    const anim={on:true};R18E({update(){if(anim.on)paint(C);return anim.on;},draw(){}});
    try{for(const t of fs){if(!t.alive)continue;const p=toImg(cx(t)+10,midY(t));LIVE.tx=p.x;LIVE.ty=p.y;sfx('gulp');await wait(120);sfx('whoosh');
        await tween(240,k=>{LIVE.k=r21ease.out(k);});sfx('squish');shake(14);t.hurt=.6;await tween(200,k=>{t.jump=Math.sin(k*Math.PI)*110;});sfx('rock');burst(cx(t),t.y+t.oy,'190,230,140',20,300);
        hit(P,t,{name:'Nyelvcsapás',kind:'phys',pow:1.2,elem:'phys',tgt:'enemy'});await tween(180,k=>{LIVE.k=1-k;});LIVE.k=0;await wait(60);}
      // a gong: festett aranyló hanghullámok
      await wait(150);sfx('gong');shake(22);flash('255,230,150',.35,.2);const WS=r21Filt(R17I.windslash,'sepia(1) saturate(3) hue-rotate(-8deg) brightness(1.25)'),g0={x:S0.x+40,y:S0.y-Hs()*.45};
      for(let i=0;i<5;i++){const st={t:-i*.12};if(WS)R18E({update(dt){st.t+=dt;return st.t<1.1;},draw(){if(st.t<0)return;const k=st.t/1.1,x=g0.x+(W-g0.x+200)*k,h=180+260*k,w=h*WS.width/WS.height;ctx.save();ctx.globalAlpha=(1-k)*.9;ctx.globalCompositeOperation='lighter';ctx.translate(x,g0.y+40*Math.sin(i));ctx.scale(-1,1);ctx.drawImage(WS,-w/2,-h/2,w,h);ctx.restore();}});}
      await wait(450);
      for(const t of foesAlive()){const had=['defUp','atkUp','barrier','crystal','stonewall','stone','haste'].filter(s=>t.st&&t.st[s]);for(const s of had)delete t.st[s];if(t._r21wall)t._r21wall=null;
        if(had.length)popLabel(t,'PAJZS LETÖRVE!','#ffd36a');shake(8);t.hurt=.4;hit(P,t,{name:'Gongszó',kind:'mag',pow:1.1,elem:'none',tgt:'enemies',status:['stun',.5,1]});await wait(80);}
      updateHUD();await wait(450);}finally{anim.on=false;LIVE.k=0;}};}}

// ---- Árny-csapat („a lecsapásai legyenek olyanok, mint Grog vállcsapása, csak sötét stílusban”): minden árnyharcos
// hátralép, nekifeszül, gyorsulva nekiront a célpontjának sötét szélvágással (fx7-windslash sötétlilára színezve)
// és árnyporral, vállal becsapódik (két keresztbe vágó sötét szélív), hátralöki; utána visszaolvad az árnyékba
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.run=async(P,S0)=>{const hs=S.heroes.filter(h=>h.alive),fs=foesAlive();if(!fs.length)return;await dimTo(.82,'4,0,10',300);sfx('dark');
  const WS=r21Filt(R17I.windslash,'grayscale(1) brightness(.45) sepia(1) hue-rotate(225deg) saturate(3.2)'),DU=r21Filt(R17I.teacloud,'grayscale(1) brightness(.3) sepia(.6) hue-rotate(230deg) saturate(2)');
  const war=hs.map((h,i)=>({h,x:cx(h),y:h.y+h.oy,rise:0,t:fs[i%fs.length],a:1,lean:0,sp:0}));const E={on:true};
  effects.push({update(){return E.on;},draw(){for(const w of war){if(w.rise<=0)continue;const sp=ENEMY_SPR[w.h.type+'-attack']||ENEMY_SPR[w.h.type];if(!sp)continue;const hh=w.h.h*w.h.scale*1.3,ww=hh*sp.width/sp.height,vis=hh*w.rise;
      ctx.save();ctx.beginPath();ctx.rect(w.x-ww*1.5,w.y-hh-60,ww*3,hh+60);ctx.clip();ctx.translate(w.x,w.y);ctx.rotate(w.lean);ctx.globalAlpha=w.a;ctx.drawImage(tintSpr(sp,'rgb(6,0,12)',.98),-ww/2,-vis,ww,hh);
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=w.a*.1;ctx.drawImage(tintSpr(sp,'rgb(170,90,255)',1),-ww/2-2,-vis,ww,hh);
      for(const s of [-1,1]){const ex=s*ww*.07,ey=-vis+hh*.17;glow(ex,ey,13,'255,30,40',.9);}ctx.restore();
      if(WS&&w.sp>.05){const h2=hh*1.1*(.6+.5*w.sp),wd=h2*WS.width/WS.height;ctx.save();ctx.globalAlpha=Math.min(1,w.sp*1.3)*w.a;ctx.translate(w.x+ww*.4,w.y-hh*.5);ctx.scale(-1,1);ctx.drawImage(WS,-wd*.3,-h2*.5,wd,h2);ctx.restore();}}}});
  sfx('wail');await tween(380,k=>{for(const w of war)w.rise=easeIO(k);});
  await Promise.all(war.map((w,wi)=>wait(wi*170).then(async()=>{const t=w.t;if(!t||!t.alive)return;const x0=w.x,tx=cx(t)-t.w*t.scale*.45;
    // hátralép, nekifeszül
    await tween(240,k=>{const e=easeIO(k);w.x=x0-40*e;w.lean=.16*e;});
    // gyorsuló roham
    sfx('whoosh');let lp=0;await tween(380,k=>{const e=k*k*k;w.x=(x0-40)+(tx-(x0-40))*e;w.sp=Math.min(1,k*1.6);w.lean=.16-.45*Math.min(1,k*2);
      if(k-lp>.12&&DU){lp=k;r21PD(DU,w.x-20,w.y-rnd(0,20),{vx:-rnd(120,280),vy:-rnd(10,50),life:.8,size:rnd(80,120),grow:60,a:.8});}});w.sp=0;
    // vállal becsapódik: két keresztbe vágó sötét szélív
    sfx('punch');sfx('crunch');shake(18);hitStop(90);flash('120,40,200',.2,.1);const ix=cx(t)-t.w*t.scale*.25,iy=midY(t);
    if(WS)for(const [r,f] of [[-.5,1],[.55,-1]]){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.5;},draw(){const k=Math.min(1,st.t/.12),a=st.t<.18?1:1-(st.t-.18)/.32;const ww=(t.h*t.scale*1.7+120)*(.55+.45*k),hh=ww*WS.height/WS.width;
        ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(ix,iy);ctx.rotate(r);ctx.scale(-f,1);ctx.drawImage(WS,-ww/2,-hh/2,ww,hh);ctx.restore();}});}
    if(DU)for(let n=0;n<4;n++)r21PD(DU,ix+rnd(-30,30),t.y+t.oy-rnd(0,20),{vx:rnd(-160,240),vy:-rnd(20,80),life:.9,size:rnd(90,130),grow:60,a:.85});
    t.hurt=.6;S._r21noSink=true;try{hit(w.h,t,{...ATTACKS[w.h.type],name:'Árnyroham',kind:'mag',pow:2.2,elem:'dark',anim:'summon'});}finally{S._r21noSink=false;}
    const o0=0;/* (52. kör) több ütés egymásra csúszásakor is a nyugalmi helyére álljon vissza */tween(300,k=>{t.ox=o0+90*Math.sin(Math.min(1,k*1.4)*Math.PI*.5)*(1-k*.6);}).then(()=>tween(300,k=>{t.ox=o0+54*(1-k);})).then(()=>{t.ox=o0;});
    await tween(160,k=>{w.lean=-.29+.29*k;});
    // visszaolvad az árnyékba
    await tween(300,k=>{w.a=1-k;});})));
  E.on=false;await dimTo(0,null,300);};}}

// ---- Lili (megbékítve) („rossz felé néz, és alig támad”): a hősképe tükrözve – a hősök felé néz; és támad is:
// Tündérfény (szent sebzés egy hősre) gyakrabban, mint gyógyít vagy altat
(function(){let n=0;const iv=setInterval(()=>{n++;try{if(typeof ENEMY_SPR==='object'&&ENEMY_SPR.fairy&&ENEMY_SPR.fairy.width){const fl=im=>{if(!im||!im.width)return null;const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(im,0,0);return c;};
  ENEMY_SPR.lilicalmF=fl(ENEMY_SPR.fairy);if(ENEMY_SPR['fairy-attack'])ENEMY_SPR['lilicalmF-attack']=fl(ENEMY_SPR['fairy-attack']);if(ENEMY_SPR['fairy-cast'])ENEMY_SPR['lilicalmF-cast']=fl(ENEMY_SPR['fairy-cast']);
  SPR_ALIAS.lilicalm='lilicalmF';DRAW.lilicalm=e=>enemySpriteDraw(blobDraw('150,210,110'),'lilicalmF')(e);clearInterval(iv);}}catch(e){}if(n>200)clearInterval(iv);},200);})();
ESK.lilistar={name:'Tündérfény',tgt:'enemy',kind:'mag',pow:1.2,elem:'holy',anim:'light'};
if(EN_DEF.lilicalm)EN_DEF.lilicalm.skills=[['lilistar',3],['calmword',2],['lilimend',1]];
