const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium',args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2000);await p.mouse.click(10,10);await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>Object.entries(SAMPLE_BUF).map(([k,v])=>k+':'+v.length).join(' ')+' | play='+playSample('slash')));console.log('hibák',errs.slice(0,5).join('|')||'nincs');await b.close();})();
