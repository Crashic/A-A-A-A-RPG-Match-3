// «Быстрая настойка»: превращает n фишек подряд (по строке или столбцу) в тип type,
// чтобы точно сложилась серия. Возвращает список изменённых клеток.
function convertLine(type, n) {
  const size = BOARD_SIZE;
  const lines = [];
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++) {
      if (c + n <= size) lines.push(Array.from({ length: n }, (_, k) => [r, c + k]));
      if (r + n <= size) lines.push(Array.from({ length: n }, (_, k) => [r + k, c]));
    }
  // случайная линия, где все фишки другого типа — превращаются ровно n штук
  lines.sort(() => Math.random() - 0.5);
  const line = lines.find(l => l.every(([r, c]) => match3.grid[r][c] !== type)) || lines[0];
  for (const [r, c] of line) setGemType(r, c, type);
  return line;
}
