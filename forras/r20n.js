// 20. kör – Espresszó idézés: a festett tűzrétegeket egybefüggő, lobogó
// lángsugárrá formáljuk. A bemért ajakpont és a sebzés időzítése megmarad.
const R20NE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
function r20nFlameRibbon(L,scale,phase,time,opacity){
  const amp=q=>{const base=(4+50*Math.sin(Math.PI*Math.pow(q,.84)))*(1-.24*q);return base*(1+.12*Math.sin(time*17+q*31+phase)+.06*Math.sin(time*11+q*15));};
  const mid=q=>(Math.sin(time*15+q*20+phase)*(2+q*12)+Math.sin(time*8+q*9+phase*.7)*q*4)*scale;
  ctx.beginPath();
  for(let i=0;i<=32;i++){const q=i/32,y=mid(q)-amp(q);if(i)ctx.lineTo(L*q,y);else ctx.moveTo(0,y);}
  for(let i=32;i>=0;i--){const q=i/32;ctx.lineTo(L*q,mid(q)+amp(q));}
  ctx.closePath();
  const g=ctx.createLinearGradient(0,0,L,0);
  g.addColorStop(0,`rgba(191,35,3,${opacity*.88})`);
  g.addColorStop(.18,`rgba(255,82,4,${opacity})`);
  g.addColorStop(.52,`rgba(255,150,14,${opacity*.96})`);
  g.addColorStop(.84,`rgba(255,72,3,${opacity*.83})`);
  g.addColorStop(1,'rgba(143,17,0,0)');ctx.fillStyle=g;ctx.fill();
}
function r20nFlameTongue(L,q,side,index,time,opacity){
  const x=L*q,spread=(4+50*Math.sin(Math.PI*Math.pow(q,.84)))*(1-.24*q);
  const y=Math.sin(time*15+q*20+index*1.7)*(2+q*12)*.7;
  const len=L*(.072+(index%3)*.014)*(1-q*.22),height=8+(index%3)*5,w=7+(index%2)*2;
  const y0=y+side*spread*.78,tip=y+side*(spread+height);
  ctx.beginPath();ctx.moveTo(x,y0-w*.5);
  ctx.bezierCurveTo(x+len*.18,y+side*(spread*.86),x+len*.22,y+side*(spread+height*.72),x+len*.43,tip);
  ctx.bezierCurveTo(x+len*.53,y+side*(spread+height*.22),x+len*.68,y+side*spread*.55,x+len*.82,y+side*spread*.5);
  ctx.quadraticCurveTo(x+len*.52,y+side*spread*.73,x+len*.34,y0+w*.36);
  ctx.quadraticCurveTo(x+len*.12,y0+w*.35,x,y0-w*.5);
  ctx.closePath();const g=ctx.createLinearGradient(x,y0,x+len,tip);
  g.addColorStop(0,`rgba(255,129,8,${opacity})`);g.addColorStop(.35,`rgba(255,207,45,${opacity*.94})`);
  g.addColorStop(.72,`rgba(255,106,7,${opacity*.86})`);g.addColorStop(1,'rgba(196,25,0,0)');ctx.fillStyle=g;ctx.fill();
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
      const L=Math.max(100,Math.hypot(tx-p.x,ty-p.y)),ang=Math.atan2(ty-p.y,tx-p.x),t=jet.time;
      const grow=Math.min(1,t/.24),fade=jet.fade;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(ang);ctx.globalAlpha=fade;
      ctx.globalCompositeOperation='source-over';ctx.shadowColor='rgba(255,82,4,.58)';ctx.shadowBlur=11;
      r20nFlameRibbon(L*grow,1,0,t,.96);r20nFlameRibbon(L*grow,.68,1.9,t,.88);
      r20nFlameRibbon(L*grow,.39,3.5,t,.82);r20nFlameRibbon(L*grow,.105,5.1,t,.86);
      ctx.shadowBlur=6;for(let i=0;i<9;i++)r20nFlameTongue(L*grow,.08+i*.1,i%2?-1:1,i,t,fade*.92);
      ctx.restore();
    }});
    sfx('fire');await tween(280,k=>{jaw=easeIO(k);S0.x=x0-19*k;S0.s=s0*(1+.035*k);});
    flash('255,168,69',.32,.1);rumble(.65,7);sfx('growl');await tween(180,k=>{S0.x=x0-19+41*eOutBack(k);});
    const loop=setInterval(()=>sfx('fire'),260),part0=part;
    // A sugár adja az összefüggő lángtestet; az alap lehelet csak a parazsat
    // és az időzített találatokat szolgáltatja, a szórt lángcsomókat elnyeljük.
    part=function(q){if(q&&q.shape==='fire'&&Math.hypot((q.x||0)-mouth().x,(q.y||0)-mouth().y)<28)return;return part0.apply(this,arguments);};
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
