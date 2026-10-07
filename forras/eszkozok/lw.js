const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>JSON.stringify({lw:LIMITS.wizard,sb:SK.sunburst,shrink:SK.shrink,EL:Object.keys(EL_LABEL),diff:typeof DIFF!=='undefined'?DIFF:null,sum:SUMMONS.map(s=>s.id+':'+s.req).join(' ')},(k,v)=>typeof v==='function'?'fn':v)));await b.close();})();
