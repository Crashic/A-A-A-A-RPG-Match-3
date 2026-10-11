// Можно ли сейчас менять характеристики: в бою — нельзя, кроме включённого режима читов (settings.cheatsOn).
function statsLocked() {
  return !!(battle && !battle.over) && !settings.cheatsOn;
}
