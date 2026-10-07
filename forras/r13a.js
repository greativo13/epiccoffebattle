
// ===== 13. kör (az első térkép könnyű szinten végigjátszva) =====
// ---- nehézség: könnyű szinten erősebb ellenfelek, kevesebb arany, gyengébb dobótárgyak, viszont könnyebb főellenségek
DIFF_HP[0]=+(DIFF_HP[0]*1.3).toFixed(3);DIFF_ATK[0]=+(DIFF_ATK[0]*1.3).toFixed(3);
{const mkE=mkEnemy;mkEnemy=function(){const e=mkE.apply(this,arguments);try{if(e&&S.diff===0&&!S.arena){e.gold=Math.round((e.gold||0)*.6);
  if(e.d.boss||e.d.miniboss){e.maxHp=Math.max(1,Math.round(e.maxHp*.615));e.hp=Math.min(e.hp,e.maxHp);e.atk*=.615;e.mag*=.615;}}}catch(err){}return e;};}
{const cdE=calcDmg;calcDmg=function(u,t,sk){const r=cdE.apply(this,arguments);if(r&&sk&&sk.flatDmg&&S.diff===0&&r.dmg>1)r.dmg=Math.max(1,Math.round(r.dmg*.5));return r;};}

// ---- a pénz neve: arany (a kávébab a történetben maradt nyom)
// (a szövegek a game.html-ben át vannak írva)

// ---- méreg: a mérgező ellenfeleknek nem árt a méreg
{const POIS=new Set(['shroom','mushking','puffball','slime','slimeking','rose','zombie']);for(const t in EN_DEF){const d=EN_DEF[t];if((d.skills||[]).some(s=>ESK[s[0]]&&ESK[s[0]].elem==='poison'))POIS.add(t);}
 for(const t of POIS){const d=EN_DEF[t];if(!d)continue;d.elem=Object.assign({},d.elem||{},{poison:0});d.statusImmune=[...new Set([...(d.statusImmune||[]),'poison'])];
   if(d.info&&!/méreg nem/.test(d.info))d.info+=' A méreg nem árt neki.';}}

// ---- bénítás: ha több ellenfél van, legalább egy mindig harcképes marad
{const DIS=['stun','sleep','freeze','paralyze','stone','banish'],asD=addStatus;addStatus=function(t,type){
  if(t&&t.kind==='enemy'&&DIS.includes(type)&&S.enemies){const others=S.enemies.filter(e=>e!==t&&e.alive&&!e.d.passive&&!(e.st&&e.st.banish));
    const tDis=t.st&&DIS.some(s=>t.st[s]);if(others.length&&!tDis&&others.every(e=>DIS.some(s=>e.st&&e.st[s]))){popLabel(t,'ELLENÁLL!','#ffd36a');return;}}
  return asD.apply(this,arguments);};}

// ---- Életszívás: semleges (nem sötét, nem átok) – fix szívás
ELEM_NAMES.none='semleges';if(typeof EL_LABEL==='object')EL_LABEL.none='semleges';ELEM_RGB.none='220,80,110';
if(SK.drain){SK.drain.elem='none';SK.drain.desc='Semleges szívás: kiszívja az ellenség életerejét, és a felét Morgána visszagyógyítja. Minden ellenségre egyformán hat.';}

// ---- Földrepesztés: föld elem (nem láva)
if(SK.earthsplit){SK.earthsplit.elem='earth';SK.earthsplit.desc='Grog a földbe csap: a repedés végigfut az ellenségek alatt, és hegyes sziklák törnek fel. Föld elem.';}
// ---- Pestis → Őrület
if(SK.plague){SK.plague.name='Őrület';SK.plague.desc='Morgána megőrjít egy ellenséget: megzavarodik, és a következő támadásával a saját társát támadja meg (ha egyedül van, magát).';}
STATUS.plagued=['Őrült','#d07aff'];
// ---- Rozsdakirály idézés: erősítés (gyorsítás)
SUMMON_EL.rustking='buff';
// ---- Espresszó: a tűz (és a láva) egyik formájában sem hat nagyon rá
if(EN_DEF.espresso){const d=EN_DEF.espresso;d.elemFn=e=>e.stance==='lava'?{fire:0,ice:1.6,phys:.8,poison:.5}:{fire:.5,water:1.6,holy:1.6,ice:0,dark:0,poison:.5};
  d.info='Két formája van: Láva (a jég fáj neki, a tűz nem hat) és Hamu (a víz és a fény fáj neki, a tűz alig, a jég és a sötétség nem hat).';}

// ---- idézések: amelyik ellenfelet legyőzted, az megidézhető (Kristálygólem már 3-1 után, Démonkirály 4-3 után, ágyú 2-3 után)
for(const d of SUMMONS){let first=null;for(const Z of ZONES){for(const l of Z.levels)if((l.battles||[]).some(bt=>bt.includes(d.id))){first=l.id;break;}if(first)break;}if(first&&d.req)d.req=first;}

// ---- pályán belül nincs „Győzelem” – csak a pálya végén
{const ovR=overlay,spR=setPrompt;let mid=false;
 overlay=function(items,btns){if(mid&&Array.isArray(items)&&items.some(x=>x&&x[2]==='GYŐZELEM!')){mid=false;const go=btns&&btns[0]&&btns[0].on;const L=S.level;showBanner(`${S.battleIdx+2}/${L.battles.length}. csata`,false);setTimeout(()=>{try{if(go)go();}catch(e){console.error(e);}},1100);return;}return ovR.apply(this,arguments);};
 setPrompt=function(t){if(mid&&t==='Győzelem!')t='Jön a következő csata…';return spR.apply(this,arguments);};
 const vR=victory;victory=async function(){const L=S.level;mid=!!(L&&S.battleIdx<L.battles.length-1);try{return await vR.apply(this,arguments);}finally{setTimeout(()=>{mid=false;},1500);}};}

// ---- térkép: a sárga szaggatott vonalak kikerülnek (a térkép saját pöttyözött útjai maradnak)
{const st=document.createElement('style');st.textContent='.map-route{display:none!important}';document.head.appendChild(st);}

