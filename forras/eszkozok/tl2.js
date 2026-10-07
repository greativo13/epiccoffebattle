const {chromium}=require('playwright');
(async()=>{const dir='/tmp/claude-0/-home-user-epiccoffebattle/b216fc92-96f7-51b7-b764-c788ff1bde6f/scratchpad/prof_tl';require('fs').rmSync(dir,{recursive:true,force:true});
for(const run of [1,2]){const ctxp=await chromium.launchPersistentContext(dir,{executablePath:'/opt/pw-browsers/chromium',viewport:{width:393,height:760},isMobile:true,hasTouch:true});const p=ctxp.pages()[0]||await ctxp.newPage();
const c=await ctxp.newCDPSession(p);await c.send('Network.enable');await c.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:1.5e6,uploadThroughput:5e5});
const t0=Date.now();p.goto('http://localhost:8765/index.html');
for(const t of [250,500,900,1500]){await p.waitForTimeout(Math.max(0,t-(Date.now()-t0)));await p.screenshot({path:`${dir}_${run}_${t}.png`});}
await p.waitForTimeout(800);await p.evaluate(()=>{S.test=true;newGame();}).catch(()=>{});
for(const t of [500,1500,3000,6000]){await p.waitForTimeout(t===500?500:t-(t===1500?500:t===3000?1500:3000));await p.screenshot({path:`${dir}_${run}_b${t}.png`});}
if(run===1)await p.waitForTimeout(15000);await ctxp.close();}
})();
