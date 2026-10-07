const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const src='data:image/webp;base64,'+fs.readFileSync('axe.webp').toString('base64');
const r=await p.evaluate(async src=>{const im=new Image();im.src=src;await im.decode();const w=im.width,h=im.height,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,0,0);const q=g.getImageData(0,0,w,h).data;
 // nyél középvonala: az alsó félben az átlátszatlan pixelek átlaga
 let sx=0,n=0;for(let y=Math.round(h*.55);y<h*.85;y++)for(let x=0;x<w;x++)if(q[(y*w+x)*4+3]>128){sx+=x;n++;}const hc=sx/n;
 // a penge: a nyéltől jobbra eső rész (nyél félszélessége ~ 14px)
 const half=Math.max(...[...Array(w).keys()].filter(x=>q[(Math.round(h*.7)*w+x)*4+3]>128).map(x=>Math.abs(x-hc)))+2;
 const right=w-(hc+half);const W2=Math.round(2*Math.max(hc,w-hc)),off=W2/2-hc;
 const o=document.createElement('canvas');o.width=W2;o.height=h;const og=o.getContext('2d');
 og.drawImage(c,off,0);
 // tükrözött penge a bal oldalra (csak a nyéltől jobbra eső rész)
 og.save();og.translate(W2/2,0);og.scale(-1,1);og.drawImage(c,hc+half,0,w-(hc+half),h*.55,half,0,w-(hc+half),h*.55);og.restore();
 const pv=document.createElement('canvas');pv.width=W2*1.5;pv.height=h*1.5/2;const pg=pv.getContext('2d');pg.fillStyle='#456';pg.fillRect(0,0,pv.width,pv.height);pg.drawImage(o,0,0,W2,h/2,0,0,pv.width,pv.height);
 return [o.toDataURL('image/webp',.9),pv.toDataURL(),hc,half,W2];},src);
fs.writeFileSync('axe2.webp',Buffer.from(r[0].split(',')[1],'base64'));fs.writeFileSync('axe2prev.png',Buffer.from(r[1].split(',')[1],'base64'));console.log(r.slice(2));await b.close();})();
