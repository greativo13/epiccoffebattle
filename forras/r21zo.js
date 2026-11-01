// ===== 58. kör: bossok és idézések (teljes tesztlista, 4. csomag) =====

// ---- 1) Chasen, a Békemester és az Öreg Matcha-gólem („rossz irányba néz”): mindkét festett kép jobbra néz, és csatában
//    nem volt tükrözve, így háttal álltak a hősöknek. A képet egyszer tükrözzük (az idézésnél a flip ezt már helyesen fordítja).
(function(){let n=0;const iv=setInterval(()=>{n++;try{if(typeof ENEMY_SPR==='object'){const fl=im=>{const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(im,0,0);c._r21fl=true;return c;};
    let done=0;for(const k of ['chasen','oldgolem','chasen-attack','oldgolem-attack','chasen-cast','oldgolem-cast']){const im=ENEMY_SPR[k];if(im&&im.width&&!im._r21fl){ENEMY_SPR[k]=fl(im);}if(!/-/.test(k)&&ENEMY_SPR[k]&&ENEMY_SPR[k]._r21fl)done++;}
    if(done>=2||n>80)clearInterval(iv);}}catch(e){}},250);})();

// közös segédek
const r21Img=k=>R17I[k]||null;
async function r21Lunge(u,t,ms=300,gap=.5){const dx=(cx(t)+t.w*t.scale*gap+u.w*u.scale*.35)-cx(u);ghosts&&ghosts(u,ms);await tween(ms,k=>{u.ox=dx*easeIO(k);});return dx;}
async function r21Back(u,dx,ms=360){await tween(ms,k=>{u.ox=dx*(1-easeIO(k));});u.ox=0;}
function r21Heal(e,pct){const n=Math.max(1,Math.round(e.maxHp*pct));e.hp=Math.min(e.maxHp,e.hp+n);popNum(e,n,'heal');updateHUD();}

// ---- 2) Chasen – teljesen új képességek (a régiek: Habvihar, Megbékítő szó, Kortyintás; az Öreg gólem is ezeket kölcsönözte)
Object.assign(ESK,{
  chwhisk:{name:'Habverő-csapás',tgt:'enemy',kind:'phys',pow:1.55,elem:'phys',anim:'chWhisk',desc:'Chasen odalép, és óriás habverőjével teljes testtel lesújt egy hősre.'},
  chleaf:{name:'Tealevél-örvény',tgt:'enemies',kind:'mag',pow:.85,elem:'nature',anim:'chLeaf',status:['defDown',.5,1],desc:'Éles tealevelek örvénylenek minden hős körül; gyengíthetik a védelmüket.'},
  chzen:{name:'Zen-csend',tgt:'enemies',kind:'mag',pow:.45,elem:'holy',anim:'chZen',desc:'Óriás lótusz nyílik a hősök fölött: a csend lecsillapítja a harci kedvüket – mindenki limitje 30%-kal csökken.'},
  chtea:{name:'Szertartás-tea',tgt:'self',kind:'heal',pow:0,anim:'chTea',desc:'Chasen megissza a szertartás teáját: 15%-ot gyógyul, és leveszi magáról a gyengítéseket.'},
});
if(EN_DEF.chasen){EN_DEF.chasen.skills=[['chwhisk',3],['chleaf',2],['chzen',2],['chtea',1]];EN_DEF.chasen.info='A Békemester: habverővel üt, tealevél-örvényt kavar, a Zen-csenddel elveszi a hősök limitjét, és teával gyógyítja magát. Félélet alatt az Örök Zen altatni is fog.';}

A.chWhisk=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const FO=r21Img('foam'),FR=r21Img('froth');
  u.pose='attack';await bodyWind(u,320,.2);sfx('whoosh');const dx=await r21Lunge(u,t,280,.55);
  await bodyStrike(u,150,-.32);sfx('hit');sfx('splash');shake(18);hitStop(110);flash('240,255,230',.3,.1);
  const x=cx(t),y=midY(t),B={k:0,a:1};R18E({update(){return B.a>0;},draw(){const I=FO||FR;if(!I)return;const S2=Math.max(260,t.h*t.scale*1.7)*(.4+.8*B.k);r17Draw(I,x,y+20,S2,{a:B.a});}});
  tween(520,k=>{B.k=eOutBack(Math.min(1,k*1.5));B.a=k<.5?1:1-(k-.5)/.5;});
  for(let i=0;i<34;i++)part({x:x+rnd(-30,30),y:y+rnd(-40,20),vx:rnd(-360,360),vy:-rnd(80,420),g:900,life:rnd(.5,.9),size:rnd(4,9),rgb:pick(['235,250,220','190,230,150','255,255,255']),add:false,shape:'drop'});
  t.hurt=.6;toss(t,50,360);hit(u,t,sk);await wait(320);await bodySettle(u);await r21Back(u,dx);u.pose='idle';};

