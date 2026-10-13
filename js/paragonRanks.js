// Ранги узлов реестра аккаунта: { id: сколько }.
function paragonRanks(acc = loadAccount()) {
  return (acc.paragon && acc.paragon.ranks) || {};
}
