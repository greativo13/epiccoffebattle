const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>Object.entries(EN_DEF).map(([k,d])=>k+' | '+d.name+' | '+JSON.stringify(d.elem||{})+' | imm:'+(d.statusImmune||[]).join(',')).join('\n')));await b.close();})();
