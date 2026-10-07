
// ===== 15. kör: fejlesztések =====
const R14_LS=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}};

// ---- 1) főellenségek: rövidebb, de izgalmasabb csaták – kevesebb életerő, a felénél dühroham (fázisváltás)
{const mkB=mkEnemy;mkEnemy=function(){const e=mkB.apply(this,arguments);try{if(e&&e.d&&e.d.boss&&!S.arena){e.maxHp=Math.round(e.maxHp*.8);e.hp=Math.min(e.hp,e.maxHp);
  if(e.type==='oolong'||e.type==='queenbee'){e.atk*=.85;e.mag*=.85;}}}catch(err){}return e;};}
const R14_OWNPHASE=new Set(['oak','morcus','kamilla','espresso']);
async function r14Enrage(e){e.enraged=true;S.banner=null;await dimTo(.6,'60,0,0',250);showBanner(`${e.name} feldühödött!`,true);sfx('growl');sfx('boom');rumble(1.4,14);flash('255,60,40',.35,.2);
  const st={t:0};effects.push({update(dt){st.t+=dt;if(st.t<1.2)for(let i=0;i<4;i++){const a=rnd(0,6.28),r=rnd(80,180);part({x:cx(e)+Math.cos(a)*r,y:midY(e)+Math.sin(a)*r,vx:-Math.cos(a)*r*1.8,vy:-Math.sin(a)*r*1.8,life:.45,size:rnd(3,6),rgb:pick(['255,80,40','255,200,80'])});}return st.t<1.4;},
    draw(){const k=Math.min(1,st.t/.3)*Math.max(0,1-(st.t-1)/.4);ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*(1+.4*k),'255,60,30',.55*k);ctx.restore();}});
  soundBlast(cx(e),midY(e),'255,90,50',360,700);e.atk*=1.25;e.mag*=1.25;popLabel(e,'DÜHROHAM: ERŐ+','#ff7a6a');await wait(1300);await dimTo(0,null,250);}
{const eA=enemyAct;enemyAct=async function(e){if(e&&e.alive&&e.d&&e.d.boss&&!e.enraged&&!R14_OWNPHASE.has(e.type)&&e.hp<=e.maxHp*.5)await r14Enrage(e);return eA.apply(this,arguments);};}
// dühroham alatt halvány vörös izzás
{const deR=drawEntity;drawEntity=function(e){if(e&&e.enraged&&e.alive&&!FRONT_DRAW){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.75,'255,60,30',.18+.06*Math.sin(T*6));ctx.restore();}return deR.apply(this,arguments);};}

