// Плитка расы/класса (ORIGIN_TILES): тот же рисунок, что у фишек gemTileSvg — градиент, блик, светлая кромка и знак цвета ink.
function originTileSvg(id) {
  const t = ORIGIN_TILES[id];
  const p = ORIGIN_TILE_PAL[t.pal];
  const body = ORIGIN_TILE_GLYPHS[t.g].replace(/BG/g, p.bg).replace(/INK/g, p.ink);
  return '<svg class="tile otile" viewBox="0 0 100 100" aria-hidden="true">' +
    `<defs><linearGradient id="ot-${t.pal}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.hi}"/><stop offset=".55" stop-color="${p.bg}"/><stop offset="1" stop-color="${p.lo}"/></linearGradient></defs>` +
    `<rect x="2" y="2" width="96" height="96" rx="20" fill="url(#ot-${t.pal})"/>` +
    '<path d="M17 7H83Q91 7 91 15V25Q91 38 75 38H25Q9 38 9 25V15Q9 7 17 7Z" fill="#fff" opacity=".22"/>' +
    `<g transform="translate(20 21.5) scale(.6)" fill="#fff" fill-opacity=".25">${body.split(p.ink).join('#fff')}</g>` +
    `<g transform="translate(20 20) scale(.6)" fill="${p.ink}">${body}</g></svg>`;
}
