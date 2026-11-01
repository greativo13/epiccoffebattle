// ===== 60. kör: pontosítások (Életszívás mesterfok, Lili képe, lebegés, Jázmin plakátja, Erdő haragja) =====

// ---- 1) Mesterfok („Életszívásnál 3/3 a mesterfok, de csak 2/3 megy fel”): a számláló jól számolt, de a 3. használat után
//    a „2/3” jelvény eltűnt, és csak egy kis ★ került a név elé – úgy tűnt, mintha megakadna. Mostantól mesterfoknál a gombon
//    jól látható „★ 3/3 MESTER” jelvény áll.
{const sb=setButtons;setButtons=function(list){const r=sb.apply(this,arguments);try{for(const el of btnsEl.querySelectorAll('button.cbtn.r21mast'))if(!el.querySelector('.r21badge')){const sp=document.createElement('span');sp.className='r21badge r21full';sp.textContent='★ '+R21_MN+'/'+R21_MN+' MESTER';el.appendChild(sp);}}catch(e){}return r;};}
{const st=document.createElement('style');st.textContent='.r21badge.r21full{opacity:1;color:#2a1a00;background:#ffd84a;border-radius:6px;padding:0 4px}';document.head.appendChild(st);}

// ---- 2) Lili fejlesztett ruhás képei („hiányos a kép”): a régi háttér-eltávolítás kirágta a szárnyakat (főleg a varázsló
//    pózban, amit az Égi áldás használ). Ugyanez a póz a sima ruhás képen ép szárnyakkal megvan – azt tesszük alá,
//    a fejlesztett ruha meleg, krémszínű szárnyához színezve.
(function(){const P=[['fairyG','fairy'],['fairyG-cast','fairy-cast'],['fairyG-attack','fairy-attack'],['fairyG-hurt','fairy-hurt']];const done=new Set();let n=0;
  const iv=setInterval(()=>{n++;try{if(typeof ENEMY_SPR==='object')for(const [a,b] of P){if(done.has(a))continue;const A0=ENEMY_SPR[a],B0=ENEMY_SPR[b];if(!A0||!B0||!A0.width||!B0.width)continue;
      const c=document.createElement('canvas');c.width=A0.width;c.height=A0.height;const g=c.getContext('2d');g.globalAlpha=.85;try{g.filter='sepia(.85) saturate(1.8) hue-rotate(-8deg) brightness(1.05)';}catch(e){}g.drawImage(B0,0,0,A0.width,A0.height);g.globalAlpha=1;try{g.filter='none';}catch(e){}g.drawImage(A0,0,0);
      ENEMY_SPR[a]=c;done.add(a);}}catch(e){}if(done.size>=P.length||n>80)clearInterval(iv);},300);})();

// ---- 3) Lebegés („minden szereplő és ellenség lebeg”): a hátsó sor lába (y≈344) a legtöbb háttéren a fal/lépcső magasságába
//    esett, a padló fölé – ezért lebegtek. A teljes felállás (hősök és ellenfelek helyei) lejjebb és kicsit összébb kerül,
//    hogy mindenki a padlón álljon: y' = 380 + (y−344)·0,8.
const r21FloorY=y=>y<376?Math.round(380+(y-344)*.8):y;
(function(){try{for(const t in HERO_DEF){const p=HERO_DEF[t].pos;if(p&&p[1]<480)p[1]=Math.round(380+(p[1]-344)*.8);}
  const fixS=a=>{if(Array.isArray(a)&&a.length===2&&typeof a[1]==='number'){a[1]=Math.round(380+(a[1]-344)*.8);return;}if(Array.isArray(a))a.forEach(fixS);else if(a&&typeof a==='object')Object.values(a).forEach(fixS);};
  fixS(SLOTS);for(const z of ZONES)for(const L of z.levels){if(L.slots)fixS(L.slots);if(L.bslots)fixS(L.bslots);if(L.slots3)fixS(L.slots3);}
  if(typeof SECRET==='object'&&SECRET&&SECRET.slots)fixS(SECRET.slots);if(typeof SECRET3==='object'&&SECRET3&&SECRET3.slots)fixS(SECRET3.slots);}catch(e){console.error('padló',e);}})();
