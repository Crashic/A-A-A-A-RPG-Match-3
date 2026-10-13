// Рисует шаг обучения: кружок вокруг элемента el, стрелка от пояснения к нему, текст и кнопки
// «Понятно» (кроме шагов создания — они идут сами) и «Скрыть обучение». Координаты — как у подсказок (appRect).
function showTutorial(step, el) {
  const box = document.getElementById('tutorial');
  box.hidden = false;
  box.dataset.step = step.id;
  const r = appRect(el);
  const appW = isAppRotated() ? window.innerHeight : window.innerWidth;
  const appH = isAppRotated() ? window.innerWidth : window.innerHeight;
  const ring = box.querySelector('.tutRing');
  const pad = 6;
  Object.assign(ring.style, { left: r.left - pad + 'px', top: r.top - pad + 'px', width: r.width + pad * 2 + 'px', height: r.height + pad * 2 + 'px' });
  const bubble = box.querySelector('.tutBubble');
  bubble.querySelector('p').textContent = step.text;
  bubble.querySelector('.tutOk').hidden = !!step.auto;
  // пузырь — с той стороны, где больше места
  const bw = Math.min(300, appW - 16);
  bubble.style.width = bw + 'px';
  const bh = bubble.offsetHeight;
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  let left, top;
  if (r.left > bw + 40) { left = r.left - bw - 34; top = cy - bh / 2; }
  else if (appW - r.left - r.width > bw + 40) { left = r.left + r.width + 34; top = cy - bh / 2; }
  else if (r.top > bh + 40) { left = cx - bw / 2; top = r.top - bh - 34; }
  else { left = cx - bw / 2; top = r.top + r.height + 34; }
  left = Math.max(8, Math.min(appW - bw - 8, left));
  top = Math.max(8, Math.min(appH - bh - 8, top));
  bubble.style.left = left + 'px';
  bubble.style.top = top + 'px';
  // стрелка: от края пузыря к краю кружка
  const bx = Math.max(left, Math.min(left + bw, cx)), by = Math.max(top, Math.min(top + bh, cy));
  const tx = Math.max(r.left - pad, Math.min(r.left + r.width + pad, bx)), ty = Math.max(r.top - pad, Math.min(r.top + r.height + pad, by));
  const line = box.querySelector('.tutArrow line');
  line.setAttribute('x1', bx); line.setAttribute('y1', by); line.setAttribute('x2', tx); line.setAttribute('y2', ty);
  box.querySelector('.tutArrow').setAttribute('viewBox', '0 0 ' + appW + ' ' + appH);
}
