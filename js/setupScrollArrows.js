// Прокрутка без полосы: в блоке wrap прокручивается inner (overflow скрыт), сверху и снизу по центру —
// пульсирующие стрелки (видны, только если есть куда листать); по стрелке — листает на ~70 % высоты.
// Перетаскивание: зажать палец или мышь на 1 секунду и тянуть; колесо мыши тоже листает.
function setupScrollArrows(wrap, inner) {
  if (wrap.dataset.arrows) return;
  wrap.dataset.arrows = '1';
  wrap.classList.add('arrowScroll');
  const arrow = dir => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'scrollArrow ' + dir;
    b.setAttribute('aria-label', dir === 'up' ? 'Листать вверх' : 'Листать вниз');
    b.innerHTML = '<svg viewBox="0 0 24 14" aria-hidden="true"><path d="' + (dir === 'up' ? 'M3 12 L12 3 L21 12' : 'M3 2 L12 11 L21 2') +
      '" fill="none" stroke="var(--bg-sky-bottom)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener('click', e => {
      e.stopPropagation();
      inner.scrollBy({ top: (dir === 'up' ? -1 : 1) * inner.clientHeight * 0.7, behavior: 'smooth' });
    });
    wrap.appendChild(b);
    return b;
  };
  const up = arrow('up');
  const down = arrow('down');
  const update = () => {
    up.hidden = inner.scrollTop <= 2;
    down.hidden = inner.scrollTop + inner.clientHeight >= inner.scrollHeight - 2;
  };
  inner.addEventListener('scroll', update);
  inner.addEventListener('wheel', e => { inner.scrollTop += e.deltaY; e.preventDefault(); update(); }, { passive: false });
  new ResizeObserver(update).observe(inner);
  new MutationObserver(() => requestAnimationFrame(update)).observe(inner, { childList: true, subtree: true });

  // зажать на 1 с и тянуть
  let hold = null, drag = null, dragged = false;
  const point = e => toAppPoint(e.clientX, e.clientY);
  inner.addEventListener('pointerdown', e => {
    const p = point(e);
    dragged = false;
    hold = setTimeout(() => {
      drag = { y: p.y, top: inner.scrollTop };
      inner.classList.add('grabbing');
      vibrate(15);
    }, 1000);
    hold.start = p;
  });
  inner.addEventListener('pointermove', e => {
    const p = point(e);
    if (drag) {
      inner.scrollTop = drag.top - (p.y - drag.y);
      dragged = true;
      update();
    } else if (hold && Math.hypot(p.x - hold.start.x, p.y - hold.start.y) > 8) {
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
  update();
}
