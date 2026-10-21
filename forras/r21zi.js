// ===== 52. kör: a kis ellenfelek ne üssék ki egy csapással a hősöket =====
// Az ellenfél hősre mért ütése ×0,75, és egy ütés legfeljebb a hős életerejének adott részét viheti el
// (kritikus találattal együtt): sima ellenfél 40% (mindenkire ható támadásnál 30%), minibossz 55%/40%, főellenség 65%/50%.
{const _cd=calcDmg;calcDmg=function(u,t,sk){const r=_cd(u,t,sk);
  if(u&&t&&u.kind==='enemy'&&t.kind==='hero'&&r&&r.dmg>0){
    const D=u.d||{},all=sk&&sk.tgt==='enemies',cap=D.boss?(all?.5:.65):D.miniboss?(all?.4:.55):(all?.3:.4);
    r.dmg=Math.max(1,Math.min(Math.round(r.dmg*.75),Math.round(t.maxHp*cap)));}
  return r;};}

// ===== 52. kör: a hősök szintje ne szaladjon el a pályák ajánlott szintje elől =====
// Végigjáték-mérés: a 2. térképen a hősök +8 szinttel a pálya fölött jártak, a 3. térkép elején a plafon alatt
// felgyűlt tapasztalat egyszerre 60→78 szintet adott, a 10. fejezettől pedig minden csata 1 kör volt.
// 1) A kapott tapasztalat a csapat átlagszintjéhez igazodik: cél = pálya szintje +2; szintenként 20%-kal kevesebb fölötte, ennyivel több alatta (0,15×–1,5×).
// 2) A szintplafonon nem gyűlik tovább a tapasztalat (nincs későbbi ugrás).
{const _v=victory;victory=async function(){
  try{const L=S.level;if(L&&!S.arena&&L.elvl){const hs=S.heroes.filter(h=>h&&h.lvl);const avg=hs.reduce((a,h)=>a+h.lvl,0)/Math.max(1,hs.length);
    const f=Math.max(.15,Math.min(1.5,1-.2*(avg-(L.elvl+2))));for(const e of S.enemies)if(e&&e.xp)e.xp=Math.max(1,Math.round(e.xp*f));}}catch(e){}
  const r=await _v.apply(this,arguments);
  try{for(const h of (S.roster||S.heroes))if(h&&h.lvl>=lvlCap())h.xp=Math.min(h.xp,Math.max(0,xpNeed(h.lvl)-1));}catch(e){}
  return r;};}
