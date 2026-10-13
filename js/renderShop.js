// Экран «Торговец»: слева — завхоз (имя, реплика), прилавок с ценами (касание — окно с «Купить»)
// сумки (касание — купить, buyBag) и «Завезите новое» за изоленту; справа — сумка героя (касание — «Продать» / «Надеть»),
// изолента и «Сдать хлам» (все обычные вещи разом).
function renderShop() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('shopLeft');
  const right = document.getElementById('shopRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
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
  bagsTitle.textContent = 'Сумки';
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
  // «Завезите новое»
  const foot = document.createElement('div');
  foot.className = 'shopFoot';
  const left2 = Math.max(1, SHOP_REFRESH_WINS - ((hero.wins || 0) - (hero.shop ? hero.shop.wins || 0 : 0)));
  foot.innerHTML = '<p class="shopNote"></p><button type="button" class="btn stone shopReroll"><span>Завезите новое</span></button>';
  foot.querySelector('.shopNote').textContent = 'Сам завезёт через ' + left2 + ' ' + (left2 === 1 ? 'победу' : left2 < 5 ? 'победы' : 'побед') + ' или на новом уровне';
  const reroll = foot.querySelector('button');
  reroll.insertAdjacentHTML('beforeend', formatTape(rerollPrice(hero)));
  reroll.addEventListener('click', e => { e.stopPropagation(); vibrate(); rerollShop(); });
  left.appendChild(foot);
  // сумка героя
  right.innerHTML = '<p class="invTitle">Инвентарь</p>';
  const bag = hero.bag || [];
  const bagGrid = document.createElement('div');
  bagGrid.className = 'invGrid';
  for (let i = 0, cap = bagCapacity(hero); i < cap; i++)
    bagGrid.appendChild(bag[i] ? itemSlot(bag[i], 'cell', () => openItemInfo({ bag: i, sell: true })) : emptySlot('cell', ''));
  const junk = document.createElement('button');
  junk.type = 'button';
  junk.className = 'btn orange shopJunk';
  junk.textContent = 'Сдать хлам';
  junk.dataset.tip = 'Продать все обычные вещи';
  junk.addEventListener('click', e => { e.stopPropagation(); vibrate(); sellJunk(); });
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = '<span>Изолента</span>' + formatTape(hero.tape || 0);
  right.append(bagGrid, junk, money);
}
