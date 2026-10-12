// Все свойства предмета списком [{ id, v }]: сначала характеристика самой вещи, затем остальные;
// одинаковые свойства складываются.
function itemMods(item) {
  const base = findById(ITEM_BASES, item.base);
  const out = [];
  const add = (id, v) => { const m = out.find(x => x.id === id); if (m) m.v += v; else out.push({ id, v }); };
  if (base) add(base.main, item.main || 0);
  for (const m of item.mods || []) add(m.id, m.v);
  return out;
}
