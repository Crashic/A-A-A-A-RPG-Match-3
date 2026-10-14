// Цвет локации в списке для героя (по обычным врагам, элита и боссы не в счёт): уровень героя выше всех —
// зелёная (легко), внутри разброса — оранжевая (по силам), ниже самого слабого — красная (рано).
function zoneColor(heroLevel, zone) {
  const r = zoneRange(zone);
  if (heroLevel > r.max) return 'green';
  if (heroLevel >= r.min) return 'orange';
  return 'red';
}
