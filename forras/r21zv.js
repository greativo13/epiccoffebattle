// ===== 64. kör: tesztlap-jelölések (17 beküldött, 8 hibás) – új festett képek: fx7-rosestem, fx7-runechain, fx7-runecircle, fx7-firestar =====

// ---- 1) Rózsaharapás („látszik, hogy az egy kígyó, ez így nagyon nem jó”): a nyak a festett tüskés rózsaszár (fx7-rosestem),
//    nem a kígyótest – a szár a rózsa szárától a fejig nyúlik, enyhén hullámzik
{const rc=A.roseCoil;A.roseCoil=async function(u,ts,sk){const ST=R17I.rosestem;if(!ST)return rc.apply(this,arguments);const dc=r21DrawCoil;
  r21DrawCoil=function(im,P,thick,a){if(P&&P.length<=30){
      // 66. kör: a festett szár a nyak ívét követi – a képet szeletekre vágva, minden szelet a saját szakaszán, elforgatva
      let L=0;const d=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y);d.push(L);}if(L<2)return;
      const h=Math.max(66,Math.min(120,thick*3.2)),W=ST.width,wob=Math.sin(performance.now()/140)*.04;ctx.save();ctx.globalAlpha*=a==null?1:a;
      for(let i=1;i<P.length;i++){const p0=P[i-1],p1=P[i],seg=d[i]-d[i-1];if(seg<.5)continue;const sx=W*d[i-1]/L,sw=Math.max(1,W*seg/L);
        ctx.save();ctx.translate(p0.x,p0.y);ctx.rotate(Math.atan2(p1.y-p0.y,p1.x-p0.x)+wob*Math.sin(i));ctx.drawImage(ST,sx,0,Math.min(sw+2,W-sx),ST.height,0,-h/2,seg+1.5,h);ctx.restore();}
      ctx.restore();return;}return dc.apply(this,arguments);};
  try{return await rc.apply(this,arguments);}finally{r21DrawCoil=dc;}};}

// ---- 2) Árnyékszegező nyíl („egyáltalán nem úgy néz ki, mint amit küldtem, és a sárga nyíl nem a játék stílusa”):
//    lila, sötét nyíl; a célpontot a képen látott módon festett rúnás láncok (fx7-runechain) kötik gúzsba – keresztben és
//    körben a testén –, a lábánál festett lila rúnakör (fx7-runecircle) izzik, és lila lángnyelvek csapnak fel körülötte
{const sp=A.shadowPin;A.shadowPin=async function(u,ts,sk){const A0=FX_IMG.jzarrow;let tint=null;try{if(A0&&A0.width){tint=r21Filt(A0,'grayscale(1) sepia(1) hue-rotate(230deg) saturate(4) brightness(.8)');FX_IMG.jzarrow=tint;}}catch(e){}
  try{return await sp.apply(this,arguments);}finally{if(A0)FX_IMG.jzarrow=A0;}};}
