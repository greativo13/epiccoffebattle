import sys,os
D=os.path.dirname(os.path.abspath(__file__))
G=os.path.join(D,'..','game.html')
s=open(G,encoding='utf-8').read()
code=''.join(open(os.path.join(D,f)).read() for f in sorted(os.listdir(D)) if f[:2]=='r1' and f[2].isdigit() and f.endswith('.js'))
M='\n// ===== 10. kör =====';E='/* ================= INDÍTÁS ================= */'
if M in s:
    i=s.index(M);j=s.index(E);s=s[:i]+'\n'+s[j:]
j=s.index(E)
s=s[:j].rstrip('\n')+'\n'+code.rstrip('\n')+'\n\n'+s[j:]
open(G,'w',encoding='utf-8').write(s)
print('ok',len(code))
