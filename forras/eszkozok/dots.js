const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(1500);
for(const f of ['map.dd52d1ae.webp','map2.d6aac5ca.webp']){
const r=await p.evaluate(async f=>{const im=new Image();im.src='kepek/'+f;await im.decode();const W=im.width,H=im.height,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,W,H).data;
 const dark=new Uint8Array(W*H);for(let i=0;i<W*H;i++){const r=d[i*4],gg=d[i*4+1],bb=d[i*4+2];dark[i]=(r<105&&gg<80&&bb<65&&r>bb)?1:0;}
 const lab=new Int32Array(W*H);let n=0;const out=[];
 for(let i=0;i<W*H;i++){if(!dark[i]||lab[i])continue;n++;const st=[i];lab[i]=n;let cnt=0,sx=0,sy=0,x0=1e9,x1=-1,y0=1e9,y1=-1;
  while(st.length){const j=st.pop();const x=j%W,y=(j/W)|0;cnt++;sx+=x;sy+=y;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;for(const k of [j-1,j+1,j-W,j+W])if(k>=0&&k<W*H&&dark[k]&&!lab[k]){lab[k]=n;st.push(k);}}
  const bw=x1-x0+1,bh=y1-y0+1;if(cnt>=W*H*0.000012&&cnt<=W*H*0.00012&&bw/bh<1.8&&bh/bw<1.8&&cnt/(bw*bh)>.45)out.push([+(sx/cnt/W*100).toFixed(1),+(sy/cnt/H*100).toFixed(1)]);}
 // rajz
 g.fillStyle='rgba(255,0,0,.9)';for(const [x,y] of out){g.beginPath();g.arc(x*W/100,y*H/100,W*.006,0,7);g.fill();}
 g.strokeStyle='rgba(0,0,255,.35)';g.lineWidth=1;for(let q=0;q<=20;q++){g.beginPath();g.moveTo(W*q/20,0);g.lineTo(W*q/20,H);g.moveTo(0,H*q/20);g.lineTo(W,H*q/20);g.stroke();}
 return {W,H,out,img:c.toDataURL('image/jpeg',.7)};},f);
require('fs').writeFileSync('dots_'+f.slice(0,4)+'.jpg',Buffer.from(r.img.split(',')[1],'base64'));require('fs').writeFileSync('dots_'+f.slice(0,4)+'.json',JSON.stringify(r.out));console.log(f,r.W,r.H,r.out.length);}
await b.close();})();
