// Плитка-иконка ресурса (RESOURCES) в стиле фишек.
function resourceIcon(id) {
  const r = findById(RESOURCES, id);
  return r ? iconTile(r.icon, r.color) : '';
}
