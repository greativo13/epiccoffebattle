// ===== 37. kör: a felhasználó barlangig gyűjtött megjegyzései =====
// bolt fekvő telefonon, közös támadások megvásárolhatók és ritkábbak, elemi logika (Kristálygólem tűz, sárkány jég,
// saját elem gyógyít), Földrepesztés festett kövekkel, élethű dührepedések

// ---------------------------------------------------------------------------------------------
// 1) Bolt fekvő telefonon: a bolt eddig csak a csatatér dobozában fért el (a lista ~150 px), a jobb oldalt a hőskártyák
//    foglalták. Most a bolt az egész képernyőt kitölti, két oszlopban olvasható, a gombsor (sebesség/zene/hang) rajta marad.
{const st=document.createElement('style');st.textContent=`@media (orientation:landscape) and (max-height:520px){
  .ov-box.shop{position:fixed!important;left:6px!important;right:6px!important;top:6px!important;bottom:6px!important;width:auto!important;max-width:none!important;height:auto!important;max-height:none!important;
    z-index:60!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;margin:0!important;transform:none!important}
  .ov-box.shop .shop-list{flex:1 1 auto!important;min-height:0!important;max-height:none!important;overflow:auto!important;grid-template-columns:1fr 1fr!important;padding-bottom:54px!important}
  .ov-box.shop .shop-desc{font-size:12.5px!important;line-height:1.3!important}.ov-box.shop .shop-name{font-size:15px!important}
  .ov-box.shop .ov-btns{display:none!important}.ov-box.shop .zones{flex-wrap:wrap}.ov-box.shop{background:#1d1230!important}
  html.r21shopL .party,html.r21shopL .cmd,html.r21shopL .stage canvas{visibility:hidden!important}}`;document.head.appendChild(st);}
{const place=()=>{try{const t=document.querySelector('.tools'),shop=document.querySelector('.ov-box.shop');if(!t)return;
  const m=matchMedia('(orientation:landscape) and (max-height:520px)').matches;
  if(m&&shop&&shop.offsetParent!==null){document.documentElement.classList.add('r21shopL');let pa=shop.parentElement;while(pa&&pa!==document.body){if(getComputedStyle(pa).position!=='static'){pa.style.zIndex='60';}pa=pa.parentElement;}Object.assign(t.style,{position:'fixed',left:'auto',right:'14px',top:'auto',bottom:'12px',width:'auto',height:'auto',display:'flex',gap:'8px',zIndex:70});t.dataset.r21='1';t.dataset.r21shop='1';}
  else{document.documentElement.classList.remove('r21shopL');}if(!(m&&shop&&shop.offsetParent!==null)&&t.dataset.r21shop){t.removeAttribute('style');delete t.dataset.r21;delete t.dataset.r21shop;}}catch(e){}};
 setInterval(place,400);addEventListener('resize',place);}

