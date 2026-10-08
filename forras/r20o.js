// A térkép eredeti, 2026. október 1-jei elrendezésének visszaállítása.
// A később hozzáadott régiók megtartják a jelenlegi térképpontjaikat.
{
  const R20O_MAP_POS = [
    [[18,80],[31,81],[41,68],[25,63]],
    [[27,42],[23,30],[44,36],[35,21]],
    [[52,78],[58,71],[74,71],[66,47]],
    [[77,51],[84,43],[91,37],[85,17]],
    [[24.1,87.5],[28,82],[31.3,75.6],[35.8,72]],
    [[37.3,63.7],[39.8,56.4],[44.4,52.8],[49.4,52.2]],
    [[53.9,48.6],[58.2,44],[63.2,44.2],[68.1,45.9]],
    [[73,43.9],[77.2,39.1],[80.7,32.7],[85.1,28.8]]
  ];
  const R20O_ZONE_POS = [[28,49],[13,15],[49,57],[86,61]];

  if (Array.isArray(MAP_POS)) {
    for (let i=0; i<R20O_MAP_POS.length; i++) MAP_POS[i]=R20O_MAP_POS[i];
  }
  if (Array.isArray(MAP_ZONE_POS)) {
    for (let i=0; i<R20O_ZONE_POS.length; i++) MAP_ZONE_POS[i]=R20O_ZONE_POS[i];
  }

  const style=document.createElement('style');
  style.textContent=`
    .map-view .mnode {
      box-sizing:border-box!important; position:absolute!important;
      display:grid!important; place-items:center!important; grid-template-columns:none!important;
      gap:0!important; width:clamp(22px,4vw,36px)!important; height:clamp(22px,4vw,36px)!important;
      min-width:22px!important; min-height:22px!important; padding:0!important;
      border:2px solid #5a2c06!important; border-radius:50%!important;
      background:radial-gradient(circle at 35% 30%,#fff1b8,#f0a52c)!important;
      box-shadow:0 2px 0 #3a1c04,0 0 0 2px rgba(255,240,190,.55)!important;
      color:#2a1300!important; font:clamp(11px,2vw,18px) var(--display)!important;
      text-shadow:none!important; text-align:center!important;
      transform:translate(-50%,-50%)!important; z-index:3!important; overflow:visible!important;
      cursor:pointer!important;
    }
    .map-view .mnode::before,.map-view .mnode::after { content:none!important; display:none!important; }
    .map-view .mnode.done {
      background:radial-gradient(circle at 35% 30%,#d6ffd0,#4fb85e)!important;
      color:#0c3a14!important;
    }
    .map-view .mnode.boss {
      width:clamp(28px,5vw,46px)!important; height:clamp(28px,5vw,46px)!important;
      background:radial-gradient(circle at 35% 30%,#ffc9a8,#d8452a)!important;
      color:#2a0500!important;
    }
    .map-view .mnode.boss.done {
      background:radial-gradient(circle at 35% 30%,#d6ffd0,#4fb85e)!important;
      color:#0c3a14!important;
    }
    .map-view .mnode:disabled {
      background:#8d8372!important; border-color:#5c5547!important;
      box-shadow:none!important; opacity:.7!important; cursor:not-allowed!important;
    }
    .map-view .mnode.next { animation:mpulse 1.2s ease-in-out infinite!important; }
    .map-view .map-trail,.map-view .map-route { display:none!important; visibility:hidden!important; }
    .map-view svg[data-r20d-route] { display:none!important; visibility:hidden!important; }
  `;
  document.head.appendChild(style);

  const beforeR20O=mapScreen;
  mapScreen=function(...args) {
    const result=beforeR20O.apply(this,args);
    const restoreOriginalMap=()=>{
      const view=ov&&ov.querySelector('.map-view');
      if(!view)return;

      const rows=[];
      ZONES.forEach((zone,zoneIndex)=>zone.levels.forEach((level,levelIndex)=>rows.push({zoneIndex,levelIndex,level})));
      const nodes=[...view.querySelectorAll('.mnode')];
      const levelNodes=nodes.slice(0,rows.length);
      levelNodes.forEach((node,i)=>{
        const row=rows[i];
        const position=R20O_MAP_POS[row.zoneIndex]?.[row.levelIndex]||R20O_MAP_POS[0][row.levelIndex%4];
        node.style.removeProperty('display');
        node.style.setProperty('left',`${position[0]}%`,'important');
        node.style.setProperty('top',`${position[1]}%`,'important');
        node.style.setProperty('width',node.classList.contains('boss')?'clamp(28px,5vw,46px)':'clamp(22px,4vw,36px)','important');
        node.style.setProperty('height',node.classList.contains('boss')?'clamp(28px,5vw,46px)':'clamp(22px,4vw,36px)','important');
        node.style.setProperty('min-width','22px','important');
        node.style.setProperty('min-height','22px','important');
        node.style.setProperty('padding','0','important');
        node.style.setProperty('border',node.disabled?'2px solid #5c5547':'2px solid #5a2c06','important');
        node.style.setProperty('border-radius','50%','important');
        node.style.setProperty('background',node.disabled?'#8d8372':node.classList.contains('done')?'radial-gradient(circle at 35% 30%,#d6ffd0,#4fb85e)':node.classList.contains('boss')?'radial-gradient(circle at 35% 30%,#ffc9a8,#d8452a)':'radial-gradient(circle at 35% 30%,#fff1b8,#f0a52c)','important');
        node.style.setProperty('box-shadow',node.disabled?'none':'0 2px 0 #3a1c04,0 0 0 2px rgba(255,240,190,.55)','important');
        node.style.setProperty('color',node.classList.contains('done')?'#0c3a14':node.classList.contains('boss')?'#2a0500':'#2a1300','important');
        node.style.setProperty('font','clamp(11px,2vw,18px) var(--display)','important');
        node.style.setProperty('text-shadow','none','important');
        node.style.setProperty('transform','translate(-50%,-50%)','important');
        node.style.setProperty('z-index','3','important');
        const number=row.levelIndex+1;
        const label=node.classList.contains('done')?'✓':node.classList.contains('boss')?'☠':node.disabled?'':String(number);
        if(node.childElementCount||node.textContent!==label)node.replaceChildren(document.createTextNode(label));
        node.setAttribute('aria-label',node.title||`Pálya ${number}`);
      });

      // A titkos pálya nincs benne a ZONES pályasorában: a saját jelét hagyjuk
      // meg, és visszaállítjuk az eredetileg kijelölt, szabad 63% / 67% pontra.
      const secretNode=nodes.slice(rows.length).find(node=>node.title.includes('Elfeledett Pörkölő'));
      if(secretNode){
        secretNode.style.removeProperty('display');
        secretNode.style.setProperty('left','63%','important');
        secretNode.style.setProperty('top','67%','important');
        secretNode.style.setProperty('transform','translate(-50%,-50%)','important');
      }

      const zoneLabels=[...view.querySelectorAll('.map-zone')];
      zoneLabels.forEach((node,i)=>{
        const point=R20O_ZONE_POS[i];
        if(point){node.style.setProperty('left',`${point[0]}%`,'important');node.style.setProperty('top',`${point[1]}%`,'important');}
      });
      view.querySelectorAll('.map-trail,.map-route').forEach(node=>node.remove());
      view.querySelectorAll('svg[data-r20d-route]').forEach(node=>{node.replaceChildren();node.style.setProperty('display','none','important');});
      window.__r20dMapPaint=restoreOriginalMap;
    };
    if(result&&typeof result.then==='function')return result.then(value=>{
      restoreOriginalMap();setTimeout(restoreOriginalMap,160);setTimeout(restoreOriginalMap,320);return value;
    });
    restoreOriginalMap();setTimeout(restoreOriginalMap,160);setTimeout(restoreOriginalMap,320);return result;
  };
}
