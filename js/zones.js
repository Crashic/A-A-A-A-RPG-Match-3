// Карта врагов: зоны с диапазоном уровней, как в World of Warcraft.
// Враг: id, name, level, hp/atk — множители характеристик, elite — элита (сильнее, опыт ×2).
const ZONES = [
  { id: 'meadow', name: 'Сонная опушка', min: 1, max: 10, enemies: [
    { id: 'rat',      name: 'Полевая крыса',     level: 1,  hp: 0.8, atk: 0.8 },
    { id: 'wolf',     name: 'Худой волк',        level: 3,  hp: 0.9, atk: 1.0 },
    { id: 'kobold',   name: 'Кобольд-свечник',   level: 6,  hp: 1.0, atk: 1.0 },
    { id: 'hogger',   name: 'Хрюггер',           level: 10, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'swamp', name: 'Болота Жмурлогов', min: 10, max: 20, enemies: [
    { id: 'murloc',   name: 'Жмурлог-рыбак',     level: 11, hp: 0.9, atk: 1.0 },
    { id: 'bogbeast', name: 'Болотная тварь',    level: 14, hp: 1.2, atk: 0.9 },
    { id: 'witch',    name: 'Трясинная ведьма',  level: 17, hp: 0.9, atk: 1.2 },
    { id: 'murlking', name: 'Король Жмурлогов',  level: 20, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'hills', name: 'Пыльные холмы', min: 20, max: 30, enemies: [
    { id: 'vulture',  name: 'Стервятник',        level: 21, hp: 0.8, atk: 1.1 },
    { id: 'gnoll',    name: 'Гнолл-грабитель',   level: 24, hp: 1.0, atk: 1.0 },
    { id: 'ogre',     name: 'Огр-дубина',        level: 27, hp: 1.3, atk: 1.0 },
    { id: 'ogrechief',name: 'Вождь огров',       level: 30, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'woods', name: 'Гнилой лес', min: 30, max: 40, enemies: [
    { id: 'worgen',   name: 'Ворген',            level: 32, hp: 1.0, atk: 1.1 },
    { id: 'spider',   name: 'Паучиха',           level: 35, hp: 0.9, atk: 1.1 },
    { id: 'necro',    name: 'Некромант',         level: 37, hp: 0.8, atk: 1.3 },
    { id: 'rotent',   name: 'Древень-гнилец',    level: 40, hp: 1.1, atk: 0.9, elite: true }
  ] },
  { id: 'mines', name: 'Огненные копи', min: 40, max: 50, enemies: [
    { id: 'imp',      name: 'Огненный бес',      level: 42, hp: 0.8, atk: 1.2 },
    { id: 'golem',    name: 'Каменный голем',    level: 45, hp: 1.4, atk: 0.9 },
    { id: 'darkdwarf',name: 'Тёмный жварф',      level: 47, hp: 1.0, atk: 1.1 },
    { id: 'firelord', name: 'Повелитель огня',   level: 50, hp: 1.0, atk: 1.0, elite: true }
  ] },
  { id: 'pass', name: 'Ледяной перевал', min: 50, max: 55, enemies: [
    { id: 'wendigo',  name: 'Вендиго',           level: 51, hp: 1.1, atk: 1.0 },
    { id: 'harpy',    name: 'Ледяная гарпия',    level: 52, hp: 0.8, atk: 1.2 },
    { id: 'frostmage',name: 'Морозный колдун',   level: 54, hp: 0.9, atk: 1.2 },
    { id: 'giant',    name: 'Морозный великан',  level: 55, hp: 1.1, atk: 1.0, elite: true }
  ] },
  { id: 'abyss', name: 'Цитадель Бездны', min: 55, max: 60, enemies: [
    { id: 'guard',    name: 'Демон-страж',       level: 56, hp: 1.1, atk: 1.0 },
    { id: 'shade',    name: 'Тень Бездны',       level: 58, hp: 0.8, atk: 1.3 },
    { id: 'abyssknight', name: 'Рыцарь Бездны',  level: 59, hp: 1.2, atk: 1.1 },
    { id: 'abysslord',name: 'Владыка Бездны',    level: 60, hp: 1.1, atk: 1.1, elite: true }
  ] }
];
