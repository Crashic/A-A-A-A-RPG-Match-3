// Аннулировать все компенсации (очки возвращаются), с подтверждением.
function paragonReset() {
  if (!paragonPoints().spent) { showToast(tr("ui.Аннулировать нечего — вы ещё ничего не получили")); return; }
  showConfirm(tr("ui.Аннулировать все компенсации? Очки вернутся, бумаги сгорят."), tr("ui.Аннулировать"), () => {
    const acc = loadAccount();
    acc.paragon = { ranks: {} };
    saveAccount(acc);
    renderParagon();
  });
}