// ---- 2) gyenge pont jelzés: kis elem-jelvények az ellenfél fölött (könnyű szinten mindig, egyébként egy találat után)
const R14_WEAK=R14_LS('nagy-kaverablas-gyenge')||{};
const R14_ELCOL={fire:'#ff7a3a',ice:'#7ad0ff',thunder:'#ffe14a',holy:'#fff2b0',dark:'#b07aff',poison:'#9be04e',phys:'#d8dce6',water:'#5aa8ff',nature:'#7bd04a',earth:'#c8955a',lava:'#ff6a20',rust:'#e08c3c',none:'#e06080'};
const R14_ELABBR={fire:'tűz',ice:'jég',thunder:'vill',holy:'fény',dark:'söt',poison:'méreg',phys:'fegyv',water:'víz',nature:'term',earth:'föld',lava:'láva',rust:'rozsda'};
function r14Weak(e){const o=elemOf(e)||{};return Object.keys(o).filter(k=>o[k]>=1.3&&R14_ELABBR[k]&&!(k==='earth'&&o.phys>=1.3)&&!(k==='lava'&&o.fire>=1.3));}
{const hW=hit;hit=function(u,t,sk){const r=hW.apply(this,arguments);try{if(t&&t.kind==='enemy'&&sk&&sk.elem){const o=elemOf(t)||{};if((o[sk.elem]||1)>=1.3){const k=t.type+':'+sk.elem;if(!R14_WEAK[k]){R14_WEAK[k]=1;R14_LS('nagy-kaverablas-gyenge',R14_WEAK);popLabel(t,'GYENGE PONT: '+(ELEM_NAMES[sk.elem]||sk.elem).toUpperCase(),'#ffe070');}}}}catch(err){}return r;};}
{const deW=drawEntity;drawEntity=function(e){const r=deW.apply(this,arguments);try{if(e&&e.kind==='enemy'&&e.alive&&!S.over&&!FRONT_DRAW&&!e.d.passive){const ws=r14Weak(e).filter(k=>S.diff===0||R14_WEAK[e.type+':'+k]);
  if(ws.length){const y=topY(e)-34,w=ws.length*24;ctx.save();ws.forEach((k,i)=>{const x=cx(e)-w/2+12+i*24;ctx.fillStyle='rgba(20,10,30,.8)';ctx.beginPath();ctx.arc(x,y,11,0,6.29);ctx.fill();ctx.strokeStyle=R14_ELCOL[k]||'#fff';ctx.lineWidth=2.5;ctx.stroke();
    ctx.fillStyle=R14_ELCOL[k]||'#fff';ctx.beginPath();ctx.arc(x,y,5.5,0,6.29);ctx.fill();});ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillStyle='#ffe070';ctx.strokeStyle='#1a0f24';ctx.lineWidth=3;ctx.strokeText('gyenge:',cx(e),y-15);ctx.fillText('gyenge:',cx(e),y-15);ctx.restore();}}}catch(err){}return r;};}

// ---- 3) sebesség: 1× → 2× → 3×
{const sp=document.getElementById('t-speed');if(sp){const fresh=sp.cloneNode(true);sp.parentNode.replaceChild(fresh,sp);try{const v=+localStorage.getItem('nagy-kaverablas-sebesseg');S.speed=[1,2,3].includes(v)?v:1;}catch(e){}
  const show=()=>{fresh.textContent=S.speed===1?'▶ 1×':S.speed===2?'⏩ 2×':'⏩ 3×';fresh.classList.toggle('on',S.speed>1);};show();
  fresh.addEventListener('click',()=>{S.speed=S.speed===1?2:S.speed===2?3:1;try{localStorage.setItem('nagy-kaverablas-sebesseg',String(S.speed));}catch(e){}show();});
  const rs=refreshSettings;refreshSettings=function(){const r=rs.apply(this,arguments);show();return r;};}}

// ---- 4) mentés több helyre (3 mentőhely)
let R14_SLOT=1;try{R14_SLOT=+localStorage.getItem('nagy-kaverablas-mentohely')||1;}catch(e){}
{const SP=Storage.prototype,gi=SP.getItem,si=SP.setItem,ri=SP.removeItem,map=k=>(k===SAVE_KEY&&R14_SLOT>1)?k+'-'+R14_SLOT:k;
  SP.getItem=function(k){return gi.call(this,map(k));};SP.setItem=function(k,v){return si.call(this,map(k),v);};SP.removeItem=function(k){return ri.call(this,map(k));};}
{const tS=titleScreen;titleScreen=function(){const r=tS.apply(this,arguments);try{const box=ov.querySelector('.ov-box');if(box){const row=el('div','zones','');row.style.cssText='display:flex;gap:6px;justify-content:center;align-items:center;flex-wrap:wrap';row.appendChild(el('span','hint','Mentőhely:'));
  for(let i=1;i<=3;i++){let info='üres';try{R14_SLOT=i;const d=loadGame();info=d?`${(d.cleared||[]).length} pálya`:'üres';}catch(e){}R14_SLOT=+localStorage.getItem('nagy-kaverablas-mentohely')||1;
    const b=btn('zone-chip'+(R14_SLOT===i?' on':''),`${i}. (${info})`,()=>{R14_SLOT=i;try{localStorage.setItem('nagy-kaverablas-mentohely',String(i));}catch(e){}titleScreen();});row.appendChild(b);}
  const anchor=box.querySelector('.ov-btn');if(anchor&&anchor.parentNode===box)box.insertBefore(row,anchor.nextSibling);else box.appendChild(row);}}catch(err){console.error(err);}return r;};}

