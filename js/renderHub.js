// Игровое меню: сверху «Вернуться в бой» (идёт бой) или «В бой» (карта врагов на последнем враге), ниже — пункты SIDE_MENU.
// Пункты — nav.sideMenu: замки сюжета (updateFeatureLocks), «!» (updateNotifyBadges) и стрелки сюжета работают как в столбце меню.
function renderHub() {
  const box = document.getElementById('hubBody');
  box.innerHTML = '';
  const hero = loadSlot(getActiveSlot());
  const live = hubBattleLive();
  if (live || storyFeatureOpen('map', hero)) {
    const fight = document.createElement('button');
    fight.type = 'button';
    fight.id = 'hubFight';
    fight.className = 'btn ' + (live ? 'orange' : 'green') + ' hubFight';
    fight.innerHTML = MAP_ICON + '<span></span>';
    fight.lastChild.textContent = live ? tr("ui.Вернуться в бой") : tr("ui.В бой");
    fight.addEventListener('click', () => { vibrate(); if (live) enterGame(); else openMap(); });
    box.appendChild(fight);
  }
  const nav = document.createElement('nav');
  nav.className = 'sideMenu hubMenu';
  for (const it of SIDE_MENU) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn stone hubItem';
    b.dataset.act = it.act;
    b.innerHTML = it.icon() + '<span></span>';
    b.lastChild.textContent = it.label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); sideMenuAction(it.act); });
    nav.appendChild(b);
  }
  box.appendChild(nav);
  updateFeatureLocks(hero);
  updateNotifyBadges();
}
