// Открывает «Общий склад» лагеря (нужен текущий персонаж — с ним и меняемся).
function openStash() {
  if (!stashUnlocked()) { showToast(STASH_NAME + tr("ui. откроется после задания. Замок пока настоящий.")); return; }
  if (!loadSlot(getActiveSlot())) { showToast(tr("ui.Выберите персонажа — склад меняется с его сумкой")); return; }
  hideTip();
  renderStash();
  showScreen('stash');
}
