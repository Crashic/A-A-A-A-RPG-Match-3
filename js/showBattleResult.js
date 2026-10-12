// Окно итогов боя: «Победа»/«Поражение», опыт, изолента, новый уровень, добыча (r.added, r.lost). Кнопки «Карта» и «Ещё раз».
function showBattleResult(r) {
  const box = document.getElementById('battleResult');
  document.getElementById('resultTitle').textContent = r.won ? 'Победа' : 'Поражение';
  const list = document.getElementById('resultList');
  list.innerHTML = '';
  const row = (label, value, cls, html) => {
    const li = document.createElement('li');
    if (cls) li.className = cls;
    li.innerHTML = '<span></span><b></b>';
    li.firstChild.textContent = label;
    if (html) li.lastChild.innerHTML = value; else li.lastChild.textContent = value;
    list.appendChild(li);
  };
  if (r.surrendered) row('Вы сдались', 'набранное потеряно', 'lost');
  else if (!r.won) row(r.enemy + ' победил', 'добыча сохранена', 'lost');
  if (r.won) row('Опыт за врага', '+' + r.killXp);
  row('Опыт с документов', '+' + r.gemXp);
  row('Изолента', formatTape(r.tape), '', true);
  if (r.levelUps) row('Новый уровень!', String(r.level), 'levelUp');
  // добыча: название цветом редкости; что не влезло в сумку — осталось в пустошах
  for (const it of r.added || []) {
    const li = document.createElement('li');
    li.className = 'loot';
    li.innerHTML = '<span>Добыча</span><b></b>';
    li.lastChild.textContent = it.name;
    li.lastChild.style.color = (findById(ITEM_RARITIES, it.rarity) || {}).color || '';
    list.appendChild(li);
  }
  if (r.lost && r.lost.length) row('Сумка полна', 'брошено: ' + r.lost.length, 'lost');
  // задания: выполненные — название, иначе — что прогресс есть (сдать — на доске в бункере)
  if (r.quests && r.quests.done.length) row(r.quests.done.length > 1 ? 'Выполнено заданий' : 'Задание выполнено', r.quests.done.length > 1 ? String(r.quests.done.length) : r.quests.done[0], 'questDone');
  else if (r.quests && r.quests.moved) row('Задания', 'прогресс засчитан');
  box.classList.add('open');
}
