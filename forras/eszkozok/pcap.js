// használat: N=16 INT=300 node pcap.js név "proba-érték" kimeneti_mappa
const {chromium}=require('playwright');(async()=>{const [nm,q,out]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html?proba='+encodeURIComponent(q));
await p.waitForTimeout(+process.env.W0||7000);const fs=[];const N=+process.env.N||16;
for(let i=0;i<N;i++){const f=`${out}/P_${nm}_${i}.png`;await p.screenshot({path:f,clip:{x:0,y:0,width:848,height:480}});fs.push(f);await p.waitForTimeout(+process.env.INT||300);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 4x -geometry 424x240+1+1 ${out}/m_${nm}.jpg`);console.log(nm,'hibák',errs.join('|')||'nincs');await b.close();})();
