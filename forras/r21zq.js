// ===== 59. kör: látványelemek, 2. rész (teljes tesztlista, 5. csomag) =====

// ---- 1) Kamilla („a szél támadásánál a levelek helyett kamillavirágok legyenek”): Kamilla minden támadásánál és az
//    idézésénél a szálló levelek helyett festett kamillavirágok (fx7-chamomile, Canva) szállnak
{const p0=part;part=function(o){if(S._r21kam&&o&&o.shape==='leaf'&&R17I.chamomile){r21PD(R17I.chamomile,o.x,o.y,{vx:o.vx||0,vy:o.vy||0,g:o.g||60,life:o.life||.9,size:Math.max(18,(o.size||6)*4.2),vr:rnd(-6,6),drag:o.drag||0});return;}return p0.apply(this,arguments);};}
{const km=SUMMONS.find(x=>x.id==='kamilla');if(km){const r0=km.run;km.run=async function(){S._r21kam=true;try{return await r0.apply(this,arguments);}finally{S._r21kam=false;}};}}
{const ea=enemyAct;enemyAct=async function(e){const k=e&&e.type==='kamilla';if(k)S._r21kam=true;try{return await ea.apply(this,arguments);}finally{if(k)S._r21kam=false;}};}

// ---- 2) Kamilla furulyája („a stílusa eltér minden mástól”): a kódból rajzolt fuvola és hangjegyek helyett festett
//    bambuszfuvola (fx7-dizi) és festett arany hangjegyek (fx7-note)
{const qd=qDizi;qDizi=function(x,y,L,ang,a=1){const D=R17I.dizi;if(!D)return qd.apply(this,arguments);const s=L*1.05;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(ang+Math.PI/4);ctx.drawImage(D,-s/2,-s/2,s,s);ctx.restore();};}
{const qn=qNote;qNote=function(x,y,s=1,col,dbl){const N=R17I.note;if(!N)return qn.apply(this,arguments);const z=34*s;ctx.drawImage(N,x-z/2,y-z/2,z,z);if(dbl)ctx.drawImage(N,x+z*.35-z*.4,y-z*.25-z*.4,z*.8,z*.8);};}

