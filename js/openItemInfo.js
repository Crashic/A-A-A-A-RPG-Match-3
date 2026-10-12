// Окно предмета: название цветом редкости, редкость, база и слот, уровень и требование, свойства,
// шутка, сравнение с надетым и цена у торговца. where — { bag: номер в сумке } или { gear: ключ слота }.
// Кнопки: из сумки — «Выбросить» (с подтверждением) и «Надеть»; надетое — «Снять».
function openItemInfo(where) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const inBag = where.bag !== undefined;
  const item = inBag ? (hero.bag || [])[where.bag] : (hero.gear || {})[where.gear];
  if (!item) return;
  const base = findById(ITEM_BASES, item.base) || {};
  const rar = findById(ITEM_RARITIES, item.rarity) || ITEM_RARITIES[0];
  const uniq = item.unique ? findById(ITEM_UNIQUES, item.unique) : null;
  const box = document.getElementById('itemInfo');
  const title = document.getElementById('itemInfoTitle');
  title.textContent = item.name;
  title.style.color = rar.color;
  const body = document.getElementById('itemInfoBody');
  body.innerHTML = '';
  const p = (text, cls) => { const el = document.createElement('p'); el.className = cls; el.textContent = text; body.appendChild(el); return el; };
  p(rar.name + ' · ' + (item.rarity === 'common' ? SLOT_NAMES[base.slot] : base.name + ' · ' + SLOT_NAMES[base.slot]), 'itSub').style.color = rar.color;
  const req = p('Уровень предмета ' + item.level + ' · нужен ' + item.req + '-й уровень', 'itReq');
  if (hero.level < item.req) req.classList.add('bad');
  const mods = document.createElement('ul');
  mods.className = 'itMods';
  for (const m of itemMods(item)) {
    const li = document.createElement('li');
    li.textContent = modText(m);
    mods.appendChild(li);
  }
  body.appendChild(mods);
  p(uniq ? uniq.lore : base.lore || '', 'itLore');
  // сравнение с тем, что сейчас в этом слоте
  if (inBag) {
    const key = gearSlotFor(hero, item);
    const worn = key && hero.gear && hero.gear[key];
    if (worn) {
      const sum = list => { const t = {}; for (const m of list) t[m.id] = (t[m.id] || 0) + m.v; return t; };
      const a = sum(itemMods(item)), b = sum(itemMods(worn));
      const diff = ITEM_AFFIXES.map(x => ({ x, d: Math.round(((a[x.id] || 0) - (b[x.id] || 0)) * 2) / 2 })).filter(r => r.d);
      const cmp = p('Вместо «' + worn.name + '»: ', 'itCmp');
      if (!diff.length) cmp.append('без разницы');
      diff.forEach((r, i) => {
        const s = document.createElement('span');
        s.className = r.d > 0 ? 'up' : 'down';
        s.textContent = (i ? ', ' : '') + (r.d > 0 ? '+' : '−') + String(Math.abs(r.d)).replace('.', ',') + r.x.unit + ' ' + r.x.text;
        cmp.appendChild(s);
      });
    }
  }
  const price = p('', 'itPrice');
  price.innerHTML = '<span>Цена у торговца</span>' + formatTape(itemPrice(item));
  // кнопки
  const btns = document.getElementById('itemInfoButtons');
  btns.innerHTML = '';
  const close = () => box.classList.remove('open');
  const btn = (label, cls, fn, disabled) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + cls;
    b.textContent = label;
    b.disabled = !!disabled;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    btns.appendChild(b);
  };
  const locked = statsLocked();
  if (inBag) {
    btn('Выбросить', 'red', () => showConfirm('Выбросить «' + item.name + '»? Вернуть не получится.', 'Выбросить', () => { close(); dropItem(where.bag); }));
    btn(hero.level < item.req ? 'Нужен ' + item.req + ' ур.' : 'Надеть', 'green', () => { if (equipItem(where.bag)) close(); }, locked || hero.level < item.req);
  } else {
    btn('Снять', 'stone', () => { if (unequipItem(where.gear)) close(); }, locked);
  }
  if (locked) p('В бою снаряжение не меняется (кроме режима читов).', 'itReq');
  box.classList.add('open');
}
