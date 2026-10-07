const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2500);
await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:1290,height:740}});
console.log(await p.evaluate(()=>JSON.stringify({eff:effects.length,src:effects.map(e=>String(e.draw).slice(0,80))})));
await b.close();})();
