const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const [type,sk]=[process.argv[2],process.argv[3]];const times=process.argv[4].split(',').map(Number);
await p.evaluate(([type,sk])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;if(type==='morcus'){e.phase=1;e.shield='fire';}if(type==='kamilla'){e.phase=2;const n=mkEnemy('nightmare',SLOTS[2][1][0],SLOTS[2][1][1],30);n.hp=n.maxHp=99999;S.enemies.push(n);}S.enemies.push(e);for(const h of S.heroes){h.hp=h.maxHp=99999;}
  if(sk!=='none')useEnemySkill(e,ESK[sk],S.heroes[0]);},[type,sk]);
let last=0;for(const t of times){await p.waitForTimeout(t-last);last=t;await p.screenshot({path:`hs/Z_${type}_${sk}_${t}.png`,clip:{x:0,y:60,width:560,height:380}});}
console.log('hibák:',errs.join('|')||'nincs');await b.close();})();
