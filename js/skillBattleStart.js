// Начало нового боя: стартовые пассивные эффекты (мана) и «Пометки на полях» с прошлых боёв (щит).
function skillBattleStart() {
  const sk = battle.skill;
  const hero = battle.hero;
  for (const e of hasPassive('start'))
    if (e.give === 'mana') hero.mana[e.gem] = Math.min(hero.manaMax || MANA_MAX, hero.mana[e.gem] + e.value);
  for (const e of hasPassive('afterActive')) if (e.first) sk.pendingPct = Math.max(sk.pendingPct, e.pct);
  const pg = paragonBonus(); // реестр: стартовая мана и щит
  for (const gem in pg.mana) hero.mana[gem] = Math.min(hero.manaMax || MANA_MAX, (hero.mana[gem] || 0) + pg.mana[gem]);
  if (pg.shieldStart) hero.shield = Math.min(hero.maxShield, Math.round(hero.maxShield * pg.shieldStart / 100));
  const notes = battle.save.notes || 0;
  if (notes && hasPassive('notes').length) {
    hero.shield = Math.min(hero.maxShield, hero.shield + notes * hero.shieldPerGem);
    battle.save.notes = 0;
    saveSlot(battle.slot, battle.save);
    showToast(tr("ui.Пометки на полях: +") + notes * hero.shieldPerGem + tr("ui. щита"), 2000);
  }
}
