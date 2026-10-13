// Строки подсказки «Надето: …» — что сейчас надето в том же слоте у текущего героя (для сравнения).
// '' — если вещь не надевается, герой не выбран или слот пуст (тогда — «Слот пуст»).
function itemWornTip(item) {
  const hero = loadSlot(getActiveSlot());
  if (!hero || !item.base) return '';
  const gear = hero.gear || {};
  if (Object.values(gear).some(g => g && g.uid === item.uid)) return ''; // это и есть надетая вещь
  const key = gearSlotFor(hero, item);
  const worn = key && gear[key];
  if (!key) return '';
  if (!worn) return tr("ui.— Слот пуст: надевайте смело —");
  return [tr("ui.— Надето: ") + worn.name + tr("ui. (ур. ") + worn.level + ') —', ...itemMods(worn).map(modText)].join('\n');
}