A.chLeaf=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const LF=r21Filt(r21Img('leaf'),'hue-rotate(-10deg) saturate(1.3) brightness(.9)');
  u.pose='cast';await bodyWind(u,300,.12);sfx('wind');
  const V=al.map(t=>({t,L:Array.from({length:16},(_,i)=>({a:i/16*6.283,r:rnd(.8,1.15),h:rnd(-.45,.45),s:rnd(26,44),sp:rnd(5,8)})),k:0,a:1}));
  R18E({update(dt){for(const v of V)for(const l of v.L)l.a+=dt*l.sp;return V.some(v=>v.a>0);},draw(){if(!LF)return;for(const v of V){if(v.a<=0||v.k<=0)continue;const t=v.t,R=Math.max(70,t.w*t.scale*.75)*v.k,x=cx(t),y=midY(t);
    for(const l of v.L){const lx=x+Math.cos(l.a)*R*l.r,ly=y+l.h*t.h*t.scale+Math.sin(l.a)*R*.32*l.r;ctx.save();ctx.globalAlpha=v.a;ctx.translate(lx,ly);ctx.rotate(l.a*1.7);ctx.drawImage(LF,-l.s/2,-l.s/2,l.s,l.s*LF.height/LF.width);ctx.restore();}}}});
  await tween(420,k=>{for(const v of V)v.k=eOutBack(k);});await bodyStrike(u,160,-.14);
  for(let n=0;n<3;n++){sfx('slash');shake(6);for(const v of V){v.t.hurt=.3;sparks(cx(v.t)+rnd(-30,30),midY(v.t)+rnd(-40,40),['170,230,120','255,255,255'],8,300);}await wait(280);}
  for(const v of V)if(v.t.alive)hit(u,v.t,sk);
  await tween(380,k=>{for(const v of V){v.k=1+k*.8;v.a=1-k;}});await bodySettle(u);u.pose='idle';};

A.chZen=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const LO=r21Img('lotus'),CL=r21Filt(r21Img('teacloud'),'brightness(1.25) saturate(.4)');
  u.pose='cast';await dimTo(.4,'20,30,20',300);await bodyWind(u,420,.08);sfx('holy');
  const mx=al.reduce((s,t)=>s+cx(t),0)/al.length,top=Math.max(90,Math.min(...al.map(topY))-70),gy=Math.max(...al.map(t=>t.y+t.oy)),Z={k:0,a:1,rot:0,m:0};
  R18E({update(dt){Z.rot+=dt*.25;return Z.a>0;},draw(){
    if(CL&&Z.m>0)for(let i=0;i<5;i++){ctx.save();ctx.globalAlpha=.45*Z.a*Z.m;r17Draw(CL,mx-260+i*130+Math.sin(Z.rot*3+i)*20,gy-30,260,{anchor:'bottom'});ctx.restore();}
    if(LO&&Z.k>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,top,260*Z.k,'230,255,210',.35*Z.a);ctx.restore();ctx.save();ctx.translate(mx,top);ctx.rotate(Math.sin(Z.rot)*.06);r17Draw(LO,0,0,420*Z.k,{a:Z.a});ctx.restore();}}});
  await tween(650,k=>{Z.k=eOutBack(k);Z.m=k;});sfx('heal');
  for(let i=0;i<40;i++)setTimeout(()=>{const t=pick(al);part({x:mx+rnd(-160,160),y:top+rnd(-20,30),vx:(cx(t)-mx)*rnd(.6,1),vy:rnd(120,260),life:rnd(.8,1.2),size:rnd(3,6),rgb:pick(['240,255,220','255,250,200']),shape:'star'});},i*25);
  await wait(700);const st=al.map(h=>({h,l0:h.limit||0}));
  for(const t of al)hit(u,t,sk);
  await tween(700,k=>{for(const s of st)if(s.h.alive)s.h.limit=Math.max(0,s.l0-30*k);updateHUD();});
  for(const s of st)if(s.h.alive)popLabel(s.h,'LIMIT −30%','#d8ffc0');
  await wait(400);await tween(450,k=>{Z.a=1-k;});await bodySettle(u);await dimTo(0,null,300);u.pose='idle';};

