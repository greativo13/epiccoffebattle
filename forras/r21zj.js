// ===== 53. kör: külső átnézés (Gemini) alapján javítások =====

// 1) Történet: a IV. fejezet végén Morcus hat hónapig alszik, az V. elején már teát árul – az átmenet legyen logikus.
{const Z=ZONES[4];if(Z&&Z.chIntro&&/Morcus kipihente magát/.test(Z.chIntro))
  Z.chIntro=Z.chIntro.replace('Morcus kipihente magát, és gyógyteát árul a Királyi Kávéház mellett – túl jót.',
    'Morcus hat hónap után felébredt, és a királynő ítélete szerint jóvátételként gyógyteát árul a Királyi Kávéház mellett – túl jót.');}

// 2) Életerőbe kerülő képességek (Zúzás, Vérszomj, Kőhullám, Meteorököl, Magmakitörés, Sötét alku, Mana-tea):
//    az ár eddig is legfeljebb 1 ÉP-ig vont le, de így a hős 1 ÉP-vel maradt, és a következő ütés kiütötte.
//    Mostantól a gomb szürke („Kevés ÉP”), ha a használat után a hősnek a max. életereje 20%-ánál kevesebb maradna.
const R21_HPMIN=.2;
const r21HpLow=(h,sk)=>!!(h&&sk&&sk.hpPct&&h.hp-Math.round(h.maxHp*sk.hpPct/100)<h.maxHp*R21_HPMIN);
{const sb=setButtons;setButtons=function(list){try{const h=S.__msHero;if(h&&Array.isArray(list)){
    const low=heroSkills(h).map(id=>SK[id]).filter(sk=>sk&&r21HpLow(h,sk));
    for(const b of list){if(!b||!b.label)continue;const sk=low.find(s=>b.label===s.name||String(b.label).startsWith(s.name));
      if(sk){b.disabled=true;b.sub='Kevés ÉP';b.desc=(b.desc||'')+' Most nem használható: utána 20% alá esne az életereje.';}}}}catch(e){}
  return sb.apply(this,arguments);};}
{const ms=menuSkills;menuSkills=function(h){S.__msHero=h;try{return ms.apply(this,arguments);}finally{S.__msHero=null;}};}

// 3) Lili Tisztítása és Jázmin Ébresztő teája eddig ugyanazt tudta (minden rossz állapot le + több körös védelem).
//    Szétválasztva:
//    – Tisztítás (Lili): a TEST bajait veszi le (égés, méreg, átok, védelem−, fagyás, forrázás, őrület, zselékocka),
//      1 körig ezek ellen véd, és egy kicsit gyógyít. Altatást, kábulatot, némaságot NEM szüntet meg.
//    – Ébresztő tea (Jázmin): az ELME bajait veszi le (alvás, kábulat, némaság), és 1 körig „Éber”: ezek nem hatnak rá.
//      Testi bajt NEM vesz le. (A hab marad Kaelen dolga.)
const R21_BODY=['burn','poison','curse','defDown','freeze','scald','plagued','jelly'],R21_MIND=['sleep','stun','silence'];
STATUS.awake=['Éber','#ffe08a'];
{const a0=addStatus;addStatus=function(t,type,turns){
  if(t&&t.st&&t.st.awake&&R21_MIND.includes(type)){popLabel(t,'ÉBER!','#ffe08a');return;}
  // a Tisztítás védelme (ward) csak a testi bajok ellen véd, az elme bajai ellen nem
  if(t&&t.st&&t.st.ward&&R21_MIND.includes(type)){const w=t.st.ward;delete t.st.ward;try{return a0.call(this,t,type,turns);}finally{if(t.st)t.st.ward=w;}}
  return a0.apply(this,arguments);};}
