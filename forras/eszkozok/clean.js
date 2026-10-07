const {chromium}=require('playwright');const k=process.argv[2];(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
const r=await p.evaluate((k)=>{const im=ENEMY_SPR[k];const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
 const w=c.width,h=c.height,d=g.getImageData(0,0,w,h),q=d.data;const wh=i=>q[i*4+3]>0&&Math.min(q[i*4],q[i*4+1],q[i*4+2])>=TH;let TH=225;
 const seen=new Uint8Array(w*h),out=[];for(let s=0;s<w*h;s++){if(seen[s]||!wh(s))continue;const comp=[s];seen[s]=1;let edge=0;for(let j=0;j<comp.length;j++){const z=comp[j],x=z%w;for(const n of [z-1,z+1,z-w,z+w]){if(n<0||n>=w*h)continue;if(Math.abs(n%w-x)>1)continue;if(q[n*4+3]<20)edge++;if(seen[n]||!wh(n))continue;seen[n]=1;comp.push(n);}}
  if(comp.length>=15){const xs=comp.map(z=>z%w),ys=comp.map(z=>(z/w)|0);out.push([comp.length,edge,Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)].join(','));}}
 return w+'x'+h+'\n'+out.join('\n');},k);console.log(r);await b.close();})();
