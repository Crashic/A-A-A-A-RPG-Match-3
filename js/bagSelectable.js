// Можно ли выделить вещь (сумки и квестовое — нельзя).
function bagSelectable(item) {
  return !!item && !isBagItem(item);
}
