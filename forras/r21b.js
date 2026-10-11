
// ===== 22. kör: a III. rész játszhatóságához szükséges mechanikák =====
// 1) Mochi-király: fél életerő alatt két Mochi-nyálka ugrik ki belőle (fehér mochik, nem zöld nyálka); ő maga megmarad
STATUS.silence=['Némaság','#cfd3ff'];ONE_ROUND.add('silence');
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{
   if(t&&t.type==='mochiking'&&t.alive&&!t._mkSplit&&t.hp<t.maxHp*.5){t._mkSplit=true;
     popLabel(t,'KETTÉVÁLIK!','#f4f0e0');burst(cx(t),midY(t),'245,240,225',34,260);
     const free=5-S.enemies.filter(e=>e.alive).length;
     for(const [dx,dy] of [[-240,30],[-80,150]].slice(0,Math.max(0,free))){
       const s=mkEnemy('mochi',Math.min(915,Math.max(560,t.x+dx)),Math.min(495,Math.max(330,t.y+dy)),S.elvl);S.enemies.push(s);
       tween(420,k=>s.jump=Math.sin(k*Math.PI)*70);}}
   // 2) Gongütés: a hős 1 körig nem használhat képességet és limitet (csak alaptámadás, tárgy, védekezés)
   if(sk&&sk.silence&&t&&t.alive&&S.heroes.includes(t))addStatus(t,'silence',2);
 }catch(e){console.error(e)}return r;};}
if(ESK.gongstrike)ESK.gongstrike.desc='A gong hangja 1 körig elnémítja a hősöket: csak alaptámadás, tárgy vagy védekezés.';
{const mm=menuMain;menuMain=function(h){const r=mm.apply(this,arguments);try{if(h&&h.st&&h.st.silence){
   setPrompt(`${h.name} elnémult a gongtól: most nem használhat képességet, limitet és idézést – csak alaptámadás, tárgy vagy védekezés.`);
   for(const b of btnsEl.querySelectorAll('button'))if(/Képességek|LIMIT|Idézés/.test(b.textContent)){b.disabled=true;b.style.opacity=.4;}}}catch(e){}return r;};}
{const ms=menuSkills;menuSkills=function(h){if(h&&h.st&&h.st.silence)return menuMain(h);return ms.apply(this,arguments);};}

// 3) Titkos pálya: X-2 Az Ősi Habverő-műhely – a 11-2 után nyílik a 3. térképen
SECRET3.start=[{who:'Öreg Matcha-gólem',text:'HAB… VERÉS… FOLYAMATBAN. HÁROMSZÁZ ÉVE. SENKI… NEM KÓSTOLTA MEG.'},{who:'Kaelen',text:'Ez verte az első matchát ebben a völgyben.'},{who:'Zordon',text:'Akkor megérdemli, hogy végre leálljon.'}];
SECRET3.end=[{who:'Öreg Matcha-gólem',text:'HAB… KÉSZ. KÉRLEK… KÓSTOLJÁTOK MEG. *sssz*'},{who:'Jázmin',text:'…Ez a legfinomabb matcha, amit valaha ittam. És háromszáz éves.'}];
SECRET3.intro='A Matcha-kádak mögötti lezárt ajtó egy régi műhelybe vezet. A legelső habverő-gólem még mindig dolgozik. Jutalom: 5000 arany, 3 Elixír és 3 Élet-elixír.';
{const inc=ZONES[10].levels.includes;ZONES[10].levels.includes=function(L){return L===SECRET3||inc.call(this,L);};}
const secret3Open=()=>cleared('11-2');
{const SP=[90,40];
 const ms=mapScreen;mapScreen=function(zi){const r=ms.apply(this,arguments);try{const view=ov.querySelector('.map-view');
   if(view&&secret3Open()&&Math.floor((S.mapZone||0)/4)===2){const done=cleared(SECRET3.id);
     const b=btn('mnode boss'+(done?' done':' next'),done?'✓':'?',()=>{S.mapZone=10;startLevel(SECRET3);});b.style.left=SP[0]+'%';b.style.top=SP[1]+'%';
     const label='Titkos pálya · '+SECRET3.name+(done?' · ✓ teljesítve':' – TITKOS FŐELLENSÉG'),info=view.querySelector('.map-info');b.title=label;
     if(info)for(const ev of ['mouseenter','focus'])b.addEventListener(ev,()=>{info.textContent=label;});view.appendChild(b);
     const l=document.createElement('div');l.className='map-secret';l.textContent=done?'Titkos pálya ✓':'Titkos főellenség!';l.style.left=SP[0]+'%';l.style.top=`calc(${SP[1]}% - clamp(16px,3vw,26px))`;l.style.transform='translate(-50%,-100%)';view.appendChild(l);}
 }catch(e){console.error(e)}return r;};}
{const v0=victory;victory=async function(){
   if(S.level===SECRET3&&!cleared(SECRET3.id)){S.gold+=5000;S.inv.elixir=(S.inv.elixir||0)+3;S.inv.lifeelixir=(S.inv.lifeelixir||0)+3;showBanner('Kincs: 5000 arany, 3 Elixír, 3 Élet-elixír!',true);}
   return v0.apply(this,arguments);};}

