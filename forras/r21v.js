// ===== 35. kör: a teljes tesztlista várakozó jelölései (2026-10-13) =====
// Bambusz-gólem fehér folt (kép), Bambuszcsapás villanás a bothegynél (handPos dőléssel), Levéltánc, Tövisvihar, Élő Bambuszkéreg,
// Hegyomlás, Lidércnyomás (kisebb karok, a tenyér szorít), Átok csontjai (fekete-lila, lángoló), Dobótőr, Tűzbomba

// ---- közös: festett kő-/földrög a 3×3-as lapról (fx7-clods)
function r21Clod(f,x,y,s,rot=0,a=1){const im=R17I.clods;if(!im)return;const cw=im.width/3,ch=im.height/3;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);
  ctx.drawImage(im,(f%3)*cw,Math.floor(f/3)*ch,cw,ch,-s/2,-s/2,s,s);ctx.restore();}
// porfelhő-pamacs (valósághű füsttextúra), földszínben
const r21Dust=(x,y,n=6,sp=160,sz=[26,48],rgb=['150,125,95','120,100,75','175,155,120'])=>{for(let i=0;i<n;i++)part({x:x+rnd(-20,20),y:y-rnd(0,14),vx:rnd(-sp,sp),vy:-rnd(20,sp*.7),drag:1.6,life:rnd(.7,1.3),size:rnd(sz[0],sz[1]),grow:30,rgb:pick(rgb),add:false,shape:'smoke'});};

// =====================================================================================================
// Levéltánc (ia: „gagyi, látványosabb, élethűbb, több legyen, darabos”): egyetlen, megszakítás nélküli levélfolyam.
// 160 festett levél áramlik a bothegyből kígyózó ívben az ellenfélig, ott sűrű, forgó levélgubóként körbetekeri
// (elöl-hátul, a levelek 3D-ben pörögnek, elmosódó utóképpel), a gubó négyszer megvágja, végül szétrobban.
// Minden pozíció a folyamatos időből számolódik – nincs hullám, nincs ugrás.
{const ld0=A.leafDance;A.leafDance=async(u,ts,sk)=>{const lf=R17I.leaf,t=ts[0];if(!lf||!t||!t.alive)return ld0(u,ts,sk);const rel=keepPose(u);
 try{u.pose='cast';await bodyWind(u,200,.1);sfx('wind');
  const tw=t.w*t.scale,th=t.h*t.scale,tx=cx(t),ty=midY(t),N=160,SPAWN=1.5,TR=.62,ORB=.75,OUT=.5;
  const E={t:0,on:true,glow:0,burst:-1};const L=[...Array(N)].map((_,i)=>({s0:i/N*SPAWN+rnd(0,.03),j1:rnd(-90,60),j2:rnd(-70,70),wob:rnd(-1,1),ph:rnd(0,6.28),
    a0:rnd(0,6.28),w:rnd(5,8)*(Math.random()<.5?1:-1)*.6+rnd(4,6),hy:rnd(-.45,.4),sz:rnd(30,52),flip:rnd(6,12),H:[]}));
  const orbPos=(l,tt)=>{const a=l.a0+tt*l.w,R=(tw*.62+28)*(1-.18*Math.sin(tt*3+l.ph));return {x:tx+Math.cos(a)*R,y:ty+l.hy*th+Math.sin(a)*R*.32,front:Math.sin(a)>0,rot:a+1.57};};
  const pos=l=>{const q=E.t-l.s0;if(q<0)return null;const h0=handPos(u);
    if(q<TR){const k=q/TR,e=k*k*(3-2*k),end=orbPos(l,0),x0=h0.x,y0=h0.y,dx=end.x-x0;
      const P1={x:x0+dx*.3,y:y0-150+l.j1},P2={x:end.x-dx*.28,y:end.y-110+l.j2},m=1-e;
      let x=m*m*m*x0+3*m*m*e*P1.x+3*m*e*e*P2.x+e*e*e*end.x,y=m*m*m*y0+3*m*m*e*P1.y+3*m*e*e*P2.y+e*e*e*end.y;
      y+=Math.sin(k*9+l.ph)*26*Math.sin(k*Math.PI);return {x,y,front:true,rot:Math.atan2(end.y-y0,dx)+Math.sin(q*l.flip)*.6,a:Math.min(1,k*5),st:0};}
    const q2=q-TR;if(q2<ORB){const o=orbPos(l,q2);o.a=1;o.st=1;return o;}
    const q3=q2-ORB;if(q3<OUT){const o=orbPos(l,ORB),a=l.a0+ORB*l.w,v=520+l.sz*6;o.x+=Math.cos(a)*v*q3+Math.cos(a+1.57*Math.sign(l.w))*v*.4*q3;o.y+=Math.sin(a)*v*q3*.6-140*q3;o.a=1-q3/OUT;o.st=2;o.rot+=q3*14;return o;}
    return null;};
  const drawLeaf=(x,y,s,rot,sy,a)=>{ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(rot);ctx.scale(1,sy);const w=s,h=s*lf.height/lf.width;ctx.drawImage(lf,-w/2,-h/2,w,h);ctx.restore();};
  R18E({update(dt){E.t+=dt;for(const l of L){const p=pos(l);l.p=p;if(p){l.H.unshift([p.x,p.y]);if(l.H.length>4)l.H.length=4;}else l.H.length=0;}return E.on;},
    draw(){// a gubó belső zöld derengése
      if(E.glow>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(tx,ty,tw*1.3+60,'140,230,90',.35*E.glow);ctx.restore();}
      // szélcsíkok: halvány, áramló zöld szalagok a levelek nyomvonalán
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';
      for(const l of L){if(!l.p||l.p.st!==0||l.H.length<4)continue;ctx.strokeStyle='rgba(170,240,120,.10)';ctx.lineWidth=l.sz*.32;ctx.beginPath();ctx.moveTo(l.H[0][0],l.H[0][1]);for(const [x,y] of l.H)ctx.lineTo(x,y);ctx.stroke();}ctx.restore();
      const dr=front=>{for(const l of L){const p=l.p;if(!p||p.front!==front)continue;const sy=Math.cos(E.t*l.flip+l.ph),s=l.sz*(p.st===1&&!p.front?.85:1);
        // elmosódó utókép (sebesség-érzet)
        for(let i=1;i<l.H.length;i+=1)drawLeaf(l.H[i][0],l.H[i][1],s,p.rot,sy,p.a*.16/i);
        drawLeaf(p.x,p.y,s,p.rot,Math.abs(sy)<.15?.15*Math.sign(sy||1):sy,p.a*(p.front?1:.55));}};
      dr(false);dr(true);}});
  const ws=setInterval(()=>sfx('whoosh'),230);
  // a gubó kialakul; négy vágás a forgás közben
  await wait((TR+.1)*1000);tween(400,k=>E.glow=k);const sub=Object.assign({},sk,{pow:sk.pow/4});
  for(let i=0;i<4&&t.alive;i++){sfx('slash');t.hurt=.45;shake(6+i*2);hitStop(40);
    for(let n=0;n<14;n++)part({x:tx+rnd(-tw*.5,tw*.5),y:ty+rnd(-th*.4,th*.4),vx:rnd(-260,260),vy:rnd(-260,60),g:420,life:rnd(.5,.9),size:rnd(7,11),rgb:pick(['110,190,70','150,220,90','80,160,50']),add:false,shape:'leaf'});
    sparks(tx,ty,['200,255,160','255,255,255'],10,320);hit(u,t,sub);await wait(330);}
  // szétrobban
  await wait(Math.max(0,(SPAWN+TR+ORB)*1000-(TR+.1)*1000-4*330-120));clearInterval(ws);sfx('wind');shake(10);flash('190,255,150',.25,.12);toss(t,50,360);
  await tween(380,k=>E.glow=1-k);await wait(OUT*1000);E.on=false;await bodySettle(u);}finally{rel();}};}