// 66–68. kör („a földből törjenek elő a láncok” → „gagyi, élethűbb, darabos, sötétebb, félelmetesebb”): a lába körül
// sötét kráter nyílik, fekete-lila festett lángnyelvek (fx7-darkflame) csapnak fel, a festett rúnás láncok kígyózva,
// simán kúsznak ki a földből és felcsavarodnak a testére, megfeszülnek, lerántják; az ellenfél elsötétül, időnként
// rángatózik a láncokban, sötét füst gomolyog körülötte, amíg a kábulat tart.
const r21E3=k=>1-Math.pow(1-Math.max(0,Math.min(1,k)),3);
function r21WavyChain(CH,P,hh){let L=0;const d=[0];for(let i=1;i<P.length;i++){L+=Math.hypot(P[i].x-P[i-1].x,P[i].y-P[i-1].y);d.push(L);}if(L<2)return;const W=CH.width;
  for(let i=1;i<P.length;i++){const p0=P[i-1],p1=P[i],seg=d[i]-d[i-1];if(seg<.5)continue;const sx=W*d[i-1]/L,sw=Math.max(1,W*seg/L);
    ctx.save();ctx.translate(p0.x,p0.y);ctx.rotate(Math.atan2(p1.y-p0.y,p1.x-p0.x));ctx.drawImage(CH,sx,0,Math.min(sw+2,W-sx),CH.height,0,-hh/2,seg+1.5,hh);ctx.restore();}}
{const de=drawEntity;drawEntity=function(e){if(!e||!e._r21pin)return de.apply(this,arguments);const P=e._r21pin;if(!e.alive||!e.st||!e.st.stun){e._r21pin=null;return de.apply(this,arguments);}
  const CH=R17I.runechain,RC=R17I.runecircle,DF=R17I.darkflame,CR=R17I.crater;if(!CH)return de.apply(this,arguments);
  const t=(performance.now()-P.t0)/1000,feet=e.y+e.oy+4,H2=e.h*e.scale,W2=e.w*e.scale,x=cx(e),hh=Math.max(24,Math.min(42,W2*.18)),DC=r21Filt(R17I.teacloud,'grayscale(1) brightness(.22) sepia(1) hue-rotate(225deg) saturate(2.5)');
  if(!P.ch){P.ch=[];for(let i=0;i<4;i++){const sd=i%2?1:-1,f=Math.floor(i/2);P.ch.push({ax:x+sd*(W2*(.7+.3*f)),ay:feet+rnd(-4,10),bx:x-sd*W2*(.2+.1*f),by:feet-H2*(.3+.21*f),d:.18+i*.08,ph:rnd(0,6),burst:false});}
    P.fl=[];for(let i=0;i<7;i++)P.fl.push({dx:(i/6-.5)*W2*1.9+rnd(-12,12),s:rnd(.75,1.25),ph:rnd(0,6),d:.05+Math.abs(i-3)*.05});}
  const back=[],front=[];
  // sötét kráter + rúnakör (nem világít, hanem sötétlik)
  try{if(CR){ctx.save();ctx.globalAlpha=r21E3(t/.35)*.95;try{ctx.filter='grayscale(1) brightness(.35) sepia(1) hue-rotate(225deg) saturate(2.2)';}catch(err){}r17Draw(CR,x,feet+12,Math.max(240,W2*2.8)*(.6+.4*r21E3(t/.35)),{sy:.42});ctx.restore();}
    if(RC){const R=Math.max(160,W2*2)*r21E3(t/.5);ctx.save();ctx.globalAlpha=.75+.15*Math.sin(t*4);ctx.translate(x,feet);ctx.rotate(t*.25);ctx.scale(1,.3);ctx.drawImage(RC,-R/2,-R/2,R,R);ctx.restore();}}catch(err){}
  // fekete-lila lángnyelvek a repedésből: a hátsók a test mögött, az elülsők előtte
  const flame=(f,i)=>{if(!DF)return;const k=r21E3((t-f.d)/.35);if(k<=0)return;const fl=1+.12*Math.sin(t*9+f.ph)+.06*Math.sin(t*23+f.ph),h=H2*(.55+.25*f.s)*k*(t>1.2?.8:1)*fl,w=h*DF.width/DF.height*(1-.08*Math.sin(t*7+f.ph));
    ctx.save();ctx.globalAlpha=.92*k;ctx.translate(x+f.dx+Math.sin(t*3+f.ph)*4,feet+8);ctx.scale(i%2?-1:1,1);ctx.drawImage(DF,-w/2,-h,w,h);ctx.restore();};
  try{P.fl.forEach((f,i)=>{if(i%2)flame(f,i);});}catch(err){}
  // lerántás + rángatózás a láncokban
  const pull=Math.max(0,Math.min(1,(t-.8)/.15))*(1-Math.max(0,Math.min(1,(t-1.15)/.35))*.55),cyc=(t-1.4)%1.3,tw=t>1.4&&cyc<.22?Math.sin(cyc*90)*4*(1-cyc/.22):0,jerk=(t>.8&&t<1?Math.sin((t-.8)*60)*4:0)+tw;
  e._r21pin=null;let r;try{ctx.save();ctx.translate(x,feet);ctx.scale(1,1-.08*pull);ctx.translate(-x+jerk,-feet+6*pull);try{ctx.filter=`brightness(${1-.38*r21E3(t/.6)}) saturate(${1-.25*r21E3(t/.6)})`;}catch(err){}r=de.apply(this,arguments);ctx.restore();}finally{e._r21pin=P;}
  try{P.fl.forEach((f,i)=>{if(!(i%2))flame(f,i);});
    for(const c of P.ch){const k=r21E3((t-c.d)/.45);if(k<=0)continue;
      if(!c.burst){c.burst=true;shake(6);try{sfx('chain');}catch(err){}const CL=window.R21_CLODS&&R21_CLODS.length?R21_CLODS:[R17I.clods];for(let n=0;n<6;n++)r21PD(CL[n%CL.length],c.ax,c.ay,{vx:rnd(-180,180),vy:-rnd(160,380),g:950,size:rnd(14,26),life:.8});
        if(DC)for(let n=0;n<2;n++)r21PD(DC,c.ax+rnd(-20,20),c.ay-10,{vx:rnd(-40,40),vy:-rnd(40,110),size:rnd(70,110),grow:60,life:1,vr:rnd(-.5,.5),a:.8});}
      // a lánc kígyózva kúszik fel: hullámzik, amíg ki nem feszül (pull), akkor egyenesbe ránt
      const amp=(1-Math.max(0,Math.min(1,(t-.75)/.2)))*Math.max(14,W2*.12),ex=c.ax+(c.bx-c.ax)*1.18*k,ey=c.ay+(c.by-c.ay)*1.18*k-(1-k)*20,N=18,Q=[];
      const nx=-(ey-c.ay),ny=ex-c.ax,nl=Math.hypot(nx,ny)||1;for(let q=0;q<=N;q++){const u=q/N,w=Math.sin(u*Math.PI*2.4-t*7+c.ph)*amp*Math.sin(u*Math.PI)*(.5+.5*(1-k));Q.push({x:c.ax+(ex-c.ax)*u+nx/nl*w,y:c.ay+(ey-c.ay)*u+ny/nl*w});}
      r21WavyChain(CH,Q,hh);}
    const kw=r21E3((t-.7)/.3);if(kw>0)for(const [fy,w] of [[.4,1.2]]){const Q=[];for(let q=0;q<=12;q++){const u=q/12;Q.push({x:x-W2*w/2*kw+W2*w*kw*u,y:feet-H2*fy+Math.sin(u*Math.PI)*8});}r21WavyChain(CH,Q,hh);}
    if(DC&&Math.random()<.06)r21PD(DC,x+rnd(-W2*.8,W2*.8),feet-rnd(0,20),{vx:rnd(-15,15),vy:-rnd(30,80),size:rnd(80,130),grow:50,life:1.6,vr:rnd(-.3,.3),a:.65});}catch(err){}return r;};}

