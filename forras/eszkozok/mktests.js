const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3500);
const spec=JSON.parse(require('fs').readFileSync('spec.json','utf8'));
const out=await p.evaluate(spec=>{const res=[];let ord=0;const heroName=t=>(S.roster||S.heroes).concat(S.heroes).find(h=>h.type===t)?.name||t;
  const heroOrder=['wizard','witch','fairy','orc','monk'];
  for(const [ht,id,how,exp] of spec.hero.sort((a,b)=>heroOrder.indexOf(a[0])-heroOrder.indexOf(b[0]))){const sk=SK[id];res.push({area:'Hősök képességei',title:'Próbaterem → '+heroName(ht)+' → '+sk.name,how,expect:exp,order:++ord});}
  const sIdx=id=>SUMMONS.findIndex(s=>s.id===id);
  for(const [id,how,exp] of spec.sum.sort((a,b)=>sIdx(a[0])-sIdx(b[0]))){const s=SUMMONS[sIdx(id)];res.push({area:'Idézések',title:'Próbaterem → Idézések → '+s.name,how,expect:exp,order:++ord});}
  const zones=foesByZone();for(const [z,list] of zones)for(const t of list){const ids=foeSkillIds(t);for(const sid of ids){const it=spec.foe.find(x=>x[0]===t&&x[1]===sid);if(!it)continue;
    res.push({area:'Ellenfelek – '+z.name,title:'Próbaterem → Ellenfelek és támadásaik → '+z.name+' → '+EN_DEF[t].name+' → '+ESK[sid].name,how:it[2],expect:it[3],order:++ord});it.used=1;}}
  const missing=spec.foe.filter(x=>!x.used).map(x=>x[0]+':'+x[1]);return {res,missing};},spec);
require('fs').writeFileSync('tests11.json',JSON.stringify(out.res,null,1));console.log(out.res.length,'hiányzik:',out.missing.join(',')||'-');await b.close();})();
