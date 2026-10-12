// ===== 27. kör: a tesztlap aa-pontjainak javításai =====

// ---- Kaelen – Ősi Tölgy ökle (a felhasználó: „elég, ha felemelkedik a földből az ököl”): a festett ököl az ellenség ALÓL tör fel,
// felöklözi (a levegőbe repül), aztán visszasüllyed – nincs hátralendülés, nincs ráütés oldalról
{A.oakFist=async(u,ts,sk)=>{const im=R17I.oakfist,t=ts[0];if(!t)return;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,280,.14);sfx('quake');rumble&&rumble(1,8);
  const bx=cx(t),gy=t.y+t.oy+20,Hh=Math.max(400,t.h*t.scale*2.3),Ww=im?Hh*im.width/im.height:0,F={k:0,a:1};
  // a föld megreped és remeg az ellenség alatt
  groundCrack&&groundCrack(bx,gy-8,'120,90,60',220);for(let i=0;i<20;i++)part({x:bx+rnd(-80,80),y:gy,vx:rnd(-120,120),vy:-rnd(80,220),g:800,life:.6,size:rnd(5,9),rgb:'110,85,55',add:false,shape:'rock'});
  await tween(380,k=>{t.spin=.04*Math.sin(k*60);if(Math.random()<.4)shake(3);});t.spin=0;
  R18E({update(){return F.a>0;},draw(){if(!im||F.k<=0)return;ctx.save();ctx.beginPath();ctx.rect(-200,-200,1400,gy+200+4);ctx.clip();ctx.globalAlpha=F.a;const h=Hh;ctx.drawImage(im,bx-Ww/2,gy-h*F.k,Ww,h);ctx.restore();}});
  // feltör: gyors, lendületes emelkedés, az ellenség a levegőbe repül
  sfx('boom');sfx('quake');shake(26);flash('255,240,200',.3,.12);kaeLeaves(bx,gy-60,50,420,160);
  for(let i=0;i<46;i++)part({x:bx+rnd(-90,90),y:gy,vx:rnd(-260,260),vy:rnd(-560,-200),life:1,size:rnd(7,14),rgb:pick(['120,90,60','90,70,45']),g:850,add:false,shape:'rock'});
  t.hurt=.6;toss(t,170,720);hit(u,t,sk);await tween(300,k=>F.k=r21ease.back(k)*.92);
  await wait(650);
  // visszasüllyed a földbe
  await tween(520,k=>F.k=.92*(1-r21ease.in(k)));F.a=0;await bodySettle(u);}finally{rel();}};}

