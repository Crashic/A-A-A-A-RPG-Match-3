// Окно «Новый уровень»: поздравление и раздача свободных очков характеристик прямо в окне (renderStatBlock).
// Закрыть можно в любой момент («Позже») — очки останутся, на «Персонаже» будет значок «!».
// then — что сделать после закрытия (например, «Ещё раз» после итогов боя).
let levelUpThen = null;
function showLevelUp(level, ups, then) {
  levelUpThen = then || null;
  const hero = loadSlot(getActiveSlot());
  if (!hero) { if (then) then(); return; }
  document.getElementById('levelUpTitle').textContent = tr("ui.Уровень ") + level + '!';
  const gained = Math.min(statPointsTotal(hero), ups * 5);
  document.getElementById('levelUpText').textContent = gained
    ? tr("ui.Бункер гордится вами (не очень, но всё же). Вам выдали ") + gained + ' ' + plural(gained, tr("ui.очко"), tr("ui.очка"), tr("ui.очков")) +
      tr("ui. характеристик — раздайте сейчас или потом на экране «Персонаж».")
    : tr("ui.Поздравляем: вы стали чуть менее бесполезны. Очки характеристик начнут выдавать со 2-го уровня.");
  statTab = 'base';
  document.getElementById('levelUp').classList.add('open');
  renderLevelUpStats();
}
// Перерисовать характеристики в окне (после «+/−» и сброса), если окно открыто.
function renderLevelUpStats() {
  const box = document.getElementById('levelUp');
  if (!box || !box.classList.contains('open')) return;
  const hero = loadSlot(getActiveSlot());
  if (!hero) return;
  statTab = 'base';
  renderStatBlock(document.getElementById('levelUpStats'), hero, false);
  const free = statPointsFree(hero);
  const done = document.getElementById('levelUpDone');
  done.textContent = free ? tr("ui.Позже") : tr("ui.Готово");
  done.className = 'btn ' + (free ? 'stone' : 'green');
}
function closeLevelUp() {
  document.getElementById('levelUp').classList.remove('open');
  const then = levelUpThen;
  levelUpThen = null;
  if (then) then();
  tutorialCheck(); // сюжет: разговор после боя
}
