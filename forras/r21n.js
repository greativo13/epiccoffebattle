// ===== Tesztlap „Megnézem a játékban” gomb: index.html?proba=… egyenesen a Próbaterembe visz, és lejátssza a kért dolgot =====
// Formátum: hero:<hőstípus>:<képesség-id | attack | limit> · pair:<páros név> · foe:<ellenfél>:<támadás-id> · summon:<idézés-id>
// A mentést nem bántja: ilyenkor a játék nem ment (a próbához minden fel van oldva, de csak erre a betöltésre).
(()=>{const q=new URLSearchParams(location.search).get('proba');if(!q)return;
  const waitPick=async()=>{for(let i=0;i<200&&!(S.pick&&S.pick.h);i++)await wait(100);return S.pick&&S.pick.h;};
  const run=async()=>{try{saveGame=function(){};if(typeof saveNgp==='function')saveNgp=function(){};
    hideOverlay&&hideOverlay();S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();await waitPick();await wait(600);
    const [kind,a,b]=q.split(':');const R=S.roster||S.heroes;
    const bring=(t,keep=[])=>{const h=R.find(x=>x.type===t);if(h&&!S.heroes.includes(h)&&typeof arenaSwap==='function'){const out=S.heroes.find(x=>!keep.includes(x)&&(!['wizard','witch'].includes(x.type)||x===S.heroes[S.heroes.length-1]))||S.heroes.find(x=>!keep.includes(x));arenaSwap(out,h);}return h;};
    const tg=sk=>sk.tgt==='enemies'?S.enemies.filter(e=>e.alive):sk.tgt==='allies'?S.heroes.filter(h=>h.alive):sk.tgt==='self'?[S.pick.h]:sk.tgt==='ally'?[S.heroes.find(h=>h!==S.pick.h&&h.alive)||S.pick.h]:sk.tgt==='deadAlly'?(()=>{const d=S.heroes.find(h=>h!==S.pick.h);d.hp=0;d.alive=false;return [d];})():[S.enemies.find(e=>e.alive)];
    if(kind==='hero'){const h=bring(a);if(!h)return;finish({type:'arena',hero:h});await wait(500);await waitPick();
      const sk=b==='attack'?ATTACKS[a]:b==='limit'?LIMITS[a]:SK[b];if(sk)finish({type:'skill',sk,targets:tg(sk)});}
    else if(kind==='pair'){const p=PAIRS.find(x=>x.name===a);if(!p)return;const A1=bring(p.a),B1=bring(p.b,[A1]);finish({type:'arena',hero:A1});await wait(500);await waitPick();A1.limit=B1.limit=100;
      finish({type:'skill',sk:{id:'pair',name:p.name,tgt:'enemies',kind:'mag',pow:p.pow,elem:p.elem,status:p.status,anim:'pairAtk',pair:p,partner:B1,desc:p.desc},targets:S.enemies.filter(e=>e.alive)});}
    else if(kind==='foe')finish({type:'arena',cmd:'foeSkill',id:b,foe:a});
    else if(kind==='summon'){const d=SUMMONS.find(x=>x.id===a);if(d)finish({type:'summon',def:d});}
  }catch(e){console.error(e);}};
  const go=()=>setTimeout(run,1200);if(document.readyState==='complete')go();else addEventListener('load',go);})();