// ---- Kaelen – Levéltánc (gyorsabb, simább, festett): nagy festett levelek gyorsan kibomló örvénye Kaelen körül, aztán három
// gyors, sűrű hullámban (10-10 levél) borotvaként átsuhannak az ellenségen – nincs rajzolt fénycsík, nincs lassú várakozás
A.leafDance=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const im=R17I.leaf;const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,180,.1);sfx('wind');
  const ox=cx(u),oy=midY(u),RX=u.w*u.scale*.8+50,RY=40,N=30,L=[...Array(N)].map((_,i)=>({a:i/N*6.283,y:rnd(-.45,.4),s:rnd(.9,1.3),sp:rnd(.95,1.15),st:'orb',x:ox,yy:oy,rot:0}));const E={on:true,t:0,R:0};
  const orbPos=l=>{const a=l.a+E.t*4.5*l.sp;return {x:ox+Math.cos(a)*RX*E.R,y:oy+l.y*u.h*u.scale*.7+Math.sin(a)*RY*E.R,front:Math.sin(a)>0,rot:a+1.6};};
  R18E({update(dt){E.t+=dt;for(const l of L)if(l.st==='orb'){const p=orbPos(l);l.x=p.x;l.yy=p.y;l.rot=p.rot;l.front=p.front;}return E.on;},
    draw(){if(!im)return;for(const pass of [0,1])for(const l of L){if(l.st==='gone')continue;const fr=l.st!=='orb'||l.front;if((fr?1:0)!==pass)continue;r17Draw(im,l.x,l.yy,78*l.s,{rot:l.rot,a:fr?1:.6});}}});
  await tween(380,k=>{E.R=r21ease.out(k);});sfx('wind');
  const tx=cx(t),ty=midY(t);const sub=Object.assign({},sk,{pow:sk.pow/3});
  for(let w=0;w<3;w++){const grp=L.filter(l=>l.st==='orb').slice(0,10);sfx('whoosh');
    const fl=grp.map((l,i)=>{l.st='fly';const x0=l.x,y0=l.yy,side=(w%2?1:-1)*rnd(50,120),x2=tx+(tx-x0)*.3,y2=ty+rnd(-50,50),r0=l.rot;
      return wait(i*18).then(()=>tween(300,k=>{const e=r21ease.io(k),m=1-e,cxp=(x0+tx)/2,cyp=(y0+ty)/2+side;l.x=m*m*x0+2*m*e*cxp+e*e*x2;l.yy=m*m*y0+2*m*e*cyp+e*e*y2;l.rot=r0+k*9;})).then(()=>{l.st='gone';});});
    await wait(170);sfx('slash');t.hurt=.4;shake(7);for(let i=0;i<12;i++)part({x:tx+rnd(-25,25),y:ty+rnd(-35,35),vx:rnd(-280,280),vy:rnd(-280,60),g:500,life:rnd(.4,.8),size:rnd(5,9),rgb:pick(['110,190,70','150,220,90','80,150,50']),add:false,shape:'leaf'});hit(u,t,sub);
    await Promise.all(fl);}
  toss(t,50,360);E.on=false;await bodySettle(u);}finally{rel();}};

