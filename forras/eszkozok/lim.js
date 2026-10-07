const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>Object.entries(LIMITS).map(([k,l])=>k+' | '+l.name+' | '+l.anim+' | '+l.desc).join('\n')+'\n--\n'+['darkpact','hex','dreadnight','shadowclaw','glacier','thunderstorm','tsunami','mantraarrow','arrowrain'].map(id=>id+' | '+SK[id].desc+' | hpPct'+SK[id].hpPct).join('\n')));await b.close();})();
