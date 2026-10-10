// Ищет запись справочника (CLASSES, RACES, …) по id; null, если нет.
function findById(list, id) {
  return list.find(item => item.id === id) || null;
}
