// Строка свойства предмета: «+5 Сила», «+1,5 % Шанс крита».
function modText(mod) {
  const a = findById(ITEM_AFFIXES, mod.id);
  const v = String(mod.v).replace('.', ',');
  return '+' + v + (a ? a.unit + ' ' + a.text : '');
}
