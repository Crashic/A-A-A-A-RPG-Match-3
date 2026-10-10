// Плитка-иконка (фракция, раса, класс, пол) в стиле фишек: сквиркл цвета color,
// силуэт тёмным тоном этого цвета, «Внутренний ободок». color — 'var(--gem-…)'.
function iconTile(key, color) {
  let d, rule;
  if (GEM_ICON_KEYS[key]) {
    d = findById(GEM_TYPES, GEM_ICON_KEYS[key]).icon;
    rule = 'evenodd';
  } else {
    ({ d, rule } = ORIGIN_ICONS[key] || ORIGIN_ICONS.stamp);
  }
  const dark = color.replace(')', '-dark)');
  return '<svg class="tile" viewBox="0 0 100 100" aria-hidden="true">' +
    `<polygon points="${GEM_SQUIRCLE}" fill="${color}"/>` +
    `<path d="${d}" fill="${dark}" fill-rule="${rule}" opacity=".7" transform="${GEM_ICON_TRANSFORM}"/>` +
    `<polygon points="${GEM_RIM}" fill="none" stroke="url(#gemRimGrad)" stroke-width="2" stroke-linejoin="round"/>` +
    '</svg>';
}
