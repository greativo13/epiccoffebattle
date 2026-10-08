// 20. kör – Cerberus: festett lángburok, gömbszerű átváltozás és három egyszerre támadó fej.
// Az r20f rajzrétege helyett ez az egyetlen Cerberus-jelenet fut; a korábbi definíciók nem maradnak aktívak.
const R20GE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

function r20gFlameShell(x,feet,w,h,a,t,orb=0){
  if(a<=0)return;
  const im=R17I.firepillar;
  ctx.save();ctx.translate(x,feet);ctx.globalAlpha=a;
  // A meglévő festett lángoszlop képe adja az egyenetlen, ecsetes peremet és a valódi lángtextúrát.
  if(im){
    const ih=Math.min(h,w*im.height/im.width),iw=ih*im.width/im.height;
    const layers=[
      {x:-.24,sx:.76,sy:.86,r:-.075,al:.58,f:'grayscale(1) sepia(1) hue-rotate(240deg) saturate(5) brightness(.42)'},
      {x:.2,sx:.8,sy:1.02,r:.06,al:.68,f:'grayscale(1) sepia(1) hue-rotate(225deg) saturate(5) brightness(.6)'},
      {x:0,sx:1,sy:1,r:0,al:.9,f:'grayscale(1) sepia(1) hue-rotate(235deg) saturate(4) brightness(.8)'}
    ];
    for(const L of layers){ctx.save();ctx.globalAlpha=a*L.al;ctx.filter=L.f;ctx.translate(L.x*w,-ih*.47);ctx.rotate(L.r*Math.sin(t*1.8+L.x*12));ctx.drawImage(im,-iw*L.sx/2,-ih*L.sy*.52,iw*L.sx,ih*L.sy);ctx.restore();}
  }
  // A láng belsejének változó fénye és a feláramló parázs egészíti ki a festett textúrát.
  ctx.save();ctx.globalCompositeOperation='lighter';
  const pulse=.5+.5*Math.sin(t*4.1),halo=ctx.createRadialGradient(0,-h*.45,2,0,-h*.45,w*(.16+.08*pulse));
  halo.addColorStop(0,`rgba(205,137,255,${.28+.12*pulse})`);halo.addColorStop(.36,'rgba(112,37,183,.25)');halo.addColorStop(1,'rgba(13,3,24,0)');
  ctx.fillStyle=halo;ctx.fillRect(-w*.58,-h,w*1.16,h);
  for(let i=0;i<13;i++){
    const ph=t*2.2+i*2.399,life=.5+.5*Math.sin(ph*1.37),px=Math.sin(ph*1.51)*w*.3,py=-h*(.12+.78*life);
    ctx.globalAlpha=a*(.18+.36*life);ctx.fillStyle=i%4===0?'#f0d6ff':'#b15ee8';
    ctx.beginPath();ctx.ellipse(px,py,1.6+life*2.2,3+life*4.5,Math.sin(ph)*.65,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
  // Átváltozáskor a burok egyetlen, gömbszerű tűzmagba húzódik, majd széles koronaként lobban szét.
  if(orb>0){
    const cy=-h*(.53+.025*Math.sin(t*3)),rx=w*(.21+.045*orb),ry=h*(.19+.03*orb);
    ctx.save();ctx.globalCompositeOperation='lighter';
    const g=ctx.createRadialGradient(0,cy,2,0,cy,rx*1.55);g.addColorStop(0,'rgba(230,186,255,.94)');g.addColorStop(.22,'rgba(156,65,226,.95)');g.addColorStop(.64,'rgba(58,12,94,.96)');g.addColorStop(1,'rgba(9,2,18,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,cy,rx*1.55,ry*1.55,0,0,Math.PI*2);ctx.fill();ctx.restore();
    // a festett oszlop szélesített és felfelé fordított másolatai adják a gömb lángos, nem geometriai szélét
    if(im){const iw=w*.72,ih=iw*im.height/im.width;for(let i=0;i<5;i++){const an=i/5*Math.PI*2+t*.3;ctx.save();ctx.globalAlpha=a*(.5+.16*Math.sin(t*3+i));ctx.filter='grayscale(1) sepia(1) hue-rotate(232deg) saturate(5) brightness(.78)';ctx.translate(Math.cos(an)*rx*.63,cy+Math.sin(an)*ry*.45);ctx.rotate(an+Math.PI/2);ctx.drawImage(im,-iw*.27,-ih*.55,iw*.54,ih*.75);ctx.restore();}}
  }
  ctx.restore();
}

A.cerberus=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;
  const rel=keepPose(u),im=FX_IMG.cerberus,h0=u.h*u.scale*1.42,baseX=cx(u),baseY=u.y+u.oy+8;
  let actorFlame=true,bodyOn=true,headsOn=false,finalOn=false;
  const C={a:0,s:.18,t:0},F={a:0,orb:0},End={a:0,t:0};
  await dimTo(.78,'10,1,19',260);sfx('dark');
  R20GE({update(dt){C.t+=dt;return bodyOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(baseX,baseY+Math.sin(C.t*3.8)*2);ctx.scale(-1,1);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const fw=Math.max(300,u.w*u.scale*3.35),fh=Math.max(380,h0*2.5);
  R20GE({update(){return actorFlame;},draw(){r20gFlameShell(baseX,baseY,fw,fh,F.a,C.t,F.orb);}});
  sfx('fire');sfx('wail');rumble(1.25,9);
  await tween(760,k=>{F.a=easeIO(Math.min(1,k*1.25));});
  // Tűzmag először szűk és fényes, majd széles koronává nő; Morgána csak az izzó gömbben tűnik el.
  await tween(460,k=>{F.orb=eOutBack(k);F.a=1;});
  await tween(340,k=>{u.alpha=1-k;F.orb=1;});u.alpha=0;
  flash('160,64,228',.5,.2);sfx('roar');shake(12);
  await tween(420,k=>{F.orb=1-.72*k;});
  await tween(700,k=>{C.a=k;C.s=.18+.82*eOutBack(k);F.a=.84*(1-k);F.orb=.28*(1-k);});actorFlame=false;
  await tween(170,k=>{F.a=.14*(1-k);});

  const targets=al.filter(t=>t.alive).slice().sort((a,b)=>cx(a)-cx(b));
  const headImg=R17I.hound,left=Math.min(...targets.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...targets.map(t=>cx(t)+t.w*t.scale*.5));
  const dir=(left+right)*.5<baseX?-1:1,startX=dir<0?right-45:left+45,endX=dir<0?left-100:right+100;
  const centerY=targets.reduce((s,t)=>s+midY(t),0)/targets.length,Wd=Math.max(h0*1.65,260);
  // A lángoló lidércfej a három eredeti fejhelyről indul; a látványos felső fej marad az első.
  const headData=[[.18,.24],[.12,.49],[.22,.72]];
  const bites=headData.map(([px,py],i)=>({img:headImg,x:baseX+dir*h0*(.62-px),y:baseY-h0*(1-py),sx:baseX+dir*h0*(.62-px),sy:centerY+(i-1)*Math.min(22,h0*.12),w:Wd,a:0,open:0,scale:.7,trail:[],active:false}));
  const damaged=new Set();
  const hitFoe=t=>{if(!t.alive)return;const first=!damaged.has(t);damaged.add(t);t.hurt=.45;toss(t,48,340);sfx('bite');shake(8);hitStop(35);
    for(let j=0;j<12;j++)part({x:cx(t)+rnd(-34,34),y:midY(t)+rnd(-24,24),vx:rnd(-190,190),vy:rnd(-250,90),life:.42,size:rnd(3,6),rgb:pick(['176,65,230','245,224,255','30,5,47']),shape:'streak'});
    if(first)hit(u,t,sk);
  };
  const remember=b=>{b.trail.unshift({x:b.x,y:b.y});if(b.trail.length>9)b.trail.pop();};
  R20GE({update(){return headsOn;},draw(){for(const b of bites){if(!b.active||b.a<=0||!b.img)continue;const hh=b.w*b.img.height/b.img.width;ctx.save();ctx.globalCompositeOperation='source-over';
    // Rövid, puha füstpamacsok maradnak a fejek mögött, és a mozgással együtt halványodnak el.
    for(let i=b.trail.length-1;i>0;i--){const p=b.trail[i],age=i/b.trail.length,px=p.x-dir*b.w*.16,py=p.y+hh*.05,rad=hh*(.12+.08*age);ctx.save();ctx.globalAlpha=(1-age)*.2;ctx.filter='blur(4px)';const sm=ctx.createRadialGradient(px,py,1,px,py,rad);sm.addColorStop(0,'rgba(192,151,218,.24)');sm.addColorStop(.48,'rgba(94,57,117,.2)');sm.addColorStop(1,'rgba(29,14,40,0)');ctx.fillStyle=sm;ctx.beginPath();ctx.ellipse(px,py,rad*1.25,rad*.66,dir*.12,0,Math.PI*2);ctx.fill();ctx.restore();}
    ctx.globalAlpha=b.a;ctx.translate(b.x,b.y);ctx.scale(-dir,1+b.open*.12);ctx.rotate(dir*.018);ctx.drawImage(b.img,-b.w*b.scale*.5,-hh*b.scale*.5,b.w*b.scale,hh*b.scale);ctx.restore();
  }}});
  // A három valódi Cerberus-fej egymás után, külön lendületből harap és továbbsuhan.
  headsOn=true;sfx('growl');rumble(.45,7);
  for(let i=0;i<bites.length;i++){
    const b=bites[i];b.active=true;b.trail=[];b.x=b.sx;b.y=b.sy;b.a=0;b.scale=.7;
    const headLeft=b.w*.5,start=dir>0?left-headLeft*.55:right+headLeft*.55,finish=dir>0?right+headLeft*.72:left-headLeft*.72;
    await tween(260,k=>{const e=eOutBack(k);b.a=k;b.x=b.sx+(start-b.sx)*e;b.y=b.sy-Math.sin(k*Math.PI)*28;b.scale=.72+.28*e;b.open=.65+.35*e;remember(b);});
    flash('177,88,255',.22,.07);sfx('whoosh');
    await tween(760,k=>{const e=k*k*(3-2*k),oldX=b.x;b.x=start+(finish-start)*e;b.y=b.sy-Math.sin(k*Math.PI)*22;b.open=.75+.25*Math.sin(k*Math.PI*3);b.scale=1+.035*Math.sin(k*Math.PI*2);remember(b);
      for(const t of targets){if(!t.alive)continue;const crossed=dir>0?oldX<cx(t)&&b.x>=cx(t):oldX>cx(t)&&b.x<=cx(t);if(crossed&&Math.abs(b.y-midY(t))<Math.max(60,t.h*t.scale*.7))hitFoe(t);}
    });
    for(const t of targets)if(t.alive&&!damaged.has(t))hitFoe(t);
    // Nem fordul vissza: a fej a söprés után átfut a színen, füstté foszlik.
    await tween(270,k=>{const e=easeIO(k);b.x=finish+dir*b.w*.65*e;b.y=b.sy-Math.sin(e*Math.PI)*18;b.a=1-e;b.scale=1-.12*e;remember(b);});b.active=false;
    if(i<bites.length-1)await wait(70);
  }
  headsOn=false;
  // Zárókép: a festett oszlop teljesen felcsap és elnyeli Cerberust, Morgána a kihunyó lángból lép vissza.
  R20GE({update(dt){End.t+=dt;return finalOn;},draw(){if(End.a<=0)return;r20gFlameShell(baseX,baseY,fw,fh,End.a,End.t,.32);}});
  finalOn=true;sfx('fire');sfx('wail');sfx('boom');rumble(1.4,9);flash('156,47,230',.45,.18);
  await tween(540,k=>{End.a=eOutBack(k);C.s=1+.06*Math.sin(k*Math.PI);});
  await tween(460,k=>{const e=easeIO(k);C.a=1-e;C.s=1-.52*e;u.alpha=e;});
  u.alpha=1;bodyOn=false;u.pose='idle';await bodySettle(u);
  await tween(760,k=>{End.a=1-easeIO(k);});finalOn=false;await dimTo(0,null,330);rel();
};
