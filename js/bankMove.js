// Перекладывает вещь: from — 'bag' (сумка → банк) или 'bank' (банк → сумка), index — номер вещи.
// Если там, куда кладём, нет места — сообщение. В бою нельзя (statsLocked).
function bankMove(from, index) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  hero.bag = hero.bag || [];
  hero.bank = hero.bank || { items: [], bags: 0 };
  const src = from === 'bag' ? hero.bag : hero.bank.items;
  const dst = from === 'bag' ? hero.bank.items : hero.bag;
  const cap = from === 'bag' ? bankSize(hero) : BACKPACK_SLOTS;
  if (!src[index]) return;
  if (dst.length >= cap) { showToast(from === 'bag' ? 'В банке нет места. Купите сумку у Нины Петровны.' : 'Сумка полна'); return; }
  dst.push(src.splice(index, 1)[0]);
  saveSlot(slot, hero);
  renderBank();
}
