// Ставит столбец иконок меню (SIDE_MENU) под «назад» на игровых экранах (SIDE_MENU_SCREENS).
// Пункт текущего экрана подсвечен и не нажимается.
function setupSideMenus() {
  for (const id of SIDE_MENU_SCREENS) {
    const head = document.querySelector('#' + id + ' > .screenHead');
    if (!head) continue;
    const nav = document.createElement('nav');
    nav.className = 'mapMenu sideMenu';
    for (const it of SIDE_MENU) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn stone square' + (it.screens.includes(id) ? ' current' : '');
      b.setAttribute('aria-label', it.label);
      b.dataset.tip = it.tip;
      b.dataset.act = it.act;
      b.innerHTML = it.icon();
      if (it.screens.includes(id)) b.disabled = true;
      else b.addEventListener('click', e => { e.stopPropagation(); vibrate(); sideMenuAction(it.act); });
      nav.appendChild(b);
    }
    head.appendChild(nav);
  }
}
