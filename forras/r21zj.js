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

// 8) Közelharci ellenfelek: a 10 alap közelharci támadás (lunge) a találatnál mindig ugyanazt a kódból rajzolt vágáscsíkot kapta –
//    penge nélkül is (Sodrófa, Bögreököl, Szarvdöfés, harapások). Mostantól mindegyik saját FESTETT becsapódást kap.
function r21Imp(im,x,y,w,o={}){if(!im)return;const life=o.life||.6;R18E({t:0,update(dt){this.t+=dt;return this.t<life;},
  draw(){const k=this.t/life,s=(k<.15?.55+.45*(k/.15):1+.1*(k-.15))*(o.grow?1+o.grow*k:1),a=k<.55?1:1-(k-.55)/.45;
    r17Draw(im,x+(o.dx||0)*k,y+(o.dy||0)*k,w*s,{a,rot:(o.rot||0)+(o.spin||0)*k,fx:o.fx,sy:o.sy,add:o.add});}});}
const R21_MELEE_FX={
  'Lélekvágás':(x,y)=>{r21Imp(R17I.darkslash,x,y,230,{fx:true,rot:-.25,add:true,life:.55});},
  'Harapás':(x,y)=>{r21Imp(R17I.hound,x+30,y-10,210,{fx:true,dx:-50,life:.5,add:true});shake(5);},
  'Kardvágás':(x,y)=>{r21Imp(r21Filt(R17I.windslash,'grayscale(1) brightness(1.15) sepia(.25)'),x,y,200,{fx:true,rot:-.35,life:.5});},
  'Alabárdszúrás':(x,y)=>{r21Imp(r21Filt(R17I.windslash,'grayscale(1) brightness(1.05)'),x+20,y,210,{fx:true,sy:.35,dx:-60,life:.45});},
  'Karmolás':(x,y)=>{r21Imp(r21Filt(R17I.bearclaw,'hue-rotate(250deg) saturate(1.6) brightness(.95)'),x,y,170,{fx:true,life:.6});},
  'Karomcsapás':(x,y)=>{r21Imp(r21Filt(R17I.bearclaw,'hue-rotate(300deg) saturate(1.8) brightness(1.1)'),x,y,180,{fx:true,life:.6});},
  'Sodrófa':(x,y)=>{for(let i=0;i<3;i++){const a=i*2.1;r21Imp(R17I.star,x+Math.cos(a)*36,y-40+Math.sin(a)*14,46,{spin:5,dy:-18,life:.8});}r21Imp(r21Filt(R17I.goldburst,'sepia(.6) brightness(.9)'),x,y,150,{life:.35,add:true});shake(6);},
  'Bögreököl':(x,y)=>{r21Imp(r21Filt(R17I.teasplash,'sepia(1) saturate(1.4) brightness(.55) hue-rotate(-12deg)'),x,y-10,190,{life:.7,dy:-12});shake(8);},
  'Lángharapás':(x,y)=>{r21Imp(r21Filt(R17I.goldburst,'hue-rotate(-35deg) saturate(2.2)'),x,y,200,{life:.45,add:true});for(let i=0;i<14;i++)part({x:x+rnd(-30,30),y:y+rnd(-20,20),vx:rnd(-160,160),vy:rnd(-260,-60),g:300,life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['255,120,30','255,190,60','255,80,20'])});},
  'Szarvdöfés':(x,y)=>{r21Imp(r21Filt(R17I.goldburst,'sepia(1) saturate(1.6) brightness(.5) contrast(1.5)'),x,y,170,{life:.4});for(let i=0;i<12;i++)r21PD(r21Filt(R17I.pebble,'sepia(1) saturate(1.3) brightness(.55)'),x,y,{vx:rnd(-260,60),vy:rnd(-320,-100),g:900,size:rnd(16,28),life:rnd(.6,.9)});shake(6);},
};
{const sl=slash;slash=function(x,y,s,rgb){const f=S.__r21Melee;if(f){if(!f.done){f.done=true;try{f.fn(x,y);}catch(e){}}return;}return sl.apply(this,arguments);};}
{const lg=lunge;lunge=async function(u,t,sk,o){const fn=u&&u.kind==='enemy'&&sk&&R21_MELEE_FX[sk.name];if(!fn)return lg.apply(this,arguments);
  S.__r21Melee={fn,done:false};try{return await lg.apply(this,arguments);}finally{S.__r21Melee=null;}};}

// 9) Ötletek a nagy ellenőrzésből:
// a) Két főellenség-harc túl hosszú volt (gépi végigjátszásban Rozsdakirály/II. Csavar 28 kör, Morcus 23 kör; a többi 6–14):
//    életerejük ×0,8 (a trükk – villám a páncélra, Morcus fázisai – marad).
{const _mk4=mkEnemy;mkEnemy=function(){const e=_mk4.apply(this,arguments);try{if(e&&!S.arena&&(e.type==='rustking'||e.type==='morcus')){e.maxHp=e.hp=Math.round(e.maxHp*.8);}}catch(x){}return e;};}
// b) Lili Fénysugara fölösleges volt (a Pálcakoppintás olcsóbb, majdnem ugyanakkorát üt és kábít is).
//    Saját funkció: az élőholtakat és a szellemeket kétszeresen sebzi.
const R21_UNDEAD=new Set(['skeleton','zombie','ghost','gknight','lantern','steamwisp','nightmare','mosaicghost','steamwraith','shwizard','shwitch','shfairy','shorc']);
const r21Holy=(sk,t)=>sk&&(sk.id==='light'||sk.name==='Fénysugár')&&t&&R21_UNDEAD.has(t.type);
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{if(r&&r.dmg>0&&r21Holy(sk,t))r.dmg=Math.round(r.dmg*2);}catch(e){}return r;};}
{const h0=hit;hit=function(u,t,sk){try{if(r21Holy(sk,t)&&t.alive)popLabel(t,'SZENT FÉNY ×2!','#fff3a0');}catch(e){}return h0.apply(this,arguments);};}
if(SK.light)SK.light.desc='Szent fénysugár egy ellenségre. Az élőholtakat és a szellemeket (csontváz, zombi, kísértet, lidérc, árnyak) kétszeresen sebzi. A gombák is gyengék rá.';
// c) A méreg ne hasson az élettelen tárgy-ellenfelekre sem (eddig 20–30%-ban hatott): Vázagólem, Ezerrészes Szerviz, Kockacukor-gólem, Kristálygólem.
for(const t of ['vase','teaset','sugarcube','cgolem']){const e=EN_DEF[t];if(!e)continue;e.elem=Object.assign({},e.elem||{},{poison:0});e.statusImmune=[...new Set([...(e.statusImmune||[]),'poison'])];}
// d) Kamillának nem volt gyenge pontja: a szárított kamillavirág ég → tűz ×1,3. (A többi gyengeség nélküli ellenfélnél – Espresszó,
//    Káoszkocka, Örök Kanna, Morcus – a gyenge pont menet közben változik, ez szándékos; a megbékített Lili nem igazi ellenség.)
if(EN_DEF.kamilla)EN_DEF.kamilla.elem=Object.assign({},EN_DEF.kamilla.elem||{},{fire:1.3});
