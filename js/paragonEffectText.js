// Что даёт ранг узла реестра: «+1 Сила», «+3 % здоровья», навык…
function paragonEffectText(n) {
  const v = n.value;
  if (n.kind === 'stat') return '+' + v + ' ' + (findById(STATS, n.stat) || {}).name;
  if (n.kind === 'hpPct') return '+' + v + tr("ui. % здоровья");
  if (n.kind === 'atkPct') return '+' + v + tr("ui. % к силе удара");
  if (n.kind === 'critPct') return '+' + v + tr("ui. % шанс крита");
  if (n.kind === 'ini') return '+' + v + ' ' + INI_NAME;
  if (n.kind === 'shieldStart') return tr("ui.начало боя со щитом ") + v + tr("ui. % от максимума");
  if (n.kind === 'manaStart') return '+' + v + ' ' + gemName(n.gem) + tr("ui. (маны) в начале боя");
  if (n.kind === 'tapePct') return '+' + v + tr("ui. % изоленты с Радиации");
  if (n.kind === 'xpPct') return '+' + v + tr("ui. % опыта с Документов");
  if (n.kind === 'active') return tr("ui.навык «") + n.skill.name + '»: ' + n.skill.text;
  return '';
}
