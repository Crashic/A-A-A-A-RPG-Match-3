// Бой по образцу Puzzle Quest: игрок и враг ходят по очереди на общем поле,
// собранные фишки дают эффект тому, кто ходил. 4+ в ряд — ещё один ход.
// Что даёт каждая фишка (id из GEM_TYPES):
const GEM_EFFECTS = {
  ruby:       { kind: 'damage', label: 'Урон' },
  amethyst:   { kind: 'xp',     label: 'Опыт' },
  pearl:      { kind: 'shield', label: 'Щит' },
  topaz:      { kind: 'gold',   label: 'Золото' },
  sapphire:   { kind: 'mana',   label: 'Мана' },
  emerald:    { kind: 'mana',   label: 'Мана' },
  aquamarine: { kind: 'mana',   label: 'Мана' }
};
const MANA_COLORS = ['sapphire', 'emerald', 'aquamarine']; // три маны под будущие заклинания

const EXTRA_TURN_RUN = 4;        // ряд из 4+ — ход повторяется
const ENEMY_THINK_MS = 700;      // пауза перед ходом врага
const ENEMY_SHOW_MS = 450;       // сколько показывать выбранную врагом фишку

// Характеристики от уровня (combatStats); у врагов — множители hp/atk из js/zones.js
const STAT_HP_BASE = 80;         // здоровье на 1 уровне
const STAT_HP_PER_LEVEL = 20;
const STAT_ATK_BASE = 3;         // урон за один рубин на 1 уровне
const STAT_ATK_PER_LEVEL = 0.75;
const SHIELD_PER_ATK = 0.6;      // щит за жемчужину — доля от урона
const SHIELD_MAX_SHARE = 0.25;   // щит не больше четверти здоровья
const MANA_MAX = 30;             // запас каждой маны
const ELITE_HP = 1.8;            // элита: здоровье ×1.8, урон ×1.2, опыт ×2 (как в WoW)
const ELITE_ATK = 1.2;
