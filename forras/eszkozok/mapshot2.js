const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [vw,vh,nm] of [[390,844,'P'],[844,390,'L']]){const p=await b.newPage({viewport:{width:vw,height:vh},deviceScaleFactor:2});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4000);
for(const m of [0,1]){await p.evaluate(m=>{S.test=true;try{const n=ngp();n.bench="monk";ngpSet(n);}catch(e){}S.save.seen=[];for(const z of ZONES)S.save.seen.push('ch'+ZONES.indexOf(z));S.save.cleared=['1-1','1-2','1-3','1-4','2-1','2-2','2-3','2-4','3-1','3-2','3-3','3-4','4-1','4-2','4-3','4-4','5-1','5-2'];mapScreen(m);},m);await p.waitForTimeout(800);
for(let q=0;q<5;q++){await p.evaluate(()=>{const b=[...document.querySelectorAll("button")].find(x=>/térképre|Tovább|Rendben/.test(x.textContent));if(b)b.click();});await p.waitForTimeout(900);}
await p.screenshot({path:`map_${nm}${m}.png`});}await p.close();}await b.close();})();
