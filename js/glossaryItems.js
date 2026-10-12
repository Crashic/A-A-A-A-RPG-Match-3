// Глоссарий · Предметы (js/itemConfig.js, js/itemBases.js, js/itemAffixes.js, js/itemUniques.js):
// как добываются, редкости, вещи по слотам, случайные свойства и уникальные предметы.
function glossaryItems() {
  const dot = color => '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="' + color + '"/></svg>';
  const statName = id => (findById(ITEM_AFFIXES, id) || {}).text || id;
  const out = [glossaryEntry('', 'Добыча', '', [
    'Побеждённый враг оставляет вещь с шансом ' + Math.round(ITEM_DROP_CHANCE * 100) + ' %, элита — всегда ' + ITEM_DROP_ELITE + ', и редкие у неё попадаются чаще.',
    'Уровень вещи — уровень врага; надеть можно с уровня на ' + ITEM_REQ_BELOW + ' ниже. Вещи падают в сумку (' + BACKPACK_SLOTS + ' ячеек), что не влезло — остаётся в пустошах.',
    'Надеть, снять или выбросить — касанием по вещи на экране «Персонаж». В бою снаряжение не меняется.'])];
  out.push(glossaryHeading('Редкость'));
  for (const r of ITEM_RARITIES)
    out.push(glossaryEntry(dot(r.color), r.name, r.affixes ? (r.affixes[1] ? 'Случайных свойств: ' + r.affixes.join('–') : 'Только свойство самой вещи') : 'Своё имя и свои свойства', []));
  out.push(glossaryHeading('Вещи по слотам'));
  const kinds = [...new Set(ITEM_BASES.map(b => b.slot))];
  for (const k of kinds)
    out.push(glossaryEntry(slotIcon(k), SLOT_NAMES[k], '', [['list', ITEM_BASES.filter(b => b.slot === k).map(b => b.name + ' (' + statName(b.main) + ')').join(' · ')]]));
  out.push(glossaryHeading('Случайные свойства'));
  for (const a of ITEM_AFFIXES)
    out.push(glossaryEntry('', a.text, '«' + a.prefix[0] + ' …» или «… ' + a.suffix + '»', []));
  out.push(glossaryHeading('Уникальные предметы'));
  for (const u of ITEM_UNIQUES) {
    const base = findById(ITEM_BASES, u.base) || {};
    out.push(glossaryEntry(dot(ITEM_RARITIES[3].color), u.name, base.name + ' · ' + SLOT_NAMES[base.slot] + ' · с ' + u.minLevel + '-го уровня',
      [['list', Object.keys(u.mods).map(statName).join(', ')], ['lore', u.lore]]));
  }
  return out;
}
