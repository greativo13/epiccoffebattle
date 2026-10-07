import re
p='game.html';s=open(p,encoding='utf-8').read()
a=s.index('// ---- Füstölő-nyíl (önálló, végleges változat)');b=s.index('// ---- Járvány: a repedésekben zöld vegyszer folyik')
new=r'''// ---- Füstölő-nyíl (önálló, végleges változat): a földbe fúródott nyíl vége parázslik, és valósághű, áttetsző szürkésfehér füst száll fel belőle, gomolyog a csapat körül
// puha füstpamacs-textúrák (egyszer készülnek): több egymásra rakott, elmosódott folt, így szabálytalan, felhőszerű a széle
const SMOKE_TEX=[];function smokeTex(){if(SMOKE_TEX.length)return SMOKE_TEX;for(let v=0;v<4;v++){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
    for(let i=0;i<9;i++){const r=rnd(18,40),x=64+rnd(-26,26),y=64+rnd(-26,26),gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,255,255,.55)');gr.addColorStop(.6,'rgba(255,255,255,.18)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);}
    SMOKE_TEX.push(c);}return SMOKE_TEX;}
A.incenseArrow=async(u,ts,sk)=>{const al=ts.filter(a=>a.alive);await chargeBow(u,320,'255,220,160');
  const gx=Math.min(W*.5,Math.max(...al.map(a=>cx(a)))+110),gy=Math.max(...al.map(a=>a.y))+10,ang=Math.PI/2+.18;
  await bigArrow(bowPos(u),{x:gx,y:gy},{arc:50,trail:['255,220,160','240,240,240']});sfx('holy');shake(4);ring(gx,gy,'255,220,160',90,.4);
  const tex=smokeTex(),lotus=FXK('jzlotus'),nx=gx-Math.cos(ang)*60,ny=gy-Math.sin(ang)*60,puffs=[];
  // füstpamacs: a nyíl végéből vékony, kanyargó oszlop; a hősök körül alacsonyan gomolygó, lassan felszálló felhő
  const col=()=>({x:nx,y:ny,vx:rnd(-6,6),vy:-rnd(38,55),r:rnd(8,13),gr:rnd(26,38),life:rnd(3,4.2),t:0,ph:rnd(0,6.3),rot:rnd(0,6.3),vr:rnd(-.4,.4),tx:pick(tex),c:pick([238,228,218]),pk:rnd(.32,.45)});
  const low=h=>({x:cx(h)+rnd(-90,90),y:h.y+h.oy-rnd(0,h.h*h.scale*.5),vx:rnd(-10,10),vy:-rnd(6,16),r:rnd(30,50),gr:rnd(14,24),life:rnd(4,6),t:0,ph:rnd(0,6.3),rot:rnd(0,6.3),vr:rnd(-.25,.25),tx:pick(tex),c:pick([242,232,222]),pk:rnd(.16,.24)});
  for(let i=0;i<14;i++){const q=col();q.t=rnd(0,q.life*.8);puffs.push(q);}
  for(const h of S.heroes.filter(x=>x.alive))for(let i=0;i<6;i++){const q=low(h);q.t=rnd(0,q.life*.7);puffs.push(q);}
  let acc=0,acc2=0;
  const fx={t:0,a:0,update(dt){this.t+=dt;const on=this.t<1.8||(S.heroes.some(h=>h.alive&&h.st.incense)&&!S.over);this.a=on?Math.min(1,this.a+dt*1.2):Math.max(0,this.a-dt*.8);
      if(on){acc+=dt;while(acc>.16){acc-=.16;puffs.push(col());}acc2+=dt;while(acc2>.3){acc2-=.3;const h=pick(S.heroes.filter(x=>x.alive));if(h)puffs.push(low(h));}}
      for(let i=puffs.length-1;i>=0;i--){const q=puffs[i];q.t+=dt;if(q.t>q.life){puffs.splice(i,1);continue;}
        // felfelé lassul és szétterül, a kanyargást egy lassú szinusz adja
        q.x+=(q.vx+Math.sin(q.t*1.3+q.ph)*14)*dt;q.y+=q.vy*dt;q.vy*=1-.18*dt;q.r+=q.gr*dt;q.rot+=q.vr*dt;}
      if(on&&Math.random()<.25){part({x:nx+rnd(-3,3),y:ny,vx:rnd(-12,12),vy:-rnd(20,50),life:rnd(.6,1.1),size:rnd(1.5,3),rgb:pick(['255,170,70','255,220,140'])});}
      return on||this.a>0||puffs.length>0&&this.a>0;},
    draw(){const a=this.a;if(a<=0)return;ctx.save();
      if(lotus){ctx.globalCompositeOperation='lighter';for(const h of S.heroes)if(h.alive){ctx.save();ctx.globalAlpha=.3*a;ctx.translate(cx(h),h.y+h.oy-4);ctx.scale(1,.32);const z=Math.max(120,h.w*h.scale*1.6);ctx.drawImage(lotus,-z/2,-z/2,z,z);ctx.restore();}ctx.globalCompositeOperation='source-over';}
      // a nyíl a földben, a végén izzó parázs
      drawFlyArrow(gx,gy,ang,60,a,null);ctx.save();ctx.globalCompositeOperation='lighter';glow(nx,ny,10+Math.sin(this.t*9)*2,'255,150,60',.8*a);ctx.restore();
      // füst: normál keveréssel, halvány szürkésfehér – így világos háttér előtt is látszik, de átlátszó marad
      for(const q of puffs){const k=q.t/q.life,al2=(k<.15?k/.15:Math.pow(1-(k-.15)/.85,1.4))*q.pk*a;if(al2<=.005)continue;
        ctx.save();ctx.globalAlpha=al2;ctx.translate(q.x,q.y);ctx.rotate(q.rot);const z=q.r*2.4;ctx.drawImage(q.tx,-z/2,-z/2,z,z);
        // enyhe szürke árnyalat a pamacs alján: térhatás
        ctx.globalCompositeOperation='source-atop';ctx.restore();}
      ctx.restore();}};
  effects.push(fx);
  for(const a of al){hit(u,a,sk);sparkUp(a,'255,230,170',12);const n=Math.round(a.maxHp*.06),got=Math.min(n,a.maxHp-a.hp);if(got>0){a.hp+=got;popNum(a,got,'heal');}}
  updateHUD();await wait(700);u.pose='idle';};
'''
s=s[:a]+new+s[b:];open(p,'w',encoding='utf-8').write(s)
