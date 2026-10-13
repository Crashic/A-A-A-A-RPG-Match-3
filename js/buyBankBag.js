// Покупает следующее гнездо под сумку в банке (BANK_BAG_PRICES), с подтверждением.
function buyBankBag() {
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  const bags = (hero.bank && hero.bank.bags) || 0;
  if (bags >= BANK_BAG_SLOTS) return;
  const price = BANK_BAG_PRICES[bags];
  if ((hero.tape || 0) < price) { showToast('Не хватает изоленты: нужно ' + tapeText(price)); return; }
  showConfirm('Купить гнездо для сумки в шкафчике за ' + tapeText(price) + '? +' + BANK_BAG_SIZE + ' ячеек.', 'Купить', () => {
    const h = loadSlot(getActiveSlot());
    h.bank = h.bank || { items: [], bags: 0 };
    h.tape -= price;
    h.bank.bags = bags + 1;
    saveSlot(getActiveSlot(), h);
    vibrate([30, 40, 30]);
    showToast('Шкафчик: +' + BANK_BAG_SIZE + ' ячеек');
    renderBank();
  });
}
