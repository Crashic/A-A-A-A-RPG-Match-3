// Кнопки экрана «Персонаж», меню боя и подсказок: «Персонаж» в меню и в бою, кнопка меню боя,
// закрытие меню и подсказки касанием мимо.
function setupCharacter() {
  const on = (id, fn) => document.getElementById(id).addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
  on('btnCharacter', openCharacter);
  on('btnCharGame', openCharacter);
  on('btnBattleMenu', () => toggleBattleMenu());
  // меню на карте (справа, вертикально)
  on('mapChar', openCharacter);
  on('mapGlossary', () => openGlossary());
  on('mapLegend', openGemLegend);
  on('mapHome', goHome);
  // пункты меню боя закрывают меню (их действия привязаны в setupMenu и setupGlossary)
  document.querySelectorAll('#battleMenu .menuItem').forEach(b => b.addEventListener('click', () => closeBattleMenu()));
  document.addEventListener('click', e => {
    if (!e.target.closest('#battleMenu') && !e.target.closest('#btnBattleMenu')) closeBattleMenu();
    if (!e.target.closest('.hasTip') && !e.target.closest('[data-tip]')) hideTip();
  });
}
