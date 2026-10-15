// Маленькая фишка-значок — та же плитка, что на поле (gemTileSvg): у ман бойца, на талонах, в «Фишках» и в глоссарии.
function gemMiniIcon(id) {
  return gemTileSvg(findById(GEM_TYPES, id), 'gemMini');
}
