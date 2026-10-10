// Может ли персонаж попасть в локацию: свои фракционные и нейтральные; нейтральная Пресса — везде.
function zoneAllowed(hero, zone) {
  if (!zone.factionId || !hero || !hero.factionId) return true;
  return zone.factionId === hero.factionId;
}
