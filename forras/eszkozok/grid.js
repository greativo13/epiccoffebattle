const {chromium}=require('playwright');const keys=process.argv[2].split(',');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
const r=await p.evaluate(keys=>{const c=document.createElement('canvas');c.width=330*keys.length;c.height=360;const g=c.getContext('2d');g.fillStyle='#456';g.fillRect(0,0,c.width,c.height);
keys.forEach((k,i)=>{const im=ENEMY_SPR[k]||FX_IMG[k];if(!im)return;const s=Math.min(320/im.width,330/im.height),w=im.width*s,h=im.height*s,x=i*330+5,y=20;g.drawImage(im,x,y,w,h);g.strokeStyle='rgba(255,0,0,.6)';g.fillStyle='#fff';g.font='11px sans-serif';
 for(let q=0;q<=10;q++){g.beginPath();g.moveTo(x+w*q/10,y);g.lineTo(x+w*q/10,y+h);g.moveTo(x,y+h*q/10);g.lineTo(x+w,y+h*q/10);g.stroke();g.fillText(q,x+w*q/10,y-4);g.fillText(q,x-0,y+h*q/10);}g.fillText(k,x+40,y-8);});return c.toDataURL();},keys);
require('fs').writeFileSync('grid.png',Buffer.from(r.split(',')[1],'base64'));await b.close();})();
