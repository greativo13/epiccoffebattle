// 20. kör – az Espresszó az ellenséges sárkány meglévő tűzleheletét használja.
{const es=SUMMONS.find(x=>x.id==='espresso');if(es){let jaw=0;
  const image=()=>r18EspImg(jaw)||ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];es.img=image;
  es.run=async(P,S0)=>{
    const al=foesAlive();if(!al.length)return;
    const im=ENEMY_SPR.espresso||ENEMY_SPR['espresso-attack'];
    const M=()=>im?sumPt(es,S0,im,.145,.302):{x:S0.x+120,y:S0.y-200};
    S0.pose='attack';jaw=1;
    await dimTo(.35,'40,5,0',200);
    const ash=S0.stance==='ash';
    sfx('fire');await bodyWind(S0,300,.08);
    const m=M();
    for(let i=0;i<24;i++){
      const a=rnd(0,6.28),r=rnd(40,90);
      part({x:m.x+Math.cos(a)*r,y:m.y+Math.sin(a)*r,vx:-Math.cos(a)*r/.35,vy:-Math.sin(a)*r/.35,life:.35,size:rnd(2,4),rgb:ash?'230,230,240':'255,180,60'});
    }
    await wait(200);bodyStrike(S0,200,-.1);
    flash(ash?'220,225,240':'255,150,60',.4,.3);hitStop(80);rumble(1.3,12);
    const bz=setInterval(()=>sfx('fire'),300);
    try{
      await fireBreath(M(),al,1,{dur:1400,speed:950,n:22,smoke:ash,onHit:t=>{
        if(!t.alive)return;
        shake(7);groundCrack(cx(t),t.y+t.oy,ash?'200,215,255':'255,150,40',110);
        hit(P,t,{name:'Tűzlehelet',kind:'mag',pow:3.2,elem:'fire',tgt:'enemies',anim:'flames',status:['burn',1,3]});
      }});
    }finally{clearInterval(bz);}
    await bodySettle(S0);S0.pose='idle';jaw=0;
    await dimTo(0,null,250);
  };
}}
