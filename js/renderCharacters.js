// Экран «Персонажи» (макет «Персонажи»): карточки героев в ряд (прокрутка вбок) — портрет-силуэт на фоне цвета расы,
// имя, «класс · фракция», плашка уровня; у текущего — светящаяся рамка и зелёная «Играть», у остальных — синяя «Выбрать».
// Последняя карточка — пунктирная «Новый герой» со счётчиком свободных ячеек. Под рядом — красная «Удалить героя» (текущего).
const HERO_SILHOUETTE = '<svg aria-hidden="true" viewBox="0 0 100 130"><circle cx="50" cy="40" r="22"/><path d="M10 130 Q10 70 50 66 Q90 70 90 130Z"/></svg>';

function renderCharacters() {
  const list = document.getElementById('slotList');
  const active = getActiveSlot();
  list.innerHTML = '';
  let free = 0, freeCount = 0;
  for (let n = 1; n <= SLOT_COUNT; n++) {
    const hero = loadSlot(n);
    if (!hero) { free = free || n; freeCount++; continue; }
    const race = findById(RACES, hero.raceId);
    const cls = findById(CLASSES, hero.classId);
    const fac = findById(FACTIONS, hero.factionId);
    const card = document.createElement('div');
    card.className = 'panel heroSlot' + (n === active ? ' active' : '');
    card.innerHTML = '<span class="hsPortrait">' + HERO_SILHOUETTE + '</span><b></b><span class="hsSub"></span><span class="hsLvl"></span>' +
      '<button type="button" class="btn"></button>';
    card.querySelector('.hsPortrait').style.setProperty('--race', race ? race.color : 'var(--ui-ribbon)');
    card.querySelector('b').textContent = hero.name;
    card.querySelector('.hsSub').textContent = (cls ? cls.name : '') + ' · ' + (fac ? fac.name : '');
    card.querySelector('.hsLvl').textContent = tr("ui.Уровень ") + hero.level;
    const btn = card.querySelector('.btn');
    btn.classList.add(n === active ? 'green' : 'blue');
    btn.textContent = n === active ? tr("ui.Играть") : tr("ui.Выбрать");
    btn.addEventListener('click', () => {
      vibrate();
      if (n === active) startGame();
      else { setActiveSlot(n); renderCharacters(); }
    });
    list.appendChild(card);
  }
  if (free) {
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'heroSlot heroNew';
    add.innerHTML = '<span class="hnPlus"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"/></svg></span><b></b><small></small>';
    add.querySelector('b').textContent = tr("ui.Новый герой");
    add.querySelector('small').textContent = tr("ui.Свободно слотов: ") + freeCount;
    add.addEventListener('click', () => { vibrate(); openCharacterCreation(free, 'characters'); });
    list.appendChild(add);
  }
  const del = document.getElementById('deleteHero');
  const cur = loadSlot(active);
  del.hidden = !cur;
  del.onclick = () => {
    if (!cur) return;
    vibrate();
    showConfirm(tr("ui.Удалить персонажа «") + cur.name + tr("ui.»? Это нельзя отменить."), tr("ui.Удалить"), () => {
      deleteSlot(active);
      renderCharacters();
      showToast(tr("ui.Персонаж удалён"));
    });
  };
}
