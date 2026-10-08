// 20. kör – Cerberus: élethűbb sötét láng és visszatérő lángoszlop.
// Az r20e átváltozását és háromfejes harapását változatlanul hagyja.
const R20FE=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};

function r20fFireColumn(x,gy,w,h,a,t){
  if(a<=0)return;
  const im=R17I.firepillar;
  ctx.save();ctx.translate(x,gy);ctx.globalAlpha=a;
  // A játék festett lángoszlopa adja a textúrát; a színezés fekete-ibolya marad.
  if(im){
    const ih=Math.min(h,w*im.height/im.width),iw=ih*im.width/im.height;
    for(const [dx,sx,sy,alpha,rot] of [[-.14,.83,.91,.52,-.035],[.12,.91,1.04,.62,.025],[0,1,1,.9,0]]){
      ctx.save();ctx.globalAlpha=a*alpha;ctx.globalCompositeOperation='source-over';
      ctx.filter='grayscale(1) sepia(1) hue-rotate(225deg) saturate(4) brightness(.58)';
      ctx.translate(dx*w,-ih*.48);ctx.rotate(rot*Math.sin(t*2.2+dx*8));
      ctx.drawImage(im,-iw*sx/2,-ih*sy*.52,iw*sx,ih*sy);ctx.restore();
    }
  }
  // A magas törzs fölött szétnyíló, gombaszerű tűzkorona adja az átváltozás nagy sziluettjét.
  ctx.globalCompositeOperation='source-over';
  for(let i=0;i<17;i++){
    const q=i/16,bx=(q-.5)*w*.94,ph=t*5.7+i*1.91;
    const fh=h*(.48+.44*(.5+.5*Math.sin(ph*1.17+i*.7)));
    const bw=w*(.035+.045*(.5+.5*Math.sin(i*2.31+ph*.37)));
    const sway=Math.sin(ph)*w*.07,tip=bx+sway+Math.sin(ph*1.43+1.1)*bw*.8;
    for(const [scale,offset,stops] of [
      [1.75,0,['rgba(3,1,8,.16)','rgba(12,3,25,.94)','rgba(2,1,6,.98)']],
      [.96,Math.sin(ph)*3,['rgba(42,8,76,.05)','rgba(91,22,158,.94)','rgba(19,3,39,.98)']],
      [.34,Math.sin(ph+1.4)*2,['rgba(171,83,238,.02)','rgba(207,137,255,.82)','rgba(70,14,119,.45)']]
    ]){
      const b=bw*scale,tx=tip+offset;
      ctx.beginPath();ctx.moveTo(bx-b,2);
      ctx.bezierCurveTo(bx-b*1.5,-fh*.2,bx+sway-b*.88,-fh*.67,tx,-fh);
      ctx.bezierCurveTo(tx+b*.25,-fh*.78,bx+sway+b*.9,-fh*.32,bx+b,2);ctx.closePath();
      const g=ctx.createLinearGradient(0,-fh,0,0);stops.forEach((c,j)=>g.addColorStop(j/2,c));ctx.fillStyle=g;ctx.fill();
    }
  }
  const capY=-h*(.69+.025*Math.sin(t*3.1)),capW=w*(1.08+.04*Math.sin(t*2.3)),capH=h*.22;
  for(const [sx,sy,col] of [[1.04,1,'rgba(5,2,14,.96)'],[.91,.72,'rgba(83,19,147,.94)'],[.67,.38,'rgba(188,90,245,.78)']]){
    ctx.save();ctx.translate(0,capY);ctx.scale(sx,sy);ctx.beginPath();
    ctx.moveTo(-capW*.47,capH*.2);
    ctx.bezierCurveTo(-capW*.49,-capH*.18,-capW*.34,-capH*.75,-capW*.13,-capH*.68);
    ctx.bezierCurveTo(-capW*.06,-capH*1.12,capW*.12,-capH*1.08,capW*.17,-capH*.7);
    ctx.bezierCurveTo(capW*.37,-capH*.82,capW*.51,-capH*.16,capW*.47,capH*.2);
    ctx.bezierCurveTo(capW*.27,capH*.02,capW*.12,capH*.3,0,capH*.12);
    ctx.bezierCurveTo(-capW*.18,capH*.34,-capW*.32,capH*.04,-capW*.47,capH*.2);ctx.closePath();
    const cg=ctx.createLinearGradient(0,-capH,0,capH*.3);cg.addColorStop(0,'rgba(9,3,18,.96)');cg.addColorStop(.48,col);cg.addColorStop(1,'rgba(36,7,67,.9)');
    ctx.fillStyle=cg;ctx.fill();ctx.restore();
  }
  // A koronából visszacsapó, ívelt lángnyelvek mozgás közben is megőrzik a gombaformát.
  for(let i=0;i<9;i++){
    const side=i%2?-1:1,q=Math.floor(i/2)/4,px=side*capW*(.2+q*.28),ph=t*4.7+i*1.9,fh=capH*(.45+.5*(.5+.5*Math.sin(ph)));
    ctx.beginPath();ctx.moveTo(px-capW*.055,capY+capH*.12);
    ctx.bezierCurveTo(px-side*capW*.12,capY-fh*.25,px+side*capW*.12,capY-fh*.78,px+side*capW*.08,capY-fh);
    ctx.bezierCurveTo(px+side*capW*.19,capY-fh*.63,px+side*capW*.12,capY-capH*.05,px+side*capW*.045,capY+capH*.18);
    ctx.closePath();const cg=ctx.createLinearGradient(0,capY-fh,0,capY+capH*.18);cg.addColorStop(0,'rgba(142,55,218,.1)');cg.addColorStop(.55,'rgba(101,23,173,.92)');cg.addColorStop(1,'rgba(8,2,18,.94)');ctx.fillStyle=cg;ctx.fill();
  }
  // Parázs és a tűz tövénél izzó fény.
  ctx.save();ctx.globalCompositeOperation='lighter';
  const halo=ctx.createRadialGradient(0,-h*.16,3,0,-h*.22,w*.55);
  halo.addColorStop(0,'rgba(154,69,236,.42)');halo.addColorStop(.48,'rgba(88,27,154,.22)');halo.addColorStop(1,'rgba(14,3,28,0)');
  ctx.fillStyle=halo;ctx.fillRect(-w*.7,-h,w*1.4,h);
  for(let i=0;i<16;i++){
    const ph=t*2.4+i*2.399,life=.5+.5*Math.sin(ph*1.31),px=Math.sin(ph*1.7)*w*.39,py=-h*(.12+.76*life);
    ctx.globalAlpha=a*(.35+.45*life);ctx.fillStyle=i%3?'#b76aff':'#efceff';
    ctx.beginPath();ctx.ellipse(px,py,2+life*2,4+life*5,ph*.4,0,6.283);ctx.fill();
  }
  ctx.restore();ctx.restore();
}

