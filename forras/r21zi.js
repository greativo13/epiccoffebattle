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
// 1) A kapott tapasztalat a csapat átlagszintjéhez igazodik: cél = pálya szintje +1; szintenként 33%-kal kevesebb fölötte, ennyivel több alatta (legfeljebb 1,5×); 3 szinttel a cél fölött már nem jár tapasztalat.
// 2) A szintplafonon nem gyűlik tovább a tapasztalat (a győzelem ELŐTTI plafon számít, mert a fejezetzáró győzelem után a plafon megemelkedik – különben a következő pályán egyszerre jönne 7–12 szint).
{const _v=victory;victory=async function(){
  try{const L=S.level;if(L&&!S.arena&&L.elvl){const hs=S.heroes.filter(h=>h&&h.lvl);const avg=hs.reduce((a,h)=>a+h.lvl,0)/Math.max(1,hs.length);
    const over=avg-(L.elvl+1),f=over>=3?0:Math.max(0,Math.min(1.5,1-.33*over));for(const e of S.enemies)if(e&&e.xp)e.xp=Math.round(e.xp*f);}}catch(e){}
  const cap0=lvlCap();const r=await _v.apply(this,arguments);
  try{for(const h of (S.roster||S.heroes))if(h&&h.lvl>=cap0)h.xp=Math.min(h.xp,Math.max(0,xpNeed(h.lvl)-1));}catch(e){}
  return r;};}

// ===== 52. kör: Nehéz szinten a hosszú (4+ csatás) pályák vége ne legyen lehetetlen =====
// A csaták között nem gyógyul a csapat; a végigjáték-mérésben a 2-3 és a 4-3 utolsó csatáin fogyott el a csapat.
// Nehéz szinten, legalább 4 csatás pályán a 3. csatától az ellenfelek élete és ereje ×0,85.
{const _mk=mkEnemy;mkEnemy=function(){const e=_mk.apply(this,arguments);
  try{const L=S.level;if(e&&S.diff===2&&L&&!S.arena&&L.battles&&L.battles.length>=4&&S.battleIdx>=2){e.maxHp=e.hp=Math.max(1,Math.round(e.maxHp*.85));e.atk*=.85;e.mag*=.85;}}catch(x){}
  return e;};}

// ===== 52. kör: legyen kihívás (a felhasználó kérése: „nem muszáj mindent elsőre megnyerni… most végiggalopp, unalmas”) =====
// Normál: ellenfél élete 1,1→1,35, ereje 1,0→1,2; Nehéz: 1,6→1,8 és 1,45→1,6. A Könnyű marad.
// Az egy ütés felső határa (40/55/65%) megmarad, így nehezebb, de nem lesz egy csapásos kiütés.
DIFF_HP[1]=1.35;DIFF_ATK[1]=1.2;DIFF_HP[2]=1.8;DIFF_ATK[2]=1.6;
