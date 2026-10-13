
// ===== 22. kör, 3. rész: Kaelen a tesztlap megjegyzései szerint + új idézések + III. rész ellenfél-javítások =====
// --- Bambuszlándzsa (valódi tárgy, rajzolt): ezt dobja Kaelen, és ezt küldi a Négyek erejébe
{const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');g.translate(128,128);
 const L=230,W=16;const gr=g.createLinearGradient(0,-W/2,0,W/2);gr.addColorStop(0,'#c8e27a');gr.addColorStop(.5,'#7fb33a');gr.addColorStop(1,'#4d7f22');
 g.fillStyle=gr;g.strokeStyle='#2d4a12';g.lineWidth=3;g.beginPath();g.moveTo(-L/2,-W/2);g.lineTo(L/2-34,-W/2);g.lineTo(L/2,0);g.lineTo(L/2-34,W/2);g.lineTo(-L/2,W/2);g.closePath();g.fill();g.stroke();
 g.fillStyle='#e6f0b0';for(let i=-2;i<=1;i++){g.fillRect(i*42-3,-W/2-3,6,W+6);g.strokeRect(i*42-3,-W/2-3,6,W+6);}
 for(const [x,y,r] of [[-70,-14,-.7],[-40,14,.6],[-95,12,.9]]){g.save();g.translate(x,y);g.rotate(r);g.fillStyle='#6cbf3a';g.strokeStyle='#244a10';g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(14,-9,30,0);g.quadraticCurveTo(14,9,0,0);g.fill();g.stroke();g.restore();}
 FX_IMG.bamboospear=c;}

// --- Bambuszcsapás: Kaelen hátralendül, és egyszerre három bambuszlándzsát vág az ellenfélbe
A.druidSpears=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';await bodyWind(u,240,.16);sfx('whoosh');const h=handPos(u),tx=cx(t),ty=midY(t);
  bodyStrike(u,150,-.24);const fl=[];for(let i=0;i<3;i++){const oy=(i-1)*34;fl.push(fxFly('bamboospear',h.x,h.y+oy*.3,tx-10+i*8,ty+oy,300+i*40,{size:340,arc:40+i*14,trail:['150,220,90','200,240,140']}).then(()=>{shake(9);kaeLeaves(tx,ty+oy,12,260);burst(tx,ty+oy,'200,240,140',14,260);sfx('hit');}));}
  await Promise.all(fl);hitStop&&hitStop(70);hit(u,t,sk);
  const st={a:1};effects.push({update(){return st.a>0;},draw(){ctx.save();ctx.globalAlpha=st.a;for(let i=0;i<3;i++){const oy=(i-1)*34;ctx.save();ctx.translate(tx-40+i*8,ty+oy);ctx.rotate(.12*(i-1));ctx.drawImage(FX_IMG.bamboospear,-170,-170,340,340);ctx.restore();}ctx.restore();}});
  await wait(420);await tween(300,k=>st.a=1-k);await bodySettle(u);u.pose='idle';};
ATTACKS.druid.anim='druidSpears';ATTACKS.druid.desc='Kaelen egyszerre három bambuszlándzsát dob az ellenfélbe.';

// --- Levéltánc (eddig Mohapárna): zöld levelek táncolnak körbe a társ körül, aztán belesimulnak és gyógyítanak
SK.mosspillow.name='Levéltánc';SK.mosspillow.anim='leafDance';SK.mosspillow.desc='Zöld levelek táncolnak a társ körül és meggyógyítják; 2 körig minden kör végén tovább gyógyul. Leszedi a Habot.';
A.leafDance=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('heal');const h=handPos(u),gx=cx(t),gy=midY(t),R=Math.max(70,t.w*t.scale*.9),H=t.h*t.scale*.55,N=34,LV=[];
  for(let i=0;i<N;i++)LV.push({a:i/N*Math.PI*2,y:rnd(-1,1),s:rnd(1.3,2.2),c:pick(['#6cbf3a','#4d9a2a','#9bd85a','#3f8a2a']),fl:Math.random()<.5?1:-1});
  const D={k:0,m:0,a:1};
  effects.push({t:0,update(dt){this.t+=dt;return D.a>0;},draw(){ctx.save();ctx.globalAlpha=D.a;glow&&glow(gx,gy,R*1.4,'150,240,120',.35*D.m);
    for(const l of LV){const a=l.a+this.t*3.2,rr=R*(1-D.k*.85)*(.85+.15*Math.sin(this.t*4+l.a*3)),px=gx+Math.cos(a)*rr,py=gy+l.y*H*(1-D.k)+Math.sin(a)*rr*.35-Math.sin(this.t*2+l.a)*14;
      const sx=h.x+(px-h.x)*Math.min(1,D.m*1.4),sy=h.y+(py-h.y)*Math.min(1,D.m*1.4);pLeaf(sx,sy,l.s,a+1.5,l.fl,l.c);}ctx.restore();}});
  await tween(450,k=>D.m=k);await wait(900);await tween(380,k=>D.k=k);flash('170,250,140',.25,.2);ring(gx,gy,'170,250,140',110,.5);
  hit(u,t,sk);if(t.st&&t.st.foam){delete t.st.foam;popLabel(t,'HAB LEMOSVA','#cfe9a0');}
  for(let i=0;i<20;i++)part({x:gx+rnd(-40,40),y:gy+rnd(-40,40),vx:rnd(-40,40),vy:rnd(-120,-40),life:rnd(.6,1),size:rnd(4,7),rgb:'200,255,160',shape:'star'});
  await tween(300,k=>D.a=1-k);u.pose='idle';};

