// Купить ещё гнездо для сумки (до BAG_NESTS_MAX, цены BAG_NEST_PRICES), с подтверждением.
function buyBagNest() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const packs = heroPacks(hero);
  if (packs.nests >= BAG_NESTS_MAX) return;
  const price = BAG_NEST_PRICES[packs.nests - BAG_NESTS_START];
  if ((hero.tape || 0) < price) { showToast('Не хватает изоленты: нужно ' + tapeText(price)); return; }
  showConfirm('Пришить ещё гнездо для сумки за ' + tapeText(price) + '?', 'Пришить', () => {
    const h = loadSlot(getActiveSlot());
    const p = heroPacks(h);
    h.tape -= price;
    p.nests++;
    p.worn.push(null);
    saveGear(h);
    vibrate([30, 40, 30]);
    showToast('Новое гнездо. Теперь найдите, что в него надеть.');
  }, 'orange');
}
