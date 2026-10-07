// használat: node cap.js név setupfájl "t1,t2,..." [w,h]
const {chromium}=require('playwright');(async()=>{const [nm,setup,times,vp]=process.argv.slice(2);const [vw,vh]=(vp||'1280,720').split(',').map(Number);
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:vw,height:vh}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(require('fs').readFileSync(setup,'utf8'));const fs=[];let last=0;
for(const t of times.split(',').map(Number)){await p.waitForTimeout(t-last);last=t;const f=`hs/C_${nm}_${t}.png`;await p.screenshot({path:f});fs.push(f);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 3x -geometry 560x315+1+1 c_${nm}.jpg`);console.log('hibák',errs.join('|')||'nincs');await b.close();})();
