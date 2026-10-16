// Окно итогов боя по макету «Окно победы»: штамп «ПОБЕДА!»/«ПОРАЖЕНИЕ», кто повержен и где; слева — опыт (полоса уровня
// с прибавкой); справа — добыча: вещи, ресурсы и изолента плашками, по правому краю (renderResultLoot, касание — окно вещи)
// и бумажный блок «Задания · прогресс за бой» (+N или штамп «ГОТОВО»). Кнопки «Ещё раз» и «Продолжить».
let battleLevelUp = null; // { level, ups } — показать окно нового уровня после итогов
function showBattleResult(r) {
  battleLevelUp = r.levelUps ? { level: r.level, ups: r.levelUps } : null;
  const box = document.getElementById('battleResult');
  box.classList.toggle('lost', !r.won);
  document.getElementById('resultTitle').textContent = r.won ? tr("ui.Победа!") : tr("ui.Поражение");
  document.getElementById('vicEnemy').textContent = r.surrendered ? tr("ui.Вы сдались — набранное потеряно")
    : r.won ? r.enemy + tr("ui. повержен") : r.enemy + tr("ui. победил — опыт и изолента с фишек сохранены");
  document.getElementById('vicSub').textContent = r.zone || '';
  const left = document.getElementById('vicLeft');
  const right = document.getElementById('vicRight');
  left.innerHTML = ''; right.innerHTML = '';
  const sec = (parent, title, note) => {
    const h = document.createElement('p');
    h.className = 'vicSec';
    h.innerHTML = '<span></span><b></b>';
    h.firstChild.textContent = title;
    h.lastChild.textContent = note || '';
    parent.appendChild(h);
    return h;
  };
  // опыт: полоса уровня, жёлтое — было, штриховка — прибавка за этот бой
  const gain = (r.killXp || 0) + (r.gemXp || 0);
  sec(left, tr("ui.Опыт"), '+' + gain + (r.gemXp ? tr("ui. · ") + r.gemXp + tr("ui. с документов") : ''));
  const xpRow = document.createElement('div');
  xpRow.className = 'vicXp';
  const need = r.xpNeed || 0;
  const now = need ? Math.min(100, r.xp / need * 100) : 100;
  const before = r.levelUps ? 0 : Math.max(0, now - (need ? gain / need * 100 : 0));
  xpRow.innerHTML = '<span class="vicLvl"></span><span class="vicBar"><i></i><em></em></span><span class="vicNum"></span>';
  xpRow.querySelector('.vicLvl').textContent = tr("ui.Ур. ") + r.level;
  xpRow.querySelector('i').style.width = before + '%';
  const em = xpRow.querySelector('em');
  em.style.left = before + '%';
  em.style.width = (now - before) + '%';
  xpRow.querySelector('.vicNum').textContent = need ? r.xp + ' / ' + need : tr("ui.макс.");
  left.appendChild(xpRow);
  if (r.levelUps) {
    const lv = document.createElement('p');
    lv.className = 'vicLevelUp';
    lv.textContent = tr("ui.Новый уровень!") + ' ' + r.level;
    left.appendChild(lv);
  }
  // добыча и ресурсы (касание по вещи — окно с «Продать»/«Надеть» и сравнением)
  const res = r.resources || {};
  if ((r.added || []).length || Object.keys(res).length || (r.lost && r.lost.length) || r.tape) {
    sec(right, tr("ui.Добыча"), (r.added || []).length ? tr("ui.касание — продать или надеть") : '');
    const loot = document.createElement('div');
    loot.className = 'resultLoot';
    right.appendChild(loot);
    resultLoot = r.added || [];
    renderResultLoot(loot, res);
    // изолента — плашками по цветам в той же строке, после вещей и ресурсов
    let rest = Math.max(0, Math.floor(r.tape || 0));
    for (const k of TAPE_KINDS) {
      const n = Math.floor(rest / k.value);
      rest -= n * k.value;
      if (!n) continue;
      const c = document.createElement('span');
      c.className = 'stashChip';
      c.dataset.tipTitle = tr("ui.Изолента");
      c.dataset.tip = tr("ui.С радиации — уже в карманах.");
      c.innerHTML = '<i class="chipRoll ' + k.id + '"></i><b></b>';
      c.querySelector('b').textContent = n;
      loot.appendChild(c);
    }
    const empty = loot.querySelector(':scope > small');
    if (empty && loot.children.length > 1) empty.remove();
    if (r.lost && r.lost.length) {
      const p = document.createElement('p');
      p.className = 'vicLost';
      p.textContent = tr("ui.Сумка полна! ") + r.lost.length + ' ' + plural(r.lost.length, tr("ui.вещь упала"), tr("ui.вещи упали"), tr("ui.вещей упало")) + tr("ui. — уже разворовали");
      right.appendChild(p);
    }
  }
  // задания: прогресс за бой
  const qs = (r.quests && r.quests.list) || [];
  if (qs.length) {
    const paper = document.createElement('div');
    paper.className = 'vicQuests paper';
    paper.innerHTML = '<p class="vicQHead"></p>';
    paper.firstChild.textContent = tr("ui.Задания · прогресс за бой");
    for (const q of qs) {
      const row = document.createElement('div');
      row.className = 'vicQ' + (q.have >= q.need ? ' done' : '');
      row.innerHTML = '<b></b><span class="vicQBar"><i></i></span><span class="vicQN"></span>';
      row.querySelector('b').textContent = q.title;
      row.querySelector('i').style.width = Math.round(q.have / q.need * 100) + '%';
      const n = row.querySelector('.vicQN');
      if (q.have >= q.need) { n.className = 'vicQStamp'; n.textContent = tr("ui.Готово"); }
      else n.innerHTML = q.have + ' / ' + q.need + ' <em>+' + q.add + '</em>';
      paper.appendChild(row);
    }
    right.appendChild(paper);
  }
  if (!right.children.length) right.hidden = true; else right.hidden = false;
  box.classList.add('open');
  // сюжет: идёт разговор после боя или урок про хлам — «Ещё раз» не показываем
  const story = storyAfterPending() || storyJunkActive();
  document.getElementById('resultMap').textContent = tr("ui.Продолжить");
  document.getElementById('resultAgain').hidden = story;
  tutorialCheck(); // обучение: итоги боя
  setTimeout(storyJunkStep, 400);
}