// ---- a pajzsok (Fénypajzs, Kristálytükör) a helyükön maradnak, nem mozognak együtt a támadó hőssel
function r13ShieldSpot(){const hs=S.heroes.filter(h=>h.alive);if(!hs.length)return {x:400,y:330};return {x:Math.max(...hs.map(h=>h.x))+105,y:hs.reduce((s,h)=>s+(h.y-h.h*.5*(h.scale0||h.scale)),0)/hs.length+10};}
partyShield=function(){if(S.partyShield||!FX_IMG.sunshield)return;const im=FX_IMG.sunshield,p=r13ShieldSpot();
  const fx={t:0,off:0,bx:p.x,by:p.y,update(dt){this.t+=dt;if(!S.over&&S.heroes.some(h=>h.alive&&h.st.barrier))this.off=0;else this.off+=dt;if(this.off>=.4){S.partyShield=null;return false;}return true;},
    draw(){const t=this.t,x=this.bx,y=this.by,hk=this.hitAt!=null?Math.max(0,1-(t-this.hitAt)/.4):0,size=360*(1+.025*Math.sin(t*3))*(1+.18*hk),a=Math.min(1,t/.35)*(1-this.off/.4)*Math.min(1,.5+.08*Math.sin(t*4)+.5*hk);
      ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.translate(x,y);ctx.scale(.5,1);ctx.drawImage(im,-size/2,-size/2,size,size);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.4;ctx.drawImage(im,-size*.55,-size*.55,size*1.1,size*1.1);ctx.restore();}};
  S.partyShield=fx;effects.push(fx);};
partyCrystal=function(){if(S.partyCrystal||!FX_IMG.crystalmirror)return;const im=FX_IMG.crystalmirror,p=r13ShieldSpot();
  const fx={t:0,off:0,update(dt){this.t+=dt;if(!S.over&&S.heroes.some(h=>h.alive&&h.st.crystal))this.off=0;else this.off+=dt;
      if(Math.random()<.25)part({x:p.x+(S.partyShield?46:0)+rnd(-40,40),y:p.y+rnd(-130,130),vx:rnd(-10,10),vy:rnd(-30,-10),life:1,size:rnd(2,4),rgb:pick([CRY,CRY2]),shape:'star'});
      if(this.off>=.4){S.partyCrystal=null;return false;}return true;},
    draw(){const t=this.t,x=p.x+(S.partyShield?46:0),y=p.y,hk=this.hitAt!=null?Math.max(0,1-(t-this.hitAt)/.4):0,size=380*(1+.02*Math.sin(t*3))*(1+.18*hk),a=Math.min(1,t/.35)*(1-this.off/.4)*Math.min(1,.6+.1*Math.sin(t*4)+.4*hk);
      ctx.save();ctx.globalAlpha=Math.max(0,a);ctx.globalCompositeOperation='lighter';ctx.translate(x,y);ctx.scale(.72,1);ctx.globalAlpha*=.8;ctx.drawImage(im,-size/2,-size/2,size,size);ctx.globalAlpha*=.3+.25*hk;ctx.drawImage(im,-size*.56,-size*.56,size*1.12,size*1.12);ctx.restore();}};
  S.partyCrystal=fx;effects.push(fx);};
// a Titáncsapásnál Grog megnő: az eredeti méretét megjegyezzük
for(const h of (S.roster||S.heroes||[]))if(h&&!h.scale0)h.scale0=h.scale;
{const sbS=startBattle;startBattle=function(){const r=sbS.apply(this,arguments);try{for(const h of S.heroes)h.scale0=h.scale0||h.scale;}catch(e){}return r;};}

// ---- a Kristálytükör ugyanúgy megállítja a támadást, mint a Fénypajzs (kék, kristályos stílusban); ha mindkettő áll, egy blokk történik
const r13Guarded=()=>!S.over&&S.heroes.some(h=>h.alive&&h.st&&(h.st.barrier||h.st.crystal));
{const fl0=r12ShieldFlare;r12ShieldFlare=function(x,y,rgb){const cry=!S.heroes.some(h=>h.alive&&h.st&&h.st.barrier);if(!cry)return fl0.apply(this,arguments);
   if(S.partyCrystal)S.partyCrystal.hitAt=S.partyCrystal.t;sfx('ice');sfx('shield');flash('220,245,255',.3,.12);hitStop(80);shake(12);
   for(let i=0;i<26;i++){const a=rnd(0,6.28),v=rnd(150,450);part({x,y:y+rnd(-80,80),vx:Math.cos(a)*v,vy:Math.sin(a)*v,g:400,life:rnd(.4,.8),size:rnd(4,8),rgb:pick(['150,220,255','220,245,255']),add:false,shape:'rock'});}
   sparks(x,y,['150,220,255','220,245,255','255,255,255'],26,480);};}
{const sp0=r12ShieldPos;r12ShieldPos=function(){const p=r13ShieldSpot();return {x:p.x,y:p.y};};}
// minden ellenséges támadás (akkor is, ha egy főellenség saját logikája közvetlenül indítja) a pajzson akad meg
{let inBlk=false;const WRAP=new Set(['healAll']);for(const k of Object.keys(A)){const f=A[k];if(typeof f!=='function'||WRAP.has(k))continue;
  A[k]=function(u,ts,sk){if(!inBlk&&u&&u.kind==='enemy'&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&Array.isArray(ts)&&ts.some(t=>t&&t.kind==='hero')&&r13Guarded()){
      const tg=ts.filter(t=>t&&t.kind==='hero'&&t.alive);if(tg.length){inBlk=true;return r12Block(u,tg,sk).finally(()=>{inBlk=false;u.pose='idle';});}}
    if(u&&u.golden&&u.kind==='enemy')return r13Gold(()=>f.apply(this,arguments));
    return f.apply(this,arguments);};}}
{const uE=useEnemySkill;useEnemySkill=async function(e,sk,target){return uE.apply(this,arguments);};}

// ---- arany ellenfél: a támadása is aranyszínű
const GOLDF='sepia(1) saturate(3.2) hue-rotate(-12deg) brightness(1.2)';
function goldRgb(rgb){if(typeof rgb!=='string')return rgb;const p=rgb.split(',').map(Number);if(p.length<3)return rgb;const l=(p[0]*.3+p[1]*.59+p[2]*.11)/255;return `${Math.round(200+55*l)},${Math.round(150+80*l)},${Math.round(30+120*l*l)}`;}
let GOLD_ON=0;
async function r13Gold(fn){GOLD_ON++;try{return await fn();}finally{setTimeout(()=>{GOLD_ON=Math.max(0,GOLD_ON-1);},400);}}
{const p0=part;part=function(o){if(GOLD_ON&&o){o.rgb=goldRgb(o.rgb);if(o.shape==='smoke'||o.shape==='dsmoke')o.shape='puff';}return p0.apply(this,arguments);};}
{const ps0=effects.push;effects.push=function(...a){if(GOLD_ON)for(const o of a)if(o&&typeof o.draw==='function'&&!o._g){o._g=1;const d=o.draw;o.draw=function(){ctx.save();try{if('filter' in ctx)ctx.filter=GOLDF;return d.apply(this,arguments);}finally{ctx.restore();}};}return ps0.apply(this,a);};}

