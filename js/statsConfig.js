// Характеристики героя (как в WoW Classic): пять основных, у каждой расы свои названия (js/statNames.js).
// Значения: база класса (js/classStats.js) + очки, которые игрок раздал сам (hero.points).
// Очков — STAT_POINTS_PER_LEVEL за каждый уровень начиная со 2-го. Перераспределять можно вне боя.
// Всё считается от 10: при 10 характеристика ничего не меняет, выше — усиливает, ниже — ослабляет.
const STATS = [
  { id: 'str', name: tr("ui.Сила"),         icon: 'fist',    color: 'var(--gem-ruby)',
    effect: tr("ui.урон Топлива и боевых навыков: +1 % за каждое очко сверх 10") },
  { id: 'agi', name: tr("ui.Ловкость"),     icon: 'compass', color: 'var(--gem-topaz)',
    effect: tr("ui.шанс критического удара ×2: 0,25 % за очко (не больше 50 %)") },
  { id: 'sta', name: tr("ui.Выносливость"), icon: 'shield',  color: 'var(--gem-emerald)',
    effect: tr("ui.здоровье: +3 за каждое очко сверх 10") },
  { id: 'int', name: tr("ui.Интеллект"),    icon: 'eye',     color: 'var(--gem-sapphire)',
    effect: tr("ui.запас каждой маны: +1 за 2 очка сверх 10; мана с фишек: +1 % за очко") },
  { id: 'spi', name: tr("ui.Дух"),          icon: 'note',    color: 'var(--gem-amethyst)',
    effect: tr("ui.щит за Детали и лечение навыками: +1 % за каждое очко сверх 10") }
];
const STAT_POINTS_PER_LEVEL = 5;   // свободных очков за уровень (с 2-го уровня; на 1-м — 0)
const STAT_BASE = 10;              // от этого значения считаются все бонусы
const STAT_STR_PCT = 1;            // % урона за очко Силы
const STAT_AGI_CRIT = 0.25;        // % крита за очко Ловкости
const STAT_CRIT_MAX = 50;          // предел шанса крита, %
const STAT_CRIT_MULT = 2;          // крит — двойной урон
const STAT_STA_HP = 3;             // здоровья за очко Выносливости
const STAT_INT_MANA_EVERY = 2;     // +1 к запасу маны за столько очков Интеллекта
const STAT_INT_PCT = 1;            // % маны с фишек за очко Интеллекта
const STAT_SPI_PCT = 1;            // % щита и лечения за очко Духа
