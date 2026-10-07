
// ===== a figurák SAJÁT testrésze mozog (bábu-animáció): a testrészt kivágjuk a képből, és az ízülete körül mozgatjuk =====
// LIMBS[képkulcs].parts[név] = {poly: sokszög a kép arányaiban, pivot: ízület}; erase: csak törlendő terület (pl. a képre rajzolt gőzfelhő)
const LIMBS={
  'espresso':{parts:{tail:{poly:[[.80,.79],[.87,.69],[.93,.62],[1,.62],[1,.88],[.93,.96],[.8,1],[.6,1],[.62,.93],[.73,.88]],pivot:[.85,.8]}}},
  'jamdjinn-attack':{order:['arm','hand'],parts:{arm:{poly:[[.24,.33],[.36,.29],[.5,.32],[.53,.5],[.36,.54],[.24,.51]],pivot:[.5,.42]},hand:{poly:[[0,.15],[.25,.13],[.3,.32],[.28,.53],[.12,.55],[0,.47]],pivot:[.25,.42]}}},
  'scorpion-attack':{parts:{tail:{poly:[[.46,.02],[.62,0],[.86,.02],[.94,.2],[.95,.45],[.88,.53],[.78,.48],[.8,.3],[.75,.16],[.64,.12],[.58,.22],[.53,.43],[.46,.41]],pivot:[.84,.48]},
     claw1:{poly:[[0,.36],[.17,.34],[.32,.41],[.41,.55],[.33,.63],[.2,.71],[.05,.76],[0,.6]],pivot:[.39,.55]},claw2:{poly:[[.31,.66],[.48,.6],[.63,.66],[.61,.8],[.51,.96],[.38,1],[.29,.92],[.33,.8]],pivot:[.55,.67]}}},
  'teddy-attack':{parts:{armL:{poly:[[0,.21],[.15,.16],[.31,.29],[.33,.5],[.2,.53],[.04,.46],[0,.38]],pivot:[.3,.38]},armR:{poly:[[.67,.22],[.8,.11],[.96,.13],[1,.3],[.9,.46],[.75,.49],[.67,.41]],pivot:[.7,.36]}}},
  'tongs-attack':{parts:{jawU:{poly:[[0,.29],[.12,.26],[.25,.32],[.34,.41],[.35,.52],[.27,.53],[.12,.49],[0,.46]],pivot:[.33,.5]},jawL:{poly:[[.03,.76],[.1,.68],[.22,.59],[.33,.52],[.37,.58],[.3,.66],[.18,.79],[.05,.86]],pivot:[.33,.54]}}},
  'gingerman-attack':{parts:{cane:{poly:[[0,.02],[.12,0],[.22,.08],[.35,.24],[.5,.41],[.53,.55],[.47,.63],[.39,.63],[.31,.5],[.29,.4],[.17,.25],[.12,.22],[.07,.25],[0,.2]],pivot:[.46,.45]}}},
  'pillowknight-attack':{parts:{pillow:{poly:[[.52,.06],[.72,.09],[.93,.17],[.93,.51],[.76,.59],[.62,.61],[.5,.56],[.45,.48],[.48,.37],[.55,.31]],pivot:[.46,.46]}}},
  'skeleton-attack':{parts:{shield:{poly:[[.62,.32],[.72,.25],[.85,.23],[.99,.26],[1,.61],[.9,.65],[.78,.61],[.7,.47],[.62,.45]],pivot:[.64,.41]}}},
  'cupsoldier-attack':{parts:{spear:{poly:[[0,.54],[.04,.47],[.15,.47],[.38,.37],[.42,.32],[.48,.34],[.49,.45],[.42,.5],[.15,.57],[.04,.63]],pivot:[.43,.42]}}},
  'bamboo-attack':{parts:{spear:{poly:[[0,.29],[.08,.26],[.2,.3],[.97,.46],[.97,.54],[.2,.4],[.08,.39],[0,.37]],pivot:[.5,.42],heal:[0,-.05]}}},
  'kamilla':{parts:{fan:{poly:[[.41,.27],[.49,.18],[.61,.18],[.67,.28],[.65,.36],[.56,.39],[.49,.43],[.44,.37]],pivot:[.5,.39]}}},
  'kamilla-attack':{parts:{fan:{poly:[[.57,0],[.89,0],[.91,.2],[.81,.3],[.75,.37],[.65,.37],[.65,.28],[.59,.2]],pivot:[.7,.34]}}},
  'cgolem-attack':{parts:{fist:{poly:[[0,.31],[.2,.29],[.35,.35],[.41,.48],[.37,.62],[.29,.73],[.1,.74],[0,.63]],pivot:[.38,.5]}}},
  'oolong-attack':{erase:[[[0,.08],[.4,.08],[.49,.32],[.41,.5],[0,.5]]],parts:{head:{poly:[[.36,.13],[.42,.03],[.55,0],[.81,0],[.83,.25],[.73,.43],[.6,.51],[.48,.51],[.4,.43],[.36,.3]],pivot:[.68,.45]}}},
};
const LIMB_CV={};
function limbCanv(key){if(LIMB_CV[key])return LIMB_CV[key];const im=ENEMY_SPR[key],D=LIMBS[key];if(!im||!D||typeof document==='undefined')return null;const W=im.width,H=im.height;
  const mk=()=>{const c=document.createElement('canvas');c.width=W;c.height=H;return c;},path=(g,pl)=>{g.beginPath();pl.forEach(([a,b],i)=>i?g.lineTo(a*W,b*H):g.moveTo(a*W,b*H));g.closePath();};
  const base=mk(),bg=base.getContext('2d');bg.drawImage(im,0,0);const parts={};
  for(const n in D.parts){const p=D.parts[n],c=mk(),g=c.getContext('2d');path(g,p.poly);g.clip();g.drawImage(im,0,0);parts[n]=c;
    bg.save();path(bg,p.poly);bg.clip();bg.clearRect(0,0,W,H);if(p.heal){bg.drawImage(im,p.heal[0]*W,p.heal[1]*H);}bg.restore();}
  for(const pl of D.erase||[]){bg.save();path(bg,pl);bg.clip();bg.clearRect(0,0,W,H);bg.restore();}
  return LIMB_CV[key]={base,parts,W,H};}
