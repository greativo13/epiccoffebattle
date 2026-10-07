// használat: node imgspy.js <hős képesség id>  – kiírja, milyen nagy képek rajzolódnak a képesség közben, és melyik függvényből
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const r=await p.evaluate(async skid=>{const names=new Map();const tag=(o,n)=>{if(o&&typeof o==='object')names.set(o,n);};
 for(const k in FX_IMG)tag(FX_IMG[k],'FX_IMG.'+k);for(const k in ENEMY_SPR)tag(ENEMY_SPR[k],'ENEMY_SPR.'+k);for(const k in R17I)tag(R17I[k],'R17I.'+k);
 const seen={};const o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...a){if(window.__spy&&this.canvas===document.querySelector('canvas')){const w=a.length>=4?a[a.length-2]:im.width;if(Math.abs(w)>150){const st=(new Error().stack.split('\n')[2]||'').trim().slice(0,90);const k=(names.get(im)||('?'+im.width+'x'+im.height))+' @ '+st;seen[k]=(seen[k]||0)+1;}}return o.call(this,im,...a);};
 const ty=Object.keys(SHOP_SKILLS).find(t=>SHOP_SKILLS[t].some(q=>q[0]===skid))||Object.keys(HERO_DEF).find(t=>(HERO_DEF[t].skills||[]).includes(skid));let h=S.heroes.find(q=>q.type===ty);if(!h){h=(S.roster||[]).find(q=>q.type===ty)||mkHero(ty);const r=S.heroes[S.heroes.length-1];h.x=r.x;h.y=r.y;h.alive=true;h.hp=h.maxHp=9999;h.st={};S.heroes[S.heroes.length-1]=h;}
 const sk=SK[skid];const tg=sk.tgt==='enemies'?S.enemies.filter(e=>e.alive):[S.enemies.find(e=>e.alive)];window.__spy=true;await perform(h,{type:'skill',sk,targets:tg});await new Promise(r=>setTimeout(r,1500));window.__spy=false;return seen;},process.argv[2]);
console.log(JSON.stringify(r,null,1));await b.close();})();
