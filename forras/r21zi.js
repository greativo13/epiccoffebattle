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
    const over=avg-(L.elvl+1),f=over>=3?0:Math.max(0,Math.min(1.5,1-.33*over));for(const e of S.enemies)if(e&&e.xp)e.xp=Math.round(e.xp*f);
    // egy győzelem legfeljebb a pálya szintje +3-ig emelhet (a főellenség óriási tapasztalata 6–8 szintet adott egyszerre)
    {const top=hs.reduce((a,h)=>h.lvl>a.lvl?h:a,hs[0]);let need=0;for(let l=top.lvl;l<L.elvl+3;l++)need+=xpNeed(l);need=Math.max(0,need-(top.xp||0));const tot=S.enemies.filter(e=>e&&!e.fled).reduce((a,e)=>a+(e.xp||0),0);if(tot>need){const k=need/tot;for(const e of S.enemies)if(e&&e.xp)e.xp=Math.floor(e.xp*k);}}}}catch(e){}
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
// Főellenség (Normál/Nehéz): élet ×1,45 (Normál) / ×1,3 (Nehéz), erő ×1,1; Normálon a 2–3. térképen (szint ≥31) minden ellenfél +10%; Nehézen a régi „korai plusz” (+0,3 a játék elején) kivéve, mert az eleje túl kemény lett; minibossz: élet ×1,15. A 3. térképen (pálya szintje ≥60, Normál/Nehéz) minden ellenfél élete ×1,2, ereje ×1,15.
{const _mk2=mkEnemy;mkEnemy=function(type,x,y,elvl){const e=_mk2.apply(this,arguments);
  try{if(e&&S.diff>=1&&!S.arena){const D=e.d||{};let hp=1,at=1;const lv=elvl||1;if(D.boss){hp*=S.diff===1?1.45:1.3;at*=1.1;}else if(D.miniboss)hp*=1.15;if(lv>=60){hp*=1.2;at*=1.15;}if(S.diff===1&&lv>=31){hp*=1.1;at*=1.1;}if(S.diff===2){const hb=.3*(1-Math.min(1,(lv-1)/24));if(hb>0){const k=DIFF_HP[2]/(DIFF_HP[2]+hb),ka=DIFF_ATK[2]/(DIFF_ATK[2]+hb);hp*=k;at*=ka;}}
    if(hp!==1){e.maxHp=e.hp=Math.round(e.maxHp*hp);}if(at!==1){e.atk*=at;e.mag*=at;}}}catch(x){}
  return e;};}