// a rajzolás: a test a testrész nélkül, aztán a testrész a saját helyzetében – ugyanabban a térben, mint a figura
function wrapLimbDraw(type){const f=DRAW[type];if(!f||f.__limb)return;const g=e=>{const L=e._limb;if(!L)return f(e);const C=limbCanv(L.key);if(!C)return f(e);
    const pose=e.pose;e.pose=L.key.endsWith('-attack')?'attack':'idle';const orig=ENEMY_SPR[L.key];ENEMY_SPR[L.key]=C.base;try{f(e);}finally{ENEMY_SPR[L.key]=orig;e.pose=pose;}
    const nm=(SPR_ALIAS[type]||type),b=ENEMY_SPR[nm];if(!b)return;const k=e.h/b.height;ctx.save();const fx=e.st&&e.st.freeze?'grayscale(.75) sepia(1) hue-rotate(160deg) saturate(2.4) brightness(1.2)':e.golden?'sepia(1) saturate(3.4) hue-rotate(-14deg) brightness(1.25)':(SPR_FX[e.type]&&SPR_FX[e.type](e));if(fx&&'filter' in ctx)ctx.filter=fx;ctx.scale(-1,1);ctx.scale(k,k);ctx.translate(-C.W/2,-C.H);
    const D=LIMBS[L.key];for(const n of D.order||Object.keys(C.parts)){const p=D.parts[n],tr=L.t[n]||{};if(tr.hide)continue;const px=p.pivot[0]*C.W,py=p.pivot[1]*C.H;if(tr.blur){tr.h=tr.h||[];tr.h.unshift({rot:tr.rot||0,dx:tr.dx||0,dy:tr.dy||0,sx:tr.sx||1,s:tr.s||1});tr.h.length=Math.min(tr.h.length,6);tr.h.slice(1).forEach((q,i)=>{ctx.save();ctx.globalAlpha*=.22*(1-i/6);ctx.translate(px+q.dx*C.W,py+q.dy*C.H);ctx.rotate(q.rot);if(q.sx!==1){const a=tr.ax||0;ctx.rotate(a);ctx.scale(q.sx,1);ctx.rotate(-a);}if(q.s!==1)ctx.scale(q.s,q.s);ctx.translate(-px,-py);ctx.drawImage(C.parts[n],0,0);ctx.restore();});}else tr.h=null;ctx.save();if(tr.a!=null)ctx.globalAlpha*=tr.a;
      ctx.translate(px+(tr.dx||0)*C.W,py+(tr.dy||0)*C.H);ctx.rotate(tr.rot||0);if(tr.sx&&tr.sx!==1){const a=tr.ax||0;ctx.rotate(a);ctx.scale(tr.sx,1);ctx.rotate(-a);}if(tr.s&&tr.s!==1)ctx.scale(tr.s,tr.s);ctx.translate(-px,-py);ctx.drawImage(C.parts[n],0,0);ctx.restore();}
    ctx.restore();};g.__limb=1;DRAW[type]=g;}
