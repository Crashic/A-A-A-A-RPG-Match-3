// Вкладка «Квестовое» инвентаря: описание кармана и список квестовых предметов (без ячеек — карман бездонный).
function renderQuestPocket(box, hero) {
  const p = document.createElement('p');
  p.className = 'questPocketNote';
  p.textContent = QUEST_POCKET_TEXT;
  box.appendChild(p);
  const ids = hero.questItems || [];
  if (!ids.length) {
    const e = document.createElement('p');
    e.className = 'hint';
    e.textContent = tr("ui.Пусто. Вам пока ничего не доверили.");
    box.appendChild(e);
    return;
  }
  for (const id of ids) {
    const q = findById(QUEST_ITEMS, id);
    if (!q) continue;
    const row = document.createElement('div');
    row.className = 'questPocketRow';
    row.appendChild(questItemCell(q));
    const t = document.createElement('div');
    t.innerHTML = '<b></b><small></small>';
    t.firstChild.textContent = q.name;
    t.lastChild.textContent = q.text;
    row.appendChild(t);
    box.appendChild(row);
  }
}
