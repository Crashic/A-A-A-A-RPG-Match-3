// WoW Classic: враги этого уровня и ниже «серые» — опыта не дают.
function grayLevel(level) {
  if (level <= 5) return 0;
  if (level <= 39) return level - Math.floor(level / 10) - 5;
  if (level <= 59) return level - Math.floor(level / 5) - 1;
  return level - 9;
}
