// Элемент фишки по макету (GemsElemental): сквиркл цвета камня, иконка ресурса тёмным тоном 55 %,
// поверх «Верхний глянец» (по просьбе автора вместо «Внутреннего ободка»). Скрытые слои:
// «Полосы» (подсказка) и ободок (виден только у выбранной фишки) — включаются CSS-классами.
// Градиент ободка и обрезка полос — общие, в <svg id="gemDefs"> в index.html.
function createGemElement(type) {
  const gem = GEM_TYPES[type];
  const el = document.createElement('div');
  el.className = 'gem';
  el.dataset.type = gem.id;
  el.innerHTML =
    '<svg viewBox="0 0 100 100" aria-hidden="true">' +
      `<polygon points="${GEM_SQUIRCLE}" fill="${gem.color}"/>` +
      `<path d="${gem.icon}" fill="${gem.dark}" fill-rule="evenodd" opacity=".55" transform="${GEM_ICON_TRANSFORM}"/>` +
      '<path class="gemGloss" d="M-5 -5 H105 V44 Q50 62 -5 44 Z" fill="url(#gemGlossGrad)" clip-path="url(#gemClip)"/>' +
      `<polygon class="gemRim" points=""${GEM_RIM}" fill="none" stroke="url(#gemRimGrad)" stroke-width="2" stroke-linejoin="round"/>` +
      '<g class="gemStripes" clip-path="url(#gemClip)">' +
        '<polygon points="18,-5 44,-5 -5,44 -5,18" fill="#fff" opacity=".16"/>' +
        '<polygon points="54,-5 62,-5 -5,62 -5,54" fill="#fff" opacity=".12"/>' +
        '<polygon points="105,40 105,66 66,105 40,105" fill="#fff" opacity=".07"/>' +
      '</g>' +
    '</svg>';
  return el;
}
