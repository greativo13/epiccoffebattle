
// ===== 23. kör, 4. rész: a régi hősök tesztlap-megjegyzései =====
ATTACKS.witch.name='Pálcacsapás';
// Égiháború: Zeusz villámai sárgák
let ZAP_PAL=null;
{const zs=zapStroke;zapStroke=function(pts,w,a){if(!ZAP_PAL)return zs.apply(this,arguments);const pass=[[w*3.2,ZAP_PAL[0],.3],[w*1.6,ZAP_PAL[1],.75],[w*.55,'255,255,235',1]];
  for(const [lw,c,al] of pass){ctx.strokeStyle=`rgba(${c},${al*a})`;ctx.lineWidth=lw;ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}};}
{const z0=A.zeusStorm;A.zeusStorm=async function(u,ts,sk){ZAP_PAL=['255,170,20','255,220,60'];const gl=glow;glow=function(x,y,r,rgb,a){return gl.call(this,x,y,r,rgb==='120,200,255'?'255,210,80':rgb,a);};try{return await z0.apply(this,arguments);}finally{setTimeout(()=>{ZAP_PAL=null;glow=gl;},800);}};}
// Sötét alku: nincsenek lila lángok Morgána körül
let PACT_T=0,PACT_X=0;{const df=darkFlame;darkFlame=function(o){if(performance.now()<PACT_T&&o&&Math.abs(o.x-PACT_X)<170)return;return df.apply(this,arguments);};}
{const p0=A.pactFx;A.pactFx=async function(u){PACT_X=cx(u);PACT_T=performance.now()+9000;try{return await p0.apply(this,arguments);}finally{PACT_T=performance.now()+4000;}};}
// Napkitörés: a sárga vékony csíkok helyett lánggomolyok
{const s0=A.solarNova;A.solarNova=async function(){const pp=part;part=function(o){if(o&&o.shape==='streak'){o.shape='fire';o.size=(o.size||4)*2.2;}return pp.call(this,o);};try{return await s0.apply(this,arguments);}finally{part=pp;}};}
// Csillaghullás: sokkal több csillag zuhan
{const c0=A.starfall;A.starfall=async function(u,ts,sk){const al=ts.filter(t=>t.alive);for(let i=0;i<40;i++)setTimeout(()=>{const t=pick(al)||ts[0];if(!t)return;const x=cx(t)+rnd(-120,120);fxFly('star',x+rnd(-160,-60),-60,x,midY(t)+rnd(-60,60),rnd(420,620),{size:rnd(60,110),trail:['255,240,170','255,255,255'],spin:6,add:true});},i*45);return c0.apply(this,arguments);};}
