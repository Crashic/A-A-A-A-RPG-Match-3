// Текст «что дал ряд»: kind — вид эффекта (GEM_EFFECTS), n — сколько (0 — ничего не дал, только название).
function gainText(id, n) {
  const kind = GEM_EFFECTS[id].kind;
  if (!n) return GEM_EFFECTS[id].short;
  if (kind === 'damage') return 'Урон ' + n;
  if (kind === 'shield') return '+' + n + ' щит';
  if (kind === 'heal') return '+' + n + ' лечение';
  if (kind === 'mana') return '+' + n + ' ' + plural(n, 'мана', 'маны', 'маны');
  if (kind === 'xp') return '+' + n + ' опыта';
  if (kind === 'tape') return '+' + n + ' изоленты';
  return GEM_EFFECTS[id].short + ' ' + n;
}
