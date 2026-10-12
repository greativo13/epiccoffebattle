// ===== 29. kör: játékötletek – nagy „GYENGE PONT!” jelzés, filmszerű főellenség-belépő, időjárás a pályákon =====

// ---- 1) GYENGE PONT: ha a támadás eleme gyenge pontot talál, nagy, arany, felrobbanó felirat az ellenség fölött,
// villanás, rázkódás, csengés nélküli „ütés” hang; a kis „NAGYON HAT!” / „GYENGE PONT: …” címke helyett
const R21WEAK={t:new Map()};
{const pl=popLabel;popLabel=function(e,text,color){if(e&&e.kind==='enemy'&&typeof text==='string'&&(text==='NAGYON HAT!'||text.startsWith('GYENGE PONT')))return;return pl.apply(this,arguments);};}
function r21WeakBurst(t,el){const now=performance.now();if(now-(R21WEAK.t.get(t)||0)<500)return;R21WEAK.t.set(t,now);
  const col=(typeof R14_ELCOL!=='undefined'&&R14_ELCOL[el])||'#ffd84a',x=Math.min(W-150,Math.max(150,cx(t))),y=Math.max(70,topY(t)-40);
  const st={t:0};shake(10);flash('255,240,190',.22,.1);sfx('boom');
  for(let i=0;i<26;i++){const a=rnd(0,6.28),v=rnd(160,420);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.4,.8),size:rnd(3,6),rgb:pick(['255,230,120','255,255,255','255,190,80']),shape:'star'});}
  R18E({update(dt){st.t+=dt;return st.t<1.25;},draw(){const k=st.t,s=k<.18?r21ease.back(k/.18):1+.04*Math.sin(k*20)*(1-k),a=k<1?1:1-(k-1)/.25;
    ctx.save();ctx.globalAlpha=a;ctx.translate(x,y-k*18);ctx.scale(s,s);ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.globalCompositeOperation='lighter';glow(0,0,120,'255,210,100',.45*a);ctx.globalCompositeOperation='source-over';
    ctx.font='900 40px Fredoka, "Baloo 2", system-ui, sans-serif';ctx.lineJoin='round';ctx.lineWidth=9;ctx.strokeStyle='#3a1600';ctx.strokeText('GYENGE PONT!',0,0);
    const g=ctx.createLinearGradient(0,-20,0,20);g.addColorStop(0,'#fff6c0');g.addColorStop(.5,'#ffd23a');g.addColorStop(1,'#ff8a1a');ctx.fillStyle=g;ctx.fillText('GYENGE PONT!',0,0);
    const nm=(typeof ELEM_NAMES!=='undefined'&&ELEM_NAMES[el])||'';if(nm){ctx.font='800 19px Fredoka, system-ui, sans-serif';ctx.lineWidth=5;ctx.strokeStyle='#1b1026';ctx.strokeText(nm.toUpperCase()+' – NAGYON HAT',0,30);ctx.fillStyle=col;ctx.fillText(nm.toUpperCase()+' – NAGYON HAT',0,30);}
    ctx.restore();}});}
{const hW=hit;hit=function(u,t,sk){const r=hW.apply(this,arguments);try{if(t&&t.kind==='enemy'&&u&&u.kind==='hero'&&sk&&sk.elem&&sk.kind!=='heal'){const o=elemOf(t)||{};if((o[sk.elem]||1)>=1.3)r21WeakBurst(t,sk.elem);}}catch(e){}return r;};}