// ---- Lótuszharmat: ÚJ FUNKCIÓ – Harmatpajzs. A csapat 20%-ot gyógyul, és mindenki kap 1 körre egy harmatpajzsot: az első
// ellenséges támadás sebzését a harmat ELNYELI, és gyógyulássá változtatja („HARMAT ELNYELTE!” + zöld szám). Nem sebez.
STATUS.dew=['Harmatpajzs','#bfefff'];if(typeof ONE_ROUND!=='undefined')ONE_ROUND.add('dew');
{const h1=hit;hit=function(u,t,sk){if(t&&t.alive&&t.kind==='hero'&&t.st&&t.st.dew&&u&&u.kind!==t.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag')){
    delete t.st.dew;let d=0;try{d=calcDmg(u,t,sk).dmg||0;}catch(e){}d=Math.max(1,Math.round(d));t.hp=Math.min(t.maxHp,t.hp+d);popLabel(t,'HARMAT ELNYELTE!','#bfefff');popNum(t,d,'heal');sfx('heal');
    const dd=R17I.dewdrop;for(let i=0;i<14;i++){const a=rnd(0,6.28),st={t:0,x:cx(t),y:midY(t),vx:Math.cos(a)*rnd(80,220),vy:Math.sin(a)*rnd(80,220)-120};R18E({update(dt){st.t+=dt;st.x+=st.vx*dt;st.y+=st.vy*dt;st.vy+=500*dt;return st.t<.7;},draw(){if(dd)r17Draw(dd,st.x,st.y,22,{a:1-st.t/.7});}});}
    ctx&&updateHUD&&updateHUD();return;}
  return h1.apply(this,arguments);};}
{const p=(typeof PAIRS!=='undefined')&&PAIRS.find(x=>x.name==='Lótuszharmat');if(p){p.desc='Óriás lótusz nyílik a csapat alatt: mindenki 20%-ot gyógyul, és 1 körre harmatpajzsot kap – az első ellenséges találat sebzését a harmat elnyeli, és gyógyulássá változtatja.';p.tgt='allies';}}
R16P['Lótuszharmat']=async(A1,B1,al,sk,p)=>{const dr=A1.type==='druid'?A1:B1,fa=dr===A1?B1:A1,dd=R17I.dewdrop;await dimTo(.3,'10,30,40',250);await Promise.all([r16Raise(dr,'150,230,90'),r16Raise(fa,'150,230,255')]);sfx('holy');
  const hs=S.heroes.filter(h=>h.alive),mx=hs.reduce((s,h)=>s+cx(h),0)/hs.length,gy=Math.max(...hs.map(h=>h.y+h.oy))+14,top=Math.max(90,Math.min(...hs.map(topY))-120),L={s:0,a:1,lv:0,t:0,dome:0},D=[];
  R18E({update(dt){L.t+=dt;for(const d of D){if(d.st!=='fall')continue;d.vy+=900*dt;d.y+=d.vy*dt;if(d.y>=d.ty){d.st='gone';for(let i=0;i<5;i++)part({x:d.x+rnd(-10,10),y:d.ty,vx:rnd(-120,120),vy:-rnd(80,200),g:700,life:.4,size:rnd(3,5),rgb:'200,240,255',add:false,shape:'drop'});}}return L.a>0;},
    draw(){if(L.s>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(mx,gy-30,380*L.s,'170,240,200',.3*L.a);ctx.restore();if(R17I.lotus){ctx.save();ctx.translate(mx,gy+50);ctx.rotate(.025*Math.sin(L.t*1.5));r17Draw(R17I.lotus,0,0,540*L.s,{anchor:'bottom',sy:.42*(.6+.4*L.s),a:L.a*.85});ctx.restore();}}
      if(L.lv>0&&R17I.dewleaves)r17Draw(R17I.dewleaves,Math.max(300,mx),top-30+Math.sin(L.t*2)*6,520*L.lv,{a:L.a});
      for(const d of D)if(d.st!=='gone'&&dd)r17Draw(dd,d.x,d.y,30*d.s,{a:L.a});
      // harmatpajzs: minden hősön csillogó vízburok
      if(L.dome>0)for(const h of hs){const r=h.h*h.scale*.55;ctx.save();ctx.globalAlpha=L.dome*L.a;const g=ctx.createRadialGradient(cx(h)-r*.3,midY(h)-r*.4,r*.1,cx(h),midY(h),r);g.addColorStop(0,'rgba(230,250,255,.35)');g.addColorStop(.75,'rgba(170,225,255,.16)');g.addColorStop(1,'rgba(150,215,255,.45)');ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx(h),midY(h),r*.75,r,0,0,7);ctx.fill();
        ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(cx(h)-r*.3,midY(h)-r*.55,r*.16,r*.07,-.5,0,7);ctx.fill();ctx.restore();}}});
  await tween(900,k=>L.s=r21ease.back(k));
  const fh=handPos(fa);for(let i=0;i<40;i++)setTimeout(()=>part({x:fh.x,y:fh.y,vx:(mx-fh.x)*rnd(1.2,1.8)+rnd(-60,60),vy:(top-fh.y)*rnd(1,1.6),life:.7,size:rnd(3,6),rgb:pick(['180,240,255','255,255,255','255,230,140']),shape:'star'}),i*15);
  await tween(600,k=>L.lv=r21ease.back(k));sfx('heal');
  for(let i=0;i<36;i++){const h=pick(hs),d={x:cx(h)+rnd(-60,60),y:top+rnd(10,50),vy:0,ty:midY(h)+rnd(-20,30),s:rnd(.8,1.3),st:'fall'};setTimeout(()=>D.push(d),i*40);}
  await wait(1500);healAll(dr,.2);for(const h of hs){for(const k of ['poison','burn','curse','foam'])if(h.st&&h.st[k])delete h.st[k];addStatus(h,'dew',2);}
  sfx('holy');popLabel(dr,'HARMATPAJZS!','#bfefff');await tween(500,k=>L.dome=r21ease.out(k));await wait(700);
  r16Lower(fa);r16Lower(dr);await tween(500,k=>{L.a=1-k;});await dimTo(0,null,300);};