// ---- 5) bestiárium: a legyőzött ellenfelek gyűjteménye (kép, gyengeség, leírás)
const R14_BEAST=R14_LS('nagy-kaverablas-bestiarium')||{};
{const dB=die;die=function(t){const r=dB.apply(this,arguments);try{if(t&&t.kind==='enemy'&&!S.arena&&EN_DEF[t.type]){R14_BEAST[t.type]=(R14_BEAST[t.type]||0)+1;R14_LS('nagy-kaverablas-bestiarium',R14_BEAST);}}catch(e){}return r;};}
function r14Bestiary(back){const box=el('div','ov-box shop','');const list=el('div','shop-list','');const all=foesByZone();let n=0,tot=0;
  for(const [z,types] of all){list.appendChild(el('div','shop-head',z.name));for(const t of types){tot++;const d=EN_DEF[t],k=R14_BEAST[t];const row=el('div','shop-row','');row.style.gridTemplateColumns='64px minmax(0,1fr)';
    const cv=document.createElement('canvas');cv.width=64;cv.height=64;const g=cv.getContext('2d');const im=ENEMY_SPR[(SPR_ALIAS[t]||t)];if(im){const s=Math.min(60/im.width,60/im.height);g.save();if(!k){g.filter='brightness(0)';g.globalAlpha=.5;}g.drawImage(im,32-im.width*s/2,62-im.height*s,im.width*s,im.height*s);g.restore();}
    const info=el('div','shop-info','');if(k){n++;const ws=Object.entries(d.elem||{}).filter(([e,m])=>m>=1.3).map(([e])=>ELEM_NAMES[e]||e),rs=Object.entries(d.elem||{}).filter(([e,m])=>m<=.6).map(([e])=>ELEM_NAMES[e]||e);
      info.appendChild(el('div','shop-name',`${d.name}${d.boss?' 👑':''}`));info.appendChild(el('div','shop-desc',(d.info||'')+(ws.length?` Gyenge: ${ws.join(', ')}.`:'')+(rs.length?` Ellenáll: ${rs.join(', ')}.`:'')+` Legyőzve: ${k}×.`));}
    else{info.appendChild(el('div','shop-name','???'));info.appendChild(el('div','shop-desc','Még nem győzted le.'));}
    row.appendChild(cv);row.appendChild(info);list.appendChild(row);}}
  overlay([],[]);const o=ov.querySelector('.ov-box');if(o)o.replaceWith(box);else ov.appendChild(box);
  box.appendChild(el('h1','ov-title','Bestiárium'));box.appendChild(el('p','gold',`${n} / ${tot} ellenfél`));box.appendChild(list);box.appendChild(btn('ov-btn','Vissza',back||(()=>mapScreen())));}
