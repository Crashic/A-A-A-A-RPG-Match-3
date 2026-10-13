// Ячейка с предметом (кукла, руны, сумка): значок вида вещи цветом редкости на подсвеченной ячейке.
// kind — вид слота для размера (weapon — вдвое выше), onOpen — что сделать по касанию (окно предмета).
// При наведении мыши — подсказка с описанием (itemTipText).
function itemSlot(item, kind, onOpen) {
  const base = findById(ITEM_BASES, item.base);
  const rar = findById(ITEM_RARITIES, item.rarity) || ITEM_RARITIES[0];
  const s = document.createElement('button');
  s.type = 'button';
  s.className = 'invSlot item ' + kind + ' r-' + rar.id + (DOLL_SLOTS.left.includes(kind) || DOLL_SLOTS.right.includes(kind) ? ' gear' : '');
  s.style.setProperty('--rar', rar.color);
  s.innerHTML = slotIcon(base ? base.slot : isBagItem(item) ? 'bag' : isJunkItem(item) ? 'junk' : kind).replace(/var\(--text-muted\)/g, 'var(--rar)');
  s.setAttribute('aria-label', item.name);
  s.addEventListener('click', e => { e.stopPropagation(); vibrate(); hideTip(); onOpen(); });
  // на ПК — подсказка с описанием при наведении (на телефоне касание сразу открывает окно)
  s.addEventListener('mouseenter', e => {
    if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
    showTip(s, item.name, itemTipText(item));
    document.querySelector('#tip b').style.color = rar.color; // название — цветом редкости
  });
  s.addEventListener('mouseleave', () => { if (tipOwner === s) hideTip(); });
  return s;
}
