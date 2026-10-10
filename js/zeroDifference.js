// WoW Classic: «нулевая разница» — на сколько уровней враг может быть слабее, пока даёт опыт.
function zeroDifference(level) {
  if (level <= 7) return 5;
  if (level <= 9) return 6;
  if (level <= 11) return 7;
  if (level <= 15) return 8;
  if (level <= 19) return 9;
  if (level <= 29) return 11;
  if (level <= 39) return 12;
  if (level <= 44) return 13;
  if (level <= 49) return 14;
  if (level <= 54) return 15;
  if (level <= 59) return 16;
  return 17;
}
