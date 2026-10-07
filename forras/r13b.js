
// ===== 14. kör =====
// ---- térkép: a pályapöttyök a térképre rajzolt pontozott utakon ülnek (a főellenségek a saját helyükön)
{const P1=[[[22,89],[31,95],[42,94],[25,63]],[[38,52],[43,46],[49,44],[35,21]],[[50,84],[71,84],[78,72],[71,61]],[[78,57],[82,49],[84,42],[85,17]]];
 const P2=[[[22,88],[26,82],[30,77],[34,72]],[[37,66],[38,59],[42,53],[47,51]],[[52,49],[57,45],[62,43],[75,62]],[[69,45],[76,42],[80,33],[84,15]]];
 for(let i=0;i<4;i++){MAP_POS[i]=P1[i];if(MAP_POS.length>4+i)MAP_POS[4+i]=P2[i];}}
// ---- Álomlepke: Pihepor – biztosan elaltatja a célpontot
if(ESK.dustwing){ESK.dustwing.name='Pihepor';ESK.dustwing.status=['sleep',1,2];}
// ---- Levélvihar: gyorsabban csapódnak a levelek
{const lg2=A.leafGale;A.leafGale=async function(u,ts,sk){const sp=S.speed||1;S.speed=sp*1.8;try{return await lg2.apply(this,arguments);}finally{S.speed=sp;}};}
// ---- Csészekatona: a kanál egész feje a mozgó karrészhez tartozik (nem marad ott kétszer)
if(LIMBS['cupsoldier-attack'])LIMBS['cupsoldier-attack'].parts.spear.poly=[[0,.5],[.04,.44],[.15,.45],[.38,.36],[.42,.31],[.48,.33],[.49,.45],[.42,.5],[.18,.6],[.1,.7],[0,.7]];
if(typeof LIMB_CV==='object')delete LIMB_CV['cupsoldier-attack'];
// ---- Közös támadás: a plakáton a hősök mostani képei (a régi négyes kép helyett)
{const dc3=drawCutin;drawCutin=function(){const c=S.cutin;if(!c||!c.all)return dc3();const k0=TEAM_IMG.im,k5=typeof TEAM5_IMG==='object'?TEAM5_IMG.im:null;TEAM_IMG.im=null;if(typeof TEAM5_IMG==='object')TEAM5_IMG.im=null;
  try{return dc3();}finally{TEAM_IMG.im=k0;if(typeof TEAM5_IMG==='object')TEAM5_IMG.im=k5;}};}
