const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:400,height:1400}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('file://'+process.argv[2]);await p.waitForTimeout(800);
await p.evaluate(()=>document.querySelector('#z2').scrollIntoView());await p.screenshot({path:process.argv[3]});console.log('hibák:',errs.join('|')||'nincs',await p.evaluate(()=>document.querySelectorAll('.card').length),'lap');await b.close();})();
