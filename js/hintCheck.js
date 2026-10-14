// Подсказка «увидел новое» (HINTS) на экране id: первая не показанная, у которой цель видна.
// Только после первого акта сюжета, без открытых окон и когда сюжету показывать нечего.
function hintCheck(id, hero) {
  if (!hero || storyState(hero).done < 1 || storyJunkActive()) return;
  if (document.querySelector('.modal.open') || !document.getElementById('tutorial').hidden) return;
  if (tutorialActive()) return;
  const seen = settings.hintsSeen || (settings.hintsSeen = {});
  for (const h of HINTS) {
    if (h.screen !== id || seen[h.id]) continue;
    const el = [...document.querySelectorAll(h.sel)].find(e => e.offsetParent !== null);
    if (!el) continue;
    storyGuide(el, h.text, () => { settings.hintsSeen[h.id] = true; saveSettings(); setTimeout(tutorialCheck, 200); });
    return;
  }
}
