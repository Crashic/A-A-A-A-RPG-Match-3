// Подпись цены активного навыка: «8 Металла», «10 Плёнки», «6 Трав» или «бесплатно»;
// с перезарядкой — «· перезарядка 3 хода».
function skillCostText(skill) {
  const names = { sapphire: 'Металла', emerald: 'Трав', amethyst: 'Плёнки' };
  const parts = Object.entries(skill.cost || {}).map(([gem, n]) => n + ' ' + names[gem]);
  const cost = parts.length ? parts.join(' + ') : 'бесплатно';
  return cost + (skill.cooldown ? ' · перезарядка ' + skill.cooldown + ' ' + (skill.cooldown < 5 ? 'хода' : 'ходов') : '');
}
