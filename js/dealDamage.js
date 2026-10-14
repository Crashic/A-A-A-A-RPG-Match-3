// Урон бойцу: сначала поглощает щит, остаток — здоровье. Возвращает { shield, hp } — сколько снято.
function dealDamage(target, amount) {
  const toShield = Math.min(target.shield, amount);
  target.shield -= toShield;
  const toHp = Math.min(target.hp, amount - toShield);
  target.hp -= toHp;
  tutorialHpFloor(target);
  return { shield: toShield, hp: toHp };
}
