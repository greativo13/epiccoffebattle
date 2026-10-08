// 20. kör – Espresszó idézés: a festett tűzrétegeket egybefüggő, lobogó
// lángsugárrá formáljuk. A bemért ajakpont és a sebzés időzítése megmarad.
const R20NE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
class DragonFlameEmitter{
  constructor(){this.particles=[];this.accumulator=0;this.emitting=false;}
  update(dt,start,end,emit=true){
    this.emitting=!!(emit&&start&&end);
    if(this.emitting){
      this.accumulator+=dt;
      while(this.accumulator>=.05){
        this.accumulator-=.05;
        const dx=end.x-start.x,dy=end.y-start.y,len=Math.max(1,Math.hypot(dx,dy));
        for(let i=0,n=5+Math.floor(Math.random()*4);i<n;i++){
          const speed=560+Math.random()*300;
          this.particles.push({x:start.x,y:start.y,radius:5+Math.random()*3,speed,color:'#fff7c7',alpha:1,
            sx:start.x,sy:start.y,dx,dy,nx:-dy/len,ny:dx/len,len,u:0,age:0,
            maxRadius:30+Math.random()*20,seed:Math.random()*Math.PI*2,side:(Math.random()-.5)*5});
        }
      }
    }else this.accumulator=0;

    for(let i=this.particles.length-1;i>=0;i--){
      const p=this.particles[i];p.age+=dt;p.u+=p.speed*dt/p.len;
      if(p.u>=1){this.particles.splice(i,1);continue;}
      const q=p.u,swirl=Math.sin(p.age*28+p.seed)*(2+q*15)+Math.sin(p.age*17+p.seed*1.7)*q*8;
      const drift=p.side+swirl;
      p.x=p.sx+p.dx*q+p.nx*drift+Math.sin(p.age*21+p.seed)*q*3;
      p.y=p.sy+p.dy*q+p.ny*drift+Math.cos(p.age*18+p.seed)*q*3;
      p.radius=6+(p.maxRadius-6)*Math.pow(q,.78);
      p.alpha=q>.78?Math.max(0,(1-q)/.22):1;
      p.color=q<.22?'#fff7c7':q<.48?'#ffd43b':q<.72?'#ff7b16':q<.88?'#e43b12':'#58251c';
    }
  }
}

function drawDragonBeam(ctx,start,end,time,alpha=1,emitter){
  if(!emitter||!emitter.particles.length)return;
  ctx.save();ctx.shadowBlur=13;ctx.shadowColor='#ff5b10';
  for(const p of emitter.particles){
    const smoke=p.u>.78,fade=p.alpha*alpha;
    ctx.globalCompositeOperation=smoke?'source-over':'lighter';ctx.globalAlpha=fade;
    const angle=Math.atan2(p.dy,p.dx),rx=p.radius*(.62+p.u*.2),ry=p.radius*(1.05+p.u*.35);
    const g=ctx.createRadialGradient(p.x-p.dx/p.len*p.radius*.2,p.y-p.dy/p.len*p.radius*.2,1,p.x,p.y,p.radius*1.35);
    if(p.u<.22){g.addColorStop(0,'rgba(255,255,245,.98)');g.addColorStop(.28,'rgba(255,247,160,.94)');g.addColorStop(.68,'rgba(255,164,28,.72)');g.addColorStop(1,'rgba(255,80,12,0)');}
    else if(p.u<.72){g.addColorStop(0,'rgba(255,255,205,.94)');g.addColorStop(.24,'rgba(255,205,35,.94)');g.addColorStop(.62,'rgba(255,94,10,.8)');g.addColorStop(1,'rgba(170,22,8,0)');}
    else{g.addColorStop(0,'rgba(255,151,43,.72)');g.addColorStop(.38,'rgba(218,55,19,.56)');g.addColorStop(.72,'rgba(91,40,30,.32)');g.addColorStop(1,'rgba(45,29,27,0)');}
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(p.x,p.y,rx,ry,angle,0,Math.PI*2);ctx.fill();
    if(p.u<.42){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=fade*.82;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,Math.max(2,p.radius*.22),0,Math.PI*2);ctx.fill();}
  }
  if(start&&end&&emitter.emitting){
    const dx=end.x-start.x,dy=end.y-start.y,len=Math.max(1,Math.hypot(dx,dy)),nx=-dy/len,ny=dx/len;
    const pulse=.5+.5*Math.sin(time*18),x=end.x+nx*Math.sin(time*27)*3,y=end.y+ny*Math.sin(time*27)*3,r=34+pulse*20;
    ctx.globalCompositeOperation='lighter';ctx.globalAlpha=alpha*.78;ctx.shadowBlur=20;ctx.shadowColor='#ff4b08';
    const hit=ctx.createRadialGradient(x,y,1,x,y,r);hit.addColorStop(0,'rgba(255,255,210,.95)');hit.addColorStop(.3,'rgba(255,222,20,.88)');hit.addColorStop(.72,'rgba(255,67,8,.62)');hit.addColorStop(1,'rgba(255,38,0,0)');
    ctx.fillStyle=hit;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
}

{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let jaw=0;
  const image=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];es.img=image;
  es.run=async(P,S0)=>{
    const fs=foesAlive();if(!fs.length)return;const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const origin=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200};
    const mouth=()=>{const p=origin();return{x:p.x+8,y:p.y};};
    const x0=S0.x,s0=S0.s||1,hitSet=new Set(),jet={time:0,on:true,firing:false,fade:1},emitter=new DragonFlameEmitter();
    const beamState=()=>{const live=fs.filter(t=>t.alive);if(!live.length)return null;const start=mouth();
      const tx=Math.max(...live.map(cx))+75,ty=live.reduce((a,t)=>a+midY(t),0)/live.length,grow=Math.min(1,jet.time/.2);
      return{start,end:{x:start.x+(tx-start.x)*grow,y:start.y+(ty-start.y)*grow}};};
    R20NE({update(dt){jet.time+=dt;const b=jet.firing?beamState():null;emitter.update(dt,b&&b.start,b&&b.end,!!b&&jet.fade>0);return jet.on||emitter.particles.length>0;},draw(){
      const b=beamState();drawDragonBeam(ctx,b&&b.start,b&&b.end,jet.time,jet.fade,emitter);
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