for(const key in LIMBS){const ty=key.replace('-attack','');if(DRAW[ty])wrapLimbDraw(ty);}
function limbOn(u,key){if(!LIMBS[key]||!ENEMY_SPR[key])return null;wrapLimbDraw(key.replace('-attack',''));u._limb={key,t:{}};for(const n in LIMBS[key].parts)u._limb.t[n]={};if(!u._front){u._front=true;effects.push({update(){return !!u._front;},draw(){FRONT_DRAW=true;try{drawEntity(u);}finally{FRONT_DRAW=false;}}});}return u._limb.t;}   // a többiek előtt rajzoljuk, hogy ne takarja el senki
function limbOff(u){u._limb=null;u._front=false;}
let FRONT_DRAW=false;
// képpont (a kép pixeleiben) <-> képernyő
function limbScale(u){const nm=(SPR_ALIAS[u.type]||u.type),b=ENEMY_SPR[nm];return b?u.h*u.scale/b.height:1;}
function limbBase(u){return u.y+u.oy-(u.jump||0)-(u.alive&&u.lift?u.lift*u.scale:0);}
function toImg(u,key,X,Y){const im=ENEMY_SPR[key],f=limbScale(u),m=Math.cos(u.spin||0)<0?-1:1;return {x:im.width/2+(X-cx(u))/(f*m),y:im.height-(limbBase(u)-Y)/f};}
function toScr(u,key,x,y){const im=ENEMY_SPR[key],f=limbScale(u),m=Math.cos(u.spin||0)<0?-1:1;return {x:cx(u)+(x-im.width/2)*f*m,y:limbBase(u)-(im.height-y)*f};}
// egy pont helyzete a mozgatott testrészen (a kép arányaiban megadva) – képernyőn
function limbPt(u,name,fu,fv){const L=u._limb;if(!L)return fp(u,fu,fv);const im=ENEMY_SPR[L.key],p=LIMBS[L.key].parts[name],tr=L.t[name]||{},W=im.width,H=im.height,px=p.pivot[0]*W,py=p.pivot[1]*H;
  let x=fu*W-px,y=fv*H-py;if(tr.s){x*=tr.s;y*=tr.s;}if(tr.sx&&tr.sx!==1){const a=tr.ax||0,c=Math.cos(-a),s=Math.sin(-a);let x1=x*c-y*s,y1=x*s+y*c;x1*=tr.sx;const c2=Math.cos(a),s2=Math.sin(a);x=x1*c2-y1*s2;y=x1*s2+y1*c2;}
  const r=tr.rot||0,cr=Math.cos(r),sr=Math.sin(r);const X=px+(tr.dx||0)*W+x*cr-y*sr,Y=py+(tr.dy||0)*H+x*sr+y*cr;return toScr(u,L.key,X,Y);}
// a testrész célzása: mennyit kell fordítani / nyújtani, hogy a (fu,fv) pontja a képernyő (X,Y) pontjába érjen
function limbAim(u,key,name,fu,fv,X,Y){const im=ENEMY_SPR[key],p=LIMBS[key].parts[name],W=im.width,H=im.height,px=p.pivot[0]*W,py=p.pivot[1]*H,T=toImg(u,key,X,Y);
  const a0=Math.atan2(fv*H-py,fu*W-px),a1=Math.atan2(T.y-py,T.x-px),L0=Math.hypot(fu*W-px,fv*H-py),L1=Math.hypot(T.x-px,T.y-py);let d=a1-a0;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;return {rot:d,sx:L1/Math.max(1,L0),ax:a0};}

// ---- Espresszó – Farokcsapás: odafut, megfordul, és a SAJÁT farkával nagy ívben lecsap
A.tail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d=await dashTo(u,t,220,-20);u.pose='idle';sfx('whoosh');await tween(220,k=>{u.spin=Math.PI*easeIO(k);});u.spin=Math.PI;
  const T=limbOn(u,'espresso');if(!T){u.spin=0;await dashBack(u,d);return;}const tl=T.tail;const aim=limbAim(u,'espresso','tail',.62,.97,cx(t),midY(t));const sx=Math.max(1,Math.min(1.7,aim.sx));tl.ax=aim.ax;
  // felemeli a farkát…
  await tween(260,k=>{const e=easeIO(k);tl.rot=(aim.rot-1.5)*e;tl.sx=1+(sx-1)*e*.5;});sfx('whoosh');const hist=[];const gh={on:true};
  effects.push({update(){return gh.on;},draw(){}});
  // …és lecsap vele
  await tween(150,k=>{tl.rot=aim.rot-1.5+1.5*k*k;tl.sx=1+(sx-1)*(.5+.5*k);});
  sfx('rock');hitStop(110);shake(18);flash('255,200,140',.25,.1);const P=limbPt(u,'tail',.62,.97);groundCrack(P.x,t.y+t.oy,'255,180,90',140);dustWave(P.x,t.y+t.oy);puffs(P.x,t.y+t.oy,10,['180,160,130','150,130,110'],[16,30],{w:60,up:90});sparks(cx(t),midY(t),['255,220,150','255,255,255'],20,460);toss(t,44,360);hit(u,t,sk);
  await wait(200);await tween(220,k=>{tl.rot=aim.rot*(1-k);tl.sx=sx+(1-sx)*k;});gh.on=false;limbOff(u);await tween(200,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;await dashBack(u,d);};
NOFX.add('tail');

