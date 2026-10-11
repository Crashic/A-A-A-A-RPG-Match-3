// Маленькая фишка-значок (как на поле: сквиркл, иконка, «Верхний глянец», без «Полос»): ставится у полос бойца,
// в подсказке «Фишки» и в глоссарии, чтобы было видно, какая фишка что даёт. id — из GEM_TYPES.
function gemMiniIcon(id) {
  const gem = findById(GEM_TYPES, id);
  return '<svg class="gemMini" viewBox="0 0 100 100" aria-hidden="true">' +
    `<polygon points="${GEM_SQUIRCLE}" fill="${gem.color}"/>` +
    `<path d="${gem.icon}" fill="${gem.dark}" fill-rule="evenodd" opacity=".55" transform="${GEM_ICON_TRANSFORM}"/>` +
    '<path d="M-5 -5 H105 V44 Q50 62 -5 44 Z" fill="url(#gemGlossGrad)" clip-path="url(#gemClip)"/>' +
    '</svg>';
}
