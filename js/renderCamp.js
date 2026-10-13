// Экран «Лагерь»: вступление и карточки построек (CAMP_BUILDINGS) — пока все «Скоро».
function renderCamp() {
  const box = document.getElementById('campBody');
  box.innerHTML = '<div class="panel bunkerIntro"><h3>Лагерь</h3><p></p></div><div class="campGrid"></div>';
  box.querySelector('.bunkerIntro p').textContent = CAMP_TEXT;
  const grid = box.querySelector('.campGrid');
  for (const b of CAMP_BUILDINGS) {
    const c = document.createElement('div');
    c.className = 'campCard';
    c.innerHTML = iconTile(b.icon, b.color) + '<div><h4></h4><p></p></div><span class="campSoon">Скоро</span>';
    c.querySelector('h4').textContent = b.name;
    c.querySelector('p').textContent = b.text;
    grid.appendChild(c);
  }
}