// =====================================================================================================
// Tövisvihar (ia: „gagyi, látványosabb, darabos”): a tölcsér eddig szeletenként a kép és tükörképe között villódzott
// (csíkos, szaggatott hatás). Most a festett rózsatövis-tölcsér VALÓDI hengerként forog: soronként folyamatosan
// gördülő, tükrözve ismétlődő minta, a festett körvonalon belül maradva, a szélein árnyékolva – nincs villódzás.
const R21TW=new Map();
function r21TwExt(im){let e=R21TW.get(im);if(e)return e;const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const g=c.getContext('2d');g.drawImage(im,0,0);
  let d;try{d=g.getImageData(0,0,c.width,c.height).data;}catch(err){d=null;}const N=56,rows=[];
  for(let i=0;i<N;i++){const y=Math.min(c.height-1,Math.floor((i+.5)*c.height/N));let l=-1,r=-1;if(d)for(let x=0;x<c.width;x++){if(d[(y*c.width+x)*4+3]>40){if(l<0)l=x;r=x;}}else{l=0;r=c.width-1;}rows.push(l<0?null:[l,r+1]);}
  e={N,rows,oc:document.createElement('canvas')};e.oc.width=im.width;e.oc.height=im.height;R21TW.set(im,e);return e;}
r21Twister=function(im,x,gy,H,t,a=1,dir=1){if(!im||a<=0)return;const E=r21TwExt(im),iw=im.width,ih=im.height,N=E.N,rh=ih/N,o=E.oc,g=o.getContext('2d');
  g.clearRect(0,0,iw,ih);
  for(let i=0;i<N;i++){const rw=E.rows[i];if(!rw)continue;const [l,r]=rw,bw=r-l;if(bw<4)continue;const sy=i*rh,q=i/N;
    // forgás: a sor tartalma vízszintesen gördül (tükrözött ismétléssel, így nincs varrat); fent kicsit gyorsabb
    const off=((t*(.5+.25*(1-q))*dir+q*.37)%2+2)%2*bw;
    g.save();g.beginPath();g.rect(l,sy,bw,rh+1);g.clip();
    for(let j=-1;j<3;j++){const px=l+j*bw-off+bw;const fl=((j%2)+2)%2===1;g.save();if(fl){g.translate(px+bw,0);g.scale(-1,1);g.drawImage(im,l,sy,bw,rh+1,0,sy,bw,rh+1);}else g.drawImage(im,l,sy,bw,rh+1,px,sy,bw,rh+1);g.restore();}
    g.restore();}
  // a festett körvonal megmarad
  g.globalCompositeOperation='destination-in';g.drawImage(im,0,0);
  // henger-árnyékolás: soronként a két szél sötétebb, a közepe fényes
  g.globalCompositeOperation='source-atop';for(let i=0;i<N;i++){const rw=E.rows[i];if(!rw)continue;const [l,r]=rw;const gr=g.createLinearGradient(l,0,r,0);
    gr.addColorStop(0,'rgba(10,20,5,.55)');gr.addColorStop(.3,'rgba(10,20,5,0)');gr.addColorStop(.55,'rgba(255,255,230,.10)');gr.addColorStop(.75,'rgba(10,20,5,0)');gr.addColorStop(1,'rgba(10,20,5,.55)');g.fillStyle=gr;g.fillRect(l,i*rh,r-l,rh+1);}
  g.globalCompositeOperation='source-over';
  // kirajzolás sávonként, lágy kígyózással (a csúcs leng, a talp áll)
  const W=H*iw/ih,S=24,sh=ih/S;ctx.save();ctx.globalAlpha*=a;
  for(let i=0;i<S;i++){const q=i/S,off=Math.sin(t*2.6+q*3.2)*H*.05*(1-q)+Math.sin(t*1.3)*H*.02*(1-q);ctx.drawImage(o,0,i*sh,iw,sh+1,x-W/2+off,gy-H+q*H,W,H/S+1);}
  ctx.restore();};

