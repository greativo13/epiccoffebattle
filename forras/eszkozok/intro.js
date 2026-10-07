const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
p.evaluate(()=>{S.test=true;newGame();});await p.waitForTimeout(1500);
for(let i=0;i<7;i++){await p.evaluate(()=>talkSkip&&talkSkip());await p.waitForTimeout(150);}
await p.waitForTimeout(1500);await p.screenshot({path:process.argv[2]});console.log('hibák:',errs.join('|')||'nincs');await b.close();})();
