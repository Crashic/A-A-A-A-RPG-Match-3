// Обновляет обе панели боя (игрок слева, враг справа) и кнопки навыков.
function renderBattle() {
  if (!battle) return;
  renderFighterPanel('hero');
  renderFighterPanel('enemy');
  renderSkillBar();
}