// --- Gyökércsapda: gyökerek törnek fel, és ketrecet fonnak az ellenfél köré – kimarad egy körből (a főellenség csak megsérül)
SK.thornroot.status=['stun',1,1];SK.thornroot.desc='Gyökerek törnek fel, és ketrecet fonnak minden ellenség köré: kimaradnak egy körből (a főellenségek nem).';
function rootCage(t,keep){const gx=cx(t),gy=t.y+t.oy+8,H=t.h*t.scale*1.15,W=Math.max(70,t.w*t.scale*.8),C={k:0,a:1};const N=7;
  effects.push({update(){if(!S.enemies.includes(t))C.a=0;if(C.k>=1&&!keep())C.a-=.04;return C.a>0;},draw(){ctx.save();ctx.globalAlpha=Math.max(0,C.a);ctx.lineCap='round';
    for(let j=0;j<N;j++){const f=j/(N-1)*2-1,sx=gx+f*W,top=gy-H,k=C.k;const pts=[];for(let i=0;i<=24;i++){const q=i/24;if(q>k)break;const x=sx+(gx-sx)*Math.pow(q,2.2)+Math.sin(q*9+j)*6,y=gy-(gy-top)*q;pts.push([x,y]);}
      if(pts.length<2)continue;for(const [lw,col] of [[15-Math.abs(f)*4,'#3a2410'],[9-Math.abs(f)*3,'#6b4423'],[3,'#9a6a3a']]){ctx.strokeStyle=col;ctx.lineWidth=lw;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
      ctx.fillStyle='#2a180a';for(let i=3;i<pts.length;i+=3){const [x,y]=pts[i];ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(j%2?13:-13),y-5);ctx.lineTo(x,y-9);ctx.fill();}
      if(pts.length>8)pLeaf(pts[8][0],pts[8][1],1.3,j,j%2?1:-1,'#5ea832');}
    ctx.restore();}});return C;}
A.thornRoots=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,220,.1);u.pose='attack';await bodyStrike(u,140,-.18);shake(14);sfx('quake');
  for(const t of ts){const C=rootCage(t,()=>t.alive&&t.st&&t.st.stun);for(let i=0;i<16;i++)part({x:cx(t)+rnd(-60,60),y:t.y+t.oy,vx:rnd(-90,90),vy:rnd(-280,-120),life:rnd(.5,.9),size:rnd(5,9),rgb:pick(['120,90,60','90,70,40']),g:600,add:false,shape:'rock'});
    tween(420,k=>C.k=k).then(()=>{hit(u,t,sk);if(!(t.st&&t.st.stun))setTimeout(()=>C.a=Math.min(C.a,.99),400);});await wait(120);}
  await wait(750);await bodySettle(u);u.pose='idle';};

// --- Élő Bambuszkéreg: bambuszfal nő a társ elé; 1 körig kisebb a sebzés, és a támadás fele visszapattan a támadóra
STATUS.bamwall=['Bambuszfal','#b8e07a'];ONE_ROUND.add('bamwall');
SK.barkskin.buff=['bamwall',2];SK.barkskin.desc='Bambuszfal nő a társ elé 1 körre: kevesebbet sérül, és a támadás fele visszapattan a támadóra.';
{const h0=hit;hit=function(u,t,sk){const r=h0.apply(this,arguments);try{if(t&&t.st&&t.st.bamwall&&u&&u.kind!==t.kind&&u.alive&&sk&&sk.kind!=='heal'&&typeof r==='number'&&r>0){
   recoil(u,Math.max(Math.round((t._bwRaw||r)*.8),Math.round((u.maxHp||100)*.1)),'VISSZAPATTAN!','#b8e07a');fxFly('bamboospear',cx(t)+40,midY(t),cx(u),midY(u),320,{size:300,arc:50});sparks(cx(t)+40,midY(t),['200,240,150','255,255,255'],24,500);shake(10);kaeLeaves(cx(t)+40,midY(t),8,200);}}catch(e){}return r;};}
