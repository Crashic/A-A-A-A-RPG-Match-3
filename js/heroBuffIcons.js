// Иконки слева от навыков героя: бонус расы к классу, пассивные навыки и действующие сейчас
// баффы/дебаффы (защита от навыков, усиление серий, ослабление от врага). У каждой — подсказка.
// Возвращает массив элементов.
function heroBuffIcons() {
  const out = [];
  const save = battle.save;
  const sk = battle.skill;
  const add = (iconKey, color, title, text, extra) => {
    const el = document.createElement('span');
    el.className = 'passiveIcon' + (extra ? ' ' + extra : '');
    el.innerHTML = iconTile(iconKey, color);
    el.setAttribute('aria-label', title);
    attachTip(el, title, text);
    out.push(el);
  };
  const race = findById(RACES, save.raceId);
  const bonus = raceClasses(save.raceId)[save.classId];
  if (race && bonus) add(race.icon, race.color, 'Бонус расы · ' + race.name, bonus.text + (bonus.gem ? ' (работает в бою).' : ' (пока без эффекта в бою).'));
  const cls = findById(CLASSES, save.classId);
  for (const s of heroSkills(save).filter(s => s.type === 'passive'))
    add(cls ? cls.icon : 'stamp', cls ? cls.color : 'var(--gem-amethyst)', s.name + ' · пассивный', s.text);
  for (const w of sk.wards || [])
    add('shield', 'var(--gem-sapphire)', 'Защита · бафф', 'Удары врага слабее на ' + w.pct + ' %' + ('turns' in w ? ', ещё ходов врага: ' + w.turns : ', ещё ударов: ' + w.hits) + '.', 'buff');
  if (sk.buff && sk.buff.turns > 0)
    add('fist', 'var(--gem-ruby)', 'Усиление · бафф', 'Ваши серии сильнее на ' + sk.buff.pct + ' %, ещё ходов: ' + sk.buff.turns + '.', 'buff');
  if (sk.pendingPct)
    add('fist', 'var(--gem-topaz)', 'Следующая серия · бафф', 'Следующая серия сильнее на ' + sk.pendingPct + ' %.', 'buff');
  if (sk.weaken && sk.weaken.turns > 0)
    add('fist', 'var(--gem-amethyst)', 'Ослабление · дебафф', 'Враг ослабил ваши удары на ' + sk.weaken.pct + ' %, ещё ваших ходов: ' + sk.weaken.turns + '.', 'debuff');
  return out;
}
