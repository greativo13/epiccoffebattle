// ===== 39. kör: a felhasználó újabb (képernyőképes) megjegyzései =====

// Tealopó majom: csak egyszer lép egy körben (eddig kétszer támadott)
if(EN_DEF.monkey){EN_DEF.monkey.acts=1;EN_DEF.monkey.info='Tárgyat lop, és csészéket dobál. Legyőzve visszaadja, amit elvett.';}

// Fénypajzs és Kristálytükör: csak abban a körben véd és ver vissza, amelyikben használtad (a kör végén eltűnik)
if(SK.lightshield)SK.lightshield.buff=['barrier',1];
{const as=addStatus;addStatus=function(t,type,n){if(type==='crystal'||type==='barrier')n=1;return as.apply(this,[t,type,n].concat([].slice.call(arguments,3)));};}

// Közös és páros támadás csak megvásárlás után – teszt módban sem ingyenes (csak a Próbateremben)

// Bolt: a felszerelés gombja kiírja, mennyi arany hiányzik még
{const sh=shopScreen;shopScreen=function(){const r=sh.apply(this,arguments);try{for(const b of document.querySelectorAll('.ov-box.shop .shop-buy')){const m=/(\d+)\s*arany/.exec(b.textContent);if(!m)continue;const price=+m[1];
    if(S.gold<price&&!b.querySelector('.r21need')){const sp=document.createElement('span');sp.className='r21need';sp.textContent=`még ${price-S.gold} kell`;b.appendChild(sp);}}}catch(e){}return r;};}
{const st=document.createElement('style');st.textContent='.shop-buy .r21need{display:block;font-size:11px;font-weight:800;color:#ffb0b0;margin-top:1px}';document.head.appendChild(st);}

// Öreg Oolong pályája: a lények ne lebegjenek a magasban – a gőzlidércek alacsonyan, a sárkány a talajon, egymás mellett
if(EN_DEF.steamwisp)EN_DEF.steamwisp.lift=8;if(EN_DEF.oolong)EN_DEF.oolong.lift=0;
{for(const z of ZONES)for(const L of z.levels)if(L.id==='5-4')L.slots=[[585,415],[775,470],[625,505]];}

// fekvőből állóba (és vissza) fordításkor a parancspanel és az oldal visszaugrik a tetejére, a gombsor a helyére kerül
{let o=innerWidth>innerHeight;addEventListener('resize',()=>{const n=innerWidth>innerHeight;if(n===o)return;o=n;setTimeout(()=>{try{const c=document.querySelector('.cmd');if(c)c.scrollTop=0;scrollTo(0,0);
  const t=document.querySelector('.tools');if(t&&!n){t.removeAttribute('style');delete t.dataset.r21;delete t.dataset.r21shop;}}catch(e){}},350);});}
// képesség-gombok: a felirat és az elem-címke ne törjön csúnyán több sorba
{const st=document.createElement('style');st.textContent='.cbtn .bl{min-width:0;overflow:hidden;text-overflow:ellipsis}.cbtn .bs{white-space:nowrap}';document.head.appendChild(st);}

