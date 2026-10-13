// Докупить место в общаке (+STASH_NEST_SIZE ячеек) за изоленту текущего героя, по цене STASH_NEST_PRICES.
function buyStashNest() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const acc = loadAccount();
  const n = (loadStash(acc).nests) || 0;
  if (n >= STASH_NEST_PRICES.length) return;
  const price = STASH_NEST_PRICES[n];
  if ((hero.tape || 0) < price) { showToast(tr("ui.Не хватает изоленты: нужно ") + tapeText(price)); return; }
  showConfirm(tr("ui.Расширить общак ещё на ") + STASH_NEST_SIZE + tr("ui. ячеек за ") + tapeText(price) + tr("ui.? Платит ") + hero.name + '.', tr("ui.Расширить"), () => {
    const h = loadSlot(getActiveSlot());
    const a = loadAccount();
    const st = loadStash(a);
    h.tape -= price;
    st.nests = (st.nests || 0) + 1;
    saveSlot(getActiveSlot(), h);
    saveAccount(a);
    vibrate([30, 40, 30]);
    showToast(STASH_NAME + ': +' + STASH_NEST_SIZE + tr("ui. ячеек"));
    renderStash();
  }, 'orange');
}
