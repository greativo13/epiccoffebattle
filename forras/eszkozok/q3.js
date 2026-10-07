(async()=>{const out={};S.diff=0;const L=ZONES[0].levels[0];startLevel(L);await new Promise(r=>setTimeout(r,2500));
 out.enemies=S.enemies.map(e=>[e.type,e.maxHp,e.gold]);out.idx=S.battleIdx;
 for(const e of S.enemies){e.hp=0;e.alive=false;}try{await victory();}catch(err){out.err=err.message;}await new Promise(r=>setTimeout(r,2600));
 out.idx2=S.battleIdx;out.ov=(document.querySelector('.ov-title')||{}).textContent||null;out.req=SUMMONS.filter(d=>['cgolem','king','cannon'].includes(d.id)).map(d=>d.id+':'+d.req);
 out.oak=EN_DEF.shroom.elem;out.drain=SK.drain.elem;out.plague=SK.plague.name;return out;})()
