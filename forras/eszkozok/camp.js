// minden pálya végigjátszása automatikusan: a hősök véletlen képességet használnak; hibák és elakadások gyűjtése
const {chromium}=require('playwright');const only=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' @'+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error')errs.push('C:'+m.text());});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();});await p.waitForTimeout(800);
const ids=await p.evaluate(()=>ZONES.flatMap(z=>z.levels.map(l=>l.id)));
await p.evaluate(()=>{
  window.__log=[];talk=async()=>{};S.speed=4;
  const sk0=s=>s;
  chooseAction=function(h){const al=S.enemies.filter(e=>e.alive),fr=S.heroes.filter(x=>x.alive),dead=S.heroes.filter(x=>!x.alive);
    const own=(h.skills||[]).map(id=>({...SK[id],id})).filter(s=>s&&s.name&&(s.mp||0)<=h.mp&&!(h.cds&&h.cds[s.id]));
    let sk=Math.random()<.65&&own.length?own[Math.floor(Math.random()*own.length)]:ATTACKS[h.type];
    if(h.limit>=100&&LIMITS[h.type]&&Math.random()<.5)sk={...LIMITS[h.type],id:'LIMIT',isLimit:true};
    const tg=sk.tgt==='enemy'?[al[Math.floor(Math.random()*al.length)]]:sk.tgt==='enemies'?al:sk.tgt==='self'?[h]:sk.tgt==='allies'?fr:sk.tgt==='ally'?[fr[Math.floor(Math.random()*fr.length)]]:sk.tgt==='dead'?(dead.length?[dead[0]]:[h]):al;
    if(sk.tgt==='dead'&&!dead.length)sk=ATTACKS[h.type];
    window.__log.push(h.type+':'+(sk.id||sk.name));return Promise.resolve({type:'skill',sk,targets:sk.tgt==='dead'&&!dead.length?[al[0]]:tg});};
  const v=victory,d=defeat;victory=async function(){const L2=S.level;const last=S.battleIdx>=L2.battles.length-1;await v.apply(this,arguments);if(!last){setTimeout(()=>{S.battleIdx++;startBattle();},50);}else window.__done='WIN';};
  defeat=function(){window.__done='LOSE r'+S.round;return d.apply(this,arguments);};
  const mk=mkEnemy;mkEnemy=function(){const e=mk.apply(this,arguments);e.maxHp=Math.max(1,Math.round(e.maxHp*.3));e.hp=e.maxHp;return e;};
});
const res=[];
for(const id of ids){if(only&&!id.startsWith(only))continue;
  const r=await p.evaluate(id=>{const L=ZONES.flatMap(z=>z.levels).find(l=>l.id===id);for(const h of S.heroes){h.lvl=Math.max(h.lvl,L.elvl+2);calcStats(h);h.maxHp*=4;h.hp=h.maxHp;h.mp=h.maxMp;}
    window.__done=null;
    startLevel(L);startBattle();return L.battles.length;},id);
  let t=0,last='',stuck=0;
  while(t<240){await p.waitForTimeout(1000);t++;const s=await p.evaluate(()=>[window.__done,S.round,S.battleIdx,S.enemies.filter(e=>e.alive).length].join('|'));
    if(s.startsWith('WIN')||s.startsWith('LOSE'))break;if(s===last)stuck++;else stuck=0;last=s;if(stuck>40)break;}
  const fin=await p.evaluate(()=>window.__done+' round '+S.round+' b'+S.battleIdx);res.push(id+': '+fin+(t>=240||!/WIN|LOSE/.test(fin)?' ELAKADT? '+last:''));console.log(res[res.length-1]);
  await p.evaluate(()=>{hideOverlay&&hideOverlay();S.over=true;});await p.waitForTimeout(400);
}
console.log('hibák:',[...new Set(errs)].slice(0,30).join('\n')||'nincs');await b.close();})();
