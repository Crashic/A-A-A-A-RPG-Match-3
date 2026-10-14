// Ряд гнёзд сумок над инвентарём (BAG_NESTS_MAX штук): надетая сумка (касание — её окно), пустое гнездо,
// следующее — «+» (купить, подсказка с ценой и мотком изоленты), дальше — закрытые.
function bagNestRow(hero, packs) {
  const row = document.createElement('div');
  row.className = 'bagSlots';
  for (let i = 0; i < BAG_NESTS_MAX; i++) {
    const worn = packs.worn[i];
    if (i < packs.nests && worn) {
      const s = itemSlot(worn, 'bag', () => openItemInfo({ pack: i }));
      s.insertAdjacentHTML('beforeend', '<small class="bagSize">' + worn.size + '</small>');
      row.appendChild(s);
    } else if (i < packs.nests) {
      row.appendChild(emptySlot('bag', tr("ui.Пустое гнездо. Наденьте сюда сумку из инвентаря.")));
    } else if (i === packs.nests) {
      const price = bagNestPrice(i);
      const plus = document.createElement('button');
      plus.type = 'button';
      plus.className = 'invSlot bag plus' + ((hero.tape || 0) < price ? ' poor' : '');
      plus.textContent = '+';
      plus.setAttribute('aria-label', tr("ui.Купить гнездо для сумки"));
      plus.dataset.tip = tr("ui.Купить гнездо для сумки:");
      plus.dataset.tipTape = price;
      plus.addEventListener('click', e => { e.stopPropagation(); vibrate(); buyBagNest(); });
      row.appendChild(plus);
    } else {
      const lock = emptySlot('bag', tr("ui.Сначала купите предыдущее гнездо"));
      lock.classList.add('locked');
      row.appendChild(lock);
    }
  }
  return row;
}
