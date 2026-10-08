// 20. kör – az Espresszó az ellenséges sárkány meglévő tűzleheletét használja.
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let jaw=0;
  const image=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];es.img=image;
  es.run=async(P,S0)=>{
    const al=foesAlive();if(!al.length)return;
    const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const mouth=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200};
    const m=mouth();
    S0.pose='attack';jaw=1;
    await dimTo(.35,'40,5,0',200);
    sfx('fire');
    for(let i=0;i<20;i++){
      const a=rnd(0,6.28),r=rnd(40,80);
      part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.35,vy:-Math.sin(a)*r/.35,life:.35,size:rnd(2,4),rgb:pick(['255,180,60','255,120,40'])});
    }
    await wait(380);
    flash('255,150,60',.4,.3);hitStop(80);rumble(1.1,12);
    const bz=setInterval(()=>sfx('fire'),330),hitSet=new Set();
    try{
      await fireBreath(m,al,1,{dur:1200,speed:900,n:15,mouthFront:true,onHit:t=>{
        if(!t.alive||hitSet.has(t))return;
        hitSet.add(t);shake(6);groundCrack(cx(t),t.y+t.oy,'255,150,40',110);
        hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
      }});
    }finally{clearInterval(bz);}
    S0.pose='idle';jaw=0;
    await dimTo(0,null,250);
  };
}}
