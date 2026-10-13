// Инвентарь в правой колонке «Персонажа»: сверху гнёзда сумок (надетые — касание открывает сумку со «Снять»,
// пустые, следующее — «+» купить гнездо (buyBagNest), остальные закрыты), ниже — ячейки (сколько дают надетые
// сумки, bagCapacity) с вещами из hero.bag (касание — окно предмета), внизу — изолента героя.
function renderInventory(box) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) { box.innerHTML = ''; return; }
  const packs = heroPacks(hero);
  const cap = bagCapacity(hero);
  const bag = hero.bag || [];
  box.innerHTML = '<p class="invTitle"></p>';
  box.firstChild.textContent = 'Инвентарь: ' + bag.length + ' / ' + cap;
  box.appendChild(bagNestRow(hero, packs));
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < Math.max(cap, bag.length); i++)
    grid.appendChild(bag[i] ? itemSlot(bag[i], 'cell', () => openItemInfo({ bag: i })) : emptySlot('cell', ''));
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = '<span>Изолента</span>' + formatTape(hero.tape || 0);
  box.append(grid, money);
}
