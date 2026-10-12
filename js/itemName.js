// Название предмета: обычный — как база; магический — приставка и/или окончание по свойствам
// («Шустрые кеды «Два мяча» снайпера»); редкий — два случайных слова («Тоска профкома»).
// ids — id случайных свойств предмета (ITEM_AFFIXES).
function itemName(base, rarity, ids) {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  if (rarity === 'rare') return pick(RARE_NAME_FIRST) + ' ' + pick(RARE_NAME_SECOND);
  if (rarity !== 'magic' || !ids.length) return base.name;
  const lower = base.name[0].toLowerCase() + base.name.slice(1);
  const form = { m: 0, f: 1, n: 2, p: 3 }[base.g] || 0;
  const pre = ids.length > 1 || Math.random() < 0.5 ? findById(ITEM_AFFIXES, ids[0]) : null;
  const suf = ids.length > 1 ? findById(ITEM_AFFIXES, ids[1]) : (pre ? null : findById(ITEM_AFFIXES, ids[0]));
  return (pre ? pre.prefix[form] + ' ' + lower : base.name) + (suf ? ' ' + suf.suffix : '');
}