A.chTea=async(u,ts,sk)=>{const CUP=r21Img('teacup'),CL=r21Img('teacloud');u.pose='cast';sfx('water');
  const p=()=>({x:cx(u)-u.w*u.scale*.15,y:midY(u)-u.h*u.scale*.12}),C={k:0,a:1};
  R18E({update(){return C.a>0;},draw(){const q=p();if(CUP&&C.k>0)r17Draw(CUP,q.x,q.y,180*C.k,{a:C.a});if(CL&&C.k>.5){ctx.save();ctx.globalAlpha=.5*C.a;r17Draw(CL,q.x,q.y-60-20*Math.sin(performance.now()/400),120*C.k,{});ctx.restore();}}});
  await tween(380,k=>{C.k=eOutBack(k);});await bodyWind(u,380,-.06);sfx('heal');
  for(let i=0;i<30;i++)part({x:cx(u)+rnd(-60,60),y:u.y+u.oy-rnd(0,u.h*u.scale),vx:rnd(-20,20),vy:-rnd(40,120),life:rnd(.6,1),size:rnd(3,6),rgb:pick(['190,240,150','240,255,220']),shape:'star'});
  r21Heal(u,.15);for(const k of ['curse','defDown','burn','poison','freeze','scald','rusted','foam'])if(u.st&&u.st[k])delete u.st[k];popLabel(u,'GYENGÍTÉSEK LEMOSVA','#d8ffc0');
  await wait(400);await tween(350,k=>{C.a=1-k;});await bodySettle(u);u.pose='idle';};

// ---- 3) Öreg Matcha-gólem – saját képességek (eddig: Csészecsapás a Matcha-gólemtől, Forró hab a Teaszertartás-mestertől,
//    Habvihar Chasentől). Minden mozdulatban a gólem saját teste lendül (felhúzás, dőlés, dobbantás).
Object.assign(ESK,{
  ogfist:{name:'Ősi kőököl',tgt:'enemy',kind:'phys',pow:1.7,elem:'phys',anim:'ogFist',desc:'Nehéz léptekkel odadübörög, és mohás kőöklével a földbe döngöli a hőst.'},
  ogquake:{name:'Kőrengés',tgt:'enemies',kind:'phys',pow:.95,elem:'earth',anim:'ogQuake',desc:'Felemeli a lábát és dobbant: mohás kősziklák törnek fel a hősök alatt.'},
  ogpour:{name:'Matcha-áradat',tgt:'enemies',kind:'mag',pow:.9,elem:'water',anim:'ogPour',status:['defDown',.6,1],desc:'Előrebillenti a mellkasán ülő tálat: sűrű, sűrű matchahullám zúdul a hősökre, és ragadósan gyengíti a védelmüket.'},
  ogmoss:{name:'Mohapáncél',tgt:'self',kind:'buff',pow:0,anim:'ogMoss',desc:'Mohalevelek kúsznak a kőtestére: 2 körig erősebb a védelme, és 8%-ot gyógyul.'},
});
if(EN_DEF.oldgolem){EN_DEF.oldgolem.skills=[['ogfist',3],['ogquake',2],['ogpour',2],['ogmoss',1]];EN_DEF.oldgolem.info='Az ősi gólem: kőöklével döngöl, kőrengést kelt, a tálából matchaáradatot zúdít, és mohapáncélt növeszt. Tűz és villám ellen gyenge.';}

