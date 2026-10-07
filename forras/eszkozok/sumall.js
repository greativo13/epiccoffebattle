const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{S.test=true;S.speed=4;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const r=await p.evaluate(async()=>{const out=[];for(const d of SUMMONS){S.enemies.forEach(e=>{e.alive=true;e.hp=e.maxHp;e.st={};e.alpha=1;});
  try{await perform(S.heroes[0],{type:'summon',def:d});out.push('ok '+d.name);}catch(e){out.push('HIBA '+d.name+' '+e.message);}}return out;});
console.log(r.length,'idézés,',r.filter(x=>x.startsWith('HIBA')).join(';')||'nincs hiba','| oldalhibák:',errs.join(' | ')||'nincs');await b.close();})();
