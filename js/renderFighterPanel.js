// Обновляет панель бойца. side — 'hero' | 'enemy'.
function renderFighterPanel(side) {
  const panel = document.getElementById(side === 'hero' ? 'heroPanel' : 'enemyPanel');
  if (!panel.dataset.built) buildFighterPanel(panel, side === 'hero');
  const f = battle[side];
  const q = sel => panel.querySelector(sel);
  q('[data-f="name"]').textContent = f.name;
  panel.classList.toggle('active', !battle.over && battle.turn === side);

  setBar(q('[data-bar="hp"]'), f.hp, f.maxHp);
  setBar(q('[data-bar="shield"]'), f.shield, f.maxShield, 'Щит ' + f.shield);
  for (const id of MANA_COLORS) setBar(q(`[data-bar="${id}"]`), f.mana[id], MANA_MAX, String(f.mana[id]));

  if (side === 'hero') {
    const save = battle.save;
    const cls = findById(CLASSES, save.classId);
    q('[data-f="info"]').textContent = 'Ур. ' + save.level + (cls ? ' · ' + cls.name : '');
    const need = xpToNext(save.level);
    const xp = Math.min(need, save.xp + battle.gained.xp);
    setBar(q('[data-bar="xp"]'), xp, need, need ? 'Опыт ' + xp + ' / ' + need : 'Макс. уровень');
    q('[data-f="tape"]').innerHTML = formatTape(save.tape + battle.gained.tape);
  } else {
    const e = battle.enemyInfo;
    const info = q('[data-f="info"]');
    info.textContent = 'Ур. ' + e.level + (e.elite ? ' · Элита' : '');
    info.className = 'lvl-' + difficultyOf(battle.save.level, e.level);
  }
}
