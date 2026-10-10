// Делает ячейку n текущей.
function setActiveSlot(n) {
  try { localStorage.setItem('aaaa-active-slot', String(n)); } catch (e) {}
}
