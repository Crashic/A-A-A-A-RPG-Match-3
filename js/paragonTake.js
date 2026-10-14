// Оформить ранг узла реестра (если можно — paragonCanTake).
function paragonTake(id) {
  const node = findById(PARAGON_NODES, id);
  const check = node && paragonCanTake(node);
  if (!check || !check.ok) { if (check) showToast(check.why); return; }
  const acc = loadAccount();
  acc.paragon = acc.paragon || { ranks: {} };
  acc.paragon.ranks[id] = (acc.paragon.ranks[id] || 0) + 1;
  const h = loadSlot(getActiveSlot());
  if (h && storyState(h).act === 8 && storyState(h).paragonFresh) acc.paragon.storyTaken = true; // очко за акт 8 потрачено
  saveAccount(acc);
  vibrate([20, 30, 20]);
  showToast(tr("ui.Компенсация № ") + node.no + tr("ui. оформлена"));
  renderParagon();
  storyEvent('paragonTake', id); // сюжет, акт 8
}
