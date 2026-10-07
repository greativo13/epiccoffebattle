const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>Object.entries(STATUS).map(([k,v])=>k+':'+v[0]).join(' | ')+'\n--\n'+Object.entries(SK).filter(([k,s])=>s.buff||s.status).map(([k,s])=>k+' '+s.name+' '+JSON.stringify(s.buff||s.status)).join('\n')));await b.close();})();
