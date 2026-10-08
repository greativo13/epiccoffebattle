// 21. kör – Matcha-föld: kampányszabályok és a hiányzó harci műveletek.
{
  const r21Level=id=>S.level&&S.level.id===id;
  const r21Alive=()=>S.heroes.filter(h=>h.alive);
  const r21Sleeping=()=>S.heroes.filter(h=>h.alive&&h.st&&h.st.sleep);
  const r21Set=(h,k,v)=>{h.st=h.st||{};h.st[k]=v;};

  // A hab jelzése buborékos, a képet nem takarja el.
  if(typeof drawEntity==='function'){
    const r21DrawEntity=drawEntity;
    drawEntity=function(e){const out=r21DrawEntity.apply(this,arguments);if(e&&e.alive&&e.st&&e.st.foam){
      const x=cx(e),y=midY(e),r=Math.max(18,e.w*e.scale*.28);ctx.save();ctx.globalCompositeOperation='lighter';
      for(let i=0;i<7;i++){const a=T*1.8+i*2.399,rr=r*(.36+(i%3)*.16),bx=x+Math.cos(a)*rr,by=y+Math.sin(a*1.4)*rr*.72;ctx.globalAlpha=.24+.12*Math.sin(T*4+i);ctx.fillStyle=i%2?'#b7ec81':'#e2ffc2';ctx.beginPath();ctx.arc(bx,by,4+(i%3)*2,0,6.29);ctx.fill();ctx.strokeStyle='rgba(245,255,220,.75)';ctx.lineWidth=1.4;ctx.stroke();}
      ctx.restore();}return out;};
  }

  // A csendmérő kizárólag a kijelölt folyosókon töltődik. Három varázslat után
  // a következő alaptámadás megrendíti a mozaiksárkányt.
  const r21Meter={draw(){if(!r21Level('10-2')&&!r21Level('12-2'))return;const n=Math.max(0,Math.min(3,S.r21Silence||0));ctx.save();ctx.textAlign='center';ctx.font='bold 15px sans-serif';ctx.lineWidth=3;ctx.strokeStyle='rgba(22,15,35,.85)';ctx.fillStyle='#f4e8bd';ctx.strokeText('CSENDMÉRŐ',W/2,30);ctx.fillText('CSENDMÉRŐ',W/2,30);for(let i=0;i<3;i++){const x=W/2+(i-1)*28,y=51;ctx.beginPath();ctx.arc(x,y,8,0,6.29);ctx.fillStyle=i<n?'#ffe16c':'rgba(42,31,53,.82)';ctx.fill();ctx.strokeStyle=i<n?'#fff3b0':'#bcaacb';ctx.lineWidth=2;ctx.stroke();}ctx.restore();}};
  effects.push({update(){return true;},draw(){try{r21Meter.draw();}catch(e){}}});

  // Kaelen állapotformái maradjanak egy körig; a támadás maga is végrehajtódik.
  // A csapatcsere külön akciógombként kerül a hősmenübe: a játékos választja a
  // cserehőst, és a szokásos perform-folyamat elhasználja az adott akciót.
  if(typeof menuMain==='function'){
    const r21Menu=menuMain;
    menuMain=function(h){const out=r21Menu.apply(this,arguments);try{
      if(!h||!h.alive||!btnsEl||!S.heroes.includes(h))return out;
      const story=!!(S.level&&/^([9]|1[0-2])-/.test(S.level.id||''));
      const reserve=(S.roster||[]).filter(q=>q&&(!story||q.type!=='fairy'||S.r21LiliAwake)&&q!==h&&!S.heroes.includes(q)).slice(0,2);
      const extras=[];
      if(!(S.r21GongActions>0))for(const incoming of reserve){
        const b=document.createElement('button');b.type='button';b.className='cbtn sec';b.innerHTML=`<span class="bl">Csere: ${incoming.name}</span><span class="bs">1 akció</span>`;
        const sk={id:'r21swap',name:'Hőscsere',kind:'buff',tgt:'self',pow:0,anim:'r21Swap',r21Swap:{out:h,incoming}};
        b.addEventListener('click',()=>finish({type:'skill',sk,targets:[h]}));b.addEventListener('mouseenter',()=>{if(descEl)descEl.textContent=`${h.name} helyére ${incoming.name} áll be.`;});extras.push(b);
      }
      if(r21Sleeping().length&&!(h.st&&h.st.sleep))for(const asleep of r21Sleeping()){
        const b=document.createElement('button');b.type='button';b.className='cbtn limit';b.innerHTML=`<span class="bl">Felráz: ${asleep.name}</span><span class="bs">1 akció</span>`;
        const sk={id:'r21wake',name:'Felrázás',kind:'buff',tgt:'ally',pow:0,anim:'r21Wake',r21Wake:asleep};
        b.addEventListener('click',()=>finish({type:'skill',sk,targets:[asleep]}));extras.push(b);
      }
      if(r21Level('11-2')&&!S.r21ValveClosed){const b=document.createElement('button');b.type='button';b.className='cbtn sec';b.innerHTML='<span class="bl">Gőzszelep elzárása</span><span class="bs">1 akció · leállítja a gőzt</span>';const sk={id:'r21valve',name:'Szelep elzárása',kind:'buff',tgt:'self',pow:0,anim:'r21Valve'};b.addEventListener('click',()=>finish({type:'skill',sk,targets:[h]}));extras.push(b);}
      for(const b of extras)btnsEl.insertBefore(b,btnsEl.firstChild);
    }catch(e){console.error(e);}return out;};
  }
  A.r21Swap=async(u,ts,sk)=>{const q=sk.r21Swap;if(!q)return;const i=S.heroes.indexOf(q.out);if(i<0||S.heroes.includes(q.incoming))return;q.incoming.x=q.out.x;q.incoming.y=q.out.y;q.incoming.ox=0;q.incoming.oy=0;q.incoming.alive=true;if(q.incoming.hp<=0)q.incoming.hp=Math.max(1,Math.round(q.incoming.maxHp*.5));S.heroes[i]=q.incoming;updateHUD();showBanner(`${q.incoming.name} beállt ${q.out.name} helyére.`,true);sfx('whoosh');};
  A.r21Wake=async(u,ts,sk)=>{const q=sk.r21Wake||ts[0];if(q&&q.st){q.st.sleep=0;q.sleep=0;q.alive=true;if(q.hp<=0)q.hp=1;showBanner(`${q.name} felébredt.`,true);sfx('holy');updateHUD();}};
  A.r21Valve=async()=>{S.r21ValveClosed=true;showBanner('A gőzszelep elzárva. A kád lehűl.',true);sfx('steam');};

  // Kaelen öt párosa külön, a karakterek szerepéhez kötött befejezést kap.
  if(Array.isArray(PAIRS)){
    const extra=[
      {a:'druid',b:'orc',name:'Medvelovaglás',elem:'nature',pow:1.8,rgb:'122,82,45',desc:'Kaelen medvévé változik, Grog a hátára pattan, és fejszecsapásokkal végigrohan a soron.'},
      {a:'druid',b:'monk',name:'Bambuszliget',elem:'nature',pow:1.5,rgb:'115,190,90',desc:'Jázmin bambusznyilakat lő a földbe; liget nő belőlük, a csapat gyógyul és pontosabban támad.'},
      {a:'druid',b:'wizard',name:'Villámbambusz',elem:'thunder',pow:1.7,rgb:'235,205,70',status:['stun',.4,1],desc:'Zordon villámai feltöltik a talajt; izzó bambuszszárak törnek fel az ellenségek alatt.'},
      {a:'druid',b:'witch',name:'Átokindák',elem:'dark',pow:1.75,rgb:'90,38,145',status:['curse',.55,1],desc:'Morgána sötét mágiája fekete tüskés ostorrá formálja Kaelen indáit; egyenként rátekerednek az ellenfelekre.'},
      {a:'druid',b:'fairy',name:'Harmatkör',elem:'holy',pow:.1,rgb:'155,230,180',desc:'Lili harmatcseppeket hullat, Kaelen virágmezőt növeszt; a csapat gyógyul és megtisztul.'}
    ];
    for(const p of extra)if(!PAIRS.some(q=>q.name===p.name))PAIRS.push(p);
  }
  if(typeof A.pairAtk==='function'){
    const r21Pair=A.pairAtk;
    A.pairAtk=async function(u,ts,sk){const p=sk&&sk.pair;if(!p||!['Medvelovaglás','Bambuszliget','Villámbambusz','Átokindák','Harmatkör'].includes(p.name))return r21Pair.apply(this,arguments);
      const al=(ts||[]).filter(t=>t.alive),v=u,partner=sk.partner||S.heroes.find(h=>h.type===p.a&&h!==u||h.type===p.b&&h!==u);if(!al.length&&p.name!=='Harmatkör')return;
      const glowPair=(x,y,r,c)=>{ctx.save();ctx.globalCompositeOperation='lighter';glow(x,y,r,c,.72);ctx.restore();};
      const hitPair=(h,t,extra={})=>hit(h,t,{...sk,...extra,name:p.name,elem:p.elem});
      await dimTo(.25,p.name==='Átokindák'?'12,5,28':'14,24,18',180);showBanner('Páros támadás: '+p.name,true);sfx('limit');
      if(p.name==='Medvelovaglás'){
        const grog=S.heroes.find(h=>h.type==='orc')||v,kaelen=S.heroes.find(h=>h.type==='druid')||partner||v,x0=cx(grog),end=Math.max(...al.map(cx))+180,done=new Set();grog.pose='attack';
        const gs=grog.scale;await tween(520,k=>{grog.scale=gs*(1+.04*Math.sin(k*Math.PI));grog.jump=18*k;glowPair(cx(grog),midY(grog),70+30*k,'130,95,55');});
        await tween(1050,k=>{grog.ox=(end-x0)*k;grog.jump=Math.sin(k*Math.PI)*56;for(const t of al)if(t.alive&&!done.has(t)&&cx(grog)>cx(t)-45){done.add(t);t.hurt=.5;toss(t,65,420);sfx('axe');hitPair(grog,t,{pow:p.pow,kind:'phys'});shake(12);}});
        grog.ox=0;grog.jump=0;grog.scale=gs;grog.pose='idle';kaelen._r21Form=null;
      }else if(p.name==='Bambuszliget'){
        const {mx,gy}=grp(al);for(let i=0;i<9;i++){const x=mx+(i-4)*75;ctx.save();ctx.strokeStyle='#b98b43';ctx.lineWidth=7;ctx.beginPath();ctx.moveTo(x,gy);ctx.lineTo(x,gy-140-rnd(0,80));ctx.stroke();ctx.restore();for(let j=0;j<3;j++)part({x,y:gy-rnd(30,160),vx:rnd(-60,60),vy:-rnd(70,180),life:.8,size:rnd(7,12),rgb:'150,210,90',shape:'leaf'});}
        for(const t of al)hitPair(v,t,{pow:p.pow,kind:'mag'});for(const h of r21Alive()){h.st=h.st||{};h.st.critUp=1;}if(typeof healAll==='function')healAll(v,.18);showBanner('Bambuszliget: gyógyulás és kritikus esély nőtt.',true);
      }else if(p.name==='Villámbambusz'){
        for(const t of al){const x=cx(t),y=midY(t);for(let i=0;i<4;i++){zapStroke(zapPath(x+rnd(-100,100),y+160,x+rnd(-30,30),y-20,12),9,1);ctx.save();ctx.fillStyle='#b8dc6a';ctx.beginPath();ctx.moveTo(x+rnd(-70,70),y+60);ctx.lineTo(x+rnd(-45,45),y-120);ctx.lineTo(x+rnd(-15,15),y+60);ctx.fill();ctx.restore();}glowPair(x,y,90,'235,205,70');hitPair(v,t,{pow:p.pow,kind:'mag',status:['stun',.4,1]});shake(12);}
      }else if(p.name==='Átokindák'){
        const witch=S.heroes.find(h=>h.type==='witch')||partner||v,src=handPos(witch);for(const t of al){const dst={x:cx(t),y:midY(t)};r20Arc(src,dst,1,'85,35,140',34,T|0);for(let i=0;i<6;i++)part({x:dst.x,y:dst.y,vx:rnd(-120,120),vy:rnd(-100,100),life:.55,size:rnd(5,11),rgb:'82,38,130',shape:'leaf'});hitPair(witch,t,{pow:p.pow,kind:'mag',status:['curse',.55,1]});if(witch.hp<witch.maxHp)witch.hp=Math.min(witch.maxHp,witch.hp+Math.round(t.maxHp*.06));await wait(100);}
      }else{
        for(const h of r21Alive()){for(const k of Object.keys(h.st||{}))if(k!=='regen')h.st[k]=0;h.st=h.st||{};h.st.regen=0;}
        if(typeof healAll==='function')healAll(v,.28);for(let i=0;i<28;i++)part({x:W*.5+rnd(-230,230),y:H*.5+rnd(-120,120),vx:rnd(-30,30),vy:-rnd(40,130),life:.9,size:rnd(4,9),rgb:'170,230,190',shape:'star'});showBanner('A Harmatkör megtisztította és meggyógyította a csapatot.',true);
      }
      for(const t of al)if(t.alive&&p.name==='Harmatkör'){}await wait(250);await dimTo(0,null,200);
    };
  }

  // A gong egy teljes hőskörre csak az alaptámadást hagyja meg.
  if(typeof perform==='function'){
    const r21Perform=perform;
    perform=async function(h,act,...rest){
      if(S.r21GongActions>0&&act&&act.type!=='attack'&&!(act.sk&&act.sk.r21Swap)&&!(act.sk&&act.sk.r21Wake)){
        showBanner('A gong rezeg még: most csak alaptámadást használhatsz.');
        const target=foesAlive()[0];act=target?{type:'attack',targets:[target]}:{type:'attack',targets:[]};
      }
      let doubled=!!S.r21DoubleMP;if(doubled&&act&&act.sk){S.r21DoubleMP=false;}
      const mp=h&&typeof h.mp==='number'?h.mp:null;
      if((r21Level('10-2')||r21Level('12-2'))&&act&&act.sk&&act.sk.kind==='mag'){
        S.r21Silence=Math.min(3,(S.r21Silence||0)+1);
        if(S.r21Silence===3&&!S.r21SilenceReady){S.r21SilenceReady=true;showBanner('A csendmérő megtelt. A következő alaptámadás töri meg a csendet!',true);}
      }
      const result=await r21Perform.call(this,h,act,...rest);
      if(doubled&&mp!=null&&h.mp<mp){const spent=mp-h.mp;h.mp=Math.max(0,h.mp-spent);updateHUD();}
      if(S.r21GongActions>0){S.r21GongActions--;if(!S.r21GongActions)showBanner('A gong hatása elmúlt.');}
      if(S.r21SilenceReady&&act&&act.type==='attack'&&S.enemies.some(e=>e.alive&&e.type==='zen_dragon')){
        const dragon=S.enemies.find(e=>e.alive&&e.type==='zen_dragon');if(dragon){dragon._r21Meditate=0;hit(h,dragon,{...ATTACKS[h.type],name:'Csendtörő csapás',pow:(ATTACKS[h.type].pow||1)*1.8,elem:'thunder'});dragon._r21Stagger=1;showBanner('A Zen-Kavics Sárkány kibillent az egyensúlyából!',true);}
        S.r21Silence=0;S.r21SilenceReady=false;
      }
      return result;
    };
  }

  // Fejezetfőnökök: gongkorlátozás, Zen-páncél és Chasen háromfázisú ciklus.
  if(typeof hit==='function'){
    const r21Hit=hit;
    hit=function(attacker,target,skill,...rest){
      if(target&&target.type==='chasen'&&target.hp<=target.maxHp*.66&&!target._r21ShieldBroken){
        const elem=skill&&skill.elem||'';if(elem==='fire'||elem==='thunder'||elem==='lightning'){target._r21ShieldBroken=true;showBanner('A Habpajzs széttört!',true);sfx('glass');}
        else if(skill&&(skill.kind==='phys'||elem==='phys')){skill={...skill,pow:(skill.pow||1)*.35};}
      }
      if(target&&target.type==='zen_dragon'&&target._r21Meditate&&skill&&skill.kind==='phys'&&skill.elem!=='thunder')skill={...skill,pow:(skill.pow||1)*.5};
      const result=r21Hit.call(this,attacker,target,skill,...rest);
      if(skill&&skill.name==='Gongütés'){S.r21GongActions=Math.max(1,(S.heroes||[]).filter(h=>h.alive).length);showBanner('A gong elnémítja a különleges képességeket!',true);sfx('thunder');}
      if(skill&&skill.status&&skill.status[0]==='foam'&&target){target.st=target.st||{};target.st.foam=1;}
      // Lili felébred az utolsó találatnál, és nem hal meg.
      if(target&&target.type==='lili_calm'&&r21Level('12-3')&&target.hp<=0&&!S.r21LiliAwake){target.hp=1;target.alive=true;target.st=target.st||{};target.st.sleep=0;S.r21LiliAwake=true;showBanner('Lili felébredt. A harc véget ér.',true);setTimeout(()=>{target.hp=0;target.alive=false;if(typeof victory==='function')victory();},850);}
      return result;
    };
  }
  if(typeof enemyAct==='function'){
    const r21EnemyAct=enemyAct;
    enemyAct=async function(e,...rest){
      if(!e||!e.alive)return r21EnemyAct.apply(this,[e,...rest]);
      if(r21Level('11-2')&&e.type==='steam_wraith'&&!S.r21ValveClosed){for(const h of r21Alive()){hit(e,h,{name:'Kádgőz',kind:'mag',pow:.18,elem:'fire',tgt:'allies'});}showBanner('A forró gőz végigsöpör a csapaton.');}
      if(e.type==='zen_dragon'&&e.hp>e.maxHp*.5&&!e._r21Stagger){e._r21Meditate=1;showBanner('A sárkány kavicspáncélt emel. Villámmal törhető át.',true);}
      if(e.type==='chasen'){
        const pct=e.hp/e.maxHp;
        if(pct<=.33&&!e._r21Phase3){e._r21Phase3=true;const awake=r21Alive()[Math.floor(Math.random()*Math.max(1,r21Alive().length))];for(const h of r21Alive())if(h!==awake)r21Set(h,'sleep',1);showBanner('Örök Zen: mindenki elalszik, kivéve '+(awake&&awake.name||'egy hőst')+'!',true);sfx('dark');return wait(350);}
        if(pct<=.66&&!e._r21Phase2){e._r21Phase2=true;e._r21ShieldBroken=false;showBanner('Chasen Habpajzsot vont maga köré. Tűz vagy villám töri át.',true);}
        if(pct>.66){e._r21Ceremony=(e._r21Ceremony||0)+1;const n=e._r21Ceremony%3;if(n===1){showBanner('Chasen előkészíti a csendes ceremóniát…',true);return wait(500);}if(n===2){S.r21DoubleMP=true;for(const h of r21Alive())r21Set(h,'foam',1);showBanner('A következő hőskörben dupla MP-költség és Habosítás!',true);}else if(n===0){S.r21DoubleMP=false;showBanner('Chasen egy körre elcsendesedik.',true);return wait(500);}}
      }
      return r21EnemyAct.apply(this,[e,...rest]);
    };
  }

  // A fejezetek végén jutalmak és történeti csatlakozások; egyszer mentjük őket.
  if(typeof victory==='function'){
    const r21Victory=victory;
    victory=async function(...args){const id=S.level&&S.level.id;const ret=await r21Victory.apply(this,args);const cleared=S.save&&(S.save.cleared||[]);if(!S.save||!cleared||!cleared.includes(id))return ret;
      S.save.r21Rewards=S.save.r21Rewards||{};
      const unlock={ '9-4':'mochiKing','10-4':'zenDragon','11-4':'frogKing','12-4':'chasen' }[id];if(unlock){S.save.r21Rewards[unlock]=true;showBanner('Új idézés érhető el: '+(SUMMONS.find(q=>q.id===unlock)?.name||unlock),true);}
      if(id==='12-3'&&S.r21LiliAwake){const roster=S.roster=S.roster||[];if(!roster.some(h=>h.type==='fairy'))roster.push(mkHero('fairy'));S.save.r21Rewards.liliReturned=true;}
      if(id==='12-4'){S.save.r21Rewards.tasteRestored=true;S.save.r21Rewards.chasenAlly=true;const roster=S.roster=S.roster||[];if(!roster.some(h=>h.type==='chasen_ally')&&HERO_DEF.chasen_ally){roster.push(mkHero('chasen_ally'));}showBanner('A közös teaceremónia visszaadta az ízeket Matcha-földnek!',true);}
      if(id==='X-2'&&!S.save.r21Rewards.x2){S.save.r21Rewards.x2=true;S.gold=(S.gold||0)+5000;S.save.r21Rewards.goldenMatcha=true;showBanner('Titkos jutalom: +5000 arany és Arany Matcha-por!',true);}
      saveGame();return ret;};
  }
}
