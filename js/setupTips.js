// Подсказки по атрибутам data-tip (текст) и data-tip-title (заголовок) — в общем стиле (showTip):
// на ПК — при наведении мыши; на телефоне — касанием по элементу, который сам ничего не делает
// (у кнопок касание выполняет действие, подсказка — только при наведении).
function setupTips() {
  const find = e => e.target.closest && e.target.closest('[data-tip]');
  let touch = false;
  document.addEventListener('touchstart', () => { touch = true; }, { passive: true });
  document.addEventListener('mouseover', e => {
    if (touch) return;
    const el = find(e);
    if (el && el !== tipOwner) showTip(el, el.dataset.tipTitle || '', el.dataset.tip);
  });
  document.addEventListener('mouseout', e => {
    const el = find(e);
    if (el && el === tipOwner && !el.contains(e.relatedTarget)) hideTip();
  });
  document.addEventListener('click', e => {
    const el = find(e);
    if (!el || el.closest('button') || e.target.closest('button, a, input, select')) return; // кнопка внутри карточки с подсказкой — нажимается
    e.stopPropagation();
    if (tipOwner === el) hideTip(); else showTip(el, el.dataset.tipTitle || '', el.dataset.tip);
  }, true);
}