// ---------------------------------------------------------------------------------------------
// közös: lávakitörés egy pontban (izzó, repedezett lávatócsa + kilövellő, kihűlve feketedő lávacseppek + lángok)
function r21LavaBurst(x,y,sc=1,dur=2.2){const V={pool:0,cr:null,a:0,on:true,t:0},BL=[],SPL=[];
  for(let q=0;q<Math.round(70*sc);q++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.35,.35)*(q<50*sc?.7:1.5),spd=rnd(520,1050)*Math.sqrt(sc);BL.push({x:x+rnd(-18,18)*sc,y:y-8,vx:Math.cos(a)*spd*.6,vy:Math.sin(a)*spd,r:rnd(9,20)*sc,age:rnd(.2,.42),gy:y+rnd(-6,16)});},120+q*9);
  for(let q=0;q<Math.round(16*sc);q++)part({x:x+rnd(-30,30)*sc,y:y-rnd(0,20),vx:rnd(-70,70),vy:-rnd(180,460)*sc,life:rnd(.5,.9),size:rnd(30,60)*sc,grow:30,rgb:pick(['255,150,50','255,100,30','255,210,110']),shape:'fire'});
  sfx('fire');shake(10*sc);
  R18E({update(dt){V.t+=dt;V.pool=V.t<.35?r21ease.out(V.t/.35):V.t<dur?1:Math.max(0,1-(V.t-dur)/.6);
      for(let q=BL.length-1;q>=0;q--){const b=BL[q];b.age+=dt*.3;b.vy+=1500*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.vy>0&&b.y>=b.gy){SPL.push({x:b.x,y:b.gy,r:b.r*1.6,age:b.age*.6});BL.splice(q,1);}}
      for(let q=SPL.length-1;q>=0;q--){SPL[q].age+=dt*.6;if(SPL[q].age>1.6)SPL.splice(q,1);}
      if(V.pool>.3&&Math.random()<.1)part({x:x+rnd(-50,50)*sc,y:y-rnd(0,8),vx:rnd(-10,10),vy:-rnd(40,90),life:rnd(1,1.5),size:rnd(14,24)*sc,rgb:pick(['50,40,40','70,60,55']),add:false,shape:'smoke'});
      return V.t<dur+.6||BL.length||SPL.length;},
    draw(){if(V.pool>0){const R=110*sc*V.pool;ctx.save();ctx.translate(x,y);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,R*1.6,'255,90,20',.5*V.pool);ctx.globalCompositeOperation='source-over';
        if(!V.cr){V.cr=[];for(let q=0;q<12;q++){const a=q/12*6.283+rnd(-.2,.2),pts=[[0,0]];let r=0,an=a;while(r<1){r+=rnd(.12,.22);an+=rnd(-.35,.35);pts.push([Math.cos(an)*r,Math.sin(an)*r]);}V.cr.push(pts);}}
        const cg=ctx.createRadialGradient(0,0,R*.2,0,0,R);cg.addColorStop(0,'rgba(60,22,12,1)');cg.addColorStop(.75,'rgba(32,16,12,1)');cg.addColorStop(1,'rgba(30,20,16,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
        V.a+=.05;const fl=.75+.25*Math.sin(V.a*3);ctx.lineCap='round';
        for(const [lw,col] of [[R*.09,`rgba(255,90,20,${.55*fl})`],[R*.045,`rgba(255,180,60,${.9*fl})`],[R*.016,`rgba(255,245,190,${fl})`]]){ctx.strokeStyle=col;ctx.lineWidth=lw;for(const pts of V.cr){ctx.beginPath();pts.forEach((pp,q)=>{q?ctx.lineTo(pp[0]*R*.95,pp[1]*R*.95):ctx.moveTo(pp[0]*R*.95,pp[1]*R*.95);});ctx.stroke();}}
        const og=ctx.createRadialGradient(0,0,0,0,0,R*.38);og.addColorStop(0,'rgba(255,250,200,1)');og.addColorStop(.5,'rgba(255,170,40,1)');og.addColorStop(1,'rgba(220,60,10,0)');ctx.fillStyle=og;ctx.beginPath();ctx.arc(0,0,R*.38,0,6.29);ctx.fill();ctx.restore();}
      for(const sp of SPL){const [r,g2,b]=lavaCol(sp.age);ctx.fillStyle=`rgba(${r|0},${g2|0},${b|0},${Math.min(1,2.2-sp.age*1.3)})`;ctx.beginPath();ctx.ellipse(sp.x,sp.y,sp.r,sp.r*.32,0,0,6.29);ctx.fill();}
      for(const b of BL){const [r,g2,bb]=lavaCol(b.age);ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x,b.y,b.r*2.4,'255,110,30',.35*Math.max(0,1-b.age));ctx.restore();ctx.fillStyle=`rgb(${r|0},${g2|0},${bb|0})`;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,6.29);ctx.fill();}}});}

