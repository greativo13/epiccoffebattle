// ===== 55. kör: stabil parancsmenü – páros és közös támadás csak akkor látszik, ha tényleg használható =====

// ---- 1) Páros támadás feltétele: a két hős limitjének összege érje el a küszöböt a nehézségi szint szerint.
//    A küszöb a két csík együttes hosszára vonatkozik: Könnyű 50%, Normál 75%, Nehéz 90% (pl. Normálon 80% + 70% = 150/200 = 75%).
//    Minden páros támadás csatánként egyszer használható (a többi páros ettől még elérhető marad).
const R21_PAIR_THR=[50,75,90];
const r21PairThr=()=>R21_PAIR_THR[Math.max(0,Math.min(2,S.diff|0))];
function r21PairsFor(h){const out=[];try{if(!h||!h.alive||(h.st&&h.st.silence))return out;const done=S._r21pairDone||(S._r21pairDone=new Set());
  for(const p of PAIRS){const other=p.a===h.type?p.b:p.b===h.type?p.a:null;if(!other||!r21Owns('pair:'+p.name))continue;if(!S.arena&&done.has(p.name))continue;
    const o=S.heroes.find(x=>x.type===other&&x.alive);if(!o||(o.st&&o.st.silence))continue;
    if((h.limit||0)+(o.limit||0)<2*r21PairThr())continue;out.push({p,o});}}catch(e){}return out;}
r14Pair=function(h){return r21PairsFor(h)[0]||null;};
{const sb=startBattle;startBattle=function(){S._r21pairDone=new Set();return sb.apply(this,arguments);};}
{const pf=perform;perform=async function(h,act){const r=await pf.apply(this,arguments);try{if(act&&act.sk&&act.sk.pair){(S._r21pairDone||(S._r21pairDone=new Set())).add(act.sk.pair.name);S._r21pairUsed=false;}}catch(e){}return r;};}

// ---- 2) Főmenü: a gombok mindig ugyanabban a sorrendben, ugyanazon a helyen állnak (Támadás, Képességek, Tárgyak,
//    Védekezés, Idézés). A LIMIT, a PÁROS és a KÖZÖS gomb csak akkor jelenik meg, ha használható, és mindig a lista
//    VÉGÉRE kerül – így a többi gomb nem ugrik arrébb. Nincs több szürke, villogó „még nem elérhető” gomb.
function r21MkBtn(label,sub,desc,on){const b=document.createElement('button');b.type='button';b.className='cbtn limit';
  const l=document.createElement('span');l.className='bl';l.textContent=label;b.appendChild(l);
  const s=document.createElement('span');s.className='bs';s.textContent=sub;b.appendChild(s);
  b.addEventListener('click',on);const show=()=>{descEl.textContent=desc||'';};b.addEventListener('mouseenter',show);b.addEventListener('focus',show);return b;}
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{if(!h||S.arena||typeof btnsEl!=='object'||!btnsEl)return r;
    // a korábbi rétegek páros/közös gombjai (elöl beszúrt, szürke várakozó) ki
    for(const b of [...btnsEl.querySelectorAll('button')]){const t=(b.querySelector('.bl')||b).textContent||'';
      if(b.classList.contains('r21wait')||/^PÁROS:/.test(t)||/^KÖZÖS TÁMADÁS/.test(t))b.remove();}
    // a LIMIT gomb a végére
    const lim=[...btnsEl.querySelectorAll('button')].find(b=>/^LIMIT/.test((b.querySelector('.bl')||b).textContent||''));if(lim)btnsEl.appendChild(lim);
    for(const {p,o} of r21PairsFor(h)){
      const sk={id:'pair',name:p.name,tgt:'enemies',kind:'mag',pow:p.pow,elem:p.elem,status:p.status,anim:'pairAtk',pair:p,partner:o,desc:p.desc};
      {const pb=r21MkBtn('PÁROS: '+p.name,`${h.name} ${Math.floor(h.limit)}% + ${o.name} ${Math.floor(o.limit)}%`,
        p.desc+` Feltétel: a két hős limitje együtt legalább ${r21PairThr()}% (mindkettőjük limitjét elhasználja, csatánként egyszer).`,
        ()=>finish({type:'skill',sk,targets:S.enemies.filter(e=>e.alive)}));pb.classList.add('r21pair');btnsEl.appendChild(pb);}}
    if(r21Owns('combo')&&typeof comboReady==='function'&&comboReady()&&!(h.st&&h.st.silence))
      btnsEl.appendChild(r21MkBtn('KÖZÖS TÁMADÁS!',COMBO.name,COMBO.desc,()=>finish({type:'skill',sk:COMBO,targets:S.enemies.filter(e=>e.alive)})));
  }catch(e){console.error(e);}return r;};}
{const st=document.createElement('style');st.textContent='.cbtn.r21pair .bs{white-space:normal;font-size:11px;line-height:1.2}';document.head.appendChild(st);}

