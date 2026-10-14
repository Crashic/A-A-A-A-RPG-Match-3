// Сюжет: игрок нажал на локацию на карте. Своя стартовая — дальше стрелка на врага.
function storyOnZone(zoneId) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  const st = storyState(hero);
  if (!hero || st.act !== 1 || st.done >= 1 || st.stage !== 'toZone') return;
  if (storyTarget(hero).zone.id !== zoneId) return;
  st.stage = 'toEnemy';
  saveSlot(slot, hero);
}
