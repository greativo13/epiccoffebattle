const {chromium}=require('playwright');const D=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>{const e=S.enemies[0];const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);const e3=mkEnemy('slime',SLOTS[3][2][0],SLOTS[3][2][1],8);for(const x of [e2,e3]){x.hp=x.maxHp=99999;}S.enemies.push(e2,e3);});
await p.click('.card:nth-of-type(4)');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>[...document.querySelectorAll('#btns .cbtn .bl')].map(x=>x.textContent).slice(0,16).join(' | ')));
for(const [key,ms] of [['bamboovault',560],['staffspin',800],['staffwall',900]]){
  const r=p.evaluate(key=>{const h=S.heroes.find(x=>x.type==='monk');const sk={...SK[key],id:key};const al=S.enemies.filter(e=>e.alive);
    return perform(h,{type:'skill',sk,targets:sk.tgt==='enemy'?[al[0]]:sk.tgt==='allies'?S.heroes.filter(x=>x.alive):al}).then(()=>JSON.stringify({en:S.enemies.map(e=>e.maxHp-e.hp),st:h.st,hs:S.heroes.map(x=>Object.keys(x.st).join('+'))}));},key);
  await p.waitForTimeout(ms);await p.screenshot({path:D+'/m_'+key+'.png',clip:{x:0,y:0,width:1290,height:740}});console.log(key,await r);
  await p.evaluate(()=>{S.enemies.forEach(e=>{e.hp=e.maxHp;e.st={};});});}
await b.close();})();
