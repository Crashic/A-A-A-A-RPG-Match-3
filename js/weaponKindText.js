// Подпись вида оружия для окна и подсказки: «Двуручное: ×3 к свойствам, бьёт раз в 2 хода» / «Одноручное: …».
// '' — если это не оружие.
function weaponKindText(item) {
  const base = item && findById(ITEM_BASES, item.base);
  if (!base || base.slot !== 'weapon') return '';
  return isTwoHanded(item)
    ? tr("ui.Двуручное: занимает обе руки, свойства ×") + TWO_HAND_MULT + tr("ui., но бьёт только каждый второй ход (Топливо в ход замаха урона не даёт).")
    : tr("ui.Одноручное: в левую или правую руку, можно взять два.");
}
