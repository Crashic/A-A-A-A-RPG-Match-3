// Предметы (как в Diablo 2 / Path of Exile): редкость, выпадение, сила свойств и цена.
// affixes — сколько случайных свойств [от, до]; weight — вес при выпадении; price — множитель цены.
// power — множитель силы свойств: с редкого и выше каждая следующая редкость ×2 к предыдущей,
// а выпадает в разы реже (weight). junk — хлам: только на продажу (не выпадает через rollRarity).
const ITEM_RARITIES = [
  { id: 'common', name: tr("ui.Обычный"),    color: 'var(--text-primary)',          affixes: [0, 0], weight: 66,  power: 1, price: 1 },
  { id: 'magic',  name: tr("ui.Магический"), color: 'var(--gem-sapphire-light)',  affixes: [1, 2], weight: 28,  power: 1, price: 3 },
  { id: 'rare',   name: tr("ui.Редкий"),     color: 'var(--gem-topaz)',           affixes: [3, 4], weight: 5,   power: 2, price: 10 },
  { id: 'unique', name: tr("ui.Уникальный"), color: 'var(--gem-ruby-light)',      affixes: null,   weight: 0.6, power: 4, price: 40 },
  { id: 'junk',   name: tr("ui.Хлам"),       color: 'var(--ui-metal)',            affixes: [0, 0], weight: 0,   power: 1, price: 1 }
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
  { id: 'can',     name: tr("ui.Мятая консервная банка"), price: 4,  lore: tr("ui.Пустая. Кто-то успел раньше вас.") },
  { id: 'gasmask', name: tr("ui.Противогаз без фильтра"), price: 9,  lore: tr("ui.Защищает от всего, кроме радиации, газа и дыма.") },
  { id: 'medal',   name: tr("ui.Значок «Ударник труда»"), price: 12, lore: tr("ui.Ударил по труду — получил значок.") },
  { id: 'phone',   name: tr("ui.Дисковый телефон"),       price: 15, lore: tr("ui.Звонит только в прошлое.") },
  { id: 'kettle',  name: tr("ui.Чайник со свистком"),     price: 7,  lore: tr("ui.Свистит. Не кипит. Просто свистит.") },
  { id: 'records', name: tr("ui.Пачка пластинок «Мелодия»"), price: 18, lore: tr("ui.Песни о главном. Главное — что-то поцарапано.") }
];
const RESOURCE_DROP_CHANCE = 0.6;  // шанс, что враг оставит ресурсы (1–3 единицы, элита — ×2)
const RESOURCES = [
  { id: 'scrap',   name: tr("ui.Металлолом"),    color: 'var(--gem-sapphire)',   icon: 'girder' },
  { id: 'wire',    name: tr("ui.Провода"),       color: 'var(--gem-amethyst)',   icon: 'cassette' },
  { id: 'cloth',   name: tr("ui.Ветошь"),        color: 'var(--gem-pearl)',      icon: 'ticket' },
  { id: 'plastic', name: tr("ui.Пластик"),       color: 'var(--gem-aquamarine)', icon: 'gear' },
  { id: 'chips',   name: tr("ui.Микросхемы"),    color: 'var(--gem-emerald)',    icon: 'leaf' },
  { id: 'concrete',name: tr("ui.Бетонная крошка"), color: 'var(--gem-topaz)',    icon: 'radiation' }
];