// ---- 3) Harapós rózsa („az inda gagyi; tekeredjen körbe, mint a kígyó, fej nélkül, és ha már harapós rózsa, odanyúlhat
//    a feje és haraphat, mint a Lekvárdzsinn keze”; „a Tüskés inda és Tüskezápor név nem jó”; „a tüske háromszögesebb”)
//    – Indaszorítás: a rózsa szárából tüskés inda kígyózik a földön a hősig, és fej nélkül, kígyóként rátekeredik; utána a
//      rózsa SAJÁT feje (a festett kép felső része, a nyitott szájú változat) a szárán megnyúlva odanyúl, és beleharap.
//    – Tüskeköpés: a rózsa a szájából háromszögletű (zömökebb) festett tüskéket köp minden hősre.
if(ESK.vine){Object.assign(ESK.vine,{name:'Indaszorítás',anim:'roseCoil',status:['stun',.35,1],desc:'Tüskés inda tekeredik a hősre, aztán a rózsa feje odanyúlik és beleharap. 35% eséllyel egy körre lefogja.'});}
if(ESK.thornrain){Object.assign(ESK.thornrain,{name:'Tüskeköpés',desc:'A rózsa a szájából hegyes tüskéket köp minden hősre.'});}
function r21RoseRect(u,im){const sc=u.scale||1,Hh=u.h*sc,Wd=im.width*(Hh/im.height);return {x:cx(u)-Wd/2,y:u.y+u.oy-(u.h+(u.alive?u.lift||0:0))*sc,w:Wd,h:Hh};}
A.roseCoil=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const nm=(SPR_ALIAS&&SPR_ALIAS[u.type])||u.type,ID=ENEMY_SPR[nm],AT=ENEMY_SPR[nm+'-attack']||ID,VN=r21Filt(R17I.snakebody,'hue-rotate(-12deg) saturate(.75) brightness(.72)');
  if(!ID||!VN||typeof r21CoilPath!=='function')return A.thornVine?A.thornVine(u,ts,sk):null;
  const gx=cx(t),top=topY(t)+t.h*t.scale*.25,bot=t.y+t.oy-6,R=t.w*t.scale*.55+18,thick=Math.max(26,t.h*t.scale*.14),r0=r21RoseRect(u,ID),from={x:r0.x+r0.w*.55,y:r0.y+r0.h*.97};
  const C={k:0,sq:0,a:1,on:true};R18E({update(){return C.on;},draw(){if(C.a<=0)return;const P=r21CoilPath(gx,top,bot,R,2.2,C.k,from,C.sq,0);r21DrawCoil(VN,P,thick,C.a);}});
  sfx('rock');rumble&&rumble(.5,4);for(let i=0;i<10;i++)part({x:from.x+rnd(-30,30),y:from.y,vx:rnd(-80,80),vy:-rnd(60,180),g:500,life:.7,size:rnd(3,6),rgb:'110,85,60',add:false,shape:'rock'});
  C.a=0;C.on=false;
  // a fej odanyúlik: az alap (szár, levelek) a helyén, a fej a nyitott szájú képről, a nyak a megnyúló inda
  const a0=u.alpha==null?1:u.alpha,H={k:0,on:true,bite:0};const neck0={u:.62,v:.53},headB={u:.62,v:.6};
  R18E({update(){return H.on;},draw(){const rb=r21RoseRect(u,ID),ra=r21RoseRect(u,AT);
    ctx.save();ctx.beginPath();ctx.rect(rb.x-10,rb.y+rb.h*.53,rb.w+20,rb.h*.5);ctx.clip();ctx.drawImage(ID,rb.x,rb.y,rb.w,rb.h);ctx.restore();
    const nx=rb.x+rb.w*neck0.u,ny=rb.y+rb.h*neck0.v,tx2=cx(t)+t.w*t.scale*.25,ty2=topY(t)+t.h*t.scale*.35,hx=nx+(tx2-nx)*H.k,hy=ny+(ty2-ny)*H.k-Math.sin(H.k*Math.PI)*60;
    const P=[];for(let i=0;i<=24;i++){const q=i/24;P.push({x:nx+(hx-nx)*q,y:ny+(hy-ny)*q-Math.sin(q*Math.PI)*40*H.k+Math.sin(q*9+T*8)*4*H.k});}r21DrawCoil(VN,P,Math.max(14,thick*.6),1);
    const ox=hx-(ra.x+ra.w*headB.u),oy=hy-(ra.y+ra.h*headB.v),sq=1-.12*H.bite;ctx.save();ctx.translate(hx,hy);ctx.scale(1,sq);ctx.translate(-hx,-hy);ctx.beginPath();ctx.rect(ra.x+ox-10,ra.y+oy-10,ra.w+20,ra.h*.62+10);ctx.clip();ctx.drawImage(AT,ra.x+ox,ra.y+oy,ra.w,ra.h);ctx.restore();}});
  u.alpha=0;sfx('whoosh');await tween(260,k=>{H.k=easeIO(k);});sfx('hit');sfx('crunch');H.bite=1;shake(14);hitStop(90);flash('255,200,200',.25,.08);
  sparks(cx(t),topY(t)+t.h*t.scale*.35,['255,120,120','255,255,255'],18,320);t.hurt=.6;hit(u,t,sk);await tween(160,k=>{H.bite=1-k;});await wait(120);
  await tween(300,k=>{H.k=1-easeIO(k);});H.on=false;u.alpha=a0;u.pose='idle';};
{const tv=A.thornVolley;A.thornVolley=async function(u,ts,sk){if(!u||u.type!=='rose')return tv.apply(this,arguments);const TH=R17I.rosethorn;const r0=r17Draw;
  // zömökebb, háromszögletű tüske (rövidebb, vastagabb tővel), a rózsa szájából
  r17Draw=function(im,x,y,w,o={}){if(im===TH)return r0.call(this,im,x,y,w*.72,Object.assign({},o,{sy:(o.sy||1)*2.1}));return r0.apply(this,arguments);};
  const sp=sprPt;sprPt=function(uu,fu,fv){return sp.apply(this,arguments);};
  const cxu=cx(u);try{return await tv.apply(this,arguments);}finally{r17Draw=r0;sprPt=sp;}};}

