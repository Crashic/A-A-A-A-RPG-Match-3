// Можно ли создать персонажа из черновика. Возвращает { ok, reason } — reason показывается под кнопкой.
function canCreateHero(d) {
  if (!d.classId || !raceClasses(d.raceId, d.factionId)[d.classId])
    return { ok: false, reason: 'Таких выживших не существует' };
  if (!d.name || !d.name.trim()) return { ok: false, reason: 'Введите имя' };
  if (!d.genderId) return { ok: false, reason: 'Выберите пол' };
  return { ok: true, reason: '' };
}
