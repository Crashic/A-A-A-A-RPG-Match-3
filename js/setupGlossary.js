// Кнопки глоссария и подсказки «Фишки»: в меню, в бою; подсказка закрывается крестиком,
// касанием мимо окна, а «Весь глоссарий» открывает книгу на разделе «Фишки».
function setupGlossary() {
  const on = (id, fn) => document.getElementById(id).addEventListener('click', () => { vibrate(); fn(); });
  on('btnGlossaryGame', () => openGlossary());
  on('gameToMenu', goHome); // меню боя → сразу в главное меню
  on('btnLegend', openGemLegend);
  on('gemLegendClose', closeGemLegend);
  on('gemLegendMore', () => openGlossary('gems'));
  document.getElementById('gemLegend').addEventListener('click', e => {
    if (e.target.id === 'gemLegend') closeGemLegend();
  });
}