{const ts0=A.thornStorm;A.thornStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);const im=R17I.rosestorm||R17I.thornstorm,lf=R17I.leaf;if(!al.length||!im)return ts0(u,ts,sk);
  const rel=keepPose(u);try{u.pose='cast';await bodyWind(u,280,.14);sfx('wind');const h=handPos(u);await dimTo(.38,'20,25,10',300);
  const gy=al.reduce((s,t)=>s+t.y+t.oy,0)/al.length+10,Tw={x:h.x,y:h.y,s:.12,a:1,t:0,on:true};
  // 150 keringő test: festett levelek és rózsaszirmok, lassabb (folyamatos) szögsebességgel, elmosódó utóképpel
  const O=[...Array(150)].map(()=>({q:rnd(.02,.98),ph:rnd(0,6.28),sp:rnd(2.4,3.8),s:rnd(.55,1.25),kind:Math.random()<.72?'leaf':'petal',fl:rnd(5,10)}));
  const pet=R17I.petal;
  R18E({update(dt){Tw.t+=dt;if(Tw.on&&Tw.s>.5){r21Dust(Tw.x+rnd(-90,90),gy,1,150,[18,30]);
      if(Math.random()<.7)part({x:Tw.x+rnd(-60,60),y:gy-rnd(60,380),vx:rnd(-320,320),vy:rnd(-200,60),g:200,life:rnd(.6,1),size:rnd(6,9),rgb:pick(['200,40,50','230,80,90','170,20,40']),add:false,shape:'leaf'});
      if(Math.random()<.45)part({x:Tw.x+rnd(-70,70),y:gy-rnd(0,10),vx:rnd(-220,220),vy:-rnd(200,440),g:800,life:.8,size:rnd(5,9),rgb:'130,105,70',add:false,shape:'rock'});}return Tw.a>0;},
    draw(){if(Tw.a<=0)return;const H=560*Tw.s,base=Tw.y;
      ctx.save();ctx.globalAlpha=Tw.a*.6*Math.min(1,Tw.s);ctx.translate(Tw.x,base+6);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,10,0,0,240*Tw.s);g.addColorStop(0,'rgba(110,90,60,.75)');g.addColorStop(1,'rgba(110,90,60,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,240*Tw.s,0,6.283);ctx.fill();ctx.restore();
      const orb=front=>{for(const o of O){const an=o.ph+Tw.t*o.sp,f=Math.sin(an)>0;if(f!==front)continue;const r=(34+o.q*H*.4),yy=base-o.q*H+Math.sin(an)*r*.16,xx=Tw.x+Math.cos(an)*r*(1+.04*Math.sin(Tw.t*3+o.q*5));
        const img=o.kind==='petal'&&pet?pet:lf,sz=(o.kind==='petal'?30:44)*o.s*Tw.s,al=Tw.a*(front?1:.45),sy=Math.cos(Tw.t*o.fl+o.ph);if(!img)continue;
        // utókép: 2 korábbi szöghelyzet halványan
        for(let k=1;k<=2;k++){const a2=an-k*.09*o.sp,x2=Tw.x+Math.cos(a2)*r,y2=base-o.q*H+Math.sin(a2)*r*.16;ctx.save();ctx.globalAlpha=al*.18/k;ctx.translate(x2,y2);ctx.rotate(a2*1.2);ctx.scale(1,sy);ctx.drawImage(img,-sz/2,-sz/2*img.height/img.width,sz,sz*img.height/img.width);ctx.restore();}
        ctx.save();ctx.globalAlpha=al;ctx.translate(xx,yy);ctx.rotate(an*1.2);ctx.scale(1,Math.abs(sy)<.2?.2*Math.sign(sy||1):sy);ctx.drawImage(img,-sz/2,-sz/2*img.height/img.width,sz,sz*img.height/img.width);ctx.restore();}};
      orb(false);
      // mögötte halványabb, ellenkező irányba forgó második tölcsér (mélység)
      ctx.save();ctx.globalAlpha=.38;r21Twister(im,Tw.x+10,base+12,H*1.1,Tw.t+1.3,Tw.a,-1);ctx.restore();
      r21Twister(im,Tw.x,base+8,H,Tw.t,Tw.a,1);
      // forgó szélcsíkok a tölcsér előtt
      ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';for(let i=0;i<7;i++){const q=(i+.5)/7,r=(30+q*H*.38),yy=base-q*H,ph=Tw.t*3.2+i*1.7;ctx.strokeStyle=`rgba(225,255,200,${.16*Tw.a})`;ctx.lineWidth=3+5*(1-q);
        ctx.beginPath();ctx.ellipse(Tw.x,yy,r,r*.16,0,ph%6.283,ph%6.283+1.6);ctx.stroke();}ctx.restore();
      orb(true);}});
  await tween(650,k=>{Tw.s=.12+.88*r21ease.back(k);Tw.y=h.y+(gy-h.y)*r21ease.io(k);});bodyStrike(u,180,-.2);sfx('whoosh');rumble&&rumble(1.8,4);
  const xs=al.slice().sort((a,b)=>cx(a)-cx(b)),x0=Tw.x,x1=cx(xs[xs.length-1])+90,caught=new Map();const wnd=setInterval(()=>sfx('wind'),300);
  await tween(2200,k=>{Tw.x=x0+(x1-x0)*r21ease.io(k);Tw.s=1+.04*Math.sin(k*18);if(Math.random()<.12)shake(4);
    for(const t of xs){const d=Math.abs(Tw.x-cx(t));if(!caught.has(t)&&d<70){caught.set(t,k);sfx('slash');shake(12);t.hurt=.6;
        for(let n=0;n<40;n++)part({x:cx(t),y:midY(t),vx:rnd(-440,440),vy:rnd(-400,80),g:500,life:.9,size:rnd(8,14),rgb:pick(['108,191,58','77,154,42','155,216,90','200,40,50']),add:false,shape:'leaf'});hit(u,t,sk);}
      if(caught.has(t)){const q=(k-caught.get(t))*4.2;if(q<1){t.spin=q*Math.PI*6;t.jump=Math.sin(q*Math.PI)*180;}else{t.spin=0;t.jump=0;}}}});
  clearInterval(wnd);for(const t of xs){t.spin=0;t.jump=0;if(caught.has(t))toss(t,80,500);else if(t.alive)hit(u,t,sk);}Tw.on=false;
  await tween(600,k=>{Tw.a=1-k;Tw.s=1+.3*k;});await dimTo(0,null,300);await bodySettle(u);}finally{for(const t of al){t.spin=0;t.jump=0;}rel();}};}

