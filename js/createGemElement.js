// Элемент фишки на поле: плитка по макету «Агитпроп» (gemTileSvg). Скрытые слои: «Полосы» (подсказка)
// и ободок (виден только у выбранной фишки) — включаются CSS-классами.
function createGemElement(type) {
  const gem = GEM_TYPES[type];
  const el = document.createElement('div');
  el.className = 'gem';
  el.dataset.type = gem.id;
  el.innerHTML = gemTileSvg(gem, '',
    '<rect class="gemRim" x="4" y="4" width="92" height="92" rx="18" fill="none"/>' +
    '<g class="gemStripes" clip-path="url(#gtClip)">' +
      '<polygon points="18,-5 44,-5 -5,44 -5,18" fill="#fff" opacity=".16"/>' +
      '<polygon points="54,-5 62,-5 -5,62 -5,54" fill="#fff" opacity=".12"/>' +
      '<polygon points="105,40 105,66 66,105 40,105" fill="#fff" opacity=".07"/>' +
    '</g>');
  return el;
}
