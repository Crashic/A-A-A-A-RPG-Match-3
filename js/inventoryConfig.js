// Слоты снаряжения куклы, руны и инвентарь (сами предметы — js/itemConfig.js, js/itemBases.js).
// Кукла — пары слева/справа (порядок автора): Голова–Плечи, Амулет–Грудь, Пояс–Руки,
// Кольцо–Ноги, Кольцо–Обувь, Оружие–Оружие (оружие — вдвое выше). Под куклой 5 рун.
const DOLL_SLOTS = {
  left:  ['head', 'amulet', 'belt', 'ring', 'ring', 'weapon'],
  right: ['shoulders', 'chest', 'hands', 'legs', 'feet', 'weapon']
};
const SLOT_NAMES = {
  head: tr("ui.Голова"), shoulders: tr("ui.Плечи"), amulet: tr("ui.Амулет"), chest: tr("ui.Грудь"), belt: tr("ui.Пояс"), hands: tr("ui.Руки"),
  ring: tr("ui.Кольцо"), legs: tr("ui.Ноги"), feet: tr("ui.Обувь"), weapon: tr("ui.Оружие"), rune: tr("ui.Руна"), bag: tr("ui.Сумка")
};
const RUNE_SLOTS = 5;
// Сумки и гнёзда под них — js/bagConfig.js (место в инвентаре = надетые сумки, bagCapacity).
