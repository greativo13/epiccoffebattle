import sys
from PIL import Image
fs=sys.argv[2:];out=sys.argv[1]
ims=[Image.open(f) for f in fs];w,h=ims[0].size;cols=2;rows=(len(ims)+1)//2
M=Image.new('RGB',(w*cols//2*1,h*rows//2*1))
for i,im in enumerate(ims):M.paste(im.resize((w//2,h//2)),((i%2)*w//2,(i//2)*h//2))
M.save(out)