A.barkCage=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';await bodyWind(u,200,.08);const gx=cx(t)+t.w*t.scale*.75,gy=t.y+t.oy+12,H=t.h*t.scale*1.2,N=6,B=[];
  for(let i=0;i<N;i++)B.push({x:gx+(i%2)*14,y:gy-(i-(N-1)/2)*0,k:0,dx:(i-(N-1)/2)*16});
  const C={a:1};effects.push({update(){if(S.over||!S.heroes.includes(t))C.a=0;if(C.ready&&!(t.alive&&t.st&&t.st.bamwall))C.fade=true;if(C.fade)C.a-=.03;return C.a>0;},draw(){ctx.save();ctx.globalAlpha=Math.max(0,C.a);
    for(const b of B){if(b.k<=0)continue;kaeStalk(b.x+b.dx*.6,gy+Math.abs(b.dx)*.25,H*(.8+.2*Math.cos(b.dx))*b.k,24,1,b.dx*.004);}ctx.restore();}});
  for(const b of B){sfx('hit');shake(5);kaeLeaves(b.x+b.dx*.6,gy-20,8,180,140);tween(240,k=>b.k=eOutBack(k));await wait(80);}
  await wait(250);flash('170,230,110',.2,.15);hit(u,t,sk);C.ready=true;popLabel(t,'BAMBUSZFAL!','#b8e07a');await wait(400);await bodySettle(u);u.pose='idle';};

