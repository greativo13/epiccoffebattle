(async()=>{const o={};const w=ms=>new Promise(r=>setTimeout(r,ms));
 titleScreen();await w(300);o.slots=[...document.querySelectorAll('.zone-chip')].map(b=>b.textContent).join('|');
 S.test=true;S.save.cleared=['1-1','1-2','1-3','1-4','2-1'];for(let i=0;i<8;i++)S.save.seen.push('ch'+i);mapScreen(0);await w(600);{const b=[...document.querySelectorAll('button')].find(x=>/térképre/.test(x.textContent));if(b)b.click();}await w(800);o.mapbtns=[...document.querySelectorAll('.r14b')].map(b=>b.textContent).join('|');
 r14Bestiary(()=>mapScreen());await w(300);o.best=(document.querySelector('.ov-box .gold')||{}).textContent;
 const L=r14DailyLevel();o.daily=JSON.stringify(L.battles)+' '+L.elvl;
 S.speed=1;document.getElementById('t-speed').click();o.speed=S.speed+' '+document.getElementById('t-speed').textContent;document.getElementById('t-speed').click();document.getElementById('t-speed').click();
 const e=mkEnemy('oolong',700,440,40);o.boss=[e.maxHp,Math.round(e.atk)];o.weak=r14Weak(mkEnemy('slime',0,0,3));
 const h=S.heroes.find(x=>x.type==='wizard');const m=S.heroes.find(x=>x.type==='witch');h.limit=60;m.limit=60;o.pair=(r14Pair(h)||{}).p?.name;return o;})()
