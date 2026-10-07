const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.addInitScript(()=>{const N=HTMLCanvasElement.prototype.getContext;window.__t=[];const gid=CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData=function(){const t=performance.now();const r=gid.apply(this,arguments);window.__t.push(['gid',performance.now()-t,arguments[2]*arguments[3]]);return r;};
  const di=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im){const t=performance.now();const r=di.apply(this,arguments);const d=performance.now()-t;if(d>15)window.__t.push(['draw',d,(im.src||'').split('/').pop().slice(0,30)]);return r;};});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(12000);
const t=await p.evaluate(()=>window.__t);const draws=t.filter(x=>x[0]==='draw').sort((a,b)=>b[1]-a[1]);const g=t.filter(x=>x[0]==='gid');
console.log('drawImage >15ms:',draws.length,'össz',Math.round(draws.reduce((s,x)=>s+x[1],0)),'ms');console.log(draws.slice(0,8).map(x=>Math.round(x[1])+'ms '+x[2]).join('\n'));
console.log('getImageData:',g.length,'össz',Math.round(g.reduce((s,x)=>s+x[1],0)),'ms');await b.close();})();
