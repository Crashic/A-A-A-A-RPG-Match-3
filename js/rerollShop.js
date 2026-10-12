// «Завезите новое»: за изоленту (rerollPrice) сразу обновить прилавок.
function rerollShop() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const price = rerollPrice(hero);
  if ((hero.tape || 0) < price) { showToast('Не хватает изоленты. Семёныч в долг не даёт.'); return; }
  hero.tape -= price;
  rollShopStock(hero);
  saveGear(hero);
}
