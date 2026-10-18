// ===== 36. kör: mesterfokú képességek, ellenfél-szándék, harcra ható időjárás, fekvő telefon üres sávja =====

// ---------------------------------------------------------------------------------------------
// 1) Fekvő telefon: a 16:9-es csatatér szélességben korlátos, alatta üres sáv maradt. A sebesség/zene/hang gombsor
//    ilyenkor a csatatér alá kerül (kitölti a sávot, és jobbra több hely marad a parancsoknak).
{const place=()=>{try{const t=document.querySelector('.tools'),st=document.querySelector('.stage'),g=document.querySelector('.game');if(!t||!st||!g)return;
  const m=matchMedia('(orientation:landscape) and (max-height:520px)').matches,r=st.getBoundingClientRect(),gr=g.getBoundingClientRect(),gap=gr.bottom-r.bottom;
  if(m&&gap>=34&&r.width>0){Object.assign(t.style,{position:'fixed',left:r.left+'px',top:(r.bottom+3)+'px',width:r.width+'px',height:Math.min(gap-5,52)+'px',display:'flex',justifyContent:'flex-end',alignItems:'center',gap:'8px',margin:'0',zIndex:6});t.dataset.r21='1';}
  else if(t.dataset.r21){t.removeAttribute('style');delete t.dataset.r21;}}catch(e){}};
 addEventListener('resize',place);setInterval(place,800);setTimeout(place,300);}

// ---------------------------------------------------------------------------------------------
// 2) Ellenfél szándéka: minden ellenfél feje fölött kis buborék mutatja, mit fog csinálni a következő körében
//    (⚔ ütés egy hősre, 💥 mindenkire, elemes varázslat ikonja, ✚ gyógyít, 🛡 erősít). A szándékot előre kisorsoljuk,
//    és az ellenfél tényleg azt használja (a `weighted` az ő körében a kisorsolt támadást adja vissza).
const R21_W0=weighted;let R21_ACT=null;const R21_NOINT=new Set();
weighted=function(list){const e=R21_ACT;if(e&&e._intent&&e.d&&list===e.d.skills){const id=e._intent;e._intentUsed=true;return id;}return R21_W0(list);};
{const ea=enemyAct;enemyAct=async function(e){R21_ACT=e;if(e)e._intentUsed=false;try{return await ea.apply(this,arguments);}
  finally{if(e){if(e._intent&&!e._intentUsed)R21_NOINT.add(e.type);e._intent=null;}R21_ACT=null;}};}
const R21_EL_IC={fire:'🔥',ice:'❄️',thunder:'⚡',water:'💧',nature:'🍃',earth:'🪨',dark:'🌑',holy:'✨',poison:'☠️',wind:'🌪️',lava:'🌋'};
function r21IntentOf(e){if(!e.d||!Array.isArray(e.d.skills)||!e.d.skills.length||R21_NOINT.has(e.type))return null;if(!e._intent)e._intent=R21_W0(e.d.skills);const sk=ESK[e._intent];if(!sk)return null;
  const all=sk.tgt==='enemies'||sk.tgt==='allHeroes';let ic,c,tx;
  if(sk.kind==='heal'||sk.kind==='lifeall'){ic='✚';c='#7dff9a';tx='GYÓGYÍT';}
  else if(sk.kind==='buff'||sk.kind==='bless'||sk.tgt==='self'||sk.tgt==='allies'){ic='🛡️';c='#9fd0ff';tx='ERŐSÍT';}
  else if(sk.kind==='phys'&&(!sk.elem||sk.elem==='phys')){ic=all?'💥':'⚔️';c='#ffb36b';tx=all?'MINDENKIRE':'ÜT';}
  else{ic=R21_EL_IC[sk.elem]||'🔮';c='#d7a6ff';tx=all?'MINDENKIRE':(sk.status?'VARÁZSOL':'VARÁZS');}
  return {ic,c,tx,name:sk.name};}
{const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);try{
  if(e&&e.kind==='enemy'&&e.alive&&!e.fled&&(e.alpha==null||e.alpha>.5)&&e!==R21_ACT&&!S.over&&S.enemies&&S.enemies.includes(e)&&!(e.st&&(e.st.sleep||e.st.freeze||e.st.stun))){
    const I=r21IntentOf(e);if(I){const x=Math.min(W-26,Math.max(26,cx(e)+Math.min(70,e.w*e.scale*.55))),y=Math.max(26,topY(e)-46),t=performance.now()/1000,bob=Math.sin(t*3+e.x)*2;
      ctx.save();ctx.translate(x,y+bob);ctx.fillStyle='rgba(22,12,36,.86)';ctx.strokeStyle=I.c;ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(0,0,17,0,6.29);ctx.fill();ctx.stroke();
      ctx.beginPath();ctx.moveTo(-5,15);ctx.lineTo(0,23);ctx.lineTo(5,15);ctx.closePath();ctx.fillStyle=I.c;ctx.fill();
      ctx.font='18px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle='#fff';ctx.fillText(I.ic,0,1);
      ctx.font='800 9px Nunito,sans-serif';ctx.lineWidth=3;ctx.strokeStyle='rgba(20,10,30,.95)';ctx.strokeText(I.tx,0,-23);ctx.fillStyle=I.c;ctx.fillText(I.tx,0,-23);ctx.restore();}}}catch(err){}return r;};}

