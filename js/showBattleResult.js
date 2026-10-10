// Окно итогов боя: «Победа»/«Поражение», опыт, золото, новый уровень. Кнопки «Карта» и «Ещё раз».
function showBattleResult(r) {
  const box = document.getElementById('battleResult');
  document.getElementById('resultTitle').textContent = r.won ? 'Победа' : 'Поражение';
  const list = document.getElementById('resultList');
  list.innerHTML = '';
  const row = (label, value, cls) => {
    const li = document.createElement('li');
    if (cls) li.className = cls;
    li.innerHTML = '<span></span><b></b>';
    li.firstChild.textContent = label;
    li.lastChild.textContent = value;
    list.appendChild(li);
  };
  if (r.won) {
    row('Опыт за врага', '+' + r.killXp);
    row('Опыт с фишек', '+' + r.gemXp);
    row('Золото', '+' + r.gold);
    if (r.levelUps) row('Новый уровень!', String(r.level), 'levelUp');
  } else {
    row(r.enemy + ' победил', 'награды нет');
  }
  box.classList.add('open');
}
