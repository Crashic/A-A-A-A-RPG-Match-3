// Инвентарь в правой колонке «Персонажа»: сверху слот для сумки и «+» (шуточная «оплата» — openPayJoke),
// ниже — ячейки инвентаря (BACKPACK_SLOTS), внизу — изолента героя. Предметов пока нет.
function renderInventory(box) {
  box.innerHTML = '<p class="invTitle">Инвентарь</p>';
  const bags = document.createElement('div');
  bags.className = 'bagSlots';
  for (let i = 0; i < BAG_SLOTS; i++) bags.appendChild(emptySlot('bag', 'Слот для сумки. Сумки найдутся позже — в пустошах они на вес изоленты.'));
  const plus = document.createElement('button');
  plus.type = 'button';
  plus.className = 'invSlot bag plus';
  plus.textContent = '+';
  plus.setAttribute('aria-label', 'Добавить слот для сумки');
  plus.dataset.tip = 'Ещё слот для сумки';
  plus.addEventListener('click', e => { e.stopPropagation(); vibrate(); openPayJoke(); }); // шуточная «оплата»
  bags.appendChild(plus);
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < BACKPACK_SLOTS; i++) grid.appendChild(emptySlot('cell', ''));
  // внизу — сколько изоленты у героя
  const money = document.createElement('div');
  money.className = 'invTape';
  const hero = loadSlot(getActiveSlot());
  money.innerHTML = '<span>Изолента</span>' + formatTape(hero ? hero.tape : 0);
  box.append(bags, grid, money);
}
