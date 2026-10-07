// ===== 5. kör: a hősök képességei a játékos visszajelzései alapján =====
// ---- képtisztítás: a fehér, rojtos szélek (pl. Jázmin íjhúrja körül) eltűnnek; Lili szárnyai áttetszők lesznek
function defringe(c,th=200,passes=2){if(!c||!c.getContext||c.__defr)return;c.__defr=1;try{const g=c.getContext('2d'),w=c.width,h=c.height,d=g.getImageData(0,0,w,h),p=d.data;
  for(let ps=0;ps<passes;ps++){const kill=[];for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;if(p[i*4+3]===0)continue;const r=p[i*4],gg=p[i*4+1],b=p[i*4+2];if(Math.min(r,gg,b)<th&&p[i*4+3]>120)continue;
      if(p[(i-1)*4+3]<20||p[(i+1)*4+3]<20||p[(i-w)*4+3]<20||p[(i+w)*4+3]<20)kill.push(i);}for(const i of kill)p[i*4+3]=0;}
  // a fehér foltok, amelyek az átlátszó háttérhez érnek (kivágási maradék)
  const wh=i=>p[i*4+3]>0&&Math.min(p[i*4],p[i*4+1],p[i*4+2])>=225,seen=new Uint8Array(w*h);
  for(let s=0;s<w*h;s++){if(seen[s]||!wh(s))continue;const comp=[s];seen[s]=1;let edge=0;for(let j=0;j<comp.length;j++){const z=comp[j],x=z%w;for(const n of [z-1,z+1,z-w,z+w]){if(n<0||n>=w*h||Math.abs(n%w-x)>1)continue;if(p[n*4+3]<20)edge++;if(seen[n]||!wh(n))continue;seen[n]=1;comp.push(n);}}
    if(edge>=5&&edge*3>=comp.length*.25)for(const z of comp)p[z*4+3]=0;}
  g.putImageData(d,0,0);}catch(e){}}
function fairyWings(c){if(!c||!c.getContext||c.__wings)return;c.__wings=1;try{const g=c.getContext('2d'),w=c.width,h=c.height,d=g.getImageData(0,0,w,h),p=d.data,seen=new Uint8Array(w*h);
  const pale=i=>{const r=p[i*4],gg=p[i*4+1],b=p[i*4+2];return p[i*4+3]>0&&r>=222&&gg>=210&&b>=165&&r-b<=95;};
  for(let s=0;s<w*h;s++){if(seen[s]||!pale(s))continue;const comp=[s];seen[s]=1;for(let j=0;j<comp.length;j++){const z=comp[j],x=z%w;for(const n of [z-1,z+1,z-w,z+w]){if(n<0||n>=w*h||seen[n]||Math.abs(n%w-x)>1||!pale(n))continue;seen[n]=1;comp.push(n);}}
    if(comp.length>=1500)for(const z of comp){p[z*4+3]=Math.min(p[z*4+3],150);p[z*4]=Math.min(255,p[z*4]*.96+6);p[z*4+1]=Math.min(255,p[z*4+1]*.98+8);p[z*4+2]=Math.min(255,p[z*4+2]+18);}
    else if(comp.length>=40&&comp.length<400){let x0=w,y0=h,x1=0,y1=0;for(const z of comp){const x=z%w,y=(z/w)|0;x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);}if(y1<h*.25)for(const z of comp)p[z*4+3]=0;}}   // a csáp hurkának fehér belseje
  g.putImageData(d,0,0);}catch(e){}}
{let tries=0;const iv=setInterval(()=>{tries++;let left=0;
  for(const k of ['monk-attack','monk','monk-cast','monk-palm','monk-sky','monk-power']){const c=ENEMY_SPR[k];if(c&&c.getContext)defringe(c);else if(k==='monk-attack')left++;}
  for(const k of ['fairy','fairy-cast','fairy-attack','fairy-hurt']){const c=ENEMY_SPR[k];if(c&&c.getContext){fairyWings(c);defringe(c,215,1);}else left++;}
  if(!left||tries>60)clearInterval(iv);},500);}

// ---- Járvány: a méreg 3 körig tart
SK.pandemic.status=['poison',1,3];SK.pandemic.desc=SK.pandemic.desc.replace(/5 körig/g,'3 körig');

// ---- Visszapattanó nyíl: villám elemű
SK.bouncearrow.elem='thunder';

// ---- Vudu baba: tűk repülnek ki, beleállnak az ellenségbe, és 3 körig minden kör végén egy tű kihúzódik és sebez
ONE_ROUND.delete('voodoo');
SK.voodoo.desc='Morgána tűket döf a vudu babába: a tűk kirepülnek, és beleállnak az ellenségbe. Sötét sebzés, majd 3 körön át minden kör végén egy tű kihúzódik és sebez (életereje 9%-a).';
const NEEDLE_SPOTS=[[-.16,-.24,-.55],[.1,-.02,-.3],[-.05,.22,-.12]];
function needleSpot(e,i){const s=NEEDLE_SPOTS[i%3],sh=shrinkOf(e),w=e.w*e.scale*sh,h=e.h*e.scale*sh,en=e.kind==='enemy';
  return {x:cx(e)+s[0]*w*(en?1:-1),y:midY(e)+s[1]*h,ang:en?Math.PI-s[2]:s[2]};}
function drawNeedle(x,y,ang,len=58,a=1,head='200,40,90'){if(a<=0)return;const tx=x+Math.cos(ang)*len,ty=y+Math.sin(ang)*len;ctx.save();ctx.globalAlpha=Math.min(1,a);ctx.lineCap='round';
  ctx.strokeStyle='rgba(30,20,40,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.stroke();
  const g=ctx.createLinearGradient(x,y,tx,ty);g.addColorStop(0,'#9aa0b4');g.addColorStop(.5,'#ffffff');g.addColorStop(1,'#c8cce0');ctx.strokeStyle=g;ctx.lineWidth=2.6;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(tx,ty);ctx.stroke();
  const hg=ctx.createRadialGradient(tx-3,ty-3,1,tx,ty,9);hg.addColorStop(0,'#fff');hg.addColorStop(.35,`rgb(${head})`);hg.addColorStop(1,'rgb(60,0,30)');ctx.fillStyle=hg;ctx.beginPath();ctx.arc(tx,ty,8,0,6.29);ctx.fill();
  ctx.globalCompositeOperation='lighter';glow(tx,ty,18,head,.35*a);ctx.restore();}
const NEEDLE_HEADS=['220,40,90','170,60,230','240,120,40'];
{const de5=drawEntity;drawEntity=function(e){de5(e);
  if(e.alive&&e.st&&e.st.voodoo&&e.alpha>.05){const n=Math.min(3,e.st.voodoo);for(let i=0;i<n;i++){const s=needleSpot(e,i);drawNeedle(s.x,s.y,s.ang,58,e.alpha,NEEDLE_HEADS[i]);}}
  if(e.possessed){if(!e.alive||!e.st||!e.st.atkUp)e.possessed=false;else{const x=cx(e),y=midY(e),hh=e.h*e.scale;ctx.save();ctx.globalCompositeOperation='lighter';
    glow(x,y,hh*.62*(1+.06*Math.sin(T*7)),'200,20,70',.32);glow(x,y-hh*.1,hh*.42,'150,40,230',.28);ctx.restore();
    if(Math.random()<.35)part({x:x+rnd(-hh*.25,hh*.25),y:e.y+e.oy-rnd(0,hh*.8),vx:rnd(-15,15),vy:rnd(-90,-40),life:rnd(.5,.9),size:rnd(2,4),rgb:pick(['230,30,80','170,60,240'])});}}};}
// a kör végén egy tű kihúzódik (a sebzést a régi vudu-kör számolja)
{const tsv=tickStatuses;tickStatuses=async function(){for(const e of [...S.enemies,...S.heroes]){if(!e.alive||!e.st.voodoo)continue;const i=Math.min(3,e.st.voodoo)-1,s=needleSpot(e,i),hd=NEEDLE_HEADS[i];
    effects.push({t:0,update(dt){this.t+=dt;return this.t<.6;},draw(){const k=this.t/.6,d=40+k*120;drawNeedle(s.x+Math.cos(s.ang)*d*.6,s.y+Math.sin(s.ang)*d*.6-k*30,s.ang+k*2,58,1-k,hd);}});}
  return tsv.apply(this,arguments);};}
