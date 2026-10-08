// 20. kör – negyedik javítás a kipróbálási visszajelzések alapján.
// Az R20C rajzolt lángrétegét eltávolítjuk: a régi, részecskés tűzlehelet
// visszatér, a már javított száj előtti kezdőpont opciójával.
if(typeof r20FireBreath==='function') fireBreath=r20FireBreath;

// A Cerberus kinézete marad. A régi egyetlen harapás helyett a három fej
// ugyanabban a képkockában, három külön kutyafejjel indul el.
if(typeof r18Hound==='function'){
  const r20dHound=r18Hound;
  r18Hound=async(x1,y1,x2,y2,w)=>Promise.all([
    r20dHound(x1-w*.24,y1-w*.045,x2-w*.12,y2,w*.78),
    r20dHound(x1,y1,x2,y2,w*.78),
    r20dHound(x1+w*.24,y1-w*.045,x2+w*.12,y2,w*.78)
  ]);
}

// R20C a hat páros támadásból néhányat felülírt, de a végén a régebbi
// R20P-változatokat kötötte vissza. A jobb, részletesebb R21P-animációk
// legyenek azok, amelyeket a harcrendszer ténylegesen meghív.
for(const n of ['Villámátok','Csillagözön','Árnyroham','Sárkánynyíl','Lótuszvihar','Tündérököl'])
  if(R21P&&R21P[n]) R16P[n]=R21P[n];

// A Lótuszvihar nyilai ne legyenek tüzesek: az R21P verzió sima arany
// nyilakat rajzol, amelyek ugyanazon a forgó íven indulnak, mint a szirmok.

// A festett, áttetsző fekete-lila lángoszlop visszaállítása. A kép eredeti
// álló arányát tartjuk meg, ezért nem jelenik meg négyszögként vagy füstként.
r20FlameColumn=function(x,gy,w,h,a,t){
  if(a<=0)return;
  const im=R17I.firepillar;
  ctx.save();ctx.globalAlpha=a;
  if(im){
    const ih=h,iw=Math.min(w,ih*im.width/im.height);
    for(let i=0;i<3;i++){
      const q=i-1,phase=t*2.6+i*1.8,sw=iw*(.78+.08*Math.sin(phase));
      ctx.save();ctx.globalAlpha=a*(i===1?1:.54);ctx.translate(x+q*iw*.2+Math.sin(phase)*w*.035,gy);
      ctx.drawImage(im,-sw/2,-ih,sw,ih*(.96+.035*Math.sin(phase+1)));ctx.restore();
    }
  }
  ctx.save();ctx.globalCompositeOperation='lighter';
  glow(x,gy-18,Math.max(48,w*.3),'112,24,204',.52*a);
  glow(x,gy-8,Math.max(24,w*.13),'191,74,255',.38*a);
  ctx.restore();ctx.restore();
};