// ---------------------------------------------------------------------------------------------
// 3) Mesterfokú képességek: egy hősképesség 3. használata után MESTERFOKÚ lesz (★ a gombon): +30% erő, és
//    látványosabb – arany aura a hősön, nagyobb és több részecske, erősebb rázkódás, arany becsapódás minden találatnál.
//    A használatszám a mentésben megmarad (mentőhelyenként).
const R21_MN=3;let R21_MAST={};
// fejezetenként külön számol (a felhasználó kérése: a mesterfok csak abban a térképrészben/fejezetben érvényes, ahol megszerezte)
const r21Zone=()=>{try{const i=S.level?ZONES.indexOf(zoneOf(S.level)):-1;return 'z'+(i<0?0:i);}catch(e){return 'z0';}};
const r21MastN=(h,id)=>(((R21_MAST[r21Zone()]||{})[h.type]||{})[id]||0);
function r21MastPatch(){if(S.test)return;try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return;const d=JSON.parse(raw);d.mast=R21_MAST;localStorage.setItem(SAVE_KEY,JSON.stringify(d));}catch(e){}}
function r21MastLoad(){if(S.test)return;try{const d=JSON.parse(localStorage.getItem(SAVE_KEY)||'null');R21_MAST=(d&&d.mast&&typeof d.mast==='object'&&Object.keys(d.mast).every(k=>/^z\d+$/.test(k)))?d.mast:{};}catch(e){R21_MAST={};}}
{const sg=saveGame;saveGame=function(){const r=sg.apply(this,arguments);r21MastPatch();return r;};}
{const ng=newGame;newGame=function(){R21_MAST={};return ng.apply(this,arguments);};}
{const sb=startBattle;startBattle=function(){r21MastLoad();return sb.apply(this,arguments);};}
const r21MastOK=(h,sk)=>!!(h&&h.kind==='hero'&&sk&&sk.id&&SK[sk.id]&&!sk.item&&!sk.isLimit&&!sk.basic&&!sk.pair&&sk.id!=='pair');
let R21_MON=0;
{const p0=part;part=function(o){if(R21_MON&&o){o=Object.assign({},o);if(o.size)o.size*=1.3;if(o.vx)o.vx*=1.15;if(o.vy)o.vy*=1.15;
    if(Math.random()<.18)p0({x:o.x,y:o.y,vx:(o.vx||0)*.6+rnd(-60,60),vy:(o.vy||0)*.6-rnd(20,80),life:rnd(.35,.7),size:rnd(2,4),rgb:pick(['255,226,120','255,250,210','255,190,60'])});}
  return p0(o);};}
{const sh0=shake;shake=function(n){return sh0(R21_MON?n*1.35:n);};}
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{if(R21_MON&&t&&u&&t.kind!==u.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag')){const x=cx(t),y=midY(t),E={k:0};
    R18E({update(dt){E.k+=dt/.45;return E.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,60+170*E.k,'255,205,90',.75*(1-E.k));glow(x,y,30+40*E.k,'255,255,230',.9*(1-E.k));ctx.restore();}});
    sparks(x,y,['255,226,120','255,250,210','255,170,40'],26,560);}}catch(e){}return r;};}
{const pf=perform;perform=async function(h,act){const sk=act&&act.sk;if(!r21MastOK(h,sk))return pf.apply(this,arguments);
  const mast=r21MastN(h,sk.id)>=R21_MN;let a2=act;
  if(mast){a2=Object.assign({},act,{sk:Object.assign({},sk,{pow:(sk.pow||0)*1.3,_mast:true})});popLabel(h,'★ MESTERFOK','#ffd84a');sfx('buff');
    const A2={a:1,t:0};R18E({update(dt){A2.t+=dt;if(R21_MON&&Math.random()<.5)part({x:cx(h)+rnd(-h.w*h.scale*.5,h.w*h.scale*.5),y:h.y+h.oy-rnd(0,h.h*h.scale),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.5,.9),size:rnd(2,4),rgb:pick(['255,226,120','255,250,210'])});if(!R21_MON)A2.a-=dt*2.5;return A2.a>0;},
      draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(h),midY(h),h.h*h.scale*.75,'255,200,80',.32*A2.a*(.8+.2*Math.sin(A2.t*8)));ctx.restore();}});
    flash('255,220,140',.18,.12);R21_MON++;}
  try{return await pf.call(this,h,a2);}
  finally{if(mast)R21_MON=Math.max(0,R21_MON-1);
    const Z=(R21_MAST[r21Zone()]=R21_MAST[r21Zone()]||{}),T=(Z[h.type]=Z[h.type]||{});T[sk.id]=(T[sk.id]||0)+1;
    if(T[sk.id]===R21_MN){popLabel(h,'★ '+(SK[sk.id].name||'')+': MESTERFOK!','#ffd84a');sfx('levelup');try{showBanner('★ '+SK[sk.id].name+' – mesterfokú lett ebben a fejezetben!',false);}catch(e){}}
    r21MastPatch();}};}