// --- Vad Alakváltás: valósághű medve (rárohan, megkarmolja), teknős (behúzódik, 1 körig nem sérül), kígyó (rátekeredik, megmérgezi)
STATUS.shell=['Páncélba húzódva','#9fd08a'];ONE_ROUND.add('shell');
{const h0=hit;hit=function(u,t,sk){try{if(t&&t.st&&t.st.shell&&u&&u.kind!==t.kind&&sk&&sk.kind!=='heal'&&sk.kind!=='buff'){popLabel(t,'PÁNCÉL – NEM SÉRÜL!','#b8e07a');sfx('block');return 0;}}catch(e){}return h0.apply(this,arguments);};}
SK.wildshape.desc='Kaelen véletlenszerűen állattá változik: medve (rárohan és megkarmolja az ellenfelet), teknős (páncéljába húzódik, 1 körig nem sérül), kígyó (rátekeredik és megmérgezi).';
A.wildshape=async(u,ts,sk)=>{const t=ts[0];const f=pick(['bear','turtle','snake']);const N={bear:'MEDVEFORMA!',turtle:'TEKNŐSFORMA!',snake:'KÍGYÓFORMA!'}[f];
  popLabel(u,N,'#9be07a');sfx('roar');kaeLeaves(cx(u),midY(u),60,380);flash('150,230,90',.3,.2);
  const key={bear:'wsbear',turtle:'wsturtle',snake:'wsviper'}[f],W={bear:330,turtle:250,snake:300}[f];
  const F={x:cx(u),y:u.y+u.oy+6,a:0,s:.4,rot:0,fx:false,sy:1};const a0=u.alpha==null?1:u.alpha;
  effects.push({update(){return !F.done;},draw(){if(F.a<=0)return;ctx.save();ctx.globalAlpha=F.a;if(!kaeImg(key,F.x,F.y,W*F.s,{anchor:'bottom',rot:F.rot,fx:F.fx,sy:F.sy})){ctx.font=`${Math.round(150*F.s)}px serif`;ctx.textAlign='center';ctx.fillText({bear:'🐻',turtle:'🐢',snake:'🐍'}[f],F.x,F.y);}ctx.restore();}});
  await tween(280,k=>{u.alpha=a0*(1-k);F.a=k;F.s=.4+.6*eOutBack(k);});
  if(f==='bear'&&t&&t.alive){const hx=F.x,tx=cx(t)-W*.35;sfx('roar');await tween(340,k=>{const e=k*k;F.x=hx+(tx-hx)*e;F.y=u.y+u.oy+6-Math.sin(k*Math.PI)*40;F.rot=.06*Math.sin(k*20);});
    for(let i=0;i<3;i++){shake(12);sfx('slash');const cxp=cx(t)+rnd(-20,20),cyp=midY(t)+rnd(-30,30);
      const M={a:1};effects.push({update(){M.a-=.025;return M.a>0;},draw(){ctx.save();ctx.globalAlpha=M.a;ctx.strokeStyle='#ffffff';ctx.lineCap='round';for(let j=0;j<4;j++){ctx.lineWidth=9-j;ctx.beginPath();ctx.moveTo(cxp-50+j*22,cyp-70);ctx.quadraticCurveTo(cxp-30+j*22,cyp,cxp-10+j*22,cyp+70);ctx.stroke();}ctx.strokeStyle='rgba(200,30,30,.8)';ctx.lineWidth=3;for(let j=0;j<4;j++){ctx.beginPath();ctx.moveTo(cxp-48+j*22,cyp-66);ctx.quadraticCurveTo(cxp-28+j*22,cyp,cxp-8+j*22,cyp+66);ctx.stroke();}ctx.restore();}});
      F.rot=-.12;await wait(90);F.rot=.05;await wait(110);}
    hit(u,t,{...sk,name:'Medvekarmolás',pow:1.9});await wait(250);await tween(340,k=>{F.x=tx+(hx-tx)*k;F.rot=0;});}
  else if(f==='turtle'){addStatus(u,'shell',2);addStatus(u,'taunt',1);await tween(300,k=>F.sy=1-.12*Math.sin(k*Math.PI));shake(10);sfx('rock');for(let i=0;i<24;i++)part({x:F.x+rnd(-120,120),y:F.y,vx:rnd(-160,160),vy:rnd(-200,-60),life:.7,size:rnd(4,8),rgb:'120,100,70',g:500,add:false,shape:'rock'});
    popLabel(u,'NEM SÉRÜL 1 KÖRIG!','#b8e07a');await wait(500);}
  else if(t&&t.alive){const hx=F.x,hy=F.y;await tween(260,k=>{F.x=hx+(cx(t)-hx)*k;F.y=hy+(t.y+t.oy+6-hy)*k-Math.sin(k*Math.PI)*120;F.rot=-.3*Math.sin(k*Math.PI);});
    // rátekeredik: a kígyó a célpont köré csavarodik és összeszorít
    const T={k:0};const tw=effects.push({update(){return !T.done;},draw(){const s=1+.06*Math.sin(T.k*30);}});
    for(let i=0;i<3;i++){await tween(200,k=>{F.s=1-.18*Math.sin(k*Math.PI);F.rot=.15*Math.sin(k*Math.PI*2);});shake(8);burst(cx(t),midY(t),'150,230,80',18,220);}
    hit(u,t,{...sk,name:'Kígyómarás',pow:1.1,status:['poison',1,3]});if(Math.random()<.5)addStatus(t,'stun',1);T.done=true;
    await tween(260,k=>{F.x=cx(t)+(hx-cx(t))*k;F.y=t.y+t.oy+6+(hy-t.y-t.oy-6)*k;F.rot=0;});}
  await wait(200);kaeLeaves(F.x,F.y-100,50,340);
  if(f!=='turtle'){await tween(280,k=>{u.alpha=a0*k;F.a=1-k;});F.done=true;u.alpha=a0;}
  else{const keepT=()=>u.alive&&u.st&&u.st.shell;effects.push({update(){if(!keepT()){u.alpha=a0;F.done=true;return false;}u.alpha=0;return true;},draw(){}});}};

// --- Bambusz-gólem: igazi gólem nő ki a földből, végigtapos az ellenségeken
A.bambooGolem=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,260,.14);sfx('quake');await dimTo(.45,'10,30,5',300);const G={x:470,y:505,k:0,a:1,rot:0,W:520};
  effects.push({update(){return G.a>0;},draw(){ctx.save();ctx.globalAlpha=G.a;if(!kaeImg('bamgolem',G.x,G.y,G.W,{anchor:'bottom',sy:G.k,rot:G.rot})){for(let i=-3;i<=3;i++)kaeStalk(G.x+i*34,G.y,(380-Math.abs(i)*40)*G.k,36,1,i*.05);}ctx.restore();}});
  for(let i=0;i<50;i++)part({x:G.x+rnd(-200,200),y:G.y,vx:rnd(-200,200),vy:rnd(-420,-150),life:rnd(.7,1.1),size:rnd(7,12),rgb:pick(['120,90,60','90,70,40']),g:700,add:false,shape:'rock'});
  rumble&&rumble(1,10);shake(20);await tween(800,k=>G.k=eOutBack(k));kaeLeaves(G.x,G.y-300,60,420);await wait(250);u.pose='idle';
  for(const t of ts.filter(e=>e.alive)){const x0=G.x;await tween(320,k=>{G.x=x0+(cx(t)-120-x0)*k;G.rot=.1*Math.sin(k*Math.PI*2);G.y=505-Math.sin(k*Math.PI)*60;});
    shake(28);sfx('quake');flash('200,240,150',.35,.2);hitStop&&hitStop(90);kaeLeaves(cx(t),midY(t),40,380);ring(cx(t),t.y+t.oy,'160,220,100',170,.5);
    for(let i=0;i<20;i++)part({x:cx(t)+rnd(-80,80),y:t.y+t.oy,vx:rnd(-220,220),vy:rnd(-340,-120),life:.8,size:rnd(6,10),rgb:'120,90,60',g:700,add:false,shape:'rock'});hit(u,t,sk);await wait(200);}
  S.heroes.forEach(h=>h.alive&&addStatus(h,'defUp',2));popLabel(u,'BAMBUSZFAL!','#b8e07a');
  await tween(600,k=>{G.k=1-k*.4;G.a=1-k;});await dimTo(0,null,300);await bodySettle(u);};

