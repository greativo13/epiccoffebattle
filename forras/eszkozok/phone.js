const {chromium,devices}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const [nm,vp] of [['por',{width:390,height:844}],['land',{width:844,height:390}]]){const p=await b.newPage({viewport:vp,deviceScaleFactor:2,isMobile:true,hasTouch:true});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4500);await p.screenshot({path:`ph_${nm}_title.png`});
await p.evaluate(()=>{S.test=true;const L=ZONES[0].levels[1];startLevel(L);});await p.waitForTimeout(3500);
await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Tovább|Kihagy/.test(b.textContent)){b.click();}});await p.waitForTimeout(2500);await p.screenshot({path:`ph_${nm}_battle.png`});
await p.evaluate(()=>shopScreen());await p.waitForTimeout(1200);await p.screenshot({path:`ph_${nm}_shop.png`});await p.close();}
await b.close();})();
