// Банк персонажа (как в WoW): у каждого свой. BANK_BASE_SLOTS ячеек сразу + BANK_BAG_SLOTS гнёзд под сумки,
// каждое покупается за изоленту (цена растёт — BANK_BAG_PRICES, в белой) и добавляет BANK_BAG_SIZE ячеек.
// В сохранении: hero.bank = { items: [], bags: куплено гнёзд }.
const BANK_BASE_SLOTS = 28;
const BANK_BAG_SLOTS = 7;
const BANK_BAG_SIZE = 12;
const BANK_BAG_PRICES = [10, 100, 1000, 10000, 50000, 150000, 250000]; // 10 белой … 25 синей
const BANK_KEEPER = { name: 'Кассир Нина Петровна', title: 'Сберкасса бункера № 13' };
const BANK_QUOTES = [
  'Вклад до востребования. Востребовать — по записи, запись — через год.',
  'Банк не несёт ответственности за радиацию, мутантов и вашу память.',
  'Под матрасом надёжнее? А матрас-то у нас и хранится.',
  'Проценты не начисляем. Зато и не списываем. Почти.'
];
const BANK_ICON = '<svg viewBox="0 0 32 32" aria-hidden="true">' +
  '<path d="M4 12 L16 4 L28 12 Z" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="2" stroke-linejoin="round"/>' +
  '<rect x="6" y="13" width="3.5" height="10" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="1.5"/>' +
  '<rect x="14.2" y="13" width="3.5" height="10" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="1.5"/>' +
  '<rect x="22.5" y="13" width="3.5" height="10" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="1.5"/>' +
  '<rect x="4" y="24" width="24" height="4" rx="1" fill="var(--ui-parchment)" stroke="var(--ui-outline)" stroke-width="2"/>' +
  '<circle cx="16" cy="9" r="2.2" fill="var(--gem-sapphire)" stroke="var(--ui-outline)" stroke-width="1"/></svg>';
