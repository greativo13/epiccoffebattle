const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:393,height:760},isMobile:true,hasTouch:true});
const c=await p.context().newCDPSession(p);await c.send('Network.enable');await c.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:1.5e6,uploadThroughput:5e5});
const t0=Date.now();p.goto('http://localhost:8765/index.html');
for(const t of (process.argv[2]||'1000,2500,4000,6000,9000').split(',').map(Number)){await p.waitForTimeout(Math.max(0,t-(Date.now()-t0)));await p.screenshot({path:`${process.argv[3]||'hs'}/tl_${t}.png`});
 console.log(t,await p.evaluate(()=>typeof BG_IMG==='object'?JSON.stringify({title:!!BG_IMG.title,hs:Object.keys(HERO_SPR||{}).length}):'-').catch(()=>'x'));}
await b.close();})();
