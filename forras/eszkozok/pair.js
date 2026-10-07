const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;S.diff=0;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(()=>{S.enemies.forEach(e=>e.alive=false);for(const [t,i] of [['slime',0],['rose',1]]){const e=mkEnemy(t,SLOTS[2][i][0],SLOTS[2][i][1],10);e.hp=e.maxHp=99999;S.enemies.push(e);}
 const h=S.heroes.find(x=>x.type==='wizard'),m=S.heroes.find(x=>x.type==='witch');h.limit=m.limit=60;S.speed=.6;const pr=r14Pair(h);
 perform(h,{type:'skill',sk:{id:'pair',name:pr.p.name,tgt:'enemies',kind:'mag',pow:1,elem:pr.p.elem,anim:'pairAtk',pair:pr.p,partner:pr.o},targets:S.enemies.filter(e=>e.alive)});});
const fs=[];for(let i=0;i<8;i++){await p.waitForTimeout(450);const f=`hs/P_${i}.png`;await p.screenshot({path:f,clip:{x:0,y:0,width:640,height:365}});fs.push(f);}
await p.evaluate(()=>{const e=S.enemies.find(x=>x.alive);hit(S.heroes[0],e,{name:'x',kind:'mag',pow:1,elem:'fire',tgt:'enemy'});const k=mkEnemy('rustking',SLOTS[1][0][0],SLOTS[1][0][1],15);S.enemies.forEach(x=>x.alive=false);S.enemies.push(k);k.hp=k.maxHp*.4;S.speed=.6;enemyAct(k);});
for(let i=0;i<4;i++){await p.waitForTimeout(450);const f=`hs/P_e${i}.png`;await p.screenshot({path:f,clip:{x:0,y:0,width:640,height:365}});fs.push(f);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 4x -geometry 400x228+1+1 pair.jpg`);console.log(errs.join('|')||'ok');await b.close();})();