// ---- Morcus: a pajzsa mögött is jól látszik (halványabb burok)
{const mo=SPR_OVER.morcus;SPR_OVER.morcus=(e,t)=>{ctx.save();ctx.globalAlpha*=.55;try{mo(e,t);}finally{ctx.restore();}};}
// ---- Morcus – Káoszgömb: öt különböző elemű gömbből álló sorozat
{const co=A.chaosOrb;A.chaosOrb=async function(e,ts,sk){if(!e||e.type!=='morcus')return co.apply(this,arguments);const t=ts[0];if(!t)return;e.pose='cast';sfx('dark');
  const cols=[['fire','255,120,50'],['ice','120,210,255'],['thunder','255,230,80'],['holy','255,245,180'],['dark','160,90,240']],hp=handPos(e);
  const fl=[];for(let i=0;i<5;i++){const [el,c]=cols[i];fl.push((async()=>{await wait(i*150);sfx(el==='holy'?'mirror':el==='dark'?'dark':el);const T={x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-40,30)};
    await flyObj({x:hp.x,y:hp.y},T,360,(x,y)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,40,c,.8);glow(x,y,15,'255,255,255',1);ctx.restore();},{arc:rnd(-90,90),trail:[c,'255,255,255']});
    soundBlast(T.x,T.y,c,120,360);sparks(T.x,T.y,[c,'255,255,255'],14,380);shake(6);t.hurt=.3;})());}
  await Promise.all(fl);hitStop(80);hit(e,t,sk);await wait(300);e.pose='idle';};}

// ---- a Rémült Vén Tölgy SAJÁT ágkarja lendül: hátradől, felemeli, és teljes testtel lecsapja
LIMBS.oak={parts:{arm:{poly:[[0,.36],[.17,.37],[.3,.45],[.42,.49],[.43,.62],[.3,.63],[.16,.62],[0,.6]],pivot:[.38,.55]}}};
A.branchSwing=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const rel=keepPose(u);try{const T=limbOn(u,'oak');if(!T){hit(u,t,sk);return;}const a=T.arm;a.blur=true;
  const aim=limbAim(u,'oak','arm',.04,.48,cx(t)+30,midY(t)-10),sx=Math.max(1,Math.min(2.4,aim.sx));a.ax=aim.ax;sfx('wind');
  await tween(750,k=>{const e=easeIO(k);a.rot=(aim.rot+1.5)*e;a.s=1+.3*e;u.lean=.16*e;u.sq=1+.06*e;});await wait(150);for(let i=0;i<6;i++)part({x:cx(u)+rnd(-60,60),y:topY(u)+rnd(0,60),vx:rnd(-80,80),vy:rnd(-40,40),g:300,life:1,size:rnd(6,9),rgb:pick(['80,150,40','150,190,60']),add:false,shape:'leaf'});
  sfx('whoosh');await tween(260,k=>{const e=eOutBack(k);a.rot=aim.rot+1.5-1.5*e;a.sx=1+(sx-1)*Math.min(1,k*1.4);u.lean=.12-.3*e;u.sq=1.06-.1*Math.sin(k*Math.PI);});
  const P=limbPt(u,'arm',.04,.48);sfx('rock');sfx('hit');hitStop(110);shake(18);flash('255,230,180',.2,.1);groundCrack(P.x,t.y+t.oy,'200,170,120',150);dustWave(P.x,t.y+t.oy);puffs(P.x,t.y+t.oy,10,['170,150,120','140,120,100'],[18,32],{w:60,up:90});
  fallDebris(P.x,P.y,10,(x,y,r,s)=>{ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.fillStyle='#6b4a2a';ctx.strokeStyle='#2a1a0e';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-9*s,-3*s);ctx.lineTo(8*s,-5*s);ctx.lineTo(10*s,2*s);ctx.lineTo(-7*s,4*s);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();},{v:340});
  for(let i=0;i<14;i++)part({x:P.x,y:P.y,vx:rnd(-240,240),vy:rnd(-260,-40),g:500,life:rnd(.7,1.1),size:rnd(5,8),rgb:pick(['80,150,40','150,190,60','200,170,60']),add:false,shape:'leaf'});
  soundBlast(cx(t),midY(t),'210,190,140',160,380);toss(t,40,340);t.hurt=.4;hit(u,t,sk);
  await wait(450);await tween(500,k=>{const e=easeIO(k);a.rot=aim.rot*(1-e);a.sx=sx+(1-sx)*e;a.s=1.3-.3*e;u.lean=-.18*(1-e);u.sq=1;});a.blur=false;limbOff(u);u.lean=0;}finally{rel();}};
ESK.oakvine.anim='branchSwing';
// ---- Levélvihar: nincs varázskör alatta, és a hősökön nincs zöld „nyálka” – csak a levelek
{const lg=A.leafGale;A.leafGale=async(u,ts,sk)=>{const cp=castPose;castPose=async(uu,rgb,ms=420)=>{uu.pose='cast';await bodyWind(uu,ms*.7,.1);};try{return await lg(u,ts,sk);}finally{castPose=cp;bodySettle(u);}};}
NOFX.add('leafGale');NOFX.add('branchSwing');
// a természet elemű találat általános becsapódása se legyen zöld folt: levelek repülnek
{const im0=impact;impact=function(x,y,rgb,s){if(rgb===ELEM_RGB.nature){for(let i=0;i<8;i++)part({x,y,vx:rnd(-200,200),vy:rnd(-220,20),g:400,life:rnd(.5,.9),size:rnd(5,8),rgb:pick(['80,150,40','150,190,60','200,170,60']),add:false,shape:'leaf'});return;}return im0.apply(this,arguments);};}

