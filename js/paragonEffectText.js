// Что даёт ранг узла реестра: «+1 Сила», «+3 % здоровья», навык…
function paragonEffectText(n) {
  const v = n.value;
  if (n.kind === 'stat') return '+' + v + ' ' + (findById(STATS, n.stat) || {}).name;
  if (n.kind === 'hpPct') return '+' + v + ' % здоровья';
  if (n.kind === 'atkPct') return '+' + v + ' % к силе удара';
  if (n.kind === 'critPct') return '+' + v + ' % шанс крита';
  if (n.kind === 'ini') return '+' + v + ' ' + INI_NAME;
  if (n.kind === 'shieldStart') return 'начало боя со щитом ' + v + ' % от максимума';
  if (n.kind === 'manaStart') return '+' + v + ' ' + gemName(n.gem) + ' (маны) в начале боя';
  if (n.kind === 'tapePct') return '+' + v + ' % изоленты с Радиации';
  if (n.kind === 'xpPct') return '+' + v + ' % опыта с Документов';
  if (n.kind === 'active') return 'навык «' + n.skill.name + '»: ' + n.skill.text;
  return '';
}
