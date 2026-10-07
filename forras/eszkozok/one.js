const {chromium}=require('playwright');const k=process.argv[2],bg=process.argv[3]||'#203';(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
const r=await p.evaluate(([k,bg])=>{const im=ENEMY_SPR[k]||FX_IMG[k];const c=document.createElement('canvas');c.width=im.width*2;c.height=im.height*2;const g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,c.width,c.height);g.drawImage(im,0,0,c.width,c.height);return c.toDataURL();},[k,bg]);
require('fs').writeFileSync('one.png',Buffer.from(r.split(',')[1],'base64'));await b.close();})();