A.ogFist=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const CR=r21Img('crater'),CD=r21Img('clods');u.pose='attack';
  const dx=(cx(t)+t.w*t.scale*.55+u.w*u.scale*.32)-cx(u);
  for(let s=0;s<3;s++){const x0=dx*s/3,x1=dx*(s+1)/3;await tween(260,k=>{u.ox=x0+(x1-x0)*easeIO(k);u.oy=-16*Math.sin(k*Math.PI);u.lean=.05*(s%2?1:-1)*Math.sin(k*Math.PI);});sfx('quake');shake(9);
    puffs(cx(u),u.y,6,['160,150,120','120,110,90'],[18,30],{w:u.w*u.scale*.6,up:40});}
  u.oy=0;await bodyWind(u,380,.24);sfx('whoosh');await bodyStrike(u,140,-.36);
  sfx('boom');shake(26);hitStop(140);flash('230,240,200',.35,.12);const gx=cx(t),gy=t.y+t.oy+6;
  if(CR){const C={a:1};R18E({update(){C.a-=.006;return C.a>0;},draw(){r17Draw(CR,gx,gy+14,Math.max(220,t.w*t.scale*2.2),{a:Math.min(1,C.a*2),sy:.5});}});}
  if(CD)for(let i=0;i<14;i++)r21PD(CD,gx+rnd(-40,40),gy-10,{vx:rnd(-320,320),vy:-rnd(200,520),g:1100,size:rnd(24,46),life:rnd(.7,1.1)});
  const oy0=t.oy||0;tween(300,k=>{t.oy=oy0+10*Math.sin(k*Math.PI);});t.hurt=.7;hit(u,t,sk);await wait(380);await bodySettle(u);
  await tween(420,k=>{u.ox=dx*(1-easeIO(k));});u.ox=0;u.pose='idle';};

A.ogQuake=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const RS=r21Filt(r21Img('rockspike'),'sepia(.4) hue-rotate(40deg) saturate(1.2) brightness(.85)');u.pose='attack';
  await tween(420,k=>{u.oy=-40*eOutBack(k);u.lean=.14*k;});sfx('whoosh');await tween(140,k=>{u.oy=-40*(1-k*k);u.lean=.14-.3*k;});u.oy=0;
  sfx('quake');sfx('boom');shake(28);hitStop(120);rumble&&rumble(1.4,14);puffs(cx(u),u.y,14,['170,160,130','130,120,95'],[26,44],{w:u.w*u.scale,up:60});
  const SP=al.map(t=>({t,k:0,a:1,w:Math.max(170,t.w*t.scale*1.5)}));
  R18E({update(){return SP.some(s=>s.a>0);},draw(){if(!RS)return;for(const s of SP){if(s.k<=0||s.a<=0)continue;const gx=cx(s.t),gy=s.t.y+s.t.oy+10;ctx.save();ctx.beginPath();ctx.rect(gx-s.w,0,s.w*2,gy+4);ctx.clip();
    for(const [o,sc] of [[-.32,.75],[0,1],[.34,.8]])r17Draw(RS,gx+o*s.w,gy+(1-s.k)*s.w*.9*sc,s.w*.6*sc,{anchor:'bottom',a:s.a});ctx.restore();}}});
  for(const s of SP){(async()=>{await tween(180,k=>{s.k=eOutBack(k);});sfx('rock');s.t.hurt=.6;toss(s.t,90,520);for(let i=0;i<10;i++)part({x:cx(s.t)+rnd(-60,60),y:s.t.y+s.t.oy,vx:rnd(-200,200),vy:-rnd(150,420),g:900,life:.7,size:rnd(5,10),rgb:pick(['120,110,80','90,110,60']),add:false,shape:'rock'});hit(u,s.t,sk);})();await wait(110);}
  await wait(700);await tween(380,k=>{for(const s of SP){s.k=1-k;s.a=1-k;}});await bodySettle(u);u.pose='idle';};

