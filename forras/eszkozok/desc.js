const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>['voodoo','pandemic','darkpact','bouncearrow','dust','crush','whirl'].map(k=>k+' | '+SK[k]?.name+' | '+SK[k]?.elem+' | '+JSON.stringify(SK[k]?.status)+' | '+SK[k]?.desc).join('\n')));await b.close();})();
