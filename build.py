import re,os
h=open('index.html',encoding='utf-8').read()
h=h.replace('<link rel="stylesheet" href="css/style.css">','<style>'+open('css/style.css',encoding='utf-8').read()+'</style>')
h=re.sub(r'<script src="js/pwa.js"></script>','',h)
h=re.sub(r'<script src="(js/[^"]+)"></script>\n?',lambda m:'',h)
js='\n'.join(open('js/'+f,encoding='utf-8').read() for f in re.findall(r'<script src="js/([^"]+)"',open('index.html',encoding='utf-8').read()) if f!='pwa.js')
h=h.replace('</body>','<script>'+js+'</script></body>')
os.makedirs('dist',exist_ok=True);open('dist/abyss-shards.html','w',encoding='utf-8').write(h)
