// Можно ли оформить ещё ранг узла: есть свободное очко, ранг не максимальный и узел связан с уже оформленным
// (корень — всегда). Возвращает { ok, why }.
function paragonCanTake(node) {
  const ranks = paragonRanks();
  if ((ranks[node.id] || 0) >= node.max) return { ok: false, why: 'Компенсация выплачена полностью' };
  if (!node.root && !node.links.some(id => ranks[id])) return { ok: false, why: 'Сначала оформите соседнюю компенсацию' };
  if (!paragonPoints().free) return { ok: false, why: 'Нет очков: 1 очко за каждые ' + PARAGON_LEVEL_STEP + ' уровней любого персонажа' };
  return { ok: true, why: '' };
}
