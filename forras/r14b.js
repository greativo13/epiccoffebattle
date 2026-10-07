// ---- Próbaterem: a páros támadások is kipróbálhatók (a hős menüjében a közös támadás után). Ha a társ pihen, beáll egy harmadik hős helyére.
{const aM=arenaMenu;arenaMenu=function(h){const sB=setButtons;
  setButtons=function(list){try{if(S.arena&&Array.isArray(list)){const i=list.findIndex(x=>x&&x.sub==='KÖZÖS TÁMADÁS');const roster=S.roster&&S.roster.length?S.roster:S.heroes;
      const add=PAIRS.filter(p=>p.a===h.type||p.b===h.type).map(p=>{const o=roster.find(x=>x.type===(p.a===h.type?p.b:p.a));if(!o)return null;
        return {label:'PÁROS: '+p.name,sub:'+ '+o.name,cls:'limit',desc:p.desc,on:()=>{
          if(!S.heroes.includes(o)){const out=S.heroes.find(x=>x!==h&&x.type!=='monk')||S.heroes.find(x=>x!==h);if(out)arenaSwap(out,o);}
          for(const x of [h,o]){x.alive=true;if(x.hp<=0)x.hp=x.maxHp;x.limit=100;}updateHUD();
          const sk={id:'pair',name:p.name,tgt:'enemies',kind:'mag',pow:p.pow,elem:p.elem,status:p.status,anim:'pairAtk',pair:p,partner:o,desc:p.desc};
          finish({type:'skill',sk,targets:S.enemies.filter(e=>e.alive)});}};}).filter(Boolean);
      if(add.length)list=[...list.slice(0,i<0?list.length:i+1),...add,...list.slice(i<0?list.length:i+1)];}}catch(err){console.error(err);}
    return sB.call(this,list);};
  try{return aM.apply(this,arguments);}finally{setButtons=sB;}};}
