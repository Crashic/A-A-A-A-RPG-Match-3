// Название фишки по id («Топливо», «Детали»…) — из подписи GEM_EFFECTS.
function gemName(id) {
  return GEM_EFFECTS[id] ? GEM_EFFECTS[id].label.split(' — ')[0] : id;
}
