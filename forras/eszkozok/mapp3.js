const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:430,height:932},isMobile:true,hasTouch:true,deviceScaleFactor:1});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;newGame&&0;S.save.cleared=ZONES.slice(0,5).flatMap(z=>z.levels.map(l=>l.id)).concat(['6-1','6-2']);S.save.seen=ZONES.map(z=>z.id);const n=ngp();n.bench='orc';ngpSet(n);S.joinMsg=[];mapScreen(4);});await p.waitForTimeout(800);for(const tx of ['Irány a második rész!','Tovább a térképre','Tovább']){const bt=await p.$('text='+tx);if(bt){await bt.click();await p.waitForTimeout(900);}}await p.waitForTimeout(1200);await p.screenshot({path:process.argv[2]});
console.log(await p.evaluate(()=>{const r=e=>{const q=document.querySelector(e);if(!q)return null;const b=q.getBoundingClientRect();return [Math.round(b.top),Math.round(b.height)];};return JSON.stringify({stage:r('.stage'),hud:r('.hud'),cmd:r('.cmd'),map:r('.map-wrap')||r('.map'),ov:r('#ov')});}));
await b.close();})();
