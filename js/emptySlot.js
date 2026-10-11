// Пустой слот (снаряжение, руна, сумка, ячейка инвентаря): квадрат с пунктиром и подписью внутри.
// kind — класс оформления ('gear', 'rune', 'bag', 'cell'), label — подпись, tip — текст подсказки.
function emptySlot(kind, label, tip) {
  const s = document.createElement('span');
  s.className = 'slot ' + kind;
  if (label) {
    const l = document.createElement('small');
    l.textContent = label;
    s.appendChild(l);
  }
  if (tip) attachTip(s, label || 'Пустая ячейка', tip);
  return s;
}
