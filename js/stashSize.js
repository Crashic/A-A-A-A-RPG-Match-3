// Сколько ячеек в общаке: база + докупленные места (acc.stash.nests).
function stashSize(acc = loadAccount()) {
  return STASH_BASE_SLOTS + ((acc.stash && acc.stash.nests) || 0) * STASH_NEST_SIZE;
}