// menet közben létrehozott ellenfelek (idézett alattvalók stb.) is a padlóra
{const mk=mkEnemy;mkEnemy=function(t,x,y){if(typeof y==='number')arguments[2]=r21FloorY(y);return mk.apply(this,arguments);};}

// ---- 4) Jázmin plakátja („a plakáton Jázmin meditáló képén fehér van”): a nyaka mögött és a dereka két oldalán maradt
//    világos háttérfolt – gépi kereséssel kimérve (≥222, ≥25 px), átlátszóvá téve
(function(){const FIX={'monk-meditate':[[.41,.33],[.59,.64],[.39,.61],[.38,.66]]};const done=new Set();let n=0;
  const run=(k,cs)=>{const c=ENEMY_SPR[k];if(!c||!c.width||!c.getContext)return false;const g=c.getContext('2d'),W2=c.width,H2=c.height,d=g.getImageData(0,0,W2,H2),px=d.data,N=W2*H2;
    const wh=i=>px[i*4+3]>200&&Math.min(px[i*4],px[i*4+1],px[i*4+2])>=222,seen=new Uint8Array(N);
    for(let i=0;i<N;i++){if(seen[i]||!wh(i))continue;const st=[i],pts=[];seen[i]=1;while(st.length){const j=st.pop();pts.push(j);const x=j%W2;for(const q of [j-1,j+1,j-W2,j+W2]){if(q<0||q>=N||Math.abs((q%W2)-x)>1)continue;if(!seen[q]&&wh(q)){seen[q]=1;st.push(q);}}}
      if(pts.length<25)continue;let sx=0,sy=0;for(const j of pts){sx+=j%W2;sy+=(j/W2)|0;}const mx=sx/pts.length/W2,my=sy/pts.length/H2;if(cs.some(([u,v])=>Math.abs(u-mx)<.025&&Math.abs(v-my)<.025))for(const j of pts)px[j*4+3]=0;}
    g.putImageData(d,0,0);return true;};
  const iv=setInterval(()=>{n++;try{if(typeof ENEMY_SPR==='object')for(const [k,cs] of Object.entries(FIX))if(!done.has(k)&&run(k,cs))done.add(k);}catch(e){}if(done.size>=1||n>80)clearInterval(iv);},300);})();

