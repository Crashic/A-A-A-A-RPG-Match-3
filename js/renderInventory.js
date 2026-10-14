// Инвентарь в правой колонке «Персонажа»: сверху гнёзда сумок (надетые — касание открывает сумку со «Снять»,
// пустые, следующее — «+» купить гнездо (buyBagNest), остальные закрыты), ниже — ячейки (сколько дают надетые
// сумки, bagCapacity) с вещами из hero.bag (касание — окно предмета), внизу — изолента героя.
let invTab = 'bag'; // вкладка инвентаря: 'bag' — сумки, 'quest' — квестовые предметы
function renderInventory(box) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) { box.innerHTML = ''; return; }
  const packs = heroPacks(hero);
  const cap = bagCapacity(hero);
  const bag = hero.bag || [];
  // вкладки: сумки / квестовые предметы
  box.innerHTML = '<div class="invTabs"><button type="button" class="statTab" data-tab="bag"></button><button type="button" class="statTab" data-tab="quest"></button></div>';
  const [tBag, tQuest] = box.querySelectorAll('.statTab');
  tBag.textContent = tr("ui.Инвентарь: ") + bag.length + ' / ' + cap;
  tQuest.textContent = tr("ui.Квестовое") + ((hero.questItems || []).length ? ' · ' + hero.questItems.length : '');
  for (const t of [tBag, tQuest]) {
    t.classList.toggle('selected', t.dataset.tab === invTab);
    t.addEventListener('click', e => { e.stopPropagation(); vibrate(); invTab = t.dataset.tab; renderInventory(box); });
  }
  if (invTab === 'quest') {
    renderQuestPocket(box, hero);
    const money = document.createElement('div');
    money.className = 'invTape';
    money.innerHTML = tr("ui.<span>Изолента</span>") + formatTape(hero.tape || 0);
    box.appendChild(money);
    return;
  }
  box.appendChild(bagNestRow(hero, packs));
  const grid = document.createElement('div');
  grid.className = 'invGrid';
  for (let i = 0; i < Math.max(cap, bag.length); i++)
    grid.appendChild(bag[i] ? bagSlotFor(bag[i], 'character', () => openItemInfo({ bag: i }), () => renderInventory(box)) : emptySlot('cell', ''));
  const money = document.createElement('div');
  money.className = 'invTape';
  money.innerHTML = tr("ui.<span>Изолента</span>") + formatTape(hero.tape || 0);
  box.append(grid, bagSelectBar(hero, 'character', 'drop', () => renderInventory(box)), money);
}
