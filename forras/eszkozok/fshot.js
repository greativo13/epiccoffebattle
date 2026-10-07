const {chromium}=require('playwright');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:390,height:844}});
p.on('pageerror',e=>console.log('ERR',e.message));
await p.goto('file://'+process.cwd()+'/full/teljes-tesztlista.html');await p.waitForTimeout(1500);
await p.evaluate(()=>{document.querySelectorAll('.sec')[3].open=true;});await p.waitForTimeout(300);
console.log(await p.evaluate(()=>[document.querySelectorAll('.card').length,document.documentElement.scrollWidth]));
await p.screenshot({path:'full/shot.png',fullPage:false});await b.close();})();
