const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(process.argv[2]));console.log('ERR',errs.join('|'));await b.close();})();
