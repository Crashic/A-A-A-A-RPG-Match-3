// Лагерь — общий для всего аккаунта (всех персонажей). Открывается после цепочки заданий (придумаем позже),
// пока выдаётся сразу: CAMP_FREE_UNLOCK. Постройка с open — работает, без — заглушка «скоро».
const CAMP_FREE_UNLOCK = true;
const CAMP_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true">' +
  '<path d="M3 26 L14 6 L25 26 Z" fill="var(--gem-emerald)" stroke="var(--ui-outline)" stroke-width="2" stroke-linejoin="round"/>' +
  '<path d="M14 6 L10 26 M14 6 L18 26" stroke="var(--gem-emerald-dark)" stroke-width="1.5"/>' +
  '<path d="M11 26 L14 17 L17 26 Z" fill="var(--ui-outline)"/>' +
  '<path d="M26 27 Q22 23 25 19 Q26 22 27.5 21 Q30 24 26 27 Z" fill="var(--gem-ruby)" stroke="var(--ui-outline)" stroke-width="1.2" stroke-linejoin="round"/>' +
  '<path d="M26 26.5 Q24.5 24.5 26 23 Q27.5 24.5 26 26.5 Z" fill="var(--gem-topaz)"/>' +
  '<path d="M2 28 L30 28" stroke="var(--ui-outline)" stroke-width="2" stroke-linecap="round"/></svg>';
const CAMP_TEXT = 'Общий лагерь всех ваших выживших. Разбит на пустыре между двумя воронками — место тихое, ' +
  'если не считать воронок. Всё, что здесь построено, достаётся каждому вашему персонажу.';
const CAMP_BUILDINGS = [
  { id: 'storage',  name: 'Общий склад',     icon: 'key',     color: 'var(--gem-sapphire)',
    text: 'Сарай с амбарным замком. Сюда все ваши персонажи складывают вещи и изоленту друг для друга. Ключ потерян, замок для красоты.',
    open: () => openStash(), unlocked: () => stashUnlocked() },
  { id: 'workshop', name: 'Мастерская',      icon: 'wrench',  color: 'var(--gem-aquamarine)',
    text: 'Верстак, тиски и банка с непонятными болтами. Будет чинить и улучшать снаряжение. Когда найдётся второй тиск.' },
  { id: 'fire',     name: 'Костёр',          icon: 'tree',    color: 'var(--gem-ruby)',
    text: 'Место отдыха и баек у огня. Даст бонус отдохнувшим. Пока греет только руки и самолюбие.' },
  { id: 'garden',   name: 'Огород',          icon: 'bush',    color: 'var(--gem-emerald)',
    text: 'Шесть соток мутировавшей картошки. Будет давать травы. Картошка пока растёт сама и смотрит на вас.' },
  { id: 'radio',    name: 'Радиоточка',      icon: 'mic',     color: 'var(--gem-amethyst)',
    text: 'Ловит одну волну: «Говорит Крэшляндия». Будет приносить новости и задания. Сейчас приносит только помехи.' },
  { id: 'still',    name: 'Самогонный цех',  icon: 'flask',   color: 'var(--gem-topaz)',
    text: 'Стратегический объект. Назначение засекречено, запах — нет.' }
];
// Общий склад лагеря: обмен вещами и изолентой между персонажами аккаунта.
// Откроется после задания (придумаем позже, его финал вызовет unlockStash); пока — сразу.
const STASH_FREE_UNLOCK = true;
const STASH_SLOTS = 40;