// ---------------------------------------------------------------------------------------------
// 2) Közös támadások: a páros támadásokat és a közös támadást (Négyek ereje) előbb meg kell venni a boltban („Közös” fül).
//    Ritkábban használhatók: mindkét hős limitje TELE kell legyen (100%), az egész limitet elhasználja, és csatánként egyszer.
const R21_PAIR_PRICE=1200,R21_COMBO_PRICE=2500;let R21_OWN=null;
function r21OwnLoad(){try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');R21_OWN=(d&&Array.isArray(d.owned))?d.owned:[];}catch(e){R21_OWN=[];}return R21_OWN;}
function r21OwnSave(){if(S.test)return;try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;const d=JSON.parse(raw);d.owned=R21_OWN||[];localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}}
const r21Owns=k=>S.arena||((R21_OWN||r21OwnLoad()).includes(k));
{const sg=saveGame;saveGame=function(){const r=sg.apply(this,arguments);if(R21_OWN)r21OwnSave();return r;};}
{const ng=newGame;newGame=function(){R21_OWN=[];return ng.apply(this,arguments);};}
{const sb=startBattle;startBattle=function(){r21OwnLoad();S._r21pairUsed=false;return sb.apply(this,arguments);};}
r14Pair=function(h){if(!h||h.limit<100||(!S.arena&&S._r21pairUsed))return null;for(const p of PAIRS){const other=p.a===h.type?p.b:p.b===h.type?p.a:null;if(!other||!r21Owns('pair:'+p.name))continue;
  const o=S.heroes.find(x=>x.type===other&&x.alive&&x.limit>=100);if(o)return {p,o};}return null;};
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{for(const b of [...btnsEl.querySelectorAll('button')]){const sub=b.querySelector('.bs');if(!sub)continue;
    if(sub.textContent==='KÖZÖS TÁMADÁS'&&!r21Owns('combo'))b.remove();else if(/· 50% limit/.test(sub.textContent))sub.textContent=sub.textContent.replace('· 50% limit','· teljes limit');}}catch(e){}return r;};}
{const pf=perform;perform=async function(h,act){const r=await pf.apply(this,arguments);try{if(act&&act.sk&&act.sk.pair){const o=act.sk.partner;h.limit=0;if(o)o.limit=0;S._r21pairUsed=true;updateHUD();}}catch(e){}return r;};}
// bolt: „Közös” fül
{const sh=shopScreen;shopScreen=function(tab){if(tab==='pairs'||(tab==null&&S.shopTab==='pairs')){r21OwnLoad();sh.call(this,'items');S.shopTab='pairs';r21PairShop();return;}const r=sh.apply(this,arguments);try{r21PairTab();}catch(e){}return r;};}
function r21PairTab(){const z=document.querySelector('.ov-box.shop .zones');if(!z||z.querySelector('.r21pt'))return;const b=btn('zone-chip r21pt'+(S.shopTab==='pairs'?' on':''),'Közös támadások',()=>shopScreen('pairs'));z.appendChild(b);}
function r21PairShop(){const box=document.querySelector('.ov-box.shop');if(!box)return;const z=box.querySelector('.zones');if(z){z.querySelectorAll('.zone-chip').forEach(c=>c.classList.remove('on'));r21PairTab();const t=z.querySelector('.r21pt');if(t)t.classList.add('on');}
  const list=box.querySelector('.shop-list');if(!list)return;list.innerHTML='';const roster=(typeof joinedRoster==='function'?joinedRoster():S.heroes).map(h=>h.type);const nm=t=>(HERO_DEF[t]||{}).name||t;
  const row=(name,desc,right)=>{const r=el('div','shop-row');const l=el('div','shop-info');l.appendChild(el('div','shop-name',name));l.appendChild(el('div','shop-desc',desc));r.appendChild(l);r.appendChild(right);list.appendChild(r);};
  const buy=(k,price)=>btn('shop-buy',`${price} arany`,()=>{if(S.gold<price)return;S.gold-=price;(R21_OWN=R21_OWN||[]).push(k);saveGame();r21OwnSave();shopScreen('pairs');},S.gold<price);
  list.appendChild(el('div','shop-head','Közös támadás'));
  row('Közös erő (Négyek ereje)','Az összes harcoló hős egyszerre csap le minden ellenségre. Akkor használható, ha mindenki limitje tele van; mindenki limitjét elhasználja.',R21_OWN.includes('combo')?el('span','shop-own','✓ Megvan'):buy('combo',R21_COMBO_PRICE));
  list.appendChild(el('div','shop-head','Páros támadások'));
  for(const p of PAIRS){const k='pair:'+p.name,ok=roster.includes(p.a)&&roster.includes(p.b);const desc=`${nm(p.a)} + ${nm(p.b)}: ${p.desc} Mindkét hős limitje tele kell legyen; csatánként egyszer.`;
    row(p.name,desc,R21_OWN.includes(k)?el('span','shop-own','✓ Megvan'):!ok?el('span','shop-lock','Ha mindkét hős a csapatban van'):buy(k,R21_PAIR_PRICE));}
  const g=box.querySelector('.gold');if(g)g.textContent=`Arany: ${S.gold}`;}

