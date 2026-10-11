// Вешает подсказку на элемент: на ПК — при наведении мыши, на телефоне — касанием
// (повторное касание или касание мимо — прячет). title и text — строки или функции, возвращающие строку.
function attachTip(el, title, text) {
  const val = v => typeof v === 'function' ? v() : v;
  el.classList.add('hasTip');
  el.addEventListener('mouseenter', e => { if (!e.sourceCapabilities || !e.sourceCapabilities.firesTouchEvents) showTip(el, val(title), val(text)); });
  el.addEventListener('mouseleave', () => { if (tipOwner === el) hideTip(); });
  el.addEventListener('click', e => {
    e.stopPropagation();
    if (tipOwner === el) hideTip(); else showTip(el, val(title), val(text));
  });
}