// ---- 4) Élő Tölgybárd („a felnyúló növények egyetlen képként fehérek”): a gyökér-kép fölé rajzolt erős zöld fény (lighter)
//    fehérré égette; most fény nélkül, sötétebb, és minden ellenség alatt három különböző (tükrözött, eltérő méretű) gyökér tör fel
{const tb=R16P['Élő Tölgybárd'];if(tb)R16P['Élő Tölgybárd']=async function(){const RT=R17I.darkroots;let C=null;
  if(RT&&RT.width){C=document.createElement('canvas');C.width=Math.round(RT.width*1.5);C.height=RT.height;const g=C.getContext('2d');try{g.filter='brightness(.82) saturate(1.25)';}catch(e){}
    g.drawImage(RT,0,RT.height*.12,RT.width*.75,RT.height*.88);g.save();g.translate(C.width,0);g.scale(-1,1);g.drawImage(RT,0,RT.height*.06,RT.width*.8,RT.height*.94);g.restore();g.drawImage(RT,C.width*.18,0,RT.width,RT.height);R17I.darkroots=C;}
  let g0=null;try{g0=glow;glow=function(x,y,r,rgb){if(rgb==='120,230,60'||rgb==='110,220,60')return;return g0.apply(this,arguments);};}catch(e){g0=null;}
  try{return await tb.apply(this,arguments);}finally{if(RT)R17I.darkroots=RT;if(g0)try{glow=g0;}catch(e){}}};}

// ---- 5) Ősi Tölgy ökle („az alján a gyökerek ne jöjjenek ki ennyire”): a festett ököl alsó, gyökeres része levágva
(function(){let n=0;const iv=setInterval(()=>{n++;const im=R17I.oakfist;if(im&&im.width&&!im._r21crop){const c=document.createElement('canvas');c.width=im.width;c.height=Math.round(im.height*.8);const g=c.getContext('2d');g.drawImage(im,0,0);
    const gr=g.createLinearGradient(0,0,0,c.height);gr.addColorStop(.85,'rgba(0,0,0,1)');gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.globalCompositeOperation='destination-in';g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);c.naturalWidth=c.width;c.naturalHeight=c.height;c._r21crop=true;R17I.oakfist=c;clearInterval(iv);}if(n>80)clearInterval(iv);},300);})();

// ---- 6) Bambuszfüggöny („ha több ellenfél van, ne külön-külön legyen, hanem egy nagy; amik beállnak a földbe, menjenek be a
//    föld alá, és abból hirtelen robbanjanak ki a nagy tüskék”): Jázmin sortűzben kilövi a festett bambusznyilakat, azok
//    az ellenségek előtt a földbe fúródnak és eltűnnek a föld alatt; a föld megremeg, és EGY nagy, összefüggő bambuszfüggöny
//    robban ki az összes ellenség alól (festett bambuszkarók), majd elsüllyed
A.bambooCurtain=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const BS=R17I.bamboospear,ST=R17I.bamboostake||R17I.bamboopole,CLD=R17I.clods||R17I.pebble,LF=R17I.leaf;
  u.pose='attack';await chargeBow(u,360,'150,230,110');
  const xs=al.map(cx),gy=Math.max(...al.map(t=>t.y+t.oy))+8,xa=Math.min(...xs)-Math.max(...al.map(t=>t.w*t.scale))*.7,xb=Math.max(...xs)+Math.max(...al.map(t=>t.w*t.scale))*.7;
  // 1) sortűz: a nyilak az ellenségek elé fúródnak, és lesüllyednek a föld alá
  const AR=[],n=9;for(let i=0;i<n;i++)AR.push({x:xa+(xb-xa)*i/(n-1),sink:0,a:1,k:0});
  R18E({update(){return AR.some(a=>a.a>0);},draw(){if(!BS)return;for(const a of AR){if(a.k<1||a.a<=0)continue;const L=120,h=L*BS.height/BS.width;ctx.save();ctx.beginPath();ctx.rect(a.x-200,-500,400,gy+500);ctx.clip();ctx.globalAlpha=a.a;ctx.translate(a.x,gy-L*.35+a.sink);ctx.rotate(-Math.PI/2+.5);ctx.drawImage(BS,-L/2,-h/2,L,h);ctx.restore();}}});
  const bp=bowPos(u);for(const a of AR){(async()=>{if(BS)await bigArrow(bp,{x:a.x,y:gy-10},{arc:70,size:120,trail:['150,230,110','220,255,200']});a.k=1;sfx('rock');for(let i=0;i<5;i++)part({x:a.x,y:gy,vx:rnd(-120,120),vy:-rnd(60,200),g:800,life:.6,size:rnd(4,8),rgb:'120,95,65',add:false,shape:'rock'});})();await wait(70);}
  await wait(520);sfx('earthm');await tween(380,k=>{for(const a of AR)a.sink=k*90;});for(const a of AR)a.a=0;
  // 2) a föld megremeg végig a sor alatt
  rumble&&rumble(1.2,10);sfx('quake');for(let i=0;i<16;i++)part({x:rnd(xa,xb),y:gy,vx:rnd(-60,60),vy:-rnd(20,90),life:.8,size:rnd(18,32),grow:24,rgb:'150,125,90',add:false,shape:'smoke'});await wait(320);
  // 3) egyetlen nagy bambuszfüggöny robban ki
  const P=[],m=Math.max(14,Math.round((xb-xa)/26));for(let i=0;i<m;i++)P.push({x:xa+(xb-xa)*(i+.5)/m+rnd(-6,6),H:rnd(300,430),rot:rnd(-.12,.12),k:0,d:Math.abs(i-m/2)*14});
  const W={a:1,t:0};R18E({update(dt){W.t+=dt*1000;for(const p of P){const tt=W.t-p.d;p.k=tt<0?0:Math.min(1,tt/140);}return W.a>0;},draw(){const I=ST;if(!I)return;ctx.save();ctx.beginPath();ctx.rect(-500,-500,3000,gy+502);ctx.clip();ctx.globalAlpha=W.a;
    for(const p of P){if(p.k<=0)continue;const h=p.H*eOutBack(p.k),w=Math.max(18,h*I.width/I.height);ctx.save();ctx.translate(p.x,gy+4);ctx.rotate(p.rot);ctx.drawImage(I,-w/2,-h,w,h);ctx.restore();}ctx.restore();}});
  sfx('boom');sfx('rock');shake(28);hitStop(120);flash('210,255,190',.3,.12);
  if(CLD)for(let i=0;i<26;i++)r21PD(CLD,rnd(xa,xb),gy,{vx:rnd(-260,260),vy:-rnd(240,560),g:1100,size:rnd(20,40),life:rnd(.7,1.1)});
  if(LF)for(let i=0;i<20;i++)r21PD(LF,rnd(xa,xb),gy-rnd(60,240),{vx:rnd(-160,160),vy:-rnd(40,200),g:200,size:rnd(18,30),life:1.2,drag:1});
  for(const t of al){t.hurt=.7;toss(t,90,520);hit(u,t,sk);await wait(60);}
  await wait(1100);await tween(420,k=>{for(const p of P)p.k=1-k;W.a=1-k*.3;});W.a=0;u.pose='idle';};

