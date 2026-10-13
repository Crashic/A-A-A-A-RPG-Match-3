// Оформить ранг узла реестра (если можно — paragonCanTake).
function paragonTake(id) {
  const node = findById(PARAGON_NODES, id);
  const check = node && paragonCanTake(node);
  if (!check || !check.ok) { if (check) showToast(check.why); return; }
  const acc = loadAccount();
  acc.paragon = acc.paragon || { ranks: {} };
  acc.paragon.ranks[id] = (acc.paragon.ranks[id] || 0) + 1;
  saveAccount(acc);
  vibrate([20, 30, 20]);
  showToast('Компенсация № ' + node.no + ' оформлена');
  renderParagon();
}
