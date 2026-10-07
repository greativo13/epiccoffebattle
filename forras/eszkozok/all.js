const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;S.speed=4;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);e2.hp=e2.maxHp=99999;S.enemies.push(e2);});
const r=await p.evaluate(async()=>{const out=[];const all=S.roster||S.heroes;
  for(const h of all){if(!S.heroes.includes(h)){const o=S.heroes.find(x=>x.type!=='monk');arenaSwap(o,h);arenaPlace();}
    const ids=[...heroSkills(h).map(id=>({...SK[id],id})),LIMITS[h.type],ATTACKS[h.type]];
    for(const sk of ids){h.mp=h.maxMp;h.hp=h.maxHp;S.heroes.forEach(x=>{if(!x.alive){x.alive=true;x.hp=x.maxHp;x.alpha=1;}});S.enemies.forEach(e=>{e.alive=true;e.hp=e.maxHp;e.st={};e.alpha=1;});
      const al=S.enemies.filter(e=>e.alive);const tg=sk.tgt==='enemy'?[al[0]]:sk.tgt==='allies'?S.heroes.filter(x=>x.alive):sk.tgt==='self'?[h]:sk.tgt==='ally'?[h]:sk.tgt==='deadAlly'?[]:al;
      if(sk.tgt==='deadAlly')continue;
      try{await Promise.race([perform(h,{type:'skill',sk,targets:tg}),new Promise((_,rej)=>setTimeout(()=>rej(new Error('IDŐTÚLLÉPÉS')),20000))]);out.push('ok '+h.name+': '+sk.name);}catch(e){out.push('HIBA '+h.name+': '+sk.name+' – '+e.message);}}}
  return out;});
console.log(r.filter(x=>x.startsWith('HIBA')).join('\n')||'nincs hiba');console.log('futott:',r.length);console.log('oldalhibák:',errs.length?errs.join(' | '):'nincs');
await b.close();})();
