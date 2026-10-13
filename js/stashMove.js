// Перекладывает вещь между сумкой текущего персонажа и общим складом:
// from — 'bag' (сумка → склад) или 'stash' (склад → сумка), index — номер вещи.
function stashMove(from, index) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const acc = loadAccount();
  const stash = loadStash(acc);
  hero.bag = hero.bag || [];
  const src = from === 'bag' ? hero.bag : stash.items;
  const dst = from === 'bag' ? stash.items : hero.bag;
  const cap = from === 'bag' ? stashSize(acc) : bagCapacity(hero);
  if (!src[index]) return;
  if (dst.length >= cap) { showToast(from === 'bag' ? 'Общак забит. Расширьте его («+»).' : 'Сумка полна'); return; }
  dst.push(src.splice(index, 1)[0]);
  saveSlot(slot, hero);
  saveAccount(acc);
  renderStash();
}