// ---- Lekvárdzsinn – Ragacsos kéz: a SAJÁT karja nyúlik ki gumiszerűen, a keze rámarkol a hősre
A.jamHand=async(u,ts,sk)=>{const t=ts[0];if(!t)return;u.pose='attack';const K='jamdjinn-attack',T=limbOn(u,K);if(!T)return;sfx('squish');
  const d=await dashTo(u,t,300,Math.max(120,(cx(u)-cx(t))*.35));u.pose='attack';const im=ENEMY_SPR[K],W=im.width,H=im.height,sh=LIMBS[K].parts.arm.pivot,wr=LIMBS[K].parts.hand.pivot;
  const aim=limbAim(u,K,'arm',wr[0],wr[1],cx(t)+10,midY(t));const arm=T.arm,hand=T.hand;arm.ax=aim.ax;
  const setK=(k,g)=>{arm.rot=aim.rot*k;arm.sx=1+(aim.sx-1)*k;const L0=Math.hypot((wr[0]-sh[0])*W,(wr[1]-sh[1])*H),a=aim.ax+arm.rot,nx=sh[0]*W+Math.cos(a)*L0*arm.sx,ny=sh[1]*H+Math.sin(a)*L0*arm.sx;hand.dx=(nx-wr[0]*W)/W;hand.dy=(ny-wr[1]*H)/H;hand.rot=arm.rot;hand.s=1+.25*k-.15*(g||0);};
  const drip={on:true};effects.push({update(){if(drip.on&&Math.random()<.5){const p=limbPt(u,'arm',.35+rnd(-.1,.1),.45);part({x:p.x,y:p.y,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,6),rgb:'200,30,70',add:false,shape:'drop'});}return drip.on;},draw(){}});
  await tween(320,k=>setK(easeIO(k),0));sfx('squish');shake(8);await tween(160,k=>setK(1,k));
  for(let i=0;i<3;i++){t.hurt=.3;shake(6);sfx('squish');hand.s=1.1+.1*(i%2);splat(cx(t),midY(t),['200,30,70','255,120,150'],10,240,'drop');await wait(160);}
  hitStop(70);hit(u,t,sk);await wait(120);await tween(280,k=>setK(1-easeIO(k),1-k));drip.on=false;limbOff(u);await dashBack(u,d);};
NOFX.add('jamHand');

// ---- Karamellskorpió – Karamellfullánk: a SAJÁT szelvényes farka csap le; Ollócsattanás: a SAJÁT ollói csattannak
A.caramelSting=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='scorpion-attack';const d=await dashTo(u,t,240,40);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}
  const aim=limbAim(u,K,'tail',.5,.38,cx(t)+10,midY(t)),tl=T.tail;tl.ax=aim.ax;const sx=Math.max(1,Math.min(1.6,aim.sx));sfx('whoosh');
  const drip={on:true};effects.push({update(){if(drip.on&&Math.random()<.4){const p=limbPt(u,'tail',.5,.38);part({x:p.x,y:p.y,vx:0,vy:rnd(40,90),g:300,life:.6,size:rnd(3,5),rgb:'200,120,40',add:false,shape:'drop'});}return drip.on;},draw(){}});
  await tween(300,k=>{tl.rot=.35*easeIO(k);});await tween(140,k=>{tl.rot=.35+(aim.rot-.35)*k*k;tl.sx=1+(sx-1)*k;});
  sfx('needle');shake(10);hitStop(80);sparks(cx(t),midY(t),['220,140,60','255,255,255'],16,320);splat(cx(t),midY(t),['200,120,40','230,160,70'],16,260,'drop');fireBurst(cx(t),midY(t),6,[10,18],140);t.hurt=.35;hit(u,t,sk);
  await wait(200);await tween(260,k=>{tl.rot=aim.rot*(1-k);tl.sx=sx+(1-sx)*k;});drip.on=false;limbOff(u);await dashBack(u,d);};
A.scorpClaw=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='scorpion-attack';const d=await dashTo(u,t,220,20);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}
  for(let i=0;i<2;i++){await tween(130,k=>{T.claw1.rot=-.25*k;T.claw2.rot=.25*k;T.claw1.dx=T.claw2.dx=.04*k;});sfx('whoosh');
    await tween(90,k=>{T.claw1.rot=-.25+.6*k;T.claw2.rot=.25-.6*k;T.claw1.dx=T.claw2.dx=.04-.12*k;});sfx('slash');sfx('hit');shake(10);hitStop(60);sparks(cx(t),midY(t),['255,200,120','255,255,255'],14,340);t.hurt=.3;await wait(80);}
  hit(u,t,sk);await tween(160,k=>{T.claw1.rot=.35*(1-k);T.claw2.rot=-.35*(1-k);T.claw1.dx=T.claw2.dx=-.08*(1-k);});limbOff(u);await dashBack(u,d);};
NOFX.add('caramelSting');NOFX.add('scorpClaw');

// ---- Maci – Macióölelés: a SAJÁT két karjával öleli át a hőst és megszorongatja
A.bearHug=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='teddy-attack';const d=await dashTo(u,t,280,-t.w*t.scale*.25);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}sfx('growl');
  await tween(300,k=>{const e=easeIO(k);T.armL.rot=-1.25*e;T.armR.rot=2.35*e;});const s0=t.scale;
  for(let i=0;i<3;i++){sfx('squish');shake(7);t.hurt=.3;await tween(160,k=>{const q=Math.sin(k*Math.PI);t.scale=s0*(1-.08*q);T.armL.rot=-1.25-.15*q;T.armR.rot=2.35+.15*q;});drawHeartBurst(cx(t),topY(t));await wait(70);}
  t.scale=s0;hit(u,t,sk);await tween(240,k=>{T.armL.rot=-1.25*(1-k);T.armR.rot=2.35*(1-k);});limbOff(u);await dashBack(u,d);};

