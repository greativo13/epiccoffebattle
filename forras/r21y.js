// ===== 38. kör: izgalmasabb harc – nagyobb tét, töltött támadások, elit ellenfelek, csatakihívások =====

// ---------------------------------------------------------------------------------------------
// 1) Nagyobb tét: az ellenfelek ütése eddig a hős életerejének csak 5–10%-a volt (könnyű szinten), így a gyógyítás és
//    a védekezés fölösleges volt. Most minden szinten másfélszer nagyobbat ütnek (könnyű: ~8–15%, normál: ~13–25%).
const R21_EATK=1.5;
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{if(u&&t&&u.kind==='enemy'&&t.kind==='hero'&&r&&typeof r.dmg==='number'&&r.dmg>0&&!S.arena)r.dmg=Math.max(1,Math.round(r.dmg*R21_EATK));}catch(e){}return r;};}

// ---------------------------------------------------------------------------------------------
// 2) Töltött támadás: néha egy ellenfél ERŐT GYŰJT (vörösen izzik, remeg, a feje fölött ⚠). A következő körében a legerősebb
//    támadását duplán zúdítja a csapatra – HACSAK meg nem szakítod: üsd a gyengeségével (▲), egy LIMIT-tel/páros támadással,
//    vagy sebezd meg az életereje ötödével.
const r21Dmgs=e=>(e.d&&Array.isArray(e.d.skills)?e.d.skills.map(x=>x[0]).filter(id=>ESK[id]&&(ESK[id].kind==='phys'||ESK[id].kind==='mag')):[]);
{const ea=enemyAct;enemyAct=async function(e){try{
    if(e&&e._charge&&e.alive){const ids=r21Dmgs(e);e._charge=0;const id=ids.sort((a,b)=>(ESK[b].pow||0)-(ESK[a].pow||0))[0];const t=aiTarget(e);
      if(id&&t){const sk=Object.assign({},ESK[id],{pow:(ESK[id].pow||1)*2,name:ESK[id].name+' (feltöltve)'});showBanner(`⚠ ${e.name}: ${ESK[id].name}!`,true);shake(14);flash('255,80,40',.25,.12);sfx('roar');await useEnemySkill(e,sk,t);return;}}
    if(e&&e.alive&&!S.arena&&S.round>=2&&!e.d.passive&&r21Dmgs(e).length&&!S.enemies.some(x=>x.alive&&x._charge)){
      const ch=(e.d.boss||e.d.miniboss)?.3:.16;if(Math.random()<ch){e._charge=1;e._chDmg=0;popLabel(e,'⚠ ERŐT GYŰJT!','#ff7a4a');sfx('growl');setPrompt(`${e.name} erőt gyűjt! Üsd a gyengeségével, és megszakad!`);await wait(900);return;}}
  }catch(err){}return ea.apply(this,arguments);};}
{const h0=hit;hit=function(u,t,sk){const hp0=t?t.hp:0;const r=h0.apply(this,arguments);try{if(t&&t._charge&&t.alive&&u&&u.kind==='hero'){const el=elemOf(t)||{},m=sk&&sk.elem&&el[sk.elem];t._chDmg=(t._chDmg||0)+Math.max(0,hp0-t.hp);
    if((m&&m>1)||(sk&&(sk.isLimit||sk.pair))||t._chDmg>=t.maxHp*.2){t._charge=0;popLabel(t,'MEGSZAKÍTVA!','#7dff9a');sfx('hit');shake(10);hitStop(90);t.hurt=.7;
      const x=cx(t),y=midY(t),E={k:0};R18E({update(dt){E.k+=dt/.5;return E.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,80+160*E.k,'140,255,160',.6*(1-E.k));ctx.restore();}});}}}catch(e){}return r;};}
// látvány: vörös izzás + remegés, és a szándék-buborékban ⚠ NAGY ÜTÉS
{const de=drawEntity;drawEntity=function(e){if(!e||!e._charge||!e.alive)return de.apply(this,arguments);const t=performance.now()/1000,pul=.5+.5*Math.sin(t*10);
  ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.75,'255,70,30',.25+.25*pul);ctx.restore();const ox=e.ox||0;e.ox=ox+Math.sin(t*55)*2.5;try{return de.apply(this,arguments);}finally{e.ox=ox;}
  };}
{const io=r21IntentOf;r21IntentOf=function(e){if(e&&e._charge)return {ic:'⚠️',c:'#ff6a3a',tx:'NAGY ÜTÉS'};return io.apply(this,arguments);};}

