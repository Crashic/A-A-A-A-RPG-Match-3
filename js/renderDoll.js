// Кукла персонажа: силуэт и пустые слоты снаряжения по бокам (предметов пока нет — «скоро»).
const DOLL_SLOTS = [
  ['Голова', 'Плечи', 'Грудь', 'Руки'],
  ['Пояс', 'Ноги', 'Обувь', 'Оружие']
];
function renderDoll(box, hero) {
  box.innerHTML = '';
  const cls = findById(CLASSES, hero.classId);
  const col = side => {
    const c = document.createElement('div');
    c.className = 'dollSlots';
    for (const name of DOLL_SLOTS[side]) {
      const s = document.createElement('span');
      s.className = 'dollSlot';
      s.innerHTML = '<i></i><small></small>';
      s.querySelector('small').textContent = name;
      attachTip(s, name, 'Пустой слот. Предметы появятся позже — пока носите то, что на вас нарисовано.');
      c.appendChild(s);
    }
    return c;
  };
  const fig = document.createElement('div');
  fig.className = 'dollFigure';
  fig.innerHTML = '<svg viewBox="0 0 100 160" aria-hidden="true">' +
    '<circle cx="50" cy="22" r="14" fill="var(--ui-metal)"/>' +
    '<path d="M28 44 Q50 36 72 44 L80 92 L70 94 L66 64 L64 100 L68 150 L55 150 L50 108 L45 150 L32 150 L36 100 L34 64 L30 94 L20 92 Z" fill="var(--ui-metal)"/>' +
    '<path d="M38 18 Q50 6 62 18" fill="none" stroke="var(--text-muted)" stroke-width="2" opacity=".35"/>' +
    '</svg>' + (cls ? iconTile(cls.icon, cls.color) : '');
  box.append(col(0), fig, col(1));
}
