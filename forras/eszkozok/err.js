const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
p.on('pageerror',e=>console.log('HIBA:',e.message,(e.stack||'').split('\n')[1]));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);await b.close();})();
