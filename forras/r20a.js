// ===== 20. kör (Codex) – a felhasználó által jónak ítélt két jelenet megtartva: Cerberus (r20h) és Teaszertartás (r20l). A többi Codex-változtatás visszaállítva.
// 20. kör – Cerberus finomítás: láng nélküli átváltozás, lendületesen suhanó fejek,
// gomolygó fekete-lila füst és jól olvasható vágások. Az r20g jelenetet váltja fel.
const R20HE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

function r20hFlameColumn(x,feet,w,h,a,t,fold=0){
  if(a<=0)return;
  const im=R17I.firepillar;if(!im)return;
  const Hh=Math.min(h,w*im.height/im.width),Ww=Hh*im.width/im.height,spread=1-.62*fold;
  ctx.save();ctx.translate(x,feet);
  for(const L of [{dx:-.055,sx:1.08,a:.68,filter:'brightness(.2) saturate(.72) contrast(1.32)',phase:1.7},{dx:0,sx:1,a:.92,filter:'brightness(.58) saturate(.92) contrast(1.12)',phase:0}]){
    ctx.save();ctx.globalAlpha=a*L.a;ctx.filter=L.filter;
    const bands=20,bh=Hh/bands;
    for(let i=0;i<bands;i++){
      const sy=i*im.height/bands,sh=im.height/bands+1,q=1-i/(bands-1);
      const sway=Math.sin(t*7.4-q*5.1+L.phase)*w*.055*q*(1-.2*fold),width=Ww*L.sx*spread*(.92+.08*Math.sin(t*4.5+q*4));
      ctx.drawImage(im,0,sy,im.width,sh,L.dx*Ww+sway-width*.5,-Hh+i*bh,width,bh+1.2);
    }
    ctx.restore();
  }
  ctx.save();ctx.globalCompositeOperation='lighter';
  const glow=ctx.createRadialGradient(0,-Hh*.08,2,0,-Hh*.08,Ww*.7);
  glow.addColorStop(0,'rgba(113,36,169,.4)');glow.addColorStop(.48,'rgba(55,9,83,.22)');glow.addColorStop(1,'rgba(8,1,15,0)');
  ctx.globalAlpha=a;ctx.fillStyle=glow;ctx.fillRect(-Ww,-Hh,Ww*2,Hh);
  for(let i=0;i<17;i++){
    const p=(t*.38+i*.173)%1,xx=Math.sin(i*8.31+t*1.7)*Ww*.43*spread,yy=-Hh*(.08+p*.91),r=1.3+(i%4)*.5;
    ctx.globalAlpha=a*(.16+.4*Math.sin(Math.PI*p));ctx.fillStyle=i%5===0?'#e5c4ff':'#a74be2';
    ctx.beginPath();ctx.ellipse(xx+Math.sin(t*4+i)*4,yy,r,r*1.8,0,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();ctx.restore();
}

A.cerberus=async(u,ts,sk)=>{
  const targets=ts.filter(t=>t.alive).slice().sort((a,b)=>cx(a)-cx(b));if(!targets.length)return;
  u._cerb=false;
  const rel=keepPose(u),im=FX_IMG.cerberus,headImg=R17I.hound,h0=u.h*u.scale*1.42,baseX=cx(u),baseY=u.y+u.oy+8;
  const left=Math.min(...targets.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...targets.map(t=>cx(t)+t.w*t.scale*.5));
  const dir=(left+right)*.5<baseX?-1:1,centerY=targets.reduce((s,t)=>s+midY(t),0)/targets.length;
  let bodyOn=true,flameOn=true,headsOn=false,finalOn=false;
  const C={a:0,s:.18,t:0,lunge:0},F={a:0,fold:0},End={a:0,t:0};
  await dimTo(.8,'9,1,18',240);sfx('dark');
  R20HE({update(dt){C.t+=dt;return bodyOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(baseX+dir*C.lunge,baseY+Math.sin(C.t*9)*2);ctx.scale(-dir,1);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const fw=Math.max(320,u.w*u.scale*3.45),fh=Math.max(430,h0*2.65);
  R20HE({update(){return flameOn;},draw(){r20hFlameColumn(baseX,baseY,fw,fh,F.a,C.t,F.fold);}});
  sfx('fire');sfx('wail');rumble(1.2,9);
  await tween(420,k=>{F.a=easeIO(k);});
  await tween(360,k=>{F.a=1;u.alpha=1-.88*easeIO(k);});u.alpha=0;
  await tween(190,k=>{F.fold=eOutBack(k);});
  flash('170,86,246',.62,.16);sfx('roar');shake(14);
  await tween(620,k=>{C.a=easeIO(k);C.s=.16+.84*eOutBack(k);C.lunge=dir*24*k;F.a=1-.88*easeIO(k);F.fold=1-.5*k;});
  await tween(150,k=>{F.a=.12*(1-k);});flameOn=false;

  const Wd=Math.max(h0*1.68,270),headData=[[.18,.24],[.12,.49],[.22,.72]];
  const bites=headData.map(([px,py],i)=>({img:headImg,x:baseX+dir*h0*(.62-px),y:baseY-h0*(1-py),sx:baseX+dir*h0*(.62-px),sy:centerY+(i-1)*Math.min(24,h0*.13),w:Wd,a:0,open:0,scale:.7,stretch:1,angle:0,active:false,exiting:false,fade:0,smoke:[],smokeClock:0}));
  const damaged=new Set();
  const hitFoe=(t,i)=>{
    if(!t.alive)return;
    const first=!damaged.has(t);damaged.add(t);t.hurt=.5;toss(t,58,400);sfx('bite');shake(9);hitStop(38);
    for(let j=0;j<15;j++)part({x:cx(t)+rnd(-38,38),y:midY(t)+rnd(-28,28),vx:rnd(-240,240),vy:rnd(-270,100),life:.5,size:rnd(3,7),rgb:pick(['175,57,231','241,210,255','15,2,24']),shape:'streak'});
    if(first)hit(u,t,sk);
  };
  const remember=b=>{
    b.smokeClock+=1/60;
    while(b.smokeClock>=.085){
      b.smokeClock-=.085;
      // Egymásba olvadó, különálló gömbök: széles, térbeli füstpamacs,
      // nem a fej mozgásával párhuzamos, vékony csík.
      const x=b.x-dir*b.w*(.28+rnd(0,.12)),y=b.y+b.w*rnd(-.08,.18);
      for(let n=0;n<3;n++)b.smoke.unshift({x:x+dir*b.w*rnd(-.13,.13),y:y+b.w*rnd(-.14,.14),vx:-dir*b.w*rnd(.12,.3),vy:-b.w*rnd(.08,.24),r:b.w*(.11+rnd(0,.07)),t:0,life:.72+rnd(0,.34),seed:rnd(0,Math.PI*2)});
    }
    b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,72);
  };
  R20HE({update(dt){
    for(const b of bites){if(!b.active)continue;if(b.exiting){b.fade+=dt;b.a=Math.max(0,1-b.fade/.22);if(b.fade>=.22)b.active=false;}
      for(const p of b.smoke){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy-=b.w*.07*dt;}b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,72);
    }
    return headsOn||bites.some(b=>b.active);
  },draw(){
    for(const b of bites){if(!b.active||b.a<=0||!b.img)continue;const hh=b.w*b.img.height/b.img.width;
      // Többrétegű, gomolygó füstfelhők a fej mögött; a mozgó, elnyúló
      // középpontok és az eltérő méretű lobok szétbontják a csíkhatást.
      for(let i=b.smoke.length-1;i>=0;i--){const p=b.smoke[i],q=p.t/p.life,fade=(1-q)*.78,r=p.r*(.82+q*.76);ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=fade;
        for(let l=0;l<2;l++){const rr=r*(1-l*.18),angle=p.seed+l*2.1+q*5,ox=Math.sin(angle)*rr*.34,oy=Math.cos(angle*1.37)*rr*.27;
          const g=ctx.createRadialGradient(p.x+ox-rr*.18,p.y+oy-rr*.14,rr*.025,p.x+ox,p.y+oy,rr);g.addColorStop(0,'rgba(4,2,9,.98)');g.addColorStop(.48,'rgba(12,5,20,.9)');g.addColorStop(.76,'rgba(48,14,69,.58)');g.addColorStop(1,'rgba(22,5,34,0)');
          const points=[];for(let j=0;j<9;j++){const a=angle+j*Math.PI*2/9,bulge=.78+.17*Math.sin(p.seed+j*2.31+l)+.08*Math.cos(p.seed*1.7+j*1.43);points.push([p.x+ox+Math.cos(a)*rr*bulge,p.y+oy+Math.sin(a)*rr*bulge*.76]);}
          ctx.fillStyle=g;ctx.beginPath();for(let j=0;j<points.length;j++){const cur=points[j],next=points[(j+1)%points.length],mx=(cur[0]+next[0])*.5,my=(cur[1]+next[1])*.5;if(j===0)ctx.moveTo(mx,my);ctx.quadraticCurveTo(cur[0],cur[1],mx,my);}ctx.closePath();ctx.fill();}
        ctx.restore();
      }
      ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.rotate(b.angle);ctx.scale(-dir*b.stretch,(1+b.open*.12)/b.stretch);
      // A forráskép hátsó, hosszú lila ecsetcsóvája csíknak látszott.
      // A fejet változatlan pixelméretben tartjuk, a mögötte maradó részt a
      // külön animált, fekete-lila gomolyfüst veszi át.
      const cropX=Math.min(60,Math.max(0,b.img.width-1)),cropW=Math.min(b.img.width-cropX,390),cropH=b.img.height;
      ctx.drawImage(b.img,cropX,0,cropW,cropH,-b.w*b.scale*.255,-hh*b.scale*.5,b.w*b.scale*(cropW/b.img.width),hh*b.scale);ctx.restore();
    }
  }});

  const launchHead=async(b,i)=>{
    if(i)await wait(i*225); // a fejek külön pillanatban indulnak, de a füstös kifutásuk átfedhet
    b.active=true;b.exiting=false;b.fade=0;b.smoke=[];b.smokeClock=0;b.x=b.sx;b.y=b.sy;b.a=0;b.scale=.72;b.stretch=1;b.open=.72;
    const headHalf=b.w*.5,start=dir>0?left-headHalf*.5:right+headHalf*.5,finish=dir>0?right+headHalf*.85:left-headHalf*.85;
    sfx('growl');rumble(.3,6);
    await tween(125,k=>{const e=1-Math.pow(1-k,3);b.a=e;b.x=b.sx+(start-b.sx)*e;b.y=b.sy-Math.sin(k*Math.PI)*32;b.scale=.72+.28*e;b.stretch=1+.22*Math.sin(k*Math.PI);b.angle=dir*.035*Math.sin(k*Math.PI);remember(b);});
    flash('171,73,242',.2,.055);sfx('whoosh');
    await tween(430,k=>{
      const e=1-Math.pow(1-k,4),oldX=b.x;b.x=start+(finish-start)*e;b.y=b.sy-Math.sin(k*Math.PI)*28+Math.sin(k*12)*5;
      b.open=.68+.32*Math.sin(k*Math.PI*3);b.scale=1+.06*Math.sin(k*Math.PI);b.stretch=1.13+.23*Math.sin(k*Math.PI);b.angle=dir*(.025+.055*Math.sin(k*Math.PI*2));remember(b);
      for(const t of targets){if(!t.alive)continue;const crossed=dir>0?oldX<cx(t)&&b.x>=cx(t):oldX>cx(t)&&b.x<=cx(t);if(crossed&&Math.abs(b.y-midY(t))<Math.max(78,t.h*t.scale*.86))hitFoe(t,i);}
      C.lunge=dir*Math.sin(k*Math.PI)*33;
    });
    for(const t of targets)if(t.alive)hitFoe(t,i);
    // Nem kell megvárni a fej eltűnését: a következő már indul, ez pedig füstté foszlik.
    b.exiting=true;b.fade=0;b.stretch=1.16;b.angle=dir*.08;
    await wait(120);
  };
  headsOn=true;await Promise.all(bites.map((b,i)=>launchHead(b,i)));
  while(bites.some(b=>b.active))await wait(35);
  headsOn=false;C.lunge=0;
  R20HE({update(dt){End.t+=dt;return finalOn;},draw(){if(End.a<=0)return;r20hFlameColumn(baseX,baseY,fw,fh,End.a,End.t,.25);}});
  finalOn=true;sfx('fire');sfx('wail');sfx('boom');rumble(1.1,8);flash('156,47,230',.4,.16);
  await tween(420,k=>{End.a=eOutBack(k);});
  await tween(390,k=>{const e=easeIO(k);C.a=1-e;C.s=1-.5*e;u.alpha=e;});
  u.alpha=1;bodyOn=false;await bodySettle(u);await tween(520,k=>{End.a=1-easeIO(k);});finalOn=false;await dimTo(0,null,300);rel();
};

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
