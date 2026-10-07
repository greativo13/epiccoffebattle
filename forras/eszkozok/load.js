const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const c=await b.newContext();const p=await c.newPage();
const cdp=await c.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:60,downloadThroughput:1.5e6,uploadThroughput:5e5});
let bytes=0,n=0,big=[];p.on('response',async r=>{try{const l=+(r.headers()['content-length']||0);bytes+=l;n++;if(l>150000)big.push((l/1e6).toFixed(2)+'MB '+r.url().split('/').pop().slice(0,40));}catch(e){}});
const t0=Date.now();await p.goto('http://localhost:8765/index.html',{waitUntil:'domcontentloaded'});const t1=Date.now();
await p.waitForFunction(()=>document.querySelector('.ov-btn'),null,{timeout:60000});const t2=Date.now();
// főszál-blokkolás mérése: hosszú feladatok
const lt=await p.evaluate(()=>new Promise(res=>{let worst=0,last=performance.now(),tot=0;const f=()=>{const now=performance.now(),d=now-last;if(d>50)tot+=d;worst=Math.max(worst,d);last=now;if(now<20000)requestAnimationFrame(f);else res({worst,tot});};requestAnimationFrame(f);}));
console.log('DOM',t1-t0,'ms; gombok',t2-t0,'ms; letöltés',(bytes/1e6).toFixed(1),'MB',n,'fájl; legrosszabb képkocka',Math.round(lt.worst),'ms, akadás összesen',Math.round(lt.tot),'ms');console.log(big.join('\n'));await b.close();})();
