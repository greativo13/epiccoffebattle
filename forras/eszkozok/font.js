const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:900,height:300}});
await p.goto('http://localhost:8765/index.html');await p.waitForTimeout(3000);
await p.evaluate(()=>{document.body.innerHTML='<div style="font:400 44px \'Lilita One\';color:#fc4;background:#222;padding:10px">Ő ő Ű ű Á É Ö Ü – TŰZGOLYÓ Erdő</div><div style="font:800 40px Nunito;color:#fff;background:#222;padding:10px">Ő ő Ű ű Erdő TŰZGOLYÓ</div>';});
await p.waitForTimeout(800);await p.screenshot({path:process.argv[2]});await b.close();})();
