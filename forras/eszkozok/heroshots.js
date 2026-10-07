const {chromium}=require('playwright');const D=process.argv[2],who=process.argv[3],T=+(process.argv[4]||900);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/game.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);e2.hp=e2.maxHp=99999;S.enemies.push(e2);});
await p.evaluate(w=>{const h=(S.roster||S.heroes).find(x=>x.type===w);if(!S.heroes.includes(h)){arenaSwap(S.heroes.find(x=>x.type==='monk'),h);arenaPlace();}},who);
const list=await p.evaluate(w=>{const h=S.heroes.find(x=>x.type===w);return [...heroSkills(h),'LIMIT'];},who);
for(const id of list){const r=p.evaluate(([w,id])=>{const h=S.heroes.find(x=>x.type===w);h.mp=h.maxMp;h.hp=h.maxHp;S.heroes.forEach(x=>{x.alive=true;x.alpha=1;if(x.hp<=0)x.hp=x.maxHp;});S.enemies.forEach(e=>{e.alive=true;e.hp=e.maxHp;e.st={};e.alpha=1;});
    const sk=id==='LIMIT'?LIMITS[w]:{...SK[id],id};if(sk.tgt==='deadAlly')return Promise.resolve();const al=S.enemies.filter(e=>e.alive);
    return perform(h,{type:'skill',sk,targets:sk.tgt==='enemy'?[al[0]]:sk.tgt==='allies'?S.heroes:sk.tgt==='self'||sk.tgt==='ally'?[h]:al});},[who,id]);
  await p.waitForTimeout(id==='LIMIT'?T*2.5:T);await p.screenshot({path:`${D}/${who}_${id}.png`});await r;}
console.log(list.join(','));await b.close();})();
