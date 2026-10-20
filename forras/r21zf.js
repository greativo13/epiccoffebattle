// ===== 49. kör: tesztlap-csomag (végigjátszás Cukorsivatagig, normál szint) =====

// ---- Időjárás- és kihívás-jelvény (1. kép: „homályos a teteje, tedd alulra és egymás mellé”): a csatatér alján, középen,
// egymás mellett, átlátszatlan háttérrel, minden réteg fölött (nem takarja félig átlátszó réteg)
(function(){if(typeof document==='undefined')return;const st=document.createElement('style');
  st.textContent='.stage>.r21hud{top:auto!important;bottom:6px!important;left:50%!important;transform:translateX(-50%);flex-direction:row!important;flex-wrap:nowrap!important;justify-content:center;gap:4px!important;white-space:nowrap;max-width:96%!important;z-index:40!important;opacity:1!important;filter:none!important}'+
    '.stage>.r21hud>div{background:#160b26!important;opacity:1!important;filter:none!important;text-shadow:none!important;-webkit-font-smoothing:antialiased;max-width:none!important;flex:0 0 auto}'+
    '@media (max-width:600px){.stage>.r21hud>div{font-size:9.5px!important;padding:2px 6px!important}}';
  document.head.appendChild(st);})();

// ---- Barlangi béka – Nyelvcsapás („nem a szájából jön”): a nyelv a rácson mért szájzugból (.12, .33) indul, és
// minden képkockában onnan számolódik (ha a béka mozdul, a nyelv vele megy)
{const f0=A.frogTongue;A.frogTongue=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='idle';const mo=()=>KP(u,.12,.33),tx=cx(t)+12,ty=midY(t),T0={k:0,on:true};
  effects.push({update(){return T0.on;},draw(){const k=T0.k;if(k<=0)return;const m=mo(),ex=m.x+(tx-m.x)*k,ey=m.y+(ty-m.y)*k,qx=(m.x+ex)/2,qy=Math.min(m.y,ey)-50*k;ctx.save();ctx.lineCap='round';
    ctx.strokeStyle='#6a1530';ctx.lineWidth=18;ctx.beginPath();ctx.moveTo(m.x,m.y);ctx.quadraticCurveTo(qx,qy,ex,ey);ctx.stroke();ctx.strokeStyle='#f06b95';ctx.lineWidth=13;ctx.stroke();ctx.strokeStyle='rgba(255,190,210,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(m.x,m.y-3);ctx.quadraticCurveTo(qx,qy-4,ex,ey-4);ctx.stroke();
    ctx.fillStyle='#ff6f9c';ctx.strokeStyle='#6a1530';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(ex,ey,16,12,0,0,6.29);ctx.fill();ctx.stroke();ctx.fillStyle='rgba(255,220,230,.8)';ctx.beginPath();ctx.ellipse(ex-4,ey-4,5,3,0,0,6.29);ctx.fill();ctx.restore();}});
  sfx('squish');u.jump=8;sfx('slash');await tween(190,k=>{T0.k=easeIO(k);});u.jump=0;
  t.hurt=.3;shake(8);sparks(tx,ty,['255,120,170','255,255,255'],14,300);hit(u,t,sk);
  await wait(180);await tween(220,k=>{T0.k=1-easeIO(k);});T0.on=false;await wait(150);};}

// ---- Morgána – Átok („mindenkire hasson, de ne láncoljon külön-külön, egy nagy elég”): minden ellenségre hat;
// egyetlen nagy jelenet a csoport közepén: Hádész egyszer emelkedik ki, EGY nagy lánc-kör zárul az egész csoportra,
// EGY óriás kísértetkoponya ereszkedik rájuk és ráharap – mindenki egyszerre kapja. (A vékony gyűrű kimarad – A5.)
Object.assign(SK.hex,{tgt:'enemies',mp:12,desc:'Hádész átka minden ellenségre: gyenge sötét sebzés, és 1 körre csökkenti a támadásukat.'});
A.hex=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;spellsReady();await dimTo(.65,'20,0,30',250);u.pose='cast';await bodyWind(u,220,.08);sfx('dark');
  const minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5)),maxX=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5)),gx=(minX+maxX)/2,gy=Math.max(...al.map(t=>t.y+t.oy))+10,maxH=Math.max(...al.map(t=>t.h*t.scale));
  const spread=Math.max(1,(maxX-minX)/260),P={a:0,t:0};
  effects.unshift({update(dt){P.t+=dt;return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.translate(gx,gy);ctx.scale(spread,.3);ctx.globalCompositeOperation='lighter';glow(0,0,190*P.a,'150,60,240',.55*P.a);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<3;i++){ctx.rotate(P.t*(1.5+i));ctx.fillStyle=`rgba(${20+i*20},0,${40+i*30},${.6*P.a})`;ctx.beginPath();ctx.ellipse(0,0,(140-i*35)*P.a,(120-i*30)*P.a,0,0,6.29);ctx.fill();}
    ctx.fillStyle=`rgba(5,0,10,${.95*P.a})`;ctx.beginPath();ctx.arc(0,0,70*P.a,0,6.29);ctx.fill();ctx.restore();}});
  await tween(300,k=>{P.a=k;});rumble(.8,4);
  const h=handPos(u);u.pose='attack';bodyStrike(u,160,.14);await Promise.all([0,1,2,3,4,5].map(i=>wait(i*80).then(()=>flyObj({x:h.x,y:h.y},{x:gx+rnd(-40,40),y:gy-6},380,(x,y,r,k)=>qBone(x,y,r,1.3*(1-k*.4)),{spin:rnd(8,14),arc:rnd(90,150)})).then(()=>{sfx('click');})));
  sfx('dark');flash('120,40,200',.3,.15);rumble(1.2,7);
  const Hd=Math.max(320,maxH*1.9),g=godShow('hades',gx,gy,Hd,99,'170,90,255'),yEnd=Math.min(...al.map(midY))-50;g.y=gy+Hd*.2;
  await tween(1050,k=>{g.y=gy+Hd*.2-(gy+Hd*.2-yEnd)*easeIO(k);});await wait(250);
  // EGY nagy lánc-kör az egész csoport köré
  const y=Math.min(...al.map(midY))+maxH*.15,big=Math.max(260,(maxX-minX)*1.1,maxH*1.7);
  if(!fxHold('chains',gx,y+10,{h:big*1.1,life:1.6,pop:true,pulse:.03}))rune(al[0],'190,90,255');sfx('click');
  await wait(380);
  // EGY óriási kísértetkoponya ereszkedik rájuk
  if(FX_IMG.curse){R17E({t:0,update(dt){this.t+=dt;return this.t<1.05;},draw(){const tt=this.t,r=Math.min(1,tt/.3),e=r*r,a=Math.min(1,tt/.1)*Math.min(1,(1.05-tt)/.3),im=FX_IMG.curse,s=(1.5-.5*e)*(1+.04*Math.sin(tt*20));
    ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(gx,y-150*(1-e)-10);ctx.scale(s,s);ctx.drawImage(im,-big/2,-big/2,big,big);ctx.restore();}});}
  else fxImage('dark',gx,y,{size:big*1.3,life:.8,grow:.4});
  await wait(300);sfx('bite');flash('200,120,255',.35,.2);hitStop(80);shake(14);
  for(const t of al){if(t.alive)hit(u,t,sk);}
  await wait(500);await tween(700,k=>{g.y=yEnd+(gy+Hd*.3-yEnd)*easeIO(k);});g.dead=true;P.done=true;await tween(300,k=>{P.a=1-k;});P.a=0;await bodySettle(u);u.pose='idle';await dimTo(0,null,300);};