// ---- 7) Fejsze-hajítás („dobás előtt gyűljenek össze a kövek, vegyenek fel csillag alakot, kezdjen forogni lávásan, és úgy
//    csapjon le”): a dobás előtt festett kövek emelkednek fel a földről, Grog keze köré gyűlnek, ötágú csillagba rendeződnek és
//    forogni kezdenek – aztán jön a lávacsillag-dobás
{const at=A.axeThrow;A.axeThrow=async function(u,ts,sk){const PB=R17I.pebble||R17I.clods;if(!PB)return at.apply(this,arguments);
  const h=()=>handPos(u),gy=u.y+u.oy,S5=[];for(let i=0;i<10;i++)S5.push({x:cx(u)+rnd(-220,220),y:gy+rnd(-4,8),s:rnd(26,40),r:rnd(0,6)});
  const G={k:0,spin:0,a:1,glow:0};R18E({update(dt){G.spin+=dt*(2+10*G.glow);return G.a>0;},draw(){const c=h();for(let i=0;i<S5.length;i++){const s=S5[i],ang=G.spin+i*Math.PI/5,rr=(i%2?38:78),tx=c.x+Math.cos(ang)*rr,ty=c.y-30+Math.sin(ang)*rr;
      const x=s.x+(tx-s.x)*G.k,y=s.y+(ty-s.y)*G.k-Math.sin(G.k*Math.PI)*80;const I=G.glow>0?r21Filt(PB,'sepia(1) saturate(5) hue-rotate(-15deg) brightness('+(1+G.glow*.6).toFixed(2)+')'):PB;ctx.save();ctx.globalAlpha=G.a;ctx.translate(x,y);ctx.rotate(s.r+G.spin);ctx.drawImage(I,-s.s/2,-s.s/2,s.s,s.s*PB.height/PB.width);ctx.restore();}
    if(G.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(c.x,c.y-30,120,'255,120,30',.4*G.glow*G.a);ctx.restore();}}});
  u.pose='cast';sfx('rock');rumble&&rumble(.6,6);await tween(650,k=>{G.k=easeIO(k);});sfx('fire');await tween(450,k=>{G.glow=k;});
  for(let i=0;i<12;i++)part({x:h().x+rnd(-60,60),y:h().y-30+rnd(-60,60),vx:rnd(-80,80),vy:-rnd(40,140),life:.6,size:rnd(3,6),rgb:pick(['255,160,40','255,90,20'])});
  tween(260,k=>{G.a=1-k;}).then(()=>{G.a=0;});return at.apply(this,arguments);};}

