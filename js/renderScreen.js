// Перерисовывает экран перед показом (при переходах и кнопке «Назад» телефона).
function renderScreen(id) {
  if (id === 'menu') { battle = null; closeBattleResult(); renderMenu(); }
  else if (id === 'characters') renderCharacters();
  else if (id === 'settings') renderSettings();
  else if (id === 'map') renderMap();
  else if (id === 'game') {
    if (battle) renderBattle();
    else setTimeout(() => { const s = loadSlot(getActiveSlot()); startBattle(s && s.lastEnemy); });
  }
  else if (id === 'create' && creation) renderCreateStep();
}
