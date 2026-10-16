// Селектор цели подсказки сюжета, чтобы узнать её после перерисовки экрана: ближайший предок (или сам элемент)
// с data-card / data-act / data-zone / data-enemy / data-slot / data-uid / id + тег и классы самой цели.
function storyGuideSel(el) {
  const attrs = ['card', 'act', 'zone', 'enemy', 'slot', 'uid', 'role'];
  const self = el.tagName.toLowerCase() + [...el.classList].filter(c => !/^(current|selected|active|nudge)$/.test(c)).map(c => '.' + CSS.escape(c)).join('');
  if (el.id) return '#' + CSS.escape(el.id);
  for (let p = el; p && p !== document.body; p = p.parentElement) {
    if (p.id && p !== el) return '#' + CSS.escape(p.id) + ' ' + self;
    for (const a of attrs) if (p.dataset && p.dataset[a] !== undefined) {
      const sel = '[data-' + a + '="' + CSS.escape(p.dataset[a]) + '"]';
      return p === el ? self + sel : sel + ' ' + self;
    }
  }
  return null;
}