// ---- Normál szint („túl könnyen meghalnak a hősök”): az ellenfelek gyengébbek
DIFF_ATK[1]=1.0;DIFF_HP[1]=1.1;

// ---- Kóbor szellem – Hideg érintés („a stílusa eltér minden más támadásétól”): festett képekkel, mint a többi
// a szellem szájából (fp .08/.53) festett jeges pára (fx7-teacloud jégkékre festve) árad a hősre, köré festett
// jégtüske-csoport (fx7-glacier) nő jégbörtönként, a végén festett jégszilánkokra törik. Kék, 1 körre lefagyaszt.
A.ghostChill=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';sfx('chill');
  const ICE=r21Filt(R17I.teacloud,'grayscale(1) brightness(1.5) sepia(.3) hue-rotate(170deg) saturate(2.2)'),GL=R17I.glacier,SH=GL?r21Filt(GL,'brightness(1.1)'):null;
  const H0=()=>fp(u,.08,.53),x=cx(t),gy=t.y+t.oy,hh=t.h*t.scale,tw=t.w*t.scale;
  await bodyWind(u,260,.1);
  // 1) jeges pára gyűlik a szájánál
  {const h=H0();for(let i=0;i<3;i++)r21PD(ICE,h.x+rnd(-14,14),h.y+rnd(-10,10),{vx:rnd(-20,20),vy:rnd(-20,20),life:.6,size:rnd(50,70),grow:30,vr:rnd(-.5,.5),a:.8});}
  await wait(260);
  // 2) ráfújja: festett jeges pára-sugár a hősre
  sfx('wind');bodyStrike(u,200,-.18);let lp=0;
  await tween(520,k=>{if(k-lp>.06){lp=k;const h=H0(),life=rnd(.45,.6);r21PD(ICE,h.x,h.y,{vx:(x-h.x)/life+rnd(-40,40),vy:(midY(t)-h.y)/life+rnd(-40,40),life,size:rnd(70,110),grow:90,vr:rnd(-.6,.6),a:.85,drag:.3});}});
  // 3) jégbörtön: festett jégtüskék nőnek ki a hős körül
  sfx('ice');sfx('glass');shake(10);t.hurt=.5;
  const P={k:0,a:1,on:true};
  R18E({update(){return P.on;},draw(){if(!GL||P.k<=0)return;const w=Math.max(tw*1.9,hh*1.2),h=w*GL.height/GL.width*P.k;ctx.save();ctx.globalAlpha=P.a;ctx.beginPath();ctx.rect(x-w,gy-h*1.2-40,w*2,h*1.2+44);ctx.clip();
    ctx.drawImage(GL,x-w/2,gy-h+6,w,h);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=P.a*.25;ctx.drawImage(GL,x-w/2,gy-h+6,w,h);ctx.restore();}});
  await tween(220,k=>{P.k=eOutBack(k);});
  for(let i=0;i<3;i++)r21PD(ICE,x+rnd(-tw*.5,tw*.5),gy-rnd(0,hh*.6),{vx:rnd(-40,40),vy:-rnd(10,40),life:1,size:rnd(90,130),grow:40,a:.6});
  hit(u,t,sk);u.pose='idle';
  await wait(900);
  // 4) szétreped: festett jégszilánkok
  sfx('glass');shake(8);
  if(SH)for(let i=0;i<10;i++)r21PD(SH,x+rnd(-tw*.4,tw*.4),gy-rnd(10,hh*.7),{vx:rnd(-320,320),vy:-rnd(150,420),g:950,life:rnd(.5,.8),size:rnd(26,46),vr:rnd(-8,8)});
  await tween(220,k=>{P.a=1-k;});P.on=false;await wait(150);};
NOFX.add('ghostChill');

// ---- Égi áldás: MP-t is ad és leveszi a negatív állapotokat
LIMITS.fairy.desc='Mindenkit feléleszt, teljesen meggyógyít, visszatölti a varázserejét, leveszi a negatív állapotokat, és erősebb lesz a védelmük.';

