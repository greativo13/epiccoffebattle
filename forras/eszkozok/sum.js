const {chromium}=require('playwright');const out=process.argv[2],ids=process.argv[3].split(',');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
for(const id of ids){const r=p.evaluate(id=>{const h=S.heroes[0];const def=SUMMONS.find(d=>d.id===id);return perform(h,{type:'summon',def});},id);
  await p.waitForTimeout(1100);await p.screenshot({path:`${out}_${id}.png`,clip:{x:0,y:0,width:860,height:484}});await r;}
await b.close();})();
