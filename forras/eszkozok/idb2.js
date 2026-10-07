const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(1000);
console.log(await p.evaluate(()=>{const im=new Image();return JSON.stringify({w:String(cutWhite).slice(0,80),q:String(fxQuad).slice(0,60),d:String(dropEdgeBits).slice(0,60),tag:im.tagName});}));await b.close();})();
