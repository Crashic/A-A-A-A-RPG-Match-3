// Экран «Персонажи»: персонажи столбиком (с прокруткой), по одной в ряд — имя и уровень; под списком —
// кнопка «Создать нового персонажа» (#createNewHero, пока есть свободная ячейка, со счётчиком N / SLOT_COUNT). Касание по персонажу делает его текущим,
// по пустой ячейке — открывает создание персонажа, крестик удаляет персонажа.
function renderCharacters() {
  const list = document.getElementById('slotList');
  const active = getActiveSlot();
  list.innerHTML = '';
  let free = 0; // первая пустая ячейка — для кнопки «Создать нового персонажа» внизу
  for (let n = 1; n <= SLOT_COUNT; n++) {
    const hero = loadSlot(n);
    if (!hero) { free = free || n; continue; }
    const card = document.createElement('div');
    card.className = 'slot' + (hero && n === active ? ' active' : '') + (hero ? '' : ' empty');

    const info = document.createElement('button');
    info.type = 'button';
    info.className = 'slotInfo';
    const title = document.createElement('b');
    title.textContent = hero ? hero.name : '+ Создать персонажа';
    const sub = document.createElement('span');
    sub.textContent = hero ? heroServerText(hero) + ' · Уровень ' + hero.level : countHeroes() + ' / ' + SLOT_COUNT; // только имя и уровень
    info.append(title, sub);
    info.addEventListener('click', () => {
      vibrate();
      if (hero) { setActiveSlot(n); renderCharacters(); }
      else openCharacterCreation(n, 'characters'); // текущей станет после «Создать»
    });
    card.appendChild(info);

    if (hero) {
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'btn red round close slotDelete';
      del.setAttribute('aria-label', 'Удалить персонажа');
      del.addEventListener('click', () => {
        vibrate();
        showConfirm('Удалить персонажа «' + hero.name + '»? Это нельзя отменить.', 'Удалить', () => {
          deleteSlot(n);
          renderCharacters();
          showToast('Персонаж удалён');
        });
      });
      card.appendChild(del);
    }
    list.appendChild(card);
  }
  const btn = document.getElementById('createNewHero');
  btn.hidden = !free;
  btn.querySelector('small').textContent = countHeroes() + ' / ' + SLOT_COUNT;
  btn.onclick = () => { vibrate(); openCharacterCreation(free, 'characters'); };
}
