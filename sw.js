// Gyorsítótár a játékhoz: a képek és hangok (a nevükben tartalom-ujjlenyomat van, így sosem változnak) a telefonról töltődnek,
// az oldal (index.html) mindig a netről jön, ha van net – így a frissítés azonnal látszik.
const CACHE='kaverablas-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(/\/kepek\/|\.(mp3|jpg|png|webp)$/i.test(u.pathname)){
    e.respondWith(caches.open(CACHE).then(c=>c.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok)c.put(e.request,r.clone());return r;}))));
  }else if(e.request.mode==='navigate'||/\.html$/.test(u.pathname)){
    e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return r;}).catch(()=>caches.match(e.request)));
  }});