// ---- Bolt-gazdaság („túl drága a fejlesztés, az elején túl hamar megvehetők a támadások, utána sokáig semmi – oszd el
// egységesen a 3 térképen és a pályákon”): minden hős boltlistája a csatlakozásától a játék végéig egyenletesen oszlik
// el a pályák között; az ár annak a pályának a bevételéhez igazodik, ahol megnyílik. A később csatlakozó hős
// (Lili, Grog, Jázmin, Kaelen) annyi támadást kap alapból, amennyi a többieknek addigra nyitva van
// („Jázminnak kevés a képessége, amikor csatlakozik”).
(function(){try{
  const LV=[];for(const z of ZONES)for(const L of z.levels)if(L.id!=='12-3')LV.push(L);const ix=id=>LV.findIndex(L=>L.id===id),N=LV.length;
  // egy pálya átlagos bevétele (normál szinten), a főellenség-pályák kiugrása nélkül simítva
  const gl=LV.map(L=>{let g=0;try{for(const bt of L.battles)for(const t of bt){const d=EN_DEF[t];if(!d)continue;const m=1+.135*(Math.min(L.elvl,30)-1);g+=d.gold!=null?d.gold:Math.round(d.xp*(1+.08*(L.elvl-1)));}}catch(e){}return g;});
  const sm=gl.map((g,i)=>{const a=gl.slice(Math.max(0,i-2),i+3).filter(x=>x>0).sort((p,q)=>p-q);return a.length?a[Math.floor(a.length/2)]:g;});
  const price=i=>Math.max(100,Math.round(sm[Math.max(0,Math.min(N-1,i))]*.42/10)*10);
  const OLDP={};for(const t in SHOP_SKILLS)for(const x of SHOP_SKILLS[t])OLDP[x[0]]=x[2];window.R21_OLDP=OLDP;
  const FREE={},joinIx=t=>{const j=JOIN[t];return j?ix(j)+1:0;};
  for(const t in SHOP_SKILLS){const list=SHOP_SKILLS[t].slice().sort((a,b)=>(ix(a[1])-ix(b[1]))||(a[2]-b[2])),s=Math.max(0,joinIx(t)),n=list.length;
    // csatlakozáskor alapból kapott támadások: amennyi a teljes lista arányában addigra járna
    const free=s>0?Math.round(n*s/(N-1)):0;FREE[t]=list.slice(0,free).map(x=>x[0]);
    const rest=list.slice(free),a=Math.max(0,s-1),b=N-3,m=rest.length;
    SHOP_SKILLS[t]=rest.map((x,i)=>{const k=m>1?Math.round(a+i*(b-a)/(m-1)):a;return [x[0],LV[k].id,price(k)];});
    const D=HERO_DEF[t];if(D&&D.skills)for(const id of FREE[t])if(!D.skills.includes(id))D.skills.push(id);}
  window.R21_FREE=FREE;
}catch(e){console.error('bolt-elosztás',e);}})();
// ha valaki már megvette azt, ami most alapból jár: kikerül a vásárlások közül, és visszakapja az árát
function r21FreeFix(){try{if(!window.R21_FREE)return;const pool=(S.roster||S.heroes||[]);let back=0;
  for(const h of pool){const fr=R21_FREE[h.type]||[];if(!h.bought)continue;const keep=h.bought.filter(id=>!fr.includes(id));if(keep.length!==h.bought.length){for(const id of h.bought)if(!keep.includes(id))back+=(window.R21_OLDP&&R21_OLDP[id])||300;h.bought=keep;}
    // ugyanaz a támadás kétszer ne szerepeljen
    h.bought=[...new Set(h.bought)];}
  if(back){S.gold=(S.gold||0)+back;saveGame();}}catch(e){}}
{const ms=mapScreen;mapScreen=function(){r21FreeFix();return ms.apply(this,arguments);};}

// ---- Bolt: a megvett közös/páros támadás ne vesszen el mentéskor (eddig minden mentés felülírta, ezért újra megvehető volt)
{const sg=saveGame;saveGame=function(){let old=null;try{const raw=localStorage.getItem(SAVE_KEY);if(raw){const d=JSON.parse(raw);if(Array.isArray(d.owned))old=d.owned;}}catch(e){}
  const r=sg.apply(this,arguments);
  try{if(!S.test){const raw=localStorage.getItem(SAVE_KEY);if(raw){const d=JSON.parse(raw);const own=[...new Set([...(old||[]),...(typeof R21_OWN!=='undefined'&&Array.isArray(R21_OWN)?R21_OWN:[]),...(Array.isArray(d.owned)?d.owned:[])])];d.owned=own;if(typeof R21_OWN!=='undefined')R21_OWN=own;localStorage.setItem(SAVE_KEY,JSON.stringify(d));}}}catch(e){}return r;};}
// ---- Bolt: egy támadás csak egyszer vehető meg (dupla koppintás ellen is)
{const sh=shopScreen;shopScreen=function(){const r=sh.apply(this,arguments);try{for(const b of document.querySelectorAll('.ov-box.shop .shop-buy')){if(b._r21once)continue;b._r21once=true;b.addEventListener('click',ev=>{if(b._r21done){ev.stopImmediatePropagation();ev.preventDefault();return;}b._r21done=true;},true);}}catch(e){}return r;};}

// ---- II. Csavar („irreálisan nehéz”): kevesebb életerő és gyengébb ütések
if(EN_DEF.rustking){EN_DEF.rustking.hp=Math.round(EN_DEF.rustking.hp*.75);EN_DEF.rustking.atk*=.85;EN_DEF.rustking.mag*=.85;}

// ---- Kristálygólem – Tükörpajzs („nem pattan vissza a támadás; legyen olyan, mint az idézésnél”): ugyanaz a kék
// kristálytükör (fx-crystalmirror) és ugyanaz a hatás (crystal: kivédi a következő találatot és visszaveri a támadóra).
// Az ellenfél pajzsa kitart a hősök következő köréig (eddig a kör végén lejárt, mielőtt bárki megüthette volna).
{const as=addStatus;addStatus=function(t,type,n){const r=as.apply(this,arguments);try{if(type==='crystal'&&t&&t.kind==='enemy'&&t.alive&&t.st&&t.st.crystal)t.st.crystal=2;}catch(e){}return r;};}
A.mirrorGuard=async(u,ts,sk)=>{u.pose='cast';sfx('ice');flash('170,230,255',.3,.22);rumble&&rumble(.6,5);const al=S.enemies.filter(e=>e.alive);const GL=r21Filt(R17I.glacier,'brightness(1.25) saturate(1.3) hue-rotate(-8deg)');
  for(const e of al){const x=cx(e)-e.w*e.scale*.4,gy=e.y+e.oy;
    if(GL)for(let i=0;i<5;i++)r21PD(GL,cx(e)+rnd(-40,40),gy-rnd(0,10),{vx:rnd(-90,90),vy:-rnd(220,420),g:900,life:rnd(.5,.8),size:rnd(30,52),vr:rnd(-6,6)});
    if(FX_IMG.crystalmirror)fxSpin('crystalmirror',x,midY(e),{size:Math.max(170,e.h*e.scale),life:1,s0:.15,s1:1,spin:0,out:.4,add:true});
    addStatus(e,'crystal',2);await wait(120);}
  sfx('shield');updateHUD();await wait(500);u.pose='idle';};
