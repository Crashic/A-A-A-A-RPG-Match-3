// Сумма бонусов реестра для всех персонажей аккаунта: { str, agi, sta, int, spi, hpPct, atkPct, critPct, ini,
// shieldStart, mana: { gem: n }, tapePct, xpPct, skills: [навыки] }.
function paragonBonus() {
  const ranks = paragonRanks();
  const b = { str: 0, agi: 0, sta: 0, int: 0, spi: 0, hpPct: 0, atkPct: 0, critPct: 0, ini: 0, shieldStart: 0, mana: {}, tapePct: 0, xpPct: 0, skills: [] };
  for (const n of PARAGON_NODES) {
    const r = ranks[n.id] || 0;
    if (!r) continue;
    if (n.kind === 'stat') b[n.stat] += n.value * r;
    else if (n.kind === 'manaStart') b.mana[n.gem] = (b.mana[n.gem] || 0) + n.value * r;
    else if (n.kind === 'active') b.skills.push(n.skill);
    else b[n.kind === 'shieldStart' ? 'shieldStart' : n.kind] += n.value * r;
  }
  return b;
}
