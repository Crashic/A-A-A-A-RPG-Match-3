// Кукла персонажа: силуэт по центру, слева и справа по 6 слотов снаряжения парами (DOLL_SLOTS),
// оружие внизу с обеих сторон и вдвое выше; под куклой — 5 слотов для рун. Предметов пока нет.
function renderDoll(box) {
  box.innerHTML = '';
  const tip = 'Пустой слот. Предметы появятся позже — пока носите то, что на вас нарисовано.';
  const col = side => {
    const c = document.createElement('div');
    c.className = 'dollSlots';
    for (const kind of DOLL_SLOTS[side]) c.appendChild(emptySlot(kind, tip));
    return c;
  };
  const fig = document.createElement('div');
  fig.className = 'dollFigure';
  fig.innerHTML = '<svg viewBox="0 0 100 160" aria-hidden="true">' +
    '<circle cx="50" cy="22" r="14" fill="var(--ui-metal)"/>' +
    '<path d="M28 44 Q50 36 72 44 L80 92 L70 94 L66 64 L64 100 L68 150 L55 150 L50 108 L45 150 L32 150 L36 100 L34 64 L30 94 L20 92 Z" fill="var(--ui-metal)"/>' +
    '</svg>';
  const body = document.createElement('div');
  body.className = 'dollBody';
  body.append(col('left'), fig, col('right'));
  const runes = document.createElement('div');
  runes.className = 'runeSlots';
  for (let i = 0; i < RUNE_SLOTS; i++) runes.appendChild(emptySlot('rune', 'Слот для руны. Руны выбиваются позже — из тех, кто ими не делится.'));
  box.append(body, runes);
}
