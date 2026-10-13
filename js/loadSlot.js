// Возвращает персонажа из ячейки n или null, если ячейка пустая.
// Записи без класса — заготовки старых версий, их не считаем персонажами.
// У персонажей старых версий нет уровня, опыта и изоленты — подставляем начальные
// (золото версии 0.2.0 переходит в белую изоленту). Без сумок — выдаются сумки (heroPacks) и сразу сохраняются.
function loadSlot(n) {
  let save = null;
  try { save = JSON.parse(localStorage.getItem(slotKey(n))); } catch (e) {}
  if (!save || !save.classId) return null;
  if (save.tape === undefined) save.tape = save.gold || 0;
  delete save.gold;
  if (save.raceId === 'press') save.factionId = 'press'; // в 0.3.0 Пресса была при Совете/Союзе
  const hero = Object.assign({ level: 1, xp: 0, tape: 0, lastEnemy: null }, save);
  if (!hero.packs) { // до сумок: выдать авоську (и чемодан под старые вещи) и сразу записать
    heroPacks(hero);
    try { localStorage.setItem(slotKey(n), JSON.stringify(Object.assign(save, { packs: hero.packs }))); } catch (e) {}
  }
  return hero;
}
