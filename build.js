// A src/ mappa darabjaiból összeállítja az egyfájlos game.html-t.
// A kepek/ mappa képeit (png/jpg/webp) beágyazza: a fájlnév adja meg, melyik ellenfélé
// (pl. kepek/slime.png -> a "slime" típusú ellenfél képe). Fehér háttér előtt álló, balra néző figura kell.
// Használat:  node build.js
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
let head = fs.readFileSync(path.join(dir, '00-head.html'), 'utf8');
// A betűtípusokat beágyazzuk (betuk/betuk.css), így internet nélkül is megvannak.
const fontCss = path.join(__dirname, 'betuk', 'betuk.css');
if (fs.existsSync(fontCss)) head = head.replace(/<link[^>]*fonts\.(googleapis|gstatic)[^>]*>\n?/g, '').replace('<style>', '<style>\n' + fs.readFileSync(fontCss, 'utf8'));
const scripts = fs.readdirSync(dir)
  .filter(f => f.endsWith('.js'))
  .sort()
  .map(f => fs.readFileSync(path.join(dir, f), 'utf8').trim())
  .join('\n\n');

const imgDir = path.join(__dirname, 'kepek');
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const imgs = {};
if (fs.existsSync(imgDir)) for (const f of fs.readdirSync(imgDir).sort()) {
  const ext = path.extname(f).toLowerCase();
  if (MIME[ext]) imgs[path.basename(f, ext)] = 'data:' + MIME[ext] + ';base64,' + fs.readFileSync(path.join(imgDir, f)).toString('base64');
}
const imgScript = '/* A kepek/ mappa beágyazott képei */\nconst IMG_SRC=' + JSON.stringify(imgs) + ';';

fs.writeFileSync(path.join(__dirname, 'game.html'), head + '<script>\n' + imgScript + '\n\n' + scripts + '\n</script>\n');
console.log('game.html kész:', fs.statSync(path.join(__dirname, 'game.html')).size, 'bájt,', Object.keys(imgs).length, 'beágyazott kép');
