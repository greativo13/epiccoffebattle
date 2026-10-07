const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>TEST['Próbaterem']());await p.waitForTimeout(2500);
const order=['wizard','witch','fairy','orc','monk'];const res=[];
for(const ty of order){
  const labels=await p.evaluate(ty=>{const r=S.roster||S.heroes;const h=r.find(x=>x.type===ty);if(!S.heroes.includes(h)){arenaSwap(S.heroes.find(x=>x.type!=='monk'&&x!==h),h);}arenaMenu(h);
    return [...document.querySelectorAll('button')].filter(b=>b.offsetParent&&/PÁROS/.test(b.textContent)).map(b=>b.textContent.trim());},ty);
  for(let i=0;i<labels.length;i++){
    await p.evaluate(([ty,i])=>{const h=(S.roster||S.heroes).find(x=>x.type===ty);arenaMenu(h);[...document.querySelectorAll('button')].filter(b=>b.offsetParent&&/PÁROS/.test(b.textContent))[i].click();},[ty,i]);
    await p.waitForTimeout(1600);if(ty==='monk'&&i===0)await p.screenshot({path:'parena.png'});
    await p.waitForFunction(()=>!S.busy&&document.querySelectorAll('button').length>5,{timeout:20000}).catch(()=>{});await p.waitForTimeout(800);}
  res.push(ty+': '+labels.join(' / '));}
console.log(res.join('\n'));console.log('hibák:',errs.join(' | ')||'nincs');await b.close();})();