NOFX.add('mirrorGuard');
// a pajzs látszik, amíg tart (ugyanaz a kép, mint a csapat kristálytükre – az ellenfél előtt, a hősök felé)
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e.kind==='enemy'&&e.alive&&e.st&&e.st.crystal&&FX_IMG.crystalmirror){const im=FX_IMG.crystalmirror,sz=Math.max(160,e.h*e.scale*1.05),x=cx(e)-e.w*e.scale*.45,y=midY(e);
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.75+.15*Math.sin(T*4);ctx.translate(x,y);ctx.scale(.72,1);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}}catch(err){}return r;};}

// ---- Kristálygólem – Kristályököl („gagyi, a szabályok szerint”): a gólem SAJÁT ökle (bábu-testrész) kristállyá
// változik: festett kristálytömb (fx7-glacier kristálykékre festve) nő rá, az ököl megnő; hátralendül, nekirohan,
// és hatalmas becsapódás: festett kristályszilánkok, kristálytüskék törnek fel a célpont mögött – repedés nélkül.
A.crystalPunch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='cgolem-attack';u.pose='attack';const T=limbOn(u,K),f=T&&T.fist;
  const GL=r21Filt(R17I.glacier,'brightness(1.25) saturate(1.3) hue-rotate(-8deg)'),GB=r21Filt(R17I.goldburst,'hue-rotate(170deg) saturate(.8) brightness(1.3)');
  const F={k:0,on:true};const fistC=()=>T?limbPt(u,'fist',.15,.52):fp(u,.15,.45);
  R18E({update(){return F.on;},draw(){if(!GL||F.k<=0)return;const c=fistC(),w=Math.max(110,u.h*u.scale*.62)*F.k,h=w*GL.height/GL.width;ctx.save();ctx.globalCompositeOperation='lighter';glow(c.x,c.y,w*.7,'150,230,255',.55*F.k);ctx.restore();
    ctx.save();ctx.translate(c.x,c.y);ctx.rotate(-1.3);ctx.drawImage(GL,-w/2,-h*.55,w,h);ctx.restore();}});
  // 1) az ököl kristállyá válik
  sfx('ice');sfx('glass');await tween(480,k=>{F.k=eOutBack(k);if(f)f.s=1+.45*k;if(Math.random()<.4&&GL){const c=fistC();r21PD(GL,c.x+rnd(-30,30),c.y+rnd(-30,30),{vx:rnd(-60,60),vy:-rnd(40,120),g:300,life:.5,size:rnd(14,24),vr:rnd(-6,6)});}});
  // 2) hátralendül, nekirohan
  await bodyWind(u,240,.14);const d=await dashTo(u,t,200,40);u.pose='attack';
  if(f)await tween(90,k=>{f.dx=-.26*k;});
  // 3) hatalmas becsapódás
  sfx('rock');sfx('glass');sfx('boom');shake(26);hitStop(150);flash('200,240,255',.45,.15);const x=cx(t),y=midY(t),gy=t.y+t.oy;
  if(GB){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.5;},draw(){const k=st.t/.5;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,x,y,(t.h*t.scale*2+160)*(.5+.6*k),{a:1-k});ctx.restore();}});}
  if(GL){for(let i=0;i<16;i++)r21PD(GL,x+rnd(-20,20),y+rnd(-30,30),{vx:rnd(-460,460),vy:-rnd(160,560),g:1000,life:rnd(.6,1),size:rnd(28,56),vr:rnd(-9,9)});
    const C={k:0,a:1};R18E({update(){return C.a>0;},draw(){if(C.k<=0)return;const w=Math.max(t.w*t.scale*2.2,200),h=w*GL.height/GL.width*C.k;ctx.save();ctx.globalAlpha=C.a;ctx.beginPath();ctx.rect(x-w,gy-h*1.3-40,w*2,h*1.3+44);ctx.clip();ctx.drawImage(GL,x-w/2+20,gy-h+6,w,h);ctx.restore();}});
    tween(160,k=>{C.k=eOutBack(k);}).then(()=>wait(380)).then(()=>tween(260,k=>{C.a=1-k;}));}
  t.hurt=.7;toss(t,60,380);hit(u,t,sk);
  await wait(260);if(f)await tween(160,k=>{f.dx=-.26*(1-k);});await tween(220,k=>{F.k=1-k;if(f)f.s=1.45-.45*k;});F.on=false;if(T)limbOff(u);await dashBack(u,d);u.pose='idle';};
NOFX.add('crystalPunch');

// ---- Kristálygólem – Szilánkeső: a gólem testéből festett kristályszilánkok szakadnak ki, fellövődnek, és
// hullámokban zúdulnak a hősökre – minden becsapódás azonnal sebez (folyamatosan, nem csak a végén)
A.shardspray=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;u.pose='cast';const GL=r21Filt(R17I.glacier,'brightness(1.25) saturate(1.3) hue-rotate(-8deg)');
  sfx('ice');sfx('glass');await bodyWind(u,260,.1);const ox=cx(u),oy=midY(u);
  if(GL)for(let i=0;i<14;i++)r21PD(GL,ox+rnd(-30,30),oy+rnd(-40,20),{vx:rnd(-160,160),vy:-rnd(500,800),g:600,life:.7,size:rnd(26,44),vr:rnd(-8,8)});
  shake(8);bodyStrike(u,180,-.12);await wait(380);
  const pow=Object.assign({},sk,{pow:(sk.pow||.6)/3});
  for(let w=0;w<3;w++){await Promise.all(al.filter(t=>t.alive).map((t,i)=>wait(i*70).then(()=>new Promise(res=>{const x=cx(t)+rnd(-20,20),y=midY(t),y0=-60,S2={t:0,ms:300,r:rnd(-.5,.5)};
      R18E({update(dt){S2.t+=dt*1000;if(S2.t>=S2.ms){sfx('glass');shake(6);t.hurt=.35;if(GL)for(let n=0;n<6;n++)r21PD(GL,x,y,{vx:rnd(-280,280),vy:-rnd(120,360),g:1000,life:.5,size:rnd(18,30),vr:rnd(-9,9)});if(t.alive)hit(u,t,pow);res();return false;}return true;},
        draw(){if(!GL)return;const k=S2.t/S2.ms,yy=y0+(y-y0)*k*k,w=70;ctx.save();ctx.translate(x,yy);ctx.rotate(Math.PI+S2.r);const h=w*GL.height/GL.width;ctx.drawImage(GL,-w/2,-h/2,w,h);ctx.restore();}});}))));
    await wait(120);}
  u.pose='idle';};
NOFX.add('shardspray');