// ---- Árny-csapat idézés: egységes megjelenés – minden hős árnymása egyformán, egyszerre emelkedik ki egy-egy árnytócsából
{const sh=SUMMONS.find(x=>x.id==='shadows');if(sh){sh.img=()=>null;sh.desc='Minden élő hős árnymása kiemelkedik a földből, és egy-egy erős árnycsapást mér egy ellenségre.';
  sh.run=async(P,S0)=>{const hs=S.heroes.filter(h=>h.alive);const shades=hs.map(h=>({h,x:h.x+60,y:h.y,a:0,rise:0}));const st={on:true};
   effects.push({update(){return st.on;},draw(){for(const q of shades){if(q.a<=0)continue;ctx.save();ctx.globalAlpha=.75*q.a;ctx.translate(q.x,q.y+4);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,4,0,0,70);g.addColorStop(0,'rgba(10,0,25,.95)');g.addColorStop(1,'rgba(60,20,120,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,70,0,6.29);ctx.fill();ctx.restore();
       const sp=ENEMY_SPR[q.h.type+'-attack']||ENEMY_SPR[q.h.type];if(!sp)continue;const Hh=q.h.h*(q.h.scale0||q.h.scale)*1.05,w=Hh*sp.width/sp.height,vis=Hh*q.rise;
       ctx.save();ctx.beginPath();ctx.rect(q.x-w,q.y-Hh-40,w*2,Hh+40);ctx.clip();ctx.globalAlpha=q.a;const ts2=tintSpr(sp,'rgb(55,25,110)',.62);for(const [ox,oy] of [[-2,0],[2,0],[0,-2],[0,2]]){ctx.globalAlpha=q.a*.6;ctx.drawImage(tintSpr(sp,'rgb(200,140,255)',1),q.x-w/2+ox,q.y-vis+oy,w,Hh);}ctx.globalAlpha=q.a;ctx.drawImage(ts2,q.x-w/2,q.y-vis,w,Hh);ctx.restore();}}});
   sfx('dark');await tween(300,k=>{for(const q of shades)q.a=k;});await tween(500,k=>{for(const q of shades)q.rise=easeIO(k);});
   for(const q of shades){const t=pick(foesAlive());if(!t)break;const x0=q.x,y0=q.y;await tween(200,k=>{q.x=x0+(cx(t)-90-x0)*k;q.y=y0+(t.y+t.oy-y0)*k;});
     clawMarks(cx(t),midY(t),bigOf(t)*.7,rnd(-.6,.6),'170,100,255');shake(9);hitStop(40);sfx('slash');hit(q.h,t,{...ATTACKS[q.h.type],name:'Árnycsapás',pow:2.6,anim:'midnight'});await wait(150);
     await tween(200,k=>{q.x=cx(t)-90+(x0-cx(t)+90)*k;q.y=t.y+t.oy+(y0-t.y-t.oy)*k;});}
   await tween(400,k=>{for(const q of shades){q.rise=1-k;q.a=1-k*.5;}});st.on=false;};}}

// ---- Koffein-gólem: a bal bögre a kezébe kerül (eddig mellette lebegett)
function r13MugPatch(){const im=ENEMY_SPR.koffgolem;if(!im||im._mug)return;const W0=im.naturalWidth||im.width,H0=im.naturalHeight||im.height;if(!W0||!H0||im.complete===false)return;
  const c=document.createElement('canvas');c.width=W0;c.height=H0;const g=c.getContext('2d');g.drawImage(im,0,0,W0,H0);
  const cp=(x,y,w,h)=>{const k=document.createElement('canvas');k.width=Math.round(w*W0);k.height=Math.round(h*H0);k.getContext('2d').drawImage(im,Math.round(x*W0),Math.round(y*H0),k.width,k.height,0,0,k.width,k.height);return k;};
  const mug=cp(0,.545,.215,.14),fist=cp(.18,.49,.09,.075);
  // a bal bögre feljebb és jobbra kerül, hogy a füle az öklébe essen; az ujjak a fül elé kerülnek
  g.clearRect(0,H0*.535,W0*.165,H0*.2);g.drawImage(mug,W0*.035,H0*(.545-.045));g.drawImage(fist,W0*.18,H0*.49);
  c.naturalWidth=W0;c.naturalHeight=H0;c._mug=true;c.complete=true;ENEMY_SPR.koffgolem=c;}
if(typeof setInterval!=='undefined')setInterval(r13MugPatch,500);

// ---- Morgána üstje a sárkány alatt (Espresszó csatája)
function qCauldron(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#1c1820';for(const lx of [-38,38]){ctx.beginPath();ctx.moveTo(lx-6,-10);ctx.lineTo(lx+6,-10);ctx.lineTo(lx+(lx<0?-4:4),8);ctx.lineTo(lx+(lx<0?-12:12),8);ctx.closePath();ctx.fill();}
  let g=ctx.createRadialGradient(-18,-40,4,0,-30,60);g.addColorStop(0,'#5a5060');g.addColorStop(.6,'#2a2430');g.addColorStop(1,'#120e16');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,-34,58,40,0,0,6.29);ctx.fill();
  ctx.fillStyle='#3a3440';ctx.beginPath();ctx.ellipse(0,-66,52,11,0,0,6.29);ctx.fill();ctx.fillStyle='#4a2a14';ctx.beginPath();ctx.ellipse(0,-66,44,8,0,0,6.29);ctx.fill();
  ctx.fillStyle='#2a1608';for(let i=0;i<9;i++){ctx.beginPath();ctx.ellipse(-34+i*8.5,-67+Math.sin(i*2)*2,4,2.6,i,0,6.29);ctx.fill();}
  ctx.strokeStyle='#6a6070';ctx.lineWidth=4;ctx.beginPath();ctx.arc(-54,-50,9,1.2,4.6);ctx.stroke();ctx.beginPath();ctx.arc(54,-50,9,-1.6,1.9);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.18)';ctx.beginPath();ctx.ellipse(-24,-46,12,20,-.4,0,6.29);ctx.fill();
  ctx.fillStyle='#c58bff';ctx.font='bold 16px sans-serif';ctx.textAlign='center';ctx.fillText('M',0,-26);ctx.restore();}
{const deC=drawEntity;drawEntity=function(e){if(e&&e.type==='espresso'&&e.alive&&S.level&&S.level.id==='3-4'&&!S.arena&&!FRONT_DRAW){const x=cx(e)-e.w*e.scale*.1,gy=e.y+e.oy;
   
   if(Math.random()<.2)part({x:x+rnd(-30,30),y:gy-80,vx:rnd(-10,10),vy:-rnd(30,60),life:1,size:rnd(10,16),grow:20,rgb:'230,225,220',add:false,shape:'smoke'});}
  return deC.apply(this,arguments);};}

// ---- közös támadás: a plakáton csak azok vannak, akik tényleg harcolnak; a neve a létszámhoz igazodik
{const dcC=drawCutin;drawCutin=function(){const c=S.cutin;if(!c||!c.all)return dcC();const party=(S.comboParty||S.heroes).filter(h=>h.alive||true),types=new Set(party.map(h=>h.type));
   const n=party.length;c.name=n>=5?'Ötök ereje':n===4?'Négyek ereje':n===3?'Hármak ereje':'Közös erő';
   const four=['wizard','witch','fairy','orc'].every(t=>types.has(t));const keep=TEAM_IMG.im,k5=typeof TEAM5_IMG==='object'?TEAM5_IMG.im:null;
   if(!(four&&n===4))TEAM_IMG.im=null;if(!(four&&types.has('monk'))&&typeof TEAM5_IMG==='object')TEAM5_IMG.im=null;
   const hsv=S.heroes;if(S.comboParty)S.heroes=S.comboParty;try{return dcC();}finally{S.heroes=hsv;TEAM_IMG.im=keep;if(typeof TEAM5_IMG==='object')TEAM5_IMG.im=k5;}};}
COMBO.desc='Közös támadás: a harcoló hősök egyszerre csapnak le minden ellenségre. Mindenki limitjét elhasználja.';

