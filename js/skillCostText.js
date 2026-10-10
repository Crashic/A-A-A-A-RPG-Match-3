// Подпись цены активного навыка: «8 Металла», «10 Плёнки» или «бесплатно».
function skillCostText(skill) {
  const names = { sapphire: 'Металла', amethyst: 'Плёнки' };
  const parts = Object.entries(skill.cost || {}).map(([gem, n]) => n + ' ' + names[gem]);
  return parts.length ? parts.join(' + ') : 'бесплатно';
}
