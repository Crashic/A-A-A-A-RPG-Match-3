// Общий склад аккаунта: { items: [], tape } внутри loadAccount().
function loadStash(acc = loadAccount()) {
  acc.stash = acc.stash || {};
  acc.stash.items = acc.stash.items || [];
  acc.stash.tape = acc.stash.tape || 0;
  return acc.stash;
}