// ---- Átok: Morgána csontokat dob a fekete lyukba, abból Hádész emelkedik ki, és ő idézi meg a láncot és a halálfejet
function qBone(x,y,r,s=1){ctx.save();ctx.translate(x,y);ctx.rotate(r);ctx.scale(s,s);ctx.fillStyle='#f3ead6';ctx.strokeStyle='#6a5a40';ctx.lineWidth=1.4;ctx.beginPath();ctx.rect(-14,-3,28,6);ctx.fill();ctx.stroke();
  for(const sx of [-1,1])for(const sy of [-1,1]){ctx.beginPath();ctx.arc(sx*15,sy*3.5,4.5,0,6.29);ctx.fill();ctx.stroke();}ctx.fillStyle='#f3ead6';ctx.fillRect(-13,-2.5,26,5);ctx.restore();}
A.hex=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;await dimTo(.65,'20,0,30',250);u.pose='cast';await bodyWind(u,240,.08);sfx('dark');
  const px=cx(t)+60,py=t.y+t.oy+10,P={a:0,t:0};
  effects.unshift({update(dt){P.t+=dt;return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.translate(px,py);ctx.scale(1,.3);ctx.globalCompositeOperation='lighter';glow(0,0,190*P.a,'150,60,240',.55*P.a);ctx.globalCompositeOperation='source-over';
    for(let i=0;i<3;i++){ctx.rotate(P.t*(1.5+i));ctx.fillStyle=`rgba(${20+i*20},0,${40+i*30},${.6*P.a})`;ctx.beginPath();ctx.ellipse(0,0,(140-i*35)*P.a,(120-i*30)*P.a,0,0,6.29);ctx.fill();}
    ctx.fillStyle=`rgba(5,0,10,${.95*P.a})`;ctx.beginPath();ctx.arc(0,0,70*P.a,0,6.29);ctx.fill();ctx.restore();}});
  await tween(350,k=>{P.a=k;});rumble(.8,4);
  // csontok repülnek a kezéből a lyukba
  const h=handPos(u);u.pose='attack';bodyStrike(u,160,.14);await Promise.all([0,1,2,3,4,5].map(i=>wait(i*90).then(()=>flyObj({x:h.x,y:h.y},{x:px+rnd(-30,30),y:py-6},420,(x,y,r,k)=>qBone(x,y,r,1.3*(1-k*.4)),{spin:rnd(8,14),arc:rnd(90,150)})).then(()=>{sfx('click');for(let j=0;j<5;j++)part({x:px+rnd(-20,20),y:py-6,vx:rnd(-40,40),vy:-rnd(60,140),life:.6,size:rnd(3,6),rgb:pick(['170,90,255','90,40,150'])});})));
  sfx('dark');flash('120,40,200',.3,.15);rumble(1.2,7);
  const Hd=Math.max(300,bigOf(t)*1.9),g=godShow('hades',px,py,Hd,99,'170,90,255'),yEnd=midY(t)-50;g.y=py+Hd*.2;
  for(let i=0;i<30;i++)part({x:px+rnd(-90,90),y:py-rnd(0,30),vx:rnd(-20,20),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(14,26),grow:30,rgb:pick(['40,15,60','70,30,100']),add:false,shape:'dsmoke'});
  await tween(1600,k=>{g.y=py+Hd*.2-(py+Hd*.2-yEnd)*easeIO(k);});await wait(600);
  // Hádész felemeli a kezét: tőle indul a lánc és a halálfej
  const hx=px-Hd*.18,hy=yEnd-Hd*.25,x=cx(t),y=midY(t),big=Math.max(210,t.h*t.scale*1.7);sfx('dark');
  effects.push({t:0,update(dt){this.t+=dt;if(this.t<.4)part({x:hx+rnd(-20,20),y:hy+rnd(-20,20),vx:rnd(-40,40),vy:rnd(-40,40),life:.4,size:rnd(3,6),rgb:'190,110,255',shape:'star'});return this.t<.6;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(hx,hy,80*(1-this.t/.6),'190,110,255',.8);ctx.restore();}});
  // lánc: Hádész kezéből kígyózik a célpontra, és rátekeredik
  const CH={k:0,a:1};effects.push({update(){return CH.a>0;},draw(){if(CH.k<=0)return;ctx.save();ctx.globalAlpha=CH.a;const n=Math.round(22*CH.k);for(let i=0;i<n;i++){const q=i/22,lx=hx+(x-hx)*q+Math.sin(q*9)*24*(1-q),ly=hy+(y-hy)*q-Math.sin(q*Math.PI)*60;ctx.save();ctx.translate(lx,ly);ctx.rotate(Math.atan2(y-hy,x-hx)+(i%2?Math.PI/2:0));
      ctx.strokeStyle='#2a2430';ctx.lineWidth=5;ctx.beginPath();ctx.ellipse(0,0,9,5,0,0,6.29);ctx.stroke();ctx.strokeStyle='#8a8090';ctx.lineWidth=2.5;ctx.stroke();ctx.restore();}ctx.restore();}});
  await tween(650,k=>{CH.k=k;});sfx('click');if(!fxHold('chains',x,y+10,{h:big*1.15,life:1.4,pop:true,pulse:.03}))rune(t,'190,90,255');
  await wait(250);
  // halálfej Hádésztól
  if(FX_IMG.curse){const im=FX_IMG.curse;await wait(300);await flyObj({x:hx,y:hy},{x,y},620,(xx,yy,r,k)=>{ctx.save();ctx.globalAlpha=Math.min(1,k*3);const s=big*(.5+.5*k);ctx.drawImage(im,xx-s/2,yy-s/2,s,s);ctx.restore();},{arc:40,trail:['170,90,255','90,30,150']});}
  flash('200,120,255',.35,.2);hitStop(70);shake(10);punch(x,y,.04);hit(u,t,sk);
  for(let i=0;i<26;i++){const a=rnd(0,Math.PI*2),v=rnd(150,420);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.35,.7),size:rnd(2,5),rgb:pick(['190,90,255','90,30,150']),drag:3,shape:pick(['star','dot'])});}
  await tween(300,k=>{CH.a=1-k;});CH.a=0;await wait(600);await tween(900,k=>{g.y=yEnd+(py+Hd*.3-yEnd)*easeIO(k);});g.dead=true;P.done=true;await tween(350,k=>{P.a=1-k;});P.a=0;await bodySettle(u);u.pose='idle';await dimTo(0,null,300);};
NOFX.add('hex');

