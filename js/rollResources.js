// Ресурсы с врага: с шансом RESOURCE_DROP_CHANCE — 1–3 единицы случайного ресурса (элита — вдвое больше).
// Возвращает { id: сколько } (пусто — ничего).
function rollResources(elite) {
  const out = {};
  if (Math.random() >= RESOURCE_DROP_CHANCE) return out;
  const r = RESOURCES[Math.floor(Math.random() * RESOURCES.length)];
  out[r.id] = (1 + Math.floor(Math.random() * 3)) * (elite ? 2 : 1);
  return out;
}
