const {chromium}=require('playwright');const D=process.argv[2];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1920,height:950}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(2500);
await p.evaluate(()=>{S.test=true;TEST['Mindent megvesz']();TEST['Próbaterem']();});await p.waitForTimeout(2000);
await p.evaluate(()=>{const e2=mkEnemy('slime',SLOTS[3][1][0],SLOTS[3][1][1],8);for(const x of [e2]){x.hp=x.maxHp=99999;}S.enemies.push(e2);});
console.log('lili skills',await p.evaluate(()=>heroSkills(S.heroes.find(h=>h.type==='fairy')).map(id=>SK[id].name).join(', ')));
const shots=[['monk','guard','GUARD',[600]],['fairy','lightshield','SK',[700]]];
for(const [who,key,kind,times] of shots){
  const r=p.evaluate(([who,key,kind])=>{const h=S.heroes.find(x=>x.type===who);h.mp=h.maxMp;if(kind==='GUARD')return perform(h,{type:'guard'}).then(()=>'ok');
    const sk=kind==='LIMIT'?LIMITS[who]:{...SK[key],id:key};const al=S.enemies.filter(e=>e.alive);
    return perform(h,{type:'skill',sk,targets:sk.tgt==='enemy'?[al[0]]:sk.tgt==='allies'?S.heroes:al}).then(()=>JSON.stringify(S.enemies.map(e=>Object.keys(e.st).join('+'))));},[who,key,kind]);
  let last=0;for(const t of times){await p.waitForTimeout(t-last);last=t;await p.screenshot({path:`${D}/v_${key}_${t}.png`,clip:{x:0,y:0,width:1290,height:740}});}
  console.log(key,await r);await p.evaluate(()=>{S.enemies.forEach(e=>{e.hp=e.maxHp;e.st={};e.shrinkK=1;});S.heroes.forEach(h=>{h.st={};h.guard=false;});});}
await b.close();})();
