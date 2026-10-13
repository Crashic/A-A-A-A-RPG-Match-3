// «Начать игру» / «Продолжить»: без персонажа в выбранной ячейке — создание персонажа, с незаконченным боем — бой, иначе — лагерь (или карта).
function startGame() {
  const n = getActiveSlot();
  const hero = loadSlot(n);
  if (!hero) { openCharacterCreation(n, 'game'); return; }
  saveSlot(n, hero); // обновляет дату последней игры
  if (loadBattle(n)) enterGame(); // незаконченный бой — продолжить
  else goHomeBase();          // иначе — домой: лагерь или карта
}