try{if(typeof ONE_ROUND!=='undefined'&&ONE_ROUND.add)ONE_ROUND.add('awake');}catch(e){}
const r21Snap=(keys)=>S.heroes.map(h=>[h,Object.fromEntries(keys.filter(k=>h.st&&h.st[k]).map(k=>[k,h.st[k]]))]);
const r21Restore=(snap)=>{for(const [h,o] of snap)if(h.alive)for(const k in o)if(!h.st[k])h.st[k]=o[k];};
if(SK.cleanse){SK.cleanse.desc='Lili fénye megtisztítja a csapat testét: leveszi az égést, a mérget, az átkot, a fagyást, a forrázást, a gyengített védelmet, és 1 körig ezek ellen véd; egy kicsit gyógyít is. (Altatás és kábulat ellen Jázmin Ébresztő teája jó.)';}
if(SK.wakeuptea){SK.wakeuptea.ward=0;SK.wakeuptea.desc='Erős, koffeines tea: az egész csapat felébred, a kábulat és a némaság is elmúlik, és 1 körig éberek – nem lehet őket elaltatni, elkábítani, elnémítani. Testi bajt (méreg, égés, átok) nem vesz le.';}
{const c0=A.cleanseFx;if(c0)A.cleanseFx=async function(u,ts,sk){const keep=r21Snap(R21_MIND);const r=await c0.apply(this,arguments);
  r21Restore(keep);for(const h of S.heroes)if(h.alive&&h.st)for(const k of R21_BODY)delete h.st[k];updateHUD();return r;};}
{const w0=A.wakeTea;if(w0)A.wakeTea=async function(u,ts,sk){const keep=r21Snap(R21_BODY);const r=await w0.apply(this,arguments);
  r21Restore(keep);for(const h of S.heroes)if(h.alive&&h.st){for(const k of R21_MIND)delete h.st[k];delete h.st.ward;h.st.awake=1;popLabel(h,'ÉBER!','#ffe08a');}updateHUD();return r;};}

// 4) Kerekítési hiba: a Lampionlidérc Lidércrobbanásának ereje 1.1700000000000002 volt (szorzásból) → 1,17.
for(const k in ESK){const s=ESK[k];if(s&&typeof s.pow==='number')s.pow=Math.round(s.pow*100)/100;}
for(const k in SK){const s=SK[k];if(s&&typeof s.pow==='number')s.pow=Math.round(s.pow*100)/100;}

// 5) Fekvő telefonon a Bestiáriumból nem lehetett kilépni: a bolt fekvő elrendezése (amit a Bestiárium is használ)
//    elrejti az alsó gombokat. Mint a boltban: „✕ Vissza a térképre” a lista tetején is.
{const rb=r14Bestiary;r14Bestiary=function(back){const r=rb.apply(this,arguments);try{const box=document.querySelector('.ov-box.shop');
  if(box&&!box.querySelector('.shop-exit')){const top=el('div','shop-top');top.appendChild(btn('ov-btn sec shop-exit','✕ Vissza a térképre',back||(()=>mapScreen())));box.insertBefore(top,box.firstChild);}}catch(e){}return r;};}

// 6) 3. térkép, Normál/Nehéz: a sima pályák (nem főellenség, nem minibossz) még könnyűek voltak (a csapat 60–80%-a megmaradt) → ÉP ×1,15, erő ×1,1.
{const _mk3=mkEnemy;mkEnemy=function(type,x,y,elvl){const e=_mk3.apply(this,arguments);
  try{if(e&&S.diff>=1&&!S.arena&&(elvl||0)>=60&&!(e.d&&(e.d.boss||e.d.miniboss))){e.maxHp=e.hp=Math.round(e.maxHp*1.15);e.atk*=1.1;e.mag*=1.1;}}catch(x){}
  return e;};}

// 7) Régi animáció-változat ne jöhessen elő: több új animáció (Tölgyököl, Földrepesztés, Tövisvihar, Bambusz-gólem, Habáradat,
//    Kígyótekercs, Gombaspóra stb.) a régi, rajzolt változatra esik vissza, ha a festett képe még nincs betöltve.
//    Telefonon a képek külön fájlból, lassabban jönnek → a csata indulása előtt megvárjuk a festett effektképeket (legfeljebb 3 mp).
{const sb0=startBattle;startBattle=async function(){try{const ims=Object.values(R17I).filter(im=>im&&im instanceof HTMLImageElement&&!(im.complete&&im.naturalWidth));
    if(ims.length)await Promise.race([Promise.all(ims.map(im=>im.decode?im.decode().catch(()=>{}):new Promise(r=>{im.onload=im.onerror=r;}))),new Promise(r=>setTimeout(r,3000))]);}catch(e){}
  return sb0.apply(this,arguments);};}
