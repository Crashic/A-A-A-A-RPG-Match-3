// Значок квестового предмета (как ячейка вещи, золотая рамка); подсказка — название и описание.
function questItemCell(q) {
  const s = document.createElement('button');
  s.type = 'button';
  s.className = 'invSlot item cell questItem';
  s.dataset.quest = q.id;
  s.innerHTML = slotIcon(q.slot);
  s.dataset.tipTitle = q.name;
  s.dataset.tip = q.text;
  return s;
}
