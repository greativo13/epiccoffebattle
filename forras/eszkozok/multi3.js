const {chromium}=require('playwright');const D=process.argv[2],who=process.argv[3],id=process.argv[4];const times=process.argv[5].split(',').map(Number);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:3});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);e2.hp=e2.maxHp=99999;S.enemies.push(e2);});
await p.evaluate(w=>{const h=(S.roster||S.heroes).find(x=>x.type===w);if(!S.heroes.includes(h)){arenaSwap(S.heroes.find(x=>x.type==='monk'),h);arenaPlace();}},who);
p.evaluate(([w,id])=>{const h=S.heroes.find(x=>x.type===w);h.mp=h.maxMp;const sk=id==='LIMIT'?LIMITS[w]:{...SK[id],id};const al=S.enemies.filter(e=>e.alive);
  return perform(h,{type:'skill',sk,targets:sk.tgt==='enemy'?[al[0]]:sk.tgt==='self'?[h]:sk.tgt==='allies'?S.heroes.filter(x=>x.alive):al});},[who,id]);
let last=0;for(const t of times){await p.waitForTimeout(t-last);last=t;await p.screenshot({path:`${D}/x_${id}_${t}.png`,clip:{x:100,y:200,width:160,height:120}});}
await b.close();})();
