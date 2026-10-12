// Текст всплывающей подсказки предмета (наведение мыши): редкость, база и слот, уровень,
// свойства по строке и шутка. Строки — через перевод строки (#tip span — white-space: pre-line).
function itemTipText(item) {
  const base = findById(ITEM_BASES, item.base) || {};
  const rar = findById(ITEM_RARITIES, item.rarity) || ITEM_RARITIES[0];
  const uniq = item.unique ? findById(ITEM_UNIQUES, item.unique) : null;
  return [
    rar.name + ' · ' + (item.rarity === 'common' ? '' : base.name + ' · ') + SLOT_NAMES[base.slot],
    'Уровень ' + item.level + ', нужен ' + item.req + '-й',
    ...itemMods(item).map(modText),
    uniq ? uniq.lore : base.lore || ''
  ].filter(Boolean).join('\n');
}
