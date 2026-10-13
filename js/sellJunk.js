// «Сдать хлам»: продать все обычные вещи (кроме сумок) из сумки разом (с подтверждением).
function sellJunk() {
  const hero = loadSlot(getActiveSlot());
  const junk = ((hero && hero.bag) || []).filter(i => (i.rarity === 'common' || isJunkItem(i)) && !isBagItem(i));
  if (!junk.length) { showToast('Хлама нет. Семёныч разочарован.'); return; }
  const sum = junk.reduce((a, i) => a + itemPrice(i), 0);
  showConfirm('Сдать хлам и обычные вещи (' + junk.length + ' шт.) за ' + tapeText(sum) + ' изоленты?', 'Сдать', () => {
    const h = loadSlot(getActiveSlot());
    h.tape = (h.tape || 0) + h.bag.filter(i => (i.rarity === 'common' || isJunkItem(i)) && !isBagItem(i)).reduce((a, i) => a + itemPrice(i), 0);
    h.bag = h.bag.filter(i => !(i.rarity === 'common' || isJunkItem(i)) || isBagItem(i));
    saveGear(h);
  }, 'orange');
}
