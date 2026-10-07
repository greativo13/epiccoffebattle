const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:393,height:793},deviceScaleFactor:2,hasTouch:true,isMobile:true});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
if(process.argv[3])await p.evaluate(process.argv[3]);await p.waitForTimeout(800);
await p.screenshot({path:process.argv[2]});
console.log(await p.evaluate(()=>{const o=document.getElementById('ov'),st=document.querySelector('.stage'),bx=o.querySelector('.ov-box')||o.firstElementChild;const r=x=>x&&JSON.stringify(x.getBoundingClientRect());return [r(st),r(o),r(bx),getComputedStyle(o).position, o.scrollHeight].join('\n');}));
await b.close();})();
