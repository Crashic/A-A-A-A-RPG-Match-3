// Плитка фишки по макету «Агитпроп» (Tiles-Icons): скруглённый квадрат с градиентом hi → bg → lo, светлый блик сверху,
// иконка ресурса тёмным цветом ink. extra — дополнительные слои SVG (полосы подсказки, ободок выбранной) внутри плитки.
// Градиенты и обрезка — общие, создаются один раз в <svg id="gemDefs"> (gemTileDefs).
function gemTileSvg(gem, cls, extra) {
  gemTileDefs();
  const t = gem.tile;
  return `<svg${cls ? ' class="' + cls + '"' : ''} viewBox="0 0 100 100" aria-hidden="true">` +
    `<rect x="3" y="3" width="94" height="94" rx="24" fill="url(#gt-${gem.id})"/>` +
    '<rect x="12" y="7" width="76" height="32" rx="15" fill="#fff" opacity=".22"/>' +
    `<svg x="20" y="20" width="60" height="60" viewBox="${t.vb}"><path d="${t.d}" fill="${t.ink}" fill-rule="evenodd"/></svg>` +
    (extra || '') + '</svg>';
}
function gemTileDefs() {
  if (document.getElementById('gt-ruby')) return;
  const defs = document.querySelector('#gemDefs defs');
  if (!defs) return;
  let html = '<clipPath id="gtClip"><rect x="3" y="3" width="94" height="94" rx="24"/></clipPath>';
  for (const g of GEM_TYPES) html += `<linearGradient id="gt-${g.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g.tile.hi}"/><stop offset=".55" stop-color="${g.tile.bg}"/><stop offset="1" stop-color="${g.tile.lo}"/></linearGradient>`;
  defs.insertAdjacentHTML('beforeend', html);
}
