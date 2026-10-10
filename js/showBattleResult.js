// Окно итогов боя: «Победа»/«Поражение», опыт, изолента, новый уровень. Кнопки «Карта» и «Ещё раз».
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
  if (!r.won) row(r.enemy + ' победил', 'добыча сохранена', 'lost');
  if (r.won) row('Опыт за врага', '+' + r.killXp);
  row('Опыт с документов', '+' + r.gemXp);
  row('Изолента', formatTape(r.tape), '', true);
  if (r.levelUps) row('Новый уровень!', String(r.level), 'levelUp');
  box.classList.add('open');
}
