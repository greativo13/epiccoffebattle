const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
const url=await p.evaluate(()=>{const a=r18EspImg(0),c1=r18EspImg(1),im=ENEMY_SPR.espresso;const W0=im.width,H0=im.height,u0=.05,v0=.08,u1=.5,v1=.45;const c=document.createElement('canvas');const sw=(u1-u0)*W0,sh=(v1-v0)*H0;c.width=sw*2+10;c.height=sh;const g=c.getContext('2d');g.fillStyle='#6a8';g.fillRect(0,0,c.width,c.height);
 g.drawImage(a,u0*W0,v0*H0,sw,sh,0,0,sw,sh);g.drawImage(c1,u0*W0,v0*H0,sw,sh,sw+10,0,sw,sh);return c.toDataURL();});
require('fs').writeFileSync('jaw.png',Buffer.from(url.split(',')[1],'base64'));await b.close();})();