// =====================================================================================================
// Élő Bambuszkéreg (ia: „kitakarja a hősöket, és nem verte vissza a támadást”):
// 1) a bambuszfal a társ SAJÁT rajzolási rétegében van (közvetlenül utána rajzolódik), így az előtte álló hősök eltakarják,
//    nem a fal takarja őket; kisebb is: a társ elé nő, nagyjából a mellmagasságáig.
// 2) a fal tényleg visszaver: a társ a sebzésnek csak 30%-át kapja, a támadó a teljes sebzés 80%-át visszakapja
//    (festett bambuszlándzsák repülnek vissza), a fal megremeg.
{const R21BW=new Map();
 const de=drawEntity;drawEntity=function(e){const r=de.apply(this,arguments);const W=R21BW.get(e);if(W)try{W.draw();}catch(err){R21BW.delete(e);}return r;};
 const cd=calcDmg;calcDmg=function(u,t,sk){const r=cd.apply(this,arguments);try{if(t&&t.kind==='hero'&&t.st&&t.st.bamwall&&u&&u.kind!==t.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag')&&r&&r.dmg>0){t._bwRaw=r.dmg;r.dmg=Math.max(1,Math.round(r.dmg*.3));}}catch(e){}return r;};
 const b0=A.barkCage;A.barkCage=async(u,ts,sk)=>{const im=R3('bamboowall'),t=ts[0];if(!im||!t)return b0(u,ts,sk);u.pose='cast';await bodyWind(u,200,.1);
  const C={k:0,a:1,hitT:-9};const geo=()=>{const tw=t.w*t.scale,th=t.h*t.scale;return {gx:cx(t)+tw*.5,gy:t.y+t.oy+8,Wd:Math.max(120,tw*1.3),Hh:th*.78};};
  C.draw=()=>{if(C.k<=0||C.a<=0)return;const {gx,gy,Wd,Hh}=geo(),now=r21Now(),wob=Math.max(0,1-(now-C.hitT)/.5);ctx.save();ctx.globalAlpha=Math.max(0,C.a)*.93;
    ctx.translate(gx,gy);ctx.rotate(Math.sin(now*40)*.05*wob);const w=Wd,h=Hh*C.k;ctx.drawImage(im,-w/2,-h,w,h);
    if(wob>0){ctx.globalCompositeOperation='lighter';glow(0,-h*.5,w*.8,'190,255,140',.45*wob);}ctx.restore();};
  C.hit=()=>{C.hitT=r21Now();};R21BW.set(t,C);t._bwFx=C;
  effects.push({update(){if(S.over||!S.heroes.includes(t))C.a=0;if(C.ready&&!(t.alive&&t.st&&t.st.bamwall))C.a-=.04;if(C.a<=0){R21BW.delete(t);if(t._bwFx===C)t._bwFx=null;}return C.a>0;},draw(){}});
  const {gx,gy,Wd}=geo();sfx('quake');shake(10);kaeLeaves(gx,gy-60,30,300,120);for(let i=0;i<26;i++)part({x:gx+rnd(-Wd/2,Wd/2),y:gy,vx:rnd(-200,200),vy:rnd(-340,-120),life:.9,size:rnd(6,10),rgb:'120,90,60',g:700,add:false,shape:'rock'});r21Dust(gx,gy,8,180);
  await tween(480,k=>C.k=eOutBack(k));flash('170,230,110',.2,.15);hit(u,t,sk);C.ready=true;popLabel(t,'BAMBUSZFAL!','#b8e07a');await wait(400);await bodySettle(u);u.pose='idle';};
 // a visszaverés látványa: a fal megremeg, a lándzsák a falból repülnek vissza
 const h0=hit;hit=function(u,t,sk){const had=!!(t&&t.st&&t.st.bamwall&&u&&u.kind!==t.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag'));const r=h0.apply(this,arguments);
   if(had&&t._bwFx){t._bwFx.hit();popLabel(t,'BAMBUSZFAL VÉDTE!','#b8e07a');const W=t._bwFx;const gx=cx(t)+t.w*t.scale*.5,gy=t.y+t.oy;for(let i=1;i<3;i++)setTimeout(()=>{if(u.alive||u.hp>0)fxFly('bamboospear',gx,gy-t.h*t.scale*(.3+i*.12),cx(u),midY(u)+rnd(-20,20),300,{size:280,arc:40});},i*110);}
   t&&(t._bwRaw=0);return r;};}

// =====================================================================================================
// Hegyomlás (ia: „több legyen, gagyi, látványosabb, élethűbb”): Grog a földbe csap, a földön repedés fut az ellenségekig,
// felettük kőpor-felhő gyűlik, három hullámban festett kő- és földrögök zúdulnak le (porcsóvával, becsapódáskor
// porpamacs és kőzápor), majd végiggördül a festett kőlavina, és a végén minden ellenségre egy óriási szikla zuhan
// (kráter, talajba nyomódás, nagy porfelhő). Föld elem: nincs láva, nincs tűz.
A.avalanche=async(u,ts,sk)=>{const {al,mx,gy}=grp(ts);if(!al.length)return;const rel=keepPose(u);
 try{await dimTo(.45,'40,28,14',260);u.pose='cast';sfx('growl');await bodyWind(u,320,.16);
  // földbe csapás – egész testtel
  u.pose='attack';await bodyStrike(u,160,-.24);sfx('quake');shake(16);hitStop(60);rumble(3.6,5);const ux=cx(u),uy=u.y+u.oy;r21Dust(ux+40,uy,10,220);
  for(let i=0;i<12;i++)part({x:ux+40+rnd(-30,30),y:uy,vx:rnd(-160,260),vy:-rnd(200,420),g:900,life:.9,size:rnd(6,11),rgb:'130,105,75',add:false,shape:'rock'});
  // repedés fut a földön az ellenségekig, porfelhők sorban
  const xmin=Math.min(...al.map(t=>cx(t)))-80,crack={k:0,a:1};
  // (a repedés vonala nem kell – csak a porfelhők futnak végig a földön)
  tween(420,k=>{const p=crack.k;crack.k=k;const x=ux+40+(xmin-ux-40)*k;if(Math.floor(p*8)!==Math.floor(k*8)){r21Dust(x,uy+4,3,120,[20,34]);for(let n=0;n<3;n++)part({x,y:uy,vx:rnd(-90,90),vy:-rnd(180,360),g:900,life:.7,size:rnd(6,10),rgb:'130,105,75',add:false,shape:'rock'});}});
  // kőpor-felhő gyűlik az ellenségek fölött
  const cl=R17I.rockcloud,sky={a:0,x:mx+40,y:150},spanW=Math.max(520,(Math.max(...al.map(cx))-Math.min(...al.map(cx)))+380);
  R18E({update(dt){if(sky.a>.5&&Math.random()<.5)part({x:sky.x+rnd(-spanW/2,spanW/2),y:sky.y+30,vx:rnd(-20,20),vy:rnd(40,120),life:1,size:rnd(3,6),rgb:'120,100,80',add:false,shape:'rock'});return sky.a>0;},
    draw(){if(sky.a<=0||!cl)return;ctx.save();ctx.globalAlpha=sky.a*.95;const w=spanW,h=w*cl.height/cl.width;ctx.drawImage(cl,sky.x-w/2,sky.y-h*.55+Math.sin(r21Now()*2)*4,w,h);ctx.restore();}});
  await tween(450,k=>sky.a=k);
  // kőhullámok: lehulló rögök
  const R=[],fall=(x,y,s,f,delay,big)=>{const o={x:x+260+rnd(0,120),y:-60-rnd(0,120),tx:x,ty:y,s,f,rot:rnd(0,6),vr:rnd(-6,6),k:-delay,big,done:false,stay:0};R.push(o);return o;};
  R18E({update(dt){for(const o of R){if(o.done){o.stay+=dt;continue;}o.k+=dt/(o.big?.55:.42);if(o.k<0)continue;
      if(Math.random()<.6)part({x:o.cx||o.x,y:o.cy||o.y,vx:rnd(-30,30),vy:rnd(-30,10),life:.5,size:o.s*.35,grow:20,rgb:'150,130,100',add:false,shape:'smoke'});
      if(o.k>=1){o.done=true;sfx(o.big?'boom':'rock');shake(o.big?22:5);r21Dust(o.tx,o.ty,o.big?16:4,o.big?320:150,o.big?[40,80]:[20,36]);
        for(let i=0;i<(o.big?30:8);i++)part({x:o.tx+rnd(-20,20),y:o.ty-6,vx:rnd(-340,340)*(o.big?1:.6),vy:-rnd(160,520),g:1000,life:rnd(.6,1.1),size:rnd(5,o.big?16:10),rgb:'130,105,75',add:false,shape:'rock'});if(o.onHit)o.onHit();}}
    return R.some(o=>!o.done||o.stay<1.4);},
    draw(){const cr=R17I.crater;for(const o of R){if(!o.done||!o.big||!cr)continue;const w=o.s*1.9,a=Math.max(0,1-Math.max(0,o.stay-.9)/.5);ctx.save();ctx.globalAlpha=a;ctx.drawImage(cr,o.tx-w/2,o.ty-w*cr.height/cr.width*.55,w,w*cr.height/cr.width);ctx.restore();}
      for(const o of R){if(o.k<0)continue;const e=Math.min(1,o.k),ee=e*e;let x,y,rot=o.rot+o.vr*e,a=1;
        if(!o.done){x=o.x+(o.tx-o.x)*e;y=o.y+(o.ty-o.s*.3-o.y)*ee;o.cx=x;o.cy=y;}
        else{x=o.tx;y=o.ty-o.s*.3+Math.min(o.s*.25,o.stay*o.s*.6);a=Math.max(0,1-Math.max(0,o.stay-.8)/.6);rot=o.rot+o.vr;}
        if(!o.done){ctx.save();ctx.globalAlpha=.25;r21Clod(o.f,x-(o.tx-o.x)*.04,y-(o.ty-o.y)*.06,o.s,rot-.2);ctx.restore();}
        r21Clod(o.f,x,y,o.s,rot,a);}}});
  const zone=()=>{const t=pick(al);return {x:cx(t)+rnd(-t.w*t.scale*.9,t.w*t.scale*.9),y:t.y+t.oy+rnd(-6,10)};};
  for(let w=0;w<3;w++){for(let i=0;i<14+w*4;i++){const z=zone();fall(z.x,z.y,rnd(56,112)+w*12,Math.floor(rnd(0,9)),i*.045,false);}
    sfx('rock');for(const t of al){t.hurt=.3;}await wait(420);}
  // (a kőhullám átkerült a Földrengéshez – a felhasználó kérése)
  // óriási szikla mindenkire
  await Promise.all(al.map((t,i)=>new Promise(res=>{const s=Math.max(200,t.h*t.scale*1.25);const o=fall(cx(t),t.y+t.oy+4,s,[0,6,7][i%3],i*.12,true);o.x=cx(t)+120;o.y=-s;
    o.onHit=()=>{flash('230,210,170',.35,.12);hitStop(110);t.hurt=.7;hit(u,t,sk);if(typeof r21Sink==='function')try{r21Sink(t);}catch(e){}res();};})));
  await wait(900);tween(500,k=>sky.a=1-k);await dimTo(0,null,350);await bodySettle(u);}finally{rel();}};

// =====================================================================================================
// Lidércnyomás (ia: „a karok stílusa jó, csak túl nagyok – így nem a kézfej nyomja össze, hanem az alkar”):
// a kar hossza az ellenfél magasságához igazodik, a két kar távolabbról, ferdén nő ki, és a TENYÉR ér az ellenfél
// derekához – a kézfej szorítja össze. A festett lidérckar (fx7-wraitharm) és a jelenet többi része változatlan.
{const ng0=A.nightmareGrip;A.nightmareGrip=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive||!R17I.wraitharm)return ng0(u,ts,sk);await dimTo(.8,'10,0,20',300);await castPose(u,'120,40,180',380);sfx('dark');
  const x=cx(t),gy=t.y+t.oy+8,H=t.h*t.scale,tw=t.w*t.scale,hy=H*.5,a0=t.spin||0;
  // a kar a földből nő ki (a talajvonalnál levágva), ferdén befelé dől; a TENYÉR (a kép tetejétől ~14%-ra) az ellenfél oldalán,
  // derékmagasságban van – a kézfej szorít, nem az alkar. Hossz: az ellenfélhez igazodik, a tenyér nagyjából az ellenfél félszélessége.
  const L=Math.max(240,H*1.35,tw*2.2),handW=L*1.05*235/683,TH=.32,off=Math.max(tw*.5,30)+handW*.15,M={a:0,k:0,grip:0,sq:0},R0=off*2.2;
  const armAt=(side)=>{const th=TH*(.4+.6*M.grip)*side,hx=x-side*(off-M.sq*tw*.1),hyy=gy-hy,bx=hx-Math.sin(th)*L*.86,by=hyy+Math.cos(th)*L*.86+L*.9*(1-M.k);return {bx,by,th};};
  effects.unshift({update(){return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.translate(x,gy);ctx.scale(1,.22);const g=ctx.createRadialGradient(0,0,10,0,0,R0);g.addColorStop(0,`rgba(5,0,12,${.95*M.a})`);g.addColorStop(.6,`rgba(60,15,100,${.6*M.a})`);g.addColorStop(1,'rgba(60,15,100,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R0,0,6.29);ctx.fill();ctx.restore();}});
  effects.push({update(){if(!M.done&&Math.random()<.5)part({x:x+rnd(-R0*.8,R0*.8),y:gy,vx:rnd(-20,20),vy:-rnd(40,120),life:rnd(.7,1.2),size:rnd(14,24),grow:16,rgb:pick(['40,12,70','70,25,110']),add:false,shape:'dsmoke'});return !M.done||M.a>0;},
    draw(){if(M.a<=0||M.k<=0)return;ctx.save();ctx.beginPath();ctx.rect(-50,-50,W+100,gy+4+50);ctx.clip();
      for(const side of [1,-1]){const A2=armAt(side);r21Arm(A2.bx,A2.by,L,A2.th,side<0,M.a,M.grip);}ctx.restore();}});
  sfx('quake');rumble&&rumble(.8,5);await tween(300,k=>{M.a=k;});popLabel(t,'LIDÉRCNYOMÁS!','#c890ff');
  sfx('growl');await tween(520,k=>{M.k=eOutBack(k);});await wait(120);
  sfx('whoosh');await tween(240,k=>{M.grip=k*k;});shake(14);sfx('bite');flash('120,40,180',.3,.1);
  for(let i=0;i<3&&t.alive;i++){sfx('crunch');await tween(170,k=>{M.sq=Math.sin(k*Math.PI);t.spin=Math.acos(1-.22*Math.sin(k*Math.PI));t.hurt=.3;});shake(10+i*4);hitStop(60);
    sparks(x,gy-hy,['170,90,255','255,255,255'],14,380);for(let n=0;n<10;n++)part({x:x+rnd(-30,30),y:gy-hy+rnd(-30,30),vx:rnd(-200,200),vy:rnd(-220,40),life:.5,size:rnd(4,8),rgb:'120,40,200',add:true});await wait(70);}
  t.spin=a0;hit(u,t,sk);toss(t,30,300);await wait(250);
  await tween(380,k=>{M.grip=1-k;M.k=1-k*.9;M.a=1-k;});M.done=true;M.a=0;u.pose='idle';await dimTo(0,null,300);};}

// =====================================================================================================
// Átok (ia: „a csontok stílusa legyen olyan, mint a többi rész”): a repülő csontok is fekete-lilák, mint a koponya,
// a lánc és a lángnyelves örvény – sötétre színezett festett csont, lila lángba burkolva, lila lángcsóvát húz.
{const qb1=qBone;qBone=function(x,y,r,s=1){const im=R17I.hexbone,fl=R17I.darkflame;if(!im)return qb1.apply(this,arguments);const w=118*s,h=w*im.height/im.width;
  if(Math.random()<.8)part({x:x+rnd(-10,10),y:y+rnd(-10,10),vx:rnd(-30,30),vy:-rnd(30,90),life:rnd(.3,.55),size:rnd(4,8),rgb:pick(['150,60,230','110,30,190','200,120,255'])});if(Math.random()<.4)part({x:x,y:y,vx:rnd(-20,20),vy:-rnd(20,60),life:rnd(.4,.7),size:rnd(12,20),grow:14,rgb:pick(['40,12,70','70,25,110']),add:false,shape:'dsmoke'});
  ctx.save();ctx.translate(x,y);
  if(fl){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.4;const fw=w*.55,fh=fw*fl.height/fl.width;ctx.drawImage(fl,-fw/2,-fh*.8,fw,fh);ctx.restore();}
  ctx.globalCompositeOperation='lighter';glow(0,0,w*.6,'150,60,240',.45);ctx.globalCompositeOperation='source-over';ctx.rotate(r);
  ctx.drawImage(tintSpr(im,'rgb(40,12,60)',.55)||im,-w/2,-h/2,w,h);
  ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.35;ctx.drawImage(tintSpr(im,'rgb(190,110,255)',1)||im,-w/2,-h/2,w,h);ctx.restore();};}

// =====================================================================================================
// Dobótőr (ia: „gagyi, látványosabb, élethűbb”): öt nagy, élethű acéltőr legyezőben, pörögve, elmosódó utóképpel,
// egymás után fúródnak az ellenfélbe (fémes szikra, rázkódás), remegve benne maradnak, a végén megvillannak és eltűnnek.
function r21Dagger(x,y,r,s=1,a=1){const im=R17I.dagger;ctx.save();ctx.globalAlpha*=a;ctx.translate(x,y);ctx.rotate(r);
  if(im){const w=64*s,h=w*im.height/im.width;ctx.drawImage(im,-w*.62,-h/2,w,h);ctx.restore();return;}
  ctx.scale(s,s);// penge: kétélű, középen vércsatorna, élfény
  const g=ctx.createLinearGradient(0,-9,0,9);g.addColorStop(0,'#f4f7fb');g.addColorStop(.42,'#c9d0dc');g.addColorStop(.5,'#8a93a3');g.addColorStop(.58,'#c3cad6');g.addColorStop(1,'#6b7383');
  ctx.fillStyle=g;ctx.strokeStyle='#2a303b';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(62,0);ctx.lineTo(10,-9);ctx.lineTo(4,-8);ctx.lineTo(4,8);ctx.lineTo(10,9);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.strokeStyle='rgba(70,78,92,.8)';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(46,0);ctx.stroke();ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(12,-7);ctx.lineTo(58,-1);ctx.stroke();
  // arany keresztvas, bőrrel tekert markolat, gömb
  const gg=ctx.createLinearGradient(0,-16,0,16);gg.addColorStop(0,'#ffe9a0');gg.addColorStop(.5,'#c8962e');gg.addColorStop(1,'#7a5214');ctx.fillStyle=gg;ctx.strokeStyle='#4a300a';
  ctx.beginPath();ctx.moveTo(4,-16);ctx.quadraticCurveTo(-2,0,4,16);ctx.lineTo(-2,15);ctx.quadraticCurveTo(-7,0,-2,-15);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle='#4a2c16';ctx.fillRect(-26,-5,24,10);ctx.strokeStyle='#2a170a';ctx.lineWidth=1.2;for(let i=-24;i<-2;i+=5){ctx.beginPath();ctx.moveTo(i,-5);ctx.lineTo(i+4,5);ctx.stroke();}
  ctx.fillStyle=gg;ctx.beginPath();ctx.arc(-30,0,6.5,0,6.29);ctx.fill();ctx.strokeStyle='#4a300a';ctx.stroke();ctx.fillStyle='rgba(255,255,255,.6)';ctx.beginPath();ctx.arc(-32,-2,2,0,6.29);ctx.fill();ctx.restore();}
A.throwKnife=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,220,.12);sfx('whoosh');
  const tw=t.w*t.scale,th=t.h*t.scale,T={x:cx(t),y:midY(t)},K=[];
  const stuck=[];R18E({update(){return stuck.some(s=>s.a>0);},draw(){const now=r21Now();for(const s of stuck){if(s.a<=0)continue;const wob=Math.max(0,1-(now-s.t0)/.45)*Math.sin((now-s.t0)*60)*.12;
    r21Dagger(s.x,s.y,s.r+wob,2.1,s.a);if(s.glint>0){ctx.save();ctx.globalCompositeOperation='lighter';glow(s.x-Math.cos(s.r)*20,s.y-Math.sin(s.r)*20,40,'255,255,255',.8*s.glint);ctx.restore();}}}});
  bodyStrike(u,150,-.18);
  await Promise.all([-2,-1,0,1,2].map((i,n)=>wait(n*85).then(()=>{const h=handPos(u),tx=T.x-tw*.15+rnd(-10,10),ty=T.y+i*th*.13;sfx('whoosh');
    return flyObj({x:h.x,y:h.y},{x:tx,y:ty},300,(x,y,r)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,46,'220,230,255',.35);ctx.restore();
      // pörgő tőr elmosódó utóképekkel (a pörgés szögéből)
      for(let k=3;k>=1;k--)r21Dagger(x-(tx-h.x)*.012*k,y-(ty-h.y)*.012*k,r-k*.45,2.1,.16);r21Dagger(x,y,r,2.1,1);},{spin:26,arc:40+i*18,trail:['230,235,255','255,255,255'],trailShape:'streak'}).then(()=>{
      sfx('hit');sfx('slash');sparks(tx,ty,['255,255,255','210,220,235','255,210,130'],22,460);t.hurt=.35;shake(7);hitStop(45);
      for(let q=0;q<4;q++)part({x:tx,y:ty,vx:rnd(-80,200),vy:rnd(-160,40),g:600,life:.4,size:rnd(2,3.5),rgb:'255,240,200'});
      stuck.push({x:tx-8,y:ty,r:Math.PI+rnd(-.25,.25)+Math.atan2(ty-h.y,tx-h.x)-Math.PI,a:1,t0:r21Now(),glint:0});});})));
  flash('235,240,255',.25,.12);hitStop(80);shake(12);hit(u,t,sk);toss(t,26,260);
  await wait(300);for(const s of stuck)tween(220,k=>s.glint=Math.sin(k*Math.PI));sfx('slash');await wait(260);for(const s of stuck)tween(300,k=>s.a=1-k);await wait(320);await bodySettle(u);}finally{rel();}};

// =====================================================================================================
// Tűzbomba (ia: „gagyi, látványosabb, élethűbb”): nagy, szegecselt vasbomba sercegő, valódi lángtextúrás kanóccal,
// ívben repül, a földre pattan, a kanóc végigég, majd hatalmas robbanás: villanás, valósághű tűzgömb- és
// füsttextúrák, kirepülő égő törmelék füstcsíkkal, földön végigfutó porhullám, minden ellenségen lángok csapnak fel,
// a végén kormos égésfolt és felszálló gomolyfüst. (Tűzoszlop és vékony gyűrű nincs.)
function r21Bomb(x,y,r,rot){const im=R17I.firebomb;if(im){ctx.save();ctx.translate(x,y);ctx.rotate(rot);const w=r*2.1,h=w*im.height/im.width;ctx.drawImage(im,-w/2,-h*.58,w,h);ctx.restore();return;}
  ctx.save();ctx.translate(x,y);ctx.rotate(rot);
  const g=ctx.createRadialGradient(-r*.38,-r*.4,r*.08,0,0,r);g.addColorStop(0,'#8a8c98');g.addColorStop(.35,'#3a3b45');g.addColorStop(.8,'#17171d');g.addColorStop(1,'#0b0b0f');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,6.29);ctx.fill();
  // vaspántok szegecsekkel
  ctx.strokeStyle='#2b2620';ctx.lineWidth=r*.16;ctx.beginPath();ctx.ellipse(0,0,r*.98,r*.3,0,0,6.29);ctx.stroke();ctx.strokeStyle='#5a4a35';ctx.lineWidth=r*.06;ctx.beginPath();ctx.ellipse(0,-r*.02,r*.98,r*.28,0,3.3,6.1);ctx.stroke();
  ctx.fillStyle='#b08a4a';for(let i=0;i<7;i++){const a=Math.PI*(.12+i*.13);const px=Math.cos(a)*r*.95,py=Math.sin(a)*r*.29;ctx.beginPath();ctx.arc(px,py,r*.06,0,6.29);ctx.fill();}
  ctx.fillStyle='rgba(255,255,255,.28)';ctx.beginPath();ctx.ellipse(-r*.4,-r*.45,r*.26,r*.14,-.6,0,6.29);ctx.fill();
  // sárgaréz kupak és csavart kanóc
  const bg=ctx.createLinearGradient(-r*.3,0,r*.3,0);bg.addColorStop(0,'#6a4a14');bg.addColorStop(.5,'#e6c06a');bg.addColorStop(1,'#6a4a14');ctx.fillStyle=bg;ctx.fillRect(-r*.3,-r*1.2,r*.6,r*.32);ctx.strokeStyle='#3a2808';ctx.lineWidth=2;ctx.strokeRect(-r*.3,-r*1.2,r*.6,r*.32);
  ctx.strokeStyle='#7a5a32';ctx.lineWidth=r*.12;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(0,-r*1.2);ctx.bezierCurveTo(r*.15,-r*1.5,r*.45,-r*1.45,r*.55,-r*1.65);ctx.stroke();
  ctx.strokeStyle='rgba(40,25,10,.8)';ctx.lineWidth=r*.04;for(let i=0;i<4;i++){const q=i/4;ctx.beginPath();ctx.moveTo(r*.55*q-3,-r*(1.2+.42*q)-3);ctx.lineTo(r*.55*q+3,-r*(1.2+.42*q)+3);ctx.stroke();}ctx.restore();}
