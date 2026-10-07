s=open('game.html',encoding='utf-8').read()
def rep(a,b,cnt=1):
    global s
    n=s.count(a);assert n==cnt,(a[:80],n);s=s.replace(a,b)
rep("setTimeout(()=>{for(const t of al)fxHold('firestorm',cx(t),t.y+t.oy+16,{h:Math.max(300,bigOf(t)*1.6),life:.9,anchor:'bottom',rise:.2,flick:.085});shake(16);},470);","setTimeout(()=>{shake(16);for(const t of al)sparks(cx(t),midY(t),['255,200,90','255,120,40','255,255,220'],20,520);},470);")
rep("const n=17;for(let i=0;i<n;i++){const an=-Math.PI+(i+.5)/n*Math.PI,k=Math.max(0,Math.min(1,(d.fan*n-i)/1.5));if(k<=0)continue;const L=1500*easeIO(k),w=.045;",
    "const n=23;for(let i=0;i<n;i++){const an=-Math.PI+(i+.5)/n*Math.PI,k=Math.max(0,Math.min(1,(d.fan*n-i)/1.5));if(k<=0)continue;const L=1500*easeIO(k),w=.028+.02*Math.sin(i*1.7)**2;")
rep("g.addColorStop(0,`rgba(255,235,190,${.4*k})`);g.addColorStop(.5,`rgba(255,190,150,${.15*k})`);g.addColorStop(1,'rgba(255,170,140,0)');ctx.fillStyle=g;\n        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(an-w)*L,sy+Math.sin(an-w)*L);ctx.lineTo(sx+Math.cos(an+w)*L,sy+Math.sin(an+w)*L);ctx.closePath();ctx.fill();}",
    "const aa=.16+.1*Math.sin(i*2.3+d.t*1.5)**2;for(const [ww,al] of [[w*2.4,.35],[w,1]]){const g=ctx.createLinearGradient(sx,sy,sx+Math.cos(an)*L,sy+Math.sin(an)*L);g.addColorStop(0,`rgba(255,238,200,${aa*al*k})`);g.addColorStop(.45,`rgba(255,200,160,${aa*.45*al*k})`);g.addColorStop(1,'rgba(255,170,140,0)');ctx.fillStyle=g;\n        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(an-ww)*L,sy+Math.sin(an-ww)*L);ctx.lineTo(sx+Math.cos(an+ww)*L,sy+Math.sin(an+ww)*L);ctx.closePath();ctx.fill();}}\n      glow(sx,sy,260*d.rise,'255,220,170',.35*d.rise);")
rep("ctx.fill();ctx.restore();\n    ctx.globalCompositeOperation='lighter';const hl=ctx.createLinearGradient(0,hz-30,0,hz+40);",
    "ctx.fill();ctx.restore();\n    ctx.globalCompositeOperation='lighter';if(d.beams.length){const wg=ctx.createLinearGradient(0,hz,0,H);wg.addColorStop(0,`rgba(255,200,150,${.22*Math.min(1,d.beams.length/2)})`);wg.addColorStop(1,'rgba(255,220,170,.04)');ctx.fillStyle=wg;ctx.fillRect(0,hz,W,H-hz);}const hl=ctx.createLinearGradient(0,hz-30,0,hz+40);")
i=s.index("    // felemelkedő kőlapok\n    for(const s of slabs){");j=s.index("ctx.restore();}\n    ctx.restore();}});",i)
s=s[:i]+"    // feltörő, hegyes sziklatüskék\n    for(const s of slabs)drawRockSpike(s.x,s.y,s.w,s.h*s.k,s.r*s.k);\n"+s[j+len("ctx.restore();}\n"):]
rep("const slab=(x,big)=>{const s={x,y:fy+4,w:big?rnd(60,90):rnd(26,46),h:big?rnd(70,110):rnd(26,55),r:rnd(-.35,.35),k:0};","const slab=(x,big)=>{const s={x,y:fy+6,w:big?rnd(56,80):rnd(28,44),h:big?rnd(120,170):rnd(45,85),r:rnd(-.3,.3),k:0};")
rep("for(const v of vents)if(v.pool>0&&Math.random()<.3)part(","for(const v of vents)if(v.pool>0&&Math.random()<.08)part(")
rep("for(let j=0;j<40;j++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.42,.42),sp=rnd(480,900);blobs.push({x:x+rnd(-18,18),y:gy-10,vx:Math.cos(a)*sp*.55,vy:Math.sin(a)*sp,r:rnd(7,17),age:rnd(0,.1),gy:gy+rnd(-6,18)});},j*14);",
    "for(let j=0;j<90;j++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.3,.3)*(j<60?.6:1.4),sp=rnd(500,950);blobs.push({x:x+rnd(-14,14),y:gy-8,vx:Math.cos(a)*sp*.55,vy:Math.sin(a)*sp,r:rnd(9,22),age:rnd(0,.08),gy:gy+rnd(-6,18)});},j*11);")
