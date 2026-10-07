const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.click('.bench-card');await p.waitForTimeout(300);
await p.click('#btns .cbtn:has-text("Kilépés")');await p.waitForTimeout(1500);
console.log('after exit',await p.evaluate(()=>JSON.stringify({arena:S.arena,heroes:S.heroes.map(h=>h.name),bench:document.querySelectorAll('.bench-card').length,cls:document.getElementById('party').className})));
await p.evaluate(()=>{S.save.seen=(S.save.seen||[]).concat(ZONES.map(z=>z.id));startLevel(ZONES[0].levels[0]);});
for(let i=0;i<12;i++){await p.waitForTimeout(1000);const b2=await p.$('#btns .cbtn');const ov=await p.$('#ov .ov-btn');if(ov&&await ov.isVisible()){await ov.click();continue;}if(b2){await b2.click();await p.waitForTimeout(300);const e=await p.evaluate(()=>S.targeting&&S.targeting.cands[0]&&(choose(S.targeting.cands[0]),1));}}
console.log('battle',await p.evaluate(()=>JSON.stringify({prompt:document.getElementById('prompt').textContent,round:S.round,en:S.enemies.map(e=>e.hp)})));
await b.close();})();
