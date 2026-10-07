const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.addInitScript(()=>{window.__n={cw:0,save:0,blob:0,err:''};});
await p.goto('http://localhost:8765/index.html');
await p.evaluate(()=>{const cw=cutWhite;cutWhite=function(a,b){window.__n.cw++;return cw(a,b);};const sv=sprSave;sprSave=function(k,c){window.__n.save++;return sv(k,c);};});
await p.waitForTimeout(8000);console.log(await p.evaluate(()=>JSON.stringify(window.__n)));
console.log(await p.evaluate(()=>new Promise(r=>{const c=document.createElement('canvas');c.width=c.height=4;c.toBlob(bb=>{try{const tx=SPR_CACHE.db.transaction('s','readwrite');tx.objectStore('s').put(bb,'test');tx.oncomplete=()=>r('ok');tx.onerror=()=>r('err '+tx.error);}catch(e){r('ex '+e);}});})));await b.close();})();
