const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>TEST['Próbaterem']());await p.waitForTimeout(2500);
const click=async re=>p.evaluate(s=>{const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent&&new RegExp(s).test(b.textContent));if(b)b.click();return b?b.textContent.trim():null;},re);
for(const [hero,pair] of [['Lili','Tündérököl']]){
 await p.evaluate(h=>{const x=(S.roster||S.heroes).find(q=>q.name===h);arenaMenu(x);},hero);await p.waitForTimeout(400);
 console.log(await click('PÁROS: '+pair));const fs=[];
 for(let i=0;i<10;i++){await p.waitForTimeout(650);const f=`hs/P_${pair}_${i}.png`;await p.screenshot({path:f,clip:{x:14,y:10,width:836,height:470}});fs.push(f);}
 require('child_process').execSync(`montage ${fs.join(' ')} -tile 5x -geometry 418x235+1+1 "pa_${pair}.jpg"`);
 await p.waitForFunction(()=>document.querySelectorAll('button').length>5,{timeout:15000}).catch(()=>{});await p.waitForTimeout(800);}
console.log('hibák:',errs.join(' | ')||'nincs');await b.close();})();
