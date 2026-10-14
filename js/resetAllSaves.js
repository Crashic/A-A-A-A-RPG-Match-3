// «Удалить всех персонажей»: игра начинается заново — все ячейки, незаконченные бои, общие данные аккаунта
// (лагерь, общак, Реестр, ресурсы) и «уже видел» в настройках (подсказки, окно фишек). Язык и звук остаются.
function resetAllSaves() {
  for (let n = 1; n <= SLOT_COUNT; n++) { deleteSlot(n); clearBattle(n); }
  try { localStorage.removeItem('aaaa-account'); } catch (e) {}
  settings.hintsSeen = {};
  settings.gemLegendSeen = false;
  saveSettings();
  battle = null;
  setActiveSlot(1);
}