// ---- 5) Kaelen – Erdő haragja („olyan robotos mozgású”): a fakar eddig merev képként, egyenletes forgással mozgott.
//    Most rugós, élő mozgás: kinövéskor túllendül és visszarugózik, felemeléskor lassan hátrahúzódik és remeg, a lecsapás
//    gyorsulva jön, a becsapódásnál a kar összenyomódik és visszapattan, és végig enyhén hullámzik. Kaelen teste együtt
//    dől a karral.
A.forestWrath=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const rel=keepPose(u,'cast');
  try{const TA=R17I.treearm,LF=R17I.leaf,PB=R17I.pebble;
  const leaf=(x,y,vx,vy)=>r21PD(LF,x,y,{vx,vy,g:260,life:rnd(.8,1.3),size:rnd(18,32),vr:rnd(-7,7),drag:1});
  const bark=(x,y,vx,vy)=>r21PD(PB,x,y,{vx,vy,g:900,life:rnd(.6,1),size:rnd(14,26),vr:rnd(-9,9)});
  const palm=()=>{const p=KP(u,.85,.39),l=u.lean||0;if(!l)return p;const x0=cx(u),y0=u.y+u.oy,dx=p.x-x0,dy=p.y-y0,c=Math.cos(l),sn=Math.sin(l);return {x:x0+dx*c-dy*sn,y:y0+dx*sn+dy*c};};
  const iw=TA?TA.width:626,ih=TA?TA.height:504,CL={x:.75,y:.73*ih/iw},base=Math.atan2(CL.y,CL.x);
  const tgt={x:(Math.min(...al.map(cx))+Math.max(...al.map(cx)))/2,y:Math.min(...al.map(t=>midY(t)))};
  const P0=palm(),dist=Math.hypot(tgt.x-P0.x,tgt.y-P0.y),Wf=dist/Math.hypot(CL.x,CL.y)*1.02,aim=Math.atan2(tgt.y-P0.y,tgt.x-P0.x)-base;
  // rugós állapot: ang a cél felé húzódik (k: rugó, d: csillapítás), sx/sy összenyomódás
  const A0={k:0,a:0,ang:aim-1.2,va:0,goal:aim-1.2,K:90,D:11,sx:1,sy:1,t:0,trem:0,done:false};
  R18E({update(dt){A0.t+=dt;const acc=A0.K*(A0.goal-A0.ang)-A0.D*A0.va;A0.va+=acc*dt;A0.ang+=A0.va*dt;return !A0.done||A0.a>0;},
    draw(){if(!TA||A0.a<=0)return;const p=palm(),w=Wf*(.25+.75*A0.k),h=w*ih/iw,sway=Math.sin(A0.t*3.1)*.025+Math.sin(A0.t*37)*A0.trem;
      ctx.save();ctx.globalAlpha=A0.a;ctx.translate(p.x,p.y);ctx.rotate(A0.ang+sway);ctx.scale(-A0.sx,A0.sy);ctx.drawImage(TA,-w*.9,-h*.12,w,h);ctx.restore();}});
  sfx('spell');sfx('growl');await dimTo(.45,'6,20,4',200);rumble&&rumble(.8,5);{const p=palm();for(let i=0;i<14;i++)leaf(p.x,p.y,rnd(-160,200),-rnd(40,220));}
  // 1) kinő a tenyeréből, túllendül, visszarugózik
  sfx('rock');A0.goal=aim-1.5;await tween(420,k=>{A0.a=Math.min(1,k*3);A0.k=eOutBack(k);u.lean=.12*easeIO(k);});popLabel(al[0],'ERDŐ HARAGJA!','#9ee06a');
  // 2) lassan hátrahúzza (felhúzás), Kaelen hátradől, a kar remeg a feszültségtől
  sfx('wind');A0.K=40;A0.goal=aim-1.85;await tween(520,k=>{A0.trem=.012*k;u.lean=.12+.08*easeIO(k);A0.sx=1-.06*k;A0.sy=1+.05*k;});
  for(let i=0;i<10;i++)leaf(P0.x+rnd(0,Wf*.5),P0.y-rnd(60,200),rnd(-120,120),rnd(-60,60));
  // 3) gyorsuló lecsapás – a rugó megfeszül, a kar megnyúlik
  sfx('whoosh');A0.trem=0;A0.K=420;A0.D=16;A0.goal=aim+.1;await tween(130,k=>{u.lean=.2-.42*k*k;A0.sx=.94+.16*k;A0.sy=1.05-.12*k;});
  hitStop(140);shake(26);flash('255,235,190',.25,.1);sfx('crunch');sfx('earthm');sfx('hit');
  for(const t of al){const x=cx(t),y=midY(t);for(let n=0;n<10;n++)leaf(x,y,rnd(-300,300),rnd(-340,-40));for(let n=0;n<8;n++)bark(x,y,rnd(-280,280),rnd(-420,-120));
    sparks(x,y,['255,240,200','210,190,140'],18,420);t.hurt=.7;toss(t,60,380);if(t.alive)(typeof r21HitNS==='function'?r21HitNS:hit)(u,t,sk);}
  // becsapódás: összenyomódik, visszapattan
  await tween(260,k=>{const e=eOutBack(k);A0.sx=1.1-.1*e;A0.sy=.93+.07*e;u.lean=-.22+.06*k;});A0.K=70;A0.D=9;A0.goal=aim;await wait(260);
  // 4) rugalmasan visszahúzódik a tenyerébe
  sfx('whoosh');A0.goal=aim-.6;await tween(380,k=>{const e=easeIO(k);A0.k=1-e;A0.a=1-Math.max(0,(k-.45)/.55);u.lean=-.16*(1-e);});
  A0.done=true;A0.a=0;u.lean=0;await dimTo(0,null,250);
  }finally{rel();}};