A.ogPour=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const WV=r21Filt(r21Img('teawave'),'hue-rotate(55deg) saturate(1.6) brightness(.95)');u.pose='cast';
  await bodyWind(u,380,.1);sfx('splash');await bodyStrike(u,320,-.3);   // a tál előrebillen
  const bowl=sprPt(u,.38,.38),x1=Math.min(...al.map(t=>cx(t)))-160,gy=Math.max(...al.map(t=>t.y+t.oy))+10,Wv={x:bowl.x,a:1,h:0};
  for(let i=0;i<40;i++)part({x:bowl.x+rnd(-20,20),y:bowl.y,vx:-rnd(120,380),vy:rnd(-60,160),g:900,life:rnd(.5,.9),size:rnd(5,10),rgb:pick(['140,190,70','170,215,100','220,240,170']),add:false,shape:'drop'});
  R18E({update(){return Wv.a>0;},draw(){if(!WV||Wv.h<=0)return;const w=Wv.h*1.4;ctx.save();ctx.globalAlpha=Wv.a;ctx.translate(Wv.x,gy);ctx.scale(-1,1);ctx.drawImage(WV,-w/2,-Wv.h,w,Wv.h);ctx.restore();}});
  const done=new Set();sfx('water');await tween(1200,k=>{const e=easeIO(k);Wv.x=bowl.x+(x1-bowl.x)*e;Wv.h=Math.min(1,k*4)*Math.max(240,Math.min(360,gy-120));
    for(const t of al)if(!done.has(t)&&Wv.x<cx(t)+60){done.add(t);t.hurt=.5;toss(t,40,320);sfx('splash');shake(10);hit(u,t,sk);}});
  await tween(350,k=>{Wv.a=1-k;});await bodySettle(u);u.pose='idle';};

A.ogMoss=async(u,ts,sk)=>{const LV=r21Img('dewleaves')||r21Img('leaf'),LF=r21Img('leaf');u.pose='cast';await bodyWind(u,420,-.08);sfx('heal');
  const x=cx(u),y=midY(u),G={a:0};R18E({update(){return G.a>=0&&!G.done;},draw(){if(G.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,u.h*u.scale*.7,'150,220,90',.4*G.a);ctx.restore();}});
  for(let i=0;i<26;i++)setTimeout(()=>{if(LF){const a=rnd(0,6.283),r=rnd(160,260);r21PD(LF,x+Math.cos(a)*r,y+Math.sin(a)*r*.7,{vx:-Math.cos(a)*r*1.8,vy:-Math.sin(a)*r*1.3,size:rnd(26,40),life:.55,vr:rnd(-6,6)});}},i*30);
  await tween(700,k=>{G.a=k;});u.st.defUp=Math.max(u.st.defUp||0,2);popLabel(u,'MOHAPÁNCÉL!','#b8e07a');r21Heal(u,.08);
  await wait(400);await tween(400,k=>{G.a=1-k;});G.done=true;await bodySettle(u);u.pose='idle';};

// ---- 4) Idézőkő („az idézések ingyenesek; legyen költségük, de ne a limit”): minden idézés egy Idézőkövet fogyaszt.
//    A boltban (Tárgyak) kapható, az ára a haladáshoz igazodik. Új játék: 2 kő; meglévő mentés egyszer 3 követ kap;
//    minden főellenség-győzelem +1 kő. A Próbateremben ingyenes.
ITEMS.summonstone={name:'Idézőkő',desc:'Egy idézés ára: csatában az Idézés elhasznál egy követ (csatánként továbbra is egy idézés).',tgt:'self',kind:'none',r21noUse:true};
if(!SHOP_ITEMS.some(x=>x[0]==='summonstone'))SHOP_ITEMS.push(['summonstone',null,250]);
function r21StonePrice(){let lv=1;try{for(const z of ZONES)for(const L of z.levels)if(cleared(L.id))lv=Math.max(lv,L.elvl||1);}catch(e){}return Math.round((150+lv*55)/10)*10;}
{const sh=shopScreen;shopScreen=function(){try{const it=SHOP_ITEMS.find(x=>x[0]==='summonstone');if(it)it[2]=r21StonePrice();}catch(e){}return sh.apply(this,arguments);};}
// az Idézőkő nem „használható” tárgy: a Tárgyak menüből és a Próbaterem tárgylistájából kimarad
{const sb=setButtons;setButtons=function(list){try{if(Array.isArray(list))list=list.filter(b=>!(b&&typeof b.label==='string'&&/^Idézőkő/.test(b.label)));}catch(e){}return sb.call(this,list);};}
const r21Stones=()=>(S.inv&&S.inv.summonstone)||0;
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{if(S.arena)return r;const b=[...btnsEl.querySelectorAll('button')].find(x=>((x.querySelector('.bl')||x).textContent||'')==='Idézés');
    if(b){const sub=b.querySelector('.bs'),n=r21Stones();if(!S.summonUsed){if(n<=0){b.disabled=true;if(sub)sub.textContent='nincs Idézőkő';}else if(sub)sub.textContent=`▸ Idézőkő: ${n}`;}
      b.addEventListener('mouseenter',()=>{descEl.textContent=`Megidézel egy lényt, aki egyszer közbelép. Egy Idézőkőbe kerül (most ${r21Stones()} van), csatánként egyszer.`;});}}catch(e){}return r;};}
{const pf=perform;perform=async function(h,act){if(act&&act.type==='summon'&&!S.arena){if(r21Stones()<=0){setPrompt('Nincs Idézőköved – a boltban vehetsz.');return;}S.inv.summonstone=r21Stones()-1;}return pf.apply(this,arguments);};}
{const ng=newGame;newGame=function(){const r=ng.apply(this,arguments);try{S.inv.summonstone=2;if(S.save&&S.save.seen&&!S.save.seen.includes('r21stones'))S.save.seen.push('r21stones');}catch(e){}return r;};}
{const ms=mapScreen;mapScreen=function(){try{if(S.save&&S.save.seen&&!S.save.seen.includes('r21stones')&&S.inv){S.save.seen.push('r21stones');S.inv.summonstone=(S.inv.summonstone||0)+3;saveGame();}}catch(e){}return ms.apply(this,arguments);};}
{const v=victory;victory=async function(){try{const L=S.level;if(L&&!S.arena&&S.enemies.some(e=>e.d&&e.d.boss)&&S.inv){S.inv.summonstone=(S.inv.summonstone||0)+1;setTimeout(()=>{try{showBanner('+1 Idézőkő!',false);}catch(e){}},1200);}}catch(e){}return v.apply(this,arguments);};}