// --- Négyek ereje: Kaelen bambuszlándzsát küld (eddig Jázmin tenyerét dobta)
if(typeof COMBO_PART==='object')COMBO_PART.druid={name:'Négyek ereje',tgt:'enemies',kind:'phys',pow:1.9,elem:'nature',anim:'combo'};
{const pf=palmFly;palmFly=function(x0,y0,x1,y1,ms,arc,cb){try{const h=(S.comboParty||S.heroes).find(z=>z.type==='druid'&&Math.abs(handPos(z).x-x0)<2&&Math.abs(handPos(z).y-y0)<2);
   if(h){fxFly('bamboospear',x0,y0,x1,y1,ms,{size:240,arc:40,trail:['150,220,90','200,240,140']}).then(()=>cb&&cb());return;}}catch(e){}return pf.apply(this,arguments);};}

// --- Új képességek a boltban (Kaelen eddig csak négyet tudott)
Object.assign(SK,{
  thornstorm:{name:'Tövisvihar',mp:20,cd:1,tgt:'enemies',kind:'mag',pow:1.0,elem:'nature',anim:'thornStorm',desc:'Tüskés levelek forgószele söpör végig minden ellenségen.'},
  sporecloud:{name:'Gombaspóra',mp:22,cd:2,tgt:'enemies',kind:'mag',pow:.6,elem:'poison',anim:'sporeShrooms',status:['poison',.8,3],desc:'Óriás gombák nőnek ki az ellenségek alatt, és mérgező spórát fújnak rájuk (3 kör méreg); 30% eséllyel el is alszanak.'},
  dewcircle:{name:'Harmatkör',mp:24,cd:2,tgt:'allies',kind:'heal',pow:1.3,anim:'dewCircle',desc:'Hatalmas levelekről gyógyító harmat hull az egész csapatra.'},
  oakfist:{name:'Ősi Tölgy ökle',mp:26,cd:2,tgt:'enemy',kind:'phys',pow:2.6,elem:'nature',anim:'oakFist',plateBreak:true,desc:'A földből egy ősi tölgy ágakból font ökle tör fel, és lesújt egy ellenségre. Páncélt tör.'},
  bloomrevive:{name:'Virágzó élet',mp:28,cd:3,tgt:'deadAlly',kind:'revive',pow:.6,anim:'bloomRevive',desc:'Virágok nyílnak az elesett társ körül, és 60% életerővel feltámasztják.'},
});
SHOP_SKILLS.druid.push(['thornstorm','9-4',5200],['sporecloud','10-2',5600],['dewcircle','10-4',6000],['oakfist','11-2',6600],['bloomrevive','11-4',7200]);
A.thornStorm=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,220,.12);sfx('whoosh');const h=handPos(u),{mx,my}=grp(ts);
  const P=[];for(let i=0;i<260;i++)P.push({a:rnd(0,Math.PI*2),r:rnd(10,170),y:rnd(-150,120),s:rnd(1,2),th:Math.random()<.35,c:pick(['#6cbf3a','#4d9a2a','#9bd85a','#3f8a2a'])});
  const T={x:h.x,y:h.y,k:0,a:1,t:0};effects.push({update(dt){T.t+=dt;return T.a>0;},draw(){ctx.save();ctx.globalAlpha=T.a;for(const p of P){const a=p.a+T.t*7,rr=p.r*(.3+.7*T.k),x=T.x+Math.cos(a)*rr,y=T.y+p.y*T.k+Math.sin(a)*rr*.3;
      if(p.th){ctx.fillStyle='#5a3a1a';ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+14*Math.cos(a+1.6),y+14*Math.sin(a+1.6));ctx.lineTo(x+4*Math.cos(a),y+4*Math.sin(a));ctx.fill();}else pLeaf(x,y,p.s,a,1,p.c);}ctx.restore();}});
  await tween(350,k=>T.k=k);bodyStrike(u,150,-.2);await tween(600,k=>{T.x=h.x+(mx-h.x)*k;T.y=h.y+(my-h.y)*k;});
  for(const t of ts){shake(9);sfx('slash');hit(u,t,sk);await wait(90);}await wait(500);await tween(400,k=>T.a=1-k);await bodySettle(u);u.pose='idle';};
