const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const src='data:image/png;base64,'+fs.readFileSync('axe.png').toString('base64');
const r=await p.evaluate(async src=>{const im=new Image();im.src=src;await im.decode();const w=im.width,h=im.height,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,0,0);const d=g.getImageData(0,0,w,h),q=d.data;
 const bgp=i=>{const r=q[i*4],gg=q[i*4+1],bb=q[i*4+2],mn=Math.min(r,gg,bb),mx=Math.max(r,gg,bb);return (mn>228&&mx-mn<30)||mx<18;};
 const seen=new Uint8Array(w*h),st=[];for(let x=0;x<w;x++){st.push(x,(h-1)*w+x);}for(let y=0;y<h;y++){st.push(y*w,y*w+w-1);}
 while(st.length){const i=st.pop();if(seen[i]||!bgp(i))continue;seen[i]=1;const x=i%w;if(x>0)st.push(i-1);if(x<w-1)st.push(i+1);if(i>=w)st.push(i-w);if(i<w*(h-1))st.push(i+w);}
 for(let i=0;i<w*h;i++)if(seen[i])q[i*4+3]=0;
 // szél lágyítása: a háttérrel szomszédos világos pixelek áttetszők
 for(let i=0;i<w*h;i++){if(seen[i])continue;const x=i%w;if((x>0&&seen[i-1])||(x<w-1&&seen[i+1])||(i>=w&&seen[i-w])||(i<w*(h-1)&&seen[i+w])){const mn=Math.min(q[i*4],q[i*4+1],q[i*4+2]);if(mn>170)q[i*4+3]=Math.max(0,(255-mn)*3);}}
 g.putImageData(d,0,0);let x0=w,y0=h,x1=0,y1=0;for(let i=0;i<w*h;i++)if(q[i*4+3]>10){const x=i%w,y=(i/w)|0;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}
 const k=640/(y1-y0+1),o=document.createElement('canvas');o.width=Math.round((x1-x0+1)*k);o.height=640;o.getContext('2d').drawImage(c,x0,y0,x1-x0+1,y1-y0+1,0,0,o.width,o.height);
 return [o.toDataURL('image/webp',.9),o.width,o.height];},src);
fs.writeFileSync('axe.webp',Buffer.from(r[0].split(',')[1],'base64'));console.log(r[1],r[2],fs.statSync('axe.webp').size);await b.close();})();
