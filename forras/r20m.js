// 20. kör – Espresszó idézés: az ellenséges Espresszó festett tűzleheletének
// részecskeméretét és textúráját használja, a már bevált, ajaknál mért kezdőponttal.
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){
  let jaw=0;
  const image=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
  es.img=image;
  es.run=async(P,S0)=>{
    const fs=foesAlive();if(!fs.length)return;
    const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const origin=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200};
    const mouth=()=>{const p=origin();return{x:p.x+8,y:p.y};};
    const x0=S0.x,s0=S0.s||1,hitSet=new Set(),flare={a:0,on:true};
    sfx('fire');
    R20ME({update(){return flare.on;},draw(){if(flare.a<=0)return;const p=mouth();ctx.save();ctx.globalCompositeOperation='lighter';glow(p.x,p.y,40*flare.a,'255,124,28',.64*flare.a);glow(p.x,p.y,15*flare.a,'255,244,195',.86*flare.a);ctx.restore();}});
    await tween(280,k=>{jaw=easeIO(k);S0.x=x0-19*k;S0.s=s0*(1+.035*k);flare.a=k;});
    flash('255,168,69',.32,.1);rumble(.65,7);sfx('growl');
    await tween(180,k=>{S0.x=x0-19+41*eOutBack(k);});
    const loop=setInterval(()=>sfx('fire'),260);
    try{
      // Az ellenség Duplán pörkölt leheletének eredeti 7–12 px-es,
      // erőteljesen növekvő, textúrázott tűzrészecskéi. A kezdőpont az ajak előtt van.
      await fireBreath(mouth(),fs,1,{dur:1900,speed:1000,n:34,onHit:t=>{
        if(!t.alive||hitSet.has(t))return;
        hitSet.add(t);shake(9);hitStop(42);
        hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
      }});
    }finally{clearInterval(loop);}
    for(const t of fs)if(t.alive&&!hitSet.has(t))hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
    await tween(250,k=>{jaw=1-.22*k;});sfx('bite');
    await tween(310,k=>{jaw=.78*(1-k);S0.x=x0+28*(1-k);S0.s=s0*(1.035-.035*k);flare.a=1-k;});
    jaw=0;flare.on=false;S0.pose='idle';
  };
}}
const R20ME=o=>{if(!o.draw)o.draw=function(){};effects.push(o);return o;};
