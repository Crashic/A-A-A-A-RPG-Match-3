// Обновляет обе панели боя (игрок слева, враг справа), кнопки навыков героя и навык врага.
function renderBattle() {
  if (!battle) return;
  renderFighterPanel('hero');
  renderFighterPanel('enemy');
  renderSkillBar();
  renderEnemySkill();
}
