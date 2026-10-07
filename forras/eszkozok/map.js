const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1381,height:760}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;S.save.cleared=ZONES.slice(0,3).flatMap(z=>z.levels.map(L=>L.id)).filter(id=>id!=='X-1');S.save.seen=(S.save.seen||[]).concat(ZONES.map(z=>z.id));S.mapZone=2;mapScreen(2);});await p.waitForTimeout(1200);
console.log(await p.evaluate(()=>[...document.querySelectorAll('.map-secret')].map(x=>x.textContent)));
await p.screenshot({path:process.argv[2]});await b.close();})();
