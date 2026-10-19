
// ===== 39. kör: képregényes történet =====
// Fejezetenként 3 festett panel, szövegdobozzal és buborékkal, koppintásra lapozva.
// A bevezető és az I–VI. fejezet saját festett képsort kapott (tx-cm<n>_<panel>),
// a VII–XII. fejezet panelei a pálya festett hátteréből és a szereplők figuráiból állnak össze.
const R21_COMIC={
  intro:{num:'Prológus',title:'Az ellopott Kanna',img:0,p:[
    {c:'Mesevölgy, hajnali hat óra. A Királyi Kávéházban szokatlan csend van.',w:'Zordon',t:'Morgána. Hol a Kanna?'},
    {c:'A Kanna helyén csak egy cetli: „Hat éve nem aludtam. Most rajtatok a sor. – M.”',w:'Morgána',t:'És Lili, az éjjeliőr is eltűnt. Meg az üstöm!'},
    {c:'Az ösvényen kávébabok és tündérpor vezet… egészen a Suttogó Erdőig.',w:'Zordon',t:'Kávé nélkül a tűzgolyóim langyos golyók. Indulás!'}]},
  0:{img:1,p:[
    {c:'A Suttogó Erdő növényei ettek a kiszórt kávébabokból.',w:'Morgána',t:'Ezek a gombák… vigyorognak? És remegnek?'},
    {c:'Óriásira nőttek, hisztisek és nagyon-nagyon ébrenlévők lettek.',w:'Zordon',t:'Akkor kapnak egy kis meleget!'},
    {c:'Az erdő szívében a Vén Tölgy fogva tart valakit…',w:'Morgána',t:'Lili! Tarts ki, jövünk!'}]},
  1:{img:2,p:[
    {c:'Kávé nélkül az egész királyság álomba zuhant. A lakók félig élőholtként botorkálnak.',w:'Lili',t:'Jó reggelt! …Senki? Jó reggelt?!'},
    {c:'A trónt egy óramű-király foglalta el.',w:'Rozsdakirály',t:'Az alvás nem hatékony. Mostantól mindenki dolgozik!'},
    {c:'A Nagy Órát egy leláncolt ork húzza.',w:'Grog',t:'Grog húz. Grog unja. Grog üt, ha szabad.'}]},
  2:{img:3,p:[
    {c:'A romok alatt kristálytermek és olvadt folyó.',w:'Grog',t:'Grog hallja magát a kristályban. Okos hang.'},
    {c:'Morcus egy rejtett pörkölőben dolgozza fel a lopott kávét…',w:'Morcus',t:'Még egy adag… és soha többé nem kell aludnom.'},
    {c:'…és Espresszó, a sárkány tüze pörköli a babokat.',w:'Zordon',t:'Ez a sárkány a kávénkon fekszik!'}]},
  3:{img:4,p:[
    {c:'A Káosz Tornya a felhők fölé nyúlik.',w:'Morgána',t:'Persze hogy lépcső. Mindig lépcső.'},
    {c:'Odabent a könyvtár fejjel lefelé áll, a tükrök pedig visszaütnek.',w:'Lili',t:'Ne nézz bele! Az a tükör visszanéz.'},
    {c:'A csúcson Morcus az Örök Kannából főzi az utolsó adagot.',w:'Morcus',t:'Ha ezt kiiszom, Koffeinisten leszek!'}]},
  4:{img:5,p:[
    {c:'Fél év telt el. Mesevölgy most nem ébren van túl sokat, hanem alszik.',w:'Grog',t:'A pék alszik. A tészta szökik. Grog segít enni.'},
    {c:'A nyom keletre vezet, a ködbe burkolt teateraszokhoz.',w:'Morgána',t:'Kamillaillat. Valaki altatót főz.'},
    {c:'A teraszok tetején Öreg Oolong, a gőzsárkány pihen.',w:'Zordon',t:'Csak óvatosan. A gőze mindenkit elaltat.'}]},
  5:{img:6,p:[
    {c:'Porcelánvárosban minden fehér és kék: a házak, a hidak, még a galambok is.',w:'Lili',t:'Olyan szép… és olyan csendes.'},
    {c:'A lakók állva alszanak – az utcán, a boltban, a hídon.',w:'Morgána',t:'Psszt! Senki ne lépjen hangosan.'},
    {c:'Csak a porcelán nem alszik: a teáskészletek maguktól terítenek.',w:'Grog',t:'Grog nem tör. Grog… csak kicsit tör.'}]},
  6:{p:[
    {c:'A dűnék itt nem homokból vannak, hanem kristálycukorból.',w:'Grog',t:'Grog megkóstolja a sivatagot. Édes!'},
    {c:'A Teacsászárnő karavánjai éjjel-nappal hordják a mézet.',w:'Zordon',t:'Kövessük őket – a méz az altató teához kell.'},
    {c:'A sivatag közepén egy várnyi kaptár áll. Benne a Mézkirálynő.',w:'Lili',t:'Ott zümmög valami… nagyon nagy.'}]},
  7:{p:[
    {c:'A felhők fölött örök éjszaka van, és akkora a csend, hogy hallani a pislogásodat.',w:'Morgána',t:'Itt minden puha. Gyanúsan puha.'},
    {c:'Az Álompalotában minden lassú – és minden el akar altatni.',w:'Grog',t:'Grog nem alszik. Grog csak… pislog… hosszan.'},
    {c:'Kamilla, a Teacsászárnő az utolsó üstöt főzi.',w:'Kamilla',t:'Ha kész, soha többé senki nem ébred fel.'}]},
  8:{p:[
    {c:'Fél év múlva a kávé, a tea, még Grog sütije is ízetlen.',w:'Grog',t:'Süti nem süti. Grog szomorú.'},
    {c:'A pult alatt egy bambusz habverő és egy cetli: „Lassan. Figyelmesen. Ízlelve. – Ch.”',w:'Zordon',t:'Lili előrerepült, hogy beszéljen vele. Nem tért vissza.'},
    {c:'A habos bambuszerdőben a Mochi-király uralkodik.',w:'Morgána',t:'Egy ragacsos király. Remek.'}]},
  9:{p:[
    {c:'A hegy fölött zen-kertek húzódnak, a kavicsok maguktól mozognak.',w:'Zordon',t:'Itt minden lépésnek súlya van.'},
    {c:'A túl sok varázslat felriasztja a mozaiksárkányokat.',w:'Morgána',t:'Akkor most kivételesen… figyelmesen.'},
    {c:'A kert őre: a Zen-Kavics Sárkány.',w:'Grog',t:'Nagy kő. Grog nagyobb.'}]},
  10:{p:[
    {c:'A barlangban gőzölgő matcha-kádak bugyognak.',w:'Morgána',t:'Ez a gőz… zöld. És habos.'},
    {c:'Valaki itt veri a habot az egész völgynek – ezer és ezer habverővel.',w:'Zordon',t:'Hallod? Gong.'},
    {c:'A barlang végén a Bambusz-békakirály vár.',w:'Grog',t:'Béka. Grog szereti a brekegést. Grog üt.'}]},
  11:{p:[
    {c:'A felhők fölött áll a palota, kupolája mint egy hatalmas matcha-csésze.',w:'Zordon',t:'Itt készül a völgy utolsó teája.'},
    {c:'Az a tea végleg elvenné a világ ízeit – amíg meg nem tanulja becsülni őket.',w:'Morgána',t:'Akkor tanítsuk meg rá.'},
    {c:'Odabent Chasen, a Békemester vár. Mellette Lili ül, mosolyogva, csendben.',w:'Grog',t:'Lili! Grog hozott sütit. Ízetlent.'}]},
};
const R21_WHO_COL={Zordon:'#e8743b',Morgána:'#a66bff',Lili:'#4fae4f',Grog:'#6b9a2a',Morcus:'#7a4bb0',Kamilla:'#c9a227',Rozsdakirály:'#9a6a3a'};