// a képesség-gombon: ★ ha mesterfokú, különben a használatszám (pl. 1/3)
{const sb0=setButtons;setButtons=function(list){try{const h=S.pick&&S.pick.h;if(h&&h.kind==='hero'&&Array.isArray(list)){const ids=heroSkills(h);
    list=list.map(b=>{if(!b||!b.label)return b;const id=ids.find(i=>SK[i]&&SK[i].name===b.label);if(!id)return b;const n=r21MastN(h,id);
      if(n>=R21_MN)return Object.assign({},b,{label:'★ '+b.label,cls:(b.cls||'')+' r21mast',desc:(b.desc||'')+' ★ Mesterfokú ebben a fejezetben: +30% erő, látványosabb.'});
      return Object.assign({},b,{sub:(b.sub?b.sub+' · ':'')+'★'+n+'/'+R21_MN,desc:(b.desc||'')+` ${R21_MN} használat után mesterfokú lesz ebben a fejezetben (+30% erő).`});});}}catch(e){}return sb0.call(this,list);};}
{const st=document.createElement('style');st.textContent='.cbtn.r21mast{border-color:#ffd84a!important;box-shadow:0 0 10px rgba(255,210,80,.55),inset 0 0 8px rgba(255,210,80,.25)}.cbtn.r21mast .bl{color:#ffe08a}';document.head.appendChild(st);}

// ---------------------------------------------------------------------------------------------
// 4) Harcra ható időjárás: a pálya időjárása (R21WX) az elemeket erősíti/gyengíti – mindkét oldalon, logikusan.
//    Köd: minden támadás 12% eséllyel mellémegy. A csata elején bal fent kiírja, mire hat.
const R21WXM={rain:{n:'Eső',ic:'🌧️',m:{water:1.2,thunder:1.2,fire:.8}},drip:{n:'Csöpögő barlang',ic:'💧',m:{water:1.15,thunder:1.15,fire:.85}},
  snow:{n:'Havazás',ic:'❄️',m:{ice:1.25,fire:.85}},ash:{n:'Hamueső',ic:'🌋',m:{fire:1.2,lava:1.2,water:.85,ice:.85}},sand:{n:'Homokvihar',ic:'🏜️',m:{earth:1.2,water:.85}},
  leaves:{n:'Levélhullás',ic:'🍂',m:{nature:1.2}},petals:{n:'Szirmok',ic:'🌸',m:{nature:1.15,holy:1.1}},stars:{n:'Csillagos éj',ic:'🌙',m:{dark:1.2,holy:1.1}},
  fog:{n:'Köd',ic:'🌫️',m:{},miss:.12}};
