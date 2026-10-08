// 20. kör – Espresszó idézés: a festett tűzrétegeket egybefüggő, lobogó
// lángsugárrá formáljuk. A bemért ajakpont és a sebzés időzítése megmarad.
const R20NE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
function drawDragonBeam(ctx,start,end,time,alpha=1){
  const dx=end.x-start.x,dy=end.y-start.y,len=Math.max(1,Math.hypot(dx,dy));
  const nx=-dy/len,ny=dx/len,pulse=.5+.5*Math.sin(time*17),flow=time*5.5;
  const center=q=>q*(Math.sin(flow-q*12)*7+Math.sin(time*9+q*23)*3.5);
  const widthAt=(q,tip,base,phase)=>base+(tip-base)*Math.pow(q,.9)*(1+.10*Math.sin(time*13+q*16+phase))+
    Math.sin(flow-q*25+phase)*q*tip*.12+Math.sin(time*11+q*39+phase)*q*tip*.045;
  const layer=(tip,base,edge,phase,colors)=>{
    const steps=42;
    ctx.beginPath();
    for(let i=0;i<=steps;i++){
      const q=i/steps,w=widthAt(q,tip,base,phase),c=center(q),ripple=Math.sin(flow-q*22+phase)*q*edge;
      const x=start.x+dx*q+nx*(c+w+ripple),y=start.y+dy*q+ny*(c+w+ripple);
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    for(let i=steps;i>=0;i--){
      const q=i/steps,w=widthAt(q,tip,base,phase),c=center(q),ripple=Math.sin(flow-q*22+phase+1.4)*q*edge;
      ctx.lineTo(start.x+dx*q+nx*(c-w-ripple),start.y+dy*q+ny*(c-w-ripple));
    }
    ctx.closePath();
    const g=ctx.createLinearGradient(start.x,start.y,end.x,end.y);
    for(const [at,color] of colors)g.addColorStop(at,color.replace('$a',String(alpha)));
    ctx.fillStyle=g;ctx.fill();
  };

  ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='lighter';ctx.lineJoin='round';
  ctx.shadowBlur=20;ctx.shadowColor='#ff3300';
  layer(54,4.5,8,0,[[0,'rgba(170,27,3,$a)'],[.28,'rgba(255,68,0,$a)'],[.76,'rgba(255,87,5,$a)'],[1,'rgba(255,157,18,$a)']]);
  ctx.shadowBlur=12;ctx.shadowColor='#ffb51a';
  layer(36,3,5,1.8,[[0,'rgba(255,130,14,$a)'],[.36,'rgba(255,202,30,$a)'],[1,'rgba(255,238,76,$a)']]);
  ctx.shadowBlur=8;ctx.shadowColor='#fff6bd';
  layer(10.5,1.2,2.4,3.4,[[0,'rgba(255,255,255,$a)'],[.54,'rgba(255,255,220,$a)'],[1,'rgba(255,247,0,$a)']]);

  // Apró, felszálló szikrák a hullámzó tűzperem mellett.
  ctx.shadowBlur=9;ctx.shadowColor='#ff9d16';
  for(let i=0;i<8;i++){
    const phase=(time*.72+i/8)%1,q=.14+phase*.78,side=i%2?1:-1;
    const w=widthAt(q,54,4.5,0),c=center(q),lift=phase*25;
    const x=start.x+dx*q+nx*(c+side*(w*.78+3))+Math.sin(time*8+i*2)*3;
    const y=start.y+dy*q+ny*(c+side*(w*.78+3))-lift;
    const r=1.7+(i%3)*.65;
    ctx.globalAlpha=alpha*(1-phase*.48);ctx.fillStyle=i%3?'#ff9b16':'#fff06a';
    ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }

  const ix=end.x+nx*Math.sin(time*29)*2,iy=end.y+ny*Math.sin(time*29)*2;
  const spread=48+pulse*18;
  // A becsapódás hője szélesen szétterül az ellenfélen és a talaj síkján.
  ctx.save();ctx.translate(ix,iy+24);ctx.scale(1,.42);
  const ground=ctx.createRadialGradient(0,0,2,0,0,spread*1.55);
  ground.addColorStop(0,`rgba(255,255,170,${.78*alpha})`);ground.addColorStop(.3,`rgba(255,195,18,${.68*alpha})`);
  ground.addColorStop(.72,`rgba(255,54,0,${.48*alpha})`);ground.addColorStop(1,'rgba(255,34,0,0)');
  ctx.globalAlpha=1;ctx.fillStyle=ground;ctx.beginPath();ctx.arc(0,0,spread*1.55,0,Math.PI*2);ctx.fill();ctx.restore();

  const r=17+pulse*11,impact=ctx.createRadialGradient(ix,iy,1,ix,iy,r*1.9);
  impact.addColorStop(0,`rgba(255,255,220,${.98*alpha})`);impact.addColorStop(.27,`rgba(255,247,0,${.96*alpha})`);
  impact.addColorStop(.68,`rgba(255,72,0,${.82*alpha})`);impact.addColorStop(1,'rgba(255,30,0,0)');
  ctx.shadowBlur=22;ctx.shadowColor='#ff5300';ctx.globalAlpha=1;ctx.fillStyle=impact;
  ctx.beginPath();ctx.arc(ix,iy,r*1.9,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=alpha*(.58+.38*pulse);ctx.strokeStyle='#fff36a';ctx.lineWidth=3+pulse*2.5;
  ctx.beginPath();ctx.arc(ix,iy,r,0,Math.PI*2);ctx.stroke();ctx.restore();
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
      const t=jet.time,grow=Math.min(1,t/.2),fade=jet.fade;
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