// ---- Csipesz-rák – Csípés: a SAJÁT cukorcsipeszének két szára összecsukódik a hősön
A.clawPinch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='tongs-attack';const d=await dashTo(u,t,220,10);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}
  await tween(140,k=>{T.jawU.rot=-.12*k;T.jawL.rot=.12*k;});await tween(110,k=>{T.jawU.rot=-.12+.42*k;T.jawL.rot=.12-.42*k;});sfx('slash');shake(8);hitStop(60);sparks(cx(t),midY(t),['255,255,255','200,210,230'],14,320);
  await tween(240,k=>{t.oy=-26*Math.sin(k*Math.PI);});for(let i=0;i<2;i++){sfx('hit');shake(5);t.hurt=.3;await tween(110,k=>{const q=Math.sin(k*Math.PI)*.08;T.jawU.rot=.3+q;T.jawL.rot=-.3-q;});}
  hit(u,t,sk);t.oy=0;await tween(150,k=>{T.jawU.rot=.3*(1-k);T.jawL.rot=-.3*(1-k);});limbOff(u);await dashBack(u,d);};

// ---- Mézeskalács-bandita – Cukorpálca-ütés: a SAJÁT cukorpálcáját lendíti a két kezével
A.caneHook=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='gingerman-attack';const d=await dashTo(u,t,220,30);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const c=T.cane;
  sfx('whoosh');await tween(200,k=>{c.rot=.45*easeIO(k);});await tween(150,k=>{c.rot=.45-2.05*k*k;});sfx('hit');shake(11);hitStop(80);sparks(cx(t),midY(t),['255,80,90','255,255,255'],18,380);
  fallDebris(cx(t),midY(t),8,(px,py,r,s)=>{ctx.fillStyle=pick(['#ffffff','#e0203a']);ctx.save();ctx.translate(px,py);ctx.rotate(r);ctx.fillRect(-5*s,-3*s,10*s,6*s);ctx.restore();},{v:280});
  await tween(220,k=>{t.ox=30*Math.sin(k*Math.PI);});t.ox=0;toss(t,30,280);hit(u,t,sk);await tween(200,k=>{c.rot=-1.6*(1-k);});limbOff(u);await dashBack(u,d);};

// ---- Párnalovag – Párnacsapás: a SAJÁT párnáját a feje fölött átlendítve csapja le; Tollvihar: a saját párnáját hajítja fel
A.pillowBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='pillowknight-attack';const d=await dashTo(u,t,240,30);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const p=T.pillow;
  sfx('whoosh');await tween(220,k=>{p.rot=.3*easeIO(k);p.s=1+.3*k;});await tween(180,k=>{p.rot=.3-2.75*k*k;});sfx('hit');sfx('boing');shake(12);hitStop(80);const x=cx(t),y=midY(t);
  for(let i=0;i<40;i++){const f={x:x+rnd(-30,30),y:y+rnd(-40,20),vx:rnd(-260,260),vy:rnd(-320,-40),r:rnd(0,6),t:0,s:rnd(.8,1.4)};effects.push({update(dt){f.t+=dt;f.vy+=150*dt;f.vx*=.96;f.x+=f.vx*dt+Math.sin(f.t*6)*1.5;f.y+=f.vy*dt;f.r+=dt*3;return f.t<1.8;},draw(){ctx.save();ctx.globalAlpha=Math.min(1,(1.8-f.t)*2);drawFeather(f.x,f.y,f.r,f.s);ctx.restore();}});}
  puffs(x,y,6,['255,255,255','235,232,250'],[16,26]);t.hurt=.4;toss(t,30,300);hit(u,t,sk);await wait(150);await tween(240,k=>{p.rot=-2.45*(1-k);p.s=1.3-.3*k;});limbOff(u);await dashBack(u,d);};
A.featherStorm=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const K='pillowknight-attack';u.pose='attack';const T=limbOn(u,K);const xs=al.map(cx),mx=(Math.min(...xs)+Math.max(...xs))/2,top=Math.min(...al.map(topY))-90;
  if(T){const p=T.pillow,im=ENEMY_SPR[K],pv=LIMBS[K].parts.pillow.pivot;sfx('whoosh');await tween(200,k=>{p.rot=.3*k;});const tgt=toImg(u,K,mx,top),dx=(tgt.x-pv[0]*im.width)/im.width,dy=(tgt.y-pv[1]*im.height)/im.height;
    await tween(480,k=>{p.rot=.3+k*8;p.dx=dx*k;p.dy=dy*k-Math.sin(k*Math.PI)*.4;p.s=1+.2*k;});p.hide=true;}
  sfx('boom');sfx('wind');flash('255,255,255',.3,.1);
  const F=[];for(let i=0;i<120;i++)F.push({a:rnd(0,6.28),r:rnd(20,60),y:top,vy:rnd(-40,40),s:rnd(.7,1.3),sp:rnd(3,5)*(Math.random()<.5?1:-1),rot:rnd(0,6)});const st={t:0,on:true,W:(Math.max(...xs)-Math.min(...xs))/2+120};
  effects.push({update(dt){st.t+=dt;for(const f of F){f.a+=f.sp*dt;f.r=Math.min(st.W,f.r+dt*220);f.y+=(H*.6-f.y)*dt*1.2+f.vy*dt;f.rot+=dt*4;}return st.on;},draw(){for(const f of F)drawFeather(mx+Math.cos(f.a)*f.r,f.y+Math.sin(f.a)*f.r*.3,f.rot,f.s);}});
  const bz=setInterval(()=>sfx('wind'),400);await wait(1100);clearInterval(bz);for(let i=0;i<3;i++){for(const t of al){t.hurt=.3;sparks(cx(t),midY(t),['255,255,255','230,225,250'],6,200);}sfx('hit');shake(5);await wait(150);}
  hitAll(u,al,sk);st.on=false;for(const f of F){const q={x:mx+Math.cos(f.a)*f.r,y:f.y,vx:rnd(-200,200),vy:rnd(-100,60),r:f.rot,t:0};effects.push({update(dt){q.t+=dt;q.vy+=120*dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.r+=dt*3;return q.t<1;},draw(){ctx.save();ctx.globalAlpha=1-q.t;drawFeather(q.x,q.y,q.r,1);ctx.restore();}});}
  // új párna nő a kezébe
  if(T){const p=T.pillow;p.hide=false;p.dx=p.dy=0;p.rot=0;await tween(300,k=>{p.s=.2+.8*k;p.a=k;});}limbOff(u);u.pose='idle';};

