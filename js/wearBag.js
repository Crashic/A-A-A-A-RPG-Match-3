// Надеть сумку из инвентаря (index — номер в hero.bag) в первое свободное гнездо.
function wearBag(index) {
  const hero = loadSlot(getActiveSlot());
  const item = hero && hero.bag && hero.bag[index];
  if (!isBagItem(item)) return false;
  if (statsLocked()) { showToast(tr("ui.В бою сумки не перешивают")); return false; }
  const packs = heroPacks(hero);
  const nest = packs.worn.findIndex((b, i) => !b && i < packs.nests);
  if (nest < 0) { showToast(tr("ui.Нет свободного гнезда. Снимите сумку или купите гнездо («+»).")); return false; }
  packs.worn[nest] = hero.bag.splice(index, 1)[0];
  saveGear(hero);
  storyEvent('wearBag'); // сюжет, акт «Тара»
  return true;
}