// ---- Kőbőr: a kőpáncél képe vízszintesen tükrözve („most a hősök felé néz”)
(function(){let tries=0;const iv=setInterval(()=>{try{tries++;const im=FX_IMG&&FX_IMG.stone;if(im&&im.width&&!im._r21flip){const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(im,0,0);c._r21flip=true;FX_IMG.stone=c;clearInterval(iv);}if(tries>200)clearInterval(iv);}catch(e){clearInterval(iv);}},150);})();
// ---- Kőbőr – kőbörtön: ha Grogot Kőbőrrel megtámadják, a kő átrakódik a támadóra, kőbörtönbe zárja, és az kimarad
// egy körből (Grogról a kő lekerül). Főellenségre nem hat (kábulat-immunis), de a kő akkor is lekerül.
{const h0=hit;hit=function(u,t,sk){const st0=!!(t&&t.type==='orc'&&t.kind==='hero'&&t.alive&&t.st&&t.st.stone),r=h0.apply(this,arguments);
  try{if(st0&&u&&u.kind==='enemy'&&u.alive&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&!u._r21stoneLock){u._r21stoneLock=true;delete t.st.stone;if(t.auraFx)t.auraFx=null;
      sfx('rock');sfx('crunch');shake(14);hitStop(90);flash('200,195,185',.25,.12);
      const PB=R17I.pebble;if(PB)for(let i=0;i<12;i++)r21PD(PB,cx(t)+rnd(-30,30),midY(t)+rnd(-40,40),{vx:(cx(u)-cx(t))*rnd(1.2,1.8)+rnd(-80,80),vy:-rnd(200,420),g:700,life:.6,size:rnd(20,34),vr:rnd(-8,8)});
      setTimeout(()=>{try{u._r21stoneLock=false;if(!u.alive)return;const immune=u.d&&u.d.statusImmune&&u.d.statusImmune.includes('stun');addStatus(u,'stun',2);if(!immune){u._r21stone=true;popLabel(u,'KŐBÖRTÖN!','#c9bfae');sfx('rock');shake(10);
        if(PB)for(let i=0;i<10;i++)r21PD(PB,cx(u)+rnd(-40,40),u.y+u.oy-rnd(0,20),{vx:rnd(-160,160),vy:-rnd(80,240),g:900,life:.5,size:rnd(16,28),vr:rnd(-8,8)});}updateHUD();}catch(e){}},420/(S.speed||1));}}catch(e){}return r;};}
// a kőbörtön látszik, amíg az ellenfél ki van ütve: szürke, kővé dermedt test, rajta a festett kőpáncél
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21stone)return de.apply(this,arguments);if(!e.alive||!e.st||!e.st.stun){e._r21stone=false;return de.apply(this,arguments);}
  const f0=ctx.filter;try{if('filter' in ctx)ctx.filter='grayscale(1) brightness(.75) contrast(1.1)';de.apply(this,arguments);}finally{if('filter' in ctx)ctx.filter=f0||'none';}
  try{const im=FX_IMG.stone;if(im){const s=Math.max(e.w,e.h)*e.scale*1.15;ctx.save();ctx.globalAlpha=.92;ctx.drawImage(im,cx(e)-s/2,midY(e)-s/2,s,s);ctx.restore();}}catch(err){}};}
SK.stoneskin.desc=(SK.stoneskin.desc||'')+' Ha közben megtámadják, a kő a támadóra rakódik: kőbörtönbe zárja, és az kimarad egy körből.';

// ---- Obszidián lovag és Kísértetlovag (lidérclovag): nagyobbak
for(const k of ['oknight','gknight'])if(EN_DEF[k]){EN_DEF[k].h=Math.round(EN_DEF[k].h*1.3);EN_DEF[k].w=Math.round(EN_DEF[k].w*1.3);}

// ---- „A repedések nagyon rosszak, inkább ne repedjenek az ellenségek”: a főellenség dühfázisában nincs izzó repedés
// a testén (a vörös izzás marad), és a nagy ütés utáni kráterben sincs repedésvonal
r21RageDraw=function(){};
r21Crater=function(e,s,a){const x=cx(e),gy=e.y+e.oy+2,W=Math.max(60,e.w*e.scale*.6);ctx.save();ctx.globalAlpha=a;ctx.translate(x,gy);ctx.scale(1,.2);
  const g=ctx.createRadialGradient(0,0,4,0,0,W);g.addColorStop(0,'rgba(25,15,8,.7)');g.addColorStop(.7,'rgba(45,30,15,.35)');g.addColorStop(1,'rgba(45,30,15,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W,0,6.283);ctx.fill();ctx.restore();};

// ---- Sötét alku → Cerberus csak abban a csatában, és csak amíg Morgána él („meghalt, feltámadt, és meg tudta idézni”;
// „előző pályán Sötét alkuval zártam, a következőben Cerberusszal kezdhettem”). Az alkuból kapott teli limit is elvész.
{const d0=die;die=function(t){try{if(t&&t.kind==='hero'&&t._cerb){t._cerb=false;t.limit=0;}}catch(e){}return d0.apply(this,arguments);};}
{const sb=startBattle;startBattle=function(){try{for(const h of (S.roster||S.heroes||[]))if(h&&h._cerb){h._cerb=false;h.limit=0;}}catch(e){}return sb.apply(this,arguments);};}

// ---- Nagy gyógyital („alig gyógyít”): fix 90 helyett mindenkinek az életereje 60%-át adja vissza
Object.assign(ITEMS.megapotion,{pct:.6,desc:'Az egész csapat életerejének 60%-át adja vissza.'});

// ---- Fekete lyuk („kiírta, hogy eltűnt és immunis, de nem tűnt el – logikátlan”): akit nem tud elnyelni
// (főellenség, kábulat-immunis), annál ezt írja ki, és nem „Eltűnt: immunis”-t
{const as=addStatus;addStatus=function(t,type){if(type==='banish'&&t&&t.d&&t.d.statusImmune&&t.d.statusImmune.includes('banish')){if(t.alive)popLabel(t,'TÚL ERŐS – NEM NYELI EL','#b06cff');return;}return as.apply(this,arguments);};}

// ---- Morcus („ha túl hamar legyőzöm, se a Kanna, se az Árny-csapat nem jut idő”): amíg a fázisok le nem zajlottak,
// nem eshet a küszöb alá (1. fázis: 60%, 2. fázis: 30%), és nem halhat meg – a 3. fázisban (Kanna) már igen
const r21MorcusFloor=e=>e&&e.type==='morcus'&&(e.phase||1)<3?Math.max(1,Math.floor(e.maxHp*((e.phase||1)===1?.6:.3))):null;
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{const f=r21MorcusFloor(t);if(f!=null&&r&&typeof r.dmg==='number'&&r.dmg>0)r.dmg=Math.max(0,Math.min(r.dmg,t.hp-f));}catch(e){}return r;};}
{const d0=die;die=function(t){try{const f=r21MorcusFloor(t);if(f!=null){t.hp=Math.max(1,f);t.alive=true;return;}}catch(e){}return d0.apply(this,arguments);};}

