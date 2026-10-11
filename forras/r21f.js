
// ===== 23. kör, 2. rész: a kígyó a SAJÁT farkával csap (testrész a képéből kivágva) =====
LIMBS.bambsnake={parts:{tail:{poly:[[.66,.8],[.78,.74],[.92,.72],[1,.76],[1,.93],[.9,.99],[.74,.97],[.64,.9]],pivot:[.7,.87]}}};
if(DRAW.bambsnake)wrapLimbDraw('bambsnake');
A.snakeTail=async(u,ts,sk)=>{const t=ts[0];if(!t)return;const d={dx:0,dy:0};u.pose='idle';sfx('whoosh');
  await tween(240,k=>{u.spin=Math.PI*easeIO(k);u.sq=1-.08*Math.sin(k*Math.PI);});u.spin=Math.PI;u.sq=1;
  const T=limbOn(u,'bambsnake');if(!T){u.spin=0;return;}const tl=T.tail;tl.blur=true;
  const aim=limbAim(u,'bambsnake','tail',.98,.84,cx(t)+10,midY(t)+10);const S1=2.3,sx=Math.max(1,Math.min(3.2,aim.sx/S1));tl.ax=aim.ax;
  await tween(320,k=>{const e=easeIO(k);tl.rot=(aim.rot-1.8)*e;tl.s=1+(S1-1)*e;u.lean=.12*e;u.jump=10*e;});sfx('whoosh');
  await tween(170,k=>{const e=eOutBack(k);tl.rot=aim.rot-1.8+1.8*e;tl.sx=1+(sx-1)*Math.min(1,k*1.4);u.lean=.12-.26*e;u.jump=10*(1-k);});
  sfx('rock');hitStop(110);shake(20);flash('210,240,160',.25,.1);const P=limbPt(u,'tail',.98,.84);groundCrack(P.x,t.y+t.oy,'200,220,140',150);dustWave(P.x,t.y+t.oy);
  puffs(P.x,t.y+t.oy,12,['180,170,130','150,140,110'],[18,32],{w:70,up:100});kaeLeaves(cx(t),midY(t),26,340);toss(t,40,340);hit(u,t,sk);
  await wait(200);await tween(320,k=>{const e=easeIO(k);tl.rot=aim.rot*(1-e);tl.sx=sx+(1-sx)*e;tl.s=S1+(1-S1)*e;u.lean=-.14*(1-e);});tl.blur=false;limbOff(u);u.lean=0;
  await tween(240,k=>{u.spin=Math.PI*(1-easeIO(k));});u.spin=0;};
