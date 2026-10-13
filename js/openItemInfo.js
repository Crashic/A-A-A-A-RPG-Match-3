// Окно предмета: название цветом редкости, редкость, база и слот, уровень и требование, свойства,
// шутка, сравнение с надетым и цена. where — { bag: номер в сумке } (у торговца — { bag, sell: true }),
// { gear: ключ слота } или { shop: номер на прилавке }.
// Кнопки: из сумки — «Выбросить» (с подтверждением) и «Надеть»; у торговца — «Продать» и «Надеть»;
// надетое — «Снять»; с прилавка — «Купить».
function openItemInfo(where) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const inBag = where.bag !== undefined;
  const inShop = where.shop !== undefined;
  const item = where.pack !== undefined ? heroPacks(hero).worn[where.pack] : inShop ? ((hero.shop || {}).items || [])[where.shop] : inBag ? (hero.bag || [])[where.bag] : (hero.gear || {})[where.gear];
  if (!item) return;
  if (isBagItem(item)) { openBagInfo(where); return; }
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
  if (inBag || inShop) {
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
      // само надетое: название цветом редкости и свойства
      const wr = findById(ITEM_RARITIES, worn.rarity) || ITEM_RARITIES[0];
      const box2 = document.createElement('div');
      box2.className = 'itWorn';
      box2.innerHTML = '<p class="itWornHead">Сейчас надето:</p><p class="itWornName"></p><ul class="itMods"></ul>';
      const nm = box2.querySelector('.itWornName');
      nm.textContent = worn.name + ' · ур. ' + worn.level;
      nm.style.color = wr.color;
      for (const m of itemMods(worn)) { const li = document.createElement('li'); li.textContent = modText(m); box2.querySelector('ul').appendChild(li); }
      body.appendChild(box2);
    } else if (key) {
      p('Слот «' + SLOT_NAMES[findById(ITEM_BASES, item.base).slot] + '» сейчас пустой — наденьте, хуже не будет.', 'itCmp');
    }
  }
  const price = p('', 'itPrice');
  price.innerHTML = '<span>' + (inShop ? 'Цена' : 'Цена у торговца') + '</span>' + formatTape(inShop ? buyPrice(item) : itemPrice(item));
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
  if (inShop) {
    const cost = buyPrice(item);
    btn((hero.tape || 0) < cost ? 'Не хватает изоленты' : 'Купить', 'orange', () => { if (buyItem(where.shop)) close(); },
      (hero.tape || 0) < cost || (hero.bag || []).length >= bagCapacity(hero));
  } else if (inBag && where.sell) {
    btn('Продать', 'orange', () => { close(); sellItem(where.bag); });
    btn(hero.level < item.req ? 'Нужен ' + item.req + ' ур.' : 'Надеть', 'green', () => { if (equipItem(where.bag)) close(); }, locked || hero.level < item.req);
  } else if (inBag) {
    btn('Выбросить', 'red', () => showConfirm('Выбросить «' + item.name + '»? Вернуть не получится.', 'Выбросить', () => { close(); dropItem(where.bag); }));
    btn(hero.level < item.req ? 'Нужен ' + item.req + ' ур.' : 'Надеть', 'green', () => { if (equipItem(where.bag)) close(); }, locked || hero.level < item.req);
  } else {
    btn('Снять', 'stone', () => { if (unequipItem(where.gear)) close(); }, locked);
  }
  if (locked && !inShop) p('В бою снаряжение не меняется (кроме режима читов).', 'itReq');
  box.classList.add('open');
}
