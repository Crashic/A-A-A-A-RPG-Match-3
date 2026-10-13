// Текст «что дал ряд»: kind — вид эффекта (GEM_EFFECTS), n — сколько (0 — ничего не дал, только название).
function gainText(id, n) {
  const kind = GEM_EFFECTS[id].kind;
  if (!n) return GEM_EFFECTS[id].short;
  if (kind === 'damage') return tr("ui.Урон ") + n;
  if (kind === 'shield') return '+' + n + tr("ui. щит");
  if (kind === 'heal') return '+' + n + tr("ui. лечение");
  if (kind === 'mana') return '+' + n + ' ' + plural(n, tr("ui.мана"), tr("ui.маны"), tr("ui.маны"));
  if (kind === 'xp') return '+' + n + tr("ui. опыта");
  if (kind === 'tape') return '+' + n + tr("ui. изоленты");
  return GEM_EFFECTS[id].short + ' ' + n;
}
