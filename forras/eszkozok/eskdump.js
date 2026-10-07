const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
console.log(await p.evaluate(ks=>ks.map(k=>{const s=ESK[k];return s?k+': '+s.name+' | '+s.anim+' | '+s.tgt+' | '+s.kind+' | '+(s.elem||'')+' | '+JSON.stringify(s.status||s.buff||'')+' | aiOwner='+Object.keys(EN_DEF).filter(t=>(EN_DEF[t].skills||[]).some(x=>x[0]===k)).join(','):k+': ?'}).join('\n'),process.argv[2].split(',')));await b.close();})();
