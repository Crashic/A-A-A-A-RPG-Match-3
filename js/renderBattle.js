// Обновляет обе панели боя (игрок слева, враг справа), кнопки навыков героя и навык врага.
function renderBattle() {
  if (!battle) return;
  renderFighterPanel('hero');
  renderFighterPanel('enemy');
  // ход игрока — у поля такая же золотая рамка, как у его панели
  document.getElementById('board').classList.toggle('heroTurn', !battle.over && battle.turn === 'hero');
  renderSkillBar();
  renderEnemySkill();
}
