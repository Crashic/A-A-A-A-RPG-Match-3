// Подпись под названием пропуска в игровом меню: своя шутка для пункта (HUB_SUBS), иначе подсказка без повтора названия.
const HUB_SUBS = {
  map: tr('ui.кого бить сегодня'),
  char: tr('ui.шмот, навыки, личное дело'),
  glossary: tr('ui.справочник выжившего'),
  camp: tr('ui.общий для всех ваших героев')
};
function hubItemSub(it) {
  if (HUB_SUBS[it.act]) return HUB_SUBS[it.act];
  const tip = it.tip || '';
  const pre = it.label + ': ';
  return tip.startsWith(pre) ? tip.slice(pre.length) : (tip === it.label ? '' : tip);
}
