const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const [type,sk,n]=[process.argv[2],process.argv[3],+process.argv[4]||8];
console.log(await p.evaluate(([type,sk])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies.push(e);window.EE=e;for(const h of S.heroes){h.hp=h.maxHp=99999;h.alive=true;h.st={};addStatus(h,"barrier",2);}partyShield();window.SPD=S.speed;S.speed=.35;setTimeout(()=>useEnemySkill(e,ESK[sk],S.heroes[0]),700);return 'speed '+window.SPD;},[type,sk]));
const fs=[];for(let i=0;i<n;i++){await p.waitForTimeout(240);const f=`hs/T_${type}_${sk}_${i}.png`;await p.screenshot({path:f,clip:{x:0,y:40,width:640,height:420}});fs.push(f);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 4x -geometry 480x315+1+1 blk_${type}_${sk}.png`);await b.close();})();
