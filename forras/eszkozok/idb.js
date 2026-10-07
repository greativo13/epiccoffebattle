const {chromium}=require('playwright');
(async()=>{const c=await chromium.launchPersistentContext(process.argv[2]+'/prof2',{executablePath:'/opt/pw-browsers/chromium'});const p=c.pages()[0];
p.on('console',m=>console.log('C',m.text()));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(25000);
console.log(await p.evaluate(()=>new Promise(r=>{const out={db:!!SPR_CACHE.db};try{const t=SPR_CACHE.db.transaction('s').objectStore('s').count();t.onsuccess=()=>{out.n=t.result;r(JSON.stringify(out));};t.onerror=()=>r('err');}catch(e){r('ex '+e.message+JSON.stringify(out));}})));
console.log(await p.evaluate(()=>{const c=document.createElement('canvas');c.width=c.height=5;return typeof c.toBlob;}));await c.close();})();
