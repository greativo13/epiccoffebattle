const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const types=await p.evaluate(()=>Object.keys(ESK).filter(k=>['phys','mag'].includes(ESK[k].kind)&&ESK[k].tgt!=='self'));
const res=[];
for(const k of types){const r=await p.evaluate(async k=>{S.enemies.forEach(e=>e.alive=false);let owner=Object.keys(EN_DEF).find(t=>(EN_DEF[t].skills||[]).some(s=>s[0]===k))||'slime';
  const e=mkEnemy(owner,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies=[e];for(const h of S.heroes){h.hp=h.maxHp=99999;h.alive=true;h.st={};addStatus(h,'barrier',2);}
  const hp0=e.hp;try{await Promise.race([useEnemySkill(e,ESK[k],S.heroes[0]),wait(6000)]);}catch(err){return k+' ERR '+err.message;}await wait(1500);
  const left=S.heroes.filter(h=>h.st.barrier).length,dmgH=S.heroes.filter(h=>h.hp<h.maxHp).length;return [k,owner,'kind='+ESK[k].kind,'enemyHPloss='+(hp0-e.hp),'barrierLeft='+left,'heroesHurt='+dmgH].join(' ');},k);
  res.push(r);}
console.log(res.filter(x=>/enemyHPloss=0 |heroesHurt=[1-9]|ERR/.test(x)).join('\n'));console.log('összes',res.length,'hibák',errs.slice(0,5).join('|'));await b.close();})();
