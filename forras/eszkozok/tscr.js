const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:393,height:760},isMobile:true,hasTouch:true});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);await p.screenshot({path:'title-new.png'});await b.close();})();