// ---- Grog – Forgószél: az ellenségek közepére ugrik, ott megáll és pörög – egyszerre mindenkit vág
A.whirl=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const {mx,gy}=grp(al);u.pose='attack';sfx('whoosh');
  const tx=Math.min(...al.map(t=>t.x))-(al.length>1?0:90),dx=Math.min(mx,tx+60)-u.x-(al.length>1?0:0),dy=gy-u.y,X=()=>cx(u),Y=()=>midY(u);ghosts(u,300);
  await tween(300,k=>{const e=easeIO(k);u.ox=(al.length>1?mx-u.x:tx-u.x)*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*60;});u.jump=0;
  const st={on:true,t:0,R:0};effects.push({update(dt){st.t+=dt;if(st.on&&Math.random()<.8){const a=st.t*16;part({x:X()+Math.cos(a)*st.R*1.2,y:Y()+Math.sin(a)*st.R*.45,vx:-Math.sin(a)*500,vy:Math.cos(a)*180,drag:3,life:.35,size:rnd(2,4),rgb:pick(['255,200,120','255,255,255']),shape:'streak'});
      if(Math.random()<.5)part({x:X()+rnd(-st.R,st.R),y:u.y+u.oy-rnd(0,10),vx:rnd(-120,120),vy:-rnd(20,80),life:.7,size:rnd(14,24),grow:30,rgb:'190,170,140',add:false,shape:'smoke'});}return st.on;},
    draw(){if(!st.on)return;const x=X(),y=Y(),R=st.R;
      const axes=[];for(let i=0;i<4;i++){const an=st.t*16+i*Math.PI/2;axes.push({an,z:Math.sin(an)});}axes.sort((a,b)=>a.z-b.z);for(const q of axes){const s=120*(.85+.15*q.z);for(let g=3;g>=1;g--){const an=q.an-g*.14;drawAxe(x+Math.cos(an)*R,y+Math.sin(an)*R*.42,an+Math.PI/2,s,.16*(4-g));}drawAxe(x+Math.cos(q.an)*R,y+Math.sin(q.an)*R*.42,q.an+Math.PI/2,s,1);}}});
  const R1=Math.max(170,(Math.max(...al.map(cx))-Math.min(...al.map(cx)))/2+110);await tween(250,k=>{st.R=R1*k;});
  const bz=setInterval(()=>sfx('slash'),130);for(let w=0;w<8;w++){u.spin=(u.spin||0)+.8;for(const t of al)if(t.alive){sparks(cx(t)+rnd(-20,20),midY(t)+rnd(-30,30),['255,240,200','255,255,255','255,160,60'],8,420);t.hurt=.2;t.ox=rnd(-8,8);}shake(5);await wait(110);}
  clearInterval(bz);for(const t of al)t.ox=0;hitStop(80);for(const t of al){toss(t,40,320);hit(u,t,sk);}await tween(250,k=>{st.R=R1*(1-k);});st.on=false;u.spin=0;
  ghosts(u,300);const ox=u.ox,oy=u.oy;await tween(320,k=>{const e=easeIO(k);u.ox=ox*(1-e);u.oy=oy*(1-e);u.jump=Math.sin(k*Math.PI)*50;});u.ox=0;u.oy=0;u.jump=0;u.pose='idle';};

// ---- Földrengés: EGY hatalmas földmozgás az egész csatatéren (nem ellenségenként)
function r13Quake(u,al,big){const {mx,gy}=grp(al),x0=Math.min(...al.map(cx))-140,x1=Math.max(...al.map(cx))+140,Wd=x1-x0;const st={t:0,k:0};
  rumble(big?2.6:1.6,big?18:11);groundCrack(mx,gy,'200,170,120',Wd*.6);dustWave(mx,gy);
  const n=big?14:8;for(let i=0;i<n;i++){const x=x0+Wd*(i+.5)/n+rnd(-20,20);setTimeout(()=>{fxImage('rock',x,gy+14,{size:(big?rnd(170,260):rnd(110,170)),life:1,anchor:'bottom',grow:.4});puffs(x,gy-10,3,['170,150,120','140,120,100'],[22,36],{w:40,up:110});},i*25/(S.speed||1));}
  for(let i=0;i<(big?60:30);i++)part({x:rnd(x0,x1),y:gy+rnd(-20,20),vx:rnd(-120,120),vy:rnd(-620,-260),g:900,life:rnd(.7,1.2),size:rnd(5,11),rgb:pick(['150,140,130','110,100,95','170,150,120']),add:false,shape:'rock'});}
A.quake=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;await dimTo(.55,'30,18,6',260);u.pose='attack';
  await tween(380,k=>{u.jump=Math.sin(k*Math.PI)*120;});u.jump=0;flash('255,230,180',.5,.25);hitStop(110);sfx('rock');sfx('boom');r13Quake(u,al,true);
  await wait(250);for(const t of al){toss(t,90,600);t.hurt=.5;}shake(20);for(const t of al)hit(u,t,sk);await wait(1300);u.pose='idle';await dimTo(0,null,350);};
// ---- Földrepesztés: ugyanilyen földmozgás, kisebb – föld elem, láva nélkül
A.earthsplit=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;if(sk&&sk.elem==='lava'&&A_R10.get('earthsplit'))return A_R10.get('earthsplit')(u,ts,sk);u.pose='attack';
  await tween(300,k=>{u.jump=Math.sin(k*Math.PI)*70;});u.jump=0;sfx('rock');shake(12);const {gy}=grp(al);groundCrack((cx(u)+Math.max(...al.map(cx)))/2,gy+6,'120,90,60',Math.max(...al.map(cx))-cx(u)+120);
  await wait(250);r13Quake(u,al,false);await wait(150);for(const t of al){toss(t,56,420);t.hurt=.4;hit(u,t,sk);}await wait(1100);u.pose='idle';};

// ---- Titáncsapás (Grog limitje): óriásira nő, az ellenségek ELÉ ugrik (nem takarja el őket), és látványosan, a fejszéjével lecsap
A.titanAll=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const {mx,gy}=grp(al),s0=u.scale0||u.scale,big=s0*2.1;await dimTo(.66,'24,14,6',240);u.pose='cast';rumble(1.2,6);
  flash('255,200,120',.3,.25);for(let i=0;i<36;i++){const a=rnd(0,Math.PI*2),r=rnd(110,220),life=rnd(.4,.6);part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r,vx:-Math.cos(a)*r/life,vy:-Math.sin(a)*r/life,life,size:rnd(3,6),rgb:pick(['255,200,120','150,140,130']),shape:'streak'});}
  await tween(750,k=>{const e=1-Math.pow(1-k,3);u.scale=s0+(big-s0)*e;});shake(10);await wait(200);
  const front=Math.min(...al.map(t=>t.x-t.w*t.scale*.5)),dx=front-u.x-u.w*big*.42-30,dy=gy-u.y;u.pose='attack';ghosts(u,600);
  await tween(320,k=>{const e=k*k;u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*110;});u.jump=0;
  // a saját fejszéjével: hátrahajol, magasra lendíti…
  u.pose='cast';await tween(260,k=>{u.sq=1-.12*easeIO(k);});await tween(420,k=>{const e=Math.sin(k*Math.PI/2);u.lean=.3*e;u.jump=140*e;u.sq=.88+.18*k;});sfx('whoosh');u.pose='attack';
  // …és teljes testével lecsap
  await tween(200,k=>{u.lean=.3-.78*k*k;u.jump=140*(1-k*k);u.sq=1.06-.18*k;});u.jump=0;
  flash('255,255,255',.8,.35);hitStop(170);rumble(1.8,22);punch(mx,gy-60,.08);sfx('rock');sfx('boom');
  const hitX=front+20;groundCrack(hitX,gy,'255,200,140',360);dustWave(hitX,gy);soundBlast(hitX,gy-30,'255,220,160',420,600);
  sparks(hitX,gy,['150,140,130','255,220,160','110,100,95'],70,800);r13Quake(u,al,true);
  for(const t of al){toss(t,80,560);t.hurt=.5;hit(u,t,sk);}
  await wait(500);await tween(260,k=>{u.lean=-.48*(1-easeIO(k));u.sq=.92+.08*k;});u.lean=0;u.sq=1;ghosts(u,300);await tween(340,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);});u.ox=0;u.oy=0;
  await tween(420,k=>{u.scale=big+(s0-big)*k;});u.scale=s0;u.pose='idle';await wait(300);await dimTo(0,null,300);};