const r21Wx=()=>{try{return R21WXM[R21WX[S.theme]]||null;}catch(e){return null;}};
const r21WxText=w=>{const up=[],dn=[];for(const [k,v] of Object.entries(w.m)){const n=(ELEM_NAMES&&ELEM_NAMES[k])||k;(v>1?up:dn).push(n+' '+(v>1?'+':'−')+Math.round(Math.abs(v-1)*100)+'%');}
  if(w.miss)up.push('a támadások '+Math.round(w.miss*100)+'%-a mellémegy');return [...up,...dn].join(' · ');};
{const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{const w=r21Wx();if(w&&sk&&sk.elem&&w.m[sk.elem]&&r&&typeof r.dmg==='number'&&r.dmg>0&&sk.kind!=='heal'){r.dmg=Math.max(1,Math.round(r.dmg*w.m[sk.elem]));if(t)t._r21wx=w.m[sk.elem];}}catch(e){}return r;};}
{const h0=hit;hit=function(u,t,sk){try{const w=r21Wx();if(w&&w.miss&&u&&t&&u.kind!==t.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&!sk.isLimit&&Math.random()<w.miss){popLabel(t,'🌫️ MELLÉ!','#dfe7f0');sfx('miss');return 0;}}catch(e){}
  if(t)t._r21wx=0;const r=h0.apply(this,arguments);try{const w=r21Wx();if(t&&t._r21wx&&w){popLabel(t,w.ic+' '+(t._r21wx>1?'ERŐSEBB':'GYENGÉBB'),t._r21wx>1?'#ffe08a':'#a9b8d0');t._r21wx=0;}}catch(e){}return r;};}
{const sb=startBattle;startBattle=function(){const r=sb.apply(this,arguments);try{const w=r21Wx();if(w){const tok={};S._r21wxTok=tok;const txt=r21WxText(w),F={a:0,t:0};
    R18E({update(dt){F.t+=dt;F.a=Math.min(1,F.t*2);return S._r21wxTok===tok&&!S.over;},draw(){ctx.save();ctx.globalAlpha=F.a;ctx.font='800 13px Nunito,sans-serif';const t1=w.ic+' '+w.n,t2=txt,wd=Math.max(ctx.measureText(t1).width,(ctx.font='700 11px Nunito,sans-serif',ctx.measureText(t2).width))+18;
      ctx.fillStyle='rgba(20,10,34,.72)';ctx.strokeStyle='rgba(255,220,140,.6)';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect?ctx.roundRect(10,10,wd,40,9):ctx.rect(10,10,wd,40);ctx.fill();ctx.stroke();
      ctx.textAlign='left';ctx.textBaseline='top';ctx.fillStyle='#ffe08a';ctx.font='800 13px Nunito,sans-serif';ctx.fillText(t1,19,14);ctx.fillStyle='#e8e0ff';ctx.font='700 11px Nunito,sans-serif';ctx.fillText(t2,19,32);ctx.restore();}});
    setTimeout(()=>{try{if(S._r21wxTok===tok)setPrompt(`${w.ic} ${w.n}: ${txt}`);}catch(e){}},1400);}}catch(e){}return r;};}

// védelem: közelharci támadás célpont nélkül (pl. közben elesett) ne dobjon hibát – új élő célpontot választ
{const m0=A.melee;A.melee=function(u,ts,sk){if(!ts||!ts[0]||!ts[0].alive){const pool=(u&&u.kind==='hero'?S.enemies:S.heroes).filter(x=>x&&x.alive);if(!pool.length)return Promise.resolve();ts=[pool[0]];}return m0.call(this,u,ts,sk);};}