// ---- 5) Kísértetlovag idézés („legyen az a füstös támadása, mint az ellenségnek”): ugyanaz a sötét füsthullám (Sötét hullám),
//    mint amikor ellenfélként támad – csak most az ellenségek felé hömpölyög. Sötét sebzés mindenkire, 60% eséllyel átok.
{const gk=SUMMONS.find(s=>s.id==='gknight');if(gk){gk.desc='Sötét füsthullámot küld (mint ellenfélként): sötét sebzés minden ellenségre, és 60% eséllyel átok.';
  gk.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('dark');await dimTo(.5,'15,0,30',200);
    const x0=S0.x+60,x1=Math.max(...fs.map(cx))+200,W={x:x0,on:true},done=new Set();
    R18E({update(){if(W.on){for(let i=0;i<7;i++)part({x:W.x+rnd(-70,70),y:H-rnd(40,360),vx:rnd(60,160),vy:-rnd(30,120),drag:.6,life:rnd(.6,1),size:rnd(20,40),grow:40,rgb:pick(['40,20,60','70,30,100','25,10,40']),add:false,shape:'dsmoke'});
        for(let i=0;i<4;i++)part({x:W.x+rnd(-60,60),y:H-rnd(60,380),vx:rnd(40,120),vy:-rnd(40,140),drag:.5,life:rnd(.3,.6),size:rnd(4,9),rgb:pick(['170,90,255','210,140,255'])});}return W.on;},
      draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(W.x,H-200);ctx.scale(1,2.4);glow(0,0,170,'130,50,230',.4);ctx.restore();}});
    await tween(1300,k=>{W.x=x0+(x1-x0)*k;for(const t of fs)if(!done.has(t)&&W.x>cx(t)-40){done.add(t);if(t.alive){sfx('dark');t.hurt=.4;toss(t,20,240);puffs(cx(t),midY(t),6,['60,30,90','40,20,60'],[18,30],{shape:'dsmoke'});
      hit(P,t,{name:'Sötét hullám',kind:'mag',pow:2.4,elem:'dark',tgt:'enemies',status:['curse',.6,2]});}}});
    W.on=false;await wait(400);await dimTo(0,null,250);};}}

