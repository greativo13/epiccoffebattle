// node zoom.js type skill n interval  -> nagyított képsor az ellenfél körül
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const [type,sk,n,iv]=[process.argv[2],process.argv[3],+process.argv[4]||12,+process.argv[5]||120];
const box=await p.evaluate(([type,sk])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies=[e];for(const h of S.heroes){h.hp=h.maxHp=99999;}S.speed=.5;
  const c=document.querySelector('canvas').getBoundingClientRect(),k=c.width/W;const hh=e.h*e.scale;const x0=cx(e)-hh*.9,y0=e.y-hh*1.2;setTimeout(()=>useEnemySkill(e,ESK[sk],S.heroes[0]),50);
  return {x:c.left+x0*k,y:c.top+y0*k,w:hh*1.8*k,h:hh*1.4*k};},[type,sk]);
const fs=[];for(let i=0;i<n;i++){await p.waitForTimeout(iv);const f=`hs/Z_${type}_${i}.png`;await p.screenshot({path:f,clip:{x:Math.max(0,box.x),y:Math.max(0,box.y),width:box.w,height:box.h}});fs.push(f);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 6x -geometry 260x200+1+1 z_${type}_${sk}.jpg`);await b.close();})();