// ---- 6) napi kihívás: minden nap más ellenfél-csapat, egyszer naponta aranyjutalom
function r14DailyLevel(){const d=new Date(),seed=d.getFullYear()*1000+d.getMonth()*40+d.getDate();let s=seed;const R=()=>{s=(s*9301+49297)%233280;return s/233280;};
  const cl=ZONES.flatMap(z=>z.levels).filter(l=>cleared(l.id));const lv=cl.length?cl[cl.length-1]:ZONES[0].levels[0];const zi=Math.max(0,ZONES.indexOf(zoneOf(lv)));
  const pool=foesByZone().slice(0,zi+1).flatMap(([z,ts])=>ts).filter(t=>!EN_DEF[t].boss&&!EN_DEF[t].miniboss&&!EN_DEF[t].passive&&!['squirrel','mushking','acorn','root','kanna'].includes(t));const pickT=()=>pool[Math.floor(R()*pool.length)]||'slime';
  return {id:'napi',daily:true,name:'Napi kihívás',theme:lv.theme,elvl:Math.max(3,lv.elvl+2),intro:'Minden nap más ellenfelek várnak. Az első győzelemért ma 500 arany jár!',battles:[[pickT(),pickT(),pickT()],[pickT(),pickT(),pickT()]]};}
{const vD=victory;victory=async function(){const L=S.level;if(!L||!L.daily)return vD.apply(this,arguments);const last=S.battleIdx>=L.battles.length-1;const r=await vD.apply(this,arguments);
  if(last){S.save.cleared=S.save.cleared.filter(x=>x!=='napi');const today=new Date().toDateString(),got=R14_LS('nagy-kaverablas-napi');if(got!==today){R14_LS('nagy-kaverablas-napi',today);S.gold+=500;showBanner('Napi jutalom: +500 arany!',true);sfx('coin');}saveGame();}return r;};}
// ---- térkép: Bestiárium és Napi kihívás gomb
{const mB=mapScreen;mapScreen=function(zi){const r=mB.apply(this,arguments);try{const bar0=document.querySelector('.map-bar'),bar=bar0&&(bar0.querySelector('.ov-btns')||bar0);if(bar&&!bar0.querySelector('.r14b')){
  const b1=btn('ov-btn sec r14b','📖 Bestiárium',()=>r14Bestiary(()=>mapScreen()));const b2=btn('ov-btn sec r14b','⭐ Napi kihívás',()=>startLevel(r14DailyLevel()));
  for(const b of [b1,b2]){b.style.cssText='font-size:14px;padding:6px 12px';bar.appendChild(b);}}}catch(err){console.error(err);}return r;};}

// ---- 7) páros támadások: két hős együtt, mindkettőnek 50% limit kell
const PAIRS=[
 {a:'wizard',b:'witch',name:'Villámátok',elem:'thunder',pow:1.6,status:['curse',.8,1],rgb:'190,110,255',desc:'Zordon villáma és Morgána átka egyszerre: lila villámok csapnak minden ellenségbe, és átok alá kerülnek.'},
 {a:'fairy',b:'orc',name:'Tündérököl',elem:'holy',pow:1.7,rgb:'255,230,140',desc:'Lili aranyfénnyel tölti fel Grogot, aki a földbe csap: fény-lökéshullám minden ellenségre, a csapat kicsit gyógyul.',heal:.12},
 {a:'wizard',b:'fairy',name:'Csillagözön',elem:'holy',pow:1.6,rgb:'255,245,180',desc:'Zordon és Lili hullócsillagokat hív: minden ellenséget csillagzápor ér.'},
 {a:'witch',b:'orc',name:'Árnyroham',elem:'dark',pow:1.8,rgb:'150,70,230',desc:'Morgána árnyba burkolja Grogot, aki végigrohan az ellenségeken.'},
 {a:'monk',b:'fairy',name:'Lótuszvihar',elem:'nature',pow:1.6,rgb:'160,240,170',desc:'Jázmin nyilai és Lili tündérpora lótuszszirom-viharrá állnak össze.'},
 {a:'monk',b:'wizard',name:'Sárkánynyíl',elem:'fire',pow:1.7,rgb:'255,150,60',desc:'Zordon tűzzel tölti meg Jázmin nyilát: lángoló sárkánynyíl szántja végig az ellenségeket.'}];
