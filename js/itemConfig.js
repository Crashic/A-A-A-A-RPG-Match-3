// Предметы (как в Diablo 2 / Path of Exile): редкость, выпадение, сила свойств и цена.
// affixes — сколько случайных свойств [от, до]; weight — вес при выпадении; price — множитель цены.
// power — множитель силы свойств: с редкого и выше каждая следующая редкость ×2 к предыдущей,
// а выпадает в разы реже (weight). junk — хлам: только на продажу (не выпадает через rollRarity).
const ITEM_RARITIES = [
  { id: 'common', name: 'Обычный',    color: 'var(--text-primary)',          affixes: [0, 0], weight: 66,  power: 1, price: 1 },
  { id: 'magic',  name: 'Магический', color: 'var(--gem-sapphire-light)',  affixes: [1, 2], weight: 28,  power: 1, price: 3 },
  { id: 'rare',   name: 'Редкий',     color: 'var(--gem-topaz)',           affixes: [3, 4], weight: 5,   power: 2, price: 10 },
  { id: 'unique', name: 'Уникальный', color: 'var(--gem-ruby-light)',      affixes: null,   weight: 0.6, power: 4, price: 40 },
  { id: 'junk',   name: 'Хлам',       color: 'var(--ui-metal)',            affixes: [0, 0], weight: 0,   power: 1, price: 1 }
];
const ITEM_DROP_CHANCE = 0.2;      // шанс, что обычный враг оставит предмет (было 0.4 — в 2 раза реже)
const ITEM_DROP_ELITE = 1;         // элита оставляет столько предметов всегда (было 2)
const ITEM_ELITE_RARITY_MUL = 3;   // у элиты вес магических, редких и уникальных — во столько раз больше
const ITEM_REQ_BELOW = 2;          // требуемый уровень = уровень предмета − столько
// Слоты снаряжения в сохранении (hero.gear): у колец, оружия и рун — номер.
const GEAR_KEYS = ['head', 'shoulders', 'amulet', 'chest', 'belt', 'hands', 'ring1', 'ring2', 'legs', 'feet',
  'weapon1', 'weapon2', 'rune1', 'rune2', 'rune3', 'rune4', 'rune5'];


// Двуручное оружие: свойства ×TWO_HAND_MULT, урон Топливом — только каждый второй ваш ход (battle.skill.swingCd).
const TWO_HAND_MULT = 3;

// Хлам (только на продажу, цвет «Хлам») и ресурсы (для лагеря и будущего крафта, общие для аккаунта).
const JUNK_DROP_CHANCE = 0.45;     // шанс, что враг оставит хлам
const JUNK_ITEMS = [
  { id: 'can',     name: 'Мятая консервная банка', price: 4,  lore: 'Пустая. Кто-то успел раньше вас.' },
  { id: 'gasmask', name: 'Противогаз без фильтра', price: 9,  lore: 'Защищает от всего, кроме радиации, газа и дыма.' },
  { id: 'medal',   name: 'Значок «Ударник труда»', price: 12, lore: 'Ударил по труду — получил значок.' },
  { id: 'phone',   name: 'Дисковый телефон',       price: 15, lore: 'Звонит только в прошлое.' },
  { id: 'kettle',  name: 'Чайник со свистком',     price: 7,  lore: 'Свистит. Не кипит. Просто свистит.' },
  { id: 'records', name: 'Пачка пластинок «Мелодия»', price: 18, lore: 'Песни о главном. Главное — что-то поцарапано.' }
];
const RESOURCE_DROP_CHANCE = 0.6;  // шанс, что враг оставит ресурсы (1–3 единицы, элита — ×2)
const RESOURCES = [
  { id: 'scrap',   name: 'Металлолом',    color: 'var(--gem-sapphire)',   icon: 'girder' },
  { id: 'wire',    name: 'Провода',       color: 'var(--gem-amethyst)',   icon: 'cassette' },
  { id: 'cloth',   name: 'Ветошь',        color: 'var(--gem-pearl)',      icon: 'ticket' },
  { id: 'plastic', name: 'Пластик',       color: 'var(--gem-aquamarine)', icon: 'gear' },
  { id: 'chips',   name: 'Микросхемы',    color: 'var(--gem-emerald)',    icon: 'leaf' },
  { id: 'concrete',name: 'Бетонная крошка', color: 'var(--gem-topaz)',    icon: 'radiation' }
];