// ---- Csontváz – Pajzscsapás: a SAJÁT kerek pajzsát rántja maga elé, és azzal kólint
A.shieldBash=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='skeleton-attack';const d0=await dashTo(u,t,220,30);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d0);return;}const sh=T.shield;
  await tween(200,k=>{const e=easeIO(k);sh.dx=-.62*e;sh.dy=.03*e;sh.rot=-.15*e;});sfx('whoosh');await tween(90,k=>{sh.dx=-.62-.2*k;sh.rot=-.15+.1*k;});
  sfx('hit');sfx('rock');shake(14);hitStop(100);flash('255,240,200',.25,.08);const x=cx(t),y=midY(t);soundBlast(x+20,y,'255,230,170',120,350);sparks(x,y,['255,240,200','255,255,255','200,200,210'],18,380);puffs(x,t.y+t.oy,5,['190,170,140'],[12,20]);
  const birds={t:0};effects.push({update(dt){birds.t+=dt;return birds.t<1;},draw(){for(let i=0;i<3;i++){const a=birds.t*6+i*2.1;ctx.save();ctx.globalAlpha=Math.min(1,(1-birds.t)*3);ctx.fillStyle='#ffe070';ctx.beginPath();for(let j=0;j<10;j++){const aa=j*.628,r=j%2?3:8;ctx.lineTo(x+Math.cos(a)*30+Math.cos(aa)*r,topY(t)-6+Math.sin(a)*8+Math.sin(aa)*r);}ctx.fill();ctx.restore();}}});
  toss(t,34,300);hit(u,t,sk);await wait(150);await tween(220,k=>{sh.dx=-.82*(1-k);sh.dy=.03*(1-k);sh.rot=-.05*(1-k);});limbOff(u);await dashBack(u,d0);};

// ---- Csészekatona – Kanáldöfés: a SAJÁT kanállándzsáját döfi háromszor
A.spoonStab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='cupsoldier-attack';sfx('whoosh');const d=await dashTo(u,t,200,70);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const s=T.spear;
  const im=ENEMY_SPR[K],tip=toImg(u,K,cx(t),midY(t)),a=Math.atan2(.54*im.height-.42*im.height,0-.43*im.width),reach=Math.max(.05,((.43*im.width)-tip.x)/im.width*.0+.18);
  for(let i=0;i<3&&t.alive;i++){await tween(110,k=>{s.dx=.06*k;});sfx(i===2?'hit':'slash');await tween(80,k=>{s.dx=.06-(.06+reach)*k;s.dy=Math.sin(a)*reach*k*.5;});shake(i===2?10:5);
    sparks(cx(t),midY(t)+rnd(-20,20),['255,255,255','210,220,235'],14,360);splat(cx(t),midY(t),['150,90,40','190,130,60'],8,220,'drop');t.hurt=.3;if(i===2){hitStop(80);toss(t,26,260);hit(u,t,sk);}await tween(120,k=>{s.dx=-reach*(1-k);s.dy=Math.sin(a)*reach*.5*(1-k);});}
  limbOff(u);await dashBack(u,d);};

