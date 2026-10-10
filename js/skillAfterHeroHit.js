// После удара по игроку: разовые спасения — лечение при низком здоровье, щит при пробитом щите.
function skillAfterHeroHit() {
  const sk = battle.skill;
  const hero = battle.hero;
  if (hero.hp <= 0) return;
  for (const e of hasPassive('lowHp')) {
    const key = 'lowHp:' + e.below;
    if (sk.triggered[key] || hero.hp >= hero.maxHp * e.below / 100) continue;
    sk.triggered[key] = true;
    const add = Math.min(hero.maxHp - hero.hp, Math.round(hero.maxHp * e.healPct / 100));
    hero.hp += add;
    showFloat('hero', '+' + add, 'heal');
  }
  for (const e of hasPassive('shieldBroken')) {
    if (sk.triggered.shieldBroken || hero.shield > 0) continue;
    sk.triggered.shieldBroken = true;
    hero.shield = Math.min(hero.maxShield, e.gems * hero.shieldPerGem);
    showFloat('hero', '+' + hero.shield + ' щит', 'shield');
  }
}
