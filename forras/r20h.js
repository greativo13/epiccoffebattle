// 20. kör – Cerberus finomítás: lobogó lángburok, lendületesen suhanó fejek,
// fekete-lila füst és jól olvasható vágások. Az r20g jelenetet váltja fel.
const R20HE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

function r20hFlameColumn(x,feet,w,h,a,t,fold=0){
  if(a<=0)return;
  const im=R17I.firepillar;if(!im)return;
  const Hh=Math.min(h,w*im.height/im.width),Ww=Hh*im.width/im.height,spread=1-.62*fold;
  ctx.save();ctx.translate(x,feet);
  // A játék eredeti, festett lila tűzoszlopa marad a fő textúra; egy sötét
  // árnyékréteg adja a fekete peremet, az osztott képsávok pedig lobogtatják.
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
  // A láng tövénél körbefutó izzás és néhány felszálló parázsszem.
  ctx.save();ctx.globalCompositeOperation='lighter';
  const glow=ctx.createRadialGradient(0,-Hh*.08,2,0,-Hh*.08,Ww*.7);
  glow.addColorStop(0,'rgba(113,36,169,.4)');glow.addColorStop(.48,'rgba(55,9,83,.22)');glow.addColorStop(1,'rgba(8,1,15,0)');
  ctx.globalAlpha=a;ctx.fillStyle=glow;ctx.fillRect(-Ww,-Hh,Ww*2,Hh);
  ctx.save();ctx.globalCompositeOperation='lighter';
  for(let i=0;i<17;i++){
    const p=(t*.38+i*.173)%1,xx=Math.sin(i*8.31+t*1.7)*Ww*.43*spread,yy=-Hh*(.08+p*.91),r=1.3+(i%4)*.5;
    ctx.globalAlpha=a*(.16+.4*Math.sin(Math.PI*p));ctx.fillStyle=i%5===0?'#e5c4ff':'#a74be2';
    ctx.beginPath();ctx.ellipse(xx+Math.sin(t*4+i)*4,yy,r,r*1.8,0,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();ctx.restore();ctx.restore();
}

function r20hSlash(x,y,w,h,seed){
  const s={x,y,w,h,t:0,seed};
  R20HE({update(dt){s.t+=dt;return s.t<.56;},draw(){
    const k=Math.min(1,s.t/.13),fade=Math.min(1,(.56-s.t)/.2);ctx.save();ctx.translate(s.x,s.y);ctx.globalAlpha=Math.max(0,fade);
    ctx.globalCompositeOperation='source-over';ctx.lineCap='round';ctx.lineJoin='round';
    const sway=Math.sin(s.seed*4.1)*w*.08;
    for(let n=0;n<3;n++){
      const offset=(n-1)*h*.17;ctx.save();ctx.rotate(-.34+(n-1)*.045);ctx.beginPath();ctx.moveTo(-w*.46,-h*.36+offset+sway);ctx.lineTo(-w*.18,h*.05+offset);ctx.lineTo(w*.02,-h*.04+offset);ctx.lineTo(w*.24,h*.22+offset);ctx.lineTo(w*.46,h*.38+offset-sway);
      ctx.strokeStyle='rgba(3,0,7,.99)';ctx.lineWidth=(h*.2)*k;ctx.shadowColor='#08000e';ctx.shadowBlur=8;ctx.stroke();
      ctx.strokeStyle='rgba(58,8,90,.98)';ctx.lineWidth=(h*.12)*k;ctx.shadowColor='#3b075d';ctx.shadowBlur=7;ctx.stroke();
      ctx.globalCompositeOperation='lighter';ctx.strokeStyle='rgba(156,86,205,.8)';ctx.lineWidth=(h*.025)*k;ctx.shadowColor='#a348db';ctx.shadowBlur=6;ctx.stroke();ctx.restore();
    }
    ctx.restore();
  }});
}

A.cerberus=async(u,ts,sk)=>{
  const targets=ts.filter(t=>t.alive).slice().sort((a,b)=>cx(a)-cx(b));if(!targets.length)return;
  const rel=keepPose(u),im=FX_IMG.cerberus,headImg=R17I.hound,h0=u.h*u.scale*1.42,baseX=cx(u),baseY=u.y+u.oy+8;
  const left=Math.min(...targets.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...targets.map(t=>cx(t)+t.w*t.scale*.5));
  const dir=(left+right)*.5<baseX?-1:1,centerY=targets.reduce((s,t)=>s+midY(t),0)/targets.length;
  let bodyOn=true,flameOn=true,headsOn=false,finalOn=false;
  const C={a:0,s:.18,t:0,lunge:0},F={a:0,fold:0},End={a:0,t:0};
  await dimTo(.8,'9,1,18',240);sfx('dark');
  R20HE({update(dt){C.t+=dt;return bodyOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(baseX+dir*C.lunge,baseY+Math.sin(C.t*9)*2);ctx.scale(-dir,1);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const fw=Math.max(320,u.w*u.scale*3.45),fh=Math.max(430,h0*2.65);
  R20HE({update(){return flameOn;},draw(){r20hFlameColumn(baseX,baseY,fw,fh,F.a,C.t,F.fold);}});
  // A tűz Morgánától a földig felcsapja és eltakarja; Cerberus ugyanebből a
  // lángoszlopból emelkedik elő. Nincs nehezen olvasható, külön tűzgömb.
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
    r20hSlash(cx(t),midY(t),Math.max(125,t.w*t.scale*1.55),Math.max(66,t.h*t.scale*.58),i+targets.indexOf(t));
    const first=!damaged.has(t);damaged.add(t);t.hurt=.5;toss(t,58,400);sfx('bite');shake(9);hitStop(38);
    for(let j=0;j<15;j++)part({x:cx(t)+rnd(-38,38),y:midY(t)+rnd(-28,28),vx:rnd(-240,240),vy:rnd(-270,100),life:.5,size:rnd(3,7),rgb:pick(['175,57,231','241,210,255','15,2,24']),shape:'streak'});
    if(first)hit(u,t,sk);
  };
  const remember=b=>{
    b.smokeClock+=1/60;
    while(b.smokeClock>=.055){b.smokeClock-=.055;b.smoke.unshift({x:b.x-dir*b.w*.3,y:b.y+b.w*.09+rnd(-10,10),r:b.w*(.09+rnd(0,.045)),t:0,life:.42+rnd(0,.18)});}
    b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,24);
  };
  R20HE({update(dt){
    for(const b of bites){if(!b.active)continue;if(b.exiting){b.fade+=dt;b.a=Math.max(0,1-b.fade/.22);if(b.fade>=.22)b.active=false;}
      for(const p of b.smoke)p.t+=dt;b.smoke=b.smoke.filter(p=>p.t<p.life).slice(0,24);
    }
    return headsOn||bites.some(b=>b.active);
  },draw(){
    for(const b of bites){if(!b.active||b.a<=0||!b.img)continue;const hh=b.w*b.img.height/b.img.width;
      // A sűrű, fekete-lila örvény a fej mögött marad, és az átrepülés után oszlik szét.
      for(let i=b.smoke.length-1;i>=0;i--){const p=b.smoke[i],q=p.t/p.life,fade=(1-q)*.9;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=fade;
        const g=ctx.createRadialGradient(p.x,p.y,1,p.x,p.y,p.r*(.75+q*.85));g.addColorStop(0,'rgba(5,0,11,.99)');g.addColorStop(.4,'rgba(27,4,43,.96)');g.addColorStop(.72,'rgba(69,17,99,.78)');g.addColorStop(1,'rgba(19,4,29,0)');
        ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(p.x-dir*p.r*.15,p.y,p.r*(.72+q*.55),p.r*(.48+q*.32),dir*.12,0,Math.PI*2);ctx.fill();ctx.restore();
      }
      ctx.save();ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.rotate(b.angle);ctx.scale(-dir*b.stretch,(1+b.open*.12)/b.stretch);ctx.drawImage(b.img,-b.w*b.scale*.5,-hh*b.scale*.5,b.w*b.scale,hh*b.scale);ctx.restore();
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
