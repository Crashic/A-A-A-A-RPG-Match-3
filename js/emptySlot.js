// Пустой слот (снаряжение, руна, сумка, ячейка инвентаря): квадрат с пунктиром и бледным значком
// того, что сюда надевается (slotIcon); название — в подсказке. kind — вид слота (head, ring, weapon,
// rune, bag, cell…), tip — текст подсказки.
function emptySlot(kind, tip) {
  const s = document.createElement('span');
  s.className = 'invSlot ' + kind + (DOLL_SLOTS.left.includes(kind) || DOLL_SLOTS.right.includes(kind) ? ' gear' : '');
  s.innerHTML = slotIcon(kind);
  if (tip) attachTip(s, SLOT_NAMES[kind] || tr("ui.Пустая ячейка"), tip);
  return s;
}