// ---- 6) Mézkirálynő idézés („az idézett lények nem a rossz fiúk felé néznek, és ne mérgezzen”): a királynő palástos
//    póza (fx7-queencape) a hősök felé nézett – idézéskor tükrözve, az ellenségek felé fordul. A méhraj nem mérgez.
{const qb=SUMMONS.find(s=>s.id==='queenbee');if(qb){qb.desc=(qb.desc||'').replace(/,? ?(és )?(megmérgezi|méreg)[^.]*\./,'.');let QF=null;
  const r0=qb.run;qb.run=async(P,S0)=>{const h0=hit;hit=function(a,t,s){if(a===P&&s&&s.status&&s.status[0]==='poison')s=Object.assign({},s,{status:null,elem:'nature'});return h0.call(this,a,t,s);};
    const Q=R17I.queencape;if(Q&&Q.width&&!QF){QF=document.createElement('canvas');QF.width=Q.width;QF.height=Q.height;const g=QF.getContext('2d');g.translate(Q.width,0);g.scale(-1,1);g.drawImage(Q,0,0);}
    if(QF)R17I.queencape=QF;try{return await r0(P,S0);}finally{hit=h0;if(Q)R17I.queencape=Q;}};}}

// ---- 7) Zen-Kavics Sárkány idézés („másold át az ellenség logikáját, csak mindkettőnél több kavics kell, a méret jó”):
//    ugyanaz a festett kőfelhő és nagy, forgó festett kavicsok, mint ellenfélként (Kavicseső) – csak sokkal több
//    (240 nagy + 320 apró, az ellenfélé 70, a régi idézésé 420 apró), és az ellenségekre zúdul.
{const zd=SUMMONS.find(s=>s.id==='zendragon');if(zd){zd.run=async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const y0=S0.y,s0=S0.s||1;sfx('roar');
  await tween(450,k=>{S0.s=s0*(1+.06*Math.sin(k*Math.PI));S0.y=y0-14*Math.sin(k*Math.PI);});shake(10);rumble&&rumble(1,6);
  const cl=r21Img('rockcloud'),pb=r21Img('pebble'),xs=fs.map(cx),x0=Math.min(...xs)-160,x1=Math.max(...xs)+160,C={a:0,y:-120},PB=[];
  R18E({update(){return C.a>0||!C.done;},draw(){if(C.a<=0||!cl)return;ctx.save();ctx.globalAlpha=C.a;r17Draw(cl,(x0+x1)/2,C.y,(x1-x0)+160);ctx.restore();}});
  await tween(500,k=>{C.a=k;C.y=-120+210*easeIO(k);});
  for(let i=0;i<240;i++){const t=pick(fs);PB.push({x:rnd(x0+30,x1-30),y:120+rnd(-30,20),vy:rnd(560,820),d:i*9,r:rnd(0,6),s:rnd(30,62),land:t.y+t.oy+rnd(-60,14)});}
  for(let i=0;i<320;i++){const t=pick(fs);PB.push({x:rnd(x0,x1),y:110+rnd(-25,25),vy:rnd(640,920),d:100+i*7,r:rnd(0,6),s:rnd(10,20),land:t.y+t.oy+rnd(-120,10)});}
  const E={t:0,a:1};R18E({update(dt){E.t+=dt*1000;for(const p of PB)if(E.t>p.d&&p.y<p.land){p.y+=p.vy*dt;p.r+=dt*6;if(p.y>=p.land&&p.s>28){if(Math.random()<.3)shake(2);for(let j=0;j<2;j++)part({x:p.x,y:p.land,vx:rnd(-120,120),vy:rnd(-160,-60),g:600,life:.5,size:rnd(3,6),rgb:'150,140,120',add:false,shape:'rock'});}}return E.a>0;},
    draw(){if(!pb)return;ctx.save();ctx.globalAlpha=E.a;for(const p of PB){if(E.t<p.d)continue;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.drawImage(pb,-p.s/2,-p.s/2,p.s,p.s*pb.height/pb.width);ctx.restore();}ctx.restore();}});
  sfx('quake');const iv=setInterval(()=>{sfx('rock');for(const t of foesAlive())t.hurt=.2;},170);
  await wait(1700);clearInterval(iv);for(const t of foesAlive()){shake(10);hit(P,t,{name:'Kavicsözön',kind:'phys',pow:2.6,elem:'earth',tgt:'enemies',status:['defDown',1,1]});await wait(70);}
  C.done=true;await wait(500);await tween(500,k=>{C.a=1-k;E.a=1-k;});S0.s=s0;S0.y=y0;};}}