// ---- Napkitörés: sokkal nagyobb, látványosabb felrobbanás
{const sN=A.solarNova;A.solarNova=async(u,ts,sk)=>{const fl=flash;let armed=true;
  flash=function(rgb,a,d){const r=fl.apply(this,arguments);if(armed&&rgb==='255,250,220'){armed=false;const x=W*.52,y=160;
      fl('255,255,240',.9,.5);bigBoom(x,y,3.2);for(let i=0;i<5;i++)setTimeout(()=>{bigBoom(x+rnd(-260,260),y+rnd(-60,120),1.4);},i*90/(S.speed||1));
      soundBlast(x,y,'255,220,140',900,1100);soundBlast(x,y,'255,255,255',600,800);
      effects.push({t:0,update(dt){this.t+=dt;if(this.t<1.2)for(let i=0;i<6;i++)part({x:rnd(0,W),y:-10,vx:rnd(-40,40),vy:rnd(200,420),life:rnd(1,1.6),size:rnd(3,6),rgb:pick(['255,200,90','255,150,50','255,240,200']),shape:'streak'});return this.t<1.6;},
        draw(){const k=this.t/1.6;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,200+1100*Math.sqrt(k),'255,210,120',.8*(1-k));glow(x,y,120+500*k,'255,255,230',.9*(1-k));ctx.restore();}});}
    return r;};
  try{return await sN(u,ts,sk);}finally{flash=fl;}};}

// ---- Sötét alku: a limitje megtelik, és a következő limitje Cerberus – Morgána Hádész háromfejű kutyájává változik
const CERB={name:'Cerberus',tgt:'enemies',kind:'mag',pow:2.8,elem:'dark',anim:'cerberus',isLimit:true,status:['burn',.6,2],desc:'Morgána Hádész háromfejű kutyájává, Cerberusszá változik: rárohan az ellenségekre, három fejjel harap, és lila pokoltüzet okád.'};
{const WL=LIMITS.witch;Object.defineProperty(LIMITS,'witch',{configurable:true,enumerable:true,get(){const h=(S.heroes||[]).find(x=>x.type==='witch');return h&&h._cerb?CERB:WL;}});}
{const pf=A.pactFx;A.pactFx=async function(u,ts,sk){const r=await pf.apply(this,arguments);if(u&&u.type==='witch'){u.limit=100;u._cerb=true;popLabel(u,'LIMIT TELE: CERBERUS!','#c58bff');sfx('dark');updateHUD();}return r;};}
if(SK.darkpact)SK.darkpact.desc='Életerőt áldoz, cserébe 60 MP-t kap, és a limitje megtelik: a következő limitje Cerberus – Hádész háromfejű kutyájává változik.';
// fekete-lila lángnyelvek (nem füst): lilán izzó mag, fekete szél, felfelé lobogó csúcs
function darkFlame(o){const f={x:o.x,y:o.y,vx:o.vx||0,vy:o.vy||-80,t:0,life:o.life||.6,s:o.size||20,ph:rnd(0,6)};effects.push({update(dt){f.t+=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=.96;f.vy-=60*dt;return f.t<f.life;},
  draw(){const k=f.t/f.life,s=f.s*(1+.6*k)*(k<.15?k/.15:1),a=Math.min(1,(1-k)*1.6),w=Math.sin(T*18+f.ph)*.25;ctx.save();ctx.translate(f.x,f.y);ctx.rotate(Math.atan2(f.vx,-f.vy)*.5+w*.3);
        for(const [sc,c0,c1] of [[1,'rgba(20,0,30,'+(.92*a)+')','rgba(70,10,110,'+(.8*a)+')'],[.55,'rgba(120,30,200,'+(.9*a)+')','rgba(220,150,255,'+a+')']]){const q=s*sc,gg=ctx.createLinearGradient(0,-q*2.2,0,q*.5);gg.addColorStop(0,'rgba(0,0,0,0)');gg.addColorStop(.35,c0);gg.addColorStop(1,c1);ctx.fillStyle=gg;ctx.beginPath();ctx.moveTo(w*q,-q*2.4);ctx.bezierCurveTo(q*(.35+w),-q*1.2,q*.6,0,0,q*.45);ctx.bezierCurveTo(-q*.6,0,-q*(.35-w),-q*1.2,w*q,-q*2.4);ctx.fill();}ctx.restore();}});}
