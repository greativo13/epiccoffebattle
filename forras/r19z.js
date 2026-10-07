
// ---- az új animációk is kapnak hangot, ha fél másodpercig maguktól nem szólnak
{const elemSnd=sk=>sk&&({fire:'fire',ice:'ice',thunder:'thunder',holy:'holy',dark:'dark',poison:'poison',nature:'poison',water:'splash',earth:'rock'}[sk.elem]||(['heal','elixir','revive','bless','cleanse','mp'].includes(sk.kind)?'heal':sk.kind==='buff'?'buff':'slash'));
  for(const k of Object.keys(A)){const f=A[k];if(typeof f!=='function'||A_R10.get(k)===f)continue;if(!['healAll','esweep','ecloud','ebuff','erain'].includes(k))NOFX.add(k);A[k]=function(u,ts,sk){const n0=SFX_N;setTimeout(()=>{if(SFX_N===n0)sfx(elemSnd(sk));},450/(S.speed||1));return f.apply(this,arguments);};}}
