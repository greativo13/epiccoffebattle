const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:393,height:793},deviceScaleFactor:1,hasTouch:true,isMobile:true});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>window.scrollTo(0,700));await p.waitForTimeout(300);

await p.screenshot({path:process.argv[2]});console.log(await p.evaluate(()=>scrollY));await b.close();})();