// ---------------------------------------------------------------------------------------------
// 3) Elit ellenfél: csatánként legfeljebb egy (18% eséllyel) arany keretes, erősebb ellenfél egy különleges tulajdonsággal.
//    Kétszer annyi aranyat és tapasztalatot ad.
const R21_ELITE={pancel:{n:'Páncélos',d:'kevesebbet sebződik'},tuske:{n:'Tüskés',d:'aki fegyverrel üti, megsérül'},gyogy:{n:'Gyógyuló',d:'körönként gyógyul'},robban:{n:'Robbanó',d:'halálakor felrobban'}};
{const sb=startBattle;startBattle=function(){const r=sb.apply(this,arguments);try{if(!S.arena&&S.level&&!S.level.boss){const c=S.enemies.filter(e=>e.alive&&!e.d.boss&&!e.d.miniboss&&!e.d.passive);
    if(c.length&&Math.random()<.18){const e=pick(c),k=pick(Object.keys(R21_ELITE));e._elite=k;e.maxHp=Math.round(e.maxHp*1.5);e.hp=e.maxHp;e.gold=Math.round((e.gold||0)*2);e.xp=Math.round((e.xp||0)*2);e.name='Elit '+e.name;
      setTimeout(()=>{try{popLabel(e,'★ ELIT – '+R21_ELITE[k].n,'#ffd84a');setPrompt(`Elit ellenfél: ${e.name} (${R21_ELITE[k].n.toLowerCase()}: ${R21_ELITE[k].d}). Dupla zsákmány!`);}catch(err){}},1600);}}}catch(e){}return r;};}
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{if(t&&t._elite==='pancel'&&r&&r.dmg>0)r.dmg=Math.max(1,Math.round(r.dmg*.65));}catch(e){}return r;};}
{const h0=hit;hit=function(u,t,sk){const hp0=t?t.hp:0;const r=h0.apply(this,arguments);try{if(t&&t._elite==='tuske'&&u&&u.kind==='hero'&&u.alive&&sk&&sk.kind==='phys'){const d=Math.max(1,Math.round((hp0-t.hp)*.2));if(d>1)recoil(u,d,'TÜSKÉK!','#ffb36b');}}catch(e){}return r;};}
{const ts=tickStatuses;tickStatuses=async function(){try{for(const e of S.enemies)if(e.alive&&e._elite==='gyogy'&&e.hp<e.maxHp){const g=Math.min(e.maxHp-e.hp,Math.round(e.maxHp*.08));e.hp+=g;popNum(e,g,'heal');}}catch(e){}return ts.apply(this,arguments);};}
{const d0=die;die=function(t){const was=t&&t.alive&&t._elite==='robban';const r=d0.apply(this,arguments);try{if(was){const x=cx(t),y=midY(t);shake(18);flash('255,200,120',.4,.15);sfx('boom');
    for(let i=0;i<30;i++){const a=rnd(0,6.28),v=rnd(150,500);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2,life:rnd(.5,.9),size:rnd(30,60),grow:40,rgb:pick(['255,160,60','255,110,30']),shape:'fire'});}
    for(const h of S.heroes)if(h.alive){const d=Math.max(1,Math.round(h.maxHp*.1));recoil(h,d,'ROBBANÁS!','#ff9a4a');}}}catch(e){}return r;};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{if(e&&e._elite&&e.alive){const t=performance.now()/1000;ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(e),midY(e),e.h*e.scale*.7,'255,205,80',.16+.08*Math.sin(t*4));ctx.restore();
    if(Math.random()<.3)part({x:cx(e)+rnd(-e.w*e.scale*.5,e.w*e.scale*.5),y:e.y+e.oy-rnd(0,e.h*e.scale),vx:rnd(-10,10),vy:-rnd(30,70),life:.8,size:rnd(1.5,3),rgb:'255,220,120'});}}catch(err){}return r;};}

