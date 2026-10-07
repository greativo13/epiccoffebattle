const {chromium}=require('playwright');const S_=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CERR',m.text());});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
const st=()=>p.evaluate(()=>JSON.stringify({prompt:document.getElementById('prompt').textContent,heroes:S.heroes.map(h=>h.name),active:S.pick&&S.pick.h.name,sh:document.documentElement.scrollHeight}));
console.log('start',await st());
await p.click('.card:nth-of-type(3)');await p.waitForTimeout(600);console.log('lili card',await st());
await p.click('.bench-card');await p.waitForTimeout(400);console.log('bench',await st());
await p.screenshot({path:S_+'/f1.png'});
await p.click('.card:nth-of-type(2)');await p.waitForTimeout(800);console.log('swapped',await st());
console.log(await p.evaluate(()=>[...document.querySelectorAll('#btns .cbtn .bl')].map(x=>x.textContent).join(' | ')));
for(const id of ['wandbonk','shrinkRay','sleepStars']){
  const r=p.evaluate(id=>{const h=S.heroes.find(x=>x.type==='fairy');const key={wandbonk:'wandbonk',shrinkRay:'shrink',sleepStars:'sleepdust'}[id];return perform(h,{type:'skill',sk:{...SK[key],id:key},targets:id==='sleepStars'?S.enemies.filter(e=>e.alive):[S.enemies[0]]}).then(()=>JSON.stringify(S.enemies.map(e=>e.st)));},id);
  await p.waitForTimeout(id==='wandbonk'?560:900);await p.screenshot({path:S_+'/s_'+id+'.png'});console.log(id,await r);}
await p.waitForTimeout(800);await p.screenshot({path:S_+'/s_after.png'});
await b.close();})();