// ---- 8) Sárkánynyíl (páros; „nincs semmi nyíl jellege”): Jázmin előbb kifeszíti az íjat, Zordon tűzzel tölti meg, és egy
//    óriás, lángoló festett nyíl repül az ellenségekre – a becsapódásból tör elő a tűzsárkány
{const sn=R16P['Sárkánynyíl'];if(sn)R16P['Sárkánynyíl']=async function(A1,B1,al,sk,p){try{const mk=A1.type==='monk'?A1:B1,wz=mk===A1?B1:A1,fs=(al||[]).filter(t=>t&&t.alive);
    if(fs.length&&typeof bigArrow==='function'){await chargeBow(mk,420,'255,150,60');const hp=handPos(wz);for(let i=0;i<24;i++)part({x:hp.x,y:hp.y,vx:(bowPos(mk).x-hp.x)*rnd(1.5,2.2),vy:(bowPos(mk).y-hp.y)*rnd(1.5,2.2),life:.45,size:rnd(4,8),rgb:pick(['255,160,40','255,90,20'])});
      sfx('fire');const mx=fs.reduce((s,t)=>s+cx(t),0)/fs.length,my=fs.reduce((s,t)=>s+midY(t),0)/fs.length;const FD=R17I.firedragon;
      const tr={on:true};const iv=setInterval(()=>{if(!tr.on)return;},50);
      await bigArrow(bowPos(mk),{x:mx,y:my},{arc:60,size:260,ms:520,trail:['255,150,60','255,230,150']});tr.on=false;clearInterval(iv);
      sfx('boom');shake(16);flash('255,200,120',.4,.12);if(FD){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(FD,mx,my,420*(.4+.8*B.k),{a:1-B.k});ctx.restore();}});tween(500,k=>{B.k=k;});}}
  }catch(e){console.error(e);}return sn.apply(this,arguments);};}

// ---- 9) Grog – Kőhullám („tűnjenek el a hősök, menjen végig a hullám, és utána maradjon kis törmelék”): Grog a földbe csap,
//    a festett kőhullám végiggördül az ellenségeken, és amíg áthalad rajtuk, teljesen eltakarja őket (eltűnnek benne); a hullám
//    után kis festett kőtörmelék marad a földön, ami lassan elhalványul. Nincs láva (a föld nem láva).
A.r21StoneWave=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const SW=R17I.stonewave,CL=R17I.clods||R17I.pebble,PB=R17I.pebble;u.pose='attack';
  await dimTo(.4,'30,20,8',240);await bodyWind(u,260,.16);await tween(300,k=>{u.jump=Math.sin(k*Math.PI*.5)*110;});await tween(130,k=>{u.jump=110*(1-k*k);});u.jump=0;await bodyStrike(u,120,-.26);
  sfx('rock');sfx('boom');sfx('quake');shake(24);hitStop(100);rumble&&rumble(2,12);
  const gy=Math.max(...al.map(t=>t.y+t.oy))+10,x0=cx(u)+u.w*u.scale*.5,x1=Math.max(...al.map(cx))+340,Wv={x:x0,on:true,h:0},hid=new Map(),done=new Set();
  R18E({front:true,update(){return Wv.on;},draw(){if(!SW||Wv.h<=0)return;const h=Wv.h,w=h*SW.width/SW.height;ctx.save();ctx.translate(Wv.x,gy+12);ctx.drawImage(SW,-w*.6,-h,w,h);ctx.restore();}});
  const H0=Math.max(...al.map(t=>t.h*t.scale))*1.25;
  await tween(1300,k=>{Wv.x=x0+(x1-x0)*k;Wv.h=H0*(.3+1.1*easeIO(k));if(Math.random()<.5)part({x:Wv.x+rnd(-40,40),y:gy-rnd(0,40),vx:rnd(60,200),vy:-rnd(60,200),g:800,life:.7,size:rnd(5,10),rgb:pick(['130,110,85','100,85,65']),add:false,shape:'rock'});
    for(const t of al){const d=Wv.x-cx(t);if(d>-90&&d<160){if(!hid.has(t))hid.set(t,t.alpha==null?1:t.alpha);t.alpha=0;if(!done.has(t)&&d>0){done.add(t);t.hurt=.6;shake(10);hit(u,t,sk);}}else if(hid.has(t)&&d>=160){t.alpha=hid.get(t);hid.delete(t);}}});
  for(const [t,a] of hid)t.alpha=a;Wv.on=false;
  // kis törmelék marad
  const DB=[];for(const t of al)for(let i=0;i<7;i++)DB.push({x:cx(t)+rnd(-t.w*t.scale*.6,t.w*t.scale*.6),y:t.y+t.oy+rnd(-4,8),s:rnd(12,24),r:rnd(0,6),I:i%2?PB:CL});
  const D={a:1};R18E({update(){D.a-=.005;return D.a>0;},draw(){for(const d of DB){if(!d.I)continue;ctx.save();ctx.globalAlpha=Math.min(1,D.a*2);ctx.translate(d.x,d.y);ctx.rotate(d.r);ctx.drawImage(d.I,-d.s/2,-d.s/2,d.s,d.s*d.I.height/d.I.width);ctx.restore();}}});
  await wait(300);await bodySettle(u);await dimTo(0,null,250);u.pose='idle';};
