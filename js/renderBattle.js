// Обновляет обе панели боя: игрок слева, враг справа.
function renderBattle() {
  if (!battle) return;
  renderFighterPanel('hero');
  renderFighterPanel('enemy');
}
