// Прогресс взятых заданий после боя: won — победа, enemyId — враг, gems — собранные героем фишки
// { id: сколько }. Меняет hero.quests.active. Возвращает { moved, done } — был ли прогресс
// и названия заданий, выполненных в этом бою.
function questProgress(hero, won, enemyId, gems) {
  const out = { moved: false, done: [], list: [] }; // list — { title, have, need, add } для окна итогов
  const list = (hero.quests && hero.quests.active) || [];
  const zone = zoneOfEnemy(enemyId);
  for (const q of list) {
    if (q.have >= q.need) continue;
    let add = 0;
    if (q.type === 'zone') add = won && zone && zone.id === q.zoneId ? 1 : 0;
    else if (q.type === 'enemy' || q.type === 'elite') add = won && enemyId === q.enemyId ? 1 : 0;
    else if (q.type === 'gems') add = (gems && gems[q.gem]) || 0;
    else if (q.type === 'wins') add = won ? 1 : 0;
    if (!add) continue;
    q.have = Math.min(q.need, q.have + add);
    out.moved = true;
    out.list.push({ title: q.title, have: q.have, need: q.need, add });
    if (q.have >= q.need) out.done.push(q.title);
  }
  return out;
}
