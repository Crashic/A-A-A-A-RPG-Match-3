// Экран «Бункер» (макет «Агитпроп»): три карточки в золотых рамках — торговец (openShop), шкафчик (openBank)
// и доска объявлений (openQuests). У карточки: большая иконка, название, подпись, кремовая записка с цитатой
// и строкой состояния, зелёная кнопка. Есть выполненные задания — красный кружок с числом на доске.
function renderBunker() {
  const box = document.getElementById('bunkerBody');
  const hero = loadSlot(getActiveSlot());
  box.innerHTML = '<div class="bunkerCards"></div>';
  const cards = box.querySelector('.bunkerCards');
  const card = (o) => {
    const c = document.createElement('div');
    c.className = 'panel bunkerCard';
    c.dataset.card = o.id;
    c.innerHTML = (o.badge ? '<b class="bunkerBadge"></b>' : '') + '<div class="bunkerIcon">' + o.icon + '</div><h4></h4><small class="bunkerSub"></small>' +
      '<div class="paper bunkerNote"><p></p><span></span></div><button type="button" class="btn green"></button>';
    if (o.badge) c.querySelector('.bunkerBadge').textContent = o.badge;
    c.querySelector('h4').textContent = o.title;
    c.querySelector('.bunkerSub').textContent = o.sub;
    c.querySelector('.bunkerNote p').textContent = '«' + o.quote + '»';
    c.querySelector('.bunkerNote span').textContent = o.status;
    const b = c.querySelector('button');
    b.textContent = o.label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); o.fn(); });
    cards.appendChild(c);
  };
  const s = (hero && hero.shop) || {};
  const left = Math.max(1, SHOP_REFRESH_WINS - ((hero && hero.wins || 0) - (s.wins || 0)));
  card({ id: 'shop', icon: SHOP_ICON, title: SHOP_TRADER.name, sub: tr('ui.торговля и сумки'), quote: SHOP_QUOTES[0],
    status: tr('ui.Прилавок обновится через') + ' ' + left + ' ' + plural(left, tr('ui.победу'), tr('ui.победы'), tr('ui.побед')),
    label: tr('ui.Торговать'), fn: openShop });
  const bank = (hero && hero.bank) || { items: [], bags: 0 };
  card({ id: 'bank', icon: BANK_ICON, title: BANK_NAME, sub: tr('ui.личное хранилище'), quote: BANK_QUOTES[0],
    status: tr('ui.Занято') + ' ' + bank.items.length + ' / ' + bankSize(hero || {}), label: tr('ui.Открыть'), fn: openBank });
  const q = (hero && hero.quests) || { active: [] };
  const ready = q.active.filter(x => x.have >= x.need).length;
  card({ id: 'board', icon: BOARD_ICON, title: tr('ui.Доска объявлений'), sub: tr('ui.задания от жильцов'),
    quote: tr('ui.Требуется: герой. Оплата: изолентой. Каска своя.'),
    status: ready ? tr('ui.Готово к сдаче:') + ' ' + ready : tr('ui.Взято заданий:') + ' ' + q.active.length,
    label: ready ? tr('ui.Сдать задания') : tr('ui.Смотреть'), fn: openQuests, badge: ready || 0 });
  updateFeatureLocks(hero);
}
