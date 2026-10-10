// Перерисовывает экран перед показом (при переходах и кнопке «Назад» телефона).
function renderScreen(id) {
  if (id === 'menu') { battle = null; closeBattleResult(); renderMenu(); }
  else if (id === 'characters') renderCharacters();
  else if (id === 'settings') renderSettings();
  else if (id === 'map') renderMap();
  else if (id === 'glossary') renderGlossary();
  else if (id === 'game') {
    if (battle) renderBattle();
    else setTimeout(() => { const n = getActiveSlot(); const s = loadSlot(n); startBattle(s && s.lastEnemy, loadBattle(n)); });
  }
  else if (id === 'create' && creation) renderCreateStep();
}
