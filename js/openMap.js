// Кнопка «Карта врагов»: открывается между ходами, не во время анимации.
function openMap() {
  if (match3 && match3.busy && battle && !battle.over) { showToast('Дождитесь конца хода', 1500); return; }
  mapZoneId = null;
  closeBattleResult();
  renderMap();
  showScreen('map');
}
