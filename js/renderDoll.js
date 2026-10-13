// Кукла персонажа: силуэт по центру, слева и справа по 6 слотов снаряжения парами (DOLL_SLOTS),
// оружие внизу с обеих сторон и вдвое выше; под куклой — 5 слотов для рун. Надетые вещи (hero.gear) —
// ячейки itemSlot, по касанию — окно предмета; пустые — emptySlot.
function renderDoll(box, hero) {
  box.innerHTML = '';
  const gear = (hero && hero.gear) || {};
  const tip = 'Пустой слот. Вещи выпадают с врагов — коснитесь вещи в сумке, чтобы надеть.';
  const used = {};
  const slot = (kind, emptyTip) => {
    used[kind] = (used[kind] || 0) + 1;
    const key = GEAR_KEYS.includes(kind) ? kind : kind + used[kind]; // ring1, ring2, weapon1…
    const two = key === 'weapon2' && isTwoHanded(gear.weapon1); // двуручное — в обеих руках
    const item = two ? gear.weapon1 : gear[key];
    if (two) { const s = itemSlot(item, kind, () => openItemInfo({ gear: 'weapon1' })); s.classList.add('twoHandEcho'); return s; }
    return item ? itemSlot(item, kind, () => openItemInfo({ gear: key })) : emptySlot(kind, emptyTip);
  };
  const col = side => {
    const c = document.createElement('div');
    c.className = 'dollSlots';
    for (const kind of DOLL_SLOTS[side]) c.appendChild(slot(kind, tip));
    return c;
  };
  const left = col('left');
  const fig = document.createElement('div');
  fig.className = 'dollFigure';
  fig.innerHTML = '<svg viewBox="0 0 100 160" aria-hidden="true">' +
    '<circle cx="50" cy="22" r="14" fill="var(--ui-metal)"/>' +
    '<path d="M28 44 Q50 36 72 44 L80 92 L70 94 L66 64 L64 100 L68 150 L55 150 L50 108 L45 150 L32 150 L36 100 L34 64 L30 94 L20 92 Z" fill="var(--ui-metal)"/>' +
    '</svg>';
  const body = document.createElement('div');
  body.className = 'dollBody';
  body.append(left, fig, col('right'));
  const runes = document.createElement('div');
  runes.className = 'runeSlots';
  for (let i = 0; i < RUNE_SLOTS; i++) runes.appendChild(slot('rune', 'Слот для руны. Руны выбиваются из тех, кто ими не делится.'));
  box.append(body, runes);
}
