const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
for(const vp of [{width:393,height:760,hasTouch:true,isMobile:true},{width:1280,height:720}]){
const p=await b.newPage({viewport:{width:vp.width,height:vp.height},hasTouch:!!vp.hasTouch,isMobile:!!vp.isMobile});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
const before=await p.evaluate(()=>S.heroes.map(h=>h.type).join(','));
await p.click('.bench-card');await p.waitForTimeout(300);
const pt=await p.evaluate(()=>{const h=S.heroes.find(x=>x.alive&&x!==S.pick.h)||S.heroes[0];const r=cv.getBoundingClientRect();return {x:r.left+cx(h)/W*r.width,y:r.top+(h.y+h.oy-h.h*h.scale*.4)/H*r.height,t:h.type};});
if(vp.hasTouch)await p.touchscreen.tap(pt.x,pt.y);else await p.mouse.click(pt.x,pt.y);await p.waitForTimeout(800);
const after=await p.evaluate(()=>S.heroes.map(h=>h.type).join(','));
console.log(vp.width,'clicked',pt.t,'|',before,'->',after);await p.close();}
await b.close();})();
