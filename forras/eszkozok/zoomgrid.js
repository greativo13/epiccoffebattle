// node zoomgrid.js out.png name u0 v0 u1 v1 [lépés]  – egy kép részlete nagyítva, finom ráccsal (képarány-koordináták)
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);const [out,name,u0,v0,u1,v1,st]=process.argv.slice(2);
const url=await p.evaluate(([name,u0,v0,u1,v1,st])=>{const im=ENEMY_SPR[name]||R17I[name]||FX_IMG[name];const W=im.width,H=im.height,sw=(u1-u0)*W,sh=(v1-v0)*H,Z=900/Math.max(sw,sh);const c=document.createElement('canvas');c.width=sw*Z;c.height=sh*Z;const g=c.getContext('2d');g.fillStyle='#888';g.fillRect(0,0,c.width,c.height);
 g.drawImage(im,u0*W,v0*H,sw,sh,0,0,c.width,c.height);g.font='13px sans-serif';const s=+st||.02;
 for(let u=Math.ceil(u0/s)*s;u<u1;u+=s){const x=(u-u0)*W*Z;g.strokeStyle='rgba(255,0,0,.55)';g.beginPath();g.moveTo(x,0);g.lineTo(x,c.height);g.stroke();g.fillStyle='#ff0';g.fillText(u.toFixed(2),x+2,12);}
 for(let v=Math.ceil(v0/s)*s;v<v1;v+=s){const y=(v-v0)*H*Z;g.strokeStyle='rgba(0,0,255,.55)';g.beginPath();g.moveTo(0,y);g.lineTo(c.width,y);g.stroke();g.fillStyle='#0ff';g.fillText(v.toFixed(2),2,y-2);}return c.toDataURL();},[name,+u0,+v0,+u1,+v1,st]);
require('fs').writeFileSync(out,Buffer.from(url.split(',')[1],'base64'));await b.close();})();