A.voodooFx=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;u.pose='cast';await dimTo(.6,'24,0,34',220);const x=cx(u)+95,y=midY(u)-30;sfx('dark');
  fxSpin(tint('nova','200,120,255')||'nova',x,y,{size:330,life:3.2,s0:.2,s1:1,spin:.6,add:true,alpha:.7,out:.4});
  const doll={y:0,shk:0};fxSpin('voodoo',tt=>x+doll.shk*Math.sin(tt*90),tt=>y+Math.sin(tt*4)*5,{size:250,life:3.2,s0:.15,s1:1,out:.4});await wait(450);
  // a tűk megjelennek a baba fölött, és beleszúrnak
  const N=[0,1,2].map(i=>({x:x-50+i*50,y:y-150,ang:-Math.PI/2+(i-1)*.3,a:0,state:'hover'}));
  const fx={on:true,update(){return this.on;},draw(){for(const [i,n] of N.entries())if(n.state!=='gone')drawNeedle(n.x,n.y,n.ang,64,n.a,NEEDLE_HEADS[i]);}};effects.push(fx);
  await tween(250,k=>{for(const n of N)n.a=k;});
  for(const [i,n] of N.entries()){const sx=n.x,sy=n.y,ex=x-20+i*20,ey=y-10;await tween(110,k=>{n.x=sx+(ex-sx)*k;n.y=sy+(ey-sy)*k;});doll.shk=6;sfx('hit');shake(5);sparks(ex,ey,['230,120,255','255,255,255'],10,260);popLabel(u,'SZÚRD!','#e080c0');await wait(90);doll.shk=0;}
  await wait(200);
  // a tűk kirepülnek a babából az ellenségbe, és beleállnak
  const tx=cx(t),ty=midY(t);flash('200,120,255',.2,.12);
  for(const [i,n] of N.entries()){const s=needleSpot(t,i),sx=n.x,sy=n.y;sfx('slash');
    await tween(170,k=>{n.x=sx+(s.x-sx)*k;n.y=sy+(s.y-sy)*k-Math.sin(k*Math.PI)*40;n.ang=Math.atan2(sy-s.y,sx-s.x)*(1-k)+s.ang*k;if(Math.random()<.8)part({x:n.x,y:n.y,vx:rnd(-30,30),vy:rnd(-30,30),life:.3,size:3,rgb:NEEDLE_HEADS[i]});});
    n.x=s.x;n.y=s.y;n.ang=s.ang;t.hurt=.25;shake(6);hitStop(40);sparks(s.x,s.y,['230,120,255','255,255,255'],12,300);}
  await wait(150);flash('200,120,255',.3,.15);shake(8);hit(u,t,sk);for(const n of N)n.state=t.st&&t.st.voodoo?'gone':'hover';
  if(N[0].state!=='gone')await tween(400,k=>{for(const n of N)n.a=1-k;});fx.on=false;
  await wait(700);u.pose='idle';await dimTo(0,null,280);};

// ---- Gyógyítás: két ragyogó, zöld kéz öleli körbe a társat, és meggyógyítja
A.heal=async(u,ts,sk)=>{const t=ts[0];if(!t)return;await castPose(u,'120,255,150',380);sfx('heal');
  const im=FXK(tint('jzpalm','140,255,170')||'jzpalm'),hh=Math.max(150,t.h*t.scale*1.05),c={x:cx(t),y:midY(t)},H={k:0,a:0};
  effects.push({update(){return H.a>0||!H.done;},draw(){if(H.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';glow(c.x,c.y,hh*.75,'120,255,150',.45*H.a*H.k);
      if(im){const sz=hh*1.05,off=hh*(1.15-.6*H.k);for(const sd of [-1,1]){ctx.save();ctx.globalAlpha=H.a*.9;ctx.translate(c.x+sd*off,c.y+hh*.08);ctx.rotate(sd*(.55-.25*H.k));ctx.scale(-sd,1);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}}
      ctx.restore();}});
  await tween(450,k=>{H.a=Math.min(1,k*2);H.k=easeIO(k);});
  effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<2;i++){const a=this.t*9+i*Math.PI;part({x:c.x+Math.cos(a)*hh*.3,y:c.y+hh*.35-this.t*hh*.9,vx:0,vy:-40,life:.6,size:rnd(2.5,4.5),rgb:pick(['140,255,170','255,255,200','190,255,160']),shape:'star'});}return this.t<.8;},draw(){}});
  await wait(320);hit(u,t,sk);sparkUp(t,'160,255,180',16);await wait(450);H.done=true;await tween(350,k=>{H.a=1-k;});H.a=0;u.pose='idle';};

// ---- Ítélet fénye: villám nélkül – égből lecsapó fényoszlop és fénykard
function lightPillar(x,gy,w=90,life=.8){effects.push({t:0,update(dt){this.t+=dt;if(Math.random()<.7)part({x:x+rnd(-w*.4,w*.4),y:rnd(0,gy),vx:0,vy:rnd(-80,-20),life:.5,size:rnd(2,4),rgb:pick(['255,250,210','255,230,150']),shape:'star'});return this.t<life;},
  draw(){const k=this.t/life,a=k<.15?k/.15:1-(k-.15)/.85,ww=w*(1-k*.4);ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createLinearGradient(x-ww,0,x+ww,0);g.addColorStop(0,'rgba(255,240,180,0)');g.addColorStop(.5,`rgba(255,248,220,${.85*a})`);g.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=g;ctx.fillRect(x-ww,-20,ww*2,gy+20);
    ctx.fillStyle=`rgba(255,255,255,${.8*a})`;ctx.fillRect(x-ww*.12,-20,ww*.24,gy+20);ctx.save();ctx.translate(x,gy);ctx.scale(1,.25);glow(0,0,ww*1.6,'255,240,190',.8*a);ctx.restore();ctx.restore();}});}
A.judgement=async(u,ts,sk)=>{const {al}=grp(ts);if(!al.length)return;await dimTo(.7,'30,24,0',260);await castPose(u,'255,245,170',520);flash('255,245,190',.3,.3);sfx('holy');
  const all=[];for(const t of al){const x=cx(t),B=bigOf(t)*1.7,gy=t.y+t.oy;lightPillar(x,gy,Math.max(70,t.w*t.scale*.6),1.1);
    all.push(wait(160).then(()=>fxFly('sword',x,-B,x,gy-B*.42,230,{size:B,norot:true,ease:true})).then(()=>{fxSpin('sword',x,gy-B*.42,{size:B,life:.75,s0:1,s1:1,in:.01,out:.4});
      fxImage('holy',x,midY(t),{size:bigOf(t)*1.3,life:.6});flash('255,250,210',.4,.15);shake(12);hitStop(50);sparks(x,gy,['255,245,170','255,255,255'],22,460);hit(u,t,sk);}));await wait(230);}
  await Promise.all(all);u.pose='idle';await wait(850);await dimTo(0,null,300);};

// ---- Álomcsillagok: éjszaka lesz, feljön a holdsarló, hullócsillagok szállnak az ellenségekre, és csillagpor-örvény altatja el őket
A.sleepStars=async(u,ts,sk)=>{const {al,mx}=grp(ts);if(!al.length)return;await dimTo(.7,'8,6,40',300);await castPose(u,'190,170,255',360);sfx('holy');
  const M={x:Math.min(W-120,Math.max(260,mx)),y:95,a:0,t:0};effects.push({update(dt){M.t+=dt;return M.a>0||!M.done;},draw(){if(M.a<=0)return;ctx.save();ctx.globalAlpha=M.a;
    for(let i=0;i<50;i++){const sx=(i*137)%W,sy=(i*71)%300;ctx.fillStyle=`rgba(255,255,255,${.6*(.5+.5*Math.sin(M.t*4+i))})`;ctx.fillRect(sx,sy,2,2);}
    ctx.globalCompositeOperation='lighter';glow(M.x,M.y,160,'170,160,255',.5);glow(M.x,M.y,70,'255,250,220',.5);ctx.globalCompositeOperation='source-over';
    const R=52,d=R*.5,r=Math.hypot(d,R);ctx.beginPath();ctx.arc(M.x,M.y,R,-Math.PI/2,Math.PI/2,true);ctx.arc(M.x+d,M.y,r,Math.atan2(R,-d),Math.atan2(-R,-d)+Math.PI*2,false);ctx.closePath();
    const mg=ctx.createLinearGradient(M.x-R,M.y-R,M.x,M.y+R);mg.addColorStop(0,'#fffbe8');mg.addColorStop(1,'#ffe39a');ctx.fillStyle=mg;ctx.fill();ctx.restore();}});
  await tween(500,k=>{M.a=k;});u.pose='attack';for(let i=0;i<3;i++){wandTrail(u,pick([WAND_GOLD,'190,170,255']),12);await wait(80);}
  // hullócsillagok a holdtól az ellenségekre
  const shots=[];for(const t of al)for(let j=0;j<3;j++)shots.push(wait(j*140+rnd(0,80)).then(()=>fxFly('star',M.x+rnd(-30,30),M.y+rnd(-20,20),cx(t)+rnd(-30,30),midY(t)+rnd(-30,30),380,{size:110,base:Math.PI/4,hx:.21,hy:.21,trail:[WAND_GOLD,'190,170,255','255,255,255']})).then(()=>{sparks(cx(t),midY(t),[WAND_GOLD,'190,170,255','255,255,255'],10,260);}));
  await Promise.all(shots);sfx('heal');
  // csillagpor-örvény minden ellenség körül
  for(const t of al){const x=cx(t),y=midY(t),r0=Math.max(60,t.w*t.scale*.6);effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<3;i++){const a=this.t*7+i*2.1,r=r0*(1-this.t*.5);part({x:x+Math.cos(a)*r,y:y-40+this.t*90+Math.sin(a)*r*.35,vx:0,vy:20,life:.5,size:rnd(3,6),rgb:pick([WAND_GOLD,'190,170,255','255,255,255']),shape:'star'});}return this.t<1;},
    draw(){const a=Math.sin(Math.min(1,this.t)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,r0*1.3,'150,130,255',.35*a);ctx.restore();}});}
  await wait(800);for(const t of al){hit(u,t,sk);for(let i=0;i<3;i++)part({x:cx(t)+10+i*14,y:topY(t)-10,vx:20,vy:-50-i*10,life:1.2,size:7,rgb:'220,210,255',shape:'star'});}
  await wait(600);M.done=true;await tween(400,k=>{M.a=1-k;});M.a=0;u.pose='idle';await dimTo(0,null,250);};

