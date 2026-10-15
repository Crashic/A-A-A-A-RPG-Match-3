// Игровое меню (макет «Агитпроп», вариант «Пропуска»): слева мини-карточка героя, записка о текущем бое и большая
// «Вернуться в бой» (идёт бой) / «В бой» (карта врагов на последнем враге); справа пункты SIDE_MENU пропусками
// (иконка в золотом блоке + кремовый талон с названием и подсказкой). «Читер» и «Щиток» — квадратные кнопки в правом верхнем углу.
// Пункты — nav.sideMenu: замки сюжета (updateFeatureLocks), «!» (updateNotifyBadges) и стрелки сюжета работают как в столбце меню.
const HUB_CORNER_ACTS = ['cheat', 'settings'];
function renderHub() {
  const box = document.getElementById('hubBody');
  box.innerHTML = '';
  const hero = loadSlot(getActiveSlot());
  const live = hubBattleLive();
  const left = document.createElement('div');
  left.className = 'hubLeft';
  if (hero) left.appendChild(hubHeroCard(hero));
  left.appendChild(hubBattleNote(live));
  if (live || storyFeatureOpen('map', hero)) {
    const fight = document.createElement('button');
    fight.type = 'button';
    fight.id = 'hubFight';
    fight.className = 'btn green hubFight';
    fight.innerHTML = MAP_ICON + '<span></span>';
    fight.lastChild.textContent = live ? tr("ui.Вернуться в бой") : tr("ui.В бой");
    fight.addEventListener('click', () => { vibrate(); if (live) enterGame(); else openMap(); });
    left.appendChild(fight);
  }
  const nav = document.createElement('nav');
  nav.className = 'sideMenu hubMenu';
  const corner = document.createElement('nav');
  corner.className = 'sideMenu hubCorner';
  for (const it of SIDE_MENU) {
    const b = document.createElement('button');
    b.type = 'button';
    b.dataset.act = it.act;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); sideMenuAction(it.act); });
    if (HUB_CORNER_ACTS.includes(it.act)) {
      b.className = 'btn stone square hubCornerBtn';
      b.setAttribute('aria-label', it.label);
      b.dataset.tip = it.tip;
      b.innerHTML = it.icon();
      corner.appendChild(b);
      continue;
    }
    b.className = 'hubItem';
    b.innerHTML = '<span class="hubIco">' + it.icon() + '</span><span class="hubTicket"><b></b><small></small></span>';
    b.querySelector('b').textContent = it.label;
    b.querySelector('small').textContent = hubItemSub(it);
    nav.appendChild(b);
  }
  box.append(left, nav, corner);
  updateFeatureLocks(hero);
  updateNotifyBadges();
}
