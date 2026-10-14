// Очки реестра аккаунта: { total — за каждые PARAGON_LEVEL_STEP уровней каждого персонажа, spent, free }.
function paragonPoints() {
  let total = 0;
  for (let n = 1; n <= SLOT_COUNT; n++) { const h = loadSlot(n); if (h) total += Math.floor(h.level / PARAGON_LEVEL_STEP); }
  total += (loadAccount().paragon || {}).bonus || 0; // очки-награды (сюжет, акт 8)
  const ranks = paragonRanks();
  const spent = Object.values(ranks).reduce((a, b) => a + b, 0);
  return { total, spent, free: Math.max(0, total - spent) };
}
