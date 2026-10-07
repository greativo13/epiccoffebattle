const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:430,height:932},isMobile:true,hasTouch:true});
const errs=[];p.on('pageerror',e=>errs.push(e.message+' '+(e.stack||'').split('\n')[1]));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text());});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;localStorage.clear();});await p.click('text=Új játék');await p.waitForTimeout(1500);
await p.evaluate(()=>{S.test=true;});for(let i=0;i<20;i++){await p.evaluate(()=>talkSkip&&talkSkip());await p.waitForTimeout(150);}
await p.waitForTimeout(800);console.log('ov:',await p.evaluate(()=>ov.innerText.slice(0,120)));
await p.evaluate(()=>{if(!ov.querySelector('.map-levels'))mapScreen(0);});await p.waitForTimeout(800);
const bt=await p.$('text=Minden pálya nyitva');console.log('gomb:',!!bt);if(bt){await bt.click();await p.waitForTimeout(1500);}
console.log(await p.evaluate(()=>JSON.stringify({cleared:S.save.cleared.length,nodes:[...document.querySelectorAll('.mnode')].map(n=>(n.disabled?'x':'o')).join(''),txt:ov.innerText.slice(0,150)})));
await p.screenshot({path:'open.png'});console.log('hibák:',errs.join(' | ')||'nincs');await b.close();})();
