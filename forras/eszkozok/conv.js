// node conv.js in.png out.webp mode maxW   (mode: ink | flood | keep | blackalpha)
const {chromium}=require('playwright');const fs=require('fs');const [inp,out,mode,maxW]=process.argv.slice(2);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
const src='data:image/png;base64,'+fs.readFileSync(inp).toString('base64');
const r=await p.evaluate(async([src,mode,maxW])=>{const im=new Image();im.src=src;await im.decode();const s=Math.min(1,maxW/im.width),W=Math.round(im.width*s),H=Math.round(im.height*s);
 const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(im,0,0,W,H);const d=g.getImageData(0,0,W,H),q=d.data;
 if(mode==='ink'){for(let i=0;i<q.length;i+=4){const m=Math.min(q[i],q[i+1],q[i+2]),a=Math.max(0,Math.min(255,(245-m)*1.25));q[i+3]=a;const k=a>0?Math.max(0,(m-(255-a))/(a/255||1)):0;q[i]=q[i+1]=q[i+2]=Math.min(255,m*0.6);}}
 else if(mode==='blackalpha'){for(let i=0;i<q.length;i+=4){const mx=Math.max(q[i],q[i+1],q[i+2]);const a=Math.min(255,mx*1.15);q[i+3]=a;if(a>0){q[i]=Math.min(255,q[i]*255/a);q[i+1]=Math.min(255,q[i+1]*255/a);q[i+2]=Math.min(255,q[i+2]*255/a);}}}
 else if(mode==='flood'){const seen=new Uint8Array(W*H),st=[];const white=j=>{const k=j*4;return q[k]>232&&q[k+1]>232&&q[k+2]>232&&Math.max(q[k],q[k+1],q[k+2])-Math.min(q[k],q[k+1],q[k+2])<22;};
   for(let x=0;x<W;x++){st.push(x,(H-1)*W+x);}for(let y=0;y<H;y++){st.push(y*W,y*W+W-1);}
   while(st.length){const j=st.pop();if(seen[j]||!white(j))continue;seen[j]=1;const x=j%W;if(x>0)st.push(j-1);if(x<W-1)st.push(j+1);if(j>=W)st.push(j-W);if(j<W*(H-1))st.push(j+W);}
   for(let j=0;j<W*H;j++)if(seen[j])q[j*4+3]=0;
   // perem lágyítása
   for(let j=0;j<W*H;j++){if(seen[j])continue;const x=j%W;let n=0;for(const o of [-1,1,-W,W]){const k=j+o;if(k>=0&&k<W*H&&seen[k])n++;}if(n){const k=j*4,l=(q[k]+q[k+1]+q[k+2])/3;q[k+3]=Math.min(q[k+3],Math.max(60,255-(l-150)*1.6));}}}
 g.putImageData(d,0,0);return {url:c.toDataURL('image/webp',.86),W,H};},[src,mode,+maxW||1100]);
fs.writeFileSync(out,Buffer.from(r.url.split(',')[1],'base64'));console.log(out,r.W,r.H,fs.statSync(out).size);await b.close();})();