A.throwBomb=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);try{u.pose='attack';await bodyWind(u,240,.14);
  const {mx,gy}=grp(al),h=handPos(u),R=42,b={x:h.x,y:h.y,r:0,on:true,fuse:1};
  const fusePt=()=>{const c=Math.cos(b.r),s=Math.sin(b.r),pi=!!R17I.firebomb,fx=R*(pi?.27:.55),fy=-R*(pi?1.5:1.65);return {x:b.x+fx*c-fy*s,y:b.y+fx*s+fy*c};};
  R18E({update(){if(b.on){const f=fusePt();for(let i=0;i<3;i++)part({x:f.x,y:f.y,vx:rnd(-120,120),vy:rnd(-160,40),life:rnd(.15,.35),size:rnd(1.5,3.5),rgb:pick(['255,240,150','255,170,60','255,255,230'])});
      part({x:f.x,y:f.y,vx:rnd(-20,20),vy:-rnd(40,90),life:.35,size:rnd(10,18),grow:-12,rgb:'255,150,50',shape:'fire'});if(Math.random()<.5)part({x:f.x,y:f.y-6,vx:rnd(-15,15),vy:-rnd(30,70),life:.8,size:rnd(8,14),grow:20,rgb:'90,85,80',add:false,shape:'smoke'});}return b.on;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';const f=fusePt();glow(f.x,f.y,34,'255,170,60',.55);ctx.restore();r21Bomb(b.x,b.y,R,b.r);}});
  bodyStrike(u,170,-.2);sfx('whoosh');const x0=b.x,y0=b.y,lx=mx-30,ly=gy-R;
  await tween(620,q=>{b.x=x0+(lx-x0)*q;b.y=y0+(ly-y0)*q-Math.sin(q*Math.PI)*230;b.r=q*7;});
  // földre pattan, gurul, a kanóc végigég
  sfx('rock');shake(6);r21Dust(b.x,gy,5,120,[18,30]);await tween(260,q=>{b.x=lx+30*q;b.y=ly-Math.sin(q*Math.PI)*46;b.r=7+q*1.2;});sfx('fire');await wait(260);
  b.on=false;const ex=b.x,ey=gy-R*.6;
  // ROBBANÁS
  flash('255,235,190',.75,.2);hitStop(130);shake(26);sfx('boom');sfx('fire');rumble(1.2,7);
  const X={k:0,a:1,scorch:0};R18E({update(dt){X.k+=dt;return X.k<2.6;},draw(){const k=X.k;
    // égésfolt a földön
    if(k>.1){ctx.save();ctx.globalAlpha=Math.min(.8,(k-.1)*3)*Math.max(0,1-(k-1.9)/.7);ctx.translate(ex,gy+4);ctx.scale(1,.25);const g=ctx.createRadialGradient(0,0,10,0,0,230);g.addColorStop(0,'rgba(20,12,8,.95)');g.addColorStop(.6,'rgba(40,25,15,.6)');g.addColorStop(1,'rgba(40,25,15,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,230,0,6.29);ctx.fill();ctx.restore();}
    // izzó mag és hőfény
    if(k<.6){ctx.save();ctx.globalCompositeOperation='lighter';glow(ex,ey,120+520*k,'255,200,120',.95*(1-k/.6));glow(ex,ey,60+160*k,'255,255,235',1-k/.6);ctx.restore();}}});
  // tűzgömb: sok nagy, valósághű lángtextúra, felfelé gomolyodó gombafelhővel
  for(let i=0;i<46;i++){const a=rnd(0,6.28),v=rnd(80,520);part({x:ex+rnd(-20,20),y:ey+rnd(-20,20),vx:Math.cos(a)*v,vy:Math.sin(a)*v*.6-rnd(60,220),drag:2.4,life:rnd(.55,1.1),size:rnd(50,110),grow:60,rgb:pick(['255,170,60','255,120,40','255,210,110']),shape:'fire'});}
  for(let i=0;i<30;i++)part({x:ex+rnd(-80,80),y:ey+rnd(-40,20),vx:rnd(-160,160),vy:-rnd(80,260),drag:1.2,life:rnd(1.2,2.2),size:rnd(50,90),grow:50,rgb:pick(['60,52,48','90,80,72','40,36,34']),add:false,shape:'smoke'});
  // égő törmelék füstcsíkkal
  for(let i=0;i<22;i++){const p={x:ex,y:ey,vx:rnd(-520,520),vy:-rnd(250,650),t:0,life:rnd(.8,1.3)};R18E({update(dt){p.t+=dt;p.vy+=900*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.y>gy+10){p.y=gy+10;p.vy*=-.3;p.vx*=.6;}
      if(Math.random()<.8)part({x:p.x,y:p.y,vx:0,vy:-30,life:.45,size:rnd(8,14),grow:16,rgb:'80,72,66',add:false,shape:'smoke'});if(Math.random()<.6)part({x:p.x,y:p.y,vx:rnd(-20,20),vy:-rnd(20,60),life:.25,size:rnd(8,14),rgb:'255,160,60',shape:'fire'});return p.t<p.life;},
    draw(){ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,10,'255,180,80',.9);ctx.restore();ctx.fillStyle='#2a1a10';ctx.fillRect(p.x-3,p.y-3,6,6);}});}
  for(let i=0;i<40;i++){const a=rnd(0,6.28),v=rnd(300,800);part({x:ex,y:ey,vx:Math.cos(a)*v,vy:Math.sin(a)*v,drag:2.5,life:rnd(.3,.6),size:rnd(2,4),rgb:pick(['255,240,170','255,190,90'])});}
  // a földön végigfutó porhullám
  for(let i=0;i<24;i++){const dir=i%2?1:-1;part({x:ex+dir*rnd(10,40),y:gy,vx:dir*rnd(380,620),vy:-rnd(10,50),drag:2,life:rnd(.6,.9),size:rnd(30,50),grow:40,rgb:pick(['150,130,105','120,105,85']),add:false,shape:'smoke'});}
  // minden ellenség lángra kap
  for(const t of al){const x=cx(t),y=t.y+t.oy,w=t.w*t.scale;t.hurt=.7;hit(u,t,sk);toss(t,40,340);const F={t:0};R18E({update(dt){F.t+=dt;if(F.t<1.1&&t.alive)for(let n=0;n<2;n++)part({x:x+rnd(-w*.45,w*.45),y:y-rnd(0,t.h*t.scale*.6),vx:rnd(-20,20),vy:-rnd(60,160),life:rnd(.35,.6),size:rnd(18,34),grow:-10,rgb:pick(['255,150,50','255,110,30','255,200,90']),shape:'fire'});return F.t<1.1;}});}
  await wait(1100);await bodySettle(u);}finally{rel();}};

// a Levéltánc leírása az új (35. kör) változathoz
if(SK.mosspillow)SK.mosspillow.desc='Borotvaéles levelek folyama a bothegyből: körbetekeri az ellenséget, négyszer megvágja, aztán szétrobban.';

// védelem: ha a csata-sorszám túlfutott (pl. dupla „Tovább”), ne induljon nem létező csata (eddig JS-hiba, elakadás)
{const sb0=startBattle;startBattle=function(){try{const L=S.level||null;if(L&&L.battles&&!L.battles[S.battleIdx]){console.warn('startBattle: nincs több csata',S.battleIdx);return;}}catch(e){}return sb0.apply(this,arguments);};}
