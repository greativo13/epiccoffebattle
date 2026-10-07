const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const [type,sk]=[process.argv[2],process.argv[3]];
await p.evaluate(([type,sk])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies.push(e);window.EE=e;for(const h of S.heroes){h.hp=h.maxHp=99999;}useEnemySkill(e,ESK[sk],S.heroes[0]);},[type,sk]);
for(let i=0;i<10;i++){await p.waitForTimeout(100);console.log(await p.evaluate(()=>JSON.stringify({spin:EE.spin,pose:EE.pose,L:EE._limb&&EE._limb.t,ox:Math.round(EE.ox)})));}
console.log(errs.join('|'));await b.close();})();
