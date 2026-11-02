// ===== 66. kör: Idézőkő-dobás és idézésenként 5–20 kő =====
// „Az idézésnél az idéző követ dobják be a hősök, és úgy jelenjenek meg az idézések.” „Az elején 5 kő kelljen, aztán 10 stb.,
// de max. 20 legyen a legdrágább is.” A hős a kezéből bedobja a festett Idézőkövet (fx7-summonstone), a kő földet ér,
// a rúnái felizzanak, szétreped – és a darabjai közül nő ki a megidézett lény.

// ---- 1) ár idézésenként: a gyengébb/korai lények 5, a legerősebbek 20 kő
const R21_SUMCOST={squirrel:5,slimeking:5,cat:5,mushking:5,
  oak:10,gknight:10,rustking:10,cannon:10,tbat:10,cgolem:10,
  espresso:15,koffgolem:15,shadows:15,king:15,morcus:15,oolong:15,teaset:15,queenbee:15,kamilla:15,
  phoenix:20,mochiking:20,zendragon:20,frogking:20,chasen:20};
const r21SumCost=d=>Math.min(20,(d&&R21_SUMCOST[d.id])||10);
const r21MinCost=()=>{const l=SUMMONS.filter(summonOpen);return l.length?Math.min(...l.map(r21SumCost)):5;};
ITEMS.summonstone.desc='Idézéshez kell: a hős bedobja, és megjelenik belőle a lény. Egy idézés 5–20 kőbe kerül (a gyengébb lények 5, a legerősebbek 20). Minden megnyert csata +1 kő, főellenség +3.';
ITEMS.summonstone5={name:'Idézőkő-zsák (5 db)',desc:'Öt Idézőkő egyszerre, 10%-kal olcsóbban. Vásárláskor rögtön az Idézőköveid közé kerül.',tgt:'self',kind:'none',r21noUse:true};
{const i=SHOP_ITEMS.findIndex(x=>x[0]==='summonstone');if(i>=0&&!SHOP_ITEMS.some(x=>x[0]==='summonstone5'))SHOP_ITEMS.splice(i+1,0,['summonstone5',null,100]);}
// egy kő ára a haladással nő (kb. annyi, mint régen egy teljes idézés ötöde-huszada)
r21StonePrice=function(){let lv=1;try{for(const z of ZONES)for(const L of z.levels)if(cleared(L.id))lv=Math.max(lv,L.elvl||1);}catch(e){}return Math.round((30+lv*2.5)/5)*5;};
{const sh=shopScreen;shopScreen=function(){try{const p=r21StonePrice(),a=SHOP_ITEMS.find(x=>x[0]==='summonstone'),b=SHOP_ITEMS.find(x=>x[0]==='summonstone5');if(a)a[2]=p;if(b)b[2]=Math.round(p*4.5/5)*5;
    // a megvett zsák azonnal 5 kővé válik
    if(S.inv&&S.inv.summonstone5>0){S.inv.summonstone=(S.inv.summonstone||0)+5*S.inv.summonstone5;S.inv.summonstone5=0;saveGame();}}catch(e){}return sh.apply(this,arguments);};}
{const sb=setButtons;setButtons=function(list){try{if(Array.isArray(list))list=list.filter(b=>!(b&&typeof b.label==='string'&&/^Idézőkő-zsák/.test(b.label)));}catch(e){}return sb.call(this,list);};}

// ---- 2) csatamenü: az Idézés gomb a köveket mutatja, a listában minden lény mellett az ára
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{if(S.arena)return r;const b=[...btnsEl.querySelectorAll('button')].find(x=>((x.querySelector('.bl')||x).textContent||'')==='Idézés');
    if(b){const sub=b.querySelector('.bs'),n=r21Stones(),mc=r21MinCost();if(!S.summonUsed){if(n<mc){b.disabled=true;if(sub)sub.textContent=`Idézőkő: ${n} (kell ${mc})`;}else if(sub)sub.textContent=`▸ Idézőkő: ${n}`;}
      b.addEventListener('mouseenter',()=>{descEl.textContent=`Megidézel egy lényt: a hős bedobja az Idézőkövet. Egy idézés 5–20 kő (most ${r21Stones()} van), csatánként egyszer.`;});}}catch(e){}return r;};}
{const ms=menuSummon;menuSummon=function(h){if(S.arena)return ms.apply(this,arguments);
  const list=SUMMONS.filter(summonOpen),n=r21Stones();setPrompt(`Kit idézel meg? Idézőkő: ${n} (csatánként egyszer)`);
  setButtons([...list.map(d=>{const c=r21SumCost(d);return {label:d.name,sub:`◆ ${c} kő`,elem:(typeof SUMMON_EL==='object'&&SUMMON_EL[d.id])||null,desc:`${d.desc} Ára: ${c} Idézőkő.`,disabled:n<c,on:()=>finish({type:'summon',def:d})};}),{label:'Vissza',cls:'back',on:()=>menuMain(h)}]);};}
{const pf=perform;perform=async function(h,act){if(act&&act.type==='summon'&&!S.arena){const c=r21SumCost(act.def);if(r21Stones()<c){setPrompt(`Ehhez ${c} Idézőkő kell – most ${r21Stones()} van.`);return;}S.inv.summonstone=r21Stones()-c;}return pf.apply(this,arguments);};}

