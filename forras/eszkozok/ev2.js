const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4000);
const code=require('fs').readFileSync(process.argv[2],'utf8');console.log(JSON.stringify(await p.evaluate(code),null,0));console.log('err',errs.join('|'));await b.close();})();
