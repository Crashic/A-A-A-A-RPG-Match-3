// Сколько опыта нужно до следующего уровня (на 60-м — 0, дальше расти некуда).
function xpToNext(level) {
  return level >= MAX_LEVEL ? 0 : XP_TO_LEVEL[level];
}
