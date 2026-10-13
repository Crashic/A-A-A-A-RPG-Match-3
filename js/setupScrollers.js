// Все прокручиваемые списки и окна игры — без полосы прокрутки, со стрелками (setupScrollArrows):
// и уже существующие (SCROLLERS), и появляющиеся позже (класс arrowList у созданного элемента).
const SCROLLERS = ['#zoneList', '#enemyList', '#glossaryTabs', '#glossaryPage', '#slotList', '.settingsList',
  '#changelogList', '#cheatBody', '#enemyInfoBody', '#itemInfoBody', '#gemLegendList', '#charLeft', '#charRight', '#shopLeft', '#shopRight', '#questsLeft', '#questsRight', '#bunkerBody', '.campGrid', '#createLeft'];
function setupScrollers() {
  for (const sel of SCROLLERS) document.querySelectorAll(sel).forEach(setupScrollArrows);
  document.querySelectorAll('.arrowList').forEach(setupScrollArrows);
  new MutationObserver(list => {
    for (const m of list) for (const n of m.addedNodes) {
      if (n.nodeType !== 1) continue;
      if (n.matches('.arrowList') && !n.dataset.arrows) setupScrollArrows(n);
      n.querySelectorAll && n.querySelectorAll('.arrowList:not([data-arrows])').forEach(setupScrollArrows);
    }
  }).observe(document.body, { childList: true, subtree: true });
}