// ---- 2) FŐELLENSÉG-BELÉPŐ: fekete szélesvásznú sávok csúsznak be, a kép elsötétül, a főellenség kivilágosodik és közelebb
// „lép” (megnő), a neve hatalmas betűkkel beúszik, alatta „FŐELLENSÉG”, mély morgás, földrengés; utána minden visszaáll
{const sb=showBanner;showBanner=function(text,big){const r=sb.apply(this,arguments);try{if(big&&S.enemies&&S.enemies.length){const b=S.enemies.find(e=>e.d&&(e.d.boss||e.d.miniboss));if(b&&!S._bossIntro){S._bossIntro=true;r21BossIntro(b,b.d.boss?'FŐELLENSÉG':'MINIBOSSZ');}}}catch(e){}return r;};}
{const sB=startBattle;startBattle=async function(){S._bossIntro=false;return sB.apply(this,arguments);};}
function r21BossIntro(b,sub){const st={t:0,L:2.6};sfx('growl');setTimeout(()=>{sfx('roar');shake(16);rumble&&rumble(1,8);},900);
  R18E({update(dt){st.t+=dt;return st.t<st.L;},draw(){const k=st.t,inA=Math.min(1,k/.35),out=k>st.L-.45?(st.L-k)/.45:1,a=inA*out,bar=70*r21ease.out(inA)*out;
    ctx.save();ctx.fillStyle=`rgba(5,3,10,${.45*a})`;ctx.fillRect(0,0,W,H);
    // a főellenség fénybe kerül
    ctx.globalCompositeOperation='lighter';glow(cx(b),midY(b),b.h*b.scale*.9,'255,120,60',.35*a);ctx.globalCompositeOperation='source-over';
    ctx.fillStyle='#000';ctx.fillRect(0,0,W,bar);ctx.fillRect(0,H-bar,W,bar);
    // név: jobbról beúszik, megáll, kicsit nő
    const nk=Math.max(0,Math.min(1,(k-.5)/.45)),nx=W/2+(1-r21ease.out(nk))*W*.6,s=1+.04*Math.max(0,k-1);
    if(nk>0){ctx.globalAlpha=out*nk;ctx.textAlign='center';ctx.textBaseline='middle';ctx.translate(nx,H*.24);ctx.scale(s,s);
      ctx.font='800 18px Fredoka, system-ui, sans-serif';ctx.fillStyle='#ffb070';ctx.fillText(sub,0,-40);
      ctx.font='900 54px Fredoka, "Baloo 2", system-ui, sans-serif';ctx.lineJoin='round';ctx.lineWidth=10;ctx.strokeStyle='#1a0606';ctx.strokeText(b.name||b.d.name,0,6);
      const g=ctx.createLinearGradient(0,-24,0,30);g.addColorStop(0,'#ffe6b0');g.addColorStop(.55,'#ff9a3c');g.addColorStop(1,'#c0301a');ctx.fillStyle=g;ctx.fillText(b.name||b.d.name,0,6);
      ctx.fillStyle='#ffb070';ctx.fillRect(-160*nk,40,320*nk,3);}
    ctx.restore();}});
  // a főellenség „előrelép”: rövid nagyítás és vissza
  const sc0=b.scale;tween(700,k=>{b.scale=sc0*(1+.12*Math.sin(Math.min(1,k)*Math.PI));}).then(()=>b.scale=sc0);}

// ---- 3) IDŐJÁRÁS a pályák témája szerint (finom, nem takarja a harcot): eső, köd, hulló levelek/szirmok, hópihék, hamu, gőz
const R21WX={bamboo:'rain',matchastream:'rain',moss:'leaves',oakheart:'leaves',trunk:'leaves',mistpeak:'fog',zengarden:'petals',cloudpalace:'petals',cloudstairs:'fog',
  matchacave:'drip',teahouse:'motes',teahall:'motes',crystal:'snow',cave:'drip',lava:'ash',volcano:'ash',kiln:'ash',dunes:'sand',caramel:'sand',moongarden:'petals',dreamthrone:'stars',pillowhall:'stars',echo:'drip',summit:'snow',terrace:'leaves'};
{const am=ambient;ambient=function(){am.apply(this,arguments);try{if(!S||S.paused)return;const w=R21WX[S.theme];if(!w)return;
  if(w==='rain'){for(let i=0;i<2;i++)part({x:rnd(-40,W),y:-10,vx:-70,vy:rnd(780,900),life:.8,size:rnd(1.2,1.8),rgb:'190,215,235',add:false,shape:'streak'});if(Math.random()<.15)part({x:rnd(0,W),y:rnd(430,520),vx:rnd(-30,30),vy:-rnd(40,90),g:500,life:.3,size:rnd(1.5,2.5),rgb:'210,230,245',add:false,shape:'drop'});}
  else if(w==='leaves'){if(Math.random()<.05&&R17I.leaf){const lf={x:rnd(-20,W),y:-20,vx:rnd(15,40),vy:rnd(30,55),r:rnd(0,6),s:rnd(.5,.8),t:0};R18E({update(dt){lf.t+=dt;lf.x+=lf.vx*dt+Math.sin(lf.t*2)*.8;lf.y+=lf.vy*dt;lf.r+=dt*1.5;return lf.y<H+20;},draw(){r17Draw(R17I.leaf,lf.x,lf.y,30*lf.s,{rot:lf.r,a:.9});}});}}
  else if(w==='petals'){if(Math.random()<.06){const im=R17I.petal;const p={x:rnd(-20,W),y:-20,vx:rnd(10,35),vy:rnd(25,45),r:rnd(0,6),s:rnd(.4,.7),t:0};if(im)R18E({update(dt){p.t+=dt;p.x+=p.vx*dt+Math.sin(p.t*2.5)*.9;p.y+=p.vy*dt;p.r+=dt*2;return p.y<H+20;},draw(){r17Draw(im,p.x,p.y,22*p.s,{rot:p.r,a:.85});}});}}
  else if(w==='fog'){if(Math.random()<.02)part({x:rnd(-60,W),y:rnd(380,520),vx:rnd(8,20),vy:rnd(-2,2),life:rnd(6,9),size:rnd(90,140),grow:30,rgb:'235,240,245',add:false,shape:'fog'});}
  else if(w==='motes'){if(Math.random()<.06)part({x:rnd(0,W),y:rnd(120,480),vx:rnd(-6,6),vy:-rnd(4,12),life:rnd(3,5),size:rnd(1.2,2.2),rgb:'255,235,190'});}
  else if(w==='snow'){if(Math.random()<.35)part({x:rnd(-20,W),y:-6,vx:rnd(-15,15),vy:rnd(40,70),life:rnd(8,11),size:rnd(1.5,3),rgb:'245,250,255',add:false});}
  else if(w==='drip'){if(Math.random()<.06)part({x:rnd(0,W),y:rnd(0,40),vx:0,vy:rnd(200,300),g:600,life:1.6,size:rnd(1.5,2.5),rgb:'170,200,230',add:false,shape:'drop'});}
  else if(w==='ash'){if(Math.random()<.25)part({x:rnd(-20,W),y:H+6,vx:rnd(-10,10),vy:-rnd(30,60),life:rnd(6,9),size:rnd(1.2,2.4),rgb:pick(['255,140,60','255,190,90','120,110,110']),add:Math.random()<.5});}
  else if(w==='sand'){if(Math.random()<.4)part({x:-10,y:rnd(200,520),vx:rnd(140,220),vy:rnd(-10,10),life:rnd(4,6),size:rnd(1,2),rgb:'230,200,140',add:false});}
  else if(w==='stars'){if(Math.random()<.06)part({x:rnd(0,W),y:rnd(0,300),vx:0,vy:rnd(-6,6),life:rnd(2,3),size:rnd(2,4),rgb:pick(['255,240,200','220,210,255']),shape:'star'});}
}catch(e){}};}