function r14Pair(h){if(!h||h.limit<50)return null;for(const p of PAIRS){const other=p.a===h.type?p.b:p.b===h.type?p.a:null;if(!other)continue;const o=S.heroes.find(x=>x.type===other&&x.alive&&x.limit>=50);if(o)return {p,o};}return null;}
{const mmP=menuMain;menuMain=function(h){mmP(h);try{const pr=r14Pair(h);if(!pr||typeof btnsEl.insertBefore!=='function')return;const {p,o}=pr;
  const b=document.createElement('button');b.type='button';b.className='cbtn limit';const l=document.createElement('span');l.className='bl';l.textContent='PÁROS: '+p.name;b.appendChild(l);const sb=document.createElement('span');sb.className='bs';sb.textContent='+ '+o.name+' · 50% limit';b.appendChild(sb);
  const sk={id:'pair',name:p.name,tgt:'enemies',kind:'mag',pow:p.pow,elem:p.elem,status:p.status,anim:'pairAtk',pair:p,partner:o,desc:p.desc};
  b.addEventListener('click',()=>finish({type:'skill',sk,targets:S.enemies.filter(e=>e.alive)}));b.addEventListener('mouseenter',()=>{descEl.textContent=p.desc;});btnsEl.insertBefore(b,btnsEl.firstChild);}catch(err){console.error(err);}};}
{const pP=perform;perform=async function(h,act){if(act&&act.sk&&act.sk.pair){const o=act.sk.partner;const L0=h.limit,L1=o.limit;const r=await pP.apply(this,arguments);h.limit=Math.max(0,L0-50);o.limit=Math.max(0,L1-50);updateHUD();return r;}return pP.apply(this,arguments);};}
A.pairAtk=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const p=sk.pair,o=sk.partner,rgb=p.rgb;await dimTo(.6,'10,5,25',250);showBanner('Páros támadás: '+p.name,true);
  u.pose='cast';o.pose='cast';magicCircle(u,rgb,1100);magicCircle(o,rgb,1100);sfx('limit');
  // a két hős energiája összefonódik a magasban
  const a=handPos(u),b=handPos(o),M={x:Math.max(a.x,b.x)+120,y:Math.min(a.y,b.y)-110,r:0};
  effects.push({t:0,update(dt){this.t+=dt;if(this.t<1.1)for(const q of [a,b])part({x:q.x,y:q.y,vx:(M.x-q.x)/.4+rnd(-40,40),vy:(M.y-q.y)/.4+rnd(-40,40),life:.4,size:rnd(3,6),rgb:pick([rgb,'255,255,255']),shape:'star'});return this.t<1.6;},
    draw(){const k=Math.min(1,this.t/1.1);ctx.save();ctx.globalCompositeOperation='lighter';glow(M.x,M.y,40+80*k,rgb,.8);glow(M.x,M.y,20+30*k,'255,255,255',.9);ctx.restore();}});
  await wait(1100);u.pose='attack';o.pose='attack';sfx(ELEM_SFX[p.elem]||'boom');
  for(const t of al){const x=cx(t),y=midY(t);
    if(p.elem==='thunder'){effects.push({t:0,update(dt){this.t+=dt;return this.t<.7;},draw(){if(Math.random()<.7){ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<2;i++)zapStroke(zapPath(M.x,M.y,x+rnd(-20,20),y+rnd(-30,30),24),6,1);glow(x,y,90,rgb,.6);ctx.restore();}}});sfx('thunder');}
    else if(p.name==='Csillagözön'){for(let i=0;i<5;i++)flyObj({x:x+rnd(-200,-60),y:-40},{x:x+rnd(-30,30),y:y+rnd(-40,30)},380,(px,py,r,k)=>qStar(px,py,26,k*12),{trail:['255,240,170','255,255,255']});}
    else if(p.name==='Árnyroham'||p.name==='Tündérököl'){}
    else await flyObj(M,{x,y},300,(px,py)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(px,py,50,rgb,.8);glow(px,py,18,'255,255,255',1);ctx.restore();},{trail:[rgb,'255,255,255']});}
  if(p.name==='Árnyroham'||p.name==='Tündérököl'){const g=S.heroes.find(x=>x.type==='orc');if(g){const dx=Math.max(...al.map(t=>t.x))-g.x+60;ghosts(g,500);await tween(420,k=>{g.ox=dx*easeIO(k);g.jump=Math.sin(k*Math.PI)*60;});g.jump=0;await tween(300,k=>{g.ox=dx*(1-easeIO(k));});g.ox=0;}}
  await wait(380);flash('255,255,255',.5,.2);shake(18);hitStop(120);
  for(const t of al){soundBlast(cx(t),midY(t),rgb,240,520);sparks(cx(t),midY(t),[rgb,'255,255,255'],30,560);toss(t,40,340);hit(u,t,sk);await wait(90);}
  if(p.heal)healAll(u,p.heal);await wait(700);u.pose='idle';o.pose='idle';await dimTo(0,null,300);};
