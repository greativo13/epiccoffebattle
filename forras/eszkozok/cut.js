const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
for(const w of ['monk','fairy']){await p.evaluate(w=>{const h=(S.roster||S.heroes).find(x=>x.type===w)||S.heroes[0];S.cutin={h,name:'TEST',age:.6,life:2};S.cutin.age=0.6;},w);
 await p.evaluate(()=>{S.cutin.life=99;});await p.waitForTimeout(300);await p.screenshot({path:'cut_'+w+'.png',clip:{x:0,y:0,width:860,height:484}});}
await b.close();})();