// ---- 3) Bolt: a páros támadások leírása az új feltétellel
{const ps=r21PairShop;r21PairShop=function(){const r=ps.apply(this,arguments);try{for(const d of document.querySelectorAll('.ov-box.shop .shop-desc'))
    d.textContent=d.textContent.replace('Mindkét hős limitje tele kell legyen; csatánként egyszer.',`Akkor használható, ha a két hős limitje együtt eléri a küszöböt (Könnyű 50%, Normál 75%, Nehéz 90%); mindkettőjük limitjét elhasználja, csatánként egyszer.`);}catch(e){}return r;};}

// ---- 4) Bestiárium („olyan ellenfelek is megjelentek, amelyeket még le sem győztem”): a legyőzöttek listája eddig
//    közös volt minden mentőhelynek és minden új játéknak. Mostantól mentőhelyenként külön vezetjük; a régi közös
//    listából csak az számít, aki a mostani mentésben már teljesített pályán szerepel. Új játéknál üres.
const r21BeastKey=()=>'nagy-kaverablas-bestiarium-s'+(typeof R14_SLOT!=='undefined'?R14_SLOT:1);
const r21BeastGet=()=>{try{return JSON.parse(localStorage.getItem(r21BeastKey())||'{}')||{};}catch(e){return {};}};
const r21BeastSet=o=>{try{localStorage.setItem(r21BeastKey(),JSON.stringify(o));}catch(e){}};
{const dB=die;die=function(t){const r=dB.apply(this,arguments);try{if(t&&t.kind==='enemy'&&!S.arena&&EN_DEF[t.type]){const o=r21BeastGet();o[t.type]=(o[t.type]||0)+1;r21BeastSet(o);}}catch(e){}return r;};}
{const ng=newGame;newGame=function(){r21BeastSet({});return ng.apply(this,arguments);};}
{const rb=r14Bestiary;r14Bestiary=function(){const keep=Object.assign({},R14_BEAST);try{const mine=r21BeastGet(),ok=new Set();
    for(const z of ZONES)for(const L of z.levels)if(typeof cleared==='function'&&cleared(L.id))for(const b of L.battles||[])for(const t of b)ok.add(t);
    for(const k of Object.keys(R14_BEAST))delete R14_BEAST[k];
    for(const t of new Set([...Object.keys(keep),...Object.keys(mine)])){const n=mine[t]||(ok.has(t)?keep[t]:0);if(n)R14_BEAST[t]=n;}}catch(e){}
  try{return rb.apply(this,arguments);}finally{for(const k of Object.keys(R14_BEAST))delete R14_BEAST[k];Object.assign(R14_BEAST,keep);}};}

// ---- 5) „A gombok folyamatosan mozognak”: minden ellenséges körnél a gombsor eltűnt, aztán újra felépült (villogott).
//    Mostantól csata közben a gombok a helyükön maradnak, csak elhalványulnak és nem nyomhatók, amíg nem a hősök
//    jönnek. A gombsor magassága a csata alatt nem ugrál vissza kisebbre (csak nőhet), így a panel nem rángatózik.
{const inFight=()=>!S.over&&(S.enemies||[]).some(e=>e.alive)&&ov.hidden!==false&&!S.arena;let maxH=0;
  const sb=setButtons;setButtons=function(list){try{const empty=!list||!list.filter(Boolean).length;
      if(empty&&inFight()&&btnsEl.children.length){for(const b of btnsEl.querySelectorAll('button')){b.disabled=true;b.classList.add('r21idle');}descEl.textContent='';return;}}catch(e){}
    const r=sb.apply(this,arguments);
    try{if(inFight()){maxH=Math.max(maxH,btnsEl.offsetHeight);btnsEl.style.minHeight=maxH+'px';}else{maxH=0;}}catch(e){}return r;};
  const st0=startBattle;startBattle=function(){maxH=0;try{btnsEl.innerHTML='';btnsEl.style.minHeight='';}catch(e){}return st0.apply(this,arguments);};
  const ov0=overlay;overlay=function(){maxH=0;try{btnsEl.style.minHeight='';}catch(e){}return ov0.apply(this,arguments);};}
{const st=document.createElement('style');st.textContent='.cbtn.r21idle{opacity:.35!important;animation:none!important;filter:grayscale(.6)!important;pointer-events:none}';document.head.appendChild(st);}
