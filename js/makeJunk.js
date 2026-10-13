// Новый хлам (JUNK_ITEMS): вещь только на продажу, редкость 'junk'.
function makeJunk(level) {
  const t = JUNK_ITEMS[Math.floor(Math.random() * JUNK_ITEMS.length)];
  return {
    uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    junk: t.id, name: t.name, rarity: 'junk', level: Math.max(1, level), req: 1
  };
}
