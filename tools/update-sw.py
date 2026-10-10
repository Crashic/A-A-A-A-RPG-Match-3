# Обновляет список FILES в sw.js: стили и скрипты из index.html, шрифты, спрайты, манифест, иконки.
# Запуск: python3 tools/update-sw.py
import os, re
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
html = open(os.path.join(root, 'index.html'), encoding='utf-8').read()
files = ['./', './index.html']
files += ['./' + p for p in re.findall(r'<link rel="stylesheet" href="([^"]+)"', html)]
files += ['./' + p for p in re.findall(r'<script src="([^"]+)"', html)]
for folder, exts in (('fonts', ('.woff2',)), ('sprites', ('.svg', '.png', '.webp'))):
    d = os.path.join(root, folder)
    if os.path.isdir(d):
        for dirpath, _, names in sorted(os.walk(d)):
            for n in sorted(names):
                if n.endswith(exts):
                    files.append('./' + os.path.relpath(os.path.join(dirpath, n), root).replace(os.sep, '/'))
files += ['./manifest.webmanifest', './icon-192.png', './icon-512.png']
p = os.path.join(root, 'sw.js')
sw = open(p, encoding='utf-8').read()
block = 'const FILES = [\n' + ',\n'.join("  '%s'" % f for f in files) + '\n];'
open(p, 'w', encoding='utf-8').write(re.sub(r'const FILES = \[.*?\];', block, sw, flags=re.S))
print(len(files), 'files in sw.js')
