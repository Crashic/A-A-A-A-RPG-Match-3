// Добыча с побеждённого врага уровня level: обычный оставляет предмет с шансом ITEM_DROP_CHANCE,
// элита — всегда ITEM_DROP_ELITE предметов, и редкие у неё выпадают чаще; ещё может выпасть хлам (makeJunk). Возвращает массив предметов.
function rollDrops(level, elite) {
  const count = elite ? ITEM_DROP_ELITE : (Math.random() < ITEM_DROP_CHANCE ? 1 : 0);
  const out = [];
  for (let i = 0; i < count; i++) out.push(rollItem(level, rollRarity(elite)));
  if (Math.random() < JUNK_DROP_CHANCE) out.push(makeJunk(level)); // хлам — на продажу
  return out;
}
