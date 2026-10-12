// Разброс случайного свойства [от, до] на уровне предмета level (уникальные берут «до» как единицу силы).
function itemAffixRange(level) {
  return [Math.max(1, Math.round(level / 12)), 2 + Math.round(level / 7)];
}
