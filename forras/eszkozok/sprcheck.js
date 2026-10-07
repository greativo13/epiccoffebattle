const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();const bad=[];
p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url());});p.on('pageerror',e=>bad.push('ERR '+e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4000);
console.log(await p.evaluate(()=>JSON.stringify({spr:Object.keys(ENEMY_SPR).length,fx:Object.keys(FX_IMG).length,team:!!(TEAM_IMG&&TEAM_IMG.im),team5:!!TEAM5_IMG.im})));
console.log(bad.join('\n')||'nincs hibás letöltés');await b.close();})();
