// 20. kör – Teaszertartás: felhő Kamilla fölött, teacsepp-eső, majd a
// korábban bevált, Kamillától balra végigsöprő festett tea-hullám.
const R20JE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

A.teaCeremony=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;const rel=keepPose(u);
  const minX=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5));
  const floor=Math.max(...al.map(t=>t.y+t.oy))+6;
  const originX=cx(u)-u.w*u.scale*.34;
  const cloud={x:cx(u),y:Math.max(92,topY(u)-104),t:0,a:0,s:.55,rain:0,pool:0,on:true};
  const drops=Array.from({length:48},(_,i)=>({
    x:cloud.x-142+(i%12)*26+rnd(-8,8),
    endX:originX+rnd(-30,30),
    delay:(i%12)*.068+Math.floor(i/12)*.28,
    dur:rnd(.82,1.02),r:rnd(10,15),sway:rnd(4,13),phase:rnd(0,6.28)
  }));
  const Wv={x:originX,y:floor,w:55,a:1,t:0,on:false};
  const teaw=R17I.teawave,done=new Set();

  R20JE({update(dt){cloud.t+=dt;Wv.t+=dt;return cloud.on||Wv.on;},draw(){
    const t=cloud.t;
    if(cloud.a>0){
      // Rétegzett, teás árnyalatú felhő közvetlenül Kamilla felett.
      ctx.save();ctx.globalAlpha=cloud.a;ctx.translate(cloud.x,cloud.y);ctx.scale(cloud.s,cloud.s);
      ctx.shadowColor='rgba(31,20,31,.34)';ctx.shadowBlur=19;
      const cg=ctx.createLinearGradient(0,-68,0,62);
      cg.addColorStop(0,'#fffaf4');cg.addColorStop(.48,'#e6d9cc');cg.addColorStop(1,'#a99082');
      ctx.fillStyle=cg;ctx.strokeStyle='rgba(255,248,237,.94)';ctx.lineWidth=6;
      ctx.beginPath();ctx.moveTo(-168,27);
      ctx.bezierCurveTo(-204,14,-190,-37,-151,-42);
      ctx.bezierCurveTo(-145,-91,-84,-102,-51,-70);
      ctx.bezierCurveTo(-24,-124,48,-117,69,-72);
      ctx.bezierCurveTo(124,-91,177,-58,164,-16);
      ctx.bezierCurveTo(209,5,185,48,132,52);
      ctx.quadraticCurveTo(-20,76,-145,53);
      ctx.quadraticCurveTo(-180,48,-168,27);ctx.closePath();ctx.fill();ctx.stroke();
      ctx.shadowBlur=0;ctx.globalAlpha*=.30;ctx.strokeStyle='#fff';ctx.lineWidth=8;
      for(let i=0;i<4;i++){const x=-112+i*65+Math.sin(t*1.3+i)*4;ctx.beginPath();ctx.ellipse(x,1,48,17,0,Math.PI,Math.PI*2);ctx.stroke();}
      ctx.restore();
    }
    // Minden csepp hegyes, alul gömbölyű könnycsepp-formát kap.
    if(cloud.rain>0){for(const d of drops){
      const age=t-d.delay;if(age<0||age>d.dur)continue;
      const q=Math.min(1,age/d.dur),e=q*q*(3-2*q);
      const x0=d.x,x1=d.endX,y0=cloud.y+48,y1=floor-15;
      const x=x0+(x1-x0)*e+Math.sin(q*Math.PI*2+d.phase)*d.sway;
      const y=y0+(y1-y0)*q;
      const r=d.r*(1-.24*q),alpha=cloud.rain*Math.min(1,age/.12)*Math.min(1,(d.dur-age)/.1);
      ctx.save();ctx.globalAlpha=alpha;ctx.translate(x,y);ctx.rotate(.08*Math.sin(t*5+d.phase));
      const dg=ctx.createLinearGradient(-r,-r*1.6,r,r*1.4);
      dg.addColorStop(0,'#fff0c7');dg.addColorStop(.34,'#e0a050');dg.addColorStop(1,'#713817');
      ctx.fillStyle=dg;ctx.strokeStyle='rgba(255,238,202,.98)';ctx.lineWidth=2.4;
      ctx.beginPath();ctx.moveTo(0,-r*1.65);
      ctx.bezierCurveTo(-r*.28,-r*.92,-r*1.02,-r*.10,-r*.88,r*.48);
      ctx.bezierCurveTo(-r*.66,r*1.45,r*.67,r*1.45,r*.9,r*.48);
      ctx.bezierCurveTo(r*1.02,-r*.1,r*.28,-r*.92,0,-r*1.65);
      ctx.closePath();ctx.fill();ctx.stroke();
      ctx.globalAlpha*=.72;ctx.fillStyle='#fff0cf';ctx.beginPath();ctx.ellipse(-r*.26,r*.34,r*.14,r*.37,-.25,0,6.29);ctx.fill();
      ctx.restore();
    }}
    // A lehulló tea Kamilla előtt gyűlik össze, mielőtt hullámmá emelkedik.
    if(cloud.pool>0){const pw=70+cloud.pool*165;
      ctx.save();ctx.globalAlpha=cloud.pool;ctx.translate(originX,floor-13);
      const pg=ctx.createLinearGradient(0,-54,0,13);pg.addColorStop(0,'#ffe4a7');pg.addColorStop(.38,'#c47a36');pg.addColorStop(1,'#713b1b');
      ctx.fillStyle=pg;ctx.beginPath();ctx.moveTo(-pw*.5,8);
      ctx.bezierCurveTo(-pw*.55,-12,-pw*.27,-13,-pw*.18,-34);
      ctx.bezierCurveTo(-pw*.05,-55,pw*.02,-29,pw*.13,-38);
      ctx.bezierCurveTo(pw*.27,-53,pw*.49,-28,pw*.5,8);
      ctx.quadraticCurveTo(0,20,-pw*.5,8);ctx.fill();
      ctx.strokeStyle='rgba(255,238,194,.8)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(0,2,pw*.39,7,0,0,Math.PI);ctx.stroke();ctx.restore();
    }
    if(Wv.on&&Wv.a>0){
      const h=teaw?Wv.w*teaw.height/teaw.width:Wv.w*.78;
      ctx.save();ctx.globalAlpha=Wv.a;ctx.translate(Wv.x,Wv.y);ctx.scale(1,1+.025*Math.sin(Wv.t*8));
      if(teaw)ctx.drawImage(teaw,-Wv.w*.35,-h*.96,Wv.w,h);
      else r16Wave(Wv.x,Wv.y,Wv.w*.4,Wv.w,Wv.t,Wv.a);
      ctx.restore();
    }
  }});

  try{
    await dimTo(.28,'38,24,16',230);await bodyWind(u,260,.1);sfx('holy');
    await tween(460,k=>{cloud.a=k;cloud.s=.55+.45*eOutBack(k);});
    sfx('water');
    await tween(2000,k=>{cloud.rain=Math.min(1,k*3.2);cloud.pool=Math.min(1,Math.max(0,(k-.42)/.55));});
    Wv.on=true;sfx('splash');
    // A korábbi hullám mozdulatát tartjuk meg: Kamillától indul, balra söpör.
    await tween(430,k=>{const e=eOutBack(k);Wv.x=originX;Wv.y=floor;Wv.w=55+250*e;Wv.a=1;});
    const goal=minX-330;
    await tween(1500,k=>{
      const e=easeIO(k);Wv.x=originX+(goal-originX)*e;Wv.y=floor;Wv.w=305+300*Math.min(1,k*1.7);Wv.a=1;
      for(const t of al)if(t.alive&&!done.has(t)&&Wv.x<cx(t)+24){
        done.add(t);shake(12);hitStop(70);toss(t,68,450);t.hurt=.46;
        splat(cx(t),midY(t),['226,157,73','255,236,190'],24,390,'drop');hit(u,t,sk);
      }
    });
    for(const t of al)if(t.alive&&!done.has(t))hit(u,t,sk);
    await tween(380,k=>{Wv.a=1-k;cloud.a=1-k;cloud.pool=1-k;});
    cloud.on=false;Wv.on=false;await bodySettle(u);await dimTo(0,null,280);
  }finally{rel();}
};
NOFX.add('teaCeremony');
