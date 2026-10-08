// 20. kör – Espresszó idézés: a festett tűzrétegeket egybefüggő, lobogó
// lángsugárrá formáljuk. A bemért ajakpont és a sebzés időzítése megmarad.
const R20NE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
function drawDragonBeam(ctx,start,end,time,alpha=1){
  const dx=end.x-start.x,dy=end.y-start.y,len=Math.max(1,Math.hypot(dx,dy));
  const nx=-dy/len,ny=dx/len,pulse=.5+.5*Math.sin(time*18),flicker=Math.sin(time*23)*.035;
  const cone=(width,inner=false)=>{
    const endW=width*(1+.08*Math.sin(time*13+(inner?1.2:0)));
    const wobble=inner?2.2:6.5;
    ctx.beginPath();ctx.moveTo(start.x-nx*2,start.y-ny*2);
    ctx.bezierCurveTo(start.x+dx*.34-nx*(width*.13+wobble*flicker),start.y+dy*.34-ny*(width*.13+wobble*flicker),
      end.x-dx*.18-nx*(endW*.74+wobble*Math.sin(time*12)),end.y-dy*.18-ny*(endW*.74+wobble*Math.sin(time*12)),
      end.x-nx*endW,end.y-ny*endW);
    ctx.quadraticCurveTo(end.x+dx*.015,end.y+dy*.015,end.x+nx*endW,end.y+ny*endW);
    ctx.bezierCurveTo(end.x-dx*.18+nx*(endW*.74+wobble*Math.sin(time*12+.7)),end.y-dy*.18+ny*(endW*.74+wobble*Math.sin(time*12+.7)),
      start.x+dx*.34+nx*(width*.13+wobble*flicker),start.y+dy*.34+ny*(width*.13+wobble*flicker),
      start.x+nx*2,start.y+ny*2);ctx.closePath();
    const g=ctx.createLinearGradient(start.x,start.y,end.x,end.y);
    if(inner){g.addColorStop(0,`rgba(255,255,255,${.98*alpha})`);g.addColorStop(.42,`rgba(255,255,220,${.98*alpha})`);g.addColorStop(1,`rgba(255,247,0,${.96*alpha})`);}
    else{g.addColorStop(0,`rgba(255,112,12,${.82*alpha})`);g.addColorStop(.3,`rgba(255,68,0,${.8*alpha})`);g.addColorStop(.78,`rgba(255,47,0,${.86*alpha})`);g.addColorStop(1,`rgba(255,112,0,${.9*alpha})`);}
    ctx.fillStyle=g;ctx.fill();
  };
  ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='lighter';
  ctx.shadowBlur=20;ctx.shadowColor='#ff3300';cone(52,false);
  ctx.shadowBlur=8;ctx.shadowColor='#fff0a0';cone(13,true);
  const r=15+pulse*9,ix=end.x+nx*Math.sin(time*31)*2,iy=end.y+ny*Math.sin(time*31)*2;
  const impact=ctx.createRadialGradient(ix,iy,1,ix,iy,r*1.8);
  impact.addColorStop(0,`rgba(255,255,210,${.98*alpha})`);impact.addColorStop(.28,`rgba(255,247,0,${.92*alpha})`);
  impact.addColorStop(.66,`rgba(255,78,0,${.78*alpha})`);impact.addColorStop(1,'rgba(255,30,0,0)');
  ctx.shadowBlur=18;ctx.shadowColor='#ff5a00';ctx.fillStyle=impact;ctx.beginPath();ctx.arc(ix,iy,r*1.8,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=alpha*(.55+.4*pulse);ctx.strokeStyle='#fff36a';ctx.lineWidth=2.5+pulse*2;ctx.beginPath();ctx.arc(ix,iy,r,0,Math.PI*2);ctx.stroke();ctx.restore();
}

{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let jaw=0;
  const image=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];es.img=image;
  es.run=async(P,S0)=>{
    const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const origin=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200};
    const mouth=()=>{const p=origin();return{x:p.x+8,y:p.y};};
    const x0=S0.x,s0=S0.s||1,hitSet=new Set(),jet={time:0,on:true,firing:false,fade:1};
    R20NE({update(dt){jet.time+=dt;return jet.on;},draw(){
      if(!jet.firing||jet.fade<=0)return;const p=mouth(),live=fs.filter(t=>t.alive);if(!live.length)return;
      const tx=Math.max(...live.map(cx))+75,ty=live.reduce((a,t)=>a+midY(t),0)/live.length;
      const t=jet.time,grow=Math.min(1,t/.24),fade=jet.fade;
      const end={x:p.x+(tx-p.x)*grow,y:p.y+(ty-p.y)*grow};
      drawDragonBeam(ctx,p,end,t,fade);
    }});
    sfx('fire');await tween(280,k=>{jaw=easeIO(k);S0.x=x0-19*k;S0.s=s0*(1+.035*k);});
    flash('255,168,69',.32,.1);rumble(.65,7);sfx('growl');await tween(180,k=>{S0.x=x0-19+41*eOutBack(k);});
    const loop=setInterval(()=>sfx('fire'),260),part0=part;
    // A sugár adja az összefüggő lángtestet; az alap lehelet csak a parazsat
    // és az időzített találatokat szolgáltatja, a szórt lángcsomókat elnyeljük.
    part=function(q){if(q&&q.shape==='fire')return;return part0.apply(this,arguments);};
    jet.firing=true;jet.time=0;
    try{await fireBreath(mouth(),fs,1,{dur:1900,speed:1000,n:34,onHit:t=>{
      if(!t.alive||hitSet.has(t))return;hitSet.add(t);shake(9);hitStop(42);
      hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    }});}finally{part=part0;clearInterval(loop);}
    await tween(250,k=>{jaw=1-.22*k;jet.fade=1-.12*k;});sfx('bite');
    await tween(310,k=>{jaw=.78*(1-k);S0.x=x0+28*(1-k);S0.s=s0*(1.035-.035*k);jet.fade=.88*(1-k);});
    jet.on=false;jaw=0;S0.pose='idle';
    for(const t of fs)if(t.alive&&!hitSet.has(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
  };
}}
