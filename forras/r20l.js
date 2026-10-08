// 20. kör – Teaszertartás: sűrűbb, függőleges eső és látványosabb,
// élethűen gördülő tea-hullám. A festett felhő megjelenése változatlan.
const R20LE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

A.teaCeremony=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);
  const minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5));
  const floor=Math.max(...al.map(t=>t.y+t.oy))+6;
  const originX=cx(u)-u.w*u.scale*.34;
  const cloudImg=R17I.teacloud,cloudW=Math.min(470,Math.max(320,W*.46));
  const cloudH=cloudImg?cloudW*cloudImg.height/cloudImg.width:210;
  const cloud={x:cx(u),y:Math.max(78,topY(u)-cloudH*.52-18),w:cloudW,h:cloudH,t:0,a:0,s:.68,rain:0,pool:0,on:true};
  const drops=Array.from({length:126},(_,i)=>({
    x:cloud.x-205+(i%18)*22.8,
    delay:Math.floor(i/18)*.14+(i%18)*.028,
    dur:rnd(.94,1.12),r:rnd(7.5,11.5),phase:rnd(0,6.28)
  }));
  const Wv={x:originX,y:floor,w:55,a:1,t:0,on:false};
  const teaw=R17I.teawave,done=new Set();

  R20LE({update(dt){cloud.t+=dt;Wv.t+=dt;return cloud.on||Wv.on;},draw(){
    const t=cloud.t;
    if(cloud.a>0){
      const bob=Math.sin(t*1.25)*2.5;
      ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(cloud.x,cloud.y+bob);ctx.scale(cloud.s,cloud.s);
      if(cloudImg){
        ctx.save();ctx.globalAlpha*=.24;ctx.filter='brightness(.34) saturate(.75)';ctx.drawImage(cloudImg,-cloud.w*.5+4,-cloud.h*.5+14,cloud.w,cloud.h);ctx.restore();
        ctx.shadowColor='rgba(66,35,20,.42)';ctx.shadowBlur=19;
        ctx.drawImage(cloudImg,-cloud.w*.5,-cloud.h*.5,cloud.w,cloud.h);
      }
      ctx.restore();
    }
    // Sok, borostyánszínű teacsepp függőlegesen esik, enyhe légellenállással.
    if(cloud.rain>0){for(const d of drops){
      const age=t-d.delay;if(age<0||age>d.dur)continue;
      const q=Math.min(1,age/d.dur),r=d.r*(1-.18*q);
      const x=d.x+Math.sin(q*Math.PI*2+d.phase)*1.2;
      const y=cloud.y+cloud.h*.34+(floor-15-(cloud.y+cloud.h*.34))*q;
      const alpha=cloud.rain*Math.min(1,age/.1)*Math.min(1,(d.dur-age)/.12);
      ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);
      const dg=ctx.createLinearGradient(-r,-r*1.5,r,r*1.5);
      dg.addColorStop(0,'rgba(255,244,211,.98)');dg.addColorStop(.18,'rgba(247,195,113,.98)');dg.addColorStop(.62,'rgba(183,103,37,.98)');dg.addColorStop(1,'rgba(84,42,20,.98)');
      ctx.fillStyle=dg;ctx.beginPath();ctx.moveTo(0,-r*1.8);
      ctx.bezierCurveTo(-r*.18,-r*1.15,-r*.94,-r*.12,-r*.82,r*.55);
      ctx.bezierCurveTo(-r*.72,r*1.35,r*.68,r*1.48,r*.86,r*.55);
      ctx.bezierCurveTo(r*.96,-r*.1,r*.2,-r*1.18,0,-r*1.8);ctx.closePath();ctx.fill();
      ctx.strokeStyle='rgba(255,230,184,.58)';ctx.lineWidth=1.15;ctx.stroke();
      ctx.globalAlpha*=.78;ctx.fillStyle='rgba(255,250,225,.92)';ctx.beginPath();ctx.ellipse(-r*.26,r*.24,r*.11,r*.34,-.12,0,6.29);ctx.fill();ctx.restore();
    }}
    // A tócsává összeálló tea a felhő alatti eső teljes sávját befogja.
    if(cloud.pool>0){const pw=90+cloud.pool*300,px=cloud.x;
      ctx.save();ctx.globalAlpha=cloud.pool;ctx.translate(px,floor-13);
      const pg=ctx.createLinearGradient(0,-45,0,14);pg.addColorStop(0,'#ffe8b5');pg.addColorStop(.32,'#d08a43');pg.addColorStop(1,'#63351c');
      ctx.fillStyle=pg;ctx.beginPath();ctx.moveTo(-pw*.5,9);
      ctx.bezierCurveTo(-pw*.52,-12,-pw*.38,-19,-pw*.27,-13);ctx.bezierCurveTo(-pw*.17,-42,-pw*.06,-24,0,-31);
      ctx.bezierCurveTo(pw*.12,-44,pw*.17,-17,pw*.28,-23);ctx.bezierCurveTo(pw*.4,-30,pw*.48,-10,pw*.5,9);
      ctx.quadraticCurveTo(0,20,-pw*.5,9);ctx.fill();ctx.strokeStyle='rgba(255,239,197,.84)';ctx.lineWidth=3;
      ctx.beginPath();ctx.ellipse(0,2,pw*.44,8,0,0,Math.PI);ctx.stroke();ctx.restore();
    }
    if(Wv.on&&Wv.a>0){
      const h=teaw?Wv.w*teaw.height/teaw.width:Wv.w*.78;
      const bob=Math.sin(Wv.t*3.4)*6;
      ctx.save();ctx.globalAlpha=Wv.a;ctx.translate(Wv.x,Wv.y+bob);
      ctx.scale(1+.018*Math.sin(Wv.t*2.8),1+.075*Math.sin(Wv.t*3.2));
      if(teaw){
        // Sűrű képszeletekben a taraj és az örvény különböző ütemben gördül,
        // így a festett forma és a kamillavirágok együtt mozognak a folyadékkal.
        const slices=88,sw=teaw.width/slices,left=-Wv.w*.35,top=-h*.96;
        for(let i=0;i<slices;i++){
          const q=i/(slices-1),sx=i*sw,srcW=Math.min(sw+1,teaw.width-sx);
          const envelope=.32+.68*Math.sin(q*Math.PI);
          const ripple=Math.sin(Wv.t*9.2-q*11.4)*27+Math.sin(Wv.t*5.1-q*6.2)*13;
          const curl=Math.sin(Wv.t*3.6+q*5.3)*8;
          ctx.drawImage(teaw,sx,0,srcW,teaw.height,left+q*Wv.w,top+(ripple+curl)*envelope,Wv.w/slices+1,h);
        }
      }else r16Wave(Wv.x,Wv.y,Wv.w*.4,Wv.w,Wv.t,Wv.a);
      ctx.restore();
    }
  }});

  try{
    await dimTo(.28,'38,24,16',230);await bodyWind(u,260,.1);sfx('holy');
    await tween(520,k=>{cloud.a=k;cloud.s=.68+.32*eOutBack(k);});
    sfx('water');
    await tween(2000,k=>{cloud.rain=Math.min(1,k*3.2);cloud.pool=Math.min(1,Math.max(0,(k-.38)/.5));});
    Wv.on=true;sfx('splash');
    await tween(430,k=>{const e=eOutBack(k);Wv.x=originX;Wv.y=floor;Wv.w=55+300*e;Wv.a=1;});
    const goal=minX-350;
    await tween(1500,k=>{
      const e=easeIO(k);Wv.x=originX+(goal-originX)*e;Wv.y=floor;Wv.w=355+330*Math.min(1,k*1.7);Wv.a=1;
      for(const t of al)if(t.alive&&!done.has(t)&&Wv.x<cx(t)+24){
        done.add(t);shake(12);hitStop(70);toss(t,68,450);t.hurt=.46;
        splat(cx(t),midY(t),['226,157,73','255,236,190'],24,390,'drop');hit(u,t,sk);
      }
    });
    for(const t of al)if(t.alive&&!done.has(t))hit(u,t,sk);
    await tween(420,k=>{Wv.a=1-k;cloud.a=1-k;cloud.pool=1-k;});
    cloud.on=false;Wv.on=false;await bodySettle(u);await dimTo(0,null,280);
  }finally{rel();}
};
