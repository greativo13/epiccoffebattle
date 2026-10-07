const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();shopScreen();const tb=[...document.querySelectorAll(".ov-box button")].find(x=>x.innerText.trim()==="Tárgyak");if(tb)tb.click();const t=document.querySelector('.ov-box').innerText;return t.slice(0,3000);}));
await p.screenshot({path:'shop3.png'});await b.close();})();
