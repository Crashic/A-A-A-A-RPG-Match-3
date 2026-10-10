// Меняет тип фишки в клетке (r, c) и её картинку на поле.
function setGemType(r, c, type) {
  match3.grid[r][c] = type;
  const old = match3.els[r][c];
  const el = createGemElement(type);
  if (old) old.replaceWith(el); else document.getElementById('boardGems').appendChild(el);
  match3.els[r][c] = el;
  placeGem(el, r, c);
}
