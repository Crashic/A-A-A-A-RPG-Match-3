// Прямоугольник элемента в координатах приложения (левый верхний угол, ширина, высота).
function appRect(el) {
  const r = el.getBoundingClientRect();
  if (!isAppRotated()) return { left: r.left, top: r.top, width: r.width, height: r.height };
  return { left: r.top, top: window.innerWidth - r.right, width: r.height, height: r.width };
}
