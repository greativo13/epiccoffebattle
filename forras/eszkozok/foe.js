const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const all=await p.evaluate(()=>foesByZone().map(([z,l])=>[z.name,l.map(t=>[t,foeSkillIds(t)])]));
let n=0,bad=[];for(const [zn,list] of all)for(const [t,ids] of list){if(!ids.length)bad.push(t+'(nincs támadás)');for(const id of ids){const r=await p.evaluate(async([t,id])=>{try{arenaSpawnFoe(t);const e=S.enemies[0];S.speed=4;await Promise.race([useEnemySkill(e,ESK[id],S.heroes[0]),new Promise(r=>setTimeout(r,8000))]);S.heroes.forEach(h=>{h.alive=true;h.hp=h.maxHp;h.alpha=1;});return 'ok';}catch(err){return err.message;}},[t,id]);n++;if(r!=='ok')bad.push(t+'/'+id+': '+r);}}
console.log('fejezetek',all.length,'ellenfél',all.reduce((a,z)=>a+z[1].length,0),'támadás',n);console.log('hibák:',bad.join(' | ')||'nincs',errs.slice(0,3).join('|'));
// képernyőkép: menü
await p.evaluate(()=>{arenaSpawnFoe('morcus');arenaFoeSkills(S.heroes[0],'morcus',3);});await p.waitForTimeout(800);await p.screenshot({path:'foe.png'});await b.close();})();