function drawShroom(x,y,s,c){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.fillStyle='#efe6cf';ctx.strokeStyle='#3a2a18';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-9,0);ctx.quadraticCurveTo(-12,-28,-6,-40);ctx.lineTo(6,-40);ctx.quadraticCurveTo(12,-28,9,0);ctx.closePath();ctx.fill();ctx.stroke();
  ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(-34,-36);ctx.quadraticCurveTo(-30,-80,0,-82);ctx.quadraticCurveTo(30,-80,34,-36);ctx.quadraticCurveTo(0,-30,-34,-36);ctx.fill();ctx.stroke();
  ctx.fillStyle='#fff6e8';for(const [dx,dy,r] of [[-16,-58,6],[8,-66,5],[18,-48,4],[-4,-46,4]]){ctx.beginPath();ctx.arc(dx,dy,r,0,7);ctx.fill();}ctx.restore();}
A.sporeShrooms=async(u,ts,sk)=>{u.pose='cast';await bodyWind(u,220,.1);sfx('quake');
  for(const t of ts){const gx=cx(t),gy=t.y+t.oy+10,M={k:0,a:1};const list=[[-60,1.3,'#c0392b'],[0,1.9,'#8e44ad'],[55,1.1,'#c0392b']];
    effects.push({update(){return M.a>0;},draw(){ctx.save();ctx.globalAlpha=M.a;for(const [dx,s,c] of list)drawShroom(gx+dx,gy,s*M.k,c);ctx.restore();}});
    tween(300,k=>M.k=eOutBack(k)).then(async()=>{for(let i=0;i<60;i++)part({x:gx+rnd(-50,50),y:gy-110+rnd(-20,20),vx:rnd(-90,90),vy:rnd(-160,-40),life:rnd(.9,1.5),size:rnd(14,26),grow:28,rgb:pick(['190,120,230','150,200,90','220,190,240']),add:false,shape:'smoke',drag:1.4});
      hit(u,t,sk);if(t.alive&&!(t.d&&t.d.boss)&&Math.random()<.3)addStatus(t,'sleep',1);await wait(900);await tween(400,k=>M.a=1-k);});await wait(140);}
  await wait(1200);u.pose='idle';};
A.dewCircle=async(u,ts,sk)=>{u.pose='cast';sfx('heal');const xs=ts.map(cx),x0=Math.min(...xs)-90,x1=Math.max(...xs)+90,L={k:0,a:1};
  effects.push({update(){return L.a>0;},draw(){ctx.save();ctx.globalAlpha=L.a;for(let i=0;i<7;i++){const x=x0+(x1-x0)*i/6;pLeaf(x,70+Math.sin(i)*20,6*L.k,Math.PI/2+(i%2?.3:-.3),i%2?1:-1,i%2?'#5ea832':'#7cc040');}ctx.restore();}});
  await tween(400,k=>L.k=eOutBack(k));for(let i=0;i<140;i++)setTimeout(()=>part({x:rnd(x0,x1),y:90,vx:0,vy:rnd(320,460),g:200,life:1,size:rnd(4,8),rgb:pick(['180,230,255','220,250,255']),shape:'drop',add:false}),i*8);
  await wait(800);for(const t of ts)hit(u,t,sk);ring((x0+x1)/2,300,'180,240,255',200,.6);await wait(300);await tween(400,k=>L.a=1-k);u.pose='idle';};