// ---- Bambuszőr – Bambuszdöfés: a SAJÁT lándzsáját hajítja el (a kezéből eltűnik, aztán új bambusz nő a kezébe)
A.bambooJab=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='bamboo-attack';u.pose='attack';const T=limbOn(u,K);if(!T)return;const s=T.spear,im=ENEMY_SPR[K],pv=LIMBS[K].parts.spear.pivot;
  sfx('whoosh');await tween(220,k=>{s.dx=.12*easeIO(k);s.rot=.08*k;u.ox=10*k;});const tg=toImg(u,K,cx(t)+60,midY(t)),dx=(tg.x-.02*im.width)/im.width,dy=(tg.y-.33*im.height)/im.height;
  sfx('slash');await tween(300,k=>{s.dx=.12+(dx-.12)*k;s.dy=dy*k-Math.sin(k*Math.PI)*.15;s.rot=.08-.08*k;u.ox=10*(1-k);});
  sfx('hit');shake(9);hitStop(70);sparks(cx(t),midY(t),['200,240,150','255,255,255'],16,380);puffs(cx(t),t.y+t.oy,5,'190,170,130',[10,18]);toss(t,28,280);hit(u,t,sk);
  await tween(250,k=>{s.a=1-k;});s.hide=true;await wait(150);s.hide=false;s.dx=0;s.dy=0;s.rot=0;await tween(300,k=>{s.a=k;s.s=.6+.4*k;});limbOff(u);u.pose='idle';};