// Teaszertartás: Kamilla fölött teazápor nyílik, a lehulló tea összegyűlik,
// majd egyetlen festett kamillás hullámként söpör végig a hősökön.
A.teaCeremony=async(u,ts,sk)=>{
  const al=ts.filter(t=>t.alive);if(!al.length)return;
  const rel=keepPose(u);let pourSnd=null;
  try{
    await dimTo(.34,'40,25,10',240);await bodyWind(u,260,.1);sfx('holy');
    const wav=R17I.teawave;
    const left=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.5));
    const right=Math.max(...al.map(t=>cx(t)+t.w*t.scale*.5));
    const targetCenter=(left+right)/2,center=cx(u),dir=targetCenter<center?-1:1;
    const floor=Math.max(...al.map(t=>t.y+t.oy))+8;
    const rainTop=Math.max(48,topY(u)-72);
    const rainLeft=Math.max(28,center-150),rainRight=Math.min(W-28,center+150),span=Math.max(120,rainRight-rainLeft);
    const waveStart=center;
    const goal=dir>0?Math.min(W+120,right+180):Math.max(-120,left-180);
    const S={cloud:0,rain:0,wave:0,front:waveStart,t:0,a:1,on:true};
    const done=new Set();
    R20CE({update(dt){S.t+=dt;return S.on;},draw(){
      if(S.cloud<=0&&S.rain<=0&&S.wave<=0)return;
      // Kamilla megidézi a festett, gomolygó teafelhőt.
      if(S.cloud>0){
        ctx.save();ctx.globalAlpha=S.cloud*.96;const cw=span*.76*S.cloud,cy=rainTop+8;
        ctx.shadowColor='rgba(255,190,74,.75)';ctx.shadowBlur=22*S.cloud;
        const cloud=ctx.createRadialGradient(center,cy-8,4,center,cy,cw*.56);
        cloud.addColorStop(0,'rgba(177,101,40,.95)');cloud.addColorStop(.68,'rgba(104,53,24,.94)');cloud.addColorStop(1,'rgba(57,33,27,.9)');
        ctx.fillStyle=cloud;ctx.beginPath();ctx.moveTo(center-cw*.46,cy+12);
        ctx.bezierCurveTo(center-cw*.54,cy+8,center-cw*.5,cy-3,center-cw*.38,cy-3);
        ctx.bezierCurveTo(center-cw*.35,cy-24,center-cw*.16,cy-24,center-cw*.1,cy-9);
        ctx.bezierCurveTo(center-cw*.04,cy-34,center+cw*.15,cy-31,center+cw*.2,cy-12);
        ctx.bezierCurveTo(center+cw*.3,cy-23,center+cw*.45,cy-14,center+cw*.43,cy-2);
        ctx.bezierCurveTo(center+cw*.55,cy+2,center+cw*.51,cy+13,center+cw*.4,cy+16);
        ctx.quadraticCurveTo(center,cy+24,center-cw*.4,cy+16);ctx.quadraticCurveTo(center-cw*.52,cy+15,center-cw*.46,cy+12);ctx.closePath();ctx.fill();
        ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,221,158,.88)';ctx.lineWidth=3;
        ctx.beginPath();ctx.moveTo(center-cw*.44,cy+12);ctx.quadraticCurveTo(center,cy+25,center+cw*.44,cy+12);ctx.stroke();ctx.restore();
      }
      // A felhőből hulló cseppek lefelé hajlanak, és Kamilla alatt gyűlnek össze.
      if(S.rain>0){ctx.save();ctx.lineCap='round';const drops=48,fallH=floor-rainTop+20;
      for(let i=0;i<drops;i++){
        const phase=((S.t*1.16+i*.217)%1),base=rainLeft+(i+.5)/drops*span+Math.sin(S.t*1.3+i*2.2)*8;
        const gather=Math.max(0,Math.min(1,(phase-.22)/.78)),bend=gather*gather;
        const drift=Math.sin(phase*5+i*1.7+S.t*1.3)*24*(1-bend);
        const y=rainTop+20+phase*fallH,x=base+(center-base)*bend+drift;
        const tail=22+(i%6)*9;
        ctx.globalAlpha=S.rain*(.52+.4*Math.sin(phase*Math.PI));
        ctx.strokeStyle=i%4===0?'rgba(255,222,145,.98)':'rgba(201,119,39,.9)';ctx.lineWidth=i%7===0?6:3+(i%3)*.7;
        ctx.beginPath();ctx.moveTo(x-dir*phase*12,y-tail);ctx.quadraticCurveTo(x+dir*9,y-tail*.45,x,y);ctx.stroke();
        ctx.fillStyle='rgba(255,232,175,.9)';ctx.beginPath();ctx.ellipse(x,y,2.8,5.5,dir*.18,0,6.29);ctx.fill();
        if(phase>.91&&Math.abs(x-center)<75){ctx.globalAlpha=S.rain*.55;ctx.strokeStyle='rgba(255,220,144,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(center+(x-center)*.35,floor-4,8+(i%4)*3,2,0,Math.PI,6.2);ctx.stroke();}
      }ctx.restore();}
      // A hullám alatti tócsa összegyűjti a cseppeket, aztán felemelkedik.
      const fullW=Math.max(360,Math.min(W*.82,720)),ww=fullW*Math.max(.09,S.wave),hh=wav?ww*wav.height/wav.width:ww*.56;
      const wx=S.front-dir*ww*.28,wy=floor-hh*.86+Math.sin(S.t*5)*3;
      if(S.wave>0){
        ctx.save();ctx.globalAlpha=S.a*Math.min(1,S.wave*2.4);
        const puddle=ctx.createRadialGradient(waveStart,floor-7,4,waveStart,floor-7,45+S.wave*105);
        puddle.addColorStop(0,'rgba(255,223,151,.94)');puddle.addColorStop(.45,'rgba(203,126,47,.84)');puddle.addColorStop(1,'rgba(133,69,29,0)');
        ctx.fillStyle=puddle;ctx.beginPath();ctx.ellipse(waveStart,floor-7,24+S.wave*125,7+S.wave*15,0,0,6.29);ctx.fill();ctx.restore();
        if(wav){ctx.save();ctx.globalAlpha=S.a*Math.min(1,S.wave*2.1);ctx.drawImage(wav,wx-ww*.5,wy,ww,hh);ctx.restore();}
        else r16Wave(wx,floor,ww*.55,ww,S.t,S.a);
      }
    }});
    bodyStrike(u,180,-.12);sfx('whoosh');
    await tween(430,k=>{S.cloud=eOutBack(k);});await wait(160);sfx('water');
    await tween(900,k=>{const e=easeIO(k);S.rain=e;S.wave=.08+.42*e;});
    sfx('splash');pourSnd=setInterval(()=>sfx('water'),260);
    await tween(1900,k=>{
      const e=easeIO(k);S.front=waveStart+(goal-waveStart)*e;S.wave=.5+.5*e;S.rain=1-.72*e;S.cloud=1-.35*e;
      for(const t of al)if(t.alive&&!done.has(t)&&((dir>0&&S.front>cx(t))||(dir<0&&S.front<cx(t)))){
        done.add(t);shake(13);hitStop(65);toss(t,68,440);t.hurt=.46;
        splat(cx(t),midY(t),['235,167,74','255,242,205'],22,390,'drop');hit(u,t,sk);
      }
    });
    if(pourSnd)clearInterval(pourSnd);pourSnd=null;
    for(const t of al)if(t.alive&&!done.has(t))hit(u,t,sk);
    await tween(460,k=>{S.a=1-k;S.rain=1-k;S.cloud=1-k;});S.on=false;await bodySettle(u);await dimTo(0,null,280);
  }finally{if(pourSnd)clearInterval(pourSnd);rel();}
};

