// Полоса выделения под сумкой: «Выделить всё» или, в режиме выделения, действие (продать / выбросить
// выбранное, с числом и ценой) и «Отмена». mode — 'sell' (торговец) или 'drop' («Персонаж»).
function bagSelectBar(hero, screen, mode, rerender) {
  const bar = document.createElement('div');
  bar.className = 'bagSelBar';
  const bag = hero.bag || [];
  const mk = (label, cls, fn) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'btn ' + cls;
    b.textContent = label;
    b.addEventListener('click', e => { e.stopPropagation(); vibrate(); fn(); });
    bar.appendChild(b);
    return b;
  };
  if (!bagSel || bagSel.screen !== screen) {
    const all = mk(tr("ui.Выделить всё"), 'stone selAll', () => {
      bagSel = { screen, uids: new Set(bag.filter(bagSelectable).map(i => i.uid)) };
      rerender();
    });
    all.disabled = !bag.some(bagSelectable);
    return bar;
  }
  const picked = bag.filter(i => bagSel.uids.has(i.uid));
  const sum = picked.reduce((a, i) => a + itemPrice(i), 0);
  if (mode === 'sell') {
    const b = mk(tr("ui.Продать: ") + picked.length, 'orange', () => sellSelected());
    b.insertAdjacentHTML('beforeend', formatTape(sum));
    b.disabled = !picked.length;
  } else {
    const b = mk(tr("ui.Выбросить: ") + picked.length, 'red', () => showConfirm(tr("ui.Выбросить выбранное (") + picked.length +
      tr("ui.)? Вернуть не получится — местные растащат за минуту."), tr("ui.Выбросить"), () => dropSelected()));
    b.disabled = !picked.length;
  }
  mk(tr("ui.Отмена"), 'stone', () => { bagSel = null; rerender(); });
  return bar;
}
