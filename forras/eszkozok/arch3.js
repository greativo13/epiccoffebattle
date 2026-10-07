const {chromium}=require('playwright');const D=process.argv[2],only=process.argv[3];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);const e3=mkEnemy('slime',SLOTS[3][2][0],SLOTS[3][2][1],8);for(const x of [e2,e3]){x.hp=x.maxHp=99999;}S.enemies.push(e2,e3);});
await p.click('.card:nth-of-type(4)');await p.waitForTimeout(600);
console.log(await p.evaluate(()=>[...document.querySelectorAll('#btns .cbtn .bl')].map(x=>x.textContent).slice(0,20).join(' | ')));
const list=[['ATK',700],['palm',520],['tripleshot',1050],['arrowrain',1900],['lotusarrow',1150],['mantraarrow',1500],['shadowpin',1100],['bouncearrow',900],['teabomb',1050],['innercalm',1200],['incense',1300],['wakeuptea',1000],['greentea',1000],['blacktea',1100],['manatea',1000],['flurry',700],['LIMIT',3000]];
for(const [key,ms] of list){if(only&&!only.split(',').includes(key))continue;
  const r=p.evaluate(key=>{const h=S.heroes.find(x=>x.type==='monk');h.mp=h.maxMp;const sk=key==='ATK'?ATTACKS.monk:key==='LIMIT'?LIMITS.monk:{...SK[key],id:key};const al=S.enemies.filter(e=>e.alive);
    return perform(h,{type:'skill',sk,targets:sk.tgt==='enemy'?[al[0]]:sk.tgt==='allies'?S.heroes.filter(x=>x.alive):sk.tgt==='self'?[h]:al}).then(()=>JSON.stringify({en:S.enemies.map(e=>e.maxHp-e.hp),est:S.enemies.map(e=>Object.keys(e.st).join('+')),hs:S.heroes.map(x=>Object.keys(x.st).join('+')),pose:h.pose}));},key);
  await p.waitForTimeout(ms);await p.screenshot({path:D+'/a_'+key+'.png',clip:{x:0,y:0,width:1290,height:740}});console.log(key,await r);
  await p.evaluate(()=>{S.enemies.forEach(e=>{e.hp=e.maxHp;e.st={};});S.heroes.forEach(h=>{h.st={};h.hp=Math.round(h.maxHp*.6);});});}
await b.close();})();
