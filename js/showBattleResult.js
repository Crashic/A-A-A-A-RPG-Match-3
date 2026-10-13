// Окно итогов боя (добыча — иконками, renderResultLoot): «Победа»/«Поражение», опыт, изолента, новый уровень, добыча (r.added, r.lost). Кнопки «Карта» и «Ещё раз».
let battleLevelUp = null; // { level, ups } — показать окно нового уровня после итогов
function showBattleResult(r) {
  battleLevelUp = r.levelUps ? { level: r.level, ups: r.levelUps } : null;
  const box = document.getElementById('battleResult');
  document.getElementById('resultTitle').textContent = r.won ? tr("ui.Победа") : tr("ui.Поражение");
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
  if (r.surrendered) row(tr("ui.Вы сдались"), tr("ui.набранное потеряно"), 'lost');
  else if (!r.won) row(r.enemy + tr("ui. победил"), tr("ui.добыча сохранена"), 'lost');
  if (r.won) row(tr("ui.Опыт за врага"), '+' + r.killXp);
  row(tr("ui.Опыт с документов"), '+' + r.gemXp);
  row(tr("ui.Изолента"), formatTape(r.tape), '', true);
  if (r.levelUps) row(tr("ui.Новый уровень!"), String(r.level), 'levelUp');
  // добыча — иконками (касание — окно вещи с «Надеть»/«Продать» и сравнением), ресурсы — значками
  if ((r.added || []).length || (r.resources && Object.keys(r.resources).length)) {
    const li = document.createElement('li');
    li.className = 'lootIcons';
    li.innerHTML = tr("ui.<span>Добыча</span><div class=\"resultLoot\"></div>");
    list.appendChild(li);
    resultLoot = r.added || [];
    renderResultLoot(li.lastChild, r.resources || {});
  }
  if (r.lost && r.lost.length) row(tr("ui.Сумка полна!"), r.lost.length + ' ' + plural(r.lost.length, tr("ui.вещь упала"), tr("ui.вещи упали"), tr("ui.вещей упало")) + tr("ui. — уже разворовали"), 'lost');
  // задания: выполненные — название, иначе — что прогресс есть (сдать — на доске в бункере)
  if (r.quests && r.quests.done.length) row(r.quests.done.length > 1 ? tr("ui.Выполнено заданий") : tr("ui.Задание выполнено"), r.quests.done.length > 1 ? String(r.quests.done.length) : r.quests.done[0], 'questDone');
  else if (r.quests && r.quests.moved) row(tr("ui.Задания"), tr("ui.прогресс засчитан"));
  box.classList.add('open');
  tutorialCheck(); // обучение: итоги боя
}