// ---- 3) kövek szerzése: új játék 5 kő; meglévő mentés egyszer legalább 10-re kiegészítve; minden megnyert csata +1, főellenség +3
{const ng=newGame;newGame=function(){const r=ng.apply(this,arguments);try{S.inv.summonstone=5;for(const f of ['r21stones','r21stones2'])if(S.save&&S.save.seen&&!S.save.seen.includes(f))S.save.seen.push(f);}catch(e){}return r;};}
{const ms=mapScreen;mapScreen=function(){try{if(S.save&&S.save.seen&&S.inv&&!S.save.seen.includes('r21stones2')){S.save.seen.push('r21stones2');if(!S.save.seen.includes('r21stones'))S.save.seen.push('r21stones');S.inv.summonstone=Math.max(10,S.inv.summonstone||0);saveGame();}}catch(e){}return ms.apply(this,arguments);};}
{const v=victory;victory=async function(){try{if(S.level&&!S.arena&&S.inv){const boss=S.enemies.some(e=>e.d&&e.d.boss),g=boss?3:1;S.inv.summonstone=(S.inv.summonstone||0)+g;setTimeout(()=>{try{showBanner(`+${g} Idézőkő`,false);}catch(e){}},1200);}}catch(e){}return v.apply(this,arguments);};}

// ---- 4) a kő bedobása: a hős hátralendül, a kezéből ívben elhajítja a festett követ; földet ér, pattan, a rúnái
//      felizzanak, szétreped négy festett darabra, és a fényből nő ki a lény (az eredeti megjelenés ugyanott folytatódik)
async function r21ThrowStone(def,P){const ST=R17I.summonstone;if(!ST)return;
  const hero=S.heroes.find(x=>x.type===P.type&&x.alive)||S.heroes.find(x=>x.alive);if(!hero)return;
  const tx=def.x||330,ty=470;await dimTo(.55,'10,6,30',220);
  hero.pose='cast';try{await bodyWind(hero,260,-.16);}catch(e){}
  let hp;try{hp=handPos(hero);}catch(e){hp=null;}if(!hp||!isFinite(hp.x))hp={x:cx(hero)+30,y:topY(hero)+hero.h*hero.scale*.4};
  const SZ=112,K={x:hp.x,y:hp.y,r:0,a:1,glow:0,on:true,split:0,s:1};
  R18E({update(){return K.on;},draw(){ctx.save();ctx.globalAlpha=K.a;
    if(K.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(K.x,K.y,SZ*(1.2+1.8*K.glow),'190,110,255',.75*K.glow);ctx.restore();}
    const w=SZ*K.s,h=w*ST.height/ST.width;
    if(K.split<=0){ctx.translate(K.x,K.y);ctx.rotate(K.r);try{if(K.glow>0)ctx.filter=`brightness(${1+.9*K.glow}) saturate(${1+K.glow})`;}catch(e){}ctx.drawImage(ST,-w/2,-h/2,w,h);}
    else for(let i=0;i<4;i++){const qx=i%2,qy=i>>1,dx=(qx?1:-1),dy=(qy?1:-.6),d=K.split;ctx.save();ctx.translate(K.x+dx*d*120,K.y+dy*d*70-Math.sin(d*Math.PI)*60*(1-qy));ctx.rotate(K.r+dx*d*3);
      ctx.drawImage(ST,qx*ST.width/2,qy*ST.height/2,ST.width/2,ST.height/2,(qx-1)*w/2+dx*4,(qy-1)*h/2,w/2,h/2);ctx.restore();}
    ctx.restore();}});
  try{bodyStrike(hero,160,.22);}catch(e){}sfx('whoosh');
  // ívben repül, pörögve, lila szikranyommal
  const x0=K.x,y0=K.y;await tween(560,k=>{K.x=x0+(tx-x0)*k;K.y=y0+(ty-8-y0)*k-Math.sin(k*Math.PI)*190;K.r=k*9;
    if(Math.random()<.8)part({x:K.x,y:K.y,vx:rnd(-40,40),vy:rnd(-40,40),life:.45,size:rnd(3,6),rgb:pick(['200,140,255','150,80,240','255,240,255']),shape:'star'});});
  sfx('rock');shake(9);const CL=window.R21_CLODS&&R21_CLODS.length?R21_CLODS:[R17I.clods];for(let n=0;n<6;n++)r21PD(CL[n%CL.length],tx+rnd(-20,20),ty,{vx:rnd(-200,200),vy:-rnd(120,300),g:900,size:rnd(12,20),life:.6});
  puffs&&puffs(tx,ty,6,['190,170,140','150,130,110'],[18,30],{w:80,up:30});
  await tween(240,k=>{K.y=ty-8-Math.sin(k*Math.PI)*36;K.r=9+k*1.4;});hero.pose='idle';try{bodySettle(hero);}catch(e){}
  // a rúnák felizzanak, a kő remeg
  sfx('holy');await tween(520,k=>{K.glow=k;K.s=1+.18*k;K.x=tx+Math.sin(k*70)*3*k;if(Math.random()<.6)part({x:tx+rnd(-30,30),y:ty-10,vx:rnd(-30,30),vy:-rnd(60,200),life:.6,size:rnd(3,6),rgb:pick(['200,140,255','255,230,255']),shape:'star'});});
  // szétreped
  sfx('glass');sfx('boom');flash('200,150,255',.45,.18);shake(14);hitStop(80);sparks(tx,ty-20,['200,140,255','255,255,255'],40,520);
  await tween(380,k=>{K.split=k;K.a=1-k*k;K.glow=1-k;});K.on=false;}
{const ss=summonShow;summonShow=async function(def,P){try{await r21ThrowStone(def,P);}catch(e){console.error(e);}return ss.apply(this,arguments);};}
