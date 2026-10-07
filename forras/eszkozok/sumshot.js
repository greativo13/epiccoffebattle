const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const id=process.argv[2],times=process.argv[3].split(',').map(Number);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[2][1][0],SLOTS[2][1][1],8);e2.hp=e2.maxHp=99999;S.enemies.push(e2);S.enemies.forEach(e=>{e.hp=e.maxHp=99999;});});
p.evaluate(id=>perform(S.heroes[0],{type:'summon',def:SUMMONS.find(x=>x.id===id)}),id);
let last=0;for(const t of times){await p.waitForTimeout(t-last);last=t;await p.screenshot({path:`hs/s_${id}_${t}.png`,clip:{x:0,y:0,width:860,height:484}});}
console.log(id,'hibák:',errs.join('|')||'nincs');await b.close();})();
