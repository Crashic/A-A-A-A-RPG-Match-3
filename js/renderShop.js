// Экран «Торговец»: слева — завхоз (имя, реплика), прилавок с ценами (касание — окно с «Купить»)
// сумки (касание — купить, buyBag) и «Завезите новое» за изоленту; справа — сумка героя (касание — «Продать» / «Надеть»),
// изолента и «Сдать хлам» (все обычные вещи разом).
function renderShop() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('shopLeft');
  const right = document.getElementById('shopRight');
  if (!hero) { left.innerHTML = tr("ui.<p class=\"hint\">Нет персонажа</p>"); right.innerHTML = ''; return; }
  const stock = (hero.shop && hero.shop.items) || [];
  // завхоз
  left.innerHTML = '<div class="shopHead"><div class="shopFace">' + SHOP_ICON + '</div><div><h3></h3><p class="shopTitle"></p></div></div><p class="shopQuote"></p>';
  left.querySelector('h3').textContent = SHOP_TRADER.name;
  left.querySelector('.shopTitle').textContent = SHOP_TRADER.title;
  left.querySelector('.shopQuote').textContent = '«' + shopQuote + '»';
  // прилавок
  const grid = document.createElement('div');
  grid.className = 'shopStock';
  for (let i = 0; i < SHOP_STOCK_SIZE; i++) {
    const cell = document.createElement('div');
    cell.className = 'shopItem';
    if (stock[i]) {
      cell.appendChild(itemSlot(stock[i], 'cell', () => openItemInfo({ shop: i })));
      const price = document.createElement('div');
      price.className = 'shopPrice' + ((hero.tape || 0) < buyPrice(stock[i]) ? ' poor' : '');
      price.innerHTML = formatTape(buyPrice(stock[i]));
      cell.appendChild(price);
    } else cell.appendChild(emptySlot('cell', ''));
    grid.appendChild(cell);
  }
  left.appendChild(grid);
  // сумки — всегда в продаже (BAG_TYPES), касание — купить
  const bagsTitle = document.createElement('p');
  bagsTitle.className = 'invTitle';
  bagsTitle.textContent = tr("ui.Сумки");
  const bags = document.createElement('div');
  bags.className = 'shopStock shopBags';
  for (const t of BAG_TYPES.filter(b => b.price > 0)) {
    const cell = document.createElement('div');
    cell.className = 'shopItem';
    const s = itemSlot(makeBag(t.id), 'cell', () => buyBag(t.id));
    s.insertAdjacentHTML('beforeend', '<small class="bagSize">' + t.size + '</small>');
    cell.appendChild(s);
    const price = document.createElement('div');
    price.className = 'shopPrice' + ((hero.tape || 0) < t.price ? ' poor' : '');
    price.innerHTML = formatTape(t.price);
    cell.appendChild(price);
    bags.appendChild(cell);
  }
  left.append(bagsTitle, bags);
  // особый заказ сюжета: квестовые предметы, которые герой должен купить (storyShopOffer)
  const offer = storyShopOffer(hero);
  if (offer.length) {
    const t = document.createElement('p');
    t.className = 'invTitle';
    t.textContent = tr("ui.Особый заказ");
    const g = document.createElement('div');
    g.className = 'shopStock shopQuest';
    for (const q of offer) {
      const cell = document.createElement('div');
      cell.className = 'shopItem';
      const s = questItemCell(q);
      s.addEventListener('click', e => { e.stopPropagation(); vibrate(); openQuestItemInfo(q.id); }); // окно с описанием и «Купить», как у любой покупки
      cell.appendChild(s);
      const price = document.createElement('div');
      price.className = 'shopPrice' + ((hero.tape || 0) < q.price ? ' poor' : '');
      price.innerHTML = formatTape(q.price);
      cell.appendChild(price);
      g.appendChild(cell);
    }
    left.append(t, g);
  }
  // «Завезите новое»
  const foot = document.createElement('div');
  foot.className = 'shopFoot';
  const left2 = Math.max(1, SHOP_REFRESH_WINS - ((hero.wins || 0) - (hero.shop ? hero.shop.wins || 0 : 0)));
  foot.innerHTML = tr("ui.<p class=\"shopNote\"></p><button type=\"button\" class=\"btn stone shopReroll\"><span>Завезите новое</span></button>");
  foot.querySelector('.shopNote').textContent = tr("ui.Сам завезёт через ") + left2 + ' ' + (left2 === 1 ? tr("ui.победу") : left2 < 5 ? tr("ui.победы") : tr("ui.побед")) + tr("ui. или на новом уровне");
  const reroll = foot.querySelector('button');
  reroll.insertAdjacentHTML('beforeend', formatTape(rerollPrice(hero)));
  reroll.addEventListener('click', e => { e.stopPropagation(); vibrate(); rerollShop(); });
  left.appendChild(foot);
  // сумка героя
  right.innerHTML = tr("ui.<p class=\"invTitle\">Инвентарь</p>");
  const bag = hero.bag || [];
  const bagGrid = document.createElement('div');
  bagGrid.className = 'invGrid';
  for (let i = 0, cap = bagCapacity(hero); i < cap; i++)
    bagGrid.appendChild(bag[i] ? bagSlotFor(bag[i], 'shop', () => openItemInfo({ bag: i, sell: true }), renderShop) : emptySlot('cell', ''));
  const junk = document.createElement('button');
  junk.type = 'button';
  junk.className = 'btn orange shopJunk';
  junk.textContent = tr("ui.Сдать хлам");
  junk.dataset.tip = tr("ui.Продать все обычные вещи");
  junk.addEventListener('click', e => { e.stopPropagation(); vibrate(); sellJunk(); });
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = tr("ui.<span>Изолента</span>") + formatTape(hero.tape || 0);
  right.append(bagGrid, bagSelectBar(hero, 'shop', 'sell', renderShop), junk, money);
}
