const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Minden pálya nyitva']();});
await p.evaluate(()=>{try{syncParty();}catch(e){}S.level=ZONES[3].levels[0];S.elvl=S.level.elvl;S.battleIdx=0;setScene(S.level.theme);startBattle();});
for(let i=0;i<40;i++){await p.waitForTimeout(400);const st=await p.evaluate(()=>{if(typeof talkSkip==='function'&&talkSkip)talkSkip();return S.pick&&S.pick.h?S.pick.h.name:null;});if(st)break;}
const before=await p.evaluate(()=>({h:S.heroes.map(h=>h.name).join(','),pick:S.pick&&S.pick.h.name,bench:document.querySelectorAll('.bench-card').length,btn:[...document.querySelectorAll('button')].map(b=>b.textContent).filter(t=>t.includes('💤')).join('|')}));
await p.screenshot({path:'bsw1.png'});
await p.click('.bench-card').catch(e=>console.log('nincs kártya'));await p.waitForTimeout(1200);
const after=await p.evaluate(()=>S.heroes.map(h=>h.name).join(','));
console.log(JSON.stringify(before),'->',after,'hibák:',errs.join('|')||'nincs');await b.close();})();
