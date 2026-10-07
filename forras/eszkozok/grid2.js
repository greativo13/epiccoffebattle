const {chromium}=require('playwright');const keys=process.argv[2].split(',');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
for(const k of keys){const r=await p.evaluate(k=>{const im=ENEMY_SPR[k];if(!im)return null;const S=640,s=Math.min(S/im.width,S/im.height),w=im.width*s,h=im.height*s;const c=document.createElement('canvas');c.width=w+40;c.height=h+40;const g=c.getContext('2d');g.fillStyle='#456';g.fillRect(0,0,c.width,c.height);g.drawImage(im,30,20,w,h);
 for(let q=0;q<=20;q++){g.strokeStyle=q%2?'rgba(255,255,0,.35)':'rgba(255,0,0,.8)';g.lineWidth=1;g.beginPath();g.moveTo(30+w*q/20,20);g.lineTo(30+w*q/20,20+h);g.moveTo(30,20+h*q/20);g.lineTo(30+w,20+h*q/20);g.stroke();if(q%2===0){g.fillStyle='#fff';g.font='bold 12px sans-serif';g.fillText(q/2,30+w*q/20-3,14);g.fillText(q/2,4,20+h*q/20+4);}}
 return c.toDataURL();},k);if(r)require('fs').writeFileSync('lg_'+k+'.png',Buffer.from(r.split(',')[1],'base64'));}
await b.close();})();
