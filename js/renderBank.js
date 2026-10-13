// Экран «Банк»: слева — кассир, гнёзда сумок (купленные, следующее — «+» с ценой, остальные закрыты)
// и ячейки банка; справа — сумка героя и изолента. Касание по вещи перекладывает её (bankMove),
// на ПК при наведении — подсказка.
function renderBank() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('bankLeft');
  const right = document.getElementById('bankRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
  const bank = hero.bank || { items: [], bags: 0 };
  const size = bankSize(hero);

  left.innerHTML = '<div class="shopHead"><div class="shopFace">' + BANK_ICON + '</div><div><h3></h3><p class="shopTitle"></p></div></div><p class="shopQuote"></p>';
  left.querySelector('h3').textContent = BANK_KEEPER.name;
  left.querySelector('.shopTitle').textContent = BANK_KEEPER.title;
  left.querySelector('.shopQuote').textContent = '«' + bankQuote + '»';

  const bagRow = document.createElement('div');
  bagRow.className = 'bankBags';
  for (let i = 0; i < BANK_BAG_SLOTS; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    if (i < bank.bags) {
      b.className = 'invSlot bankBag owned';
      b.innerHTML = slotIcon('bag');
      b.dataset.tip = 'Сумка: +' + BANK_BAG_SIZE + ' ячеек';
      b.disabled = true;
    } else if (i === bank.bags) {
      b.className = 'invSlot bankBag next' + ((hero.tape || 0) < BANK_BAG_PRICES[i] ? ' poor' : '');
      b.innerHTML = '<b>+</b>';
      b.dataset.tip = 'Купить гнездо: ' + tapeText(BANK_BAG_PRICES[i]);
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); buyBankBag(); });
    } else {
      b.className = 'invSlot bankBag locked';
      b.disabled = true;
    }
    bagRow.appendChild(b);
  }
  const head = document.createElement('p');
  head.className = 'invTitle';
  head.textContent = 'Банк: ' + bank.items.length + ' / ' + size;
  const next = document.createElement('p');
  next.className = 'shopNote';
  next.innerHTML = bank.bags < BANK_BAG_SLOTS ? 'Следующая сумка: ' + formatTape(BANK_BAG_PRICES[bank.bags]) : 'Все сумки куплены. Вы олигарх.';
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < size; i++)
    grid.appendChild(bank.items[i] ? itemSlot(bank.items[i], 'cell', () => bankMove('bank', i)) : emptySlot('cell', ''));
  left.append(head, bagRow, next, grid);

  right.innerHTML = '<p class="invTitle">Ваша сумка</p><p class="shopNote">Коснитесь вещи — она переедет в банк и обратно</p>';
  const bag = hero.bag || [];
  const bagGrid = document.createElement('div');
  bagGrid.className = 'invGrid';
  for (let i = 0; i < BACKPACK_SLOTS; i++)
    bagGrid.appendChild(bag[i] ? itemSlot(bag[i], 'cell', () => bankMove('bag', i)) : emptySlot('cell', ''));
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = '<span>Изолента</span>' + formatTape(hero.tape || 0);
  right.append(bagGrid, money);
}