// ---------------------------------------------------------------------------------------------
// 3) Elemi logika
//  - Kristálygólem: a hő megrepeszti a kristályt → a tűz jól hat rá (eddig ▼ volt).
//  - Espresszó hamu formában: a jég eddig egyáltalán nem hatott (✖) – egy kihűlt sárkányra a jég normálisan hat.
if(EN_DEF.cgolem){EN_DEF.cgolem.elem=Object.assign({},EN_DEF.cgolem.elem,{fire:1.3});EN_DEF.cgolem.info='A hő megrepeszti a kristálytestét: a tűz jól hat rá. Ütésre is reped.';}
if(EN_DEF.espresso&&EN_DEF.espresso.elemFn){const f0=EN_DEF.espresso.elemFn;EN_DEF.espresso.elemFn=e=>{const o=Object.assign({},f0(e));if(e.stance!=='lava'){o.ice=1;if(o.dark===0)o.dark=.5;}return o;};}
//  - Saját elem gyógyít: a tűzsárkányokat és a lávalényeket a tűz, a jégelementált a jég, a villámdenevért a villám,
//    a lampionlidércet a tűz nem sebzi, hanem GYÓGYÍTJA (a sebzés felével).
const R21_ABS={whelp:['fire'],salamander:['fire','lava'],iceelem:['ice'],tbat:['thunder'],lantern:['fire'],espresso:['fire']};
const r21Abs=(t,el)=>!!(t&&t.kind==='enemy'&&el&&R21_ABS[t.type]&&R21_ABS[t.type].includes(el)&&!(t.type==='espresso'&&t.stance!=='lava'));
{const h0=hit;hit=function(u,t,sk){try{if(u&&t&&u.kind==='hero'&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&r21Abs(t,sk.elem)&&t.alive){
    let d=0;try{d=calcDmg(u,t,Object.assign({},sk,{elem:'none',status:null})).dmg||0;}catch(e){}d=Math.max(1,Math.round(d*.5));const g=Math.min(d,t.maxHp-t.hp);t.hp+=g;
    popLabel(t,'ELNYELI – GYÓGYUL!','#7dff9a');popNum(t,g,'heal');sfx('heal');updateHUD&&updateHUD();
    const x=cx(t),y=midY(t),E={k:0},rgb=sk.elem==='ice'?'170,230,255':sk.elem==='thunder'?'255,240,140':'255,170,70';R18E({update(dt){E.k+=dt/.6;return E.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,t.h*t.scale*(.4+.5*E.k),rgb,.5*(1-E.k));ctx.restore();}});
    return 0;}}catch(e){}return h0.apply(this,arguments);};}
{const ev=effectVs;effectVs=function(sk){if(!(sk&&(sk.kind==='mag'||sk.kind==='phys')))return ev.apply(this,arguments);const foes=S.enemies.filter(e=>e.alive),ab=foes.filter(e=>r21Abs(e,sk.elem));if(!ab.length)return ev.apply(this,arguments);
  let r;for(const e of ab)e.alive=false;try{r=ev.apply(this,arguments);}finally{for(const e of ab)e.alive=true;}try{
    const names=[...new Set(ab.map(e=>e.name))].join(', ');return {mark:ab.length===foes.length?'✚':r.mark,text:(r.text||'')+' ✚ Gyógyítja: '+names+'.'};}catch(e){return r;}};}

