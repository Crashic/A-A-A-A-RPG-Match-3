// Создаёт новое сохранение в ячейке n и возвращает его.
function createSlot(n) {
  const data = { name: 'Герой ' + n, created: Date.now() };
  saveSlot(n, data);
  return data;
}