// ---- 3) Fejsze-hajítás („nem is hasonlít a képre, amit küldtem, ez így nagyon gagyi”): a kőcsillag helyén a festett,
//    csavart karú tűzcsillag (fx7-firestar, a felhasználó képe alapján) pörög, izzik és repül
A.axeThrow=async(u,ts,sk)=>{const t=ts&&ts[0];if(!t||!t.alive)return;const FS=R17I.firestar,CL=window.R21_CLODS&&R21_CLODS.length?R21_CLODS:[R17I.clods],GB=r21Filt(R17I.goldburst,'hue-rotate(-28deg) saturate(1.5)');
  const st0={on:true};R18E({update(){if(st0.on)u.pose='cast';return st0.on;}});try{if(typeof r21NoAxe==='function')r21NoAxe(true);}catch(e){}
  try{const hand=()=>handPos(u),gy=u.y+u.oy,N=9,S5=[];for(let i=0;i<N;i++)S5.push({x:cx(u)+rnd(-240,240),y:gy+rnd(-4,8),s:rnd(30,46),r:rnd(0,6),I:CL[i%CL.length]});
  const C={x:0,y:0,k:0,spin:0,glow:0,fire:0,a:1,fly:false,stoneA:1};
  R18E({update(dt){C.spin+=dt*(2+16*Math.max(C.glow,C.fire));return C.a>0;},draw(){const c=C.fly?{x:C.x,y:C.y}:{x:hand().x,y:hand().y-40};
    if(C.stoneA>0)for(let i=0;i<N;i++){const s=S5[i];if(!s.I)continue;const ang=C.spin+i*2*Math.PI/N,rr=40+20*(i%2),tx=c.x+Math.cos(ang)*rr*(1-C.fire),ty=c.y+Math.sin(ang)*rr*(1-C.fire),x=s.x+(tx-s.x)*C.k,y=s.y+(ty-s.y)*C.k-Math.sin(C.k*Math.PI)*80;
      ctx.save();ctx.globalAlpha=C.a*C.stoneA;ctx.translate(x,y);ctx.rotate(s.r+C.spin);try{if(C.glow>0)ctx.filter=`sepia(${C.glow}) saturate(${1+4*C.glow}) hue-rotate(-15deg) brightness(${1+.7*C.glow})`;}catch(e){}ctx.drawImage(s.I,-s.s/2,-s.s/2,s.s,s.s*s.I.height/s.I.width);ctx.restore();}
    if(FS&&C.fire>0){const R=210*C.fire;ctx.save();ctx.globalCompositeOperation='lighter';glow(c.x,c.y,R*.8,'255,120,30',.55*C.a);ctx.globalAlpha=C.a;ctx.translate(c.x,c.y);ctx.rotate(C.spin);ctx.drawImage(FS,-R/2,-R/2,R,R);ctx.restore();}}});
  sfx('rock');rumble&&rumble(.6,6);await tween(650,k=>{C.k=easeIO(k);});sfx('fire');await tween(380,k=>{C.glow=k;});
  // a kövek összeolvadnak, és a festett tűzcsillag lobban fel belőlük
  sfx('fire');flash('255,170,80',.2,.08);await tween(380,k=>{C.fire=eOutBack(k);C.stoneA=1-k;});
  const h0=hand(),p0={x:h0.x,y:h0.y-40},p2={x:cx(t),y:midY(t)},p1={x:(p0.x+p2.x)/2,y:Math.min(p0.y,p2.y)-170},Q=(k,a,b,c)=>(1-k)*(1-k)*a+2*(1-k)*k*b+k*k*c;
  await bodyWind(u,200,.14);sfx('whoosh');await bodyStrike(u,120,-.22);C.fly=true;
  await tween(520,k=>{C.x=Q(k,p0.x,p1.x,p2.x);C.y=Q(k,p0.y,p1.y,p2.y);for(let i=0;i<2;i++)part({x:C.x+rnd(-20,20),y:C.y+rnd(-20,20),vx:rnd(-80,80),vy:rnd(-80,40),life:.45,size:rnd(4,9),rgb:pick(['255,170,40','255,90,20','255,230,140'])});});
  sfx('boom');sfx('fire');shake(24);hitStop(110);flash('255,190,110',.4,.12);if(GB){const B={k:0};R18E({update(){return B.k<1;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';r17Draw(GB,p2.x,p2.y,300*(.4+B.k),{a:1-B.k});ctx.restore();}});tween(450,k=>{B.k=k;});}
  t.hurt=.6;toss(t,50,360);hit(u,t,sk);await wait(160);
  await tween(520,k=>{const q=1-k;C.x=Q(q,p0.x,p1.x,p2.x);C.y=Q(q,p0.y,p1.y,p2.y);});
  await tween(300,k=>{C.a=1-k;});await bodySettle(u);}finally{st0.on=false;try{if(typeof r21NoAxe==='function')r21NoAxe(false);}catch(e){}u.pose='idle';}};

// ---- 4) Bambuszfüggöny („amikor belövöm a földbe, nem kell kiállnia belőle”): a nyíl becsapódáskor rögtön eltűnik a
//    földben (föld- és kőfröccs), nem áll ki
{const bc=A.bambooCurtain;A.bambooCurtain=async function(){const BS=R17I.bamboospear,proto=CanvasRenderingContext2D.prototype,orig=proto.drawImage;let on=true;
  // a földbe állt nyíl rajza (L=190 a 63. körben) kimarad; a repülő nyíl (fxFly) más képet használ
  proto.drawImage=function(img,...a){if(on&&img===BS&&a.length===4&&Math.abs(a[2]-190)<1)return;return orig.call(this,img,...a);};
  try{return await bc.apply(this,arguments);}finally{on=false;proto.drawImage=orig;}};}

// ---- 5) Sárkánynyíl („Jázmin nem is fordul felfelé”): a lövés előtt Jázmin hátradől és felfelé emeli az íjat (a teste
//    az ég felé fordul), úgy lő; utána visszaáll
{const sn=R16P['Sárkánynyíl'];R16P['Sárkánynyíl']=async function(A1,B1){const mk=A1.type==='monk'?A1:B1;const l0=mk.lean||0;let up=true;
  const ba=bigArrow;bigArrow=function(from,to,o){if(up&&to&&to.y<0){up=false;const b=bowPos(mk);return tween(220,k=>{mk.lean=l0-.55*easeIO(k);}).then(()=>ba.call(this,bowPos(mk),{x:b.x+120,y:-140},o)).then(r=>{tween(300,k=>{mk.lean=l0-.55*(1-k);});return r;});}return ba.apply(this,arguments);};
  try{return await sn.apply(this,arguments);}finally{bigArrow=ba;mk.lean=l0;}};}

// ---- 6) Kőbőr – kőbörtön („a kövek stílusa eltér a játék stílusától”): a burok csak a festett, mohás kődarabokból
//    (fx7-clods, darabjaira vágva) áll – a fakó szürke kavics-kép nem kerül bele
(function(){let n=0;const iv=setInterval(()=>{n++;const CL=R17I.clods;if(CL&&CL.width&&!window.R21_CLODS){try{const c=document.createElement('canvas');c.width=CL.width;c.height=CL.height;const g=c.getContext('2d');g.drawImage(CL,0,0);const d=g.getImageData(0,0,c.width,c.height).data,W2=c.width,H2=c.height,seen=new Uint8Array(W2*H2),out=[];
    for(let i=0;i<W2*H2;i++){if(seen[i]||d[i*4+3]<40)continue;const st=[i];seen[i]=1;let x0=W2,y0=H2,x1=0,y1=0,cnt=0;while(st.length){const j=st.pop();cnt++;const x=j%W2,y=(j/W2)|0;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;for(const q of [j-1,j+1,j-W2,j+W2]){if(q<0||q>=W2*H2||Math.abs((q%W2)-x)>1)continue;if(!seen[q]&&d[q*4+3]>=40){seen[q]=1;st.push(q);}}}
      if(cnt>150){const p=document.createElement('canvas');p.width=x1-x0+1;p.height=y1-y0+1;p.getContext('2d').drawImage(c,x0,y0,p.width,p.height,0,0,p.width,p.height);out.push(p);}}
    window.R21_CLODS=out.length?out:[CL];}catch(e){window.R21_CLODS=[CL];}clearInterval(iv);}if(n>80)clearInterval(iv);},400);})();
{const de=drawEntity;drawEntity=function(e){if(e&&e._r21stone&&e._r21shell&&e._r21shell.v2&&!e._r21shell.v3&&window.R21_CLODS){for(const q of e._r21shell.p)q.I=pick(R21_CLODS);e._r21shell.v3=true;}return de.apply(this,arguments);};}
