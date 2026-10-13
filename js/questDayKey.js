// «Игровой день» ежедневных заданий: дата, сдвинутая на QUEST_DAILY_RESET_HOUR (до 6:00 — ещё вчера).
function questDayKey(time = Date.now()) {
  const d = new Date(time - QUEST_DAILY_RESET_HOUR * 3600 * 1000);
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
}
