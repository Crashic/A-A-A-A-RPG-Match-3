// Снять сумку из гнезда nest в инвентарь. Хотя бы одна сумка должна остаться надетой.
// Если после снятия вещи (вместе с самой сумкой) не влезают — предупреждение: лишнее выпадет на пол
// и его тут же разворуют; при согласии пропадают последние вещи инвентаря. onDone — после снятия.
function takeOffBag(nest, onDone) {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const packs = heroPacks(hero);
  const bag = packs.worn[nest];
  if (!bag) return;
  if (statsLocked()) { showToast(tr("ui.В бою сумки не перешивают")); return; }
  if (packs.worn.filter(Boolean).length <= 1) { showToast(tr("ui.Последнюю сумку не снять: вещи в зубах не носят")); return; }
  const items = (hero.bag || []).length + 1; // + сама сумка
  const cap = bagCapacity(hero) - bag.size;
  const lost = Math.max(0, items - cap);
  const apply = () => {
    const h = loadSlot(getActiveSlot());
    const p = heroPacks(h);
    const b = p.worn[nest];
    p.worn[nest] = null;
    h.bag = h.bag || [];
    h.bag.unshift(b); // сумка — первой, чтобы не выпала сама
    if (lost) h.bag.splice(bagCapacity(h));
    saveGear(h);
    if (lost) showToast(tr("ui.Вещи выпали. Их уже нет. Даже пыли нет."), 3000);
    if (onDone) onDone();
  };
  if (!lost) { apply(); return; }
  const what = lost === 1 ? tr("ui.1 вещь не влезет: выпадет на пол, и её") : lost + ' ' + plural(lost, tr("ui.вещь"), tr("ui.вещи"), tr("ui.вещей")) + tr("ui. не влезут: выпадут на пол, и их");
  showConfirm(tr("ui.Вы делаете глупость. ") + what + tr("ui. сразу разворуют соседи. Точно снять «") + bag.name + '»?', tr("ui.Снять и потерять"), apply);
}
