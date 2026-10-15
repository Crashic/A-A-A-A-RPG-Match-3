// Экран «Банк» (в игре — «Шкафчик»): слева — кассир, гнёзда сумок (купленные, следующее — «+» с ценой, остальные закрыты)
// и ячейки банка; справа — сумка героя и изолента. Касание по вещи перекладывает её (bankMove),
// на ПК при наведении — подсказка. Оформление — как у торговца (макет «Агитпроп»): облачко с репликой, заголовки со счётчиками.
function renderBank() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('bankLeft');
  const right = document.getElementById('bankRight');
  if (!hero) { left.innerHTML = tr("ui.<p class=\"hint\">Нет персонажа</p>"); right.innerHTML = ''; return; }
  const bank = hero.bank || { items: [], bags: 0 };
  const size = bankSize(hero);

  left.innerHTML = '<div class="shopHead"><div class="shopFace">' + BANK_ICON + '</div><div class="shopWho"><h3></h3><p class="shopQuote"></p></div></div>';
  left.querySelector('h3').textContent = BANK_KEEPER.name;
  left.querySelector('h3').dataset.tip = BANK_KEEPER.title;
  left.querySelector('.shopQuote').textContent = '«' + bankQuote + '»';

  const bagRow = document.createElement('div');
  bagRow.className = 'bankBags';
  for (let i = 0; i < BANK_BAG_SLOTS; i++) {
    const b = document.createElement('button');
    b.type = 'button';
    if (i < bank.bags) {
      b.className = 'invSlot bankBag owned';
      b.innerHTML = slotIcon('bag');
      b.dataset.tip = tr("ui.Сумка: +") + BANK_BAG_SIZE + tr("ui. ячеек");
      b.disabled = true;
    } else if (i === bank.bags) {
      b.className = 'invSlot bankBag next' + ((hero.tape || 0) < BANK_BAG_PRICES[i] ? ' poor' : '');
      b.innerHTML = '<b>+</b>';
      b.dataset.tip = tr("ui.Купить гнездо:");
      b.dataset.tipTape = BANK_BAG_PRICES[i];
      b.addEventListener('click', e => { e.stopPropagation(); vibrate(); buyBankBag(); });
    } else {
      b.className = 'invSlot bankBag locked';
      b.disabled = true;
    }
    bagRow.appendChild(b);
  }
  const title = (text, count) => {
    const p = document.createElement('p');
    p.className = 'invTitle';
    p.innerHTML = '<span></span><b></b>';
    p.firstChild.textContent = text;
    p.lastChild.textContent = count;
    return p;
  };
  const nests = title(tr("ui.Гнёзда сумок"), bank.bags + ' / ' + BANK_BAG_SLOTS);
  const head = title(BANK_NAME, bank.items.length + ' / ' + size);
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < size; i++)
    grid.appendChild(bank.items[i] ? itemSlot(bank.items[i], 'cell', () => bankMove('bank', i)) : emptySlot('cell', ''));
  left.append(nests, bagRow, head, grid);

  const bag = hero.bag || [];
  right.innerHTML = '';
  const hint = document.createElement('p');
  hint.className = 'shopSellHint';
  hint.textContent = tr("ui.Коснитесь вещи — она переедет в шкафчик и обратно");
  const bagGrid = document.createElement('div');
  bagGrid.className = 'invGrid';
  for (let i = 0, cap = bagCapacity(hero); i < cap; i++)
    bagGrid.appendChild(bag[i] ? itemSlot(bag[i], 'cell', () => bankMove('bag', i)) : emptySlot('cell', ''));
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = tr("ui.<span>Изолента</span>") + formatTape(hero.tape || 0);
  right.append(title(tr("ui.Инвентарь"), bag.length + ' / ' + bagCapacity(hero)), bagGrid, hint, money);
}
