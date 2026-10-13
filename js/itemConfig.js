// Предметы (как в Diablo 2 / Path of Exile): редкость, выпадение, сила свойств и цена.
// affixes — сколько случайных свойств [от, до]; weight — вес при выпадении; price — множитель цены.
const ITEM_RARITIES = [
  { id: 'common', name: 'Обычный',    color: 'var(--text-muted)',          affixes: [0, 0], weight: 60, price: 1 },
  { id: 'magic',  name: 'Магический', color: 'var(--gem-sapphire-light)',  affixes: [1, 2], weight: 28, price: 3 },
  { id: 'rare',   name: 'Редкий',     color: 'var(--gem-topaz)',           affixes: [3, 4], weight: 10, price: 8 },
  { id: 'unique', name: 'Уникальный', color: 'var(--gem-ruby-light)',      affixes: null,   weight: 2,  price: 20 }
];
const ITEM_DROP_CHANCE = 0.4;      // шанс, что обычный враг оставит предмет
const ITEM_DROP_ELITE = 2;         // элита оставляет столько предметов всегда
const ITEM_ELITE_RARITY_MUL = 3;   // у элиты вес магических, редких и уникальных — во столько раз больше
const ITEM_REQ_BELOW = 2;          // требуемый уровень = уровень предмета − столько
// Слоты снаряжения в сохранении (hero.gear): у колец, оружия и рун — номер.
const GEAR_KEYS = ['head', 'shoulders', 'amulet', 'chest', 'belt', 'hands', 'ring1', 'ring2', 'legs', 'feet',
  'weapon1', 'weapon2', 'rune1', 'rune2', 'rune3', 'rune4', 'rune5'];


// Двуручное оружие: свойства ×TWO_HAND_MULT, урон Топливом — только каждый второй ваш ход (battle.skill.swingCd).
const TWO_HAND_MULT = 3;
