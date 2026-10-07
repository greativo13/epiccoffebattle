const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});const p=await b.newPage({viewport:{width:900,height:520}});
const u='data:image/webp;base64,'+fs.readFileSync(process.argv[2]).toString('base64');
await p.setContent(`<body style="margin:0;background:linear-gradient(#4a8a3a,#2a4a2a)"><img src="${u}" style="width:880px;margin:10px"></body>`);await p.waitForTimeout(500);await p.screenshot({path:process.argv[3]});await b.close();})();