// összerakott panel (VII–XII. fejezet): festett háttér + figura, képregényes kerettel
function r21ComicCompose(bgKey,spr,sprH){
  const W=480,H=760,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#1a1226';g.fillRect(0,0,W,H);
  const bg=BG_IMG[bgKey]||(R21_CMBG[bgKey]&&R21_CMBG[bgKey].complete&&R21_CMBG[bgKey].naturalWidth?R21_CMBG[bgKey]:null);
  if(bg){const s=Math.max(W/bg.width,H/bg.height),bw=bg.width*s,bh=bg.height*s;g.drawImage(bg,(W-bw)/2,(H-bh)/2,bw,bh);}
  // enyhe festett hatás: sötétebb szélek
  const vg=g.createRadialGradient(W/2,H*.55,H*.2,W/2,H*.55,H*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');g.fillStyle=vg;g.fillRect(0,0,W,H);
  if(spr&&spr.width){const h=sprH||H*.6,s=h/spr.height,w=spr.width*s;
    g.save();g.shadowColor='rgba(0,0,0,.6)';g.shadowBlur=24;g.drawImage(spr,(W-w)/2,H*.9-h,w,h);g.restore();}
  return c;
}
const R21_CMBG={};
function r21ComicBg(th,cb){if(!th||!IMG_SRC['bg-'+th])return;let im=R21_CMBG[th];if(!im){im=new Image();im.src=IMG_SRC['bg-'+th];R21_CMBG[th]=im;}if(im.complete&&im.naturalWidth)cb();else im.addEventListener('load',cb);}
function r21ComicSpr(type){if(!type)return null;const d=(typeof EN_DEF==='object'&&EN_DEF[type])||{};return ENEMY_SPR[type]||ENEMY_SPR[d.spr]||ENEMY_SPR[d.sprite]||null;}
function r21ComicPanels(key){
  const D=R21_COMIC[key];if(!D)return null;
  if(D.img!=null)return D.p.map((x,i)=>{const im=new Image();im.src=IMG_SRC['tx-cm'+D.img+'_'+i];return im;});
  const Z=ZONES[key];if(!Z)return null;const L=Z.levels||[];
  const bossL=L.find(l=>l.boss)||L[L.length-1],midL=L[Math.min(1,L.length-1)];
  const types=(l)=>((l&&l.battles&&l.battles[0])||[]);
  const bossT=types(bossL).find(t=>EN_DEF[t]&&EN_DEF[t].boss)||types(bossL)[1];
  const midT=types(midL).find(t=>EN_DEF[t]&&!EN_DEF[t].boss)||types(midL)[0];
  const mk=(l,f)=>{f.theme=l&&l.theme;return f;};
  return [mk(L[0],()=>r21ComicCompose(L[0]&&L[0].theme,null)),mk(midL,()=>r21ComicCompose(midL&&midL.theme,r21ComicSpr(midT),380)),mk(bossL,()=>r21ComicCompose(bossL&&bossL.theme,r21ComicSpr(bossT),560))];
}
(function(){if(typeof document==='undefined')return;const st=document.createElement('style');st.textContent=`
#r21comic{position:fixed;inset:0;z-index:99990;background:radial-gradient(ellipse at 50% 40%,#2a1b3d 0%,#0d0816 75%);display:flex;flex-direction:column;align-items:center;justify-content:center;
 padding:max(10px,env(safe-area-inset-top)) max(10px,env(safe-area-inset-right)) max(10px,env(safe-area-inset-bottom)) max(10px,env(safe-area-inset-left));box-sizing:border-box;user-select:none;-webkit-user-select:none;cursor:pointer;animation:r21cmIn .35s ease-out}
@keyframes r21cmIn{from{opacity:0}to{opacity:1}}
#r21comic .cm-head{text-align:center;color:#f6d77a;font-family:'Lilita One',sans-serif;line-height:1.05;margin-bottom:8px;text-shadow:0 2px 0 #000}
#r21comic .cm-num{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#c9b6e8}
#r21comic .cm-title{font-size:clamp(20px,3.4vh + 1vw,34px)}
#r21comic .cm-row{display:flex;gap:12px;align-items:stretch;justify-content:center}
#r21comic .cm-panel{position:relative;flex:0 0 auto;height:min(74vh,calc((100vw - 60px)/3/.63));aspect-ratio:.63;border:5px solid #f4ead2;border-radius:6px;box-shadow:0 8px 26px rgba(0,0,0,.7),0 0 0 2px #000;overflow:hidden;background:#000;
 opacity:0;transform:translateY(18px) scale(.94) rotate(-1deg);transition:opacity .45s ease,transform .5s cubic-bezier(.2,1.4,.4,1)}
#r21comic .cm-panel:nth-child(2){transform:translateY(18px) scale(.94) rotate(1deg)}
#r21comic .cm-panel.on{opacity:1;transform:none}
#r21comic .cm-panel img,#r21comic .cm-panel canvas{width:100%;height:100%;object-fit:cover;display:block}
#r21comic .cm-cap{position:absolute;left:6px;right:14%;top:6px;background:#fff1c1;color:#2a1a08;border:2px solid #2a1a08;border-radius:3px;padding:5px 8px;font:700 clamp(11px,1.15vh + .55vw,17px)/1.25 'Lilita One',system-ui,sans-serif;box-shadow:3px 3px 0 rgba(0,0,0,.45)}
#r21comic .cm-bub{position:absolute;left:8px;right:8px;bottom:12px;background:#fff;color:#111;border:2px solid #111;border-radius:16px;padding:6px 10px 7px;font:600 clamp(11px,1.15vh + .55vw,17px)/1.25 system-ui,-apple-system,sans-serif;box-shadow:3px 3px 0 rgba(0,0,0,.45);
 opacity:0;transform:scale(.6);transform-origin:30% 100%;transition:opacity .25s ease .35s,transform .35s cubic-bezier(.2,1.6,.4,1) .35s}
#r21comic .cm-panel.on .cm-bub{opacity:1;transform:none}
#r21comic .cm-bub:after{content:'';position:absolute;left:26px;top:-14px;border:8px solid transparent;border-bottom:8px solid #111}
#r21comic .cm-bub:before{content:'';position:absolute;left:28px;top:-9px;border:6px solid transparent;border-bottom:6px solid #fff;z-index:1}
#r21comic .cm-who{display:block;font:400 .82em/1.1 'Lilita One',sans-serif;margin-bottom:2px}
#r21comic .cm-foot{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:10px}
#r21comic .cm-dots span{display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a3a63;margin:0 3px}
#r21comic .cm-dots span.on{background:#f6d77a}
#r21comic .cm-btn{font:400 15px 'Lilita One',sans-serif;color:#f6d77a;background:rgba(30,20,45,.85);border:2px solid #5d4a80;border-radius:20px;padding:6px 16px;cursor:pointer}
#r21comic .cm-skip{color:#b9a8d8;border-color:#3d2f55}
@media (orientation:portrait){
 #r21comic .cm-panel{height:min(70vh,calc((100vw - 30px)/.63));display:none}
 #r21comic .cm-panel.cur{display:block}
 #r21comic .cm-cap,#r21comic .cm-bub{font-size:clamp(14px,2vh,19px)}
}`;document.head.appendChild(st);})();

let R21_COMIC_OPEN=false;
function r21Comic(key,done){
  const D=R21_COMIC[key],P=D&&r21ComicPanels(key);
  if(!D||!P){done&&done();return false;}
  R21_COMIC_OPEN=true;
  const Z=typeof key==='number'?ZONES[key]:null,[num,title]=Z?Z.chapter.split(': '):[D.num,D.title];
  const box=document.createElement('div');box.id='r21comic';
  box.innerHTML=`<div class="cm-head"><div class="cm-num"></div><div class="cm-title"></div></div><div class="cm-row"></div><div class="cm-foot"><span class="cm-dots"></span><button class="cm-btn cm-next">Tovább ▸</button><button class="cm-btn cm-skip">Kihagyás</button></div>`;
  box.querySelector('.cm-num').textContent=num||'';box.querySelector('.cm-title').textContent=title||'';
  const row=box.querySelector('.cm-row'),dots=box.querySelector('.cm-dots'),panels=[];
  D.p.forEach((x,i)=>{
    const pn=document.createElement('div');pn.className='cm-panel';
    const src=P[i];let media;
    if(typeof src==='function'){media=document.createElement('canvas');media.width=480;media.height=760;
      const paint=()=>{try{const c=src();media.getContext('2d').drawImage(c,0,0);}catch(e){}};paint();
      // a háttér lehet, hogy még töltődik: betöltés után újrarajzoljuk
      r21ComicBg(src.theme,paint);}
    else media=src;
    pn.appendChild(media);
    const cap=document.createElement('div');cap.className='cm-cap';cap.textContent=x.c;pn.appendChild(cap);
    if(x.t){const b=document.createElement('div');b.className='cm-bub';const w=document.createElement('span');w.className='cm-who';w.textContent=x.w||'';w.style.color=R21_WHO_COL[x.w]||'#7a4bb0';b.appendChild(w);b.appendChild(document.createTextNode(x.t));pn.appendChild(b);}
    row.appendChild(pn);panels.push(pn);dots.appendChild(document.createElement('span'));
  });
  document.body.appendChild(box);
  let cur=-1,closed=false;
  const close=()=>{if(closed)return;closed=true;R21_COMIC_OPEN=false;box.style.transition='opacity .3s';box.style.opacity='0';setTimeout(()=>box.remove(),320);done&&done();};
  const next=()=>{if(closed)return;if(cur>=panels.length-1)return close();
    cur++;panels.forEach((p,i)=>{p.classList.toggle('cur',i===cur);});panels[cur].classList.add('on');
    [...dots.children].forEach((d,i)=>d.classList.toggle('on',i<=cur));
    box.querySelector('.cm-next').textContent=cur>=panels.length-1?'Indulás ▸':'Tovább ▸';
    try{sfx('whoosh');}catch(e){}};
  box.addEventListener('click',e=>{if(e.target.closest('.cm-skip')){e.stopPropagation();return close();}next();});
  next();
  return true;
}
// próbához: index.html?proba=comic:intro | comic:6
{const q=typeof location!=='undefined'&&(location.search.match(/proba=comic:(\w+)/)||[])[1];
 if(q)setTimeout(()=>r21Comic(/^\d+$/.test(q)?+q:q,()=>{}),1500);}

// bevezető: a párbeszéd helyett képregény
{const t0=talk;talk=async function(list){
  if(list===INTRO&&R21_COMIC.intro)return new Promise(res=>{if(!r21Comic('intro',res))res();});
  return t0.apply(this,arguments);};}
// fejezet eleje: képregény, utána a térkép
{const ci0=chapterIntro;chapterIntro=function(Z){
  const i=ZONES.indexOf(Z);
  if(R21_COMIC[i]){setScene(Z.levels[0].theme);hideOverlay&&hideOverlay();r21Comic(i,()=>mapScreen());return;}
  return ci0.apply(this,arguments);};}
