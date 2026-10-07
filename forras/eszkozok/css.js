const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:430,height:932}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;shopScreen('wizard');});await p.waitForTimeout(800);
console.log(await p.evaluate(()=>{const z=document.querySelector('.shop .zones'),c=getComputedStyle(z),pc=getComputedStyle(z.parentElement);return JSON.stringify({d:c.display,h:c.height,ov:c.overflow,maxh:c.maxHeight,fl:c.flex,parent:pc.display+' '+pc.gridTemplateRows+' '+pc.flexDirection,kids:z.children.length,kid0:z.children[0]&&getComputedStyle(z.children[0]).height});}));await b.close();})();