NOFX.add('pairAtk');

// ---- egyforma animációjú képességek szétválasztása: Gőzrúgás saját gőzös pörgőrúgás, Tájfun saját forgószél-sorozat
A.steamKick=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('whoosh');const x0=u.x;
  for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){const dx=t.x-x0-90;ghosts(u,240);await tween(200,k=>{u.ox=dx*easeIO(k);u.jump=Math.sin(k*Math.PI)*50;});
    await tween(260,k=>{u.spin=Math.PI*2*k;});u.spin=0;sfx('splash');shake(8);t.hurt=.3;puffs(cx(t),midY(t),10,['245,245,250','230,236,244'],[22,36],{up:140});splat(cx(t),midY(t),['200,230,255','255,255,255'],14,320,'drop');soundBlast(cx(t),midY(t),'220,240,255',140,320);toss(t,30,260);hit(u,t,sk);}
  await tween(300,k=>{u.ox*=1-k;});u.ox=0;u.jump=0;u.pose='idle';};
if(SK.steamkick)SK.steamkick.anim='steamKick';
A.typhoonR=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='cast';sfx('wind');const {mx,gy}=grp(al);const st={t:0,on:true,x:mx+260};
  effects.push({update(dt){st.t+=dt;st.x-=dt*320;for(let i=0;i<10;i++){const a=st.t*12+i*.63,h=rnd(0,1);part({x:st.x+Math.cos(a)*(30+h*90),y:gy-h*300,vx:-Math.sin(a)*200,vy:-rnd(20,60),life:.4,size:rnd(4,8),rgb:pick(['200,240,200','255,255,255','140,200,120']),add:false,shape:pick(['leaf','puff'])});}return st.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(st.x,gy-150);ctx.scale(.55,1.6);glow(0,0,130,'210,240,210',.35);ctx.restore();}});
  const done=new Set();await tween(1400,k=>{for(const t of al)if(!done.has(t)&&st.x<cx(t)+30){done.add(t);shake(8);sfx('wind');tween(500,q=>{t.oy=-80*Math.sin(q*Math.PI);t.spin=q*Math.PI*2;}).then(()=>{t.oy=0;t.spin=0;});hit(u,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);st.on=false;u.pose='idle';};
if(SK.typhoon)SK.typhoon.anim='typhoonR';

// ---- fekvő telefon: a hőskártyák a jobb oldali oszlopba kerülnek, így a csatatér nagyobb; a bolt tömörebb
{const st=document.createElement('style');st.textContent=`@media (orientation:landscape) and (max-height:520px){
  .game{grid-template-columns:min(calc((100vh - 14px)*16/9),calc(100% - 238px)) minmax(0,1fr)!important}
  @supports (height:100dvh){.game{grid-template-columns:min(calc((100dvh - 14px)*16/9),calc(100% - 238px)) minmax(0,1fr)!important}}
  .stage{grid-row:1/3!important}.party{grid-column:2!important;grid-row:1!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}.cmd{grid-row:2!important}
  .shop .ov-title{font-size:22px}.shop{gap:4px}.shop-list{grid-template-columns:1fr 1fr}.shop-row{padding:5px 8px}.shop-desc{font-size:11.5px}}`;document.head.appendChild(st);}
