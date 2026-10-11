// Прокрутка без полосы для блока inner: полоса скрыта, сверху и снизу по центру блока — пульсирующие
// стрелки цвета «Небо низ» (видны, только если есть куда листать); по стрелке — листает на ~70 % высоты.
// Перетаскивание: зажать палец или мышь на 1 секунду и тянуть; колесо мыши тоже листает.
// Стрелки кладутся в родителя блока и ставятся по его краям (блок не оборачивается — вёрстка не меняется).
function setupScrollArrows(inner) {
  if (!inner || inner.dataset.arrows) return;
  inner.dataset.arrows = '1';
  inner.classList.add('arrowList');
  const host = inner.parentElement;
  if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
  const arrow = dir => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'scrollArrow ' + dir;
    b.hidden = true;
    b.setAttribute('aria-label', dir === 'up' ? 'Листать вверх' : 'Листать вниз');
    b.innerHTML = '<svg viewBox="0 0 24 14" aria-hidden="true"><path d="' + (dir === 'up' ? 'M3 12 L12 3 L21 12' : 'M3 2 L12 11 L21 2') +
      '" fill="none" stroke="var(--bg-sky-bottom)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener('click', e => {
      e.stopPropagation();
      inner.scrollBy({ top: (dir === 'up' ? -1 : 1) * inner.clientHeight * 0.7, behavior: 'smooth' });
    });
    host.appendChild(b);
    return b;
  };
  const up = arrow('up');
  const down = arrow('down');
  const update = () => {
    const visible = inner.offsetParent !== null && inner.clientHeight > 0;
    up.hidden = !visible || inner.scrollTop <= 2;
    down.hidden = !visible || inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 2;
    const x = inner.offsetLeft + inner.offsetWidth / 2;
    up.style.left = down.style.left = x + 'px';
    up.style.top = inner.offsetTop + 'px';
    down.style.top = (inner.offsetTop + inner.offsetHeight - 22) + 'px';
  };
  inner.addEventListener('scroll', update);
  inner.addEventListener('wheel', e => { inner.scrollTop += e.deltaY; e.preventDefault(); update(); }, { passive: false });
  new ResizeObserver(update).observe(inner);
  new MutationObserver(() => requestAnimationFrame(update)).observe(inner, { childList: true, subtree: true });
  window.addEventListener('resize', update);

  // зажать на 1 с и тянуть
  let hold = null, start = null, drag = null, dragged = false;
  const point = e => toAppPoint(e.clientX, e.clientY);
  inner.addEventListener('pointerdown', e => {
    start = point(e);
    dragged = false;
    hold = setTimeout(() => {
      drag = { y: start.y, top: inner.scrollTop };
      inner.classList.add('grabbing');
      vibrate(15);
    }, 1000);
  });
  inner.addEventListener('pointermove', e => {
    const p = point(e);
    if (drag) {
      inner.scrollTop = drag.top - (p.y - drag.y);
      dragged = true;
      update();
    } else if (hold && start && Math.hypot(p.x - start.x, p.y - start.y) > 8) {
      clearTimeout(hold);
      hold = null;
    }
  });
  const end = () => {
    clearTimeout(hold);
    hold = null;
    drag = null;
    inner.classList.remove('grabbing');
  };
  inner.addEventListener('pointerup', end);
  inner.addEventListener('pointercancel', end);
  inner.addEventListener('pointerleave', end);
  // после перетаскивания касание не должно нажимать кнопки
  inner.addEventListener('click', e => { if (dragged) { e.stopPropagation(); e.preventDefault(); dragged = false; } }, true);
  requestAnimationFrame(update);
}
