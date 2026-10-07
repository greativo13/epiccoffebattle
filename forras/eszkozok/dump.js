const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
const d=await p.evaluate(()=>{const strip=o=>JSON.parse(JSON.stringify(o,(k,v)=>typeof v==='function'?undefined:(v instanceof HTMLElement||v instanceof Image||(v&&v.getContext))?undefined:v));
const out={};for(const k of ['HERO_DEF','SK','SHOP_SKILLS','SHOP_ITEMS','LIMITS','ITEMS','EN_DEF','ZONES','SUMMONS','PAIRS','STATUS','DIFF_NAME','ELEM_NAMES','SECRET','BUFFS','INTRO','JOIN_TEXT','MAP_POS','ATTACKS','ESK']){try{out[k]=strip(eval(k))}catch(e){out[k]='ERR '+e.message}}return out;});
require('fs').writeFileSync('gamedata.json',JSON.stringify(d,null,1));await b.close();})();
