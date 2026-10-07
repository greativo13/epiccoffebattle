const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
for(const [li,bi,out] of [[2,1,'lv13.png'],[0,0,'lv11.png']]){p.evaluate(([li,bi])=>{S.test=true;S.heroes=['wizard','witch','fairy','orc'].map(mkHero);S.level=ZONES[0].levels[li];S.battleIdx=bi;S.save=S.save||{cleared:[],seen:[]};startBattle();},[li,bi]);
await p.waitForTimeout(1800);for(let i=0;i<6;i++){await p.evaluate(()=>talkSkip&&talkSkip());await p.waitForTimeout(100);}await p.waitForTimeout(600);await p.screenshot({path:out,clip:{x:0,y:0,width:860,height:484}});}
p.evaluate(()=>cutIn(S.heroes[0],'Meteorzápor'));await p.waitForTimeout(500);await p.screenshot({path:'cut.png',clip:{x:0,y:0,width:860,height:484}});
console.log('hibák:',errs.join('|')||'nincs');await b.close();})();
