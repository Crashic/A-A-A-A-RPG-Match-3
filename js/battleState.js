// Текущий бой: { enemyId, enemyInfo, hero, enemy, turn: 'hero' | 'enemy', over, gained: { xp, tape } }.
// hero и enemy — бойцы (createFighter). null — боя нет.
let battle = null;
// Какая зона открыта на карте врагов
let mapZoneId = null;
let mapEnemyId = null; // враг, выбранный на карте (бой — кнопкой «В бой»)
