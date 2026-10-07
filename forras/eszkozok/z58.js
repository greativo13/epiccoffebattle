const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(()=>{const out=[];const cnt={};for(const k in ESK){const a=ESK[k].anim;cnt[a]=(cnt[a]||0)+1;}
 for(const z of ZONES.slice(0,4)){const seen=new Set();for(const L of z.levels)for(const bt of L.battles)for(const t of bt)if(!seen.has(t)){seen.add(t);const d=EN_DEF[t];out.push(z.id+' '+t+' '+d.name+': '+(d.skills||[]).map(([s])=>s+'='+(ESK[s]?ESK[s].anim+'('+cnt[ESK[s].anim]+')':'?')).join(', '));}}
 return out.join('\n');}));await b.close();})();