A.oakFist=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';await bodyWind(u,240,.14);u.pose='attack';await bodyStrike(u,150,-.2);sfx('quake');shake(10);const gx=cx(t),gy=t.y+t.oy+10,F={k:0,a:1,sl:0};
  effects.push({update(){return F.a>0;},draw(){ctx.save();ctx.globalAlpha=F.a;const H=360*F.k,bx=gx-160+F.sl*120;
    ctx.translate(bx,gy);ctx.rotate(-.5+F.sl*1.1);const g=ctx.createLinearGradient(-30,0,30,0);g.addColorStop(0,'#3a2410');g.addColorStop(.5,'#7a5230');g.addColorStop(1,'#3a2410');ctx.fillStyle=g;ctx.strokeStyle='#1e1206';ctx.lineWidth=4;
    ctx.beginPath();ctx.moveTo(-34,0);ctx.quadraticCurveTo(-26,-H*.5,-40,-H);ctx.lineTo(40,-H);ctx.quadraticCurveTo(26,-H*.5,34,0);ctx.closePath();ctx.fill();ctx.stroke();
    ctx.beginPath();ctx.ellipse(0,-H-30,62,52,0,0,7);ctx.fill();ctx.stroke();for(let i=0;i<4;i++){ctx.beginPath();ctx.ellipse(-42+i*28,-H-72,15,22,0,0,7);ctx.fill();ctx.stroke();}
    for(let i=0;i<6;i++)pLeaf(-40+i*16,-H*.3-i*20,1.6,i,i%2?1:-1,'#5ea832');ctx.restore();}});
  for(let i=0;i<30;i++)part({x:gx-160+rnd(-60,60),y:gy,vx:rnd(-160,160),vy:rnd(-380,-140),life:.8,size:rnd(6,10),rgb:'120,90,60',g:700,add:false,shape:'rock'});
  await tween(420,k=>F.k=eOutBack(k));await wait(150);await tween(180,k=>F.sl=k*k);shake(30);flash('255,240,200',.4,.2);hitStop&&hitStop(110);kaeLeaves(gx,midY(t),40,400);hit(u,t,sk);
  await wait(450);await tween(400,k=>{F.k=1-k;F.a=1-k*.5;});F.a=0;u.pose='idle';};
A.bloomRevive=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='cast';sfx('heal');const gx=cx(t),gy=t.y+t.oy+6,B=[];for(let i=0;i<18;i++)B.push({x:gx+rnd(-90,90),y:gy-rnd(0,30),k:0,c:pick(['#ff9ac8','#ffd36b','#ffffff','#c99bff']),d:i*40});
  const E={a:1,t:0};effects.push({update(dt){E.t+=dt*1000;return E.a>0;},draw(){ctx.save();ctx.globalAlpha=E.a;for(const b of B){const k=Math.max(0,Math.min(1,(E.t-b.d)/300));if(!k)continue;ctx.save();ctx.translate(b.x,b.y);ctx.scale(k,k);
    ctx.fillStyle=b.c;ctx.strokeStyle='rgba(80,40,60,.7)';for(let p=0;p<5;p++){ctx.rotate(1.2566);ctx.beginPath();ctx.ellipse(0,-9,6,10,0,0,7);ctx.fill();ctx.stroke();}ctx.fillStyle='#ffd23f';ctx.beginPath();ctx.arc(0,0,4,0,7);ctx.fill();ctx.restore();}ctx.restore();}});
  await wait(1100);flash('255,230,240',.35,.25);ring(gx,midY(t),'255,200,230',140,.6);hit(u,t,sk);await wait(600);await tween(500,k=>E.a=1-k);u.pose='idle';};

