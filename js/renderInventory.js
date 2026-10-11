// Инвентарь в правой колонке «Персонажа»: сверху 6 тёмных слотов для сумок и слот «+»,
// ниже — ячейки инвентаря (BACKPACK_SLOTS). Предметов пока нет.
function renderInventory(box) {
  box.innerHTML = '<p class="invTitle">Инвентарь</p>';
  const bags = document.createElement('div');
  bags.className = 'bagSlots';
  for (let i = 0; i < BAG_SLOTS; i++) bags.appendChild(emptySlot('bag', 'Слот для сумки. Сумки найдутся позже — в пустошах они на вес изоленты.'));
  const plus = document.createElement('button');
  plus.type = 'button';
  plus.className = 'slot bag plus';
  plus.textContent = '+';
  plus.setAttribute('aria-label', 'Добавить слот для сумки');
  plus.dataset.tip = 'Ещё слот для сумки — позже';
  plus.addEventListener('click', e => { e.stopPropagation(); vibrate(); showToast('Дополнительные слоты для сумок — позже', 1500); });
  bags.appendChild(plus);
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < BACKPACK_SLOTS; i++) grid.appendChild(emptySlot('cell', ''));
  box.append(bags, grid);
}