A.cerberus=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);u._cerb=false;if(!al.length)return;const im=FX_IMG.cerberus;await dimTo(.8,'20,0,25',300);sfx('dark');
  const C={x:cx(u),y:u.y+u.oy,a:0,s:.3,open:0,heads:[0,0,0],on:true,t:0},Hh=u.h*u.scale*1.25;
  effects.push({update(dt){C.t+=dt;if(C.on&&Math.random()<.9)darkFlame({x:C.x+rnd(-80,80),y:C.y-rnd(0,Hh*.8),vx:rnd(-30,30),vy:-rnd(40,120),life:rnd(.4,.8),size:rnd(14,26),grow:30,rgb:pick(['40,0,60','90,20,150','20,0,30']),add:false,shape:'dsmoke'});return C.on;},
    draw(){if(!im||C.a<=0)return;const H2=Hh*C.s,W2=H2*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(C.x,C.y);ctx.scale(-1,1);   // jobbra néz
      ctx.translate(0,Math.sin(C.t*14)*3*C.open);ctx.rotate(-.06*C.open);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.globalCompositeOperation='lighter';ctx.globalAlpha*=.25+.2*Math.sin(C.t*8);ctx.drawImage(im,-W2/2,-H2,W2,H2);ctx.restore();
      ctx.save();ctx.globalCompositeOperation='lighter';for(const [fu,fv] of [[.06,.2],[.04,.5],[.2,.45]]){const ex=C.x+(W2/2-fu*W2),ey=C.y-H2+fv*H2;glow(ex,ey,14+10*C.open,'255,60,160',.6*C.a);}ctx.restore();}});
  // átváltozás: Morgána lila lángba borul, eltűnik, a helyén kinő Cerberus
  for(let i=0;i<40;i++)darkFlame({x:cx(u)+rnd(-40,40),y:u.y+u.oy-rnd(0,u.h*u.scale),vx:rnd(-60,60),vy:-rnd(80,240),life:rnd(.6,1),size:rnd(16,30),grow:40,rgb:pick(['40,0,60','90,20,150','20,0,30']),add:false,shape:'dsmoke'});
  rumble(1.2,8);await tween(500,k=>{u.alpha=1-k;});u.alpha=0;sfx('wail');flash('150,60,255',.4,.2);await tween(450,k=>{C.a=k;C.s=.3+.7*eOutBack(k);});await wait(250);
  // üvöltés
  sfx('growl');sfx('wail');shake(12);soundBlast(C.x+90,C.y-Hh*.75,'200,80,255',300,600);await tween(350,k=>{C.open=Math.sin(k*Math.PI);});
  // rárohan az ellenségekre: minden ellenséget megharap (három fej)
  const x0=C.x;for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){if(!t.alive)continue;const tx=cx(t)-Hh*.55,sx=C.x;sfx('whoosh');await tween(260,k=>{C.x=sx+(tx-sx)*easeIO(k);C.y=u.y+u.oy+(t.y+t.oy-u.y-u.oy)*easeIO(k)-Math.sin(k*Math.PI)*50;});
    for(let b=0;b<3;b++){C.open=1;sfx('bite');shake(8);hitStop(40);t.hurt=.3;for(let i=0;i<6;i++)part({x:cx(t)+rnd(-30,30),y:midY(t)+rnd(-40,40)-b*20,vx:rnd(-150,150),vy:rnd(-150,60),life:.4,size:rnd(3,5),rgb:pick(['255,80,160','255,255,255']),shape:'star'});clawMarks(cx(t)+rnd(-20,20),midY(t)-b*18,t.h*t.scale*.6,rnd(-.5,.5),'255,80,170');await wait(110);C.open=0;await wait(60);}}
  // pokoltűz-okádás mindenkire
  sfx('fire');C.open=1;const mouth=()=>({x:C.x+Hh*.55,y:C.y-Hh*.7});const st={t:0};effects.push({update(dt){st.t+=dt;if(st.t<.9)for(let i=0;i<10;i++){const t=pick(al),m=mouth(),an=Math.atan2(midY(t)-m.y,cx(t)+rnd(-60,60)-m.x)+rnd(-.15,.15),v=rnd(700,950);darkFlame({x:m.x,y:m.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v,drag:1.2,life:rnd(.5,.8),size:rnd(18,30),grow:50,rgb:pick(['30,0,45','110,30,190','60,0,90']),add:false,shape:'dsmoke'});}return st.t<1;},draw(){}});
  await wait(600);flash('200,100,255',.5,.2);shake(18);hitStop(100);for(const t of al){if(!t.alive)continue;soundBlast(cx(t),midY(t),'190,80,255',200,450);for(let i=0;i<16;i++)darkFlame({x:cx(t)+rnd(-50,50),y:midY(t)+rnd(-60,40),vx:rnd(-40,40),vy:-rnd(60,160),life:rnd(.5,.9),size:rnd(22,38)});t.hurt=.5;toss(t,40,340);hit(u,t,sk);}await wait(400);C.open=0;
  // vissza, és visszaváltozik
  const bx=C.x;await tween(380,k=>{C.x=bx+(x0-bx)*easeIO(k);C.y=u.y+u.oy-Math.sin(k*Math.PI)*40;});await tween(400,k=>{C.a=1-k;C.s=1-.5*k;u.alpha=k;});u.alpha=1;C.on=false;u.pose='idle';await dimTo(0,null,350);};
NOFX.add('cerberus');

// ---- Espresszó idézés: az álló képe (nem a beégetett kávésugaras), hátraszegi a fejét, előrelendül, és hatalmas lángcsóvát lehel a szájából
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){es.img=()=>ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
  es.run=async(P,S0)=>{const im=ENEMY_SPR.espresso,fs=foesAlive();if(!fs.length)return;const x0=S0.x,s0=S0.s||1,m=()=>im?sumPt(es,S0,im,.2,.285):{x:S0.x+120,y:S0.y-200};
    sfx('fire');const G={a:0,on:true};effects.push({update(){if(G.on&&Math.random()<.8){const p=m(),a=rnd(0,6.28),r=rnd(40,100);part({x:p.x+Math.cos(a)*r,y:p.y+Math.sin(a)*r,vx:-Math.cos(a)*r*2.4,vy:-Math.sin(a)*r*2.4,life:.4,size:rnd(2,4),rgb:pick(['255,200,90','255,120,40'])});}return G.on;},draw(){const p=m();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,30+50*G.a,'255,140,40',.7*G.a);glow(p.x,p.y,14+16*G.a,'255,240,200',.9*G.a);ctx.restore();}});
    await tween(520,k=>{const e=easeIO(k);S0.x=x0-30*e;S0.s=s0*(1+.06*e);G.a=k;});rumble(2,12);flash('255,160,60',.45,.25);sfx('fire');sfx('boom');
    tween(180,k=>{S0.x=x0-30+70*eOutBack(k);S0.s=s0*(1.06-.04*k);});const bz=setInterval(()=>sfx('fire'),280);
    const scorch=[];await fireBreath(m(),fs,1,{dur:2000,speed:1100,n:34,onHit:t=>{if(!t.alive)return;shake(10);for(let i=0;i<16;i++)part({x:cx(t)+rnd(-50,50),y:t.y+t.oy-rnd(0,t.h*t.scale),vx:rnd(-30,30),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(16,28),grow:40,rgb:'255,150,40',add:false,shape:'fire'});
      if(!scorch.includes(t)){scorch.push(t);hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});}}});
    clearInterval(bz);G.on=false;for(const t of fs)if(t.alive&&!scorch.includes(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    for(const t of fs)if(t.alive){bigBoom(cx(t),midY(t),.9);}await tween(300,k=>{S0.x=x0+40*(1-k);S0.s=s0*(1.02-.02*k);});await wait(400);};}}
{const kg=SUMMONS.find(x=>x.id==='koffgolem');if(kg)kg.img=()=>ENEMY_SPR.koffgolem||ENEMY_SPR['koffgolem-attack'];}

SUMMON_EL.koffgolem='buff';
