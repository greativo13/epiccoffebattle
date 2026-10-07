const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4500);
await p.evaluate(()=>{S.test=true;for(let i=0;i<8;i++)S.save.seen.push('ch'+i);S.save.cleared=['1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','3-1','3-2'];mapScreen(0);});await p.waitForTimeout(1500);
await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/térképre/.test(x.textContent));if(b)b.click();});await p.waitForTimeout(1200);await p.screenshot({path:'x_map.png'});
await p.evaluate(()=>{const L=ZONES.flatMap(z=>z.levels).find(l=>l.id==='3-4');S.battleIdx=0;startLevel(L);});await p.waitForTimeout(4000);
await p.evaluate(()=>{const c=document.querySelectorAll('.ov-btn,button');for(const b of c)if(/Tovább|Kezd|Harc/.test(b.textContent)){b.click();break;}});await p.waitForTimeout(3000);await p.screenshot({path:'x_esp.png'});
await p.evaluate(()=>{S.comboParty=S.heroes;cutIn(S.heroes[0],COMBO.name);});await p.waitForTimeout(500);await p.screenshot({path:'x_combo.png'});
await b.close();})();
