from pathlib import Path
import re,json,shutil
root=Path('-old-hugo/content'); out=Path('src/content/wiki'); redirects={}; inventory=[]
# Conversion is deliberately restricted to prose outside fenced code.
def convert(text,slug):
 parts=re.split(r'(?m)(^```[^\n]*\n[\s\S]*?^```[^\n]*$)',text)
 for i in range(0,len(parts),2):
  s=parts[i].replace('<!--more-->','')
  s=re.sub(r'{{<\s*relref\s+"([^"]+)"\s*>}}',lambda m:'/wiki/'+m[1].removesuffix('/index.md').removesuffix('.md').split('/')[-1].lower(),s)
  s=re.sub(r'{{<\s*figure\s+([\s\S]*?)>}}',lambda m:figure(m[1],slug),s)
  s=re.sub(r'{{<\s*gallery[^>]*>}}',lambda m:'\n\n'.join(f'![](/wiki/{slug}/{p.relative_to(root/"blog"/slug)})' for p in sorted((root/'blog'/slug).rglob('*')) if p.suffix.lower() in ['.jpg','.jpeg','.png']),s)
  s=re.sub(r'{{<\s*blockquote[^>]*>}}([\s\S]*?){{<\s*/blockquote\s*>}}',lambda m:'\n'.join('> '+line for line in m[1].strip().splitlines()),s)
  s=re.sub(r'{{[<%]\s*/?table[^>]*[>%]}}','',s)
  parts[i]=s
 return ''.join(parts)
def figure(attrs,slug):
 a=dict(re.findall(r'(\w+)="([^"]*)"',attrs)); img=a.get('img',''); caption=a.get('caption',''); return f'\n![{a.get("alt",caption)}](/wiki/{slug}/{img})\n\n{caption}\n'
for p in sorted((root/'blog').glob('*/index.md')):
 s=p.read_text(); fm,body=s.split('---',2)[1:]; slug=p.parent.name.lower()
 if re.search(r'^draft: true$',fm,re.M):continue
 title=re.search(r'^title:\s*(.*)',fm,re.M)[1]; date=re.search(r'^(?:publishdate):\s*(.*)',fm,re.M) or re.search(r'^date:\s*(.*)',fm,re.M)
 aliases=re.findall(r'^\s*-\s+(/\S+)',fm,re.M); aliases.insert(0,'/'+slug+'/')
 for a in aliases:redirects[a.rstrip('/')]=f'/wiki/{slug}'
 out.mkdir(parents=True,exist_ok=True)
 (out/f'{slug}.md').write_text(f'---\ntitle: {title}\ndate: {date[1][:10]}\naliases: {json.dumps(aliases)}\n---\n'+convert(body,slug))
 for a in p.parent.rglob('*'):
  if a.is_file() and a!=p:
   rel=a.relative_to(p.parent); target=Path('public/wiki')/slug/rel; target.parent.mkdir(parents=True,exist_ok=True); shutil.copyfile(a,target); redirects[f'/{slug}/{rel}']=f'/wiki/{slug}/{rel}'
 inventory.append({'source':str(p),'id':slug,'aliases':aliases})
redirects.update({x:'/wiki' for x in ['/blog','/post','/archive','/archives']});redirects['/about']='/'
Path('src/legacy-redirects.json').write_text(json.dumps(redirects,indent=2)+'\n');Path('scripts/hugo-inventory.json').write_text(json.dumps(inventory,indent=2)+'\n')
print(f'Migrated {len(inventory)} posts')
