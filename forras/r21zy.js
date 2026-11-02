// ===== 67. kör: izgalmasabb játék – csillagos pályák, felfedezhető gyenge pontok, előre jelzett Dühkitörés, elit zsákmány =====
// (A kombó és a főellenség-düh már megvolt az r21t.js-ben: azokat nem duplikáljuk, a dühhöz csak az előrejelzés jön.)
const r21Slot=()=>(typeof R14_SLOT!=='undefined'?R14_SLOT:1);
const r21LS=(k,v)=>{const key='nagy-kaverablas-'+k+'-s'+r21Slot();try{if(v===undefined)return JSON.parse(localStorage.getItem(key)||'{}')||{};localStorage.setItem(key,JSON.stringify(v));}catch(e){return {};}};
{const ng=newGame;newGame=function(){r21LS('csillag',{});return ng.apply(this,arguments);};}

// ---- 1) Csillagos pályák: ★ senki nem esett el · ★ gyors győzelem (kevés kör) · ★ idézés nélkül.
//      Minden újonnan megszerzett csillag +1 Idézőkő. A legjobb eredmény marad meg, a térképen a pálya alatt látszik.
const r21InZones=L=>!!L&&ZONES.some(z=>z.levels.includes(L));
const r21RoundLimit=L=>L.boss?9:Math.max(4,L.battles.length*4);
{const sl=startLevel;startLevel=function(L){S._r21lv={id:L&&L.id,deaths:0,rounds:0,summon:false};return sl.apply(this,arguments);};}
{const d0=die;die=function(t){try{if(t&&t.kind==='hero'&&t.alive&&!S.arena&&S._r21lv)S._r21lv.deaths++;}catch(e){}return d0.apply(this,arguments);};}
{const pf=perform;perform=async function(h,act){try{if(act&&act.type==='summon'&&!S.arena&&S._r21lv)S._r21lv.summon=true;}catch(e){}return pf.apply(this,arguments);};}
{const v=victory;victory=async function(){let line=null;
  try{const L=S.level,R=S._r21lv;if(L&&R&&R.id===L.id&&!S.arena&&r21InZones(L)){R.rounds+=S.round||1;
      if(S.battleIdx>=L.battles.length-1){const lim=r21RoundLimit(L),got=[R.deaths===0,R.rounds<=lim,!R.summon],n=got.filter(Boolean).length;
        const all=r21LS('csillag'),old=all[L.id]||0,gain=Math.max(0,n-old);if(n>old){all[L.id]=n;r21LS('csillag',all);}
        if(gain&&S.inv)S.inv.summonstone=(S.inv.summonstone||0)+gain;
        const ok=b=>b?'✓':'✗';line=`Csillagok: ${'★'.repeat(n)}${'☆'.repeat(3-n)} – ${ok(got[0])} senki nem esett el · ${ok(got[1])} gyors (${R.rounds}/${lim} kör) · ${ok(got[2])} idézés nélkül`+(gain?` · Új csillag: +${gain} Idézőkő!`:'');}}}catch(e){}
  if(!line)return v.apply(this,arguments);
  const ov0=overlay;overlay=function(items){try{for(const it of items||[])if(Array.isArray(it)&&it[1]==='ov-list'&&Array.isArray(it[2])){it[2].push(line);break;}}catch(e){}return ov0.apply(this,arguments);};
  try{return await v.apply(this,arguments);}finally{overlay=ov0;}};}
// térkép: a pálya pontja alatt a csillagok
{const st=document.createElement('style');st.textContent='.map-view .mnode{overflow:visible}.map-view .mnode .r21st{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:1px;font-size:clamp(11px,1.9vw,16px);line-height:1;letter-spacing:-1px;color:#ffd84a;text-shadow:0 1px 2px #000,0 0 3px #000;white-space:nowrap;pointer-events:none}.map-view .mnode .r21st i{font-style:normal;color:#8a7bb3}';document.head.appendChild(st);}
{const ms=mapScreen;mapScreen=function(){const r=ms.apply(this,arguments);try{const all=r21LS('csillag');
    for(const b of document.querySelectorAll('.map-view .mnode')){const id=(b.title||'').split(' · ')[0];if(!id||!(id in all)&&!/teljesítve/.test(b.title))continue;const n=all[id]||0;
      const s=document.createElement('span');s.className='r21st';s.innerHTML='★'.repeat(n)+'<i>'+'★'.repeat(3-n)+'</i>';b.appendChild(s);b.title+=` · ${n}/3 csillag`;}}catch(e){}return r;};}

