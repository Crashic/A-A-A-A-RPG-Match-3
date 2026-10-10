// Экран профиля: три ячейки сохранения. Касание выбирает ячейку, корзина удаляет сохранение.
function renderProfile() {
  const list = document.getElementById('slotList');
  const active = getActiveSlot();
  list.innerHTML = '';
  for (let n = 1; n <= SLOT_COUNT; n++) {
    const save = loadSlot(n);
    const card = document.createElement('div');
    card.className = 'slot' + (n === active ? ' active' : '') + (save ? '' : ' empty');

    const info = document.createElement('button');
    info.type = 'button';
    info.className = 'slotInfo';
    const title = document.createElement('b');
    title.textContent = save ? save.name : 'Пустая ячейка';
    const sub = document.createElement('span');
    sub.textContent = save ? 'Последняя игра: ' + formatDate(save.updated) : 'Ячейка ' + n;
    info.append(title, sub);
    info.addEventListener('click', () => {
      vibrate();
      setActiveSlot(n);
      renderProfile();
    });
    card.appendChild(info);

    if (save) {
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'slotDelete';
      del.textContent = '🗑';
      del.setAttribute('aria-label', 'Удалить сохранение');
      del.addEventListener('click', () => {
        vibrate();
        showConfirm('Удалить сохранение «' + save.name + '»? Это нельзя отменить.', 'Удалить', () => {
          deleteSlot(n);
          renderProfile();
          showToast('Сохранение удалено');
        });
      });
      card.appendChild(del);
    }
    list.appendChild(card);
  }
}
