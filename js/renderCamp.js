// Экран «Лагерь» (макет «Лагерь»): сетка карточек построек (CAMP_BUILDINGS) — золотая плитка со значком (ico),
// название, подпись (sub) и кнопка: работающие — зелёная «Открыть», остальные — синяя «Скоро» (или «Закрыто»)
// со штампом «В планах пятилетки» и в серых тонах. Внизу — строка ресурсов лагеря.
function renderCamp() {
  const box = document.getElementById('campBody');
  box.innerHTML = '<div class="campGrid"></div>';
  const grid = box.querySelector('.campGrid');
  for (const b of CAMP_BUILDINGS) {
    const works = b.open && b.unlocked();
    const c = document.createElement('div');
    c.className = 'panel campCard' + (works ? ' open' : ' soon');
    c.dataset.card = b.id;
    c.dataset.tipTitle = b.name;
    c.dataset.tip = b.text;
    c.innerHTML = '<span class="campIco"><svg aria-hidden="true" viewBox="0 0 24 24"><path fill-rule="evenodd"></path></svg></span>' +
      '<h4></h4><small></small><button type="button" class="btn campOpen"></button>' +
      (works ? '' : '<span class="campStamp"></span>');
    c.querySelector('path').setAttribute('d', b.ico || '');
    c.querySelector('h4').textContent = b.name;
    c.querySelector('small').textContent = b.sub || '';
    const btn = c.querySelector('.btn');
    btn.classList.add(works ? 'green' : 'blue');
    btn.textContent = works ? tr("ui.Открыть") : b.open ? tr("ui.Закрыто") : tr("ui.Скоро");
    btn.disabled = !works;
    if (works) btn.addEventListener('click', e => { e.stopPropagation(); vibrate(); b.open(); });
    else c.querySelector('.campStamp').textContent = tr("ui.В планах пятилетки");
    grid.appendChild(c);
  }
  box.appendChild(campResourceRow());
  updateFeatureLocks();
}
