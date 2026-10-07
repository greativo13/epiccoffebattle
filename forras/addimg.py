import sys,json,re,base64
import os
G=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','game.html')
h=open(G,encoding='utf-8').read()
m=re.search(r'^const IMG_SRC=(\{.*\});\s*$',h,re.M)
imgs=json.loads(m.group(1))
for a in sys.argv[1:]:
  name,path=a.split('=',1)
  imgs[name]='data:image/webp;base64,'+base64.b64encode(open(path,'rb').read()).decode()
  print('beírva',name)
h=h[:m.start(1)]+json.dumps(imgs,ensure_ascii=False,separators=(',',':'))+h[m.end(1):]
open(G,'w',encoding='utf-8').write(h)