// ---------------------------------------------------------------------------------------------
// 4) Csatakihívás: minden csata elején egy véletlen mellékfeladat (bal fent kiírva); ha sikerül, bónusz arany jár.
const R21_CH=[{k:'gyors',t:'Nyerj 3 kör alatt'},{k:'senki',t:'Ne essen el senki'},{k:'gyenge',t:'Találj el 2 gyenge pontot'},{k:'ital',t:'Nyerj tárgy nélkül'}];
{const sb=startBattle;startBattle=function(){const r=sb.apply(this,arguments);try{if(!S.arena){const c=pick(R21_CH);S._r21ch={k:c.k,t:c.t,ok:true,weak:0,tok:{}};}}catch(e){}return r;};}

{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{const C=S._r21ch;if(C&&C.k==='gyenge'&&u&&u.kind==='hero'&&t&&t.kind==='enemy'&&sk&&sk.elem){const m=(elemOf(t)||{})[sk.elem];if(m&&m>1)C.weak++;}}catch(e){}return r;};}
{const d0=die;die=function(t){try{const C=S._r21ch;if(C&&C.k==='senki'&&t&&t.kind==='hero'&&t.alive)C.ok=false;}catch(e){}return d0.apply(this,arguments);};}
{const pf=perform;perform=async function(h,act){try{const C=S._r21ch;if(C&&C.k==='ital'&&act&&act.sk&&act.sk.item)C.ok=false;}catch(e){}return pf.apply(this,arguments);};}
{const v0=victory;victory=async function(){try{const C=S._r21ch;if(C&&!S.arena){const ok=C.ok&&(C.k!=='gyors'||S.round<=3)&&(C.k!=='gyenge'||C.weak>=2);
    if(ok){const g=40+(S.elvl||1)*6;S.gold+=g;showBanner(`🎯 Kihívás teljesítve: ${C.t}! +${g} arany`,true);sfx('coin');}S._r21ch=null;}}catch(e){}return v0.apply(this,arguments);};}

// szándék-buborék nem kell (a felhasználó kérése) – a töltést a vörös izzás és a felirat jelzi
r21IntentOf=function(){return null;};
// éles (HTML) felső tájékoztató: időjárás + csatakihívás, a csatatér bal felső sarkában
{const st=document.createElement('style');st.textContent='.r21hud{position:absolute;left:10px;top:10px;z-index:5;display:flex;flex-direction:column;gap:4px;pointer-events:none;font-family:Nunito,system-ui,sans-serif}.r21hud>div{background:rgba(20,10,34,.82);border:1.5px solid rgba(255,220,140,.6);border-radius:8px;padding:3px 9px;color:#efe8ff;font-size:12px;font-weight:800;line-height:1.25;max-width:46vw}.r21hud b{color:#ffe08a}.r21hud .ok{border-color:rgba(125,255,154,.75);color:#c8ffd6}.r21hud .bad{border-color:rgba(255,90,90,.75);color:#ffb0b0}@media (max-width:600px){.r21hud>div{font-size:10.5px;padding:2px 7px}}';document.head.appendChild(st);}
setInterval(()=>{try{const stg=document.querySelector('.stage');if(!stg)return;let h=stg.querySelector('.r21hud');if(!h){h=document.createElement('div');h.className='r21hud';stg.appendChild(h);}
  const inB=S.enemies&&S.enemies.length&&!S.over&&!S.arena&&ov.hidden!==false;let html='';
  if(inB&&S._r21wxTok&&S._r21wxInfo)html+=`<div>${(S._r21wxInfo.t1||'').split(' ')[0]} ${S._r21wxInfo.t2}</div>`;
  const C=S._r21ch;if(inB&&C){const ok=C.ok&&(C.k!=='gyors'||S.round<=3);html+=`<div class="${ok?'ok':'bad'}">🎯 ${C.t}${C.k==='gyenge'?` (${C.weak}/2)`:''}</div>`;}
  if(h.innerHTML!==html)h.innerHTML=html;}catch(e){}},300);