rep("await wait(1300);L.on=false;await tween(500,k=>{for(const v of vents)v.pool=1-k;});","await wait(1500);L.on=false;await tween(500,k=>{for(const v of vents)v.pool=1-k;});")
rep("    draw(){for(const c of sets)if(c.a>0)for(const q of c.sp)drawSpike(q.bx,q.by,q.ang,q.L*q.g,q.w,c.a);",
    "    draw(){for(const c of sets){const fr=c.frost||0;if(fr>0){const x=cx(c.t),gy=c.t.y+c.t.oy+6;ctx.save();ctx.translate(x,gy);ctx.scale(1,.3);const g=ctx.createRadialGradient(0,0,10,0,0,230*fr);g.addColorStop(0,'rgba(235,250,255,.85)');g.addColorStop(.7,'rgba(180,225,255,.5)');g.addColorStop(1,'rgba(180,225,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,230*fr,0,6.29);ctx.fill();\n        ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=2;for(let i=0;i<12;i++){const an=i/12*6.283,L=200*fr;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(an)*L,Math.sin(an)*L);ctx.moveTo(Math.cos(an)*L*.6,Math.sin(an)*L*.6);ctx.lineTo(Math.cos(an+.25)*L*.75,Math.sin(an+.25)*L*.75);ctx.stroke();}ctx.restore();}}\n      for(const c of sets)if(c.a>0)for(const q of c.sp){drawSpike(q.bx,q.by,q.ang,q.L*q.g,q.w,c.a);if(q.g>=1&&c.glint!=null){const k=(c.glint+q.d*3)%1,px=q.bx+Math.sin(q.ang)*q.L*k,py=q.by-Math.cos(q.ang)*q.L*k;ctx.save();ctx.globalCompositeOperation='lighter';glow(px,py,16,'255,255,255',.8*c.a);ctx.restore();}}")
rep("  rumble(.9,6);sfx('rock');for(const c of sets)for(let i=0;i<16;i++)part({x:cx(c.t)+rnd(-90,90),y:c.t.y+c.t.oy,vx:rnd(-80,80),vy:-rnd(100,320),g:600,life:.8,size:rnd(3,6),rgb:'220,245,255',add:false,shape:'star'});",
    "  for(const c of sets)for(let i=0;i<10;i++)part({x:cx(c.t)+rnd(-120,120),y:c.t.y+c.t.oy-rnd(0,30),vx:rnd(-30,30),vy:-rnd(10,40),life:rnd(1,1.6),size:rnd(18,30),rgb:'225,240,255',add:false,shape:'smoke'});\n  await tween(380,k=>{for(const c of sets)c.frost=easeIO(k);});\n  rumble(.9,6);sfx('rock');for(const c of sets)for(let i=0;i<16;i++)part({x:cx(c.t)+rnd(-90,90),y:c.t.y+c.t.oy,vx:rnd(-80,80),vy:-rnd(100,320),g:600,life:.8,size:rnd(3,6),rgb:'220,245,255',add:false,shape:'star'});")
rep("  for(let j=0;j<10;j++){for(const c of sets){const q=pick(c.sp),k=rnd(.3,1);","  for(const c of sets)c.glint=0;tween(700,k=>{for(const c of sets)c.glint=k;});\n  for(let j=0;j<14;j++){for(const c of sets){const q=pick(c.sp),k=rnd(.3,1);")
rep("    sparks(cx(c.t),midY(c.t),['230,250,255','150,210,255','255,255,255'],30,600);c.a=0;toss(c.t,40,320);hit(u,c.t,sk);}\n  await wait(800);",
    "    sparks(cx(c.t),midY(c.t),['230,250,255','150,210,255','255,255,255'],30,600);c.a=0;c.glint=null;toss(c.t,40,320);hit(u,c.t,sk);}\n  await tween(900,k=>{for(const c of sets)c.frost=1-k;});")
rep("await tween(900,k=>{const e=easeIO(k);sun.y=-200+e*360;sun.s=60+e*240;});rumble(1.2,4);","await tween(1500,k=>{const e=easeIO(k);sun.y=-200+e*360;sun.s=60+e*240;});rumble(1.8,4);")
rep("  await wait(600);sfx('fire');\n  // felfúvódik… és felrobban\n  await tween(550,k=>{sun.boom=Math.pow(k,2)*.9;});",
    "  await wait(1000);sfx('fire');\n  // felfúvódik… és felrobban\n  await tween(1100,k=>{sun.boom=Math.pow(k,2)*.9;if(Math.random()<.3)shake(3+k*6);});")
rep("tween(300,k=>{sun.a=1-k;sun.boom=.9+k;}).then(()=>{sun.a=0;});","tween(600,k=>{sun.a=1-k;sun.boom=.9+k*1.4;}).then(()=>{sun.a=0;});")
rep("for(const [i,t] of al.entries()){await wait(90);const x=cx(t),y=midY(t);fxSpin(tint('nova','255,200,90')||'nova',x,y,{size:Math.max(260,bigOf(t)*1.8),life:.6,","for(const [i,t] of al.entries()){await wait(220);const x=cx(t),y=midY(t);fxSpin(tint('nova','255,200,90')||'nova',x,y,{size:Math.max(300,bigOf(t)*2.1),life:.9,")
rep("toss(t,40,340);shake(10);hit(u,t,sk);}\n  await wait(800);u.pose='idle';await dimTo(0,null,300);};","toss(t,40,340);shake(10);hit(u,t,sk);}\n  await wait(1300);u.pose='idle';await dimTo(0,null,400);};")
m='/* ================= INDÍTÁS ================= */'
r=open('/tmp/claude-0/-home-user-epiccoffebattle/b216fc92-96f7-51b7-b764-c788ff1bde6f/scratchpad/r6.js',encoding='utf-8').read()
for n in ['axeChop','drawShroom','drawLeaf','drawThorn','snailParts','SNAIL_PARTS','fireflyFlash','frogTongue','shroomFall','leafGale','branchSwing','thornVolley','thornVine','sleepCloud','shellThrow','drawRockSpike(']:
    assert s.count(n)==(1 if n=='drawRockSpike(' else 0),(n,s.count(n))
s=s.replace(m,r+'\n'+m)
open('game.html','w',encoding='utf-8').write(s)
print('ok')