// ---- Pálcakoppintás: Lili a helyéről int a pálcájával, zöld tündérpor hullik az ellenségre, és zöld aura villan fel rajta
A.wandbonk=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;u.pose='cast';const G='120,255,140',x=cx(t),y=midY(t),top=topY(t);sfx('holy');
  for(let i=0;i<3;i++){wandTrail(u,pick([G,WAND_GOLD]),10);await wait(70);}
  const h=handPos(u);for(let i=0;i<14;i++)part({x:h.x,y:h.y,vx:(x-h.x)/.5+rnd(-60,60),vy:(top-90-h.y)/.5+rnd(-60,60),life:.5,size:rnd(2,4),rgb:pick([G,WAND_GOLD]),shape:'star'});
  await wait(420);
  // a por felhőként gyűlik a feje fölött, majd lassan leszáll
  effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<5;i++)part({x:x+rnd(-70,70),y:top-80+rnd(-25,25),vx:rnd(-20,20),vy:rnd(90,190),drag:.5,life:rnd(.7,1.1),size:rnd(2,5),rgb:pick([G,'190,255,170','255,255,220']),shape:pick(['star','dot'])});return this.t<.8;},
    draw(){const a=Math.sin(Math.min(1,this.t/.8)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(x,top-80);ctx.scale(1,.4);glow(0,0,110,G,.45*a);ctx.restore();}});
  await wait(650);sfx('heal');
  // zöld aura felvillan
  const hh=t.h*t.scale;effects.push({t:0,update(dt){this.t+=dt;return this.t<.7;},draw(){const k=this.t/.7,a=k<.2?k/.2:1-(k-.2)/.8;ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,hh*.75*(1+k*.2),G,.75*a);glow(x,y,hh*.4,'230,255,220',.5*a);ctx.restore();}});
  for(let i=0;i<16;i++)part({x:x+rnd(-40,40),y:t.y+t.oy-rnd(0,hh),vx:rnd(-20,20),vy:rnd(-150,-60),life:rnd(.5,.9),size:rnd(2,5),rgb:pick([G,'255,255,220']),shape:'star'});
  flash('180,255,180',.2,.12);shake(6);hit(u,t,sk);await wait(500);u.pose='idle';};

// ---- Hajnalpír: a nap a horizonton kel, a sugarai balról jobbra félkörben sütnek fel, végül a fény az ellenségekre esik
A.dawnGlow=async(u,ts,sk)=>{const {al}=grp(ts);if(!al.length)return;await castPose(u,'255,190,220',300);sfx('holy');const hz=H*.58,sx=W*.3;
  const d={night:0,rise:0,day:0,fan:-1,t:0,a:1,beams:[]};effects.push({update(dt){d.t+=dt;return d.a>0;},draw(){ctx.save();ctx.globalAlpha=d.a;
    ctx.fillStyle=`rgba(8,10,40,${.75*d.night*(1-d.day*.8)})`;ctx.fillRect(0,0,W,H);
    if(d.night>0&&d.day<1)for(let i=0;i<60;i++){const x=(i*97)%W,y=(i*53)%(hz-40);ctx.fillStyle=`rgba(255,255,255,${.7*d.night*(1-d.day)*(.5+.5*Math.sin(d.t*3+i))})`;ctx.fillRect(x,y,2,2);}
    const sky=ctx.createLinearGradient(0,0,0,hz);sky.addColorStop(0,`rgba(90,60,150,${.35*d.day})`);sky.addColorStop(.55,`rgba(255,120,150,${.45*d.day})`);sky.addColorStop(1,`rgba(255,190,110,${.65*d.day})`);ctx.fillStyle=sky;ctx.fillRect(0,0,W,hz);
    const sy=hz+90-d.rise*150,R=78;
    // napsugarak: félkörben, balról jobbra egyenként sütnek fel
    if(d.fan>-1){ctx.save();ctx.globalCompositeOperation='lighter';const n=17;for(let i=0;i<n;i++){const an=-Math.PI+(i+.5)/n*Math.PI,k=Math.max(0,Math.min(1,(d.fan*n-i)/1.5));if(k<=0)continue;const L=1500*easeIO(k),w=.045;
        const g=ctx.createLinearGradient(sx,sy,sx+Math.cos(an)*L,sy+Math.sin(an)*L);g.addColorStop(0,`rgba(255,235,190,${.55*k})`);g.addColorStop(.5,`rgba(255,190,150,${.22*k})`);g.addColorStop(1,'rgba(255,170,140,0)');ctx.fillStyle=g;
        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(an-w)*L,sy+Math.sin(an-w)*L);ctx.lineTo(sx+Math.cos(an+w)*L,sy+Math.sin(an+w)*L);ctx.closePath();ctx.fill();}
      for(const b of d.beams){const L=Math.hypot(b.x-sx,b.y-sy),an=Math.atan2(b.y-sy,b.x-sx),w=.05;const g=ctx.createLinearGradient(sx,sy,b.x,b.y);g.addColorStop(0,`rgba(255,240,200,${.7*b.a})`);g.addColorStop(1,`rgba(255,220,180,${.5*b.a})`);ctx.fillStyle=g;
        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(an-w)*L,sy+Math.sin(an-w)*L);ctx.lineTo(sx+Math.cos(an+w)*L,sy+Math.sin(an+w)*L);ctx.closePath();ctx.fill();}
      ctx.restore();}
    ctx.save();ctx.beginPath();ctx.rect(0,0,W,hz);ctx.clip();ctx.globalCompositeOperation='lighter';glow(sx,sy,R*4.5,'255,150,90',.55*d.rise);glow(sx,sy,R*2,'255,210,140',.7*d.rise);
    ctx.globalCompositeOperation='source-over';const sg=ctx.createRadialGradient(sx,sy-15,5,sx,sy,R);sg.addColorStop(0,'#fffbe8');sg.addColorStop(.7,'#ffd27a');sg.addColorStop(1,'#ff9a50');ctx.fillStyle=sg;ctx.globalAlpha=d.a*Math.min(1,d.rise*2);ctx.beginPath();ctx.arc(sx,sy,R,0,6.29);ctx.fill();ctx.restore();
    ctx.globalCompositeOperation='lighter';const hl=ctx.createLinearGradient(0,hz-30,0,hz+40);hl.addColorStop(0,'rgba(255,200,150,0)');hl.addColorStop(.5,`rgba(255,200,150,${.5*d.rise})`);hl.addColorStop(1,'rgba(255,200,150,0)');ctx.fillStyle=hl;ctx.fillRect(0,hz-30,W,70);
    ctx.restore();}});
  await tween(600,k=>{d.night=k;});await wait(200);
  await tween(1100,k=>{d.rise=easeIO(k);d.day=easeIO(Math.max(0,k-.2)/.8);});
  d.fan=0;sfx('holy');await tween(1300,k=>{d.fan=k;});await wait(150);
  const sy=hz+90-150;for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){const b={x:cx(t),y:midY(t),a:0};d.beams.push(b);tween(250,k=>{b.a=k;});await wait(180);
    sparks(cx(t),midY(t),['255,210,170','255,240,210'],26,460);fxSpin(tint('nova','255,200,160')||'nova',cx(t),midY(t),{size:bigOf(t)*1.4,life:.5,s0:.2,s1:1,add:true,out:.3});hit(u,t,sk);}
  for(const h of S.heroes.filter(x=>x.alive)){const n=Math.round(h.maxHp*.1),got=Math.min(n,h.maxHp-h.hp);if(got>0){h.hp+=got;popNum(h,got,'heal');}}updateHUD();
  await wait(600);await tween(600,k=>{d.a=1-k;});d.a=0;u.pose='idle';};

// ---- Nyílzápor: sokkal több nyíl, forgó kör nélkül
A.arrowRain=async(u,ts,sk)=>{const {al,mx}=grp(ts);if(!al.length)return;u.pose='sky';await chargeBow(u,420);u.pose='sky';
  const b=bowPos(u),top={x:Math.min(W-200,mx),y:70};sfx('slash');
  await bigArrow({x:b.x,y:b.y-30},top,{ms:420,size:190,arc:-40});flash(GOLD_B,.35,.15);sparks(top.x,top.y,[GOLD_A,GOLD_B,'255,255,255'],40,600);
  await dimTo(.5,'40,25,0',200);await wait(200);
  const gyMax=Math.max(...al.map(t=>t.y+t.oy)),xs=al.map(cx),xa=Math.min(...xs)-140,xb=Math.max(...xs)+140;
  const falls=[];
  for(let i=0;i<36;i++){const x=rnd(xa,xb),y=gyMax-rnd(-10,30);falls.push(wait(i*30+rnd(0,40)).then(()=>bigArrow({x:x-160+rnd(-60,60),y:-40},{x,y},{ms:260,size:100})).then(p=>{stuckArrow(p.x,p.y,1.2,1.2);if(Math.random()<.5)part({x:p.x,y:p.y,vx:rnd(-40,40),vy:-rnd(40,90),g:300,life:.5,size:rnd(4,7),rgb:'150,130,100',add:false,shape:'smoke'});}));}
  for(const t of al)for(let i=0;i<16;i++){const x=cx(t)+rnd(-.5,.5)*t.w*t.scale,y=t.y+t.oy-rnd(10,t.h*t.scale*.8);
    falls.push(wait(i*55+rnd(0,40)).then(()=>bigArrow({x:x-160+rnd(-60,60),y:-40},{x,y},{ms:260,size:110})).then(p=>{stuckArrow(p.x,p.y,1.2,.8);sparks(p.x,p.y,[GOLD_A,GOLD_B],6,240);if(i===15&&t.alive){hit(u,t,sk);goldImpact(cx(t),midY(t),.8);}else if(i%4===0){sfx('hit');shake(4);t.hurt=.15;}}));}
  await Promise.all(falls);shake(12);hitStop(80);await wait(450);await dimTo(0,null,250);u.pose='idle';};

