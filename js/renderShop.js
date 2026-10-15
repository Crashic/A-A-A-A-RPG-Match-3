// Экран «Торговец» (макет «Агитпроп»): слева — завхоз (иконка, имя, реплика в облачке), вкладки «Прилавок / Сумки /
// Особый заказ» (shopTab; особый заказ — только если его ждёт сюжет, тогда он открыт первым), карточки товаров в рамке
// цвета редкости с ценой на кремовой плашке (касание — окно с «Купить» / купить сумку) и «Завезите новое» справа от вкладок;
// справа — сумка героя (касание — «Продать» / «Надеть»), «Сдать хлам» (все обычные вещи разом) и изолента.
function renderShop() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('shopLeft');
  const right = document.getElementById('shopRight');
  if (!hero) { left.innerHTML = tr("ui.<p class=\"hint\">Нет персонажа</p>"); right.innerHTML = ''; return; }
  const stock = (hero.shop && hero.shop.items) || [];
  const offer = storyShopOffer(hero);
  if (!shopTab || (shopTab === 'quest' && !offer.length)) shopTab = offer.length ? 'quest' : 'stock';
  // завхоз
  left.innerHTML = '<div class="shopHead"><div class="shopFace">' + SHOP_ICON + '</div><div class="shopWho"><h3></h3><p class="shopQuote"></p></div></div>';
  left.querySelector('h3').textContent = SHOP_TRADER.name;
  left.querySelector('.shopQuote').textContent = '«' + shopQuote + '»';
  // вкладки
  const tabs = document.createElement('div');
  tabs.className = 'shopTabs';
  const tabList = [['stock', tr("ui.Прилавок")], ['bags', tr("ui.Сумки")]];
  if (offer.length) tabList.push(['quest', tr("ui.Особый заказ")]);
  for (const [id, label] of tabList) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'shopTab' + (shopTab === id ? ' active' : '');
    b.textContent = label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); shopTab = id; renderShop(); });
    tabs.appendChild(b);
  }
  left.appendChild(tabs);
  const grid = document.createElement('div');
  grid.className = 'shopStock' + (shopTab === 'bags' ? ' shopBags' : shopTab === 'quest' ? ' shopQuest' : '');
  const addCell = (slot, price, rarity) => {
    const cell = document.createElement('div');
    cell.className = 'shopItem' + (rarity ? ' r-' + rarity : '');
    cell.appendChild(slot);
    if (price != null) {
      const p = document.createElement('div');
      p.className = 'shopPrice' + ((hero.tape || 0) < price ? ' poor' : '');
      p.innerHTML = formatTape(price);
      cell.appendChild(p);
    }
    grid.appendChild(cell);
  };
  if (shopTab === 'stock') {
    for (let i = 0; i < SHOP_STOCK_SIZE; i++) {
      if (stock[i]) addCell(itemSlot(stock[i], 'cell', () => openItemInfo({ shop: i })), buyPrice(stock[i]), stock[i].rarity);
      else addCell(emptySlot('cell', ''), null, 'empty');
    }
  } else if (shopTab === 'bags') {
    for (const t of BAG_TYPES.filter(b => b.price > 0)) {
      const s = itemSlot(makeBag(t.id), 'cell', () => buyBag(t.id));
      s.insertAdjacentHTML('beforeend', '<small class="bagSize">' + t.size + '</small>');
      addCell(s, t.price, 'common');
    }
  } else {
    for (const q of offer) {
      const s = questItemCell(q);
      s.addEventListener('click', e => { e.stopPropagation(); vibrate(); openQuestItemInfo(q.id); }); // окно с описанием и «Купить»
      addCell(s, q.price, 'quest');
    }
  }
  left.appendChild(grid);
  // «Завезите новое» — справа в ряду вкладок; когда завезёт сам — в подсказке
  const left2 = Math.max(1, SHOP_REFRESH_WINS - ((hero.wins || 0) - (hero.shop ? hero.shop.wins || 0 : 0)));
  const reroll = document.createElement('button');
  reroll.type = 'button';
  reroll.className = 'btn blue shopReroll';
  reroll.innerHTML = '<span></span><span class="priceChip">' + formatTape(rerollPrice(hero)) + '</span>';
  reroll.firstChild.textContent = tr("ui.Завезите новое");
  reroll.dataset.tip = tr("ui.Сам завезёт через ") + left2 + ' ' + plural(left2, tr("ui.победу"), tr("ui.победы"), tr("ui.побед")) + tr("ui. или на новом уровне");
  reroll.addEventListener('click', e => { e.stopPropagation(); vibrate(); rerollShop(); });
  tabs.appendChild(reroll);
  // сумка героя
  right.innerHTML = '';
  const title = document.createElement('p');
  title.className = 'invTitle';
  title.innerHTML = '<span></span><b></b>';
  const bag = hero.bag || [];
  const cap = bagCapacity(hero);
  title.firstChild.textContent = tr("ui.Инвентарь");
  title.lastChild.textContent = bag.length + ' / ' + cap;
  const bagGrid = document.createElement('div');
  bagGrid.className = 'invGrid';
  for (let i = 0; i < cap; i++)
    bagGrid.appendChild(bag[i] ? bagSlotFor(bag[i], 'shop', () => openItemInfo({ bag: i, sell: true }), renderShop) : emptySlot('cell', ''));
  const hint = document.createElement('p');
  hint.className = 'shopSellHint';
  hint.textContent = tr("ui.Коснитесь вещи, чтобы продать");
  const junk = document.createElement('button');
  junk.type = 'button';
  junk.className = 'btn red shopJunk';
  junk.textContent = tr("ui.Сдать хлам");
  junk.dataset.tip = tr("ui.Продать все обычные вещи");
  junk.addEventListener('click', e => { e.stopPropagation(); vibrate(); sellJunk(); });
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = tr("ui.<span>Изолента</span>") + formatTape(hero.tape || 0);
  right.append(title, bagGrid, hint, bagSelectBar(hero, 'shop', 'sell', renderShop), junk, money);
}
