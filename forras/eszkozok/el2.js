const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>{const o=[];for(const id of ['3-1','3-4']){const L=ZONES.flatMap(z=>z.levels).find(l=>l.id===id);for(const t of new Set(L.battles.flat())){const e=mkEnemy(t,0,0,20);o.push(id+' '+t+' '+JSON.stringify(elemOf(e))+' imm:'+(e.d.statusImmune||[]).join(','));}}return o.join('\n');}));await b.close();})();
