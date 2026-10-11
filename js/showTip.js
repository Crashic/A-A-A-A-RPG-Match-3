// Подсказка над (или под) элементом target: заголовок и текст. Стиль — камень bg-canvas,
// заголовок цветом «Небо низ», текст «Текст вторичный», рамка «Обводка». Координаты — в осях
// приложения (appRect), поэтому работает и в повёрнутом режиме.
function showTip(target, title, text) {
  const tip = document.getElementById('tip');
  tip.innerHTML = '<b></b><span></span>';
  tip.firstChild.textContent = title;
  tip.firstChild.hidden = !title;
  tip.lastChild.textContent = text;
  tip.hidden = false;
  const r = appRect(target);
  const appW = isAppRotated() ? window.innerHeight : window.innerWidth;
  const appH = isAppRotated() ? window.innerWidth : window.innerHeight;
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let left = Math.max(6, Math.min(appW - w - 6, r.left + r.width / 2 - w / 2));
  let top = r.top - h - 6;
  if (top < 6) top = Math.min(appH - h - 6, r.top + r.height + 6);
  tip.style.left = left + 'px';
  tip.style.top = top + 'px';
  tipOwner = target;
}
