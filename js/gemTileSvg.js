// Плитка фишки по макету «Агитпроп» (Tiles-Icons): скруглённый квадрат с градиентом hi → bg → lo, светлый блик сверху,
// иконка ресурса тёмным цветом ink. extra — дополнительные слои SVG (полосы подсказки, ободок выбранной) внутри плитки.
// Градиенты и обрезка — общие, создаются один раз в <svg id="gemDefs"> (gemTileDefs).
function gemTileSvg(gem, cls, extra) {
  gemTileDefs();
  const t = gem.tile;
  return `<svg${cls ? ' class="' + cls + '"' : ''} viewBox="0 0 100 100" aria-hidden="true">` +
    `<rect x="2" y="2" width="96" height="96" rx="20" fill="url(#gt-${gem.id})"/>` +
    '<path d="M17 7 H83 Q91 7 91 15 V25 Q91 38 75 38 H25 Q9 38 9 25 V15 Q9 7 17 7 Z" fill="#fff" opacity=".22"/>' +
    `<svg x="15" y="16.5" width="70" height="70" viewBox="${t.vb}"><path d="${t.d}" fill="#fff" fill-opacity=".25" fill-rule="evenodd"/></svg>` + // светлый край снизу, как в макете
    `<svg x="15" y="15" width="70" height="70" viewBox="${t.vb}"><path d="${t.d}" fill="${t.ink}" fill-rule="evenodd"/></svg>` +
    (extra || '') + '</svg>';
}
function gemTileDefs() {
  if (document.getElementById('gt-ruby')) return;
  const defs = document.querySelector('#gemDefs defs');
  if (!defs) return;
  let html = '<clipPath id="gtClip"><rect x="2" y="2" width="96" height="96" rx="20"/></clipPath>';
  for (const g of GEM_TYPES) html += `<linearGradient id="gt-${g.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${g.tile.hi}"/><stop offset=".55" stop-color="${g.tile.bg}"/><stop offset="1" stop-color="${g.tile.lo}"/></linearGradient>`;
  defs.insertAdjacentHTML('beforeend', html);
}
