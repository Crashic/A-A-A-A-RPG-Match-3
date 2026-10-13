// Глоссарий · Предметы (js/itemConfig.js, js/itemBases.js, js/itemAffixes.js, js/itemUniques.js):
// как добываются, редкости, вещи по слотам, случайные свойства и уникальные предметы.
function glossaryItems() {
  const dot = color => '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="' + color + '"/></svg>';
  const statName = id => (findById(ITEM_AFFIXES, id) || {}).text || id;
  const out = [glossaryEntry('', tr("ui.Добыча"), '', [
    tr("ui.Побеждённый враг оставляет вещь с шансом ") + Math.round(ITEM_DROP_CHANCE * 100) + tr("ui. %, элита — всегда ") + ITEM_DROP_ELITE + tr("ui., и редкие у неё попадаются чаще."),
    tr("ui.Уровень вещи — уровень врага; надеть можно с уровня на ") + ITEM_REQ_BELOW + tr("ui. ниже. Вещи падают в инвентарь (место дают надетые сумки), что не влезло — остаётся в пустошах."),
    tr("ui.Надеть, снять или выбросить — касанием по вещи на экране «Персонаж». В бою снаряжение не меняется.")])];
  out.push(glossaryHeading(tr("ui.Редкость")));
  const total = ITEM_RARITIES.reduce((a, r) => a + r.weight, 0);
  for (const r of ITEM_RARITIES.filter(x => x.id !== 'junk'))
    out.push(glossaryEntry(dot(r.color), r.name, r.affixes ? (r.affixes[1] ? tr("ui.Случайных свойств: ") + r.affixes.join('–') : tr("ui.Только свойство самой вещи")) : tr("ui.Своё имя и свои свойства"),
      [['list', tr("ui.Шанс среди добычи: ") + String(Math.round(r.weight / total * 1000) / 10).replace('.', ',') + ' %' + (r.power > 1 ? tr("ui. · сила свойств ×") + r.power : '')]]));
  out.push(glossaryEntry(dot(findById(ITEM_RARITIES, 'junk').color), tr("ui.Хлам"), tr("ui.Только на продажу · шанс ") + Math.round(JUNK_DROP_CHANCE * 100) + ' %',
    [['list', JUNK_ITEMS.map(j => j.name).join(' · ')], tr("ui.Семёныч берёт оптом — кнопкой «Сдать хлам».")]));
  out.push(glossaryHeading(tr("ui.Ресурсы")));
  out.push(glossaryEntry('', tr("ui.Ресурсы лагеря"), tr("ui.Общие для аккаунта · шанс ") + Math.round(RESOURCE_DROP_CHANCE * 100) + ' %',
    [tr("ui.С побеждённых врагов падает 1–3 единицы (с элиты — вдвое больше). Хранятся в лагере, пригодятся для построек и крафта.")]));
  for (const r of RESOURCES) out.push(glossaryEntry(resourceIcon(r.id), r.name, tr("ui.Ресурс"), []));
  out.push(glossaryHeading(tr("ui.Вещи по слотам")));
  const kinds = [...new Set(ITEM_BASES.map(b => b.slot))];
  for (const k of kinds)
    out.push(glossaryEntry(slotIcon(k), SLOT_NAMES[k], '', [['list', ITEM_BASES.filter(b => b.slot === k).map(b => b.name + ' (' + statName(b.main) + ')').join(' · ')]]));
  out.push(glossaryHeading(tr("ui.Случайные свойства")));
  for (const a of ITEM_AFFIXES)
    out.push(glossaryEntry('', a.text, '«' + a.prefix[0] + tr("ui. …» или «… ") + a.suffix + '»', []));
  out.push(glossaryHeading(tr("ui.Уникальные предметы")));
  for (const u of ITEM_UNIQUES) {
    const base = findById(ITEM_BASES, u.base) || {};
    out.push(glossaryEntry(dot(ITEM_RARITIES[3].color), u.name, base.name + ' · ' + SLOT_NAMES[base.slot] + tr("ui. · с ") + u.minLevel + tr("ui.-го уровня"),
      [['list', Object.keys(u.mods).map(statName).join(', ')], ['lore', u.lore]]));
  }
  return out;
}