// ---- Matcha-gólem – Forró hab (a felhasználó választása: Habgejzírek): a gólem a földbe csap, és minden hős alól
// sorban forró, gőzölgő festett matchahab-gejzír (fx7-foamgeyser) tör fel, feldobja őket, a hab rájuk hullik, aztán elpárolog
{const ff=A.foamFlood;A.foamFlood=async(u,ts,sk)=>{const im=R17I.foamgeyser,al=ts.filter(t=>t.alive);if(u.type!=='matchagolem'||!im||!al.length)return ff(u,ts,sk);const rel=keepPose(u);try{
  u.pose='attack';await bodyWind(u,320,-.12);bodyStrike(u,200,.22);sfx('boom');sfx('quake');shake(18);rumble&&rumble(1,8);
  for(let i=0;i<24;i++)part({x:cx(u)-u.w*u.scale*.3+rnd(-40,40),y:u.y+u.oy,vx:rnd(-220,120),vy:-rnd(100,300),g:800,life:.7,size:rnd(6,10),rgb:'110,85,55',add:false,shape:'rock'});
  const G=al.map(t=>({t,k:0,a:1,gy:t.y+t.oy+10,H:Math.max(300,t.h*t.scale*2.1)}));
  R18E({update(){for(const g of G)if(g.k>.3&&Math.random()<.35)r21Steam(cx(g.t)+rnd(-40,40),g.gy-g.H*g.k*.8,rnd(-30,30),-rnd(60,120),false);return G.some(g=>g.a>0);},
    draw(){for(const g of G){if(g.k<=0||g.a<=0)continue;const w=g.H*im.width/im.height,h=g.H*g.k*(1+.04*Math.sin(T*14));ctx.save();ctx.globalAlpha=g.a;ctx.beginPath();ctx.rect(cx(g.t)-w,g.gy-h-60,w*2,h+64);ctx.clip();ctx.drawImage(im,cx(g.t)-w/2,g.gy-h,w,g.H*(1+.04*Math.sin(T*14)));ctx.restore();}}});
  // repedés fut végig, majd hősenként feltör a gejzír
  for(const g of G){const t=g.t;sfx('steam');await tween(260,k=>{t.spin=.05*Math.sin(k*50);});t.spin=0;
    sfx('splash');sfx('boom');shake(14);flash('235,250,225',.25,.08);t.hurt=.6;toss(t,150,700);hit(u,t,sk);
    tween(300,k=>g.k=r21ease.back(k));for(let i=0;i<30;i++)part({x:cx(t)+rnd(-30,30),y:g.gy-rnd(60,g.H*.9),vx:rnd(-260,260),vy:-rnd(100,420),g:700,life:rnd(.7,1.2),size:rnd(8,16),rgb:pick(['255,255,255','236,248,222','214,236,190']),add:false,shape:'dot'});await wait(180);}
  await wait(700);
  // a gejzírek elapadnak, a hab elpárolog
  await tween(600,k=>{for(const g of G){g.k=1-r21ease.in(k);g.a=1-k*.6;}});for(const g of G)g.a=0;await bodySettle(u);}finally{rel();}};}

// ===== Felszerelés a hősön: ha a bolti fegyver+ruha fejlesztése együtt legalább 4 szint, a hős festett, díszesebb képre vált
// (Zordon: aranyfiligrános bot nagy kék kristállyal, csillagmintás, aranyszegélyes talár). A többi hős képei még készülnek.
const GEAR_LOOK={wizard:'wizardG',witch:'witchG',fairy:'fairyG',orc:'orcG',monk:'monkG',druid:'druidG'},GEAR_LOOK_MIN=4;
const gearLook=h=>h&&h.gear&&GEAR_LOOK[h.type]&&(h.gear.w||0)+(h.gear.a||0)>=GEAR_LOOK_MIN&&typeof ENEMY_SPR==='object'&&ENEMY_SPR[GEAR_LOOK[h.type]]?GEAR_LOOK[h.type]:null;
{const dp=drawHeroPoses;drawHeroPoses=function(e,type){const g=e&&e.kind==='hero'&&gearLook(e);if(g){if(DRINK_K[type]&&!DRINK_K[g])DRINK_K[g]=DRINK_K[type];if(ENEMY_SPR[type+'-drink']&&!ENEMY_SPR[g+'-drink'])ENEMY_SPR[g+'-drink']=ENEMY_SPR[type+'-drink'];return dp.call(this,e,g);}return dp.apply(this,arguments);};}
