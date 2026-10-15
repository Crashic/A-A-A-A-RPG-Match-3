// Обновляет панель бойца. side — 'hero' | 'enemy'.
function renderFighterPanel(side) {
  const panel = document.getElementById(side === 'hero' ? 'heroPanel' : 'enemyPanel');
  if (!panel.dataset.built) buildFighterPanel(panel, side === 'hero');
  const f = battle[side];
  const q = sel => panel.querySelector(sel);
  q('[data-f="name"]').textContent = f.name.replace(/\u2011/g, '\u2011\u200B'); // после неразрывного дефиса — можно перенести строку
  panel.classList.toggle('active', !battle.over && battle.turn === side);
  q('[data-f="stamp"]').textContent = side === 'hero' ? tr("ui.ВАШ ХОД!") : tr("ui.ХОД ВРАГА"); // штамп хода поперёк аватара, виден у активной панели
  const key = side === 'hero' ? battle.save.raceId + battle.save.classId : battle.enemyId; // аватар и значок — при смене бойца
  if (panel.dataset.ava !== key) {
    panel.dataset.ava = key;
    if (side === 'hero') {
      const race = findById(RACES, battle.save.raceId), cls = findById(CLASSES, battle.save.classId);
      q('[data-f="portrait"]').innerHTML = race ? iconTile(race.icon, race.color) : '';
      q('[data-f="badge"]').innerHTML = cls ? iconTile(cls.icon, cls.color) : '';
    } else {
      q('[data-f="portrait"]').innerHTML = ENEMY_PORTRAIT;
      q('[data-f="badge"]').textContent = battle.enemyInfo.level;
    }
  }

  setBar(q('[data-bar="hp"]'), f.hp, f.maxHp);
  setBar(q('[data-bar="shield"]'), f.shield, f.maxShield, tr("ui.Щит ") + f.shield);
  for (const id of MANA_COLORS) setBar(q(`[data-bar="${id}"]`), f.mana[id], f.manaMax || MANA_MAX, String(f.mana[id]));

  if (side === 'hero') {
    const save = battle.save;
    const cls = findById(CLASSES, save.classId);
    q('[data-f="info"]').textContent = tr("ui.Ур. ") + save.level + (cls ? ' · ' + cls.name : '');
  } else {
    const e = battle.enemyInfo;
    const info = q('[data-f="info"]');
    info.textContent = tr("ui.Ур. ") + e.level + (e.elite ? tr("ui. · Элита") : '');
    info.className = 'lvl-' + difficultyOf(battle.save.level, e.level);
  }
}
