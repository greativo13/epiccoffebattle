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
        for(let i=0,n=10+Math.floor(Math.random()*7);i<n;i++){
          const speed=560+Math.random()*300;
            this.particles.push({x:start.x,y:start.y,radius:8+Math.random()*2,speed,color:'#fff7c7',alpha:1,
            sx:start.x,sy:start.y,dx,dy,nx:-dy/len,ny:dx/len,len,u:0,age:0,
            maxRadius:180+Math.random()*20,seed:Math.random()*Math.PI*2,side:(Math.random()-.5)*3});
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
      p.radius=8+(p.maxRadius-8)*Math.pow(q,.78);
      p.alpha=q>.78?Math.max(0,(1-q)/.22):1;
      p.color=q<.22?'#fff7c7':q<.48?'#ffd43b':q<.72?'#ff7b16':q<.88?'#e43b12':'#58251c';
    }
  }
}

function drawFlameTongue(ctx,p,time,size,colors,alpha){
  const ux=p.dx/p.len,uy=p.dy/p.len,nx=-uy,ny=ux;
  const flick=Math.sin(time*25+p.seed),length=size*(.82+.18*Math.sin(time*19+p.seed*1.3));
  const width=size*(.27+.045*Math.sin(time*22+p.seed)),rise=length*(.2+.1*Math.sin(time*17+p.seed));
  const tip={x:p.x+ux*length+nx*width*flick*.18,y:p.y+uy*length-rise};
  const point=(t,side,bulge,phase)=>({
    x:p.x+ux*length*t+nx*width*side*bulge+Math.sin(time*21+p.seed+phase)*width*.08,
    y:p.y+uy*length*t-rise*Math.pow(t,1.18)+ny*width*side*bulge
  });
  const left=[[.08,-.18,.1,0],[.2,-.54,.2,.7],[.34,-.32,.7,1.1],[.48,-.78,1.1,1.7],[.61,-.43,1.7,2.1],[.77,-.68,2.1,2.5],[1,0,2.8,2.8]];
  const right=[[.79,.52,3.2,3.2],[.64,.38,3.7,3.7],[.49,.72,4.1,4.1],[.33,.42,4.6,4.6],[.18,.59,5.1,5.1],[.08,.18,5.6,5.6]];
  ctx.beginPath();
  let q=point(...left[0]);ctx.moveTo(q.x,q.y);
  for(let i=1;i<left.length;i++){q=point(...left[i]);ctx.lineTo(q.x,q.y);}
  ctx.lineTo(tip.x,tip.y);
  for(const v of right){q=point(...v);ctx.lineTo(q.x,q.y);}
  ctx.closePath();
  const g=ctx.createLinearGradient(p.x,p.y,tip.x,tip.y);
  for(const [at,color] of colors)g.addColorStop(at,color);
  ctx.fillStyle=g;ctx.fill();
}

function drawDragonBeam(ctx,start,end,time,alpha=1,emitter){
  if(!emitter||!emitter.particles.length)return;
  ctx.save();ctx.shadowBlur=1;ctx.shadowColor='#7f1408';
  for(const p of emitter.particles){
    const fade=p.alpha*alpha,pulse=1+.1*Math.sin(time*15-p.u*8+p.seed),size=p.radius*pulse;
    const outer=p.u>.72
      ?[[0,'#380b12'],[.32,'#761116'],[.72,'#c3260e'],[1,'rgba(190,30,8,.08)']]
      :[[0,'#4a0b10'],[.3,'#96180d'],[.72,'#df3510'],[1,'rgba(220,54,8,.05)']];
    const middle=[[0,'#b9290d'],[.35,'#ef5b11'],[.75,'#ffb21c'],[1,'rgba(255,176,24,.08)']];
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=fade;
    drawFlameTongue(ctx,p,time,size,outer,fade);
    ctx.strokeStyle='rgba(55,7,10,.72)';ctx.lineWidth=Math.max(1.5,size*.018);ctx.stroke();
    ctx.globalCompositeOperation='screen';ctx.globalAlpha=fade*.86;
    drawFlameTongue(ctx,p,time,size*.64,middle,fade*.86);
    // A vékony fehér mag csak a száj közelében és a sugár tengelyében jelenik meg.
    if(p.u<.24||(p.u<.72&&Math.abs(p.side)<.28&&Math.sin(p.seed*31)>.25)){
      ctx.globalCompositeOperation='lighter';ctx.globalAlpha=fade*.82;
      drawFlameTongue(ctx,p,time,size*.19,[[0,'rgba(255,255,245,.95)'],[.55,'rgba(255,239,164,.92)'],[1,'rgba(255,217,74,.08)']],fade*.82);
    }
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
      const tx=Math.max(...live.map(cx))+75,ty=live.reduce((a,t)=>a+midY(t),0)/live.length;
      return{start,end:{x:tx,y:ty}};};
    R20NE({update(dt){jet.time+=dt;const b=jet.firing?beamState():null;emitter.update(dt,b&&b.start,b&&b.end,!!b&&jet.fade>0);return jet.on||emitter.particles.length>0;},draw(){
      const b=beamState();drawDragonBeam(ctx,b&&b.start,b&&b.end,jet.time,jet.fade,emitter);
    }});
    // A tiszta emitter-sugár már a szájnyitáskor elindul, nincs előtte külön tűzgolyó.
    emitter.accumulator=.05;jet.firing=true;jet.time=0;sfx('fire');
    await tween(280,k=>{jaw=easeIO(k);S0.x=x0-19*k;S0.s=s0*(1+.035*k);});
    rumble(.65,7);sfx('growl');await tween(180,k=>{S0.x=x0-19+41*eOutBack(k);});
    const loop=setInterval(()=>sfx('fire'),260),part0=part,effectsPush=effects.push;let muteBreathDraw=true;
    // A fireBreath csak a találati időzítést tartja meg: régi szájglow, füst és szikra nem rajzolódik ki.
    part=function(){return;};
    effects.push=function(effect){if(muteBreathDraw&&effect&&typeof effect.draw==='function'){effect.draw=function(){};muteBreathDraw=false;}return effectsPush.apply(this,arguments);};
    try{await fireBreath(mouth(),fs,1,{dur:1900,speed:1000,n:34,onHit:t=>{
      if(!t.alive||hitSet.has(t))return;hitSet.add(t);shake(9);hitStop(42);
      hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    }});}finally{part=part0;effects.push=effectsPush;clearInterval(loop);}
    await tween(250,k=>{jaw=1-.22*k;jet.fade=1-.12*k;});sfx('bite');
    await tween(310,k=>{jaw=.78*(1-k);S0.x=x0+28*(1-k);S0.s=s0*(1.035-.035*k);jet.fade=.88*(1-k);});
    jet.on=false;jaw=0;S0.pose='idle';
    for(const t of fs)if(t.alive&&!hitSet.has(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
  };
}}