// ---------------------------------------------------------------------------------------------
// 4) Földrepesztés – ugyanaz a jelenet (felugrás, földbe csapás, repedés fut, kicsiről nagyra törnek fel a tüskék, az ellenség
//    felrepül), de a többi föld-támadás festett stílusában: festett kőtüskék (fx7-rockspike), festett rögök, kráter, porfelhő.
{const es0=A.earthsplit;A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const sp=R17I.rockspike;if(!al.length||!sp)return es0(u,ts,sk);const rel=keepPose(u,'attack');try{const {gy}=grp(al);
  await tween(260,k=>{u.sq=1-.12*easeIO(k);u.lean=-.12*k;});sfx('whoosh');await tween(300,k=>{u.jump=Math.sin(k*Math.PI*.5)*110;u.sq=.88+.2*k;u.lean=-.12+.1*k;});
  await tween(130,k=>{u.jump=110*(1-k*k);u.lean=-.02+.34*k;});u.jump=0;sfx('rock');sfx('boom');shake(18);hitStop(90);rumble(1.6,7);flash('255,235,200',.25,.12);
  const x0=cx(u)+u.w*u.scale*.55+40/* (ma05: a tüskék ne Grogot nyársalják fel – Grog elől indulnak) */,x1=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5))+120,y0=u.y+u.oy;r21Dust(x0,y0,12,240,[28,50]);
  for(let i=0;i<18;i++)part({x:x0+rnd(-20,40),y:y0-rnd(0,10),vx:rnd(-160,260),vy:rnd(-460,-200),g:1000,life:rnd(.6,1),size:rnd(5,10),rgb:'130,105,75',add:false,shape:'rock'});
  const n=18,S2=[];for(let row=0;row<2;row++)for(let i=0;i<n;i++){const q=(i+.5)/n,sc=row?1:.72;S2.push({x:x0+(x1-x0)*q+rnd(-12,12),gy:gy+(row?8:-10),H:(95+90*Math.sin(q*Math.PI*.9+.2))*sc*rnd(.85,1.15),rot:rnd(-.22,.22),fl:Math.random()<.5,k:0,t:0,d:q*850+row*70+rnd(0,40),row,dark:!row});}
  S2.sort((a,b)=>a.row-b.row);const C={k:0},st={t:0,on:true},hitDone=new Set(),cr=R17I.crater;
  R18E({update(dt){st.t+=dt*1000;C.k=Math.min(1,st.t/850);for(const s of S2){if(st.t<s.d)continue;const was=s.k;s.t+=dt;s.k=s.t<.12?r21ease.back(s.t/.12):s.t<1.2?1:Math.max(0,1-(s.t-1.2)/.35);
      if(was===0&&s.k>0){if(Math.random()<.4)sfx('rock');for(let j=0;j<3;j++)part({x:s.x+rnd(-10,10),y:s.gy-rnd(0,6),vx:rnd(-110,110),vy:rnd(-360,-160),g:1000,life:rnd(.5,.8),size:rnd(5,9),rgb:'130,105,75',add:false,shape:'rock'});
        if(Math.random()<.5)r21Dust(s.x,s.gy,1,90,[16,26]);shake(4);
        if(s.row===1)for(const t of al)if(!hitDone.has(t)&&Math.abs(cx(t)-s.x)<40){hitDone.add(t);hitStop(60);toss(t,80,440);t.hurt=.5;hit(u,t,sk);r21Dust(cx(t),t.y+t.oy,8,220,[30,52]);/* (ia ma05) Földrepesztésben nincs láva */}}}
      return st.on;},
    draw(){// festett repedés: egymásba érő kis kráterek a talajon
      if(cr){const N=14;for(let i=0;i<N;i++){const q=(i+.5)/N;if(q>C.k)break;const x=x0+(x1-x0)*q,w=70+90*q,hh=w*cr.height/cr.width*.85;ctx.save();ctx.globalAlpha=Math.min(1,(C.k-q)*6);ctx.drawImage(cr,x-w/2,gy+8-hh*.5,w,hh);ctx.restore();}}
      for(const s of S2){if(s.k<=0)continue;const H=s.H,w=H*sp.width/sp.height;ctx.save();ctx.beginPath();ctx.rect(0,0,W,s.gy+4);ctx.clip();ctx.translate(s.x,s.gy+4+H*(1-s.k)*.9);ctx.rotate(s.rot);if(s.fl)ctx.scale(-1,1);
        if(s.dark)ctx.filter='brightness(.88)';ctx.drawImage(sp,-w/2,-H,w,H);ctx.restore();}}});
  await wait(850+160+1400);st.on=false;for(const t of al)if(!hitDone.has(t)&&t.alive)hit(u,t,sk);await bodySettle(u);}finally{rel();u.jump=0;u.lean=0;u.sq=1;}};}
