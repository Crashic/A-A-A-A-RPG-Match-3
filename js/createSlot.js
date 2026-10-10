// Записывает нового персонажа в ячейку n и возвращает его.
function createSlot(n, hero) {
  const data = Object.assign({ created: Date.now() }, hero);
  saveSlot(n, data);
  return data;
}
