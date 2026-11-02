// ===== 65. kör: az 5. új 3. térképes ellenfél – Ceremónia-őr (festett Canva-kép: teaguard) =====
// Matcha-teástál testű szamuráj, habverő-taraj, bambusz merőkanál-lándzsa. A saját teste lendül (bodyWind/Strike),
// a hatás a merőkanál fejéből jön (rácson mérve: .10,.37), festett tea-képek (teasplash, teawave, teacloud) matchazöldre színezve.
WHITE_T.teaguard=999;
Object.assign(EN_DEF,{
  teaguard:{name:'Ceremónia-őr',hp:215,atk:19,def:17,mag:11,res:14,xp:310,h:222,w:204,lift:0,elem:{thunder:1.4,earth:1.3,water:.5,fire:.8},
    skills:[['ladlestrike',3],['matchaflood',2]],info:'A palota teaszertartásának őre: a bambusz merőkanalával csap le, és forró matchát zúdít a hősökre. A cseréptestét a villám és a föld repeszti meg, a víz nem árt neki.'},
});
Object.assign(ESK,{
  ladlestrike:{name:'Merőkanál-csapás',tgt:'enemy',kind:'phys',pow:1.35,elem:'phys',anim:'ladleStrike'},
  matchaflood:{name:'Forró matcha-áradat',tgt:'enemies',kind:'mag',pow:.85,elem:'water',anim:'matchaFlood',status:['burn',.3,2]},
});
{const MG='hue-rotate(48deg) saturate(1.25) brightness(.92)',STF='saturate(.25) brightness(1.35)';
  const ladle=u=>sprPt(u,.10,.37);
  // Merőkanál-csapás: hátralendül, előrelép, a kanál fejével lecsap; a kanálból festett matcha fröccsen, gőz száll
  A.ladleStrike=async(u,ts,sk)=>{const t=ts[0];if(!t||!t.alive)return;const SP=r21Filt(R17I.teasplash,MG),ST=r21Filt(R17I.teacloud,STF),LF=R17I.leaf;u.pose='attack';
    sfx('whoosh');await bodyWind(u,340,.22);const dx=(cx(t)+t.w*t.scale*.55+u.w*u.scale*.32)-cx(u);ghosts&&ghosts(u,300);
    await tween(300,k=>{u.ox=dx*easeIO(k);u.jump=Math.sin(k*Math.PI)*40;});u.jump=0;
    // a kanál fejéből csöpög a forró matcha a lecsapás alatt
    const D={on:true};R18E({update(){if(D.on){const p=ladle(u);if(SP&&Math.random()<.5)r21PD(SP,p.x+rnd(-10,10),p.y+rnd(-6,6),{vx:rnd(-40,40),vy:rnd(40,160),g:700,life:.5,size:rnd(18,30),vr:0,rot:0});}return D.on;},draw(){}});
    sfx('slash');await bodyStrike(u,150,-.32);D.on=false;sfx('hit');sfx('splash');shake(20);hitStop(110);flash('190,230,140',.22,.08);
    const x=cx(t),gy=t.y+t.oy+4;
    if(SP){const B={t:0};R18E({update(dt){B.t+=dt;return B.t<1.1;},draw(){const k=Math.min(1,B.t/.18),a=B.t<.55?1:1-(B.t-.55)/.55;r17Draw(SP,x,gy+10,Math.max(260,t.w*t.scale*2.2)*(.35+.65*k),{anchor:'bottom',a:Math.max(0,a)});}});}
    if(SP)for(let i=0;i<14;i++)r21PD(SP,x+rnd(-30,30),midY(t)+rnd(-30,30),{vx:rnd(-340,340),vy:-rnd(80,420),g:900,life:rnd(.6,1),size:rnd(22,40)});
    if(LF)for(let n=0;n<8;n++)r21PD(r21Filt(LF,MG),x,midY(t),{vx:rnd(-280,280),vy:-rnd(80,300),g:320,size:rnd(16,26),life:1,drag:1});
    if(ST)for(let n=0;n<4;n++){const S2={t:0,x:x+rnd(-60,60),y:midY(t)+rnd(-40,10)};R18E({update(dt){S2.t+=dt;S2.y-=dt*50;return S2.t<1.4;},draw(){r17Draw(ST,S2.x,S2.y,140+S2.t*90,{a:.55*(1-S2.t/1.4)});}});}
    t.hurt=.7;toss(t,50,360);hit(u,t,sk);await wait(200);await bodySettle(u);ghosts&&ghosts(u,300);
    await tween(340,k=>{u.ox=dx*(1-easeIO(k));});u.ox=0;u.pose='idle';};
  // Forró matcha-áradat: a merőkanalat a magasba emeli, a kanálból ömlik a matcha, és egy festett matcha-hullám
  // végigzúdul az összes hősön; utána gőz és cseppek, a hősök megégnek (forrázás)
  A.matchaFlood=async(u,ts,sk)=>{const al=ts.filter(t=>t.alive);if(!al.length)return;const WV=r21Filt(R17I.teawave,MG),SP=r21Filt(R17I.teasplash,MG),ST=r21Filt(R17I.teacloud,STF);u.pose='cast';
    sfx('whoosh');await bodyWind(u,420,.3);
    // a kanál fejéből sugárban ömlik a forró matcha a föld felé
    const P={on:true};R18E({update(){if(P.on){const p=ladle(u);if(SP)for(let i=0;i<2;i++)r21PD(SP,p.x+rnd(-12,12),p.y,{vx:rnd(-160,-40),vy:rnd(60,240),g:900,life:.6,size:rnd(26,46),vr:rnd(-2,2)});}return P.on;},draw(){}});
    sfx('splash');await wait(380);await bodyStrike(u,160,-.28);sfx('splash');sfx('boom');shake(16);rumble&&rumble(1,8);
    const gy=Math.max(...al.map(t=>t.y+t.oy))+10,x0=cx(u)-u.w*u.scale*.3,xEnd=Math.min(...al.map(t=>cx(t)-t.w*t.scale*.6))-160,H0=Math.max(...al.map(t=>t.h*t.scale))*1.35;
    const W={x:x0,a:1,k:0},done=new Set();
    R18E({update(){return W.a>0;},draw(){if(!WV)return;for(let i=2;i>=0;i--){const w=H0*WV.width/WV.height*(1-.12*i),xx=W.x+i*w*.42;ctx.save();ctx.globalAlpha=W.a*(i?0.8:1);r17Draw(WV,xx,gy,w,{anchor:'bottom',sy:(.25+.75*W.k)*(1+.06*Math.sin(W.x*.03+i))});ctx.restore();}}});
    await tween(260,k=>{W.k=eOutBack?eOutBack(k):k;});
    await tween(900,k=>{W.x=x0+(xEnd-x0)*easeIO(k);for(const t of al)if(!done.has(t)&&W.x<cx(t)){done.add(t);t.hurt=.6;toss(t,40,320);shake(10);sfx('splash');hit(u,t,sk);
        if(SP){const B={t:0},x=cx(t),y=t.y+t.oy;R18E({update(dt){B.t+=dt;return B.t<.8;},draw(){r17Draw(SP,x,y+8,Math.max(200,t.w*t.scale*1.7)*(.4+.6*Math.min(1,B.t/.15)),{anchor:'bottom',a:Math.max(0,1-B.t/.8)});}});}}});
    for(const t of al)if(!done.has(t)&&t.alive)hit(u,t,sk);P.on=false;
    if(ST)for(const t of al)for(let n=0;n<3;n++){const S2={t:-n*.15,x:cx(t)+rnd(-50,50),y:midY(t)};R18E({update(dt){S2.t+=dt;if(S2.t>0)S2.y-=dt*60;return S2.t<1.6;},draw(){if(S2.t>0)r17Draw(ST,S2.x,S2.y,130+S2.t*100,{a:.6*(1-S2.t/1.6)});}});}
    await tween(420,k=>{W.a=1-k;});await bodySettle(u);u.pose='idle';};
}
DRAW.teaguard=e=>enemySpriteDraw(blobDraw('120,170,70'),'teaguard')(e);
// a Matcha Ceremónia-palota sima csataiba: a Csészeharcos helyett és minden 3. Teamester helyett
(function(){const zi=ZONES.findIndex(z=>z.name==='Matcha Ceremónia-palota');if(zi<0)return;let n=0;
  for(const L of ZONES[zi].levels){if(L.boss)continue;for(const b of L.battles){if(b.some(t=>EN_DEF[t]&&(EN_DEF[t].boss||EN_DEF[t].miniboss)))continue;
    for(let i=0;i<b.length;i++){if(b[i]==='cupwarrior')b[i]='teaguard';else if(b[i]==='teamaster'){if(n%3===1)b[i]='teaguard';n++;}}}}
  if(window.R21_POOL3){const p=R21_POOL3[zi]||[];if(!p.includes('teaguard'))p.push('teaguard');R21_POOL3[zi]=p.filter(t=>t!=='cupwarrior'||ZONES[zi].levels.some(L=>L.battles.some(b=>b.includes(t))));}})();
