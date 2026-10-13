// ===== 32. kör: egyensúly (a felhasználó: „a limit és idézés támadások alig hatnak, az ellenfelek erősebbek, mint kellene”) =====
// Mérés (bal.js, Normál nehézség, a hősök a pálya szintjén): a késői pályákon egy alaptámadás a közönséges ellenfél életének
// csak 2–5%-át vitte le (20–40 ütés egy ellenfélre), a LIMIT 7–15%-át, egy idézés 10–20%-át – az ellenfelek élete sokkal
// gyorsabban nőtt, mint a hősök sebzése. Javítás:
// 1. az ellenfelek életereje a szinttel csökkenő szorzót kap (a 4. szintig változatlan, a 74. szinten kb. az ötöde),
//    a főellenségeké valamivel kevésbé (maradjon kemény küzdelem);
// 2. az ellenfelek támadása a 8. szinttől 12%-kal gyengébb;
// 3. a LIMIT 1,6×, az idézés 1,6×, a páros támadás 1,3× erősebb.
const R21HPK=.06,r21HpDiv=(el,boss)=>1+Math.max(0,el-4)*R21HPK*(boss?.82:1);
{const mk=mkEnemy;mkEnemy=function(type,x,y,elvl=1){const e=mk.apply(this,arguments);try{const d=e.d||{},div=r21HpDiv(elvl,d.boss||d.miniboss);
    e.maxHp=Math.max(1,Math.round(e.maxHp/div));e.hp=e.maxHp;if(elvl>=8){e.atk*=.88;e.mag*=.88;}}catch(err){}return e;};}
const r21IsLim=sk=>!!sk&&(sk.isLimit||(typeof LIMITS==='object'&&Object.values(LIMITS).some(l=>l&&l.name===sk.name))||(typeof COMBO==='object'&&COMBO&&COMBO.name===sk.name));
{const h0=hit;hit=function(u,t,sk){try{if(u&&t&&sk&&t.kind==='enemy'&&(sk.kind==='phys'||sk.kind==='mag')&&u.kind==='hero'){let m=1;
      if(u.hp>=999999)m=1.6;                                   // idézés (a summoner() „hőse”)
      else if(r21IsLim(sk))m=1.6;
      else if(sk.pair||(typeof PAIRS==='object'&&PAIRS.some(p=>p.name===sk.name)))m=1.3;
      if(m!==1)sk=Object.assign({},sk,{pow:(sk.pow||1)*m});}}catch(e){}
  return h0.call(this,u,t,sk);};}

// ---- Morgána – Sötétalku (a felhasználó: „megint lángok veszik körbe, ami nem kell” – B7: korábbi tiltás): a megszállás
// alatt egy régi réteg (r19-es drawEntity-burkoló) 4 mp után folyamatosan sötét lángnyelveket szórt köré. Mostantól a
// megszállt Morgána körül soha nincs láng (a vörös szem és a halvány derengés marad).
{const df=darkFlame;darkFlame=function(o){try{if(o&&S&&S.heroes){const w=S.heroes.find(h=>h.type==='witch'&&h.possessed&&h.alive);if(w&&Math.abs(o.x-cx(w))<170&&o.y>topY(w)-60&&o.y<w.y+w.oy+30)return;}}catch(e){}return df.apply(this,arguments);};}

// ---- Tealopó majom (a felhasználó: „8 csészét dob, elég 3”): egy dobássorozat 3 csésze, és körönként csak egyszer dob
// (kétszer lép – a második lépése ilyenkor csészelopás)
{const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){try{if(e&&e.type==='monkey'&&sk&&sk.anim==='cupThrow'){if(e._cupR===S.round&&ESK.snatch)sk=ESK.snatch;else e._cupR=S.round;}}catch(err){}return ue.call(this,e,sk,target);};}
