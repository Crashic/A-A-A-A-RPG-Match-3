// Экран «Бункер»: короткое вступление и карточки мест — торговец (openShop) и доска заданий
// (задания появятся в следующей версии — карточка пока неактивна).
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
  card(BOARD_ICON, 'Доска объявлений', 'Задания от жителей бункера. Бумагу уже повесили, задания пишут.', 'Скоро', 'stone', null);
}
