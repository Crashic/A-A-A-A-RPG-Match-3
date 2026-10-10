// Ставит фишку в клетку (r, c). duration > 0 — плавно, 0 — сразу.
function placeGem(el, r, c, duration = 0) {
  el.style.transitionDuration = duration + 'ms';
  el.style.transform = 'translate(' + cellOffset(c) + 'px,' + cellOffset(r) + 'px)';
}
