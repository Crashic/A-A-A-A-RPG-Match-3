// Подпись цены активного навыка: «8 Металла», «10 Плёнки», «6 Трав» или «бесплатно»;
// с перезарядкой — «· перезарядка 3 хода».
function skillCostText(skill) {
  const names = { sapphire: tr("ui.Металла"), emerald: tr("ui.Трав"), amethyst: tr("ui.Плёнки") };
  const parts = Object.entries(skill.cost || {}).map(([gem, n]) => n + ' ' + names[gem]);
  const cost = parts.length ? parts.join(' + ') : tr("ui.бесплатно");
  return cost + (skill.cooldown ? tr("ui. · перезарядка ") + skill.cooldown + ' ' + (skill.cooldown < 5 ? tr("ui.хода") : tr("ui.ходов")) : '');
}
