// node espy.js enemyType skill – melyik függvények rajzolnak (fxImage, glow, part) az ellenséges támadás közben
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(1500);
const r=await p.evaluate(async([type,sk])=>{S.enemies.forEach(e=>e.alive=false);const e=mkEnemy(type,SLOTS[1][0][0],SLOTS[1][0][1],30);e.hp=e.maxHp=99999;S.enemies.push(e);for(const h of S.heroes){h.hp=h.maxHp=99999;}
 const seen={};const spy=(name,fn)=>function(){const st=name+' '+(name==='glow'||name==='part'?JSON.stringify(name==='part'?{rgb:arguments[0].rgb,shape:arguments[0].shape}:arguments[3]):String(arguments[0]))+' <'+new Error().stack.split('\n').slice(2,5).map(x=>x.trim().replace(/\(http.*?:(\d+):\d+\)/,'$1')).join(' < ');seen[st]=(seen[st]||0)+1;return fn.apply(this,arguments);};
 fxImage=spy('fxImage',fxImage);glow=spy('glow',glow);part=spy('part',part);
 await useEnemySkill(e,ESK[sk],S.heroes[0]);await new Promise(r=>setTimeout(r,1500));return seen;},[process.argv[2],process.argv[3]]);
console.log(Object.entries(r).sort((a,b)=>b[1]-a[1]).slice(0,25).map(([k,v])=>v+'  '+k.slice(0,230)).join('\n'));await b.close();})();
