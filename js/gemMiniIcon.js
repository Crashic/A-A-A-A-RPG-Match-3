// Маленькая фишка-значок (как на поле, без «Полос»): ставится у полос бойца,
// в подсказке «Фишки» и в глоссарии, чтобы было видно, какая фишка что даёт. id — из GEM_TYPES.
function gemMiniIcon(id) {
  const gem = findById(GEM_TYPES, id);
  return '<svg class="gemMini" viewBox="0 0 100 100" aria-hidden="true">' +
    `<polygon points="${GEM_SQUIRCLE}" fill="${gem.color}"/>` +
    `<path d="${gem.icon}" fill="${gem.dark}" fill-rule="evenodd" opacity=".55" transform="${GEM_ICON_TRANSFORM}"/>` +
    `<polygon points="${GEM_RIM}" fill="none" stroke="url(#gemRimGrad)" stroke-width="2" stroke-linejoin="round"/>` +
    '</svg>';
}
