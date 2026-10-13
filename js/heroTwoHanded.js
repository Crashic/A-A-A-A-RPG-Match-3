// Держит ли герой двуручное оружие (оно всегда в weapon1).
function heroTwoHanded(hero) {
  return isTwoHanded(hero && hero.gear && hero.gear.weapon1);
}
