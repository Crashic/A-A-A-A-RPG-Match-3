// Экран «Лагерь»: вступление и карточки построек (CAMP_BUILDINGS): работающие — с «Открыть», остальные «Скоро».
function renderCamp() {
  const box = document.getElementById('campBody');
  box.innerHTML = '<div class="panel bunkerIntro"><h3>Лагерь</h3><p></p></div><div class="campGrid"></div>';
  box.querySelector('.bunkerIntro p').textContent = CAMP_TEXT;
  const grid = box.querySelector('.campGrid');
  for (const b of CAMP_BUILDINGS) {
    const c = document.createElement('div');
    c.className = 'campCard';
    const works = b.open && b.unlocked();
    c.className = 'campCard' + (works ? ' open' : '');
    c.innerHTML = iconTile(b.icon, b.color) + '<div><h4></h4><p></p></div>' +
      (works ? '' : '<span class="campSoon">' + (b.open ? 'Закрыто' : 'Скоро') + '</span>');
    c.querySelector('h4').textContent = b.name;
    c.querySelector('p').textContent = b.text;
    if (works) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'btn green campOpen';
      btn.textContent = 'Открыть';
      btn.addEventListener('click', e => { e.stopPropagation(); vibrate(); b.open(); });
      c.querySelector('div').appendChild(btn);
    }
    grid.appendChild(c);
  }
}
