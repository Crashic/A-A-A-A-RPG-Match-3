// Позиция клетки (строки или столбца) от края поля в px. Может быть отрицательной — над полем.
function cellOffset(i) {
  return BOARD_PAD + i * (match3.layout.cell + BOARD_GAP);
}
