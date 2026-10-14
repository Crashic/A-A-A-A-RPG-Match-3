// Запись перехода на экран id в историю. Игровые экраны (HUB_CHILDREN; настройки — если открыты из игры) всегда лежат
// одним слоем поверх игрового меню: [меню, hub, экран] — следующий игровой экран заменяет предыдущий,
// поэтому «назад» ведёт в игровое меню, а не в прошлый экран (и не обратно в бой). Остальные экраны — как раньше, +1 шаг.
function navPush(id) {
  const st = history.state || {};
  const cur = st.screen || 'menu';
  const d = st.depth || 0;
  const isChild = s => HUB_CHILDREN.includes(s);
  const inGame = cur === 'hub' || isChild(cur) || (cur === 'settings' && d >= 2);
  if (id === 'hub') {
    if (cur === 'hub') return;
    if (inGame) { navPush.keepModal = true; history.back(); return; } // на запись игрового меню ниже (popstate её нарисует)
    if (cur === 'menu') history.pushState({ screen: 'hub', depth: 1 }, '');
    else history.replaceState({ screen: 'hub', depth: Math.max(1, d) }, ''); // создание, заставка — заменить
    return;
  }
  if (isChild(id) || (id === 'settings' && inGame)) {
    if (cur === 'hub') history.pushState({ screen: id, depth: d + 1 }, '');
    else if (inGame) history.replaceState({ screen: id, depth: d }, '');
    else { // из главного меню, создания или заставки — сначала игровое меню под экраном
      if (cur === 'menu') history.pushState({ screen: 'hub', depth: 1 }, '');
      else history.replaceState({ screen: 'hub', depth: Math.max(1, d) }, '');
      history.pushState({ screen: id, depth: navDepth() + 1 }, '');
    }
    return;
  }
  history.pushState({ screen: id, depth: d + 1 }, ''); // depth — шагов от меню (goHome)
}
