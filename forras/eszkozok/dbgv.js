const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(()=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy('vase',SLOTS[1][0][0],SLOTS[1][0][1],30);S.enemies.push(e);window.EE=e;useEnemySkill(e,ESK.vaseguard,S.heroes[0]);});
await p.waitForTimeout(1500);console.log(await p.evaluate(()=>JSON.stringify({vw:EE._vwall,st:EE.st,anim:ESK.vaseguard})));await b.close();})();
