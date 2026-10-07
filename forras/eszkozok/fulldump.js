const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(6000);
await p.evaluate(()=>TEST['Próbaterem']());await p.waitForTimeout(2500);
const d=await p.evaluate(async()=>{let last=[];const o=setButtons;setButtons=function(a){last=a.map(x=>({label:x.label,sub:x.sub,desc:x.desc}));return o.apply(this,arguments);};
  const roster=(S.roster&&S.roster.length?S.roster:S.heroes).slice();const heroes=[];
  const order=['wizard','witch','fairy','orc','monk'];roster.sort((a,b)=>order.indexOf(a.type)-order.indexOf(b.type));
  for(const h of roster){if(!S.heroes.includes(h)){const out=S.heroes.find(x=>x.type!=='monk'&&x!==h);arenaSwap(out,h);}arenaMenu(h);await new Promise(r=>setTimeout(r,50));
    heroes.push({type:h.type,name:h.name,cls:h.d.cls,btns:last});}
  setButtons=o;
  const sums=SUMMONS.map(s=>({id:s.id,name:s.name,desc:s.desc||s.text||''}));
  const foes=foesByZone().map(([z,l])=>({zone:z.name,chapter:z.chapter,foes:l.map(t=>({t,name:EN_DEF[t].name,boss:!!EN_DEF[t].boss,mini:!!EN_DEF[t].miniboss,sk:foeSkillIds(t).map(id=>[ESK[id].name,ESK[id].desc||'',ESK[id].elem||'',ESK[id].tgt||'']),desc:EN_DEF[t].desc||''}))}));
  const zones=ZONES.map(z=>({name:z.name,chapter:z.chapter,levels:z.levels.map(L=>({id:L.id,name:L.name,boss:!!L.boss,tag:L.tag||'',foes:[...new Set((L.battles||[]).flat())].map(t=>EN_DEF[t]?EN_DEF[t].name:t),nb:(L.battles||[]).length}))}));
  return {heroes,sums,foes,zones,items:Object.entries(ITEMS).map(([k,v])=>({k,name:v.name,desc:v.desc})),shop:SHOP_ITEMS.map(x=>[ITEMS[x[0]]?.name,x[1],x[2]]),
    pairs:(typeof PAIRS!=='undefined'?PAIRS:[]).map(x=>({...x})),gear:GEAR_NAME,diff:DIFF_NAME};});
fs.writeFileSync('full.json',JSON.stringify(d,null,1));
console.log(d.heroes.map(h=>h.name+':'+h.btns.length).join(' '),'| sum',d.sums.length,'| foes',d.foes.reduce((a,z)=>a+z.foes.length,0),'| zones',d.zones.length);
await b.close();})();
