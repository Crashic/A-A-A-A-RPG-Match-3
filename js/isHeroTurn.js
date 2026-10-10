// Сейчас ход игрока и бой идёт.
function isHeroTurn() {
  return !!battle && !battle.over && battle.turn === 'hero';
}
