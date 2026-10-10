# Генерирует css/tokens.css из design/tokens.json (дизайн-система).
# Цвета: --<имя>; ссылки вида "{gem-amber}" раскрываются в значение.
# Шрифты: --font-<семейство> (head, body, small, …) и для каждого стиля текста
#   --type-<стиль>: "вес кегль/интерлиньяж семейство" (для свойства font)
#   --type-<стиль>-ls: трекинг (letter-spacing)
# Запуск: python3 tools/build-tokens.py
import json, os, re

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
t = json.load(open(os.path.join(root, 'design', 'tokens.json'), encoding='utf-8'))


def first(v):
    return v if isinstance(v, str) else list(v.values())[0]


colors = {tok['name']: first(tok['value']) for tok in t['color']['tokens']}


def resolve(v, seen=()):
    m = re.fullmatch(r'\{(.+)\}', v)
    if m and m.group(1) in colors and m.group(1) not in seen:
        return resolve(colors[m.group(1)], seen + (m.group(1),))
    return v


out = ['/* Сгенерировано из design/tokens.json — не править руками, запустить tools/build-tokens.py */', ':root {']
for name, v in colors.items():
    out.append(f'  --{name}: {resolve(v)};')
for fam in ('spacing', 'radius', 'shadow'):
    for tok in t.get(fam, {}).get('tokens', []):
        out.append(f"  --{tok['name']}: {first(tok['value'])};")

families = t['type']['families']
for key, stack in families.items():
    out.append(f'  --font-{key}: {stack};')
for group in t['type']['groups']:
    for st in group['styles']:
        key = st.get('family') or group.get('family')
        out.append(f"  --type-{st['name']}: {st['fontWeight']} {st['fontSize']}/{st['lineHeight']} var(--font-{key});")
        out.append(f"  --type-{st['name']}-ls: {st.get('letterSpacing') or 0};")
out.append('}')

open(os.path.join(root, 'css', 'tokens.css'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print('css/tokens.css:', len(out) - 3, 'tokens')
