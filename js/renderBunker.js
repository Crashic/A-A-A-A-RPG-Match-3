// Экран «Бункер»: короткое вступление и карточки мест — торговец (openShop), банк (openBank) и доска заданий
// (openQuests; если есть выполненные — кнопка «Сдать задания»).
function renderBunker() {
  const box = document.getElementById('bunkerBody');
  const hero = loadSlot(getActiveSlot());
  box.innerHTML = '<div class="panel bunkerIntro"><h3>Бункер</h3><p></p></div><div class="bunkerCards"></div>';
  box.querySelector('.bunkerIntro p').textContent = (hero ? hero.name + ', вы дома. ' : '') +
    'Тут тепло, сухо и почти не фонит. Всё ценное — на поверхности, всё нужное — у Семёныча.';
  const cards = box.querySelector('.bunkerCards');
  const card = (icon, title, text, label, cls, fn) => {
    const c = document.createElement('div');
    c.className = 'panel bunkerCard';
    c.innerHTML = '<div class="bunkerIcon">' + icon + '</div><h4></h4><p></p><button type="button" class="btn ' + cls + '"></button>';
    c.querySelector('h4').textContent = title;
    c.querySelector('p').textContent = text;
    const b = c.querySelector('button');
    b.textContent = label;
    if (fn) b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    else b.disabled = true;
    cards.appendChild(c);
  };
  card(SHOP_ICON, SHOP_TRADER.name, 'Купить, продать, сдать хлам. Ассортимент меняется, пока вы на поверхности.', 'Торговать', 'orange', openShop);
  const bank = (hero && hero.bank) || { items: [], bags: 0 };
  card(BANK_ICON, BANK_NAME, 'Личный шкафчик в раздевалке: сложить вещи, которые жалко продать. Расширяется гнёздами за изоленту.' +
    ' Занято: ' + bank.items.length + ' / ' + bankSize(hero || {}) + '.', 'Открыть', 'stone', openBank);
  const q = (hero && hero.quests) || { active: [] };
  const ready = q.active.filter(x => x.have >= x.need).length;
  card(BOARD_ICON, 'Доска объявлений', 'Задания от жителей бункера: взяли — выполнили в боях — сдали за опыт, изоленту и вещи.' +
    (q.active.length ? ' Взято: ' + q.active.length + (ready ? ', готово к сдаче: ' + ready : '') + '.' : ''), ready ? 'Сдать задания' : 'Задания', ready ? 'orange' : 'green', openQuests);
}
