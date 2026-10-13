// «Читер»: положить в сумку текущего героя случайный предмет его уровня редкости rarity.
function cheatGiveItem(rarity) {
  const slot = getActiveSlot();
  const hero = loadSlot(slot);
  if (!hero) return;
  const item = (rarity === 'junk' ? makeJunk(hero.level) : rollItem(hero.level, rarity));
  const { added } = addToBag(hero, [item]);
  if (!added.length) { showToast(tr("ui.Сумка полна")); return; }
  saveSlot(slot, hero);
  vibrate(8);
  showToast(tr("ui.В сумке: ") + item.name);
  if (document.getElementById('character').classList.contains('active')) renderCharacter();
}
