const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const dir=process.argv[2]+'/prof';fs.rmSync(dir,{recursive:true,force:true});
for(const run of [1,2]){const c=await chromium.launchPersistentContext(dir,{executablePath:'/opt/pw-browsers/chromium'});const p=c.pages()[0]||await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.addInitScript(()=>{window.__gid=0;const g=CanvasRenderingContext2D.prototype.getImageData;CanvasRenderingContext2D.prototype.getImageData=function(){window.__gid++;return g.apply(this,arguments);};});
  const t0=Date.now();await p.goto('http://localhost:8765/index.html');
  const lt=await p.evaluate(()=>new Promise(res=>{let worst=0,last=performance.now(),tot=0;const t0=performance.now();const f=()=>{const now=performance.now(),d=now-last;if(d>50)tot+=d;worst=Math.max(worst,d);last=now;if(now-t0<9000)requestAnimationFrame(f);else res({worst,tot});};requestAnimationFrame(f);}));
  const st=await p.evaluate(()=>({spr:Object.keys(ENEMY_SPR).length,fx:Object.keys(FX_IMG).length,gid:window.__gid,cache:SPR_CACHE.map.size}));
  console.log('indulás',run,': legrosszabb képkocka',Math.round(lt.worst),'ms, akadás',Math.round(lt.tot),'ms',JSON.stringify(st),errs.join('|'));
  await p.waitForTimeout(run===1?20000:500);await c.close();}})();
