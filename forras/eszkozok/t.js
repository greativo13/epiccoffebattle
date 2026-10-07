const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(()=>chromium.launch());const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>typeof TEAM5_IMG!=='undefined'&&TEAM5_IMG.im?TEAM5_IMG.im.naturalWidth+'x'+TEAM5_IMG.im.naturalHeight:'nincs'));await b.close();})();