// ---- Lótusznyíl: rózsaszín szirmok örvénylenek Jázmin körül, a nyíl szirmokat szór, hatalmas lótusz nyílik fénysugarakkal, a szirmok a társakat gyógyítják
A.lotusArrow=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const P='255,170,210',x=cx(t),y=midY(t);await dimTo(.45,'40,10,30',220);
  effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<3;i++){const a=this.t*8+i*2.1,r=90-this.t*40;part({x:cx(u)+Math.cos(a)*r,y:midY(u)+Math.sin(a)*r*.6,vx:-Math.sin(a)*60,vy:Math.cos(a)*40,life:.5,size:rnd(4,7),rgb:pick([P,'255,230,240']),add:false,shape:'leaf'});}return this.t<.6;},draw(){}});
  await chargeBow(u,520,P);sfx('slash');
  await bigArrow(bowPos(u),{x:x-10,y},{arc:24,size:170,trail:[P,GOLD_B,'255,230,240']});arrowHit(u,t,sk,{noStick:true,rgb:P});hitStop(80);
  // fénysugarak a lótusz mögött
  const L={a:0,s:.2};effects.push({t:0,update(dt){this.t+=dt;return L.a>0||this.t<.2;},draw(){if(L.a<=0)return;ctx.save();ctx.globalCompositeOperation='lighter';for(let i=0;i<14;i++){const an=i/14*6.283+this.t*.4,R=320*L.s;
      const g=ctx.createLinearGradient(x,y,x+Math.cos(an)*R,y+Math.sin(an)*R);g.addColorStop(0,`rgba(255,220,235,${.5*L.a})`);g.addColorStop(1,'rgba(255,170,210,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(an-.08)*R,y+Math.sin(an-.08)*R);ctx.lineTo(x+Math.cos(an+.08)*R,y+Math.sin(an+.08)*R);ctx.closePath();ctx.fill();}
    glow(x,y,200*L.s,P,.5*L.a);ctx.restore();}});
  tween(500,k=>{L.a=k;L.s=.2+.8*easeIO(k);});
  if(JZ('jzlotus'))fxSpin('jzlotus',x,y,{size:440,life:1.7,s0:.1,s1:1,spin:.5,in:.1,out:.5});
  for(let i=0;i<40;i++){const a=rnd(0,6.28),v=rnd(150,420);part({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-80,drag:1.5,g:120,life:rnd(.9,1.5),size:rnd(5,9),rgb:pick([P,'255,230,240','255,120,180']),add:false,shape:'leaf'});}
  flash('255,200,230',.35,.2);shake(8);sfx('heal');await wait(650);
  const allies=S.heroes.filter(h=>h.alive);
  await Promise.all(allies.map((a,i)=>wait(i*90).then(()=>JZ('jzlotus')?fxFly('jzlotus',x,y,cx(a),midY(a),560,{size:100,arc:140,norot:true,spin:4,trail:[P,'255,230,240']}):wait(400)).then(()=>{hit(u,a,{kind:'heal',pow:.45});
    if(JZ('jzlotus'))fxSpin('jzlotus',cx(a),a.y+a.oy-6,{size:160,life:1,s0:.4,s1:1,sy:.4,out:.4});for(let j=0;j<10;j++)part({x:cx(a)+rnd(-30,30),y:a.y+a.oy-rnd(0,40),vx:rnd(-20,20),vy:rnd(-120,-50),life:.8,size:rnd(4,6),rgb:pick([P,'255,240,250']),add:false,shape:'leaf'});})));
  await tween(400,k=>{L.a=1-k;});L.a=0;await dimTo(0,null,250);u.pose='idle';};

// ---- Tenyércsapás: az óriás kéz után nincs kör, csak szikrák
A.palm=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;
  setTimeout(()=>{if(JZ('jzpalm'))fxSpin('jzpalm',cx(t)-30,midY(t)-10,{size:Math.max(260,t.h*t.scale*1.6),life:.55,s0:1.6,s1:.9,rot:Math.PI/2,in:.06,out:.3});},300/(S.speed||1));
  await lunge(u,t,sk,{fast:true});flash(GOLD_B,.2,.12);sparks(cx(t),midY(t),[GOLD_A,GOLD_B,'255,255,255'],28,480);shake(10);};

// ---- Százkezű: Jázmin mögött kezek legyezője nyílik ki, és villámgyors tenyérzápor zúdul az ellenségre, a végén egy hatalmas tenyér
A.flurry=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const bw=t.w*t.scale,bh=t.h*t.scale;
  const tx=t.x-((t.w*t.scale)/2+(u.w*u.scale)/2+10),dx=tx-u.x,dy=(t.y+2)-u.y;sfx('holy');
  // a kezek legyezője Jázmin háta mögött
  const F={a:0,k:0},im=FXK('jzpalm');effects.unshift({t:0,update(dt){this.t+=dt;return F.a>0||!F.done;},draw(){if(!im||F.a<=0)return;const x=cx(u)-20,y=midY(u)-10,n=10;ctx.save();ctx.globalCompositeOperation='lighter';
    for(let i=0;i<n;i++){const an=-Math.PI*.95+i/(n-1)*Math.PI*.9,R=(90+20*Math.sin(this.t*12+i))*F.k,sz=86;ctx.save();ctx.globalAlpha=F.a*.65;ctx.translate(x+Math.cos(an)*R,y+Math.sin(an)*R);ctx.rotate(an+Math.PI/2);ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();}
    glow(x,y,130*F.k,GOLD_A,.35*F.a);ctx.restore();}});
  u.pose='power';await tween(350,k=>{F.a=k;F.k=easeIO(k);});
  ghosts(u,240);u.pose='idle';await tween(200,k=>{const e=easeIO(k);u.ox=dx*e;u.oy=dy*e;u.jump=Math.sin(k*Math.PI)*24;});
  const N=15;for(let i=0;i<N&&t.alive;i++){u.pose=i%2?'palm':'attack';u.ox=dx+(i%2?14:-2);
    const px=cx(t)+rnd(-.32,.25)*bw,py=midY(t)+rnd(-.32,.25)*bh;if(im)fxFly('jzpalm',cx(u)+rnd(-10,30),midY(u)+rnd(-70,40),px,py,110,{size:rnd(110,160),base:-Math.PI/2});
    await wait(90);sparks(px,py,[GOLD_A,GOLD_B,'255,255,255'],7,260);t.hurt=.2;shake(3);sfx('hit');if(i===4||i===9||i===14)hit(u,t,sk);}
  popLabel(t,'SZÁZKEZŰ!','#ffd86e');
  if(t.alive&&JZ('jzpalm'))fxSpin('jzpalm',cx(t)-20,midY(t),{size:Math.max(280,bh*1.7),life:.5,s0:1.5,s1:.95,rot:Math.PI/2,in:.05,out:.3});
  await wait(120);flash(GOLD_B,.35,.15);hitStop(90);shake(14);punch(cx(t),midY(t),.06);sparks(cx(t),midY(t),[GOLD_A,GOLD_B,'255,255,255'],36,560);toss(t,34,320);
  F.done=true;tween(300,k=>{F.a=1-k;}).then(()=>{F.a=0;});await wait(260);u.pose='idle';ghosts(u,200);
  await tween(240,k=>{const e=easeIO(k);u.ox=dx*(1-e);u.oy=dy*(1-e);u.jump=Math.sin(k*Math.PI)*20;});u.ox=0;u.oy=0;u.jump=0;};

// ---- Jázmin LIMIT-plakátja: tisztított, teljes alakos kép
// (a drawCutin a monk-poster képet használja, ha van)

// ---- Vérszomj: amíg Grog áll, nincs piros vágás rajta – csak vörös aura lobog körülötte
{const B0=A.bloodlust;A.bloodlust=async(u,ts,sk)=>{const keep=fxSpin;let first=true;fxSpin=function(key,x,y,o){if(first&&key==='bloodfx'){first=false;const hh=u.h*u.scale;effects.push({t:0,update(dt){this.t+=dt;return this.t<.9;},draw(){const a=Math.sin(Math.min(1,this.t/.9)*Math.PI);ctx.save();ctx.globalCompositeOperation='lighter';glow(cx(u),midY(u),hh*.7,'255,30,30',.5*a);ctx.restore();}});return true;}return keep.apply(this,arguments);};
  try{await B0(u,ts,sk);}finally{fxSpin=keep;}};}
