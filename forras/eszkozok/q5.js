(()=>{const out={};
 // skills with no sound / duplicates by anim
 const byAnim={};for(const [id,s] of Object.entries(SK)){if(!s||!s.anim)continue;(byAnim[s.anim]=byAnim[s.anim]||[]).push(id);}
 out.sharedAnim=Object.entries(byAnim).filter(([a,l])=>l.length>1).map(([a,l])=>a+':'+l.join(','));
 const e=Object.entries(ESK).filter(([id,s])=>s&&s.anim&&!A[s.anim]).map(([id])=>id);out.missingAnim=e;
 // shop prices vs gold per level
 out.shop=Object.fromEntries(Object.entries(SHOP_SKILLS).map(([t,l])=>[t,l.length]));
 out.gold=Object.keys(EN_DEF).slice(0,6).map(t=>{const x=mkEnemy(t,0,0,5);return [t,x.gold,x.maxHp];});
 out.items=Object.keys(ITEMS);out.prices=typeof ITEM_PRICE==='object'?ITEM_PRICE:null;
 out.statusNoName=Object.keys(STATUS).filter(k=>!STATUS[k][0]);
 const seen={};out.dupNames=[];for(const [id,s] of Object.entries(SK)){if(!s||!s.name)continue;if(seen[s.name])out.dupNames.push(s.name+':'+seen[s.name]+'/'+id);seen[s.name]=id;}
 return out;})()
