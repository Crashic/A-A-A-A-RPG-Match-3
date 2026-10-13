// Изолента через общий склад: dir — 'put' (из кармана героя на склад) или 'take' (со склада герою),
// amount — сколько (в белой); 'all' — всё, что есть. Переводит не больше, чем есть.
function stashTape(dir, amount) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const acc = loadAccount();
  const stash = loadStash(acc);
  const have = dir === 'put' ? (hero.tape || 0) : stash.tape;
  const n = Math.min(have, amount === 'all' ? have : amount);
  if (n <= 0) { showToast(dir === 'put' ? 'В карманах пусто' : 'На складе пусто'); return; }
  if (dir === 'put') { hero.tape -= n; stash.tape += n; }
  else { stash.tape -= n; hero.tape = (hero.tape || 0) + n; }
  saveSlot(slot, hero);
  saveAccount(acc);
  vibrate();
  renderStash();
}
