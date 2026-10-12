// Кнопки экрана «Персонаж», меню боя и подсказок: «Персонаж» в меню и в бою, кнопка меню боя,
// закрытие меню и подсказки касанием мимо.
function setupCharacter() {
  const on = (id, fn) => document.getElementById(id).addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
  on('btnCharacter', openCharacter);
  on('btnCharGame', openCharacter);
  on('btnBattleMenu', () => toggleBattleMenu());
  // меню на карте (справа, вертикально)
  on('mapChar', openCharacter);
  document.getElementById('mapBunker').innerHTML = BUNKER_ICON;
  document.getElementById('mapShop').innerHTML = SHOP_ICON;
  on('mapBunker', openBunker);
  on('mapShop', openShop);
  on('mapGlossary', () => openGlossary());
  on('mapLegend', openGemLegend);
  on('mapHome', goHome);
  // окно «Враг»: касание по панели врага в бою; закрыть — крестик или касание мимо
  document.getElementById('enemyPanel').addEventListener('click', e => { e.stopPropagation(); vibrate(); openEnemyInfo(); });
  const info = document.getElementById('enemyInfo');
  on('enemyInfoClose', () => info.classList.remove('open'));
  info.addEventListener('click', e => { if (e.target === info) info.classList.remove('open'); });
  // окно предмета: закрыть — крестик или касание мимо
  const item = document.getElementById('itemInfo');
  on('itemInfoClose', () => item.classList.remove('open'));
  item.addEventListener('click', e => { if (e.target === item) item.classList.remove('open'); });
  // пункты меню боя закрывают меню (их действия привязаны в setupMenu и setupGlossary)
  document.querySelectorAll('#battleMenu .menuItem').forEach(b => b.addEventListener('click', () => closeBattleMenu()));
  document.addEventListener('click', e => {
    if (!e.target.closest('#battleMenu') && !e.target.closest('#btnBattleMenu')) closeBattleMenu();
    if (!e.target.closest('.hasTip') && !e.target.closest('[data-tip]')) hideTip();
  });
}
