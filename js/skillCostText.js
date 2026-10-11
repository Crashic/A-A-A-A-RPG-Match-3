// Подпись цены активного навыка: «8 Металла», «10 Плёнки», «6 Трав» или «бесплатно».
function skillCostText(skill) {
  const names = { sapphire: 'Металла', emerald: 'Трав', amethyst: 'Плёнки' };
  const parts = Object.entries(skill.cost || {}).map(([gem, n]) => n + ' ' + names[gem]);
  return parts.length ? parts.join(' + ') : 'бесплатно';
}
