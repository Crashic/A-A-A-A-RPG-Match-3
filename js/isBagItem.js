// Это сумка (а не снаряжение)?
function isBagItem(item) {
  return !!(item && item.bagType);
}
