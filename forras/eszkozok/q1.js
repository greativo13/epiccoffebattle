(()=>{const out=[];for(const d of SUMMONS){const L=[];for(const Z of ZONES)for(const l of Z.levels)if((l.battles||[]).some(bt=>bt.includes(d.id)))L.push(l.id);out.push([d.id,d.req,L.join(',')]);}
 const kings=[];for(const Z of ZONES)for(const l of Z.levels)if(JSON.stringify(l.battles).includes('king'))kings.push(l.id+':'+JSON.stringify(l.battles));return {out,kings};})()