// ---- 2) Gyenge pontok felfedezése: a „GYENGE PONT!” felirat és a felfedezett gyengeségek nyilvántartása (R14_WEAK) már
//      megvolt (r14a, r21r). Új: a Bestiárium csak a harcban már megtalált gyengeségeket mutatja, a többit „felfedezetlen”-ként.
{const rb=r14Bestiary;r14Bestiary=function(){const r=rb.apply(this,arguments);try{const g=(typeof R14_WEAK==='object'&&R14_WEAK)||{};
    for(const row of document.querySelectorAll('.shop-row')){const nm=row.querySelector('.shop-name'),ds=row.querySelector('.shop-desc');if(!nm||!ds||nm.textContent==='???')continue;
      const t=Object.keys(EN_DEF).find(k=>EN_DEF[k].name===nm.textContent.replace(' 👑',''));if(!t)continue;const ws=Object.entries(EN_DEF[t].elem||{}).filter(([e,m])=>m>=1.3).map(([e])=>e);if(!ws.length)continue;
      const known=ws.filter(e=>g[t+':'+e]).map(e=>ELEM_NAMES[e]||e),hid=ws.length-known.length;
      const txt2=known.length?` Gyenge: ${known.join(', ')}${hid?` + ${hid} még felfedezetlen`:''}.`:` Gyenge pont: ${hid} van – találd meg harc közben!`;
      ds.textContent=ds.textContent.replace(/ Gyenge: [^.]*\./,txt2);}}catch(e){}return r;};}

// ---- 3) Előre jelzett Dühkitörés: a feldühödött főellenség (r21t) a második Dühkitöréstől kezdve egy körrel előbb
//      „készül valamire” – vörösen izzik, a hősök felkészülhetnek (Védekezés, gyógyítás) –, a következő körében pedig
//      feltöltött, 50%-kal erősebb Dühkitöréssel csap le.
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){
  if(typeof R21RAGE_SK==='object'&&sk===R21RAGE_SK&&e&&e._p2){if(!e._r21rage1){e._r21rage1=true;return ue.apply(this,arguments);}
    if(!e._r21charged){e._r21charged=true;showBanner(`${e.name} készül valamire…`,true);setPrompt(`${e.name} erőt gyűjt – a következő körében lecsap mindenkire! Védekezz vagy gyógyíts!`);
      popLabel(e,'KÉSZÜL VALAMIRE…','#ff6a4a');sfx('growl');shake(8);e.pose='cast';
      R18E({update(){return e.alive&&e._r21charged&&!S.over;},draw(){const t=performance.now()/1000,p=.5+.5*Math.sin(t*7);ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*(.7+.15*p),'255,60,30',.35+.25*p);ctx.restore();
        if(Math.random()<.3)part({x:cx(e)+rnd(-60,60),y:e.y+e.oy,vx:rnd(-20,20),vy:-rnd(80,220),life:.6,size:rnd(4,8),rgb:pick(['255,90,40','255,180,80']),shape:'star'});}});
      await wait(1100);e.pose='idle';return;}}
  return ue.apply(this,arguments);};}
{const ea=enemyAct;enemyAct=async function(e){if(e&&e._r21charged&&e.alive&&typeof R21RAGE_SK==='object'){e._r21charged=false;
    showBanner('Feltöltött Dühkitörés!',true);await useEnemySkill(e,Object.assign({},R21RAGE_SK,{name:'Feltöltött Dühkitörés',pow:R21RAGE_SK.pow*1.5}),null);return;}
  return ea.apply(this,arguments);};}

// ---- 4) Elit zsákmány: az elit ellenfél 35% eséllyel egy Idézőkövet hagy maga után (a festett kő felreppen és a csapathoz száll)
{const d0=die;die=function(t){const el=t&&t.alive&&t.kind==='enemy'&&t._elite&&!S.arena;const r=d0.apply(this,arguments);
  try{if(el&&S.inv&&Math.random()<.35){S.inv.summonstone=(S.inv.summonstone||0)+1;const ST=R17I.summonstone,K={x:cx(t),y:midY(t),k:0};sfx('coin');
      R18E({update(){return K.k<1;},draw(){if(!ST)return;const h=S.heroes.find(x=>x.alive)||t,x=K.x+(cx(h)-K.x)*Math.max(0,K.k-.35)/.65,y=K.y-Math.sin(Math.min(1,K.k/.35)*Math.PI/2)*80+(midY(h)-K.y+80)*Math.max(0,K.k-.35)/.65,w=58;
        ctx.save();ctx.globalAlpha=K.k<.85?1:(1-K.k)/.15;ctx.globalCompositeOperation='source-over';ctx.translate(x,y);ctx.rotate(K.k*6);ctx.drawImage(ST,-w/2,-w*ST.height/ST.width/2,w,w*ST.height/ST.width);ctx.restore();}});
      tween(1300,k=>{K.k=k;});popLabel(t,'+1 IDÉZŐKŐ','#c8a0ff');}}catch(e){}return r;};}
