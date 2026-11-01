// ===== 56. kör: bolt, pénz, nehézség (teljes tesztlista, 2. csomag) =====

// ---- 1) Bolt-elosztás („sokáig semmit nem lehet venni, aztán egyszerre mindent; a pénz közben rengeteg”):
//    eddig a hősök képességei többnyire UGYANAZON a pályán nyíltak (6-1, 7-1, 8-1… mindenkinek), és egy képesség ára
//    egy pálya bevételének csak ~40%-a volt. Mostantól minden hős listája el van tolva a többiekéhez képest, így szinte
//    minden teljesített pálya után nyílik 1 új képesség valakinél; az ár kb. egy pálya bevétele, és a bevétel Normál/
//    Nehéz szinten 20%-kal kisebb – vagyis nem lehet mindent rögtön megvenni, választani kell.
const R21_GOLD_MULT=.8,R21_SKILL_PRICE=1.15;
(function(){try{
  const LV=[];for(const z of ZONES)for(const L of z.levels)if(L.id!=='12-3')LV.push(L);const ix=id=>LV.findIndex(L=>L.id===id),N=LV.length;
  const gl=LV.map(L=>{let g=0;try{for(const bt of L.battles)for(const t of bt){const d=EN_DEF[t];if(!d)continue;g+=d.gold!=null?d.gold:Math.round(d.xp*(1+.08*(L.elvl-1)));}}catch(e){}return g;});
  const sm=gl.map((g,i)=>{const a=gl.slice(Math.max(0,i-2),i+3).filter(x=>x>0).sort((p,q)=>p-q);return a.length?a[Math.floor(a.length/2)]:g;});
  const price=k=>Math.max(150,Math.round(sm[Math.max(0,Math.min(N-1,k))]*R21_GOLD_MULT*R21_SKILL_PRICE/10)*10);
  const OFF={wizard:0,witch:.5,fairy:.25,orc:.75,monk:.4,druid:.6},joinIx=t=>{const j=JOIN[t];return j?ix(j)+1:0;};
  for(const t in SHOP_SKILLS){const list=SHOP_SKILLS[t].slice().sort((a,b)=>(ix(a[1])-ix(b[1]))||(a[2]-b[2])),m=list.length;if(!m)continue;
    const a=Math.max(0,joinIx(t)),b=N-2,step=(b-a)/m,off=(OFF[t]||0)*step;
    SHOP_SKILLS[t]=list.map((x,i)=>{const k=Math.max(0,Math.min(b,Math.round(a+off+i*step)));return [x[0],LV[k].id,price(k)];});}
}catch(e){console.error('bolt-elosztás 56',e);}})();
// kevesebb arany Normál és Nehéz szinten (a Könnyű már eddig is −40%)
{const mk=mkEnemy;mkEnemy=function(){const e=mk.apply(this,arguments);try{if(e&&S.diff>=1&&!S.arena)e.gold=Math.round((e.gold||0)*R21_GOLD_MULT);}catch(err){}return e;};}

// ---- 2) Kihívás Normál és Nehéz szinten: az ellenfeleknek 15%-kal több életerejük van
{const mk=mkEnemy;mkEnemy=function(){const e=mk.apply(this,arguments);try{if(e&&S.diff>=1&&!S.arena){e.maxHp=Math.round(e.maxHp*1.15);e.hp=e.maxHp;}}catch(err){}return e;};}

// ---- 3) Okosabb ellenfelek (Normál és Nehéz):
//    - képességváltás: ugyanazt a képességet nem használja kétszer egymás után, ha van más; gyógyítást csak akkor,
//      ha van sérült társa; erősítést csak akkor, ha még nincs rajta;
//    - célpont: inkább a sérült, a gyógyító (Lili, Jázmin) és a nem védekező hősöket támadja (de a provokálás továbbra is köt).
const r21Smart=()=>S.diff>=1&&!S.arena;
{const w0=weighted;weighted=function(list){try{const e=(typeof R21_ACT!=='undefined')?R21_ACT:null;
    if(e&&r21Smart()&&e.d&&list===e.d.skills&&Array.isArray(list)&&list.length>1&&!e._intent){
      const hurt=S.enemies.some(x=>x.alive&&x.hp<x.maxHp*.7);
      let c=list.filter(([id])=>{const s=ESK[id];if(!s)return false;if(s.kind==='heal')return hurt;if(s.kind==='buff')return !(e.st&&(e.st.atkUp||e.st.defUp||e.st.ward));return true;});
      if(c.length>1&&e._r21last){const c2=c.filter(([id])=>id!==e._r21last);if(c2.length)c=c2;}
      if(!c.length)c=list.filter(([id])=>id!==e._r21last);if(!c.length)c=list;
      // ha három vagy több hős áll, a mindenkire ható támadás kicsit gyakoribb
      const many=S.heroes.filter(h=>h.alive).length>=3;c=c.map(([id,wt])=>[id,wt*(many&&ESK[id]&&ESK[id].tgt==='enemies'?1.3:1)]);
      const id=w0.call(this,c);e._r21last=id;return id;}}catch(err){}
  return w0.apply(this,arguments);};}
{const at=aiTarget;aiTarget=function(u){const t=at.apply(this,arguments);try{if(!u||u.kind!=='enemy'||!r21Smart())return t;
    const f=S.heroes.filter(h=>h.alive);if(f.length<2||f.some(h=>h.st&&h.st.taunt))return t;
    if(Math.random()<.45)return t;   // marad némi kiszámíthatatlanság
    const wt=f.map(h=>{let w=1+2.2*(1-h.hp/h.maxHp);if(h.guard)w*=.45;if(h.type==='fairy'||h.type==='monk')w*=1.35;if(u._r21lt===h&&u._r21ltn>=2)w*=.2;return w;});
    let r=Math.random()*wt.reduce((a,b)=>a+b,0),pk=f[0];for(let i=0;i<f.length;i++){r-=wt[i];if(r<=0){pk=f[i];break;}}
    u._r21ltn=u._r21lt===pk?(u._r21ltn||1)+1:1;u._r21lt=pk;return pk;}catch(err){}return t;};}