// ---------------------------------------------------------------------------------------------
// Földrengés: Grog a földbe csap, a talaj hullámzik – a festett kőhullám (eddig a Hegyomlásban volt) végiggördül az ellenségeken,
// mögötte izzó lávarepedések nyílnak, a végén minden ellenség alatt láva tör fel. Nincs tüske, és semmi nem jelenik meg Grog alatt.
A.quake=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u,'attack');try{await dimTo(.5,'30,18,6',260);
  await bodyWind(u,260,.16);await tween(320,k=>{u.jump=Math.sin(k*Math.PI*.5)*120;});await tween(140,k=>{u.jump=120*(1-k*k);});u.jump=0;await bodyStrike(u,120,-.26);
  flash('255,230,180',.4,.2);hitStop(110);sfx('rock');sfx('boom');sfx('quake');rumble(2.6,14);
  const gy=Math.max(...al.map(t=>t.y+t.oy))+6,sw=R17I.stonewave,xb=Math.max(...al.map(cx))+300,Wd=Math.max(520,(xb-cx(u))*.62),xa=cx(u)+u.w*u.scale*.6+Wd*.5,L={k:0,a:1},CR={k:0,a:1};r21Dust(xa,u.y+u.oy,8,200,[28,46]);
  // földrepedés a hullám nyomában (láva nélkül – ia ma05: „földrengésnél nem kell láva”)
  const pts=[];for(let i=0;i<=30;i++)pts.push([i/30,Math.sin(i*1.7)*6+rnd(-4,4)]);
  // (rajzolt repedésvonal nincs – csak a festett kőhullám és por; ia ma05 + „mindig festett kép”)
  if(sw)R18E({update(){if(L.k>0&&L.k<1&&Math.random()<.8)r21Dust(xa+(xb-xa)*L.k,gy,1,200,[30,50]);return L.a>0;},draw(){if(L.k<=0)return;const x=xa+(xb-xa)*L.k,h=Wd*sw.height/sw.width;ctx.save();ctx.globalAlpha=L.a;ctx.translate(x,gy+12);ctx.drawImage(sw,-Wd/2,-h,Wd,h);ctx.restore();}});
  const done=new Set();
  await tween(1100,k=>{L.k=k;CR.k=k;L.a=k>.8?1-(k-.8)/.2:1;if(Math.random()<.35)shake(9);const x=xa+(xb-xa)*k;
    for(const t of al)if(!done.has(t)&&x>=cx(t)-20){done.add(t);t.hurt=.6;toss(t,120,620);hitStop(50);hit(u,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);
  for(const t of al){r21Dust(cx(t),t.y+t.oy+6,10,260,[30,56]);for(let n=0;n<16;n++)part({x:cx(t)+rnd(-40,40),y:t.y+t.oy+4,vx:rnd(-280,280),vy:-rnd(200,480),g:950,life:rnd(.6,1),size:rnd(6,12),rgb:'120,95,65',add:false,shape:'rock'});}await wait(1100);
  tween(600,k=>{CR.a=1-k;});await dimTo(0,null,350);await bodySettle(u);}finally{rel();u.jump=0;}};

// Titáncsapás: a becsapódáskor nem hosszú sorban, hanem minden ellenség körül KÖRBEN törnek fel a festett kőtüskék (láva nélkül – ia ma05)
r13Quake=function(u,al,big){const sp=R17I.rockspike;rumble(big?2.6:1.6,big?18:11);
  for(const t of al){const x=cx(t),gy=t.y+t.oy+4,R=Math.max(70,t.w*t.scale*.75),N=big?10:7,S2=[];
    for(let i=0;i<N;i++){const a=i/N*6.283+rnd(-.15,.15);S2.push({x:x+Math.cos(a)*R,y:gy+Math.sin(a)*R*.3,H:rnd(110,170)*(big?1:.7)*(Math.sin(a)>0?.75:1),rot:Math.cos(a)*.35,fl:Math.random()<.5,k:0,front:Math.sin(a)>0,d:i*40});}
    S2.sort((a,b)=>a.y-b.y);const st={t:0};
    if(sp)R18E({update(dt){st.t+=dt*1000;for(const s of S2){const tt=(st.t-s.d)/1000;s.k=tt<0?0:tt<.14?r21ease.back(tt/.14):tt<1.5?1:Math.max(0,1-(tt-1.5)/.4);}return st.t<2200;},
      draw(){for(const s of S2){if(s.k<=0)continue;const w=s.H*sp.width/sp.height;ctx.save();ctx.beginPath();ctx.rect(0,0,W,s.y+4);ctx.clip();ctx.translate(s.x,s.y+4+s.H*(1-s.k)*.9);ctx.rotate(s.rot);if(s.fl)ctx.scale(-1,1);if(!s.front)ctx.filter='brightness(.8)';ctx.drawImage(sp,-w/2,-s.H,w,s.H);ctx.restore();}}});
    r21Dust(x,gy,8,240,[30,52]);for(let n=0;n<14;n++)part({x:x+rnd(-R*.6,R*.6),y:gy,vx:rnd(-260,260),vy:-rnd(200,460),g:950,life:rnd(.6,1),size:rnd(6,12),rgb:'120,95,65',add:false,shape:'rock'});}};

// Magmakitörés (Grog lávás képessége) már a 3-3 Olvadt Folyó után megvehető (eddig csak a 7-1 után – ezért „tűnt el”)
{const L=SHOP_SKILLS.orc,e=L&&L.find(x=>x[0]==='magma');if(e){e[1]='3-3';e[2]=2200;}}

// ---------------------------------------------------------------------------------------------
// Dührepedés (főellenség fél életnél) – ÉLETHŰ és a figurával együtt mozog: a repedéseket közvetlenül a figura képébe
// festjük (a kép alakjára vágva, mélység-árnyékkal és izzó magmával), és rajzoláskor a figura saját képe helyett ezt
// használjuk – így minden mozdulatot, hajlást, ugrást, forgást követ. Két izzásfokozat váltakozik (lüktetés).
r21RageDraw=function(){};
const R21_CRK=new Map();
function r21CrackSprite(im,seed){const key=im;let C=R21_CRK.get(key);if(C)return C;const W=im.width,H=im.height;
  const base=document.createElement('canvas');base.width=W;base.height=H;const g=base.getContext('2d');g.drawImage(im,0,0);let D;try{D=g.getImageData(0,0,W,H).data;}catch(e){return null;}
  const opaque=(x,y)=>{x|=0;y|=0;return x>=0&&y>=0&&x<W&&y<H&&D[(y*W+x)*4+3]>200;};
  let sd=seed;const R=()=>{sd=(sd*9301+49297)%233280;return sd/233280;};const S=Math.min(W,H),paths=[];
  const grow=(x,y,a,len,w,depth)=>{const p=[[x,y,w]];const n=8+Math.floor(R()*8);for(let k=0;k<n;k++){a+=(R()-.5)*.9;const st=len*(.5+R()*.9);const nx=x+Math.cos(a)*st,ny=y+Math.sin(a)*st;if(!opaque(nx,ny))break;x=nx;y=ny;w*=.88;p.push([x,y,w]);
      if(depth<1&&R()<.22)grow(x,y,a+(R()<.5?-1:1)*(.5+R()*.7),len*.75,w*.65,depth+1);}if(p.length>2)paths.push(p);};
  let tries=0;for(let c=0;c<4&&tries<400;tries++){const x=W*(.25+R()*.5),y=H*(.2+R()*.6);if(!opaque(x,y))continue;c++;const a=R()*6.283,l=S*.045,w=S*.03;grow(x,y,a,l,w,0);grow(x,y,a+Math.PI+(R()-.5),l,w*.9,0);}
  const mk=glowK=>{const c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');x.drawImage(im,0,0);x.globalCompositeOperation='source-atop';x.lineCap='round';x.lineJoin='round';
    const seg=(f)=>{for(const p of paths)for(let i=1;i<p.length;i++)f(p[i-1],p[i]);};
    // sötét árnyékos szél (mélység)
    seg((a,b)=>{x.strokeStyle='rgba(20,6,2,.85)';x.lineWidth=a[2]*2.4+2;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke();});
    // világos peremfény a repedés egyik oldalán (letört szél)
    seg((a,b)=>{x.strokeStyle='rgba(255,230,200,.35)';x.lineWidth=Math.max(1,a[2]*.6);x.beginPath();x.moveTo(a[0]-a[2]*.9,a[1]-a[2]*.9);x.lineTo(b[0]-b[2]*.9,b[1]-b[2]*.9);x.stroke();});
    // izzó magma a mélyben
    x.globalCompositeOperation='lighter';x.shadowColor='rgba(255,90,20,1)';x.shadowBlur=S*.03*glowK;
    seg((a,b)=>{x.strokeStyle=`rgba(255,${110+60*glowK|0},30,${.7+.3*glowK})`;x.lineWidth=Math.max(1.5,a[2]*1.25);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke();});
    x.shadowBlur=0;seg((a,b)=>{if(a[2]<S*.01)return;x.strokeStyle=`rgba(255,245,200,${.45+.5*glowK})`;x.lineWidth=Math.max(.8,a[2]*.35);x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke();});
    x.globalCompositeOperation='source-atop';
    // a repedések körül kissé sötétebb, megégett felület
    seg((a,b)=>{x.strokeStyle='rgba(40,10,0,.12)';x.lineWidth=a[2]*7;x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.stroke();});
    return c;};
  C={a:mk(.45),b:mk(1),paths};R21_CRK.set(key,C);return C;}
{const de=drawEntity;drawEntity=function(e){if(!e||!e._p2||!e.alive||typeof ENEMY_SPR!=='object')return de.apply(this,arguments);
  const t=(typeof SPR_ALIAS==='object'&&SPR_ALIAS[e.type])||e.type,keys=[t,t+'-attack',t+'-cast',t+'-hurt'].filter(k=>ENEMY_SPR[k]),old={},pul=Math.sin(performance.now()/1000*6)>0;
  for(const k of keys){const C=r21CrackSprite(ENEMY_SPR[k],(e.type||'x').length*131+k.length*17);if(C){old[k]=ENEMY_SPR[k];ENEMY_SPR[k]=pul?C.b:C.a;}}
  try{return de.apply(this,arguments);}finally{for(const k in old)ENEMY_SPR[k]=old[k];}};}

// Espresszó (ellenfélként) tűzfújáskor kinyitja a száját: a saját állkapcsa leesik (az idézésnél már meglévő R18_JAW-megoldás)
{let JC=null;const prep=()=>{if(JC||!ENEMY_SPR.espresso||typeof r18EspImg!=='function')return JC;JC=[];for(let q=0;q<=10;q++)JC[q]=r18EspImg(q/10);return JC;};
 const ue=useEnemySkill;useEnemySkill=async function(e,sk,target){if(!(e&&e.type==='espresso'&&sk&&(sk.elem==='fire'||sk.elem==='lava')&&prep()))return ue.apply(this,arguments);
   e._jaw=0;tween(260,k=>{e._jaw=r21ease.out(k);});try{return await ue.apply(this,arguments);}finally{await tween(260,k=>{e._jaw=1-k;});e._jaw=0;}};
 const de=drawEntity;drawEntity=function(e){if(!(e&&e.type==='espresso'&&e._jaw>0&&JC))return de.apply(this,arguments);const im=JC[Math.round(Math.min(1,e._jaw)*10)];if(!im)return de.apply(this,arguments);
   const o1=ENEMY_SPR.espresso,o2=ENEMY_SPR['espresso-attack'];ENEMY_SPR.espresso=im;ENEMY_SPR['espresso-attack']=im;try{return de.apply(this,arguments);}finally{ENEMY_SPR.espresso=o1;ENEMY_SPR['espresso-attack']=o2;}};}

// ---------------------------------------------------------------------------------------------
// Hangok (a felhasználó: „gagyik”): a gépi (szintetizált) hangok helyett valódi CC0 felvételek – Kenney „Impact Sounds”,
// „RPG Audio”, OpenGameArt: „Swishes Sound Pack”, „Air Whoosh”, „Rain & Long Thunder”, „Earthquake”, „80 CC0 Creature SFX”,
// „CC0 Deep Monster Roar”, „Cure Magic”, „Earth Element Magic Spell” (mind CC0). Részletek: hang/FORRASOK.md
Object.assign(SAMPLE_FILES,{whoosh:['hangok/whoosh1.mp3','hangok/whoosh2.mp3','hangok/whoosh3.mp3','hangok/whoosh4.mp3','hangok/whoosh5.mp3'],wind:['hangok/wind1.mp3','hangok/wind2.mp3'],
  roar:['hangok/roar1.mp3','hangok/roar2.mp3','hangok/roar3.mp3'],bite:['hangok/bite1.mp3','hangok/bite2.mp3'],heal:['hangok/heal1.mp3','hangok/heal2.mp3'],wail:['hangok/wail1.mp3','hangok/wail2.mp3'],
  buzz:['hangok/buzz1.mp3','hangok/buzz2.mp3'],punch:['hangok/punch1.mp3','hangok/punch2.mp3','hangok/punch3.mp3'],metal:['hangok/metal1.mp3','hangok/metal2.mp3','hangok/metal3.mp3'],
  knife:['hangok/knife1.mp3','hangok/knife2.mp3','hangok/knife3.mp3'],mine:['hangok/mine1.mp3','hangok/mine2.mp3','hangok/mine3.mp3'],glassb:['hangok/glassb1.mp3','hangok/glassb2.mp3'],
  thunder:['hangok/thunder1.mp3'],quake:['hangok/quake1.mp3'],earthm:['hangok/earthm1.mp3']});
{const old={...SFX},P=(k,v,r)=>playSample(k,v,r),or=(name,fn)=>{SFX[name]=()=>{try{if(!fn())old[name]&&old[name]();}catch(e){}};};
 let lastW=0,lastWind=0;
 or('whoosh',()=>{const n=performance.now();if(n-lastW<70)return true;lastW=n;return P('whoosh',.75,.9+Math.random()*.25);});
 or('wind',()=>{const n=performance.now();if(n-lastWind<500)return true;lastWind=n;return P('wind',.6);});
 or('roar',()=>P('roar',.9));or('growl',()=>P('growl',.9)||P('roar',.6,1.2));or('bite',()=>P('bite',1)&&(P('punch',.5,1.3),true));
 or('heal',()=>P('heal',.6));or('wail',()=>P('wail',.7));or('screech',()=>P('wail',.6,1.5));or('buzz',()=>P('buzz',.55));
 or('hit',()=>Math.random()<.5?P('punch',.9):P('hit',1));or('slash',()=>Math.random()<.5?P('knife',.9):P('slash',1));
 or('rock',()=>Math.random()<.5?P('mine',.9):P('rock',1));or('crunch',()=>P('mine',.9,.8));or('glass',()=>Math.random()<.5?P('glassb',.9):P('glass',.9));
 or('quake',()=>P('quake',1));or('thunder',()=>P('thunder',1)&&(P('boom',.4,1.3),true));or('block',()=>P('metal',.9));or('guard',()=>P('metal',.7,1.1));
}

// Zenék (a felhasználó: „gagyik”): zenekari CC0 darabok – harc: „Battle Theme A” (cynicmusic), főellenség: „Determined Pursuit”
// (Emma_MA), térkép/cím: „Fantasy Orchestral Theme” (Joth) – opengameart.org
if(typeof TRACK_FILE==='object')Object.assign(TRACK_FILE,{battle:'csata2',boss:'foellenseg2',title:'terkep2'});
