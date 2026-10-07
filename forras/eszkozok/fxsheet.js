const {chromium}=require('playwright');const keys=process.argv[2].split(',');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
const r=await p.evaluate(keys=>{const c=document.createElement('canvas');c.width=1200;c.height=Math.ceil(keys.length/6)*200;const g=c.getContext('2d');g.fillStyle='#456';g.fillRect(0,0,c.width,c.height);
keys.forEach((k,i)=>{const im=FX_IMG[k]||ENEMY_SPR[k];const x=(i%6)*200,y=Math.floor(i/6)*200;g.fillStyle='#fff';g.fillText(k+(im?' '+im.width+'x'+im.height:' MISSING'),x+4,y+12);if(im){const s=Math.min(180/im.width,180/im.height);g.drawImage(im,x+10,y+16,im.width*s,im.height*s);}});return c.toDataURL();},keys);
require('fs').writeFileSync('sheet.png',Buffer.from(r.split(',')[1],'base64'));await b.close();})();