function r20fMorganaFlames(x,feet,w,h,a,t){
  if(a<=0)return;
  // A festett, textúrázott oszlop körbezárja Morgánát; nem különálló lángcsíkokból áll.
  r20fFireColumn(x,feet,Math.max(180,w*2.15),h*1.58,a,t);
}

A.cerberus=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;
  const rel=keepPose(u),im=FX_IMG.cerberus,h0=u.h*u.scale*1.36;
  let flameOn=true,cerbOn=true,headsOn=false,morganaFlamesOn=true,finalFlameOn=false;
  const C={a:0,s:.24,t:0,open:0},F={a:0},M={a:0,t:0},End={a:0,t:0};
  await dimTo(.76,'13,2,24',260);sfx('dark');
  R20FE({update(dt){C.t+=dt;return cerbOn;},draw(){if(!im||C.a<=0)return;const h=h0*C.s,w=h*im.width/im.height;ctx.save();ctx.globalAlpha=C.a;ctx.translate(cx(u),u.y+u.oy+Math.sin(C.t*4)*2);ctx.scale(-1,1);ctx.rotate(-.025*C.open);ctx.drawImage(im,-w/2,-h,w,h);ctx.restore();}});
  const colW=Math.max(320,u.w*u.scale*4.1),colH=Math.max(380,h0*2.65),baseX=cx(u),baseY=u.y+u.oy+10;
  R20FE({update(){return flameOn;},draw(){r20fFireColumn(baseX,baseY,colW,colH,F.a,C.t);}});
  R20FE({update(dt){M.t+=dt;return morganaFlamesOn;},draw(){if(M.a>0&&u.alpha>.015)r20fMorganaFlames(baseX,baseY,u.w*u.scale,u.h*u.scale,M.a*u.alpha,M.t);}});
  sfx('fire');sfx('wail');rumble(1.5,9);
  await tween(780,k=>{F.a=easeIO(Math.min(1,k*1.25));M.a=easeIO(Math.min(1,k*1.4));});
  await tween(360,k=>{u.alpha=1-k;F.a=1-.22*k;M.a=1;});u.alpha=0;morganaFlamesOn=false;
  flash('152,42,225',.48,.16);sfx('roar');
  await tween(620,k=>{C.a=k;C.s=.24+.76*eOutBack(k);F.a=.78*(1-k);});
  await tween(170,k=>{F.a=.22*(1-k);});flameOn=false;
  const targets=al.filter(t=>t.alive).slice().sort((a,b)=>midY(a)-midY(b));
  const img=R17I.hound,headData=[{x:.18,y:.24},{x:.12,y:.49},{x:.22,y:.72}],Wd=h0*1.65;
  const left=Math.min(...targets.map(t=>cx(t)-t.w*t.scale*.5)),right=Math.max(...targets.map(t=>cx(t)+t.w*t.scale*.5));
  const dir=(left+right)*.5<baseX?-1:1,sweepStart=dir<0?right+Wd*.42:left-Wd*.42,sweepEnd=dir<0?left-Wd*.62:right+Wd*.62;
  const lanes=[0,1,2].map(i=>midY(targets[Math.round(i*(targets.length-1)/2)]));
  const bites=headData.map((p,i)=>({x:baseX,y:baseY-h0*.72,sx:baseX+h0*(.62-p.x),sy:baseY-h0*(1-p.y),lane:lanes[i],open:0,scale:.2,flip:dir,hist:[]}));
  const hitSet=new Set();
  const hitFoe=(b,t)=>{if(hitSet.has(t)||!t.alive)return;hitSet.add(t);t.hurt=.5;toss(t,64,430);sfx('bite');shake(11);hitStop(42);for(let j=0;j<14;j++)part({x:cx(t)+rnd(-45,45),y:midY(t)+rnd(-34,28),vx:rnd(-220,220),vy:rnd(-285,120),life:.46,size:rnd(3,7),rgb:pick(['175,68,235','240,220,255','32,8,54']),shape:'streak'});hit(u,t,sk);};
  const track=()=>{for(const b of bites){b.hist.unshift({x:b.x,y:b.y});if(b.hist.length>12)b.hist.pop();}};
  R20FE({update(){return headsOn;},draw(){if(!img)return;for(const b of bites){
    const ww=Wd*b.scale,hh=ww*img.height/img.width;ctx.save();ctx.globalCompositeOperation='lighter';
    for(let i=b.hist.length-1;i>=1;i--){const p=b.hist[i],q=b.hist[i-1];ctx.globalAlpha=(1-i/b.hist.length)*.3;ctx.strokeStyle='#9d4de0';ctx.lineWidth=hh*.38;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=Math.min(1,b.scale*1.7);ctx.translate(b.x,b.y);ctx.scale(b.flip,1+b.open*.58);ctx.rotate(b.flip<0?-.035:.035);ctx.drawImage(img,-ww*.5,-hh*.5,ww,hh);ctx.restore();
    ctx.save();ctx.globalCompositeOperation='lighter';glow(b.x+b.flip*ww*.24,b.y+hh*.05,68*b.scale,'151,43,227',.66*b.open);glow(b.x+b.flip*ww*.24,b.y+hh*.05,27*b.scale,'233,185,255',.55*b.open);ctx.restore();
  }}});
  headsOn=true;C.open=.25;sfx('growl');
  await tween(480,k=>{const e=k*k*(3-2*k);for(const b of bites){b.scale=.24+1.2*e;b.x=b.sx+(sweepStart-b.sx)*e;b.y=b.sy+(b.lane-b.sy)*e-Math.sin(k*Math.PI)*95;b.open=.8+.2*e;b.flip=dir;}track();});
  flash('188,98,255',.3,.09);shake(16);hitStop(65);rumble(.7,8);sfx('whoosh');
  await tween(1150,k=>{const e=k*k*(3-2*k);for(const b of bites){b.x=sweepStart+(sweepEnd-sweepStart)*e;b.y=b.lane+Math.sin(k*Math.PI*3+b.lane*.01)*24;b.open=.9+.1*Math.sin(k*Math.PI*5);b.scale=1.44+.08*Math.sin(k*Math.PI*4);}track();
    for(const b of bites)for(const t of targets){const crossed=dir<0?b.x<=cx(t):b.x>=cx(t);if(crossed&&Math.abs(b.y-midY(t))<Math.max(h0*.85,t.h*t.scale*.75))hitFoe(b,t);}
  });
  for(const t of targets)if(t.alive&&!hitSet.has(t)){hitFoe(bites[1],t);}
  await tween(420,k=>{const e=easeIO(k);for(const b of bites){b.x=sweepEnd+(b.sx-sweepEnd)*e;b.y=b.lane+(b.sy-b.lane)*e;b.scale=1.44-.95*e;b.open=1-e;}track();});headsOn=false;
  // A támadás végén a lángoszlop most visszazárul Cerberus körül, Morgána pedig lángok között tér vissza.
  R20FE({update(dt){End.t+=dt;return finalFlameOn;},draw(){if(End.a<=0)return;r20fFireColumn(baseX,baseY,colW,colH,End.a,End.t);if(u.alpha>.015)r20fMorganaFlames(baseX,baseY,u.w*u.scale,u.h*u.scale,End.a*u.alpha,End.t);}});
  finalFlameOn=true;sfx('fire');sfx('wail');sfx('boom');rumble(1.4,9);flash('154,48,230',.42,.16);
  await tween(480,k=>{End.a=eOutBack(k);C.open=.25+.25*Math.sin(k*Math.PI);});
  await tween(460,k=>{const e=easeIO(k);C.a=1-e;C.s=1-.55*e;u.alpha=e;});
  u.alpha=1;cerbOn=false;u.pose='idle';await bodySettle(u);
  await tween(620,k=>{End.a=1-easeIO(k);});finalFlameOn=false;
  await dimTo(0,null,330);rel();
};