// ---- Kristálygólem – Kristályököl: a SAJÁT ökle kristálytüskéket növeszt, és előrecsapódik
{const cp=A.crystalPunch;A.crystalPunch=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='cgolem-attack';u.pose='attack';const T=limbOn(u,K);if(!T)return cp(u,ts,sk);sfx('ice');const F={k:0,on:true},f=T.fist;
  const cl=[];for(let i=0;i<9;i++)cl.push({u:rnd(.02,.3),v:rnd(.33,.7),a:-Math.PI+rnd(-1.4,1.4),l:rnd(.6,1.3)});
  effects.push({update(){return F.on;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';const c=limbPt(u,'fist',.15,.52);glow(c.x,c.y,70*F.k,'150,230,255',.6);ctx.restore();for(const q of cl){const p=limbPt(u,'fist',q.u,q.v),L=F.k*q.l;if(L>.05)drawCrystal(p.x+Math.cos(q.a)*10*L,p.y+Math.sin(q.a)*10*L,q.a+Math.PI/2,L*1.3);}}});
  await tween(450,k=>{F.k=easeIO(k);f.s=1+.15*k;});sfx('glass');const d=await dashTo(u,t,200,40);u.pose='attack';await tween(90,k=>{f.dx=-.22*k;});
  sfx('rock');sfx('glass');shake(20);hitStop(120);flash('200,240,255',.45,.15);const x=cx(t),y=midY(t);soundBlast(x,y,'150,230,255',220,500);shardBurst(x,y,16,'150,230,255',420,.9);
  sparks(x,y,['200,245,255','255,255,255'],26,560);groundCrack(x,t.y+t.oy,'150,230,255',130);toss(t,46,360);hit(u,t,sk);await wait(200);await tween(160,k=>{f.dx=-.22*(1-k);});F.on=false;limbOff(u);await dashBack(u,d);};}

// ---- Öreg Oolong – Sárkányharapás: a SAJÁT feje lódul előre, és ráharap
A.dragonBite=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const K='oolong-attack';const d=await dashTo(u,t,240,10);u.pose='attack';const T=limbOn(u,K);if(!T){await dashBack(u,d);return;}const h=T.head;sfx('growl');
  // hátrahúzza a fejét, majd a nyakát megnyújtva előrevágja és ráharap
  await tween(220,k=>{const e=easeIO(k);h.rot=.3*e;h.dx=.03*e;});h.ax=Math.atan2(.3-.45,.42-.68);
  await tween(120,k=>{h.rot=.3-.5*k;h.dx=.03-.1*k;h.sx=1+.25*k;h.s=1+.08*k;});sfx('bite');sfx('hit');shake(14);hitStop(110);flash('255,255,255',.2,.08);sparks(cx(t),midY(t),['255,255,255','200,240,220'],20,380);t.hurt=.4;
  for(let i=0;i<2;i++){await tween(90,k=>{h.rot=-.2+.1*Math.sin(k*Math.PI);});shake(6);}hit(u,t,sk);await tween(220,k=>{h.rot=-.2*(1-k);h.dx=-.07*(1-k);h.sx=1.25-.25*k;h.s=1.08-.08*k;});limbOff(u);await dashBack(u,d);};

// ---- Kamilla – Legyezőhurrikán: a SAJÁT legyezőjét lendíti meg (nagyobbra nyitva); az idézésnél is
A.fanHurricane=async(e,ts,sk)=>{const al=ts.filter(h=>h.alive);if(!al.length)return;const K='kamilla-attack';e.pose='cast';const T=limbOn(e,K);const f=T&&T.fan;sfx('wind');
  if(f){await tween(300,k=>{f.rot=.35*easeIO(k);f.s=1+.5*k;});await tween(200,k=>{f.rot=.35-2.5*k*k;});}shake(10);flash('245,250,255',.25,.1);const px=cx(e)-e.w*e.scale*.3;
  const st={t:0,x:px-100};effects.push({update(dt){st.t+=dt;st.x-=1200*dt;for(let i=0;i<10;i++)part({x:st.x+rnd(-60,60),y:rnd(H*.25,H*.88),vx:-rnd(600,1000),vy:rnd(-60,60),life:.45,size:rnd(1.5,3),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
      for(let i=0;i<4;i++){const a=st.t*12+i*1.57;part({x:st.x+Math.cos(a)*60,y:H*.6+Math.sin(a)*120,vx:-rnd(400,700),vy:rnd(-150,50),life:.9,size:rnd(5,8),rgb:pick(['255,250,235','255,230,120','120,180,70']),add:false,shape:'leaf'});}return st.x>-200;},draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(st.x,H*.58);ctx.scale(1.4,1.2);glow(0,0,200,'230,240,255',.3);ctx.restore();}});
  const done=new Set();await tween(900,k=>{for(const t of al)if(!done.has(t)&&st.x<cx(t)+40){done.add(t);shake(8);sfx('hit');tween(500,q=>{t.ox=-90*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);}).then(()=>{t.ox=0;});hit(e,t,sk);}});
  for(const t of al)if(!done.has(t)&&t.alive)hit(e,t,sk);if(f)await tween(260,k=>{f.rot=-2.15*(1-k);f.s=1.5-.5*k;});limbOff(e);e.pose='idle';};
// az idézett Kamilla is a saját legyezőjét lendíti (a figurát itt mi rajzoljuk ki, a legyezőt külön mozgatva)
{const km=SUMMONS.find(x=>x.id==='kamilla');if(km){const r0=km.run;km.run=async(P,S0)=>{const im=km.img&&km.img(),key=im===ENEMY_SPR['kamilla-attack']?'kamilla-attack':im===ENEMY_SPR.kamilla?'kamilla':null,C=key&&limbCanv(key);if(!C)return r0(P,S0);
    const D=LIMBS[key].parts.fan,F={rot:0,s:1,on:true,hist:[]};const a0=S0.a;S0.a=0;
    const drawK=(rot,s,al)=>{const Hh=(km.h||280)*S0.s,W2=Hh*C.W/C.H,k=Hh/C.H;ctx.save();ctx.globalAlpha=al;ctx.translate(S0.x,S0.y+Math.sin(T*3)*4);if(km.flip)ctx.scale(-1,1);ctx.translate(-W2/2,-Hh);ctx.scale(k,k);
      if(al>=1)ctx.drawImage(C.base,0,0);const px=D.pivot[0]*C.W,py=D.pivot[1]*C.H;ctx.translate(px,py);ctx.rotate(rot);ctx.scale(s,s);ctx.translate(-px,-py);ctx.drawImage(C.parts.fan,0,0);ctx.restore();};
    effects.push({update(){F.hist.unshift(F.rot);F.hist.length=Math.min(5,F.hist.length);return F.on;},draw(){if(F.fast)F.hist.slice(1).forEach((r,i)=>drawK(r,F.s,.18*(1-i/5)));drawK(F.rot,F.s,1);}});
    await tween(300,k=>{F.rot=.35*easeIO(k);F.s=1+.6*k;});F.fast=true;sfx('whoosh');await tween(220,k=>{F.rot=.35-2.6*k*k;});F.fast=false;sfx('wind');flash('240,248,255',.3,.15);shake(12);
    const gust={x:S0.x+150,on:true};effects.push({update(dt){gust.x+=1500*dt;for(let i=0;i<12;i++)part({x:gust.x+rnd(-80,60),y:rnd(H*.2,H*.88),vx:rnd(700,1200),vy:rnd(-40,40),life:.45,size:rnd(1.5,3.2),rgb:pick(['255,255,255','230,240,255']),shape:'streak'});
        for(let i=0;i<4;i++)part({x:gust.x,y:rnd(H*.35,H*.88),vx:rnd(500,900),vy:rnd(-120,20),life:.9,size:rnd(5,8),rgb:pick(['255,250,235','255,230,120']),add:false,shape:'leaf'});
        if(Math.random()<.7)part({x:gust.x-40,y:rnd(H*.6,H*.9),vx:rnd(300,600),vy:-rnd(10,60),life:.9,size:rnd(14,26),grow:30,rgb:'230,236,245',add:false,shape:'smoke'});return gust.on&&gust.x<W+200;},
      draw(){ctx.save();ctx.globalCompositeOperation='lighter';ctx.translate(gust.x-80,H*.58);ctx.scale(1.5,1.1);glow(0,0,220,'230,240,255',.35);ctx.restore();}});
    const foes=foesAlive(),done=new Set(),x0=S0.x+150;await tween(900,k=>{const gx=x0+1500*k*.9;for(const t of foes)if(!done.has(t)&&gx>cx(t)-40){done.add(t);shake(10);sfx('hit');sparks(cx(t),midY(t),['255,255,255','230,240,255'],18,440);
        tween(520,q=>{t.ox=130*Math.sin(Math.min(1,q*1.6)*Math.PI/2)*(1-Math.max(0,q-.6)/.4);}).then(()=>{t.ox=0;});hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});}});
    for(const t of foes)if(!done.has(t)&&t.alive)hit(P,t,{name:'Legyezőszél',kind:'phys',pow:2.6,elem:'phys',tgt:'enemies'});gust.on=false;await tween(300,k=>{F.rot=-2.25*(1-k);F.s=1.6-.6*k;});F.on=false;S0.a=a0;};}}

{const deF=drawEntity;drawEntity=function(e){if(e&&e._front&&!FRONT_DRAW)return;return deF.apply(this,arguments);};}
