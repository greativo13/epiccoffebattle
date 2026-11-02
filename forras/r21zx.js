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
// 68. kör („gagyi, élethűbb, darabos a mozgás”): nagyobb kő, sima, pörgő repülés elmosódó nyommal; becsapódáskor festett
// kráter, kődarabok és porfelhő; a rúnák lüktetve felizzanak, a kő szétreped, a repedésből festett lila fényoszlop
// (fx7-firepillar) és fényrobbanás (fx7-goldburst lilára) tör fel – és a lény MEGSZAKÍTÁS NÉLKÜL ebből a fényből bontakozik ki.
async function r21ThrowStone(def,P){const ST=R17I.summonstone;if(!ST)return;
  const hero=S.heroes.find(x=>x.type===P.type&&x.alive)||S.heroes.find(x=>x.alive);if(!hero)return;
  const E3=k=>1-Math.pow(1-Math.max(0,Math.min(1,k)),3),PIL=r21Filt(R17I.firepillar,'saturate(1.2)'),GB=r21Filt(R17I.goldburst,'hue-rotate(225deg) saturate(1.3)'),CR=r21Filt(R17I.crater,'brightness(.75)');
  const tx=def.x||330,ty=470;dimTo(.62,'10,6,30',380);
  hero.pose='cast';try{await bodyWind(hero,300,-.18);}catch(e){}
  let hp;try{hp=handPos(hero);}catch(e){hp=null;}if(!hp||!isFinite(hp.x))hp={x:cx(hero)+30,y:topY(hero)+hero.h*hero.scale*.4};
  const SZ=150,K={x:hp.x,y:hp.y,r:0,a:1,glow:0,on:true,split:0,s:.7,trail:[],crA:0,pil:0,pilA:0,burst:0};
  R18E({update(){K.trail.unshift({x:K.x,y:K.y,r:K.r});if(K.trail.length>7)K.trail.pop();return K.on;},draw(){
    if(CR&&K.crA>0){ctx.save();ctx.globalAlpha=K.crA;r17Draw(CR,tx,ty+14,260,{sy:.45});ctx.restore();}
    if(PIL&&K.pilA>0){const h=520*E3(K.pil),w=h*PIL.width/PIL.height*1.25;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=K.pilA;ctx.drawImage(PIL,tx-w/2,ty+20-h,w,h);ctx.restore();}
    if(GB&&K.burst>0&&K.burst<1){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,tx,ty-60,560*E3(K.burst),{a:1-K.burst});ctx.restore();}
    if(K.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(K.x,K.y,SZ*(1+1.6*K.glow),'170,90,255',.7*K.glow);ctx.restore();}
    const w=SZ*K.s,h=w*ST.height/ST.width;
    if(K.split<=0){if(!K.landed)K.trail.forEach((p,i)=>{if(!i)return;ctx.save();ctx.globalAlpha=.32*(1-i/K.trail.length)*K.a;ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.drawImage(ST,-w/2,-h/2,w,h);ctx.restore();});
      ctx.save();ctx.globalAlpha=K.a;ctx.translate(K.x,K.y);ctx.rotate(K.r);try{if(K.glow>0)ctx.filter=`brightness(${1+.8*K.glow}) saturate(${1+K.glow})`;}catch(e){}ctx.drawImage(ST,-w/2,-h/2,w,h);ctx.restore();}
    else for(let i=0;i<4;i++){const qx=i%2,qy=i>>1,dx=(qx?1:-1),d=K.split;ctx.save();ctx.globalAlpha=Math.max(0,1-d*d);ctx.translate(K.x+dx*d*190,K.y-Math.sin(Math.min(1,d*1.4)*Math.PI*.9)*(qy?90:170)+d*d*120);ctx.rotate(K.r+dx*d*5);
      ctx.drawImage(ST,qx*ST.width/2,qy*ST.height/2,ST.width/2,ST.height/2,(qx-1)*w/2+dx*3,(qy-1)*h/2,w/2,h/2);ctx.restore();}}});
  try{bodyStrike(hero,170,.24);}catch(e){}sfx('whoosh');
  // sima ív: a vízszintes mozgás lassul a végén, a kő pörög és nő (közelebb jön)
  const x0=K.x,y0=K.y;await tween(720,k=>{const kx=1-Math.pow(1-k,1.6);K.x=x0+(tx-x0)*kx;K.y=y0+(ty-10-y0)*k-Math.sin(k*Math.PI)*230;K.r=k*11;K.s=.7+.3*k;
    if(Math.random()<.9)part({x:K.x+rnd(-10,10),y:K.y+rnd(-10,10),vx:rnd(-30,30),vy:rnd(-30,30),life:.55,size:rnd(3,7),rgb:pick(['200,140,255','150,80,240','255,240,255']),shape:'star'});});
  K.landed=true;sfx('rock');sfx('boom');shake(16);hitStop(70);
  const CL=window.R21_CLODS&&R21_CLODS.length?R21_CLODS:[R17I.clods];for(let n=0;n<12;n++)r21PD(CL[n%CL.length],tx+rnd(-30,30),ty,{vx:rnd(-280,280),vy:-rnd(160,420),g:1000,size:rnd(14,28),life:.9});
  puffs&&puffs(tx,ty,12,['190,170,140','150,130,110'],[26,46],{w:150,up:50});tween(260,k=>{K.crA=E3(k);});
  await tween(300,k=>{K.y=ty-10-Math.sin(k*Math.PI)*46*(1-k*.4);K.r=11+k*1.6;});hero.pose='idle';try{bodySettle(hero);}catch(e){}
  // a rúnák lüktetve felizzanak, a kő remeg, apró szikrák szállnak
  sfx('holy');await tween(620,k=>{K.glow=E3(k)*(.8+.2*Math.sin(k*30));K.s=1+.15*k;K.x=tx+Math.sin(k*80)*4*k;
    if(Math.random()<.7)part({x:tx+rnd(-40,40),y:ty-10,vx:rnd(-30,30),vy:-rnd(80,240),life:.7,size:rnd(3,6),rgb:pick(['200,140,255','255,230,255']),shape:'star'});});
  // szétreped: fényoszlop + fényrobbanás; a lény (eredeti megjelenés) azonnal indul ugyanott
  sfx('glass');sfx('boom');flash('200,150,255',.5,.2);shake(16);hitStop(90);sparks(tx,ty-30,['200,140,255','255,255,255'],50,600);
  tween(900,k=>{K.split=k;K.glow=1-k;K.crA=1-k*.6;});tween(260,k=>{K.pil=k;K.pilA=k;}).then(()=>tween(1100,k=>{K.pilA=1-k;}));tween(700,k=>{K.burst=k;}).then(()=>{K.burst=0;});
  setTimeout(()=>{K.on=false;},2200);await wait(120);}
{const ss=summonShow;summonShow=async function(def,P){try{await r21ThrowStone(def,P);}catch(e){console.error(e);}return ss.apply(this,arguments);};}
