// Удаляет все ячейки сохранений и выбирает первую.
function resetAllSaves() {
  for (let n = 1; n <= SLOT_COUNT; n++) deleteSlot(n);
  setActiveSlot(1);
}