// ---- Zúzás: a lecsapásnál nincs nagy vágás
{const C0=A.crush;A.crush=async(u,ts,sk)=>{const keep=fxSpin;fxSpin=function(key){if(key==='slash')return true;return keep.apply(this,arguments);};try{await C0(u,ts,sk);}finally{fxSpin=keep;}};}

// ---- Forgószél: halvány tornádó Grog körül, a forgó fejszék megmaradnak
A.whirl=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;u.pose='attack';sfx('wind');
  const st={on:true,t:0,a:0};effects.push({update(dt){st.t+=dt;st.a=st.on?Math.min(1,st.a+dt*4):st.a-dt*3;if(st.on&&Math.random()<.7){const a=rnd(0,6.28);part({x:cx(u)+Math.cos(a)*90,y:u.y+u.oy-rnd(0,30),vx:-Math.sin(a)*220,vy:-rnd(40,140),life:.5,size:rnd(4,8),rgb:'190,175,150',add:false,shape:'smoke'});}return st.on||st.a>0;},
    draw(){const x=cx(u),gy=u.y+u.oy+4,Ht=u.h*u.scale*1.7;ctx.save();ctx.globalAlpha=Math.max(0,st.a);ctx.lineCap='round';
      for(let j=0;j<16;j++){const f=j/15,y=gy-f*Ht,r=40+f*f*120+Math.sin(st.t*6+j)*6,sw=x+Math.sin(st.t*3+f*3)*14*f;for(let k=0;k<2;k++){const a0=st.t*12+j*.7+k*Math.PI;ctx.strokeStyle=`rgba(225,220,205,${.12+.14*(1-f)})`;ctx.lineWidth=2+3*(1-f);ctx.beginPath();ctx.ellipse(sw,y,r,r*.28,0,a0,a0+1.6);ctx.stroke();}}
      ctx.restore();if(st.on){const y=midY(u);for(let i=0;i<4;i++){const an=st.t*14+i*Math.PI/2,r=95;drawAxe(x+Math.cos(an)*r,y+Math.sin(an)*r*.45,an+Math.PI/2,74);}}}});
  const x0=u.x,y0=u.y;const order=al.slice().sort((a,b)=>cx(a)-cx(b));
  for(const t of order){const dx=t.x-x0-100,dy=t.y-y0;await tween(260,k=>{const e=easeIO(k);u.ox+=((dx)-u.ox)*e;u.oy+=((dy)-u.oy)*e;u.spin=(u.spin||0)+.6;});
    for(let i=0;i<3;i++){sparks(cx(t),midY(t),['230,240,255','190,170,140'],10,420);shake(5);sfx('slash');await wait(90);}hit(u,t,sk);toss(t,30,300);}
  await tween(320,k=>{u.ox*=1-k;u.oy*=1-k;u.spin=(u.spin||0)+.6;});u.ox=0;u.oy=0;u.spin=0;st.on=false;u.pose='idle';await wait(200);};

// ---- Földrepesztés: élethű repedés fut végig a földön, kőlapok emelkednek ki, por és kődarabok repülnek
A.earthsplit=async(u,ts,sk)=>{const {al,gy}=grp(ts);if(!al.length)return;const dir=u.kind==='enemy'?-1:1;u.pose='attack';await dimTo(.35,'30,20,10',200);
  await tween(320,k=>{u.jump=Math.sin(k*Math.PI*.5)*90;});await tween(120,k=>{u.jump=90*(1-k*k);});u.jump=0;
  shake(16);rumble(1.6,7);flash('255,230,190',.25,.12);sfx('rock');hitStop(80);
  const xs=al.map(cx),x0=cx(u)+60*dir,x1=dir>0?Math.max(...xs)+120:Math.min(...xs)-120,fy=gy+6,T=650;
  const pts=[];const n=28;for(let i=0;i<=n;i++){pts.push({x:x0+(x1-x0)*i/n,y:fy+rnd(-7,7),w:i===0||i===n?2:rnd(7,16)});}
  const branches=[];for(let i=3;i<n-1;i+=rnd(3,5)|0){const p=pts[i],L=rnd(30,70),a=rnd(-.5,.5)+(Math.random()<.5?0:Math.PI);branches.push({x:p.x,y:p.y,x2:p.x+Math.cos(a)*L,y2:p.y+Math.sin(a)*L*.3,i});}
  const slabs=[];const C={p:0,a:1};
  effects.unshift({update(){return C.a>0;},draw(){if(C.a<=0)return;const m=Math.floor(C.p*n);ctx.save();ctx.globalAlpha=C.a;
    // a repedés: sötét hasadék, izzó mélység, világos peremek
    if(m>=1){for(const [col,wk] of [['rgba(150,120,90,.9)',1.5],['rgba(25,12,8,1)',1],['rgba(255,110,30,.55)',.35]]){ctx.fillStyle=col;ctx.beginPath();for(let i=0;i<=m;i++)ctx.lineTo(pts[i].x,pts[i].y-pts[i].w*.5*wk);for(let i=m;i>=0;i--)ctx.lineTo(pts[i].x,pts[i].y+pts[i].w*.5*wk);ctx.closePath();ctx.fill();}
      ctx.strokeStyle='rgba(25,12,8,.9)';ctx.lineWidth=3;for(const b of branches)if(b.i<=m){ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo((b.x+b.x2)/2+4,(b.y+b.y2)/2+2);ctx.lineTo(b.x2,b.y2);ctx.stroke();}}
    // felemelkedő kőlapok
    for(const s of slabs){const h=s.h*s.k;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.r*s.k);const g=ctx.createLinearGradient(0,-h,0,0);g.addColorStop(0,'#b49a7a');g.addColorStop(.3,'#8a7055');g.addColorStop(1,'#4a3828');ctx.fillStyle=g;ctx.strokeStyle='#2a1c12';ctx.lineWidth=2.5;
      ctx.beginPath();ctx.moveTo(-s.w/2,0);ctx.lineTo(-s.w*.42,-h);ctx.lineTo(s.w*.1,-h-s.w*.12);ctx.lineTo(s.w*.48,-h*.85);ctx.lineTo(s.w/2,0);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.fillStyle='rgba(220,200,170,.5)';ctx.beginPath();ctx.moveTo(-s.w*.42,-h);ctx.lineTo(s.w*.1,-h-s.w*.12);ctx.lineTo(s.w*.48,-h*.85);ctx.lineTo(s.w*.1,-h*.8);ctx.closePath();ctx.fill();ctx.restore();}
    ctx.restore();}});
  const slab=(x,big)=>{const s={x,y:fy+4,w:big?rnd(60,90):rnd(26,46),h:big?rnd(70,110):rnd(26,55),r:rnd(-.35,.35),k:0};slabs.push(s);tween(180,k=>{s.k=easeIO(k);}).then(()=>wait(500)).then(()=>tween(500,k=>{s.k=1-k*.75;}));
    for(let i=0;i<(big?12:5);i++)part({x:x+rnd(-20,20),y:fy-rnd(0,20),vx:rnd(-200,200),vy:-rnd(200,520),g:1300,life:rnd(.7,1.2),size:rnd(4,big?11:7),rgb:pick(['120,95,70','150,125,95','90,70,50']),add:false,shape:'rock'});
    for(let i=0;i<(big?8:3);i++)part({x:x+rnd(-30,30),y:fy-rnd(0,15),vx:rnd(-80,80),vy:-rnd(20,90),life:rnd(.9,1.5),size:rnd(14,26),rgb:'150,130,105',add:false,shape:'smoke'});};
  const hitAt=al.map(t=>({t,at:Math.abs((cx(t)-x0)/(x1-x0))})).sort((a,b)=>a.at-b.at);let hi=0,lastSlab=-1;
  await tween(T,k=>{C.p=k;const m=Math.floor(k*n);if(m>lastSlab){for(let i=lastSlab+1;i<=m;i++)if(i%2===0&&i>0)slab(pts[i].x,false);lastSlab=m;if(Math.random()<.5)shake(5);}
    while(hi<hitAt.length&&hitAt[hi].at<=k){const t=hitAt[hi].t;hi++;slab(cx(t)-20,true);slab(cx(t)+25,true);toss(t,60,420);shake(12);hitStop(50);sfx('rock');hit(u,t,sk);}});
  while(hi<hitAt.length){const t=hitAt[hi++].t;toss(t,60,420);hit(u,t,sk);}
  u.pose='idle';await wait(1000);await tween(700,k=>{C.a=1-k;});C.a=0;await dimTo(0,null,250);};

