
// ===== 21. kör: logikai javítások a teljes játék átnézése alapján =====
// 1) A méreg nem hat a gépekre (CLAUDE.md A6): óramű, ágyú, Rozsdakirály, kávégépek, szamovár.
{const MACH=['clock','cannon','rustking','koffgolem','samovar','ancient'];
 for(const t of MACH){const d=EN_DEF[t];if(!d)continue;d.elem=Object.assign({},d.elem||{},{poison:0});d.statusImmune=[...new Set([...(d.statusImmune||[]),'poison'])];
   if(d.info&&!/méreg nem/i.test(d.info))d.info+=' Gép: a méreg nem árt neki.';else if(!d.info)d.info='Gép: a méreg nem árt neki.';}
}

// 2) A kettéváló Zöld nyálka darabja (Kis nyálka) is méregálló, mint a szülője.
if(EN_DEF.slimelet){const d=EN_DEF.slimelet;d.elem=Object.assign({},d.elem||{},{poison:0});d.statusImmune=[...new Set([...(d.statusImmune||[]),'poison'])];}

// 3) A játék pénze arany: a titkos pálya leírása is aranyat írjon.
if(typeof SECRET!=='undefined'&&SECRET.intro)SECRET.intro=SECRET.intro.replace(/(\d+)\s*kávébab/g,'$1 arany');

// 4) Logikus elemek a támadásoknál és gyenge pontoknál
if(ESK.featherstorm)ESK.featherstorm.elem='phys';          // Párnalovag – Tollvihar: tollak, nem fény
if(ESK.sweetdream)ESK.sweetdream.elem='none';              // Vattacukor-bárány – Édes álom: altatás, semleges
if(ESK.jamwave)ESK.jamwave.elem='water';                   // Lekvárdzsinn – Lekvárhullám: ragacsos folyadék, nem méreg
if(EN_DEF.doll){const e=Object.assign({},EN_DEF.doll.elem||{});delete e.holy;e.thunder=Math.max(e.thunder||1,1.5);EN_DEF.doll.elem=e;} // Porcelánbaba: törékeny porcelán, nem fény-gyenge

// 5) Grog boltlistája a nyitás sorrendjében (az Óriásnövés 2-2-től nyílik, ne a lista végén legyen)
if(SHOP_SKILLS.orc){const L=SHOP_SKILLS.orc,i=L.findIndex(x=>x[0]==='giantgrow');if(i>=0){const it=L.splice(i,1)[0];const j=L.findIndex(x=>x[0]==='earthsplit');L.splice(j+1,0,it);}}

// 6) Bestiárium: akiknek fázisonként/állásonként változik a gyenge pontja (Espresszó, Vén Tölgy, Morcus, Kamilla), azoknál ez látsszon az üres sor helyett
{const b0=r14Bestiary;r14Bestiary=function(){const r=b0.apply(this,arguments);try{const rows=[...document.querySelectorAll('.shop-row')];
  for(const row of rows){const nm=row.querySelector('.shop-name'),ds=row.querySelector('.shop-desc');if(!nm||!ds||nm.textContent==='???')continue;
    const t=Object.keys(EN_DEF).find(k=>EN_DEF[k].name===nm.textContent.replace(' 👑',''));if(t&&EN_DEF[t].elemFn&&!/Gyenge:/.test(ds.textContent))ds.textContent=ds.textContent.replace(' Legyőzve',' Gyenge pontjai harc közben változnak – figyeld a feliratot! Legyőzve');}}catch(e){}return r;};}
