// ===== 9. kör =====
// ---- Fénypajzs: minden hős a saját pajzsát viseli (a nagy közös pajzs félrevezető volt); egy pajzs a teljes támadást (minden ütését) kivédi
partyShield=function(){};
{const de9=drawEntity;drawEntity=function(e){de9(e);if(e.kind==='hero'&&e.alive&&e.st&&e.st.barrier&&FX_IMG.sunshield){const im=FX_IMG.sunshield,s=Math.max(130,e.h*e.scale*.95),x=cx(e)+e.w*e.scale*.42,y=midY(e);
  ctx.save();ctx.globalAlpha=.75+.15*Math.sin(T*4);ctx.translate(x,y);ctx.scale(.45,1);ctx.drawImage(im,-s/2,-s/2,s,s);ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.3;ctx.drawImage(im,-s*.55,-s*.55,s*1.1,s*1.1);ctx.restore();}};}
{const hb=hit;hit=function(u,t,sk){
  if(t&&t.alive&&t._blk&&t._blk.u===u&&performance.now()<t._blk.until&&u.kind!==t.kind&&sk&&(sk.kind==='phys'||sk.kind==='mag')){popLabel(t,'KIVÉDVE!','#ffe9a0');sparks(cx(t)+30,midY(t),['255,240,180','255,255,255'],8,240);return 0;}
  const had=t&&t.st&&t.st.barrier;const r=hb(u,t,sk);if(had&&t.st&&!t.st.barrier)t._blk={u,until:performance.now()+2500/(S.speed||1)};return r;};}
SK.lightshield.desc='Fénypajzs minden társ elé: mindenkinél kivédi a következő ellenséges támadást (több ütésből állót is), és visszaveri a támadóra. A következő kör végéig tart; amíg él, a hős előtt látszik az aranypajzs.';