// ---- Magmakitörés: valódi láva – sűrű, izzó olvadt kő, ami kihűlve megfeketedik, fekete füst
function lavaCol(age){const k=Math.min(1,age);if(k<.25)return [255,230-k*240,120-k*400];if(k<.6)return [255-(k-.25)*200,170-(k-.25)*330,20];return [185-(k-.6)*280,55-(k-.6)*100,15];}
A.magmaErupt=async(u,ts,sk)=>{const {al}=grp(ts);if(!al.length)return;await dimTo(.68,'30,6,0',250);u.pose='attack';sfx('rock');shake(10);rumble(1.8,6);
  const vents=al.map(t=>({x:cx(t),y:t.y+t.oy+8,a:0,pool:0,t}));const blobs=[],splats=[],L={on:true};
  effects.unshift({update(dt){for(const v of vents)if(v.pool>0&&Math.random()<.3)part({x:v.x+rnd(-60,60),y:v.y-rnd(0,10),vx:rnd(-10,10),vy:-rnd(40,90),life:rnd(1,1.8),size:rnd(14,26),rgb:pick(['50,40,40','70,60,55','35,28,28']),add:false,shape:'smoke'});
      for(let i=blobs.length-1;i>=0;i--){const b=blobs[i];b.age+=dt*.9;b.vy+=1500*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.vy>0&&b.y>=b.gy){splats.push({x:b.x,y:b.gy,r:b.r*1.6,age:b.age*.6});blobs.splice(i,1);}}
      for(let i=splats.length-1;i>=0;i--){splats[i].age+=dt*.45;if(splats[i].age>1.6)splats.splice(i,1);}
      return L.on||blobs.length||splats.length;},
    draw(){ctx.save();
      for(const v of vents){if(v.pool<=0)continue;const R=110*v.pool;ctx.save();ctx.translate(v.x,v.y);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,R*1.6,'255,90,20',.5*v.pool);ctx.globalCompositeOperation='source-over';
        const g=ctx.createRadialGradient(0,0,R*.1,0,0,R);g.addColorStop(0,'rgba(255,240,170,1)');g.addColorStop(.35,'rgba(255,150,30,1)');g.addColorStop(.8,'rgba(180,40,10,1)');g.addColorStop(1,'rgba(50,15,8,.95)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
        ctx.fillStyle='rgba(40,14,8,.85)';for(let i=0;i<7;i++){const a=i*.9+v.a*.3,r=R*(.45+.35*((i*.37)%1));ctx.beginPath();ctx.ellipse(Math.cos(a)*r,Math.sin(a)*r,R*.16,R*.1,a,0,6.29);ctx.fill();}ctx.restore();}
      for(const s of splats){const [r,g,b]=lavaCol(s.age);ctx.fillStyle=`rgba(${r|0},${g|0},${b|0},${Math.min(1,2.2-s.age*1.3)})`;ctx.beginPath();ctx.ellipse(s.x,s.y,s.r,s.r*.32,0,0,6.29);ctx.fill();}
      for(const b of blobs){const [r,g,bb]=lavaCol(b.age);ctx.globalCompositeOperation='lighter';glow(b.x,b.y,b.r*2.4,'255,110,30',.35*Math.max(0,1-b.age));ctx.globalCompositeOperation='source-over';
        const gr=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,1,b.x,b.y,b.r);gr.addColorStop(0,`rgb(255,${Math.min(255,g+90)|0},${Math.min(255,bb+80)|0})`);gr.addColorStop(.6,`rgb(${r|0},${g|0},${bb|0})`);gr.addColorStop(1,`rgb(${(r*.45)|0},${(g*.3)|0},${(bb*.3)|0})`);ctx.fillStyle=gr;
        const sp=Math.min(1.8,1+Math.abs(b.vy)/900);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);ctx.beginPath();ctx.ellipse(0,0,b.r/Math.sqrt(sp),b.r*sp,0,0,6.29);ctx.fill();ctx.restore();}
      ctx.restore();}});
  for(const v of vents)groundCrack(v.x,v.y,'255,120,30',170);await tween(600,k=>{for(const v of vents){v.pool=easeIO(k)*.7;v.a+=.05;}});
  for(const v of vents){const t=v.t,x=v.x,gy=v.y;sfx('fire');flash('255,140,40',.25,.12);shake(14);hitStop(60);
    for(let j=0;j<46;j++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.38,.38),sp=rnd(600,1150);blobs.push({x:x+rnd(-18,18),y:gy-10,vx:Math.cos(a)*sp*.55,vy:Math.sin(a)*sp,r:rnd(7,17),age:rnd(0,.1),gy:gy+rnd(-6,18)});},j*14);
    // a lávaoszlop magja
    effects.push({t:0,update(dt){this.t+=dt;return this.t<.9;},draw(){const k=this.t/.9,h=Math.sin(Math.min(1,k*1.4)*Math.PI*.5)*(1-Math.max(0,k-.6)/.4)*Math.max(260,bigOf(t)*1.3),w=34;if(h<=0)return;
      const g=ctx.createLinearGradient(0,gy-h,0,gy);g.addColorStop(0,'rgba(255,170,40,.95)');g.addColorStop(.4,'rgba(255,230,140,1)');g.addColorStop(1,'rgba(255,120,20,1)');ctx.save();ctx.globalCompositeOperation='lighter';glow(x,gy-h*.5,h*.5,'255,100,20',.45);ctx.restore();
      ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-w,gy);for(let i=0;i<=10;i++){const yy=gy-h*i/10;ctx.lineTo(x-w*(1-i/14)+Math.sin(this.t*20+i)*5,yy);}for(let i=10;i>=0;i--){const yy=gy-h*i/10;ctx.lineTo(x+w*(1-i/14)+Math.sin(this.t*20+i+2)*5,yy);}ctx.closePath();ctx.fill();}});
    v.pool=1;toss(t,50,420);hit(u,t,sk);await wait(220);}
  await wait(1300);L.on=false;await tween(500,k=>{for(const v of vents)v.pool=1-k;});for(const v of vents)v.pool=0;u.pose='idle';await dimTo(0,null,300);};

// ---- Sötét alku – Lelkek tükre: valósághű tükör, a tükörképből kilép Morgána démoni énje, és 1 körre megszállja (vörös-lila aura, vörös szem)
const RED_EYES=new Map();function redEyes(sp){if(!sp)return sp;if(RED_EYES.has(sp))return RED_EYES.get(sp);let c=sp;try{c=document.createElement('canvas');c.width=sp.width;c.height=sp.height;const g=c.getContext('2d');g.drawImage(sp,0,0);
  const w=c.width,h=c.height,lim=Math.round(h*.4),d=g.getImageData(0,0,w,lim),p=d.data;for(let i=0;i<p.length;i+=4){const r=p[i],gg=p[i+1],b=p[i+2];if(p[i+3]<100)continue;if(b>r+28&&b>gg+22&&gg>=r-18&&r<190){const l=(r+gg+b)/3/255;p[i]=255;p[i+1]=Math.round(30+60*l);p[i+2]=Math.round(30+40*l);}}
  g.putImageData(d,0,0);}catch(e){c=sp;}RED_EYES.set(sp,c);return c;}
{const de6=drawEntity;drawEntity=function(e){if(!e.possessed||e.type!=='witch')return de6(e);const keys=['witch','witch-cast','witch-attack','witch-hurt'],keep=keys.map(k=>ENEMY_SPR[k]);keys.forEach((k,i)=>{if(keep[i])ENEMY_SPR[k]=redEyes(keep[i]);});try{return de6(e);}finally{keys.forEach((k,i)=>{if(keep[i])ENEMY_SPR[k]=keep[i];});}};}
A.pactFx=async(u,ts,sk)=>{await dimTo(.8,'12,0,14',300);u.pose='cast';sfx('dark');const sp=ENEMY_SPR.witch||ENEMY_SPR['witch-cast'],demon=sp?redEyes(tintSpr(sp,'rgb(110,0,40)',.5)):null;
  const Hh=u.h*u.scale,mx=cx(u)+170,gy=u.y+u.oy,mh=Hh*1.15,mw=mh*.5,my=gy-mh*.55,m={a:0,sheen:-1},r={a:0,x:mx,s:1,dem:0,out:0};
  effects.push({update(){return m.a>0||r.a>0||!m.done;},draw(){if(m.a<=0&&r.a<=0)return;ctx.save();ctx.globalAlpha=m.a;
    // talp és állvány
    ctx.fillStyle='#3a2a1a';ctx.fillRect(mx-mw*.7,gy-8,mw*1.4,10);ctx.fillStyle='#5a4128';ctx.fillRect(mx-6,my+mh*.5-4,12,gy-(my+mh*.5)+4);
    // díszes, antik aranykeret
    ctx.save();ctx.translate(mx,my);const fg=ctx.createLinearGradient(-mw,-mh/2,mw,mh/2);fg.addColorStop(0,'#f5d98a');fg.addColorStop(.3,'#8a6420');fg.addColorStop(.55,'#e8c66a');fg.addColorStop(.8,'#6b4a14');fg.addColorStop(1,'#d6b25a');
    ctx.fillStyle=fg;ctx.beginPath();ctx.ellipse(0,0,mw*.62,mh*.56,0,0,6.29);ctx.fill();ctx.strokeStyle='#3a2508';ctx.lineWidth=2;ctx.stroke();
    for(let i=0;i<12;i++){const a=i/12*6.283;ctx.fillStyle=i%2?'#f0d07a':'#b58a30';ctx.beginPath();ctx.arc(Math.cos(a)*mw*.6,Math.sin(a)*mh*.54,5,0,6.29);ctx.fill();}
    ctx.fillStyle='#e9c870';ctx.beginPath();ctx.moveTo(-14,-mh*.56);ctx.quadraticCurveTo(0,-mh*.72,14,-mh*.56);ctx.closePath();ctx.fill();
    // az üveg: sötét, mély tükröződés
    ctx.beginPath();ctx.ellipse(0,0,mw*.5,mh*.46,0,0,6.29);ctx.save();ctx.clip();const gg=ctx.createLinearGradient(-mw*.5,-mh*.46,mw*.5,mh*.46);gg.addColorStop(0,'#4b4d63');gg.addColorStop(.5,'#1d1b2a');gg.addColorStop(1,'#2f2840');ctx.fillStyle=gg;ctx.fillRect(-mw,-mh,mw*2,mh*2);
    if(sp&&r.out<=0){const w=Hh*.92*sp.width/sp.height,h=Hh*.92,im=r.dem>0?demon:sp;ctx.globalAlpha=m.a*.85;ctx.save();ctx.scale(-1,1);ctx.drawImage(sp,-w/2,mh*.46-h-4,w,h);if(r.dem>0&&demon){ctx.globalAlpha=m.a*r.dem;ctx.drawImage(demon,-w/2,mh*.46-h-4,w,h);}ctx.restore();ctx.globalAlpha=m.a;}
    ctx.fillStyle=`rgba(${r.dem>0?'120,0,30':'0,0,0'},${.25+.2*r.dem})`;ctx.fillRect(-mw,-mh,mw*2,mh*2);
    if(m.sheen>-1){const sx=-mw+m.sheen*mw*2.4;const sg=ctx.createLinearGradient(sx-40,0,sx+40,0);sg.addColorStop(0,'rgba(255,255,255,0)');sg.addColorStop(.5,'rgba(255,255,255,.4)');sg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=sg;ctx.save();ctx.rotate(-.35);ctx.fillRect(sx-40,-mh,80,mh*2);ctx.restore();}
    ctx.restore();ctx.restore();
    // a kilépő démon
    if(r.out>0&&demon){const w=Hh*r.s*demon.width/demon.height;ctx.globalAlpha=r.a;ctx.save();ctx.translate(r.x,gy);ctx.scale(-1,1);ctx.drawImage(demon,-w/2,-Hh*r.s,w,Hh*r.s);ctx.restore();ctx.globalCompositeOperation='lighter';glow(r.x,gy-Hh*.5,Hh*.45,'200,20,70',.4*r.a);glow(r.x,gy-Hh*.5,Hh*.3,'150,40,230',.3*r.a);}
    ctx.restore();}});
  await tween(500,k=>{m.a=k;});await tween(600,k=>{m.sheen=k;});m.sheen=-1;await wait(200);
  // a tükörkép démonivá torzul
  sfx('dark');rumble(.8,4);await tween(700,k=>{r.dem=k;});flash('180,0,40',.25,.15);await wait(250);
  // kilép a tükörből
  r.out=1;r.a=1;sfx('holy');for(let i=0;i<30;i++)part({x:mx+rnd(-mw*.4,mw*.4),y:my+rnd(-mh*.4,mh*.4),vx:rnd(-160,60),vy:rnd(-80,80),life:rnd(.4,.8),size:rnd(2,5),rgb:pick(['200,20,70','150,40,230','255,140,180'])});
  await tween(800,k=>{r.x=mx-(mx-cx(u))*easeIO(k);for(let i=0;i<2;i++)part({x:r.x+rnd(-20,20),y:gy-rnd(0,Hh),vx:rnd(20,60),vy:rnd(-40,-10),life:.6,size:rnd(8,14),rgb:'60,0,30',add:false,shape:'smoke'});});
  // megszállja Morgánát
  flash('200,20,70',.45,.22);shake(12);hitStop(100);sfx('dark');for(let i=0;i<46;i++){const a=rnd(0,6.28),v=rnd(80,300);part({x:cx(u),y:midY(u),vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:rnd(.5,.9),size:rnd(3,7),rgb:pick(['200,20,70','160,60,220','255,60,90'])});}
  r.a=0;m.done=true;u.possessed=true;hit(u,u,sk);addStatus(u,'atkUp',2);popLabel(u,'MEGSZÁLLVA!','#ff4a7a');
  await tween(400,k=>{m.a=1-k;});m.a=0;await wait(500);u.pose='idle';await dimTo(0,null,300);};