// ---- a figurák ne „lebegjenek”: erős, a talajhoz tapadó árnyék – széles, puha vetett árnyék + sötét érintkezési folt a talp alatt
// (a repülő/lebegő lényeknél csak a halvány, távoli árnyék marad)
{const de=drawEntity;drawEntity=function(e){try{if(e&&e.alpha>.01&&!FRONT_DRAW&&(e.alive||e.kind==='enemy')){const x=cx(e),gy=e.y+e.oy,up=(e.jump||0)+(e.alive&&e.lift?e.lift*e.scale:0),fly=up>14,k=Math.max(.4,1-up/240),W2=Math.max(46,e.w*e.scale*.62)*k;
  ctx.save();ctx.globalAlpha=e.alpha*k;
  // vetett árnyék (kicsit hátra-jobbra nyúlik, mintha balról-felülről jönne a fény)
  ctx.save();ctx.translate(x+W2*.12,gy+2);ctx.scale(1,.24);let g=ctx.createRadialGradient(0,0,0,0,0,W2*1.15);g.addColorStop(0,'rgba(20,14,8,.55)');g.addColorStop(.6,'rgba(20,14,8,.28)');g.addColorStop(1,'rgba(20,14,8,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W2*1.15,0,7);ctx.fill();ctx.restore();
  // érintkezési folt a talp alatt
  if(!fly){ctx.save();ctx.translate(x,gy+1);ctx.scale(1,.18);g=ctx.createRadialGradient(0,0,0,0,0,W2*.55);g.addColorStop(0,'rgba(8,5,2,.75)');g.addColorStop(.7,'rgba(8,5,2,.35)');g.addColorStop(1,'rgba(8,5,2,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,W2*.55,0,7);ctx.fill();ctx.restore();}
  ctx.restore();}}catch(err){}return de.apply(this,arguments);};}
// Kaelen pont Grog helyére áll (ha Grog pihen) – a monkSlot orc-eltolását csak Jázmin kapja
{const pp=placeParty;placeParty=function(){const r=pp.apply(this,arguments);try{const act=S.heroes,dr=act.find(h=>h.type==='druid');
  if(dr&&!act.some(h=>h.type==='orc')){const o=HERO_DEF.orc.pos,mk=act.find(h=>h.type==='monk');
    if(Math.abs(dr.x-(o[0]-78))<2&&Math.abs(dr.y-(o[1]-6))<2){dr.x=o[0];dr.y=o[1];}}}catch(e){}return r;};arenaPlace=placeParty;}
