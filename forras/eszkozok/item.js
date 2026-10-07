const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
for(const id of ['knife','firebomb']){const r=await p.evaluate(async id=>{S.inv[id]=3;const h=S.heroes[0],al=S.enemies.filter(e=>e.alive),hp0=al.map(e=>e.hp);const it={...ITEMS[id],id,item:true};
  await perform(h,{type:'skill',sk:it,targets:it.tgt==='enemy'?[al[0]]:al});return id+': '+al.map((e,i)=>hp0[i]-e.hp).join(',')+' inv '+S.inv[id];},id);console.log(r);}
console.log('hibák:',errs.join('|')||'nincs');await b.close();})();
