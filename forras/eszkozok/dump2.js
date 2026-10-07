const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage();
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(9000);
const d=await p.evaluate(()=>{const EL=k=>k?(EL_LABEL[k]||k):'';const tg=t=>t==='enemies'?'minden ellenségre':t==='enemy'?'egy ellenségre':t==='allies'?'az egész csapatra':t==='ally'?'egy társra':t==='self'?'magára':t==='deadAlly'?'elesett társra':'';
  const heroes=['wizard','witch','fairy','orc','monk'].map(t=>{const H=HERO_DEF[t],list=[];const at=ATTACKS[t];list.push({id:'a-'+t+'-basic',name:at.name,kind:'Alaptámadás',elem:EL(at.elem),tgt:tg(at.tgt),desc:at.desc||'Alaptámadás, nem kerül MP-be.'});
    for(const id of [...H.skills,...SHOP_SKILLS[t].map(x=>x[0])]){const s=SK[id];if(!s)continue;list.push({id:'a-'+t+'-'+id,name:s.name,kind:H.skills.includes(id)?'Alapképesség':'Bolti képesség',elem:s.noTag?'':EL(skillEl(s)),tgt:tg(s.tgt),desc:s.desc||''});}
    const L=LIMITS[t];list.push({id:'a-'+t+'-limit',name:L.name,kind:'LIMIT',elem:EL(L.elem),tgt:tg(L.tgt),desc:L.desc||''});return {type:t,name:H.name,cls:H.cls,list};});
  const foes=foesByZone().map(([z,list])=>({zone:z.chapter||z.name,list:list.map(t=>({type:t,name:EN_DEF[t].name,boss:!!EN_DEF[t].boss,mini:!!EN_DEF[t].miniboss,info:EN_DEF[t].info||'',atk:foeSkillIds(t).map(id=>({id:'f-'+t+'-'+id,name:ESK[id].name,elem:EL(ESK[id].elem),tgt:ESK[id].tgt==='enemies'?'az egész csapatra':ESK[id].tgt==='self'?'magára':'egy hősre'}))}))}));
  const summons=SUMMONS.map(s=>({id:'s-'+s.id,name:s.name,desc:s.desc,req:s.req,elem:EL(SUMMON_EL[s.id])}));
  const items=Object.entries(ITEMS).map(([k,it])=>({id:'i-'+k,name:it.name,desc:it.desc}));
  return {heroes,foes,summons,items,combo:{id:'c-combo',name:COMBO.name,desc:COMBO.desc}};});
fs.writeFileSync(process.argv[2],JSON.stringify(d));console.log(d.heroes.map(h=>h.name+':'+h.list.length).join(' '),'| foes',d.foes.reduce((a,z)=>a+z.list.length,0),'| summons',d.summons.length,'items',d.items.length);await b.close();})();
