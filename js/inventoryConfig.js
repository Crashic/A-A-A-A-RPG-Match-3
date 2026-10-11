// Слоты снаряжения куклы, руны и инвентарь (предметов пока нет — слоты пустые).
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
const BAG_SLOTS = 6;        // слоты для сумок над инвентарём; в конце — «+» (купить ещё, позже)
const BACKPACK_SLOTS = 30;  // ячейки инвентаря
