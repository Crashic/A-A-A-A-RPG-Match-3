// «Домой»: в лагерь, если он открыт, иначе — на карту врагов.
function goHomeBase() {
  closeBattleMenu();
  if (campUnlocked()) openCamp(); else openMap();
}