// 4) Hatfős csapat (Lili visszatérése után): ketten pihennek. A beállók (Jázmin, Kaelen) a pihenő alaphősök helyére állnak, hogy ne takarják egymást.
const EXTRA_HEROES=['monk','druid'];
function benchList(){const all=joinedRoster(),need=Math.max(0,all.length-4),types=all.map(h=>h.type),n=ngp();
  const out=[n.bench,n.bench2].filter((t,i,a)=>t&&types.includes(t)&&a.indexOf(t)===i);
  for(const t of ['druid','monk',...types])if(out.length<need&&!out.includes(t)&&types.includes(t))out.push(t);return out.slice(0,need);}
function placeParty(){const all=S.roster||S.heroes;for(const x of all){x.x=x.d.pos[0];x.y=x.d.pos[1];}
  const act=S.heroes,ex=act.filter(h=>EXTRA_HEROES.includes(h.type));
  const empty=['wizard','witch','orc','fairy'].filter(t=>!act.some(h=>h.type===t));
  ex.forEach((h,i)=>{if(empty[i])[h.x,h.y]=monkSlot(empty[i]);});}
arenaPlace=placeParty;
{const sp=syncParty;syncParty=function(){const r=sp.apply(this,arguments);try{if(S.arena)return r;const all=joinedRoster();if(all.length>4){const b=benchList(),act=all.filter(h=>!b.includes(h.type)).slice(0,4);
   if(S.heroes.length!==act.length||S.heroes.some((h,i)=>h!==act[i])){S.heroes=act;buildHUD();}placeParty();}}catch(e){console.error(e)}return r;};}
{const bs=battleSwap;battleSwap=function(h,bench){const r=bs.apply(this,arguments);try{const all=joinedRoster(),out=all.filter(x=>!S.heroes.includes(x)).map(x=>x.type);const n=ngp();n.bench=out[0]||null;n.bench2=out[1]||null;ngpSet(n);placeParty();}catch(e){}return r;};}
{const ps=partyScreen;partyScreen=function(first){const all=joinedRoster();if(all.length<6)return ps.apply(this,arguments);
  S.over=true;S.enemies=[];setPrompt('Csapat');setButtons([]);let sel=first&&!ngp().bench2?[]:benchList();
  const draw=()=>{overlay([['p','ov-sub','Hatan vagytok, négyen harcoltok'],['h1','ov-title map-title','Kik pihenjenek?'],['p','ov-text','Koppints arra a két hősre, aki most kimarad a csatákból. A pihenők is kapnak szintet, és a boltban is vásárolhatnak. A térképen bármikor cserélhetsz.']],
      [{label:'Rendben',on:()=>{if(sel.length!==2)return;const n=ngp();n.bench=sel[0];n.bench2=sel[1];ngpSet(n);syncParty();mapScreen();}}]);
    const box=ov.querySelector('.ov-box'),btns=box.querySelector('.ov-btns'),row=el('div','zones');
    for(const h of all){const on=sel.includes(h.type),c=btn('zone-chip'+(on?' on':''),(on?'💤 ':'')+h.name+' · '+h.d.cls+' · '+h.lvl+'. szint',()=>{if(sel.includes(h.type))sel=sel.filter(t=>t!==h.type);else{sel.push(h.type);if(sel.length>2)sel.shift();}draw();});
      c.style.fontSize='14px';c.style.padding='8px 14px';row.appendChild(c);}
    box.insertBefore(row,btns);if(sel.length!==2){const ok=btns.querySelector('button');if(ok)ok.disabled=true;}};
  draw();};}
// amikor Lili visszatér (6 hős), a térképre érve egyszer ki kell választani a két pihenőt
{const ms=mapScreen;mapScreen=function(zi){try{if(!S.arena&&S.roster&&joinedRoster().length>5&&!ngp().bench2&&!(S.joinMsg&&S.joinMsg.length)){if(zi!=null)S.mapZone=zi;return partyScreen(true);}}catch(e){console.error(e)}return ms.apply(this,arguments);};}