// ---- Meteorököl („nem kellenek a tüskék”): a becsapódásnál nincs sziklatüske-kép (groundCrack/fxImage 'rock') és vékony gyűrű sem
{const mf=A.meteorFist;A.meteorFist=async function(){const g0=groundCrack,f0=fxImage,r0=ring,rs0=typeof rockSpikes==='function'?rockSpikes:null;
  groundCrack=function(){};fxImage=function(k){if(k==='rock')return null;return f0.apply(this,arguments);};ring=function(){};if(rs0)rockSpikes=function(){};
  try{return await mf.apply(this,arguments);}finally{groundCrack=g0;fxImage=f0;ring=r0;if(rs0)rockSpikes=rs0;}};}

// ---- Titáncsapás („a kiálló tüskék a végén az ellenfélből állnak ki”): a festett kőtüskék csak az ellenfél ELŐTT, az
// előtérben törnek fel (a hátsó félkör, ami a testén át látszott, kimarad), kicsit távolabb és alacsonyabban
r13Quake=function(u,al,big){const sp=R17I.rockspike;rumble(big?2.6:1.6,big?18:11);
  for(const t of al){const x=cx(t),gy=t.y+t.oy+4,R=Math.max(90,t.w*t.scale*.95),N=big?7:5,S2=[];
    for(let i=0;i<N;i++){const a=.12*Math.PI+i/(N-1)*.76*Math.PI;S2.push({x:x+Math.cos(a)*R,y:gy+Math.sin(a)*R*.35,H:rnd(90,140)*(big?1:.7),rot:Math.cos(a)*.35,fl:Math.random()<.5,k:0,d:i*40});}
    S2.sort((a,b)=>a.y-b.y);const st={t:0};
    if(sp)R18E({update(dt){st.t+=dt*1000;for(const s of S2){const tt=(st.t-s.d)/1000;s.k=tt<0?0:tt<.14?r21ease.back(tt/.14):tt<1.5?1:Math.max(0,1-(tt-1.5)/.4);}return st.t<2200;},
      draw(){for(const s of S2){if(s.k<=0)continue;const w=s.H*sp.width/sp.height;ctx.save();ctx.beginPath();ctx.rect(0,0,W,s.y+4);ctx.clip();ctx.translate(s.x,s.y+4+s.H*(1-s.k)*.9);ctx.rotate(s.rot);if(s.fl)ctx.scale(-1,1);ctx.drawImage(sp,-w/2,-s.H,w,s.H);ctx.restore();}}});
    r21Dust(x,gy,8,240,[30,52]);for(let n=0;n<14;n++)part({x:x+rnd(-R*.6,R*.6),y:gy,vx:rnd(-260,260),vy:-rnd(200,460),g:950,life:rnd(.6,1),size:rnd(6,12),rgb:'120,95,65',add:false,shape:'rock'});}};

// ---- Sok apró elemből álló támadások („folyamatosan sebezzen, ne csak a végén”, pl. Csillaghullás): a sebzés 60%-a
// négy részletben érkezik, miközben a darabok becsapódnak; a maradék és az állapothatás a végén. Az összsebzés ugyanannyi.
(function(){const ANIMS=['starfall','arrowRain','blizzard','petals','thornStorm','zeusStorm','avalanche','thornVolley','leafGale','dice','shadowBlizzard','plateStorm','honeyRain','beeSwarm','featherStorm','sandStorm','chaosStorm','leafRain','stoneCloudRain','whiskStorm'];
  for(const an of ANIMS){const o=A[an];if(typeof o!=='function')continue;
    A[an]=async function(u,ts,sk){if(!sk||!sk.pow||sk.kind==='heal'||sk.kind==='buff'||!Array.isArray(ts))return o.apply(this,arguments);
      const al=ts.filter(t=>t&&t.alive&&t.kind!==u.kind);if(!al.length)return o.apply(this,arguments);
      const n=4,share=.6,chunk=Object.assign({},sk,{pow:sk.pow*share/n,status:null,_r21chunk:true}),fin=Object.assign({},sk,{pow:sk.pow*(1-share)});
      let done=0,stop=false;const step=()=>{for(const t of al)if(t.alive)try{hit(u,t,chunk);}catch(e){}done++;};
      (async()=>{await wait(520);while(!stop&&done<n&&!S.over){step();await wait(300);}})();
      try{return await o.call(this,u,ts,fin);}finally{stop=true;while(done<n&&!S.over)step();}};}})();

// ---- Rozsda-átok („utána legyen rozsdás, halvány aurája annak, akin hat”): amíg a védelemgyengítés tart, halvány
// rozsdabarna izzás és lassan hulló, festett rozsdapelyhek (festett rögök rozsdaszínre festve) látszanak rajta
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{if(sk&&(sk.anim==='rust'||sk.name==='Rozsda-átok')&&t&&t.alive)t._r21rust=true;}catch(e){}return r;};}
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21rust)return de.apply(this,arguments);if(!e.alive||!e.st||!e.st.defDown){e._r21rust=false;return de.apply(this,arguments);}
  try{ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.7,'190,95,35',.32+.08*Math.sin(T*3));ctx.restore();}catch(err){}
  const r=de.apply(this,arguments);
  try{ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.45,'150,70,25',.14);ctx.restore();}catch(err){}
  try{if(Math.random()<.3){const RF=r21Filt(R17I.clods||R17I.pebble,'sepia(1) saturate(3.2) hue-rotate(-18deg) brightness(.75)');r21PD(RF,cx(e)+rnd(-e.w*e.scale*.4,e.w*e.scale*.4),midY(e)+rnd(-e.h*e.scale*.3,e.h*e.scale*.2),{vx:rnd(-12,12),vy:rnd(10,40),g:60,life:rnd(.9,1.4),size:rnd(10,18),vr:rnd(-2,2),a:.85});}}catch(err){}
  return r;};}

