// Иконки справа от навыка врага (зеркально герою): навык из списка автора (пассивный), элита,
// и действующие на врага эффекты — ваши защиты ослабляют его удары (дебафф врага).
function enemyBuffIcons() {
  const out = [];
  const found = findEnemy(battle.enemyId);
  if (!found) return out;
  const e = found.enemy;
  const add = (iconKey, color, title, text, extra) => {
    const el = document.createElement('span');
    el.className = 'passiveIcon' + (extra ? ' ' + extra : '');
    el.innerHTML = iconTile(iconKey, color);
    el.setAttribute('aria-label', title);
    attachTip(el, title, text);
    out.push(el);
  };
  if (e.skill) add('eye', 'var(--gem-ruby)', e.skill + tr("ui. · пассивный"), e.short + ' ' + e.description + tr("ui. (в бою пока не работает)"));
  if (e.elite) add('fist', 'var(--gem-topaz)', tr("ui.Элита · бафф"), tr("ui.Здоровье ×") + ELITE_HP + tr("ui., урон ×") + ELITE_ATK + tr("ui., опыт за победу ×2."), 'buff');
  for (const w of battle.skill.wards || [])
    add('shield', 'var(--gem-sapphire)', tr("ui.Ваша защита · дебафф"), tr("ui.Его удары слабее на ") + w.pct + ' %' + ('turns' in w ? tr("ui., ещё его ходов: ") + w.turns : tr("ui., ещё ударов: ") + w.hits) + '.', 'debuff');
  return out;
}
