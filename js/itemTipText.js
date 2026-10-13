// Текст всплывающей подсказки предмета (наведение мыши): редкость, база и слот, уровень,
// свойства по строке и шутка. Строки — через перевод строки (#tip span — white-space: pre-line).
function itemTipText(item) {
  if (isJunkItem(item)) return 'Хлам · только на продажу\n' + ((findById(JUNK_ITEMS, item.junk) || {}).lore || '');
  if (isBagItem(item)) return 'Сумка · ' + item.size + ' ячеек\n' + ((findById(BAG_TYPES, item.bagType) || {}).lore || '');
  const base = findById(ITEM_BASES, item.base) || {};
  const rar = findById(ITEM_RARITIES, item.rarity) || ITEM_RARITIES[0];
  const uniq = item.unique ? findById(ITEM_UNIQUES, item.unique) : null;
  return [
    rar.name + ' · ' + (item.rarity === 'common' ? '' : base.name + ' · ') + SLOT_NAMES[base.slot] + (base.hands === 2 ? ' (двуручное)' : ''),
    'Уровень ' + item.level + ', нужен ' + item.req + '-й',
    ...itemMods(item).map(modText),
    weaponKindText(item),
    uniq ? uniq.lore : base.lore || '',
    itemWornTip(item)
  ].filter(Boolean).join('\n');
}
