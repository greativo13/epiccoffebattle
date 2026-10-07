const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(16000);
const ids=process.argv[2].split(',');
const out=await p.evaluate((ids)=>ids.map(id=>{const sp=ENEMY_SPR[id];if(!sp)return [id,null];const c=document.createElement('canvas');c.width=sp.width;c.height=sp.height;const g=c.getContext('2d');g.fillStyle='#3a6a30';g.fillRect(0,0,c.width,c.height);g.drawImage(sp,0,0);return [id,c.toDataURL('image/png')];}),ids);
for(const [id,u] of out){if(u)fs.writeFileSync(`sp_${id}.png`,Buffer.from(u.split(',')[1],'base64'));else console.log('nincs',id);}
await b.close();})();