// A tussárkány az edény szájából bukkanjon elő, ne a porcelán közepéből.
// A meglévő ecsetrajzot és tintatámadást megtartjuk, csak a kilépési és
// visszatérési útvonalat igazítjuk a festett edény nyílásához; a végén a
// hosszú útvonalrajz-effektet is lezárjuk, hogy ne maradjon utóképe.
{
  const ink0=A.inkWave;
  if(typeof ink0==='function')A.inkWave=async(...args)=>{
    const first=effects.length,snake0=r17Snake;
    r17Snake=function(im,path,w,h,a,...rest){
      if(im===R17I.inkdragon&&Array.isArray(path)){
        const mouthPath=path.map(p=>({...p,y:p.y-108}));
        return snake0.call(this,im,mouthPath,w,h,a,...rest);
      }
      return snake0.call(this,im,path,w,h,a,...rest);
    };
    try{await ink0(...args);}
    finally{
      r17Snake=snake0;
      for(const e of effects.slice(first))if(e&&e.draw&&String(e.draw).includes('r17Snake')){
        e.update=()=>false;e.draw=()=>{};
      }
    }
  };
}

// A pontok visszakerülnek a festett térkép ismert helyszíneire. A r20c
// egymásra rajzolt, éles átlóit egyetlen, jól követhető, pontozott ösvény
// váltja; a helyszínfestmények maradnak a jelölések mögött.
{
  const P1=[[[18,80],[31,81],[41,68],[25,63]],[[27,42],[23,30],[44,36],[35,21]],[[52,78],[58,71],[74,71],[66,47]],[[77,51],[84,43],[91,37],[85,17]]];
  const P2=[[[23,82],[30,71],[14,70],[19,57]],[[36,55],[41,43],[29,36],[38,22]],[[52,50],[58,70],[67,80],[75,62]],[[69,40],[77,31],[88,33],[84,15]]];
  for(let i=0;i<4;i++){MAP_POS[i]=P1[i];if(MAP_POS.length>4+i)MAP_POS[i+4]=P2[i];}
  const st=document.createElement('style');
  st.textContent=`
    .map-trail{opacity:0!important;display:none!important}
    .map-route{opacity:0!important}
    .mnode{width:clamp(38px,6vw,54px)!important;height:clamp(38px,6vw,54px)!important;
      padding:0!important;border:2px solid #f1d59a!important;border-radius:50%!important;
      color:#fff2cb!important;font:800 17px/1 system-ui!important;text-shadow:0 1px 3px #25170e!important;
      background:radial-gradient(circle at 34% 25%,#84603a 0,#53371e 62%,#291b12 100%)!important;
      box-shadow:0 0 0 2px rgba(45,25,11,.72),0 3px 7px rgba(31,18,10,.72),inset 0 1px 3px rgba(255,238,190,.6)!important;
      transform:translate(-50%,-50%)!important;z-index:3!important}
    .mnode:before{display:none!important;background-image:none!important}
    .map-view{background-size:100% 100%!important}
  `;
  document.head.appendChild(st);
  const map0=mapScreen;
  mapScreen=function(...args){
    const result=map0.apply(this,args);
    const repaint=()=>{
      try{
        const v=ov&&ov.querySelector('.map-view');if(!v)return;
        const nodes=[...v.querySelectorAll('.mnode')].filter(n=>n.style.left&&n.style.top);
        nodes.forEach((n,i)=>{
          if(n.textContent.trim()!==String(i+1))n.replaceChildren(document.createTextNode(String(i+1)));
          n.setAttribute('aria-label',`Pálya ${i+1}`);
          n.style.setProperty('width','clamp(38px,6vw,54px)','important');
          n.style.setProperty('height','clamp(38px,6vw,54px)','important');
          n.style.setProperty('padding','0','important');
          n.style.setProperty('border','2px solid #f1d59a','important');
          n.style.setProperty('border-radius','50%','important');
          n.style.setProperty('color','#fff2cb','important');
          n.style.setProperty('font','800 17px/1 system-ui','important');
          n.style.setProperty('text-shadow','0 1px 3px #25170e','important');
          n.style.setProperty('background','radial-gradient(circle at 34% 25%,#84603a 0,#53371e 62%,#291b12 100%)','important');
          n.style.setProperty('box-shadow','0 0 0 2px rgba(45,25,11,.72),0 3px 7px rgba(31,18,10,.72),inset 0 1px 3px rgba(255,238,190,.6)','important');
          n.style.setProperty('transform','translate(-50%,-50%)','important');
          n.style.setProperty('z-index','3','important');
        });
        if(nodes.length<2||v.querySelector('[data-r20d-route]'))return;
        v.querySelectorAll('.map-trail').forEach(n=>n.remove());
        const P=nodes.map(n=>[parseFloat(n.style.left),parseFloat(n.style.top)]),NS='http://www.w3.org/2000/svg';
        const svg=document.createElementNS(NS,'svg');svg.dataset.r20dRoute='1';svg.setAttribute('viewBox','0 0 100 100');
        svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('aria-hidden','true');
        svg.style.cssText='position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible';
        let d=`M${P[0][0]},${P[0][1]}`;
        for(let i=0;i<P.length-1;i++){
          const a=P[Math.max(0,i-1)],b=P[i],c=P[i+1],e=P[Math.min(P.length-1,i+2)];
          const c1=[b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6],c2=[c[0]-(e[0]-b[0])/6,c[1]-(e[1]-b[1])/6];
          d+=` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${c[0]},${c[1]}`;
        }
        for(const [width,color,dash] of [[8,'rgba(37,24,14,.72)',''],[4,'rgba(238,199,126,.96)','1 5']]){
          const path=document.createElementNS(NS,'path');path.setAttribute('d',d);path.setAttribute('fill','none');
          path.setAttribute('stroke',color);path.setAttribute('stroke-width',width);path.setAttribute('stroke-linecap','round');
          path.setAttribute('stroke-linejoin','round');path.setAttribute('stroke-dasharray',dash);path.setAttribute('vector-effect','non-scaling-stroke');svg.appendChild(path);
        }
        v.insertBefore(svg,v.firstChild);
      }catch(e){console.error(e);}
    };
    window.__r20dMapPaint=repaint;
    if(!window.__r20dMapObserver){
      window.__r20dMapObserver=new MutationObserver(()=>{if(window.__r20dMapPaint)requestAnimationFrame(window.__r20dMapPaint);});
      window.__r20dMapObserver.observe(ov,{subtree:true,childList:true});
    }
    if(result&&typeof result.then==='function')return result.then(v=>{setTimeout(repaint,90);return v;});
    setTimeout(repaint,90);return result;
  };
}