// ---- Látványos átöltözés („ha megvan a köpeny és a pálca – a fejlesztés 3/3 –, a következő pályán legyen látványos
// átöltözés az új öltözetbe”): a pálya első csatája előtt a hős aranyfényben felemelkedik, megpördül, festett csillagok
// és aranyszikrák örvénylenek körülötte, villanás – és már az új ruhában áll. Hősönként egyszer.
function r21DressedLoad(){try{return JSON.parse(localStorage.getItem('r21dressed')||'[]');}catch(e){return [];}}
function r21DressedSave(a){try{if(!S.test)localStorage.setItem('r21dressed',JSON.stringify(a));}catch(e){}}
async function r21DressUp(h){const g0={w:h.gear.w,a:h.gear.a};h.gear.w=Math.min(h.gear.w,2);   // amíg tart, a régi ruha látszik
  try{const ST=R17I.star,GB=R17I.goldburst,x=cx(h),y=midY(h);
    showBanner(`${h.name}: új öltözet!`,true);sfx('holy');await dimTo(.55,'20,14,4',260);
    const L={a:0,on:true};R18E({update(){return L.on;},draw(){if(L.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(h),midY(h)-h.jump,h.h*h.scale*.9,'255,215,120',.6*L.a);glow(cx(h),midY(h)-h.jump,h.h*h.scale*.4,'255,255,230',.6*L.a);ctx.restore();}});
    let lp=0;
    await tween(1100,k=>{L.a=Math.min(1,k*2);h.jump=40*Math.sin(Math.min(1,k*1.4)*Math.PI/2);h.spin=k*Math.PI*4;
      if(k-lp>.05){lp=k;const an=k*14;if(ST)r21PD(ST,cx(h)+Math.cos(an)*h.w*h.scale*.8,midY(h)-h.jump+Math.sin(an*1.3)*h.h*h.scale*.4,{vx:-Math.sin(an)*120,vy:-rnd(40,120),life:.7,size:rnd(22,38),add:true,vr:rnd(-4,4)});
        if(GB&&Math.random()<.5)r21PD(GB,cx(h)+rnd(-40,40),midY(h)-h.jump+rnd(-60,60),{vx:rnd(-80,80),vy:-rnd(30,90),life:.5,size:rnd(26,44),add:true});}});
    // villanás – átöltözött
    h.gear.w=g0.w;h.gear.a=g0.a;flash('255,240,190',.75,.3);sfx('boom');shake(10);hitStop(90);
    if(GB){const st={t:0};R18E({update(dt){st.t+=dt;return st.t<.6;},draw(){const k=st.t/.6;ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,cx(h),midY(h)-h.jump,h.h*h.scale*(1.2+1.4*k),{a:1-k});ctx.restore();}});}
    if(ST)for(let i=0;i<18;i++){const an=i/18*6.283;r21PD(ST,cx(h),midY(h)-h.jump,{vx:Math.cos(an)*rnd(220,380),vy:Math.sin(an)*rnd(220,380),drag:2,life:.8,size:rnd(20,34),add:true});}
    popLabel(h,'ÚJ RUHA!','#ffe08a');
    await tween(420,k=>{h.spin=Math.PI*4*(1-k)*0;h.jump=40*(1-easeIO(k));L.a=1-k;});h.spin=0;h.jump=0;L.on=false;
    await wait(300);await dimTo(0,null,250);
  }finally{h.gear.w=g0.w;h.gear.a=g0.a;h.spin=0;h.jump=0;}}
{const sb=startBattle;startBattle=async function(){try{if(!S.arena&&!S.test&&S.battleIdx===0&&typeof gearLook==='function'){const done=r21DressedLoad(),todo=S.heroes.filter(h=>h&&h.alive&&gearLook(h)&&!done.includes(h.type));
    if(todo.length){hideOverlay&&hideOverlay();setButtons&&setButtons([]);await wait(300);for(const h of todo){await r21DressUp(h);done.push(h.type);}r21DressedSave(done);}}}catch(e){console.error(e);}
  return sb.apply(this,arguments);};}

// ---- Morgána – Üst-kitörés, 3. koncepció („megjelenik az üst, felszáll a lila gőz, leszáll az összes nagy ellenségre,
// és egy körre korábbi vagy jövőbeli kis ellenséggé változnak, kivéve a nagy főellenségeket”):
// funkció: ÁTVÁLTOZTATÁS – az átváltozott ellenség abban a körben csak egy apró, gyenge ütésre képes; kis méregsebzés.
STATUS.poly=['Átváltozott','#c890ff'];
Object.assign(SK.cauldron,{pow:.5,elem:'dark',status:null,desc:'Morgána üstjéből lila gőz száll fel, és ráereszkedik az ellenségekre: egy körre apró, gyenge kis lénnyé változnak (a főellenségek kivételével). Kis sötét sebzés.'});
const R21_SMALL=()=>Object.keys(EN_DEF).filter(k=>{const d=EN_DEF[k];return d&&!d.boss&&!d.miniboss&&!d.passive&&d.h&&d.h<=72&&typeof ENEMY_SPR==='object'&&ENEMY_SPR[k];});
{const de=drawEntity;drawEntity=function(e){if(!e||!e._poly||!e.st||!e.st.poly||!e.alive)return de.apply(this,arguments);const P=EN_DEF[e._poly];if(!P)return de.apply(this,arguments);
  const sv={type:e.type,h:e.h,w:e.w,scale:e.scale,lift:e.lift,d:e.d};Object.assign(e,{type:e._poly,h:P.h,w:P.w,scale:1,lift:P.lift||0,d:P});
  try{return de.apply(this,arguments);}finally{Object.assign(e,sv);}};}
{const ea=enemyAct;enemyAct=async function(e){if(e&&e.alive&&e.st&&e.st.poly&&e._poly){const t=aiTarget(e);if(t){setPrompt(`${e.name} most csak egy apró ${EN_DEF[e._poly].name.toLowerCase()} – alig tud ártani.`);return useEnemySkill(e,{name:'Apró ütés',tgt:'enemy',kind:'phys',pow:.3,elem:'phys',anim:'melee'},t);}return;}return ea.apply(this,arguments);};}
{const ts0=tickStatuses;tickStatuses=async function(){const r=await ts0.apply(this,arguments);try{const PU=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.8) brightness(.85)');
  for(const e of S.enemies)if(e._poly&&!(e.st&&e.st.poly)){e._poly=null;if(e.alive){sfx('dark');for(let i=0;i<4;i++)r21PD(PU,cx(e)+rnd(-30,30),midY(e)+rnd(-30,30),{vx:rnd(-60,60),vy:-rnd(20,70),life:.9,size:rnd(100,150),grow:60,a:.85});popLabel(e,'VISSZAVÁLTOZOTT','#c890ff');}}}catch(e){}return r;};}
