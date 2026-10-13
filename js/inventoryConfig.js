// Слоты снаряжения куклы, руны и инвентарь (сами предметы — js/itemConfig.js, js/itemBases.js).
// Кукла — пары слева/справа (порядок автора): Голова–Плечи, Амулет–Грудь, Пояс–Руки,
// Кольцо–Ноги, Кольцо–Обувь, Оружие–Оружие (оружие — вдвое выше). Под куклой 5 рун.
const DOLL_SLOTS = {
  left:  ['head', 'amulet', 'belt', 'ring', 'ring', 'weapon'],
  right: ['shoulders', 'chest', 'hands', 'legs', 'feet', 'weapon']
};
const SLOT_NAMES = {
  head: 'Голова', shoulders: 'Плечи', amulet: 'Амулет', chest: 'Грудь', belt: 'Пояс', hands: 'Руки',
  ring: 'Кольцо', legs: 'Ноги', feet: 'Обувь', weapon: 'Оружие', rune: 'Руна', bag: 'Сумка'
};
const RUNE_SLOTS = 5;
// Сумки и гнёзда под них — js/bagConfig.js (место в инвентаре = надетые сумки, bagCapacity).
