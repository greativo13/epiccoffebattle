
// ===== 44. kör – tesztlap (ja05, ma05, ma06, na01, x02) =====
// Magmakitörés (ma05: „nagyobb sugár legyen”): ugyanaz a jelenet, de kb. kétszer akkora lávatócsa és repedés, szélesebb, magasabb
// lávaoszlop és szélesebben szétfröccsenő lávacseppek. (A korábbi hang-burkolót – 'lava' 0,5 mp-nél – megtartjuk.)
let r21MagMinX=-1e9;
{const _wrapLava=f=>async function(u,ts,sk){setTimeout(()=>sfx('lava'),500/(S.speed||1));return f.apply(this,arguments);};
A.magmaErupt=async(u,ts,sk)=>{const {al}=grp(ts);if(!al.length)return;await dimTo(.68,'30,6,0',250);u.pose='attack';sfx('rock');shake(10);rumble(1.8,6);
  const vents=al.map(t=>({x:cx(t),y:t.y+t.oy+8,a:0,pool:0,t}));r21MagMinX=Math.max(cx(u)+u.w*u.scale*.7,Math.min(...vents.map(v=>v.x))-240);const blobs=[],splats=[],L={on:true};
  effects.unshift({update(dt){for(const v of vents)if(v.pool>0&&!L.on&&Math.random()<.04)part({x:v.x+rnd(-60,60),y:v.y-rnd(0,10),vx:rnd(-10,10),vy:-rnd(40,90),life:rnd(1,1.8),size:rnd(14,26),rgb:pick(['50,40,40','70,60,55','35,28,28']),add:false,shape:'smoke'});
      for(let i=blobs.length-1;i>=0;i--){const b=blobs[i];b.age+=dt*.25;b.vy+=1500*dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.vy>0&&b.y>=b.gy){if(b.x<r21MagMinX||!vents.some(v=>Math.abs(v.x-b.x)<170)||Math.random()<.4){blobs.splice(i,1);continue;}splats.push({x:b.x,y:b.gy,r:b.r*1.7,age:b.age*.6});blobs.splice(i,1);}}
      for(let i=splats.length-1;i>=0;i--){splats[i].age+=dt*.45;if(splats[i].age>1.6)splats.splice(i,1);}
      return L.on||blobs.length||splats.length;},
    draw(){ctx.save();
      for(const v of vents){if(v.pool<=0)continue;const R=210*v.pool;ctx.save();ctx.translate(v.x,v.y);ctx.scale(1,.28);ctx.globalCompositeOperation='lighter';glow(0,0,R*1.6,'255,90,20',.5*v.pool);ctx.globalCompositeOperation='source-over';
        // sötét, kihűlt kéreg, alatta izzó repedéshálózat; a közepe nyitott, fortyogó láva
        if(!v.cr){v.cr=[];for(let i=0;i<14;i++){const a=i/14*6.283+rnd(-.2,.2),pts=[[0,0]];let r=0,an=a;while(r<1){r+=rnd(.12,.22);an+=rnd(-.35,.35);pts.push([Math.cos(an)*r,Math.sin(an)*r]);}v.cr.push(pts);}}
        const cg=ctx.createRadialGradient(0,0,R*.2,0,0,R);cg.addColorStop(0,'rgba(60,22,12,1)');cg.addColorStop(.75,'rgba(32,16,12,1)');cg.addColorStop(1,'rgba(30,20,16,0)');ctx.fillStyle=cg;ctx.beginPath();ctx.arc(0,0,R,0,6.29);ctx.fill();
        const fl=.75+.25*Math.sin(v.a*3);ctx.lineCap='round';ctx.lineJoin='round';
        for(const [lw,col] of [[R*.09,`rgba(255,90,20,${.55*fl})`],[R*.045,`rgba(255,180,60,${.9*fl})`],[R*.016,`rgba(255,245,190,${fl})`]]){ctx.strokeStyle=col;ctx.lineWidth=lw;for(const pts of v.cr){ctx.beginPath();pts.forEach((p,i)=>{const x=p[0]*R*.95,y=p[1]*R*.95;i?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();}}
        const og=ctx.createRadialGradient(0,0,0,0,0,R*.38);og.addColorStop(0,'rgba(255,250,200,1)');og.addColorStop(.5,'rgba(255,170,40,1)');og.addColorStop(1,'rgba(220,60,10,0)');ctx.fillStyle=og;ctx.beginPath();ctx.arc(0,0,R*.38,0,6.29);ctx.fill();
        ctx.restore();v.a+=.05;}
      for(const s of splats){const [r,g,b]=lavaCol(s.age);ctx.fillStyle=`rgba(${r|0},${g|0},${b|0},${Math.min(1,2.2-s.age*1.3)})`;ctx.beginPath();ctx.ellipse(s.x,s.y,s.r,s.r*.32,0,0,6.29);ctx.fill();}
      for(const b of blobs){const [r,g,bb]=lavaCol(b.age);ctx.globalCompositeOperation='lighter';glow(b.x,b.y,b.r*2.4,'255,110,30',.35*Math.max(0,1-b.age));ctx.globalCompositeOperation='source-over';
        const gr=ctx.createRadialGradient(b.x-b.r*.3,b.y-b.r*.3,1,b.x,b.y,b.r);gr.addColorStop(0,`rgb(255,${Math.min(255,g+60)|0},${Math.min(255,bb+30)|0})`);gr.addColorStop(.6,`rgb(${r|0},${g|0},${bb|0})`);gr.addColorStop(1,`rgb(${(r*.45)|0},${(g*.3)|0},${(bb*.3)|0})`);ctx.fillStyle=gr;
        const sp=Math.min(1.8,1+Math.abs(b.vy)/900);ctx.save();ctx.translate(b.x,b.y);ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);ctx.beginPath();ctx.ellipse(0,0,b.r/Math.sqrt(sp),b.r*sp,0,0,6.29);ctx.fill();ctx.restore();}
      ctx.restore();}});
  for(const v of vents)groundCrack(v.x,v.y,'255,120,30',320);await tween(600,k=>{for(const v of vents){v.pool=easeIO(k)*.7;v.a+=.05;}});
  for(const v of vents){const t=v.t,x=v.x,gy=v.y;sfx('fire');flash('255,140,40',.25,.12);shake(14);hitStop(60);
    for(let j=0;j<150;j++)setTimeout(()=>{const a=-Math.PI/2+rnd(-.3,.3)*(j<60?.8:1.5),sp=rnd(500,950);blobs.push({x:x+rnd(-14,14),y:gy-8,vx:Math.cos(a)*sp*.62,vy:Math.sin(a)*sp,r:rnd(10,24),age:rnd(.2,.42),gy:gy+rnd(-6,18)});},j*11);
    // a lávaoszlop magja
    if(FX_IMG.lavafx){const im=FX_IMG.lavafx,Hh=Math.max(420,bigOf(t)*2.1);effects.push({t:0,update(dt){this.t+=dt;return this.t<1.3;},draw(){const k=this.t/1.3,rise=Math.min(1,k/.25),a=k<.7?1:1-(k-.7)/.3,h=Hh*(.35+.65*easeIO(rise))*(1+.04*Math.sin(this.t*30)),w=h*im.width/im.height*1.9*(1+.05*Math.sin(this.t*23));
      ctx.save();ctx.globalAlpha=a;ctx.globalCompositeOperation='lighter';glow(x,gy-h*.45,h*.45,'255,90,20',.5);ctx.drawImage(im,x-w/2,gy-h+h*.04,w,h);ctx.restore();}});}
    else effects.push({t:0,update(dt){this.t+=dt;return this.t<.9;},draw(){const k=this.t/.9,h=Math.sin(Math.min(1,k*1.4)*Math.PI*.5)*(1-Math.max(0,k-.6)/.4)*Math.max(240,bigOf(t)*1.2),w=48;if(h<=0)return;
      const g=ctx.createLinearGradient(0,gy-h,0,gy);g.addColorStop(0,'rgba(200,50,10,.95)');g.addColorStop(.35,'rgba(255,140,30,1)');g.addColorStop(.7,'rgba(255,210,90,1)');g.addColorStop(1,'rgba(230,80,15,1)');ctx.save();ctx.globalCompositeOperation='lighter';glow(x,gy-h*.5,h*.5,'255,100,20',.45);ctx.restore();
      ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(x-w,gy);for(let i=0;i<=10;i++){const yy=gy-h*i/10;ctx.lineTo(x-w*(1-i/14)+Math.sin(this.t*20+i)*5,yy);}for(let i=10;i>=0;i--){const yy=gy-h*i/10;ctx.lineTo(x+w*(1-i/14)+Math.sin(this.t*20+i+2)*5,yy);}ctx.closePath();ctx.fill();}});
    v.pool=1;toss(t,50,420);hit(u,t,sk);await wait(220);}
  await wait(1500);L.on=false;await tween(500,k=>{for(const v of vents)v.pool=1-k;});for(const v of vents)v.pool=0;u.pose='idle';await dimTo(0,null,300);};
A.magmaErupt=_wrapLava(A.magmaErupt);}

// Földrengés → Kőhullám (ma05: „a neve legyen Kőhullám, de lehet nagyobb”)
Object.assign(SK.titan,{name:'Kőhullám',desc:'Grog életerőt áldoz, és a földbe csap: hatalmas kőhullám söpör végig minden ellenségen.'});

// Cerberus (x02: „túl lassú”): még gyorsabb tempó (a jelenet változatlan)
r21Faster('cerberus',.74);
