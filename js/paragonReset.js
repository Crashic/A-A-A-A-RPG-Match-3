// Аннулировать все компенсации (очки возвращаются), с подтверждением.
function paragonReset() {
  if (!paragonPoints().spent) { showToast('Аннулировать нечего — вы ещё ничего не получили'); return; }
  showConfirm('Аннулировать все компенсации? Очки вернутся, бумаги сгорят.', 'Аннулировать', () => {
    const acc = loadAccount();
    acc.paragon = { ranks: {} };
    saveAccount(acc);
    renderParagon();
  });
}
