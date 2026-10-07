const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:375,height:667},hasTouch:true,isMobile:true});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>{[...document.querySelectorAll('#btns .cbtn')].find(b=>b.textContent.includes('Védekezés')).click();});await p.waitForTimeout(2500);
await p.evaluate(()=>{[...document.querySelectorAll('#btns .cbtn')].find(b=>b.textContent.includes('Kilépés')).click();});await p.waitForTimeout(2500);
console.log('map: btns minHeight=',await p.evaluate(()=>btnsEl.style.minHeight),'btns children',await p.evaluate(()=>btnsEl.children.length));
await p.screenshot({path:process.argv[2]+'/side1.png',fullPage:true});
// a „Ki pihenjen?” képernyő magas overlay-jel
await p.evaluate(()=>{if(typeof partyScreen==='function')partyScreen();});await p.waitForTimeout(800);
console.log('party overlay h',await p.evaluate(()=>JSON.stringify({stage:document.querySelector('.stage').getBoundingClientRect().height,vh:innerHeight,pos:getComputedStyle(document.querySelector('.stage')).position})));
await p.evaluate(()=>window.scrollTo(0,400));await p.waitForTimeout(300);await p.screenshot({path:process.argv[2]+'/side2.png'});
await b.close();})();