if(SK.titan)SK.titan.anim='r21StoneWave';

// ---- 10) Tündérököl (páros; „miután Lili rászáll és megszórja, tűnjenek el a többiek a csillogásba, és balról jobbra
//    jöjjön be az ököl, ami egyre nagyobb és nagyobb lesz”)
R16P['Tündérököl']=async(A1,B1,al,sk,p)=>{const fa=A1.type==='fairy'?A1:B1,orc=fa===A1?B1:A1,FI=R17I.goldfist||R17I.goldpunch,fs=(al||[]).filter(t=>t&&t.alive);if(!fs.length)return;
  await dimTo(.55,'20,12,4',260);const fx0=fa.ox||0,fy0=fa.oy||0,dx=cx(orc)-cx(fa)+10,dy=(topY(orc)+18)-(fa.y+fa.oy-fa.h*fa.scale*.2);
  // 1) Lili Grog vállára száll, és megszórja tündérporral
  sfx('holy');await tween(520,k=>{const e=easeIO(k);fa.ox=fx0+dx*e;fa.oy=fy0+dy*e-Math.sin(k*Math.PI)*50;});
  for(let i=0;i<70;i++)setTimeout(()=>part({x:cx(fa)+rnd(-20,20),y:midY(fa),vx:rnd(-80,80),vy:rnd(40,220),g:120,life:rnd(.8,1.3),size:rnd(2,5),rgb:pick(['255,230,120','255,255,255']),shape:'star'}),i*12);
  await wait(800);
  // 2) mindenki eltűnik a csillogásban
  const hs=S.heroes.filter(h=>h.alive),A0=hs.map(h=>h.alpha==null?1:h.alpha);sfx('holy');
  for(const h of hs)for(let i=0;i<30;i++)part({x:cx(h)+rnd(-40,40),y:h.y+h.oy-rnd(0,h.h*h.scale),vx:rnd(-60,60),vy:-rnd(30,160),life:rnd(.6,1.1),size:rnd(3,7),rgb:pick(['255,230,120','255,255,255','255,200,90']),shape:'star'});
  await tween(450,k=>{hs.forEach((h,i)=>h.alpha=A0[i]*(1-k));});
  // 3) balról jobbra beúszik az ököl, egyre nagyobb
  const mx=fs.reduce((s,t)=>s+cx(t),0)/fs.length,my=fs.reduce((s,t)=>s+midY(t),0)/fs.length,F={x:-120,y:my,s:80,a:1};
  R18E({update(){return F.a>0;},draw(){if(!FI)return;const w=F.s,h=w*FI.height/FI.width;ctx.save();ctx.globalCompositeOperation='lighter';glow(F.x,F.y,w*.5,'255,220,120',.35*F.a);ctx.restore();ctx.save();ctx.globalAlpha=F.a;ctx.drawImage(FI,F.x-w*.55,F.y-h/2,w,h);ctx.restore();}});
  sfx('whoosh');await tween(1100,k=>{const e=k*k;F.x=-120+(mx+40)*e;F.s=80+Math.max(380,fs.length*170)*e;if(Math.random()<.7)part({x:F.x-F.s*.4,y:F.y+rnd(-F.s*.25,F.s*.25),vx:-rnd(200,500),vy:rnd(-40,40),life:.4,size:rnd(3,6),rgb:pick(['255,230,120','255,255,255']),shape:'star'});});
  sfx('boom');sfx('hit');shake(30);hitStop(140);flash('255,240,200',.6,.2);
  for(const t of fs){t.hurt=.7;toss(t,140,640);hit(orc,t,sk);for(let i=0;i<20;i++)part({x:cx(t),y:midY(t),vx:rnd(-400,400),vy:rnd(-400,100),life:.7,size:rnd(3,7),rgb:pick(['255,230,120','255,255,255']),shape:'star'});}
  if(p&&p.heal)for(const h of hs){const n=Math.round(h.maxHp*p.heal);h.hp=Math.min(h.maxHp,h.hp+n);popNum(h,n,'heal');}
  await tween(420,k=>{F.a=1-k;F.s*=1.01;});await wait(200);
  // 4) a hősök visszatérnek a csillogásból
  for(const h of hs)for(let i=0;i<14;i++)part({x:cx(h)+rnd(-40,40),y:h.y+h.oy-rnd(0,h.h*h.scale),vx:rnd(-40,40),vy:-rnd(20,80),life:.7,size:rnd(3,6),rgb:'255,230,120',shape:'star'});
  fa.ox=fx0;fa.oy=fy0;await tween(400,k=>{hs.forEach((h,i)=>h.alpha=A0[i]*k);});updateHUD();await dimTo(0,null,300);};

