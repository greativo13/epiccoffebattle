import json
S='/tmp/claude-0/-home-user-epiccoffebattle/b216fc92-96f7-51b7-b764-c788ff1bde6f/scratchpad'
d=json.load(open(S+'/story.json'))
d['atk']=json.load(open(S+'/atk.json'))
TALK={'start':'Pálya eleje','mini':'Minibossz előtt','phase2':'2. fázis','phase3':'3. fázis','end':'Pálya vége'}
for z in d['zones']:
  for L in z['levels']:
    L['talk']=[[TALK.get(k,k),v] for k,v in L['talk'].items()]
data=json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
html=r'''<title>Kávérablás áttekintő</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@500;700;800&display=swap">
<style>
/* Elrendezés: egy oszlop, fejezetenként; minden pálya egy lap a párbeszéddel és az ellenfelek képeivel. Szándékosan egyetlen sötét téma, a játék lila-arany világa. */
:root{
  --bg:#150c20;--panel:#24173a;--panel2:#2e1f49;--line:#4a3772;--fg:#efe8ff;--muted:#a99cc9;
  --gold:#ffc94a;--ok:#4fd672;--bad:#ff5d6c;--tea:#5fd6b4;
  --display:'Lilita One','Trebuchet MS',system-ui,sans-serif;--body:'Nunito',system-ui,-apple-system,sans-serif;
  color-scheme:dark;
}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--fg);font-family:var(--body);font-size:15px;line-height:1.5}
.wrap{max-width:780px;margin:0 auto;padding-inline:16px;padding-block:20px 60px;display:flex;flex-direction:column;gap:16px}
h1{font-family:var(--display);font-weight:400;font-size:30px;line-height:1.1;margin:0;color:var(--gold);text-wrap:balance}
.lead{margin:6px 0 0;color:var(--muted);max-width:62ch}
.bar{position:sticky;top:env(safe-area-inset-top,0px);z-index:2;background:var(--panel);border:2px solid var(--line);border-radius:12px;padding:8px 12px;display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;font-weight:800;font-variant-numeric:tabular-nums}
.bar .k{color:var(--muted);font-weight:700;margin-right:4px}
.jump{display:flex;gap:6px;flex-wrap:wrap}
.jump a{color:var(--fg);text-decoration:none;border:1px solid var(--line);border-radius:999px;padding:2px 10px;font-size:13px;background:var(--panel2)}
.jump a:focus-visible{outline:3px solid var(--gold)}
.status{font-size:13px;color:var(--muted);font-weight:700;margin-left:auto}
section.zone{display:flex;flex-direction:column;gap:12px;scroll-margin-top:70px}
.zone>h2{font-family:var(--display);font-weight:400;font-size:24px;margin:10px 0 0;color:var(--tea)}
.chap{color:var(--muted);margin:0;font-style:italic}
.card{background:var(--panel);border:2px solid var(--line);border-radius:12px;padding:12px 14px;display:flex;flex-direction:column;gap:10px;min-width:0}
.card[data-s=ok]{border-color:color-mix(in srgb,var(--ok) 55%,var(--line))}
.card[data-s=bad]{border-color:var(--bad)}
.card h3{margin:0;font-weight:800;font-size:17px;display:flex;gap:8px;flex-wrap:wrap;align-items:baseline}
.card h3 .id{font-family:var(--display);font-weight:400;color:var(--gold)}
.tag{font-size:11px;text-transform:uppercase;letter-spacing:.06em;background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:0 8px;color:var(--gold)}
.intro{margin:0;color:var(--muted);font-size:14px}
details{border-top:1px solid var(--line);padding-top:6px}
summary{cursor:pointer;font-weight:800;color:var(--tea);font-size:14px}
.talk{display:flex;flex-direction:column;gap:3px;margin:6px 0 0;padding:0;list-style:none}
.talk li{font-size:14px}.talk b{color:var(--gold)}
.tl{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-top:6px}
.battles{display:flex;flex-direction:column;gap:6px}
.bt{display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap}
.bt .n{font-size:12px;color:var(--muted);min-width:48px;align-self:center}
.en{display:flex;flex-direction:column;align-items:center;gap:2px;width:84px}
.en img,.en .ph{width:72px;height:72px;object-fit:contain}
.en .ph{display:grid;place-items:center;border:1px dashed var(--line);border-radius:8px;color:var(--muted);font-size:11px;text-align:center}
.en span{font-size:12px;text-align:center;line-height:1.2}
.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
button{font:inherit;font-weight:800;border-radius:10px;border:2px solid var(--line);background:var(--panel2);color:var(--fg);padding:5px 12px;cursor:pointer;min-height:36px}
button:focus-visible,textarea:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
button.ok[aria-pressed=true]{background:var(--ok);border-color:var(--ok);color:#0d2416}
button.bad[aria-pressed=true]{background:var(--bad);border-color:var(--bad);color:#2a0710}
button:disabled{opacity:.5;cursor:default}
textarea{font:inherit;width:100%;min-height:40px;resize:vertical;background:var(--bg);color:var(--fg);border:2px solid var(--line);border-radius:10px;padding:6px 10px}
textarea::placeholder{color:var(--muted)}
.saved{font-size:12px;color:var(--muted);min-height:1em}
.done{background:var(--gold);border-color:var(--gold);color:#2a1a00}.ghost{font-size:13px;min-height:32px;padding:3px 10px}.reply{font-size:14px;background:var(--panel2);border-radius:10px;padding:6px 10px;border:1px solid var(--line)}.reply b{color:var(--gold)}.sentnote{font-size:13px;color:var(--ok);font-weight:800}.msg{width:100%;font-size:14px;color:var(--gold)}
.atk{padding:8px 12px;gap:6px}.atk h3{font-size:15px}.meta{font-size:12px;color:var(--muted)}.sub2{font-family:var(--display);font-weight:400;color:var(--gold);font-size:18px;margin:8px 0 0;display:flex;align-items:center;gap:8px}.sub2 img{width:48px;height:48px;object-fit:contain}
.empty{background:var(--panel);border:2px dashed var(--line);border-radius:12px;padding:14px;color:var(--muted)}
</style>
<div class="wrap">
  <header>
    <h1>A Nagy Kávérablás – áttekintő</h1>
    <p class="lead">Fent a kipróbálandó javítások, utána minden támadás egyenként (hősök, ellenfelek, idézések, tárgyak), végül a történet és a pályák. Görgess végig. Ami rendben van, arra <b>Jó</b>, ami nem, arra <b>Nem jó</b> és írd le, mi a gond, aztán <b>Beküldés</b>: a lap eltűnik, Claude eltárolja. Ha végeztél, fent a <b>Kész</b> gombbal szólsz Claude-nak, és ő egyszerre javítja az összeset.</p>
  </header>
  <div class="bar"><span><span class="k">Beküldve</span><span id="cSent">0</span></span><span><span class="k">ebből hiba</span><span id="cBad">0</span></span><button type="button" id="done" class="done" disabled>Kész – mehet a javítás</button><button type="button" id="showAll" class="ghost" aria-pressed="false">Beküldöttek mutatása</button><nav class="jump" id="jump" aria-label="Fejezetek"></nav><span class="status" id="st">Betöltés…</span></div>
  <main id="list"></main>
</div>
<script id="data" type="application/json">'''+data+r'''</script>
<script>
const D=JSON.parse(document.getElementById('data').textContent);
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let db=null,canWrite=false;const marks={},timers={};
const enEl=t=>{const e=D.en[t]||{name:t};return `<div class="en">${e.img?`<img src="${e.img}" alt="">`:`<div class="ph">nincs kép</div>`}<span>${esc(e.name)}</span></div>`;};
const talk=arr=>`<ul class="talk">${arr.map(x=>`<li><b>${esc(x.who)}:</b> ${esc(x.text)}</li>`).join('')}</ul>`;
const ctl=id=>`<div class="reply" id="rp-${id}" hidden></div><div class="row"><button class="ok" data-id="${id}" data-v="ok" aria-pressed="false" disabled>✓ Jó</button><button class="bad" data-id="${id}" data-v="bad" aria-pressed="false" disabled>✗ Nem jó</button><button class="send" data-send="${id}" disabled>Beküldés ➜</button><span class="sentnote" id="sn-${id}" hidden>Beküldve</span></div><textarea id="n-${id}" data-id="${id}" placeholder="Mi nem jó? (szöveg, kép, ellenfél, nehézség…)" disabled></textarea><div class="saved" id="sv-${id}"></div>`;
function build(){
  const A=D.atk,tagE=e=>e?`<span class="tag">${esc(e)}</span>`:'';
  const acard=(id,name,line,desc,how)=>`<article class="card atk" id="c-${id}" data-s=""><h3>${esc(name)} ${line}</h3>${desc?`<p class="intro">${esc(desc)}</p>`:''}<p class="meta">Kipróbálás: ${esc(how)}</p>${ctl(id)}</article>`;
  let atkH=`<section class="zone" id="zh"><h2>Hősök támadásai</h2><p class="chap">Minden támadás külön: Próbaterem → a hős → a támadás. Ellenfelet a „Ellenfelek és támadásaik” gombbal választhatsz.</p>`;
  for(const hh of A.heroes){atkH+=`<h3 class="sub2" id="zh-${hh.type}">${esc(hh.name)} · ${esc(hh.cls)}</h3>`;for(const a of hh.list)atkH+=acard(a.id,a.name,`<span class="tag">${esc(a.kind)}</span>${tagE(a.elem)}`,a.desc+(a.tgt?' ('+a.tgt+')':''),'Próbaterem → '+hh.name+' → '+a.name);}
  atkH+=`</section><section class="zone" id="zf"><h2>Ellenfelek támadásai</h2><p class="chap">Próbaterem → „Ellenfelek és támadásaik” → fejezet → ellenfél → támadás: az ellenfél megjelenik és megcsinálja.</p>`;
  for(const z of A.foes){atkH+=`<h3 class="sub2">${esc(z.zone)}</h3>`;for(const f of z.list){const e=D.en[f.type]||{};atkH+=`<h3 class="sub2" style="font-size:16px;color:var(--fg)">${e.img?`<img src="${e.img}" alt="">`:''}${esc(f.name)}${f.boss?' <span class="tag">főellenség</span>':f.mini?' <span class="tag">minibossz</span>':''}</h3>`;
    if(!f.atk.length)atkH+=`<p class="meta">Nincs külön támadása.</p>`;for(const a of f.atk)atkH+=acard(a.id,a.name,tagE(a.elem),a.tgt,'Próbaterem → Ellenfelek és támadásaik → '+z.zone+' → '+f.name+' → '+a.name);}}
  atkH+=`</section><section class="zone" id="zs"><h2>Idézések</h2>`;for(const a of A.summons)atkH+=acard(a.id,a.name,tagE(a.elem),a.desc+(a.req?' (a '+a.req+' pálya után)':''),'Próbaterem → bármelyik hős → Idézések → '+a.name);
  atkH+=`</section><section class="zone" id="zi"><h2>Tárgyak és közös támadás</h2>`;for(const a of A.items)atkH+=acard(a.id,a.name,'',a.desc,'Próbaterem → a hős menüjében a tárgy');atkH+=acard(A.combo.id,A.combo.name,'<span class="tag">közös</span>',A.combo.desc,'Próbaterem → Közös támadás');atkH+=`</section>`;
  let h=`<section class="zone" id="zt"><h2>Kipróbálandó javítások</h2><p class="chap">Ezeket a játékban próbáld ki: mit csinálj, és mit kell látnod.</p><div id="tests" class="zone"><div class="empty">A tesztpontok betöltése folyik…</div></div></section>`+atkH+`<section class="zone" id="z0"><h2>Bevezető</h2><article class="card" id="c-intro" data-s=""><h3>A történet kezdete</h3>${talk(D.intro)}${ctl('intro')}</article></section>`;
  const seen=new Set(),order=[];
  for(const z of D.zones){
    h+=`<section class="zone" id="z${z.id}"><h2>${esc(z.chapter||z.name)}</h2>`;
    h+=`<article class="card" id="c-z${z.id}" data-s=""><h3>Fejezet: ${esc(z.name)}</h3><p class="intro"><b>Eleje:</b> ${esc(z.chIntro)}</p><p class="intro"><b>Vége:</b> ${esc(z.chEnd)}</p>${ctl('z'+z.id)}</article>`;
    for(const L of z.levels){const id='L'+L.id;
      h+=`<article class="card" id="c-${id}" data-s=""><h3><span class="id">${esc(L.id)}</span> ${esc(L.name)}${L.tag?`<span class="tag">${esc(L.tag)}</span>`:''}</h3>`;
      if(L.intro)h+=`<p class="intro">${esc(L.intro)}</p>`;
      h+=`<div class="battles">${(L.battles||[]).map((b,i)=>`<div class="bt"><span class="n">${i+1}. csata</span>${b.map(enEl).join('')}</div>`).join('')}</div>`;
      if(L.talk.length)h+=`<details><summary>Párbeszédek (${L.talk.reduce((a,t)=>a+t[1].length,0)} sor)</summary>${L.talk.map(([k,a])=>`<div class="tl">${esc(k)}</div>${talk(a)}`).join('')}</details>`;
      h+=ctl(id)+`</article>`;
      for(const b of L.battles||[])for(const t of b)if(!seen.has(t)){seen.add(t);order.push(t);}}
    h+=`</section>`;}
  h+=`<section class="zone" id="zen"><h2>Minden ellenfél</h2><p class="chap">Ha egy ellenfél képe vagy neve nem jó, itt jelöld.</p>`;
  for(const t of order){const e=D.en[t]||{name:t};h+=`<article class="card" id="c-e-${t}" data-s=""><div class="row">${enEl(t)}<div style="flex:1;min-width:0">${e.desc?`<p class="intro">${esc(e.desc)}</p>`:''}</div></div>${ctl('e-'+t)}</article>`;}
  h+=`</section>`;
  $('list').innerHTML=h;
  $('jump').innerHTML=`<a href="#zt">Teszt</a><a href="#zh">Hősök</a><a href="#zf">Ellenfél-támadások</a><a href="#zs">Idézések</a><a href="#zi">Tárgyak</a><a href="#z0">Bev.</a>`+D.zones.map(z=>`<a href="#z${z.id}">${z.id}.</a>`).join('')+`<a href="#zen">Ellenfelek</a>`;
}
let showAll=false;
function paint(id){const m=marks[id]||{};const c=$('c-'+id);if(!c)return;c.dataset.s=m.status||'';c.hidden=!!m.sent&&!showAll;
  const sb=c.querySelector('[data-send]');if(sb)sb.disabled=!canWrite||!m.status||!!m.sent;const sn=$('sn-'+id);if(sn)sn.hidden=!m.sent;
  const rp=$('rp-'+id);if(rp){rp.hidden=!m.reply;rp.innerHTML=m.reply?'<b>Claude:</b> '+esc(m.reply):'';}
  c.querySelectorAll('button[data-v]').forEach(b=>{b.setAttribute('aria-pressed',String(m.status===b.dataset.v));b.disabled=!canWrite;});
  const t=$('n-'+id);if(t){t.disabled=!canWrite;if(document.activeElement!==t)t.value=m.note||'';}}
function count(){let n=0,bad=0;for(const k in marks){const m=marks[k];if(m.sent&&!m.handled){n++;if(m.status==='bad')bad++;}}$('cSent').textContent=n;$('cBad').textContent=bad;$('done').disabled=!canWrite||!n;return {n,bad};}
async function save(id,patch){const sv=$('sv-'+id);if(sv)sv.textContent='Mentés…';
  try{await db.doc('review/'+id).set({...(marks[id]||{}),...patch,updatedAt:new Date().toISOString()});const s=$('sv-'+id);if(s)s.textContent='Mentve';}
  catch(e){const s=$('sv-'+id);if(s)s.textContent='Nem sikerült menteni, próbáld újra.';}}
document.addEventListener('click',e=>{const b=e.target.closest('button[data-v]');if(!b||!db||!canWrite)return;const id=b.dataset.id,m=marks[id]||{};
  const v=m.status===b.dataset.v?'':b.dataset.v;marks[id]={...m,status:v};paint(id);count();save(id,{status:v});});
document.addEventListener('click',e=>{const b=e.target.closest('button[data-send]');if(!b||!db||!canWrite)return;const id=b.dataset.send,m=marks[id]||{};if(!m.status)return;
  clearTimeout(timers[id]);const t=$('n-'+id);marks[id]={...m,note:t?t.value:m.note,sent:true,handled:false};paint(id);count();save(id,{note:marks[id].note,sent:true,handled:false});});
$('showAll').addEventListener('click',()=>{showAll=!showAll;$('showAll').setAttribute('aria-pressed',String(showAll));$('showAll').textContent=showAll?'Beküldöttek elrejtése':'Beküldöttek mutatása';document.querySelectorAll('.card').forEach(c=>paint(c.id.slice(2)));});
$('done').addEventListener('click',async()=>{const {n,bad}=count();if(!n)return;const st=$('st');$('done').disabled=true;
  try{await db.doc('meta/done').set({at:new Date().toISOString(),sent:n,bad});}catch(e){}
  let ok=false;try{const cm=await window.claude?.use?.('comments');if(cm&&(await cm.canSendToClaude())==='available'){await cm.sendToClaude({anchor:await cm.anchorFor($('done')),text:`Kész az áttekintő: ${n} beküldött pont (${bad} hibás). Javítsd őket.`});ok=true;}}catch(e){}
  st.textContent=ok?'Elküldve Claude-nak, hamarosan nekiáll.':'Elmentve. Most írd meg Claude-nak a chatben: kész.';$('done').disabled=false;});
document.addEventListener('input',e=>{const t=e.target;if(t.tagName!=='TEXTAREA'||!db)return;const id=t.dataset.id;marks[id]={...(marks[id]||{}),note:t.value};
  const s=$('sv-'+id);if(s)s.textContent='…';clearTimeout(timers[id]);timers[id]=setTimeout(()=>save(id,{note:t.value}),900);});
build();
(async()=>{
  try{db=await window.claude?.use?.('db');}catch(e){db=null;}
  if(!db){$('st').textContent='Jelölni csak a Claude appban, bejelentkezve lehet';return;}
  canWrite=true;$('st').textContent='Élő';
  document.querySelectorAll('.card').forEach(c=>paint(c.id.slice(2)));
  db.collection('tests').orderBy('order').onSnapshot(snap=>{const box=$('tests');
    if(!snap.docs.length){box.innerHTML='<div class="empty">Most nincs kipróbálandó javítás.</div>';return;}
    box.innerHTML=snap.docs.map(d=>{const t=d.data(),id='t-'+d.id;return `<article class="card" id="c-${id}" data-s=""><h3><span class="tag">${esc(t.area||'')}</span> ${esc(t.title)}</h3>${t.how?`<p class="intro"><b>Mit csinálj:</b> ${esc(t.how)}</p>`:''}${t.expect?`<p class="intro"><b>Mit kell látnod:</b> ${esc(t.expect)}</p>`:''}${ctl(id)}</article>`;}).join('');
    box.querySelectorAll('.card').forEach(c=>paint(c.id.slice(2)));},()=>{});
  db.collection('review').onSnapshot(snap=>{for(const d of snap.docs){marks[d.id]=d.data();paint(d.id);}count();},()=>{$('st').textContent='A kapcsolat megszakadt, töltsd újra az oldalt';});
})();
</script>
'''
open(S+'/attekinto.html','w',encoding='utf-8').write(html)
print(len(html)//1024,'KB')
