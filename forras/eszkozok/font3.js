const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:900,height:120}});
const css=fs.readFileSync(process.argv[2],'utf8');await p.setContent(`<style>${css}body{background:#222;margin:0}</style><div style="font:400 46px 'BalooX';color:#fc4;padding:10px">BalooX 400: Ő ő Ű ű TŰZGOLYÓ Erdő</div>`);
await p.waitForTimeout(800);await p.screenshot({path:process.argv[3]});await b.close();})();
