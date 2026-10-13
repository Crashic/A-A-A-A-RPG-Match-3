// Можно ли создать персонажа из черновика. Возвращает { ok, reason } — reason показывается под кнопкой.
function canCreateHero(d) {
  if (!d.classId || !raceClasses(d.raceId)[d.classId])
    return { ok: false, reason: tr("ui.Таких выживших не существует") };
  if (!d.name || !d.name.trim()) return { ok: false, reason: tr("ui.Введите имя") };
  if (!d.genderId) return { ok: false, reason: tr("ui.Выберите пол") };
  return { ok: true, reason: '' };
}
