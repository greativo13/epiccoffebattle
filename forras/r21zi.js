// ===== 52. kör: a kis ellenfelek ne üssék ki egy csapással a hősöket =====
// Az ellenfél hősre mért ütése ×0,75, és egy ütés legfeljebb a hős életerejének adott részét viheti el
// (kritikus találattal együtt): sima ellenfél 40% (mindenkire ható támadásnál 30%), minibossz 55%/40%, főellenség 65%/50%.
{const _cd=calcDmg;calcDmg=function(u,t,sk){const r=_cd(u,t,sk);
  if(u&&t&&u.kind==='enemy'&&t.kind==='hero'&&r&&r.dmg>0){
    const D=u.d||{},all=sk&&sk.tgt==='enemies',cap=D.boss?(all?.5:.65):D.miniboss?(all?.4:.55):(all?.3:.4);
    r.dmg=Math.max(1,Math.min(Math.round(r.dmg*.75),Math.round(t.maxHp*cap)));}
  return r;};}
