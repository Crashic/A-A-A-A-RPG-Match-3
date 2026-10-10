# Генерирует css/tokens.css из design/tokens.json (дизайн-система).
# Запуск: python3 tools/build-tokens.py
import json, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = json.load(open(os.path.join(root, 'design', 'tokens.json'), encoding='utf-8'))
out = ['/* Сгенерировано из design/tokens.json — не править руками, запустить tools/build-tokens.py */', ':root {']
for tok in t['color']['tokens']:
    v = tok['value'] if isinstance(tok['value'], str) else list(tok['value'].values())[0]
    out.append(f"  --{tok['name']}: {v};")
for fam in ('spacing', 'radius', 'shadow'):
    for tok in t.get(fam, {}).get('tokens', []):
        out.append(f"  --{tok['name']}: {tok['value']};")
for k, v in t['type']['families'].items():
    out.append(f"  --font-{k}: {v};")
out.append('}')
open(os.path.join(root, 'css', 'tokens.css'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('css/tokens.css:', len(out) - 3, 'tokens')
