const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate((w)=>{const ids=[...HERO_DEF[w].skills,...SHOP_SKILLS[w].map(x=>x[0])];return ids.map(id=>{const s=SK[id];return id+' | '+s.name+' | '+s.tgt+' | '+s.kind+' | '+(s.elem||'')+' | '+s.anim+' | mp'+s.mp+' pow'+s.pow;}).join('\n');},process.argv[2]));await b.close();})();
