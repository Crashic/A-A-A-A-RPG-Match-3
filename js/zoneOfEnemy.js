// Локация, где живёт враг enemyId, или null.
function zoneOfEnemy(enemyId) {
  const found = findEnemy(enemyId);
  return found ? found.zone : null;
}
