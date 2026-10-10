// Может ли персонаж попасть в локацию: свои фракционные и нейтральные; Пресса — везде.
function zoneAllowed(hero, zone) {
  if (!zone.factionId || !hero || !hero.factionId || hero.factionId === 'press') return true;
  return zone.factionId === hero.factionId;
}
