const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:1280,height:720}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(5000);
const url=await p.evaluate(()=>{const c=document.createElement('canvas');c.width=1400;c.height=700;const save=ctx;const g=c.getContext("2d");ctx=g;try{
 g.fillStyle='#6a8a4a';g.fillRect(0,0,1400,700);
 qSzPot(120,140,2,0);qPlate(320,120,0,2.4,.6);qSheep(520,200,2.2,0,false,false);qSheep(760,200,2.2,0,true,false);qDizi(1050,100,300,0);qJamJar(1250,130,0,3);
 qAmanita(100,420,3,0);qInkBeast(330,520,1.6,1,.6,false);qShadowHand(600,600,1.1,1,.4,false);qDie(780,420,3,.3,5,'fire');qPorcFan(950,560,-1.6,140);qSugarBomb(1230,420,0,3);
 const V=r12VaseShieldCanvas();g.drawImage(V.c,1100,480,130,195);drawFence(1100,690,150,1);qThorn(860,330,0,40);qCupP(980,330,0,2.5);qPorcShard(1100,330,0,3);qStar(1200,330,40,0);
 return c.toDataURL();}finally{ctx=save;}});
require('fs').writeFileSync('props.png',Buffer.from(url.split(',')[1],'base64'));console.log('hibák',errs.join('|')||'nincs');await b.close();})();
