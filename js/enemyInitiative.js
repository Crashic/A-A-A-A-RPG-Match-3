// Наглость (инициатива) врага: по уровню, элите больше.
function enemyInitiative(e) {
  return Math.floor(e.level / INI_ENEMY_PER_LEVELS) + (e.elite ? INI_ELITE_BONUS : 0);
}
