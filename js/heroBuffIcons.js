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
  if (race && bonus) add(race.icon, race.color, tr("ui.Бонус расы · ") + race.name, bonus.text + (bonus.gem ? tr("ui. (работает в бою).") : tr("ui. (пока без эффекта в бою).")));
  const cls = findById(CLASSES, save.classId);
  for (const s of heroSkills(save).filter(s => s.type === 'passive'))
    add(cls ? cls.icon : 'stamp', cls ? cls.color : 'var(--gem-amethyst)', s.name + tr("ui. · пассивный"), s.text);
  for (const w of sk.wards || [])
    add('shield', 'var(--gem-sapphire)', tr("ui.Защита · бафф"), tr("ui.Удары врага слабее на ") + w.pct + ' %' + ('turns' in w ? tr("ui., ещё ходов врага: ") + w.turns : tr("ui., ещё ударов: ") + w.hits) + '.', 'buff');
  if (sk.buff && sk.buff.turns > 0)
    add('fist', 'var(--gem-ruby)', tr("ui.Усиление · бафф"), tr("ui.Ваши серии сильнее на ") + sk.buff.pct + tr("ui. %, ещё ходов: ") + sk.buff.turns + '.', 'buff');
  if (sk.pendingPct)
    add('fist', 'var(--gem-topaz)', tr("ui.Следующая серия · бафф"), tr("ui.Следующая серия сильнее на ") + sk.pendingPct + ' %.', 'buff');
  if (heroTwoHanded(save)) add('fist', sk.swingCd > 0 ? 'var(--ui-metal)' : 'var(--gem-ruby)',
    sk.swingCd > 0 ? tr("ui.Замах · перезарядка удара") : tr("ui.Двуручное · готово"),
    sk.swingCd > 0 ? tr("ui.Вы уже ударили двуручным: в этот ход Топливо урона не даёт. Следующий ход — снова удар.")
      : tr("ui.Двуручное оружие готово: Топливо бьёт в полную силу (×") + TWO_HAND_MULT + tr("ui. свойств). После удара — ход на замах."),
    sk.swingCd > 0 ? 'debuff swingCd' : 'buff');
  if (sk.weaken && sk.weaken.turns > 0)
    add('fist', 'var(--gem-amethyst)', tr("ui.Ослабление · дебафф"), tr("ui.Враг ослабил ваши удары на ") + sk.weaken.pct + tr("ui. %, ещё ваших ходов: ") + sk.weaken.turns + '.', 'debuff');
  return out;
}