A.cauldronBurst=async(u,ts,sk)=>{
  const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{
  const CI=R17I.cauldron,SP=R17I.brewsplash,PU=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.8) brightness(.85)');if(!CI)return;
  const Hs=u.h*u.scale,ch=Hs*.82,cw=ch*CI.width/CI.height,gx=cx(u)+u.w*u.scale*.45+cw*.55,gy=u.y+u.oy+4;
  const C={a:1,y:-ch*2.2,jolt:0,sq:1,vis:false};
  const steam=(x,y,sz,vx,vy,life)=>r21PD(PU,x,y,{vx:vx??rnd(-30,30),vy:vy??-rnd(40,110),life:life||rnd(1,1.5),size:sz||rnd(100,160),grow:70,vr:rnd(-.5,.5),a:.8});
  R18E({update(){return C.a>0;},draw(){if(!C.vis)return;ctx.save();ctx.globalAlpha=C.a;ctx.translate(gx,gy+C.y+C.jolt);ctx.scale(1/C.sq,C.sq);ctx.drawImage(CI,-cw/2,-ch,cw,ch);ctx.restore();}});
  await dimTo(.5,'14,6,20',260);
  // 1) lila füstben megjelenik, és a földre huppan
  sfx('dark');for(let i=0;i<5;i++)steam(gx+rnd(-cw*.5,cw*.5),gy-ch*rnd(.2,1),rnd(110,160));
  await wait(160);C.vis=true;await tween(280,k=>{C.y=-ch*2.2*(1-k*k);});C.y=0;sfx('rock');shake(12);hitStop(50);
  await tween(200,k=>{C.sq=1-.1*Math.sin(k*Math.PI);});C.sq=1;
  // 2) Morgána belekavar (int a kezével), az üst forr, sűrű lila gőzoszlop száll fel
  sfx('poison');sfx('squish');u.lean=-.06;tween(300,k=>{u.lean=-.06*(1-k);});let lp=0;
  await tween(1000,k=>{C.jolt=Math.sin(k*50)*2;if(k-lp>.05){lp=k;steam(gx+rnd(-cw*.25,cw*.25),gy-ch*.9,rnd(110,170),rnd(-20,20),-rnd(160,260),rnd(1.1,1.5));
      if(SP&&Math.random()<.4)r21PD(SP,gx+rnd(-cw*.2,cw*.2),gy-ch*.85,{vx:rnd(-60,60),vy:-rnd(200,340),g:900,life:.6,size:rnd(20,34),vr:rnd(-8,8)});}});C.jolt=0;
  // 3) a gőzfelhő átúszik az ellenfelek fölé
  const minX=Math.min(...al.map(t=>cx(t))),maxX=Math.max(...al.map(t=>cx(t))),top=Math.max(80,Math.min(...al.map(topY))-140);sfx('wind');
  const CL=[];for(let i=0;i<7;i++)CL.push({x:gx+rnd(-40,40),y:Math.max(60,gy-ch*2.2)+rnd(-30,30),tx:minX+(maxX-minX)*(i/6)+rnd(-40,40),ty:top+rnd(-25,25),s:rnd(170,240),a:0,r:rnd(-.3,.3)});
  const CLE={on:true};R18E({update(){return CLE.on;},draw(){for(const c of CL){if(c.a<=0||!PU)continue;r17Draw(PU,c.x,c.y,c.s,{a:c.a,rot:c.r});}}});
  await tween(800,k=>{const e=easeIO(k);for(const c of CL){c.a=Math.min(.95,k*3);c.x+=(c.tx-c.x)*.08;c.y+=(c.ty-c.y)*.08;}});
  popLabel(al[0],'ÜST-KITÖRÉS!','#c890ff');
  // 4) a gőz leereszkedik minden ellenfélre és körbeöleli őket – a nagyok átváltoznak
  const SM=R21_SMALL();sfx('dark');sfx('poison');
  await tween(500,k=>{for(const c of CL){c.y+=k*4;c.a=.95*(1-k*.6);}if(Math.random()<.7){const t=pick(al);steam(cx(t)+rnd(-50,50),topY(t)+rnd(-20,40),rnd(120,180),rnd(-20,20),rnd(60,140),rnd(.7,1));}});
  for(const t of al){for(let i=0;i<5;i++)steam(cx(t)+rnd(-t.w*t.scale*.5,t.w*t.scale*.5),midY(t)+rnd(-t.h*t.scale*.3,t.h*t.scale*.3),rnd(140,200),rnd(-30,30),rnd(-20,20),rnd(.8,1.1));}
  await wait(320);flash('200,120,255',.35,.15);shake(12);sfx('boom');
  for(const t of al){if(!t.alive)continue;const big=!(t.d&&(t.d.boss))&&t.h>72;
    if(big&&SM.length){const cand=SM.filter(k=>k!==t.type);t._poly=pick(cand.length?cand:SM);addStatus(t,'poly',1);}
    else if(t.d&&t.d.boss)popLabel(t,'TÚL ERŐS AZ ÁTVÁLTOZÁSHOZ','#c890ff');
    r21HitNS(u,t,sk);}
  for(const c of CL)c.a=0;CLE.on=false;
  await wait(600);
  // 5) az üst lila füstben eltűnik
  for(let i=0;i<4;i++)steam(gx+rnd(-cw*.5,cw*.5),gy-ch*rnd(.1,.6),rnd(110,160));await tween(380,k=>{C.a=1-k;});
  await wait(200);await dimTo(0,null,240);
  }finally{rel();u.lean=0;}
};

// ---- Kristálygólem: a vékony hatszög pajzs-körvonal nem kell (A5) – a pajzsa a festett kristálytükör
if(typeof SPR_OVER==='object')delete SPR_OVER.cgolem;
// Titáncsapás: a becsapódáskor a nagy sziklatüske-kép (groundCrack → fxImage 'rock') sem jön az ellenfél helyére
{const ta=A.titanAll;A.titanAll=async function(){const g0=groundCrack;groundCrack=function(){};try{return await ta.apply(this,arguments);}finally{groundCrack=g0;}};}
