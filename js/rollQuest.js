// Новое задание для доски (cat — категория: 'errand' поручение, 'daily' ежедневное): вид (QUEST_TYPES), цель под уровень героя, текст от случайного жителя бункера
// и награда. Задание: { uid, type, giver, title, text, goal, zoneId?, enemyId?, gem?, need, have, level,
// reward: { xp, tape, item } } (item — редкость вещи или null). Если подходящих врагов нет — «победы».
function rollQuest(hero, cat = 'errand') {
  const pick = list => list[Math.floor(Math.random() * list.length)];
  const L = hero.level;
  let type = pick(Object.keys(QUEST_TYPES));
  let target = null;
  if (type === 'elite') { target = pick(questEnemies(hero, true, 5)); if (!target) type = 'enemy'; }
  if (type === 'enemy' || type === 'zone') { target = pick(questEnemies(hero, false, 3)); if (!target) type = 'wins'; }
  const T = QUEST_TYPES[type];
  const [lo, hi] = T.need;
  let need = lo + Math.floor(Math.random() * (hi - lo + 1));
  if (type === 'gems') need = Math.round(need / 10) * 10;
  const gem = type === 'gems' ? pick(GEM_TYPES).id : null;
  const giver = pick(QUEST_GIVERS);
  const [title, text] = pick(T.texts);
  const fill = s => s.replace('{zone}', target ? target.zone.name.replace(/^.*«|»$/g, '') : '')
    .replace('{enemy}', target ? target.enemy.name : '').replace('{n}', need)
    .replace('{times}', need + ' ' + plural(need, tr("ui.раз"), tr("ui.раза"), tr("ui.раз"))).replace('{gem}', gem ? gemName(gem) : '');
  const k = type === 'gems' ? 1 : QUEST_REWARD_MULT; // «Собрать фишки» — как было, остальные — вдвое меньше
  const xp = Math.round(mobXp(L, L) * T.xp * need * k);
  const tape = Math.round(combatStats(L).tapePerGem * 4 * T.xp * need * k);
  const item = type === 'elite' || Math.random() < ITEM_DROP_CHANCE ? rollRarity(type === 'elite') : null;
  const quest = {
    uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    cat, type, giver: giver.id, title, text: fill(text), goal: fill(T.goal),
    zoneId: type === 'zone' ? target.zone.id : null,
    enemyId: type === 'enemy' || type === 'elite' ? target.enemy.id : null,
    gem, need, have: 0, level: L,
    // вещь — как с врагов: шанс ITEM_DROP_CHANCE (элита — всегда), редкость случайная (rollRarity)
    reward: { xp, tape, item }
  };
  if (cat === 'errand') quest.left = questLife(quest); // сколько боёв висит на доске
  return quest;
}
