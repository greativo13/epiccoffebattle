
// ===== 21. kör, 2. rész: a teljes átnézés hibái =====
// 1) Bolt fekvő telefonon: a lista kitölti a magasságot (eddig ~100 px látszott), az alsó, ismétlődő „Vissza a térképre” gomb rejtve (fent ott a ✕), kisebb cím
{const st=document.createElement('style');st.textContent=`
@media (orientation:landscape) and (max-height:500px){
  .ov-box.shop{display:flex;flex-direction:column;max-height:calc(100% - 8px);overflow:hidden}
  .ov-box.shop{position:relative}
  .ov-box.shop .shop-top{position:absolute;top:6px;right:8px;margin:0;z-index:2}
  .ov-box.shop .shop-top .ov-btn{padding:6px 12px;font-size:13px}
  .ov-box.shop .ov-title{font-size:20px!important;margin:2px 0 0;text-align:left}
  .ov-box.shop .gold{margin:0 0 2px;font-size:13px;text-align:left}
  .ov-box.shop .zones{margin:2px 0 6px;gap:4px}
  .ov-box.shop .zones .zone-chip{padding:4px 10px;font-size:12px}
  .ov-box.shop .shop-list{flex:1 1 auto;min-height:0;max-height:none!important}
  .ov-box.shop > .ov-btns,.ov-box.shop > .ov-btn:not(.shop-exit),.ov-box.shop .shop-bottom{display:none!important}
}`;document.head.appendChild(st);}
{const sh=shopScreen;shopScreen=function(){const r=sh.apply(this,arguments);try{const box=document.querySelector('.ov-box.shop');if(box){const bs=[...box.querySelectorAll('button')].filter(b=>/Vissza a térképre/.test(b.textContent)&&!b.classList.contains('shop-exit'));for(const b of bs)b.classList.add('shop-bottom');}}catch(e){}return r;};}

// 2) Térképcím: ha a fejezetcím és a helyszín neve azonos („A Káosz Tornya · A Káosz Tornya”), csak egyszer írjuk ki
{const dedup=t=>{const m=/^(.*?):\s*(.+?)\s*·\s*(.+)$/.exec(t||'');return m&&m[2].trim()===m[3].trim()?`${m[1]}: ${m[2]}`:t;};
 const fix=el=>{const t=el.textContent,n=dedup(t);if(n!==t)el.textContent=n;};
 const ms=mapScreen;mapScreen=function(){const r=ms.apply(this,arguments);try{const info=document.querySelector('.map-info');if(info){fix(info);if(!info._dd){info._dd=new MutationObserver(()=>fix(info));info._dd.observe(info,{childList:true,characterData:true,subtree:true});}}}catch(e){}return r;};}

// 3) Pihenő hős a pálya párbeszédében: nincs a csatatéren, ezért a buborékja a csatatér szélén jelenik meg „(a háttérből)” jelöléssel – a szöveg nem változik
{const t0=talk;talk=async function(list){if(!list||!list.length)return t0.apply(this,arguments);try{const all=(typeof joinedRoster==='function'?joinedRoster():[]);
   const benched=new Set(all.filter(h=>!S.heroes.includes(h)).map(h=>h.name));if(benched.size)list=list.map(ln=>benched.has(ln.who)?{...ln,who:ln.who+' (a háttérből)'}:ln);}catch(e){}return t0.call(this,list);};}
