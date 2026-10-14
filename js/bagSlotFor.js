// Ячейка вещи сумки с учётом выделения: в режиме выделения касание ставит/снимает галочку, иначе — onOpen.
function bagSlotFor(item, screen, onOpen, rerender) {
  const on = bagSel && bagSel.screen === screen;
  const s = itemSlot(item, 'cell', () => {
    if (on && bagSelectable(item)) {
      bagSel.uids.has(item.uid) ? bagSel.uids.delete(item.uid) : bagSel.uids.add(item.uid);
      rerender();
    } else onOpen();
  });
  if (on && bagSel.uids.has(item.uid)) s.classList.add('checked');
  if (on && !bagSelectable(item)) s.classList.add('unselectable');
  return s;
}
