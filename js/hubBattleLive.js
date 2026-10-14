// Есть незаконченный бой (в памяти или в сохранении) — в игровом меню кнопка «Вернуться в бой».
function hubBattleLive() {
  if (battle && !battle.over) return true;
  return !!loadBattle(getActiveSlot());
}