// ---- 11) Morgána – üst („borítsa fel az üstöt, folyjon ki a lila cucc és a lila összefüggő köd”; „a felhők alakja nem tetszik,
//    a név sem jó, és mindig ugyanazokat a kis lényeket hozza”): ÜSTBORÍTÁS – az üst lila füstben lehuppan, Morgána belerúg,
//    az üst az oldalára borul, a lila főzet kiömlik és végigfolyik a földön; az ellenségeket EGYBEFÜGGŐ, sűrű lila köd borítja
//    be (nem különálló felhők), és mire eloszlik, az ellenségek apró lényekké változtak – mindegyik más, és nem mindig ugyanazok
//    (a lehetséges lények köre sokkal nagyobb, és az utóbbi átváltozásokat kerüli)
Object.assign(SK.cauldron,{name:'Üstborítás',desc:'Morgána felborítja a boszorkányüstöt: a lila főzet végigfolyik a földön, sűrű lila köd borítja be az ellenségeket, és egy körre apró, gyenge lényekké változnak (a főellenségek kivételével). Kis sötét sebzés.'});
const R21_POLYPOOL=()=>Object.keys(EN_DEF).filter(k=>{const d=EN_DEF[k];return d&&!d.boss&&!d.miniboss&&!d.passive&&d.h&&d.h<=125&&typeof ENEMY_SPR==='object'&&ENEMY_SPR[(SPR_ALIAS&&SPR_ALIAS[k])||k]&&k!=='root';});
A.cauldronBurst=async(u,ts,sk)=>{const al=(ts||[]).filter(t=>t&&t.alive);if(!al.length)return;const CI=R17I.cauldron,SP=R17I.brewsplash,PU=r21Filt(R17I.teacloud,'hue-rotate(230deg) saturate(.85) brightness(.8)');if(!CI)return;
  u.pose='cast';const Hs=u.h*u.scale,ch=Hs*.8,cw=ch*CI.width/CI.height,gx=cx(u)+u.w*u.scale*.45+cw*.55,gy=u.y+u.oy+4,PIV={x:gx+cw*.42,y:gy};
  const C={y:-ch*2.2,rot:0,vis:false,a:1,sq:1};
  R18E({update(){return C.a>0;},draw(){if(!C.vis)return;ctx.save();ctx.globalAlpha=C.a;ctx.translate(PIV.x,PIV.y+C.y);ctx.rotate(C.rot);ctx.scale(1/C.sq,C.sq);ctx.drawImage(CI,-cw*.92,-ch,cw,ch);ctx.restore();}});
  const mouth=()=>{const lx=-cw*.42,ly=-ch*.88,c=Math.cos(C.rot),s=Math.sin(C.rot);return {x:PIV.x+c*lx-s*ly,y:PIV.y+s*lx+c*ly};};
  await dimTo(.5,'14,6,20',260);sfx('dark');for(let i=0;i<4;i++)r21PD(PU,gx+rnd(-cw*.4,cw*.4),gy-ch*rnd(.2,.9),{vx:rnd(-30,30),vy:-rnd(30,80),life:1,size:rnd(110,150),grow:60,a:.75});
  C.vis=true;await tween(280,k=>{C.y=-ch*2.2*(1-k*k);});C.y=0;sfx('rock');shake(12);await tween(200,k=>{C.sq=1-.1*Math.sin(k*Math.PI);});C.sq=1;
  // Morgána belerúg, az üst az oldalára borul
  await bodyWind(u,260,-.14);sfx('whoosh');await bodyStrike(u,140,.2);sfx('rock');
  await tween(420,k=>{C.rot=1.45*k*k;});shake(14);sfx('splash');await tween(140,k=>{C.rot=1.45-.12*Math.sin(k*Math.PI);});
  // a főzet kiömlik és végigfolyik a földön
  const minX=Math.min(...al.map(cx)),maxX=Math.max(...al.map(cx)),ggy=Math.max(...al.map(t=>t.y+t.oy))+6;
  const FL=[];R18E({update(dt){for(const b of FL){b.x+=b.vx*dt;b.vx*=Math.max(0,1-1.4*dt);b.w=Math.min(b.wm,b.w+90*dt);if(b.fade)b.a=Math.max(0,b.a-dt*.8);}return FL.some(b=>b.a>0)||!C.fl;},draw(){if(!SP)return;for(const b of FL){if(b.a<=0)continue;const w=b.w,h=w*SP.height/SP.width*.28;ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.drawImage(SP,-w/2,-h/2,w,h);ctx.restore();}}});
  sfx('poison');for(let i=0;i<26;i++){const m=mouth();if(SP)r21PD(SP,m.x,m.y,{vx:rnd(40,220),vy:rnd(-60,120),g:900,life:.6,size:rnd(26,44)});FL.push({x:m.x+rnd(0,30),y:ggy+rnd(-6,6),vx:rnd(320,620),w:60,wm:rnd(150,230),a:.95});await wait(40);}
  // egybefüggő lila köd: sok, egymásba érő festett gőz egyenletesen az egész sor fölött
  const N=Math.max(7,Math.round((maxX-minX+300)/70)),FG=[];for(let i=0;i<N;i++)FG.push({x:minX-150+(maxX-minX+300)*i/(N-1),y:ggy-rnd(30,70),s:rnd(230,290),r:rnd(-.3,.3),ph:rnd(0,6)});
  for(let i=0;i<N;i++)FG.push({x:minX-120+(maxX-minX+240)*(i+.5)/N,y:ggy-rnd(140,200),s:rnd(200,260),r:rnd(-.3,.3),ph:rnd(0,6)});
  const F={a:0,on:true,t:0};R18E({update(dt){F.t+=dt;return F.on;},draw(){if(!PU||F.a<=0)return;for(const f of FG){ctx.save();ctx.globalAlpha=F.a*.92;r17Draw(PU,f.x+Math.sin(F.t*1.3+f.ph)*14,f.y-F.t*6,f.s,{rot:f.r});ctx.restore();}}});
  sfx('wind');await tween(700,k=>{F.a=easeIO(k);});
  // a ködben átváltoznak – mindegyik más lénnyé, és nem mindig ugyanazokká
  const pool=R21_POLYPOOL(),last=S._r21polyLast||[],used=[];sfx('dark');sfx('poison');flash('200,120,255',.3,.15);shake(10);
  for(const t of al){if(!t.alive)continue;const boss=t.d&&(t.d.boss||t.d.miniboss);
    if(!boss&&pool.length){let c=pool.filter(k=>k!==t.type&&!used.includes(k)&&!last.includes(k));if(!c.length)c=pool.filter(k=>k!==t.type&&!used.includes(k));if(!c.length)c=pool.filter(k=>k!==t.type);const pk=pick(c.length?c:pool);used.push(pk);t._poly=pk;addStatus(t,'poly',1);}
    else if(boss)popLabel(t,'TÚL ERŐS AZ ÁTVÁLTOZÁSHOZ','#c890ff');
    (typeof r21HitNS==='function'?r21HitNS:hit)(u,t,sk);}
  S._r21polyLast=[...used,...last].slice(0,8);
  await wait(500);await tween(800,k=>{F.a=1-k;});F.on=false;C.fl=true;for(const b of FL)b.fade=true;await tween(350,k=>{C.a=1-k;});await bodySettle(u);await dimTo(0,null,250);u.pose='idle';};
