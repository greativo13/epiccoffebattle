const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:430,height:932},isMobile:true,hasTouch:true,deviceScaleFactor:1});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;newGame&&0;mapScreen(0);});await p.waitForTimeout(800);const bt=await p.$('text=Tovább a térképre');if(bt)await bt.click();await p.waitForTimeout(1200);await p.screenshot({path:process.argv[2]});
console.log(await p.evaluate(()=>{const r=e=>{const q=document.querySelector(e);if(!q)return null;const b=q.getBoundingClientRect();return [Math.round(b.top),Math.round(b.height)];};return JSON.stringify({stage:r('.stage'),hud:r('.hud'),cmd:r('.cmd'),map:r('.map-wrap')||r('.map'),ov:r('#ov')});}));
await b.close();})();