// --- Idézések: a III. rész főellenségei (a legyőzésük után)
if(typeof SUMMONS==='object')SUMMONS.push(
  {id:'mochiking',name:'Mochi-király',req:'9-4',img:sprOf('mochiking'),flip:true,h:300,desc:'A Mochi-király magasra ugrik, és ráesik az ellenségekre: nagy fegyversebzés mindenkire, és habosak lesznek.',
    run:async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const {mx,gy}=grp(fs),x0=S0.x,y0=S0.y;sfx('whoosh');
      await tween(560,k=>{S0.x=x0+(mx-x0)*k;S0.y=y0+(gy+30-y0)*k-Math.sin(k*Math.PI)*380;});shake(28);sfx('quake');flash('255,250,235',.4,.2);hitStop&&hitStop(100);burst(mx,gy,'245,240,225',70,480);ring(mx,gy,'245,240,225',260,.6);
      for(const t of foesAlive()){toss&&toss(t,40,360);hit(P,t,{name:'Királyi hasraesés',kind:'phys',pow:2.3,elem:'phys',tgt:'enemies',status:['foam',.8,1]});}await wait(600);}},
  {id:'zendragon',name:'Zen-Kavics Sárkány',req:'10-4',img:sprOf('zendragon'),flip:true,h:320,desc:'Kőfelhőből kavicseső zúdul minden ellenségre: nagy földsebzés, és 1 körre gyengül a védelmük.',
    run:async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;const {mx}=grp(fs);sfx('quake');const C={a:0};
      effects.push({update(){return C.a>0||!C.done;},draw(){if(C.a<=0)return;ctx.save();ctx.globalAlpha=C.a;for(let i=0;i<9;i++){ctx.fillStyle=i%2?'#8a8478':'#a49e90';ctx.beginPath();ctx.ellipse(mx-260+i*65,70+Math.sin(i)*14,80,46,0,0,7);ctx.fill();}ctx.restore();}});
      await tween(350,k=>C.a=k);for(let i=0;i<120;i++)setTimeout(()=>part({x:mx+rnd(-280,280),y:90,vx:rnd(-30,30),vy:rnd(520,720),g:500,life:1.2,size:rnd(8,15),rgb:pick(['170,160,140','120,110,95','200,195,180']),add:false,shape:'rock'}),i*9);
      await wait(800);for(const t of foesAlive()){shake(9);hit(P,t,{name:'Kavicseső',kind:'phys',pow:2.3,elem:'earth',tgt:'enemies',status:['defDown',1,1]});await wait(90);}C.done=true;await tween(400,k=>C.a=1-k);}},
  {id:'frogking',name:'Bambusz-békakirály',req:'11-4',img:sprOf('frogking'),flip:true,h:300,desc:'Megkongatja a gongot: a hanghullám minden ellenséget megsebez, és 40% eséllyel elkábítja őket.',
    run:async(P,S0)=>{const fs=foesAlive();if(!fs.length)return;sfx('gong');const x=S0.x+60,y=S0.y-150;
      for(let i=0;i<5;i++){ring(x,y,'240,200,90',140+i*160,.7);await wait(110);}shake(18);flash('255,230,150',.3,.2);
      for(const t of foesAlive()){hit(P,t,{name:'Gongszó',kind:'mag',pow:2.0,elem:'none',tgt:'enemies',status:['stun',.4,1]});await wait(80);}await wait(500);}},
  {id:'chasen',name:'Chasen, a Békemester',req:'12-4',img:sprOf('chasen'),flip:true,h:340,desc:'Örök Zen: minden ellenség elalszik (a főellenségek nem), a csapat 30%-ot gyógyul, és lemossa a habot.',
    run:async(P,S0)=>{sfx('heal');flash('230,255,210',.35,.3);for(let i=0;i<140;i++)setTimeout(()=>part({x:rnd(80,920),y:rnd(80,520),vx:rnd(-40,40),vy:rnd(-60,-10),life:rnd(1,1.6),size:rnd(14,24),grow:20,rgb:pick(['210,240,180','240,250,230']),add:false,shape:'smoke'}),i*6);
      await wait(700);for(const t of foesAlive()){hit(P,t,{name:'Örök Zen',kind:'mag',pow:1.2,elem:'none',tgt:'enemies',status:['sleep',1,2]});await wait(90);}
      healAll(P,.3);for(const h of S.heroes)if(h.st&&h.st.foam)delete h.st.foam;await wait(600);}}
);

// --- III. rész ellenfelei: a megjegyzések szerint
if(EN_DEF.cupwarrior&&EN_DEF.cupsoldier)EN_DEF.cupwarrior.skills=EN_DEF.cupsoldier.skills.map(x=>[...x]);   // a porcelánvárosi Csészekatona képességei
if(ESK.whiskfoam)ESK.whiskfoam.name='Habzápor';
if(ESK.bambooswipe){ESK.bambooswipe.name='Habverő-pörgés';}
if(ESK.leafmend)ESK.leafmend.name='Társgyógyító levél';
if(ESK.ricecape)ESK.ricecape.name='Matchafelhő';
if(ESK.lilimend)ESK.lilimend.name='Lili gyógyítja magát';
if(ESK.calmword&&EN_DEF.lilicalm)ESK.calmword.desc='Megbékítő szavakkal elaltat egy hőst.';

// --- Méretek: a III. rész ellenfelei nagyobbak, Kaelen arányos a többi hőssel
for(const t of ['whiskimp','mochi','bambsnake','dryad','mochiking','stoneguard','mosaicghost','zencrow','zendragon','matchagolem','steamwraith','cupwarrior','frogking','teamaster','chasen','oldgolem']){const d=EN_DEF[t];if(!d)continue;const k=d.boss?1.2:1.35;d.h=Math.round(d.h*k);d.w=Math.round(d.w*k);}
if(EN_DEF.stoneguard){EN_DEF.stoneguard.h=Math.round(EN_DEF.stoneguard.h*1.15);}
Object.assign(HERO_DEF.druid,{h:252,w:100,hand:[60,-233]});
{const sp=syncParty;syncParty=function(){const r=sp.apply(this,arguments);try{for(const h of (S.roster||[]))if(h.type==='druid'){h.h=HERO_DEF.druid.h;h.w=HERO_DEF.druid.w;}}catch(e){}return r;};}
