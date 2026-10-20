// használat: N=12 INT=120 node acap.js név "ellenfél1,ellenfél2" "JS-kód (u=első ellenfél, H=hősök, E=ellenfelek)" kimeneti_mappa
const {chromium}=require('playwright');(async()=>{const [nm,foes,code,out]=process.argv.slice(2);const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(4500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
await p.evaluate(([foes,code])=>{S.enemies.forEach(e=>e.alive=false);const L=foes.split(',').filter(Boolean);const sl=SLOTS[Math.max(1,Math.min(3,L.length))]||SLOTS[2];S.enemies=[];L.forEach((t,i)=>{const e=mkEnemy(t,sl[i][0],sl[i][1],30);e.hp=e.maxHp=99999;S.enemies.push(e);});
  for(const h of S.heroes){h.hp=h.maxHp=99999;h.alive=true;h.st={};}S.speed=.6;const u=S.enemies[0],H=S.heroes,E=S.enemies;setTimeout(()=>{try{(new Function('u','H','E',code))(u,H,E);}catch(err){console.error(err);}},100);},[foes,code]);
const fs=[];const N=+process.env.N||12;for(let i=0;i<N;i++){await p.waitForTimeout(+process.env.INT||150);const f=`${out}/A_${nm}_${i}.png`;await p.screenshot({path:f,clip:{x:0,y:0,width:848,height:480}});fs.push(f);}
require('child_process').execSync(`montage ${fs.join(' ')} -tile 4x -geometry 424x240+1+1 ${out}/a_${nm}.jpg`);console.log(nm,'hibák',errs.join('|')||'nincs');await b.close();})();
