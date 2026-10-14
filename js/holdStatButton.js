// Кнопка «−/+» характеристики: нажатие — 1 очко (с зажатым Shift — 10); удержание — ещё по столько же, сначала каждые
// STAT_HOLD_MS, затем всё чаще (×STAT_HOLD_SPEEDUP за шаг, но не чаще STAT_HOLD_MIN_MS).
// Кнопку перерисовывают после каждого изменения (renderCharacter), поэтому отпускание ловится на всём окне.
const STAT_HOLD_MS = 100;
const STAT_HOLD_SPEEDUP = 0.93;
const STAT_HOLD_MIN_MS = 35;
function holdStatButton(btn, statId, dir) {
  const step = () => { // одно срабатывание: 1 очко или 10 с Shift (не больше, чем можно)
    const hero = loadSlot(getActiveSlot());
    if (!hero) return false;
    const room = dir > 0 ? statPointsFree(hero) : heroPoints(hero)[statId];
    const n = Math.min(holdStatButton.shift ? 10 : 1, room);
    return n > 0 && changeStat(statId, dir * n) !== false;
  };
  btn.addEventListener('pointerdown', e => {
    if (e.button > 0) return;
    e.preventDefault();
    holdStatButton.stop();
    holdStatButton.shift = e.shiftKey;
    if (!step()) return;
    let wait = STAT_HOLD_MS;
    const tick = () => {
      if (!step()) { holdStatButton.stop(); return; }
      wait = Math.max(STAT_HOLD_MIN_MS, wait * STAT_HOLD_SPEEDUP); // небольшое ускорение
      holdStatButton.timer = setTimeout(tick, wait);
    };
    holdStatButton.timer = setTimeout(tick, wait);
  });
  btn.addEventListener('click', e => { // клавиатура (Enter/пробел) — без удержания
    if (e.detail === 0) { holdStatButton.shift = e.shiftKey; step(); }
  });
}
holdStatButton.stop = () => { clearTimeout(holdStatButton.timer); holdStatButton.timer = null; };
['pointerup', 'pointercancel', 'blur'].forEach(ev => window.addEventListener(ev, holdStatButton.stop));
window.addEventListener('keydown', e => { if (e.key === 'Shift') holdStatButton.shift = true; });
window.addEventListener('keyup', e => { if (e.key === 'Shift') holdStatButton.shift = false; });
