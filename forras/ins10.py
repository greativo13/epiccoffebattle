import sys,os
D=os.path.dirname(os.path.abspath(__file__))
G=os.path.join(D,'..','game.html')
s=open(G,encoding='utf-8').read()
files=sorted(f for f in os.listdir(D) if f.endswith('.js') and (f[:2]=='r1' and f[2].isdigit() or f.startswith('r20') and f[2].isdigit()))
# Az r19z.js maradjon minden kör legutolsó felülíró rétege.
if 'r19z.js' in files:
    files.remove('r19z.js')
    files.append('r19z.js')
code=''.join(open(os.path.join(D,f),encoding='utf-8').read() for f in files)
M='\n// ===== 10. kör =====';E='/* ================= INDÍTÁS ================= */'
if M in s:
    i=s.index(M);j=s.index(E);s=s[:i]+'\n'+s[j:]
j=s.index(E)
s=s[:j].rstrip('\n')+'\n'+code.rstrip('\n')+'\n\n'+s[j:]
open(G,'w',encoding='utf-8').write(s)
print('ok',len(code))
