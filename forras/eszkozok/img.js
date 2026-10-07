const {chromium}=require('playwright');const k=process.argv[2];(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
const r=await p.evaluate(async k=>{const im=new Image();im.src=IMG_SRC[k];await im.decode();const c=document.createElement('canvas');const s=Math.min(1,900/im.width);c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);return c.toDataURL();},k);
require('fs').writeFileSync('img.png',Buffer.from(r.split(',')[1],'base64'));await b.close();})();
