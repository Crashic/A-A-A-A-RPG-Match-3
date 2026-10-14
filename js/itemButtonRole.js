// Роль кнопки окна вещи по её надписи (data-role) — на неё наводятся стрелки сюжета.
function itemButtonRole(label) {
  const map = {};
  map[tr("ui.Продать")] = 'sell';
  map[tr("ui.Купить")] = 'buy';
  map[tr("ui.Надеть")] = 'equip';
  map[tr("ui.В левую")] = 'equip';
  map[tr("ui.В правую")] = 'equip';
  map[tr("ui.Выбросить")] = 'drop';
  map[tr("ui.Снять")] = 'unequip';
  return map[label] || '';
}
