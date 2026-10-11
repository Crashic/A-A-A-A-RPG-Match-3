// Экран «Персонаж»: слева — шапка (имя, фракция и класс, уровень и опыт), кукла со слотами и рунами,
// характеристики и вкладки класса, фракции и расы; справа — инвентарь (сумки и ячейки).
// В бою — только просмотр (renderStatBlock без кнопок).
function renderCharacter() {
  const hero = loadSlot(getActiveSlot());
  const left = document.getElementById('charLeft');
  const right = document.getElementById('charRight');
  if (!hero) { left.innerHTML = '<p class="hint">Нет персонажа</p>'; right.innerHTML = ''; return; }
  const readOnly = !!(battle && !battle.over);
  const scroll = left.scrollTop;
  left.innerHTML = '';
  const parts = ['charHead', 'charDoll', 'charStats', 'charTabs'].map(cls => {
    const d = document.createElement('div');
    d.className = cls;
    left.appendChild(d);
    return d;
  });
  renderCharHead(parts[0], hero);
  renderDoll(parts[1], hero);
  renderStatBlock(parts[2], hero, readOnly);
  renderCharTabs(parts[3], hero);
  left.scrollTop = scroll;
  renderInventory(right);
}
