const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>TEST['Próbaterem']());await p.waitForTimeout(2500);
const click=async re=>p.evaluate(s=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&new RegExp(s).test(b.textContent));if(b)b.click();return b?b.textContent.trim():null;},re);
console.log(await click('Jázmin'));await p.waitForTimeout(800);
console.log(await click('Sárkánynyíl'));await p.waitForTimeout(1700);
console.log(await p.evaluate(()=>document.body.innerText.match(/\S+: Sárkánynyíl!/)?.[0]));await p.screenshot({path:'parena.png'});
console.log('hibák:',errs.join('|')||'nincs');await b.close();})();
