// «Сдать хлам»: продать все обычные вещи (кроме сумок) из сумки разом (с подтверждением).
function sellJunk() {
  const hero = loadSlot(getActiveSlot());
  const junk = ((hero && hero.bag) || []).filter(i => i.rarity === 'common' && !isBagItem(i));
  if (!junk.length) { showToast('Хлама нет. Семёныч разочарован.'); return; }
  const sum = junk.reduce((a, i) => a + itemPrice(i), 0);
  showConfirm('Сдать обычные вещи (' + junk.length + ' шт.) за ' + tapeText(sum) + ' изоленты?', 'Сдать', () => {
    const h = loadSlot(getActiveSlot());
    h.tape = (h.tape || 0) + h.bag.filter(i => i.rarity === 'common' && !isBagItem(i)).reduce((a, i) => a + itemPrice(i), 0);
    h.bag = h.bag.filter(i => i.rarity !== 'common' || isBagItem(i));
    saveGear(h);
  }, 'orange');
}
