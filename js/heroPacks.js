// Гнёзда и надетые сумки героя (hero.packs). У старых персонажей создаёт: авоська в первом гнезде,
// а если вещей больше, чем в неё влезает, — «Чемодан из прошлой жизни» во втором (чтобы ничего не пропало).
// Меняет hero — после вызова сохранять, если нужно.
function heroPacks(hero) {
  if (!hero.packs) {
    const worn = [makeBag(BAG_START_TYPE)];
    const extra = ((hero.bag && hero.bag.length) || 0) - worn[0].size;
    worn.push(extra > 0 ? makeBag('legacy', extra) : null);
    while (worn.length < BAG_NESTS_START) worn.push(null);
    hero.packs = { nests: BAG_NESTS_START, worn };
  }
  const p = hero.packs;
  while (p.worn.length < p.nests) p.worn.push(null);
  return p;
}
