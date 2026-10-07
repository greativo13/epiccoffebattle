const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:844,height:390},deviceScaleFactor:2});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4000);await p.evaluate(()=>{S.test=true;S.save.seen=[];for(const z of ZONES)S.save.seen.push('ch'+ZONES.indexOf(z));S.save.cleared=['1-1','1-2','1-3','1-4','2-1','2-2'];mapScreen(0);});await p.waitForTimeout(800);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/térképre/.test(x.textContent));if(b)b.click();});await p.waitForTimeout(1500);
await p.screenshot({path:'map1.png'});await b.close();})();