SK.darkpact.desc='Lelkek tükre: Morgána tükörképéből kilép a démoni énje, és megszállja. Életerőt ad érte, cserébe 60 MP-t kap, és 1 körig 40%-kal erősebben támad (vörös-lila aura, vörös szem).';

// ---- Lidércnyomás: a lidérc az ellenséggel szemben jelenik meg, és hatalmas karmolásokat csinál
function clawMarks(x,y,sz,ang,rgb='200,120,255'){effects.push({t:0,update(dt){this.t+=dt;return this.t<.55;},draw(){const k=Math.min(1,this.t/.12),a=this.t<.2?1:1-(this.t-.2)/.35;ctx.save();ctx.translate(x,y);ctx.rotate(ang);ctx.lineCap='round';
  for(let i=-1;i<=1;i++){const ox=i*sz*.16,L=sz*(1-.15*Math.abs(i));ctx.globalCompositeOperation='lighter';ctx.strokeStyle=`rgba(${rgb},${.5*a})`;ctx.lineWidth=16;ctx.beginPath();ctx.moveTo(ox-L*.1,-L/2);ctx.quadraticCurveTo(ox+L*.15,0,ox-L*.1+0,-L/2+L*k);ctx.stroke();
    ctx.strokeStyle=`rgba(255,255,255,${.9*a})`;ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(ox-L*.1,-L/2);ctx.quadraticCurveTo(ox+L*.15,0,ox-L*.1,-L/2+L*k);ctx.stroke();}ctx.restore();}});}
A.nightmareGrip=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;await dimTo(.82,'10,0,20',300);await castPose(u,'120,40,180',380);sfx('dark');
  const base=ENEMY_SPR['nightmare-attack']||ENEMY_SPR.nightmare,sp=base?tintSpr(base,'rgb(40,10,70)',.4):null,Hn=Math.max(330,bigOf(t)*1.9),hw=t.w*t.scale/2;
  const g={a:0,x:cx(t)-hw-Hn*.28,y:t.y+t.oy+6,s:.6,rot:0};
  effects.push({update(){return g.a>0||!g.done;},draw(){if(!sp||g.a<=0)return;const w=Hn*g.s*sp.width/sp.height,h=Hn*g.s;ctx.save();ctx.translate(g.x,g.y);ctx.rotate(g.rot);ctx.globalAlpha=g.a;ctx.scale(-1,1);
    ctx.globalCompositeOperation='lighter';glow(0,-h*.55,h*.45,'120,40,200',.35*g.a);ctx.globalCompositeOperation='source-over';ctx.drawImage(sp,-w/2,-h,w,h);ctx.restore();}});
  // füstből emelkedik ki az ellenség előtt
  for(let i=0;i<24;i++)part({x:g.x+rnd(-60,60),y:g.y-rnd(0,40),vx:rnd(-30,30),vy:-rnd(30,110),life:rnd(.8,1.3),size:rnd(16,30),rgb:'40,10,60',add:false,shape:'smoke'});
  await tween(450,k=>{g.a=k;g.s=.6+.4*easeIO(k);});popLabel(t,'LIDÉRC!','#c890ff');await wait(150);
  const angs=[-.5,.5,-.25,.2];
  for(let i=0;i<4&&t.alive;i++){const x0=g.x;await tween(110,k=>{g.x=x0+60*k;g.rot=.12*k;});
    clawMarks(cx(t)+rnd(-15,15),midY(t)+rnd(-15,15),Math.max(170,bigOf(t)*1.1),angs[i]);fxSpin('claw',cx(t),midY(t),{size:bigOf(t)*1.5,life:.26,s0:.7,s1:1.1,rot:angs[i],in:.01,out:.2,add:true});
    flash('120,40,180',.22,.08);shake(12);hitStop(60);sfx('slash');sparks(cx(t),midY(t),['170,90,255','255,255,255'],16,460);t.hurt=.3;await tween(130,k=>{g.x=x0+60*(1-k);g.rot=.12*(1-k);});}
  hit(u,t,sk);toss(t,40,320);await wait(300);g.done=true;await tween(380,k=>{g.a=1-k;});g.a=0;u.pose='idle';await dimTo(0,null,300);};

// ---- Átok: Morgána megidézi Hádészt – sötét kapu nyílik, Hádész kiemelkedik belőle, aztán jön az átok
{const hexBase=A.hex.__raw||A.hex;A.hex=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return hexBase(u,ts,sk);await dimTo(.65,'20,0,30',250);await castPose(u,'170,70,255',420);sfx('dark');
    const h=handPos(u),px=cx(t)+40,py=t.y+t.oy+10;for(let i=0;i<26;i++)setTimeout(()=>part({x:h.x,y:h.y,vx:(px-h.x)/.45+rnd(-40,40),vy:(py-60-h.y)/.45+rnd(-60,20),life:.45,size:rnd(3,6),rgb:pick(['170,70,255','90,220,140'])}),i*16);await wait(400);
    const P={a:0};effects.unshift({update(){return P.a>0||!P.done;},draw(){if(P.a<=0)return;ctx.save();ctx.translate(px,py);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,170*P.a,'150,60,240',.6*P.a);ctx.globalCompositeOperation='source-over';ctx.fillStyle=`rgba(10,0,20,${.9*P.a})`;ctx.beginPath();ctx.arc(0,0,120*P.a,0,6.29);ctx.fill();ctx.restore();}});
    await tween(350,k=>{P.a=k;});sfx('dark');rumble(.9,5);
    const Hd=Math.max(300,bigOf(t)*1.9),g=godShow('hades',px,py,Hd,99,'170,90,255'),yEnd=midY(t)-50;g.y=py+Hd*.2;
    for(let i=0;i<30;i++)part({x:px+rnd(-90,90),y:py-rnd(0,30),vx:rnd(-20,20),vy:-rnd(60,180),life:rnd(.6,1.1),size:rnd(4,9),rgb:pick(['150,70,230','90,220,140']),shape:'star'});
    await tween(700,k=>{g.y=py+Hd*.2-(py+Hd*.2-yEnd)*easeIO(k);});await wait(250);
    const kd=dimTo;dimTo=async()=>{};try{await hexBase(u,ts,sk);}finally{dimTo=kd;}
    g.dead=true;P.done=true;await tween(350,k=>{P.a=1-k;});P.a=0;await dimTo(0,null,300);};A.hex.__hb=hexBase;}

