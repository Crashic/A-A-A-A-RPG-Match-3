// Элемент фишки: плоский многоугольник цвета камня.
function createGemElement(type) {
  const gem = GEM_TYPES[type];
  const el = document.createElement('div');
  el.className = 'gem';
  el.dataset.type = gem.id;
  el.innerHTML = '<svg viewBox="0 0 100 100" aria-hidden="true"><polygon points="' +
    gem.points + '" fill="' + gem.color + '"/></svg>';
  return el;
}
