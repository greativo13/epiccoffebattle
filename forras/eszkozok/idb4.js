const {chromium}=require('playwright');
(async()=>{const c=await chromium.launchPersistentContext(process.argv[2]+'/prof',{executablePath:'/opt/pw-browsers/chromium'});const p=c.pages()[0];
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
console.log(await p.evaluate(()=>new Promise(r=>{const t=SPR_CACHE.db.transaction('s').objectStore('s');const n=t.count();n.onsuccess=()=>{const g=t.getAll(null,3);g.onsuccess=async()=>{let e='';try{await createImageBitmap(g.result[0]);}catch(x){e=String(x);}r(JSON.stringify({n:n.result,map:SPR_CACHE.map.size,type:g.result[0]&&g.result[0].constructor.name,size:g.result[0]&&g.result[0].size,e}));};};})));await c.close();})();