// ---- Szökőár: Poszeidón emelkedik ki a vízből, felemeli a szigonyát, és ő idézi meg a hullámot – amíg a hullám végigsöpör, ott marad
A.tsunami=async(u,ts,sk)=>{const {al,mx,gy}=grp(ts);if(!al.length)return;await dimTo(.5,'0,20,40',250);await castPose(u,'90,170,255',420);sfx('ice');
  const px=Math.max(240,Math.min(...al.map(cx))-250),Hp=360,g=godShow('poseidon',px,330+Hp*.3,Hp,99,'120,220,255');rumble(1.2,4);
  for(let i=0;i<40;i++)part({x:px+rnd(-140,140),y:330+rnd(-10,30),vx:rnd(-60,60),vy:-rnd(80,260),g:300,life:rnd(.6,1.1),size:rnd(3,7),rgb:pick(['150,220,255','255,255,255']),add:false,shape:'drop'});
  await tween(700,k=>{g.y=330+Hp*.3-Hp*.3*easeIO(k)-120*easeIO(k);});
  // felemeli a szigonyát: villanás a szigony hegyén
  await tween(250,k=>{g.y=210-25*k;});flash('170,230,255',.35,.15);sfx('thunder');sparks(px-Hp*.18,210-Hp*.42,['200,240,255','255,255,255'],30,500);shake(8);
  // a hullám tőle indul
  const x0=px-60,sp=440,blue=['120,190,255','220,240,255','60,130,255'];
  fxSpin('wave',tt=>x0+tt*sp,gy-150,{size:540,life:2,s0:.4,s1:1,in:.2,out:.4});fxSpin('wave',tt=>x0-110+tt*sp,gy-110,{size:420,life:2,s0:.4,s1:1,alpha:.7,delay:.12,out:.4});
  effects.push({t:0,update(dt){this.t+=dt;for(let i=0;i<5;i++)part({x:x0+this.t*sp+rnd(-120,140),y:gy-rnd(0,330),vx:rnd(-80,260),vy:rnd(-260,60),g:700,life:rnd(.4,.8),size:rnd(2,5),rgb:pick(blue)});return this.t<1.8;},draw(){}});
  rumble(2,6);let el=0;for(const t of al.slice().sort((a,b)=>cx(a)-cx(b))){const at=(cx(t)-x0-120)/sp*1000;if(at>el){await wait(at-el);el=at;}toss(t,50,480);hit(u,t,sk);shake(9);}
  await wait(500);g.dead=true;u.pose='idle';await wait(400);await dimTo(0,null,300);};

// ---- Gleccser: hatalmas, élethű jégcsapok törnek fel a földből keresztben az ellenségek körül, aztán szilánkokra törnek (jégburok nélkül)
function drawSpike(bx,by,ang,L,w,a){if(L<=1||a<=0)return;ctx.save();ctx.globalAlpha=a;ctx.translate(bx,by);ctx.rotate(ang);
  // két lap: világos bal, sötétebb jobb – kristályos hatás
  let g=ctx.createLinearGradient(-w/2,0,0,-L);g.addColorStop(0,'rgba(120,190,240,.95)');g.addColorStop(.7,'rgba(210,240,255,.92)');g.addColorStop(1,'rgba(255,255,255,1)');ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(-w*.12,-L*.55);ctx.lineTo(0,-L);ctx.lineTo(w*.05,0);ctx.closePath();ctx.fill();
  g=ctx.createLinearGradient(0,0,w/2,-L);g.addColorStop(0,'rgba(40,110,190,.95)');g.addColorStop(1,'rgba(150,210,250,.95)');ctx.fillStyle=g;
  ctx.beginPath();ctx.moveTo(w*.05,0);ctx.lineTo(0,-L);ctx.lineTo(w*.14,-L*.5);ctx.lineTo(w/2,0);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.95)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-w*.12,-L*.55);ctx.lineTo(0,-L);ctx.lineTo(w*.14,-L*.5);ctx.stroke();
  ctx.strokeStyle='rgba(20,60,120,.6)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(-w/2,0);ctx.lineTo(-w*.12,-L*.55);ctx.lineTo(0,-L);ctx.lineTo(w*.14,-L*.5);ctx.lineTo(w/2,0);ctx.stroke();
  ctx.strokeStyle='rgba(255,255,255,.55)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(-w*.2,-L*.2);ctx.lineTo(-w*.05,-L*.32);ctx.lineTo(-w*.15,-L*.45);ctx.stroke();
  ctx.globalCompositeOperation='lighter';glow(0,-L*.95,w*.5,'220,245,255',.5);ctx.restore();}
A.glacierFall=async(u,ts,sk)=>{const {al}=grp(ts);if(!al.length)return;await dimTo(.55,'0,25,50',250);await castPose(u,'170,230,255',380);sfx('ice');
  const shards=[],sets=al.map(t=>{const w=t.w*t.scale,h=t.h*t.scale,x=cx(t),gy=t.y+t.oy+6,L=Math.max(170,h*1.25),sp=[];
    for(const [dx,an,lk,wk,d] of [[-.55,.5,1,1,0],[.55,-.5,1,1,.04],[-.3,.28,.8,.75,.1],[.32,-.3,.85,.75,.14],[-.7,.12,.55,.6,.2],[.7,-.1,.5,.6,.22],[0,.04,.6,.65,.26]])sp.push({bx:x+dx*Math.max(80,w*.7),by:gy,ang:an,L:L*lk,w:Math.max(34,w*.28)*wk,g:0,d});
    return {t,sp,a:1};});
  const fx={update(dt){for(let i=shards.length-1;i>=0;i--){const s=shards[i];s.vy+=1300*dt;s.x+=s.vx*dt;s.y+=s.vy*dt;s.r+=s.vr*dt;s.life-=dt;if(s.life<=0)shards.splice(i,1);}return sets.some(c=>c.a>0)||shards.length>0;},
    draw(){for(const c of sets)if(c.a>0)for(const q of c.sp)drawSpike(q.bx,q.by,q.ang,q.L*q.g,q.w,c.a);
      for(const s of shards){ctx.save();ctx.globalAlpha=Math.min(1,s.life*2);ctx.translate(s.x,s.y);ctx.rotate(s.r);const g=ctx.createLinearGradient(-s.s,-s.s,s.s,s.s);g.addColorStop(0,'rgba(240,252,255,.95)');g.addColorStop(1,'rgba(100,170,230,.9)');ctx.fillStyle=g;ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=1;
        ctx.beginPath();ctx.moveTo(0,-s.s);ctx.lineTo(s.s*.6,s.s*.4);ctx.lineTo(-s.s*.5,s.s*.7);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}}};
  effects.push(fx);
  rumble(.9,6);sfx('rock');for(const c of sets)for(let i=0;i<16;i++)part({x:cx(c.t)+rnd(-90,90),y:c.t.y+c.t.oy,vx:rnd(-80,80),vy:-rnd(100,320),g:600,life:.8,size:rnd(3,6),rgb:'220,245,255',add:false,shape:'star'});
  // feltörnek és keresztezik egymást
  await tween(420,k=>{for(const c of sets)for(const q of c.sp)q.g=easeIO(Math.min(1,Math.max(0,(k-q.d)/(1-q.d))));});
  for(const c of sets){c.t.hurt=.3;toss(c.t,26,260);popLabel(c.t,'JÉGCSAPDA!','#bfeaff');}shake(10);hitStop(60);
  for(let j=0;j<10;j++){for(const c of sets){const q=pick(c.sp),k=rnd(.3,1);part({x:q.bx+Math.sin(q.ang)*q.L*k,y:q.by-Math.cos(q.ang)*q.L*k,vx:0,vy:-20,life:.5,size:rnd(3,6),rgb:'255,255,255',shape:'star'});}await wait(45);}
  // szétrobbannak
  flash('230,250,255',.5,.2);shake(22);hitStop(120);sfx('ice');sfx('rock');
  for(const c of sets){for(const q of c.sp){for(let i=0;i<9;i++){const k=rnd(.05,1),x=q.bx+Math.sin(q.ang)*q.L*k,y=q.by-Math.cos(q.ang)*q.L*k,a=rnd(0,6.28),v=rnd(200,700);shards.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-250,r:rnd(0,6),vr:rnd(-12,12),s:rnd(5,q.w*.3),life:rnd(.7,1.2)});}}
    sparks(cx(c.t),midY(c.t),['230,250,255','150,210,255','255,255,255'],30,600);c.a=0;toss(c.t,40,320);hit(u,c.t,sk);}
  await wait(800);u.pose='idle';await dimTo(0,null,300);};
