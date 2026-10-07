const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const [type,key,js]=[process.argv[2],process.argv[3],process.argv[4]];
const r=await p.evaluate(([type,key,js])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies.push(e);window.EE=e;const T=limbOn(e,key);eval(js);return JSON.stringify({T,wrapped:!!DRAW[type].__limb,C:!!limbCanv(key)});},[type,key,js]);
await p.waitForTimeout(400);await p.screenshot({path:'lt.png',clip:{x:300,y:60,width:560,height:400}});console.log(r,errs.join('|'));await b.close();})();
