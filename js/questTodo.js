// Коротко, что сделать по заданию (строка «Что делать» в карточке, перед строкой прогресса). Считается при показе — работает и для старых заданий.
function questTodo(q, hero) {
  const short = name => (name || '').replace(/^.*«|»$/g, '');
  if (q.cat === 'story' && hero) { // сюжет: у акта своё поле todo
    const act = STORY_ACTS.find(a => a.id === q.story);
    return act && act.todo ? storyFill(act.todo, hero) : '';
  }
  if (q.deliver) return tr("ui.Задания → выбрать это задание → «Сдать». Предмет уже при вас.");
  const zoneOfEnemy = id => ZONES.find(z => z.enemies.some(e => e.id === id));
  const enemy = id => { const z = zoneOfEnemy(id); return z && z.enemies.find(e => e.id === id); };
  if (q.type === 'zone') {
    const z = ZONES.find(z => z.id === q.zoneId);
    return tr("ui.Карта врагов → «{zone}» → побеждать любых врагов").replace('{zone}', short(z && z.name));
  }
  if (q.type === 'enemy' || q.type === 'elite') {
    const z = zoneOfEnemy(q.enemyId), e = enemy(q.enemyId);
    return tr("ui.Карта врагов → «{zone}» → победить «{enemy}»").replace('{zone}', short(z && z.name)).replace('{enemy}', e ? e.name : '');
  }
  if (q.type === 'gems') return tr("ui.Собирать ряды фишек «{gem}» в любом бою").replace('{gem}', q.gem ? gemName(q.gem) : '');
  if (q.type === 'wins') return tr("ui.Побеждать в любых боях");
  return '';
}
