// Купить ещё гнездо для сумки (до BAG_NESTS_MAX, цена — bagNestPrice), с подтверждением. Сюжет — событие nest.
function buyBagNest() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const packs = heroPacks(hero);
  if (packs.nests >= BAG_NESTS_MAX) return;
  const price = bagNestPrice(packs.nests);
  if ((hero.tape || 0) < price) { showToast(tr("ui.Не хватает изоленты: нужно ") + tapeText(price)); return; }
  showConfirm(price ? tr("ui.Пришить ещё гнездо для сумки за ") + tapeText(price) + '?' : tr("ui.Пришить гнездо для сумки? Первое — бесплатно, по акции «Последний гвоздь»."), tr("ui.Пришить"), () => {
    const h = loadSlot(getActiveSlot());
    const p = heroPacks(h);
    h.tape -= price;
    p.nests++;
    p.worn.push(null);
    saveGear(h);
    vibrate([30, 40, 30]);
    showToast(tr("ui.Новое гнездо. Теперь найдите, что в него надеть."));
    storyEvent('nest'); // сюжет, акт «Тара»
  }, 'orange');
}
